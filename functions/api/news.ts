// Cloudflare Pages Function — fetches football news from BBC Sport + The Guardian RSS
// Falls back gracefully if either feed is unavailable

const FEEDS = [
  { url: "https://feeds.bbci.co.uk/sport/football/rss.xml", source: "BBC Sport" },
  { url: "https://www.theguardian.com/football/rss", source: "The Guardian" },
];

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, "i"));
  return match ? match[1].trim() : "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["']`, "i"));
  return match ? match[1] : "";
}

function badgeFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("injury") || t.includes("injured") || t.includes("out")) return "Injury Alert";
  if (t.includes("breaking") || t.includes("just in") || t.includes("confirmed")) return "Breaking News";
  if (t.includes("watch") || t.includes("video") || t.includes("goal")) return "Video";
  if (t.includes("review") || t.includes("report") || t.includes("result")) return "Match Report";
  if (t.includes("preview") || t.includes("prediction")) return "Match Preview";
  if (t.includes("tactic") || t.includes("analysis") || t.includes("expert")) return "Expert View";
  if (t.includes("transfer") || t.includes("sign")) return "Transfer";
  return "Football News";
}

function parseRSSItems(xml: string, source: string) {
  const items: Array<{
    id: string; title: string; category: string; summary: string;
    image: string; publishedAt: string; isBreaking: boolean;
    sourceUrl: string; source: string;
  }> = [];

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 6) {
    const block = match[1];
    const title = extractTag(block, "title");
    const link = extractTag(block, "link") || extractAttr(block, "link", "href");
    const description = extractTag(block, "description")
      .replace(/<[^>]+>/g, "") // strip HTML tags
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .slice(0, 200);
    const pubDate = extractTag(block, "pubDate") || extractTag(block, "dc:date");

    // Try multiple image locations used by BBC/Guardian RSS
    const image =
      extractAttr(block, "media:thumbnail", "url") ||
      extractAttr(block, "media:content", "url") ||
      extractAttr(block, "enclosure", "url") ||
      `https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80`;

    if (!title) continue;

    const category = badgeFromTitle(title);
    const isBreaking = category === "Breaking News" || category === "Injury Alert";

    items.push({
      id: `rss-${Buffer.from(title).toString("base64").slice(0, 12)}`,
      title,
      category,
      summary: description || "Read the full story on " + source,
      image,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      isBreaking,
      sourceUrl: link,
      source,
    });
  }
  return items;
}

export async function onRequestGet() {
  const results = await Promise.allSettled(
    FEEDS.map(async ({ url, source }) => {
      const res = await fetch(url, {
        headers: { "User-Agent": "WorldCupScoreboard/1.0 (+https://worldcupscoreboard.com)" },
        cf: { cacheTtl: 300, cacheEverything: true } as RequestInitCfProperties,
      });
      if (!res.ok) throw new Error(`${source} returned ${res.status}`);
      const xml = await res.text();
      return parseRSSItems(xml, source);
    })
  );

  const allItems = results
    .filter((r): r is PromiseFulfilledResult<ReturnType<typeof parseRSSItems>> => r.status === "fulfilled")
    .flatMap((r) => r.value)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 10);

  if (allItems.length === 0) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(allItems), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, s-maxage=300",
      "Access-Control-Allow-Origin": "https://worldcupscoreboard.com",
    },
  });
}

// Cloudflare Pages Function — fetches football news from BBC Sport + The Guardian RSS

const FEEDS = [
  { url: "https://feeds.bbci.co.uk/sport/football/rss.xml", source: "BBC Sport" },
  { url: "https://www.theguardian.com/football/rss", source: "The Guardian" },
];

// Reliable Unsplash football images — hotlink-free, rotate by index
const IMAGES = [
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
  "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80",
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
  "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80",
  "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&q=80",
  "https://images.unsplash.com/photo-1551958219-acbc630c1ea1?w=600&q=80",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80",
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80",
  "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&q=80",
  "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=600&q=80",
];

function stripHtml(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[/gi, "")
    .replace(/\]\]>/g, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?(p|li|ul|ol|div|h[1-6])[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractTag(xml: string, tag: string): string {
  // Handle both plain and CDATA-wrapped content
  const re = new RegExp(`<${tag}[^>]*>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*<\\/${tag}>`, "i");
  const m = xml.match(re);
  return m ? m[1].trim() : "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["']`, "i"));
  return m ? m[1] : "";
}

function badgeFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("injury") || t.includes("injured") || t.includes("ruled out") || t.includes("fitness")) return "Injury Alert";
  if (t.includes("live") || t.includes("breaking") || t.includes("just in") || t.includes("confirmed")) return "Breaking News";
  if (t.includes("watch") || t.includes("video") || t.includes("best goal")) return "Video";
  if (t.includes("review") || t.includes("report") || t.includes("result")) return "Match Report";
  if (t.includes("preview") || t.includes("prediction") || t.includes("warm-up")) return "Match Preview";
  if (t.includes("tactic") || t.includes("analysis") || t.includes("expert") || t.includes("guide")) return "Expert View";
  if (t.includes("transfer") || t.includes("sign") || t.includes("deal") || t.includes("agree")) return "Transfer";
  return "Football News";
}

function parseRSSItems(xml: string, source: string, imageOffset: number) {
  const items: Array<{
    id: string; title: string; category: string; summary: string;
    image: string; publishedAt: string; isBreaking: boolean;
    sourceUrl: string; source: string;
  }> = [];

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
    const block = match[1];
    const title = stripHtml(extractTag(block, "title"));
    if (!title) { i++; continue; }

    const rawDesc = extractTag(block, "description") || extractTag(block, "content:encoded") || "";
    const summary = stripHtml(rawDesc).slice(0, 180) || `Read the full story on ${source}.`;

    const link = extractTag(block, "link") || extractAttr(block, "link", "href");
    const pubDate = extractTag(block, "pubDate") || extractTag(block, "dc:date") || extractTag(block, "published");

    // Always use our own hosted images — BBC/Guardian hotlink-block external embeds
    const image = IMAGES[(imageOffset + i) % IMAGES.length];

    const category = badgeFromTitle(title);
    const isBreaking = category === "Breaking News" || category === "Injury Alert";

    items.push({
      id: `rss-${btoa(encodeURIComponent(title)).slice(0, 12)}`,
      title,
      category,
      summary,
      image,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      isBreaking,
      sourceUrl: link,
      source,
    });
    i++;
  }
  return items;
}

export async function onRequestGet() {
  const results = await Promise.allSettled(
    FEEDS.map(async ({ url, source }, feedIndex) => {
      const res = await fetch(url, {
        headers: { "User-Agent": "WorldCupScoreboard/1.0 (+https://worldcupscoreboard.com)" },
      });
      if (!res.ok) throw new Error(`${source} returned ${res.status}`);
      const xml = await res.text();
      return parseRSSItems(xml, source, feedIndex * 5);
    })
  );

  const allItems = results
    .filter((r): r is PromiseFulfilledResult<ReturnType<typeof parseRSSItems>> => r.status === "fulfilled")
    .flatMap((r) => r.value)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 20);

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

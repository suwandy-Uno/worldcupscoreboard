// Cloudflare Pages Function — fetches football news from reputable English-language RSS feeds

const FEEDS = [
  { url: "https://feeds.bbci.co.uk/sport/football/rss.xml",  source: "BBC Sport" },
  { url: "https://www.theguardian.com/football/rss",         source: "The Guardian" },
  { url: "https://www.skysports.com/rss/12040",              source: "Sky Sports" },
  { url: "https://www.espn.com/espn/rss/soccer/news",        source: "ESPN FC" },
];

// Explicit allowlist of trusted domains — articles from any other domain are dropped.
// This prevents low-quality, non-English, or unreliable sites from appearing.
const ALLOWED_DOMAINS = new Set([
  "bbc.co.uk",
  "bbc.com",
  "theguardian.com",
  "skysports.com",
  "espn.com",
  "espnfc.com",
  "theathletic.com",
  "reuters.com",
  "apnews.com",
  "fifa.com",
  "uefa.com",
  "goal.com",
  "independent.co.uk",
  "telegraph.co.uk",
  "ft.com",
  "cbssports.com",
  "nbcsports.com",
  "sportingnews.com",
]);

function isAllowedUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    // Check exact match or subdomain match (e.g. "sport.bbc.co.uk" → "bbc.co.uk")
    return [...ALLOWED_DOMAINS].some((d) => hostname === d || hostname.endsWith(`.${d}`));
  } catch {
    return false;
  }
}

// Fallback Unsplash images — only used when an article has no image at all
const FALLBACK_IMAGES = [
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
  const re = new RegExp(`<${tag}[^>]*>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*<\\/${tag}>`, "i");
  const m = xml.match(re);
  return m ? m[1].trim() : "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["']`, "i"));
  return m ? m[1] : "";
}

function extractImage(block: string): string | null {
  // 1. <media:content url="..."> — The Guardian, ESPN
  const mc = block.match(/<media:content[^>]+url=["']([^"']+)["'][^>]*>/i);
  if (mc) {
    const url = mc[1];
    if (!url.match(/\.(mp4|webm|ogg|mp3|wav)(\?|$)/i)) return url;
  }

  // 2. <media:thumbnail url="..."> — BBC Sport, Sky Sports
  const mt = block.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
  if (mt) return mt[1];

  // 3. <enclosure url="..." type="image/...">
  const enc = block.match(/<enclosure[^>]+type=["']image[^"']*["'][^>]+url=["']([^"']+)["']/i)
           || block.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image[^"']*["']/i);
  if (enc) return enc[1];

  // 4. First <img src="..."> inside description HTML
  const desc = extractTag(block, "description") || extractTag(block, "content:encoded") || "";
  const img = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (img) return img[1];

  return null;
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

function parseRSSItems(xml: string, source: string, fallbackOffset: number) {
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

    const link = extractTag(block, "link") || extractAttr(block, "link", "href");

    // Drop articles that don't come from an allowed domain
    if (link && !isAllowedUrl(link)) { i++; continue; }

    const rawDesc = extractTag(block, "description") || extractTag(block, "content:encoded") || "";
    const summary = stripHtml(rawDesc).slice(0, 180) || `Read the full story on ${source}.`;
    const pubDate = extractTag(block, "pubDate") || extractTag(block, "dc:date") || extractTag(block, "published");
    const image = extractImage(block) ?? FALLBACK_IMAGES[(fallbackOffset + i) % FALLBACK_IMAGES.length];
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

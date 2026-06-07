// Cloudflare Pages Function — reputable English-language football RSS feeds

const FEEDS = [
  { url: "https://feeds.bbci.co.uk/sport/football/rss.xml",  source: "BBC Sport",     domain: "bbc.co.uk" },
  { url: "https://www.theguardian.com/football/rss",         source: "The Guardian",  domain: "theguardian.com" },
  { url: "https://www.skysports.com/rss/12040",              source: "Sky Sports",    domain: "skysports.com" },
  { url: "https://www.espn.com/espn/rss/soccer/news",        source: "ESPN FC",       domain: "espn.com" },
];

// Only articles from these domains are shown
const ALLOWED_DOMAINS = new Set([
  "bbc.co.uk", "bbc.com",
  "theguardian.com",
  "skysports.com",
  "espn.com", "espnfc.com",
  "theathletic.com",
  "reuters.com",
  "apnews.com",
  "fifa.com",
  "uefa.com",
  "goal.com",
  "independent.co.uk",
  "telegraph.co.uk",
  "cbssports.com",
  "nbcsports.com",
  "sportingnews.com",
]);

// Logo image for each source — served via Clearbit's free logo API
const SOURCE_LOGOS: Record<string, string> = {
  "BBC Sport":     "https://logo.clearbit.com/bbc.co.uk",
  "The Guardian":  "https://logo.clearbit.com/theguardian.com",
  "Sky Sports":    "https://logo.clearbit.com/skysports.com",
  "ESPN FC":       "https://logo.clearbit.com/espn.com",
  "The Athletic":  "https://logo.clearbit.com/theathletic.com",
  "Reuters":       "https://logo.clearbit.com/reuters.com",
  "AP News":       "https://logo.clearbit.com/apnews.com",
  "FIFA":          "https://logo.clearbit.com/fifa.com",
  "UEFA":          "https://logo.clearbit.com/uefa.com",
  "Goal.com":      "https://logo.clearbit.com/goal.com",
  "The Independent": "https://logo.clearbit.com/independent.co.uk",
  "The Telegraph": "https://logo.clearbit.com/telegraph.co.uk",
  "CBS Sports":    "https://logo.clearbit.com/cbssports.com",
  "NBC Sports":    "https://logo.clearbit.com/nbcsports.com",
  "Sporting News": "https://logo.clearbit.com/sportingnews.com",
};

function getLogoForSource(source: string, domain?: string): string {
  if (SOURCE_LOGOS[source]) return SOURCE_LOGOS[source];
  if (domain) return `https://logo.clearbit.com/${domain}`;
  return `https://logo.clearbit.com/worldcupscoreboard.com`;
}

function isAllowedUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return [...ALLOWED_DOMAINS].some((d) => hostname === d || hostname.endsWith(`.${d}`));
  } catch {
    return false;
  }
}

function stripHtml(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[/gi, "").replace(/\]\]>/g, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?(p|li|ul|ol|div|h[1-6])[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/\s{2,}/g, " ").trim();
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

/** Extract image embedded in the RSS item. Returns null if the feed has none. */
function extractRssImage(block: string): string | null {
  // 1. <media:content url="..."> — Guardian, ESPN sometimes
  const mc = block.match(/<media:content[^>]+url=["']([^"']+)["'][^>]*>/i);
  if (mc && !mc[1].match(/\.(mp4|webm|ogg|mp3|wav)(\?|$)/i)) return mc[1];

  // 2. <media:thumbnail url="..."> — BBC Sport, Sky Sports
  const mt = block.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
  if (mt) return mt[1];

  // 3. <enclosure type="image/...">
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

function parseRSSItems(xml: string, source: string, domain: string) {
  const items: Array<{
    id: string; title: string; category: string; summary: string;
    image: string; isLogo: boolean; publishedAt: string; isBreaking: boolean;
    sourceUrl: string; source: string;
  }> = [];

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 8) {
    const block = match[1];
    const title = stripHtml(extractTag(block, "title"));
    if (!title) continue;

    const link = extractTag(block, "link") || extractAttr(block, "link", "href");
    if (link && !isAllowedUrl(link)) continue;

    const rawDesc = extractTag(block, "description") || extractTag(block, "content:encoded") || "";
    const summary = stripHtml(rawDesc).slice(0, 180) || `Read the full story on ${source}.`;
    const pubDate = extractTag(block, "pubDate") || extractTag(block, "dc:date") || extractTag(block, "published");
    const category = badgeFromTitle(title);
    const rssImage = extractRssImage(block);

    items.push({
      id: `rss-${btoa(encodeURIComponent(title)).slice(0, 12)}`,
      title,
      category,
      summary,
      image: rssImage ?? getLogoForSource(source, domain),
      isLogo: !rssImage,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      isBreaking: category === "Breaking News" || category === "Injury Alert",
      sourceUrl: link,
      source,
    });
  }
  return items;
}

export async function onRequestGet() {
  const results = await Promise.allSettled(
    FEEDS.map(async ({ url, source, domain }) => {
      const res = await fetch(url, {
        headers: { "User-Agent": "WorldCupScoreboard/1.0 (+https://worldcupscoreboard.com)" },
      });
      if (!res.ok) throw new Error(`${source} returned ${res.status}`);
      return parseRSSItems(await res.text(), source, domain);
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

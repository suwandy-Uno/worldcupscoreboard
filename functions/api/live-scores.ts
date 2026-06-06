// Cloudflare Pages Function — returns only live/halftime matches

interface Env {
  FOOTBALL_DATA_API_KEY: string;
}

interface FDMatch {
  id: number;
  utcDate: string;
  status: string;
  minute: number | null;
  group: string | null;
  venue: string | null;
  homeTeam: { name: string; shortName: string };
  awayTeam: { name: string; shortName: string };
  score: { fullTime: { home: number | null; away: number | null } };
  goals: Array<{ minute: number; scorer: { name: string } }>;
}

function toSlug(home: string, away: string) {
  return `${home.toLowerCase().replace(/\s+/g, "-")}-vs-${away.toLowerCase().replace(/\s+/g, "-")}`;
}
function mapStatus(s: string): "live" | "halftime" {
  return s === "PAUSED" ? "halftime" : "live";
}

export async function onRequestGet(context: { env: Env }) {
  const apiKey = context.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) return new Response("[]", { headers: { "Content-Type": "application/json" } });

  try {
    const res = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches?status=LIVE&season=2026",
      { headers: { "X-Auth-Token": apiKey } }
    );
    if (!res.ok) return new Response("[]", { headers: { "Content-Type": "application/json" } });

    const data = (await res.json()) as { matches: FDMatch[] };
    const live = (data.matches || [])
      .filter((m) => ["IN_PLAY", "PAUSED"].includes(m.status))
      .map((m) => ({
        id: String(m.id),
        slug: toSlug(m.homeTeam.shortName || m.homeTeam.name, m.awayTeam.shortName || m.awayTeam.name),
        group: (m.group || "?").replace("GROUP_", ""),
        home: m.homeTeam.shortName || m.homeTeam.name,
        away: m.awayTeam.shortName || m.awayTeam.name,
        homeScore: m.score.fullTime.home,
        awayScore: m.score.fullTime.away,
        venue: m.venue || "",
        isoDate: m.utcDate,
        status: mapStatus(m.status),
        minute: m.minute ?? undefined,
        scorers: m.goals ? m.goals.map((g) => `${g.scorer.name} ${g.minute}'`) : [],
      }));

    return new Response(JSON.stringify(live), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=15, s-maxage=15",
        "Access-Control-Allow-Origin": "https://worldcupscoreboard.com",
      },
    });
  } catch {
    return new Response("[]", { headers: { "Content-Type": "application/json" } });
  }
}

// Cloudflare Pages Function — proxies football-data.org /competitions/WC/matches
// API key stored as CF Pages environment variable: FOOTBALL_DATA_API_KEY

interface Env {
  FOOTBALL_DATA_API_KEY: string;
}

interface FDMatch {
  id: number;
  utcDate: string;
  status: string;
  minute: number | null;
  group: string | null;
  stage: string;
  venue: string | null;
  homeTeam: { name: string; shortName: string; tla: string };
  awayTeam: { name: string; shortName: string; tla: string };
  score: {
    fullTime: { home: number | null; away: number | null };
    halfTime: { home: number | null; away: number | null };
  };
  goals: Array<{ minute: number; scorer: { name: string }; team: { name: string } }>;
}

function toSlug(home: string, away: string) {
  return `${home.toLowerCase().replace(/\s+/g, "-")}-vs-${away.toLowerCase().replace(/\s+/g, "-")}`;
}

function mapStatus(status: string): "upcoming" | "live" | "halftime" | "finished" {
  if (status === "IN_PLAY") return "live";
  if (status === "PAUSED") return "halftime";
  if (status === "FINISHED") return "finished";
  return "upcoming";
}

function mapGroup(group: string | null): string {
  if (!group) return "?";
  // "GROUP_A" → "A"
  return group.replace("GROUP_", "");
}

function transformMatches(matches: FDMatch[]) {
  return matches.map((m) => ({
    id: String(m.id),
    slug: toSlug(m.homeTeam.shortName || m.homeTeam.name, m.awayTeam.shortName || m.awayTeam.name),
    group: mapGroup(m.group),
    home: m.homeTeam.shortName || m.homeTeam.name,
    away: m.awayTeam.shortName || m.awayTeam.name,
    homeScore: m.score.fullTime.home,
    awayScore: m.score.fullTime.away,
    venue: m.venue || "",
    isoDate: m.utcDate,
    status: mapStatus(m.status),
    minute: m.minute ?? undefined,
    scorers: m.goals
      ? m.goals.map((g) => `${g.scorer.name} ${g.minute}'`)
      : [],
  }));
}

export async function onRequestGet(context: { env: Env }) {
  const apiKey = context.env.FOOTBALL_DATA_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const res = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches?season=2026",
      { headers: { "X-Auth-Token": apiKey } }
    );

    if (!res.ok) {
      // Fall through to static fallback on rate limit / error
      return new Response(JSON.stringify({ error: `upstream ${res.status}` }), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = (await res.json()) as { matches: FDMatch[] };
    const transformed = transformMatches(data.matches || []);

    return new Response(JSON.stringify(transformed), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30, s-maxage=30",
        "Access-Control-Allow-Origin": "https://worldcupscoreboard.com",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "fetch failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}

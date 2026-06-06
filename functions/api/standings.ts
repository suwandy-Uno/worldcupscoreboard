// Cloudflare Pages Function — proxies football-data.org /competitions/WC/standings

interface Env {
  FOOTBALL_DATA_API_KEY: string;
}

interface FDStandingRow {
  position: number;
  team: { name: string; shortName: string };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

interface FDStandingGroup {
  group: string;
  type: string;
  table: FDStandingRow[];
}

export async function onRequestGet(context: { env: Env }) {
  const apiKey = context.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) return new Response("[]", { headers: { "Content-Type": "application/json" } });

  try {
    const res = await fetch(
      "https://api.football-data.org/v4/competitions/WC/standings?season=2026",
      { headers: { "X-Auth-Token": apiKey } }
    );
    if (!res.ok) return new Response("[]", { headers: { "Content-Type": "application/json" } });

    const data = (await res.json()) as { standings: FDStandingGroup[] };

    // Only TOTAL type (not HOME/AWAY splits)
    const groups = (data.standings || []).filter((g) => g.type === "TOTAL");

    const rows = groups.flatMap((g) =>
      g.table.map((row) => ({
        group: g.group.replace("GROUP_", ""),
        team: row.team.shortName || row.team.name,
        played: row.playedGames,
        won: row.won,
        drawn: row.draw,
        lost: row.lost,
        gf: row.goalsFor,
        ga: row.goalsAgainst,
        gd: row.goalDifference,
        pts: row.points,
      }))
    );

    return new Response(JSON.stringify(rows), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, s-maxage=60",
        "Access-Control-Allow-Origin": "https://worldcupscoreboard.com",
      },
    });
  } catch {
    return new Response("[]", { headers: { "Content-Type": "application/json" } });
  }
}

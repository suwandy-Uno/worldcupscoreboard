// Cloudflare Pages Function — top scorers from football-data.org

interface Env {
  FOOTBALL_DATA_API_KEY: string;
}

// ISO country code lookup by team TLA (3-letter code)
const TLA_TO_FLAG: Record<string, string> = {
  MEX: "mx", NED: "nl", ECU: "ec", QAT: "qa", ESP: "es", JPN: "jp",
  ALB: "al", CHI: "cl", USA: "us", ENG: "gb-eng", IRN: "ir", WAL: "gb-wls",
  FRA: "fr", AUS: "au", ARG: "ar", CAN: "ca", BRA: "br", KOR: "kr",
  GER: "de", GER2: "de", MAR: "ma", POR: "pt", SEN: "sn", URU: "uy", NGA: "ng",
  GHA: "gh", CMR: "cm", TUN: "tn", EGY: "eg", CIV: "ci", DEN: "dk", SWE: "se",
  BEL: "be", SUI: "ch", AUT: "at", CRO: "hr", SRB: "rs", POL: "pl",
  CZE: "cz", SVK: "sk", UKR: "ua", TUR: "tr", GRE: "gr", SCO: "gb-sct",
  IRL: "ie", NOR: "no", ISL: "is", COL: "co", PER: "pe", VEN: "ve",
  BOL: "bo", PAR: "py", CRC: "cr", PAN: "pa", HON: "hn", GTM: "gt",
  SAU: "sa", IRQ: "iq", UZB: "uz", IDN: "id", THA: "th", VNM: "vn",
};

export async function onRequestGet(context: { env: Env }) {
  const apiKey = context.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) return new Response("[]", { headers: { "Content-Type": "application/json" } });

  try {
    const res = await fetch(
      "https://api.football-data.org/v4/competitions/WC/scorers?season=2026&limit=10",
      { headers: { "X-Auth-Token": apiKey } }
    );
    if (!res.ok) return new Response("[]", { headers: { "Content-Type": "application/json" } });

    const data = (await res.json()) as {
      scorers: Array<{
        player: { name: string };
        team: { shortName: string; tla: string };
        goals: number;
        assists: number;
      }>;
    };

    const scorers = (data.scorers || []).map((s) => ({
      name: s.player.name,
      team: s.team.shortName,
      flagCode: TLA_TO_FLAG[s.team.tla] ?? "un",
      goals: s.goals,
      assists: s.assists,
    }));

    return new Response(JSON.stringify(scorers), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=120, s-maxage=120",
        "Access-Control-Allow-Origin": "https://worldcupscoreboard.com",
      },
    });
  } catch {
    return new Response("[]", { headers: { "Content-Type": "application/json" } });
  }
}

/**
 * Cloudflare Pages Function — /api/predictions
 *
 * Self-contained: team/match data is inlined to avoid @/ path alias issues
 * with the Cloudflare Pages build system.
 *
 * OPTIONAL: Set ODDS_API_KEY in Cloudflare Pages → Settings → Environment Variables
 * to layer in live bookmaker probabilities from https://the-odds-api.com (free tier).
 * Falls back to algorithmic predictions if the key is absent or the request fails.
 */

interface Env { ODDS_API_KEY?: string; }

// ─── Minimal team data needed for predictions ─────────────────────────────────
const TEAMS: { name: string; ranking: number; form: string }[] = [
  { name: "Mexico",          ranking: 14,  form: "WWDLW" },
  { name: "South Africa",    ranking: 66,  form: "DWLWL" },
  { name: "Netherlands",     ranking: 7,   form: "WDWWW" },
  { name: "Ecuador",         ranking: 32,  form: "LDWWL" },
  { name: "Spain",           ranking: 8,   form: "WWDWW" },
  { name: "Japan",           ranking: 18,  form: "WLWWW" },
  { name: "Albania",         ranking: 64,  form: "DLLWW" },
  { name: "Chile",           ranking: 42,  form: "LWDLD" },
  { name: "USA",             ranking: 11,  form: "DWWDW" },
  { name: "England",         ranking: 4,   form: "WWWDW" },
  { name: "Iran",            ranking: 20,  form: "LDWDL" },
  { name: "Wales",           ranking: 29,  form: "DDLWL" },
  { name: "France",          ranking: 2,   form: "WWLWW" },
  { name: "Australia",       ranking: 24,  form: "WDLDW" },
  { name: "Argentina",       ranking: 1,   form: "WWWWW" },
  { name: "Canada",          ranking: 36,  form: "LWWDL" },
  { name: "Brazil",          ranking: 5,   form: "WDWLW" },
  { name: "Korea Republic",  ranking: 23,  form: "WWDLL" },
  { name: "Germany",         ranking: 12,  form: "WDWWW" },
  { name: "Morocco",         ranking: 13,  form: "WLWDW" },
  { name: "Portugal",        ranking: 6,   form: "WWLWW" },
  { name: "Senegal",         ranking: 17,  form: "DWDLW" },
  { name: "Uruguay",         ranking: 15,  form: "WWDWL" },
  { name: "Nigeria",         ranking: 30,  form: "LDWWW" },
  { name: "Belgium",         ranking: 3,   form: "WWWDW" },
  { name: "Croatia",         ranking: 10,  form: "WDWLW" },
  { name: "Qatar",           ranking: 58,  form: "LWLDW" },
  { name: "Cameroon",        ranking: 43,  form: "WLDWL" },
  { name: "Italy",           ranking: 9,   form: "DWWLW" },
  { name: "Colombia",        ranking: 19,  form: "WWDWL" },
  { name: "Denmark",         ranking: 21,  form: "WDLWW" },
  { name: "Ghana",           ranking: 60,  form: "LLDWW" },
  { name: "Switzerland",     ranking: 22,  form: "WDWWL" },
  { name: "Serbia",          ranking: 33,  form: "LWWDL" },
  { name: "Tunisia",         ranking: 35,  form: "DWLWW" },
  { name: "Ivory Coast",     ranking: 51,  form: "WWDLL" },
  { name: "Poland",          ranking: 28,  form: "LDWWW" },
  { name: "Austria",         ranking: 25,  form: "WWLDW" },
  { name: "Egypt",           ranking: 38,  form: "WLDWL" },
  { name: "Jamaica",         ranking: 55,  form: "DLLWW" },
  { name: "Turkey",          ranking: 40,  form: "WDLWW" },
  { name: "Saudi Arabia",    ranking: 55,  form: "WLLWD" },
  { name: "Jordan",          ranking: 70,  form: "DWLLD" },
  { name: "New Zealand",     ranking: 100, form: "LLDWL" },
  { name: "Ukraine",         ranking: 27,  form: "WDWLW" },
  { name: "Paraguay",        ranking: 45,  form: "LDLDW" },
  { name: "Panama",          ranking: 62,  form: "WDLLL" },
  { name: "Costa Rica",      ranking: 50,  form: "WDWLL" },
];

// ─── Group stage fixtures (match id + home/away team names) ──────────────────
const GROUP_MATCHES: { id: string; home: string; away: string }[] = [
  { id:"m1",  home:"Mexico",       away:"South Africa"   },
  { id:"m2",  home:"Netherlands",  away:"Ecuador"        },
  { id:"m3",  home:"Spain",        away:"Japan"          },
  { id:"m4",  home:"Albania",      away:"Chile"          },
  { id:"m5",  home:"USA",          away:"Iran"           },
  { id:"m6",  home:"England",      away:"Wales"          },
  { id:"m7",  home:"France",       away:"Australia"      },
  { id:"m8",  home:"Argentina",    away:"Canada"         },
  { id:"m9",  home:"Brazil",       away:"Korea Republic" },
  { id:"m10", home:"Germany",      away:"Morocco"        },
  { id:"m11", home:"Portugal",     away:"Senegal"        },
  { id:"m12", home:"Uruguay",      away:"Nigeria"        },
  { id:"m13", home:"Belgium",      away:"Croatia"        },
  { id:"m14", home:"Qatar",        away:"Cameroon"       },
  { id:"m15", home:"Italy",        away:"Colombia"       },
  { id:"m16", home:"Denmark",      away:"Ghana"          },
  { id:"m17", home:"Switzerland",  away:"Serbia"         },
  { id:"m18", home:"Tunisia",      away:"Ivory Coast"    },
  { id:"m19", home:"Poland",       away:"Austria"        },
  { id:"m20", home:"Egypt",        away:"Jamaica"        },
  { id:"m21", home:"Turkey",       away:"Saudi Arabia"   },
  { id:"m22", home:"Jordan",       away:"New Zealand"    },
  { id:"m23", home:"Ukraine",      away:"Paraguay"       },
  { id:"m24", home:"Panama",       away:"Costa Rica"     },
  // MD2
  { id:"m25", home:"Mexico",       away:"Netherlands"    },
  { id:"m26", home:"Ecuador",      away:"South Africa"   },
  { id:"m27", home:"Spain",        away:"Albania"        },
  { id:"m28", home:"Japan",        away:"Chile"          },
  { id:"m29", home:"USA",          away:"England"        },
  { id:"m30", home:"Iran",         away:"Wales"          },
  { id:"m31", home:"France",       away:"Argentina"      },
  { id:"m32", home:"Australia",    away:"Canada"         },
  { id:"m33", home:"Brazil",       away:"Germany"        },
  { id:"m34", home:"Korea Republic",away:"Morocco"       },
  { id:"m35", home:"Portugal",     away:"Uruguay"        },
  { id:"m36", home:"Nigeria",      away:"Senegal"        },
  { id:"m37", home:"Belgium",      away:"Qatar"          },
  { id:"m38", home:"Croatia",      away:"Cameroon"       },
  { id:"m39", home:"Italy",        away:"Denmark"        },
  { id:"m40", home:"Colombia",     away:"Ghana"          },
  { id:"m41", home:"Switzerland",  away:"Ivory Coast"    },
  { id:"m42", home:"Serbia",       away:"Tunisia"        },
  { id:"m43", home:"Poland",       away:"Egypt"          },
  { id:"m44", home:"Austria",      away:"Jamaica"        },
  { id:"m45", home:"Turkey",       away:"Jordan"         },
  { id:"m46", home:"Saudi Arabia", away:"New Zealand"    },
  { id:"m47", home:"Ukraine",      away:"Panama"         },
  { id:"m48", home:"Paraguay",     away:"Costa Rica"     },
  // MD3
  { id:"m49", home:"Mexico",       away:"Ecuador"        },
  { id:"m50", home:"South Africa", away:"Netherlands"    },
  { id:"m51", home:"Spain",        away:"Chile"          },
  { id:"m52", home:"Japan",        away:"Albania"        },
  { id:"m53", home:"USA",          away:"Wales"          },
  { id:"m54", home:"England",      away:"Iran"           },
  { id:"m55", home:"France",       away:"Canada"         },
  { id:"m56", home:"Argentina",    away:"Australia"      },
  { id:"m57", home:"Brazil",       away:"Morocco"        },
  { id:"m58", home:"Korea Republic",away:"Germany"       },
  { id:"m59", home:"Portugal",     away:"Nigeria"        },
  { id:"m60", home:"Senegal",      away:"Uruguay"        },
  { id:"m61", home:"Belgium",      away:"Cameroon"       },
  { id:"m62", home:"Croatia",      away:"Qatar"          },
  { id:"m63", home:"Italy",        away:"Ghana"          },
  { id:"m64", home:"Denmark",      away:"Colombia"       },
  { id:"m65", home:"Switzerland",  away:"Tunisia"        },
  { id:"m66", home:"Serbia",       away:"Ivory Coast"    },
  { id:"m67", home:"Poland",       away:"Jamaica"        },
  { id:"m68", home:"Austria",      away:"Egypt"          },
  { id:"m69", home:"Turkey",       away:"New Zealand"    },
  { id:"m70", home:"Saudi Arabia", away:"Jordan"         },
  { id:"m71", home:"Ukraine",      away:"Costa Rica"     },
  { id:"m72", home:"Panama",       away:"Paraguay"       },
];

// ─── Prediction algorithm ─────────────────────────────────────────────────────
function formScore(form: string): number {
  return [...form].reduce((s, c) => s + (c === "W" ? 3 : c === "D" ? 1 : 0), 0);
}
function teamStrength(ranking: number, form: string): number {
  return Math.exp(-ranking / 20) * 100 + formScore(form);
}

const T = new Map(TEAMS.map(t => [t.name, { s: teamStrength(t.ranking, t.form), rank: t.ranking, form: t.form }]));

function computePrediction(matchId: string, home: string, away: string) {
  const h = T.get(home);
  const a = T.get(away);
  if (!h || !a) return null;

  const total = h.s + a.s;
  const hRatio = h.s / total;
  const gap = Math.abs(h.rank - a.rank);
  const drawBase = gap > 40 ? 15 : gap > 20 ? 20 : 25;

  const homeWin = Math.max(8, Math.min(75, Math.round(hRatio * (100 - drawBase))));
  const awayWin = Math.max(8, 100 - drawBase - homeWin);
  const hGoals  = Math.max(0, Math.round(hRatio * 2.7));
  const aGoals  = Math.max(0, Math.round((1 - hRatio) * 2.7));
  const confidence = gap > 40 ? "High" : gap > 20 ? "Medium" : "Low";

  const hFS = formScore(h.form);
  const aFS = formScore(a.form);
  const factors: string[] = [];
  if (h.rank < a.rank) factors.push(`${home} ranked #${h.rank} (vs #${a.rank})`);
  else factors.push(`${away} ranked #${a.rank} (vs #${h.rank})`);
  if (hFS > aFS + 2) factors.push(`${home} in stronger recent form (${h.form})`);
  else if (aFS > hFS + 2) factors.push(`${away} in stronger recent form (${a.form})`);
  else factors.push("Similar recent form for both sides");
  factors.push("Neutral venue — no home advantage");

  return { matchId, homeWin, draw: drawBase, awayWin, projectedScore: `${hGoals} – ${aGoals}`, confidence, factors };
}

// ─── Optional: The Odds API for live bookmaker probabilities ──────────────────
async function fetchOddsProbabilities(apiKey: string): Promise<Map<string, { homeWin: number; draw: number; awayWin: number }>> {
  const result = new Map<string, { homeWin: number; draw: number; awayWin: number }>();
  try {
    const res = await fetch(
      `https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup/odds/?apiKey=${apiKey}&regions=eu&markets=h2h&oddsFormat=decimal`
    );
    if (!res.ok) return result;
    const data = await res.json() as Array<{
      home_team: string; away_team: string;
      bookmakers: Array<{ markets: Array<{ key: string; outcomes: Array<{ name: string; price: number }> }> }>;
    }>;
    for (const ev of data) {
      const h2h = ev.bookmakers[0]?.markets.find(m => m.key === "h2h");
      if (!h2h) continue;
      const ho = h2h.outcomes.find(o => o.name === ev.home_team);
      const ao = h2h.outcomes.find(o => o.name === ev.away_team);
      const dr = h2h.outcomes.find(o => o.name === "Draw");
      if (!ho || !ao || !dr) continue;
      const hi = 1/ho.price, ai = 1/ao.price, di = 1/dr.price, tot = hi+ai+di;
      const homeWin = Math.round(hi/tot*100);
      const awayWin = Math.round(ai/tot*100);
      result.set(`${ev.home_team}|${ev.away_team}`, { homeWin, draw: 100-homeWin-awayWin, awayWin });
    }
  } catch { /* fall through */ }
  return result;
}

// Map our team names → Odds API naming conventions where they differ
const ODDS_NAME: Record<string, string> = {
  "Korea Republic": "South Korea",
  "Ivory Coast":    "Côte d'Ivoire",
  "USA":            "United States",
};

// ─── Request handler ──────────────────────────────────────────────────────────
export const onRequest: PagesFunction<Env> = async ({ env }) => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=300, s-maxage=300",
    "Access-Control-Allow-Origin": "*",
  };

  const oddsData = env.ODDS_API_KEY
    ? await fetchOddsProbabilities(env.ODDS_API_KEY)
    : new Map();

  const predictions = GROUP_MATCHES
    .map(({ id, home, away }) => {
      const base = computePrediction(id, home, away);
      if (!base) return null;
      const hN = ODDS_NAME[home] ?? home;
      const aN = ODDS_NAME[away] ?? away;
      const live = oddsData.get(`${hN}|${aN}`);
      if (live) {
        return { ...base, ...live, factors: [...base.factors, "Win probability from live betting markets (The Odds API)"] };
      }
      return base;
    })
    .filter(Boolean);

  return new Response(JSON.stringify(predictions), { headers });
};

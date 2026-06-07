import type { Prediction } from "@/lib/types";
import { teams } from "@/lib/data/teams";
import { matches } from "@/lib/data/matches";

// ─── Strength model ──────────────────────────────────────────────────────────
// Uses exponential decay of FIFA ranking + recent form score (W=3, D=1, L=0)
// Exponential decay means #1 Argentina (~95pts) vs #100 NZ (~1pt) is a huge gap
// while #5 Brazil vs #8 Spain is relatively close — mirrors real football odds.

function formScore(form: string): number {
  return [...form].reduce((s, c) => s + (c === "W" ? 3 : c === "D" ? 1 : 0), 0);
}

function strength(ranking: number, form: string): number {
  return Math.exp(-ranking / 20) * 100 + formScore(form);
}

// Build lookup: team name → { strength, ranking, form }
const T = new Map(
  teams.map(t => [t.name, { s: strength(t.ranking, t.form), rank: t.ranking, form: t.form }])
);

function predict(matchId: string, home: string, away: string): Prediction | null {
  const h = T.get(home);
  const a = T.get(away);
  if (!h || !a) return null; // TBD (knockout round placeholder teams)

  const total = h.s + a.s;
  const hRatio = h.s / total;
  const gap = Math.abs(h.rank - a.rank);

  // Draw base: tighter when rank gap is large (big favorites rarely draw)
  const drawBase = gap > 40 ? 15 : gap > 20 ? 20 : 25;

  // Win probabilities — clamp to at least 8% for each side
  const hWin = Math.max(8, Math.min(75, Math.round(hRatio * (100 - drawBase))));
  const aWin = Math.max(8, 100 - drawBase - hWin);

  // Projected score (expected goals: ~2.5 total at WC)
  const hGoals = Math.max(0, Math.round(hRatio * 2.7));
  const aGoals = Math.max(0, Math.round((1 - hRatio) * 2.7));

  const confidence: "Low" | "Medium" | "High" =
    gap > 40 ? "High" : gap > 20 ? "Medium" : "Low";

  // Factors
  const hFS = formScore(h.form);
  const aFS = formScore(a.form);
  const factors: string[] = [];
  if (h.rank < a.rank) factors.push(`${home} ranked #${h.rank} (vs #${a.rank})`);
  else factors.push(`${away} ranked #${a.rank} (vs #${h.rank})`);
  if (hFS > aFS + 2) factors.push(`${home} in stronger recent form (${h.form})`);
  else if (aFS > hFS + 2) factors.push(`${away} in stronger recent form (${a.form})`);
  else factors.push("Similar recent form for both sides");
  factors.push("Neutral venue — no home advantage");

  return { matchId, homeWin: hWin, draw: drawBase, awayWin: aWin, projectedScore: `${hGoals} – ${aGoals}`, confidence, factors };
}

// ─── Generate predictions for all matches that have known teams ───────────────
// Group stage (m1-m72): all teams known.
// Knockout rounds (m73+): teams are TBD placeholders — no prediction shown.
export const predictions: Prediction[] = matches
  .map(m => predict(m.id, m.home, m.away))
  .filter((p): p is Prediction => p !== null);

import type { Standing } from "@/lib/types";

export const standings: Standing[] = [
  ["A", "Mexico", 1, 1, 0, 0, 2, 1, 1, 3],
  ["A", "Netherlands", 1, 1, 0, 0, 1, 0, 1, 3],
  ["A", "Ecuador", 1, 0, 0, 1, 0, 1, -1, 0],
  ["A", "Qatar", 1, 0, 0, 1, 1, 2, -1, 0],
  ["B", "Spain", 1, 1, 0, 0, 1, 0, 1, 3],
  ["B", "Japan", 1, 1, 0, 0, 2, 1, 1, 3],
  ["B", "Albania", 1, 0, 0, 1, 1, 2, -1, 0],
  ["B", "Chile", 1, 0, 0, 1, 0, 1, -1, 0],
  ["C", "USA", 1, 0, 1, 0, 1, 1, 0, 1],
  ["C", "England", 1, 0, 1, 0, 0, 0, 0, 1],
  ["C", "Iran", 1, 0, 1, 0, 1, 1, 0, 1],
  ["C", "Wales", 1, 0, 1, 0, 0, 0, 0, 1]
].map(([group, team, played, won, drawn, lost, gf, ga, gd, pts]) => ({
  group: group as string,
  team: team as string,
  played: played as number,
  won: won as number,
  drawn: drawn as number,
  lost: lost as number,
  gf: gf as number,
  ga: ga as number,
  gd: gd as number,
  pts: pts as number
}));

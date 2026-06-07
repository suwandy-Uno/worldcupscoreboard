import type { Standing } from "@/lib/types";

export const standings: Standing[] = [
  // Group A
  ["A", "Mexico",         2, 1, 1, 0, 3, 2,  1,  4],
  ["A", "Netherlands",    2, 1, 0, 1, 2, 2,  0,  3],
  ["A", "Ecuador",        2, 1, 0, 1, 2, 2,  0,  3],
  ["A", "Qatar",          2, 0, 1, 1, 1, 2, -1,  1],
  // Group B
  ["B", "Spain",          2, 2, 0, 0, 4, 1,  3,  6],
  ["B", "Japan",          2, 1, 0, 1, 3, 3,  0,  3],
  ["B", "Chile",          2, 1, 0, 1, 2, 3, -1,  3],
  ["B", "Albania",        2, 0, 0, 2, 1, 3, -2,  0],
  // Group C
  ["C", "USA",            2, 1, 1, 0, 3, 2,  1,  4],
  ["C", "England",        2, 1, 1, 0, 2, 1,  1,  4],
  ["C", "Iran",           2, 0, 1, 1, 2, 3, -1,  1],
  ["C", "Wales",          2, 0, 1, 1, 1, 2, -1,  1],
  // Group D
  ["D", "France",         2, 2, 0, 0, 5, 1,  4,  6],
  ["D", "Argentina",      2, 1, 0, 1, 3, 3,  0,  3],
  ["D", "Canada",         2, 1, 0, 1, 2, 3, -1,  3],
  ["D", "Australia",      2, 0, 0, 2, 1, 4, -3,  0],
  // Group E
  ["E", "Brazil",         2, 2, 0, 0, 6, 2,  4,  6],
  ["E", "Korea Republic", 2, 1, 0, 1, 3, 4, -1,  3],
  ["E", "Germany",        2, 1, 0, 1, 3, 3,  0,  3],
  ["E", "Morocco",        2, 0, 0, 2, 2, 5, -3,  0],
  // Group F
  ["F", "Portugal",       2, 1, 1, 0, 4, 3,  1,  4],
  ["F", "Senegal",        2, 1, 1, 0, 3, 2,  1,  4],
  ["F", "Nigeria",        2, 0, 1, 1, 2, 3, -1,  1],
  ["F", "Uruguay",        2, 0, 1, 1, 2, 3, -1,  1],
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
  pts: pts as number,
}));

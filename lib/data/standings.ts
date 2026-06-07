import type { Standing } from "@/lib/types";

// Format: [group, team, played, won, drawn, lost, gf, ga, gd, pts]
export const standings: Standing[] = [
  // Group A — tournament in progress
  ["A", "Mexico",          1, 1, 0, 0, 2, 1,  1, 3],
  ["A", "South Africa",    1, 0, 0, 1, 1, 2, -1, 0],
  ["A", "Netherlands",     0, 0, 0, 0, 0, 0,  0, 0],
  ["A", "Ecuador",         0, 0, 0, 0, 0, 0,  0, 0],
  // Group B — tournament in progress
  ["B", "Spain",           1, 1, 0, 0, 1, 0,  1, 3],
  ["B", "Japan",           1, 0, 0, 1, 0, 1, -1, 0],
  ["B", "Albania",         0, 0, 0, 0, 0, 0,  0, 0],
  ["B", "Chile",           0, 0, 0, 0, 0, 0,  0, 0],
  // Group C — halftime, match in progress
  ["C", "USA",             1, 0, 1, 0, 1, 1,  0, 1],
  ["C", "Iran",            1, 0, 1, 0, 1, 1,  0, 1],
  ["C", "England",         0, 0, 0, 0, 0, 0,  0, 0],
  ["C", "Wales",           0, 0, 0, 0, 0, 0,  0, 0],
  // Group D — upcoming
  ["D", "France",          0, 0, 0, 0, 0, 0,  0, 0],
  ["D", "Argentina",       0, 0, 0, 0, 0, 0,  0, 0],
  ["D", "Australia",       0, 0, 0, 0, 0, 0,  0, 0],
  ["D", "Canada",          0, 0, 0, 0, 0, 0,  0, 0],
  // Group E — upcoming
  ["E", "Brazil",          0, 0, 0, 0, 0, 0,  0, 0],
  ["E", "Germany",         0, 0, 0, 0, 0, 0,  0, 0],
  ["E", "Korea Republic",  0, 0, 0, 0, 0, 0,  0, 0],
  ["E", "Morocco",         0, 0, 0, 0, 0, 0,  0, 0],
  // Group F — 1 match finished
  ["F", "Portugal",        1, 0, 1, 0, 2, 2,  0, 1],
  ["F", "Senegal",         1, 0, 1, 0, 2, 2,  0, 1],
  ["F", "Uruguay",         0, 0, 0, 0, 0, 0,  0, 0],
  ["F", "Nigeria",         0, 0, 0, 0, 0, 0,  0, 0],
  // Group G — upcoming
  ["G", "Belgium",         0, 0, 0, 0, 0, 0,  0, 0],
  ["G", "Croatia",         0, 0, 0, 0, 0, 0,  0, 0],
  ["G", "Qatar",           0, 0, 0, 0, 0, 0,  0, 0],
  ["G", "Cameroon",        0, 0, 0, 0, 0, 0,  0, 0],
  // Group H — upcoming
  ["H", "Italy",           0, 0, 0, 0, 0, 0,  0, 0],
  ["H", "Colombia",        0, 0, 0, 0, 0, 0,  0, 0],
  ["H", "Denmark",         0, 0, 0, 0, 0, 0,  0, 0],
  ["H", "Ghana",           0, 0, 0, 0, 0, 0,  0, 0],
  // Group I — upcoming
  ["I", "Switzerland",     0, 0, 0, 0, 0, 0,  0, 0],
  ["I", "Serbia",          0, 0, 0, 0, 0, 0,  0, 0],
  ["I", "Tunisia",         0, 0, 0, 0, 0, 0,  0, 0],
  ["I", "Ivory Coast",     0, 0, 0, 0, 0, 0,  0, 0],
  // Group J — upcoming
  ["J", "Poland",          0, 0, 0, 0, 0, 0,  0, 0],
  ["J", "Austria",         0, 0, 0, 0, 0, 0,  0, 0],
  ["J", "Egypt",           0, 0, 0, 0, 0, 0,  0, 0],
  ["J", "Jamaica",         0, 0, 0, 0, 0, 0,  0, 0],
  // Group K — upcoming
  ["K", "Turkey",          0, 0, 0, 0, 0, 0,  0, 0],
  ["K", "Saudi Arabia",    0, 0, 0, 0, 0, 0,  0, 0],
  ["K", "Jordan",          0, 0, 0, 0, 0, 0,  0, 0],
  ["K", "New Zealand",     0, 0, 0, 0, 0, 0,  0, 0],
  // Group L — upcoming
  ["L", "Ukraine",         0, 0, 0, 0, 0, 0,  0, 0],
  ["L", "Paraguay",        0, 0, 0, 0, 0, 0,  0, 0],
  ["L", "Panama",          0, 0, 0, 0, 0, 0,  0, 0],
  ["L", "Costa Rica",      0, 0, 0, 0, 0, 0,  0, 0],
].map(([group, team, played, won, drawn, lost, gf, ga, gd, pts]) => ({
  group: group as string, team: team as string,
  played: played as number, won: won as number, drawn: drawn as number,
  lost: lost as number, gf: gf as number, ga: ga as number,
  gd: gd as number, pts: pts as number,
}));

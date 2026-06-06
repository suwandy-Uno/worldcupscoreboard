import type { Match } from "@/lib/types";

export const matches: Match[] = [
  { id: "m1", slug: "mexico-south-africa-group-a", group: "A", home: "Mexico", away: "South Africa", homeScore: 2, awayScore: 1, venue: "Estadio Azteca", isoDate: "2026-06-11T20:00:00Z", status: "live", minute: 72, scorers: ["H. Lozano 23'", "U. Antuna 65'", "P. Tau 45+1'"] },
  { id: "m2", slug: "spain-japan-group-b", group: "B", home: "Spain", away: "Japan", homeScore: 1, awayScore: 0, venue: "BC Place", isoDate: "2026-06-11T22:00:00Z", status: "live", minute: 58, scorers: ["A. Morata 31'"] },
  { id: "m3", slug: "usa-iran-group-c", group: "C", home: "USA", away: "Iran", homeScore: 1, awayScore: 1, venue: "AT&T Stadium", isoDate: "2026-06-12T01:00:00Z", status: "halftime", minute: 45, scorers: ["T. Weah 14'", "M. Taremi 37'"] },
  { id: "m4", slug: "france-australia-group-d", group: "D", home: "France", away: "Australia", homeScore: null, awayScore: null, venue: "Al Janoub Stadium", isoDate: "2026-06-12T16:00:00Z", status: "upcoming", scorers: [] },
  { id: "m5", slug: "england-denmark-group-c", group: "C", home: "England", away: "Denmark", homeScore: null, awayScore: null, venue: "AT&T Stadium", isoDate: "2026-06-12T19:00:00Z", status: "upcoming", scorers: [] },
  { id: "m6", slug: "brazil-korea-republic-group-e", group: "E", home: "Brazil", away: "Korea Republic", homeScore: null, awayScore: null, venue: "SoFi Stadium", isoDate: "2026-06-12T22:00:00Z", status: "upcoming", scorers: [] },
  { id: "m7", slug: "argentina-canada-group-d", group: "D", home: "Argentina", away: "Canada", homeScore: null, awayScore: null, venue: "Mercedes-Benz Stadium", isoDate: "2026-06-13T01:00:00Z", status: "upcoming", scorers: [] },
  { id: "m8", slug: "portugal-senegal-group-f", group: "F", home: "Portugal", away: "Senegal", homeScore: 2, awayScore: 2, venue: "MetLife Stadium", isoDate: "2026-06-10T21:00:00Z", status: "finished", scorers: ["B. Fernandes", "C. Ronaldo", "S. Mane", "I. Sarr"] }
];

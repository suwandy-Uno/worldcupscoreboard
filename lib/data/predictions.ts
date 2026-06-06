import type { Prediction } from "@/lib/types";

export const predictions: Prediction[] = [
  { matchId: "m7", homeWin: 45, draw: 27, awayWin: 28, projectedScore: "2 - 1", confidence: "Medium", factors: ["recent form", "chance creation", "injury availability"] },
  { matchId: "m4", homeWin: 61, draw: 23, awayWin: 16, projectedScore: "2 - 0", confidence: "High", factors: ["squad depth", "attack rating", "defensive record"] },
  { matchId: "m5", homeWin: 52, draw: 25, awayWin: 23, projectedScore: "1 - 0", confidence: "Medium", factors: ["set pieces", "midfield control", "travel load"] }
];

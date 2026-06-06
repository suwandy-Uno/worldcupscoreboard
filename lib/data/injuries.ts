import type { Injury } from "@/lib/types";

export const injuries: Injury[] = [
  { id: "i1", player: "J. Kimmich", team: "Germany", status: "Out", severity: "Medium", issue: "Muscle injury", expectedReturn: "Group stage review", source: "Provider placeholder", updatedAt: new Date().toISOString() },
  { id: "i2", player: "Neymar Jr.", team: "Brazil", status: "Doubtful", severity: "High", issue: "Knee injury", expectedReturn: "Matchday decision", source: "Provider placeholder", updatedAt: new Date().toISOString() },
  { id: "i3", player: "P. Pogba", team: "France", status: "Out", severity: "High", issue: "Ankle injury", expectedReturn: "Unknown", source: "Provider placeholder", updatedAt: new Date().toISOString() },
  { id: "i4", player: "T. Adams", team: "USA", status: "Fit", severity: "Low", issue: "Managed minutes", expectedReturn: "Available", source: "Provider placeholder", updatedAt: new Date().toISOString() }
];

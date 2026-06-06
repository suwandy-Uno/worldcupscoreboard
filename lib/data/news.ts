import type { NewsItem } from "@/lib/types";

export const news: NewsItem[] = [
  { id: "n1", title: "USA ready to make World Cup home advantage count", category: "Team News", summary: "Sample editorial brief for future licensed or original content.", image: "linear-gradient(135deg,#1f6fff,#f33)", publishedAt: new Date().toISOString() },
  { id: "n2", title: "Argentina finalize sample squad plan for 2026", category: "Tournament", summary: "Mock article card prepared for manual publishing workflows.", image: "linear-gradient(135deg,#6ec6ff,#ffffff)", publishedAt: new Date().toISOString() },
  { id: "n3", title: "England confidence high before Denmark fixture", category: "Match Preview", summary: "Synthetic preview text only; replace with original reporting.", image: "linear-gradient(135deg,#fff,#e43)", publishedAt: new Date().toISOString() },
  { id: "n4", title: "Brazil injury update: key players monitored", category: "Injuries", summary: "Mock injury headline for API-ready content integration.", image: "linear-gradient(135deg,#1a9a4a,#f5dd4b)", publishedAt: new Date().toISOString() }
];

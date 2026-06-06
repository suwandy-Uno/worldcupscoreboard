import type { NewsItem } from "@/lib/types";

export const news: NewsItem[] = [
  {
    id: "n1",
    title: "USA ready to make World Cup home advantage count",
    category: "Team News",
    summary: "The USMNT looks poised to capitalise on home support across 11 American host cities as preparations enter final stage.",
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    id: "n2",
    title: "Argentina finalise squad plan ahead of 2026 defence",
    category: "Tournament",
    summary: "Scaloni names a 26-man training squad as reigning champions Argentina gear up to defend their World Cup crown.",
    image: "https://images.unsplash.com/photo-1551958219-acbc630c1ea1?w=600&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    id: "n3",
    title: "England confidence high before opening Group C fixture",
    category: "Match Preview",
    summary: "Gareth Southgate's men arrive in form after a perfect qualifying campaign, eyes firmly on a first World Cup triumph since 1966.",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    id: "n4",
    title: "Brazil injury update: key players monitored ahead of kick-off",
    category: "Injuries",
    summary: "The Seleção medical team keeps close tabs on two first-choice starters as the squad arrives at their New York training base.",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80",
    publishedAt: new Date().toISOString()
  }
];

import type { Metadata } from "next";
import { HomeDashboard } from "@/components/home-dashboard";
import { getInjuries, getMatches, getStandings } from "@/lib/services/sports-data";
import { getPredictionCards } from "@/lib/services/prediction-engine";
import { getNews } from "@/lib/services/news-data";

export const metadata: Metadata = {
  title: "World Cup 2026 Live Scores, Schedule & Standings",
  description:
    "Follow every World Cup 2026 match live. Real-time scores, group standings, injury news and match predictions for all 48 games across USA, Canada and Mexico.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "World Cup 2026 Live Scores — Free & Real-Time",
    description:
      "Live scores, standings and fixtures for every FIFA World Cup 2026 match. Updated in real time. No subscription needed.",
    url: "https://worldcupscoreboard.com",
  },
};

export default async function HomePage() {
  const [matches, standings, predictionCards, injuries, news] = await Promise.all([
    getMatches(),
    getStandings(),
    getPredictionCards(),
    getInjuries(),
    getNews(),
  ]);

  return (
    <HomeDashboard
      matches={matches}
      standings={standings}
      predictionCards={predictionCards}
      injuries={injuries}
      news={news}
    />
  );
}

import { HomeDashboard } from "@/components/home-dashboard";
import { getInjuries, getMatches, getStandings } from "@/lib/services/sports-data";
import { getPredictionCards } from "@/lib/services/prediction-engine";
import { getNews } from "@/lib/services/news-data";

export default async function HomePage() {
  const [matches, standings, predictionCards, injuries, news] = await Promise.all([
    getMatches(),
    getStandings(),
    getPredictionCards(),
    getInjuries(),
    getNews()
  ]);

  return <HomeDashboard matches={matches} standings={standings} predictionCards={predictionCards} injuries={injuries} news={news} />;
}

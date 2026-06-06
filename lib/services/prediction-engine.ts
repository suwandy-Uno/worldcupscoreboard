import { getMatches, getPredictions } from "@/lib/services/sports-data";

export async function getPredictionCards() {
  const [matches, predictions] = await Promise.all([getMatches(), getPredictions()]);

  return predictions.map((prediction) => ({
    prediction,
    match: matches.find((match) => match.id === prediction.matchId)
  }));
}

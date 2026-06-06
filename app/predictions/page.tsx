import type { Metadata } from "next";
import { AutoPredictions } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { getMatches, getPredictions } from "@/lib/services/sports-data";

export const metadata: Metadata = { title: "World Cup 2026 Predictions", description: "Entertainment-only statistical match predictions with probability and projected score cards." };

export default async function PredictionsPage() {
  const [matches, predictions] = await Promise.all([getMatches(), getPredictions()]);
  return (
    <>
      <PageHeader title="World Cup 2026 Predictions" description="Statistical estimates for entertainment and analysis only. No betting links, no gambling CTA." />
      <AutoPredictions matches={matches} predictions={predictions} />
    </>
  );
}

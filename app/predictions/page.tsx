import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { TimezoneSelector } from "@/components/ui/timezone-selector";
import { PhasedPredictions } from "@/components/ui/phased-predictions";
import { getMatches, getPredictions } from "@/lib/services/sports-data";

export const metadata: Metadata = {
  title: "World Cup 2026 Match Predictions — All 104 Fixtures",
  description: "Statistical win-probability predictions for every FIFA World Cup 2026 match. Powered by FIFA rankings and recent form — for entertainment and analysis only.",
  alternates: { canonical: "/predictions" },
  openGraph: {
    title: "World Cup 2026 Predictions — Every Match Win Probability",
    description: "See projected scores and win chances for all 104 WC2026 fixtures, updated as teams advance.",
    url: "https://worldcupscoreboard.com/predictions",
  },
};

export default async function PredictionsPage() {
  const [matches, predictions] = await Promise.all([getMatches(), getPredictions()]);
  return (
    <>
      <PageHeader
        title="World Cup 2026 Predictions"
        description="Win probabilities computed from FIFA rankings and recent form — statistical estimates for analysis only, not betting advice."
      >
        <TimezoneSelector />
      </PageHeader>
      <PhasedPredictions matches={matches} predictions={predictions} />
    </>
  );
}

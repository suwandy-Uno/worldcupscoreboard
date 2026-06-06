import type { Metadata } from "next";
import { LiveScoresView } from "@/components/live-scores-view";
import { PageHeader } from "@/components/ui/page-header";
import { getMatches } from "@/lib/services/sports-data";

export const metadata: Metadata = { title: "World Cup 2026 Live Scores", description: "Live match cards, score updates, match clocks, and timeline placeholders." };

export default async function LiveScoresPage() {
  const matches = await getMatches();
  return (
    <>
      <PageHeader title="World Cup 2026 Live Scores" description="Live, halftime, upcoming, and finished sample match cards with API-ready polling." />
      <LiveScoresView matches={matches} />
    </>
  );
}

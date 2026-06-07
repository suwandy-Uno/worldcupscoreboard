import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { InjuryFilterView } from "@/components/ui/injury-filter-view";
import { getInjuries } from "@/lib/services/sports-data";

export const metadata: Metadata = {
  title: "World Cup 2026 Injury Tracker — Player Fitness Updates",
  description: "Full World Cup 2026 injury and suspension tracker. See which players are Out, Doubtful or Suspended before every match. Updated live.",
  alternates: { canonical: "/injuries" },
  openGraph: {
    title: "World Cup 2026 Injury & Suspension Tracker",
    description: "Who is injured, suspended or doubtful for the 2026 FIFA World Cup? Full player fitness tracker.",
    url: "https://worldcupscoreboard.com/injuries",
  },
};

export default async function InjuriesPage() {
  const injuries = await getInjuries();
  return (
    <>
      <PageHeader
        title="World Cup 2026 Injuries"
        description="Latest injury news and suspension updates for all 48 teams. Check player fitness before every match."
      />
      <InjuryFilterView injuries={injuries} />
    </>
  );
}

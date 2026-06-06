import type { Metadata } from "next";
import { AutoInjuries } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
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
      <PageHeader title="World Cup 2026 Injuries" description="Injury and suspension tracker with auto-updating timestamps and future provider source fields." />
      <SearchFilterBar placeholder="Filter by player, team, or status..." />
      <AutoInjuries injuries={injuries} />
    </>
  );
}

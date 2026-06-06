import type { Metadata } from "next";
import { AutoStandings } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { getStandings } from "@/lib/services/sports-data";

export const metadata: Metadata = {
  title: "World Cup 2026 Group Standings — Live Tables",
  description: "Live FIFA World Cup 2026 group standings updated in real time. Groups A to L — see who qualifies for the Round of 32.",
  alternates: { canonical: "/standings" },
  openGraph: {
    title: "World Cup 2026 Live Standings — All Groups",
    description: "Real-time group tables for all 12 groups at the 2026 FIFA World Cup.",
    url: "https://worldcupscoreboard.com/standings",
  },
};

export default async function StandingsPage() {
  const standings = await getStandings();
  return (
    <>
      <PageHeader title="World Cup 2026 Standings" description="Live group tables for all 12 groups. See which teams qualify for the knockout rounds." />
      <SearchFilterBar placeholder="Filter by team or group..." />
      <AutoStandings standings={standings} />
    </>
  );
}

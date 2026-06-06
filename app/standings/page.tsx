import type { Metadata } from "next";
import { AutoStandings } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { getStandings } from "@/lib/services/sports-data";

export const metadata: Metadata = { title: "World Cup 2026 Standings", description: "Live group tables with qualification highlighting and mobile-readable layouts." };

export default async function StandingsPage() {
  const standings = await getStandings();
  return (
    <>
      <PageHeader title="World Cup 2026 Standings" description="Group tables A to L are API-ready; current rows use realistic sample data." />
      <SearchFilterBar placeholder="Filter by team or group..." />
      <AutoStandings standings={standings} />
    </>
  );
}

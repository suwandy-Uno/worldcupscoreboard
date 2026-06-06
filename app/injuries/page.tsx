import type { Metadata } from "next";
import { AutoInjuries } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { getInjuries } from "@/lib/services/sports-data";

export const metadata: Metadata = { title: "World Cup 2026 Injuries", description: "Sample injury and suspension tracker with team, status, severity, expected return, and source fields." };

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

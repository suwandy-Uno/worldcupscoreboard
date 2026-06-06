import type { Metadata } from "next";
import { AutoSchedule } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { TimezoneSelector } from "@/components/ui/timezone-selector";
import { getMatches } from "@/lib/services/sports-data";

export const metadata: Metadata = { title: "World Cup 2026 Schedule in Your Timezone", description: "Full sample World Cup 2026 schedule with timezone-aware match times, filters, and calendar placeholders." };

export default async function SchedulePage() {
  const matches = await getMatches();
  return (
    <>
      <PageHeader title="World Cup 2026 Schedule in Your Timezone" description="Browse all sample fixtures with local times, venue details, statuses, filters, and add-to-calendar placeholders.">
        <TimezoneSelector />
      </PageHeader>
      <SearchFilterBar />
      <AutoSchedule matches={matches} />
    </>
  );
}

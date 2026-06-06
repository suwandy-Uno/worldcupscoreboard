import type { Metadata } from "next";
import { AutoSchedule } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { TimezoneSelector } from "@/components/ui/timezone-selector";
import { getMatches } from "@/lib/services/sports-data";

export const metadata: Metadata = {
  title: "World Cup 2026 Match Schedule — All 104 Fixtures",
  description: "Complete FIFA World Cup 2026 match schedule with kick-off times in your local timezone. Filter by group, team or date. USA, Canada, Mexico host venues.",
  alternates: { canonical: "/schedule" },
  openGraph: {
    title: "World Cup 2026 Full Schedule — Every Match, Your Timezone",
    description: "All 104 World Cup 2026 fixtures with local kick-off times. Group stage through final.",
    url: "https://worldcupscoreboard.com/schedule",
  },
};

export default async function SchedulePage() {
  const matches = await getMatches();
  return (
    <>
      <PageHeader title="World Cup 2026 Match Schedule" description="All World Cup 2026 fixtures with kick-off times converted to your local timezone. Filter by group, team or venue.">
        <TimezoneSelector />
      </PageHeader>
      <SearchFilterBar />
      <AutoSchedule matches={matches} />
    </>
  );
}

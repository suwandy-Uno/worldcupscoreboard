import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { TimezoneSelector } from "@/components/ui/timezone-selector";
import { WeeklySchedule } from "@/components/ui/weekly-schedule";
import { getMatches } from "@/lib/services/sports-data";

export const metadata: Metadata = {
  title: "World Cup 2026 Match Schedule — All 104 Fixtures",
  description: "Complete FIFA World Cup 2026 match schedule with kick-off times in your local timezone. All 104 matches from group stage to final. USA, Canada, Mexico host venues.",
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
      <PageHeader
        title="World Cup 2026 Match Schedule"
        description="All 104 fixtures — group stage through the final — with kick-off times in your local timezone."
      >
        <TimezoneSelector />
      </PageHeader>
      <WeeklySchedule matches={matches} />
    </>
  );
}

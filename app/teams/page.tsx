import type { Metadata } from "next";
import { AutoTeams } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { getTeams } from "@/lib/services/sports-data";

export const metadata: Metadata = {
  title: "World Cup 2026 Teams — All 48 Qualified Nations",
  description: "All 48 qualified teams at the 2026 FIFA World Cup. Browse squads, group assignments, FIFA rankings, and recent form for every nation.",
  alternates: { canonical: "/teams" },
  openGraph: {
    title: "World Cup 2026 Teams — All 48 Nations",
    description: "Browse all 48 World Cup 2026 teams with group assignments, FIFA rankings, and squad info.",
    url: "https://worldcupscoreboard.com/teams",
  },
};

export default async function TeamsPage() {
  const teams = await getTeams();
  return (
    <>
      <PageHeader title="World Cup 2026 Teams" description="All 48 qualified nations competing in the USA, Canada & Mexico. Browse squads, group assignments, and FIFA rankings." />
      <SearchFilterBar placeholder="Search teams..." />
      <AutoTeams teams={teams} />
    </>
  );
}

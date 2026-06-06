import type { Metadata } from "next";
import { AutoTeams } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { getTeams } from "@/lib/services/sports-data";

export const metadata: Metadata = { title: "World Cup 2026 Teams", description: "All sample teams with flags, group, ranking placeholders, form, and detail pages." };

export default async function TeamsPage() {
  const teams = await getTeams();
  return (
    <>
      <PageHeader title="World Cup 2026 Teams" description="Sample tournament field for layout and API integration. Verify final qualified teams before launch." />
      <SearchFilterBar placeholder="Search teams..." />
      <AutoTeams teams={teams} />
    </>
  );
}

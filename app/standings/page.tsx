import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { StandingsTable } from "@/components/ui/standings-table";
import { standings } from "@/lib/data/standings";

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

export default function StandingsPage() {
  const groups = Array.from(new Set(standings.map((r) => r.group)));
  return (
    <>
      <PageHeader
        title="World Cup 2026 Standings"
        description="Live group tables. See which teams qualify for the knockout rounds."
      />
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <StandingsTable
            key={group}
            group={group}
            rows={standings.filter((r) => r.group === group)}
          />
        ))}
      </div>
    </>
  );
}

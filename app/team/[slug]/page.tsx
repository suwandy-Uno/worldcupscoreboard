import type { Metadata } from "next";
import { InjuryTable } from "@/components/ui/injury-table";
import { PageHeader } from "@/components/ui/page-header";
import { ScheduleTable } from "@/components/ui/schedule-table";
import { StandingsTable } from "@/components/ui/standings-table";
import { getInjuries, getMatches, getStandings, getTeams } from "@/lib/services/sports-data";

export async function generateStaticParams() {
  const teams = await getTeams();
  return teams.map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const team = (await getTeams()).find((item) => item.slug === params.slug);
  return { title: team ? `${team.name} World Cup 2026 Team Hub` : "Team Hub", description: "Fixtures, group standing, injuries, predictions, and related sample news." };
}

export default async function TeamPage({ params }: { params: { slug: string } }) {
  const [teams, matches, standings, injuries] = await Promise.all([getTeams(), getMatches(), getStandings(), getInjuries()]);
  const team = teams.find((item) => item.slug === params.slug) ?? teams[0];
  const fixtures = matches.filter((match) => match.home === team.name || match.away === team.name);
  const groupRows = standings.filter((row) => row.group === team.group);
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        {team.flagCode && (
          <img src={`https://flagcdn.com/w80/${team.flagCode}.png`} alt={team.name} width={56} height={42} className="rounded shadow" />
        )}
        <div>
          <h1 className="text-2xl font-black">{team.name}</h1>
          <p className="text-sm text-slate-400">Group {team.group} · {team.confederation} · FIFA ranking #{team.ranking}</p>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <ScheduleTable matches={fixtures.length ? fixtures : matches.slice(0, 4)} />
          <StandingsTable group={team.group} rows={groupRows} />
        </section>
        <aside className="space-y-5">
          <div className="card p-4">
            <h2 className="font-bold">Squad Placeholder</h2>
            <p className="mt-2 text-sm text-slate-400">Player list, positions, minutes, and selection notes are ready for a licensed data source.</p>
          </div>
          <InjuryTable injuries={injuries.filter((item) => item.team === team.name).slice(0, 3)} />
        </aside>
      </div>
    </>
  );
}

"use client";

import type { Injury, Match, NewsItem, Prediction, Standing, Team, Venue } from "@/lib/types";
import { useAutoRefresh } from "@/lib/hooks/use-auto-refresh";
import { InjuryTable } from "@/components/ui/injury-table";
import { NewsCard } from "@/components/ui/news-card";
import { PredictionCard } from "@/components/ui/prediction-card";
import { ScheduleTable } from "@/components/ui/schedule-table";
import { StandingsTable } from "@/components/ui/standings-table";
import { TeamCard } from "@/components/ui/team-card";
import { VenueCard } from "@/components/ui/venue-card";

function RefreshNote({ date }: { date: Date }) {
  return <p className="mb-3 text-right text-xs text-slate-400">Auto refreshed {date.toLocaleTimeString()}</p>;
}

export function AutoSchedule({ matches }: { matches: Match[] }) {
  const state = useAutoRefresh(matches, "/api/matches", 30000);
  return <><RefreshNote date={state.updatedAt} /><ScheduleTable matches={state.data} /></>;
}

export function AutoStandings({ standings }: { standings: Standing[] }) {
  const state = useAutoRefresh(standings, "/api/standings", 45000);
  const groups = Array.from(new Set(state.data.map((row) => row.group)));
  return <><RefreshNote date={state.updatedAt} /><div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">{groups.map((group) => <StandingsTable key={group} group={group} rows={state.data.filter((row) => row.group === group)} />)}</div></>;
}

export function AutoInjuries({ injuries }: { injuries: Injury[] }) {
  const state = useAutoRefresh(injuries, "/api/injuries", 60000);
  return <><RefreshNote date={state.updatedAt} /><InjuryTable injuries={state.data} /></>;
}

export function AutoNews({ news }: { news: NewsItem[] }) {
  const state = useAutoRefresh(news, "/api/news", 90000);
  return <><RefreshNote date={state.updatedAt} /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{state.data.map((item) => <NewsCard key={item.id} item={item} />)}</div></>;
}

export function AutoPredictions({ matches, predictions }: { matches: Match[]; predictions: Prediction[] }) {
  const matchState = useAutoRefresh(matches, "/api/matches", 30000);
  const predictionState = useAutoRefresh(predictions, "/api/predictions", 60000);
  return (
    <>
      <RefreshNote date={predictionState.updatedAt} />
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {predictionState.data.map((prediction) => {
          const match = matchState.data.find((item) => item.id === prediction.matchId);
          return match ? <PredictionCard key={prediction.matchId} match={match} prediction={prediction} /> : null;
        })}
      </div>
    </>
  );
}

export function AutoTeams({ teams }: { teams: Team[] }) {
  const state = useAutoRefresh(teams, "/api/teams", 120000);
  return <><RefreshNote date={state.updatedAt} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{state.data.map((team) => <TeamCard key={team.id} team={team} />)}</div></>;
}

export function AutoVenues({ venues }: { venues: Venue[] }) {
  const state = useAutoRefresh(venues, "/api/venues", 120000);
  return <><RefreshNote date={state.updatedAt} /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{state.data.map((venue) => <VenueCard key={venue.id} venue={venue} />)}</div></>;
}

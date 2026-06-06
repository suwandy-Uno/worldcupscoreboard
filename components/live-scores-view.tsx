"use client";

import type { Match } from "@/lib/types";
import { useAutoRefresh } from "@/lib/hooks/use-auto-refresh";
import { MatchCard } from "@/components/ui/match-card";

export function LiveScoresView({ matches }: { matches: Match[] }) {
  const state = useAutoRefresh(matches, "/api/matches", 10000);
  const tabs = ["live", "halftime", "upcoming", "finished"] as const;
  return (
    <div className="space-y-5">
      <div className="card flex flex-wrap items-center gap-2 p-3 text-sm">
        {tabs.map((tab) => <span key={tab} className="rounded bg-white/7 px-3 py-2 capitalize">{tab}</span>)}
        <span className="ml-auto text-xs text-slate-400">Auto refreshed {state.updatedAt.toLocaleTimeString()}</span>
      </div>
      {tabs.map((tab) => (
        <section key={tab}>
          <h2 className="mb-3 text-xl font-bold capitalize">{tab}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {state.data.filter((match) => match.status === tab).map((match) => <MatchCard key={match.id} match={match} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

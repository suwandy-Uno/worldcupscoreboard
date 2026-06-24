"use client";

import { useState } from "react";
import type { Match, MatchStatus } from "@/lib/types";
import { useAutoRefresh } from "@/lib/hooks/use-auto-refresh";
import { MatchCard } from "@/components/ui/match-card";

type Tab = "top" | MatchStatus;

const STATUS_ORDER: Record<MatchStatus, number> = { live: 0, halftime: 1, upcoming: 2, finished: 3 };

function sortedTop(matches: Match[], limit: number): Match[] {
  return [...matches]
    .sort((a, b) => {
      const so = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      if (so !== 0) return so;
      return new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime();
    })
    .slice(0, limit);
}

const TABS: { key: Tab; label: string }[] = [
  { key: "top",      label: "Top 15" },
  { key: "live",     label: "Live" },
  { key: "halftime", label: "Halftime" },
  { key: "upcoming", label: "Upcoming" },
  { key: "finished", label: "Finished" },
];

export function LiveScoresView({ matches }: { matches: Match[] }) {
  const state = useAutoRefresh(matches, "/api/matches", 10000);
  const [activeTab, setActiveTab] = useState<Tab>("top");

  const displayed =
    activeTab === "top"
      ? sortedTop(state.data, 15)
      : state.data.filter(m => m.status === activeTab);

  const countFor = (tab: Tab) =>
    tab === "top" ? Math.min(state.data.length, 15) : state.data.filter(m => m.status === tab).length;

  return (
    <div className="space-y-5">
      {/* Tab bar */}
      <div className="card flex flex-wrap items-center gap-2 p-3 text-sm">
        {TABS.map(({ key, label }) => {
          const count = countFor(key);
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`rounded px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                isActive
                  ? "bg-brand text-white font-semibold"
                  : "bg-white/7 text-slate-300 hover:bg-white/12"
              }`}
            >
              {label}
              {(key === "live" || key === "halftime") && count > 0 && (
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : "bg-rose-500"} animate-pulse`} />
              )}
              <span className={`text-[10px] ${isActive ? "text-white/70" : "text-slate-500"}`}>{count}</span>
            </button>
          );
        })}
        <span className="ml-auto text-xs text-slate-400">
          Updated {state.updatedAt.toLocaleTimeString()}
        </span>
      </div>

      {/* Match grid */}
      {displayed.length === 0 ? (
        <div className="card p-8 text-center text-slate-500">No matches in this category right now.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {displayed.map(match => <MatchCard key={match.id} match={match} />)}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Match } from "@/lib/types";
import { useAutoRefresh } from "@/lib/hooks/use-auto-refresh";
import { useTimezone } from "@/lib/hooks/use-timezone";
import { formatMatchTime } from "@/lib/services/timezone";
import { getTeam } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { CalendarPlus } from "lucide-react";

// ─── Phase label + date range ────────────────────────────────────────────────
type Phase = {
  key: string;
  label: string;
  dateRange: string;
  from: Date;
  to: Date;
};

const PHASES: Phase[] = [
  { key: "md1", label: "Group Stage · Matchday 1", dateRange: "Jun 11–17",        from: new Date("2026-06-11"), to: new Date("2026-06-17T23:59:59Z") },
  { key: "md2", label: "Group Stage · Matchday 2", dateRange: "Jun 18–24",        from: new Date("2026-06-18"), to: new Date("2026-06-24T23:59:59Z") },
  { key: "md3", label: "Group Stage · Matchday 3", dateRange: "Jun 25–26",        from: new Date("2026-06-25"), to: new Date("2026-06-26T23:59:59Z") },
  { key: "r32", label: "Round of 32",              dateRange: "Jun 28 – Jul 3",   from: new Date("2026-06-28"), to: new Date("2026-07-03T23:59:59Z") },
  { key: "r16", label: "Round of 16",              dateRange: "Jul 5–8",          from: new Date("2026-07-05"), to: new Date("2026-07-08T23:59:59Z") },
  { key: "qf",  label: "Quarter-finals",           dateRange: "Jul 11–12",        from: new Date("2026-07-11"), to: new Date("2026-07-12T23:59:59Z") },
  { key: "sf",  label: "Semi-finals",              dateRange: "Jul 15–16",        from: new Date("2026-07-15"), to: new Date("2026-07-16T23:59:59Z") },
  { key: "fin", label: "Final & Third Place",       dateRange: "Jul 19",           from: new Date("2026-07-19"), to: new Date("2026-07-19T23:59:59Z") },
];

const PHASE_BADGE: Record<string, string> = {
  md1: "bg-brand/20 text-brand",
  md2: "bg-brand/20 text-brand",
  md3: "bg-brand/20 text-brand",
  r32: "bg-emerald-900/40 text-emerald-400",
  r16: "bg-purple-900/40 text-purple-400",
  qf:  "bg-amber-900/40 text-amber-400",
  sf:  "bg-rose-900/40 text-rose-400",
  fin: "bg-yellow-900/40 text-yellow-400",
};

function phaseForDate(isoDate: string): Phase | undefined {
  const d = new Date(isoDate);
  return PHASES.find(p => d >= p.from && d <= p.to);
}

function MatchRow({ match, timezone }: { match: Match; timezone: string }) {
  const home = getTeam(match.home);
  const away = getTeam(match.away);
  const isKnockout = ["R32","R16","QF","SF","3P","F"].includes(match.group);

  return (
    <tr className="border-b border-line last:border-0 hover:bg-white/[.03] transition-colors">
      {/* Phase/Group tag */}
      <td className="hidden sm:table-cell px-3 py-3 text-xs text-slate-400 whitespace-nowrap w-20">
        {isKnockout ? match.group : `Group ${match.group}`}
      </td>
      {/* Date/time */}
      <td className="px-3 py-3 font-semibold text-sm whitespace-nowrap">
        {formatMatchTime(match.isoDate, timezone)}
      </td>
      {/* Home team */}
      <td className="px-3 py-3 text-right">
        <span className="inline-flex items-center justify-end gap-1.5 text-sm">
          <span className="hidden xs:inline">{match.home}</span>
          <span className="xs:hidden truncate max-w-[70px]">{home?.slug ? match.home.split(" ")[0] : match.home}</span>
          {home?.flagCode && (
            <img src={`https://flagcdn.com/w40/${home.flagCode}.png`} alt={match.home}
              width={20} height={15} className="rounded-sm object-cover flex-shrink-0" />
          )}
        </span>
      </td>
      {/* Score or vs */}
      <td className="px-2 py-3 text-center font-bold tabular-nums text-sm w-16">
        {match.homeScore !== null && match.awayScore !== null
          ? `${match.homeScore} – ${match.awayScore}`
          : <span className="text-slate-400 font-normal">vs</span>}
      </td>
      {/* Away team */}
      <td className="px-3 py-3">
        <span className="inline-flex items-center gap-1.5 text-sm">
          {away?.flagCode && (
            <img src={`https://flagcdn.com/w40/${away.flagCode}.png`} alt={match.away}
              width={20} height={15} className="rounded-sm object-cover flex-shrink-0" />
          )}
          <span className="hidden xs:inline">{match.away}</span>
          <span className="xs:hidden truncate max-w-[70px]">{match.away.split(" ")[0]}</span>
        </span>
      </td>
      {/* Venue */}
      <td className="hidden lg:table-cell px-3 py-3 text-xs text-slate-400 truncate max-w-[160px]">
        {match.venue}
      </td>
      {/* Status */}
      <td className="px-3 py-3 w-28">
        <StatusBadge status={match.status} minute={match.minute} />
      </td>
      {/* Add to calendar */}
      <td className="hidden sm:table-cell px-3 py-3 w-8">
        <CalendarPlus className="h-3.5 w-3.5 text-slate-500 hover:text-slate-300 cursor-pointer" />
      </td>
    </tr>
  );
}

function PhaseSection({
  phase, matches, timezone, defaultOpen,
}: {
  phase: Phase; matches: Match[]; timezone: string; defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const liveCount = matches.filter(m => m.status === "live" || m.status === "halftime").length;
  const finishedCount = matches.filter(m => m.status === "finished").length;

  return (
    <div className="card overflow-hidden">
      {/* Phase header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[.04] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${PHASE_BADGE[phase.key] ?? "bg-white/10 text-slate-300"}`}>
            {phase.dateRange}
          </span>
          <span className="font-bold text-sm">{phase.label}</span>
          {liveCount > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
              {liveCount} LIVE
            </span>
          )}
          <span className="text-xs text-slate-500">{matches.length} matches{finishedCount > 0 ? ` · ${finishedCount} played` : ""}</span>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />}
      </button>

      {/* Match rows */}
      {open && (
        <div className="border-t border-line overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <tbody>
              {matches
                .sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime())
                .map(m => <MatchRow key={m.id} match={m} timezone={timezone} />)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function WeeklySchedule({ matches: initial }: { matches: Match[] }) {
  const { data: matches } = useAutoRefresh(initial, "/api/matches", 30000);
  const { timezone } = useTimezone();

  // Group matches by phase
  const byPhase = new Map<string, Match[]>();
  for (const m of matches) {
    const phase = phaseForDate(m.isoDate);
    if (!phase) continue;
    if (!byPhase.has(phase.key)) byPhase.set(phase.key, []);
    byPhase.get(phase.key)!.push(m);
  }

  const now = new Date();
  const activePhaseKey = PHASES.find(p => now >= p.from && now <= p.to)?.key;

  return (
    <div className="space-y-3">
      {PHASES.map(phase => {
        const phaseMathces = byPhase.get(phase.key) ?? [];
        if (phaseMathces.length === 0) return null;
        return (
          <PhaseSection
            key={phase.key}
            phase={phase}
            matches={phaseMathces}
            timezone={timezone}
            defaultOpen={phase.key === activePhaseKey || phase.key === "md1"}
          />
        );
      })}
    </div>
  );
}

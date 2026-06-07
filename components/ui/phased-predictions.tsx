"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import type { Match, Prediction } from "@/lib/types";
import { useAutoRefresh } from "@/lib/hooks/use-auto-refresh";
import { PredictionCard } from "@/components/ui/prediction-card";

// ─── Phase definitions (shared with weekly-schedule) ─────────────────────────
type Phase = { key: string; label: string; dateRange: string; from: Date; to: Date };

const PHASES: Phase[] = [
  { key: "md1", label: "Group Stage · Matchday 1", dateRange: "Jun 11–17",      from: new Date("2026-06-11"), to: new Date("2026-06-17T23:59:59Z") },
  { key: "md2", label: "Group Stage · Matchday 2", dateRange: "Jun 18–24",      from: new Date("2026-06-18"), to: new Date("2026-06-24T23:59:59Z") },
  { key: "md3", label: "Group Stage · Matchday 3", dateRange: "Jun 25–26",      from: new Date("2026-06-25"), to: new Date("2026-06-26T23:59:59Z") },
  { key: "r32", label: "Round of 32",              dateRange: "Jun 28 – Jul 3", from: new Date("2026-06-28"), to: new Date("2026-07-03T23:59:59Z") },
  { key: "r16", label: "Round of 16",              dateRange: "Jul 5–8",        from: new Date("2026-07-05"), to: new Date("2026-07-08T23:59:59Z") },
  { key: "qf",  label: "Quarter-finals",           dateRange: "Jul 11–12",      from: new Date("2026-07-11"), to: new Date("2026-07-12T23:59:59Z") },
  { key: "sf",  label: "Semi-finals",              dateRange: "Jul 15–16",      from: new Date("2026-07-15"), to: new Date("2026-07-16T23:59:59Z") },
  { key: "fin", label: "Final & Third Place",       dateRange: "Jul 19",         from: new Date("2026-07-19"), to: new Date("2026-07-19T23:59:59Z") },
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

type PredMatch = { match: Match; prediction: Prediction };

// ─── Phase section ────────────────────────────────────────────────────────────
function PhaseSection({ phase, items, defaultOpen }: { phase: Phase; items: PredMatch[]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const liveCount = items.filter(i => i.match.status === "live" || i.match.status === "halftime").length;

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[.04] transition-colors"
      >
        <div className="flex items-center gap-3 flex-wrap">
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
          <span className="text-xs text-slate-500">{items.length} predictions</span>
        </div>
        {open
          ? <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" />
          : <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />}
      </button>

      {open && (
        <div className="border-t border-line p-4">
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {items.map(({ match, prediction }) => (
              <PredictionCard key={prediction.matchId} match={match} prediction={prediction} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Placeholder for future knockout phases (teams not yet decided) ───────────
function FuturePhase({ phase }: { phase: Phase }) {
  return (
    <div className="card px-4 py-3 flex items-center gap-3 opacity-50">
      <Lock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
      <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${PHASE_BADGE[phase.key] ?? "bg-white/10 text-slate-300"}`}>
        {phase.dateRange}
      </span>
      <span className="text-sm font-medium">{phase.label}</span>
      <span className="text-xs text-slate-500">— predictions unlock once teams advance</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function PhasedPredictions({
  matches: initialMatches,
  predictions: initialPredictions,
}: {
  matches: Match[];
  predictions: Prediction[];
}) {
  const { data: matches } = useAutoRefresh(initialMatches, "/api/matches", 30000);
  const { data: predictions } = useAutoRefresh(initialPredictions, "/api/predictions", 60000);

  // Build a prediction lookup map
  const predMap = new Map(predictions.map(p => [p.matchId, p]));

  // Group joined (match + prediction) by phase
  const byPhase = new Map<string, PredMatch[]>();
  for (const match of matches) {
    const prediction = predMap.get(match.id);
    if (!prediction) continue;
    const phase = phaseForDate(match.isoDate);
    if (!phase) continue;
    if (!byPhase.has(phase.key)) byPhase.set(phase.key, []);
    byPhase.get(phase.key)!.push({ match, prediction });
  }

  // Sort matches within each phase by date
  for (const items of byPhase.values()) {
    items.sort((a, b) => new Date(a.match.isoDate).getTime() - new Date(b.match.isoDate).getTime());
  }

  const now = new Date();
  const activePhaseKey = PHASES.find(p => now >= p.from && now <= p.to)?.key;

  return (
    <div className="space-y-3">
      {PHASES.map(phase => {
        const items = byPhase.get(phase.key) ?? [];
        if (items.length > 0) {
          return (
            <PhaseSection
              key={phase.key}
              phase={phase}
              items={items}
              defaultOpen={phase.key === activePhaseKey || phase.key === "md1"}
            />
          );
        }
        // Show placeholder for future knockout phases
        if (phase.from > now) {
          return <FuturePhase key={phase.key} phase={phase} />;
        }
        return null;
      })}
    </div>
  );
}

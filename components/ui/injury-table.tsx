import type { Injury } from "@/lib/types";
import { getTeam } from "@/lib/utils";

function InjuryRow({ injury }: { injury: Injury }) {
  const team = getTeam(injury.team);
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-line p-3 text-sm last:border-0">
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 font-semibold">
          {team?.flag && <span>{team.flag}</span>}
          <span className="truncate">{injury.player}</span>
        </div>
        <div className="mt-0.5 text-xs text-slate-400">{injury.team} · {injury.issue}</div>
        <div className="mt-0.5 text-xs text-slate-500">{injury.expectedReturn}</div>
      </div>
      <span className={`shrink-0 rounded px-2 py-1 text-xs font-bold ${
        injury.status === "Out"      ? "bg-rose-600/20 text-rose-300" :
        injury.status === "Doubtful" ? "bg-amber-500/20 text-amber-200" :
                                       "bg-emerald-500/20 text-emerald-200"
      }`}>
        {injury.status}
      </span>
    </div>
  );
}

export function InjuryTable({ injuries }: { injuries: Injury[] }) {
  const mid = Math.ceil(injuries.length / 2);
  const left  = injuries.slice(0, mid);
  const right = injuries.slice(mid);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card overflow-hidden">
        {left.map((injury) => <InjuryRow key={injury.id} injury={injury} />)}
      </div>
      <div className="card overflow-hidden">
        {right.map((injury) => <InjuryRow key={injury.id} injury={injury} />)}
      </div>
    </div>
  );
}

import type { Injury } from "@/lib/types";
import { getTeam } from "@/lib/utils";

export function InjuryTable({ injuries }: { injuries: Injury[] }) {
  return (
    <div className="card overflow-hidden">
      {injuries.map((injury) => {
        const team = getTeam(injury.team);
        return (
          <div key={injury.id} className="grid gap-2 border-b border-line p-4 text-sm last:border-0 sm:grid-cols-[1.2fr_1fr_1fr_auto] sm:items-center">
            <div className="font-semibold">{team?.flag} {injury.player}<div className="text-xs font-normal text-slate-400">{injury.team}</div></div>
            <div className="text-slate-300">{injury.issue}</div>
            <div className="text-slate-400">{injury.expectedReturn}</div>
            <span className={`w-fit rounded px-2 py-1 text-xs font-bold ${injury.status === "Out" ? "bg-rose-600/20 text-rose-300" : injury.status === "Doubtful" ? "bg-amber-500/20 text-amber-200" : "bg-emerald-500/20 text-emerald-200"}`}>{injury.status}</span>
          </div>
        );
      })}
    </div>
  );
}

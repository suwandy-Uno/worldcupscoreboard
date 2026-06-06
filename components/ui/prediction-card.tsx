import type { Match, Prediction } from "@/lib/types";
import { getTeam } from "@/lib/utils";

export function PredictionCard({ match, prediction }: { match: Match; prediction: Prediction }) {
  const home = getTeam(match.home);
  const away = getTeam(match.away);
  return (
    <div className="card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Prediction</h3>
        <span className="rounded bg-brand/20 px-2 py-1 text-xs text-blue-200">{prediction.confidence}</span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
        <div><div className="text-4xl">{home?.flag}</div><p className="text-sm font-semibold">{match.home}</p></div>
        <div className="font-bold">vs</div>
        <div><div className="text-4xl">{away?.flag}</div><p className="text-sm font-semibold">{match.away}</p></div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full bg-brand" style={{ width: `${prediction.homeWin}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-300">
        <span>{match.home} {prediction.homeWin}%</span>
        <span>Draw {prediction.draw}%</span>
        <span>{match.away} {prediction.awayWin}%</span>
      </div>
      <div className="mt-5 text-center">
        <p className="text-xs text-slate-400">Projected Score</p>
        <p className="text-3xl font-bold">{prediction.projectedScore}</p>
      </div>
      <p className="mt-4 text-xs text-slate-400">Predictions are statistical estimates for entertainment and analysis only. They are not betting advice.</p>
    </div>
  );
}

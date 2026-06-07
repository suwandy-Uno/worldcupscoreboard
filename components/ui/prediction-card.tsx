import type { Match, Prediction } from "@/lib/types";
import { getTeam } from "@/lib/utils";

function ConfidenceBadge({ level }: { level: "Low" | "Medium" | "High" }) {
  const cls =
    level === "High"   ? "bg-emerald-900/40 text-emerald-400" :
    level === "Medium" ? "bg-amber-900/40 text-amber-400" :
                         "bg-slate-700/60 text-slate-400";
  return <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cls}`}>{level} confidence</span>;
}

function StatusPill({ match }: { match: Match }) {
  if (match.status === "live" || match.status === "halftime") {
    return (
      <span className="flex items-center gap-1 text-[10px] font-bold text-rose-400">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
        {match.status === "halftime" ? "HT" : `${match.minute ?? ""}′`}
      </span>
    );
  }
  if (match.status === "finished") {
    return <span className="text-[10px] text-slate-500 font-medium">FT</span>;
  }
  return null;
}

export function PredictionCard({ match, prediction }: { match: Match; prediction: Prediction }) {
  const home = getTeam(match.home);
  const away = getTeam(match.away);
  const isKnockout = ["R32", "R16", "QF", "SF", "3P", "F"].includes(match.group);
  const groupLabel = isKnockout ? match.group : `Group ${match.group}`;
  const isFinished = match.status === "finished";

  return (
    <div className="card p-4 flex flex-col gap-4">
      {/* Header: group + confidence */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">{groupLabel}</span>
        <ConfidenceBadge level={prediction.confidence} />
      </div>

      {/* Teams + score/vs */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        {/* Home */}
        <div className="flex flex-col items-center gap-1">
          {home?.flagCode ? (
            <img
              src={`https://flagcdn.com/w80/${home.flagCode}.png`}
              alt={match.home}
              width={40} height={30}
              className="rounded object-cover"
            />
          ) : (
            <span className="text-3xl">{home?.flag ?? "🏳️"}</span>
          )}
          <p className="text-xs font-semibold leading-tight">{match.home}</p>
        </div>

        {/* Score (if played) or vs */}
        <div className="flex flex-col items-center gap-0.5">
          {isFinished || match.status === "live" || match.status === "halftime"
            ? (
              <>
                <span className="text-lg font-bold tabular-nums">
                  {match.homeScore} – {match.awayScore}
                </span>
                <StatusPill match={match} />
              </>
            )
            : <span className="text-slate-400 text-sm">vs</span>
          }
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-1">
          {away?.flagCode ? (
            <img
              src={`https://flagcdn.com/w80/${away.flagCode}.png`}
              alt={match.away}
              width={40} height={30}
              className="rounded object-cover"
            />
          ) : (
            <span className="text-3xl">{away?.flag ?? "🏳️"}</span>
          )}
          <p className="text-xs font-semibold leading-tight">{match.away}</p>
        </div>
      </div>

      {/* Win probability bar */}
      <div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800 flex">
          <div className="h-full bg-brand transition-all" style={{ width: `${prediction.homeWin}%` }} />
          <div className="h-full bg-slate-600 transition-all" style={{ width: `${prediction.draw}%` }} />
          <div className="h-full bg-rose-600 transition-all" style={{ width: `${prediction.awayWin}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-slate-400">
          <span className="text-brand font-medium">{match.home.split(" ")[0]} {prediction.homeWin}%</span>
          <span>Draw {prediction.draw}%</span>
          <span className="text-rose-400 font-medium">{prediction.awayWin}% {match.away.split(" ")[0]}</span>
        </div>
      </div>

      {/* Projected score (only if not yet played) */}
      {!isFinished && (
        <div className="text-center border-t border-line pt-3">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Projected Score</p>
          <p className="text-2xl font-bold tabular-nums">{prediction.projectedScore}</p>
        </div>
      )}

      {/* Factors */}
      <ul className="space-y-1">
        {prediction.factors.map((f, i) => (
          <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
            <span className="text-slate-600 mt-0.5">·</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Disclaimer */}
      <p className="text-[10px] text-slate-600 border-t border-line pt-2">
        Statistical estimate for entertainment only — not betting advice.
      </p>
    </div>
  );
}

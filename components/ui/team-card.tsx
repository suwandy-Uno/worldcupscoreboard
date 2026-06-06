import type { Team } from "@/lib/types";

export function TeamCard({ team }: { team: Team }) {
  return (
    <a href={`/team/${team.slug}`} className="card block p-4">
      <div className="flex items-center gap-3">
        <div className="text-4xl">{team.flag}</div>
        <div>
          <h3 className="font-semibold">{team.name}</h3>
          <p className="text-xs text-slate-400">Group {team.group} · {team.confederation}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-slate-300">
        <span>Rank #{team.ranking}</span>
        <span>{team.form}</span>
      </div>
    </a>
  );
}

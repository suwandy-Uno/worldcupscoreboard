import type { Standing } from "@/lib/types";
import { getTeam } from "@/lib/utils";

export function StandingsTable({ group, rows }: { group: string; rows: Standing[] }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h3 className="font-semibold">Group {group}</h3>
        <span className="text-xs text-emerald-300">Live table</span>
      </div>
      <table className="w-full text-sm">
        <thead className="text-xs text-slate-400">
          <tr>
            <th className="px-3 py-2 text-left">Team</th>
            {["P", "W", "D", "L", "GD", "PTS"].map((col) => <th key={col} className="px-2 py-2 text-right">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const team = getTeam(row.team);
            return (
              <tr key={row.team} className="border-t border-line">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-4 shrink-0 text-xs ${index < 2 ? "text-emerald-300" : "text-slate-500"}`}>{index + 1}</span>
                    {team?.flagCode ? (
                      <img src={`https://flagcdn.com/w40/${team.flagCode}.png`} alt={row.team} width={22} height={16} className="rounded-sm object-cover" />
                    ) : null}
                    <span>{row.team}</span>
                  </div>
                </td>
                <td className="px-2 py-2 text-right">{row.played}</td>
                <td className="px-2 py-2 text-right">{row.won}</td>
                <td className="px-2 py-2 text-right">{row.drawn}</td>
                <td className="px-2 py-2 text-right">{row.lost}</td>
                <td className="px-2 py-2 text-right">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                <td className="px-2 py-2 text-right font-bold">{row.pts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

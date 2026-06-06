"use client";

import { CalendarPlus, Star } from "lucide-react";
import type { Match } from "@/lib/types";
import { useTimezone } from "@/lib/hooks/use-timezone";
import { formatMatchTime } from "@/lib/services/timezone";
import { getTeam } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";

export function ScheduleTable({ matches }: { matches: Match[] }) {
  const { timezone } = useTimezone();

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <tbody>
            {matches.map((match) => {
              const home = getTeam(match.home);
              const away = getTeam(match.away);
              return (
                <tr key={match.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-slate-400">Group {match.group}</td>
                  <td className="px-4 py-3 font-semibold">{formatMatchTime(match.isoDate, timezone)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center justify-end gap-2">
                      {match.home}
                      {home?.flagCode && <img src={`https://flagcdn.com/w40/${home.flagCode}.png`} alt={match.home} width={22} height={16} className="rounded-sm object-cover" />}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-center text-slate-400">vs</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      {away?.flagCode && <img src={`https://flagcdn.com/w40/${away.flagCode}.png`} alt={match.away} width={22} height={16} className="rounded-sm object-cover" />}
                      {match.away}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{match.venue}</td>
                  <td className="px-4 py-3"><StatusBadge status={match.status} minute={match.minute} /></td>
                  <td className="px-4 py-3"><CalendarPlus className="h-4 w-4" /></td>
                  <td className="px-4 py-3"><Star className="h-4 w-4" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

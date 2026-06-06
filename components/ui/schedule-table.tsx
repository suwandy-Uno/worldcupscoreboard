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
                  <td className="px-4 py-3 text-right">{match.home} <span className="ml-2">{home?.flag}</span></td>
                  <td className="px-2 py-3 text-center text-slate-400">vs</td>
                  <td className="px-4 py-3"><span className="mr-2">{away?.flag}</span>{match.away}</td>
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

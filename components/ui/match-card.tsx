"use client";

import { ArrowRight, Star } from "lucide-react";
import type { Match } from "@/lib/types";
import { useTimezone } from "@/lib/hooks/use-timezone";
import { formatMatchTime } from "@/lib/services/timezone";
import { getTeam } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";

export function MatchCard({ match }: { match: Match }) {
  const { timezone } = useTimezone();
  const home = getTeam(match.home);
  const away = getTeam(match.away);

  return (
    <article className="card p-4">
      <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
        <span>Group {match.group}</span>
        <StatusBadge status={match.status} minute={match.minute} />
        <Star className="h-4 w-4" />
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <TeamSide name={match.home} flag={home?.flag ?? "🏳️"} />
        <div className="text-center text-3xl font-black tabular-nums">
          {match.homeScore ?? "-"} - {match.awayScore ?? "-"}
        </div>
        <TeamSide name={match.away} flag={away?.flag ?? "🏳️"} align="right" />
      </div>
      <div className="mt-4 min-h-10 text-xs text-slate-300">{match.scorers.join(" · ") || formatMatchTime(match.isoDate, timezone)}</div>
      <a href={`/match/${match.slug}`} className="mt-4 flex items-center justify-center gap-2 border-t border-line pt-3 text-sm text-brand">
        View Match Centre <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}

function TeamSide({ name, flag, align = "left" }: { name: string; flag: string; align?: "left" | "right" }) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <div className="text-4xl">{flag}</div>
      <div className="mt-1 text-sm font-semibold">{name}</div>
    </div>
  );
}

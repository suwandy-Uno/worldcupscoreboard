import type { MatchStatus } from "@/lib/types";

export function StatusBadge({ status, minute }: { status: MatchStatus; minute?: number }) {
  const label = status === "live" ? `Live - ${minute ?? 0}'` : status === "halftime" ? "HT" : status;
  const tone = status === "live" ? "status-live" : status === "upcoming" ? "status-upcoming" : "status-finished";
  return <span className={`rounded px-2 py-1 text-xs font-bold uppercase ${tone}`}>{label}</span>;
}

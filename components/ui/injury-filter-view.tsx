"use client";

import { useState } from "react";
import type { Injury } from "@/lib/types";
import { useAutoRefresh } from "@/lib/hooks/use-auto-refresh";
import { InjuryTable } from "@/components/ui/injury-table";

const GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"].map((g) => `Group ${g}`);
const STATUSES = ["Out", "Doubtful", "Suspended", "Fit"];

export function InjuryFilterView({ injuries }: { injuries: Injury[] }) {
  const { data } = useAutoRefresh(injuries, "/api/injuries", 60000);

  const [query,  setQuery]  = useState("");
  const [group,  setGroup]  = useState("All groups");
  const [status, setStatus] = useState("All status");

  const filtered = data.filter((i) => {
    const q = query.toLowerCase();
    const matchesQuery  = !q || i.player.toLowerCase().includes(q) || i.team.toLowerCase().includes(q) || i.issue.toLowerCase().includes(q);
    const matchesGroup  = group  === "All groups" || i.group === group;
    const matchesStatus = status === "All status" || i.status === status;
    return matchesQuery && matchesGroup && matchesStatus;
  });

  return (
    <>
      {/* Filter bar */}
      <div className="card mb-5 grid gap-3 p-3 sm:grid-cols-[1fr_auto_auto]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-md border border-line bg-black/20 px-3 py-2 text-sm outline-none focus:border-brand"
          placeholder="Search player, team, or injury..."
        />
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="rounded-md border border-line bg-[#0d1117] px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option>All groups</option>
          {GROUPS.map((g) => <option key={g}>{g}</option>)}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border border-line bg-[#0d1117] px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option>All status</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Result count */}
      <p className="mb-3 text-right text-xs text-slate-400">
        {filtered.length} player{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <div className="card p-8 text-center text-slate-400">No players match your filters.</div>
      ) : (
        <InjuryTable injuries={filtered} />
      )}
    </>
  );
}

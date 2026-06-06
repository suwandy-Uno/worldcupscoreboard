"use client";

import { Globe2 } from "lucide-react";
import { commonTimezones } from "@/lib/services/timezone";
import { useTimezone } from "@/lib/hooks/use-timezone";

export function TimezoneSelector({ compact = false }: { compact?: boolean }) {
  const { timezone, setTimezone } = useTimezone();

  return (
    <label className={`flex items-center gap-2 rounded-md border border-line bg-white/5 px-3 py-2 text-sm ${compact ? "max-w-[230px]" : "w-full"}`}>
      <Globe2 className="h-4 w-4 text-slate-300" />
      <select value={timezone} onChange={(event) => setTimezone(event.target.value)} className="min-w-0 flex-1 bg-transparent text-white outline-none">
        {[timezone, ...commonTimezones.filter((item) => item !== timezone)].map((zone) => (
          <option key={zone} value={zone} className="bg-panel text-white">
            {zone}
          </option>
        ))}
      </select>
    </label>
  );
}

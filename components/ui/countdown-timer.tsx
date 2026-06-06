"use client";

import { useEffect, useState } from "react";

function parts(targetIso: string) {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hrs: Math.floor((diff / 3600000) % 24),
    mins: Math.floor((diff / 60000) % 60),
    secs: Math.floor((diff / 1000) % 60)
  };
}

export function CountdownTimer({ targetIso }: { targetIso: string }) {
  const [value, setValue] = useState(() => parts(targetIso));

  useEffect(() => {
    const id = window.setInterval(() => setValue(parts(targetIso)), 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      {Object.entries(value).map(([key, number]) => (
        <div key={key}>
          <div className="text-2xl font-bold tabular-nums">{number.toString().padStart(2, "0")}</div>
          <div className="text-[10px] uppercase text-slate-400">{key}</div>
        </div>
      ))}
    </div>
  );
}

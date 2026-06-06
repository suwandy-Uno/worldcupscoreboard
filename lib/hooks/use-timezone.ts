"use client";

import { useEffect, useState } from "react";

const key = "world-cup-scoreboard-timezone";

export function useTimezone() {
  const fallback = "Europe/London";
  const [timezone, setTimezone] = useState(fallback);

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone || fallback;
    const saved = window.localStorage.getItem(key);
    window.requestAnimationFrame(() => setTimezone(saved || detected));
  }, []);

  function updateTimezone(next: string) {
    window.localStorage.setItem(key, next);
    setTimezone(next);
  }

  return { timezone, setTimezone: updateTimezone };
}

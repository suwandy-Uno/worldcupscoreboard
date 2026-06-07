"use client";

import { createContext, useContext, useEffect, useState } from "react";

const KEY = "world-cup-scoreboard-timezone";
const FALLBACK = "Europe/London";

type TzCtx = { timezone: string; setTimezone: (tz: string) => void };

const TimezoneContext = createContext<TzCtx>({
  timezone: FALLBACK,
  setTimezone: () => {},
});

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
  const [timezone, _set] = useState(FALLBACK);

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone || FALLBACK;
    const saved = localStorage.getItem(KEY);
    _set(saved || detected);
  }, []);

  function setTimezone(next: string) {
    localStorage.setItem(KEY, next);
    _set(next);
  }

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  return useContext(TimezoneContext);
}

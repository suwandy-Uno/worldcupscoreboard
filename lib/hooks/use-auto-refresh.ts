"use client";

import { useEffect, useState } from "react";

export function useAutoRefresh<T>(
  initialData: T,
  endpoint: string,
  intervalMs = 30000,
  fetchOnMount = false,
) {
  const [data, setData] = useState<T>(initialData);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    let active = true;

    async function refresh() {
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        if (!response.ok) return;
        const next = (await response.json()) as T;
        const isEmpty = Array.isArray(next) && (next as unknown[]).length === 0;
        if (active && !isEmpty) {
          setData(next);
          setUpdatedAt(new Date());
        }
      } catch {
        // Network error — keep showing current data
      }
    }

    // fetchOnMount=true: fetch immediately (e.g. news, where real data > placeholder).
    // fetchOnMount=false (default): only poll on interval — prevents standings/matches
    // from flashing empty if the API returns [] before static data is ready.
    if (fetchOnMount) refresh();
    const id = window.setInterval(refresh, intervalMs);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, [endpoint, intervalMs, fetchOnMount]);

  return { data, updatedAt };
}

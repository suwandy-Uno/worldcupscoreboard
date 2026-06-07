"use client";

import { useEffect, useState } from "react";

export function useAutoRefresh<T>(initialData: T, endpoint: string, intervalMs = 30000) {
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

    // DO NOT fetch on mount — show static data immediately.
    // Only start polling after the first interval so the page never flashes empty.
    const id = window.setInterval(refresh, intervalMs);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, [endpoint, intervalMs]);

  return { data, updatedAt };
}

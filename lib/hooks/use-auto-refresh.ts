"use client";

import { useEffect, useState } from "react";

export function useAutoRefresh<T>(initialData: T, endpoint: string, intervalMs = 30000) {
  const [data, setData] = useState(initialData);
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let active = true;

    async function refresh() {
      setRefreshing(true);
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        if (!response.ok) return;
        const next = (await response.json()) as T;
        if (active) {
          setData(next);
          setUpdatedAt(new Date());
        }
      } finally {
        if (active) setRefreshing(false);
      }
    }

    refresh();
    const id = window.setInterval(refresh, intervalMs);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, [endpoint, intervalMs]);

  return { data, updatedAt, refreshing };
}

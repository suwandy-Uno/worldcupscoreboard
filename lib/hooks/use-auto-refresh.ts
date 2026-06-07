"use client";

import { useEffect, useRef, useState } from "react";

export function useAutoRefresh<T>(initialData: T, endpoint: string, intervalMs = 30000) {
  const [data, setData] = useState<T>(initialData);
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  // Keep a ref to fallback so we can restore if API gives us nothing useful
  const fallback = useRef<T>(initialData);

  useEffect(() => {
    let active = true;

    async function refresh() {
      setRefreshing(true);
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        if (!response.ok) {
          // API not available — keep showing fallback
          return;
        }
        const next = (await response.json()) as T;
        // Ignore empty arrays — keep showing fallback static data
        const isEmpty = Array.isArray(next) && (next as unknown[]).length === 0;
        if (active && !isEmpty) {
          setData(next);
          setUpdatedAt(new Date());
        }
      } catch {
        // Network error, CORS, JSON parse error — silently keep fallback
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

  // If data somehow became empty, restore fallback
  const safeData = Array.isArray(data) && (data as unknown[]).length === 0
    ? fallback.current
    : data;

  return { data: safeData, updatedAt, refreshing };
}

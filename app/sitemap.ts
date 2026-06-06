export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

const routes = [
  "",
  "/schedule",
  "/live-scores",
  "/standings",
  "/bracket",
  "/predictions",
  "/injuries",
  "/news",
  "/teams",
  "/venues",
  "/world-cup-2026-schedule",
  "/world-cup-2026-live-score",
  "/world-cup-2026-standings",
  "/world-cup-2026-predictions",
  "/world-cup-2026-injuries",
  "/world-cup-2026-bracket",
  "/world-cup-2026-schedule-uk-time",
  "/world-cup-2026-schedule-us-time",
  "/world-cup-2026-schedule-australia-time",
  "/world-cup-2026-schedule-india-time"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: siteUrl(route), lastModified: new Date(), changeFrequency: "hourly", priority: route ? 0.8 : 1 }));
}

export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

const routes: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
  ["", 1.0, "always"],
  ["/live-scores", 1.0, "always"],
  ["/schedule", 0.95, "hourly"],
  ["/standings", 0.95, "hourly"],
  ["/news", 0.9, "hourly"],
  ["/injuries", 0.85, "hourly"],
  ["/playoff", 0.85, "daily"],
  ["/predictions", 0.8, "daily"],
  ["/teams", 0.8, "weekly"],
  ["/venues", 0.75, "weekly"],
  // SEO landing pages — high-traffic long-tail keywords
  ["/world-cup-2026-schedule", 0.9, "daily"],
  ["/world-cup-2026-live-score", 0.9, "always"],
  ["/world-cup-2026-standings", 0.85, "hourly"],
  ["/world-cup-2026-predictions", 0.8, "daily"],
  ["/world-cup-2026-injuries", 0.8, "daily"],
  ["/world-cup-2026-playoff", 0.8, "daily"],
  ["/world-cup-2026-schedule-uk-time", 0.85, "daily"],
  ["/world-cup-2026-schedule-us-time", 0.85, "daily"],
  ["/world-cup-2026-schedule-australia-time", 0.85, "daily"],
  ["/world-cup-2026-schedule-india-time", 0.85, "daily"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(([route, priority, changeFrequency]) => ({
    url: siteUrl(route),
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}

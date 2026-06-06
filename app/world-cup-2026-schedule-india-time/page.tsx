import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Schedule India Time", description: "World Cup 2026 schedule landing page for India time searches." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Schedule India Time" description="A focused landing page for Indian viewers looking for local kickoff times." links={["/schedule", "/live-scores", "/news", "/world-cup-2026-schedule"]} />;
}

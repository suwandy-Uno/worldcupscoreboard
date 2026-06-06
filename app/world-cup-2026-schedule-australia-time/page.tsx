import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Schedule Australia Time", description: "World Cup 2026 schedule landing page for Australia time searches." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Schedule Australia Time" description="A focused landing page for Australian viewers who need converted kickoff times." links={["/schedule", "/teams", "/live-scores", "/world-cup-2026-schedule"]} />;
}

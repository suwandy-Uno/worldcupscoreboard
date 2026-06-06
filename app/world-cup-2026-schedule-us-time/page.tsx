import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Schedule US Time", description: "World Cup 2026 schedule landing page for US time zones." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Schedule US Time" description="A focused landing page for US viewers comparing Eastern, Central, Mountain, and Pacific match windows." links={["/schedule", "/venues", "/live-scores", "/world-cup-2026-schedule"]} />;
}

import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Injuries", description: "Sample World Cup injury tracker with status, severity, and expected return fields." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Injuries" description="Monitor sample injury and suspension updates with source placeholders for future licensed data." links={["/injuries", "/predictions", "/teams", "/news"]} />;
}

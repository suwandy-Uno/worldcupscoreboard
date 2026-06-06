import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Standings", description: "World Cup 2026 group standings with live-table indicators." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Standings" description="Track group tables, points, goal difference, and qualification placeholders." links={["/standings", "/teams", "/bracket", "/schedule"]} />;
}

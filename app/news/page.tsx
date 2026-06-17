import type { Metadata } from "next";
import { AutoNews } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { getNews } from "@/lib/services/news-data";

export const metadata: Metadata = {
  title: "World Cup 2026 News — Latest Football Updates",
  description: "Breaking World Cup 2026 news, match reports, expert analysis and injury alerts. Updated throughout the tournament.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "World Cup 2026 Latest News & Match Reports",
    description: "Live football news, expert analysis and breaking updates from the 2026 FIFA World Cup.",
    url: "https://worldcupscoreboard.com/news",
  },
};

export default async function NewsPage() {
  const news = await getNews();
  return (
    <>
      <PageHeader title="World Cup 2026 News" description="Latest match reports, expert analysis, injury alerts and breaking news from the 2026 FIFA World Cup." />
      <SearchFilterBar placeholder="Search news..." />
      <AutoNews news={news} />
    </>
  );
}

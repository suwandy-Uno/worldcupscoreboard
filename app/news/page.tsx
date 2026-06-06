import type { Metadata } from "next";
import { AutoNews } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { getNews } from "@/lib/services/news-data";

export const metadata: Metadata = { title: "World Cup 2026 News", description: "Mock World Cup news layout prepared for original or licensed content." };

export default async function NewsPage() {
  const news = await getNews();
  return (
    <>
      <PageHeader title="World Cup 2026 News" description="Mock news only. Replace with licensed API content or original manually written editorial coverage." />
      <SearchFilterBar placeholder="Search news..." />
      <AutoNews news={news} />
    </>
  );
}

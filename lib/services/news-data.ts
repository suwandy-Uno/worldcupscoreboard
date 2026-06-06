import { news } from "@/lib/data/news";

export async function getNews() {
  return news.map((item) => ({ ...item, publishedAt: new Date().toISOString() }));
}

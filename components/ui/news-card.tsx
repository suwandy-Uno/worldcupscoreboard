import type { NewsItem } from "@/lib/types";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="card overflow-hidden">
      <div className="h-28" style={{ background: item.image }} />
      <div className="p-4">
        <span className="rounded bg-rose-600 px-2 py-1 text-[10px] font-bold uppercase">{item.category}</span>
        <h3 className="mt-3 font-semibold">{item.title}</h3>
        <p className="mt-2 text-sm text-slate-400">{item.summary}</p>
      </div>
    </article>
  );
}

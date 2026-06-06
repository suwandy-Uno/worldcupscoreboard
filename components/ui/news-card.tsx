import type { NewsItem } from "@/lib/types";

export function NewsCard({ item }: { item: NewsItem }) {
  const isUrl = item.image.startsWith("http");
  return (
    <article className="card overflow-hidden">
      <div className="h-28 overflow-hidden">
        {isUrl ? (
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="h-full w-full" style={{ background: item.image }} />
        )}
      </div>
      <div className="p-4">
        <span className="rounded bg-rose-600 px-2 py-1 text-[10px] font-bold uppercase">{item.category}</span>
        <h3 className="mt-3 font-semibold leading-snug">{item.title}</h3>
        <p className="mt-2 text-sm text-slate-400 line-clamp-2">{item.summary}</p>
      </div>
    </article>
  );
}

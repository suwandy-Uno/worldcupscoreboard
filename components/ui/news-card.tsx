import type { NewsItem } from "@/lib/types";

const CATEGORY_STYLE: Record<string, string> = {
  "Breaking News": "bg-rose-600 text-white",
  "Injury Alert": "bg-amber-500 text-black",
  "Expert View":  "bg-purple-600 text-white",
  "Match Report": "bg-emerald-600 text-white",
  "Match Preview":"bg-sky-600 text-white",
  "Tactics":      "bg-indigo-600 text-white",
  "Interview":    "bg-teal-600 text-white",
  "Video":        "bg-pink-600 text-white",
  "Feature":      "bg-slate-500 text-white",
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function NewsCard({ item }: { item: NewsItem }) {
  const isUrl = item.image.startsWith("http");
  const badgeClass = CATEGORY_STYLE[item.category] ?? "bg-brand text-white";
  const cardContent = (
    <article className="card overflow-hidden flex flex-col h-full transition-transform hover:-translate-y-0.5 hover:shadow-glow">
      <div className="relative h-36 overflow-hidden">
        {isUrl ? (
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="h-full w-full" style={{ background: item.image }} />
        )}
        {/* gradient fade at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Breaking flash */}
        {item.isBreaking && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded bg-rose-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white shadow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Breaking
          </div>
        )}
        {/* Category badge at bottom of image */}
        <span className={`absolute bottom-2 left-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${badgeClass}`}>
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold leading-snug line-clamp-2 flex-1">{item.title}</h3>
        <p className="mt-2 text-sm text-slate-400 line-clamp-2">{item.summary}</p>

        {/* Footer row */}
        <div className="mt-3 flex items-center justify-between border-t border-line pt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            {item.source && <span className="font-semibold text-slate-400">{item.source}</span>}
            {item.author && <span>· {item.author}</span>}
          </span>
          <time dateTime={item.publishedAt}>{relativeTime(item.publishedAt)}</time>
        </div>
      </div>
    </article>
  );

  return item.sourceUrl ? (
    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="block">
      {cardContent}
    </a>
  ) : cardContent;
}

import type { NewsItem } from "@/lib/types";

const CATEGORY_STYLE: Record<string, string> = {
  "Breaking News": "bg-rose-600 text-white",
  "Injury Alert":  "bg-amber-500 text-black",
  "Expert View":   "bg-purple-600 text-white",
  "Match Report":  "bg-emerald-600 text-white",
  "Match Preview": "bg-sky-600 text-white",
  "Tactics":       "bg-indigo-600 text-white",
  "Interview":     "bg-teal-600 text-white",
  "Video":         "bg-pink-600 text-white",
  "Feature":       "bg-slate-500 text-white",
  "Transfer":      "bg-orange-500 text-white",
};

// Subtle branded gradient per source for the logo background
const SOURCE_BG: Record<string, string> = {
  "BBC Sport":       "from-[#bb1919] to-[#6b0c0c]",
  "The Guardian":    "from-[#052962] to-[#0a3a7a]",
  "Sky Sports":      "from-[#0070b8] to-[#004a80]",
  "ESPN FC":         "from-[#cc0000] to-[#8b0000]",
  "The Athletic":    "from-[#1a1a2e] to-[#16213e]",
  "Reuters":         "from-[#ff8000] to-[#b35900]",
  "AP News":         "from-[#222222] to-[#111111]",
  "CBS Sports":      "from-[#004080] to-[#002255]",
  "NBC Sports":      "from-[#1a3a6e] to-[#0d1f3c]",
  "Sporting News":   "from-[#1c3a5e] to-[#0e1e30]",
  "Goal.com":        "from-[#00a651] to-[#006633]",
  "The Independent": "from-[#e8003d] to-[#900025]",
  "The Telegraph":   "from-[#003087] to-[#001a4d]",
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
  const badgeClass = CATEGORY_STYLE[item.category] ?? "bg-brand text-white";
  const bgGradient = (item.source && SOURCE_BG[item.source]) || "from-[#1a1f2e] to-[#0d1117]";

  const cardContent = (
    <article className="card overflow-hidden flex flex-col h-full transition-transform hover:-translate-y-0.5 hover:shadow-glow">

      {/* Image / Logo area */}
      <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${bgGradient} overflow-hidden`}>
        {item.isLogo ? (
          // Logo: centered, contained, white-filtered so it pops on dark bg
          <img
            src={item.image}
            alt={item.source}
            className="h-16 w-auto max-w-[70%] object-contain drop-shadow-lg"
            style={{ filter: "brightness(0) invert(1)" }}
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        )}

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Breaking flash */}
        {item.isBreaking && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded bg-rose-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white shadow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Breaking
          </div>
        )}

        {/* Category badge */}
        <span className={`absolute bottom-2 left-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${badgeClass}`}>
          {item.category}
        </span>
      </div>

      {/* Text body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold leading-snug line-clamp-2 flex-1">{item.title}</h3>
        <p className="mt-2 text-sm text-slate-400 line-clamp-2">{item.summary}</p>

        <div className="mt-3 flex items-center justify-between border-t border-line pt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            {item.source && <span className="font-semibold text-slate-400">{item.source}</span>}
            {item.author && <span>· {item.author}</span>}
          </span>
          <span className="flex items-center gap-2">
            <time dateTime={item.publishedAt}>{relativeTime(item.publishedAt)}</time>
            {item.sourceUrl && (
              <span className="rounded bg-white/[.08] px-1.5 py-0.5 text-[10px] font-semibold text-slate-300">
                Read →
              </span>
            )}
          </span>
        </div>
      </div>
    </article>
  );

  return item.sourceUrl ? (
    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
      {cardContent}
    </a>
  ) : cardContent;
}

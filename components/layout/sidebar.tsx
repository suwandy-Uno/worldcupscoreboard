"use client";

import { Activity, CalendarDays, GitBranch, Home, MapPin, Newspaper, Send, Shield, Sparkles, Star, Table2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  ["/", "Overview", Home],
  ["/live-scores", "Live Scores", Activity],
  ["/schedule", "Schedule", CalendarDays],
  ["/standings", "Standings", Table2],
  ["/teams", "Teams", Users],
  ["/venues", "Venues", MapPin],
  ["/bracket", "Bracket", GitBranch],
  ["/predictions", "Predictions", Sparkles],
  ["/injuries", "Injuries", Shield],
  ["/news", "News", Newspaper],
  ["/", "Favourites", Star]
] as const;

// Next big match: Argentina vs France, Jun 15 2026 20:00 UTC
const NEXT_MATCH_ISO = "2026-06-15T20:00:00Z";

function useCountdown(targetIso: string) {
  function calc() {
    const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hrs: Math.floor((diff / 3600000) % 24),
      mins: Math.floor((diff / 60000) % 60),
      secs: Math.floor((diff / 1000) % 60)
    };
  }
  const [v, setV] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setV(calc()), 1000);
    return () => clearInterval(id);
  }, [targetIso]);
  return v;
}

function ShareWidget() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleShare(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { setStatus("error"); return; }
    const subject = encodeURIComponent("Check out World Cup 2026 Live Scores!");
    const body = encodeURIComponent(
      `Hey! I've been following the World Cup 2026 on this site — live scores, standings and match times in your timezone.\n\nhttps://worldcupscoreboard.com\n\nCheck it out!`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <form onSubmit={handleShare} className="mt-4 rounded-xl border border-line bg-white/[.03] p-4">
      <p className="text-xs font-semibold text-white">⚽ Share with a friend!</p>
      <p className="mt-0.5 text-xs text-slate-400">Know a football fan? Send them the link.</p>
      <input
        ref={inputRef}
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
        placeholder="friend@email.com"
        className="mt-3 w-full rounded-lg border border-line bg-white/[.06] px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-brand"
      />
      {status === "error" && <p className="mt-1 text-[10px] text-rose-400">Please enter a valid email.</p>}
      {status === "sent"  && <p className="mt-1 text-[10px] text-emerald-400">Opening your mail app…</p>}
      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand/80"
      >
        <Send className="h-3.5 w-3.5" /> Share Now
      </button>
    </form>
  );
}

export function Sidebar() {
  const cd = useCountdown(NEXT_MATCH_ISO);

  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-line bg-black/72 backdrop-blur-xl lg:flex">
      {/* Logo — always visible, never scrolls */}
      <div className="shrink-0 border-b border-line px-4 py-3">
        <Link href="/" className="block">
          <Image
            src="/logo.png"
            alt="WC26 Live Hub"
            width={220}
            height={60}
            priority
            className="h-auto w-full max-w-[220px]"
          />
        </Link>
      </div>

      {/* Scrollable content below logo */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">

      <nav className="space-y-0.5">
        {links.map(([href, label, Icon], index) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
              index === 0 ? "bg-brand text-white" : "text-slate-200 hover:bg-white/[.07]"
            }`}
          >
            <Icon className="h-4.5 w-4.5 h-5 w-5" />
            {label}
            {label === "Live Scores" && (
              <span className="ml-auto rounded bg-rose-600 px-2 py-0.5 text-[10px] font-bold tracking-wide">LIVE</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Next Big Match */}
      <div className="card mt-5 p-4">
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-wider text-slate-400">Next Big Match</p>
        <div className="flex items-center justify-center gap-3">
          <img src="https://flagcdn.com/w80/ar.png" alt="Argentina" width={40} height={30} className="rounded shadow" />
          <span className="text-sm font-semibold text-slate-400">vs</span>
          <img src="https://flagcdn.com/w80/fr.png" alt="France" width={40} height={30} className="rounded shadow" />
        </div>
        <div className="mt-1 text-center text-sm font-semibold">Argentina <span className="text-xs text-slate-500">vs</span> France</div>
        <div className="mt-1 text-center text-xs text-slate-400">Jun 15, 2026 • 20:00</div>
        <div className="mt-1 text-center text-xs text-slate-500">MetLife Stadium, New Jersey</div>

        {/* Countdown */}
        <div className="mt-3 grid grid-cols-4 gap-1 text-center">
          {([["days", cd.days], ["hrs", cd.hrs], ["mins", cd.mins], ["secs", cd.secs]] as [string, number][]).map(([label, val]) => (
            <div key={label} className="rounded bg-white/[.06] py-2">
              <div className="text-lg font-black tabular-nums">{val.toString().padStart(2, "0")}</div>
              <div className="text-[9px] uppercase tracking-widest text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Share with a friend */}
      <ShareWidget />

      </div> {/* end scrollable area */}
    </aside>
  );
}

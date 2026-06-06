"use client";

import { Search, Settings } from "lucide-react";
import { TimezoneSelector } from "@/components/ui/timezone-selector";

const nav = ["Home", "Matches", "Schedule", "Standings", "Teams", "News", "Predictions", "Injuries"];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-black/58 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="hidden flex-1 items-center gap-7 overflow-x-auto text-sm text-slate-200 lg:flex">
          {nav.map((item, index) => (
            <a key={item} href={index === 0 ? "/" : `/${item.toLowerCase().replace("matches", "live-scores")}`} className={index === 0 ? "border-b-2 border-brand py-5 text-white" : "py-5 hover:text-white"}>
              {item}
            </a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Search className="h-5 w-5 text-slate-300" />
          <Settings className="h-5 w-5 text-slate-300" />
          <TimezoneSelector compact />
        </div>
      </div>
    </header>
  );
}

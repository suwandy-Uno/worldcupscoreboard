"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TimezoneSelector } from "@/components/ui/timezone-selector";

const nav = [
  { label: "Home",        href: "/" },
  { label: "Matches",     href: "/live-scores" },
  { label: "Schedule",    href: "/schedule" },
  { label: "Standings",   href: "/standings" },
  { label: "Teams",       href: "/teams" },
  { label: "News",        href: "/news" },
  { label: "Predictions", href: "/predictions" },
  { label: "Injuries",    href: "/injuries" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-black/58 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo — mobile only (sidebar hidden on mobile) */}
        <Link href="/" className="shrink-0 lg:hidden">
          <Image src="/logo.png" alt="WC26 Live Hub" width={120} height={33} priority className="h-auto w-[120px]" />
        </Link>
        <div className="hidden flex-1 items-center gap-7 overflow-x-auto text-sm text-slate-200 lg:flex">
          {nav.map(({ label, href }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <a key={label} href={href} className={active ? "border-b-2 border-brand py-5 text-white" : "py-5 hover:text-white"}>
                {label}
              </a>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <TimezoneSelector compact />
        </div>
      </div>
    </header>
  );
}

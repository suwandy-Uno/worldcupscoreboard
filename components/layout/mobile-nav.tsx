import { Activity, CalendarDays, Home, Table2, Users } from "lucide-react";

const links = [
  ["/", "Home", Home],
  ["/live-scores", "Live", Activity],
  ["/schedule", "Schedule", CalendarDays],
  ["/standings", "Table", Table2],
  ["/teams", "Teams", Users]
] as const;

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-line bg-black/88 px-2 py-2 backdrop-blur-xl lg:hidden">
      {links.map(([href, label, Icon]) => (
        <a key={label} href={href} className="flex flex-col items-center gap-1 rounded-md py-2 text-[11px] text-slate-300">
          <Icon className="h-5 w-5" />
          {label}
        </a>
      ))}
    </nav>
  );
}

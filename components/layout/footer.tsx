import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line px-4 pt-6 pb-24 text-center text-xs text-slate-400 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
      <p>World Cup Scoreboard is an independent football information website and is not affiliated with FIFA or any official tournament organizer.</p>
      <nav className="mt-3 flex flex-wrap justify-center gap-4">
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
      </nav>
      <p className="mt-3">© {new Date().getFullYear()} World Cup Scoreboard</p>
    </footer>
  );
}

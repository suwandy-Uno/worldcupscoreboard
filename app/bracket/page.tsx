import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "World Cup 2026 Bracket", description: "Round of 32 through final bracket placeholder for the expanded tournament format." };

const rounds = ["Round of 32", "Round of 16", "Quarterfinal", "Semifinal", "Third Place", "Final"];

export default function BracketPage() {
  return (
    <>
      <PageHeader title="World Cup 2026 Bracket" description="Knockout bracket layout prepared for live qualification paths once group-stage data is connected." />
      <div className="grid gap-4 overflow-x-auto lg:grid-cols-6">
        {rounds.map((round) => (
          <section key={round} className="min-w-[210px] space-y-3">
            <h2 className="text-sm font-bold uppercase text-slate-400">{round}</h2>
            {Array.from({ length: round === "Final" ? 1 : 3 }).map((_, index) => (
              <div key={index} className="card p-3 text-sm">
                <div className="border-b border-line pb-2">TBD qualifier</div>
                <div className="pt-2">TBD qualifier</div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}

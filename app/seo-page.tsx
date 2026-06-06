import { AdBanner } from "@/components/ads/ad-banner";
import { PageHeader } from "@/components/ui/page-header";

export function SeoLandingPage({ title, description, links }: { title: string; description: string; links: string[] }) {
  return (
    <article className="space-y-5">
      <PageHeader title={title} description={description} />
      <section className="card p-5 text-slate-300">
        <h2 className="text-xl font-bold text-white">Live, local, and sample-data ready</h2>
        <p className="mt-3">This page is prepared for search traffic with internal links, semantic content, and clean metadata. Match times automatically use the dashboard timezone tools, and live sections can be connected to a licensed sports data provider through the service layer.</p>
      </section>
      <AdBanner />
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => <a key={link} href={link} className="card p-4 text-brand">{link.replaceAll("-", " ").replace("/", "") || "home"}</a>)}
      </section>
    </article>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for World Cup Scoreboard — how we collect, use and protect your data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" description="Last updated: 17 June 2026" />
      <div className="prose prose-invert max-w-3xl space-y-8 text-slate-300">

        <section>
          <h2 className="text-lg font-bold text-white">1. Who We Are</h2>
          <p className="mt-2 leading-relaxed">
            World Cup Scoreboard (<strong>worldcupscoreboard.com</strong>) is an independent sports information website providing live scores, schedules, standings, match statistics, predictions and news for the 2026 FIFA World Cup. We are not affiliated with FIFA or any official tournament organiser.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
          <p className="mt-2 leading-relaxed">We collect the following types of information:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li><strong>Usage data</strong> — pages visited, time on site, referring URLs, browser type and approximate geographic region. Collected automatically via Google Analytics.</li>
            <li><strong>Timezone preference</strong> — stored in your browser&apos;s local storage so match times display in your chosen timezone on return visits.</li>
            <li><strong>Contact form submissions</strong> — your name, email address and message, used solely to respond to your enquiry.</li>
          </ul>
          <p className="mt-2 leading-relaxed">We do not collect passwords, payment information or government identifiers.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">3. Cookies and Tracking</h2>
          <p className="mt-2 leading-relaxed">We use the following cookies and tracking technologies:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li><strong>Google Analytics (GA4)</strong> — aggregate site analytics. Data is anonymised. You may opt out via the <a href="https://tools.google.com/dlpage/gaoptout" className="text-brand underline" target="_blank" rel="noopener noreferrer">Google Analytics opt-out add-on</a>.</li>
            <li><strong>Google AdSense</strong> — display advertising. Google may use cookies to serve personalised ads based on your browsing history. You can manage ad preferences at <a href="https://adssettings.google.com" className="text-brand underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
            <li><strong>Functional cookies</strong> — timezone preference and UI settings stored locally in your browser.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">4. How We Use Your Information</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>To operate and improve the website</li>
            <li>To display match times in your local timezone</li>
            <li>To respond to contact form enquiries</li>
            <li>To understand aggregate traffic patterns via analytics</li>
            <li>To serve relevant advertisements via Google AdSense</li>
          </ul>
          <p className="mt-2 leading-relaxed">We do not sell, rent or share your personal data with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">5. Third-Party Services</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li><strong>Google Analytics</strong> — <a href="https://policies.google.com/privacy" className="text-brand underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            <li><strong>Google AdSense</strong> — <a href="https://policies.google.com/privacy" className="text-brand underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            <li><strong>Cloudflare Pages</strong> — hosting and content delivery</li>
            <li><strong>flagcdn.com</strong> — flag images served from an external CDN</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">6. Data Retention</h2>
          <p className="mt-2 leading-relaxed">
            Analytics data is retained for 14 months in Google Analytics. Contact form messages are retained for up to 12 months. We do not store personal data beyond what is necessary to respond to your enquiry.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">7. Your Rights</h2>
          <p className="mt-2 leading-relaxed">Depending on your location you may have the right to access, correct or delete personal data we hold about you. To make a request, please use our <a href="/contact" className="text-brand underline">contact page</a>. EU/UK residents may also lodge a complaint with their local data protection authority.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">8. Children&apos;s Privacy</h2>
          <p className="mt-2 leading-relaxed">
            This site is not directed at children under 13. We do not knowingly collect personal data from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">9. Changes to This Policy</h2>
          <p className="mt-2 leading-relaxed">
            We may update this policy from time to time. The &quot;last updated&quot; date at the top of this page reflects the most recent revision.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">10. Contact</h2>
          <p className="mt-2 leading-relaxed">
            For privacy-related enquiries please use our <a href="/contact" className="text-brand underline">contact page</a>.
          </p>
        </section>

      </div>
    </>
  );
}

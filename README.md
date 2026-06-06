# World Cup Scoreboard

Independent, unofficial World Cup 2026 dashboard for WORLDCUPSCOREBOARD.COM.

The app includes live scores, schedule, standings, predictions, injuries, news, teams, venues, match pages, team pages, SEO landing pages, sitemap, robots, ad placeholders, timezone handling, and API-ready mock services.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill provider keys when you connect real data.

```bash
SPORTS_API_PROVIDER=mock
SPORTS_API_KEY=
NEWS_API_KEY=
NEXT_PUBLIC_SITE_URL=https://worldcupscoreboard.com
NEXT_PUBLIC_SITE_NAME=World Cup Scoreboard
```

## Auto Updates

The dashboard is built so live data refreshes without a page reload:

- `/api/matches` drives homepage and live-score polling.
- Live cards refresh every 10-15 seconds.
- Injury and news timestamps refresh on longer intervals.
- Match clocks and countdowns tick in the browser.
- Timezone is detected with `Intl.DateTimeFormat().resolvedOptions().timeZone` and saved in `localStorage`.

## Replace Mock Data

Mock data lives in `lib/data`. API-facing fetch functions live in `lib/services`.

To integrate a provider, keep the page and component contracts stable and replace the internals of:

- `lib/services/sports-data.ts`
- `lib/services/news-data.ts`
- `lib/services/prediction-engine.ts`

## Deploy To Vercel

Push the project to GitHub, import it into Vercel, add environment variables, and deploy. The project uses the Next.js App Router and is ready for Vercel defaults.

## Legal And Data Notes

World Cup Scoreboard is independent and is not affiliated with FIFA or any official tournament organizer. Use licensed sports data and licensed/original news content before public launch. Predictions are for entertainment and analysis only and are not betting advice.

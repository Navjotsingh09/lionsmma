# Lions MMA & Boxing — website

Next.js 16 (App Router, TypeScript, Tailwind 4) build of the website design in Figma (page “Website”). Content comes from lionsmma.net.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Deploy (Vercel)

Import this repo in Vercel (**Add New → Project**). It detects Next.js — no settings needed. Every push to `main` redeploys.

Add these environment variables in Vercel when you’re ready (see `.env.example`):

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The live domain, for SEO and the sitemap |
| `RESEND_API_KEY`, `ENQUIRIES_FROM`, `ENQUIRIES_TO` | Sends booking, contact and volunteer forms to the club by email. `ENQUIRIES_FROM` must use a domain verified in Resend. Until set, forms tell people to email info@lionsmma.net |
| `DONATE_URL` | Where the Donate button goes (e.g. a Stripe Payment Link). Until set, it opens an email |

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/clubs` | Find your club — search, filters, map |
| `/clubs/[slug]` | One page per club (9), with timetable and booking |
| `/classes` | Disciplines, Sikh heritage, values |
| `/book` | Book a free class (`?club=willenhall` pre-selects a club) |
| `/about` | Story, goals, stats |
| `/punjab-projects` | #ABetterPunjab |
| `/volunteer`, `/donate`, `/contact`, `/faqs` | |
| `/privacy`, `/terms` | Drafts — need the club’s approval |

## Where things live

```
src/data/clubs.ts   clubs, addresses, phone numbers, timetables  ← edit timetables here
src/data/site.ts    page copy, FAQs, coaches, Punjab projects
src/components/     header, footer, buttons, accordion, forms, map, timetable
public/photos/      photos (AI stand-ins from the Figma file — replace with real ones)
```

## To confirm with the club before launch

- **Photos** are AI stand-ins. Some show made-up club names on T-shirts and signs — replace them all with real photos.
- **“Free first class”** — used across the site (from the design). Confirm the club offers this.
- **Gradings** (home “How it works” and the membership table).
- **First-class tips**: sportswear, arrive 10 minutes early, no kit needed.
- **FAQ answers** in `src/data/site.ts`.
- **Coach details** — names and classes come from the club list; Charandeep Singh is listed on the old site as the Bradford contact.
- **Donations** — payment provider and whether Gift Aid applies.
- **Privacy and Terms** pages are drafts.
- Prices are deliberately not shown — the FAQ says each club explains prices at the first class.

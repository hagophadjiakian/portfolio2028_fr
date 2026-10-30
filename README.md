# Hagop Hadjiakian — Portfolio

Live site: **https://hagophadjiakian2028.vercel.app**

Personal portfolio of Hagop Hadjiakian: software and QA engineer, electrical engineer, and spinal cord injury survivor (since 2013) building rehabilitation technology.

## Tech

- **React 18** and **React Router 6**
- **Vite 8** for the dev server and build. Every page is also rendered to static HTML at build time (`scripts/prerender.mjs`), so search engines, link previews and visitors without JavaScript get the real content. React then takes over in the browser (hydration).
- **Tailwind CSS 3**, **Framer Motion** (menus, image viewer, small effects), **tsParticles** (desktop background only)
- Scroll fade-ins are pure CSS (scroll-driven animations), so content never waits for JavaScript to appear
- Fonts are self-hosted with Fontsource (Inter, Lora, Fira Code): no requests to Google Fonts
- Hosted on **Vercel** (`vercel.json`)
- Tests: **Playwright** and **axe-core**, run by GitHub Actions on every push and pull request

## Run it locally

Use Node 22 (see `.nvmrc`).

```bash
npm ci               # install
npm run dev          # dev server on http://localhost:3000
npm run build        # production build in build/
npm run preview      # serve build/ like Vercel does, on http://localhost:4173
npm test             # end-to-end tests (run `npm run build` first)
```

The first time on a new machine, install the test browser with `npx playwright install chromium`.

## Where things are

| What | Where |
| --- | --- |
| Name, email, location, social links, CV link, page titles and descriptions, background music per page | `src/data/site.js` |
| Page content | `src/pages/` (one file per page) |
| Shared components (navbar, footer, image viewer, music player…) | `src/components/` |
| App layout and routes | `src/AppShell.jsx` |
| Images | `public/assets/images/` |
| Background music | `public/audio/` |
| Redirects, security headers, caching | `vercel.json` (`serve.json` is the same setup for local testing) |
| Prerendering and sitemap | `scripts/prerender.mjs` |
| Tests | `tests/site.spec.js` |

### Common updates

- **Add your CV.** Put the PDF in `public/` (for example `public/cv.pdf`) and set `cvUrl: '/cv.pdf'` in `src/data/site.js`. A "Download CV" button then appears in the footer and on the Connect page.
- **Add a page.** Create it in `src/pages/`, add its route in `src/AppShell.jsx`, its link in `NAV_LINKS` (`src/components/Navbar.jsx`) and its title and description in `ROUTE_META` (`src/data/site.js`). The build creates its HTML file and sitemap entry automatically.
- **Add images.** Use WebP, sized for how they are shown: about 800px wide for cards, 1600px for the full-screen viewer (see the `src` and `full` fields on the My Story page). The viewer shows the card image straight away and swaps in the larger one when it has loaded.
- **Fade-in on scroll.** Add the `reveal` class (or wrap the block in `<AnimatedItem>`). Don't put it on elements that need their own hover movement.
- **The numbers on the home page** ("13+ years", "6+ years in tech") update by themselves every year from the dates in `src/data/site.js`.

## Deploying

Vercel builds every push to `master`: `npm ci`, then `npm run build`, and serves the `build/` folder. These settings come from `vercel.json` and take priority over the build settings in the Vercel dashboard. Every pull request gets its own preview link: open it and check the site before merging.

**Custom domain (recommended).** An address like `hagophadjiakian.com` looks more professional on a CV than the `vercel.app` one. After adding it in the Vercel dashboard (Project → Settings → Domains), update `siteUrl` in `src/data/site.js` and the `Sitemap:` line in `public/robots.txt`.

## Tests

`tests/site.spec.js` checks the built site at desktop and phone sizes:

- every page loads with its own title and heading, with no errors and no sideways scrolling
- navigation, the 404 page and the old `/documentation` → `/videos` redirect
- the home page: buttons visible without scrolling, nothing jumping while the hero animates, no music downloaded until the visitor turns it on
- the contact form checks its fields before opening the email app, and the contact page doesn't list NeurolinkUp
- cards and photos are visible before JavaScript has loaded, and the project gallery opens with the photo already shown
- the experience cards and the image viewer work with the keyboard
- an axe accessibility scan of every page
- every page works without JavaScript and has its own title, description and preview tags
- `robots.txt`, `sitemap.xml`, and that `serve.json` uses the same security headers as `vercel.json`

## Background music

Music is off by default and is only downloaded when a visitor presses play (or points at the music button, to get a head start). Each page has its own track (`AUDIO_TRACKS` in `src/data/site.js`), saved twice in `public/audio/`: `name.webm` (Opus, about 750 KB, used by most browsers) and `name.mp3` (about 940 KB, for the rest). When the visitor changes page with music on, the current track keeps playing while the next one downloads, then fades over.

To replace a track, make a two-minute loop in both formats, for example with ffmpeg:

```bash
ffmpeg -i original.mp3 -t 120 -af "afade=t=in:d=1.5,afade=t=out:st=116:d=4" -c:a libopus -b:a 48k home.webm
ffmpeg -i original.mp3 -t 120 -af "afade=t=in:d=1.5,afade=t=out:st=116:d=4" -c:a libmp3lame -b:a 64k home.mp3
```

Only publish music you have the rights to use.

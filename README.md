# Norges Dartsforbund – konsept for ny nettside

A pitch prototype of a new website for Norges Dartsforbund (NDF). It's a response to NDF's request for a new website supplier, posted 20 Oct 2026.

**This is a concept.** Login, payment, sign-ups and the contact form are simulated in the browser, and nothing is sent anywhere. Content marked *eksempeldata* (calendar, ranking, results, clubs) is invented example data.

## What's real and what's example data

| Real (from today's norgesdartsforbund.no, Nov 2026) | Example data |
|---|---|
| News titles and dates (linked to the originals) | Terminliste 2027 |
| The board, contact details, addresses | Ranking and results (invented names) |
| 2026 membership fees, payment info, Vipps sales point | Clubs and districts (kretser) |
| Partners | Member number and Min side |

## Features

- **Front page:** countdown to the next national championship, news, upcoming tournaments, top 5 in the ranking, and a "get started" guide
- **Terminliste:** filter by level, month and search; sign up directly; download an .ics calendar file for any event
- **Resultater:** podium and knockout bracket per tournament
- **Rangering:** men, women and junior, with search and movement since the last list
- **Finn klubb:** search by place/district, with filters for "accepts beginners" and "has a junior group"
- **Bli med:** what darts is, how to join, fees and payment
- **Min side (simulated login):** membership status, pay fees with Vipps, my sign-ups (with unregister), profile, digital membership card
- **Om NDF / Kontakt:** board, rules and forms, anti-doping, contact form with topic routing

## Quality

- Universal design (WCAG 2.1 AA as the target, a legal requirement in Norway): semantic HTML, skip link, visible focus, keyboard-operable tabs, `aria-live` on filter results, respects `prefers-reduced-motion`
- Responsive down to 360 px
- Self-hosted font (Archivo, SIL OFL), so there are no requests to Google Fonts, which matters for GDPR
- No dependencies, no tracking, no cookies. `localStorage` is used only for the simulated login

## Structure

```
src/partials/   head.html (header, menu) and foot.html (partners, footer)
src/pages/      one file per page, starting with <!-- title | page | nav | desc -->
assets/         css, js (data.js = content, site.js = logic), fonts
build.py        builds everything to docs/ and generates the dartboard SVG
docs/           finished site (published via GitHub Pages)
```

Build: `python3 build.py` (Python 3, no packages needed). Preview locally: `cd docs && python3 -m http.server`.

## Publishing as a demo

Settings → Pages → *Deploy from a branch* → `main` / `/docs`. The site has `noindex` so search engines don't pick it up, and a banner at the top making clear it's a concept.

## In a production version

The example data and the simulated features are replaced by:

- Member registry and login (e.g. BankID/Vipps Login via a backend), real Vipps ePayment for fees
- Terminliste, sign-ups and results from a database/admin panel, with a ranking calculated automatically from results
- A CMS for news so the board can publish without technical help
- An English version for international events (Nordic Cup)

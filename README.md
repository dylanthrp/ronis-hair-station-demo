# Roni's Hair Station — Portfolio Concept

**Live preview:** https://dylanthrp.github.io/ronis-hair-station-demo/
**Owner / builder:** Dylan Thorpe
**Type:** Unsolicited portfolio concept (not the official Roni's Hair Station page)
**Local source:** `C:\Users\dylan\Documents\ronis-hair-station-demo\`

## What this is

An independent design concept for **Roni's Hair Station** (a hairstylist at The Hair Connection, 20938 Van Born Rd, Dearborn Heights, MI 48125). Built from public Facebook info only — no endorsement, no partnership, no commerce.

The site is a single-page static HTML/CSS/JS build hosted on GitHub Pages, designed to demonstrate a real, polished alternative to a Facebook-only business presence. It is **not** an authorized launch of an official Roni's Hair Station page.

## What's in the build

- **Hero** — Roni's portrait, "the hairdresser who listens" headline, phone + text CTAs
- **About** — bio and "what to expect" callout
- **Services** — 6 service cards with placeholder prices
- **The chair** — her "therapist who listens" quote as the brand differentiator
- **Visit & book** — hours table (with today's row highlighted), three contact paths (phone/SMS, Facebook Messenger, Instagram DM) with a pre-filled booking message
- **Map** — Google Maps embed of the real address

## What is real vs placeholder

**Real (sourced from public Facebook listing):**
- Roni's name, portrait (extracted from her public profile picture)
- Phone: (313) 804-4844
- Email: ronihair85@gmail.com
- Instagram: @ronihair85
- Facebook: @Ronihair85
- Shop address: 20938 Van Born Rd, Dearborn Heights, MI 48125
- Shop hours: Mon closed, Tue–Thu 10–6, Fri 10:30–4, Sat 10–3, Sun closed
- The "therapist" quote (from her cover photo)

**Placeholder (not from Roni):**
- Service prices ("from $X") — must be confirmed with Roni before any real launch
- All About copy beyond what was in her Facebook intro
- Service menu items themselves (standard cut/color/blowout categories)

## Running locally

No build step. Static files only.

```bash
cd "C:/Users/dylan/Documents/ronis-hair-station-demo"
python -m http.server 4176
# open http://127.0.0.1:4176/
```

## Repeatable audit

`node tests/audit.cjs` — checks 4 widths (320/390/768/1440) for 0 JS errors, no overflow, header single-row, service cards present, contact rows present, today-highlight, footer year, map iframe, pre-filled message wiring.

Last audit (this build): **48/48 pass**.

## Disclosure

The site carries a "Portfolio concept" banner on every page linking back to the official Facebook page. `<meta name="robots" content="noindex,nofollow">` is set so the demo does not compete with her real page in search. The site is published to demonstrate the design pattern, not to claim or impersonate the real business.

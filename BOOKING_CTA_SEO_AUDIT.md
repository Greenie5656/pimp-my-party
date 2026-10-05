# Booking CTA + SEO Audit — Phase 1 (read-only)

**Date:** 5 October 2026
**Audited commit:** `f48b830` (tip of `main`)
**Status:** Phase 1 approved 5 Oct 2026. Phases 2 and 3 complete on branch `feat/booking-cta-seo`. See **Changes Made** at the bottom.

This file is written for a beginner. Each section starts with the short answer, then gives the detail.

---

## 0. TL;DR: the things you need to know first

| # | Finding | Why it matters |
|---|---------|----------------|
| 1 | `feat/enquiries-api` is **already merged** into `main` (PR #11). `main` is 12 commits ahead of it. | Base Phase 2 on **`main`**, not on `feat/enquiries-api`. That branch is stale. |
| 2 | **There is no mobile menu.** The NavBar is a single row of 6 links on every screen size. | Your brief says "desktop AND mobile menu". There is nothing to add a mobile menu item to. **I need a decision from you (Question A, section 8).** |
| 3 | **The nav already overflows on common phones.** At 375px wide (iPhone 12/13 mini, SE) "Home" and "Contact" are cut off at the edges and the page scrolls sideways. At 320px it also overflows. | This bug exists already; I didn't cause it. Adding a 7th item to that row would make it worse, so the mobile button has to go somewhere else (see Question A). |
| 4 | GA4 tracking already has a helper file, **`src/lib/gtag.js`**, used by 9 components. It calls `window.gtag(...)` with a safety check. | This is a better existing pattern than `sendGAEvent`. I recommend using it so all tracking works the same way (section 5). |
| 5 | The booking form **already sends `generate_lead`** on success (`BookingForm.jsx:208`, via `trackFormSubmission('booking_form')`). The contact form sends `generate_lead` too (`ContactContent.jsx:42`). | If I add a new `generate_lead` call, every booking would be **counted twice**. The plan is to tighten the existing call, not add a second one. |
| 6 | **Existing bug:** the existing `generate_lead` also fires when the honeypot catches a bot. The API answers bots with `200 {ok:true}`, and the form only checks `response.ok`. | Bot submissions can inflate lead counts. A one-line fix is planned: real saves return `201` with an `id`, so only count a lead when `data.id` exists. |
| 7 | **`STRIPE_DEPOSIT_LINK` is NOT empty.** `BookingForm.jsx:39` holds a live link (`https://buy.stripe.com/3cI7...`), so the "Secure your date — £100 deposit" button **is showing** on the confirmation screen. | Your brief says it's a placeholder set to `''`. I will **not** touch it, but please check that this is what you expect. |
| 8 | `/book` is indexable, has a canonical, is in the sitemap (priority 0.9) and has its own Open Graph image. | It's in good shape. **Recommend leaving it as-is** (section 4). |
| 9 | No Google Ads, Meta Pixel, Hotjar, Clarity or Vercel Analytics found. GA4 is the only tracking. | Low risk of clashing with other tracking. |
| 10 | Nothing anywhere on the site links to `/book` today. | The booking system can only be reached by typing the URL or from the sitemap. Phase 2 fixes this. |

Baseline checks on `main`: `npm run lint` ✅ passes (no warnings). `npm run build` ✅ passes (16 routes).

---

## 1. Branch state

**Short answer:** `feat/enquiries-api` was merged into `main` by PR #11 (merge commit `56183fe`). Since then `main` has picked up 12 more commits, including booking fixes (mobile layout, hidden package prices, the removed "5 hours" line), the www hostname refactor and the expandable service cards. `feat/enquiries-api` has **0** commits that `main` lacks.

```
git rev-list --left-right --count origin/main...origin/feat/enquiries-api
12   0            ← main is 12 ahead, feat/enquiries-api is 0 ahead
git merge-base --is-ancestor origin/feat/enquiries-api origin/main  → MERGED
```

If you diffed `main` against `feat/enquiries-api`, you'd see `feat/enquiries-api` **missing** `src/lib/site.js`, the `migrations/` folder and the booking-form fixes. Building on it would undo those fixes.

**Recommendation:** create `feat/booking-cta-seo` from **`origin/main`**. I won't merge anything.

> Note on branch naming: this cloud session was set up to push to `claude/sweet-babbage-un6any`. This audit file is committed there; that branch was identical to `main` before the commit. For Phase 2 I will create `feat/booking-cta-seo` from `main`, as your brief asks, unless you tell me otherwise.

---

## 2. Current conventions (so new code matches)

### 2.1 Folders, imports, naming

| Thing | Convention | Example |
|---|---|---|
| Components | `src/component/` (singular), PascalCase `.jsx` | `src/component/CTA.jsx` |
| Pages | `src/app/<route>/page.js`, server components exporting `metadata` | `src/app/book/page.js` |
| Shared helpers | `src/lib/*.js`, named exports | `src/lib/site.js`, `src/lib/gtag.js` |
| Import alias | `@/` → `src/` (in `jsconfig.json`) | `import CTA from '@/component/CTA'` |
| Client directive | First line `'use client';` or `"use client";` (both quote styles exist) | |
| Quote style | Mixed. Newer files (`CTA.jsx`, `LocationContent.jsx`, `BookingForm.jsx`) use single quotes | New file will use single quotes |
| Icons | `lucide-react`, imported by name | `import { ArrowRight } from 'lucide-react'` |
| Colours | Tailwind v4 `@theme` in `globals.css`: `heliotrope #d372ff`, `tekhelet #462278`, `fuchsia #fb12fc`. Pages also use stock `purple-600` / `pink-600` | |

### 2.2 How the existing CTA buttons are built

The site has **three** button styles. That justifies a `variant` prop.

**Style 1: gradient pill on a dark background** (`LocationContent.jsx:46-55`, the phone button on the wedding page)
```jsx
<motion.a
  href={CONTACT.phoneHref}
  onClick={() => trackPhoneClick(`${location.slug}_hero`)}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-full transition-opacity duration-300 hover:opacity-90"
>
  <Phone size={18} />
  {CONTACT.phone}
</motion.a>
```

**Style 2: white pill inside a coloured CTA box** (`CTA.jsx:104-122`, also `ServicesContent.jsx:362-370`)
```jsx
<motion.a
  href="/contact"
  onClick={() => trackCTAClick('get_free_quote', ctaLocation)}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 group"
>
  <span>Get Your Free Quote</span>
  {/* ArrowRight wrapped in an infinitely bouncing motion.div */}
</motion.a>
```

**Style 3: outline/glass pill** (`LocationContent.jsx:56-77`, WhatsApp / Email buttons)
```
inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-purple-500/30 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 hover:border-purple-500/60
```

**Shared patterns**
- Motion props are always `whileHover={{ scale: 1.05 }}` and `whileTap={{ scale: 0.95 }}`.
- Every existing CTA uses `motion.a` with a plain `href`, **including internal links** like `/contact`. That means a full page reload. The new button will use `next/link`, as you asked, through `motion.create(Link)` so it keeps the same hover/tap animation. Framer Motion 12 supports this.
- Tracking happens in `onClick` and calls a helper from `@/lib/gtag`.

### 2.3 Animation variants in use

- `Services.jsx:229-257` has `containerVariants` (`staggerChildren: 0.1`) and `itemVariants` (`hidden {opacity 0, y 20}` → `visible {opacity 1, y 0, 0.5s easeOut}` + a `hovered` lift of `y: -8`).
- `NavBar.jsx:81-102` has `containerVariants` (`staggerChildren 0.1, delayChildren 0.3`) and `itemVariants` (`hidden {opacity 0, y -20}` → `visible`). **Each nav item fades/drops in on page load.**
- `ServicesContent.jsx:20-57` has `containerVariants` / `itemVariants` / `cardVariants`.
- Standalone sections use inline `initial` / `whileInView` / `viewport={{ once: true }}`.

### 2.4 How NavBar works (desktop and mobile)

File: `src/component/NavBar.jsx` (client component, 157 lines).

1. `navLinks` (lines 14-21) is a hard-coded array of 6 `{ name, href }` objects.
2. **Hide-on-scroll** (lines 23-79):
   - `lastScrollY` (useRef) remembers the last scroll position, and `scrollDirection` (useRef) remembers "up" or "down". Refs are used so scrolling doesn't cause re-renders.
   - A passive scroll listener, throttled with `requestAnimationFrame`, compares the current position with the last one. If the change is under 10px it does nothing. Scrolling down sets `isVisible=false`. Scrolling up sets `isVisible=true`. It is always visible when `scrollY < 10`.
   - `isVisible` toggles `translate-y-0` / `-translate-y-full` on the `<nav>` (line 106), which is `sticky top-0 z-50`.
3. **Rendering** (lines 111-154): one `motion.ul` with `flex justify-center` and responsive gaps. Each `motion.li` holds a `<Link>` with a `motion.span` label (`whileHover 1.1`, `whileTap 0.95`). The active page gets a gradient underline (`layoutId="activeIndicator"`).
4. **Mobile:** **no hamburger and no separate menu.** The same row just shrinks: text goes from `text-sm` up to `md:text-lg`. `globals.css:34-41` also forces `nav ul { gap: .5rem }` and **`nav span { font-size: .75rem }`** below 360px. That second rule will also shrink any `<span>` inside a new nav button.

**Measured overflow** (production build, headless Chromium):

| Viewport | Row width needed | Space available | Result |
|---|---|---|---|
| 320px | 321px | 304px | ❌ overflows, page scrolls sideways |
| 360px | 344px | 344px | ✅ just fits |
| 375px | 384px | 359px | ❌ "Home"/"Contact" clipped, page scrolls sideways (docWidth 392) |
| 414px | 403px | 398px | ⚠️ marginal |
| 768px+ | fits | fits | ✅ |

So the nav row has **no room for a 7th item on phones.**

---

## 3. Current CTAs and internal links

### 3.1 Every CTA

**Homepage** (`src/app/page.js` → `Hero`, `Services`, `LocalAreas`, `CTA`)

| Label | Destination | File:line | Tracking |
|---|---|---|---|
| *(none in hero)* | — | `Hero.jsx` | — |
| "Get Your Free Quote" | `/contact` | `CTA.jsx:104-122` | `cta_click` (`get_free_quote`, `homepage_cta`) |
| "Manchester" area card | `/wedding-dj-manchester` | `LocalAreas.jsx:325` (rendered as `motion.a`) | none |

**Wedding DJ Manchester** (`src/app/wedding-dj-manchester/page.js` → `LocationContent.jsx`)

| Label | Destination | File:line | Tracking |
|---|---|---|---|
| "07359 189070" | `tel:` | `LocationContent.jsx:46-55` | `contact_click` phone |
| "WhatsApp" | wa.me | `LocationContent.jsx:56-67` | `contact_click` whatsapp |
| "Email us" | mailto | `LocationContent.jsx:68-77` | `contact_click` email |
| "downloadable brochure" | `/brochure` | `LocationContent.jsx:132-137` | none |
| "services page" | `/services` | `LocationContent.jsx:139-144` | none |
| "See more photos in the gallery" | `/gallery` | `LocationContent.jsx:192-197` | none |
| "Ask about your venue" | `/contact` | `LocationContent.jsx:279-284` | none |
| "Get Your Free Quote" | `/contact` | `CTA.jsx` via `LocationContent.jsx:291` | `cta_click` (`get_free_quote`, `wedding-dj-manchester_page`) |

**Services** (`src/app/services/page.js` → `ServicesContent.jsx`)

| Label | Destination | File:line | Tracking |
|---|---|---|---|
| "Manchester" pill | `/wedding-dj-manchester` | `ServicesContent.jsx:266` | none |
| "Get Started Today" | `/contact` | `ServicesContent.jsx:362-370` | `cta_click` (`get_started_today`, `services_page`) |

**Other pages**

| Page | Label | Destination | File:line |
|---|---|---|---|
| About | "07359189070" (under "Call Us to Book") | `tel:` | `AboutContent.jsx:234-242` |
| Contact | WhatsApp / Email / Call cards + Formspree form | external | `ContactContent.jsx:242-322`, form `:102` |
| Brochure | "Download PDF" ×2 | PDFs | `Brochure.jsx:98-106` |
| Brochure | "Get in touch" | `/contact` | `Brochure.jsx:119-124` |
| Book (confirmation) | "Secure your date — £100 deposit" / WhatsApp / "Back to Home" | Stripe / wa.me / `/` | `BookingForm.jsx:265-304` |
| Every page | NavBar 6 links | | `NavBar.jsx:14-21` |
| Every page | Footer "Wedding DJ Manchester" | `/wedding-dj-manchester` | `Footer.jsx:125-133` |

### 3.2 Pages that link to `/wedding-dj-manchester`

| From | Anchor text | Where |
|---|---|---|
| **Every page** (footer) | "Wedding DJ Manchester" | `Footer.jsx:131` (`location.breadcrumbName`) |
| Homepage | "Manchester — Mobile DJ • Wedding DJ • Photobooth" (whole card) | `LocalAreas.jsx:325` |
| Services | "Manchester" (pill) | `ServicesContent.jsx:266` |

There is **no contextual in-sentence link** to the page anywhere. Every anchor is either the exact-match footer link or a bare "Manchester" card/pill.

### 3.3 Where DJ + Photo Booth is already mentioned

| Where | What it says |
|---|---|
| Homepage `Services.jsx:188-210` | "Photo Booths & Dancefloors" card (expandable: "Photo booth hire", "Photo booth backdrops") |
| Homepage `LocalAreas.jsx:325,328,332,370` | "Mobile DJ • Wedding DJ • Photobooth", "Want to hire a Photobooth in Greater Manchester?" |
| Services `ServicesContent.jsx:63-65` | "Entertainment Services" card: "Professional DJs, live saxophone performances, and interactive photo booths…" |
| Services `ServicesContent.jsx:254` | "…mobile DJ, wedding DJ, saxophone player, and photobooth hire services…" |
| Wedding page `locations.js:57-60` | "Photo booths" service card (selfie, printing, 360 video booth, from £250) |
| Wedding page `locations.js:130-131` | FAQ "Can you supply more than just a DJ?" (also in FAQPage JSON-LD, **must not change**) |
| Wedding page `locations.js:46-47` | "Most couples book a DJ and then add the extras that suit their venue…" |
| Booking form `booking-options.js:42` | "Photobooth" is an extra on every DJ package |
| About `AboutContent.jsx:144` | "Photo Booths & Dancefloors" list item |

**There is no dedicated photo booth page** (and we must not create one). The best existing "service info" targets are `/services` (Entertainment Services card) and `/brochure` (photo booth prices). The wedding page has the richest DJ + photo booth combination copy.

---

## 4. `/book` SEO status (report only, no changes)

| Item | Current value | Source |
|---|---|---|
| Title | `Book Your Event \| Pimp My Party - DJ & Entertainment Manchester` | `book/page.js:5` |
| Meta description | `Book a mobile DJ, wedding DJ, photobooth or full event package with Pimp My Party. Quick online enquiry form covering Manchester, Salford, Bury & Greater Manchester.` | `book/page.js:6` |
| Robots | `index, follow` (inherited from layout) | `layout.js:33-43` |
| Canonical | `https://www.pimpmyparty.co.uk/book` | `book/page.js:7-9` |
| Open Graph | Own block, **re-declares `images: [OG_IMAGE]`** ✅ | `book/page.js:13-21` |
| Twitter | Own block with image ✅ | `book/page.js:22-28` |
| JSON-LD | LocalBusiness (layout) + BreadcrumbList (Home → Book Your Event) | `book/page.js:31-48` |
| Sitemap | ✅ listed, priority 0.9, `lastModified 2025-05-01` | `sitemap.js:54-59` |
| robots.txt | Not disallowed (only `/api/`, `/_next/`, `/admin`) | `robots.js:9` |
| H1 / H2 | "Book Your Event" / "About your event" (step 1 heading) | `BookingForm.jsx:322-324, 389` |

**Recommendation: leave `/book` exactly as it is.** It is correctly set up as a public, indexable conversion page. Once the nav links to it, it will be discovered naturally. The only cosmetic issue is the sitemap `lastModified` (2025-05-01, earlier than the page existed). It's harmless, and your rules say not to touch sitemap behaviour, so I won't.

---

## 5. Analytics audit

### 5.1 How GA4 loads
- `src/component/SiteChrome.jsx:25` renders `<GoogleAnalytics gaId="G-J22NSQHKQ2" />` from `@next/third-parties/google`.
- It is **on** for every public route and **off** for anything starting with `/admin` (SiteChrome returns only `children` there, line 15-17).
- That component injects an inline script that creates `window.dataLayer` and **`window.gtag`**, then loads `gtag.js`.
- The measurement ID is hard-coded twice: `SiteChrome.jsx:25` and `gtag.js:1` (`GA_MEASUREMENT_ID`, exported but unused). They match.

### 5.2 Existing custom events (all via `src/lib/gtag.js` → `trackEvent` → `window.gtag('event', …)`)

| Event | Params | Fired from |
|---|---|---|
| `generate_lead` | `event_category: 'form'`, `event_label: 'contact_form'` | `ContactContent.jsx:42` (Formspree OK) |
| `generate_lead` | `event_category: 'form'`, `event_label: 'booking_form'` | `BookingForm.jsx:208` (`response.ok`) |
| `contact_click` | `contact_method` phone/whatsapp/email, `event_label` location | Location, About, Contact pages |
| `cta_click` | `event_label` cta name, `cta_location` | `CTA.jsx:106`, `ServicesContent.jsx:364` |
| `file_download` | `event_label` brochure title | `Brochure.jsx:101` |
| `social_click` | `event_label` platform | `Footer.jsx:85` |

No `sendGAEvent` or direct `dataLayer` usage anywhere. **No Google Ads (`AW-`) tags, no conversion linker, no Meta Pixel, no other tracking.**

### 5.3 `sendGAEvent` vs the existing `trackEvent`, and my recommendation
Both do the same thing in the end: they push the event onto `window.dataLayer`.
- `trackEvent` checks `window.gtag` exists first, then calls it. It does nothing if GA isn't there.
- `sendGAEvent` logs a console warning if GA isn't set up yet, and its call signature differs (`sendGAEvent('event', name, params)`).

**Recommendation: keep using `src/lib/gtag.js`.** I'd add three small helpers next to the existing ones and wrap `trackEvent` in a `try/catch`. Then a broken or blocked GA can never throw an error into a click handler or the booking form. The try/catch doesn't change the behaviour of any existing event.

### 5.4 Duplicate-event risks

| Risk | Finding |
|---|---|
| React Strict Mode double-firing | Strict Mode only double-runs **effects** (`useEffect`), and only in `next dev`, never in production. All planned events fire from **click handlers or after `await fetch`**, never from an effect, so they can't double-fire. `next.config.mjs` doesn't change `reactStrictMode`. |
| Re-renders | Event calls live in handlers, not in render, so re-renders can't trigger them. |
| `booking_start` firing twice | A user can go Step 1 → 2 → Back → 2. A `useRef(false)` guard means it fires only on the first advance. |
| `generate_lead` counted twice | **Real risk if a second call is added.** The plan is to modify the one existing call, not add another. |
| `generate_lead` on honeypot | **Pre-existing bug:** it fires today, because the honeypot response is `200 {ok:true}`. Fix: fire only when `data.id` is present (real saves return `201 {ok, id}`). |
| `/admin` / AddEnquiryModal | GA isn't loaded on `/admin`. `AddEnquiryModal.jsx` posts to `/api/admin/enquiries` and imports nothing from `gtag.js`. NavBar and Footer aren't rendered there either. So no booking events can fire from admin. |
| GA4 Enhanced Measurement | `form_start`/`form_submit` auto-events need a `<form>` element, and the booking form has none, so no overlap. Page views on client-side navigation to `/book` are handled automatically by GA4's history tracking (unchanged). |

---

## 6. SEO protection baseline (rendered HTML from `npm run build && next start`)

These are the exact values Google sees today. Phase 3 will re-extract them and diff.

Pages I plan to touch directly: **`/`**, **`/wedding-dj-manchester`**, **`/services`**, and **`/book`** (analytics only). NavBar appears on **every** public page, so every page's baseline is recorded.

### `/` (homepage)
- **Title:** `Pimp My Party | Mobile DJ & Party Services Manchester | Wedding DJ Hire`
- **Description:** `Professional Mobile DJ, Wedding DJ, Saxophone Player & Photobooth Hire in Manchester, Salford, Bury & Greater Manchester. 20 years experience. Book your event today!`
- **Canonical:** `https://www.pimpmyparty.co.uk`
- **Robots:** `index, follow`
- **OG:** title `Pimp My Party | Professional DJ Services Manchester`, url `https://www.pimpmyparty.co.uk`, image `https://www.pimpmyparty.co.uk/socials.png` (from layout; `page.js` declares no `openGraph`, so the layout's applies)
- **H1:** `Professional DJ Services`
- **H2:** `Our Services` · `Serving Greater Manchester & Beyond` · `Ready to Make Your Event Unforgettable?`
- **H3:** `Trusted By The Best`, 11 area names, `Connect With Us`
- **JSON-LD:** LocalBusiness (`#localbusiness`)

### `/wedding-dj-manchester`
- **Title:** `Wedding DJ Manchester | Pimp My Party`
- **Description:** `A professional wedding DJ for receptions in Manchester and across Greater Manchester, with live saxophone, photo booths, dancefloors and venue lighting available alongside. Call 07359 189070 for a free consultation.`
- **Canonical:** `https://www.pimpmyparty.co.uk/wedding-dj-manchester`
- **Robots:** `index, follow`
- **OG:** own block, title = page title, url = canonical, **image `socials.png` re-declared** ✅
- **H1:** `Wedding DJ in Manchester`
- **H2:** `What we can provide for a Manchester wedding` · `Manchester weddings we have worked on` · `How booking works` · `Manchester wedding DJ questions` · `Ready to Make Your Event Unforgettable?`
- **H3:** 8 service titles, 4 process steps, 7 FAQ questions, `Connect With Us`
- **JSON-LD:** LocalBusiness · BreadcrumbList · Service (`provider @id`) · FAQPage (7 Q&As)
- **Sitemap lastModified:** driven by `locations.js` `contentUpdated: '2026-08-04'`

### `/services`
- **Title:** `Mobile DJ & Photobooth Hire Manchester | DJ, Saxophone & Event Services | Pimp My Party`
- **Description:** `Mobile DJ hire, Wedding DJ, Saxophone Player & Photobooth hire across Manchester, Salford, Bury & Greater Manchester. Full event planning. 20 years experience. Free quote.`
- **Canonical:** `https://www.pimpmyparty.co.uk/services`
- **OG:** own block, title `Mobile DJ & Photobooth Hire Manchester | Pimp My Party`, image re-declared ✅
- **H1:** `Our Services`
- **H2:** `Serving Greater Manchester & Beyond` · `How We Work` · `Ready to Plan Your Perfect Event?`
- **H3:** 6 service titles, 4 process steps, `Connect With Us`
- **JSON-LD:** LocalBusiness · ItemList (6 Services) · BreadcrumbList

### `/book`: see section 4.

### Other pages (NavBar only; content untouched)

| Page | Title | Canonical | H1 | JSON-LD |
|---|---|---|---|---|
| `/about` | `About Pimp My Party \| 20 Years of DJ & Event Experience in Manchester` | `/about` | About Us | LocalBusiness, BreadcrumbList |
| `/contact` | `Contact Us \| Pimp My Party - Get a Free Quote Manchester` | `/contact` | Get In Touch | LocalBusiness, BreadcrumbList |
| `/gallery` | `Gallery \| Pimp My Party - Event Photos & Highlights Manchester` | `/gallery` | Our Gallery | LocalBusiness, BreadcrumbList |
| `/brochure` | `DJ, Photo Booth & Party Prices \| Download Our Brochure \| Pimp My Party` | `/brochure` | Our Brochures | LocalBusiness, BreadcrumbList |

All have `index, follow` and `og:image = socials.png`. `robots.txt` and `sitemap.xml` were captured too.

(The full extraction, including JSON-LD fingerprints, is saved in my session scratchpad for the Phase 3 diff.)

---

## 7. Proposed implementation plan (Phase 2)

Branch `feat/booking-cta-seo` from `origin/main`. **One commit per task.** No new dependencies. Nothing in the "do not change" list is touched.

### How the props flow

```
src/lib/site.js
  └─ BOOKING_PATH = '/book'          ← one place to change the URL

src/lib/gtag.js
  └─ trackBookingCTAClick(location)  ← sends booking_cta_click { cta_location }

src/component/BookingCTA.jsx  (new, client component)
  props:
    label     (string)  the text on the button, e.g. "Book Now"
    location  (string)  where the button sits, e.g. "navbar_desktop".
                        Only used for analytics; the visitor never sees it.
    variant   (string)  'primary' | 'light' | 'nav'. Picks one of the
                        existing button styles. Defaults to 'primary'.
  renders: <MotionLink href={BOOKING_PATH} onClick={() => trackBookingCTAClick(location)}>

Used by (parent passes the props down):
  NavBar.jsx           <BookingCTA label="Book Now"           location="navbar_desktop" variant="nav" />
  Hero.jsx             <BookingCTA label="Book Your Event"    location="homepage_hero" />
  CTA.jsx              <BookingCTA label="Book Online"        location={`${ctaLocation}_book`} variant="light" />
  LocationContent.jsx  <BookingCTA label="Check Availability" location={`${location.slug}_hero`} />
  ServicesContent.jsx  <BookingCTA label="Book Online"        location="services_page_book" variant="light" />
```

When a visitor clicks, `onClick` runs first and pushes one GA event. Then `next/link` navigates to `/book` without a full reload. The `onClick` never calls `preventDefault()`, so the link works even if GA is blocked.

### TASK 1: Reusable booking button (HIGH)

**`src/lib/site.js`**: append after line 38:
```js
// The public booking form. Every "Book" button links here.
export const BOOKING_PATH = '/book';
```

**`src/component/BookingCTA.jsx`**: new file, about 45 lines:
```jsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { BOOKING_PATH } from '@/lib/site';
import { trackBookingCTAClick } from '@/lib/gtag';

const MotionLink = motion.create(Link);

// Same classes as the existing buttons - see LocationContent (primary),
// CTA (light) - plus a compact one sized for the nav row.
const VARIANTS = {
  primary:
    'inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-full transition-opacity duration-300 hover:opacity-90',
  light:
    'inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300',
  nav:
    'inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm px-4 py-1.5 rounded-full transition-opacity duration-300 hover:opacity-90',
};

// `location` only labels the GA4 booking_cta_click event so we can see which
// button people use. It is never shown on the page.
export default function BookingCTA({ label, location, variant = 'primary' }) {
  return (
    <MotionLink
      href={BOOKING_PATH}
      onClick={() => trackBookingCTAClick(location)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={VARIANTS[variant] || VARIANTS.primary}
    >
      <CalendarCheck size={18} aria-hidden="true" />
      <span>{label}</span>
    </MotionLink>
  );
}
```
- No infinite animations: only hover/tap scale, like every existing button.
- It is server-rendered like the rest of the client components, so it's in the HTML on first paint. **No layout shift.**
- `CalendarCheck` is one tree-shaken lucide icon, a few hundred bytes.

**`src/lib/gtag.js`**: wrap `trackEvent` in `try/catch` (lines 4-8) and append helpers:
```js
// BEFORE (lines 4-8)
export function trackEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

// AFTER
export function trackEvent(eventName, parameters = {}) {
  // Tracking must never break the page, e.g. when an ad blocker interferes.
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  } catch {
    // ignore
  }
}

// appended
export function trackBookingCTAClick(location) {
  trackEvent('booking_cta_click', { cta_location: location });
}

export function trackBookingStart(params) {
  trackEvent('booking_start', params);
}
```

### TASK 2: Place the button (HIGH)

**a) NavBar (`src/component/NavBar.jsx`)**: **depends on Question A below.** Recommended option:
- **Desktop/tablet (`md` and up, 768px+):** a 7th `motion.li` after the `navLinks.map` (after line 153) containing `<BookingCTA label="Book Now" location="navbar_desktop" variant="nav" />`, wrapped in `hidden md:block`. There is room at 768px+ (measured).
- **Phone (under 768px):** a slim second row **inside the same sticky `<nav>`**, under the links: `<div className="md:hidden flex justify-center mt-3"><BookingCTA label="Book Now" location="navbar_mobile" variant="nav" /></div>`. It hides and shows with the nav on scroll because it's inside the same element. Cost: the nav gets about 40px taller on phones.
- The scroll logic, `navLinks`, active indicator and animations are **untouched**.

**b) Homepage hero (`src/component/Hero.jsx`)**: insert a centred button between the subtitle block (ends line 107) and the video block (line 109):
```jsx
<div className="flex justify-center mb-10">
  <BookingCTA label="Book Your Event" location="homepage_hero" />
</div>
```
And change the subtitle wrapper's `mb-12` → `mb-6` (line 73) so the video moves down only about 3rem, not about 6rem. *Optional: skip the hero and rely on (c) if you'd rather not touch the hero.*

**c) Shared CTA box (`src/component/CTA.jsx`, used on the homepage AND the wedding page)**: put the existing quote button and a new booking button side by side. Lines 104-122 stay byte-for-byte the same. Only the wrapper `motion.div` (line 94) gets `className="flex flex-wrap justify-center gap-4"`, and this goes after the existing `</motion.a>`:
```jsx
<BookingCTA label="Book Online" location={`${ctaLocation}_book`} variant="light" />
```
That gives `homepage_cta_book` and `wedding-dj-manchester_page_book`. The existing `cta_click` "Get Your Free Quote" event is unchanged.

**d) Services page (`src/component/ServicesContent.jsx`)**: the same treatment for the "Get Started Today" box (lines 362-370). Wrap it plus `<BookingCTA label="Book Online" location="services_page_book" variant="light" />` in `<div className="flex flex-wrap justify-center gap-4">`. The existing button and its tracking stay unchanged.

The existing "Get Your Free Quote" / "Get Started Today" / contact buttons all **stay and still go to `/contact`.**

### TASK 3: Wedding DJ Manchester page (HIGH)

**`src/component/LocationContent.jsx`** (template for the page): add the booking button as the **first** button in the existing hero action row (line 45, before the phone `motion.a` on line 46):
```jsx
<BookingCTA label="Check Availability" location={`${location.slug}_hero`} />
```
- Gradient style, so it sits naturally beside the existing gradient phone button. The row already `flex-wrap`s, so on phones it wraps cleanly.
- Plus the "Book Online" button in the bottom CTA box from Task 2c.
- **No changes** to `locations.js`, the metadata, headings, FAQ text or JSON-LD. **No wording changes on this page.** I considered rewording process step 01 ("…or send the enquiry form…") to point at online booking. That text isn't in the JSON-LD, but the near-identical FAQ answer is in the FAQPage schema. Changing one without the other would be inconsistent, so I recommend **no copy change**.

### TASK 4: Homepage relevance tweak (MEDIUM)

**`src/component/LocalAreas.jsx` lines 368-371**: the closing paragraph of "Serving Greater Manchester & Beyond". Add **one sentence** with a contextual link. H1, title and meta are untouched.

| BEFORE | AFTER |
|---|---|
| Looking for a **professional Mobile DJ in Manchester**? Need a **Wedding DJ in Salford or Bury**? Want to hire a **Photobooth in Greater Manchester**? We've got you covered across all of Greater Manchester, Cheshire, and Lancashire with 20 years of experience delivering unforgettable events. | Looking for a **professional Mobile DJ in Manchester**? Need a **Wedding DJ in Salford or Bury**? Want to hire a **Photobooth in Greater Manchester**? We've got you covered across all of Greater Manchester, Cheshire, and Lancashire with 20 years of experience delivering unforgettable events. Getting married in the city? Take a look at our [wedding DJ hire in Manchester](/wedding-dj-manchester), with live sax, photo booths and dancefloors available alongside. |

- Anchor text: **"wedding DJ hire in Manchester"**.
- Every claim comes from the wedding page's own meta description, so nothing new is asserted.
- Adds `import Link from 'next/link'` and uses the same link classes as `LocationContent.jsx:133`.

### TASK 5: DJ + Photo Booth wording + internal links (MEDIUM)

**a) `/services`, `src/component/ServicesContent.jsx` line 254** (the "Serving Greater Manchester & Beyond" intro): add one sentence with a link.

| BEFORE | AFTER |
|---|---|
| Our professional mobile DJ, wedding DJ, saxophone player, and photobooth hire services are available throughout Manchester, Salford, Bury, Heywood, Middleton, Prestwich, Oldham, Worsley, and across Greater Manchester, Cheshire, and Lancashire. | Our professional mobile DJ, wedding DJ, saxophone player, and photobooth hire services are available throughout Manchester, Salford, Bury, Heywood, Middleton, Prestwich, Oldham, Worsley, and across Greater Manchester, Cheshire, and Lancashire. Planning a wedding? You can book your DJ and photo booth together. See [what we provide for Manchester weddings](/wedding-dj-manchester). |

- Anchor text: **"what we provide for Manchester weddings"** (varied, descriptive, not exact-match).
- "Book your DJ and photo booth together" is factual: Photobooth is an extra on every DJ package in the booking form.

**b) Homepage service card, `src/component/Services.jsx` lines 188-210** ("Photo Booths & Dancefloors"): add the existing optional `note` field, which the DJ card already uses for karaoke (line 53):

| BEFORE | AFTER |
|---|---|
| *(no note)* | `note: "Photo booths can be added to any DJ booking."` |

- It only shows when the card is expanded. It isn't in the server-rendered HTML, so there's **zero SEO effect**. It's a UX nudge only. *Optional: drop it if you'd prefer.*

**Pages getting a new link to the wedding page:** homepage (Task 4) and `/services` (Task 5a). That's two pages, each with different anchor text, and no sitewide links. No new pages.

### TASK 6: Conversion tracking (HIGH)

| Event | Where | When | Params (no personal data) |
|---|---|---|---|
| `booking_cta_click` | `BookingCTA.jsx` `onClick` | every click on any booking button | `cta_location` |
| `booking_start` | `BookingForm.jsx` `goNext` (line 151-158) | **once**, the first time step 1 passes validation and the user advances to step 2 | `event_type` (e.g. "Wedding", from the fixed list), `step: 1` |
| `generate_lead` | `BookingForm.jsx` line 207-208 (**existing call, modified**) | only when `response.ok && data.id`, i.e. a real DB save | existing `event_category: 'form'`, `event_label: 'booking_form'` + new `package_tier` (package id, e.g. `evening-wedding-dj`) |

**The only `BookingForm.jsx` edits** (analytics only; steps, validation, pricing and estimate logic are untouched):
```js
// line 5
// BEFORE: import { trackFormSubmission } from '@/lib/gtag';
// AFTER:  import { trackBookingStart, trackFormSubmission } from '@/lib/gtag';

// after line 89, next to the other refs
const hasTrackedStart = useRef(false);

// goNext, lines 151-158
// BEFORE:
//     setStep(step + 1);
// AFTER:
//     if (step === 1 && !hasTrackedStart.current) {
//       hasTrackedStart.current = true;
//       trackBookingStart({ event_type: formData.eventType, step: 1 });
//     }
//     setStep(step + 1);

// handleSubmit, lines 207-208
// BEFORE:
//       if (response.ok) {
//         trackFormSubmission('booking_form');
// AFTER:
//       if (response.ok) {
//         // The honeypot also answers 200 OK so bots don't notice. Only a real
//         // save comes back with an id, so only that counts as a lead.
//         if (data.id) trackFormSubmission('booking_form', { package_tier: formData.package });
```
And in `gtag.js`, `trackFormSubmission(formName, extra = {})` spreads `extra` into the params. The contact form's existing call passes nothing, so its event is unchanged.

Why each rule holds:
- **Not on page load:** `booking_start` lives in a click handler.
- **Not on validation errors:** `goNext` returns early before the tracking line, and `handleSubmit` returns early before `fetch`.
- **Not on network failure:** that goes to the `catch` block, which never reaches the tracking line.
- **Not on server errors (400/500):** `response.ok` is false.
- **Not on honeypot:** no `data.id`.
- **Never twice:** `useRef` guard for `booking_start`. The form unmounts to the confirmation screen after success, so `generate_lead` can't repeat.
- **Never in admin:** see 5.4.
- **Ad blockers:** `trackEvent` checks for `window.gtag` and is wrapped in `try/catch`, so the form never depends on GA.

### Risk register

| Risk | Level | Mitigation |
|---|---|---|
| Rankings | **Low** | No URL, title, meta, H1–H3, canonical, robots, JSON-LD, OG or sitemap changes. Adds 2 sentences of body copy and 2 contextual internal links. |
| Mobile nav height | **Low–Med** | The recommended second row adds about 40px to the sticky nav on phones. It's server-rendered, so there's no layout shift, but it takes a little screen space. See Question A. |
| Existing nav overflow at 375px | **Pre-existing** | Not caused or fixed by this work unless you ask (Question B). |
| Hero change pushes the video down | **Low** | Shrinking `mb-12` → `mb-6` offsets most of it. The H1 is the likely LCP element and doesn't move. Hero is optional. |
| `CTA.jsx` is shared | **Low** | Changing it adds the booking button to both the homepage and wedding page boxes. That's intended. The quote button is byte-for-byte unchanged. |
| GA reports | **Low** | `generate_lead` keeps its name and existing params, so any existing key-event setup keeps working. Bot leads are excluded from now on. |
| Page speed | **Negligible** | One small component plus one icon. No new packages. |
| Booking system | **Very low** | Only the 3 tracking edits in `BookingForm.jsx`. API, honeypot, DB/email order, `booking-options.js`, admin, SiteChrome and Stripe constant are untouched. |

---

## 8. Questions for you before I start

**A. Mobile nav button: where should it go?** There's no mobile menu, and the nav row is already too wide on phones.
1. **(Recommended)** A slim "Book Now" row under the links, inside the sticky nav. It hides and shows with the nav. About 40px taller on phones.
2. Put the mobile button in the purple logo header above the nav. It isn't sticky, so it scrolls away. The nav itself is unchanged on phones.
3. A floating "Book Now" pill fixed to the bottom of the screen on phones only. Most visible, but more intrusive, and it's a new UI pattern.
4. Desktop only. No nav button on phones; phone users rely on the hero/page buttons.

**B. Should I fix the existing nav overflow at 320/375px?** It's a real bug (links cut off, sideways scroll), but it's outside this brief. A minimal fix would be slightly smaller gaps/text below 400px. I'd do it as its own separate commit so it can be reverted alone. **Default: leave it** unless you say yes.

**C. Homepage hero button:** include it (recommended, since the hero has no CTA at all today) or skip it and rely on the bottom CTA box?

**D. `booking_start` trigger:** I've chosen "advances past step 1" over "first tap on any field", because it's a stronger signal and has fewer false starts. OK?

**E. Stripe deposit link** (`BookingForm.jsx:39`) is live, not empty. Is that expected? I won't touch it either way.

**F. Sitemap dates:** the homepage and `/services` body copy gets one new sentence each. Your rules say don't alter the sitemap, so I'll **leave `lastModified` alone** unless you want those two dates bumped.

---

---

# Changes Made (Phases 2 and 3)

## Your answers to section 8

A: slim phone row inside the sticky nav · B: fix the overflow as its own commit first · C: hero button yes · D: `booking_start` when step 1 is passed · E: Stripe link stays · F: sitemap dates untouched.

## Commits (one per task, each revertable on its own)

| Order | Commit message | Task |
|---|---|---|
| 1 | `docs: Phase 1 booking CTA and SEO audit (no code changes)` | Audit |
| 2 | `feat(booking): add reusable BookingCTA button and click tracking` | Task 1 |
| 3 | `fix(nav): stop nav links being cut off on narrow phones` | Answer B (before the booking row) |
| 4 | `feat(booking): add Book buttons to nav, homepage hero and CTA boxes` | Task 2 |
| 5 | `feat(booking): add Check Availability button to the wedding DJ page` | Task 3 |
| 6 | `feat(seo): link the homepage areas copy to the wedding DJ Manchester page` | Task 4 |
| 7 | `feat(seo): describe DJ + photo booth together and link to the wedding page` | Task 5 |
| 8 | `feat(analytics): track booking_start and count only real booking leads` | Task 6 |
| 9 | `docs: record changes made and Phase 3 verification` | This section |

To undo any single change later: `git revert <commit>`.

## Every file changed

| File | What changed |
|---|---|
| `src/lib/site.js` | **+** `BOOKING_PATH = '/book'` (the one place the booking URL lives) |
| `src/lib/gtag.js` | `trackEvent` wrapped in `try/catch`. **+** `trackBookingCTAClick(location)`, **+** `trackBookingStart(params)`. `trackFormSubmission(formName, extra = {})` now accepts optional extra params |
| `src/component/BookingCTA.jsx` | **New.** The reusable booking button (see below) |
| `src/app/globals.css` | Nav text/gap smaller below 400px; gap tighter below 360px |
| `src/component/NavBar.jsx` | "Book Now" in the link row from 1024px up; a slim "Book Now" row below the links under 1024px |
| `src/component/Hero.jsx` | "Book Your Event" between the tagline and video; tagline `mb-12` → `mb-6` |
| `src/component/CTA.jsx` | "Book Online" beside "Get Your Free Quote" (homepage + wedding page box) |
| `src/component/ServicesContent.jsx` | "Book Online" beside "Get Started Today"; one new sentence + link (Task 5) |
| `src/component/LocationContent.jsx` | "Check Availability" as the first hero button on the wedding page |
| `src/component/LocalAreas.jsx` | One new sentence + link on the homepage (Task 4) |
| `src/component/Services.jsx` | `note` on the Photo Booths card |
| `src/component/BookingForm.jsx` | **Analytics only:** `booking_start` + `useRef` guard; existing `generate_lead` now requires `data.id` and adds `package_tier` |

**Not touched** (checked with `git diff origin/main` → empty): every `page.js` (metadata/JSON-LD), `layout.js`, `sitemap.js`, `robots.js`, `locations.js`, `booking-options.js`, the API routes, `auth.js`, `db.js`, `email.js`, `SiteChrome.jsx`, `AddEnquiryModal.jsx`, `AdminDashboard.jsx`, `AdminLogin.jsx`, `/admin`, `migrations/`, and the Stripe constant.

## How the new button works (props explained)

`<BookingCTA label="Book Now" location="navbar_mobile" variant="nav" />`

| Prop | What you pass | What it does |
|---|---|---|
| `label` | Text, e.g. `"Check Availability"` | The words on the button |
| `location` | A short name, e.g. `"homepage_hero"` | Not shown on the page. It's sent to GA4 as `cta_location` so you can see **which** button was clicked |
| `variant` | `'primary'` (default), `'light'` or `'nav'` | Picks one of the site's existing button looks: gradient pill, white pill, or compact nav pill |

What happens on click:
1. `onClick` calls `trackBookingCTAClick(location)`.
2. That calls `trackEvent('booking_cta_click', { cta_location })`, which pushes it to GA4. If GA is blocked or broken, the `try/catch` swallows the error.
3. `next/link` then takes the visitor to `BOOKING_PATH` (`/book`) without a full page reload.

| Button | Text | `cta_location` sent |
|---|---|---|
| Nav, desktop (1024px+) | Book Now | `navbar_desktop` |
| Nav, phones/tablets (<1024px) | Book Now | `navbar_mobile` |
| Homepage hero | Book Your Event | `homepage_hero` |
| Homepage bottom box | Book Online | `homepage_cta_book` |
| Wedding page hero | Check Availability | `wedding-dj-manchester_hero` |
| Wedding page bottom box | Book Online | `wedding-dj-manchester_page_book` |
| Services page box | Book Online | `services_page_book` |

**One deviation from the plan:** at 768–1023px (tablets) the desktop "Book Now" pill was squashed onto two lines, so the nav grew. The pill now joins the link row only from **1024px**, and tablets get the slim row like phones. Desktop (1024px+) nav height: 61px before → 62px after.

## Copy changes: BEFORE / AFTER

**1. Homepage, "Serving Greater Manchester & Beyond" closing paragraph** (`LocalAreas.jsx`)

| BEFORE | AFTER |
|---|---|
| …We've got you covered across all of Greater Manchester, Cheshire, and Lancashire with 20 years of experience delivering unforgettable events. | …We've got you covered across all of Greater Manchester, Cheshire, and Lancashire with 20 years of experience delivering unforgettable events. Getting married in the city? Take a look at our **[wedding DJ hire in Manchester](/wedding-dj-manchester)**, with live sax, photo booths and dancefloors available alongside. |

**2. /services, "Serving Greater Manchester & Beyond" intro** (`ServicesContent.jsx`)

| BEFORE | AFTER |
|---|---|
| …available throughout Manchester, Salford, Bury, Heywood, Middleton, Prestwich, Oldham, Worsley, and across Greater Manchester, Cheshire, and Lancashire. | …available throughout Manchester, Salford, Bury, Heywood, Middleton, Prestwich, Oldham, Worsley, and across Greater Manchester, Cheshire, and Lancashire. Planning a wedding? You can book your DJ and photo booth together. See **[what we provide for Manchester weddings](/wedding-dj-manchester)**. |

**3. Homepage "Photo Booths & Dancefloors" card, expanded panel** (`Services.jsx`)

| BEFORE | AFTER |
|---|---|
| *(no note)* | Photo booths can be added to any DJ booking. |

**4. New button labels:** "Book Now", "Book Your Event", "Book Online", "Check Availability" (no existing text was changed).

**5. Wedding DJ Manchester page:** **no wording changes.**

## Tracking: what is sent

| Event | When | Params |
|---|---|---|
| `booking_cta_click` (new) | Click on any Book button | `cta_location` |
| `booking_start` (new) | First time a visitor passes step 1 of `/book` (once per visit) | `event_type` (e.g. `Wedding`), `step: 1` |
| `generate_lead` (existing, tightened) | Only when the API returns an enquiry `id` | `event_category: 'form'`, `event_label: 'booking_form'`, **new** `package_tier` (e.g. `evening-wedding-dj`) |

No names, emails, phone numbers, venues or free text are sent.

**Your extra checks:**
1. **Contact form `generate_lead`.** It sends `event_category: 'form'` and **`event_label: 'contact_form'`**. The booking form sends `event_label: 'booking_form'`. So the two **can** be told apart. The value lives in a parameter called `event_label` (not `form_name`), and you'll need to register `event_label` as a custom dimension in GA4 to see it in reports (manual step 3 below). The contact form was **not changed**, as you instructed.
2. **API route** (`src/app/api/enquiries/route.js`):
   - Honeypot hit (lines 55-57): `return NextResponse.json({ ok: true }, { status: 200 })`, with **no `id`**.
   - Real save (lines 130-133): `return NextResponse.json({ ok: true, id: rows[0].id }, { status: 201 })`. The `id` comes from Postgres `RETURNING id`.
   - Validation errors return 400 and DB errors return 500 (`response.ok` is false).
   - Checked live against the built site: honeypot POST → `{"ok":true} [200]`; missing name → `{"error":"Please tell us your name."} [400]`.

   So `data.id` is a reliable "real lead" signal.

## Phase 3 verification

**Lint and build:** `npm run lint` ✅ no warnings. `npm run build` ✅ 16/16 pages.

**SEO baseline comparison.** I re-extracted the rendered HTML of all 8 public pages and diffed it against the Phase 1 baseline.

| Checked | Result |
|---|---|
| Titles, meta descriptions, robots | ✅ identical on all 8 pages |
| Canonicals | ✅ identical |
| og:title / og:url / og:image / twitter:image | ✅ identical (`socials.png` everywhere) |
| H1 / H2 / H3 | ✅ identical (button text is not a heading) |
| JSON-LD (content fingerprint of every block) | ✅ identical |
| `sitemap.xml` | ✅ byte-identical |
| `robots.txt` | ✅ unchanged |
| Only difference | New `<a>` links: the Book buttons, plus the 2 new contextual links to `/wedding-dj-manchester` |

**Behaviour checks** (production build, headless Chromium):

| Check | Result |
|---|---|
| Desktop nav "Book Now" → `/book` | ✅ `booking_cta_click {cta_location: navbar_desktop}` |
| Phone nav "Book Now" → `/book` | ✅ `navbar_mobile` |
| Hero, both CTA boxes, wedding hero, services box | ✅ all reach `/book` with the right `cta_location` |
| Existing "Get Your Free Quote" | ✅ still goes to `/contact` |
| `/book` page load | ✅ no events fired |
| Continue with empty step 1 | ✅ error shown, no `booking_start` |
| Step 1 → 2 → Back → 2 | ✅ `booking_start` fired **once** (`event_type: Wedding, step: 1`) |
| Submit with invalid name/email | ✅ error shown, no lead |
| API 201 + id (real save) | ✅ confirmation + **one** `generate_lead` |
| API 200 without id (honeypot) | ✅ confirmation (as before), **no** `generate_lead` |
| API 500 / network failure | ✅ error shown, no `generate_lead` |
| GA script blocked (ad blocker) | ✅ form and buttons work normally |
| `window.gtag` throwing errors | ✅ nav click and full booking still work, no page errors |
| Nav hide/show on scroll, 375px + 1280px | ✅ hides on scroll down, returns on scroll up (booking row moves with it) |
| `/admin` | ✅ no GA script, no `dataLayer`, no nav, no Book links |
| Admin API unauthenticated GET | unchanged (405) |

**Nav overflow fix (answer B).** No nav link goes off-screen at any width or on any page.

| Width | Before | After |
|---|---|---|
| 320px | "Home"/"Contact" clipped | ✅ all links visible |
| 375px | clipped, page scrolled sideways (392px) | ✅ fits, no sideways scroll |
| 390px | clipped, page scrolled sideways (399px) | ✅ fits, no sideways scroll |
| 412/414px | fits | ✅ fits |
| 1024px+ | fits | ✅ unchanged layout |

**Not caused by the nav, so left alone (pre-existing):**
- **Homepage at 320px** still scrolls sideways (355px). The cause is the letter-by-letter animated heading ("Trusted By The Best", `Services.jsx`), whose non-breaking spaces stop it wrapping on very small screens.
- **`/contact`** is 4px too wide at all phone widths. The cause is one of the contact cards (`ContactContent.jsx`).
- **400–411px widths** (rare) are just above your "below 400px" limit, so they still use the old sizes. That means a 4px clip at exactly 400px.

All three are small separate fixes I can do if you want.

**Page weight:** homepage First Load JS 153 kB → 157 kB (the shared nav button + icon). `/book` is unchanged at 148 kB.

## Manual steps for you

1. **Test the Vercel preview on your phone.** Open the PR's preview link and:
   - tap "Book Now" in the nav;
   - try the hero button and the wedding page "Check Availability";
   - scroll down/up and watch the nav hide/show;
   - do **not** submit a real enquiry on the preview unless you want it in the live database (the preview may share production env vars).
2. **GA4 DebugView** (Admin → DebugView). Install the "Google Analytics Debugger" Chrome extension and switch it on. Visit the preview, click a Book button, pass step 1 and submit a test enquiry. You should see `booking_cta_click`, `booking_start` and `generate_lead`.
3. **Register custom dimensions** (Admin → Custom definitions → Create custom dimension, scope **Event**):
   - `cta_location`
   - `event_type`
   - `package_tier`
   - `event_label`, if it isn't registered already. This is what separates `booking_form` from `contact_form` leads.
   - `step` (optional)
4. **Key events** (Admin → Events, or Key events). Make sure `generate_lead` is marked as a key event. It may be already. Optionally mark `booking_start` too, as a softer "intent" signal. Leave `booking_cta_click` as a normal event.
5. After merging, **re-check GA4 the next day.** Custom-dimension data only appears for events sent after the dimension is created, and standard reports take 24–48h.
6. **Optional:** in Search Console, request indexing for `/book` once it's live and linked. Nothing else is needed for SEO.

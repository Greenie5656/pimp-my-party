# SITE_AUDIT.md

Read-only reconnaissance of the `pimp-my-party` repository.
No code files were modified, created or deleted; nothing was installed.

- Repo: `Greenie5656/pimp-my-party`
- Branch audited: `claude/repository-audit-report-yyx6qw` (identical tree to `main` at `4037de8`)
- Last commit: `4037de8` — Merge pull request #10 (SEO location pages), 4 Aug 2026
- Framework: Next.js 15.5.7, App Router, JavaScript (no TypeScript)
- Production URL used throughout the code: `https://pimpmyparty.co.uk`

---

## 1. STRUCTURE

### Full source tree

```
src/
├── app/
│   ├── globals.css
│   ├── layout.js                    ← the ONLY layout.js in the project
│   ├── page.js                      → /
│   ├── robots.js                    → /robots.txt   (generated)
│   ├── sitemap.js                   → /sitemap.xml  (generated)
│   ├── about/page.js                → /about
│   ├── brochure/page.js             → /brochure
│   ├── contact/page.js              → /contact
│   ├── gallery/page.js              → /gallery
│   ├── services/page.js             → /services
│   └── wedding-dj-manchester/page.js → /wedding-dj-manchester
├── component/                       ← note: SINGULAR "component", not "components"
│   ├── AboutContent.jsx      (247 lines)
│   ├── Brochure.jsx          (128)
│   ├── CTA.jsx               (150)
│   ├── ContactContent.jsx    (330)
│   ├── Footer.jsx            (174)
│   ├── GalleryContent.jsx    (225)
│   ├── Header.jsx             (37)
│   ├── Hero.jsx              (222)
│   ├── LocalAreas.jsx         (82)
│   ├── LocationContent.jsx   (294)
│   ├── NavBar.jsx            (157)
│   ├── Services.jsx          (262)
│   └── ServicesContent.jsx   (376)
└── lib/
    ├── gtag.js               (63)
    └── locations.js          (178)
```

### Every route

| Route | File | Rendering | Content component |
|---|---|---|---|
| `/` | `src/app/page.js` | Static (server) | `Hero`, `Services`, `LocalAreas`, `CTA` |
| `/about` | `src/app/about/page.js` | Static (server) | `AboutContent` |
| `/services` | `src/app/services/page.js` | Static (server) | `ServicesContent` |
| `/gallery` | `src/app/gallery/page.js` | Static (server) | `GalleryContent` |
| `/brochure` | `src/app/brochure/page.js` | Static (server) | `Brochure` |
| `/contact` | `src/app/contact/page.js` | Static (server) | `ContactContent` |
| `/wedding-dj-manchester` | `src/app/wedding-dj-manchester/page.js` | Static (server) | `LocationContent` (data-driven) |
| `/sitemap.xml` | `src/app/sitemap.js` | Generated | — |
| `/robots.txt` | `src/app/robots.js` | Generated | — |

**What does NOT exist:**

- No `src/app/api/` directory. **There are zero API routes / route handlers in this project.**
- No `middleware.js` / `middleware.ts` anywhere.
- No `not-found.js`, `error.js`, `loading.js`, `template.js`, `global-error.js`.
- No route groups `(...)`, no dynamic segments `[...]`, no parallel/intercepting routes.
- No `src/app/book`, `src/app/admin`, or anything resembling them.
- No `public/sitemap.xml` or `public/robots.txt` static files (both are code-generated).

### Layouts — where they sit and what they wrap

There is exactly **one** layout: `src/app/layout.js` (the root layout). It wraps **every route in the site**. Nothing has a nested layout.

Structure it renders (`src/app/layout.js:265-312`):

```jsx
<html lang="en">
  <head>
    {/* LocalBusiness JSON-LD */}
    {/* google-site-verification meta */}
    {/* geo.*, ICBM, contact, business:contact_data:*, theme-color metas */}
  </head>
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <Header />      {/* purple bar + centred logo  */}
    <NavBar />      {/* sticky nav, 6 links       */}
    {children}      {/* <-- every page renders here */}
    <Footer />      {/* socials, area links, credit */}
    <GoogleAnalytics gaId="G-J22NSQHKQ2" />
  </body>
</html>
```

Consequence worth knowing: `Header`, `NavBar` and `Footer` render on **every** route unconditionally — there is no mechanism today to hide site chrome from any page.

Every page file returns a bare `<main>` wrapper containing its content component (and, on all pages except `/`, one or more inline JSON-LD `<script>` tags).

### Client vs server components

**All 13 files in `src/component/` are client components.** Every one begins with a `'use client'` / `"use client"` directive on line 1.

| Component | Directive | Why it needs to be a client component |
|---|---|---|
| `AboutContent.jsx` | `'use client'` | framer-motion, gtag click handlers |
| `Brochure.jsx` | `"use client"` | framer-motion, gtag click handler |
| `CTA.jsx` | `'use client'` | framer-motion, gtag click handler |
| `ContactContent.jsx` | `'use client'` | `useState`, form submit, framer-motion |
| `Footer.jsx` | `"use client"` | framer-motion, gtag click handler, `new Date()` |
| `GalleryContent.jsx` | `'use client'` | `useState` lightbox, `AnimatePresence` |
| `Header.jsx` | `"use client"` | framer-motion only |
| `Hero.jsx` | `"use client"` | `useState`/`useEffect`, framer-motion, iframe click |
| `LocalAreas.jsx` | `'use client'` | framer-motion |
| `LocationContent.jsx` | `'use client'` | framer-motion, gtag click handlers |
| `NavBar.jsx` | `"use client"` | `usePathname`, scroll listener, framer-motion |
| `Services.jsx` | `"use client"` | framer-motion |
| `ServicesContent.jsx` | `'use client'` | framer-motion, gtag click handler |

**Server components:** all 7 `page.js` files, `layout.js`, `sitemap.js`, `robots.js`. They own metadata and JSON-LD; the client components own all rendering and interactivity.

`src/lib/gtag.js` and `src/lib/locations.js` carry no directive — `locations.js` is imported by both server files (`sitemap.js`, the location page) and a client file (`Footer.jsx`), so it works in both environments. `gtag.js` is imported by client components only.

Quote style is inconsistent between files (`'use client'` vs `"use client"`), roughly split along which components were written when.

---

## 2. STYLING SYSTEM

### Tailwind version and configuration

**Tailwind CSS v4.1.13** (declared as `^4`, resolved in `package-lock.json`).

**There is no `tailwind.config.js` / `.ts` / `.mjs` anywhere in the repo.** Configuration is entirely CSS-first via a `@theme` block in `src/app/globals.css`.

The only build wiring is `postcss.config.mjs`:

```js
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

### `src/app/globals.css` — complete file

This is the whole global stylesheet. There are no other CSS files in the project.

```css
@import "tailwindcss";

/* Fixed dark site */
:root {
  --background: #060606; /* black */
  --foreground: #ffffff; /* white */
}

@theme {
  /* Define colors that Tailwind can use */
  --color-background: #060606;
  --color-foreground: #ffffff;
  --color-heliotrope: #d372ff;
  --color-tekhelet: #462278;
  --color-fuchsia: #fb12fc;
}

/* Apply globally (prevents white flashes on mobile) */
html, body { height: 100%; }
html { background: #060606; color-scheme: dark; }
body { @apply bg-background text-foreground font-sans; }

/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

@media (max-width: 360px) {
  nav ul {
    gap: 0.5rem !important; /* Even tighter on very small phones */
  }
  
  nav span {
    font-size: 0.75rem !important; /* Smaller text on tiny screens */
  }
}
```

### Colour tokens

Five custom tokens are defined in `@theme`. In Tailwind v4 a `--color-x` token generates `bg-x`, `text-x`, `border-x`, `from-x`, `to-x`, `via-x`, `ring-x`, `fill-x` etc., and supports opacity modifiers (`border-heliotrope/30`).

| Token (CSS variable) | Hex | Class name used in code | Usage count in `src/` |
|---|---|---|---|
| `--color-heliotrope` | `#d372ff` (light purple) | `heliotrope` → `text-heliotrope`, `border-heliotrope/30`, `from-heliotrope`, `bg-heliotrope` | 48 occurrences |
| `--color-fuchsia` | `#fb12fc` (hot magenta) | `fuchsia` → `from-fuchsia`, `text-fuchsia`, `to-fuchsia`, `border-fuchsia` | 33 occurrences |
| `--color-tekhelet` | `#462278` (deep purple) | `tekhelet` → `bg-tekhelet`, `from-tekhelet`, `to-tekhelet`, `border-tekhelet` | 9 occurrences |
| `--color-background` | `#060606` (near-black) | `bg-background` | 1 (in `globals.css` body rule) |
| `--color-foreground` | `#ffffff` | `text-foreground` | 1 (in `globals.css` body rule) |

There are also two plain (non-`@theme`) custom properties on `:root` — `--background: #060606` and `--foreground: #ffffff`. These are **not** wired to Tailwind classes and are not referenced by any component; they duplicate the `@theme` values.

### The two-palette split (important)

The site does **not** use one palette. Two coexist:

1. **Brand tokens** (`heliotrope` / `fuchsia` / `tekhelet`) — used by `Header`, `NavBar`, `Footer`, `Hero`, `Services`, `Brochure`.
2. **Stock Tailwind `purple-*` / `pink-*` scale** — used by `AboutContent`, `ContactContent`, `GalleryContent`, `ServicesContent`, `LocalAreas`, `CTA`, `LocationContent`.

Most-used stock colours: `text-purple-400` (18), `border-purple-500` (13), `from-purple-600` (10), `text-pink-400` (9), `from-purple-400` (9). The canonical stock gradient pairing across pages is `from-purple-600 to-pink-600` (buttons/cards) and `from-purple-400 via-pink-400 to-purple-400` (headings).

The newest page (`LocationContent.jsx`, added Aug 2026) uses the **stock purple/pink palette**, and its comment at line 12-13 states this is deliberate: *"Styling and animation deliberately mirror the existing dark pages (gallery / contact) so these pages sit inside the current design."*

### Fonts

Loaded via `next/font/google` in `src/app/layout.js:1-16`:

```js
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

- **Families:** Geist (sans) and Geist Mono.
- **Weights:** none specified. Both are Google *variable* fonts, so `next/font` loads the full variable weight axis — every `font-light` … `font-black` class works.
- **Subsets:** `latin` only.
- **Applied:** `<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>` — this sets the CSS variables and `antialiased`. The actual family comes from `body { @apply ... font-sans; }` in `globals.css`.
- Note: `--font-geist-mono` is defined but no component uses `font-mono`. Geist Mono is loaded and unused.
- No `@theme` override maps `--font-sans` to `--font-geist-sans`, so `font-sans` resolves to Tailwind v4's **default** sans stack (`ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji"…`), not Geist. The Geist variables are present on `<body>` but nothing consumes them.

### Global CSS classes and custom utilities

Only one custom class exists: **`.scrollbar-hide`** (defined in `globals.css`, hides scrollbars cross-browser). It is **not used by any component** — grep finds zero references outside its definition.

One global element override: a `@media (max-width: 360px)` block that tightens `nav ul` gap and `nav span` font-size with `!important`. This targets the `NavBar` by element selector, not by class.

### Repeated patterns (these are the de facto design system)

**Page shell** — used by `AboutContent`, `ContactContent`, `GalleryContent`, `LocationContent`:
```jsx
<div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
```

**Section wrapper:**
```jsx
<section className="py-12 px-4">      {/* or py-16 / py-20 */}
  <div className="max-w-7xl mx-auto"> {/* or max-w-4xl for text/forms */}
```

**Gradient page heading + animated underline** (appears verbatim on 4 pages):
```jsx
<h1 className="text-5xl md:text-6xl font-bold mb-4 pb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
  Our Gallery
</h1>
<motion.div 
  className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto mb-6"
  initial={{ scaleX: 0 }}
  animate={{ scaleX: 1 }}
  transition={{ duration: 0.8, delay: 0.3 }}
/>
```
(`LocationContent` uses `text-4xl md:text-6xl` for the h1; the rest use `text-5xl md:text-6xl`.)

**Glass card** — the single most reused card pattern (`LocalAreas`, `LocationContent` ×3, `Brochure`):
```jsx
<div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
```

**Large panel card** (`AboutContent`, `ContactContent`):
```jsx
<div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50 relative overflow-hidden">
```

**Numbered process step** (`ServicesContent`, `LocationContent`) — 4-column grid, gradient-clipped number:
```jsx
<div className="text-4xl font-bold text-transparent bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text mb-3">
  {step.number}
</div>
```

### Spacing, border-radius and shadow conventions

**Vertical section padding:** `py-16` (9×) and `py-12` (8×) are the standard; `py-20` (5×) for hero/CTA sections; `py-8` (4×) for tight sections. Horizontal is almost always `px-4`.

**Container widths:** `max-w-7xl` (10×) for grids, `max-w-4xl` (10×) for text and the contact form, `max-w-3xl` (5×) for prose, `max-w-6xl` (3×) on the About page. Always with `mx-auto`.

**Grid gaps:** `gap-6` and `gap-8` for cards, `gap-4` for image grids, `gap-3` for pills.

**Border radius** (frequency across `src/`):

| Class | Count | Used for |
|---|---|---|
| `rounded-full` | 23 | pills, buttons, social circles, icon badges |
| `rounded-xl` | 16 | glass cards, form inputs, submit button |
| `rounded-2xl` | 8 | contact method tiles, stat cards, brochure cards |
| `rounded-3xl` | 7 | large panels, big CTA blocks, hero video frame |
| `rounded-lg` | 6 | service cards, brand tiles |
| `rounded-md` | 1 | inner white logo backing |

**Shadows** — used sparingly and only on the light-background `/services` page plus a few CTAs: `shadow-lg` (4), `shadow-xl` (4), `shadow-2xl` (4), plus one coloured `hover:shadow-purple-500/50` and one `shadow-md`. The dark pages use **borders and gradients rather than shadows** for elevation.

**Border convention:** always low-alpha brand colour — `border-purple-500/20` (rest) → `/50` (hover), or `border-heliotrope/30` → `border-fuchsia` on the brand-token pages. Borders are `border` (1px) except icon circles which use `border-2`.

**Transitions:** `transition-all duration-300` / `transition-colors duration-300` are the near-universal defaults; `duration-500` for glow overlays.

---

## 3. ANIMATION

**Library:** `framer-motion` v12.23.22. Used in **12 of 13 components** (all except… none — all 13 import it; `Header.jsx` imports it too). `AnimatePresence` is used in exactly one place (`GalleryContent.jsx` lightbox).

### Shared / reusable variants — where they live

**There is no shared animation module.** No `src/lib/animations.js`, no `variants.js`. Every set of variants is redeclared inside the component that uses it. The same three shapes recur nearly verbatim across four files:

**`containerVariants` — stagger parent** (`NavBar.jsx:81-90`, `Footer.jsx:31-39`, `Services.jsx:59-67`, `ServicesContent.jsx:20-28`):

```js
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,   // 0.15 in Footer, 0.2 in ServicesContent
      delayChildren: 0.3,     // NavBar only
    },
  },
};
```

**`itemVariants` — staggered child** (`NavBar.jsx:92-102`, `Footer.jsx:41-50`, `Services.jsx:69-79`, `ServicesContent.jsx:30-37`):

```js
const itemVariants = {
  hidden: { opacity: 0, y: 20 },     // y: -20 in NavBar (drops down from above)
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,                 // 0.6 in ServicesContent
      ease: "easeOut",
    },
  },
};
```

**`cardVariants` — with a named hover state** (`ServicesContent.jsx:39-57`) — the only variant object that includes a `hover` key, triggered by `whileHover="hover"`:

```js
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};
```

**`brandVariants`** (`Services.jsx:81-90`):

```js
const brandVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};
```

**`titleVariants` + `letterVariants` — per-letter text reveal** (`Services.jsx:93-120`). This is the most distinctive animation in the codebase:

```js
const titleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const splitText = (text) => {
  return text.split("").map((char, index) => (
    <motion.span key={index} variants={letterVariants}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
};
```
Used as `{splitText("Our Services")}` inside a `motion.h2` carrying `variants={titleVariants}`.

### Scroll-triggered pattern

The dominant pattern across the whole site — appears **~60 times**. Always `whileInView` + `viewport={{ once: true }}` (never re-fires on scroll back up):

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

Variations: `y: 30` / `y: 50` for larger blocks, `scale: 0.9 → 1` for cards and images, `x: -20 → 0` for list items. Grids stagger their children with `transition={{ delay: index * 0.05 }}` (or `* 0.08`, `* 0.1`) rather than variants, in about half the cases.

`viewport={{ once: true, amount: 0.2 }}` (and `amount: 0.1`) is used on the two large grids in `Services.jsx` to fire earlier.

### Page-entry pattern

Above-the-fold content uses `initial` + `animate` (fires immediately on mount) rather than `whileInView`, with a hand-tuned delay ladder:

```jsx
initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}              // h1
transition={{ duration: 0.8, delay: 0.3 }}   // underline
transition={{ duration: 0.6, delay: 0.4 }}   // main card
transition={{ duration: 0.5, delay: 0.5 }}   // first field
transition={{ duration: 0.5, delay: 0.6 }}   // second field  ... +0.1 per field
```

**There are no page transitions.** No `AnimatePresence` at the layout level, no route-change animation — each page simply plays its own entry animation on mount.

### Hover states

| Pattern | Where |
|---|---|
| `whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}` | every link-button (CTA, LocationContent ×3, AboutContent, ServicesContent) |
| `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}` | the contact form submit button |
| `whileHover={{ y: -8 }}` (lift) | service cards, social icons, stat cards |
| `whileHover={{ y: -8, scale: 1.03 }}` | About stat cards |
| `whileHover={{ x: 8 }}` / `{{ x: 4 }}` | list items shifting right |
| `whileHover={{ rotate: [0, -10, 10, 0] }}` | contact method tile icons (wiggle) |
| `whileHover={{ scale: 1.1, rotate: 90 }}` | lightbox close button |
| `whileHover={{ width: "100%" }}` from `initial={{ width: 0 }}` | nav underline, service card bottom accent |
| `group` + `group-hover:` CSS | glow overlays on nearly every card |

### Unusual / distinctive effects worth knowing about

1. **Glimmer sweep** — a light band that slides across a card on a loop. Appears in `ContactContent.jsx:95-99`, `AboutContent.jsx:75-79`, `ServicesContent.jsx:185-196`:
   ```jsx
   <motion.div
     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
     animate={{ x: ['-200%', '200%'] }}
     transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
   />
   ```
   Requires the parent to have `relative overflow-hidden`, and the real content to sit in a sibling `<div className="relative z-10">`.

2. **Breathing background orbs** — large blurred circles that pulse forever (`Hero.jsx:21-45`, `CTA.jsx:26-50`):
   ```jsx
   <motion.div
     className="absolute top-20 left-10 w-96 h-96 bg-heliotrope/30 rounded-full blur-3xl"
     animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
     transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
   />
   ```

3. **Animated `background` property** — `AboutContent.jsx:37-47` animates a `radial-gradient` string through three keyframes over 8s. Also in the About CTA block.

4. **Floating particles** — `Hero.jsx:201-219` maps `[...Array(5)]` into absolutely-positioned dots that drift up and fade, each with `delay: i * 0.5` and `duration: 3 + i`.

5. **Spring logo entrance** — `Header.jsx:10-25`, the only spring in the codebase, plus a hover wiggle:
   ```jsx
   initial={{ scale: 0, rotate: -180 }}
   animate={{ scale: 1, rotate: 0 }}
   transition={{ type: "spring", stiffness: 260, damping: 20, duration: 1 }}
   whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
   ```

6. **`layoutId="activeIndicator"`** — `NavBar.jsx:136`. The active-page underline uses a shared layout ID so it slides between nav items on route change. This is the only `layoutId` in the project; introducing a second element with the same ID elsewhere would break it.

7. **3D lightbox entrance** — `GalleryContent.jsx:192-195` uses `rotateY: -15 → 0 → 15` on enter/exit inside `AnimatePresence`.

8. **Scroll-direction-aware nav** — `NavBar.jsx:23-79` is a hand-written `requestAnimationFrame`-throttled scroll listener with a 10px threshold that hides the nav on scroll-down and reveals it on scroll-up, applied via a Tailwind class swap (`translate-y-0` / `-translate-y-full`), **not** via framer-motion.

---

## 4. REUSABLE UI

### What exists that could be reused

There is **no UI component library, no `Button.jsx`, no `Input.jsx`, no `Card.jsx`, no `Modal.jsx`, no `Section.jsx`.** Every button, input and card is written inline in the page-level component that uses it. The only extraction of any kind in the whole codebase is a `btnClass` string constant in `Brochure.jsx`.

Reusable *components* (importable as-is):

| Component | Import path | Props | Notes |
|---|---|---|---|
| `CTA` | `@/component/CTA` | `ctaLocation` (string, default `'homepage_cta'`) | The one genuinely parameterised, reusable section. Full-width gradient CTA block with icon, heading, button and 3 trust badges. Already reused by `LocationContent.jsx:291`. `ctaLocation` only labels the GA4 event. |
| `LocationContent` | `@/component/LocationContent` | `location` (object from `src/lib/locations.js`) | Renders a whole location landing page from data. |
| `Header` / `NavBar` / `Footer` | — | none | Already global via layout; not reusable per-page. |

Everything else (`Hero`, `Services`, `LocalAreas`, `AboutContent`, `GalleryContent`, `ServicesContent`, `Brochure`, `ContactContent`) takes **no props** and has its data hard-coded inside it.

### Buttons — the actual code

There are three distinct button treatments in use.

**(a) The only extracted button class in the codebase** — `src/component/Brochure.jsx:26-43`. Note it's built as an array and joined, and uses the **brand tokens** with black text:

```jsx
const btnClass = [
  "mt-auto",
  "inline-flex",
  "items-center",
  "justify-center",
  "gap-2",
  "bg-gradient-to-r",
  "from-heliotrope",
  "to-fuchsia",
  "text-black",
  "font-semibold",
  "py-3",
  "px-6",
  "rounded-xl",
  "transition-opacity",
  "duration-300",
  "hover:opacity-90",
].join(" ");

// used as:
<a
  href={brochure.file}
  download={brochure.filename}
  onClick={() => trackBrochureDownload(brochure.title)}
  className={btnClass}
>
  <Download size={18} />
  Download PDF
</a>
```

**(b) The primary pill link-button** — the most-copied button on the site (`CTA.jsx:104-122`). White on gradient, `rounded-full`, with an arrow that nudges forever:

```jsx
<motion.a
  href="/contact"
  onClick={() => trackCTAClick('get_free_quote', ctaLocation)}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 group"
>
  <span>Get Your Free Quote</span>
  <motion.div
    animate={{ x: [0, 5, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </motion.div>
</motion.a>
```

Its gradient-filled sibling, used for the primary action on location pages (`LocationContent.jsx:46-55`):

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

And the secondary/ghost variant (`LocationContent.jsx:56-67`):

```jsx
className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-purple-500/30 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 hover:border-purple-500/60"
```

**(c) The form submit button** — the only `<button>` with loading/success state, `src/component/ContactContent.jsx:196-220`:

```jsx
<motion.button
  type="submit"
  disabled={isSubmitting || submitted}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
    submitted ? 'bg-green-600' : ''
  }`}
>
  {isSubmitting ? (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <Send size={20} />
    </motion.div>
  ) : submitted ? (
    <>✓ Message Sent!</>
  ) : (
    <>
      <Send size={20} />
      Send Message
    </>
  )}
</motion.button>
```

### Form input — the actual code

Every input on the site follows this exact shape (`src/component/ContactContent.jsx:104-123`). This is the full wrapper + label + input, including the entry animation:

```jsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, delay: 0.5 }}
>
  <label htmlFor="name" className="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
    <User size={20} className="text-purple-400" />
    Your Name
  </label>
  <input
    type="text"
    id="name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    required
    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
    placeholder="John Doe"
  />
</motion.div>
```

The textarea variant is identical plus `rows="5"` and `resize-none` (`ContactContent.jsx:178-187`):

```jsx
<textarea
  id="message"
  name="message"
  value={formData.message}
  onChange={handleChange}
  required
  rows="5"
  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300 resize-none"
  placeholder="Tell us about your event..."
/>
```

Field accent colours alternate deliberately: name = `purple-500`, email = `pink-500`, phone = `purple-500`, message = `pink-500` (both the icon colour and the focus ring).

The form itself is `<form onSubmit={handleSubmit} className="space-y-6">` inside the glass panel + glimmer wrapper described in §2.

### Modal / overlay

The only modal is the gallery lightbox (`GalleryContent.jsx:137-223`). It is not extracted. Its shape:

```jsx
<AnimatePresence>
  {selectedImage && (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={closeLightbox}
    >
      {/* close / prev / next buttons: bg-purple-600 hover:bg-purple-700 rounded-full p-2|p-3 */}
      {/* content: onClick={(e) => e.stopPropagation()} */}
    </motion.div>
  )}
</AnimatePresence>
```

Note `z-50` — the same z-index as the sticky `NavBar`.

### Logo files

| File | Format | Intrinsic size | On disk | Where rendered |
|---|---|---|---|---|
| `/public/logo.png` | PNG RGBA | **2000 × 2000** | 254 KB | `Header.jsx:26-33` |
| `/public/FullLogo_resized.png` | PNG RGBA | **3317 × 541** | 174 KB | `Footer.jsx:163-169` ("Built by Lancashire Web Fixers") |
| `/public/socials.png` | PNG RGBA | **1200 × 630** | 1.0 MB | Not rendered in JSX — used as the OG/Twitter image URL and as the schema `image` |
| `/public/favicon.ico` | ICO (16+32) | — | 15 KB | via `metadata.icons` |
| `/public/favicon-16x16.png` | PNG | 16 × 16 | 503 B | via `metadata.icons` |
| `/public/favicon-32x32.png` | PNG | 32 × 32 | 1.2 KB | via `metadata.icons` |
| `/public/apple-touch-icon.png` | PNG | 180 × 180 | 15 KB | via `metadata.icons.apple` |
| `/public/globe.svg` | SVG | — | 1 KB | **Unused** — leftover from `create-next-app` |

How the main logo is rendered (`Header.jsx:26-33`) — note `width`/`height` of 300 with responsive classes doing the real sizing, and `priority`:

```jsx
<Image
  src="/logo.png"
  alt="Pimp My Party Logo"
  width={300}
  height={300}
  className="w-32 h-auto sm:w-40 md:w-48 lg:w-52 xl:w-56"
  priority
/>
```

Footer credit logo (`Footer.jsx:163-169`):

```jsx
<Image
  src="/FullLogo_resized.png"
  alt="Lancashire Web Fixers"
  width={140}
  height={35}
  className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
/>
```

Other assets: `public/brands/` (11 venue logos, mixed png/jpg/jpeg), `public/gallery/` (14 photos, mixed jpg/jpeg/png/webp), `public/brochure-full.pdf` (2.26 MB) and `public/brochure-party.pdf` (2.26 MB).

### Icon approach

**`lucide-react` v0.544.0, imported per-component as named React components. There is no inline SVG anywhere in `src/` and no icon files.**

Icons in use across the site: `Award, ArrowRight, Calendar, Camera, Check, CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, Disc3, Download, Facebook, FileText, Gift, Instagram, Lightbulb, Mail, MapPin, MessageCircle, MessageSquare, Music, Music2, Phone, Send, Sparkles, Star, User, Users, Utensils, X`.

Sizing convention is inconsistent by design context — either the `size` prop (`size={20}`, `size={32}`, `size={48}`) or Tailwind classes (`className="w-4 h-4"`, `"w-12 h-12"`, `"w-16 h-16"`). Decorative large icons commonly pass `strokeWidth={1.5}`.

`Gift` is imported in `ServicesContent.jsx:11` but never used.

---

## 5. EXISTING FORMS

**There is exactly one form on the entire site.**

### The contact form

- **Location:** `src/component/ContactContent.jsx` (lines 102-222), rendered at **`/contact`**.
- **Fields:** `name` (text, required), `email` (email, required), `phone` (tel, **optional**), `message` (textarea, required).
- **State:** a single `formData` object plus two booleans:
  ```js
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  ```
- **Change handler:** one generic handler keyed on `e.target.name`:
  ```js
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  ```

### How submission works

**Formspree, called directly from the browser.** There is no API route involved.

```js
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/mzzjggqj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success!
        trackFormSubmission('contact_form');
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        // Error handling
        alert('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Oops! Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
```

- **Endpoint:** `https://formspree.io/f/mzzjggqj` — hardcoded in client-side code, not an environment variable.
- **Analytics on success:** `trackFormSubmission('contact_form')` → GA4 `generate_lead` event.

### Validation approach

**Native HTML5 validation only.** `required` on name/email/message, `type="email"` on email, `type="tel"` on phone. There is:

- no validation library (no zod, yup, react-hook-form, formik — none are dependencies),
- no per-field error state or inline error messages,
- no custom validation function,
- no client-side sanitisation,
- no honeypot or captcha (Formspree handles spam server-side).

### Loading / success / error states

| State | Mechanism | User-visible result |
|---|---|---|
| Loading | `isSubmitting` | Button disabled; `Send` icon spins (`animate={{ rotate: 360 }}`, `repeat: Infinity`, 1s linear). No text change. |
| Success | `submitted` | Button shows `✓ Message Sent!`, fields cleared, button stays disabled, auto-resets after 5000ms. |
| Error | `alert()` | A **native browser `alert()`** — `'Oops! Something went wrong. Please try again.'`. Used for both non-ok responses and network exceptions. No in-page error UI. |

Note the success styling has a latent bug: the button applies `bg-green-600` conditionally but the base class list already contains `bg-gradient-to-r from-purple-600 to-pink-600`, and the gradient wins — the "sent" state never actually turns green.

### Other user input on the site

None. No newsletter signup, no search, no filters, no comment box. Every other conversion path is a direct link: `tel:+447359189070`, `https://wa.me/447359189070`, `mailto:hello@pimpmyparty.co.uk`, and the two PDF download links.

---

## 6. SEO

This is the most-developed part of the codebase. Three of the last five commits were SEO work.

### Metadata setup

**Split: a large root object in the layout, plus a per-page override on every single page.**

`src/app/layout.js:18-88` exports the base `metadata` object, containing:

- `title`, `description`, `keywords` (a 10-phrase local-SEO keyword string)
- `authors`, `creator`, `publisher` (all "Pimp My Party")
- **`metadataBase: new URL('https://pimpmyparty.co.uk')`**
- `alternates.canonical: '/'`
- `robots`: `index: true, follow: true`, plus a `googleBot` block with `max-video-preview: -1`, `max-image-preview: 'large'`, `max-snippet: -1`
- `icons`: favicon.ico + 16×16 + 32×32 + apple-touch-icon
- `openGraph`: `type: 'website'`, `locale: 'en_GB'`, `url`, `siteName`, title, description, and a 1200×630 image at the **absolute** URL `https://pimpmyparty.co.uk/socials.png`
- `twitter`: `card: 'summary_large_image'`, `site: '@pimpmypartymcr'`, title, description, absolute image URL
- `category: 'Entertainment'`, `classification: 'DJ Services, Event Entertainment, Wedding Services'`

**There is no `title.template`** — so a page's exported `title` fully replaces the root title rather than being appended to it.

Every page exports its own `metadata` with at minimum `title`, `description` and `alternates.canonical`. All pages except `/` also override `openGraph` (title/description/url) and `twitter` (title/description). Next.js merges these shallowly per top-level key: a page's `openGraph` object **replaces** the root `openGraph`, which is why the per-page OG blocks omit `images` — they inherit nothing, and fall back to `metadataBase` + the root only where the key is absent entirely. Two pages (`/about`, `/brochure`) hoist `title`/`description` into local `const`s and reuse them across all three blocks; the others repeat the strings literally.

### Canonical URLs

Every page declares an **absolute** canonical:

| Route | Canonical |
|---|---|
| `/` (layout) | `/` (relative, resolved against `metadataBase`) |
| `/` (page.js) | `https://pimpmyparty.co.uk` |
| `/about` | `https://pimpmyparty.co.uk/about` |
| `/services` | `https://pimpmyparty.co.uk/services` |
| `/gallery` | `https://pimpmyparty.co.uk/gallery` |
| `/brochure` | `https://pimpmyparty.co.uk/brochure` |
| `/contact` | `https://pimpmyparty.co.uk/contact` |
| `/wedding-dj-manchester` | `${SITE_URL}/${location.slug}` from `src/lib/locations.js` |

### Schema.org / JSON-LD

All structured data is injected with `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />`. There is no schema library.

| Type | File | Notes |
|---|---|---|
| **`LocalBusiness`** | `src/app/layout.js:92-263` (in `<head>`) | The big one — ~170 lines. Has a stable **`"@id": "https://pimpmyparty.co.uk/#localbusiness"`** so other pages reference this single entity instead of duplicating it. Includes telephone `+44-7359-189070`, email, url, PostalAddress (5 Durness Place, Heywood, Greater Manchester, OL10 3ST, GB), GeoCoordinates (53.5526, -2.1761), `priceRange: "££"`, `openingHours: "Mo-Su 09:00-21:00"`, an 11-entry `areaServed` array, a 6-entry `makesOffer` array, `sameAs` (Facebook + Instagram), and a 3-entry `hasOfferCatalog`. Renders on **every page of the site**. |
| **`BreadcrumbList`** | `about`, `brochure`, `contact`, `gallery`, `services`, `wedding-dj-manchester` page files | Two-level: Home → Page. Rendered inside `<main>`, not head. `/` has none. |
| **`ItemList`** of 6 `Service` | `src/app/services/page.js:20-99` | Each service names a `provider` as an inline `{"@type": "LocalBusiness", "name": ..., "url": ...}` — an inline duplicate, not an `@id` reference. |
| **`Service`** | `src/app/wedding-dj-manchester/page.js:45-59` | `serviceType: "Wedding DJ"`, and its `provider` **is** `{"@id": "${SITE_URL}/#localbusiness"}` — the correct pattern, with an explicit comment saying so. |
| **`FAQPage`** | `src/app/wedding-dj-manchester/page.js:62-73` | Generated from `location.faqs`. A code comment stresses these must match visibly-rendered Q&As, and `LocationContent` renders all FAQ answers **always visible, never collapsed**. |

### sitemap.xml and robots.txt

**Both are generated by Next.js route files. Neither exists as a static file in `/public`.**

`src/app/sitemap.js` — 6 hardcoded entries plus location pages spread from `publishedLocations`:

```js
import { publishedLocations } from '@/lib/locations';

export default function sitemap() {
  const baseUrl = 'https://pimpmyparty.co.uk';

  const locationPages = publishedLocations.map((location) => ({
    url: `${baseUrl}/${location.slug}`,
    lastModified: new Date(location.contentUpdated),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  // ... then the 6 static entries, then ...spread locationPages
}
```

Priorities as set: `/` 1.0, `/services` 0.9, `/about` 0.8, `/contact` 0.8, location pages 0.8, `/gallery` 0.7, `/brochure` 0.6. `changeFrequency` is `weekly` for `/` and `/gallery`, `monthly` for the rest.

`lastModified` dates for the six static pages are **hardcoded** (`'2025-06-01'`, `'2025-05-01'`, `'2025-05-15'`) with a `// TODO: Update these dates whenever content on the corresponding page is changed.` comment. Location pages derive theirs from `location.contentUpdated` in `locations.js` — the newer, self-maintaining pattern.

`src/app/robots.js` — complete file:

```js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://pimpmyparty.co.uk/sitemap.xml',
  };
}
```

**`/api/` is already disallowed** even though no API routes exist yet.

### Redirects

**There are none.** `next.config.mjs` contains no `redirects()`, no `rewrites()`, no `headers()`. No `vercel.json` exists.

### Extra SEO markup in `<head>` (`layout.js:274-295`)

Hand-written `<meta>` tags beyond the metadata API:

```html
<meta name="google-site-verification" content="Wb-hKqYGgIBAO-4niVTid-14M4YzI9bRzv7HWYDzuos" />
<meta name="geo.region" content="GB-MAN" />
<meta name="geo.placename" content="Manchester" />
<meta name="geo.position" content="53.5526;-2.1761" />
<meta name="ICBM" content="53.5526, -2.1761" />
<meta name="contact" content="hello@pimpmyparty.co.uk" />
<meta name="phone" content="+447359189070" />
<meta name="business:contact_data:street_address" content="5 Durness Place" />
<meta name="business:contact_data:locality" content="Heywood" />
<meta name="business:contact_data:region" content="Greater Manchester" />
<meta name="business:contact_data:postal_code" content="OL10 3ST" />
<meta name="business:contact_data:country_name" content="United Kingdom" />
<meta name="theme-color" content="#9333ea" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

Note `theme-color` is `#9333ea` (Tailwind `purple-600`) — not one of the three brand tokens.

### Internal linking (deliberate, for crawlability)

- `Footer.jsx:113-136` renders an "Areas We Cover" block that maps `publishedLocations` into `<Link>`s — so a new location page becomes crawlable from every page automatically.
- `LocalAreas.jsx:45` and `ServicesContent.jsx:271` both switch the rendered element to `motion.a` when an area has an `href`, with a comment explaining the location page must be crawlable.
- `LocationContent.jsx` links out to `/brochure`, `/services`, `/gallery` and `/contact` in body copy.

### Heading structure

One `<h1>` per page, always inside the content component, never in the layout. `Header`/`NavBar`/`Footer` use no `<h1>` (Footer's "Connect With Us" is an `<h3>`).

---

## 7. ANALYTICS

### GA4 loading

Via the official Next.js helper, in the root layout (`layout.js:6` and `layout.js:309`):

```jsx
import { GoogleAnalytics } from '@next/third-parties/google'
// ...
<GoogleAnalytics gaId="G-J22NSQHKQ2" />
```

Placed as the last child of `<body>`, after `<Footer />`. Package: `@next/third-parties` v15.5.4.

- **Measurement ID: `G-J22NSQHKQ2`** — hardcoded in two places: `layout.js:309` (the component prop) and `src/lib/gtag.js:1` (`export const GA_MEASUREMENT_ID = 'G-J22NSQHKQ2';`). It is **not** an environment variable. Note `GA_MEASUREMENT_ID` is exported but never imported anywhere — the constant is currently dead.
- Page views are handled automatically by the `GoogleAnalytics` component; there is no manual pageview call.

### Event tracking

`src/lib/gtag.js` is the single tracking module. Its core is a guarded wrapper:

```js
export function trackEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}
```

Seven pre-built helpers wrap it. All currently firing:

| Helper | GA4 event | Parameters | Wired up at |
|---|---|---|---|
| `trackFormSubmission(formName)` | `generate_lead` | `event_category: 'form'`, `event_label` | `ContactContent.jsx:42` → `'contact_form'` |
| `trackPhoneClick(location)` | `contact_click` | `event_category: 'contact'`, `contact_method: 'phone'`, `event_label` | `ContactContent.jsx:300` (`'contact_page'`), `AboutContent.jsx:236` (`'about_page'`), `LocationContent.jsx:48` (`` `${slug}_hero` ``) |
| `trackWhatsAppClick(location)` | `contact_click` | `contact_method: 'whatsapp'` | `ContactContent.jsx:246`, `LocationContent.jsx:60` |
| `trackEmailClick(location)` | `contact_click` | `contact_method: 'email'` | `ContactContent.jsx:273`, `LocationContent.jsx:70` |
| `trackBrochureDownload(brochureName)` | `file_download` | `event_category: 'brochure'`, `event_label` | `Brochure.jsx:101` (per-brochure title) |
| `trackCTAClick(ctaName, location)` | `cta_click` | `event_category: 'cta'`, `event_label`, `cta_location` | `CTA.jsx:106` (`'get_free_quote'` + the `ctaLocation` prop), `ServicesContent.jsx:364` (`'get_started_today'`, `'services_page'`) |
| `trackSocialClick(platform)` | `social_click` | `event_category: 'social'`, `event_label` | `Footer.jsx:85` (SoundCloud / Instagram / Facebook) |

The convention across the codebase: pass a **location string** as the second argument (or as `event_label`) so the same helper distinguishes which page/section fired it. `CTA.jsx:7-9` documents this explicitly.

### Search Console verification

**Meta-tag method.** Hardcoded in `src/app/layout.js:274`:

```html
<meta name="google-site-verification" content="Wb-hKqYGgIBAO-4niVTid-14M4YzI9bRzv7HWYDzuos" />
```

Not a DNS record, not an HTML file in `/public`, and not using Next's `metadata.verification.google` field.

### Cookie consent

**There is none.** No consent banner, no cookie library, no `gtag('consent', ...)` call, no Google Consent Mode configuration, no localStorage/sessionStorage use anywhere in `src/`. GA4 loads unconditionally on every page load for every visitor.

There is also no privacy policy, cookie policy, or terms page — `/privacy`, `/cookies`, `/terms` do not exist and are not linked from the footer.

---

## 8. TECHNICAL

### package.json

```json
{
  "name": "pimp-my-party",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@next/third-parties": "^15.5.4",
    "framer-motion": "^12.23.22",
    "lucide-react": "^0.544.0",
    "next": "^15.5.7",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.5.4",
    "tailwindcss": "^4"
  }
}
```

Versions actually resolved in `package-lock.json` (lockfileVersion 3):

| Package | Declared | Resolved |
|---|---|---|
| `next` | `^15.5.7` | **15.5.7** |
| `react` | `19.1.0` | 19.1.0 (pinned) |
| `react-dom` | `19.1.0` | 19.1.0 (pinned) |
| `framer-motion` | `^12.23.22` | 12.23.22 |
| `lucide-react` | `^0.544.0` | 0.544.0 |
| `@next/third-parties` | `^15.5.4` | 15.5.4 |
| `tailwindcss` | `^4` | **4.1.13** |
| `@tailwindcss/postcss` | `^4` | 4.1.13 |
| `eslint` | `^9` | 9.36.0 |
| `eslint-config-next` | `15.5.4` | 15.5.4 (pinned) |
| `@eslint/eslintrc` | `^3` | 3.3.1 |

Six runtime dependencies total. **No** TypeScript, no test framework, no database client, no auth library, no form library, no validation library, no date library, no state manager, no UI kit.

Note: `next` resolves to 15.5.7 but `eslint-config-next` and `@next/third-parties` are pinned at 15.5.4 — a deliberate consequence of commit `4605fb7` ("security: upgrade Next.js to 15.5.7 (React2Shell patch)") bumping only `next`.

### Environment variables

**There are none. Zero.**

`grep` for `process.env` and `NEXT_PUBLIC` across `src/` and all `.mjs` config files returns no matches. There is no `.env`, `.env.local`, `.env.example`, or `.env.production` in the repo. `.gitignore` does ignore `.env*`, so one could exist locally/on Vercel without being tracked — but nothing in the code reads one.

Every value that would normally be an env var is hardcoded in source:

| Value | Hardcoded at |
|---|---|
| GA4 measurement ID `G-J22NSQHKQ2` | `layout.js:309`, `lib/gtag.js:1` |
| Formspree endpoint `https://formspree.io/f/mzzjggqj` | `ContactContent.jsx:32` |
| Google site verification token | `layout.js:274` |
| Site URL `https://pimpmyparty.co.uk` | `layout.js` (×5), `sitemap.js`, `robots.js`, every page's canonical, `lib/locations.js:14` |
| Phone / WhatsApp / email | `lib/locations.js:16-20` (`CONTACT`), plus literals in `ContactContent`, `AboutContent`, `Footer`, `layout.js` |
| YouTube video ID `tYm7FfIdXmc` | `Hero.jsx:163` |

`src/lib/locations.js` exports `SITE_URL` and `CONTACT` — the only attempt so far at centralising these, and only the location page and `LocationContent` use them.

### next.config.mjs — complete file

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
```

That is the entire config. No `images` config (so `next/image` remote patterns are unset — only local `/public` images are used), no `redirects`, no `rewrites`, no `headers`, no `experimental` flags, no `output` mode, no `env` block.

`eslint.ignoreDuringBuilds: true` means **lint errors will never fail a build**. Combined with `"lint": "eslint"` (which takes no path argument), lint is effectively opt-in.

### Other config

- `jsconfig.json` — path alias only: `"@/*": ["./src/*"]`. This is why imports read `@/component/...` and `@/lib/...`.
- `eslint.config.mjs` — flat config, `next/core-web-vitals` via `FlatCompat`, ignoring `node_modules`, `.next`, `out`, `build`, `next-env.d.ts`.
- `postcss.config.mjs` — `@tailwindcss/postcss` only.
- `README.md` — untouched `create-next-app` boilerplate.
- No CI: there is no `.github/` directory, no workflows, no PR template.
- No `CLAUDE.md`, no `.claude/` directory, no skills or agent config in the repo.
- No Docker, no `vercel.json`.

### Anything touching a database or auth

**Nothing.** A case-insensitive grep across all of `src/` and the config files for `neon|postgres|prisma|drizzle|auth|cookie|session|password|jwt|bcrypt` returns exactly one hit: `authors:` in the layout's metadata object.

Specifically, there is:

- no database client or ORM in `package.json`,
- no connection string anywhere,
- no `src/app/api/` directory or route handler of any kind,
- no `middleware.js`,
- no session, cookie, JWT, or password handling,
- no `NextAuth`/`Auth.js`/Clerk/Supabase,
- no server actions (`'use server'` appears nowhere),
- no `localStorage`/`sessionStorage` usage.

The site is currently a fully static, read-only marketing site. Its only write path is the browser POSTing to Formspree.

---

## 9. RISKS

These are observations about the current state. Presented as facts, not recommendations.

### Route naming — collisions with `/book`, `/admin`, `/api/enquiries`

**No collisions exist.** `src/app/` has no `book`, `admin`, or `api` directory, no dynamic segments and no catch-all routes, so nothing would shadow or be shadowed by the three new paths. `NavBar.jsx:14-21` hardcodes exactly six links; a `/book` or `/admin` route would simply not appear there until added.

Two adjacent facts:

1. **`robots.js` already disallows `/api/`** for all user agents. `/api/enquiries` would therefore be excluded from crawling as soon as it exists — that is presumably intended, but it is already decided, not something to configure later.
2. **`robots.js` does NOT disallow anything else.** `/admin` would be `allow: '/'`-matched and crawlable, and neither `robots.js` nor `sitemap.js` mentions it. Similarly, any new route inherits the root layout's `robots: { index: true, follow: true }` unless its own page exports an override.

### Things a new page inherits whether it wants them or not

- **`Header`, `NavBar` and `Footer` render on every route.** There is no nested layout, no route group, and no conditional rendering — the layout has no awareness of pathname. An admin dashboard at `/admin` would render the purple logo header, the six-link marketing nav (with no link matching `/admin`, so no active indicator), and the full marketing footer.
- **The `LocalBusiness` JSON-LD renders on every route**, including any future `/admin` or `/book` page, because it lives in `layout.js`'s `<head>`.
- **GA4 fires on every route**, including admin pages, with no consent gate and no way to exclude a path.
- **The root `metadata`** — including `robots: {index: true}`, the OG image and the `keywords` string — applies to any new page that doesn't override it.

### Fragile things to be careful around

1. **`layoutId="activeIndicator"` in `NavBar.jsx:136`.** Framer Motion shared-layout IDs must be globally unique. Introducing a second `motion` element with that exact `layoutId` anywhere in the tree would cause the nav underline to animate to it.

2. **`z-50` is used by both the sticky NavBar (`NavBar.jsx:106`) and the gallery lightbox (`GalleryContent.jsx:143`).** There is no z-index scale. Any new overlay/modal has to reckon with the nav at `z-50`.

3. **`ServicesContent.jsx:226` builds a Tailwind class by interpolation:**
   ```jsx
   <CheckCircle2 className={`w-4 h-4 text-${service.accentColor}-400 ...`} />
   ```
   Tailwind's scanner cannot see `text-indigo-400`, `text-rose-400`, `text-cyan-400` etc., so these classes are **not generated** — the tick icons currently inherit colour rather than showing their accent. This pattern silently doesn't work; copying it into new code will reproduce the bug.

4. **`xs:gap-4` in `NavBar.jsx:112` is inert.** `xs` is not a Tailwind default breakpoint and no `--breakpoint-xs` is defined in `@theme`. The class does nothing. The small-screen nav behaviour is instead handled by the `@media (max-width: 360px)` `!important` block in `globals.css` — which targets `nav ul` and `nav span` by **element selector**. Any new `<nav>` on the site would be caught by those rules too.

5. **The contact form's "sent" state never turns green** — `ContactContent.jsx:201-203` appends `bg-green-600` to a class list that already contains `bg-gradient-to-r from-purple-600 to-pink-600`; the gradient wins. The `✓ Message Sent!` text change does work.

6. **Form error handling is a native `alert()`** (twice, `ContactContent.jsx:52` and `:55`). There is no in-page error UI to copy for a new form.

7. **The Formspree endpoint is public in client-side JS** and has no honeypot, captcha or rate limiting on the site side. Any new client-side submission path has the same exposure profile.

8. **Sitemap `lastModified` dates for the six static pages are hardcoded** with a `// TODO` (`sitemap.js:15`). Adding a route to the sitemap means adding a literal date by hand. The location-page pattern (`contentUpdated` in `locations.js`) is the newer approach and only covers location pages.

9. **The two-palette split** (§2). Brand tokens on `Header`/`NavBar`/`Footer`/`Hero`/`Services`/`Brochure`; stock `purple-*`/`pink-*` on everything else. A new page has to pick one, and matching "the existing design" means different things depending on which page you look at. The most recently written page (`LocationContent`, Aug 2026) chose the stock purple/pink palette and documented that choice in a comment.

10. **Fonts are loaded but not applied** (§2). `Geist` and `Geist_Mono` variables are set on `<body>`, but nothing maps `--font-sans` to `--font-geist-sans`, so `font-sans` resolves to the Tailwind default system stack. Wiring the fonts up correctly later would change the typography of every existing page at once.

11. **`eslint.ignoreDuringBuilds: true`** means broken lint (including unused-variable and hooks-rules problems) never fails a build. There is also no CI, no tests, and no type checking — nothing mechanical will catch a regression before deploy. `Gift` is imported and unused in `ServicesContent.jsx:11` today.

12. **Every content component takes no props and hardcodes its data**, except `CTA` (`ctaLocation`) and `LocationContent` (`location`). There is no existing pattern for passing data into a page section.

13. **Directory is `src/component/` (singular).** Easy to mistype as `components/` and silently create a parallel directory.

14. **`socials.png` is 1.0 MB** at 1200×630, referenced by absolute URL in OG/Twitter/schema. `logo.png` is a 2000×2000 / 254 KB source rendered at 128–224px wide.

15. **No `not-found.js` or `error.js`** — unmatched routes and runtime errors currently fall through to the Next.js defaults, which render **without** the site's `Header`/`NavBar`/`Footer` chrome only for `global-error`; a normal 404 does render inside the root layout.

16. **`GA_MEASUREMENT_ID` in `lib/gtag.js:1` is exported but never imported**, and duplicates the literal in `layout.js:309`. Two sources of truth for the same ID.

17. **`.scrollbar-hide` in `globals.css` is defined and unused**; `public/globe.svg` is unused `create-next-app` leftover.

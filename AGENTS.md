# AGENTS.md — VoluChat Landing

This file documents the architecture, directory layout, component hierarchy, and key patterns for the VoluChat marketing site. It is intended for AI coding agents (and human contributors) who need to understand the codebase before making changes.

---

## 1. Project Overview

VoluChat is a **Shopify AI commerce agent** platform. The landing site is a **server-side rendered (SSR)** marketing website that describes the platform, its agents, pricing, security model, and blog. It is built with **Astro** (SSR via the Vercel adapter), styled with **Tailwind CSS v4**, and uses **GSAP** for scroll-triggered animations and interactive UI elements.

**Stack at a glance:**
| Concern           | Technology                                    |
| ----------------- | --------------------------------------------- |
| Framework         | Astro 6 (SSR via `@astrojs/vercel`)           |
| Styling           | Tailwind CSS v4 (via `@tailwindcss/vite`)     |
| Animation         | GSAP 3 (`ScrollTrigger`, custom timelines)    |
| 3D Graphics       | Three.js (used sparingly, e.g. Hero console)  |
| Fonts             | Geist Sans (body), Space Grotesk (headings)   |
| Blog backend      | Django CMS API (fetched at request time)      |
| Deployment        | Vercel (SSR, ISR)                             |
| Code Quality      | TypeScript, ESLint 9, Prettier                |
| Analytics         | Google Analytics (conditional, cookie-gated)  |
| Build optimizations | astro-critters (inline critical CSS), @playform/compress (CSS/HTML/JS minification) |


---

## 2. Directory Structure

```
/
├── public/                      # Static assets (images, fonts, icons, robots.txt, manifest)
│   ├── voluchat_logo.svg
│   ├── og-image.webp
│   ├── about_hero.webp
│   ├── mission_collaboration.webp
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── layouts/
│   │   └── Layout.astro         # Root HTML wrapper: SEO meta, fonts, GSAP init, scroll reveal
│   │
│   ├── components/
│   │   ├── Navbar.astro         # Fixed header with desktop nav + mobile slide-down menu
│   │   ├── Hero.astro           # Animated hero section with interactive agent console CLI
│   │   ├── ProblemSection.astro # "Growth Trap" — pain points in a bento grid layout
│   │   ├── PlatformSection.astro# "Agent System" — 4 primitives cards + operator dashboard mockup
│   │   ├── UseCasesSection.astro# Revenue workflows — asymmetric grid of 6 agent use-case cards
│   │   ├── ProductLoopSection.astro # "Core Loop" — vertical timeline of the 6-step product flow
│   │   ├── GuardrailsSection.astro  # Interactive guardrails simulator with scenario runner
│   │   ├── DemoFlowSection.astro# "Operating loop" — 5-step process flow strip
│   │   ├── FounderNoteSection.astro # Founder blockquote with monogram avatar
│   │   ├── TrustSection.astro   # 4 trust/control cards in a glassmorphic grid
│   │   ├── FAQ.astro            # Accordion FAQ with JSON-LD structured data
│   │   ├── Footer.astro         # Full footer with CTA section, sitemap links, legal info
│   │   ├── BlogCard.astro       # Reusable blog card component (image, excerpt, author, date)
│   │   ├── AgentDetailPage.astro# Shared layout for /agents/* detail pages (props-driven)
│   │   └── CookieConsent.astro  # Analytics cookie consent banner (scroll + click accept)
│   │
│   ├── pages/
│   │   ├── index.astro          # Homepage — composes all sections
│   │   ├── features.astro       # Full features overview (agent cards, operating loop, guardrails)
│   │   ├── pricing.astro        # Custom pricing page (factors, included items, FAQ override)
│   │   ├── about.astro          # About us (vision, principles, founder note)
│   │   ├── contact.astro        # Contact form (submits to N8N webhook)
│   │   ├── compare.astro        # Comparison vs chatbots/helpdesks/analytics
│   │   ├── security.astro       # Security & guardrails page
│   │   ├── privacy.astro        # Privacy policy (static content)
│   │   ├── terms.astro          # Terms & conditions (static content)
│   │   ├── 404.astro            # Custom 404 page with recovery links
│   │   ├── sitemap.xml.js       # Dynamic XML sitemap (static routes + blog posts)
│   │   │
│   │   ├── blog/
│   │   │   ├── index.astro      # Blog listing (fetches from Django CMS API)
│   │   │   └── [slug].astro     # Blog detail page (fetches by slug)
│   │   │
│   │   ├── agents/
│   │   │   ├── product-assistant.astro
│   │   │   ├── cart-recovery.astro
│   │   │   ├── upsell.astro
│   │   │   ├── customer-follow-up.astro
│   │   │   ├── inventory-clearance.astro
│   │   │   └── revenue-leak-detection.astro
│   │   │
│   │   └── integrations/
│   │       └── shopify.astro    # Shopify integration page
│   │
│   ├── styles/
│   │   └── global.css           # Tailwind CSS v4 entry, theme tokens, utility layers, hero animations
│   │
│   └── lib/
│       ├── markdown.mjs         # Zero-dependency markdown → HTML renderer (no MDX/XSS risk)
│       └── blogApi.mjs          # Blog API client (fetch posts, normalize, error handling)
│
├── test/                        # Node.js E2E tests (.test.mjs)
│   ├── cookieConsent.test.mjs
│   ├── homepageConversion.test.mjs
│   ├── sitemap.test.mjs
│   ├── liveDemoLinks.test.mjs
│   ├── pricingPage.test.mjs
│   ├── dashboardCtas.test.mjs
│   ├── markdown.test.mjs
│   └── notFoundPage.test.mjs
│
├── astro.config.mjs             # Astro config (Vercel adapter, Tailwind Vite plugin, critters, compress)
├── tsconfig.json                # Strict TS, path alias @/* → src/*
├── package.json
├── .prettierrc                  # Prettier with prettier-plugin-astro
└── .gitignore


---

## 3. Component Deep-Dive

### 3.1 Layout (`src/layouts/Layout.astro`)

The root layout provides:
- **SEO**: title, description, keywords, canonical URL, Open Graph / Twitter Card meta
- **Structured data**: JSON-LD via `structuredData` prop (supports array or single object)
- **Fonts**: Geist Sans (body), Space Grotesk (headings) — loaded via `@fontsource`
- **No-FOUC guard**: Inline `<script>` that adds `.js-reveal` class when JS is available and motion is not reduced, enabling CSS-based entrance animations
- **GSAP bundle**: A `<script>` at the bottom sets up a global `matchMedia` check for `prefers-reduced-motion`, then activates:
  1. **Reveal-on-scroll**: Watches `.reveal-on-scroll` elements via `ScrollTrigger`, animates from `opacity: 0, y: 20/scale` defaults
  2. **Spotlight**: Mouse-tracked glow on `.spotlight` elements via CSS custom properties (`--mx`, `--my`)
  3. **Tilt**: 3D card tilt on `.tilt` elements (configurable `data-tilt-strength`)
  4. **Animated counters**: Numeric count-up on `[data-counter]` elements with prefix/suffix support

**Props interface:**
```typescript
interface Props {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;           // "website" | "article"
  robots?: string;
  canonical?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}
```

### 3.2 Navbar (`src/components/Navbar.astro`)

- Fixed header with glassmorphic styling (`backdrop-blur-2xl` on dark background)
- Desktop: centered nav links (Platform, Agents, Pricing, Compare, About, Guardrails) with animated gradient underline
- Desktop: "Request Agent Review" CTA button
- Mobile: hamburger toggle → animated slide-down menu with fade + scale transition
- Scroll behavior: adds `.scrolled` class at `scrollY > 20` (pills the nav slightly)
- Conditional hash-linking: on the homepage, links use `#hash`; on other pages, they use `/#hash`
- Hover underline uses `::after` pseudo-element with `scaleX(0) → scaleX(1)` transition

### 3.3 Hero (`src/components/Hero.astro`)

The flagship component. Sections:
- **Background**: Pure CSS — layered grid, gradient mesh, three floating orbs (teal, emerald, violet), scan-line sweep, vignette
- **Eyebrow**: "Margin-safe AI agents for Shopify" with pulsing dot
- **Headline**: Gradient text, two-line layout
- **CTAs**: Primary "Request an Agent Review" (with magnetic hover + sheen effect) and secondary "See the Operating Loop"
- **Interactive Console**: A full terminal-like CLI mockup with:
  - Typed output with typewriter effect
  - Pre-built `COMMANDS` map for ~15 commands (status, help, recover, upsell, followup, clearance, etc.)
  - History navigation via arrow keys
  - Suggestion chips
  - Entrance animation (console slides in, then auto-types "help")
  - Reduced-motion respect throughout



### 3.4 ProblemSection (`src/components/ProblemSection.astro`)

- **Header**: "The Growth Trap" — "Your store grows. Then the manual work grows faster."
- **Bento grid** (12-column CSS Grid) with 6 pain-point cards, each with:
  - Code ID (P01–P06) with unique accent color per card
  - Visual "disconnected table" mockup for the first card (most prominent)
  - Accent borders, gradient backgrounds, hover effects
- Layout: first row gets 6+6 columns, second row gets 4+4+4 columns

### 3.5 PlatformSection (`src/components/PlatformSection.astro`)

- **4 primitives cards**: Customer context, Catalog awareness, Agent reasoning, Action history
  - Spotlight hover effect, staggered reveal delays, code numbers, tags
- **Live Operator View mockup**: Right column sidebar showing a triggered signal, proposed action, and guardrail confirmation
- Background: grid pattern overlay + teal aurora orb

### 3.6 UseCasesSection (`src/components/UseCasesSection.astro`)

- 6 workflow cards in an asymmetric 12-column grid
- First card (Cart Recovery) is largest (7 cols) with diagnostic report mockup
- Remaining cards use standard layout with code ID, metric label, CTA link
- All cards are `<a>` tags linking to the respective `/agents/*` detail page
- Hover state: elevated, brighter border, CTA arrow slides right

### 3.7 ProductLoopSection (`src/components/ProductLoopSection.astro`)

- 6-step vertical timeline with alternating left/right content cards
- Center: numbered badges on a gradient vertical line (desktop) or left-aligned (mobile)
- Each step has a contextual inline mockup (e.g., "Shopify Store Connected" chip, "Drafting Offer" preview, Approve/Ignore buttons)
- Hover: badge teal-glows and scales up
- Staggered card widths: even/odd alternate via `lg:flex-row-reverse`

### 3.8 GuardrailsSection (`src/components/GuardrailsSection.astro`)

**The most interactive component.** Contains:
- **Left panel**: Toggle switches for each guardrail (Inventory Filter, Margin Floor, Offer Cap, Brand Voice) — purely visual/UI state (no backend)
- **Right panel**: Scenario runner with 3 buttons (Recover Cart, Recommend Bundle, Clear Old Stock) each testing a different guardrail combination
- Each scenario runs a simulated GSAP timeline:
  1. Shows "Checking guardrails…" loading state
  2. Runs 5 factual checks (e.g., "Is SKU-A12 in stock? ✓", "Would cost price + 25% exceed margin floor?")
  3. Shows PASS/BLOCKED/WARNING status per check
  4. Displays final outcome with revenue attribution particle burst
- Uses CSS custom properties for toggle switch and particle positioning

### 3.9 DemoFlowSection (`src/components/DemoFlowSection.astro`)

- 5-step process flow strip (Buyer asks → Agent checks → Cart intent detected → Recovery approved → Revenue attributed)
- Desktop: horizontal flow with arrow connectors between cards
- Mobile: stacked cards
- Bottom: CTA to /contact

### 3.10 FounderNoteSection (`src/components/FounderNoteSection.astro`)

- 2-column layout: left side "Founder note" chip + context, right side blockquote
- Blockquote with teal left border accent
- Bottom: attribution monogram (VG), founder name, and title

### 3.11 TrustSection (`src/components/TrustSection.astro`)

- 4 trust/control cards in a staggered glassmorphic grid
- Cards: "Approval before sensitive outreach", "Decision history stays visible", "Store context limits the agent", "Revenue is tied back to the workflow"
- Staggered vertical offset on desktop (`md:mt-10`, `md:mt-4`)
- Hover: elevates, brightens border, shows teal indicator dot

### 3.12 FAQ (`src/components/FAQ.astro`)

- Accordion-style FAQ with 7 questions
- Accepts optional `pricingAnswer` prop (overridden on the pricing page)
- JSON-LD `FAQPage` structured data injected via `<script type="application/ld+json">`
- Bottom CTA card linking to /contact
- JavaScript: single-open accordion (active item toggles, others close), smooth height transition via `max-height`

### 3.13 Footer (`src/components/Footer.astro`)

- Pre-footer CTA section (gradient card with "Ready for a working agent system?")
- 4-column link grid: Platform, Agents, Company, Legal
- Brand column with logo and tagline
- "Platform Operational" status badge (emerald pulsing dot)
- Copyright: "QubitNine Technologies Pvt Ltd"

### 3.14 BlogCard (`src/components/BlogCard.astro`)

- Props: `{ blog: { href, slug, title, excerpt, dateLabel, featuredImageUrl, featuredImageAlt, author, categories } }`
- Card layout: image placeholder (or actual image), category chip overlay, hover icon overlay, date + reading time, title, excerpt, author avatar/initials
- Lazy images with `decoding="async"`
- Animation: Scale on hover, border glow transition

### 3.15 AgentDetailPage (`src/components/AgentDetailPage.astro`)

- A shared **layout component** for all 6 `/agents/*` pages
- Props-driven: `seoTitle`, `seoDescription`, `eyebrow`, `title`, `description`, `heroSignal/Decision/Action/Outcome`, `painTitle`, `painCopy`, `workflow[]`, `useCases[]`, `guardrails[]`, `relatedLinks[]`
- Renders: hero with workflow preview card, pain section, 3-step workflow cards, use cases grid, guardrails + related agents sidebar, FAQ, Footer
- Each agent page (e.g. `cart-recovery.astro`) is ~50 lines of data only

### 3.16 CookieConsent (`src/components/CookieConsent.astro`)

- Appears when no consent has been saved to localStorage
- Accept by clicking "Accept" button or scrolling past 80px threshold
- Reject via "Decline" button
- On accept: loads Google Analytics (`gtag`) dynamically if `PUBLIC_GA_MEASUREMENT_ID` is set
- Keys: `voluchat-cookie-consent` in localStorage (values: `"accepted"`, `"rejected"`, or absent)
- Hidden on subsequent page loads if already accepted/rejected


---

## 4. Page Routing

| Route                    | Layout/Component Used        | Notes                                  |
| ------------------------ | ---------------------------- | -------------------------------------- |
| `/`                      | Layout + all sections        | Homepage                               |
| `/features`              | Layout + features page       | Full agent overview                    |
| `/pricing`               | Layout + pricing page        | Custom pricing (no public tiers)       |
| `/about`                 | Layout + about page          | Vision and founder story               |
| `/contact`               | Layout + contact page        | N8N webhook form                       |
| `/compare`               | Layout + compare page        | VoluChat vs alternatives               |
| `/security`              | Layout + security page       | Guardrails & trust                     |
| `/privacy`               | Layout + privacy page        | Static policy                          |
| `/terms`                 | Layout + terms page          | Static terms                           |
| `/404`                   | Layout + 404 page            | Custom 404 with recovery links         |
| `/sitemap.xml`           | Dynamic XML                  | Static + blog routes                   |
| `/blog`                  | Layout + blog index          | Fetches from Django CMS API            |
| `/blog/[slug]`           | Layout + blog detail         | Fetches by slug                        |
| `/agents/*`              | AgentDetailPage              | 6 agent detail pages (props-driven)    |
| `/integrations/shopify`  | Layout + shopify page        | Shopify integration overview           |

---

## 5. Global CSS Conventions

**File**: `src/styles/global.css`

- **Tailwind v4**: Uses `@import "tailwindcss"` (new v4 syntax), not `@tailwind` directives
- **Theme tokens**: Defined via `@theme` block
  - Font families: `--font-sans` (Geist Sans), `--font-heading` (Space Grotesk), `--font-mono`
  - Color palette: `--color-primary-50` through `--color-primary-950` (teal/emerald spectrum)
  - Coral accent colors
- **Base layer**: body styling, ambient background (`radial-gradient` + `linear-gradient`), heading defaults
- **Utility classes**: `.page-shell` (max-width container), `.section-pad`, `.section-band`, `.solid-card`, `.solid-card-compact`
- **Component classes**: `.chip`, `.mini-label`, `.section-eyebrow`, `.section-title`, `.section-copy`, `.btn-primary`, `.btn-secondary`, `.gradient-text-anim`, `.reveal-on-scroll`, `.spotlight`, `.tilt`
- **Reveal system**: 4 CSS classes controlled by Layout's GSAP init:
  - `.reveal-on-scroll` — marker for ScrollTrigger
  - `.reveal-up` — slide up from below
  - `.reveal-scale` — scale from 0.95
  - `.reveal-delay-{50,75,100,150,200}` — stagger delay in ms
- **Hero backgrounds**: `.hero-bg-grid`, `.hero-bg-mesh`, `.hero-bg-orb` (teal/emerald/violet), `.hero-bg-scan`, `.hero-bg-vignette` — all pure CSS with `@keyframes`
- **Hero entrance**: Elements start `opacity: 0, translateY(18px)` and transition to visible when `.hero-in` class is added (JS-controlled with `requestAnimationFrame` stagger)
- **Animations** (keyframes): `heroMeshDrift`, `heroOrbDriftA/B/C`, `heroScanSweep`, `aurora`, `pulse-ring`, `btnSheen`
- **Reduced motion**: All GSAP and CSS reveal animations are gated by `prefers-reduced-motion: no-preference` media query or JS matching
---

## 6. Script and Animation Patterns

### 6.1 GSAP Usage

GSAP is loaded globally in `Layout.astro` and configured once. Code pattern:

```astro
<script>
  (function() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // skip all GSAP animations

    // Load GSAP and plugins
    // Initialize:
    // 1. ScrollTrigger reveals for .reveal-on-scroll elements
    // 2. Spotlight pointer tracking for .spotlight elements
    // 3. Tilt 3D rotation for .tilt elements (with data-tilt-strength)
    // 4. Animated counters for [data-counter] elements
  })();
</script>
```

**Critical rules:**
- Always check `prefersReduced` at the top and bail out if `true`
- Use `overwrite: "auto"` to avoid animation conflicts on rapid pointer moves
- Use `once: true` on ScrollTrigger for performance
- Animate CSS custom properties (e.g. `--mx`, `--my`, `--ry`, `--rx`) instead of inline transforms when possible

### 6.2 Inline vs Isolated Scripts

- **Global animation logic** → placed in `Layout.astro` `<script>` (no `is:inline`)
- **Component-specific logic** → `<script>` at bottom of component file (e.g. Navbar scroll/mobile menu, FAQ accordion, Guardrails simulator, Contact form submit)
- **Critical path** (no-FOUC guard) → `<script is:inline>` in `<head>` (runs before first paint)
- **Google Analytics launch** → inline script in CookieConsent (loads gtag dynamically)

---

## 7. Blog System

**Backend**: Django CMS REST API
**URL**: Configurable via `PUBLIC_BLOG_API_URL` or `PUBLIC_API_URL` env var (defaults to `http://localhost:8000`)

**API client** (`src/lib/blogApi.mjs`):
- `fetchPublishedBlogPosts()` — GET `/blogs/?published=1&limit=N`
- `fetchBlogPostBySlug(slug)` — GET `/blogs/slug/{slug}`
- Normalizes responses (handles missing fields, malformed data)
- Falls back to `"Recently published"` date label when no valid date
- Generates excerpt from content body if no explicit excerpt

**Markdown renderer** (`src/lib/markdown.mjs`):
- Zero-dependency, lightweight (no MDX, no marked, no DOMPurify)
- Supports: headings, bold, italic, strikethrough, links, images, code blocks (fenced), inline code, blockquotes, unordered/ordered lists, tables, horizontal rules, paragraphs
- All URLs are sanitized (only `https?:`, `mailto:`, `tel:`, `/`, `#` allowed)
- XSS-safe: input is HTML-escaped before rendering

**Blog listing** (`/blog`): Server-rendered grid of `BlogCard` components
**Blog detail** (`/blog/[slug]`): Full article with SEO meta, author info, date, content rendered via `renderMarkdownToHtml()`, 404 handling if slug not found


---

## 8. Contact Form

**Route**: `/contact`
**Behavior**:
- Collects: Name, Email, Store URL, Priority workflow (dropdown), Pain point detail (textarea)
- Submits via `fetch()` to `PUBLIC_N8N_DEMO_WEBHOOK_URL` (N8N webhook, configurable via env)
- POSTs JSON body
- Shows success (teal) or error (rose) message
- Disables submit button during request and resets form on success

---

## 9. Environment Variables

| Variable                      | Required | Default               | Used In                                    |
| ----------------------------- | -------- | --------------------- | ------------------------------------------ |
| `PUBLIC_GA_MEASUREMENT_ID`    | No       | `""`                  | CookieConsent (Google Analytics)           |
| `PUBLIC_BLOG_API_URL`         | No       | `http://localhost:8000` | Blog API client                            |
| `PUBLIC_API_URL`              | No*      | —                     | Fallback for blog API URL                  |
| `PUBLIC_N8N_DEMO_WEBHOOK_URL` | No       | —                     | Contact form submission                    |

*Only if `PUBLIC_BLOG_API_URL` is not set.

---

## 10. Tests

Tests live in `/test/` and use **Node.js native test runner** (`node --test`, `.test.mjs` files). They are E2E file-fetching tests:

| Test file                   | What it checks                                   |
| --------------------------- | ------------------------------------------------ |
| `cookieConsent.test.mjs`    | Banner visibility, localStorage, GA gating       |
| `homepageConversion.test.mjs` | Page load, CTA links, structured sections        |
| `sitemap.test.mjs`          | XML validity, route coverage                     |
| `liveDemoLinks.test.mjs`    | /contact and CTA links respond                   |
| `pricingPage.test.mjs`      | Pricing page elements and FAQ override           |
| `dashboardCtas.test.mjs`    | Footer and contact CTA presence                  |
| `markdown.test.mjs`         | `renderMarkdownToHtml()` output accuracy         |
| `notFoundPage.test.mjs`     | 404 status code and recovery links               |

Run with: `node --test`

---

## 11. Coding Conventions

- **Naming**: `.astro` components are PascalCase, files use kebab-case for pages
- **Imports**: Relative imports (`../components/...`) for local files; path alias `@/*` → `src/*` available in TypeScript
- **TypeScript**: Strict mode, explicit interfaces for props
- **CSS**: Use Tailwind utility classes first; extract custom classes to `global.css` `@layer components` only for repeated patterns; component-specific styles use `<style>` blocks
- **Animation classes**: `.reveal-on-scroll` marks elements for GSAP; `.spotlight` for mouse-tracking glow; `.tilt` for 3D tilt; `.reveal-delay-{N}` for staggering
- **Reduced motion**: Always respect `prefers-reduced-motion` (JS gate + CSS media query)
- **SEO**: Every page passes `title`, `description`, `keywords`, and optional `structuredData`, `canonical`, `robots` to `Layout`
- **Mobile-first**: All layouts and grids use responsive Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- **Strings**: Use `text-pretty` on paragraphs, `text-balance` on headings



---

## 12. Build & Deploy

```bash
npm install
npm run dev          # astro dev --host (local dev server, network accessible)
npm run build        # astro build (SSR output for Vercel)
npm run preview      # astro preview (local preview of built output)
npm run lint         # eslint .
```

**Build pipeline**:
1. Astro builds SSR pages
2. `@tailwindcss/vite` processes Tailwind styles
3. `astro-critters` inlines critical CSS
4. `@playform/compress` minifies CSS, HTML, JS
5. Vercel adapter bundles output for serverless deployment

**Deployment target**: Vercel (SSR). The `site` config is `https://www.voluchat.com`.

---

## 13. Key Architectural Decisions

1. **No React/Svelte/Vue islands**: All interactivity is via vanilla JS `<script>` blocks inside Astro components. This keeps the bundle small and avoids framework overhead.
2. **No client-side routing**: All navigation is standard `<a>` tag navigation. The blog uses SSR with ISR patterns.
3. **Own markdown renderer**: Instead of pulling in `marked` or `MDX`, the site uses a custom ~270-line renderer that is safe by construction (HTML-escapes all input, sanitizes URLs).
4. **GSAP over Framer Motion / CSS-only**: GSAP's `ScrollTrigger` and timeline APIs handle complex choreography (staggered reveals, particle effects, counter animations) that pure CSS cannot do performantly.
5. **Props-driven agent pages**: All 6 agent detail pages reuse `AgentDetailPage.astro`, keeping the data separate from the layout. Adding a new agent requires only a new page file with data.
6. **Cohesive dark theme**: All pages use `bg-[#07121d]` base, teal/emerald accent palette, and glassmorphic cards with `backdrop-blur` and subtle border glow.
7. **No client-side state management**: State is limited to DOM class toggles and localStorage for cookie consent — no stores, no contexts.



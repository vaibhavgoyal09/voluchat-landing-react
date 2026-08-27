# AGENTS.md — VoluChat Landing

This file documents the architecture, directory layout, component hierarchy, positioning, and key patterns for the VoluChat marketing site. It is intended for AI coding agents (and human contributors) who need to understand the codebase before making changes.

---

## 1. Project Overview & Core Positioning

VoluChat is an **Autonomous Social Commerce AI Sales Agent** platform for Instagram and WhatsApp connected to Shopify. It solves the critical revenue leak in social commerce: when shoppers comment on Instagram Reels or message in DMs at night, manual chat reps are offline or overwhelmed, and rigid chatbot builders (like Wati, Interakt, ManyChat) leak 70%+ of high-intent buyers.

VoluChat automates the complete 90-second social commerce loop:
1. **Comment-to-DM Engine**: Auto-replies to Instagram comments in 2 seconds and slides into DMs with exact pricing.
2. **Catalog & Sizing Intelligence**: Live Shopify variant inventory checks, fabric details, and sizing qualification without hallucinations.
3. **WhatsApp Sales Closer**: Seamlessly transitions warm buyers to WhatsApp, handles objections, and enforces strict margin ceilings.
4. **Native In-DM UPI Checkout**: Generates 1-click UPI payment links / draft orders directly in chat, eliminating website drop-offs.
5. **Done-For-You Private Pilot Cohort**: 100% white-glove setup for an initial 10-store cohort with a founder-backed 10x ROI standard.

**Stack at a glance:**
| Concern           | Technology                                    |
| ----------------- | --------------------------------------------- |
| Framework         | Astro 6 (SSR via `@astrojs/vercel`)           |
| Styling           | Tailwind CSS v4 (via `@tailwindcss/vite`)     |
| Animation         | GSAP 3 (`ScrollTrigger`, custom timelines)    |
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
│   │   ├── Navbar.astro         # Fixed header (How It Works, Revenue Loop, Pricing, Guardrails, Compare, About)
│   │   ├── Hero.astro           # Social closer hero with interactive 85-second live WhatsApp checkout simulation
│   │   ├── ProblemSection.astro # "The Social Commerce Trap" — 6 revenue leaks (LEAK-01 to LEAK-06)
│   │   ├── ProductLoopSection.astro # "The 90-Second Social Revenue Loop" — 6-step visual execution flow
│   │   ├── TrustSection.astro   # "White-Glove & Controlled" — 4 trust cards + mid-page pilot CTA strip
│   │   ├── UseCasesSection.astro# "The 4-Pillar Revenue Engine" — Capture, Qualify, Close, Settle
│   │   ├── FounderNoteSection.astro # Founder blockquote & 10x value standard commitment
│   │   ├── GuardrailsSection.astro  # Snappy 4-card brand safety and margin protection stack
│   │   ├── FAQ.astro            # Accordion FAQ (Wati/Manychat comparison, pilot details, JSON-LD)
│   │   ├── Footer.astro         # Footer with pilot links, platform status, and company info
│   │   ├── BlogCard.astro       # Reusable blog card component
│   │   └── CookieConsent.astro  # Analytics cookie consent banner (scroll + click accept)
│   │
│   ├── pages/
│   │   ├── index.astro          # Homepage — streamlined narrative flow
│   │   ├── features.astro       # Social commerce architecture (Capture -> Qualify -> Close -> Settle)
│   │   ├── pricing.astro        # Pilot cohort scope (100% white-glove setup & 10x ROI standard)
│   │   ├── about.astro          # Social commerce mission & founder story
│   │   ├── contact.astro        # 10-store pilot intake qualification form
│   │   ├── compare.astro        # VoluChat vs Wati, Manychat, and manual chat reps
│   │   ├── security.astro       # Meta Cloud API, WhatsApp API security & brand safety guardrails
│   │   ├── privacy.astro        # Privacy policy (WhatsApp, Instagram, Shopify data handling)
│   │   ├── terms.astro          # Terms & conditions
│   │   ├── 404.astro            # Custom 404 page with active system recovery links
│   │   ├── sitemap.xml.js       # Dynamic XML sitemap
│   │   │
│   │   ├── blog/
│   │   │   ├── index.astro      # Blog listing (fetches from Django CMS API)
│   │   │   └── [slug].astro     # Blog detail page (fetches by slug)
│   │   │
│   │   └── integrations/
│   │       └── shopify.astro    # Shopify integration page
│   │
│   ├── styles/
│   │   └── global.css           # Tailwind CSS v4 entry, theme tokens, animations
│   │
│   └── lib/
│       ├── markdown.mjs         # Zero-dependency markdown -> HTML renderer
│       ├── blogApi.mjs          # Blog API client
│       └── faqSchema.mjs        # Centralized FAQ schema helper
│
├── astro.config.mjs             # Astro config (Vercel adapter, Tailwind Vite plugin, critters, compress)
├── tsconfig.json                # Strict TS, path alias @/* -> src/*
├── package.json
├── .prettierrc                  # Prettier with prettier-plugin-astro
└── .gitignore
```

---

## 3. Homepage Narrative Architecture (`src/pages/index.astro`)

The homepage is structured in a high-conversion narrative sequence designed to eliminate skepticism and drive pilot applications:

1. **Hero (`Hero.astro`)**:
   - Headline: *"Turn Instagram DMs & WhatsApp Chats into 24/7 Automated Revenue."*
   - Live interactive simulation showing an Instagram Reel comment (`"Price?"`) resolving into a **₹2,899 WhatsApp Draft Order closed in 85 seconds**.
   - Primary CTA: *"Apply for 1 of 10 Pilot Spots →"*
2. **Problem Section (`ProblemSection.astro`)**:
   - Exposes the 6 specific leaks: 11 PM leads going cold, viral comment backlog, flowchart chatbot fatigue, external link cart drops, chat rep churn, and high COD RTO rates.
3. **Product Loop (`ProductLoopSection.astro`)**:
   - The immediate "Aha!" moment: 6-step flow showing real-time variant stock reading, delivery pincode validation, UPI link generation, and Shopify admin sync.
4. **Trust & Mid-Page CTA (`TrustSection.astro`)**:
   - Addresses technical objection immediately: *"Zero technical setup. Total brand control."*
   - Includes embedded conversion action strip: *"Ready to deploy on your Shopify store? [Apply for 1 of 10 Pilot Spots →]"*
5. **The 4-Pillar Commerce Engine (`UseCasesSection.astro`)**:
   - Breaks down the four core modules: Comment-to-DM Engine, Deep Catalog & Sizing Intelligence, WhatsApp Sales Closer, Native In-DM UPI Checkout.
6. **Founder Note (`FounderNoteSection.astro`)**:
   - Founder accountability: *"I will deliver 10x the value of what we charge. Anything less is unacceptable."*
7. **Brand Safety & Guardrails (`GuardrailsSection.astro`)**:
   - Snappy 4-card safety stack: Strict Margin Protection, Zero Out-of-Stock Selling, Instant Human Escalation, and Brand Voice Calibration.
8. **FAQ & Pre-Footer (`FAQ.astro` & `Footer.astro`)**:
   - Direct objection handling vs Wati, Manychat, and manual reps.

---

## 4. Key Sub-Pages

| Route | Purpose |
| --- | --- |
| `/pricing` | Private 10-Store Founder Pilot breakdown, white-glove setup scope, and 10x ROI commitment. |
| `/compare` | Deep breakdown of VoluChat vs rigid flowchart bots (Wati/Interakt), link-pushers (ManyChat), and manual sales reps. |
| `/features` | Technical Capture -> Qualify -> Close -> Settle architecture deep-dive. |
| `/security` | Meta Business Cloud API compliance, catalog isolation, and discount margin floors. |
| `/contact` | Pilot store intake qualification form (posts to N8N webhook). |
| `/about` | Social commerce vision and founder story. |

---

## 5. Coding & Animation Conventions

- **Tailwind CSS v4**: Uses `@import "tailwindcss";` in `src/styles/global.css`.
- **GSAP Animation Rules**:
  - Always guard with `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
  - Keep animations snappy (durations between `0.3s` - `0.6s`, tight stagger `0.05s` - `0.1s`).
  - Use `ScrollTrigger` with `start: "top 80%"` and `toggleActions: "play none none reverse"`.
- **SEO & Structured Data**:
  - Single conditional `<meta name="keywords" content={keywords} />` in `Layout.astro`.
  - Structured data injected via `structuredData` prop utilizing `faqSchema.mjs`.
  - Canonical URLs generated dynamically without trailing slashes.

---

## 6. Build & Deploy

```bash
npm install
npm run dev          # astro dev --host (local dev server)
npm run build        # astro build (SSR output for Vercel)
npm run preview      # astro preview
npm run lint         # eslint .
```


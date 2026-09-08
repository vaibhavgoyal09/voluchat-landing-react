# AGENTS.md — VoluChat Landing

This file documents the architecture, directory layout, component hierarchy, positioning, and key patterns for the VoluChat marketing site. It is intended for AI coding agents (and human contributors) who need to understand the codebase before making changes.

---

## 1. Project Overview & Core Positioning

VoluChat is an **Autonomous AI Sales Agent on WhatsApp, Instagram, and Facebook Messenger for Fashion & Clothing Boutiques**. It solves the critical revenue leak in DM-based selling: when fashion shoppers comment on Instagram Reels or Facebook posts, or message in DMs at night asking about pricing and sizing, manual chat reps are offline or overwhelmed, and rigid chatbot builders (like Wati, Interakt, ManyChat) leak 60%+ of high-intent boutique buyers.

VoluChat automates the complete 90-second fashion comment-to-checkout loop:
1. **Comment-to-DM Engine**: Auto-replies to Instagram and Facebook comments in 2 seconds and slides into DMs with exact pricing, photos, and sizing options.
2. **AI Stylist & Sizing Intelligence**: Live product inventory checks, fabric details, size chart recommendations, and fit qualification without hallucinations.
3. **Upsells, Cross-Sells & Cart Recovery**: Recommends complementary styling pieces, recovers abandoned carts, and maximizes AOV — all in-chat.
4. **Native In-DM UPI Checkout**: Generates 1-click UPI payment links / draft orders directly in chat, eliminating website drop-offs and reducing COD RTO.
5. **Done-For-You Private Pilot Cohort**: 100% white-glove setup for an initial 10 fashion store cohort with a founder-backed 10x ROI standard.

**Shopify is an optional integration** — VoluChat reads from Shopify when connected, but the core automation agent works with any catalog or e-commerce platform. More integrations coming soon.

**Stack at a glance:**
| Concern           | Technology                                    |
| ----------------- | --------------------------------------------- |
| Framework         | Astro 6 (SSR via `@astrojs/vercel`)           |
| Styling           | Tailwind CSS v4 (via `@tailwindcss/vite`)     |
| Animation         | GSAP 3 (`ScrollTrigger`, custom timelines)    |
| Fonts             | Inter (body), Sora (headings)                  |
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
│   ├── robots.txt
│   └── llms.txt                 # LLM-readable product summary and category positioning
│
├── src/
│   ├── layouts/
│   │   └── Layout.astro         # Root HTML wrapper: SEO meta, fonts, GSAP init, scroll reveal, global schemas
│   │
│   ├── components/
│   │   ├── Navbar.astro         # Fixed header (How It Works, Revenue Loop, Pricing, Guardrails, Compare, About)
│   │   ├── Hero.astro           # E-commerce automation hero with interactive 85-second live WhatsApp checkout simulation
│   │   ├── ProblemSection.astro # "The DM Revenue Leak" — 6 revenue leaks (LEAK-01 to LEAK-06)
│   │   ├── HowItWorksFlow.astro # "The 90-Second Sales Loop" — 4-step visual execution flow
│   │   ├── ProductProofSection.astro # Product proof and social validation
│   │   ├── ConnectedSystemSection.astro # Connected system integration showcase
│   │   ├── UseCasesSection.astro# "The 4-Pillar Revenue Engine" — Capture, Qualify, Close, Settle
│   │   ├── FounderNoteSection.astro # Founder blockquote & 10x value standard commitment
│   │   ├── GuardrailsSection.astro  # Snappy 4-card brand safety and margin protection stack
│   │   ├── RoiCalculatorSection.astro # ROI calculator interactive section
│   │   ├── EarlyAccessSection.astro # Early access CTA section
│   │   ├── FAQ.astro            # Accordion FAQ (Wati/Manychat comparison, pilot details, JSON-LD)
│   │   ├── Footer.astro         # 5-section footer: Product, Compare, Learn, Company, Legal + social links (incl. GitHub)
│   │   ├── BlogCard.astro       # Reusable blog card component
│   │   ├── Breadcrumbs.astro    # Breadcrumb navigation component
│   │   └── CookieConsent.astro  # Analytics cookie consent banner (scroll + click accept)
│   │
│   ├── pages/
│   │   ├── index.astro          # Homepage — streamlined narrative flow
│   │   ├── features.astro       # E-commerce automation architecture (Capture -> Qualify -> Close -> Settle) + DefinedTermSet schema
│   │   ├── pricing.astro        # Pilot cohort scope (100% white-glove setup & 10x ROI standard) + Service schema
│   │   ├── about.astro          # Mission & founder story
│   │   ├── contact.astro        # 10-store pilot intake qualification form
│   │   ├── compare.astro        # VoluChat vs Wati, Manychat, Interakt, and manual chat reps (with honesty section)
│   │   ├── glossary.astro       # 20-term glossary with DefinedTermSet schema
│   │   ├── security.astro       # Meta Cloud API, WhatsApp API security & brand safety guardrails
│   │   ├── privacy.astro        # Privacy policy (WhatsApp, Instagram, Shopify data handling)
│   │   ├── terms.astro          # Terms & conditions
│   │   ├── 404.astro            # Custom 404 page with active system recovery links
│   │   ├── sitemap.xml.js       # Dynamic XML sitemap with lastmod dates
│   │   │
│   │   ├── blog/
│   │   │   ├── index.astro      # Blog listing (fetches from Django CMS API)
│   │   │   └── [slug].astro     # Blog detail page (TL;DR excerpt block, conditional HowTo schema)
│   │   │
│   │   ├── compare/
│   │   │   ├── wati.astro       # Dedicated comparison: VoluChat vs Wati
│   │   │   ├── manychat.astro   # Dedicated comparison: VoluChat vs Manychat
│   │   │   ├── interakt.astro   # Dedicated comparison: VoluChat vs Interakt
│   │   │   └── manual-reps.astro # Dedicated comparison: VoluChat vs manual chat reps
│   │   │
│   │   ├── what-is/
│   │   │   ├── comment-to-DM-automation.astro # Definitional page with extractable answer, FAQPage schema
│   │   │   └── whatsapp-sales-bot.astro       # Definitional page with types comparison, FAQPage schema
│   │   │
│   │   └── integrations/
│   │       └── shopify.astro    # Shopify integration page (5-step flow, reads/creates, security)
│   │
│   ├── styles/
│   │   └── global.css           # Tailwind CSS v4 entry, theme tokens, animations
│   │
│   └── lib/
│       ├── markdown.mjs         # Zero-dependency markdown -> HTML renderer
│       ├── blogApi.mjs          # Blog API client
│       └── faqSchema.mjs        # Centralized FAQ schema helper (getFaqSchema)
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
   - Headline: *"Your boutique keeps selling—even when you're asleep."*
   - Sub: *"Price?" answered in seconds—even at 2am.*
   - Primary CTA: *"Start My 30-Day Free Trial →"*
2. **Problem Section (`ProblemSection.astro`)**:
   - Exposes the 6 specific leaks: 11 PM leads going cold, viral comment backlog, flowchart chatbot fatigue, external link cart drops, chat rep churn, and high COD RTO rates.
3. **How It Works Flow (`HowItWorksFlow.astro`)**:
   - 4-step visual: Sell & Close, Track Parcels, Resolve Exchanges, 24/7 Support.
4. **Product Proof (`ProductProofSection.astro`)**:
   - Social proof and validation metrics.
5. **Connected System (`ConnectedSystemSection.astro`)**:
   - Integration showcase and ecosystem.
6. **Brand Safety & Guardrails (`GuardrailsSection.astro`)**:
   - Snappy 4-card safety stack: Strict Margin Protection, Zero Out-of-Stock Selling, Instant Human Escalation, and Brand Voice Calibration.
7. **ROI Calculator (`RoiCalculatorSection.astro`)**:
   - Interactive ROI calculator section.
8. **Early Access CTA (`EarlyAccessSection.astro`)**:
   - Conversion action strip.
9. **FAQ & Pre-Footer (`FAQ.astro` & `Footer.astro`)**:
   - Direct objection handling vs Wati, Manychat, and manual reps.

---

## 4. Key Sub-Pages

| Route | Purpose |
| --- | --- |
| `/pricing` | Private 10-Store Founder Pilot breakdown, white-glove setup scope, and 10x ROI commitment. |
| `/compare` | Deep breakdown of VoluChat vs rigid flowchart bots (Wati/Interakt), link-pushers (ManyChat), and manual sales reps. Includes "When to choose the other tools" honesty section. |
| `/compare/wati` | Dedicated comparison: VoluChat vs Wati (flowchart menus vs AI conversation). |
| `/compare/manychat` | Dedicated comparison: VoluChat vs Manychat (link-pushers vs in-chat checkout). |
| `/compare/interakt` | Dedicated comparison: VoluChat vs Interakt (shared inbox vs autonomous e-commerce automation). |
| `/compare/manual-reps` | Dedicated comparison: VoluChat vs hiring manual chat reps (cost, availability, consistency). |
| `/features` | Technical Capture -> Qualify -> Close -> Settle architecture deep-dive with DefinedTermSet schema. |
| `/what-is/comment-to-DM-automation` | Definitional page with extractable answer, 4-step flow, comparison, and FAQPage schema. |
| `/what-is/whatsapp-sales-bot` | Definitional page with bot types comparison, 4-step flow, and FAQPage schema. |
| `/glossary` | 20-term glossary across 5 categories with DefinedTermSet schema. |
| `/security` | Meta Business Cloud API compliance, catalog isolation, and discount margin floors. |
| `/integrations/shopify` | Shopify integration page — 5-step flow, what it reads, what it creates, security guardrails. |
| `/contact` | Pilot store intake qualification form (posts to N8N webhook). |
| `/about` | Mission and founder story. |

---

## 5. SEO & GEO (Generative Engine Optimization)

### Schema Strategy
- **Global schemas** (Organization, WebSite with SearchAction): injected in `Layout.astro`, prepended to all pages.
- **Homepage**: SoftwareApplication + ItemList + FAQPage schema.
- **Glossary**: DefinedTermSet with 20 DefinedTerm objects.
- **Features**: DefinedTermSet with 15 feature terms across 5 categories.
- **Definitional pages** (`/what-is/*`): WebPage + DefinedTerm + FAQPage schema each.
- **Blog posts**: Conditional HowTo schema (auto-detects step-like h2 headings).
- **Pricing**: Service schema.

### LLM Readability
- `public/llms.txt`: Product summary, category positioning ("e-commerce automation agent for Instagram & WhatsApp DMs"), competitor context, key pages list.
- Definitional one-liner in hero for LLM extraction.
- TL;DR excerpt block on blog posts.

### Keyword Positioning
- Primary: "e-commerce automation agent", "WhatsApp sales bot", "Instagram DM automation", "cart recovery WhatsApp", "upsell cross-sell chatbot"
- Avoid: "social commerce" (too vague) — replaced site-wide with specific terms.
- Compare pages target competitor brand queries ("Wati alternative", "Interakt vs", "Manychat vs").

---

## 6. Coding & Animation Conventions

- **Tailwind CSS v4**: Uses `@import "tailwindcss";` in `src/styles/global.css`.
- **GSAP Animation Rules**:
  - Always guard with `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
  - Keep animations snappy (durations between `0.3s` - `0.6s`, tight stagger `0.05s` - `0.1s`).
  - Use `ScrollTrigger` with `start: "top 80%"` and `toggleActions: "play none none reverse"`.
  - Use `gsap.from()` with `immediateRender: true` instead of `gsap.fromTo()` to prevent pop-in flashes.
  - Phone mockup: use `aspect-ratio` for stable dimensions before media loads.
- **SEO & Structured Data**:
  - Single conditional `<meta name="keywords" content={keywords} />` in `Layout.astro`.
  - Structured data injected via `structuredData` prop utilizing `faqSchema.mjs`.
  - Canonical URLs generated dynamically without trailing slashes.
- **Variable ordering in Astro frontmatter**: Top-to-bottom execution. Define variables before referencing them (e.g., `featureCategories` before `structuredData` that uses it).

---

## 7. Build & Deploy

```bash
npm install
npm run dev          # astro dev --host (local dev server)
npm run build        # astro build (SSR output for Vercel)
npm run preview      # astro preview
npm run lint         # eslint .
```

---

## 8. Links

- **GitHub**: https://github.com/voluchat
- **Website**: https://www.voluchat.com
- **Instagram**: https://www.instagram.com/voluchat
- **X/Twitter**: https://x.com/voluchat
- **LinkedIn**: https://www.linkedin.com/company/voluchat
- **YouTube**: https://www.youtube.com/@voluchat

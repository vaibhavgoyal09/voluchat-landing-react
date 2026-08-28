# AGENTS.md — VoluChat Landing

This file documents the architecture, directory layout, component hierarchy, positioning, and key patterns for the VoluChat marketing site. It is intended for AI coding agents (and human contributors) who need to understand the codebase before making changes.

---

## 1. Project Overview & Core Positioning

VoluChat is an **Autonomous WhatsApp Sales Automation Agent** platform for Instagram and WhatsApp connected to Shopify. It solves the critical revenue leak in DM-based selling: when shoppers comment on Instagram Reels or message in DMs at night, manual chat reps are offline or overwhelmed, and rigid chatbot builders (like Wati, Interakt, ManyChat) leak 70%+ of high-intent buyers.

VoluChat automates the complete 90-second comment-to-checkout loop:
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
│   ├── robots.txt
│   └── llms.txt                 # LLM-readable product summary and category positioning
│
├── src/
│   ├── layouts/
│   │   └── Layout.astro         # Root HTML wrapper: SEO meta, fonts, GSAP init, scroll reveal, global schemas
│   │
│   ├── components/
│   │   ├── Navbar.astro         # Fixed header (How It Works, Revenue Loop, Pricing, Guardrails, Compare, About)
│   │   ├── Hero.astro           # Sales automation hero with interactive 85-second live WhatsApp checkout simulation
│   │   ├── ProblemSection.astro # "The DM Revenue Leak" — 6 revenue leaks (LEAK-01 to LEAK-06)
│   │   ├── ProductLoopSection.astro # "The 90-Second Sales Loop" — 6-step visual execution flow
│   │   ├── TrustSection.astro   # "White-Glove & Controlled" — 4 trust cards + mid-page pilot CTA strip
│   │   ├── UseCasesSection.astro# "The 4-Pillar Revenue Engine" — Capture, Qualify, Close, Settle
│   │   ├── FounderNoteSection.astro # Founder blockquote & 10x value standard commitment
│   │   ├── GuardrailsSection.astro  # Snappy 4-card brand safety and margin protection stack
│   │   ├── FAQ.astro            # Accordion FAQ (Wati/Manychat comparison, pilot details, JSON-LD)
│   │   ├── Footer.astro         # Footer with pilot links, platform status, social links (incl. GitHub), and company info
│   │   ├── BlogCard.astro       # Reusable blog card component
│   │   └── CookieConsent.astro  # Analytics cookie consent banner (scroll + click accept)
│   │
│   ├── pages/
│   │   ├── index.astro          # Homepage — streamlined narrative flow
│   │   ├── features.astro       # WhatsApp sales automation architecture (Capture -> Qualify -> Close -> Settle) + DefinedTermSet schema
│   │   ├── pricing.astro        # Pilot cohort scope (100% white-glove setup & 10x ROI standard) + Service schema
│   │   ├── about.astro          # Mission & founder story
│   │   ├── contact.astro        # 10-store pilot intake qualification form
│   │   ├── compare.astro        # VoluChat vs Wati, Manychat, and manual chat reps (with honesty section)
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
│   │   │   ├── comment-to-DM-automation.astro # Definitional page with extractable answer, inline QAPage schemas
│   │   │   └── whatsapp-sales-bot.astro       # Definitional page with types comparison, inline QAPage schemas
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
│       └── faqSchema.mjs        # Centralized FAQ + QAPage schema helpers (getFaqSchema, getQAPageSchemas)
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
   - Definitional one-liner: *"What is VoluChat? A WhatsApp sales automation tool that uses AI to close Shopify orders in 90 seconds..."*
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
| `/compare` | Deep breakdown of VoluChat vs rigid flowchart bots (Wati/Interakt), link-pushers (ManyChat), and manual sales reps. Includes "When to choose the other tools" honesty section. |
| `/compare/wati` | Dedicated comparison: VoluChat vs Wati (flowchart menus vs AI conversation). |
| `/compare/manychat` | Dedicated comparison: VoluChat vs Manychat (link-pushers vs in-chat checkout). |
| `/compare/interakt` | Dedicated comparison: VoluChat vs Interakt (shared inbox vs autonomous sales). |
| `/compare/manual-reps` | Dedicated comparison: VoluChat vs hiring manual chat reps (cost, availability, consistency). |
| `/features` | Technical Capture -> Qualify -> Close -> Settle architecture deep-dive with DefinedTermSet schema. |
| `/what-is/comment-to-DM-automation` | Definitional page with extractable answer, 4-step flow, comparison, and 3 inline QAPage schemas. |
| `/what-is/whatsapp-sales-bot` | Definitional page with bot types comparison, 4-step flow, and 3 inline QAPage schemas. |
| `/glossary` | 20-term glossary across 5 categories with DefinedTermSet schema. |
| `/security` | Meta Business Cloud API compliance, catalog isolation, and discount margin floors. |
| `/contact` | Pilot store intake qualification form (posts to N8N webhook). |
| `/about` | Mission and founder story. |

---

## 5. SEO & GEO (Generative Engine Optimization)

### Schema Strategy
- **Global schemas** (Organization, WebSite with SearchAction): injected in `Layout.astro`, prepended to all pages.
- **Homepage**: SoftwareApplication + ItemList + 6 QAPage schemas.
- **Glossary**: DefinedTermSet with 20 DefinedTerm objects.
- **Features**: DefinedTermSet with 15 feature terms across 5 categories.
- **Definitional pages** (`/what-is/*`): WebPage + DefinedTerm + 3 inline QAPage schemas each.
- **Blog posts**: Conditional HowTo schema (auto-detects step-like h2 headings).
- **Pricing**: Service schema.

### LLM Readability
- `public/llms.txt`: Product summary, category positioning ("WhatsApp sales automation tool"), competitor context, key pages list.
- Definitional one-liner in hero for LLM extraction.
- TL;DR excerpt block on blog posts.

### Keyword Positioning
- Primary: "WhatsApp sales automation", "WhatsApp sales bot", "Instagram DM automation"
- Avoid: "social commerce" (too vague) — replaced site-wide with specific terms.
- Compare pages target competitor brand queries ("Wati alternative", "Interakt vs", "Manychat vs").

---

## 6. Coding & Animation Conventions

- **Tailwind CSS v4**: Uses `@import "tailwindcss";` in `src/styles/global.css`.
- **GSAP Animation Rules**:
  - Always guard with `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
  - Keep animations snappy (durations between `0.3s` - `0.6s`, tight stagger `0.05s` - `0.1s`).
  - Use `ScrollTrigger` with `start: "top 80%"` and `toggleActions: "play none none reverse"`.
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

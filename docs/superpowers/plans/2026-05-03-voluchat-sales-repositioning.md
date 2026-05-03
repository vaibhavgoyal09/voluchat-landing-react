# VoluChat Sales Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the VoluChat landing page from a tool-focused SaaS page into a high-converting sales page that emphasizes revenue growth, instant response value, and seamless WhatsApp conversion.

**Architecture:** Update Astro components (`Hero`, `Features`, `HowItWorks`, `Testimonials`, `CTA`) by replacing feature-centric copy with outcome-centric copy. No structural or style changes are required, only string and array content updates.

**Tech Stack:** Astro, Tailwind CSS

---

### Task 1: Update Hero Section

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Update Hero Headline and Subheadline**

Modify `src/components/Hero.astro`:
```astro
<!-- Around line 26 -->
<h1 id="hero-title" class="mt-4 text-4xl font-black leading-[1.1] tracking-tight text-slate-950 opacity-0 translate-y-8 sm:text-5xl lg:text-7xl">
  Stop typing. <br />
  <span class="text-gradient-primary">Start selling.</span>
</h1>

<p id="hero-description" class="mx-auto mt-8 max-w-3xl text-lg font-medium leading-relaxed text-slate-600 opacity-0 translate-y-8 sm:text-xl">
  Stores lose 20–40% of potential buyers due to delayed replies. Our smart chatbot replies to every Instagram comment and DM instantly, 24/7.
</p>

<div id="hero-actions" class="mt-8 flex flex-col items-center justify-center gap-4 opacity-0 translate-y-8 sm:flex-row">
  <a href="/contact" class="group inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-base font-bold text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:w-auto">
    Start capturing missed customers today
    <svg ...>...</svg>
  </a>
  ...
</div>
```

- [ ] **Step 2: Commit changes**

```bash
git add src/components/Hero.astro
git commit -m "copy: update hero for high-converting sales focus"
```

### Task 2: Revamp Features into Outcomes

**Files:**
- Modify: `src/components/Features.astro`

- [ ] **Step 1: Update the features array with outcome-based copy**

Modify `src/components/Features.astro`:
```astro
const features = [
  {
    title: "Catch Every Lead",
    description: "Start capturing and replying to customers within minutes of setup. Never let a comment go unnoticed.",
    stat: "Instant Reply",
  },
  {
    title: "Show customers exactly what they’re looking for",
    description: "Our AI understands what your customers want and shows them the right products instantly, increasing intent.",
    stat: "Smart Discovery",
  },
  {
    title: "Move serious buyers to WhatsApp",
    description: "When they are ready to buy, we move them to WhatsApp where they actually convert and pay securely.",
    stat: "High Conversion",
  },
  {
    title: "Keep Your Views High",
    description: "Replying inside Instagram tells the algorithm to push your Reels to more people, boosting your reach.",
    stat: "Algo Boost",
  },
  {
    title: "Automated Store Management",
    description: "Keep your products, prices, and stock ready for the chatbot to handle 90% of your store queries.",
    stat: "Hands-off",
  },
  {
    title: "Track Sales Growth",
    description: "See how many customers were captured and how much revenue was recovered in your dashboard.",
    stat: "ROI Tracking",
  },
];
```

- [ ] **Step 2: Commit changes**

```bash
git add src/components/Features.astro
git commit -m "copy: transform features into sales outcomes"
```

### Task 3: Refine How It Works (The Value Flow)

**Files:**
- Modify: `src/components/HowItWorks.astro`

- [ ] **Step 1: Update the steps array and header**

Modify `src/components/HowItWorks.astro`:
```astro
<!-- Header Section -->
<h2 class="text-5xl sm:text-7xl font-heading font-black text-slate-950 mb-10 leading-[1.05] tracking-tight">
  Start capturing and replying <br /><span class="text-gradient-primary">within minutes.</span>
</h2>

<!-- steps array -->
const steps = [
  {
    number: "01",
    icon: "link",
    title: "Connect Your Store",
    description: "Link Instagram and Facebook securely in seconds to start capturing every comment.",
    benefits: ["Official Meta Partnership", "1-Click Secure Connect", "No Password Required"],
  },
  {
    number: "02",
    icon: "workflow",
    title: "Sync Your Products",
    description: "Let the AI learn your catalog so it can find and show products to your customers instantly.",
    benefits: ["Auto-Product Discovery", "Instant Price & Size Checks", "Smart Recommendations"],
  },
  {
    number: "03",
    icon: "zap",
    title: "Watch Sales Grow",
    description: "The AI handles the repetitive questions and moves ready-to-buy customers to your WhatsApp.",
    benefits: ["90% Automated Queries", "Boosted Reel Reach", "High-Intent WhatsApp Leads"],
  },
];
```

- [ ] **Step 2: Commit changes**

```bash
git add src/components/HowItWorks.astro
git commit -m "copy: update how it works for faster time-to-value"
```

### Task 4: Enhance Social Proof and CTA

**Files:**
- Modify: `src/components/Testimonials.astro`
- Modify: `src/components/CTA.astro`

- [ ] **Step 1: Update Testimonials and CTA headlines**

Modify `src/components/Testimonials.astro` (around line 50):
```astro
<h2 class="text-5xl sm:text-7xl font-heading font-black text-slate-950 mb-10 leading-[1.05] tracking-tight">
  Real Proof. <br /><span class="text-gradient-primary">Real Revenue.</span>
</h2>
<p class="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">Join 500+ sellers who stopped missing sales and started scaling their Instagram.</p>
```

Modify `src/components/CTA.astro` (around line 18):
```astro
<h3 class="text-4xl md:text-5xl font-heading font-black text-slate-950 leading-[1.1] tracking-tighter mb-6">
  Ready to stop leaving <br />
  <span class="text-gradient-primary">money on the table?</span>
</h3>
<p class="text-slate-600 text-base font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
  See how many buyers you're missing right now. Start capturing every lead and closing more sales on WhatsApp.
</p>
<!-- CTA Button -->
<a href="/contact" ...>
  <span class="relative z-10">See how many buyers I'm missing</span>
  ...
</a>
```

- [ ] **Step 2: Commit changes**

```bash
git add src/components/Testimonials.astro src/components/CTA.astro
git commit -m "copy: finalize social proof and cta with urgency and proof focus"
```

### Task 5: Final Review and Verification

- [ ] **Step 1: Run dev server**
Run: `npm run dev`

- [ ] **Step 2: Verify copy across all components**
- [ ] **Step 3: Run lint**
Run: `npm run lint`

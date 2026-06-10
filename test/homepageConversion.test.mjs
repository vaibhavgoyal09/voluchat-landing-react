import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage leads with the slow-reply buyer-loss message", async () => {
  const hero = await readSource("src/components/Hero.astro");
  const index = await readSource("src/pages/index.astro");

  assert.match(hero, /Stop losing Instagram buyers to slow replies/);
  assert.match(index, /Stop losing Instagram buyers to slow replies \| VoluChat/);
});

test("homepage moves honest proof directly after the hero and removes standalone best-for section", async () => {
  const index = await readSource("src/pages/index.astro");

  assert.match(index, /<Hero \/>\s*<HeroTrustStrip \/>\s*<Testimonials \/>/);
  assert.doesNotMatch(index, /import BestFor/);
  assert.doesNotMatch(index, /<BestFor \/>/);
});

test("homepage shows a full-width setup assurance strip below the hero", async () => {
  const hero = await readSource("src/components/Hero.astro");
  const trustStrip = await readSource("src/components/HeroTrustStrip.astro");

  assert.doesNotMatch(hero, /Product question|Cart \+ delivery|WhatsApp-ready/);
  assert.match(trustStrip, /10 mins setup/);
  assert.match(trustStrip, /No coding required/);
  assert.match(trustStrip, /Cancel Anytime/);
});

test("homepage proof stays honest for early access", async () => {
  const sources = [
    await readSource("src/pages/index.astro"),
    await readSource("src/components/Hero.astro"),
    await readSource("src/components/Testimonials.astro"),
    await readSource("src/components/Pricing.astro"),
  ].join("\n");

  assert.match(sources, /Honest early access proof/);
  assert.match(sources, /No fake testimonials, inflated customer counts, or unsupported revenue claims/);
  assert.doesNotMatch(sources, /Trusted by|customers served|processed orders|\$2\.8M|15,000\+|2,500\+|42% faster|Loved by|closed 30% more orders/);
});

test("pricing uses outcome-focused early access copy and volume terms", async () => {
  const pricing = await readSource("src/components/Pricing.astro");

  assert.match(pricing, /Recover missed sales conversations automatically/);
  assert.match(pricing, /Reply to ready buyers 24\/7 without hiring another inbox shift/);
  assert.match(pricing, /Includes your first 1,000 customer conversations each month/);
  assert.match(pricing, /extra conversations are billed at Rs\. 5 each/);
});

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage leads with the slow-reply buyer-loss message", async () => {
  const hero = await readSource("src/components/Hero.astro");
  const index = await readSource("src/pages/index.astro");

  assert.match(hero, /Stop losing Instagram buyers to slow replies/);
  assert.match(index, /Instagram DM Automation for WhatsApp Orders \| VoluChat/);
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

test("pricing presents simple buyer-chat growth plans without credit language", async () => {
  const pricing = await readSource("src/components/Pricing.astro");

  assert.match(pricing, /Starter/);
  assert.match(pricing, /Rs\. 2,999\/month/);
  assert.match(pricing, /600 buyer chats\/month/);
  assert.match(pricing, /around 20\/day/);
  assert.match(pricing, /Growth/);
  assert.match(pricing, /Rs\. 5,999\/month/);
  assert.match(pricing, /1,500 buyer chats\/month/);
  assert.match(pricing, /around 50\/day/);
  assert.match(pricing, /High Volume/);
  assert.match(pricing, /Rs\. 12,999\/month/);
  assert.match(pricing, /3,000 buyer chats\/month/);
  assert.match(pricing, /around 100\/day/);
  assert.match(pricing, /Best for stores near 100 buyer chats\/day/);
  assert.match(pricing, /Recommended for 100\/day/);
  assert.match(pricing, /Scale/);
  assert.match(pricing, /Contact sales/);
  assert.match(pricing, /Above 3,000 buyer chats\/month/);
  assert.match(pricing, /No surprise charges/);
  assert.match(pricing, /Assisted Launch/);
  assert.doesNotMatch(pricing, /launch setup|setup fee|self-serve/i);
  assert.doesNotMatch(pricing, /High Volume is the recommended plan|Most popular|Target plan/);
  assert.doesNotMatch(pricing, /credit|credits|Rs\. 5 each|first 1,000 customer conversations/i);
});

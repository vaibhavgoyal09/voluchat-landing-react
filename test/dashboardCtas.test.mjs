import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const registerUrl = "https://dashboard.voluchat.com/register";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("primary acquisition CTAs send users to dashboard registration", async () => {
  const sources = [
    await readSource("src/components/Header.astro"),
    await readSource("src/components/Hero.astro"),
    await readSource("src/components/CTA.astro"),
    await readSource("src/components/Pricing.astro"),
    await readSource("src/pages/pricing.astro"),
    await readSource("src/components/Testimonials.astro"),
  ].join("\n");

  assert.match(sources, new RegExp(`href="${registerUrl}"`, "g"));
  assert.match(sources, /Start Free Setup/);
  assert.match(sources, /Watch Live Demo/);
  assert.doesNotMatch(sources, /Book demo|Book Demo|demo call/i);
});

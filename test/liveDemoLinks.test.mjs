import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const liveDemoUrl = "https://ig.me/m/airwalks.shoes";

test("homepage demo CTAs navigate to the live Instagram demo", async () => {
  const hero = await readFile(new URL("../src/components/Hero.astro", import.meta.url), "utf8");
  const testimonials = await readFile(new URL("../src/components/Testimonials.astro", import.meta.url), "utf8");

  assert.match(hero, new RegExp(`href="${liveDemoUrl}"`));
  assert.match(testimonials, new RegExp(`href="${liveDemoUrl}"`));
  assert.match(hero, />\s*Watch Live Demo\s*</);
  assert.match(testimonials, />\s*Watch Live Demo\s*</);
  assert.doesNotMatch(hero, /href="#demo" class="btn-secondary"/);
  assert.doesNotMatch(testimonials, /href="#demo" class="btn-secondary"/);
});

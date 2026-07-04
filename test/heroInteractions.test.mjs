import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readSource = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("hero exposes the approval-focused workflow mockup", async () => {
  const hero = await readSource("src/components/Hero.astro");

  assert.match(hero, /href="#workflows"/);
  assert.match(hero, /View example workflows/);
  assert.match(hero, /id="hero-core-status"/);
  assert.match(hero, /AI Recommendation/);
  assert.match(hero, /Discounted recovery message needs approval/);
  assert.match(hero, /Approve Offer/);
  assert.match(hero, /flex-col sm:flex-row/);
  assert.match(hero, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(hero, /mousemove/);
});

test("hero background depth stays CSS-only", async () => {
  const hero = await readSource("src/components/Hero.astro");

  assert.match(hero, /class="hero-bg-depth"/);
  assert.match(hero, /heroDepthDrift/);
  assert.match(hero, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(hero, /<canvas/i);
  assert.doesNotMatch(hero, /from "three"|from 'three'|import\("three"\)/);
});

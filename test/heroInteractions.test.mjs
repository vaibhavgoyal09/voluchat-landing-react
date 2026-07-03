import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readSource = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("hero exposes performant interactive workflow controls", async () => {
  const hero = await readSource("src/components/Hero.astro");

  assert.match(hero, /data-hero-command="recover"/);
  assert.match(hero, /data-hero-command="upsell"/);
  assert.match(hero, /data-hero-command="rules"/);
  assert.match(hero, /id="hero-signal-feed"/);
  assert.match(hero, /id="hero-core-status"/);
  assert.match(hero, /requestAnimationFrame/);
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

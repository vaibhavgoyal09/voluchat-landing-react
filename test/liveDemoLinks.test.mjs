import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("homepage demo CTAs navigate to the interactive demo sections", async () => {
  const hero = await readFile(new URL("../src/components/landing/Hero.astro", import.meta.url), "utf8");
  const footer = await readFile(new URL("../src/components/landing/Footer.astro", import.meta.url), "utf8");

  assert.match(hero, /href="#demo"/);
  assert.match(hero, /Book a Demo/);
  assert.match(footer, /id="demo"/);
  assert.match(footer, /href="\/contact"/);
  assert.match(footer, /Book a Demo/);
  assert.doesNotMatch(hero, /ig\.me/);
  assert.doesNotMatch(footer, /ig\.me/);
});

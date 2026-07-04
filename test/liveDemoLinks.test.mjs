import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("homepage revenue leak CTAs navigate to the conversion sections", async () => {
  const hero = await readFile(
    new URL("../src/components/Hero.astro", import.meta.url),
    "utf8",
  );
  const footer = await readFile(
    new URL("../src/components/Footer.astro", import.meta.url),
    "utf8",
  );

  assert.match(hero, /href="#workflows"/);
  assert.match(hero, /View example workflows/);
  assert.match(footer, /id="demo"/);
  assert.match(footer, /href="\/contact"/);
  assert.match(footer, /Book a workflow demo/);
  assert.doesNotMatch(hero, /ig\.me/);
  assert.doesNotMatch(footer, /ig\.me/);
});

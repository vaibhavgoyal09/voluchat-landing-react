import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readPricingPage = () =>
  readFile(new URL("../src/pages/pricing.astro", import.meta.url), "utf8");

test("pricing page uses closed tailored pricing", async () => {
  const page = await readPricingPage();

  assert.match(page, /Custom pricing/i);
  assert.match(page, /tailored to how your store actually operates/);
  assert.match(page, /Request Agent Review/);
  assert.match(page, /How we quote/);
  assert.doesNotMatch(
    page,
    /Starter Agent|Growth Suite|Scale Platform|Enterprise/,
  );
  assert.doesNotMatch(
    page,
    /Rs\. ?\d|actions\/month|fixed public tiers|preset public tiers/i,
  );
});

test("pricing page no longer advertises old 1000-chat overage pricing", async () => {
  const page = await readPricingPage();

  assert.doesNotMatch(page, /first 1,000 customer conversations/i);
  assert.doesNotMatch(page, /up to 1,000 conversations/i);
  assert.doesNotMatch(page, /Rs\. 5 each/i);
  assert.doesNotMatch(page, /extra conversations are billed/i);
});

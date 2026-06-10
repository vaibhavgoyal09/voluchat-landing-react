import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readPricingPage = () => readFile(new URL("../src/pages/pricing.astro", import.meta.url), "utf8");

test("pricing page uses a neutral comparison-first pricing system", async () => {
  const page = await readPricingPage();

  assert.match(page, /Scale predictably/);
  assert.match(page, /Choose by buyer-chat volume/);
  assert.match(page, /Compare all features/);
  assert.match(page, /Starter/);
  assert.match(page, /Growth/);
  assert.match(page, /High Volume/);
  assert.match(page, /Scale/);
  assert.match(page, /600 buyer chats/);
  assert.match(page, /1,500 buyer chats/);
  assert.match(page, /3,000 buyer chats/);
  assert.match(page, /Above 3,000 buyer chats/);
  assert.match(page, /Contact sales/);
  assert.match(page, /Advanced workflow limits/);
  assert.match(page, /Campaign surge planning/);
  assert.match(page, /No surprise charges/);
  assert.match(page, /Assisted Launch/);
  assert.match(page, /Workflow setup service/);
  assert.doesNotMatch(page, /launch setup|setup fee|self-serve/i);
  assert.match(page, /Recommended for stores near 100 buyer chats\/day/);
  assert.match(page, /overflow-x-auto/);
  assert.ok((page.match(/High Volume is the recommended plan/g) ?? []).length === 0);
  assert.ok((page.match(/Target plan/g) ?? []).length === 0);
  assert.ok((page.match(/Most popular/g) ?? []).length === 0);
  assert.doesNotMatch(page, /import PricingSection/);
  assert.doesNotMatch(page, /<PricingSection \/>/);
  assert.doesNotMatch(page, /Detailed plan comparison/);
});

test("pricing page no longer advertises old 1000-chat overage pricing", async () => {
  const page = await readPricingPage();

  assert.doesNotMatch(page, /first 1,000 customer conversations/i);
  assert.doesNotMatch(page, /up to 1,000 conversations/i);
  assert.doesNotMatch(page, /Rs\. 5 each/i);
  assert.doesNotMatch(page, /extra conversations are billed/i);
});

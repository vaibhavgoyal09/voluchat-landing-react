import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readSource = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("primary acquisition CTAs send users to the agent review flow with correct hrefs", async () => {
  const navbar = await readSource("src/components/Navbar.astro");
  const pricing = await readSource("src/pages/pricing.astro");
  const about = await readSource("src/pages/about.astro");
  const features = await readSource("src/pages/features.astro");

  const sources = [navbar, pricing, about, features].join("\n");

  // Verify that the text exists
  assert.match(sources, /Request Agent Review|Start Agent Review/);

  // Verify that the exact destination exists and is used in CTAs.
  assert.match(sources, /href="\/contact"/);
  assert.match(sources, /href:\s*"\/pricing"/);
  assert.match(sources, /href:\s*"\/features"/);
});

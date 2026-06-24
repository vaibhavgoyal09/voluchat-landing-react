import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage SEO matches the commerce agents positioning", async () => {
  const index = await readSource("src/pages/index.astro");
  const layout = await readSource("src/layouts/Layout.astro");
  const manifest = await readSource("public/manifest.json");

  assert.match(index, /Shopify AI Agents for Revenue Recovery \| VoluChat/);
  assert.match(layout, /VoluChat finds Shopify revenue leaks/);
  assert.match(manifest, /Shopify AI Agents for Revenue Recovery/);
});

test("homepage layout uses the new commerce agent platform structure", async () => {
  const index = await readSource("src/pages/index.astro");

  assert.match(index, /<Hero \/>\s*<ProblemSection \/>\s*<PlatformSection \/>\s*<UseCasesSection \/>\s*<ProductLoopSection \/>/);
  assert.match(index, /<GuardrailsSection \/>\s*<DemoFlowSection \/>\s*<FounderNoteSection \/>\s*<TrustSection \/>\s*<FAQ \/>\s*<\/main>\s*<Footer \/>/);
  assert.doesNotMatch(index, /CTASection/);
  assert.doesNotMatch(index, /import BestFor/);
  assert.doesNotMatch(index, /<BestFor \/>/);
});

test("homepage nav and footer wire to real sections and new pages", async () => {
  const navbar = await readSource("src/components/landing/Navbar.astro");
  const footer = await readSource("src/components/landing/Footer.astro");
  
  assert.match(navbar, /homeHref\("#platform"\)/);
  assert.match(navbar, /href:\s*"\/features"/);
  assert.match(navbar, /href:\s*"\/pricing"/);
  assert.match(navbar, /href:\s*"\/compare"/);
  assert.match(navbar, /href:\s*"\/about"/);

  assert.match(footer, /href="\/agents\/product-assistant"/);
  assert.match(footer, /href="\/agents\/cart-recovery"/);
  assert.match(footer, /href="\/integrations\/shopify"/);
  assert.match(footer, /href="\/about"/);

  const workflowsSection = await readSource("src/components/landing/UseCasesSection.astro");
  const demoFlowSection = await readSource("src/components/landing/DemoFlowSection.astro");
  const founderNote = await readSource("src/components/landing/FounderNoteSection.astro");

  assert.match(workflowsSection, /id="workflows"/);
  assert.match(workflowsSection, /\/agents\/cart-recovery/);
  assert.match(workflowsSection, /\/agents\/product-assistant/);
  assert.match(founderNote, /Founder note/);
  assert.match(footer, /id="demo"/);
  assert.match(demoFlowSection, /id="demo-flow"/);
});

test("pricing presents closed tailored pricing", async () => {
  const pricing = await readSource("src/pages/pricing.astro");

  assert.match(pricing, /Custom pricing/i);
  assert.match(pricing, /tailored pricing/);
  assert.doesNotMatch(pricing, /Rs\.|Starter Agent|Growth Suite|Scale Platform/);
});

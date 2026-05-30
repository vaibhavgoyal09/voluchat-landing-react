import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = async (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')
  .catch((error) => {
    if (error.code === 'ENOENT') {
      return '';
    }

    throw error;
  });

const [
  indexSource,
  heroSource,
  sceneSource,
  painSource,
  featuresSource,
  demoSource,
  cssSource,
] = await Promise.all([
  readSource('src/pages/index.astro'),
  readSource('src/components/Hero.astro'),
  readSource('src/components/HeroAutomationScene.astro'),
  readSource('src/components/PainPoints.astro'),
  readSource('src/components/Features.astro'),
  readSource('src/components/Demo.astro'),
  readSource('src/styles/global.css'),
]);

const landingSource = [
  indexSource,
  heroSource,
  sceneSource,
  painSource,
  featuresSource,
  demoSource,
  cssSource,
].join('\n');

test('redesigned landing page leads with a Framer-like SaaS hero and static checkout automation scene', () => {
  assert.match(indexSource, /<Hero \/>/);
  assert.match(indexSource, /<PainPoints \/>[\s\S]*<BestFor \/>[\s\S]*<Demo \/>[\s\S]*<Features \/>[\s\S]*<HowItWorks \/>[\s\S]*<CompactComparison \/>[\s\S]*<Pricing \/>[\s\S]*<Testimonials \/>[\s\S]*<FAQ \/>[\s\S]*<\/main>[\s\S]*<Footer \/>/);
  assert.doesNotMatch(indexSource, /import CTA from/);
  assert.doesNotMatch(indexSource, /<CTA \/>/);
  assert.match(heroSource, /import HeroAutomationScene from '\.\/HeroAutomationScene\.astro';/);
  assert.match(heroSource, /<HeroAutomationScene \/>/);
  assert.match(heroSource, /Turn More DMs Into Orders/);
  assert.match(heroSource, /<span aria-hidden="true" class="block">Turn More<\/span>/);
  assert.match(heroSource, /<span aria-hidden="true" class="accent-gradient-text block">DMs<\/span>/);
  assert.match(heroSource, /<span aria-hidden="true" class="block">Into Orders<\/span>/);
  assert.match(heroSource, /text-\[3\.45rem\][\s\S]*sm:text-\[4\.25rem\]/);
  assert.match(heroSource, /text-center[\s\S]*lg:text-left/);
  assert.match(heroSource, /VoluChat answers repeated product questions, recommends products from your catalog, collects delivery details, and sends customers to WhatsApp with the order message already filled in/);
  assert.match(heroSource, /Your team stays in control of confirmation and payment/);
  assert.match(heroSource, /hidden[\s\S]*sm:block/);
  assert.match(heroSource, /mt-7 hidden max-w-lg grid-cols-3/);
  assert.match(heroSource, /hero-metric-card/);
  assert.match(heroSource, /Incoming DM/);
  assert.match(heroSource, /Price, size, stock/);
  assert.match(heroSource, /VoluChat prepares/);
  assert.match(heroSource, /Cart \+ address/);
  assert.match(heroSource, /Store closes/);
  assert.match(heroSource, /WhatsApp order/);
  assert.doesNotMatch(heroSource, /<p class="mini-label">Replies<\/p>/);
  assert.doesNotMatch(heroSource, /<p class="mini-label">Layer<\/p>/);
  assert.doesNotMatch(heroSource, /<p class="mini-label">Trial<\/p>/);
  assert.doesNotMatch(sceneSource, /import \* as THREE from 'three';/);
  assert.doesNotMatch(sceneSource, /<canvas id="automation-scene"/);
  assert.match(sceneSource, /hero_demo\.mp4/);
  assert.match(sceneSource, /<video/);
  assert.match(sceneSource, /Screen recording showing VoluChat replying to social shoppers and preparing checkout context/);
  assert.doesNotMatch(sceneSource, /CatmullRomCurve3|SphereGeometry|LineBasicMaterial|requestAnimationFrame|motion-orbit/);
});

test('redesigned sections use motion surfaces without reverting to narrow boutique positioning', () => {
  assert.match(painSource, /Slow replies turn warm buyers cold/);
  assert.match(featuresSource, /Automate the repeat work before checkout/);
  assert.match(featuresSource, /DM replies/);
  assert.match(featuresSource, /Product matching/);
  assert.match(featuresSource, /WhatsApp handoff/);
  assert.match(featuresSource, /A DM agent tuned for product questions and WhatsApp order prep/);
  assert.doesNotMatch(featuresSource, /w-\[88%\]|w-\[72%\]|w-\[62%\]/);
  assert.doesNotMatch(featuresSource, /h-2 rounded-full bg-stone-200/);
  assert.match(demoSource, /From DM to WhatsApp order message/);
  assert.match(cssSource, /\.hero-stage/);
  assert.match(cssSource, /\.section-title\s*{\s*@apply text-\[2\.15rem\]/);
  assert.match(cssSource, /\.solid-card/);
  assert.match(cssSource, /\.dark-band/);
  assert.doesNotMatch(cssSource, /\.motion-orbit|orbitFloat|motion-orbit-delay/);
  assert.match(cssSource, /\.kinetic-card/);
  assert.match(cssSource, /\.ambient-noise/);
  assert.doesNotMatch(landingSource, /Fashion boutique|Instagram boutiques|yourboutique|boutique workflow/);
});

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
  assert.match(heroSource, /import HeroAutomationScene from '\.\/HeroAutomationScene\.astro';/);
  assert.match(heroSource, /<HeroAutomationScene \/>/);
  assert.match(heroSource, /Stop Losing Sales to Slow Replies/);
  assert.match(heroSource, /<span aria-hidden="true" class="block">Stop Losing<\/span>/);
  assert.match(heroSource, /<span aria-hidden="true" class="block">Sales<\/span>/);
  assert.match(heroSource, /<span aria-hidden="true" class="accent-gradient-text block">to Slow Replies<\/span>/);
  assert.match(heroSource, /text-\[2\.9rem\][\s\S]*sm:text-\[3\.7rem\]/);
  assert.match(heroSource, /24\/7 product reply and checkout agent/);
  assert.match(heroSource, /VoluChat answers Instagram comments and DMs 24\/7, builds carts, collects addresses, and prepares WhatsApp checkout text/);
  assert.match(heroSource, /hidden[\s\S]*sm:block/);
  assert.match(heroSource, /mt-7 hidden max-w-lg grid-cols-3/);
  assert.match(heroSource, /hero-metric-card/);
  assert.match(heroSource, /Buyer asks/);
  assert.match(heroSource, /Price, size, stock/);
  assert.match(heroSource, /Agent builds/);
  assert.match(heroSource, /Cart \+ address/);
  assert.match(heroSource, /Store confirms/);
  assert.match(heroSource, /UPI QR \+ order/);
  assert.doesNotMatch(heroSource, /<p class="mini-label">Replies<\/p>/);
  assert.doesNotMatch(heroSource, /<p class="mini-label">Layer<\/p>/);
  assert.doesNotMatch(heroSource, /<p class="mini-label">Trial<\/p>/);
  assert.doesNotMatch(sceneSource, /import \* as THREE from 'three';/);
  assert.doesNotMatch(sceneSource, /<canvas id="automation-scene"/);
  assert.match(sceneSource, /min-h-\[360px\]/);
  assert.match(sceneSource, /hidden rounded-\[1\.35rem\][\s\S]*sm:block/);
  assert.match(sceneSource, /Live checkout automation/);
  assert.match(sceneSource, /Linen Co-ord Set/);
  assert.match(sceneSource, /Checkout draft/);
  assert.match(sceneSource, /WhatsApp/);
  assert.doesNotMatch(sceneSource, /CatmullRomCurve3|SphereGeometry|LineBasicMaterial|requestAnimationFrame|motion-orbit/);
});

test('redesigned sections use premium motion surfaces without reverting to narrow boutique positioning', () => {
  assert.match(painSource, /The same questions and checkout steps hit every inbox/);
  assert.match(featuresSource, /A 24\/7 checkout agent for every product channel/);
  assert.match(featuresSource, /24\/7 reply agent/);
  assert.match(featuresSource, /Cart builder/);
  assert.match(featuresSource, /WhatsApp checkout/);
  assert.match(featuresSource, /UPI QR and confirm/);
  assert.doesNotMatch(featuresSource, /w-\[88%\]|w-\[72%\]|w-\[62%\]/);
  assert.doesNotMatch(featuresSource, /h-2 rounded-full bg-stone-200/);
  assert.match(demoSource, /Watch a product question become a checkout-ready WhatsApp draft/);
  assert.match(cssSource, /\.hero-stage/);
  assert.match(cssSource, /\.section-title\s*{\s*@apply text-\[2\.35rem\]/);
  assert.doesNotMatch(cssSource, /\.motion-orbit|orbitFloat|motion-orbit-delay/);
  assert.match(cssSource, /\.kinetic-card/);
  assert.match(cssSource, /\.ambient-noise/);
  assert.doesNotMatch(landingSource, /Fashion boutique|Instagram boutiques|yourboutique|boutique workflow/);
});

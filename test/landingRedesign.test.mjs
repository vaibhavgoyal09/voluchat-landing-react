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
  assert.match(heroSource, /Answer Product Questions on Instagram and Facebook Instantly/);
  assert.match(heroSource, /<span aria-hidden="true" class="block">Answer Product<\/span>/);
  assert.match(heroSource, /<span aria-hidden="true" class="block">Questions<\/span>/);
  assert.match(heroSource, /<span aria-hidden="true" class="accent-gradient-text block">on Instagram and Facebook<\/span>/);
  assert.match(heroSource, /text-\[2\.9rem\][\s\S]*sm:text-\[3\.7rem\]/);
  assert.match(heroSource, /VoluChat replies instantly to comments and DMs, suggests the right products, collects size and delivery details, and prepares a WhatsApp order message/);
  assert.match(heroSource, /It learns your catalog, tone, and store rules/);
  assert.match(heroSource, /hidden[\s\S]*sm:block/);
  assert.match(heroSource, /mt-7 hidden max-w-lg grid-cols-3/);
  assert.match(heroSource, /hero-metric-card/);
  assert.match(heroSource, /Comment or DM/);
  assert.match(heroSource, /Price, size, stock/);
  assert.match(heroSource, /VoluChat replies/);
  assert.match(heroSource, /Product \+ details/);
  assert.match(heroSource, /Store confirms/);
  assert.match(heroSource, /UPI QR \+ order/);
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

test('redesigned sections use premium motion surfaces without reverting to narrow boutique positioning', () => {
  assert.match(painSource, /The same questions and checkout steps hit every inbox/);
  assert.match(featuresSource, /Built for stores that do not want to design every bot path manually/);
  assert.match(featuresSource, /Prebuilt flows/);
  assert.match(featuresSource, /Less manual building/);
  assert.match(featuresSource, /Custom DM agent/);
  assert.match(featuresSource, /Prebuilt comment-to-DM flows plus a custom DM assistant/);
  assert.doesNotMatch(featuresSource, /w-\[88%\]|w-\[72%\]|w-\[62%\]/);
  assert.doesNotMatch(featuresSource, /h-2 rounded-full bg-stone-200/);
  assert.match(demoSource, /One product chat, ready to confirm on WhatsApp/);
  assert.match(cssSource, /\.hero-stage/);
  assert.match(cssSource, /\.section-title\s*{\s*@apply text-\[2\.15rem\]/);
  assert.match(cssSource, /\.solid-card/);
  assert.match(cssSource, /\.dark-band/);
  assert.doesNotMatch(cssSource, /\.motion-orbit|orbitFloat|motion-orbit-delay/);
  assert.match(cssSource, /\.kinetic-card/);
  assert.match(cssSource, /\.ambient-noise/);
  assert.doesNotMatch(landingSource, /Fashion boutique|Instagram boutiques|yourboutique|boutique workflow/);
});

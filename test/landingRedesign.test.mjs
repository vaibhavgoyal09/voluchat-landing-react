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

test('redesigned landing page leads with a Framer-like SaaS hero and 3D automation scene', () => {
  assert.match(indexSource, /<Hero \/>/);
  assert.match(heroSource, /import HeroAutomationScene from '\.\/HeroAutomationScene\.astro';/);
  assert.match(heroSource, /<HeroAutomationScene \/>/);
  assert.match(heroSource, /Stop Losing Sales to Slow Replies/);
  assert.match(heroSource, /Automate repetitive product replies/);
  assert.match(heroSource, /Instagram, Facebook Pages, and WhatsApp-native automation/);
  assert.match(heroSource, /hero-metric-card/);
  assert.match(sceneSource, /import \* as THREE from 'three';/);
  assert.match(sceneSource, /<canvas id="automation-scene"/);
  assert.match(sceneSource, /prefers-reduced-motion: reduce/);
  assert.match(sceneSource, /new THREE\.WebGLRenderer/);
  assert.match(sceneSource, /requestAnimationFrame\(animate\)/);
});

test('redesigned sections use premium motion surfaces without reverting to narrow boutique positioning', () => {
  assert.match(painSource, /Every repeated answer is a delay/);
  assert.match(featuresSource, /A faster reply layer for every product channel/);
  assert.match(demoSource, /Watch one question become a sales-ready reply/);
  assert.match(cssSource, /\.hero-stage/);
  assert.match(cssSource, /\.motion-orbit/);
  assert.match(cssSource, /\.kinetic-card/);
  assert.match(cssSource, /\.ambient-noise/);
  assert.doesNotMatch(landingSource, /Fashion boutique|Instagram boutiques|yourboutique|boutique workflow/);
});

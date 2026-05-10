import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const configSource = await readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8');

test('Astro is configured for Vercel SSR instead of static generation', () => {
  assert.match(configSource, /@astrojs\/vercel/);
  assert.match(configSource, /output:\s*['"]server['"]/);
  assert.match(configSource, /adapter:\s*vercel\(/);
});

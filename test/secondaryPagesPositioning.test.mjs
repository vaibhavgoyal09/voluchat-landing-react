import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pageFiles = [
  'src/layouts/Layout.astro',
  'src/pages/about.astro',
  'src/pages/features.astro',
  'src/pages/pricing.astro',
  'src/pages/contact.astro',
  'src/pages/blog/index.astro',
  'src/pages/blog/[slug].astro',
  'src/pages/privacy.astro',
  'src/pages/terms.astro',
];

const sourceByFile = Object.fromEntries(
  await Promise.all(
    pageFiles.map(async (file) => [
      file,
      await readFile(new URL(`../${file}`, import.meta.url), 'utf8'),
    ])
  )
);

const secondarySource = Object.values(sourceByFile).join('\n');

test('secondary pages use the shoe-store Instagram to WhatsApp positioning', () => {
  assert.match(sourceByFile['src/pages/features.astro'], /Features for Indian shoe stores/);
  assert.match(sourceByFile['src/pages/pricing.astro'], /Founding-store pricing for shoe sellers/);
  assert.match(sourceByFile['src/pages/contact.astro'], /Request a demo for your shoe store/);
  assert.match(sourceByFile['src/pages/about.astro'], /Built for shoe stores selling through Instagram and WhatsApp/);
  assert.match(sourceByFile['src/pages/blog/index.astro'], /Instagram and WhatsApp guides for shoe sellers/);
});

test('secondary pages avoid old broad SaaS positioning and unsupported proof', () => {
  assert.doesNotMatch(secondarySource, /massive growth|unlimited scale|high-growth D2C|scaling brand|social commerce workflow|future of social commerce/i);
  assert.doesNotMatch(secondarySource, /smart lead qualification|lead qualification|revenue growth tool|growth targets|metrics that drive your revenue/i);
  assert.doesNotMatch(secondarySource, /5M\+|98%|84%|<1s|100% Secure|first million|thousands of DMs/i);
  assert.doesNotMatch(secondarySource, /handmade jewelry|Online fashion seller|Facebook DM automation|Instagram & Facebook DM automation/i);
});

test('secondary page CTAs stay demo-first and shoe-store specific', () => {
  assert.match(sourceByFile['src/pages/blog/[slug].astro'], /See how VoluChat works for your shoe store/);
  assert.match(sourceByFile['src/pages/contact.astro'], /Shoe store details/);
  assert.match(sourceByFile['src/layouts/Layout.astro'], /Instagram DMs into WhatsApp-ready chats|Instagram comments into WhatsApp orders for Indian shoe stores/);
});

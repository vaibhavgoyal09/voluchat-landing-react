import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pageFiles = [
  'src/layouts/Layout.astro',
  'src/pages/about.astro',
  'src/pages/compare.astro',
  'src/pages/features.astro',
  'src/pages/pricing.astro',
  'src/pages/contact.astro',
  'src/pages/blog/index.astro',
  'src/pages/blog/[slug].astro',
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

test('secondary pages use team-scale ecommerce reply positioning', () => {
  assert.match(sourceByFile['src/pages/features.astro'], /Features for ecommerce sales teams/);
  assert.match(sourceByFile['src/pages/pricing.astro'], /Early pricing for Instagram commerce teams/);
  assert.match(sourceByFile['src/pages/contact.astro'], /Book a demo call for your Instagram store/);
  assert.match(sourceByFile['src/pages/about.astro'], /Built for teams losing sales to slow replies/);
  assert.match(sourceByFile['src/pages/blog/index.astro'], /Ecommerce sales team automation guides/);
});

test('secondary pages avoid old broad SaaS positioning and unsupported proof', () => {
  assert.doesNotMatch(secondarySource, /massive growth|unlimited scale|high-growth D2C|scaling brand|social commerce workflow|future of social commerce/i);
  assert.doesNotMatch(secondarySource, /smart lead qualification|lead qualification|revenue growth tool|growth targets|metrics that drive your revenue/i);
  assert.doesNotMatch(secondarySource, /5M\+|98%|84%|<1s|100% Secure|first million|thousands of DMs/i);
  assert.doesNotMatch(secondarySource, /first 10 stores only|fully compliant|highest level|Official Meta Tech Partner/i);
});

test('secondary page CTAs stay demo-first while shared metadata is broader', () => {
  assert.match(sourceByFile['src/pages/blog/[slug].astro'], /See how VoluChat works for ecommerce stores/);
  assert.match(sourceByFile['src/pages/contact.astro'], /Sales team details/);
  assert.match(sourceByFile['src/layouts/Layout.astro'], /repeated product questions across Instagram and Facebook Pages|ecommerce reply automation/);
  assert.doesNotMatch(secondarySource, /fashion boutiques|boutique sellers|your boutique|Boutique details|Instagram boutiques/i);
  assert.doesNotMatch(secondarySource, /many small teams|store owners track/i);
});

test('comparison page covers the approved competitor set without brittle superiority claims', () => {
  const compareSource = sourceByFile['src/pages/compare.astro'];

  assert.match(compareSource, /Manychat/);
  assert.match(compareSource, /WATI/);
  assert.match(compareSource, /Interakt/);
  assert.match(compareSource, /respond\.io/);
  assert.match(compareSource, /AiSensy/);
  assert.match(compareSource, /Gallabox/);
  assert.match(compareSource, /ecommerce product conversations/);
  assert.match(compareSource, /not a generic WhatsApp inbox/);
  assert.match(compareSource, /shared AI reply layer/);
  assert.doesNotMatch(compareSource, /\$\d|cheaper than|better than|#1|best/i);
});

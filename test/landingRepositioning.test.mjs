import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sourceFiles = [
  'src/pages/index.astro',
  'src/layouts/Layout.astro',
  'src/components/Hero.astro',
  'src/components/PainPoints.astro',
  'src/components/Features.astro',
  'src/components/Demo.astro',
  'src/components/HowItWorks.astro',
  'src/components/Pricing.astro',
  'src/components/Testimonials.astro',
  'src/components/FAQ.astro',
  'src/components/CTA.astro',
  'src/components/Header.astro',
  'src/components/Footer.astro',
];

const sources = await Promise.all(
  sourceFiles.map(async (file) => [
    file,
    await readFile(new URL(`../${file}`, import.meta.url), 'utf8'),
  ])
);

const sourceByFile = Object.fromEntries(sources);
const landingSource = Object.values(sourceByFile).join('\n');

test('homepage leads with the approved shoe-store Instagram to WhatsApp message', () => {
  assert.match(sourceByFile['src/components/Hero.astro'], /Turn <span class="text-gradient-primary">"price\?" comments<\/span><br \/>\s*into <span class="text-gradient-primary">WhatsApp orders<\/span>/);
  assert.match(sourceByFile['src/components/Hero.astro'], /Built for Indian shoe stores selling through Instagram Reels and WhatsApp/);
  assert.match(sourceByFile['src/components/Hero.astro'], /Now onboarding a small batch of founding stores with hands-on setup/);
});

test('homepage hero uses the reviewed premium visual treatment', () => {
  const heroSource = sourceByFile['src/components/Hero.astro'];

  assert.match(heroSource, /Official Meta Tech Partner/);
  assert.doesNotMatch(heroSource, /Connects through Meta APIs/);
  assert.match(heroSource, /id="hero-title"[^>]*text-slate-950/);
  assert.doesNotMatch(heroSource, /id="hero-title"[^>]*text-gradient-primary/);
  assert.match(heroSource, /<span class="text-gradient-primary">"price\?" comments<\/span>/);
  assert.match(heroSource, /<span class="text-gradient-primary">WhatsApp orders<\/span>/);
  assert.match(heroSource, /Reel comment captured/);
  assert.match(heroSource, /DM assistant active/);
  assert.match(heroSource, /Shoe details collected/);
  assert.match(heroSource, /WhatsApp handoff ready/);
});

test('homepage primary buttons use charcoal accents instead of title-gradient colors', () => {
  const buttonSources = [
    'src/components/Hero.astro',
    'src/components/PainPoints.astro',
    'src/components/Header.astro',
    'src/components/Pricing.astro',
    'src/components/Testimonials.astro',
    'src/components/CTA.astro',
  ];
  const requestDemoButtonClasses = buttonSources.flatMap((file) => (
    [...sourceByFile[file].matchAll(/<a href="\/contact" class="([^"]+)">(?:(?!<\/a>)[\s\S])*Request Demo(?:(?!<\/a>)[\s\S])*<\/a>/g)]
      .map((match) => match[1])
  ));
  const buttonSource = requestDemoButtonClasses.join('\n');

  assert.ok(requestDemoButtonClasses.length >= 7, 'Expected homepage Request Demo primary buttons to be covered');
  assert.doesNotMatch(buttonSource, /from-indigo-600[^"]*(via-violet-600|to-violet-600|to-blue-600)|shadow-indigo-500|hover:shadow-violet/);
  assert.match(buttonSource, /bg-zinc-900[^"]*hover:bg-zinc-800/);
});

test('homepage layout does not render floating contact buttons', () => {
  const layoutSource = sourceByFile['src/layouts/Layout.astro'];

  assert.doesNotMatch(layoutSource, /ContactButtons/);
  assert.doesNotMatch(layoutSource, /<ContactButtons\s*\/>/);
});

test('homepage replaces fake proof with founding-store positioning', () => {
  assert.match(sourceByFile['src/components/Testimonials.astro'], /Now onboarding founding shoe stores in India/);
  assert.match(sourceByFile['src/components/Testimonials.astro'], /No fake case studies/);
  assert.doesNotMatch(landingSource, /500\+|Loved by|Join 500|Real Proof|Global Praise|closed 30% more orders|Priya Sharma|Rahul Verma|Sneha Patel|Arjun Mehta|Ananya Singh|Vikram Reddy|50 to 200 orders per month|Best investment|response time went from 3 hours to instant|84%|90% Automated Queries|100% Compliance Rate|80% Efficiency Lift|AI Latency|Efficiency Lift|Compliance Rate/);
  assert.doesNotMatch(sourceByFile['src/components/Hero.astro'], />84<[^]*?>%<|w-\[84%\]|Automated[\s\S]*?>84<[^]*?>%/);
});

test('homepage public copy avoids jargon-heavy positioning', () => {
  assert.doesNotMatch(landingSource, /\bfunnel\b/i);
  assert.doesNotMatch(landingSource, /lead qualification/i);
  assert.doesNotMatch(landingSource, /conversion engine/i);
  assert.doesNotMatch(landingSource, /\blifecycle\b/i);
  assert.doesNotMatch(landingSource, /growth stack/i);
});

test('homepage FAQ schema is aligned with the new shoe-store questions', () => {
  const indexSource = sourceByFile['src/pages/index.astro'];
  const schemaMatch = indexSource.match(/const faqSchema = ([\s\S]*?);\n---/);
  assert.ok(schemaMatch, 'Expected src/pages/index.astro to define const faqSchema before frontmatter closes');
  const faqSchemaSource = schemaMatch[1];

  assert.match(faqSchemaSource, /"name": "What happens after a customer comments on my Reel\?"/);
  assert.match(faqSchemaSource, /"name": "Can VoluChat answer shoe-specific questions\?"/);
  assert.match(faqSchemaSource, /"name": "Does it support Hindi or Hinglish\?"/);
  assert.match(faqSchemaSource, /"name": "How does the WhatsApp handoff work\?"/);
});

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

test('homepage leads with the approved AI DM helpdesk positioning', () => {
  assert.match(sourceByFile['src/components/Hero.astro'], /AI DM helpdesk for Instagram stores/);
  assert.match(sourceByFile['src/components/Hero.astro'], /VoluChat replies instantly, handles repeat buyer questions, finds products from your catalog, and prepares clean WhatsApp chats for your staff to close/);
  assert.match(sourceByFile['src/components/Hero.astro'], /24\/7 AI DM Helpdesk/);
});

test('homepage hero uses the approved workload-first premium visual treatment', () => {
  const heroSource = sourceByFile['src/components/Hero.astro'];

  assert.match(heroSource, /AI DM Helpdesk/);
  assert.match(heroSource, /DM workload reduced/);
  assert.match(heroSource, /Late replies/);
  assert.match(heroSource, /Repeat questions/);
  assert.match(heroSource, /Product search/);
  assert.match(heroSource, /WhatsApp handoff/);
  assert.match(heroSource, /hero-wave/);
  assert.match(heroSource, /helpdesk-hub/);
  assert.doesNotMatch(heroSource, /Turn <span class="text-gradient-primary">"price\?" comments<\/span>/);
  assert.doesNotMatch(heroSource, /Official Meta Tech Partner/);
});

test('homepage sections carry the workload-first AI helpdesk story', () => {
  assert.match(sourceByFile['src/components/PainPoints.astro'], /The real DM workload/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Your staff should not spend the day chasing basic DM details/);
  assert.match(sourceByFile['src/components/Features.astro'], /AI helpdesk capabilities/);
  assert.match(sourceByFile['src/components/Features.astro'], /The first layer of DM work, handled before staff steps in/);
  assert.match(sourceByFile['src/components/Demo.astro'], /From messy Instagram DM to clean WhatsApp handoff/);
  assert.match(sourceByFile['src/components/Demo.astro'], /Final order and payment stay manual/);
  assert.match(sourceByFile['src/components/HowItWorks.astro'], /Set up the AI helpdesk around your real DM workflow/);
  assert.match(sourceByFile['src/components/Pricing.astro'], /Image search and vector product matching/);
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

test('homepage replaces fake proof with honest workload-first positioning', () => {
  assert.match(sourceByFile['src/components/Testimonials.astro'], /Built from real DM workload/);
  assert.match(sourceByFile['src/components/Testimonials.astro'], /No fake case studies/);
  assert.match(sourceByFile['src/components/Testimonials.astro'], /founding stores/i);
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

test('homepage FAQ schema is aligned with the AI DM helpdesk questions', () => {
  const indexSource = sourceByFile['src/pages/index.astro'];
  const schemaMatch = indexSource.match(/const faqSchema = ([\s\S]*?);\n---/);
  assert.ok(schemaMatch, 'Expected src/pages/index.astro to define const faqSchema before frontmatter closes');
  const faqSchemaSource = schemaMatch[1];

  assert.match(faqSchemaSource, /"name": "What does VoluChat do for my Instagram DMs\?"/);
  assert.match(faqSchemaSource, /"name": "Can VoluChat find products from photos or buyer messages\?"/);
  assert.match(faqSchemaSource, /"name": "Does VoluChat manage cart, address, and offer details\?"/);
  assert.match(faqSchemaSource, /"name": "Does VoluChat process orders or payments\?"/);
});

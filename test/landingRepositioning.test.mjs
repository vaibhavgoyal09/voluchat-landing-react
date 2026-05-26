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

test('homepage leads with the approved WhatsApp-ready chat positioning', () => {
  assert.match(sourceByFile['src/components/Hero.astro'], /Turn Instagram interest into WhatsApp-ready boutique chats/);
  assert.match(sourceByFile['src/components/Hero.astro'], /VoluChat replies to Instagram shoppers, answers product questions, checks catalog details, and prepares clean WhatsApp handoffs for your boutique team/);
  assert.match(sourceByFile['src/components/Hero.astro'], /14-day free trial/);
});

test('homepage hero uses boutique-first examples instead of shoe-store examples', () => {
  const heroSource = sourceByFile['src/components/Hero.astro'];

  assert.match(heroSource, /Fashion boutique/);
  assert.match(heroSource, /linen co-ord set/);
  assert.match(heroSource, /Size M/);
  assert.match(heroSource, /Pune 411014/);
  assert.match(heroSource, /WhatsApp handoff/);
  assert.doesNotMatch(heroSource, /White Runner|sneaker|trainer|UK SIZE|1 Pair/i);
  assert.doesNotMatch(heroSource, /Official Meta Tech Partner/);
});

test('homepage sections carry the workload-first AI helpdesk story', () => {
  assert.match(sourceByFile['src/components/PainPoints.astro'], /The daily DM workload for Instagram boutiques/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Your team should not spend the day repeating price, size, color, COD, and delivery replies/);
  assert.match(sourceByFile['src/components/Features.astro'], /AI helpdesk capabilities for boutique sellers/);
  assert.match(sourceByFile['src/components/Features.astro'], /The first layer of boutique DM work, handled before staff steps in/);
  assert.match(sourceByFile['src/components/Demo.astro'], /From messy Instagram DM to clean WhatsApp handoff/);
  assert.match(sourceByFile['src/components/Demo.astro'], /Final order and payment stay manual/);
  assert.match(sourceByFile['src/components/HowItWorks.astro'], /Set up VoluChat around your boutique workflow/);
  assert.match(sourceByFile['src/components/Pricing.astro'], /Try the boutique workflow free for 14 days/);
});

test('homepage primary buttons lead with the 14-day trial', () => {
  const buttonSources = [
    'src/components/Hero.astro',
    'src/components/PainPoints.astro',
    'src/components/Header.astro',
    'src/components/Pricing.astro',
    'src/components/Testimonials.astro',
    'src/components/CTA.astro',
  ];
  const trialButtonClasses = buttonSources.flatMap((file) => (
    [...sourceByFile[file].matchAll(/<a href="\/contact" class="([^"]+)">(?:(?!<\/a>)[\s\S])*14-day free trial(?:(?!<\/a>)[\s\S])*<\/a>/gi)]
      .map((match) => match[1])
  ));
  const buttonSource = trialButtonClasses.join('\n');

  assert.ok(trialButtonClasses.length >= 5, 'Expected homepage trial primary buttons to be covered');
  assert.doesNotMatch(buttonSource, /from-indigo-600[^"]*(via-violet-600|to-violet-600|to-blue-600)|shadow-indigo-500|hover:shadow-violet/);
  assert.match(buttonSource, /bg-zinc-950|bg-zinc-900/);
});

test('homepage layout does not render floating contact buttons', () => {
  const layoutSource = sourceByFile['src/layouts/Layout.astro'];

  assert.doesNotMatch(layoutSource, /ContactButtons/);
  assert.doesNotMatch(layoutSource, /<ContactButtons\s*\/>/);
});

test('homepage replaces fake proof with honest early-stage positioning', () => {
  assert.match(sourceByFile['src/components/Testimonials.astro'], /Built with early boutique sellers/);
  assert.match(sourceByFile['src/components/Testimonials.astro'], /No fake case studies/);
  assert.match(sourceByFile['src/components/Testimonials.astro'], /Try it for 14 days/i);
  assert.doesNotMatch(landingSource, /500\+|Loved by|Join 500|Real Proof|Global Praise|closed 30% more orders|Priya Sharma|Rahul Verma|Sneha Patel|Arjun Mehta|Ananya Singh|Vikram Reddy|50 to 200 orders per month|Best investment|response time went from 3 hours to instant|84%|90% Automated Queries|100% Compliance Rate|80% Efficiency Lift|AI Latency|Efficiency Lift|Compliance Rate/);
  assert.doesNotMatch(landingSource, /first 10 stores only|Founding members: 10 stores only|100% Secure|fully compliant|highest level/i);
  assert.doesNotMatch(sourceByFile['src/components/Hero.astro'], />84<[^]*?>%<|>98<[^]*?>%<|w-\[84%\]|Automated[\s\S]*?>84<[^]*?>%|98% Match/);
});

test('homepage public copy avoids jargon-heavy positioning', () => {
  assert.doesNotMatch(landingSource, /\bfunnel\b/i);
  assert.doesNotMatch(landingSource, /lead qualification/i);
  assert.doesNotMatch(landingSource, /conversion engine/i);
  assert.doesNotMatch(landingSource, /\blifecycle\b/i);
  assert.doesNotMatch(landingSource, /growth stack/i);
  assert.doesNotMatch(landingSource, /pre-qualified lead/i);
});

test('homepage FAQ schema is aligned with the WhatsApp-ready chat questions', () => {
  const indexSource = sourceByFile['src/pages/index.astro'];
  const schemaMatch = indexSource.match(/const faqSchema = ([\s\S]*?);\n---/);
  assert.ok(schemaMatch, 'Expected src/pages/index.astro to define const faqSchema before frontmatter closes');
  const faqSchemaSource = schemaMatch[1];

  assert.match(faqSchemaSource, /"name": "How does VoluChat help fashion boutiques turn Instagram DMs into WhatsApp-ready chats\?"/);
  assert.match(faqSchemaSource, /"name": "Can VoluChat find products from photos or buyer messages\?"/);
  assert.match(faqSchemaSource, /"name": "Does VoluChat manage cart, address, and offer details\?"/);
  assert.match(faqSchemaSource, /"name": "Does VoluChat process orders or payments\?"/);
  assert.match(faqSchemaSource, /"name": "How is VoluChat different from Manychat, WATI, Interakt, respond.io, AiSensy, or Gallabox\?"/);
});

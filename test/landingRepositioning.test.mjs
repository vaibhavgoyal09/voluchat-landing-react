import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sourceFiles = [
  'src/pages/index.astro',
  'src/layouts/Layout.astro',
  'src/components/Hero.astro',
  'src/components/HeroAutomationScene.astro',
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

test('homepage leads with the approved slow-reply sales positioning', () => {
  assert.match(sourceByFile['src/components/Hero.astro'], /Stop Losing Sales to Slow Replies/);
  assert.match(sourceByFile['src/components/Hero.astro'], /AI reply layer for ecommerce sales teams/);
  assert.match(sourceByFile['src/components/Hero.astro'], /Instagram, Facebook Pages, and WhatsApp workflows/);
  assert.match(sourceByFile['src/components/Hero.astro'], /Repeated price, size, stock, delivery, and offer questions/);
  assert.match(sourceByFile['src/components/Hero.astro'], /14-day free trial/);
});

test('homepage hero uses broad high-consideration ecommerce examples', () => {
  const heroSource = `${sourceByFile['src/components/Hero.astro']}\n${sourceByFile['src/components/HeroAutomationScene.astro']}`;

  assert.match(heroSource, /Automate repetitive product replies/);
  assert.match(heroSource, /shoe stores, accessories, premium fashion, jewelry, beauty, and other product-heavy stores/);
  assert.match(heroSource, /one inbox or many/);
  assert.match(heroSource, /5-10 people handling sales conversations/);
  assert.match(heroSource, /premium sneaker/i);
  assert.match(heroSource, /UK 9/);
  assert.match(heroSource, /Pune 411014/);
  assert.match(heroSource, /Facebook Page/);
  assert.doesNotMatch(heroSource, /Official Meta Tech Partner/);
});

test('homepage sections carry the workload-first AI helpdesk story', () => {
  assert.match(sourceByFile['src/components/PainPoints.astro'], /The repeated-question workload/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /same questions hit every inbox/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Slow manual replies cost sales when shoppers are comparing options/);
  assert.match(sourceByFile['src/components/Features.astro'], /AI reply layer for ecommerce sales teams/);
  assert.match(sourceByFile['src/components/Features.astro'], /The repeated questions handled before a sales rep steps in/);
  assert.match(sourceByFile['src/components/Demo.astro'], /Repeated product questions, answered automatically/);
  assert.match(sourceByFile['src/components/Demo.astro'], /shoe, fashion, beauty, jewelry, or accessory store/);
  assert.match(sourceByFile['src/components/HowItWorks.astro'], /Set up VoluChat around your store workflow/);
  assert.match(sourceByFile['src/components/HowItWorks.astro'], /one inbox or many/);
  assert.match(sourceByFile['src/components/Pricing.astro'], /Try automated replies free for 14 days/);
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
  assert.doesNotMatch(buttonSource, /bg-zinc-950|bg-zinc-900|bg-stone-950|bg-black|rounded-xl|rounded-2xl/);
  assert.ok(trialButtonClasses.every((className) => className.includes('btn-primary')), 'Expected trial CTAs to use the shared primary button style');
});

test('homepage layout does not render floating contact buttons', () => {
  const layoutSource = sourceByFile['src/layouts/Layout.astro'];

  assert.doesNotMatch(layoutSource, /ContactButtons/);
  assert.doesNotMatch(layoutSource, /<ContactButtons\s*\/>/);
});

test('homepage replaces fake proof with honest early-stage positioning', () => {
  assert.match(sourceByFile['src/components/Testimonials.astro'], /Built with early ecommerce sellers/);
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

  assert.match(faqSchemaSource, /"name": "How does VoluChat stop ecommerce stores losing sales to slow replies\?"/);
  assert.match(faqSchemaSource, /"name": "Can VoluChat find products from photos or buyer messages\?"/);
  assert.match(faqSchemaSource, /"name": "Can VoluChat support multiple sales reps or WhatsApp numbers\?"/);
  assert.match(faqSchemaSource, /"name": "Does VoluChat manage cart, address, and offer details\?"/);
  assert.match(faqSchemaSource, /"name": "Does VoluChat process orders or payments\?"/);
  assert.match(faqSchemaSource, /"name": "How is VoluChat different from Manychat, WATI, Interakt, respond.io, AiSensy, or Gallabox\?"/);
});

test('homepage avoids owner-only or small-team positioning', () => {
  assert.doesNotMatch(landingSource, /many small teams|store owners track/i);
  assert.match(landingSource, /one owner or a 5-10 person sales team/);
  assert.match(landingSource, /consistent answers across agents/);
});

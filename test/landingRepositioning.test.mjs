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

test('homepage leads with the approved checkout-agent positioning', () => {
  assert.match(sourceByFile['src/components/Hero.astro'], /Turn More DMs Into Orders/);
  assert.match(sourceByFile['src/components/Hero.astro'], /VoluChat answers repeated product questions, recommends products from your catalog, collects delivery details, and sends customers to WhatsApp with the order message already filled in/);
  assert.match(sourceByFile['src/components/Hero.astro'], /Your team stays in control of confirmation and payment/);
  assert.match(sourceByFile['src/components/Hero.astro'], /For Instagram stores closing on WhatsApp/);
  assert.match(sourceByFile['src/components/Hero.astro'], /Cart \+ address/);
  assert.match(sourceByFile['src/components/Hero.astro'], /mt-3 hidden max-w-lg/);
  assert.match(sourceByFile['src/components/Hero.astro'], /mt-7 hidden max-w-lg grid-cols-3/);
  assert.match(sourceByFile['src/components/Hero.astro'], /Book demo call/);
});

test('homepage hero uses the DM-to-order pilot flow', () => {
  const heroSource = `${sourceByFile['src/components/Hero.astro']}\n${sourceByFile['src/components/HeroAutomationScene.astro']}`;

  assert.match(heroSource, /Turn More DMs Into Orders/);
  assert.doesNotMatch(sourceByFile['src/components/Hero.astro'], /Instagram-first stores with high comment volume/);
  assert.doesNotMatch(sourceByFile['src/components/Hero.astro'], /50K\+ followers/);
  assert.match(heroSource, /hero_demo\.mp4/);
  assert.match(heroSource, /social shoppers and preparing checkout context/);
  assert.match(heroSource, /Price, size, stock/);
  assert.match(heroSource, /Cart \+ address/);
  assert.match(heroSource, /WhatsApp order/);
  assert.doesNotMatch(sourceByFile['src/components/HeroAutomationScene.astro'], /sneaker|runner|Cloud Runner|white_runner/i);
  assert.doesNotMatch(heroSource, /Official Meta Tech Partner/);
});

test('homepage sections carry the DM-to-order story', () => {
  assert.match(sourceByFile['src/components/PainPoints.astro'], /The DM workload/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Slow replies turn warm buyers cold/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Warm buyers wait too long/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Your team repeats the same work/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /WhatsApp handoffs start messy/);
  assert.doesNotMatch(sourceByFile['src/components/PainPoints.astro'], /Questions repeat across every inbox|Slow replies leak buyers|Teams duplicate manual work|same question in three stores|typing the same answer|Messages arrive from every channel|Product context is scattered|Sales handoffs start cold/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Incoming chats/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Ready buyers/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /waiting for answers/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Repeated replies/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Same details/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /WhatsApp checkout/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Ready order/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /less back-and-forth/);
  assert.doesNotMatch(sourceByFile['src/components/PainPoints.astro'], /Manual reply|Repeated Qs|6 min|buyer waits|automation layer/);
  assert.match(sourceByFile['src/components/Features.astro'], /Automate the repeat work before checkout/);
  assert.match(sourceByFile['src/components/Features.astro'], /A DM agent tuned for product questions and WhatsApp order prep/);
  assert.match(sourceByFile['src/components/Demo.astro'], /From DM to WhatsApp order message/);
  assert.match(sourceByFile['src/components/Demo.astro'], /complete WhatsApp message/);
  assert.match(sourceByFile['src/components/HowItWorks.astro'], /Launch around your existing selling process/);
  assert.match(sourceByFile['src/components/HowItWorks.astro'], /Connect sales channels[\s\S]*Add your catalog and rules[\s\S]*Tune the WhatsApp handoff/);
  assert.match(sourceByFile['src/components/HowItWorks.astro'], /shipping, returns, COD/);
  assert.doesNotMatch(sourceByFile['src/components/HowItWorks.astro'], /Configure checkout flow|checkout message format/);
  assert.match(sourceByFile['src/components/Pricing.astro'], /Early pricing for DM-to-order automation/);
});

test('homepage primary buttons lead with the demo call', () => {
  const buttonSources = [
    'src/components/Hero.astro',
    'src/components/PainPoints.astro',
    'src/components/Header.astro',
    'src/components/Pricing.astro',
    'src/components/Testimonials.astro',
    'src/components/CTA.astro',
  ];
  const demoButtonClasses = buttonSources.flatMap((file) => (
    [...sourceByFile[file].matchAll(/<a href="\/contact" class="([^"]+)">(?:(?!<\/a>)[\s\S])*Book demo call(?:(?!<\/a>)[\s\S])*<\/a>/gi)]
      .map((match) => match[1])
  ));
  const buttonSource = demoButtonClasses.join('\n');

  assert.ok(demoButtonClasses.length >= 5, 'Expected homepage demo primary buttons to be covered');
  assert.doesNotMatch(buttonSource, /from-indigo-600[^"]*(via-violet-600|to-violet-600|to-blue-600)|shadow-indigo-500|hover:shadow-violet/);
  assert.doesNotMatch(buttonSource, /bg-zinc-950|bg-zinc-900|bg-stone-950|bg-black|rounded-xl|rounded-2xl/);
  assert.ok(demoButtonClasses.every((className) => className.includes('btn-primary')), 'Expected demo CTAs to use the shared primary button style');
});

test('homepage layout does not render floating contact buttons', () => {
  const layoutSource = sourceByFile['src/layouts/Layout.astro'];

  assert.doesNotMatch(layoutSource, /ContactButtons/);
  assert.doesNotMatch(layoutSource, /<ContactButtons\s*\/>/);
});

test('homepage replaces fake proof with honest early-stage positioning', () => {
  assert.match(sourceByFile['src/components/Testimonials.astro'], /Transparent proof/);
  assert.match(sourceByFile['src/components/Testimonials.astro'], /Early access, no inflated proof/);
  assert.match(sourceByFile['src/components/Testimonials.astro'], /No fake client logos/);
  assert.match(sourceByFile['src/components/Testimonials.astro'], /30-day money-back guarantee/i);
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

  assert.match(faqSchemaSource, /"name": "How does VoluChat turn DMs into orders\?"/);
  assert.match(faqSchemaSource, /"name": "Can VoluChat recommend products from my catalog\?"/);
  assert.match(faqSchemaSource, /"name": "What happens when the customer is ready to order\?"/);
  assert.match(faqSchemaSource, /"name": "Does VoluChat process payments or fully confirm orders\?"/);
  assert.match(faqSchemaSource, /"name": "Will my team still control the final sale\?"/);
  assert.match(faqSchemaSource, /"name": "How much does VoluChat cost\?"/);
});

test('homepage avoids owner-only or small-team positioning', () => {
  assert.doesNotMatch(landingSource, /many small teams|store owners track/i);
  assert.match(landingSource, /turn more DMs into orders|WhatsApp order/);
});

test('homepage avoids overclaiming final checkout automation', () => {
  assert.doesNotMatch(landingSource, /VoluChat processes payments|VoluChat fully confirms orders|closes sales while you sleep|fully automate/i);
  assert.match(landingSource, /Your team stays in control of confirmation and payment/);
});

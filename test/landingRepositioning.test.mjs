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
  assert.match(sourceByFile['src/components/Hero.astro'], /Stop Losing Sales to Slow Replies/);
  assert.match(sourceByFile['src/components/Hero.astro'], /24\/7 product reply and checkout agent/);
  assert.match(sourceByFile['src/components/Hero.astro'], /VoluChat answers Instagram comments and DMs 24\/7, builds carts, collects addresses, and prepares WhatsApp checkout text/);
  assert.match(sourceByFile['src/components/Hero.astro'], /Repeated price, size, stock, delivery, and offer questions/);
  assert.match(sourceByFile['src/components/Hero.astro'], /builds the cart, collects delivery details, and prepares WhatsApp checkout text/);
  assert.match(sourceByFile['src/components/Hero.astro'], /mt-3 hidden max-w-lg/);
  assert.match(sourceByFile['src/components/Hero.astro'], /mt-7 hidden max-w-lg grid-cols-3/);
  assert.match(sourceByFile['src/components/Hero.astro'], /Book demo call/);
});

test('homepage hero uses broad high-consideration ecommerce examples', () => {
  const heroSource = `${sourceByFile['src/components/Hero.astro']}\n${sourceByFile['src/components/HeroAutomationScene.astro']}`;

  assert.match(heroSource, /24\/7 product reply and checkout agent/);
  assert.doesNotMatch(sourceByFile['src/components/Hero.astro'], /Instagram-first stores with high comment volume/);
  assert.doesNotMatch(sourceByFile['src/components/Hero.astro'], /50K\+ followers/);
  assert.match(heroSource, /linen co-ord/i);
  assert.match(heroSource, /Size M/);
  assert.match(heroSource, /Delhi 110024/);
  assert.match(heroSource, /linen_coord_thumb\.webp/);
  assert.match(heroSource, /satin_kurta_thumb\.webp/);
  assert.match(heroSource, /denim_overshirt_thumb\.webp/);
  assert.doesNotMatch(sourceByFile['src/components/HeroAutomationScene.astro'], /sneaker|runner|Cloud Runner|white_runner/i);
  assert.match(heroSource, /Facebook Page/);
  assert.doesNotMatch(heroSource, /Official Meta Tech Partner/);
});

test('homepage sections carry the workload-first AI helpdesk story', () => {
  assert.match(sourceByFile['src/components/PainPoints.astro'], /The repeated-question workload/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /same questions and checkout steps hit every inbox/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Price and size questions pile up/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /price, size, color, and fit/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Stock and delivery checks repeat/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /availability, delivery PIN code, return rules, and COD/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Cart and checkout details stall/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Cart items, quantities, variant choices, delivery address, and offer codes/);
  assert.doesNotMatch(sourceByFile['src/components/PainPoints.astro'], /Questions repeat across every inbox|Slow replies leak buyers|Teams duplicate manual work|same question in three stores|typing the same answer|Messages arrive from every channel|Product context is scattered|Sales handoffs start cold/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Incoming chats/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Price, size/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /delivery questions/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Cart context/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Stock, offers/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /variants and address/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /WhatsApp checkout/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /Prefilled text/);
  assert.match(sourceByFile['src/components/PainPoints.astro'], /payment left/);
  assert.doesNotMatch(sourceByFile['src/components/PainPoints.astro'], /Manual reply|Repeated Qs|6 min|buyer waits|automation layer/);
  assert.match(sourceByFile['src/components/Features.astro'], /24\/7 AI checkout agent for ecommerce sales teams/);
  assert.match(sourceByFile['src/components/Features.astro'], /Product, variant, quantity, delivery area, offer intent, and buyer preference stay attached/);
  assert.match(sourceByFile['src/components/Demo.astro'], /One concrete example, from incoming DM to a handoff your team can actually act on/);
  assert.match(sourceByFile['src/components/Demo.astro'], /incoming DM to a handoff/);
  assert.match(sourceByFile['src/components/HowItWorks.astro'], /Launch without rebuilding how your team sells/);
  assert.match(sourceByFile['src/components/HowItWorks.astro'], /Connect sales channels[\s\S]*Provide your store policies[\s\S]*Add your product catalog/);
  assert.match(sourceByFile['src/components/HowItWorks.astro'], /shipping, return, and refund/);
  assert.doesNotMatch(sourceByFile['src/components/HowItWorks.astro'], /Configure checkout flow|checkout message format/);
  assert.match(sourceByFile['src/components/Pricing.astro'], /Early pricing for high-volume Instagram stores/);
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
  assert.match(sourceByFile['src/components/Testimonials.astro'], /Real product, honest proof/);
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

  assert.match(faqSchemaSource, /"name": "How does VoluChat stop ecommerce stores losing sales to slow replies\?"/);
  assert.match(faqSchemaSource, /"name": "Can VoluChat find products from photos or buyer messages\?"/);
  assert.match(faqSchemaSource, /"name": "Does VoluChat create the WhatsApp checkout message\?"/);
  assert.match(faqSchemaSource, /"name": "Does VoluChat manage cart, address, and offer details\?"/);
  assert.match(faqSchemaSource, /"name": "Does VoluChat process orders or payments\?"/);
  assert.match(faqSchemaSource, /"name": "How is VoluChat different from Manychat, WATI, Interakt, respond.io, AiSensy, or Gallabox\?"/);
  assert.match(faqSchemaSource, /"name": "How much does VoluChat cost\?"/);
});

test('homepage avoids owner-only or small-team positioning', () => {
  assert.doesNotMatch(landingSource, /many small teams|store owners track/i);
  assert.match(landingSource, /checkout-ready WhatsApp draft|WhatsApp checkout drafts/);
});

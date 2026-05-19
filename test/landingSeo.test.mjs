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
  layoutSource,
  faqSource,
  manifestSource,
  robotsSource,
  sitemapSource,
] = await Promise.all([
  readSource('src/pages/index.astro'),
  readSource('src/layouts/Layout.astro'),
  readSource('src/components/FAQ.astro'),
  readSource('public/manifest.json'),
  readSource('public/robots.txt'),
  readSource('public/sitemap.xml'),
]);

test('homepage SEO metadata matches the WhatsApp-ready chat positioning', () => {
  assert.match(indexSource, /const seoTitle = "VoluChat \| Turn Instagram DMs into WhatsApp-ready chats";/);
  assert.match(indexSource, /const seoDescription = "VoluChat replies to Instagram buyers, finds catalog products, and prepares WhatsApp-ready chats so your staff can close orders faster.";/);
  assert.match(indexSource, /const seoKeywords = "Instagram DMs to WhatsApp, WhatsApp-ready chats, Instagram DM automation, AI DM helpdesk, Instagram store replies, product search, WhatsApp handoff";/);
  assert.match(indexSource, /<Layout\s+title={seoTitle}\s+description={seoDescription}\s+keywords={seoKeywords}/);
});

test('shared layout emits crawlable canonical and per-page keyword metadata', () => {
  assert.match(layoutSource, /keywords\?: string;/);
  assert.match(layoutSource, /canonical\?: string;/);
  assert.match(layoutSource, /const canonicalUrl = canonical \?\? new URL\(Astro\.url\.pathname, siteOrigin\)\.toString\(\);/);
  assert.match(layoutSource, /<link rel="canonical" href={canonicalUrl} \/>/);
  assert.match(layoutSource, /<meta name="keywords" content={keywords} \/>/);
  assert.match(layoutSource, /<meta property="og:site_name" content="VoluChat" \/>/);
});

test('homepage structured data and FAQ copy reinforce the new landing-page promise', () => {
  assert.match(indexSource, /const structuredData = \[/);
  assert.match(indexSource, /"@type": "WebSite"/);
  assert.match(indexSource, /"@type": "Organization"/);
  assert.match(indexSource, /"@type": "SiteNavigationElement"/);
  assert.match(indexSource, /"name": "How does VoluChat turn Instagram DMs into WhatsApp-ready chats\?"/);
  assert.match(faqSource, /question: "How does VoluChat turn Instagram DMs into WhatsApp-ready chats\?"/);
  assert.match(faqSource, /answer: "VoluChat replies to buyers in Instagram DM, answers repeat questions, finds products from your catalog, collects useful details, and prepares a WhatsApp-ready chat for your staff."/);
});

test('public crawl hints expose the main pages Google can consider for sitelinks', () => {
  assert.match(robotsSource, /Sitemap: https:\/\/voluchat\.com\/sitemap\.xml/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/features\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/pricing\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/about\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/blog\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/contact\/<\/loc>/);
});

test('web app manifest avoids the old autopilot positioning', () => {
  assert.match(manifestSource, /"name": "VoluChat - Instagram DMs to WhatsApp-ready chats"/);
  assert.match(manifestSource, /"description": "Reply to Instagram buyers, find catalog products, and prepare WhatsApp-ready chats for your sales staff."/);
  assert.doesNotMatch(manifestSource, /autopilot|paying customers/i);
});

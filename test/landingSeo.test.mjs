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

test('homepage SEO metadata leads with ecommerce-store positioning', () => {
  assert.match(indexSource, /const seoTitle = "Stop Losing Sales to Slow Replies \| VoluChat";/);
  assert.match(indexSource, /const seoDescription = "VoluChat is the 24\/7 AI checkout agent for ecommerce sales teams, answering product questions, building carts, collecting delivery addresses, and preparing WhatsApp checkout text.";/);
  assert.match(indexSource, /const seoKeywords = "24\/7 ecommerce reply automation, AI checkout agent, ecommerce sales team automation, Instagram DM automation, Facebook Page automation, WhatsApp checkout automation, prefilled WhatsApp order text, cart automation, delivery address collection, UPI payment confirmation";/);
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

test('homepage structured data and FAQ copy reinforce the ecommerce landing promise', () => {
  assert.match(indexSource, /const structuredData = \[/);
  assert.match(indexSource, /"@type": "WebSite"/);
  assert.match(indexSource, /"@type": "Organization"/);
  assert.match(indexSource, /"@type": "SiteNavigationElement"/);
  assert.match(indexSource, /"name": "How does VoluChat stop ecommerce stores losing sales to slow replies\?"/);
  assert.match(faqSource, /question: "How does VoluChat stop ecommerce stores losing sales to slow replies\?"/);
  assert.match(faqSource, /answer: "VoluChat replies 24\/7, answers common product questions, builds the buyer's cart, collects delivery details, and prepares a WhatsApp checkout draft before the buyer drops off."/);
  assert.match(faqSource, /question: "Does VoluChat create the WhatsApp checkout message\?"/);
  assert.match(faqSource, /question: "How is VoluChat different from Manychat, WATI, Interakt, respond.io, AiSensy, or Gallabox\?"/);
});

test('public crawl hints expose the main pages Google can consider for sitelinks', () => {
  assert.match(robotsSource, /Sitemap: https:\/\/voluchat\.com\/sitemap\.xml/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/features\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/pricing\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/compare\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/about\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/blog\/<\/loc>/);
  assert.match(sitemapSource, /<loc>https:\/\/voluchat\.com\/contact\/<\/loc>/);
});

test('web app manifest avoids the old autopilot positioning', () => {
  assert.match(manifestSource, /"name": "VoluChat - Stop Losing Sales to Slow Replies"/);
  assert.match(manifestSource, /"description": "24\/7 AI checkout agent for ecommerce stores handling product questions, carts, delivery addresses, and WhatsApp checkout drafts."/);
  assert.doesNotMatch(manifestSource, /autopilot|paying customers/i);
});

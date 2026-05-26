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
  assert.match(indexSource, /const seoDescription = "VoluChat is the AI reply layer for ecommerce sales teams, automating repeated product questions across Instagram and Facebook Pages so stores answer faster and stop losing sales.";/);
  assert.match(indexSource, /const seoKeywords = "ecommerce sales team automation, ecommerce reply automation, Instagram DM automation, Facebook Page automation, repeated product questions, slow reply lost sales, AI sales assistant, product catalog search, WhatsApp handoff automation, multi-agent ecommerce replies";/);
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
  assert.match(faqSource, /answer: "VoluChat acts as a shared AI reply layer for ecommerce sales teams, answering repeated product questions across Instagram and Facebook Pages before a buyer loses interest."/);
  assert.match(faqSource, /question: "Can VoluChat support multiple sales reps or WhatsApp numbers\?"/);
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
  assert.match(manifestSource, /"description": "AI reply automation for ecommerce sales teams handling repeated product questions across Instagram and Facebook Pages."/);
  assert.doesNotMatch(manifestSource, /autopilot|paying customers/i);
});

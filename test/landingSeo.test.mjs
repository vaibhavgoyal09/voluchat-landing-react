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
  blogDetailSource,
  sitemapEndpointSource,
  faqSource,
  manifestSource,
  robotsSource,
] = await Promise.all([
  readSource('src/pages/index.astro'),
  readSource('src/layouts/Layout.astro'),
  readSource('src/pages/blog/[slug].astro'),
  readSource('src/pages/sitemap.xml.js'),
  readSource('src/components/FAQ.astro'),
  readSource('public/manifest.json'),
  readSource('public/robots.txt'),
]);

test('homepage SEO metadata leads with ecommerce-store positioning', () => {
  assert.match(indexSource, /const seoTitle = "Turn More DMs Into Orders \| VoluChat";/);
  assert.match(indexSource, /const seoDescription = "VoluChat helps Instagram-led stores answer repeated DMs, recommend products, collect delivery details, and send customers to WhatsApp with the order message filled in.";/);
  assert.match(indexSource, /const seoKeywords = "Instagram DM automation, WhatsApp order message, DM to order automation, ecommerce reply automation, product catalog AI agent, COD delivery questions, Hinglish customer replies, Manychat alternative India";/);
  assert.match(indexSource, /<Layout\s+title={seoTitle}\s+description={seoDescription}\s+keywords={seoKeywords}/);
});

test('shared layout emits crawlable canonical and per-page keyword metadata', () => {
  assert.match(layoutSource, /keywords\?: string;/);
  assert.match(layoutSource, /canonical\?: string;/);
  assert.match(layoutSource, /const canonicalUrl = new URL\(canonical \?\? Astro\.url\.pathname, siteOrigin\)\.toString\(\);/);
  assert.match(layoutSource, /<link rel="canonical" href={canonicalUrl} \/>/);
  assert.match(layoutSource, /<meta name="keywords" content={keywords} \/>/);
  assert.match(layoutSource, /<meta property="og:site_name" content="VoluChat" \/>/);
});

test('homepage structured data and FAQ copy reinforce the ecommerce landing promise', () => {
  assert.match(indexSource, /const structuredData = \[/);
  assert.match(indexSource, /"@type": "WebSite"/);
  assert.match(indexSource, /"@type": "Organization"/);
  assert.match(indexSource, /"@type": "SiteNavigationElement"/);
  assert.match(indexSource, /"name": "How does VoluChat turn DMs into orders\?"/);
  assert.match(faqSource, /question: "How does VoluChat turn DMs into orders\?"/);
  assert.match(faqSource, /answer: "VoluChat answers repeated product questions, recommends products from your catalog, collects cart and delivery details, and sends customers to WhatsApp with the order message already filled in."/);
  assert.match(faqSource, /question: "Does VoluChat process payments or fully confirm orders\?"/);
  assert.match(faqSource, /question: "Will my team still control the final sale\?"/);
});

test('public crawl hints expose the main pages Google can consider for sitelinks', () => {
  assert.match(robotsSource, /Sitemap: https:\/\/voluchat\.com\/sitemap\.xml/);
  assert.match(sitemapEndpointSource, /fetchPublishedBlogPosts/);
  assert.match(sitemapEndpointSource, /blog\.href/);
  assert.match(sitemapEndpointSource, /path: '\/features\/'/);
  assert.match(sitemapEndpointSource, /path: '\/pricing\/'/);
  assert.match(sitemapEndpointSource, /path: '\/compare\/'/);
  assert.match(sitemapEndpointSource, /path: '\/about\/'/);
  assert.match(sitemapEndpointSource, /path: '\/blog\/'/);
  assert.match(sitemapEndpointSource, /path: '\/contact\/'/);
  assert.doesNotMatch(sitemapEndpointSource, /\/blogs\//);
});

test('robots rules explicitly allow major search and AI crawlers', () => {
  assert.match(robotsSource, /User-agent: Googlebot\nAllow: \//);
  assert.match(robotsSource, /User-agent: Bingbot\nAllow: \//);
  assert.match(robotsSource, /User-agent: OAI-SearchBot\nAllow: \//);
  assert.match(robotsSource, /User-agent: GPTBot\nAllow: \//);
  assert.match(robotsSource, /User-agent: ChatGPT-User\nAllow: \//);
  assert.doesNotMatch(robotsSource, /llms\.txt/i);
});

test('blog detail pages wire SEO metadata, visible JSON-LD, and internal links', () => {
  assert.match(layoutSource, /author\?: string;/);
  assert.match(layoutSource, /publishedTime\?: string;/);
  assert.match(layoutSource, /<meta property="article:published_time" content={publishedTime} \/>/);
  assert.match(blogDetailSource, /canonical={blog\?\.canonicalUrl/);
  assert.match(blogDetailSource, /keywords={blogKeywords}/);
  assert.match(blogDetailSource, /author={blog\?\.author\.name}/);
  assert.match(blogDetailSource, /publishedTime={blog\?\.publishedAt}/);
  assert.match(blogDetailSource, /const blogImageUrl = blog\?\.featuredImageUrl/);
  assert.match(blogDetailSource, /'@type': 'BlogPosting'/);
  assert.match(blogDetailSource, /'@type': 'FAQPage'/);
  assert.match(blogDetailSource, /faq\.question/);
  assert.match(blogDetailSource, /faq\.answer/);
  assert.match(blogDetailSource, /href: '\/features'/);
  assert.match(blogDetailSource, /href: '\/compare'/);
  assert.match(blogDetailSource, /href: '\/contact'/);
});

test('web app manifest avoids the old autopilot positioning', () => {
  assert.match(manifestSource, /"name": "VoluChat - Turn More DMs Into Orders"/);
  assert.match(manifestSource, /"description": "AI DM automation for Instagram-led stores that answers product questions and prepares WhatsApp-ready order messages."/);
  assert.doesNotMatch(manifestSource, /autopilot|paying customers/i);
});

import { fetchPublishedBlogPosts, getBlogApiBaseUrl } from '../lib/blogApi.mjs';

const DEFAULT_SITE_ORIGIN = 'https://www.voluchat.com';
const SITEMAP_BLOG_LIMIT = 100;
const STATIC_ROUTES = [
  { path: '/', priority: '1.0' },
  { path: '/features/', priority: '0.8' },
  { path: '/pricing/', priority: '0.8' },
  { path: '/compare/', priority: '0.8' },
  { path: '/about/', priority: '0.7' },
  { path: '/blog/', priority: '0.6' },
  { path: '/contact/', priority: '0.9' },
];

export async function GET({ site }) {
  const siteOrigin = site?.origin ?? DEFAULT_SITE_ORIGIN;
  let blogs = [];

  try {
    blogs = await fetchPublishedBlogPosts({
      baseUrl: getBlogApiBaseUrl(import.meta.env),
      limit: SITEMAP_BLOG_LIMIT,
    });
  } catch (error) {
    console.error('[Server] Failed to fetch blog posts for sitemap:', error);
  }

  const entries = [
    ...STATIC_ROUTES.map((route) => ({
      loc: absoluteUrl(route.path, siteOrigin),
      priority: route.priority,
    })),
    ...blogs.map((blog) => ({
      loc: absoluteUrl(blog.href, siteOrigin),
      lastmod: blog.publishedAt || blog.createdAt || undefined,
      priority: '0.6',
    })),
  ];

  return new Response(buildSitemapXml(entries), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

function buildSitemapXml(entries) {
  const urls = entries.map((entry) => {
    const lastmod = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : '';
    const priority = entry.priority ? `\n    <priority>${escapeXml(entry.priority)}</priority>` : '';

    return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmod}${priority}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function absoluteUrl(path, siteOrigin) {
  return new URL(path, siteOrigin).toString();
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

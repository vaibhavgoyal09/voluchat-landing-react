import { fetchPublishedBlogPosts, getBlogApiBaseUrl } from "../lib/blogApi.mjs";

const DEFAULT_SITE_ORIGIN = "https://www.voluchat.com";
const SITEMAP_BLOG_LIMIT = 100;
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const STATIC_ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/features", priority: "0.8" },
  { path: "/pricing", priority: "0.9" },
  { path: "/compare", priority: "0.8" },
  { path: "/compare/wati", priority: "0.8" },
  { path: "/compare/manychat", priority: "0.8" },
  { path: "/compare/interakt", priority: "0.8" },
  { path: "/compare/manual-reps", priority: "0.8" },
  { path: "/about", priority: "0.7" },
  { path: "/security", priority: "0.7" },
  { path: "/blog", priority: "0.6" },
  { path: "/contact", priority: "0.9" },
  { path: "/privacy", priority: "0.5" },
  { path: "/terms", priority: "0.5" },
  { path: "/integrations/shopify", priority: "0.8" },
  { path: "/what-is/comment-to-DM-automation", priority: "0.7" },
  { path: "/what-is/whatsapp-sales-bot", priority: "0.7" },
  { path: "/glossary", priority: "0.6" },
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
    console.error("[Server] Failed to fetch blog posts for sitemap:", error);
  }

  const entries = [
    ...STATIC_ROUTES.map((route) => ({
      loc: absoluteUrl(route.path, siteOrigin),
      lastmod: BUILD_DATE,
      priority: route.priority,
    })),
    ...blogs.map((blog) => ({
      loc: absoluteUrl(blog.href, siteOrigin),
      lastmod: formatSitemapDate(blog.publishedAt || blog.createdAt),
      priority: "0.6",
    })),
  ];

  return new Response(buildSitemapXml(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function buildSitemapXml(entries) {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod
        ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`
        : "";
      const priority = entry.priority
        ? `\n    <priority>${escapeXml(entry.priority)}</priority>`
        : "";

      return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmod}${priority}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function absoluteUrl(path, siteOrigin) {
  return new URL(path, siteOrigin).toString();
}

function formatSitemapDate(value) {
  if (!value) {
    return undefined;
  }

  const dateOnly = String(value).match(/^\d{4}-\d{2}-\d{2}/)?.[0];

  if (!dateOnly) {
    return undefined;
  }

  const date = new Date(`${dateOnly}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return dateOnly;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

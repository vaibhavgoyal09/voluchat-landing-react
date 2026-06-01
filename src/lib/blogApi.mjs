const DEFAULT_AUTHOR = {
  name: 'VoluChat Team',
  avatarUrl: '',
  jobTitle: '',
};

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function getBlogApiBaseUrl(env = import.meta.env) {
  env = env || {};

  return env.PUBLIC_BLOG_API_URL || env.PUBLIC_API_URL || 'http://localhost:8000';
}

export function buildBlogListUrl(baseUrl, params = {}) {
  const url = new URL('/blogs/', withTrailingSlash(baseUrl));

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

export function buildBlogDetailUrl(baseUrl, blogId) {
  return new URL(`/blogs/${blogId}`, withTrailingSlash(baseUrl));
}

export function buildBlogSlugUrl(baseUrl, slug) {
  return new URL(`/blogs/slug/${slug}`, withTrailingSlash(baseUrl));
}

export async function fetchPublishedBlogPosts({
  baseUrl = getBlogApiBaseUrl(),
  limit = 12,
  fetcher = fetch,
} = {}) {
  const response = await fetcher(buildBlogListUrl(baseUrl, { published: 1, limit }));

  if (!response.ok) {
    throw new Error(`Blog API returned ${response.status} for public blog listing`);
  }

  return normalizeBlogPosts(await response.json());
}

export async function fetchBlogPostById(blogId, {
  baseUrl = getBlogApiBaseUrl(),
  fetcher = fetch,
} = {}) {
  const response = await fetcher(buildBlogDetailUrl(baseUrl, blogId));

  if (!response.ok) {
    throw new Error(`Blog API returned ${response.status} for blog ${blogId}`);
  }

  return normalizeBlogPost(await response.json());
}

export async function fetchBlogPostBySlug(slug, {
  baseUrl = getBlogApiBaseUrl(),
  fetcher = fetch,
} = {}) {
  const response = await fetcher(buildBlogSlugUrl(baseUrl, slug));

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Blog API returned ${response.status} for blog slug ${slug}`);
  }

  return normalizeBlogPost(await response.json());
}

export function normalizeBlogPosts(records) {
  if (!Array.isArray(records)) {
    return [];
  }

  return records.map(normalizeBlogPost).filter(Boolean);
}

export function normalizeBlogPost(record) {
  if (!record || typeof record !== 'object') {
    return null;
  }

  const title = text(record.title);
  const slug = text(record.slug);
  const rawExcerpt = text(record.excerpt);
  const content = text(record.content) || rawExcerpt;

  if (!title || !slug || !content) {
    return null;
  }

  const publishedAt = text(record.published_at) || text(record.created_at) || '';
  const excerpt = rawExcerpt || excerptFromContent(content);
  const author = normalizeAuthor(record.author, record.author_name);

  return {
    id: record.id,
    title,
    slug,
    href: `/blog/${slug}`,
    excerpt,
    content,
    status: text(record.status) || (record.published === 1 ? 'published' : ''),
    publishedAt,
    createdAt: text(record.created_at),
    dateLabel: formatDate(publishedAt),
    seoTitle: text(record.seo_title) || title,
    seoDescription: text(record.seo_description) || excerpt,
    canonicalUrl: text(record.canonical_url) || `/blog/${slug}`,
    focusKeyword: text(record.focus_keyword),
    keywords: normalizeStringList(record.keywords),
    robotsIndex: record.robots_index !== false,
    robotsFollow: record.robots_follow !== false,
    featuredImageUrl: text(record.featured_image_url) || text(record.image_url),
    featuredImageAlt: text(record.featured_image_alt) || title,
    authorId: record.author_id,
    author,
    categories: normalizeTaxonomy(record.categories),
    tags: normalizeTaxonomy(record.tags),
    faqs: normalizeFaqs(record.faqs),
  };
}

export function pathsForBlogPosts(posts) {
  return posts.map((blog) => ({
    params: { slug: blog.slug },
    props: { blog },
  }));
}

function withTrailingSlash(baseUrl) {
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

function normalizeAuthor(author, fallbackName = '') {
  if (!author || typeof author !== 'object') {
    return {
      ...DEFAULT_AUTHOR,
      name: text(fallbackName) || DEFAULT_AUTHOR.name,
    };
  }

  return {
    name: text(author.name) || text(fallbackName) || DEFAULT_AUTHOR.name,
    avatarUrl: text(author.avatar_url),
    jobTitle: text(author.job_title),
    websiteUrl: text(author.website_url),
    twitterUrl: text(author.twitter_url),
    linkedinUrl: text(author.linkedin_url),
  };
}

function normalizeTaxonomy(records) {
  if (!Array.isArray(records)) {
    return [];
  }

  return records
    .map((record) => ({
      name: text(record?.name),
      slug: text(record?.slug),
    }))
    .filter((record) => record.name && record.slug);
}

function normalizeFaqs(records) {
  if (!Array.isArray(records)) {
    return [];
  }

  return records
    .map((record) => ({
      question: text(record?.question),
      answer: text(record?.answer),
      position: Number.isFinite(Number(record?.position)) ? Number(record.position) : 0,
    }))
    .filter((record) => record.question && record.answer)
    .sort((a, b) => a.position - b.position);
}

function normalizeStringList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(text).filter(Boolean);
}

function excerptFromContent(content) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*_`>\-[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return plainText.length > 160 ? `${plainText.slice(0, 157).trim()}...` : plainText;
}

function formatDate(value) {
  if (!value) {
    return 'Recently published';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Recently published';
  }

  return DATE_FORMATTER.format(date);
}

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildBlogListUrl,
  fetchBlogPostBySlug,
  normalizeBlogPost,
  normalizeBlogPosts,
  pathsForBlogPosts,
} from '../src/lib/blogApi.mjs';

test('buildBlogListUrl targets the documented public blogs endpoint', () => {
  assert.equal(
    buildBlogListUrl('http://localhost:8000', { published: 1, limit: 12 }).toString(),
    'http://localhost:8000/blogs/?published=1&limit=12'
  );

  assert.equal(
    buildBlogListUrl('http://localhost:8000/', { limit: 100 }).toString(),
    'http://localhost:8000/blogs/?limit=100'
  );
});

test('normalizeBlogPost supports SEO blog API fields and author metadata', () => {
  const post = normalizeBlogPost({
    id: 12,
    title: 'FastAPI SEO Guide',
    slug: 'fastapi-seo-guide',
    excerpt: 'A practical guide to SEO blog APIs.',
    content: '# FastAPI SEO\nWrite useful content.',
    status: 'published',
    published_at: '2026-05-10T12:00:00',
    created_at: '2026-05-09T10:00:00',
    seo_title: 'FastAPI SEO Guide',
    seo_description: 'Learn how to build SEO content APIs for FastAPI landing pages.',
    featured_image_url: 'https://example.com/fastapi.png',
    featured_image_alt: 'FastAPI SEO dashboard',
    categories: [{ name: 'SEO', slug: 'seo' }],
    tags: [{ name: 'FastAPI', slug: 'fastapi' }],
    faqs: [{ question: 'Does metadata matter?', answer: 'Yes.', position: 1 }],
    author: {
      name: 'Jane Doe',
      avatar_url: 'https://example.com/jane.png',
      job_title: 'Editor',
    },
  });

  assert.equal(post.href, '/blog/fastapi-seo-guide');
  assert.equal(post.excerpt, 'A practical guide to SEO blog APIs.');
  assert.equal(post.dateLabel, 'May 10, 2026');
  assert.equal(post.seoTitle, 'FastAPI SEO Guide');
  assert.equal(post.seoDescription, 'Learn how to build SEO content APIs for FastAPI landing pages.');
  assert.equal(post.featuredImageUrl, 'https://example.com/fastapi.png');
  assert.equal(post.author.name, 'Jane Doe');
  assert.deepEqual(post.categories.map((category) => category.name), ['SEO']);
  assert.deepEqual(post.faqs.map((faq) => faq.question), ['Does metadata matter?']);
});

test('normalizeBlogPosts filters invalid records and slug paths carry post props', () => {
  const posts = normalizeBlogPosts([
    { id: 1, title: 'Valid', slug: 'valid', content: 'Body', published_at: '2026-05-10T12:00:00' },
    { id: 2, title: '', slug: 'missing-title', content: 'Body' },
    { id: 3, title: 'Missing slug', content: 'Body' },
  ]);

  assert.equal(posts.length, 1);
  assert.deepEqual(pathsForBlogPosts(posts), [
    {
      params: { slug: 'valid' },
      props: { blog: posts[0] },
    },
  ]);
});

test('fetchBlogPostBySlug resolves a public slug through documented list and id endpoints', async () => {
  const requestedUrls = [];
  const fetcher = async (url) => {
    requestedUrls.push(url.toString());

    if (url.pathname === '/blogs/') {
      return jsonResponse([
        { id: 7, title: 'Found', slug: 'found', content: 'Preview body' },
      ]);
    }

    if (url.pathname === '/blogs/7') {
      return jsonResponse({
        id: 7,
        title: 'Found',
        slug: 'found',
        content: 'Full body',
        excerpt: 'Full excerpt',
      });
    }

    return { ok: false, status: 404 };
  };

  const post = await fetchBlogPostBySlug('found', {
    baseUrl: 'http://localhost:8000',
    fetcher,
  });

  assert.equal(post.content, 'Full body');
  assert.deepEqual(requestedUrls, [
    'http://localhost:8000/blogs/?published=1&limit=100',
    'http://localhost:8000/blogs/7',
  ]);
});

function jsonResponse(body) {
  return {
    ok: true,
    status: 200,
    async json() {
      return body;
    },
  };
}

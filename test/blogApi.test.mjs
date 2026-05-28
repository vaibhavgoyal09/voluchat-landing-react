import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildBlogSlugUrl,
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
    canonical_url: 'https://voluchat.com/blog/fastapi-seo-guide',
    focus_keyword: 'FastAPI SEO',
    keywords: ['FastAPI SEO', 'SEO API'],
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
  assert.equal(post.canonicalUrl, 'https://voluchat.com/blog/fastapi-seo-guide');
  assert.equal(post.focusKeyword, 'FastAPI SEO');
  assert.deepEqual(post.keywords, ['FastAPI SEO', 'SEO API']);
  assert.equal(post.featuredImageUrl, 'https://example.com/fastapi.png');
  assert.equal(post.author.name, 'Jane Doe');
  assert.deepEqual(post.categories.map((category) => category.name), ['SEO']);
  assert.deepEqual(post.faqs.map((faq) => faq.question), ['Does metadata matter?']);
});

test('normalizeBlogPosts accepts public list records without full content', () => {
  const posts = normalizeBlogPosts([
    {
      id: 4,
      title: 'Instagram DM Reply Guide',
      slug: 'instagram-dm-reply-guide',
      excerpt: 'How to handle repeated product questions from Instagram DMs.',
      status: 'published',
      published: 1,
      published_at: '2026-05-11T08:00:00',
      seo_title: 'Instagram DM Reply Guide',
      seo_description: 'A practical Instagram DM reply guide for ecommerce teams.',
      image_url: 'https://example.com/social-replies.png',
      featured_image_alt: 'Social reply workflow',
      author_name: 'VoluChat Editorial',
    },
  ]);

  assert.equal(posts.length, 1);
  assert.equal(posts[0].href, '/blog/instagram-dm-reply-guide');
  assert.equal(posts[0].content, 'How to handle repeated product questions from Instagram DMs.');
  assert.equal(posts[0].featuredImageUrl, 'https://example.com/social-replies.png');
  assert.equal(posts[0].author.name, 'VoluChat Editorial');
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

test('buildBlogSlugUrl targets the documented public slug endpoint', () => {
  assert.equal(
    buildBlogSlugUrl('http://localhost:8000', 'found').toString(),
    'http://localhost:8000/blogs/slug/found'
  );
});

test('fetchBlogPostBySlug resolves a public slug through the documented slug endpoint', async () => {
  const requestedUrls = [];
  const fetcher = async (url) => {
    requestedUrls.push(url.toString());

    if (url.pathname === '/blogs/slug/found') {
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
    'http://localhost:8000/blogs/slug/found',
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

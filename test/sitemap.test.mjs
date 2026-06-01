import assert from "node:assert/strict";
import { test } from "node:test";

test("sitemap formats API timestamps as Google-compatible dates", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify([
    {
      id: 1,
      title: "Why Instagram Stores Lose Sales to Slow Replies",
      slug: "why-instagram-stores-lose-sales-to-slow-replies",
      excerpt: "Slow replies cost Instagram stores sales.",
      content: "Slow replies cost Instagram stores sales.",
      status: "published",
      published: 1,
      published_at: "2026-05-28T07:24:17.638000",
      created_at: "2026-05-28T07:15:30.995668",
    },
  ]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  const sitemap = await import("../src/pages/sitemap.xml.js");

  try {
    const response = await sitemap.GET({
      site: new URL("https://www.voluchat.com"),
    });

    const xml = await response.text();

    assert.match(xml, /<lastmod>2026-05-28<\/lastmod>/);
    assert.doesNotMatch(xml, /<lastmod>2026-05-28T07:24:17\.638000<\/lastmod>/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

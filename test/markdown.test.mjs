import assert from "node:assert/strict";
import { test } from "node:test";
import { renderMarkdownToHtml } from "../src/lib/markdown.mjs";

test("renders headings, emphasis, links, and inline code", () => {
  const html = renderMarkdownToHtml(
    [
      "# Main title",
      "",
      "A **bold** and *italic* line with `code` and [VoluChat](https://www.voluchat.com).",
    ].join("\n"),
  );

  assert.match(html, /<h2>Main title<\/h2>/);
  assert.match(html, /<strong>bold<\/strong>/);
  assert.match(html, /<em>italic<\/em>/);
  assert.match(html, /<code>code<\/code>/);
  assert.match(
    html,
    /<a href="https:\/\/www\.voluchat\.com" rel="noopener noreferrer" target="_blank">VoluChat<\/a>/,
  );
});

test("renders common block elements", () => {
  const html = renderMarkdownToHtml(
    [
      "> Automate the repeat questions first.",
      "",
      "- Catalog",
      "- Delivery",
      "",
      "1. Connect Instagram",
      "2. Review answers",
      "",
      "---",
      "",
      "```js",
      "const channel = 'instagram';",
      "```",
    ].join("\n"),
  );

  assert.match(
    html,
    /<blockquote><p>Automate the repeat questions first\.<\/p><\/blockquote>/,
  );
  assert.match(html, /<ul><li>Catalog<\/li><li>Delivery<\/li><\/ul>/);
  assert.match(
    html,
    /<ol><li>Connect Instagram<\/li><li>Review answers<\/li><\/ol>/,
  );
  assert.match(html, /<hr>/);
  assert.match(
    html,
    /<pre><code class="language-js">const channel = &#39;instagram&#39;;<\/code><\/pre>/,
  );
});

test("renders markdown tables as html tables", () => {
  const html = renderMarkdownToHtml(
    [
      "| Need | Manychat | VoluChat |",
      "| --- | --- | --- |",
      "| Product questions | Possible through setup | Core use case |",
    ].join("\n"),
  );

  assert.match(html, /<div class="blog-table-wrap"><table>/);
  assert.match(html, /<th>Need<\/th>/);
  assert.match(html, /<td>Core use case<\/td>/);
});

test("escapes unsafe html and unsafe urls", () => {
  const html = renderMarkdownToHtml(
    "[bad](javascript:alert(1)) <script>alert(1)</script>",
  );

  assert.doesNotMatch(html, /javascript:/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /href="#"/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

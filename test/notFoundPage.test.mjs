import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readNotFoundPage = () => readFile(new URL("../src/pages/404.astro", import.meta.url), "utf8");

test("404 page uses shared layout and is excluded from search indexing", async () => {
  const page = await readNotFoundPage();

  assert.match(page, /import Layout/);
  assert.match(page, /import Header/);
  assert.match(page, /import Footer/);
  assert.match(page, /robots="noindex, follow"/);
});

test("404 page gives users clear recovery paths", async () => {
  const page = await readNotFoundPage();

  assert.match(page, /This page seems to be missing/);
  assert.match(page, /href="\/"/);
  assert.match(page, /href="\/pricing"/);
  assert.match(page, /href: "\/contact"/);
  assert.match(page, /href=\{link\.href\}/);
});

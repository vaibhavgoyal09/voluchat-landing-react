import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("layout renders the cookie consent component", async () => {
  const layout = await readFile(
    new URL("../src/layouts/Layout.astro", import.meta.url),
    "utf8",
  );

  assert.match(
    layout,
    /import CookieConsent from ['"]\.\.\/components\/CookieConsent\.astro['"]/,
  );
  assert.match(layout, /<CookieConsent \/>/);
});

test("cookie consent persists accept and reject decisions", async () => {
  const component = await readFile(
    new URL("../src/components/CookieConsent.astro", import.meta.url),
    "utf8",
  );

  assert.match(component, /voluchat-cookie-consent/);
  assert.match(component, /data-cookie-accept/);
  assert.match(component, /data-cookie-reject/);
  assert.match(component, /localStorage\.setItem\(CONSENT_KEY, "accepted"\)/);
  assert.match(component, /localStorage\.setItem\(CONSENT_KEY, "rejected"\)/);
});

test("cookie consent accepts analytics when the visitor scrolls", async () => {
  const component = await readFile(
    new URL("../src/components/CookieConsent.astro", import.meta.url),
    "utf8",
  );

  assert.match(component, /const acceptConsent = \(\) => {/);
  assert.match(component, /const SCROLL_ACCEPT_THRESHOLD = 80/);
  assert.match(component, /const handleScrollConsent = \(\) => {/);
  assert.match(
    component,
    /Math\.abs\(window\.scrollY - initialScrollY\) < SCROLL_ACCEPT_THRESHOLD/,
  );
  assert.match(
    component,
    /window\.addEventListener\("scroll", handleScrollConsent/,
  );
  assert.match(
    component,
    /window\.removeEventListener\("scroll", handleScrollConsent/,
  );
});

test("cookie consent tells visitors that scrolling accepts analytics", async () => {
  const component = await readFile(
    new URL("../src/components/CookieConsent.astro", import.meta.url),
    "utf8",
  );

  assert.match(
    component,
    /Scrolling this page also accepts analytics cookies\./,
  );
});

test("cookie consent animates out before it is hidden", async () => {
  const component = await readFile(
    new URL("../src/components/CookieConsent.astro", import.meta.url),
    "utf8",
  );

  assert.match(component, /\.cookie-consent\.is-hiding/);
  assert.match(component, /banner\.classList\.add\("is-hiding"\)/);
  assert.match(component, /window\.setTimeout\(\(\) => {/);
  assert.match(component, /banner\?\.setAttribute\("hidden", ""\)/);
});


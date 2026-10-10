// Verifies the production output in build/. Run after `npm run build`:
//
//   npm run verify:build              everything, including a headless-browser pass
//   npm run verify:build -- --no-browser   static checks only
//   npm run verify:build -- --release      also fail on release blockers (run before deploying)
//
// It checks the things that have gone wrong on this site before: hydration
// failures, soft 404s, private story data in the main bundle, public source
// maps, metadata drift between pages, and a sitemap that disagrees with what
// was actually prerendered. Exits non-zero on any failure.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, "build");
const useBrowser = !process.argv.includes("--no-browser");
const releaseMode = process.argv.includes("--release");

const failures = [];
const notes = [];
// Things that are fine in development but must not be deployed, such as legal
// details only the owner can supply. They fail only with --release.
const blockers = [];
const fail = (message) => failures.push(message);

if (!fs.existsSync(buildDir)) {
  console.error("build/ not found. Run `npm run build` first.");
  process.exit(2);
}

const siteConfig = fs.readFileSync(path.join(root, "src/data/site-config.ts"), "utf8");
const SITE_URL = /SITE_URL\s*=\s*"([^"]+)"/.exec(siteConfig)?.[1];
if (!SITE_URL) fail("Could not read SITE_URL from src/data/site-config.ts");

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(path.join(dir, entry.name))
      : [path.join(dir, entry.name)],
  );
const files = walk(buildDir);
const rel = (file) => path.relative(buildDir, file).split(path.sep).join("/");

// ---------------------------------------------------------------- budgets
// Measured on 10 Oct 2026 after removing dead code, dead copy and unused
// dependencies: main 296 KB gz, German locale chunk 67 KB gz (this script's
// gzip; CRA's report reads slightly higher). The budgets leave about 6 percent
// headroom; a regression past them should be a deliberate decision.
const BUDGET_GZIP_KB = { main: 313, "locale-de": 71 };
const gzipKb = (file) => zlib.gzipSync(fs.readFileSync(file)).length / 1024;

const jsFiles = files.filter((f) => /static\/js\/.*\.js$/.test(rel(f)));
for (const [prefix, limit] of Object.entries(BUDGET_GZIP_KB)) {
  const match = jsFiles.find((f) => path.basename(f).startsWith(`${prefix}.`));
  if (!match) {
    fail(`Missing expected JS chunk "${prefix}"`);
    continue;
  }
  const size = gzipKb(match);
  notes.push(`${path.basename(match)}: ${size.toFixed(0)} KB gzip (budget ${limit} KB)`);
  if (size > limit) fail(`${path.basename(match)} is ${size.toFixed(0)} KB gzip, over its ${limit} KB budget`);
}

// --------------------------------------------------- exposure and hygiene
const maps = files.filter((f) => f.endsWith(".map"));
if (maps.length) fail(`Source maps are public: ${maps.map(rel).join(", ")}`);

const main = jsFiles.find((f) => path.basename(f).startsWith("main."));
if (main) {
  const mainText = fs.readFileSync(main, "utf8");
  // The story media are only imported by the lazy /story chunk.
  if (mainText.includes("static/media/story-")) fail("Main bundle references private story media");
  // /story and /prayer are unlisted, not access-controlled: whatever private
  // content a build contains is public to anyone who finds it. Say which.
  const privateMedia = files.filter((f) => rel(f).startsWith("static/media/story-")).length;
  // Probe for text from the private files themselves, when they exist here.
  const privateProbes = ["story.en.json", "story.de.json", "prayer.json"]
    .map((name) => path.join(root, "src/content/private", name))
    .filter((file) => fs.existsSync(file))
    .map((file) => {
      // A run of plain words from the longest string: no quotes, newlines or
      // other characters that bundling escapes differently.
      const strings = [];
      const collect = (value) => {
        if (typeof value === "string") strings.push(value);
        else if (value && typeof value === "object") Object.values(value).forEach(collect);
      };
      collect(JSON.parse(fs.readFileSync(file, "utf8")));
      const longest = strings.sort((a, b) => b.length - a.length)[0] ?? "";
      return /[A-Za-z ,]{40}/.exec(longest)?.[0];
    })
    .filter(Boolean);
  const privateChunks = jsFiles.filter((f) => {
    const text = fs.readFileSync(f, "utf8");
    return privateProbes.some((probe) => text.includes(probe));
  }).length;
  notes.push(
    privateMedia || privateChunks
      ? `private pages: INCLUDED (${privateChunks} text chunk(s), ${privateMedia} media file(s)); public to anyone with the URL, not access-controlled`
      : "private pages: not in this build",
  );
  const privateDir = path.join(root, "src/content/private");
  for (const lang of ["en", "de"]) {
    const file = path.join(privateDir, `story.${lang}.json`);
    if (!fs.existsSync(file)) continue;
    const story = JSON.parse(fs.readFileSync(file, "utf8"));
    const probes = story.sections
      .map((s) => (s.content ?? "").replace(/\s+/g, " "))
      .filter((c) => c.length > 90)
      .slice(0, 25)
      .map((c) => c.slice(20, 70));
    const leaked = probes.filter((p) => mainText.includes(JSON.stringify(p).slice(1, -1)));
    if (leaked.length) fail(`Story text (${lang}) is in the main bundle (${leaked.length} probes matched)`);
  }
}
// Third-party font hosts would reintroduce the render-blocking request and the
// IP disclosure that self-hosting Inter removed.
for (const file of files.filter((f) => /\.(html|css)$/.test(f))) {
  const text = fs.readFileSync(file, "utf8");
  if (/fonts\.(googleapis|gstatic)\.com/.test(text)) fail(`${rel(file)} references Google Fonts`);
}
for (const name of ["logo192.png", "logo512.png", ".env", ".env.production"]) {
  if (files.some((f) => rel(f) === name)) fail(`Unexpected public file: ${name}`);
}

// ------------------------------------------------------------ prerendered
const pages = files
  .filter((f) => rel(f).endsWith("index.html") || rel(f) === "404.html")
  .map((f) => ({ file: f, route: rel(f) === "404.html" ? "/404" : "/" + rel(f).replace(/index\.html$/, "").replace(/\/$/, "") }));
const attr = (html, pattern) => (pattern.exec(html) || [])[1];
const metaContent = (html, key, value) =>
  attr(html, new RegExp(`<meta[^>]*${key}="${value}"[^>]*content="([^"]*)"`)) ??
  attr(html, new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${key}="${value}"`));
const titles = new Map();
const descriptions = new Map();

for (const { file, route } of pages) {
  const html = fs.readFileSync(file, "utf8");
  const label = route === "" ? "/" : route;
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const description = metaContent(html, "name", "description");
  const canonical =
    attr(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/) ??
    attr(html, /<link[^>]*href="([^"]*)"[^>]*rel="canonical"/);
  const expectedUrl = SITE_URL + (route === "" || route === "/" ? "/" : route);

  if (!title) fail(`${label}: no <title>`);
  if (!description) fail(`${label}: no meta description`);
  if (label === "/404") {
    if (canonical) fail("/404 must not declare a canonical URL");
  } else if (canonical !== expectedUrl) {
    fail(`${label}: canonical is ${canonical}, expected ${expectedUrl}`);
  }
  if (metaContent(html, "property", "og:url") !== expectedUrl) fail(`${label}: og:url does not match ${expectedUrl}`);
  for (const key of ["og:title", "og:description", "og:image"]) {
    if (!metaContent(html, "property", key)) fail(`${label}: missing ${key}`);
  }
  if (!metaContent(html, "name", "twitter:card")) fail(`${label}: missing twitter:card`);
  if (/(name|property)="twitter:(url|site|creator)"/.test(html)) fail(`${label}: stale or unverified twitter:url/site/creator tag`);
  const robots = metaContent(html, "name", "robots") ?? "";
  if (label === "/404" && !/noindex/.test(robots)) fail("/404 must be noindex");
  if (label !== "/404" && /noindex/.test(robots)) fail(`${label}: unexpectedly noindex`);
  // Every page's social image must be on this site, in this build, with
  // alt text. Detail pages have their own diagram, the rest the portrait.
  const pageImage = metaContent(html, "property", "og:image");
  if (pageImage) {
    if (!pageImage.startsWith(SITE_URL)) fail(`${label}: og:image is not on ${SITE_URL}: ${pageImage}`);
    else if (!fs.existsSync(path.join(buildDir, new URL(pageImage).pathname))) fail(`${label}: og:image ${pageImage} is not in the build`);
  }
  if (!metaContent(html, "property", "og:image:alt")) fail(`${label}: missing og:image:alt`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      fail(`${label}: invalid JSON-LD`);
    }
  }
  if (label !== "/404") {
    if (titles.has(title)) fail(`${label}: duplicate title with ${titles.get(title)}`);
    titles.set(title, label);
    if (descriptions.has(description)) fail(`${label}: duplicate description with ${descriptions.get(description)}`);
    descriptions.set(description, label);
  }
  for (const match of html.matchAll(/https?:\/\/[a-z0-9.-]*netlify\.app[^"'\s<)]*/g)) {
    if (!match[0].startsWith(SITE_URL)) fail(`${label}: references another netlify.app origin: ${match[0]}`);
  }
}

// Sitemap, robots and the social image.
const sitemap = fs.readFileSync(path.join(buildDir, "sitemap.xml"), "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const prerendered = new Set(pages.map((p) => (p.route === "" ? "/" : p.route)));
for (const url of sitemapPaths) {
  if (!url.startsWith(SITE_URL)) fail(`sitemap: ${url} is not on ${SITE_URL}`);
  const route = url.slice(SITE_URL.length) || "/";
  const normalised = route.length > 1 ? route.replace(/\/$/, "") : route;
  if (!prerendered.has(normalised)) fail(`sitemap: ${url} was not prerendered`);
  if (["/story", "/prayer", "/404"].includes(normalised)) fail(`sitemap: private or error route listed: ${url}`);
}
const robotsTxt = fs.readFileSync(path.join(buildDir, "robots.txt"), "utf8");
const disallowed = [...robotsTxt.matchAll(/^Disallow:\s*(\S+)/gim)].map((m) => m[1]);
const ogImage = metaContent(fs.readFileSync(path.join(buildDir, "index.html"), "utf8"), "property", "og:image");
if (ogImage) {
  const imagePath = new URL(ogImage).pathname;
  if (disallowed.some((d) => imagePath.startsWith(d))) fail(`robots.txt blocks the social image ${imagePath}`);
  if (!fs.existsSync(path.join(buildDir, imagePath))) fail(`og:image ${imagePath} is not in the build`);
}
if (!robotsTxt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) fail("robots.txt does not point at the sitemap");
// Private routes are kept out of search by an X-Robots-Tag header in
// netlify.toml; listing them in robots.txt would advertise them.
for (const route of ["/story", "/prayer"]) {
  if (disallowed.includes(route)) fail(`robots.txt advertises the private route ${route}`);
}
const netlifyToml = fs.readFileSync(path.join(root, "netlify.toml"), "utf8");
for (const route of ["/story", "/prayer"]) {
  const block = new RegExp(`for = "${route}"\\s*\\[headers\\.values\\]\\s*X-Robots-Tag = "noindex`);
  if (!block.test(netlifyToml)) fail(`netlify.toml does not send X-Robots-Tag: noindex for ${route}`);
}

// Internal links in prerendered HTML must resolve.
for (const { file, route } of pages) {
  const html = fs.readFileSync(file, "utf8");
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const clean = href.length > 1 ? href.replace(/\/$/, "") : href;
    if (/\.[a-z0-9]+$/i.test(clean) || clean.startsWith("/static")) {
      if (!fs.existsSync(path.join(buildDir, clean))) fail(`${route || "/"}: missing asset ${href}`);
    } else if (!prerendered.has(clean) && !["/story", "/prayer"].includes(clean)) {
      fail(`${route || "/"}: link to ${href} has no prerendered page`);
    }
  }
}

// The Impressum (legal notice) is built only when src/data/impressum.ts is
// complete. Complete: every page links it. Incomplete: nothing links it and
// there is no page for it (a half-filled legal notice is not published), and
// releasing is blocked.
{
  const impressum = fs.readFileSync(path.join(root, "src/data/impressum.ts"), "utf8");
  const config = impressum.slice(impressum.indexOf("export const IMPRESSUM:"));
  const isNull = (field) => new RegExp(`\\b${field}: null`).test(config);
  const missing = [];
  if (isNull("address")) missing.push("address for service of legal documents");
  if (isNull("contactFormPath") && isNull("phone")) missing.push("second contact channel (contact form or phone)");
  for (const m of missing) blockers.push(`Impressum is not published: missing ${m} (src/data/impressum.ts)`);
  const built = fs.existsSync(path.join(buildDir, "impressum/index.html"));
  for (const { file, route } of pages) {
    if (route === "/404") continue;
    const links = fs.readFileSync(file, "utf8").includes('href="/impressum"');
    if (missing.length && links) fail(`${route || "/"}: links to an incomplete Impressum`);
    if (!missing.length && !links) fail(`${route || "/"}: no footer link to /impressum`);
  }
  if (missing.length && built) fail("an incomplete Impressum was prerendered");
  if (!missing.length && !built) fail("the Impressum is complete but was not prerendered");
}

// rss.xml is maintained by hand: every post must be in it, and every item in
// it must be a real post.
{
  const rss = fs.readFileSync(path.join(buildDir, "rss.xml"), "utf8");
  const items = new Set(
    [...rss.matchAll(/<item>[\s\S]*?<link>([^<]+)<\/link>/g)].map((m) => m[1].slice(SITE_URL.length)),
  );
  const posts = [...prerendered].filter((r) => r.startsWith("/blog/"));
  for (const post of posts) if (!items.has(post)) fail(`rss.xml is missing ${post}`);
  for (const item of items) if (!prerendered.has(item)) fail(`rss.xml lists ${item}, which is not a page`);
}

// Every bottom-dock button scrolls to a section id. A dock entry whose section
// is no longer rendered silently does nothing, so check each id exists in the
// prerendered page it belongs to.
{
  const nav = fs.readFileSync(path.join(root, "src/data/pageNavigation.ts"), "utf8");
  const idsIn = (text) => [...text.matchAll(/id: "([^"]+)"/g)].map((m) => m[1]);
  const consts = Object.fromEntries(
    [...nav.matchAll(/const (\w+): NavSection\[\] = \[([\s\S]*?)\n\];/g)].map((m) => [m[1], idsIn(m[2])]),
  );
  const config = nav.slice(nav.indexOf("export const PAGE_NAVIGATION"));
  for (const [, block] of config.matchAll(/\n  \w+: \{([\s\S]*?)\n  \},/g)) {
    const route = /paths: \["([^"]+)"/.exec(block)?.[1];
    if (!route || !prerendered.has(route) || !/showDock: true/.test(block)) continue;
    const dock = /dockSections: (\w+|\[[\s\S]*?\n    \])/.exec(block)?.[1] ?? "";
    const ids = dock.startsWith("[") ? idsIn(dock) : consts[dock] ?? [];
    const file = route === "/" ? "index.html" : path.join(route.slice(1), "index.html");
    const html = fs.readFileSync(path.join(buildDir, file), "utf8");
    for (const id of ids) {
      if (!html.includes(`id="${id}"`)) fail(`${route}: dock section #${id} is not on the page`);
    }
  }
}

// ------------------------------------------------------------ browser pass
if (useBrowser) {
  const { default: puppeteer } = await import("puppeteer");
  // Emulates netlify.toml: files win, /story and /prayer rewrite to the empty
  // shell, everything else is a real 404.
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost").pathname;
    const candidates = [path.join(buildDir, url), path.join(buildDir, url, "index.html")];
    const hit = candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
    const send = (status, file) => {
      const type = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webp": "image/webp", ".mp4": "video/mp4", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain" }[path.extname(file)] ?? "application/octet-stream";
      res.writeHead(status, { "Content-Type": type });
      fs.createReadStream(file).pipe(res);
    };
    if (hit) return send(200, hit);
    if (["/story", "/prayer"].includes(url.replace(/\/$/, ""))) return send(200, path.join(buildDir, "200.html"));
    return send(404, path.join(buildDir, "404.html"));
  });
  await new Promise((resolve) => server.listen(0, resolve));
  const origin = `http://localhost:${server.address().port}`;
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  try {
    const routes = [...prerendered].filter((r) => r !== "/404").sort();
    for (const language of ["en", "de"]) {
      for (const route of routes) {
        const page = await browser.newPage();
        const problems = [];
        page.on("pageerror", (error) => problems.push(error.message.slice(0, 80)));
        page.on("requestfailed", (request) => problems.push(`failed request ${request.url().replace(origin, "")}`));
        page.on("response", (response) => {
          if (response.status() >= 400) problems.push(`${response.status()} ${response.url().replace(origin, "")}`);
        });
        await page.evaluateOnNewDocument((lng) => {
          try {
            localStorage.setItem("i18nextLng", lng);
          } catch {}
        }, language);
        await page.goto(origin + route, { waitUntil: "networkidle2" });
        const state = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          unresolvedKeys: (document.body.innerText.match(/\{\{[A-Za-z0-9_.]+\}\}/g) || []).length,
          h1: document.querySelectorAll("h1").length,
          mains: document.querySelectorAll("main").length,
        }));
        if (state.lang !== language) problems.push(`html lang is ${state.lang}, expected ${language}`);
        if (state.unresolvedKeys) problems.push(`${state.unresolvedKeys} unresolved translation keys`);
        if (state.h1 !== 1) problems.push(`${state.h1} <h1> elements`);
        if (state.mains !== 1) problems.push(`${state.mains} <main> elements`);
        if (problems.length) fail(`[${language}] ${route}: ${problems.slice(0, 4).join("; ")}`);
        await page.close();
      }
    }
    // Unknown paths are real 404s; private routes still load.
    for (const [route, expected] of [["/does-not-exist", 404], ["/projects/nope", 404], ["/blog/nope", 404], ["/story", 200], ["/prayer", 200]]) {
      const page = await browser.newPage();
      const response = await page.goto(origin + route, { waitUntil: "networkidle2" });
      if (response.status() !== expected) fail(`${route} answered ${response.status()}, expected ${expected}`);
      await page.close();
    }
    notes.push(`browser pass: ${routes.length} routes x 2 languages, hydration and console clean`);
  } finally {
    await browser.close();
    server.close();
  }
}

for (const note of notes) console.log("  " + note);
if (blockers.length) {
  console.log(`\n${blockers.length} release blocker(s)${releaseMode ? "" : " (fail with --release)"}:`);
  for (const b of blockers) console.log("  - " + b);
  if (releaseMode) failures.push(...blockers.map((b) => `release blocker: ${b}`));
}
if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log("\nverify:build passed");

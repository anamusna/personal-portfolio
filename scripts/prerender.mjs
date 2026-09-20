// react-snap ships an abandoned, ancient bundled Puppeteer/Chromium that
// can't parse modern JS syntax in the build output. This wrapper runs
// react-snap programmatically with a fresh, cross-platform Chromium
// (installed as the separate `puppeteer` devDependency) instead.
import { createRequire } from "node:module";
import puppeteer from "puppeteer";

const require = createRequire(import.meta.url);
const reactSnap = require("react-snap");
const pkg = require("../package.json");

const executablePath = await puppeteer.executablePath();

reactSnap
  .run({
    ...pkg.reactSnap,
    puppeteerExecutablePath: executablePath,
    // React hydration compares the prerendered DOM against its own first
    // render literally, so anything that rewrites the snapshot is a
    // guaranteed mismatch, and a single mismatch makes React throw away the
    // whole prerendered tree and re-render client side. react-snap's default
    // html-minifier settings are not all safe here:
    //
    // - `collapseWhitespace` trims and collapses whitespace inside `class`
    //   attributes and text nodes. React compares both literally. Off.
    // - `decodeEntities` rewrites entities in text. Off.
    // - `collapseBooleanAttributes` turns `disabled=""` into `disabled`,
    //   while React writes the empty-string form. Off.
    // - `minifyCSS` has to stay ON. The snapshot is `outerHTML` from a live
    //   DOM, so the browser serialises inline styles as
    //   `opacity: 0; transform: none;`, while React builds the compact
    //   `opacity:0;transform:none`. clean-css normalises the snapshot back
    //   into React's form, so this is the one rewrite that helps. It does
    //   also fold CSS values (`0ms` -> `0s`), so inline styles must avoid
    //   units that clean-css rewrites.
    // - `sortAttributes` only reorders attributes; React looks them up by
    //   name, so it is safe and helps compression.
    minifyHtml: {
      collapseBooleanAttributes: false,
      collapseWhitespace: false,
      decodeEntities: false,
      keepClosingSlash: true,
      sortAttributes: true,
      sortClassName: false,
      minifyCSS: true,
    },
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

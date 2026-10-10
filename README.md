# Personal portfolio

Personal portfolio built with React, TypeScript, and Tailwind CSS. Career timeline, case studies, writing, and multilingual support (en/de).

Source for [ansumana-darboe.netlify.app](https://ansumana-darboe.netlify.app) — portfolio site of **Ansumana Darboe** (Ansu), Senior Software Engineer in Berlin.

React 18 and TypeScript (Create React App). Copy and configuration live in `src/data/`. Detail routes use feature modules in `src/features/`; route pages in `src/pages/` stay thin. For local development and code review.

## Site

Main sections:

- **Home** — intro, work highlights, testimonials, how I work, writing
- **Career** — timeline, roles, case studies
- **Projects** — selected work and detail views
- **About** — background, skills, values
- **Blog**, **FAQ**, **Testimonials**, **Contact**, **Privacy**, and **Impressum** (once complete)
- **Story** and **Prayer**: personal, unlisted pages (see below)
- English and German; light and dark theme

## Stack

- React 18, TypeScript, React Router
- Tailwind CSS
- Motion, i18next (en/de)
- Create React App (`react-scripts`)

## Local development

**Requirements:** Node.js and npm (tested with Node.js 22). The lockfile is `package-lock.json`.

```bash
git clone https://github.com/anamusna/my-website.git
cd my-website
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000). A fresh clone has
everything the public site needs: copy (`src/locales/`, `src/data/`), images
(`src/images/`) and fonts (`public/fonts/`). No environment variables, keys or
downloads are required.

### Checks

```bash
npx tsc --noEmit -p .          # type-check
npx eslint --ext .ts,.tsx src  # lint
CI=true npm test               # unit tests
npm run build                  # sitemap, production build, then react-snap prerenders every public route
npm run verify:build           # checks build/: hydration in both languages, metadata, social images,
                               # sitemap, RSS, robots, 404s, dock links, bundle budgets
npm run verify:release         # the same, and also fails on release blockers; run before deploying
```

`npm run build` downloads nothing at build time, but the prerender step uses
the Chromium that `puppeteer` installs during `npm ci`.

### Images

Blog covers and case-study diagrams in `src/images/covers/` are generated:
`node scripts/generate-covers.mjs` redraws them from the SVG definitions in that
script. Each case-study diagram may only show what that case study's text
says.

### Impressum

`src/data/impressum.ts` holds the legal notice. The `/impressum` page and its
footer link are only built once every legally required field is filled in; an
incomplete legal notice is never published. `npm run verify:build` lists what
is missing, and `npm run verify:release` fails until it is complete.

### Personal pages: `/story` and `/prayer`

Their text, photos and videos are not in the repository. They live in
`src/content/private/` (gitignored) and are loaded on demand by those routes
only (`src/data/private-content.ts`). A clone without those files builds and
works; the two pages say their content is not part of the build.

When the files are present, whatever is built is published: the content ends
up in JavaScript chunks and media files that anyone with the URL can fetch.
The pages are unlisted, left out of the sitemap and sent with
`X-Robots-Tag: noindex`, but **they are not access-controlled**. To build the
site without them even when the files are present:

```bash
npm run build:without-private
```

`verify:build` reports which of the two a build is.

### Deployment notes

- Hosting is Netlify; rules live in `netlify.toml`. Every public page is
  prerendered as a file, so unknown paths return a real 404. `/story` and
  `/prayer` are rewritten to `200.html`, the empty react-snap shell, never to
  `index.html` (that is the prerendered homepage and would fail hydration).
- English is bundled; German is a separate chunk that loads when needed.
  Hydration always starts in English and the visitor's language is applied
  right after.

## Contact

- **Email:** [thisisansumana@gmail.com](mailto:thisisansumana@gmail.com)
- **LinkedIn:** [linkedin.com/in/ansumana-darboe](https://www.linkedin.com/in/ansumana-darboe/)

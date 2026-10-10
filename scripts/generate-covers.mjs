// Generates the blog cover and case-study diagrams in src/images/covers/.
//
//   node scripts/generate-covers.mjs
//
// Each image is a small diagram of what the article or case study is about,
// drawn as SVG and rendered to WebP with the Chromium that puppeteer already
// installs. They replace stock artwork, and they double as the Open Graph
// image for their page, so they are 1200x630. Labels are technical terms only,
// because the same image is shown on the English and the German page.
//
// Every element of a case-study diagram must match something the case study
// itself says (src/locales/en.json, content.projects.items). Do not draw
// architecture the text does not describe.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "src/images/covers");
const font = fs.readFileSync(path.join(root, "public/fonts/inter-latin.woff2")).toString("base64");

const W = 1200;
const H = 630;
const C = {
  bg: "#0f172a",
  panel: "#1e293b",
  line: "#818cf8", // indigo-400
  muted: "#475569", // slate-600
  text: "#e2e8f0", // slate-200
  soft: "#94a3b8", // slate-400
  accent: "#fb923c", // orange-400, from the logo
};

// --- tiny SVG vocabulary --------------------------------------------------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const box = (x, y, w, h, label, { accent = false, dim = false, sub, size = 26 } = {}) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14"
    fill="${C.panel}" stroke="${accent ? C.accent : dim ? C.muted : C.line}" stroke-width="${accent ? 3 : 2}"/>
  <text x="${x + w / 2}" y="${y + h / 2 + (sub ? -4 : 8)}" text-anchor="middle"
    font-size="${size}" font-weight="700" fill="${dim ? C.soft : C.text}">${esc(label)}</text>
  ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 28}" text-anchor="middle" font-size="19" fill="${C.soft}">${esc(sub)}</text>` : ""}`;
const arrow = (x1, y1, x2, y2, { color = C.line, dash = false, label, lx, ly } = {}) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = (d) => x2 - 14 * Math.cos(a + d);
  const hy = (d) => y2 - 14 * Math.sin(a + d);
  return `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2.5"${dash ? ' stroke-dasharray="8 8"' : ""}/>
  <path d="M${x2},${y2} L${hx(0.45)},${hy(0.45)} M${x2},${y2} L${hx(-0.45)},${hy(-0.45)}" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  ${label ? `<text x="${lx ?? (x1 + x2) / 2}" y="${ly ?? (y1 + y2) / 2 - 10}" text-anchor="middle" font-size="19" fill="${C.soft}">${esc(label)}</text>` : ""}`;
};
const text = (x, y, s, { size = 20, color = C.soft, anchor = "middle", weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`;
const bar = (x, y, w, h, color) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${color}"/>`;

// --- diagrams -------------------------------------------------------------
const DIAGRAMS = {
  // Blog: measure first, then the levers the post covers.
  "blog-performance": () => `
    ${box(70, 250, 220, 110, "measure", { accent: true })}
    ${box(420, 90, 320, 84, "caching")}
    ${box(420, 200, 320, 84, "database indexes")}
    ${box(420, 310, 320, 84, "lighter images")}
    ${box(420, 420, 320, 84, "fewer requests")}
    ${box(890, 250, 240, 110, "page load", { sub: "watch after you ship" })}
    ${arrow(292, 305, 416, 132)}${arrow(292, 305, 416, 242)}${arrow(292, 305, 416, 352)}${arrow(292, 305, 416, 462)}
    ${arrow(742, 132, 886, 290)}${arrow(742, 242, 886, 298)}${arrow(742, 352, 886, 312)}${arrow(742, 462, 886, 320)}`,
  // Blog: services talking through events instead of direct calls.
  "blog-microservices": () => `
    <line x1="140" y1="315" x2="1060" y2="315" stroke="${C.accent}" stroke-width="4"/>
    ${text(600, 350, "Redis Pub/Sub", { color: C.accent, size: 18, weight: 600 })}
    ${box(230, 120, 300, 90, "React frontend")}
    ${box(670, 120, 300, 90, "user service")}
    ${box(230, 430, 300, 90, "notification service")}
    ${box(670, 430, 300, 90, "MongoDB", { dim: true })}
    ${arrow(380, 210, 380, 305)}
    ${arrow(820, 210, 820, 305, { label: "publish", lx: 880, ly: 262 })}
    ${arrow(380, 325, 380, 425, { label: "subscribe", lx: 315, ly: 380 })}
`,
  // Blog: a component tree, state at the top, props flowing down.
  "blog-components": () => `
    ${box(450, 100, 300, 100, "ParentCounter", { accent: true, sub: "state" })}
    ${box(170, 380, 300, 100, "CounterDisplay")}
    ${box(730, 380, 300, 100, "Button")}
    ${arrow(540, 202, 360, 376, { label: "props", lx: 400, ly: 280 })}
    ${arrow(840, 376, 660, 202, { label: "callback", lx: 820, ly: 280 })}
    ${text(600, 560, "data flows down, events flow up", { size: 20 })}`,
  // Blog: what React does after a state change.
  "blog-deep-dive": () => {
    const steps = ["setState", "render", "diff", "commit", "DOM"];
    return steps
      .map((s, i) => {
        const x = 70 + i * 220;
        return `${box(x, 260, 180, 100, s, { accent: i === 0 })}${i < steps.length - 1 ? arrow(x + 182, 310, x + 218, 310) : ""}`;
      })
      .join("") + text(600, 440, "component → virtual tree → minimal DOM update", { size: 20 });
  },
  // Blog: the hook cycle.
  "blog-hooks": () => `
    ${box(470, 70, 260, 96, "render")}
    ${box(820, 330, 260, 96, "useEffect")}
    ${box(120, 330, 260, 96, "setState", { accent: true })}
    ${box(470, 470, 260, 96, "useState", { dim: true, sub: "[value, setValue]" })}
    ${arrow(730, 150, 900, 326)}
    ${arrow(820, 400, 384, 400)}
    ${text(600, 440, "after paint, may update state", { size: 16 })}
    ${arrow(300, 326, 470, 150, { label: "re-render", lx: 340, ly: 220 })}
`,
  // Blog: diffing two virtual trees, patching only what changed.
  "blog-virtual-dom": () => {
    const tree = (ox, changed) => `
      ${box(ox + 120, 120, 120, 64, "div", { size: 20 })}
      ${box(ox, 260, 120, 64, "h1", { size: 20 })}
      ${box(ox + 240, 260, 120, 64, "ul", { size: 20, accent: changed })}
      ${box(ox + 170, 400, 90, 56, "li", { size: 18 })}
      ${box(ox + 290, 400, 90, 56, "li", { size: 18, accent: changed })}
      ${arrow(ox + 160, 184, ox + 70, 256)}${arrow(ox + 200, 184, ox + 290, 256)}
      ${arrow(ox + 290, 324, ox + 220, 396)}${arrow(ox + 310, 324, ox + 330, 396)}`;
    return `${tree(110, false)}${tree(700, true)}
      ${text(290, 540, "previous", { size: 18 })}${text(880, 540, "next", { size: 18 })}
      ${arrow(500, 300, 680, 300, { label: "diff", color: C.accent })}`;
  },
  // Blog: comparing three frameworks before choosing React.
  "blog-react-choice": () => `
    ${box(120, 200, 280, 230, "Angular", { dim: true })}
    ${box(460, 170, 280, 290, "React", { accent: true, size: 30 })}
    ${box(800, 200, 280, 230, "Vue", { dim: true })}
`,

  // Case study: layer boundaries as ESLint rules in CI, and who owns which state.
  "case-doctorly": () => `
    ${box(80, 70, 470, 84, "app shell")}
    ${box(80, 210, 470, 84, "features")}
    ${box(80, 350, 470, 84, "entities")}
    ${arrow(315, 156, 315, 206)}${arrow(315, 296, 315, 346)}
    ${text(315, 490, "imports only point down", { size: 18 })}
    ${text(315, 520, "ESLint dependency rules · enforced in CI", { size: 18, color: C.accent, weight: 600 })}
    ${box(650, 70, 470, 110, "React Query", { sub: "server state" })}
    ${box(650, 220, 470, 110, "Zustand", { sub: "shared client state" })}
    ${box(650, 370, 470, 110, "component state", { dim: true, sub: "everything else" })}
    ${text(885, 530, "Redux removed", { size: 18, color: C.accent, weight: 600 })}`,
  // Case study: a 30-year desktop system moved to the web one domain at a time.
  "case-quincy": () => `
    ${box(70, 160, 300, 300, "Desktop system", { dim: true, sub: "30+ years" })}
    ${box(830, 160, 300, 300, "React + TypeScript", { size: 24, sub: "responsive web app" })}
    ${box(450, 150, 300, 80, "Patients")}
    ${box(450, 270, 300, 80, "Appointments")}
    ${box(450, 390, 300, 80, "Documents")}
    ${arrow(372, 190, 446, 190)}${arrow(752, 190, 826, 190)}
    ${arrow(372, 310, 446, 310)}${arrow(752, 310, 826, 310)}
    ${arrow(372, 430, 446, 430)}${arrow(752, 430, 826, 430)}
    ${text(600, 540, "migrated domain by domain while practices kept working", { size: 20 })}`,
  // Case study: offline-first reading, background sync, a Node.js API on AWS.
  "case-zula": () => `
    ${box(70, 170, 290, 290, "React Native", { sub: "local cache" })}
    ${box(500, 220, 240, 190, "Node.js API")}
    ${box(880, 130, 250, 90, "EC2", { dim: true })}
    ${box(880, 270, 250, 90, "S3", { dim: true })}
    ${box(880, 410, 250, 90, "CloudFront", { dim: true })}
    ${arrow(364, 290, 496, 290, { color: C.accent, dash: true })}
    ${text(430, 250, "sync on", { size: 16, color: C.accent })}${text(430, 270, "reconnect", { size: 16, color: C.accent })}
    ${arrow(496, 340, 364, 340, { color: C.accent, dash: true })}
    ${arrow(742, 290, 876, 175)}${arrow(742, 315, 876, 315)}${arrow(742, 340, 876, 455)}
    ${text(215, 520, "reads offline", { size: 18, color: C.accent, weight: 600 })}
    ${text(1005, 560, "AWS", { size: 18 })}`,
  // Case study: the petition page request path.
  "case-innnit": () => {
    const steps = [
      ["Browser", ""],
      ["CDN", "static assets"],
      ["Next.js", "server rendering"],
      ["Redis", "cache"],
      ["MongoDB", "indexed queries"],
    ];
    return steps
      .map(([s, sub], i) => {
        const x = 40 + i * 230;
        return `${box(x, 240, 200, 120, s, { sub: sub || undefined, accent: i === 2 })}${i < steps.length - 1 ? arrow(x + 202, 300, x + 226, 300) : ""}`;
      })
      .join("") + text(600, 450, "petition pages rendered on the server, cached where the data allowed", { size: 20 });
  },
  // Case study: listing screens with skeleton loaders, offline changes that sync.
  "case-propstack": () => `
    <rect x="120" y="70" width="300" height="500" rx="36" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/>
    ${text(270, 125, "React Native", { size: 20, color: C.text, weight: 700 })}
    ${[0, 1, 2, 3].map((i) => `${bar(160, 170 + i * 90, 220, 18, C.muted)}${bar(160, 200 + i * 90, 140, 14, C.muted)}`).join("")}
    ${text(270, 545, "skeleton loaders", { size: 16 })}
    ${box(520, 220, 250, 110, "offline changes", { accent: true, size: 20 })}
    ${box(870, 220, 250, 110, "Node.js", { sub: "MongoDB" })}
    ${arrow(424, 275, 516, 275)}
    ${arrow(772, 275, 866, 275, { label: "sync", color: C.accent, dash: true })}
    ${text(820, 420, "agents keep working on patchy signal", { size: 20 })}`,
};

const html = (svg) => `<!doctype html><html><head><style>
  @font-face { font-family: Inter; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 100 900; }
  html, body { margin: 0; background: ${C.bg}; }
  svg { display: block; font-family: Inter, sans-serif; }
</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  ${svg}
</svg></body></html>`;

fs.mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H });
  const only = process.argv.slice(2);
  for (const [name, draw] of Object.entries(DIAGRAMS)) {
    if (only.length && !only.includes(name)) continue;
    await page.setContent(html(draw()), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(outDir, `${name}.webp`);
    await page.screenshot({ path: file, type: "webp", quality: 82 });
    console.log(`${path.relative(root, file)}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
  }
} finally {
  await browser.close();
}

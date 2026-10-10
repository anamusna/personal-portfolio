import fs from "node:fs";
import path from "node:path";
import { buildSitemapXml, getPublicSitemapPaths } from "./sitemap-config";

/** Writes public/sitemap.xml from sitemap-config.ts (run via npm run generate:sitemap). */
describe("sitemap generation", () => {
  it("writes sitemap.xml from sitemap-config", () => {
    const paths = getPublicSitemapPaths();
    expect(paths.length).toBeGreaterThan(0);

    const outputPath = path.join(process.cwd(), "public/sitemap.xml");
    fs.writeFileSync(outputPath, buildSitemapXml(), "utf8");

    expect(fs.existsSync(outputPath)).toBe(true);
  });
});

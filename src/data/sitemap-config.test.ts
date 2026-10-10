import { getPublicProjectPaths, getPublicSitemapPaths } from "./sitemap-config";

describe("sitemap-config", () => {
  it("includes the published Quincy case study in public project paths", () => {
    expect(getPublicProjectPaths()).toContain("/projects/quincy");
  });

  it("includes public hiring surfaces", () => {
    const paths = getPublicSitemapPaths();
    expect(paths).toContain("/");
    expect(paths).toContain("/career");
    expect(paths).toContain("/projects/zula");
    expect(paths).not.toContain("/story");
    expect(paths).not.toContain("/images");
  });
});

import { PAGE_SEO } from "./page-seo";
import { DEFAULT_PAGE_SEO } from "./site-config";

describe("page SEO config", () => {
  it("noindexes private Story route", () => {
    expect(PAGE_SEO.story.noindex).toBe(true);
  });

  it("noindexes private prayer route", () => {
    expect(PAGE_SEO.prayer.noindex).toBe(true);
  });

  it("indexes public hiring surfaces", () => {
    expect(PAGE_SEO.home.noindex).toBeUndefined();
    expect(PAGE_SEO.career.noindex).toBeUndefined();
    expect(PAGE_SEO.projects.noindex).toBeUndefined();
  });

  it("aligns home metadata with default site SEO positioning", () => {
    expect(PAGE_SEO.home.title).toBe(DEFAULT_PAGE_SEO.title);
    expect(PAGE_SEO.home.description).toBe(DEFAULT_PAGE_SEO.description);
    expect(PAGE_SEO.home.description).toMatch(/healthcare/i);
    expect(PAGE_SEO.home.description).not.toMatch(/15\+ years/i);
    expect(PAGE_SEO.home.description).toMatch(/eight years/i);
  });
});

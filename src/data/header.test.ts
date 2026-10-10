import {
  getHeaderHref,
  header,
  isHeaderNavActive,
  PRIMARY_HEADER_NAV,
} from "./header";

describe("primary header navigation", () => {
  it("exposes the hiring funnel in order: Career, Projects, About", () => {
    expect(PRIMARY_HEADER_NAV.map((item) => item.label)).toEqual([
      header.links.career.label,
      header.links.projects.label,
      header.links.about.label,
    ]);
  });

  it("highlights About as the header's primary action", () => {
    const aboutLink = PRIMARY_HEADER_NAV.find(
      (item) => item.url === header.links.about.url,
    );
    expect(aboutLink?.highlight).toBe(true);
    expect(aboutLink?.isPrimaryAction).toBe(true);
  });

  it("does not expose private or secondary routes in the header", () => {
    const urls = PRIMARY_HEADER_NAV.map((item) => item.url);
    expect(urls).not.toContain("story");
    expect(urls).not.toContain("prayer");
    expect(urls).not.toContain("testimonials");
    expect(urls).not.toContain("faq");
  });
});

describe("header href helpers", () => {
  it("resolves root and nested paths", () => {
    expect(getHeaderHref("")).toBe("/");
    expect(getHeaderHref("career")).toBe("/career");
    expect(isHeaderNavActive("/career", "career")).toBe(true);
    expect(isHeaderNavActive("/projects/zula", "projects")).toBe(true);
  });
});

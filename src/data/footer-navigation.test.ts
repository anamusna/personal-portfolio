import { FOOTER_NAV_LINKS } from "./footer-navigation";
import { IMPRESSUM_PUBLISHED } from "./impressum";

describe("footer navigation", () => {
  it("lists Career first for the hiring funnel", () => {
    expect(FOOTER_NAV_LINKS[0]?.href).toBe("/career");
  });

  it("includes Testimonials for social proof discoverability", () => {
    expect(FOOTER_NAV_LINKS.some((link) => link.href === "/testimonials")).toBe(
      true,
    );
  });

  it("does not link to private Story or prayer routes", () => {
    const hrefs = FOOTER_NAV_LINKS.map((link) => link.href);
    expect(hrefs).not.toContain("/story");
    expect(hrefs).not.toContain("/prayer");
    expect(hrefs).not.toContain("/images");
  });

  it("links the Impressum exactly when it is complete", () => {
    expect(FOOTER_NAV_LINKS.some((link) => link.href === "/impressum")).toBe(
      IMPRESSUM_PUBLISHED,
    );
  });

  it("uses unique hrefs", () => {
    const hrefs = FOOTER_NAV_LINKS.map((link) => link.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

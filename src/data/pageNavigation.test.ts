import { resolvePageId, shouldShowDockForPath } from "./pageNavigation";

describe("resolvePageId", () => {
  it("maps primary public routes", () => {
    expect(resolvePageId("/")).toBe("home");
    expect(resolvePageId("/career")).toBe("career");
    expect(resolvePageId("/projects/zula")).toBe("projects");
    expect(resolvePageId("/faq")).toBe("faq");
  });

  it("maps private story route without exposing it in public nav", () => {
    expect(resolvePageId("/story")).toBe("story");
  });

  it("maps private prayer route without exposing it in public nav", () => {
    expect(resolvePageId("/prayer")).toBe("prayer");
  });
});

describe("shouldShowDockForPath", () => {
  it("shows the dock on a page's own route", () => {
    expect(shouldShowDockForPath("/")).toBe(true);
    expect(shouldShowDockForPath("/projects")).toBe(true);
    expect(shouldShowDockForPath("/blog/")).toBe(true);
  });

  it("hides it on detail routes, whose sections the dock does not link to", () => {
    expect(shouldShowDockForPath("/projects/zula")).toBe(false);
    expect(shouldShowDockForPath("/blog/react-hooks")).toBe(false);
  });

  it("hides it where the page opts out", () => {
    expect(shouldShowDockForPath("/prayer")).toBe(false);
  });
});

import { slugify } from "./slugify";

describe("slugify", () => {
  it("builds stable slugs from blog titles", () => {
    expect(
      slugify("Event-Driven Microservices: When Your App Gets Too Big"),
    ).toBe("event-driven-microservices-when-your-app-gets-too-big");

    expect(slugify("React Hooks ")).toBe("react-hooks");
  });
});

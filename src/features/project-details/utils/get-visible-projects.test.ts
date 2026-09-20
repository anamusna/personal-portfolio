import { getVisibleProjects } from "./get-visible-projects";

describe("getVisibleProjects", () => {
  it("lists only projects with public case studies", () => {
    const ids = getVisibleProjects().map((project) => project.id);
    expect(ids).toContain("zula");
    expect(ids).toContain("quincy");
  });
});

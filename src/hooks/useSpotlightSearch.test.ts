import de from "../locales/de.json";
import en from "../locales/en.json";
import { matchScore } from "./useSpotlightSearch";
import type { SpotlightEntry } from "../data/about/spotlightData";

const rank = (query: string, entries: SpotlightEntry[]) =>
  entries
    .map((entry, index) => ({ entry, index, score: matchScore(query, entry) }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

describe.each([
  ["en", en.content.spotlight.entries as SpotlightEntry[]],
  ["de", de.content.spotlight.entries as SpotlightEntry[]],
])("Spotlight retrieval (%s)", (_language, entries) => {
  it("returns an entry for its own title as the top result", () => {
    const misses = entries
      .filter((entry) => rank(entry.title, entries)[0].entry.id !== entry.id)
      .map((entry) => entry.id);

    expect(misses).toEqual([]);
  });

  it("matches single keywords to the intended entry", () => {
    expect(rank("zula", entries)[0].entry.id).toBe("project-zula");
    expect(rank("quincy", entries)[0].entry.id).toBe("project-quincy");
    expect(rank("football", entries)[0].entry.id).toBe("journey-football");
  });
});

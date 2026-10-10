import de from "../locales/de.json";
import en from "../locales/en.json";

const collectPaths = (value: unknown, prefix = ""): string[] => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectPaths(item, `${prefix}[${index}]`),
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(
      ([key, child]) => collectPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
};

describe("locale files", () => {
  it("expose the same keys and array lengths in English and German", () => {
    const enPaths = new Set(collectPaths(en));
    const dePaths = new Set(collectPaths(de));
    const missingInDe = Array.from(enPaths).filter((path) => !dePaths.has(path));
    const missingInEn = Array.from(dePaths).filter((path) => !enPaths.has(path));

    expect({ missingInDe, missingInEn }).toEqual({
      missingInDe: [],
      missingInEn: [],
    });
  });

  it("has no empty strings in either language", () => {
    const empties = (locale: unknown) =>
      collectPaths(locale).filter((path) => {
        const segments = path.replace(/\[(\d+)\]/g, ".$1").split(".");
        let node: unknown = locale;
        for (const segment of segments) {
          node = (node as Record<string, unknown>)[segment];
        }
        return node === "";
      });

    expect(empties(en)).toEqual([]);
    expect(empties(de)).toEqual([]);
  });

  it("keeps Spotlight entry ids identical across languages", () => {
    const ids = (locale: typeof en) =>
      locale.content.spotlight.entries.map((entry) => entry.id);
    expect(ids(de)).toEqual(ids(en));
  });
});

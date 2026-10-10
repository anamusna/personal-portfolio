import type { StoryData } from "./storyDataStructured";

// The personal pages (/story and /prayer) take their text and media from
// src/content/private/. That directory is gitignored, so a fresh clone has
// none of it and the public repository never contains it. `require.context`
// keeps the build working either way: it resolves against the directory,
// which is tracked through a .gitkeep, and finds whatever files exist.
//
// Whatever is present at build time is published. These pages are unlisted
// and sent with `X-Robots-Tag: noindex`, but they are not access-controlled:
// anyone who finds the URL, or reads the JavaScript chunks, can read them.
// REACT_APP_PRIVATE_PAGES=exclude builds the site without them even when the
// files are present; webpack then drops the require.context calls entirely.
// The condition has to stay inline for webpack to remove the dead branch.

const NO_FILES = Object.assign(() => undefined, { keys: () => [] as string[] });

// "lazy": each text file is its own chunk, downloaded only by its page.
const storyFiles =
  process.env.REACT_APP_PRIVATE_PAGES === "exclude"
    ? NO_FILES
    : require.context(
        "../content/private",
        false,
        /^\.\/story\.(en|de)\.json$/,
        "lazy",
      );

const prayerFiles =
  process.env.REACT_APP_PRIVATE_PAGES === "exclude"
    ? NO_FILES
    : require.context(
        "../content/private",
        false,
        /^\.\/prayer\.json$/,
        "lazy",
      );

export type PrayerData = {
  greeting: string;
  title: string;
  intro?: string;
  content: string;
};

const cache = new Map<string, Promise<unknown>>();

const loadOnce = <T>(key: string, load: () => Promise<T>): Promise<T> => {
  let pending = cache.get(key) as Promise<T> | undefined;
  if (!pending) {
    pending = load();
    // A failed chunk load (offline, or a deploy since the page opened) must
    // not be remembered, or every later visit in this session fails too.
    pending.catch(() => cache.delete(key));
    cache.set(key, pending);
  }
  return pending;
};

const loadJson = <T>(
  files: ReturnType<typeof require.context>,
  name: string,
): Promise<T> =>
  Promise.resolve(files(name)).then(
    (module: { default?: T } & T) => (module.default ?? module) as T,
  );

/**
 * Resolves the story text for `language`, falling back to English, or `null`
 * when this build does not include any story content.
 */
export const loadStoryContent = (
  language: string,
): Promise<StoryData | null> => {
  const key = language.toLowerCase().startsWith("de") ? "de" : "en";
  return loadOnce(`story-${key}`, () => {
    const available = storyFiles.keys();
    const file = [`./story.${key}.json`, "./story.en.json"].find((name) =>
      available.includes(name),
    );
    return file ? loadJson<StoryData>(storyFiles, file) : Promise.resolve(null);
  });
};

/** Resolves the prayer text, or `null` when this build does not include it. */
export const loadPrayerContent = (): Promise<PrayerData | null> =>
  loadOnce("prayer", () =>
    prayerFiles.keys().includes("./prayer.json")
      ? loadJson<PrayerData>(prayerFiles, "./prayer.json")
      : Promise.resolve(null),
  );

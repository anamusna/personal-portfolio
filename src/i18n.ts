import * as i18next from "i18next";
import type { InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";

export const namespace = "ansumana";
const SUPPORTED_LANGUAGES = ["en", "de"] as const;
export const DEFAULT_LANGUAGE = "en";

// Only English ships in the main bundle: it is the language react-snap
// prerenders, so it has to be available synchronously for hydration. German is
// a separate chunk, loaded when it is actually needed (see `loadLanguage`).
export const resources = {
  en: {
    [namespace]: en,
  },
};

const options: InitOptions = {
  // The initial language is always English so the client's first render
  // matches the prerendered HTML. The visitor's real language is applied right
  // after hydration by `applyDetectedLanguage`.
  lng: DEFAULT_LANGUAGE,
  ns: namespace,
  defaultNS: namespace,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  nonExplicitSupportedLngs: false,
  resources,
  parseMissingKeyHandler(key: string) {
    return `{{${key}}}`;
  },
  interpolation: {
    escapeValue: false,
    skipOnVariables: false,
  },
  debug: false,
  // `lng` is fixed above, so the detector only remembers the visitor's
  // choice; detecting it at boot is done by `detectVisitorLanguage` below.
  detection: {
    lookupLocalStorage: "i18nextLng",
    // localStorage only: a cookie would duplicate it and travel with every
    // request for no benefit.
    caches: ["localStorage"],
  },
  react: {
    useSuspense: false,
  },
  returnEmptyString: false,
};

const i18nInstance = i18next.createInstance();

const normaliseLanguage = (value?: string | readonly string[] | null) => {
  const first = Array.isArray(value) ? value[0] : (value as string | undefined);
  return first?.toLowerCase().startsWith("de") ? "de" : "en";
};

/**
 * The visitor's language, read before i18next initialises. i18next writes the
 * language it starts with back to localStorage, so detecting afterwards would
 * only ever see the English that hydration forces. Order matches the detector
 * options below: `?lng=`, stored choice, then the browser.
 */
const detectVisitorLanguage = (): string => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const fromQuery = new URLSearchParams(window.location.search).get("lng");
    if (fromQuery) return normaliseLanguage(fromQuery);
    const stored = window.localStorage.getItem("i18nextLng");
    if (stored) return normaliseLanguage(stored);
  } catch {
    // Storage or URL access can be blocked; fall through to the browser.
  }
  return normaliseLanguage(
    window.navigator.languages ?? window.navigator.language,
  );
};

const visitorLanguage = detectVisitorLanguage();

i18nInstance
  .use(initReactI18next)
  .use(LanguageDetector)
  .init(options);

const pendingLoads = new Map<string, Promise<void>>();

/** Makes sure the resource bundle for `language` is registered. */
export const loadLanguage = (language: string): Promise<void> => {
  if (language !== "de") return Promise.resolve();
  if (i18nInstance.hasResourceBundle(language, namespace)) {
    return Promise.resolve();
  }
  let pending = pendingLoads.get(language);
  if (!pending) {
    // A literal path, not a template: a template would make webpack bundle
    // every file in ./locales, English included, into the lazy chunk.
    pending = import(/* webpackChunkName: "locale-de" */ "./locales/de.json")
      .then((module) => {
        i18nInstance.addResourceBundle(
          language,
          namespace,
          module.default ?? module,
          true,
          true,
        );
      })
      .finally(() => pendingLoads.delete(language));
    pendingLoads.set(language, pending);
  }
  return pending;
};

/**
 * Loads the bundle first, then switches, so the page never renders translation
 * keys or flashes English while German is arriving. If the bundle fails to
 * load the visitor stays on English rather than on a broken page.
 */
export const switchLanguage = async (language: string): Promise<void> => {
  const target = normaliseLanguage(language);
  try {
    await loadLanguage(target);
  } catch {
    return;
  }
  await i18nInstance.changeLanguage(target);
};

/** Applies the language detected at boot (URL, stored choice, browser). */
export const applyDetectedLanguage = async (): Promise<void> => {
  if (visitorLanguage !== normaliseLanguage(i18nInstance.language)) {
    await switchLanguage(visitorLanguage);
  }
};

// Keep <html lang> in step with the active language. Language switching is
// client side, so without this the document stays lang="en" while showing
// German, which is what screen readers and search engines read.
const syncDocumentLanguage = (language?: string) => {
  if (typeof document === "undefined") return;
  const resolved = language?.toLowerCase().startsWith("de") ? "de" : "en";
  if (document.documentElement.lang !== resolved) {
    document.documentElement.lang = resolved;
  }
};

syncDocumentLanguage(i18nInstance.resolvedLanguage ?? i18nInstance.language);
i18nInstance.on("languageChanged", syncDocumentLanguage);

export default i18nInstance;

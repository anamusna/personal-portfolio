import * as i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import "intl-pluralrules";
import { initReactI18next } from "react-i18next";
import de from "./locales/de.json";
import en from "./locales/en.json";

export const namespace = "ansumana";
const SUPPORTED_LANGUAGES = ["en", "de"] as const;
export const DEFAULT_LANGUAGE = "en";

export const resources = {
  en: {
    [namespace]: en,
  },
  de: {
    [namespace]: de,
  },
};

const options: any = {
  ns: namespace,
  defaultNS: namespace,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  nonExplicitSupportedLngs: false,
  resources,
  showSupportNotice: false,
  parseMissingKeyHandler(key: string) {
    return `{{${key}}}`;
  },
  interpolation: {
    escapeValue: false,
    skipOnVariables: false,
  },
  debug: false,
  detection: {
    order: [
      "path",
      "querystring",
      "localStorage",
      "cookie",
      "sessionStorage",
      "navigator",
    ],
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupSessionStorage: "i18nextLng",
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,
    convertDetectedLanguage: "Iso15897",
    whitelist: ["en", "de"],
    checkWhitelist: true,
    caches: ["localStorage", "cookie"],
  },
  react: {
    useSuspense: false,
  },
  returnEmptyString: false,
};

const i18nInstance = i18next.createInstance();

const loadLocales = (i18nInstance: i18next.i18n) => {
  i18nInstance.addResourceBundle("en", namespace, en);
  i18nInstance.addResourceBundle("de", namespace, de);
};

i18nInstance
  .use(XHR)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    ...options,
    detection: {
      ...options.detection,
    },
  });

loadLocales(i18nInstance);

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

import i18n, { applyDetectedLanguage, switchLanguage } from "./i18n";
import de from "./locales/de.json";
import en from "./locales/en.json";

describe("language loading", () => {
  afterEach(async () => {
    await switchLanguage("en");
  });

  it("starts in English with only the English bundle registered", () => {
    expect(i18n.language).toBe("en");
    expect(i18n.hasResourceBundle("en", "ansumana")).toBe(true);
    expect(i18n.hasResourceBundle("de", "ansumana")).toBe(false);
    expect(i18n.t("pages.faq.title")).toBe(en.pages.faq.title);
  });

  it("loads the German bundle on demand and switches only once it is there", async () => {
    await switchLanguage("de");

    expect(i18n.hasResourceBundle("de", "ansumana")).toBe(true);
    expect(i18n.language).toBe("de");
    expect(i18n.t("pages.faq.title")).toBe(de.pages.faq.title);
  });

  it("treats regional variants such as de-AT as German", async () => {
    await switchLanguage("de-AT");
    expect(i18n.language).toBe("de");
  });

  it("applies the detected language without throwing when it is already active", async () => {
    await expect(applyDetectedLanguage()).resolves.toBeUndefined();
  });
});

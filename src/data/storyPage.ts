import i18n from "../i18n";
import enLocale from "../locales/en.json";

/** Above-the-fold orientation for /story: a map only, not a résumé summary. */
const defaultStoryPage = enLocale.content.storyPage;

export type StoryPageMetadata = {
  title?: string;
  subtitle?: string;
};

/**
 * Hero copy for /story. The eyebrow and subtitle come from the private story
 * file, which is loaded on demand, so they are passed in rather than imported.
 */
export const buildStoryPageContent = (metadata: StoryPageMetadata) => ({
  eyebrow: metadata.title,
  title: i18n.t("content.storyPage.title", {
    defaultValue: defaultStoryPage.title,
  }),
  subtitle: metadata.subtitle,
  orientationLines: i18n.t("content.storyPage.orientation.lines", {
    returnObjects: true,
    defaultValue: defaultStoryPage.orientation.lines,
  }) as string[],
  chapterNote: i18n.t("content.storyPage.orientation.invitation", {
    defaultValue: defaultStoryPage.orientation.invitation,
  }),
});

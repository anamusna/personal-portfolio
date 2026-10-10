import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

type AboutPageContent = (typeof enLocale)["content"]["aboutPage"];
const defaultAboutPageContent: AboutPageContent = enLocale.content.aboutPage;

export const aboutPageContent = createLocalizedResource(
  "content.aboutPage",
  defaultAboutPageContent,
) as AboutPageContent;

import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

type HomePageContent = (typeof enLocale)["content"]["homePage"];
const defaultHomePageContent: HomePageContent = enLocale.content.homePage;

export const homePageContent = createLocalizedResource(
  "content.homePage",
  defaultHomePageContent,
) as HomePageContent;

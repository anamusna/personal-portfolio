import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

type CareerPageContent = (typeof enLocale)["content"]["careerPage"];
const defaultCareerPageContent: CareerPageContent = enLocale.content.careerPage;

export const careerPageContent = createLocalizedResource(
  "content.careerPage",
  defaultCareerPageContent,
) as CareerPageContent;

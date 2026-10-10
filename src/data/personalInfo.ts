import i18n from "../i18n";
import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";
import { experiences } from "./experiences";

type PersonalInfo = (typeof enLocale)["content"]["personalInfo"] & {
  experience: typeof experiences;
  [key: string]: any;
};

const defaultPersonalInfo: (typeof enLocale)["content"]["personalInfo"] =
  enLocale.content.personalInfo;

export const personalInfo = createLocalizedResource(
  "content.personalInfo",
  defaultPersonalInfo,
) as PersonalInfo;

const syncExperience = () => {
  personalInfo.experience = experiences;
};

syncExperience();
i18n.on("languageChanged", syncExperience);

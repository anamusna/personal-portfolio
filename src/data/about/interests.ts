import enLocale from "../../locales/en.json";
import { createLocalizedResource } from "../../utils/localized-resource";

export interface Interest {
  /** Key into the icon map in personal-interests.tsx. */
  icon: "purpose" | "football" | "cooking";
  title: string;
  description: string;
  details?: string;
  relatedSkills?: string[];
  category?: "technical" | "creative" | "personal" | "professional";
}

type InterestsContent = (typeof enLocale)["content"]["interests"];
const defaultInterests: InterestsContent = enLocale.content.interests;

export const interestsSection = createLocalizedResource(
  "content.interests.section",
  defaultInterests.section,
) as InterestsContent["section"];

export const interests: Interest[] = createLocalizedResource(
  "content.interests.items",
  defaultInterests.items,
) as Interest[];

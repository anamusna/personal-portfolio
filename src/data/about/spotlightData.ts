import enLocale from "../../locales/en.json";
import { createLocalizedResource } from "../../utils/localized-resource";

export type SpotlightCategory =
  | "general"
  | "background"
  | "journey"
  | "projects"
  | "skills"
  | "education"
  | "focus"
  | "services"
  | "values"
  | "contact";

export type SpotlightIcon =
  | "sparkles"
  | "user"
  | "map"
  | "briefcase"
  | "code"
  | "stack"
  | "graduation"
  | "shield"
  | "chat";

export interface SpotlightEntry {
  id: string;
  category: SpotlightCategory;
  title: string;
  description: string;
  keywords: string[];
  icon: SpotlightIcon;
  response: string;
}

type SpotlightContent = (typeof enLocale)["content"]["spotlight"];
const defaultSpotlightEntries =
  enLocale.content.spotlight.entries as SpotlightContent["entries"];

export const SPOTLIGHT_ENTRIES: SpotlightEntry[] = createLocalizedResource(
  "content.spotlight.entries",
  defaultSpotlightEntries,
) as SpotlightEntry[];

export const SPOTLIGHT_IDS: string[] = SPOTLIGHT_ENTRIES.map((entry) => entry.id);

export const SPOTLIGHT_CATEGORY_ORDER: SpotlightCategory[] = [
  "general",
  "background",
  "journey",
  "projects",
  "skills",
  "focus",
  "services",
  "education",
  "values",
  "contact",
];

import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

export type SkillCapabilityId =
  | "product-interfaces"
  | "backend-data"
  | "cloud-delivery"
  | "quality-delivery";

export interface SkillCapability {
  id: SkillCapabilityId;
  title: string;
  summary: string;
  technologies: string[];
}

type SkillsContent = (typeof enLocale)["content"]["skills"];
const defaultSkills: SkillsContent = enLocale.content.skills;

export const skillCapabilities: SkillCapability[] = createLocalizedResource(
  "content.skills.skillCapabilities",
  defaultSkills.skillCapabilities,
) as SkillCapability[];

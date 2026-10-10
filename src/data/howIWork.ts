import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

export type HowIWorkPrincipleId =
  | "real-users"
  | "modernize"
  | "measure"
  | "maintain";

export interface HowIWorkPrinciple {
  id: HowIWorkPrincipleId;
  index: string;
  title: string;
  detail: string;
}

type HowIWorkSection = (typeof enLocale)["content"]["howIWorkSection"];
const defaultHowIWorkSection: HowIWorkSection = enLocale.content.howIWorkSection;

export const howIWorkSection = createLocalizedResource(
  "content.howIWorkSection",
  defaultHowIWorkSection,
) as Omit<HowIWorkSection, "principles"> & {
  principles: HowIWorkPrinciple[];
};

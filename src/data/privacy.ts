import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

export interface PrivacySection {
  id: string;
  title: string;
  content: string;
}

type PrivacyMeta = (typeof enLocale)["content"]["privacyMeta"];
type PrivacySections = (typeof enLocale)["content"]["privacySections"];

const defaultPrivacyMeta: PrivacyMeta = enLocale.content.privacyMeta;
const defaultPrivacySections: PrivacySections = enLocale.content.privacySections;

export const privacyMeta = createLocalizedResource(
  "content.privacyMeta",
  defaultPrivacyMeta,
) as PrivacyMeta;

export const privacySections: PrivacySection[] = createLocalizedResource(
  "content.privacySections",
  defaultPrivacySections,
) as PrivacySection[];

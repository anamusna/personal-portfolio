import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

export interface WorkHabitGroup {
  title: string;
  points: string[];
}

type TechnicalSetupContent = (typeof enLocale)["content"]["technicalSetup"];
const defaultTechnicalSetup: TechnicalSetupContent =
  enLocale.content.technicalSetup;

/**
 * Live, reactive object — its properties are reassigned in place whenever the
 * language changes (see `createLocalizedResource`). Always read properties
 * off this object at render time; do not destructure into module-level
 * consts, since those would capture a one-time snapshot that goes stale.
 */
export const technicalSetupContent = createLocalizedResource(
  "content.technicalSetup",
  defaultTechnicalSetup,
) as TechnicalSetupContent;

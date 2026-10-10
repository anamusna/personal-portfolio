import {
  faRocket,
  faScaleBalanced,
  faUserCheck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import i18n from "../i18n";
import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

interface Value {
  icon: typeof faUserCheck;
  title: string;
  description: string;
  details: string;
  category: "foundation" | "collaboration" | "excellence";
}

type LocaleValue = Omit<Value, "icon">;
const defaultValues = enLocale.content.values.items as LocaleValue[];

const valueIcons: Value["icon"][] = [
  faUserCheck,
  faScaleBalanced,
  faRocket,
  faUsers,
];

const localizedValues = createLocalizedResource(
  "content.values.items",
  defaultValues,
) as LocaleValue[];

const buildValues = (): Value[] =>
  localizedValues.map((item, index) => ({
    ...item,
    icon: valueIcons[index] ?? faUserCheck,
  }));

export const values: Value[] = buildValues();

// `localizedValues` is replaced wholesale (new object references) on
// language change; keep the derived `values` array in sync so it doesn't
// stay frozen at whatever language was active on first load.
i18n.on("languageChanged", () => {
  values.splice(0, values.length, ...buildValues());
});

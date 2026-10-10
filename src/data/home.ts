import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

type HomeContent = (typeof enLocale)["content"]["home"];
const defaultHome: HomeContent = enLocale.content.home;

export const home = createLocalizedResource("content.home", defaultHome) as HomeContent;

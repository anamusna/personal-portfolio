import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

type ContactLinks = (typeof enLocale)["content"]["contactLinks"];
const defaultContact: ContactLinks = enLocale.content.contactLinks;

export const contact = createLocalizedResource(
  "content.contactLinks",
  defaultContact,
) as ContactLinks;

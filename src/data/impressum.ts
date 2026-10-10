/**
 * Provider identification for the Impressum (German legal notice).
 *
 * Legal bases, as researched on 10 October 2026 (research, not legal advice):
 * - § 5 DDG (Digitale-Dienste-Gesetz): name, an address at which legal
 *   documents can be served (a "ladungsfähige Anschrift"; a P.O. box is not
 *   enough, a c/o address only with an authorisation to accept service), an
 *   email address, and a second fast, direct way to get in touch
 *   (CJEU C-298/07: a contact form is enough, a phone number is not required).
 * - § 18 MStV (Medienstaatsvertrag): a responsible person with name and
 *   address, for sites that are not purely personal and for editorial
 *   content such as a blog.
 *
 * The page is only built when every required field is present. Until then
 * there is no /impressum route and no footer link: an Impressum that looks
 * complete but is not would be worse than none. `npm run verify:release`
 * fails while anything is missing.
 */
export type ImpressumAddress = {
  /** e.g. "c/o Example Coworking GmbH" when using an authorised recipient. */
  careOf?: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

export type ImpressumData = {
  /** Full legal name, as it should appear in the legal notice. */
  name: string;
  /** Where legal documents can be served. Never a P.O. box. */
  address: ImpressumAddress | null;
  /** The published email address. */
  email: string;
  /**
   * The second contact channel next to email: a contact form on this site
   * (path) or a phone number. One of the two is required.
   */
  contactFormPath: string | null;
  phone: string | null;
  /** USt-IdNr. or W-IdNr., only if the owner has one. */
  vatId: string | null;
};

export const IMPRESSUM: ImpressumData = {
  name: "Ansumana Darboe",
  address: null,
  email: "thisisansumana@gmail.com",
  contactFormPath: null,
  phone: null,
  vatId: null,
};

/** Required details that are still missing. Empty when the page can ship. */
export const getMissingImpressumFields = (
  data: ImpressumData = IMPRESSUM,
): string[] => {
  const missing: string[] = [];
  if (!data.address) missing.push("address for service of legal documents");
  if (!data.contactFormPath && !data.phone) {
    missing.push("second contact channel (contact form or phone)");
  }
  return missing;
};

export const IMPRESSUM_PUBLISHED = getMissingImpressumFields().length === 0;

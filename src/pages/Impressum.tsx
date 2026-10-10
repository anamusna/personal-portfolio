import HeroHeader from "components/elements/hero-header";
import { legalPageIcon } from "components/elements/page-icons";
import { LAYOUT_STYLES } from "data/heroData";
import { IMPRESSUM, ImpressumAddress } from "data/impressum";
import React from "react";
import { Link } from "react-router-dom";

// Only routed when src/data/impressum.ts is complete (IMPRESSUM_PUBLISHED).
// One bilingual page rather than a translated one: the German notice is the
// one the law asks for, and the English text below it is a courtesy
// translation. It therefore does not change with the language switch.

const SECTION_CLASS =
  "scroll-mt-24 p-6 sm:p-8 first:rounded-t-2xl last:rounded-b-2xl";
const SECTION_TITLE_CLASS =
  "text-lg sm:text-xl font-semibold text-heading mb-3";
const BODY_CLASS = "text-sm sm:text-base leading-relaxed text-body";
const LINK_CLASS =
  "font-medium text-royal-primary dark:text-royal-400 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/40 rounded";

const Address: React.FC<{ address: ImpressumAddress }> = ({ address }) => (
  <>
    {address.careOf && (
      <>
        {address.careOf}
        <br />
      </>
    )}
    {address.street}
      <br />
      {`${address.postalCode} ${address.city}`}
    <br />
    {address.country}
  </>
);

type NoticeCopy = {
  lang: "de" | "en";
  heading: string;
  providerTitle: string;
  contactTitle: string;
  emailLabel: string;
  phoneLabel: string;
  formLabel: string;
  formLink: string;
  vatLabel: string;
  responsibleTitle: string;
  responsibleNote: string;
  privacyNote: string;
  privacyLink: string;
};

const NOTICES: NoticeCopy[] = [
  {
    lang: "de",
    heading: "Impressum",
    providerTitle: "Angaben gemäß § 5 DDG",
    contactTitle: "Kontakt",
    emailLabel: "E-Mail",
    phoneLabel: "Telefon",
    formLabel: "Kontaktformular",
    formLink: "Nachricht senden",
    vatLabel: "Umsatzsteuer-Identifikationsnummer",
    responsibleTitle: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    responsibleNote: "Anschrift wie oben.",
    privacyNote: "Informationen zum Datenschutz:",
    privacyLink: "Datenschutzerklärung",
  },
  {
    lang: "en",
    heading: "Legal notice",
    providerTitle:
      "Information pursuant to § 5 DDG (German Digital Services Act)",
    contactTitle: "Contact",
    emailLabel: "Email",
    phoneLabel: "Phone",
    formLabel: "Contact form",
    formLink: "Send a message",
    vatLabel: "VAT identification number",
    responsibleTitle:
      "Responsible for content under § 18(2) MStV (German Interstate Media Treaty)",
    responsibleNote: "Address as above.",
    privacyNote: "How this site handles personal data:",
    privacyLink: "Privacy policy",
  },
];

const Notice: React.FC<{ copy: NoticeCopy }> = ({ copy }) => (
  <section
    lang={copy.lang}
    aria-labelledby={`impressum-${copy.lang}`}
    className="surface-card rounded-2xl border border-light-border/55 dark:border-dark-border/40 divide-y divide-light-border/50 dark:divide-dark-border/40"
  >
    <div className={SECTION_CLASS}>
      <h2 id={`impressum-${copy.lang}`} className={SECTION_TITLE_CLASS}>
        {copy.heading}
      </h2>
      <h3 className="text-sm font-semibold text-muted mb-2">
        {copy.providerTitle}
      </h3>
      <address className={`${BODY_CLASS} not-italic`}>
        {IMPRESSUM.name}
        <br />
        {IMPRESSUM.address && <Address address={IMPRESSUM.address} />}
      </address>
    </div>

    <div className={SECTION_CLASS}>
      <h3 className={SECTION_TITLE_CLASS}>{copy.contactTitle}</h3>
      <dl className={`${BODY_CLASS} grid grid-cols-[auto_1fr] gap-x-4 gap-y-1`}>
        <dt>{copy.emailLabel}</dt>
        <dd>
          <a href={`mailto:${IMPRESSUM.email}`} className={LINK_CLASS}>
            {IMPRESSUM.email}
          </a>
        </dd>
        {IMPRESSUM.contactFormPath && (
          <>
            <dt>{copy.formLabel}</dt>
            <dd>
              <Link to={IMPRESSUM.contactFormPath} className={LINK_CLASS}>
                {copy.formLink}
              </Link>
            </dd>
          </>
        )}
        {IMPRESSUM.phone && (
          <>
            <dt>{copy.phoneLabel}</dt>
            <dd>
              <a
                href={`tel:${IMPRESSUM.phone.replace(/\s/g, "")}`}
                className={LINK_CLASS}
              >
                {IMPRESSUM.phone}
              </a>
            </dd>
          </>
        )}
        {IMPRESSUM.vatId && (
          <>
            <dt>{copy.vatLabel}</dt>
            <dd>{IMPRESSUM.vatId}</dd>
          </>
        )}
      </dl>
    </div>

    <div className={SECTION_CLASS}>
      <h3 className={SECTION_TITLE_CLASS}>{copy.responsibleTitle}</h3>
      <p className={BODY_CLASS}>
        {`${IMPRESSUM.name}. ${copy.responsibleNote}`}
      </p>
      <p className={`${BODY_CLASS} mt-4`}>
        {`${copy.privacyNote} `}
        <Link to="/privacy" className={LINK_CLASS}>
          {copy.privacyLink}
        </Link>
      </p>
    </div>
  </section>
);

const Impressum: React.FC = () => (
  <div className={LAYOUT_STYLES.PAGE_ROOT}>
    <div className="relative z-10 pt-6 md:pt-8">
      <article className={`${LAYOUT_STYLES.CONTENT_CONTAINER} max-w-3xl`}>
        <HeroHeader
          greeting="Legal notice"
          title="Impressum"
          subtitle="Anbieterkennzeichnung · Provider identification"
          alignment="center"
          subtitleClassName="max-w-2xl"
          icon={legalPageIcon}
          className="mb-10 sm:mb-12"
        />
        <div className="space-y-8">
          {NOTICES.map((copy) => (
            <Notice key={copy.lang} copy={copy} />
          ))}
        </div>
      </article>
    </div>
  </div>
);

export default Impressum;

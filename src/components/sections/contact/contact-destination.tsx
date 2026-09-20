import ContactLinks from "components/elements/contact-links";
import HeroHeader from "components/elements/hero-header";
import { useEnvironmentSettings } from "context/EnvironmentContext";
import { contactPageContent } from "data/contact-page";
import { contactFaqItems } from "data/faq";
import React from "react";
import { Link } from "react-router-dom";
import Accordion from "tailwind/components/elements/Accordion";
import {
  PAGE_HEADER_HERO_TITLE,
  PAGE_HEADER_SECTION_EYEBROW,
} from "tailwind/styles/pageHeader";
import { SURFACE_CARD_PANEL } from "tailwind/styles/surfaceCard";
import {
  TEXT_BODY,
  TEXT_CARD_TITLE,
  TEXT_DETAIL_SECTION_TITLE,
  TEXT_MUTED,
} from "tailwind/styles/textTokens";

const contactHeroIcon = (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const ContactDestination: React.FC = () => {
  const { theme } = useEnvironmentSettings();
  const {
    eyebrow,
    title,
    subtitle,
    conversationTypesTitle,
    conversationTypes,
    expectationsTitle,
    expectations,
    faqTitle,
    faqSubtitle,
    faqLinkLabel,
    faqLinkHref,
    // cvDownloadLabel, cvDownloadHref: CV link hidden below (still wired
    // up in data/contact-page.ts if it needs to come back).
  } = contactPageContent;

  return (
    <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12 md:space-y-14">
      <HeroHeader
        greeting={eyebrow}
        title={title}
        subtitle={subtitle}
        alignment="center"
        subtitleClassName="max-w-2xl mx-auto"
        titleClassName={`${PAGE_HEADER_HERO_TITLE} text-heading`}
        greetingClassName={PAGE_HEADER_SECTION_EYEBROW}
        icon={contactHeroIcon}
      />

      {/* The actual way to reach out, right under the hero. Previously the
          only contact action on this page was the shared footer band, so a
          visitor had to scroll past both sections below before finding a way
          to get in touch. */}
      <div className="max-w-2xl mx-auto">
        <ContactLinks />
      </div>

      <section
        id="contact-conversations"
        className="scroll-mt-24"
        aria-labelledby="contact-conversations-heading"
      >
        <h2
          id="contact-conversations-heading"
          className={`${TEXT_DETAIL_SECTION_TITLE} text-center mb-5 sm:mb-6`}
        >
          {conversationTypesTitle}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {conversationTypes.map((item) => (
            <li key={item.id} className={`${SURFACE_CARD_PANEL} p-4 sm:p-5`}>
              <h3 className={`${TEXT_CARD_TITLE} mb-2`}>{item.title}</h3>
              <p className={TEXT_BODY}>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="contact-expectations"
        className="scroll-mt-24"
        aria-labelledby="contact-expectations-heading"
      >
        <h2
          id="contact-expectations-heading"
          className={`${TEXT_DETAIL_SECTION_TITLE} text-center mb-5 sm:mb-6`}
        >
          {expectationsTitle}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {expectations.map((item) => (
            <li key={item.id} className={`${SURFACE_CARD_PANEL} p-4 sm:p-5`}>
              <p className={`${TEXT_CARD_TITLE} mb-1`}>{item.label}</p>
              <p className={TEXT_MUTED}>{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="contact-faq"
        className="scroll-mt-24"
        aria-labelledby="contact-faq-heading"
      >
        <div className="text-center mb-5 sm:mb-6">
          <h2 id="contact-faq-heading" className={TEXT_DETAIL_SECTION_TITLE}>
            {faqTitle}
          </h2>
          <p className={`${TEXT_MUTED} mt-2 max-w-2xl mx-auto`}>
            {faqSubtitle}
          </p>
        </div>

        <Accordion
          items={contactFaqItems}
          allowMultiple
          theme={theme}
          variant="modern"
          size="md"
          className="space-y-3"
        />

        <p className="mt-6 sm:mt-8 text-center">
          <Link
            to={faqLinkHref}
            className="text-sm sm:text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50 px-1 py-0.5"
          >
            {faqLinkLabel}
          </Link>
        </p>
      </section>
    </div>
  );
};

export default ContactDestination;

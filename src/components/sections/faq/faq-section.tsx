import { useEnvironmentSettings } from "context/EnvironmentContext";
import { faqData } from "data/faq";
import { LAYOUT_STYLES } from "data/heroData";
import React from "react";
import { useTranslation } from "react-i18next";
import Accordion from "tailwind/components/elements/Accordion";
import HeroHeader from "components/elements/hero-header";

const faqHeroIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface FAQSectionProps {
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const { theme } = useEnvironmentSettings();

  return (
    <section className={`faq-section pt-12 lg:pt-16 ${className}`}>
      <div className={`${LAYOUT_STYLES.CONTENT_CONTAINER}`}>
        <HeroHeader
          greeting={t("pages.faq.badge")}
          title={t("pages.faq.title")}
          subtitle={t("pages.faq.subtitle")}
          alignment="center"
          subtitleClassName="max-w-2xl"
          icon={faqHeroIcon}
          className="mb-8 lg:mb-10"
        />

        {/* FAQ Accordion */}
        <div className="mb-8 lg:mb-10">
          <Accordion
            items={faqData}
            allowMultiple={true}
            theme={theme}
            variant="modern"
            size="md"
            className="space-y-3"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

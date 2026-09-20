import { useEnvironmentSettings } from "context/EnvironmentContext";
import { faqData } from "data/faq";
import { LAYOUT_STYLES } from "data/heroData";
import { motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import Accordion from "tailwind/components/elements/Accordion";

interface FAQSectionProps {
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const { theme } = useEnvironmentSettings();

  return (
    <section className={`faq-section pt-12 lg:pt-16 ${className}`}>
      <div className={`${LAYOUT_STYLES.CONTENT_CONTAINER}`}>
        <div className="text-center mb-8 lg:mb-10">
          <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
            <motion.div
              className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-light-border/60 dark:border-dark-border/50"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                delay: 0.1,
              }}
            >
              <img
                src="/images/ansu.jpg"
                alt={t("a11y.faq.portraitAlt")}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading mb-3">
            {t("pages.faq.title")}
          </h1>
          <p className="text-base sm:text-lg text-body max-w-2xl mx-auto leading-relaxed">
            {t("pages.faq.subtitle")}
          </p>
        </div>

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

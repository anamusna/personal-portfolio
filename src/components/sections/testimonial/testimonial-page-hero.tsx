import HeroHeader from "components/elements/hero-header";
import React from "react";
import { useTranslation } from "react-i18next";
import { PAGE_HEADER_HERO_TITLE } from "tailwind/styles/pageHeader";

export const TestimonialPageHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
      <HeroHeader
        greeting={t("pages.testimonials.hero.greeting")}
        title={t("pages.testimonials.hero.title")}
        subtitle={t("pages.testimonials.hero.subtitle")}
        alignment="center"
        titleClassName={`${PAGE_HEADER_HERO_TITLE} text-heading text-center mb-6 sm:mb-8`}
        subtitleClassName="max-w-3xl mx-auto"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        }
      />
    </div>
  );
};

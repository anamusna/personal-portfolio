import React from "react";
import { useTranslation } from "react-i18next";
import AnimatedCTAButton from "components/elements/animated-cta-button";
import { SURFACE_CARD_PANEL } from "tailwind/styles/surfaceCard";
import { TEXT_BODY, TEXT_CARD_TITLE } from "tailwind/styles/textTokens";

type TestimonialFeedbackCtaProps = {
  onOpenForm: () => void;
};

export const TestimonialFeedbackCta: React.FC<TestimonialFeedbackCtaProps> = ({
  onOpenForm,
}) => {
  const { t } = useTranslation();

  return (
    <div
      id="testimonial-cards"
      className="mt-12 sm:mt-16 text-center relative z-10"
    >
    <div
      className={`${SURFACE_CARD_PANEL} max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl border border-light-border/55 dark:border-dark-border/40`}
    >
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-light-border/55 dark:border-dark-border/40">
          <img
            src="/images/ansu.jpg"
            alt={t("pages.testimonials.feedbackCta.imageAlt")}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center">
          <h3 className={`${TEXT_CARD_TITLE} text-xl sm:text-2xl mb-3`}>
            {t("pages.testimonials.feedbackCta.title")}
          </h3>
          <p className={`${TEXT_BODY} mb-4 sm:mb-6 text-base sm:text-lg`}>
            {t("pages.testimonials.feedbackCta.description")}
          </p>
        </div>
      </div>

      <AnimatedCTAButton
        text={t("pages.testimonials.feedbackCta.cta")}
        onClick={onOpenForm}
        as="button"
        colorScheme="indigo-violet"
        size="md"
        showIcon={true}
        className="mx-auto"
      />
    </div>
    </div>
  );
};

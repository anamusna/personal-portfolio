import { ABOUT_HERO_STYLES } from "data/aboutHeroData";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Toast from "tailwind/components/elements/Toast";
import TestimonialGrid from "components/sections/testimonial/testimonial-grid";
import { testimonials } from "data/testimonials";
import { TestimonialFeedbackCta } from "components/sections/testimonial/testimonial-feedback-cta";
import { TestimonialFeedbackForm } from "components/sections/testimonial/testimonial-feedback-form";
import { useTestimonialFeedback } from "components/sections/testimonial/hooks/use-testimonial-feedback";
import { TestimonialPageHero } from "components/sections/testimonial/testimonial-page-hero";

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const containerClasses = useMemo(
    () => `${ABOUT_HERO_STYLES.CONTAINER_BASE}`,
    [],
  );

  const {
    feedback,
    setFeedback,
    showFeedbackForm,
    openFeedbackForm,
    closeFeedbackForm,
    handleSubmit,
    toast,
    dismissToast,
  } = useTestimonialFeedback();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className={`relative z-10 ${containerClasses}`}>
        <section
          id="testimonials-hero"
          className="relative py-12 overflow-hidden"
        >
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
            <TestimonialPageHero />

            <div id="testimonial-grid">
              <h2 className="sr-only">{t("a11y.testimonials.gridHeading")}</h2>
              <TestimonialGrid testimonials={testimonials.group} />
            </div>

            <TestimonialFeedbackCta onOpenForm={openFeedbackForm} />

            {showFeedbackForm && (
              <TestimonialFeedbackForm
                feedback={feedback}
                onChange={setFeedback}
                onClose={closeFeedbackForm}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </section>
      </div>

      {toast.show && (
        <Toast
          variant={toast.type}
          message={toast.message}
          size="md"
          onDismiss={dismissToast}
        />
      )}
    </div>
  );
};

export default Testimonials;

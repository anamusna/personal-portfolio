import React from "react";
import { useTranslation } from "react-i18next";
import FormPrivacyCaption from "components/elements/form-privacy-caption";
import { SURFACE_CARD_PANEL } from "tailwind/styles/surfaceCard";
import { TEXT_CARD_TITLE } from "tailwind/styles/textTokens";
import type { TestimonialFeedback } from "./hooks/use-testimonial-feedback";

type TestimonialFeedbackFormProps = {
  feedback: TestimonialFeedback;
  onChange: (feedback: TestimonialFeedback) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent) => void;
};

export const TestimonialFeedbackForm: React.FC<TestimonialFeedbackFormProps> = ({
  feedback,
  onChange,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className={`${SURFACE_CARD_PANEL} rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-light-border/55 dark:border-dark-border/40 max-h-[90vh] overflow-y-auto`}>
      <div>
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className={`${TEXT_CARD_TITLE} text-xl sm:text-2xl`}>
            {t("pages.testimonials.feedbackForm.title")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-heading transition-colors p-2 min-h-[44px] min-w-[44px] rounded-lg surface-card border border-light-border/55 dark:border-dark-border/40"
          >
            <span className="sr-only">{t("common.actions.close")}</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          name="feedback-form"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/testimonials/success"
          onSubmit={onSubmit}
          className="space-y-4"
        >
          <input type="hidden" name="form-name" value="feedback-form" />
          <p hidden>
            <label>
              {`${t("pages.testimonials.feedbackForm.honeypotLabel")} `}
              <input name="bot-field" />
            </label>
          </p>

          <div className="flex items-center p-3 surface-card rounded-lg border border-light-border/55 dark:border-dark-border/40">
            <input
              type="checkbox"
              id="anonymous"
              checked={feedback.isAnonymous}
              onChange={(event) =>
                onChange({ ...feedback, isAnonymous: event.target.checked })
              }
              className="w-5 h-5 rounded border-light-border/60 text-indigo-600 focus:ring-indigo-500/20 dark:border-dark-border/50 dark:focus:ring-indigo-400/20"
            />
            <label
              htmlFor="anonymous"
              className="ml-3 text-body text-base font-medium"
            >
              {t("pages.testimonials.feedbackForm.submitAnonymously")}
            </label>
          </div>

          {!feedback.isAnonymous && (
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder={t("pages.testimonials.feedbackForm.placeholders.name")}
                value={feedback.name}
                onChange={(event) =>
                  onChange({ ...feedback, name: event.target.value })
                }
                className="w-full p-3 border border-light-border/55 dark:border-dark-border/40 rounded-lg surface-card focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 transition-colors text-heading placeholder:text-muted font-medium min-h-[48px]"
              />
              <input
                type="email"
                name="email"
                placeholder={t("pages.testimonials.feedbackForm.placeholders.email")}
                value={feedback.email}
                onChange={(event) =>
                  onChange({ ...feedback, email: event.target.value })
                }
                className="w-full p-3 border border-light-border/55 dark:border-dark-border/40 rounded-lg surface-card focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 transition-colors text-heading placeholder:text-muted font-medium min-h-[48px]"
              />
              <input
                type="text"
                name="role"
                placeholder={t("pages.testimonials.feedbackForm.placeholders.role")}
                value={feedback.role}
                onChange={(event) =>
                  onChange({ ...feedback, role: event.target.value })
                }
                className="w-full p-3 border border-light-border/55 dark:border-dark-border/40 rounded-lg surface-card focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 transition-colors text-heading placeholder:text-muted font-medium min-h-[48px]"
              />
            </div>
          )}

          <textarea
            name="message"
            placeholder={t("pages.testimonials.feedbackForm.placeholders.message")}
            value={feedback.message}
            onChange={(event) =>
              onChange({ ...feedback, message: event.target.value })
            }
            className="w-full p-3 border border-light-border/55 dark:border-dark-border/40 rounded-lg surface-card focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 transition-colors h-32 resize-none text-heading placeholder:text-muted font-medium"
            required
          />

          <FormPrivacyCaption />

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-light-border/55 dark:border-dark-border/40">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg surface-card border border-light-border/55 dark:border-dark-border/40 text-body font-medium hover:text-heading transition-colors min-h-[48px]"
            >
              {t("common.actions.cancel")}
            </button>
            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors font-medium min-h-[48px]"
            >
              {t("common.actions.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

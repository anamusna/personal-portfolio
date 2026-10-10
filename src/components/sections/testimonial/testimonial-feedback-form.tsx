import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import FormPrivacyCaption from "components/elements/form-privacy-caption";
import { SURFACE_CARD_PANEL } from "tailwind/styles/surfaceCard";
import { TEXT_CARD_TITLE } from "tailwind/styles/textTokens";
import type { TestimonialFeedback } from "./hooks/use-testimonial-feedback";

type TestimonialFeedbackFormProps = {
  feedback: TestimonialFeedback;
  onChange: (feedback: TestimonialFeedback) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  submitError?: string | null;
};

export const TestimonialFeedbackForm: React.FC<TestimonialFeedbackFormProps> = ({
  feedback,
  onChange,
  onClose,
  onSubmit,
  isSubmitting = false,
  submitError = null,
}) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);

  // `onClose` is a fresh function on every parent render; keep it in a ref so
  // the effect below runs once on open and does not pull focus back to the
  // first field while the user is typing.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Dialog behaviour: focus moves in on open and back to the opener on close,
  // Tab stays inside while it is open, and Escape closes it.
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement as HTMLElement | null;
    const getFocusable = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([type=hidden]):not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
        // The honeypot field sits in a hidden paragraph and cannot take focus.
      ).filter((element) => element.getClientRects().length > 0);
    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, []);

  // Rendered through a portal: inside the page it sat in a lower stacking
  // context than the footer and the bottom dock, which painted over the form
  // and covered the submit button on phones.
  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[80]">
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-form-title"
      className={`${SURFACE_CARD_PANEL} rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-light-border/55 dark:border-dark-border/40 max-h-[90vh] overflow-y-auto`}
    >
      <div>
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2
            id="feedback-form-title"
            className={`${TEXT_CARD_TITLE} text-xl sm:text-2xl`}
          >
            {t("pages.testimonials.feedbackForm.title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-heading transition-colors p-2 min-h-[44px] min-w-[44px] rounded-lg surface-card border border-light-border/55 dark:border-dark-border/40"
          >
            <span className="sr-only">{t("common.actions.close")}</span>
            <svg
              aria-hidden="true"
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
                aria-label={t("pages.testimonials.feedbackForm.placeholders.name")}
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
                aria-label={t("pages.testimonials.feedbackForm.placeholders.email")}
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
                aria-label={t("pages.testimonials.feedbackForm.placeholders.role")}
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
            aria-label={t("pages.testimonials.feedbackForm.placeholders.message")}
            placeholder={t("pages.testimonials.feedbackForm.placeholders.message")}
            value={feedback.message}
            onChange={(event) =>
              onChange({ ...feedback, message: event.target.value })
            }
            className="w-full p-3 border border-light-border/55 dark:border-dark-border/40 rounded-lg surface-card focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 transition-colors h-32 resize-none text-heading placeholder:text-muted font-medium"
            required
          />

          <FormPrivacyCaption />

          {submitError && (
            <p
              id="feedback-form-error"
              role="alert"
              className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-800 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200"
            >
              {submitError}
            </p>
          )}

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
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              aria-describedby={submitError ? "feedback-form-error" : undefined}
              className="px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium min-h-[48px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? t("pages.testimonials.feedbackForm.sending")
                : t("common.actions.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>,
    document.body,
  );
};

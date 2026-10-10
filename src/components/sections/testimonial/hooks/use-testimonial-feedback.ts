import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { devError } from "utils/logger";

type ToastType = "info" | "success" | "warning" | "error";

export type TestimonialFeedback = {
  name: string;
  email: string;
  role: string;
  message: string;
  isAnonymous: boolean;
};

type ToastState = {
  show: boolean;
  type: ToastType;
  message: string;
};

const emptyFeedback: TestimonialFeedback = {
  name: "",
  email: "",
  role: "",
  message: "",
  isAnonymous: false,
};

export function useTestimonialFeedback() {
  const { t } = useTranslation();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<TestimonialFeedback>(emptyFeedback);
  // A failed submission is shown inside the open dialog. A toast would sit
  // underneath the dialog's overlay, where nobody can see it.
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type: ToastType, message: string) => {
    setToast({ show: true, type, message });
  };

  const dismissToast = () => {
    setToast((current) => ({ ...current, show: false }));
  };

  const openFeedbackForm = () => {
    setSubmitError(null);
    setShowFeedbackForm(true);
  };
  const closeFeedbackForm = () => setShowFeedbackForm(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // The identity inputs are not rendered while "submit anonymously" is
    // checked, so set the values here instead of reading them from the DOM.
    // The email is left empty rather than filled with a made-up address.
    if (feedback.isAnonymous) {
      data.set("name", "Anonymous");
      data.set("role", "Anonymous");
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          data as unknown as Record<string, string>,
        ).toString(),
      });

      if (!response.ok) {
        throw new Error(`Form endpoint responded with ${response.status}`);
      }

      showToast("success", t("pages.testimonials.feedbackForm.successToast"));
      closeFeedbackForm();
      setFeedback(emptyFeedback);
    } catch (error) {
      devError("Feedback submission error:", error);
      setSubmitError(t("pages.testimonials.feedbackForm.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    feedback,
    setFeedback,
    showFeedbackForm,
    openFeedbackForm,
    closeFeedbackForm,
    handleSubmit,
    isSubmitting,
    submitError,
    toast,
    dismissToast,
  };
}

import { type FormEvent, useState } from "react";
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
  const [feedback, setFeedback] = useState<TestimonialFeedback>(emptyFeedback);
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

  const openFeedbackForm = () => setShowFeedbackForm(true);
  const closeFeedbackForm = () => setShowFeedbackForm(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const form = event.target as HTMLFormElement;

      if (feedback.isAnonymous) {
        const nameInput = form.querySelector(
          '[name="name"]',
        ) as HTMLInputElement;
        const emailInput = form.querySelector(
          '[name="email"]',
        ) as HTMLInputElement;
        const roleInput = form.querySelector(
          '[name="role"]',
        ) as HTMLInputElement;

        if (nameInput) nameInput.value = "Anonymous";
        if (emailInput) emailInput.value = "anonymous@example.com";
        if (roleInput) roleInput.value = "Anonymous";
      }

      form.submit();

      showToast(
        "success",
        t("pages.testimonials.feedbackForm.successToast"),
      );

      closeFeedbackForm();
      setFeedback(emptyFeedback);
    } catch (error) {
      devError("Feedback submission error:", error);
      showToast("error", t("pages.testimonials.feedbackForm.errorToast"));
    }
  };

  return {
    feedback,
    setFeedback,
    showFeedbackForm,
    openFeedbackForm,
    closeFeedbackForm,
    handleSubmit,
    toast,
    dismissToast,
  };
}

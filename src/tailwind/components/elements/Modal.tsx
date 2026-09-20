import clsx from "clsx";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Icon from "./Icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  theme?: "light" | "dark";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  theme = "light",
}) => {
  const { t } = useTranslation("ansumana");
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.body.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const titleId = title ? "modal-title" : undefined;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          data-testid="modal-backdrop"
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal */}
        <div
          data-testid="modal-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={clsx(
            "inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-lg",
            size === "sm" && "max-w-sm",
            size === "md" && "max-w-md",
            size === "lg" && "max-w-lg",
            size === "xl" && "max-w-xl",
            size === "full" && "max-w-full",
            theme === "light" ? "bg-white" : "bg-gray-800",
          )}
        >
          <div className="flex justify-between items-center mb-4">
            {title && (
              <h3
                id={titleId}
                className="text-xl font-bold text-white group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors"
              >
                {title}
              </h3>
            )}
            <button
              data-testid="modal-close-button"
              aria-label={t("common.actions.close")}
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <Icon icon={faXmark} fixedWidth />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

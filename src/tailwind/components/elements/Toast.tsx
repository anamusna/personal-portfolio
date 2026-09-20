import clsx from "clsx";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useEnvironmentSettings } from "../../../context/EnvironmentContext";

interface ToastProps {
  message: string;
  title?: string;
  variant?: "info" | "success" | "warning" | "error";
  type?: "info" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg" | "xl";
  duration?: number;
  onClose?: () => void;
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  action?: {
    label: string;
    onClick: () => void;
  };
  showProgress?: boolean;
  isVisible?: boolean;
  onDismiss?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  title,
  variant = "info",
  type = "info",
  size = "md",
  duration = 5000,
  onClose,
  position = "top-right",
  action,
  showProgress = false,
  isVisible = true,
  onDismiss,
}) => {
  const { fontSize } = useEnvironmentSettings();
  const { t } = useTranslation("ansumana");

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
        if (onDismiss) onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, onDismiss]);

  const variantClasses = {
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    error: "bg-red-500 text-white",
  };

  const sizeClasses = {
    sm: "text-sm p-2",
    md: "text-base p-3",
    lg: "text-lg p-4",
    xl: "text-xl p-5",
  };

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      data-testid="toast"
      className={clsx(
        "fixed z-50 min-w-[300px] max-w-md rounded-lg shadow-lg",
        variantClasses[variant || type],
        positionClasses[position],
        sizeClasses[fontSize || size],
        `toast-${position}`,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1" data-testid="toast-title">
              {title}
            </h4>
          )}
          <p data-testid="toast-message">{message}</p>
        </div>
        {(onClose || onDismiss) && (
          <button
            onClick={() => {
              if (onClose) onClose();
              if (onDismiss) onDismiss();
            }}
            className="ml-4 text-white opacity-75 hover:opacity-100"
            aria-label={t("common.actions.closeToast")}
            data-testid="toast-close-button"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 px-4 py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30"
          data-testid="toast-action-button"
        >
          {action.label}
        </button>
      )}

      {showProgress && duration > 0 && (
        <div
          data-testid="toast-progress"
          className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30"
          style={{
            width: "100%",
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      )}
    </div>
  );
};

export default Toast;

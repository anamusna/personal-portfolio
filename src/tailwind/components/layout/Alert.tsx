import {
  faCheck,
  faInfoCircle,
  faTimes,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../elements/Button";
import Icon from "../elements/Icon";
import { Label, Small } from "../elements/Typography";

const themeClasses = {
  success: {
    light: "bg-green-500 text-white",
    dark: "bg-green-600 text-white",
  },
  error: {
    light: "bg-red-500 text-white",
    dark: "bg-red-600 text-white",
  },
  warning: {
    light: "bg-orange-500 text-black",
    dark: "bg-orange-600 text-white",
  },
  info: {
    light: "bg-primary-light-50 text-primary-light-700",
    dark: "bg-primary-dark-50 text-primary-dark-700",
  },
};

const sizeClasses = {
  sm: "text-sm p-sm",
  md: "text-base p-md",
  lg: "text-lg p-lg",
};

interface AlertProps {
  message: React.ReactNode | string;
  type?: "success" | "error" | "warning" | "info";
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  title?: string;
  icon?: any;
  dismissible?: boolean;
  timeout?: number;
  isOpen?: boolean;
  onDismiss?: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  message,
  type = "info",
  theme = "light",
  size = "md",
  title,
  dismissible = false,
  timeout,
  icon,
  isOpen = true,
  onDismiss,
  onConfirm,
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const { t } = useTranslation("ansumana");

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`flex flex-col rounded-lg shadow-md ${
        themeClasses[type][theme]
      } ${sizeClasses?.[size || "lg"]} ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-1">
          <div>
            <Small className="flex flex-wrap center items-center">
              {icon && (
                <Icon
                  icon={faInfoCircle}
                  size={size as any}
                  className={`text-primary-${theme}-700 text-2xl me-4`}
                  fixedWidth
                />
              )}
              {title && (
                <h4 className="text-xl font-bold text-white group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                  {title}
                </h4>
              )}
            </Small>
            <Label size={size}>{message}</Label>
          </div>
          {children && children}
        </div>
        {dismissible && !onConfirm && (
          <Button
            label={t("common.actions.close")}
            variant="transparent"
            size={size}
            iconOnly
            icon={faTimes}
            theme={theme as "light" | "dark"}
            className={`text-primary-${theme}-700`}
            onClick={handleDismiss}
            aria-label={t("common.actions.dismiss")}
          />
        )}
      </div>

      {onConfirm && (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            label={t("common.actions.cancel")}
            variant="transparent"
            size={size}
            icon={faXmark}
            theme={theme as "light" | "dark"}
            onClick={handleDismiss}
          />
          <Button
            label={t("common.actions.confirm")}
            variant="primary"
            size={size}
            icon={faCheck}
            theme={theme as "light" | "dark"}
            onClick={() => handleConfirm()}
          />
        </div>
      )}
    </div>
  );
};

export default Alert;

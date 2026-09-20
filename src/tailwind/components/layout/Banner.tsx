import React, { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { BannerProps } from "../../../tailwind/types/layout/banner";

const Banner: React.FC<BannerProps> = ({
  message,
  actionLabel,
  actionLink,
  theme = "light",
  dismissible = false,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation("ansumana");

  const themeClasses = {
    light: {
      banner: "bg-blue-50 text-blue-800",
      action: "text-blue-600 hover:text-blue-800",
    },
    dark: {
      banner: "bg-gray-800 text-white",
      action: "text-blue-300 hover:text-blue-500",
    },
  };

  const { banner, action } = themeClasses[theme];

  if (!isVisible) return null;

  return (
    <div className={clsx("p-4 rounded-md", banner)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium">{message}</span>
          {actionLabel && actionLink && (
            <a
              href={actionLink}
              className={clsx("ml-4 text-sm font-semibold", action)}
            >
              {actionLabel}
            </a>
          )}
        </div>
        {dismissible && (
          <button
            onClick={() => {
              setIsVisible(false);
              if (onDismiss) onDismiss();
            }}
            className="ml-4 text-gray-400 hover:text-gray-600"
            aria-label={t("common.actions.dismissBanner")}
          >
            <span className="sr-only">{t("common.actions.dismiss")}</span>
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;

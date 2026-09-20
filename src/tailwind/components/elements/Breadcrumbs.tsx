import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useEnvironmentSettings } from "../../../context/EnvironmentContext";
import { BreadcrumbProps } from "../../../tailwind/types/elements/breadcrumb";

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  label,
  children,
  size = "md",
  theme = "light",
  className = "",
  separator = "/",
  icon,
}) => {
  const { fontSize } = useEnvironmentSettings();
  const { t } = useTranslation("ansumana");

  const baseClasses =
    "inline-flex items-center space-x-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const themeColors = {
    light: "text-light-text hover:text-light-primary",
    dark: "text-dark-text hover:text-dark-primary",
  };

  const themeClass = themeColors[theme] || themeColors.light;

  return (
    <nav
      className={clsx(
        baseClasses,
        sizeClasses[fontSize || size],
        themeClass,
        className
      )}
      aria-label={t("a11y.shared.breadcrumb")}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children || label}
      {separator && <span className="mx-2">{separator}</span>}
    </nav>
  );
};

export default Breadcrumb;

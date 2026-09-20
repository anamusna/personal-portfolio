import clsx from "clsx";
import React from "react";
import { CardProps } from "../../types/layout/card";

const Card: React.FC<CardProps> = ({
  children,
  title,
  description,
  className = "",
  theme = "light",
  size = "fw",
  onClick,
  hoverable = false,
  loading,
  "aria-label": ariaLabel,
  collapsible,
  expanded,
  variant = "flat",
}) => {
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
    fw: "w-full",
  } as const;

  const themeClasses = {
    light: "surface-card text-gray-900",
    dark: "surface-card text-white",
  } as const;

  const variantClasses = {
    elevated: "surface-card--interactive",
    outlined: "border border-light-border dark:border-dark-border",
    flat: "",
  } as const;

  return (
    <div
      data-testid="card"
      role="region"
      aria-label={ariaLabel}
      className={clsx(
        "relative rounded-lg border-2 overflow-hidden transition-all duration-300",
        sizeClasses[size],
        "rounded-lg",
        themeClasses[theme],
        variantClasses[variant],
        hoverable && "hover:shadow-lg transition-shadow",
        className,
      )}
      onClick={onClick}
    >
      {loading ? (
        <div data-testid="card-loading" className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ) : (
        <>
          {title && (
            <div className="p-4 border-b">
              <h3 data-testid="card-title" className="text-lg font-semibold">
                {title}
              </h3>
              {description && (
                <p
                  data-testid="card-description"
                  className="mt-1 text-sm text-gray-500"
                >
                  {description}
                </p>
              )}
            </div>
          )}
          {children}
        </>
      )}
    </div>
  );
};

export default Card;

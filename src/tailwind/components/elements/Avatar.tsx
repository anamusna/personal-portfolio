import React from "react";
import clsx from "clsx";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";
import Icon from "../elements/Icon";
import { AvatarProps } from "../../types/elements/avatar";
import { useEnvironmentSettings } from "../../../context/EnvironmentContext";

const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  src,
  alt,
  shape = "circle",
  status,
  borderColor = "grey",
  theme = "light",
  variant = "primary",
  loading = false,
  icon,
  iconOnly = false,
  disabled = false,
  onClick,
  className,
}) => {
  const { fontSize } = useEnvironmentSettings();
  const { t } = useTranslation("ansumana");

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const shapeClasses = {
    circle: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-none",
  };

  const statusClasses = {
    active: "ring-2 ring-green-500",
    inactive: "ring-2 ring-gray-400",
    away: "ring-2 ring-yellow-500",
  };

  const themeColors = {
    light: {
      primary: "border-light-primary",
      secondary: "border-light-secondary",
      outline: "border border-light-primary",
      transparent: "border-transparent",
    },
    dark: {
      primary: "border-dark-primary",
      secondary: "border-dark-secondary",
      outline: "border border-dark-primary",
      transparent: "border-transparent",
    },
  };

  const currentTheme = themeColors[theme] || themeColors.light;

  const variantClasses = currentTheme?.[variant];

  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center overflow-hidden relative",
        sizeClasses[size],
        shapeClasses[shape],
        `text-${fontSize}`,
        variantClasses,
        disabled && "opacity-50 cursor-not-allowed",
        onClick && !disabled && "cursor-pointer",
        className,
        {
          [statusClasses[status as keyof typeof statusClasses]]: status,
        }
      )}
      onClick={!disabled ? onClick : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <span className={`text-${fontSize}`}>{t("common.status.loading")}</span>
        </div>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          {icon && !iconOnly && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Icon
                icon={icon}
                size={(fontSize as any) || (size as SizeProp)}
                fixedWidth
                aria-hidden="true"
                className="mr-2"
              />
            </span>
          )}
        </>
      )}
      {status && (
        <span
          className={clsx(
            "absolute bottom-0 right-0 w-3 h-3 bg-white border-2",
            status === "active"
              ? "border-green-500"
              : status === "away"
              ? "border-yellow-500"
              : "border-gray-400",
            `text-${fontSize}`
          )}
        />
      )}
    </div>
  );
};

export default Avatar;

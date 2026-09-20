import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React, { forwardRef } from "react";
import Icon from "./Icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  variant?:
    | "primary"
    | "secondary"
    | "transparent"
    | "danger"
    | "success"
    | "outline";
  theme?: "light" | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "rounded" | "circle" | "square";
  iconPosition?: "left" | "right";
  iconOnly?: boolean;
  selected?: boolean;
  loading?: boolean;
  icon?: IconDefinition;
  type?: "button" | "submit" | "reset";
  className?: string;
  iconClassName?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      children,
      onClick,
      onKeyDown,
      variant = "primary",
      theme = "light",
      size = "md",
      shape = "rounded",
      iconPosition = "left",
      iconOnly = false,
      selected = false,
      loading = false,
      icon,
      type = "button",
      className = "",
      iconClassName = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    // Button base styles by variant and theme
    const variantStyles = {
      primary: {
        light:
          "bg-royal-primary text-white hover:bg-royal-dark focus:bg-royal-dark active:bg-royal-dark",
        dark: "bg-primary-dark-700 text-white hover:bg-primary-dark-800 focus:bg-primary-dark-800 active:bg-primary-dark-800",
      },
      secondary: {
        light:
          "bg-navy-primary text-white hover:bg-navy-hover focus:bg-navy-hover active:bg-navy-hover",
        dark: "bg-dark-secondary text-white hover:opacity-90 focus:opacity-90 active:opacity-90",
      },
      transparent: {
        light:
          "bg-transparent text-grey-primary hover:bg-grey-hover focus:bg-grey-hover active:bg-grey-hover",
        dark: "bg-transparent text-dark-text hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-700",
      },
      outline: {
        light: `bg-transparent border border-royal-primary text-royal-primary hover:bg-royal-primary hover:text-royal-primary focus:bg-royal-primary focus:text-royal-primary active:bg-royal-primary active:text-royal-primary focus-visible:text-royal-primary focus-visible:bg-royal-primary`,
        dark: `bg-transparent border border-royal-primary text-white hover:bg-royal-primary hover:text-royal-primary focus:bg-royal-primary focus:text-white active:bg-royal-primary active:text-white focus-visible:text-white focus-visible:bg-royal-primary`,
      },
      danger: {
        light:
          "bg-red-primary text-white hover:opacity-90 focus:opacity-90 active:opacity-90",
        dark: "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-700",
      },
      success: {
        light:
          "bg-green-primary text-white hover:bg-green-hover focus:bg-green-hover active:bg-green-hover",
        dark: "bg-green-600 text-white hover:bg-green-700 focus:bg-green-700 active:bg-green-700",
      },
    };

    // Shape styles
    const shapeStyles = {
      rounded: "rounded-lg",
      circle: "rounded-full",
      square: "rounded-none",
    };

    // Button sizes with exact heights
    const sizeStyles = {
      xs: "h-6 text-xs min-w-[24px]",
      sm: "h-8 text-sm min-w-[32px]",
      md: "h-10 text-base min-w-[40px]",
      lg: "h-12 text-lg min-w-[48px]",
      xl: "h-14 text-xl min-w-[56px]",
    };

    // Padding based on size and iconOnly
    const paddingStyles = {
      xs: iconOnly ? "p-1.5" : "px-2",
      sm: iconOnly ? "p-2" : "px-3",
      md: iconOnly ? "p-2.5" : "px-4",
      lg: iconOnly ? "p-3" : "px-5",
      xl: iconOnly ? "p-3.5" : "px-6",
    };

    // Icon sizes based on button size
    const iconSizes = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7",
    };

    // Spacing between icon and text
    const iconSpacing = {
      xs: "gap-1",
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-2.5",
      xl: "gap-3",
    };

    // Ring colors by variant and theme
    const ringStyles = {
      primary: {
        light: "ring-royal-primary",
        dark: "ring-primary-dark-700",
      },
      secondary: {
        light: "ring-navy-primary",
        dark: "ring-dark-secondary",
      },
      transparent: {
        light: "ring-grey-primary",
        dark: "ring-gray-400",
      },
      outline: {
        light: "ring-royal-primary",
        dark: "ring-primary-dark-700",
      },
      danger: {
        light: "ring-red-primary",
        dark: "ring-red-600",
      },
      success: {
        light: "ring-green-primary",
        dark: "ring-green-600",
      },
    };

    // Disabled styles by theme
    const disabledStyles = {
      light: "bg-grey-50 text-grey-300 border-grey-300",
      dark: "bg-gray-700 text-gray-500 border-gray-600",
    };

    const content = loading ? (
      <Icon
        icon={faSpinner}
        spin
        data-testid="loading-spinner"
        className={clsx(iconSizes[size], iconClassName)}
        fixedWidth
      />
    ) : (
      <>
        {icon && iconPosition !== "right" && (
          <Icon
            icon={icon}
            className={clsx(iconSizes[size], iconClassName)}
            data-testid="button-icon-left"
            fixedWidth
          />
        )}
        {!iconOnly && (label || children)}
        {icon && iconPosition === "right" && (
          <Icon
            icon={icon}
            className={clsx(iconSizes[size], iconClassName)}
            data-testid="button-icon-right"
            fixedWidth
          />
        )}
      </>
    );

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        onKeyDown={onKeyDown}
        disabled={disabled || loading}
        className={clsx(
          // Base styles
          "inline-flex items-center justify-center transition-all duration-200",
          // Shape styles
          shapeStyles[shape],
          // Variant styles with theme
          variantStyles[variant][theme],
          // Size styles
          sizeStyles[size],
          // Padding styles
          paddingStyles[size],
          // Icon spacing (only if not iconOnly)
          !iconOnly && iconSpacing[size],
          // States
          {
            // Disabled state with theme
            "opacity-50 cursor-not-allowed": disabled || loading,
            [disabledStyles[theme]]: disabled || loading,
            // Selected state
            "ring-2 ring-offset-2": selected,
            [ringStyles[variant][theme]]: selected,
          },
          // Focus state (when not disabled)
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          ringStyles[variant][theme],
          className
        )}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

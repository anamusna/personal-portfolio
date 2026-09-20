import clsx from "clsx";
import React, { memo } from "react";
import { Link } from "react-router-dom";

interface AnimatedCTAButtonProps {
  // Core props
  text: string;
  href?: string;
  /** Use "button" for actions (e.g. load more); defaults to router Link */
  as?: "link" | "button";

  // Visual customization
  colorScheme?:
    | "blue-purple"
    | "indigo-violet"
    | "emerald-teal"
    | "violet-purple"
    | "rose-pink"
    | "cyan-blue"
    | "transparent-light"
    | "transparent-dark"
    | "transparent-colored"
    | "default"
    | "emerald"
    | "violet"
    | "rose"
    | "cyan";

  size?: "sm" | "md" | "lg" | "xl";
  variant?:
    | "default"
    | "premium"
    | "minimal"
    | "hero"
    | "glass"
    | "transparent"
    | "compact"
    | "emerald"
    | "violet"
    | "rose"
    | "cyan"
    | "outline";

  // Layout and spacing
  className?: string;
  fullWidth?: boolean;
  shape?: "rounded" | "circle" | "square";

  // Animation and effects
  glowEffect?: boolean;
  shimmerEffect?: boolean;
  particleEffect?: boolean;
  hoverLift?: boolean;
  animationDelay?: number;

  // Icon configuration
  showIcon?: boolean;
  iconPosition?: "left" | "right";
  customIcon?: React.ReactNode;

  // Interaction
  onClick?: () => void;
  disabled?: boolean;
  external?: boolean;

  // Accessibility
  ariaLabel?: string;
}

const AnimatedCTAButton: React.FC<AnimatedCTAButtonProps> = memo(
  ({
    text,
    href,
    as = "link",
    colorScheme = "blue-purple",
    size = "md",
    variant = "default",
    className = "",
    fullWidth = false,
    shape = "rounded",
    glowEffect = false,
    shimmerEffect = false,
    particleEffect = false,
    hoverLift = false,
    animationDelay = 0,
    showIcon = true,
    iconPosition = "right",
    customIcon,
    onClick,
    disabled = false,
    external = false,
    ariaLabel,
  }) => {
    // Size configurations with enhanced spacing and typography
    const sizeConfigs = {
      sm: {
        padding: "px-6 py-3",
        text: "text-sm font-medium",
        minHeight: "min-h-[44px]",
        iconSize: "w-4 h-4",
        gap: "gap-2",
      },
      md: {
        padding: "px-8 py-4 sm:px-10 sm:py-5",
        text: "text-base sm:text-lg font-semibold",
        minHeight: "min-h-[52px] sm:min-h-[56px]",
        iconSize: "w-5 h-5 sm:w-6 sm:h-6",
        gap: "gap-3",
      },
      lg: {
        padding: "px-10 py-5 sm:px-12 sm:py-6",
        text: "text-lg sm:text-xl font-bold",
        minHeight: "min-h-[60px] sm:min-h-[64px]",
        iconSize: "w-6 h-6 sm:w-7 sm:h-7",
        gap: "gap-4",
      },
      xl: {
        padding: "px-12 py-6 sm:px-14 sm:py-7",
        text: "text-xl sm:text-2xl font-bold",
        minHeight: "min-h-[68px] sm:min-h-[72px]",
        iconSize: "w-7 h-7 sm:w-8 sm:h-8",
        gap: "gap-5",
      },
    };

    // Variant configurations
    const variantConfigs = {
      default: {
        backdrop: "",
        border: "border border-transparent",
        shadow: "shadow-sm hover:shadow-md",
      },
      premium: {
        backdrop: "backdrop-blur-xl",
        border: "border-2 border-white/20 dark:border-gray-700/20",
        shadow: "shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]",
      },
      glass: {
        backdrop: "backdrop-blur-xl",
        border: "border border-light-border/40 dark:border-dark-border/40",
        shadow: "shadow-lg hover:shadow-xl",
      },
      transparent: {
        backdrop: "backdrop-blur-xl bg-transparent",
        border: "border-2 border-transparent",
        shadow: "shadow-none hover:shadow-none",
      },
      minimal: {
        backdrop: "backdrop-blur-md",
        border: "border border-transparent",
        shadow: "shadow-lg hover:shadow-xl",
      },
      hero: {
        backdrop: "backdrop-blur-2xl",
        border: "border-2 border-white/30 dark:border-white/20",
        shadow: "shadow-3xl hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)]",
      },
      compact: {
        backdrop: "backdrop-blur-sm",
        border: "border border-transparent",
        shadow: "shadow-md hover:shadow-lg",
      },
      emerald: {
        backdrop: "backdrop-blur-lg",
        border: "border-2 border-emerald-500/20 dark:border-emerald-400/20",
        shadow:
          "shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.3)]",
      },
      violet: {
        backdrop: "backdrop-blur-lg",
        border: "border-2 border-violet-500/20 dark:border-violet-400/20",
        shadow:
          "shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(139,92,246,0.3)]",
      },
      rose: {
        backdrop: "backdrop-blur-lg",
        border: "border-2 border-rose-500/20 dark:border-rose-400/20",
        shadow:
          "shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(244,63,94,0.3)]",
      },
      cyan: {
        backdrop: "backdrop-blur-lg",
        border: "border-2 border-cyan-500/20 dark:border-cyan-400/20",
        shadow:
          "shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(6,182,212,0.3)]",
      },
      outline: {
        backdrop: "backdrop-blur-sm bg-transparent",
        border: "border-2 border-current",
        shadow: "shadow-none hover:shadow-lg",
      },
    };

    // Shape configurations
    const shapeConfigs = {
      rounded: {
        borderRadius: "rounded-xl",
        iconBorderRadius: "rounded-full",
      },
      circle: {
        borderRadius: "rounded-full",
        iconBorderRadius: "rounded-full",
      },
      square: {
        borderRadius: "rounded-lg",
        iconBorderRadius: "rounded-lg",
      },
    };

    const currentSize = sizeConfigs[size];
    const currentVariant = variantConfigs[variant];
    const currentShape = shapeConfigs[shape];

    // Enhanced default icon with better positioning
    const defaultIcon = (
      <svg
        className={`${currentSize.iconSize} opacity-80`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    );

    // Check if using transparent color scheme or outline variant
    const isTransparent =
      colorScheme?.startsWith("transparent") || variant === "outline";
    const isGlass = variant === "glass";
    const renderAsButton = as === "button";
    const wrapperClassName = fullWidth ? "block w-full" : "inline-block";

    const buttonContent = (
      <div
        className={clsx(
          "group relative inline-flex items-center justify-between font-semibold",
          isTransparent
            ? "bg-transparent"
            : isGlass
              ? "glass-2"
              : "bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600",
          variant === "outline"
            ? "text-indigo-600 dark:text-indigo-400 bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
            : isTransparent
              ? "text-current"
              : "text-white",
          currentShape.borderRadius,
          currentSize.padding,
          currentSize.text,
          currentSize.minHeight,
          currentVariant.backdrop,
          currentVariant.border,
          currentVariant.shadow,
          "transition-colors duration-300 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/60 dark:focus-visible:ring-royal-primary/50",
          hoverLift && "hover:-translate-y-0.5",
          variant === "outline"
            ? "border-indigo-600 dark:border-indigo-400"
            : isTransparent
              ? "border-current"
              : "border-indigo-600 dark:border-indigo-500",
          fullWidth && "w-full",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className,
        )}
        // Omitted at 0 so no inline style is emitted for the default case.
        // `0ms` would be prerendered, then folded to `0s` by the snapshot's
        // CSS minifier, which React reads as a hydration mismatch.
        style={
          animationDelay ? { animationDelay: `${animationDelay}ms` } : undefined
        }
        onClick={renderAsButton ? undefined : onClick}
      >
        <div
          className={`relative z-10 flex items-center justify-between w-full ${currentSize.gap}`}
        >
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            {showIcon && iconPosition === "left" && (
              <div className="flex-shrink-0">{customIcon || defaultIcon}</div>
            )}

            <span className="tracking-wide font-medium text-center flex-1 leading-tight">
              {text}
            </span>
          </div>

          {showIcon && iconPosition === "right" && (
            <div className="flex-shrink-0 ml-1 sm:ml-2">
              {customIcon || defaultIcon}
            </div>
          )}
        </div>
      </div>
    );

    if (renderAsButton) {
      return (
        <button
          type="button"
          className={wrapperClassName}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel || text}
        >
          {buttonContent}
        </button>
      );
    }

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={wrapperClassName}
        >
          {buttonContent}
        </a>
      );
    }

    const isNativeLink =
      href?.startsWith("mailto:") || href?.startsWith("tel:");

    if (isNativeLink) {
      return (
        <a href={href} className={wrapperClassName} onClick={onClick}>
          {buttonContent}
        </a>
      );
    }

    return (
      <Link to={href ?? "/"} className={wrapperClassName} onClick={onClick}>
        {buttonContent}
      </Link>
    );
  },
);

AnimatedCTAButton.displayName = "AnimatedCTAButton";

export default AnimatedCTAButton;

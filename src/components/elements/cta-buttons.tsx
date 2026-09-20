import clsx from "clsx";
import React, { memo } from "react";
import { HERO_CONTENT } from "../../data/heroData";
import AnimatedCTAButton from "./animated-cta-button";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  isPrimary?: boolean;
  className?: string;
  variant?:
    | "default"
    | "premium"
    | "minimal"
    | "hero"
    | "glass"
    | "transparent"
    | "outline";
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
  showIcon?: boolean;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  glowEffect?: boolean;
  shimmerEffect?: boolean;
  particleEffect?: boolean;
  hoverLift?: boolean;
  animationDelay?: number;
  onClick?: () => void;
  disabled?: boolean;
  external?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
  shape?: "rounded" | "circle" | "square";
}

interface CTAButtonsProps {
  primaryButton?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  layout?: "horizontal" | "vertical" | "stacked";
  spacing?: "compact" | "normal" | "wide";
  variant?:
    | "default"
    | "premium"
    | "minimal"
    | "hero"
    | "glass"
    | "transparent"
    | "outline";
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
  showIcons?: boolean;
  glowEffect?: boolean;
  shimmerEffect?: boolean;
  particleEffect?: boolean;
  hoverLift?: boolean;
  animationDelay?: boolean;
  className?: string;
  alignment?: "left" | "center" | "right";
  fullWidth?: boolean;
  shape?: "rounded" | "circle" | "square";
}

// Color scheme mapping to AnimatedCTAButton color schemes
const mapColorScheme = (colorScheme: string): string => {
  const mapping: Record<string, string> = {
    default: "default",
    emerald: "emerald",
    violet: "violet",
    rose: "rose",
    cyan: "cyan",
    "blue-purple": "blue-purple",
    "indigo-violet": "indigo-violet",
    "emerald-teal": "emerald-teal",
    "violet-purple": "violet-purple",
    "rose-pink": "rose-pink",
    "cyan-blue": "cyan-blue",
    "transparent-light": "transparent-light",
    "transparent-dark": "transparent-dark",
    "transparent-colored": "transparent-colored",
  };

  return mapping[colorScheme] || "default";
};

// Variant mapping to AnimatedCTAButton variants
const mapVariant = (variant: string): string => {
  const mapping: Record<string, string> = {
    default: "default",
    hero: "hero",
    compact: "minimal",
    large: "premium",
    premium: "premium",
    minimal: "minimal",
    transparent: "transparent",
    glass: "glass",
    outline: "outline",
  };

  return mapping[variant] || "default";
};

const CTAButton: React.FC<CTAButtonProps> = memo(
  ({
    href,
    children,
    isPrimary = false,
    className = "",
    variant = "default",
    colorScheme = "default",
    showIcon = true,
    iconPosition = "right",
    size = "md",
    glowEffect = false,
    shimmerEffect = false,
    particleEffect = false,
    hoverLift = false,
    animationDelay = 0,
    onClick,
    disabled = false,
    external = false,
    fullWidth = true,
    ariaLabel,
    shape = "rounded",
  }) => {
    return (
      <AnimatedCTAButton
        text={children as string}
        href={href}
        colorScheme={mapColorScheme(colorScheme) as any}
        size={size}
        variant={mapVariant(variant) as any}
        className={className}
        fullWidth={fullWidth}
        glowEffect={glowEffect}
        shimmerEffect={shimmerEffect}
        particleEffect={particleEffect}
        hoverLift={hoverLift}
        animationDelay={animationDelay}
        showIcon={showIcon}
        iconPosition={iconPosition}
        onClick={onClick}
        disabled={disabled}
        external={external}
        ariaLabel={ariaLabel}
        shape={shape}
      />
    );
  }
);

CTAButton.displayName = "CTAButton";

export const PrimaryButton: React.FC<
  Partial<CTAButtonProps> & { text?: string }
> = memo(
  ({
    text,
    href,
    colorScheme = "default",
    variant = "default",
    size = "md",
    glowEffect = false,
    shimmerEffect = false,
    particleEffect = false,
    hoverLift = false,
    showIcon = true,
    ...props
  }) => {
    const buttonText = text || HERO_CONTENT.CTA_BUTTONS.PRIMARY.text;
    const buttonHref = href || HERO_CONTENT.CTA_BUTTONS.PRIMARY.href;

    return (
      <CTAButton
        href={buttonHref}
        isPrimary
        colorScheme={mapColorScheme(colorScheme) as any}
        variant={variant}
        size={size}
        glowEffect={glowEffect}
        shimmerEffect={shimmerEffect}
        particleEffect={particleEffect}
        hoverLift={hoverLift}
        showIcon={showIcon}
        {...props}
      >
        {buttonText}
      </CTAButton>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";

export const SecondaryButton: React.FC<
  Partial<CTAButtonProps> & { text?: string }
> = memo(
  ({
    text,
    href,
    colorScheme = "default",
    variant = "outline",
    size = "md",
    glowEffect = false,
    shimmerEffect = false,
    particleEffect = false,
    hoverLift = false,
    showIcon = true,
    ...props
  }) => {
    const buttonText = text || HERO_CONTENT.CTA_BUTTONS.SECONDARY.text;
    const buttonHref = href || HERO_CONTENT.CTA_BUTTONS.SECONDARY.href;

    return (
      <CTAButton
        href={buttonHref}
        colorScheme={mapColorScheme(colorScheme) as any}
        variant={variant}
        size={size}
        glowEffect={glowEffect}
        shimmerEffect={shimmerEffect}
        particleEffect={particleEffect}
        hoverLift={hoverLift}
        showIcon={showIcon}
        {...props}
      >
        {buttonText}
      </CTAButton>
    );
  }
);

SecondaryButton.displayName = "SecondaryButton";

const CTAButtons: React.FC<CTAButtonsProps> = memo(
  ({
    primaryButton,
    secondaryButton,
    layout = "horizontal",
    spacing = "normal",
    variant = "default",
    colorScheme = "default",
    size = "md",
    showIcons = true,
    glowEffect = false,
    shimmerEffect = false,
    particleEffect = false,
    hoverLift = false,
    animationDelay = false,
    className = "",
    alignment = "center",
    fullWidth = false,
    shape = "rounded",
  }) => {
    const getLayoutClasses = () => {
      const layouts = {
        horizontal: "w-full flex flex-col sm:flex-row",
        vertical: "w-full flex flex-col",
        stacked: "w-full flex flex-col space-y-3 sm:space-y-4",
      };
      return layouts[layout] || layouts.horizontal;
    };

    const getSpacingClasses = () => {
      const spacings = {
        compact: layout === "horizontal" ? "gap-2 sm:gap-3" : "gap-2",
        normal: layout === "horizontal" ? "gap-3 sm:gap-4" : "gap-3",
        wide: layout === "horizontal" ? "gap-4 sm:gap-6" : "gap-4",
      };
      return spacings[spacing] || spacings.normal;
    };

    const getAlignmentClasses = () => {
      const alignments = {
        left: "justify-start items-start",
        center: "justify-center items-center",
        right: "justify-end items-end",
      };
      return alignments[alignment] || alignments.center;
    };

    const getButtonWidthClasses = () => {
      return "w-full sm:w-auto";
    };

    return (
      <div
        className={clsx(
          getLayoutClasses(),
          getSpacingClasses(),
          getAlignmentClasses(),
          className,
        )}
      >
        {primaryButton && (
          <div className={getButtonWidthClasses()}>
            <PrimaryButton
              text={primaryButton.text}
              href={primaryButton.href}
              onClick={primaryButton.onClick}
              variant={variant}
              colorScheme={mapColorScheme(colorScheme) as any}
              size={size}
              showIcon={showIcons}
              glowEffect={glowEffect}
              shimmerEffect={shimmerEffect}
              particleEffect={particleEffect}
              hoverLift={hoverLift}
              fullWidth={true}
              shape={shape}
              animationDelay={animationDelay ? 0 : undefined}
            />
          </div>
        )}

        {secondaryButton && (
          <div className={getButtonWidthClasses()}>
            <SecondaryButton
              text={secondaryButton.text}
              href={secondaryButton.href}
              onClick={secondaryButton.onClick}
              variant="outline"
              colorScheme={mapColorScheme(colorScheme) as any}
              size={size}
              showIcon={showIcons}
              glowEffect={glowEffect}
              shimmerEffect={shimmerEffect}
              particleEffect={particleEffect}
              hoverLift={hoverLift}
              fullWidth={true}
              shape={shape}
              animationDelay={animationDelay ? 200 : undefined}
            />
          </div>
        )}

        {/* Default buttons when no props provided */}
        {!primaryButton && !secondaryButton && (
          <>
            <div className={getButtonWidthClasses()}>
              <PrimaryButton
                variant={variant}
                colorScheme={mapColorScheme(colorScheme) as any}
                size={size}
                showIcon={showIcons}
                glowEffect={glowEffect}
                shimmerEffect={shimmerEffect}
                particleEffect={particleEffect}
                hoverLift={hoverLift}
                fullWidth={true}
                shape={shape}
                animationDelay={animationDelay ? 0 : undefined}
              />
            </div>
            <div className={getButtonWidthClasses()}>
              <SecondaryButton
                variant="outline"
                colorScheme={mapColorScheme(colorScheme) as any}
                size={size}
                showIcon={showIcons}
                glowEffect={glowEffect}
                shimmerEffect={shimmerEffect}
                particleEffect={particleEffect}
                hoverLift={hoverLift}
                fullWidth={true}
                shape={shape}
                animationDelay={animationDelay ? 200 : undefined}
              />
            </div>
          </>
        )}
      </div>
    );
  }
);

CTAButtons.displayName = "CTAButtons";

export default CTAButtons;
export { CTAButton };

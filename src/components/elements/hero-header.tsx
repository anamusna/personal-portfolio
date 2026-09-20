import clsx from "clsx";
import React, { memo } from "react";
import { P } from "../../tailwind/components/elements/Typography";
import {
  PAGE_HEADER_ACCENT_LINE,
  PAGE_HEADER_GREETING,
  PAGE_HEADER_HERO_SUBTITLE,
  PAGE_HEADER_HERO_TITLE,
} from "../../tailwind/styles/pageHeader";

interface HeroHeaderProps {
  greeting?: string;
  title?: string;
  subtitle?: string;
  greetingClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
  className?: string;
  showGreeting?: boolean;
  alignment?: "left" | "center" | "right";
  animated?: boolean;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

const defaultHeroIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const GREETING_ICON_SLOT =
  "inline-flex h-4 w-4 shrink-0 items-center justify-center sm:h-5 sm:w-5 [&>svg]:h-full [&>svg]:w-full [&>svg]:shrink-0";

const HeroHeader: React.FC<HeroHeaderProps> = memo(
  ({
    greeting,
    title,
    subtitle,
    className = "",
    greetingClassName,
    titleClassName,
    subtitleClassName,
    containerClassName = "",
    showGreeting = true,
    alignment = "center",
    animated = false,
    icon,
    showIcon = true,
  }) => {
    const alignmentClasses =
      alignment === "center"
        ? "text-left sm:text-center items-start sm:items-center"
        : alignment === "right"
          ? "text-left sm:text-right items-start sm:items-end"
          : "text-left items-start";

    const titleWrapperClasses = [
      "relative mb-2 md:mb-4",
      animated ? "animate-elegant-reveal" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const defaultTitleTextClasses = [
      "block",
      PAGE_HEADER_HERO_TITLE,
      "text-heading",
    ].join(" ");

    const greetingWrapperClasses =
      alignment === "center"
        ? "justify-start sm:justify-center"
        : alignment === "right"
          ? "justify-start sm:justify-end"
          : "justify-start";

    return (
      <header
        className={clsx(
          "relative flex flex-col",
          alignmentClasses,
          containerClassName,
          className,
        )}
      >
        {showGreeting && greeting && (
          <div
            className={clsx(
              animated && "animate-spring-in",
              "mb-4 sm:mb-6 w-full flex",
              greetingWrapperClasses,
            )}
          >
            <span className={greetingClassName || PAGE_HEADER_GREETING}>
              {showIcon && (
                <span className={GREETING_ICON_SLOT} aria-hidden>
                  {icon ?? defaultHeroIcon}
                </span>
              )}
              <span className="relative z-10 min-w-0">{greeting}</span>
            </span>
          </div>
        )}

        {title && (
          <h1 className={titleWrapperClasses}>
            <span
              className={clsx(
                "relative z-10",
                titleClassName || defaultTitleTextClasses,
              )}
            >
              {title}
            </span>
          </h1>
        )}

        {subtitle && (
          <P
            className={clsx(
              "relative max-w-4xl",
              PAGE_HEADER_HERO_SUBTITLE,
              alignment === "center" && "sm:mx-auto",
              subtitleClassName,
            )}
          >
            {subtitle}
          </P>
        )}

        <div
          className={clsx(
            "mt-4 sm:mt-5 h-px w-12 sm:w-20",
            alignment === "center" && "sm:mx-auto",
            PAGE_HEADER_ACCENT_LINE,
          )}
          aria-hidden
        />
      </header>
    );
  },
);

HeroHeader.displayName = "HeroHeader";

export default HeroHeader;

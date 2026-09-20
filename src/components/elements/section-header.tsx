import clsx from "clsx";
import { SECTION_VIEWPORT } from "constants/section-motion";
import { motion } from "motion/react";
import React from "react";
import { P } from "../../tailwind/components/elements/Typography";
import {
  PAGE_HEADER_BADGE,
  PAGE_HEADER_HIGHLIGHT,
  PAGE_HEADER_SECTION_CAPTION,
  PAGE_HEADER_SECTION_EYEBROW,
  PAGE_HEADER_SECTION_TITLE,
  PAGE_HEADER_SUBTITLE,
} from "../../tailwind/styles/pageHeader";
import { TEXT_MUTED } from "../../tailwind/styles/textTokens";

interface SectionHeaderProps {
  badge?: {
    icon?: React.ReactNode;
    text: string;
    iconAnimation?: boolean;
  };
  title?: string;
  /**
   * Heading level for the title. Defaults to h3 because this component is
   * normally a section heading under a page h1. Pages that have no other
   * heading (for example Privacy) pass "h1" so the document still has one.
   */
  titleAs?: "h1" | "h2" | "h3";
  subtitle?: string;
  caption?: string;
  description?: string;
  highlightText?: string;
  /** Short journey map above the fold (e.g. story page) — not a résumé block */
  orientation?: {
    text: string;
    note?: string;
  };
  className?: string;
  badgeClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  orientationClassName?: string;
  animationDelay?: number;
  icon?: React.ReactNode;
}

const defaultBadgeIcon = (
  <svg
    className="w-4 h-4 shrink-0 opacity-90"
    style={{ animationDuration: "4s" }}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  titleAs = "h3",
  subtitle,
  caption,
  description,
  highlightText,
  orientation,
  className = "",
  badgeClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  orientationClassName = "",
  animationDelay = 40,
  icon,
}) => {
  const TitleTag = motion[titleAs];

  const resolvedBadgeIcon =
    badge?.icon ?? (badge?.iconAnimation !== false ? defaultBadgeIcon : null);

  return (
    <motion.header
      className={clsx(
        "relative max-w-4xl mx-auto text-center mb-6 md:mb-8",
        className,
      )}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={SECTION_VIEWPORT}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: animationDelay / 1000,
      }}
    >
      {icon && !badge && (
        <div className="flex justify-center mb-3 text-orange-600 dark:text-orange-400">
          {icon}
        </div>
      )}

      {badge && (
        <motion.div
          className={clsx(PAGE_HEADER_BADGE, "mb-3 sm:mb-4", badgeClassName)}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {resolvedBadgeIcon}
          <span>{badge.text}</span>
        </motion.div>
      )}

      {subtitle && (
        <p className={`${PAGE_HEADER_SECTION_EYEBROW} mb-2 sm:mb-3`}>
          {subtitle}
        </p>
      )}

      {title && (
        <TitleTag
          className={clsx(
            "mb-2 sm:mb-3",
            PAGE_HEADER_SECTION_TITLE,
            "text-heading",
            titleClassName,
          )}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
            delay: (animationDelay + 80) / 1000,
          }}
        >
          {title}
        </TitleTag>
      )}

      {description && (
        <P
          className={clsx(
            "max-w-3xl mx-auto",
            PAGE_HEADER_SUBTITLE,
            descriptionClassName,
          )}
        >
          {/* Only split when there is something to highlight. `"".split("")`
              splits on every character, which used to wrap each letter of the
              description in its own <span>. */}
          {highlightText
            ? description
                .split(highlightText)
                .map((part, index, parts) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < parts.length - 1 && (
                      <span className={PAGE_HEADER_HIGHLIGHT}>
                        {highlightText}
                      </span>
                    )}
                  </React.Fragment>
                ))
            : description}
        </P>
      )}

      {orientation && (
        <div
          className={`mx-auto mt-4 max-w-xl px-2 text-center ${orientationClassName}`}
        >
          <p className={`${TEXT_MUTED} text-sm sm:text-base leading-relaxed`}>
            {orientation.text}
          </p>
          {orientation.note && (
            <p
              className={`${TEXT_MUTED} mt-2 text-xs sm:text-sm tracking-wide`}
            >
              {orientation.note}
            </p>
          )}
        </div>
      )}

      {caption && <p className={PAGE_HEADER_SECTION_CAPTION}>{caption}</p>}
      <div
        className="mx-auto mt-4 sm:mt-5 h-px w-16 sm:w-24 bg-light-border/60 dark:bg-dark-border/50"
        aria-hidden
      />
    </motion.header>
  );
};

export default SectionHeader;

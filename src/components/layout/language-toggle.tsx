import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../tailwind/components/elements/Icon";

export interface LanguageToggleProps {
  /**
   * `default` matches the standalone chrome-bar styling (used inside the
   * mobile navigation menu). `footer` is a slightly more compact, subdued
   * variant tuned to sit alongside the footer's nav links and social icons.
   */
  variant?: "default" | "footer";
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = "default",
}) => {
  const { t, i18n } = useTranslation("ansumana");
  const currentLanguage = i18n.resolvedLanguage?.toLowerCase().startsWith("de")
    ? "de"
    : "en";
  const nextLanguage = currentLanguage === "en" ? "de" : "en";
  const currentLanguageLabel = currentLanguage.toUpperCase();
  const isDe = currentLanguage === "de";
  const isFooter = variant === "footer";

  const handleToggleLanguage = () => {
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <button
      type="button"
      onClick={handleToggleLanguage}
      className={clsx(
        "group relative inline-flex items-center gap-1.5 rounded-full border py-1",
        isFooter ? "pl-2 pr-1" : "pl-2.5 pr-1",
        "min-h-[44px] min-w-[44px]",
        isFooter
          ? "border-light-border/50 dark:border-dark-border/40 bg-transparent"
          : "border-light-border/55 dark:border-dark-border/40 bg-light-background-alt/80 dark:bg-dark-background-alt/80 shadow-sm backdrop-blur-sm",
        "transition-colors duration-300 ease-out",
        "hover:border-royal-primary/40 dark:hover:border-royal-primary/50",
        !isFooter && "hover:shadow-md hover:shadow-royal-primary/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50",
      )}
      aria-label={t("a11y.header.languageToggle", {
        language: currentLanguageLabel,
      })}
      title={t("a11y.header.languageToggle", {
        language: currentLanguageLabel,
      })}
    >
      <Icon
        icon={faGlobe}
        size="xs"
        className="text-light-text/40 dark:text-dark-text/40 group-hover:text-royal-primary dark:group-hover:text-royal-primary transition-colors duration-300"
      />

      <span
        className={clsx(
          "relative inline-flex items-center rounded-full",
          isFooter ? "h-7" : "h-8",
        )}
        aria-hidden="true"
      >
        <span
          className={clsx(
            "absolute left-0 top-0 rounded-full bg-royal-primary shadow-sm",
            isFooter ? "h-7 w-8" : "h-8 w-9",
            "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "motion-reduce:transition-none",
            isDe && "translate-x-full",
          )}
        />
        <span
          className={clsx(
            "relative z-10 flex items-center justify-center font-semibold tracking-wide transition-colors duration-300",
            isFooter ? "h-7 w-8 text-[10px]" : "h-8 w-9 text-[11px]",
            !isDe
              ? "text-white"
              : "text-light-text/55 dark:text-dark-text/55 group-hover:text-light-text/80 dark:group-hover:text-dark-text/80",
          )}
        >
          EN
        </span>
        <span
          className={clsx(
            "relative z-10 flex items-center justify-center font-semibold tracking-wide transition-colors duration-300",
            isFooter ? "h-7 w-8 text-[10px]" : "h-8 w-9 text-[11px]",
            isDe
              ? "text-white"
              : "text-light-text/55 dark:text-dark-text/55 group-hover:text-light-text/80 dark:group-hover:text-dark-text/80",
          )}
        >
          DE
        </span>
      </span>
    </button>
  );
};

export default LanguageToggle;

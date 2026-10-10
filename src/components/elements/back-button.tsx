import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

interface BackButtonProps {
  /** Position of the button - defaults to top-left */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Fallback URL if no history exists */
  fallbackUrl?: string;
  /** Custom className for additional styling */
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  position = "top-left",
  fallbackUrl = "/",
  className = "",
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const isHome = path === "/" || path === "/home";
  // Position classes based on prop
  const positionClasses = {
    "top-left": "top-14 md:top-20 left-0",
    "top-right": "top-14 md:top-20 lg:top-24 right-6",
    "bottom-left": "bottom-14 md:bottom-20 left-6",
    "bottom-right": "bottom-14 md:bottom-20 right-6",
  };

  const handleBack = () => {
    // `location.key` is "default" on the first page of a visit. Going back
    // from there would leave the site (history.length also counts other
    // sites), so use the fallback instead.
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate(fallbackUrl);
    }
  };

  if (isHome) return null;

  return (
    <div
      className={clsx(
        // Only where there is margin outside the content column. Narrower,
        // a fixed button covers the start of text lines, and the browser's
        // own back control does the same job.
        "fixed z-[55] group transition-all duration-500 ease-out translate-y-0 opacity-100 back-button-wide",
        positionClasses[position],
        className,
      )}
    >
      {/* Subtle ambient glow - much more minimal */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-400/10 via-gray-500/10 to-gray-400/10 dark:from-gray-300/15 dark:via-gray-400/15 dark:to-gray-300/15 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Minimal button container */}
      <button
        type="button"
        onClick={handleBack}
        className="relative flex items-center justify-center w-10 h-10 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 border border-gray-200/30 dark:border-gray-700/30 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label={t("common.actions.goBack")}
        title={t("common.actions.goBack")}
      >
        {/* Beautiful minimal arrow icon */}
        <svg
          className="w-4 h-4 text-muted group-hover:text-heading transition-all duration-300 group-hover:-translate-x-0.5 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>

        {/* Very subtle hover effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-gray-200/20 to-transparent dark:via-gray-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    </div>
  );
};

export default BackButton;

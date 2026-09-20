import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { useEnvironmentSettings } from "../../../context/EnvironmentContext";
import { PaginationProps } from "../../../tailwind/types/elements/pagination";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  theme = "light",
  variant = "primary",
  size = "md",
}) => {
  const { fontSize } = useEnvironmentSettings();
  const { t } = useTranslation("ansumana");
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-xs py-2xs text-sm",
    md: "px-sm py-xs text-base",
    lg: "px-md py-sm text-lg",
    xl: "px-lg py-md text-xl",
  };

  const themeColors = {
    light: {
      primary: "bg-primary-light-500 text-white hover:bg-primary-light-600",
      secondary: "bg-light-secondary text-white hover:bg-light-primary",
      outline:
        "border border-primary-light-500 text-primary-light-500 hover:bg-primary-light-50",
      transparent:
        "bg-transparent text-primary-light-500 hover:bg-primary-light-50",
      danger: "bg-red-500 text-white hover:bg-red-600",
      success: "bg-green-500 text-white hover:bg-green-600",
    },
    dark: {
      primary: "bg-primary-dark-500 text-white hover:bg-primary-dark-600",
      secondary: "bg-dark-secondary text-white hover:bg-dark-primary",
      outline:
        "border border-primary-dark-500 text-primary-dark-500 hover:bg-primary-dark-50",
      transparent:
        "bg-transparent text-primary-dark-500 hover:bg-primary-dark-50",
      danger: "bg-red-600 text-white hover:bg-red-700",
      success: "bg-green-600 text-white hover:bg-green-700",
    },
  };

  const currentTheme: any = themeColors[theme] || themeColors.light;
  const themeClasses = currentTheme[variant];

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (
      page !== currentPage &&
      page > 0 &&
      page <= totalPages &&
      onPageChange
    ) {
      onPageChange(page);
    }
  };

  const getButtonClasses = (isCurrentPage: boolean) => {
    return clsx(baseClasses, themeClasses, sizeClasses[fontSize || size], {
      "opacity-50 cursor-not-allowed": isCurrentPage,
      "hover:bg-bg-light": !isCurrentPage,
    });
  };

  const getPrevClasses = () => {
    return clsx(baseClasses, themeClasses, sizeClasses[fontSize || size], {
      "rounded-l": true,
      "opacity-50 cursor-not-allowed": currentPage === 1,
    });
  };

  const getNextClasses = () => {
    return clsx(baseClasses, themeClasses, sizeClasses[fontSize || size], {
      "rounded-r": true,
      "opacity-50 cursor-not-allowed": currentPage === totalPages,
    });
  };

  return (
    <nav
      className="relative z-0 inline-flex rounded shadow -space-x-px"
      aria-label={t("a11y.shared.pagination")}
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={getPrevClasses()}
      >
        <span className="sr-only">{t("common.actions.previous")}</span>
        &lt;
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={getButtonClasses(currentPage === page)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={getNextClasses()}
      >
        <span className="sr-only">{t("common.actions.next")}</span>
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;

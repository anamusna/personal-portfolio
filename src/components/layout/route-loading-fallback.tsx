import React from "react";
import { useTranslation } from "react-i18next";

export const RouteLoadingFallback: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label={t("common.status.loadingPage")}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-600 dark:border-indigo-400/30 dark:border-t-indigo-400" />
    </div>
  );
};

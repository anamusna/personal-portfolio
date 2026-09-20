import { LAYOUT_STYLES } from "data/heroData";
import React from "react";
import { useTranslation } from "react-i18next";
import { SURFACE_CARD_HEADER } from "tailwind/styles/surfaceCard";
import { ProjectDetailTab } from "../hooks/use-project-details";
import {
  getAdjacentProjectTabId,
  getProjectTabProgress,
} from "../utils/project-tab-navigation";

type ProjectDetailsTabBarProps = {
  tabs: ProjectDetailTab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
};

export const ProjectDetailsTabBar: React.FC<ProjectDetailsTabBarProps> = ({
  tabs,
  activeTabId,
  onTabChange,
}) => {
  const { t } = useTranslation();
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTabId);
  const displayIndex = activeIndex >= 0 ? activeIndex + 1 : 1;
  const progressWidth = getProjectTabProgress(tabs, activeTabId);

  return (
    <nav
      className={SURFACE_CARD_HEADER}
      aria-label={t("features.projectDetails.tabBar.navLabel")}
    >
      <div className={LAYOUT_STYLES.CONTENT_CONTAINER}>
        <div className="relative">
          <div className="flex items-center justify-between py-1.5 sm:py-2">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide flex-1">
              {tabs.map((tab, index) => {
                const isActive = tab.id === activeTabId;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    className={`group relative flex-shrink-0 px-2 sm:px-3 py-1.5 sm:py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap min-h-[32px] sm:min-h-[36px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-1 rounded-lg sm:rounded-xl ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-body hover:text-heading"
                    }`}
                    style={{ animationDelay: `${index * 30}ms` }}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={t("features.projectDetails.tabBar.viewTabAria", {
                      tab: tab.label,
                    })}
                  >
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-500 dark:via-violet-500 dark:to-purple-500 rounded-lg sm:rounded-xl shadow-lg" />
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-500 dark:via-violet-500 dark:to-purple-500 rounded-lg sm:rounded-xl blur opacity-40" />
                      </>
                    )}

                    {!isActive && (
                      <div className="absolute inset-0 bg-gray-100/80 dark:bg-gray-800/80 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    )}

                    <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                      <div
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-white"
                            : "bg-gray-400 dark:bg-gray-500 group-hover:bg-gray-600 dark:group-hover:bg-gray-400"
                        }`}
                      />
                      <span className="font-medium truncate max-w-[70px] sm:max-w-[90px] lg:max-w-[110px]">
                        {tab.label}
                      </span>
                    </span>

                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4">
              <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">{displayIndex}</span>
                <span>/</span>
                <span>{tabs.length}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    onTabChange(
                      getAdjacentProjectTabId(tabs, activeTabId, "previous"),
                    )
                  }
                  className="p-1 sm:p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                  aria-label={t("features.projectDetails.tabBar.previousAria")}
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onTabChange(
                      getAdjacentProjectTabId(tabs, activeTabId, "next"),
                    )
                  }
                  className="p-1 sm:p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                  aria-label={t("features.projectDetails.tabBar.nextAria")}
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

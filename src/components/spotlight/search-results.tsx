import clsx from "clsx";
import { motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { SpotlightCategory } from "data/about/spotlightData";
import { SpotlightResult } from "hooks/useSpotlightSearch";

interface SearchResultsProps {
  groupedResults: Record<SpotlightCategory, SpotlightResult[]>;
  orderedCategories: SpotlightCategory[];
  results: SpotlightResult[];
  selectedIndex: number;
  searchInput?: string;
  onSearchInputChange?: (value: string) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onClear?: () => void;
  onClose?: () => void;
  isSearchSendDisabled?: boolean;
  isSearchClearDisabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  resetSelection?: () => void;
  onSelectResult: (result: SpotlightResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  groupedResults,
  orderedCategories,
  results,
  selectedIndex,
  onSelectResult,
}) => {
  const { t } = useTranslation("ansumana");
  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300/60 bg-white/50 p-8 text-center text-sm text-slate-500 dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-400"
      >
        <span className="font-semibold text-slate-600 dark:text-slate-300">
          {t("spotlight.search.empty.title")}
        </span>
        <span>{t("spotlight.search.empty.subtitle")}</span>
      </motion.div>
    );
  }

  // Flatten all results from all categories into a single array
  const allResults = orderedCategories.flatMap(
    (categoryKey) => groupedResults[categoryKey] || [],
  );

  return (
    <motion.div
      className="flex w-full flex-wrap items-center justify-start gap-2 sm:gap-2.5"
      initial={false}
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
      }}
    >
      {allResults.map((result) => {
        const isActive =
          results.findIndex((item) => item.id === result.id) === selectedIndex;

        return (
          <motion.button
            key={result.id}
            type="button"
            onClick={() => onSelectResult(result)}
            variants={{
              hidden: { opacity: 0, scale: 0.75, y: 10 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            whileHover={{ scale: isActive ? 1.05 : 1.06 }}
            whileTap={{ scale: 0.94 }}
            className={clsx(
              "group flex flex-none items-center gap-2 rounded-full border px-3 py-1.5",
              "text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out",
              isActive &&
                "border-emerald-400 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105",
              !isActive && [
                "border-slate-200 bg-white text-slate-700",
                "hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700",
                "hover:shadow-md",
                "dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200",
                "dark:hover:border-emerald-500 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400",
              ],
            )}
          >
            <span className="max-w-[300px] truncate leading-none sm:max-w-none">
              {result.title}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default React.memo(SearchResults);

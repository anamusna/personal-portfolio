import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import TypingText from "components/spotlight/typing-text";

interface SearchHeaderProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
  isSearchSendDisabled: boolean;
  isSearchClearDisabled: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  resetSelection: () => void;
  onClose: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchInput,
  onSearchInputChange,
  onSubmit,
  onClear,
  isSearchSendDisabled,
  isSearchClearDisabled,
  inputRef,
  resetSelection,
  onClose,
}) => {
  const { t } = useTranslation("ansumana");
  const showAnimatedPlaceholder = !searchInput;

  return (
    <div className="flex items-center gap-2 px-4 pt-3 sm:gap-3 sm:px-4">
      <form onSubmit={onSubmit} className="flex-1">
        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/50 px-3 py-2 shadow-inner transition focus-within:border-emerald-400 focus-within:bg-white dark:border-slate-700/70 dark:bg-slate-900/70 dark:focus-within:border-emerald-400/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            className="h-4 w-4 flex-shrink-0 text-slate-500 dark:text-slate-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17.25 10.5a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z"
            />
          </svg>
          <div className="relative flex-1">
            {showAnimatedPlaceholder ? (
              <TypingText
                text={[
                  t("spotlight.search.prompts.search"),
                  t("spotlight.search.prompts.projects"),
                  t("spotlight.search.prompts.experience"),
                ]}
                typingSpeed={45}
                deletingSpeed={24}
                pauseDuration={2000}
                loop
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 select-none text-sm text-slate-500 transition-opacity dark:text-slate-400"
                showCursor={false}
              />
            ) : null}

            <input
              ref={inputRef}
              type="text"
              value={searchInput}
              aria-label={t("spotlight.search.aria.input")}
              onChange={(event) => onSearchInputChange(event.target.value)}
              onFocus={() => {
                resetSelection();
              }}
              className="w-full bg-transparent text-[16px] text-slate-900 focus:outline-none sm:text-sm dark:text-slate-100"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onClear}
              disabled={isSearchClearDisabled}
              className={clsx(
                "hidden h-7 w-7 items-center justify-center rounded-full border border-white/30 text-slate-500 transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-40 sm:flex dark:border-slate-700/70 dark:text-slate-300 dark:hover:text-white",
                isSearchClearDisabled
                  ? "bg-transparent"
                  : "bg-white/40 dark:bg-slate-800/60"
              )}
              aria-label={t("spotlight.search.aria.clear")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-3.5 w-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              type="submit"
              disabled={isSearchSendDisabled}
              className={clsx(
                "hidden h-7 w-7 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-500/10 text-xs font-medium text-emerald-500 transition hover:bg-emerald-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:border-white/20 disabled:bg-white/20 disabled:text-slate-400 sm:inline-flex dark:border-emerald-400/50 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:bg-emerald-500/20 dark:disabled:border-slate-700/60 dark:disabled:bg-slate-800/60 dark:disabled:text-slate-500",
                isSearchSendDisabled && "pointer-events-none"
              )}
              aria-label={t("spotlight.search.aria.submit")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-3.5 w-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h13m0 0l-4-4m4 4l-4 4"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <button
        type="button"
        onClick={onClose}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        aria-label={t("spotlight.search.aria.close")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default React.memo(SearchHeader);

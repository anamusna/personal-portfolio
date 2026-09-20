import TypingText from "components/spotlight/typing-text";
import React from "react";
import { useTranslation } from "react-i18next";

interface ChatHeaderProps {
  onClear: () => void;
  onClose: () => void;
  chatInput: string;
  messages: any[];
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onClear,
  onClose,
  chatInput,
  messages,
}) => {
  const { t } = useTranslation("ansumana");
  const showClear =
    messages.length > 0 || chatInput.length > 0;

  return (
    <div className="flex-shrink-0 border-b border-slate-200/60 px-3 py-2.5 sm:px-4 sm:py-3 dark:border-slate-700/60">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
            {t("spotlight.chat.title")}
          </p>
          {messages.length === 0 ? (
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
              className="mt-0.5 truncate text-sm font-semibold text-slate-900 dark:text-slate-100"
              showCursor={false}
            />
          ) : (
            <h3 className="mt-0.5 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t("spotlight.chat.askAnything")}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {showClear && (
            <button
              type="button"
              onClick={onClear}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-slate-500 transition hover:bg-white/20 hover:text-slate-900 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 dark:border-slate-800/70 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label={t("spotlight.chat.aria.clearConversation")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7m3 4v6m4-6v6"
                />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/20 text-slate-500 transition hover:bg-white/30 hover:text-slate-900 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 dark:border-slate-800/80 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <span className="sr-only">{t("spotlight.chat.aria.close")}</span>
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
      </div>
    </div>
  );
};

export default React.memo(ChatHeader);

import React from "react";
import { useTranslation } from "react-i18next";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClearDraft: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const ChatComposer: React.FC<ChatComposerProps> = ({
  value,
  onChange,
  onSubmit,
  onClearDraft,
  inputRef,
}) => {
  const { t } = useTranslation("ansumana");
  const hasInput = value.length > 0;

  return (
    <form
      onSubmit={onSubmit}
      className="glass-2 border-t border-light-border dark:border-dark-border px-3 py-2 sm:px-4 sm:py-2.5"
    >
      <div className="flex items-center gap-1.5 rounded-xl border border-light-border/60 dark:border-dark-border/60 backdrop-blur-md px-2.5 py-1.5 transition sm:px-3 sm:py-2 focus-within:ring-2 focus-within:ring-royal-primary/60 focus-within:border-royal-primary/40">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("spotlight.chat.placeholder")}
          className="min-w-0 flex-1 bg-transparent text-[16px] text-light-text placeholder:text-light-muted focus:outline-none sm:text-sm dark:text-dark-text dark:placeholder:text-dark-muted"
        />
        {hasInput && (
          <>
            <button
              type="button"
              onClick={onClearDraft}
              className="glass-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-light-border/50 text-light-muted transition hover:text-light-text focus-visible:ring-2 focus-visible:ring-royal-primary focus-visible:ring-offset-0 dark:border-dark-border/60 dark:text-dark-muted dark:hover:text-dark-text"
              aria-label={t("spotlight.chat.aria.clearInput")}
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
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-royal-primary text-white shadow-lg shadow-royal-primary/20 transition hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-royal-primary focus-visible:ring-offset-0"
            >
              <span className="sr-only">{t("spotlight.chat.aria.send")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19V5m0 0l-4 4m4-4l4 4"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default React.memo(ChatComposer);

import ChatView from "components/spotlight/chat-view";
import SearchResults from "components/spotlight/search-results";
import SpotlightPanelHeader from "components/spotlight/spotlight-panel-header";
import { computeOrderedCategoryKeys } from "components/spotlight/utils";
import { SpotlightCategory } from "data/about/spotlightData";
import { SpotlightResult, useSpotlightSearch } from "hooks/useSpotlightSearch";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type ChatbotEvent =
  | { type: "asked"; question: string }
  | { type: "answered"; question: string; titlesUsed: string[] }
  | { type: "fallback"; question: string }
  | { type: "reset" };

interface SpotlightChatbotProps {
  className?: string;
  onEvent?: (evt: ChatbotEvent) => void;
  launcherRef?: React.RefObject<HTMLButtonElement>;
}

const SpotlightChatbot: React.FC<SpotlightChatbotProps> = ({
  className = "",
  onEvent,
  launcherRef,
}) => {
  const { t } = useTranslation("ansumana");
  const {
    searchInput,
    results,
    messages,
    isSearching,
    showSpotlight,
    isChatMode,
    selectedIndex,
    closeSpotlight,
    updateSearchInput,
    clearSearchInput,
    submitCurrentQuery,
    selectResult,
    submitChatMessage,
    resetSelection,
    clearChat,
  } = useSpotlightSearch();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const [chatInput, setChatInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const panelEl = panelRef.current;
      if (!panelEl) return;
      const target = event.target as Node | null;
      if (!target) return;

      const clickedInsidePanel = panelEl.contains(target);
      const launcherEl = launcherRef?.current ?? null;
      const clickedLauncher = !!launcherEl && launcherEl.contains(target);

      if (showSpotlight && !clickedInsidePanel && !clickedLauncher) {
        closeSpotlight();
      }
    };

    if (showSpotlight) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showSpotlight, closeSpotlight, launcherRef]);

  const groupedResults = useMemo(() => {
    return results.reduce<Record<SpotlightCategory, SpotlightResult[]>>(
      (acc, result) => {
        if (!acc[result.category]) {
          acc[result.category] = [];
        }
        acc[result.category].push(result);
        return acc;
      },
      {} as Record<SpotlightCategory, SpotlightResult[]>,
    );
  }, [results]);

  const suggestionResults = useMemo(() => results.slice(0, 4), [results]);
  const orderedCategoryKeys = useMemo(() => {
    return computeOrderedCategoryKeys(groupedResults, results);
  }, [groupedResults, results]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitCurrentQuery();
  };

  const handleChatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = chatInput.trim();

    if (!trimmed) {
      return;
    }

    submitChatMessage(trimmed);
    setChatInput("");
  };

  const handleChatClear = () => {
    clearChat();
    setChatInput("");
  };

  const isSearchSendDisabled = !searchInput.trim() && results.length === 0;

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <section aria-label={t("spotlight.aria.chatbot")}>
      <AnimatePresence>
        {showSpotlight && (
          <motion.div
            id="spotlight-chat-panel"
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 28,
              mass: 0.8,
            }}
            className="fixed bottom-0 md:bottom-20 right-0 z-[70] w-[100vw] max-w-md origin-bottom-right"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === "Escape") closeSpotlight();
            }}
            tabIndex={-1}
          >
            <div className="glass-2 rounded-t-2xl md:rounded-2xl shadow-2xl border border-light-border dark:border-dark-border">
              <SpotlightPanelHeader isChatMode={isChatMode} chatInput={chatInput} />

              <div className="flex min-h-0 overflow-y-auto h-[65vh] flex-col">
                <AnimatePresence mode="wait" initial={false}>
                  {!isChatMode ? (
                    <motion.div
                      key="search-view"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 pb-3 sm:px-4 sm:py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700"
                    >
                      <SearchResults
                        groupedResults={groupedResults}
                        orderedCategories={orderedCategoryKeys}
                        results={results}
                        selectedIndex={selectedIndex}
                        onSearchInputChange={updateSearchInput}
                        onSubmit={handleSearchSubmit}
                        onClear={clearSearchInput}
                        onClose={closeSpotlight}
                        isSearchSendDisabled={isSearchSendDisabled}
                        isSearchClearDisabled={searchInput.trim().length === 0}
                        inputRef={inputRef}
                        resetSelection={resetSelection}
                        onSelectResult={selectResult}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="chat-view"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="flex flex-1 flex-col overflow-hidden"
                    >
                      <ChatView
                        messages={messages}
                        isSearching={isSearching}
                        suggestions={suggestionResults}
                        onSelectSuggestion={selectResult}
                        chatInput={chatInput}
                        onChatInputChange={setChatInput}
                        onChatSubmit={handleChatSubmit}
                        onChatDraftClear={() => setChatInput("")}
                        chatInputRef={chatInputRef}
                        onClearConversation={handleChatClear}
                        onClose={closeSpotlight}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SpotlightChatbot;

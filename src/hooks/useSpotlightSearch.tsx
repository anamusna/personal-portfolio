import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SpotlightCategory,
  SpotlightEntry,
  SPOTLIGHT_CATEGORY_ORDER,
  SPOTLIGHT_ENTRIES,
} from "../data/about/spotlightData";
import { useLocation } from "react-router-dom";
import i18n, { DEFAULT_LANGUAGE } from "../i18n";

export interface SpotlightResult {
  id: string;
  title: string;
  description: string;
  category: SpotlightCategory;
  icon: SpotlightEntry["icon"];
  response: string;
}

export interface SpotlightSearchState {
  searchInput: string;
  results: SpotlightResult[];
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  isSearching: boolean;
  showModal: boolean;
  showSpotlight: boolean;
  isChatMode: boolean;
  selectedIndex: number;
  openSpotlight: () => void;
  closeSpotlight: () => void;
  updateSearchInput: (value: string) => void;
  clearSearchInput: () => void;
  submitCurrentQuery: () => void;
  selectResult: (result: SpotlightResult) => void;
  submitChatMessage: (message: string) => void;
  moveSelection: (direction: "up" | "down") => void;
  resetSelection: () => void;
  clearChat: () => void;
}

const SpotlightSearchContext = createContext<SpotlightSearchState | null>(null);

const SCORE_THRESHOLD = 1;
const DEBOUNCE_DELAY = 260;
// Answers are looked up locally, so there is nothing to wait for. A longer
// delay with a typing indicator would pretend to be a model thinking.
const CHAT_DELAY = 0;

const normalize = (value: string) => value.trim().toLowerCase();

const buildDefaultResults = (language: string): SpotlightResult[] => {
  void language;
  const seedIds = [
    "journey-summary",
    "intro-overview",
    "project-quincy",
    "skills-core",
    "focus-healthcare",
    "education-gtti",
  ];

  const seeded: SpotlightEntry[] = seedIds
    .map((id) => SPOTLIGHT_ENTRIES.find((entry) => entry.id === id))
    .filter((e): e is SpotlightEntry => Boolean(e));

  const DEFAULT_CATEGORY_LIMIT = 1; // number of items per category
  const DEFAULT_MAX_RESULTS = 6; // overall cap to keep UI concise

  const byCategory: SpotlightEntry[] = SPOTLIGHT_CATEGORY_ORDER.flatMap(
    (cat) => {
      const entries = SPOTLIGHT_ENTRIES.filter((e) => e.category === cat);

      const prioritized = entries.sort((a, b) => {
        const aw = Number(
          /overview|summary|what|how/i.test(a.title) ||
            a.keywords.some((k) => /overview|summary/i.test(k)),
        );
        const bw = Number(
          /overview|summary|what|how/i.test(b.title) ||
            b.keywords.some((k) => /overview|summary/i.test(k)),
        );
        return bw - aw; // true first
      });
      return prioritized.slice(0, DEFAULT_CATEGORY_LIMIT);
    },
  );

  // Merge seed with category entries, remove duplicates, and cap length
  const merged: SpotlightEntry[] = [];
  const seen = new Set<string>();
  [...seeded, ...byCategory].forEach((entry) => {
    if (!seen.has(entry.id)) {
      seen.add(entry.id);
      merged.push(entry);
    }
  });

  return merged.slice(0, DEFAULT_MAX_RESULTS).map((entry) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    icon: entry.icon,
    response: entry.response,
  }));
};

const buildResult = (entry: SpotlightEntry): SpotlightResult => ({
  id: entry.id,
  title: entry.title,
  description: entry.description,
  category: entry.category,
  icon: entry.icon,
  response: entry.response,
});

// Words that carry no signal for matching, in English and German. The
// person's own name is included because it appears in nearly every entry.
const STOP_WORDS = new Set(
  (
    "a an the and or of to in on at for with from by is are was were be been do does did how what who whom whose " +
    "which when where why can could would should will his her him he she it its this that these those about into " +
    "over than then there their they them you your i me my we our us as if not no yes ansu ansus ansumana darboe " +
    "wie was wer wo wann warum welche welcher welches ist sind war waren hat haben hatte kann könnte soll wird " +
    "der die das den dem des ein eine einen einem einer und oder mit bei von zu zum zur im am auf für über durch " +
    "nach vor aus ihm ihn er sie es sich ich mein dein"
  ).split(" "),
);

const tokenize = (value: string): string[] =>
  value
    .split(/[^\p{L}\p{N}.+#]+/u)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));

export const matchScore = (query: string, entry: SpotlightEntry) => {
  const normalizedQuery = normalize(query);
  const tokens = tokenize(normalizedQuery);
  const queryTokens = tokens.length ? tokens : [normalizedQuery];
  const title = normalize(entry.title);
  const description = entry.description.toLowerCase();
  let score = 0;

  entry.keywords.forEach((keyword) => {
    const normalizedKeyword = normalize(keyword);
    if (normalizedKeyword === normalizedQuery) {
      score += 3;
    } else if (normalizedKeyword.includes(normalizedQuery)) {
      score += 2;
    } else if (queryTokens.some((token) => normalizedKeyword.includes(token))) {
      score += 1;
    }
  });

  if (title === normalizedQuery) {
    score += 4;
  } else if (title.includes(normalizedQuery)) {
    score += 2;
  }
  score += Math.min(
    3,
    queryTokens.filter((token) => title.includes(token)).length,
  );

  if (description.includes(normalizedQuery)) {
    score += 1;
  }
  if (queryTokens.filter((token) => description.includes(token)).length >= 2) {
    score += 1;
  }

  return score;
};

const buildAssistantResponse = (results: SpotlightResult[]): string => {
  if (!results.length) {
    return [
      i18n.t("spotlight.chat.fallback.title"),
      "",
      `- ${i18n.t("spotlight.chat.fallback.item1")}`,
      `- ${i18n.t("spotlight.chat.fallback.item2")}`,
      `- ${i18n.t("spotlight.chat.fallback.item3")}`,
      "",
      i18n.t("spotlight.chat.fallback.tryAsking"),
    ].join("\n");
  }

  return results
    .slice(0, 3)
    .map((result) => `**${result.title}**\n${result.response}`)
    .join("\n\n");
};

export const SpotlightSearchProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => setCurrentLanguage(lng);
    setCurrentLanguage(i18n.language);
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  const defaultResults = useMemo(
    () => buildDefaultResults(currentLanguage),
    [currentLanguage],
  );

  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<SpotlightResult[]>(defaultResults);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetChatTimer = useCallback(() => {
    if (chatTimer.current) {
      clearTimeout(chatTimer.current);
      chatTimer.current = null;
    }
  }, []);

  const openSpotlight = useCallback(() => {
    setShowModal(true);
    setShowSpotlight(true);
    setIsChatMode(false);
    setIsSearching(false);
    setMessages([]);
    setSearchInput("");
    setResults(defaultResults);
    setSelectedIndex(0);
  }, [defaultResults]);

  const closeSpotlight = useCallback(() => {
    setShowModal(false);
    setShowSpotlight(false);
    setIsChatMode(false);
    setIsSearching(false);
    resetChatTimer();
  }, [resetChatTimer]);

  // Answers link to pages on the site. Following one should leave the
  // visitor on that page, not behind the open panel.
  const { pathname } = useLocation();
  const closeSpotlightRef = useRef(closeSpotlight);
  closeSpotlightRef.current = closeSpotlight;
  useEffect(() => {
    closeSpotlightRef.current();
  }, [pathname]);

  const performSearch = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) {
        setResults(defaultResults);
        setSelectedIndex(0);
        return;
      }

      const ranked = SPOTLIGHT_ENTRIES.map((entry) => ({
        entry,
        score: matchScore(trimmed, entry),
      }))
        .filter(({ score }) => score >= SCORE_THRESHOLD)
        .sort((a, b) => {
          if (b.score === a.score) {
            return (
              SPOTLIGHT_CATEGORY_ORDER.indexOf(a.entry.category) -
              SPOTLIGHT_CATEGORY_ORDER.indexOf(b.entry.category)
            );
          }
          return b.score - a.score;
        })
        .map(({ entry }) => buildResult(entry));

      setResults(ranked);
      setSelectedIndex(0);
    },
    [defaultResults],
  );

  const updateSearchInput = useCallback(
    (value: string) => {
      setSearchInput(value);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        performSearch(value);
      }, DEBOUNCE_DELAY);
    },
    [performSearch],
  );

  const clearSearchInput = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    setSearchInput("");
    setResults(defaultResults);
    setSelectedIndex(0);
  }, [defaultResults]);

  const appendAssistantResponse = useCallback(
    (prompt: string, matchingResults: SpotlightResult[]) => {
      resetChatTimer();
      setIsSearching(true);
      chatTimer.current = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: buildAssistantResponse(matchingResults),
          },
        ]);
        setIsSearching(false);
      }, CHAT_DELAY);
    },
    [resetChatTimer],
  );

  const enterChatMode = useCallback(
    (prompt: string, entry?: SpotlightResult) => {
      setIsChatMode(true);
      setSearchInput("");
      setResults(defaultResults);
      setSelectedIndex(0);

      setMessages((prev) => [...prev, { role: "user", content: prompt }]);

      if (entry) {
        appendAssistantResponse(prompt, [entry]);
      } else {
        const ranked = SPOTLIGHT_ENTRIES.map((candidate) => ({
          entry: candidate,
          score: matchScore(prompt, candidate),
        }))
          .filter(({ score }) => score >= SCORE_THRESHOLD)
          .sort((a, b) => b.score - a.score)
          .map(({ entry }) => buildResult(entry));

        appendAssistantResponse(prompt, ranked);
      }
    },
    [appendAssistantResponse, defaultResults],
  );

  const submitCurrentQuery = useCallback(() => {
    if (isChatMode) {
      return;
    }

    const trimmed = searchInput.trim();
    // A typed question is answered as typed. `results` is debounced and can
    // still belong to an earlier query, so it is only used when the visitor
    // has nothing typed or has picked a result with the arrow keys.
    if (trimmed && selectedIndex === 0) {
      enterChatMode(trimmed);
      return;
    }

    if (results[selectedIndex]) {
      enterChatMode(results[selectedIndex].title, results[selectedIndex]);
    }
  }, [enterChatMode, isChatMode, results, searchInput, selectedIndex]);

  const selectResult = useCallback(
    (result: SpotlightResult) => {
      enterChatMode(result.title, result);
    },
    [enterChatMode],
  );

  const submitChatMessage = useCallback(
    (message: string) => {
      const trimmed = message.trim();
      if (!trimmed) {
        return;
      }
      enterChatMode(trimmed);
    },
    [enterChatMode],
  );

  const moveSelection = useCallback(
    (direction: "up" | "down") => {
      if (!results.length || isChatMode) {
        return;
      }

      setSelectedIndex((prev) => {
        if (direction === "up") {
          return prev === 0 ? results.length - 1 : prev - 1;
        }
        return prev === results.length - 1 ? 0 : prev + 1;
      });
    },
    [isChatMode, results],
  );

  const resetSelection = useCallback(() => {
    setSelectedIndex(0);
  }, []);

  const clearChat = useCallback(() => {
    resetChatTimer();
    setMessages([]);
    setIsSearching(false);
    setResults(defaultResults);
    setSelectedIndex(0);
  }, [defaultResults, resetChatTimer]);

  useEffect(() => {
    if (!showModal && !showSpotlight) {
      setResults(defaultResults);
      setSelectedIndex(0);
    }
  }, [defaultResults, showModal, showSpotlight]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSpotlight();
      } else if (event.key === "Escape" && (showModal || showSpotlight)) {
        event.preventDefault();
        if (isChatMode && messages.length > 0) {
          setIsChatMode(false);
          setMessages([]);
          setIsSearching(false);
          setResults(defaultResults);
          setSearchInput("");
          setSelectedIndex(0);
        } else {
          closeSpotlight();
        }
      } else if (
        (showModal || showSpotlight) &&
        !isChatMode &&
        // Only steer from the search field. Elsewhere, Enter must keep
        // activating whatever button has focus.
        event.target instanceof HTMLElement &&
        event.target.dataset.spotlightInput !== undefined
      ) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          moveSelection("down");
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          moveSelection("up");
        } else if (event.key === "Enter") {
          event.preventDefault();
          submitCurrentQuery();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    closeSpotlight,
    defaultResults,
    isChatMode,
    messages.length,
    moveSelection,
    openSpotlight,
    showModal,
    showSpotlight,
    submitCurrentQuery,
  ]);

  useEffect(
    () => () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      resetChatTimer();
    },
    [resetChatTimer],
  );

  const value = useMemo<SpotlightSearchState>(
    () => ({
      searchInput,
      results,
      messages,
      isSearching,
      showModal,
      showSpotlight,
      isChatMode,
      selectedIndex,
      openSpotlight,
      closeSpotlight,
      updateSearchInput,
      clearSearchInput,
      submitCurrentQuery,
      selectResult,
      submitChatMessage,
      moveSelection,
      resetSelection,
      clearChat,
    }),
    [
      closeSpotlight,
      isChatMode,
      isSearching,
      messages,
      openSpotlight,
      results,
      searchInput,
      selectResult,
      selectedIndex,
      showModal,
      showSpotlight,
      submitChatMessage,
      submitCurrentQuery,
      updateSearchInput,
      clearSearchInput,
      moveSelection,
      resetSelection,
      clearChat,
    ],
  );

  return (
    <SpotlightSearchContext.Provider value={value}>
      {children}
    </SpotlightSearchContext.Provider>
  );
};

export const useSpotlightSearch = () => {
  const context = useContext(SpotlightSearchContext);
  if (!context) {
    throw new Error(
      "useSpotlightSearch must be used within a SpotlightSearchProvider",
    );
  }
  return context;
};

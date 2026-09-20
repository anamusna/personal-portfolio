import clsx from "clsx";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getActiveNavSectionId,
  getDockSections,
  PageId,
  scrollToNavSection,
  shouldShowDock,
} from "data/pageNavigation";
import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpotlightSearch } from "../../hooks/useSpotlightSearch";
import { P } from "../../tailwind/components/elements/Typography";

interface BottomDockProps {
  pageId: PageId;
  launcherRef: React.RefObject<HTMLButtonElement>;
  className?: string;
}

const BottomDock: React.FC<BottomDockProps> = ({
  pageId,
  launcherRef,
  className = "",
}) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboveFooter, setIsAboveFooter] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  useSpotlightSearch();
  const currentSections = useMemo(() => getDockSections(pageId), [pageId]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setIsScrolling(true);
    scrollToNavSection(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);
    setActiveSection(sectionId);
    setTimeout(() => setIsScrolling(false), 1000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      setIsScrolled(y > 300);
      setIsAboveFooter(y + winH < docH - 200);

      if (isScrolling) return;
      const nextActive = getActiveNavSectionId(
        currentSections.map((section) => section.id),
        y,
      );
      if (nextActive) setActiveSection(nextActive);
    };

    handleScroll();
    const hashSectionId = window.location.hash.replace("#", "");
    if (hashSectionId) {
      scrollToNavSection(hashSectionId);
      setActiveSection(hashSectionId);
    }
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [currentSections, isScrolling]);

  // The dock is in-page section navigation, so it has nothing to offer before
  // the reader has scrolled. It is `fixed bottom-6`, and on a 390x844 phone
  // that puts it directly over the hero's primary call to action, which was
  // swallowing taps meant for the button. Its contents are already gated on
  // `isScrolled`; gate the dock itself on the same thing.
  if (!isScrolled || !isAboveFooter || !shouldShowDock(pageId)) return null;

  const hasNav = currentSections.length > 0;

  return (
    <div
      className={clsx(
        "fixed bottom-6 left-0 right-0 z-[65] flex justify-center px-4 pointer-events-none",
        className,
      )}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
        className={clsx(
          "pointer-events-auto glass ring-1 ring-light-border/40 dark:ring-dark-border/40 shadow-xl rounded-2xl flex items-center gap-0.5 py-2 px-2",
          pageId === "story" && "overflow-x-auto scrollbar-none",
        )}
      >
        {/* Scroll to top — mobile only; tablet+ uses standalone button */}
        <div className="md:hidden">
          <AnimatePresence>
            {isScrolled && (
              <motion.button
                key="scroll-top"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={scrollToTop}
                aria-label={t("common.actions.scrollToTop")}
                title={t("common.actions.scrollToTop")}
                className="group flex items-center justify-center w-8 h-8 rounded-lg hover:bg-light-surface/60 dark:hover:bg-dark-surface/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50 shrink-0 overflow-hidden"
              >
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="w-3.5 h-3.5 text-light-text/70 dark:text-dark-text/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Divider: scroll-top / nav — mobile only */}
        <div className="md:hidden">
          <AnimatePresence>
            {isScrolled && hasNav && (
              <motion.div
                key="div-left"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                transition={{ duration: 0.15 }}
                className="w-px h-5 bg-light-border/60 dark:bg-dark-border/60 shrink-0 mx-1"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Nav section pills */}
        {currentSections.map((section, index) => (
          <React.Fragment key={section.id}>
            {section.actBreakBefore && index > 0 && (
              <div
                className="w-px h-5 bg-light-border/50 dark:bg-dark-border/50 shrink-0 mx-0.5"
                aria-hidden
              />
            )}
            <button
              onClick={() => scrollToSection(section.id)}
              title={t(section.labelKey)}
              aria-label={t(section.labelKey)}
              className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-light-surface/60 dark:hover:bg-dark-surface/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50 ${
                activeSection === section.id
                  ? "glass-2 ring-1 ring-light-border/70 dark:ring-dark-border/60"
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={section.icon}
                className={`w-3.5 h-3.5 transition-all duration-200 ${
                  activeSection === section.id
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-light-text/70 dark:text-dark-text/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                }`}
              />
              <P
                size="sm"
                weight="medium"
                className={`hidden sm:block transition-colors duration-200 ${
                  activeSection === section.id
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-light-text/90 dark:text-dark-text/90 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                }`}
              >
                {t(section.labelKey)}
              </P>
              {activeSection === section.id && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              )}
            </button>
          </React.Fragment>
        ))}

        {/* Divider: nav / chatbot */}
        <div className="w-px h-5 bg-light-border/60 dark:bg-dark-border/60 shrink-0 mx-1" />

        {/* Chatbot toggle */}
        {/*   <motion.button
          ref={launcherRef}
          type="button"
          onClick={() => (showSpotlight ? closeSpotlight() : openSpotlight())}
          aria-expanded={showSpotlight}
          aria-controls="spotlight-chat-panel"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={showSpotlight ? "Close chat" : "Ask Ansu anything"}
          className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50 ${
            showSpotlight
              ? "glass-2 ring-1 ring-indigo-500/40 dark:ring-indigo-400/40"
              : "hover:bg-light-surface/60 dark:hover:bg-dark-surface/50"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {showSpotlight ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 28,
                  mass: 0.6,
                }}
                className="flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
                >
                  <path d="M6.225 4.811L4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586z" />
                </svg>
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 28,
                  mass: 0.6,
                }}
                className="flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-light-text/70 dark:text-dark-text/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                >
                  <path d="M4 4h16v12H7l-3 3V4zm3 5h10v2H7V9zm0-3h10v2H7V6zm0 6h6v2H7v-2z" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
          <P
            size="sm"
            weight="medium"
            className={`hidden sm:block transition-colors duration-200 ${
              showSpotlight
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-light-text/90 dark:text-dark-text/90 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
            }`}
          >
            {showSpotlight ? "Close" : "Ask Ansu"}
          </P>
        </motion.button> */}
      </motion.div>
    </div>
  );
};

export default BottomDock;

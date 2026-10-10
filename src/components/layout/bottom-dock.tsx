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
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { preferredScrollBehavior } from "utils/scroll-behavior";
import { useTranslation } from "react-i18next";
import { P } from "../../tailwind/components/elements/Typography";

interface BottomDockProps {
  pageId: PageId;
  className?: string;
}

const BottomDock: React.FC<BottomDockProps> = ({
  pageId,
  className = "",
}) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboveFooter, setIsAboveFooter] = useState(true);
  // True while a dock click is scrolling, so the scroll listener does not
  // flicker the active item through every section on the way. A ref, not
  // state: it must not re-run the effects below.
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const currentSections = useMemo(() => getDockSections(pageId), [pageId]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: preferredScrollBehavior() });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    isScrollingRef.current = true;
    scrollToNavSection(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);
    setActiveSection(sectionId);
    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  }, []);

  useEffect(() => () => clearTimeout(scrollTimerRef.current), []);

  // A section hash in the URL on arrival: jump to it once per page.
  useEffect(() => {
    const hashSectionId = window.location.hash.replace("#", "");
    if (hashSectionId) {
      scrollToNavSection(hashSectionId);
      setActiveSection(hashSectionId);
    }
  }, [currentSections]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      setIsScrolled(y > 300);
      setIsAboveFooter(y + winH < docH - 200);

      if (isScrollingRef.current) return;
      const nextActive = getActiveNavSectionId(
        currentSections.map((section) => section.id),
        y,
      );
      if (nextActive) setActiveSection(nextActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [currentSections]);

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
      </motion.div>
    </div>
  );
};

export default BottomDock;

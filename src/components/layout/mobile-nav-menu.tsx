import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { getHeaderHref, isHeaderNavActive } from "data/header";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import SocialLinks from "../elements/social-links";
import LanguageToggle from "./language-toggle";
import ThemeToggle from "./theme-toggle";

export interface MobileNavItem {
  name: string;
  url: string;
  highlight?: boolean;
}

interface MobileNavMenuProps {
  navigation: MobileNavItem[];
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Close whenever the route changes (after navigating from a menu link).
  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Avoid an open drawer surviving a resize into the desktop layout.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeMenu]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
          )
        : [];

    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const trigger = triggerRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      (previouslyFocused ?? trigger)?.focus();
    };
  }, [isOpen, closeMenu]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={
          isOpen ? t("a11y.header.closeMenu") : t("a11y.header.openMenu")
        }
        className="relative flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg border border-light-border/55 dark:border-dark-border/40 bg-light-background-alt/80 dark:bg-dark-background-alt/80 shadow-sm hover:border-royal-primary/40 dark:hover:border-royal-primary/50 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { rotate: -45, opacity: 0, scale: 0.6 }
            }
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { rotate: 45, opacity: 0, scale: 0.6 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={isOpen ? faXmark : faBars}
              className="w-4 h-4 text-light-text/80 dark:text-dark-text/80"
            />
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <React.Fragment key="mobile-nav">
            <motion.div
              className="fixed inset-0 z-[70] glass"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-nav-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("a11y.header.mobileMenu")}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, scale: 0.98 }
              }
              transition={{
                duration: prefersReducedMotion ? 0.1 : 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-x-0 top-full z-[71] px-3 pt-2 sm:px-4"
            >
              <div className="glass-2 ring-1 ring-light-border/60 dark:ring-dark-border/50 shadow-xl rounded-2xl p-3 sm:p-4 max-h-[75vh] overflow-y-auto">
                <nav
                  aria-label={t("a11y.header.primaryNavigation")}
                  className="flex flex-col gap-1"
                >
                  {navigation.map((item) => {
                    const href = getHeaderHref(item.url);
                    const active = isHeaderNavActive(
                      location.pathname,
                      item.url,
                    );
                    return (
                      <Link
                        key={item.url}
                        to={href}
                        className={clsx(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 min-h-[44px]",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50",
                          active
                            ? "bg-indigo-50 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-300"
                            : "text-light-text/85 dark:text-dark-text/85 hover:bg-light-surface/70 dark:hover:bg-dark-surface/60",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="flex items-center gap-2">
                          {item.name}
                          {item.highlight && (
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="my-3 h-px bg-light-border/50 dark:bg-dark-border/40" />

                <div className="flex items-center justify-between gap-3 px-1">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>

                <div className="my-3 h-px bg-light-border/50 dark:bg-dark-border/40" />

                <SocialLinks
                  variant="header"
                  spacing="compact"
                  showHashnode={false}
                  className="justify-center gap-4 px-1 pb-1"
                />
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavMenu;

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ScrollToTopButtonProps {
  className?: string;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  className = "",
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const currentScrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (
        currentScrollY > 300 &&
        currentScrollY + windowHeight < documentHeight - 200
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className={clsx(
            "fixed bottom-6 left-6 z-[55]",
            "w-12 h-12 sm:w-14 sm:h-14",
            "surface-card border border-light-border/50 dark:border-dark-border/50",
            "rounded-full hover:bg-light-surface/40 dark:hover:bg-dark-surface/40",
            "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50 dark:focus-visible:ring-royal-primary/40",
            "text-light-text dark:text-dark-text grid place-items-center",
            className,
          )}
          aria-label={t("common.actions.scrollToTop")}
          data-cy="scroll-to-top"
        >
          <FontAwesomeIcon
            icon={faArrowUp}
            className="w-5 h-5 text-light-text dark:text-dark-text"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;

import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import Contact from "pages/Contact";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FOOTER_NAV_LINKS } from "../../data/footer-navigation";
import {
  CHROME_BAR_BORDER_TOP,
  CHROME_BAR_GLASS,
  CHROME_ORB_WARM_A,
  CHROME_ORB_WARM_B,
} from "../../tailwind/styles/chromeBar";
import SocialLinks from "../elements/social-links";
import LanguageToggle from "./language-toggle";

const footerVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const footerItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <>
      <motion.section
        id="contact"
        className="relative scroll-mt-24 bg-light-background dark:bg-dark-background"
        variants={SECTION_VARIANTS}
        initial={false}
        whileInView="visible"
        viewport={SECTION_VIEWPORT}
      >
        <Contact embedded />
      </motion.section>
      <motion.div
        data-cy="composer-dock-root"
        variants={footerVariants}
        initial={false}
        animate="visible"
        className={`relative z-[50] w-full ${CHROME_BAR_GLASS} ${CHROME_BAR_BORDER_TOP}`}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div
            className={`absolute -top-14 left-[8%] h-40 w-40 rounded-full ${CHROME_ORB_WARM_A} blur-3xl opacity-50`}
          />
          <div
            className={`absolute -bottom-16 right-[10%] h-44 w-44 rounded-full ${CHROME_ORB_WARM_B} blur-3xl opacity-40`}
          />
        </div>

        <div className="relative container max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Copyright */}
            <motion.div
              variants={footerItemVariants}
              className="text-sm text-light-text/70 dark:text-dark-text/70 flex items-center gap-2"
            >
              <span>© {currentYear}</span>
              <span className="text-light-text/30 dark:text-dark-text/30">
                •
              </span>
              <span className="font-medium text-light-text/70 dark:text-dark-text/70">
                <Link to="/">Ansumana Darboe</Link>
              </span>
              <span className="text-light-text/30 dark:text-dark-text/30">
                •
              </span>
              <span className="font-medium text-light-text/70 dark:text-dark-text/70">
                {t("footer.allRightsReserved")}
              </span>
            </motion.div>

            {/* Footer navigation */}
            <motion.nav
              variants={footerItemVariants}
              aria-label={t("a11y.footer.navigation")}
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 order-1 sm:order-none"
            >
              {FOOTER_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="inline-flex items-center min-h-[44px] text-sm font-medium text-light-text/75 dark:text-dark-text/75 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50 px-1 py-0.5"
                >
                  {link.labelKey ? t(link.labelKey) : link.label}
                </Link>
              ))}
              {/* <a
                href="/ansumana-darboe-cv.pdf"
                download
                className="text-sm font-medium text-light-text/75 dark:text-dark-text/75 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50 px-1 py-0.5"
              >
                {t("content.contactPage.cvDownloadLabel")}
              </a> */}
            </motion.nav>

            {/* Social Links + Language Toggle */}
            <motion.div
              variants={footerItemVariants}
              className="flex items-center gap-3 order-2 space-y-2 sm:space-y-0"
            >
              <SocialLinks
                variant="footer"
                spacing="compact"
                layout="horizontal"
                showLabels={false}
              />
              <span
                className="h-5 w-px bg-light-border/50 dark:bg-dark-border/40"
                aria-hidden="true"
              />
              <LanguageToggle variant="footer" />
            </motion.div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-light-border/60 dark:via-dark-border/50 to-transparent" />
      </motion.div>
    </>
  );
};

export default Footer;

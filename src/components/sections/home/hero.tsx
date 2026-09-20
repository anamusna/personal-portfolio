import CTAButtons from "components/elements/cta-buttons";
import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { ABOUT_HERO_STYLES } from "data/aboutHeroData";
import { home } from "data/home";
import { homePageContent } from "data/homePage";
import { motion } from "motion/react";
import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HERO_CONFIG, HERO_STYLES } from "../../../data/heroData";
import { personalInfo } from "../../../data/personalInfo";
import {
  PAGE_HEADER_HERO_SUBTITLE,
  PAGE_HEADER_HERO_TITLE,
  PAGE_HEADER_SECTION_EYEBROW,
} from "../../../tailwind/styles/pageHeader";
import { SURFACE_CARD_INTERACTIVE } from "../../../tailwind/styles/surfaceCard";
import { TEXT_MUTED } from "../../../tailwind/styles/textTokens";
import HeroImage from "./hero-image";

const springTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.7,
};

const leftColumnVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...springTransition, delay: 0.1 },
  },
};

const threadsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const threadItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const Hero: React.FC = memo(() => {
  const { t } = useTranslation("ansumana");
  const { identity } = homePageContent;

  const containerClasses = useMemo(
    () =>
      `${ABOUT_HERO_STYLES.CONTAINER_BASE} py-8 md:py-10 lg:py-12 px-2 sm:px-6 md:px-4 lg:px-5`,
    [],
  );

  const gridClasses = useMemo(
    () =>
      `${HERO_STYLES.GRID_WRAPPER} ${HERO_CONFIG.SPACING.GRID_GAP} items-start`,
    [],
  );

  return (
    <div>
      <div className={containerClasses}>
        <div className={gridClasses}>
          <motion.div
            className={`${HERO_STYLES.TEXT_COLUMN} flex flex-col gap-6 lg:gap-8`}
            variants={leftColumnVariants}
            initial={false}
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
          >
            <header className="space-y-3 sm:space-y-4">
              <p className={PAGE_HEADER_SECTION_EYEBROW}>{personalInfo.role}</p>
              <h1 className={`${PAGE_HEADER_HERO_TITLE} text-heading`}>
                {home.heroTitle}
              </h1>
              <p className={`${PAGE_HEADER_HERO_SUBTITLE} max-w-xl`}>
                {home.tagline}
              </p>
            </header>

            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              variants={threadsContainerVariants}
              initial={false}
              whileInView="visible"
              viewport={SECTION_VIEWPORT}
              aria-label={t("a11y.home.identity.domainsAndProjects")}
            >
              {identity.threads.map((thread) => (
                <motion.li key={thread.label} variants={threadItemVariants}>
                  <Link
                    to={thread.href}
                    className={`${SURFACE_CARD_INTERACTIVE} group flex items-start gap-3 p-4 border-violet-200/35 dark:border-violet-500/25 hover:border-indigo-400/50 dark:hover:border-indigo-400/40 min-h-[44px] transition-colors h-full`}
                  >
                    <span
                      className="text-2xl flex-shrink-0 leading-none pt-0.5"
                      aria-hidden
                    >
                      {thread.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm sm:text-base font-semibold text-heading leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {thread.label}
                      </span>
                      <span
                        className={`${TEXT_MUTED} block mt-1 text-xs sm:text-sm leading-relaxed`}
                      >
                        {thread.detail}
                      </span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <CTAButtons
              primaryButton={{
                text: home.hero.cta.primary.text,
                href: home.hero.cta.primary.href,
              }}
              secondaryButton={{
                text: home.hero.cta.secondary.text,
                href: home.hero.cta.secondary.href,
              }}
              colorScheme="default"
              variant="default"
              layout="horizontal"
              spacing="normal"
              showIcons={true}
              glowEffect={false}
              shimmerEffect={false}
              particleEffect={false}
              hoverLift={false}
              animationDelay={false}
              alignment="left"
            />
          </motion.div>

          <motion.div
            className={HERO_STYLES.IMAGE_COLUMN}
            variants={SECTION_VARIANTS}
            initial={false}
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
          >
            <HeroImage
              showStats={false}
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 lg:ml-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";

export default Hero;

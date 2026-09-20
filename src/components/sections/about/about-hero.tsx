import { aboutPageContent } from "data/aboutPage";
import { motion } from "motion/react";
import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ABOUT_HERO_CONFIG,
  ABOUT_HERO_STYLES,
} from "../../../data/aboutHeroData";
import { personalInfo } from "../../../data/personalInfo";
import ansuImage from "../../../images/ansu6-b.webp";
import CTAButtons from "../../elements/cta-buttons";
import HeroHeader from "../../elements/hero-header";
import { PAGE_HEADER_HERO_TITLE } from "../../../tailwind/styles/pageHeader";
import MarkdownRenderer from "../../elements/markdown-renderer";
import Image from "components/image";
import SocialConnectCard from "./social-connect-card";

const HeroTextContent: React.FC = memo(() => {
  const { ctaButtons } = aboutPageContent.hero;
  const backgroundHook = useMemo(
    () =>
      personalInfo.backgroundHook.map((paragraph) => (
        <MarkdownRenderer
          key={paragraph.slice(0, 40)}
          content={paragraph}
          className="text-base lg:text-lg leading-relaxed text-body"
        />
      )),
    [],
  );

  return (
    <motion.div
      className={ABOUT_HERO_STYLES.TEXT_COLUMN}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.05 }}
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {backgroundHook}
      </div>

      <div className="hidden lg:block space-y-4">
        <SocialConnectCard />
        <CTAButtons
          primaryButton={{
            text: ctaButtons.primary.text,
            href: ctaButtons.primary.href,
          }}
          secondaryButton={{
            text: ctaButtons.secondary.text,
            href: ctaButtons.secondary.href,
          }}
          colorScheme="indigo-violet"
          layout="horizontal"
          spacing="normal"
          showIcons={true}
          alignment="left"
          glowEffect={false}
          shimmerEffect={false}
          particleEffect={false}
          hoverLift={false}
        />
      </div>
    </motion.div>
  );
});

HeroTextContent.displayName = "HeroTextContent";

const HeroImageContent: React.FC = memo(() => {
  const { t } = useTranslation("ansumana");

  return (
    <motion.div
      className={ABOUT_HERO_STYLES.IMAGE_COLUMN}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.15 }}
    >
      <div className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl overflow-hidden">
        <Image
          src={ansuImage}
          alt={t("a11y.about.heroImageAlt")}
          objectFit="cover"
          aspectRatio="portrait"
          className="rounded-2xl sm:rounded-3xl"
        />
      </div>
    </motion.div>
  );
});

HeroImageContent.displayName = "HeroImageContent";

const AboutHero: React.FC = memo(() => {
  const sectionClasses = useMemo(
    () =>
      `${ABOUT_HERO_STYLES.SECTION_BASE} ${ABOUT_HERO_CONFIG.HEIGHTS.MIN_SECTION}`,
    [],
  );

  const containerClasses = useMemo(
    () =>
      `${ABOUT_HERO_STYLES.CONTAINER_BASE} ${ABOUT_HERO_CONFIG.SPACING.CONTAINER_PADDING}`,
    [],
  );

  const gridClasses = useMemo(
    () =>
      `${ABOUT_HERO_STYLES.GRID_WRAPPER} ${ABOUT_HERO_CONFIG.SPACING.GRID_GAP}`,
    [],
  );

  const defaultContainerClasses = ABOUT_HERO_STYLES.HEADER_WRAPPER;

  const { hero } = aboutPageContent;
  const { ctaButtons } = hero;

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        <HeroHeader
          alignment="center"
          greeting={hero.greeting}
          title={hero.title}
          containerClassName={defaultContainerClasses}
          titleClassName={`${PAGE_HEADER_HERO_TITLE} text-heading`}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        />

        <div className={gridClasses}>
          <HeroTextContent />
          <HeroImageContent />
        </div>

        <div className="lg:hidden mt-8 space-y-4 mx-auto">
          <SocialConnectCard />
          <CTAButtons
            primaryButton={{
              text: ctaButtons.primary.text,
              href: ctaButtons.primary.href,
            }}
            secondaryButton={{
              text: ctaButtons.secondary.text,
              href: ctaButtons.secondary.href,
            }}
            colorScheme="indigo-violet"
            layout="horizontal"
            spacing="normal"
            fullWidth={true}
            showIcons={true}
            alignment="center"
            glowEffect={false}
            shimmerEffect={false}
            particleEffect={false}
            hoverLift={false}
          />
        </div>
      </div>
    </section>
  );
});

AboutHero.displayName = "AboutHero";

export default AboutHero;

import HeroHeader from "components/elements/hero-header";
import { storyPageContent } from "data/storyPage";
import ansuImage from "images/ansu5-bg.webp";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  PAGE_HEADER_HERO_TITLE,
  PAGE_HEADER_SECTION_EYEBROW,
} from "tailwind/styles/pageHeader";
import { SURFACE_CARD_BASE } from "tailwind/styles/surfaceCard";
import { TEXT_BODY, TEXT_MUTED } from "tailwind/styles/textTokens";

const storyHeroIcon = (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const StoryHero: React.FC = () => {
  const { t } = useTranslation();
  const { eyebrow, title, subtitle, orientationLines, chapterNote } =
    storyPageContent;

  return (
    <div className="max-w-4xl mx-auto text-center">
      <HeroHeader
        greeting={eyebrow}
        title={title}
        subtitle={subtitle}
        alignment="center"
        subtitleClassName="max-w-2xl mx-auto"
        titleClassName={`${PAGE_HEADER_HERO_TITLE} text-heading`}
        greetingClassName={PAGE_HEADER_SECTION_EYEBROW}
        icon={storyHeroIcon}
      />

      <div className="mt-6 sm:mt-8 flex justify-center px-2">
        <div
          className={`${SURFACE_CARD_BASE} w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border border-light-border/55 dark:border-dark-border/40`}
        >
          <img
            src={ansuImage}
            alt={t("a11y.story.heroImageAlt")}
            className="h-full w-full contain"
          />
        </div>
      </div>

      <div className="mt-5 sm:mt-6 max-w-xl mx-auto space-y-2 px-2">
        <p className={`${TEXT_BODY} text-center`}>
          {orientationLines.join(" ")}
        </p>
        <p
          className={`${TEXT_MUTED} text-center text-xs sm:text-sm tracking-wide`}
        >
          {chapterNote}
        </p>
      </div>
    </div>
  );
};

export default StoryHero;

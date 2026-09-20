import HeroHeader from "components/elements/hero-header";
import PageSection from "components/sections/page-section";
import { prayerContent } from "data/personal/prayer-content";
import { motion } from "motion/react";
import React from "react";
import { PAGE_HEADER_HERO_TITLE } from "tailwind/styles/pageHeader";
import { TEXT_BODY } from "tailwind/styles/textTokens";

const prayerLines = prayerContent.split("\n\n");

const prayerHeroIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 21s-6.5-4.35-8.5-8.2A5.3 5.3 0 0 1 7.2 4.5c1.7 0 3 1 3.8 2.1.8-1.1 2.1-2.1 3.8-2.1a5.3 5.3 0 0 1 3.7 8.3C18.5 16.65 12 21 12 21Z"
    />
  </svg>
);

const Prayer: React.FC = () => {
  return (
    <PageSection>
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        <HeroHeader
          greeting="Personal reflection"
          title="Prayer for the road"
          // subtitle="A quiet continuation of the life story"
          alignment="center"
          subtitleClassName="mx-auto max-w-3xl"
          titleClassName={`${PAGE_HEADER_HERO_TITLE} text-heading`}
          icon={prayerHeroIcon}
        />

        {/*   <p
          className={`${TEXT_MUTED} mt-8 max-w-3xl leading-relaxed italic sm:mt-10`}
        >
          {prayerBridge}
        </p>
 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 sm:mt-10 md:mt-12 dark:border-dark-border/40"
        >
          <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
            {prayerLines.map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) {
                return null;
              }

              const isClosing = index === prayerLines.length - 1;

              return (
                <p
                  key={`${trimmed.slice(0, 20)}-${index}`}
                  className={`${TEXT_BODY} ${isClosing ? "font-medium" : ""} whitespace-pre-line`}
                >
                  {trimmed}
                </p>
              );
            })}
          </div>
        </motion.div>
      </div>
    </PageSection>
  );
};

export default Prayer;

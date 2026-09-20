import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { ABOUT_HERO_STYLES } from "data/aboutHeroData";
import { careerPageContent } from "data/careerPage";
import { motion } from "motion/react";
import React, { useMemo } from "react";
import HeroHeader from "../components/elements/hero-header";
import SectionHeader from "../components/elements/section-header";
import CareerImpactStrip from "../components/sections/career/career-impact-strip";
import Journey from "../components/sections/career/career-journey";
import CareerLeadershipStrip from "../components/sections/career/career-leadership-strip";
import CareerNextSteps from "../components/sections/career/career-next-steps";
import CareerPrologue from "../components/sections/career/career-prologue";
import CareerTimeline from "../components/sections/career/career-timeline";
import { PAGE_HEADER_HERO_TITLE } from "../tailwind/styles/pageHeader";

const careerHeroIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Career: React.FC = () => {
  const containerClasses = useMemo(
    () => `${ABOUT_HERO_STYLES.CONTAINER_BASE}`,
    [],
  );
  const { hero, milestones, roles } = careerPageContent;

  return (
    <div className="relative min-h-screen overflow-hidden md:overflow-visible z-10">
      <div className={`relative z-10 ${containerClasses}`}>
        <motion.section
          id="career-hero"
          className="relative py-8 sm:py-12 md:py-16"
          variants={SECTION_VARIANTS}
          initial={false}
          animate="visible"
        >
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-2 sm:mb-4">
              <HeroHeader
                greeting={hero.greeting}
                title={hero.title}
                subtitle={hero.subtitle}
                alignment="center"
                subtitleClassName="mx-auto max-w-3xl"
                titleClassName={`${PAGE_HEADER_HERO_TITLE} text-heading`}
                icon={careerHeroIcon}
              />
            </div>
          </div>
        </motion.section>

        <CareerLeadershipStrip />

        <CareerPrologue />

        <motion.section
          id="career-milestones"
          className="relative scroll-mt-24 py-6 sm:py-8 md:py-12"
          variants={SECTION_VARIANTS}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <div className="container max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 mb-4 sm:mb-6">
            <SectionHeader
              badge={{
                text: milestones.badge,
                icon: (
                  <svg
                    className="w-5 h-5 mr-2 animate-spin"
                    style={{ animationDuration: "4s" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                iconAnimation: false,
              }}
              title={milestones.title}
              description={milestones.description}
              highlightText={milestones.highlightText}
            />
          </div>
          <Journey hideHeader />
        </motion.section>

        <motion.section
          id="career-roles"
          className="relative scroll-mt-24 bg-light-background-alt dark:bg-dark-background-alt pt-6 sm:pt-8 md:pt-12"
          variants={SECTION_VARIANTS}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <div className="container max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 mb-4 sm:mb-6">
            <SectionHeader
              badge={{
                text: roles.badge,
                icon: (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                iconAnimation: false,
              }}
              title={roles.title}
              description={roles.description}
              highlightText={roles.highlightText}
            />
          </div>
          <CareerTimeline hideHeader />
        </motion.section>

        {/* No project-card gallery here: it repeated the same six roles
            already covered by the timeline and role list above, with the
            same card treatment as /projects. CareerNextSteps below already
            sends the reader there for the technical detail per role. */}
        <CareerImpactStrip />
        <CareerNextSteps />
      </div>
    </div>
  );
};

export default Career;

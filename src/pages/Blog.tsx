import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { motion } from "motion/react";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import HeroHeader from "../components/elements/hero-header";
import { PAGE_HEADER_HERO_TITLE } from "../tailwind/styles/pageHeader";
import BlogFilter from "../components/sections/blog/blog-filter";
import BlogGrid from "../components/sections/blog/blog-grid";
import { ABOUT_HERO_CONFIG, ABOUT_HERO_STYLES } from "../data/aboutHeroData";
import { SURFACE_CARD_PANEL } from "../tailwind/styles/surfaceCard";

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  // Ultra-premium micro-interactions
  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <div className={sectionClasses}>
      <div className={`relative ${containerClasses}`}>
        {/* Ultra-premium Header Section */}
        <section id="blog-hero" className="relative overflow-hidden">
          <div className="relative z-10 mx-auto container">
            {/* Ultra-premium Header */}
            <motion.div
              className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              variants={SECTION_VARIANTS}
              initial={false}
              whileInView="visible"
              viewport={SECTION_VIEWPORT}
            >
              <HeroHeader
                greeting={t("pages.blog.hero.greeting")}
                title={t("pages.blog.hero.title")}
                subtitle={t("pages.blog.hero.subtitle")}
                alignment="center"
                subtitleClassName="max-w-3xl mx-auto"
                titleClassName={`${PAGE_HEADER_HERO_TITLE} text-heading`}
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                }
              />
            </motion.div>

            {/* Ultra-premium Filter Section */}
            <motion.div
              id="blog-filters"
              className="relative mb-6 sm:mb-8 lg:mb-10"
              variants={SECTION_VARIANTS}
              initial={false}
              whileInView="visible"
              viewport={SECTION_VIEWPORT}
            >
              <div className="sticky top-4 sm:top-6 z-20">
                <div className={`${SURFACE_CARD_PANEL} p-3 sm:p-4`}>
                  <BlogFilter
                    selectedTags={selectedTags}
                    onTagSelect={handleTagSelect}
                  />
                </div>
              </div>
            </motion.div>

            {/* Ultra-premium Blog Grid Container */}
            <motion.div
              id="blog-grid"
              className="relative"
              variants={SECTION_VARIANTS}
              initial={false}
              whileInView="visible"
              viewport={SECTION_VIEWPORT}
            >
              <div className={`${SURFACE_CARD_PANEL} p-3 sm:p-5`}>
                <h2 className="sr-only">{t("a11y.blog.gridHeading")}</h2>
                <BlogGrid selectedTags={selectedTags} />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;

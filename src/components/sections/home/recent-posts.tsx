import { SECTION_VIEWPORT } from "constants/section-motion";
import { homePageContent } from "data/homePage";
import AnimatedCTAButton from "components/elements/animated-cta-button";
import SectionHeader from "components/elements/section-header";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { blogImages } from "../../../data/blogImages";
import { blogs } from "../../../data/blogs";
import { P } from "../../../tailwind/components/elements/Typography";
import { SURFACE_CARD_INTERACTIVE } from "../../../tailwind/styles/surfaceCard";
import PageSection from "../page-section";

const loadMoreChevronIcon = (
  <svg
    className="w-4 h-4 transform opacity-70 group-hover:opacity-100 transition-opacity duration-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const INITIAL_VISIBLE_COUNT = 3;

const springTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.7,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springTransition },
};

const loadMorePanelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springTransition, delay: 0.05 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

const RecentPosts: React.FC = () => {
  const { writingSection } = homePageContent;
  const { t } = useTranslation("ansumana");
  const prefersReducedMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
  const firstNewCardRef = useRef<HTMLElement>(null);

  const visibleBlogs = useMemo(
    () => blogs.slice(0, visibleCount),
    [visibleCount],
  );

  const hasMore = visibleCount < blogs.length;
  const remainingCount = blogs.length - visibleCount;

  const handleLoadMore = useCallback(() => {
    setHasLoadedMore(true);
    setVisibleCount(blogs.length);

    if (prefersReducedMotion) return;

    requestAnimationFrame(() => {
      firstNewCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [prefersReducedMotion]);

  return (
    <PageSection>
      <SectionHeader
        badge={{
          text: writingSection.badge,
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          ),
          iconAnimation: false,
        }}
        title={writingSection.title}
        description={writingSection.description}
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8"
        variants={containerVariants}
        initial={false}
        whileInView="visible"
        viewport={SECTION_VIEWPORT}
        layout
      >
        <AnimatePresence mode="popLayout">
          {visibleBlogs.map((blog, index) => {
            const isNewlyRevealed =
              hasLoadedMore && index >= INITIAL_VISIBLE_COUNT;

            return (
              <motion.article
                key={blog.id}
                ref={
                  index === INITIAL_VISIBLE_COUNT ? firstNewCardRef : undefined
                }
                layout
                className={`${SURFACE_CARD_INTERACTIVE} rounded-2xl min-h-[360px] sm:min-h-[380px] flex flex-col`}
                variants={!isNewlyRevealed ? cardVariants : undefined}
                initial={
                  isNewlyRevealed && !prefersReducedMotion
                    ? cardVariants.hidden
                    : false
                }
                animate={cardVariants.visible}
                transition={
                  isNewlyRevealed
                    ? {
                        ...springTransition,
                        delay: (index - INITIAL_VISIBLE_COUNT) * 0.08,
                      }
                    : springTransition
                }
              >
                {/* A real link, not a button with a navigate() handler: the
                    post needs a crawlable href, and readers expect
                    middle-click and copy-link. */}
                <Link
                  to={`/blog/${blog.titleSlug}`}
                  className="flex-1 flex flex-col w-full text-left min-h-[44px]"
                >
                  <div className="relative aspect-video overflow-hidden bg-light-elevated dark:bg-dark-surface">
                    <img
                      src={blogImages[blog.coverImage]}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    <div className="absolute top-2 right-2 surface-card rounded-lg px-2.5 py-1 text-sm font-medium text-body border border-light-border/55 dark:border-dark-border/40">
                      {t("pages.blog.cards.readTime", {
                        minutes: blog.readTime,
                      })}
                    </div>
                  </div>

                  <div className="flex-1 p-4 sm:p-5 flex flex-col">
                    <div className="flex flex-wrap gap-1.5 mb-2 sm:mb-3">
                      {blog.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-sm font-medium surface-card text-indigo-600 dark:text-indigo-400 rounded-lg border border-light-border/55 dark:border-dark-border/40 min-h-[28px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-heading mb-2 leading-tight line-clamp-2">
                      {blog.title}
                    </h3>

                    <P className="text-sm sm:text-base text-body mb-3 sm:mb-4 line-clamp-2 leading-relaxed flex-1">
                      {blog.summary}
                    </P>

                    <div className="flex justify-between items-center pt-2 border-t border-light-border/55 dark:border-dark-border/40">
                      <div className="flex items-center gap-1.5 text-sm sm:text-base text-body">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="font-medium">{blog.date}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-sm sm:text-base text-indigo-600 dark:text-indigo-400 font-medium">
                        <span>{t("common.actions.readMore")}</span>
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {hasMore && (
          <motion.div
            key="load-more"
            className="mt-8 sm:mt-12 text-center"
            variants={loadMorePanelVariants}
            initial={false}
            animate="visible"
            exit="exit"
            aria-live="polite"
          >
            <AnimatedCTAButton
              as="button"
              text={t("pages.blog.cards.loadMore", { count: remainingCount })}
              onClick={handleLoadMore}
              colorScheme="indigo-violet"
              size="sm"
              showIcon={true}
              iconPosition="right"
              customIcon={loadMoreChevronIcon}
              ariaLabel={t("pages.blog.cards.loadMoreAria", {
                count: remainingCount,
              })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageSection>
  );
};

export default RecentPosts;

import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { P } from "tailwind/components/elements/Typography";
import { TEXT_DETAIL_SECTION_TITLE } from "tailwind/styles/textTokens";
import { SURFACE_CARD_ICON, SURFACE_CARD_INTERACTIVE } from "tailwind/styles/surfaceCard";
import { blogImages } from "data/blogImages";
import { blogs } from "data/blogs";

type BlogPost = (typeof blogs)[number];

type BlogSimilarPostsProps = {
  similarBlogs: BlogPost[];
  onSimilarBlogClick: (blog: BlogPost) => void;
};

export const BlogSimilarPosts: React.FC<BlogSimilarPostsProps> = ({
  similarBlogs,
  onSimilarBlogClick,
}) => {
  const { t } = useTranslation();

  if (similarBlogs.length === 0) {
    return null;
  }

  return (
    <motion.section
      variants={SECTION_VARIANTS}
      initial={false}
      whileInView="visible"
      viewport={SECTION_VIEWPORT}
      className="relative py-8 sm:py-12 md:py-16 bg-white/20 dark:bg-gray-800/20"
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <div className={`${SURFACE_CARD_ICON} w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4`}>
            <span className="text-2xl sm:text-3xl" aria-hidden="true">
              📚
            </span>
          </div>
          <h2 className={`${TEXT_DETAIL_SECTION_TITLE} mb-3`}>
            {t("features.blogDetails.similar.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto">
            {t("features.blogDetails.similar.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {similarBlogs.map((blog, index) => (
            <article
              key={blog.id}
              className={`${SURFACE_CARD_INTERACTIVE} rounded-2xl overflow-hidden min-h-[360px] sm:min-h-[380px] flex flex-col`}
            >
              <button
                type="button"
                onClick={() => onSimilarBlogClick(blog)}
                className="flex-1 flex flex-col min-h-[44px] w-full text-left"
              >
                <div className="relative aspect-video overflow-hidden bg-light-elevated dark:bg-dark-surface">
                  <img
                    src={blogImages[blog.coverImage]}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute top-2 right-2 surface-card rounded-lg px-2.5 py-1 text-sm font-medium text-body border border-light-border/55 dark:border-dark-border/40">
                    {t("pages.blog.cards.readTime", { minutes: blog.readTime })}
                  </div>
                </div>

                <div className="flex-1 p-4 sm:p-5 flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-2 sm:mb-3">
                    {blog.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-sm font-medium surface-card text-emerald-600 dark:text-emerald-400 rounded-lg border border-light-border/55 dark:border-dark-border/40 min-h-[28px]"
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
              </button>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import BlogContent from "components/sections/blog/blog-content";
import { blogs } from "data/blogs";
import { SURFACE_CARD_PANEL } from "tailwind/styles/surfaceCard";

type BlogPost = (typeof blogs)[number];

type BlogDetailsArticleProps = {
  blogPost: BlogPost;
};

export const BlogDetailsArticle: React.FC<BlogDetailsArticleProps> = ({
  blogPost,
}) => {
  const { t } = useTranslation();

  return (
    <motion.section
    variants={SECTION_VARIANTS}
    initial={false}
    whileInView="visible"
    viewport={SECTION_VIEWPORT}
    className="relative"
  >
    <div className="container relative z-10 mx-auto px-4">
      {blogPost.tags && blogPost.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
          {blogPost.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-sm font-medium surface-card text-emerald-600 dark:text-emerald-400 rounded-lg border border-light-border/55 dark:border-dark-border/40"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className={`${SURFACE_CARD_PANEL} rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-light-border/55 dark:border-dark-border/40`}>
        <BlogContent content={blogPost.content} />

        <div className="mt-6 pt-4 border-t border-light-border/55 dark:border-dark-border/40">
          <div className="text-center">
            <a
              href={blogPost.slug}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-sm"
            >
              <span>{t("features.blogDetails.article.readFullOnHashnode")}</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    </motion.section>
  );
};

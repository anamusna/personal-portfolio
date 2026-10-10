import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import BlogImage from "components/sections/blog/blog-image";
import ansuImage from "images/ansu-avatar.webp";
import { blogs } from "data/blogs";
import { PAGE_HEADER_HERO_TITLE } from "tailwind/styles/pageHeader";

type BlogPost = (typeof blogs)[number];

type BlogDetailsIntroProps = {
  blogPost: BlogPost;
};

const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  // Dates are stored as plain days ("2024-05-18"), which parse as UTC
  // midnight. Formatting in UTC keeps the day stable in every timezone and
  // identical to the prerendered HTML.
  return date.toLocaleDateString(locale.startsWith("de") ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

export const BlogDetailsIntro: React.FC<BlogDetailsIntroProps> = ({
  blogPost,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <>
    <motion.section
      variants={SECTION_VARIANTS}
      initial={false}
      whileInView="visible"
      viewport={SECTION_VIEWPORT}
      className="relative py-4 sm:py-6 overflow-hidden"
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center space-y-3 sm:space-y-4">

          <div className="space-y-2">
            <h1 className={`${PAGE_HEADER_HERO_TITLE} text-heading`}>
              {blogPost.title}
            </h1>
          </div>
        </div>
      </div>
    </motion.section>

    <motion.section
      variants={SECTION_VARIANTS}
      initial={false}
      whileInView="visible"
      viewport={SECTION_VIEWPORT}
      className="relative py-2 bg-white/30 dark:bg-gray-800/30"
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-light-border/50 dark:border-dark-border/40 shadow-sm">
              {/* Decorative: the author's name is right next to it. */}
              <img
                src={ansuImage}
                alt=""
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-heading">
                {blogPost.author.name}
              </p>
              <p className="text-sm text-muted">
                {t("features.blogDetails.intro.author")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-center">
              <p className="text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-400">
                {formatDate(blogPost.date, i18n.language)}
              </p>
              <p className="text-sm text-muted">
                {t("features.blogDetails.intro.published")}
              </p>
            </div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
            <div className="text-center">
              <p className="text-sm sm:text-base font-bold text-teal-700 dark:text-teal-400">
                {`${blogPost.readTime} min`}
              </p>
              <p className="text-sm text-muted">
                {t("features.blogDetails.intro.readTime")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>

    <motion.section
      variants={SECTION_VARIANTS}
      initial={false}
      whileInView="visible"
      viewport={SECTION_VIEWPORT}
      className="relative py-4 bg-white/20 dark:bg-gray-800/20"
    >
      <div className="container relative z-10 mx-auto px-4">
        <BlogImage blog={blogPost} />
      </div>
    </motion.section>
    </>
  );
};

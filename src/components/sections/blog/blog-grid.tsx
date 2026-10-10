import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { blogs } from "../../../data/blogs";
import BlogCard from "./blog-card";

interface BlogGridProps {
  selectedTags: string[];
  onClearFilters: () => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  selectedTags,
  onClearFilters,
}) => {
  const { t } = useTranslation();
  // Filter blogs based on selected tags
  const filteredBlogs = useMemo(() => {
    if (selectedTags.length === 0) return blogs;

    return blogs.filter((blog) => {
      // Check if blog has any of the selected tags
      return selectedTags.some((tag) =>
        blog.tags?.some(
          (blogTag) => blogTag.toLowerCase() === tag.toLowerCase(),
        ),
      );
    });
  }, [selectedTags]);

  return (
    <div className="relative">
      {/* Enhanced Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {filteredBlogs.map((blog, index) => (
          <div
            key={blog.id}
            className=""
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="surface-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-light-border/55 dark:border-dark-border/40 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl border border-light-border/55 dark:border-dark-border/40 mb-4 sm:mb-6">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-heading mb-2 sm:mb-3">
            {t("pages.blog.empty.title")}
          </h3>
          <p className="text-sm sm:text-base text-muted leading-relaxed mb-4 sm:mb-6">
            {t("pages.blog.empty.description")}
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center px-4 py-3 min-h-[44px] rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-sm sm:text-base transition-colors"
          >
            {t("pages.blog.filters.reset")}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;

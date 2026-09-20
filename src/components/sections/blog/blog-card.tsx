import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { blogImages } from "../../../data/blogImages";
import Icon from "../../../tailwind/components/elements/Icon";
import { SURFACE_CARD_INTERACTIVE } from "../../../tailwind/styles/surfaceCard";
import { Blog } from "../../../types/blog";
import { devWarn } from "../../../utils/logger";

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, className = "" }) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const blogImage = blogImages[blog.coverImage];

  if (!blogImage && !imageError) {
    devWarn(`No image found for: ${blog.coverImage}`);
  }

  return (
    <article
      className={clsx(
        SURFACE_CARD_INTERACTIVE,
        "rounded-2xl overflow-hidden",
        className,
      )}
    >
      {/* A real link, not a button with a navigate() handler: the post needs a
          crawlable href, and readers expect middle-click and copy-link. */}
      <Link to={`/blog/${blog.titleSlug}`} className="block w-full text-left">
        <div className="relative aspect-video overflow-hidden bg-light-elevated dark:bg-dark-surface">
          <img
            src={imageError ? blogImages["react.png"] : blogImage}
            alt={blog.title}
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={() => {
              devWarn(`Failed to load image: ${blog.coverImage}`);
              setImageError(true);
            }}
          />
        </div>

        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium text-primary-light dark:text-primary-dark
                         bg-primary-light/10 dark:bg-primary-dark/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-3 text-heading">
            {blog.title}
          </h3>

          <p className="text-muted mb-4 line-clamp-2">
            {blog.summary}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Icon
                icon={faCalendar}
                size="sm"
                className="text-primary-light/70 dark:text-primary-dark/70"
              />
              {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <Icon
                icon={faClock}
                size="sm"
                className="text-primary-light/70 dark:text-primary-dark/70"
              />
              {t("pages.blog.cards.readTime", { minutes: blog.readTime })}
            </span>
          </div>

          <div className="mt-4 text-primary-light dark:text-primary-dark font-medium">
            {t("common.actions.readMore")}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;

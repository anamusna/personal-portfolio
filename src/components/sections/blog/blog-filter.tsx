import clsx from "clsx";
import {
  faBolt,
  faChevronDown,
  faCode,
  faGlobe,
  faLaptop,
  faServer,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../../tailwind/components/elements/Icon";

interface BlogFilterProps {
  selectedTags: string[];
  onTagSelect: (tags: string[]) => void;
}

interface FilterTag {
  id: string;
  label: string;
  icon: any;
  category: "topic" | "tech" | "type";
}

const BlogFilter: React.FC<BlogFilterProps> = ({
  selectedTags,
  onTagSelect,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<
    "topic" | "tech" | "type" | null
  >(null);

  const allTags: FilterTag[] = [
    // Topics
    {
      id: "React",
      label: t("pages.blog.filters.tags.react"),
      icon: faCode,
      category: "topic",
    },
    {
      id: "Node.js",
      label: t("pages.blog.filters.tags.node"),
      icon: faServer,
      category: "topic",
    },
    {
      id: "TypeScript",
      label: t("pages.blog.filters.tags.typescript"),
      icon: faCode,
      category: "topic",
    },

    // Technologies
    {
      id: "Docker",
      label: t("pages.blog.filters.tags.docker"),
      icon: faTools,
      category: "tech",
    },
    {
      id: "Kubernetes",
      label: t("pages.blog.filters.tags.kubernetes"),
      icon: faTools,
      category: "tech",
    },
    {
      id: "Redux",
      label: t("pages.blog.filters.tags.redux"),
      icon: faCode,
      category: "tech",
    },
    {
      id: "Microservices",
      label: t("pages.blog.filters.tags.microservices"),
      icon: faServer,
      category: "tech",
    },

    // Types
    {
      id: "Performance Optimization",
      label: t("pages.blog.filters.tags.performance"),
      icon: faBolt,
      category: "type",
    },
    {
      id: "Virtual DOM",
      label: t("pages.blog.filters.tags.virtualDom"),
      icon: faGlobe,
      category: "type",
    },
    {
      id: "Components",
      label: t("pages.blog.filters.tags.components"),
      icon: faLaptop,
      category: "type",
    },
  ];

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagSelect(selectedTags.filter((t) => t !== tagId));
    } else {
      onTagSelect([...selectedTags, tagId]);
    }
  };

  const clearFilters = () => {
    onTagSelect([]);
    setIsOpen(false);
  };

  const filtersByCategory = (category: "topic" | "tech" | "type") => {
    return allTags.filter((tag) => tag.category === category);
  };

  const toggleCategory = (category: "topic" | "tech" | "type") => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const getSelectedTagsForCategory = (category: "topic" | "tech" | "type") => {
    return selectedTags.filter((tagId) =>
      allTags.some((tag) => tag.id === tagId && tag.category === category)
    );
  };

  return (
    <div className="relative">
      {/* Enhanced Filter Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-between w-full text-lg sm:text-xl font-bold text-heading hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors min-h-[44px]"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 surface-card rounded-lg border border-light-border/55 dark:border-dark-border/40 flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
            </div>
            <span className="leading-tight">{t("pages.blog.filters.title")}</span>
          </div>
          <Icon
            icon={faChevronDown}
            size="sm"
            className={`transition-all duration-500 ${
              isOpen
                ? "transform rotate-180 text-indigo-600 dark:text-indigo-400"
                : ""
            }`}
          />
        </button>

        {selectedTags.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 text-sm font-semibold surface-card rounded-full border border-light-border/55 dark:border-dark-border/40 text-heading">
                {selectedTags.length}
              </span>
              <span className="text-sm font-medium text-muted">
                {t("pages.blog.filters.activeCount", {
                  count: selectedTags.length,
                })}
              </span>
            </div>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg surface-card border border-light-border/55 dark:border-dark-border/40 text-body hover:text-heading font-semibold text-sm transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{t("pages.blog.filters.clearAll")}</span>
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Filter Categories */}
      {isOpen && (
        <div className="surface-card rounded-2xl p-2.5 sm:p-3 border border-light-border/55 dark:border-dark-border/40 mt-2">
          <div className="space-y-2.5 sm:space-y-3">
            {/* Topics */}
            <FilterCategory
              title={t("pages.blog.filters.byTopic")}
              category="topic"
              icon={faCode}
              isOpen={openCategory === "topic"}
              onToggle={() => toggleCategory("topic")}
              selectedCount={getSelectedTagsForCategory("topic").length}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 pt-1.5 sm:pt-2">
                {filtersByCategory("topic").map((tag) => (
                  <FilterButton
                    key={tag.id}
                    tag={tag}
                    isSelected={selectedTags.includes(tag.id)}
                    onClick={() => toggleTag(tag.id)}
                  />
                ))}
              </div>
            </FilterCategory>

            {/* Technologies */}
            <FilterCategory
              title={t("pages.blog.filters.byTechnology")}
              category="tech"
              icon={faTools}
              isOpen={openCategory === "tech"}
              onToggle={() => toggleCategory("tech")}
              selectedCount={getSelectedTagsForCategory("tech").length}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 pt-1.5 sm:pt-2">
                {filtersByCategory("tech").map((tag) => (
                  <FilterButton
                    key={tag.id}
                    tag={tag}
                    isSelected={selectedTags.includes(tag.id)}
                    onClick={() => toggleTag(tag.id)}
                  />
                ))}
              </div>
            </FilterCategory>

            {/* Types */}
            <FilterCategory
              title={t("pages.blog.filters.byType")}
              category="type"
              icon={faBolt}
              isOpen={openCategory === "type"}
              onToggle={() => toggleCategory("type")}
              selectedCount={getSelectedTagsForCategory("type").length}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 pt-1.5 sm:pt-2">
                {filtersByCategory("type").map((tag) => (
                  <FilterButton
                    key={tag.id}
                    tag={tag}
                    isSelected={selectedTags.includes(tag.id)}
                    onClick={() => toggleTag(tag.id)}
                  />
                ))}
              </div>
            </FilterCategory>
          </div>

        </div>
      )}
    </div>
  );
};

interface FilterCategoryProps {
  title: string;
  category: "topic" | "tech" | "type";
  icon: any;
  isOpen: boolean;
  onToggle: () => void;
  selectedCount: number;
  children: React.ReactNode;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  title,
  category,
  icon,
  isOpen,
  onToggle,
  selectedCount,
  children,
}) => (
  <div className="relative border-b border-light-border/55 dark:border-dark-border/40 last:border-0 pb-2.5 sm:pb-3 last:pb-0">
    <button
      type="button"
      onClick={onToggle}
      className="group flex items-center justify-between w-full text-left p-2 rounded-lg hover:bg-light-elevated/50 dark:hover:bg-dark-surface/50 transition-colors min-h-[44px]"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 surface-card border border-light-border/55 dark:border-dark-border/40 rounded-lg flex items-center justify-center">
          <Icon
            icon={icon}
            size="sm"
            className="text-indigo-600 dark:text-indigo-400 w-3 h-3"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
          <h3 className="text-sm sm:text-base font-bold text-heading leading-tight">
            {title}
          </h3>
          {selectedCount > 0 && (
            <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-semibold surface-card rounded-full border border-light-border/55 dark:border-dark-border/40 text-heading">
              {selectedCount}
            </span>
          )}
        </div>
      </div>
      <Icon
        icon={faChevronDown}
        size="sm"
        className={`transition-all duration-500 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 w-2.5 h-2.5 sm:w-3 sm:h-3 ${
          isOpen ? "transform rotate-180" : ""
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {children}
    </div>
  </div>
);

interface FilterButtonProps {
  tag: FilterTag;
  isSelected: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  tag,
  isSelected,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      "flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap",
      "min-h-[44px] text-sm font-semibold border",
      isSelected
        ? "bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500"
        : "surface-card border-light-border/55 dark:border-dark-border/40 text-body hover:text-heading",
    )}
  >
    <Icon
      icon={tag.icon}
      size="sm"
      className={`w-3 h-3 flex-shrink-0 ${
        isSelected ? "text-white" : "text-indigo-600 dark:text-indigo-400"
      }`}
    />
    <span className="font-semibold leading-tight">{tag.label}</span>
  </button>
);

export default BlogFilter;

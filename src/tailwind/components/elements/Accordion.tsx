import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React, { useState } from "react";
import MarkdownRenderer from "../../../components/elements/markdown-renderer";
import { useEnvironmentSettings } from "../../../context/EnvironmentContext";
import { AccordionProps } from "../../../tailwind/types/elements/accordion";
import Icon from "./Icon";

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenItems = [],
  size = "md",
  theme = "light",
  variant = "default",
  className = "",
  itemClassName = "",
  headerClassName = "",
  contentClassName = "",
  onItemToggle,
}) => {
  const { fontSize } = useEnvironmentSettings();
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems);

  const handleToggle = (itemId: string) => {
    const isCurrentlyOpen = openItems.includes(itemId);
    let newOpenItems: string[];

    if (allowMultiple) {
      newOpenItems = isCurrentlyOpen
        ? openItems.filter((id) => id !== itemId)
        : [...openItems, itemId];
    } else {
      newOpenItems = isCurrentlyOpen ? [] : [itemId];
    }

    setOpenItems(newOpenItems);
    onItemToggle?.(itemId, !isCurrentlyOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent, itemId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle(itemId);
    }
  };

  const sizeStyles = {
    sm: {
      header: "p-3 text-sm",
      content: "p-3 text-sm",
      icon: "w-4 h-4",
    },
    md: {
      header: "p-4 text-base",
      content: "p-4 text-base",
      icon: "w-5 h-5",
    },
    lg: {
      header: "p-5 text-lg",
      content: "p-5 text-lg",
      icon: "w-6 h-6",
    },
  };

  const themeColors = {
    light: {
      default: {
        item: "bg-white border border-gray-200",
        header: "text-gray-900 hover:bg-gray-50",
        content: "text-gray-900 bg-gray-50",
        border: "border-gray-200",
      },
      bordered: {
        item: "bg-white border border-gray-300",
        header: "text-gray-900 hover:bg-gray-50 border-b border-gray-200",
        content: "text-gray-900 bg-white",
        border: "border-gray-300",
      },
      modern: {
        item: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md",
        header:
          "text-heading hover:bg-gray-50/50 dark:hover:bg-gray-700/50",
        content:
          "text-body bg-gray-50/50 dark:bg-gray-800/50",
        border: "border-gray-200 dark:border-gray-700",
      },
      minimal: {
        item: "bg-transparent border-0",
        header: "text-gray-900 hover:bg-gray-100",
        content: "text-gray-900 bg-transparent",
        border: "border-0",
      },
    },
    dark: {
      default: {
        item: "bg-gray-800 border border-gray-700",
        header: "text-white hover:bg-gray-700",
        content: "text-white bg-gray-700",
        border: "border-gray-700",
      },
      bordered: {
        item: "bg-gray-800 border border-gray-600",
        header: "text-white hover:bg-gray-700 border-b border-gray-600",
        content: "text-white bg-gray-800",
        border: "border-gray-600",
      },
      modern: {
        item: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md",
        header:
          "text-heading hover:bg-gray-50/50 dark:hover:bg-gray-700/50",
        content:
          "text-body bg-gray-50/50 dark:bg-gray-800/50",
        border: "border-gray-200 dark:border-gray-700",
      },
      minimal: {
        item: "bg-transparent border-0",
        header: "text-white hover:bg-gray-800",
        content: "text-white bg-transparent",
        border: "border-0",
      },
    },
  };

  const currentSize = sizeStyles[fontSize || size];
  const currentTheme = themeColors[theme][variant];

  return (
    <div className={clsx("accordion-container", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        const isDisabled = item.disabled;

        return (
          <div
            key={item.id}
            className={clsx(
              "accordion-item transition-all duration-300",
              currentTheme.item,
              currentTheme.border,
              "rounded-xl mb-3 last:mb-0",
              isDisabled && "opacity-50 cursor-not-allowed",
              isOpen &&
                "shadow-md ring-1 ring-blue-200/50 dark:ring-blue-700/30",
              itemClassName
            )}
          >
            <button
              className={clsx(
                "accordion-header w-full text-left flex items-center justify-between transition-all duration-300 rounded-xl",
                currentSize.header,
                currentTheme.header,
                isDisabled && "cursor-not-allowed",
                isOpen && "bg-gray-50/50 dark:bg-gray-700/30",
                headerClassName
              )}
              onClick={() => !isDisabled && handleToggle(item.id)}
              onKeyDown={(e) => !isDisabled && handleKeyDown(e, item.id)}
              disabled={isDisabled}
              aria-expanded={isOpen}
              id={`accordion-header-${item.id}`}
              aria-controls={`accordion-content-${item.id}`}
              type="button"
              tabIndex={isDisabled ? -1 : 0}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <div
                    className={clsx(
                      "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                      isOpen
                        ? "bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-800/40 dark:to-indigo-800/40 scale-105"
                        : "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30"
                    )}
                  >
                    <Icon
                      icon={item.icon}
                      className={clsx(
                        currentSize.icon,
                        "transition-colors duration-300",
                        isOpen
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-blue-600 dark:text-blue-400"
                      )}
                      fixedWidth
                    />
                  </div>
                )}
                <span
                  className={clsx(
                    "font-semibold text-left transition-colors duration-300",
                    isOpen
                      ? "text-heading"
                      : "text-body"
                  )}
                >
                  {item.question}
                </span>
              </div>
              <div
                className={clsx(
                  "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                  isOpen
                    ? "bg-blue-100 dark:bg-blue-900/30 scale-105"
                    : "bg-gray-100 dark:bg-gray-700"
                )}
              >
                <Icon
                  icon={isOpen ? faChevronUp : faChevronDown}
                  className={clsx(
                    currentSize.icon,
                    "transition-all duration-300",
                    isOpen
                      ? "text-blue-600 dark:text-blue-400 transform rotate-0"
                      : "text-gray-500 dark:text-gray-400 transform rotate-0"
                  )}
                  fixedWidth
                />
              </div>
            </button>

            {/* Animating grid rows from 0fr to 1fr opens the panel to its
                real height (max-height capped long answers). A closed panel
                is inert: out of the tab order and the accessibility tree. */}
            <div
              className={clsx(
                "accordion-content grid transition-[grid-template-rows,opacity] duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
              {...(isOpen ? {} : ({ inert: "" } as object))}
            >
              <div
                id={`accordion-content-${item.id}`}
                // No padding here: padding would keep a closed panel open by
                // its own height.
                className="min-h-0 overflow-hidden"
                role="region"
                aria-labelledby={`accordion-header-${item.id}`}
              >
                <div
                  className={clsx(
                    "rounded-b-xl",
                    currentSize.content,
                    currentTheme.content,
                    contentClassName
                  )}
                >
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {typeof item.answer === "string" ? (
                      <MarkdownRenderer content={item.answer} />
                    ) : (
                      item.answer
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;

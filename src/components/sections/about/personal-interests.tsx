import { interests, interestsSection } from "data/about/interests";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { SURFACE_CARD_ICON, SURFACE_CARD_INTERACTIVE } from "../../../tailwind/styles/surfaceCard";
import { TEXT_CARD_TITLE } from "../../../tailwind/styles/textTokens";
import SectionHeader from "../../elements/section-header";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 28,
      mass: 0.7,
    },
  },
};

const PersonalInterests: React.FC = () => {
  const [expandedInterest, setExpandedInterest] = useState<string | null>(null);

  const getCategoryBorder = (category: string = "personal") => {
    const borders = {
      technical:
        "border-blue-200/45 dark:border-blue-500/25 hover:border-blue-400/50 dark:hover:border-blue-400/40",
      creative:
        "border-purple-200/45 dark:border-purple-500/25 hover:border-purple-400/50 dark:hover:border-purple-400/40",
      personal:
        "border-emerald-200/45 dark:border-emerald-500/25 hover:border-emerald-400/50 dark:hover:border-emerald-400/40",
      professional:
        "border-amber-200/45 dark:border-amber-500/25 hover:border-amber-400/50 dark:hover:border-amber-400/40",
    };
    return borders[category as keyof typeof borders] || borders.personal;
  };

  const toggleExpansion = (title: string) => {
    setExpandedInterest(expandedInterest === title ? null : title);
  };

  return (
    <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="container max-w-7xl relative z-10 mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <SectionHeader
          badge={{
            text: interestsSection.badge,
            icon: (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            ),
            iconAnimation: false,
          }}
          title={interestsSection.title}
          description={interestsSection.description}
          highlightText={interestsSection.highlightText}
        />

        {/* Compact Interests Grid */}
        <motion.div
          variants={containerVariants}
          initial={false}
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 xl:gap-6"
        >
          {interests.map((interest) => {
            const isExpanded = expandedInterest === interest.title;
            const hasExpandedContent =
              Boolean(interest.details) ||
              Boolean(interest.relatedSkills?.length);

            return (
              <motion.div
                key={interest.title}
                variants={cardVariants}
                className={`${SURFACE_CARD_INTERACTIVE} relative flex flex-col ${getCategoryBorder(
                  interest.category,
                )} ${hasExpandedContent ? "cursor-pointer" : ""}`}
                onClick={
                  hasExpandedContent
                    ? () => toggleExpansion(interest.title)
                    : undefined
                }
                role={hasExpandedContent ? "button" : undefined}
                tabIndex={hasExpandedContent ? 0 : undefined}
                aria-expanded={hasExpandedContent ? isExpanded : undefined}
                onKeyDown={
                  hasExpandedContent
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleExpansion(interest.title);
                        }
                      }
                    : undefined
                }
              >
                <div className="flex items-start gap-2.5 sm:gap-3 lg:gap-4 mb-2.5 sm:mb-3 lg:mb-4 p-3 sm:p-4 lg:p-5 pb-0">
                  <div
                    className={`${SURFACE_CARD_ICON} w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center flex-shrink-0`}
                    style={{ minHeight: "40px", minWidth: "40px" }}
                  >
                    <span className="text-base sm:text-lg lg:text-xl" aria-hidden="true">
                      {interest.emoji}
                    </span>
                  </div>

                  <div className="flex-1 flex justify-between items-start gap-1.5 sm:gap-2 min-w-0">
                    <h3 className={`${TEXT_CARD_TITLE} leading-tight min-w-0`}>
                      {interest.title}
                    </h3>
                    {hasExpandedContent ? (
                      <button
                        type="button"
                        aria-label={
                          isExpanded
                            ? `Collapse ${interest.title}`
                            : `Expand ${interest.title}`
                        }
                        className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-lg surface-card border border-light-border/55 dark:border-dark-border/40 hover:text-heading transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpansion(interest.title);
                        }}
                      >
                        <motion.svg
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 26,
                          }}
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Description */}
                <div className="px-3 sm:px-4 lg:px-5 mb-2.5 sm:mb-3">
                  <p className="text-body text-sm sm:text-base lg:text-base leading-relaxed font-medium group-hover:text-heading transition-colors duration-400">
                    {interest.description}
                  </p>
                </div>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && hasExpandedContent && (
                    <motion.div
                      key={`${interest.title}-details`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                        mass: 0.6,
                      }}
                      className="overflow-hidden px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5"
                    >
                      {interest.details && (
                        <div className="mb-2.5 sm:mb-3 lg:mb-4">
                          <p className="text-sm sm:text-base text-body leading-relaxed surface-card p-2.5 sm:p-3 rounded-lg border border-light-border/55 dark:border-dark-border/40">
                            {interest.details}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalInterests;

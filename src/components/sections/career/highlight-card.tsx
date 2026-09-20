import { CareerHighlight } from "data/experiences";
import { projectCardImages, projects } from "data/projects";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getCaseStudyLink } from "utils/get-case-study-link";
import MarkdownRenderer from "components/elements/markdown-renderer";
import {
  getHighlightToneSlot,
  HIGHLIGHT_SURFACE_BORDERS,
  HIGHLIGHT_SURFACE_HOVER_BORDERS,
} from "constants/highlight-surface-tones";
import {
  SURFACE_CARD_BASE,
  SURFACE_CARD_ICON,
  SURFACE_CARD_INTERACTIVE,
} from "tailwind/styles/surfaceCard";
import {
  TEXT_BODY,
  TEXT_CARD_TITLE,
  TEXT_MUTED,
} from "tailwind/styles/textTokens";

interface HighlightCardProps {
  highlight: CareerHighlight;
  index?: number;
  toneIndex?: number;
  shouldAnimate?: boolean;
  animationDelay?: number;
  className?: string;
  maxMetrics?: number;
  showTechnologies?: boolean;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  highlight,
  index = 0,
  toneIndex,
  shouldAnimate = false,
  animationDelay = 0,
  className = "",
  maxMetrics = 4,
  showTechnologies = true,
}) => {
  const { t } = useTranslation("ansumana");
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);

  const toneSlot = getHighlightToneSlot(toneIndex);

  const getCardClasses = () => {
    const layoutClasses =
      "relative flex flex-col will-change-transform transition-all duration-500";

    const defaultSurface = shouldAnimate
      ? SURFACE_CARD_INTERACTIVE
      : SURFACE_CARD_BASE;

    const tonalSurface =
      toneSlot === null
        ? defaultSurface
        : [
            shouldAnimate ? SURFACE_CARD_INTERACTIVE : SURFACE_CARD_BASE,
            "bg-white dark:bg-dark-surface",
            HIGHLIGHT_SURFACE_BORDERS[toneSlot],
            HIGHLIGHT_SURFACE_HOVER_BORDERS[toneSlot],
          ].join(" ");

    const animationClasses = "";

    return `${layoutClasses} ${tonalSurface} ${animationClasses} ${className}`;
  };

  const linkedProject = highlight.projectId
    ? projects.find((p) => p.id === highlight.projectId)
    : undefined;

  const imageKey =
    linkedProject?.image ??
    (highlight.projectId && projectCardImages[highlight.projectId]
      ? highlight.projectId
      : undefined);

  const projectImageSrc =
    imageKey && projectCardImages[imageKey]
      ? projectCardImages[imageKey]
      : undefined;

  const caseStudyLink = (() => {
    const source = {
      id: highlight.projectId ?? highlight.id,
      hasDetailLink: highlight.hasDetailLink,
      caseStudyHref: highlight.caseStudyHref ?? linkedProject?.caseStudyHref,
      caseStudyLinkLabel:
        highlight.caseStudyLinkLabel ?? linkedProject?.caseStudyLinkLabel,
    };

    return getCaseStudyLink(source);
  })();

  const viewCaseStudyButtonClass =
    "w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium rounded-lg min-h-[44px] touch-manipulation";

  return (
    <article
      className={getCardClasses()}
      style={{
        animationDelay: shouldAnimate ? `${animationDelay}ms` : "0ms",
      }}
    >
      {projectImageSrc && caseStudyLink && (
        <Link
          to={caseStudyLink.href}
          className="relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded-t-xl sm:rounded-t-2xl"
          aria-label={
            linkedProject
              ? t("a11y.career.viewProject", { title: linkedProject.title })
              : t("a11y.career.viewProjectDetails", { title: highlight.title })
          }
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={projectImageSrc}
              alt=""
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover ${
                shouldAnimate
                  ? "transition-transform duration-300 group-hover:scale-105"
                  : ""
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />

            {linkedProject && (
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex justify-between gap-2 text-white pointer-events-none">
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 surface-card rounded-full text-xs sm:text-sm font-medium text-heading border border-light-border/55 dark:border-dark-border/40 truncate max-w-[48%]">
                  {linkedProject.metrics?.primary ?? t("common.status.notAvailable")}
                </span>
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 surface-card rounded-full text-xs sm:text-sm font-medium text-muted border border-light-border/55 dark:border-dark-border/40 truncate max-w-[48%] text-right">
                  {linkedProject.metrics?.secondary ?? t("common.status.notAvailable")}
                </span>
              </div>
            )}
          </div>
        </Link>
      )}

      {projectImageSrc && !caseStudyLink && (
        <div className="relative block rounded-t-xl sm:rounded-t-2xl">
          <div className="relative h-56 overflow-hidden">
            <img
              src={projectImageSrc}
              alt=""
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover ${
                shouldAnimate
                  ? "transition-transform duration-300 group-hover:scale-105"
                  : ""
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />

            {linkedProject && (
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex justify-between gap-2 text-white pointer-events-none">
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 surface-card rounded-full text-xs sm:text-sm font-medium text-heading border border-light-border/55 dark:border-dark-border/40 truncate max-w-[48%]">
                  {linkedProject.metrics?.primary ?? t("common.status.notAvailable")}
                </span>
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 surface-card rounded-full text-xs sm:text-sm font-medium text-muted border border-light-border/55 dark:border-dark-border/40 truncate max-w-[48%] text-right">
                  {linkedProject.metrics?.secondary ?? t("common.status.notAvailable")}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="relative p-3 sm:p-4 border-b border-light-border/55 dark:border-dark-border/40">
        <div className="flex items-start gap-3">
          <div className={`${SURFACE_CARD_ICON} w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-lg sm:text-xl`}>
            <span aria-hidden="true">{highlight.icon}</span>
          </div>

          {/* Title and Company */}
          <div className="flex-1 min-w-0">
            <h3 className={`${TEXT_CARD_TITLE} mb-1`}>
              {highlight.title}
            </h3>
            <p className={`${TEXT_BODY} font-semibold text-indigo-600 dark:text-indigo-400 mb-2`}>
              {highlight.company}
            </p>
          </div>
        </div>

        {/* Period and Location */}
        <div
          className={`flex flex-row flex-wrap items-center justify-between gap-1 ${TEXT_MUTED} mt-2`}
        >
          <span className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
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
            {highlight.period}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {highlight.location}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Summary */}
        <MarkdownRenderer content={highlight.summary} className={TEXT_BODY} />

        {/* Key Metrics */}
        {highlight.keyMetrics && highlight.keyMetrics.length > 0 && (
          <div className="space-y-1">
            <motion.button
              onClick={() => setMetricsOpen((o) => !o)}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 min-h-[44px] rounded-xl surface-card border border-light-border/55 dark:border-dark-border/40 group/toggle cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm flex-shrink-0">📈</span>
                <span className="text-xs sm:text-sm font-bold text-heading truncate">
                  {t("components.careerHighlight.keyMetrics")}
                </span>
                <span className="flex-shrink-0 text-xs font-black px-1.5 py-0.5 rounded-full bg-emerald-500/15 dark:bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                  {Math.min(highlight.keyMetrics.length, maxMetrics)}
                </span>
              </div>
              <motion.svg
                animate={{ rotate: metricsOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="w-4 h-4 flex-shrink-0 text-gray-500 dark:text-gray-400 group-hover/toggle:text-emerald-500 dark:group-hover/toggle:text-emerald-400 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>

            <AnimatePresence initial={false}>
              {metricsOpen && (
                <motion.ul
                  key="metrics"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="overflow-hidden space-y-0.5 pt-1"
                >
                  {highlight.keyMetrics
                    .slice(0, maxMetrics)
                    .map((metric: string, i: number) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 28,
                          delay: i * 0.07,
                        }}
                        className="group/item flex items-start gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-white/8 dark:hover:bg-gray-700/15 transition-colors duration-300"
                        style={{ minHeight: "32px" }}
                      >
                        <span className="inline-flex rounded-full h-1.5 w-1.5 mt-2.5 flex-shrink-0 bg-emerald-500 dark:bg-emerald-400" />
                        <MarkdownRenderer
                          content={metric}
                          className={`${TEXT_BODY} group-hover/item:text-heading transition-colors duration-200`}
                        />
                      </motion.li>
                    ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Technologies */}
        {showTechnologies &&
          highlight.technologies &&
          highlight.technologies.length > 0 && (
            <div className="space-y-1">
              <motion.button
                onClick={() => setTechOpen((o) => !o)}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 min-h-[44px] rounded-xl surface-card border border-light-border/55 dark:border-dark-border/40 group/toggle cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm flex-shrink-0">⚙️</span>
                  <span className="text-xs sm:text-sm font-bold text-heading truncate">
                    {t("components.careerHighlight.skills")}
                  </span>
                  <span className="flex-shrink-0 text-xs font-black px-1.5 py-0.5 rounded-full bg-violet-500/15 dark:bg-violet-400/20 text-violet-700 dark:text-violet-300 border border-violet-500/25">
                    {highlight.technologies.length}
                  </span>
                </div>
                <motion.svg
                  animate={{ rotate: techOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="w-4 h-4 flex-shrink-0 text-gray-500 dark:text-gray-400 group-hover/toggle:text-violet-500 dark:group-hover/toggle:text-violet-400 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </motion.button>

              <AnimatePresence initial={false}>
                {techOpen && (
                  <motion.div
                    key="tech"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="overflow-hidden pt-1"
                  >
                    <motion.div
                      className="flex flex-wrap gap-1.5 sm:gap-2"
                      initial={false}
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.05 } },
                      }}
                    >
                      {highlight.technologies.map((tech: string, i: number) => (
                        <motion.span
                          key={i}
                          variants={{
                            hidden: { opacity: 0, scale: 0.8, y: 6 },
                            visible: {
                              opacity: 1,
                              scale: 1,
                              y: 0,
                              transition: {
                                type: "spring",
                                stiffness: 380,
                                damping: 28,
                              },
                            },
                          }}
                          whileHover={{ scale: 1 }}
                          className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs sm:text-sm font-medium rounded-md bg-indigo-500/10 dark:bg-indigo-400/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-400/25"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
      </div>

      {caseStudyLink && (
        <div className="p-3 sm:p-4 pt-0 mt-auto">
          <Link
            to={caseStudyLink.href}
            className={`${viewCaseStudyButtonClass} text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors`}
          >
            <span>{caseStudyLink.label}</span>
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      )}
    </article>
  );
};

export default HighlightCard;

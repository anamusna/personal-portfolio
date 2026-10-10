import React from "react";
import { useTranslation } from "react-i18next";
import { P } from "tailwind/components/elements/Typography";
import {
  SURFACE_CARD_BASE,
  SURFACE_CARD_ICON,
  SURFACE_CARD_INTERACTIVE,
} from "tailwind/styles/surfaceCard";
import { TEXT_DETAIL_SECTION_TITLE } from "tailwind/styles/textTokens";
import { Project, ProjectMetricKind } from "types/project";

const KIND_STYLES: Record<ProjectMetricKind, { icon: string; path: string }> = {
  // Bar chart: a number was measured.
  measured: {
    icon: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
    path: "M4 20h16M7 16v-4m5 4V8m5 8v-6",
  },
  // Branching path: the system was changed.
  change: {
    icon: "bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300",
    path: "M6 4v8a4 4 0 004 4h8m0 0l-3-3m3 3l-3 3M6 4a2 2 0 100 4 2 2 0 000-4z",
  },
  // Info: background to the work.
  context: {
    icon: "bg-light-elevated text-muted dark:bg-dark-surface",
    path: "M12 16v-4m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

type ProjectDetailsSidebarProps = {
  project: Project;
};

const getWebsiteUrl = (websiteUrl?: string): URL | null => {
  if (!websiteUrl) {
    return null;
  }

  try {
    return new URL(websiteUrl);
  } catch {
    return null;
  }
};

export const ProjectDetailsSidebar: React.FC<ProjectDetailsSidebarProps> = ({
  project,
}) => {
  const { t } = useTranslation();
  const websiteUrl = getWebsiteUrl(project.websiteUrl);
  const glanceItems = project.metrics
    ? [
        { text: project.metrics.primary, kind: project.metrics.primaryKind },
        {
          text: project.metrics.secondary,
          kind: project.metrics.secondaryKind,
        },
      ].filter((item) => item.text)
    : [];

  return (
    <div className="sticky top-20 space-y-3 sm:space-y-4">
      {websiteUrl && (
        <div
          className={`${SURFACE_CARD_INTERACTIVE} p-3 sm:p-4 border border-light-border/55 dark:border-dark-border/40 rounded-xl`}
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 ${SURFACE_CARD_ICON}`}>
              <svg
                className="w-4 h-4 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
            <h2 className={`${TEXT_DETAIL_SECTION_TITLE} text-base sm:text-lg`}>
              {t("features.projectDetails.sidebar.liveWebsite")}
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 surface-card rounded-xl border border-light-border/55 dark:border-dark-border/40">
              <P className="text-sm text-muted font-mono break-all">
                {websiteUrl.hostname}
              </P>
            </div>

            <a
              href={websiteUrl.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 min-h-[44px] px-4 py-3 rounded-xl bg-green-700 hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold text-sm sm:text-base transition-colors"
            >
              {t("features.projectDetails.sidebar.visitLiveSite")}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            <P className="text-sm text-muted text-center italic">
              {t("features.projectDetails.sidebar.opensInNewTab")}
            </P>
          </div>
        </div>
      )}

      {glanceItems.length > 0 && (
        <section
          aria-labelledby="project-at-a-glance"
          className={`${SURFACE_CARD_BASE} p-5 sm:p-6 border border-light-border/55 dark:border-dark-border/40 rounded-xl`}
        >
          <h2
            id="project-at-a-glance"
            className={`${TEXT_DETAIL_SECTION_TITLE} text-base sm:text-lg mb-3 sm:mb-4`}
          >
            {t("features.projectDetails.sidebar.atAGlance")}
          </h2>
          {/* Each item says what kind of evidence it is, in words: a measured
            result, an architectural change, or context. Only measured
            results get numeric emphasis. */}
          <ul className="divide-y divide-light-border/50 dark:divide-dark-border/40">
            {glanceItems.map((item) => (
              <li
                key={item.text}
                className="flex gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${KIND_STYLES[item.kind].icon}`}
                  aria-hidden="true"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={KIND_STYLES[item.kind].path}
                    />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {t(`features.projectDetails.sidebar.kinds.${item.kind}`)}
                  </p>
                  <p
                    className={
                      item.kind === "measured"
                        ? "mt-0.5 text-lg font-bold tabular-nums text-heading"
                        : "mt-0.5 text-base font-semibold text-heading"
                    }
                  >
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

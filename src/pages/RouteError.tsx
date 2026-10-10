import AnimatedCTAButton from "components/elements/animated-cta-button";
import { LAYOUT_STYLES } from "data/heroData";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router-dom";
import { PAGE_HEADER_HERO_TITLE } from "tailwind/styles/pageHeader";
import { TEXT_BODY } from "tailwind/styles/textTokens";
import { devError } from "utils/logger";

/**
 * A lazy chunk that no longer exists on the server. This happens to visitors
 * who had the site open across a deploy: their old main bundle asks for chunk
 * names the new build does not have.
 */
const isStaleChunkError = (error: unknown) =>
  error instanceof Error &&
  (error.name === "ChunkLoadError" ||
    /Loading (CSS )?chunk [\w-]+ failed/i.test(error.message));

/**
 * Shown in place of a route that failed to render. The layout around it keeps
 * working, so the header, footer and navigation are still there.
 */
const RouteError: React.FC = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  devError("Route failed to render:", error);

  const staleBuild = isStaleChunkError(error);

  return (
    <div className={LAYOUT_STYLES.PAGE_ROOT}>
      <div className="container mx-auto max-w-2xl px-4 py-12 text-center sm:px-6 md:py-16">
        <h1 className={`${PAGE_HEADER_HERO_TITLE} text-heading`}>
          {t("pages.routeError.title")}
        </h1>
        <p role="alert" className={`${TEXT_BODY} mt-4`}>
          {staleBuild
            ? t("pages.routeError.staleBuild")
            : t("pages.routeError.description")}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <AnimatedCTAButton
            as="button"
            text={t("pages.routeError.reload")}
            onClick={() => window.location.reload()}
            colorScheme="indigo-violet"
            size="md"
            showIcon={false}
          />
          <AnimatedCTAButton
            text={t("common.actions.goHome")}
            href="/"
            colorScheme="indigo-violet"
            size="md"
            variant="outline"
            showIcon={false}
          />
        </div>
      </div>
    </div>
  );
};

export default RouteError;

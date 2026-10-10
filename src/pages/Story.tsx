import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import PageSection from "components/sections/page-section";
import StoryHero from "components/sections/story/story-hero";
import StructuredContentRenderer from "components/sections/story/structured-content-renderer";
import { loadStoryContent } from "data/private-content";
import { buildBiographyContent, StoryData } from "data/storyDataStructured";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type StoryState =
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "failed"; error: unknown }
  | { status: "ready"; story: StoryData };

const Story: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? i18n.language;
  const [state, setState] = useState<StoryState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });
    loadStoryContent(language)
      .then((raw) => {
        if (cancelled) return;
        setState(
          raw
            ? { status: "ready", story: buildBiographyContent(raw) }
            : { status: "unavailable" },
        );
      })
      // A load failure is not "this build has no story": hand it to the route
      // error element, which explains it and offers a reload.
      .catch((error) => {
        if (!cancelled) setState({ status: "failed", error });
      });
    return () => {
      cancelled = true;
    };
  }, [language]);

  if (state.status === "failed") {
    throw state.error;
  }

  if (state.status !== "ready") {
    return (
      <PageSection>
        <p role="status" className="mx-auto max-w-xl text-center text-muted">
          {state.status === "loading"
            ? t("pages.story.loading")
            : t("pages.story.unavailable")}
        </p>
      </PageSection>
    );
  }

  return (
    <PageSection>
      <section id="story-hero" className="scroll-mt-24">
        <StoryHero metadata={state.story.metadata} />
      </section>

      <motion.section
        id="story-chapters"
        className="relative scroll-mt-24 mt-10 sm:mt-12 md:mt-14 pt-8 sm:pt-10 border-t border-light-border/55 dark:border-dark-border/40"
        variants={SECTION_VARIANTS}
        initial={false}
        whileInView="visible"
        viewport={SECTION_VIEWPORT}
      >
        <div className="mx-auto min-w-0 w-full max-w-4xl">
          <StructuredContentRenderer sections={state.story.sections} />
        </div>
      </motion.section>
    </PageSection>
  );
};

export default Story;

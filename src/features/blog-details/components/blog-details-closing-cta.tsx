import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import CTAButtons from "components/elements/cta-buttons";
import { SURFACE_CARD_PANEL } from "tailwind/styles/surfaceCard";
import { TEXT_BODY, TEXT_CARD_TITLE } from "tailwind/styles/textTokens";

export const BlogDetailsClosingCta: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section
    variants={SECTION_VARIANTS}
    initial={false}
    whileInView="visible"
    viewport={SECTION_VIEWPORT}
    className="relative py-8 sm:py-12 md:py-16"
  >
    <div className="container relative z-10 mx-auto px-4">
      <div className={`${SURFACE_CARD_PANEL} max-w-2xl mx-auto p-5 sm:p-6 lg:p-8 text-center`}>
        <h3 className={`${TEXT_CARD_TITLE} text-xl sm:text-2xl mb-3`}>
          {t("features.blogDetails.closingCta.title")}
        </h3>

        <p className={`${TEXT_BODY} mb-5 sm:mb-6 max-w-xl mx-auto`}>
          {t("features.blogDetails.closingCta.description")}
        </p>

        <CTAButtons
          primaryButton={{
            text: t("features.blogDetails.closingCta.moreArticles"),
            href: "/blog",
          }}
          secondaryButton={{
            text: t("features.blogDetails.closingCta.viewCareerTimeline"),
            href: "/career",
          }}
          layout="horizontal"
          spacing="normal"
          alignment="center"
          showIcons={true}
        />
      </div>
    </div>
    </motion.section>
  );
};

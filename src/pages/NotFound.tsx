import AnimatedCTAButton from "components/elements/animated-cta-button";
import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { LAYOUT_STYLES } from "data/heroData";
import { motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PAGE_HEADER_HERO_TITLE } from "tailwind/styles/pageHeader";
import { TEXT_BODY } from "tailwind/styles/textTokens";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className={LAYOUT_STYLES.PAGE_ROOT}>
      <div className="relative z-10 py-6 md:py-8 flex items-center justify-center overflow-hidden">
        <div className="container mx-auto max-w-3xl text-center px-3 sm:px-4 lg:px-6">
          {/* 404 Icon */}
          <motion.div
            className="mb-6 sm:mb-8"
            variants={SECTION_VARIANTS}
            initial={false}
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full surface-card border border-light-border/55 dark:border-dark-border/40 shadow-sm">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-heading leading-none">
                  404
                </div>
                <div className="text-xs text-muted font-medium mt-1">
                  {t("pages.notFound.errorLabel")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="space-y-4 sm:space-y-6 mb-8 sm:mb-12"
            variants={SECTION_VARIANTS}
            initial={false}
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
          >
            {/* Title */}
            <div className="space-y-3">
              <h1 className={`${PAGE_HEADER_HERO_TITLE} text-heading`}>
                {t("pages.notFound.title")}
              </h1>
              <h2 className="text-base sm:text-lg md:text-xl font-medium text-muted max-w-2xl mx-auto leading-relaxed">
                {t("pages.notFound.subtitle")}
              </h2>
            </div>

            <div className="surface-card rounded-xl p-4 sm:p-6 border border-light-border/55 dark:border-dark-border/40 max-w-xl mx-auto">
              <div className="space-y-3 text-center">
                <p className={`${TEXT_BODY}`}>
                  {t("pages.notFound.description")}
                </p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {t("pages.notFound.descriptionSecondary")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            variants={SECTION_VARIANTS}
            initial={false}
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
          >
            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <AnimatedCTAButton
                text={t("common.actions.goHome")}
                onClick={handleGoHome}
                as="button"
                colorScheme="indigo-violet"
                size="md"
                showIcon={true}
              />
              <AnimatedCTAButton
                text={t("common.actions.goBack")}
                onClick={handleGoBack}
                as="button"
                colorScheme="indigo-violet"
                size="md"
                variant="outline"
                showIcon={true}
              />
            </div>
          </motion.div>

          {/* Additional Navigation */}
          <div className="mt-8 sm:mt-12">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              {t("pages.notFound.popularLinksLabel")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {[
                {
                  label: t("navigation.primary.projects"),
                  href: "/projects",
                  icon: "💼",
                },
                {
                  label: t("navigation.primary.about"),
                  href: "/about",
                  icon: "👨‍💻",
                },
                {
                  label: t("navigation.primary.blog"),
                  href: "/blog",
                  icon: "📝",
                },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.href)}
                  className="group px-3 py-1.5 text-xs font-medium text-muted hover:text-heading transition-colors duration-300 flex items-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

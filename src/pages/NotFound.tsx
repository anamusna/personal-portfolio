import AnimatedCTAButton from "components/elements/animated-cta-button";
import { LAYOUT_STYLES } from "data/heroData";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PAGE_HEADER_HERO_TITLE } from "tailwind/styles/pageHeader";
import { TEXT_BODY } from "tailwind/styles/textTokens";

const SUGGESTED_PAGES = [
  { key: "projects", href: "/projects" },
  { key: "career", href: "/career" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={LAYOUT_STYLES.PAGE_ROOT}>
      <div className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto max-w-2xl text-center px-4 sm:px-6">
          <p
            aria-hidden="true"
            className="text-6xl sm:text-7xl font-black tracking-tight text-muted leading-none mb-6"
          >
            404
          </p>

          <h1 className={`${PAGE_HEADER_HERO_TITLE} text-heading`}>
            {t("pages.notFound.title")}
          </h1>
          <p className={`${TEXT_BODY} mt-4`}>
            {t("pages.notFound.description")}
          </p>

          <div className="mt-8 flex justify-center">
            <AnimatedCTAButton
              text={t("common.actions.goHome")}
              href="/"
              colorScheme="indigo-violet"
              size="md"
              showIcon={true}
            />
          </div>

          <nav
            aria-labelledby="not-found-suggestions"
            className="mt-10 border-t border-light-border/55 dark:border-dark-border/40 pt-6"
          >
            <h2
              id="not-found-suggestions"
              className="text-sm font-medium text-muted"
            >
              {t("pages.notFound.popularLinksLabel")}
            </h2>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              {SUGGESTED_PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    to={page.href}
                    className="inline-flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-heading underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    {t(`navigation.primary.${page.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

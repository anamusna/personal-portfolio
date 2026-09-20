import MarkdownRenderer from "components/elements/markdown-renderer";
import SectionHeader from "components/elements/section-header";
import { LAYOUT_STYLES } from "data/heroData";
import { motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { privacyMeta, privacySections } from "../data/privacy";

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const PRIVACY_MARKDOWN_CLASS =
  "text-light-text/85 dark:text-dark-text/85 text-sm sm:text-base leading-relaxed [&_ul]:space-y-2.5 [&_ul_li]:gap-2.5 [&_ul_li>span:first-child]:mt-2 [&_ul_li>span:first-child]:h-1.5 [&_ul_li>span:first-child]:w-1.5 [&_ul_li>span:first-child]:rounded-full [&_ul_li>span:first-child]:bg-royal-primary/90 dark:[&_ul_li>span:first-child]:bg-royal-400/90 [&_strong]:text-light-text dark:[&_strong]:text-dark-text [&_a]:text-royal-primary dark:[&_a]:text-royal-400 [&_a]:font-medium";

const Privacy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={LAYOUT_STYLES.PAGE_ROOT}>
      <div className="relative z-10 pt-6 md:pt-8">
        <motion.article
          className={`${LAYOUT_STYLES.CONTENT_CONTAINER} max-w-3xl`}
          variants={fadeIn}
          initial={false}
          animate="visible"
        >
          <SectionHeader
            badge={{ text: t("pages.privacy.badge"), iconAnimation: false }}
            title={privacyMeta.title}
            titleAs="h1"
            caption={t("pages.privacy.lastUpdated", {
              date: privacyMeta.lastUpdated,
            })}
            description={privacyMeta.subtitle}
            className="mb-10 sm:mb-12"
          />

          <div className="surface-card rounded-2xl border border-light-border/55 dark:border-dark-border/40 divide-y divide-light-border/50 dark:divide-dark-border/40">
            {privacySections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 p-6 sm:p-8 first:rounded-t-2xl last:rounded-b-2xl"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text mb-3">
                  {section.title}
                </h2>
                <MarkdownRenderer
                  content={section.content}
                  variant="compact"
                  className={PRIVACY_MARKDOWN_CLASS}
                />
              </section>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-light-text/70 dark:text-dark-text/70">
            {/* One text child, not two adjacent ones: the prerendered
                snapshot merges adjacent text nodes into one, so hydration
                only had the first piece to match against the merged
                result. */}
            {`${t("pages.privacy.questions")} `}
            <a
              href={`mailto:${privacyMeta.contactEmail}`}
              className="font-medium text-royal-primary dark:text-royal-400 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/40 rounded"
            >
              {privacyMeta.contactEmail}
            </a>
          </p>
        </motion.article>
      </div>
    </div>
  );
};

export default Privacy;

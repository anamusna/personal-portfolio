import { PageMetadata } from "components/seo/page-metadata";
import { PageSeoConfig } from "data/page-seo";
import React from "react";
import { useTranslation } from "react-i18next";

export function withPageSeo(
  seo: PageSeoConfig,
  Page: React.ComponentType,
): React.FC {
  const WrappedPage: React.FC = () => {
    const { t } = useTranslation();

    return (
      <>
        <PageMetadata
          title={seo.titleKey ? t(seo.titleKey) : seo.title}
          description={seo.descriptionKey ? t(seo.descriptionKey) : seo.description}
          path={seo.path}
          image={seo.image}
          type={seo.type}
          noindex={seo.noindex}
        />
        <Page />
      </>
    );
  };

  WrappedPage.displayName = `WithPageSeo(${Page.displayName ?? Page.name ?? "Page"})`;

  return WrappedPage;
}

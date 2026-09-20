import { PageSeoConfig, resolveCanonicalUrl } from "data/page-seo";
import { SITE_NAME } from "data/site-config";
import React, { useEffect, useMemo } from "react";

type PageMetadataProps = Omit<PageSeoConfig, "titleKey" | "descriptionKey"> & {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const upsertMeta = (
  attribute: "name" | "property",
  key: string,
  content: string,
) => {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`,
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const upsertJsonLd = (id: string, data: Record<string, unknown>) => {
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const removeJsonLd = (id: string) => {
  document.getElementById(id)?.remove();
};

/**
 * Syncs document title and meta tags when route-level SEO props change.
 * useEffect is required: the document head is an external system outside React's render tree.
 */
export const PageMetadata: React.FC<PageMetadataProps> = ({
  title,
  description,
  path,
  image,
  type = "website",
  noindex = false,
  jsonLd,
}) => {
  const jsonLdItems = useMemo(
    () => (jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
    [jsonLd],
  );

  useEffect(() => {
    const canonical = resolveCanonicalUrl(path);
    const ogImage = image ?? resolveCanonicalUrl("/images/ansu.jpg");

    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("name", "title", title);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:site_name", SITE_NAME);

    upsertMeta("property", "twitter:card", "summary_large_image");
    upsertMeta("property", "twitter:title", title);
    upsertMeta("property", "twitter:description", description);
    upsertMeta("property", "twitter:image", ogImage);

    upsertLink("canonical", canonical);

    jsonLdItems.forEach((item, index) => {
      upsertJsonLd(`page-json-ld-${index}`, item);
    });

    const extraIds = jsonLdItems.length;
    for (let i = extraIds; i < 5; i += 1) {
      removeJsonLd(`page-json-ld-${i}`);
    }

    return () => {
      for (let i = 0; i < 5; i += 1) {
        removeJsonLd(`page-json-ld-${i}`);
      }
    };
  }, [
    title,
    description,
    path,
    image,
    type,
    noindex,
    jsonLdItems,
  ]);

  return null;
};

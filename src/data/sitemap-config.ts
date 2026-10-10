import { blogs } from "./blogs";
import { PAGE_SEO } from "./page-seo";
import { projects } from "./projects";
import { SITE_URL } from "./site-config";

export function getPublicStaticPaths(): string[] {
  return Object.values(PAGE_SEO)
    .filter((entry) => !entry.noindex)
    .map((entry) => entry.path)
    .filter((path) => path !== "/404");
}

export function getPublicProjectPaths(): string[] {
  return projects
    .filter((project) => project.hasDetailLink === true)
    .map((project) => `/projects/${project.id}`);
}

export function getPublicBlogPaths(): string[] {
  return blogs.map((blog) => `/blog/${blog.titleSlug}`);
}

/** All indexable paths for sitemap.xml */
export function getPublicSitemapPaths(): string[] {
  const paths = new Set<string>([
    ...getPublicStaticPaths(),
    ...getPublicProjectPaths(),
    ...getPublicBlogPaths(),
  ]);

  return Array.from(paths).sort((a, b) => a.localeCompare(b));
}

export function buildSitemapXml(baseUrl: string = SITE_URL): string {
  const normalizedBase = baseUrl.replace(/\/$/, "");
  const urls = getPublicSitemapPaths()
    .map((path) => {
      const loc = path === "/" ? `${normalizedBase}/` : `${normalizedBase}${path}`;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

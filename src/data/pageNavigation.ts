import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBook,
  faBriefcase,
  faChartLine,
  faCode,
  faCog,
  faFutbol,
  faGlobe,
  faHeart,
  faLightbulb,
  faPlane,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export type PageId =
  | "home"
  | "about"
  | "story"
  | "prayer"
  | "projects"
  | "testimonials"
  | "blog"
  | "contact"
  | "faq"
  | "career";

export interface NavSection {
  id: string;
  labelKey: string;
  icon: IconDefinition;
  color: string;
  /** Story dock: render a divider before this section to mark a narrative act */
  actBreakBefore?: boolean;
}

interface PageNavConfig {
  /** Route prefixes or exact paths that map to this page */
  paths: string[];
  /** When false, the bottom dock is hidden. When true, shown even with no sections. */
  showDock?: boolean;
  dockSections: NavSection[];
}

const HOME_DOCK_SECTIONS: NavSection[] = [
  {
    id: "career-highlights",
    labelKey: "navigation.dock.home.work",
    icon: faBriefcase,
    color: "text-emerald-500",
  },
  {
    id: "testimonials",
    labelKey: "navigation.dock.home.proof",
    icon: faStar,
    color: "text-amber-500",
  },
  {
    id: "how-i-work",
    labelKey: "navigation.dock.home.approach",
    icon: faChartLine,
    color: "text-violet-500",
  },
  {
    id: "tech-stack",
    labelKey: "navigation.dock.home.stack",
    icon: faCode,
    color: "text-indigo-500",
  },
  {
    id: "contact",
    labelKey: "navigation.dock.home.contact",
    icon: faGlobe,
    color: "text-cyan-500",
  },
];

const ABOUT_DOCK_SECTIONS: NavSection[] = [
  {
    id: "skills-breakdown",
    labelKey: "navigation.dock.about.skills",
    icon: faCode,
    color: "text-indigo-500",
  },
  {
    id: "technical-setup",
    labelKey: "navigation.dock.about.habits",
    icon: faCog,
    color: "text-amber-500",
  },
  {
    id: "values",
    labelKey: "navigation.dock.about.philosophy",
    icon: faHeart,
    color: "text-purple-500",
  },
  {
    id: "personal-interests",
    labelKey: "navigation.dock.about.beyondCode",
    icon: faLightbulb,
    color: "text-pink-500",
  },
];

/** Slug used for in-page anchors (matches StructuredContentRenderer by default). */
export function slugifyNavSectionId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getStoryChapterAnchorId(title: string): string {
  const slug = slugifyNavSectionId(title);
  if (slug === "she-put-the-laptop-down") return "what-drives-me";
  if (slug === "everything-else") return "where-i-am-now";
  return slug;
}

type StoryDockChapter = {
  chapterAnchorId: string;
  labelKey: string;
  icon: NavSection["icon"];
  color: string;
  actBreakBefore?: boolean;
};

/** Story journey acts — ids derived from chapter h2 titles in storyDataStructured.ts */
const STORY_DOCK_CHAPTERS: StoryDockChapter[] = [
  {
    chapterAnchorId: "the-compound",
    labelKey: "navigation.dock.story.origins",
    icon: faGlobe,
    color: "text-emerald-500",
  },
  {
    chapterAnchorId: "the-real-school",
    labelKey: "navigation.dock.story.village",
    icon: faGlobe,
    color: "text-emerald-400",
  },
  {
    chapterAnchorId: "again-tomorrow",
    labelKey: "navigation.dock.story.football",
    icon: faFutbol,
    color: "text-amber-500",
    actBreakBefore: true,
  },
  {
    chapterAnchorId: "hello-world",
    labelKey: "navigation.dock.story.code",
    icon: faCode,
    color: "text-indigo-500",
  },
  {
    chapterAnchorId: "april-2014",
    labelKey: "navigation.dock.story.berlin",
    icon: faPlane,
    color: "text-cyan-500",
    actBreakBefore: true,
  },
  {
    chapterAnchorId: "signatures-at-midnight",
    labelKey: "navigation.dock.story.building",
    icon: faBriefcase,
    color: "text-violet-500",
    actBreakBefore: true,
  },
  {
    chapterAnchorId: "friday-evenings",
    labelKey: "navigation.dock.story.zula",
    icon: faBook,
    color: "text-pink-500",
  },
  {
    chapterAnchorId: "what-drives-me",
    labelKey: "navigation.dock.story.values",
    icon: faHeart,
    color: "text-rose-500",
  },
  {
    chapterAnchorId: "where-i-am-now",
    labelKey: "navigation.dock.story.today",
    icon: faStar,
    color: "text-amber-400",
    actBreakBefore: true,
  },
];

const STORY_DOCK_SECTIONS: NavSection[] = STORY_DOCK_CHAPTERS.map(
  ({ chapterAnchorId, labelKey, icon, color, actBreakBefore }) => ({
    id: chapterAnchorId,
    labelKey,
    icon,
    color,
    actBreakBefore,
  }),
);

const CAREER_DOCK_SECTIONS: NavSection[] = [
  {
    id: "career-leadership",
    labelKey: "navigation.dock.career.leadership",
    icon: faUsers,
    color: "text-violet-500",
  },
  {
    id: "before-code",
    labelKey: "navigation.dock.career.beforeCode",
    icon: faFutbol,
    color: "text-amber-500",
  },
  {
    id: "career-milestones",
    labelKey: "navigation.dock.career.milestones",
    icon: faChartLine,
    color: "text-emerald-500",
  },
  {
    id: "career-roles",
    labelKey: "navigation.dock.career.experience",
    icon: faBriefcase,
    color: "text-indigo-500",
  },
  {
    id: "career-next",
    labelKey: "navigation.dock.career.explore",
    icon: faBook,
    color: "text-cyan-500",
  },
];

/**
 * Single source of truth for page → route, dock visibility, and section nav.
 * Update sections here; BottomDock reads from this config.
 */
export const PAGE_NAVIGATION: Record<PageId, PageNavConfig> = {
  home: {
    paths: ["/", "/home"],
    showDock: true,
    dockSections: HOME_DOCK_SECTIONS,
  },
  about: {
    paths: ["/about"],
    showDock: true,
    dockSections: ABOUT_DOCK_SECTIONS,
  },
  story: {
    paths: ["/story"],
    showDock: true,
    dockSections: STORY_DOCK_SECTIONS,
  },
  prayer: {
    paths: ["/prayer"],
    showDock: false,
    dockSections: [],
  },
  career: {
    paths: ["/career"],
    showDock: true,
    dockSections: CAREER_DOCK_SECTIONS,
  },
  projects: {
    paths: ["/projects"],
    showDock: true,
    dockSections: [
      {
        id: "projects-hero",
        labelKey: "navigation.dock.projects.overview",
        icon: faGlobe,
        color: "text-emerald-500",
      },
      {
        id: "project-grid",
        labelKey: "navigation.dock.projects.work",
        icon: faBriefcase,
        color: "text-indigo-500",
      },
    ],
  },
  testimonials: {
    paths: ["/testimonials"],
    showDock: true,
    dockSections: [
      {
        id: "testimonials-hero",
        labelKey: "navigation.dock.testimonials.overview",
        icon: faStar,
        color: "text-amber-500",
      },
      {
        id: "testimonial-grid",
        labelKey: "navigation.dock.testimonials.quotes",
        icon: faUsers,
        color: "text-violet-500",
      },
    ],
  },
  blog: {
    paths: ["/blog"],
    showDock: true,
    dockSections: [
      {
        id: "blog-hero",
        labelKey: "navigation.dock.blog.overview",
        icon: faBook,
        color: "text-pink-500",
      },
      {
        id: "blog-filters",
        labelKey: "navigation.dock.blog.filters",
        icon: faCog,
        color: "text-amber-500",
      },
      {
        id: "blog-grid",
        labelKey: "navigation.dock.blog.posts",
        icon: faGlobe,
        color: "text-indigo-500",
      },
    ],
  },
  contact: {
    paths: ["/contact"],
    showDock: true,
    dockSections: [
      {
        id: "contact-conversations",
        labelKey: "navigation.dock.contact.conversations",
        icon: faUsers,
        color: "text-violet-500",
      },
      {
        id: "contact-expectations",
        labelKey: "navigation.dock.contact.expectations",
        icon: faStar,
        color: "text-cyan-500",
      },
      {
        id: "contact-faq",
        labelKey: "navigation.dock.contact.faq",
        icon: faBook,
        color: "text-amber-500",
      },
    ],
  },
  faq: {
    paths: ["/faq"],
    showDock: true,
    dockSections: [
      {
        id: "faq",
        labelKey: "navigation.dock.faq.overview",
        icon: faLightbulb,
        color: "text-indigo-500",
      },
    ],
  },
};

const PATH_RESOLVERS = Object.entries(PAGE_NAVIGATION).flatMap(
  ([pageId, config]) =>
    config.paths.map((path) => ({
      pageId: pageId as PageId,
      path,
    })),
);

/** Longest-prefix match so `/projects/foo` resolves to projects, not home */
export function resolvePageId(pathname: string): PageId | null {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  let match: { pageId: PageId; path: string } | null = null;

  for (const entry of PATH_RESOLVERS) {
    const isExact = normalized === entry.path;
    const isPrefix =
      entry.path !== "/" && normalized.startsWith(`${entry.path}/`);

    if (!isExact && !isPrefix) continue;

    if (!match || entry.path.length > match.path.length) {
      match = entry;
    }
  }

  return match?.pageId ?? null;
}

export function getPageConfig(pageId: PageId | null): PageNavConfig | null {
  if (!pageId) return null;
  return PAGE_NAVIGATION[pageId] ?? null;
}

export function shouldShowDock(pageId: PageId | null): boolean {
  const config = getPageConfig(pageId);
  if (!config) return false;
  if (config.showDock === false) return false;
  if (config.showDock === true) return true;
  return config.dockSections.length > 0;
}

/**
 * The dock links to sections of a page's own route. A detail route under it
 * (`/projects/zula`, `/blog/<slug>`) has none of those sections, so it gets
 * no dock.
 */
export function shouldShowDockForPath(pathname: string): boolean {
  const pageId = resolvePageId(pathname);
  const config = getPageConfig(pageId);
  if (!config || !shouldShowDock(pageId)) return false;
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  return config.paths.includes(normalized);
}

export function getDockSections(pageId: PageId | null): NavSection[] {
  return getPageConfig(pageId)?.dockSections ?? [];
}

/** Document Y position for an element (reliable inside nested layout). */
export function getNavSectionDocumentTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

export function getActiveNavSectionId(
  sectionIds: string[],
  scrollY: number,
  activationOffset = 150,
): string {
  const scrollPosition = scrollY + activationOffset;

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const element = document.getElementById(sectionIds[i]);
    if (element && getNavSectionDocumentTop(element) <= scrollPosition) {
      return sectionIds[i];
    }
  }

  return sectionIds[0] ?? "";
}

export function scrollToNavSection(sectionId: string, headerOffset = 96): void {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  if (element.classList.contains("scroll-mt-24")) {
    element.scrollIntoView({ behavior, block: "start" });
    return;
  }

  const top = Math.max(
    0,
    Math.min(
      getNavSectionDocumentTop(element) - headerOffset,
      document.documentElement.scrollHeight - window.innerHeight,
    ),
  );
  window.scrollTo({ top, behavior });
}

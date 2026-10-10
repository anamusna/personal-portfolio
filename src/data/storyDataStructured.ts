import change from "../images/company/change-banner.webp";
import propstack from "../images/company/propstack1.webp";

// Personal photos and videos live with the private story text in
// src/content/private/ (gitignored; see data/private-content.ts). A build
// without them still works: a missing file leaves its section out.
// REACT_APP_PRIVATE_PAGES=exclude leaves them out (see private-content.ts).
const privateMedia =
  process.env.REACT_APP_PRIVATE_PAGES === "exclude"
    ? Object.assign(() => undefined, { keys: () => [] as string[] })
    : require.context(
        "../content/private",
        false,
        /^\.\/story-[\w-]+\.(webp|mp4)$/,
      );
const media = (file: string): string | undefined =>
  privateMedia.keys().includes(`./story-${file}`)
    ? (privateMedia(`./story-${file}`) as string)
    : undefined;

type StorySection = {
  type: string;
  level?: number;
  src?: string;
  srcToken?: string;
  content?: string;
  items?: string[];
  alt?: string;
  caption?: string;
};

export type StoryData = {
  metadata: {
    title?: string;
    author?: string;
    subtitle?: string;
    datePublished?: string;
    chapters?: number;
  };
  sections: StorySection[];
};

const STORY_MEDIA_BY_TOKEN: Record<string, string | undefined> = {
  "__MEDIA:../images/story/chicken.mp4": media("chicken.mp4"),
  "__MEDIA:../images/story/football.mp4": media("football.mp4"),
  "__MEDIA:../images/story/team.png": media("team-group.webp"),
  "__MEDIA:../images/story/team.jpg": media("team-photo.webp"),
  "__MEDIA:../images/story/school.jpg": media("school.webp"),
  "__MEDIA:../images/company/propstack1.jpg": propstack,
  "__MEDIA:../images/story/dci.jpg": media("dci.webp"),
  "__MEDIA:../images/company/change-banner.jpg": change,
  "__MEDIA:../images/story/zula-event.jpg": media("zula-event.webp"),
  "__MEDIA:../images/story/zulatribe.png": media("zulatribe.webp"),
  "__MEDIA:../images/story/frey.png": media("frey.webp"),
  "__MEDIA:../images/story/football.png": media("football.webp"),
};

const storyStructure: StorySection[] = [
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/story/chicken.mp4"
  },
  {
    type: "paragraph"
  },
  {
    type: "quote"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/story/football.mp4"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "list"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "image"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/story/team.png"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/story/team.jpg"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "quote"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/story/school.jpg"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "quote"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/company/propstack1.jpg"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "quote"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "image"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/story/dci.jpg"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "bridge"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/company/change-banner.jpg"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/story/zula-event.jpg"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/story/zulatribe.png"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/story/frey.png"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "heading",
    level: 2
  },
  {
    type: "paragraph"
  },
  {
    type: "image",
    srcToken: "__MEDIA:../images/story/football.png"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "paragraph"
  },
  {
    type: "quote"
  }
];

/**
 * Merges the private story text (loaded separately, see private-content.ts) with
 * the structural skeleton and media above. Pure: no i18n or module state, so
 * the story data never has to be part of the main bundle.
 */
export const buildBiographyContent = (localizedStoryData: StoryData): StoryData => {
  const sections = storyStructure.map((baseSection, index) => {
    const localizedSection = localizedStoryData.sections?.[index] ?? {};
    const src =
      baseSection.srcToken && STORY_MEDIA_BY_TOKEN[baseSection.srcToken]
        ? STORY_MEDIA_BY_TOKEN[baseSection.srcToken]
        : undefined;

    return {
      ...baseSection,
      src,
      content: localizedSection.content ?? "",
      items: localizedSection.items,
      alt: localizedSection.alt,
      caption: localizedSection.caption,
    };
  });

  return {
    metadata: {
      title: localizedStoryData.metadata?.title,
      author: localizedStoryData.metadata?.author,
      subtitle: localizedStoryData.metadata?.subtitle,
      datePublished: localizedStoryData.metadata?.datePublished,
      chapters: localizedStoryData.metadata?.chapters,
    },
    sections,
  };
};

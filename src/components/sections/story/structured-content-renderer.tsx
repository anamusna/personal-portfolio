import { SECTION_VIEWPORT } from "constants/section-motion";
import { getStoryChapterAnchorId } from "data/pageNavigation";
import { motion } from "motion/react";
import React from "react";
import { SURFACE_CARD_PANEL } from "tailwind/styles/surfaceCard";
import {
  TEXT_BODY,
  TEXT_DETAIL_SECTION_TITLE,
  TEXT_MUTED,
  TEXT_SECTION_TITLE,
} from "tailwind/styles/textTokens";
import StoryMedia, { isVideoSrc } from "./story-media";

interface StorySection {
  type: string;
  level?: number;
  content?: string;
  items?: string[];
  src?: string;
  alt?: string;
}

interface StructuredContentRendererProps {
  sections: StorySection[];
}

const PARAGRAPH_CLASS = `${TEXT_BODY} mb-4 last:mb-0 break-words [overflow-wrap:anywhere]`;

const QUOTE_CLASS = [
  SURFACE_CARD_PANEL,
  "border-l-4 border-light-border dark:border-dark-border",
  "pl-4 sm:pl-6 py-3 sm:py-4 my-4 sm:my-6 italic break-words [overflow-wrap:anywhere]",
].join(" ");

const HEADING_CLASSES = {
  1: `${TEXT_SECTION_TITLE} mb-6 sm:mb-8 text-heading break-words`,
  2: `${TEXT_SECTION_TITLE} mb-4 sm:mb-6 mt-8 sm:mt-10 first:mt-0 text-heading break-words`,
  3: `${TEXT_DETAIL_SECTION_TITLE} mb-3 sm:mb-4 mt-6 sm:mt-8 text-heading break-words`,
};

const convertMarkdownFormatting = (text: string): string =>
  text
    .replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold text-heading">$1</strong>',
    )
    .replace(/_(.*?)_/g, '<em class="italic">$1</em>')
    .replace(
      /`(.*?)`/g,
      '<code class="bg-light-background-alt dark:bg-dark-background-alt px-1 py-0.5 rounded text-sm font-mono">$1</code>',
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="font-medium underline decoration-current underline-offset-4">$1</a>',
    );

const StructuredContentRenderer: React.FC<StructuredContentRendererProps> = ({
  sections,
}) => {
  const groupedSections = groupSectionsByChapter(sections);

  return (
    <div className="min-w-0 space-y-8 sm:space-y-10">
      {groupedSections.map((group, groupIndex) => (
        <ChapterGroup
          key={groupIndex}
          sections={group}
          groupIndex={groupIndex}
        />
      ))}
    </div>
  );
};

const groupSectionsByChapter = (sections: StorySection[]) => {
  const groups: StorySection[][] = [];
  let currentGroup: StorySection[] = [];

  sections.forEach((section) => {
    if (
      section.type === "heading" &&
      section.level === 2 &&
      currentGroup.length > 0
    ) {
      groups.push(currentGroup);
      currentGroup = [section];
    } else {
      currentGroup.push(section);
    }
  });

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
};

const ChapterGroup: React.FC<{
  sections: StorySection[];
  groupIndex: number;
}> = ({ sections, groupIndex }) => {
  const headingSection = sections.find(
    (section) => section.type === "heading" && Number(section.level) === 2,
  );
  const prefaceGroupId = `chapter-${groupIndex}`;

  return (
    <motion.div
      id={headingSection ? undefined : prefaceGroupId}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SECTION_VIEWPORT}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="chapter-group min-w-0 space-y-3 sm:space-y-4 border-t border-light-border/40 dark:border-dark-border/30 pt-8 sm:pt-10 first:border-t-0 first:pt-0"
    >
      {sections.map((section, index) => (
        <SectionRenderer
          key={`${groupIndex}-${index}`}
          section={section}
          index={index}
          sections={sections}
        />
      ))}
    </motion.div>
  );
};

const SectionRenderer: React.FC<{
  section: StorySection;
  index: number;
  sections?: StorySection[];
}> = ({ section, index, sections = [] }) => {
  const previousSection = sections[index - 1];
  const isTextAfterImage =
    previousSection &&
    previousSection.type === "image" &&
    previousSection.src &&
    typeof previousSection.src === "string" &&
    previousSection.src.trim() !== "" &&
    (section.type === "paragraph" || section.type === "quote");

  if (isTextAfterImage) {
    return null;
  }

  switch (section.type) {
    case "heading": {
      const HeadingTag = `h${section.level}` as keyof JSX.IntrinsicElements;
      const isChapterHeading = Number(section.level) === 2;
      const anchorId = isChapterHeading
        ? getStoryChapterAnchorId(section.content || "")
        : undefined;
      const headingClass =
        HEADING_CLASSES[section.level as keyof typeof HEADING_CLASSES] ??
        TEXT_BODY;

      return (
        <HeadingTag
          id={anchorId}
          className={`${headingClass}${isChapterHeading ? " scroll-mt-24" : ""}`}
        >
          {section.content}
        </HeadingTag>
      );
    }

    case "subtitle":
      return (
        <p className={`${TEXT_MUTED} text-center mb-6 sm:mb-8 italic px-1`}>
          {section.content}
        </p>
      );

    case "paragraph": {
      const paragraphs = (section.content || "").split("\n\n");

      return (
        <div className="mb-4">
          {paragraphs.map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className={PARAGRAPH_CLASS}
              dangerouslySetInnerHTML={{
                __html: convertMarkdownFormatting(paragraph),
              }}
            />
          ))}
        </div>
      );
    }

    case "quote":
      return (
        <blockquote
          className={QUOTE_CLASS}
          dangerouslySetInnerHTML={{
            __html: convertMarkdownFormatting(section.content || ""),
          }}
        />
      );

    case "list":
      return (
        <ul className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
          {(section.items || []).map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="flex items-start gap-2 sm:gap-3 min-w-0"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-light-border dark:bg-dark-border" />
              <span
                className={`${PARAGRAPH_CLASS} mb-0`}
                dangerouslySetInnerHTML={{
                  __html: convertMarkdownFormatting(item),
                }}
              />
            </li>
          ))}
        </ul>
      );

    case "image": {
      if (
        !section.src ||
        typeof section.src !== "string" ||
        section.src.trim() === ""
      ) {
        return null;
      }

      const nextSection = sections[index + 1];
      const hasFollowingText =
        nextSection &&
        (nextSection.type === "paragraph" || nextSection.type === "quote");

      const mediaClassName =
        "h-full w-full rounded-lg border border-light-border/55 dark:border-dark-border/40 bg-black object-contain";
      const mediaContainerClass = isVideoSrc(section.src)
        ? "relative aspect-video w-full max-h-[50vh] sm:max-h-[70vh]"
        : "relative aspect-[4/3] w-full max-w-full sm:aspect-auto sm:h-60";

      if (hasFollowingText) {
        return (
          <div className="my-6 sm:my-8 min-w-0">
            <div className="block lg:hidden">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className={`${mediaContainerClass} max-w-full`}>
                  <StoryMedia
                    src={section.src}
                    alt={section.alt || "Story content"}
                    className={mediaClassName}
                  />
                </div>
              </div>

              <div className="text-content">
                {nextSection.type === "paragraph" && (
                  <div className="mb-4">
                    {(nextSection.content || "")
                      .split("\n\n")
                      .map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraphIndex}
                          className={PARAGRAPH_CLASS}
                          dangerouslySetInnerHTML={{
                            __html: convertMarkdownFormatting(paragraph),
                          }}
                        />
                      ))}
                  </div>
                )}

                {nextSection.type === "quote" && (
                  <blockquote
                    className={QUOTE_CLASS}
                    dangerouslySetInnerHTML={{
                      __html: convertMarkdownFormatting(
                        nextSection.content || "",
                      ),
                    }}
                  />
                )}
              </div>
            </div>

            <div className="hidden lg:block overflow-hidden">
              <div
                className={`float-left mr-6 mb-4 w-full ${
                  isVideoSrc(section.src)
                    ? "md:w-full lg:w-[min(100%,36rem)]"
                    : "md:w-80"
                } ${isVideoSrc(section.src) ? "aspect-video max-h-[70vh]" : "h-60"}`}
              >
                <div className={mediaContainerClass}>
                  <StoryMedia
                    src={section.src}
                    alt={section.alt || "Story content"}
                    className={mediaClassName}
                  />
                </div>
              </div>

              <div className="text-content">
                {nextSection.type === "paragraph" && (
                  <div className="mb-4">
                    {(nextSection.content || "")
                      .split("\n\n")
                      .map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraphIndex}
                          className={PARAGRAPH_CLASS}
                          dangerouslySetInnerHTML={{
                            __html: convertMarkdownFormatting(paragraph),
                          }}
                        />
                      ))}
                  </div>
                )}

                {nextSection.type === "quote" && (
                  <blockquote
                    className={QUOTE_CLASS}
                    dangerouslySetInnerHTML={{
                      __html: convertMarkdownFormatting(
                        nextSection.content || "",
                      ),
                    }}
                  />
                )}
              </div>

              <div className="clear-both" />
            </div>
          </div>
        );
      }

      return (
        <div className="my-6 sm:my-8 flex justify-center min-w-0">
          <div
            className={
              isVideoSrc(section.src)
                ? "relative aspect-video w-full max-w-3xl max-h-[50vh] sm:max-h-[70vh]"
                : "relative aspect-[4/3] w-full max-w-md sm:max-w-lg sm:aspect-auto sm:h-60"
            }
          >
            <StoryMedia
              src={section.src}
              alt={section.alt || "Story content"}
              className={mediaClassName}
            />
          </div>
        </div>
      );
    }

    case "bridge":
      return (
        <p
          className={`${TEXT_MUTED} my-8 sm:my-10 text-center italic leading-relaxed px-2`}
        >
          {section.content}
        </p>
      );

    case "divider":
      return (
        <hr
          className="my-10 sm:my-12 border-0 border-t border-light-border/55 dark:border-dark-border/40"
          aria-hidden
        />
      );

    default:
      return null;
  }
};

export default StructuredContentRenderer;

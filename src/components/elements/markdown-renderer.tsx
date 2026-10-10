import React from "react";
import { Link } from "react-router-dom";
import { SITE_URL } from "data/site-config";

// Types
interface MarkdownRendererProps {
  content: string;
  className?: string;
  variant?: "default" | "compact";
}

interface LinkProps {
  href: string;
  target: string;
  rel: string;
  className: string;
}

type MarkdownType = "code" | "bold" | "italic" | "link";

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
  variant = "default",
}) => {
  const isCompact = variant === "compact";

  const LINK_CLASSES = isCompact
    ? "underline underline-offset-2 text-current hover:text-current/90 transition-colors duration-200"
    : "text-emerald-700 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 font-medium underline decoration-2 underline-offset-2 hover:decoration-emerald-700 dark:hover:decoration-emerald-300";

  // Helper function to get link properties based on URL
  const getLinkProps = (url: string): LinkProps => {
    const isMailto = url.startsWith("mailto:");
    const isTel = url.startsWith("tel:");
    const isInternal = url.startsWith("/") || url.startsWith(SITE_URL);
    const isExternal = !isMailto && !isTel && !isInternal;

    return {
      href: url,
      target: isExternal ? "_blank" : "_self",
      rel: isExternal ? "noopener noreferrer" : "",
      className: LINK_CLASSES,
    };
  };

  // Helper function to render markdown elements
  const renderMarkdownElement = (
    type: MarkdownType,
    elementContent: string,
    index: number,
    url?: string,
  ): JSX.Element => {
    switch (type) {
      case "bold":
        return (
          <strong
            key={index}
            className={
              isCompact
                ? "font-semibold text-inherit"
                : "font-semibold text-heading"
            }
          >
            {elementContent}
          </strong>
        );
      case "italic":
        return (
          <em
            key={index}
            className={isCompact ? "italic text-inherit" : "italic text-body"}
          >
            {elementContent}
          </em>
        );
      case "code":
        return (
          <code
            key={index}
            className={
              isCompact
                ? "bg-white/10 dark:bg-slate-800/80 text-inherit px-1.5 py-0.5 rounded font-mono text-[0.8rem]"
                : "bg-gray-100 dark:bg-gray-800 text-body px-2 py-1 rounded text-sm font-mono"
            }
          >
            {elementContent}
          </code>
        );
      case "link":
        if (!url) return <span key={index}>{elementContent}</span>;
        const linkProps = getLinkProps(url);
        if (
          linkProps.target === "_self" &&
          !linkProps.rel &&
          !/^(mailto|tel):/.test(url)
        ) {
          // Internal: client-side navigation instead of a full page reload.
          const path = url.startsWith(SITE_URL)
            ? url.slice(SITE_URL.length) || "/"
            : url;
          return (
            <Link key={index} to={path} className={linkProps.className}>
              {elementContent}
            </Link>
          );
        }
        return (
          <a
            key={index}
            href={linkProps.href}
            target={linkProps.target}
            rel={linkProps.rel}
            className={linkProps.className}
          >
            {elementContent}
          </a>
        );
      default:
        return <span key={index}>{elementContent}</span>;
    }
  };

  const parseInlineMarkdown = (text: string): (JSX.Element | string)[] => {
    const MARKDOWN_REGEX =
      /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`|_[^_]+_)/g;
    const parts = text.split(MARKDOWN_REGEX);

    return parts.map((part, index) => {
      // Skip empty parts
      if (!part) return "";

      // Check for bold text
      if (part.startsWith("**") && part.endsWith("**")) {
        return renderMarkdownElement("bold", part.slice(2, -2), index);
      }

      // Check for italic text
      if (part.startsWith("_") && part.endsWith("_")) {
        return renderMarkdownElement("italic", part.slice(1, -1), index);
      }

      // Check for code
      if (part.startsWith("`") && part.endsWith("`")) {
        return renderMarkdownElement("code", part.slice(1, -1), index);
      }

      // Check for links
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        return renderMarkdownElement("link", linkText, index, url);
      }

      return part;
    });
  };

  const parseContent = (text: string): (JSX.Element | null)[] => {
    // Split content into paragraphs and process each
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim() !== "");

    return paragraphs
      .map((paragraph, paragraphIndex) => {
        const trimmedParagraph = paragraph.trim();
        if (trimmedParagraph === "") return null;

        // Check if it's a heading
        if (trimmedParagraph.startsWith("## ")) {
          const headingText = trimmedParagraph.replace("## ", "");
          return (
            <h2
              key={paragraphIndex}
              className={
                isCompact
                  ? "text-lg font-semibold text-inherit mb-2 mt-4 first:mt-0 leading-tight"
                  : "text-2xl md:text-3xl font-bold text-heading mb-4 mt-8 first:mt-0 leading-tight"
              }
            >
              {headingText}
            </h2>
          );
        }

        if (trimmedParagraph.startsWith("### ")) {
          const headingText = trimmedParagraph.replace("### ", "");
          return (
            <h3
              key={paragraphIndex}
              className={
                isCompact
                  ? "text-base font-semibold text-inherit my-2 leading-tight"
                  : "text-xl md:text-2xl font-semibold text-body my-4 leading-tight"
              }
            >
              {headingText}
            </h3>
          );
        }

        // Check if it's a list
        if (trimmedParagraph.startsWith("- ")) {
          const listItems = trimmedParagraph
            .split("\n")
            .filter((line) => line.trim().startsWith("- "))
            .map((item) => item.replace(/^-\s*/, "").trim());

          return (
            <ul
              key={paragraphIndex}
              className={isCompact ? "space-y-1.5" : "mb-6 space-y-3"}
            >
              {listItems.map((cleanItem, itemIndex) => (
                <li
                  key={itemIndex}
                  className={
                    isCompact
                      ? "flex items-start gap-2 text-sm leading-relaxed text-inherit"
                      : "flex items-start gap-2.5"
                  }
                >
                  <span
                    className={
                      isCompact
                        ? "mt-1 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current/70"
                        : "flex-shrink-0 w-1.5 mt-2.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"
                    }
                  />
                  <span
                    className={
                      isCompact ? "text-inherit" : "text-body leading-relaxed"
                    }
                  >
                    {parseInlineMarkdown(cleanItem)}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        // For regular paragraphs, split by single line breaks to create proper paragraph spacing
        const paragraphLines = trimmedParagraph
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line !== "");

        return (
          <div
            key={paragraphIndex}
            className={isCompact ? "space-y-2" : "mb-4"}
          >
            {paragraphLines.map((line, lineIndex) => (
              <p
                key={lineIndex}
                className={
                  isCompact
                    ? "text-inherit text-sm leading-relaxed"
                    : "text-body leading-relaxed mb-4 text-lg"
                }
              >
                {parseInlineMarkdown(line)}
              </p>
            ))}
          </div>
        );
      })

      .filter(Boolean);
  };

  const containerClass = `${isCompact ? "space-y-2" : ""} ${className}`.trim();

  return <div className={containerClass}>{parseContent(content)}</div>;
};

export default MarkdownRenderer;

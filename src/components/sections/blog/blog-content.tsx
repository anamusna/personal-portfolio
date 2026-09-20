import React from "react";
import { P } from "../../../tailwind/components/elements/Typography";

interface BlogContentProps {
  content: {
    sections: Array<{
      type: "heading" | "paragraph" | "code" | "list" | "quote" | "image";
      content?: string;
      level?: number;
      language?: string;
      items?: string[];
      author?: string;
      imageUrl?: string;
      imageAlt?: string;
    }>;
  };
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const renderCodeBlock = (code: string, language?: string) => {
    return (
      <div className="relative group">
        <div className="absolute top-0 right-0 bg-gray-800 dark:bg-gray-700 text-gray-300 text-sm px-2 py-1 rounded-bl-lg rounded-tr-lg">
          {language || "code"}
        </div>
        <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-sm sm:text-sm leading-relaxed border border-gray-700 dark:border-gray-600 shadow-md">
          <code className="font-mono">{code}</code>
        </pre>
      </div>
    );
  };

  const renderHeading = (content: string, level: number) => {
    const baseClasses =
      "font-bolder text-heading mb-3 sm:mb-4 mt-6 sm:mt-8 first:mt-0";
    const levelClasses = {
      1: "text-xl sm:text-2xl lg:text-3xl",
      2: "text-lg sm:text-xl lg:text-2xl",
      3: "text-base sm:text-lg lg:text-xl",
      4: "text-sm sm:text-base lg:text-lg",
      5: "text-base sm:text-lg lg:text-xl",
    };

    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
      <HeadingTag
        className={`${baseClasses} ${
          levelClasses[level as keyof typeof levelClasses] || levelClasses[5]
        }`}
      >
        {content}
      </HeadingTag>
    );
  };

  const renderList = (items: string[]) => {
    return (
      <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <span className="flex-shrink-0 w-1.5 mt-2.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
            <span className="text-body leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const renderQuote = (content: string, author?: string) => {
    return (
      <blockquote className="border-l-4 border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10 p-3 sm:p-4 my-4 sm:my-6 rounded-r-lg">
        <P className="text-body italic text-base sm:text-lg leading-relaxed mb-1.5">
          "{content}"
        </P>
        {author && (
          <cite className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
            {author}
          </cite>
        )}
      </blockquote>
    );
  };

  const renderImage = (imageUrl: string, imageAlt: string) => {
    return (
      <div className="my-4 sm:my-6">
        <div className="relative group overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
          <img
            src={imageUrl}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        {imageAlt && (
          <p className="text-sm text-muted mt-1.5 italic text-center">
            {imageAlt}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none">
      <div className="space-y-4 sm:space-y-6">
        {content.sections.map((section, index) => {
          switch (section.type) {
            case "heading":
              // Skip the first H1 heading since it's already displayed in the hero section
              if (index === 0 && section.level === 1) {
                return null;
              }
              return (
                <div key={index}>
                  {renderHeading(section.content || "", section.level || 2)}
                </div>
              );

            case "paragraph":
              return (
                <div key={index}>
                  <P className="text-body leading-relaxed mb-3 sm:mb-4">
                    {section.content || ""}
                  </P>
                </div>
              );

            case "code":
              return (
                <div key={index} className="my-4 sm:my-6">
                  {renderCodeBlock(section.content || "", section.language)}
                </div>
              );

            case "list":
              return <div key={index}>{renderList(section.items || [])}</div>;

            case "quote":
              return (
                <div key={index}>
                  {renderQuote(section.content || "", section.author)}
                </div>
              );

            case "image":
              return (
                <div key={index}>
                  {renderImage(section.imageUrl || "", section.imageAlt || "")}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default BlogContent;

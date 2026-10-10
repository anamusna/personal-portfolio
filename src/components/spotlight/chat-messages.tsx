import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import MarkdownRenderer from "components/elements/markdown-renderer";
import TypingText from "components/spotlight/typing-text";
import { SpotlightChatMessage } from "./types";
import TypingIndicator from "./typing-indicator";

interface ChatMessagesProps {
  messages: SpotlightChatMessage[];
  isSearching: boolean;
}

const stripAssistantTitles = (content: string) => {
  const lines = content.split("\n");
  let startIdx = 0;
  while (
    startIdx < lines.length &&
    /^\s*\*\*.+\*\*\s*$/.test(lines[startIdx].trim())
  ) {
    startIdx++;
  }

  return lines.slice(startIdx).join("\n").replace(/^\n+/, "");
};

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isSearching,
}) => {
  if (!messages.length && !isSearching) {
    return null;
  }

  return (
    <motion.div
      className="space-y-4"
      initial={false}
      role="log"
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {messages.map((message, index) => {
          const isUser = message.role === "user";
          const shouldAnimate = !isUser;
          const content = shouldAnimate
            ? stripAssistantTitles(message.content)
            : message.content;

          return (
            <motion.div
              key={`${message.role}-${index}-${message.timestamp}`}
              initial={{ opacity: 0, x: isUser ? 20 : -20, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -4 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 30,
                mass: 0.7,
              }}
              className={clsx("flex", isUser ? "justify-end" : "justify-start")}
            >
              <div
                className={clsx(
                  "rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-lg",
                  isUser
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-800/80 text-slate-100 dark:bg-slate-800/90",
                )}
              >
                {!isUser ? (
                  <>
                    {/* Screen readers get the whole answer at once; the
                      typed-out copy would be announced in fragments. */}
                    <span className="sr-only">
                      {content
                        .replace(/\*\*|`|_/g, "")
                        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}
                    </span>
                    <span aria-hidden="true">
                      <TypingText
                        text={content}
                        typingSpeed={20}
                        pauseDuration={1600}
                        deletingSpeed={30}
                        loop={false}
                        className="block text-sm leading-relaxed text-inherit"
                        showCursor={false}
                        hideCursorWhileTyping
                        cursorClassName="ml-1 h-[1.1em] w-px bg-current inline-block align-bottom"
                      />
                    </span>
                  </>
                ) : (
                  <MarkdownRenderer
                    content={content}
                    variant="compact"
                    className="text-sm leading-relaxed text-inherit [&_p]:m-0 [&_ul]:m-0"
                  />
                )}
              </div>
            </motion.div>
          );
        })}

        {isSearching ? (
          <motion.div
            key="typing-indicator"
            initial={{ opacity: 0, x: -20, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 30,
              mass: 0.7,
            }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-3 rounded-3xl bg-slate-800/70 px-4 py-3">
              <TypingIndicator />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default React.memo(ChatMessages);

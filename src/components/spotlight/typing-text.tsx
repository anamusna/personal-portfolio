import MarkdownRenderer from "components/elements/markdown-renderer";
import {
  createElement,
  ElementType,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface TypingTextProps extends HTMLAttributes<HTMLElement> {
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  deletingSpeed?: number;
  variableSpeed?: { min: number; max: number };
  pauseDuration?: number;
  initialDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  startOnVisible?: boolean;
  reverseMode?: boolean;
  onSentenceComplete?: (sentence: string, index: number) => void;
}

const DEFAULT_BLINK_DURATION = 0.6;

export const TypingText = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  initialDelay = 0,
  loop = true,
  showCursor = false,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = DEFAULT_BLINK_DURATION,
  textColors = [],
  variableSpeed,
  startOnVisible = false,
  reverseMode = false,
  onSentenceComplete,
  className = "",
  ...props
}: TypingTextProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const textArray = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );

  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) {
      return typingSpeed;
    }
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const currentColor = useMemo(() => {
    if (!textColors.length) {
      return "currentColor";
    }
    return textColors[currentTextIndex % textColors.length];
  }, [currentTextIndex, textColors]);

  const processedText = useMemo(() => {
    const current = textArray[currentTextIndex] ?? "";
    if (reverseMode) {
      return current.split("").reverse().join("");
    }
    return current;
  }, [currentTextIndex, textArray, reverseMode]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!showCursor || prefersReducedMotion) {
      setIsCursorVisible(true);
      return;
    }

    const interval = window.setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, Math.max(100, cursorBlinkDuration * 1000));

    return () => window.clearInterval(interval);
  }, [showCursor, cursorBlinkDuration, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(processedText);
      setCurrentCharIndex(processedText.length);
      setIsDeleting(false);
      return;
    }

    if (!isVisible) {
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      if (isDeleting) {
        if (displayedText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentCharIndex(0);
          setCurrentTextIndex((prev) => {
            const nextIndex = prev + 1;
            return nextIndex >= textArray.length ? 0 : nextIndex;
          });
        }
        return;
      }

      if (currentCharIndex < processedText.length) {
        timeout = setTimeout(
          () => {
            setDisplayedText((prev) => prev + processedText[currentCharIndex]);
            setCurrentCharIndex((prev) => prev + 1);
          },
          variableSpeed ? getRandomSpeed() : typingSpeed
        );
        return;
      }

      onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex);

      const isAtLastSentence = currentTextIndex === textArray.length - 1;
      if (!loop && isAtLastSentence) {
        return;
      }

      timeout = setTimeout(() => {
        if (textArray.length > 1) {
          setIsDeleting(true);
        } else if (loop) {
          setDisplayedText("");
          setCurrentCharIndex(0);
        }
      }, pauseDuration);
    };

    if (
      currentCharIndex === 0 &&
      displayedText === "" &&
      !isDeleting &&
      initialDelay > 0
    ) {
      timeout = setTimeout(startTyping, initialDelay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    currentTextIndex,
    deletingSpeed,
    displayedText,
    getRandomSpeed,
    initialDelay,
    isDeleting,
    isVisible,
    loop,
    onSentenceComplete,
    pauseDuration,
    prefersReducedMotion,
    processedText,
    textArray,
    typingSpeed,
    variableSpeed,
  ]);

  useEffect(() => {
    // Reset typing when text array changes length or content.
    setDisplayedText("");
    setCurrentCharIndex(0);
    setCurrentTextIndex(0);
    setIsDeleting(false);
  }, [textArray]);

  const cursorShouldHide =
    hideCursorWhileTyping &&
    !isDeleting &&
    currentCharIndex < processedText.length;

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      style: {
        ...((props.style as Record<string, unknown> | undefined) ?? {}),
        color: currentColor,
      },
      ...props,
    },
    <MarkdownRenderer
      content={displayedText}
      variant="compact"
      className="text-sm leading-relaxed text-inherit [&_p]:m-0 [&_ul]:m-0"
    />,
    showCursor && (
      <span
        aria-hidden="true"
        className={`inline-block align-bottom ${
          cursorShouldHide || !isCursorVisible ? "opacity-0" : "opacity-100"
        } ${cursorClassName}`}
        style={
          cursorCharacter === "|"
            ? {
                backgroundColor: "currentColor",
                height: "1em",
                width: "1px",
                marginLeft: "2px",
              }
            : undefined
        }
      >
        {cursorCharacter === "|" ? "" : cursorCharacter}
      </span>
    )
  );
};

export default TypingText;

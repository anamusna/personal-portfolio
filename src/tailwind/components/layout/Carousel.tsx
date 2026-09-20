import clsx from "clsx";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useEnvironmentSettings } from "../../../context/EnvironmentContext";

export interface CarouselItem {
  id: string | number;
  content: ReactNode;
  tagImage?: {
    carouselTag: string;
  };
}

interface CarouselProps {
  items: CarouselItem[];
  interval?: number;
  autoPlay?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
  rounded?: boolean;
  tag?: any;
  theme?: "light" | "dark";
  reducedMotion?: boolean;
  onSlideChange?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  interval = 5000,
  autoPlay = true,
  showControls = true,
  showIndicators = true,
  className = "",
  rounded = true,
  tag,
  theme: propTheme,
  reducedMotion: propReducedMotion,
  onSlideChange,
}) => {
  const { t } = useTranslation("ansumana");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const { theme: contextTheme } = useEnvironmentSettings();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const reducedMotion = propReducedMotion ?? prefersReducedMotion;

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Minimum distance for a swipe to be considered valid
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const previousSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  }, [items.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      onSlideChange?.(index);
    },
    [onSlideChange]
  );

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart) return;

      const currentTouch = e.targetTouches[0].clientX;
      const diff = touchStart - currentTouch;
      setTouchEnd(currentTouch);
      setDragOffset(diff);
    },
    [touchStart]
  );

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      previousSlide();
    }

    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
    setDragOffset(0);
  }, [touchStart, touchEnd, minSwipeDistance, nextSlide, previousSlide]);

  // Mouse event handlers for desktop drag support
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsDragging(true);
    setDragOffset(0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!touchStart || !isDragging) return;

      const currentX = e.clientX;
      const diff = touchStart - currentX;
      setTouchEnd(currentX);
      setDragOffset(diff);
    },
    [touchStart, isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      previousSlide();
    }

    // Reset states
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
    setDragOffset(0);
  }, [touchStart, touchEnd, minSwipeDistance, nextSlide, previousSlide]);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying && !reducedMotion) {
      intervalId = setInterval(nextSlide, interval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, interval, nextSlide, reducedMotion]);

  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  const baseClasses = "relative w-full";
  const combinedClasses = clsx(baseClasses, className);

  return (
    <div
      ref={carouselRef}
      data-theme={propTheme ?? contextTheme}
      className={combinedClasses}
      aria-roledescription="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <div
        className={clsx(
          "relative h-full overflow-hidden transition-transform duration-200",
          rounded && "rounded-3xl sm:rounded-[2rem]",
          isDragging && "cursor-grabbing",
        )}
        style={{
          transform: `translateX(${dragOffset * 0.1}px)`,
        }}
      >
        {/* Drag feedback overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-40 pointer-events-none bg-black/5 dark:bg-white/5" />
        )}

        {/* Slides container */}
        <div className="relative h-full">
          {items.map((item, index) => (
            <div key={item.id}>
              <div
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0 z-10"
                    : index === (currentIndex + 1) % items.length
                    ? "opacity-0 translate-x-full z-0"
                    : index === (currentIndex - 1 + items.length) % items.length
                    ? "opacity-0 -translate-x-full z-0"
                    : "opacity-0 translate-x-full z-0"
                }`}
                aria-hidden={index !== currentIndex}
                role="group"
                aria-roledescription="slide"
                style={{
                  transform:
                    isDragging && index === currentIndex
                      ? `translateX(${dragOffset * 0.1}px)`
                      : undefined,
                }}
              >
                {item.content}
              </div>

              {item.tagImage && (
                <button
                  type="button"
                  className="absolute bottom-4 right-4 z-30 flex items-center justify-center rounded-xl
                           surface-card p-3 border border-light-border/55 dark:border-dark-border/40
                           transition-colors hover:bg-light-elevated/80 dark:hover:bg-dark-surface/80 cursor-pointer min-h-[48px] min-w-[48px]"
                >
                  <img
                    src={item.tagImage?.carouselTag}
                    alt={t("a11y.shared.carouselTag")}
                    width={32}
                    height={32}
                    loading="lazy"
                    decoding="async"
                    className="h-6 w-6 sm:h-8 sm:w-8 dark:invert"
                  />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Controls */}
        {showControls && (
          <>
            <button
              type="button"
              className="group absolute left-4 sm:left-6 top-1/2 z-30 -translate-y-1/2 cursor-pointer
                       surface-card border border-light-border/55 dark:border-dark-border/40 rounded-xl p-3 sm:p-4
                       transition-colors hover:bg-light-elevated/80 dark:hover:bg-dark-surface/80
                       focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary-dark/20
                       min-h-[48px] min-w-[48px]"
              onClick={previousSlide}
              aria-label={t("a11y.shared.previousSlide")}
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 text-body group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
            <button
              type="button"
              className="group absolute right-4 sm:right-6 top-1/2 z-30 -translate-y-1/2 cursor-pointer
                       surface-card border border-light-border/55 dark:border-dark-border/40 rounded-xl p-3 sm:p-4
                       transition-colors hover:bg-light-elevated/80 dark:hover:bg-dark-surface/80
                       focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary-dark/20
                       min-h-[48px] min-w-[48px]"
              onClick={nextSlide}
              aria-label={t("a11y.shared.nextSlide")}
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 text-body group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </>
        )}

        {/* Enhanced Indicators */}
        {showIndicators && (
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 z-30 flex -translate-x-1/2 space-x-3 surface-card px-4 py-3 rounded-xl border border-light-border/55 dark:border-dark-border/40">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full transition-colors cursor-pointer min-h-[16px] min-w-[16px] ${
                  index === currentIndex
                    ? "bg-primary-light dark:bg-primary-dark"
                    : "bg-light-border/60 dark:bg-dark-border/60 hover:bg-light-text/40 dark:hover:bg-dark-text/40"
                }`}
                aria-label={t("a11y.shared.goToSlide", { index: index + 1 })}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Pause/Play button */}
      <button
        type="button"
        className="group absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-30 flex items-center justify-center
                 surface-card border border-light-border/55 dark:border-dark-border/40 rounded-xl p-3 sm:p-4
                 transition-colors hover:bg-light-elevated/80 dark:hover:bg-dark-surface/80
                 focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary-dark/20
                 min-h-[48px] min-w-[48px]"
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label={
          isPlaying ? t("common.actions.pause") : t("common.actions.play")
        }
      >
        {isPlaying ? (
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5 text-body group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 10 12"
          >
            <path d="M2 0h2v12H2zm4 0h2v12H6z" />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5 text-body group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path d="M3 0v12l6-6z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Carousel;

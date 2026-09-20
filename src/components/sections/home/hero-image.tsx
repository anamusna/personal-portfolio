import React, { memo, useCallback, useState } from "react";
import { HERO_CONTENT } from "data/heroData";
import ansuImage from "images/ansu2.webp";
import { useTranslation } from "react-i18next";
import { P } from "tailwind/components/elements/Typography";
import Image from "components/image";

interface HeroImageProps {
  src?: string;
  alt?: string;
  className?: string;
  showStats?: boolean;
}

const HeroImage: React.FC<HeroImageProps> = memo(
  ({
    src = ansuImage,
    alt,
    className = "",
    showStats = true,
  }) => {
    const { t } = useTranslation("ansumana");
    const imageAlt = alt ?? t("a11y.about.heroImageAlt");
    // This image is always rendered with priority/eager loading (see below)
    // and is present, already loaded, in the prerendered HTML for every
    // route that ships this component. Starting these both `false` and
    // flipping them on the image's onLoad meant the client's first render
    // (spinner visible, image hidden) never matched the prerendered markup
    // (image already loaded and visible) — a guaranteed hydration mismatch
    // on every page load. Defaulting to the loaded state matches what's
    // already true for a priority image and keeps hydration consistent;
    // onError below still recovers gracefully if the image genuinely fails.
    const [imageLoaded, setImageLoaded] = useState(true);
    const [showContent, setShowContent] = useState(true);

    const handleLoad = useCallback(() => {
      setImageLoaded(true);
      setTimeout(() => setShowContent(true), 50);
    }, []);

    const handleError = useCallback(() => {
      setImageLoaded(true);
      setShowContent(true);
    }, []);

    return (
      <div className={`relative w-full ${className}`}>
        {!imageLoaded && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-light-elevated dark:bg-dark-surface rounded-2xl min-h-[280px] sm:min-h-[320px]"
            aria-hidden="true"
          >
            <div className="w-10 h-10 border-2 border-light-border dark:border-dark-border border-t-royal-primary rounded-full animate-spin" />
          </div>
        )}

        <div
          className={`transition-opacity duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="surface-card rounded-2xl p-2 sm:p-3 border border-light-border/55 dark:border-dark-border/40">
            <Image
              variant="minimal"
              src={src}
              alt={imageAlt}
              aspectRatio="portrait"
              objectFit="contain"
              rounded="2xl"
              shadow="sm"
              priority={true}
              loading="eager"
              animate={false}
              hoverEffect={false}
              onLoad={handleLoad}
              onError={handleError}
            />
          </div>
        </div>

        {showStats && imageLoaded && (
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-full max-w-[280px] sm:max-w-xs px-4 transition-opacity duration-500 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {HERO_CONTENT.STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="surface-card rounded-xl p-3 sm:p-4 border border-light-border/55 dark:border-dark-border/40"
                >
                  <div className="text-center space-y-1">
                    <div className="text-lg sm:text-xl opacity-90" aria-hidden="true">
                      {stat.icon}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-heading">
                      {stat.number}
                    </div>
                    <P className="text-xs sm:text-sm text-body font-medium">
                      {stat.label}
                    </P>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

HeroImage.displayName = "HeroImage";

export default HeroImage;

import React, { memo } from "react";
import ansuImage from "images/ansu2.webp";
import ansuImageSmall from "images/ansu2-640.webp";
import { useTranslation } from "react-i18next";
import Image from "components/image";

interface HeroImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

const HeroImage: React.FC<HeroImageProps> = memo(
  ({ src = ansuImage, alt, className = "" }) => {
    const { t } = useTranslation("ansumana");
    const imageAlt = alt ?? t("a11y.about.heroImageAlt");

    return (
      <div className={`relative w-full ${className}`}>
        <div className="surface-card rounded-2xl p-2 sm:p-3 border border-light-border/55 dark:border-dark-border/40">
          <Image
            src={src}
            srcSet={
              src === ansuImage
                ? `${ansuImageSmall} 640w, ${ansuImage} 1200w`
                : undefined
            }
            // Measured rendered widths: ~88vw on phones, 422-446px on
            // tablets and small laptops, 486px from 1280px up.
            sizes="(min-width: 1280px) 486px, (min-width: 640px) 446px, 88vw"
            alt={imageAlt}
            aspectRatio="portrait"
            objectFit="contain"
            rounded="2xl"
            shadow="sm"
            priority={true}
          />
        </div>
      </div>
    );
  },
);

HeroImage.displayName = "HeroImage";

export default HeroImage;

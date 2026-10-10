import clsx from "clsx";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

export type ImageProps = {
  src: string;
  /** Responsive candidates, e.g. `small.webp 640w, large.webp 1200w`. */
  srcSet?: string;
  /** Rendered width hints for `srcSet`. */
  sizes?: string;
  /** Required. Pass "" for a purely decorative image. */
  alt: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "auto";
  objectFit?: "cover" | "contain";
  rounded?: "xl" | "2xl";
  shadow?: "sm" | "lg";
  /** Soft colour glow behind the image. */
  glow?: boolean;
  /** Above-the-fold image: load eagerly and render visible from the start. */
  priority?: boolean;
};

const ASPECT_RATIO = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  auto: "",
};

const OBJECT_FIT = {
  cover: "object-cover",
  contain: "object-contain",
};

const ROUNDED = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl sm:rounded-3xl",
};

const SHADOW = {
  sm: "shadow-sm",
  lg: "shadow-lg",
};

const Image: React.FC<ImageProps> = memo(
  ({
    src,
    srcSet,
    sizes,
    alt,
    className = "",
    aspectRatio = "auto",
    objectFit = "cover",
    rounded = "2xl",
    shadow = "lg",
    glow = false,
    priority = false,
  }) => {
    // A priority image is already loaded in the prerendered HTML, so it starts
    // visible; starting hidden would not match that markup on hydration.
    // Other images fade in once they have loaded.
    const [isLoaded, setIsLoaded] = useState(priority);
    const imageRef = useRef<HTMLImageElement>(null);

    // A `load` event that fires before React hydrates never reaches onLoad,
    // so check the element itself once mounted.
    useEffect(() => {
      if (imageRef.current?.complete) setIsLoaded(true);
    }, []);

    const handleSettled = useCallback(() => setIsLoaded(true), []);

    return (
      <div
        className={clsx(
          "relative flex w-full h-full justify-center",
          ASPECT_RATIO[aspectRatio],
        )}
      >
        {glow && (
          <div aria-hidden="true" className={isLoaded ? "contents" : "hidden"}>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-purple-500/40 to-rose-500/30 dark:from-violet-400/40 dark:via-purple-400/50 dark:to-rose-400/40 rounded-full blur-3xl opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 via-purple-500/25 to-rose-400/20 dark:from-violet-300/30 dark:via-purple-400/35 dark:to-rose-300/30 rounded-full blur-2xl opacity-60" />
          </div>
        )}
        <img
          ref={imageRef}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleSettled}
          onError={handleSettled}
          className={clsx(
            "relative z-10 w-full h-full transition-opacity duration-300",
            OBJECT_FIT[objectFit],
            ROUNDED[rounded],
            SHADOW[shadow],
            !isLoaded && "opacity-0",
            className,
          )}
        />
      </div>
    );
  },
);

Image.displayName = "Image";

export default Image;

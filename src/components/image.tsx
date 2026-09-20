import clsx from "clsx";
import React, { memo, useCallback, useMemo, useState } from "react";
import ansuImage from "images/ansu6-b.webp";

export type ImageProps = {
  src?: string;
  alt?: string;
  fluid?: boolean;
  className?: string;
  variant?: "default" | "premium" | "minimal" | "hero" | "card" | "avatar";
  theme?: "light" | "dark";
  colorScheme?:
    | "violet-purple-rose"
    | "blue-indigo-purple"
    | "emerald-teal-cyan"
    | "orange-amber-yellow"
    | "pink-rose-fuchsia"
    | "slate-gray-zinc"
    | "custom";
  align?: "left" | "right" | "center" | "none";
  picture?: boolean;
  size?: "thumbnail" | "sm" | "md" | "lg" | "xl" | "full";
  shape?: "rounded" | "circle" | "square";
  caption?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  border?: boolean;
  borderColor?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "auto";
  loading?: "lazy" | "eager";
  priority?: boolean;
  showParticles?: boolean;
  showOverlay?: boolean;
  hoverEffect?: boolean;
  animate?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  // Custom color props
  backgroundColor?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  particleColor?: string;
  overlayColor?: string;
};

// Size mapping for consistent sizing across the app
const getSizeClasses = (size: ImageProps["size"], fluid: boolean) => {
  if (fluid) return "w-full h-full";

  const sizes = {
    thumbnail: "w-16 h-16 sm:w-20 sm:h-20",
    sm: "w-24 h-24 sm:w-32 sm:h-32",
    md: "w-48 h-48 sm:w-64 sm:h-64",
    lg: "w-64 h-64 sm:w-80 sm:h-80",
    xl: "w-80 h-80 sm:w-96 sm:h-96",
    full: "w-full h-full",
  };

  return sizes[size || "full"] || sizes.full;
};

// Alignment mapping
const getAlignmentClasses = (align: ImageProps["align"]) => {
  const alignments = {
    left: "mr-auto",
    right: "ml-auto",
    center: "mx-auto",
    none: "",
  };

  return alignments[align || "none"] || alignments.none;
};

// Aspect ratio mapping
const getAspectRatioClasses = (aspectRatio: ImageProps["aspectRatio"]) => {
  const ratios = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    auto: "",
  };

  return ratios[aspectRatio || "auto"] || ratios.auto;
};

// Rounded corners mapping
const getRoundedClasses = (rounded: ImageProps["rounded"]) => {
  const roundings = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl sm:rounded-3xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };

  return roundings[rounded || "2xl"] || roundings["2xl"];
};

// Shadow mapping
const getShadowClasses = (shadow: ImageProps["shadow"]) => {
  const shadows = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  };

  return shadows[shadow || "2xl"] || shadows["2xl"];
};

// Shape mapping - overrides rounded prop when specified
const getShapeClasses = (shape: ImageProps["shape"]) => {
  const shapes = {
    rounded: "rounded-2xl sm:rounded-3xl",
    circle: "rounded-full",
    square: "rounded-none",
  };

  return shape ? shapes[shape] : null;
};

// Variant mapping - defines visual style presets
const getVariantStyles = (
  variant: ImageProps["variant"]
): {
  shadow: ImageProps["shadow"];
  border: boolean;
  showParticles: boolean;
  showOverlay: boolean;
  hoverEffect: boolean;
  animate: boolean;
} => {
  const variants = {
    default: {
      shadow: "lg" as const,
      border: false,
      showParticles: false,
      showOverlay: false,
      hoverEffect: false,
      animate: false,
    },
    premium: {
      shadow: "lg" as const,
      border: true,
      showParticles: false,
      showOverlay: false,
      hoverEffect: false,
      animate: false,
    },
    minimal: {
      shadow: "md" as const,
      border: false,
      showParticles: false,
      showOverlay: false,
      hoverEffect: false,
      animate: false,
    },
    hero: {
      shadow: "lg" as const,
      border: false,
      showParticles: false,
      showOverlay: false,
      hoverEffect: false,
      animate: false,
    },
    card: {
      shadow: "lg" as const,
      border: true,
      showParticles: false,
      showOverlay: true,
      hoverEffect: true,
      animate: false,
    },
    avatar: {
      shadow: "md" as const,
      border: true,
      showParticles: false,
      showOverlay: false,
      hoverEffect: false,
      animate: false,
    },
  };

  return variants[variant || "default"];
};

// Color scheme mapping
const getColorSchemeGradients = (colorScheme: ImageProps["colorScheme"]) => {
  const schemes = {
    "violet-purple-rose": {
      primary: "from-violet-500/30 via-purple-500/40 to-rose-500/30",
      secondary: "from-violet-400/20 via-purple-500/25 to-rose-400/20",
      darkPrimary:
        "dark:from-violet-400/40 dark:via-purple-400/50 dark:to-rose-400/40",
      darkSecondary:
        "dark:from-violet-300/30 dark:via-purple-400/35 dark:to-rose-300/30",
      particles: ["bg-violet-400/40", "bg-purple-400/40", "bg-rose-400/40"],
      particlesDark: [
        "dark:bg-violet-300/60",
        "dark:bg-purple-300/60",
        "dark:bg-rose-300/60",
      ],
    },
    "blue-indigo-purple": {
      primary: "from-blue-500/30 via-indigo-500/40 to-purple-500/30",
      secondary: "from-blue-400/20 via-indigo-500/25 to-purple-400/20",
      darkPrimary:
        "dark:from-blue-400/40 dark:via-indigo-400/50 dark:to-purple-400/40",
      darkSecondary:
        "dark:from-blue-300/30 dark:via-indigo-400/35 dark:to-purple-300/30",
      particles: ["bg-blue-400/40", "bg-indigo-400/40", "bg-purple-400/40"],
      particlesDark: [
        "dark:bg-blue-300/60",
        "dark:bg-indigo-300/60",
        "dark:bg-purple-300/60",
      ],
    },
    "emerald-teal-cyan": {
      primary: "from-emerald-500/30 via-teal-500/40 to-cyan-500/30",
      secondary: "from-emerald-400/20 via-teal-500/25 to-cyan-400/20",
      darkPrimary:
        "dark:from-emerald-400/40 dark:via-teal-400/50 dark:to-cyan-400/40",
      darkSecondary:
        "dark:from-emerald-300/30 dark:via-teal-400/35 dark:to-cyan-300/30",
      particles: ["bg-emerald-400/40", "bg-teal-400/40", "bg-cyan-400/40"],
      particlesDark: [
        "dark:bg-emerald-300/60",
        "dark:bg-teal-300/60",
        "dark:bg-cyan-300/60",
      ],
    },
    "orange-amber-yellow": {
      primary: "from-orange-500/30 via-amber-500/40 to-yellow-500/30",
      secondary: "from-orange-400/20 via-amber-500/25 to-yellow-400/20",
      darkPrimary:
        "dark:from-orange-400/40 dark:via-amber-400/50 dark:to-yellow-400/40",
      darkSecondary:
        "dark:from-orange-300/30 dark:via-amber-400/35 dark:to-yellow-300/30",
      particles: ["bg-orange-400/40", "bg-amber-400/40", "bg-yellow-400/40"],
      particlesDark: [
        "dark:bg-orange-300/60",
        "dark:bg-amber-300/60",
        "dark:bg-yellow-300/60",
      ],
    },
    "pink-rose-fuchsia": {
      primary: "from-pink-500/30 via-rose-500/40 to-fuchsia-500/30",
      secondary: "from-pink-400/20 via-rose-500/25 to-fuchsia-400/20",
      darkPrimary:
        "dark:from-pink-400/40 dark:via-rose-400/50 dark:to-fuchsia-400/40",
      darkSecondary:
        "dark:from-pink-300/30 dark:via-rose-400/35 dark:to-fuchsia-300/30",
      particles: ["bg-pink-400/40", "bg-rose-400/40", "bg-fuchsia-400/40"],
      particlesDark: [
        "dark:bg-pink-300/60",
        "dark:bg-rose-300/60",
        "dark:bg-fuchsia-300/60",
      ],
    },
    "slate-gray-zinc": {
      primary: "from-slate-500/30 via-gray-500/40 to-zinc-500/30",
      secondary: "from-slate-400/20 via-gray-500/25 to-zinc-400/20",
      darkPrimary:
        "dark:from-slate-400/40 dark:via-gray-400/50 dark:to-zinc-400/40",
      darkSecondary:
        "dark:from-slate-300/30 dark:via-gray-400/35 dark:to-zinc-300/30",
      particles: ["bg-slate-400/40", "bg-gray-400/40", "bg-zinc-400/40"],
      particlesDark: [
        "dark:bg-slate-300/60",
        "dark:bg-gray-300/60",
        "dark:bg-zinc-300/60",
      ],
    },
    custom: {
      primary: "",
      secondary: "",
      darkPrimary: "",
      darkSecondary: "",
      particles: [],
      particlesDark: [],
    },
  };

  return schemes[colorScheme || "violet-purple-rose"];
};

// Theme-based gradient colors (legacy support)
const getThemeGradients = (theme: ImageProps["theme"]) => {
  const themes = {
    light: {
      primary: "from-violet-500/30 via-purple-500/40 to-rose-500/30",
      secondary: "from-violet-400/20 via-purple-500/25 to-rose-400/20",
      darkPrimary:
        "dark:from-violet-400/40 dark:via-purple-400/50 dark:to-rose-400/40",
      darkSecondary:
        "dark:from-violet-300/30 dark:via-purple-400/35 dark:to-rose-300/30",
      particles: ["bg-violet-400/40", "bg-purple-400/40", "bg-rose-400/40"],
      particlesDark: [
        "dark:bg-violet-300/60",
        "dark:bg-purple-300/60",
        "dark:bg-rose-300/60",
      ],
    },
    dark: {
      primary: "from-blue-500/30 via-indigo-500/40 to-purple-500/30",
      secondary: "from-blue-400/20 via-indigo-500/25 to-purple-400/20",
      darkPrimary:
        "dark:from-blue-400/40 dark:via-indigo-400/50 dark:to-purple-400/40",
      darkSecondary:
        "dark:from-blue-300/30 dark:via-indigo-400/35 dark:to-purple-300/30",
      particles: ["bg-blue-400/40", "bg-indigo-400/40", "bg-purple-400/40"],
      particlesDark: [
        "dark:bg-blue-300/60",
        "dark:bg-indigo-300/60",
        "dark:bg-purple-300/60",
      ],
    },
  };

  return themes[theme || "light"];
};

const Image: React.FC<ImageProps> = memo(
  ({
    src,
    alt,
    fluid = true,
    className = "",
    variant = "default",
    theme = "light",
    colorScheme,
    align = "none",
    picture = false,
    size = "full",
    shape,
    caption,
    objectFit = "cover",
    rounded = "2xl",
    shadow: shadowProp,
    border: borderProp,
    borderColor,
    aspectRatio = "auto",
    loading = "lazy",
    priority = false,
    showParticles: showParticlesProp,
    showOverlay: showOverlayProp,
    hoverEffect: hoverEffectProp,
    animate: animateProp,
    onLoad,
    onError,
    // Custom color props
    backgroundColor,
    gradientFrom,
    gradientVia,
    gradientTo,
    particleColor,
    overlayColor,
  }) => {
    const isVideo = /\.(mp4|webm|ogg|mov|avi)(?:[?#]|$)/i.test(src || "");

    // Get variant styles and apply them as defaults
    const variantStyles = useMemo(() => getVariantStyles(variant), [variant]);

    // Props override variant defaults
    const shadow = shadowProp !== undefined ? shadowProp : variantStyles.shadow;
    const border = borderProp !== undefined ? borderProp : variantStyles.border;
    const showParticles =
      showParticlesProp !== undefined
        ? showParticlesProp
        : variantStyles.showParticles;
    const showOverlay =
      showOverlayProp !== undefined
        ? showOverlayProp
        : variantStyles.showOverlay;
    const hoverEffect =
      hoverEffectProp !== undefined
        ? hoverEffectProp
        : variantStyles.hoverEffect;
    const animate =
      animateProp !== undefined ? animateProp : variantStyles.animate;

    // Color handling: colorScheme > theme (legacy) > default
    const colorGradients = useMemo(() => {
      if (colorScheme) {
        return getColorSchemeGradients(colorScheme);
      }
      return getThemeGradients(theme);
    }, [colorScheme, theme]);
    const sizeClasses = useMemo(
      () => getSizeClasses(size, fluid),
      [size, fluid]
    );
    const alignmentClasses = useMemo(() => getAlignmentClasses(align), [align]);
    const aspectClasses = useMemo(
      () => getAspectRatioClasses(aspectRatio),
      [aspectRatio]
    );

    // Shape overrides rounded if provided
    const shapeClasses = useMemo(() => getShapeClasses(shape), [shape]);
    const roundedClasses = useMemo(
      () => shapeClasses || getRoundedClasses(rounded),
      [shapeClasses, rounded]
    );

    const shadowClasses = useMemo(() => getShadowClasses(shadow), [shadow]);

    // Build custom gradient classes if custom colors are provided
    const customGradientPrimary = useMemo(() => {
      if (gradientFrom || gradientVia || gradientTo) {
        const from = gradientFrom || "from-violet-500/30";
        const via = gradientVia || "via-purple-500/40";
        const to = gradientTo || "to-rose-500/30";
        return `${from} ${via} ${to}`;
      }
      return null;
    }, [gradientFrom, gradientVia, gradientTo]);

    // Track image load state to prevent flickering in Safari. A priority
    // image is always eager-loaded and is already loaded in the prerendered
    // HTML for every route that ships it, so starting this false meant the
    // client's first render (opacity-0, load spinner) never matched the
    // prerendered markup (already loaded and visible), a guaranteed
    // hydration mismatch on every page that used one. Non-priority images
    // keep the real load-state tracking, since their prerendered markup
    // genuinely does start unloaded.
    const [isImageLoaded, setIsImageLoaded] = useState(isVideo || priority);

    const handleImageLoad = useCallback(() => {
      setIsImageLoaded(true);
      onLoad?.();
    }, [onLoad]);

    const handleImageError = useCallback(() => {
      setIsImageLoaded(true);
      onError?.();
    }, [onError]);

    const containerClasses = clsx(
      "flex justify-center relative group",
      sizeClasses,
      alignmentClasses,
      aspectClasses,
      animate && isImageLoaded && "animate-[slideIn_1s_ease-out_forwards]",
      backgroundColor,
    );

    const borderColorClass =
      borderColor || "border-white/20 dark:border-gray-700/30";

    const imageClasses = clsx(
      "w-full h-full",
      `object-${objectFit}`,
      roundedClasses,
      shadowClasses,
      border && ["border-2", borderColorClass],
      hoverEffect &&
        isImageLoaded &&
        "transform group-hover:scale-105 transition-all duration-500 will-change-transform",
      "relative z-10",
      !isImageLoaded && "opacity-0",
      "transition-opacity duration-300",
      className,
    );

    return (
      <div
        className={containerClasses}
        style={{ willChange: animate && isImageLoaded ? "transform" : "auto" }}
      >
        <div
          className="w-full h-full flex justify-center relative group"
          style={{ transform: "translateZ(0)" }}
        >
          {/* Background gradient orbs — off for minimal/hero portrait usage */}
          {isImageLoaded && variant !== "minimal" && variant !== "hero" && (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  customGradientPrimary || colorGradients.primary
                } ${
                  customGradientPrimary ? "" : colorGradients.darkPrimary
                } rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 ${
                  animate ? "animate-breathing" : ""
                }`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  customGradientPrimary || colorGradients.secondary
                } ${
                  customGradientPrimary ? "" : colorGradients.darkSecondary
                } rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 delay-200`}
              />
            </>
          )}

          {isVideo ? (
            <video
              src={src || ansuImage}
              controls
              playsInline
              preload="metadata"
              className={imageClasses}
              aria-label={alt || "Video content"}
              onLoadedMetadata={handleImageLoad}
              onCanPlay={handleImageLoad}
            >
              Your browser does not support the video tag.
            </video>
          ) : picture ? (
            <picture>
              <source srcSet={src || ansuImage} type="image/webp" />
              <img
                src={src || ansuImage}
                alt={alt || "Image"}
                className={imageClasses}
                loading={priority ? "eager" : loading}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </picture>
          ) : (
            <img
              src={src || ansuImage}
              alt={alt || "Image"}
              className={imageClasses}
              loading={priority ? "eager" : loading}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          {caption && (
            <p className="text-center mt-3 text-sm italic dark:text-gray-400 text-gray-600">
              {caption}
            </p>
          )}

          {/* Floating particles - only show after image loads */}
          {showParticles &&
            isImageLoaded &&
            [...Array(6)].map((_, i) => {
              const particleColorClass = particleColor
                ? particleColor
                : colorGradients.particles.length > 0
                ? `${colorGradients.particles[i % 3]} ${
                    colorGradients.particlesDark[i % 3]
                  }`
                : i % 3 === 0
                ? "bg-violet-400/40 dark:bg-violet-300/60"
                : i % 3 === 1
                ? "bg-purple-400/40 dark:bg-purple-300/60"
                : "bg-rose-400/40 dark:bg-rose-300/60";

              return (
                <div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full ${
                    animate ? "animate-particle-drift" : ""
                  } will-change-transform ${particleColorClass}`}
                  /*     style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 15}%`,
                    animationDuration: `${3000 + i * 500}ms`,
                    animationDelay: `${i * 200}ms`,
                  }} */
                />
              );
            })}

          {/* Enhanced overlays - only show after image loads */}
          {showOverlay && isImageLoaded && (
            <>
              <div
                className={`absolute inset-2 sm:inset-3 ${roundedClasses} ${
                  overlayColor ||
                  "bg-gradient-to-t from-black/30 via-black/5 to-transparent"
                } opacity-0 ${
                  hoverEffect ? "group-hover:opacity-100" : ""
                } transition-opacity duration-500`}
              />

              <div
                className={`absolute inset-0 ${roundedClasses} overflow-hidden pointer-events-none`}
              >
                <div
                  className={`absolute top-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent opacity-0 ${
                    hoverEffect ? "group-hover:opacity-100" : ""
                  } transition-opacity`}
                  /*   style={{
                    transitionDuration: `${ABOUT_HERO_CONFIG.ANIMATION_DURATIONS.LONG}ms`,
                  }} */
                />
                <div
                  className={`absolute bottom-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-tl from-purple-500/20 via-violet-500/10 to-transparent opacity-0 ${
                    hoverEffect ? "group-hover:opacity-100" : ""
                  } transition-opacity`}
                  /*   style={{
                    transitionDuration: `${ABOUT_HERO_CONFIG.ANIMATION_DURATIONS.LONG}ms`,
                  }} */
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

Image.displayName = "Image";

export default Image;

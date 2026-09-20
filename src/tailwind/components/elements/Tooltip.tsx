import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useEnvironmentSettings } from "../../../context/EnvironmentContext";
import { TooltipProps } from "../../../tailwind/types/elements/tooltip";

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  size = "md",
  theme = "light",
  fullWidth = false,
  className = "",
}) => {
  const {
    themeClasses,
    theme: contextTheme,
    fontSize,
    language: contextLanguage,
  } = useEnvironmentSettings();

  const finalLanguage = contextLanguage;

  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const sizeClasses = useMemo(
    () => ({
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-2 text-base",
    }),
    []
  );

  const positionClasses = useMemo(
    () => ({
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
    }),
    []
  );

  const arrowClasses = useMemo(
    () => ({
      top: "bottom-[-6px] left-1/2 -translate-x-1/2 border-t-current border-x-transparent",
      bottom:
        "top-[-6px] left-1/2 -translate-x-1/2 border-b-current border-x-transparent",
      left: "right-[-6px] top-1/2 -translate-y-1/2 border-l-current border-y-transparent",
      right:
        "left-[-6px] top-1/2 -translate-y-1/2 border-r-current border-y-transparent",
    }),
    []
  );

  const containerClasses = useMemo(
    () =>
      clsx("relative overflow-visible inline-block cursor-pointer", className),
    [className]
  );

  const tooltipClasses = useMemo(
    () =>
      clsx(
        "absolute z-[10002]",
        "rounded shadow-lg",
        theme === "light"
          ? "bg-primary-light-900 text-white"
          : "bg-primary-dark-900 text-white",
        themeClasses,
        sizeClasses[fontSize || size],
        positionClasses[position],
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      ),
    [
      theme,
      themeClasses,
      sizeClasses,
      fontSize,
      size,
      positionClasses,
      position,
      isVisible,
    ]
  );

  const arrowStyles = useMemo(
    () => clsx("absolute w-0 h-0 border-4", arrowClasses[position]),
    [position, arrowClasses]
  );

  void contextTheme;

  return (
    <div
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      lang={finalLanguage}
    >
      {children}
      <div role="tooltip" className={tooltipClasses}>
        {content}
        <div className={arrowStyles} />
      </div>
    </div>
  );
};

export default Tooltip;

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type Theme = "light" | "dark";
export type FontSize = "sm" | "md" | "lg";
export type Language = "de" | "en";
export type Contrast = "normal" | "high";

export interface AccessibilitySettings {
  fontSize: FontSize;
  language: Language;
  theme: Theme;
}

interface EnvironmentContextType {
  theme: Theme;
  fontSize: FontSize;
  language: Language;

  setTheme: Dispatch<SetStateAction<Theme>>;
  toggleTheme: () => void;
  setFontSize: Dispatch<SetStateAction<FontSize>>;
  setLanguage: Dispatch<SetStateAction<Language>>;
  themeClasses?: string;
}

const defaultAccessibilitySettings: AccessibilitySettings = {
  fontSize: "md",
  language: "de",
  theme: "light",
};

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(
  undefined,
);

export const EnvironmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    "THEME",
    defaultAccessibilitySettings.theme,
  );
  const [fontSize, setFontSize] = useLocalStorage<FontSize>(
    "DISPLAY_SETTINGS",
    defaultAccessibilitySettings.fontSize,
  );

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");

    document.documentElement.style.fontSize = {
      sm: "14px",
      md: "16px",
      lg: "18px",
    }[fontSize];

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#1a1a1a" : "#f6f2ee",
      );
    }
  }, [theme, fontSize]);

  const themeClasses = `${theme === "dark" ? "dark" : ""}`;

  const value: EnvironmentContextType = {
    theme,
    fontSize,
    language: "en",
    setTheme,
    toggleTheme,
    setFontSize,
    themeClasses,
    setLanguage: function (value: React.SetStateAction<Language>): void {
      throw new Error("Function not implemented.");
    },
  };

  return (
    <EnvironmentContext.Provider value={value}>
      {/* No `lang` here: it would claim German content is English. The
          document language is kept in step with i18n in src/i18n.ts. */}
      <div className={`font-${fontSize}`} dir="ltr">
        {children}
      </div>
    </EnvironmentContext.Provider>
  );
};

export const useEnvironmentSettings = () => {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error(
      "useEnvironmentSettings must be used within an EnvironmentProvider",
    );
  }
  return context;
};

// CSS utility classes for accessibility
const accessibilityStyles = `
  .high-contrast {
    --text-primary: #ffffff;
    --text-secondary: #ffffff;
    --bg-primary: #000000;
    --bg-secondary: #1a1a1a;
  }

  .keyboard-mode *:focus {
    outline: 3px solid var(--focus-color, #007AFF) !important;
    outline-offset: 2px !important;
  }

  .reduce-motion * {
    animation: none !important;
    transition: none !important;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = accessibilityStyles;
document.head.appendChild(styleSheet);

export default EnvironmentContext;

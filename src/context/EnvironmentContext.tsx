import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { STORAGE_KEYS } from "../shared/constants/storage";

export type Theme = "light" | "dark";
export type FontSize = "sm" | "md" | "lg";

interface EnvironmentContextType {
  theme: Theme;
  /**
   * Fixed at "md". The site has no font-size control; text size follows the
   * visitor's browser setting through rem units.
   */
  fontSize: FontSize;
  toggleTheme: () => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(
  undefined,
);

const readStoredTheme = (): Theme | null => {
  try {
    const stored = JSON.parse(
      window.localStorage.getItem(STORAGE_KEYS.THEME) ?? "null",
    );
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", theme === "dark");
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#0f172a" : "#f6f2ee");
};

export const EnvironmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // The prerendered HTML is always light, so the first client render must be
  // light too or hydration fails. public/theme-init.js has already painted the
  // stored theme before React loads; the state catches up right after.
  const [theme, setTheme] = useState<Theme>("light");
  const [hasReadStorage, setHasReadStorage] = useState(false);

  useEffect(() => {
    const stored = readStoredTheme();
    if (stored) setTheme(stored);
    setHasReadStorage(true);
  }, []);

  useEffect(() => {
    // Until the stored value is known, leave the class theme-init.js set.
    if (!hasReadStorage) return;
    applyTheme(theme);
  }, [theme, hasReadStorage]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(next));
      } catch {
        // Storage can be blocked; the choice then lasts for this visit only.
      }
      return next;
    });
  }, []);

  return (
    <EnvironmentContext.Provider value={{ theme, fontSize: "md", toggleTheme }}>
      {children}
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

export default EnvironmentContext;

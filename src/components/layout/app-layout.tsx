import BackButton from "components/elements/back-button";
import { resolvePageId, shouldShowDockForPath } from "data/pageNavigation";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SpotlightSearchProvider } from "../../hooks/useSpotlightSearch";
import SpotlightChatbot from "components/spotlight/spotlight-chatbot";
import BottomDock from "./bottom-dock";
import Footer from "./footer";
import Header from "./header";
import ScrollToTopButton from "./scroll-to-top-button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation("ansumana");
  const location = useLocation();
  const chatLauncherRef = useRef<HTMLButtonElement>(null);
  const pageId = resolvePageId(location.pathname);

  return (
    <SpotlightSearchProvider>
      <div className="relative flex min-h-screen w-full flex-col">
        {/* Skip to content: visually hidden until keyboard-focused */}
        <a
          href="#main-content"
          className="skip-link sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-body focus:shadow-lg dark:focus:bg-dark-surface"
        >
          {t("a11y.shared.skipToContent")}
        </a>
        <Header launcherRef={chatLauncherRef} />
        <BackButton position="top-left" />
        <SpotlightChatbot launcherRef={chatLauncherRef} />
        <main
          id="main-content"
          tabIndex={-1}
          key={i18n.resolvedLanguage}
          className="flex-grow focus:outline-none"
        >
          {children}
        </main>
        <div className="hidden md:block">
          <ScrollToTopButton />
        </div>
        {pageId && shouldShowDockForPath(location.pathname) && (
          <BottomDock pageId={pageId} />
        )}
        <Footer />
      </div>
    </SpotlightSearchProvider>
  );
};

export default Layout;

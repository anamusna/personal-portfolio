import clsx from "clsx";
import SocialLinks from "components/elements/social-links";
import MobileNavMenu from "components/layout/mobile-nav-menu";
import ThemeToggle from "components/layout/theme-toggle";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  getHeaderHref,
  isHeaderNavActive,
  PRIMARY_HEADER_NAV,
} from "../../data/header";

import {
  CHROME_BAR_BASE,
  CHROME_BAR_BORDER_BOTTOM,
  CHROME_BAR_GLASS,
  CHROME_BAR_TOP_FADE,
  CHROME_CHIP,
  CHROME_CHIP_ACTIVE,
  CHROME_CHIP_HOVER,
} from "../../tailwind/styles/chromeBar";
// Header height, logo size and horizontal padding come from the
// `--header-*` custom properties in index.css, which resolve per breakpoint
// in CSS. Deriving them from a measured viewport in React made the markup
// depend on the render environment: react-snap prerenders at 480x850, so the
// committed HTML carried phone-sized classes while the client's first render
// produced something else. React aborted hydration on that mismatch and
// re-rendered every route from scratch. Keep this markup viewport
// independent.
const HeaderContent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const { t } = useTranslation();
  // const {  openSpotlight} = useSpotlightSearch();

  const navigation = PRIMARY_HEADER_NAV.map((item) => ({
    name: t(item.labelKey),
    href: getHeaderHref(item.url),
    url: item.url,
    highlight: item.highlight ?? false,
    isPrimaryAction: item.isPrimaryAction ?? false,
  }));
  const secondaryNavLinks = navigation.filter((item) => !item.isPrimaryAction);
  const primaryAction = navigation.find((item) => item.isPrimaryAction);

  const renderNavLink = (item: (typeof navigation)[number]) => {
    const isActive = isHeaderNavActive(location.pathname, item.url);

    return (
      <Link
        key={item.url}
        to={item.href}
        aria-current={isActive ? "page" : undefined}
        className={clsx(
          "group relative shrink-0 px-3 py-2 text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50 inline-flex items-center min-h-[44px]",
          isActive
            ? CHROME_CHIP_ACTIVE
            : clsx(
                CHROME_CHIP,
                CHROME_CHIP_HOVER,
                "text-light-text/85 dark:text-dark-text/85",
              ),
        )}
      >
        <span className="relative">
          {item.name}
          <div
            className={clsx(
              "absolute -bottom-1 left-0 h-0.5 w-full bg-indigo-600 dark:bg-indigo-400 transition-transform duration-300 origin-left",
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
            )}
          />
        </span>
      </Link>
    );
  };

  const renderPrimaryAction = () =>
    primaryAction ? renderNavLink(primaryAction) : null;

  // Effect justification: subscribing to an external system (window scroll).
  // Scroll position is not derivable from props or state and has no CSS
  // equivalent here, so this is the case the React docs still call for an
  // effect. The initial read covers a restored or hash-targeted scroll
  // position; `isScrolled` starts false on both the prerender and the
  // client's first render, so it does not affect hydration.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-[60] duration-500",
          "h-[var(--header-height)] px-[var(--header-padding-x)]",
          CHROME_BAR_BASE,
          isScrolled
            ? clsx(CHROME_BAR_GLASS, CHROME_BAR_BORDER_BOTTOM)
            : CHROME_BAR_TOP_FADE,
        )}
    >
      <nav className="relative h-full">
        <div className="container mx-auto h-full max-w-7xl sm:px-6 md:px-4 lg:px-5">
          <div className="flex items-center gap-1.5 sm:gap-2 h-full min-w-0 w-full">
            {/* Enhanced Logo/Name with ultra-responsive design */}
            <Link
              to="/"
              className="group relative flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0 max-w-[min(100%,10.5rem)] xs:max-w-none"
            >
              <img
                src="/logo.png"
                alt={t("a11y.header.logoAlt")}
                className="relative object-cover w-[var(--header-logo-size)] h-[var(--header-logo-size)]"
              />

              {/* Enhanced Name and Title with responsive display */}
              {/*   <div className="relative min-w-0 flex-1">
                <h3 className={clsx("font-bold truncate", getNameTextSize())}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 animate-crystalline-shimmer bg-[length:200%_100%]">
                    {getDisplayName()}
                  </span>
                </h3>

                {shouldShowSubtitle() && (
                  <span
                    className={clsx(
                      "text-light-text/50 dark:text-dark-text/50 group-hover:text-light-text dark:group-hover:text-dark-text transition-colors duration-500 block truncate",
                      deviceType === "mobile" || deviceType === "mobile-large"
                        ? "text-xs"
                        : deviceType === "tablet"
                          ? "text-xs"
                          : deviceType === "tablet-landscape"
                            ? "text-xs"
                            : "text-xs",
                    )}
                  >
                    {language === "en"
                      ? deviceType === "tablet" ||
                        deviceType === "tablet-landscape"
                        ? "Software Engineer"
                        : "Senior Software Engineer"
                      : deviceType === "tablet" ||
                          deviceType === "tablet-landscape"
                        ? "Software Entwickler"
                        : "Senior Software Entwickler"}
                  </span>
                )}
              </div> */}
            </Link>

            {/* Equal flex spacers center SocialLinks between logo and nav+theme (desktop only) */}
            <div className="flex-1 basis-0 min-w-0 shrink" aria-hidden="true" />

            <div className="hidden lg:flex shrink-0 pointer-events-auto z-10">
              <SocialLinks
                variant="header"
                spacing="compact"
                showHashnode={false}
                className="gap-1.5 sm:gap-3"
              />
            </div>

            <div className="flex-1 basis-0 min-w-0 shrink" aria-hidden="true" />

            {/* Career and Projects are the two pages a visitor coming from a CV
                or LinkedIn needs, so they stay in the header rather than only
                inside the mobile menu. */}
            <div className="hidden lg:flex items-center gap-2 md:gap-3 shrink-0 min-w-0 z-20">
              {secondaryNavLinks.map(renderNavLink)}
              {renderPrimaryAction()}

              <div className="flex items-center gap-1.5 md:gap-2 shrink-0 pl-1 md:pl-2 ml-1 md:ml-2 border-l border-light-border/50 dark:border-dark-border/40">
                <ThemeToggle />
              </div>
            </div>

            {/* Tablet / mobile: About Me stays visible, everything else lives in the menu */}
            <div className="flex lg:hidden items-center gap-2 shrink-0 min-w-0 z-20">
              {renderPrimaryAction()}
              <MobileNavMenu navigation={secondaryNavLinks} />
            </div>
          </div>
        </div>
      </nav>
    </header>
    {/* Reserves space so fixed header does not cover page content */}
    <div aria-hidden className="w-full shrink-0 h-[var(--header-height)]" />
    </>
  );
};

const Header: React.FC = () => <HeaderContent />;

export default Header;

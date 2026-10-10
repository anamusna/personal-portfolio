import { faComments, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSpotlightSearch } from "../../hooks/useSpotlightSearch";
import {
  CHROME_CHIP,
  CHROME_CHIP_ACTIVE,
  CHROME_CHIP_HOVER,
} from "../../tailwind/styles/chromeBar";

interface ChatLauncherProps {
  launcherRef: React.RefObject<HTMLButtonElement>;
}

const ChatLauncher: React.FC<ChatLauncherProps> = ({ launcherRef }) => {
  const { t } = useTranslation();
  const { showSpotlight, openSpotlight, closeSpotlight } = useSpotlightSearch();
  const label = showSpotlight
    ? t("spotlight.launcher.close")
    : t("spotlight.launcher.open");

  return (
    <button
      ref={launcherRef}
      type="button"
      onClick={() => (showSpotlight ? closeSpotlight() : openSpotlight())}
      aria-expanded={showSpotlight}
      aria-controls="spotlight-chat-panel"
      aria-haspopup="dialog"
      aria-label={label}
      title={label}
      className={clsx(
        "inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50",
        showSpotlight
          ? CHROME_CHIP_ACTIVE
          : clsx(
              CHROME_CHIP,
              CHROME_CHIP_HOVER,
              "text-light-text/85 dark:text-dark-text/85",
            ),
      )}
    >
      <FontAwesomeIcon
        icon={showSpotlight ? faXmark : faComments}
        className="h-4 w-4"
        aria-hidden
      />
      <span className="hidden lg:inline">{t("spotlight.launcher.label")}</span>
    </button>
  );
};

export default ChatLauncher;

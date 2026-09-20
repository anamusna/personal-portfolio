import React, { memo } from "react";
import { ABOUT_HERO_CONTENT } from "../../../data/aboutHeroData";
import { SURFACE_CARD_PANEL } from "../../../tailwind/styles/surfaceCard";
import SocialLinks from "../../elements/social-links";

const SocialConnectCard: React.FC = memo(() => (
  <div
    className={`${SURFACE_CARD_PANEL} mb-6 md:mb-8 rounded-xl p-3 sm:p-4 border border-light-border/55 dark:border-dark-border/40`}
  >
    <div className="flex items-center gap-2 mb-2.5">
      <div className="w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400" aria-hidden />
      <p className="text-sm font-medium text-body">
        {ABOUT_HERO_CONTENT.SOCIAL_CARD_TITLE}
      </p>
    </div>

    <SocialLinks
      className="justify-start"
      variant="default"
      spacing="compact"
      showLabels={false}
      layout="horizontal"
    />
  </div>
));

SocialConnectCard.displayName = "SocialConnectCard";

export default SocialConnectCard;

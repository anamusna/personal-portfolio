import React from "react";
import { useTranslation } from "react-i18next";
import { PeekContent } from "../components/peek-content";
import { PeekClose } from "../components/peek-close";
import {
  ComposerFooter,
  ComposerWindowHeader,
} from "./composer-chrome";
import { ComposerSwitch } from "./composer-switch";
import {
  ComposerPortal,
  ComposerPortalTitle,
} from "./portals/composer-portal";
import { ComposerPortals } from "./portals/composer-portals";
import { useComposer } from "./use-composer";

/** Inner drawer layout — mirrors PVS `drawer.tsx`. */
export function ComposerDrawerContent() {
  const { composer } = useComposer();
  const { t } = useTranslation("ansumana");

  const handleClose = () => {
    composer.close();
  };

  return (
    <ComposerPortals>
      <ComposerWindowHeader>
        <div className="flex w-full flex-col gap-y-2">
          <div className="flex w-full items-start gap-x-2">
            <ComposerPortalTitle className="only:ml-2 sm:whitespace-normal" />
            <PeekClose
              onClick={handleClose}
              aria-label={t("common.actions.closePanel")}
              data-cy="composer-closeButton"
            />
          </div>
          <ComposerPortal
            name="toolbar"
            className="flex flex-wrap justify-start gap-x-2.5 empty:hidden lg:flex-nowrap"
          />
        </div>
      </ComposerWindowHeader>

      <PeekContent className="overflow-y-auto">
        <ComposerPortal
          className="mb-10 flex flex-col gap-y-5 empty:hidden"
          data-cy="composer-banner-group"
          name="banner"
        />
        <ComposerSwitch onClose={handleClose} />
      </PeekContent>

      <ComposerFooter>
        <ComposerPortal name="footer" className="flex w-full items-center justify-between gap-3" />
      </ComposerFooter>
    </ComposerPortals>
  );
}

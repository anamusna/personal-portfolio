import React from "react";
import { P } from "tailwind/components/elements/Typography";
import { TEXT_CARD_TITLE } from "tailwind/styles/textTokens";

export interface DetailListItem {
  key: string;
  title?: string;
  content: React.ReactNode;
}

export const DetailList: React.FC<{ items: DetailListItem[] }> = ({
  items,
}) => (
  <div className="surface-card border border-light-border/55 dark:border-dark-border/40 rounded-lg divide-y divide-light-border/55 dark:divide-dark-border/40">
    {items.map((item) => (
      <div key={item.key} className="p-3 sm:p-4">
        {item.title && (
          <h3 className={`${TEXT_CARD_TITLE} mb-1.5`}>{item.title}</h3>
        )}
        <P className="text-sm sm:text-base text-body leading-relaxed">
          {item.content}
        </P>
      </div>
    ))}
  </div>
);

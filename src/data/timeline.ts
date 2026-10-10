import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category?: "education" | "work" | "transition" | "leadership";
}

const defaultTimeline =
  ((enLocale as any).content?.timeline?.items as TimelineEvent[] | undefined) ??
  [];

export const timeline: TimelineEvent[] = createLocalizedResource(
  "content.timeline.items",
  defaultTimeline,
) as TimelineEvent[];

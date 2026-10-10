import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase,
  faGraduationCap,
  faPeopleGroup,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import type { TimelineEvent } from "data/timeline";

/**
 * Career timeline markers. One icon per milestone category, drawn in the same
 * size and colour everywhere. They are decorative: each entry's title and
 * year already say what it is.
 */
export const MILESTONE_ICONS: Record<
  NonNullable<TimelineEvent["category"]>,
  IconDefinition
> = {
  education: faGraduationCap,
  work: faBriefcase,
  transition: faRoute,
  leadership: faPeopleGroup,
};

/** Every role entry is a job, so they share one marker. */
export const ROLE_ICON = faBriefcase;

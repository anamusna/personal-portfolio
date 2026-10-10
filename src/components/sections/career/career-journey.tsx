import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SECTION_VIEWPORT } from "constants/section-motion";
import { timeline } from "data/timeline";
import { motion } from "motion/react";
import React from "react";
import { MILESTONE_ICONS } from "./timeline-icons";
import {
  SURFACE_CARD_BASE,
  SURFACE_CARD_ICON,
} from "../../../tailwind/styles/surfaceCard";
import {
  TEXT_BODY,
  TEXT_DETAIL_SECTION_TITLE,
} from "../../../tailwind/styles/textTokens";

type TimelineEvent = (typeof timeline)[number];

const TimelineMilestone: React.FC<{
  category: TimelineEvent["category"];
}> = ({ category }) => (
  <div
    className={`${SURFACE_CARD_ICON} w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full flex-shrink-0 text-indigo-700 dark:text-indigo-300`}
  >
    <FontAwesomeIcon
      icon={MILESTONE_ICONS[category ?? "work"]}
      className="h-4 w-4 lg:h-5 lg:w-5"
      aria-hidden="true"
    />
  </div>
);

/** Empty placeholder that reserves the alternating column's width without
 * duplicating the milestone's heading/text a third time in the DOM. */
const TimelineCardSpacer: React.FC = () => (
  <div
    aria-hidden="true"
    className="opacity-0 pointer-events-none min-h-[140px] sm:min-h-[160px]"
  />
);

const TimelineCard: React.FC<{
  event: TimelineEvent;
  align?: "left" | "right" | "center";
}> = ({ event, align = "center" }) => {
  const alignment =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  return (
    <div
      className={`${SURFACE_CARD_BASE} dark:bg-dark-background relative min-h-[140px] sm:min-h-[160px] p-3 sm:p-4`}
    >
      <div className={`space-y-1 sm:space-y-2 ${alignment}`}>
        <span className="text-sm sm:text-base font-bold block text-heading">
          {event.year}
        </span>
        <h3 className={`${TEXT_DETAIL_SECTION_TITLE} mb-1 sm:mb-2`}>
          {event.title}
        </h3>
        <p className={TEXT_BODY}>{event.description}</p>
      </div>
    </div>
  );
};

const Journey: React.FC = () => {

  return (
    <section
      className="relative overflow-hidden pb-6 sm:pb-8 md:pb-12 lg:pb-16"
    >
      <div className="container max-w-7xl mx-auto relative z-10">

        <motion.div
          className="md:hidden space-y-3 sm:space-y-4"
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
          }}
        >
          {timeline.map((event) => (
            <motion.div
              key={event.year}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring" as const,
                    stiffness: 350,
                    damping: 28,
                  },
                },
              }}
              className="space-y-2 sm:space-y-3"
            >
              <div className="flex items-center justify-center">
                <TimelineMilestone category={event.category} />
              </div>
              <TimelineCard event={event} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="hidden md:block relative"
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 lg:w-1 bg-light-border/60 dark:bg-dark-border/50"
            aria-hidden="true"
          />

          <div className="space-y-4 lg:space-y-5 xl:space-y-6">
            {timeline.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 28,
                  delay: index * 0.05,
                }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-3 lg:pr-4 xl:pr-5 relative z-10">
                  {index % 2 === 0 ? (
                    <TimelineCard event={event} align="right" />
                  ) : (
                    <TimelineCardSpacer />
                  )}
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <TimelineMilestone category={event.category} />
                </div>

                <div className="w-1/2 pl-3 lg:pl-4 xl:pl-5">
                  {index % 2 !== 0 ? (
                    <TimelineCard event={event} align="left" />
                  ) : (
                    <TimelineCardSpacer />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;

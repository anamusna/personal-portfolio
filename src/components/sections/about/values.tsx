import { SECTION_VIEWPORT } from "constants/section-motion";
import { values } from "data/values";
import { motion } from "motion/react";
import React from "react";
import Icon from "../../../tailwind/components/elements/Icon";
import { SURFACE_CARD_BASE, SURFACE_CARD_ICON } from "../../../tailwind/styles/surfaceCard";
import { TEXT_CARD_TITLE } from "../../../tailwind/styles/textTokens";
import SectionHeader from "../../elements/section-header";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 28,
      mass: 0.7,
    },
  },
};

const Values: React.FC = () => {
  const getCategoryIconColor = (category: string = "foundation") => {
    const colors = {
      foundation:
        "text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300",
      collaboration:
        "text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300",
      innovation:
        "text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300",
      excellence:
        "text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300",
    };
    return colors[category as keyof typeof colors] || colors.foundation;
  };

  return (
    <section
      id="philosophy"
      className="relative py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden"
    >
      <div className="container max-w-7xl relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <SectionHeader
          badge={{
            text: "Philosophy",
            iconAnimation: true,
          }}
          title="Four principles I return to"
          description="Four principles I return to when choosing tools, designing interfaces, and working with a team."
          highlightText="working with a team"
        />

        <motion.div
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
              className={`${SURFACE_CARD_BASE} p-2 sm:p-4 flex flex-col`}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div
                  className={`${SURFACE_CARD_ICON} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0`}
                  style={{ minHeight: "40px", minWidth: "40px" }}
                >
                  <Icon
                    icon={value.icon}
                    size="sm"
                    className={getCategoryIconColor(value.category)}
                  />
                </div>

                <h3 className={`${TEXT_CARD_TITLE} flex-1 leading-tight min-w-0`}>
                  {value.title}
                </h3>
              </div>

              <div className="space-y-2 flex-1">
                <p className="text-body text-sm leading-snug font-medium">
                  {value.description}
                </p>
                <p className="text-sm text-muted leading-snug">
                  {value.details}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Values;

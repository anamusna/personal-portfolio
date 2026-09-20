import clsx from "clsx";
import {
  SECTION_RISE_VARIANTS,
  SECTION_VARIANTS,
  SECTION_VIEWPORT,
} from "constants/section-motion";
import { testimonials } from "data/testimonials";
import { motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { testimonialImages } from "../../../data/testimonialImages";
import daphneImg from "../../../images/testimony/daphne.jpeg";
import Carousel from "../../../tailwind/components/layout/Carousel";
import { SURFACE_CARD_BASE } from "../../../tailwind/styles/surfaceCard";
import AnimatedCTAButton from "../../elements/animated-cta-button";
import SectionHeader from "../../elements/section-header";

const springTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.7,
};

const sectionVariants = SECTION_RISE_VARIANTS;

const carouselVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springTransition, delay: 0.12 },
  },
};

// Add this type definition at the top of the file
type Testimonial = {
  name: string;
  position: string;
  company: string;
  testimony: string;
  image?: string;
  featured?: boolean;
};

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  onExpand: (expanded: boolean) => void;
  isActive: boolean;
  activeIndex: number;
}> = ({ testimonial, onExpand, isActive, activeIndex }) => {
  const { t } = useTranslation("ansumana");
  const [isExpanded, setIsExpanded] = React.useState(false);
  const testimonialRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  React.useEffect(() => {
    if (testimonialRef.current) {
      setIsOverflowing(
        testimonialRef.current.scrollHeight >
          testimonialRef.current.clientHeight,
      );
    }
  }, [testimonial.testimony, isActive]);

  React.useEffect(() => {
    setIsExpanded(false);
    onExpand(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExpand = (expanded: boolean) => {
    if (!isActive && isExpanded) {
      setIsExpanded(false);
      onExpand(false);
    } else {
      setIsExpanded(expanded);
      onExpand(expanded);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <motion.div
        className={`${SURFACE_CARD_BASE} dark:bg-dark-background rounded-2xl p-4 sm:p-6 md:p-8`}
        transition={springTransition}
      >
        <div className="relative mb-4 sm:mb-6">
          <img
            src={
              testimonial.image
                ? testimonialImages[testimonial.image]
                : daphneImg
            }
            alt={testimonial.name}
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full object-cover border-2 border-light-border/55 dark:border-dark-border/40"
          />
        </div>

        <div className="relative mb-4 sm:mb-6 text-center">
          <div
            ref={testimonialRef}
            className={clsx(
              "text-base sm:text-lg relative z-10 text-body italic leading-relaxed",
              !isExpanded && "line-clamp-3",
            )}
          >
            <svg
              className={`${
                !isExpanded ? "top-0 left-0" : "-top-3 -left-3"
              } absolute transform h-5 w-5 sm:h-6 sm:w-6 text-primary-light/25 dark:text-primary-dark/25 transition-all duration-300`}
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-start md:text-center md:px-6 px-3">
              {testimonial.testimony}
            </p>
          </div>
          {isOverflowing && (
            <button
              onClick={() => handleExpand(!isExpanded)}
              className="text-center mt-3 px-4 py-2 min-h-[44px] text-primary-light dark:text-primary-dark
                       hover:text-primary-light/80 dark:hover:text-primary-dark/80
                       focus:outline-none transition-colors surface-card rounded-lg border border-light-border/55 dark:border-dark-border/40
                       font-medium text-sm"
            >
              {isExpanded
                ? t("common.actions.readLess")
                : t("common.actions.readMore")}
            </button>
          )}
        </div>

        <div className="flex flex-col items-center space-y-1">
          <cite className="not-italic font-bold text-base sm:text-lg text-heading">
            {testimonial.name}
          </cite>
          <div className="text-sm sm:text-base text-body font-medium">
            {t("pages.home.testimonials.positionAtCompany", {
              position: testimonial.position,
              company: testimonial.company,
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const { t } = useTranslation("ansumana");
  const [isAnyExpanded, setIsAnyExpanded] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  const testimonialItems = testimonials.group.map(
    (testimonial: Testimonial, index) => ({
      id: index + 1,
      content: (
        <TestimonialCard
          key={testimonial.name + activeIndex}
          testimonial={testimonial}
          onExpand={(expanded) => setIsAnyExpanded(expanded)}
          isActive={index === activeIndex}
          activeIndex={activeIndex}
        />
      ),
      tagImage: testimonial.featured
        ? {
            carouselTag: "/images/featured-icon.svg",
          }
        : undefined,
    }),
  );

  return (
    <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <motion.div
          variants={sectionVariants}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <SectionHeader
            badge={{
              text: t("pages.home.testimonials.badge"),
              icon: (
                <svg
                  className="w-4 h-4 mr-2 animate-spin"
                  style={{ animationDuration: "4s" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ),
              iconAnimation: false,
            }}
            title={t("pages.home.testimonials.title")}
            description={t("pages.home.testimonials.description")}
          />
        </motion.div>

        <motion.div
          className="mb-8 sm:mb-12"
          variants={carouselVariants}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <Carousel
            items={testimonialItems}
            interval={6000}
            showControls={true}
            showIndicators={false}
            className={` ${
              isAnyExpanded
                ? "h-[50rem] md:h-[36rem]"
                : "h-[28rem] md:h-[26rem]"
            } transition-all duration-700`}
            onSlideChange={handleSlideChange}
          />
        </motion.div>

        <motion.div
          variants={SECTION_VARIANTS}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          className="mt-8 sm:mt-12 text-center"
        >
          <AnimatedCTAButton
            text={t("pages.home.testimonials.viewAll")}
            href="/testimonials"
            colorScheme="indigo-violet"
            size="sm"
            showIcon={true}
            iconPosition="right"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

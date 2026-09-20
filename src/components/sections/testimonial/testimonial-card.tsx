import { motion } from "motion/react";
import React, { useState } from "react";
import { testimonialImages } from "../../../data/testimonialImages";
import daphneImg from "../../../images/testimony/daphne.jpeg";
import { P } from "../../../tailwind/components/elements/Typography";

const spring = {
  type: "spring" as const,
  stiffness: 340,
  damping: 28,
  mass: 0.7,
};

interface TestimonialCardProps {
  testimonial: {
    name: string;
    position: string;
    company: string;
    image?: string;
    testimony: string;
  };
  className?: string;
  style?: React.CSSProperties;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  className,
  style,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const testimonialImage = testimonial.image
    ? testimonialImages[testimonial.image]
    : "/images/testimony/default.png";

  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-shadow duration-300 ${className}`}
      style={style}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.18)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={spring}
    >
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="mr-4">
            <img
              src={imageError ? daphneImg : testimonialImage}
              alt={testimonial.name}
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-light dark:border-primary-dark"
              onError={() => setImageError(true)}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-heading group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
              {testimonial.name}
            </h3>

            <P className="text-muted text-sm">
              {testimonial.position}
              {/*  {testimonial.company && (
                <>
                  {" "}
                  •{" "}
                  <span className="text-primary-light dark:text-primary-dark">
                    {testimonial.company}
                  </span>
                </>
              )} */}
            </P>
          </div>
        </div>

        <div className="relative">
          <svg
            className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200 dark:text-gray-700"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>

          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{ height: isExpanded ? "auto" : "4.5rem" }}
            transition={spring}
          >
            <P className="relative z-10 text-muted italic pl-6">
              {testimonial.testimony}
            </P>
          </motion.div>

          {testimonial.testimony.length > 160 && (
            <span className="flex justify-center text-center mt-2">
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-primary-light dark:text-primary-dark text-sm font-medium hover:underline"
                whileTap={{ scale: 0.93 }}
              >
                {isExpanded ? "Read Less" : "Read More"}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={spring}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </motion.button>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;

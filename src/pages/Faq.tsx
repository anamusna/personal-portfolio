import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { motion } from "motion/react";
import React from "react";
import FAQSection from "../components/sections/faq/faq-section";

const Faq: React.FC = () => {
  return (
    <div className="relative overflow-hidden md:overflow-visible">
      <div className="relative z-10">
        <motion.section
          id="faq"
          className="relative"
          variants={SECTION_VARIANTS}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <FAQSection />
        </motion.section>
      </div>
    </div>
  );
};

export default Faq;

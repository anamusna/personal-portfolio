import { aboutPageContent } from "data/aboutPage";
import React from "react";
import { Link } from "react-router-dom";
import { TEXT_BODY } from "../../../tailwind/styles/textTokens";

const AboutHeroTransition: React.FC = () => {
  const { heroTransition } = aboutPageContent;

  return (
    <div className="container max-w-3xl mx-auto px-3 sm:px-4 lg:px-6 pb-8 sm:pb-10 md:pb-12">
      <p className={`${TEXT_BODY} text-center text-base sm:text-lg leading-relaxed`}>
        {/* One text child, not two adjacent ones ({text} and {" "}): the
            prerendered snapshot merges adjacent text nodes into one, so
            hydration only had the first piece to match against the merged
            result. */}
        {`${heroTransition.text} `}
        <Link
          to={heroTransition.href}
          className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/50 rounded-sm"
        >
          {heroTransition.linkLabel}
        </Link>
        .
      </p>
    </div>
  );
};

export default AboutHeroTransition;

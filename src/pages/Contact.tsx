import SectionHeader from "components/elements/section-header";
import ContactDestination from "components/sections/contact/contact-destination";
import PageSection from "components/sections/page-section";
import { contact } from "data/contact";
import ansuImage from "images/background.webp";
import React from "react";
import ContactLinks from "../components/elements/contact-links";
import { TEXT_MUTED } from "../tailwind/styles/textTokens";

interface ContactProps {
  embedded?: boolean;
}

const contactBadgeIcon = (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

export const ContactConversionSurface: React.FC<{
  showSectionHeader?: boolean;
  leadText?: string;
}> = ({ showSectionHeader = false, leadText }) => (
  <div className="max-w-4xl mx-auto">
    {showSectionHeader && (
      <SectionHeader
        badge={{
          text: contact.title,
          icon: contactBadgeIcon,
          iconAnimation: false,
        }}
        title={contact.heading}
        description={contact.subText}
        descriptionClassName="text-white"
      />
    )}
    {leadText && (
      <p className={`${TEXT_MUTED} text-center mb-5 sm:mb-6`}>{leadText}</p>
    )}
    <ContactLinks />
  </div>
);

const EmbeddedContactBand: React.FC = () => (
  <div
    className="relative"
    style={{
      backgroundImage: `url(${ansuImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="container max-w-4xl relative z-10 mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-10 md:py-12 text-center">
      <ContactConversionSurface showSectionHeader />
    </div>
  </div>
);

const Contact: React.FC<ContactProps> = ({ embedded = false }) => {
  if (embedded) {
    return <EmbeddedContactBand />;
  }

  return (
    <PageSection>
      <ContactDestination />
    </PageSection>
  );
};

export default Contact;

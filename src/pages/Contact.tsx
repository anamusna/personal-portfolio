import SectionHeader from "components/elements/section-header";
import ContactDestination from "components/sections/contact/contact-destination";
import PageSection from "components/sections/page-section";
import { contact } from "data/contact";
import React from "react";
import ContactLinks from "../components/elements/contact-links";

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

const EmbeddedContactBand: React.FC = () => (
  <div className="dark text-body border-y border-transparent bg-dark-background dark:border-dark-border/60 dark:bg-dark-background-alt">
    <div className="container mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 md:py-20">
      <SectionHeader
        badge={{
          text: contact.title,
          icon: contactBadgeIcon,
          iconAnimation: false,
        }}
        title={contact.heading}
        description={contact.subText}
        className="mb-8 md:mb-10"
      />
      <ContactLinks />
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

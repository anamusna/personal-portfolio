import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCalendar, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { contact } from "../../data/contact";
import { SURFACE_CARD_BASE } from "../../tailwind/styles/surfaceCard";

const contactLinkClass = [
  "glass-2 dark:bg-dark-background",
  "group relative w-full justify-center",
  "inline-flex items-center gap-2 rounded-lg border",
  "hover:text-heading hover:bg-light-surface/50 dark:hover:bg-dark-surface/50",
  "border-light-border/40 dark:border-dark-border/40",
  "transition-colors duration-300",
  "text-sm lg:text-sm",
  "min-h-[44px] lg:min-h-[48px] px-3 lg:px-3",
  "whitespace-nowrap",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/60 dark:focus-visible:ring-royal-primary/50",
].join(" ");

interface ContactLinkProps {
  icon: IconDefinition;
  label: string;
  href: string;
  external?: boolean;
}

const ContactLink: React.FC<ContactLinkProps> = ({
  icon,
  label,
  href,
  external = false,
}) => (
  <a
    href={href}
    {...(external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : undefined)}
    className={clsx(SURFACE_CARD_BASE, contactLinkClass)}
  >
    <FontAwesomeIcon icon={icon} className="h-4 w-4" aria-hidden />
    <span className="font-medium">{label}</span>
  </a>
);

const ContactLinks: React.FC = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-2">
    <ContactLink
      icon={faCalendar}
      label={contact.meeting}
      href="https://calendly.com/darboe/connect-chat"
      external
    />
    <ContactLink
      icon={faLinkedin}
      label={contact.linkedin}
      href="https://www.linkedin.com/in/ansumana-darboe/"
      external
    />
    <ContactLink
      icon={faEnvelope}
      label={contact.email}
      href="mailto:thisisansumana@gmail.com"
    />
    <ContactLink
      icon={faGithub}
      label={contact.github}
      href="https://github.com/anamusna"
      external
    />
  </div>
);

export default ContactLinks;

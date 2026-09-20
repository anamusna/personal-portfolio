import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCalendar, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React from "react";
import { contact } from "../../data/contact";
import Button from "../../tailwind/components/elements/Button";
import { SURFACE_CARD_BASE } from "../../tailwind/styles/surfaceCard";

const contactButtonClass = [
  "glass-2 dark:bg-dark-background",
  "group relative w-full justify-center",
  "hover:text-white hover:bg-light-surface/50 dark:hover:bg-dark-surface/50",
  "border-light-border/40 dark:border-dark-border/40",
  "transition-colors duration-300",
  "text-sm lg:text-sm",
  "min-h-[44px] lg:min-h-[48px] px-3 lg:px-3",
  "whitespace-nowrap",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-primary/60 dark:focus-visible:ring-royal-primary/50",
].join(" ");

interface ContactLinkButtonProps {
  icon: IconDefinition;
  label: string;
  onClick: () => void;
}

const ContactLinkButton: React.FC<ContactLinkButtonProps> = ({
  icon,
  label,
  onClick,
}) => (
  <Button
    variant="outline"
    icon={icon}
    onClick={onClick}
    className={clsx(SURFACE_CARD_BASE, contactButtonClass)}
  >
    <span className="font-medium">{label}</span>
  </Button>
);

const ContactLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-2">
      <ContactLinkButton
        icon={faCalendar}
        label={contact.meeting}
        onClick={() =>
          window.open("https://calendly.com/darboe/connect-chat", "_blank")
        }
      />
      <ContactLinkButton
        icon={faLinkedin}
        label={contact.linkedin}
        onClick={() =>
          window.open("https://www.linkedin.com/in/ansumana-darboe/", "_blank")
        }
      />
      <ContactLinkButton
        icon={faEnvelope}
        label={contact.email}
        onClick={() =>
          (window.location.href = "mailto:thisisansumana@gmail.com")
        }
      />
      <ContactLinkButton
        icon={faGithub}
        label={contact.github}
        onClick={() => window.open("https://github.com/anamusna", "_blank")}
      />
    </div>
  );
};

export default ContactLinks;

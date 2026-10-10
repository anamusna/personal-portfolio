import {
  faBookOpen,
  faCode,
  faComments,
  faDatabase,
  faGlobe,
  faGraduationCap,
  faHandshake,
  faHeart,
  faLaptop,
  faLightbulb,
  faMapMarkerAlt,
  faMobileScreen,
  faQuestionCircle,
  faRocket,
  faShieldHalved,
  faSoccerBall,
  faStar,
  faTools,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import enLocale from "../locales/en.json";
import i18n from "../i18n";
import { createLocalizedResource } from "../utils/localized-resource";
import { AccordionItem } from "../tailwind/types/elements/accordion";

type LocaleFaqItem = {
  id: string;
  question: string;
  answer: string;
};

const defaultFaqData = enLocale.content.faq.items as LocaleFaqItem[];

const faqIconById: Record<string, any> = {
  "who-are-you": faUser,
  "frontend-or-fullstack": faCode,
  "lead-experience": faUsers,
  "legacy-modernization": faTools,
  "where-from": faMapMarkerAlt,
  "tech-journey": faCode,
  "football-background": faSoccerBall,
  "current-work": faRocket,
  "career-timeline": faMapMarkerAlt,
  "change-org-experience": faRocket,
  "early-it-career": faDatabase,
  "propstack-mobile": faMobileScreen,
  "healthcare-compliance": faShieldHalved,
  "devops-cicd": faTools,
  "innnit-platform": faRocket,
  "zula-cofounder": faStar,
  "startup-experience": faStar,
  "tech-stack": faTools,
  "education": faGraduationCap,
  "hobbies-interests": faHeart,
  "values-approach": faQuestionCircle,
  "contact-collaboration": faUser,
  "mentoring-approach": faUsers,
  "football-to-tech-lessons": faSoccerBall,
  "technical-simplicity": faLightbulb,
  "remote-collaboration": faHandshake,
  "productivity-setup": faLaptop,
  "staying-motivated": faBookOpen,
  "advice-new-developers": faComments,
  "future-software-vision": faGlobe,
  "startup-vs-corporate": faRocket,
  "inclusive-technology": faHeart,
};

const localizedFaqData = createLocalizedResource(
  "content.faq.items",
  defaultFaqData,
) as LocaleFaqItem[];

const buildFaqData = (): AccordionItem[] =>
  localizedFaqData.map((item) => ({
    ...item,
    icon: faqIconById[item.id] ?? faQuestionCircle,
  }));

export const faqData: AccordionItem[] = buildFaqData();

/** FAQ entries surfaced on /contact before the conversion surface. */
export const CONTACT_FAQ_IDS = [
  "current-work",
  "frontend-or-fullstack",
  "lead-experience",
  "legacy-modernization",
] as const;

const buildContactFaqItems = (): AccordionItem[] =>
  CONTACT_FAQ_IDS.flatMap((id) => {
    const item = faqData.find((faq) => faq.id === id);
    return item ? [item] : [];
  });

export const contactFaqItems: AccordionItem[] = buildContactFaqItems();

i18n.on("languageChanged", () => {
  faqData.splice(0, faqData.length, ...buildFaqData());
  contactFaqItems.splice(0, contactFaqItems.length, ...buildContactFaqItems());
});

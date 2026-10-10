import i18n from "../i18n";
import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";
import { getTechnologiesForProject } from "./projects";

export { getTechnologiesForProject };

export interface Experience {
  id?: string;
  year?: string;
  role?: string;
  company: string;
  period: string;
  location: string;
  description?: string;
  responsibilities: string[];
  achievements: string[];
  category?: string[];
  image?: string;
  technologies?: string[];
}

const defaultExperiences =
  ((enLocale as any).content?.experiences?.items as Experience[] | undefined) ?? [];

export const experiences: Experience[] = createLocalizedResource(
  "content.experiences.items",
  defaultExperiences,
) as Experience[];

const hydrateTechnologies = () => {
  experiences.forEach((experience) => {
    if (experience.id) {
      experience.technologies = getTechnologiesForProject(experience.id);
    }
  });
};

hydrateTechnologies();
i18n.on("languageChanged", hydrateTechnologies);

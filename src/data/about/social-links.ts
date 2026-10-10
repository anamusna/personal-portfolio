import {
  faGithub,
  faHashnode,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export interface LinksProps {
  icon: any;
  href: string;
  label: string;
  color: string;
  hoverColor: string;
}

export const allSocialLinks: LinksProps[] = [
  {
    icon: faLinkedin,
    href: "https://www.linkedin.com/in/ansumana-darboe/",
    label: "LinkedIn",
    color: "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500",
    hoverColor: "hover:text-blue-600 dark:hover:text-blue-400",
  },
  {
    icon: faGithub,
    href: "https://github.com/anamusna",
    label: "GitHub",
    color: "from-gray-700 to-gray-800 dark:from-gray-300 dark:to-gray-200",
    hoverColor: "hover:text-gray-800 dark:hover:text-gray-200",
  },
  {
    icon: faHashnode,
    href: "https://ansumana.hashnode.dev/",
    label: "Hashnode",
    color:
      "from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400",
    hoverColor: "hover:text-indigo-600 dark:hover:text-indigo-400",
  },
];

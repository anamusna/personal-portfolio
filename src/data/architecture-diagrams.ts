import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

export interface StateBoundaryDiagramContent {
  title: string;
  intro: string;
  serverState: { label: string; body: string };
  uiState: { label: string; body: string };
  closing: string;
}

type ArchitectureDiagrams = (typeof enLocale)["content"]["architectureDiagrams"];
const defaultArchitectureDiagrams: ArchitectureDiagrams =
  enLocale.content.architectureDiagrams;

export const architectureDiagrams = createLocalizedResource(
  "content.architectureDiagrams",
  defaultArchitectureDiagrams,
) as ArchitectureDiagrams;

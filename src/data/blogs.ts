import enLocale from "../locales/en.json";
import { Blog } from "../types/blog";
import { createLocalizedResource } from "../utils/localized-resource";

const defaultBlogs =
  ((enLocale as any).content?.blog?.items as Blog[] | undefined) ?? [];

export const blogs: Blog[] = createLocalizedResource(
  "content.blog.items",
  defaultBlogs,
) as Blog[];

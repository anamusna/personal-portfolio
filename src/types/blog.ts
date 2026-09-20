export interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  url?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
}

export interface Blog {
  id: number;
  title: string;
  /** Stable, language-independent slug used for internal routing (must not be derived from the translated title). */
  titleSlug: string;
  slug: string;
  summary: string;
  content: {
    sections: Array<{
      type: "heading" | "paragraph" | "code" | "list" | "quote" | "image";
      content?: string;
      level?: number;
      language?: string;
      items?: string[];
      author?: string;
      imageUrl?: string;
      imageAlt?: string;
    }>;
  };
  coverImage: string;
  date: string;
  readTime: number;
  tags?: string[];
  author: {
    name: string;
    avatar: string;
  };
}

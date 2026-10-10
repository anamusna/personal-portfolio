import React from "react";
import { blogs } from "data/blogs";
import { BlogDetailsArticle } from "./blog-details-article";
import { BlogDetailsClosingCta } from "./blog-details-closing-cta";
import { BlogDetailsIntro } from "./blog-details-intro";
import { BlogSimilarPosts } from "./blog-similar-posts";

type BlogPost = (typeof blogs)[number];

export type BlogDetailsViewProps = {
  blogPost: BlogPost;
  similarBlogs: BlogPost[];
};

export const BlogDetailsView: React.FC<BlogDetailsViewProps> = ({
  blogPost,
  similarBlogs,
}) => (
  <div className="relative min-h-screen overflow-hidden">
    <div className="relative z-20 max-w-5xl mx-auto">
      <BlogDetailsIntro blogPost={blogPost} />
      <BlogDetailsArticle blogPost={blogPost} />
      <BlogSimilarPosts
        similarBlogs={similarBlogs}
      />
      <BlogDetailsClosingCta />
    </div>
  </div>
);

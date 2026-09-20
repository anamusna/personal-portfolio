import { mergePageSeo } from "data/page-seo";
import { blogs } from "data/blogs";
import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buildBlogPostSchema } from "utils/structured-data/build-blog-schema";
import { getSimilarBlogs } from "../utils/get-similar-blogs";

type BlogPost = (typeof blogs)[number];

type UseBlogDetailsResult = {
  blogPost: BlogPost | null;
  slug: string | undefined;
  similarBlogs: BlogPost[];
  pageSeo: ReturnType<typeof mergePageSeo> | null;
  jsonLd: ReturnType<typeof buildBlogPostSchema> | undefined;
  redirectPath: string | null;
  handleSimilarBlogClick: (blog: BlogPost) => void;
};

export function useBlogDetails(): UseBlogDetailsResult {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const blogPost = useMemo(() => {
    if (!slug) return null;
    return blogs.find((blog) => blog.titleSlug === slug) ?? null;
  }, [slug]);

  const similarBlogs = useMemo(
    () => (blogPost ? getSimilarBlogs(blogPost) : []),
    [blogPost],
  );

  const pageSeo = useMemo(() => {
    if (!blogPost || !slug) return null;
    return mergePageSeo({
      title: `${blogPost.title} | Ansumana Darboe`,
      description: blogPost.summary,
      path: `/blog/${slug}`,
      type: "article",
    });
  }, [blogPost, slug]);

  const jsonLd = useMemo(() => {
    if (!blogPost || !slug) return undefined;
    return buildBlogPostSchema(blogPost, slug);
  }, [blogPost, slug]);

  const redirectPath = useMemo(() => {
    if (blogPost || !slug) return null;
    return "/blog";
  }, [blogPost, slug]);

  const handleSimilarBlogClick = useCallback(
    (blog: BlogPost) => {
      navigate(`/blog/${blog.titleSlug}`);
    },
    [navigate],
  );

  return {
    blogPost,
    slug,
    similarBlogs,
    pageSeo,
    jsonLd,
    redirectPath,
    handleSimilarBlogClick,
  };
}

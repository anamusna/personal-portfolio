import { mergePageSeo } from "data/page-seo";
import i18n from "i18n";
import { blogImages } from "data/blogImages";
import { blogs } from "data/blogs";
import { absoluteAssetUrl } from "data/site-config";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { buildBlogPostSchema } from "utils/structured-data/build-blog-schema";
import { getSimilarBlogs } from "../utils/get-similar-blogs";

type BlogPost = (typeof blogs)[number];

type UseBlogDetailsResult = {
  blogPost: BlogPost | null;
  slug: string | undefined;
  similarBlogs: BlogPost[];
  pageSeo: ReturnType<typeof mergePageSeo> | null;
  jsonLd: ReturnType<typeof buildBlogPostSchema> | undefined;
  /** True when the URL names a post that does not exist. */
  notFound: boolean;
};

export function useBlogDetails(): UseBlogDetailsResult {
  const { slug } = useParams<{ slug: string }>();

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
      image: blogImages[blogPost.coverImage]
        ? absoluteAssetUrl(blogImages[blogPost.coverImage])
        : undefined,
      imageAlt: i18n.t("features.blogDetails.coverAlt", {
        title: blogPost.title,
      }),
    });
  }, [blogPost, slug]);

  const jsonLd = useMemo(() => {
    if (!blogPost || !slug) return undefined;
    return buildBlogPostSchema(blogPost, slug);
  }, [blogPost, slug]);

  const notFound = Boolean(slug) && !blogPost;

  return {
    blogPost,
    slug,
    similarBlogs,
    pageSeo,
    jsonLd,
    notFound,
  };
}

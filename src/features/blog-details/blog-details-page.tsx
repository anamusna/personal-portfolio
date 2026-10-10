import NotFoundWithSeo from "pages/not-found-with-seo";
import React from "react";
import { PageMetadata } from "components/seo/page-metadata";
import { BlogDetailsView } from "./components/blog-details-view";
import { useBlogDetails } from "./hooks/use-blog-details";

const BlogDetailsPage: React.FC = () => {
  const {
    blogPost,
    similarBlogs,
    pageSeo,
    jsonLd,
    notFound,
  } = useBlogDetails();

  if (notFound) {
    return <NotFoundWithSeo />;
  }

  if (!blogPost || !pageSeo) {
    return null;
  }

  return (
    <>
      <PageMetadata {...pageSeo} jsonLd={jsonLd} />
      <BlogDetailsView
        blogPost={blogPost}
        similarBlogs={similarBlogs}
      />
    </>
  );
};

export default BlogDetailsPage;

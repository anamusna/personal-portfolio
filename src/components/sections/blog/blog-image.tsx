import React, { useState } from "react";
import { blogImages } from "../../../data/blogImages";
import { Blog } from "../../../types/blog";
import { devWarn } from "../../../utils/logger";

interface BlogImageProps {
  blog: Blog;
  className?: string;
}

const BlogImage: React.FC<BlogImageProps> = ({ blog, className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const blogImage = blogImages[blog.coverImage];

  if (!blogImage && !imageError) {
    devWarn(`No image found for: ${blog.coverImage}`);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg">
      <img
        src={imageError ? blogImages["react.png"] : blogImage}
        // Decorative: the post title is the heading right above it.
        alt=""
        width={1200}
        height={630}
        className="w-full aspect-[1200/630] object-contain bg-[#0f172a]"
        onError={() => {
          devWarn(`Failed to load image: ${blog.coverImage}`);
          setImageError(true);
        }}
      />
    </div>
  );
};

export default BlogImage;

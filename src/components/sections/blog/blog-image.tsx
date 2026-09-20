import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogImages } from "../../../data/blogImages";
import { Blog } from "../../../types/blog";
import { devWarn } from "../../../utils/logger";

interface BlogImageProps {
  blog: Blog;
  className?: string;
}

const Image: React.FC<BlogImageProps> = ({ blog, className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const blogImage = blogImages[blog.coverImage];

  const handleBlogClick = useCallback(() => {
    navigate(`/blog/${blog.titleSlug}`);
  }, [navigate, blog.titleSlug]);

  if (!blogImage && !imageError) {
    devWarn(`No image found for: ${blog.coverImage}`);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
      <img
        onClick={handleBlogClick}
        src={imageError ? blogImages["react.png"] : blogImage}
        alt={blog.title}
        className="w-full h-48 sm:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          devWarn(`Failed to load image: ${blog.coverImage}`);
          setImageError(true);
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default Image;

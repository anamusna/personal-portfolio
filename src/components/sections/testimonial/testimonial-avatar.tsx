import React, { useState } from "react";
import { testimonialImages } from "../../../data/testimonialImages";

type TestimonialAvatarProps = {
  name: string;
  image?: string;
  size: number;
  className: string;
};

export const TestimonialAvatar: React.FC<TestimonialAvatarProps> = ({
  name,
  image,
  size,
  className,
}) => {
  const [failed, setFailed] = useState(false);
  const src = image ? testimonialImages[image] : undefined;

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={`${className} object-cover`}
        onError={() => setFailed(true)}
      />
    );
  }

  const initials = name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      role="img"
      aria-label={name}
      className={`${className} flex items-center justify-center bg-primary-light/10 font-bold text-heading`}
    >
      {initials}
    </div>
  );
};

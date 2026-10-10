// Import testimonial images
import fabiImg from "../images/testimony/fabi.jpeg";
import gregorImg from "../images/testimony/gregor.jpeg";
import leaImg from "../images/testimony/lea.jpeg";

// Image mapping with type safety
export const testimonialImages: { [key: string]: string } = {
  "fabi.jpeg": fabiImg,
  "gregor.jpeg": gregorImg,
  "lea.jpeg": leaImg,
} as const;

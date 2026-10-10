import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

type Testimonials = (typeof enLocale)["content"]["testimonials"];
const defaultTestimonials: Testimonials = enLocale.content.testimonials;

export const testimonials = createLocalizedResource(
  "content.testimonials",
  defaultTestimonials,
) as Testimonials;

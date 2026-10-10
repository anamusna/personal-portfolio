import { PAGE_SEO } from "data/page-seo";
import { withPageSeo } from "../utils/with-page-seo";
import NotFound from "./NotFound";

const NotFoundWithSeo = withPageSeo(PAGE_SEO.notFound, NotFound);

export default NotFoundWithSeo;

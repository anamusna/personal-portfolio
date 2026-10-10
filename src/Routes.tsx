import { IMPRESSUM_PUBLISHED } from "data/impressum";
import { PAGE_SEO } from "data/page-seo";
import React from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Layout from "./components/layout/app-layout";
import { withPageSeo } from "./utils/with-page-seo";

// Every route below is prerendered to static HTML by react-snap (see
// scripts/prerender.mjs / reactSnap.include in package.json) and hydrated
// on load. React.lazy() + <Suspense> around route content cannot hydrate
// synchronously against that prerendered markup — the lazy chunk hasn't
// resolved yet when hydrateRoot runs, so React discards the whole
// prerendered subtree and re-renders it client-side (React error #423,
// "switched to client rendering") on every single page load. That defeats
// the point of prerendering and was the direct cause of a hydration
// mismatch on every route, plus the CLS/LCP regression it produced on
// slower connections. Static imports below trade route-level code
// splitting for hydration that actually matches the server output.
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Impressum from "./pages/Impressum";
import NotFound from "./pages/not-found-with-seo";
import Privacy from "./pages/Privacy";
import ProjectDetails from "./pages/ProjectDetails";
import RouteError from "./pages/RouteError";
import Projects from "./pages/Projects";
import Testimonials from "./pages/Testimonials";

const LazyStory = React.lazy(() => import("./pages/Story"));
const LazyPrayer = React.lazy(() => import("./pages/Prayer"));

const Story: React.FC = () => (
  <React.Suspense fallback={null}>
    <LazyStory />
  </React.Suspense>
);

const Prayer: React.FC = () => (
  <React.Suspense fallback={null}>
    <LazyPrayer />
  </React.Suspense>
);

const LayoutWrapper: React.FC = () => {
  return (
    <Layout>
      {/* New pages start at the top; back and forward restore the position. */}
      <ScrollRestoration />
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter(
  [
    {
      element: <LayoutWrapper />,
      // Last resort, if the layout itself fails.
      errorElement: <RouteError />,
      children: [
        {
          // A page that fails renders the error inside the layout, so the
          // header, footer and navigation keep working.
          errorElement: <RouteError />,
          children: [
            {
              path: "/",
              element: React.createElement(withPageSeo(PAGE_SEO.home, Home)),
            },
            {
              path: "/about",
              element: React.createElement(withPageSeo(PAGE_SEO.about, About)),
            },
            {
              path: "/projects",
              element: React.createElement(
                withPageSeo(PAGE_SEO.projects, Projects),
              ),
            },
            { path: "/projects/:id", element: <ProjectDetails /> },
            {
              path: "/blog",
              element: React.createElement(withPageSeo(PAGE_SEO.blog, Blog)),
            },
            { path: "/blog/:slug", element: <BlogDetail /> },
            {
              path: "/story",
              element: React.createElement(withPageSeo(PAGE_SEO.story, Story)),
            },
            {
              path: "/prayer",
              element: React.createElement(
                withPageSeo(PAGE_SEO.prayer, Prayer),
              ),
            },
            {
              path: "/contact",
              element: React.createElement(
                withPageSeo(PAGE_SEO.contact, Contact),
              ),
            },
            {
              path: "/testimonials",
              element: React.createElement(
                withPageSeo(PAGE_SEO.testimonials, Testimonials),
              ),
            },
            {
              path: "/career",
              element: React.createElement(
                withPageSeo(PAGE_SEO.career, Career),
              ),
            },
            {
              path: "/faq",
              element: React.createElement(withPageSeo(PAGE_SEO.faq, Faq)),
            },
            {
              path: "/privacy",
              element: React.createElement(
                withPageSeo(PAGE_SEO.privacy, Privacy),
              ),
            },
            // Only once the legal notice is complete; see data/impressum.ts.
            ...(IMPRESSUM_PUBLISHED
              ? [
                  {
                    path: "/impressum",
                    element: React.createElement(
                      withPageSeo(PAGE_SEO.impressum, Impressum),
                    ),
                  },
                ]
              : []),
            {
              path: "*",
              element: <NotFound />,
            },
          ],
        },
      ],
    },
  ],
  { future: { v7_relativeSplatPath: true } },
);

const Routes: React.FC = () => {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
};

export default Routes;

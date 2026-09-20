import { PAGE_SEO } from "data/page-seo";
import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
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
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Story from "./pages/Story";
import Prayer from "./pages/Prayer";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Career from "./pages/Career";
import Faq from "./pages/Faq";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
};

const LayoutWrapper: React.FC = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
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
        element: React.createElement(withPageSeo(PAGE_SEO.projects, Projects)),
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
        element: React.createElement(withPageSeo(PAGE_SEO.prayer, Prayer)),
      },
      {
        path: "/contact",
        element: React.createElement(withPageSeo(PAGE_SEO.contact, Contact)),
      },
      {
        path: "/testimonials",
        element: React.createElement(
          withPageSeo(PAGE_SEO.testimonials, Testimonials),
        ),
      },
      {
        path: "/career",
        element: React.createElement(withPageSeo(PAGE_SEO.career, Career)),
      },
      {
        path: "/faq",
        element: React.createElement(withPageSeo(PAGE_SEO.faq, Faq)),
      },
      {
        path: "/privacy",
        element: React.createElement(withPageSeo(PAGE_SEO.privacy, Privacy)),
      },
      {
        path: "*",
        element: React.createElement(withPageSeo(PAGE_SEO.notFound, NotFound)),
      },
    ],
  },
]);

const Routes: React.FC = () => {
  return (
    <RouterProvider
      router={router}
      future={
        {
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        } as any
      }
    />
  );
};

export default Routes;

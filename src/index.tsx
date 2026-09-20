import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import "./index.css";

// App already wraps its tree in a single EnvironmentProvider; a second one
// here was dead weight — its context value was always shadowed by App's,
// so it only duplicated a localStorage read and a DOM mutation on every
// load without ever being consumed by anything.
const rootElement = document.getElementById("root") as HTMLElement;

const appTree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// react-snap prerenders each route's HTML; hydrate that markup instead of
// discarding it, so social scrapers and non-JS crawlers see real content.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, appTree);
} else {
  ReactDOM.createRoot(rootElement).render(appTree);
}

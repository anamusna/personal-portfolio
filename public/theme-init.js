// Applies the visitor's saved theme before the first paint. The prerendered
// HTML is light; without this, dark-mode visitors see a light flash until the
// app has loaded. Kept as an external file because the CSP blocks inline
// scripts. The key and value format match src/context/EnvironmentContext.tsx.
(function () {
  try {
    if (JSON.parse(localStorage.getItem("theme")) === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } catch (e) {}
})();

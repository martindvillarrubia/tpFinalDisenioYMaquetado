(function () {
  const STORAGE_KEY = "app-theme";
  const root = document.documentElement;

  // Apply saved theme on load
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }

  // Global setter used by settings page
  window.setTheme = function (mode) {
    if (mode !== "light" && mode !== "dark") return;
    root.setAttribute("data-theme", mode);
    localStorage.setItem(STORAGE_KEY, mode);
  };
})();

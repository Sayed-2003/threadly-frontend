// Apply the saved theme before the page is displayed.
try {
  const savedTheme = localStorage.getItem("threadly-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.dataset.theme = savedTheme;
  } else {
    document.documentElement.dataset.theme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches ? "dark" : "light";
  }
} catch {
  document.documentElement.dataset.theme = "light";
}

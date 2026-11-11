import { useEffect, useState } from "react";
import DesignIcon from "./DesignIcon";

function ThemeToggle() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem("threadly-theme", theme);
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }, [theme]);

  function handleThemeChange() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={handleThemeChange}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <DesignIcon name={theme === "dark" ? "sun" : "moon"} size={20} />
    </button>
  );
}

export default ThemeToggle;

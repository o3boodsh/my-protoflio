"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

function preferredTheme() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // A browser may block storage; the system preference remains available.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new CustomEvent("portfolio:themechange", { detail: { theme } }));
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => {
      const next = preferredTheme();
      applyTheme(next);
      setTheme(next);
    };

    sync();
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = () => {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The chosen theme still applies for this page view.
    }
    const update = () => {
      applyTheme(next);
      setTheme(next);
    };

    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.startViewTransition(update);
    } else {
      update();
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle color theme"}
      title={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle color theme"}
    >
      <svg className="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
      <svg className="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z" />
      </svg>
    </button>
  );
}

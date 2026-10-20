import localFont from "next/font/local";
import "./globals.css";
import "./projects.css";
import "./design-system.css";
import "./hero.css";
import "./motion.css";
import "./robot.css";
import "./theme.css";
import "./skills.css";
import "./projects-showcase.css";
import MotionController from "@/components/MotionController";

const inter = localFont({
  src: "../public/fonts/inter-latin.woff2",
  weight: "400 900",
  display: "swap",
});

export const metadata = {
  title: "Abdullah Shehada - Portfolio",
  description:
    "Abdullah Shehada builds intelligent web experiences with React, Next.js, and AI. Computer Engineer, Teaching Assistant, and available for remote work.",
};

const initializeTheme = `(function () {
  try {
    var saved = localStorage.getItem("portfolio-theme");
    var preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    document.documentElement.dataset.theme = saved === "light" || saved === "dark" ? saved : preferred;
  } catch (error) {
    document.documentElement.dataset.theme = "dark";
  }
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: initializeTheme }} /></head>
      <body className={inter.className}>{children}<MotionController /></body>
    </html>
  );
}

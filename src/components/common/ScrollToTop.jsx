import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Guarantees that whenever the user navigates between pages or routes,
 * the page starts at the very top (0, 0) without getting stuck midway.
 * Disables browser auto scroll restoration so route transitions are clean and deterministic.
 * If an anchor hash is provided, smoothly scrolls to that anchor element.
 */
export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (!hash) {
      // 1. Instant reset on window & document elements before paint
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 2. Also reset any potential root/main scroll containers
      const root = document.getElementById("root");
      if (root) root.scrollTop = 0;
      const main = document.querySelector(".layout-main, main, .admin-content");
      if (main) main.scrollTop = 0;

      // 3. Follow-up frame to catch post-mount DOM layout calculations
      const frameId = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (root) root.scrollTop = 0;
        if (main) main.scrollTop = 0;
      });

      return () => cancelAnimationFrame(frameId);
    } else {
      // If there's an anchor hash (e.g. #contact), scroll to it smoothly
      const targetId = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname, search, hash]);

  return null;
}

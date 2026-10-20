"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-motion]";
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 761px)";

export default function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(SELECTOR));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const counters = new Map();
    const counterFrames = new Map();
    const endHandlers = new Map();
    let observer;
    let timelineObserver;
    let timelineResizeObserver;
    let timelineFrame = 0;
    let timelineVisible = false;
    let pointerFrame = 0;
    let pointerLight;
    let pointerX = -500;
    let pointerY = -500;
    const timeline = document.querySelector(".timeline-rows");

    function finishCounter(element) {
      const frame = counterFrames.get(element);
      if (frame !== undefined) cancelAnimationFrame(frame);
      counterFrames.delete(element);

      const counter = counters.get(element);
      if (counter) counter.node.textContent = counter.original;
    }

    function animateCounter(element) {
      const counter = counters.get(element);
      if (!counter || reducedMotion.matches) return;

      const start = performance.now();
      const duration = 900;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = counter.target * eased;
        counter.node.textContent = `${counter.decimal ? value.toFixed(1) : Math.round(value)}${counter.suffix}`;

        if (progress < 1) {
          counterFrames.set(element, requestAnimationFrame(tick));
        } else {
          counterFrames.delete(element);
          counter.node.textContent = counter.original;
        }
      };

      counterFrames.set(element, requestAnimationFrame(tick));
    }

    function reveal(element, animate = true) {
      observer?.unobserve(element);
      const wasPending = element.classList.contains("motion-pending");
      element.classList.remove("motion-pending");

      if (animate && wasPending && !reducedMotion.matches) {
        element.classList.add("motion-entering");
        const onEnd = (event) => {
          if (event.target !== element) return;
          element.classList.remove("motion-entering");
          element.removeEventListener("animationend", onEnd);
          endHandlers.delete(element);
        };
        element.addEventListener("animationend", onEnd);
        endHandlers.set(element, onEnd);
        animateCounter(element);
      } else {
        element.classList.remove("motion-entering");
        const handler = endHandlers.get(element);
        if (handler) element.removeEventListener("animationend", handler);
        endHandlers.delete(element);
        finishCounter(element);
      }
    }

    function onFocusIn(event) {
      // Keyboard navigation can scroll to an item before the observer runs.
      let node = event.target;
      while (node && node !== document.body) {
        if (node.matches?.(SELECTOR)) reveal(node, false);
        node = node.parentElement;
      }
    }

    function updateTimeline() {
      timelineFrame = 0;
      if (!timeline || !timelineVisible || reducedMotion.matches) return;

      const bounds = timeline.getBoundingClientRect();
      const playhead = window.innerHeight * 0.58;
      const start = bounds.top + 40;
      const end = bounds.bottom - 40;
      const progress = Math.max(0, Math.min(1, (playhead - start) / Math.max(1, end - start)));
      timeline.style.setProperty("--timeline-progress", progress.toFixed(3));
    }

    function scheduleTimeline() {
      if (timeline && timelineVisible && !reducedMotion.matches && !timelineFrame) {
        timelineFrame = requestAnimationFrame(updateTimeline);
      }
    }

    function paintPointerLight() {
      pointerFrame = 0;
      if (!pointerLight) return;
      pointerLight.style.transform = `translate3d(${pointerX - 240}px, ${pointerY - 240}px, 0)`;
      pointerLight.style.opacity = "1";
    }

    function onPointerMove(event) {
      if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointerLight);
    }

    function onPointerLeave() {
      if (pointerLight) pointerLight.style.opacity = "0";
    }

    function syncPointerLight() {
      const enabled = finePointer.matches && !reducedMotion.matches;
      if (enabled && !pointerLight) {
        pointerLight = document.createElement("div");
        pointerLight.className = "motion-pointer-light";
        pointerLight.setAttribute("aria-hidden", "true");
        document.body.appendChild(pointerLight);
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.addEventListener("pointerleave", onPointerLeave);
        window.addEventListener("blur", onPointerLeave);
      } else if (!enabled && pointerLight) {
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("blur", onPointerLeave);
        if (pointerFrame) cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        pointerLight.remove();
        pointerLight = undefined;
      }
    }

    if (!reducedMotion.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
      );

      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        // Content already in view remains visible, preventing a hydration flash.
        if (bounds.bottom <= 0 || bounds.top < window.innerHeight * 0.72) {
          reveal(element, false);
          return;
        }

        element.classList.add("motion-pending");
        const number = element.querySelector(".stat-number");
        const original = number?.textContent?.trim();
        const match = original?.match(/^(\d+(?:\.\d+)?)(.*)$/);
        if (match) {
          counters.set(element, {
            node: number,
            original,
            target: Number(match[1]),
            decimal: match[1].includes("."),
            suffix: match[2],
          });
          number.textContent = `0${match[2]}`;
        }
        observer.observe(element);
      });
    }

    function revealThroughHash() {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      // Anchor navigation may skip whole sections in one smooth scroll. Keep
      // the path to the destination readable rather than leaving blank gaps.
      const targetY = target.getBoundingClientRect().top + window.scrollY;
      elements.forEach((element) => {
        const elementY = element.getBoundingClientRect().top + window.scrollY;
        if (elementY <= targetY + window.innerHeight * 0.6) reveal(element, false);
      });
    }

    let currentHash = window.location.hash;
    revealThroughHash();
    const onHashChange = () => {
      currentHash = window.location.hash;
      revealThroughHash();
    };
    const onScroll = () => {
      // Next.js client-side hash navigation can update history without firing
      // the native hashchange event; the first scroll frame catches that case.
      if (window.location.hash !== currentHash) onHashChange();
    };
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFocusIn);

    if (timeline) {
      if (!reducedMotion.matches) timeline.classList.add("timeline-progress-ready");
      if ("IntersectionObserver" in window) {
        timelineObserver = new IntersectionObserver(
          ([entry]) => {
            timelineVisible = entry.isIntersecting;
            if (timelineVisible) scheduleTimeline();
          },
          { rootMargin: "20% 0px" },
        );
        timelineObserver.observe(timeline);
      } else {
        timelineVisible = true;
      }
      if ("ResizeObserver" in window) {
        timelineResizeObserver = new ResizeObserver(scheduleTimeline);
        timelineResizeObserver.observe(timeline);
      }
      window.addEventListener("scroll", scheduleTimeline, { passive: true });
      window.addEventListener("resize", scheduleTimeline);
      scheduleTimeline();
    }

    finePointer.addEventListener("change", syncPointerLight);
    syncPointerLight();

    function onPreferenceChange() {
      if (reducedMotion.matches) {
        observer?.disconnect();
        elements.forEach((element) => reveal(element, false));
        if (timelineFrame) cancelAnimationFrame(timelineFrame);
        timelineFrame = 0;
        timeline?.classList.remove("timeline-progress-ready");
      } else {
        timeline?.classList.add("timeline-progress-ready");
        scheduleTimeline();
      }
      syncPointerLight();
    }

    reducedMotion.addEventListener("change", onPreferenceChange);

    return () => {
      observer?.disconnect();
      timelineObserver?.disconnect();
      timelineResizeObserver?.disconnect();
      reducedMotion.removeEventListener("change", onPreferenceChange);
      finePointer.removeEventListener("change", syncPointerLight);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("scroll", scheduleTimeline);
      window.removeEventListener("resize", scheduleTimeline);
      if (timelineFrame) cancelAnimationFrame(timelineFrame);
      timeline?.classList.remove("timeline-progress-ready");
      timeline?.style.removeProperty("--timeline-progress");
      if (pointerLight) {
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("blur", onPointerLeave);
        pointerLight.remove();
      }
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      elements.forEach((element) => {
        element.classList.remove("motion-pending", "motion-entering");
        const handler = endHandlers.get(element);
        if (handler) element.removeEventListener("animationend", handler);
        finishCounter(element);
      });
    };
  }, [pathname]);

  return null;
}

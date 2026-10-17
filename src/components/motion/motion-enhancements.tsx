"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { cubicBezier } from "motion";
import { animate } from "motion/mini";
import { getMotionTiming } from "@/lib/motion";

export function MotionEnhancements() {
  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const timing = getMotionTiming();
    const animations = new Map<Element, ReturnType<typeof animate>>();
    let lenis: Lenis | undefined;
    const cta = document.querySelector<HTMLElement>("[data-magnetic]");
    let bounds: DOMRect | undefined;
    let frame = 0;
    let parallaxFrame = 0;
    const hero = document.querySelector<HTMLElement>(".hero");
    const decoration = document.querySelector<HTMLElement>(".hero-stickers");

    function resetParallax() {
      cancelAnimationFrame(parallaxFrame);
      decoration?.style.removeProperty("translate");
    }
    function moveParallax(event: PointerEvent) {
      if (
        reducedMotion.matches ||
        !finePointer.matches ||
        !decoration ||
        event.pointerType === "touch"
      )
        return;
      const x = (event.clientX / innerWidth - 0.5) * 12;
      const y = (event.clientY / innerHeight - 0.5) * 8;
      cancelAnimationFrame(parallaxFrame);
      parallaxFrame = requestAnimationFrame(() => {
        decoration.style.translate = `${x}px ${y}px`;
      });
    }

    function resetMagnet() {
      cancelAnimationFrame(frame);
      bounds = undefined;
      if (cta) cta.style.removeProperty("transform");
    }

    function enterMagnet() {
      if (!reducedMotion.matches && finePointer.matches && cta) {
        bounds = cta.getBoundingClientRect();
      }
    }

    function moveMagnet(event: PointerEvent) {
      if (!bounds || !cta || event.pointerType === "touch") return;
      const x = Math.max(
        -4,
        Math.min(4, (event.clientX - bounds.left - bounds.width / 2) * 0.08),
      );
      const y = Math.max(
        -3,
        Math.min(3, (event.clientY - bounds.top - bounds.height / 2) * 0.08),
      );
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cta.style.transform = `translate(${x}px, ${y}px)`;
      });
    }

    function syncPreferences() {
      lenis?.destroy();
      lenis = undefined;
      resetMagnet();
      resetParallax();
      if (reducedMotion.matches) {
        animations.forEach((animation) => animation.complete());
        animations.clear();
      } else {
        lenis = new Lenis({
          autoRaf: true,
          anchors: true,
          duration: timing.duration,
          easing: cubicBezier(...timing.ease),
          syncTouch: false,
          prevent: () => document.querySelector("dialog[open]") !== null,
        });
      }
    }

    // Content is visible by default. Only animate when it first enters view.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          if (reducedMotion.matches || target.contains(document.activeElement))
            return;
          const animation = animate(
            target,
            { opacity: [0, 1], transform: ["translateY(16px)", "none"] },
            timing,
          );
          animations.set(target, animation);
          animation.then(() => animations.delete(target));
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((section) => observer.observe(section));

    function revealFocusedContent(event: FocusEvent) {
      if (!(event.target instanceof Node)) return;
      for (const [section, animation] of animations) {
        if (section.contains(event.target)) animation.complete();
      }
    }

    hero?.addEventListener("pointermove", moveParallax);
    hero?.addEventListener("pointerleave", resetParallax);
    syncPreferences();
    reducedMotion.addEventListener("change", syncPreferences);
    finePointer.addEventListener("change", resetMagnet);
    document.addEventListener("focusin", revealFocusedContent);
    cta?.addEventListener("pointerenter", enterMagnet);
    cta?.addEventListener("pointermove", moveMagnet);
    cta?.addEventListener("pointerleave", resetMagnet);
    cta?.addEventListener("pointercancel", resetMagnet);
    cta?.addEventListener("focus", resetMagnet);

    return () => {
      hero?.removeEventListener("pointermove", moveParallax);
      hero?.removeEventListener("pointerleave", resetParallax);
      resetParallax();
      observer.disconnect();
      animations.forEach((animation) => animation.complete());
      lenis?.destroy();
      resetMagnet();
      reducedMotion.removeEventListener("change", syncPreferences);
      finePointer.removeEventListener("change", resetMagnet);
      document.removeEventListener("focusin", revealFocusedContent);
      cta?.removeEventListener("pointerenter", enterMagnet);
      cta?.removeEventListener("pointermove", moveMagnet);
      cta?.removeEventListener("pointerleave", resetMagnet);
      cta?.removeEventListener("pointercancel", resetMagnet);
      cta?.removeEventListener("focus", resetMagnet);
    };
  }, []);

  return null;
}

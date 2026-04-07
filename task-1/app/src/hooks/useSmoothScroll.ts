"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth Scroll Hook using Lenis
 * 
 * Features:
 * - Inertia-based smooth scrolling
 * - Integrated with GSAP ScrollTrigger
 * - Configurable duration and easing
 * - Automatic cleanup
 * 
 * Usage:
 * const lenis = useSmoothScroll();
 * 
 * // Scroll to section
 * lenis?.scrollTo("#section-id");
 */

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with premium settings
    const lenis = new Lenis({
      duration: 1.2, // Duration of scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: 0,
              duration: 1.5,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return lenisRef.current;
}

/**
 * Scroll to section helper
 */
export function scrollToSection(sectionId: string, offset: number = 0) {
  const element = document.querySelector(sectionId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
}

/**
 * Get scroll progress for a section
 */
export function useScrollProgress(sectionRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: () => {
        // Progress is available via self.progress
        // Can be used with state or callbacks
      },
    });

    return () => {
      trigger.kill();
    };
  }, [sectionRef]);
}

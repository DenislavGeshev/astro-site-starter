/**
 * SmoothScroll
 *
 * Wraps the entire site to enable Lenis smooth scrolling. Lenis takes over
 * native scroll and provides the buttery-smooth feel you see on award-winning
 * agency sites.
 *
 * Lenis automatically respects `prefers-reduced-motion`, users who have that
 * setting enabled will get native scroll instead.
 *
 * Why a React island: Lenis runs in the browser only. It needs `window`, so
 * it can't render on the server. We use `client:idle` (set in BaseLayout) so
 * it loads after critical above-the-fold content.
 *
 * Docs: https://github.com/darkroomengineering/lenis
 */

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Props {
  children: ReactNode;
}

export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    // Respect users who prefer reduced motion, skip Lenis entirely
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis with sensible defaults for a marketing site
    const lenis = new Lenis({
      // Duration controls how "slidy" the scroll feels. 1.0–1.5 is good.
      duration: 1.2,
      // Easing function. This one is the Lenis default and feels great.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // 'vertical' is the default. Don't change unless you have a reason.
      orientation: 'vertical',
      // Wheel multiplier, how much one mouse wheel tick scrolls
      wheelMultiplier: 1,
      // Touch multiplier, how responsive touch scroll feels on mobile
      touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ScrollTrigger so scroll-triggered animations
    // play correctly with smooth scroll. Without this, ScrollTrigger thinks
    // the page hasn't scrolled even when Lenis has moved it.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis's animation loop with GSAP's ticker for perfect sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // GSAP's ticker normally smooths via lag, we don't want that with Lenis
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount: kill Lenis and remove the ticker callback
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  // Render the children (the rest of the site) directly. Lenis attaches
  // to <html> automatically, so no wrapper element is needed.
  return <>{children}</>;
}

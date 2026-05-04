/**
 * AnimatedText
 *
 * A reusable text component that fades in and slides up when scrolled into view.
 * Built with GSAP and ScrollTrigger.
 *
 * Why a React island: GSAP runs in the browser and needs to attach to a real
 * DOM element. The `client:visible` directive (set when used in Astro) means
 * this only hydrates when the element scrolls into view, saving JS for elements
 * the user might never reach.
 *
 * Usage in an Astro page:
 *   <AnimatedText
 *     client:visible
 *     as="h1"
 *     className="text-5xl font-bold"
 *   >
 *     Your headline here
 *   </AnimatedText>
 */

import { useRef, type ReactNode, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger once. GSAP handles deduplication internally.
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  /** Content to animate (text, inline elements) */
  children: ReactNode;
  /** HTML element to render. Defaults to <p>. Use 'h1', 'h2', 'span', etc. */
  as?: ElementType;
  /** Tailwind / CSS classes */
  className?: string;
  /** Delay before animation starts (in seconds). Useful for staggering. */
  delay?: number;
  /** Animation duration in seconds. Default 0.8. */
  duration?: number;
  /** How far the element slides up from (in pixels). Default 30. */
  distance?: number;
  /** If true, animation only runs once. Default true. */
  once?: boolean;
}

export default function AnimatedText({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  duration = 0.8,
  distance = 30,
  once = true,
}: Props) {
  const elementRef = useRef<HTMLElement>(null);

  // useGSAP automatically handles cleanup when the component unmounts.
  // Without it, you'd need to manually kill the animation in a useEffect return.
  useGSAP(
    () => {
      const el = elementRef.current;
      if (!el) return;

      // Set initial state. We do this in JS rather than CSS so the element
      // is visible if JavaScript fails to load (progressive enhancement).
      gsap.set(el, { opacity: 0, y: distance });

      // Animate to final state when the element enters the viewport
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          // Fire when the top of the element hits 85% down the viewport
          start: 'top 85%',
          // toggleActions: onEnter, onLeave, onEnterBack, onLeaveBack
          // 'play none none none' = play once and never reverse
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    },
    { scope: elementRef }
  );

  // The `as` prop lets the parent decide what HTML tag to use semantically.
  // We use a `Tag` variable so React renders the right element type.
  return (
    <Tag ref={elementRef as any} className={className}>
      {children}
    </Tag>
  );
}

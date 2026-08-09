import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface UseSectionRevealOptions {
  selector?: string;
  stagger?: number;
  start?: string;
}

export function useSectionReveal(
  scopeRef: RefObject<HTMLElement | null>,
  { selector = '[data-reveal]', stagger = 0.1, start = 'top 75%' }: UseSectionRevealOptions = {}
) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const scope = scopeRef.current;
      if (!scope) return;

      const targets = scope.querySelectorAll(selector);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scope,
            start,
            once: true,
          },
        }
      );
    },
    { scope: scopeRef }
  );
}

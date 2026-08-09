'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Force scroll to top on page load
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    // Smooth-scroll anchor navigation
    const onClickAnchor = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      e.preventDefault();

      if (href === '#') {
        lenis.scrollTo(0, { duration: 1.2 });
        return;
      }

      const el = document.querySelector(href);
      if (!el) return;

      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.2 });
    };

    document.addEventListener('click', onClickAnchor);

    function updateLenis(time: number) {
      lenis.raf(time * 1000);
    }

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener('click', onClickAnchor);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return <>{children}</>;
}

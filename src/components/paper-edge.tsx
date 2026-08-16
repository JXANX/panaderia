'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

// Borde de papel que se despliega cuando entra una sección: la textura física
// separa las superficies de la página sin loops ni pinning.
export function PaperEdge() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const root = scope.current;
      if (!root) return;

      gsap.fromTo(
        root,
        { scaleY: 0.1, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'top 35%',
            scrub: true,
          },
        }
      );
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      aria-hidden
      className="paper-grain relative h-12 origin-top bg-beige md:h-14"
    >
      <div className="awning-stripes absolute bottom-0 left-0 h-1.5 w-full" />
    </div>
  );
}

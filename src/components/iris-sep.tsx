'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

// Diafragma de la fachada entre secciones: la lente de la esquina se cierra
// sobre la última luz de la hornada y se abre sobre la noche de la carta.
export function IrisSep() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const root = scope.current;
      if (!root) return;

      const prev = root.previousElementSibling as HTMLElement | null;
      const circle = root.querySelector('[data-iris-circle]');
      const backdrop = root.querySelector('[data-iris-backdrop]');
      if (!prev || !circle || !backdrop) return;

      const tl = gsap.timeline({ ease: 'none' });

      tl.fromTo(
        circle,
        { clipPath: 'circle(0% at 50% 50%)', scale: 1.12 },
        { clipPath: 'circle(100% at 50% 50%)', scale: 1, duration: 0.45 },
        0
      )
        .to(backdrop, { opacity: 1, duration: 0.12 }, 0.42)
        .to(circle, { scale: 1.05, duration: 0.3, ease: 'power1.inOut' }, 0.52)
        .to(backdrop, { opacity: 0, duration: 0.2 }, 0.78);

      const st = ScrollTrigger.create({
        trigger: prev,
        start: 'bottom 55%',
        end: 'bottom -55%',
        scrub: true,
        animation: tl,
      });

      return () => {
        st.kill();
        tl.kill();
      };
    },
    { scope }
  );

  return (
    <div ref={scope} aria-hidden className="relative">
      <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center">
        <div
          data-iris-backdrop
          className="absolute inset-0 bg-cacao opacity-0"
        />
        <div
          data-iris-circle
          className="relative aspect-square w-[160vmax] overflow-hidden will-change-[clip-path,transform]"
          style={{ clipPath: 'circle(0% at 50% 50%)' }}
        >
          <Image
            src="/facade.webp"
            alt=""
            fill
            sizes="160vmax"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

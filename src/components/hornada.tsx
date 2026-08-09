'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionReveal } from '@/components/use-section-reveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function Hornada() {
  const scopeRef = useRef<HTMLElement>(null);
  useSectionReveal(scopeRef, { stagger: 0.12 });

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const root = scopeRef.current;
      if (!root) return;
      const img = root.querySelector('[data-hornada-img]');
      if (!img) return;

      gsap.fromTo(
        img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    { scope: scopeRef }
  );

  return (
    <section
      id="hornada"
      ref={scopeRef}
      className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
        {/* Framed photo of the day — parallax lento dentro del marco */}
        <div data-reveal className="relative md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden border-[6px] border-cream shadow-[0_30px_60px_-25px_rgba(29,25,14,0.5)]">
            <div className="absolute inset-0 scale-125 will-change-transform">
              <div data-hornada-img className="absolute inset-0">
                <Image
                  src="/pan-campo.png"
                  alt="Hogaza de campo recién salida del horno con la corteza partida"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          {/* toldo rompiendo la esquina del marco */}
          <div
            className="awning-stripes absolute -left-3 -top-3 hidden h-14 w-40 rotate-3 border-4 border-cream md:block"
            aria-hidden
          />
        </div>

        {/* Copy de la destacada */}
        <div className="md:col-span-6 md:col-start-7">
          <p data-reveal className="mb-3 text-sm uppercase tracking-[0.35em] text-brown">
            La hornada de hoy
          </p>
          <h2 data-reveal className="font-display text-6xl font-semibold leading-none tracking-tight text-ink md:text-8xl">
            Hogaza de <span className="italic text-green">campo</span>
          </h2>
          <p data-reveal className="mt-6 max-w-md leading-relaxed text-brown">
            Corteza oscura, miga alveolada y un día entero de fermentación en masa madre.
            Sale del horno a las 6:30 y al mediodía no queda ni una. La sacamos en tandas,
            así que quien madruga, se la lleva.
          </p>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-olive/20 pt-6">
            <span className="font-display text-5xl font-medium italic text-ink">4,20 €</span>
            <span className="text-xs uppercase tracking-[0.25em] text-brown">
              la pieza de 1,2 kg · hasta agotar hornada
            </span>
          </div>

          <a
            data-reveal
            href="#esquina"
            className="mt-10 inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5"
          >
            Reservar una
          </a>
        </div>
      </div>
    </section>
  );
}

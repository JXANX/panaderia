'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionReveal } from '@/components/use-section-reveal';
import { useStamp } from '@/components/use-stamp';
import { PriceTag } from '@/components/price-tag';
import { whatsappLink } from '@/lib/site';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const fases = [
  { t: '4:30', label: 'Enciende el fuego' },
  { t: '5:00', label: 'Amasa la masa madre' },
  { t: '5:45', label: 'Al horno, en tandas' },
  { t: '6:30', label: 'Pan caliente a la calle' },
];

export function Hornada() {
  const scopeRef = useRef<HTMLElement>(null);
  useSectionReveal(scopeRef, { stagger: 0.12 });
  const ctaRef = useStamp<HTMLAnchorElement>();

  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const strip = root.querySelector('[data-horno-vivo]');

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Hornada completa, estática y visible
        const fill = strip?.querySelector('[data-horno-fill]');
        if (fill) gsap.set(fill, { scaleX: 1 });
        strip?.querySelectorAll('[data-horno-node]').forEach((n) => n.classList.add('is-activa'));
        return;
      }

      const img = root.querySelector('[data-hornada-img]');
      if (img) {
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
      }

      // ── El horno, ahora: la línea de la hornada avanza con el scroll ──
      if (!strip) return;
      const fill = strip.querySelector('[data-horno-fill]');
      const nodes = strip.querySelectorAll<HTMLElement>('[data-horno-node]');
      if (!fill || !nodes.length) return;

      const st = ScrollTrigger.create({
        trigger: strip,
        start: 'top 85%',
        end: 'bottom 55%',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(fill, { scaleX: p });
          nodes.forEach((n, i) => {
            const threshold = (i + 0.5) / nodes.length;
            n.classList.toggle('is-activa', p >= threshold);
          });
        },
      });

      return () => st.kill();
    },
    { scope: scopeRef }
  );

  return (
    <section
      id="hornada"
      ref={scopeRef}
      className="relative overflow-hidden"
    >
      {/* Bicolor real: mitad vainilla / mitad chocolate, costura de toldo en el medio */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Panel vainilla — la foto con marco de vidriera */}
        <div className="paper-grain relative">
          <div className="relative h-full md:min-h-[640px]">
            <div className="relative mx-auto h-full max-w-[640px] px-5 py-24 md:px-10 md:py-32">
              <div data-reveal className="relative aspect-[4/5] overflow-hidden border-[6px] border-vanilla shadow-[0_30px_60px_-25px_rgba(59,42,35,0.5)]">
                <div className="absolute inset-0 scale-125 will-change-transform">
                  <div data-hornada-img className="absolute inset-0">
                    <Image
                      src="/pan-campo-hornada.webp"
                      alt="Hogaza de campo recién salida del horno con la corteza partida"
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* toldo rompiendo la esquina del marco */}
              <div
                className="awning-stripes absolute -left-3 -top-3 hidden h-14 w-40 rotate-3 border-4 border-vanilla md:block"
                aria-hidden
              />
            </div>
          </div>
        </div>

        {/* Panel chocolate — el turno de la 6:30 */}
        <div className="relative bg-cacao text-cream">
          <div className="flex h-full flex-col justify-center px-5 py-24 md:px-10 lg:px-16 md:py-32">
            <p data-reveal className="mb-3 text-sm uppercase tracking-[0.35em] text-caramel">
              La hornada de hoy
            </p>
            <h2
              data-reveal
              className="font-display text-6xl font-semibold leading-[0.9] tracking-tight md:text-7xl lg:text-8xl"
            >
              Hogaza de <span className="text-caramel">campo</span>
            </h2>
            <p data-reveal className="mt-6 max-w-md leading-relaxed text-beige">
              Corteza oscura, miga alveolada y un día entero de fermentación en masa madre.
              Sale del horno a las 6:30 y al mediodía no queda ni una. La sacamos en tandas,
              así que quien madruga, se la lleva.
            </p>

            <div
              data-reveal
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream/20 pt-6"
            >
              <PriceTag size="lg">$ 7.500</PriceTag>
              <span className="text-xs uppercase tracking-[0.25em] text-cream/70">
                la pieza de 1,2 kg · hasta agotar hornada
              </span>
            </div>

            <a
              ref={ctaRef}
              data-reveal
              href={whatsappLink('Hola, quiero reservar una hogaza de campo.')}
              target="_blank"
              rel="noopener noreferrer"
              className="stamp-btn mt-10 inline-flex w-fit items-center gap-2 bg-cream px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-cacao transition-all hover:-translate-y-0.5 hover:bg-caramel hover:text-cacao"
            >
              Reservar una por WhatsApp
            </a>
          </div>

          {/* Costura de toldo en el borde entre paneles */}
          <div
            className="awning-stripes absolute -left-3 top-0 hidden h-full w-6 opacity-90 md:block"
            aria-hidden
          />
        </div>
      </div>

      {/* El horno, ahora — la hornada en vivo avanza con el scroll */}
      <div data-horno-vivo className="relative bg-cacao text-cream">
        <div className="awning-stripes absolute left-0 top-0 h-1.5 w-full opacity-70" aria-hidden />
        <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-14">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-caramel">
              El horno, ahora
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-beige/70">
              avanza con el scroll
            </p>
          </div>

          <div className="relative mt-10">
            <div className="relative h-px w-full bg-cream/20">
              <div
                data-horno-fill
                className="absolute inset-0 origin-left bg-caramel"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>

            <div className="flex items-start justify-between gap-2">
              {fases.map((f) => (
                <div
                  key={f.label}
                  data-horno-node
                  className="horno-node flex w-20 flex-col items-center text-center md:w-40"
                >
                  <span
                    className="horno-marker -translate-y-1/2 block size-3 rounded-full border-2 border-cacao bg-cream/40"
                    aria-hidden
                  />
                  <p className="horno-t mt-2 font-display text-xl font-semibold text-cream/70 md:text-2xl">
                    {f.t}
                  </p>
                  <p className="horno-label mt-1 text-xs text-beige/70">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

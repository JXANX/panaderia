'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useSectionReveal } from '@/components/use-section-reveal';

export function Story() {
  const scopeRef = useRef<HTMLElement>(null);
  useSectionReveal(scopeRef, { stagger: 0.12 });

  return (
    <section id="oficio" ref={scopeRef} className="relative overflow-hidden">
      {/* wood-grain worktable band as the section ground */}
      <div className="relative">
        <Image
          src="/wood-grain.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-cacao/60" />

        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
          {/* Big pull-quote, oversized, overlapping */}
          <div data-reveal className="md:col-span-7">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-caramel">El oficio</p>
            <blockquote className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream md:text-6xl">
              Amasamos de noche para que el barrio desayune
              <span className="text-caramel"> pan de verdad</span>.
            </blockquote>
            <p className="mt-8 max-w-md leading-relaxed text-beige">
              No hay atajos. Harina de molino de piedra, agua, sal y una masa madre que
              alimentamos desde 1974. La fermentación tarda un día entero — y eso se nota
              en cada corteza.
            </p>
          </div>

          {/* Editorial — prosa, sin cifras sueltas */}
          <div
            data-reveal
            className="flex flex-col justify-end gap-6 md:col-span-5 md:items-end"
          >
            <p className="max-w-sm text-sm leading-relaxed text-beige">
              El obrador abre de noche: la masa madre se alimenta, el horno se
              enciende a las cuatro y media y a las 6:30 el pan sale caliente a
              la calle.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-beige">
              Tres generaciones en la misma esquina de Mar de Ajó, sin atajos y
              con la misma paciencia.
            </p>
            <div
              className="awning-stripes h-2 w-full max-w-[160px] opacity-80"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

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
          src="/wood-grain.png"
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
              <span className="italic text-caramel"> pan de verdad</span>.
            </blockquote>
            <p className="mt-8 max-w-md leading-relaxed text-beige">
              No hay atajos. Harina de molino de piedra, agua, sal y una masa madre que
              alimentamos desde 1974. La fermentación tarda un día entero — y eso se nota
              en cada corteza.
            </p>
          </div>

          {/* Stacked numbers, irregular rhythm */}
          <div className="flex flex-col justify-end gap-8 md:col-span-5 md:items-end">
            {[
              ['24 h', 'de fermentación lenta'],
              ['3', 'generaciones en la esquina'],
              ['6:30', 'el pan sale del horno'],
            ].map(([big, small]) => (
              <div data-reveal key={small} className="text-left md:text-right">
                <p className="font-display text-5xl font-semibold leading-none text-cream md:text-6xl">
                  {big}
                </p>
                <p className="mt-1 text-sm uppercase tracking-widest text-beige">{small}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

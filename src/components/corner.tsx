'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { TbClock, TbMapPin } from 'react-icons/tb';
import { useSectionReveal } from '@/components/use-section-reveal';
import { useStamp } from '@/components/use-stamp';
import { whatsappLink } from '@/lib/site';

export function Corner() {
  const scopeRef = useRef<HTMLElement>(null);
  useSectionReveal(scopeRef, { stagger: 0.12 });
  const ctaRef = useStamp<HTMLAnchorElement>();

  return (
    <section id="esquina" ref={scopeRef} className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Facade photo — the identity of the place */}
        <div data-reveal className="relative md:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden border-[6px] border-vanilla shadow-[0_30px_60px_-25px_rgba(59,42,35,0.5)]">
            <Image
              src="/facade.webp"
              alt="La fachada de Vainilla y Chocolate, con el toldo y el mostrador de siempre"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          {/* awning tag breaking the corner */}
          <div
            className="awning-stripes absolute -right-3 -top-3 hidden h-14 w-40 rotate-3 border-4 border-vanilla md:block"
            aria-hidden
          />
        </div>

        {/* Visit card on chocolate tiles */}
        <div
          data-reveal
          className="tile-grid relative flex flex-col justify-between overflow-hidden p-8 text-cream md:col-span-5"
        >
          <div className="absolute inset-0 bg-cacao/20" aria-hidden />
          {/* costura de toldo en el borde con la foto */}
          <div
            className="awning-stripes absolute -left-3 top-0 hidden h-full w-6 opacity-90 md:block"
            aria-hidden
          />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.35em] text-cream/80">La esquina</p>
            <h2 className="mt-3 font-display text-5xl font-semibold leading-none">
              Pásate <span className="text-caramel">a oler</span> el pan
            </h2>
          </div>

          <ul className="relative mt-10 space-y-5 text-cream">
            <li className="flex items-start gap-3">
              <TbMapPin className="mt-0.5 shrink-0 text-xl" strokeWidth={2} />
              <span>
                Mar de Ajó
                <br />
                Buenos Aires, Argentina
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TbClock className="mt-0.5 shrink-0 text-xl" strokeWidth={2} />
              <span>
                Martes a domingo
                <br />
                6:30 – 14:00 · 17:00 – 20:30
              </span>
            </li>
          </ul>

          <a
            ref={ctaRef}
            href={whatsappLink('Hola, quiero encargar una hornada.')}
            target="_blank"
            rel="noopener noreferrer"
            className="stamp-btn relative mt-10 inline-flex w-fit items-center gap-2 bg-cream px-6 py-3 text-sm font-medium uppercase tracking-widest text-cacao transition-all hover:-translate-y-0.5 hover:bg-caramel hover:text-cacao"
          >
            Encargar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

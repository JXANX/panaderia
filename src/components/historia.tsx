'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionReveal } from '@/components/use-section-reveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const milestones = [
  {
    year: '1974',
    title: 'La esquina abre',
    desc: 'Julio y Carmen montan el obrador en el sótano y el mostrador en la planta baja. El pan sale a las 6:30, como sale hoy.',
  },
  {
    year: '1989',
    title: 'La segunda generación llega al horno',
    desc: 'Ramiro vuelve de aprender el oficio y trae la masa madre que seguimos alimentando cada noche.',
  },
  {
    year: '2004',
    title: 'Vuelve el horno de leña',
    desc: 'Después de años de gas, reconstruimos el horno de obra. El barrio notó la diferencia en la primera hornada.',
  },
  {
    year: '2024',
    title: 'Cincuenta años de masa madre',
    desc: 'La tercera generación está en el obrador. Mismo mostrador, mismos aromas, misma hora.',
  },
];

export function Historia() {
  const scopeRef = useRef<HTMLElement>(null);
  useSectionReveal(scopeRef, { stagger: 0.1 });

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const mm = gsap.matchMedia();

      // La escena pineada solo existe en desktop
      mm.add('(min-width: 768px)', () => {
        const root = scopeRef.current;
        if (!root) return;
        const pin = root.querySelector('[data-historia-pin]');
        if (!pin) return;

        const years = pin.querySelectorAll<HTMLElement>('[data-historia-year]');
        const items = pin.querySelectorAll<HTMLElement>('[data-historia-item]');
        const fill = pin.querySelector('[data-historia-fill]');
        if (!years.length || !fill) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            // más scroll por hito: ~120vh cada uno para leer con calma
            end: '+=480vh',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const win = 1 / years.length;

        // la línea se dibuja a lo largo de todo el tramo
        tl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none' }, 0);

        years.forEach((year, i) => {
          const at = i * win;
          if (i > 0) {
            tl.set(years[i - 1], { autoAlpha: 0 }, at).fromTo(
              year,
              { autoAlpha: 0, y: 40 },
              { autoAlpha: 1, y: 0, duration: 0.12, ease: 'power2.out' },
              at + 0.03
            );
          }
        });

        items.forEach((item, i) => {
          const at = i * win;
          const bar = item.querySelector<HTMLElement>('[data-historia-bar]');
          if (i > 0) {
            const prevBar = items[i - 1].querySelector<HTMLElement>('[data-historia-bar]');

            // el hito anterior pasa a inactivo (apagado, más pequeño, desplazado)
            tl.set(items[i - 1], { opacity: 0.25, scale: 0.96, x: 24 }, at);
            if (prevBar) tl.to(prevBar, { scaleY: 0, duration: 0.05, ease: 'power1.in' }, at);

            // el hito actual se activa con contraste claro (opacidad + escala + barra verde)
            tl.fromTo(
              item,
              { opacity: 0.25, scale: 0.96, x: 24 },
              { opacity: 1, scale: 1.05, x: 0, duration: 0.12, ease: 'power2.out' },
              at + 0.03
            );
            if (bar) tl.to(bar, { scaleY: 1, duration: 0.1, ease: 'power2.out' }, at + 0.03);
          }
        });
      });

      return () => mm.revert();
    },
    { scope: scopeRef }
  );

  return (
    <section id="historia" ref={scopeRef} className="relative bg-cream">
      {/* DESKTOP — escena pineada con progreso ligado al scroll */}
      <div data-historia-pin className="hidden h-screen overflow-hidden md:block">
        <div className="grid h-full max-w-[1400px] items-center gap-10 px-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm uppercase tracking-[0.35em] text-choc">
              Tres generaciones
            </p>
            <div className="relative mt-4 h-[12rem]">
              {milestones.map((m, i) => (
                <span
                  key={m.year}
                  data-historia-year
                  className={`absolute inset-x-0 bottom-0 font-display text-[12rem] font-semibold leading-none tracking-tight text-cacao ${
                    i === 0 ? '' : 'opacity-0'
                  }`}
                >
                  {m.year}
                  <span className="text-milk">.</span>
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="relative">
              <div className="absolute bottom-0 left-1.5 top-0 w-px bg-beige" />
              <div
                data-historia-fill
                className="absolute bottom-0 left-1.5 top-0 w-px origin-top bg-milk"
                style={{ transform: 'scaleY(0)' }}
              />
              <div className="space-y-2 pl-10">
                {milestones.map((m, i) => (
                  <article
                    key={m.year}
                    data-historia-item
                    className={`relative py-4 will-change-transform ${
                      i === 0 ? '' : 'opacity-25 scale-[0.96] translate-x-6'
                    }`}
                  >
                    <span
                      data-historia-bar
                      aria-hidden
                      className="absolute -left-[2.125rem] top-0 h-full w-1.5 origin-top bg-milk"
                      style={{ transform: i === 0 ? 'scaleY(1)' : 'scaleY(0)' }}
                    />
                    <span className="absolute -left-[2.5rem] top-1/2 size-3 -translate-y-1/2 bg-milk" />
                    <p className="font-mono text-xs tracking-[0.3em] text-choc">{m.year}</p>
                    <h3 className="mt-1 font-display text-3xl font-semibold leading-tight text-cacao">
                      {m.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-choc">
                      {m.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE — lista estática, sin pin */}
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:hidden">
        <div data-reveal className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-choc">
            Tres generaciones
          </p>
          <h2 className="mt-2 font-display text-5xl font-semibold leading-none tracking-tight text-cacao">
            De 1974 a <span className="text-milk">hoy</span>
          </h2>
        </div>
        <div className="border-l-2 border-beige">
          {milestones.map((m) => (
            <article
              data-reveal
              key={m.year}
              className="relative border-b border-beige/60 py-6 pl-6 last:border-0"
            >
              <span className="absolute -left-[5px] top-8 size-2.5 bg-milk" />
              <p className="font-mono text-xs tracking-[0.3em] text-choc">{m.year}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-cacao">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-choc">{m.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

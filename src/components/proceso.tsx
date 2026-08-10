'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionReveal } from '@/components/use-section-reveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const steps = [
  {
    n: '01',
    title: 'Harina de molino de piedra',
    desc: 'Trigo de la meseta, molido a piedra. Nada de mejorantes, nada de prisa: solo grano y agua.',
  },
  {
    n: '02',
    title: 'Masa madre viva',
    desc: 'La alimentamos desde 1974. Le damos de comer cada noche, llueva o truene.',
  },
  {
    n: '03',
    title: 'Fermentación de 24 horas',
    desc: 'La masa descansa un día entero. Ese tiempo no se puede acelerar: es el sabor.',
  },
  {
    n: '04',
    title: 'Horno de leña, 6:30',
    desc: 'Madrugada. Encendemos el fuego para que el barrio desayune caliente.',
  },
];

export function Proceso() {
  const scopeRef = useRef<HTMLElement>(null);
  useSectionReveal(scopeRef, { stagger: 0.1 });

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const root = scopeRef.current;
      if (!root) return;
      const fill = root.querySelector('[data-proceso-line]');
      if (!fill) return;

      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: fill.parentElement,
            start: 'top 85%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );
    },
    { scope: scopeRef }
  );

  return (
    <section
      id="proceso"
      ref={scopeRef}
      className="paper-grain border-y border-beige bg-vanilla/60"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div
          data-reveal
          className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-choc">
              Nuestro proceso
            </p>
            <h2 className="font-display text-6xl font-semibold leading-none tracking-tight text-cacao md:text-8xl">
              De la harina <span className="italic text-milk">al pan</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-choc">
            Cuatro pasos, un día entero. Sin atajos desde 1974.
          </p>
        </div>

        {/* línea de progreso que se dibuja con el scroll */}
        <div data-reveal className="relative mb-12 hidden md:block">
          <div className="h-px w-full bg-beige" />
          <div
            data-proceso-line
            className="absolute inset-0 h-px origin-left bg-milk"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((step) => (
            <article
              key={step.n}
              data-reveal
              className="border-l-2 border-beige pl-5 transition-colors hover:border-milk md:border-l-0 md:pl-0"
            >
              <p className="font-display text-4xl font-medium italic text-milk md:text-5xl">
                {step.n}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-cacao">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-choc">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

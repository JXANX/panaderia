'use client';

import { useRef } from 'react';
import { useSectionReveal } from '@/components/use-section-reveal';

const quotes = [
  {
    text: 'El pan de aquí huele a domingo a las ocho de la mañana. Vengo todos los días desde que mi abuela me traía de la mano.',
    name: 'Carmen',
    role: 'vecina del 3º · desde 1986',
  },
  {
    text: 'Pido la hogaza de campo antes de que salga, porque si llegas a las diez, te quedas sin ella.',
    name: 'Diego',
    role: 'de la tienda de la esquina',
  },
  {
    text: 'Mis hijos crecieron comiendo sus churros. Ahora vienen ellos solos a por la merienda.',
    name: 'Mari Luz',
    role: 'de toda la vida en el barrio',
  },
];

export function Vecinos() {
  const scopeRef = useRef<HTMLElement>(null);
  useSectionReveal(scopeRef, { stagger: 0.14 });

  return (
    <section id="vecinos" ref={scopeRef} className="bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div data-reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-gold">
              Lo que dice el barrio
            </p>
            <h2 className="font-display text-6xl font-semibold leading-none tracking-tight md:text-8xl">
              Los vecinos <span className="italic text-green">mandan</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-beige">
            No lo decimos nosotros: lo dicen quienes hacen cola antes de las siete.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <article
              key={q.name}
              data-reveal
              className="flex flex-col justify-between border border-paper/15 p-7 transition-colors hover:border-green"
            >
              <p className="font-display text-xl italic leading-snug text-paper md:text-2xl">
                &ldquo;{q.text}&rdquo;
              </p>
              <div className="mt-8 border-t border-paper/15 pt-4">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-green">
                  {q.name}
                </p>
                <p className="mt-1 text-xs text-beige">{q.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

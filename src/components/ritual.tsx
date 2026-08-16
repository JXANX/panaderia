'use client';

import { useRef } from 'react';
import { useSectionReveal } from '@/components/use-section-reveal';

const momentos = [
  {
    hora: '4:30',
    title: 'Se enciende el horno',
    desc: 'La masa que descansó toda la noche entra en tandas. El olor sube por la calle antes del primer café.',
  },
  {
    hora: '6:30',
    title: 'Abre el mostrador',
    desc: 'El pan sale recién hecho y la fila ya está en la puerta. Quien madruga, se lleva la hogaza.',
  },
  {
    hora: '17:00',
    title: 'La segunda pasada',
    desc: 'Volvemos a amasar para la tarde: facturas y churros frescos para la merienda del barrio.',
  },
];

export function Ritual() {
  const scopeRef = useRef<HTMLElement>(null);
  useSectionReveal(scopeRef, { stagger: 0.14 });

  return (
    <section id="ritual" ref={scopeRef} className="bg-cacao text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div data-reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-caramel">
              El oficio de cada día
            </p>
            <h2 className="font-display text-6xl font-semibold leading-none tracking-tight md:text-8xl">
              El turno de las <span className="text-caramel">6:30</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-beige">
            Esto no lo contamos nosotros: es lo que pasa cada mañana en el local.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {momentos.map((m) => (
            <article
              key={m.hora}
              data-reveal
              className="flex flex-col justify-between border border-cream/20 p-7 transition-colors hover:border-caramel"
            >
              <p className="font-display text-5xl font-semibold leading-none text-caramel">
                {m.hora}
              </p>
              <div className="mt-8">
                <h3 className="font-display text-xl font-medium leading-snug text-cream md:text-2xl">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-beige">{m.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

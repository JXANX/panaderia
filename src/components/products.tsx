'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { TbPlus } from 'react-icons/tb';
import { useSectionReveal } from '@/components/use-section-reveal';

type Category = 'Todo' | 'Panes' | 'Churros' | 'Pastelería' | 'Especiales';

type Product = {
  name: string;
  price: string;
  desc: string;
  category: Exclude<Category, 'Todo'>;
  image?: string;
  span: string;
  tall?: boolean;
  offset?: string;
};

const products: Product[] = [
  {
    name: 'Hogaza de campo',
    price: '4,20 €',
    desc: 'Masa madre, corteza oscura y crujiente, miga alveolada. Fermentada 24 h.',
    category: 'Panes',
    image: '/pan-campo.png',
    span: 'md:col-span-5 md:row-span-2',
    tall: true,
  },
  {
    name: 'Churros de la mañana',
    price: '2,80 €',
    desc: 'Recién pasados por la plancha, azucarados. Con chocolate espeso aparte.',
    category: 'Churros',
    image: '/churros.png',
    span: 'md:col-span-4',
  },
  {
    name: 'Barra tradicional',
    price: '1,30 €',
    desc: 'La de toda la vida, corteza fina y crujiente.',
    category: 'Panes',
    span: 'md:col-span-3',
  },
  {
    name: 'Concha & ensaimada',
    price: '2,50 €',
    desc: 'Dulce de hojaldre y azúcar glas, mantequilla de verdad.',
    category: 'Pastelería',
    image: '/pasteleria.png',
    span: 'md:col-span-4',
  },
  {
    name: 'Porras con canela',
    price: '3,10 €',
    desc: 'Más gruesas que el churro, tiernas por dentro.',
    category: 'Churros',
    span: 'md:col-span-3',
    offset: 'md:mt-8',
  },
  {
    name: 'Rosca de aceite',
    price: '3,60 €',
    desc: 'Especial de fin de semana, aceite de oliva y anís.',
    category: 'Especiales',
    span: 'md:col-span-4',
  },
  {
    name: 'Pan de centeno',
    price: '4,80 €',
    desc: 'Denso, de sabor profundo. Se guarda una semana entera.',
    category: 'Panes',
    span: 'md:col-span-3',
  },
  {
    name: 'Empanada de la casa',
    price: '5,40 €',
    desc: 'Masa fina y relleno de temporada. Solo por encargo.',
    category: 'Especiales',
    span: 'md:col-span-5',
    offset: 'md:-mt-8',
  },
];

const categories: Category[] = ['Todo', 'Panes', 'Churros', 'Pastelería', 'Especiales'];

export function Products() {
  const scopeRef = useRef<HTMLElement>(null);
  useSectionReveal(scopeRef, { stagger: 0.08 });
  const [active, setActive] = useState<Category>('Todo');
  const shown = products.filter((p) => active === 'Todo' || p.category === active);

  return (
    <section
      id="carta"
      ref={scopeRef}
      className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32"
    >
      {/* Section header — big, offset */}
      <div data-reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-brown">Del horno de hoy</p>
          <h2 className="font-display text-6xl font-semibold leading-none tracking-tight text-ink md:text-8xl">
            La carta
          </h2>
        </div>

        {/* Category tags — sharp, no pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`border px-4 py-2 text-sm transition-colors ${
                active === cat
                  ? 'border-green bg-green text-paper'
                  : 'border-olive/30 text-ink/70 hover:border-ink hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Irregular grid — cards vary in size and background, some break the rhythm */}
      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-12">
        {shown.map((p) =>
          p.image ? (
            <article
              key={p.name}
              data-reveal
              className={`group relative overflow-hidden border-[5px] border-cream bg-ink ${p.span} ${p.offset ?? ''}`}
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <span className="mb-1 inline-block bg-gold px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-ink">
                    {p.category}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-paper">{p.name}</h3>
                  <p className="mt-1 max-w-xs text-sm text-beige">{p.desc}</p>
                </div>
                <span className="shrink-0 font-display text-2xl italic text-paper">{p.price}</span>
              </div>
            </article>
          ) : (
            <article
              key={p.name}
              data-reveal
              className={`paper-grain group flex flex-col justify-between border border-olive/25 p-6 transition-colors hover:bg-beige ${p.span} ${p.offset ?? ''}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] uppercase tracking-widest text-brown">{p.category}</span>
                <span className="flex size-8 items-center justify-center border border-olive/30 text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                  <TbPlus className="text-base" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="font-display text-3xl font-medium leading-tight text-ink">{p.name}</h3>
                <p className="mt-2 text-sm text-brown">{p.desc}</p>
                <p className="mt-4 font-display text-2xl italic text-green">{p.price}</p>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
}

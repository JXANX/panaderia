'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TbArrowLeft, TbArrowRight, TbPlus } from 'react-icons/tb';
import { useSectionReveal } from '@/components/use-section-reveal';
import { PriceTag } from '@/components/price-tag';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

type Category = 'Todo' | 'Panes' | 'Facturas' | 'Churros' | 'Salado' | 'Dulces';

type Product = {
  name: string;
  price: string;
  desc: string;
  category: Exclude<Category, 'Todo'>;
  image?: string;
};

const products: Product[] = [
  {
    name: 'Hogaza de campo',
    price: '$ 7.500',
    desc: 'Masa madre, corteza oscura y crujiente, miga alveolada. Fermentada 24 horas.',
    category: 'Panes',
    image: '/pan-campo.webp',
  },
  {
    name: 'Churros con dulce de leche',
    price: '$ 9.000',
    desc: 'Churros a la plancha, recién azucarados y rellenos con dulce de leche de la casa. Docena.',
    category: 'Churros',
    image: '/churros.webp',
  },
  {
    name: 'Docena de medialunas',
    price: '$ 12.000',
    desc: 'Medialunas de manteca, hojaldradas y tiernas. La que abre el desayuno del barrio.',
    category: 'Facturas',
    image: '/pasteleria.webp',
  },
  {
    name: 'Barra de pan francés',
    price: '$ 3.000',
    desc: 'La de todos los días: corteza fina y crujiente, para el mate de la tarde.',
    category: 'Panes',
  },
  {
    name: 'Facturas surtidas',
    price: '$ 12.500',
    desc: 'Docena surtida: vigilantes, cañoncitos, libritos y medialunas.',
    category: 'Facturas',
  },
  {
    name: 'Chipá',
    price: '$ 7.000',
    desc: 'Bollitos de almidón de mandioca y queso. Docena, tibios al salir del horno.',
    category: 'Salado',
  },
  {
    name: 'Torta frita',
    price: '$ 1.800',
    desc: 'Recién frita, como la del mate bajo la lluvia. Por unidad.',
    category: 'Salado',
  },
  {
    name: 'Figazza de la casa',
    price: '$ 5.500',
    desc: 'Con cebolla, aceitunas y un hilo de aceite de oliva. Para compartir.',
    category: 'Salado',
  },
  {
    name: 'Budín de vainilla',
    price: '$ 7.500',
    desc: 'Budín casero bañado con azúcar impalpable. La merienda de todos los días.',
    category: 'Dulces',
  },
  {
    name: 'Alfajor de maicena',
    price: '$ 2.800',
    desc: 'Dos tapitas de maicena y dulce de leche, espolvoreado con azúcar impalpable.',
    category: 'Dulces',
  },
  {
    name: 'Pan de centeno',
    price: '$ 5.500',
    desc: 'Denso, de sabor profundo. Se guarda toda la semana.',
    category: 'Panes',
  },
  {
    name: 'Pasta frola de membrillo',
    price: '$ 6.500',
    desc: 'Masa de manteca y membrillo casero. La receta de la abuela.',
    category: 'Dulces',
  },
];

const categories: Category[] = ['Todo', 'Panes', 'Facturas', 'Churros', 'Salado', 'Dulces'];

export function Products() {
  const scopeRef = useRef<HTMLElement>(null);
  useSectionReveal(scopeRef, { stagger: 0.08 });
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ pointerId: number; x: number; start: number; moved: boolean } | null>(null);
  const [active, setActive] = useState<Category>('Todo');
  const prevActive = useRef(active);
  const shown = products.filter((p) => active === 'Todo' || p.category === active);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (prevActive.current === active) return;
      const track = trackRef.current;
      if (!track) return;
      const cards = track.querySelectorAll('[data-carta-card]');
      gsap.fromTo(
        track,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, ease: 'power1.out', overwrite: true }
      );
      gsap.fromTo(
        cards,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.035,
          ease: 'power2.out',
          overwrite: true,
        }
      );
      prevActive.current = active;
    },
    { scope: trackRef, dependencies: [active] }
  );

  const changeCategory = (cat: Category) => {
    if (cat === active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(cat);
      return;
    }
    const track = trackRef.current;
    if (track) {
      gsap.to(track, {
        autoAlpha: 0,
        duration: 0.12,
        ease: 'power1.in',
        overwrite: true,
        onComplete: () => {
          setActive(cat);
          track.scrollTo({ left: 0 });
        },
      });
    } else {
      setActive(cat);
    }
  };

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-carta-card]');
    const step = card ? card.clientWidth + 16 : 360;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const track = trackRef.current;
    if (!track) return;
    track.setPointerCapture(e.pointerId);
    drag.current = { pointerId: e.pointerId, x: e.clientX, start: track.scrollLeft, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d || !track || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    if (d.moved) track.scrollLeft = d.start - dx;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId === e.pointerId) drag.current = null;
  };

  return (
    <section
      id="carta"
      ref={scopeRef}
      className="tile-grid bg-cacao text-cream"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div data-reveal className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-6xl font-semibold leading-[0.9] tracking-tight text-cream md:text-8xl">
              La carta
            </h2>
          </div>

          <div role="group" aria-label="Filtrar la carta" className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={active === cat}
                onClick={() => changeCategory(cat)}
                className={`border px-4 py-2 text-sm transition-colors ${
                  active === cat
                    ? 'border-caramel bg-caramel text-cacao'
                    : 'border-cream/30 text-cream/70 hover:border-caramel hover:text-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div data-reveal className="mb-4 flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-caramel">
            Vidriera del día
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Ver producto anterior"
              onClick={() => scrollByCard(-1)}
              className="border border-cream/30 p-2 text-cream transition-colors hover:border-caramel hover:text-caramel"
            >
              <TbArrowLeft className="text-sm" />
            </button>
            <button
              type="button"
              aria-label="Ver siguiente producto"
              onClick={() => scrollByCard(1)}
              className="border border-cream/30 p-2 text-cream transition-colors hover:border-caramel hover:text-caramel"
            >
              <TbArrowRight className="text-sm" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-label="Vidriera de productos de la carta"
          aria-live="polite"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="scroll-px-1 flex cursor-grab select-none gap-4 overflow-x-auto pb-2 pt-1 snap-x snap-proximity active:cursor-grabbing focus:outline-none focus-visible:ring-1 focus-visible:ring-caramel"
        >
          {shown.map((p) =>
            p.image ? (
              <article
                key={p.name}
                data-carta-card
                data-reveal
                className="group flex w-[290px] shrink-0 snap-start flex-col overflow-hidden border-[5px] border-cream/10 bg-vanilla transition-transform duration-500 hover:-translate-y-1 md:w-[360px]"
              >
                <div className="awning-stripes h-2 w-full" aria-hidden />
                <div className="flour-card relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 290px, 360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cacao/40 via-transparent to-transparent" />
                </div>
                <div className="flex items-start justify-between gap-3 bg-vanilla p-5">
                  <div>
                    <span className="mb-1 inline-block bg-caramel px-2 py-0.5 text-[10px] uppercase tracking-widest text-cacao">
                      {p.category}
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-cacao">
                      {p.name}
                    </h3>
                    <p className="mt-1 max-w-xs text-sm text-choc">{p.desc}</p>
                  </div>
                  <PriceTag className="mt-1 shrink-0">{p.price}</PriceTag>
                </div>
              </article>
            ) : (
              <article
                key={p.name}
                data-carta-card
                data-reveal
                className="paper-grain group relative flex w-[290px] shrink-0 snap-start flex-col justify-between border-[5px] border-cream/10 bg-vanilla p-6 text-cacao transition-transform duration-500 hover:-translate-y-1 md:w-[340px]"
              >
                <div className="awning-stripes absolute inset-x-0 top-0 h-2" aria-hidden />
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-milk">
                    {p.category}
                  </span>
                  <span className="flex size-8 items-center justify-center border border-beige text-cacao transition-colors group-hover:bg-cacao group-hover:text-cream">
                    <TbPlus className="text-base" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="font-display text-3xl font-semibold leading-tight">{p.name}</h3>
                  <p className="mt-2 text-sm text-choc">{p.desc}</p>
                </div>
                <PriceTag className="mt-6">{p.price}</PriceTag>
              </article>
            ),
          )}
        </div>

        <p className="mt-3 text-right text-xs uppercase tracking-[0.2em] text-cream/40">
          Arrastrá para ver toda la vidriera
        </p>
      </div>
    </section>
  );
}

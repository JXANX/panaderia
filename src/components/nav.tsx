'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { TbMapPin, TbX } from 'react-icons/tb';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

const links = [
  ['Carta', '#carta'],
  ['El oficio', '#oficio'],
  ['La esquina', '#esquina'],
];

export function Nav() {
  const scope = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !open) return;

      const overlay = root.querySelector('[data-menu-overlay]');
      const linksEl = root.querySelectorAll<HTMLElement>('[data-menu-link]');
      const meta = root.querySelector('[data-menu-meta]');
      if (!overlay || !linksEl.length) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced) {
        gsap.set(overlay, { yPercent: 0, autoAlpha: 1 });
        return;
      }

      // Split the menu links into characters once
      const split = new SplitType(Array.from(linksEl), { types: 'chars' });
      const chars = root.querySelectorAll('[data-menu-link] .char');

      const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });
      tl.set(overlay, { yPercent: -100, autoAlpha: 1 })
        .to(overlay, { yPercent: 0, duration: 0.9 }, 0)
        .fromTo(
          chars,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.04, ease: 'power4.out' },
          0.25
        )
        .fromTo(
          meta,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          0.55
        );

      return () => {
        split.revert();
        gsap.to(overlay, { autoAlpha: 0, duration: 0.3 });
      };
    },
    { scope, dependencies: [open] }
  );

  return (
    <header ref={scope} className="relative z-50">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-5 pt-6 md:px-10">
        {/* Wordmark — oversized, sits low and left */}
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-display text-[13px] uppercase tracking-[0.4em] text-brown">
            Panadería · desde 1974
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight text-ink md:text-[2rem]">
            La Espiga <span className="italic text-green">Verde</span>
          </span>
        </a>

        {/* Desktop nav — pushed right and slightly up */}
        <nav className="hidden items-center gap-7 pb-1 text-sm md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative text-ink/70 transition-colors hover:text-ink"
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-green transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#esquina"
            className="inline-flex items-center gap-1.5 bg-ink px-4 py-2 text-xs font-medium uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5"
          >
            <TbMapPin className="text-sm" strokeWidth={2} />
            Cómo llegar
          </a>
        </nav>

        {/* Menu trigger — square, all breakpoints */}
        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-ink px-4 py-2 text-xs font-medium uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5 md:hidden"
        >
          Menú
        </button>
      </div>

      {/* Awning stripe rule — the mustard awning, running full-bleed */}
      <div className="awning-stripes mt-5 h-3 w-full opacity-90" />

      {/* Fullscreen menu — meech213-style staggered reveal */}
      {open && (
        <div
          data-menu-overlay
          className="paper-grain fixed inset-0 z-[90] flex flex-col bg-ink text-paper"
        >
          <div className="awning-stripes h-2 w-full" />

          <div className="flex items-center justify-between px-5 pt-6 md:px-10">
            <p className="font-display text-[13px] uppercase tracking-[0.4em] text-beige">
              Panadería · desde 1974
            </p>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 border border-paper/25 px-4 py-2 text-xs font-medium uppercase tracking-widest text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <TbX className="text-sm" strokeWidth={2} />
              Cerrar
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-4 px-5 md:gap-6 md:px-10">
            {links.map(([label, href]) => (
              <a
                key={href}
                data-menu-link
                href={href}
                onClick={() => setOpen(false)}
                className="group inline-flex w-fit items-baseline gap-4 font-display text-6xl font-semibold leading-[0.95] tracking-tight text-paper transition-colors hover:text-green md:text-[7rem]"
              >
                <span className="overflow-hidden">
                  <span className="inline-block">{label}</span>
                </span>
              </a>
            ))}
          </nav>

          <div data-menu-meta className="px-5 pb-8 md:px-10">
            <div className="flex flex-col justify-between gap-2 border-t border-paper/15 pt-5 text-xs text-beige md:flex-row">
              <p>Calle del Horno, 12 · Barrio de las Letras</p>
              <p>Martes a domingo · 6:30 – 14:00 · 17:00 – 20:30</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

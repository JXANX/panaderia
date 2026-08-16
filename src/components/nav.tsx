'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { TbMapPin, TbX } from 'react-icons/tb';
import { SoundToggle } from '@/components/sound-toggle';

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
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const [open, setOpen] = useState(false);

  // Enfoque, focus trap y cierre con Escape para el menú móvil
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;

    document.documentElement.style.overflow = 'hidden';

    const focusables = menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !focusables.length) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

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
          <span className="font-display text-[13px] uppercase tracking-[0.4em] text-choc">
            Panadería · desde 1974
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight text-cacao md:text-[2rem]">
            Vainilla y <span className="text-milk">Chocolate</span>
          </span>
        </a>

        {/* Desktop nav — pushed right and slightly up */}
        <nav className="hidden items-center gap-7 pb-1 text-sm md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative text-cacao/70 transition-colors hover:text-cacao"
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-milk transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#esquina"
            className="inline-flex items-center gap-1.5 bg-cacao px-4 py-2 text-xs font-medium uppercase tracking-widest text-cream transition-all hover:-translate-y-0.5 hover:bg-caramel hover:text-cacao"
          >
            <TbMapPin className="text-sm" strokeWidth={2} />
            Cómo llegar
          </a>
          <SoundToggle tone="light" />
        </nav>

        {/* Menu trigger — square, all breakpoints */}
        <button
          ref={triggerRef}
          type="button"
          aria-label="Abrir menú"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('vyc:chime'));
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-cacao px-4 py-2 text-xs font-medium uppercase tracking-widest text-cream transition-all hover:-translate-y-0.5 hover:bg-caramel hover:text-cacao md:hidden"
        >
          Menú
        </button>
      </div>

      {/* Awning stripe rule — the mustard awning, running full-bleed */}
      <div className="awning-stripes mt-5 h-3 w-full opacity-90" />

      {/* Fullscreen menu — meech213-style staggered reveal */}
      {open && (
        <div
          ref={menuRef}
          id="menu-movil"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          data-menu-overlay
          className="paper-grain fixed inset-0 z-[90] flex flex-col bg-cacao text-cream"
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
              className="inline-flex items-center gap-2 border border-cream/25 px-4 py-2 text-xs font-medium uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-cacao"
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
                className="group inline-flex w-fit items-baseline gap-4 font-display text-6xl font-semibold leading-[0.95] tracking-tight text-cream transition-colors hover:text-caramel md:text-[7rem]"
              >
                <span className="overflow-hidden">
                  <span className="inline-block">{label}</span>
                </span>
              </a>
            ))}
          </nav>

          <div data-menu-meta className="px-5 pb-8 md:px-10">
            <div className="flex flex-col justify-between gap-2 border-t border-cream/15 pt-5 text-xs text-beige md:flex-row">
              <p>Mar de Ajó · Buenos Aires, Argentina</p>
              <p>Martes a domingo · 6:30 – 14:00 · 17:00 – 20:30</p>
            </div>
            <div className="mt-4">
              <SoundToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { TbArrowRight } from 'react-icons/tb';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const curtain = root.querySelector('[data-hero-curtain]');

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(curtain, { yPercent: -100 });
        return;
      }

      const imageWrap = root.querySelector('[data-hero-image]');
      const plate = root.querySelector('[data-hero-plate]');
      const tile = root.querySelector('[data-hero-tile]');

      // Split the oversized type into characters, one mask per line
      const lines = root.querySelectorAll<HTMLElement>('[data-hero-line]');
      if (!lines.length) return;
      const split = new SplitType(lines, { types: 'chars' });
      const chars = root.querySelectorAll('[data-hero-line] .char');

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
      });

      tl.set(chars, { yPercent: 130, opacity: 0 }, 0)
        .set(imageWrap, { clipPath: 'inset(0 0 100% 0)', scale: 1.25 }, 0)
        .set(plate, { scale: 0, rotate: 14 }, 0)
        .set(root.querySelectorAll('[data-hero-fade]'), { y: 26, opacity: 0 }, 0)
        .set(tile, { opacity: 0, scale: 1.15 }, 0)

        .to(curtain, { yPercent: -100, duration: 1.15, ease: 'power4.inOut' }, 0)
        .to(chars, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.035 }, 0.12)
        .to(imageWrap, {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: 1.2,
          ease: 'power4.inOut',
        }, 0.25)
        .to(root.querySelectorAll('[data-hero-fade]'), {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
        }, 0.65)
        .to(plate, { scale: 1, rotate: -4, duration: 0.55, ease: 'back.out(1.7)' }, 0.95)
        .to(tile, { opacity: 0.14, scale: 1, duration: 0.9, ease: 'power3.out' }, 0.5);

      return () => split.revert();
    },
    { scope }
  );

  return (
    <section ref={scope} id="top" className="relative overflow-hidden pt-10 md:pt-16">
      {/* Opening curtain — ink panel that lifts away */}
      <div
        data-hero-curtain
        className="pointer-events-none fixed inset-0 z-[80] bg-ink"
        aria-hidden
      >
        <div className="awning-stripes absolute bottom-0 left-0 h-2 w-full" />
      </div>

      {/* faint tile motif bleeding in from top-right */}
      <div
        data-hero-tile
        className="tile-grid pointer-events-none absolute -right-24 -top-16 hidden size-80 rotate-12 opacity-[0.14] md:block"
        aria-hidden
      />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-end gap-8 px-5 md:grid-cols-12 md:px-10">
        {/* Oversized statement — spans and overlaps */}
        <div className="relative z-20 md:col-span-7 md:pb-10">
          <p
            data-hero-fade
            className="mb-5 max-w-sm font-display text-lg italic text-brown"
          >
            Una esquina de baldosas verdes donde el pan todavía se hace con las manos.
          </p>

          <h1 className="font-display font-semibold leading-[0.82] tracking-[-0.02em] text-ink">
            <span data-hero-line className="block overflow-hidden pb-1 text-[22vw] md:text-[13rem]">
              Pan
            </span>
            <span data-hero-line className="-mt-2 block overflow-hidden pb-2 pl-[0.06em] text-[16vw] italic text-green md:-mt-6 md:text-[9rem]">
              &amp; churros
            </span>
          </h1>

          <div data-hero-fade className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#carta"
              className="group inline-flex items-center gap-2 bg-green px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5"
            >
              Ver la carta
              <TbArrowRight className="transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
            </a>
            <a
              href="#oficio"
              className="inline-flex items-center gap-2 border border-olive/40 px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Nuestro oficio
            </a>
          </div>
        </div>

        {/* Hero image — bleeds off the right edge, overlaps the type */}
        <div className="relative md:col-span-5">
          <div
            data-hero-image
            className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden border-[6px] border-cream shadow-[0_30px_60px_-25px_rgba(29,25,14,0.6)] md:-mb-14 md:mr-[-3rem] md:w-[115%]"
          >
            <Image
              src="/hero-hands-bread.png"
              alt="Manos enharinadas partiendo una hogaza de masa madre recién horneada"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* small floating tag, breaks the frame — sharp plate */}
          <div
            data-hero-plate
            className="absolute -left-3 bottom-8 z-30 rotate-[-4deg] bg-ink px-4 py-3 text-paper shadow-lg md:bottom-2 md:left-[-2rem]"
          >
            <p className="font-display text-2xl leading-none">6:30</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-beige">
              horneado diario
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { TbArrowRight } from 'react-icons/tb';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
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
      const iris = root.querySelector('[data-hero-iris]');
      const content = root.querySelector('[data-hero-content]');
      const caption = root.querySelector('[data-hero-caption]');
      const hint = root.querySelector('[data-hero-hint]');

      // Split the oversized type into characters, one mask per line
      const lines = root.querySelectorAll<HTMLElement>('[data-hero-line]');
      if (!lines.length) return;
      const split = new SplitType(lines, { types: 'chars' });
      const chars = root.querySelectorAll('[data-hero-line] .char');

      // ── OPENING (carga) — secuencia original ──
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

      // ── IRIS (scroll) — pin 150vh, scrub 0.7, apertura 0 → 150% ──
      const irisTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=150vh',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      irisTl
        .fromTo(
          iris,
          { clipPath: 'circle(0% at 50% 50%)', scale: 1.1 },
          { clipPath: 'circle(150% at 50% 50%)', scale: 1, duration: 1, ease: 'none' },
          0
        )
        .to(content, {
          scale: 1.12,
          opacity: 0,
          duration: 0.55,
          ease: 'power2.in',
        }, 0.15)
        .to(hint, { opacity: 0, duration: 0.2, ease: 'power1.out' }, 0.05)
        .fromTo(
          caption,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' },
          0.75
        );

      return () => split.revert();
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="top"
      className="relative h-screen min-h-[620px] overflow-hidden"
    >
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

      {/* Bread image — full-bleed, se revela con la entrada original */}
      <div data-hero-image className="absolute inset-0 z-10 will-change-transform">
        <Image
          src="/hero-hands-bread.png"
          alt="Manos enharinadas partiendo una hogaza de masa madre recién horneada"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Iris — la fachada crece en círculo desde el centro cubriendo la imagen */}
      <div
        data-hero-iris
        className="absolute inset-0 z-20 will-change-[clip-path,transform]"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/facade.png"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-ink/55" />
      </div>

      {/* Content — escala y se desvanece mientras el diafragma lo deja atrás */}
      <div data-hero-content className="absolute inset-0 z-30">
        {/* velo de papel para que la rotulación se lea sobre la foto */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-paper/85 via-paper/45 to-transparent"
          aria-hidden
        />

        <div className="relative flex h-full max-w-[1400px] flex-col justify-center px-5 md:mx-auto md:px-10">
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

        {/* small floating tag, breaks the frame — sharp plate */}
        <div
          data-hero-plate
          className="absolute bottom-10 right-5 z-30 rotate-[-4deg] bg-ink px-4 py-3 text-paper shadow-lg md:bottom-16 md:right-10"
        >
          <p className="font-display text-2xl leading-none">6:30</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-beige">
            horneado diario
          </p>
        </div>
      </div>

      {/* Caption sobre la fachada, al final del pin */}
      <div className="absolute inset-x-0 bottom-12 z-40 text-center md:bottom-16">
        <div data-hero-caption className="inline-block opacity-0">
          <p className="font-display text-2xl italic text-paper md:text-3xl">
            La esquina de siempre
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-paper/80">
            Calle del Horno, 12 · desde 1974
          </p>
        </div>
      </div>

      {/* Scroll hint — se desvanece al arrancar el iris */}
      <div
        data-hero-hint
        className="absolute bottom-6 left-5 z-40 md:left-10"
        aria-hidden
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-ink/70">Desliza</p>
        <span className="mt-2 block h-10 w-px bg-ink/40" />
      </div>
    </section>
  );
}

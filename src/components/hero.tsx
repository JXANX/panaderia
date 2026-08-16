'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TbArrowRight } from 'react-icons/tb';
import { useStamp } from '@/components/use-stamp';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const ctaRef = useStamp<HTMLAnchorElement>();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const curtain = root.querySelector('[data-hero-curtain]');
      const caption = root.querySelector('[data-hero-caption]');

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(curtain, { yPercent: -100 });
        gsap.set(caption, { autoAlpha: 1, y: 0 });
        return;
      }

      const imageWrap = root.querySelector('[data-hero-image]');
      const iris = root.querySelector('[data-hero-iris]');
      const content = root.querySelector('[data-hero-content]');
      const hint = root.querySelector('[data-hero-hint]');
      const lines = root.querySelectorAll<HTMLElement>('[data-hero-line]');
      if (!lines.length) return;

      // ── APERTURA (carga) — simple: cortina, tipografía y foto ──
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.set(lines, { yPercent: 125 })
        .set(imageWrap, { clipPath: 'inset(0 0 100% 0)', scale: 1.25 })
        .set(root.querySelectorAll('[data-hero-fade]'), { y: 26, opacity: 0 })

        .to(curtain, { yPercent: -100, duration: 1.15, ease: 'power4.inOut' }, 0)
        .to(lines, { yPercent: 0, duration: 1.05, stagger: 0.12 }, 0.18)
        .to(imageWrap, {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: 1.2,
          ease: 'power4.inOut',
        }, 0.3)
        .to(root.querySelectorAll('[data-hero-fade]'), {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
        }, 0.7);

      // ── IRIS (scroll) — la fachada crece en círculo, pin 150vh ──
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
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="top"
      className="relative h-screen min-h-[620px] overflow-hidden"
    >
      {/* Cortina de apertura — panel cacao que se levanta */}
      <div
        data-hero-curtain
        className="pointer-events-none fixed inset-0 z-[80] bg-cacao"
        aria-hidden
      >
        <div className="awning-stripes absolute bottom-0 left-0 h-2 w-full" />
      </div>

      {/* Foto del pan — full-bleed, se revela con la apertura */}
      <div data-hero-image className="absolute inset-0 z-10 will-change-transform">
        <Image
          src="/hero-hands-bread.webp"
          alt="Manos enharinadas partiendo una hogaza de masa madre recién horneada"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Iris — la fachada crece en círculo desde el centro cubriendo la foto */}
      <div
        data-hero-iris
        className="absolute inset-0 z-20 will-change-[clip-path,transform]"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/facade-iris.webp"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-cacao/60" />
      </div>

      {/* Contenido — escala y se desvanece mientras el diafragma lo deja atrás */}
      <div data-hero-content className="absolute inset-0 z-30">
        <div
          className="absolute inset-0 bg-gradient-to-r from-cream/85 via-cream/45 to-transparent"
          aria-hidden
        />

        <div className="relative flex h-full max-w-[1400px] flex-col justify-center px-5 md:mx-auto md:px-10">
          <p
            data-hero-fade
            className="mb-5 max-w-sm font-display text-lg text-choc"
          >
            Una esquina donde el pan todavía se hace con las manos.
          </p>

          <h1 className="font-display font-semibold leading-[0.86] tracking-[-0.02em] text-cacao">
            <span data-hero-line className="block overflow-hidden pb-1 text-[21vw] md:text-[12.5rem]">
              Vainilla
            </span>
            <span data-hero-line className="-mt-1 block overflow-hidden pb-2 pl-[0.06em] text-[9.5vw] font-medium text-milk md:-mt-4 md:text-[5.5rem]">
              y Chocolate
            </span>
          </h1>

          <div data-hero-fade className="mt-6 flex flex-wrap items-center gap-4">
            <a
              ref={ctaRef}
              href="#carta"
              className="stamp-btn group inline-flex items-center gap-2 bg-choc px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-cream transition-all hover:-translate-y-0.5 hover:bg-caramel hover:text-cacao"
            >
              Ver la carta
              <TbArrowRight className="transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
            </a>
            <a
              href="#oficio"
              className="inline-flex items-center gap-2 border border-beige px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-cacao transition-colors hover:bg-cacao hover:text-cream"
            >
              Nuestro oficio
            </a>
          </div>
        </div>
      </div>

      {/* Caption sobre la fachada, al final del pin */}
      <div className="absolute inset-x-0 bottom-12 z-40 text-center md:bottom-16">
        <div data-hero-caption className="inline-block opacity-0">
          <p className="font-display text-2xl font-medium text-cream md:text-3xl">
            La esquina de siempre
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-cream/80">
            Mar de Ajó, Buenos Aires · desde 1974
          </p>
        </div>
      </div>

      {/* Scroll hint — se desvanece al arrancar el iris */}
      <div
        data-hero-hint
        className="absolute bottom-6 left-5 z-40 md:left-10"
        aria-hidden
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-cacao/70">Desliza</p>
        <span className="mt-2 block h-10 w-px bg-cacao/40" />
      </div>
    </section>
  );
}

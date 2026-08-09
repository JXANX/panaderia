export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="awning-stripes h-3 w-full opacity-90" />
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-display text-[13px] uppercase tracking-[0.4em] text-beige">
              Panadería · desde 1974
            </p>
            <p className="font-display text-6xl font-semibold leading-none tracking-tight md:text-8xl">
              La Espiga <span className="italic text-green">Verde</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-beige md:text-right">
            <a href="#carta" className="transition-colors hover:text-paper">
              Carta
            </a>
            <a href="#oficio" className="transition-colors hover:text-paper">
              El oficio
            </a>
            <a href="#esquina" className="transition-colors hover:text-paper">
              La esquina
            </a>
            <a href="#top" className="transition-colors hover:text-paper">
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-paper/15 pt-6 text-xs text-beige md:flex-row">
          <p>Calle del Horno, 12 · Barrio de las Letras</p>
          <p>© {new Date().getFullYear()} La Espiga Verde. Hecho a mano, como el pan.</p>
        </div>
      </div>
    </footer>
  );
}

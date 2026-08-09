export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="awning-stripes h-3 w-full opacity-90" />
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Marca + redes */}
          <div className="md:col-span-4">
            <p className="font-display text-[13px] uppercase tracking-[0.4em] text-beige">
              Panadería · desde 1974
            </p>
            <p className="mt-3 font-display text-5xl font-semibold leading-none tracking-tight md:text-7xl">
              La Espiga <span className="italic text-green">Verde</span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-beige">
              Masa madre viva, horno de leña y la misma esquina de baldosas verdes desde 1974.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-widest text-beige">
              <a href="#" className="transition-colors hover:text-paper">
                Instagram
              </a>
              <span className="text-olive">·</span>
              <a href="#" className="transition-colors hover:text-paper">
                Facebook
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">La carta</p>
            <nav className="mt-5 flex flex-col gap-3 text-sm">
              <a href="#hornada" className="w-fit text-beige transition-colors hover:text-paper">
                La hornada de hoy
              </a>
              <a href="#carta" className="w-fit text-beige transition-colors hover:text-paper">
                La carta
              </a>
              <a href="#proceso" className="w-fit text-beige transition-colors hover:text-paper">
                Nuestro proceso
              </a>
              <a href="#oficio" className="w-fit text-beige transition-colors hover:text-paper">
                El oficio
              </a>
              <a href="#historia" className="w-fit text-beige transition-colors hover:text-paper">
                Tres generaciones
              </a>
              <a href="#vecinos" className="w-fit text-beige transition-colors hover:text-paper">
                El barrio
              </a>
              <a href="#esquina" className="w-fit text-beige transition-colors hover:text-paper">
                La esquina
              </a>
            </nav>
          </div>

          {/* Horarios */}
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Horario</p>
            <ul className="mt-5 space-y-3 text-sm text-beige">
              <li>
                <p className="text-paper">Martes a domingo</p>
                <p>6:30 – 14:00</p>
              </li>
              <li>
                <p className="text-paper">Tarde</p>
                <p>17:00 – 20:30</p>
              </li>
              <li>
                <p className="text-paper">Lunes</p>
                <p>descansamos</p>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Encuéntranos</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-beige">
              <p>
                Calle del Horno, 12
                <br />
                Barrio de las Letras
              </p>
              <p>Hornada diaria a las 6:30, hasta agotar.</p>
              <p>Encargos de la semana: pasa por mostrador o llama antes del domingo.</p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-paper/15 pt-6 text-xs text-beige md:flex-row">
          <p>© {new Date().getFullYear()} La Espiga Verde. Hecho a mano, como el pan.</p>
          <p>Calle del Horno, 12 · Barrio de las Letras · Martes a domingo</p>
        </div>
      </div>
    </footer>
  );
}

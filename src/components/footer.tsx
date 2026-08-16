import { SITE, telLink, whatsappLink } from '@/lib/site';

export function Footer() {
  const socials = [
    ...(SITE.instagram
      ? [{ label: 'Instagram', href: SITE.instagram }]
      : []),
    ...(SITE.facebook
      ? [{ label: 'Facebook', href: SITE.facebook }]
      : []),
  ];
  const socialSeparator = socials.length > 1 ? <span className="text-caramel">·</span> : null;

  return (
    <footer className="bg-cacao text-cream">
      <div className="awning-stripes h-3 w-full opacity-90" />
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Marca + contacto */}
          <div className="md:col-span-4">
            <p className="font-display text-[13px] uppercase tracking-[0.4em] text-beige">
              Panadería · desde {SITE.foundingYear}
            </p>
            <p className="mt-3 font-display text-5xl font-semibold leading-none tracking-tight md:text-7xl">
              Vainilla y <span className="text-caramel">Chocolate</span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-beige">
              Masa madre viva, horno de leña y la misma esquina de siempre desde {SITE.foundingYear}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-widest text-beige">
              <a
                href={whatsappLink('Hola, Vainilla y Chocolate. Quiero hacer un encargo.')}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cream"
              >
                Pedidos por WhatsApp
              </a>
              {socialSeparator}
              {socials.map((s, i) => (
                <span key={s.label} className="flex gap-3">
                  {i > 0 ? socialSeparator : null}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-cream"
                  >
                    {s.label}
                  </a>
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.35em] text-caramel">La carta</p>
            <nav className="mt-5 flex flex-col gap-3 text-sm">
              <a href="#hornada" className="w-fit text-beige transition-colors hover:text-cream">
                La hornada de hoy
              </a>
              <a href="#carta" className="w-fit text-beige transition-colors hover:text-cream">
                La carta
              </a>
              <a href="#proceso" className="w-fit text-beige transition-colors hover:text-cream">
                Nuestro proceso
              </a>
              <a href="#oficio" className="w-fit text-beige transition-colors hover:text-cream">
                El oficio
              </a>
              <a href="#historia" className="w-fit text-beige transition-colors hover:text-cream">
                Tres generaciones
              </a>
              <a href="#ritual" className="w-fit text-beige transition-colors hover:text-cream">
                El ritual de la mañana
              </a>
              <a href="#esquina" className="w-fit text-beige transition-colors hover:text-cream">
                La esquina
              </a>
            </nav>
          </div>

          {/* Horarios */}
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.35em] text-caramel">Horario</p>
            <ul className="mt-5 space-y-3 text-sm text-beige">
              <li>
                <p className="text-cream">Martes a domingo</p>
                <p>{SITE.hoursMorning}</p>
              </li>
              <li>
                <p className="text-cream">Tarde</p>
                <p>{SITE.hoursAfternoon}</p>
              </li>
              <li>
                <p className="text-cream">Lunes</p>
                <p>descansamos</p>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.35em] text-caramel">Encuéntranos</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-beige">
              <p>
                {SITE.city}
                <br />
                {SITE.province}, Argentina
              </p>
              <p>
                <a
                  href={telLink()}
                  className="transition-colors hover:text-cream"
                >
                  {SITE.whatsappDisplay}
                </a>
              </p>
              <p>Hornada diaria a las 6:30, hasta agotar.</p>
              <p>Encargos de la semana: WhatsApp o llamando antes del domingo.</p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-cream/20 pt-6 text-xs text-beige md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Hecho a mano, como el pan.</p>
          <p>{SITE.city} · Buenos Aires, Argentina · Martes a domingo</p>
        </div>
      </div>
    </footer>
  );
}

import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { IrisSep } from '@/components/iris-sep';
import { Hornada } from '@/components/hornada';
import { Products } from '@/components/products';
import { Proceso } from '@/components/proceso';
import { PaperEdge } from '@/components/paper-edge';
import { Story } from '@/components/story';
import { Historia } from '@/components/historia';
import { Ritual } from '@/components/ritual';
import { Corner } from '@/components/corner';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="paper-grain relative min-h-screen bg-cream text-cacao overflow-x-hidden">
      <Nav />
      <Hero />

      {/* Señalética estática — la hornada del día, sin loop */}
      <div className="border-y border-beige/40 bg-cacao py-4 md:py-5">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 text-center md:justify-between md:px-10 md:text-left">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-caramel">
            Hoy en el horno
          </span>
          <span className="font-display text-lg font-medium text-cream">
            Hogaza de campo
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-beige">
            6:30 · hasta agotar hornada
          </span>
        </div>
      </div>

      <Hornada />
      <IrisSep />
      <Products />
      <Proceso />
      <PaperEdge />
      <Story />
      <Historia />
      <PaperEdge />
      <Ritual />
      <Corner />
      <Footer />
    </main>
  );
}

import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Marquee } from '@/components/marquee';
import { Hornada } from '@/components/hornada';
import { Products } from '@/components/products';
import { Proceso } from '@/components/proceso';
import { Story } from '@/components/story';
import { Historia } from '@/components/historia';
import { Vecinos } from '@/components/vecinos';
import { Corner } from '@/components/corner';
import { Footer } from '@/components/footer';

const marqueeItems = [
  'Masa madre viva',
  'Fermentación de 24 horas',
  'Harina de molino de piedra',
  'Churros a la plancha',
  'Horno de leña',
  'Sin prisa, con manos',
];

export default function Home() {
  return (
    <main className="paper-grain relative min-h-screen bg-paper text-ink overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee
        className="mt-20 border-y border-olive/25 bg-ink py-4 md:mt-28 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
        speed="32s"
        separator={<span className="mx-10 not-italic text-gold">✳</span>}
        items={marqueeItems.map((item) => (
          <span key={item} className="font-display text-lg italic text-paper">
            {item}
          </span>
        ))}
      />
      <Hornada />
      <Products />
      <Proceso />
      <Story />
      <Historia />
      <Vecinos />
      <Corner />
      <Footer />
    </main>
  );
}

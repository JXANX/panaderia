import type { Metadata, Viewport } from 'next';
import { Fraunces, Archivo, DM_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/smooth-scroll';
import { CustomCursor } from '@/components/custom-cursor';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'WONK', 'SOFT'],
  variable: '--font-display',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FFF7E6',
};

export const metadata: Metadata = {
  title: 'Vainilla y Chocolate | Panadería artesanal en Mar de Ajó',
  description:
    'Panadería artesanal en Mar de Ajó, Buenos Aires. Masa madre, fermentación lenta y el mismo mostrador de siempre desde 1974. Abrimos a las 6:30.',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Vainilla y Chocolate',
    title: 'Vainilla y Chocolate | Panadería artesanal en Mar de Ajó',
    description:
      'Panadería artesanal en Mar de Ajó, Buenos Aires. Masa madre, fermentación lenta y el mismo mostrador de siempre desde 1974. Abrimos a las 6:30.',
  },
  other: {
    'og:locality': 'Mar de Ajó',
    'og:region': 'Buenos Aires',
    'og:country-name': 'Argentina',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${archivo.variable} ${dmMono.variable}`}
    >
      <body className="bg-cream text-cacao antialiased selection:bg-caramel selection:text-cacao font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Bakery',
              name: 'Vainilla y Chocolate',
              description:
                'Panadería artesanal en Mar de Ajó, Buenos Aires. Masa madre, fermentación lenta y el mismo mostrador de siempre desde 1974.',
              foundingDate: '1974',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Mar de Ajó',
                addressRegion: 'Buenos Aires',
                addressCountry: 'AR',
              },
              openingHours: 'Tu-Su 06:30-14:00,17:00-20:30',
              servesCuisine: 'Panadería artesanal',
            }),
          }}
        />
        <SmoothScroll>
          <CustomCursor />
          <div className="noise-overlay" aria-hidden="true" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

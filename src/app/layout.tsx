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
  themeColor: '#efe7db',
};

export const metadata: Metadata = {
  title: 'La Espiga Verde | Panadería artesanal de barrio',
  description:
    'Panadería artesanal de barrio. Masa madre, fermentación lenta y la esquina de baldosas verdes de siempre. Abrimos a las 6:30.',
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
      <body className="bg-paper text-ink antialiased selection:bg-green selection:text-paper font-sans">
        <SmoothScroll>
          <CustomCursor />
          <div className="noise-overlay" aria-hidden="true" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

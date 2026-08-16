// Convierte los PNG del sitio a WebP optimizados y genera recortes propios
// para cada contexto (una imagen = un uso, sin reutilización).
// Uso: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const jobs = [
  { src: 'hero-hands-bread.png', out: 'hero-hands-bread.webp', w: 1920, q: 80 },
  { src: 'facade.png', out: 'facade.webp', w: 1400, q: 80 },
  { src: 'facade.png', out: 'facade-iris.webp', w: 1600, aspect: 4 / 3, q: 80 },
  { src: 'pan-campo.png', out: 'pan-campo.webp', w: 800, aspect: 4 / 5, q: 80 },
  { src: 'pan-campo.png', out: 'pan-campo-hornada.webp', w: 1000, aspect: 4 / 5, q: 80 },
  { src: 'churros.png', out: 'churros.webp', w: 900, q: 80 },
  { src: 'pasteleria.png', out: 'pasteleria.webp', w: 900, q: 80 },
  { src: 'wood-grain.png', out: 'wood-grain.webp', w: 1920, q: 80 },
  { src: 'facade.png', out: 'og.jpg', w: 1200, h: 630, q: 82 },
];

for (const job of jobs) {
  const src = path.join(publicDir, job.src);
  if (!(await pathExists(src))) {
    console.warn('missing:', job.src);
    continue;
  }
  let img = sharp(src).rotate();
  if (job.aspect) {
    img = img.resize({ width: job.w, height: Math.round(job.w / job.aspect), fit: 'cover' });
  } else if (job.h) {
    img = img.resize(job.w, job.h, { fit: 'cover' });
  } else {
    img = img.resize({ width: job.w });
  }
  const out = job.out.endsWith('.webp')
    ? img.webp({ quality: job.q })
    : job.out.endsWith('.jpg')
      ? img.jpeg({ quality: job.q ?? 82, mozjpeg: true })
      : img.png({ compressionLevel: 9 });
  const { width, height, size } = await out.toFile(path.join(publicDir, job.out));
  console.log(`✓ ${job.out}  ${width}x${height}  ${(size / 1024).toFixed(0)} KB`);
}

async function pathExists(p) {
  try {
    await import('node:fs/promises').then((fs) => fs.access(p));
    return true;
  } catch {
    return false;
  }
}

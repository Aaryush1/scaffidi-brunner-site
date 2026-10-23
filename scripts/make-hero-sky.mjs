// Regenerates src/content/hero-sky.ts from a source photo. Usage: node scripts/make-hero-sky.mjs public/media/scaffidi-milwaukee-skyline.jpg
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const src = process.argv[2] || 'public/media/scaffidi-milwaukee-skyline.jpg';
const buf = await sharp(src).resize({ width: 560 }).blur(1.4).webp({ quality: 38 }).toBuffer();
writeFileSync('src/content/hero-sky.ts', `// Milwaukee skyline from the current site, blurred and inlined: it sits under a dark overlay,
// and inlining it means the hero paints without waiting on a network request.
// Regenerate: see scripts/make-hero-sky.mjs
export const heroSky = 'data:image/webp;base64,${buf.toString('base64')}';
`);
console.log(`hero-sky.ts written (${buf.length} bytes)`);

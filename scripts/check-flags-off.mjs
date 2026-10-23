// Fails if any trace of the gift-only pages (personal note, AI concept) is in a production build.
// Usage: node scripts/check-flags-off.mjs [dir=dist]
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] || 'dist';
const TRACES = ['/note/', '/concept/', 'restomod', 'no AI is running', 'A note from Aaryush', 'official website', 'noindex'];
const problems = [];

for (const route of ['note', 'concept']) if (existsSync(join(dir, route))) problems.push(`route exists: ${dir}/${route}/`);

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
for (const file of walk(dir).filter((f) => /\.(html|xml|js|css|txt)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const t of TRACES) if (text.includes(t)) problems.push(`"${t}" found in ${file}`);
}

if (problems.length) {
  console.error(`✗ gift content leaked into ${dir}:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${dir} contains no personal note or AI concept`);

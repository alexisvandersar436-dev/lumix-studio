import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (['.git', 'docs', 'work'].includes(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

for (const file of walk(root)) {
  if (!file.endsWith('.html')) continue;
  let html = fs.readFileSync(file, 'utf8');
  html = html
    .replaceAll('/app.js?v=3', '/app.js?v=5')
    .replaceAll('/app.js?v=4', '/app.js?v=5')
    .replaceAll('/app.js"', '/app.js?v=5"');
  fs.writeFileSync(file, html);
}

console.log('Applied revision 4 hero cache update.');

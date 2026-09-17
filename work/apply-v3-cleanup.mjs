import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const aboutPath = path.join(root, 'nosotros', 'index.html');
let about = fs.readFileSync(aboutPath, 'utf8');

const founderStory = `<section class="founder-story" aria-labelledby="founder-story-title"><div class="container founder-story-grid"><div><span class="eyebrow">La persona detrás de Lumix</span><h2 id="founder-story-title">Antes del diseño,<br><em>las personas.</em></h2></div><div class="founder-story-copy"><p>Lumix Studio nació de una idea sencilla: ayudar a que buenos negocios se presenten en digital con la misma dedicación que ponen en su trabajo.</p><p>Tu primera conversación es directamente con Néstor. Primero hablamos de tu negocio, tus prioridades y lo que necesitas resolver. Después definimos una propuesta clara.</p><div class="founder-story-signature"><strong>Néstor Ordóñez</strong><span>Fundador · Lumix Studio · Guatemala</span></div><a class="text-link" href="/contacto/">Conversemos sobre tu proyecto</a></div></div></section>`;

if (!about.includes('class="note-scroll"')) {
  throw new Error('Expected personal note section was not found.');
}

about = about
  .replace(/<section class="note-scroll"[\s\S]*?<\/section>/, founderStory)
  .replace(/<section class="container founder-intro founder-intro-clean">[\s\S]*?<\/section>/, '')
  .replace('Profesional no tiene que significar complicado.', 'Trabajar en digital no tiene que ser complicado.')
  .replace('Explicamos sin tecnicismos.', 'Explicamos cada decisión con claridad.')
  .replace('Seguimos presentes después.', 'Seguimos presentes después de publicar.');

fs.writeFileSync(aboutPath, about);
console.log('Applied revision 3 cleanup.');

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

if (process.argv.includes('--cleanup-only')) {
  for (const file of walk(root)) {
    if (!/\.(?:html|css|js)$/.test(file)) continue;
    let text = fs.readFileSync(file, 'utf8');
    text = text
      .replaceAll('<span aria-hidden="true"></span>', '')
      .replaceAll('Explorar seo local', 'Explorar SEO local')
      .replaceAll('Experiencia responsive', 'Adaptable a celular')
      .replaceAll('Diseño responsivo', 'Diseño adaptable')
      .replaceAll('Sitio web moderno y responsivo', 'Sitio web moderno y adaptable');
    fs.writeFileSync(file, text);
  }
  console.log('Applied copy cleanup.');
  process.exit(0);
}

function replaceOnce(text, search, replacement, label) {
  if (!text.includes(search)) throw new Error(`Missing expected block: ${label}`);
  return text.replace(search, replacement);
}

const homePath = path.join(root, 'index.html');
let home = fs.readFileSync(homePath, 'utf8');

home = home.replace(/<section class="section container plan-selection" id="planes">[\s\S]*?<\/section>/, '');
home = home.replace('<span class="founder-mark" aria-hidden="true">NO</span>', '');

const supportingServices = `<section class="supporting-services container" aria-labelledby="supporting-services-title"><div><span class="eyebrow">También podemos ayudarte con</span><h2 id="supporting-services-title">Una marca coherente.<br><em>Una comunicación que continúa.</em></h2></div><div class="supporting-services-grid"><article><span>Identidad visual</span><h3>Diseño de logotipo</h3><p>Un logotipo claro, versátil y preparado para funcionar en web, redes y materiales de tu negocio.</p></article><article><span>Comunicación directa</span><h3>Email marketing</h3><p>Campañas, boletines y secuencias de correo diseñadas para informar, conectar y dar seguimiento.</p></article></div><a class="text-link" href="/servicios/">Ver todos los servicios</a></section>`;

if (!home.includes('supporting-services')) {
  home = replaceOnce(home, '</div></section><section id="proyectos"', `</div></section>${supportingServices}<section id="proyectos"`, 'homepage services boundary');
}

home = home
  .replace('Diseño web, SEO local y automatización para negocios en Guatemala. Creamos experiencias profesionales que convierten visitas en oportunidades.', 'Diseño web, logotipos, email marketing, SEO local y automatización para negocios en Guatemala.')
  .replace('Diseño de páginas web en Guatemala, SEO local y automatización. Creamos una presencia digital clara para tu negocio. Conversemos sobre tu proyecto.', 'Diseño web, logotipos, email marketing, SEO local y automatización para negocios en Guatemala.')
  .replace('Diseño web, SEO local y automatización para negocios en Guatemala que quieren generar más oportunidades.', 'Diseño web, identidad visual, email marketing, SEO local y automatización para negocios en Guatemala.');

fs.writeFileSync(homePath, home);

const servicesPath = path.join(root, 'servicios', 'index.html');
let services = fs.readFileSync(servicesPath, 'utf8');

services = services.replace(/<div class="service-window" aria-hidden="true">[\s\S]*?<\/div>\s*<h2>Diseño y desarrollo de sitios web<\/h2>/, `<div class="service-promise-card" aria-label="Objetivos de una página web Lumix"><span>UNA PÁGINA PENSADA PARA TU NEGOCIO</span><strong>Explica lo que haces.</strong><strong>Facilita el contacto.</strong><strong>Convierte interés en oportunidades.</strong></div><h2>Diseño y desarrollo de sitios web</h2>`);

const automationCard = '<article class="service-card reveal"><span class="service-icon"></span><h2>Automatización</h2><p>WhatsApp, formularios, citas y flujos conectados para responder, registrar y dar seguimiento.</p><small class="service-note">Integraciones · Seguimiento</small></article>';
const addedCards = `${automationCard}<article class="service-card reveal"><span class="service-icon"></span><h2>Diseño de logotipo</h2><p>Creamos una identidad visual clara y versátil para que tu negocio se reconozca en cada punto de contacto.</p><small class="service-note">Logotipo · Identidad visual</small></article><article class="service-card reveal"><span class="service-icon"></span><h2>Email marketing</h2><p>Diseñamos campañas, boletines y secuencias de correo para mantener el contacto y acompañar cada oportunidad.</p><small class="service-note">Campañas · Seguimiento</small></article>`;
services = replaceOnce(services, automationCard, addedCards, 'services card grid');
services = services
  .replaceAll('Diseño web y automatización en Guatemala | Lumix Studio', 'Diseño web, logotipos y marketing en Guatemala | Lumix Studio')
  .replaceAll('Conoce nuestros servicios de diseño web, landing pages, SEO local, WhatsApp y automatización para negocios en Guatemala. Soluciones según tu alcance.', 'Diseño web, logotipos, email marketing, SEO local y automatización para negocios en Guatemala.')
  .replace('Diseño web, SEO local y automatización para negocios en Guatemala.', 'Diseño web, identidad visual, email marketing, SEO local y automatización para negocios en Guatemala.');
fs.writeFileSync(servicesPath, services);

const aboutPath = path.join(root, 'nosotros', 'index.html');
let about = fs.readFileSync(aboutPath, 'utf8');
about = about.replace(/<section class="container founder-intro">[\s\S]*?<\/section>/, `<section class="container founder-intro founder-intro-clean"><div><span class="eyebrow">La persona detrás de Lumix</span><h2>Néstor Ordóñez</h2><p class="founder-role">Fundador · Guatemala</p></div><div><p>Tu primera conversación es directamente con Néstor. Antes de proponer una solución, hablamos de tu negocio, tus prioridades y lo que necesitas resolver.</p><a class="text-link" href="/contacto/">Cuéntame en qué estás trabajando</a></div></section>`);
fs.writeFileSync(aboutPath, about);

const contactPath = path.join(root, 'contacto', 'index.html');
let contact = fs.readFileSync(contactPath, 'utf8');
const otherChoice = '<label class="service-choice service-choice-wide"><input type="checkbox" name="servicio" value="Otro"><span class="service-choice-card"><span class="service-choice-icon"></span><span class="service-choice-copy"><strong>Otro proyecto</strong><small>Cuéntanos lo que tienes en mente</small></span></span></label>';
const newChoices = `<label class="service-choice"><input type="checkbox" name="servicio" value="Diseño de logotipo"><span class="service-choice-card"><span class="service-choice-icon"></span><span class="service-choice-copy"><strong>Diseño de logotipo</strong><small>Identidad visual</small></span></span></label><label class="service-choice"><input type="checkbox" name="servicio" value="Email marketing"><span class="service-choice-card"><span class="service-choice-icon"></span><span class="service-choice-copy"><strong>Email marketing</strong><small>Campañas y seguimiento</small></span></span></label>${otherChoice}`;
contact = replaceOnce(contact, otherChoice, newChoices, 'contact service choices');
fs.writeFileSync(contactPath, contact);

const plansPath = path.join(root, 'planes', 'index.html');
let plans = fs.readFileSync(plansPath, 'utf8');
if (!plans.includes('plan-addons')) {
  const addons = `<section class="container plan-addons"><span class="eyebrow">Servicios adicionales</span><h2>Completa tu presencia cuando lo necesites.</h2><div><p><strong>Diseño de logotipo</strong><br>Una identidad visual clara para tu negocio.</p><p><strong>Email marketing</strong><br>Campañas y secuencias para mantener el contacto.</p></div><a class="text-link" href="/contacto/?servicio=Servicios%20adicionales">Consultar un servicio adicional</a></section>`;
  plans = replaceOnce(plans, '<section class="closing">', `${addons}<section class="closing">`, 'plans closing boundary');
}
fs.writeFileSync(plansPath, plans);

for (const file of walk(root)) {
  if (!/\.(?:html|css|js)$/.test(file)) continue;
  let text = fs.readFileSync(file, 'utf8');
  text = text
    .replaceAll('Nestor Ordonez', 'Néstor Ordóñez')
    .replaceAll('Nestor', 'Néstor')
    .replace(/[↗→←↑]/g, '')
    .replaceAll('<span aria-hidden="true"></span>', '')
    .replaceAll('Explorar seo local', 'Explorar SEO local')
    .replace(/\s{2,}(<\/a>)/g, ' $1');
  if (file.endsWith('.html') && !text.includes('/revision.css')) {
    text = text.replace('</head>', '<link rel="stylesheet" href="/revision.css"></head>');
  }
  fs.writeFileSync(file, text);
}

console.log('Applied feedback revision.');

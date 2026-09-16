import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(root, relativePath), content, 'utf8');
}

function one(source, pattern, replacement, label) {
  const matches = source.match(pattern);
  if (!matches || matches.length !== 1) {
    throw new Error(`${label}: expected one match, found ${matches?.length ?? 0}`);
  }
  return source.replace(pattern, replacement);
}

function section(source, className) {
  const pattern = new RegExp(`<section class="${className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?<\\/section>`);
  const match = source.match(pattern);
  if (!match) throw new Error(`Missing section: ${className}`);
  return match[0];
}

function planSection(level = 2) {
  const tag = `h${level}`;
  const cardTag = `h${level + 1}`;
  return `<section class="section container plan-selection" id="planes"><div class="plan-heading"><span class="eyebrow">Una solución para tu siguiente etapa</span><${tag}>Elige por lo que<br><em>tu negocio necesita.</em></${tag}><p class="plan-context">No trabajamos con paquetes rígidos ni precios escondidos detrás de una lista genérica. Partimos de tu objetivo y definimos contigo el alcance y la inversión.</p></div><div class="plan-options"><article class="plan-option plan-start" data-plan-index="0"><div class="plan-cover"><img decoding="async" srcset="/assets/lumix-10-640.webp 640w, /assets/lumix-10.webp 1200w" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 70vw, 100vw" src="/assets/lumix-10.webp" alt="Una emprendedora comparte la nueva presencia digital de su negocio" width="1200" height="800" loading="lazy"><span>Presencia digital</span></div><div class="plan-content"><span class="plan-badge">Para empezar con claridad</span><${cardTag} class="plan-name">Impulso</${cardTag}><p class="plan-decision">Necesito verme profesional</p><p class="plan-promise">Para negocios que quieren establecer o mejorar su presencia digital.</p><div class="plan-inclusions"><small>Lo que ponemos en marcha</small><ul><li>Sitio web moderno y responsivo</li><li>Dominio, hosting y SSL</li><li>WhatsApp y formulario de contacto</li></ul></div><a class="btn plan-action" href="/contacto/?plan=Impulso">Solicitar cotización</a><p class="plan-quote">Proyecto a medida · Definimos el alcance contigo</p></div></article><article class="plan-option plan-grow" data-plan-index="1"><div class="plan-cover"><img decoding="async" src="/assets/lumix-5.webp" alt="Dos profesionales revisan información de su negocio en una cafetería" width="640" height="480" loading="lazy"><span>Visibilidad y contacto</span></div><div class="plan-content"><span class="plan-badge">Más elegido</span><${cardTag} class="plan-name">Crecimiento</${cardTag}><p class="plan-decision">Quiero que me encuentren y me contacten</p><p class="plan-promise">Para negocios que quieren más visibilidad y mejores rutas de contacto.</p><div class="plan-inclusions"><small>Lo que ponemos en marcha</small><ul><li>Todo lo incluido en Impulso</li><li>WhatsApp o reservas integradas</li><li>Google Business y SEO local básico</li></ul></div><a class="btn plan-action" href="/contacto/?plan=Crecimiento">Quiero crecer</a><p class="plan-quote">Proyecto a medida · Definimos el alcance contigo</p></div></article><article class="plan-option plan-scale" data-plan-index="2"><div class="plan-cover"><img decoding="async" src="/assets/lumix-6.webp" alt="Una emprendedora organiza citas con ayuda de herramientas digitales" width="640" height="480" loading="lazy"><span>Procesos y automatización</span></div><div class="plan-content"><span class="plan-badge">Para una operación más conectada</span><${cardTag} class="plan-name">Expansión</${cardTag}><p class="plan-decision">Quiero automatizar parte de mi negocio</p><p class="plan-promise">Para negocios listos para conectar citas, consultas y seguimiento.</p><div class="plan-inclusions"><small>Lo que ponemos en marcha</small><ul><li>Todo lo incluido en Crecimiento</li><li>Automatización y citas en línea</li><li>Soporte técnico prioritario</li></ul></div><a class="btn plan-action" href="/contacto/?plan=Expansi%C3%B3n">Hablar sobre mi proyecto</a><p class="plan-quote">Proyecto a medida · Definimos el alcance contigo</p></div></article></div><p class="plan-help">¿Aún no sabes cuál elegir? <a href="/contacto/?servicio=Ayuda%20para%20elegir%20un%20plan">Cuéntanos sobre tu negocio.</a></p></section>`;
}

const trust = `<section class="conversion-trust" aria-label="Lo que incluye una solución Lumix"><div class="container"><ul><li>Diseño personalizado</li><li>Experiencia responsive</li><li>Dominio, hosting y SSL</li><li>WhatsApp y formularios</li><li>SEO local</li><li>Acompañamiento cercano</li></ul></div></section>`;

const process = `<section class="lumix-process container" id="como-trabajamos"><div class="process-heading"><div><span class="eyebrow">Cómo trabaja Lumix</span><h2>Un proceso claro.<br><em>Sin complicarte.</em></h2></div><p>Nos encargamos de convertir tus objetivos en una experiencia digital útil. Tú siempre sabes qué estamos construyendo y qué sigue.</p></div><div class="process-list"><article><span class="process-number">01</span><h3>Cuéntanos sobre tu negocio</h3><p>Conocemos tus objetivos, clientes y presencia digital actual.</p></article><article><span class="process-number">02</span><h3>Diseñamos la experiencia</h3><p>Damos forma a una solución visual que se sienta propia y fácil de usar.</p></article><article><span class="process-number">03</span><h3>Construimos y conectamos</h3><p>Integramos web, WhatsApp, formularios, SEO y las funciones acordadas.</p></article><article><span class="process-number">04</span><h3>Publicamos</h3><p>Probamos cada pantalla, configuramos dominio y SSL, y dejamos todo listo.</p></article><article><span class="process-number">05</span><h3>Te acompañamos</h3><p>Seguimos cerca con soporte y Lumix Care cuando el proyecto lo requiere.</p></article></div><a class="text-link process-action" href="/proceso/">Conoce el proceso completo</a></section>`;

const founder = `<section class="founder-trust"><div class="container founder-grid"><figure class="founder-visual"><img decoding="async" srcset="/assets/lumix-1-640.webp 640w, /assets/lumix-1.webp 1280w" sizes="(max-width: 760px) calc(100vw - 40px), 45vw" src="/assets/lumix-1.webp" alt="Dos personas colaboran en la presencia digital de un pequeño negocio" width="1280" height="800" loading="lazy"><span class="founder-mark" aria-hidden="true">NO</span></figure><div class="founder-copy"><span class="eyebrow">Una forma más humana de trabajar</span><h2>Digital por fuera.<br><em>Humano por dentro.</em></h2><p>Lumix Studio nació para que los negocios puedan acceder a soluciones digitales profesionales sin la experiencia fría o distante de una agencia tradicional. Escuchamos primero, explicamos con claridad y diseñamos después.</p><div class="founder-signature"><strong>Nestor Ordonez</strong><span>Fundador · Lumix Studio</span></div><ul class="founder-values"><li>Comunicación directa</li><li>Diseño pensado para tu negocio</li><li>Alcance explicado con claridad</li><li>Acompañamiento después de publicar</li></ul><a class="text-link" href="/nosotros/">Conoce el estudio</a></div></div></section>`;

const closing = `<section class="closing conversion-closing"><div class="container closing-inner"><div><span class="eyebrow">Tu próximo paso</span><h2>Tu negocio ya tiene valor.<br><em>Hagamos que se note.</em></h2></div><div><p>Cuéntanos sobre tu negocio y te mostramos cómo podemos ayudarte.</p><div class="closing-actions"><a class="btn btn-primary" href="/contacto/">Solicitar cotización</a><a class="text-link" href="https://wa.me/50244931218?text=Hola%20Lumix%2C%20vi%20su%20p%C3%A1gina%20y%20quisiera%20informaci%C3%B3n%20para%20mejorar%20la%20presencia%20digital%20de%20mi%20negocio." target="_blank" rel="noopener noreferrer">Hablar por WhatsApp</a></div></div></div></section>`;

let home = read('index.html');
if (!home.includes('class="conversion-trust"')) {
const heroMatch = home.match(/<div class="cinema-wrap">[\s\S]*?<\/section><\/div>/);
if (!heroMatch) throw new Error('Missing cinematic hero');
let hero = heroMatch[0]
  .replace('Un estudio digital. De tu lado.', 'Lumix Studio · Guatemala')
  .replace('Tu negocio.<br><em>Todo su potencial.</em>', 'Tu negocio ya tiene valor.<br><em>Hagamos que se note.</em>')
  .replace('<p>Le has puesto el alma.<br>Hagamos que el mundo lo vea.</p>', '<p>Diseñamos experiencias digitales para negocios que quieren verse mejor, hacerse encontrar y convertir visitas en oportunidades.</p>')
  .replace('<p>Diseño web, visibilidad y automatización para pequeños negocios que están listos para dar el siguiente paso.</p>', '<p>Cuéntanos sobre tu negocio y te mostramos cómo podemos ayudarte.</p>')
  .replace('<a class="btn btn-primary" href="/contacto/">Hablemos de tu negocio</a><a class="text-link" href="/planes/">Explorar planes</a>', '<a class="btn btn-primary" href="/contacto/">Solicitar cotización</a><a class="text-link" href="#proyectos">Ver proyectos</a>')
  .replace('href="#historias">Hay mucho por descubrir', 'href="#proyectos">Conoce lo que podemos crear');

let services = section(home, 'motion-services container')
  .replace('class="motion-services container"', 'class="motion-services container conversion-services"')
  .replace('<div class="section-intro"><span class="eyebrow">Lo que hacemos</span><h2>Tres maneras de<br><em>llevarte más lejos.</em></h2></div>', '<div class="section-intro"><div><span class="eyebrow">Lo que resolvemos</span><h2>Más que una página.<br><em>Una presencia que trabaja contigo.</em></h2></div><p>Ayudamos a que tu negocio se vea profesional, sea más fácil de encontrar y convierta el interés en una conversación.</p></div>')
  .replaceAll('#experiencia', '#proyectos');

let projects = home.match(/<section id="experiencia" class="business-showcase container">[\s\S]*?<\/section>/)?.[0];
if (!projects) throw new Error('Missing business showcase');
projects = projects
  .replace('id="experiencia"', 'id="proyectos"')
  .replace('Así podría sentirse tu próxima web', 'Trabajo pensado para abrir oportunidades')
  .replace('Tu negocio.<br><em>Sus posibilidades.</em>', 'Proyectos<br><em>Lumix.</em>')
  .replace('Explora tres ejemplos de diseño y descubre cómo una página puede ayudar a tus clientes a dar el siguiente paso.', 'No solo diseñamos páginas. Creamos experiencias pensadas para convertir visitas en oportunidades.')
  .replaceAll('Concepto de diseño ·', 'Concepto Lumix ·')
  .replace('Del antojo a la visita.', 'Menú, ubicación y pedidos directos por WhatsApp.')
  .replace('De la duda a una conversación.', 'Servicios claros y solicitudes de consulta.')
  .replace('Del descubrimiento al contacto.', 'Catálogo visual y consultas de disponibilidad.')
  .replaceAll('Detrás del diseño ·', 'Ver proyecto ·')
  .replaceAll('Quiero una web así', 'Quiero algo así');

const main = `<main id="contenido">${hero}${trust}${services}${projects}${process}${planSection(2)}${founder}${closing}</main>`;
home = one(home, /<main id="contenido">[\s\S]*?<\/main>/, main, 'homepage main');
home = home.replace('</head>', '<link rel="stylesheet" href="/conversion.css"></head>');
home = home.replace('Diseño de páginas web en Guatemala, SEO local y automatización. Creamos una presencia digital clara para tu negocio. Conversemos sobre tu proyecto.', 'Diseño web, SEO local y automatización para negocios en Guatemala. Creamos experiencias profesionales que convierten visitas en oportunidades.');
home = home.replace('"description":"Diseño web, SEO local y automatización para negocios en Guatemala."', '"description":"Diseño web, SEO local y automatización para negocios en Guatemala que quieren generar más oportunidades."');
write('index.html', home);
}

let plans = read('planes/index.html');
if (!plans.includes('class="plan-decision"') || plans.includes('<h3 class="plan-name">')) {
plans = one(plans, /<section class="section container plan-selection"[^>]*>[\s\S]*?<\/section>/, planSection(1), 'plans page section');
plans = plans.replace('</head>', '<link rel="stylesheet" href="/conversion.css"></head>');
write('planes/index.html', plans);
}

const oldWhatsApp = 'https://wa.me/50244931218?text=Hola%20Nestor%2C%20quiero%20conversar%20sobre%20un%20proyecto%20para%20mi%20negocio.';
const newWhatsApp = 'https://wa.me/50244931218?text=Hola%20Lumix%2C%20vi%20su%20p%C3%A1gina%20y%20quisiera%20informaci%C3%B3n%20para%20mejorar%20la%20presencia%20digital%20de%20mi%20negocio.';
for (const file of ['index.html', '404.html', ...fs.readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory() && !['.git', 'assets', 'docs', 'netlify', 'work'].includes(entry.name)).map(entry => `${entry.name}/index.html`)]) {
  let html = read(file);
  html = html.replaceAll(oldWhatsApp, newWhatsApp);
  html = html.replace(`<a id="directWa" href="${newWhatsApp}">`, `<a id="directWa" href="${newWhatsApp}" target="_blank" rel="noopener noreferrer">`);
  write(file, html);
}

let app = read('app.js');
app = app.replace("'.manifesto h2,.manifesto>div,.section-intro,.studio-copy,.steps article,.closing-inner,.service-card,.plan,.directory-card,.promise-item'", "'.manifesto h2,.manifesto>div,.section-intro,.studio-copy,.steps article,.closing-inner,.service-card,.plan,.directory-card,.promise-item,.conversion-trust li,.process-list article,.founder-grid>*'");
write('app.js', app);

console.log('Applied Lumix conversion redesign.');

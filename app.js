const menu=document.querySelector('.menu-toggle');
// Real business examples: each choice reveals a complete, useful design concept.
const demoButtons=[...document.querySelectorAll('[data-demo]')];
function selectDemo(button){
 demoButtons.forEach(item=>{const selected=item===button;item.setAttribute('aria-pressed',String(selected));const panel=document.getElementById(`demo-${item.dataset.demo}`);if(panel)panel.hidden=!selected;});
}
demoButtons.forEach(button=>button.addEventListener('click',()=>selectDemo(button)));
if(demoButtons.length)selectDemo(demoButtons[0]);
// Motion is progressive enhancement: all content is visible without JavaScript.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const motionAllowed=()=>!reducedMotion.matches;
const experience=document.querySelector('.experience');
const stage=document.querySelector('.experience-stage');
const creative=document.querySelector('.creative-window');
const stageTitle=document.querySelector('.stage-title');
const ribbon=document.querySelector('.motion-ribbon>div');
const heroStar=document.querySelector('.hero-star');
const peopleScene=document.querySelector('.people-scene');
const peopleMain=document.querySelector('.photo-main');
const peopleDetail=document.querySelector('.photo-detail');
const peopleImage=peopleMain?.querySelector('img');
const peopleWord=document.querySelector('.scene-word');
const peopleStamp=document.querySelector('.people-stamp');
const sculpture=document.querySelector('.sculpture');
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
const cinemaWrap=document.querySelector('.cinema-wrap');
const cinemaPhoto=document.querySelector('.cinema-photo');
const cinemaIntro=document.querySelector('.cinema-intro');
const cinemaReveal=document.querySelector('.cinema-reveal');
const journey=document.querySelector('.photo-journey');
const journeyTrack=document.querySelector('.journey-track');
const cinematicMedia=matchMedia('(min-width:761px) and (min-height:650px)');
const clamp=value=>Math.max(0,Math.min(1,value));
const typingNotes=[...document.querySelectorAll('.note-scroll')].map(section=>({section,characters:[...section.querySelectorAll('.type-char')],count:-1,cursor:null,readAll:false,pinned:false}));
function setTypedCount(note,count){
 if(count===note.count)return;
 note.cursor?.classList.remove('is-caret');
 const previous=Math.max(0,note.count);
 if(note.count<0)note.characters.forEach((char,i)=>char.classList.toggle('is-typed',i<count));
 else if(count>previous)for(let i=previous;i<count;i++)note.characters[i].classList.add('is-typed');
 else for(let i=count;i<previous;i++)note.characters[i].classList.remove('is-typed');
 note.cursor=count>0&&count<note.characters.length?note.characters[count-1]:null;
 note.cursor?.classList.add('is-caret');note.count=count;
}
function syncTyping(){
   const enabled=motionAllowed()&&cinematicMedia.matches;
   document.documentElement.classList.toggle('typing-active',enabled);
   typingNotes.forEach(note=>{
    note.section.classList.remove('note-pinned');
    note.pinned=enabled&&note.section.querySelector('.personal-note').offsetHeight<innerHeight-125;
    note.section.classList.toggle('note-pinned',note.pinned);
    note.section.classList.toggle('typing-enabled',note.pinned&&!note.readAll);
    if(!note.pinned||note.readAll)setTypedCount(note,note.characters.length);
   });
}
function paintTyping(){
 typingNotes.forEach(note=>{
  if(!note.pinned||note.readAll){setTypedCount(note,note.characters.length);return;}
  const rect=note.section.getBoundingClientRect();
  const panel=note.section.querySelector('.personal-note');
  const travel=Math.max(1,rect.height-panel.offsetHeight);
  const progress=clamp((innerHeight*.35-rect.top)/(travel*.55+innerHeight*.35-105));
  setTypedCount(note,Math.round(progress*note.characters.length));
 });
}
typingNotes.forEach(note=>note.section.querySelector('.note-read-all')?.addEventListener('click',()=>{
 note.readAll=true;setTypedCount(note,note.characters.length);
 note.section.querySelector('.note-read-all').textContent='Nota completa';
}));
  const journeyGuide=document.querySelector('.journey-progress i');
  const journeyChapters=[...document.querySelectorAll('.journey-chapters span')];
  const journeyPhotos=[...document.querySelectorAll('.journey-photo img')];
function paintCinema(){
 if(!document.documentElement.classList.contains('cinematic'))return;
 if(cinemaWrap){
  const rect=cinemaWrap.getBoundingClientRect();
  const progress=clamp((83-rect.top)/(rect.height-(innerHeight-83)));
  const open=progress*progress*(3-2*progress);
  cinemaPhoto.style.clipPath='inset('+((1-open)*7)+'% '+((1-open)*4)+'% '+((1-open)*7)+'% '+((1-open)*48)+'% round '+((1-open)*125)+'px 0 0 0)';
  cinemaIntro.style.transform='translate3d('+(-open*80)+'px,'+(-open*100)+'px,0)';
  cinemaIntro.style.opacity=String(1-clamp(open*2.3));
  cinemaIntro.style.pointerEvents=open>.45?'none':'';

  cinemaReveal.style.opacity=String(clamp((open-.35)/.45));
  cinemaReveal.style.transform='translateY('+((1-open)*75)+'px)';
 }
 if(journey){
  const rect=journey.getBoundingClientRect();
  const progress=clamp((83-rect.top)/(rect.height-(innerHeight-83)));
  const sceneProgress=clamp((progress-.04)/.81);
   const travel=Math.max(0,journeyTrack.scrollWidth-journey.clientWidth);
  journeyTrack.style.transform='translate3d('+(-sceneProgress*travel)+'px,0,0)';
  if(journeyGuide)journeyGuide.style.transform='scaleX('+sceneProgress+')';
   journeyChapters.forEach((label,i)=>label.classList.toggle('is-current',i===Math.min(2,Math.round(sceneProgress*2))));
   journeyPhotos.forEach(img=>{const panel=img.parentElement;const center=panel.offsetLeft+panel.offsetWidth/2-sceneProgress*travel;const drift=Math.max(-1,Math.min(1,(journey.clientWidth/2-center)/journey.clientWidth));img.style.transform='translateX('+(drift*4)+'%) scale('+(1+Math.abs(drift)*.055)+')';const caption=panel.querySelector('div');if(caption)caption.style.transform='translate3d('+(drift*-32)+'px,'+(Math.abs(drift)*22)+'px,0)';});
 }
}
function syncCinema(){
 const enabled=motionAllowed()&&cinematicMedia.matches;
 const changed=document.documentElement.classList.contains('cinematic')!==enabled;
 let anchor=null,offset=0;
 if(changed){
  const candidates=[cinemaWrap,journey,...typingNotes.map(n=>n.section),...document.querySelectorAll('main>section')].filter(Boolean);
  anchor=candidates.find(e=>{const r=e.getBoundingClientRect();return r.top<=100&&r.bottom>100;});
  if(anchor)offset=Math.min(0,anchor.getBoundingClientRect().top-83);
 }
 document.documentElement.classList.toggle('cinematic',enabled);
 syncTyping();
 journeyPhotos.forEach(img=>{img.style.removeProperty('transform');img.parentElement.querySelector('div')?.style.removeProperty('transform');});
 [cinemaPhoto,cinemaIntro,cinemaReveal,journeyTrack].filter(Boolean).forEach(e=>{e.style.removeProperty('transform');e.style.removeProperty('opacity');e.style.removeProperty('clip-path');e.style.removeProperty('pointer-events');});
 cinemaIntro?.querySelectorAll('a').forEach(a=>a.removeAttribute('tabindex'));
 if(changed&&anchor){const top=anchor.getBoundingClientRect().top+scrollY;const max=Math.max(0,anchor.offsetHeight-innerHeight+83);scrollTo({top:Math.max(0,top-83+Math.min(-offset,max)),behavior:'instant'});}
}
cinematicMedia.addEventListener('change',()=>{syncCinema();queueMotion();});
cinemaIntro?.addEventListener('focusin',()=>{if(document.documentElement.classList.contains('cinematic')){scrollTo({top:Math.max(0,cinemaWrap.getBoundingClientRect().top+scrollY-83),behavior:'instant'});paintCinema();}});
journey?.querySelector('.journey-next')?.addEventListener('focus',()=>{
   if(!document.documentElement.classList.contains('cinematic'))return;
   const rect=journey.getBoundingClientRect();scrollTo({top:scrollY+rect.top-83+(rect.height-innerHeight+83)*.87,behavior:'instant'});paintCinema();
  });
  addEventListener('pageshow',queueMotion);
document.fonts?.ready.then(()=>{syncTyping();queueMotion();});

stage?.addEventListener('pointermove',event=>{
 if(!motionAllowed()||!finePointer.matches||!sculpture)return;
 const rect=stage.getBoundingClientRect();
 const x=(event.clientX-rect.left)/rect.width-.5;
 const y=(event.clientY-rect.top)/rect.height-.5;
 sculpture.style.transform=`rotate(-15deg) rotateY(${x*34}deg) rotateX(${-y*24}deg)`;
});
stage?.addEventListener('pointerleave',()=>sculpture?.style.removeProperty('transform'));
const floatingLabels=[...document.querySelectorAll('.floating-label')];
const scrollElements=[stage,creative,stageTitle,ribbon,heroStar,sculpture,peopleMain,peopleDetail,peopleImage,peopleWord,peopleStamp,...floatingLabels].filter(Boolean);
const activeMotion=new Set();
function animateOnce(element,frames,options){
 if(!motionAllowed())return;
 const animation=element.animate(frames,options);activeMotion.add(animation);
 animation.finished.catch(()=>{}).finally(()=>activeMotion.delete(animation));
}
let scrollFrame=0;
function paintMotion(){
 scrollFrame=0;if(!motionAllowed())return;
 paintCinema();
 paintTyping();
 const vh=innerHeight;
 if(peopleScene){
  const rect=peopleScene.getBoundingClientRect();
  if(rect.bottom>0&&rect.top<vh){
   const mobile=innerWidth<=760;
   const progress=Math.max(0,Math.min(1,mobile?(vh-rect.top)/(vh+rect.height):scrollY/(vh*.95)));
   // The frame opens while its photograph drifts within it; nearer objects travel farther.
   peopleMain.style.transform=`translate3d(${-progress*(mobile?0:24)}px,${-progress*(mobile?14:30)}px,0) scale(${1+progress*(mobile?.025:.07)})`;
   peopleImage.style.transform=`translateY(${progress*(mobile?8:22)}px) scale(${1.06+progress*.035})`;
   peopleDetail.style.transform=`translate3d(${progress*(mobile?0:12)}px,${-progress*(mobile?35:100)}px,0) rotate(${5-progress*7}deg)`;
   peopleWord.style.transform=`translate3d(${-progress*20}px,${progress*(mobile?12:46)}px,0)`;
   peopleStamp.style.transform=`translateY(${-progress*(mobile?25:65)}px) rotate(${-progress*16}deg)`;
  }
 }
 if(experience&&stage){
  const rect=experience.getBoundingClientRect();
  if(rect.bottom>0&&rect.top<vh){
   const progress=Math.max(0,Math.min(1,(vh-rect.top)/(vh+rect.height*.25)));
   const desktop=innerWidth>760;
   stage.style.transform=desktop?`scale(${.94+progress*.06})`:'';
   creative.style.transform=`translateY(${(1-progress)*(desktop?55:16)}px) rotate(${-7+progress*9}deg)`;
   stageTitle.style.transform=`translateY(${-progress*(desktop?45:12)}px)`;
   floatingLabels.forEach((label,i)=>label.style.transform=`translateY(${progress*(i?-18:22)}px) rotate(${i?-5:8-progress*8}deg)`);
  }
 }
 if(ribbon){const rect=ribbon.getBoundingClientRect();if(rect.bottom>0&&rect.top<vh)ribbon.style.transform=`translateX(${-5-(1-rect.top/vh)*12}%)`;}
 if(heroStar&&scrollY<vh)heroStar.style.transform=`rotate(${scrollY*.12}deg)`;
}
function queueMotion(){if(!scrollFrame&&motionAllowed())scrollFrame=requestAnimationFrame(paintMotion);}
function syncMotion(){
 syncCinema();
 activeMotion.forEach(animation=>animation.cancel());
 scrollElements.forEach(element=>element.style.removeProperty('transform'));
 queueMotion();
}
reducedMotion.addEventListener('change',syncMotion);
addEventListener('scroll',queueMotion,{passive:true});
addEventListener('resize',()=>{syncCinema();queueMotion();},{passive:true});
syncMotion();
if('IntersectionObserver' in window){
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  revealObserver.unobserve(entry.target);
  animateOnce(entry.target,[{opacity:.35,transform:'translateY(35px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,easing:'cubic-bezier(.22,1,.36,1)'});
 }),{threshold:.12});
 document.querySelectorAll('.manifesto h2,.manifesto>div,.section-intro,.studio-copy,.steps article,.closing-inner,.service-card,.plan,.directory-card,.promise-item,.conversion-trust li,.process-list article,.founder-grid>*').forEach(element=>revealObserver.observe(element));
 const plansObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    plansObserver.unobserve(entry.target);
    const index=Number(entry.target.dataset.planIndex)||0;
    animateOnce(entry.target,[{opacity:.25,transform:'perspective(1000px) translateY(65px) rotateX(7deg)'},{opacity:1,transform:'perspective(1000px) translateY(0) rotateX(0)'}],{duration:1100,delay:innerWidth>760?index*130:0,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
   }),{threshold:.12});
   document.querySelectorAll('.plan-option').forEach(element=>plansObserver.observe(element));
   const demoObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  demoObserver.unobserve(entry.target);
  animateOnce(entry.target,[{opacity:.5,transform:'translateY(24px) rotate(3deg)'},{opacity:1,transform:'translateY(0) rotate(0deg)'}],{duration:1000,easing:'cubic-bezier(.22,1,.36,1)'});
  entry.target.querySelectorAll('.flow-connector i').forEach((dot,i)=>animateOnce(dot,[{transform:'translateY(-100%)'},{transform:'translateY(100%)'}],{duration:1100,delay:i*500,iterations:3,easing:'ease-in-out'}));
 }),{threshold:.35});
 document.querySelectorAll('.card-demo').forEach(element=>demoObserver.observe(element));
}
document.querySelectorAll('.people-copy h1,.hero-description').forEach((element,index)=>animateOnce(element,[{opacity:.3,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,delay:index*100,easing:'cubic-bezier(.22,1,.36,1)'}));
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Abrir menú');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu?.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.navigation'))closeMenu();});
window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();},{passive:true});
// Preserve links previously shared from the hash-based website.
const oldPaths={inicio:'/',servicios:'/servicios/',proceso:'/proceso/',planes:'/planes/',nosotros:'/nosotros/',contacto:'/contacto/'};
if(location.pathname==='/'&&oldPaths[location.hash.slice(1)])location.replace(oldPaths[location.hash.slice(1)]);
document.querySelectorAll('.faq-question').forEach(button=>{const answer=button.nextElementSibling;answer.hidden=button.getAttribute('aria-expanded')!=='true';button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));answer.hidden=!open;});});
const form=document.querySelector('#contactForm');
if(form){
 const status=document.querySelector('#formStatus');
 const params=new URLSearchParams(location.search);const selection=params.get('servicio')||params.get('plan');
 if(selection){const message=form.querySelector('[name="mensaje"]');message.value=`Me interesa: ${selection}. `;}
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const data=new FormData(form);if(data.get('bot-field'))return;
  const services=data.getAll('servicio').join(', ')||'Por definir';
  const message=`Hola Néstor, soy ${data.get('nombre')} de ${data.get('negocio')}.\nMe interesa: ${services}.\nTeléfono: ${data.get('telefono')}\nCorreo: ${data.get('email')}\n${data.get('mensaje')||''}`;
  status.replaceChildren(document.createTextNode('Tu mensaje está listo. '));
  const link=document.createElement('a');link.href='https://wa.me/50244931218?text='+encodeURIComponent(message);link.target='_blank';link.rel='noopener noreferrer';link.textContent='Abrir WhatsApp para revisarlo y enviarlo ';status.append(link);link.focus();
 });
}

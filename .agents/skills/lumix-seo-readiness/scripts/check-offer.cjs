const fs=require('node:fs');
const path=require('node:path');
const root=process.argv[2]?path.resolve(process.argv[2]):path.resolve(__dirname,'../../../..');
const offer=JSON.parse(fs.readFileSync(path.join(root,'docs/seo/impulso-offer.json'),'utf8'));
const errors=[];
const regular=offer.regularDesignDevelopmentPrice,promo=offer.promotionalDesignDevelopmentPrice;
if(Math.round(regular*(1-offer.discountPercent/100))!==promo||regular-promo!==offer.savings)errors.push('Offer arithmetic differs');
const dateText=iso=>new Intl.DateTimeFormat('es-GT',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(iso+'T12:00:00Z'));
const html=fs.readFileSync(path.join(root,'planes/index.html'),'utf8');
const section=html.match(/<section\b[^>]*id="oferta-web"[\s\S]*?<\/section>/)?.[0]||'';
for(const required of ['Q'+regular.toLocaleString('en-US'),'Q'+promo.toLocaleString('en-US'),offer.discountPercent+' %',dateText(offer.consultationBookingStart),dateText(offer.consultationBookingEnd),'clientes nuevos','primera consulta','dominio','hosting','mantenimiento','terceros'])if(!section.toLowerCase().includes(required.toLowerCase()))errors.push('Missing promotion term: '+required);
const files=['index.html',...fs.readdirSync(root,{withFileTypes:true}).filter(e=>e.isDirectory()&&fs.existsSync(path.join(root,e.name,'index.html'))).map(e=>e.name+'/index.html')];
const allowedPrices=new Set([regular,promo,offer.savings]);
for(const file of files){const source=fs.readFileSync(path.join(root,file),'utf8');for(const match of source.matchAll(/Q\s*([\d,]+(?:\.\d+)?)/g)){const value=Number(match[1].replaceAll(',',''));if(!allowedPrices.has(value))errors.push(file+': undocumented price Q'+match[1]);}
 for(const range of source.matchAll(/del (\d{1,2} de [a-záéíóú]+ de \d{4}) al (\d{1,2} de [a-záéíóú]+ de \d{4})/gi)){
  if(range[1].toLowerCase()!==dateText(offer.consultationBookingStart).toLowerCase()||range[2].toLowerCase()!==dateText(offer.consultationBookingEnd).toLowerCase())errors.push(file+': inconsistent advertised promotion dates');
 }
}
if(errors.length){console.error(JSON.stringify({errors},null,2));process.exitCode=1;}else console.log(`Offer consistency passed: ${files.length} pages; regular Q${regular}, conditional promotional Q${promo}, ${offer.discountPercent}% discount, published dates and exclusions intact.`);

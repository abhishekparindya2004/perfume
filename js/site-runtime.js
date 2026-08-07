(function(){
function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn()}

function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function loadAdmin(){try{return JSON.parse(localStorage.getItem('aurelia_admin_data_v3')||'{}')}catch(e){return {}}}
function renderProducts(){
 const grid=document.querySelector('.woocommerce ul.products'); if(!grid)return;
 const data=loadAdmin(), products=(data.products||[]).filter(p=>p.status!=='Inactive'); if(!products.length)return;
 const currency=data.settings?.currency||'LKR';
 grid.innerHTML=products.map((p,i)=>{const final=Math.round(Number(p.price||0)*(1-Number(p.discount||0)/100));return `<li class="product type-product ${i%4===0?'first ':''}${i%4===3?'last ':''}instock"><div class="woocommerce-loop-product__wrapper"><div class="attachment-woocommerce_wrapper"><img class="attachment-cosmecos_product_catalog_thumbnail size-cosmecos_product_catalog_thumbnail" src="${esc(p.image||'images/logo.png')}" alt="${esc(p.name)}" loading="lazy">${p.discount>0?`<div class="attachment-woocommerce_flash"><span class="flash-item sale">-${p.discount}%</span></div>`:''}<a class="attachment-woocommerce_link" href="shop.html"></a></div><div class="content-woocommerce-wrapper"><div class="product-rating-wrapper"><div class="star-rating" role="img"><span style="width:100%">Rated 5.00 out of 5</span></div></div><h3 class="woocommerce-loop-product-title"><a href="shop.html">${esc(p.name)}</a></h3><div class="product-info-wrapper"><span class="price">${p.discount>0?`<del>${currency} ${Number(p.price).toLocaleString()}</del> `:''}<ins>${currency} ${final.toLocaleString()}</ins></span><p class="stock-note">${Number(p.stock)>0?`${p.stock} in stock`:'Out of stock'}</p></div></div></div></li>`}).join('');
}
function applySettings(){const d=loadAdmin(),s=d.settings||{};if(s.store)document.querySelectorAll('img[alt="Cosmecos"]').forEach(x=>x.alt=s.store);if(s.announcement){let bar=document.querySelector('.aurelia-admin-announcement');if(!bar){bar=document.createElement('div');bar.className='aurelia-admin-announcement';document.body.prepend(bar)}bar.textContent=s.announcement}}

function applyCMS(){let o={};try{o=JSON.parse(localStorage.getItem('aurelia_cms_overrides_v1')||'{}')}catch(e){}
 document.querySelectorAll('[data-cms-text-id]').forEach(el=>{const x=o[el.dataset.cmsTextId];if(!x)return;if(x.value!==undefined)el.textContent=x.value;el.style.display=x.hidden?'none':''});
 document.querySelectorAll('[data-cms-image-id]').forEach(el=>{const x=o[el.dataset.cmsImageId];if(!x)return;if(x.value)el.src=x.value;if(x.alt!==undefined)el.alt=x.alt;el.style.display=x.hidden?'none':''});
 document.querySelectorAll('[data-cms-bg-id]').forEach(el=>{const x=o[el.dataset.cmsBgId];if(!x)return;if(x.value)el.style.backgroundImage=`url("${x.value}")`;el.style.display=x.hidden?'none':''});
 document.querySelectorAll('[data-cms-link-id]').forEach(el=>{const x=o[el.dataset.cmsLinkId];if(!x)return;if(x.value!==undefined&&/^(?!https?:|mailto:|tel:|javascript:|\/\/).+\.html(?:[?#].*)?$/i.test(x.value.trim()))el.setAttribute('href',x.value.trim());el.style.display=x.hidden?'none':''});
}
ready(function(){
 let pages=[];try{pages=JSON.parse(localStorage.getItem('aurelia_page_overrides')||'[]')}catch(e){}
 const file=(location.pathname.split('/').pop()||'index.html').split('?')[0],p=pages.find(x=>x.file===file);
 if(p){const hero=document.querySelector('.local-page-hero');if(hero){const h=hero.querySelector('h1,h2'),d=hero.querySelector('p');if(h&&p.title)h.textContent=p.title;if(d&&p.description)d.textContent=p.description}if(p.announcement){let bar=document.querySelector('.aurelia-admin-announcement');if(!bar){bar=document.createElement('div');bar.className='aurelia-admin-announcement';document.body.prepend(bar)}bar.textContent=p.announcement}}
 applyCMS();applySettings();renderProducts();window.addEventListener('storage',e=>{if(['aurelia_cms_overrides_v1','aurelia_admin_data_v3','admin_products'].includes(e.key)){applyCMS();applySettings();renderProducts()}});
});
})();

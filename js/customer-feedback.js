(function(){
  'use strict';
  const KEY='aureliaCustomerFeedback';
  const defaults=[
    {name:'Amelia R.',message:'The fragrance consultation was thoughtful and personal. I found a scent that genuinely feels like me.',rating:5},
    {name:'Daniel K.',message:'Beautiful packaging, excellent guidance and a smooth shopping experience from beginning to end.',rating:5}
  ];
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  function esc(v){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
  function load(){try{const v=JSON.parse(localStorage.getItem(KEY));return Array.isArray(v)&&v.length?v:defaults;}catch(e){return defaults;}}
  function save(v){try{localStorage.setItem(KEY,JSON.stringify(v));return true;}catch(e){return false;}}
  function initials(name){return name.trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'C';}
  function render(){
    const list=$('.customer-feedback-list'); if(!list)return;
    const entries=load();
    const visible=entries.slice(0,10);
    const cards=visible.map(x=>`<article class="customer-feedback-card"><div class="customer-feedback-stars" aria-label="${Number(x.rating)||5} out of 5 stars">${'★'.repeat(Number(x.rating)||5)}${'☆'.repeat(5-(Number(x.rating)||5))}</div><blockquote>“${esc(x.message)}”</blockquote><div class="customer-feedback-author"><div class="customer-feedback-avatar">${esc(initials(x.name))}</div><div><strong>${esc(x.name)}</strong><span>Customer of Aurélia Paris</span></div></div></article>`).join('');
    list.innerHTML=cards+cards;
  }
  function open(){const m=$('#customer-feedback-modal');if(!m)return;m.classList.add('is-open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>$('#customer-feedback-form input[name="name"]')?.focus(),50);}
  function close(){const m=$('#customer-feedback-modal');if(!m)return;m.classList.remove('is-open');m.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  function init(){
    render();
    $$('.customer-feedback-open').forEach(b=>b.addEventListener('click',open));
    $$('[data-feedback-close]').forEach(b=>b.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
    const form=$('#customer-feedback-form'); if(!form)return;
    form.addEventListener('submit',e=>{
      e.preventDefault(); const fd=new FormData(form); const name=String(fd.get('name')||'').trim(); const message=String(fd.get('message')||'').trim(); const rating=Math.max(1,Math.min(5,Number(fd.get('rating'))||5)); const status=$('.customer-feedback-message',form);
      if(!name||!message){status.textContent='Please enter your name and feedback.';return;}
      const entries=load(); entries.unshift({name,message,rating,date:new Date().toISOString()});
      if(!save(entries)){status.textContent='Your browser could not save the feedback. Please check storage settings.';return;}
      render(); form.reset(); status.textContent='Thank you! Your feedback is now visible in the feedback section.';
      setTimeout(close,1800);
    });
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();

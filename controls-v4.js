'use strict';
(() => {
 const themeToggle=document.getElementById('theme-toggle'),themeMenu=document.getElementById('theme-menu');
 const themeItems=Array.from(document.querySelectorAll('[data-theme-choice]'));
 const mobileToggle=document.getElementById('mobile-toggle'),nav=document.getElementById('main-navigation');
 const setGlyph=(el,name)=>el?.querySelector('use')?.setAttribute('href','#i-'+name);
 function closeTheme(focus=false){if(!themeMenu)return;themeMenu.hidden=true;themeToggle.setAttribute('aria-expanded','false');if(focus)themeToggle.focus()}
 function openTheme(last=false){if(!themeMenu)return;closeNav();themeMenu.hidden=false;themeToggle.setAttribute('aria-expanded','true');const checked=themeItems.find(x=>x.getAttribute('aria-checked')==='true');(last?themeItems.at(-1):checked||themeItems[0]).focus()}
 function closeNav(focus=false){if(!nav||!mobileToggle)return;nav.classList.remove('is-open');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.setAttribute('aria-label',window.portfolioT('open_menu'));setGlyph(mobileToggle,'menu');if(focus)mobileToggle.focus()}
 themeToggle?.addEventListener('click',()=>themeMenu.hidden?openTheme():closeTheme(true));
 themeToggle?.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();openTheme(e.key==='ArrowUp')}});
 themeItems.forEach((item,i)=>{
  item.addEventListener('click',()=>{window.portfolioSetTheme(item.dataset.themeChoice);closeTheme(true)});
  item.addEventListener('keydown',e=>{
   let next;
   if(e.key==='ArrowDown')next=(i+1)%themeItems.length;
   if(e.key==='ArrowUp')next=(i-1+themeItems.length)%themeItems.length;
   if(e.key==='Home')next=0;if(e.key==='End')next=themeItems.length-1;
   if(next!==undefined){e.preventDefault();themeItems[next].focus()}
   if(e.key==='Escape'){e.preventDefault();closeTheme(true)}
   if(e.key==='Tab')closeTheme(true);
  });
 });
 mobileToggle?.addEventListener('click',()=>{
  const opening=mobileToggle.getAttribute('aria-expanded')!=='true';closeTheme();
  nav.classList.toggle('is-open',opening);mobileToggle.setAttribute('aria-expanded',String(opening));mobileToggle.setAttribute('aria-label',window.portfolioT(opening?'close_menu':'open_menu'));setGlyph(mobileToggle,opening?'close':'menu');
 });
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeNav()));
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('.theme-control'))closeTheme();if(!e.target.closest('.site-header'))closeNav()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(themeMenu&&!themeMenu.hidden)closeTheme(true);if(nav?.classList.contains('is-open'))closeNav(true)}});
 document.getElementById('language-toggle')?.addEventListener('click',()=>{closeTheme();closeNav()});
 const desktop=matchMedia('(min-width:761px)');desktop.addEventListener('change',e=>{if(e.matches)closeNav()});
 if(nav&&'IntersectionObserver' in window){
  const links=Array.from(nav.querySelectorAll('a'));
  const observer=new IntersectionObserver(entries=>{const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;links.forEach(a=>{if(a.getAttribute('href')==='#'+visible.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})},{rootMargin:'-15% 0px -45% 0px',threshold:[0,.1,.3,.5]});
  document.querySelectorAll('#work,#about,#experience').forEach(s=>observer.observe(s));
 }
})();

'use strict';
(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  let toastTimer;
  function toast(text) {
    const el = document.getElementById('toast');
    el.textContent = text; el.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 3500);
  }
  async function copy(text, success) {
    try { await navigator.clipboard.writeText(text); toast(success); }
    catch { toast('Please use the email link to contact me.'); }
  }
  document.getElementById('copy-email').addEventListener('click', () => copy('omar.owais.dev@gmail.com', 'Email copied. Let’s build something.'));
  document.getElementById('share-profile').addEventListener('click', async () => {
    const data = {title: 'Omar Ahmed — Software Engineer', text: 'Backend & full-stack development with Node.js, NestJS, and TypeScript.', url: 'https://omarahmedowais.github.io/'};
    if (navigator.share) { try { await navigator.share(data); } catch (e) { if (e.name !== 'AbortError') await copy(data.url, 'Portfolio link copied.'); } }
    else await copy(data.url, 'Portfolio link copied.');
  });
  const dialog = document.getElementById('preview-dialog');
  let previewTrigger;
  document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => {
    previewTrigger = button;
    const image = document.getElementById('preview-image'); image.src = button.dataset.preview; image.alt = button.dataset.title + ' public website screenshot';
    document.getElementById('preview-title').textContent = button.dataset.title + ' — public website';
    dialog.showModal();
  }));
  document.getElementById('close-preview').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { if (previewTrigger) previewTrigger.focus(); });
  const id = window.PORTFOLIO_CONFIG?.ga4MeasurementId || '';
  if (!/^G-[A-Z0-9]+$/.test(id)) return;
  const banner = document.getElementById('consent-banner');
  const settings = document.getElementById('analytics-settings');
  settings.hidden = false;
  const storageKey = 'omar-analytics-consent';
  const readChoice = () => { try { return localStorage.getItem(storageKey); } catch { return null; } };
  let choice = readChoice(); let loaded = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){window.dataLayer.push(arguments);};
  window['ga-disable-' + id] = true;
  window.gtag('consent', 'default', {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  function loadAnalytics() {
    window['ga-disable-' + id] = false;
    window.gtag('consent', 'update', {analytics_storage:'granted'});
    if (loaded) return;
    loaded = true;
    const tag = document.createElement('script'); tag.async = true; tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id); document.head.appendChild(tag);
    window.gtag('js', new Date());
    window.gtag('config', id, {send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:'https://omarahmedowais.github.io/',page_referrer:document.referrer ? new URL(document.referrer).origin : ''});
    window.gtag('event', 'page_view', {page_title:document.title,page_location:'https://omarahmedowais.github.io/'});
  }
  function clearCookies() {
    document.cookie.split(';').forEach(c => {
      const name = c.trim().split('=')[0];
      if (name === '_ga' || name.startsWith('_ga_')) {
        document.cookie = name + '=; Max-Age=0; path=/';
        document.cookie = name + '=; Max-Age=0; path=/; domain=' + location.hostname;
      }
    });
  }
  function setChoice(value) {
    choice = value; try { localStorage.setItem(storageKey, value); } catch {}
    banner.hidden = true;
    if (value === 'accepted') loadAnalytics();
    else { window['ga-disable-' + id] = true; window.gtag('consent','update',{analytics_storage:'denied'}); clearCookies(); if (loaded) location.reload(); }
  }
  document.getElementById('accept-analytics').addEventListener('click', () => setChoice('accepted'));
  document.getElementById('reject-analytics').addEventListener('click', () => setChoice('rejected'));
  settings.addEventListener('click', () => { banner.hidden = false; document.getElementById('reject-analytics').focus(); });
  if (choice === 'accepted') loadAnalytics(); else if (choice !== 'rejected') banner.hidden = false;
  function event(name, params = {}) { if (choice === 'accepted' && loaded) window.gtag('event', name, params); }
  document.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (a.hasAttribute('download') && a.href.endsWith('.pdf')) event('resume_download');
    else if (a.dataset.event) event(a.dataset.event, a.dataset.project ? {project:a.dataset.project} : {});
    else if (a.href.startsWith('mailto:')) event('contact_email');
    else if (a.href.includes('linkedin.com/in/')) event('linkedin_connect');
  }));
  document.getElementById('copy-email').addEventListener('click', () => event('copy_email'));
  document.querySelectorAll('.case-details').forEach((el,i) => el.addEventListener('toggle', () => { if (el.open) event('project_details', {project:['edumarket','spark','views','jam3ty'][i]}); }));
  document.querySelectorAll('[data-preview]').forEach(el => el.addEventListener('click', () => event('project_preview', {project:el.dataset.title.toLowerCase()})));
})();

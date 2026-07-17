/**
 * components.js — Unico punto di definizione per nav, footer e bottone back-to-top.
 * Ogni pagina HTML ha placeholder #site-nav, #site-footer, #site-btt
 * e un attributo data-page sul <body> per evidenziare il link attivo.
 */
(function () {

  /* ===================== NAV ===================== */
  var NAV_HTML = '\
<nav class="bg-surface border-b border-outline-variant fixed top-0 w-full z-50">\
  <div class="flex justify-between items-center px-sm md:px-lg py-sm max-w-container-max mx-auto">\
    <a class="font-headline-md text-headline-md font-bold text-primary cursor-pointer flex items-center gap-2" href="index.html">\
      <span class="icon-svg text-2xl"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg></span>\
      <span class="hidden sm:inline">Astrofili Teatini</span>\
      <span class="sm:hidden">AAT</span>\
    </a>\
    <div class="hidden md:flex gap-md items-center font-label-md text-label-md">\
      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-200" data-nav-page="chi-siamo" href="chi-siamo.html">Chi Siamo</a>\
      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-200" data-nav-page="siti-osservativi" href="siti-osservativi.html">Siti Osservativi</a>\
      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-200" data-nav-page="contatti" href="contatti.html">Contatti</a>\
      <a class="bg-primary text-on-primary px-4 py-2 rounded font-label-md hover:brightness-110 transition-all duration-200" href="iscrizione.html">Diventa Socio</a>\
    </div>\
    <button class="md:hidden text-primary" id="mobile-menu-toggle" aria-label="Apri menu" type="button">\
      <span class="icon-svg text-3xl" id="mobile-menu-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg></span>\
    </button>\
  </div>\
  <div id="mobile-menu" class="md:hidden bg-surface border-t border-outline-variant">\
    <div class="flex flex-col px-sm md:px-lg py-md space-y-md">\
      <a class="font-label-md text-on-surface-variant hover:text-primary" data-nav-page="chi-siamo" href="chi-siamo.html">Chi Siamo</a>\
      <a class="font-label-md text-on-surface-variant hover:text-primary" data-nav-page="siti-osservativi" href="siti-osservativi.html">Siti Osservativi</a>\
      <a class="font-label-md text-on-surface-variant hover:text-primary" data-nav-page="contatti" href="contatti.html">Contatti</a>\
      <a class="bg-primary text-on-primary px-4 py-2 rounded font-label-md text-center" href="iscrizione.html">Diventa Socio</a>\
    </div>\
  </div>\
</nav>';

  /* ===================== FOOTER ===================== */
  var FOOTER_HTML = '\
<footer class="bg-surface-container w-full py-lg md:py-xl px-sm md:px-lg">\
  <div class="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-lg border-t border-surface-container-high pt-xl">\
    <div class="md:col-span-2">\
      <div class="font-headline-sm text-headline-sm font-semibold text-on-surface mb-md flex items-center gap-2">\
        <span class="icon-svg text-primary"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg></span>\
        Associazione Astrofili Teatini\
      </div>\
      <p class="font-body-md text-body-md text-on-surface-variant mb-md">\
        Esploriamo il cosmo da Chieti. Osservazione, ricerca e divulgazione astronomica dal cuore dell\'Abruzzo dal 1974.\
      </p>\
      <p class="font-body-md text-body-md text-on-surface-variant">\
        Via Papa Giovanni XXIII 83, 66100 Chieti (CH)\
      </p>\
    </div>\
    <div>\
      <h4 class="font-label-md text-label-md text-on-surface mb-sm uppercase tracking-wider">Navigazione</h4>\
      <ul class="space-y-2 font-body-md text-body-md text-on-surface-variant">\
        <li><a class="hover:text-primary transition-colors" href="chi-siamo.html">Chi Siamo</a></li>\
        <li><a class="hover:text-primary transition-colors" href="siti-osservativi.html">Siti Osservativi</a></li>\
      </ul>\
    </div>\
    <div>\
      <h4 class="font-label-md text-label-md text-on-surface mb-sm uppercase tracking-wider">Link Utili</h4>\
      <ul class="space-y-2 font-body-md text-body-md text-on-surface-variant">\
        <li><a class="hover:text-primary transition-colors" href="contatti.html">Contatti</a></li>\
        <li><a class="hover:text-primary transition-colors" href="iscrizione.html">Diventa Socio</a></li>\
      </ul>\
    </div>\
  </div>\
  <div class="max-w-container-max mx-auto pt-lg border-t border-surface-container-high mt-lg flex flex-col md:flex-row justify-between items-center gap-md">\
    <p class="font-label-sm text-label-sm text-on-surface-variant text-center md:text-left">\
      &copy; 2026 Associazione Astrofili Teatini. Chieti, Italy. C.F. 93012380692\
    </p>\
    <p class="font-label-sm text-label-sm text-on-surface-variant text-center md:text-right">\
      Sviluppo a cura di <a href="https://ft2801.github.io/Portfolio" style="text-decoration:underline" class="hover:text-primary transition-colors">Fabio Tempera</a>\
    </p>\
  </div>\
</footer>';

  /* ===================== BACK TO TOP ===================== */
  var BTT_HTML = '\
<button id="back-to-top" class="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-on-primary shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 flex items-center justify-center hover:brightness-110" aria-label="Torna su" type="button">\
  <span class="icon-svg"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 5.41V21c0 .55-.45 1-1 1s-1-.45-1-1V5.41l-5.29 5.3c-.39.39-1.02.39-1.42 0a.996.996 0 0 1 0-1.41l7-7a.996.996 0 0 1 1.41 0l7 7c.39.39.39 1.02 0 1.41s-1.02.39-1.42 0L13 5.41z"/></svg></span>\
</button>';

  /* ===================== INJECTION ===================== */
  var siteNav    = document.getElementById('site-nav');
  var siteFooter = document.getElementById('site-footer');
  var siteBtt    = document.getElementById('site-btt');

  if (siteNav)    siteNav.outerHTML    = NAV_HTML;
  if (siteFooter) siteFooter.outerHTML = FOOTER_HTML;
  if (siteBtt)    siteBtt.outerHTML    = BTT_HTML;

  /* ===================== ACTIVE NAV LINK ===================== */
  var currentPage = document.body.getAttribute('data-page');
  if (currentPage) {
    document.querySelectorAll('[data-nav-page="' + currentPage + '"]').forEach(function (el) {
      el.classList.add('text-primary');
    });
  }

})();

/* Portal público de sistemas · Plásticos Carmen
   Sin backend: sólo el tema, el saludo y el buscador de tarjetas. */
(function () {
  'use strict';
  var raiz = document.documentElement;

  /* ---------- Apariencia: claro → oscuro → según el sistema ---------- */
  var ORDEN = ['claro', 'oscuro', 'sistema'];
  var ETIQUETA = {claro: 'claro', oscuro: 'oscuro', sistema: 'según el sistema'};
  function aplicar(pref) {
    raiz.dataset.temaPref = pref;
    var oscuro = pref === 'oscuro' ||
      (pref === 'sistema' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    raiz.dataset.tema = oscuro ? 'oscuro' : 'claro';
    var b = document.getElementById('btnTema');
    if (b) {
      b.title = 'Apariencia: ' + ETIQUETA[pref];
      b.setAttribute('aria-label', 'Cambiar apariencia (ahora: ' + ETIQUETA[pref] + ')');
    }
    try { localStorage.setItem('pc-tema', pref); } catch (e) {}
  }
  var btn = document.getElementById('btnTema');
  if (btn) {
    btn.addEventListener('click', function () {
      var i = ORDEN.indexOf(raiz.dataset.temaPref || 'sistema');
      aplicar(ORDEN[(i + 1) % ORDEN.length]);
    });
    aplicar(raiz.dataset.temaPref || 'sistema');
  }
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var alCambiar = function () { if ((raiz.dataset.temaPref || 'sistema') === 'sistema') aplicar('sistema'); };
    if (mq.addEventListener) mq.addEventListener('change', alCambiar);
    else if (mq.addListener) mq.addListener(alCambiar);
  }

  /* ---------- Fecha y saludo ---------- */
  var f = new Date();
  var fecha = document.getElementById('fecha');
  if (fecha) {
    try { fecha.textContent = f.toLocaleDateString('es-BO', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}); }
    catch (e) { fecha.textContent = f.toLocaleDateString(); }
  }
  var sal = document.getElementById('saludo');
  if (sal) {
    var h = f.getHours();
    sal.textContent = h < 12 ? 'Buenos días' : (h < 19 ? 'Buenas tardes' : 'Buenas noches');
  }
  var n = document.querySelectorAll('.mosaico [data-tarjeta]').length;
  var nA = document.getElementById('nAccesos');
  if (nA) nA.textContent = String(n);
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = String(f.getFullYear());

  /* ---------- Buscador ---------- */
  var caja = document.getElementById('buscar-tarjetas');
  var vacio = document.getElementById('sin-resultados');
  if (caja) {
    caja.addEventListener('input', function () {
      var q = caja.value.trim().toLowerCase();
      var vistas = 0;
      Array.prototype.forEach.call(document.querySelectorAll('[data-tarjeta]'), function (t) {
        var ok = !q || (t.dataset.buscar || '').indexOf(q) >= 0 ||
          (t.textContent || '').toLowerCase().indexOf(q) >= 0;
        t.hidden = !ok;
        if (ok) vistas++;
      });
      /* un mosaico sin resultados se esconde entero */
      Array.prototype.forEach.call(document.querySelectorAll('.mosaico'), function (m) {
        var quedan = m.querySelectorAll('[data-tarjeta]:not([hidden])').length;
        m.hidden = q && !quedan;
        if (q && quedan) m.open = true;
      });
      Array.prototype.forEach.call(document.querySelectorAll('.seccion'), function (s) {
        s.hidden = q && !s.querySelectorAll('[data-tarjeta]:not([hidden])').length;
      });
      if (vacio) vacio.hidden = !q || vistas > 0;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== caja &&
          !/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName || '')) {
        e.preventDefault(); caja.focus();
      }
    });
  }
})();

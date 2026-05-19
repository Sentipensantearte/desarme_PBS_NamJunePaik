/*
  ══════════════════════════════════════════════════════════════
  MAIN.JS — Lógica de la instalación
  PBS (1963–2000) · Nam June Paik

  Este archivo maneja SOLO la interacción:
  mostrar/ocultar pantallas, abrir/cerrar el visor, navegar canales.

  El contenido editorial (textos, imágenes) está en index.html.
  No hace falta modificar este archivo para editar el contenido.
  ══════════════════════════════════════════════════════════════
*/


/* ──────────────────────────────────────────────────────────────
   VARIABLES DE ESTADO
   indice-canal-abierto → qué canal está visible en el visor
   canales              → lista de todos los articles.canal del HTML
   mural-construido     → evita que buildMural corra más de una vez
   ────────────────────────────────────────────────────────────── */
let indiceCanalAbierto = 0;
let muralConstruido    = false;

/* Lee todos los <article class="canal"> del HTML al cargar la página */
const canales = Array.from(document.querySelectorAll('#canales .canal'));


/* ══════════════════════════════════════════════════════════════
   construirMural()
   Genera las tarjetas de monitor en la grilla leyendo los datos
   de cada <article class="canal"> en el HTML.

   Lee los atributos data-* de cada article:
     data-numero   → número de canal
     data-etiqueta → título de la tarjeta
     data-resumen  → texto de preview
     data-visual   → "si" para mostrar la imagen de fondo
     data-posicion → recorte de la imagen (CSS background-position)
══════════════════════════════════════════════════════════════ */
function construirMural() {
  if (muralConstruido) return; /* no construir dos veces */

  const grilla = document.getElementById('grilla-canales');

  canales.forEach((canal, indice) => {

    /* Lee los atributos del article */
    const numero   = canal.dataset.numero   || String(indice + 1).padStart(2, '0');
    const etiqueta = canal.dataset.etiqueta || 'Canal';
    const resumen  = canal.dataset.resumen  || '';
    const tieneImg = canal.dataset.visual   === 'si';
    const posicion = canal.dataset.posicion || 'center center';

    /* Crea el botón del monitor */
    const monitor = document.createElement('button');
    monitor.type      = 'button';
    monitor.className = `monitor${tieneImg ? ' monitor-visual' : ''}`;
    monitor.setAttribute('aria-label', `Abrir canal ${numero}: ${etiqueta}`);

    monitor.innerHTML = `
      <span class="pantalla-monitor">

        ${tieneImg
          /* Si tiene imagen: capa de fondo con el recorte indicado */
          ? `<span class="monitor-foto"
                   style="background-position: ${posicion}"
                   aria-hidden="true"></span>`
          : ''
        }

        <span class="contenido-monitor">
          <span class="monitor-canal">Canal ${numero}</span>
          <span class="monitor-etiqueta">${etiqueta}</span>
          <span class="monitor-resumen">${resumen}</span>
        </span>

      </span>
    `;

    /* Al hacer click abre ese canal en el visor */
    monitor.addEventListener('click', () => abrirCanal(indice));

    grilla.appendChild(monitor);
  });

  muralConstruido = true;
}


/* ══════════════════════════════════════════════════════════════
   entrarAlMural()
   Oculta la pantalla de inicio y muestra la grilla de monitores.
   Se llama desde el onclick del botón "Sintonizá" en index.html.
══════════════════════════════════════════════════════════════ */
function entrarAlMural() {
  const inicio = document.getElementById('pantalla-inicio');
  const mural  = document.getElementById('mural-monitores');

  /* Añade clase para el fade-out (definido en styles.css) */
  inicio.classList.add('oculta');

  /* Muestra el mural y construye las tarjetas */
  mural.classList.add('visible');
  construirMural();

  /* Espera a que termine la transición y oculta el inicio del DOM */
  setTimeout(() => {
    inicio.style.display = 'none';
  }, 360);
}


/* ══════════════════════════════════════════════════════════════
   abrirCanal(indice)
   Copia el contenido del canal al visor y lo muestra.
   'indice' es la posición del canal en el array (empieza en 0).
══════════════════════════════════════════════════════════════ */
function abrirCanal(indice) {
  indiceCanalAbierto = indice;

  const canal       = canales[indice];
  const visor       = document.getElementById('visor-canal');
  const areaConten  = document.getElementById('contenido-canal');
  const idVisor     = document.getElementById('visor-canal-id');

  /* Actualiza la etiqueta de la barra superior */
  const numero   = canal.dataset.numero   || String(indice + 1).padStart(2, '0');
  const etiqueta = canal.dataset.etiqueta || 'Canal';
  idVisor.textContent = `Canal ${numero} · ${etiqueta}`;

  /* Copia el HTML del canal al área del visor
     cloneNode(true) copia el nodo con todo su contenido */
  areaConten.innerHTML = '';
  areaConten.appendChild(canal.cloneNode(true));

  /* Muestra el visor */
  visor.classList.add('abierto');
  visor.setAttribute('aria-hidden', 'false');

  /* Vuelve el scroll al inicio */
  document.querySelector('.visor-pantalla').scrollTop = 0;
}


/* ══════════════════════════════════════════════════════════════
   cerrarVisor()
   Oculta el visor expandido.
   Se llama desde el botón cerrar y desde la tecla Escape.
══════════════════════════════════════════════════════════════ */
function cerrarVisor() {
  const visor = document.getElementById('visor-canal');
  visor.classList.remove('abierto');
  visor.setAttribute('aria-hidden', 'true');
}


/* ══════════════════════════════════════════════════════════════
   navegarCanal(direccion)
   Pasa al canal anterior (-1) o siguiente (1).
   Si está en el último, vuelve al primero (es circular).
══════════════════════════════════════════════════════════════ */
function navegarCanal(direccion) {
  /* Solo navega si el visor está abierto */
  const visorAbierto = document.getElementById('visor-canal').classList.contains('abierto');
  if (!visorAbierto) return;

  /* Módulo para que sea circular */
  indiceCanalAbierto = (indiceCanalAbierto + direccion + canales.length) % canales.length;
  abrirCanal(indiceCanalAbierto);
}


/* ══════════════════════════════════════════════════════════════
   EVENTOS GLOBALES
══════════════════════════════════════════════════════════════ */

/* Teclado */
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape')      cerrarVisor();       /* Esc → cerrar  */
  if (evento.key === 'ArrowRight')  navegarCanal(1);     /* →   → siguiente */
  if (evento.key === 'ArrowLeft')   navegarCanal(-1);    /* ←   → anterior  */
});

/* Click en el fondo oscuro (fuera del marco del visor) → cerrar */
document.getElementById('visor-canal').addEventListener('click', function(evento) {
  if (evento.target === this) cerrarVisor();
});


/* ══════════════════════════════════════════════════════════════
   Expone las funciones que usa el HTML (onclick="...")
   Necesario porque los scripts se cargan al final del body.
══════════════════════════════════════════════════════════════ */
window.entrarAlMural  = entrarAlMural;
window.cerrarVisor    = cerrarVisor;
window.navegarCanal   = navegarCanal;

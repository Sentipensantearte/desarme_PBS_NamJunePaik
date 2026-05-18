/* ================================================================
   MAIN.JS — Lógica de la instalación
   PBS (1963–2000) · Nam June Paik
   ================================================================
   
   ÍNDICE DE FUNCIONES:
   1.  initNoise()      → estática animada de fondo (canvas global)
   2.  initGlyphs()     → glifos flotantes en el fondo
   3.  makeNoise()      → estática individual por monitor
   4.  buildStage()     → construye la grilla de monitores
   5.  enterStage()     → transición intro → mural
   6.  openLb()         → abre el lightbox con un canal
   7.  closeLb()        → cierra el lightbox
   8.  navLb()          → navega entre canales
   9.  Eventos globales → teclado, click fuera del lightbox
   ================================================================ */


/* ════════════════════════════════════════════════════════════════
   1. RUIDO DE FONDO GLOBAL
   Rellena el canvas #noise con píxeles blancos aleatorios.
   La opacidad del canvas se controla en CSS → #noise { opacity }
   
   Para eliminar el ruido: comentá initNoise() al final del archivo
   Para cambiar velocidad: el requestAnimationFrame corre a 60fps,
   podés throttlearlo con un contador si querés animación más lenta.
════════════════════════════════════════════════════════════════ */
function initNoise() {
  const canvas = document.getElementById('noise');
  const ctx    = canvas.getContext('2d');

  /* Ajusta el canvas al tamaño de la ventana */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /* Dibuja un frame de píxeles aleatorios */
  function draw() {
    const img  = ctx.createImageData(canvas.width, canvas.height);
    const data = img.data;

    for (let i = 0; i < data.length; i += 4) {
      const v    = Math.random() * 255 | 0;  /* valor aleatorio 0–255 */
      data[i]   = v;   /* rojo   */
      data[i+1] = v;   /* verde  */
      data[i+2] = v;   /* azul   */
      data[i+3] = 255; /* alfa   */
    }

    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(draw); /* loop */
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}


/* ════════════════════════════════════════════════════════════════
   2. GLIFOS FLOTANTES DE FONDO
   Crea spans con caracteres de escrituras antiguas que suben
   desde abajo animados con CSS (keyframe glyphrise en styles.css).
   
   Para cambiar los caracteres: editá el array 'chars'
   Para cambiar la cantidad: modificá el número en el for (22)
   Para cambiar velocidad: los valores min/max en animationDuration
════════════════════════════════════════════════════════════════ */
function initGlyphs() {
  /* Caracteres de distintos sistemas de escritura antigua
     (los mismos que aparecen en el neón de la obra de Paik) */
  const chars = [
    '𓀀','𓂀','𒀭','𒀀',  /* jeroglíficos egipcios y cuneiforme sumerio */
    '한','ब्',            /* coreano y devanagari (Brahmi) */
    '◈','✦','⊞','◉',    /* símbolos geométricos */
    '𓃀','ᚠ','ᚱ',         /* más jeroglíficos y runas */
    '𓅓','𓆣'              /* jeroglíficos adicionales */
  ];

  const wrap = document.getElementById('glyphs');

  for (let i = 0; i < 22; i++) {         /* ← cambiá 22 para más/menos glifos */
    const el = document.createElement('span');
    el.className   = 'glyph';
    el.textContent = chars[Math.floor(Math.random() * chars.length)];

    /* Posición horizontal aleatoria */
    el.style.left = Math.random() * 100 + '%';

    /* Duración aleatoria entre 22 y 48 segundos
       Valores más bajos = sube más rápido */
    el.style.animationDuration = (22 + Math.random() * 26) + 's';

    /* Delay negativo para que no arranquen todos al mismo tiempo */
    el.style.animationDelay = (-Math.random() * 25) + 's';

    wrap.appendChild(el);
  }
}


/* ════════════════════════════════════════════════════════════════
   3. RUIDO INDIVIDUAL POR MONITOR
   Cada tarjeta-televisor tiene su propio canvas de estática.
   Funciona igual que initNoise() pero en tamaño pequeño (80×60px)
   para no ser costoso en performance.
   
   Para desactivar la estática en los monitores:
   comentá la llamada makeNoise(...) dentro de buildStage()
════════════════════════════════════════════════════════════════ */
function makeNoise(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width  = 80;   /* resolución baja intencional */
  canvas.height = 60;

  function draw() {
    const img  = ctx.createImageData(80, 60);
    const data = img.data;

    for (let i = 0; i < data.length; i += 4) {
      const v    = Math.random() * 255 | 0;
      data[i]   = v;
      data[i+1] = v;
      data[i+2] = v;
      data[i+3] = 255;
    }

    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(draw);
  }

  draw();
}


/* ════════════════════════════════════════════════════════════════
   4. CONSTRUCCIÓN DEL MURAL (buildStage)
   Crea los 9 monitores y los posiciona en el stage.
   Los datos de cada monitor vienen de CH[] en data.js.
   
   AJUSTE DE LA GRILLA:
   - cols / rows     → número de columnas y filas
   - pad.x / pad.y   → margen exterior del mural
   - gap.x / gap.y   → espacio entre monitores
   
   AJUSTE DE POSICIÓN ORGÁNICA:
   El array 'nudge' define desplazamientos y rotaciones
   leves para cada monitor (índice 0–8).
   {dx, dy} → desplazamiento en píxeles
   {r}      → rotación en grados
════════════════════════════════════════════════════════════════ */
function buildStage() {
  const stage = document.getElementById('stage');
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  /* ── Configuración de la grilla ── */
  const cols = 3;   /* columnas */
  const rows = 3;   /* filas    */
  const pad  = { x: 80, y: 70 };   /* margen exterior (px) */
  const gap  = { x: 28, y: 24 };   /* separación entre monitores (px) */

  /* Tamaño de cada monitor calculado para llenar el espacio disponible */
  const usable = {
    w: vw - pad.x * 2,
    h: vh - pad.y * 2
  };
  const mw = Math.floor((usable.w - (cols - 1) * gap.x) / cols);
  const mh = Math.floor(mw * 3 / 4) + 24; /* pantalla 4:3 + footer del bisel */

  /* ── Desplazamientos orgánicos por monitor ──
     Para que no parezca una grilla perfecta.
     Índice 0 = primer monitor (arriba-izquierda).
     Si agregás más canales, extendé este array. */
  const nudge = [
    { dx: -6,  dy: -8,  r: -1.2 },   /* monitor 0 */
    { dx:  4,  dy: -5,  r:  0.6 },   /* monitor 1 */
    { dx:  8,  dy: -9,  r: -1.8 },   /* monitor 2 */
    { dx: -10, dy:  3,  r:  0.8 },   /* monitor 3 */
    { dx:  0,  dy:  0,  r:  0.0 },   /* monitor 4 (centro, sin nudge) */
    { dx:  7,  dy:  4,  r: -1.0 },   /* monitor 5 */
    { dx: -5,  dy:  8,  r:  1.5 },   /* monitor 6 */
    { dx:  3,  dy: 10,  r: -0.7 },   /* monitor 7 */
    { dx:  9,  dy:  7,  r:  1.1 }    /* monitor 8 */
  ];

  /* ── Crear cada monitor ── */
  CH.forEach((ch, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    /* Posición base en la grilla + nudge */
    const bx = pad.x + col * (mw + gap.x) + (nudge[i]?.dx || 0);
    const by = pad.y + row * (mh + gap.y) + (nudge[i]?.dy || 0);

    /* ── Crear el elemento DOM del monitor ── */
    const mon = document.createElement('div');
    mon.className = 'mon' + (ch.glitch ? ' glitch' : '');
    mon.style.cssText = `
      left:  ${bx}px;
      top:   ${by}px;
      width: ${mw}px;
      transform: rotate(${nudge[i]?.r || 0}deg);
    `;

    /* Altura de la pantalla (relación 4:3) */
    const sh = mw * 0.75;

    /* HTML interno del monitor */
    mon.innerHTML = `
      <div class="bezel">
        <div class="screen" style="height:${sh}px; aspect-ratio:unset">

          <!-- Canvas de estática individual -->
          <canvas class="mon-noise" style="width:100%; height:100%;"></canvas>

          <!-- Contenido visible en la pantalla pequeña -->
          <div class="screen-inner" style="position:absolute; inset:0">
            <p class="m-ch">CANAL ${ch.num}</p>
            <p class="m-label" style="font-size:${Math.max(14, mw * 0.072)}px">
              ${ch.label.replace('\n', '<br>')}
            </p>
            <p class="m-peek" style="font-size:${Math.max(7, mw * 0.033)}px">
              ${ch.peek}
            </p>
          </div>

        </div><!-- /.screen -->
        <div class="bezel-foot">
          <span class="brand">NJN · PAIK · ${ch.num}</span>
          <span class="led"></span>
        </div>
      </div><!-- /.bezel -->
    `;

    /* Click → abrir el canal en el lightbox */
    mon.addEventListener('click', () => openLb(i));

    stage.appendChild(mon);

    /* ── Animación de entrada escalonada ──
       Cada monitor aparece con un retraso de 80ms entre sí */
    mon.style.opacity   = '0';
    mon.style.transform = `rotate(${nudge[i]?.r || 0}deg) scale(.9)`;

    setTimeout(() => {
      mon.style.transition = 'opacity .45s ease, transform .45s ease';
      mon.style.opacity    = '1';
      mon.style.transform  = `rotate(${nudge[i]?.r || 0}deg) scale(1)`;
    }, 100 + i * 80);   /* ← cambiá 80 para más/menos retraso entre monitores */

    /* Activar ruido del canvas de ese monitor */
    makeNoise(mon.querySelector('.mon-noise'));
  });
}


/* ════════════════════════════════════════════════════════════════
   5. TRANSICIÓN INTRO → MURAL
   Se llama desde el botón "Sintonizar" en index.html.
════════════════════════════════════════════════════════════════ */
function enterStage() {
  const intro = document.getElementById('intro');

  /* Agregar clase que dispara la animación fadeOut del CSS */
  intro.classList.add('hide');

  /* Esperar a que termine el fade (800ms) y mostrar el stage */
  setTimeout(() => {
    intro.style.display = 'none';
    const stage = document.getElementById('stage');
    stage.style.display = 'block';
    buildStage();
  }, 850);
}


/* ════════════════════════════════════════════════════════════════
   6. ABRIR LIGHTBOX
   Carga el contenido del canal i y muestra el lightbox.
════════════════════════════════════════════════════════════════ */

let lbIdx = 0; /* índice del canal actualmente abierto */

function openLb(i) {
  lbIdx = i;
  const ch = CH[i];

  /* Actualizar la etiqueta de la barra superior */
  document.getElementById('lb-id').textContent =
    `CANAL ${ch.num} · ${ch.label.replace('\n', ' ')}`;

  /* Inyectar el HTML del canal (definido en data.js) */
  const content = document.getElementById('lb-content');
  content.innerHTML = ch.html();

  /* Mostrar el lightbox */
  document.getElementById('lightbox').classList.add('open');

  /* Volver el scroll al inicio */
  document.querySelector('.lb-screen').scrollTop = 0;
}


/* ════════════════════════════════════════════════════════════════
   7. CERRAR LIGHTBOX
════════════════════════════════════════════════════════════════ */
function closeLb() {
  document.getElementById('lightbox').classList.remove('open');
}


/* ════════════════════════════════════════════════════════════════
   8. NAVEGAR ENTRE CANALES
   dir = 1 → siguiente canal
   dir = -1 → canal anterior
   El módulo (%) hace que sea circular (del último vuelve al primero)
════════════════════════════════════════════════════════════════ */
function navLb(dir) {
  lbIdx = (lbIdx + dir + CH.length) % CH.length;
  openLb(lbIdx);
}


/* ════════════════════════════════════════════════════════════════
   9. EVENTOS GLOBALES
════════════════════════════════════════════════════════════════ */

/* Teclado */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape')      closeLb();       /* Esc  → cerrar */
  if (e.key === 'ArrowRight')  navLb(1);        /* →    → siguiente */
  if (e.key === 'ArrowLeft')   navLb(-1);       /* ←    → anterior */
});

/* Click en el fondo oscuro del lightbox (fuera del panel) → cerrar */
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLb();
});


/* ════════════════════════════════════════════════════════════════
   INICIALIZACIÓN
   Se ejecuta cuando el DOM está listo.
   initNoise() y initGlyphs() arrancan inmediatamente.
   buildStage() se llama después, cuando el usuario entra.
════════════════════════════════════════════════════════════════ */
initNoise();
initGlyphs();

/* ================================================================
   DATA.JS — Contenido editorial de los 9 canales
   PBS (1963–2000) · Nam June Paik
   ================================================================
   
   Este archivo define el array CH (channels).
   Cada objeto representa un monitor / canal de la instalación.
   
   ESTRUCTURA DE CADA CANAL:
   {
     num:    '01'       → número visible en pantalla
     label:  'TÍTULO'   → etiqueta del monitor (acepta \n para salto)
     color:  null       → acento de color: null | 'teal' | 'purple' | 'coral'
     glitch: false      → true activa el efecto glitch en el label
     peek:   '...'      → texto de preview visible en el monitor pequeño
     html:   () => `...`→ función que devuelve el HTML del canal expandido
   }
   
   CLASES CSS DISPONIBLES EN html():
     .c-kicker   → texto pequeño en mayúsculas (encabezado de sección)
     .c-h1       → título grande display
     .c-h1-sub   → subtítulo debajo del h1
     .c-h2       → título de sección
     .c-rule     → línea separadora
     .c-body     → bloque de texto corrido (wrapeá párrafos en <p>)
     .meta-grid  → grilla de dos columnas para metadatos
     .stat-row   → fila de estadísticas con números grandes
     .hip        → caja de hipótesis (borde ámbar)
     .pri .tl/.pu/.co → tarjeta de principio teórico (teal/purple/coral)
     .cita       → bloque de cita bibliográfica
     .fase-strip → franja de fases de Foglia
     .rlink      → link de recurso con ícono
     .bib        → ítem bibliográfico
     .decor      → canal de cierre decorativo
   
   PARA AGREGAR UN CANAL: copiá un objeto del array y modificalo.
   PARA REORDENAR: simplemente cambiá el orden en el array.
   ================================================================ */

const CH = [

  /* ══════════════════════════════════════
     CANAL 01 — Ficha técnica
  ══════════════════════════════════════ */
  {
    num:    '01',
    label:  'FICHA\nTÉCNICA',
    color:  null,
    glitch: false,
    peek:   'Nam June Paik · PBS (1963–2000) · Escultura/instalación pública · NJN Building, Trenton, NJ · 1992–1993 · 52 monitores · neón · 6×3.6m por panel.',
    html: () => `
      <p class="c-kicker">ARTE DIGITAL APLICADO · TRABAJO PRÁCTICO 1</p>
      <h1 class="c-h1">PBS</h1>
      <p class="c-h1-sub">(1963 – 2000)</p>

      <!-- Grilla de metadatos: dos columnas
           Cada .m-row tiene un .ml (label) y un .mv (valor) -->
      <div class="meta-grid" style="margin-top:1.25rem">
        <div class="m-row"><span class="ml">ARTISTA</span><span class="mv">Nam June Paik (1932–2006)</span></div>
        <div class="m-row"><span class="ml">AÑO</span><span class="mv">Encargada 1992 · Instalada 1993</span></div>
        <div class="m-row"><span class="ml">TIPO</span><span class="mv">Escultura / instalación pública</span></div>
        <div class="m-row"><span class="ml">UBICACIÓN</span><span class="mv">NJN Building, Trenton, New Jersey</span></div>
        <div class="m-row"><span class="ml">COMITENTE</span><span class="mv">New Jersey Arts Inclusion Program</span></div>
        <div class="m-row"><span class="ml">COLECCIÓN</span><span class="mv">Estado de Nueva Jersey</span></div>
        <div class="m-row"><span class="ml">RESTAURACIÓN</span><span class="mv">2018–2019 · Artworks Trenton</span></div>
        <div class="m-row"><span class="ml">MOVIMIENTO</span><span class="mv">Videoarte · Fluxus</span></div>
      </div>

      <!-- Fila de estadísticas grandes -->
      <div class="stat-row">
        <div class="stat">
          <span class="stat-v">2</span>
          <span class="stat-l">PANELES</span>
        </div>
        <div class="stat">
          <span class="stat-v">52</span>
          <span class="stat-l">MONITORES 20"</span>
        </div>
        <div class="stat">
          <span class="stat-v" style="font-size:20px">6×3.6m</span>
          <span class="stat-l">CADA PANEL</span>
        </div>
        <div class="stat">
          <span class="stat-v" style="font-size:16px">∞ escrituras</span>
          <span class="stat-l">NEÓN</span>
        </div>
      </div>

      <hr class="c-rule" style="margin-top:1.25rem">
      <p class="c-kicker" style="margin-top:1.1rem">SOBRE EL TÍTULO</p>
      <div class="c-body">
        <p>Las fechas <strong>1963–2000</strong> no son biográficas:
        señalan el arco histórico de la televisión pública norteamericana
        —desde los primeros experimentos con Educational TV hasta el fin del
        siglo analógico— y el período en que Paik mismo trabajó con televisores
        como material artístico. El título es un argumento: la obra
        <em>es</em> la historia del medio que la aloja.</p>
      </div>
    `
  },

  /* ══════════════════════════════════════
     CANAL 02 — Síntesis descriptiva
  ══════════════════════════════════════ */
  {
    num:    '02',
    label:  'SÍNTESIS',
    color:  null,
    glitch: false,
    peek:   'Dos paneles murales de 6×3.6m con 52 monitores y neón. Material de NJN, videoarte de Paik, Cage, Beuys, Bowie, Laurie Anderson, Merce Cunningham. Escrituras antiguas en neón. Apagada 2011. Restaurada 2019.',
    html: () => `
      <p class="c-kicker">CANAL 02 · SÍNTESIS</p>
      <h2 class="c-h2">La obra</h2>
      <div class="c-body">
        <p>Encargada en 1992 por el Programa de Inclusión en las Artes de
        New Jersey e instalada en 1993 en la sede de la cadena pública NJN,
        <em>PBS</em> consiste en dos paneles murales de <strong>6 por 3,6 metros</strong>
        cada uno, integrados en la fachada interior del edificio y visibles
        desde la calle a través del vidrio.</p>

        <p>Los monitores reproducen en bucle una edición creada por Paik con
        material de NJN, fragmentos de sus propias obras de videoarte y collages
        con <strong>John Cage, Joseph Beuys, David Bowie, Laurie Anderson y
        Merce Cunningham</strong>. Paik denominó estos collages
        <em>dancing patterns</em>. Las luces de neón forman signos de escrituras
        antiguas: <strong>jeroglíficos egipcios, pictogramas sumerios, escritura
        Brahmi y símbolos coreanos</strong>, mezclados con referencias a la
        historia local de Trenton como cuna del tubo de rayos catódicos (CRT)
        y el estándar NTSC.</p>

        <p>La obra también celebra la contribución de Trenton a la historia de
        las telecomunicaciones: los laboratorios <strong>Sarnoff/RCA</strong>,
        con sede en la región, desarrollaron el CRT y el estándar de color que
        hizo posible la televisión moderna.</p>
      </div>

      <h2 class="c-h2">Apagada y restaurada</h2>
      <div class="c-body">
        <p>Cuando el Estado cerró el edificio NJN en 2011, la obra quedó apagada.
        Una obra que depende de procesos electrónicos en ejecución no se
        "deteriora" como una pintura: directamente muere. Permaneció oscura
        más de diez años.</p>

        <p>En 2018–2019, el New Jersey State Council on the Arts financió la
        restauración supervisada por <strong>Artworks Trenton</strong>,
        con especialistas de CTL Electronics y Zienowicz Sign Co. La
        restauración no es solo técnica: plantea la pregunta más filosófica
        de la obra.</p>
      </div>
    `
  },

  /* ══════════════════════════════════════
     CANAL 03 — Hipótesis de trabajo
  ══════════════════════════════════════ */
  {
    num:    '03',
    label:  'HIPÓTESIS',
    color:  null,
    glitch: false,
    peek:   'La obra materializa la historia de la televisión pública como monumento a la democratización de la comunicación, convirtiendo el televisor en unidad mínima de un lenguaje escultórico.',
    html: () => `
      <p class="c-kicker">CANAL 03 · HIPÓTESIS DE TRABAJO</p>
      <h2 class="c-h2">Conjetura</h2>

      <!-- Caja de hipótesis con borde ámbar -->
      <div class="hip">
        <p class="hip-lbl">HIPÓTESIS PRINCIPAL</p>
        <p class="hip-txt">La obra materializa la historia de la televisión
        pública como monumento a la democratización de la comunicación,
        convirtiendo el aparato de recepción masiva —el televisor— en unidad
        mínima de un lenguaje escultórico que, al colapsar escrituras milenarias
        con señales de broadcast, propone que toda tecnología de comunicación
        es, en última instancia, traducción cultural.</p>
      </div>

      <h2 class="c-h2">Tres tensiones productivas</h2>
      <div class="c-body">
        <p><strong>1. Masivo ↔ Único.</strong>
        El televisor es el objeto paradigmático de la cultura de masas: idéntico,
        replicable, doméstico. Paik los convierte en piezas únicas de una
        escultura irrepetible. El símbolo de la estandarización se vuelve
        artefacto diferencial.</p>

        <p><strong>2. Pasivo ↔ Activo.</strong>
        La lógica del broadcast implica un receptor inmóvil frente a la pantalla.
        La instalación obliga al espectador a moverse, detenerse, descifrar,
        elegir qué pantalla mirar. El protocolo de recepción televisiva es
        desactivado por la propia acumulación de televisores.</p>

        <p><strong>3. Efímero ↔ Monumental.</strong>
        La señal televisiva es el medium más volátil que existe: desaparece al
        apagar el receptor. <em>PBS</em> la convierte en monumento público
        permanente —o lo intenta, hasta que la obra misma se apaga y hay
        que restaurarla.</p>
      </div>
    `
  },

  /* ══════════════════════════════════════
     CANAL 04 — Marco teórico: Manovich
     color:'teal' tiñe los h2 y los pri-h en verde
  ══════════════════════════════════════ */
  {
    num:    '04',
    label:  'MANOVICH',
    color:  'teal',
    glitch: false,
    peek:   'Representación numérica, modularidad, variabilidad, transcodificación. Los 52 monitores como módulos. Bucles variables. La televisión pública recodificada como escultura. Transcodificación histórica.',
    html: () => `
      <p class="c-kicker">CANAL 04 · MARCO TEÓRICO</p>
      <h2 class="c-h2" style="color:var(--teal)">Lev Manovich</h2>

      <div class="c-body" style="margin-bottom:1rem">
        <p>Manovich define los nuevos medios a partir de cinco principios.
        En <em>PBS</em>, que precede a la era del software pero la anticipa
        materialmente, todos son operativos de forma incipiente o
        analógico-electrónica:</p>
      </div>

      <!-- Cada principio usa clase .pri con variante .tl (teal) -->
      <div class="pri tl">
        <p class="pri-h">01 · Representación numérica</p>
        <p class="pri-b">Cada monitor es una unidad de codificación electrónica
        de la imagen: aunque la señal es analógica, el gesto de Paik de tratar
        el televisor como "píxel" de una matriz mayor anticipa la lógica de la
        imagen como dato manipulable. El sintetizador Paik-Abe que editó los
        <em>dancing patterns</em> opera exactamente sobre esa condición matemática
        de la imagen electrónica.</p>
      </div>

      <div class="pri tl">
        <p class="pri-h">02 · Modularidad</p>
        <p class="pri-b">52 pantallas independientes con su propio contenido
        coexisten sin fundirse en una imagen única. El neón es también modular:
        símbolos discretos de distintos sistemas de escritura que mantienen su
        autonomía. Manovich señala que en los nuevos medios "el todo se compone
        de partes independientes, cada una de las cuales puede ser modificada
        o reemplazada sin alterar el conjunto" — la restauración lo confirma
        literalmente.</p>
      </div>

      <div class="pri tl">
        <p class="pri-h">03 · Variabilidad</p>
        <p class="pri-b">Los monitores no muestran la misma imagen en el mismo
        momento: los bucles están desfasados, y las señales en vivo de NJN
        introducían variación en tiempo real. La obra nunca es idéntica entre
        una visita y otra — lo que Manovich llama "existencia en infinitas
        versiones potenciales".</p>
      </div>

      <div class="pri tl">
        <p class="pri-h">04 · Transcodificación</p>
        <p class="pri-b">La televisión pública —masiva, unidireccional,
        doméstica— es transcodificada como escultura monumental de espacio
        público. El televisor deja de ser "ventana al mundo" para convertirse
        en unidad de un lenguaje visual nuevo. Las escrituras antiguas y los
        broadcasts modernos son traducidos a un mismo sistema de signos
        luminosos: la transcodificación opera a escala histórica.</p>
      </div>

      <!-- Bloque de cita bibliográfica -->
      <div class="cita">
        "El lenguaje de los nuevos medios es el resultado de dos capas distintas
        que se influyen mutuamente: la cultural y la informática."
        <span class="cita-s">— Lev Manovich,
        <em>El lenguaje de los nuevos medios</em> (2001/2005)</span>
      </div>
    `
  },

  /* ══════════════════════════════════════
     CANAL 05 — Marco teórico: Murray
     color:'purple' tiñe en violeta
  ══════════════════════════════════════ */
  {
    num:    '05',
    label:  'MURRAY',
    color:  'purple',
    glitch: false,
    peek:   'Procedimental, participativo, espacial, enciclopédico. La obra ejecuta procesos. El espectador es lector. Los paneles crean un espacio navegable. Comprime milenios de historia de la comunicación.',
    html: () => `
      <p class="c-kicker">CANAL 05 · MARCO TEÓRICO</p>
      <h2 class="c-h2" style="color:var(--purple)">Janet H. Murray</h2>

      <div class="c-body" style="margin-bottom:1rem">
        <p>Las cuatro propiedades de los entornos digitales que Murray describe
        en <em>Hamlet en la holocubierta</em> permiten leer <em>PBS</em>
        como un entorno navegable más que como un objeto contemplativo:</p>
      </div>

      <!-- Principios con variante .pu (purple) -->
      <div class="pri pu">
        <p class="pri-h">01 · Procedimental</p>
        <p class="pri-b">La obra funciona porque ejecuta procedimientos: los
        bucles están programados en laserdisc, las señales en vivo siguen la
        grilla de NJN, el neón responde a circuitos con su propia lógica de
        encendido. El espectador no ve un cuadro fijo sino el resultado de
        procesos en ejecución permanente. Murray subraya que la naturaleza
        procedimental no es un rasgo técnico secundario sino la condición
        expresiva central de los entornos digitales.</p>
      </div>

      <div class="pri pu">
        <p class="pri-h">02 · Participativo</p>
        <p class="pri-b">La participación en <em>PBS</em> es
        contemplativo-decodificadora: el espectador está invitado a descifrar
        los sistemas de escritura del neón, rastrear caras en los monitores,
        construir su propio recorrido visual entre los 52 fragmentos. Murray
        distingue participación activa de participación interpretativa:
        <em>PBS</em> opera en la segunda — la que transforma al espectador de
        audiencia televisiva en lector.</p>
      </div>

      <div class="pri pu">
        <p class="pri-h">03 · Espacial</p>
        <p class="pri-b">La obra genera un espacio propio dentro de la
        arquitectura y se derrama hacia la calle a través del vidrio. El
        espectador puede recorrerla físicamente: acercarse a cada monitor,
        alejarse para ver la totalidad, cambiar de ángulo. Esta dimensión
        espacial —que Murray asocia con la capacidad de crear "mundos
        navegables"— es aquí concreta, corporal, arquitectónica.</p>
      </div>

      <div class="pri pu">
        <p class="pri-h">04 · Enciclopédico</p>
        <p class="pri-b">La obra comprime treinta y siete siglos de historia
        de la comunicación —desde los pictogramas sumerios hasta el broadcast
        satelital— en dos paneles de seis metros. Murray define la capacidad
        enciclopédica como la posibilidad de contener y relacionar cantidades
        de información imposibles en medios anteriores. Paik no solo acumula:
        produce una genealogía de los medios de comunicación como argumento
        visual.</p>
      </div>

      <div class="cita">
        "Los entornos digitales son enciclopédicos: pueden contener más
        información de la que cualquier usuario podría recorrer en una sola
        visita."
        <span class="cita-s">— Janet H. Murray,
        <em>Hamlet on the Holodeck</em> (1997)</span>
      </div>
    `
  },

  /* ══════════════════════════════════════
     CANAL 06 — Marco teórico: Foglia
     color:'coral' + glitch:true
  ══════════════════════════════════════ */
  {
    num:    '06',
    label:  'FOGLIA',
    color:  'coral',
    glitch: true,   /* ← glitch activado */
    peek:   'Fase 1 (APEM): Arte + Participación + Electrónica + Movilidad. El espectador pasa de audiencia a lector. La restauración como pregunta ontológica: ¿qué muere cuando se apaga una obra electrónica?',
    html: () => `
      <p class="c-kicker">CANAL 06 · MARCO TEÓRICO</p>
      <h2 class="c-h2" style="color:var(--coral)">Efraín Foglia</h2>

      <div class="c-body" style="margin-bottom:1rem">
        <p>Foglia propone una genealogía del arte participativo en cuatro fases
        más un antecedente. <em>PBS</em> se ubica con claridad en la Fase 1,
        con rasgos que la sitúan en el umbral de la Fase 2:</p>
      </div>

      <!-- Franja de fases: .fs.hl resalta la fase activa en coral -->
      <div class="fase-strip">
        <div class="fs"><span class="fn">F.0</span>APrE<br>Duchamp 1920</div>
        <div class="fs hl"><span class="fn">F.1 ←</span>APEM<br>Paik 1993</div>
        <div class="fs"><span class="fn">F.2</span>APDR<br>Domínguez 1998</div>
        <div class="fs"><span class="fn">F.3</span>APDER<br>Lozzano-H 2000</div>
        <div class="fs"><span class="fn">F.4</span>APDERM<br>Shepard 2010</div>
      </div>

      <!-- Principios con variante .co (coral) -->
      <div class="pri co">
        <p class="pri-h">Fase 1 (APEM)</p>
        <p class="pri-b">Foglia caracteriza esta fase por la incorporación de
        dispositivos electrónicos que abren la obra a formas de participación
        antes imposibles. Los 52 televisores transforman el espacio
        arquitectónico en un entorno dinámico. Paik, como Rauschenberg con
        <em>Open Score</em>, trabajó con técnicos especializados —lo que
        Foglia señala como rasgo definitorio de esta fase: el artista como
        director de una red de saberes técnicos.</p>
      </div>

      <div class="pri co">
        <p class="pri-h">El espectador: de audiencia a lector</p>
        <p class="pri-b">Foglia señala que cada fase reconfigura el rol del
        espectador. En <em>PBS</em>, el espectador deja de ser audiencia
        televisiva —pasiva, doméstica, individual— para convertirse en lector
        de una escritura múltiple y simultánea. La obra desactiva el protocolo
        de recepción televisiva e instala una situación de lectura abierta y
        errante. Esta reconfiguración es ya un gesto participativo aunque no
        haya interfaz técnica que lo formalice.</p>
      </div>

      <div class="pri co">
        <p class="pri-h">La restauración como pregunta ontológica</p>
        <p class="pri-b">Si el arte participativo se define por sus procesos
        —por lo que ejecuta, no por lo que representa—, una obra apagada no
        está deteriorada: está muerta. La restauración no es conservación
        museística sino resurrección de un proceso. ¿Cuánto del original queda
        cuando se reemplazan todos los tubos de neón y varios monitores?
        La identidad de la obra es procedimental, no material.</p>
      </div>

      <div class="cita">
        "Cada una de estas etapas refleja cambios ocasionados por la conjunción
        entre lo conceptual y lo tecnológico y han generado formas experimentales
        de participación."
        <span class="cita-s">— Efraín Foglia,
        "Cuatro fases vertebrales en el desarrollo del arte participativo"
        (2012)</span>
      </div>
    `
  },

  /* ══════════════════════════════════════
     CANAL 07 — Recursos / links
  ══════════════════════════════════════ */
  {
    num:    '07',
    label:  'RECURSOS',
    color:  null,
    glitch: false,
    peek:   'Documental de restauración State of the Arts NJ · Artworks Trenton · PBS.org · Public Art Archive · Análisis crítico Daniel J. Fuller.',
    html: () => `
      <p class="c-kicker">CANAL 07 · RECURSOS</p>
      <h2 class="c-h2">Documentación</h2>

      <!-- Cada .rlink tiene: .ri (ícono), .rt (título), .rd (descripción) -->
      <a class="rlink"
         href="https://www.youtube.com/watch?v=ueHNZbQRsMs"
         target="_blank">
        <span class="ri">▶</span>
        <div>
          <p class="rt">Documental de la restauración — State of the Arts NJ</p>
          <p class="rd">YouTube · ~10 min · incluye material de archivo de la instalación original</p>
        </div>
      </a>

      <a class="rlink"
         href="https://www.pbs.org/video/nam-june-paik-pbs-1963-2000-nptpsb/"
         target="_blank">
        <span class="ri">▶</span>
        <div>
          <p class="rt">PBS.org — versión completa del documental</p>
          <p class="rd">Web oficial de PBS · versión extendida</p>
        </div>
      </a>

      <a class="rlink"
         href="https://artworkstrenton.org/pbs-1963-2000-then-and-now/"
         target="_blank">
        <span class="ri">⊞</span>
        <div>
          <p class="rt">Artworks Trenton — catálogo oficial de la restauración</p>
          <p class="rd">Exposición "PBS (1963-2000), Then and Now" · 2019</p>
        </div>
      </a>

      <a class="rlink"
         href="https://publicartarchive.org/art/PBS-1963-2000/0a318051"
         target="_blank">
        <span class="ri">◈</span>
        <div>
          <p class="rt">Public Art Archive — ficha de la obra</p>
          <p class="rd">Registro oficial en el archivo de arte público norteamericano</p>
        </div>
      </a>

      <a class="rlink"
         href="https://danieljfuller.com/nam-june-paiks-pbs-1963-2000-1993-new-jersey-network-building-trenton-nj/"
         target="_blank">
        <span class="ri">✦</span>
        <div>
          <p class="rt">Daniel J. Fuller — análisis crítico con fotografías</p>
          <p class="rd">Visita y descripción extendida · con imágenes de la instalación</p>
        </div>
      </a>
    `
  },

  /* ══════════════════════════════════════
     CANAL 08 — Bibliografía
  ══════════════════════════════════════ */
  {
    num:    '08',
    label:  'BIBLIOGRAFÍA',
    color:  null,
    glitch: false,
    peek:   'Foglia 2012 · Manovich 2001/2005 · Murray 1997 · Paik 1993 · Artworks Trenton 2019 · State of the Arts NJ 2019.',
    html: () => `
      <p class="c-kicker">CANAL 08 · BIBLIOGRAFÍA</p>
      <h2 class="c-h2">Referencias</h2>

      <!-- Cada .bib es un ítem bibliográfico -->
      <div class="bib">Foglia, E. (2012). "Cuatro fases vertebrales en el
      desarrollo del arte participativo". En Carlón, M. y Scolari, C. (comps.),
      <em>Colabor_arte. Medios y artes en la era de la producción
      colaborativa</em>. Buenos Aires: La Crujía, pp. 155–173.</div>

      <div class="bib">Manovich, L. (2001). <em>The Language of New Media</em>.
      Cambridge: MIT Press. [Ed. esp.: (2005).
      <em>El lenguaje de los nuevos medios de comunicación</em>.
      Barcelona: Paidós.]</div>

      <div class="bib">Murray, J. H. (1997).
      <em>Hamlet on the Holodeck: The Future of Narrative in Cyberspace</em>.
      Cambridge: MIT Press.</div>

      <div class="bib">Paik, N. J. (1993).
      <em>PBS (1963–2000)</em> [Escultura/instalación pública].
      NJN Public Television Building, Trenton, New Jersey.
      Colección del Estado de Nueva Jersey.</div>

      <div class="bib">Artworks Trenton (2019).
      <em>PBS (1963-2000), Then and Now</em> [Catálogo de exposición].
      artworkstrenton.org. Consultado en mayo de 2026.</div>

      <div class="bib">State of the Arts NJ (2019).
      "Nam June Paik: PBS (1963-2000)" [Documental].
      New Jersey PBS / pbs.org.</div>

      <div class="bib">Fuller, D. J. (s/f).
      "Nam June Paik's PBS (1963-2000), 1993 New Jersey Network Building,
      Trenton, NJ". danieljfuller.com. Consultado en mayo de 2026.</div>
    `
  },

  /* ══════════════════════════════════════
     CANAL 09 — Cierre / créditos
     glitch:true para el efecto en el label
  ══════════════════════════════════════ */
  {
    num:    '09',
    label:  'SEÑAL\nFINAL',
    color:  null,
    glitch: true,
    peek:   '𓀀 𒀭 한 ब्र ◈ ✦ Arte Digital Aplicado · 2026 · Toda tecnología de comunicación es, en última instancia, traducción cultural.',
    html: () => `
      <!-- Canal decorativo de cierre — sin estructura de análisis -->
      <div class="decor">
        <p class="c-kicker" style="margin-bottom:2.5rem">CANAL 09 · SEÑAL DE CIERRE</p>

        <!-- Tres filas de glifos con los tres colores de acento -->
        <div class="dg1">𓀀 𓂀 𓃀 𒀭 𒀀</div>
        <div class="dg2">한글 &nbsp; ब्र &nbsp; ◈ &nbsp; ✦ &nbsp; ⊞</div>
        <div class="dg3">— PBS (1963–2000) — NAM JUNE PAIK —</div>

        <hr class="c-rule" style="margin:2.5rem 0">

        <div class="dcred">
          <p>ANÁLISIS · Arte Digital Aplicado · 2026</p>
          <p>NJN Building · Trenton, New Jersey · 1993</p>
          <p>Restauración: Artworks Trenton · 2018–2019</p>
          <p style="margin-top:1.5rem; color:var(--teal);
                    letter-spacing:.05em; font-size:12px">
            Toda tecnología de comunicación es,<br>
            en última instancia, traducción cultural.
          </p>
        </div>
      </div>
    `
  }

]; /* ← fin del array CH */

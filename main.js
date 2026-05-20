/*
  ═══════════════════════════════════════════════
  MAIN.JS
  SOLO FUNCIONALIDAD
  NO contiene contenido editorial.
  ═══════════════════════════════════════════════
*/


/* Índice del canal abierto */
let indiceCanalAbierto = 0;


/*
  Lee TODOS los canales escritos en HTML.
*/
const canales = Array.from(
  document.querySelectorAll('#canales .canal')
);




/*
  ═══════════════════════════════════════════════
  ENTRAR AL MURAL
  ═══════════════════════════════════════════════
*/

function entrarAlMural() {

  const inicio =
    document.getElementById('pantalla-inicio');

  const mural =
    document.getElementById('mural-monitores');


  inicio.classList.add('oculta');

  mural.classList.add('visible');


  setTimeout(() => {

    inicio.style.display = 'none';

  }, 360);
}





/*
  ═══════════════════════════════════════════════
  ABRIR CANAL
  ═══════════════════════════════════════════════
*/

function abrirCanal(indice) {

  indiceCanalAbierto = indice;


  const canal = canales[indice];

  const visor =
    document.getElementById('visor-canal');

  const contenido =
    document.getElementById('contenido-canal');


  /*
    Toma automáticamente el título
    desde el HTML del canal.
  */

  const titulo =
    canal.querySelector('.canal-titulo')
    ?.textContent || '';


  document.getElementById('visor-canal-id')
    .textContent = titulo;



  /*
    Copia el canal completo
    al visor expandido.
  */

  contenido.innerHTML = '';

  contenido.appendChild(
    canal.cloneNode(true)
  );



  visor.classList.add('abierto');



  /*
    Scroll arriba
  */

  document.querySelector('.visor-pantalla')
    .scrollTop = 0;
}





/*
  ═══════════════════════════════════════════════
  CERRAR VISOR
  ═══════════════════════════════════════════════
*/

function cerrarVisor() {

  document.getElementById('visor-canal')
    .classList.remove('abierto');
}





/*
  ═══════════════════════════════════════════════
  NAVEGACIÓN ENTRE CANALES
  ═══════════════════════════════════════════════
*/

function navegarCanal(direccion) {

  indiceCanalAbierto = (
    indiceCanalAbierto
    + direccion
    + canales.length
  ) % canales.length;


  abrirCanal(indiceCanalAbierto);
}





/*
  ═══════════════════════════════════════════════
  TECLADO
  ═══════════════════════════════════════════════
*/

document.addEventListener('keydown', (evento) => {

  if (evento.key === 'Escape') {
    cerrarVisor();
  }

  if (evento.key === 'ArrowRight') {
    navegarCanal(1);
  }

  if (evento.key === 'ArrowLeft') {
    navegarCanal(-1);
  }

});





/*
  ═══════════════════════════════════════════════
  CLICK FUERA DEL VISOR = CERRAR
  ═══════════════════════════════════════════════
*/

document.getElementById('visor-canal')
  .addEventListener('click', function(evento) {

    if (evento.target === this) {
      cerrarVisor();
    }

});





/*
  ═══════════════════════════════════════════════
  EXPONER FUNCIONES AL HTML
  ═══════════════════════════════════════════════
*/

window.entrarAlMural = entrarAlMural;

window.abrirCanal = abrirCanal;

window.cerrarVisor = cerrarVisor;

window.navegarCanal = navegarCanal;
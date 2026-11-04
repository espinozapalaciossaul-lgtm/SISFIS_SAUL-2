const ids = [

 'numeroInforme',

 'expediente',

 'ciudad',

 'fecha',

 'destinatario',

 'supervisor',

 'cargoSupervisor',

 'asunto',

 'referencia',

 'empresa',

 'ruc',

 'placa',

 'tracto',

 'capacidad',

 'objetivo',

 'antecedentes',

 'baseLegal',

 'descripcion',

 'direccion',

 'visita',

 'descargos',

 'anexos',

 'conclusiones',

 'recomendaciones',

 'representante',

 'dniRepresentante',

 'cipSupervisor',
 'registro',
 'empresaSupervisora',
 'cartaLinea',
 'compartimientos',
 'producto',
 'vigencia',
 'fechaEmision',
 'fechaConsulta',
 'fechaVisita',
 'horaInicio',
 'horaFin',
 'encargado',
 'dniEncargado',
 'distrito',
 'provincia',
 'departamento',
 'direccionLegal'

];



let editId = null;

function nuevoInforme() {
 editId = null;
}



const $ = id => document.getElementById(id);



const form = $('form');

const tieneDescargo = $('tieneDescargo');

const zonaDescargo = $('zonaDescargo');



tieneDescargo.addEventListener('change', () => {

 zonaDescargo.hidden = !tieneDescargo.checked;

});



$('btnImprimir').addEventListener('click', () => {

 window.print();

});



// Obtener los datos del formulario

function datos() {

 const x = {};



 ids.forEach(id => {

  const campo = $(id);



  if (!campo) {

   throw new Error(

    'Falta el campo "' + id + '" en index.html'

   );

  }



  x[id] = campo.value.trim();

 });



 x.tieneDescargo = tieneDescargo.checked;
 x.observaciones = typeof observaciones !== 'undefined'
  ? observaciones.slice()
  : (x.observaciones || []);



 return x;

}



// Cargar informe para editar

function cargar(x) {

 ids.forEach(id => {

  $(id).value = x[id] || '';

 });



 tieneDescargo.checked = !!x.tieneDescargo;
 if (typeof cargarObservaciones === 'function') {
  cargarObservaciones(x.observaciones || []);
 }

 zonaDescargo.hidden = !x.tieneDescargo;



 editId = x.id;



 vista(x);



 window.scrollTo({

  top: 0,

  behavior: 'smooth'

 });

}



// Escapar texto para insertarlo en el documento

function escapar(texto) {

 return String(texto ?? '').replace(

  /[&<>"']/g,

  c => ({

   '&': '&amp;',

   '<': '&lt;',

   '>': '&gt;',

   '"': '&quot;',

   "'": '&#39;'

  }[c])

 );

}



// Convertir el contenido en párrafos numerados

function parrafos(texto) {

 const lineas = (texto || '')

  .split('\n')

  .filter(linea => linea.trim());



 if (lineas.length === 0) {

  return '<p class="doc-sin-datos">' +

   'Sin información registrada.</p>';

 }



 return '<ol class="doc-num">' +

  lineas

   .map(linea =>

    '<li>' +

    escapar(

     linea.trim().replace(

      /^(?:\d+[.)]|[•\-–])\s*/,

      ''

     )

    ) +

    '</li>'

   )

   .join('') +

  '</ol>';

}



// Vista previa del informe con formato de documento

function vista(x) {
 if (typeof renderVistaDocumento === 'function') {
  renderVistaDocumento(x);
  return;
 }

 const romanos = [

  'I', 'II', 'III', 'IV', 'V', 'VI',

  'VII', 'VIII', 'IX', 'X', 'XI', 'XII'

 ];



 const opcionesFecha = {

  day: 'numeric',

  month: 'long',

  year: 'numeric'

 };



 const fecha = x.fecha

  ? new Date(x.fecha + 'T00:00:00')

    .toLocaleDateString('es-PE', opcionesFecha)

  : new Date().toLocaleDateString('es-PE', opcionesFecha);



 const lugarFecha = x.ciudad

  ? `${x.ciudad}, ${fecha}`

  : fecha;



 const secciones = [

  ['Objetivo', x.objetivo],

  ['Antecedentes', x.antecedentes],

  ['Base legal', x.baseLegal],

  ['Descripción general', x.descripcion],

  ['Dirección', x.direccion],

  ['De la visita de fiscalización', x.visita]

 ];



 if (x.tieneDescargo) {

  secciones.push(['Análisis de descargos', x.descargos]);

 }



 secciones.push(

  ['Anexos', x.anexos],

  ['Conclusiones', x.conclusiones],

  ['Recomendaciones', x.recomendaciones]

 );



 const cuerpo = secciones

  .map((seccion, i) => {

   const unidad = seccion[0] === 'Descripción general'

    ? `<table class="doc-meta doc-unidad">

       <tr>

        <th>Agente fiscalizado</th>

        <td>${escapar(x.empresa)}</td>

       </tr>

       <tr>

        <th>R.U.C.</th>

        <td>${escapar(x.ruc) || '—'}</td>

       </tr>

       <tr>

        <th>Placa principal</th>

        <td>${escapar(x.placa) || '—'}</td>

       </tr>

       <tr>

        <th>Tracto</th>

        <td>${escapar(x.tracto) || '—'}</td>

       </tr>

       <tr>

        <th>Capacidad</th>

        <td>${escapar(x.capacidad) || '—'}</td>

       </tr>

      </table>`

    : '';



   return `<h3 class="doc-seccion-titulo">` +

    `${romanos[i]}. ${seccion[0]}</h3>` +

    unidad +

    parrafos(seccion[1]);

  })

  .join('');



 $('vista').innerHTML = `

  <article class="doc-hoja">

   <div class="doc-encabezado">

    <p class="doc-sistema">

     SISFIS · Sistema de Informes de Fiscalización

    </p>

    <h2 class="doc-titulo">

     Informe de Supervisión N.° ${escapar(

      x.numeroInforme || x.expediente

     )}

    </h2>

    <p class="doc-fecha">

     ${escapar(lugarFecha)} ·

     Expediente N.° ${escapar(x.expediente)}

    </p>

   </div>



   <dl class="doc-memo">

    <div>

     <dt>A:</dt>

     <dd>${escapar(x.destinatario) || '—'}</dd>

    </div>

    <div>

     <dt>De:</dt>

     <dd>${escapar(x.supervisor) || '—'}${

      x.cargoSupervisor

       ? ' — ' + escapar(x.cargoSupervisor)

       : ''

     }</dd>

    </div>

    <div>

     <dt>Asunto:</dt>

     <dd>${escapar(x.asunto) || '—'}</dd>

    </div>

    <div>

     <dt>Referencia:</dt>

     <dd>${escapar(x.referencia) || '—'}</dd>

    </div>

   </dl>



   ${cuerpo}



   <div class="doc-firmas">

    <p class="doc-atentamente">Atentamente,</p>

    <div class="doc-firmas-grid">

     <div class="doc-firma">

      <span class="doc-linea"></span>

      <strong>${escapar(x.representante) ||

       'Representante legal'}</strong>

      <small>DNI N.° ${escapar(

       x.dniRepresentante

      ) || '—'}</small>

      <small>Representante legal</small>

     </div>

     <div class="doc-firma">

      <span class="doc-linea"></span>

      <strong>${escapar(x.supervisor) ||

       'Fiscalizador responsable'}</strong>

      <small>CIP N.° ${escapar(

       x.cipSupervisor

      ) || '—'}</small>

      <small>Fiscalizador</small>

     </div>

    </div>

   </div>

  </article>`;

}



// Listar informes registrados

async function listar() {

 try {

  const respuesta = await fetch('/api/informes');



  if (!respuesta.ok) {

   throw new Error('No se pudo obtener la lista');

  }



  const informes = await respuesta.json();

  const lista = $('lista');



  lista.replaceChildren();



  if (informes.length === 0) {

   lista.textContent = 'No hay informes registrados.';

   return;

  }



  informes.forEach(x => {

   const p = document.createElement('p');



   const nombre = document.createElement('span');

   nombre.textContent =

    `${x.expediente} - ${x.empresa} `;



   const editar = document.createElement('button');

   editar.textContent = 'Editar';
   editar.type = 'button';

   editar.className = 'btn-editar';

   editar.onclick = () => cargar(x);



   const word = document.createElement('button');
   word.type = 'button';
   word.textContent = 'Word';
   word.className = 'btn-exito';
   word.onclick = () => {
    if (typeof descargarInforme === 'function') {
     descargarInforme(x);
    }
   };

   const eliminar = document.createElement('button');

   eliminar.textContent = 'Eliminar';

   eliminar.className = 'btn-eliminar';



   eliminar.onclick = async () => {

    if (!confirm('¿Desea eliminar este informe?')) {

     return;

    }



    try {

     const r = await fetch(

      '/api/informes/' + encodeURIComponent(x.id),

      { method: 'DELETE' }

     );



     if (!r.ok) {

      throw new Error('No se pudo eliminar');

     }



     await listar();



    } catch (error) {

     alert(error.message);

    }

   };



   p.append(nombre, editar, word, eliminar);

   lista.appendChild(p);

  });



 } catch (error) {

  console.error(error);

  alert('Error al listar informes: ' + error.message);

 }

}



// Guardar o actualizar informe

form.addEventListener('submit', async ev => {

 ev.preventDefault();



 try {

  const x = datos();



  if (!x.expediente) {

   alert('Ingrese el número de expediente');

   $('expediente').focus();

   return;

  }



  if (!x.empresa) {

   alert('Ingrese el nombre de la empresa');

   $('empresa').focus();

   return;

  }



  const url = '/api/informes' +

   (editId ? '/' + encodeURIComponent(editId) : '');



  const metodo = editId ? 'PUT' : 'POST';



  const respuesta = await fetch(url, {

   method: metodo,

   headers: {

    'Content-Type': 'application/json'

   },

   body: JSON.stringify(x)

  });



  const tipoContenido = respuesta.headers.get('content-type') || '';

  if (!tipoContenido.includes('application/json')) {
   throw new Error(
    'El servidor no respondió correctamente. Reinícielo con "npm start" e inténtelo de nuevo.'
   );
  }

  const resultado = await respuesta.json();



  if (!respuesta.ok) {

   throw new Error(

    resultado.error || 'No se pudo guardar'

   );

  }



  vista(resultado);



  editId = null;

  form.reset();
  if (typeof cargarObservaciones === 'function') {
   cargarObservaciones([]);
  }

  zonaDescargo.hidden = true;



  await listar();



  alert('Informe guardado correctamente');



 } catch (error) {

  console.error('Error al guardar:', error);

  alert('Error: ' + error.message);

 }

});



// Cargar informes al iniciar

listar();
var observaciones = [];
var documentoActual = null;

var ROMANOS = [
 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'
];

var NOTA_PIE = 'El plazo se contabiliza a partir del día siguiente de habérsele trasladado al administrado el oficio de notificación del informe de fiscalización, vía SNE, en el que se deja constancia de los incumplimientos técnicos verificados. Versión 1.0 del Lineamientos de actuación en la fiscalización de seguridad de Medios de Transporte de Combustibles Líquidos y OPDH a través de camiones tanque y camiones cisterna, División De Supervisión Regional Gerencia de Supervisión de Energía.';

var MODELO_INFORME = {
 numeroInforme: '«osinumero»',
 expediente: '202600000000',
 ciudad: 'Huánuco',
 fecha: '2026-10-25',
 destinatario: 'Oficina Regional Huánuco - OSINERGMIN',
 supervisor: 'Carlos Ejemplo Rivera',
 cargoSupervisor: 'Supervisor ES Supervisión Técnica Demostrativa E.I.R.L.',
 asunto: 'Fiscalización de SEGURIDAD DE MEDIOS DE TRANSPORTE DE COMBUSTIBLE LIQUIDOS Y OPDH, operado por TRANSPORTES MODELO DEMOSTRATIVO S.A.C.',
 referencia: 'Registro de Hidrocarburos de OSINERGMIN N° 00000-060-000000',
 empresa: 'TRANSPORTES MODELO DEMOSTRATIVO S.A.C.',
 ruc: '20000000001',
 placa: 'ABC-000',
 tracto: 'XYZ-000',
 capacidad: '9000 galones',
 registro: '00000-060-000000',
 empresaSupervisora: 'SUPERVISIÓN TÉCNICA DEMOSTRATIVA E.I.R.L.',
 cartaLinea: '0000000-0',
 compartimientos: 'seis compartimientos',
 producto: 'Combustibles líquidos y OPDH',
 vigencia: 'INDEFINIDO',
 fechaEmision: '2024-08-29',
 fechaConsulta: '2026-10-22',
 fechaVisita: '2026-09-24',
 horaInicio: '10:16',
 horaFin: '15:20',
 encargado: 'PEDRO MODELO GARCIA',
 dniEncargado: '00000000',
 distrito: 'CHURUBAMBA',
 provincia: 'HUÁNUCO',
 departamento: 'HUÁNUCO',
 direccionLegal: 'DIRECCIÓN FICTICIA PARA CAPACITACIÓN, HUÁNUCO',
 representante: 'Elena Referencia Torres',
 dniRepresentante: '00000000',
 cipSupervisor: '000000',
 tieneDescargo: false,
 objetivo: 'El objetivo de la presente visita de fiscalización es de verificar el cumplimiento de las obligaciones relativas a las condiciones de seguridad del MEDIO DE TRANSPORTE DE COMBUSTIBLE LIQUIDOS Y OPDH de placa de rodaje principal Nº ABC-000, con Registro de Hidrocarburos N° 00000-060-000000, operado por TRANSPORTES MODELO DEMOSTRATIVO S.A.C., con Registro Único de Contribuyentes (R.U.C.) N° 20000000001 (en adelante, el Agente Fiscalizado).',
 antecedentes: [
  'Con fecha 29 de agosto de 2024, TRANSPORTES MODELO DEMOSTRATIVO S.A.C. (en adelante, el Agente Fiscalizado) obtuvo el Registro de Hidrocarburos N.° 00000-060-000000, para operar la unidad vehicular de placa principal N.° ABC-000 y tracto XYZ-000, en la actividad de transporte de combustibles líquidos y OPDH, con capacidad autorizada de 9000 galones y seis compartimientos, con dirección legal en DIRECCIÓN FICTICIA PARA CAPACITACIÓN, HUÁNUCO, distrito de CHURUBAMBA, provincia y departamento de HUÁNUCO, conforme a la consulta del Registro de Hidrocarburos.',
  'Mediante la Resolución de Autoridad de Fiscalización – Oficina Regional Huánuco N.° 000-2026-OS-GSE/DSR-OR HUÁNUCO, de fecha 10 de septiembre de 2026, se dispuso, en calidad de MANDATO, que TRANSPORTES MODELO DEMOSTRATIVO S.A.C. ponga a disposición la unidad de placa principal N.° ABC-000, con Registro de Hidrocarburos N.° 00000-060-000000.',
  'Con fecha 11 de septiembre de 2026, mediante carta dirigida al Especialista Regional en Hidrocarburos de la Oficina Regional Huánuco, TRANSPORTES MODELO DEMOSTRATIVO S.A.C. comunicó que la fiscalización de la unidad ABC-000 se realizaría en la Carretera Central Huánuco–Tingo María, Km 23+270, Centro Poblado de Chullqui, distrito de Churubamba, Huánuco.',
  'Con fecha 18 de septiembre de 2026, el Especialista Regional en Hidrocarburos, Ing. Luis Modelo Fernández, mediante Asignación N.° 00000-2026, asignó la Carta Línea N.° 0000000-0 a la empresa supervisora SUPERVISIÓN TÉCNICA DEMOSTRATIVA E.I.R.L., a fin de efectuar la fiscalización operativa a medios de transporte terrestre de CL, con visita, a la unidad vehicular de placa ABC-000.',
  'Con fecha 24 de septiembre de 2026, el Ing. Carlos Ejemplo Rivera realizó la visita de fiscalización al medio de transporte de placa principal N.° ABC-000, operado por TRANSPORTES MODELO DEMOSTRATIVO S.A.C., y suscribió el Acta de Fiscalización correspondiente al Expediente N.° 202600000000.',
  'Con fecha 25 de octubre de 2026, se elabora el presente informe de fiscalización, correspondiente a la Carta Línea N.° 0000000-0 y al Expediente N.° 202600000000, para su evaluación.'
 ].join('\n'),
 baseLegal: [
  'Ley Nº 26734, Ley de Creación de Osinergmin.',
  'Ley Nº 27699, Ley Complementaria de Fortalecimiento Institucional de Osinergmin.',
  'Decreto Supremo Nº 054-2001-PCM, que aprueba el Reglamento General del Osinergmin.',
  'Decreto Supremo N° 006-2026-JUS, que aprueba el Texto Único Ordenado de la Ley N.º 27444, Ley del Procedimiento Administrativo General.',
  'Resolución de Consejo Directivo Nº 150-2024-OS/CD, que aprueba el Reglamento del Registro de Hidrocarburos de Osinergmin. Y la Resolución de Consejo Directivo Nº 56-2026-OS/CD, que modifica el Reglamento del Registro de Hidrocarburos de Osinergmin.',
  'Resolución de Consejo Directivo Nº 208-2020-OS/CD, que aprueba el Reglamento de Fiscalización y Sanción de las actividades energéticas y mineras a cargo de Osinergmin.',
  'Resolución de Consejo Directivo N° 271-2012-OS/CD, que aprueba la Tipificación y Escala de Multas y Sanciones de Hidrocarburos de OSINERGMIN y modificatorias.',
  'Decreto Supremo N° 026-94-EM y sus modificatorias, que aprueba el Reglamento',
  'Decreto Supremo Nº 030-98-EM y sus modificatorias, que aprueba el Reglamento.',
  'Decreto Supremo Nº 019-99-EM y sus modificatorias, que amplía el plazo para que camiones cisterna de transporte de combustibles no equipados para carga inferior, adecuen sus instalaciones.',
  'Norma Técnica Peruana, NTP: 350.043-1, Extintores Portátiles'
 ].join('\n'),
 descripcion: 'El medio de transporte terrestre de combustibles líquidos y OPDH, operado por TRANSPORTES MODELO DEMOSTRATIVO S.A.C.; cuenta con la siguiente información:',
 direccion: 'La fiscalización realizada al medio de transporte terrestre de combustibles líquidos y OPDH, de placa principal ABC-000, se llevó a cabo en DIRECCIÓN FICTICIA PARA CAPACITACIÓN, HUÁNUCO, distrito de CHURUBAMBA, provincia y departamento de HUÁNUCO.',
 visita: [
  'Con fecha 24 de septiembre de 2026, siendo las 10:16 horas, se inició la fiscalización a la unidad vehicular de placa principal ABC-000, operada por TRANSPORTES MODELO DEMOSTRATIVO S.A.C., con Registro de Hidrocarburos N.° 00000-060-000000. Se constataron las observaciones consignadas en el apartado II «Otros» del acta, conforme al siguiente cuadro:',
  'Culminada la fiscalización, se suscribió el ACTA DE FISCALIZACIÓN DE SEGURIDAD DE MEDIOS DE TRANSPORTE DE COMBUSTIBLES LÍQUIDOS Y OPDH correspondiente al Expediente N.° 202600000000, recibida por el Sr. PEDRO MODELO GARCIA, identificado con DNI N.° 00000000, en calidad de encargado de la unidad vehicular. La diligencia concluyó a las 15:20 horas.'
 ].join('\n'),
 anexos: [
  'ANEXO 1. REPORTE DE CIERRE SFH - CL 0000000-0',
  'ANEXO 2. 202600000000-060 - PLAN DE CONTINGENCIAS',
  'ANEXO 3. 202600000000-060 - GUÍA DE REMISIÓN',
  'ANEXO 4. 202600000000-060 - CAPACITACIÓN DEL CONDUCTOR',
  'ANEXO 5. 202600000000-060 - CONSULTA RHO',
  'ANEXO 6. 202600000000-060 - CONSULTA RUC',
  'ANEXO 7. 202600000000-060 - PÓLIZA DE SEGURO',
  'ANEXO 8. 202600000000-060 – CONSULTA EN LINEA RHO',
  'ANEXO 9. 202600000000-060-CERTIFICADO DE INSTALCION GPS',
  'ANEXO10. 202600000000-060-CERTIFICADO DE VERIFICACION',
  'ANEXO 11 202600000000-060-TARJETA E INSPECCION TECNICA ABC-000,',
  'Anexo 12 202600000000-060-TARJETA E INSPECCION TECNICA XYZ-000',
  'VIDEO DE OPERATIVIDAD DE LUCES'
 ].join('\n'),
 conclusiones: 'TRANSPORTES MODELO DEMOSTRATIVO S.A.C., la Ficha de Registro de Hidrocarburos N.° 00000-060-000000, NO CUMPLIÓ con lo establecido de las condiciones de seguridad de Medio De Transporte De Combustible Líquidos Y OPDH.',
 recomendaciones: [
  'Comunicar a TRANSPORTES MODELO DEMOSTRATIVO S.A.C., con Ficha de Registro de Hidrocarburos N.° 00000-060-000000, las observaciones consignadas en el apartado II «Otros» del Acta de Fiscalización, a fin de que acredite su subsanación respecto de la unidad vehicular de placa principal ABC-000.',
  'Asimismmo, se otorgue el plazo establecido de 30 días calendario para que la empresa pueda subsanar los incumplimientos de orden técnico y que no constituyen un alto riesgo para la seguridad (TIPO B), bajo apercibimiento de iniciar Procedimiento Administrativo Sancionador – PAS.'
 ].join('\n'),
 observaciones: [
  {
   tipo: 'OTRAS OBSERVACIONES',
   base: 'Cada compartimiento del tanque de cargamento deberá ser provisto con venteos normales de presión y vacío, cada uno teniendo un área de sección transversal libre neta de 0.44 pulg2 (284 mm2). Venteos de presión deberán ser fijados para abrir en una presión manométrica de no más de 1 psi (6.9 kPa). Venteos de vacío deberán ser fijados para abrir en 6 oz (170 g). Donde un compartimiento del tanque de cargamento es diseñado para ser cargado o descargado con la cubierta del domo cerrada, el venteo o venteos descritos en 5.3.12.2 o venteos adicionales deberán limitar el vacío a 1 psi (6.9 kPa) y la presión del tanque a una presión manométrica de 3 psi (20.7 kPa) basada en la tasa máxima de transferencia de producto.\nBase legal: 5.3.12.2 y 5.3.12.4 del Estándar NFPA 385 Estándar para vehículos tanque para líquidos inflamables y combustibles. Edición 2007, en concordancia con la cuarta disposición transitoria de Texto Único Ordenado de la Ley Orgánica de Hidrocarburos, aprobada mediante Decreto Supremo N° 0422005-EM.',
   descripcion: 'Tipo B: Durante la visita de fiscalización se verificó que las válvulas de presión y vacío de los compartimientos N.° 1, 2, 3, 4, 5 y 6 no especifican que limiten el vacío a 1 PSI (6.9 kPa) y la presión manométrica a 3 PSI (20.7 kPa).',
   medio: 'Foto N.º 23, 30, 39,47, 54 y 61.'
  },
  {
   tipo: 'OTRAS OBSERVACIONES',
   base: 'Venteo de Emergencia para Exposición a Incendio:\nCada compartimiento del tanque de cargamento deberá ser equipado con uno o más venteos accionados por presión fijados para abrir en una presión manométrica de no menos de 3 psi (20.7 kPa) y cerrar cuando las caídas de presión debajo de 3 psi (20.7 kPa) del punto de seteo.\nBase legal: 5.3.13 del Estándar NFPA 385 Estándar para vehículos tanque para líquidos inflamables y combustibles. Edición 2007, en concordancia con la cuarta disposición transitoria de Texto Único Ordenado de la Ley Orgánica de Hidrocarburos, aprobada mediante Decreto Supremo N° 042-2005-EM.',
   descripcion: 'Tipo B: Durante la visita de fiscalización se verificó Que el Agente Fiscalizado deberá acreditar que los compartimientos N.° 1, 2, 3, 4 y 6 cuentan con venteos de emergencia para exposición a incendios, calibrados para abrir a no menos de 3 PSI y cerrar por debajo de 3 PSI del punto de venteo.',
   medio: 'Foto N.º 22, 29, 38,46, 53 y 60'
  }
 ]
};

function esc(texto) {
 return String(texto ?? '').replace(/[&<>"']/g, function (c) {
  return {
   '&': '&amp;',
   '<': '&lt;',
   '>': '&gt;',
   '"': '&quot;',
   "'": '&#39;'
  }[c];
 });
}

function fechaLarga(iso) {
 if (!iso) return '';
 var fecha = new Date(iso + 'T00:00:00');
 if (Number.isNaN(fecha.getTime())) return String(iso);
 return fecha.toLocaleDateString('es-PE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
 });
}

function fechaCorta(iso) {
 var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
 return m ? m[3] + '/' + m[2] + '/' + m[1] : String(iso || '');
}

function lineas(texto) {
 return String(texto || '')
  .split(/\n+/)
  .map(function (linea) { return linea.trim(); })
  .filter(Boolean)
  .map(function (linea) {
   return linea.replace(/^(?:\d+(?:\.\d+)*[.)]\s+|[IVXLCDM]+\.\s+)/, '');
  });
}

function partesBase(texto) {
 var src = String(texto || '').trim();
 if (!src) return [];
 var corte = src.search(/(?:^|\n)\s*base legal\s*:/i);
 if (corte === -1) {
  var inline = src.search(/\sbase legal\s*:/i);
  if (inline === -1) return [{ text: src, cita: false }];
  return [
   { text: src.slice(0, inline).trim(), cita: false },
   { text: src.slice(inline).trim(), cita: true }
  ];
 }
 return [
  { text: src.slice(0, corte).trim(), cita: false },
  { text: src.slice(corte).trim(), cita: true }
 ].filter(function (parte) { return parte.text; });
}

function textoConsulta(x) {
 return 'Consulta del Registro de Hidrocarburos de fecha ' +
  (fechaLarga(x.fechaConsulta) || '—') +
  ': Registro N.° ' + (x.registro || '—') +
  ', titular ' + (x.empresa || '—') +
  ', placa principal ' + (x.placa || '—') +
  ', tracto ' + (x.tracto || '—') +
  ', capacidad de ' + (x.capacidad || '—') +
  ' y ' + (x.compartimientos || '—') + '.';
}

function armarDocumento(x) {
 var d = x || {};
 var fecha = fechaLarga(d.fecha);
 var recomendaciones = lineas(d.recomendaciones);

 return {
  titulo: 'INFORME DE SUPERVISIÓN',
  numero: d.numeroInforme || '«osinumero»',
  lugarFecha: [d.ciudad, fecha].filter(Boolean).join(', '),
  expediente: d.expediente || '',
  destinatario: d.destinatario || '',
  supervisor: d.supervisor || '',
  cargo: d.cargoSupervisor || '',
  asunto: d.asunto || '',
  referencia: d.referencia || '',
  empresaSupervisora: d.empresaSupervisora || '',
  objetivo: String(d.objetivo || '').trim(),
  antecedentes: lineas(d.antecedentes),
  baseLegal: lineas(d.baseLegal),
  descripcion: String(d.descripcion || '').trim(),
  direccion: String(d.direccion || '').trim(),
  visita: lineas(d.visita),
  observaciones: (Array.isArray(d.observaciones) ? d.observaciones : (observaciones || [])).map(function (obs) {
   return {
    tipo: obs.tipo || 'OTRAS OBSERVACIONES',
    base: obs.base || '',
    descripcion: obs.descripcion || '',
    medio: obs.medio || ''
   };
  }),
  consulta: {
   expediente: d.expediente || '',
   registro: d.registro || '',
   ruc: d.ruc || '',
   titular: d.empresa || '',
   direccion: d.direccionLegal || '',
   departamento: d.departamento || '',
   provincia: d.provincia || '',
   distrito: d.distrito || '',
   placa: d.placa || '',
   tracto: d.tracto || '',
   compartimientos: d.compartimientos || '',
   producto: d.producto || '',
   capacidad: d.capacidad || '',
   fechaEmision: fechaCorta(d.fechaEmision),
   vigencia: d.vigencia || '',
   representante: d.representante || '',
   texto: textoConsulta(d)
  },
  fuente: 'Fuente: Acta de Fiscalización de Seguridad de Medios de Transporte de Combustibles Líquidos y OPDH N° ' +
   (d.expediente || '—') + '.',
  anexoIntro: 'De la visita realizada a la unidad vehicular se recabó la documentación señalada en el Acta de Fiscalización.',
  anexos: lineas(d.anexos),
  romanos: ROMANOS,
  conclusionIntro: 'De la visita de fiscalización a la unidad vehicular se concluye lo siguiente:',
  conclusiones: lineas(d.conclusiones),
  recomendacionIntro: 'Por lo expuesto en el presente informe, se recomienda:',
  recomendaciones: recomendaciones,
  notaPie: recomendaciones.some(function (texto) { return /PAS/i.test(texto); })
   ? NOTA_PIE
   : '',
  representante: d.representante || '',
  dniRepresentante: d.dniRepresentante || '',
  cip: d.cipSupervisor || '',
  tieneDescargo: !!d.tieneDescargo,
  descargos: d.descargos || ''
 };
}

function tituloHtml(numero, texto) {
 return '<p class="doc-sec">' + esc(numero) + ' <span>' + esc(texto) + '</span></p>';
}

function itemHtml(numero, texto, clase) {
 return '<p class="' + (clase || 'doc-item') + '"><strong>' +
  esc(numero) + '</strong> ' + esc(texto) + '</p>';
}

function fichaHtml(consulta) {
 var pares = [
  ['Expediente:', consulta.expediente],
  ['Número de Registro:', consulta.registro],
  ['RUC:', consulta.ruc],
  ['Razón Social:', consulta.titular],
  ['Dirección Legal:', consulta.direccion],
  ['Departamento:', consulta.departamento],
  ['Provincia:', consulta.provincia],
  ['Distrito:', consulta.distrito],
  ['Placa Principal:', consulta.placa],
  ['Placa de Tracto:', consulta.tracto],
  ['Compartimiento:', consulta.compartimientos],
  ['Producto:', consulta.producto],
  ['Capacidad Autorizada (gln):', consulta.capacidad],
  ['Fecha de Emisión:', consulta.fechaEmision],
  ['Fecha de Vigencia:', consulta.vigencia],
  ['Representante:', consulta.representante]
 ].filter(function (par) { return par[1]; });

 return '<table class="doc-ficha">' +
  '<tr><th class="doc-ficha-titulo" colspan="2">Registro de Hidrocarburos</th></tr>' +
  '<tr><th class="doc-ficha-sub" colspan="2">Datos del Transporte de Combustibles Líquidos</th></tr>' +
  pares.map(function (par) {
   return '<tr><th>' + esc(par[0]) + '</th><td>' + esc(par[1]) + '</td></tr>';
  }).join('') +
  '</table>';
}

function tablaHechosHtml(lista) {
 var filas = (lista || []).map(function (obs) {
  var base = partesBase(obs.base).map(function (parte) {
   return '<p class="' + (parte.cita ? 'doc-cita' : '') + '">' +
    esc(parte.text) + '</p>';
  }).join('');
  return '<tr>' +
   '<td class="doc-tipo">' + esc(obs.tipo || 'OTRAS OBSERVACIONES') + '</td>' +
   '<td>' + base + '</td>' +
   '<td>' + esc(obs.descripcion || '') + '</td>' +
   '<td class="doc-medio">' + esc(obs.medio || '') + '</td>' +
   '</tr>';
 }).join('');

 if (!filas) {
  filas = '<tr><td class="doc-vacio" colspan="4">Sin observaciones registradas.</td></tr>';
 }

 return '<table class="doc-hechos">' +
  '<colgroup><col style="width:16%"><col style="width:42%"><col style="width:28%"><col style="width:14%"></colgroup>' +
  '<thead><tr>' +
  '<th>N.º</th>' +
  '<th>INCUMPLIMIENTO NORMATIVO – BASE LEGAL</th>' +
  '<th>DESCRIPCIÓN DEL INCUMPLIMIENTO VERIFICADO</th>' +
  '<th>MEDIO PROBATORIO</th>' +
  '</tr></thead><tbody>' + filas + '</tbody></table>';
}

function renderDocumento(doc) {
 var consulta = doc.consulta || {};
 var visita = doc.visita || [];
 var notaIndice = -1;
 (doc.recomendaciones || []).forEach(function (texto, i) {
  if (notaIndice === -1 && doc.notaPie && /PAS/i.test(texto)) notaIndice = i;
 });
 if (notaIndice === -1 && doc.notaPie && doc.recomendaciones.length) {
  notaIndice = doc.recomendaciones.length - 1;
 }

 var html = '' +
  '<article class="doc-hoja">' +
  '<div class="doc-top">' +
  '<img src="assets/logo-informe.png" alt="Logotipo de supervisión de transporte de combustibles">' +
  '<p class="doc-top-empresa">' + esc(doc.empresaSupervisora || 'SUPERVISIÓN TÉCNICA DEMOSTRATIVA E.I.R.L.') + '</p>' +
  '</div>' +
  '<div class="doc-titulo-wrap">' +
  '<div></div>' +
  '<div class="doc-titulo-centro">' +
  '<p class="doc-titulo">INFORME DE SUPERVISIÓN</p>' +
  '<p class="doc-numero">N° ' + esc(doc.numero || '«osinumero»') + '</p>' +
  '</div>' +
  '<div class="doc-cc"><p>Otros Destinatarios</p><p>C/c:</p></div>' +
  '</div>' +
  '<p class="doc-fechalinea">' + esc(doc.lugarFecha) + ' &nbsp;&nbsp; Expediente: ' + esc(doc.expediente) + '</p>' +
  '<table class="doc-memo">' +
  '<tr class="doc-separa"><th class="doc-negrita">A:</th><td class="doc-negrita">' + esc(doc.destinatario || '—') + '</td></tr>' +
  '<tr><th class="doc-negrita">De:</th><td class="doc-negrita">' + esc(doc.supervisor || '—') + '</td></tr>' +
  '<tr class="doc-separa"><th></th><td>' + esc(doc.cargo || '') + '</td></tr>' +
  '<tr><th>Asunto:</th><td>' + esc(doc.asunto || '—') + '</td></tr>' +
  '<tr class="doc-separa"><th>Referencia:</th><td>' + esc(doc.referencia || '—') + '</td></tr>' +
  '</table>' +
  tituloHtml('1.', 'OBJETIVO:') +
  '<p class="doc-texto">' + esc(doc.objetivo || '') + '</p>' +
  tituloHtml('2.', 'ANTECEDENTES:') +
  (doc.antecedentes || []).map(function (texto, i) {
   return itemHtml('2.' + (i + 1) + '.', texto);
  }).join('') +
  tituloHtml('2.', 'BASE LEGAL:') +
  (doc.baseLegal || []).map(function (texto, i) {
   return itemHtml('2.' + (i + 1) + '.', texto);
  }).join('') +
  tituloHtml('3.', 'DESCRIPCION GENERAL:') +
  itemHtml('3.1.', doc.descripcion || '') +
  '<p class="doc-centro">IMAGEN N° 01 CONSULTA EN LÍNEA DEL REGISTRO DE HIDROCARBUROS</p>' +
  '<table class="doc-consulta"><tr><td>' + fichaHtml(consulta) + '</td></tr>' +
  '<tr><td>' + esc(consulta.texto || '') + '</td></tr></table>' +
  '<p class="doc-sub">3.2. DIRECCION</p>' +
  '<p class="doc-texto">' + esc(doc.direccion || '') + '</p>' +
  '<p class="doc-sub">3.3. DE LA VISITA DE FISCALIZACIÓN</p>';

 if (visita[0]) html += itemHtml('3.3.1.', visita[0], 'doc-item doc-item-2');

 html += '<p class="doc-centro"><u>TABLA Nº 01 Hechos Constatados, Consignados En El Acta De Fiscalización:</u></p>' +
  tablaHechosHtml(doc.observaciones) +
  '<p class="doc-fuente">' + esc(doc.fuente || '') + '</p>';

 visita.slice(1).forEach(function (texto, i) {
  html += itemHtml('3.3.' + (i + 2) + '.', texto, 'doc-item doc-item-2');
 });

 if (doc.tieneDescargo && String(doc.descargos || '').trim()) {
  html += tituloHtml('', 'ANÁLISIS DE DESCARGOS:');
  lineas(doc.descargos).forEach(function (texto) {
   html += '<p class="doc-texto">' + esc(texto) + '</p>';
  });
 }

 html += tituloHtml('4.', 'ANEXO:') +
  '<p class="doc-texto">' + esc(doc.anexoIntro) + '</p>' +
  (doc.anexos || []).map(function (texto, i) {
   return itemHtml((ROMANOS[i] || (i + 1)) + '.', texto);
  }).join('') +
  tituloHtml('5.', 'CONCLUSIONES:') +
  '<p class="doc-texto">' + esc(doc.conclusionIntro) + '</p>' +
  (doc.conclusiones || []).map(function (texto, i) {
   return '<p class="doc-item"><strong>5.' + (i + 1) + '. ' + esc(texto) + '</strong></p>';
  }).join('') +
  tituloHtml('6.', 'RECOMENDACIONES:') +
  '<p class="doc-texto">' + esc(doc.recomendacionIntro) + '</p>' +
  (doc.recomendaciones || []).map(function (texto, i) {
   var nota = i === notaIndice ? '<sup class="doc-nota">1</sup>' : '';
   return '<p class="doc-item">6.' + (i + 1) + '. ' + esc(texto) + nota + '</p>';
  }).join('') +
  '<p class="doc-atentamente">Atentamente.</p>' +
  '<table class="doc-firmas"><tr>' +
  '<td><div class="doc-firma-espacio"></div><strong>' + esc(doc.representante || '—') +
  '</strong><span>DNI N° ' + esc(doc.dniRepresentante || '—') +
  '</span><span>Representante Legal</span><strong>' +
  esc(doc.empresaSupervisora || '') + '</strong></td>' +
  '<td><div class="doc-firma-espacio"></div><strong>' + esc(doc.supervisor || '—') +
  '</strong><span>CIP N° ' + esc(doc.cip || '—') +
  '</span><span>Fiscalizador</span><strong>' +
  esc(doc.empresaSupervisora || '') + '</strong></td>' +
  '</tr></table>';

 if (doc.notaPie) {
  html += '<p class="doc-nota-pie"><sup>1</sup> ' + esc(doc.notaPie) + '</p>';
 }

 html += '</article>';
 return html;
}

function renderVistaDocumento(x) {
 var vista = document.getElementById('vista');
 if (!vista) return;
 documentoActual = armarDocumento(x);
 vista.innerHTML = renderDocumento(documentoActual);
}

function pintarObservaciones() {
 var caja = document.getElementById('obsItems');
 if (!caja) return;
 caja.replaceChildren();

 if (!observaciones.length) {
  var vacio = document.createElement('p');
  vacio.textContent = 'Aún no hay observaciones en la tabla.';
  caja.appendChild(vacio);
  return;
 }

 observaciones.forEach(function (obs, indice) {
  var card = document.createElement('div');
  card.className = 'obs-card';

  var titulo = document.createElement('strong');
  titulo.textContent = (indice + 1) + '. ' + (obs.tipo || 'OTRAS OBSERVACIONES');

  var desc = document.createElement('p');
  desc.textContent = obs.descripcion || '';

  var medio = document.createElement('p');
  medio.textContent = obs.medio || '';

  var quitar = document.createElement('button');
  quitar.type = 'button';
  quitar.className = 'btn-eliminar';
  quitar.textContent = 'Quitar';
  quitar.onclick = function () {
   observaciones.splice(indice, 1);
   pintarObservaciones();
   if (typeof vista === 'function' && typeof datos === 'function') vista(datos());
  };

  card.append(titulo, desc, medio, quitar);
  caja.appendChild(card);
 });
}

function cargarObservaciones(lista) {
 observaciones = (lista || []).map(function (obs) {
  return {
   tipo: obs.tipo || 'OTRAS OBSERVACIONES',
   base: obs.base || '',
   descripcion: obs.descripcion || '',
   medio: obs.medio || ''
  };
 });
 pintarObservaciones();
}

function aplicarModelo() {
 if (typeof nuevoInforme === 'function') nuevoInforme();

 Object.keys(MODELO_INFORME).forEach(function (id) {
  if (id === 'observaciones' || id === 'tieneDescargo') return;
  var campo = document.getElementById(id);
  if (campo) campo.value = MODELO_INFORME[id] || '';
 });

 var check = document.getElementById('tieneDescargo');
 var zona = document.getElementById('zonaDescargo');
 if (check) check.checked = false;
 if (zona) zona.hidden = true;

 cargarObservaciones(MODELO_INFORME.observaciones);
 if (typeof vista === 'function' && typeof datos === 'function') vista(datos());
}

async function enviarWord(documento) {
 var respuesta = await fetch('/api/informes/docx', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ documento: documento })
 });

 var tipo = respuesta.headers.get('content-type') || '';
 if (!respuesta.ok || tipo.indexOf('wordprocessingml') === -1) {
  var mensaje = 'No se pudo generar el Word';
  try {
   var error = await respuesta.json();
   if (error.error) mensaje = error.error;
  } catch (e) {
   mensaje = 'Reinicie el servidor con npm start e intente descargar de nuevo.';
  }
  throw new Error(mensaje);
 }

 var blob = await respuesta.blob();
 var nombre = 'Informe_Supervision_' +
  String(documento.expediente || 'modelo').replace(/[^\w.-]+/g, '_') +
  '.docx';
 var url = URL.createObjectURL(blob);
 var enlace = document.createElement('a');
 enlace.href = url;
 enlace.download = nombre;
 document.body.appendChild(enlace);
 enlace.click();
 enlace.remove();
 URL.revokeObjectURL(url);
}

async function descargarInforme(x) {
 var documento = x
  ? armarDocumento(Object.assign({}, x, {
   observaciones: Array.isArray(x.observaciones) ? x.observaciones : []
  }))
  : (documentoActual || armarDocumento(typeof datos === 'function' ? datos() : MODELO_INFORME));
 var boton = document.activeElement;
 if (boton && boton.tagName === 'BUTTON') boton.disabled = true;
 try {
  await enviarWord(documento);
 } catch (error) {
  alert(error.message);
 } finally {
  if (boton && boton.tagName === 'BUTTON') boton.disabled = false;
 }
}

function agregarObservacion() {
 var base = document.getElementById('obsBase').value.trim();
 var descripcion = document.getElementById('obsDesc').value.trim();
 var medio = document.getElementById('obsMedio').value.trim();
 if (!base && !descripcion && !medio) {
  alert('Escriba al menos la base legal o la descripción de la observación.');
  return;
 }
 observaciones.push({
  tipo: document.getElementById('obsTipo').value.trim() || 'OTRAS OBSERVACIONES',
  base: base,
  descripcion: descripcion,
  medio: medio
 });
 document.getElementById('obsBase').value = '';
 document.getElementById('obsDesc').value = '';
 document.getElementById('obsMedio').value = '';
 pintarObservaciones();
 if (typeof vista === 'function' && typeof datos === 'function') vista(datos());
}

document.addEventListener('DOMContentLoaded', function () {
 var cargar = document.getElementById('btnCargarModelo');
 var descargar = document.getElementById('btnDescargarWord');
 var descargarForm = document.getElementById('btnDescargarForm');
 var agregar = document.getElementById('btnAgregarObs');
 var form = document.getElementById('form');

 if (cargar) cargar.addEventListener('click', aplicarModelo);
 if (descargar) descargar.addEventListener('click', function () { descargarInforme(); });
 if (descargarForm) descargarForm.addEventListener('click', function () { descargarInforme(); });
 if (agregar) agregar.addEventListener('click', agregarObservacion);

 if (form) {
  form.addEventListener('input', function () {
   if (typeof vista === 'function' && typeof datos === 'function') vista(datos());
  });
 }

 aplicarModelo();
});

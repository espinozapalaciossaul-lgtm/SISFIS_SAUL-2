const fs = require('fs');
const path = require('path');
const {
 AlignmentType,
 BorderStyle,
 Document,
 FootnoteReferenceRun,
 Header,
 HeightRule,
 ImageRun,
 Packer,
 Paragraph,
 ShadingType,
 Table,
 TableCell,
 TableRow,
 TextRun,
 UnderlineType,
 VerticalAlign,
 WidthType
} = require('docx');

const POP = 'Poppins';
const LOGO = path.join(__dirname, '..', 'public', 'assets', 'logo-informe.png');

const SIN = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const SIN_BORDES = {
 top: SIN, bottom: SIN, left: SIN, right: SIN,
 insideHorizontal: SIN, insideVertical: SIN
};
const LINEA = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const DOBLE = { style: BorderStyle.DOUBLE, size: 4, color: '000000' };
const BORDES = {
 top: LINEA, bottom: LINEA, left: LINEA, right: LINEA,
 insideHorizontal: LINEA, insideVertical: LINEA
};
const BORDES_DOBLES = {
 top: DOBLE, bottom: DOBLE, left: DOBLE, right: DOBLE,
 insideHorizontal: DOBLE, insideVertical: DOBLE
};

function txt(valor) {
 return String(valor ?? '').trim();
}

function run(texto, opciones = {}) {
 return new TextRun({
  text: txt(texto),
  font: POP,
  size: opciones.size || 19,
  bold: !!opciones.bold,
  italics: !!opciones.italics,
  color: opciones.color,
  underline: opciones.underline ? { type: UnderlineType.SINGLE } : undefined
 });
}

function parrafo(texto, opciones = {}) {
 return new Paragraph({
  alignment: opciones.align || AlignmentType.BOTH,
  spacing: {
   before: opciones.before ?? 0,
   after: opciones.after ?? 0,
   line: opciones.line ?? 276,
   lineRule: 'auto'
  },
  indent: opciones.indent,
  border: opciones.border,
  children: opciones.children || [run(texto, opciones)]
 });
}

function titulo(numero, texto) {
 return parrafo('', {
  before: 160,
  after: 60,
  children: [
   run(numero + '  ', { bold: true }),
   run(texto, { bold: true, underline: true })
  ]
 });
}

function item(numero, texto, opciones = {}) {
 const hijos = [
  run(numero + '  ', { bold: !!opciones.numBold, size: opciones.size || 19 }),
  run(texto, { bold: !!opciones.bold, size: opciones.size || 19 })
 ];

 if (opciones.nota) {
  hijos.push(new FootnoteReferenceRun({
   children: [new Paragraph({
    children: [run(opciones.nota, { size: 16 })]
   })]
  }));
 }

 return parrafo('', {
  before: opciones.before ?? 120,
  indent: { left: opciones.left ?? 721, hanging: opciones.hanging ?? 437 },
  children: hijos
 });
}

function celda(children, opciones = {}) {
 return new TableCell({
  width: opciones.width ? { size: opciones.width, type: WidthType.DXA } : undefined,
  verticalAlign: opciones.valign || VerticalAlign.TOP,
  margins: opciones.margins || { top: 40, bottom: 40, left: 60, right: 60 },
  borders: opciones.borders || SIN_BORDES,
  shading: opciones.fill ? { type: ShadingType.CLEAR, fill: opciones.fill } : undefined,
  columnSpan: opciones.span,
  children: children.length ? children : [new Paragraph('')]
 });
}

function tablaLibre(filas, anchos) {
 return new Table({
  width: { size: anchos.reduce((a, b) => a + b, 0), type: WidthType.DXA },
  columnWidths: anchos,
  borders: SIN_BORDES,
  rows: filas
 });
}

function partesBase(texto) {
 const src = txt(texto);
 if (!src) return [];
 const corte = src.search(/(?:^|\n)\s*base legal\s*:/i);
 if (corte === -1) {
  const inline = src.search(/\sbase legal\s*:/i);
  if (inline === -1) return [{ text: src, cita: false }];
  return [
   { text: src.slice(0, inline).trim(), cita: false },
   { text: src.slice(inline).trim(), cita: true }
  ];
 }
 return [
  { text: src.slice(0, corte).trim(), cita: false },
  { text: src.slice(corte).trim(), cita: true }
 ].filter(parte => parte.text);
}

function encabezado(empresa) {
 const marca = empresa || 'SUPERVISIÓN TÉCNICA DEMOSTRATIVA E.I.R.L.';
 const lineaNombre = {
  ...SIN_BORDES,
  bottom: { style: BorderStyle.SINGLE, size: 16, color: '0B2545' }
 };
 const lineaLogo = {
  ...SIN_BORDES,
  bottom: { style: BorderStyle.SINGLE, size: 18, color: '6FBF2B' }
 };
 const logo = fs.existsSync(LOGO)
  ? [new ImageRun({
   type: 'png',
   data: fs.readFileSync(LOGO),
   transformation: { width: 84, height: 84 },
   altText: {
    title: 'Logotipo',
    description: 'Logotipo de supervisión de transporte de combustibles',
    name: 'Logotipo'
   }
  })]
  : [run('')];

 return new Header({
  children: [new Table({
   width: { size: 9356, type: WidthType.DXA },
   columnWidths: [1500, 7856],
   borders: SIN_BORDES,
   rows: [new TableRow({
    height: { value: 1500, rule: HeightRule.ATLEAST },
    children: [
     celda([new Paragraph({
      alignment: AlignmentType.LEFT,
      children: logo
     })], {
      width: 1500,
      valign: VerticalAlign.CENTER,
      borders: lineaLogo,
      margins: { top: 40, bottom: 80, left: 0, right: 80 }
     }),
     celda([new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [run(marca, {
       size: 22,
       bold: true,
       color: '0B2545'
      })]
     })], {
      width: 7856,
      valign: VerticalAlign.CENTER,
      borders: lineaNombre,
      margins: { top: 40, bottom: 80, left: 120, right: 80 }
     })
    ]
   })]
  })]
 });
}

function bloqueTitulo(doc) {
 return tablaLibre([new TableRow({
  children: [
   celda([new Paragraph('')], { width: 2480 }),
   celda([
    parrafo(doc.titulo || 'INFORME DE SUPERVISIÓN', {
     align: AlignmentType.CENTER,
     line: 276,
     children: [run(doc.titulo || 'INFORME DE SUPERVISIÓN', { size: 24, bold: true })]
    }),
    parrafo('N° ' + (doc.numero || '«osinumero»'), {
     align: AlignmentType.CENTER,
     line: 276,
     children: [run('N° ' + (doc.numero || '«osinumero»'), { size: 24, bold: true })]
    })
   ], { width: 4395 }),
   celda([
    parrafo('Otros Destinatarios', {
     align: AlignmentType.LEFT,
     line: 240,
     children: [run('Otros Destinatarios', { size: 16 })]
    }),
    parrafo('C/c:', {
     align: AlignmentType.LEFT,
     line: 240,
     children: [run('C/c:', { size: 16 })]
    })
   ], {
    width: 2480,
    borders: { ...SIN_BORDES, left: { style: BorderStyle.SINGLE, size: 8, color: '000000' } }
   })
  ]
 })], [2480, 4395, 2480]);
}

function memo(doc) {
 const fila = (etiqueta, valor, opciones = {}) => new TableRow({
  children: [
   celda([parrafo(etiqueta, {
    align: AlignmentType.LEFT,
    after: opciones.after || 0,
    children: [run(etiqueta, { bold: opciones.bold !== false, size: 19 })]
   })], { width: 1500 }),
   celda([parrafo(valor || '—', {
    after: opciones.after || 0,
    children: [run(valor || '—', { bold: !!opciones.valorBold, size: 19 })]
   })], { width: 7855 })
  ]
 });

 return tablaLibre([
  fila('A:', doc.destinatario, { valorBold: true, after: 80 }),
  fila('De:', doc.supervisor, { valorBold: true }),
  fila('', doc.cargo, { bold: false, after: 80 }),
  fila('Asunto:', doc.asunto, { bold: false }),
  fila('Referencia:', doc.referencia, { bold: false, after: 80 })
 ], [1500, 7855]);
}

function fichaRegistro(consulta) {
 const c = consulta || {};
 const pares = [
  ['Expediente:', c.expediente],
  ['Número de Registro:', c.registro],
  ['RUC:', c.ruc],
  ['Razón Social:', c.titular],
  ['Dirección Legal:', c.direccion],
  ['Departamento:', c.departamento],
  ['Provincia:', c.provincia],
  ['Distrito:', c.distrito],
  ['Placa Principal:', c.placa],
  ['Placa de Tracto:', c.tracto],
  ['Compartimiento:', c.compartimientos],
  ['Producto:', c.producto],
  ['Capacidad Autorizada (gln):', c.capacidad],
  ['Fecha de Emisión:', c.fechaEmision],
  ['Fecha de Vigencia:', c.vigencia],
  ['Representante:', c.representante]
 ].filter(par => txt(par[1]));

 const filas = [
  new TableRow({
   children: [celda([parrafo('Registro de Hidrocarburos', {
    align: AlignmentType.LEFT,
    line: 240,
    children: [run('Registro de Hidrocarburos', { size: 16, bold: true, color: 'FFFFFF' })]
   })], { span: 2, fill: '5B9BD5', width: 7800 })]
  }),
  new TableRow({
   children: [celda([parrafo('Datos del Transporte de Combustibles Líquidos', {
    align: AlignmentType.LEFT,
    line: 240,
    children: [run('Datos del Transporte de Combustibles Líquidos', {
     size: 15, bold: true, color: 'FFFFFF'
    })]
   })], { span: 2, fill: '1F4E79', width: 7800 })]
  })
 ];

 pares.forEach(par => {
  filas.push(new TableRow({
   children: [
    celda([parrafo(par[0], {
     align: AlignmentType.LEFT,
     line: 230,
     children: [run(par[0], { size: 14, bold: true, color: '1F4E79' })]
    })], { width: 2600, fill: 'D6E3F0' }),
    celda([parrafo(par[1], {
     align: AlignmentType.LEFT,
     line: 230,
     children: [run(par[1], { size: 14, color: '1F4E79' })]
    })], { width: 5200, fill: 'F3F8FC' })
   ]
  }));
 });

 return new Table({
  width: { size: 7800, type: WidthType.DXA },
  columnWidths: [2600, 5200],
  borders: {
   top: { style: BorderStyle.SINGLE, size: 8, color: '1F4E79' },
   bottom: { style: BorderStyle.SINGLE, size: 8, color: '1F4E79' },
   left: { style: BorderStyle.SINGLE, size: 8, color: '1F4E79' },
   right: { style: BorderStyle.SINGLE, size: 8, color: '1F4E79' },
   insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: '8FA8C4' },
   insideVertical: { style: BorderStyle.SINGLE, size: 4, color: '8FA8C4' }
  },
  rows: filas
 });
}

function tablaConsulta(doc) {
 const consulta = doc.consulta || {};
 return new Table({
  width: { size: 8489, type: WidthType.DXA },
  columnWidths: [8489],
  indent: { size: 280, type: WidthType.DXA },
  borders: BORDES_DOBLES,
  rows: [
   new TableRow({
    children: [celda([
     new Paragraph({ alignment: AlignmentType.CENTER, children: [] }),
     fichaRegistro(consulta)
    ], { width: 8489, borders: BORDES_DOBLES })]
   }),
   new TableRow({
    children: [celda([
     parrafo(consulta.texto || '')
    ], { width: 8489, borders: BORDES_DOBLES })]
   })
  ]
 });
}

function tablaHechos(observaciones) {
 const anchos = [1324, 3419, 2188, 1132];
 const encabezados = [
  'N.º',
  'INCUMPLIMIENTO NORMATIVO – BASE LEGAL',
  'DESCRIPCIÓN DEL INCUMPLIMIENTO VERIFICADO',
  'MEDIO PROBATORIO'
 ];
 const cabecera = new TableRow({
  tableHeader: true,
  children: encabezados.map((texto, i) => celda([
   parrafo(texto, {
    align: AlignmentType.CENTER,
    line: 240,
    children: [run(texto, { size: 15, bold: true, color: 'FFFFFF' })]
   })
  ], {
   width: anchos[i],
   fill: '0070C0',
   borders: BORDES,
   valign: VerticalAlign.CENTER
  }))
 });

 const cuerpo = (observaciones || []).map(obs => {
  const base = partesBase(obs.base).map(parte => parrafo(parte.text, {
   line: 240,
   before: 40,
   children: [run(parte.text, { size: 16, bold: parte.cita, italics: parte.cita })]
  }));
  return new TableRow({
   children: [
    celda([parrafo(obs.tipo || 'OTRAS OBSERVACIONES', {
     align: AlignmentType.CENTER,
     line: 240,
     children: [run(obs.tipo || 'OTRAS OBSERVACIONES', { size: 15, bold: true })]
    })], { width: anchos[0], borders: BORDES, valign: VerticalAlign.CENTER }),
    celda(base.length ? base : [new Paragraph('')], { width: anchos[1], borders: BORDES }),
    celda([parrafo(obs.descripcion || '', {
     line: 240,
     children: [run(obs.descripcion || '', { size: 16 })]
    })], { width: anchos[2], borders: BORDES }),
    celda([parrafo(obs.medio || '', {
     align: AlignmentType.CENTER,
     line: 240,
     children: [run(obs.medio || '', { size: 15 })]
    })], { width: anchos[3], borders: BORDES, valign: VerticalAlign.CENTER })
   ]
  });
 });

 if (!cuerpo.length) {
  cuerpo.push(new TableRow({
   children: [celda([parrafo('Sin observaciones registradas.', {
    align: AlignmentType.CENTER
   })], { width: 8063, span: 4, borders: BORDES })]
  }));
 }

 return new Table({
  width: { size: 8063, type: WidthType.DXA },
  columnWidths: anchos,
  indent: { size: 500, type: WidthType.DXA },
  borders: BORDES,
  rows: [cabecera, ...cuerpo]
 });
}

function firmas(doc) {
 const bloque = (nombre, documentoId, cargo) => [
  new Paragraph({
   alignment: AlignmentType.CENTER,
   spacing: { before: 280 },
   border: {
    bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 1 }
   },
   children: [run(' ', { size: 19 })]
  }),
  parrafo(nombre || '—', {
   align: AlignmentType.CENTER,
   before: 60,
   line: 240,
   children: [run(nombre || '—', { bold: true })]
  }),
  parrafo(documentoId, {
   align: AlignmentType.CENTER,
   line: 240,
   children: [run(documentoId)]
  }),
  parrafo(cargo, {
   align: AlignmentType.CENTER,
   line: 240,
   children: [run(cargo)]
  }),
  parrafo(doc.empresaSupervisora || '', {
   align: AlignmentType.CENTER,
   line: 240,
   children: [run(doc.empresaSupervisora || '', { bold: true })]
  })
 ];

 return new Table({
  width: { size: 8647, type: WidthType.DXA },
  columnWidths: [4330, 4317],
  alignment: AlignmentType.CENTER,
  borders: SIN_BORDES,
  rows: [new TableRow({
   children: [
    celda(bloque(
     doc.representante,
     'DNI N° ' + (doc.dniRepresentante || '—'),
     'Representante Legal'
    ), { width: 4330 }),
    celda(bloque(
     doc.supervisor,
     'CIP N° ' + (doc.cip || '—'),
     'Fiscalizador'
    ), { width: 4317 })
   ]
  })]
 });
}

function construir(doc) {
 const hijos = [
  bloqueTitulo(doc),
  parrafo((doc.lugarFecha || '') + '   Expediente: ' + (doc.expediente || ''), {
   align: AlignmentType.LEFT,
   before: 80,
   after: 120
  }),
  memo(doc),
  titulo('1.', 'OBJETIVO:'),
  parrafo(doc.objetivo || '', { before: 80, indent: { left: 284 } }),
  titulo('2.', 'ANTECEDENTES:')
 ];

 (doc.antecedentes || []).forEach((texto, i) => {
  hijos.push(item('2.' + (i + 1) + '.', texto));
 });

 hijos.push(titulo('2.', 'BASE LEGAL:'));
 (doc.baseLegal || []).forEach((texto, i) => {
  hijos.push(item('2.' + (i + 1) + '.', texto));
 });

 hijos.push(titulo('3.', 'DESCRIPCION GENERAL:'));
 hijos.push(item('3.1.', doc.descripcion || ''));
 hijos.push(parrafo(
  doc.imagenTitulo || 'IMAGEN N° 01 CONSULTA EN LÍNEA DEL REGISTRO DE HIDROCARBUROS',
  {
   align: AlignmentType.CENTER,
   before: 160,
   after: 80,
   children: [run(
    doc.imagenTitulo || 'IMAGEN N° 01 CONSULTA EN LÍNEA DEL REGISTRO DE HIDROCARBUROS',
    { bold: true }
   )]
  }
 ));
 hijos.push(tablaConsulta(doc));
 hijos.push(item('3.2.', 'DIRECCION', { bold: true, numBold: true, before: 160 }));
 hijos.push(parrafo(doc.direccion || '', { before: 60, indent: { left: 851 } }));
 hijos.push(item('3.3.', 'DE LA VISITA DE FISCALIZACIÓN', {
  bold: true, numBold: true, before: 160
 }));

 const visita = doc.visita || [];
 if (visita[0]) hijos.push(item('3.3.1.', visita[0], { left: 992, hanging: 567 }));

 hijos.push(parrafo(
  doc.tablaTitulo || 'TABLA Nº 01 Hechos Constatados, Consignados En El Acta De Fiscalización:',
  {
   align: AlignmentType.CENTER,
   before: 140,
   after: 80,
   children: [run(
    doc.tablaTitulo || 'TABLA Nº 01 Hechos Constatados, Consignados En El Acta De Fiscalización:',
    { bold: true, underline: true }
   )]
  }
 ));
 hijos.push(tablaHechos(doc.observaciones));
 hijos.push(parrafo(doc.fuente || '', { before: 80, indent: { left: 709 } }));

 visita.slice(1).forEach((texto, i) => {
  hijos.push(item('3.3.' + (i + 2) + '.', texto, { left: 992, hanging: 567 }));
 });

 if (doc.tieneDescargo && txt(doc.descargos)) {
  hijos.push(titulo('', 'ANÁLISIS DE DESCARGOS:'));
  txt(doc.descargos).split(/\n+/).filter(Boolean).forEach(linea => {
   hijos.push(parrafo(linea, { before: 80, indent: { left: 284 } }));
  });
 }

 hijos.push(titulo('4.', 'ANEXO:'));
 hijos.push(parrafo(doc.anexoIntro || '', { before: 80, indent: { left: 284 } }));
 (doc.anexos || []).forEach((texto, i) => {
  hijos.push(item((doc.romanos[i] || (i + 1)) + '.', texto, {
   size: 18, left: 720, hanging: 360
  }));
 });

 hijos.push(titulo('5.', 'CONCLUSIONES:'));
 hijos.push(parrafo(doc.conclusionIntro || '', { before: 80, indent: { left: 284 } }));
 (doc.conclusiones || []).forEach((texto, i) => {
  hijos.push(item('5.' + (i + 1) + '.', texto, { bold: true, numBold: true }));
 });

 hijos.push(titulo('6.', 'RECOMENDACIONES:'));
 hijos.push(parrafo(doc.recomendacionIntro || '', { before: 80, indent: { left: 284 } }));

 const recomendaciones = doc.recomendaciones || [];
 let notaUsada = false;
 recomendaciones.forEach((texto, i) => {
  const llevaNota = !notaUsada && doc.notaPie &&
   (/PAS/i.test(texto) || i === recomendaciones.length - 1);
  if (llevaNota) notaUsada = true;
  hijos.push(item('6.' + (i + 1) + '.', texto, {
   size: 18,
   nota: llevaNota ? doc.notaPie : undefined
  }));
 });

 hijos.push(parrafo('Atentamente.', {
  align: AlignmentType.LEFT,
  before: 280,
  indent: { left: 284 }
 }));
 hijos.push(firmas(doc));

 return new Document({
  creator: 'SISFIS',
  title: 'Informe de Supervisión ' + (doc.numero || ''),
  description: 'Informe de fiscalización con el formato del modelo. Datos ficticios de capacitación.',
  sections: [{
   properties: {
    page: {
     size: { width: 11907, height: 16839 },
     margin: {
      top: 2100, right: 1134, bottom: 851, left: 1418, header: 280, footer: 340
     }
    }
   },
   headers: { default: encabezado(doc.empresaSupervisora) },
   children: hijos
  }]
 });
}

async function generarDocx(documento) {
 return Packer.toBuffer(construir(documento || {}));
}

module.exports = { generarDocx };

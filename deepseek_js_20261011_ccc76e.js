/* ============================================================
   FALC · Upgrade de PDF, encabezado, tabla y PWA
   Este archivo hace todo el trabajo. No modifica el index.html.
   ============================================================ */

(function(){
  'use strict';

  /* 1. Inyectar el manifest de la PWA */
  if(!document.querySelector('link[rel="manifest"]')){
    var lm = document.createElement('link');
    lm.rel = 'manifest';
    lm.href = './manifest.json';
    document.head.appendChild(lm);
  }

  /* 2. Registrar el Service Worker (scope /test/) */
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./service-worker.js', { scope: './' })
      .then(function(){ console.log('[FALC] SW registrado en /test/'); })
      .catch(function(e){ console.warn('[FALC] SW error:', e); });
  }

  /* 3. Metadatos del formato FALC */
  window.FALC_META = {
    codigo:  'FALC-XX',
    version: '01',
    fecha:   '___/___/______'
  };

  /* 4. Relación contratista → contrato */
  window.CONTRATOS_POR_CONTRATISTA = {
    'Vactor':  'CTO-___',
    'Ingemac': 'CTO-___',
    'Succión': 'CTO-___'
  };

  window.falcContratoDe = function(contratista){
    if(!contratista) return '';
    var k = Object.keys(window.CONTRATOS_POR_CONTRATISTA)
      .find(function(x){ return x.toLowerCase() === String(contratista).toLowerCase(); });
    return k ? window.CONTRATOS_POR_CONTRATISTA[k] : '';
  };

  /* 5. Reemplazo completo de falcImprimirV16 */
  window.falcImprimirV16 = function(datos, referencia, tipo){

    var esc = function(x){
      return String(x == null ? '' : x).replace(/[&<>"']/g, function(c){
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
      });
    };

    var id = datos.identidad || {};
    var tr = Array.isArray(datos.tramos) ? datos.tramos : [];
    var fechaActividad = String(id.fecha || '');
    var partes = fechaActividad.split(/[-\/]/);
    var anio = partes[0] || '';
    var mes  = partes[1] || '';
    var dia  = partes[2] || '';

    var horaIni = String(datos.horaInicio || '');
    var h = parseInt(horaIni.split(':')[0], 10);
    var esDiurna = !horaIni || (h >= 6 && h < 18);
    var jornadaTxt = esDiurna ? '☑ Diurna   ☐ Nocturna' : '☐ Diurna   ☑ Nocturna';
    var contrato = window.falcContratoDe(datos.contratista);

    /* --- Construir filas de la tabla --- */
    var filasReales = tr.map(function(t){
      return '<tr>'
        + '<td>' + esc(datos.horaInicio||'') + '</td>'
        + '<td>' + esc(datos.horaFin||'') + '</td>'
        + '<td>' + esc(t.codigo||t.tramo||'') + '</td>'
        + '<td>' + esc(t.mhArriba||'') + '</td>'
        + '<td>' + esc(t.mhAbajo||'') + '</td>'
        + '<td>' + esc(t.diametro||datos.diametro||'') + '</td>'
        + '<td>' + esc(t.material||datos.material||'') + '</td>'
        + '<td>' + esc(t.aptoCCTV||t.apto||'') + '</td>'
        + '<td>' + esc(t.ml||'') + '</td>'
        + '<td>' + esc(t.observacion||'') + '</td>'
        + '</tr>';
    }).join('');

    var filasVacias = Math.max(0, 10 - tr.length);
    var filasRayadas = Array.from({length: filasVacias}, function(){
      return '<tr class="fila-rayada">' + Array(10).fill('<td>&nbsp;</td>').join('') + '</tr>';
    }).join('');

    var marcaCierre = '<tr class="fin-registros"><td colspan="10">— FIN DE REGISTROS —</td></tr>';

    var tablaCompleta = filasReales + marcaCierre + filasRayadas;

    /* --- Pie --- */
    var pie = ''
      + '<div class="pie-linea"><b>ORIGEN:</b> ' + esc(tipo) + ' &nbsp;·&nbsp; <b>REFERENCIA:</b> ' + esc(referencia) + '</div>';

    /* --- Documento completo --- */
    var pagina = '<!doctype html><html lang="es"><head><meta charset="utf-8"><title>FALC-XX · ' + esc(referencia) + '</title>'
      + '<style>'
      + '@page{size:A4 landscape;margin:9mm}'
      + '*{box-sizing:border-box}'
      + 'body{font:9px Arial,Helvetica,sans-serif;color:#232b31;margin:0;background:white}'
      + '.documento{width:100%;margin:0 auto}'
      + '.cabecera{display:grid;grid-template-columns:16% 68% 16%;height:18mm;border:1px solid #6e7a81}'
      + '.logo{border-right:1px solid #6e7a81;display:flex;align-items:center;justify-content:center;padding:1mm}'
      + '.logo img{max-width:95%;max-height:16mm;object-fit:contain}'
      + '.titulo{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:3px;font-size:12px;font-weight:700}'
      + '.control{border-left:1px solid #6e7a81;display:flex;flex-direction:column;justify-content:space-evenly;padding:1mm;font-size:8px}'
      + '.campos{display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid #6e7a81;border-right:1px solid #6e7a81;border-bottom:1px solid #6e7a81}'
      + '.campos.segunda{grid-template-columns:repeat(3,1fr);border-top:0}'
      + '.campo{height:12mm;border-right:1px solid #6e7a81;padding:1.5mm 2mm;overflow:hidden}'
      + '.campo:last-child{border-right:0}'
      + '.campo b{display:block;font-size:8px}'
      + '.campo span{display:block;font-size:11px;margin-top:1.3mm}'
      + '.seccion{display:flex;justify-content:space-between;margin:5mm 0 1.2mm;font-size:10px;font-weight:700}'
      + 'table{width:100%;border-collapse:collapse;table-layout:fixed}'
      + 'th,td{border:1px solid #6e7a81;padding:2mm 1mm;text-align:left;font-size:8px;vertical-align:top}'
      + 'th{background:#f5f7f8;font-size:7.5px;height:9mm}'
      + 'td{height:9mm}'
      + '.fin-registros td{height:6mm;text-align:center;font-size:7px;font-weight:bold;background:#f5f7f8;letter-spacing:.05em}'
      + '.fila-rayada td{height:9mm;background:repeating-linear-gradient(45deg,#f5f7f8 0,#f5f7f8 1px,#ffffff 1px,#ffffff 8px)}'
      + '.novedades{margin-top:5mm;border:1px solid #6e7a81;min-height:19mm;padding:2mm;font-size:8px}'
      + '.resumen{display:grid;grid-template-columns:repeat(4,1fr);margin-top:3mm;font-size:8px}'
      + '.resumen div{border:1px solid #6e7a81;padding:2mm;min-height:12mm}'
      + '.resumen div+div{border-left:0}'
      + '.leyenda{margin-top:3mm;font-size:7.5px;color:#59656c;line-height:1.4}'
      + '.firmas{display:grid;grid-template-columns:1fr 1fr;gap:10mm;margin-top:8mm;font-size:8px}'
      + '.firmas div{border-top:1px solid #232b31;padding-top:2mm}'
      + '.pie-linea{margin-top:3mm;border-top:1px solid #6e7a81;padding-top:2mm;font-size:8px}'
      + '@media print{.herramientas{display:none!important}}'
      + '@media screen{body{background:#e9edef;padding:20px}.documento{background:white;padding:9mm;max-width:297mm;box-shadow:0 2px 18px #0002}.herramientas{max-width:297mm;margin:0 auto 12px;display:flex;gap:10px}}'
      + '</style></head><body>'
      + '<div class="herramientas">'
      + '<button onclick="window.print()">Imprimir / Guardar PDF</button>'
      + '<button onclick="window.close()">Cerrar</button>'
      + '</div>'
      + '<main class="documento">'

      /* --- Cabecera --- */
      + '<header class="cabecera">'
      + '<div class="logo"><img src="./logo.png" alt="Aguas de Cartagena"></div>'
      + '<div class="titulo"><span>CONTROL DIARIO MANTENIMIENTO PREVENTIVO</span><span>LIMPIEZA CON EQUIPO PRESIÓN SUCCIÓN</span></div>'
      + '<div class="control">'
      + '<b>Código: ' + esc(window.FALC_META.codigo) + '</b>'
      + '<span>Versión: ' + esc(window.FALC_META.version) + '</span>'
      + '<span>Fecha: ' + esc(window.FALC_META.fecha) + '</span>'
      + '</div>'
      + '</header>'

      /* --- Franja de campos --- */
      + '<div class="campos">'
      + '<div class="campo"><b>AÑO</b><span>' + esc(anio) + '</span></div>'
      + '<div class="campo"><b>MES</b><span>' + esc(mes) + '</span></div>'
      + '<div class="campo"><b>DÍA</b><span>' + esc(dia) + '</span></div>'
      + '<div class="campo"><b>EQUIPO COMBINADO (PLACA)</b><span>' + esc(id.placa) + '</span></div>'
      + '</div>'
      + '<div class="campos segunda">'
      + '<div class="campo"><b>JORNADA</b><span>' + jornadaTxt + '</span></div>'
      + '<div class="campo"><b>BARRIO</b><span>' + esc(id.barrio) + '</span></div>'
      + '<div class="campo"><b>CONTRATISTA</b><span>' + esc(datos.contratista||'') + '</span></div>'
      + '</div>'
      + '<div class="campos segunda">'
      + '<div class="campo"><b>CONTRATO #</b><span>' + esc(contrato) + '</span></div>'
      + '<div class="campo"><b>OPERADOR</b><span>' + esc(datos.operador||'') + '</span></div>'
      + '<div class="campo"></div>'
      + '</div>'

      /* --- Tabla --- */
      + '<div class="seccion"><span>REGISTRO DE ACTIVIDAD POR TRAMO</span><span>FALC-XX</span></div>'
      + '<table><thead><tr>'
      + '<th>H. INICIO</th><th>H. FINAL</th><th>TRAMO</th><th>MH ARRIBA</th><th>MH ABAJO</th>'
      + '<th>DIÁMETRO</th><th>MATERIAL</th><th>APTO CCTV</th><th>LONGITUD</th><th>OBSERVACIONES</th>'
      + '</tr></thead><tbody>' + tablaCompleta + '</tbody></table>'

      /* --- Novedades --- */
      + '<section class="novedades"><b>NOVEDADES Y CONTINUIDAD OPERATIVA</b><br>' + esc(datos.novedad||'Sin novedades declaradas') + '</section>'

      /* --- Resumen --- */
      + '<div class="resumen">'
      + '<div><b>LONGITUD TOTAL APTA (ML)</b><p></p></div>'
      + '<div><b>HORA NETA</b><p></p></div>'
      + '<div><b>AGUA TOTAL (M3)</b><p></p></div>'
      + '<div><b>DESCARGA LODOS</b><p>[ ] DENTRO   [ ] FUERA</p></div>'
      + '</div>'

      /* --- Leyenda --- */
      + '<div class="leyenda">'
      + 'Leyenda: tramo NO apto = longitud en blanco y motivo en observaciones.<br>'
      + 'En continuidad indicar tramo, condición y acción pendiente.<br>'
      + 'Si no hay pendientes, escribir SIN PENDIENTES.<br>'
      + 'La longitud reportada queda sujeta a validación del supervisor.'
      + '</div>'

      /* --- Firmas --- */
      + '<div class="firmas">'
      + '<div>OPERADOR / FIRMA</div>'
      + '<div>Vo.Bo. / FIRMA SUPERVISOR</div>'
      + '</div>'

      /* --- Línea de origen --- */
      + pie

      + '</main></body></html>';

    var w = window.open('', '_blank');
    if(!w){ alert('Habilita ventanas emergentes para ver el PDF.'); return; }
    w.document.open();
    w.document.write(pagina);
    w.document.close();
    w.focus();
  };

  console.log('[FALC] Upgrade aplicado correctamente.');
})();
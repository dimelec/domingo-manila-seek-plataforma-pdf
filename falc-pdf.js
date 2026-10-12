/* ============================================================
   FALC · Generador de PDF · Formato institucional
   Uso: <script src="./falc-pdf.js"></script>
   Expone: window.falcImprimirFALC(datos, referencia, tipo, winExistente)
   ============================================================ */
(function(){
  'use strict';

  var LOGO_B64 = "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";

  var FILAS_PLIEGO = 10;

  var FALC_META = {
    codigo: 'FALC-XX',
    version: '01',
    fecha: '___/___/________'
  };

  var CONTRATOS = {
    'Vactor':  'CTO-VACTOR-XXXX',
    'Ingemac': 'CTO-INGEMAC-XXXX',
    'Succión': 'CTO-SUCCION-XXXX'
  };

  function norm(s){return String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}

  function falcContratoDe(ct){
    var n=norm(ct);
    var k=Object.keys(CONTRATOS).find(function(x){return norm(x)===n;});
    return k?CONTRATOS[k]:'';
  }

  function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];});}

  function fmtHora12(hhmm){
    if(!hhmm)return '';
    var p=String(hhmm).split(':');
    if(p.length<2)return hhmm;
    var h=Number(p[0]);
    var m=String(p[1]).padStart(2,'0');
    var sufijo=h>=12?'p. m.':'a. m.';
    h=h%12||12;
    return String(h).padStart(2,'0')+':'+m+' '+sufijo;
  }

  function partesFecha(fecha){
  if(!fecha)return {anio:'',mes:'',dia:'',diaNum:'',diaNombre:''};
  var d=new Date(fecha+'T12:00:00');
  if(isNaN(d))return {anio:'',mes:'',dia:'',diaNum:'',diaNombre:''};
  var dias=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  var anio=String(d.getFullYear());
  var mes=String(d.getMonth()+1).padStart(2,'0');
  var diaNum=String(d.getDate()).padStart(2,'0');
  var diaNombre=dias[d.getDay()];
  return {anio:anio,mes:mes,dia:diaNombre+' '+Number(diaNum),diaNum:diaNum,diaNombre:diaNombre};
}

  function calcularHoraNeta(hi,hf){
    if(!hi||!hf)return '';
    var a=String(hi).split(':').map(Number);
    var b=String(hf).split(':').map(Number);
    var min=(b[0]*60+b[1])-(a[0]*60+a[1]);
    if(min<0)min+=24*60;
    if(min>=8*60)min-=60;
    return String(Math.floor(min/60)).padStart(2,'0')+':'+String(min%60).padStart(2,'0');
  }

  function normalizar(datos,referencia,tipo){
    var id=datos.identidad||{};
    var tramosRaw=Array.isArray(datos.tramos)?datos.tramos:[];

    var tramos=tramosRaw.map(function(t){
      var apto=String(t.aptoCCTV||t.apto||'').toUpperCase();
      return {
        horaInicio: String(t.horaInicio||datos.horaInicio||''),
        horaFin:    String(t.horaFin||datos.horaFin||''),
        tramo:      String(t.tramo||t.codigo||''),
        mhArriba:   String(t.mhArriba||''),
        mhAbajo:    String(t.mhAbajo||''),
        diametro:   String(t.diametro||datos.diametro||''),
        material:   String(t.material||datos.material||''),
        aptoCCTV:   apto==='SI'?'Sí':'No',
        longitud:   (t.longitud!=null?t.longitud:(t.ml!=null?t.ml:'')),
        observacion:String(t.observacion||'')
      };
    });

    var totalApto=tramos.filter(function(t){return t.aptoCCTV==='Sí';}).reduce(function(s,t){return s+Number(t.longitud||0);},0);

    var j=String(id.jornada||'').toUpperCase();
    var jornadaTexto='';
    if(j.indexOf('DIURN')>=0)jornadaTexto='[X] Diurna';
    else if(j.indexOf('NOCTURN')>=0)jornadaTexto='[X] Nocturna';

    return {
      referencia:String(referencia||''),
      tipo:String(tipo||''),
      identidad:{
        fechaActividad:String(id.fechaActividad||id.fecha||''),
        placa:String(id.placa||''),
        barrio:String(id.barrio||''),
        jornada:jornadaTexto,
        horaInicio:String(datos.horaInicio||''),
        horaFin:String(datos.horaFin||'')
      },
      contratista:String(datos.contratista||''),
      contrato:falcContratoDe(datos.contratista),
      operador:String(datos.operador||'').toUpperCase(),
      inspector:String(datos.inspector||''),
      tramos:tramos,
      novedades:String(datos.novedad||datos.novedades||'Sin novedades registradas.'),
      resumen:{
        longitudTotalApta:totalApto?totalApto.toFixed(2):'—',
        aguaM3:String(datos.aguaM3||datos.agua||''),
        lodos:String(datos.lodos||'').toUpperCase().trim()
      },
      origen:'ORIGEN: '+tipo.toUpperCase()+' · REF: '+referencia+' · GENERADO: '+new Date().toLocaleString('es-CO')+' · POR: '+(((window.V8&&V8.nombre)||datos.operador||'—').toUpperCase())
    };
  }

  function construirHTML(datos){
    var id=datos.identidad;
    var tr=datos.tramos;
    var partes=partesFecha(id.fechaActividad);

    var filasDatos=tr.map(function(t){
      return '<tr>'
        +'<td>'+esc(fmtHora12(t.horaInicio))+'</td>'
        +'<td>'+esc(fmtHora12(t.horaFin))+'</td>'
        +'<td>'+esc(t.tramo)+'</td>'
        +'<td>'+esc(t.mhArriba)+'</td>'
        +'<td>'+esc(t.mhAbajo)+'</td>'
        +'<td>'+esc(t.diametro)+'</td>'
        +'<td>'+esc(t.material)+'</td>'
        +'<td>'+esc(t.aptoCCTV)+'</td>'
        +'<td>'+esc(t.longitud)+'</td>'
        +'<td>'+esc(t.observacion)+'</td>'
        +'</tr>';
    }).join('');

    var hayMarca=tr.length<FILAS_PLIEGO;
    var marca=hayMarca?'<tr class="fin-registros"><td colspan="10">— FIN DE REGISTROS —</td></tr>':'';
    var filasLibres=Math.max(0,FILAS_PLIEGO-tr.length-(hayMarca?1:0));
    var rayadas=Array.from({length:filasLibres},function(){
      return '<tr class="fila-rayada">'+Array.from({length:10},function(){return '<td>&nbsp;</td>';}).join('')+'</tr>';
    }).join('');

    var horaNeta=calcularHoraNeta(id.horaInicio,id.horaFin);
    var tieneLodos=datos.resumen.lodos==='DENTRO'||datos.resumen.lodos==='FUERA';
    var lodosD=tieneLodos&&datos.resumen.lodos==='DENTRO'?'X':' ';
    var lodosF=tieneLodos&&datos.resumen.lodos==='FUERA' ?'X':' ';

    return '<!doctype html><html lang="es"><head><meta charset="utf-8"><title>FALC-XX · '+esc(datos.referencia)+'</title><style>'
      +'@page{size:A4 landscape;margin:9mm}*{box-sizing:border-box}'
      +'body{font:9px Arial,Helvetica,sans-serif;color:#232b31;margin:0;background:white}'
      +'.documento{width:100%;max-width:279mm;margin:0 auto}'
      +'table.falc{width:100%;border-collapse:collapse;table-layout:fixed}'
      +'table.falc>tbody>tr>td,table.falc>tbody>tr>th,table.falc>thead>tr>th{border:1px solid #6e7a81;padding:1.5mm 2mm;vertical-align:middle;overflow-wrap:anywhere}'
      +'.celda-logo{text-align:center;padding:1mm!important}.celda-logo img{display:block;margin:0 auto;max-width:95%;max-height:16mm;object-fit:contain}'
      +'.celda-titulo{text-align:center;font-size:11px;font-weight:700;line-height:1.15}'
      +'.celda-control{font-size:8px;line-height:1.5;padding:1.5mm 2mm!important}.celda-control div{white-space:nowrap}'
      +'tr.separador td{height:3mm;border:none!important;border-left:1px solid #6e7a81!important;border-right:1px solid #6e7a81!important;padding:0}'
      +'.franja-campo{height:9mm;font-size:9px}.franja-campo b{font-weight:700}'
      +'.unidades-4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;align-items:center}'
      +'.unidades-2{display:grid;grid-template-columns:1fr 1fr;align-items:center}'
      +'.unidad{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
      +'thead th{background:#f5f7f8;font-size:7.5px;text-align:center;height:9mm;font-weight:700;line-height:1.15}'
      +'tbody td{font-size:8px;height:8mm}'
      +'tr.fin-registros td{height:5mm;text-align:center;font-size:8px;font-weight:700;letter-spacing:.08em;background:#e8ebee}'
      +'tr.fila-rayada td{background-image:repeating-linear-gradient(45deg,transparent,transparent 4mm,rgba(120,130,140,.30) 4mm,rgba(120,130,140,.30) 4.3mm);background-color:#fbfcfd}'
      +'.bloque-inferior td{vertical-align:top;padding:2mm 2.5mm}'
      +'.resumen-celda{padding:2mm 2.5mm;border-right:1px solid #6e7a81}.resumen-celda:last-child{border-right:0}'
      +'.resumen-celda b{display:block;font-size:8px;margin-bottom:1.2mm;font-weight:700}.resumen-celda .valor{font-size:11px;font-weight:700}'
      +'.novedades-txt{font-size:9px;line-height:1.35;white-space:pre-wrap}'
      +'.leyenda{font-size:7.5px;line-height:1.4}.leyenda ul{margin:0;padding-left:4mm}'
      +'.firmas{margin-top:6mm;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10mm}'
      +'.firma{padding:0 2mm}.firma .nombre{font-size:10px;font-weight:700;margin-bottom:6mm;min-height:4mm}'
      +'.firma .linea{border-top:1px solid #232b31;padding-top:1.2mm;font-size:8px}'
      +'.pie-origen{margin-top:4mm;padding-top:1.5mm;border-top:1px solid #6e7a81;display:flex;justify-content:space-between;font-size:8px;gap:6mm}'
      +'.pie-origen .izq{flex:1}.pie-origen .der{white-space:nowrap;font-weight:700}'
      +'@media screen{body{background:#e9edef;padding:20px}.documento{background:white;padding:9mm;min-height:210mm;box-shadow:0 2px 18px #0002}}'
      +'@media print{.documento{padding:0;min-height:0}}'
      +'</style></head><body><main class="documento"><table class="falc">'

      +'<tr>'
      +'<td class="celda-logo" colspan="3"><img src="./Logo%20Acu.png" alt="Aguas de Cartagena"></td>'
      +'<td class="celda-titulo" colspan="5">CONTROL DIARIO MANTENIMIENTO PREVENTIVO<br>LIMPIEZA CON EQUIPO PRESION SUCCION</td>'
      +'<td class="celda-control" colspan="2">'
      +'<div><b>Código:</b> '+esc(FALC_META.codigo)+'</div>'
      +'<div><b>Versión:</b> '+esc(FALC_META.version)+'</div>'
      +'<div><b>Fecha emisión:</b> '+esc(FALC_META.fecha)+'</div>'
      +'</td></tr>'

      +'<tr class="separador"><td colspan="10"></td></tr>'

      +'<tr><td class="franja-campo" colspan="10"><div class="unidades-4">'
      +'<span class="unidad"><b>Fecha jornada:</b> '+esc(partes.anio)+'/'+esc(partes.mes)+'/'+esc(partes.diaNum)+' ('+esc(partes.diaNombre)+')</span>'
      +'<span class="unidad"><b>Equipo combinado (Placa):</b> '+esc(id.placa)+'</span>'
      +'<span class="unidad"><b>Jornada:</b> '+esc(id.jornada)+'</span>'
      +'<span class="unidad"><b>Barrio:</b> '+esc(id.barrio)+'</span>'
      +'</div></td></tr>'

      +'<tr><td class="franja-campo" colspan="10"><div class="unidades-2">'
      +'<span class="unidad"><b>Contratista:</b> '+esc(datos.contratista)+'</span>'
      +'<span class="unidad"><b>Contrato #:</b> '+esc(datos.contrato)+'</span>'
      +'</div></td></tr>'

      +'<tr class="separador"><td colspan="10"></td></tr>'

      +'<tr>'
      +'<th style="width:8%">HORAS<br>INICIO</th>'
      +'<th style="width:8%">HORA<br>FINAL</th>'
      +'<th style="width:7%">TRAMO</th>'
      +'<th style="width:9%">MH<br>ARRIBA</th>'
      +'<th style="width:9%">MH<br>ABAJO</th>'
      +'<th style="width:7%">DIÁ-<br>METRO</th>'
      +'<th style="width:9%">MATERIAL</th>'
      +'<th style="width:10%">APTO INSPECCIÓN<br>CCTV</th>'
      +'<th style="width:8%">LONGITUD</th>'
      +'<th style="width:25%">OBSERVACIONES DEL TRAMO</th>'
      +'</tr>'
      +filasDatos+marca+rayadas

      +'<tr class="separador"><td colspan="10"></td></tr>'

      +'<tr class="bloque-inferior"><td colspan="10" style="padding:0">'
      +'<div style="display:grid;grid-template-columns:3fr 1fr">'
      +'<div style="border-right:1px solid #6e7a81">'
      +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;border-bottom:1px solid #6e7a81">'
      +'<div class="resumen-celda"><b>LONGITUD TOTAL APTA (ML)</b><span class="valor">'+esc(datos.resumen.longitudTotalApta)+'</span></div>'
      +'<div class="resumen-celda"><b>HORA NETA</b><span class="valor">'+esc(horaNeta||'—')+'</span></div>'
      +'<div class="resumen-celda"><b>AGUA TOTAL (M³)</b><span class="valor">'+esc(datos.resumen.aguaM3||'—')+'</span></div>'
      +'</div>'
      +'<div style="padding:2mm 2.5mm"><b style="display:block;font-size:8px;margin-bottom:1.2mm">NOVEDADES Y CONTINUIDAD OPERATIVA</b>'
      +'<div class="novedades-txt">'+esc(datos.novedades)+'</div></div>'
      +'</div>'
      +'<div>'
      +'<div style="padding:2mm 2.5mm;border-bottom:1px solid #6e7a81"><b style="display:block;font-size:8px;margin-bottom:1.2mm">DESCARGA LODOS:</b>'
+'<span style="font-size:9px">'+(tieneLodos?'['+lodosD+'] DENTRO &nbsp; ['+lodosF+'] FUERA':'—')+'</span></div>'
      +'<div class="leyenda" style="padding:2mm 2.5mm"><ul>'
      +'<li>Tramo NO apto = longitud en blanco y motivo en observaciones.</li>'
      +'<li>En continuidad indicar tramo, condición y acción pendiente.</li>'
      +'<li>Si no hay pendientes, escribir SIN PENDIENTES.</li>'
      +'<li>La longitud reportada queda sujeta a validación del supervisor.</li>'
      +'</ul></div></div></div></td></tr>'

      +'</table>'

      +'<div class="firmas">'
      +'<div class="firma"><div class="nombre">'+esc(datos.operador)+'</div><div class="linea">OPERADOR / FIRMA</div></div>'
      +'<div class="firma"><div class="nombre">'+esc(datos.inspector)+'</div><div class="linea">INSPECTOR / FIRMA</div></div>'
      +'<div class="firma"><div class="nombre">&nbsp;</div><div class="linea">Vo.Bo. SUPERVISOR / FIRMA</div></div>'
      +'</div>'

      +'<div class="pie-origen"><div class="izq">'+esc(datos.origen)+'</div><div class="der">HOJA 1 DE 1</div></div>'

      +'</main></body></html>';
  }

  window.falcImprimirFALC = function(datos,referencia,tipo,winExistente){
    var normalizado=normalizar(datos||{},referencia,tipo);
    var html=construirHTML(normalizado);
    var w=winExistente||window.open('','_blank');
    if(!w){alert('Habilita ventanas emergentes para ver el FALC-XX.');return;}
    w.document.open();w.document.write(html);w.document.close();w.focus();
  };

})();

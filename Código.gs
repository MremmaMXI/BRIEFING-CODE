/**
 * Código principal actualizado
 * - Añade endpoint para servir imágenes de Drive vía ?imageId=FILEID
 * - Mantiene la lógica original de doGet por hotel (incluye 'selector')
 * - Añade función auxiliar getDriveImageData (devuelve data URI)
 * - Incluye función abrirSelector() lista para pegar la URL de despliegue
 *
 * Importante:
 * - Después de cambiar este archivo guarda, crea una versión (Archivo → Administrar versiones)
 *   y luego Actualiza la implementación (Implementar → Gestionar implementaciones → editar → seleccionar versión → Actualizar).
 * - En la implementación: Execute as = "Me" y Who has access según necesites.
 */

/**
 * 1. MOTOR PRINCIPAL (doGet)
 * Gestiona la apertura de los diferentes archivos HTML según el parámetro "hotel"
 * Además, si se pasa imageId en la query, devuelve el blob de Drive correspondiente.
 */
function doGet(e) {
  // 0) Si piden imageId: servir el blob directamente
  if (e && e.parameter && e.parameter.imageId) {
    try {
      var fileId = e.parameter.imageId;
      var file = DriveApp.getFileById(fileId);
      var blob = file.getBlob();
      return ContentService.createResponseFromBlob(blob).setMimeType(blob.getContentType());
    } catch (err) {
      return ContentService.createTextOutput('Error al servir imagen: ' + err.message)
        .setMimeType(ContentService.MimeType.TEXT);
    }
  }

  // 1) Resto de doGet: routing por hotel
  var hotel = (e && e.parameter && e.parameter.hotel) ? e.parameter.hotel : '';

  if (hotel === "sunset") {
    return HtmlService.createHtmlOutputFromFile('Flyer')
        .setTitle('Flyer Sunset Cocktail')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  if (hotel === "joia") {
    return HtmlService.createHtmlOutputFromFile('GALA')
        .setTitle('JOIA - Invitaciones de Gala')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } else if (hotel === "waves") {
    return HtmlService.createHtmlOutputFromFile('Waves')
        .setTitle('Panel Iberostar Waves - Mar & Beach')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } else if (hotel === "app") {
    return HtmlService.createHtmlOutputFromFile('app')
        .setTitle('Guest Service Pro - Iberostar')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } else if (hotel === "ihg") {
    return HtmlService.createHtmlOutputFromFile('IHG_Panel')
        .setTitle('Iberostar Selection - IHG Rewards')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } else if (hotel === "selector") {
    return HtmlService.createHtmlOutputFromFile('Selector')
        .setTitle('Selector de Hoteles')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } else if (hotel === "sunset") {
    return HtmlService.createHtmlOutputFromFile('Flyer')
        .setTitle('Flyer Sunset Cocktail')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } else if (hotel === "showsparaiso") {
    return HtmlService.createHtmlOutputFromFile('ShowsParaiso')
        .setTitle('Shows · Paraíso Maya')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } else if (hotel === "showsmaya") {
    return HtmlService.createHtmlOutputFromFile('ShowsMaya')
        .setTitle('Shows Maya')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } else if (hotel === "minigolf") {
    return HtmlService.createHtmlOutput(`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>MINIGOLF</title>
    <style>
        :root {
            --fondo-joia: #17505a;
            --crema-joia: #e7dac5;
            --azul-oscuro: #0f353d;
            --dorado-borde: #a68966;
        }

        /* RESET */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; width: 100%; }

        body {
            font-family: 'Segoe UI', sans-serif;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            position: relative;
            background: #ffffff;
        }

        .main-viewport {
            position: relative;
            z-index: 6;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 2vmin;
            width: 100%;
            max-width: 600px;
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            padding-top: 20px;
        }

        /* HEADER */
        .header-joia {
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #000000;
            width: 100%;
            flex-shrink: 0;
            z-index: 20;
        }

        /* TITULO */
        .joia-tit {
            font-family: 'Century Gothic', 'Trebuchet MS', sans-serif;
            font-weight: 300;
            font-size: clamp(45px, 8vw, 90px);
            line-height: 1;
            margin: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            color: #000000;
            letter-spacing: 1px;
            text-align: center;
        }

        .container {
            background: transparent;
            padding: clamp(15px, 2.5vmin, 40px);
            border-radius: 0px;
            box-shadow: none;
            border-top: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 95vw;
            height: auto;
            position: relative;
            z-index: 7;
            overflow: visible;
            flex: 1;
        }

        .gala-flex {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: clamp(8px, 1.5vmin, 20px);
        }

        .gala-card {
            width: clamp(100px, 12vw, 180px);
            height: clamp(250px, 45vh, 500px);
            background: #fff;
            border-radius: clamp(10px, 1.5vw, 20px);
            overflow: hidden;
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: grab;
            position: relative;
            z-index: 10;
            box-shadow: 0 8px 18px rgba(0,0,0,0.18);
        }
        .gala-card:hover {
            width: clamp(250px, 28vw, 450px);
            transform: translateY(-30px) scale(1.05) !important;
            z-index: 999;
            box-shadow: 0 50px 90px rgba(0,0,0,0.45), 0 0 18px rgba(255,255,255,0.12);
            filter: brightness(1.06) !important;
            opacity: 1 !important;
        }

        .img-wrapper { width: 100%; height: 100%; overflow: hidden; }

        .gala-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            filter: blur(2px);
            transform: scale(1.18);
            transition: filter 0.6s ease, transform 4s linear;
        }
        .gala-card:hover img {
            filter: blur(0px);
            transform: scale(1.03);
        }

        .card-label {
            display: none;
        }

        .instrucciones {
            margin-top: auto;
            padding-bottom: 20px;
            color: rgba(0, 0, 0, 0.85);
            font-size: clamp(12px, 1.5vw, 14px);
            letter-spacing: 1px;
            text-transform: uppercase;
            text-align: center;
            z-index: 6;
            padding: 0 10px;
        }

        @media (max-width: 720px) {
            html, body {
                width: 100vw;
                height: 100vh;
                transform: rotate(0deg);
                orientation: portrait;
            }
            
            .gala-card { width: 44vw; }
            .gala-card:hover { width: 72vw; }
            .container { max-height: 80vh; padding: 4vmin; }
        }
    </style>
</head>
<body>
    <div class="main-viewport" role="main" aria-label="MINIGOLF landing">
        <div class="header-joia">
            <div class="joia-tit">MINIGOLF</div>
        </div>

        <div class="container">
            <div class="gala-flex">
                <div class="gala-card">
                    <div class="img-wrapper"><img src="https://lh3.googleusercontent.com/d/1GXSFwIlHcvNQwFp_XdZGk34XnEvKoty1" draggable="true" alt="Imagen"></div>
                    <div class="card-label"></div>
                </div>
            </div>
        </div>

        <div class="instrucciones">
            Arrastra y suelta en la bandeja de la app donde se cargan los archivos
        </div>
    </div>

    <script>
    (function () {
        // No scripts needed
    })();
    </script>
</body>
</html>`)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } else {
    return HtmlService.createHtmlOutputFromFile('Page')
        .setTitle('Panel Selection Lindo/Maya')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

/**
 * 2. FUNCIONES PARA BOTONES (ASIGNAR A DIBUJOS/IMÁGENES EN SHEETS)
 */

// Ejemplo: abrir JOIA Gala
function abrirJoiaGala() {
  var url = "https://script.google.com/a/macros/iberostar.com/s/AKfycbzzu-EQRf4Qsz9sQkyByxKgtGPtIcBm0BZ7xd2cPmji72gyhlhPChD41tDP1-wM5PYFOA/exec";
  var html = "<script>window.open('" + url + "?hotel=joia','_blank','width=900,height=650');google.script.host.close();</script>";
  var ui = HtmlService.createHtmlOutput(html).setWidth(200).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(ui, "Abriendo Gala JOIA...");
}

function abrirWaves() {
  var url = "https://script.google.com/a/macros/iberostar.com/s/AKfycbzHMIT-sD3A6Rh8_TxTAcl_uB6qieahz1BSWd3Spx6QEanQmbMr-vZZMBuQclvEzDIaBw/exec";
  var html = "<script>window.open('" + url + "?hotel=waves','_blank','width=550,height=850');google.script.host.close();</script>";
  var ui = HtmlService.createHtmlOutput(html).setWidth(200).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(ui, "Abriendo Waves...");
}

function abrirIberostarIHG() {
  var url = "https://script.google.com/a/macros/iberostar.com/s/AKfycbz38oi6fx6Qloxa7oRMGNsQzjMw1Pmeq5eHEKYFrS3velWw79mJLYmc2j5u02ei6Bz9qQ/exec";
  var html = "<script>window.open('" + url + "?hotel=ihg','_blank','width=550,height=850');google.script.host.close();</script>";
  var ui = HtmlService.createHtmlOutput(html).setWidth(200).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(ui, "Abriendo Panel IHG...");
}

function abrirApp() {
  var url = "https://script.google.com/a/macros/iberostar.com/s/AKfycbz38oi6fx6Qloxa7oRMGNsQzjMw1Pmeq5eHEKYFrS3velWw79mJLYmc2j5u02ei6Bz9qQ/exec";
  var html = "<script>window.open('" + url + "?hotel=app','_blank','width=1200,height=850');google.script.host.close();</script>";
  var ui = HtmlService.createHtmlOutput(html).setWidth(200).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(ui, "Abriendo Guest Service Pro...");
}

function abrirPanel() {
  var url = "https://script.google.com/a/macros/iberostar.com/s/AKfycbzzu-EQRf4Qsz9sQkyByxKgtGPtIcBm0BZ7xd2cPmji72gyhlhPChD41tDP1-wM5PYFOA/exec";
  var html = "<script>window.open('" + url + "?hotel=selection','_blank','width=550,height=800');google.script.host.close();</script>";
  var ui = HtmlService.createHtmlOutput(html).setWidth(200).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(ui, "Abriendo Selection...");
}

function abrirSelector() {
  var url = "https://script.google.com/a/macros/iberostar.com/s/AKfycbzHMIT-sD3A6Rh8_TxTAcl_uB6qieahz1BSWd3Spx6QEanQmbMr-vZZMBuQclvEzDIaBw/exec";
  var html = "<script>window.open('" + url + "?hotel=selector','_blank','width=1200,height=900');google.script.host.close();</script>";
  var ui = HtmlService.createHtmlOutput(html).setWidth(200).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(ui, "Abriendo Selector...");
}

function abrirFlyerSunset() {
  var url = "https://script.google.com/a/macros/iberostar.com/s/AKfycbzStF8n0AejxyaQcD9JPQWjmUuEqSZgcl-F5-kDa96ZFr9QUQcP5RoEq4lLG9GWSTXXyA/exec?hotel=sunset";

  var html = '<!DOCTYPE html>' +
    '<html><head><base target="_top">' +
    '<style>html,body{margin:0;padding:0;background:transparent;}</style>' +
    '</head><body>' +
    '<script>' +
      'window.open("' + url + '","FlyerSunset","width=1150,height=820,left=200,top=80,resizable=yes");' +
      'google.script.host.close();' +
    '</script>' +
    '</body></html>';

  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(html).setWidth(1).setHeight(1),
    ' '
  );
}

/**
 * 3. UTILIDADES PARA IMAGENES (opcionales)
 */

function getDriveImageData(fileId) {
  var file = DriveApp.getFileById(fileId);
  var blob = file.getBlob();
  var bytes = blob.getBytes();
  var base64 = Utilities.base64Encode(bytes);
  return 'data:' + blob.getContentType() + ';base64,' + base64;
}

function inspectDriveFile() {
  var fileId = 'PEGA_AQUI_EL_FILEID_PARA_INSPECCION';
  try {
    var f = DriveApp.getFileById(fileId);
    Logger.log('Name: ' + f.getName());
    Logger.log('MimeType: ' + f.getMimeType());
    Logger.log('Size: ' + f.getSize());
    Logger.log('URL: ' + f.getUrl());
  } catch (err) {
    Logger.log('ERROR: ' + err.message);
  }
}

/**
 * GalaManager.gs - Versión V30 corregida y completa (actualizada)
 *
 * Cambios importantes aplicados (resumen):
 * - Reestructurado layout de tabla: 3 nuevas filas encima de HAB/CONCIERGE.
 *   Fila 178 (TABLE_START_ROW): "Fecha de hoy" — solo informativa, cambia automáticamente.
 *   Fila 179 (SELECTOR_ROW): "Seleccionar fecha" — dropdown con fechas del registro.
 *   Fila 180 (MOSTRANDO_ROW): "Mostrando: [fecha]" — muestra qué fecha está cargada.
 *   Fila 181 (TITLES_ROW): HAB / CONCIERGE — antes en fila 179.
 *   Filas 182–210 (DATA_START_ROW..DATA_END_ROW): 29 filas de datos.
 *   Fila 212 (VERSION_LABEL_ROW): etiqueta de versión.
 * - updateHoyRow(): nueva función que actualiza la fila 178 con la fecha de hoy.
 * - updateMostrandoRow(fechaLabel): nueva función que actualiza la fila 180.
 * - updateSelectorRow(): renombrada de ensureSelectorMergedAndStyled(), opera en fila 179.
 * - Selector siempre regresa a "Seleccionar fecha" después de cargar una fecha.
 * - Eliminado bloqueo de 3 minutos post-archivo.
 * - Detecta el ancho REAL ocupado por la tabla (escaneando contenido y merges) y usa ese ancho
 *   para copiar a REGISTRO_GALA y para limpiar/contraer en la hoja principal.
 * - archivar(): ahora copia TODAS las columnas ocupadas (no solo storedWidth), y luego
 *   elimina las columnas insertadas más allá de la base (X..AA) usando un borrado
 *   "forzado" de las columnas insertadas para garantizar que la hoja vuelva a X..AA.
 * - cargarTablaDesdeRegistro() y clearTableAndReset() limpian primero el área REAL ocupada
 *   antes de escribir para evitar solapes/residuos que impidan carga.
 * - safeBreakApartRange / safeMergeRange usados ampliamente para evitar excepciones de merges.
 * - Añadido detectActualTableWidth() y helpers relacionados.
 *
 * Nota: Haz backup del script actual antes de reemplazar.
 */

/* ---------------------- RGManager.gs (completo con modificaciones solicitadas) ---------------------- */

const MAIN_SHEET_NAME = 'MENSAJES GALA JOIA';
const REG_SHEET_NAME = 'REGISTRO_GALA';

const TABLE_START_ROW = 178;   // fila "Fecha de hoy" — solo informativa
const SELECTOR_ROW = 179;      // fila "Seleccionar fecha" — dropdown de fechas
const MOSTRANDO_ROW = 180;     // fila "Mostrando: [fecha]" — informativa
const TITLES_ROW = 181;        // fila de títulos HAB / CONCIERGE
const DATA_START_ROW = 182;    // primera fila de datos
const DATA_END_ROW = 210;      // última fila de datos
const TABLE_ROWS = DATA_END_ROW - TABLE_START_ROW + 1; // 33

const BASE_START_COL_LETTER = 'X';
const BASE_START_COL = columnLetterToIndex(BASE_START_COL_LETTER);
const BASE_PAIRS = 2;
const BASE_WIDTH = BASE_PAIRS * 2;

const ROWS_PER_COLUMN = DATA_END_ROW - DATA_START_ROW + 1;

// Visual
const SELECTOR_COLOR = '#0c343d';
const TITLE_COLOR = '#0c343d';
const ODD_ROW_BG = '#e7f1f1';
const EVEN_ROW_BG = '#ffffff';

// Nuevo concierge "SOLO SPA" añadido
const CONCIERGE_LIST = [
  'OK EMMA','OK ANGY','OK RAÚL','OK GISELA','OK ARTURO','OK ETHAN','OK CLARA','OK ROSARIO',
  'OK ALBERTO','OK EDGAR','OK ALONSO','OK DANIEL','OK MONSERRAT','OK DELFINO','OK JAVIER',
  'OK ARLETTE','OK CYNTHIA','NO TIENE APP','SOCIOS','INCIDENCIAS','OUT DEL DÍA','OK GISELL',
  'SOLO SPA'
];

const PROP_KEY_WIDTH = 'GALA_TABLE_WIDTH';
const PROP_KEY_FECHA_MAP = 'GALA_FECHA_MAP';
const PROP_KEY_LAST_ARCHIVE = 'GALA_LAST_ARCHIVE';
const PROP_KEY_VERSION_COL = 'GALA_VERSION_COL';
const PROP_KEY_UPDATE_LOCK = 'GALA_UPDATE_LOCKED';

// Nuevas props para tracking de carga/combinar
const PROP_KEY_LAST_LOADED_REG_COL = 'GALA_LAST_LOADED_REG_COL';
const PROP_KEY_LAST_COMBINED_ORIG = 'GALA_LAST_COMBINED_ORIG';

const VERSION_LABEL_TEXT = 'RGManager v115.25.0';
const VERSION_LABEL_ROW = 212;
const VERSION_LABEL_COLOR = '#0b5394';

// Nota: la "pared" está definida pero ahora el flujo de archivar contraerá la tabla
// eliminando todas las columnas insertadas más allá de BASE_WIDTH (para volver a X..AA).
const WALL_END_COL_LETTER = 'AD';
const WALL_END_COL = columnLetterToIndex(WALL_END_COL_LETTER);

/* ---------------------- UTIL ---------------------- */
function columnLetterToIndex(letter) {
  let column = 0;
  const s = (letter + '').toUpperCase();
  for (let i = 0; i < s.length; i++) column = column * 26 + (s.charCodeAt(i) - 64);
  return column;
}
function columnIndexToLetter(index) {
  let s = '';
  while (index > 0) {
    const mod = (index - 1) % 26;
    s = String.fromCharCode(65 + mod) + s;
    index = Math.floor((index - mod) / 26);
  }
  return s;
}
function getSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const main = ss.getSheetByName(MAIN_SHEET_NAME);
  const reg = ss.getSheetByName(REG_SHEET_NAME);
  if (!main) throw new Error('No se encontró la hoja "' + MAIN_SHEET_NAME + '".');
  if (!reg) throw new Error('No se encontró la hoja "' + REG_SHEET_NAME + '".');
  return { ss, main, reg };
}
function setStoredWidth(w) {
  let width = parseInt(w, 10) || BASE_WIDTH;
  if (width < BASE_WIDTH) width = BASE_WIDTH;
  if (width % 2 !== 0) width = width + 1;
  PropertiesService.getDocumentProperties().setProperty(PROP_KEY_WIDTH, String(width));
  try { updateVersionLabel(); } catch (e) { Logger.log('setStoredWidth updateVersionLabel failed: ' + e); }
}
function getStoredWidth() {
  const v = PropertiesService.getDocumentProperties().getProperty(PROP_KEY_WIDTH);
  const n = parseInt(v, 10);
  if (isNaN(n) || n < BASE_WIDTH) return BASE_WIDTH;
  return (n % 2 === 0) ? n : n + 1;
}
function normalizeStoredWidthToSheet() {
  try {
    const { main } = getSheets();
    const maxCols = main.getMaxColumns();
    const start = BASE_START_COL;
    const available = Math.max(0, maxCols - start + 1);
    let stored = getStoredWidth();
    if (stored > available) {
      let newWidth = Math.min(available, stored);
      if (newWidth < BASE_WIDTH) newWidth = BASE_WIDTH;
      if (newWidth % 2 !== 0) newWidth++;
      PropertiesService.getDocumentProperties().setProperty(PROP_KEY_WIDTH, String(newWidth));
      Logger.log('normalizeStoredWidthToSheet: adjusted storedWidth -> ' + newWidth);
    }
  } catch (e) {
    Logger.log('normalizeStoredWidthToSheet error: ' + e);
  }
}
function getEffectiveWidth(sheet, startCol, desiredWidth) {
  try {
    const maxCols = sheet.getMaxColumns();
    const available = Math.max(0, maxCols - startCol + 1);
    return Math.min(desiredWidth, Math.max(1, available));
  } catch (e) {
    Logger.log('getEffectiveWidth error: ' + e);
    return Math.max(1, desiredWidth);
  }
}
function formatDateDDMMYYYY(d) {
  if (!(d instanceof Date)) return '';
  const dd = ('0' + d.getDate()).slice(-2);
  const mm = ('0' + (d.getMonth() + 1)).slice(-2);
  const yyyy = d.getFullYear();
  return dd + '/' + mm + '/' + yyyy;
}
function serialToDate(serial) {
  if (typeof serial !== 'number') return null;
  try {
    // Convertir el serial de Excel a milisegundos UTC
    const ms = (serial - 25569) * 86400000;
    const dtUtc = new Date(ms);
    // Tomar componentes UTC y construir una fecha local a 00:00 con esos componentes
    return new Date(dtUtc.getUTCFullYear(), dtUtc.getUTCMonth(), dtUtc.getUTCDate());
  } catch (e) {
    return null;
  }
}
function parsePossibleDate(val) {
  if (val instanceof Date) return val;
  if (typeof val === 'number') return serialToDate(val);
  if (typeof val === 'string') {
    const parts = val.split('/');
    if (parts.length === 3) {
      const dd = parseInt(parts[0], 10);
      const mm = parseInt(parts[1], 10) - 1;
      const yy = parseInt(parts[2], 10);
      if (!isNaN(dd) && !isNaN(mm) && !isNaN(yy)) return new Date(yy, mm, dd);
    }
    const dt = new Date(val);
    if (!isNaN(dt.getTime())) return dt;
  }
  return null;
}
function todayStr() { return formatDateDDMMYYYY(new Date()); }

/* ---------------------- SAFE MERGE HELPERS ---------------------- */
function safeBreakApartRange(range) {
  try {
    if (!range) return;
    const sheet = range.getSheet();
    const startRow = range.getRow();
    const startCol = range.getColumn();
    const numRows = range.getNumRows();
    const numCols = range.getNumColumns();
    const endRow = startRow + numRows - 1;
    const endCol = startCol + numCols - 1;

    if (typeof sheet.getMergedRanges === 'function') {
      const allMerged = sheet.getMergedRanges();
      for (let i = 0; i < allMerged.length; i++) {
        const m = allMerged[i];
        const mr = m.getRow();
        const mc = m.getColumn();
        const mrr = mr + m.getNumRows() - 1;
        const mcc = mc + m.getNumColumns() - 1;
        const intersects = !(mrr < startRow || mr > endRow || mcc < startCol || mc > endCol);
        if (intersects) {
          try { m.breakApart(); } catch (e) { /* ignore individual failures */ }
        }
      }
    } else {
      try { range.breakApart(); } catch (e) { /* ignore */ }
    }
  } catch (e) {
    Logger.log('safeBreakApartRange error: ' + e);
  }
}
function safeMergeRange(range) {
  try {
    if (!range) return;
    safeBreakApartRange(range);
    try { range.merge(); } catch (e) { /* ignore */ }
  } catch (e) {
    Logger.log('safeMergeRange error: ' + e);
  }
}

/* ---------------------- FORCE DELETE INSERTED COLUMNS ---------------------- */
/**
 * forceDeleteInsertedColumns
 * - Borra columnas empezando en `start` por `count`, sin la restricción de "pared".
 * - Use sólo cuando queremos asegurar que la tabla vuelve a BASE_WIDTH (X..AA).
 */
function forceDeleteInsertedColumns(sheet, start, count) {
  try {
    if (!sheet || typeof start !== 'number' || start < 1 || count <= 0) return;
    const maxCols = sheet.getMaxColumns();
    const actualDelete = Math.min(count, Math.max(0, maxCols - start + 1));
    if (actualDelete <= 0) {
      Logger.log('forceDeleteInsertedColumns: nada que borrar.');
      return;
    }
    sheet.deleteColumns(start, actualDelete);
    Logger.log('forceDeleteInsertedColumns: borradas ' + actualDelete + ' columnas desde ' + start);
  } catch (e) {
    Logger.log('forceDeleteInsertedColumns error: ' + e);
  }
}

/* ---------------------- SAFE DELETE COLUMNS (preserva reservadas y pared) ---------------------- */
/**
 * safeDeleteColumns: borra columnas a partir de `start` hasta `count`,
 * pero NUNCA toca la pared fija (WALL_END_COL) por seguridad.
 * (Se mantiene para operaciones donde NO queremos "forzar" la eliminación).
 */
function safeDeleteColumns(sheet, start, count) {
  try {
    if (!sheet || typeof start !== 'number' || start < 1 || count <= 0) return;

    const tableStartCol = BASE_START_COL;
    const currentStoredWidth = getStoredWidth();
    const reservedStart = tableStartCol + currentStoredWidth;
    let lastAllowedCol = Math.max(tableStartCol + BASE_WIDTH - 1, reservedStart - 1);
    lastAllowedCol = Math.min(lastAllowedCol, WALL_END_COL - 1);

    const maxCols = sheet.getMaxColumns();

    if (start > lastAllowedCol) {
      Logger.log('safeDeleteColumns: start (' + start + ') > lastAllowedCol (' + lastAllowedCol + '). Nada que borrar.');
      return;
    }

    const maxDeletePossible = lastAllowedCol - start + 1;
    const toDelete = Math.min(count, Math.max(0, maxDeletePossible));

    if (toDelete <= 0) {
      Logger.log('safeDeleteColumns: toDelete = 0, no se borrará nada.');
      return;
    }

    const actualDelete = Math.min(toDelete, Math.max(0, maxCols - start + 1));
    if (actualDelete <= 0) { Logger.log('safeDeleteColumns: actualDelete <= 0'); return; }

    sheet.deleteColumns(start, actualDelete);
    Logger.log('safeDeleteColumns: borradas ' + actualDelete + ' columnas desde ' + start);
  } catch (e) {
    Logger.log('safeDeleteColumns error: ' + e);
  }
}

/* ---------------------- DETECTAR ANCHO REAL OCUPADO ---------------------- */
/**
 * detectActualTableWidth(sheet)
 * - Escanea desde BASE_START_COL hacia la derecha, dentro de filas TABLE_START_ROW..DATA_END_ROW,
 *   buscando la columna más a la derecha que tenga contenido (displayValue) o que participe en un merge
 *   que intersecte esas filas.
 * - Devuelve al menos BASE_WIDTH.
 */
function detectActualTableWidth(sheet) {
  try {
    const maxCols = sheet.getMaxColumns();
    const scanStart = BASE_START_COL;
    const scanRangeCols = Math.max(1, maxCols - scanStart + 1);

    // 1) Scan cell contents in table rows
    const rowsToScan = TABLE_ROWS;
    const values = sheet.getRange(TABLE_START_ROW, scanStart, rowsToScan, scanRangeCols).getDisplayValues();

    let rightmost = scanStart + BASE_WIDTH - 1; // mínimo AA
    for (let c = scanRangeCols - 1; c >= 0; c--) {
      let any = false;
      for (let r = 0; r < values.length; r++) {
        if ((values[r][c] + '').trim() !== '') { any = true; break; }
      }
      if (any) { rightmost = scanStart + c; break; }
    }

    // 2) Consider merged ranges that intersect the table rows and start at/after BASE_START_COL
    if (typeof sheet.getMergedRanges === 'function') {
      const merges = sheet.getMergedRanges();
      for (let i = 0; i < merges.length; i++) {
        const m = merges[i];
        const mr = m.getRow();
        const mrc = m.getNumRows();
        const mc = m.getColumn();
        const mcc = m.getNumColumns();
        const mrr = mr + mrc - 1;
        const mccEnd = mc + mcc - 1;
        const intersects = !(mrr < TABLE_START_ROW || mr > DATA_END_ROW || mccEnd < BASE_START_COL);
        if (intersects && mc >= BASE_START_COL) {
          if (mccEnd > rightmost) rightmost = mccEnd;
        }
      }
    }

    const width = Math.max(BASE_WIDTH, rightmost - BASE_START_COL + 1);
    return width;
  } catch (e) {
    Logger.log('detectActualTableWidth error: ' + e);
    return BASE_WIDTH;
  }
}

/* ---------------------- FECHA MAP ---------------------- */
function buildFechaMapFromRegistro() {
  const { reg } = getSheets();
  const lastCol = reg.getLastColumn();
  if (!lastCol || lastCol < 1) return {};
  const row1 = reg.getRange(1, 1, 1, lastCol).getDisplayValues()[0];
  const map = {};
  for (let c = 0; c < row1.length; c++) {
    const orig = (row1[c] + '').trim();
    if (!orig) continue;
    const labelBase = verboseDateLabelFromOriginal(orig);
    let label = labelBase;
    let suffix = 1;
    while (map[label]) { label = labelBase + ' (' + suffix + ')'; suffix++; }
    map[label] = orig;
  }
  return map;
}
function setFechaMap(map) {
  try { PropertiesService.getDocumentProperties().setProperty(PROP_KEY_FECHA_MAP, JSON.stringify(map || {})); }
  catch (e) { Logger.log('setFechaMap error: ' + e); }
}
function getFechaMap() {
  try {
    const raw = PropertiesService.getDocumentProperties().getProperty(PROP_KEY_FECHA_MAP);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) { return {}; }
}
function verboseDateLabelFromOriginal(origDateStr) {
  const d = parsePossibleDate(origDateStr);
  if (!d) return (origDateStr || '');
  const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const dayName = days[d.getDay()];
  const day = d.getDate();
  const monthName = months[d.getMonth()];
  const year = d.getFullYear();
  return `${dayName} ${day} de ${monthName} del ${year}`;
}
function setLastArchive(origDate) {
  const obj = { date: origDate, ts: Date.now() };
  PropertiesService.getDocumentProperties().setProperty(PROP_KEY_LAST_ARCHIVE, JSON.stringify(obj));
}
function getLastArchive() {
  const raw = PropertiesService.getDocumentProperties().getProperty(PROP_KEY_LAST_ARCHIVE);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) { return null; }
}

/* ---------------------- VERSION LABEL ---------------------- */
function getStoredVersionCol() {
  const v = PropertiesService.getDocumentProperties().getProperty(PROP_KEY_VERSION_COL);
  return v ? parseInt(v, 10) : null;
}
function setStoredVersionCol(col) {
  if (!col || isNaN(col)) PropertiesService.getDocumentProperties().deleteProperty(PROP_KEY_VERSION_COL);
  else PropertiesService.getDocumentProperties().setProperty(PROP_KEY_VERSION_COL, String(col));
}
function updateVersionLabel() {
  try {
    const { main } = getSheets();
    normalizeStoredWidthToSheet();
    const effWidth = getEffectiveWidth(main, BASE_START_COL, getStoredWidth());
    const rightCol = BASE_START_COL + effWidth - 1;
    const prev = getStoredVersionCol();
    const r = main.getRange(VERSION_LABEL_ROW, rightCol);
    r.setValue(VERSION_LABEL_TEXT);
    r.setFontStyle('italic');
    r.setFontColor(VERSION_LABEL_COLOR);
    r.setFontSize(10);
    r.setHorizontalAlignment('right');
    r.setVerticalAlignment('middle');
    r.setWrap(false);
    if (prev && prev !== rightCol) {
      try {
        const prevRange = main.getRange(VERSION_LABEL_ROW, prev);
        if ((prevRange.getDisplayValue() + '').indexOf('RGManager') !== -1) {
          prevRange.clearContent();
          try { prevRange.clearFormat(); } catch(e){}
        }
      } catch(e){}
    }
    setStoredVersionCol(rightCol);
  } catch (err) { Logger.log('updateVersionLabel error: ' + err); }
}

/* ---------------------- NUEVA FILA HOY & MOSTRANDO ---------------------- */
function updateHoyRow() {
  try {
    const { main } = getSheets();
    const effWidth = getEffectiveWidth(main, BASE_START_COL, getStoredWidth());
    const range = main.getRange(TABLE_START_ROW, BASE_START_COL, 1, effWidth);
    safeBreakApartRange(range);
    range.merge();
    const cell = main.getRange(TABLE_START_ROW, BASE_START_COL);
    cell.setValue(verboseDateLabelFromOriginal(todayStr()));
    cell.setBackground('#0c343d')
        .setFontColor('#ffffff')
        .setFontWeight('bold')
        .setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setFontSize(14)
        .setFontStyle('normal')
        .setWrap(false);
    main.getRange(TABLE_START_ROW, BASE_START_COL, 1, effWidth).clearDataValidations();
  } catch (e) { Logger.log('updateHoyRow error: ' + e); }
}

function setHoyRowToDate(dateLabel) {
  try {
    const { main } = getSheets();
    const effWidth = getEffectiveWidth(main, BASE_START_COL, getStoredWidth());
    const range = main.getRange(TABLE_START_ROW, BASE_START_COL, 1, effWidth);
    safeBreakApartRange(range);
    range.merge();
    const cell = main.getRange(TABLE_START_ROW, BASE_START_COL);
    cell.setValue(dateLabel)
        .setBackground('#0c343d')
        .setFontColor('#ffffff')
        .setFontWeight('bold')
        .setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setFontSize(14)
        .setFontStyle('normal')
        .setWrap(false);
    // Nunca debe tener dropdown
    main.getRange(TABLE_START_ROW, BASE_START_COL, 1, effWidth).clearDataValidations();
  } catch(e) { Logger.log('setHoyRowToDate error: ' + e); }
}

function updateMostrandoRow(fechaLabel) {
  try {
    const { main } = getSheets();
    const effWidth = getEffectiveWidth(main, BASE_START_COL, getStoredWidth());
    const range = main.getRange(MOSTRANDO_ROW, BASE_START_COL, 1, effWidth);
    safeBreakApartRange(range);
    range.merge();
    const cell = main.getRange(MOSTRANDO_ROW, BASE_START_COL);
    cell.setBackground('#0c343d');
    if (fechaLabel) {
      cell.setValue('Mostrando: ' + fechaLabel)
          .setFontColor('#ffffff')
          .setFontStyle('italic')
          .setFontSize(11)
          .setHorizontalAlignment('center')
          .setVerticalAlignment('middle')
          .setFontWeight('normal');
    } else {
      cell.setValue('selecciona una fecha')
          .setFontColor('#9aa7b0')
          .setFontStyle('italic')
          .setFontSize(11)
          .setHorizontalAlignment('center')
          .setVerticalAlignment('middle')
          .setFontWeight('normal');
    }
  } catch (e) { Logger.log('updateMostrandoRow error: ' + e); }
}

/* ---------------------- onOpen / MENU ---------------------- */
function onOpen() {
  try { addManualGalaMenu(); } catch(e){ Logger.log('addManualGalaMenu skipped: ' + e); }

  try {
    // Menú "GALA" eliminado por petición del usuario (no crear).
  } catch(e){ Logger.log('onOpen menu creation skipped: ' + e); }
  try {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('MINIGOLF')
      .addItem('Abrir MINIGOLF', 'abrirMINIGOLF')
      .addToUi();
  } catch(e){ Logger.log('onOpen MINIGOLF menu skipped: ' + e); }
  try {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Acciones')
      .addItem('Agregar', 'procesarHabitaciones')
      .addToUi();
  } catch(e){ Logger.log('onOpen Acciones menu skipped: ' + e); }
  try {
    normalizeStoredWidthToSheet();
    updateHoyRow();
    updateSelectorRow();
    updateFechaDropdown();
    updateMostrandoRow(null);
    ensureConciergeValidationOnBase();
    removeExtraEmptyColumns();
  } catch (err) { Logger.log('onOpen error: ' + err); }
}

/* ---------------------- DatePicker dialog server functions ---------------------- */
function showDatePickerDialog() {
  const html = HtmlService.createHtmlOutputFromFile('DatePicker').setWidth(360).setHeight(160);
  SpreadsheetApp.getUi().showModalDialog(html, 'Seleccionar fecha');
}
function handleDatePicked(dateIso) {
  try {
    if (!dateIso) return { ok:false, message:'No se recibió fecha.' };
    const parts = dateIso.split('-');
    if (parts.length !== 3) return { ok:false, message:'Formato inválido.' };

    const yyyy = parseInt(parts[0],10);
    const mm   = parseInt(parts[1],10) - 1;
    const dd   = parseInt(parts[2],10);
    const dt   = new Date(yyyy, mm, dd);
    const orig = formatDateDDMMYYYY(dt);
    const verboseLabel = verboseDateLabelFromOriginal(orig);

    try { normalizeStoredWidthToSheet(); } catch(e) { Logger.log('normalizeStoredWidthToSheet err: ' + e); }

    // Buscar usando buildFechaMapFromRegistro (igual que onEdit / selector fila 179)
    // porque las fechas en REGISTRO_GALA fila 1 están en formato verboso
    const map = buildFechaMapFromRegistro();
    if (map[verboseLabel]) {
      // Existe → cargar tabla (cargarTablaDesdeRegistro ya actualiza MOSTRANDO_ROW y resetea selector)
      try {
        cargarTablaDesdeRegistro(map[verboseLabel]);
        // Sobreescribir la fila 178 con la fecha seleccionada (cargarTablaDesdeRegistro llama updateHoyRow internamente)
        try { setHoyRowToDate(verboseLabel); } catch(e) { Logger.log('setHoyRowToDate err: ' + e); }
        return { ok:true };
      } catch(err) {
        Logger.log('handleDatePicked -> cargarTablaDesdeRegistro error: ' + err);
        return { ok:false, message: String(err) };
      }
    } else {
      // No existe → limpiar tabla pero NO sobreescribir fila 178 con HOY
      try {
        clearTableAndReset({ skipHoyRow: true });
        // Actualizar fila 178 con la fecha seleccionada
        try { setHoyRowToDate(verboseLabel); } catch(e) { Logger.log('setHoyRowToDate err: ' + e); }
        return { ok:true };
      } catch(err) {
        Logger.log('handleDatePicked -> clearTableAndReset error: ' + err);
        return { ok:false, message: String(err) };
      }
    }
  } catch (err) {
    Logger.log('handleDatePicked error: ' + err);
    return { ok:false, message: String(err) };
  }
}

/* ---------------------- SELECTOR MERGE & STYLE ---------------------- */
function updateSelectorRow(width) {
  const { main } = getSheets();
  const tableStartCol = BASE_START_COL;
  normalizeStoredWidthToSheet();
  const requested = (typeof width === 'number' && width >= BASE_WIDTH) ? width : getStoredWidth();
  const eff = getEffectiveWidth(main, tableStartCol, requested);
  const range = main.getRange(SELECTOR_ROW, tableStartCol, 1, eff);

  // Intentar merge seguro; si no, fallback visual por celda (sin lanzar excepciones).
  try {
    safeBreakApartRange(range);
    safeMergeRange(range);
    const sel = main.getRange(SELECTOR_ROW, tableStartCol);
    sel.setBackground(SELECTOR_COLOR)
       .setFontColor('#ffffff')
       .setFontWeight('bold')
       .setHorizontalAlignment('center')
       .setVerticalAlignment('middle')
       .setFontSize(12)
       .setWrap(false);
    // Limpiar validaciones que se derraman del merge del selector a filas vecinas
    try { main.getRange(TABLE_START_ROW, tableStartCol, 1, eff).clearDataValidations(); } catch(e){}
    try { main.getRange(MOSTRANDO_ROW, tableStartCol, 1, eff).clearDataValidations(); } catch(e){}
    try { main.getRange(TITLES_ROW, tableStartCol, 1, eff).clearDataValidations(); } catch(e){}
    return;
  } catch (err) {
    Logger.log('updateSelectorRow merge attempt failed: ' + err);
  }

  // Fallback visual sin merge
  try {
    safeBreakApartRange(range);
    const firstCell = main.getRange(SELECTOR_ROW, tableStartCol);
    const val = firstCell.getDisplayValue();
    firstCell.setValue(val);
    for (let c = 0; c < eff; c++) {
      try {
        const rc = main.getRange(SELECTOR_ROW, tableStartCol + c);
        rc.setBackground(SELECTOR_COLOR);
        rc.setFontColor('#ffffff');
        rc.setFontWeight('bold');
        rc.setHorizontalAlignment('center');
        rc.setVerticalAlignment('middle');
        rc.setFontSize(12);
        if (c !== 0) {
          try { rc.clearContent(); } catch(e){}
        }
      } catch(e){}
    }
  } catch (err2) {
    Logger.log('updateSelectorRow fallback error: ' + err2);
  }
}

/* ---------------------- ACTUALIZAR ---------------------- */
function actualizar() {
  const { main } = getSheets();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    Logger.log('actualizar: no se pudo obtener bloqueo.');
    return;
  }
  try {
    const props = PropertiesService.getDocumentProperties();
    const locked = props.getProperty(PROP_KEY_UPDATE_LOCK);
    if (locked) { Logger.log('actualizar: actualización bloqueada.'); return; }

    const urlCell = main.getRange('W178');
    const url = (urlCell.getValue() + '').trim();
    if (!url) { Logger.log('actualizar: no hay link en W178.'); return; }

    // NUEVA LÓGICA: extracción robusta y filtrado basado en cutoff (miércoles siguiente al próximo martes)
    // y filtrado por prefijos (solo incluir prefijos permitidos)
    const unique = extractRoomsFromExternalSpreadsheet(url);
    if (!unique || unique.length === 0) { Logger.log('actualizar: no quedaron habitaciones después del filtrado.'); return; }

    // Mantener el resto del flujo exactamente como antes, usando `unique` como lista de habitaciones
    const roomsRawUnique = unique; // nombre local para conservar claridad
    const neededPairs = Math.max(BASE_PAIRS, Math.ceil(roomsRawUnique.length / ROWS_PER_COLUMN));
    const neededWidth = neededPairs * 2;

    const tableStartCol = BASE_START_COL;
    let currentWidth = getStoredWidth();
    if (currentWidth % 2 !== 0) currentWidth = BASE_WIDTH;

    const neededExtra = Math.max(0, neededWidth - currentWidth);
    if (neededExtra > 0) {
      const insertAfter = tableStartCol + currentWidth - 1;
      const extraEven = (neededExtra % 2 === 0) ? neededExtra : neededExtra + 1;
      const lastPairStart = Math.max(tableStartCol, tableStartCol + currentWidth - 2);
      main.insertColumnsAfter(insertAfter, extraEven);
      for (let i = 0; i < extraEven; i += 2) {
        try {
          const src = main.getRange(TABLE_START_ROW, lastPairStart, TABLE_ROWS, 2);
          const dest = main.getRange(TABLE_START_ROW, insertAfter + 1 + i, TABLE_ROWS, 2);
          src.copyTo(dest, { formatOnly: true });
        } catch(e) { Logger.log('actualizar: error copiando formato al insertar pares: ' + e); }
      }
      currentWidth += extraEven;
    }

    setStoredWidth(neededWidth);
    const effWidth = getEffectiveWidth(main, tableStartCol, neededWidth);
    updateHoyRow();
    updateSelectorRow(effWidth);
    updateMostrandoRow(null);

    enforcePairStructure(main, tableStartCol, effWidth);

    // Titles
    for (let i = 0; i < effWidth / 2; i++) {
      const habCol = tableStartCol + i * 2;
      const chipCol = habCol + 1;
      try {
        main.getRange(TITLES_ROW, habCol).setValue('HAB');
        main.getRange(TITLES_ROW, chipCol).setValue('CONCIERGE');
        main.getRange(TITLES_ROW, habCol, 1, 2)
          .setBackground(TITLE_COLOR).setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
      } catch(e){}
    }

    // Fill HABs
    for (let p = 0; p < neededPairs; p++) {
      const habCol = tableStartCol + p * 2;
      const startIndex = p * ROWS_PER_COLUMN;
      const block = [];
      for (let r = 0; r < ROWS_PER_COLUMN; r++) {
        const idx = startIndex + r;
        block.push([ idx < roomsRawUnique.length ? roomsRawUnique[idx] : '' ]);
      }
      const habRange = main.getRange(DATA_START_ROW, habCol, ROWS_PER_COLUMN, 1);
      try { habRange.clearDataValidations(); } catch (e) {}
      habRange.setValues(block);
      habRange.setFontWeight('normal').setFontColor('#000000').setHorizontalAlignment('center').setVerticalAlignment('middle');
      main.getRange(DATA_START_ROW, habCol + 1, ROWS_PER_COLUMN, 1).clearContent();
    }

    enforcePairStructure(main, tableStartCol, effWidth);
    applyChipStyleToConcierge(main, tableStartCol, effWidth);
    applyRowColorsAndBorder(main, tableStartCol, effWidth);

    main.getRange(TABLE_START_ROW, tableStartCol, TABLE_ROWS, effWidth).setHorizontalAlignment('center').setVerticalAlignment('middle');

    updateFechaDropdown();
    updateHoyRow();
    updateSelectorRow(effWidth);
    updateMostrandoRow(null);

    // --- LIMPIAR W178 y poner "PEGAR LINK" con formato solicitado ---
    try {
      const w = main.getRange('W178');
      w.clearContent();
      w.setValue('PEGAR LINK');
      w.setFontSize(11);
      w.setFontColor('#45818e');
      w.setHorizontalAlignment('center');
      w.setFontWeight('normal');
    } catch (e) {
      Logger.log('actualizar: no se pudo formatear W178: ' + e);
    }

    // Intentar eliminar columnas vacías extra y actualizar versión
    removeExtraEmptyColumns();
    try { updateVersionLabel(); } catch (e) { Logger.log('after actualizar updateVersionLabel failed: ' + e); }

  } finally {
    try { LockService.getScriptLock().releaseLock(); } catch(e){ Logger.log('releaseLock failed: ' + e); }
  }
}

/* ---------------------- ARCHIVAR ---------------------- */
function archivar() {
  const { main, reg } = getSheets();
  const tableStartCol = BASE_START_COL;

  // Detectar ancho real ocupado en la hoja principal
  const actualWidth = detectActualTableWidth(main);
  const width = Math.max(BASE_WIDTH, actualWidth);

  // La fila 178 (TABLE_START_ROW) siempre muestra la fecha de hoy
  const selectorLabel = (main.getRange(TABLE_START_ROW, BASE_START_COL).getDisplayValue() + '').trim();
  const map = buildFechaMapFromRegistro();
  const originalDate = map[selectorLabel] || selectorLabel || '';

  // Nuevo: comprobar si se hizo un "combine" y hay una fecha original marcada para solapar
  const props = PropertiesService.getDocumentProperties();
  const combinedOrig = props.getProperty(PROP_KEY_LAST_COMBINED_ORIG);

  // Determine dest start column: two columns after last used OR overwrite an existing column if combined
  let regLastCol = reg.getLastColumn();
  if (!regLastCol || regLastCol < 1) regLastCol = 0;
  let destStartCol = regLastCol + 2;

  let overwroteExisting = false;
  if (combinedOrig) {
    // buscar columna en reg con combinedOrig
    try {
      const row1 = reg.getRange(1,1,1,regLastCol).getDisplayValues()[0];
      for (let c = 0; c < row1.length; c++) {
        const v = (row1[c] + '').trim();
        if (v === combinedOrig) {
          destStartCol = c + 1;
          overwroteExisting = true;
          break;
        }
      }
    } catch (e) {
      Logger.log('archivar: búsqueda combinedOrig falló: ' + e);
    }
  }

  // Read source formats and data-validations for DATA rows
  const srcRange = main.getRange(TABLE_START_ROW, tableStartCol, TABLE_ROWS, width);
  let srcBackgrounds=null, srcFontColors=null, srcValidations=null;
  try { srcBackgrounds = srcRange.getBackgrounds(); } catch(e){}
  try { srcFontColors = srcRange.getFontColors(); } catch(e){}
  try { srcValidations = main.getRange(DATA_START_ROW, tableStartCol, ROWS_PER_COLUMN, width).getDataValidations(); } catch(e){}

  // If overwriting an existing archived table, we may need to adjust existing width at destStartCol
  if (overwroteExisting) {
    try {
      const lastColReg = reg.getLastColumn();
      // compute existing width at destStartCol
      let existingWidth = 0;
      for (let c = destStartCol; c <= lastColReg; c++) {
        const colRange = reg.getRange(1, c, TABLE_ROWS, 1);
        const colVals = colRange.getDisplayValues();
        let hasAny = false;
        for (let r = 0; r < colVals.length; r++) {
          if ((colVals[r][0] + '').trim() !== '') { hasAny = true; break; }
        }
        if (!hasAny) break;
        existingWidth++;
      }
      if (existingWidth <= 0) existingWidth = BASE_WIDTH;

      if (existingWidth < width) {
        // Insert extra columns to fit new width
        const need = width - existingWidth;
        try {
          reg.insertColumnsAfter(destStartCol + existingWidth - 1, need);
        } catch (e) { Logger.log('archivar: insertColumnsAfter en registro falló: ' + e); }
      } else if (existingWidth > width) {
        // Remove surplus columns to fit new width
        const toDelete = existingWidth - width;
        try {
          reg.deleteColumns(destStartCol + width, toDelete);
        } catch (e) { Logger.log('archivar: deleteColumns en registro falló: ' + e); }
      }
    } catch (e) {
      Logger.log('archivar: ajuste de ancho existente falló: ' + e);
    }
  }

  const destRange = reg.getRange(1, destStartCol, TABLE_ROWS, width);

  // Break any merges inside the target block safely
  try { safeBreakApartRange(destRange); } catch(e){ Logger.log('archivar: safeBreakApartRange(destRange) failed: ' + e); }

  // Copy contents (toda la anchura detectada)
  try {
    const srcValues = srcRange.getValues();
    reg.getRange(1, destStartCol, TABLE_ROWS, width).setValues(srcValues);
  } catch(e) {
    try { srcRange.copyTo(destRange, { contentsOnly: true }); } catch(e){ Logger.log('copyTo contentsOnly failed: ' + e); throw e; }
  }

  // Apply backgrounds/fontColors exactly
  try { if (srcBackgrounds) reg.getRange(1, destStartCol, TABLE_ROWS, width).setBackgrounds(srcBackgrounds); } catch(e){ Logger.log('setBackgrounds dest failed: ' + e); }
  try { if (srcFontColors) reg.getRange(1, destStartCol, TABLE_ROWS, width).setFontColors(srcFontColors); } catch(e){ Logger.log('setFontColors dest failed: ' + e); }

  // Calculate destDataRow mapping: 1 + (DATA_START_ROW - TABLE_START_ROW) = 1 + 4 = 5
  const destDataRow = 1 + (DATA_START_ROW - TABLE_START_ROW);

  // Apply validations only to data rows
  try {
    if (srcValidations) {
      const destDataRange = reg.getRange(destDataRow, destStartCol, ROWS_PER_COLUMN, width);
      destDataRange.setDataValidations(srcValidations);
    }
  } catch(e) { Logger.log('setDataValidations dest failed: ' + e); }

  // Header cleanup: row 1 = fecha de hoy (verbose), rows 2-3 = selector/mostrando (reconstructed), row 4 = titles
  try {
    const labelRange = reg.getRange(1, destStartCol, 1, width);
    try { safeBreakApartRange(labelRange); } catch(e){}
    try { labelRange.merge(); } catch(e){ Logger.log('labelRange.merge failed: ' + e); }
    const selectorLabelToWrite = (main.getRange(TABLE_START_ROW, BASE_START_COL).getDisplayValue() + '').trim();
    labelRange.setValue(selectorLabelToWrite);
    labelRange.setBackground(SELECTOR_COLOR).setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');

    // Rows 1..(titlesOffset-1) = header rows; clear validations up to titles row in REGISTRO
    const titlesOffsetInReg = TITLES_ROW - TABLE_START_ROW + 1; // = 4
    try { reg.getRange(1, destStartCol, titlesOffsetInReg, width).clearDataValidations(); } catch(e){}
    for (let offset = 0; offset < width; offset += 2) {
      const cHab = destStartCol + offset;
      const cChip = cHab + 1;
      try {
        reg.getRange(titlesOffsetInReg, cHab).setValue('HAB');
        reg.getRange(titlesOffsetInReg, cChip).setValue('CONCIERGE');
        reg.getRange(titlesOffsetInReg, cHab, 1, 2).setBackground(TITLE_COLOR).setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
      } catch(e){}
    }
  } catch(e) { Logger.log('Header cleanup failed: ' + e); }

  // Apply CF and static formatting only to data rows
  try { applyConciergeConditionalFormattingToRegistro(reg, destStartCol, width, destDataRow); } catch(e){ Logger.log('applyConciergeConditionalFormattingToRegistro failed: ' + e); }
  try { applyStaticConciergeFormattingToRegistro(reg, destStartCol, width, destDataRow); } catch(e){ Logger.log('applyStaticConciergeFormattingToRegistro failed: ' + e); }

  // Ensure black outer border on the archived block in REGISTRO_GALA (safe)
  try {
    const blockReg = reg.getRange(1, destStartCol, TABLE_ROWS, width);
    try { safeBreakApartRange(blockReg); } catch(e){}
    try { blockReg.setBorder(true, true, true, true, false, false, '#000000', SpreadsheetApp.BorderStyle.SOLID_THICK); } catch(e){ Logger.log('Could not set outer border in registro: ' + e); }
  } catch(e) { Logger.log('archivar border set failed: ' + e); }

  // Clear data in main (todo el bloque detectado)
  try { main.getRange(TABLE_START_ROW, tableStartCol, TABLE_ROWS, width).clearContent(); } catch(e){ Logger.log('clear main data failed: ' + e); }

  // Eliminar columnas insertadas más allá de la base (forzado) para garantizar que la tabla vuelva a X..AA
  try {
    const colsToDelete = Math.max(0, width - BASE_WIDTH);
    if (colsToDelete > 0) {
      const deleteStart = tableStartCol + BASE_WIDTH;
      try { forceDeleteInsertedColumns(main, deleteStart, colsToDelete); } catch (e) { Logger.log('archivar: forceDeleteInsertedColumns failed: ' + e); }
    }
  } catch(e){ Logger.log('archivar: delete extra columns attempt failed: ' + e); }

  // Restaurar base X..AA y propiedad
  try {
    setStoredWidth(BASE_WIDTH);
    updateHoyRow();
    updateSelectorRow(BASE_WIDTH);
    updateMostrandoRow(null);

    // Set titles HAB/CONCIERGE in X181..AA181 and style
    for (let p = 0; p < BASE_PAIRS; p++) {
      const habCol = tableStartCol + p * 2;
      const chipCol = habCol + 1;
      try {
        main.getRange(TITLES_ROW, habCol).setValue('HAB');
        main.getRange(TITLES_ROW, chipCol).setValue('CONCIERGE');
        main.getRange(TITLES_ROW, habCol, 1, 2)
          .setBackground(TITLE_COLOR).setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
      } catch (e) { Logger.log('archivar: setting base titles failed: ' + e); }
    }

    // Clear data rows in base area and reset validations/format
    try {
      main.getRange(DATA_START_ROW, tableStartCol, ROWS_PER_COLUMN, BASE_WIDTH).clearContent();
      enforcePairStructure(main, tableStartCol, BASE_WIDTH);
      applyChipStyleToConcierge(main, tableStartCol, BASE_WIDTH);
      applyRowColorsAndBorder(main, tableStartCol, BASE_WIDTH);
    } catch (e) { Logger.log('archivar: clearing/restoring base area failed: ' + e); }

    // Reset selector to neutral placeholder
    try { main.getRange(SELECTOR_ROW, BASE_START_COL).setValue('Seleccionar fecha'); } catch(e){}

    // intentar limpieza extra
    try { removeExtraEmptyColumns(); } catch(e){ Logger.log('archivar: removeExtraEmptyColumns failed: ' + e); }

  } catch (e) {
    Logger.log('archivar: restoring base area failed: ' + e);
  }

  // Si sobrescribimos una entrada previa por motivo de "combine", borramos la marca
  try { PropertiesService.getDocumentProperties().deleteProperty(PROP_KEY_LAST_COMBINED_ORIG); } catch(e){}

  if (originalDate) setLastArchive(originalDate);
  updateFechaDropdown();
  removeExtraEmptyColumns();
  try { updateVersionLabel(); } catch (e) { Logger.log('after archivar updateVersionLabel failed: ' + e); }

  // Preventive cleanup in adjacent columns in registro
  try {
    const cleanupCols = 10;
    const startClean = destStartCol + width;
    const maxColsReg = reg.getMaxColumns();
    const actualCleanCount = Math.max(0, Math.min(cleanupCols, maxColsReg - startClean + 1));
    if (actualCleanCount > 0) {
      const rngClean = reg.getRange(1, startClean, TABLE_ROWS, actualCleanCount);
      try { rngClean.clearDataValidations(); } catch(e){}
      try { rngClean.setBackground(null); } catch(e){}
      try { rngClean.setFontColors(null); } catch(e){}
    }
  } catch(e){ Logger.log('post-archivar preventive cleanup failed: ' + e); }

  try { PropertiesService.getDocumentProperties().deleteProperty(PROP_KEY_UPDATE_LOCK); } catch(e){}
  Logger.log('Archivado completado.');
}

/* ---------------------- onEdit / selector processing ---------------------- */
function onEdit(e) {
  try {
    const range = e.range;
    const sheet = range.getSheet();
    if (sheet.getName() !== MAIN_SHEET_NAME) return;

    const row = range.getRow();
    const col = range.getColumn();
    const selectorRow = SELECTOR_ROW;
    const selectorCol = BASE_START_COL;

    if (row === selectorRow && col === selectorCol) {
      const selDisplay = (range.getDisplayValue() + '').trim();
      if (!selDisplay || selDisplay === 'Seleccionar fecha') return;
      const map = buildFechaMapFromRegistro();
      if (map[selDisplay]) {
        processSelectorByOrig(map[selDisplay]);
        return;
      }
      const parsed = parsePossibleDate(selDisplay);
      if (parsed) {
        const orig = formatDateDDMMYYYY(parsed);
        processSelectorByOrig(orig);
        return;
      }
      return;
    }
  } catch (err) { Logger.log('onEdit error: ' + err); }
}

/* ---------------------- processSelector / cargar / clear ---------------------- */
function processSelectorByOrig(orig) {
  const { main } = getSheets();
  if (!orig) return;
  const fechas = getRegistroFechaList();
  if (fechas.indexOf(orig) !== -1) {
    cargarTablaDesdeRegistro(orig);
  } else {
    clearTableAndReset();
  }
}

function cargarTablaDesdeRegistro(fechaStr) {
  const { main, reg } = getSheets();
  const lastCol = Math.max(1, reg.getLastColumn());
  if (lastCol === 0) { Logger.log('cargarTablaDesdeRegistro: registro vacío.'); return; }
  const row1 = reg.getRange(1,1,1,lastCol).getDisplayValues()[0];
  let foundCol = -1;
  for (let c = 0; c < row1.length; c++) {
    const v = (row1[c] + '').trim();
    if (v === fechaStr) { foundCol = c + 1; break; }
  }
  if (foundCol === -1) { Logger.log('cargarTablaDesdeRegistro: no se encontró la fecha.'); return; }

  // Guardar en propiedades la columna origen para posibles operaciones posteriores
  try { PropertiesService.getDocumentProperties().setProperty(PROP_KEY_LAST_LOADED_REG_COL, String(foundCol)); } catch(e){ Logger.log('cargarTablaDesdeRegistro: could not set PROP_KEY_LAST_LOADED_REG_COL: ' + e); }
  // Al cargar desde registro limpiamos la marca de "combinado" previa
  try { PropertiesService.getDocumentProperties().deleteProperty(PROP_KEY_LAST_COMBINED_ORIG); } catch(e){}

  // Determinar ancho de la tabla en registro (contiguo hacia la derecha hasta columna vacía)
  let width = 0;
  for (let c = foundCol; c <= lastCol; c++) {
    const colRange = reg.getRange(1, c, TABLE_ROWS, 1);
    const colVals = colRange.getDisplayValues();
    let hasAny = false;
    for (let r = 0; r < colVals.length; r++) {
      if ((colVals[r][0] + '').trim() !== '') { hasAny = true; break; }
    }
    if (!hasAny) break;
    width++;
  }
  if (width <= 0) width = BASE_WIDTH;

  const tableStartCol = BASE_START_COL;
  const currentStoredWidth = getStoredWidth();

  // Limpiar previamente el área real ocupada para evitar solapamiento con tablas previas.
  try {
    const actualWidthOnSheet = detectActualTableWidth(main);
    const clearWidth = Math.max(actualWidthOnSheet, width, currentStoredWidth);
    const clearRange = main.getRange(TABLE_START_ROW, tableStartCol, TABLE_ROWS, clearWidth);
    try { safeBreakApartRange(clearRange); } catch(e){}
    try { clearRange.clearContent(); } catch(e){}
    try { main.getRange(DATA_START_ROW, tableStartCol, ROWS_PER_COLUMN, clearWidth).clearDataValidations(); } catch(e){}
    // También borrar columnas insertadas extra que ya no son necesarias (forzado),
    // para evitar dejar residuos a la derecha.
    if (clearWidth > BASE_WIDTH) {
      const deleteStart = tableStartCol + BASE_WIDTH;
      const colsToDelete = clearWidth - BASE_WIDTH;
      try { forceDeleteInsertedColumns(main, deleteStart, colsToDelete); } catch(e){ Logger.log('cargarTablaDesdeRegistro: forceDeleteInsertedColumns failed: ' + e); }
    }
  } catch (e) {
    Logger.log('cargarTablaDesdeRegistro: limpieza previa falló: ' + e);
  }

  // Insertar columnas si hace falta (para la anchura de la tabla que vamos a cargar)
  const neededExtra = Math.max(0, width - BASE_WIDTH);
  if (neededExtra > 0) {
    const insertAfter = tableStartCol + BASE_WIDTH - 1;
    const extraEven = (neededExtra % 2 === 0) ? neededExtra : neededExtra + 1;
    const lastPairStart = Math.max(tableStartCol, tableStartCol + BASE_WIDTH - 2);
    main.insertColumnsAfter(insertAfter, extraEven);
    for (let i = 0; i < extraEven; i += 2) {
      try {
        const src = main.getRange(TABLE_START_ROW, lastPairStart, TABLE_ROWS, 2);
        const dest = main.getRange(TABLE_START_ROW, insertAfter + 1 + i, TABLE_ROWS, 2);
        src.copyTo(dest, { formatOnly: true });
      } catch(e) { Logger.log('Error copiando al insertar en cargarTablaDesdeRegistro: ' + e); }
    }
  }

  // Copiar contenido desde REGISTRO_GALA a MAIN (incluye títulos y datos)
  try {
    enforcePairStructure(main, tableStartCol, width);

    // En REGISTRO: fila 1 = fecha hoy, filas 2..titlesOffset-1 = selector/mostrando, fila titlesOffset = títulos, resto = datos
    const titlesOffsetInReg = TITLES_ROW - TABLE_START_ROW + 1; // = 4
    const srcRows = DATA_END_ROW - TITLES_ROW + 1; // = 30 (1 fila títulos + 29 datos)
    const srcRange = reg.getRange(titlesOffsetInReg, foundCol, srcRows, width);
    const destRange = main.getRange(TITLES_ROW, tableStartCol, srcRows, width);

    try { safeBreakApartRange(destRange); } catch(e){}
    destRange.clear({ contentsOnly: false });
    srcRange.copyTo(destRange, { contentsOnly: false });
  } catch (e) {
    Logger.log('cargarTablaDesdeRegistro copy failed: ' + e);
  }

  // Finalmente actualizamos la propiedad a la anchura actual en pantalla
  setStoredWidth(width);
  updateFechaDropdown();
  updateHoyRow();
  updateSelectorRow(width);
  try { main.getRange(SELECTOR_ROW, BASE_START_COL).setValue('Seleccionar fecha'); } catch(e){}
  updateMostrandoRow(verboseDateLabelFromOriginal(fechaStr));

  applyRowColorsAndBorder(main, tableStartCol, width);
  enforcePairStructure(main, tableStartCol, width);
  applyChipStyleToConcierge(main, tableStartCol, width);

  for (let p = 0; p < Math.floor(width/2); p++) {
    const habCol = tableStartCol + p*2;
    main.getRange(DATA_START_ROW, habCol, ROWS_PER_COLUMN, 1)
      .setFontWeight('normal').setFontColor('#000000').setHorizontalAlignment('center').setVerticalAlignment('middle');
  }

  removeExtraEmptyColumns();
  updateFechaDropdown();
  try { updateVersionLabel(); } catch (e) { Logger.log('after cargarTablaDesdeRegistro updateVersionLabel failed: ' + e); }
}

function clearTableAndReset(opts) {
  opts = opts || {};
  const skipHoyRow = opts.skipHoyRow === true;
  const { main } = getSheets();
  const tableStartCol = BASE_START_COL;

  // Detectar ancho real y limpiar todo; luego forzar borrado de columnas insertadas
  try {
    const actualWidth = detectActualTableWidth(main);
    if (actualWidth > 0) {
      try {
        const rng = main.getRange(TABLE_START_ROW, tableStartCol, TABLE_ROWS, actualWidth);
        try { safeBreakApartRange(rng); } catch(e){}
        try { rng.clearContent(); } catch(e){}
        try { main.getRange(DATA_START_ROW, tableStartCol, ROWS_PER_COLUMN, actualWidth).clearDataValidations(); } catch(e){}
      } catch(e){ Logger.log('clearTableAndReset: cleaning range failed: ' + e); }
      if (actualWidth > BASE_WIDTH) {
        const deleteStart = tableStartCol + BASE_WIDTH;
        const colsToDelete = actualWidth - BASE_WIDTH;
        try { forceDeleteInsertedColumns(main, deleteStart, colsToDelete); } catch(e){ Logger.log('clearTableAndReset forceDeleteInsertedColumns failed: ' + e); }
      }
    }
  } catch(e){ Logger.log('clearTableAndReset detect/clear failed: ' + e); }

  // Limpiar marcas de carga/combinar
  try { PropertiesService.getDocumentProperties().deleteProperty(PROP_KEY_LAST_LOADED_REG_COL); } catch(e){}
  try { PropertiesService.getDocumentProperties().deleteProperty(PROP_KEY_LAST_COMBINED_ORIG); } catch(e){}

  setStoredWidth(BASE_WIDTH);
  if (!skipHoyRow) {
    updateHoyRow();
  }
  updateSelectorRow(BASE_WIDTH);
  for (let p = 0; p < BASE_PAIRS; p++) {
    const habCol = tableStartCol + p*2;
    const chipCol = habCol + 1;
    try {
      main.getRange(TITLES_ROW, habCol).setValue('HAB');
      main.getRange(TITLES_ROW, chipCol).setValue('CONCIERGE');
      main.getRange(TITLES_ROW, habCol, 1, 2)
        .setBackground(TITLE_COLOR).setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
    } catch(e){}
  }
  applyRowColorsAndBorder(main, tableStartCol, BASE_WIDTH);
  enforcePairStructure(main, tableStartCol, BASE_WIDTH);
  applyChipStyleToConcierge(main, tableStartCol, BASE_WIDTH);
  try { main.getRange(SELECTOR_ROW, BASE_START_COL).setValue('Seleccionar fecha'); } catch(e){}
  updateMostrandoRow(null);
  removeExtraEmptyColumns();
  try { updateVersionLabel(); } catch (e) { Logger.log('after clearTableAndReset updateVersionLabel failed: ' + e); }
}

/* ---------------------- FECHAS HELPERS ---------------------- */
function getRegistroFechaList() {
  const { reg } = getSheets();
  const lastCol = Math.max(1, reg.getLastColumn());
  if (lastCol === 0) return [];
  const row1 = reg.getRange(1,1,1,lastCol).getDisplayValues()[0];
  const fechas = [];
  for (let c = 0; c < row1.length; c++) {
    const v = (row1[c] + '').trim();
    if (v && fechas.indexOf(v) === -1) fechas.push(v);
  }
  return fechas;
}

// updateFechaDropdown - opera sobre SELECTOR_ROW con placeholder "Seleccionar fecha"
function updateFechaDropdown() {
  const { main } = getSheets();
  try { normalizeStoredWidthToSheet(); } catch(e){}
  const startCol = BASE_START_COL;
  const effWidth = getEffectiveWidth(main, startCol, getStoredWidth());
  const fechasReg = getRegistroFechaList();
  const labels = ['Seleccionar fecha'];
  const map = {};
  for (let i = 0; i < fechasReg.length; i++) {
    const orig = fechasReg[i];
    let label = verboseDateLabelFromOriginal(orig);
    let candidate = label; let suffix = 1;
    while (map[candidate]) { candidate = label + ' (' + suffix + ')'; suffix++; }
    label = candidate;
    map[label] = orig;
    labels.push(label);
  }
  setFechaMap(map);

  const rule = SpreadsheetApp.newDataValidation().requireValueInList(labels, true).setAllowInvalid(true).build();

  updateSelectorRow(effWidth);

  const fechaCell = main.getRange(SELECTOR_ROW, startCol); // primera celda del selector
  try {
    fechaCell.setDataValidation(rule);
  } catch (e) {
    Logger.log('updateFechaDropdown setDataValidation on single cell failed: ' + e);
  }

  try {
    const cur = (fechaCell.getDisplayValue() + '').trim();
    if (!cur) fechaCell.setValue('Seleccionar fecha');
  } catch (e) {
    Logger.log('updateFechaDropdown read/set fechaCell failed: ' + e);
  }
}

/* ---------------------- STYLES / BORDERS ---------------------- */
function ensureConciergeValidationOnBase() {
  const { main } = getSheets();
  enforcePairStructure(main, BASE_START_COL, BASE_WIDTH);
  applyRowColorsAndBorder(main, BASE_START_COL, BASE_WIDTH);
  applyChipStyleToConcierge(main, BASE_START_COL, BASE_WIDTH);
  updateFechaDropdown();
}
function applyRowColorsAndBorder(sheet, startCol, width) {
  const w = getEffectiveWidth(sheet, startCol, width);
  const topRow = TABLE_START_ROW;
  try {
    // Filas de encabezado nuevas (fecha hoy, selector, mostrando): fondo oscuro
    for (let r = TABLE_START_ROW; r < TITLES_ROW; r++) {
      sheet.getRange(r, startCol, 1, w).setBackground(SELECTOR_COLOR);
    }
    sheet.getRange(TITLES_ROW, startCol, 1, w)
      .setBackground(TITLE_COLOR).setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
    for (let r = DATA_START_ROW; r <= DATA_END_ROW; r++) {
      const isEven = (r % 2 === 0);
      const bg = isEven ? EVEN_ROW_BG : ODD_ROW_BG;
      sheet.getRange(r, startCol, 1, w).setBackground(bg).setHorizontalAlignment('center').setVerticalAlignment('middle');
    }
    const block = sheet.getRange(topRow, startCol, TABLE_ROWS, w);
    try { block.setBorder(true, true, true, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID_THICK); } catch(e){}
    try { block.setBorder(null, null, null, null, true, true, '#9aa7b0', SpreadsheetApp.BorderStyle.DOTTED); } catch(e){}
  } catch (err) { Logger.log('applyRowColorsAndBorder error: ' + err); }
}

/* ---------------------- VALIDATIONS & CF ---------------------- */
function enforcePairStructure(sheet, startCol, width) {
  const pairs = Math.floor(width / 2);
  for (let p = 0; p < pairs; p++) {
    const habCol = startCol + p * 2;
    const chipCol = habCol + 1;
    const habRange = sheet.getRange(DATA_START_ROW, habCol, ROWS_PER_COLUMN, 1);
    const chipRange = sheet.getRange(DATA_START_ROW, chipCol, ROWS_PER_COLUMN, 1);
    try { habRange.clearDataValidations(); } catch(e){}
    habRange.setFontWeight('normal').setFontColor('#000000').setHorizontalAlignment('center').setVerticalAlignment('middle');
    chipRange.setFontWeight('normal').setFontColor('#215a6c').setHorizontalAlignment('center').setVerticalAlignment('middle');
    try {
      try { sheet.getRange(TITLES_ROW, habCol, 1, 2).clearDataValidations(); } catch(e){}
      sheet.getRange(TITLES_ROW, habCol).setValue('HAB');
      sheet.getRange(TITLES_ROW, chipCol).setValue('CONCIERGE');
      sheet.getRange(TITLES_ROW, habCol, 1, 2)
        .setBackground(TITLE_COLOR).setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
    } catch(e){}
  }
  if (width % 2 !== 0) {
    const lastCol = startCol + width - 1;
    try { sheet.getRange(DATA_START_ROW, lastCol, ROWS_PER_COLUMN, 1).clearDataValidations(); } catch(e){}
  }
  try { applyConciergeConditionalFormatting(sheet, startCol, width); } catch(e){ Logger.log('applyConciergeConditionalFormatting failed: ' + e); }
}

function applyChipStyleToConcierge(sheet, startCol, width) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const spreadsheetId = ss.getId();
    const sheetId = sheet.getSheetId();
    const pairs = Math.floor(width / 2);
    const requests = [];
    for (let p = 0; p < pairs; p++) {
      const chipCol = startCol + p * 2 + 1; // columna CONCIERGE (1-indexed)
      requests.push({
        setDataValidation: {
          range: {
            sheetId: sheetId,
            startRowIndex: DATA_START_ROW - 1,  // 0-indexed
            endRowIndex: DATA_END_ROW,           // 0-indexed exclusive
            startColumnIndex: chipCol - 1,       // 0-indexed
            endColumnIndex: chipCol              // 0-indexed exclusive
          },
          rule: {
            condition: {
              type: 'ONE_OF_LIST',
              values: CONCIERGE_LIST.map(v => ({ userEnteredValue: v }))
            },
            showCustomUi: true,
            strict: true
          }
        }
      });
    }
    if (requests.length > 0) {
      Sheets.Spreadsheets.batchUpdate({ requests: requests }, spreadsheetId);
      Logger.log('applyChipStyleToConcierge: chip style aplicado a ' + pairs + ' columnas CONCIERGE.');
    }
  } catch (e) {
    Logger.log('applyChipStyleToConcierge error: ' + e);
  }
}

/* ---------------------- Conditional Formatting (MAIN) ---------------------- */
function applyConciergeConditionalFormatting(sheet, startCol, width) {
  const allRules = sheet.getConditionalFormatRules();
  const keep = [];
  for (let i=0;i<allRules.length;i++) {
    const rs = allRules[i].getRanges();
    let overlap = false;
    for (let j=0;j<rs.length;j++) {
      const r = rs[j];
      const rRowStart = r.getRow();
      const rRowEnd = rRowStart + r.getNumRows() -1;
      const rColStart = r.getColumn();
      const rColEnd = rColStart + r.getNumColumns() -1;
      if (!(rRowEnd < DATA_START_ROW || rRowStart > DATA_END_ROW || rColEnd < startCol || rColStart > (startCol + width -1))) { overlap = true; break; }
    }
    if (!overlap) keep.push(allRules[i]);
  }
  const newRules = keep.slice();
  for (let c = startCol + 1; c < startCol + width; c += 2) {
    const colLetter = columnIndexToLetter(c);
    const rangeAny = sheet.getRange(DATA_START_ROW, c, ROWS_PER_COLUMN, 1);

    const formulaNoApp = `=INDIRECT("${colLetter}" & ROW())="NO TIENE APP"`;
    const ruleNoApp = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaNoApp).setBackground('#ffcfc9').setFontColor('#b10202').setRanges([rangeAny]).build();
    newRules.push(ruleNoApp);

    const formulaSocios = `=INDIRECT("${colLetter}" & ROW())="SOCIOS"`;
    const ruleSocios = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaSocios).setBackground('#fdd979').setFontColor('#473821').setRanges([rangeAny]).build();
    newRules.push(ruleSocios);

    const formulaInc = `=INDIRECT("${colLetter}" & ROW())="INCIDENCIAS"`;
    const ruleInc = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaInc).setBackground('#e0cff2').setFontColor('#324586').setRanges([rangeAny]).build();
    newRules.push(ruleInc);

    // OUT DEL DÍA -> fondo #0d2642, texto #cae6eb
    const formulaOut = `=INDIRECT("${colLetter}" & ROW())="OUT DEL DÍA"`;
    const ruleOut = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaOut).setBackground('#0d2642').setFontColor('#cae6eb').setRanges([rangeAny]).build();
    newRules.push(ruleOut);

    // SOLO SPA -> fondo #b0eff3, texto #0c3761
    const formulaSoloSpa = `=INDIRECT("${colLetter}" & ROW())="SOLO SPA"`;
    const ruleSoloSpa = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaSoloSpa).setBackground('#b0eff3').setFontColor('#0c3761').setRanges([rangeAny]).build();
    newRules.push(ruleSoloSpa);

    // regla general (original): fondo '#c6dbe1' y texto '#215a6c'
    const formulaAny = `=LEN(TRIM(INDIRECT("${colLetter}" & ROW())))>0`;
    const ruleAny = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaAny).setBackground('#c6dbe1').setFontColor('#215a6c').setRanges([rangeAny]).build();
    newRules.push(ruleAny);
  }
  try { sheet.setConditionalFormatRules(newRules); } catch(e){ Logger.log('setConditionalFormatRules failed: ' + e); }
}

/* ---------------------- registro CF / static formatting ---------------------- */
function applyConciergeConditionalFormattingToRegistro(regSheet, startCol, width, rowDataStart) {
  try {
    const allRules = regSheet.getConditionalFormatRules();
    const keep = [];
    for (let i=0;i<allRules.length;i++) {
      const rs = allRules[i].getRanges();
      let overlap = false;
      for (let j=0;j<rs.length;j++) {
        const r = rs[j];
        const rRowStart = r.getRow();
        const rRowEnd = rRowStart + r.getNumRows() -1;
        const rColStart = r.getColumn();
        const rColEnd = rColStart + r.getNumColumns() -1;
        if (!(rRowEnd < rowDataStart || rRowStart > (rowDataStart + ROWS_PER_COLUMN -1) || rColEnd < startCol || rColStart > (startCol + width -1))) { overlap = true; break; }
      }
      if (!overlap) keep.push(allRules[i]);
    }
    const newRules = keep.slice();
    for (let c = startCol + 1; c < startCol + width; c += 2) {
      const colLetter = columnIndexToLetter(c);
      const rangeAny = regSheet.getRange(rowDataStart, c, ROWS_PER_COLUMN, 1);

      const formulaNoApp = `=INDIRECT("${colLetter}" & ROW())="NO TIENE APP"`;
      const ruleNoApp = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaNoApp).setBackground('#ffcfc9').setFontColor('#b10202').setRanges([rangeAny]).build();
      newRules.push(ruleNoApp);

      const formulaSocios = `=INDIRECT("${colLetter}" & ROW())="SOCIOS"`;
      const ruleSocios = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaSocios).setBackground('#fdd979').setFontColor('#473821').setRanges([rangeAny]).build();
      newRules.push(ruleSocios);

      const formulaInc = `=INDIRECT("${colLetter}" & ROW())="INCIDENCIAS"`;
      const ruleInc = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaInc).setBackground('#e0cff2').setFontColor('#324586').setRanges([rangeAny]).build();
      newRules.push(ruleInc);

      // OUT DEL DÍA -> fondo #0d2642, texto #cae6eb
      const formulaOut = `=INDIRECT("${colLetter}" & ROW())="OUT DEL DÍA"`;
      const ruleOut = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaOut).setBackground('#0d2642').setFontColor('#cae6eb').setRanges([rangeAny]).build();
      newRules.push(ruleOut);

      // SOLO SPA -> fondo #b0eff3, texto #0c3761
      const formulaSoloSpa = `=INDIRECT("${colLetter}" & ROW())="SOLO SPA"`;
      const ruleSoloSpa = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaSoloSpa).setBackground('#b0eff3').setFontColor('#0c3761').setRanges([rangeAny]).build();
      newRules.push(ruleSoloSpa);

      // regla general (original): fondo '#c6dbe1' y texto '#215a6c'
      const formulaAny = `=LEN(TRIM(INDIRECT("${colLetter}" & ROW())))>0`;
      const ruleAny = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaAny).setBackground('#c6dbe1').setFontColor('#215a6c').setRanges([rangeAny]).build();
      newRules.push(ruleAny);
    }
    regSheet.setConditionalFormatRules(newRules);
  } catch (err) { Logger.log('applyConciergeConditionalFormattingToRegistro error: ' + err); }
}
function applyStaticConciergeFormattingToRegistro(regSheet, startCol, width, rowDataStart) {
  try {
    for (let c = startCol + 1; c < startCol + width; c += 2) {
      const range = regSheet.getRange(rowDataStart, c, ROWS_PER_COLUMN, 1);
      const vals = range.getDisplayValues();
      const bgArr = [];
      const fcArr = [];
      for (let r = 0; r < vals.length; r++) {
        const v = (vals[r][0] + '').trim();
        if (v === 'NO TIENE APP') { bgArr.push(['#ffcfc9']); fcArr.push(['#b10202']); }
        else if (v === 'SOCIOS') { bgArr.push(['#fdd979']); fcArr.push(['#473821']); }
        else if (v === 'INCIDENCIAS') { bgArr.push(['#e0cff2']); fcArr.push(['#324586']); }
        else if (v === 'OUT DEL DÍA') { bgArr.push(['#0d2642']); fcArr.push(['#cae6eb']); }
        else if (v === 'SOLO SPA') { bgArr.push(['#b0eff3']); fcArr.push(['#0c3761']); }
        else if (v.length > 0) { bgArr.push(['#c6dbe1']); fcArr.push(['#215a6c']); }
        else { bgArr.push([null]); fcArr.push([null]); }
      }
      try { range.setBackgrounds(bgArr); } catch(e){}
      try { range.setFontColors(fcArr); } catch(e){}
    }
  } catch (err) { Logger.log('applyStaticConciergeFormattingToRegistro error: ' + err); }
}

/* ---------------------- removeExtraEmptyColumns ---------------------- */
function removeExtraEmptyColumns() {
  const { main } = getSheets();
  const tableStartCol = BASE_START_COL;
  const storedWidth = getStoredWidth();
  // Detectar ancho real ocupado
  const actualWidth = detectActualTableWidth(main);
  if (actualWidth <= BASE_WIDTH) {
    // si actual <= base, aseguramos propiedad y selector
    setStoredWidth(BASE_WIDTH);
    updateSelectorRow(BASE_WIDTH);
    return;
  }
  // Si no hay contenido en las columnas extras -> borrarlas (forzado)
  const extraStart = tableStartCol + BASE_WIDTH;
  const extraCount = actualWidth - BASE_WIDTH;
  const rng = main.getRange(TABLE_START_ROW, extraStart, TABLE_ROWS, extraCount);
  const vals = rng.getDisplayValues();
  let anyNonEmpty = false;
  for (let r = 0; r < vals.length && !anyNonEmpty; r++) {
    for (let c = 0; c < vals[0].length; c++) {
      if ((vals[r][c] + '').trim() !== '') { anyNonEmpty = true; break; }
    }
  }
  if (!anyNonEmpty) {
    try { forceDeleteInsertedColumns(main, extraStart, extraCount); } catch (e) { Logger.log('removeExtraEmptyColumns forceDeleteInsertedColumns failed: ' + e); }
    setStoredWidth(BASE_WIDTH);
    updateSelectorRow(BASE_WIDTH);
  } else {
    // Dejamos la anchura según lo detectado
    setStoredWidth(actualWidth);
  }
}

/* ---------------------- unlock / debug ---------------------- */
function unlockUpdate() {
  try {
    PropertiesService.getDocumentProperties().deleteProperty(PROP_KEY_UPDATE_LOCK);
    Logger.log('unlockUpdate: propiedad eliminada.');
  } catch (e) {
    Logger.log('unlockUpdate error: ' + e);
  }
}
function printDebugState() {
  try {
    const { main, reg } = getSheets();
    Logger.log('main.maxCols=' + main.getMaxColumns() + ' reg.maxCols=' + reg.getMaxColumns() + ' storedWidth=' + getStoredWidth() + ' detectedWidth=' + detectActualTableWidth(main));
  } catch (e) { Logger.log('printDebugState error: ' + e); }
}
function listMergedRangesDebug() {
  const { main } = getSheets();
  let mergedList = [];
  try {
    if (typeof main.getMergedRanges === 'function') {
      const m = main.getMergedRanges();
      mergedList = m.map(r => ({ a1: r.getA1Notation(), rows: r.getNumRows(), cols: r.getNumColumns() }));
    } else {
      const maxR = main.getMaxRows();
      const maxC = main.getMaxColumns();
      const seen = {};
      for (let r = 1; r <= maxR; r++) {
        for (let c = 1; c <= maxC; c++) {
          try {
            const cell = main.getRange(r, c);
            if (typeof cell.isPartOfMerge === 'function' && cell.isPartOfMerge()) {
              let merges = [];
              if (typeof cell.getMergedRanges === 'function') merges = cell.getMergedRanges();
              else merges = [cell];
              for (let mi = 0; mi < merges.length; mi++) {
                const mr = merges[mi];
                const a1 = mr.getA1Notation();
                if (!seen[a1]) {
                  seen[a1] = true;
                  mergedList.push({ a1: a1, rows: mr.getNumRows(), cols: mr.getNumColumns() });
                }
              }
            }
          } catch (ie){}
        }
      }
    }
  } catch (e) {
    Logger.log('listMergedRangesDebug error: ' + e);
  }
  const lines = mergedList.map(m => `${m.a1} rows:${m.rows} cols:${m.cols}`);
  Logger.log('Merged ranges (' + mergedList.length + '):\n' + lines.join('\n'));
}

/* ---------------------- DAILY SELECTOR UPDATE ---------------------- */
function dailyUpdateSelector() {
  try {
    const { main } = getSheets();
    normalizeStoredWidthToSheet();

    // Actualizar la fila de "Fecha de hoy" (178) con la fecha actual
    updateHoyRow();

    // Si hay una tabla cargada (mostrando no dice "selecciona una fecha"), no cambiar nada más
    const mostrandoCell = main.getRange(MOSTRANDO_ROW, BASE_START_COL);
    const mostrandoText = (mostrandoCell.getDisplayValue() + '').trim();
    if (mostrandoText && mostrandoText !== 'selecciona una fecha' && mostrandoText.indexOf('Mostrando:') === 0) {
      // Hay una tabla cargada: respetar selección del usuario, solo actualizar HOY
      Logger.log('dailyUpdateSelector: tabla cargada detectada, solo se actualizó HOY row.');
      return;
    }

    // Sin tabla cargada: asegurar selector en "Seleccionar fecha" y mostrando en gris
    updateSelectorRow(getStoredWidth());
    try {
      const cur = (main.getRange(SELECTOR_ROW, BASE_START_COL).getDisplayValue() + '').trim();
      if (!cur || cur !== 'Seleccionar fecha') {
        main.getRange(SELECTOR_ROW, BASE_START_COL).setValue('Seleccionar fecha');
      }
    } catch (e) { Logger.log('dailyUpdateSelector: reset selector failed: ' + e); }
    updateMostrandoRow(null);

  } catch (e) {
    Logger.log('dailyUpdateSelector error: ' + e);
  }
}
/* ---------------------- createDailyTrigger ---------------------- */
function createDailyTrigger() {
  try {
    // Antes de crear, eliminar triggers idénticos para evitar duplicados
    const existing = ScriptApp.getProjectTriggers();
    for (let i = 0; i < existing.length; i++) {
      const t = existing[i];
      if (t.getHandlerFunction() === 'dailyUpdateSelector') {
        ScriptApp.deleteTrigger(t);
      }
    }
    // Crear trigger diario a las 05:00 (ajusta atHour si quieres otra hora)
    ScriptApp.newTrigger('dailyUpdateSelector').timeBased().everyDays(1).atHour(5).create();
    Logger.log('Trigger diario creado: dailyUpdateSelector a las 05:00 (server timezone).');
  } catch (e) {
    Logger.log('createDailyTrigger error: ' + e);
  }
}

function borrarTabla() {
  try {
    clearTableAndReset();
  } catch (e) {
    Logger.log('borrarTabla error: ' + e);
  }
}

/* ---------------------- EXTRACCIÓN ROBUSTA DESDE SPREADSHEET EXTERNO ---------------------- */
/**
 * extractRoomsFromExternalSpreadsheet(url)
 * - Lee la hoja externa (detecta headers o usa B=col index 1 and E=col index 4 por defecto).
 * - Convierte serials Excel usando parsePossibleDate (de tu código).
 * - Calcula nextTuesday desde "hoy" y establece cutoff = nextTuesday + 1 día (miércoles).
 * - FILTRA por prefijos: por defecto SOLO incluye habitaciones que empiezan por '72','73','74'.
 * - Devuelve sólo habitaciones cuya fecha de checkout >= cutoff y cuyo prefijo está permitido.
 */
function extractRoomsFromExternalSpreadsheet(url) {
  try {
    if (!url || (''+url).trim() === '') { Logger.log('extractRooms: URL vacía'); return []; }
    let externalSs;
    try { externalSs = SpreadsheetApp.openByUrl(url); }
    catch (e) { Logger.log('extractRooms: no se pudo abrir la URL: ' + e); return []; }

    // Seleccionar hoja (preferencias comunes), si no la primera
    const sheetNamesPrefer = ['Sheet1','Hoja1','Hoja de cálculo 1','Sheet','Datos'];
    let extSheet = null;
    for (let i = 0; i < sheetNamesPrefer.length && !extSheet; i++) {
      extSheet = externalSs.getSheetByName(sheetNamesPrefer[i]) || null;
    }
    if (!extSheet) extSheet = externalSs.getSheets()[0];
    if (!extSheet) { Logger.log('extractRooms: no hay hojas en el spreadsheet externo'); return []; }

    const lastRow = extSheet.getLastRow();
    if (lastRow < 3) { Logger.log('extractRooms: hoja externa no tiene filas suficientes (lastRow=' + lastRow + ')'); return []; }

    // Detectar columnas por header en fila 2 si existen, si no usar B/E por defecto.
    const headerRowIndex = 2;
    const dataStartRow = 3;
    const lastCol = Math.max(5, extSheet.getLastColumn());
    const headerRange = extSheet.getRange(headerRowIndex, 1, 1, lastCol).getDisplayValues()[0];
    const headerLower = headerRange.map(h => (h + '').toLowerCase());

    let colRoom = -1, colDate = -1;
    const roomKeys = ['hab','habit','habitacion','room','habitación'];
    const dateKeys = ['fecha','date','fecha salida','checkout','check-out','check out','salida'];
    for (let i = 0; i < headerLower.length; i++) {
      const h = headerLower[i];
      if (h && colRoom === -1) {
        for (let k = 0; k < roomKeys.length; k++) if (h.indexOf(roomKeys[k]) !== -1) { colRoom = i; break; }
      }
      if (h && colDate === -1) {
        for (let k = 0; k < dateKeys.length; k++) if (h.indexOf(dateKeys[k]) !== -1) { colDate = i; break; }
      }
    }
    // Defaults: B (index 1) and E (index 4) cuando no detecta header
    if (colRoom === -1) colRoom = 1;
    if (colDate === -1) colDate = 4;

    const numRows = Math.max(0, lastRow - (dataStartRow - 1));
    if (numRows <= 0) { Logger.log('extractRooms: no hay filas de datos debajo de la cabecera'); return []; }
    const values = extSheet.getRange(dataStartRow, 1, numRows, lastCol).getValues();

    // Calcular nextTuesday relativo a hoy:
    const today = new Date();
    const todayDay = today.getDay(); // 0=Dom,1=Lun,...,2=Mar
    const daysUntilNextTuesday = (2 - todayDay + 7) % 7; // 0..6 (0 si hoy es martes)
    const nextTuesday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilNextTuesday);
    const cutoffDate = new Date(nextTuesday.getFullYear(), nextTuesday.getMonth(), nextTuesday.getDate() + 1, 0, 0, 0, 0);
    // cutoffDate = medianoche del miércoles siguiente al próximo martes

    // PREFIJOS PERMITIDOS: por defecto SOLO '72','73','74'
    const allowedPrefixes = ['72','73','74'];

    const roomsRaw = [];
    let skippedCount = 0;
    let skippedByPrefix = 0;
    for (let r = 0; r < values.length; r++) {
      const row = values[r];
      const roomVal = (row.length > colRoom) ? row[colRoom] : '';
      const dateVal = (row.length > colDate) ? row[colDate] : '';

      const roomStr = (roomVal === null || roomVal === undefined) ? '' : String(roomVal).trim();
      if (!roomStr) { skippedCount++; continue; }

      // Obtener prefijo de dos caracteres (los primeros dos dígitos)
      const prefix = roomStr.length >= 2 ? roomStr.slice(0,2) : null;
      if (!prefix || allowedPrefixes.indexOf(prefix) === -1) {
        skippedCount++;
        skippedByPrefix++;
        continue;
      }

      const parsedDate = parsePossibleDate(dateVal); // usa tu función existente (maneja serials)
      if (!parsedDate) { skippedCount++; continue; } // descartamos si no parsea

      // Normalizar a 00:00 y comparar
      const pd = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 0,0,0,0);
      if (pd.getTime() < cutoffDate.getTime()) {
        skippedCount++;
        continue;
      }
      roomsRaw.push(roomStr);
    }

    const unique = Array.from(new Set(roomsRaw));
    unique.sort((a,b) => a.toString().localeCompare(b.toString(),'es',{numeric:true}));

    Logger.log('extractRooms: filas leídas=' + values.length + ' extraidas=' + unique.length + ' saltadas=' + skippedCount + ' (porPrefijo=' + skippedByPrefix + ') cutoff=' + cutoffDate.toISOString().slice(0,10));

    return unique;
  } catch (err) {
    Logger.log('extractRooms error: ' + err);
    return [];
  }
}

/* ---------------------- FUNCIONES AGREGADAS: COMBINAR (PROMPT) / LÓGICA DE INJERTO ---------------------- */

/**
 * combinar
 * - Función pública que puedes asignar al dibujo/botón en Sheets.
 * - Pide al usuario la URL mediante prompt nativo y llama a combineWithExternal.
 */
function combinar() {
  try {
    const ui = SpreadsheetApp.getUi();
    const resp = ui.prompt('Combinar con hoja exportada', 'Pega el link de la hoja exportada (URL completa):', ui.ButtonSet.OK_CANCEL);
    if (resp.getSelectedButton() !== ui.Button.OK) {
      ui.alert('Operación cancelada.');
      return;
    }
    const url = (resp.getResponseText() || '').trim();
    if (!url) {
      ui.alert('No se proporcionó URL.');
      return;
    }
    let added = 0;
    try {
      added = combineWithExternal(url);
    } catch (e) {
      Logger.log('combinar -> combineWithExternal error: ' + e);
      ui.alert('Error al combinar: ' + (e && e.message ? e.message : String(e)));
      return;
    }
    ui.alert('Combinación completada. Habitaciones añadidas: ' + String(added));
  } catch (err) {
    Logger.log('combinar error: ' + err);
  }
}

/**
 * combineWithExternal(url)
 * - Lógica principal:
 *   1) Lee la tabla actualmente cargada en MENSAJES GALA JOIA (HAB+CONCIERGE) usando detectActualTableWidth.
 *   2) Extrae la lista de habitaciones desde la hoja externa usando extractRoomsFromExternalSpreadsheet.
 *   3) Calcula las habitaciones nuevas (no presentes).
 *   4) Si hay nuevas, reordena/inserta manteniendo orden numérico, amplía columnas si hace falta,
 *      mueve/copia los pares HAB+CONCIERGE juntos, y reaplica validaciones/estilos.
 * - Adicional:
 *   - Si la tabla actual fue cargada desde registro, guarda la fecha original en PROP_KEY_LAST_COMBINED_ORIG
 *     para que al archivar se sobrescriba la entrada original.
 *   - Cambia la etiqueta del selector a HOY por defecto cuando se agregan habitaciones.
 * - Retorna el número de habitaciones añadidas.
 */
function combineWithExternal(url) {
  try {
    const { main } = getSheets();
    const tableStartCol = BASE_START_COL;

    // Detect current width and effective width
    const actualWidth = detectActualTableWidth(main);
    const currentWidth = Math.max(BASE_WIDTH, actualWidth);

    // Read current HAB+CONCIERGE blocks from DATA area
    const dataRange = main.getRange(DATA_START_ROW, tableStartCol, ROWS_PER_COLUMN, currentWidth);
    const dataVals = dataRange.getValues(); // rows x cols

    // Build map of existing rooms -> concierge value
    const existingRooms = []; // maintain order as they appear
    const existingMap = {}; // room -> concierge string
    const pairs = Math.floor(currentWidth / 2);
    for (let p = 0; p < pairs; p++) {
      const habColIndex = p * 2; // relative index in dataVals[r][habColIndex]
      const chipColIndex = habColIndex + 1;
      for (let r = 0; r < ROWS_PER_COLUMN; r++) {
        const habVal = (dataVals[r][habColIndex] === null || dataVals[r][habColIndex] === undefined) ? '' : String(dataVals[r][habColIndex]).trim();
        const chipVal = (dataVals[r][chipColIndex] === null || dataVals[r][chipColIndex] === undefined) ? '' : String(dataVals[r][chipColIndex]).trim();
        if (habVal !== '') {
          if (existingMap[habVal] === undefined) { // first occurrence
            existingRooms.push(habVal);
            existingMap[habVal] = chipVal;
          } else {
            // If duplicate room in table (unlikely), keep first concierge if present
            if (!existingMap[habVal] && chipVal) existingMap[habVal] = chipVal;
          }
        }
      }
    }

    // Extract rooms from external spreadsheet (already filtered by prefixes and cutoff)
    const extRooms = extractRoomsFromExternalSpreadsheet(url) || [];

    // Merge sets and compute newly added rooms
    const existingSet = new Set(existingRooms);
    const extOnly = extRooms.filter(r => !existingSet.has(r));
    if (!extOnly || extOnly.length === 0) {
      Logger.log('combineWithExternal: no hay habitaciones nuevas para agregar.');
      return 0;
    }

    // Build combined list: union of existingRooms + extOnly, sorted numerically (para insertar en orden)
    const unionSet = new Set(existingRooms);
    extOnly.forEach(r => unionSet.add(r));
    const unionArr = Array.from(unionSet);
    unionArr.sort((a,b) => a.toString().localeCompare(b.toString(),'es',{numeric:true}));

    // Rebuild blocks preserving concierge where existed; new rooms -> empty concierge
    const blocks = unionArr.map(room => {
      return { hab: room, concierge: (existingMap[room] || '') };
    });

    // Determine needed width (pairs) to fit all rooms
    const totalRooms = blocks.length;
    const neededPairs = Math.max(BASE_PAIRS, Math.ceil(totalRooms / ROWS_PER_COLUMN));
    const neededWidth = neededPairs * 2;

    // If need to expand columns, insert (similar a actualizar/cargar logic)
    let currentStored = getStoredWidth();
    if (currentStored % 2 !== 0) currentStored = BASE_WIDTH;
    if (neededWidth > currentStored) {
      const insertAfter = tableStartCol + currentStored - 1;
      const extra = neededWidth - currentStored;
      const extraEven = (extra % 2 === 0) ? extra : extra + 1;
      const lastPairStart = Math.max(tableStartCol, tableStartCol + currentStored - 2);
      try {
        main.insertColumnsAfter(insertAfter, extraEven);
        for (let i = 0; i < extraEven; i += 2) {
          try {
            const src = main.getRange(TABLE_START_ROW, lastPairStart, TABLE_ROWS, 2);
            const dest = main.getRange(TABLE_START_ROW, insertAfter + 1 + i, TABLE_ROWS, 2);
            src.copyTo(dest, { formatOnly: true });
          } catch (e) {
            Logger.log('combineWithExternal: error copiando formato al insertar pares: ' + e);
          }
        }
      } catch (e) {
        Logger.log('combineWithExternal: insertColumnsAfter error: ' + e);
      }
      currentStored = currentStored + extraEven;
    }

    // Save stored width and compute effective width
    setStoredWidth(neededWidth);
    const effWidth = getEffectiveWidth(main, tableStartCol, neededWidth);

    // Ensure selector and structure
    updateHoyRow();
    updateSelectorRow(effWidth);
    enforcePairStructure(main, tableStartCol, effWidth);

    // Prepare 2D array rows x effWidth to write HAB+CONCIERGE pairs
    // Initialize with empty strings
    const rowsArr = [];
    for (let r = 0; r < ROWS_PER_COLUMN; r++) {
      const rowArr = [];
      for (let c = 0; c < effWidth; c++) rowArr.push('');
      rowsArr.push(rowArr);
    }

    // Fill rowsArr with blocks in order: pair 0 rows 0..N, pair1 rows 0..N, ...
    for (let idx = 0; idx < blocks.length; idx++) {
      const pairIndex = Math.floor(idx / ROWS_PER_COLUMN);
      const rowIndex = idx % ROWS_PER_COLUMN;
      const colHabRel = pairIndex * 2;
      const colChipRel = colHabRel + 1;
      if (colChipRel >= effWidth) {
        // Safety check: should not happen, but skip if out of effWidth
        continue;
      }
      rowsArr[rowIndex][colHabRel] = blocks[idx].hab;
      rowsArr[rowIndex][colChipRel] = blocks[idx].concierge;
    }

    // Write HAB values and concierge to sheet DATA rows
    try {
      const targetRange = main.getRange(DATA_START_ROW, tableStartCol, ROWS_PER_COLUMN, effWidth);
      // Clear validations to avoid setValues errors on restricted cells, then write
      try { targetRange.clearDataValidations(); } catch(e){}
      targetRange.setValues(rowsArr);
    } catch (e) {
      Logger.log('combineWithExternal: error al escribir valores en la hoja: ' + e);
      throw e;
    }

    // Titles row: set HAB / CONCIERGE across effWidth
    for (let p = 0; p < effWidth / 2; p++) {
      const habCol = tableStartCol + p * 2;
      const chipCol = habCol + 1;
      try {
        main.getRange(TITLES_ROW, habCol).setValue('HAB');
        main.getRange(TITLES_ROW, chipCol).setValue('CONCIERGE');
        main.getRange(TITLES_ROW, habCol, 1, 2)
          .setBackground(TITLE_COLOR).setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
      } catch(e){}
    }

    // Reapply pair enforcement, conditional formatting, row coloring and borders
    enforcePairStructure(main, tableStartCol, effWidth);
    applyChipStyleToConcierge(main, tableStartCol, effWidth);
    applyRowColorsAndBorder(main, tableStartCol, effWidth);

    // Ajustar alineación e intentar limpiar celdas sobrantes si existe espacio a la derecha
    try { main.getRange(TABLE_START_ROW, tableStartCol, TABLE_ROWS, effWidth).setHorizontalAlignment('center').setVerticalAlignment('middle'); } catch(e){}

    // Guardar marca de "combinado" si la tabla actual fue cargada desde registro
    // Leer el MOSTRANDO_ROW para detectar si hay una tabla cargada de una fecha archivada
    try {
      const mostrandoText = (main.getRange(MOSTRANDO_ROW, BASE_START_COL).getDisplayValue() + '').trim();
      if (mostrandoText && mostrandoText.indexOf('Mostrando:') === 0) {
        const mostrandoFecha = mostrandoText.replace(/^Mostrando:\s*/, '').trim();
        const map = buildFechaMapFromRegistro();
        const orig = map[mostrandoFecha] || mostrandoFecha || null;
        if (orig) {
          try { PropertiesService.getDocumentProperties().setProperty(PROP_KEY_LAST_COMBINED_ORIG, orig); } catch(e){ Logger.log('combineWithExternal: could not set PROP_KEY_LAST_COMBINED_ORIG: ' + e); }
        }
      }
    } catch (e) {
      Logger.log('combineWithExternal: could not determine original date to mark as combined: ' + e);
    }

    // Asegurar que el selector queda en neutro y HOY row actualizado
    try { main.getRange(SELECTOR_ROW, BASE_START_COL).setValue('Seleccionar fecha'); } catch(e){}
    updateMostrandoRow(null);

    // Actualizaciones finales
    removeExtraEmptyColumns();
    try { updateVersionLabel(); } catch (e) { Logger.log('combineWithExternal updateVersionLabel failed: ' + e); }
    updateFechaDropdown();

    Logger.log('combineWithExternal: habitaciones añadidas=' + extOnly.length);
    return extOnly.length;
  } catch (err) {
    Logger.log('combineWithExternal error: ' + err);
    throw err;
  }
}

function debugArchiveState() {
  const { main, reg } = getSheets();
  const mainLastCol = main.getLastColumn();
  const regLastCol = reg.getLastColumn();
  const mainLastRow = main.getLastRow();
  const regLastRow = reg.getLastRow();
  
  Logger.log('=== MAIN SHEET ===');
  Logger.log('Max Cols: ' + mainLastCol + ' | Max Rows: ' + mainLastRow);
  Logger.log('Data Range (X182:AA210): ' + main.getRange('X182:AA210').getDisplayValues().length);
  
  Logger.log('\n=== REGISTRO_GALA ===');
  Logger.log('Max Cols: ' + regLastCol + ' | Max Rows: ' + regLastRow);
  
  const row1 = reg.getRange(1, 1, 1, regLastCol).getDisplayValues()[0];
  Logger.log('Fechas en Row 1: ' + JSON.stringify(row1.filter(v => v.trim() !== '')));
  
  Logger.log('\n=== SELECTOR DROPDOWN ===');
  const selectorVal = main.getRange(SELECTOR_ROW, BASE_START_COL).getDisplayValue();
  Logger.log('Selector value: "' + selectorVal + '"');
}

function debugArchivarProcess() {
  try {
    const { main, reg } = getSheets();
    const tableStartCol = BASE_START_COL;
    
    Logger.log('=== DEBUG ANTES DE ARCHIVAR ===');
    
    // Ver qué hay en main
    const mainRange = main.getRange(TABLE_START_ROW, tableStartCol, TABLE_ROWS, BASE_WIDTH);
    const mainValues = mainRange.getValues();
    
    Logger.log('MAIN - Fila 1 (fecha): ' + mainValues[0].join(' | '));
    Logger.log('MAIN - Fila 4 (títulos): ' + mainValues[3].join(' | '));
    Logger.log('MAIN - Fila 5 (primer dato): ' + mainValues[4].join(' | '));
    Logger.log('MAIN - Fila 33 (último dato): ' + mainValues[32].join(' | '));
    
    Logger.log('\nMAIN - Conteo de celdas no vacías:');
    let nonEmptyCount = 0;
    for (let r = 0; r < mainValues.length; r++) {
      for (let c = 0; c < mainValues[r].length; c++) {
        if ((mainValues[r][c] + '').trim() !== '') {
          nonEmptyCount++;
        }
      }
    }
    Logger.log('Total de celdas con contenido: ' + nonEmptyCount);
    
    Logger.log('\n✅ Debug completado. Ahora ejecuta archivar()');
    
  } catch(e) {
    Logger.log('debugArchivarProcess error: ' + e);
  }
}

function debugActualTableWidth() {
  try {
    const { main } = getSheets();
    
    Logger.log('=== DEBUG ANCHO REAL DE TABLA ===');
    Logger.log('BASE_WIDTH: ' + BASE_WIDTH);
    Logger.log('BASE_START_COL: ' + BASE_START_COL + ' (' + columnIndexToLetter(BASE_START_COL) + ')');
    
    const storedWidth = getStoredWidth();
    const actualWidth = detectActualTableWidth(main);
    
    Logger.log('Stored width: ' + storedWidth);
    Logger.log('Actual detected width: ' + actualWidth);
    
    Logger.log('\nLeyendo data desde X a ' + columnIndexToLetter(BASE_START_COL + actualWidth - 1));
    
    const fullRange = main.getRange(DATA_START_ROW, BASE_START_COL, ROWS_PER_COLUMN, actualWidth);
    const fullValues = fullRange.getValues();
    
    Logger.log('Fila 1 de datos (fila 182): ' + fullValues[0].slice(0, 10).join(' | '));
    Logger.log('Fila 2 de datos (fila 183): ' + fullValues[1].slice(0, 10).join(' | '));
    
    let nonEmpty = 0;
    for (let r = 0; r < fullValues.length; r++) {
      for (let c = 0; c < fullValues[r].length; c++) {
        if ((fullValues[r][c] + '').trim() !== '') nonEmpty++;
      }
    }
    Logger.log('Total celdas con contenido en ancho real: ' + nonEmpty);
    
  } catch(e) {
    Logger.log('debugActualTableWidth error: ' + e);
  }
}

function testArchivarCompleto() {
  Logger.log('=== TEST COMPLETO ARCHIVAR ===\n');
  
  const { main, reg } = getSheets();
  const tableStartCol = BASE_START_COL;
  
  // ANTES de archivar
  Logger.log('ANTES:');
  const beforeRange = main.getRange(TABLE_START_ROW, tableStartCol, TABLE_ROWS, 10);
  const beforeValues = beforeRange.getValues();
  Logger.log('Fila 1 (fecha): ' + beforeValues[0].slice(0,4).join('|'));
  Logger.log('Fila 4 (títulos): ' + beforeValues[3].slice(0,4).join('|'));
  Logger.log('Fila 5 (datos): ' + beforeValues[4].slice(0,4).join('|'));
  
  let countBefore = 0;
  for (let r = 0; r < beforeValues.length; r++) {
    for (let c = 0; c < beforeValues[r].length; c++) {
      if ((beforeValues[r][c] + '').trim() !== '') countBefore++;
    }
  }
  Logger.log('Total celdas llenas ANTES: ' + countBefore);
  
  // Ejecutar archivar
  Logger.log('\n▶️ Ejecutando archivar()...\n');
  archivar();
  
  // DESPUÉS de archivar
  Utilities.sleep(2000);
  Logger.log('\nDESPUÉS (en REGISTRO_GALA):');
  
  const row1Reg = reg.getRange(1, 1, 1, reg.getLastColumn()).getDisplayValues()[0];
  const lastFecha = row1Reg.filter(v => v.trim() !== '').pop();
  Logger.log('Última fecha guardada: ' + lastFecha);
  
  // Buscar dónde se guardó
  let guardoCol = 0;
  for (let i = 0; i < row1Reg.length; i++) {
    if (row1Reg[i].trim() === lastFecha) {
      guardoCol = i + 1;
      break;
    }
  }
  Logger.log('Guardado en columna: ' + guardoCol + ' (' + columnIndexToLetter(guardoCol) + ')');
  
  // Leer lo que se guardó
  const afterRange = reg.getRange(1, guardoCol, TABLE_ROWS, 10);
  const afterValues = afterRange.getValues();
  Logger.log('Fila 1: ' + afterValues[0].slice(0,4).join('|'));
  Logger.log('Fila 4: ' + afterValues[3].slice(0,4).join('|'));
  Logger.log('Fila 5: ' + afterValues[4].slice(0,4).join('|'));
  
  let countAfter = 0;
  for (let r = 0; r < afterValues.length; r++) {
    for (let c = 0; c < afterValues[r].length; c++) {
      if ((afterValues[r][c] + '').trim() !== '') countAfter++;
    }
  }
  Logger.log('Total celdas llenas DESPUÉS: ' + countAfter);
  
  if (countBefore === countAfter) {
    Logger.log('\n✅ ¡SUCCESS! Las celdas coinciden');
  } else {
    Logger.log('\n❌ ERROR: Celdas no coinciden. ANTES=' + countBefore + ' DESPUÉS=' + countAfter);
  }
}

function debugWidth() {
  const { main } = getSheets();
  
  Logger.log('=== DEBUG ANCHO ===');
  
  // Ver qué hay en la tabla principal ANTES de archivar
  const titleRow = main.getRange(TITLES_ROW, BASE_START_COL, 1, 20).getDisplayValues()[0];
  Logger.log('Títulos fila 179: ' + titleRow.join('|'));
  
  const dataRow = main.getRange(DATA_START_ROW, BASE_START_COL, 1, 20).getDisplayValues()[0];
  Logger.log('Datos fila 182: ' + dataRow.join('|'));
  
  const actualWidth = detectActualTableWidth(main);
  Logger.log('detectActualTableWidth devuelve: ' + actualWidth);
  
  // Leer el rango completo que se va a archivar
  const sourceRange = main.getRange(TABLE_START_ROW, BASE_START_COL, TABLE_ROWS, actualWidth);
  const sourceValues = sourceRange.getValues();
  
  Logger.log('Rango a leer: fila 178, col ' + BASE_START_COL + ', ' + TABLE_ROWS + ' filas x ' + actualWidth + ' cols');
  Logger.log('Fila 1 del rango: ' + sourceValues[0].join('|'));
  Logger.log('Fila 5 del rango: ' + sourceValues[4].join('|'));
}

/* ---------------------- FIN FUNCIONES AGREGADAS ---------------------- */

/* ---------------------- END FILE ---------------------- */

function getRepresentantes() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheetByName('Representantes');
    if (!hoja) return [];
    var lastRow = hoja.getLastRow();
    if (lastRow < 2) return [];
    var datos = hoja.getRange(2, 1, lastRow - 1, 2).getValues();
    var resultado = [];
    for (var i = 0; i < datos.length; i++) {
      var nombre = (datos[i][0] + '').trim();
      var etiqueta = (datos[i][1] + '').trim();
      if (nombre !== '') {
        resultado.push({ nombre: nombre, etiqueta: etiqueta || nombre.toUpperCase() });
      }
    }
    return resultado;
  } catch (e) {
    Logger.log('getRepresentantes error: ' + e);
    return [];
  }
}

/**
 * getMensajesWaves()
 * Lee la plantilla maestra en español desde la hoja "Representantes", celda A31.
 * Devuelve un objeto con los mensajes en todos los idiomas listos para el HTML.
 * Los marcadores {{apellido}} y {{nivel}} se conservan en todos los idiomas.
 */
function getMensajesWaves() {
  var ss          = SpreadsheetApp.getActiveSpreadsheet();
  var hoja        = ss.getSheetByName("Representantes");
  var plantillaES = hoja.getRange("A31").getValue();

  if (!plantillaES) return null;

  // 1. PROTEGER el marcador ANTES de traducir
  var textoProtegido = plantillaES.replace(/\{nivel\}/g, "ZZZNIVELZZZ");

  // 2. Traducir con el marcador protegido
  var cuerpoEN = LanguageApp.translate(textoProtegido, 'es', 'en');
  var cuerpoDE = LanguageApp.translate(textoProtegido, 'es', 'de');
  var cuerpoFR = LanguageApp.translate(textoProtegido, 'es', 'fr');
  var cuerpoPT = LanguageApp.translate(textoProtegido, 'es', 'pt');
  var cuerpoIT = LanguageApp.translate(textoProtegido, 'es', 'it');
  var cuerpoZH = LanguageApp.translate(textoProtegido, 'es', 'zh');

  // 3. RESTAURAR el marcador exactamente como {nivel} en todos los idiomas
  function restaurar(texto) {
    return texto.replace(/ZZZNIVELZZZ/g, "{nivel}");
  }

  return {
    es: "{saludo} {a},\n\n" + plantillaES,
    en: "{saludo} {a},\n\n" + restaurar(cuerpoEN),
    de: "{saludo} {a},\n\n" + restaurar(cuerpoDE),
    fr: "{saludo} {a},\n\n" + restaurar(cuerpoFR),
    pt: "{saludo} {a},\n\n" + restaurar(cuerpoPT),
    it: "{saludo} {a},\n\n" + restaurar(cuerpoIT),
    zh: "{saludo} {a},\n\n" + restaurar(cuerpoZH)
  };
}

function abrirMINIGOLF() {
  const url = 'https://script.google.com/a/macros/iberostar.com/s/AKfycbxk9bTHpkUNrLMfTzu9wp7d8ad29dPS0Cjwt25qXT9BGPXMEyig7hFatWsNuDcMUJX3Cw/exec';
  
  const html = HtmlService.createHtmlOutput(
    '<script>window.open("' + url + '", "MINIGOLF", "width=600,height=800,left=100,top=100"); google.script.host.close();</script>'
  );
  
  SpreadsheetApp.getUi().showModelessDialog(html, ' ');
}

function generarSpamMinigolf() {

  const DEST_NAME            = 'SPAM MINIGOLF';
  const STATE_SHEET_NAME     = '_SPAM_STATE';
  const LINK_CELL            = 'D3';
  const ROWS_PER_COL         = 18;
  const GAP_ROWS             = 2;
  const FIRST_ROW            = 5;
  const COL_HAB_WIDTH        = 60;
  const COL_SI_WIDTH         = 32;
  const COL_NO_WIDTH         = 32;
  const ROW_DATA_HEIGHT      = 20;
  const ROW_TITLE_HEIGHT     = 50;
  const ROW_BUILDING_HEIGHT  = 20;
  const ROW_SUBHEADER_HEIGHT = 18;
  const GREEN_COLOR          = '#B7E1CD';

  const HOTELS = [
    { name: 'MAR',   buildings: seq(10, 21), color: '#0d2161', fontColor: '#FFFFFF' },
    { name: 'BEACH', buildings: seq(30, 41), color: '#a37f5f', fontColor: '#FFFFFF' },
    { name: 'LINDO', buildings: seq(50, 55), color: '#fdce3a', fontColor: '#1C1C1C' },
    { name: 'MAYA',  buildings: seq(60, 66), color: '#2b5a6c', fontColor: '#FFFFFF' },
  ];

  function seq(a, b) {
    return Array.from({ length: b - a + 1 }, (_, i) => a + i);
  }

  function spaceLetters(str) {
    return str.split('').join(' ');
  }

  function toStr(val) {
    if (val instanceof Date) return val.toISOString().substring(0, 10);
    return String(val).trim();
  }

  function toDateOnly(val) {
    if (val instanceof Date) {
      return new Date(val.getFullYear(), val.getMonth(), val.getDate());
    }
    const s = String(val).trim();
    if (!s) return null;
    const d = new Date(s);
    if (isNaN(d)) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  // ── Fechas de referencia ──────────────────────────────────────────
  const now      = new Date();
  const today    = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2);

  const destSS = SpreadsheetApp.getActiveSpreadsheet();
  const dest   = destSS.getSheetByName(DEST_NAME);
  if (!dest) return;

  // ── Borde B3:D3 + ancho col D ─────────────────────────────────────
  dest.getRange('B3:D3').setBorder(true, true, true, true, null, null,
    '#000000', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  dest.setColumnWidth(4, 180);

  // ── Leer link ─────────────────────────────────────────────────────
  const linkValue = dest.getRange(LINK_CELL).getValue().toString().trim();
  if (!linkValue) return;

  const idMatch  = linkValue.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const gidMatch = linkValue.match(/[#&?]gid=(\d+)/);
  if (!idMatch) return;

  const sourceId  = idMatch[1];
  const sourceGid = gidMatch ? parseInt(gidMatch[1]) : null;

  let srcSheet;
  try {
    const srcSS = SpreadsheetApp.openById(sourceId);
    if (sourceGid !== null) srcSheet = srcSS.getSheets().find(s => s.getSheetId() == sourceGid);
    if (!srcSheet) srcSheet = srcSS.getSheets()[0];
  } catch (e) { return; }

  const lastRow = srcSheet.getLastRow();
  if (lastRow < 3) return;

  const raw = srcSheet.getRange(3, 1, lastRow - 2, 8).getValues();

  // ── Construir datos entrantes ──────────────────────────────────────
  const validBuildings = new Set(HOTELS.flatMap(h => h.buildings));
  const buildingRoomsMap = {};

  raw.forEach(row => {
    const room     = String(row[1]).trim();
    const checkin  = toStr(row[6]);
    const checkout = toStr(row[7]);

    if (!/^\d+$/.test(room) || room.length < 2) return;
    const bld = parseInt(room.substring(0, 2));
    if (!validBuildings.has(bld)) return;

    // Si la fecha se puede leer y checkout es hoy o mañana → fuera
    const checkoutDate = toDateOnly(row[7]);
    if (checkoutDate && checkoutDate < dayAfter) return;

    if (!buildingRoomsMap[bld]) buildingRoomsMap[bld] = new Map();
    if (!buildingRoomsMap[bld].has(room)) {
      buildingRoomsMap[bld].set(room, { checkin, checkout });
    }
  });

  const incomingData = {};
  Object.keys(buildingRoomsMap).forEach(b => {
    incomingData[b] = Array.from(buildingRoomsMap[b].entries())
      .sort((a, z) => +a[0] - +z[0])
      .map(([room, data]) => ({ room, ...data }));
  });

  // ── Leer estado anterior (_SPAM_STATE) ────────────────────────────
  let prevState = {};
  let stateSheet = destSS.getSheetByName(STATE_SHEET_NAME);
  if (stateSheet && stateSheet.getLastRow() > 0) {
    const stateData = stateSheet.getRange(1, 1, stateSheet.getLastRow(), 7).getValues();
    stateData.forEach(([room, checkin, checkout, si, no, row, col]) => {
      if (!room) return;
      prevState[String(room)] = {
        checkin  : String(checkin),
        checkout : String(checkout),
        si       : si === '1',
        no       : no === '1',
        row      : Number(row),
        col      : Number(col)
      };
    });
  }

  // ── Comparar si todo es idéntico ──────────────────────────────────
  const incomingFlat = {};
  Object.values(incomingData).forEach(rooms => {
    rooms.forEach(({ room, checkin, checkout }) => {
      incomingFlat[room] = { checkin, checkout };
    });
  });

  const prevRooms     = Object.keys(prevState);
  const incomingRooms = Object.keys(incomingFlat);
  let identical = prevRooms.length === incomingRooms.length;
  if (identical) {
    for (const room of incomingRooms) {
      if (!prevState[room]
        || prevState[room].checkin  !== incomingFlat[room].checkin
        || prevState[room].checkout !== incomingFlat[room].checkout) {
        identical = false;
        break;
      }
    }
  }
  if (identical) return; // ✅ Nada cambió, no hacer nada

  // ── Leer checkboxes EN VIVO de la tabla actual por número de hab ──
  // (ANTES de limpiar, por número de hab — no por posición)
  const liveCheckboxes = {}; // room → { si, no }
  Object.entries(prevState).forEach(([room, data]) => {
    if (data.row && data.col) {
      try {
        const siVal = dest.getRange(data.row, data.col + 1).getValue();
        const noVal = dest.getRange(data.row, data.col + 2).getValue();
        liveCheckboxes[room] = {
          si: siVal === '✓',
          no: noVal === '✗'
        };
      } catch(e) {
        liveCheckboxes[room] = { si: false, no: false };
      }
    }
  });

  // ── Habitaciones con huésped nuevo (mismo cuarto, fechas distintas) ──
  const changedRooms = new Set();
  Object.values(incomingData).forEach(rooms => {
    rooms.forEach(({ room, checkin, checkout }) => {
      if (prevState[room]
        && (prevState[room].checkin !== checkin || prevState[room].checkout !== checkout)) {
        changedRooms.add(room);
      }
    });
  });

  // ── Limpiar desde fila 4 hacia abajo ──────────────────────────────
  const clearStartRow = 4;
  const totalRows = dest.getMaxRows();
  const totalCols = dest.getMaxColumns();

  if (totalRows >= clearStartRow) {
    const merges = dest.getRange(clearStartRow, 1, totalRows - clearStartRow + 1, totalCols).getMergedRanges();
    merges.forEach(m => { try { m.breakApart(); } catch(e) {} });
    dest.getRange(clearStartRow, 1, totalRows - clearStartRow + 1, totalCols).clear();
  }

  // ── Dibujar hoteles ────────────────────────────────────────────────
  let startRow     = FIRST_ROW;
  const greenCells = [];
  const newState   = {};

  HOTELS.forEach(hotel => {

    const active = hotel.buildings
      .filter(b => incomingData[b]?.length > 0)
      .map(b => {
        const rooms    = incomingData[b];
        const numPairs = Math.ceil(rooms.length / ROWS_PER_COL);
        return { building: b, rooms, numPairs };
      });

    if (active.length === 0) return;

    let pairIdx = 0;
    active.forEach(a => { a.startPair = pairIdx; pairIdx += a.numPairs; });
    const totalPairs = pairIdx;

    const titleRow       = startRow;
    const buildingRow    = startRow + 1;
    const subHeaderRow   = startRow + 2;
    const dataRow        = startRow + 3;
    const totalTableRows = 1 + 1 + 1 + ROWS_PER_COL;

    // Columnas y filas suficientes
    const lastColNeeded = 1 + totalPairs * 3 + 2;
    if (lastColNeeded > dest.getMaxColumns()) {
      dest.insertColumnsAfter(dest.getMaxColumns(), lastColNeeded - dest.getMaxColumns() + 6);
    }
    const lastRowNeeded = dataRow + ROWS_PER_COL + GAP_ROWS + 5;
    if (lastRowNeeded > dest.getMaxRows()) {
      dest.insertRowsAfter(dest.getMaxRows(), lastRowNeeded - dest.getMaxRows() + 10);
    }

    // Anchos de columnas
    for (let p = 0; p < totalPairs; p++) {
      const habCol = 2 + p * 3;
      dest.setColumnWidth(habCol,     COL_HAB_WIDTH);
      dest.setColumnWidth(habCol + 1, COL_SI_WIDTH);
      dest.setColumnWidth(habCol + 2, COL_NO_WIDTH);
    }

    // Alturas de filas
    dest.setRowHeight(titleRow,     ROW_TITLE_HEIGHT);
    dest.setRowHeight(buildingRow,  ROW_BUILDING_HEIGHT);
    dest.setRowHeight(subHeaderRow, ROW_SUBHEADER_HEIGHT);
    for (let r = dataRow; r < dataRow + ROWS_PER_COL; r++) {
      dest.setRowHeight(r, ROW_DATA_HEIGHT);
    }

    // ── Título del hotel ─────────────────────────────────────────────
    const titleSpan  = totalPairs * 3;
    const titleRange = dest.getRange(titleRow, 2, 1, titleSpan);
    if (titleSpan > 1) titleRange.merge();
    titleRange
      .setValue(spaceLetters(hotel.name))
      .setFontWeight('bold')
      .setFontSize(28)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle')
      .setBackground(hotel.color)
      .setFontColor(hotel.fontColor)
      .setBorder(true, true, true, true, null, null,
        '#000000', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

    // ── Encabezados de edificio ───────────────────────────────────────
    active.forEach(a => {
      const colStart  = 2 + a.startPair * 3;
      const colSpan   = a.numPairs * 3;
      const blockRows = 1 + 1 + ROWS_PER_COL;

      const bldRange = dest.getRange(buildingRow, colStart, 1, colSpan);
      bldRange.merge();
      bldRange
        .setValue(a.building)
        .setFontWeight('bold')
        .setFontSize(16)
        .setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setBackground('#CCCCCC')
        .setBorder(true, true, true, true, null, null,
          '#000000', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

      // Borde exterior GRUESO del bloque del edificio
      dest.getRange(buildingRow, colStart, blockRows, colSpan)
          .setBorder(true, true, true, true, null, null,
            '#000000', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

      // Subencabezados HAB | SI | NO por cada par
      for (let p = 0; p < a.numPairs; p++) {
        const habCol = 2 + (a.startPair + p) * 3;
        const siCol  = habCol + 1;
        const noCol  = habCol + 2;

        dest.getRange(subHeaderRow, habCol)
            .setValue('HAB').setFontWeight('bold').setFontSize(12)
            .setHorizontalAlignment('center').setVerticalAlignment('middle')
            .setBackground('#E8E8E8')
            .setBorder(true, true, true, true, null, null,
              '#000000', SpreadsheetApp.BorderStyle.SOLID);

        dest.getRange(subHeaderRow, siCol)
            .setValue('SI').setFontWeight('bold').setFontSize(12)
            .setHorizontalAlignment('center').setVerticalAlignment('middle')
            .setBackground('#34A853').setFontColor('#FFFFFF')
            .setBorder(true, true, true, true, null, null,
              '#000000', SpreadsheetApp.BorderStyle.SOLID);

        dest.getRange(subHeaderRow, noCol)
            .setValue('NO').setFontWeight('bold').setFontSize(12)
            .setHorizontalAlignment('center').setVerticalAlignment('middle')
            .setBackground('#EA4335').setFontColor('#FFFFFF')
            .setBorder(true, true, true, true, null, null,
              '#000000', SpreadsheetApp.BorderStyle.SOLID);

        // Borde punteado entre pares del mismo edificio (excepto el último)
        if (p < a.numPairs - 1) {
          dest.getRange(buildingRow, noCol, blockRows, 1)
              .setBorder(null, null, null, true, null, null,
                '#888888', SpreadsheetApp.BorderStyle.DOTTED);
        }
      }
    });

    // ── Habitaciones + checkboxes + espacio muerto ───────────────────
    active.forEach(a => {
      for (let p = 0; p < a.numPairs; p++) {
        const habCol = 2 + (a.startPair + p) * 3;
        const siCol  = habCol + 1;
        const noCol  = habCol + 2;
        const chunk  = a.rooms.slice(p * ROWS_PER_COL, (p + 1) * ROWS_PER_COL);

        if (chunk.length > 0) {
          dest.getRange(dataRow, habCol, chunk.length, 1)
              .setValues(chunk.map(r => [r.room]))
              .setHorizontalAlignment('center')
              .setFontSize(12);

          const siRule = SpreadsheetApp.newDataValidation()
            .requireCheckbox('✓', '').build();
          dest.getRange(dataRow, siCol, chunk.length, 1)
              .setDataValidation(siRule).setHorizontalAlignment('center');

          const noRule = SpreadsheetApp.newDataValidation()
            .requireCheckbox('✗', '').build();
          dest.getRange(dataRow, noCol, chunk.length, 1)
              .setDataValidation(noRule).setHorizontalAlignment('center');

          chunk.forEach(({ room, checkin, checkout }, i) => {
            const row = dataRow + i;
            newState[room] = { checkin, checkout, si: false, no: false, row, col: habCol };

            if (changedRooms.has(room)) {
              // Huésped nuevo → verde 30s, casilla limpia
              greenCells.push({ row, habCol });
              newState[room].si = false;
              newState[room].no = false;

            } else if (liveCheckboxes[room]) {
              // ✅ Mismo huésped → restaurar checkboxes EN VIVO
              if (liveCheckboxes[room].si) dest.getRange(row, siCol).setValue('✓');
              if (liveCheckboxes[room].no) dest.getRange(row, noCol).setValue('✗');
              newState[room].si = liveCheckboxes[room].si;
              newState[room].no = liveCheckboxes[room].no;
            }
            // Hab nueva nunca vista → vacía sin color
          });
        }

        // Espacio muerto — filas sobrantes combinadas
        const emptyCount = ROWS_PER_COL - chunk.length;
        if (emptyCount > 0) {
          const emptyStartRow = dataRow + chunk.length;
          const deadRange = dest.getRange(emptyStartRow, habCol, emptyCount, 3);
          deadRange.merge();
          deadRange.setBackground('#F5F5F5');
        }
      }
    });

    // ── Borde externo de toda la tabla del hotel ──────────────────────
    dest.getRange(titleRow, 2, totalTableRows, totalPairs * 3)
        .setBorder(true, true, true, true, null, null,
          '#000000', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

    startRow = dataRow + ROWS_PER_COL + GAP_ROWS;
  });

  SpreadsheetApp.flush();

  // ── Verde 30 segundos para habs con huésped nuevo ─────────────────
  if (greenCells.length > 0) {
    greenCells.forEach(({ row, habCol }) => {
      dest.getRange(row, habCol).setBackground(GREEN_COLOR);
    });
    SpreadsheetApp.flush();
    Utilities.sleep(30000);
    greenCells.forEach(({ row, habCol }) => {
      dest.getRange(row, habCol).setBackground(null);
    });
    SpreadsheetApp.flush();
  }

  // ── Guardar nuevo estado en hoja oculta ───────────────────────────
  if (!stateSheet) {
    stateSheet = destSS.insertSheet(STATE_SHEET_NAME);
    stateSheet.hideSheet();
  } else {
    stateSheet.clearContents();
  }

  const stateRows = Object.entries(newState).map(([room, d]) => [
    room, d.checkin, d.checkout, d.si ? '1' : '0', d.no ? '1' : '0', d.row, d.col
  ]);
  if (stateRows.length > 0) {
    stateSheet.getRange(1, 1, stateRows.length, 7).setValues(stateRows);
  }
}

function procesarHabitaciones() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Encontrar la columna que tenga "DATOS" en fila 35
  const primeraColConDatos = encontrarColConDatos(sheet);
  
  if (primeraColConDatos === -1) {
    SpreadsheetApp.getUi().alert('Error: No se encontró columna con "DATOS" en fila 35');
    return;
  }
  
  // Leer datos de TODAS las columnas anteriores DE UNA VEZ
  const datosAnteriores = leerDatosAnterioresTodas(sheet, primeraColConDatos);
  
  // Leer habitaciones de la columna actual
  const habs = leerHabitaciones(sheet, primeraColConDatos);
  
  if (habs.length === 0) {
    SpreadsheetApp.getUi().alert('No hay datos para procesar');
    return;
  }
  
  // Limpiar la columna original
  limpiarColumnaOriginal(sheet, primeraColConDatos);
  
  // Procesar habitaciones
  const resultado = procesarHabs(habs, datosAnteriores);
  
  // Escribir en las 3 parejas de columnas DE UNA VEZ
  escribirResultados(sheet, primeraColConDatos, resultado);
  
  // Llenar filas 33, 34 y 35
  llenarFilasEncabezado(sheet, primeraColConDatos);
  
  // Actualizar fecha en fila 33
  actualizarFecha(sheet, primeraColConDatos);
  
  // Aplicar formato a filas 33-35
  aplicarFormato(sheet, primeraColConDatos);
  
  SpreadsheetApp.getUi().alert('¡Proceso completado!');
}

function encontrarColConDatos(sheet) {
  // Buscar "DATOS" en fila 35
  const fila35 = sheet.getRange(35, 1, 1, 702).getValues()[0];
  
  for (let i = 0; i < fila35.length; i++) {
    if (String(fila35[i]).trim().toUpperCase() === 'DATOS') {
      return i + 1; // +1 porque los índices empiezan en 0
    }
  }
  return -1;
}

function leerDatosAnterioresTodas(sheet, colActual) {
  const datos = {};
  
  if (colActual <= 1) return datos;
  
  // Leer TODO desde columna A hasta colActual-1 DE UNA VEZ
  const rango = sheet.getRange(36, 1, 1500, colActual - 1);
  const valores = rango.getValues();
  
  valores.forEach(fila => {
    // Columnas impares (0, 2, 4, 6...) tienen números
    // Columnas pares (1, 3, 5, 7...) tienen nombres
    for (let i = 0; i < fila.length; i += 2) {
      const numVal = String(fila[i]).trim();
      const nomVal = i + 1 < fila.length ? String(fila[i + 1]).trim() : '';
      
      if (numVal !== '' && numVal !== 'undefined') {
        if (!datos[numVal]) {
          datos[numVal] = nomVal;
        }
      }
    }
  });
  
  return datos;
}

function leerHabitaciones(sheet, col) {
  // Leer TODO de la columna DE UNA VEZ
  const rango = sheet.getRange(36, col, 1500, 1);
  const valores = rango.getValues();
  
  const habs = [];
  valores.forEach((fila, index) => {
    const val = String(fila[0]).trim();
    if (val !== '' && val !== 'undefined') {
      habs.push({
        valor: val,
        fila: 36 + index
      });
    }
  });
  
  return habs;
}

function limpiarColumnaOriginal(sheet, col) {
  const rango = sheet.getRange(36, col, 1500, 1);
  rango.clearContent();
}

function procesarHabs(habs, datosAnteriores) {
  const rango1_4 = [];
  const rango5_6 = [];
  const rango7 = [];
  
  habs.forEach(hab => {
    const primerDigito = hab.valor.charAt(0);
    const nombre = datosAnteriores[hab.valor] || '';
    
    if (['1', '2', '3', '4'].includes(primerDigito)) {
      rango1_4.push([hab.valor, nombre]);
    } else if (['5', '6'].includes(primerDigito)) {
      rango5_6.push([hab.valor, nombre]);
    } else if (primerDigito === '7') {
      rango7.push([hab.valor, nombre]);
    }
  });
  
  return {
    rango1_4: rango1_4,
    rango5_6: rango5_6,
    rango7: rango7
  };
}

function escribirResultados(sheet, colInicio, resultado) {
  const datos = [
    {col: colInicio, datos: resultado.rango1_4},
    {col: colInicio + 2, datos: resultado.rango5_6},
    {col: colInicio + 4, datos: resultado.rango7}
  ];
  
  datos.forEach(item => {
    if (item.datos.length > 0) {
      sheet.getRange(36, item.col, item.datos.length, 2).setValues(item.datos);
    }
  });
}

function actualizarFecha(sheet, col) {
  // Leer fila 33 DE UNA VEZ
  const fila33 = sheet.getRange(33, 1, 1, col - 1).getValues()[0];
  
  let ultimaFecha = null;
  
  // Buscar en columnas impares (0, 2, 4, 6...)
  for (let i = 0; i < fila33.length; i += 2) {
    if (fila33[i] !== '' && fila33[i] !== null) {
      ultimaFecha = fila33[i];
    }
  }
  
  if (ultimaFecha !== null && ultimaFecha !== '') {
    const fechaStr = String(ultimaFecha);
    const partes = fechaStr.split('.');
    
    if (partes.length === 2) {
      let dd = parseInt(partes[0]);
      let mm = parseInt(partes[1]);
      
      dd++;
      
      const diasDelMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (dd > diasDelMes[mm - 1]) {
        dd = 1;
        mm++;
        if (mm > 12) {
          mm = 1;
        }
      }
      
      const nuevaFecha = String(dd).padStart(2, '0') + '.' + String(mm).padStart(2, '0');
      
      sheet.getRange(33, col).setValue(nuevaFecha);
      sheet.getRange(33, col + 2).setValue(nuevaFecha);
      sheet.getRange(33, col + 4).setValue(nuevaFecha);
    }
  }
}

function llenarFilasEncabezado(sheet, col) {
  const hoteles = ['M&B', 'L&M', 'JOIA'];
  
  // Deshacer merges previos
  for (let i = 0; i < 6; i += 2) {
    try {
      sheet.getRange(34, col + i, 1, 2).breakApart();
    } catch(e) {}
  }
  
  // Llenar 6 columnas - 3 pares
  for (let i = 0; i < 6; i += 2) {
    const colActual = col + i;
    const hotelIndex = Math.floor(i / 2) % 3;
    const hotel = hoteles[hotelIndex];
    
    const rangoMerge = sheet.getRange(34, colActual, 1, 2);
    rangoMerge.merge();
    rangoMerge.setValue(hotel);
    
    sheet.getRange(35, colActual).setValue('HAB');
    sheet.getRange(35, colActual + 1).setValue('CONCIERGE');
  }
}

function aplicarFormato(sheet, col) {
  const rango = sheet.getRange(33, col, 3, 6);
  
  rango.setBackground('#ead1dc');
  rango.setFontWeight('bold');
  rango.setFontFamily('Arial');
  rango.setFontSize(10);
  rango.setHorizontalAlignment('center');
  rango.setVerticalAlignment('middle');
  
  rango.setBorder(
    true, true, true, true, true, true,
    '#000000',
    SpreadsheetApp.BorderStyle.DOTTED
  );
}
/**
 * getMensajesShowsParaiso()
 * Lee la hoja "SPAM SHOWS PARAISO MAYA" y devuelve los mensajes de los 7 días
 * en inglés (columnas B:H) y español (columnas J:P).
 * La celda superior-izquierda de cada rango combinado contiene el texto completo.
 */
function getMensajesShowsParaiso() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName("SPAM SHOWS PARAISO MAYA");
  if (!hoja) {
    return { error: "No se encontró la hoja 'SPAM SHOWS PARAISO MAYA'" };
  }

  // Celdas superiores-izquierdas de cada rango combinado
  var celdasEN = ["B4", "B13", "B27", "B39", "B48", "B62", "B76"];
  var celdasES = ["J4", "J13", "J27", "J39", "J48", "J62", "J76"];
  var dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  var resultado = { en: {}, es: {} };

  for (var i = 0; i < dias.length; i++) {
    resultado.en[dias[i]] = hoja.getRange(celdasEN[i]).getValue() || "";
    resultado.es[dias[i]] = hoja.getRange(celdasES[i]).getValue() || "";
  }

  return resultado;
}

/**
 * abrirShowsParaiso()
 * Abre la ventana flotante del panel Shows Paraíso Maya.
 */
function abrirShowsParaiso() {
  var url = "https://script.google.com/a/macros/iberostar.com/s/AKfycbzzu-EQRf4Qsz9sQkyByxKgtGPtIcBm0BZ7xd2cPmji72gyhlhPChD41tDP1-wM5PYFOA/exec";
  var html = "<script>window.open('" + url + "?hotel=showsparaiso','_blank','width=520,height=620');google.script.host.close();</script>";
  var ui = HtmlService.createHtmlOutput(html).setWidth(200).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(ui, "Abriendo Shows Paraíso Maya...");
}

/**
 * abrirShowsMaya()
 * Abre la ventana flotante del panel Shows del teatro en Iberostar Maya.
 */
function abrirShowsMaya() {
  var url = "https://script.google.com/a/macros/iberostar.com/s/AKfycbzStF8n0AejxyaQcD9JPQWjmUuEqSZgcl-F5-kDa96ZFr9QUQcP5RoEq4lLG9GWSTXXyA/exec"; // placeholder — reemplazar con la URL real de la implementación
  var html = "<script>window.open('" + url + "?hotel=showsmaya','_blank','width=520,height=700');google.script.host.close();<\/script>";
  var ui = HtmlService.createHtmlOutput(html).setWidth(200).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(ui, "Abriendo Shows Maya...");
}
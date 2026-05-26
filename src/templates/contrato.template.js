export const contratoTemplate = (
  inversionista,
  inversion,
  proyecto
) => {
  // ========== FUNCIONES DE SEGURIDAD ==========
  const safeString = (value, defaultValue = 'No especificado') => {
    if (!value || value === undefined || value === null) return defaultValue;
    if (typeof value === 'string' && value.trim() === '') return defaultValue;
    return String(value).trim();
  };

  const safeNumber = (value, defaultValue = 0) => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  };

  // ========== FORMATEADORES ==========
  const formatoMoneda = (monto, moneda = 'GTQ') => {
    const montoNum = safeNumber(monto, 0);
    const simbolos = { GTQ: 'Q', USD: '$', EUR: '€', QTZ: 'Q' };
    const simbolo = simbolos[moneda] || 'Q';
    return `${simbolo} ${montoNum.toLocaleString('es-GT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatoFecha = (fecha) => {
    if (!fecha) return 'Por definir';
    const date = new Date(fecha);
    if (isNaN(date.getTime())) return 'Fecha inválida';
    return date.toLocaleDateString('es-GT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // ========== DATOS SEGUROS ==========
  const nombres = safeString(inversionista?.nombres, '');
  const apellidos = safeString(inversionista?.apellidos, '');
  const nombreCompleto = `${nombres} ${apellidos}`.trim() || 'Inversionista';
  
  const email = safeString(inversionista?.email, 'No registrado');
  const documento = safeString(inversionista?.documentoIdentidad, 'No especificado');
  const direccion = safeString(inversionista?.direccion, 'Según consta en expediente');
  const telefono = safeString(inversionista?.telefono, 'No especificado');
  
  const tituloProyecto = safeString(proyecto?.titulo, 'Proyecto sin título');
  const categoria = safeString(proyecto?.categoria, 'General');
  const descripcion = safeString(proyecto?.descripcion, 'Sin descripción disponible');
  const riesgos = safeString(proyecto?.riesgos, 'Los riesgos generales del mercado aplican.');
  const condicionesEspeciales = safeString(proyecto?.condicionesEspeciales, 'No aplican condiciones especiales.');
  
  const monto = safeNumber(inversion?.monto_invertido, 0);
  const retorno = safeNumber(inversion?.retorno_estimado, 0);
  const tasa = safeNumber(inversion?.tasa_retorno_aplicada, 0);
  const plazo = safeNumber(inversion?.plazo_dias, 0);
  const moneda = safeString(inversion?.moneda, 'GTQ');
  const estado = safeString(inversion?.estado, 'Pendiente');
  
  const fechaActual = formatoFecha(new Date());
  const fechaRetorno = formatoFecha(inversion?.fecha_retorno_estimada);
  
  const montoFormateado = formatoMoneda(monto, moneda);
  const retornoFormateado = formatoMoneda(retorno, moneda);
  
  const numContrato = `ALV-INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  // Mapeo de estados con colores
  const estadoColor = {
    'pendiente_pago': '#e67e22',
    'activa': '#27ae60',
    'completada': '#2980b9',
    'cancelada': '#c0392b',
    default: '#7f8c8d'
  };
  const estadoColorHex = estadoColor[estado.toLowerCase()] || estadoColor.default;

  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Contrato de Inversión - ${tituloProyecto}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', 'Times New Roman', 'Segoe UI', serif;
            background: #e8ecf1;
            padding: 30px 20px;
        }
        
        /* Contenedor principal con sombra elegante */
        .contrato {
            max-width: 1100px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            border-radius: 8px;
            overflow: hidden;
        }
        
        /* Márgenes internos profesionales */
        .pagina {
            padding: 50px 55px;
        }
        
        /* Encabezado decorativo */
        .header {
            background: linear-gradient(135deg, #0a2b3e 0%, #1a4a6f 100%);
            color: white;
            padding: 35px 55px;
            text-align: center;
            border-bottom: 4px solid #e8b85a;
        }
        
        .header h1 {
            font-size: 26px;
            letter-spacing: 3px;
            font-weight: normal;
            margin-bottom: 8px;
        }
        
        .header h2 {
            font-size: 14px;
            font-weight: normal;
            opacity: 0.85;
            letter-spacing: 1px;
        }
        
        .numero-contrato {
            margin-top: 18px;
            font-family: monospace;
            font-size: 11px;
            background: rgba(255,255,255,0.15);
            display: inline-block;
            padding: 5px 18px;
            border-radius: 30px;
        }
        
        /* Badge de estado */
        .estado-badge {
            display: inline-block;
            background: ${estadoColorHex};
            color: white;
            font-size: 10px;
            font-weight: bold;
            padding: 3px 12px;
            border-radius: 20px;
            margin-left: 12px;
            vertical-align: middle;
            text-transform: uppercase;
        }
        
        /* Secciones */
        .seccion {
            margin-bottom: 32px;
            page-break-inside: avoid;
        }
        
        .seccion-titulo {
            font-size: 16px;
            font-weight: bold;
            color: #1a4a6f;
            border-bottom: 2px solid #e8b85a;
            padding-bottom: 8px;
            margin-bottom: 20px;
            letter-spacing: 0.5px;
        }
        
        /* Grid de 2 columnas para datos */
        .grid-datos {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px 30px;
            background: #f9fafc;
            padding: 20px 25px;
            border-left: 3px solid #e8b85a;
        }
        
        .campo {
            display: flex;
            flex-direction: column;
        }
        
        .campo-label {
            font-size: 9px;
            text-transform: uppercase;
            font-weight: bold;
            color: #6c7a89;
            letter-spacing: 1px;
        }
        
        .campo-valor {
            font-size: 14px;
            font-weight: 600;
            color: #1a2a3a;
            margin-top: 4px;
            word-break: break-word;
        }
        
        /* Tarjetas financieras */
        .financiero-grid {
            display: flex;
            gap: 20px;
            margin-bottom: 25px;
            flex-wrap: wrap;
        }
        
        .tarjeta-financiera {
            flex: 1;
            background: linear-gradient(145deg, #1a4a6f 0%, #0e3a5a 100%);
            color: white;
            padding: 22px 15px;
            text-align: center;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .tarjeta-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            opacity: 0.8;
            margin-bottom: 10px;
        }
        
        .tarjeta-valor {
            font-size: 28px;
            font-weight: bold;
        }
        
        /* Tabla de plazos */
        .tabla-plazos {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        
        .tabla-plazos tr {
            border-bottom: 1px solid #e2e8f0;
        }
        
        .tabla-plazos td {
            padding: 12px 8px;
            vertical-align: top;
        }
        
        .tabla-plazos td:first-child {
            width: 35%;
            font-weight: bold;
            color: #1a4a6f;
        }
        
        /* Cláusulas */
        .clausula {
            margin-bottom: 14px;
            text-align: justify;
            line-height: 1.5;
        }
        
        .clausula-numero {
            font-weight: bold;
            color: #1a4a6f;
            display: inline-block;
            min-width: 75px;
        }
        
        /* Sección de firmas */
        .firmas-container {
            margin-top: 50px;
            display: flex;
            gap: 60px;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        
        .firma {
            flex: 1;
            text-align: center;
        }
        
        .firma-linea {
            border-top: 1.5px solid #1a2a3a;
            width: 100%;
            margin: 30px 0 12px 0;
        }
        
        .firma-nombre {
            font-weight: bold;
            font-size: 14px;
        }
        
        .firma-rol {
            font-size: 11px;
            color: #6c7a89;
            margin-top: 5px;
        }
        
        .firma-fecha {
            font-size: 10px;
            color: #95a5a6;
            margin-top: 8px;
        }
        
        /* Footer */
        .footer {
            background: #f5f7fa;
            padding: 20px 55px;
            text-align: center;
            font-size: 9px;
            color: #7f8c8d;
            border-top: 1px solid #e2e8f0;
        }
        
        /* Ajustes para impresión */
        @media print {
            body {
                background: white;
                padding: 0;
                margin: 0;
            }
            .contrato {
                box-shadow: none;
                border-radius: 0;
            }
            .header {
                background: #0a2b3e;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .tarjeta-financiera {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .estado-badge {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .pagina {
                padding: 40px 45px;
            }
        }
    </style>
</head>
<body>
    <div class="contrato">
        <!-- HEADER DECORATIVO -->
        <div class="header">
            <h1>CONTRATO DE INVERSIÓN PRIVADA</h1>
            <h2>Allevo Sports · Plataforma de Desarrollo Deportivo</h2>
            <div class="numero-contrato">
                ${numContrato}
                <span class="estado-badge">${estado}</span>
            </div>
        </div>
        
        <!-- PÁGINA 1 -->
        <div class="pagina">
            <!-- PARTES -->
            <div class="seccion">
                <div class="seccion-titulo">I. PARTES CONTRATANTES</div>
                <div class="grid-datos">
                    <div class="campo">
                        <span class="campo-label">INVERSIONISTA</span>
                        <span class="campo-valor">${nombreCompleto}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">DOCUMENTO</span>
                        <span class="campo-valor">${documento}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">CORREO ELECTRÓNICO</span>
                        <span class="campo-valor">${email}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">TELÉFONO</span>
                        <span class="campo-valor">${telefono}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">DOMICILIO</span>
                        <span class="campo-valor">${direccion}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">REPRESENTANTE LEGAL</span>
                        <span class="campo-valor">Allevo Sports S.A.</span>
                    </div>
                </div>
            </div>
            
            <!-- PROYECTO -->
            <div class="seccion">
                <div class="seccion-titulo">II. OBJETO DEL CONTRATO</div>
                <div class="grid-datos">
                    <div class="campo">
                        <span class="campo-label">PROYECTO</span>
                        <span class="campo-valor">${tituloProyecto}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">CATEGORÍA</span>
                        <span class="campo-valor">${categoria}</span>
                    </div>
                    <div class="campo" style="grid-column: span 2;">
                        <span class="campo-label">DESCRIPCIÓN</span>
                        <span class="campo-valor">${descripcion}</span>
                    </div>
                </div>
            </div>
            
            <!-- FINANCIERO -->
            <div class="seccion">
                <div class="seccion-titulo">III. TÉRMINOS FINANCIEROS</div>
                
                <div class="financiero-grid">
                    <div class="tarjeta-financiera">
                        <div class="tarjeta-label">MONTO INVERTIDO</div>
                        <div class="tarjeta-valor">${montoFormateado}</div>
                    </div>
                    <div class="tarjeta-financiera">
                        <div class="tarjeta-label">RETORNO ESTIMADO</div>
                        <div class="tarjeta-valor">${retornoFormateado}</div>
                    </div>
                    <div class="tarjeta-financiera">
                        <div class="tarjeta-label">TASA DE RETORNO</div>
                        <div class="tarjeta-valor">${tasa}%</div>
                    </div>
                </div>
                
                <table class="tabla-plazos">
                    <tr><td>Plazo de inversión</td><td>${plazo} días calendario</td></tr>
                    <tr><td>Fecha de inicio</td><td>${fechaActual}</td></tr>
                    <tr><td>Fecha estimada de retorno</td><td>${fechaRetorno}</td></tr>
                    <tr><td>Moneda</td><td>${moneda}</td></tr>
                </table>
            </div>
        </div>
        
        <!-- PÁGINA 2 -->
        <div class="pagina">
            <!-- CLÁUSULAS -->
            <div class="seccion">
                <div class="seccion-titulo">IV. CLÁUSULAS Y CONDICIONES GENERALES</div>
                
                <div class="clausula"><span class="clausula-numero">PRIMERA.</span> El inversionista declara conocer el proyecto y acepta voluntariamente invertir el monto señalado, con el objetivo de obtener el retorno financiero estimado, sujeto a las condiciones operativas y de mercado.</div>
                
                <div class="clausula"><span class="clausula-numero">SEGUNDA.</span> La plataforma Allevo Sports actuará como vehículo de inversión y canalizará los recursos al proyecto designado. Se compromete a rendir informes trimestrales sobre el avance del proyecto.</div>
                
                <div class="clausula"><span class="clausula-numero">TERCERA.</span> El retorno estimado no es garantía absoluta de ganancia. Las inversiones conllevan riesgos inherentes. El inversionista acepta que el rendimiento real puede variar según factores externos al control de la plataforma.</div>
                
                <div class="clausula"><span class="clausula-numero">CUARTA.</span> Plazo y liquidación: Al vencimiento del plazo, Allevo Sports transferirá al inversionista el monto invertido más las ganancias generadas dentro de los 10 días hábiles posteriores a la fecha estimada de retorno.</div>
                
                <div class="clausula"><span class="clausula-numero">QUINTA.</span> Confidencialidad: Las partes se obligan a mantener reserva absoluta sobre los términos financieros y datos sensibles contenidos en este contrato.</div>
                
                <div class="clausula"><span class="clausula-numero">SEXTA.</span> Cesión de derechos: El inversionista no podrá ceder total o parcialmente los derechos derivados de este contrato sin autorización expresa por escrito de Allevo Sports.</div>
                
                <div class="clausula"><span class="clausula-numero">SÉPTIMA.</span> Legislación aplicable: Este contrato se rige por las leyes de la República de Guatemala. Cualquier controversia será sometida a los tribunales competentes de la ciudad de Guatemala.</div>
                
                <div class="clausula"><span class="clausula-numero">OCTAVA. (Riesgos)</span> ${riesgos}</div>
                
                <div class="clausula"><span class="clausula-numero">NOVENA. (Condiciones especiales)</span> ${condicionesEspeciales}</div>
            </div>
            
            <!-- FIRMAS -->
            <div class="seccion">
                <div class="seccion-titulo">V. ACEPTACIÓN Y FIRMAS</div>
                <p style="margin-bottom: 25px; line-height: 1.5;">En señal de conformidad, las partes suscriben el presente contrato en la fecha de su generación electrónica, comprometiéndose al fiel cumplimiento de todas y cada una de las cláusulas anteriores.</p>
                
                <div class="firmas-container">
                    <div class="firma">
                        <div class="firma-linea"></div>
                        <div class="firma-nombre">${nombreCompleto}</div>
                        <div class="firma-rol">Inversionista</div>
                        <div class="firma-fecha">Fecha: ${fechaActual}</div>
                    </div>
                    <div class="firma">
                        <div class="firma-linea"></div>
                        <div class="firma-nombre">Allevo Sports S.A.</div>
                        <div class="firma-rol">Representante Legal</div>
                        <div class="firma-fecha">Fecha: ${fechaActual}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- FOOTER -->
        <div class="footer">
            Documento generado electrónicamente con validez legal según los términos aceptados por el inversionista.<br>
            Allevo Sports · Fomentando el talento deportivo con inversión inteligente.
        </div>
    </div>
</body>
</html>`;
};
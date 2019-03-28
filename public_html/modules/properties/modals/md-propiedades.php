<form id="frmPropiedadesAgregar" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmPropiedadesAgregar-lblTitulo" class="gm-modal-title">Agregar propiedad</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <ul class="nav gm-tabs" data-tab-control="frmPropiedadesAgregar-tabControl">
                        <li id="frmPropiedadesAgregar-tabBtnGeneral"><a href="#frmPropiedadesAgregar-tab-general"><i class="fa fa-info-circle fa-fw"></i></a></li>
                        <li id="frmPropiedadesAgregar-tabBtnImagenes"><a href="#frmPropiedadesAgregar-tab-imagenes"><i class="fa fa-images fa-fw"></i></a></li>
                    </ul>
                </div>
                <div id="frmPropiedadesAgregar-header-addons" class="gm-modal-header-addons"></div>
            </div>
            <div class="gm-modal-body">
                <input id="frmPropiedadesAgregar-hId" type="hidden" value="0">
                <input id="frmPropiedadesAgregar-Origen" type="hidden" value="">
                <input id="frmPropiedadesAgregar-hEstadoAnterior" type="hidden" value="0">
                <input id="frmPropiedadesAgregar-ImagenPrincipal" type="hidden" value="">
                <input id="frmPropiedadesAgregar-AgenteId" type="hidden" value="0">
                <input id="frmPropiedadesAgregar-PropietarioId" type="hidden" value="0">
                <input id="frmPropiedadesAgregar-LocatarioId" type="hidden" value="0">
                <input id="frmPropiedadesAgregar-CompradorId" type="hidden" value="0">
                <input id="frmPropiedadesAgregar-VendedorId" type="hidden" value="0">
                
                <div id="frmPropiedadesAgregar-tabControl" class="tab-content">
                    <div id="frmPropiedadesAgregar-tab-general" class="gm-tab-pane active">
                        <div class="gm-content">
                            <h3 class="gm-section-title">Datos generales</h3>
                            <div class="gm-row">
                                <div class="gm-col-3">
                                    <label>Fecha de Alta</label>
                                    <input id="frmPropiedadesAgregar-txtFechaAlta" type="date" class="gm-form-control" placeholder="" value="<?php echo date("Y-m-d");?>" />
                                </div>
                            </div>
                            <div class="gm-row">
                                
                                <div class="gm-col-3">
                                    <label>Consorcio: </label>
                                    <div class="gm-inputgroup">
                                        <select id='frmPropiedadesAgregar-txtConsorcio' class='gm-form-control'></select>
                                        <button id="frmPropiedadesAgregar-btnConsorcioAgregar" class="gm-btn primary"><i class="fa fa-plus"></i></button>
                                    </div>
                                </div>
                                <div class="gm-col-3">
                                    <label>Tipo de propiedad: </label>
                                    <select id='frmPropiedadesAgregar-txtTipoPropiedad' class='gm-form-control'>
                                    <?php
                                        $params=[
                                            "module"=>"properties_types",
                                            "topic"=>"listar", 
                                        ];
                                        $tipos_propiedades_res = json_decode($CloureSDK->execute($params));
                                        if($tipos_propiedades_res!=null){
                                            if($tipos_propiedades_res->Error==""){
                                                $tipos_propiedades = $tipos_propiedades_res->Response->Registros;
                                                echo "<option value='0'>Sin especificar</option>";
                                                foreach ($tipos_propiedades as $item) {
                                                    echo "<option value='".$item->Id."'>".$item->Nombre."</option>";
                                                }
                                            }
                                        }
                                    ?>
                                    </select>
                                </div>
                                <div class="gm-col-3">
                                    <label>Operación: </label>
                                    <select id="frmPropiedadesAgregar-txtOperacion" type="text" class="gm-form-control" placeholder="">
                                        <option value='0'>Sin especificar</option>
                                        <option value='1'>Alquiler/Venta</option>
                                        <option value='2'>Alquiler</option>
                                        <option value='3'>Alquiler Temporario</option>
                                        <option value='4'>Venta (Disponible)</option>
                                        <option value='5'>Venta (Alquilada)</option>
                                    </select>
                                </div>
                                <div class="gm-col-3">
                                    <label>Estado: </label>
                                    <select id="frmPropiedadesAgregar-txtEstado" class="gm-form-control" disabled>
                                        <option value='0'>No disponible</option>
                                        <option value='1'>Vigente</option>
                                        <option value='2'>Alquilada</option>
                                        <option value='3'>Vendida</option>
                                        <option value='4'>Señada</option>
                                    </select>
                                </div>
                            </div>
                            <div id="frmPropiedadesAgregar-dvGeneral" style="display: none">
                                <div class="gm-row">
                                    <div class="gm-col-3">
                                        <label id="frmPropiedadesAgregar-lblSupTotal">Superficie Total </label>
                                        <input id="frmPropiedadesAgregar-txtSupTotal" type="number" step="0.01" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                    <div id="frmPropiedadesAgregar-colFrente" class="gm-col-3">
                                        <label>Frente (mts)</label>
                                        <input id="frmPropiedadesAgregar-txtSupFrente" type="number" step="0.01" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                    <div id="frmPropiedadesAgregar-colFondo" class="gm-col-3">
                                        <label>Fondo (mts)</label>
                                        <input id="frmPropiedadesAgregar-txtSupFondo" type="number" step="0.01" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                    <div id="frmPropiedadesAgregar-colSupCubierta" class="gm-col-3">
                                        <label id="frmPropiedadesAgregar-lblSupCubierta">Superficie Cubierta </label>
                                        <input id="frmPropiedadesAgregar-txtSupCubierta" type="number" step="0.01" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                    <div id="frmPropiedadesAgregar-colAntiguedad" class="gm-col-3">
                                        <label>Antigüedad </label>
                                        <input type="checkbox" id="frmPropiedadesAgregar-chPropiedadNueva" class="filled-in chk-col-pink" />
                                        <label for="frmPropiedadesAgregar-chPropiedadNueva">A Estrenar</label>
                                        <input id="frmPropiedadesAgregar-txtAntiguedad" type="number" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                    <div id="frmPropiedadesAgregar-colExpensas" class="gm-col-3">
                                        <label>Expensas ($)</label>
                                        <input id="frmPropiedadesAgregar-txtExpensasImporte" type="number" step="0.01" class="gm-form-control" placeholder="" value="0" />
                                    </div>
                                    
                                </div>
                                <div class="gm-row">
                                    <div id="frmPropiedadesAgregar-colContratoAlta" class="gm-col-3">
                                        <label>Alta de contrato</label>
                                        <input id="frmPropiedadesAgregar-txtContratoAlta" type="date" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                    <div id="frmPropiedadesAgregar-colContratoDuracion" class="gm-col-3">
                                        <label>Duración (meses)</label>
                                        <input id="frmPropiedadesAgregar-txtContratoDuracion" type="number" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                    <div id="frmPropiedadesAgregar-colContratoVto" class="gm-col-3">
                                        <label>Vencimiento de contrato</label>
                                        <input id="frmPropiedadesAgregar-txtContratoVto" type="date" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                    <div id="frmPropiedadesAgregar-colProxVto" class="gm-col-3">
                                        <label>Prox Vto</label>
                                        <input id="frmPropiedadesAgregar-txtProxVto" type="date" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                </div>
                            </div>
                            
                            <div class="gm-row">
                                <div class="gm-col-12">
                                    <label>Título</label>
                                    <input id="frmPropiedadesAgregar-txtTitulo" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                            </div>
                            <div class="gm-row">
                                <div class="gm-col-12">
                                    <label>Descripción</label>
                                    <textarea id="frmPropiedadesAgregar-txtDescripcion" type="text" class="gm-form-control" style="min-height: 80px"></textarea>
                                </div>
                            </div>
                            <div id="frmPropiedadesAgregar-dvAmbientes" style="display: none">
                                <h3 class="gm-section-title">Ambientes</h3>
                                <div class="gm-row">
                                    <div class="gm-col-2">
                                        <label>Dormitorios</label>
                                        <input id="frmPropiedadesAgregar-txtDormitorios" type="number" class="gm-form-control" value="" />
                                    </div>
                                    <div class="gm-col-2">
                                        <label>Baños</label>
                                        <input id="frmPropiedadesAgregar-txtBaños" type="number" class="gm-form-control" value="" />
                                    </div>
                                    <div class="gm-col-2">
                                        <label>Ambientes</label>
                                        <input id="frmPropiedadesAgregar-txtAmbientes" type="number" class="gm-form-control" value="" />
                                    </div>
                                </div>
                                <div class="gm-row">
                                    <div class="gm-col-3">
                                        <input type="checkbox" id="frmPropiedadesAgregar-chCochera" class="filled-in chk-col-pink" />
                                        <label for="frmPropiedadesAgregar-chCochera">Cochera</label>
                                    </div>
                                    <div class="gm-col-3">
                                        <input type="checkbox" id="frmPropiedadesAgregar-chPiscina" class="filled-in chk-col-pink" />
                                        <label for="frmPropiedadesAgregar-chPiscina">Piscina</label>
                                    </div>
                                    <div class="gm-col-3">
                                        <input type="checkbox" id="frmPropiedadesAgregar-chQuincho" class="filled-in chk-col-pink" />
                                        <label for="frmPropiedadesAgregar-chQuincho">Quincho</label>
                                    </div>
                                    <div class="gm-col-3">
                                        <input type="checkbox" id="frmPropiedadesAgregar-chHabServicio" class="filled-in chk-col-pink" />
                                        <label for="frmPropiedadesAgregar-chHabServicio">Hab. Servicio</label>
                                    </div>
                                    <div class="gm-col-3">
                                        <input type="checkbox" id="frmPropiedadesAgregar-chCocinaComedor" class="filled-in chk-col-pink" />
                                        <label for="frmPropiedadesAgregar-chCocinaComedor">Cocina/Comedor</label>
                                    </div>
                                    <div class="gm-col-3">
                                        <input type="checkbox" id="frmPropiedadesAgregar-chPatio" class="filled-in chk-col-pink" />
                                        <label for="frmPropiedadesAgregar-chPatio">Patio</label>
                                    </div>
                                    <div class="gm-col-3">
                                        <input type="checkbox" id="frmPropiedadesAgregar-chJardin" class="filled-in chk-col-pink" />
                                        <label for="frmPropiedadesAgregar-chJardin">Jardín</label>
                                    </div>
                                </div>
                            </div>
                            <h3 class="gm-section-title">Ubicación</h3>
                            <div class="gm-row clearfix">
                                <div class="gm-col-4">
                                    <label>País</label>
                                    <select id="frmPropiedadesAgregar-txtPais" class="gm-form-control">
                                        <option value='0'>Sin especificar</option>
                                        <option value='9'>Argentina</option>
                                    </select>
                                </div>
                                <div class="gm-col-4">
                                    <label>Estado/Provincia</label>
                                    <select id="frmPropiedadesAgregar-txtPaisN1" class="gm-form-control">
                                        <option value='0'>Sin especificar</option>
                                    </select>
                                </div>
                                <div class="gm-col-4">
                                    <label>Localidad</label>
                                    <input id="frmPropiedadesAgregar-txtLocalidad" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                            </div>
                            <div class="gm-row clearfix">
                                <div class="gm-col-10">
                                    <label>Dirección</label>
                                    <input id="frmPropiedadesAgregar-txtDireccion" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-2">
                                    <label>CP</label>
                                    <input id="frmPropiedadesAgregar-txtCP" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                            </div>
                            <div class="gm-row">
                                <div class="gm-col-3">
                                    <label>Barrio/Zona</label>
                                    <input id="frmPropiedadesAgregar-txtBarrio" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-3">
                                    <label>Piso</label>
                                    <input id="frmPropiedadesAgregar-txtPiso" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-3">
                                    <label>Dto/Of</label>
                                    <input id="frmPropiedadesAgregar-txtDtoOf" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                            </div>
                            
                            <div id="frmPropiedadesAgregar-dvPrecios" style="display: none">
                                <h3 class="gm-section-title">Precios</h3>
                                <div class="gm-row">
                                    <div class="gm-col-4">
                                        <label>IVA: </label>
                                        <input type="text" id="frmPropiedadesAgregar-txtIVA" class="gm-form-control decimal" placeholder="" value="" />
                                    </div>
                                </div>
                                <div class="gm-row">
                                    <div class="gm-col-6" id="frmPropiedadesAgregar-dvPreciosAlquiler">
                                        <div style="background-color: #4D99D8; color: #fff; padding: 5px; text-align: center">Precio de alquiler</div>
                                        <div class="gm-row">
                                            <div class="gm-col-12">
                                                <select id="frmPropiedadesAgregar-txtAlquilerMoneda" class="gm-form-control">
                                                    <option value="ARS">Pesos (Argentina)</option>
                                                    <option value="USD">Dólar (Estados Unidos)</option>
                                                </select>
                                            </div>
                                            <div class="gm-col-12">
                                                <label>Precio sin IVA</label>
                                                <input type="text" id="frmPropiedadesAgregar-txtAlquilerPrecio" class="gm-form-control decimal" placeholder="" value="" />
                                            </div>
                                            <div class="gm-col-12">
                                                <label>IVA</label>
                                                <input type="text" id="frmPropiedadesAgregar-txtAlquilerIVA" class="gm-form-control" placeholder="" value="" readonly />
                                            </div>
                                            <div class="gm-col-12">
                                                <label>Precio con IVA</label>
                                                <input type="text" id="frmPropiedadesAgregar-txtAlquilerImporte" class="gm-form-control decimal" placeholder="" value="" />
                                            </div>
                                            <div class="gm-col-6">
                                                <label>Comisión (Inicial)</label>
                                                <input type="text" id="frmPropiedadesAgregar-txtAlquilerComisionInicial" class="gm-form-control decimal" placeholder="" value="" />
                                            </div>
                                            <div class="gm-col-6">
                                                <label>Comisión (Mensual)</label>
                                                <input type="text" id="frmPropiedadesAgregar-txtAlquilerComisionMensual" class="gm-form-control decimal" placeholder="" value="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="gm-col-6" id="frmPropiedadesAgregar-dvPreciosVenta">
                                        <div style="background-color: #4D99D8; color: #fff; padding: 5px; text-align: center">Precio de venta</div>
                                        <div class="gm-row">
                                            <div class="gm-col-12">
                                                <select id="frmPropiedadesAgregar-txtVentaMoneda" class="gm-form-control">ç
                                                    <option value="ARS">Pesos (Argentina)</option>
                                                    <option value="USD">Dólar (Estados Unidos)</option>
                                                </select>
                                            </div>
                                            <div class="gm-col-12">
                                                <label>Precio sin IVA</label>
                                                <input type="text" id="frmPropiedadesAgregar-txtVentaPrecio" class="gm-form-control decimal" placeholder="" value="" />
                                            </div>
                                            <div class="gm-col-12">
                                                <label>IVA</label>
                                                <input type="text" id="frmPropiedadesAgregar-txtVentaIVA" class="gm-form-control" placeholder="" value="" readonly />
                                            </div>
                                            <div class="gm-col-12">
                                                <label>Precio con IVA</label>
                                                <input type="text" id="frmPropiedadesAgregar-txtVentaImporte" class="gm-form-control decimal" placeholder="" value="" />
                                            </div>
                                            <div class="gm-col-6">
                                                <label>Comisión</label>
                                                <input type="text" id="frmPropiedadesAgregar-txtVentaComision" class="gm-form-control decimal" placeholder="" value="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <h3 class="gm-section-title">Datos Internos</h3>
                            <div class="gm-row">
                                <div class="gm-col-4">
                                    <label>Número de Carpeta</label>
                                    <div style="display: flex;">
                                        <input id="frmPropiedadesAgregar-txtCarpetaSucursal" style="min-width: 0px; width: auto; flex-grow: 1; flex-basis: 25%;"  type="text" class="gm-form-control" placeholder="" value="" />
                                        <input id="frmPropiedadesAgregar-txtCarpetaNumero"   style="min-width: 0px; width: auto; flex-grow: 2; flex-basis: 50%;"  type="text" class="gm-form-control" placeholder="" value="" />
                                        <input id="frmPropiedadesAgregar-txtCarpetaExtra"    style="min-width: 0px; width: auto; flex-grow: 1; flex-basis: 25%;"  type="text" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                </div>
                                <div class="gm-col-3">
                                    <label>Canal de contacto</label>
                                    <select id="frmPropiedadesAgregar-txtCanal" class="gm-form-control" disabled>
                                        <option value='0'>Sin especificar</option>
                                        <option value='1'>Redes sociales</option>
                                        <option value='2'>Folleteria</option>
                                        <option value='3'>Revistas/Diarios</option>
                                        <option value='4'>Radio</option>
                                        <option value='5'>Televisión</option>
                                        <option value='6'>Internet</option>
                                    </select>
                                </div>
                            </div>
                            <div class="gm-row">
                                <div class="gm-col-3">
                                    <label>Nº Cuenta Rentas</label>
                                    <input id="frmPropiedadesAgregar-txtCuentaRentas" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-3">
                                    <label>Nº Dº Fº Tº Aº</label>
                                    <input id="frmPropiedadesAgregar-txtCuentaDFTA" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-3">
                                    <label>Nº Cta. Municipalidad</label>
                                    <input id="frmPropiedadesAgregar-txtCuentaMunicipalidad" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-3">
                                    <label>Nº Matricula</label>
                                    <input id="frmPropiedadesAgregar-txtMatricula" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-3">
                                    <label>Nº Cta. Agua</label>
                                    <input id="frmPropiedadesAgregar-txtCuentaAgua" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-3">
                                    <label>Nº Cta. Luz</label>
                                    <input id="frmPropiedadesAgregar-txtCuentaLuz" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-3">
                                    <label>PH (Ley 13512)</label>
                                    <input id="frmPropiedadesAgregar-txtPH" type="number" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-3">
                                    <label>Expensas (%)</label>
                                    <input id="frmPropiedadesAgregar-txtExpensasPorcentaje" type="number" step="0.0001" class="gm-form-control" placeholder="" value="0" />
                                </div>
                            </div>
                            <div class="gm-row">
                                <div class="gm-col-12">
                                    <label>Observaciones (Uso interno)</label>
                                    <textarea id="frmPropiedadesAgregar-txtDescripcionInterna" type="text" class="gm-form-control" style="min-height: 80px"></textarea>
                                </div>
                            </div>
                            <div class="gm-row">
                                <div id="frmPropiedadesAgregar-dvAgente" class="gm-col-3">
                                    <label>Agente</label>
                                    <button id="frmPropiedadesAgregar-btnAgente" class="gm-btn primary" type="button" style="width: 100%">Seleccionar/Agregar</button>
                                </div>
                                <div id="frmPropiedadesAgregar-dvPropietario" class="gm-col-3">
                                    <label>Propietario</label>
                                    <button id="frmPropiedadesAgregar-btnPropietario" class="gm-btn primary" type="button" style="width: 100%">Seleccionar/Agregar</button>
                                </div>
                                <div id="frmPropiedadesAgregar-dvLocatario" class="gm-col-3" style="display: none">
                                    <label>Locatario</label>
                                    <button id="frmPropiedadesAgregar-btnLocatario" class="gm-btn primary" type="button" style="width: 100%">Seleccionar/Agregar</button>
                                </div>
                                <div id="frmPropiedadesAgregar-dvComprador" class="gm-col-3" style="display: none">
                                    <label>Comprador</label>
                                    <button id="frmPropiedadesAgregar-btnComprador" class="gm-btn primary" type="button" style="width: 100%">Seleccionar/Agregar</button>
                                </div>
                                <div id="frmPropiedadesAgregar-dvVendedor" class="gm-col-3" style="display: none">
                                    <label>Vendedor</label>
                                    <button id="frmPropiedadesAgregar-btnVendedor" class="gm-btn primary" type="button" style="width: 100%">Seleccionar/Agregar</button>
                                </div>
                            </div>
                            <div id="frmPropiedadesAgregar-GarantesContainer" style="display: none">
                                <div class="gm-row">
                                    <div class="gm-col-12">
                                        <div style="background-color: #3684c4; color: #fff">
                                            <button id="frmPropiedadesAgregar-btnAgregarGarante" class="gm-btn primary" type="button"><i class="fa fa-plus"></i></button><label>Garantes</label>
                                        </div>
                                        <div id="frmPropiedadesAgregar-lstGarantes" class="gm-row"></div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <label for="frmPropiedadesAgregar-chPublicar">Tipo de publicación web</label>
                            <br />
                            <?php
                                /*
                                $theme_file = file_get_contents($_SERVER["DOCUMENT_ROOT"]."/theme_cfg/theme.json");
                                $theme_file_res = json_decode($theme_file);
                                $tipos_publicaciones = $theme_file_res->publish_items;
                                echo "<select id='frmPropiedadesAgregar-txtPublicacionTipo' class='gm-form-control'>";
                                foreach ($tipos_publicaciones as $publish_item) {
                                    echo "<option value='".$publish_item->id."'>".$publish_item->title."</option>";
                                }
                                echo "</select>";
                                */
                            ?>
                        </div>
                    </div>
                    <div id="frmPropiedadesAgregar-tabImpuestos" class="gm-tab-pane">
                        <div id="frmPropiedadesAgregar-lstImpuestos" class="gm-list-items"></div>
                    </div>
                    <div id="frmPropiedadesAgregar-tab-imagenes" class="gm-tab-pane">
                        <div id="frmPropiedadesAgregar-lstImagenes"></div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close" data-dismiss="gm-modal">Cancelar</button>
                <button type="button" class="gm-btn primary btn-save">Guardar</button>
            </div>
		</div>
	</div>
</form>
<script type="text/javascript" src="modules/properties/modals/md-propiedades.js"></script>
<form id="frmProductosAgregar" class="gm-uc-page" method="post" enctype="multipart/form-data">
    <div class="gm-uc-page-header">
            <button id="btnBack" title="Volver" type="button" class="btn-toolbar">
                <svg viewBox="0 0 24 24">
                    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                </svg>
            </button><!--
            --><button id="ucProductos-btnFijarPrecios" title="Fijar Precios" type="button" class="btn-toolbar">
                <svg viewBox="0 0 24 24">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
            </button>
        </div>
    </div>
	<div class="gm-modal-body gm-content">
        <div id="frmProductosAgregar-tabControl" class="tab-content">
            <div id="home" class="gm-tab-pane active">
                <div class="gm-row">
                    <div class="gm-col-6">
                        <label>Tipo de producto: </label>
                        <select id="frmProductosAgregar-txtTipoProducto" name="txtTipoProducto" type="text" class="gm-form-control" placeholder="">
                            <option value='1'>Compra/Venta</option>
                            <option value='2'>Servicio</option>
                            <option value='3'>Servicio recurrente</option>
                        </select>
                    </div>
                    <div id="colSistemaDeMedida" class="gm-col-6">
                        <?php
                            $params=[
                                "module"=>"products_services_units",
                                "topic"=>"get_list"
                            ];
                            $sistemas_de_medidas_res = json_decode($CloureSDK->execute($params));
                            if($sistemas_de_medidas_res!=null){
                                if($sistemas_de_medidas_res->Error==""){
                                    $sistemas_de_medidas = $sistemas_de_medidas_res->Response->Registros;
                                    echo "<label>Sistema de medida: </label>";
                                    echo "<select id='frmProductosAgregar-txtSistemaDeMedida' class='gm-form-control'>";
                                    
                                    foreach ($sistemas_de_medidas as $item) {
                                        echo "<option value='".$item->Id."'>".$item->Title."</option>";
                                    }
                                    echo "</select>";
                                }
                            }
                        ?>
                    </div>
                </div>
                <div class="gm-row">
                    <div class="gm-col-12">
                        <label>Título (Escribe \n si deseas hacer un salto de línea)</label>
                        <input id="frmProductosAgregar-txtTitulo" type="text" class="gm-form-control" placeholder="" value="" />
                    </div>
                </div>
                <div class="gm-row">
                    <div class="gm-col-6">
                        <label>Categoria de nivel 1</label>
                        <div class="gm-inputgroup">
                            <select class="gm-form-control txt-category-n1"></select>
                            <button type="button" class="gm-btn primary btn-add-category1"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                    <div id="frmProductosAgregar_dvCategoriaN2" class="gm-col-6" style="display: none">
                        <label>Categoria de nivel 2</label>
                        <div class="gm-inputgroup">
                            <select class="gm-form-control txt-category-n2"></select>
                            <button type="button" class="gm-btn primary btn-add-category2"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                    <div id="frmProductosAgregar_dvCategoriaN3" class="gm-col-6" style="display: none">
                        <label>Categoria de nivel 3</label>
                        <div class="gm-inputgroup">
                            <select id="frmProductosAgregar-txtCategoriaN3" class="gm-form-control"></select>
                            <button id="frmProductosAgregar-btnAgregarCategoria3" type="button" class="gm-btn primary"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                    <div id="frmProductosAgregar_dvCategoriaN4" class="gm-col-6" style="display: none">
                        <label>Categoria de nivel 4</label>
                        <div class="gm-inputgroup">
                            <select id="frmProductosAgregar-txtCategoriaN4" class="gm-form-control"></select>
                            <button id="frmProductosAgregar-btnAgregarCategoria4" type="button" class="gm-btn primary"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                    
                </div>
                <div id="dvPesoMedidas" class="gm-row">
                    <div class="gm-col-3">
                        <label>Peso (Grs)</label>
                        <input type="text" id="frmProductosAgregar_txtPeso" class="gm-form-control" placeholder="" value="" />
                    </div>
                    <div class="gm-col-3">
                        <label>Ancho (cm)</label>
                        <input type="text" id="frmProductosAgregar_txtAncho" class="gm-form-control" placeholder="" value="" />
                    </div>
                    <div class="gm-col-3">
                        <label>Alto (cm)</label>
                        <input type="text" id="frmProductosAgregar_txtAlto" class="gm-form-control" placeholder="" value="" />
                    </div>
                    <div class="gm-col-3">
                        <label>Largo (cm)</label>
                        <input type="text" id="frmProductosAgregar_txtLargo" class="gm-form-control" placeholder="" value="" />
                    </div>
                </div>
                <div class="gm-row">
                    <div class="gm-col-4">
                        <label>Codigo Interno</label>
                        <input type="text" id="txtCodigo" class="gm-form-control" placeholder="" value="" />
                    </div>
                    <div class="gm-col-8">
                        <label>Codigo de barras</label>
                        <input type="text" id="txtCodigoBarras" class="gm-form-control" placeholder="" value="" />
                    </div>
                </div>
                <div class="gm-row">
                    <div class="gm-col-12">
                        <label>Descripción</label>
                        <textarea id="frmProductosAgregar-txtDescripcion" type="text" class="gm-form-control" placeholder="" style="min-height: 80px;"></textarea>
                    </div>
                </div>
                <div class="gm-row">
                    <div class="gm-col-12">
                        <input id="frmProductosAgregar-chPublicar" type="checkbox" checked/>
                        <label for="frmProductosAgregar-chPublicar">Publicar</label>
                    </div>
                </div>
            </div>
            <div id="tab_precios" class="gm-tab-pane">
                <div class="gm-row">
                    <div class="gm-col-4">
                        <label>IVA: </label>
                        <input type="text" id="frmProductosAgregar-txtIVA" class="gm-form-control decimal" placeholder="" value="" />
                    </div>
                </div>
                <div class="gm-row">
                    <div class="gm-col-6">
                    <div style="background-color: #4D99D8; color: #fff; padding: 5px; text-align: center">Precio de costo</div>
                        <div class="gm-row">
                            <div class="gm-col-12">
                                <label>Precio sin IVA</label>
                                <input type="text" id="frmProductosAgregar-txtCostoPrecio" class="gm-form-control decimal" placeholder="" value="" />
                            </div>
                            <div class="gm-col-12">
                                <label>IVA</label>
                                <input type="text" id="frmProductosAgregar-txtCostoIVA" class="gm-form-control" placeholder="" value="" readonly />
                            </div>
                            <div class="gm-col-12">
                                <label>Precio con IVA</label>
                                <input type="text" id="frmProductosAgregar-txtCostoImporte" class="gm-form-control decimal" placeholder="" value="" />
                            </div>
                        </div>
                    </div>
                    <div class="gm-col-6">
                        <div style="background-color: #4D99D8; color: #fff; padding: 5px; text-align: center">Precio de venta</div>
                        <div class="gm-row">
                            <div class="gm-col-12">
                                <label>Precio sin IVA</label>
                                <input type="text" id="frmProductosAgregar-txtVentaPrecio" class="gm-form-control decimal" placeholder="" value="" />
                            </div>
                            <div class="gm-col-12">
                                <label>IVA</label>
                                <input type="text" id="frmProductosAgregar-txtVentaIVA" class="gm-form-control" placeholder="" value="" readonly />
                            </div>
                            <div class="gm-col-12">
                                <label>Precio con IVA</label>
                                <input type="text" id="frmProductosAgregar-txtVentaImporte" class="gm-form-control decimal" placeholder="" value="" />
                            </div>
                        </div>
                    </div>
                </div>
                <br><br>
                <div id="lblGanancia" style="padding: 5px; width: 100%; display: block; text-align: center; ">Sin ganancias ni perdidas</div>
            </div>
            <div id="imagenes" class="gm-tab-pane">
                <div id="frmProductosAgregar-lstImagenes"></div>
            </div>
            <div id="tab_stock" class="gm-tab-pane">
                
            </div>
            <div id="tab_promocion" class="gm-tab-pane">
                <input type="checkbox" id="chEnPromocion" class="filled-in chk-col-pink">
                <label for="chEnPromocion">En promoción</label>
                <div>
                    <select id="txtTipoPromocion" class="gm-form-control">
                        <option value="fijo">Promoción fija</option>
                        <option value="cantidad">Promoción por cantidad</option>
                    </select>
                </div>
                <div>
                    <label>Precio de venta actual: </label>
                    <label id="lblPrecioVentaInfo">$ <span id="precio_venta"></span></label>
                </div>
                <br>
                <div id="promocion-fija">
                    <div class="gm-row">
                        <div class="gm-col-3">
                            <label>Descuento :</label>
                            <select id="txtTipoDescuentoPromocion" name="txtTipoDescuentoPromocion" class="gm-form-control ms">
                                <option value="lineal" selected>Lineal ($)</option>
                                <option value="porcentual">Porcentual (%)</option>
                            </select>
                        </div>
                        <div class="gm-col-3">
                            <label>Valor :</label>
                            <input id="frmProductosAgregar-txtDescuentoPromocion" name="txtDescuentoPromocion" type="text" class="gm-form-control decimal" />
                        </div>
                        <div class="gm-col-3">
                            <label>Importe Final :</label>
                            <input id="frmProductosAgregar-txtPromocionImporte" name="txtPromocionImporte" type="text" class="gm-form-control decimal" />
                        </div>
                        <div id="lblPromocionBeneficio" class="gm-col-12" style="padding: 5px; width: 100%; display: block; text-align: center; ">
                            Sin ganancias ni perdidas
                        </div>
                    </div>
                </div>
                <div id="promocion-cantidad">
                    <table class="gm-table">
                        <thead>
                            <tr>
                                <td>Desde (Unidades)</td>
                                <td>Descuento x unidad</td>
                                <td>valor</td>
                                <td>Importe</td>
                                <td style="width: 30px"><button id="btnAddCantidad" class='gm-btn primary'><span class='fa fa-plus'></span></button></td>
                            </tr>
                        </thead>
                        <tbody id="promoboxes-content">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript" src="modules/products_services/add.js"></script>
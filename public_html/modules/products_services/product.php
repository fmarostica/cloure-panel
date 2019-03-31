<form id="frmProductosAgregar" class="gm-uc-page" method="post" enctype="multipart/form-data">
    <div class="gm-uc-page-header">
            <button id="btn-back" title="Volver" type="button" class="btn-toolbar">
                <svg viewBox="0 0 24 24">
                    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                </svg>
            </button>
            <button id="btn-save" title="Fijar Precios" type="button" class="btn-toolbar">
                <svg viewBox="0 0 24 24">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
            </button>
        </div>
    </div>
	<div class="gm-uc-page-body">
        <ul class="nav nav-tabs nav-justified">
            <li class="nav-item active">
                <a id="general_tab" class="nav-link" data-toggle="tab" href="#general">
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="#000000" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                </a>
            </li>
            <li class="nav-item">
                <a id="price_tab" class="nav-link" data-toggle="tab" href="#prices">
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="#000000" d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
                    </svg>
                </a>
            </li>
            <li class="nav-item">
                <a id="images_tab" class="nav-link" data-toggle="tab" href="#images">
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="#000000" d="M22,16V4A2,2 0 0,0 20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16M11,12L13.03,14.71L16,11L20,16H8M2,6V20A2,2 0 0,0 4,22H18V20H4V6" />
                    </svg>
                </a>
            </li>
        </ul>
        <div class="py-3 px-3">
            <div id="frmProductosAgregar-tabControl" class="tab-content">
                <div id="general" class="tab-pane active">
                    <div class="row">
                        <div class="col-md-6">
                            <label>Tipo de producto: </label>
                            <select id="frmProductosAgregar-txtTipoProducto" name="txtTipoProducto" type="text" class="form-control" placeholder="">
                                <option value='1'>Compra/Venta</option>
                                <option value='2'>Servicio</option>
                                <option value='3'>Servicio recurrente</option>
                            </select>
                        </div>
                        <div id="colSistemaDeMedida" class="col-md-6">
                            <label>Sistema de medida: </label>
                            <select id='txtSistemaDeMedida' class='form-control'></select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Título</label>
                            <input id="frmProductosAgregar-txtTitulo" type="text" class="form-control" placeholder="" value="" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label>Categoria de nivel 1</label>
                            <div class="input-group mb-3">
                                <select class="form-control txt-category-n1"></select>
                                <div class="input-group-append">
                                    <button class="btn btn-primary btn-sm btn-toolbar" type="button">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="frmProductosAgregar_dvCategoriaN2" class="col-md-6" style="display: none">
                            <label>Categoria de nivel 2</label>
                            <div class="gm-inputgroup">
                                <select class="gm-form-control txt-category-n2"></select>
                                <button type="button" class="btn btn-primary btn-add-category2"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <div id="frmProductosAgregar_dvCategoriaN3" class="col-md-6" style="display: none">
                            <label>Categoria de nivel 3</label>
                            <div class="gm-inputgroup">
                                <select id="frmProductosAgregar-txtCategoriaN3" class="gm-form-control"></select>
                                <button id="frmProductosAgregar-btnAgregarCategoria3" type="button" class="btn btn-primary"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <div id="frmProductosAgregar_dvCategoriaN4" class="col-md-6" style="display: none">
                            <label>Categoria de nivel 4</label>
                            <div class="gm-inputgroup">
                                <select id="frmProductosAgregar-txtCategoriaN4" class="form-control"></select>
                                <button id="frmProductosAgregar-btnAgregarCategoria4" type="button" class="btn btn-primary"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                        
                    </div>
                    <div id="dvPesoMedidas" class="row">
                        <div class="col-md-3">
                            <label>Peso (Grs)</label>
                            <input type="text" id="frmProductosAgregar-txtPeso" class="form-control" placeholder="" value="" />
                        </div>
                        <div class="col-md-3">
                            <label>Ancho (cm)</label>
                            <input type="text" id="frmProductosAgregar-txtAncho" class="form-control" placeholder="" value="" />
                        </div>
                        <div class="col-md-3">
                            <label>Alto (cm)</label>
                            <input type="text" id="frmProductosAgregar-txtAlto" class="form-control" placeholder="" value="" />
                        </div>
                        <div class="col-md-3">
                            <label>Largo (cm)</label>
                            <input type="text" id="frmProductosAgregar-txtLargo" class="form-control" placeholder="" value="" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Codigo Interno</label>
                            <input type="text" id="txtCodigo" class="form-control" placeholder="" value="" />
                        </div>
                        <div class="col-md-8">
                            <label>Codigo de barras</label>
                            <input type="text" id="txtCodigoBarras" class="form-control" placeholder="" value="" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Descripción</label>
                            <textarea id="frmProductosAgregar-txtDescripcion" type="text" class="form-control" placeholder="" style="min-height: 80px;"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <input id="frmProductosAgregar-chPublicar" type="checkbox" checked/>
                            <label for="frmProductosAgregar-chPublicar">Publicar</label>
                        </div>
                    </div>
                </div>
                <div id="prices" class="tab-pane">
                    <div class="row">
                        <div class="col-md-4">
                            <label>IVA: </label>
                            <input type="text" id="frmProductosAgregar-txtIVA" class="form-control decimal" placeholder="" value="" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                        <div style="background-color: #4D99D8; color: #fff; padding: 5px; text-align: center">Precio de costo</div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label>Precio sin IVA</label>
                                    <input type="text" id="frmProductosAgregar-txtCostoPrecio" class="form-control decimal" placeholder="" value="" />
                                </div>
                                <div class="col-md-12">
                                    <label>IVA</label>
                                    <input type="text" id="frmProductosAgregar-txtCostoIVA" class="form-control" placeholder="" value="" readonly />
                                </div>
                                <div class="col-md-12">
                                    <label>Precio con IVA</label>
                                    <input type="text" id="frmProductosAgregar-txtCostoImporte" class="form-control decimal" placeholder="" value="" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div style="background-color: #4D99D8; color: #fff; padding: 5px; text-align: center">Precio de venta</div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label>Precio sin IVA</label>
                                    <input type="text" id="frmProductosAgregar-txtVentaPrecio" class="form-control decimal" placeholder="" value="" />
                                </div>
                                <div class="col-md-12">
                                    <label>IVA</label>
                                    <input type="text" id="frmProductosAgregar-txtVentaIVA" class="form-control" placeholder="" value="" readonly />
                                </div>
                                <div class="col-md-12">
                                    <label>Precio con IVA</label>
                                    <input type="text" id="frmProductosAgregar-txtVentaImporte" class="form-control decimal" placeholder="" value="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br><br>
                    <div id="lblGanancia" style="padding: 5px; width: 100%; display: block; text-align: center; ">Sin ganancias ni perdidas</div>
                </div>
                <div id="images" class="tab-pane">
                    <div>
                        <button class="btn btn-primary btnAddImage" type="button">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="#000000" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                        </button>
                    </div>
                    <div id="frmProductosAgregar-lstImagenes"></div>
                </div>
                <div id="stock" class="tab-pane">
                </div>
            </div>
        </div>
    </div>
</form>
<script src="/modules/products_services/product.js"></script>
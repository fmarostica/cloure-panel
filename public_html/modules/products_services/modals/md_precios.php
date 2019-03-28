<form id="frmProductosPrecios" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmPreciosAgregar_lblTitulo" class="gm-modal-title">Cambio de precios</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <div class="gm-row">
                    <div class="gm-col-6">
                        <label>Cambiar precio de</label>
                        <select id="frmProductosPrecios-txtChangeBy" class="gm-form-control" value="">
                            <option value="all">Todos los productos</option>
                            <option value="category">Productos por categoria</option>
                            <!--<option value="type">Productos por tipo</option>-->
                        </select>
                    </div>
                    <div class="gm-col-6">
                        <label>Operación</label>
                        <select id="frmProductosPrecios-txtOperación" class="gm-form-control" value="">
                            <option value="costo_y_venta" selected>Cambiar precio de costo y venta</option>
                            <option value="costo">Cambiar precio de costo</option>
                            <option value="venta">Cambiar precio de venta</option>
                        </select>
                    </div>
                </div>
                <div id="frmProductosPrecios-dvCategorias" style="display: none">
                    <div class="gm-row">
                        <div class="gm-col-6">
                            <label>Categoria</label>
                            <select id="frmProductosPrecios-txtCategoriasN1" class="gm-form-control" value="">
                                <option value="0">Todas las categorias</option>
                            </select>
                        </div>
                        <div class="gm-col-6">
                            <label>Categoria N2</label>
                            <select id="frmProductosPrecios-txtCategoriasN2" class="gm-form-control" value="">
                                <option value="0">Todas las categorias</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="gm-row">
                    <div class="gm-col-3">
                        <label>IVA: </label>
                        <input type="text" id="frmPreciosAgregar_txtIVA" class="gm-form-control decimal" placeholder="" value="" />
                    </div>
                </div>
                <div class="gm-row">
                    <div class="gm-col-6">
                    <div style="background-color: #4D99D8; color: #fff; padding: 5px; text-align: center">Precio de costo</div>
                        <div class="gm-row">
                            <div class="gm-col-12">
                                <label>Precio sin IVA</label>
                                <input type="text" id="frmPreciosAgregar_txtCostoPrecio" name="txtCostoPrecio" class="gm-form-control decimal" placeholder="" value="" />
                            </div>
                            <div class="gm-col-12">
                                <label>IVA</label>
                                <input type="text" id="frmPreciosAgregar_txtCostoIVA" name="txtCostoIVA" class="gm-form-control" placeholder="" value="" readonly />
                            </div>
                            <div class="gm-col-12">
                                <label>Precio con IVA</label>
                                <input type="text" id="frmPreciosAgregar_txtCostoImporte" name="txtCostoImporte" class="gm-form-control decimal" placeholder="" value="" />
                            </div>
                        </div>
                    </div>
                    <div class="gm-col-6">
                        <div style="background-color: #4D99D8; color: #fff; padding: 5px; text-align: center">Precio de venta</div>
                        <div class="gm-row">
                            <div class="gm-col-12">
                                <label>Precio sin IVA</label>
                                <input type="text" id="frmPreciosAgregar_txtVentaPrecio" name="txtVentaPrecio" class="gm-form-control decimal" placeholder="" value="" />
                            </div>
                            <div class="gm-col-12">
                                <label>IVA</label>
                                <input type="text" id="frmPreciosAgregar_txtVentaIVA" name="txtVentaIVA" class="gm-form-control" placeholder="" value="" readonly />
                            </div>
                            <div class="gm-col-12">
                                <label>Precio con IVA</label>
                                <input type="text" id="frmPreciosAgregar_txtVentaImporte" name="txtVentaImporte" class="gm-form-control decimal" placeholder="" value="" />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button id="btnPreciosGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>

<script type="text/javascript" src="modules/products_services/modals/md_precios.js"></script>
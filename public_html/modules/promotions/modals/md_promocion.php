<form id="frmPromotion" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmPromocionesGlobal_lblTitulo" class="gm-modal-title">Agregar promoción</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <div class="gm-row" style="margin-bottom: 10px">
                    <div class="gm-col-12">
                        <label>Titulo de la promoción</label>
                        <input id="frmPromocion-txtTitulo" name="titulo" type="text" class="gm-form-control" />
                    </div>
                    <div class="gm-col-12">
                        <label>¿Que tipo de promoción usará?</label>
                        <select id="frmPromotion-txtTipoPromocion" name="tipo_promocion" class="gm-form-control">
                            <option value="cantidad">Promoción por cantidad</option>
                            <option value="descuento_individual">Descuento de un producto</option>
                            <option value="descuento_multiple">Descuento de multiples productos</option>
                            <option value="importe_fijo_individual">Especificar un precio fijo de un producto</option>
                            <option value="importe_fijo_multiple">Especificar un precio fijo para multiples productos</option>
                            <option value="kit">Kit de productos a un precio especifico</option>
                        </select>
                    </div>
                </div>

                <div id="frmPromotion-dvProductosAplicables" style="display: none">
                    <div class="gm-row" style="margin-bottom: 10px">
                        <div class="gm-col-12">
                            <label>¿A que productos aplica la promoción?</label>
                            <select id="frmPromotion-txtProductosAplicables" name="sub_tipo_promocion" class="gm-form-control">
                                <option value="todos">A todos mis productos</option>
                                <option value="categoria">A una categoría específica</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div id="frmPromotion-dvCategorias" style="display: none">
                    <div class="gm-row" style="margin-bottom: 10px">
                        <div class="gm-col-6">
                            <label>Categoria de nivel 1</label>
                            <select id="frmPromotion-txtCategoriaN1" name="categoria_n1_id" class="gm-form-control">
                                <option value="0">No tienes categorias de nivel 1</option>
                            </select>
                        </div>
                        <div class="gm-col-6">
                            <label>Categoria de nivel 2</label>
                            <select id="frmPromotion-txtCategoriaN2" name="categoria_n2_id" class="gm-form-control">
                                <option value="0">No tienes categorias de nivel 2</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div id="frmPromotion-dvIndividual" style="display: none">
                    <div class="gm-row" style="margin-bottom: 10px">
                        <div class="gm-col-12">
                            <button id="frmPromocion-btnSeleccionarProducto" type="button" class="gm-form-control">Seleccione un producto...</button>
                        </div>
                    </div>
                </div>

                <div id="frmPromotion-dvValor" style="display: none;">
                    <div class="gm-row">
                        <div class="gm-col-3">
                            <label id="frmPromotion-lblDiscountPrompt">Descuento</label>
                            <input type="text" id="frmPromotion-txtValor" class="gm-form-control decimal" name="valor" />
                        </div>
                    </div>
                </div>

                <div id="frmPromotion-dvCantidades" style="display: none">
                    <table style="width: 100%">
                        <thead>
                            <tr>
                                <td>Cantidades</td>
                                <td style="width: 45px; text-align: right"><button id="frmPromotion-btnAddCantidad" type="button" class='gm-btn btn-success'><span class='fa fa-plus'></span></button></td>
                            </tr>
                        </thead>
                    </table>
                    <table style="width: 100%">
                        <thead>
                            <tr>
                                <td style="width: 30%; text-align: center">Desde</td>
                                <td style="width: 30%; text-align: center">Precio por unidad</td>
                                <td style="width: 30%; text-align: center">Precio total</td>
                                <td style="width: 10%; text-align: right">Borrar</td>
                            </tr>
                        </thead>
                        <tbody id="promoboxes-global-content">
                        </tbody>
                    </table>
                </div>

                <div id="frmPromotion-dvKit" style="display: none">
                    <div class="gm-toolbar">
                        <table style="width: 100%">
                            <thead>
                                <tr>
                                    <td>Productos</td>
                                    <td style="width: 90px; text-align: right">
                                        <button id="frmPromotion-btnAddProducto" type="button" class='gm-icon-button tooltip' data-title="Agregar producto">
                                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                                viewBox="0 0 40 40"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <polygon class="gm-icon-button-color" points="18,35 22,35 22,22 35,22 35,18 22,18 22,5 18,5 18,18 5,18 5,22 18,22 "/>
                                            </svg>
                                        </button>
                                        <button id="frmPromotion-btnAddCategoria" type="button" class='gm-icon-button tooltip' data-title="Agregar categoria">
                                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
                                                viewBox="0 0 40 40"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <g id="Capa_x0020_1">
                                                    <polygon class="gm-icon-button-color" points="18,35 22,35 22,22 35,22 35,18 22,18 22,5 18,5 18,18 5,18 5,22 18,22 "/>
                                                    <path class="gm-icon-button-color" d="M8 8l24 0 0 24 -24 0 0 -24zm-4 -4l32 0 0 32 -32 0 0 -32z"/>
                                                </g>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <table style="width: 100%">
                        <thead>
                            <tr>
                                <td style="width: 80px; text-align: center">Cantidad</td>
                                <td style="text-align: center">Producto/Categoría</td>
                                <td style="width: 50px; text-align: right">Borrar</td>
                            </tr>
                        </thead>
                        <tbody id="promoboxes-productos-kit">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button id="frmPromotion-btnGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>

<script type="text/javascript" src="modules/promotions/modals/md_promocion.js"></script>
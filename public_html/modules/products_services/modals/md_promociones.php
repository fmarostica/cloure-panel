<form id="frmPromocionesGlobal" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmPromocionesGlobal_lblTitulo" class="gm-modal-title">Establecer promociones globales</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <div class="gm-row" style="margin-bottom: 10px">
                    <div class="gm-col-12">
                        <label>¿Como se aplicará la promoción?</label>
                        <select id="frmPromocionesGlobal_txtFormaDeAplicarPromocion" class="gm-form-control">
                            <option value="individual">De forma individual</option>
                            <option value="cant_categoria">Por cantidad (acumulable por categoría)</option>
                        </select>
                    </div>
                </div>
                <div id="frmPromocionesGlobal_dvTodos" class="gm-row" style="margin-bottom: 10px">
                    <div class="gm-col-12">
                        <label>Aplicar a productos perteneciente a:</label>
                    </div>
                    <div class="gm-col-4">
                        <select id="frmPromocionesGlobal_txtTipoProducto" class="gm-form-control">
                            <option value="0">Cualquier tipo de producto</option>
                        </select>
                    </div>
                    <div class="gm-col-4">
                        <select id="frmPromocionesGlobal_txtCategoriaTodos" class="gm-form-control">
                            <option value="0">Cualquier categoria</option>
                        </select>
                    </div>
                    <div class="gm-col-4">
                        <select id="frmPromocionesGlobal_txtMarca" class="gm-form-control">
                            <option value="0">Cualquier marca</option>
                        </select>
                    </div>
                </div>
                <div id="frmPromocionesGlobal_dvCategoria" class="row" style="margin-bottom: 10px; display: none">
                    <div class="gm-col-12">
                        <select id="frmPromocionesGlobal_txtCategoria" class="form-control"></select>
                    </div>
                </div>
                <div class="gm-row">
                    <div class="gm-col-12">
                        <input type="checkbox" id="frmPromocionesGlobal_chEnPromocion" class="filled-in chk-col-pink">
                        <label for="frmPromocionesGlobal_chEnPromocion">En promoción</label>
                    </div>
                </div>
                <div class="gm-row" style="margin-bottom: 10px">
                    <div class="gm-col-12">
                        <label>¿Que tipo de promoción usará?</label>
                        <select id="frmPromocionesGlobal_txtTipoPromocion" class="gm-form-control">
                            <option value="fijo">Promoción fija</option>
                            <option value="cantidad">Promoción por cantidad</option>
                        </select>
                    </div>
                </div>
                <div id="promocion-global-fija" class="gm-row">
                    <div class="gm-col-3">
                        <label>Descuento :</label>
                        <select id="txtTipoDescuentoPromocion" name="txtTipoDescuentoPromocion" class="gm-form-control ms">
                            <option value="lineal" selected>Lineal ($)</option>
                            <option value="porcentual">Porcentual (%)</option>
                        </select>
                    </div>
                    <div class="gm-col-3">
                        <label>Valor :</label>
                        <input id="txtDescuentoPromocion" name="txtDescuentoPromocion" type="text" class="gm-form-control decimal" />
                    </div>
                </div>
                <div id="promocion-global-cantidad" style="display: none">
                    <div class="gm-col-12">
                        <button id="frmPromocionesGlobal_btnAddCantidad" type="button" class='btn2 btn-success'><span class='fa fa-plus'></span></button>
                    </div>
                    <div id="promo-global-cantidades">
                        <div id="promoboxes-global-title" class="gm-row">
                            <div class="gm-col-2">
                                <label>desde (unidades) :</label>
                            </div>
                            <div class="gm-col-3">
                                <label>Tipo Dto :</label>
                            </div>
                            <div class="gm-col-3">
                                <label>Descuento por unidad:</label>
                            </div>
                            <div class="gm-col-2">
                                <label></label>
                            </div>
                        </div>
                        <div id='promoboxes-global-content'>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default" data-dismiss="gm-modal">Cancelar</button>
                <button id="frmPromocionesGlobal_btnGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>

<script type="text/javascript" src="modules/products_services/modals/md_promociones.js"></script>
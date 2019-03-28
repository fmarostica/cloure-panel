<div id="frmPropiedadesPagoAlquiler" class="gm-modal">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmPropiedadesPagoAlquiler-lblTitulo" class="gm-modal-title">Pago de alquileres</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <div style="font-size: 14px; color: #fff; text-align: right; padding: 5px;">
                        Total: <label id="frmPropiedadesPagoAlquiler-lblTotal">0.00</label>
                    </div>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <input id="frmPropiedadesPagoAlquiler-PropiedadId" type="hidden" value="0">
                <table class="gm-table">
                    <thead>
                        <tr>
                            <th style="width: 50%">
                                <div>Detalles</div>
                                <div><input id="frmPropiedadesPagoAlquiler-txtDetalle" type="text" class="gm-form-control" style="width: 100%"/></div>
                            </th>
                            <th>
                                <div>Precio</div>
                                <div><input id="frmPropiedadesPagoAlquiler-txtPrecio" type="number" step=".01" class="gm-form-control" style="width: 100%" /></div>
                            </th>
                            <th>
                                <div>IVA (%)</div>
                                <div><input id="frmPropiedadesPagoAlquiler-txtIVA" type="number" step=".01" class="gm-form-control" style="width: 100%" /></div>
                            </th>
                            <th>
                                <div>Importe</div>
                                <div><input id="frmPropiedadesPagoAlquiler-txtImporte" type="number" step=".01" class="gm-form-control" style="width: 100%" /></div>
                            </th>
                            <th style="width: 30px">
                                <button id="frmPropiedadesPagoAlquiler-btnAgregarDetalle" class="gm-btn primary"><i class="fa fa-plus"></i></button>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="frmPropiedadesPagoAlquiler-lstDetalles"></tbody>
                </table>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button id="frmPropiedadesPagoAlquiler-btnAceptar" type="button" class="gm-btn primary" data-dismiss="gm-modal">Aceptar</button>
            </div>
		</div>
	</div>
</div>
<script type="text/javascript" src="modules/propiedades/modals/md-propiedades-pago-alquiler.js?v=6"></script>
<div id="frmPropiedadesPagar" class="gm-modal">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmPropiedadesPagar-lblTitulo" class="gm-modal-title">Cierre de operación</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <div style="font-size: 14px; color: #fff; text-align: right; padding: 5px;">
                        Total: <label id="frmPropiedadesPagar-lblTotal">0.00</label>
                    </div>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <input id="frmPropiedadesPagar-hOperacionId" type="hidden" value="0">
                <div id="frmPropiedadesPagarPeriodo">
                    <label>Periodo facturado</label>
                    <div class="gm-row">
                        <div class="gm-col-3">
                            <select id="frmPropiedadesPagar-txtMes" class="gm-form-control">
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                        <div class="gm-col-2">
                            <select id="frmPropiedadesPagar-txtAño" class="gm-form-control">
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                            </select>
                        </div>
                    </div>
                </div>
                <table class="gm-table">
                    <thead>
                        <tr>
                            <th style="width: 60%">
                                <div>Detalles</div>
                                <div><input id="frmPropiedadesPagar-txtDetalle" type="text" class="gm-form-control" style="width: 100%"/></div>
                            </th>
                            <th style="width: 30%">
                                <div>Precio</div>
                                <div><input id="frmPropiedadesPagar-txtPrecio" type="number" step=".01" class="gm-form-control" style="width: 100%" /></div>
                            </th>
                            <th style="width: 30%">
                                <div>IVA (%)</div>
                                <div><input id="frmPropiedadesPagar-txtIVA" type="number" step=".01" class="gm-form-control" style="width: 100%" /></div>
                            </th>
                            <th style="width: 30%">
                                <div>Importe</div>
                                <div><input id="frmPropiedadesPagar-txtImporte" type="number" step=".01" class="gm-form-control" style="width: 100%" /></div>
                            </th>
                            <th style="width: 10%">
                                <button id="frmPropiedadesPagar-btnAgregarDetalle" class="gm-btn primary"><i class="fa fa-plus"></i></button>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="frmPropiedadesPagar-lstDetalles"></tbody>
                </table>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default" data-dismiss="gm-modal">Cancelar</button>
                <button id="frmPropiedadesPagar-btnAceptar" type="button" class="gm-btn primary" data-dismiss="gm-modal">Aceptar</button>
            </div>
		</div>
	</div>
</div>
<script type="text/javascript" src="modules/propiedades/modals/md-propiedades-pagar.js?v=6"></script>
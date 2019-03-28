<div id="frmPropiedadesCierre" class="gm-modal">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmPropiedadesCierre-lblTitulo" class="gm-modal-title">Cierre de operación</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <div style="font-size: 14px; color: #fff; text-align: right; padding: 5px;">
                        Total: <label id="frmPropiedadesCierre-lblTotal">0.00</label>
                    </div>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <input id="frmPropiedadesCierre-hOperacionId" type="hidden" value="0">
                <div id="frmPropiedadesCierre-dvPeriodo">
                    <label>Periodo facturado</label>
                    <div class="gm-row">
                        <div class="gm-col-3">
                            <select id="frmPropiedadesCierre-txtMes" class="gm-form-control">
                                <option value="01">Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                <option value="04">Abril</option>
                                <option value="05">Mayo</option>
                                <option value="06">Junio</option>
                                <option value="07">Julio</option>
                                <option value="08">Agosto</option>
                                <option value="09">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                        <div class="gm-col-2">
                            <select id="frmPropiedadesCierre-txtAño" class="gm-form-control">
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
                                <div><input id="frmPropiedadesCierre-txtDetalle" type="text" class="gm-form-control" style="width: 100%"/></div>
                            </th>
                            <th style="width: 30%">
                                <div>Importe</div>
                                <div><input id="frmPropiedadesCierre-txtImporte" type="number" step=".01" class="gm-form-control" style="width: 100%" /></div>
                            </th>
                            <th style="width: 10%">
                                <button id="frmPropiedadesCierre-btnAgregarDetalle" class="gm-btn primary"><i class="fa fa-plus"></i></button>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="frmPropiedadesCierre-lstDetalles"></tbody>
                </table>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default" data-dismiss="gm-modal">Cancelar</button>
                <button id="frmPropiedadesCierre-btnAceptar" type="button" class="gm-btn primary" data-dismiss="gm-modal">Aceptar</button>
            </div>
		</div>
	</div>
</div>
<script type="text/javascript" src="modules/propiedades/modals/md-propiedades-pagar.js?v=6"></script>
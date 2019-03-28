<form id="frmConsorcioImpuestosAgregar" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmConsorcioImpuestosAgregar-lblTitulo" class="gm-modal-title">Agregar impuesto/servicio</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body">
                <div class="gm-content">
                    <input id="frmConsorcioImpuestosAgregar-hId" type="hidden" value="0">
                    <div class="gm-row">
                        <div class="gm-col-4">
                            <label>Nombre del impuesto/servicio</label>
                            <input id="frmConsorcioImpuestosAgregar-txtNombre" type="text" class="gm-form-control" style="width 100%;" placeholder="" value="" />
                        </div>
                        <div class="gm-col-4">
                            <label>Tipo</label>
                            <select id="frmConsorcioImpuestosAgregar-txtTipoServicio" class="gm-form-control" style="width 100%;">
                                <option value="permanente">Servicio permanente</option>
                                <option value="cuotas">Servicio temporal (cuotas)</option>
                            </select>
                        </div>
                        <div id="frmConsorcioImpuestosAgregar-colNumCuotas" class="gm-col-4" style="display: none">
                            <label>N° de Cuotas</label>
                            <input id="frmConsorcioImpuestosAgregar-txtCuotas" type="number" class="gm-form-control" value="1" />
                        </div>
                        <div class="gm-col-4">
                            <label>Periodo</label>
                            <select id="frmConsorcioImpuestosAgregar-txtPeriodoTipo" class="gm-form-control" style="width 100%;">
                                <option value="semanal">Semanal</option>
                                <option value="mensual" selected>Mensual</option>
                                <option value="bimestral">Bimestral</option>
                                <option value="anual">Anual</option>
                            </select>
                        </div>
                        <table class="gm-table">
                            <thead>
                                <tr>
                                    <th>Fecha Vto</th>
                                    <th>Importe</th>
                                    <th style="width: 30px"><button type="button" class="gm-btn primary"><i class="fa fa-plus"></i></button></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default" data-dismiss="gm-modal">Cancelar</button>
                <button id="frmConsorcioImpuestosAgregar-btnGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>

<script type="text/javascript" src="modules/propiedades/modals/md-impuestos.js?v=6"></script>
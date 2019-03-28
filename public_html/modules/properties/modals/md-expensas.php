<form id="frmConsorcioExpensasAgregar" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmConsorcioExpensasAgregar-lblTitulo" class="gm-modal-title">Agregar Liquidación</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extras" style="margin-top: 10px">
                    <div class="gm-row nowrap">
                        <!--
                        <div class="gm-col-3">
                            <input id="frmConsorcioExpensasAgregar-txtFecha" class="gm-form-control" type="date" />
                        </div>
                        -->
                        <div class="gm-col-6">
                            <select id="frmConsorcioExpensasAgregar-txtConsorcio" class="gm-form-control"></select>
                        </div>
                        <div class="gm-col-4">
                            <select id="frmConsorcioExpensasAgregar-txtMes" class="gm-form-control">
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
                            <select id="frmConsorcioExpensasAgregar-txtAño" class="gm-form-control">
                                <option value="2018">2018</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="gm-modal-header-addons">
                    <!--<button id='frmConsorcioExpensasAgregar-btnAgregarImpuesto' class='gm-btn main' type='button'>
                        <i class='fa fa-plus fa-fw'></i>
                    </button>-->
                </div>
            </div>
            <div class="gm-modal-body">
                <input id="frmConsorcioExpensasAgregar-hId" type="hidden" value="0">
                <table class="gm-table">
                    <thead>
                        <tr>
                            <th colspan="2">Expensas</th>
                            <th style="width: 30px"><button id="frmConsorcioExpensasAgregar-btnAgregarExpensa" type="button" class="gm-btn primary"><i class="fa fa-plus"></i></button></th>
                        </tr>
                        <tr>
                            <th>Detalles</th>
                            <th>Importe</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="frmConsorcioExpensasAgregar-lstImpuestos">

                    </tbody>
                </table>
                <!--
                <div id="frmConsorcioExpensasAgregar-lstImpuestos" class="gm-itembox-container">
                </div>-->
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default" data-dismiss="gm-modal">Cancelar</button>
                <button id="frmConsorcioExpensasAgregar-btnGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>

<script type="text/javascript" src="modules/propiedades/modals/md-expensas.js?v=6"></script>
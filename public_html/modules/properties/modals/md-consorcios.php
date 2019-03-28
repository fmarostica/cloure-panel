<form id="frmConsorcioAgregar" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmConsorcioAgregar-lblTitulo" class="gm-modal-title">Agregar consorcio</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <ul class="nav gm-tabs">
                        <li><a data-toggle="tab" data-name="gral" class="hbtn active" href="#home"><i class="fa fa-info-circle fa-fw"></i></a></li>
                        <li><a data-toggle="tab" data-name="prop" class="hbtn" href="#propiedades"><i class="fa fa-cubes"></i></a></li>
                        <li><a data-toggle="tab" data-name="impu" class="hbtn" href="#impuestos"><i class="fa fa-file-alt fa-fw"></i></a></li>
                        <li><a data-toggle="tab" data-name="liqu" class="hbtn" href="#liquidaciones"><i class="fa fa-dollar-sign fa-fw"></i></a></li>
                    </ul>
                </div>
                <div class="gm-modal-header-addons"></div>
            </div>
            <div class="gm-modal-body">
                <input id="frmConsorcioAgregar-hId" type="hidden" value="0">
                <input id="frmConsorcioAgregar-Origen" type="hidden" value="">
                <div class="tab-content">
                    <div id="home" class="gm-tab-pane active">
                        <div class="gm-content">
                            <div class="gm-row">
                                <div class="gm-col-12">
                                    <label>Nombre del consorcio</label>
                                    <input id="frmConsorcioAgregar-txtNombre" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-12">
                                    <label>Dirección</label>
                                    <input id="frmConsorcioAgregar-txtDireccion" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                                <div class="gm-col-4">
                                    <label>Teléfono</label>
                                    <input id="frmConsorcioAgregar-txtTelefono" type="text" class="gm-form-control" placeholder="" value="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="impuestos" class="gm-tab-pane">
                        <div id="frmConsorciosAgregar-lstImpuestos" class="gm-list-items"></div>
                    </div>
                    <div id="propiedades" class="gm-tab-pane">
                        <div id="frmConsorciosAgregar-lstPropiedades" class="gm-list-items"></div>
                    </div>
                    <div id="liquidaciones" class="gm-tab-pane">
                        <div id="frmConsorciosAgregar-lstLiquidaciones" class="gm-list-items"></div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close" data-dismiss="gm-modal">Cancelar</button>
                <button id="frmConsorcioAgregar-btnGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>
<script type="text/javascript" src="modules/propiedades/modals/md-consorcios.js"></script>
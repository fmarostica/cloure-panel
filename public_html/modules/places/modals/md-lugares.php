<form id="frmLugarAgregar" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmLugarAgregar-lblTitulo" class="gm-modal-title">Agregar Lugar</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extras"></div>
            </div>
            <div class="gm-modal-body gm-content">
                <input id="frmLugarAgregar-hId" name="Id" type="hidden" value="0">
                <input id="frmLugarAgregar-hImagenPrincipal" name="hImagenPrincipal" type="hidden" value="">
                <div class="tab-content">
                    <div id="tab_general" class="gm-tab-pane active">
                        <div class="productbox-details">
                            <div class="gm-row">
                                <div class="gm-col-6">
                                    <label>Nombre</label>
                                    <input id="frmLugarAgregar-txtNombre" name="txtNombre" type="text" class="gm-form-control" style="width 100%;" placeholder="" value="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button id="frmLugarAgregar-btnGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>

<script type="text/javascript" src="modules/places/modals/md-lugares.js"></script>
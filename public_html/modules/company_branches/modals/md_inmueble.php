<div id="frmEmpresaInmueble" class="gm-modal" role="dialog">
    <div class="gm-modal-dialog">
        <div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmEmpresaInmueble-lblTitulo" class="gm-modal-title">Agregar sucursal</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!--
                <div class="gm-modal-header-extra">
                    <ul class="gm-tabs">
                        <li class="active"><a data-toggle="tab" href="#general">General</a></li>
                        <li class=""><a data-toggle="tab" href="#comprobantes">Comprobantes</a></li>
                    </ul>
                </div>
                -->
            </div>
            <div class="gm-modal-body">
                <div class="gm-tab-content">
                    <div id="general" class="gm-tab-pane active">
                        <br>
                        <div class="gm-row">
                            <div class="gm-col-6">
                            	<label>Nombre</label>
								<input type="text" id="frmEmpresaInmueble-txtNombre" class="gm-form-control" placeholder="" value="" />
                            </div>
                            <div class="gm-col-12">
                            	<label>Dirección</label>
								<input type="text" id="frmEmpresaInmueble-txtDireccion" class="gm-form-control" placeholder="" value="" />
                            </div>
                        </div>
                    </div>
                    <div id="comprobantes" class="gm-tab-pane">
                        <div id="md_comprobantes" style="margin-top: 10px;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button type="button" class="gm-btn primary btn-save">Guardar</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="modules/company_branches/modals/md_inmueble.js"></script>
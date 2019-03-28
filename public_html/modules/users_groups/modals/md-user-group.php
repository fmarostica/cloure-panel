<div id="frmUsuariosGrupos" class="gm-modal" role="dialog">
    <div class="gm-modal-dialog">
        <div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="lblTitulo" class="gm-modal-title">Agregar grupo</h4>
                    <button type="button" class="close" data-dismiss="gm-modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <ul class="nav gm-tabs" data-tab-control="frmProductosAgregar-tabControl">
                        <li id="frmUsuariosGruposAgregar-tabBtnGeneral"><a href="#home"><i class="fa fa-info-circle fa-fw"></i></a></li>
                        <li id="frmUsuariosGrupos-tabBtnPrivilegios"><a href="#tab_privilegios"><i class="fa fa-lock fa-fw"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
            <div id="frmProductosAgregar-tabControl" class="tab-content">
                    <div id="home" class="gm-tab-pane active">
                        <div class="gm-row">
                            <div class="gm-col-12">
                                <label>Nombre</label>
                                <input id="frmProductosAgregar-txtTitulo" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                        </div>
                        <div class="gm-row">
                            <div class="gm-col-12">
                                <label>Descripción</label>
                                <textarea id="frmProductosAgregar-txtDescripcion" type="text" class="gm-form-control" placeholder="" style="min-height: 80px;"></textarea>
                            </div>
                        </div>
                    </div>
                    <div id="imagenes" class="gm-tab-pane">
                        <div id="frmProductosAgregar-lstImagenes"></div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button id="frmUsuariosGrupos-btnAceptar" type="button" class="gm-btn primary">Guardar</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="modules/users_groups/modals/md-user-group.js"></script>
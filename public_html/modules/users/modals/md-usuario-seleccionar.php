<div id="frmUsuarioSeleccionar" class="gm-modal">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <input id="frmUsuarioSeleccionar-Origen" type="hidden" value="" />
                <div class="gm-modal-header-main">
                    <h4 id="frmUsuarioSeleccionar-lblTitulo" class="gm-modal-title">Selección de usuario</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <button id='frmUsuarioSeleccionar-btnAgregarUsuario' class='gm-btn main' type='button'><i class='fa fa-plus fa-fw'></i></button>
                    <input id="frmUsuarioSeleccionar-txtBuscar" type="text" class="gm-form-control" style="width 100%;" placeholder="Buscar" value="" />
                </div>
            </div>
            <div class="gm-modal-body">
                <input id="frmUsuarioSeleccionar-hId" type="hidden" value="0">
                <div id="frmUsuarioSeleccionar-lstUsuarios"></div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
            </div>
		</div>
	</div>
</div>
<script type="text/javascript" src="modules/users/modals/md-usuario-seleccionar.js"></script>
<div id="frmPropiedadSeleccionar" class="gm-modal">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <input id="frmPropiedadSeleccionar-Origen" type="hidden" value="" />
                <div class="gm-modal-header-main">
                    <h4 id="frmPropiedadSeleccionar-lblTitulo" class="gm-modal-title">Selección de propiedad</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <button id='frmPropiedadSeleccionar-btnAgregarItem' class='gm-btn main' type='button'><i class='fa fa-plus fa-fw'></i></button>
                    <input id="frmPropiedadSeleccionar-txtBuscar" type="text" class="gm-form-control" style="width 100%;" placeholder="Buscar" value="" />
                </div>
            </div>
            <div class="gm-modal-body">
                <input id="frmPropiedadSeleccionar-hId" type="hidden" value="0">
                <div class="gm-row">
                    <div class="gm-col-12">
                    </div>
                    <div id="frmPropiedadSeleccionar-lstItems" class="gm-col-12"></div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default" data-dismiss="gm-modal">Cancelar</button>
            </div>
		</div>
	</div>
</div>
<script type="text/javascript" src="modules/propiedades/modals/md-propiedades-seleccionar.js?v=7"></script>
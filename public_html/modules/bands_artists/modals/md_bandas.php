<form id="frmBandaAgregar" class="gm-modal" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmConsorcioAgregar-lblTitulo" class="gm-modal-title">Agregar banda/artista</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body">
                <div class="gm-content">
                    <div class="tab-content">
                        <div id="tab_general" class="gm-tab-pane active">
                            <div class="productbox-details">
                                <div class="gm-row">
                                    <div class="gm-col-12">
                                        <label>Nombre</label>
                                        <input id="frmBandaAgregar-txtNombre" type="text" class="gm-form-control" style="width 100%;" placeholder="" value="" />
                                    </div>
                                </div>
                            </div>
                            <div class="gm-row">
                                <div class="gm-col-12">
                                    <div class="gm-alert info">Para una mejor presentación en la web la imagen debe ser de 1920x500 píxeles</div>
                                </div>
                                <div class="gm-col-12">
                                    <input id="frmBandasAgregar-File" name='image' type="file" style="display: none" />
                                    <button class="gm-btn primary" id="frmBandasAgregar-btnCambiarImagen" type="button" style="position: absolute; top: 10px; left: 10px;">
                                        <i class="fas fa-image fa-fw"></i>
                                    </button>
                                    <img src="/images/no-photo-portrait.jpg" class="img-cover" style="width: 100%; border: 1px solid #ccc; " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button id="frmBandaAgregar-btnGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>

<!--<script src="modules/cartelera/konva.js"></script>-->
<script type="text/javascript" src="modules/bands_artists/modals/md_bandas.js?v=6"></script>
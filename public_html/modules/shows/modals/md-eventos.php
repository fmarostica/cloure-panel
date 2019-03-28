
<form id="frmFBXHR" method="post" enctype="multipart/form-data"></form>

<form id="frmEventosAgregar" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmEventosAgregar-lblTitulo" class="gm-modal-title">Agregar Evento</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <ul class="nav gm-tabs" data-tab-control="frmEventosAgregar-tabControl">
                        <li id="frmEventosAgregar-tabBtnGeneral"><a href="#home"><i class="fa fa-info-circle fa-fw"></i></a></li>
                        <li id="frmEventosAgregar-tabBtnImagenes"><a href="#imagenes"><i class="fa fa-images fa-fw"></i></a></li>
                    </ul>
                </div>
                <div id="frmEventosAgregar-header-addons" class="gm-modal-header-addons">
                    <!--<button id="frmEventosAgregar-btnPublishFB" type="button" class="gm-btn primary"><i class="fab fa-facebook-f fa-fw"></i></button>-->
                    <select id="frmEventosAgregar-txtPageFB" class="gm-form-control" style="display: none"></select>
                    <div id="frmEventosAgregar-header-addons-dynamic" class="gm-modal-header-addons" style="display: inline-block">
                    </div>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <div id="frmEventosAgregar-tabControl" class="tab-content">
                    <div id="home" class="gm-tab-pane active">
                        <div class="productbox-details">
                            <div class="gm-row">
                                <div class="gm-col-2">
                                    <input id="frmEventosAgregar-txtFecha" name="fecha" type="date" class="gm-form-control" />
                                </div>
                                <div class="gm-col-5">
                                    <div class="gm-inputgroup">
                                        <select id="frmEventosAgregar-txtArtista" name="artista_id" class="gm-form-control"></select>
                                        <button id="frmEventosAgregar-btnArtistaAdd" type="button" class="gm-btn primary"><i class="fa fa-plus"></i></button>
                                    </div>
                                </div>
                                <div class="gm-col-5">
                                    <div class="gm-inputgroup">
                                        <select id="frmEventosAgregar-txtLugar" name="lugar_id" class="gm-form-control"></select>
                                        <button id="frmEventosAgregar-btnLugarAdd" type="button" class="gm-btn primary"><i class="fa fa-plus"></i></button>
                                    </div>
                                </div>
                            
                            </div>
                            <div class="gm-row">
                                <div class="gm-col-12">
                                    <div class="gm-alert info"><i class="fa fa-info-circle"></i> Puede elegir una imagen personalizada para el evento, En caso de no subir ninguna imagen se usará la imagen del artista en su lugar. Para una mejor presentación en la web la imagen debe ser de 1920x500 píxeles</div>
                                </div>
                                <div class="gm-col-12">
                                    <input id="frmEventosAgregar-File" name="imagen-portada" type="file" style="display: none" />
                                    <img id="frmEventosAgregar-img" class="gm-editor" src="/images/no-photo-portrait.jpg" style="width: 100%; border: 1px solid #ccc; " />
                                    <button class="gm-btn primary" id="frmEventosAgregar-btnCambiarImagen" type="button" style="position: absolute; top: 10px; left: 10px;">
                                        <i class="fas fa-image fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="frmEventosAgregar-FotografosContainer">
                            <div class="gm-row">
                                <div class="gm-col-12">
                                    <div style="background-color: #3684c4; color: #fff">
                                        <button id="frmEventosAgregar-btnAgregarFotografo" class="gm-btn primary" type="button"><i class="fa fa-plus"></i></button><label>Fotógrafos</label>
                                    </div>
                                    <div id="frmEventosAgregar-lstFotografos" class="gm-row"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="imagenes" class="gm-tab-pane">
                        <input id="frmEventosAgregar-btnImagenes" type="file" style="display: none" />
                        <div id="frmEventosAgregar-lstImagenes" ></div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button id="frmEventosAgregar-btnGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>
<script type="text/javascript" src="modules/shows/modals/md-eventos.js"></script>
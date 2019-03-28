<form id="frmAcademiaActividadAgregar" class="gm-modal" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmConsorcioAgregar-lblTitulo" class="gm-modal-title">Agregar actividad</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body">
                <div class="gm-content">
                    <div class="tab-content">
                        <div id="tab_general" class="gm-tab-pane active">
                            <!--
                            <div class="productbox-details">
                                <div class="gm-row">
                                    <div class="gm-col-12">
                                        <label>Nombre</label>
                                        <input id="frmAcademiaActividadAgregar-txtNombre" type="text" class="gm-form-control" style="width 100%;" placeholder="" value="" />
                                    </div>
                                </div>
                            </div>
                            <div class="gm-row">
                                <div class="gm-col-12">
                                    <div class="gm-alert info">Para una mejor presentación en la web la imagen debe ser de 1920x500 píxeles</div>
                                </div>
                            </div>
                            -->
                            <div class="gm-row">
                                <div class="gm-col-4">
                                    <input id="frmBandasAgregar-File" name='image' type="file" style="display: none" />
                                    <button class="gm-btn primary" id="frmBandasAgregar-btnCambiarImagen" type="button" style="position: absolute; top: 10px; left: 10px;">
                                        <i class="fas fa-image fa-fw"></i>
                                    </button>
                                    <img src="/images/no-photo-portrait.jpg" class="img-cover" style="width: 100%; border: 1px solid #ccc; height: 150px; object-fit: cover;" />
                                </div>
                                <div class="gm-col-8">
                                    <div class="gm-row">
                                        <div class="gm-col-12">
                                            <label>Nombre</label>
                                            <input id="frmAcademiaActividadAgregar-txtNombre" type="text" class="gm-form-control" style="width 100%;" placeholder="" value="" />
                                        </div>
                                        <div class="gm-col-12">
                                            <label>Profesor/a</label>
                                            <button id="frmAcademiaActividadAgregar-btnProfesor" type="button" class="gm-btn" style="width: 100%;">Seleccione...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="gm-row">
                                <div class="gm-col-12">
                                    <label>Descripción</label>
                                    <textarea id="frmAcademiaActividadAgregar-txtDescripcion" type="text" class="gm-form-control" style="width 100%; height: 100px;"></textarea>
                                </div>
                            </div>
                            <div class="gm-toolbar">
                                <table style="width: 100%">
                                    <thead>
                                        <tr>
                                            <td>Horarios</td>
                                            <td style="width: 90px; text-align: right">
                                                <button id="frmAcademiaActividadAgregar-btnAddHorario" type="button" class='gm-icon-button tooltip' data-title="Agregar horario">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                                        viewBox="0 0 40 40"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <polygon class="gm-icon-button-color" points="18,35 22,35 22,22 35,22 35,18 22,18 22,5 18,5 18,18 5,18 5,22 18,22 "/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <table class="gm-table" style="width: 100%">
                                <thead>
                                    <tr>
                                        <td>Día</td>
                                        <td style="width: 50px; text-align: center">Desde</td>
                                        <td style="width: 50px; text-align: center">Hasta</td>
                                    </tr>
                                </thead>
                                <tbody id="table-actividades-horarios">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button id="frmAcademiaActividadAgregar-btnGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>

<!--<script src="modules/cartelera/konva.js"></script>-->
<script type="text/javascript" src="modules/academy_activities/modals/md_activity.js"></script>
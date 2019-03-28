<form id="frmPropiedadesSeguimientoAgregar" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmPropiedadesSeguimientoAgregar-lblTitulo" class="gm-modal-title">Agregar seguimiento</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <ul class="nav gm-tabs">
                        <li><a data-toggle="tab" data-name="gral" class="hbtn active" href="#general"><i class="fa fa-info-circle fa-fw"></i></a></li>
                        <!--<li><a data-toggle="tab" data-name="prop" class="hbtn" href="#historia"><i class="fa fa-clock"></i></a></li>-->
                    </ul>
                </div>
                <div class="gm-modal-header-addons"></div>
            </div>
            <div class="gm-modal-body">
                <div class="tab-content">
                    <div id="general" class="gm-tab-pane active">
                        <div class="gm-content">
                            <input id="frmPropiedadesSeguimientoAgregar-hId" type="hidden" value="0">
                            <div class="gm-row">
                                <div class="gm-col-6">
                                    <label>Contacto</label>
                                    <button id="frmPropiedadesSeguimientoAgregar-btnContacto" type="button" class="gm-btn primary" style="width: 100%">Seleccionar</button>
                                </div>
                                <div class="gm-col-6">
                                    <label>Canal por el cual se comunica</label>
                                    <select id="frmConsorcioImpuestosAgregar-txtTipoServicio" class="gm-form-control" style="width 100%;">
                                        <option value="telefono">Teléfono</option>
                                        <option value="mail">Mail</option>
                                        <option value="otros">Otros</option>
                                    </select>
                                </div>
                                <div class="gm-col-12">
                                    <label>Origen por el cual se comunica</label>
                                    <select id="frmConsorcioImpuestosAgregar-txtTipoServicio" class="gm-form-control" style="width 100%;">
                                        <option value="propiedad-cataloogo">Consulta por propiedad en cátalogo</option>
                                        <!--<option value="propiedad-especifica">Consulta por propiedad especifica</option>-->
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="frmPropiedadesSeguimientoAgregar-dvPropiedadCatalogo" class="">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label>Propiedad</label>
                                    <button id="frmPropiedadesSeguimientoAgregar-btnPropiedad" type="button" class="gm-btn primary" style="width: 100%">Seleccionar</button>
                                </div>
                            </div>
                        </div>
                        <div id="frmPropiedadesSeguimientoAgregar-dvPropiedadEspecifica" class="">
                            <!--
                            <div class="row">
                                <div class="col-sm-3">
                                    <label>Baños</label>
                                    <input id="frmPropiedadesSeguimientoAgregar-btnPropiedad" class="gm-form-control" />
                                </div>
                            </div>
                            -->
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <label>Estado</label>
                                <select id="frmPropiedadesSeguimientoAgregar-txtEstado" class="gm-form-control">
                                    <option value="abierto">Abierto</option>
                                    <option value="abierto">Cerrado</option>
                                </select>
                            </div>
                            <div class="col-sm-4">
                                <label>Resultado</label>
                                <select id="frmPropiedadesSeguimientoAgregar-txtEstado" class="gm-form-control">
                                    <option value="abierto">Operacion concretada</option>
                                    <option value="abierto">Operacion NO concretada</option>
                                </select>
                            </div>
                            <div class="col-sm-4">
                                <label>Motivo</label>
                                <select id="frmPropiedadesSeguimientoAgregar-txtEstado" class="gm-form-control">
                                    <option>Precio muy caro</option>
                                    <option>Muchos requisitos</option>
                                    <option>No le gusto la propiedad</option>
                                    <option>No le gusto la zona donde se encuentra la propiedad</option>
                                    <option>Otros motivos</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div id="historia" class="gm-tab-pane">
                        <div class="">
                            <table class="gm-table">
                                <thead>
                                    <tr>
                                        <th>Actividades/Historial</th>
                                        <th style="width: 30px"><button type="button" class="gm-btn primary"><i class="fa fa-plus"></i></button></th>
                                    </tr>
                                </thead>
                                <tbody id="frmPropiedadesSeguimientoAgregar-lstActividades">
                                    <tr>
                                        <td>
                                            <div class="gm-row">
                                                <div class="col-sm-4">
                                                    <label>Actividad</label>
                                                    <select id="" class="gm-form-control">
                                                        <option>Muestra de propiedad</option>
                                                        <option>Buscar propiedad</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-4">
                                                    <label>Fecha</label>
                                                    <input type="date" class="gm-form-control" placeholder="dd/mm/yyyy" />
                                                </div>
                                                <div class="col-sm-4">
                                                    <label>Usuario asignado</label>
                                                    <select id="" class="gm-form-control">
                                                        <option>Productor de pruebas</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-12">
                                                    <label>Detalles</label>
                                                    <textarea class="gm-form-control" rows="3" style="min-height: 80px"></textarea>
                                                </div>
                                                <div class="col-sm-6">
                                                    <label>Resultado</label>
                                                    <select id="" class="gm-form-control">
                                                        <option>Cliente desea concretar la operación</option>
                                                        <option>Cliente NO desea concretar la operación</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-6">
                                                    <label>Motivo</label>
                                                    <select id="" class="gm-form-control">
                                                        <option>Precio muy caro</option>
                                                        <option>Muchos requisitos</option>
                                                        <option>No le gusto la propiedad</option>
                                                        <option>No le gusto la zona donde se encuentra la propiedad</option>
                                                        <option>Otros motivos</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-12">
                                                    <label>Observaciones</label>
                                                    <textarea class="gm-form-control" rows="3" style="min-height: 80px"></textarea>
                                                </div>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default" data-dismiss="gm-modal">Cancelar</button>
                <button id="frmPropiedadesSeguimientoAgregar-btnGuardar" type="button" class="gm-btn primary">Guardar</button>
            </div>
		</div>
	</div>
</form>

<script type="text/javascript" src="modules/propiedades/modals/md-seguimiento.js?v=6"></script>
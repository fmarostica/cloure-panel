
<div id="frmMensaje" class="gm-modal">
    <div class="gm-modal-dialog modal-lg">
        <div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmConsorcioAgregar-lblTitulo" class="gm-modal-title">Mensaje</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <input type="hidden" id="frmMensaje_id" val="0" />
                <!--
                <div id="frmMensajes-readonly">
                    <div class="gm-row">
                        <div class="gm-col-12">
                            <label>Area: Ventas</label>
                        </div>
                    </div>
                </div>
                -->
                <div id="frmMensajes-create">
                    <div class="gm-row">
                        <div class="gm-col-12">
                          <label>Para</label>
                            <select id="frmMensajes-txtGrupo" class="gm-form-control">
                                <option value="0" selected>Otros contactos</option>
                            </select>
                        </div>
                        <div class="gm-col-6">
                            <label>Email</label>
                            <input id="frmMensajes-txtMail" class="gm-form-control" />
                        </div>
                        <div class="gm-col-6">
                            <label>Teléfono celular (sin 0 ni 15)</label>
                            <input id="frmMensajes-txtTelefono" class="gm-form-control" />
                        </div>
                        <div class="gm-col-12">
                            <label>Asunto</label>
                            <input id="frmMensajes-txtAsunto" class="gm-form-control" />
                        </div>
                    </div>
                </div>
                <!--
                <div>
                    <div class="gm-row">
                        <div class="gm-col-12">
                            <label>Mensaje</label>
                            <textarea id="frmMensaje_Texto" class="gm-form-control" style="width: 100%; min-height: 100px;"></textarea><br/><br/>
                        </div>
                    </div>
                </div>
                -->
                <div class="gm-row mensajes">
                    
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cerrar</button>
                <!--<button id="frmMensaje_btnEnviar" type="button" class="gm-btn success">Enviar</button>-->
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="modules/messages/modals/md_mensajes.js"></script>
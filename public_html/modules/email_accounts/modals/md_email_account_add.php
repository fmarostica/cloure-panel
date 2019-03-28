
<div id="frmEmailAccountAdd" class="gm-modal">
    <div class="gm-modal-dialog modal-lg">
        <div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmEmailAccountAdd-lblTitulo" class="gm-modal-title">Agregar cuenta</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <input type="hidden" id="frmMensaje_id" val="0" />
                <div id="frmEmailAccount-dvAddMode">
                    <div class="gm-row" style="margin-top: 5px">
                        <div id="dvEntidad" class="gm-col-6">
                            <label id="lblEntidad" style="width: 100%">Casilla de correo</label>
                            <input id="frm_mail_account_add_txtMailName" class="gm-form-control" type="text" />
                        </div>
                        <div class="gm-col-6 dvCheque">
                            <label style="width: 100%">Dominio</label>
                            <select id="frm_mail_account_add_txtMailAddress" class="gm-form-control">
                                <option value="dominio.com">@dominio.com</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="frmEmailAccount-dvEditMode">
                    <div class="gm-row" style="margin-top: 5px">
                        <div id="dvEntidad" class="gm-col-12">
                            <label id="frmEmailAccount-lblEmail" style="width: 100%">test@cloure.com</label>
                        </div>
                    </div>
                </div>
                <div class="gm-row" style="margin-top: 5px">
                    <div class="gm-col-6">
                        <label id="lblEntidad" style="width: 100%">Clave</label>
                        <input id="frm_mail_account_add_txtPass" class="gm-form-control" type="password" />
                    </div>
                    <div class="gm-col-6">
                        <label id="lblEntidad" style="width: 100%">Repetir clave</label>
                        <input id="frm_mail_account_add_txtRepeatPass" class="gm-form-control" type="password" />
                    </div>
                </div>
                <div style="width: 100%">Si no especifica una clave la misma se generará automaticamente</div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cerrar</button>
                <button id="frm_email_account_add_btnSave" type="button" class="gm-btn success">Guardar</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="modules/email_accounts/modals/md_email_account_add.js"></script>
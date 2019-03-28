<form id="frmUsuariosAgregar" method="POST" enctype="multipart/form-data" class="gm-modal" role="dialog">
    <div class="gm-modal-dialog">
        <div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 class="gm-modal-title">Add user</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extra">
                    <ul class="nav gm-tabs" data-tab-control="frmUsuariosAgregar-tabControl">
                        <li class="active"><a data-toggle="tab" href="#frmUsuariosAgregar-tab-general"><i class="fas fa-info-circle fa-fw"></i></a></li>
                        <li class=""><a data-toggle="tab" href="#frmUsuariosAgregar-tab-ubicacion"><i class="fa fa-map-marker fa-fw"></i></a></li>
                        <li class=""><a data-toggle="tab" href="#frmUsuariosAgregar-tab-comercial"><i class="fa fa-dollar-sign fa-fw"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="gm-modal-body">
                <input id="frmUsuariosAgregar_UsuarioId" type="hidden" value="0">
                <div class="gm-alert info alert-free" style="margin: 10px; text-align:center; display:none;">
                    Estas usando una versión gratuita de Cloure, por lo tanto no podrás agregar usuarios administrativos ni grupos personalizados. <a href="https://cloure.com/es/" target="_blank">Conoce nuestros planes</a>
                </div>
                <div id="frmUsuariosAgregar-tabControl" class="gm-tab-content">
                    <div id="frmUsuariosAgregar-tab-general" class="gm-tab-pane active">
                        <div class="gm-row">
                            <div class="gm-col-3">
                                <input id="frmUsuariosAgregar-fileImg" name="file" class="gm-image-changeable-file" type="file" />
                                <div class="gm-image-changeable">
                                    <img id="frmUsuariosAgregar-profileImg" src="/images/user-icon.png" class="gm-image-changeable-image" style="object-fit: cover;" />
                                    <button id="frmUsuariosAgregar-btnCambiarImagen" type="button" class="gm-btn primary" style="position: absolute; top: 10px; right: 10px;"><i class="fa fa-camera"></i></button>
                                </div>
                            </div>
                            <div class="gm-col-9">
                                <div class="row">
                                    <div class="col-sm-6 col-md-6">
                                        <label class="field-last-name">Last name</label>
                                        <input type="text" id="frmUsuariosAgregar_txtApellido" class="gm-form-control" name="apellido" value="" />
                                    </div>
                                    <div class="col-sm-6 col-md-6">
                                        <label class="field-name">Name</label>
                                        <input type="text" id="frmUsuariosAgregar_txtNombre" class="gm-form-control" name="nombre" value="" />
                                    </div>

                                    <div class="col-sm-6 col-md-6">
                                        <label class="field-birthdate">Birth date</label>
                                        <input type="date" id="frmUsuariosAgregar-txtFechaNacimiento" name="fecha_nac" class="gm-form-control" placeholder="dd/mm/yyyy" />
                                    </div>
                                    <div class="col-sm-6 col-md-6">
                                        <label class="field-gender">Gender</label>
                                        <select id="frmUsuariosAgregar-txtSexo" name="sexo" class="gm-form-control">
                                            <option value="">Select...</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-6 col-md-6">
                                        <div id="frmUsuariosAgregar_dv_grupo">
                                            <label class="field-group">Group</label>
                                            <div class="gm-inputgroup">
                                                <select name="grupo_id" id="frmUsuariosAgregar_txtGrupo" class="gm-form-control txt-grupo"></select>
                                                <button type="button" class="gm-btn primary btn-add-group"><i class="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <!--
                                        <div class="col-sm-6 col-md-6">
                                            <label class="field-balance">Balance ($)</label>
                                            <input id="frmUsuariosAgregar_txtSaldo" class="gm-form-control" type="text" value="">
                                        </div>
                                    -->
                                    <div class="col-sm-6 col-md-6">
                                        <label class="field-identification-type">Identification type</label>
                                        <select id="frmUsuariosAgregar_txtTipoDocumentoId" name="documento_tipo" class="gm-form-control"></select>
                                    </div>
                                    <div class="col-sm-6 col-md-6">
                                        <label class="field-identification-number">ID Number</label>
                                        <input id="frmUsuariosAgregar_txtDocumentoNro" name="documento_numero" type="text" class="gm-form-control" placeholder="" value="" />
                                    </div>

                                    <div class="col-sm-6 col-md-6">
                                        <label class="field-company">Company</label>
                                        <input type="text" id="frmUsuariosAgregar_txtEmpresa" class="gm-form-control" placeholder="" value="" />
                                    </div>
                                    <div class="col-sm-6 col-md-6">
                                        <label class="field-iva-condition">Iva condition</label>
                                        <select id="frmUsuariosAgregar_txtCondicionIvaId" class="gm-form-control"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="gm-row">
                            <div class="col-sm-6">
                                <label class="field-how-do-you-find-us">How do you find us?</label>
                                <div class="gm-inputgroup">
                                    <select id="frmUsuariosAgregar_txtCanal" class="gm-form-control"><option>Select...</option></select>
                                    <button id="frmUsuariosAgregar-btnAgregarCanal" type="button" class="gm-btn primary"><i class="fa fa-plus"></i></button>
                                </div>
                            </div>
                            <div class="col-sm-6">
                            	<label class="field-telephone">Telephone</label>
                                <div class="gm-row nowrap">
                                    <div class="gm-col-3">
                                        <select id="frmUsuariosAgregar_txtTelefonoCodPais" class="gm-form-control"></select>
                                    </div>
                                    <div class="gm-col-3">
                                        <select id="frmUsuariosAgregar_txtTelefonoEmpresa" class="gm-form-control">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                    <div class="gm-col-6">
                                        <input type="text" id="frmUsuariosAgregar-txtTelefono" class="gm-form-control numeric" value="" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                            	<label class="field-email">Email</label>
                                <input id="frmUsuariosAgregar_txtMail" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                            <div class="col-sm-6">
                            	<label class="field-website">Website</label>
                                <input id="frmUsuariosAgregar_txtWeb" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                            <div class="col-sm-12">
                                <label class="field-observations">Observations</label>
                                <textarea id="txtObservaciones" rows="8" class="gm-form-control"></textarea>
                            </div>
                        </div>
                    </div>
                    <div id="frmUsuariosAgregar-tab-ubicacion" class="gm-tab-pane">
                        <div class="row clearfix">
                            <div class="col-sm-4">
                            	<label class="field-country">Country</label>
								<select id="frmUsuariosAgregar_txtPais" class="gm-form-control">
                                    <option value='0'>Select</option>
                                </select>
                            </div>
                            <div class="col-sm-4">
								<label class="field-state-province">State/Province</label>
                                <select id="frmUsuariosAgregar_txtPaisN1" class="gm-form-control">
                                    <option value='0'>Select</option>
                                </select>
                            </div>
                            <div class="col-sm-4">
								<label class="field-city">City</label>
                                <input id="frmUsuariosAgregar_txtLocalidad" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                        </div>
                        <div class="gm-row clearfix">
                            <div class="col-sm-9">
                            	<label class="field-address">Address</label>
								<input id="frmUsuariosAgregar_txtDireccion" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                            <div class="col-sm-3">
								<label class="field-zip-postal-code">Zip/Postal Code</label>
                                <input id="frmUsuariosAgregar_txtCP" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
								<label class="field-building">Building</label>
                                <input id="frmUsuariosAgregar_txtEdificio" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                            <div class="col-sm-3">
								<label class="field-floor-number">Floor</label>
                                <input id="frmUsuariosAgregar_txtPiso" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                            <div class="col-sm-3">
                            	<label class="field-apartment-number">Apartment</label>
								<input id="frmUsuariosAgregar_txtDtoOf" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                        </div>
                    </div>
                    <div id="frmUsuariosAgregar-tab-comercial" class="gm-tab-pane">
                        <div class="gm-row clearfix">
                            <div class="gm-col-2">
                            	<label class="field-discount">Discount (%)</label>
								<input id="txtDescuento" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                            <div class="gm-col-12">
                                <br>
                                <input type="checkbox" name="rememberme" id="chPermiteCC" class="filled-in chk-col-pink">
                                <label class="field-allow-current-account" for="chPermiteCC">Allow current account?</label>
                            </div>
                        </div>
                        <div class="gm-row">
                            <div class="gm-col-3">
								<label class="field-maximum-balance-allowed">Maximum balance allowed</label>
                                <input id="txtSaldoMax" type="text" class="gm-form-control" placeholder="" value="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close btn-close" data-dismiss="gm-modal">Discard</button>
                <button type="button" class="gm-btn primary btn-save">Save</button>
            </div>
        </div>
    </div>
</form>

<script type="text/javascript" src="modules/users/modals/md_usuarios.js"></script>
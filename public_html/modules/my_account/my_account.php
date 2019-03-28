<div id="ucPerfil" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-filters">
            <button id="ucProductos-btnAgregar" title="Agregar producto" type="button" class="btn-toolbar">
                <svg viewBox="0 0 24 24">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
            </button>
        </div>
    </div>
    <div class="gm-uc-page-body py-3 px-3">
        <div class="row">
            <div class="col-md-4">
                <div class="gm-image-changeable">
                    <input id="ucPerfil-fileImg" name="file" class="gm-image-changeable-file" type="file" />
                    <img id="ucPerfil-UserPhoto" src="http://cloure.com/images/logo250.png" />
                    <button id="ucPerfil-btnCambiarImagen" type="button" class="gm-btn primary" style="position: absolute; top: 10px; right: 10px;"><i class="fa fa-camera"></i></button>
                </div>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6">
                        <label>Nombre</label>
                        <input class="form-control txtNombre" type="text" value="" />
                    </div>
                    <div class="col-md-6">
                        <label for="Apellido">Apellido</label>
                        <input class="form-control txtApellido" type="text" value="" />
                    </div>
                    <div class="col-md-6">
                        <label>Empresa</label>
                        <input class="form-control txtEmpresa" type="text" value="" />
                    </div>
                    <div class="col-md-6">
                        <label>Email</label>
                        <input class="form-control txtMail" type="text" value="" />
                    </div>
                    <div class="col-md-6">
                        <label>País</label>
                        <select class="form-control txtPais">
                            <option value="0">Seleccione...</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label>Provincia</label>
                        <select class="form-control txtPaisN1">
                            <option value="0">Seleccione...</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label>Ciudad</label>
                        <input type="text" class="form-control txtCiudad" />
                    </div>
                    <div class="col-md-6">
                        <label>Fecha de Nacimiento</label>
                        <input type="date" class="form-control txtFechaNacimiento" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="gm-uc-page-footer"></div>
</div>
<script src = "modules/my_account/my_account.js"></script>
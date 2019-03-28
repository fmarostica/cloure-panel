<form id="frmUsuariosGrupos" method="POST" enctype="multipart/form-data">
    <div class="gm-uc-page-header">
        <button id="btnBack" title="Volver" type="button" class="btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
        </button>
        <button id="btnAceptar" title="Guardar" type="button" class="btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
        </button>
    </div>
    <div class="gm-uc-page-body py-3 px-3">
        <div id="frmProductosAgregar-tabControl" class="tab-content">
            <div id="home" class="gm-tab-pane active">
                <div class="row">
                    <div class="col-md-12">
                        <label>Nombre</label>
                        <input id="frmProductosAgregar-txtTitulo" name="nombre" type="text" class="form-control" placeholder="" value="" />
                    </div>
                    <div class="col-md-12">
                        <label>Descripción</label>
                        <textarea id="frmProductosAgregar-txtDescripcion" name="descripcion" type="text" class="form-control" placeholder="" style="min-height: 80px;"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>        
</form>
<script type="text/javascript" src="/modules/users_groups/add.js"></script>
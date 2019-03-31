<form id="frmProductosPrecios" class="gm-uc-page" enctype="multipart/form-data">
    <div class="gm-uc-page-header">
            <button id="btn-back" title="Volver" type="button" class="btn-toolbar">
                <svg viewBox="0 0 24 24">
                    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                </svg>
            </button>
            <button id="btn-save" title="Fijar Precios" type="button" class="btn-toolbar">
                <svg viewBox="0 0 24 24">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
            </button>
        </div>
    </div>
    <div class="gm-uc-page-body py-3 px-3">
        <div class="row">
            <div class="col-md-6">
                <label>Cambiar precio de</label>
                <select id="frmProductosPrecios-txtChangeBy" class="form-control" value="">
                    <option value="all">Todos los productos</option>
                    <option value="category">Productos por categoria</option>
                    <!--<option value="type">Productos por tipo</option>-->
                </select>
            </div>
            <div class="col-md-6">
                <label>Operación</label>
                <select id="frmProductosPrecios-txtOperación" class="form-control" value="">
                    <option value="costo_y_venta" selected>Cambiar precio de costo y venta</option>
                    <option value="costo">Cambiar precio de costo</option>
                    <option value="venta">Cambiar precio de venta</option>
                </select>
            </div>
        </div>
        <div id="frmProductosPrecios-dvCategorias" style="display: none">
            <div class="row">
                <div class="col-md-6">
                    <label>Categoria</label>
                    <select id="frmProductosPrecios-txtCategoriasN1" class="form-control" value="">
                        <option value="0">Todas las categorias</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label>Categoria N2</label>
                    <select id="frmProductosPrecios-txtCategoriasN2" class="form-control" value="">
                        <option value="0">Todas las categorias</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <label>IVA: </label>
                <input type="text" id="frmPreciosAgregar_txtIVA" class="form-control decimal" placeholder="" value="" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
            <div style="background-color: #4D99D8; color: #fff; padding: 5px; text-align: center">Precio de costo</div>
                <div class="row">
                    <div class="col-md-12">
                        <label>Precio sin IVA</label>
                        <input type="text" id="frmPreciosAgregar_txtCostoPrecio" name="txtCostoPrecio" class="form-control decimal" placeholder="" value="" />
                    </div>
                    <div class="col-md-12">
                        <label>IVA</label>
                        <input type="text" id="frmPreciosAgregar_txtCostoIVA" name="txtCostoIVA" class="form-control" placeholder="" value="" readonly />
                    </div>
                    <div class="col-md-12">
                        <label>Precio con IVA</label>
                        <input type="text" id="frmPreciosAgregar_txtCostoImporte" name="txtCostoImporte" class="form-control decimal" placeholder="" value="" />
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div style="background-color: #4D99D8; color: #fff; padding: 5px; text-align: center">Precio de venta</div>
                <div class="row">
                    <div class="col-md-12">
                        <label>Precio sin IVA</label>
                        <input type="text" id="frmPreciosAgregar_txtVentaPrecio" name="txtVentaPrecio" class="form-control decimal" placeholder="" value="" />
                    </div>
                    <div class="col-md-12">
                        <label>IVA</label>
                        <input type="text" id="frmPreciosAgregar_txtVentaIVA" name="txtVentaIVA" class="form-control" placeholder="" value="" readonly />
                    </div>
                    <div class="col-md-12">
                        <label>Precio con IVA</label>
                        <input type="text" id="frmPreciosAgregar_txtVentaImporte" name="txtVentaImporte" class="form-control decimal" placeholder="" value="" />
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</form>

<script type="text/javascript" src="modules/products_services/modals/md_precios.js"></script>
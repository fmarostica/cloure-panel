<form id="frmFacturacionMedidas" class="gm-modal" role="dialog">
    <div class="gm-modal-dialog">
        <div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmFinalizarOperacion-lblTitulo" class="gm-modal-title">Calcular medidas</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <div class="row">
                    <div class="col-sm-4">
                        <label>Cantidad</label>
                        <input id="frmFacturacionMedidas-txtCantidad" class="gm-form-control" type="text" value="1" />
                    </div>
                    <div class="col-sm-4">
                        <label>Ancho</label>
                        <input id="frmFacturacionMedidas-txtAncho" class="gm-form-control" type="text" />
                    </div>
                    <div class="col-sm-4">
                        <label>Alto</label>
                        <input id="frmFacturacionMedidas-txtAlto" class="gm-form-control" type="text" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <label>Observaciones</label>
                        <input id="frmFacturacionMedidas-txtObservaciones" class="gm-form-control" type="text" value="" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <label><input id="frmFacturacionMedidas-chDesperdicio" class="gm-form-control" type="checkbox" /> Calcular desperdicio</label>
                    </div>
                </div>
                <div id="frmFacturacionMedidas-dvDesperdicio" class="row" style="display: none">
                    <div class="col-sm-4">
                        <label>Lado Menor</label>
                        <input id="frmFacturacionMedidas-txtLadoMenor" class="gm-form-control" type="text" />
                    </div>
                    <div class="col-sm-4">
                        <label>Precio de desperdicio x mt2</label>
                        <input id="frmFacturacionMedidas-txtPrecioDesperdicio" class="gm-form-control" type="text" />
                    </div>
                    <div class="col-sm-4">
                        <label>Importe de desperdicio</label>
                        <input id="frmFacturacionMedidas-txtImporteDesperdicio" class="gm-form-control" type="text" disabled />
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn danger close">Cancelar</button>
                <button type="button" id="frmFacturacionMedidas-btnAceptar" class="gm-btn success" >Aceptar</button>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript" src="modules/invoicing/modals/md-medidas.js?v=7"></script>
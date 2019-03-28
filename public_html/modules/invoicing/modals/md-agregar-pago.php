<form id="frmFacturacionAgregarPago" class="gm-modal" role="dialog">
    <div class="gm-modal-dialog">
        <div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmFacturacionAgregarPago-lblTitulo" class="gm-modal-title">Finalizar operación</h4>
                    <button type="button" class="close" data-dismiss="gm-modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <label for="frmFacturacionAgregarPago-txtFormaDePago">Forma de pago: </label>
                <select id="frmFacturacionAgregarPago-txtFormaDePago" class="gm-form-control">
                    <?php
                        $params=["module"=>"payments_methods", "topic"=>"get_list"];
                        $formas_de_pago = json_decode($CloureSDK->execute($params));
                        foreach ($formas_de_pago->Response->Registros as $key => $registro) {
                            echo "<option value='".$registro->Id."'>".$registro->Name."</option>";
                        }
                    ?>
                </select>
                <label for="frmFacturacionAgregarPago-txtEntrega">Entrega: </label>
                <input id="frmFacturacionAgregarPago-txtEntrega" type="text" class="gm-form-control" value="0" />
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn danger close">Cancelar</button>
                <button type="button" id="frmFacturacionAgregarPago-btnAceptar" class="gm-btn success" >Aceptar</button>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript" src="modules/invoicing/modals/md-agregar-pago.js"></script>
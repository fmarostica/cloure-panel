<div id="frmUsuariosAgregarPago" class="gm-modal" role="dialog">
    <div class="gm-modal-dialog">
        <div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="lblTitulo" class="gm-modal-title">Agregar pago</h4>
                    <button type="button" class="close" data-dismiss="gm-modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="gm-modal-body gm-content">
                <input type="hidden" id="frmAgregarPago_hComprobanteId" value="0" />
                <div class="gm-row" style="margin-top: 5px;">
                    <div class="gm-col-12">
                        <?php
                            $params=[
                                "module"=>"payments_methods",
                                "topic"=>"get_list"
                            ];
                            $fp_res = json_decode($CloureSDK->execute($params));
                            if($fp_res!=null){
                                if($fp_res->Error==""){
                                    $fp = $fp_res->Response->Registros;
                                    echo "<label>Forma de pago: </label>";
                                    echo "<select id='frmAgregarPago_txtFormaDePago' class='gm-form-control'>";
                                    
                                    foreach ($fp as $item) {
                                        echo "<option value='".$item->Id."'>".$item->Name."</option>";
                                    }
                                    echo "</select>";
                                } else{
                                    var_dump($fp_res->Error);
                                }
                            }
                        ?>
                    </div>
                </div>
                <div class="gm-row" style="margin-top: 5px">
                    <div id="dvEntidad" class="gm-col-9" style="display: none;">
                        <label id="lblEntidad" style="width: 100%">Entidad</label>
                        <select id="frmAgregarPago_txtFormaDePagoEntidad" class="gm-form-control">
                        </select>
                    </div>
                    <div class="gm-col-3 dvCheque" style="display: none">
                        <label style="width: 100%">Cheque N°</label>
                        <input id="frmAgregarPago_txtCheque" type="text" />
                    </div>
                </div>
                <div class="gm-row" style="margin-top: 5px;">
                    <div class="gm-col-8">
                    </div>
                    <div class="gm-col-4">
                        <div class="gm-row">
                            <div class="gm-col-4">
                                <label style="width: 100%">Importe</label>
                            </div>
                            <div class="gm-col-8">
                                <input id="frmAgregarPago_txtImporte" type="text" class="gm-form-control" style="width: 100%; text-align: right;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button id="frmUsuariosAgregarPago-btnAceptar" type="button" class="gm-btn primary">Guardar</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="modules/users/modals/md-agregar-pago.js"></script>
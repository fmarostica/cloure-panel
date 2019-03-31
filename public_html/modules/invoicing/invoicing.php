<?php require_once $_SERVER['DOCUMENT_ROOT']."/main.php"; ?>
<div id="ucFacturacion" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <!--
        <div style="background-color: #000; font-size: 14px; color: #fff; text-align: right; padding: 5px;">
            Total: <label id="ucFacturacion-lblTotal">0.00</label>
        </div>
        -->
        <button id="btn-save" title="Finalizar" type="button" class="btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
        </button>
    </div>
    <div class="gm-uc-page-body py-3 px-3">
        <div class="row">
            <div class="col-md-3">
                <label>Fecha</label>
                <input type="date" class="form-control txtFecha" id="txtFecha" placeholder="Fecha" value="<?php echo date("Y-m-d"); ?>" />
            </div>
            <div class="col-md-3">
                <label>Sucursal</label>
                <select class="form-control" id="txtPuntoDeVenta">
                    <?php
                        $params=[
                            "module"=>"company_branches", 
                            "topic"=>"listar"
                        ];
                        $ptosventa = json_decode($CloureSDK->execute($params));
                        foreach ($ptosventa->Response->Registros as $key => $registro) {
                            echo "<option value='".$registro->Id."'>".$registro->Nombre."</option>";
                        }
                    ?>
                </select>
            </div>
            <div class="col-md-3">
                <label>Comprobante</label>
                <select class="form-control" id="ucFacturacion-txtOperacionComprobante">
                    <?php
                        $params=[
                            "module"=>"company_branches_receipts", 
                            "topic"=>"listar"
                        ];
                        $ptosventa = json_decode($CloureSDK->execute($params));
                        foreach ($ptosventa->Response->Registros as $key => $registro) {
                            $selected = $registro->Id==2 ? "selected" : "";
                            echo "<option value='".$registro->Id."' $selected>".$registro->Nombre."</option>";
                        }
                    ?>
                </select>
            </div>
            <div class="col-md-3">
                <label>Cliente</label>
                <button id="ucFacturacion-btnCliente" class="btn btn-primary btn-block" type="button">Seleccionar</button>
            </div>
        </div>
        <table class="gm-table" style="width: 100%">
            <thead>
                <tr>
                    <th colspan="6">Productos y servicios</th>
                    <th style="width: 30px">
                        <button id="ucFacturacion-btnSeleccionarProducto" type="button" class="btn btn-primary btn-sm btn-toolbar">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                        </button>
                    </th>
                </tr>
                <tr>
                    <th>Cant.</th>
                    <th>Detalles</th>
                    <th>Precio</th>
                    <th>IVA (%)</th>
                    <th>Importe</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="ucFacturacion-lstProductos">

            </tbody>
        </table>
    </div>
    <div class="gm-uc-page-footer">
        <!--<button id="ucFacturacion-btnFinalizar" class="gm-btn success">Finalizar</button>-->
    </div>
    <script src="modules/invoicing/invoicing.js"></script>
</div>
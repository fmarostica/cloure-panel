<?php
    require_once $_SERVER['DOCUMENT_ROOT']."/main.php";
    include_once __DIR__."/modals/md-agregar-pago.php";
    include_once $_SERVER["DOCUMENT_ROOT"]."/modules/products_services/modals/md-productos-seleccionar.php";
    //include_once $_SERVER["DOCUMENT_ROOT"]."/panel/modules/productos/modals/md_productos.php";
    include_once $_SERVER["DOCUMENT_ROOT"]."/modules/users/modals/md-usuario-seleccionar.php";
    include_once $_SERVER["DOCUMENT_ROOT"]."/modules/users/modals/md_usuarios.php";
    include_once $_SERVER["DOCUMENT_ROOT"]."/modules/users_groups/modals/md-user-group.php";
    include_once __DIR__."/modals/md-medidas.php";
?>

<div id="ucFacturacion" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class = "gm-uc-page-header-title">Facturación</div>
        <div style="background-color: #000; font-size: 14px; color: #fff; text-align: right; padding: 5px;">
            Total: <label id="ucFacturacion-lblTotal">0.00</label>
        </div>
    </div>
    <div class="gm-uc-page-body">
        <input type="hidden" id="ucFacturacion-ClienteId" value="0" />
        <input type="hidden" id="ucFacturacion-VendedorId" value="0" />
        <div class="row">
            <div class="col-sm-4 col-md-4">
                <label>Fecha</label>
                <input type="date" class="gm-form-control txtFecha" id="txtFecha" placeholder="Fecha" value="<?php echo date("Y-m-d"); ?>" />
            </div>
            <div class="col-sm-4 col-md-4">
                <label>Sucursal</label>
                <select class="gm-form-control" id="txtPuntoDeVenta">
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
            <!--
            <div class="col-sm-3 col-md-3">
                <label>Operación</label>
                <select class="gm-form-control" id="ucFacturacion-txtOperacion">
                    <option value="pedido">Pedido</option>
                    <option value="presupuesto">Presupuesto</option>
                    <option value="venta">Venta</option>
                </select>
            </div>-->
            <div class="col-sm-4 col-md-4">
                <label>Comprobante</label>
                <select class="gm-form-control" id="ucFacturacion-txtOperacionComprobante">
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
        </div>
        <div class="row">
            <div class="col-sm-6">
                <button id="ucFacturacion-btnCliente" class="gm-btn primary" type="button" style="width: 100%; margin: 20px 0px;">Seleccionar cliente</button>
            </div>
            <div class="col-sm-6 col-md-6">
                <div id="ucFacturacion-AlertSaldo" class="gm-alert success" style="display: none;">
                    <span>Saldo : </span><span id="ucFacturacion-AlertSaldo-Importe">0.00</span>
                </div> 
            </div>
        </div>
        <table class="gm-table">
            <thead>
                <tr>
                    <th colspan="6">Productos y servicios</th>
                    <th style="width: 30px"><button id="ucFacturacion-btnSeleccionarProducto" type="button" class="gm-btn primary"><i class="fa fa-plus"></i></button></th>
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
        <button id="ucFacturacion-btnFinalizar" class="gm-btn success">Finalizar</button>
    </div>
    <script src="modules/invoicing/invoicing.js"></script>
</div>
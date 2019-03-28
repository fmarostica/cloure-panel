<?php 
    require_once $_SERVER["DOCUMENT_ROOT"]."/main.php";

    $params=[
        "topic"=>"get_account_info"
    ];
    $account_info_res = json_decode($CloureSDK->execute($params));

    $app_token = $account_info_res->app_token;

    $paypalURL  = 'https://www.paypal.com/cgi-bin/webscr';
    //$paypalURL  = 'https://www.sandbox.paypal.com/cgi-bin/webscr';

    $paypalID           = 'info@grupomarostica.com';
    //$paypalID           = 'info-facilitator@grupomarostica.com';
    $successURL         = 'https://cloure.com/success?app_token='.$app_token;
    $cancelURL          = 'https://cloure.com/';
    $notifyURL          = 'https://cloure.com/paypalipn-dev.php';

?>
<div id="linked_accounts_boxes" class="gm-uc-page">
    <link href="modules/linked_accounts/style.css?v=3" rel="stylesheet" />
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Cloure Market</div>
    </div>
    <div class="gm-uc-page-body" style="padding: 10px; text-align: center;">
        <div style="font-size: 20px; padding: 20px 0px;">Bienvenido a CloureMarket, desde aquí podrás comprar agregados para tu cuenta Cloure.</div>
        <br/>
        <?php
            $params=[
                "module"=>"products_services",
                "topic"=>"listar",
                "categoria_op"=>"!=",
                "categoria_op_val"=>"1"
            ];
            $productos_res = json_decode($MarosticaSDK->execute($params));
            if($productos_res!=null){
                if($productos_res->Error==""){
                    $productos = $productos_res->Response->Registros;
                    foreach ($productos as $item) {
                        $periodo_pago=$item->PeriodoPago;
                        $periodo_pago_desc = "";
                        if($periodo_pago=="Y") $periodo_pago_desc = " al año";
                        if($periodo_pago=="M") $periodo_pago_desc = " por mes";

                        echo "<div style='display: inline-block; width: 280px; padding: 5px; margin: 5px; border: 1px solid #ccc; vertical-align:top'>";
                            echo "<div style='padding: 10px 0px; text-align: center; font-size: 16px; height: 60px'>".$item->Titulo."</div>";
                            echo "<img src='http://cloure.com/images/logo250.png' style='width: 100%' />";
                            echo "<div style='text-align: right; font-size: 16px'>".$item->Moneda." ".number_format($item->Importe, 2).$periodo_pago_desc."</div>";
                            echo "<form action='$paypalURL' method='POST' style='text-align: center;'>";
                                echo "<input type='hidden' name='business' value='$paypalID'>";
                                echo "<input type='hidden' name='cmd' value='_xclick-subscriptions'>";
                                echo "<input type='hidden' name='item_name' value='".str_replace("<br/>", "", $item->Titulo)."'>";
                                echo "<input type='hidden' name='item_number' value='$item->Id'>";
                                echo "<input type='hidden' name='currency_code' value='$item->Moneda'>";
                                echo "<input type='hidden' name='a3' id='paypalAmt' value='$item->Importe'>";
                                echo "<input type='hidden' name='p3' id='paypalValid' value='1'>";
                                echo "<input type='hidden' name='t3' value='$item->PeriodoPago'>";
                                echo "<input type='hidden' name='custom' value='$app_token'>";
                                echo "<input type='hidden' name='cancel_return' value='$cancelURL'>";
                                echo "<input type='hidden' name='return' value='$successURL'>";
                                echo "<input type='hidden' name='notify_url' value='$notifyURL'>";
                                echo "<div style='text-align: right; margin: 10px 0px;'>";
                                    echo "<input class='paypal_button' type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'>";
                                echo "</div>";
                            echo "</form>";
                        echo "</div>";
                    }
                }
            }
        ?>
    </div>
    <div class="gm-uc-page-footer"></div>
    <script src="modules/cloure_market/cloure_market.js"></script>
</div>
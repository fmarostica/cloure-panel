<?php
    require "main.php";

    $style_advice = "display: none;";
    $module = isset($_GET["module"]) ? $_GET["module"] : "";
    $page = isset($_GET["page"]) ? $_GET["page"] : $module;
    $parameter = (isset($_GET["parameter"]) ? $_GET["parameter"] : "");

    if($_SESSION["user_token"]==null) header("location: login");
    $grupos = array();
    $modulos = array();
    $monthly_incoming_exceeded = "false";

    $params=[
        "module"=>"finances",
        "topic"=>"is_monthly_incoming_exceeded"
    ];
    $monthly_incoming_res = json_decode($CloureSDK->execute($params));
    if($monthly_incoming_res!=NULL) $monthly_incoming_exceeded = $monthly_incoming_res->Response;

    /*
    $params=[
        "topic"=>"get_account_info"
    ];
    $account_info_res = json_decode($CloureSDK->execute($params));
    if($account_info_res->vencimiento_dias<=$account_info_res->show_advice_days){
        if($account_info_res->account_type!="free" && $account_info_res->account_type!="test_free")
        $style_advice="display: block;";
    }

    $logo = $account_info_res->logo;
    */

?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <title>Panel de control | Cloure</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/sweetalert.css">
        <link rel="stylesheet" href="/css/style.css">
        <script src="/js/jquery.min.js"></script>
        <script src="/js/popper.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/sweetalert.min.js"></script>
        <script src="/js/main.js"></script>
    </head>

    <body>
        <div id="app">
            <nav id="header" class="navbar navbar-expand-md navbar-laravel navbar-fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src="/images/logo.svg" class="logo" />
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span class="navbar-toggler-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                            </svg>
                        </span>
                    </button>
            </nav>
            <article id="pdcbody">
                <aside id="leftsidebar" class="gm-sidebar">
                    <?php
                        $params=["topic"=>"load_modules"];
                        $installed_modules = json_decode($CloureSDK->execute($params));

                        if(isset($installed_modules->Error) && strlen($installed_modules->Error)>0){
                            echo $installed_modules->Error;
                        } else {
                            foreach ($installed_modules as $installed_module) {
                                echo '<div class="menu-item" data-module="'.$installed_module->Id.'" data-items="'.count($installed_module->Items).'">';
                                    echo '<div class="deco"></div>';
                                    echo '<div class="label">'.$installed_module->Title.'</div>';
                                    echo '<div class="badge"></div>';
                                echo '</div>';
                                if(count($installed_module->Items)>1){
                                    echo '<div class="sub-items-container">';
                                    foreach ($installed_module->Items as $subitem) {
                                        echo '<div class="sub-menu-item" data-module="'.$subitem->Id.'">';
                                            echo '<div class="deco"></div>';
                                            echo '<div class="label">'.$subitem->Title.'</div>';
                                            echo '<div class="badge"></div>';
                                        echo '</div>';
                                    }
                                    echo '</div>';
                                }
                            }
                        }
                        
                        
                    ?>
                </aside>
                <div id="output">

                </div>
            </article>
        </div>
        <footer>
            &COPY; 2019 grupomarostica.com
        </footer>
    </body>
</html>
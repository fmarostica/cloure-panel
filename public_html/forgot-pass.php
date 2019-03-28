<?php
    require "main.php";
    session_destroy();
?>

<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <div class="gm-toast"></div>
        <title>Recuperación de contraseña</title>
        <?php
            $plugins = scandir(__DIR__."/plugins");
            if($plugins!==false && count($plugins)>0){
                foreach ($plugins as $plugin) {
                    if(is_dir(__DIR__."/plugins/".$plugin) && $plugin!="." && $plugin!=".."){
                        $dir_arr = explode("-", $plugin);
                        $plugin_index = $dir_arr[0];
                        $plugin_name = $dir_arr[1];
                        $plugin_version = $dir_arr[2];

                        $plugin_folders = scandir(__DIR__."/plugins/".$plugin);
                        foreach ($plugin_folders as $plugin_type) {
                            if($plugin_type=="css") foreach (glob("plugins/".$plugin."/css/*.css") as $plugin_css_file) echo "<link rel='stylesheet' href='/panel/".$plugin_css_file."' />";
                            if($plugin_type=="js") foreach (glob("plugins/".$plugin."/js/*.js") as $plugin_js_file) echo "<script src='/panel/".$plugin_js_file."'></script>";
                        }
                    }
                }
            }

            $gm_plugins = scandir(__DIR__."/gm-plugins");
            if($gm_plugins!==false && count($gm_plugins)>0){
                foreach ($gm_plugins as $gm_plugin) {
                    if(is_dir(__DIR__."/gm-plugins/".$gm_plugin) && $gm_plugin!="." && $gm_plugin!=".."){
                        $gm_plugin_folders = scandir(__DIR__."/gm-plugins/".$gm_plugin);
                        foreach ($gm_plugin_folders as $gm_plugin_file_type) {
                            if($gm_plugin_file_type=="css") foreach (glob("gm-plugins/".$gm_plugin."/css/*.css") as $gm_plugin_css_file) echo "<link rel='stylesheet' href='/panel/".$gm_plugin_css_file."' />";
                        }
                    }
                }
            }

            foreach (glob("css/*.css") as $styleFile) echo "<link rel='stylesheet' href='".$styleFile."' />";
            foreach (glob($_SERVER["DOCUMENT_ROOT"]."/css_pdc/*.css") as $css_pdc_file) echo "<link rel='stylesheet' href='/css_pdc/".basename($css_pdc_file)."' />";
        ?>
    </head>

    <body class="login-page" style="<?php echo $background.$background_repeat.$background_size; ?>">
        <div class="login-box">
            <div class="login-box-header">
            <?php
                if($cloure_host){
                    echo '<a class="gm-image-container" href="https://'.$current_domain_name.'"><img src="https://cloure.com/images/logo-v2.png" /></a>';
                } else {
                    $params=["topic"=>"get_account_info"];
                    $account_info_res = json_decode($CloureSDK->execute($params));
                    $company_logo = $account_info_res->logo;
                    echo '<a class="gm-image-container" href="https://'.$CloureSDK->getClientURL().'"><img src="'.$company_logo.'" /></a>';
                }
            ?>
            </div>
            <div class="login-box-body">
                <div class="body">
                    <form id="sign_in" method="POST">
                        <div style="text-align: center; padding: 5px;">Recuperación de acceso!</div>
                        <div id="mensaje" class="gm-alert success" style="display: none">
                            Recibirás un correo electronico con las instrucciones para recuperar tus datos de acceso.
                        </div>
                        <div id="formData">
                            <div class="gm-inputgroup" style="margin-bottom: 10px;">
                                <span class="gm-input-group-addon"><i class="fa fa-user fa-fw"></i></span>
                                <input type="text" class="gm-form-control" id="username" placeholder="Email" autofocus>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <button id="btnEnviar" class="gm-btn primary" type="submit" style="width: 100%;">Enviar</button>
                                </div>
                            </div>
                            <div class="gm-row" style="margin-top: 10px">
                                <div class="gm-col-6" style="text-align: left;">
                                    <a href="login.php">Ya estoy registrado</a>
                                </div>
                                <div class="gm-col-6" style="text-align: right;">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <br/>
                <div id="login-language-selector" class="gm-combobox">
                    <div class="selector"><i class="fa fa-globe fa-fw"></i> <span class="selector-text">Idioma</span></div>
                    <div class="popup">
                        <div data-value="es" class="item <?php if($MarosticaAPI->getLang()=="es") echo "selected"; ?>">Español</div>
                        <div data-value="en" class="item <?php if($MarosticaAPI->getLang()=="en") echo "selected"; ?>">English</div>
                        <div data-value="pt" class="item <?php if($MarosticaAPI->getLang()=="pt") echo "selected"; ?>">Português</div>
                        <div data-value="jp" class="item <?php if($MarosticaAPI->getLang()=="jp") echo "selected"; ?>">日本語</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Jquery Core Js -->
        <script src="<?php echo PDC_RELATIVE_PATH; ?>/plugins/jquery/jquery.min.js"></script>
        <script src="<?php echo PDC_RELATIVE_PATH; ?>/common_inc/common.js"></script>
        <script>
            var panel_dir = "<?php echo PDC_RELATIVE_PATH; ?>";
            $("#btnEnviar").click(function(e){
                $.ajax({
                    url: '<?php echo MODULES_RELATIVE_PATH; ?>/usuarios/ajax/xhr_usuarios.php',
                    data: {
                        topic: "solicitar_recupero_clave",
                        user: $("#username").val(),
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function(data){
                        if(data.Error==""){
                            toast(data.Response);
                            $("#formData").fadeOut();
                            $("#mensaje").fadeIn();
                        } else {
                            toast(data.Error);
                        }
                    }
                });
                e.preventDefault();
            });
        </script>
        <?php
            if($gm_plugins!==false && count($gm_plugins)>0){
                foreach ($gm_plugins as $gm_plugin) {
                    if(is_dir(__DIR__."/gm-plugins/".$gm_plugin) && $gm_plugin!="." && $gm_plugin!=".."){
                        $gm_plugin_folders = scandir(__DIR__."/gm-plugins/".$gm_plugin);
                        foreach ($gm_plugin_folders as $gm_plugin_file_type) {
                            if($gm_plugin_file_type=="php") foreach (glob("gm-plugins/".$gm_plugin."/php/*.php") as $gm_plugin_php_file) include $gm_plugin_php_file;
                        }
                        foreach ($gm_plugin_folders as $gm_plugin_file_type) {
                            if($gm_plugin_file_type=="js") foreach (glob("gm-plugins/".$gm_plugin."/js/*.js") as $gm_plugin_js_file) echo "<script src='/panel/".$gm_plugin_js_file."'></script>";
                        }
                    }
                }
            }
        ?>
    </body>

</html>
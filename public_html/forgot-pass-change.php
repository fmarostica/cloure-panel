<?php
    require $_SERVER["DOCUMENT_ROOT"]."/config.php";
    $recovery_token = isset($_GET["rt"]) ? $_GET["rt"] : "";
    $params=[
        "module_group"=>"usuarios", 
        "module"=>"usuarios", 
        "topic"=>"get_recovery_token",
        "recovery_token"=>$recovery_token
    ];
    $res = json_decode($MarosticaAPI->execute($params));
    if($res->Error!="") $recovery_token="";
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <div class="gm-toast"></div>
    <title>Recuperación de contraseña</title>
    <link rel="icon" href="../../favicon.ico" type="image/x-icon">
    <link href="<?php echo PDC_RELATIVE_PATH; ?>/plugins/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" />
    <link href="<?php echo PDC_RELATIVE_PATH; ?>/css/style.css?v=2" rel="stylesheet">
</head>

<body class="login-page" style="<?php echo $background; ?>">
    <div class="login-box">
        <div class="login-box-header" style="<?php echo $login_header_bg; ?>">
        <?php
            $path = "/images/logo.png";
            if($empresa->LogoPanel!="") $path = $empresa->LogoPanel;
            echo '<a class="gm-image-container" href="/"><img src="'.$path.'" /></a>';
        ?>
        </div>
        <div class="login-box-body">
            <div class="body">
                <form id="sign_in" method="POST">
                    <?php
                        if($recovery_token==""){
                            echo '<div id="mensaje" class="gm-alert danger">';
                                echo 'No se ha especificado ningún token de recuperación.';
                            echo '</div>';
                        }
                        else{
                            ?>
                            <div style="text-align: center; padding: 5px;">Recuperación de acceso!</div>
                            <div id="formData">
                                <div class="gm-input-group" style="margin-bottom: 10px;">
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
                                        <?php
                                            if($empresa->AllowNewUsersFromPDC) echo "<a href='registro.php'>Deseo registrarme!</a>";
                                        ?>
                                    </div>
                                </div>
                            </div>
                            <?php
                        }
                    ?>
                    
                </form>
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
</body>

</html>
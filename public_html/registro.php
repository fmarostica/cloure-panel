<?php
    require $_SERVER["DOCUMENT_ROOT"]."/config.php";
    $logued_user = null;
    //session_unset();
    session_destroy();

    //Styling
    $background = $MarosticaAPI->getTheme()->login_page_bg;
    $background_repeat = $MarosticaAPI->getTheme()->login_page_bg_repeat;
    $background_size = $MarosticaAPI->getTheme()->login_page_bg_size;
    
    $msg="";
    $allow_register="False";

    if(isset($_POST["btnEnviar"]))
    {
        $params=[
            "module_group"=>"usuarios", 
            "module"=>"usuarios", 
            "topic"=>"guardar", 
            "nombre"=>$_POST["txtNombre"], 
            "apellido"=>$_POST["txtApellido"], 
            "mail"=>$_POST["txtMail"],
            "clave"=>$_POST["password"],
            "clave2"=>$_POST["repeat_password"],
        ];
        $res = json_decode($m->api_call($params));
        if($res->Error=="")
        {
            header("location: /panel/index.php");
        }
        else
        {
            $msg=$res->Error;
        }
    }
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Registro de usuarios</title>
    <link href="<?php echo PDC_RELATIVE_PATH; ?>/plugins/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" />
    <link href="<?php echo PDC_RELATIVE_PATH; ?>/css/style.css?v=2" rel="stylesheet">

</head>

<body class="login-page" style="<?php echo $background.$background_repeat.$background_size; ?>">
<div class="gm-toast"></div>
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
                <div style="text-align: center; padding: 5px;">Bienvenido!</div>
                <?php
                    if($empresa->AccountType=="demo"){
                        echo "<div style='color: #f00; text-align: center; font-size: 12px'>- CUENTA DEMO -</div>";
                        echo "<div class='gm-notification success' style='text-align: center;'>Usuario: demo@grupomarostica.com <br />Clave: admin</div>";
                    }
                ?>
                <div class="gm-inputgroup" style="margin-bottom: 10px;">
                    <input type="text" class="gm-form-control" id="txtNombre" placeholder="Nombre" autofocus>
                </div>
                <div class="gm-inputgroup" style="margin-bottom: 10px;">
                    <input type="text" class="gm-form-control" id="txtApellido" placeholder="Apellido">
                </div>
                <div class="gm-inputgroup" style="margin-bottom: 10px;">
                    <input type="text" class="gm-form-control" id="txtTelefono" placeholder="Teléfono">
                </div>
                <div class="gm-inputgroup" style="margin-bottom: 10px;">
                    <input type="text" class="gm-form-control" id="txtMail" placeholder="Correo">
                </div>
                <div class="gm-inputgroup" style="margin-bottom: 10px;">
                    <input type="password" class="gm-form-control" id="txtClave" placeholder="Clave">
                </div>
                <div class="gm-inputgroup" style="margin-bottom: 10px;">
                    <input type="password" class="gm-form-control" id="txtClave2" placeholder="Repetir clave">
                </div>
                <div class="row">
                    <div class="col-12">
                        Al registrarte estas aceptando nuestros <br/><a href='/legales.php' target='_blank'>Términos y condiciones</a>
                        <br/><br/>
                        <input type="checkbox" value="accept_newsletter" checked />Deseo suscribirme al newsletter
                        <br/><br/>
                    </div>
                    <div class="col-12">
                        <button id="btnIngresar" class="gm-btn primary" type="submit" style="width: 100%;">Registrarme</button>
                    </div>
                </div>
                <div>
                    <?php
                        /*
                        if($fb_app_id!="" && $fb_app_secret!="" && $empresa->CompanyWeb!="") 
                        echo '<br /><a class="btn-fb" href="'.htmlspecialchars($loginUrl).'" style="display: block; width: 100%; text-align: center">Iniciar sesión con Facebook</a>';
                        */
                    ?>
                </div>
                <div class="gm-row" style="margin-top: 10px">
                    <div class="gm-col-6" style="text-align: left;">
                        <a href="forgot-pass.php">Olvide mi clave</a>
                    </div>
                    <div class="gm-col-6" style="text-align: right;">
                        <a href="login.php">Ya estoy registrado</a>
                    </div>
                </div>
            </form>
            <div class="login-copy"><?php echo "Powered by <a href='https://grupomarostica.com' target='_blank'>grupomarostica.com</a> <br/>MarosticaBiz V".$MarosticaAPI->getPanelVersion(); ?></div>
        </div>
    </div>

    <!-- Jquery Core Js -->
    <script src="<?php echo PDC_RELATIVE_PATH; ?>/plugins/jquery/jquery.min.js"></script>
    <script src="<?php echo PDC_RELATIVE_PATH; ?>/common_inc/common.js"></script>
    <script>
        var panel_dir = "<?php echo PDC_RELATIVE_PATH; ?>";
        $("#btnIngresar").click(function(e){
            $.ajax({
                url: '<?php echo MODULES_RELATIVE_PATH; ?>/usuarios/ajax/xhr_usuarios.php',
                data: {
                    topic: "registrar",
                    nombre: $("#txtNombre").val(),
                    apellido: $("#txtApellido").val(),
                    mail: $("#txtMail").val(),
                    telefono: $("#txtTelefono").val(),
                    clave: $("#txtClave").val(),
                    clave2: $("#txtClave2").val()
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    if(data.Error==""){
                        $(".dvErrorMsg").html("");
                        toast(data.Response);
                        window.location.href = panel_dir;
                    } else {
                        $(".dvErrorMsg").html(data.Error);
                        toast(data.Error);
                        $("#password").val("");
                        $("#password").focus();
                    }
                }
            });
            e.preventDefault();
        });
    </script>
</body>

</html>
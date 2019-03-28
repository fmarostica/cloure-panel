<?php
    require __DIR__."/main.php";
    session_destroy();
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        
        <title>Inicio de sesión</title>

        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/style.css">
        <script src="/js/jquery.min.js"></script>
        <script src="/js/popper.js"></script>
        <script src="/js/bootstrap.min.js"></script>
    </head>

    <body id="login-page" class="login-page">
        <div class="gm-toast"></div>
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
                    <div id="sign_in">
                        <div class="page-title" style="text-align: center; padding: 5px;"><?= __("panel.welcome") ?></div>
                        <div class="inputgroup" style="margin-bottom: 10px;">
                            <span class="input-group-addon"><i class="fa fa-user fa-fw"></i></span>
                            <input type="text" class="form-control user-login-field" id="username" placeholder="<?= __("panel.user_placeholder") ?>" autofocus>
                        </div>
                        <div class="inputgroup" style="margin-bottom: 10px;">
                            <span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>
                            <input type="password" class="form-control user-password-field" id="password" placeholder="<?= __("panel.pass_placeholder") ?>">
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button id="btnIngresar" class="btn btn-primary btn-block" type="button"><?= __("panel.login_prompt") ?></button>
                                <div id="login-loader" class="horizontal-loader">
                                    <img src="/images/294.gif" />
                                </div>
                            </div>
                        </div>
                        <div class="gm-row" style="margin-top: 10px">
                            <div class="gm-col-6" style="text-align: left;">
                                <a class="lnk-forgot-password" href="forgot-pass.php"><?= __("panel.forgot_pass") ?></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="/js/login.js"></script>
    </body>
</html>
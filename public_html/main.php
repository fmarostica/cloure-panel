<?php    
    session_start();
    
    $cloure_host = true;
    $current_domain_name = "";
    $lang = "en";

    if(!isset($_GET["lang"])){
        $lang = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) : "en";
    } else {
        $lang = $_GET["lang"];
    }

    $current_host = $_SERVER["SERVER_NAME"];
    if($current_host!="panel.cloure.com" && $current_host!="panel.cloure-test.com"){
        $_SESSION["app_token"] = file_get_contents("http://".$current_host."/app.key");
        $cloure_host = false;
    } else {
        if($current_host=="panel.cloure.com") $current_domain_name = "cloure.com";
        if($current_host=="panel.cloure-test.com") $current_domain_name = "cloure-test.com";
    }

    require "cloure_sdk.php";

    $CloureSDK = new CloureSDK();

    chdir(dirname(__DIR__, 2));

    define("CORE_PATH", "Core/");
    define("RES_PATH", $_SERVER["DOCUMENT_ROOT"]."/resources/");
    define("APP_PATH", "app/");

    function __(string $resourceString){
        global $lang;
        $resourceArr = explode('.', $resourceString);
        $resourceFile = $resourceArr[0].".php";
        $resourceKey = $resourceArr[1];
        $path = RES_PATH."lang/$lang/".$resourceFile;

        $resourceVal = "{".$resourceString."}";

        if(file_exists($path)){
            $resource = include($path);
            if(array_key_exists($resourceKey, $resource)) $resourceVal = $resource[$resourceKey];
        }

        return $resourceVal;
    }
?>
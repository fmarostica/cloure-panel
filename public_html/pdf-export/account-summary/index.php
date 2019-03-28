<?php
    include_once $_SERVER["DOCUMENT_ROOT"]."/main.php";
    $usuario_id = isset($_GET["id"]) ? $_GET["id"] : 0;
    $params=[
        "module"=>"finances", 
        "topic"=>"export_pdf_cc",
        "usuario_id"=>$usuario_id
    ];
    $api_response = json_decode($CloureSDK->execute($params));
    $response = $api_response->Response;
    if($api_response==null){
        die("Api returns null error");
    } else {
        header("location: ".$api_response->Response->url);
    }
?>
<?php
	require $_SERVER["DOCUMENT_ROOT"]."/config.php";
    $logued_user = null;
    session_unset();
    
    echo json_encode(array("Respuesta"=>"", "Error"=>""));
?>
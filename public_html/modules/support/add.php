<?php
    require_once $_SERVER['DOCUMENT_ROOT']."/main.php";

    $params=[
        "topic"=>"get_account_info",
        "referer"=>$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']
    ];
    $empresa = json_decode($CloureSDK->execute($params));
    
?>
<div id="ucSupport" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <button id="btn-back" title="Volver" type="button" class="btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
        </button>
        <button id="btn-save" title="Fijar Precios" type="button" class="btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
        </button>
    </div>
    <div class="gm-uc-page-body gm-content py-3 px-3">
        <div class="frm-support">
            <div class="row">
                <div class="col-md-4">
                    <label>Tipo de consulta</label>
                    <select class="form-control txt-message-type">
                        <option value="payment">Pagos</option>
                        <option value="technical">Soporte técnico</option>
                        <option value="report_bug">Informar un error</option>
                        <option value="suggest">Sugerencias/Solicitudes</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label>Comentarios</label>
                    <textarea class="form-control txt-message"></textarea>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/modules/support/add.js"></script>
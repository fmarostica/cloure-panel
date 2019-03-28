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
        <button class="btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
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

<script src="modules/support/support.js"></script>
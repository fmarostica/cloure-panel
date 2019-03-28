<?php
    require_once $_SERVER['DOCUMENT_ROOT']."/main.php";
    include_once __DIR__."/modals/md_inmueble.php";
?>
<div class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Sucursales y depósitos</div>
        <div class="gm-uc-page-header-filters">
            <div class="gm-col-4">
                <div class="gm-row nowrap">
                    <button id="ucInmuebles-btnAgregar" title="Agregar producto" type="button" class="gm-icon-button"><span class='gm-part-icon fa fa-plus'></span></button>
                </div>
            </div>
            <div class="gm-col-8">
                <div class="right">
                    <input id="ucInmuebles-txtBuscar" placeholder="Buscar" class="gm-form-control gm-filter" type="search" style="width: 70%" />
                </div>
            </div>
        </div>
    </div>
    <div class="gm-uc-page-body">
        <div id="ucInmuebles-lstRegistros" class="gm-itembox-container"></div>
    </div>
    <div class="gm-uc-page-footer"></div>
</div>
<script src="modules/company_branches/company_branches.js"></script>
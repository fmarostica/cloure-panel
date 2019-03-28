<?php
    //require_once $_SERVER['DOCUMENT_ROOT']."/main.php";
    //include_once __DIR__."/modals/md_inmueble.php";
?>
<div class="gm-uc-page">
    <div class="gm-uc-page-header">
        <button id="btnAgregar" title="Agregar producto" type="button" class="btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
        </button>
        <input id="ucProductos-txtBuscar" placeholder="Buscar" class="gm-form-control gm-filter toolbar-search" type="search" />
        <button id="" type="button" style="inline-block" class="gm-icon-button btnFilter btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" />
            </svg>
        </button>
    </div>
    <div class="gm-uc-page-body">
        <div id="ucInmuebles-lstRegistros" class="gm-itembox-container"></div>
    </div>
    <div class="gm-uc-page-footer"></div>
</div>
<script src="modules/company_branches/company_branches.js"></script>
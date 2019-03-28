<?php
    include_once __DIR__."/modals/md-lugares.php";
?>
<div id="ucLugares" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Lugares</div>
        <div class="gm-uc-page-header-filters">
            <div class="gm-col-9">
                <button id="ucLugares-btnAgregar" type="button" class="gm-icon-button"><span class='gm-part-icon fa fa-plus'></span></button>
            </div>
            <div class="gm-col-3">
                <input id="txtBuscar" placeholder="Buscar" class="gm-form-control gm-filter" type="search" />
            </div>
        </div>
    </div>
    <div class="gm-uc-page-body">
        <div id="ucLugares-lstLugares" class="gm-itembox-container"></div>
    </div>
    <div class="gm-uc-page-footer"></div>
</div>

<script src="modules/places/places.js"></script>
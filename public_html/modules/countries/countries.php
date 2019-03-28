<?php
    //include __DIR__."/modals/md_paises.php";
?>
<div class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Países y territorios</div>
        <div class="row gm-uc-page-header-filters">
            <div class="gm-col-6">
                <!--
                <button id="btnAgregar" type="button" class="gm-icon-button">
                    <span class='gm-part-icon fa fa-plus'></span>
                </button>
                -->
            </div>
            <div class="gm-col-6">
                <div class="right">
                    <input id="txtBuscar" placeholder="Buscar" class="gm-form-control gm-filter" type="search" style="width: 70%" />
                    <!--<button id="" type="button" style="inline-block" class="gm-icon-button btnFilter"><span class='gm-part-icon fa fa-filter'></span></button>-->
                </div>
            </div>
        </div>
    </div>
    <div class="gm-uc-page-body">
        <div class="gm-itembox-container"></div>
    </div>
    <div class="gm-uc-page-footer"></div>
</div>
<script src="modules/countries/countries.js"></script>
<?php
    include_once __DIR__."/modals/md_bandas.php";
?>
<div class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Bandas y artistas</div>
        <div class="gm-uc-page-header-filters">
            <div class="gm-col-6">
                <button id="btnAgregar" type="button" class="gm-icon-button">
                    <span class='gm-part-icon fa fa-plus'></span>
                </button>
            </div>
            <div class="gm-col-6">
                <div class="right">
                    <input id="txtBuscar" placeholder="Buscar" class="gm-form-control gm-filter" type="search" style="width: 70%" />
                </div>
            </div>
        </div>
    </div>
    <div class="gm-uc-page-body">
        <div id="ucArtistas-lstArtistas" class="gm-itembox-container"></div>
    </div>
    <div class="gm-uc-page-footer">
        <div class="gm-uc-page-footer-content">
            <button class="gm-btn primary"><i class="fas fa-step-backward"></i></button><button id="btnAnterior" class="gm-btn primary"><i class="fas fa-caret-left"></i></button><button id="btnSiguiente" class="gm-btn primary"><i class="fas fa-caret-right"></i></button><button class="gm-btn primary"><i class="fas fa-step-forward"></i></button>
            <label>Mostrando <span id="gm-uc-page-footer-registers">0</span> de <span id="gm-uc-page-footer-total-registers">0</span> registros encontrados</label><label>(Página <span id="gm-uc-page-footer-page">1</span> de <span id="gm-uc-page-footer-pages">0</span>)</label>
        </div>
    </div>
</div>
<script src="modules/bands_artists/bands_artists.js"></script>
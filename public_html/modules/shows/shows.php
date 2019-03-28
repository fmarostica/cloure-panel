<?php
    include_once __DIR__."/modals/md-eventos.php";
    //include __DIR__."/modals/md-usuarios-seleccionar.php";
    //include __DIR__."/modals/md-declarar-fotos.php";
    include $_SERVER["DOCUMENT_ROOT"]."/modules/bands_artists/modals/md_bandas.php";
    include $_SERVER["DOCUMENT_ROOT"]."/modules/places/modals/md-lugares.php";
    include $_SERVER["DOCUMENT_ROOT"]."/modules/users/modals/md_usuarios.php";
    include $_SERVER["DOCUMENT_ROOT"]."/modules/users/modals/md-usuario-seleccionar.php";
?>

<div id="ucPageEventos" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Eventos</div>
        <div class="gm-uc-page-header-filters">
            <div class="gm-col-6">
                <button id="btnAgregar" type="button" class="gm-icon-button">
                    <span class='gm-part-icon fa fa-plus'></span>
                </button>
            </div>
            <div class="gm-col-6">
                <div class="right">
                    <input id="txtBuscar" placeholder="Buscar" class="gm-form-control gm-filter" type="search" style="width: 70%" />
                    <button id="" type="button" style="inline-block" class="gm-icon-button btnFilter"><span class='gm-part-icon fa fa-filter'></span></button>
                </div>
            </div>
        </div>
    </div>
    <div class="gm-uc-page-body">
        <div id="ucEventos-lstEventos" class="gm-itembox-container"></div>
        <div class="gm-uc-sidebar">
            <div class="gm-row">
                <div class="gm-col-12">
                    <label>Ordenar por:</label>
                    <select class="gm-form-control-alt gm-filter">
                        <option value="fecha">Fecha</option>
                        <option value="titulo">Titulo</option>
                    </select>
                </div>
            </div>
            <h3>Filtrar</h3>
            <div class="gm-row">
                <div class="gm-col-12">
                    <select id="ucEventos-txtArtista" class="gm-form-control-alt gm-filter">
                        <option value="0">Artista</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucEventos-txtLugar" class="gm-form-control-alt gm-filter">
                        <option value="0">Lugar</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="gm-uc-page-footer"></div>
</div>
<script src="modules/shows/shows.js"></script>
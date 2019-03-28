<?php
    require_once $_SERVER["DOCUMENT_ROOT"]."/main.php";
    include __DIR__."/modals/md-propiedades.php";
    /*
    include __DIR__."/modals/md-consorcios.php";
    include __DIR__."/modals/md-propiedades-pagar.php";
    include __DIR__."/modals/md-propiedades-pago-alquiler.php";
    include __DIR__."/modals/md-publicar.php";
    include __DIR__."/modals/md-compartir.php";
    include_once $_SERVER["DOCUMENT_ROOT"]."/panel/modules/usuarios/modals/md_usuarios.php";
    include_once $_SERVER["DOCUMENT_ROOT"]."/panel/modules/usuarios/modals/md-usuario-seleccionar.php";
    */
?>
<div id="fb-root"></div>
<script>(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.11';
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Propiedades</div>
        <div class="gm-uc-page-header-filters">
            <div class="gm-col-6">
                <button id="btnAgregar" type="button" class="gm-icon-button"><span class='gm-part-icon fa fa-plus'></span></button>
                <a id="btnImprimir" href="/pdf-export/properties/" target="_blank" class="gm-icon-button"><span class='gm-part-icon fa fa-print'></span></a>
                <!--
                <button id="btnAgregar" type="button" class="gm-icon-button"><span class='gm-part-icon fa fa-share'></span></button>
                <button id="btnAgregar" type="button" class="gm-icon-button"><span class='gm-part-icon fa fa-share-alt'></span></button>
                -->
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
        <div id="ucPropiedades-lstPropiedades" class="gm-itembox-container"></div>
        <div class="gm-uc-sidebar">
            <div class="gm-row">
                <div class="gm-col-12">
                    <label>Ordenar por:</label>
                    <select id="ucPropiedades-txtOrdenarPor" class="gm-form-control-alt gm-filter">
                        <option value="id">Id</option>
                        <option value="fecha_alta">Fecha de Alta</option>
                        <option value="titulo">Título</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucPropiedades-txtOrden" class="gm-form-control-alt gm-filter">
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
            </div>
            <h3>Filtrar</h3>
            <div class="gm-row">
                <div class="gm-col-12">
                    <select id="ucPropiedades-txtTipoPropiedad" class="gm-form-control-alt gm-filter">
                        <option value="0">Cualquier tipo</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucPropiedades-txtConsorcio" class="gm-form-control-alt gm-filter">
                        <option value="">Todas las publicaciones</option>
                        <option value="publicados">Publicados</option>
                        <option value="sin_publicar">Sin publicar</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucPropiedades-txtOperacion" class="gm-form-control-alt gm-filter">
                        <option value="0">Cualquier operación</option>
                        <option value="1">Alquiler/Venta</option>
                        <option value="2">Alquiler</option>
                        <option value="3">Alquiler temporario</option>
                        <option value="4">Venta (disponible)</option>
                        <option value="5">Venta (alquilada)</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucPropiedades-txtDisponibilidad" class="gm-form-control-alt gm-filter">
                        <option value="0">Cualquier disponibilidad</option>
                        <option value="1">Vigente</option>
                        <option value="2">Alquilada</option>
                        <option value="3">Vendida</option>
                        <option value="4">Señada</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucPropiedades-txtEstadoPago" class="gm-form-control-alt gm-filter">
                        <option value="">Cualquier estado de pago</option>
                        <option value="0">En término</option>
                        <option value="1">Vencidos</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="gm-uc-page-footer">
        <div class="gm-uc-page-footer-content">
            <button id="btnPrimero" class="gm-btn primary"><i class="fas fa-step-backward"></i></button>
            <button id="btnAnterior" class="gm-btn primary"><i class="fas fa-caret-left"></i></button>
            <button id="btnSiguiente" class="gm-btn primary"><i class="fas fa-caret-right"></i></button>
            <button id="btnUltimo" class="gm-btn primary"><i class="fas fa-step-forward"></i></button>
            <label>Mostrando <span id="gm-uc-page-footer-registers">0</span> de <span id="gm-uc-page-footer-total-registers">0</span> registros encontrados</label><label>(Página <span id="gm-uc-page-footer-page">1</span> de <span id="gm-uc-page-footer-pages">0</span>)</label>
        </div>
    </div>
</div>
<script src="modules/properties/properties.js"></script>
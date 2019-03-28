<?php
    /*
    require_once $_SERVER["DOCUMENT_ROOT"]."/main.php";
    include __DIR__."/modals/md_productos.php";
    include $_SERVER["DOCUMENT_ROOT"]."/modules/products_services_categories/modals/md-category-n1.php";
    include $_SERVER["DOCUMENT_ROOT"]."/modules/products_services_categories/modals/md-category-n2.php";
    include __DIR__."/modals/md_precios.php";
    */
?>
<!--
<div id="fb-root"></div>
<script>(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.11';
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
-->
<div id="mod_products_services" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <button id="ucProductos-btnAgregar" title="Agregar producto" type="button" class="btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
        </button>
        <button id="ucProductos-btnFijarPrecios" title="Fijar Precios" type="button" class="btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z" />
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
        <div id="ucProductos-lstProductos" class="gm-itembox-container"></div>
        <div class="gm-uc-sidebar">
            <div class="gm-row">
                <div class="gm-col-12">
                    <label>Ordenar por:</label>
                    <select id="ucProductos-txtOrdenarPor" class="form-control gm-filter">
                        <option value="titulo">Título</option>
                        <option value="venta_importe">Importe</option>
                        <option value="codigo_barras">Código de barras</option>
                        <option value="estado">Estado</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucProductos-txtOrden" class="form-control gm-filter">
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
            </div>
            <h3>Filtrar</h3>
            <div class="gm-row">
                <div class="gm-col-12">
                    <select id="ucProductos-txtTipoProducto" class="form-control gm-filter">
                        <option value="0">Cualquier tipo</option>
                        <option value="1">Productos</option>
                        <option value="2">Servicios</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucProductos-txtEstado" class="form-control gm-filter">
                        <option value="">Cualquier estado</option>
                        <option value="finalizado">Publicados</option>
                        <option value="pendiente">Sin publicar</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucProductos-txtCategoria" class="form-control gm-filter">
                        <option value="0">Cualquier Categoria</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div id="ucProductos-dvPaginador" class="gm-uc-page-footer">
        <button class="gm-btn primary btnPrimero btn-toolbar" disabled>
            <svg viewBox="0 0 24 24">
                <path d="M20,5V19L13,12M6,5V19H4V5M13,5V19L6,12" />
            </svg>
        </button><!--
        --><button class="gm-btn primary btnAnterior btn-toolbar" disabled>
            <svg viewBox="0 0 24 24">
                <path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
            </svg>
        </button><!--
        --><button class="gm-btn primary btnSiguiente btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />
            </svg>
        </button><!--
        --><button class="gm-btn primary btnUltimo btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12" />
            </svg>
        </button>
        <!--<label>Registros por página</label> <input type="number" value="20" class="gm-form-control" style="width: 60px" />-->
        <label class="label-toolbar no-mobile"><span id="gm-uc-page-footer-total-registers">0</span> Registros encontrados</label>
        <?php 
            echo "<label id='ucProductos-PagerInfo' class='label-toolbar no-mobile'>(Página {page} de {total_pages})</label>";
        ?>
    </div>
</div>
<script src="modules/products_services/products_services.js"></script>
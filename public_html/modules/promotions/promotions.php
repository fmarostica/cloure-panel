<?php
    require_once $_SERVER["DOCUMENT_ROOT"]."/main.php";
    include __DIR__."/modals/md_promocion.php";
    include $_SERVER["DOCUMENT_ROOT"]."/modules/products_services/modals/md-productos-seleccionar.php";
?>
<div id="mod_products_services" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Promociones</div>
        <div class="gm-uc-page-header-filters">
            <div class="gm-col-4">
                <div class="gm-row nowrap">
                    <button id="ucPromociones-btnAgregar" title="Agregar promoción" type="button" class="gm-icon-button"><span class='gm-part-icon fa fa-plus'></span></button>
                    <!--
                    <button id="ucProductos-btnCompartir" title="Compartir Todos" type="button" class="gm-icon-button"><span class='gm-part-icon fa fa-share-alt'></span></button>
                    -->
                </div>
            </div>
            <div class="gm-col-8">
                <div class="right">
                    <input id="ucProductos-txtBuscar" placeholder="Buscar" class="gm-form-control gm-filter" type="search" style="width: 70%" />
                    <!--<button id="" type="button" style="inline-block" class="gm-icon-button btnFilter"><span class='gm-part-icon fa fa-filter'></span></button>-->
                </div>
            </div>
        </div>
    </div>
    <div class="gm-uc-page-body">
        <div id="ucProductos-lstProductos" class="gm-itembox-container"></div>
        <div class="gm-uc-sidebar">
            <div class="gm-row">
                <div class="gm-col-12">
                    <label>Ordenar por:</label>
                    <select id="ucProductos-txtOrdenarPor" class="gm-form-control-alt gm-filter">
                        <option value="id">Id</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucProductos-txtOrden" class="gm-form-control-alt gm-filter">
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
            </div>
            <h3>Filtrar</h3>
            <div class="gm-row">
                <div class="gm-col-12">
                    <select id="ucProductos-txtTipoProducto" class="gm-form-control-alt gm-filter">
                        <option value="0">Cualquier tipo</option>
                        <option value="1">Productos</option>
                        <option value="2">Servicios</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucProductos-txtEstado" class="gm-form-control-alt gm-filter">
                        <option value="">Cualquier estado</option>
                        <option value="finalizado">Publicados</option>
                        <option value="pendiente">Sin publicar</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucProductos-txtCategoria" class="gm-form-control-alt gm-filter">
                        <option value="0">Cualquier Categoria</option>
                    </select>
                </div>
                <!--
                <div class="gm-col-12">
                    <select id="ucProductos-txtMarca" class="gm-form-control-alt gm-filter">
                        <option value="">Cualquier marca</option>
                    </select>
                </div>
                -->
            </div>
        </div>
    </div>
    <div id="ucProductos-dvPaginador" class="gm-uc-page-footer">
        <button class="gm-btn primary btnPrimero" disabled><i class="fas fa-step-backward"></i></button><!--
        --><button class="gm-btn primary btnAnterior" disabled><i class="fas fa-caret-left"></i></button><!--
        --><button class="gm-btn primary btnSiguiente"><i class="fas fa-caret-right"></i></button><!--
        --><button class="gm-btn primary btnUltimo"><i class="fas fa-step-forward"></i></button>
        <!--<label>Registros por página</label> <input type="number" value="20" class="gm-form-control" style="width: 60px" />-->
        <label><span id="gm-uc-page-footer-total-registers">0</span> Registros encontrados</label>
        <?php 
            echo "<label id='ucProductos-PagerInfo'>(Página {page} de {total_pages})</label>";
        ?>
    </div>
</div>
<script src="modules/promotions/promotions.js"></script>
<?php
    include __DIR__."/modals/md-category-n1.php";
    include __DIR__."/modals/md-category-n2.php";
?>
<div id="mod_products_services_categories" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Categorias de productos y servicios</div>
        <div class="gm-uc-page-header-filters">
            <div class="gm-col-6">
                <div class="gm-inputgroup">
                    <select class="gm-form-control txt-category-type">
                        <option value="1">Categorias de nivel 1</option>
                        <option value="2">Categorias de nivel 2</option>
                    </select>
                    <button id="ucCategorias-btnAgregar" type="button" class="gm-icon-button">
                        <span class='gm-part-icon fa fa-plus'></span>
                    </button>
                </div>
            </div>
            <div class="gm-col-6">
                <div class="right">
                    <input id="txtBuscar" placeholder="Buscar" class="gm-form-control gm-filter" type="search" style="width: 70%" />
                    <button id="" type="button" style="inline-block" class="gm-icon-button btnFilter"><span class='gm-part-icon fa fa-filter'></span></button>
                </div>
            </div>
        </div>
        <div class="gm-row">
            <div class="gm-col-4">
                
            </div>
        </div>
    </div>
    <div class="gm-uc-page-body">
        <div id="ucCategorias-lstRegistros" class="gm-itembox-container"></div>
        <div class="gm-uc-sidebar">
            <div class="gm-row">
                <div class="gm-col-12">
                    <label>Ordenar por:</label>
                    <select id="ucProductos-txtOrdenarPor" class="gm-form-control-alt gm-filter">
                        <option value="nombre">Nombre</option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <select id="ucProductos-txtOrden" class="gm-form-control-alt gm-filter">
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
            </div>
            <!--
            <h3>Filtrar</h3>
            <div class="gm-row">
                <div class="gm-col-12">
                    <select id="ucCategorias-txtCategoriaN1" class="gm-form-control-alt gm-filter">
                        <option value="">Todas las categorias</option>
                    </select>
                </div>
            </div>
            -->
        </div>
    </div>
    <div class="gm-uc-page-footer"></div>
</div>
<script src="modules/products_services_categories/products_services_categories.js"></script>
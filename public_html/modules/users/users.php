<?php
    /*
    require_once $_SERVER['DOCUMENT_ROOT']."/main.php";

    $params=[
        "module"=>"users",
        "topic"=>"get_module_info"
    ];
    $module_info_res = json_decode($CloureSDK->execute($params));
    $locales = $module_info_res->locales;

    include_once __DIR__."/modals/md_usuarios.php";
    include_once __DIR__."/modals/md-agregar-pago.php";
    */
?>

<div id="ucUsuarios" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <button id="ucUsuarios-btnAgregar" title="Agregar producto" type="button" class="btn-toolbar btn-add-user">
            <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
        </button>
        <input id="ucUsuarios-txtBuscar" placeholder="Buscar" class="gm-form-control gm-filter toolbar-search" type="search" />
        <button id="" type="button" style="inline-block" class="gm-icon-button btnFilter btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" />
            </svg>
        </button>
    </div>
    <div class="gm-uc-page-body">
        <div id="ucUsuarios-lstUsuarios" class="gm-itembox-container"></div>
        <div id="ucUsuarios-filtros" class="gm-uc-sidebar">
            <div class="gm-row">
                <div class="gm-col-12">
                    <label><?php echo $locales->order_by; ?></label>
                    <select id="ucUsuarios-txtOrdenarPor" class="gm-form-control-alt gm-filter">
                        <option value="nombre"><?php echo isset($locales->name) ? $locales->name : "Name"; ?></option>
                        <option value="apellido" selected><?php echo isset($locales->last_name) ? $locales->last_name : "Last name"; ?></option>
                        <option value="saldo"><?php echo isset($locales->balance_field) ? $locales->balance_field : "Balance"; ?></option>
                    </select>
                </div>
                <div class="gm-col-12">
                    <label><?php echo isset($locales->order) ? $locales->order : "Order"; ?></label>
                    <select id="ucUsuarios-txtOrden" class="gm-form-control-alt gm-filter">
                        <option value="asc"><?php echo isset($locales->ascending) ? $locales->ascending : "Ascending"; ?></option>
                        <option value="desc"><?php echo isset($locales->descending) ? $locales->descending : "Descending"; ?></option>
                    </select>
                </div>
            </div>
            <h3><?php echo isset($locales->filter_by) ? $locales->filter_by : "Filter by"; ?></h3>
            <div class="gm-row">
                <div class="gm-col-12">
                    <select id="ucUsuarios-txtGrupo" class="gm-form-control-alt gm-filter">
                        <option value=""><?php echo isset($locales->group) ? $locales->group : "Group"; ?></option>
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
            echo "<label id='ucProductos-PagerInfo' class='no-mobile'>(Página {page} de {total_pages})</label>";
        ?>
    </div>
</div>
<script src="/modules/users/users.js"></script>
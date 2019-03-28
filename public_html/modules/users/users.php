<?php
    require_once $_SERVER['DOCUMENT_ROOT']."/main.php";

    $params=[
        "module"=>"users",
        "topic"=>"get_module_info"
    ];
    $module_info_res = json_decode($CloureSDK->execute($params));
    $locales = $module_info_res->locales;

    include_once __DIR__."/modals/md_usuarios.php";
    include_once __DIR__."/modals/md-agregar-pago.php";
?>

<div id="ucUsuarios" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Users</div>
        <div class="gm-uc-page-header-filters">
            <div class="gm-col-6">
                <button id="btnAgregar" type="button" class="gm-icon-button btn-add-user">
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
    <div id="ucUsuarios-dvPaginador" class="gm-uc-page-footer">
        <button class="gm-btn primary btnPrimero" disabled><i class="fas fa-step-backward"></i></button><!--
        --><button class="gm-btn primary btnAnterior" disabled><i class="fas fa-caret-left"></i></button><!--
        --><button class="gm-btn primary btnSiguiente"><i class="fas fa-caret-right"></i></button><!--
        --><button class="gm-btn primary btnUltimo"><i class="fas fa-step-forward"></i></button>
        <!--<label>Registros por página</label> <input type="number" value="20" class="gm-form-control" style="width: 60px" />-->
        <label><span id="gm-uc-page-footer-total-registers">0</span> <?php echo $module_info_res->locales->registers_found; ?></label>
        <?php 
            echo "<label id='ucUsuarios-PagerInfo'>(".$module_info_res->locales->page.")</label>";
        ?>
    </div>
</div>
<script src="/modules/users/users.js"></script>
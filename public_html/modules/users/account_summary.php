<?php
    require_once $_SERVER['DOCUMENT_ROOT']."/main.php";
    require_once $_SERVER['DOCUMENT_ROOT']."/modules/receipts/modals/md-receipt.php";
?>

<div id="ucSummaryAccount" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Summary account</div>
        <div class="gm-uc-page-header-filters">
            <div class="gm-col-6">
                <button type="button" class="gm-icon-button btn-back">
                    <span class='gm-part-icon fa fa-chevron-left'></span>
                </button>
                <button type="button" class='gm-icon-button btn-print-pdf'>
                    <span class='gm-part-icon fa fa-print'></span>
                </button>
            </div>
            <div class="gm-col-6">
                <div class="right">
                    <span class="txt-saldo toolbartext big">Saldo: $ 0.00</span>
                </div>
            </div>
        </div>
    </div>
    <div class="gm-uc-page-body">
        <div id="ucUsuarios-lstUsuarios" class="gm-itembox-container"></div>
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
<script src="/modules/users/account_summary.js"></script>
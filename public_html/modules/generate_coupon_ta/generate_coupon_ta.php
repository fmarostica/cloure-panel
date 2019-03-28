<link href="/panel/modules/finanzas/informes.css?v=2" rel="stylesheet" />
<form id="ucCupon" target="_blank" action="/ta/pdf/siro/" method="POST" class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Generar Cupón</div>
        <div class="gm-uc-page-header-filters"></div>
    </div>
    <div class="gm-uc-page-body">
        <div class="gm-row">
            <div class="gm-col-3">
                <label>Generar por</label>
                <select id="ucCupon-txtTipo" class="gm-form-control">
                    <option value="edificio">Edificio</option>
                    <option value="propiedad">Propiedad</option>
                </select>
            </div>
            <div class="gm-col-9">
                <label id="ucCupon-lblTipoSelect">Edificio</label>
                <select id="ucCupon-txtTipoSelect" name="idedificio" class="gm-form-control"></select>
            </div>
            <div class="gm-col-3">
                <label>Mes</label>
                <select name="mes" id="ucCupon-txtMes" class="gm-form-control">
                    <option value="0">Seleccione...</option>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>
            </div>
            <div class="gm-col-3">
                <label>Año</label>
                <select name="año" id="ucCupon-txtAño" class="gm-form-control">
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                </select>
            </div>
            <div class="gm-col-3">
                <label>Vencimiento 1</label>
                <input name="vencimiento1" type="date" class="gm-form-control" />
            </div>
            <div class="gm-col-3">
                <label>Vencimiento 2</label>
                <input name="vencimiento2" type="date" class="gm-form-control" />
            </div>
            <div class="gm-col-3">
                <label>Importe</label>
                <input name="importe" type="text" class="gm-form-control" />
            </div>
        </div>
    </div>
    <div class="gm-uc-page-footer">
        <button href="/panel/" type="submit" class="gm-btn primary">Generar cupon</button>
    </div>
</form>
<script src="modules/generate_coupon_ta/generate_coupon_ta.js"></script>
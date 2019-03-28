<form id="frmTransportesAgregar" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
    <div class="gm-uc-page-header">
            <button id="btnBack" title="Volver" type="button" class="btn-toolbar">
                <svg viewBox="0 0 24 24">
                    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                </svg>
            </button><!--
            --><button id="btnSave" title="Fijar Precios" type="button" class="btn-toolbar">
                <svg viewBox="0 0 24 24">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
            </button>
        </div>
    </div>
    <div class="gm-uc-page-body py-3 px-3">
        <div id="frmTransportesAgregar-tabControl" class="tab-content">
            <div id="frmTransportesAgregar-tabGeneral" class="gm-tab-pane active">
                <div class="row">
                    <div class="col-md-6">
                        <label>Nombre</label>
                        <input id="frmTransportesAgregar_txtNombre" name="txtNombre" type="text" class="form-control" placeholder="" value="" />
                    </div>
                    <div class="col-md-6">
                        <label>Tipo de envío</label>
                        <select id="frmTransportesAgregar_txtTipoEnvio" name="txtTipoEnvio" class="form-control">
                            <option value="contrarembolso">Contrarembolso</option>
                            <option value="encomienda">Encomienda</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="frmTransportesAgregar-tabPrecios" class="gm-tab-pane">
                <div class="row">
                    <div class="col-md-12">
                        <button id="btnAddCantidad" type="button" class='gm-btn success'><span class='fa fa-plus'></span></button>
                    </div>
                </div>
                <div class="row nowrap">
                    <div class="col-md-3"><label>Desde (Kg)</label></div>
                    <div class="col-md-3"><label id="frmTransportes-lblLower">Importe (Regional)</label></div>
                    <div class="col-md-3"><label id="frmTransportes-lblHigher">Importe (Nacional)</label></div>
                    <div class="col-md-3"></div>
                </div>
                <div id="promoboxes-content"></div>
            </div>
        </div>
    </div>
</form>

<script type="text/javascript" src="/modules/transports/add.js"></script>
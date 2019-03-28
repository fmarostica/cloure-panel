<form id="frmReceiptDetail" method="POST" enctype="multipart/form-data">
    <div class="gm-uc-page-header">
        <button id="btnBack" title="Volver" type="button" class="btn-toolbar">
            <svg viewBox="0 0 24 24">
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
        </button>
    </div>
    <div class="gm-uc-page-body py-3 px-3">
        <div style="border: 1px solid #ccc; padding: 5px;">
            <b>Datos del cliente</b>
            <div class="gm-row">
                <div class="gm-col-6">Nombre: <span id="lblName"></span></div>
                <div class="gm-col-6">Apellido: <span id="lblLastName"></span></div>
                <div class="gm-col-6">Teléfono: <span id="lblPhone"></span></div>
                <div class="gm-col-6">Email: <span id="lblEmail"></span></div>
            </div>
        </div>
        <br/>
        <div style="border: 1px solid #ccc; padding: 5px;">
            <div class="gm-row">
                <div class="gm-col-6">Forma de pago: <span id="lblPayment"></span></div>
                <div class="gm-col-6">Forma de envío: <span id="lblDelivery"></span></div>
            </div>
        </div>
        <br/>
        <div style="border: 1px solid #ccc; padding: 5px;">
            <b>Datos de entrega</b>
            <div id="datos-entrega">
            </div>
        </div>
        <br/><br/>
        <table class="table-items" style="width: 100%;">
            <thead>
                <tr>
                    <th style="width: 100px; text-align: center;">Cantidad</th>
                    <th>Descripción</th>
                    <th style="width: 150px;">Precio Total</th>
                </tr>
            </thead>
            <tbody class="lst-items">
            </tbody>
        </table>
    </div>        
</form>
<script type="text/javascript" src="/modules/receipts/receipts.js"></script>
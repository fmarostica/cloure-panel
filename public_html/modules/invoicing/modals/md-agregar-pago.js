var frmFacturacionAgregarPago = {
    elem: $("#frmFacturacionAgregarPago"),
    caller: null,
    total: 0,
    cantidad_total: 0,
    initialize: function(){
        var $this = this;
        $("#frmFacturacionAgregarPago-btnAceptar").click(function(e){
            $this.finalizar();
        });

        
    },
    open: function(caller){
        this.caller = caller;
        $.GMWindowManager.open(this.elem);
    },
    finalizar: function(){
        var response = {
            Entrega: $("#frmFacturacionAgregarPago-txtEntrega").val(),
            FormaDePagoId: $("#frmFacturacionAgregarPago-txtFormaDePago").val()
        }
        this.caller(response);
    }
};

frmFacturacionAgregarPago.initialize();
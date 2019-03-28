var frmSubscribeCloure = {
    usuario_id: 0,
    caller: null,
    ajax_url: "/ajax/xhr.php",
    element: $("#frmSubscribeCloure"),
    initialize: function(){
        var $this = this;
        
    },
    open: function(usuario_id, caller){
        var $this = this;
        $this.caller = caller;
        $this.usuario_id = usuario_id;
        $("#frmAgregarPago_txtImporte").val("");
        $.GMWindowManager.open($this.element);
    },
    guardar: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "users",
                topic: "agregar_pago", 
                id: $("#frmAgregarPago_hComprobanteId").val(),
                importe: $("#frmAgregarPago_txtImporte").val(),
                forma_de_pago_id: $("#frmAgregarPago_txtFormaDePago").val(),
                forma_de_pago_entidad_id: $("#frmAgregarPago_txtFormaDePagoEntidad").val(),
                usuario_id: $this.usuario_id
            },
            type: 'POST',
            dataType: 'json',
            success: function(data){
                if(data.Error==""){
                    //$("#frmUsuariosAgregarPago").modal("hide");
                    $.GMWindowManager.close($this.element);
                    swal("Operación realizada!", "El pago ha sido agregado.", "success");
                    if($.isFunction($this.caller)) $this.caller();
                } else {
                    swal("Error", data.Error, "error");
                }
            }
        });
    }
} 

frmSubscribeCloure.initialize();
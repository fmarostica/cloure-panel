var frmUsuariosAgregarPago = {
    usuario_id: 0,
    caller: null,
    ajax_url: "/ajax/xhr.php",
    element: $("#frmUsuariosAgregarPago"),
    initialize: function(){
        var $this = this;
        $("#frmAgregarPago_txtFormaDePago").change(function(e){
            if($(this).val()==1){
                $("#dvEntidad").css("display", "none");
                $this.element.find(".dvCheque").css("display", "none");
            } else {
                $("#dvEntidad").css("display", "block");
                $this.element.find(".dvCheque").css("display", "none");
                if($(this).val()==2){
                    $("#lblEntidad").text("Tarjeta");
                    $this.cargar_tarjetas_credito();
                } else if($(this).val()==3) {
                    $("#lblEntidad").text("Tarjeta");
                    $this.cargar_tarjetas_debito();
                } else if($(this).val()==5) {
                    $("#lblEntidad").text("Banco");
                    $this.element.find(".dvCheque").css("display", "block");
                    $this.cargar_bancos();
                } else {
                    $("#dvEntidad").css("display", "none");
                    $this.element.find(".dvCheque").css("display", "none");
                }
            }
        });
        $("#frmUsuariosAgregarPago-btnAceptar").click(function(e){
            $this.guardar();
        });
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
                usuario_id: $this.usuario_id,
                cheque: $("#frmAgregarPago_txtCheque").val()
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
    },
    cargar_bancos: function(){
        var $this = this;
        $("#frmAgregarPago_txtFormaDePagoEntidad").empty();
        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "banks", 
                topic: "listar"
            },
            type: 'POST',
            dataType: 'json',
            success: function(data){
                registros = data.Response.Registros;
                for (let i = 0; i < registros.length; i++) {
                    $("#frmAgregarPago_txtFormaDePagoEntidad").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
        });
    },
    cargar_tarjetas_credito: function(){
        var $this = this;
        $("#frmAgregarPago_txtFormaDePagoEntidad").empty();
        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "credit_cards", 
                topic: "listar"
            },
            type: 'POST',
            dataType: 'json',
            success: function(data){
                registros = data.Response.Registros;
                for (let i = 0; i < registros.length; i++) {
                    $("#frmAgregarPago_txtFormaDePagoEntidad").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
        });
    },
    cargar_tarjetas_debito: function(){
        var $this = this;
        $("#frmAgregarPago_txtFormaDePagoEntidad").empty();
        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "debit_cards", 
                topic: "listar"
            },
            type: 'POST',
            dataType: 'json',
            success: function(data){
                registros = data.Response.Registros;
                for (let i = 0; i < registros.length; i++) {
                    $("#frmAgregarPago_txtFormaDePagoEntidad").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
        });
    }
} 

frmUsuariosAgregarPago.initialize();
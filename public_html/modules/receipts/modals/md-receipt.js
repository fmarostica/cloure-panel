var frmReceiptDetail = {
    elem: $("#frmReceiptDetail"),
    caller: null,
    ajax_url: "/ajax/xhr.php",
    total: 0,
    cantidad_total: 0,
    initialize: function(){
        var $this = this;
    },
    open: function(comprobante_id, caller){
        var $this = this;
        this.caller = caller;

        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "receipts", 
                topic: "obtener", 
                id: comprobante_id 
            },
            type: 'POST',
            dataType: 'json',
            success: function(data){
                var pedido = data.Response;

                $("#lblName").html(pedido.ClienteNombre);
                $("#lblLastName").html(pedido.ClienteApellido);
                $("#lblPhone").html(pedido.UsuarioTelefono);
                $("#lblEmail").html(pedido.UsuarioMail);

                $items = pedido.Items;
                $this.elem.find(".lst-items").empty();
                
                for (let i = 0; i < $items.length; i++) {
                    $this.elem.find(".lst-items").append("<tr><td>"+$items[i].Cantidad+"</td><td>"+$items[i].Detalles+"</td><td style='width: 100px; text-align: right;'>$ "+$items[i].Total+"</td></tr>");                    
                }
                $.GMWindowManager.open($this.elem);
            }
        });  
    }
};

frmReceiptDetail.initialize();
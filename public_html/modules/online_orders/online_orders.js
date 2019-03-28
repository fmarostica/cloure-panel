var frmFacturacion = {
    elem: $("#ucOnlineOrders"),
    ajax_url: "/ajax/xhr.php",
    items: [],
    initialize: function(){
        var $this = this;
        this.cargar_comprobantes("pedido");

        $("#ucFacturacion-lstProductos").on("click", ".frmFacturacion-item-borrar", function(e){
            $(this).closest("tr").remove();
            frmFacturacion.calcular_total();
        });

        $("#ucFacturacion-lstProductos").on("change keyup", ".frmFacturacion-item-cant", function(e){
            var parent = $(this).closest(".frmFacturacion-ProductoItem");
            frmFacturacion.calcular_total_producto(parent);
        });

        $("#ucFacturacion-txtOperacion").change(function(e){frmFacturacion.cargar_comprobantes($(this).val());});
        $("#ucFacturacion-btnSeleccionarProducto").click(function(e){frmFacturacion.seleccionar_producto();});
        $("#ucFacturacion-btnCliente").click(function(e){frmFacturacion.seleccionar_cliente();});
        $("#ucFacturacion-btnFinalizar").click(function(e){frmFacturacion.guardar();});

        $(document).ready(function(){
            var incoming_exceeded = CloureManager.get_month_incoming();
            if(incoming_exceeded=="true"){

                if(CloureManager.get_account_type()=="free"){
                    $this.elem.empty();
                    $this.elem.append("<div style='background-color: white; text-align:center; padding: 20px;'>Ha superado el límite de facturación mensual. <a href='https://cloure.com/es/?app_token="+CloureManager.get_app_token()+"' target='_blank'>Conozca nuestros planes</a></div>");
                }
            }
            $("#output-loader").css("display", "none");
        });
        
    },
    cargar_comprobantes: function(operacion){
        /*
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "company",
                topic: "listar_inmuebles_comprobantes",
                operacion: operacion
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                var inicio = data.Response.Inicio;
                var fin = data.Response.Fin;
                var total_registros = data.Response.TotalRegistros;
                var totalPaginas = data.Response.TotalPaginas;

                $("#hInmuebleId").val(0);
                $("#txtNombre").val("");
                $("#txtDireccion").val("");

                $("#ucFacturacion-txtOperacionComprobante").empty();
                if(data.Error==""){
                    for (var i = 0; i<registros.length; i++) {
                        $("#ucFacturacion-txtOperacionComprobante").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }
                }
                else{
                    alert(data.Error);
                }
            }
        });
        */
    },
    agregar_item: function(Producto){
        var $this = this;
        var Titulo = Producto.Titulo;
        if(Producto.Observaciones!=undefined && Producto.Observaciones!="") Titulo+=" ("+Producto.Observaciones+")";
        var elem = "<tr class='frmFacturacion-ProductoItem' data-producto-id='"+Producto.Id+"'>"+
            "<td style='width: 60px' ><input type='number' step='0.01' value='"+Producto.Cantidad+"' class='gm-form-control frmFacturacion-item-cant' /></td>"+
            "<td><label class='detalles'>"+Titulo+"</label></td>"+
            "<td style='width: 120px'><input type='number' step='0.01' value='"+Producto.Precio.toFixed(2)+"' class='gm-form-control frmFacturacion-item-precio' /></td>"+
            "<td style='width: 70px'><input type='number' step='0.01' value='"+Producto.IVA+"' class='gm-form-control frmFacturacion-item-iva' /></td>"+
            "<td style='width: 120px'><input type='number' step='0.01' value='"+Producto.Importe.toFixed(2)+"' class='gm-form-control frmFacturacion-item-importe' /></td>"+
            "<td style='width: 150px'><input type='number' step='0.01' value='"+Producto.Total.toFixed(2)+"' class='gm-form-control frmFacturacion-item-total' /></td>"+
            "<td><button type='button' class='gm-btn frmFacturacion-item-borrar danger'><i class='fa fa-trash fa-fw'></i></button></td>"+
        "</tr>";
        $("#ucFacturacion-lstProductos").append(elem);
        frmFacturacion.calcular_total_producto($("#frmFacturacion-lstProductos tr:last"));
    },
    calcular_total_producto: function(elem){
        var cant = parseFloat(elem.find(".frmFacturacion-item-cant").val());
        var precio = parseFloat(elem.find(".frmFacturacion-item-precio").val());
        var iva = parseFloat(elem.find(".frmFacturacion-item-iva").val());
        var importe = 0;
        var total = 0;
        if(iva>0){
            importe = precio + ((precio*iva)/100);
        } else {
            importe = precio;
        }
        total = importe * cant;
        
        elem.find(".frmFacturacion-item-importe").val(importe.toFixed());
        elem.find(".frmFacturacion-item-total").val(total.toFixed());
        this.calcular_total();
    },
    calcular_total: function(){
        TotalComprobante=0;
        $("#ucFacturacion-lstProductos").children(".frmFacturacion-ProductoItem").each(function(){
            TotalComprobante+=parseFloat($(this).find(".frmFacturacion-item-total").val());
        });
        $("#ucFacturacion-lblTotal").text(TotalComprobante.toFixed(2));
    },
    seleccionar_cliente: function(){
        frmUsuariosSeleccionar.open(function(usuario){
            $("#ucFacturacion-btnCliente").html(usuario.Id+" - "+usuario.Apellido+", "+usuario.Nombre);
            $("#ucFacturacion-AlertSaldo").css("display", "block");
            if(usuario.Saldo>0){
                $("#ucFacturacion-AlertSaldo").removeClass("success").addClass("danger");
            } else {
                $("#ucFacturacion-AlertSaldo").removeClass("danger").addClass("success");
            }
            $("#ucFacturacion-AlertSaldo-Importe").html(usuario.Saldo.toFixed(2));
            $("#ucFacturacion-ClienteId").val(usuario.Id);
        });
    },
    seleccionar_producto: function(){
        frmProductosSeleccionar.open(this.agregar_item);
    },
    guardar: function(){
        var $this = this;
        var items = [];
        $(".frmFacturacion-ProductoItem").each(function(e){
            var $this = $(this);
            var producto_item = {
                id: $this.data("producto-id"),
                cantidad: $this.find(".frmFacturacion-item-cant").val(),
                detalle: $this.find(".detalles").text(),
                precio: $this.find(".frmFacturacion-item-precio").val(),
                iva: $this.find(".frmFacturacion-item-iva").val(),
                importe: $this.find(".frmFacturacion-item-importe").val(),
            };
            items.push(producto_item);
        });
        if(items.length>0 && parseInt($("#ucFacturacion-ClienteId").val())>0){
            var reset = this.reset;
            frmFacturacionAgregarPago.open(function(response){
                $.ajax({
                    url: $this.ajax_url,
                    data: 
                    {
                        module: "receipts",
                        topic: "guardar",
                        operacion: $("#ucFacturacion-txtOperacion").val(),
                        tipo_comprobante_id: $("#ucFacturacion-txtOperacionComprobante").val(),
                        cliente_id: $("#ucFacturacion-ClienteId").val(),
                        items: JSON.stringify(items),
                        entrega: response.Entrega,
                        forma_de_pago_id: response.FormaDePagoId,
                        sucursal_id: $("#txtPuntoDeVenta").val()
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function(data)
                    {
                        if(data.Error==""){
                            reset();
                            $.GMWindowManager.close($("#frmFacturacionAgregarPago"));
                            //$("#frmFacturacionAgregarPago").modal("hide");
                            //Hacer si esta establecida la opcion si no no
                            //if(data.Response.ComprobanteId>0) window.open("/panel/comprobantes/?id="+data.Response.ComprobanteId);
                        }
                        else{
                            alert(data.Error);
                        }
                    }
                });
            });
        } else {
            swal("Error", "Debe agregar productos y un cliente para poder finalizar la operación", "error");
        }
    },
    reset: function(){
        $("#ucFacturacion-lstProductos").empty();
        $("#display-last-product").text("");
        $("#display-total").text("$ 0.00");
        $("#ucFacturacion-btnCliente").html("Seleccionar/Agregar");
        $("#ucFacturacion-ClienteId").val("0");
        $("#ucFacturacion-AlertSaldo").css("display", "none");
    }
};

frmFacturacion.initialize();

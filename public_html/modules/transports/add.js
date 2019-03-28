var frmTransportes = {
    id: 0,
    caller: null,
    element: $("#frmTransportesAgregar"),
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;
        
        $("#frmTransportesAgregar").on("click", ".btnRemovePromoBox", function(e){
            $(this).closest(".promobox").fadeOut();
        });

        $("#frmTransportesAgregar_txtTipoEnvio").change(function(){
            var tipo = $(this).val();
            if(tipo=="contrarembolso"){
                $("#frmTransportes-lblLower").html("Precio regional");
                $("#frmTransportes-lblHigher").html("Precio nacional");
            } else if(tipo=="encomienda"){
                $("#frmTransportes-lblLower").html("Precio a sucursal");
                $("#frmTransportes-lblHigher").html("Precio a domicilio");
            }
        });

        $("#btnBack").click(function(){
            CloureManager.go_back();
        });

        $("#btnSave").click(function(e){
            var promos_cantidad = [];
            
            $(".promobox").each(function(){
                var promobox_tmp = { 
                    desde: $(this).find(".promobox-desde").val(), 
                    regional: $(this).find(".promobox-regional").val(),
                    nacional: $(this).find(".promobox-nacional").val()
                };
                promos_cantidad.push(promobox_tmp);
            });

            $.ajax({
                url: $this.ajax_url,
                type: 'POST',
                data: {
                    module: "transports",
                    topic: "guardar",
                    id: $("#frmTransportesAgregar_hTransporteId").val(),
                    nombre: $("#frmTransportesAgregar_txtNombre").val(),
                    tipo_envio: $("#frmTransportesAgregar_txtTipoEnvio").val(),
                    precios: JSON.stringify(promos_cantidad)
                },
                dataType: 'json',
                success: function(data){
                    var error = data.Error;
                    if(error.length>0){
                        swal("Error!", data.Error, "error");
                    }
                    else{
                        CloureManager.go_back();
                    }
                }
            });
        });

        $("#btnAddCantidad").click(function(e){
            $this.add_pricebox();
        });
    },
    open: function(id=0, caller=null){
        var $this = this;
        $this.id = id;
        $this.caller = caller;
        if($this.id==0){
            $("#frmTransportesAgregar").find("#lblTitulo").html("Agregar categoria");
            $("#frmTransportesAgregar").find("#hProductoId").val("0");
            $("#frmTransportesAgregar").find("#hImagenPrincipal").val("");
            $("#frmTransportesAgregar").find("#txtCodigo").val("");
            $("#promoboxes-content").empty();
            $.GMWindowManager.open($this.element);
        } else {
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "transports",
                    topic: "obtener", 
                    id: id 
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    var Transporte = data.Response;
                   
                    $("#frmTransportesAgregar_lblTitulo").html("Editar transporte");
                    $("#frmTransportesAgregar_hTransporteId").val(Transporte.Id);
                    $("#frmTransportesAgregar_txtNombre").val(Transporte.Nombre);

                    $("#promoboxes-content").empty();
                    if(Array.isArray(Transporte.Precios)){
                        var promos = Transporte.Precios;
                        for (i = 0; i < promos.length; i++) {
                            $this.add_pricebox(promos[i].desde, promos[i].regional, promos[i].nacional);
                        }

                        $(".promobox-valor").change();
                    }

                    $.GMWindowManager.open($this.element);
                }
            });
        }
    },
    add_pricebox: function(desde=0, regional=0, nacional=0){
        $("#promoboxes-content").append(
            "<div class='gm-row promobox nowrap' style='margin-bottom: 10px'>"+
                "<div class='gm-col-3'>"+
                    "<input type='text' class='gm-form-control promobox-desde' value='"+desde+"' />"+
                "</div>"+
                "<div class='gm-col-3'>"+
                    "<input type='text' class='gm-form-control decimal promobox-regional' value='"+regional+"' />"+
                "</div>"+
                "<div class='gm-col-3'>"+
                    "<input type='text' class='gm-form-control decimal promobox-nacional' value='"+nacional+"' />"+
                "</div>"+
                "<div class='gm-col-1'>"+
                    "<button type='button' class='gm-btn danger btnRemovePromoBox'><span class='fa fa-minus-circle'></span></button>"+
                "</div>"+
            "</div>"
        );
        $(".promobox").last().find(".promobox-desde").focus();
    }
}


frmTransportes.initialize();
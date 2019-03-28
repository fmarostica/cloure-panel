var frmProductosSeleccionar = {
    elem: $("#frmProductosSeleccionar"),
    caller: null,
    ajax_url: "/ajax/xhr.php",
    multiselect: false,
    selected_products: [],
    selected_product: {
        Id: 0,
        Cantidad: 1,
        Titulo: "",
        Precio: 0,
        IVA: 0,
        Importe: 0,
        Total: 0
    },
    initialize: function(){
        var $this = this;

        $("#frmProductosSeleccionar-btnAgregarProducto").click(function(e){
            frmProductos.open(0, function(){
                $this.cargar_datos();
            });
        });
        $("#frmProductosSeleccionar-txtBuscar").on("keyup change", function(e){
            $this.cargar_datos();
        });
       
        $("#frmProductosSeleccionar-btnAceptar").click(function(){
            $this.caller($this.selected_products);
            $.GMWindowManager.close($this.elem);
        });

        $("#frmProductosSeleccionar-lstProductos").on("click", ".gm-itembox", function(){
            if(!$this.multiselect){
                $this.seleccionar($(this));
            } else {
                var id = $(this).data("id");
                var titulo = $(this).data("titulo");
                if($(this).hasClass("selected")){
                    $(this).removeClass("selected");
                    var index = 0;
                    for (let i = 0; i < $this.selected_products.length; i++) {
                        if(id==$this.selected_products[i].id) index = i;
                        break;
                    }
                    $this.selected_products.splice(index);
                } else {
                    $(this).addClass("selected");
                    var producto_tmp = {
                        id: id,
                        titulo: titulo
                    }
                    $this.selected_products.push(producto_tmp);
                }
            }
        });
    },
    open: function(caller=null, multiselect=false){
        this.caller = caller;
        this.multiselect = multiselect;
        this.selected_products = [];

        if(this.multiselect){
            $("#frmProductosSeleccionar-btnAceptar").css("display", "inline");
        } else {
            $("#frmProductosSeleccionar-btnAceptar").css("display", "none");
        }

        $.GMWindowManager.open(this.elem);
        this.cargar_datos();
    },
    cargar_datos: function(){
        var $this  = this;
        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "products_services",
                topic: "listar", 
                filtro: $("#frmProductosSeleccionar-txtBuscar").val(), 
                pagina : 1,
                ordenar_por: "titulo",
                orden: "asc",
                categoria_n1_id: 0,
                tipo_producto_id: 0,
                marca_id: 0,
                publicados: -1,
                limite: 10
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

                $("#frmProductosSeleccionar-lstProductos").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            var commands = registros[i].AvailableCommands;
                            var selected = "";
                            for (let j = 0; j < $this.selected_products.length; j++) {
                                if($this.selected_products[j]==registros[i].Id){
                                    selected = "selected";
                                    break;
                                }
                            }
                            $("#frmProductosSeleccionar-lstProductos").append(
                                "<div class='gm-itembox editable "+selected+"' "+
                                    " data-id='"+registros[i].Id+"'"+
                                    " data-titulo='"+registros[i].Titulo+"'"+
                                    " data-precio='"+registros[i].VentaPrecio+"'"+
                                    " data-iva='"+registros[i].Iva+"'"+
                                    " data-importe='"+registros[i].VentaImporte+"'"+
                                    " data-total='"+registros[i].VentaImporte+"'"+
                                    " data-sistema-medida-id='"+registros[i].SistemaMedidaId+"'"+
                                    ">"+
                                    "<input id='data-importe' type='hidden' value='"+registros[i].VentaImporte+"' />"+
                                    "<div class='gm-row clearfix'>"+
                                        "<div class='col-md-10'>"+
                                            "<div class='gm-itembox-imgcontainer' style='width: 60px; height: 60px'>"+
                                                "<img src='"+registros[i].ImagenPath+"' />"+
                                            "</div>"+
                                            "<div style='display: inline-block'>"+
                                                "<span class='gm-itembox-title'>"+registros[i].Titulo+"</span>"+
                                                "<br/><span class='gm-itembox-title'>$ "+registros[i].Importe+"</span>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                            for (var j = 0; j < commands.length; j++){
                                if(registros[i].AvailableCommands[j]=="borrar") $("#cmdbox-"+registros[i].Id).append("<button class='gm-btn danger' onclick='borrar("+registros[i].Id+")'><i class='fa fa-trash'></i></button>");
                            }
                        }
                    } else {
                        $("#frmProductosSeleccionar-lstProductos").append("<div class='gm-empty-content'>No se encontraron registros<br />"+
                        "<span class='gm-small'>Intenta con otros criterios de búsqueda</span>"+
                        "</div>");
                        $("#frmProductosSeleccionar-lstProductos").addClass("empty");
                    }
                }
            }
        });
    },
    seleccionar: function(item){
        var sistemaMedidaId = item.data("sistema-medida-id");
        this.selected_product.Id = item.data("id");
        this.selected_product.Titulo = item.data("titulo");
        this.selected_product.Precio = item.data("precio");
        this.selected_product.IVA = item.data("iva");
        this.selected_product.Importe = item.data("importe");
        this.selected_product.Total = item.data("total");

        if(sistemaMedidaId=="3"){
            frmFacturacionProductoMedidas.open(this);
        } else {
            this.caller(this.selected_product);
            $.GMWindowManager.close(this.elem);
        }
    },
    on_medida_setted: function(){
        this.caller(this.selected_product);
    }
}

frmProductosSeleccionar.initialize();
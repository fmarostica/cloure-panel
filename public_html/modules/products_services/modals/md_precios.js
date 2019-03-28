var frmProductosPrecios = {
    caller: null,
    element: $("#frmProductosPrecios"),
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;
        var last_categoria_id = 0;
        if($("#frmProductosPrecios-txtCategoriasN1").val()>0) last_categoria_id = $("#frmProductosPrecios-txtCategoriasN1").val();
        if($("#frmProductosPrecios-txtCategoriasN2").val()>0) last_categoria_id = $("#frmProductosPrecios-txtCategoriasN1").val();

        $("#btnPreciosGuardar").click(function(){
            $.ajax({
                url: $this.ajax_url,
                type: 'POST',
                data: {
                    module: "products_services",
                    topic: "establecer_precios",
                    cambiar_por: $("#frmProductosPrecios-txtChangeBy").val(),
                    iva: $("#frmPreciosAgregar_txtIVA").val(),
                    tipo_producto_id: $("#frmProductosPrecios_txtTipoProducto").val(),
                    categoria_n1_id: $("#frmProductosPrecios-txtCategoriasN1").val(),
                    costo_precio: $("#frmPreciosAgregar_txtCostoPrecio").val(),
                    costo_importe: $("#frmPreciosAgregar_txtCostoImporte").val(),
                    venta_precio: $("#frmPreciosAgregar_txtVentaPrecio").val(),
                    venta_importe: $("#frmPreciosAgregar_txtVentaImporte").val(),
                    operacion: $("#frmProductosPrecios-txtOperación").val(),
                    tipo_valor: $("#frmProductosPrecios-txtValor").val(),
                    categoria_id: last_categoria_id
                },
                dataType: 'json',
                success: function(data){
                    var error = data.Error;
                    if(error.length>0){
                        alert(error);
                    }
                    else{
                        $.GMWindowManager.close($this.element);
                        $this.caller();
                    }
                }
            });
        });

        $("#frmProductosPrecios-txtChangeBy").change(function(){
            if($(this).val()=="category"){
                $("#frmProductosPrecios-dvCategorias").css("display", "block");
            } else {
                $("#frmProductosPrecios-dvCategorias").css("display", "none");
            }
        });

        $("#frmProductosPrecios-txtOperación").change(function(){
            if($(this).val()=="cambiar"){
                $("#frmProductosPrecios-colValor").css("display","none");
            } else {
                $("#frmProductosPrecios-colValor").css("display","inline-block");
            }
        });

        $("#frmProductosPrecios-txtCategoriasN1").change(function(){
            last_categoria_id = $(this).val();
            $this.cargar_categorias_n2();
        });

        $("#frmProductosPrecios-txtCategoriasN2").change(function(){
            if($(this).val()!="0") last_categoria_id = $(this).val();
        });

        $this.cargar_categorias();
    },
    open: function(caller=null){
        var $this = this;
        $this.caller = caller;

        $.GMWindowManager.open($this.element);
    },
    cargar_categorias: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "products_services_categories",
                topic: "listar_categorias_n1",
                order_by: "nombre", 
                order_type: "asc"
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            var registros = data.Response.Registros;
            $("#frmProductosPrecios-txtCategoriasN1").empty();
            if(data.Error==""){
                $("#frmProductosPrecios-txtCategoriasN1").append("<option value='0' selected>Sin especificar</option>");
                for (var i = 0; i<registros.length; i++) {
                    $("#frmProductosPrecios-txtCategoriasN1").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
        });
    },
    cargar_categorias_n2: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            type: 'POST',
            dataType: 'json',
            data: { 
                module: "products_services_categories",
                topic: "listar_categorias_n2", 
                filtro: "", 
                pagina : 1, 
                col: "nombre", 
                order: "asc", 
                categoria_n1_id: $("#frmProductosPrecios-txtCategoriasN1").val() 
            },
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#frmProductosPrecios-txtCategoriasN2").empty();
                if(registros.length>0)
                {
                    $("#frmProductosPrecios-txtCategoriasN2").append("<option value='0'>Sin especificar</option>");
                    for (var i = 0; i<registros.length; i++)
                    {
                        if((-1)==registros[i].Id)
                            $("#frmProductosPrecios-txtCategoriasN2").append("<option id='categoriaN2-"+registros[i].Id+"' value='"+ registros[i].Id +"' selected>"+registros[i].Nombre+"</option>");
                        else
                            $("#frmProductosPrecios-txtCategoriasN2").append("<option id='categoriaN2-"+registros[i].Id+"' value='"+ registros[i].Id +"' >"+registros[i].Nombre+"</option>");
                    }
                }
            }
        });
    }
}

frmProductosPrecios.initialize();

$("#frmPreciosAgregar_txtCostoPrecio").on("paste keyup", function(){
    calcularCostoImporte();
});
$("#frmPreciosAgregar_txtCostoImporte").on("paste keyup", function(){
    calcularCostoPrecio();
});
$("#frmPreciosAgregar_txtVentaPrecio").on("paste keyup", function(){
    calcularVentaImporte();
});
$("#frmPreciosAgregar_txtVentaImporte").on("paste keyup", function(){
    calcularVentaPrecio();
});

$("#frmPreciosAgregar_txtIVA").on("change paste keyup", function(){
    var valor = $(this).val();
    $("#frmPreciosAgregar_txtCostoIVA").val(valor);
    $("#frmPreciosAgregar_txtVentaIVA").val(valor);
    calcularVentaImporte();
    calcularCostoImporte();
});

function calcularCostoImporte(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmPreciosAgregar_txtCostoPrecio").val().length > 0) 
        precio = parseFloat($("#frmPreciosAgregar_txtCostoPrecio").val());
    else
        $("#frmPreciosAgregar_txtCostoPrecio").val("0");
    
    if($("#frmPreciosAgregar_txtIVA").val().length > 0) iva = parseFloat($("#frmPreciosAgregar_txtIVA").val());

    importe = precio + ((precio * iva) / 100);
    importef = Math.round(importe * 100) / 100
    $("#frmPreciosAgregar_txtCostoImporte").val(importef.toString());

    calcularGanancia();
}

function calcularCostoPrecio(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmPreciosAgregar_txtCostoImporte").val().length > 0) 
        importe = parseFloat($("#frmPreciosAgregar_txtCostoImporte").val());
    else
        $("#frmPreciosAgregar_txtCostoImporte").val("0");
    
    if($("#frmPreciosAgregar_txtIVA").val().length > 0) iva = parseFloat($("#frmPreciosAgregar_txtIVA").val());

    precio = importe / ((100 + iva) / 100);
    preciof = Math.round(precio * 100) / 100

    $("#frmPreciosAgregar_txtCostoPrecio").val(preciof.toString());

    calcularGanancia();
}

function calcularVentaImporte(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmPreciosAgregar_txtVentaPrecio").val().length > 0) 
        precio = parseFloat($("#frmPreciosAgregar_txtVentaPrecio").val());
    else
        $("#frmPreciosAgregar_txtVentaPrecio").val("0");
    
    if($("#frmPreciosAgregar_txtIVA").val().length > 0) iva = parseFloat($("#frmPreciosAgregar_txtIVA").val());

    importe = precio + ((precio * iva) / 100);
    importef = Math.round(importe * 100) / 100
    $("#frmPreciosAgregar_txtVentaImporte").val(importef.toString());

    calcularGanancia();
}

function calcularVentaPrecio(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmPreciosAgregar_txtVentaImporte").val().length > 0) 
        importe = parseFloat($("#frmPreciosAgregar_txtVentaImporte").val());
    else
        $("#frmPreciosAgregar_txtVentaImporte").val("0");
    
    if($("#frmPreciosAgregar_txtIVA").val().length > 0) iva = parseFloat($("#frmPreciosAgregar_txtIVA").val());

    precio = importe / ((100 + iva) / 100);
    preciof = Math.round(precio * 100) / 100

    $("#frmPreciosAgregar_txtVentaPrecio").val(preciof.toString());

    calcularGanancia();
}

function calcularGanancia(){
    var costoPrecio = 0;
    var costoImporte = 0;
    var ventaPrecio = 0;
    var ventaImporte = 0;
    var gananciaImporte = 0;
    var gananciaPorcentaje = 0;
    var gananciaPorcentajef = 0;
    var promocionImporte = 0;
    var promocionDescuento = 0;
    var promocionTipoDescuento = "";
    var descuento = 0;

    var porcentaje = "";

    if($("#frmPreciosAgregar_txtCostoPrecio").val().length>0) costoPrecio = parseFloat($("#frmPreciosAgregar_txtCostoPrecio").val());
    if($("#frmPreciosAgregar_txtCostoImporte").val().length>0) costoImporte = parseFloat($("#frmPreciosAgregar_txtCostoImporte").val());
    if($("#frmPreciosAgregar_txtVentaPrecio").val().length>0) ventaPrecio = parseFloat($("#frmPreciosAgregar_txtVentaPrecio").val());
    if($("#frmPreciosAgregar_txtVentaImporte").val().length>0) ventaImporte = parseFloat($("#frmPreciosAgregar_txtVentaImporte").val());

    gananciaImporte = ventaImporte - costoImporte - descuento;
    if (costoImporte > 0)
    {
        gananciaPorcentaje = (gananciaImporte / costoImporte) * 100;
        gananciaPorcentajef = Math.round(gananciaPorcentaje * 100) / 100
    }
}
var frmFacturacionProductoMedidas = {
    elem: $("#frmFacturacionMedidas"),
    caller: null,
    total: 0,
    cantidad_total: 0,
    open: function(caller){
        $("#frmFacturacionMedidas-txtCantidad").val("1");
        $("#frmFacturacionMedidas-txtAncho").val("");
        $("#frmFacturacionMedidas-txtAlto").val("");
        $("#frmFacturacionMedidas-txtLadoMenor").val("");
        $("#frmFacturacionMedidas-txtPrecioDesperdicio").val("");
        $("#frmFacturacionMedidas-txtImporteDesperdicio").val("");
        this.caller = caller;
        $.GMWindowManager.open(this.elem);
    },
    calcular_desperdicio: function(){
        var ancho = parseFloat($("#frmFacturacionMedidas-txtAncho").val());
        var alto = parseFloat($("#frmFacturacionMedidas-txtAlto").val());
        var lado_mayor = 0;
        var lado_menor = parseFloat($("#frmFacturacionMedidas-txtLadoMenor").val());
        var cantidad = parseFloat($("#frmFacturacionMedidas-txtCantidad").val());

        if (ancho > alto)
            lado_mayor = ancho;
        else
            lado_mayor = alto;

        var sup_requerida = ancho * alto;
        var sup_material = (alto + 0.10) * (lado_menor);
        var desperdicio = sup_material - sup_requerida;
        var precio_desperdicio = parseFloat($("#frmFacturacionMedidas-txtPrecioDesperdicio").val());
        var importe_desperdicio = desperdicio * precio_desperdicio;
        this.cantidad_total = cantidad * sup_requerida;
        var ImporteTmp = this.caller.selected_product.Importe;
        
        this.total = (ImporteTmp * this.cantidad_total) + importe_desperdicio;

        $("#frmFacturacionMedidas-txtImporteDesperdicio").val(importe_desperdicio.toFixed(2));
    },
    finalizar: function(){
        this.caller.selected_product.Cantidad = this.cantidad_total;
        this.caller.selected_product.Total = this.total; 
        this.caller.selected_product.Importe = this.total / this.cantidad_total;
        this.caller.selected_product.Precio = this.caller.selected_product.Importe / 1.21;
        this.caller.selected_product.Observaciones = $("#frmFacturacionMedidas-txtObservaciones").val();

        $.GMWindowManager.close($("#frmFacturacionMedidas"));
        $.GMWindowManager.close($("#frmProductosSeleccionar"));
        this.caller.on_medida_setted();
    }
};

$("#frmFacturacionMedidas-txtAlto").on("change keyup", function(){frmFacturacionProductoMedidas.calcular_desperdicio();});
$("#frmFacturacionMedidas-txtAncho").on("change keyup", function(){frmFacturacionProductoMedidas.calcular_desperdicio();});
$("#frmFacturacionMedidas-txtPrecioDesperdicio").on("change keyup", function(e){frmFacturacionProductoMedidas.calcular_desperdicio();});
$("#frmFacturacionMedidas-txtLadoMenor").on("change keyup", function(e){frmFacturacionProductoMedidas.calcular_desperdicio();});

$("#frmFacturacionMedidas-chDesperdicio").click(function(e){
    if($("#frmFacturacionMedidas-chDesperdicio").is(":checked")){
        $("#frmFacturacionMedidas-dvDesperdicio").css("display", "block");
    } else {
        $("#frmFacturacionMedidas-dvDesperdicio").css("display", "none");
    }
});

$("#frmFacturacionMedidas-btnAceptar").click(function(e){
    frmFacturacionProductoMedidas.finalizar();
});
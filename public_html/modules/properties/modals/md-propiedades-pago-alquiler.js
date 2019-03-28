var PagoAlquilerItems = [];

function frmPropiedadesPagoAlquiler_agregarDetalle(descripcion, precio, iva, importe){
    $("#frmPropiedadesPagoAlquiler-lstDetalles").append("<tr class='frmPropiedadesPagoAlquiler-detalleItem'>"+
        "<td class='frmPropiedadesPagoAlquiler-detalle'>"+descripcion+"</td>"+
        "<td class='frmPropiedadesPagoAlquiler-precio'>"+precio+"</td>"+
        "<td class='frmPropiedadesPagoAlquiler-iva'>"+iva+"</td>"+
        "<td class='frmPropiedadesPagoAlquiler-importe'>"+importe+"</td>"+
        "<td style='text-align: center;'><button class='gm-btn danger btnBorrarPago'><i class='fa fa-trash'></i></button></td>"+
        "</tr>");
    var sum = 0;
    $(".frmPropiedadesPagoAlquiler-importe").each(function(){
        sum += Number($(this).html());
    });
    $("#frmPropiedadesPagoAlquiler-lblTotal").text(sum);
}

$("#frmPropiedadesPagoAlquiler-btnAgregarDetalle").click(function(){
    frmPropiedadesPagoAlquiler_agregarDetalle($("#frmPropiedadesPagoAlquiler-txtDetalle").val(), 
        $("#frmPropiedadesPagoAlquiler-txtPrecio").val(),
        $("#frmPropiedadesPagoAlquiler-txtIVA").val(),
        $("#frmPropiedadesPagoAlquiler-txtImporte").val()
    );
    $("#frmPropiedadesPagoAlquiler-txtDetalle").val("");
    $("#frmPropiedadesPagoAlquiler-txtPrecio").val("");
    $("#frmPropiedadesPagoAlquiler-txtIVA").val("");
    $("#frmPropiedadesPagoAlquiler-txtImporte").val("");
    $("#frmPropiedadesPagoAlquiler-txtDetalle").focus();
});

$("#frmPropiedadesPagoAlquiler-lstDetalles").on("click", ".btnBorrarPago",function(e){
    var container = $(this).closest(".frmPropiedadesPagoAlquiler-detalleItem");
    container.fadeOut();
});

$("#frmPropiedadesPagoAlquiler-btnAceptar").click(function(){
    PagoAlquilerItems = [];
    $(".frmPropiedadesPagoAlquiler-detalleItem").each(function(){
        var pago = { 
            detalle: $(this).find(".frmPropiedadesPagoAlquiler-detalle").html(), 
            precio: $(this).find(".frmPropiedadesPagoAlquiler-precio").html(), 
            iva: $(this).find(".frmPropiedadesPagoAlquiler-iva").html(), 
            importe: $(this).find(".frmPropiedadesPagoAlquiler-importe").html()
        };
        PagoAlquilerItems.push(pago);
    });

    $.ajax({
        url: 'modules/propiedades/ajax/propiedades_xhr.php',
        type: 'POST',
        data: {
            topic: "pago_alquiler",
            propiedad_id: $("#frmPropiedadesPagoAlquiler-PropiedadId").val(),
            pagos: JSON.stringify(PagoAlquilerItems)
        },
        dataType: 'json',
        success: function(data){
            var error = data.Error;
            if(error.length>0){
                alert(error);
            }
            else{
                if(data.Response.ComprobanteId>0) window.open("/panel/comprobantes/?id="+data.Response.ComprobanteId);
                $.GMWindowManager.close($("#frmPropiedadesPagoAlquiler"));
                cargar_datos();
            }
        }
    });
    return false;
});


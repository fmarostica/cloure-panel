var d = new Date();
var month = new Array();
month[0] = "Enero";
month[1] = "Febrero";
month[2] = "Marzo";
month[3] = "Abril";
month[4] = "Mayo";
month[5] = "Junio";
month[6] = "Julio";
month[7] = "Agosto";
month[8] = "Septiembre";
month[9] = "Octubre";
month[10] = "Noviembre";
month[11] = "Diciembre";
var n = month[d.getMonth()];

function frmPropiedadesPagar_agregarDetalle(descripcion, importe){
    $("#frmPropiedadesPagar-lstDetalles").append("<tr class='frmPropiedadesPagar-detalleItem'><td class='frmPropiedadesPagar-detalle'>"+descripcion+"</td><td class='frmPropiedadesPagar-importe'>"+importe+"</td><td style='text-align: center;'><button class='gm-btn danger btnBorrarPago'><i class='fa fa-trash'></i></button></td></tr>");
    var sum = 0;
    $(".frmPropiedadesPagar-importe").each(function(){
        sum += Number($(this).html());
    });
    $("#frmPropiedadesPagar-lblTotal").text(sum);
}

$("#frmPropiedadesPagar-btnAgregarDetalle").click(function(){
    frmPropiedadesPagar_agregarDetalle($("#frmPropiedadesPagar-txtDetalle").val(), $("#frmPropiedadesPagar-txtImporte").val());
    $("#frmPropiedadesPagar-txtDetalle").val("");
    $("#frmPropiedadesPagar-txtImporte").val("");
    $("#frmPropiedadesPagar-txtDetalle").focus();
});

$("#frmPropiedadesPagar-lstDetalles").on("click", ".btnBorrarPago",function(e){
    var container = $(this).closest(".frmPropiedadesPagar-detalleItem");
    container.fadeOut();
});

$("#frmPropiedadesPagar-btnAceptar").click(function(){
    $(".frmPropiedadesPagar-detalleItem").each(function(){
        var pago = { 
            detalle: $(this).find(".frmPropiedadesPagar-detalle").html(), 
            importe: $(this).find(".frmPropiedadesPagar-importe").html()
        };
        pagos.push(pago);
    });
    frmPropiedadesAgregar_finalizar();
});
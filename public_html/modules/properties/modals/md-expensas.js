frmExpensas_cargarConsorcios();

function frmExpensas_cargarConsorcios()
{
    $.ajax({
        url: 'modules/propiedades/ajax/consorcios-xhr.php',
        type: 'POST',
        dataType: 'json',
        data: {
            topic: "listar", 
            filtro: "", 
            pagina : 1, 
            col: "nombre",
            order: "asc"
        }
    }).done(function(data){
        var registros = data.Response.Registros;
        $("#ucExpensas-txtConsorcio").empty();
        $("#frmConsorcioExpensasAgregar-txtConsorcio").empty();
        if(registros.length>0){
            $("#ucExpensas-txtConsorcio").append("<option value='0'>Todos</option>");
            $("#frmConsorcioExpensasAgregar-txtConsorcio").append("<option value='0'>Consorcio</option>");
            for (var i = 0; i<registros.length; i++){
                $("#ucExpensas-txtConsorcio").append("<option value='"+ registros[i].Id +"'>"+registros[i].Nombre+"</option>");
                $("#frmConsorcioExpensasAgregar-txtConsorcio").append("<option value='"+ registros[i].Id +"'>"+registros[i].Nombre+"</option>");
            }
        }
    });
}

function frmExpensasAgregar_addImpuesto(id, detalles, importe){
    $("#frmConsorcioExpensasAgregar-lstImpuestos").append("<tr class='expensa-item' data-id='"+id+"'>"+
        "<td><input type='text' class='gm-form-control expensa-detalles' value='"+detalles+"' /></td>"+
        "<td><input type='text' class='gm-form-control expensa-importe' value='"+importe+"' /></td>"+
        "<td><button type='button' class='gm-btn danger expensa-borrar'><i class='fa fa-minus-circle'></i></button></td>"+
    "</tr>")
}

$("#frmConsorcioExpensasAgregar-lstImpuestos").on("click", ".expensa-borrar", function(){
    $(this).closest(".expensa-item").remove();
});
$("#frmConsorcioExpensasAgregar-btnAgregarExpensa").click(function(e){
    frmExpensasAgregar_addImpuesto(0,"","");
});
$("#frmConsorcioExpensasAgregar-btnGuardar").click(function(){
    $("#gm-modalwait").modal("show");

    var impuestos = [];
    $(".expensa-item").each(function(){
        var impuesto_tmp = {
            id: $(this).data("id"),
            nombre: $(this).find(".expensa-detalles").val(),
            importe: $(this).find(".expensa-importe").val(),
            archivo: "",
            vencimiento: ""
        }
        impuestos.push(impuesto_tmp);
    });

    $.ajax({
        url: '/panel/modules/propiedades/ajax/liquidaciones-xhr.php',
        type: 'POST',
        data: {
            topic: "guardar",
            consorcio_id: $("#frmConsorcioExpensasAgregar-txtConsorcio").val(),
            periodo: $("#frmConsorcioExpensasAgregar-txtMes").val() + "-" + $("#frmConsorcioExpensasAgregar-txtAño").val(),
            impuestos: JSON.stringify(impuestos)
        },
        dataType: 'json',
        success: function(data){
            $('#gm-modalwait').modal("hide");
            var error = data.Error;
            if(error.length>0){
                alert(error);
            }
            else{
                $("#frmConsorcioExpensasAgregar").modal("hide");
                cargar_datos();
                if(data.Response.LiquidacionId>0) window.open("/panel/pdf/expensas.php?liquidacion_id="+data.Response.LiquidacionId);
            }
        }
    });
});

function progressHandlingFunction(e)
{
    if(e.lengthComputable)
    {
        var max = e.total;
        var current = e.loaded;
        var Percentage = (current * 100)/max;

        $('.progress-bar-wait').width(Percentage+"%");
        $('.percent').html(Percentage.toFixed(2)+"%");
        if(Percentage >= 100){
            // process completed
        }
    }
}

$("#frmConsorcioExpensasAgregar-txtConsorcio").change(function(e){
    $.ajax({
        url: 'modules/propiedades/ajax/impuestos-xhr.php',
        data: 
        { 
            topic: "listar", 
            consorcio_id: $(this).val()
        },
        type: 'POST',
        dataType: 'json',
        success: function(data)
        {
            var registros = data.Response.Registros;

            $("#frmConsorcioExpensasAgregar-lstImpuestos").empty();
            if(data.Error==""){
                if(registros.length>0){
                    for (var i = 0; i<registros.length; i++) {
                        frmExpensasAgregar_addImpuesto(registros[i].Id, registros[i].Nombre, registros[i].Importe);
                    }

                    $(".btnBorrar").click(function(e){
                        borrar($(this).closest(".gm-itembox").data("id"));
                        e.stopPropagation();
                    });

                    $(".gm-itembox").click(function(e){
                        editar($(this).data("id"));
                    });
                }
            }
        }
    });
});

$("#frmExpensasAgregar-btnCambiarImagen").click(function(){
    $("#frmExpensasAgregar-btnFile").click();
});

function previewImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#frmExpensasAgregar-img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#frmExpensasAgregar-btnFile").change(function() {
    previewImage(this);
});

$("#frmExpensasAgregar-btnBorrarImagen").click(function() {
    $('#frmExpensasAgregar-img').attr('src', "/panel/images/no-photo.jpg");
});
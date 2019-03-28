$("#frmUsuarioSeleccionar-txtBuscar").on("keyup change", function(e){
    frmUsuariosSeleccionar_cargar_usuarios();
});

$("#frmUsuarioSeleccionar-btnAgregarUsuario").click(function(){
    $("#frmUsuariosAgregar").modal("show");
    $("#frmUsuariosAgregar_txtApellido").focus();
});

function frmUsuariosSeleccionar_cargar_usuarios(){
    $.ajax({
        url: 'modules/usuarios/ajax/xhr_usuarios.php',
        data: 
        { 
            topic: "listar", 
            filtro: $("#frmUsuarioSeleccionar-txtBuscar").val(), 
            pagina : pagina,
            col: $("#col").val(), 
            order: $("#order").val()
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

            $("#frmUsuarioSeleccionar-lstUsuarios").empty();
            if(data.Error==""){
                if(registros.length>0){
                    for (var i = 0; i<registros.length; i++) {
                        var commands = registros[i].AvailableCommands;
                        $("#frmUsuarioSeleccionar-lstUsuarios").append(
                            "<div class='gm-itembox editable' data-id='"+registros[i].Id+"' data-razon-social='"+registros[i].RazonSocial+"' data-telefono='"+registros[i].Telefono+"'>"+
                                "<div class='row clearfix'>"+
                                    "<div class='col-md-10'>"+
                                        "<div class='gm-itembox-imgcontainer' style='width: 60px; height: 60px'>"+
                                            "<img src='/panel/images/user-icon.png' />"+
                                        "</div>"+
                                        "<div style='display: inline-block'>"+
                                            "<span class='gm-itembox-title'>"+registros[i].RazonSocial + ((registros[i].PaisId!=null && registros[i].PaisId!=0) ? " <img src='/panel/images/paises/"+registros[i].BanderaPais+"' style='display: inline-block; height: 20px; padding: 0px; margin-left: 6px; object-fit: contain;' /> " :"")+"</span><br />"+
                                            ((registros[i].Grupo!=null && registros[i].Grupo!="") ? "<span class='gm-itembox-additional-info'><i class='fa fa-circle'></i> "+registros[i].Grupo+"</span> " : "")+
                                            "<div class=''>"+
                                                ((registros[i].Telefono.length>0) ? "<span class='gm-itembox-additional-info'><i class='fa fa-mobile'></i> "+registros[i].TelefonoNum+(registros[i].TelefonoEmpresa!="" ? " ("+registros[i].TelefonoEmpresa+")" : "")+ "</span> " : "")+
                                                ((registros[i].Mail!="") ? "<span class='gm-itembox-additional-info'><i class='fa fa-envelope'></i> "+registros[i].Mail+"</span> " : "")+
                                            "</div>"+
                                            "<div>"+
                                                "<span class='gm-itembox-additional-info'>"+
                                                    ((registros[i].Direccion!="") ? "<i class='fa fa-map-marker'></i> "+registros[i].Direccion+((registros[i].CP!="") ? " CP: "+registros[i].CP : "") + ((registros[i].Localidad!="") ? " - "+registros[i].Localidad : "")+((registros[i].PaisN1!=null && registros[i].PaisN1!="") ? " ("+registros[i].PaisN1+")" : "") : "")+
                                                "</span>"+
                                             "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"
                        );
                        for (var j = 0; j < commands.length; j++) {
                            if(registros[i].AvailableCommands[j]=="borrar") $("#cmdbox-"+registros[i].Id).append("<button class='gm-btn danger' onclick='borrar("+registros[i].Id+")'><i class='fa fa-trash'></i></button>");
                        }
                    }
                } else {
                    $("#frmUsuarioSeleccionar-lstUsuarios").append("<div class='gm-empty-content'>No se encontraron registros<br />"+
                    "<span class='gm-small'>Intenta con otros criterios de búsqueda</span>"+
                    "</div>");
                    $("#frmUsuarioSeleccionar-lstUsuarios").addClass("empty");
                }
            }
            else{
                $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
            }
        }
    });
}

$("#frmUsuarioSeleccionar-lstUsuarios").on("click", ".gm-itembox", function(){
    if($("#frmUsuarioSeleccionar-Origen").val()=="agente"){
        $("#frmPropiedadesAgregar-AgenteId").val($(this).data("id"));
        $("#frmPropiedadesAgregar-btnAgente").html($(this).data("id") + " - " + $(this).data("razon-social"));
    }
    if($("#frmUsuarioSeleccionar-Origen").val()=="propietario"){
        $("#frmPropiedadesAgregar-PropietarioId").val($(this).data("id"));
        $("#frmPropiedadesAgregar-btnPropietario").html($(this).data("id") + " - " + $(this).data("razon-social"));
    }
    if($("#frmUsuarioSeleccionar-Origen").val()=="locatario"){
        $("#frmPropiedadesAgregar-LocatarioId").val($(this).data("id"));
        $("#frmPropiedadesAgregar-btnLocatario").html($(this).data("id") + " - " + $(this).data("razon-social"));
    }
    if($("#frmUsuarioSeleccionar-Origen").val()=="comprador"){
        $("#frmPropiedadesAgregar-CompradorId").val($(this).data("id"));
        $("#frmPropiedadesAgregar-btnComprador").html($(this).data("id") + " - " + $(this).data("razon-social"));
    }
    if($("#frmUsuarioSeleccionar-Origen").val()=="vendedor"){
        $("#frmPropiedadesAgregar-VendedorId").val($(this).data("id"));
        $("#frmPropiedadesAgregar-btnVendedor").html($(this).data("id") + " - " + $(this).data("razon-social"));
    }
    if($("#frmUsuarioSeleccionar-Origen").val()=="garante"){
        $("#frmPropiedadesAgregar-lstGarantes").append('<div class="gm-col-4 garanteBox" style="background-color: #ccdfff; border: 1px solid #bbcce8; padding: 3px; margin-top: 5px;">'+
            '<div style="position: relative;">'+$(this).data("razon-social")+'<span class="fa fa-times-circle delGarante" style="display: block; position: absolute; right: 0px; top: 0px; color: red; font-size: 20px"></span></div>'+
            '<div><i class="fab fa-whatsapp fa-fw"></i>'+$(this).data("telefono")+'</div>'+
        '</div>');
    }
    $("#frmUsuarioSeleccionar").modal("hide");
});
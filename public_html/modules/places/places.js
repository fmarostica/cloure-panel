var ucLugares = {
    pagina: 1,
    totalPaginas: 1,
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;
        $(".gm-uc-sidebar").css("top", $(".gm-uc-page-header").outerHeight()+$(".gm-header").outerHeight()+"px");
        $(".gm-uc-page-body").height($("#output").height()-$(".gm-uc-page-header").outerHeight()-$(".gm-uc-page-footer").outerHeight());

        $("#ucLugares-btnAgregar").click(function(e){
            frmLugares.open(0, function(){
                $this.cargar_datos();
            })
        });

        $("#ucLugares-lstLugares").on("click", ".gm-itembox", function(e){
            id = $(this).data("id");
            frmLugares.open(id, function(){
                $this.cargar_datos();
            });
        });

        $("#ucLugares-lstLugares").on("click", ".btnBorrar", function(e){
            id = $(this).closest(".gm-itembox").data("id");
            $this.borrar(id);
            e.stopPropagation();
        });

        $(".gm-filter").on("change keyup", function(e){
            cargar_datos();
        });

        $(".btnFilter").click(function(e){
            $(".gm-uc-sidebar").toggleClass("open");
            $(".gm-uc-sidebar").css("top", $(".gm-uc-page-header").outerHeight()+$(".gm-header").outerHeight()+"px");
        });

        $this.cargar_datos();
    },
    borrar: function(id){
        var $this = this;
        swal({
            title: "Seguro que deseas eliminar este registro?",
            text: "El registro se borrará de forma permanente!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            showLoaderOnConfirm: true,
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "places",
                    topic: "borrar", 
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Registro borrado!", "El lugar ha sido borrado borrado.", "success");
                        $this.cargar_datos();
                    }
                    else{
                        swal("Error al borrar!", error, "error");
                    }
                }
            });
        });
    },
    cargar_datos: function(){
        var $this = this;

        $("#btnSiguiente").attr("disabled", false);
        $("#btnUltimo").attr("disabled", false);
        $("#btnPrimero").attr("disabled", false);
        $("#btnAnterior").attr("disabled", false);

        $.ajax({
            url: $this.ajax_url,
            data: 
            { 
                module: "places",
                topic: "listar", 
                filtro: $("#txtBuscar").val(), 
                pagina : $this.pagina,
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

                $(".gm-itembox-container").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            var commands = registros[i].AvailableCommands;
                            var Imagen = "/images/no-photo.jpg";
                            if(registros[i].Imagen!=""){
                                Imagen = "/images/lugares/" + registros[i].Id + "/" + registros[i].Imagen;
                            }
                            $(".gm-itembox-container").append(
                                "<div class='gm-itembox editable' data-id='"+registros[i].Id+"'>"+
                                    "<div class='gm-row'>"+
                                        "<div class='col-md-12'>"+
                                            //"<div class='gm-itembox-imgcontainer'>"+
                                            //    "<img src='"+Imagen+"' style='object-fit: cover;' />"+
                                            //"</div>"+
                                            "<div style='display: inline-block'>"+
                                                "<span class='gm-itembox-title'>"+registros[i].Nombre +"</span>"+
                                            "</div>"+
                                        "</div>"+
                                        "<div class='col-md-12 col-xs-12 gm-itembox-buttons'>"+
                                            "<div id='cmdbox-"+registros[i].Id+"' class='command_buttons' style='margin-top: 10px'>"+
                                                
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                            for (var j = 0; j < commands.length; j++) {
                                if(registros[i].AvailableCommands[j]=="borrar") $("#cmdbox-"+registros[i].Id).append("<button class='gm-btn danger btnBorrar'><i class='fa fa-trash'></i></button>");
                            }
                        }
                    } else {
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron registros<br />"+
                        "</div>");
                        $(".gm-itembox-container").addClass("empty");
                    }
                }
                else{
                    $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
                }
                $("#output-loader").css("display", "none");
            }
        });
    }
}

ucLugares.initialize();
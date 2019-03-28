var ucAcademyActivities = {
    pagina: 1,
    totalPaginas: 1,
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this; 
        $("#btnAgregar").click(function(e){
            frmAcademyActivity.open(0, function(){
                $this.cargar_datos();
            });
        });

        $(".gm-filter").on("change keyup", function(e){
            cargar_datos();
        });

        $("#ucArtistas-lstArtistas").on("click", ".gm-itembox", function(e){
            var id = $(this).data("id");
            frmAcademyActivity.open(id, function(){
                $this.cargar_datos();
            });
            e.stopPropagation();
        });

        $(".gm-itembox-container").on("click", ".btnBorrar", function(e){
            var parent = $(this).closest(".gm-itembox");
            var id = parent.data("id");
            $this.borrar(id);
            e.stopPropagation();
        });

        $this.cargar_datos();
    },
    borrar: function(id)
    {
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
                    module: "academy_activities",
                    topic: "borrar", 
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Registro borrado!", "La banda/artista ha sido borrado.", "success");
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
                module: "academy_activities", 
                topic: "listar", 
                filtro: $("#txtBuscar").val(), 
                pagina : $this.pagina,
                grupo_id: $("#txtGrupo").val(),
                pais_id: $("#txtPais").val(),
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
                            var horarios = registros[i].Horarios;

                            var horarios_str = "";

                            for (let j = 0; j < horarios.length; j++) {
                                horarios_str+="<div>"+horarios[j].dia+" de "+horarios[j].desde+" a "+horarios[j].hasta+"</div>";
                            }

                            $(".gm-itembox-container").append(
                                "<div class='gm-itembox editable' data-id='"+registros[i].Id+"'>"+
                                    "<div class='gm-itembox-title' style='text-align: center;'>"+registros[i].Nombre+"</div>"+
                                    "<div class='gm-itembox-imgcontainer' style='border: 1px solid #ccc; background-color: #fff; display: inline-block'>"+
                                        "<img src='"+registros[i].ImagenURL+"' style='width: 100%;' />"+
                                    "</div>"+
                                    "<div style='display: inline-block'>"+
                                        "<div class=''>"+
                                            horarios_str+
                                        "</div>"+
                                    "</div>"+
                                    "<div class='gm-itembox-buttons' style='margin-top: 10px'>"+
                                        "<button type='button' class='gm-btn danger btnBorrar'><span class='fa fa-trash'></span></button>"+
                                    "</div>"+
                                "</div>"
                            );
                            for (var j = 0; j < commands.length; j++) {
                                if(registros[i].AvailableCommands[j]=="borrar") $("#cmdbox-"+registros[i].Id).append("<button class='gm-btn danger btnBorrar'><i class='fa fa-trash'></i></button>");
                            }
                        }
                        $("#gm-uc-page-footer-registers").html(registros.length);
                        $("#gm-uc-page-footer-total-registers").html(data.Response.TotalRegistros);
                        $("#gm-uc-page-footer-pages").html(data.Response.TotalPaginas);
                        $("#gm-uc-page-footer-page").html($this.pagina);
                    } else {
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron registros<br />"+
                        "<span class='gm-small'>Intenta con otros criterios de búsqueda</span>"+
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

ucAcademyActivities.initialize();
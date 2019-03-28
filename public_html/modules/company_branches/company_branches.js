var ucInmuebles = {
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;

        $("#ucInmuebles-btnAgregar").click(function(){
            frmInmueble.open(0, function(){
                $this.cargar_datos();
            });
        });

        $("#ucInmuebles-lstRegistros").on("click", ".gm-itembox", function(e){
            frmInmueble.open($(this).data("id"), function(){
                $this.cargar_datos();
            });
        });

        $("#ucInmuebles-lstRegistros").on("click", ".btn-delete", function(e){
            var id = $(this).closest(".gm-itembox").data("id");
            $this.borrar(id);
            e.stopPropagation();
        });

        $this.cargar_datos();
    },
    cargar_datos: function(pagina=1){
        var $this = this;
        $("#btnSiguiente").attr("disabled", false);
        $("#btnUltimo").attr("disabled", false);
        $("#btnPrimero").attr("disabled", false);
        $("#btnAnterior").attr("disabled", false);

        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "company_branches",
                topic: "listar", 
                filtro: $("#txtBuscar").val(), 
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

                $("#ucInmuebles-lstRegistros").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            var commands = registros[i].AvailableCommands;
                            $("#ucInmuebles-lstRegistros").append(
                                "<div class='gm-itembox' data-id='"+registros[i].Id+"'>"+
                                    "<div class='gm-itembox-title'>"+
                                        registros[i].Nombre+
                                    "</div>"+
                                    "<div class='gm-itembox-additional-info'>"+
                                        ((registros[i].Direccion!=null && registros[i].Direccion!="") ? "<span class='mensaje-estado'><i class='fa fa-home'></i> "+registros[i].Direccion+"</span>" : "") +
                                        ((registros[i].Direccion!=null && registros[i].Direccion!="") ? " <span class='mensaje-estado'><i class='fa fa-phone'></i> "+registros[i].Telefono+"</span>" : "")+
                                    "</div>"+
                                    "<div>"+
                                        "<div id='cmdbox-"+registros[i].Id+"' class='command_buttons' style='margin-top: 10px; text-align: right;'>"+
                                            
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                            for (var j = 0; j < commands.length; j++) {
                                if(registros[i].AvailableCommands[j]=="delete") $("#cmdbox-"+registros[i].Id).append("<button class='gm-btn danger btn-delete'><i class='fa fa-trash'></i></button>");
                            }
                        }

                        
        
                        //Paginador
                        $(".gm-pager").empty();
                        if(pagina>1) $(".gm-pager").append("<button id='btnAnterior'>Anterior</button>");
                        for (var i=1; i<=totalPaginas;i++)
                        {
                            if(pagina==i)
                                $(".gm-pager").append("<button disabled>"+i+"</button>");
                            else
                                $(".gm-pager").append("<button class='paginate_button' data-pagina='"+i+"'>"+i+"</button>");
                        }
                        if(pagina<totalPaginas) $(".gm-pager").append("<button id='btnSiguiente'>Siguiente</button>");
                        
                        $("#btnAnterior").click(function(){
                            pagina-=1;
                            cargar_datos(pagina);
                            window.scrollTo(0, 0);
                            return false;
                        });
        
                        $("#btnSiguiente").click(function(){
                            pagina+=1;
                            cargar_datos(pagina);
                            window.scrollTo(0, 0);
                            return false;
                        });
        
                        $(".paginate_button").click(function(e){
                            var pagina = $(this).data("pagina");
                            cargar_datos(pagina);
                            window.scrollTo(0, 0);
                            return false;
                        });
                    } else {
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron sucursales ni depositos. <br />"+
                        "<span class='gm-small'>Debes tener alguno para poder facturar!</span>"+
                        "</div>");
                        $(".gm-itembox-container").addClass("empty");
                    }
                }
                else{

                }
                $("#output-loader").css("display", "none");
            }
        });
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
                    module: "company_branches",
                    topic: "borrar", 
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Registro borrado!", "La sucursal ha sido borrada.", "success");
                        $this.cargar_datos();
                    }
                    else{
                        swal("Error al borrar!", error, "error");
                    }
                }
            });
        });
    }
}

ucInmuebles.initialize();
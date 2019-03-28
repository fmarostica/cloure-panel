var ucUsuariosGrupos = {
    pagina:1,
    totalPaginas: 1,
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;
        $("#txtBuscar").keyup(function(){
            cargar_datos();
        });

        $("#btnAgregar").click(function()
        {
            CloureManager.navigate("users_groups", "add");
        });

        $("#ucGrupos-lstGrupos").on("click", ".gm-itembox", function(){
            CloureManager.navigate("users_groups", "edit", $(this).data("id"));
        });

        $this.cargar_datos();
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
                module: "users_groups",
                topic: "get_list", 
                filtro: $("#txtBuscar").val(), 
                pagina : $this.pagina, 
                col: $("#col").val(), 
                order: $("#order").val() 
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                if(data.Error==""){
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
                                var title = registros[i].Nombre;
                                var buttons = "";
                                var editable = "";
                                
                                /*
                                for (var j = 0; j < commands.length; j++) {
                                    var cmd = registros[i].AvailableCommands[j];
                                    if(cmd=="borrar") buttons += "<button class='gm-btn danger btnBorrar'><span class='fa fa-trash'></span></button>";
                                    if(cmd=="editar"){
                                        title = registros[i].Nombre;
                                        editable = "editable";
                                    }
                                }
                                */

                                $(".gm-itembox-container").append(
                                    "<div class='gm-itembox "+editable+"' data-id='"+registros[i].id+"'>"+
                                        "<span class='gm-itembox-title' >"+registros[i].nombre+"</span>"+
                                        "<div class='gm-itembox-buttons'>"+
                                            buttons+
                                        "</div>"+
                                    "</div>"
                                );
                            }

                            $(".btnBorrar").click(function(e){
                                $this.borrar($(this).closest(".gm-itembox").data("id"));
                                e.stopPropagation();
                            });
                            
            
                            $(".pagination").empty();
                            if($this.pagina==1)
                                $(".pagination").append("<li id='btnAnterior' class='paginate_button previous disabled'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Anterior</a></li>");
                            else
                                $(".pagination").append("<li id='btnAnterior' class='paginate_button previous'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Anterior</a></li>");
                            
                            for (var i=1; i<=totalPaginas;i++)
                            {
                                if($this.pagina==i)
                                    $(".pagination").append("<li class='paginate_button active'><a tabindex='0' data-dt-idx='2' aria-controls='DataTables_Table_1' href='#'>"+i+"</a></li>");
                                else
                                    $(".pagination").append("<li class='paginate_button'><a tabindex='0' data-dt-idx='2' aria-controls='DataTables_Table_1' href='#'>"+i+"</a></li>");
                            }
            
                            if($this.pagina==$this.totalPaginas)
                                $(".pagination").append("<li id='btnSiguiente' class='paginate_button next disabled'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Siguiente</a></li>");
                            else
                                $(".pagination").append("<li id='btnSiguiente' class='paginate_button next'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Siguiente</a></li>");
                            
                            $("#btnPrimero").click(function(){
                                pagina=1;
                                cargar_datos();
                            });
            
                            $("#btnAnterior").click(function(){
                                pagina-=1;
                                cargar_datos();
                            });
            
                            $("#btnSiguiente").click(function(){
                                pagina+=1;
                                cargar_datos();
                            });
            
                            $("#btnUltimo").click(function(){
                                pagina=totalPaginas;
                                cargar_datos();
                            });
                        } else {
                            $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron registros</div>");
                            $(".gm-itembox-container").addClass("empty");
                        }
                        
                    }
                    else{
        
                    }
                    $("#output-loader").css("display", "none");
                } else {
                    $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
                }
            }
        });
    },
    borrar: function(id){
        var $this = this;
        swal({
            title: "Seguro que deseas eliminar el grupo "+id+"?",
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
                    module: "users_groups",
                    topic: "borrar", 
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Registro borrado!", "El grupo ha sido borrado.", "success");
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

ucUsuariosGrupos.initialize();
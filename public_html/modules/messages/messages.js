var ucMensajes = {
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;

        $(".gm-filter").on("change keyup", function(e){
            $this.cargar_datos();
        });
        $("#ucMensajes-lstMensajes").on("click", ".gm-itembox", function(){
            var id=$(this).data("id");
            frmMensaje.open(id, function(){
                $this.cargar_datos();
            });
        });
        $("#ucMensajes-lstMensajes").on("click", ".btnBorrar", function(e){
            $this.borrar($(this).closest(".gm-itembox").data("id"));
            e.stopPropagation();
        });

        $("#ucMensajes-btnTarea").click(function(){
            frmTarea.open(0, function(){
                
            });
        });

        $("#ucMensajes-btnCrearMensaje").click(function(){
            frmMensaje.open(0, function(){
                
            });
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
                url: 'modules/mensajes/ajax/mensajes_xhr.php',
                data: {
                    topic: "borrar", 
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Registro borrado!", "El mensaje ha sido borrado.", "success");
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
                module: "messages",
                topic: "listar", 
                filtro: $("#txtBuscar").val(), 
                pagina : pagina, 
                col: $("#col").val(), 
                order: $("#order").val(),
                estado: $("#ucMensajes-txtEstado").val(),
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

                $("#ucMensajes-lstMensajes").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            var commands = registros[i].AvailableCommands;
                            var color = "#777";
                            if(registros[i].Estado.toLowerCase()=="abierto") color = "#12960c";
                            else if(registros[i].Estado.toLowerCase()=="cerrado") color = "#ce0808";
                            $("#ucMensajes-lstMensajes").append(
                                "<div class='gm-itembox gm-editable' data-id='"+registros[i].Id+"'>"+
                                    "<div class=''>"+
                                        "<span class='gm-itembox-title'>"+registros[i].Asunto+"</span>"+
                                        "<br><span class='mensaje-estado' style='color: "+color+"'><i class='fa fa-circle'></i> "+registros[i].Estado+"</span>"+
                                        " <span class='mensaje-estado'><i class='far fa-clock'></i> "+registros[i].FechaStr+"</span>"+
                                        (registros[i].Usuario!=null ? " <span class='mensaje-estado'><i class='fa fa-user'></i> "+registros[i].Usuario.Apellido+", "+registros[i].Usuario.Nombre+"</span>" : "")+
                                    "</div>"+
                                    "<div class='gm-itembox-buttons'>"+
                                        "<div id='cmdbox-"+registros[i].Id+"' class='command_buttons' style='margin-top: 10px'>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                            for (var j = 0; j < commands.length; j++) {
                                if(registros[i].AvailableCommands[j]=="borrar") $("#cmdbox-"+registros[i].Id).append("<button class='gm-btn danger btnBorrar'><i class='fa fa-trash fa-fw'></i></button>");
                            }
                        }
                        $(".dataTables_info").text(function () {
                            return $(this).text().replace("{REG_INIT}", inicio).replace("{REGS_END}", fin).replace("{REGS_TOTAL}", total_registros); 
                        });

                        $(".pagination").empty();
                        if(pagina==1)
                            $(".pagination").append("<li id='btnAnterior' class='paginate_button previous disabled'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Anterior</a></li>");
                        else
                            $(".pagination").append("<li id='btnAnterior' class='paginate_button previous'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Anterior</a></li>");
                        
                        for (var i=1; i<=totalPaginas;i++)
                        {
                            if(pagina==i)
                                $(".pagination").append("<li class='paginate_button active'><a tabindex='0' data-dt-idx='2' aria-controls='DataTables_Table_1' href='#'>"+i+"</a></li>");
                            else
                                $(".pagination").append("<li class='paginate_button'><a tabindex='0' data-dt-idx='2' aria-controls='DataTables_Table_1' href='#'>"+i+"</a></li>");
                        }

                        if(pagina==totalPaginas)
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
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No tienes mensajes</div>");
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

ucMensajes.initialize();

var pagina=1;
var totalPaginas=1;
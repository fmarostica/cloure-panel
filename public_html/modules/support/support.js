var ucTransportes = {
    pagina:1,
    totalPaginas:1,
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;
        $("#btnAgregar").click(function(){
            CloureManager.navigate("support", "add");
        });
        $("#ucTransportes-lstTransportes").on("click", ".gm-itembox", function(e){
            var id = $(this).data("id");
            CloureManager.navigate("support", "edit", id);
            e.stopPropagation();
        });

        $(".gm-itembox-container").on("click", ".btnBorrar", function(e){
            $this.borrar($(this).closest(".gm-itembox").data("id"));
            e.stopPropagation();
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
                module: "support",
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
                var registros = data.Response.Registros;
                var inicio = data.Response.Inicio;
                var fin = data.Response.Fin;
                var total_registros = data.Response.TotalRegistros;
                var totalPaginas = data.Response.TotalPaginas;

                $(".gm-itembox-container").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            $(".gm-itembox-container").append(
                                "<div class='gm-itembox editable' data-id='"+registros[i].Id+"'>"+
                                        "<div class='gm-itembox-title'>"+
                                            registros[i].subject+
                                        "</div>"+
                                        /*
                                        "<div class='gm-itembox-buttons'>"+
                                            "<button class='btn btn-danger btn-sm btnBorrar'>"+
                                                "<svg viewBox='0 0 24 24'>"+
                                                    "<path d='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z' />"+
                                                "</svg>"+
                                            "</button>"+
                                        "</div>"+
                                        */
                                    "</div>"+
                                "</div>"
                            );
                        }
        
                        $(".dataTables_info").text(function () {
                            return $(this).text().replace("{REG_INIT}", inicio).replace("{REGS_END}", fin).replace("{REGS_TOTAL}", total_registros); 
                        });
        
                        $(".pagination").empty();
                        if($this.pagina==1)
                            $(".pagination").append("<li id='btnAnterior' class='paginate_button previous disabled'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Anterior</a></li>");
                        else
                            $(".pagination").append("<li id='btnAnterior' class='paginate_button previous'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Anterior</a></li>");
                        
                        for (var i=1; i<=$this.totalPaginas;i++)
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
                        $(".gm-uc-page-body").addClass("empty");
                        $(".gm-empty-content").addClass("visible");
                    }
                }
                else{
                    $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
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
                    topic: "borrar", 
                    module: "support",
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Registro borrado!", "El transporte ha sido borrado.", "success");
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

ucTransportes.initialize();
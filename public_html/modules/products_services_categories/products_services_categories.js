var ucCategorias = {
    ajax_url: "/ajax/xhr.php",
    element: $("#mod_products_services_categories"),
    initialize: function(){
        var $this = this;
        $("#ucCategorias-btnAgregar").click(function(e){
            var category_type = $this.element.find(".txt-category-type").val();
            if(category_type==1){
                frmCategoriaN1.open(0, function(){
                    $this.cargar_datos();
                });
                e.stopPropagation();
            }
            if(category_type==2){
                frmCategoriaN2.open(0, function(){
                    $this.cargar_datos();
                });
                e.stopPropagation();
            }
        });

        $("#ucCategorias-lstRegistros").on("click", ".btnBorrar", function(e){
            $this.borrar($(this).closest(".gm-itembox").data("id"));
            e.stopPropagation();
        });

        $("#ucCategorias-lstRegistros").on("click", ".gm-itembox", function(e){
            var category_type = $this.element.find(".txt-category-type").val();
            var category_id = $(this).data("id");

            if(category_type==1){
                frmCategoriaN1.open(category_id, function(){
                    $this.cargar_datos();
                });
                e.stopPropagation();
            }
            if(category_type==2){
                frmCategoriaN2.open(category_id, function(){
                    $this.cargar_datos();
                });
                e.stopPropagation();
            }
        });

        $this.element.find(".txt-category-type").change(function(){
            $this.cargar_datos();
        });

        $this.cargar_datos();
    },
    cargar_datos: function(pagina=1){
        var $this = this;
        $("#btnSiguiente").attr("disabled", false);
        $("#btnUltimo").attr("disabled", false);
        $("#btnPrimero").attr("disabled", false);
        $("#btnAnterior").attr("disabled", false);

        var category_type = $this.element.find(".txt-category-type").val();

        $.ajax({
            url: $this.ajax_url,
            data: 
            { 
                module: "products_services_categories",
                topic: "listar_categorias_n"+category_type,
                filtro: $("#txtBuscar").val(), 
                pagina : pagina, 
                col: $("#col").val(), 
                order: $("#order").val(),
                categoria_n1_id: $("#ucCategorias-txtCategoriaN1").val(),
                categoria_n2_id: $("#ucCategorias-txtCategoriaN2").val(),
                categoria_n3_id: $("#ucCategorias-txtCategoriaN3").val(),
                categoria_n4_id: $("#ucCategorias-txtCategoriaN4").val()
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

                $("#ucCategorias-lstRegistros").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            $("#ucCategorias-lstRegistros").append(
                                "<div class='gm-itembox editable' data-id='"+registros[i].Id+"'>"+
                                    "<div>"+
                                        "<div class='gm-itembox-imgcontainer'>"+
                                            "<img src='"+registros[i].Imagen+"' />"+
                                        "</div>"+
                                        "<div class='categoriasbox-details' style='display: inline-block'>"+
                                            "<span class='gm-itembox-title'>"+registros[i].Nombre+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                    "<div class='gm-itembox-buttons'>"+
                                        "<button class='gm-btn danger btnBorrar'><i class='fa fa-trash'></i></button>"+
                                    "</div>"+
                                "</div>"
                            );
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
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No tienes categorias cargadas."+
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
                    module: "products_services_categories",
                    topic: "borrar", 
                    tipo: "categoria_n1",
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Registro borrado!", "La categoria ha sido borrada.", "success");
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

ucCategorias.initialize();

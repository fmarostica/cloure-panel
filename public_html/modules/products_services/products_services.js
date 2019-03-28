var ucProductos = {
    pagina: 1,
    ajax_url: "/ajax/xhr.php",
    totalPaginas: 1,
    element: $("#mod_products_services"),
    initialize: function(){
        var $this = this;

        $("#ucProductos-btnAgregar").click(function(){
            CloureManager.navigate("products_services", "add");
        });
        $("#ucProductos-lstProductos").on("click", ".gm-itembox", function(e){
            frmProductos.open($(this).data("id"), function(){
                $this.cargar_datos($this.pagina);
            });
        });
        $("#ucProductos-lstProductos").on("click", ".btnBorrar", function(e){
            $this.borrar($(this).closest(".gm-itembox").data("id"));
            e.stopPropagation();
        });

        $("#ucProductos-btnFijarPrecios").click(function(){
            frmProductosPrecios.open(function(){
                $this.cargar_datos();
            });
        });

        $("#ucProductos-btnFijarPromociones").click(function(){
            frmProductosPromociones.open(function(){
                $this.cargar_datos();
            });
        });

        $(".gm-filter").on("change keyup", function(e){
            $this.cargar_datos();
        });

        $(".btnSiguiente").click(function(){
            $this.cargar_datos($this.pagina+1);
        });
        $(".btnAnterior").click(function(){
            $this.cargar_datos($this.pagina-1);
        });

        $this.cargar_categorias();
        //$this.cargar_marcas();
        $this.cargar_datos();
    },
    cargar_datos: function(pagina=1){
        var $this = this;
        $this.pagina = pagina;

        $("#btnSiguiente").attr("disabled", false);
        $("#btnUltimo").attr("disabled", false);
        $("#btnPrimero").attr("disabled", false);
        $("#btnAnterior").attr("disabled", false);

        $("#ucProductos-PagerInfo").html("(Página {page} de {total_pages})");

        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "products_services",
                topic: "listar", 
                filtro: $("#ucProductos-txtBuscar").val(), 
                pagina : pagina,
                ordenar_por: $("#ucProductos-txtOrdenarPor").val(),
                orden: $("#ucProductos-txtOrden").val(),
                categoria_n1_id: $("#txtCategoriaN1").val(),
                tipo_producto_id: $("#ucProductos-txtTipoProducto").val(),
                marca_id: $("#txtMarca").val(),
                publicados: $("#txtPublicados").val()
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $this.totalPaginas = data.Response.TotalPaginas;

                $(".gm-itembox-container").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            var color = "#777";
                            if(registros[i].Publicar==true) color = "#12960c";
                            else color = "#c61111";
        
                            var priceBox = "<span style='color: #12960c; font-size: 24px'>$ "+registros[i].venta_importe+"</span>";
        
                            $(".gm-itembox-container").append(
                                "<div class='gm-itembox editable row' data-id='"+registros[i].Id+"'>"+
                                    "<div class='col-md-3'>"+
                                        "<div class='gm-itembox-imgcontainer'>"+
                                            "<img src='"+registros[i].ImagenPath+"' />"+
                                        "</div>"+
                                    "</div>"+
                                    "<div class='col-md-9'>"+
                                        "<h2 class='title'>"+registros[i].titulo+"</h2>"+
                                        (registros[i].Destacado ? " <span class='gm-itembox-additional-info' style='color: #d8aa13'><i class='fa fa-star'></i> Producto Destacado!</span>" : "")+
                                        "<div>"+
                                            (registros[i].CategoriaN1Id>0 ? "<span class='gm-itembox-additional-info'><i class='fa fa-square'></i> "+registros[i].CategoriaN1+"</span>" : "") +
                                            (registros[i].CategoriaN2Id>0 ? "<span class='gm-itembox-additional-info'> > "+registros[i].CategoriaN2+"</span>" : "") +
                                            (registros[i].CategoriaN3Id>0 ? "<span class='gm-itembox-additional-info'> > "+registros[i].CategoriaN3+"</span>" : "") +
                                            (registros[i].CategoriaN4Id>0 ? "<span class='gm-itembox-additional-info'> > "+registros[i].CategoriaN4+"</span>" : "") +
                                        "</div>"+
                                        "<div class=''>"+
                                            priceBox+
                                        "</div>"+
                                        "<div>"+
                                            (registros[i].Publicar==0 ? "<span class='gm-itembox-additional-info' style='color: #f00'>No publicado</span>" : "") +
                                        "</div>"+
                                        "<div class='gm-itembox-buttons' style='margin-top: 10px'>"+
                                            "<button type='button' class='gm-btn danger btnBorrar'><span class='fa fa-trash'></span></button>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                        }                        
        
                        $(".btn-facebook").click(function(){
                            FB.ui({
                                method: 'share',
                                href: 'https://developers.facebook.com/docs/',
                            }, function(response){});
                        });
        
                        //Paginador
                        if($this.pagina>1){
                            $this.element.find(".btnAnterior").prop("disabled",false);
                            $this.element.find(".btnPrimero").prop("disabled", false);
                        } else {
                            $this.element.find(".btnAnterior").prop("disabled",true);
                            $this.element.find(".btnPrimero").prop("disabled", true);
                        }
                        
                        if($this.pagina<$this.totalPaginas){
                            $this.element.find(".btnSiguiente").prop("disabled",false);
                            $this.element.find(".btnUltimo").prop("disabled", false);
                        } else {
                            $this.element.find(".btnSiguiente").prop("disabled",true);
                            $this.element.find(".btnUltimo").prop("disabled", true);
                        }
                    } else {
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron registros.</div>");
                        $(".gm-itembox-container").addClass("empty");
                    }
                    $("#gm-uc-page-footer-total-registers").html(data.Response.TotalRegistros);
                    var str = document.getElementById("ucProductos-PagerInfo").innerHTML;
                    var res = str.replace("{page}", $this.pagina);
                    res = res.replace("{total_pages}", data.Response.TotalPaginas);
                    document.getElementById("ucProductos-PagerInfo").innerHTML = res;
                }
                else{
                    $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
                }
                $("#output-loader").css("display", "none");
            }
        });
    },
    cargar_categorias: function(){
        $.ajax({
            url: 'modules/productos/ajax/categorias_xhr.php',
            data: 
            { 
                topic: "listar", 
                order_by: "nombre", 
                order_type: "asc"
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            var registros = data.Response.Registros;
            $("#ucProductos-txtCategoria").empty();
            if(data.Error==""){
                $("#ucProductos-txtCategoria").append("<option value='0' selected>Todas las categorias</option>");
                for (var i = 0; i<registros.length; i++) {
                    $("#ucProductos-txtCategoria").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
        });
    },
    cargar_marcas: function(){
        $.ajax({
            url: 'modules/productos/ajax/marcas_xhr.php',
            data: 
            { 
                topic: "listar", 
                order_by: "nombre", 
                order_type: "asc"
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            var registros = data.Response.Registros;
            $("#ucProductos-txtMarca").empty();
            if(data.Error==""){
                $("#ucProductos-txtMarca").append("<option value='0' selected>Todas las marcas</option>");
                for (var i = 0; i<registros.length; i++) {
                    $("#ucProductos-txtMarca").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
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
                    module: "products_services",
                    topic: "borrar", 
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Registro borrado!", "El producto ha sido borrado.", "success");
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

ucProductos.initialize();
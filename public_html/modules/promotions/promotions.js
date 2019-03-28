var ucPromociones = {
    pagina: 1,
    ajax_url: "/ajax/xhr.php",
    totalPaginas: 1,
    element: $("#mod_products_services"),
    initialize: function(){
        var $this = this;

        $("#ucPromociones-btnAgregar").click(function(){
            frmPromocion.open(0, function(){
                $this.cargar_datos($this.pagina);
            });
        });
        $("#ucProductos-lstProductos").on("click", ".gm-itembox", function(e){
            frmPromocion.open($(this).data("id"), function(){
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
                module: "promotions",
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
                            var description = "";
                            if(registros[i].TipoPromocion=="cantidad") {
                                if(registros[i].SubTipoPromocion=="todos"){
                                    description += "<div>Promoción por cantidad aplicable a todos los productos</div>";
                                } else {
                                    description += "<div>Promoción por cantidad</div>";
                                    let cantidades = registros[i].Cantidades;
                                    for (let index = 0; index < cantidades.length; index++) {
                                        var desde = cantidades[index].desde;
                                        var precio_u = cantidades[index].precio_u;
                                        description += "<div>"+desde+" x "+precio_u+"</div>";
                                    }
                                }
                            } 
                            else if(registros[i].TipoPromocion=="kit"){
                                description = "<div>Promoción tipo Kit</div>";
                            }
                            else {
                                description = "<div>Promoción aplicable a "+registros[i].ProductoTitulo+"</div>";
                            }

                            if(registros[i].SubTipoPromocion=="fija"){
                                if(registros[i].TipoOperacion=="dto_porcentual"){
                                    description += "<div>Descuento del "+registros[i].Valor+" %</div>";
                                }
                            } else if(registros[i].SubTipoPromocion=="cantidad"){
                                var cantidades = registros[i].Cantidades;
                                description +="<table style='width: 100%'>";
                                description +="<thead><tr><td>Desde</td><td>Precio por unidad</td><td>Precio Total</td></tr></thead>";
                                description +="<tbody>";
                                for (let j = 0; j < cantidades.length; j++) {
                                    description +="<tr><td>"+cantidades[j].desde+"</td><td>$ "+cantidades[j].precio_u+"</td><td>$ "+cantidades[j].precio_t+"</td></tr>";
                                }
                                description +="</tbody>";
                                description +="</table>";
                            }
                            $(".gm-itembox-container").append(
                                "<div class='gm-itembox editable' data-id='"+registros[i].Id+"'>"+
                                    "<div class='gm-itembox-title' style='text-align: center;'>"+registros[i].Titulo+"</div>"+
                                    "<div class='gm-itembox-imgcontainer' style='border: 1px solid #ccc; background-color: #fff; display: inline-block'>"+
                                        "<img src='"+registros[i].ImagenPath+"' style='width: 100%; object-fit: cover;' />"+
                                    "</div>"+
                                    "<div style='display: inline-block;'>"+
                                        description+
                                    "</div>"+
                                    "<div class='gm-itembox-buttons' style='margin-top: 10px'>"+
                                        "<button type='button' class='gm-btn danger btnBorrar'><span class='fa fa-trash'></span></button>"+
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
                    module: "promotions",
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

ucPromociones.initialize();
var frmProductos = {
    id: 0,
    caller: null,
    LastCategoriaId: 0,
    imagen_principal: "",
    ajax_url: "/ajax/xhr.php",
    files: [],
    element: $("#frmProductosAgregar"),
    initialize: function(){
        var $this = this;

        $("#btnAddCantidad").click(function(e){
            addPromoBox();
        });

        $("#frmProductosAgregar-header-addons").on("click", ".btnAddImage", function(e) {
            $("<input accept='image/*'>").prop({
                "type": "file",
                "multiple": true
            }).on("change", function(e) {
                $this.files.push(this.files);
                $this.preview_images(this);
            }).trigger("click");
        });

        $("#frmProductosAgregar-tabBtnGeneral").click(function(){$("#frmProductosAgregar-header-addons").empty();});
        $("#frmProductosAgregar-tabBtnPrecios").click(function(){$("#frmProductosAgregar-header-addons").empty();});
        $("#frmProductosAgregar-tabBtnStock").click(function(){$("#frmProductosAgregar-header-addons").empty();});
        $("#frmProductosAgregar-tabBtnPromocion").click(function(){$("#frmProductosAgregar-header-addons").empty();});
        $("#frmProductosAgregar-tabBtnImagenes").click(function(){
            $("#frmProductosAgregar-header-addons").empty();
            $("#frmProductosAgregar-header-addons").append("<button type='button' class='gm-btn primary btnAddImage'><i class='fa fa-plus fa-fw'></i></button>");
        });

        $("#frmProductosAgregar-lstImagenes").on("click", ".btnSelectImg", function(e){
            $(".gm-photo-wrapper").removeClass("active");
            var photoWrapper = $(this).closest(".gm-photo-wrapper");
            var imagen = photoWrapper.data("imagen");
            photoWrapper.addClass("active");
            $this.imagen_principal=imagen;
            return false;
        });

        $("#frmProductosAgregar-lstImagenes").on("click", ".btnDeleteImg", function(){
            $(".gm-photo-wrapper").removeClass("active");
            var photoWrapper = $(this).closest(".gm-photo-wrapper");
            var img_id = photoWrapper.data("id");
            var img_name = photoWrapper.data("imagen");
            if(img_id>0){
                swal({
                    title: "¿Seguro que deseas eliminar esta imagen?",
                    text: "La imagen se borrará de forma permanente!",
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
                            topic: "borrar_imagen", 
                            imagen_id: img_id
                        },
                        type: 'POST',
                        dataType: 'json'
                    }).done(function(data){
                        if(data.Error==""){ 
                            photoWrapper.remove();
                            swal("Registro borrado!", "La imagen ha sido borrada.", "success");
                        }
                        else {swal("Error al borrar!", data.errores, "error");}
                    });
                });
            } else {
                $.each($this.files, function(){
                    $.each(this, function(){
                        if(this.name==img_name){
                            $this.files.splice(this.name);
                        }
                    });
                });
                photoWrapper.remove();
            }
        });

        $("#btnProductosGuardar").click(function(){
            var formData = new FormData($('#frmProductosAgregar')[0]);
            var stock = [];
            var promos_cantidad = [];

            $(".stock").each(function(){
                var stock_tmp = { inmueble_id: $(this).data("inmueble-id"), actual: $(this).find(".actual").val(), min: $(this).find(".min").val() };
                stock.push(stock_tmp);
            });

            $(".promobox").each(function(){
                var promobox_tmp = { 
                    desde: $(this).find("promobox-cantidad"), 
                    tipo_dto: $(this).find(".promobox-tipo-dto").val(),
                    valor: $(this).find(".promobox-valor").val()
                };
                promos_cantidad.push(promobox_tmp);
            });

            $.each($this.files, function() {
                $.each(this, function() {
                    formData.append("files[]", this);
                });
            });

            formData.append("module", "products_services");
            formData.append("topic", "guardar");
            formData.append("id", $this.id);
            formData.append("categoria_n1_id", $this.element.find(".txt-category-n1").val());
            formData.append("categoria_n2_id", $this.element.find(".txt-category-n2").val());
            formData.append("stock", JSON.stringify(stock));
            formData.append("promos_cantidad", JSON.stringify(promos_cantidad));
            formData.append("sistema_medida_id", $("#frmProductosAgregar-txtSistemaDeMedida").val());
            formData.append("tipo_producto_id", $("#frmProductosAgregar-txtTipoProducto").val());
            formData.append("titulo", $("#frmProductosAgregar-txtTitulo").val());
            formData.append("descripcion", $("#frmProductosAgregar-txtDescripcion").val());
            formData.append("marca_id", $("#frmProductosAgregar-txtMarca").val());
            formData.append("imagen", $this.imagen_principal);

            formData.append("iva", $("#frmProductosAgregar-txtIVA").val());
            formData.append("costo_precio", $("#frmProductosAgregar-txtCostoPrecio").val());
            formData.append("costo_importe", $("#frmProductosAgregar-txtCostoImporte").val());
            formData.append("venta_precio", $("#frmProductosAgregar-txtVentaPrecio").val());
            formData.append("venta_importe", $("#frmProductosAgregar-txtVentaImporte").val());

            if($("frmProductosAgregar-chPublicar").is(":checked")){
                formData.append("publicar", "1");
            } else {
                formData.append("publicar", "0");
            }

            //TODO: ModalWait

            $.ajax({
                url: $this.ajax_url,
                type: 'POST',
                data: formData,
                dataType: 'json',
                xhr: function() 
                {
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload) myXhr.upload.addEventListener('progress',$this.progressHandlingFunction, false); // For handling the progress of the upload
                    return myXhr;
                },
                beforeSend: function() 
                {
                    $("#status").empty();
                    var percentVal = '0%';
                    $('.progress-bar-wait').width(percentVal);
                    $('.percent').html(percentVal);
                },
                success: function(data){
                    //TODO ModalWait close
                    var error = data.Error;
                    if(error.length>0){
                        alert(error);
                    }
                    else{
                        $this.files = [];
                        $("#imagenesContainer").empty();
                        $.GMWindowManager.close($this.element);
                        $this.caller();
                    }
                },
                cache: false,
                contentType: false,
                processData: false
            });
            return false;
        });

        $this.element.find(".btn-add-category1").click(function(){
            frmCategoriaN1.open(0, function(data){
                var last_id = data.Response;
                $this.cargar_categorias_n1(last_id);
            });
        });

        $this.element.find(".txt-category-n1").change(function(){
            $this.cargar_categorias_n2();
        });

        $this.element.find(".btn-add-category2").click(function(){
            frmCategoriaN2.open(0, function(data){
                var last_id = data.Response;
                $this.cargar_categorias_n2(last_id);
            });
        });

        $this.element.find(".txt-category-n2").change(function(){
            //$this.cargar_categorias_n3();
        });

        $this.cargar_categorias_n1();
    },
    open: function(id=0, caller=null){
        var $this = this;
        $this.id = id;
        $this.caller = caller;
        $this.cargar_stock(id);

        $("#frmProductosAgregar-lstImagenes").empty();
        if(id==0){
            $("#frmProductosAgregar-lblTitulo").html("Agregar producto");
            $("#frmProductosAgregar-txtCodigo").val("");
            $("#frmProductosAgregar-txtTitulo").val("");
            $("#frmProductosAgregar-txtTipoProducto>option[value='1']").prop("selected", true);
            $("#frmProductosAgregar-txtIVA").val("");
            $this.element.find(".txt-category-n1>option[value='0']").prop("selected", true);
            $("#frmProductosAgregar-frmProductosAgregar-txtMarca>option[value='0']").prop("selected", true);
            $("#frmProductosAgregar-txtSistemaDeMedida>option[value='1']").prop("selected", true);
            $("#frmProductosAgregar-txtCostoPrecio").val("");
            $("#frmProductosAgregar-txtCostoImporte").val("");
            $("#frmProductosAgregar-txtVentaPrecio").val("");
            $("#frmProductosAgregar-txtVentaImporte").val("");
            $("#frmProductosAgregar-txtIVA").val("");
            $("#frmProductosAgregar-txtCostoIVA").val("");
            $("#frmProductosAgregar-txtVentaIVA").val("");
            $("#frmProductosAgregar-imagenesContainer").empty();
            $("#frmProductosAgregar-txtStockActual").val("");
            $("#frmProductosAgregar-precio_venta").html("");
            $("#frmProductosAgregar-txtPeso").val("");
            $("#frmProductosAgregar-txtAlto").val("");
            $("#frmProductosAgregar-txtAncho").val("");
            $("#frmProductosAgregar-txtLargo").val("");
            $("#frmProductosAgregar-txtDescripcion").val("");
            $.GMWindowManager.open($this.element);
        } else {
            var categoriaN1Id = 0;
            var categoriaN2Id = 0;
            var categoriaN3Id = 0;
            var categoriaN4Id = 0;

            $("#txtTipoPromocion").change();
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "products_services", 
                    topic: "obtener", 
                    id: id 
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    var Producto = data.Response;
                    var imagenes = data.Response.Imagenes;
                    $this.LastCategoriaId = Producto.CategoriaId;
                    $this.imagen_principal = Producto.Imagen;

                    $("#frmProductosAgregar-lblTitulo").html("Editar Producto");
                    $("#frmProductosAgregar-txtCodigo").val(Producto.Codigo);
                    $("#frmProductosAgregar-txtTitulo").val(Producto.Titulo);
                    $("#frmProductosAgregar-txtTipoProducto>option[value='"+Producto.TipoProductoId+"']").prop("selected", true);
                    $("#frmProductosAgregar-txtIVA").val(Producto.Iva);
                    $("#frmProductosAgregar-frmProductosAgregar-txtCategoriaN1>option[value='"+Producto.CategoriaN1Id+"']").prop("selected", true);
                    $("#frmProductosAgregar-frmProductosAgregar-txtMarca>option[value='"+Producto.MarcaId+"']").prop("selected", true);
                    $("#frmProductosAgregar-txtSistemaDeMedida>option[value='"+Producto.SistemaMedidaId+"']").prop("selected", true);
                    $("#frmProductosAgregar-txtCostoPrecio").val(Producto.CostoPrecio);
                    $("#frmProductosAgregar-txtCostoImporte").val(Producto.CostoImporte);
                    $("#frmProductosAgregar-txtVentaPrecio").val(Producto.VentaPrecio);
                    $("#frmProductosAgregar-txtVentaImporte").val(Producto.VentaImporte);
                    $("#frmProductosAgregar-txtIVA").val(Producto.Iva);
                    $("#frmProductosAgregar-txtCostoIVA").val(Producto.Iva);
                    $("#frmProductosAgregar-txtVentaIVA").val(Producto.Iva);
                    $("#frmProductosAgregar-imagenesContainer").empty();
                    $("#frmProductosAgregar-txtStockActual").val(Producto.StockActual);
                    $("#frmProductosAgregar-precio_venta").html(Producto.VentaImporte);
                    $("#frmProductosAgregar-txtPeso").val(Producto.Peso);
                    $("#frmProductosAgregar-txtAlto").val(Producto.Alto);
                    $("#frmProductosAgregar-txtAncho").val(Producto.Ancho);
                    $("#frmProductosAgregar-txtLargo").val(Producto.Largo);
                    $("#frmProductosAgregar-txtDescripcion").val(Producto.Descripcion);
                    $this.element.find(".txt-category-n1>option[value='"+Producto.CategoriaN1Id+"']").prop("selected", true);

                    $("#frmProductosAgregar").find("#txtTipoProducto").change();

                    if(Producto.Publicar) 
                        $("#frmProductosAgregar").find("#chPublicar").prop("checked", true);
                    else
                        $("#frmProductosAgregar").find("#chPublicar").prop("checked", false);

                    if(Producto.Destacado) 
                        $("#frmProductosAgregar").find("#chDestacar").prop("checked", true);
                    else
                        $("#frmProductosAgregar").find("#chDestacar").prop("checked", false);
                    
                    if(Producto.EnPromocion) 
                        $("#frmProductosAgregar").find("#chEnPromocion").prop("checked", true);
                    else
                        $("#frmProductosAgregar").find("#chEnPromocion").prop("checked", false);

                    $("#frmProductosAgregar").find("#txtDescuentoPromocion").val(Producto.EnPromocionDto);
                    $("#frmProductosAgregar").find("#txtPromocionImporte").val(Producto.Importe);
                    
                    for (var i = 0; i<imagenes.length; i++) 
                    {
                        if(imagenes[i].URL==Producto.ImagenPath){
                            $this.add_image_box(imagenes[i].Id, imagenes[i].Nombre, imagenes[i].URL,"", true);
                        } else {
                            $this.add_image_box(imagenes[i].Id, imagenes[i].Nombre, imagenes[i].URL,"");
                        }
                    }
                    

                    $this.calcular_ganancias();

                    $.GMWindowManager.open($this.element);
                }
            });    
        }

    },
    preview_images: function(input){
        var $this = this;
        var fileList = input.files;
        var anyWindow = window.URL || window.webkitURL;
        for (var i = 0; i < fileList.length; i++) 
        {
            var objectUrl = anyWindow.createObjectURL(fileList[i]);
            var size = (fileList[i].size / 1024);
            $this.add_image_box(0, fileList[i].name, objectUrl);
            window.URL.revokeObjectURL(fileList[i]);
        }
    },
    add_image_box: function(id, img_name, img_url, alt="", selected=false){
        var $this = this;
        var selected_str = (selected==true) ? "active" : "";
        $("#frmProductosAgregar-lstImagenes").append(
            "<div class='gm-photo-wrapper "+selected_str+"' data-id='"+id+"' data-imagen='"+img_name+"'>"+
                "<div class='photo'>"+
                    "<div class='title'>"+
                        "<button type='button' class='gm-btn small rounded default btnSelectImg'><i class='fa fa-check fa-fw'></i></button> "+
                        "<button type='button' class='gm-btn small rounded default btnDeleteImg'><i class='fa fa-times fa-fw'></i></button>"+
                    "</div>"+
                    "<img src='"+img_url+"' alt='"+alt+"' />"+
                    "<span>"+img_name+"</span>"+
                "</div>"+
            "</div>"
        );
        if(selected){
            $("#frmProductosAgregar-ImagenPrincipal").val(img_name);
            $this.imagen_principal = img_name;
        }
    },
    cargar_sistemas_de_medida: function(){
        $.ajax({
            url: '/panel/modules/productos/ajax/productos_xhr.php',
            type: 'POST',
            dataType: 'json',
            data: { 
                topic: "listar_sistemas_de_medida", 
                filtro: "", 
                pagina : 1, 
                col: "nombre", 
                order: "asc" 
            },
            success: function(data){
                var registros = data.Response;
                $("#txtSistemaDeMedida").empty();
                
                if(registros.length>0)
                {
                    for (var i = 0; i<registros.length; i++){
                        $("#txtSistemaDeMedida").append("<option id='medida-"+registros[i].Id+"' value='"+ registros[i].Id +"' >"+registros[i].Nombre+"</option>");
                    }
                }
            }
        });
    },
    cargar_categorias_n1: function(selected=0){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "products_services_categories",
                topic: "listar_categorias_n1", 
                order_by: "nombre", 
                order_type: "asc"
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            var registros = data.Response.Registros;
            var txt_category_n1 = $this.element.find(".txt-category-n1");
            txt_category_n1.empty();
            if(data.Error==""){
                txt_category_n1.append("<option value='0' selected>Sin especificar</option>");
                for (var i = 0; i<registros.length; i++) {
                    txt_category_n1.append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
                if(selected>0){
                    txt_category_n1.find("option[value='"+selected+"']").prop("selected", true);
                    $this.cargar_categorias_n2();
                }
            }
        });
    },
    cargar_categorias_n2: function(selected=0){
        var $this = this;

        var categoria_n1_id = $this.element.find(".txt-category-n1").val();
        if(categoria_n1_id>0){
            $("#frmProductosAgregar_dvCategoriaN2").css("display", "block");
            var $this = this;
            $.ajax({
                url: $this.ajax_url,
                data: 
                {
                    module: "products_services_categories",
                    topic: "listar_categorias_n2",
                    categoria_n2_id: categoria_n1_id,
                    order_by: "nombre", 
                    order_type: "asc"
                },
                type: 'POST',
                dataType: 'json'
            }).done(function(data){
                var registros = data.Response.Registros;
                var txt_category_n2 = $this.element.find(".txt-category-n2");
                txt_category_n2.empty();
                if(data.Error==""){
                    txt_category_n2.append("<option value='0' selected>Sin especificar</option>");
                    for (var i = 0; i<registros.length; i++) {
                        txt_category_n2.append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }
                    if(selected>0){
                        txt_category_n2.find("option[value='"+selected+"']").prop("selected", true);
                        //$this.cargar_categorias_n3();
                    }
                }
            });
        }
    },
    cargar_stock: function(id){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data:
            {
                module: "products_services",
                topic: "cargar_stock", 
                filtro: $("#txtBuscar").val(), 
                pagina : 1, 
                col: $("#col").val(), 
                order: $("#order").val(),
                producto_id: id
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
    
                $("#tab_stock").empty();
                if(data.Error==""){
                    var table = $("<table class='table'></table>");
                    var table_head = $("<thead></thead>");
                    var table_body = $("<tbody></tbody>");
                    var tr = $("<tr></tr>");
    
                    tr.append("<th>Sucursal</th><th style='width: 100px'>Actual</th><th style='width: 100px'>Min</th>");
                    table_head.append(tr);
    
                    for (var i = 0; i<registros.length; i++) {
                        table_body.append(
                            "<tr class='stock' data-inmueble-id='"+registros[i].PropiedadId+"'>"+
                                "<td>"+registros[i].PropiedadNombre+"</td>"+
                                "<td><input type='text' class='gm-form-control actual' value='"+registros[i].Actual+"' /></td>"+
                                "<td><input type='text' class='gm-form-control min' value='"+registros[i].Min+"' /></td>"+
                            "</tr>"
                        );
                    }
                    table.append(table_head);
                    table.append(table_body);
                    $("#tab_stock").append(table);
                }
                else{
    
                }
            }
        });
    },
    calcular_ganancias: function(){
        var costoPrecio = 0;
        var costoImporte = 0;
        var ventaPrecio = 0;
        var ventaImporte = 0;
        var gananciaImporte = 0;
        var gananciaPorcentaje = 0;
        var gananciaPorcentajef = 0;
        var promocionImporte = 0;
        var promocionDescuento = 0;
        var promocionTipoDescuento = "";
        var descuento = 0;

        var porcentaje = "";

        if($("#frmProductosAgregar-txtCostoPrecio").val().length>0) costoPrecio = parseFloat($("#frmProductosAgregar-txtCostoPrecio").val());
        if($("#frmProductosAgregar-txtCostoImporte").val().length>0) costoImporte = parseFloat($("#frmProductosAgregar-txtCostoImporte").val());
        if($("#frmProductosAgregar-txtVentaPrecio").val().length>0) ventaPrecio = parseFloat($("#frmProductosAgregar-txtVentaPrecio").val());
        if($("#frmProductosAgregar-txtVentaImporte").val().length>0) ventaImporte = parseFloat($("#frmProductosAgregar-txtVentaImporte").val());
        if($("#frmProductosAgregar-txtPromocionImporte").val().length>0) promocionImporte = parseFloat($("#frmProductosAgregar-txtPromocionImporte").val());

        if($("#frmProductosAgregar-txtDescuentoPromocion").val().length>0) promocionDescuento = parseFloat($("#frmProductosAgregar-txtDescuentoPromocion").val());
        promocionTipoDescuento = $("#frmProductosAgregar-txtTipoDescuentoPromocion").val();
        if(promocionTipoDescuento=="lineal"){
            descuento = promocionDescuento;
        }
        else{
            if(promocionDescuento>0){
                descuento = (ventaImporte * promocionDescuento)/100;
            }
        }

        gananciaImporte = ventaImporte - costoImporte - descuento;
        if (costoImporte > 0)
        {
            gananciaPorcentaje = (gananciaImporte / costoImporte) * 100;
            gananciaPorcentajef = Math.round(gananciaPorcentaje * 100) / 100
        }
        
        if (gananciaImporte > 0)
        {
            if (gananciaPorcentajef > 0) porcentaje = " (" + gananciaPorcentajef.toString() + "%)";
            $("#lblGanancia").html(($("#chEnPromocion").is(":checked") ? "En promoción!<br>" : "") + "Ganancias: $ " + gananciaImporte.toString() + porcentaje);
            $("#lblGanancia").css("color", "#085e06");
            $("#lblGanancia").css("background-color", "#96e09d");

            $("#lblPromocionBeneficio").html("Ganancias: $ " + gananciaImporte.toString() + porcentaje);
            $("#lblPromocionBeneficio").css("color", "#085e06");
            $("#lblPromocionBeneficio").css("background-color", "#96e09d");
        }
        if (gananciaImporte < 0)
        {
            gananciaImporte *= -1;
            if (gananciaPorcentajef > 0) porcentaje = " (" + gananciaPorcentajef.ToString() + "%)";
            $("#lblGanancia").html(($("#chEnPromocion").is(":checked") ? "En promoción!<br>" : "") + "pedidas: $ " + gananciaImporte.toString() + porcentaje);
            $("#lblGanancia").css("color", "#840505");
            $("#lblGanancia").css("background-color", "#dd7e7e");

            $("#lblPromocionBeneficio").html("pedidas: $ " + gananciaImporte.toString() + porcentaje);
            $("#lblPromocionBeneficio").css("color", "#840505");
            $("#lblPromocionBeneficio").css("background-color", "#dd7e7e");
        }
        if (gananciaImporte == 0)
        {
            $("#lblGanancia").html("Sin ganancias ni perdidas");
            $("#lblGanancia").css("color", "#000");
            $("#lblGanancia").css("background-color", "#fff");

            $("#lblPromocionBeneficio").html("Sin ganancias ni perdidas");
            $("#lblPromocionBeneficio").css("color", "#000");
            $("#lblPromocionBeneficio").css("background-color", "#fff");
        }

        $("#lblPrecioVentaInfo").val("$ "+ventaPrecio.toFixed(2).toString());
    },
    progressHandlingFunction: function(e){
        if(e.lengthComputable)
        {
            var max = e.total;
            var current = e.loaded;

            var Percentage = (current * 100)/max;

            $('.progress-bar-wait').width(Percentage+"%");
            $('.percent').html(Percentage.toFixed(2)+"%");

            if(Percentage >= 100)
            {
                // process completed  
            }
        }
    }
}

frmProductos.initialize();

/*
function addPromoBox(){
    $("#promoboxes-content").append(
        "<tr class='promobox'>"+
            "<td><input type='text' class='gm-form-control promobox-cantidad' value='5' /></td>"+
            "<td>"+
                "<select class='gm-form-control ms promobox-tipo-dto'>"+
                    "<option value='lineal' selected>Lineal ($)</option>"+
                    "<option value='porcentual'>Porcentual (%)</option>"+
                "</select>"+
            "</td>"+
            "<td>"+
                "<input type='text' class='gm-form-control decimal promobox-valor' />"+
            "</td>"+
            "<td>"+
                "<input type='text' class='gm-form-control decimal promobox-importe-final' />"+
            "</td>"+
            "<td>"+
                "<button class='gm-btn danger btnRemovePromoBox'><span class='fa fa-minus-circle'></span></button>"+
            "</td>"+
        "</tr>"
    );
    $("#promoboxes-content").append(
        "<div class='promobox'>"+
            "<div class='col-md-2'>"+
                "<input type='text' class='gm-form-control promobox-cantidad' value='5' />"+
            "</div>"+
            "<div class='col-md-3'>"+
                "<select class='gm-form-control ms promobox-tipo-dto'>"+
                    "<option value='lineal' selected>Lineal ($)</option>"+
                    "<option value='porcentual'>Porcentual (%)</option>"+
                "</select>"+
            "</div>"+
            "<div class='col-md-2'>"+
                "<input type='text' class='gm-form-control decimal promobox-valor' />"+
            "</div>"+
            "<div class='col-md-2'>"+
                "<input type='text' class='gm-form-control decimal promobox-importe-final' />"+
            "</div>"+
            "<div class='col-md-2'>"+
                "<label class='gm-form-control decimal promobox-beneficio'>$ 0</label>"+
            "</div>"+
            "<div class='col-md-1'>"+
                "<button class='btn2 btn-danger btnRemovePromoBox'><span class='fa fa-minus-circle'></span></button>"+
            "</div>"+
        "</div>"
    );
}

$("#promo-cantidades").on("click", ".btnRemovePromoBox", function(e){
    $(this).closest(".promobox").fadeOut();
});

$("#promo-cantidades").on("keyup", ".promobox-valor", function(e){
    var $venta_importe = $("#txtVentaImporte").val();
    var $costo_importe = $("#txtCostoImporte").val();
    var $tipo_dto = $(this).closest(".promobox").find(".promobox-tipo-dto").val();
    var $descuento = $(this).val();
    var $importe_final = 0; //$venta_importe - $descuento;
    if($tipo_dto=="lineal"){
        $importe_final = $venta_importe - $descuento;
    } else {
        $importe_final = $venta_importe - (($venta_importe * $descuento)/100);
    }
    var $beneficio = $importe_final - $costo_importe;
    $(this).closest(".promobox").find(".promobox-importe-final").val($importe_final);
    $(this).closest(".promobox").find(".promobox-beneficio").text("$ "+$beneficio);
});

$("#promo-cantidades").on("change", ".promobox-tipo-dto", function(e){
    var $venta_importe = $("#txtVentaImporte").val();
    var $costo_importe = $("#txtCostoImporte").val();
    var $tipo_dto = $(this).val();
    var $descuento = $(this).closest(".promobox").find(".promobox-valor").val();
    var $importe_final = 0; //$venta_importe - $descuento;
    if($tipo_dto=="lineal"){
        $importe_final = $venta_importe - $descuento;
    } else {
        $importe_final = $venta_importe - (($venta_importe * $descuento)/100);
    }
    var $beneficio = $importe_final - $costo_importe;
    $(this).closest(".promobox").find(".promobox-importe-final").val($importe_final);
    $(this).closest(".promobox").find(".promobox-beneficio").text("$ "+$beneficio);
});

$("#frmProductosAgregar-txtIVA").on("change paste keyup", function(){
    var valor = $(this).val();
    $("#frmProductosAgregar-txtCostoIVA").val(valor);
    $("#frmProductosAgregar-txtVentaIVA").val(valor);
    calcularVentaImporte();
    calcularCostoImporte();
});



$("#frmProductosAgregar_txtTipoProducto").on("change", function(){
    if($(this).val()=="1"){
        $("#li_tab_stock").css("display", "block");
        $("#dvPesoMedidas").css("display", "block");
    }
    if($(this).val()=="2"){
        $("#li_tab_stock").css("display", "none");
        $("#dvPesoMedidas").css("display", "none");
    }
});

$("#txtTipoPromocion").on("change", function(){
    if($(this).val()=="fijo"){
        $("#promocion-fija").css("display", "block");
        $("#promocion-cantidad").css("display", "none");
    }
    if($(this).val()=="cantidad"){
        $("#promocion-fija").css("display", "none");
        $("#promocion-cantidad").css("display", "block");
    }
});

function frmProductosAgregar_calcularCostoImporte(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmProductosAgregar-txtCostoPrecio").val().length > 0) 
        precio = parseFloat($("#frmProductosAgregar-txtCostoPrecio").val());
    else
        $("#frmProductosAgregar-txtCostoPrecio").val("0");
    
    if($("#frmProductosAgregar-txtIVA").val().length > 0) iva = parseFloat($("#frmProductosAgregar-txtIVA").val());

    importe = precio + ((precio * iva) / 100);
    importef = Math.round(importe * 100) / 100
    $("#frmProductosAgregar-txtCostoImporte").val(importef.toString());

    frmProductosAgregar_calcularGanancia();
}

function frmProductosAgregar_calcularCostoPrecio(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmProductosAgregar-txtCostoImporte").val().length > 0) 
        importe = parseFloat($("#frmProductosAgregar-txtCostoImporte").val());
    else
        $("#frmProductosAgregar-txtCostoImporte").val("0");
    
    if($("#frmProductosAgregar-txtIVA").val().length > 0) iva = parseFloat($("#frmProductosAgregar-txtIVA").val());

    precio = importe / ((100 + iva) / 100);
    preciof = Math.round(precio * 100) / 100

    $("#frmProductosAgregar-txtCostoPrecio").val(preciof.toString());

    frmProductosAgregar_calcularGanancia();
}

function frmProductosAgregar_calcularVentaImporte(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmProductosAgregar-txtVentaPrecio").val().length > 0) 
        precio = parseFloat($("#frmProductosAgregar-txtVentaPrecio").val());
    else
        $("#frmProductosAgregar-txtVentaPrecio").val("0");
    
    if($("#frmProductosAgregar-txtIVA").val().length > 0) iva = parseFloat($("#frmProductosAgregar-txtIVA").val());

    importe = precio + ((precio * iva) / 100);
    importef = Math.round(importe * 100) / 100
    $("#frmProductosAgregar-txtVentaImporte").val(importef.toString());

    frmProductosAgregar_calcularGanancia();
}

function frmProductosAgregar_calcularVentaPrecio(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmProductosAgregar-txtVentaImporte").val().length > 0) 
        importe = parseFloat($("#frmProductosAgregar-txtVentaImporte").val());
    else
        $("#frmProductosAgregar-txtVentaImporte").val("0");
    
    if($("#frmProductosAgregar-txtIVA").val().length > 0) iva = parseFloat($("#frmProductosAgregar-txtIVA").val());

    precio = importe / ((100 + iva) / 100);
    preciof = Math.round(precio * 100) / 100

    $("#frmProductosAgregar-txtVentaPrecio").val(preciof.toString());

    frmProductosAgregar_calcularGanancia();
}

function frmProductosAgregar_calcularImportePromocion(){
    var ventaImporte = 0;
    var tipoDescuento = "lineal";
    var descuento=0;
    var importePromocion=0;

    if($("#txtVentaImporte").val().length>0) ventaImporte = parseFloat($("#txtVentaImporte").val());
    if($("#txtDescuentoPromocion").val().length>0) descuento = parseFloat($("#txtDescuentoPromocion").val());
    tipoDescuento = $("#txtTipoDescuentoPromocion").val();
    if(tipoDescuento=="lineal"){
        importePromocion = ventaImporte - descuento;
    }
    else{
        if(descuento>0){
            importePromocion = ventaImporte - ((ventaImporte * descuento)/100);
        }
    }
    $("#txtPromocionImporte").val(importePromocion.toFixed(2).toString());

    calcularGanancia();
}

$("#frmProductosAgregar-txtCostoPrecio").on("paste keyup", function(){
    frmProductosAgregar_calcularCostoImporte();
});
$("#frmProductosAgregar-txtCostoImporte").on("paste keyup", function(){
    frmProductosAgregar_calcularCostoPrecio();
});
$("#frmProductosAgregar-txtVentaPrecio").on("paste keyup", function(){
    frmProductosAgregar_calcularVentaImporte();
});
$("#frmProductosAgregar-txtVentaImporte").on("paste keyup", function(){
    frmProductosAgregar_calcularVentaPrecio();
});

$("#frmProductosAgregar-txtDescuentoPromocion").on("paste keyup", function(){
    frmProductosAgregar_calcularImportePromocion();
});

$("#txtPromocionImporte").on("paste keyup", function(){
    if($(this).val().length>0) 
        $("#chEnPromocion").prop("checked", true);
    else
        $("#chEnPromocion").prop("checked", false);
});
$("#txtTipoDescuentoPromocion").on("change click", function(){
    frmProductosAgregar_calcularImportePromocion();
});

function deleteImg(boton, i)
{
    var imgcontainer = boton.closest('.photo-wrapper');
    var image_element = $(imgcontainer).find('img');
    files.splice(i, 1);
    $(imgcontainer).remove();
    $.each(files, function(){
        $.each(this, function(){
            if(this.name==$(boton).data("imagen")){
                files.splice(this.name);
            }
        });
    });
}



function borrarImagenGuardada(boton, imagen_id)
{
    $.ajax({
        url: 'modules/productos/ajax/productos_xhr.php',
        data: {
            topic: "borrar_imagen", 
            imagen_id: imagen_id
        },
        type: 'POST',
        dataType: 'json',
        success: function(data)
        {
            if(data.Error==""){
                var imgcontainer = boton.closest('.photo-wrapper');
                $(imgcontainer).remove();
            }
            else{
                swal("Error al borrar!", data.errores, "error");
            }
        }
    });
}
*/
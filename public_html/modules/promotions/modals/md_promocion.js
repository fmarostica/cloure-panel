var frmPromocion = {
    caller: null,
    element: $("#frmPromotion"),
    ajax_url: "/ajax/xhr.php",
    producto_id: 0,
    id: 0,
    initialize: function() {
        var $this = this;
        $("#frmPromotion-txtTipoPromocion").change();
        $("#frmPromotion-btnGuardar").click(function(){
            $this.guardar();
        });
        $("#frmPromotion-btnAddCantidad").click(function(e){
            $this.addPromoBoxGlobal();
        });
        $("#frmPromocion-btnSeleccionarProducto").click(function(){
            frmProductosSeleccionar.open(function(producto){
                $this.producto_id = producto.Id;
                $("#frmPromocion-btnSeleccionarProducto").html(producto.Titulo);
            });
        });
        $("#frmPromotion-btnAddProducto").click(function(){
            frmProductosSeleccionar.open(function(productos){
                for (let i = 0; i < productos.length; i++) {
                    $this.addProduct(1, productos[i].id, productos[i].titulo);
                }
            }, true);
        });
        $this.element.on("click", ".btnRemovePromoBoxGlobal", function(e){
            $(this).closest(".promobox-global").fadeOut();
        });
        $this.element.on("click", ".btnRemoveProductPromo", function(e){
            $(this).closest(".producto-tmp").fadeOut();
        });
        
        $("#frmPromotion-txtTipoPromocion").change(function(e){
            var selected_option = $(this).val();
            if(selected_option=="cantidad"){
                $("#frmPromotion-dvProductosAplicables").css("display", "block");
                $("#frmPromotion-dvIndividual").css("display","none");
                $("#frmPromotion-txtProductosAplicables").change();
                $("#frmPromotion-dvCantidades").css("display", "block");
                $("#frmPromotion-dvKit").css("display", "none");
                $("#frmPromotion-dvValor").css("display", "none");
            } 
            if(selected_option=="descuento_individual"){
                $("#frmPromotion-dvProductosAplicables").css("display", "none");
                $("#frmPromotion-dvIndividual").css("display","block");
                $("#frmPromotion-dvCategorias").css("display", "none");
                $("#frmPromotion-dvCantidades").css("display", "none");
                $("#frmPromotion-dvKit").css("display", "none");
                $("#frmPromotion-dvValor").css("display", "block");
            }
            if(selected_option=="descuento_multiple"){
                $("#frmPromotion-dvProductosAplicables").css("display", "block");
                $("#frmPromotion-dvIndividual").css("display","none");
                $("#frmPromotion-txtProductosAplicables").change();
                $("#frmPromotion-dvCantidades").css("display", "none");
                $("#frmPromotion-dvKit").css("display", "none");
                $("#frmPromotion-dvValor").css("display", "block");
            } 
            if(selected_option=="importe_fijo_individual"){
                $("#frmPromotion-dvProductosAplicables").css("display", "none");
                $("#frmPromotion-dvIndividual").css("display","block");
                $("#frmPromotion-dvCategorias").css("display", "none");
                $("#frmPromotion-dvCantidades").css("display", "none");
                $("#frmPromotion-dvKit").css("display", "none");
                $("#frmPromotion-dvValor").css("display", "block");
            }
            if(selected_option=="importe_fijo_multiple"){
                $("#frmPromotion-dvProductosAplicables").css("display", "block");
                $("#frmPromotion-dvIndividual").css("display","none");
                $("#frmPromotion-txtProductosAplicables").change();
                $("#frmPromotion-dvCantidades").css("display", "none");
                $("#frmPromotion-dvKit").css("display", "none");
                $("#frmPromotion-dvValor").css("display", "block");
            } 
            if(selected_option=="kit") {
                $("#frmPromotion-dvProductosAplicables").css("display", "none");
                $("#frmPromotion-dvIndividual").css("display","none");
                $("#frmPromotion-dvCategorias").css("display", "none");
                $("#frmPromotion-dvCantidades").css("display", "none");
                $("#frmPromotion-dvKit").css("display", "block");
                $("#frmPromotion-dvValor").css("display", "block");
                $("#frmPromotion-lblDiscountPrompt").html("Importe");
            }
        });

        $("#frmPromotion-txtProductosAplicables").change(function(){
            if($(this).val()=="todos"){
                $("#frmPromotion-dvCategorias").css("display", "none");
            }
            else if($(this).val()=="categoria"){
                $this.cargar_categorias_n1();
                $("#frmPromotion-dvCategorias").css("display", "block");
            } 
        });

        $this.element.on("keyup",".promobox-global-valor-unidad", function(e){
            $current_row =  $(this).closest(".promobox-global");
            $cantidad = $current_row.find(".promobox-global-cantidad").val();
            $precio = $(this).val();
            $total = $cantidad * $precio;
            $current_row.find(".promobox-global-valor-total").val($total);
        });

        $this.element.on("keyup",".promobox-global-valor-total", function(e){
            $current_row =  $(this).closest(".promobox-global");
            $cantidad = $current_row.find(".promobox-global-cantidad").val();
            $total = $(this).val();
            $precio = $total / $cantidad;
            $current_row.find(".promobox-global-valor-unidad").val($precio);
        });
    },
    open: function(id=0, caller=null){
        var $this = this;
        $this.id = id;
        $this.caller = caller;
        $.GMWindowManager.open($this.element);
        $("#frmPromotion-txtTipoPromocion").change();
        $("#promoboxes-global-content").empty();
        $("#frmPromocion-txtTitulo").val("");
        
        if(id>0){
            $("#frmPromocionesGlobal_lblTitulo").html("Editar promocion");
            $.ajax({
                url: $this.ajax_url,
                data: 
                {
                    module: "promotions",
                    topic: "obtener", 
                    id: id 
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    if(data.Error.length>0){
                        alert(data.Error);
                    } else {
                        var promocion = data.Response;
                        var cantidades = promocion.Cantidades; 
                        $("#frmPromocion-txtTitulo").val(promocion.Titulo);
                        $("#frmPromotion-txtTipoPromocion>option[value='"+promocion.TipoPromocion+"']").prop("selected", true);
                        $("#frmPromotion-txtTipoPromocion").change();
                        
                        $("#frmPromotion-btnSeleccionarProducto").html(promocion.ProductoTitulo);
                        for (let i = 0; i < cantidades.length; i++) {
                            $this.addPromoBoxGlobal(cantidades[i].desde, cantidades[i].precio_u, cantidades[i].precio_t);
                        }
                    }
                }
            });
        } else {
            $("#frmPromocionesGlobal_lblTitulo").html("Agregar promocion");
        }
    },
    guardar: function(){
        var $this = this;

        var formData = new FormData($this.element[0]);
        var promos_cantidad = [];
        formData.append("module", "promotions");
        formData.append("topic", "guardar");
        formData.append("id", $this.id);
        formData.append("producto_id", $this.producto_id);

        if($("#frmPromotion-txtTipoPromocion").val()=="cantidad"){
            $(".promobox-global").each(function(){
                var promobox_tmp = { 
                    desde: $(this).find(".promobox-global-cantidad").val(), 
                    precio_u: $(this).find(".promobox-global-valor-unidad").val(), 
                    precio_t: $(this).find(".promobox-global-valor-total").val()
                };
                promos_cantidad.push(promobox_tmp);
            });
            formData.append("promo_items", JSON.stringify(promos_cantidad));
        }
        else if($("#frmPromotion-txtTipoPromocion").val()=="kit"){
            $(".producto-tmp").each(function(){
                var promobox_tmp = { 
                    cant: $(this).find(".producto-tmp-cantidad").val(), 
                    producto_id: $(this).data("producto-id")
                };
                promos_cantidad.push(promobox_tmp);
            });
            formData.append("promo_items", JSON.stringify(promos_cantidad));
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
    },
    addPromoBoxGlobal: function(desde=2, precio_u=0, precio_t=0){
        $("#promoboxes-global-content").append(
            "<tr class='promobox-global'>"+
                "<td style='width: 30%; text-align: center'>"+
                    "<input type='text' class='gm-form-control promobox-global-cantidad' value='"+desde+"' />"+
                "</td>"+
                "<td style='width: 30%; text-align: center'>"+
                    "<input type='text' class='gm-form-control decimal promobox-global-valor-unidad' value='"+precio_u+"' />"+
                "</td>"+
                "<td style='width: 30%; text-align: center'>"+
                    "<input type='text' class='gm-form-control decimal promobox-global-valor-total' value='"+precio_t+"' />"+
                "</td>"+
                "<td style='width: 10%; text-align: right'>"+
                    "<button type='button' class='gm-btn danger btnRemovePromoBoxGlobal'><span class='fa fa-trash'></span></button>"+
                "</td>"+
            "</tr>"
        );
    },
    addProduct: function(cant=1, id=0, title=""){
        $("#promoboxes-productos-kit").append(
            "<tr class='producto-tmp' data-producto-id='"+id+"'>"+
                "<td style='width: 80px; text-align: center'>"+
                    "<input type='text' class='gm-form-control producto-tmp-cantidad' value='"+cant+"' />"+
                "</td>"+
                "<td style='text-align: center'>"+
                    "<label class='producto-tmp-titulo'>"+title+"</label>"+
                "</td>"+
                "<td style='text-align: right'>"+
                    "<button type='button' class='gm-btn danger btnRemoveProductPromo'><span class='fa fa-trash'></span></button>"+
                "</td>"+
            "</tr>"
        );
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
            var txt_category_n1 = $("#frmPromotion-txtCategoriaN1");
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

        var categoria_n1_id = $("#frmPromotion-txtCategoriaN2");
        if(categoria_n1_id>0){
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
    }
}

frmPromocion.initialize();


var ucPropiedades = {
    pagina: 1,
    ajax_url: "/ajax/xhr.php",
    total_paginas: 1,
    initialize: function(){
        var $this = this;

        $(".gm-uc-sidebar").css("top", $(".gm-uc-page-header").outerHeight()+$(".gm-header").outerHeight()+"px");

        $(".gm-filter").on("change keyup", function(e){
            $this.cargar_datos();
        });

        $("#btnAgregar").click(function(){
            frmPropiedadesAgregar.open(0, 0, true, false, function(){
                $this.cargar_datos();
            });
        });

        $("#ucPropiedades-lstPropiedades").on("click",".btnBorrar", function(e){
            $this.borrar($(this).closest(".gm-itembox").data("id"));
            e.stopPropagation();
        });

        $("#ucPropiedades-lstPropiedades").on("click",".btnAgregarPago", function(e){
            var parent = $(this).closest(".gm-itembox");
            var propiedad_id = parent.data("id");
            var periodo = parent.data("periodo-pago");
            var precio = parent.data("precio");
            var iva = parent.data("iva");
            var importe = parent.data("importe");

            $("#frmPropiedadesPagoAlquiler-PropiedadId").val(propiedad_id);
            $("#frmPropiedadesPagoAlquiler-lstDetalles").empty();
            frmPropiedadesPagoAlquiler_agregarDetalle("Alquiler "+periodo, precio, iva, importe);
            $.GMWindowManager.open($("#frmPropiedadesPagoAlquiler"));
            e.stopPropagation();
        });

        $("#ucPropiedades-lstPropiedades").on("click",".gm-itembox", function(e){
            $this.editar($(this).data("id"));
        });

        $(".btn-facebook").click(function(){
            FB.ui({
                method: 'share',
                href: 'https://developers.facebook.com/docs/',
            }, function(response){});
        });

        //PAGINADOR
        $("#btnPrimero").click(function(e){
            $this.pagina=1;
            $this.cargar_datos();
            window.scrollTo(0, 0);
            return false;
        });

        $("#btnAnterior").click(function(e){
            $this.pagina-=1;
            $this.cargar_datos();
            window.scrollTo(0, 0);
            return false;
        });

        $("#btnSiguiente").click(function(e){
            $this.pagina+=1;
            $this.cargar_datos();
            window.scrollTo(0, 0);
            return false;
        });
        $("#btnUltimo").click(function(e){
            $this.pagina=$this.total_paginas;
            $this.cargar_datos();
            window.scrollTo(0, 0);
            return false;
        });

        $(".paginate_button").click(function(e){
            $this.cargar_datos();
            window.scrollTo(0, 0);
            return false;
        });

        //CARGAS GENERALES
        $this.cargar_datos();
        $this.cargar_tipos();
        $this.cargar_consorcios();
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
                url: 'modules/propiedades/ajax/propiedades_xhr.php',
                data: {topic: "borrar", id: id},
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Registro borrado!", "La propiedad ha sido borrada.", "success");
                        $this.cargar_datos();
                    }
                    else{
                        swal("Error al borrar!", error, "error");
                    }
                }
            });
        });
    },
    cargar_tipos: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: 
            { 
                module: "properties_types", 
                topic: "listar", 
                order_by: "nombre", 
                order_type: "asc"
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            var registros = data.Response.Registros;
            $("#ucPropiedades-txtTipoPropiedad").empty();
            if(data.Error==""){
                $("#ucPropiedades-txtTipoPropiedad").append("<option value='0' selected>Cualquier tipo</option>");
                for (var i = 0; i<registros.length; i++) {
                    $("#ucPropiedades-txtTipoPropiedad").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
        });
    },
    cargar_consorcios: function(){
        /*
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
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
            $("#ucPropiedades-txtConsorcio").empty();
            if(data.Error==""){
                $("#ucPropiedades-txtConsorcio").append("<option value='0' selected>Consorcio</option>");
                for (var i = 0; i<registros.length; i++) {
                    $("#ucPropiedades-txtConsorcio").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
        });
        */
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
                module: "properties", 
                topic: "listar", 
                filtro: $("#txtBuscar").val(), 
                ordenar_por: $("#ucPropiedades-txtOrdenarPor").val(), 
                orden: $("#ucPropiedades-txtOrden").val(), 
                pagina : $this.pagina,
                tipo_propiedad_id: $("#ucPropiedades-txtTipoPropiedad").val(),
                consorcio_id: $("#ucPropiedades-txtConsorcio").val(),
                operacion_id: $("#ucPropiedades-txtOperacion").val(),
                estado_id: $("#ucPropiedades-txtDisponibilidad").val(),
                vencidos: $("#ucPropiedades-txtEstadoPago").val()
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            var registros = data.Response.Registros;
            var inicio = data.Response.Inicio;
            var fin = data.Response.Fin;
            var total_registros = data.Response.TotalRegistros;
            $this.total_paginas = data.Response.TotalPaginas;

            $(".gm-itembox-container").empty();
            if(data.Error==""){
                if(registros.length>0){
                    for (var i = 0; i<registros.length; i++) {
                        var color = "#777";
                        var EstadoPago = "";
                        if(registros[i].Publicado==true) color = "#12960c";
                        else color = "#c61111";
    
                        var priceBox = "<span style='color: #12960c; font-size: 24px'>$ "+registros[i].Importe+"</span>";
                        if(registros[i].EstadoId==2){
                            if(registros[i].DiasVencimiento<0){
                                EstadoPago="<span class='gm-itembox-additional-info' style='color: #f00'> VENCIDO</span>";
                                EstadoPago+=" ("+registros[i].DiasVencimiento+" días)";
                            } else {
                                EstadoPago="<span class='gm-itembox-additional-info' style='color: #1a7537'> EN TÉRMINO</span>";
                            }
                        }

                        $(".gm-itembox-container").append(
                            "<div class='gm-itembox editable' "+ 
                                " data-id='"+registros[i].Id+"'"+
                                " data-periodo-pago='"+registros[i].PeriodoPago+"'"+
                                " data-precio='"+registros[i].AlquilerPrecio+"'"+
                                " data-iva='"+registros[i].IVA+"'"+
                                " data-importe='"+registros[i].AlquilerImporte+"'>"+
                                "<div class='gm-itembox-imgcontainer' style='border: 1px solid #ccc; background-color: #fff'>"+
                                    "<img src='"+registros[i].ImagenRuta+"' style='width: 100%' />"+
                                "</div>"+
                                "<div class='inline'>"+
                                    "<div class='gm-itembox-title'>"+registros[i].Titulo+"</div>"+
                                    " <span class='gm-itembox-additional-info'><i class='fas fa-calendar-alt'></i> "+registros[i].FechaAltaStr+"</span>"+
                                    ((registros[i].ConsorcioId>0) ? " <span class='gm-itembox-additional-info'><i class='fas fa-building'></i> "+registros[i].Consorcio+"</span>" : "")+
                                    ((registros[i].OperacionId>0) ? " <br /><span class='gm-itembox-additional-info'><i class='fas fa-exchange-alt'></i> "+registros[i].Operacion+"</span>" : "")+
                                    (registros[i].EstadoId>0 ? " <span class='gm-itembox-additional-info' style='color: #333'><i class='fa fa-circle'></i> "+registros[i].Estado+"</span>" : "")+
                                    (registros[i].EstadoId==2 ? " <span class='gm-itembox-additional-info' style='color: #333'><i class='far fa-clock'></i> "+registros[i].ProxVtoStr+"</span>" : "")+
                                    EstadoPago+
                                    "<div>"+
                                        "<div style='display: inline-block; padding-right: 10px;'>Alquiler: $ "+registros[i].AlquilerImporte+"</div>"+
                                        "<div style='display: inline-block; padding-right: 10px;'>Venta: $ "+registros[i].VentaImporte+"</div>"+
                                    "</div>"+
                                    " <br /><span class='gm-itembox-additional-info' style='color: #333'><i class='fa fa-archive'></i> "+registros[i].Carpeta+"</span>"+
                                    " <br /><span class='gm-itembox-additional-info' style='color: #333'><i class='fa fa-user'></i> Creado por: "+registros[i].Creador+"</span>"+
                                    " <span class='gm-itembox-additional-info' style='color: #333'><i class='fa fa-user'></i> Última modificación: "+registros[i].UltimaModificacion+"</span>"+
                                "</div>"+
                                "<div class='gm-itembox-buttons' style='margin-top: 10px'>"+
                                    (registros[i].EstadoId==2 ? "<button type='button' class='gm-btn success btnAgregarPago'><span class='fa fa-dollar-sign'></span></button>" : "")+
                                    //"<button type='button' class='gm-btn primary btnCompartir'><span class='fa fa-share-alt'></span></button>"+
                                    //"<button type='button' class='gm-btn primary btnPublicar'><span class='fa fa-share'></span></button>"+
                                    "<button type='button' class='gm-btn danger btnBorrar'><span class='fa fa-trash'></span></button>"+
                                "</div>"+
                            "</div>"
                        );
                    }
                    $("#gm-uc-page-footer-registers").html(registros.length);
                    $("#gm-uc-page-footer-total-registers").html(data.Response.TotalRegistros);
                    $("#gm-uc-page-footer-pages").html(data.Response.TotalPaginas);
                    $("#gm-uc-page-footer-page").html($this.pagina);
    
                    //Paginador
                    $(".gm-pager").empty();
                    if($this.pagina>1) $(".gm-pager").append("<button id='btnAnterior'>Anterior</button>");
                    for (var i=1; i<=$this.total_paginas;i++)
                    {
                        if($this.pagina==i)
                            $(".gm-pager").append("<button disabled>"+i+"</button>");
                        else
                            $(".gm-pager").append("<button class='paginate_button' data-pagina='"+i+"'>"+i+"</button>");
                    }
                    if($this.pagina<$this.total_paginas) $(".gm-pager").append("<button id='btnSiguiente'>Siguiente</button>");
                } else {
                    $(".gm-itembox-container").append("<div class='gm-empty-content'><img style='width: 80%; max-width: 350px;' src='/panel/images/house.gif' /><br/>No se encontraron propiedades.</div>");
                    $(".gm-itembox-container").addClass("empty");
                }
            }
            else{
                $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
            }
            $("#output-loader").css("display", "none");
        });
    },
    editar: function(id){
        var $this = this;
        frmPropiedadesAgregar.open(id, 0, true, false, function(){
            $this.cargar_datos();
        });
    }
}

ucPropiedades.initialize();
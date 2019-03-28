/*
* Grupo Marostica - md-propiedades.js
* Franco Marostica
* Last revision 05/04/2018
*/

var frmPropiedadesAgregar = {
    files: [],
    expensas: [],
    pagos: [],
    garantes: [],
    PaisId: 9,
    PaisN1Id: 5,
    origen: "",
    minimal_view: false,
    ajax_url: "/ajax/xhr.php",
    element: $("#frmPropiedadesAgregar"),
    initialize: function(){
        var $this = this;
        //this.cargar_canales();
        //this.cargar_consorcios();
        this.cargar_paises();
        this.cargar_paises_n1();
        $this.element.find(".btn-save").click(function(){
            $this.guardar();
        });
        $("#frmPropiedadesAgregar-txtPais").change(function(){
            $this.cargar_paises_n1($(this).val());
        });
        $(".gm-modal-header-addons").on("click", "#frmPropiedadesAgregar-btnAddImages", function(e) {
            $("<input accept='image/*'>").prop({
                "type": "file",
                "multiple": true
            }).on("change", function(e) {
                $this.files.push(this.files);
                $this.preview_images(this);
            }).trigger("click");
        });

        $("#frmPropiedadesAgregar-txtContratoDuracion").on("change keyup", function(){
            let fecha = $("#frmPropiedadesAgregar-txtContratoAlta").val();
            let months = parseInt($(this).val());
            let fecha_fin = (new Date(fecha).add(months).month()).toString("yyyy-MM-dd");
            $("#frmPropiedadesAgregar-txtContratoVto").val(fecha_fin);
            //console.log("Date changed: "+fecha+" seted with "+months+" months. New date: "+fecha_fin.toString("yyyy-MM-dd"));
        });
    },
    cargar_canales: function(){
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
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#frmPropiedadesAgregar-txtCanal").empty();
                if(data.Error==""){
                    $("#frmPropiedadesAgregar-txtCanal").append("<option value='0' selected>Sin especificar</option>");
                    for (var i = 0; i<registros.length; i++) {
                        $("#frmPropiedadesAgregar-txtCanal").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }
                }
            }
        });
    },
    cargar_consorcios: function(selected=0){
        var $this = this;

        $("#frmPropiedadesAgregar-txtConsorcio").empty();
        $.ajax({
            url: $this.ajax_url,
            data: 
            { 
                topic: "listar", 
                limite: 0
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#frmPropiedadesAgregar-txtConsorcio").empty();
                if(data.Error==""){
                    $("#frmPropiedadesAgregar-txtConsorcio").append("<option value='0'>Sin especificar</option>");
                    for (var i = 0; i<registros.length; i++) {
                        if(registros[i].Id==selected) $("#frmPropiedadesAgregar-txtConsorcio").append("<option value='"+registros[i].Id+"' selected>"+registros[i].Nombre+"</option>");
                        else $("#frmPropiedadesAgregar-txtConsorcio").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }
                }
            }
        });
    },
    cargar_paises: function(){
        $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: 
            { 
                module: "countries", 
                topic: "get_list", 
                col: $("#col").val(), 
                order: $("#order").val(),
                limite: 0
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            var registros = data.Response.Registros;
            $("#frmPropiedadesAgregar-txtPais").empty();
            if(data.Error==""){
                $("#frmPropiedadesAgregar-txtPais").append("<option value='0'>Sin especificar</option>");
                for (var i = 0; i<registros.length; i++) {
                    if(registros[i].Id==$this.PaisId) $("#frmPropiedadesAgregar-txtPais").append("<option value='"+registros[i].Id+"' selected>"+registros[i].Nombre+"</option>");
                    else $("#frmPropiedadesAgregar-txtPais").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
        });
    },
    cargar_paises_n1: function(pais_id){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: 
            { 
                module: "countries_n1", 
                topic: "get_list",
                pais_id: pais_id
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#frmPropiedadesAgregar-txtPaisN1").empty();
                if(data.Error==""){
                    $("#frmPropiedadesAgregar-txtPaisN1").append("<option value='0'>Sin especificar</option>");
                    for (var i = 0; i<registros.length; i++) {
                        if(registros[i].Id==$this.PaisN1Id) $("#frmPropiedadesAgregar-txtPaisN1").append("<option value='"+registros[i].Id+"' selected>"+registros[i].Nombre+"</option>");
                        else $("#frmPropiedadesAgregar-txtPaisN1").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }
                }
            }
        });
    },
    open: function(id, consorcio_id=0, allow_change_consorcios=true, minimal_view=false, caller=null){
        var $this = this;
        this.minimal_view = minimal_view;
        this.caller = caller;

        if(allow_change_consorcios){
            $("#frmPropiedadesAgregar-txtConsorcio").prop("disabled", false);
        } else {
            if(consorcio_id==0){
                $("#frmPropiedadesAgregar-txtConsorcio").empty();
                $("#frmPropiedadesAgregar-txtConsorcio").append("<option value='0'>NUEVO</option>");
                $("#frmPropiedadesAgregar-txtConsorcio>option[value='0']").prop("selected", true);
            }
            $("#frmPropiedadesAgregar-txtConsorcio").prop("disabled", false);
        }
        if(id>0){
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "properties", 
                    topic: "obtener", 
                    id: id 
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    var Propiedad = data.Response;
                    var imagenes = data.Response.Imagenes;
                    $("#frmPropiedadesAgregar-lstImagenes").empty();
                    $("#frmPropiedadesAgregar-lblTitulo").html("Editar propiedad");
                    $("#frmPropiedadesAgregar-hId").val(Propiedad.Id);
                    $("#frmPropiedadesAgregar-hImagenPrincipal").val(Propiedad.Imagen);
                    $("#frmPropiedadesAgregar-txtFechaAlta").val(Propiedad.FechaAlta);
                    $("#frmPropiedadesAgregar-txtFechaAlta").prop("disabled", true);
                    $("#frmPropiedadesAgregar-txtConsorcio>option[value='"+Propiedad.ConsorcioId+"']").prop("selected", true);
                    $("#frmPropiedadesAgregar-txtTipoPropiedad>option[value='"+Propiedad.TipoId+"']").prop("selected", true);
                    $("#frmPropiedadesAgregar-txtTipoPropiedad").change();
                    $("#frmPropiedadesAgregar-txtOperacion>option[value='"+Propiedad.OperacionId+"']").prop("selected", true);
                    $("#frmPropiedadesAgregar-txtOperacion").change();
                    $("#frmPropiedadesAgregar-txtSupTotal").val(Propiedad.SuperficieTotal);
                    $("#frmPropiedadesAgregar-txtSupFrente").val(Propiedad.SuperficieFrente);
                    $("#frmPropiedadesAgregar-txtSupFondo").val(Propiedad.SuperficieFondo);
                    $("#frmPropiedadesAgregar-txtSupCubierta").val(Propiedad.SuperficieCubierta);
                    $("#frmPropiedadesAgregar-txtAntiguedad").val(Propiedad.Antiguedad);
                    if(Propiedad.AEstrenar) $("#frmPropiedadesAgregar-chPropiedadNueva").prop("checked", true); else $("#frmPropiedadesAgregar-chPropiedadNueva").prop("checked", false);
                    $("#frmPropiedadesAgregar-chPropiedadNueva").change();
                    
                    $("#frmPropiedadesAgregar-txtCarpetaSucursal").val(Propiedad.CarpetaSucursalStr);
                    $("#frmPropiedadesAgregar-txtCarpetaNumero").val(Propiedad.CarpetaNumeroStr);
                    $("#frmPropiedadesAgregar-txtCarpetaExtra").val(Propiedad.CarpetaExtraStr);

                    $("#frmPropiedadesAgregar-txtEstado>option[value='"+Propiedad.EstadoId+"']").prop("selected", true);
                    $("#frmPropiedadesAgregar-txtEstado").change();
                    $("#frmPropiedadesAgregar-hEstadoAnterior").val(Propiedad.EstadoId);

                    $("#frmPropiedadesAgregar-txtTitulo").val(Propiedad.Titulo);
                    $("#frmPropiedadesAgregar-txtDescripcion").val(Propiedad.Descripcion);

                    $("#frmPropiedadesAgregar-txtAlquilerMoneda>option[value='"+Propiedad.AlquilerMoneda+"']").prop("selected", true);
                    $("#frmPropiedadesAgregar-txtVentaMoneda>option[value='"+Propiedad.VentaMoneda+"']").prop("selected", true);
                    
                    $("#frmPropiedadesAgregar-txtIVA").val(Propiedad.IVA);

                    $("#frmPropiedadesAgregar-txtVentaImporte").val(Propiedad.VentaImporte);
                    $("#frmPropiedadesAgregar-txtVentaPrecio").val(Propiedad.VentaPrecio);
                    $("#frmPropiedadesAgregar-txtVentaComision").val(Propiedad.VentaComision);
                    $this.calcular_alquiler_importe();

                    $("#frmPropiedadesAgregar-txtAlquilerImporte").val(Propiedad.AlquilerImporte);
                    $("#frmPropiedadesAgregar-txtAlquilerPrecio").val(Propiedad.AlquilerPrecio);
                    $("#frmPropiedadesAgregar-txtAlquilerComisionInicial").val(Propiedad.AlquilerComisionInicial);
                    $("#frmPropiedadesAgregar-txtAlquilerComisionMensual").val(Propiedad.AlquilerComisionMensual);
                    $this.calcular_alquiler_importe();
                    
                    if(Propiedad.Publicado)
                        $("#frmPropiedadesAgregar-chPublicar").prop("checked", true);
                    else
                        $("#frmPropiedadesAgregar-chPublicar").prop("checked", false);

                    if(Propiedad.Destacado)
                        $("#frmPropiedadesAgregar-chDestacar").prop("checked", true);
                    else
                        $("#frmPropiedadesAgregar-chDestacar").prop("checked", false);

                    //Carga Imágenes
                    for (var i = 0; i<imagenes.length; i++){
                        var selected = (Propiedad.Imagen==imagenes[i].Nombre) ? true : false;
                        $this.add_photo(imagenes[i].Id, imagenes[i].Nombre, imagenes[i].Ruta, "", selected);
                    }

                    //Ambientes
                    $("#frmPropiedadesAgregar-txtDormitorios").val(Propiedad.Dormitorios);
                    $("#frmPropiedadesAgregar-txtBaños").val(Propiedad.Baños);
                    $("#frmPropiedadesAgregar-txtAmbientes").val(Propiedad.Ambientes);
                    if(Propiedad.Cochera) $("#frmPropiedadesAgregar-chCochera").prop("checked", true); else $("#frmPropiedadesAgregar-chCochera").prop("checked", false);
                    if(Propiedad.Piscina) $("#frmPropiedadesAgregar-chPiscina").prop("checked", true); else $("#frmPropiedadesAgregar-chPiscina").prop("checked", false);
                    if(Propiedad.Quincho) $("#frmPropiedadesAgregar-chQuincho").prop("checked", true); else $("#frmPropiedadesAgregar-chQuincho").prop("checked", false);
                    if(Propiedad.HabitacionServicio) $("#frmPropiedadesAgregar-chHabServicio").prop("checked", true); else $("#frmPropiedadesAgregar-chHabServicio").prop("checked", false);
                    if(Propiedad.CocinaComedor) $("#frmPropiedadesAgregar-chCocinaComedor").prop("checked", true); else $("#frmPropiedadesAgregar-chCocinaComedor").prop("checked", false);
                    if(Propiedad.Patio) $("#frmPropiedadesAgregar-chPatio").prop("checked", true); else $("#frmPropiedadesAgregar-chPatio").prop("checked", false);
                    if(Propiedad.Jardin) $("#frmPropiedadesAgregar-chJardin").prop("checked", true); else $("#frmPropiedadesAgregar-chJardin").prop("checked", false);

                    //ubicaciones
                    $("#frmPropiedadesAgregar-txtPais>option[value='"+Propiedad.PaisId+"']").prop("selected", true);
                    $("#frmPropiedadesAgregar-txtPais").change();
                    $("#frmPropiedadesAgregar-txtPaisN1>option[value='"+Propiedad.PaisN1Id+"']").prop("selected", true);
                    $("#frmPropiedadesAgregar-txtLocalidad").val(Propiedad.Localidad);
                    $("#frmPropiedadesAgregar-txtBarrio").val(Propiedad.Barrio);
                    $("#frmPropiedadesAgregar-txtDireccion").val(Propiedad.Direccion);
                    $("#frmPropiedadesAgregar-txtCP").val(Propiedad.CP);
                    $("#frmPropiedadesAgregar-txtPiso").val(Propiedad.Piso);
                    $("#frmPropiedadesAgregar-txtDtoOf").val(Propiedad.DtoOf);
                    
                    $("#frmPropiedadesAgregar-AgenteId").val(Propiedad.AgenteId);
                    $("#frmPropiedadesAgregar-PropietarioId").val(Propiedad.PropietarioId);
                    $("#frmPropiedadesAgregar-LocatarioId").val(Propiedad.LocatarioId);
                    $("#frmPropiedadesAgregar-VendedorId").val(Propiedad.VendedorId);

                    $("#frmPropiedadesAgregar-txtCuentaRentas").val(Propiedad.CuentaRentas);
                    $("#frmPropiedadesAgregar-txtCuentaDFTA").val(Propiedad.CuentaDFTA);
                    $("#frmPropiedadesAgregar-txtCuentaMunicipalidad").val(Propiedad.CuentaMunicipalidad);
                    $("#frmPropiedadesAgregar-txtMatricula").val(Propiedad.Matricula);
                    $("#frmPropiedadesAgregar-txtCuentaAgua").val(Propiedad.CuentaAgua);
                    $("#frmPropiedadesAgregar-txtCuentaLuz").val(Propiedad.CuentaLuz);
                    $("#frmPropiedadesAgregar-txtPH").val(Propiedad.PH);
                    $("#frmPropiedadesAgregar-txtDescripcionInterna").val(Propiedad.DescripcionInterna);

                    if(Propiedad.Agente!="") $("#frmPropiedadesAgregar-btnAgente").html(Propiedad.Agente);
                    if(Propiedad.Propietario!="") $("#frmPropiedadesAgregar-btnPropietario").html(Propiedad.Propietario);
                    if(Propiedad.Locatario!="") $("#frmPropiedadesAgregar-btnLocatario").html(Propiedad.Locatario);
                    if(Propiedad.Vendedor!="") $("#frmPropiedadesAgregar-btnVendedor").html(Propiedad.Vendedor);

                    $.GMWindowManager.open($("#frmPropiedadesAgregar"));
                }
            });
        } else {
            $("#frmPropiedadesAgregar-lblTitulo").html("Agregar propiedad");
            $("#frmPropiedadesAgregar-hId").val("0");
            $("#frmPropiedadesAgregar-txtFechaAlta").prop("disabled", false);
            $("#frmPropiedadesAgregar-txtConsorcio>option:eq(0)").prop("selected", true);
            $("#frmPropiedadesAgregar-txtConsorcio").change();
            $("#frmPropiedadesAgregar-txtTipoPropiedad>option:eq(0)").prop("selected", true);
            $("#frmPropiedadesAgregar-txtTipoPropiedad").change();
            $("#frmPropiedadesAgregar-txtOperacion>option:eq(0)").prop("selected", true);
            $("#frmPropiedadesAgregar-txtOperacion").change();
            $("#frmPropiedadesAgregar-txtEstado>option:eq(0)").prop("selected", true);
            $("#frmPropiedadesAgregar-txtEstado").change();

            $("#frmPropiedadesAgregar-txtSupTotal").val("0.00");
            $("#frmPropiedadesAgregar-txtSupFrente").val("0.00");
            $("#frmPropiedadesAgregar-txtSupFondo").val("0.00");
            $("#frmPropiedadesAgregar-txtSupCubierta").val("0.00");
            $("#frmPropiedadesAgregar-txtAntiguedad").val("0.00");
            $("#frmPropiedadesAgregar-chPropiedadNueva").prop("checked", false);
            $("#frmPropiedadesAgregar-chPropiedadNueva").change();

            $("#frmPropiedadesAgregar-txtContratoMinimo").val("0.00");

            $("#frmPropiedadesAgregar-txtTitulo").val("");
            $("#frmPropiedadesAgregar-txtDescripcion").val("");

            $("#frmPropiedadesAgregar-txtDormitorios").val("0");
            $("#frmPropiedadesAgregar-txtBaños").val("0");
            $("#frmPropiedadesAgregar-txtAmbientes").val("0");

            $("#frmPropiedadesAgregar-chCochera").prop("checked", false);
            $("#frmPropiedadesAgregar-chPiscina").prop("checked", false);
            $("#frmPropiedadesAgregar-chQuincho").prop("checked", false);
            $("#frmPropiedadesAgregar-chHabServicio").prop("checked", false);
            $("#frmPropiedadesAgregar-chCocinaComedor").prop("checked", false);
            $("#frmPropiedadesAgregar-chPatio").prop("checked", false);
            $("#frmPropiedadesAgregar-chJardin").prop("checked", false);
            
            $("#frmPropiedadesAgregar-txtIVA").val("0.00");
            $("#frmPropiedadesAgregar-txtAlquilerPrecio").val("0.00");
            $("#frmPropiedadesAgregar-txtAlquilerIVA").val("0.00");
            $("#frmPropiedadesAgregar-txtAlquilerImporte").val("0.00");
            $("#frmPropiedadesAgregar-txtVentaPrecio").val("0.00");
            $("#frmPropiedadesAgregar-txtVentaIVA").val("0.00");
            $("#frmPropiedadesAgregar-txtVentaImporte").val("0.00");

            $("#frmPropiedadesAgregar-txtPais>option[value='9']").prop("selected", true);
            $("#frmPropiedadesAgregar-txtPais").change();
            $("#frmPropiedadesAgregar-txtLocalidad").val("");
            $("#frmPropiedadesAgregar-txtDireccion").val("");
            $("#frmPropiedadesAgregar-txtCP").val("");
            $("#frmPropiedadesAgregar-txtBarrio").val("");
            $("#frmPropiedadesAgregar-txtPiso").val("");
            $("#frmPropiedadesAgregar-txtDtoOf").val("");

            $("#frmPropiedadesAgregar-txtCarpetaSucursal").val("");
            $("#frmPropiedadesAgregar-txtCarpetaNumero").val("");
            $("#frmPropiedadesAgregar-txtCarpetaExtra").val("");

            $("#frmPropiedadesAgregar-txtCanal>option[value='0']").prop("selected", true);

            $("#frmPropiedadesAgregar-txtCuentaRentas").val("");
            $("#frmPropiedadesAgregar-txtCuentaDFTA").val("");
            $("#frmPropiedadesAgregar-txtCuentaMunicipalidad").val("");
            $("#frmPropiedadesAgregar-txtMatricula").val("");
            $("#frmPropiedadesAgregar-txtCuentaAgua").val("");
            $("#frmPropiedadesAgregar-txtCuentaLuz").val("");
            $("#frmPropiedadesAgregar-txtPH").val("");
            $("#frmPropiedadesAgregar-txtExpensasPorcentaje").val("");
            $("#frmPropiedadesAgregar-txtDescripcionInterna").val("");
            
            $("#frmPropiedadesAgregar-AgenteId").val("0");
            $("#frmPropiedadesAgregar-PropietarioId").val("0");
            $("#frmPropiedadesAgregar-LocatarioId").val("0");
            $("#frmPropiedadesAgregar-VendedorId").val("0");

            $("#frmPropiedadesAgregar-lstImagenes").empty();

            $.GMWindowManager.open($("#frmPropiedadesAgregar"));
        }
    },
    guardar: function(){
        var $this = this;


        var formData = new FormData($('#frmPropiedadesAgregar')[0]);

        $.each($this.files, function() {
            $.each(this, function() {
                formData.append("files[]", this);
            });
        });

        $(".garanteBox").each(function(){
            var garante = { id: $(this).data("id") };
            garantes.push(garante);
        });

        formData.append("module", "properties");
        formData.append("topic", "guardar");
        formData.append("id", $("#frmPropiedadesAgregar-hId").val());
        formData.append("fecha_alta", $("#frmPropiedadesAgregar-txtFechaAlta").val());
        formData.append("titulo", $("#frmPropiedadesAgregar-txtTitulo").val());
        formData.append("descripcion", $("#frmPropiedadesAgregar-txtDescripcion").val());
        formData.append("descripcion_interna", $("#frmPropiedadesAgregar-txtDescripcionInterna").val());
        formData.append("consorcio_id", $("#frmPropiedadesAgregar-txtConsorcio").val());
        formData.append("propiedad_tipo_id", $("#frmPropiedadesAgregar-txtTipoPropiedad").val());
        formData.append("operacion_id", $("#frmPropiedadesAgregar-txtOperacion").val());
        formData.append("estado_id", $("#frmPropiedadesAgregar-txtEstado").val());
        formData.append("iva", $("#frmPropiedadesAgregar-txtIVA").val());
        formData.append("alquiler_moneda", $("#frmPropiedadesAgregar-txtAlquilerMoneda").val());
        formData.append("alquiler_precio", $("#frmPropiedadesAgregar-txtAlquilerPrecio").val());
        formData.append("alquiler_importe", $("#frmPropiedadesAgregar-txtAlquilerImporte").val());
        formData.append("alquiler_comision_inicial", $("#frmPropiedadesAgregar-txtAlquilerComisionInicial").val());
        formData.append("alquiler_comision_mensual", $("#frmPropiedadesAgregar-txtAlquilerComisionMensual").val());
        formData.append("venta_moneda", $("#frmPropiedadesAgregar-txtVentaMoneda").val());
        formData.append("venta_precio", $("#frmPropiedadesAgregar-txtVentaPrecio").val());
        formData.append("venta_importe", $("#frmPropiedadesAgregar-txtVentaImporte").val());
        formData.append("venta_comision", $("#frmPropiedadesAgregar-txtVentaComision").val());
        formData.append("expensas_importe", $("#frmPropiedadesAgregar-txtExpensasImporte").val());
        formData.append("expensas_porcentaje", $("#frmPropiedadesAgregar-txtExpensasPorcentaje").val());
        formData.append("imagen", $("#frmPropiedadesAgregar-ImagenPrincipal").val());
        formData.append("publicado", $("#frmPropiedadesAgregar-chPublicar").is(":checked"));
        formData.append("destacado", $("#frmPropiedadesAgregar-chDestacar").is(":checked"));
        formData.append("agente_id", $("#frmPropiedadesAgregar-AgenteId").val());
        formData.append("propietario_id", $("#frmPropiedadesAgregar-PropietarioId").val());
        formData.append("locatario_id", $("#frmPropiedadesAgregar-LocatarioId").val());
        formData.append("comprador_id", $("#frmPropiedadesAgregar-CompradorId").val());
        formData.append("vendedor_id", $("#frmPropiedadesAgregar-VendedorId").val());

        formData.append("sup_total", $("#frmPropiedadesAgregar-txtSupTotal").val());
        formData.append("sup_frente", $("#frmPropiedadesAgregar-txtSupFrente").val());
        formData.append("sup_fondo", $("#frmPropiedadesAgregar-txtSupFondo").val());
        formData.append("sup_cubierta", $("#frmPropiedadesAgregar-txtSupCubierta").val());
        formData.append("antiguedad", $("#frmPropiedadesAgregar-txtAntiguedad").val());
        formData.append("a_estrenar", $("#frmPropiedadesAgregar-chPropiedadNueva").is(":checked"));
        formData.append("prox_vto", $("#frmPropiedadesAgregar-txtProxVto").val());
        formData.append("contrato_alta", $("#frmPropiedadesAgregar-txtContratoAlta").val());
        formData.append("contrato_vto", $("#frmPropiedadesAgregar-txtContratoVto").val());

        formData.append("carpeta_sucursal", $("#frmPropiedadesAgregar-txtCarpetaSucursal").val());
        formData.append("carpeta_numero", $("#frmPropiedadesAgregar-txtCarpetaNumero").val());
        formData.append("carpeta_extra", $("#frmPropiedadesAgregar-txtCarpetaExtra").val());

        formData.append("canal_id", $("#frmPropiedadesAgregar-txtCanal").val());
        formData.append("cuenta_rentas", $("#frmPropiedadesAgregar-txtCuentaRentas").val());
        formData.append("cuenta_dfta", $("#frmPropiedadesAgregar-txtCuentaDFTA").val());
        formData.append("cuenta_municipalidad", $("#frmPropiedadesAgregar-txtCuentaMunicipalidad").val());
        formData.append("matricula", $("#frmPropiedadesAgregar-txtMatricula").val());
        formData.append("cuenta_agua", $("#frmPropiedadesAgregar-txtCuentaAgua").val());
        formData.append("cuenta_luz", $("#frmPropiedadesAgregar-txtCuentaLuz").val());
        formData.append("ph", $("#frmPropiedadesAgregar-txtPH").val());
        
        formData.append("pagos", JSON.stringify($this.pagos));
        formData.append("garantes", JSON.stringify($this.garantes));

        formData.append("periodo_mes", $("#frmPropiedadesPagar-txtMes").val());
        formData.append("periodo_año", $("#frmPropiedadesPagar-txtAño").val());

        //ubicacion
        formData.append("pais_id", $("#frmPropiedadesAgregar-txtPais").val());
        formData.append("pais_n1_id", $("#frmPropiedadesAgregar-txtPaisN1").val());
        formData.append("localidad", $("#frmPropiedadesAgregar-txtLocalidad").val());
        formData.append("direccion", $("#frmPropiedadesAgregar-txtDireccion").val());
        formData.append("cp", $("#frmPropiedadesAgregar-txtCP").val());
        formData.append("barrio", $("#frmPropiedadesAgregar-txtBarrio").val());
        formData.append("piso", $("#frmPropiedadesAgregar-txtPiso").val());
        formData.append("dto_of", $("#frmPropiedadesAgregar-txtDtoOf").val());

        //ambientes
        formData.append("dormitorios", $("#frmPropiedadesAgregar-txtDormitorios").val());
        formData.append("baños", $("#frmPropiedadesAgregar-txtBaños").val());
        formData.append("ambientes", $("#frmPropiedadesAgregar-txtAmbientes").val());
        formData.append("cochera", $("#frmPropiedadesAgregar-chCochera").is(":checked"));
        formData.append("piscina", $("#frmPropiedadesAgregar-chPiscina").is(":checked"));
        formData.append("quincho", $("#frmPropiedadesAgregar-chQuincho").is(":checked"));
        formData.append("habitacion_servicio", $("#frmPropiedadesAgregar-chHabServicio").is(":checked"));
        formData.append("cocina_comedor", $("#frmPropiedadesAgregar-chCocinaComedor").is(":checked"));
        formData.append("patio", $("#frmPropiedadesAgregar-chPatio").is(":checked"));
        formData.append("jardin", $("#frmPropiedadesAgregar-chJardin").is(":checked"));

        formData.append("publicacion_tipo_id", $("#frmPropiedadesAgregar-txtPublicacionTipo").val());
        formData.append("publicacion_tipo", $("#frmPropiedadesAgregar-txtPublicacionTipo option:selected").text());

        $.GMWindowManager.open($("#gm-modalwait"));

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
                $.GMWindowManager.close($("#gm-modalwait"));
                var id = $("#frmPropiedadesAgregar-hId").val();
                var origen = $("#frmPropiedadesAgregar-Origen").val();
                var error = data.Error;
                var response = data.Response;
                if(error.length>0){
                    alert(error);
                }
                else{
                    files = [];
                    $("#frmPropiedadesAgregar-hId").val(response.PropiedadId);
                    $("#frmPropiedadesAgregar-lstImagenes").empty();
                    if(data.ComprobanteId>0) window.open("/panel/comprobantes/?id='"+data.ComprobanteId+"'");
                    if(origen=="frmConsorciosAgregar" && id==0){
                        frmConsorciosAgregar_agregarPropiedad(response.PropiedadId, $("#frmPropiedadesAgregar-txtTitulo").val(), $("#frmPropiedadesAgregar-txtExpensasPorcentaje").val());
                    }
                    $.GMWindowManager.close($("#frmPropiedadesAgregar"));
                    var response = {
                        id: response.PropiedadId,
                        titulo: $("#frmPropiedadesAgregar-txtTitulo").val(),
                        porcentaje_exp: $("#frmPropiedadesAgregar-txtExpensasPorcentaje").val()
                    }
                    $this.caller(response);
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    },
    preview_images: function(input){
        var fileList = input.files;
        var anyWindow = window.URL || window.webkitURL;
        for (var i = 0; i < fileList.length; i++) 
        {
            var objectUrl = anyWindow.createObjectURL(fileList[i]);
            var size = (fileList[i].size / 1024);
            $this.add_photo(0, fileList[i].name, objectUrl);
            window.URL.revokeObjectURL(fileList[i]);
        }
    },
    calcular_alquiler_importe: function(){
        var precio = 0;
        var iva = 0;
        var importe = 0;

        if($("#frmPropiedadesAgregar-txtAlquilerPrecio").val().length > 0) 
            precio = parseFloat($("#frmPropiedadesAgregar-txtAlquilerPrecio").val());
        else
            $("#frmPropiedadesAgregar-txtAlquilerPrecio").val("0");
        
        if($("#frmPropiedadesAgregar-txtIVA").val().length > 0)
            iva = parseFloat($("#frmPropiedadesAgregar-txtIVA").val());

        importe = precio + ((precio * iva) / 100);
        importef = Math.round(importe * 100) / 100
        $("#frmPropiedadesAgregar-txtAlquilerImporte").val(importef.toString());
    },
    add_photo: function(id, img_name, img_url, alt="", selected=false){
        var selected_str = (selected==true) ? "active" : "";
        $("#frmPropiedadesAgregar-lstImagenes").append(
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
        if(selected) $("#frmPropiedadesAgregar-ImagenPrincipal").val(img_name);
    },
    progressHandlingFunction: function(e){
        if(e.lengthComputable)
        {
            var max = e.total;
            var current = e.loaded;

            var Percentage = (current * 100)/max;

            $('.progress-bar-wait').width(Percentage+"%");
            $('.percent').html(Percentage.toFixed(2)+"%");

            if(Percentage >= 100){
                // process completed  
            }
        }
    }
}

frmPropiedadesAgregar.initialize();


$("#frmPropiedadesAgregar-btnConsorcioAgregar").click(function(e){
    $("#frmConsorcioAgregar").modal("show");
    $("#frmConsorcioAgregar-Origen").val("frmPropiedadesAgregar");
});

$("#frmPropiedadesAgregar-chPropiedadNueva").change(function(e){
    if($(this).is(":checked")){
        $("#frmPropiedadesAgregar-txtAntiguedad").prop("disabled", true);
    } else {
        $("#frmPropiedadesAgregar-txtAntiguedad").prop("disabled", false);
    }
});

$("#frmPropiedadesAgregar-txtIVA").on("change paste keyup", function(){
    var valor = $(this).val();
    $("#frmPropiedadesAgregar-txtAlquilerIVA").val(valor);
    $("#frmPropiedadesAgregar-txtVentaIVA").val(valor);
    calcularAlquilerImporte();
    calcularVentaImporte();
});
$("#frmPropiedadesAgregar-txtAlquilerPrecio").on("change paste keyup", function(){
    calcularAlquilerImporte();
});
$("#frmPropiedadesAgregar-txtAlquilerImporte").on("change paste keyup", function(){
    calcularAlquilerPrecio();
});
$("#frmPropiedadesAgregar-txtVentaPrecio").on("change paste keyup", function(){
    calcularVentaImporte();
});
$("#frmPropiedadesAgregar-txtVentaImporte").on("change paste keyup", function(){
    calcularVentaPrecio();
});
$("#frmPropiedadesAgregar-tabBtnGeneral").click(function(){
    $("#frmPropiedadesAgregar-header-addons").empty();
});
$("#frmPropiedadesAgregar-tabBtnImagenes").click(function(){
    $("#frmPropiedadesAgregar-header-addons").empty();
    $("#frmPropiedadesAgregar-header-addons").append("<button id='frmPropiedadesAgregar-btnAddImages' class='gm-btn main' type='button'><i class='fa fa-plus fa-fw'></i></button>");
});



$("#frmPropiedadesAgregar-btnAgente").click(function(e){
    frmUsuariosSeleccionar.open(function(data){
        $("#frmPropiedadesAgregar-btnAgente").html(data.RazonSocial);
    });
});

$("#frmPropiedadesAgregar-btnPropietario").click(function(e){
    frmUsuariosSeleccionar.open(function(data){
        $("#frmPropiedadesAgregar-btnPropietario").html(data.RazonSocial);
    });
});

$("#frmPropiedadesAgregar-btnLocatario").click(function(e){
    frmUsuariosSeleccionar.open(function(data){
        $("#frmPropiedadesAgregar-btnLocatario").html(data.RazonSocial);
    });
});

$("#frmPropiedadesAgregar-btnComprador").click(function(e){
    frmUsuariosSeleccionar.open(function(data){
        $("#frmPropiedadesAgregar-btnComprador").html(data.RazonSocial);
    });
});

$("#frmPropiedadesAgregar-btnVendedor").click(function(e){
    frmUsuariosSeleccionar.open(function(data){
        $("#frmPropiedadesAgregar-btnVendedor").html(data.RazonSocial);
    });
});

$("#frmPropiedadesAgregar-btnAgregarGarante").click(function(e){
    frmUsuariosSeleccionar.open(function(data){
        $("#frmPropiedadesAgregar-btnVendedor").html(data.RazonSocial);
    });
});

$("#frmPropiedadesAgregar-lstGarantes").on("click", ".delGarante", function(){
    var $this = $(this);
    $this.closest(".garanteBox").fadeOut();
});

function calcularAlquilerPrecio(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmPropiedadesAgregar-txtAlquilerImporte").val().length > 0) 
        importe = parseFloat($("#frmPropiedadesAgregar-txtAlquilerImporte").val());
    else
        $("#frmPropiedadesAgregar-txtAlquilerImporte").val("0");
    
    if($("#frmPropiedadesAgregar-txtIVA").val().length > 0) 
        iva = parseFloat($("#frmPropiedadesAgregar-txtIVA").val());

    precio = importe / ((100 + iva) / 100);
    preciof = Math.round(precio * 100) / 100

    $("#frmPropiedadesAgregar-txtAlquilerPrecio").val(preciof.toString());
}

function calcularVentaImporte(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmPropiedadesAgregar-txtVentaPrecio").val().length > 0) 
        precio = parseFloat($("#frmPropiedadesAgregar-txtVentaPrecio").val());
    else
        $("#frmPropiedadesAgregar-txtVentaPrecio").val("0");
    
    if($("#frmPropiedadesAgregar-txtIVA").val().length > 0) 
        iva = parseFloat($("#frmPropiedadesAgregar-txtIVA").val());

    importe = precio + ((precio * iva) / 100);
    importef = Math.round(importe * 100) / 100
    $("#frmPropiedadesAgregar-txtVentaImporte").val(importef.toString());
}

function calcularVentaPrecio(){
    var precio = 0;
    var iva = 0;
    var importe = 0;

    if($("#frmPropiedadesAgregar-txtVentaImporte").val().length > 0) 
        importe = parseFloat($("#frmPropiedadesAgregar-txtVentaImporte").val());
    else
        $("#frmPropiedadesAgregar-txtVentaImporte").val("0");
    
    if($("#frmPropiedadesAgregar-txtIVA").val().length > 0) 
        iva = parseFloat($("#frmPropiedadesAgregar-txtIVA").val());

    precio = importe / ((100 + iva) / 100);
    preciof = Math.round(precio * 100) / 100

    $("#frmPropiedadesAgregar-txtVentaPrecio").val(preciof.toString());
}

var Imagen="";

$("#frmPropiedadesAgregar-lstImagenes").on("click", ".btnSelectImg", function(e){
    $(".gm-photo-wrapper").removeClass("active");
    var photoWrapper = $(this).closest(".gm-photo-wrapper");
    var imagen = photoWrapper.data("imagen");
    photoWrapper.addClass("active");
    //alert(imagen);
    $("#frmPropiedadesAgregar-ImagenPrincipal").val(imagen);
    return false;
});
$("#frmPropiedadesAgregar-lstImagenes").on("click", ".btnDeleteImg", function(){
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
        files.splice(i, 1);
        $.each(files, function(){
            $.each(this, function(){
                if(this.name==img_name) files.splice(this.name);
            });
        });
        photoWrapper.remove();
    }
});

$("#frmPropiedadesAgregar-txtTipoPropiedad").change(function(e){
    var $this = $(this);
    //Casa
    if($this.val()==1){
        $("#frmPropiedadesAgregar-dvAmbientes").css("display", "block");
        $("#frmPropiedadesAgregar-dvGeneral").css("display", "block");
        $("#frmPropiedadesAgregar-colExpensas").css("display", "none");
        $("#frmPropiedadesAgregar-txtOperacion").prop("disabled", false);
        $("#frmPropiedadesAgregar-colSupTotal").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colSupCubierta").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colAntiguedad").css("display", "inline-block");
    } 
    //Departamento
    else if($this.val()==2){
        $("#frmPropiedadesAgregar-dvAmbientes").css("display", "block");
        $("#frmPropiedadesAgregar-dvGeneral").css("display", "block");
        $("#frmPropiedadesAgregar-colExpensas").css("display", "inline-block");
        $("#frmPropiedadesAgregar-txtOperacion").prop("disabled", false);
        $("#frmPropiedadesAgregar-colSupTotal").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colSupCubierta").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colAntiguedad").css("display", "inline-block");
    }
    //Galpon/deposito
    else if($this.val()==4){
        $("#frmPropiedadesAgregar-dvAmbientes").css("display", "none");
        $("#frmPropiedadesAgregar-dvGeneral").css("display", "block");
        $("#frmPropiedadesAgregar-colExpensas").css("display", "none");
        $("#frmPropiedadesAgregar-txtOperacion").prop("disabled", false);
        $("#frmPropiedadesAgregar-colSupTotal").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colSupCubierta").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colAntiguedad").css("display", "inline-block");
    }
    //Local
    else if($this.val()==5){
        $("#frmPropiedadesAgregar-dvAmbientes").css("display", "none");
        $("#frmPropiedadesAgregar-dvGeneral").css("display", "block");
        $("#frmPropiedadesAgregar-colExpensas").css("display", "inline-block");
        $("#frmPropiedadesAgregar-txtOperacion").prop("disabled", false);
        $("#frmPropiedadesAgregar-colSupTotal").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colSupCubierta").css("display", "none");
        $("#frmPropiedadesAgregar-colAntiguedad").css("display", "inline-block");
    }
    //oficina
    else if($this.val()==6){
        $("#frmPropiedadesAgregar-dvAmbientes").css("display", "none");
        $("#frmPropiedadesAgregar-dvGeneral").css("display", "block");
        $("#frmPropiedadesAgregar-colExpensas").css("display", "inline-block");
        $("#frmPropiedadesAgregar-txtOperacion").prop("disabled", false);
        $("#frmPropiedadesAgregar-colSupTotal").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colSupCubierta").css("display", "none");
        $("#frmPropiedadesAgregar-colAntiguedad").css("display", "inline-block");
    }
    //Garage/Cochera
    else if($this.val()==7){
        $("#frmPropiedadesAgregar-dvAmbientes").css("display", "none");
        $("#frmPropiedadesAgregar-dvGeneral").css("display", "block");
        $("#frmPropiedadesAgregar-colExpensas").css("display", "none");
        $("#frmPropiedadesAgregar-txtOperacion").prop("disabled", false);
        $("#frmPropiedadesAgregar-colSupTotal").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colSupCubierta").css("display", "none");
        $("#frmPropiedadesAgregar-colAntiguedad").css("display", "none");
    }
    //Terreno
    else if($this.val()==8){
        $("#frmPropiedadesAgregar-dvAmbientes").css("display", "none");
        $("#frmPropiedadesAgregar-dvGeneral").css("display", "block");
        $("#frmPropiedadesAgregar-colExpensas").css("display", "none");
        $("#frmPropiedadesAgregar-txtOperacion").prop("disabled", false);
        $("#frmPropiedadesAgregar-txtSupCubierta").val("0");
        $("#frmPropiedadesAgregar-txtAntiguedad").val("0");
        $("#frmPropiedadesAgregar-colSupTotal").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colSupCubierta").css("display", "none");
        $("#frmPropiedadesAgregar-colAntiguedad").css("display", "none");
    }
    //Lote
    else if($this.val()==9){
        $("#frmPropiedadesAgregar-dvAmbientes").css("display", "none");
        $("#frmPropiedadesAgregar-dvGeneral").css("display", "block");
        $("#frmPropiedadesAgregar-colExpensas").css("display", "none");
        $("#frmPropiedadesAgregar-txtOperacion").prop("disabled", false);
        $("#frmPropiedadesAgregar-txtSupCubierta").val("0");
        $("#frmPropiedadesAgregar-txtAntiguedad").val("0");
        $("#frmPropiedadesAgregar-colSupTotal").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colSupCubierta").css("display", "none");
        $("#frmPropiedadesAgregar-colAntiguedad").css("display", "none");
    }
    //Campo
    else if($this.val()==10){
        $("#frmPropiedadesAgregar-dvAmbientes").css("display", "none");
        $("#frmPropiedadesAgregar-dvGeneral").css("display", "block");
        $("#frmPropiedadesAgregar-colExpensas").css("display", "none");
        $("#frmPropiedadesAgregar-txtOperacion").prop("disabled", false);
        $("#frmPropiedadesAgregar-txtSupCubierta").val("0");
        $("#frmPropiedadesAgregar-txtAntiguedad").val("0");
        $("#frmPropiedadesAgregar-colSupTotal").css("display", "inline-block");
        $("#frmPropiedadesAgregar-colSupCubierta").css("display", "none");
        $("#frmPropiedadesAgregar-colAntiguedad").css("display", "none");
    }
    else {
        $("#frmPropiedadesAgregar-dvAmbientes").css("display", "none");
        $("#frmPropiedadesAgregar-dvGeneral").css("display", "none");
        $("#frmPropiedadesAgregar-txtOperacion").prop("disabled", true);
        $("#frmPropiedadesAgregar-txtOperacion>option[value='0']").prop("selected", true);
        $("#frmPropiedadesAgregar-txtOperacion").change();
    }
});

$("#frmPropiedadesAgregar-txtEstado").change(function(e){
    var $this = $(this);
    if($this.val()>1){
        $("#frmPropiedadesAgregar-txtCanal").prop("disabled", false);
        if($this.val()==2){
            $("#frmPropiedadesAgregar-colContratoAlta").css("display", "block");
            $("#frmPropiedadesAgregar-colContratoDuracion").css("display", "block");
            $("#frmPropiedadesAgregar-colContratoVto").css("display", "block");
            $("#frmPropiedadesAgregar-colProxVto").css("display", "block");
        }
        if($this.val()==5){
            $("#frmPropiedadesAgregar-colContratoAlta").css("display", "none");
            $("#frmPropiedadesAgregar-colContratoDuracion").css("display", "none");
            $("#frmPropiedadesAgregar-colContratoVto").css("display", "none");
            $("#frmPropiedadesAgregar-colProxVto").css("display", "block");
        }

        if($this.val()==2 || $this.val()==5){
            $("#frmPropiedadesAgregar-dvLocatario").css("display", "block");
            $("#frmPropiedadesAgregar-dvComprador").css("display", "none");
            $("#frmPropiedadesAgregar-dvVendedor").css("display", "none");
            $("#frmPropiedadesAgregar-GarantesContainer").css("display", "block")
        }
        else if($this.val()==3 || $this.val()==4){
            $("#frmPropiedadesAgregar-dvLocatario").css("display", "none");
            $("#frmPropiedadesAgregar-dvComprador").css("display", "block");
            $("#frmPropiedadesAgregar-dvVendedor").css("display", "block");
            $("#frmPropiedadesAgregar-GarantesContainer").css("display", "none")
        }
        else {
            $("#frmPropiedadesAgregar-dvLocatario").css("display", "none");
            $("#frmPropiedadesAgregar-dvComprador").css("display", "none");
            $("#frmPropiedadesAgregar-dvVendedor").css("display", "none");
            $("#frmPropiedadesAgregar-GarantesContainer").css("display", "none")
        }
    } else {
        $("#frmPropiedadesAgregar-txtCanal").prop("disabled", true);
        $("#frmPropiedadesAgregar-dvLocatario").css("display", "none");
        $("#frmPropiedadesAgregar-dvComprador").css("display", "none");
        $("#frmPropiedadesAgregar-dvVendedor").css("display", "none");
        $("#frmPropiedadesAgregar-GarantesContainer").css("display", "none")

        $("#frmPropiedadesAgregar-colContratoAlta").css("display", "none");
        $("#frmPropiedadesAgregar-colContratoVto").css("display", "none");
        $("#frmPropiedadesAgregar-colProxVto").css("display", "none");
    }
});

$("#frmPropiedadesAgregar-txtOperacion").change(function(e){
    var $this = $(this);
    if($this.val()>0){
        $("#frmPropiedadesAgregar-tabBtnPrecios").css("display", "block");
        $("#frmPropiedadesAgregar-dvPrecios").css("display", "block");
        $("#frmPropiedadesAgregar-txtEstado").empty();
        $("#frmPropiedadesAgregar-txtEstado").prop("disabled", false);
        if($this.val()==1){
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='1'>Vigente</option>");
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='2'>Alquilada</option>");
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='3'>Vendida</option>");
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='4'>Señada (venta)</option>");
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='5'>Señada (alquiler)</option>");
         
            $("#frmPropiedadesAgregar-dvPreciosAlquiler").css("display", "block");
            $("#frmPropiedadesAgregar-dvPreciosVenta").css("display", "block");
            $("#frmPropiedadesAgregar-colContratoMinimo").css("display", "inline-block");
        }
        else if ($this.val()==2 || $this.val()==3) {
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='1'>Vigente</option>");
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='2'>Alquilada</option>");
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='5'>Señada</option>");

            $("#frmPropiedadesAgregar-dvPreciosAlquiler").css("display", "block");
            $("#frmPropiedadesAgregar-dvPreciosVenta").css("display", "none");
            $("#frmPropiedadesAgregar-colContratoMinimo").css("display", "inline-block");
        }
        else if ($this.val()==4 || $this.val()==5) {
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='1'>Vigente</option>");
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='3'>Vendida</option>");
            $("#frmPropiedadesAgregar-txtEstado").append("<option value='4'>Señada</option>");

            $("#frmPropiedadesAgregar-dvPreciosAlquiler").css("display", "none");
            $("#frmPropiedadesAgregar-dvPreciosVenta").css("display", "block");
            $("#frmPropiedadesAgregar-colContratoMinimo").css("display", "none");
        }
    } else {
        $("#frmPropiedadesAgregar-tabBtnPrecios").css("display", "none");
        $("#frmPropiedadesAgregar-txtEstado").empty();
        $("#frmPropiedadesAgregar-txtEstado").append("<option value='0'>No disponible<option>");
        $("#frmPropiedadesAgregar-txtEstado").prop("disabled", true);
        $("#frmPropiedadesAgregar-colContratoMinimo").css("display", "none");
    }
});

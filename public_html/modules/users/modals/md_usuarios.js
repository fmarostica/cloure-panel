var frmUsuariosAgregar = {
    elem: $("#frmUsuariosAgregar"),
    ajax_url: "/ajax/xhr.php",
    id: 0,
    caller: null,
    initialize: function(){
        var $this = this;

        $this.elem.on("click", ".btn-save", function(){
            $this.guardar();
        });

        $("#frmUsuariosAgregar-btnCambiarImagen").click(function(e){
            $("#frmUsuariosAgregar-fileImg").click();
        });
        $("#frmUsuariosAgregar-fileImg").change(function(){
            $this.load_picture(this);
        });
        $("#frmUsuariosAgregar_txtPais").change(function(e){
            $this.cargar_paises_n1();
        });
        $this.elem.find(".btn-add-group").click(function(e){
            $this.agregar_grupo();
        });
        $("#frmUsuariosAgregar-btnAgregarCanal").click(function(e){
            $this.agregar_canal();
        });
    },
    open: function(caller, id=0){
        var $this = this;
        $this.id = id;
        
        $this.cargar_grupos();
        $this.cargar_condiciones_iva();
        $this.cargar_tipos_documento();
        $this.cargar_canales_marketing(0);
        $this.cargar_paises();

        if(CloureManager.get_account_type()=="free"){
            $this.elem.find(".alert-free").empty();
            $this.elem.find(".alert-free").append("<span>Estas usando una versión gratuita de Cloure, por lo tanto no podrás agregar usuarios administrativos ni grupos personalizados.</span> ");
            $this.elem.find(".alert-free").append("<a href='https://cloure.com/es/?app_token="+CloureManager.get_app_token()+"' target='_blank'>Conoce nuestros planes</a>");
            $this.elem.find(".alert-free").css("display", "block");
        }

        if(id==0){
            $this.elem.find(".gm-modal-title").html("Agregar usuario");
            $("#frmUsuariosAgregar_hClienteId").val(0);
            $("#frmUsuariosAgregar_lblTitulo").html("Agregar usuario");
            $("#frmUsuariosAgregar_txtNombre").val(""); 
            $("#frmUsuariosAgregar_txtApellido").val(""); 
            $("#frmUsuariosAgregar_txtEmpresa").val(""); 
            $("#frmUsuariosAgregar_txtMail").val(""); 
            $("#frmUsuariosAgregar_txtWeb").val(""); 
            $("#frmUsuariosAgregar_txtSaldo").val(""); 
            $("#frmUsuariosAgregar_txtDireccion").val("");
            $("#frmUsuariosAgregar_txtCP").val("");
            $("#frmUsuariosAgregar_txtDocumentoNro").val("");
            $("#frmUsuariosAgregar_txtTelefonoDDN").val("");
            $("#frmUsuariosAgregar_txtTelefonoNum").val(""); 
            $("#frmUsuariosAgregar_txtGrupo>option[value='Usuarios']").prop("selected", true);
            $("#frmUsuariosAgregar_txtCondicionIvaId>option[value='0']").prop("selected", true);
            $("#frmUsuariosAgregar_txtCanal>option[value='0']").prop("selected", true);
            $("#frmUsuariosAgregar-txtSexo>option[value='']").prop("selected", true);
            $("#frmUsuariosAgregar-txtFechaNacimiento").val("");
        } else {
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "users", 
                    topic: "get_by_id",
                    id: id 
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    if(data.Error==""){
                        var registro = data.Response;
                        $("#frmUsuariosAgregar_UsuarioId").val(id);
                        $("#frmUsuariosAgregar_lblTitulo").html("Editar usuario");
                        $("#frmUsuariosAgregar_txtNombre").val(registro.nombre); 
                        $("#frmUsuariosAgregar_txtApellido").val(registro.apellido); 
                        $("#frmUsuariosAgregar_txtEmpresa").val(registro.empresa); 
                        $("#frmUsuariosAgregar_txtMail").val(registro.mail); 
                        $("#frmUsuariosAgregar_txtWeb").val(registro.web); 
                        $("#frmUsuariosAgregar_txtSaldo").val(registro.saldo); 
                        $("#frmUsuariosAgregar_txtDireccion").val(registro.direccion);
                        $("#frmUsuariosAgregar_txtCP").val(registro.cp);
                        $("#frmUsuariosAgregar_txtTelefonoCodPais>option[value='"+registro.TelefonoCodPais+"']").prop("selected", true);
                        $("#frmUsuariosAgregar_txtTelefonoEmpresa>option[value='"+registro.TelefonoEmpresa+"']").prop("selected", true);
                        $("#frmUsuariosAgregar-txtTelefono").val(registro.TelefonoNum);
                        $("#frmUsuariosAgregar_txtGrupo>option[value='"+registro.grupo_id+"']").prop("selected", true);
                        $("#frmUsuariosAgregar_txtTipoDocumentoId>option[value='"+registro.tipo_documento_id+"']").prop("selected", true);
                        $("#frmUsuariosAgregar_txtCanal>option[value='"+registro.canal_marketing_id+"']").prop("selected", true);
                        $("#frmUsuariosAgregar_txtDocumentoNro").val(registro.documento_numero); 
                        $("#frmUsuariosAgregar-profileImg").prop("src", registro.imagen);

                        if(registro.pais_id>0)
                            $("#frmUsuariosAgregar_txtPais>option[value='"+registro.pais_id+"']").prop("selected", true);
                        else
                            $("#frmUsuariosAgregar_txtPais>option[value='9']").prop("selected", true);

                        $this.cargar_paises_n1(registro.pais_n1_id);

                        $("#frmUsuariosAgregar_txtLocalidad").val(registro.localidad);
                        $("#frmUsuariosAgregar-txtSexo>option[value='"+registro.sexo+"']").prop("selected", true);
                        $("#frmUsuariosAgregar-txtFechaNacimiento").val(registro.fecha_nac);

                        $.GMWindowManager.open($("#frmUsuariosAgregar"));
                    }
                }
            });
        }

        $this.caller = caller;
        //$this.elem.modal("show");
        $.GMWindowManager.open($this.elem);
    },
    agregar_grupo: function(){
        var $this = this;
        frmUsuariosGrupos.open(0, function(data){
            $this.cargar_grupos(data.Id);
        });
    },
    agregar_canal: function(){
        var $this = this;
        frmCanalesMarketing.open(0, function(data){
            $this.cargar_canales_marketing(data.Id);
        });
    },
    cargar_canales_marketing: function(selected){
        $.ajax({
            url: 'modules/tablas_generales/ajax/canales_marketing_xhr.php',
            data: {
                topic: "listar"
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#frmUsuariosAgregar_txtCanal").empty();
                $("#frmUsuariosAgregar_txtCanal").append("<option value='0'>Sin especificar</option>");
                if(data.Error==""){
                    for (var i = 0; i<registros.length; i++) {
                        $("#frmUsuariosAgregar_txtCanal").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }
                    if(selected>0) $("#frmUsuariosAgregar_txtCanal>option[value='"+selected+"']").prop("selected", true);
                }
            }
        });
    },
    cargar_condiciones_iva: function(selected){
        $.ajax({
            url: 'modules/tablas_generales/ajax/condiciones_iva-xhr.php',
            data: {
                topic: "listar"
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#frmUsuariosAgregar_txtCondicionIvaId").empty();
                if(data.Error==""){
                    for (var i = 0; i<registros.length; i++) {
                        $("#frmUsuariosAgregar_txtCondicionIvaId").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }

                    if(selected!="") $("#frmUsuariosAgregar_txtCondicionIvaId>option[value='"+selected+"']").prop("selected", true);
                }
            }
        });
    },
    cargar_tipos_documento: function(selected=0){
        $.ajax({
            url: 'modules/tablas_generales/ajax/documentos_tipos-xhr.php',
            data: {
                topic: "listar"
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#frmUsuariosAgregar_txtTipoDocumentoId").empty();
                $("#frmUsuariosAgregar_txtTipoDocumentoId").append("<option value='0'>Sin especificar</option>");
                if(data.Error==""){
                    for (var i = 0; i<registros.length; i++) {
                        $("#frmUsuariosAgregar_txtTipoDocumentoId").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }
                    if(selected!="") $("#frmUsuariosAgregar_txtTipoDocumentoId>option[value='"+selected+"']").prop("selected", true);
                }
            }
        });
    },
    cargar_grupos: function(selected="user"){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "users_groups",
                topic: "get_list"
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                var txtGroup = $("#frmUsuariosAgregar_txtGrupo");
                txtGroup.empty();
                if(data.Error==""){
                    for (var i = 0; i<registros.length; i++) {
                        txtGroup.append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }
                    if(selected!="") txtGroup.find("option[value='"+selected+"']").prop("selected", true);
                }

                if(CloureManager.get_account_type()=="free"){
                    $("#frmUsuariosAgregar_txtGrupo").prop("disabled", true);
                    $this.elem.find(".btn-add-group").prop("disabled", true);
                }
            }
        });
    },
    cargar_paises: function(selected=9, cod_selected="+54"){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "countries",
                topic: "get_list",
                limite: 0
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#frmUsuariosAgregar_txtPais").empty();
                $("#frmUsuariosAgregar_txtTelefonoCodPais").empty();
                if(data.Error==""){
                    for (var i = 0; i<registros.length; i++) {
                        $("#frmUsuariosAgregar_txtPais").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                        $("#frmUsuariosAgregar_txtTelefonoCodPais").append("<option value='"+registros[i].CodigoTelefonico+"'>"+registros[i].CodigoTelefonico+" ("+registros[i].Nombre+")</option>");
                    }

                    if(selected>0) $("#frmUsuariosAgregar_txtPais>option[value='"+selected+"']").prop("selected", true);
                    if(cod_selected>0) $("#frmUsuariosAgregar_txtTelefonoCodPais>option[value='"+cod_selected+"']").prop("selected", true);
                }
            }
        });
    },
    cargar_paises_n1: function(selected=0){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "countries_n1", 
                topic: "get_list", 
                pais_id: $("#frmUsuariosAgregar_txtPais").val() 
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#frmUsuariosAgregar_txtPaisN1").empty();
                if(data.Error==""){
                    $("#frmUsuariosAgregar_txtPaisN1").append("<option value='0'>Seleccione...</option>");
                    for (var i = 0; i<registros.length; i++) {
                        $("#frmUsuariosAgregar_txtPaisN1").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }

                    if(selected>0) $("#frmUsuariosAgregar_txtPaisN1>option[value='"+selected+"']").prop("selected", true);
                }
            }
        });
    },
    guardar: function(){
        var $this = this;
        var formData = new FormData($this.elem[0]);

        formData.append("module", "users");
        formData.append("topic", "guardar");
        formData.append("id", $this.id);
        formData.append("grupo_id", $this.elem.find(".txt-grupo").val());

        $.ajax({
            url: $this.ajax_url,
            type: 'POST',
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data){
            var error = data.Error;
            if(error.length>0){
                alert(error);
                //swal("Error!", error, "error");
            }
            else{
                $.GMWindowManager.close($this.elem);
                var usuario_tmp = {
                    Id: data.Response.Id,
                    RazonSocial: $("#frmUsuariosAgregar_txtApellido").val()+", "+$("#frmUsuariosAgregar_txtNombre").val()
                }
                if($.isFunction($this.caller)) $this.caller(usuario_tmp);
            }
        });
    },
    load_picture: function(elem){
        if (elem.files && elem.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#frmUsuariosAgregar-profileImg').attr('src', e.target.result);
            }
            reader.readAsDataURL(elem.files[0]);
        }
    }
}

frmUsuariosAgregar.initialize();
var ucMiPerfil = {
    ajax_url: '/ajax/xhr.php',
    element: $("#ucPerfil"),
    initialize: function(){
        var $this = this;

        $("#ucPerfil-btnCambiarClave").click(function(){
            if($("#account-type").val()=="demo" && $("#user-type-id").val()=="1"){
                swal("Error", "No puedes cambiar la clave del administrador en la cuenta demo", "error");
            } else {
                $.GMWindowManager.open($("#frmCambiarClave"));
            }
        });

        $("#ucPerfil-btnGuardar").click(function(){
            $.ajax({
                url: $this.ajax_url,
                type: 'POST',
                data: 
                { 
                    module: "my_account",
                    topic: "guardar"
                },
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error.length>0)
                    {
                        swal("Error al cambiar la clave!", error, "error");
                    }
                    else
                    {
                        swal("Operación realizada!", "Tus datos han sido guardados.", "success");
                    }
                }
            });
        });

        $("#ucPerfil-btnCambiarImagen").click(function(){
            $("#ucPerfil-fileImg").click();
        });
        $("#ucPerfil-fileImg").change(function(){
            $this.load_picture(this);
        });

        $this.cargar_paises();
        $this.cargar_paises_n1();
        //$this.cargar_estados_civiles();
        $this.obtener_datos();

        $("#output-loader").css("display", "none");
    },
    cargar_paises: function(){
        var $this = this;

        $this.element.find(".txtPais").empty();
        $this.element.find(".txtPais").append("<option value='0'>Seleccione...</option>");
        $.ajax({
            url: $this.ajax_url,
            data: { 
                module: "countries",
                topic: "get_list"
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            if(data.Error==""){
                var registros = data.Response.Registros;
                for (i = 0; i < registros.length; i++) {
                    $this.element.find(".txtPais").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
            else{
                alert(data.Error);
            }
        });
    },
    cargar_paises_n1: function(){
        var $this = this;

        $this.element.find(".txtPaisN1").empty();
        $this.element.find(".txtPaisN1").append("<option value='0'>Seleccione...</option>");
        $.ajax({
            url: $this.ajax_url,
            data: { 
                module: "countries_n1",
                topic: "get_list"
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            if(data.Error==""){
                var registros = data.Response.Registros;
                for (i = 0; i < registros.length; i++) {
                    $this.element.find(".txtPaisN1").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
            else{
                alert(data.Error);
            }
        });
    },
    cargar_estados_civiles: function(){
        var $this = this;

        $this.element.find(".txtEstadoCivil").empty();
        $this.element.find(".txtEstadoCivil").append("<option value='0'>Seleccione...</option>");
        $.ajax({
            url: 'modules/tablas_generales/ajax/estados-civiles-xhr.php',
            data: { 
                topic: "listar"
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            if(data.Error==""){
                var registros = data.Response.Registros;
                for (i = 0; i < registros.length; i++) {
                    $this.element.find(".txtEstadoCivil").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                }
            }
            else{
                alert(data.Error);
            }
        });
    },
    obtener_datos: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            type: 'POST',
            data: 
            {
                module: "my_account",
                topic: "get_data"
            },
            dataType: 'json',
            success: function(data)
            {
                var registro = data.Response;
                $("#ucPerfil-UserPhoto").prop("src", registro.ImagenRuta);
                $this.element.find(".txtNombre").val(registro.nombre);
                $this.element.find(".txtApellido").val(registro.apellido);
                $this.element.find(".txtEmpresa").val(registro.empresa);
                $this.element.find(".txtMail").val(registro.mail);
                $this.element.find(".txtPais>option[value='"+registro.pais_id+"']").prop("selected", true);
                $this.element.find(".txtPaisN1>option[value='"+registro.pais_n1_id+"']").prop("selected", true);
                $this.element.find(".txtCiudad").val(registro.localidad);

                if(CloureManager.date_supported){
                    $this.element.find(".txtFechaNacimiento").val(registro.fecha_nac);
                } else {
                    $this.element.find(".txtFechaNacimiento").val(registro.fecha_nac_str);
                }

                $this.element.find(".txtEstadoCivil>option[value='"+registro.estado_civil_id+"']").prop("selected", true);
                $this.element.find(".txtGenero>option[value='"+registro.sexo+"']").prop("selected", true);
                $this.element.find(".txtCUIL").val(registro.documento_nro);
                /*
                $this.element.find(".txtVehiculoPropio>option[value='"+registro.VehiculoPropio+"']").prop("selected", true);
                $this.element.find(".txtSituacionLaboral>option[value='"+registro.SituacionLaboralId+"']").prop("selected", true);
                $this.element.find(".txtDisponibilidadViajes>option[value='"+registro.DisponibilidadViajes+"']").prop("selected", true);
                $this.element.find(".txtCambioResidencia>option[value='"+registro.DisponibilidadViajes+"']").prop("selected", true);
                */

                /*
                for (var i = 0; i < registro.AreasInteres.length; i++) {
                    var chid = registro.AreasInteres[i];
                    $("#chk-area-"+chid).prop("checked", true);
                }

                $this.element.find(".txtTitulo").val(registro.Titulo);
                $this.element.find(".txtDescripcion").val(registro.Detalles);
                $this.element.find(".txtObjetivosLaborales").val(registro.ObjetivosLaborales);

                for (var i = 0; i < registro.Idiomas.length; i++) {
                    $this.agregar_idioma(registro.Idiomas[i].idioma, registro.Idiomas[i].nivel);
                }

                for (var i = 0; i < registro.Estudios.length; i++) {
                    $this.agregar_estudio(registro.Estudios[i].instituto, registro.Estudios[i].nivel, registro.Estudios[i].desde, registro.Estudios[i].hasta, registro.Estudios[i].estado);
                }

                for (var i = 0; i < registro.Trabajos.length; i++) {
                    $this.agregar_trabajo(registro.Trabajos[i].empresa, registro.Estudios[i].desde, registro.Estudios[i].hasta);
                }
                */
            }
        });
    },
    agregar_idioma: function(idioma="", nivel=""){
        $("#pSubirCV-idiomas").append("<tr class='idioma-item'><td><input type='text' class='gm-form-control idioma-item-nombre' value='"+idioma+"' readonly /></td><td>"+
            "<select class='gm-form-control idioma-item-nivel'>"+
                "<option value='basico' "+(nivel=="basico" ? "selected" : "")+">Básico</option>"+
                "<option value='intermedio' "+(nivel=="intermedio" ? "selected" : "")+">Intermedio</option>"+
                "<option value='avanzado' "+(nivel=="avanzado" ? "selected" : "")+">Avanzado</option>"+
            "</select>"+
            "</td><td><button type='button' class='gm-btn danger btnBorrarIdioma'><i class='fa fa-trash'></i></button></td></tr>");
    },
    agregar_estudio: function(institucion="", nivel="", desde="", hasta="", estado=""){
        $("#pSubirCV-estudios").append("<tr class='estudio-item'>"+
            "<td>"+
                "<div>"+
                    "<input type='hidden' class='estudio-item-institucion' value='"+institucion+"' />"+
                    "<input type='hidden' class='estudio-item-nivel' value='"+nivel+"' />"+
                    "<input type='hidden' class='estudio-item-desde' value='"+desde+"' />"+
                    "<input type='hidden' class='estudio-item-hasta' value='"+hasta+"' />"+
                    "<input type='hidden' class='estudio-item-estado' value='"+estado+"' />"+
                    "<i class='fa fa-school'></i> "+institucion+
                    "<br/><span class='gm-additional-info'><i class='fa fa-graduation-cap'></i> "+nivel+"</span>"+
                "</div>"+
            "</td>"+
            "<td><button type='button' class='gm-btn danger btnBorrarEstudio'><i class='fa fa-trash'></i></button></td></tr>");
    },
    agregar_trabajo: function(empresa="", desde="", hasta="", tareas="", logros="", valoracion=0, comentarios=""){
        $("#pSubirCV-trabajos").append("<tr class='trabajo-item'>"+
            "<td>"+
                "<div>"+
                    "<input type='hidden' class='trabajo-item-empresa' value='"+empresa+"' />"+
                    "<input type='hidden' class='trabajo-item-desde' value='"+desde+"' />"+
                    "<input type='hidden' class='trabajo-item-hasta' value='"+hasta+"' />"+
                    "<input type='hidden' class='trabajo-item-tareas' value='"+tareas+"' />"+
                    "<input type='hidden' class='trabajo-item-logros' value='"+logros+"' />"+
                    "<input type='hidden' class='trabajo-item-valoracion' value='"+valoracion+"' />"+
                    "<input type='hidden' class='trabajo-item-comentarios' value='"+comentarios+"' />"+
                    "<i class='fa fa-building'></i> "+empresa+
                    "<br/><span class='gm-additional-info'><i class='fa fa-clock'></i> "+desde+" - "+hasta+"</span>"+
                "</div>"+
            "</td>"+
            "<td><button type='button' class='gm-btn danger btnBorrarTrabajo'><i class='fa fa-trash'></i></button></td></tr>");
    },
    agregar_conocimiento_informatica: function(herramienta="", nivel=""){
        $("#pSubirCV-conocimientos-informatica").append("<tr class='conocimiento-informatica-item'><td><input type='text' class='form-control conocimiento-informatica-item-software' value='"+herramienta+"' readonly /></td><td>"+
            "<select class='form-control conocimiento-informatica-item-nivel'>"+
                "<option value='basico' "+(nivel=="basico" ? "selected" : "")+">Básico</option>"+
                "<option value='intermedio' "+(nivel=="intermedio" ? "selected" : "")+">Intermedio</option>"+
                "<option value='avanzado' "+(nivel=="avanzado" ? "selected" : "")+">Avanzado</option>"+
            "</select>"+
            "</td><td><button type='button' class='btn btn-danger btnBorrarConocimiento'><i class='fa fa-trash'></i></button></td></tr>");
    },
    load_picture: function(elem){
        if (elem.files && elem.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#ucPerfil-UserPhoto').attr('src', e.target.result);
            }
            reader.readAsDataURL(elem.files[0]);
        }
    }
}

ucMiPerfil.initialize();
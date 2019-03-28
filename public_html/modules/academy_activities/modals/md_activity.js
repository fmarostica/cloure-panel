var frmAcademyActivity = {
    id: 0,
    caller: null,
    ajax_url: "/ajax/xhr.php",
    profesor_id: 0,
    element: $("#frmAcademiaActividadAgregar"),
    initialize: function(){
        var $this = this;

        $("#frmAcademiaActividadAgregar-btnGuardar").click(function(){
            $this.guardar();
        });
        $("#frmBandasAgregar-btnCambiarImagen").click(function(){
            $("#frmBandasAgregar-File").click();
        });
        $("#frmBandasAgregar-File").change(function() {
            $this.preview_image(this);
        });
        $("#frmAcademiaActividadAgregar-btnAddHorario").click(function(){
            $this.agregar_horario();
        });

        $("#frmAcademiaActividadAgregar-btnProfesor").click(function(){
            frmUsuariosSeleccionar.open(function(user){
                $("#frmAcademiaActividadAgregar-btnProfesor").html(user.Apellido+", "+user.Nombre);
                $this.profesor_id = user.Id;
            });
        });
    },
    agregar_horario: function(dia_id=1, desde="", hasta=""){
        $("#table-actividades-horarios").append("<tr class='actividad-horario-item'>"+
            "<td>"+
                "<select class='horario-item-dia gm-form-control'>"+
                "<option value='0' "+(dia_id==0 ? "selected" : "")+">Domingo</option>"+
                "<option value='1' "+(dia_id==1 ? "selected" : "")+">Lunes</option>"+
                "<option value='2' "+(dia_id==2 ? "selected" : "")+">Martes</option>"+
                "<option value='3' "+(dia_id==3 ? "selected" : "")+">Miércoles</option>"+
                "<option value='4' "+(dia_id==4 ? "selected" : "")+">Jueves</option>"+
                "<option value='5' "+(dia_id==5 ? "selected" : "")+">Viernes</option>"+
                "<option value='6' "+(dia_id==6 ? "selected" : "")+">Sábado</option>"+
                "</select>"+
            "</td>"+
            "<td>"+
                "<input type='text' class='horario-item-desde gm-form-control' style='width: 80px' value='"+desde+"' />"+
            "</td>"+
            "<td>"+
                "<input type='text' class='horario-item-hasta gm-form-control' style='width: 80px' value='"+hasta+"' />"+
            "</td>"+
        "</tr>");
    },
    guardar: function(){
        var $this = this;
        var horarios = [];

        var formData = new FormData($('#frmAcademiaActividadAgregar')[0]);

        $(".actividad-horario-item").each(function(){
            var horario_tmp = { 
                dia_id: $(this).find(".horario-item-dia").val(), 
                desde: $(this).find(".horario-item-desde").val(), 
                hasta: $(this).find(".horario-item-hasta").val()
            };
            horarios.push(horario_tmp);
        });

        formData.append("module", "academy_activities");
        formData.append("topic", "guardar");
        formData.append("id", $this.id);
        formData.append("nombre", $("#frmAcademiaActividadAgregar-txtNombre").val());
        formData.append("descripcion", $("#frmAcademiaActividadAgregar-txtDescripcion").val());
        formData.append("profesor_id", $this.profesor_id);
        formData.append("horarios", JSON.stringify(horarios));

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
            }
            else{
                $.GMWindowManager.close($('#frmAcademiaActividadAgregar'));
                $this.caller();
            }
        });
    },
    open: function(id=0, caller=null){
        var $this = this;

        $this.id = id;
        $this.caller = caller;
        $("#table-actividades-horarios").empty();

        if($this.id==0){
            $("#frmAcademiaActividadAgregar-txtNombre").val("");
            $this.element.find(".img-cover").prop("src", "/images/no-photo-portrait.jpg");
            $.GMWindowManager.open($("#frmAcademiaActividadAgregar"));
        } else {
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "academy_activities",
                    topic: "obtener", 
                    id: id 
                },
                type: 'POST',
                dataType: 'json'
            }).done(function(data){
                if(data.Error==""){
                    var registro = data.Response;
                    $("#frmAcademiaActividadAgregar-hId").val(id);
                    $("#frmAcademiaActividadAgregar-lblTitulo").html("Editar actividad");
                    $("#frmAcademiaActividadAgregar-txtNombre").val(registro.Nombre); 
                    $this.element.find(".img-cover").prop("src", data.Response.ImagenURL);

                    for (let i = 0; i < registro.Horarios.length; i++) {
                        var horario = registro.Horarios[i];
                        $this.agregar_horario(horario.dia_id, horario.desde, horario.hasta);
                    }

                    $.GMWindowManager.open($this.element);
                }
            });
        }
    },
    preview_image: function(input){
        var $this = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $this.element.find(".img-cover").prop("src", e.target.result);
            }
            reader.readAsDataURL(input.files[0]);        
        }
    }
}

frmAcademyActivity.initialize();
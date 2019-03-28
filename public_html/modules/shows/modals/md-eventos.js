var frmEventos = {
    id: 0,
    caller: null,
    files: [],
    imagen_principal: "",
    ajax_url: "/ajax/xhr.php",
    element: $("#frmEventosAgregar"),
    initialize: function(){
        var $this = this;

        $("#frmEventosAgregar-btnCambiarImagen").click(function(e){
            $("#frmEventosAgregar-File").click();
        });
        $("#frmEventosAgregar-File").change(function() {
            $this.preview_image(this);
        });
        $("#frmEventosAgregar-btnGuardar").click(function(){
            $this.guardar();
        });

        $("#frmEventosAgregar-btnAgregarFotografo").click(function(){
            frmUsuariosSeleccionar.open(function(data){
                $this.add_photographer_box(data.Id, data.RazonSocial);
            });
        });

        $("#frmEventosAgregar-btnArtistaAdd").click(function(){
            frmArtistas.open(0, function(){
                $this.cargar_artistas();
            });
        });
        $("#frmEventosAgregar-btnLugarAdd").click(function(){
            frmLugares.open(0, function(){
                $this.cargar_lugares();
            });
        });

        $("#frmEventosAgregar-header-addons").on("click", ".btnAddImage", function(e) {
            $("<input accept='image/*'>").prop({
                "type": "file",
                "multiple": true
            }).on("change", function(e) {
                $this.files.push(this.files);
                $this.preview_images(this);
            }).trigger("click");
        });

        $("#frmEventosAgregar-tabBtnGeneral").click(function(){$("#frmEventosAgregar-header-addons").empty();});
        $("#frmEventosAgregar-tabBtnImagenes").click(function(){
            $("#frmEventosAgregar-header-addons").empty();
            $("#frmEventosAgregar-header-addons").append("<button type='button' class='gm-btn primary btnAddImage'><i class='fa fa-plus fa-fw'></i></button>");
        });

        $this.cargar_artistas();
        $this.cargar_lugares();
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
        $("#frmEventosAgregar-lstImagenes").append(
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
            $this.imagen_principal = img_name;
        }
    },
    add_photographer_box: function(user_id, user_name){
        var $this = this;
        $("#frmEventosAgregar-lstFotografos").append(
            "<div class='gm-userbox-inline evento-photographer-box' style='' data-id='"+user_id+"'>"+
                user_name+
            "</div>"
        );
    },
    open: function(id, caller){
        $this = this;
        $this.id = id;
        $this.caller = caller;
        $("#frmEventosAgregar-lstImagenes").empty();
        $("#frmEventosAgregar-lstFotografos").empty();

        if(id==0){
            $("#frmEventosAgregar-lblTitulo").html("Agregar evento");
            $("#frmEventosAgregar-txtFecha").val("");
            $("#frmEventosAgregar-txtArtista>option[value='0']").prop("selected", true);
            $("#frmEventosAgregar-txtLugar>option[value='0']").prop("selected", true);
            $("#frmEventosAgregar-txtNombre").val(""); 
            $("#frmEventosAgregar-img").prop("src", "/images/no-photo-portrait.jpg");
            $.GMWindowManager.open($this.element);
        } else {
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "shows",
                    topic: "obtener", 
                    id: id 
                },
                type: 'POST',
                dataType: 'json'
            }).done(function(data){
                if(data.Error==""){
                    var registro = data.Response;
                    var fotografos = data.Response.Fotografos;
                    $("#frmEventosAgregar-lblTitulo").html("Editar evento");
                    $("#frmEventosAgregar-txtFecha").val(data.Response.Fecha);
                    $("#frmEventosAgregar-txtArtista>option[value='"+data.Response.ArtistaId+"']").prop("selected", true);
                    $("#frmEventosAgregar-txtLugar>option[value='"+data.Response.LugarId+"']").prop("selected", true);
                    $("#frmEventosAgregar-txtNombre").val(registro.Nombre); 
                    $("#frmEventosAgregar-img").prop("src", data.Response.Imagen);

                    for (let i = 0; i < fotografos.length; i++) {
                        fotografo = fotografos[i];
                        $this.add_photographer_box(fotografo.Id, fotografo.Nombre);
                    }

                    $.GMWindowManager.open($("#frmEventosAgregar"));
                }
            });
        }
    },
    guardar: function(){
        $.GMWindowManager.open($("#gm-modalwait"));
        var $this = this;
        var formData = new FormData($('#frmEventosAgregar')[0]);
        var fotografos = [];
        formData.append("module", "shows");
        formData.append("topic", "guardar");
        formData.append("id", $this.id);

        $.each($this.files, function() {
            $.each(this, function() {
                formData.append("files[]", this);
            });
        });

        $(".evento-photographer-box").each(function(){
            var fotografo = {
                id: $(this).data("id")
            }
            fotografos.push(fotografo);
        });
        formData.append("fotografos", JSON.stringify(fotografos));

        $.ajax({
            url: $this.ajax_url,
            type: 'POST',
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data){
            $.GMWindowManager.close($("#gm-modalwait"));
            var error = data.Error;
            if(error.message.length>0){
                alert(error.message);
                
            }
            else{
                $.GMWindowManager.close($('#frmEventosAgregar'));
                $this.caller();
            }
        });
    },
    preview_image: function(input){
        var $this = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $("#frmEventosAgregar-img").prop("src", e.target.result);
            }
            reader.readAsDataURL(input.files[0]);        
        }
    },
    cargar_artistas: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            type: 'POST',
            dataType: 'json',
            data: {
                module: "bands_artists",
                topic: "listar", 
                filtro: "", 
                pagina : 1, 
                col: "nombre",
                order: "asc"
            },
            success: function(data){
                var registros = data.Response.Registros;
                $("#frmEventosAgregar-txtArtista").empty();
                $("#frmEventosAgregar-txtArtista").append("<option value='0'>Banda/Artista</option>");
                if(registros.length>0){
                    for (var i = 0; i<registros.length; i++){
                        $("#frmEventosAgregar-txtArtista").append("<option value='"+ registros[i].Id +"' data-img='"+registros[i].Imagen+"' data-logo='"+registros[i].Logo+"'>"+registros[i].Nombre+"</option>");
                    }
                }
            }
        });
    },
    cargar_lugares: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            type: 'POST',
            dataType: 'json',
            data:{
                module: "places",
                topic: "listar",
                filtro: "",
                pagina : 1,
                col: "nombre",
                order: "asc" 
            },
            success: function(data){
                var registros = data.Response.Registros;
                $("#frmEventosAgregar-txtLugar").empty();
                $("#frmEventosAgregar-txtLugar").append("<option value='0'>Lugar</option>");
                if(registros.length>0)
                {
                    for (var i = 0; i<registros.length; i++){
                        $("#frmEventosAgregar-txtLugar").append("<option id='medida-"+registros[i].Id+"' value='"+ registros[i].Id +"' >"+registros[i].Nombre+"</option>");
                    }
                }
            }
        });
    }
}

frmEventos.initialize();
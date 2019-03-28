var frmArtistas = {
    id: 0,
    caller: null,
    ajax_url: "/ajax/xhr.php",
    element: $("#frmBandaAgregar"),
    initialize: function(){
        var $this = this;

        $("#frmBandaAgregar-btnGuardar").click(function(){
            $this.guardar();
        });
        $("#frmBandasAgregar-btnCambiarImagen").click(function(){
            $("#frmBandasAgregar-File").click();
        });
        $("#frmBandasAgregar-File").change(function() {
            $this.preview_image(this);
        });

        
    },
    guardar: function(){
        var $this = this;
        var formData = new FormData($('#frmBandaAgregar')[0]);
        //var dataURL = "";

        //if($this.save_image) dataURL = $this.canvas.toDataURL();

        formData.append("module", "bands_artists");
        formData.append("topic", "guardar");
        formData.append("id", $this.id);
        formData.append("nombre", $("#frmBandaAgregar-txtNombre").val());
        //formData.append("imagen", dataURL);

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
                $.GMWindowManager.close($('#frmBandaAgregar'));
                $this.caller();
            }
        });
    },
    open: function(id=0, caller=null){
        var $this = this;

        $this.id = id;
        $this.caller = caller;

        if($this.id==0){
            $("#frmBandaAgregar-txtNombre").val("");
            $this.element.find(".img-cover").prop("src", "/images/no-photo-portrait.jpg");

            $.GMWindowManager.open($("#frmBandaAgregar"));
        } else {
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "bands_artists",
                    topic: "obtener", 
                    id: id 
                },
                type: 'POST',
                dataType: 'json'
            }).done(function(data){
                if(data.Error==""){
                    var registro = data.Response;
                    $("#frmBandaAgregar-hId").val(id);
                    $("#frmBandaAgregar-lblTitulo").html("Editar banda/artista");
                    $("#frmBandaAgregar-txtNombre").val(registro.Nombre); 
                    $this.element.find(".img-cover").prop("src", data.Response.Imagen);

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

frmArtistas.initialize();
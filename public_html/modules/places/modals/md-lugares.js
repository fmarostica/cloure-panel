var frmLugares = {
    lugar_id: 0,
    caller: null,
    ajax_url: "/ajax/xhr.php",
    element: $("#frmLugarAgregar"),
    initialize: function(){
        var $this = this;
        $("#frmLugarAgregar-btnFile").change(function() {
            $this.previewImage(this);
        });
        $("#frmLugarAgregar-btnGuardar").click(function(){
            var formData = new FormData($('#frmLugarAgregar')[0]);

            $.GMWindowManager.open($("#gm-modalwait"));

            formData.append("module", "places");
            formData.append("topic", "guardar");
            formData.append("nombre", $("#frmLugarAgregar-txtNombre").val());
            formData.append("id", $("#frmLugarAgregar-hId").val());

            $.ajax({
                url: $this.ajax_url,
                type: 'POST',
                data: formData,
                dataType: 'json',
                xhr: function() 
                {
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload) myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
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

                    var error = data.Error;
                    if(error.length>0){
                        swal("Ocurrio un error al guardar!", error, "error");
                    }
                    else{
                        files = [];
                        $("#imagenesContainer").empty();
                        $this.caller(data);
                        $.GMWindowManager.close($this.element);
                    }
                },
                cache: false,
                contentType: false,
                processData: false
            });
        });
    },
    open: function(id=0, caller=null){
        var $this = this;
        $this.id = id;
        $this.caller = caller;

        if(id==0){
            $.GMWindowManager.open($this.element)
        } else {
            $.ajax({
                url: 'modules/cartelera/ajax/lugares-xhr.php',
                data: {
                    topic: "obtener", 
                    id: id 
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    if(data.Error==""){
                        var registro = data.Response;
                        $("#frmLugarAgregar-hId").val(id);
                        $("#frmLugarAgregar-txtNombre").val(registro.Nombre);
                        $.GMWindowManager.open($this.element);
                    }
                }
            });
        }
    }
}

frmLugares.initialize();

function progressHandlingFunction(e)
{
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

$("#frmLugarAgregar-btnCambiarImagen").click(function(){
    $("#frmLugarAgregar-btnFile").click();
});

function previewImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#frmLugarAgregar-img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}



$("#frmLugarAgregar-btnBorrarImagen").click(function() {
    $('#frmLugarAgregar-img').attr('src', "/panel/images/no-photo.jpg");
});
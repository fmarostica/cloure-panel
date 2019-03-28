var frmCategoriaN1 = {
    id: 0,
    caller: null,
    ajax_url: "/ajax/xhr.php",
    element: $("#frmCategoryN1"),
    initialize: function(){
        var $this = this;

        $this.element.find(".btn-save").click(function(){

            var formData = new FormData($this.element[0]);
            formData.append("module", "products_services_categories");
            formData.append("topic", "guardar_categoria_n1");
            formData.append("nombre", $this.element.find(".txt-name").val());
            formData.append("id", $this.id);

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
                    //$('#modalWait').modal("hide");
                    var error = data.Error;
                    if(error.length>0){
                        alert(error);
                    }
                    else{
                        if($.isFunction($this.caller)) $this.caller(data);
                        $.GMWindowManager.close($this.element);
                    }
                },
                cache: false,
                contentType: false,
                processData: false
            });
        });

        $this.element.find(".btn-select-image").click(function(){
            $this.element.find(".input-image").click();
        });

        $this.element.find(".input-image").change(function(){
            $this.load_picture(this);
        });
    },
    open: function(id=0, caller=null){
        var $this = this;
        $this.id = id;
        $this.caller = caller;
        if($this.id==0){
            $("#frmCategoriaAgregar_lblTitulo").html("Agregar categoria");
            $this.element.find(".txt-name").val("");
            $.GMWindowManager.open($this.element);
        } else {
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "products_services_categories",
                    topic: "obtener", 
                    tipo: "categoria_n1",
                    id: id 
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    var Categoria = data.Response;
                    $("#frmCategoriaAgregar_lblTitulo").html("Editar categoria");
                    $this.element.find(".category-image").prop("src", Categoria.Imagen);
                    $this.element.find(".txt-name").val(Categoria.Nombre);
                    $.GMWindowManager.open($this.element);
                }
            });
        }
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
    },
    load_picture: function(elem){
        var $this = this;
        if (elem.files && elem.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $this.element.find('.category-image').prop('src', e.target.result);
            }
            reader.readAsDataURL(elem.files[0]);
        }
    }
}

frmCategoriaN1.initialize();
var frmUsuariosGruposAdd = {
    usuario_id: 0,
    caller: null,
    ajax_url: "/ajax/xhr.php",
    element: $("#frmUsuariosGrupos"),
    initialize: function(){
        var $this = this;
        $("#btnBack").click(function(e){
            CloureManager.go_back();
        });
        $("#btnAceptar").click(function(e){
            $this.guardar();
        });
    },
    open: function(usuario_id, caller){
        var $this = this;
        $this.caller = caller;
        $this.usuario_id = usuario_id;
        $("#frmAgregarPago_txtImporte").val("");
        $.GMWindowManager.open($this.element);
    },
    guardar: function(){
        var $this = this;
        var formData = new FormData($('#frmUsuariosGrupos')[0]);

        formData.append("module", "users_groups");
        formData.append("topic", "guardar");

        $.ajax({
            url: $this.ajax_url,
            data: formData,
            type: 'POST',
            dataType: 'json',
            xhr: function() 
            {
                var myXhr = $.ajaxSettings.xhr();
                //if(myXhr.upload) myXhr.upload.addEventListener('progress',$this.progressHandlingFunction, false);
                return myXhr;
            },
            success: function(data){
                if(data.Error==""){
                    swal("Operación realizada!", "El grupo ha sido agregado.", "success");
                    CloureManager.go_back();
                    //if($.isFunction($this.caller)) $this.caller();
                } else {
                    swal("Error", data.Error, "error");
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }
} 

frmUsuariosGruposAdd.initialize();
var frmUsuariosGruposAdd = {
    id: 0,
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

        $this.id = CloureManager.active_param;
        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "users_groups",
                topic: "obtener",
                id: $this.id
            },
            type: 'POST',
            dataType: 'json',
            success: function(data){
                if(data.Error==""){
                    $user_group = data.Response;
                    $("#txtName").val($user_group.nombre);
                } else {
                    swal("Error", data.Error, "error");
                }
            }
        });
    },
    guardar: function(){
        var $this = this;
        var formData = new FormData($('#frmUsuariosGrupos')[0]);

        formData.append("module", "users_groups");
        formData.append("topic", "guardar");
        formData.append("id", $this.id);

        $.ajax({
            url: $this.ajax_url,
            data: formData,
            type: 'POST',
            dataType: 'json',
            xhr: function() 
            {
                var myXhr = $.ajaxSettings.xhr();
                return myXhr;
            },
            success: function(data){
                if(data.Error==""){
                    swal("Operación realizada!", "El grupo ha sido agregado.", "success");
                    CloureManager.go_back();
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
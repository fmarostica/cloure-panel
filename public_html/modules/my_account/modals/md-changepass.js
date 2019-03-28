var frmCambiarClave = {
	ajax_url: "/ajax_xhr.php",
	initialize: function(){
		var $this = this;

		$("#frmCambiarClave-btnGuardar").click(function(e){
            $.ajax({
                url: $this.ajax_url,
                type: 'POST',
                data: 
                { 
                    module: "my_account",
                    topic: "cambiar_clave",
                    clave_anterior: $("#frmCambiarClave-ClaveAnterior").val(),
                    clave_nueva: $("#frmCambiarClave-Clave").val(),
                    repetir_clave: $("#frmCambiarClave-Clave2").val()
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
                        swal("Operación realizada!", "Tu clave ha sido cambiada.", "success");
                    }
                }
            });
        });
	},
	open: function(){

	}
}

frmCambiarClave.initialize();
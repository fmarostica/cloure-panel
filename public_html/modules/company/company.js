var mod_company = {
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;

        $("#btnEmpresaGuardar").click(function(e){
            $.ajax({
                url: $this.ajax_url,
                data: {
                    topic: "update_account",
                    Tipo: $("#txtTipoEmpresa").val(),
                    Nombre: $("#txtNombre").val(),
                    CondicionIva: $("#txtCondicionIva").val(),
                    Cuit: $("#txtCuit").val(),
                    IIBB: $("#txtIIBB").val(),
                    Telefono: $("#txtTelefonoPrincipal").val(),
                    Mail: $("#txtMail").val(),
                    Web: $("#txtWeb").val()
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    if(data.Error==""){
                        swal("Operación realizada!", "Datos guardados correctamente.", "success");
                    } else {
                        swal("Error!", data.Error, "error");
                    }
                }
            });
        });

        $("#output-loader").css("display", "none");
    }
}

mod_company.initialize();
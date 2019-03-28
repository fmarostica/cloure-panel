var ucCupon = {
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;
        var d = new Date();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();

        $("#ucCupon-txtTipo").change(function(){
            var valor = $(this).val();
            $("#ucCupon-lblTipoSelect").css("display", "block");
            $("#ucCupon-txtTipoSelect").css("display", "block");
            if(valor=="edificio"){
                $("#ucCupon-lblTipoSelect").text("Edificio");
                $("#ucCupon-txtTipoSelect").prop("name", "idedificio");
                $this.cargar_edificios();
            }
            else if(valor=="propietario"){
                $this.cargar_propietarios();
                $("#ucCupon-lblTipoSelect").text("Propietario");
            }
            else if(valor=="propiedad"){
                $this.cargar_propiedades();
                $("#ucCupon-lblTipoSelect").text("Propiedad");
                $("#ucCupon-txtTipoSelect").prop("name", "iddpto");
            }
            else if(valor=="generico"){
                $("#ucCupon-lblTipoSelect").css("display", "none");
                $("#ucCupon-txtTipoSelect").css("display", "none");
            }
        });

        $("#ucCupon-txtMes>option[value="+month+"]").prop("selected", true);
        $("#ucCupon-txtAño>option[value="+year+"]").prop("selected", true);

        $("#ucCupon").submit(function(){
            //return false;
        });

        $this.cargar_edificios();

        $("#output-loader").css("display", "none");
    },
    cargar_edificios: function(){
        var $this = this;
        $("#ucCupon-txtTipoSelect").empty();

        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "buildings_ta",
                topic: "listar", 
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            $("#ucCupon-txtTipoSelect").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                        }
                    }
                }
            }
        });
    },
    cargar_propietarios: function(){
        $("#ucCupon-txtTipoSelect").empty();
        
    },
    cargar_propiedades: function(){
        var $this = this;
        $("#ucCupon-txtTipoSelect").empty();
        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "properties_ta", 
                topic: "listar", 
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            $("#ucCupon-txtTipoSelect").append("<option value='"+registros[i].Id+"'>"+registros[i].Direccion+"</option>");
                        }
                    }
                }
            }
        });
    }
}

ucCupon.initialize();
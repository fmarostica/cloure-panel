var frmInmueble = {
    element: $("#frmEmpresaInmueble"),
    ajax_url: "/ajax/xhr.php",
    caller: null,
    id: 0,
    initialize: function(){
        var $this = this;
        $this.element.on("click", ".btn-save", function(){
            var comprobantes = [];

            $(".txtTCE").each(function(){
                var tce_tmp = { tipo_comprobante_id: $(this).data("comprobante-id"), numero: $(this).val() };
                comprobantes.push(tce_tmp);
            });

            $.ajax({
                url: $this.ajax_url,
                data: 
                {
                    module: "company_branches",
                    topic: "guardar",
                    id: $this.id,
                    nombre: $("#frmEmpresaInmueble-txtNombre").val(),
                    direccion: $("#frmEmpresaInmueble-txtDireccion").val(),
                    tipo: $("#txtTipo").val(),
                    comprobantes: JSON.stringify(comprobantes)
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    if(data.Error==""){
                        $this.caller();
                        $.GMWindowManager.close($this.element);
                    } else {
                        alert(data.Error);
                    }
                }
            });
        });
    },
    open: function(id=0, caller=null){
        var $this = this;
        $this.id = id;
        $this.caller = caller;

        if(id==0){
            $("#frmEmpresaInmueble-lblTitulo").html("Agregar inmueble");
            $("#frmEmpresaInmueble-txtNombre").val("");
            $("#frmEmpresaInmueble-txtDireccion").val("");
            $.GMWindowManager.open($this.element);
        } else {
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "company_branches",
                    topic: "obtener", 
                    id: id 
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    var Sucursal = data.Response;
                    $("#frmEmpresaInmueble-lblTitulo").html("Editar inmueble");
                    $("#frmEmpresaInmueble-txtNombre").val(Sucursal.Nombre);
                    $("#frmEmpresaInmueble-txtDireccion").val(Sucursal.Direccion);
                    
                    $.GMWindowManager.open($this.element);
                }
            });
        }
    }
}

frmInmueble.initialize();
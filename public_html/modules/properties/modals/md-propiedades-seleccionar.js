var frmPropiedadesSeleccionar = {
	caller: null,
    elem: $("#frmPropiedadSeleccionar"),
    propiedad_seleccionada: {
        Id: 0,
        Titulo: ""
    },
	initialize: function(){
		var $this = this;
		$("#frmPropiedadSeleccionar-txtBuscar").on("change keyup", function(){
			$this.cargar_datos();
		});
        $("#frmPropiedadSeleccionar-lstItems").on("click", ".gm-itembox", function(){
            $this.seleccionar($(this));
        });
	},
	open: function(caller){
		this.caller = caller;
		this.cargar_datos();
		$("#frmPropiedadSeleccionar").modal("show");
	},
	cargar_datos: function(){
        $.ajax({
            url: 'modules/propiedades/ajax/propiedades_xhr.php',
            data: 
            { 
                topic: "listar", 
                filtro: $("#frmPropiedadSeleccionar-txtBuscar").val(), 
                limite: 10
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                var inicio = data.Response.Inicio;
                var fin = data.Response.Fin;
                var total_registros = data.Response.TotalRegistros;
                var totalPaginas = data.Response.TotalPaginas;

                $("#frmPropiedadSeleccionar-lstItems").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            var commands = registros[i].AvailableCommands;
                            $("#frmPropiedadSeleccionar-lstItems").append(
                                "<div class='gm-itembox editable' "+
                                " data-id='"+registros[i].Id+"'"+
                                " data-titulo='"+registros[i].Titulo+"'"+
                                ">"+
                                    "<div class='gm-row clearfix'>"+
                                        "<div class='col-md-10'>"+
                                            "<div class='gm-itembox-imgcontainer' style='width: 60px; height: 60px'>"+
                                                "<img src='/panel/images/user-icon.png' />"+
                                            "</div>"+
                                            "<div style='display: inline-block'>"+
                                                "<span class='gm-itembox-title'>"+registros[i].Titulo+"</span><br />"+
                                                "<div>"+
                                                    "<span class='gm-itembox-additional-info'>"+
                                                        ((registros[i].Direccion!="") ? "<i class='fa fa-map-marker'></i> "+registros[i].Direccion+((registros[i].CP!="") ? " CP: "+registros[i].CP : "") + ((registros[i].Localidad!="") ? " - "+registros[i].Localidad : "")+((registros[i].PaisN1!=null && registros[i].PaisN1!="") ? " ("+registros[i].PaisN1+")" : "") : "")+
                                                    "</span>"+
                                                 "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                            for (var j = 0; j < commands.length; j++) {
                                if(registros[i].AvailableCommands[j]=="borrar") $("#cmdbox-"+registros[i].Id).append("<button class='gm-btn danger' onclick='borrar("+registros[i].Id+")'><i class='fa fa-trash'></i></button>");
                            }
                        }
                    } else {
                        $("#frmPropiedadSeleccionar-lstItems").append("<div class='gm-empty-content'>No se encontraron registros<br /></div>");
                        $("#frmPropiedadSeleccionar-lstItems").addClass("empty");
                    }
                }
            }
        });
    },
    seleccionar: function(item){
        this.propiedad_seleccionada.Id = item.data("id");
        this.propiedad_seleccionada.Titulo = item.data("titulo");
        this.elem.modal("hide");
        if($.isFunction(this.caller)) this.caller(this.propiedad_seleccionada);
    }
}

frmPropiedadesSeleccionar.initialize();
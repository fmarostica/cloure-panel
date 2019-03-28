var frmSeguimiento = {
	contacto_id: 0,
	propiedad_id: 0,
	initialize: function(){
		var $this = this;
		$("#frmPropiedadesSeguimientoAgregar-btnContacto").click(function(){
			$this.abrir_frmseleccioncte();
		});

		$("#frmPropiedadesSeguimientoAgregar-btnGuardar").click(function(){
			$this.guardar();
		});

		$("#frmPropiedadesSeguimientoAgregar-btnPropiedad").click(function(){
			$this.seleccionar_propiedad();
		});
	},
	open: function(id, caller){
		this.caller = caller;
		if(id==0){
			$("#frmPropiedadesSeguimientoAgregar-lblTitulo").html("Agregar seguimiento");
		} else {
			$("#frmPropiedadesSeguimientoAgregar-lblTitulo").html("Editar seguimiento");
			var registro = null;
			$.ajax({
		        url: 'modules/propiedades/ajax/seguimientos-xhr.php',
		        data: {
		            topic: "obtener", 
		            id: id 
		        },
		        type: 'POST',
		        dataType: 'json',
		        success: function(data){
		        	registro = data.Response;
		        	$("#frmPropiedadesSeguimientoAgregar-btnContacto").html(registro.Contacto);
		        }
		    });
		}
		$("#frmPropiedadesSeguimientoAgregar").modal("show");
	},
	abrir_frmseleccioncte: function(){
		var $this_seg = this;
		frmUsuariosSeleccionar.open(function(data){
			$("#frmPropiedadesSeguimientoAgregar-btnContacto").html(data.RazonSocial);
			$this_seg.contacto_id = data.Id;
		});
	},
	agregar_actividad: function(){
		
	},
	guardar: function(){
		var $this = this;
		var actividades = [];

		$.ajax({
            url: '/panel/modules/propiedades/ajax/seguimientos-xhr.php',
            type: 'POST',
            data: {
            	topic: "guardar",
            	contacto_id: $this.contacto_id,
            	propiedad_id: $this.propiedad_id,
            	actividades: JSON.stringify(actividades)
            },
            dataType: 'json',
            success: function(data){
                $('#modalwait').modal("hide");
                var error = data.Error;
                if(error.length>0){
                    alert(error);
                }
                else{
                    var consorcio_id = data.Response.ConsorcioId; 
                    $('#frmPropiedadesSeguimientoAgregar').modal("hide");
                    if($.isFunction($this.caller)) $this.caller(data);
                }
            }
        });
	},
	seleccionar_propiedad: function(){
		$this = this;
		frmPropiedadesSeleccionar.open(function(data){
			$this.propiedad_id = data.Id;
			$("#frmPropiedadesSeguimientoAgregar-btnPropiedad").html(data.Titulo);
		});
	}
}

frmSeguimiento.initialize();
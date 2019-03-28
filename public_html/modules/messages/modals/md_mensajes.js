var frmMensaje = {
	element: $("#frmMensaje"),
	id: 0,
	caller: null,
	ajax_url: "/ajax/xhr.php",
	initialize: function(){
		var $this = this;

		$("#frmMensaje_btnEnviar").click(function(){
		    $.ajax({
		        url: 'modules/mensajes/ajax/mensajes_xhr.php',
		        data: {
		            topic: "enviar_respuesta",
		            notificacion_id: $("#frmMensaje_id").val(),
		            mensaje: $("#frmMensaje_Texto").val()
		        },
		        type: 'POST',
		        dataType: 'json',
		        success: function(data){
		            if(data.Error=="")
		            {
		                $.GMWindowManager.close($this.element);
		                $this.caller();
		            }
		            else
		            {
		                swal("Error!", data.Error, "error");
		            }
		        }
		    });
		});

		$("#frmMensajes-txtGrupo").change(function(){
			if($(this).val()>0){
				$("#frmMensajes-txtMail").css("display","none");
			} else {
				$("#frmMensajes-txtMail").css("display","block");
			}
		});
	},
	open: function(id=0, caller=null){
		var $this = this;
		$this.id = id;
		$this.caller = caller;
		$this.element.find(".mensajes").empty();

		if($this.id==0){
			$("#frmMensajes-create").css("display", "block");
			$("#frmMensajes-readonly").css("display", "none");
			$.GMWindowManager.open($this.element);
		} else {
			$("#frmMensajes-create").css("display", "none");
			$("#frmMensajes-readonly").css("display", "block");

			$.ajax({
				url: $this.ajax_url,
				data: {
					module: "messages",
					topic: "obtener",
					notificacion_id: id
				},
				type: 'POST',
				dataType: 'json',
				success: function(data){
					var registro = data.Response;
					
					$("#frmMensaje").find("#lblTitulo").html("Mensaje");
					
					for (var i = 0; i < registro.Mensajes.length; i++) {
						var msgbox = "";

						if(registro.Usuario!=null && registro.Mensajes[i].Usuario!=null){
							if(registro.Mensajes[i].Usuario.Id == registro.Usuario.Id){
								msgbox = '<div class="gm-col-12" style="color: #fff;">'+
									'<div style="border-radius: 5px; background: #558c3a; padding: 10px; margin-bottom: 10px;">'+
										'<div style="font-size: 16px">'+registro.Mensajes[i].Usuario.Apellido+", "+registro.Mensajes[i].Usuario.Nombre+'</div>'+
										'<div style="font-size: 14px">'+registro.Mensajes[i].Fecha+'</div>'+
										'<hr />'+
										'<p>'+registro.Mensajes[i].Mensaje+'</p>'+
									'</div>'+
								'</div>';
							}
							else{
								msgbox = '<div class="gm-col-12" style="color: #fff;">'+
									'<div style="border-radius: 5px; background: #7e32bc; padding: 10px; margin-bottom: 10px;">'+
										'<div style="font-size: 16px">'+registro.Mensajes[i].Usuario.Apellido+", "+registro.Mensajes[i].Usuario.Nombre+'</div>'+
										'<div style="font-size: 14px">'+registro.Mensajes[i].Fecha+'</div>'+
										'<hr />'+
										'<p>'+registro.Mensajes[i].Mensaje+'</p>'+
									'</div>'+
								'</div>';
							}
						} else {
							msgbox = '<div class="gm-col-12" style="color: #fff;">'+
								'<div style="border-radius: 5px; background: #7e32bc; padding: 10px; margin-bottom: 10px;">'+
									'<div style="font-size: 14px">'+registro.Mensajes[i].Fecha+'</div>'+
									'<hr />'+
									'<p>'+registro.Mensajes[i].Mensaje+'</p>'+
								'</div>'+
							'</div>';
						}

						$this.element.find(".mensajes").append(msgbox);
					}

					$.GMWindowManager.open($this.element);
				}
	    	});
		}
	}
}

frmMensaje.initialize();
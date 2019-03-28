var frmEmailAccountAdd = {
	element: $("#frmEmailAccountAdd"),
	email: "",
	caller: null,
	ajax_url: "/ajax/xhr.php",
	topic: "",
	cmdDomains: null,
	initialize: function(){
		var $this = this;

		$this.cmdDomains = $("#frm_mail_account_add_txtMailAddress");

		$("#frm_email_account_add_btnSave").click(function(){
		    $.ajax({
		        url: $this.ajax_url,
		        data: {
		            module: "email_accounts",
		            topic: $this.topic,
		            name: $("#frm_mail_account_add_txtMailName").val(),
					domain: $this.cmdDomains.val(),
					email: $this.email,
		            pass: $("#frm_mail_account_add_txtPass").val(),
		            repeat_pass: $("#frm_mail_account_add_txtRepeatPass").val()
		        },
		        type: 'POST',
		        dataType: 'json',
		        success: function(data){
		            if(data.Error=="")
		            {
		                $.GMWindowManager.close($this.element);
						$this.caller();
						swal("Operación realizada!", data.Response, "success");
		            }
		            else
		            {
		                swal("Error!", data.Error, "error");
		            }
		        }
		    });
		});

		$this.cargar_dominios();
	},
	open: function(email="", caller=null){
		var $this = this;
		$this.email = email;
		$this.caller = caller;
		$this.element.find(".mensajes").empty();

		if($this.email==""){
			$("#frmEmailAccount-dvAddMode").css("display", "block");
			$("#frmEmailAccount-dvEditMode").css("display", "none");
			$("#frmEmailAccountAdd-lblTitulo").html("Agregar cuenta de correo");
			$this.topic = "add_email_account";
		} else {
			$("#frmEmailAccount-dvAddMode").css("display", "none");
			$("#frmEmailAccount-dvEditMode").css("display", "block");
			$("#frmEmailAccountAdd-lblTitulo").html("Editar cuenta de correo");
			$this.topic = "update_email_account";
		}

		$.GMWindowManager.open($this.element);
	},
	cargar_dominios: function(){
		var $this = this;
		$this.cmdDomains.empty();

        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "domains", 
                topic: "listar"
            },
            type: 'POST',
            dataType: 'json',
            success: function(data){
                registros = data.Response.Registros;
                for (let i = 0; i < registros.length; i++) {
                    $this.cmdDomains.append("<option value='"+registros[i].Nombre+"'>@"+registros[i].Nombre+"</option>");
                }
            }
        });
    }
}

frmEmailAccountAdd.initialize();
var frmUsuariosSeleccionar = {
    caller: null,
    ajax_url: "/ajax/xhr.php",
    selected_user: {
        Id: 0,
        Nombre: "",
        Apellido: "",
        RazonSocial: "",
        Saldo: 0
    },
    elem: $("#frmUsuarioSeleccionar"),
    initialize: function(){
        var $this = this;
        $("#frmUsuarioSeleccionar-txtBuscar").on("keyup change", function(e){
            $this.cargar_usuarios();
        });

        $("#frmUsuarioSeleccionar-btnAgregarUsuario").click(function(){
            $this.agregar_usuario();
        });

        $("#frmUsuarioSeleccionar-lstUsuarios").on("click", ".gm-itembox", function(){
            $this.seleccionar($(this));
        });
    },
    open: function(caller=null){
        this.caller = caller;
        $.GMWindowManager.open(this.elem);
        this.cargar_usuarios();
    },
    agregar_usuario: function(){
        var $this = this;
        frmUsuariosAgregar.open(function(data){
            $this.caller(data);
            $.GMWindowManager.close(this.elem);
        });
    },
    cargar_usuarios: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "users",
                topic: "get_list", 
                filtro: $("#frmUsuarioSeleccionar-txtBuscar").val(), 
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

                $("#frmUsuarioSeleccionar-lstUsuarios").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            var commands = registros[i].AvailableCommands;
                            $("#frmUsuarioSeleccionar-lstUsuarios").append(
                                "<div class='gm-itembox editable' "+
                                " data-id='"+registros[i].id+"'"+
                                " data-nombre='"+registros[i].nombre+"'"+
                                " data-apellido='"+registros[i].apellido+"'"+
                                " data-razon-social='"+registros[i].razon_social+"'"+
                                " data-telefono='"+registros[i].telefono+"'"+
                                " data-saldo='"+registros[i].saldo+"'"+
                                ">"+
                                    "<div class='gm-row clearfix'>"+
                                        "<div class='col-md-10'>"+
                                            "<div class='gm-itembox-imgcontainer' style='width: 60px; height: 60px'>"+
                                                "<img src='/images/user-icon.png' />"+
                                            "</div>"+
                                            "<div style='display: inline-block'>"+
                                                "<span class='gm-itembox-title'>"+registros[i].razon_social + ((registros[i].pais_id!=null && registros[i].pais_id!=0) ? " <img src='/panel/images/paises/"+registros[i].bandera_pais+"' style='display: inline-block; height: 20px; padding: 0px; margin-left: 6px; object-fit: contain;' /> " :"")+"</span><br />"+
                                                ((registros[i].grupo_id!=null && registros[i].grupo_id!="") ? "<span class='gm-itembox-additional-info'><i class='fa fa-users'></i> "+registros[i].grupo_id+"</span> " : "")+
                                                "<div class=''>"+
                                                    ((registros[i].mail!="") ? "<span class='gm-itembox-additional-info'><i class='fa fa-envelope'></i> "+registros[i].mail+"</span> " : "")+
                                                    "Saldo: $ "+registros[i].saldo+"</span>"+
                                                "</div>"+
                                                "<div>"+
                                                    "<span class='gm-itembox-additional-info'>"+
                                                        ((registros[i].direccion!="") ? "<i class='fa fa-map-marker'></i> "+registros[i].direccion+((registros[i].cp!="") ? " CP: "+registros[i].cp : "") + ((registros[i].localidad!="") ? " - "+registros[i].localidad : "")+((registros[i].pais_n1!=null && registros[i].pais_n1!="") ? " ("+registros[i].pais_n1+")" : "") : "")+
                                                    "</span>"+
                                                 "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                            for (var j = 0; j < commands.length; j++) {
                                if(registros[i].AvailableCommands[j]=="borrar") $("#cmdbox-"+registros[i].id).append("<button class='gm-btn danger' onclick='borrar("+registros[i].id+")'><i class='fa fa-trash'></i></button>");
                            }
                        }
                    } else {
                        $("#frmUsuarioSeleccionar-lstUsuarios").append("<div class='gm-empty-content'>No se encontraron registros<br /></div>");
                        $("#frmUsuarioSeleccionar-lstUsuarios").addClass("empty");
                    }
                }
            }
        });
    },
    seleccionar: function(item){
        this.selected_user.Id = item.data("id");
        this.selected_user.Apellido = item.data("apellido");
        this.selected_user.Nombre = item.data("nombre");
        this.selected_user.Saldo = parseFloat(item.data("saldo"));
        $.GMWindowManager.close(this.elem);
        if($.isFunction(this.caller)) this.caller(this.selected_user);
    }
}

frmUsuariosSeleccionar.initialize();
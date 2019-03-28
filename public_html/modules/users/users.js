var mod_users = {
    pagina: 1,
    totalPaginas: 1,
    module_name: "users",
    element: $("#ucUsuarios"),
    ajax_url: "/ajax/xhr.php",
    locales: null,
    initialize: function(){
        var $this = this;

        var typingTimer;
        var doneTypingInterval = 300;
        var $input = $('#myInput');

        $this.get_locales();

        $(".gm-filter").on("change keyup", function(e){
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
            
        });
        function doneTyping () {
            $this.cargar_datos();
        }

        $this.element.on("click", ".btn-add-user", function(){
            frmUsuariosAgregar.open(function(){
                $this.cargar_datos();
            });
        });

        $("#ucUsuarios-lstUsuarios").on("click", ".btnReasignarPass", function(e){
            $this.cambiar_clave($(this).closest(".gm-itembox").data("id"));
            e.stopPropagation();
        });
        $("#ucUsuarios-lstUsuarios").on("click", ".gm-itembox", function(e){
            $this.open_frmusuarios($(this).data("id"));
            e.stopPropagation();
        });
        $("#ucUsuarios-lstUsuarios").on("click", ".btnAgregarPago", function(e){
            $this.agregar_pago($(this).closest(".gm-itembox").data("id"));
            e.stopPropagation();
        });
        $("#ucUsuarios-lstUsuarios").on("click", ".btnBorrar", function(e){
            $this.borrar($(this).closest(".gm-itembox").data("id"));
            e.stopPropagation();
        });
        $("#ucUsuarios-lstUsuarios").on("click", ".btnAccountSummaryPage", function(e){
            //$this.agregar_pago($(this).closest(".gm-itembox").data("id"));
            var id = $(this).closest(".gm-itembox").data("id");
            CloureManager.navigate("users", "account_summary", id);
            e.stopPropagation();
        });
        
        $("#ucUsuarios-lstUsuarios").on("click", ".btnAccountSummary", function(e){
            e.stopPropagation();
        });

        //$this.cargar_grupos();
        
        $this.cargar_datos();

        $this.get_locales();
    },
    set_locale: function(locale_obj){
        var $this = this;
        $this.locales = locale_obj;
        $this.element.find(".gm-uc-page-header-title").html(locale_obj.title);

        frmUsuariosAgregar.elem.find(".field-last-name").text(mod_users.locales.last_name);
        frmUsuariosAgregar.elem.find(".field-name").text(mod_users.locales.name);
        frmUsuariosAgregar.elem.find(".field-birthdate").text(mod_users.locales.birthdate);
        frmUsuariosAgregar.elem.find(".field-gender").text(mod_users.locales.gender);
        frmUsuariosAgregar.elem.find(".field-group").text(mod_users.locales.group);
        frmUsuariosAgregar.elem.find(".field-balance").text(mod_users.locales.balance_field);
        frmUsuariosAgregar.elem.find(".field-identification-type").text(mod_users.locales.identification_type);
        frmUsuariosAgregar.elem.find(".field-identification-number").text(mod_users.locales.identification_number);
        frmUsuariosAgregar.elem.find(".field-company").text(mod_users.locales.company);
        frmUsuariosAgregar.elem.find(".field-iva-condition").text(mod_users.locales.iva_condition);
        frmUsuariosAgregar.elem.find(".field-how-do-you-find-us").text(mod_users.locales.how_do_you_find_us);
        frmUsuariosAgregar.elem.find(".field-telephone").text(mod_users.locales.telephone);
        frmUsuariosAgregar.elem.find(".field-email").text(mod_users.locales.email);
        frmUsuariosAgregar.elem.find(".field-website").text(mod_users.locales.website);
        frmUsuariosAgregar.elem.find(".field-observations").text(mod_users.locales.observations);
        frmUsuariosAgregar.elem.find(".field-country").text(mod_users.locales.country);
        frmUsuariosAgregar.elem.find(".field-state-province").text(mod_users.locales.state_province);
        frmUsuariosAgregar.elem.find(".field-city").text(mod_users.locales.city);
        frmUsuariosAgregar.elem.find(".field-address").text(mod_users.locales.address);
        frmUsuariosAgregar.elem.find(".field-zip-postal-code").text(mod_users.locales.zip_postal_code);
        frmUsuariosAgregar.elem.find(".field-building").text(mod_users.locales.building);
        frmUsuariosAgregar.elem.find(".field-floor-number").text(mod_users.locales.floor_number);
        frmUsuariosAgregar.elem.find(".field-apartment-number").text(mod_users.locales.apartment_number);
        frmUsuariosAgregar.elem.find(".field-discount").text(mod_users.locales.discount);
        frmUsuariosAgregar.elem.find(".field-allow-current-account").text(mod_users.locales.allow_current_account);
        frmUsuariosAgregar.elem.find(".field-maximum-balance-allowed").text(mod_users.locales.maximum_balance_allowed);
        frmUsuariosAgregar.elem.find(".btn-close").text(mod_users.locales.cancel);
        frmUsuariosAgregar.elem.find(".btn-save").text(mod_users.locales.save_changes);
    },
    get_locales: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: {
                topic: "get_locales", 
                module_name: $this.module_name
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            $this.set_locale(data);
        });
    },
    agregar_pago: function(usuario_id){
        var $this = this;
        frmUsuariosAgregarPago.open(usuario_id, function(){
            $this.cargar_datos();
        })
    },
    borrar: function(id){
        var $this = this;
        swal({
            title: $this.locales.msg_delete_user,
            text: $this.locales.msg_delete_user_advertice,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: $this.locales.yes,
            cancelButtonText: $this.locales.no,
            showLoaderOnConfirm: true,
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "users",
                    topic: "borrar", 
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal(data.Response, $this.locales.msg_delete_success_desc, "success", {
                            button: $this.locales.ok,
                        });
                        $this.cargar_datos();
                    }
                    else{
                        swal($this.locales.msg_delete_fail, error, "error");
                    }
                }
            });
        });
    },
    open_frmusuarios: function(id=0){
        var $this = this;
        frmUsuariosAgregar.open(function(){
            $this.cargar_datos();
        }, id);
    },
    cargar_grupos: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "users_groups",
                topic: "get_list", 
                col: $("#col").val(), 
                order: $("#order").val()
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#ucUsuarios-txtGrupo").empty();
                if(data.Error==""){
                    $("#ucUsuarios-txtGrupo").append("<option value=''>{all_groups}</option>");
                    for (var i = 0; i<registros.length; i++) {
                        $("#ucUsuarios-txtGrupo").append("<option value='"+registros[i].Nombre+"'>"+registros[i].Nombre+"</option>");
                    }
                }
            }
        });
    },
    cargar_paises: function(){
        $.ajax({
            url: 'modules/tablas_generales/ajax/paises_xhr.php',
            data: 
            { 
                topic: "listar", 
                col: $("#col").val(), 
                order: $("#order").val(),
                limite: 0
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;
                $("#txtPais").empty();
                $("#frmUsuariosAgregar_txtTelefonoCodPais").empty();
                $("#frmUsuariosAgregar_txtPais").empty();
                if(data.Error==""){
                    $("#txtPais").append("<option value='0'>Todos los países</option>");
                    for (var i = 0; i<registros.length; i++) {
                        $("#frmUsuariosAgregar_txtTelefonoCodPais").append("<option value='"+registros[i].CodigoTelefonico+"'>"+registros[i].Nombre+" ("+registros[i].CodigoTelefonico+")</option>");
                        $("#frmUsuariosAgregar_txtPais").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                        $("#txtPais").append("<option value='"+registros[i].Id+"'>"+registros[i].Nombre+"</option>");
                    }
                }

                $("#frmUsuariosAgregar_txtPais").change();
            }
        });
    },
    cargar_datos: function(pagina=1){
        var $this = this;

        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "users",
                topic: "get_list", 
                filtro: $("#txtBuscar").val(),
                pagina : $this.pagina,
                ordenar_por: $("#ucUsuarios-txtOrdenarPor").val(),
                orden: $("#ucUsuarios-txtOrden").val()
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                $this.total_registros = data.Response.TotalRegistros;
                $this.totalPaginas = data.Response.TotalPaginas;
                $this.element.find(".gm-itembox-container").empty();

                if(data.Error==""){
                    registros = data.Response.Registros;
                    if(registros.length>0){
                        $("#gm-uc-page-footer-total-registers").html($this.total_registros);
                        $("#gm-uc-page-footer-page").html(pagina);
                        $("#gm-uc-page-footer-pages").html($this.totalPaginas);

                        for (var i = 0; i<registros.length; i++) {
                            var item = registros[i];
                            var commands = item.AvailableCommands;
                            var commands_controls = "";
                            var title = item.razon_social;

                            for (var j = 0; j < commands.length; j++) {
                                //if(commands[j].Name=="account_summary") commands_controls+="<a href='/pdf-export/account-summary/?id="+registros[i].id+"' target='_blank' class='gm-btn primary btnAccountSummary'><i class='fa fa-clipboard-list'></i></a>";
                                if(commands[j].Name=="account_summary") commands_controls+="<button type='button' class='gm-btn primary btnAccountSummaryPage'><i class='fa fa-list-ul'></i></button>";
                                if(commands[j].Name=="send_mail_pass") commands_controls+="<button class='gm-btn primary btnReasignarPass'><i class='fa fa-key'></i></button>";
                                if(commands[j].Name=="add_payment") commands_controls+="<button class='gm-btn success btnAgregarPago'><i class='fa fa-dollar-sign'></i></button>";
                                if(commands[j].Name=="delete") commands_controls+="<button class='gm-btn danger btnBorrar'><i class='fa fa-trash'></i></button>";
                            }

                            $this.element.find(".gm-itembox-container").append(
                                "<div class='gm-itembox editable' data-id='"+registros[i].id+"'>"+
                                    "<div class='gm-row'>"+
                                        "<div class='col-md-10'>"+
                                            "<div class='gm-itembox-imgcontainer'>"+
                                                "<img src='"+registros[i].imagen+"' />"+
                                            "</div>"+
                                            "<div style='display: inline-block'>"+
                                                "<span class='gm-itembox-title'>"+title+"</span><br />"+
                                                ((item.grupo_id!=null && item.grupo_id!="") ? "<span class='gm-itembox-additional-info'><i class='fa fa-users'></i> "+registros[i].grupo_id+"</span> " : "")+
                                                "<div class=''>"+
                                                    ((item.mail!=null && item.mail!="") ? "<span class='gm-itembox-additional-info'><i class='fa fa-envelope'></i> "+registros[i].mail+"</span> " : "")+
                                                "</div>"+
                                                "<div>"+
                                                    "<span class='gm-itembox-additional-info'>"+
                                                        ((item.direccion!=null && item.direccion!="") ? "<i class='fa fa-map-marker'></i> "+item.direccion : "")+
                                                    "</span>"+
                                                 "</div>"+
                                                 "<br><label style='color: #12960c; font-size: 24px; width: 100%; text-align: right;'>$ "+registros[i].saldo+"</label>"+
                                            "</div>"+
                                        "</div>"+
                                        "<div class='col-md-12 col-xs-12 gm-itembox-buttons'>"+
                                            "<div class='command_buttons' style='margin-top: 10px'>"+
                                                commands_controls+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                        }

                        if($this.pagina>1){
                            $("#ucUsuarios-dvPaginador").find(".btnAnterior").prop("disabled",false);
                            $("#ucUsuarios-dvPaginador").find(".btnPrimero").prop("disabled", false);
                        } else {
                            $("#ucUsuarios-dvPaginador").find(".btnAnterior").prop("disabled",true);
                            $("#ucUsuarios-dvPaginador").find(".btnPrimero").prop("disabled", true);
                        }
                        
                        if($this.pagina<$this.totalPaginas){
                            $("#ucUsuarios-dvPaginador").find(".btnSiguiente").prop("disabled",false);
                            $("#ucUsuarios-dvPaginador").find(".btnUltimo").prop("disabled", false);
                        } else {
                            $("#ucUsuarios-dvPaginador").find(".btnSiguiente").prop("disabled",true);
                            $("#ucUsuarios-dvPaginador").find(".btnUltimo").prop("disabled", true);
                        }
                    } else {
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron registros<br />"+
                        "<span class='gm-small'>Intenta con otros criterios de búsqueda</span>"+
                        "</div>");
                        $(".gm-itembox-container").addClass("empty");
                    }
                    var str = document.getElementById("ucUsuarios-PagerInfo").innerHTML;
                    var res = str.replace("{page}", $this.pagina);
                    res = res.replace("{total_pages}", $this.totalPaginas);
                    document.getElementById("ucUsuarios-PagerInfo").innerHTML = res;
                }
                else{
                    $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
                }
                $("#output-loader").css("display", "none");
            }
        });
    },
    cambiar_clave: function(id){
        swal({
            title: "Seguro que deseas reasignar la clave de este usuario?",
            text: "Se enviará un correo al usuario!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            showLoaderOnConfirm: true,
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: 'modules/usuarios/ajax/xhr_usuarios.php',
                data: {
                    topic: "cambiar_clave", 
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Operación realizada!", "Se ha enviado un correo al usuario con instrucciones para reasignar su clave.", "success");
                        cargar_datos();
                    }
                    else{
                        swal("Error al reasignar la clave!", error, "error");
                    }
                }
            });
        });
    }
}

mod_users.initialize();
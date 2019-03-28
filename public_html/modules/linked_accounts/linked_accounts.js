var mod_linked_account = {
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;
        $("#txtBuscar").keyup(function(){
            $this.cargar_datos();
        });
        
        $("#linked_accounts_boxes").on("click", ".account-box", function(){
            //onclick='editar(\""+registros[i].Name+"\")'
            let account_id = $(this).data("account-id");
            $this.editar(account_id);
        });

        $("#btnAgregar").click(function()
        {
            $.ajax({
                url: $this.ajax_url,
                data: 
                {
                    module: "linked_accounts",
                    topic: "seleccionar", 
                    filtro: $("#txtBuscar").val(), 
                    pagina : pagina, 
                    col: $("#col").val(), 
                    order: $("#order").val() 
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
        
                    $("#md_respuesta").empty();
                    if(data.Error==""){
                        
                        for (var i = 0; i<registros.length; i++) {
                            $("#md_respuesta").append(
                                "<a style='display: inline-block; width: 120px; height: 120px; padding: 5px; margin: 5px;' href=''>"+
                                    "<img src='/images/linked_accounts/logo_"+registros[i].Name+".png' style='width: 100%; height: 100%; object-fit: contain;' />"+
                                "</a>"
                            );
                        }
                        $.GMWindowManager.open($("#frmCuentasVinculadas"));
                    }
                    else{
                        alert(data.Error);
                    }
                }
            });
        });

        $("#frmCuentasVinculadas_btnGuardar").click(function(e){
            var properties = [];
        
            $(".acct_input").each(function(){
                var valor = "";

                if($(this).prop("type")=="checkbox"){
                    if($(this).is(":checked")){
                        valor = "1";
                    } else {
                        valor = "0";
                    }
                } else {
                    valor = $(this).val();
                }

                var property_tmp = { id: $(this).data("id"), valor: valor };
                properties.push(property_tmp);
            });
        
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "linked_accounts",
                    topic: "guardar", 
                    id: $("#frmCuentasVinculadas_id").val(),
                    data: JSON.stringify(properties)
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    if(data.Error==""){
                        swal("Operación realizada!", "", "success");
                        $this.cargar_datos();
                        $.GMWindowManager.close($("#frmCuentasVinculadas"));
                    } else {
                        swal("Error!", data.Error, "error");
                    }
                }
            });
        });

        $this.cargar_datos();
    },
    cargar_datos: function(pagina=1){
        var $this = this;

        $("#btnSiguiente").attr("disabled", false);
        $("#btnUltimo").attr("disabled", false);
        $("#btnPrimero").attr("disabled", false);
        $("#btnAnterior").attr("disabled", false);

        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "linked_accounts",
                topic: "listar", 
                filtro: $("#txtBuscar").val(), 
                pagina : pagina, 
                col: $("#col").val(), 
                order: $("#order").val() 
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                if(data.Error==""){
                    var registros = data.Response.Registros;
                    var inicio = data.Response.Inicio;
                    var fin = data.Response.Fin;
                    var total_registros = data.Response.TotalRegistros;
                    var totalPaginas = data.Response.TotalPaginas;
        
                    $("#respuesta").empty();
                    if(data.Error==""){
                        for (var i = 0; i<registros.length; i++) {
                            $("#respuesta").append(
                                "<div class='account-box' data-account-id='"+registros[i].Name+"' data-account-title='"+registros[i].Title+"'>"+
                                    "<img src='images/linked_accounts/logo_"+registros[i].Name+".png' />"+
                                    "<div>"+
                                        registros[i].Status+
                                    "</div>"+
                                    (registros[i].Status.toLowerCase()=="vinculado" ? "<div><button class='gm-btn danger btnDesvincular'>desvincular</button></div>" : "") + 
                                "</div>"
                            );
                        }
                        
                        $(".btnDesvincular").click(function(e){
                            var parent = $(this).closest(".account-box");
                            var account_name = parent.data("account-id");
                            var account_title = parent.data("account-title");
                            
                            swal({
                                title: "Seguro que deseas desvincular la cuenta "+account_title+"?",
                                text: "",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Si",
                                cancelButtonText: "No",
                                showLoaderOnConfirm: true,
                                closeOnConfirm: false
                            }, function () {
                                $.ajax({
                                    url: $this.ajax_url,
                                    data: {
                                        module: "linked_accounts",
                                        topic: "borrar", 
                                        id: account_name
                                    },
                                    type: 'POST',
                                    dataType: 'json',
                                    success: function(data)
                                    {
                                        var error = data.Error;
                                        if(error==""){
                                            swal("Operación realizada!", "La cuenta ha sido desvinculada.", "success");
                                            $this.cargar_datos();
                                        }
                                        else{
                                            swal("Error!", error, "error");
                                        }
                                    }
                                });
                            });
                            e.stopPropagation();
                        });

                        $(".dataTables_info").text(function () {
                            return $(this).text().replace("{REG_INIT}", inicio).replace("{REGS_END}", fin).replace("{REGS_TOTAL}", total_registros); 
                        });
        
        
                        $(".pagination").empty();
                        if(pagina==1)
                            $(".pagination").append("<li id='btnAnterior' class='paginate_button previous disabled'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Anterior</a></li>");
                        else
                            $(".pagination").append("<li id='btnAnterior' class='paginate_button previous'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Anterior</a></li>");
                        
                        for (var i=1; i<=totalPaginas;i++)
                        {
                            if(pagina==i)
                                $(".pagination").append("<li class='paginate_button active'><a tabindex='0' data-dt-idx='2' aria-controls='DataTables_Table_1' href='#'>"+i+"</a></li>");
                            else
                                $(".pagination").append("<li class='paginate_button'><a tabindex='0' data-dt-idx='2' aria-controls='DataTables_Table_1' href='#'>"+i+"</a></li>");
                        }
        
                        if(pagina==totalPaginas)
                            $(".pagination").append("<li id='btnSiguiente' class='paginate_button next disabled'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Siguiente</a></li>");
                        else
                            $(".pagination").append("<li id='btnSiguiente' class='paginate_button next'><a tabindex='0' data-dt-idx='0' aria-controls='DataTables_Table_1' href='#'>Siguiente</a></li>");
                        
                        $("#btnPrimero").click(function(){
                            pagina=1;
                            cargar_datos();
                        });
        
                        $("#btnAnterior").click(function(){
                            pagina-=1;
                            cargar_datos();
                        });
        
                        $("#btnSiguiente").click(function(){
                            pagina+=1;
                            cargar_datos();
                        });
        
                        $("#btnUltimo").click(function(){
                            pagina=totalPaginas;
                            cargar_datos();
                        });
                    }
                    else{
        
                    }
                }
                else {
                    $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
                }
                $("#output-loader").css("display", "none");
            }
        });
    },
    editar: function(id){
        var $this = this;
        
        $.ajax({
            url: $this.ajax_url,
            data: {
                module: "linked_accounts",
                topic: "obtener", 
                id: id 
            },
            type: 'POST',
            dataType: 'json',
            success: function(data){
                var registro = data.Response;
                $("#frmCuentasVinculadas_id").val(id);
                $("#md_account_respuesta").empty();
                
                var campos = registro.Data;
    
                $("#md_account_respuesta").empty();
                for (i = 0; i < campos.length; i++) {
                    var control = "";
                    if(campos[i].tipo=="text"){
                        control = "<label>"+campos[i].titulo+"</label>";
                        control += "<input type='text' data-id='"+campos[i].nombre+"' class='gm-form-control acct_input' placeholder='"+campos[i].ejemplo+"' value='"+campos[i].valor+"' />";
                    }
                    if(campos[i].tipo=="bool"){
                        var checked = "";
                        if(campos[i].valor=="1") checked = "checked";

                        control = "<input id='"+campos[i].nombre+"' class='bool acct_input' data-id='"+campos[i].nombre+"' type='checkbox' "+checked+" />";
                        control += "<label for='"+campos[i].nombre+"'>"+campos[i].titulo+"</label>";
                    }
                    $("#md_account_respuesta").append(
                        "<div class='gm-row propertybox'>"+
                            "<div class='gm-col-12'>"+
                                control+
                            "</div>"+
                        "</div>"
                    );
                }
    
                $.GMWindowManager.open($("#frmCuentasVinculadas"));
            }
        });
    }
}

mod_linked_account.initialize();
var ucEventos = {
    element: $("#ucPageEventos"),
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;
        $("#btnAgregar").click(function(e){
            frmEventos.open(0, function(){
                $this.cargar_datos();
            });
        });
        $("#ucEventos-lstEventos").on("click", ".gm-itembox", function(e){
            var id = $(this).data("id");
            frmEventos.open(id, function(){
                $this.cargar_datos();
            });
            e.stopPropagation();
        });
        $("#ucEventos-lstEventos").on("click", ".btnBorrar", function(e){
            $this.borrar($(this).closest(".gm-itembox").data("id"));
            e.stopPropagation();
        });
        $("#ucEventos-lstEventos").on("click", ".btnDeclararFotos", function(e){
            var itembox = $(this).closest(".gm-itembox");
            var id = itembox.data("id");
            e.stopPropagation();

            $.ajax({
                url: $this.ajax_url,
                data: {
                    topic: "obtener_fotografo_det", 
                    evento_id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    fotos = data.Response.fotos;
                    if(fotos>0){
                        $("#frmDeclararFotos-txtCantidad").prop("disabled", true);
                    }else{
                        $("#frmDeclararFotos-txtCantidad").prop("disabled", false);
                    }
                    $("#frmDeclararFotos-EventoId").val(id);
                    $("#frmDeclararFotos-txtCantidad").val(fotos);
                    $("#frmDeclararFotos").modal({
                        keyboard: false,
                        backdrop: "static"
                    });
                }
            });
            e.stopPropagation();
        });

        $(".gm-filter").on("change keyup", function(e){
            $this.cargar_datos();
        });

        $(".gm-uc-sidebar").css("top", $(".gm-uc-page-header").outerHeight()+$(".gm-header").outerHeight()+"px");
        $(".gm-uc-page-body").height($("#output").height()-$(".gm-uc-page-header").outerHeight()-$(".gm-uc-page-footer").outerHeight());

        $(".btnFilter").click(function(e){
            $(".gm-uc-sidebar").toggleClass("open");
            $(".gm-uc-sidebar").css("top", $(".gm-uc-page-header").outerHeight()+$(".gm-header").outerHeight()+"px");
        })

        $this.cargar_datos();
        $this.cargar_artistas();
        $this.cargar_lugares();
    },
    borrar: function(id){
        $this = this;
        swal({
            title: "Seguro que deseas eliminar este registro?",
            text: "El registro se borrará de forma permanente!",
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
                    module: "shows",
                    topic: "borrar", 
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Registro borrado!", "El evento ha sido borrado.", "success");
                        $this.cargar_datos();
                    }
                    else{
                        swal("Error al borrar!", error, "error");
                    }
                }
            });
        });
    },
    cargar_artistas: function(){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            type: 'POST',
            dataType: 'json',
            data: {
                module: "bands_artists",
                topic: "listar", 
                filtro: "", 
                pagina : 1, 
                col: "nombre",
                order: "asc"
            },
            success: function(data){
                var registros = data.Response.Registros;
                $("#ucEventos-txtArtista").empty();
                if(registros.length>0){
                    $("#ucEventos-txtArtista").append("<option value='0'>Banda/Artista</option>");
                    for (var i = 0; i<registros.length; i++){
                        $("#ucEventos-txtArtista").append("<option value='"+ registros[i].Id +"' data-img='"+registros[i].Imagen+"' data-logo='"+registros[i].Logo+"'>"+registros[i].Nombre+"</option>");
                    }
                }
            }
        });
    },
    cargar_lugares: function(){
        var $this = this;
        $.ajax({
            url: 'modules/cartelera/ajax/lugares-xhr.php',
            type: 'POST',
            dataType: 'json',
            data:{
                topic: "listar",
                filtro: "",
                pagina : 1,
                col: "nombre",
                order: "asc" 
            },
            success: function(data){
                var registros = data.Response.Registros;
                $("#ucEventos-txtLugar").empty();
                if(registros.length>0)
                {
                    $("#ucEventos-txtLugar").append("<option value='0'>Lugar</option>");
                    for (var i = 0; i<registros.length; i++){
                        $("#ucEventos-txtLugar").append("<option id='medida-"+registros[i].Id+"' value='"+ registros[i].Id +"' >"+registros[i].Nombre+"</option>");
                    }
                }
            }
        });
    },
    cargar_datos: function(pagina){
        var $this = this;
        $("#btnSiguiente").attr("disabled", false);
        $("#btnUltimo").attr("disabled", false);
        $("#btnPrimero").attr("disabled", false);
        $("#btnAnterior").attr("disabled", false);

        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "shows",
                topic: "listar", 
                filtro: $("#txtBuscar").val(), 
                pagina : pagina,
                artista_id : $("#ucEventos-txtArtista").val(),
                lugar_id : $("#ucEventos-txtLugar").val()
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

                $(".gm-itembox-container").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            var commands = registros[i].AvailableCommands;
                            //var Imagen = "/images/no-photo.jpg";
                            var additionalClasses = "";
                            for (var j = 0; j < commands.length; j++) {
                                if(registros[i].AvailableCommands[j]=="editar") additionalClasses="editable";
                            }

                            if(registros[i].ArtistaImg!=""){
                                //Imagen = "/images/bandas/" + registros[i].ArtistaId + "/" + registros[i].ArtistaImg;
                            }

                            $(".gm-itembox-container").append(
                                "<div class='gm-itembox "+additionalClasses+"' data-id='"+registros[i].Id+"'>"+
                                    "<div class='gm-row'>"+
                                        "<div class='col-md-12'>"+
                                            "<div class='gm-itembox-img-cover-portrait'>"+
                                                "<img src='"+registros[i].Imagen+"' style='width: 100%;' />"+
                                            "</div>"+
                                            "<div style='display: inline-block; vertical-align: top; margin-left: 10px;'>"+
                                                "<span class='gm-itembox-title'>"+registros[i].Titulo +"</span>"+
                                                "<br /><span class='gm-itembox-additional-info'><i class='fa fa-camera'></i> "+registros[i].TotalImagenes+"</span>"+
                                                (registros[i].Fotografos!=null ? "<span class='gm-itembox-additional-info'><i class='fa fa-users'></i> "+registros[i].Fotografos+"</span>" : "")+
                                            "</div>"+
                                        "</div>"+
                                        "<div class='col-md-12 col-xs-12 gm-itembox-buttons'>"+
                                            "<div id='cmdbox-"+registros[i].Id+"' class='command_buttons' style='margin-top: 10px'>"+
                                                //((registros[i].TotalImagenes>0) ? "<button class='gm-btn primary btnPublishFB' type='button'><i class='fab fa-facebook-f fa-fw'></i></button>" : "" )+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                            for (var j = 0; j < commands.length; j++) {
                                if(registros[i].AvailableCommands[j]=="borrar") $("#cmdbox-"+registros[i].Id).append("<button class='gm-btn danger btnBorrar'><i class='fa fa-trash fa-fw'></i></button>");
                                if(registros[i].AvailableCommands[j]=="declarar_fotos") $("#cmdbox-"+registros[i].Id).append("<button class='gm-btn primary btnDeclararFotos'><i class='fa fa-camera fa-fw'></i></button>");
                                if(registros[i].AvailableCommands[j]=="publicar_fb") $("#cmdbox-"+registros[i].Id).append("<button class='gm-btn primary btnPublishFB'><i class='fab fa-facebook-f fa-fw'></button>");
                            }
                        }
                        
                        $(".btnPublishFB").click(function(e){
                            var itembox = $(this).closest(".gm-itembox");
                            var id = itembox.data("id");
                            $("#frmEventosPublishId").val(id);
                            FB.login(statusChangeCallback, { scope: 'email,public_profile,publish_actions,manage_pages,pages_show_list,publish_pages', return_scopes: true} );
                            e.stopPropagation();
                        });
                    } else {
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron registros<br />"+
                        "<span class='gm-small'>Intenta con otros criterios de búsqueda</span>"+
                        "</div>");
                        $(".gm-itembox-container").addClass("empty");
                    }
                }
                else{
                    $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
                }
                $("#output-loader").css("display", "none");
            }
        });
    }
};

ucEventos.initialize();
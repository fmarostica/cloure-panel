var mod_countries = {
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;

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
                module: "countries",
                topic: "get_list", 
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

                $(".gm-itembox-container").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            $(".gm-itembox-container").append(
                                "<div class='gm-itembox'>"+
                                    "<div class='gm-row clearfix'>"+
                                        "<div class='gm-col-12'>"+
                                            "<span class='gm-itembox-title'>"+registros[i].Nombre+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                        }
                        $("#total-ingresos").html(data.Response.TotalIngresos);
                        $("#total-gastos").html(data.Response.TotalEgresos);
                        $("#saldo").html(data.Response.Saldo);
        
                        //Paginador
                        $(".gm-pager").empty();
                        if(pagina>1) $(".gm-pager").append("<button id='btnAnterior'>Anterior</button>");
                        for (var i=1; i<=totalPaginas;i++)
                        {
                            if(pagina==i)
                                $(".gm-pager").append("<button disabled>"+i+"</button>");
                            else
                                $(".gm-pager").append("<button class='paginate_button' data-pagina='"+i+"'>"+i+"</button>");
                        }
                        if(pagina<totalPaginas) $(".gm-pager").append("<button id='btnSiguiente'>Siguiente</button>");
                        
                        $("#btnAnterior").click(function(){
                            pagina-=1;
                            $this.cargar_datos(pagina);
                            window.scrollTo(0, 0);
                            return false;
                        });
        
                        $("#btnSiguiente").click(function(){
                            pagina+=1;
                            $this.cargar_datos(pagina);
                            window.scrollTo(0, 0);
                            return false;
                        });
        
                        $(".paginate_button").click(function(e){
                            var pagina = $(this).data("pagina");
                            $this.cargar_datos(pagina);
                            window.scrollTo(0, 0);
                            return false;
                        });
                    } else {
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron movimientos<br />"+
                        "<span class='gm-small'>Aquí veras las operaciones de dinero como también las de cuenta corriente</span>"+
                        "</div>");
                        $(".gm-itembox-container").addClass("empty");
                        $(".gm-uc-addon").css("display", "none");
                    }
                }
                else{
                    $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
                }
                $("#output-loader").css("display", "none");
            }
        });
    }
}

mod_countries.initialize();
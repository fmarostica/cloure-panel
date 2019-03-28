var mod_domains = {
    ajax_url: "/ajax/xhr.php",
    module_info: null,
    elem: $("#domains_page"),
    initialize: function(){
        var $this = this;

        $this.elem.on("click", ".btn-apply-filters", function(){
            $this.cargar_datos();
        });

        $this.elem.on("keypress", ".txt-search", function(e){
            if(e.which == 13) {
                $this.cargar_datos();
            }
        });

        $this.get_module_info();
        $this.cargar_datos();
    },
    get_module_info: function(){
        var $this = this;
        var $module = "domains";
        var $topic = "get_module_info";

        $.ajax({
            url: "/ajax/xhr.php",
            data: {
                module: $module,
                topic: $topic
            },
            type: 'POST',
            dataType: "json",
            success: function(data){
                $this.module_info = data;
                $this.elem.find(".gm-uc-page-header-title").html($this.module_info.locales["title"]);
                var filtersBox = $this.elem.find(".gm-uc-sidebar");
                filtersBox.empty();
                for (let i = 0; i < $this.module_info.filters.length; i++) {
                    var filter = $this.module_info.filters[i];
                    filtersBox.append("<div><label>"+filter.Title+"</label></div>");
                    var filter_items = filter.Items;

                    if(filter.Type=="combo"){
                        combo_str = "<select class='gm-form-control-alt gm-filter gm-filter-"+filter.Name+"' style='margin-bottom: 10px;'>";
                        for (let j = 0; j < filter_items.length; j++) {
                            combo_str+="<option value='"+filter_items[j].Id+"'>"+filter_items[j].Title+"</option>";
                        }
                        combo_str+= "</select>";
                        filtersBox.append("<div>"+combo_str+"</div>");
                    }
                    if(filter.Type=="date"){
                        filtersBox.append("<div><input type='date' class='gm-form-control-alt gm-filter-"+filter.Name+"' style='margin-bottom: 10px;' /></div>")
                    }
                }
                filtersBox.append("<button class='gm-btn primary btn-apply-filters'>Aplicar</button>")
            }
        });
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
                module: "domains",
                topic: "listar", 
                filtro: $this.elem.find(".txt-search").val(), 
                pagina : pagina, 
                ordenar_por: $this.elem.find(".gm-filter-order_by").val(), 
                orden: $this.elem.find(".gm-filter-order_type").val(),
                sucursal: $this.elem.find(".gm-filter-company_branch").val(),
                desde: $this.elem.find(".gm-filter-since").val(),
                hasta: $this.elem.find(".gm-filter-until").val(),
                tipo_movimiento: $this.elem.find(".gm-filter-movement_type").val()
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
                            var color = "#777";
                            var color_estado = "#777";
                            var icon = "fa-question";
        
                            $(".gm-itembox-container").append(
                                "<div class='gm-itembox'>"+
                                    "<div class='gm-row clearfix'>"+
                                        "<div class='col-md-12'>"+
                                            "<a href='http://"+registros[i].Nombre+"' target='_blank'><span class='gm-itembox-title'>"+registros[i].Nombre+"</span></a>"+
                                            "<div>"+
                                                ((registros[i].VencimientoStr!="") ? "Vencimiento: " + registros[i].VencimientoStr : "")+
                                                
                                            "</div>"+
                                            "<div>"+
                                                registros[i].SSLAvailableStr +
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                        }
        
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
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron registros<br />"+
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

mod_domains.initialize();
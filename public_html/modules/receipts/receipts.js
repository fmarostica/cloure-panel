var mod_receipts = {
    ajax_url: "/ajax/xhr.php",
    module_info: null,
    elem: $("#receiptsPage"),
    page: 1,
    pages: 1,
    initialize: function(){
        var $this = this;

        $this.elem.on("click", ".btn-apply-filters", function(){
            $this.cargar_datos();
        });

        $this.elem.on("keypress", ".toolbar-search", function(e){
            if(e.which == 13) {
                $this.cargar_datos();
            }
        });
        $this.elem.on("click", ".toolbar-search", function(e){
            $(this).select();
        });

        $("#btnBack").click(function(){
            CloureManager.go_back();
        });

        $(".btnSiguiente").click(function(){
            $this.page++;
            $this.cargar_datos();
        });
        $(".btnUltimo").click(function(){
            $this.page = $this.pages;
            $this.cargar_datos();
        });
        $(".btnPrimero").click(function(){
            $this.page=1;
            $this.cargar_datos();
        });
        $(".btnAnterior").click(function(){
            $this.page--;
            $this.cargar_datos();
        });

        $this.elem.find(".gm-itembox-container").on("click", ".gm-itembox", function(){
            var comprobante_id = $(this).data("id");
            CloureManager.navigate("receipts", "details", comprobante_id);
        });

        $this.get_module_info();
        $this.cargar_datos();
    },
    get_module_info: function(){
        var $this = this;
        var $module = "receipts";
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
                var filtersBox = $this.elem.find(".gm-uc-sidebar");
                filtersBox.empty();
                for (let i = 0; i < $this.module_info.filters.length; i++) {
                    var filter = $this.module_info.filters[i];
                    filtersBox.append("<div><label>"+filter.Title+"</label></div>");
                    var filter_items = filter.Items;

                    if(filter.Type=="combo"){
                        combo_str = "<select class='form-control gm-filter gm-filter-"+filter.Name+"' style='margin-bottom: 10px;'>";
                        for (let j = 0; j < filter_items.length; j++) {
                            combo_str+="<option value='"+filter_items[j].Id+"'>"+filter_items[j].Title+"</option>";
                        }
                        combo_str+= "</select>";
                        filtersBox.append("<div>"+combo_str+"</div>");
                    }
                    if(filter.Type=="date"){
                        filtersBox.append("<div><input type='date' class='form-control gm-filter-"+filter.Name+"' style='margin-bottom: 10px;' /></div>")
                    }
                }
                filtersBox.append("<button class='btn btn-primary btn-block btn-apply-filters'>"+$this.module_info.apply_filters+"</button>")
            }
        });
    },
    cargar_datos: function(){
        var $this = this;
        $("#btnSiguiente").attr("disabled", false);
        $("#btnUltimo").attr("disabled", false);
        $("#btnPrimero").attr("disabled", false);
        $("#btnAnterior").attr("disabled", false);

        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "receipts",
                topic: "listar", 
                filtro: $this.elem.find(".txt-search").val(), 
                pagina : $this.page, 
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
                $this.pages = data.Response.TotalPaginas;

                $(".gm-itembox-container").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) {
                            var color = "#777";
                            var color_estado = "#777";
                            var icon = "fa-question";
        
                            $(".gm-itembox-container").append(
                                "<div class='gm-itembox' data-id='"+registros[i].Id+"'>"+
                                    "<div class='row'>"+
                                        "<div class='col-md-9'>"+
                                            "<span class='gm-itembox-title'>"+registros[i].descripcion+"</span>"+
                                            "<div>"+
                                                "<span class='gm-itembox-additional-info' style='color: "+color_estado+"'><i class='fa fa-circle'></i> "+registros[i].estado+"</span>"+
                                                "<span class='gm-itembox-additional-info'><i class='far fa-clock'></i> "+registros[i].fecha+"</span>"+
                                                (registros[i].Usuario!=null ? "<span class='gm-itembox-additional-info'><i class='fa fa-user'></i> "+registros[i].Usuario+"</span>" : "")+
                                            "</div>"+
                                        "</div>"+
                                        "<div class='col-md-3' style='text-align: right'>"+
                                            "<span class='gm-itembox-title' style='color: "+color+";'>$ "+registros[i].total+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                        }
                        $("#total-ingresos").html(data.Response.TotalIngresos);
                        $("#total-gastos").html(data.Response.TotalEgresos);
                        $("#saldo").html(data.Response.Saldo);
        
                        if($this.page>1){
                            $(".btnAnterior").prop("disabled", false);
                            $(".btnPrimero").prop("disabled", false);
                        } else {
                            $(".btnAnterior").prop("disabled", true);
                            $(".btnPrimero").prop("disabled", true);
                        }
                        if($this.page<$this.pages){
                            $(".btnSiguiente").prop("disabled", false);
                            $(".btnUltimo").prop("disabled", false);
                        } else {
                            $(".btnSiguiente").prop("disabled", true);
                            $(".btnUltimo").prop("disabled", true);
                        }

                    } else {
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron registros.</div>");
                        $(".gm-itembox-container").addClass("empty");
                    }
                    $("#gm-uc-page-footer-total-registers").html(data.Response.TotalRegistros);
                }
                else{
                    $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
                }
                
                $("#output-loader").css("display", "none");
            }
        });
    }
}

mod_receipts.initialize();
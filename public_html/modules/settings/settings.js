var mod_settings = {
    ajax_url: "/ajax/xhr.php",
    module_info: null,
    elem: $("#settings_page"),
    initialize: function(){
        var $this = this;

        $("#settings_page-btnFinalizar").click(function(){
            var settings_arr = [];

            $(".setting-item").each(function(){
                var value = "0";
                if($(this).find(".setting-control").is(":checked")) value = "1";

                var setting_tmp = { 
                    module_id: $(this).data("module"), 
                    option: $(this).data("option"),
                    value: value
                };
                settings_arr.push(setting_tmp);
            });

            $.ajax({
                url: "/ajax/xhr.php",
                data: {
                    module: "settings",
                    topic: "save",
                    settings: JSON.stringify(settings_arr)
                },
                type: 'POST',
                dataType: "json",
                success: function(data){
                    
                }
            });
        });

        $this.get_module_info();
        $this.cargar_datos();
    },
    get_module_info: function(){
        var $this = this;
        var $module = "settings";
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
                module: "settings",
                topic: "get_list"
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                var registros = data.Response.Registros;

                $(".gm-itembox-container").empty();
                if(data.Error==""){
                    if(registros.length>0){
                        for (var i = 0; i<registros.length; i++) 
                        {
                            var settings = registros[i].Settings;
                            var settingsStr = "<table style='width: 100%'>";
                            for (let j = 0; j < settings.length; j++) {
                                var checked = "";
                                if(settings[j].Value=="1") checked = "checked";
                                settingsStr += "<tr class='setting-item' data-module='"+registros[i].Id+"' data-option='"+settings[j].Id+"'><td style='text-align: center; width: 40px'><input type='checkbox' class='setting-control' "+checked+" /></td><td>"+settings[j].Titulo+"</td></tr>";
                            }
                            settingsStr += "<table style='width: 100%'>";

                            $(".gm-itembox-container").append(
                                "<h2 style='text-align: center'>"+registros[i].Title+"</h2>"+
                                settingsStr
                            );
                        }
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

mod_settings.initialize();
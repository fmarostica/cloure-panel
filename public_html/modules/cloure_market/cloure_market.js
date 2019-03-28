var mod_cloure_market = {
    ajax_url: "/ajax/xhr.php",
    initialize: function(){
        var $this = this;
        $this.cargar_datos();
    },
    cargar_datos: function(pagina=1){
        var $this = this;

        $("#output-loader").css("display", "none");
    }
}

mod_cloure_market.initialize();
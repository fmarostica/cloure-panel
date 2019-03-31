var mod_support = {
    ajax_url: "/ajax/xhr.php",
    element: $("#ucSupport"),
    initialize: function(){
        var $this = this;

        $("#btn-back").click(function(e){
            CloureManager.go_back();
        });
        $("#btn-save").click(function(e){
            $.ajax({
                url: $this.ajax_url,
                data: {
                    module: "support",
                    topic: "send",
                    message_type: $this.element.find(".txt-message-type").val(),
                    message: $this.element.find(".txt-message").val()
                },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    if(data.Error!=""){
                        swal("Error", data.Error, "error");
                    } else {
                        swal("Operacion realizada", "El mensaje ha sido enviado.", "success");
                        CloureManager.go_back();
                    }
                }
            });
        });
    }
}

mod_support.initialize();
var mod_support = {
    ajax_url: "/ajax/xhr.php",
    element: $("#ucSupport"),
    initialize: function(){
        var $this = this;

        $this.element.find(".btn-send").click(function(e){
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
                        alert(data.Error);
                    } else {
                        swal("Operacion realizada", "El mensaje ha sido enviado.", "success");
                        $this.element.find(".frm-support").fadeOut();
                        
                    }
                }
            });
        });

        $("#output-loader").css("display", "none");
    }
}

mod_support.initialize();
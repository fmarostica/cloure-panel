var pageLogin = {
    element: $("#login-page"),
    is_cloure_host: true,
    app_token: "",
    initialize: function(){
        var $this = this;

        $("#btnIngresar").click(function(e){
            $("#login-loader").addClass("active");
            try {
                $("#btnIngresar").prop("disabled", true);

                if($this.is_cloure_host){
                    $.ajax({
                        url: '/ajax/xhr.php',
                        data: {
                            topic: "login",
                            user: $("#username").val(),
                            pass: $("#password").val()
                        },
                        type: 'POST',
                        dataType: 'json',
                        success: function(data){
                            if(data.Error==""){
                                $(".dvErrorMsg").html("");
                                window.location.href = "/";
                            } else {
                                $(".dvErrorMsg").html(data.Error);
                                alert(data.Error);
                                $("#password").val("");
                                $("#password").focus();
                                $("#btnIngresar").prop("disabled", false);
                                $("#login-loader").removeClass("active");
                            }
                        }
                    });
                } else {
                    $.ajax({
                        url: '/ajax/xhr.php',
                        data: {
                            module: "users",
                            topic: "login",
                            user: $("#username").val(),
                            pass: $("#password").val()
                        },
                        type: 'POST',
                        dataType: 'json',
                        success: function(data){
                            if(data.Error==""){
                                $(".dvErrorMsg").html("");
                                window.location.href = "/";
                            } else {
                                $(".dvErrorMsg").html(data.Error);
                                alert(data.Error);
                                $("#password").val("");
                                $("#password").focus();
                                $("#btnIngresar").prop("disabled", false);
                                $("#login-loader").removeClass("active");
                            }
                        }
                    });
                }
            } catch (error) {
                alert(error);
            }
            
            e.preventDefault();
        });

        $("#password").keypress(function(e){
            if(e.which == 13) {
                //No funciona el verificado si esta disabled... buscar una forma :/
                $("#btnIngresar").click();
            }
        });

        $("#login-language-selector").change(function(){
            var $lang = $(this).find(".selected").data("value");
            
            $.ajax({
                url: "/ajax/xhr.php",
                data: {
                    module_name: "users",
                    topic: "get_locales",
                    lang: $lang
                },
                type: 'POST',
                dataType: 'json'
            }).done(function(data){
                $this.element.find(".page-title").html(data.login_title);
                $this.element.find(".user-login-field").prop("placeholder",data.user_login_field);
                $this.element.find(".user-password-field").prop("placeholder",data.password);
                $this.element.find(".btn-login").html(data.login_button);
                $this.element.find(".lnk-forgot-password").html(data.forgot_password);
                
            });
        });
    }
}

pageLogin.initialize();
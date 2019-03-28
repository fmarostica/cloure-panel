$.GMWindowManager = {
    elem: null,
    open: function(elem){
        var $this = this;
        $this.elem = elem;

        elem.addClass("open");

        var btnClose = elem.find(".close");
        btnClose.click(function(e){
            elem.removeClass("open");
        });

        $this.resize_window();
    },
    close: function(elem){
        elem.removeClass("open");
    },
    resize_window: function(){
      var $this = this;
      var modal_header_h = $this.elem.find(".gm-modal-header").outerHeight();
      var modal_footer_h = $this.elem.find(".gm-modal-footer").outerHeight();
      var modal_body_h = $(window).height() - modal_header_h - modal_footer_h - 50;
      $this.elem.find(".gm-modal-body").css("max-height",modal_body_h);
    }
}

var CloureManager = {
    date_supported: false,
    active_module: null,
    module_active_name: "",
    module_active_url: null,
    initialize: function (){
        var $this = this;
        var $header = $('#biz-header');
        var $body = $('#biz-body');
        var $footer = $('#biz-footer');

        try {
            var input = document.createElement("input");
            input.type = "date";
            if (input.type === "date") {
                console.log("date supported");
                date_supported = true;
            } else {
                console.log("date not supported");
            }
        } catch(e) {
            console.log("date not supported");
        }

        if ('Notification' in window) {
            console.log("browser support notifications :)");
            Notification.requestPermission();
        } else {
            console.log("too bad!. browser doesn't support notifications :'(");
        }

        if(window.WebSocket){
            console.log("ws supported by browser :)");
        } else {
            console.log("ws not supported by browser :(");
        }
        
        $body.height($(window).height()-$header.outerHeight()-$footer.outerHeight());
        
        if($(window).width()<=768){
          $("#leftsidebar").addClass("closed");
        } else {
          $("#leftsidebar").removeClass("closed");
        }
        $(".btnNavMenu").click(function(e){
          $("#leftsidebar").toggleClass("closed");
        });

        $("#btnUpdater").click(function(e){
            $("#biz_updater").addClass("visible");
        });
        $("#btnUpdaterClose").click(function(e){
          $("#updater-message").fadeOut();
          e.stopPropagation();
        });
        $("#btnUpdaterNotes").click(function(e){
          frmBizNotes.open();
        });

        $("#output").on("click",".btnFilter", function(e){
            $(".gm-uc-sidebar").toggleClass("open");
        });

        $("body").on("click", ".gm-tabs a", function(e){
          $gmtabs = $(this).closest(".gm-tabs");
          $link = $(this).attr("href");
          $tabControl = $gmtabs.data("tab-control");

          $gmtabs.find('a').each(function () {
            $(this).removeClass("active");
          });

          $("#"+$tabControl).find(".gm-tab-pane").each(function(){
            $(this).removeClass("active");
          });

          $(this).addClass("active");
          $("#"+$tabControl).find($link).addClass("active");
        });

        $(".PaymentAdviceClose").click(function(){
            $(".div-payment").css("display", "none");
        });

        $("#leftsidebar").on("click", ".menu-item", function(e){
            e.stopPropagation();
            e.preventDefault();
            var $btn = $(this);
            var module_name = $(this).data("module");
            var items = $(this).data("items");

            if(items>1){
                var $content = $btn.next();
                if ($($btn.parents('ul')[0]).hasClass('list')) {
                    var $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');

                    $.each($('.menu-toggle.toggled').not($not).next(), function (i, val) {
                        if ($(val).is(':visible')) {
                            $(val).prev().toggleClass('toggled');
                            $(val).slideUp();
                        }
                    });
                }

                $btn.toggleClass('toggled');
                $content.slideToggle(320);
            } else {
                $(".menu-item").each(function(){
                    $(this).removeClass("active");
                });
                $(".sub-menu-item").each(function(){
                    $(this).removeClass("active");
                });
                $btn.toggleClass("active");
                $this.navigate(module_name);
                if($(window).width()<929){
                    $("#leftsidebar").addClass("closed");
                }
            }
        });
        $("#leftsidebar").on("click", ".sub-menu-item", function(e){
            e.stopPropagation();
            e.preventDefault();
            var module_name = $(this).data("module");
            var itemsContainer = $(this).closest(".sub-items-container");
            var btnItem = itemsContainer.prev();
            $(".menu-item").each(function(){
                $(this).removeClass("active");
            });
            $(".sub-menu-item").each(function(){
                $(this).removeClass("active");
            });
            $(this).toggleClass("active");
            btnItem.toggleClass("active");
            $this.navigate(module_name);
            if($(window).width()<929){
                $("#leftsidebar").addClass("closed");
            }
        });

        $("#language-selector").change(function(){
            let $lang = $(this).find(".selected").data("value");
            $this.set_locale($lang);
        });

        $(window).resize(function(){
        });

        setTimeout(function () { $('#gm-main-loader').fadeOut(); }, 3000);
    },
    get_account_type: function(){
        return $("#h-account-type").val();
    },
    get_app_token: function(){
        return $("#h-app-token").val();
    },
    get_month_incoming: function(){
        return $("#h-monthly-incoming-exceeded").val();
    },
    navigate: function($module, $page="", $parameter="") {
        var $this = this;
        var url = "";
        var module_path = "";

        $("#h-parameter").val($parameter);

        var obj_state = {
            modulo: $module,
            pagina: $page
        };

        if($page!=""){
            url = "/"+$module+"/"+$page;
            if($parameter!="") url += "/"+$parameter;
            module_path = '/modules/'+$module+'/'+$page+'.php';
        } else {
            url = "/"+$module;
            module_path = '/modules/'+$module+'/'+$module+'.php';
        }

        window.history.pushState(obj_state, 'Title', url);

        $("#output-loader").css("display", "block");
        $this.module_active_name = $module;
        $this.module_active_url = url;
        $("#output").load(module_path, function(){

        });
        var active_module_str = "mod_"+$module;
        $this.active_module = window[active_module_str];
        //$this.active_module.set_locale();
        //$this.resize();
    },
    get_parameter(){
        return $("#h-parameter").val();
    },
    go_back(){
        window.history.back();
    }
};

$(function(){
    CloureManager.initialize();
})

window.onpopstate = function(e) {
    var obj_state = e.state;
    CloureManager.navigate(obj_state.modulo, obj_state.pagina);
};
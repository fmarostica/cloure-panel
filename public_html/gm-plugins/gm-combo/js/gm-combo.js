var gmcombo = {
    initialize: function(){
        $(".gm-combobox").each(function(){
            $(this).on("click", ".selector", function(e){
                $parent = $(this).closest(".gm-combobox");
                $popup = $parent.find(".popup");
                if($popup.hasClass("active")){
                    $popup.removeClass("active");
                } else {
                    $popup.addClass("active");
                }
                e.stopPropagation();
            });
            $(this).on("click", ".item", function(){
                $val = $(this).data("value");
                $text = $(this).html();

                $parent = $(this).closest(".gm-combobox");
                $parent.find(".item").removeClass("selected");
                $(this).addClass("selected");

                $popup = $parent.find(".popup");
                $selector = $parent.find(".selector-text");
                $selector.html($text);
                if($popup.hasClass("active")){
                    $popup.removeClass("active");
                } else {
                    $popup.addClass("active");
                }

                $(this).change();
            });
            var $selected = $(this).find(".selected");
            if($selected.length){
                $(this).find(".selector-text").html($selected.html());
                $(this).change();
            }
        });
    }
}

gmcombo.initialize();
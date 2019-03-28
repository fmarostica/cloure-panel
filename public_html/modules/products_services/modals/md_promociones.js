var frmProductosPromociones = {
    caller: null,
    element: $("#frmPromocionesGlobal"),
    id: 0,
    initialize: function(){

    },
    open: function(id=0, caller=null){
        var $this = this;
        $this.id = id;
        $this.caller = caller;
        $.GMWindowManager.open($this.element);
    }
}

frmProductosPromociones.initialize();

$("#frmPromocionesGlobal_btnAddCantidad").click(function(e){
    addPromoBoxGlobal();
});

function addPromoBoxGlobal(){
    $("#promoboxes-global-content").append(
        "<div class='row promobox-global'>"+
            "<div class='col-md-2'>"+
                "<input type='text' class='form-control promobox-global-cantidad' value='5' />"+
            "</div>"+
            "<div class='col-md-3'>"+
                "<select class='form-control ms promobox-global-tipo-dto'>"+
                    "<option value='lineal' selected>Lineal ($)</option>"+
                    "<option value='porcentual'>Porcentual (%)</option>"+
                "</select>"+
            "</div>"+
            "<div class='col-md-3'>"+
                "<input type='text' class='form-control decimal promobox-global-valor' />"+
            "</div>"+
            "<div class='col-md-2'>"+
                "<button type='button' class='btn2 btn-danger btnRemovePromoBoxGlobal'><span class='fa fa-trash'></span></button>"+
            "</div>"+
        "</div>"
    );
}

$("#promo-global-cantidades").on("click", ".btnRemovePromoBoxGlobal", function(e){
    $(this).closest(".promobox-global").fadeOut();
});

$("#frmPromocionesGlobal_txtFormaDeAplicarPromocion").change(function(e){
    if($(this).val()=="individual"){
        $("#frmPromocionesGlobal_dvTodos").css("display", "block");
        $("#frmPromocionesGlobal_dvCategoria").css("display", "none");
        $("#frmPromocionesGlobal_txtTipoPromocion").prop("disabled", false);
    } else {
        $("#frmPromocionesGlobal_dvTodos").css("display", "none");
        $("#frmPromocionesGlobal_dvCategoria").css("display", "block");
        $("#frmPromocionesGlobal_txtTipoPromocion>option[value='cantidad']").prop("selected", true);
        $("#frmPromocionesGlobal_txtTipoPromocion").prop("disabled", true);
    }
});

$("#frmPromocionesGlobal_txtTipoPromocion").change(function(e){
    if($(this).val()=="fijo"){
        $("#promocion-global-fija").css("display", "block");
        $("#promocion-global-cantidad").css("display", "none");
    } else {
        $("#promocion-global-fija").css("display", "none");
        $("#promocion-global-cantidad").css("display", "block");
    }
});
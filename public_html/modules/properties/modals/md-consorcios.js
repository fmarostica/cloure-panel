var frmConsorcios = {
    elem: $("#frmConsorcioAgregar"),
    origen: "",
    caller: null,
    id: 0,
    initialize: function(){
        var $this = this;
        var el = this.elem;
        var addons = el.find(".gm-modal-header-addons");
        el.find(".hbtn").click(function(e){
            addons.empty();
            var nom = $(this).data("name");
            if(nom=="impu") addons.append("<button id='frmConsorcioAgregar-btnImpuestosAgregar' class='gm-btn main' type='button'><i class='fa fa-plus fa-fw'></i></button>");
            if(nom=="prop"){
                if($("#frmConsorcioAgregar-Origen").val()!="frmPropiedadesAgregar"){
                    addons.append("<button id='frmConsorcioAgregar-btnPropiedadesAgregar' class='gm-btn main' type='button'><i class='fa fa-plus fa-fw'></i></button>");
                }    
                addons.append("<a id='frmConsorcioAgregar-btnPropiedadesImprimir' href='/panel/pdf/propiedades.php?consorcio_id="+$("#frmConsorcioAgregar-hId").val()+"' class='gm-btn main' target='_blank'><i class='fa fa-print fa-fw'></i></a>");
            }
        });
        addons.on("click", "#frmConsorcioAgregar-btnPropiedadesAgregar", function(){
            $this.abrir_frmpropiedades(0);
        });
        addons.on("click", "#frmConsorcioAgregar-btnImpuestosAgregar", function(){
            $this.abrir_frmimpuestos(null);
        });
        $("#frmConsorcioAgregar-btnGuardar").click(function(){
            $this.guardar();
        });
        $("#frmConsorciosAgregar-lstImpuestos").on("click", ".frmConsorcioImpuestoItem", function(e){
            var impuesto = {
                id: $(this).find(".data-id").val(), 
                nombre: $(this).find(".data-nombre").html(),
                tipo_adm: "consorcio",
                periodo_id: $(this).find(".data-periodo-id").val(),
                propconsorcio_id: 0,
                vencimientos: JSON.parse($(this).find(".data-vencimientos").val()),
                obj: $(this)
            }
            $this.abrir_frmimpuestos(impuesto);
        });
        $("#frmConsorciosAgregar-lstImpuestos").on("click", ".btnImpuestoBorrar", function(e){
            var impuesto_item = $(this).closest(".frmConsorcioImpuestoItem");
            var id = impuesto_item.find(".data-id").val();

            swal({
                title: "Seguro que deseas eliminar este registro?",
                text: "El registro se borrará de forma permanente!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                if(id>0){
                    $.ajax({
                        url: 'modules/propiedades/ajax/impuestos-xhr.php',
                        data: {
                            topic: "borrar",
                            id: id 
                        },
                        type: 'POST',
                        dataType: 'json'
                    }).done(function(data){
                        swal("Registro borrado!", "El consorcio ha sido borrado.", "success");
                        impuesto_item.remove();
                    });
                } else {
                    swal("Registro borrado!", "El consorcio ha sido borrado.", "success");
                    impuesto_item.remove();
                }
            });
            e.stopPropagation();
        });
    },
    open: function(id, origen, caller){
        var $this = this;
        this.caller = caller;
        $("#frmConsorciosAgregar-lstImpuestos").empty();
        $("#frmConsorciosAgregar-lstPropiedades").empty();
        if(id>0){
            $.ajax({
                url: 'modules/propiedades/ajax/consorcios-xhr.php',
                data: {
                    topic: "obtener",
                    id: id 
                },
                type: 'POST',
                dataType: 'json'
            }).done(function(data){
                var Consorcio = data.Response;
                var imagenes = data.Response.Imagenes;

                $("#frmConsorcioAgregar-lblTitulo").html("Editar consorcio");
                $("#frmConsorcioAgregar-hId").val(id);
                $("#frmConsorcioAgregar-txtNombre").val(Consorcio.Nombre);
                $("#frmConsorcioAgregar-txtDireccion").val(Consorcio.Direccion);
                $("#frmConsorcioAgregar-txtTelefono").val(Consorcio.Telefono);
                $("#frmConsorcioAgregar-btnPropiedadesImprimir").prop("href", "/panel/pdf/propiedades.php?consorcio_id="+Consorcio.Id);

                $(Consorcio.Impuestos).each(function(i,e) {
                    $this.agregar_impuesto(e.Id, e.Nombre, e.PeriodoId, e.Vencimientos);
                });

                $(Consorcio.Propiedades).each(function(i,e){
                    $this.agregar_propiedad(e.Id, e.Titulo, e.ExpensasPorcentaje);
                });

                $.GMWindowManager.open($this.elem);
            });
        } else {
            $("#frmConsorcioAgregar-lblTitulo").html("Agregar consorcio");
            $("#frmConsorcioAgregar-hId").val(id);
            $("#frmConsorcioAgregar-txtNombre").val("");
            $("#frmConsorcioAgregar-txtDireccion").val("");
            $("#frmConsorcioAgregar-txtTelefono").val("");
            $.GMWindowManager.open(this.elem);
        }
    },
    agregar_impuesto: function(id, nombre, periodo, vencimientos){
        if(vencimientos instanceof Array) vencimientos = JSON.stringify(vencimientos);
        $("#frmConsorciosAgregar-lstImpuestos").append(
            "<div class='frmConsorcioImpuestoItem gm-itembox editable'>"+
                "<input class='data-id' type='hidden' value='"+id+"' />"+
                "<input class='data-periodo-id' type='hidden' value='"+periodo+"' />"+
                "<input class='data-vencimientos' type='hidden' value='"+vencimientos+"' />"+
                "<div class='gm-itembox-title data-nombre'>"+
                    nombre +
                "</div>"+
                "<div class='gm-itembox-buttons' style='margin-top: 10px'>"+
                    "<button type='button' class='gm-btn danger btnImpuestoBorrar'><span class='fa fa-trash fa-fw'></span></button>"+
                "</div>"+
            "</div>"
        );
    },
    agregar_propiedad: function(id, titulo, porcentaje_exp){
        $("#frmConsorciosAgregar-lstPropiedades").append(
            "<div class='lstPropiedadesItem gm-itembox' "+
            "data-id='"+id+"' "+
            "data-nombre='"+titulo+"' "+
            "data-porcentaje-expensa='"+porcentaje_exp+"'>"+
                "<div class='gm-itembox-title editable'>"+
                    titulo +
                "</div>"+
                "<div class=''>"+
                    "Porcentaje de expensas: "+porcentaje_exp + " %"+
                "</div>"+
                "<div class='gm-itembox-buttons' style='margin-top: 10px'>"+
                    "<button type='button' class='gm-btn danger btnPropiedadesBorrar'><span class='fa fa-trash fa-fw'></span></button>"+
                "</div>"+
            "</div>"
        );
    },
    abrir_frmpropiedades: function(id){
        var $this = this;
        var consorcio_id = parseInt($("#frmConsorcioAgregar-hId").val());
        frmPropiedadesAgregar.open(id, consorcio_id, false, false, function(response){
            if(id>0){
                
            } else {
                $this.agregar_propiedad(response.id, response.titulo, response.porcentaje_exp);
            }
        });
    },
    abrir_frmimpuestos: function(impuesto=null){
        $this = this;
        frmImpuestos.open(impuesto, function(response){
            if(impuesto==null){
                $this.agregar_impuesto(response.id, response.nombre, response.periodo_id, response.vencimientos);
            } else {
                $("#frmConsorcioImpuestoItem").children(".gm-itembox").each(function(e){
                    if($(this).find(".data-id").val()==id){
                        $(this).find(".data-nombre").html(nombre);
                        $(this).find(".data-vencimientos").val(vencimientos);
                        $(this).find(".data-periodo-id").val(periodo);
                    }
                });
            }
        });
    },
    guardar: function(){
        var $this = this;
        var formData = new FormData($('#frmConsorcioAgregar')[0]);
        var propiedades = [];
        var expensas = [];
      
        $("#frmConsorciosAgregar-lstImpuestos").children(".frmConsorcioImpuestoItem").each(function(){
            var id = $(this).find(".data-id").val();
            var nombre = $(this).find(".data-nombre").html();
            var vencimientos = $(this).find(".data-vencimientos").val();
            
            var expensaTmp = {
                id: id,
                nombre: nombre,
                vencimientos: vencimientos,
            }
            expensas.push(expensaTmp);
        });
        $(".lstPropiedadesItem").each(function(){
            var id = $(this).data("id");
            var nombre = $(this).data("nombre");
            var porcentaje_expensa = $(this).data("porcentaje-expensa");
            
            var propiedadTmp = {
                id: id,
                nombre: nombre,
                porcentaje_expensa: porcentaje_expensa
            }
            propiedades.push(propiedadTmp);
        });

        formData.append("topic", "guardar");
        formData.append("id", $("#frmConsorcioAgregar-hId").val());
        formData.append("nombre", $("#frmConsorcioAgregar-txtNombre").val());
        formData.append("direccion", $("#frmConsorcioAgregar-txtDireccion").val());
        formData.append("telefono", $("#frmConsorcioAgregar-txtTelefono").val());
        formData.append("expensas", JSON.stringify(expensas));
        formData.append("propiedades", JSON.stringify(propiedades));

        $("#modalWait").modal({
            keyboard: false,
            backdrop: "static"
        });

        $.ajax({
            url: '/panel/modules/propiedades/ajax/consorcios-xhr.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function(data){
                $('#modalWait').modal("hide");
                var error = data.Error;
                if(error.length>0){
                    alert(error);
                }
                else{
                    var consorcio_id = data.Response.ConsorcioId; 
                    $('#frmConsorcioAgregar').modal("hide");
                    $this.caller(data);
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }
};

frmConsorcios.initialize();

/*
var files = [];
var expensas = [];
var propiedades = [];

function frmConsociosAgregar_editarItemExpensa(id, nombre, periodo, vencimientos){
    $("#frmConsorcioImpuestoItem").children(".gm-itembox").each(function(e){
        if($(this).find(".data-id").val()==id){
            $(this).find(".data-nombre").html(nombre);
            $(this).find(".data-vencimientos").val(vencimientos);
            $(this).find(".data-periodo-id").val(periodo);
        }
    });
}

$("#frmConsorciosAgregar-lstExpensas").on("click", ".frmConsorcioImpuestoItem", function(e){
    frmConsorciosImpuestosAgregar_Abrir(
        $(this).find(".data-id").val(), 
        $(this).find(".data-nombre").html(), 
        "consorcio",
        $(this).find(".data-periodo-id").val(), 
        0, 
        JSON.parse($(this).find(".data-vencimientos").val()),
        $(this)
    );
    e.stopPropagation();
});

$("#frmConsorciosAgregar-lstExpensas").on("click", ".btnImpuestoBorrar", function(e){
    var id = $(this).closest(".frmConsorcioImpuestoItem").find(".data-id").val();
    if(id>0){
        $.ajax({
            url: 'modules/propiedades/ajax/impuestos-xhr.php',
            data: {
                topic: "borrar",
                id: id 
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(data){
            $(this).closest(".frmConsorcioImpuestoItem").remove();
        });
    } else {
        $(this).closest(".frmConsorcioImpuestoItem").remove();
    }
    e.stopPropagation();
});
$("#frmConsorcioAgregar-header-extras").on("click", "#frmConsorcioAgregar-btnAgregarImpuesto", function(){
    frmConsorciosImpuestosAgregar_Abrir(0);
});
$("#frmConsorcioAgregar-header-extras").on("click", "#frmConsorcioAgregar-btnAgregarLiquidacion", function(){
    $("#frmConsorcioExpensasAgregar-txtNombre").val("");
    $("#frmConsorcioExpensasAgregar").modal("show");
});
$("#frmConsorcioAgregar-header-extras").on("click", "#frmConsorcioAgregar-btnPropiedadesAgregar", function(){
    frmPropiedadesAgregar_Abrir(0, "frmConsorciosAgregar");
    
    var consorcio_id = parseInt($("#frmConsorcioAgregar-hId").val());
    if(consorcio_id>0){
        frmPropiedadesAgregar_CargarConsorcios(consorcio_id);
    } else {
        $("#frmPropiedadesAgregar-txtConsorcio").empty();
        $("#frmPropiedadesAgregar-txtConsorcio").append("<option value='0'>NUEVO</option>");
        $("#frmPropiedadesAgregar-txtConsorcio>option[value='0']").prop("selected", true);
    }
    $("#frmPropiedadesAgregar-txtConsorcio").prop("disabled", true);
});


$("#lstPropiedades").on("click", ".gm-itembox", function(e){
    frmPropiedadesAgregar_Abrir($(this).data("id"), "frmConsorciosAgregar");
    e.stopPropagation();
});
$("#lstPropiedades").on("click", ".btnExpensasImprimir", function(e){
    e.stopPropagation();
});

$("#frmConsorcioAgregar-btnGuardar").click(function(){
    
    return false;
});

function progressHandlingFunction(e)
{
    if(e.lengthComputable)
    {
        var max = e.total;
        var current = e.loaded;

        var Percentage = (current * 100)/max;

        $('.progress-bar-wait').width(Percentage+"%");
        $('.percent').html(Percentage.toFixed(2)+"%");

        if(Percentage >= 100)
        {
            // process completed
        }
    }
}
*/

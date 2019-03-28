var frmImpuestos = {
    impuesto: null,
    caller: null,
    elem: $("#frmConsorcioImpuestosAgregar"),
    initialize: function(){
        var $this = this;
        $("#frmConsorcioImpuestosAgregar-btnAddVto").click(function(e){
            $this.agregar_vencimiento();
        });
        $("#frmConsorcioImpuestosAgregar-lstVencimientos").on("click", ".vto-btnBorrar", function(e){
            $(this).closest(".vto-item").remove();
            e.stopPropagation();
        });
        $("#frmConsorcioImpuestosAgregar-btnGuardar").click(function(e){
            $this.guardar();
            e.stopPropagation();
        });
    },
    open: function(impuesto=null, caller=null){
        this.impuesto = impuesto;
        this.caller = caller;
        $("#frmConsorcioImpuestosAgregar-lstVencimientos").empty();

        if(impuesto==null){
            $("#frmConsorcioImpuestosAgregar-txtNombre").val("");
            $("#frmConsorcioImpuestosAgregar-txtPeriodoTipo>option[value='3']").prop("selected", true);
        } else {
            $("#frmConsorcioImpuestosAgregar-txtNombre").val(impuesto.nombre);
            $("#frmConsorcioImpuestosAgregar-txtPeriodoTipo>option[value='"+impuesto.periodo_id+"']").prop("selected", true);
            if(impuesto.vencimientos instanceof Array){
                for (i = 0; i < impuesto.vencimientos.length; i++) {
                    this.agregar_vencimiento(impuesto.vencimientos[i].fecha, impuesto.vencimientos[i].importe);
                }
            }
        }
        this.elem.modal("show");
    },
    guardar: function(){
        var vencimientos_tmp = [];
        $(".vto-item").each(function(){
            var vto_tmp = {
                fecha: $(this).find(".vto-fecha").val(),
                importe: $(this).find(".vto-importe").val()
            }
            vencimientos_tmp.push(vto_tmp);
        });
        if(this.impuesto==null){
            var impuesto_tmp = {
                id: 0, 
                nombre: $("#frmConsorcioImpuestosAgregar-txtNombre").val(),
                tipo_adm: "consorcio",
                periodo_id: $("#frmConsorcioImpuestosAgregar-txtPeriodoTipo").val(),
                propconsorcio_id: 0,
                vencimientos: JSON.stringify(vencimientos_tmp)
            }
            this.impuesto = impuesto_tmp;
        }
        this.caller(this.impuesto);
        $('#frmConsorcioImpuestosAgregar').modal("hide");
    },
    agregar_vencimiento: function(fecha="", importe=""){
        $("#frmConsorcioImpuestosAgregar-lstVencimientos").append("<tr class='vto-item'>"+
            "<td><input type='date' class='gm-form-control vto-fecha' placeholder='dd/mm/yyyy' value='"+fecha+"' /></td>"+
            "<td><input type='number' class='gm-form-control vto-importe' step='0.01' value='"+importe+"' /></td>"+
            "<td><button type='button' class='gm-btn danger vto-btnBorrar'><i class='fa fa-minus-circle'></i></button></td>"+
        "</tr>")
    }
}

frmImpuestos.initialize();
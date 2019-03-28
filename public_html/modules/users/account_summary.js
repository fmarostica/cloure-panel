var account_summary_page = {
    pagina: 1,
    totalPaginas: 1,
    module_name: "users",
    element: $("#ucSummaryAccount"),
    ajax_url: "/ajax/xhr.php",
    locales: null,
    initialize: function(){
        var $this = this;

        $this.element.find(".btn-back").click(function(){
            CloureManager.go_back();
        });

        $this.element.find(".btn-print-pdf").click(function(){
            //CloureManager.go_back();
            window.open("/pdf-export/account-summary/index.php?id="+CloureManager.get_parameter());
        });

        $this.element.find(".gm-itembox-container").on("click", ".gm-itembox", function(){
            var comprobante_id = $(this).data("comprobante-id");
            var tipo_operacion = $(this).data("tipo-operacion");
            if(tipo_operacion!="pago" && tipo_operacion!="pago_de_usuarios"){
                frmReceiptDetail.open(comprobante_id);
            }
            /*
            if(comprobante_id>0){
                frmReceiptDetail.open(comprobante_id);
            }
            */
        });

        $this.cargar_datos();
    },
    cargar_datos: function(pagina=1){
        var $this = this;
        $.ajax({
            url: $this.ajax_url,
            data: 
            {
                module: "finances",
                topic: "listarCC", 
                filtro: $("#txtBuscar").val(), 
                limite: 0,
                pagina : $this.pagina,
                usuario_id: CloureManager.get_parameter()
            },
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                $this.total_registros = data.Response.TotalRegistros;
                $this.totalPaginas = data.Response.TotalPaginas;
                $this.element.find(".gm-itembox-container").empty();

                if(data.Error==""){
                    registros = data.Response.Registros;
                    saldo = data.Response.SaldoCCStr;
                    $(".txt-saldo").html("Saldo: $ "+saldo);

                    if(registros.length>0){
                        $("#gm-uc-page-footer-total-registers").html($this.total_registros);
                        $("#gm-uc-page-footer-page").html(pagina);
                        $("#gm-uc-page-footer-pages").html($this.totalPaginas);

                        for (var i = 0; i<registros.length; i++) {
                            var item = registros[i];
                            var commands = item.AvailableCommands;
                            var commands_controls = "";
                            var title = item.razon_social;
                            var color = "#777";
                            var color_estado = "#777";

                            if(item.empresa!=null && item.empresa!="") title += " ("+item.empresa+")";

                            /*
                            for (var j = 0; j < commands.length; j++) {
                                if(commands[j].Name=="account_summary") commands_controls+="<a href='/pdf-export/account-summary/?id="+registros[i].id+"' target='_blank' class='gm-btn primary btnAccountSummary'><i class='fa fa-clipboard-list'></i></a>";
                                if(commands[j].Name=="account_summary") commands_controls+="<button type='button' class='gm-btn primary btnAccountSummaryPage'><i class='fa fa-list-ul'></i></button>";
                                if(commands[j].Name=="send_mail_pass") commands_controls+="<button class='gm-btn primary btnReasignarPass'><i class='fa fa-key'></i></button>";
                                if(commands[j].Name=="add_payment") commands_controls+="<button class='gm-btn success btnAgregarPago'><i class='fa fa-dollar-sign'></i></button>";
                                if(commands[j].Name=="delete") commands_controls+="<button class='gm-btn danger btnBorrar'><i class='fa fa-trash'></i></button>";
                            }
                            */
                            if((registros[i].TipoMovimiento).toLowerCase()=="ingreso"){
                                icon = "fa-plus-circle";
                                color = "#12960c";
                            }
                            if((registros[i].TipoMovimiento).toLowerCase()=="egreso"){
                                icon = "fa-minus-circle";
                                color = "#d81c00";
                            }
                            if((registros[i].TipoMovimiento).toLowerCase()=="debito_cc"){
                                icon = "fa-info-circle";
                                color = "#3270d3";
                            }
                           if((registros[i].Estado).toLowerCase()=="aprobado") color_estado = "#12960c";
                           $editable = "";
                           if(registros[i].TipoOperacion!="pago" && registros[i].TipoOperacion!="pago_de_usuarios") $editable=" editable ";

                            $this.element.find(".gm-itembox-container").append(
                                "<div class='gm-itembox "+$editable+"' data-id='"+registros[i].Id+"' data-comprobante-id='"+registros[i].ComprobanteId+"' data-tipo-operacion='"+registros[i].TipoOperacion+"'>"+
                                    "<div class='gm-row clearfix'>"+
                                        "<div class='col-md-9'>"+
                                            "<span class='gm-itembox-title'>"+registros[i].Detalles+"</span>"+
                                            "<div>"+
                                                "<span class='gm-itembox-additional-info'><i class='far fa-clock'></i> "+registros[i].FechaStr+"</span>"+
                                            "</div>"+
                                        "</div>"+
                                        "<div class='col-md-3' style='text-align: right'>"+
                                            "<span class='gm-itembox-title' style='color: "+color+";'>$ "+registros[i].ImporteStr+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"
                            );
                        }

                        if($this.pagina>1){
                            $("#ucUsuarios-dvPaginador").find(".btnAnterior").prop("disabled",false);
                            $("#ucUsuarios-dvPaginador").find(".btnPrimero").prop("disabled", false);
                        } else {
                            $("#ucUsuarios-dvPaginador").find(".btnAnterior").prop("disabled",true);
                            $("#ucUsuarios-dvPaginador").find(".btnPrimero").prop("disabled", true);
                        }
                        
                        if($this.pagina<$this.totalPaginas){
                            $("#ucUsuarios-dvPaginador").find(".btnSiguiente").prop("disabled",false);
                            $("#ucUsuarios-dvPaginador").find(".btnUltimo").prop("disabled", false);
                        } else {
                            $("#ucUsuarios-dvPaginador").find(".btnSiguiente").prop("disabled",true);
                            $("#ucUsuarios-dvPaginador").find(".btnUltimo").prop("disabled", true);
                        }
                    } else {
                        $(".gm-itembox-container").append("<div class='gm-empty-content'>No se encontraron registros<br />"+
                        "<span class='gm-small'>Intenta con otros criterios de búsqueda</span>"+
                        "</div>");
                        $(".gm-itembox-container").addClass("empty");
                    }
                    var str = document.getElementById("ucUsuarios-PagerInfo").innerHTML;
                    var res = str.replace("{page}", $this.pagina);
                    res = res.replace("{total_pages}", $this.totalPaginas);
                    document.getElementById("ucUsuarios-PagerInfo").innerHTML = res;
                }
                else{
                    $("#output").html("<div class='alert alert-danger'><strong>Error: </strong>"+data.Error+"</div>");
                }
                $("#output-loader").css("display", "none");
            }
        });
    },
    cambiar_clave: function(id){
        swal({
            title: "Seguro que deseas reasignar la clave de este usuario?",
            text: "Se enviará un correo al usuario!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            showLoaderOnConfirm: true,
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: 'modules/usuarios/ajax/xhr_usuarios.php',
                data: {
                    topic: "cambiar_clave", 
                    id: id
                },
                type: 'POST',
                dataType: 'json',
                success: function(data)
                {
                    var error = data.Error;
                    if(error==""){
                        swal("Operación realizada!", "Se ha enviado un correo al usuario con instrucciones para reasignar su clave.", "success");
                        cargar_datos();
                    }
                    else{
                        swal("Error al reasignar la clave!", error, "error");
                    }
                }
            });
        });
    }
}



$(document).ready(function(){
    account_summary_page.initialize();
});
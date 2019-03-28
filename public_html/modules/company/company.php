<div class="gm-uc-page">
    <div class="gm-uc-page-header">
        <div class="gm-uc-page-header-title">Mi negocio</div>
    </div>
    <div class="gm-uc-page-body gm-content">
        <div style="color: green; font-size: 28px; text-align:center; font-weight: lighter;">
            <?php echo "Cloure ".$empresa->account_type; ?>
        </div>
        <div class="gm-row">
            <div class="gm-col-4">
                <label>Tipo de empresa</label>
                <?php
                    $params=["topic"=>"get_business_types"];
                    $tipos_empresas = json_decode($CloureSDK->execute($params));

                    echo "<select id='txtTipoEmpresa' class='gm-form-control'>";
                    foreach ($tipos_empresas->Response->Registros as $registro) {
                        if($registro->id == $empresa->business_type_id)
                            echo "<option value='".$registro->id."' selected>".$registro->title."</option>";
                        else
                            echo "<option value='".$registro->id."'>".$registro->title."</option>";
                    }
                    echo "</select>";
                ?>
            </div>
            <div class="gm-col-4">
                <label>Nombre</label>
                <input id="txtNombre" class="gm-form-control" value="<?php echo $empresa->company_name; ?>" />
            </div>
            <div class="gm-col-4">
                <label>Sitio web</label>
                <br/>
                <a href="<?php echo "http://".$empresa->primary_domain;?>" target="_blank"><?php echo $empresa->primary_domain;?></a>
            </div>
            <?php
                /*
                if($empresa->own_domain==""){
                    echo '<div class="gm-col-4">';
                        echo '<label>Dominio propio</label>';
                        echo '<button class="gm-btn primary btn-register-domain" style="width: 100%">Registrar</button>';
                    echo '</div>';
                }
                */
            ?>
        </div>
        <div class="gm-row">
            <!--
            <div class="gm-col-4">
                <label>Cond. IVA</label>
                <select id="txtCondicionIva" class="gm-form-control">
                    <?php
                        $params=[
                            "topic"=>"listar_condiciones_iva",
                            "tipo"=>"empresa"
                        ];
                        $condicionesIva = json_decode($CloureSDK->execute($params));
                        foreach ($condicionesIva->Response as $key => $registro) {
                            if($registro->Id == $empresa->CompanyIvaConditionId)
                                echo "<option selected>".$registro->Nombre."</option>";
                            else
                                echo "<option>".$registro->Nombre."</option>";
                        }
                    ?>
                </select>
            </div>
            <div class="gm-col-4">
                <label>CUIT</label>
                <input id="txtCuit" class="gm-form-control" value="" />
            </div>
            <div class="gm-col-4">
                <label>Ingresos brutos</label>
                <input id="txtIIBB" class="gm-form-control" value="" />
            </div>
            <div class="gm-col-4">
                <label>Télefono Principal</label>
                <input id="txtTelefono" class="gm-form-control" value="" />
            </div>
            <div class="gm-col-4">
                <label>E-Mail principal</label>
                <input id="txtMail" class="gm-form-control" value="" />
            </div>
            <div class="gm-col-4">
                <label>Sitio web</label>
                <input id="txtWeb" class="gm-form-control" value="" />
            </div>
            -->
        </div>
    </div>
    <div class="gm-uc-page-footer">
        <button id="btnEmpresaGuardar" type="button" class="gm-btn success">Guardar</button>
    </div>
</div>

<script src="modules/company/company.js"></script>
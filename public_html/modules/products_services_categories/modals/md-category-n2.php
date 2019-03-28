<form id="frmCategoryN2" class="gm-modal" role="dialog" method="post" enctype="multipart/form-data">
	<div class="gm-modal-dialog modal-lg">
		<div class="gm-modal-content">
            <div class="gm-modal-header">
                <div class="gm-modal-header-main">
                    <h4 id="frmCategoriaAgregar_lblTitulo" class="gm-modal-title">Agregar Categoria</h4>
                    <button type="button" class="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="gm-modal-header-extras"></div>
            </div>
            <div class="gm-modal-body">
                <div class="tab-content">
                    <div id="tab_general" class="gm-tab-pane active">
                        <div class="productbox-details">
                            <div class="gm-row">
                                <div class="gm-col-3">
                                    <div style="position: relative;">
                                        <input name="image" type="file" class="input-image" style="display: none;" />
                                        <img src="/images/no-photo.jpg" class="category-image" style="width: 100%; border: 1px solid #ccc;" />
                                        <button type="button" class="gm-btn primary btn-select-image" style="position: absolute; top: 5px; left: 5px;">
                                            <i class="fa fa-image"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="gm-col-9">
                                    <div class="gm-col-6">
                                        <label>Categoria de Nivel 1</label>
                                        <select class="gm-form-control txt-category-n1"></select>
                                    </div>
                                    <div class="gm-col-12">
                                        <label>Título</label>
                                        <input name="nombre" type="text" class="gm-form-control txt-name" />
                                    </div>
                                    <div class="gm-col-12">
                                        <label>Descripción</label>
                                        <textarea name="descripcion" class="gm-form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gm-modal-footer">
                <button type="button" class="gm-btn default close">Cancelar</button>
                <button type="button" class="gm-btn primary btn-save">Guardar</button>
            </div>
		</div>
	</div>
</form>

<script type="text/javascript" src="modules/products_services_categories/modals/md-category-n2.js"></script>
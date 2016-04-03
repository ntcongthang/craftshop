<script type="text/html" id="tmpl-builder_column">
	<div class="themify_builder_col {{ data.newclass }}">
		<div class="themify_builder_column_styling_icon ti-brush themify_builder_option_column" title="<?php esc_attr_e( 'Column Styling', 'themify' ); ?>"></div>
		<div class="themify_module_holder">
			<div class="empty_holder_text">{{ data.placeholder }}</div>
		</div>
		<div class="column-data-styling" data-styling=""></div>
	</div>
</script>

<script type="text/html" id="tmpl-builder_grid_menu">
	<?php themify_builder_grid_lists('module'); ?>
</script>

<script type="text/html" id="tmpl-builder_lightbox">
	<div id="themify_builder_overlay">
		<div id="themify_builder_lightbox_parent" class="themify_builder themify_builder_admin builder-lightbox clearfix {{ data.is_themify_theme }}">
			<h3 class="themify_builder_lightbox_title"></h3>
			<a href="#" class="close_lightbox"><i class="ti ti-close"></i></a>
			<div id="themify_builder_lightbox_container"></div>
		</div>
	</div>
</script>

<form id="tfb_imp_component_form">
	<input type="hidden" name="component" value="<?php echo esc_attr( $component ); ?>">
	<div class="lightbox_inner">
		<?php Themify_Builder_Form::render( $fields ); ?>
	</div>
	<!-- /lightbox_inner -->

	<p class="themify_builder_save">
		<input class="builder_button" type="submit" name="submit" value="<?php _e('Save', 'themify') ?>" />
	</p>
</form>

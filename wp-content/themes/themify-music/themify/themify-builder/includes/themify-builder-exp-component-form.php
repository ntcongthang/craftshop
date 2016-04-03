<form id="tfb_exp_component_form">
	<input type="hidden" name="component" value="<?php echo esc_attr( $component ); ?>">
	<div class="lightbox_inner">
		<?php Themify_Builder_Form::render( $fields ); ?>
	</div>
	<!-- /lightbox_inner -->
</form>

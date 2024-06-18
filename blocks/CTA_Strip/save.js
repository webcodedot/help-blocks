import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		container_width,
		title_color,
		bg_image_url,
		background_color,
		text_color,
		title_font_size,
		title_font_weight,
		text_font_size,
		text_font_weight,
		button_bg_color,
		button1_text_color,
		button2_text_color,
		button1_border_color,
		button2_border_color,
		button1_link,
		button2_link,
	} = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div className="strip-wrapper">
				<div
					className="strip-container"
					style={{
						backgroundImage: bg_image_url ? `url(${bg_image_url})` : '',
						backgroundColor: background_color,
					}}
				>
					<div
						className="strip-width-container"
						style={{
							width: container_width + '%',
							margin: 'auto',
						}}
					>
						<div className="cta-strip-text-container">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

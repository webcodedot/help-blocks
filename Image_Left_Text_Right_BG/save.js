/* eslint-disable camelcase */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import defaultBgImage from '../../blocks/Image_Left_Text_Right_BG/ig1.png'; // Importing default background image

export default function save({ attributes }) {
	const {
		bg_image_url,
		image_url,
		image_width,
		main_title,
		sub_title,
		text,
		main_title_font_size,
		main_title_font_weight,
		sub_title_font_size,
		sub_title_font_weight,
		text_font_size,
		text_font_weight,
		button_text,
		button_bg_color,
		button_text_color,
		text_container_bg_color,
		text_container_sub_title_color,
		text_container_text_color,
		title_color,
		button_link,
		container_width,
	} = attributes;

	const defaultMainTitle = 'An introduction to diabetes';
	const defaultSubTitle = 'What is Diabetes';
	const defaultText = 'You will notice one symptom of diabetes is going to the toilet more often. As you grow older this can often be confused as a normal sign of ageing. If you have recurring urinary tract infections or thrush infections that won’t go away, talk to your doctor.';
	const defaultButtonText = 'Read More';

	return (
		<div {...useBlockProps.save()}>
			<div
				style={{
					backgroundImage: bg_image_url ? `url(${bg_image_url})` : `url(${defaultBgImage})`,
					backgroundPosition: 'center',
				}}
				className="image-left-text-right-bg-image-wrapper"
			>
				<RichText.Content
					tagName="h2"
					className="image-left-text-right-bg-main-title"
					style={{
						color: title_color,
						width: container_width + '%',
						fontSize: main_title_font_size,
						fontWeight: main_title_font_weight,
					}}
					value={main_title || defaultMainTitle}
				/>
				<div
					style={{ width: container_width + '%' }}
					className="image-left-text-right-bg-main-container"
				>
					<div
						style={{ width: image_width + '%' }}
						className="image-left-text-right-bg-image-container container-item-flex-end"
					>
						<img
							alt="Upload a Media"
							src={image_url}
							style={{
								width: '100%',
							}}
						/>
					</div>
					<div
						style={{
							backgroundColor: text_container_bg_color,
							width: 100 - image_width + '%',
						}}
						className="image-left-text-right-bg-text-container container-item-flex-start"
					>
						<RichText.Content
							tagName="h3"
							className="image-left-text-right-bg-sub-title"
							style={{
								color: text_container_sub_title_color,
								fontSize: sub_title_font_size,
								fontWeight: sub_title_font_weight,
							}}
							value={sub_title || defaultSubTitle}
						/>
						<RichText.Content
							tagName="p"
							className="image-left-text-right-bg-text-content"
							style={{
								color: text_container_text_color,
								fontSize: text_font_size,
								fontWeight: text_font_weight,
								whiteSpace: 'pre-wrap',
							}}
							value={text || defaultText}
						/>
						<a
							href={button_link}
							target="_blank"
							rel="noopener noreferrer"
							className="image-left-text-right-bg-button image-left-text-right-bg-button-text"
							style={{
								backgroundColor: button_bg_color,
								color: button_text_color,
							}}
						>
							<RichText.Content
								tagName="span"
								value={button_text || defaultButtonText}
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/img-redundant-alt */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
// import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	RangeControl,
	TextControl,
} from '@wordpress/components';

import Color_Palette from '../../components/Color_Palette';
import Font_Control from '../../components/Font_Control';

const TEMPLATE = [
	['core/heading', { placeholder: 'Title', level: 2 }],
	['core/paragraph', { placeholder: 'Please Write Text...' }],
	['core/group', { className: 'cta-strip-button-container' }, [
		['core/button', { className: 'cta-strip-button' }],
		['core/button', { className: 'cta-strip-button2' }],
	]],
];

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

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

	const onSelectImage = (media) => {
		setAttributes({
			bg_image_url: media.url,
		});
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'older-people-gutenberg-blocks')}
					initialOpen={true}
				>
					<p className="custom__editor__label">
						{__('Container Width (%)', 'older-people-gutenberg-blocks')}
					</p>
					<RangeControl
						label={''}
						value={container_width}
						onChange={(e) => setAttributes({ container_width: e })}
						min={0}
						max={100}
					/>
					<p className="custom_editor_label">
						{__('Background Image', 'older-people-gutenberg-blocks')}
					</p>
					<MediaUpload
						onSelect={(media) => setAttributes({ bg_image_url: media.url })}
						render={({ open }) => (
							<Button
								isSecondary
								style={{ marginBottom: bg_image_url ? 10 : 0 }}
								onClick={open}
							>
								Select Image
							</Button>
						)}
					/>
					{bg_image_url && (
						<img
							src={bg_image_url}
							style={{ marginBottom: 20 }}
							alt="Selected Image"
						/>
					)}

					<Color_Palette
						label={'Background Color'}
						value={background_color}
						onChange={(value) => setAttributes({ background_color: value })}
					/>

					<Font_Control
						label={'Title Font'}
						show={['size', 'weight']}
						size={{
							min: 14,
							max: 28,
							value: title_font_size,
						}}
						weight={{
							value: title_font_weight,
						}}
						onChangeWeight={(value) => {
							setAttributes({ title_font_weight: value });
						}}
						onChangeSize={(value) => {
							setAttributes({ title_font_size: value });
						}}
					/>
					<Color_Palette
						label={'Title Color'}
						value={title_color}
						onChange={(value) => setAttributes({ title_color: value })}
					/>

					<Font_Control
						label={'Text Font'}
						show={['size', 'weight']}
						size={{
							min: 10,
							max: 24,
							value: text_font_size,
						}}
						weight={{
							value: text_font_weight,
						}}
						onChangeWeight={(value) => {
							setAttributes({ text_font_weight: value });
						}}
						onChangeSize={(value) => {
							setAttributes({ text_font_size: value });
						}}
					/>

					<Color_Palette
						label={'Text Color'}
						value={text_color}
						onChange={(value) => setAttributes({ text_color: value })}
					/>
					<Color_Palette
						label={'Button Background Color'}
						value={button_bg_color}
						onChange={(value) => setAttributes({ button_bg_color: value })}
					/>
					<Color_Palette
						label={'Button-1 Text Color'}
						value={button1_text_color}
						onChange={(value) => setAttributes({ button1_text_color: value })}
					/>
					<Color_Palette
						label={'Button-2 Text Color'}
						value={button2_text_color}
						onChange={(value) => setAttributes({ button2_text_color: value })}
					/>
					<Color_Palette
						label={'Button-1 Border Color'}
						value={button1_border_color}
						onChange={(value) => setAttributes({ button1_border_color: value })}
					/>
					<Color_Palette
						label={'Button-2 Border Color'}
						value={button2_border_color}
						onChange={(value) => setAttributes({ button2_border_color: value })}
					/>

					<p className="custom__editor__label">
						{__('Button-1 Link', 'older-people-gutenberg-blocks')}
					</p>
					<TextControl
						label=""
						value={button1_link}
						placeholder={__('Button Link', 'older-people-gutenberg-blocks')}
						onChange={(e) => {
							setAttributes({ button1_link: e });
						}}
						type="link"
					/>
					<p className="custom__editor__label">
						{__('Button-2 Link', 'older-people-gutenberg-blocks')}
					</p>
					<TextControl
						label=""
						value={button2_link}
						placeholder={__('Button Link', 'older-people-gutenberg-blocks')}
						onChange={(e) => {
							setAttributes({ button2_link: e });
						}}
						type="link"
					/>
				</PanelBody>
			</InspectorControls>

			<div className="strip-wrapper">
				<div
					className="strip-container"
					style={{
						backgroundImage: bg_image_url ? `url(${bg_image_url})` : '',
						backgroundColor: background_color,
					}}
				>
					<div className="strip-width-container" style={{
						width: container_width + "%",
						margin:"auto",
					}}>
						<div className="cta-strip-text-container">
							<InnerBlocks
								template={TEMPLATE}
								templateLock="all"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

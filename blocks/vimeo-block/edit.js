/* eslint-disable camelcase */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	InnerBlocks,
	PlainText,
	BlockControls,
	PanelColorSettings,
	FontSizePicker,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Button,
	TextControl,
	SelectControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { useState, Fragment } from '@wordpress/element';

// editor style
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		container_width,
		bg_image_url,
		main_title,
		image_url,
		sub_title,
		text,
		main_title_color,
		main_title_font_size,
		main_title_font_weight,
		main_container_bg_color,
		sub_title_font_size,
		sub_title_font_weight,
		text_font_size,
		text_font_weight,
		main_container_sub_title_color,
		main_container_text_color,
		button2_text,
		button2_text_color,
		button2_icon,
		button2_link,
	} = attributes;

	const [selectedElement, setSelectedElement] = useState('container');

	const ALLOWED_BLOCKS = ['core/embed'];
	const TEMPLATE = [['core/embed']];

	const fontWeights = [
		{ label: 'Thin', value: 100 },
		{ label: 'Extra Light', value: 200 },
		{ label: 'Light', value: 300 },
		{ label: 'Normal', value: 400 },
		{ label: 'Medium', value: 500 },
		{ label: 'Semi Bold', value: 600 },
		{ label: 'Bold', value: 700 },
		{ label: 'Extra Bold', value: 800 },
		{ label: 'Black', value: 900 },
	];

	const fontSizes = [
		{ name: 'Small', slug: 'small', size: 12 },
		{ name: 'Normal', slug: 'normal', size: 16 },
		{ name: 'Large', slug: 'large', size: 20 },
		{ name: 'Huge', slug: 'huge', size: 24 },
	];

	const onSelectImage = (media) => {
		setAttributes({
			image_url: media.url,
		});
	};

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={__('Container Settings', 'older-people-gutenberg-blocks')}
						icon="admin-generic"
						onClick={() => setSelectedElement('container')}
						isPressed={selectedElement === 'container'}
					/>
					<ToolbarButton
						label={__('Main Heading Settings', 'older-people-gutenberg-blocks')}
						icon="editor-textcolor"
						onClick={() => setSelectedElement('main_title')}
						isPressed={selectedElement === 'main_title'}
					/>
					<ToolbarButton
						label={__('Sub Title Settings', 'older-people-gutenberg-blocks')}
						icon="editor-textcolor"
						onClick={() => setSelectedElement('sub_title')}
						isPressed={selectedElement === 'sub_title'}
					/>
					<ToolbarButton
						label={__('Description Settings', 'older-people-gutenberg-blocks')}
						icon="editor-textcolor"
						onClick={() => setSelectedElement('text')}
						isPressed={selectedElement === 'text'}
					/>
					<ToolbarButton
						label={__('Button Settings', 'older-people-gutenberg-blocks')}
						icon="admin-links"
						onClick={() => setSelectedElement('button')}
						isPressed={selectedElement === 'button'}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				{selectedElement === 'container' && (
					<PanelBody
						title={__('Container Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<RangeControl
							label={__('Container Width (%)', 'older-people-gutenberg-blocks')}
							value={container_width}
							onChange={(value) => setAttributes({ container_width: value })}
							min={0}
							max={100}
						/>

						<MediaUpload
							onSelect={(media) => setAttributes({ bg_image_url: media.url })}
							render={({ open }) => (
								<Button
									isSecondary
									style={{ marginBottom: bg_image_url ? 10 : 0 }}
									onClick={open}
								>
									{__('Select Background Image', 'older-people-gutenberg-blocks')}
								</Button>
							)}
						/>
						{bg_image_url && (
							<img
								src={bg_image_url}
								style={{ marginBottom: 20 }}
								alt="Selected Background"
							/>
						)}

						<PanelColorSettings
							title={__('Background Color Settings', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: main_container_bg_color,
									onChange: (value) => setAttributes({ main_container_bg_color: value }),
									label: __('Main Container Background Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>
					</PanelBody>
				)}

				{selectedElement === 'main_title' && (
					<PanelBody
						title={__('Main Heading Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Main Heading Color', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: main_title_color,
									onChange: (value) => setAttributes({ main_title_color: value }),
									label: __('Main Title Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>

						<FontSizePicker
							fontSizes={fontSizes}
							value={main_title_font_size}
							fallbackFontSize={20}
							onChange={(value) => setAttributes({ main_title_font_size: value })}
							label={__('Main Title Font Size', 'older-people-gutenberg-blocks')}
						/>

						<SelectControl
							label={__('Main Title Font Weight', 'older-people-gutenberg-blocks')}
							value={main_title_font_weight}
							options={fontWeights}
							onChange={(value) => setAttributes({ main_title_font_weight: value })}
						/>
					</PanelBody>
				)}

				{selectedElement === 'sub_title' && (
					<PanelBody
						title={__('Sub Title Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Sub Title Color', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: main_container_sub_title_color,
									onChange: (value) => setAttributes({ main_container_sub_title_color: value }),
									label: __('Sub Title Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>

						<FontSizePicker
							fontSizes={fontSizes}
							value={sub_title_font_size}
							fallbackFontSize={18}
							onChange={(value) => setAttributes({ sub_title_font_size: value })}
							label={__('Sub Title Font Size', 'older-people-gutenberg-blocks')}
						/>

						<SelectControl
							label={__('Sub Title Font Weight', 'older-people-gutenberg-blocks')}
							value={sub_title_font_weight}
							options={fontWeights}
							onChange={(value) => setAttributes({ sub_title_font_weight: value })}
						/>
					</PanelBody>
				)}

				{selectedElement === 'text' && (
					<PanelBody
						title={__('Description Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Description Color', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: main_container_text_color,
									onChange: (value) => setAttributes({ main_container_text_color: value }),
									label: __('Text Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>

						<FontSizePicker
							fontSizes={fontSizes}
							value={text_font_size}
							fallbackFontSize={16}
							onChange={(value) => setAttributes({ text_font_size: value })}
							label={__('Text Font Size', 'older-people-gutenberg-blocks')}
						/>

						<SelectControl
							label={__('Text Font Weight', 'older-people-gutenberg-blocks')}
							value={text_font_weight}
							options={fontWeights}
							onChange={(value) => setAttributes({ text_font_weight: value })}
						/>
					</PanelBody>
				)}

				{selectedElement === 'button' && (
					<PanelBody
						title={__('Button Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Button Color Settings', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: button2_text_color,
									onChange: (value) => setAttributes({ button2_text_color: value }),
									label: __('Button Text Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>
						<MediaUpload
							onSelect={(media) => setAttributes({ button2_icon: media.url })}
							render={({ open }) => (
								<Button isSecondary onClick={open}>
									{__('Select Icon', 'older-people-gutenberg-blocks')}
								</Button>
							)}
						/>
						{button2_icon && (
							<img
								src={button2_icon}
								style={{ marginBottom: 20 }}
								alt="Selected Icon"
							/>
						)}
						<TextControl
							label={__('Button Link', 'older-people-gutenberg-blocks')}
							value={button2_link}
							onChange={(value) => setAttributes({ button2_link: value })}
						/>
					</PanelBody>
				)}
			</InspectorControls>

			<div {...useBlockProps()}>
				<div
					style={{
						backgroundImage: bg_image_url ? `url(${bg_image_url})` : '',
						backgroundPosition: 'center',
					}}
					className="media-share-wrapper"
				>
					<PlainText
						className="media-share-main-title"
						value={main_title}
						style={{
							color: main_title_color,
							fontSize: main_title_font_size,
							fontWeight: main_title_font_weight,
							width: container_width + '%',
							padding: '0 20px 0 20px',
						}}
						placeholder={__('Headline', 'older-people-gutenberg-blocks')}
						onClick={() => setSelectedElement('main_title')}
						onChange={(e) => setAttributes({ main_title: e })}
					/>

					<div
						className="media-share-main-container"
						style={{
							display: 'flex',
							backgroundColor: main_container_bg_color,
							width: container_width + '%',
						}}
					>
						<div className="media-share-text-container">
							<PlainText
								className="media-share-sub-title"
								style={{
									color: main_container_sub_title_color,
									fontSize: sub_title_font_size,
									fontWeight: sub_title_font_weight,
								}}
								value={sub_title}
								placeholder={__('Sub Title', 'older-people-gutenberg-blocks')}
								onClick={() => setSelectedElement('sub_title')}
								onChange={(e) => setAttributes({ sub_title: e })}
							/>
							<PlainText
								className="media-share-text-content"
								style={{
									color: main_container_text_color,
									fontSize: text_font_size,
									fontWeight: text_font_weight,
								}}
								value={text}
								placeholder={__('Please Write Text...', 'older-people-gutenberg-blocks')}
								onClick={() => setSelectedElement('text')}
								onChange={(e) => setAttributes({ text: e })}
							/>
							<div className="media-share-button-container">
								<div className="media-share-button2">
									<PlainText
										className="media-share-button2-text"
										value={button2_text}
										style={{
											height: 'fit-content',
											color: button2_text_color,
										}}
										placeholder={__('Button 2 Text', 'older-people-gutenberg-blocks')}
										onClick={() => setSelectedElement('button')}
										onChange={(e) => setAttributes({ button2_text: e })}
									/>
									{button2_icon && (
										<img
											src={button2_icon}
											alt="icon"
											style={{ height: 25 }}
										/>
									)}
								</div>
							</div>
						</div>

						<div className="media-share-video-container">
							<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

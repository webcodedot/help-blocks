/* eslint-disable camelcase */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaPlaceholder,
	RichText,
	PanelColorSettings,
	FontSizePicker,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	RangeControl,
	TextControl,
	SelectControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { useState, Fragment } from '@wordpress/element';
import defaultBgImage from '../../blocks/Image_Left_Text_Right_BG/ig1.png'; // Importing default background image

// editor style
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
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

	const [selectedElement, setSelectedElement] = useState('container');

	const onSelectImage = (media) => {
		setAttributes({
			image_url: media.url,
		});
	};

	const removeBackgroundImage = () => {
		setAttributes({ bg_image_url: '' });
	};

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
					<ToolbarButton
						label={__('Block Settings', 'older-people-gutenberg-blocks')}
						icon="editor-kitchensink"
						onClick={() => setSelectedElement('container')}
						isPressed={selectedElement === 'container'}
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

						<RangeControl
							label={__('Image Width (%)', 'older-people-gutenberg-blocks')}
							value={image_width}
							onChange={(value) => setAttributes({ image_width: value })}
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
						{bg_image_url ? (
							<>
								<img
									src={bg_image_url}
									style={{ marginBottom: 20 }}
									alt="Selected Background"
								/>
								<Button
									isSecondary
									style={{ marginBottom: '10px' }}
									onClick={removeBackgroundImage}
								>
									{__('Remove Background Image', 'older-people-gutenberg-blocks')}
								</Button>
							</>
						) : (
							<img
								src={defaultBgImage}
								style={{ marginBottom: 20 }}
								alt="Default Background"
							/>
						)}

						<PanelColorSettings
							title={__('Background Color Settings', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: text_container_bg_color,
									onChange: (value) => setAttributes({ text_container_bg_color: value }),
									label: __('Text Container Background Color', 'older-people-gutenberg-blocks'),
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
									value: title_color,
									onChange: (value) => setAttributes({ title_color: value }),
									label: __('Title Color', 'older-people-gutenberg-blocks'),
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
									value: text_container_sub_title_color,
									onChange: (value) => setAttributes({ text_container_sub_title_color: value }),
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
									value: text_container_text_color,
									onChange: (value) => setAttributes({ text_container_text_color: value }),
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
									value: button_bg_color,
									onChange: (value) => setAttributes({ button_bg_color: value }),
									label: __('Button Background Color', 'older-people-gutenberg-blocks'),
								},
								{
									value: button_text_color,
									onChange: (value) => setAttributes({ button_text_color: value }),
									label: __('Button Text Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>

						<TextControl
							label={__('Button Link', 'older-people-gutenberg-blocks')}
							value={button_link}
							onChange={(value) => setAttributes({ button_link: value })}
							type="url"
						/>
					</PanelBody>
				)}
			</InspectorControls>

			<div {...useBlockProps()}>
				<div
					style={{
						backgroundImage: bg_image_url ? `url(${bg_image_url})` : `url(${defaultBgImage})`,
						backgroundPosition: 'center',
					}}
					className="image-left-text-right-bg-image-wrapper"
				>
					<RichText
						className="image-left-text-right-bg-main-title"
						tagName="h2"
						style={{
							color: title_color,
							width: container_width + '%',
							fontSize: main_title_font_size,
							fontWeight: main_title_font_weight,
						}}
						value={main_title || __('An introduction to diabetes', 'older-people-gutenberg-blocks')}
						placeholder={__('An introduction to diabetes', 'older-people-gutenberg-blocks')}
						onClick={() => setSelectedElement('main_title')}
						onChange={(value) => setAttributes({ main_title: value })}
					/>
					<div
						style={{ width: container_width + '%' }}
						className="image-left-text-right-bg-main-container"
					>
						<div
							style={{ width: image_width + '%' }}
							className="image-left-text-right-bg-image-container container-item-flex-end"
						>
							{image_url ? (
								<>
									<img
										alt="Upload a Media"
										src={image_url}
										style={{
											width: '100%',
											marginBottom: 20,
										}}
									/>
									<MediaUpload
										onSelect={onSelectImage}
										allowedTypes={['image']}
										value={image_url}
										render={({ open }) => (
											<Button onClick={open} isSecondary>
												{__('Change Image', 'older-people-gutenberg-blocks')}
											</Button>
										)}
									/>
								</>
							) : (
								<MediaPlaceholder
									icon="format-image"
									labels={{ title: __('Select Image') }}
									className="image-wrapper"
									onSelect={onSelectImage}
									accept="image/*"
									allowedTypes={['image']}
								/>
							)}
						</div>
						<div
							style={{
								backgroundColor: text_container_bg_color,
								width: 100 - image_width + '%',
							}}
							className="image-left-text-right-bg-text-container container-item-flex-start"
						>
							<RichText
								className="image-left-text-right-bg-sub-title"
								tagName="h3"
								style={{
									color: text_container_sub_title_color,
									fontSize: sub_title_font_size,
									fontWeight: sub_title_font_weight,
								}}
								value={sub_title || __('What is Diabetes', 'older-people-gutenberg-blocks')}
								placeholder={__('What is Diabetes', 'older-people-gutenberg-blocks')}
								onClick={() => setSelectedElement('sub_title')}
								onChange={(value) => setAttributes({ sub_title: value })}
							/>
							<RichText
								className="image-left-text-right-bg-text-content"
								tagName="p"
								style={{
									color: text_container_text_color,
									fontSize: text_font_size,
									fontWeight: text_font_weight,
								}}
								value={text || __('You will notice one symptom of diabetes is going to the toilet more often. As you grow older this can often be confused as a normal sign of ageing. If you have recurring urinary tract infections or thrush infections that won’t go away, talk to your doctor.', 'older-people-gutenberg-blocks')}
								placeholder={__('You will notice one symptom of diabetes is going to the toilet more often. As you grow older this can often be confused as a normal sign of ageing. If you have recurring urinary tract infections or thrush infections that won’t go away, talk to your doctor.', 'older-people-gutenberg-blocks')}
								onClick={() => setSelectedElement('text')}
								onChange={(value) => setAttributes({ text: value })}
							/>
							<div
								className="image-left-text-right-bg-button"
								style={{
									backgroundColor: button_bg_color,
								}}
							>
								<RichText
									className="image-left-text-right-bg-button-text"
									tagName="span"
									style={{
										color: button_text_color,
									}}
									value={button_text || __('Read More', 'older-people-gutenberg-blocks')}
									placeholder={__('Read More', 'older-people-gutenberg-blocks')}
									onClick={() => setSelectedElement('button')}
									onChange={(value) => setAttributes({ button_text: value })}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

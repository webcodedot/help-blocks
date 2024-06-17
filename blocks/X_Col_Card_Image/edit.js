/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	RichText,
	MediaUpload,
	MediaPlaceholder,
	InnerBlocks,
	PanelColorSettings,
	FontSizePicker,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import Range_Control from '../../components/Range_Control';
import Color_Palette from '../../components/Color_Palette';

const { Fragment } = wp.element;

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const [selectedElement, setSelectedElement] = useState(null);

	const {
		number_of_columns,
		data_array,
		grid_container_background_color,
		image_height,
		main_title,
		main_title_text_color,
		main_title_font_size,
		main_title_font_weight,
		main_container_background_color,
		sub_title_text_color,
		sub_title_font_size,
		sub_title_font_weight,
		description_text_color,
		description_font_size,
		description_font_weight,
		button_background_color,
		button_text_color,
		button_text_font_size,
		button_text_font_weight,
		container_width,
	} = attributes;

	useEffect(() => {
		if (data_array.length === 0) {
			change_data_array(number_of_columns);
		}
	}, []);

	const change_data_array = (number) => {
		const new_data_array = [];
		for (let i = 0; i < number; i++) {
			if (data_array[i]) {
				new_data_array.push(data_array[i]);
			} else {
				new_data_array.push({
					image: '',
					title: `Title ${i + 1}`,
					buttonLink: '',
					description: `Description ${i + 1}`,
					buttonText: `ButtonText ${i + 1}`,
				});
			}
		}
		setAttributes({ data_array: new_data_array });
	};

	const fontSizes = [
		{ name: 'S', slug: 'small', size: 12 },
		{ name: 'M', slug: 'medium', size: 16 },
		{ name: 'L', slug: 'large', size: 36 },
		{ name: 'XL', slug: 'extra-large', size: 50 },
	];

	const handleMainTitleClick = () => {
		setSelectedElement('mainTitle');
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'older-people-gutenberg-blocks')} initialOpen={true}>
					<Range_Control
						label={__('Container Width')}
						min={0}
						max={100}
						value={container_width}
						onChange={(value) => setAttributes({ container_width: value })}
					/>
					<Range_Control
						label={__('Columns')}
						min={2}
						max={4}
						value={number_of_columns}
						onChange={(value) => {
							setAttributes({ number_of_columns: value });
							change_data_array(value);
						}}
					/>
					<Range_Control
						label={__('Image Height')}
						min={250}
						max={700}
						value={image_height}
						onChange={(value) => setAttributes({ image_height: value })}
					/>
					<Color_Palette
						label={__('Grid Container Background Color')}
						value={grid_container_background_color}
						onChange={(value) => setAttributes({ grid_container_background_color: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Main Title Settings', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'mainTitle'}>
					<PanelColorSettings
						title={__('Color Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
						colorSettings={[
							{
								value: main_title_text_color,
								onChange: (color) => setAttributes({ main_title_text_color: color }),
								label: __('Main Title Text Color', 'older-people-gutenberg-blocks'),
							},
						]}
					/>
					<FontSizePicker
						value={main_title_font_size}
						onChange={(size) => setAttributes({ main_title_font_size: size })}
						fontSizes={fontSizes}
					/>
					<SelectControl
						label={__('Font Weight', 'older-people-gutenberg-blocks')}
						value={main_title_font_weight}
						options={[
							{ label: 'Normal', value: 'normal' },
							{ label: 'Bold', value: 'bold' },
						]}
						onChange={(value) => setAttributes({ main_title_font_weight: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Main Container Background Color', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'mainContainerBackground'}>
					<Color_Palette
						label={__('Main Container Background Color')}
						value={main_container_background_color}
						onChange={(value) => setAttributes({ main_container_background_color: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Sub Title Settings', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'subTitle'}>
					<PanelColorSettings
						title={__('Color Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
						colorSettings={[
							{
								value: sub_title_text_color,
								onChange: (color) => setAttributes({ sub_title_text_color: color }),
								label: __('Sub Title Text Color', 'older-people-gutenberg-blocks'),
							},
						]}
					/>
					<FontSizePicker
						value={sub_title_font_size}
						onChange={(size) => setAttributes({ sub_title_font_size: size })}
						fontSizes={fontSizes}
					/>
					<SelectControl
						label={__('Font Weight', 'older-people-gutenberg-blocks')}
						value={sub_title_font_weight}
						options={[
							{ label: 'Normal', value: 'normal' },
							{ label: 'Bold', value: 'bold' },
						]}
						onChange={(value) => setAttributes({ sub_title_font_weight: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Description Settings', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'description'}>
					<PanelColorSettings
						title={__('Color Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
						colorSettings={[
							{
								value: description_text_color,
								onChange: (color) => setAttributes({ description_text_color: color }),
								label: __('Description Text Color', 'older-people-gutenberg-blocks'),
							},
						]}
					/>
					<FontSizePicker
						value={description_font_size}
						onChange={(size) => setAttributes({ description_font_size: size })}
						fontSizes={fontSizes}
					/>
					<SelectControl
						label={__('Font Weight', 'older-people-gutenberg-blocks')}
						value={description_font_weight}
						options={[
							{ label: 'Normal', value: 'normal' },
							{ label: 'Bold', value: 'bold' },
						]}
						onChange={(value) => setAttributes({ description_font_weight: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Button Settings', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'button'}>
					<PanelColorSettings
						title={__('Color Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
						colorSettings={[
							{
								value: button_background_color,
								onChange: (color) => setAttributes({ button_background_color: color }),
								label: __('Button Background Color', 'older-people-gutenberg-blocks'),
							},
							{
								value: button_text_color,
								onChange: (color) => setAttributes({ button_text_color: color }),
								label: __('Button Text Color', 'older-people-gutenberg-blocks'),
							},
						]}
					/>
					<FontSizePicker
						value={button_text_font_size}
						onChange={(size) => setAttributes({ button_text_font_size: size })}
						fontSizes={fontSizes}
					/>
					<SelectControl
						label={__('Font Weight', 'older-people-gutenberg-blocks')}
						value={button_text_font_weight}
						options={[
							{ label: 'Normal', value: 'normal' },
							{ label: 'Bold', value: 'bold' },
						]}
						onChange={(value) => setAttributes({ button_text_font_weight: value })}
					/>
					<p className="custom__editor__label">{__('Button Links', 'older-people-gutenberg-blocks')}</p>
					{data_array.map((data, i) => (
						<div key={i} style={{ marginBottom: 10, borderBottom: '1px solid #eee' }}>
							<TextControl
								label=""
								value={data.buttonLink}
								placeholder={__('ButtonLink', 'older-people-gutenberg-blocks')}
								onChange={(e) => {
									const dataCopy = [...data_array];
									dataCopy[i].buttonLink = e;
									setAttributes({ data_array: dataCopy });
								}}
								type="link"
							/>
						</div>
					))}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: grid_container_background_color,
					}}
				>
					<div style={{ width: container_width + '%' }}>
						<RichText
							tagName="h2"
							style={{
								color: main_title_text_color,
								fontSize: main_title_font_size,
								fontWeight: main_title_font_weight,
								background: 'transparent',
								margin: '20px 20px 0 20px',
							}}
							value={main_title}
							placeholder={__('Headline', 'older-people-gutenberg-blocks')}
							onChange={(e) => {
								setAttributes({ main_title: e });
							}}
							onClick={handleMainTitleClick}
						/>
						<InnerBlocks
							allowedBlocks={['core/paragraph']}
							template={[['core/paragraph', { content: 'write your description here' }]]}
						/>
						<div
							style={{
								padding: '20px',
								display: 'grid',
								gridTemplateColumns: `repeat(${number_of_columns}, 1fr)`,
								gap: '20px',
							}}
						>
							{data_array.length > 0 &&
								data_array.map((data, i) => (
									<div
										key={i}
										className="x-col-card-image-main-container"
										style={{
											background: main_container_background_color,
											border: '2px solid ',
											borderRadius: '11px',
										}}
									>
										<div
											className="x-col-card-image-image-component"
											style={{
												border: '2px solid ',
												borderRadius: '11px',
											}}
										>
											{data.image ? (
												<div className="x-col-card-image-image-container-child">
													<img
														src={data.image}
														style={{
															maxWidth: '100%',
															height: image_height,
															objectFit: 'cover',
														}}
													/>
													<MediaUpload
														onSelect={(media) => {
															const dataCopy = [...data_array];
															dataCopy[i].image = media.url;
															setAttributes({ data_array: dataCopy });
														}}
														allowedTypes={['image']}
														value={data.image}
														render={({ open }) => (
															<Button onClick={open} isSecondary>
																{__('Change')}
															</Button>
														)}
													/>
												</div>
											) : (
												<MediaPlaceholder
													image="format-image"
													labels={{ title: __('Media') }}
													className=""
													onSelect={(media) => {
														const dataCopy = [...data_array];
														dataCopy[i].image = media.url;
														setAttributes({ data_array: dataCopy });
													}}
													accept="image/*"
													allowedTypes={['image']}
												/>
											)}
										</div>
										<div className="x-col-card-image-text-container" style={{ padding: '15px' }}>
											<RichText
												tagName="h3"
												className=""
												value={data.title}
												placeholder={__('Title', 'older-people-gutenberg-blocks')}
												onChange={(e) => {
													const dataCopy = [...data_array];
													dataCopy[i].title = e;
													setAttributes({ data_array: dataCopy });
												}}
												style={{
													marginBottom: 0,
													color: sub_title_text_color,
													background: 'transparent',
													fontSize: sub_title_font_size,
													fontWeight: sub_title_font_weight,
												}}
												onClick={() => setSelectedElement('subTitle')}
											/>
											<RichText
												tagName="p"
												className=""
												value={data.description}
												placeholder={__('Description', 'older-people-gutenberg-blocks')}
												onChange={(e) => {
													const dataCopy = [...data_array];
													dataCopy[i].description = e;
													setAttributes({ data_array: dataCopy });
												}}
												style={{
													background: 'transparent',
													color: description_text_color,
													fontSize: description_font_size,
													fontWeight: description_font_weight,
												}}
												onClick={() => setSelectedElement('description')}
											/>
											<div
												className="x-col-card-image-button"
												style={{
													backgroundColor: button_background_color,
												}}
											>
												<RichText
													tagName="span"
													className="x-col-card-image-button-text"
													value={data.buttonText}
													placeholder={__('ButtonText', 'older-people-gutenberg-blocks')}
													onChange={(e) => {
														const dataCopy = [...data_array];
														dataCopy[i].buttonText = e;
														setAttributes({ data_array: dataCopy });
													}}
													style={{
														background: 'transparent',
														color: button_text_color,
														fontSize: button_text_font_size,
														fontWeight: button_text_font_weight,
													}}
													onClick={() => setSelectedElement('button')}
												/>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

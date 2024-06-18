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
	const blockProps = useBlockProps({ align: 'wide' });
	const [selectedElement, setSelectedElement] = useState('blockSettings');

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
					description: 'Go to the NDSS website to read or download translated resources or call the NDSS Helpline 1800 637 700 and ask for a copy to be sent to you.\nNeed an interpreter? Call the Translating and Interpreting Service (TIS) on 131 450. State your language. Wait to be connected and ask for 1800 637 700.',
					buttonText: 'Read More',
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

	const handlePanelToggle = (panel) => {
		setSelectedElement((prev) => (prev === panel ? 'blockSettings' : panel));
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'blockSettings'} onToggle={() => handlePanelToggle('blockSettings')}>
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
					{/*<Range_Control
						label={__('Image Height')}
						min={250}
						max={700}
						value={image_height}
						onChange={(value) => setAttributes({ image_height: value })}
					/> */}
					<PanelColorSettings
						title={__('Color Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
						colorSettings={[
							{
								value: grid_container_background_color,
								onChange: (color) => setAttributes({ grid_container_background_color: color }),
								label: __('Grid Container Background Color', 'older-people-gutenberg-blocks'),
							},
						]}
					/>
				</PanelBody>
				<PanelBody title={__('Main Title Settings', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'mainTitle'} onToggle={() => handlePanelToggle('mainTitle')}>
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
				<PanelBody title={__('Main Container Background Color', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'mainContainerBackground'} onToggle={() => handlePanelToggle('mainContainerBackground')}>
					<PanelColorSettings
						title={__('Color Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
						colorSettings={[
							{
								value: main_container_background_color,
								onChange: (color) => setAttributes({ main_container_background_color: color }),
								label: __('Main Container Background Color', 'older-people-gutenberg-blocks'),
							},
						]}
					/>
				</PanelBody>
				<PanelBody title={__('Sub Title Settings', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'subTitle'} onToggle={() => handlePanelToggle('subTitle')}>
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
				<PanelBody title={__('Description Settings', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'description'} onToggle={() => handlePanelToggle('description')}>
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
				<PanelBody title={__('Button Settings', 'older-people-gutenberg-blocks')} initialOpen={selectedElement === 'button'} onToggle={() => handlePanelToggle('button')}>
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
							value={main_title || 'How we help?'}
							placeholder={__('How we help?', 'older-people-gutenberg-blocks')}
							onChange={(e) => {
								setAttributes({ main_title: e });
							}}
							onClick={() => handlePanelToggle('mainTitle')}
						/>
						<InnerBlocks
							allowedBlocks={['core/paragraph']}
							template={[['core/paragraph', { content: 'If you have any questions, you can call the NDSS Helpline on 1800 637 700 or email info@ndss.com.au.' }]]}
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
											
										}}
									>
										<div
											className="x-col-card-image-image-component"
											style={{
												
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
												value={data.title || `Title ${i + 1}`}
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
												onClick={() => handlePanelToggle('subTitle')}
											/>
											<RichText
												tagName="p"
												className=""
												value={data.description || 'Go to the NDSS website to read or download translated resources or call the NDSS Helpline 1800 637 700 and ask for a copy to be sent to you.\nNeed an interpreter? Call the Translating and Interpreting Service (TIS) on 131 450. State your language. Wait to be connected and ask for 1800 637 700.'}
												placeholder={__('Go to the NDSS website to read or download translated resources or call the NDSS Helpline 1800 637 700 and ask for a copy to be sent to you.\nNeed an interpreter? Call the Translating and Interpreting Service (TIS) on 131 450. State your language. Wait to be connected and ask for 1800 637 700.', 'older-people-gutenberg-blocks')}
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
												onClick={() => handlePanelToggle('description')}
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
													value={data.buttonText || 'Read More'}
													placeholder={__('Read More', 'older-people-gutenberg-blocks')}
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
													onClick={() => handlePanelToggle('button')}
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

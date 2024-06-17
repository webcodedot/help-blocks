/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	PlainText,
	MediaUpload,
	MediaPlaceholder,
	BlockControls,
	PanelColorSettings,
	FontSizePicker,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	ToolbarGroup,
	ToolbarButton,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
const { Fragment } = wp.element;

// editor style
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		number_of_columns,
		background_color,
		main_title,
		main_title_color,
		main_title_font_size,
		main_title_font_weight,
		data_array,
		column_title_color,
		description_color,
		column_title_font_size,
		description_font_size,
		column_title_font_weight,
		description_font_weight,
	} = attributes;

	const [selectedElement, setSelectedElement] = useState('container');

	useEffect(() => {
		if (data_array.length === 0) {
			change_data_array(number_of_columns);
		}
	}, [data_array, number_of_columns]);

	const change_data_array = (number) => {
		const new_data_array = [];
		for (let i = 0; i < number; i++) {
			if (data_array[i]) {
				new_data_array.push(data_array[i]);
			} else {
				new_data_array.push({
					icon: '',
					title: `Title ${i + 1}`,
					link: '',
					description: `Description ${i + 1}`,
				});
			}
		}
		setAttributes({ data_array: new_data_array });
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
						label={__('Main Title Settings', 'older-people-gutenberg-blocks')}
						icon="editor-textcolor"
						onClick={() => setSelectedElement('main_title')}
						isPressed={selectedElement === 'main_title'}
					/>
					<ToolbarButton
						label={__('Column Title Settings', 'older-people-gutenberg-blocks')}
						icon="editor-textcolor"
						onClick={() => setSelectedElement('column_title')}
						isPressed={selectedElement === 'column_title'}
					/>
					<ToolbarButton
						label={__('Description Settings', 'older-people-gutenberg-blocks')}
						icon="editor-textcolor"
						onClick={() => setSelectedElement('description')}
						isPressed={selectedElement === 'description'}
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
							label={__('Columns')}
							min={1}
							max={7}
							value={number_of_columns}
							onChange={(value) => {
								setAttributes({ number_of_columns: value });
								change_data_array(value);
							}}
						/>
						<PanelColorSettings
							title={__('Background Color Settings', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: background_color,
									onChange: (value) => setAttributes({ background_color: value }),
									label: __('Background Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>
					</PanelBody>
				)}

				{selectedElement === 'main_title' && (
					<PanelBody
						title={__('Main Title Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Main Title Color', 'older-people-gutenberg-blocks')}
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

				{selectedElement === 'column_title' && (
					<PanelBody
						title={__('Column Title Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Column Title Color', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: column_title_color,
									onChange: (value) => setAttributes({ column_title_color: value }),
									label: __('Column Title Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							value={column_title_font_size}
							fallbackFontSize={16}
							onChange={(value) => setAttributes({ column_title_font_size: value })}
							label={__('Column Title Font Size', 'older-people-gutenberg-blocks')}
						/>
						<SelectControl
							label={__('Column Title Font Weight', 'older-people-gutenberg-blocks')}
							value={column_title_font_weight}
							options={fontWeights}
							onChange={(value) => setAttributes({ column_title_font_weight: value })}
						/>
					</PanelBody>
				)}

				{selectedElement === 'description' && (
					<PanelBody
						title={__('Description Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Description Color', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: description_color,
									onChange: (value) => setAttributes({ description_color: value }),
									label: __('Description Text Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							value={description_font_size}
							fallbackFontSize={14}
							onChange={(value) => setAttributes({ description_font_size: value })}
							label={__('Description Font Size', 'older-people-gutenberg-blocks')}
						/>
						<SelectControl
							label={__('Description Font Weight', 'older-people-gutenberg-blocks')}
							value={description_font_weight}
							options={fontWeights}
							onChange={(value) => setAttributes({ description_font_weight: value })}
						/>
					</PanelBody>
				)}
			</InspectorControls>

			<div {...useBlockProps()}>
				<div style={{ background: background_color, width: 'fit-content' }}>
					<div style={{ display: 'grid', gridTemplateColumns: `repeat(${number_of_columns + 1}, 1fr)`, gap: '20px', padding: '20px' }}>
						<PlainText
							style={{
								background: 'transparent',
								fontSize: main_title_font_size,
								fontWeight: main_title_font_weight,
								color: main_title_color,
							}}
							value={main_title}
							placeholder={__('Main Title', 'older-people-gutenberg-blocks')}
							onClick={() => setSelectedElement('main_title')}
							onChange={(e) => {
								setAttributes({ main_title: e });
								setSelectedElement('main_title');
							}}
						/>
						{data_array.length > 0 &&
							data_array.map((data, i) => (
								<div className="quick-link-main-box" key={i}>
									<div className="quick-link-icon-component">
										{data.icon ? (
											<div className="quick-link-icon-container-child">
												<img
													src={data.icon}
													style={{
														height: 25,
														width: 25,
														marginBottom: 10,
													}}
												/>
												<MediaUpload
													onSelect={(media) => {
														const dataCopy = [...data_array];
														dataCopy[i].icon = media.url;
														setAttributes({ data_array: dataCopy });
													}}
													allowedTypes={['image']}
													value={data.icon}
													render={({ open }) => (
														<Button onClick={open} isSecondary>
															{__('Change')}
														</Button>
													)}
												/>
											</div>
										) : (
											<MediaPlaceholder
												icon="format-image"
												labels={{ title: __('Media') }}
												onSelect={(media) => {
													const dataCopy = [...data_array];
													dataCopy[i].icon = media.url;
													setAttributes({ data_array: dataCopy });
												}}
												accept="image/*"
												allowedTypes={['image']}
											/>
										)}
									</div>
									<TextControl
										label=""
										value={data.title}
										placeholder={__('Column Title', 'older-people-gutenberg-blocks')}
										onClick={() => setSelectedElement('column_title')}
										onChange={(e) => {
											const dataCopy = [...data_array];
											dataCopy[i].title = e;
											setAttributes({ data_array: dataCopy });
											setSelectedElement('column_title');
										}}
										style={{
											marginBottom: 0,
											fontSize: column_title_font_size,
											fontWeight: column_title_font_weight,
											color: column_title_color,
										}}
										type="text"
									/>
									<TextControl
										label=""
										value={data.description}
										style={{
											fontSize: description_font_size,
											fontWeight: description_font_weight,
											color: description_color,
										}}
										placeholder={__('Description', 'older-people-gutenberg-blocks')}
										onClick={() => setSelectedElement('description')}
										onChange={(e) => {
											const dataCopy = [...data_array];
											dataCopy[i].description = e;
											setAttributes({ data_array: dataCopy });
											setSelectedElement('description');
										}}
										type="text"
									/>
								</div>
							))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

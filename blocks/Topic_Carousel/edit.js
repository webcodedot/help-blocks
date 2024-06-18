import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	useBlockProps,
	RichText,
	MediaPlaceholder,
	PanelColorSettings,
	FontSizePicker,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, Button, ToolbarGroup, ToolbarButton, SelectControl } from '@wordpress/components';
import { useEffect, useState, Fragment } from 'react';
import Color_Palette from '../../components/Color_Palette';
import Range_Control from '../../components/Range_Control';

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const [selectedElement, setSelectedElement] = useState('blockSettings');

	const {
		container_width,
		mainTitle,
		mainTitleColor,
		mainTitleWeight,
		mainTitleFontSize,
		boxArray,
		boxColor,
		titleColor,
		titleWeight,
		titleFontSize,
		desColor,
		desWeight,
		desFontSize,
		buttonBGColor,
		buttonTextColor,
		buttonTextWeight,
		buttonTextFontSize,
	} = attributes;

	const fontSizes = [
		{ name: 'S', slug: 'small', size: 12 },
		{ name: 'M', slug: 'medium', size: 16 },
		{ name: 'L', slug: 'large', size: 36 },
		{ name: 'XL', slug: 'extra-large', size: 50 },
	];

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

	useEffect(() => {
		if (boxArray.length === 0) {
			setAttributes({
				boxArray: [
					{
						image: '',
						title: '',
						des: '',
						buttomText: '',
						buttonLink: '',
					},
					{
						image: '',
						title: '',
						des: '',
						buttomText: '',
						buttonLink: '',
					},
				],
			});
		}
	}, []);

	const handlePanelToggle = (panel) => {
		setSelectedElement((prev) => (prev === panel ? 'blockSettings' : panel));
	};

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={__('Block Settings', 'older-people-gutenberg-blocks')}
						icon="admin-generic"
						onClick={() => handlePanelToggle('blockSettings')}
						isPressed={selectedElement === 'blockSettings'}
					/>
					<ToolbarButton
						label={__('Main Title Settings', 'older-people-gutenberg-blocks')}
						icon="editor-textcolor"
						onClick={() => handlePanelToggle('mainTitle')}
						isPressed={selectedElement === 'mainTitle'}
					/>
					<ToolbarButton
						label={__('Title Settings', 'older-people-gutenberg-blocks')}
						icon="editor-textcolor"
						onClick={() => handlePanelToggle('titleSettings')}
						isPressed={selectedElement === 'titleSettings'}
					/>
					<ToolbarButton
						label={__('Description Settings', 'older-people-gutenberg-blocks')}
						icon="editor-textcolor"
						onClick={() => handlePanelToggle('descriptionSettings')}
						isPressed={selectedElement === 'descriptionSettings'}
					/>
					<ToolbarButton
						label={__('Button Settings', 'older-people-gutenberg-blocks')}
						icon="admin-links"
						onClick={() => handlePanelToggle('buttonSettings')}
						isPressed={selectedElement === 'buttonSettings'}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				{selectedElement === 'blockSettings' && (
					<PanelBody
						title={__('Block Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<Range_Control
							label={__('Carousal Container Width')}
							min={0}
							max={100}
							value={container_width}
							onChange={(value) => {
								setAttributes({ container_width: value });
							}}
						/>
						<PanelColorSettings
							title={__('Box Background Color', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: boxColor,
									onChange: (color) => setAttributes({ boxColor: color }),
									label: __('Box Background Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>
					</PanelBody>
				)}

				{selectedElement === 'mainTitle' && (
					<PanelBody
						title={__('Main Title Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Main Title Text Color', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: mainTitleColor,
									onChange: (color) => setAttributes({ mainTitleColor: color }),
									label: __('Main Title Text Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							value={mainTitleFontSize}
							onChange={(value) => setAttributes({ mainTitleFontSize: value })}
						/>
						<SelectControl
							label={__('Font Weight', 'older-people-gutenberg-blocks')}
							value={mainTitleWeight}
							options={fontWeights}
							onChange={(value) => setAttributes({ mainTitleWeight: value })}
						/>
					</PanelBody>
				)}

				{selectedElement === 'titleSettings' && (
					<PanelBody
						title={__('Title Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Title Text Color', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: titleColor,
									onChange: (color) => setAttributes({ titleColor: color }),
									label: __('Title Text Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							value={titleFontSize}
							onChange={(value) => setAttributes({ titleFontSize: value })}
						/>
						<SelectControl
							label={__('Font Weight', 'older-people-gutenberg-blocks')}
							value={titleWeight}
							options={fontWeights}
							onChange={(value) => setAttributes({ titleWeight: value })}
						/>
					</PanelBody>
				)}

				{selectedElement === 'descriptionSettings' && (
					<PanelBody
						title={__('Description Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Description Text Color', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: desColor,
									onChange: (color) => setAttributes({ desColor: color }),
									label: __('Description Text Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							value={desFontSize}
							onChange={(value) => setAttributes({ desFontSize: value })}
						/>
						<SelectControl
							label={__('Font Weight', 'older-people-gutenberg-blocks')}
							value={desWeight}
							options={fontWeights}
							onChange={(value) => setAttributes({ desWeight: value })}
						/>
					</PanelBody>
				)}

				{selectedElement === 'buttonSettings' && (
					<PanelBody
						title={__('Button Settings', 'older-people-gutenberg-blocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Button Color Settings', 'older-people-gutenberg-blocks')}
							initialOpen={true}
							colorSettings={[
								{
									value: buttonBGColor,
									onChange: (color) => setAttributes({ buttonBGColor: color }),
									label: __('Button Background Color', 'older-people-gutenberg-blocks'),
								},
								{
									value: buttonTextColor,
									onChange: (color) => setAttributes({ buttonTextColor: color }),
									label: __('Button Text Color', 'older-people-gutenberg-blocks'),
								},
							]}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							value={buttonTextFontSize}
							onChange={(value) => setAttributes({ buttonTextFontSize: value })}
						/>
						<SelectControl
							label={__('Font Weight', 'older-people-gutenberg-blocks')}
							value={buttonTextWeight}
							options={fontWeights}
							onChange={(value) => setAttributes({ buttonTextWeight: value })}
						/>
					</PanelBody>
				)}
			</InspectorControls>

			<div {...blockProps}>
				<RichText
					className="main-title"
					value={mainTitle}
					style={{
						color: mainTitleColor,
						fontSize: mainTitleFontSize,
						fontWeight: mainTitleWeight,
						padding: '0 20px 0 20px',
					}}
					placeholder={__('Headline', 'older-people-gutenberg-blocks')}
					onChange={(value) => {
						setAttributes({ mainTitle: value });
					}}
					onClick={() => handlePanelToggle('mainTitle')}
				/>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '33.33% 33.33% 33.33%',
						width: container_width + '%',
					}}
				>
					{boxArray.map((item, index) => (
						<div
							key={index}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
								border: '1px solid #e0e0e0',
								padding: 20,
								borderRadius: 20,
								margin: 20,
								backgroundColor: boxColor,
								height: 'fit-content',
							}}
						>
							{item.image ? (
								<div className="">
									<img
										src={item.image}
										style={{
											height: 200,
											width: '100%',
											marginBottom: 10,
											objectFit: 'cover',
											borderTopLeftRadius: 15,
											borderTopRightRadius: 15,
										}}
									/>
									<MediaUpload
										onSelect={(media) => {
											const dataCopy = [...boxArray];
											dataCopy[index].image = media.url;
											setAttributes({
												boxArray: dataCopy,
											});
										}}
										allowedTypes={['image']}
										value={item.image}
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
									style={{}}
									labels={{ title: __('Media') }}
									className=""
									onSelect={(media) => {
										const dataCopy = [...boxArray];
										dataCopy[index].image = media.url;
										setAttributes({
											boxArray: dataCopy,
										});
									}}
									accept="image/*"
									allowedTypes={['image']}
								/>
							)}
							<RichText
								className=""
								style={{
									color: titleColor,
									width: '100%',
									fontSize: titleFontSize,
									fontWeight: titleWeight,
									marginTop: 20,
									backgroundColor: 'transparent',
									textAlign: 'center',
								}}
								value={item.title}
								placeholder={__('Title', 'older-people-gutenberg-blocks')}
								onChange={(value) => {
									const dataCopy = [...boxArray];
									dataCopy[index].title = value;
									setAttributes({ boxArray: dataCopy });
								}}
								onClick={() => handlePanelToggle('titleSettings')}
							/>
							<RichText
								className=""
								style={{
									color: desColor,
									width: '100%',
									fontSize: desFontSize,
									fontWeight: desWeight,
									marginTop: 10,
									backgroundColor: 'transparent',
									textAlign: 'center',
								}}
								value={item.des}
								placeholder={__('Description', 'older-people-gutenberg-blocks')}
								onChange={(value) => {
									const dataCopy = [...boxArray];
									dataCopy[index].des = value;
									setAttributes({ boxArray: dataCopy });
								}}
								onClick={() => handlePanelToggle('descriptionSettings')}
							/>
							<div
								style={{
									padding: '10px 30px',
									borderRadius: 100,
									backgroundColor: buttonBGColor,
									marginTop: 20,
								}}
								onClick={() => handlePanelToggle('buttonSettings')}
							>
								<RichText
									className=""
									style={{
										color: buttonTextColor,
										width: '100%',
										fontSize: buttonTextFontSize,
										fontWeight: buttonTextWeight,
										backgroundColor: 'transparent',
										textAlign: 'center',
									}}
									value={item.buttomText}
									placeholder={__('Button Text', 'older-people-gutenberg-blocks')}
									onChange={(value) => {
										const dataCopy = [...boxArray];
										dataCopy[index].buttomText = value;
										setAttributes({ boxArray: dataCopy });
									}}
								/>
							</div>
							<RichText
								className=""
								style={{
									color: desColor,
									width: '100%',
									fontSize: 14,
									backgroundColor: 'transparent',
									marginTop: 20,
									textAlign: 'center',
									border: '1px solid #000000',
								}}
								value={item.buttonLink}
								placeholder={__('Button Link', 'older-people-gutenberg-blocks')}
								onChange={(value) => {
									const dataCopy = [...boxArray];
									dataCopy[index].buttonLink = value;
									setAttributes({ boxArray: dataCopy });
								}}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									width: '100%',
									marginTop: 20,
								}}
							>
								<Button
									onClick={() => {
										const dataCopy = [...boxArray];
										dataCopy[index] = {
											image: '',
											title: '',
											des: '',
											buttomText: '',
											buttonLink: '',
										};
										setAttributes({ boxArray: dataCopy });
									}}
									isSecondary
								>
									{__('Clear')}
								</Button>
								<Button
									onClick={() => {
										const array = [];
										for (let i = 0; i < boxArray.length; i++) {
											if (i !== index) {
												array.push(boxArray[i]);
											}
										}
										setAttributes({ boxArray: array });
									}}
									isSecondary
								>
									{__('Remove')}
								</Button>
							</div>
						</div>
					))}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
							border: '1px solid #e0e0e0',
							padding: 20,
							borderRadius: 10,
							margin: 20,
						}}
					>
						<span
							style={{
								fontSize: 50,
								lineHeight: '50px',
								height: 50,
								width: 50,
							}}
							onClick={() => {
								setAttributes({
									boxArray: [
										...boxArray,
										{
											image: '',
											title: '',
											des: '',
											buttomText: '',
											buttonLink: '',
										},
									],
								});
							}}
							className="dashicons dashicons-insert"
						></span>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

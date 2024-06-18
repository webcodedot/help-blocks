import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	URLInputButton,
	PanelColorSettings,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	ToolbarGroup,
	ToolbarButton,
	FontSizePicker,
	SelectControl,
} from '@wordpress/components';
import { Fragment, useEffect, useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		title = 'Diabetes as you age',
		titleColor = '#080E7C',
		titleFontSize,
		titleFontWeight,
		rightColumnTitle = "What’s on this page",
		rightColumnTitleColor,
		rightColumnTitleFontSize,
		rightColumnTitleFontWeight,
		paragraph = "You may have had diabetes for a long time and developed other health issues that impact your diabetes. Or you may be newly diagnosed and need some help to manage your diabetes.",
		paragraphColor,
		paragraphFontSize,
		paragraphFontWeight,
		links = [
			{ text: 'What is diabetes', url: '#' },
			{ text: 'Day-to-day management', url: '#' },
			{ text: 'The highs and lows of blood glucose levels', url: '#' },
			{ text: 'Physical activity', url: '#' },
			{ text: 'Medication and Insulin', url: '#' },
			{ text: 'Diabetes-related complications', url: '#' },
			{ text: 'You and your healthcare team', url: '#' },
		],
		leftColumnBgColor,
		rightColumnBgColor = '#CECDF0',
		rightColumnTextColor = '#080E7C',
		rightColumnTextSize,
		rightColumnTextWeight,
		buttonBgColor = '#080E7C',
	} = attributes;

	const [selectedElement, setSelectedElement] = useState('container');

	useEffect(() => {
		if (!links || links.length === 0) {
			setAttributes({
				links: [
					{ text: 'What is diabetes', url: '#' },
					{ text: 'Day-to-day management', url: '#' },
					{ text: 'The highs and lows of blood glucose levels', url: '#' },
					{ text: 'Physical activity', url: '#' },
					{ text: 'Medication and Insulin', url: '#' },
					{ text: 'Diabetes-related complications', url: '#' },
					{ text: 'You and your healthcare team', url: '#' },
				],
			});
		}
	}, []);

	const updateLink = (newAttributes, index) => {
		const updatedLinks = [...links];
		updatedLinks[index] = { ...updatedLinks[index], ...newAttributes };
		setAttributes({ links: updatedLinks });
	};

	const scrollToBlock = (anchorName) => {
		const block = document.getElementById(anchorName);
		if (block) {
			block.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
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
						label={__('Container Settings', 'text-domain')}
						icon="admin-generic"
						onClick={() => setSelectedElement('container')}
						isPressed={selectedElement === 'container'}
					/>
					<ToolbarButton
						label={__('Main Title Settings', 'text-domain')}
						icon="editor-textcolor"
						onClick={() => setSelectedElement('main_title')}
						isPressed={selectedElement === 'main_title'}
					/>
					<ToolbarButton
						label={__('Paragraph Settings', 'text-domain')}
						icon="editor-paragraph"
						onClick={() => setSelectedElement('paragraph')}
						isPressed={selectedElement === 'paragraph'}
					/>
					<ToolbarButton
						label={__('Right Column Title Settings', 'text-domain')}
						icon="editor-textcolor"
						onClick={() => setSelectedElement('right_column_title')}
						isPressed={selectedElement === 'right_column_title'}
					/>
					<ToolbarButton
						label={__('Right Column Text Settings', 'text-domain')}
						icon="editor-textcolor"
						onClick={() => setSelectedElement('right_column_text')}
						isPressed={selectedElement === 'right_column_text'}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				{selectedElement === 'container' && (
					<PanelBody title={__('Container Settings', 'text-domain')} initialOpen={true}>
						<PanelColorSettings
							title={__('Background Colors', 'text-domain')}
							initialOpen={true}
							colorSettings={[
								{
									value: leftColumnBgColor,
									onChange: (color) => setAttributes({ leftColumnBgColor: color }),
									label: __('Left Column Background Color', 'text-domain'),
								},
								{
									value: rightColumnBgColor,
									onChange: (color) => setAttributes({ rightColumnBgColor: color }),
									label: __('Right Column Background Color', 'text-domain'),
								},
							]}
						/>
					</PanelBody>
				)}

				{selectedElement === 'main_title' && (
					<PanelBody title={__('Main Title Settings', 'text-domain')} initialOpen={true}>
						<PanelColorSettings
							title={__('Title Color', 'text-domain')}
							initialOpen={true}
							colorSettings={[
								{
									value: titleColor,
									onChange: (color) => setAttributes({ titleColor: color }),
									label: __('Title Color', 'text-domain'),
								},
							]}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							value={titleFontSize}
							fallbackFontSize={20}
							onChange={(value) => setAttributes({ titleFontSize: value })}
							label={__('Title Font Size', 'text-domain')}
						/>
						<SelectControl
							label={__('Font Weight', 'text-domain')}
							value={titleFontWeight}
							options={fontWeights}
							onChange={(value) => setAttributes({ titleFontWeight: value })}
						/>
					</PanelBody>
				)}

				{selectedElement === 'paragraph' && (
					<PanelBody title={__('Paragraph Settings', 'text-domain')} initialOpen={true}>
						<PanelColorSettings
							title={__('Paragraph Color', 'text-domain')}
							initialOpen={true}
							colorSettings={[
								{
									value: paragraphColor,
									onChange: (color) => setAttributes({ paragraphColor: color }),
									label: __('Paragraph Color', 'text-domain'),
								},
							]}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							value={paragraphFontSize}
							fallbackFontSize={16}
							onChange={(value) => setAttributes({ paragraphFontSize: value })}
							label={__('Paragraph Font Size', 'text-domain')}
						/>
						<SelectControl
							label={__('Font Weight', 'text-domain')}
							value={paragraphFontWeight}
							options={fontWeights}
							onChange={(value) => setAttributes({ paragraphFontWeight: value })}
						/>
					</PanelBody>
				)}

				{selectedElement === 'right_column_title' && (
					<PanelBody title={__('Right Column Title Settings', 'text-domain')} initialOpen={true}>
						<PanelColorSettings
							title={__('Right Column Title Color', 'text-domain')}
							initialOpen={true}
							colorSettings={[
								{
									value: rightColumnTitleColor,
									onChange: (color) => setAttributes({ rightColumnTitleColor: color }),
									label: __('Right Column Title Color', 'text-domain'),
								},
							]}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							value={rightColumnTitleFontSize}
							fallbackFontSize={20}
							onChange={(value) => setAttributes({ rightColumnTitleFontSize: value })}
							label={__('Right Column Title Font Size', 'text-domain')}
						/>
						<SelectControl
							label={__('Font Weight', 'text-domain')}
							value={rightColumnTitleFontWeight}
							options={fontWeights}
							onChange={(value) => setAttributes({ rightColumnTitleFontWeight: value })}
						/>
					</PanelBody>
				)}

				{selectedElement === 'right_column_text' && (
					<PanelBody title={__('Right Column Text Settings', 'text-domain')} initialOpen={true}>
						<PanelColorSettings
							title={__('Right Column Text Color', 'text-domain')}
							initialOpen={true}
							colorSettings={[
								{
									value: rightColumnTextColor,
									onChange: (color) => setAttributes({ rightColumnTextColor: color }),
									label: __('Right Column Text Color', 'text-domain'),
								},
							]}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							value={rightColumnTextSize}
							fallbackFontSize={16}
							onChange={(value) => setAttributes({ rightColumnTextSize: value })}
							label={__('Right Column Text Size', 'text-domain')}
						/>
						<SelectControl
							label={__('Font Weight', 'text-domain')}
							value={rightColumnTextWeight}
							options={fontWeights}
							onChange={(value) => setAttributes({ rightColumnTextWeight: value })}
						/>
						<PanelBody title={__('Right Column Links', 'text-domain')} initialOpen={true}>
							{links.map((link, index) => (
								<Fragment key={index}>
									<TextControl
										label={__('Link Text', 'text-domain')}
										value={link.text}
										onChange={(text) => updateLink({ text }, index)}
									/>
									<div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
										<URLInputButton
											label={__('URL', 'text-domain')}
											url={link.url}
											onChange={(url) => updateLink({ url }, index)}
										/>
										<Button
											isSecondary
											onClick={() => {
												const updatedLinks = [...links];
												updatedLinks.splice(index, 1);
												setAttributes({ links: updatedLinks });
											}}
											style={{ backgroundColor: buttonBgColor, color: '#fff' }}
										>
											{__('Remove Link', 'text-domain')}
										</Button>
									</div>
								</Fragment>
							))}
							<Button
								isSecondary
								onClick={() => setAttributes({ links: [...links, { text: 'New Link', url: '#' }] })}
								style={{ backgroundColor: buttonBgColor, color: '#fff' }}
							>
								{__('Add Link', 'text-domain')}
							</Button>
						</PanelBody>
					</PanelBody>
				)}
			</InspectorControls>

			<div {...useBlockProps()} style={{ padding: '25px 0 25px 0' }}>
				<div className="inner-container" style={{ margin: '0 auto' }}>
					<div className="left-column" style={{ backgroundColor: leftColumnBgColor, float: 'left' }}>
						<RichText
							tagName="h2"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							placeholder={__('Diabetes as you age', 'text-domain')}
							style={{ color: titleColor, fontSize: `${titleFontSize}px`, fontWeight: titleFontWeight }}
							onClick={() => setSelectedElement('main_title')}
						/>
						<RichText
							tagName="p"
							value={paragraph}
							onChange={(value) => setAttributes({ paragraph: value })}
							placeholder={__('You may have had diabetes for a long time and developed other health issues that impact your diabetes. Or you may be newly diagnosed and need some help to manage your diabetes.', 'text-domain')}
							style={{
								color: paragraphColor,
								fontSize: `${paragraphFontSize}px`,
								fontWeight: paragraphFontWeight,
								width: '100%', // Ensure full width
							}}
							onClick={() => setSelectedElement('paragraph')}
						/>
						<InnerBlocks
							allowedBlocks={['core/button']}
							template={[['core/button', { className: 'custom-button-class' }]]}
						/>
					</div>
					<div className="right-column" style={{ backgroundColor: rightColumnBgColor, color: rightColumnTextColor, fontSize: `${rightColumnTextSize}px`, display: 'flow-root', fontWeight: rightColumnTextWeight }}>
						<RichText
							tagName="h3"
							value={rightColumnTitle}
							onChange={(value) => setAttributes({ rightColumnTitle: value })}
							placeholder={__('What’s on this page', 'text-domain')}
							style={{ color: rightColumnTitleColor, fontSize: `${rightColumnTitleFontSize}px`, fontWeight: rightColumnTitleFontWeight }}
							onClick={() => setSelectedElement('right_column_title')}
						/>
						{links.map((link, index) => (
							<Fragment key={index}>
								<a
									href={link.url}
									onClick={(event) => {
										event.preventDefault();
										scrollToBlock(link.url.substring(1));
									}}
									style={{
										display: 'block',
										marginBottom: '10px',
										textDecoration: 'none',
										color: rightColumnTextColor,
										fontSize: `${rightColumnTextSize}px`,
										fontWeight: rightColumnTextWeight,
									}}
									onClick={() => setSelectedElement('right_column_text')}
								>
									{link.text}
								</a>
							</Fragment>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

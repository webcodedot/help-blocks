import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		title = 'Diabetes as you age',
		titleColor,
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
		rightColumnBgColor,
		rightColumnTextColor,
		rightColumnTextSize,
		rightColumnTextWeight,
	} = attributes;

	return (
		<div {...useBlockProps.save({ className: 'page-intro-quick-links' })}>
			<div className="inner-container" style={{ width: `80%`, margin: '0 auto' }}>
				<div className="left-column" style={{ backgroundColor: leftColumnBgColor, padding: '20px', float: 'left', width: '50%', marginTop: '-10px' }}>
					<RichText.Content
						tagName="h2"
						value={title}
						style={{ color: titleColor, fontSize: titleFontSize + 'px', fontWeight: titleFontWeight }}
					/>
					<RichText.Content
						tagName="p"
						value={paragraph}
						style={{ color: paragraphColor, fontSize: paragraphFontSize + 'px', fontWeight: paragraphFontWeight, whiteSpace: 'pre-wrap' }}
					/>
					<InnerBlocks.Content />
				</div>
				<div className="right-column" style={{ backgroundColor: rightColumnBgColor, padding: '20px', color: rightColumnTextColor, float: 'right', width: '35%', fontWeight: rightColumnTextWeight }}>
					<RichText.Content
						tagName="h3"
						value={rightColumnTitle}
						style={{ color: rightColumnTitleColor, fontSize: rightColumnTitleFontSize + 'px', fontWeight: rightColumnTitleFontWeight, marginBottom: '20px' }}
					/>
					<ul className="links-container" style={{ listStyleType: 'none', paddingLeft: 0 }}>
						{links.map((link, index) => (
							<li key={index}>
								<a
									href={link.url}
									style={{
										textDecoration: 'none',
										color: rightColumnTextColor,
										fontSize: rightColumnTextSize + 'px',
										fontWeight: rightColumnTextWeight,
										marginBottom: '10px',
										display: 'block',
									}}
								>
									{link.text}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

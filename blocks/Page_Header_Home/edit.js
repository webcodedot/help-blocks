
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
import { useBlockProps,  MediaUpload, MediaPlaceholder, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, RangeControl, Button } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { bg_image_url, imageUrl, imageHeight, imageWidth, borderRadius,margin_right,margin_bottom } = attributes;

	const blockProps = useBlockProps();

	const textContentTemplate = [
		['core/heading', { level: 2, placeholder: 'Heading Text' }],
		['core/paragraph', { placeholder: 'Enter text here' }],
		['core/button', { text: 'Older people & carers', className: 'user' }],
		['core/button', { text: 'Health professionals', className: 'briefcase' }],
		['core/paragraph', { content: 'Share', className: 'share' }],
	];

	const onSelectImage = (media) => {
		setAttributes({ 
			imageUrl: media.url, 
			// Set default aspect ratio if not set
			imageHeight: imageHeight || media.height, 
			imageWidth: imageWidth || media.width
		});
	};

	
	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={__('Image Settings')} initialOpen={true}>
				<p className="custom__editor__label">
						{__(
							'Background Image',
							'older-people-gutenberg-blocks'
						)}
					</p>
					<MediaUpload
						onSelect={(media) =>
							setAttributes({ bg_image_url: media.url })
						}
						render={({ open }) => (
							<Button
								isSecondary
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
					<RangeControl
						label={__('Image Height')}
						value={imageHeight}
						onChange={(newHeight) => setAttributes({ imageHeight: newHeight })}
						min={100}
						max={1000}
					/>
					<RangeControl
						label={__('Image Width')}
						value={imageWidth}
						onChange={(newWidth) => setAttributes({ imageWidth: newWidth })}
						min={100}
						max={1000}
					/>

<p className="custom__editor__label">
						{__(
							'Margin Right (%)',
							'older-people-gutenberg-blocks'
						)}
					</p>
					<RangeControl
						label={''}
						value={margin_right}
						onChange={(e) => setAttributes({ margin_right: e })}
						min={0}
						max={100}
					/>

<p className="custom__editor__label">
						{__(
							'Margin Bottom (%)',
							'older-people-gutenberg-blocks'
						)}
					</p>
					<RangeControl
						label={''}
						value={margin_bottom}
						onChange={(e) => setAttributes({ margin_bottom: e })}
						min={0}
						max={100}
					/>

					<RangeControl
						label={__('Border Radius')}
						value={borderRadius}
						onChange={(newBorderRadius) => setAttributes({ borderRadius: newBorderRadius })}
						min={0}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="banner-wrapper" 
			     
			 >
				<div className="banner-container"
				style={{
					backgroundImage: bg_image_url
						? `url(${bg_image_url})`
						: '',
				}}
				>
					<div className="text-content">
						<InnerBlocks template={textContentTemplate} allowedBlocks={['core/paragraph', 'core/button']} />
					</div>
					<div className="image-container">
						{imageUrl ?
							<div>
								<img 
								alt='Upload a Media'			
									src={imageUrl} 
									style={{ 
										height: imageHeight + 'px', 
										width: imageWidth + 'px', 
										borderRadius: borderRadius + 'px',
										// eslint-disable-next-line camelcase
										marginRight: margin_right + '%',
										// eslint-disable-next-line camelcase
										marginBottom: margin_bottom + '%',
										objectFit:"cover" 
									}} 
								/>
								<MediaUpload
									onSelect={onSelectImage}
									allowedTypes={['image']}
									value={imageUrl}
									render={({ open }) => (
										<Button onClick={open} isSecondary>
											{__('Change image')}
										</Button>
									)}
								/>
							</div>
							:
							<MediaPlaceholder
								icon="format-image"
								labels={{ title: __('Media area') }}
								className="image-wrapper"
								onSelect={onSelectImage}
								accept="image/*"
								allowedTypes={['image']}
							/>
						}
					</div>
				</div>
			</div>
		</div>
	);
}

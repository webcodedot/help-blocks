/* eslint-disable camelcase */
import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaPlaceholder,
	PlainText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Button,
	TextControl,
} from '@wordpress/components';
const { Fragment } = wp.element;

import Color_Palette from '../../components/Color_Palette';
import Font_Control from '../../components/Font_Control';

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
		button1_text,
		button1_bg_color,
		button1_text_color,
		button2_text,
		button2_text_color,
		button1_icon,
		button2_icon,

		videoUrl,
		button2_link,
	} = attributes;

	const onSelectImage = (media) => {
		setAttributes({
			image_url: media.url,
		});
	};

	const transformVideoUrl = (url) => {
		// Transform video URL to embeddable format if necessary.
		const youtubeMatch = url.match(
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+)/
		);
		if (youtubeMatch) {
			return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
		}
		const vimeoMatch = url.match(
			/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/
		);
		if (vimeoMatch) {
			return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
		}
		return url; // Return the original URL if no transformations were applied.
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'older-people-gutenberg-blocks')}
					initialOpen={true}
				>
					<p className="custom__editor__label">
						{__(
							'Container Width (%)',
							'older-people-gutenberg-blocks'
						)}
					</p>
					<RangeControl
						label={''}
						value={container_width}
						onChange={(e) => setAttributes({ container_width: e })}
						min={0}
						max={100}
					/>
					<p className="custom__editor__lable">
						{__(
							'Background Image',
							'older-people-gutenberg-blocks-image'
						)}
					</p>
					<MediaUpload
						onSelect={(media) =>
							setAttributes({ bg_image_url: media.url })
						}
						render={({ open }) => (
							<Button
								isSecondary
								style={{ marginBottom: bg_image_url }}
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
						></img>
					)}
					{/* main title styling */}
					<Color_Palette
						label={'Main title Color'}
						value={main_title_color}
						onChange={(value) =>
							setAttributes({ main_title_color: value })
						}
					/>
					<Font_Control
						label={'Main Title Font'}
						show={['size', 'weight']}
						size={{
							min: 14,
							max: 28,
							value: main_title_font_size,
						}}
						weight={{
							value: main_title_font_weight,
						}}
						onChangeWeight={(value) => {
							setAttributes({ main_title_font_weight: value });
						}}
						onChangeSize={(value) => {
							setAttributes({ main_title_font_size: value });
						}}
					/>
					{/* main container styling  */}
					<Color_Palette
						label={'Main Container BG Color'}
						value={main_container_bg_color}
						onChange={(value) =>
							setAttributes({ main_container_bg_color: value })
						}
					/>
					{/* main container sub title styling  */}
					<Color_Palette
						label={'Sub title Color'}
						value={main_container_sub_title_color}
						onChange={(value) =>
							setAttributes({
								main_container_sub_title_color: value,
							})
						}
					/>
					<Font_Control
						label={'Sub Title Font'}
						show={['size', 'weight']}
						size={{
							min: 14,
							max: 28,
							value: sub_title_font_size,
						}}
						weight={{
							value: sub_title_font_weight,
						}}
						onChangeWeight={(value) => {
							setAttributes({ sub_title_font_weight: value });
						}}
						onChangeSize={(value) => {
							setAttributes({ sub_title_font_size: value });
						}}
					/>
					{/* text styling  */}
					<Color_Palette
						label={'Text Color'}
						value={main_container_text_color}
						onChange={(value) =>
							setAttributes({
								main_container_text_color: value,
							})
						}
					/>
					<Font_Control
						label={'Text Font'}
						show={['size', 'weight']}
						size={{
							min: 14,
							max: 28,
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
					{/* button settings  */}/
					<Color_Palette
						label={'Button1 BG Color'}
						value={button1_bg_color}
						onChange={(value) =>
							setAttributes({
								button1_bg_color: value,
							})
						}
					/>
					<Color_Palette
						label={'Button1 Text Color'}
						value={button1_text_color}
						onChange={(value) =>
							setAttributes({
								button1_text_color: value,
							})
						}
					/>
					<Color_Palette
						label={'Button2 Text Color'}
						value={button2_text_color}
						onChange={(value) =>
							setAttributes({
								button2_text_color: value,
							})
						}
					/>
					<p className="custom__editor__label">
						{__('Button 1 Icon', 'older-people-gutenberg-blocks')}
					</p>
					<MediaUpload
						onSelect={(media) =>
							setAttributes({ button1_icon: media.url })
						}
						render={({ open }) => (
							<Button
								isSecondary
								// style={{ marginBottom: button1_icon }}
								onClick={open}
							>
								Select Icon
							</Button>
						)}
					/>
					{button1_icon && (
						<img
							src={button1_icon}
							style={{ marginBottom: 20 }}
							alt="Selected Image"
						></img>
					)}
					<p className="custom__editor__label">
						{__('Button 2 Icon', 'older-people-gutenberg-blocks')}
					</p>
					<MediaUpload
						onSelect={(media) =>
							setAttributes({ button2_icon: media.url })
						}
						render={({ open }) => (
							<Button
								isSecondary
								// style={{ marginBottom: button1_icon }}
								onClick={open}
							>
								Select Icon
							</Button>
						)}
					/>
					{button2_icon && (
						<img
							src={button2_icon}
							style={{ marginBottom: 20 }}
							alt="Selected Image"
						></img>
					)}
					<TextControl
						label="Video URL (YouTube or Vimeo)"
						help="Enter the full YouTube or Vimeo video URL."
						value={videoUrl}
						onChange={(newUrl) =>
							setAttributes({
								videoUrl: transformVideoUrl(newUrl),
							})
						}
					/>
					<p className="custom__editor__label">
						{__('Button Link', 'older-people-gutenberg-blocks')}
					</p>
					<TextControl
						label=""
						value={button2_link}
						placeholder={__(
							`Button 2 Link`,
							'older-people-gutenberg-blocks'
						)}
						onChange={(e) => {
							setAttributes({
								button2_link: e,
							});
						}}
						type="link"
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<div
					style={{
						backgroundImage: bg_image_url
							? `url(${bg_image_url})`
							: '',
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
						placeholder={__(
							'Headline',
							'older-people-gutenberg-blocks'
						)}
						onChange={(e) => {
							setAttributes({ main_title: e });
						}}
					/>

					<div
						className="media-share-main-container"
						style={{
							display: 'flex',
							backgroundColor: main_container_bg_color,
							width: container_width + '%',
						}}
					>
						<div className="media-share-text-container ">
							<PlainText
								className="media-share-sub-title"
								style={{
									color: main_container_sub_title_color,
									fontSize: sub_title_font_size,
									fontWeight: sub_title_font_weight,
								}}
								value={sub_title}
								placeholder={__(
									'Sub Title',
									'older-people-gutenberg-blocks'
								)}
								onChange={(e) => {
									setAttributes({ sub_title: e });
								}}
							/>
							<PlainText
								className="media-share-text-content"
								style={{
									color: main_container_text_color,
									fontSize: text_font_size,
									fontWeight: text_font_weight,
								}}
								value={text}
								placeholder={__(
									'Please Write Text...',
									'older-people-gutenberg-blocks'
								)}
								onChange={(e) => {
									setAttributes({ text: e });
								}}
							/>
							<div className="media-share-button-container">
								<div
									className="media-share-button1"
									style={{
										backgroundColor: button1_bg_color,
									}}
								>
									{button1_icon && (
										<img
											src={button1_icon}
											alt="icon"
											style={{ height: 25 }}
										/>
									)}
									<PlainText
										className="media-share-button1-text"
										value={button1_text}
										style={{
											height: 'fit-content',
											color: button1_text_color,
										}}
										placeholder={__(
											'Button1 Text',
											'older-people-gutenberg-blocks'
										)}
										onChange={(e) => {
											setAttributes({ button1_text: e });
										}}
									></PlainText>
								</div>
								<div style={{}} className="media-share-button2">
									<PlainText
										className="media-share-button2-text"
										value={button2_text}
										style={{
											height: 'fit-content',
											color: button2_text_color,
										}}
										placeholder={__(
											'Button 2 Text',
											'older-people-gutenberg-blocks'
										)}
										onChange={(e) => {
											setAttributes({ button2_text: e });
										}}
									></PlainText>
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

						<div style={{}} className="media-share-video-container">
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
												Change Image
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
					</div>
				</div>
			</div>
		</Fragment>
	);
}
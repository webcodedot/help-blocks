import { useBlockProps } from '@wordpress/block-editor';
// import { useState } from '@wordpress/element';

export default function save({ attributes }) {
	// const [showOverlay, setShowOverlay] = useState(false);

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
		button2_link,
		videoUrl,
	} = attributes;

	return (
		<div {...useBlockProps.save()} data-video-url={videoUrl}>
			<div
				style={{
					backgroundImage: bg_image_url ? `url(${bg_image_url})` : '',
					backgroundPosition: 'center',
				}}
				className="media-share-wrapper"
			>
				<div
					className="media-share-main-title"
					style={{
						color: main_title_color,
						fontSize: main_title_font_size,
						fontWeight: main_title_font_weight,
						width: container_width + '%',
						padding: '0 20px 0 20px',
					}}
				>
					{main_title}
				</div>

				<div
					className="media-share-main-container"
					style={{
						backgroundColor: main_container_bg_color,
						width: container_width + '%',
					}}
				>
					<div className="media-share-text-container " style={{}}>
						<div
							className="media-share-sub-title"
							style={{
								color: main_container_sub_title_color,
								fontSize: sub_title_font_size,
								fontWeight: sub_title_font_weight,
							}}
						>
							{sub_title}
						</div>
						<div
							className="media-share-text-content"
							style={{
								color: main_container_text_color,
								fontSize: text_font_size + 'px',
								fontWeight: text_font_weight,
								whiteSpace: 'pre-wrap',
							}}
						>
							{text}
						</div>
						<div className="media-share-button-container">
							{/* <a
								href="#"
								className="video-popup-trigger"
								style={{
									display: 'inline-block',
									background: '#007cba',
									color: '#ffffff',
									padding: '6px 12px',
									borderRadius: '3px',
									textDecoration: 'none',
									fontWeight: 'bold',
								}}
							>
								{'buttonText'}
							</a> */}
							<div
								onClick={() => {
									// setShowOverlay((pre) => !pre);
								}}
								className="media-share-button1 video-popup-trigger"
								style={{
									backgroundColor: button1_bg_color,
									padding: '10px 30px',
									alignItems: 'center',
								}}
							>
								{button1_icon && (
									<img
										src={button1_icon}
										alt="icon"
										style={{ height: 20 }}
									/>
								)}
								<div
									className="media-share-button1-text"
									style={{
										marginLeft: button1_icon ? '10px' : 0,
										height: 'fit-content',
										color: button1_text_color,
										lineHeight: '14px',
									}}
								>
									{button1_text}
								</div>
							</div>
							<div
								style={{
									padding: '10px 30px',
									marginLeft: '10px',
									alignItems: 'center',
								}}
								className="media-share-button2"
							>
								<a
									href={button2_link}
									target="_blank"
									className="media-share-button2-text"
									style={{
										height: 'fit-content',
										color: button2_text_color,
										lineHeight: '14px',
										marginRight: button2_icon ? '10px' : 0,
									}}
								>
									{button2_text}
								</a>
								{button2_icon && (
									<img
										src={button2_icon}
										alt="icon"
										style={{ height: 20 }}
									/>
								)}
							</div>
						</div>
					</div>

					<div style={{}} className="media-share-video-container">
						{image_url ? (
							<img
								style={{ width: '100%', objectFit: 'cover' }}
								src={image_url}
							/>
						) : null}
					</div>
				</div>
			</div>
			{/* {false && (
				<div
					className="media-share-overlay-modal"
					style={{
						height: '100%',
						width: '100%',
						position: 'fixed',
						backgroundColor: 'rgba(0,0,0,0.8)',
						top: 0,
						left: 0,
						zIndex: 9999,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<span
						style={{
							color: 'white',
							position: 'absolute',
							top: 10,
							right: 10,
						}}
						class="dashicons dashicons-no-alt"
					></span>
					{image_url ? (
						<>
							<video autoPlay style={{ width: '50%' }} controls>
								<source src={image_url} type="video/mp4" />
							</video>
						</>
					) : null}
				</div>
			)} */}
		</div>
	);
}
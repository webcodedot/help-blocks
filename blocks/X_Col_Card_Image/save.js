import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

	return (
		<div
			style={{
				backgroundColor: grid_container_background_color,
				display: 'flex',
				justifyContent: 'center',
			}}
			{...useBlockProps.save()}
		>
			<div
				style={{
					width: `${container_width}%`,
				}}
				className="x-col-card-image-container"
			>
				<div
					style={{
						color: main_title_text_color,
						fontSize: main_title_font_size,
						fontWeight: main_title_font_weight,
					}}
					className="x-col-card-main-title-container"
				>
					{main_title}
				</div>
				<div><InnerBlocks.Content /></div>
				<div
					style={{
						gridTemplateColumns: `repeat(${number_of_columns}, 1fr)`,
					}}
					className="x-col-car-image-grid-container"
				>
					{data_array.map((item, index) => (
						<div
							key={index}
							style={{
								backgroundColor: main_container_background_color,
							}}
							className="x-col-card-image-main-container"
						>
							<img src={item.image} 
								style={{
									maxWidth: "100%",
									height: image_height,
									objectFit: "cover",
								}}
							/>
							<div
								style={{
									padding: '10px 20px 20px 20px',
								}}
							>
								<div className="x-col-card-image-box-title"
									style={{
										color: sub_title_text_color,
										fontSize: sub_title_font_size + 'px',
										fontWeight: sub_title_font_weight,
									}}
								>
									{item.title}
								</div>
								<div className="-col-card-image-box-description"
									style={{
										color: description_text_color,
										fontSize: description_font_size + 'px',
										fontWeight: description_font_weight,
										whiteSpace: "pre-wrap",
									}}
								> 
									{item.description}
								</div>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<a className="x-col-card-image-button"
										style={{
											backgroundColor: button_background_color,
											color: button_text_color,
											fontSize: button_text_font_size + 'px',
											fontWeight: button_text_font_weight,
											display: 'block',
											textAlign: 'center',
											padding: '10px',
											textDecoration: 'none',
										}}
										href={item.buttonLink}
									>
										{item.buttonText}
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

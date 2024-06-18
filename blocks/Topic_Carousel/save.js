import React from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
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
		container_width,
	} = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div className="topic-carousel-main">
				<button className="topic-carousel-prev topic-carousel-button" style={{ padding: '0px' }}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6"
					>
						<path
							fillRule="evenodd"
							d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				<div className="topic-carousel-container-wrapper">
					<div
						className="split-hoz-multi-main-title"
						style={{
							color: mainTitleColor,
							fontSize: mainTitleFontSize,
							fontWeight: mainTitleWeight,
							padding: '0 20px 0 20px',
						}}
					>
						{mainTitle}
					</div>
					<div className="topic-carousel-container" style={{ width: container_width + '%' }}>
						{boxArray.map((item, index) => (
							<div
								key={index}
								className="topic-carousel-box"
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
									padding: 20,
									borderRadius: 20,
									backgroundColor: boxColor,
									height: '100%',
								}}
							>
								{item.image && (
									<div className="">
										<img
											src={item.image}
											style={{
												height: 200,
												width: '100%',
												marginBottom: 10,
												objectFit: 'fill',
												borderTopLeftRadius: 15,
												borderTopRightRadius: 15,
											}}
										/>
									</div>
								)}
								<div
									className=""
									style={{
										color: titleColor,
										width: '100%',
										fontSize: titleFontSize,
										fontWeight: titleWeight,
										marginTop: 10,
										backgroundColor: 'transparent',
										textAlign: 'center',
									}}
								>
									{item.title}
								</div>
								<div
									className=""
									style={{
										color: desColor,
										width: '100%',
										fontSize: desFontSize,
										fontWeight: desWeight,
										marginTop: 5,
										backgroundColor: 'transparent',
										textAlign: 'center',
										whiteSpace: 'pre-wrap',
									}}
								>
									{item.des}
								</div>
								<a
									href={item.buttonLink}
									style={{
										padding: '10px 30px',
										borderRadius: 100,
										backgroundColor: buttonBGColor,
										marginTop: 10,
										textDecorationLine: 'none',
									}}
								>
									<div
										className=""
										style={{
											color: buttonTextColor,
											width: '100%',
											fontSize: buttonTextFontSize,
											fontWeight: buttonTextWeight,
											backgroundColor: 'transparent',
											textAlign: 'center',
										}}
									>
										{item.buttomText}
									</div>
								</a>
							</div>
						))}
					</div>
				</div>
				<button className="topic-carousel-next topic-carousel-button" style={{ padding: '0px' }}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6"
					>
						<path
							fillRule="evenodd"
							d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	useBlockProps,
	PlainText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	
} from '@wordpress/components';
import { useEffect } from 'react';
import Color_Palette from '../../components/Color_Palette';
import Font_Control from '../../components/Font_Control';
import Range_Control from '../../components/Range_Control';

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
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
	useEffect(() => {
		if (boxArray.length == 0) {
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

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'older-people-gutenberg-blocks')}
					initialOpen={true}
				>
					<Range_Control
						label={'Carousal Container Width'}
						min={0}
						max={100}
						value={container_width}
						onChange={(value) => {
							setAttributes({ container_width: value });
						}}
					/>
					<Color_Palette
						label={'Box Background Color'}
						value={boxColor}
						onChange={(value) => setAttributes({ boxColor: value })}
					/>
					<Color_Palette
						label={'Main Title Text Color'}
						value={mainTitleColor}
						onChange={(value) =>
							setAttributes({ mainTitleColor: value })
						}
					/>
					<Font_Control
						label={'Main Title Text'}
						show={['size', 'weight']}
						size={{
							min: 10,
							max: 24,
							value: mainTitleFontSize,
						}}
						weight={{
							value: mainTitleWeight,
						}}
						onChangeWeight={(value) => {
							setAttributes({ mainTitleWeight: value });
						}}
						onChangeSize={(value) => {
							setAttributes({ mainTitleFontSize: value });
						}}
					/>
					<Color_Palette
						label={'Title Text Color'}
						value={titleColor}
						onChange={(value) =>
							setAttributes({ titleColor: value })
						}
					/>
					<Font_Control
						label={'Title Text'}
						show={['size', 'weight']}
						size={{
							min: 10,
							max: 24,
							value: titleFontSize,
						}}
						weight={{
							value: titleWeight,
						}}
						onChangeWeight={(value) => {
							setAttributes({ titleWeight: value });
						}}
						onChangeSize={(value) => {
							setAttributes({ titleFontSize: value });
						}}
					/>
					<Color_Palette
						label={'Description Text Color'}
						value={desColor}
						onChange={(value) => setAttributes({ desColor: value })}
					/>
					<Font_Control
						label={'Description Text'}
						show={['size', 'weight']}
						size={{
							min: 10,
							max: 24,
							value: desFontSize,
						}}
						weight={{
							value: desWeight,
						}}
						onChangeWeight={(value) => {
							setAttributes({ desWeight: value });
						}}
						onChangeSize={(value) => {
							setAttributes({ desFontSize: value });
						}}
					/>
					<Color_Palette
						label={'Button Background Color'}
						value={buttonBGColor}
						onChange={(value) =>
							setAttributes({ buttonBGColor: value })
						}
					/>
					<Color_Palette
						label={'Button Text Color'}
						value={buttonTextColor}
						onChange={(value) =>
							setAttributes({ buttonTextColor: value })
						}
					/>
					<Font_Control
						label={'Description Text'}
						show={['size', 'weight']}
						size={{
							min: 10,
							max: 24,
							value: buttonTextFontSize,
						}}
						weight={{
							value: buttonTextWeight,
						}}
						onChangeWeight={(value) => {
							setAttributes({ buttonTextWeight: value });
						}}
						onChangeSize={(value) => {
							setAttributes({ buttonTextFontSize: value });
						}}
					/>
				</PanelBody>
			</InspectorControls>

			<PlainText
						className="main-title"
						value={mainTitle}
						style={{
							color: mainTitle,
							fontSize: mainTitleFontSize,
							fontWeight: mainTitleWeight,
							// width: container_width + '%',
								padding: '0 20px 0 20px',
						}}
						placeholder={__(
							'Headline',
							'older-people-gutenberg-blocks'
						)}
						onChange={(e) => {
							setAttributes({ mainTitle: e });
						}}
					/>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '33.33% 33.33% 33.33%',
					width: container_width + '%'
				}}
			>
				
				{boxArray.map((item, index) => {
					return (
						<div
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
							<PlainText
								className=""
								style={{
									color: titleColor,
									width: '100%',
									fontSize: titleFontSize,
									fontWeight: titleWeight,
									marginTop: 20,
									backgroundColor: 'transparent',
									textAlign: 'center',
									border: '1px solid #000000',
								}}
								value={item.title}
								placeholder={__(
									'Title',
									'older-people-gutenberg-blocks'
								)}
								onChange={(e) => {
									const dataCopy = [...boxArray];
									dataCopy[index].title = e;
									setAttributes({ boxArray: dataCopy });
								}}
							/>
							<PlainText
								className=""
								style={{
									color: desColor,
									width: '100%',
									fontSize: desFontSize,
									fontWeight: desWeight,
									marginTop: 10,
									backgroundColor: 'transparent',
									textAlign: 'center',
									border: '1px solid #000000',
								}}
								value={item.des}
								placeholder={__(
									'Description',
									'older-people-gutenberg-blocks'
								)}
								onChange={(e) => {
									const dataCopy = [...boxArray];
									dataCopy[index].des = e;
									setAttributes({ boxArray: dataCopy });
								}}
							/>
							<div
								style={{
									padding: '10px 30px',
									borderRadius: 100,
									backgroundColor: buttonBGColor,
									marginTop: 20,
								}}
							>
								<PlainText
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
									placeholder={__(
										'Button Text',
										'older-people-gutenberg-blocks'
									)}
									onChange={(e) => {
										const dataCopy = [...boxArray];
										dataCopy[index].buttomText = e;
										setAttributes({ boxArray: dataCopy });
									}}
								/>
							</div>
							<PlainText
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
								placeholder={__(
									'Button Link',
									'older-people-gutenberg-blocks'
								)}
								onChange={(e) => {
									const dataCopy = [...boxArray];
									dataCopy[index].buttonLink = e;
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
										for (
											var i = 0;
											i < boxArray.length;
											i++
										) {
											if (i == index) {
											} else {
												array.push(boxArray[i]);
											}
										}
										setAttributes({
											boxArray: array,
										});
									}}
									isSecondary
								>
									{__('Remove')}
								</Button>
							</div>
						</div>
					);
				})}
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
						class="dashicons dashicons-insert"
					></span>
				</div>
			</div>
		</div>
	);
}
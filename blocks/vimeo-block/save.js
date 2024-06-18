import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import defaultBgImage from './ig1.png'; // Importing default background image

export default function save({ attributes }) {
    const {
        container_width,
        bg_image_url,
        main_title = 'Short Video', // Default headline
        sub_title = 'What is diabetes', // Default subtitle
        text = 'Do you know what diabetes is? Or what high blood glucose levels or BGLs are?', // Default description
        button2_text = 'Click on the transcript', // Default button text
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
        button2_text_color,
        button2_icon,
        button2_link,
        videoUrl,
    } = attributes;

    const getBackgroundImageUrl = () => {
        return bg_image_url || defaultBgImage;
    };

    return (
        <div {...useBlockProps.save()} data-video-url={videoUrl}>
            <div
                style={{
                    backgroundImage: `url(${getBackgroundImageUrl()})`,
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
                    <div className="media-share-text-container">
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
                                fontSize: text_font_size,
                                fontWeight: text_font_weight,
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {text}
                        </div>
                        <div className="media-share-button-container">
                            <div
                                style={{
                                    padding: '10px 30px',
                                    marginLeft: '-30px',
                                    alignItems: 'center',
                                }}
                                className="media-share-button2"
                            >
                                <a
                                    href={button2_link}
                                    target="_blank"
                                    rel="noopener"
                                    className="media-share-button2-text"
                                    style={{
                                        height: 'fit-content',
                                        color: button2_text_color,
                                        lineHeight: '14px',
                                        fontSize: '17px',
                                        marginRight: button2_icon ? '10px' : 0,
                                    }}
                                >
                                    {button2_text}
                                </a>
                                {button2_icon && (
                                    <img
                                        src={button2_icon}
                                        alt="icon"
                                        style={{ height: 30 }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="media-share-video-container">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </div>
    );
}

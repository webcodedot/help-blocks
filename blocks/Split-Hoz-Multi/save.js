import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import defaultBgImage from '../../blocks/Split-Hoz-Multi/ig2.png'; // Importing default background image

export default function save({ attributes }) {
    const {
        data_array = [
            { title: '', des: '' },
            { title: '', des: '' },
            { title: '', des: '' },
        ], // Set default data array to have 3 boxes
        container_width = 100, // Set default container width to 100%
        bg_image_url,
        main_title,
        main_title_color,
        main_title_font_size,
        main_title_font_weight,
        box_bg_color,
        box_title_color,
        box_title_font_size,
        box_title_font_weight,
        box_description_color,
        box_description_font_size,
        box_description_font_weight,
    } = attributes;

    const defaultMainTitle = 'Things to remember';
    const defaultText = 'It is important to take your prescribed medication. If you are concerned with the side effects, discuss them with your doctor or pharmacist.';

    const bgImageStyle = {
        backgroundImage: bg_image_url ? `url(${bg_image_url})` : `url(${defaultBgImage})`,
        backgroundPosition: 'center top',
        backgroundRepeat: data_array.length > 3 ? 'repeat' : 'no-repeat',
    };

    return (
        <div {...useBlockProps.save({ className: 'full-width-block' })}>
            <div
                style={{
                    ...bgImageStyle,
                    width: '100%',
                    boxSizing: 'border-box',
                }}
                className="split-hoz-multi-wrapper"
            >
                <RichText.Content
                    tagName="h2"
                    className="split-hoz-multi-main-title"
                    value={main_title || defaultMainTitle}
                    style={{
                        color: main_title_color,
                        fontSize: main_title_font_size,
                        fontWeight: main_title_font_weight,
                        width: container_width + '%',
                        padding: '0 20px 0 20px',
                    }}
                />
                <div
                    className="split-hoz-main-container"
                    style={{
                        padding: '0px 20px 0 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxSizing: 'border-box',
                    }}
                >
                    {data_array.map((item, index) => (
                        <div
                            key={index}
                            className="split-hoz-multi-item-container"
                            style={{
                                background: box_bg_color,
                                alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                                margin: '20px 0',
                                padding: '20px',
                                borderRadius: 10,
                                boxSizing: 'border-box',
                            }}
                        >
                            {item.title && (
                                <RichText.Content
                                    tagName="h3"
                                    className="split-hoz-multi-box-main-title"
                                    value={item.title}
                                    style={{
                                        color: box_title_color,
                                        fontSize: box_title_font_size,
                                        fontWeight: box_title_font_weight,
                                    }}
                                />
                            )}
                            <RichText.Content
                                tagName="p"
                                className="split-hoz-multi-box-main-des"
                                value={item.des || defaultText}
                                style={{
                                    color: box_description_color,
                                    fontSize: box_description_font_size,
                                    fontWeight: box_description_font_weight,
                                    whiteSpace: "pre-wrap",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

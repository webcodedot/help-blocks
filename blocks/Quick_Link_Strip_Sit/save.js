import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        number_of_columns,
        background_color,
        main_title,
        main_title_color,
        main_title_font_size,
        main_title_font_weight,
        data_array,
        column_title_color,
        description_color,
        column_title_font_size,
        description_font_size,
        column_title_font_weight,
        description_font_weight,
    } = attributes;

    return (
        <div {...useBlockProps.save()}>
            <div
                className="quick-link-strip-grid-container"
                style={{
                    background: background_color,
                    gridTemplateColumns: `repeat(${number_of_columns + 1}, 1fr)`,
                }}
            >
                <RichText.Content
                    tagName="div"
                    style={{
                        minWidth: '15%',
                        color: main_title_color,
                        fontSize: main_title_font_size,
                        fontWeight: main_title_font_weight,
                        wordBreak: 'break-all',
                        whiteSpace: "pre-wrap"
                    }}
                    className="quick-link-strip-grid-main-item"
                    value={main_title}
                />
                {data_array.map((data, index) => {
                    return (
                        <a
                            href={data.link}
                            className="quick-link-strip-grid-item"
                            key={index}
                        >
                            <img
                                src={data.icon ?? ''}
                                className="quick-link-strip-icon-style"
                            ></img>
                            <RichText.Content
                                tagName="div"
                                value={data.title}
                                style={{
                                    color: column_title_color,
                                    fontSize: column_title_font_size,
                                    fontWeight: column_title_font_weight,
                                }}
                                className="quick-link-strip-title-child"
                            />
                            <RichText.Content
                                tagName="div"
                                value={data.description}
                                style={{
                                    color: description_color,
                                    fontSize: description_font_size,
                                    fontWeight: description_font_weight,
                                }}
                                className="quick-link-strip-description"
                            />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

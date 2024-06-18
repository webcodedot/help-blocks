import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const Save = (props) => {
    const { attributes } = props;
    const { accordions, activeAccordion, titleColor, titleFontSize, titleFontWeight, mediaTitleColor, mediaTitleFontSize, mediaTitleFontWeight, mediaDescriptionFontSize, mediaDescriptionFontWeight, mediaDescriptionColor, rightColumnBgColor } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div className="accordion-columns">
                <div className="accordion-wrapper">
                    {accordions.map((accordion, index) => (
                        <div key={index} className={`accordion-item ${activeAccordion === index ? 'active' : ''}`} data-index={index}>
                            <div className="accordion-title" data-index={index} style={{ color: titleColor, fontSize: titleFontSize, fontWeight: titleFontWeight }}>
                                <RichText.Content tagName="h3" value={accordion.title} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="right-wrapper" style={{ backgroundColor: rightColumnBgColor }}>
                    {accordions.map((accordion, index) => (
                        <div key={index} className={`media-columns ${index === activeAccordion ? 'active' : ''}`} data-index={index}>
                            {accordion.media.map((media, mediaIndex) => (
                                <div key={mediaIndex} className="media-item">
                                    <div className="media-left">
                                        {media.type === 'video' ? (
                                            <iframe
                                                src={`https://player.vimeo.com/video/${media.url.split('/').pop()}`}
                                                width="100%"
                                                height="180"
                                                frameBorder="0"
                                                allow="autoplay; fullscreen; picture-in-picture"
                                                allowFullScreen
                                                title={`Vimeo Video ${mediaIndex + 1}`}
                                            ></iframe>
                                        ) : (
                                            <a href={media.url} download>
                                                <svg
                                                    width="190"
                                                    height="180"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke="#dd2e2e"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                                    />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                    <div className="media-right">
                                        <InnerBlocks.Content />
                                        <RichText.Content
                                            tagName="p"
                                            value={media.description}
                                            style={{ fontSize: mediaDescriptionFontSize, color: mediaDescriptionColor, fontWeight: mediaDescriptionFontWeight }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Save;

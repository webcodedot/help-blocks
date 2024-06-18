
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { bg_image_url,imageUrl, imageHeight, imageWidth, borderRadius,margin_bottom,margin_right } = attributes;
    const blockProps = useBlockProps.save();
    
    // Manually extract the className from blockProps
    const className = blockProps.className;

    return (
        <div className={className}> {/* Assign className directly */}
            <div className="banner-wrapper">
                <div className="banner-container"
                    style={{
                        backgroundImage: bg_image_url ? `url(${bg_image_url})` : '',
                    }}
                >
                    <div className="text-content">
                        <InnerBlocks.Content />
                    </div>
                    <div className="image-container">
                        { imageUrl && (
                            <img 
                                src={ imageUrl } 
                                style={{ 
                                    height: imageHeight ? `${imageHeight}px` : 'auto', 
                                    width:imageWidth ? `${imageWidth}px` : 'auto',  
                                    borderRadius: borderRadius ? `${borderRadius}px` : '0',
                                    marginRight: margin_right + '%',
                                    marginBottom: margin_bottom + '%',
                                    objectFit:"cover"
                                 }} 
                                alt="" 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// imageWidth ? `${imageWidth}px` : 'auto',

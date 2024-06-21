import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    useBlockProps,
    MediaUpload,
    RichText,
    FontSizePicker,
    PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, Button, SelectControl } from '@wordpress/components';
import defaultBgImage from '../../blocks/Split-Hoz-Multi/ig2.png'; // Importing default background image

import './editor.scss';

const { Fragment } = wp.element;

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: 'full-width-block', // Added class for full width
    });
    const [selectedElement, setSelectedElement] = useState(null);

    const {
        data_array,
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

    useEffect(() => {
        if (data_array.length === 0) {
            setAttributes({
                data_array: [
                    { title: '', des: '' },
                    { title: '', des: '' },
                    { title: '', des: '' },
                ],
            });
        }
    }, []);

    const fontSizes = [
        { name: 'Small', slug: 'small', size: 12 },
        { name: 'Normal', slug: 'normal', size: 16 },
        { name: 'Large', slug: 'large', size: 36 },
        { name: 'Huge', slug: 'huge', size: 50 },
    ];

    const handleMainTitleClick = () => {
        setSelectedElement('mainTitle');
    };

    const handleBoxTitleClick = () => {
        setSelectedElement('boxTitle');
    };

    const handleBoxDescriptionClick = () => {
        setSelectedElement('boxDescription');
    };

    const handleReturnToBlockSettingsClick = () => {
        setSelectedElement(null);
    };

    const removeBackgroundImage = () => {
        setAttributes({ bg_image_url: null });
    };

    const removeBox = (index) => {
        const newDataArray = [...data_array];
        newDataArray.splice(index, 1);
        setAttributes({ data_array: newDataArray });
    };

    return (
        <Fragment>
            <InspectorControls>
                {selectedElement !== 'mainTitle' && selectedElement !== 'boxTitle' && selectedElement !== 'boxDescription' && (
                    <>
                        <PanelBody
                            title={__('Block Settings', 'older-people-gutenberg-blocks')}
                            initialOpen={true}
                        >
                            <p className="custom__editor__label">
                                {__('Background Image', 'older-people-gutenberg-blocks-image')}
                            </p>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ bg_image_url: media.url })}
                                render={({ open }) => (
                                    <Button
                                        isSecondary
                                        style={{ marginBottom: '10px' }}
                                        onClick={open}
                                    >
                                        {__('Select Image', 'older-people-gutenberg-blocks')}
                                    </Button>
                                )}
                            />
                            {(bg_image_url || bg_image_url === null) ? (
                                <>
                                    <img
                                        src={bg_image_url ? bg_image_url : defaultBgImage}
                                        style={{ marginBottom: 20 }}
                                        alt={__('Selected Image', 'older-people-gutenberg-blocks')}
                                    />
                                    <Button
                                        isSecondary
                                        style={{ marginBottom: '10px' }}
                                        onClick={removeBackgroundImage}
                                    >
                                        {__('Remove Image', 'older-people-gutenberg-blocks')}
                                    </Button>
                                </>
                            ) : (
                                <img
                                    src={defaultBgImage}
                                    style={{ marginBottom: 20 }}
                                    alt="Default Background"
                                />
                            )}
                        </PanelBody>
                        <PanelBody
                            title={__('Box Background Settings', 'older-people-gutenberg-blocks')}
                            initialOpen={true}
                        >
                            <PanelColorSettings
                                title={__('Color Settings', 'older-people-gutenberg-blocks')}
                                initialOpen={true}
                                colorSettings={[
                                    {
                                        value: box_bg_color,
                                        onChange: (color) => setAttributes({ box_bg_color: color }),
                                        label: __('Box Background Color', 'older-people-gutenberg-blocks'),
                                    },
                                ]}
                            />
                        </PanelBody>
                    </>
                )}
                {selectedElement === 'mainTitle' && (
                    <PanelBody
                        title={__('Main Title Settings', 'older-people-gutenberg-blocks')}
                        initialOpen={true}
                    >
                        <Button
                            isSecondary
                            onClick={handleReturnToBlockSettingsClick}
                            style={{ marginBottom: '10px' }}
                        >
                            {__('Return to Block Settings', 'older-people-gutenberg-blocks')}
                        </Button>
                        <PanelColorSettings
                            title={__('Color Settings', 'older-people-gutenberg-blocks')}
                            initialOpen={true}
                            colorSettings={[
                                {
                                    value: main_title_color,
                                    onChange: (color) => setAttributes({ main_title_color: color }),
                                    label: __('Headline Color', 'older-people-gutenberg-blocks'),
                                },
                            ]}
                        />
                        <FontSizePicker
                            value={main_title_font_size}
                            onChange={(size) => setAttributes({ main_title_font_size: size })}
                            fontSizes={fontSizes}
                        />
                        <SelectControl
                            label={__('Font Weight', 'older-people-gutenberg-blocks')}
                            value={main_title_font_weight}
                            options={[
                                { label: 'Normal', value: 'normal' },
                                { label: 'Bold', value: 'bold' },
                            ]}
                            onChange={(value) => setAttributes({ main_title_font_weight: value })}
                        />
                    </PanelBody>
                )}
                {selectedElement === 'boxTitle' && (
                    <PanelBody
                        title={__('Box Title Settings', 'older-people-gutenberg-blocks')}
                        initialOpen={true}
                    >
                        <Button
                            isSecondary
                            onClick={handleReturnToBlockSettingsClick}
                            style={{ marginBottom: '10px' }}
                        >
                            {__('Return to Block Settings', 'older-people-gutenberg-blocks')}
                        </Button>
                        <PanelColorSettings
                            title={__('Color Settings', 'older-people-gutenberg-blocks')}
                            initialOpen={true}
                            colorSettings={[
                                {
                                    value: box_title_color,
                                    onChange: (color) => setAttributes({ box_title_color: color }),
                                    label: __('Box Title Color', 'older-people-gutenberg-blocks'),
                                },
                            ]}
                        />
                        <FontSizePicker
                            value={box_title_font_size}
                            onChange={(size) => setAttributes({ box_title_font_size: size })}
                            fontSizes={fontSizes}
                        />
                        <SelectControl
                            label={__('Font Weight', 'older-people-gutenberg-blocks')}
                            value={box_title_font_weight}
                            options={[
                                { label: 'Normal', value: 'normal' },
                                { label: 'Bold', value: 'bold' },
                            ]}
                            onChange={(value) => setAttributes({ box_title_font_weight: value })}
                        />
                    </PanelBody>
                )}
                {selectedElement === 'boxDescription' && (
                    <PanelBody
                        title={__('Box Description Settings', 'older-people-gutenberg-blocks')}
                        initialOpen={true}
                    >
                        <Button
                            isSecondary
                            onClick={handleReturnToBlockSettingsClick}
                            style={{ marginBottom: '10px' }}
                        >
                            {__('Return to Block Settings', 'older-people-gutenberg-blocks')}
                        </Button>
                        <PanelColorSettings
                            title={__('Color Settings', 'older-people-gutenberg-blocks')}
                            initialOpen={true}
                            colorSettings={[
                                {
                                    value: box_description_color,
                                    onChange: (color) => setAttributes({ box_description_color: color }),
                                    label: __('Box Description Color', 'older-people-gutenberg-blocks'),
                                },
                            ]}
                        />
                        <FontSizePicker
                            value={box_description_font_size}
                            onChange={(size) => setAttributes({ box_description_font_size: size })}
                            fontSizes={fontSizes}
                        />
                        <SelectControl
                            label={__('Font Weight', 'older-people-gutenberg-blocks')}
                            value={box_description_font_weight}
                            options={[
                                { label: 'Normal', value: 'normal' },
                                { label: 'Bold', value: 'bold' },
                            ]}
                            onChange={(value) => setAttributes({ box_description_font_weight: value })}
                        />
                    </PanelBody>
                )}
            </InspectorControls>
            <div {...blockProps}>
                <div
                    style={{
                        backgroundImage: bg_image_url === null ? '' : `url(${bg_image_url ? bg_image_url : defaultBgImage})`,
                        backgroundPosition: 'center top', // Adjust position to start from the top
                        backgroundRepeat: 'repeat',
                    }}
                    className="split-hoz-multi-wrapper"
                >
                    <RichText
                        className="split-hoz-multi-main-title"
                        tagName="h2"
                        value={main_title || __('Things to remember', 'older-people-gutenberg-blocks')}
                        style={{
                            color: main_title_color,
                            fontSize: main_title_font_size,
                            fontWeight: main_title_font_weight,
                            width: container_width + '%',
                            padding: '0 20px 0 20px',
                        }}
                        placeholder={__('Things to remember', 'older-people-gutenberg-blocks')}
                        onChange={(value) => setAttributes({ main_title: value })}
                        onClick={handleMainTitleClick}
                    />
                    <div className="split-hoz-main-container"
                        style={{
                            padding: '0px 20px 0 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative', // Ensure this container is positioned
                        }}
                    >
                        {data_array.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    width: '60%',
                                    background: box_bg_color,
                                    alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                                    margin: '20px 0',
                                    padding: '20px',
                                    borderRadius: 10,
                                    position: 'relative',
                                }}
                            >
                                <Button
                                    isDestructive
                                    className="remove-box-button"
                                    onClick={() => removeBox(index)}
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                    }}
                                >
                                    &times;
                                </Button>
                                <RichText
                                    className="split-hoz-multi-box-main-title"
                                    tagName="h3"
                                    value={item.title || __('Enter title here', 'older-people-gutenberg-blocks')}
                                    style={{
                                        color: box_title_color,
                                        fontSize: box_title_font_size,
                                        fontWeight: box_title_font_weight,
                                    }}
                                    placeholder={__('Enter title here', 'older-people-gutenberg-blocks')}
                                    onChange={(value) => {
                                        const newDataArray = [...data_array];
                                        newDataArray[index] = {
                                            ...newDataArray[index],
                                            title: value,
                                        };
                                        setAttributes({ data_array: newDataArray });
                                    }}
                                    onClick={handleBoxTitleClick}
                                />
                                <RichText
                                    className="split-hoz-multi-box-main-des"
                                    tagName="p"
                                    value={item.des || __('It is important to take your prescribed medication. If you are concerned with the side effects, discuss them with your doctor or pharmacist.', 'older-people-gutenberg-blocks')}
                                    style={{
                                        color: box_description_color,
                                        fontSize: box_description_font_size,
                                        fontWeight: box_description_font_weight,
                                    }}
                                    placeholder={__('It is important to take your prescribed medication. If you are concerned with the side effects, discuss them with your doctor or pharmacist.', 'older-people-gutenberg-blocks')}
                                    onChange={(value) => {
                                        const newDataArray = [...data_array];
                                        newDataArray[index] = {
                                            ...newDataArray[index],
                                            des: value,
                                        };
                                        setAttributes({ data_array: newDataArray });
                                    }}
                                    onClick={handleBoxDescriptionClick}
                                />
                            </div>
                        ))}
                    </div>
                    <Button
                        isSecondary
                        onClick={() => setAttributes({ data_array: [...data_array, { title: '', des: '' }] })}
                    >
                        Add Box +
                    </Button>
                </div>
            </div>
        </Fragment>
    );
}

/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaUpload,
    MediaUploadCheck,
    InnerBlocks,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ColorPicker,
    Button,
    SelectControl,
    __experimentalGrid as Grid,
} from '@wordpress/components';
const { Fragment } = wp.element;

// editor style
import './editor.scss';

import Range_Control from '../../components/Range_Control';
import Color_Palette from '../../components/Color_Palette';
import Font_Control from '../../components/Font_Control';

export default function Edit({ attributes, setAttributes }) {
    const {
        accordions,
        activeAccordion,
        titleColor,
        titleFontSize,
        titleFontWeight,
        mediaTitleColor,
        mediaTitleFontSize,
        mediaTitleFontWeight,
        mediaDescriptionFontSize,
        mediaDescriptionFontWeight,
        mediaDescriptionColor,
        rightColumnBgColor,
    } = attributes;
    const [activeIndex, setActiveIndex] = useState(activeAccordion);

    useEffect(() => {
        if (accordions.length === 0) {
            addAccordion();
        }
    }, []);

    const updateAccordion = (index, newAccordion) => {
        const newAccordions = [...accordions];
        newAccordions[index] = newAccordion;
        setAttributes({ accordions: newAccordions });
    };

    const onChangeAccordionTitle = (index, newTitle) => {
        const newAccordions = [...accordions];
        newAccordions[index].title = newTitle;
        setAttributes({ accordions: newAccordions });
    };

    const onChangeAccordionContent = (index, newContent) => {
        const newAccordions = [...accordions];
        newAccordions[index].content = newContent;
        setAttributes({ accordions: newAccordions });
    };

    const onChangeMediaType = (accordionIndex, mediaIndex, newType) => {
        const newAccordion = { ...accordions[accordionIndex] };
        newAccordion.media[mediaIndex] = { ...newAccordion.media[mediaIndex], type: newType, url: '' };
        updateAccordion(accordionIndex, newAccordion);
    };

    const onChangeMediaUrl = (accordionIndex, mediaIndex, newUrl) => {
        const newAccordion = { ...accordions[accordionIndex] };
        newAccordion.media[mediaIndex] = { ...newAccordion.media[mediaIndex], url: newUrl };
        updateAccordion(accordionIndex, newAccordion);
    };

    const addAccordion = () => {
        const newAccordions = [...accordions, { title: `Accordion ${accordions.length + 1}`, media: [], content: '' }];
        setAttributes({ accordions: newAccordions });
    };

    const removeAccordion = (index) => {
        const newAccordions = accordions.filter((_, i) => i !== index);
        setAttributes({ accordions: newAccordions });
        if (activeIndex >= newAccordions.length) {
            setActiveIndex(newAccordions.length - 1);
        }
    };

    const addMedia = (index) => {
        const newAccordion = { ...accordions[index] };
        newAccordion.media.push({ type: 'video', url: '', title: '', description: '' });
        updateAccordion(index, newAccordion);
    };

    const removeMedia = (accordionIndex, mediaIndex) => {
        const newAccordion = { ...accordions[accordionIndex] };
        newAccordion.media = newAccordion.media.filter((_, i) => i !== mediaIndex);
        updateAccordion(accordionIndex, newAccordion);
    };

    const onChangeTitleColor = (newColor) => {
        setAttributes({ titleColor: newColor });
    };

    const onChangeTitleFontSize = (newFontSize) => {
        setAttributes({ titleFontSize: newFontSize });
    };

    const onChangeTitleFontWeight = (newWeight) => {
        setAttributes({ titleFontWeight: newWeight });
    };

    const onChangeMediaDescriptionFontSize = (newFontSize) => {
        setAttributes({ mediaDescriptionFontSize: newFontSize });
    };

    const onChangeMediaDescriptionFontWeight = (newWeight) => {
        setAttributes({ mediaDescriptionFontWeight: newWeight });
    };

    const onChangeMediaDescriptionColor = (newColor) => {
        setAttributes({ mediaDescriptionColor: newColor });
    };

    const onChangeRightColumnBgColor = (newColor) => {
        setAttributes({ rightColumnBgColor: newColor });
    };

    const mediaTitleTemplate = [
        ['core/heading', { placeholder: 'Media Title' }]
    ];

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Accordion Title Settings', 'your-text-domain')}>
                    <TextControl
                        label={__('Font Size', 'your-text-domain')}
                        value={titleFontSize}
                        onChange={onChangeTitleFontSize}
                    />
                    <SelectControl
                        label={__('Font Weight', 'your-text-domain')}
                        value={titleFontWeight}
                        options={[
                            { label: '200', value: '200' },
                            { label: '300', value: '300' },
                            { label: '400', value: '400' },
                            { label: '600', value: '600' },
                            { label: '800', value: '800' },
                        ]}
                        onChange={onChangeTitleFontWeight}
                    />
                    <ColorPicker
                        label={__('Title Color', 'your-text-domain')}
                        color={titleColor}
                        onChange={onChangeTitleColor}
                    />
                </PanelBody>
                
                <PanelBody title={__('Media Description Settings', 'your-text-domain')}>
                    <TextControl
                        label={__('Font Size', 'your-text-domain')}
                        value={mediaDescriptionFontSize}
                        onChange={onChangeMediaDescriptionFontSize}
                    />
                    <SelectControl
                        label={__('Font Weight', 'your-text-domain')}
                        value={mediaDescriptionFontWeight}
                        options={[
                            { label: '200', value: '200' },
                            { label: '300', value: '300' },
                            { label: '400', value: '400' },
                            { label: '600', value: '600' },
                            { label: '800', value: '800' },
                        ]}
                        onChange={onChangeMediaDescriptionFontWeight}
                    />
                    <ColorPicker
                        label={__('Description Color', 'your-text-domain')}
                        color={mediaDescriptionColor}
                        onChange={onChangeMediaDescriptionColor}
                    />
                </PanelBody>
                <PanelBody title={__('Right Column Background Color', 'your-text-domain')}>
                    <ColorPicker
                        label={__('Background Color', 'your-text-domain')}
                        color={rightColumnBgColor}
                        onChange={onChangeRightColumnBgColor}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                <div className="accordion-columns">
                    <div className="accordion-wrapper">
                        {accordions.map((accordion, index) => (
                            <div
                                key={index}
                                className={`accordion-title ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => setActiveIndex(index)}
                                style={{ color: titleColor, fontSize: titleFontSize, fontWeight: titleFontWeight }}
                            >
                                <RichText
                                    tagName="h3"
                                    value={accordion.title}
                                    onChange={(newTitle) => onChangeAccordionTitle(index, newTitle)}
                                    placeholder={__('Accordion Title', 'your-text-domain')}
                                />
                                <Button isDestructive onClick={() => removeAccordion(index)}>
                                    {__('Remove Accordion', 'your-text-domain')}
                                </Button>
                            </div>
                        ))}
                        <Button isSecondary onClick={addAccordion}>
                            {__('Add Accordion', 'your-text-domain')}
                        </Button>
                    </div>
                    <div className="right-wrapper" style={{ backgroundColor: rightColumnBgColor }}>
                        {accordions[activeIndex] && (
                            <div className="media-columns active">
                                {accordions[activeIndex].media.map((media, mediaIndex) => (
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
                                            <InnerBlocks
                                                template={mediaTitleTemplate}
                                                allowedBlocks={['core/heading']}
                                                templateLock={false}
                                            />
                                            <TextControl
                                                label={__('Description for Media', 'your-text-domain')}
                                                value={media.description}
                                                onChange={(newDescription) => onChangeMediaDescription(activeIndex, mediaIndex, newDescription)}
                                                style={{ fontSize: mediaDescriptionFontSize, color: mediaDescriptionColor, fontWeight: mediaDescriptionFontWeight }}
                                            />
                                        </div>
                                        <div className="media-controls">
                                            <SelectControl
                                                label={__('Media Type', 'your-text-domain')}
                                                value={media.type}
                                                options={[
                                                    { label: 'Vimeo Video', value: 'video' },
                                                    { label: 'PDF', value: 'pdf' },
                                                ]}
                                                onChange={(newType) => onChangeMediaType(activeIndex, mediaIndex, newType)}
                                            />
                                            {media.type === 'video' ? (
                                                <TextControl
                                                    label={__('Vimeo URL', 'your-text-domain')}
                                                    value={media.url}
                                                    onChange={(newUrl) => onChangeMediaUrl(activeIndex, mediaIndex, newUrl)}
                                                />
                                            ) : (
                                                <MediaUploadCheck>
                                                    <MediaUpload
                                                        onSelect={(media) => onChangeMediaUrl(activeIndex, mediaIndex, media.url)}
                                                        allowedTypes={['application/pdf']}
                                                        render={({ open }) => (
                                                            <Button onClick={open} isPrimary>
                                                                {media.url ? __('Replace PDF', 'your-text-domain') : __('Upload PDF', 'your-text-domain')}
                                                            </Button>
                                                        )}
                                                    />
                                                </MediaUploadCheck>
                                            )}
                                            <Button isDestructive onClick={() => removeMedia(activeIndex, mediaIndex)}>
                                                {__('Remove Media', 'your-text-domain')}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button isSecondary onClick={() => addMedia(activeIndex)}>
                                    {__('Add Media', 'your-text-domain')}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

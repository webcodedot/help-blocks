/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    attributes: {
        imageUrl: {
            type: 'string',
        },
        imageHeight: {
            type: 'number',
            default: 300, // Default height for the image
        },
        imageWidth: {
            type: 'number',
            default: 300, // Default width for the image
        },
        borderRadius: {
            type: 'number',
            default: 0, // Default border radius for the image
        },
        // ... include other attributes here if you have any
    },
    edit: Edit,
    save,
});
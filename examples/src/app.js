import React from 'react';
import { render } from 'react-dom';
// import Lightbox from 'react-images-look';
import { Presets, LookRoot } from 'react-look';
import Gallery from './components/Gallery';

const config = Presets['react-dom'];

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const IMAGE_NAMES = ['cat', 'cats', 'chameleon', 'dog', 'ducks', 'goat', 'ostrich', 'pigeon', 'pigs', 'seagulls', 'wasp', 'yawn'];
const IMAGE_MAP = IMAGE_NAMES.map(img => ({
	src: `./images/800-${img}.jpg`,
	thumbnail: `./images/thumbnail-${img}.jpg`,
	srcset: [
		`./images/1024-${img}.jpg 1024w`,
		`./images/800-${img}.jpg 800w`,
		`./images/500-${img}.jpg 500w`,
		`./images/320-${img}.jpg 320w`,
	],
	caption: capitalizeFirstLetter(img)
}));
const IMAGES_PRELOAD = IMAGE_MAP.map(img => {
	return <img key={img.caption} src={`./images/1024-${img}.jpg`} />;
});

render (
	<LookRoot config={config}>
		<div>
			<p style={{ marginBottom: 40 }}>Use your keyboard to navigate <kbd>left</kbd> <kbd>right</kbd> <kbd>esc</kbd> &mdash; Also, try resizing your browser window.</p>
			<Gallery images={IMAGE_MAP} />
			<p>Images courtesy of <a href="http://gratisography.com/" target="_blank">Gratisography</a></p>
			<div style={{ display: 'none' }}>{IMAGES_PRELOAD}</div>
		</div>
	</LookRoot>,
	document.getElementById('example')
);

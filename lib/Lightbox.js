'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// import { create } from 'jss';
// import reactJss from 'react-jss';
// import camelCase from 'jss-camel-case';
// import px from 'jss-px';
// import nested from 'jss-nested';
// import vendorPrefixer from 'jss-vendor-prefixer';

var _reactSwipeable = require('react-swipeable');

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

// export let jss = create();
// export let useSheet = reactJss(jss);
// jss.use(camelCase());
// jss.use(nested());
// jss.use(px());
// jss.use(vendorPrefixer());

var _reactLook = require('react-look');

var _reactLook2 = _interopRequireDefault(_reactLook);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _stylesDefault = require('./styles/default');

var _stylesDefault2 = _interopRequireDefault(_stylesDefault);

var c = _reactLook.StyleSheet.combineStyles;

var Lightbox = (function (_Component) {
	_inherits(Lightbox, _Component);

	_createClass(Lightbox, null, [{
		key: 'theme',
		value: function theme(themeStyles) {
			var extStyles = _extends({}, _stylesDefault2['default']);
			for (var key in extStyles) {
				if (key in themeStyles) {
					extStyles[key] = _extends({}, _stylesDefault2['default'][key], themeStyles[key]);
				}
			}
			return extStyles;
		}
	}]);

	function Lightbox() {
		_classCallCheck(this, Lightbox);

		_get(Object.getPrototypeOf(Lightbox.prototype), 'constructor', this).call(this);

		this.close = this.close.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrev = this.gotoPrev.bind(this);
		this.handleImageClick = this.handleImageClick.bind(this);
		this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
		this.handleResize = this.handleResize.bind(this);

		this.state = {};
	}

	_createClass(Lightbox, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.isOpen && nextProps.enableKeyboardInput) {
				if (_utils2['default'].canUseDOM) window.addEventListener('keydown', this.handleKeyboardInput);
				if (_utils2['default'].canUseDOM) window.addEventListener('resize', this.handleResize);
				this.handleResize();
			} else {
				if (_utils2['default'].canUseDOM) window.removeEventListener('keydown', this.handleKeyboardInput);
				if (_utils2['default'].canUseDOM) window.removeEventListener('resize', this.handleResize);
			}

			if (nextProps.isOpen) {
				if (_utils2['default'].canUseDOM) {
					document.body.style.overflow = 'hidden';
				}
			} else {
				if (_utils2['default'].canUseDOM) {
					document.body.style.overflow = null;
				}
			}
		}
	}, {
		key: 'close',
		value: function close(e) {
			if (e.target.id !== 'react-images-container') return;

			if (this.props.backdropClosesModal && this.props.onClose) {
				this.props.onClose();
			}
		}
	}, {
		key: 'gotoNext',
		value: function gotoNext(event) {
			if (this.props.currentImage === this.props.images.length - 1) return;
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.props.onClickNext();
		}
	}, {
		key: 'gotoPrev',
		value: function gotoPrev(event) {
			if (this.props.currentImage === 0) return;
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.props.onClickPrev();
		}
	}, {
		key: 'handleImageClick',
		value: function handleImageClick(e) {
			if (!this.props.onClickShowNextImage) return;

			this.gotoNext(e);
		}
	}, {
		key: 'handleImageLoad',
		value: function handleImageLoad(e, index) {
			// console.log('image', index, 'loaded', e);
		}
	}, {
		key: 'handleKeyboardInput',
		value: function handleKeyboardInput(event) {
			if (event.keyCode === 37) {
				this.gotoPrev(event);
				return true;
			} else if (event.keyCode === 39) {
				this.gotoNext(event);
				return true;
			} else if (event.keyCode === 27) {
				this.props.onClose();
				return true;
			}
			return false;
		}
	}, {
		key: 'handleResize',
		value: function handleResize() {
			if (!_utils2['default'].canUseDOM) return;
			this.setState({
				windowHeight: window.innerHeight || 0
			});
		}
	}, {
		key: 'renderArrowNext',
		value: function renderArrowNext() {
			if (this.props.currentImage === this.props.images.length - 1) return null;
			// const { classes } = this.props.sheet;
			return _react2['default'].createElement(
				'button',
				{ title: 'Next (Right arrow key)',
					type: 'button',
					className: c(_stylesDefault2['default'].arrow, _stylesDefault2['default'].arrowNext),
					onClick: this.gotoNext,
					onTouchEnd: this.gotoNext
				},
				_react2['default'].createElement(_Icon2['default'], { type: 'arrowRight' })
			);
		}
	}, {
		key: 'renderArrowPrev',
		value: function renderArrowPrev() {
			if (this.props.currentImage === 0) return null;
			// const { classes } = this.props.sheet;

			return _react2['default'].createElement(
				'button',
				{ title: 'Previous (Left arrow key)',
					type: 'button',
					className: c(_stylesDefault2['default'].arrow, _stylesDefault2['default'].arrowPrev),
					onClick: this.gotoPrev,
					onTouchEnd: this.gotoPrev
				},
				_react2['default'].createElement(_Icon2['default'], { type: 'arrowLeft' })
			);
		}
	}, {
		key: 'renderCloseButton',
		value: function renderCloseButton() {
			if (!this.props.showCloseButton) return null;
			// const { classes } = this.props.sheet;

			return _react2['default'].createElement(
				'div',
				{ className: _stylesDefault2['default'].closeBar },
				_react2['default'].createElement(
					'button',
					{ title: 'Close (Esc)', className: _stylesDefault2['default'].closeButton, onClick: this.props.onClose },
					_react2['default'].createElement(_Icon2['default'], { type: 'close' })
				)
			);
		}
	}, {
		key: 'renderDialog',
		value: function renderDialog() {
			if (!this.props.isOpen) return null;
			// const { classes } = this.props.sheet;

			return _react2['default'].createElement(
				_Fade2['default'],
				{ id: 'react-images-container',
					key: 'dialog',
					duration: 250,
					className: _stylesDefault2['default'].container,
					onClick: this.close,
					onTouchEnd: this.close
				},
				_react2['default'].createElement('span', { className: _stylesDefault2['default'].contentHeightShim }),
				_react2['default'].createElement(
					'div',
					{ className: _stylesDefault2['default'].content },
					this.renderCloseButton(),
					this.renderImages()
				),
				this.renderArrowPrev(),
				this.renderArrowNext()
			);
		}
	}, {
		key: 'renderFooter',
		value: function renderFooter(caption) {
			var _props = this.props;
			var currentImage = _props.currentImage;
			var images = _props.images;
			var showImageCount = _props.showImageCount;

			// const { classes } = this.props.sheet;

			if (!caption && !showImageCount) return null;

			var imageCount = showImageCount ? _react2['default'].createElement(
				'div',
				{ className: _stylesDefault2['default'].footerCount },
				currentImage + 1,
				' of ',
				images.length
			) : null;
			var figcaption = caption ? _react2['default'].createElement(
				'figcaption',
				{ className: _stylesDefault2['default'].footerCaption },
				caption
			) : null;

			return _react2['default'].createElement(
				'div',
				{ className: _stylesDefault2['default'].footer },
				imageCount,
				figcaption
			);
		}
	}, {
		key: 'renderImages',
		value: function renderImages() {
			var _this = this;

			var _props2 = this.props;
			var images = _props2.images;
			var currentImage = _props2.currentImage;

			// const { classes } = this.props.sheet;
			var windowHeight = this.state.windowHeight;

			if (!images || !images.length) return null;

			var image = images[currentImage];

			var srcset = undefined;
			var sizes = undefined;

			if (image.srcset) {
				srcset = image.srcset.join();
				sizes = '100vw';
			}

			return _react2['default'].createElement(
				'figure',
				{ key: 'image ' + currentImage,
					className: _stylesDefault2['default'].figure,
					style: { maxWidth: this.props.width }
				},
				_react2['default'].createElement(
					_reactSwipeable2['default'],
					{ onSwipedLeft: this.gotoNext, onSwipedRight: this.gotoPrev },
					_react2['default'].createElement('img', { className: _stylesDefault2['default'].image,
						onClick: this.handleImageClick,
						onLoad: function (e) {
							return _this.handleImageLoad(e, currentImage);
						},
						sizes: sizes,
						src: image.src,
						srcSet: srcset,
						style: {
							cursor: this.props.onClickShowNextImage ? 'pointer' : 'auto',
							maxHeight: windowHeight
						}
					})
				),
				this.renderFooter(images[currentImage].caption)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				_Portal2['default'],
				null,
				this.renderDialog()
			);
		}
	}]);

	return Lightbox;
})(_react.Component);

Lightbox.displayName = 'Lightbox';

Lightbox.propTypes = {
	backdropClosesModal: _react.PropTypes.bool,
	currentImage: _react.PropTypes.number,
	enableKeyboardInput: _react.PropTypes.bool,
	images: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		src: _react.PropTypes.string.isRequired,
		srcset: _react.PropTypes.array,
		caption: _react.PropTypes.string
	})).isRequired,
	isOpen: _react.PropTypes.bool,
	onClickNext: _react.PropTypes.func.isRequired,
	onClickPrev: _react.PropTypes.func.isRequired,
	onClickShowNextImage: _react.PropTypes.bool,
	onClose: _react.PropTypes.func.isRequired,
	sheet: _react.PropTypes.object,
	showCloseButton: _react.PropTypes.bool,
	showImageCount: _react.PropTypes.bool,
	width: _react.PropTypes.number
};

Lightbox.defaultProps = {
	enableKeyboardInput: true,
	currentImage: 0,
	onClickShowNextImage: true,
	showCloseButton: true,
	showImageCount: true,
	width: 900
};

exports['default'] = (0, _reactLook2['default'])(Lightbox);
module.exports = exports['default'];
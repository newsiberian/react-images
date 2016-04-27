require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

// import Lightbox from 'react-images-look';

var _reactLook = require('react-look');

var _componentsGallery = require('./components/Gallery');

var _componentsGallery2 = _interopRequireDefault(_componentsGallery);

var config = _reactLook.Presets['react-dom'];

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

var IMAGE_NAMES = ['cat', 'cats', 'chameleon', 'dog', 'ducks', 'goat', 'ostrich', 'pigeon', 'pigs', 'seagulls', 'wasp', 'yawn'];
var IMAGE_MAP = IMAGE_NAMES.map(function (img) {
	return {
		src: './images/800-' + img + '.jpg',
		thumbnail: './images/thumbnail-' + img + '.jpg',
		srcset: ['./images/1024-' + img + '.jpg 1024w', './images/800-' + img + '.jpg 800w', './images/500-' + img + '.jpg 500w', './images/320-' + img + '.jpg 320w'],
		caption: capitalizeFirstLetter(img)
	};
});
var IMAGES_PRELOAD = IMAGE_MAP.map(function (img) {
	return _react2['default'].createElement('img', { key: img.caption, src: './images/1024-' + img + '.jpg' });
});

(0, _reactDom.render)(_react2['default'].createElement(
	_reactLook.LookRoot,
	{ config: config },
	_react2['default'].createElement(
		'div',
		null,
		_react2['default'].createElement(
			'p',
			{ style: { marginBottom: 40 } },
			'Use your keyboard to navigate ',
			_react2['default'].createElement(
				'kbd',
				null,
				'left'
			),
			' ',
			_react2['default'].createElement(
				'kbd',
				null,
				'right'
			),
			' ',
			_react2['default'].createElement(
				'kbd',
				null,
				'esc'
			),
			' — Also, try resizing your browser window.'
		),
		_react2['default'].createElement(_componentsGallery2['default'], { images: IMAGE_MAP }),
		_react2['default'].createElement(
			'p',
			null,
			'Images courtesy of ',
			_react2['default'].createElement(
				'a',
				{ href: 'http://gratisography.com/', target: '_blank' },
				'Gratisography'
			)
		),
		_react2['default'].createElement(
			'div',
			{ style: { display: 'none' } },
			IMAGES_PRELOAD
		)
	)
), document.getElementById('example'));

},{"./components/Gallery":2,"react":undefined,"react-dom":undefined,"react-look":10}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImagesLook = require('react-images-look');

var _reactImagesLook2 = _interopRequireDefault(_reactImagesLook);

var Gallery = (function (_Component) {
	_inherits(Gallery, _Component);

	function Gallery() {
		_classCallCheck(this, Gallery);

		_get(Object.getPrototypeOf(Gallery.prototype), 'constructor', this).call(this);

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0
		};

		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
	}

	_createClass(Gallery, [{
		key: 'openLightbox',
		value: function openLightbox(index, event) {
			event.preventDefault();
			this.setState({
				currentImage: index,
				lightboxIsOpen: true
			});
		}
	}, {
		key: 'closeLightbox',
		value: function closeLightbox() {
			this.setState({
				currentImage: 0,
				lightboxIsOpen: false
			});
		}
	}, {
		key: 'gotoPrevious',
		value: function gotoPrevious() {
			this.setState({
				currentImage: this.state.currentImage - 1
			});
		}
	}, {
		key: 'gotoNext',
		value: function gotoNext() {
			this.setState({
				currentImage: this.state.currentImage + 1
			});
		}
	}, {
		key: 'renderGallery',
		value: function renderGallery() {
			var _this = this;

			if (!this.props.images) return;
			var gallery = this.props.images.map(function (obj, i) {
				return _react2['default'].createElement(
					'a',
					{ key: i, href: obj.src, onClick: function (event) {
							return _this.openLightbox(i, event);
						}, style: styles.thumbnail },
					_react2['default'].createElement('img', { src: obj.thumbnail, style: styles.thumbnailImage, width: styles.thumbnail.size, height: styles.thumbnail.size })
				);
			});

			return _react2['default'].createElement(
				'div',
				{ style: styles.gallery },
				gallery
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'section' },
				this.props.heading && _react2['default'].createElement(
					'h2',
					null,
					this.props.heading
				),
				this.props.subheading && _react2['default'].createElement(
					'p',
					null,
					this.props.subheading
				),
				this.renderGallery(),
				_react2['default'].createElement(_reactImagesLook2['default'], {
					currentImage: this.state.currentImage,
					images: this.props.images,
					isOpen: this.state.lightboxIsOpen,
					onClickPrev: this.gotoPrevious,
					onClickNext: this.gotoNext,
					onClose: this.closeLightbox,
					theme: this.props.theme
				})
			);
		}
	}]);

	return Gallery;
})(_react.Component);

;

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	images: _react.PropTypes.array,
	heading: _react.PropTypes.string,
	subheading: _react.PropTypes.string,
	sepia: _react.PropTypes.bool
};

var THUMBNAIL_SIZE = 72;

var styles = {
	gallery: {
		marginLeft: -5,
		marginRight: -5,
		overflow: 'hidden'
	},
	thumbnail: {
		backgroundSize: 'cover',
		borderRadius: 3,
		float: 'left',
		height: THUMBNAIL_SIZE,
		margin: 5,
		overflow: 'hidden',
		width: THUMBNAIL_SIZE
	},
	thumbnailImage: {
		display: 'block',
		height: 'auto',
		maxWidth: '100%'
	}
};

// height: THUMBNAIL_SIZE,
// left: '50%',
// position: 'relative',
//
// WebkitTransform: 'translateX(-50%)',
// MozTransform:    'translateX(-50%)',
// msTransform:     'translateX(-50%)',
// transform:       'translateX(-50%)',
exports['default'] = Gallery;
module.exports = exports['default'];

},{"react":undefined,"react-images-look":undefined}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _Prefixer = require('./Prefixer');

var _Prefixer2 = _interopRequireDefault(_Prefixer);

var _StyleContainer = require('./StyleContainer');

var _StyleContainer2 = _interopRequireDefault(_StyleContainer);

var _resolver = require('../core/resolver');

var _resolver2 = _interopRequireDefault(_resolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contextType = { _lookConfig: _react.PropTypes.object };
/**
 * Root wrapper that wraps your whole application
 * It renders the global CSS styles and passes the config down
 */

var LookRoot = function (_Component) {
  _inherits(LookRoot, _Component);

  function LookRoot(props) {
    _classCallCheck(this, LookRoot);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LookRoot).apply(this, arguments));

    _this.config = (0, _merge2.default)({}, props.config, {
      _resolveStyles: _resolver2.default
    });

    var prefixer = _this.config.prefixer;

    if (!prefixer || !prefixer._isLookPrefixer) {
      _this.config.prefixer = new _Prefixer2.default();
    }
    return _this;
  }

  _createClass(LookRoot, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { _lookConfig: this.config };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _config = this.config;
      var styleElementId = _config.styleElementId;
      var prefixer = _config.prefixer;

      new StyleComponent(styleElementId, prefixer).render();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return LookRoot;
}(_react.Component);

/**
 * StyleComponent is used to render static CSS markup
 * into a <style> element so CSS styles are rendered correctly
 * it listens for changes of the global style container
 */


LookRoot.childContextTypes = contextType;
LookRoot.contextTypes = contextType;
exports.default = LookRoot;

var StyleComponent = function () {
  function StyleComponent(styleElementId, prefixer) {
    _classCallCheck(this, StyleComponent);

    this.styles = _StyleContainer2.default.renderStaticStyles(prefixer); // eslint-disable-line
    this.updateStyles = this.updateStyles.bind(this, prefixer);

    this._changeListener = _StyleContainer2.default.subscribe(this.updateStyles);
    this.el = this.createStyleElement(styleElementId);
  }

  _createClass(StyleComponent, [{
    key: 'createStyleElement',
    value: function createStyleElement(styleElementId) {
      // if a custom style element is provided
      // we can use that one instead of creating our own
      if (styleElementId) {
        return document.getElementById(styleElementId);
      }

      var style = document.createElement('style');
      style.id = '_react-look-stylesheet';
      document.head.appendChild(style);

      return style;
    }
  }, {
    key: 'updateStyles',
    value: function updateStyles(prefixer) {
      var newStyles = _StyleContainer2.default.renderStaticStyles(prefixer);
      // only render if something changed
      if (this.styles !== newStyles) {
        this.styles = newStyles;
        this.render();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.el.innerText = this.styles;
    }
  }]);

  return StyleComponent;
}();

module.exports = exports['default'];
},{"../core/resolver":9,"./Prefixer":5,"./StyleContainer":6,"lodash/merge":197,"react":undefined}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Prefixer = function () {
  function Prefixer() {
    _classCallCheck(this, Prefixer);

    this._isLookPrefixer = true;
  }

  _createClass(Prefixer, [{
    key: 'prefix',
    value: function prefix(styles) {
      return styles;
    }
  }, {
    key: 'getKeyframesPrefix',
    value: function getKeyframesPrefix() {
      return [''];
    }
  }]);

  return Prefixer;
}();

exports.default = Prefixer;
module.exports = exports['default'];
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inlineStyleTransformer = require('inline-style-transformer');

var _reactLookCore = require('react-look-core');

var _Prefixer = require('./Prefixer');

var _Prefixer2 = _interopRequireDefault(_Prefixer);

var _generateHashCode = require('../utils/generateHashCode');

var _generateHashCode2 = _interopRequireDefault(_generateHashCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sortObject = _reactLookCore.Utils.sortObject;


/**
 * A StyleContainer collects className mappings
 * that can be rendered into a static CSS string
 */

var StyleContainer = function () {
  function StyleContainer() {
    _classCallCheck(this, StyleContainer);

    this.selectors = new Map();
    this.mediaQueries = new Map();
    this.keyframes = new Map();
    this.fonts = new Set();
    this.dynamics = new Map();
    this.statics = new Set();

    this._className = 0;
    this._defaultClassPrefix = 'c';
    this._listener = new Set();
  }

  /**
   * Adds a new selector with styles
   * it is also used to add media queries
   * @param {string} selector - selector to reference the styles
   * @param {Object} styles - styles that get added
   * @param {string?} media - media query string
   */


  _createClass(StyleContainer, [{
    key: 'add',
    value: function add(selector, styles, media) {
      if (media && media !== '') {
        this._addMediaQuery(selector, styles, media);
      } else {
        this._addAndEmit(this.selectors, selector, styles);
      }
    }

    /**
     * Adds a new keyframe animation
     * @param {string} animation - named used to reference the animation
     * @param {Object} frames - animation frames that get added
     */

  }, {
    key: 'addKeyframes',
    value: function addKeyframes(animation, frames) {
      this._addAndEmit(this.keyframes, animation, frames);
    }

    /**
     * Adds a new global fontFace
     * @param {Object} font - information on the font
     */

  }, {
    key: 'addFont',
    value: function addFont(font) {
      var fontFace = '@font-face {' + (0, _inlineStyleTransformer.toCSS)(font) + '}';
      this._addAndEmit(this.fonts, fontFace);
    }

    /**
     * Adds a static css string
     * @param {string} styles - as css string
     */

  }, {
    key: 'addStatic',
    value: function addStatic(styles) {
      this._addAndEmit(this.statics, styles);
    }

    /**
     * Renders a single string containing the whole CSS styles
     * @param {Prefixer} prefixer - valid Look Prefixer to prefix styles
     */

  }, {
    key: 'renderStaticStyles',
    value: function renderStaticStyles() {
      var _this = this;

      var prefixer = arguments.length <= 0 || arguments[0] === undefined ? new _Prefixer2.default() : arguments[0];

      var css = '';

      this.fonts.forEach(function (font) {
        return css += font;
      });
      this.statics.forEach(function (staticStyles) {
        return css += staticStyles;
      });
      this.selectors.forEach(function (styles, selector) {
        return css += selector + _this._renderCSS(prefixer, styles);
      });
      this.mediaQueries.forEach(function (selectors, query) {
        css += '@media' + query + '{';
        selectors.forEach(function (styles, selector) {
          return css += selector + _this._renderCSS(prefixer, styles);
        });
        css += '}';
      });
      this.keyframes.forEach(function (frames, name) {
        css += prefixer.getKeyframesPrefix().reduce(function (keyframes, prefix) {
          keyframes += '@' + prefix + 'keyframes ' + name + _this._renderCSS(prefixer, frames);
          return keyframes;
        }, '');
      });

      return css;
    }

    /**
     * Generates a unique hash code for a given style object
     * if the style properties are the same, the same hash will be returned
     * no matter how they're sorted
     * @param {Object} styles - style object which will get sorted and hashed
     */

  }, {
    key: 'generateClassName',
    value: function generateClassName(styles) {
      return (0, _generateHashCode2.default)(JSON.stringify(sortObject(styles)));
    }

    /**
     * Returns a valid unused className
     * @param {string?} prefix - prefix appended before the className
     */

  }, {
    key: 'requestClassName',
    value: function requestClassName() {
      var prefix = arguments.length <= 0 || arguments[0] === undefined ? this._defaultClassPrefix : arguments[0];

      return prefix + (this._className++).toString(36);
    }

    /**
     * Adds an change listener
     * Returns an instance with an unsubscribe method
     * @param {Function} listener - event listener
     */

  }, {
    key: 'subscribe',
    value: function subscribe(listener) {
      var _this2 = this;

      this._listener.add(listener);

      return {
        unsubscribe: function unsubscribe() {
          return _this2._listener.delete(listener);
        }
      };
    }

    /**
     * Change emitter executes every single change listener
     */

  }, {
    key: '_emitChange',
    value: function _emitChange() {
      this._listener.forEach(function (listener) {
        return listener();
      });
    }

    /**
     * Helper that Adds dynamic styles to be accessed later globally
     * @param {string} className - className reference
     * @param {Object} styles - styles that get added
     */

  }, {
    key: '_addDynamic',
    value: function _addDynamic(className, styles) {
      if (!(0, _isEmpty2.default)(styles)) {
        this._addAndEmit(this.dynamics, className, styles);
      }
    }

    /**
     * Helper that adds media queries
     * @param {string} selector - selector to reference the styles
     * @param {Object} styles - styles that get added
     * @param {string?} media - media query string
     */

  }, {
    key: '_addMediaQuery',
    value: function _addMediaQuery(selector, styles, media) {
      // Add the media if not existing yet
      if (!this.mediaQueries.has(media)) {
        this.mediaQueries.set(media, new Map());
      }

      var mediaQuery = this.mediaQueries.get(media);
      this._addAndEmit(mediaQuery, selector, styles);
    }

    /**
     * Abstract helper to add new styles to a Map/Set
     * @param {Map|Set} group - group that styles get added to
     * @param {string} selector - CSS selector thats used as reference
     * @param {Object} styles - styles that get added
     */

  }, {
    key: '_addAndEmit',
    value: function _addAndEmit(group, selector, styles) {
      if (!group.has(selector)) {
        if (styles !== undefined) {
          group.set(selector, styles);
        } else {
          group.add(selector);
        }
        this._emitChange();
      }
    }
  }, {
    key: '_renderCSS',
    value: function _renderCSS(prefixer, styles) {
      return '{' + (0, _inlineStyleTransformer.toCSS)(prefixer.prefix((0, _merge2.default)({}, styles))) + '}';
    }
  }]);

  return StyleContainer;
}();

exports.default = new StyleContainer();
module.exports = exports['default'];
},{"../utils/generateHashCode":21,"./Prefixer":5,"inline-style-transformer":78,"lodash/isEmpty":183,"lodash/merge":197,"react-look-core":205}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _StyleContainer = require('./StyleContainer');

var _StyleContainer2 = _interopRequireDefault(_StyleContainer);

var _renderer = require('../core/renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _getFontFormat = require('../utils/getFontFormat');

var _getFontFormat2 = _interopRequireDefault(_getFontFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyframe = 0;

exports.default = {
  /**
   * Generates a styleSheet with an scopeId applied to every selector
   * The scopeId refers to the Component that is responsible for resolving those styles
   * @param {styles} styles - Style selector or Object with selectors
   */

  create: function create(styles) {
    // flat style object without selectors
    var firstKey = styles[Object.keys(styles)[0]];
    if (!(0, _isPlainObject2.default)(firstKey) && !(0, _isFunction2.default)(firstKey)) {
      return (0, _renderer2.default)(styles);
    }

    return Object.keys(styles).reduce(function (classes, selector) {
      classes[selector] = (0, _renderer2.default)(styles[selector]);
      return classes; // eslint-disable-line
    }, {});
  },


  /**
   * Combines styles to a single className string
   * @param {Object} ...styles - styles that get combined
   */
  combineStyles: function combineStyles() {
    for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }

    return styles.join(' ');
  },


  /**
   * A global StyleSheet that directly applies to your DOM
   * @param {Object} styles - a set of style objects
   * @param {string?} scope - additional scoping selector
   */
  addCSS: function addCSS(styles, scope) {
    if (typeof styles === 'string') {
      _StyleContainer2.default.addStatic(styles);
    } else {
      (function () {
        var scopeSelector = scope !== undefined && scope.trim() !== '' ? scope + ' ' : '';
        Object.keys(styles).forEach(function (selector) {
          return _StyleContainer2.default.add(scopeSelector + selector, styles[selector]);
        });
      })();
    }
  },
  toCSS: function toCSS(styles, scope) {
    console.warn('`StyleSheet.toCSS` is deprecated! Please use `StyleSheet.addCSS` instead!'); // eslint-disable-line
    this.addCSS(styles, scope);
  },


  /**
   * Renders all static styles into a single CSS string
   * @param {string?} userAgent - userAgent used to prefix styles
   */
  renderToString: function renderToString(userAgent) {
    return _StyleContainer2.default.renderStaticStyles(userAgent);
  },


  /**
   * Adds keyframe animations to the global StyleSheet and returns the animation name
   * @param {Object} frames - keyframes that get inserted
   * @param {string?} name - custom animation name
   */
  keyframes: function keyframes(frames, name) {
    var animationName = name ? name : 'k' + keyframe++;

    _StyleContainer2.default.addKeyframes(animationName, frames);
    return animationName;
  },


  /**
   * Adds a new font family to the global StyleSheet for global usage
   * @param {string} fontFamily - font-family for global usage
   * @param {string|Array} files - source files refering to the font files
   * @param {Object} properties - additional font properties including fontWeight, fontStretch, fontStyle, unicodeRange
   */
  font: function font(fontFamily, files, properties) {
    if (files) {
      var _ret2 = function () {
        // Generates a style object including all font information
        var font = {
          fontFamily: '\'' + fontFamily + '\'',
          src: files.map(function (src) {
            return 'url(\'' + src + '\') format(\'' + (0, _getFontFormat2.default)(src) + '\')';
          }).join(',')
        };

        // Filter the properties to only include valid properties
        if (properties) {
          (function () {
            var fontProperties = ['fontWeight', 'fontStretch', 'fontStyle', 'unicodeRange'];
            Object.keys(properties).filter(function (prop) {
              return fontProperties.indexOf(prop) > -1;
            }).forEach(function (fontProp) {
              return font[fontProp] = properties[fontProp];
            });
          })();
        }

        _StyleContainer2.default.addFont(font);
        return {
          v: fontFamily
        };
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    }
  }
};
module.exports = exports['default'];
},{"../core/renderer":8,"../utils/getFontFormat":22,"./StyleContainer":6,"lodash/isFunction":184,"lodash/isPlainObject":190}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isBoolean = require('lodash/isBoolean');

var _isBoolean2 = _interopRequireDefault(_isBoolean);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

exports.extractDynamicStyles = extractDynamicStyles;
exports.renderSpecialStyles = renderSpecialStyles;
exports.default = renderStaticStyles;

var _StyleContainer = require('../api/StyleContainer');

var _StyleContainer2 = _interopRequireDefault(_StyleContainer);

var _sortPseudoClasses = require('../utils/sortPseudoClasses');

var _sortPseudoClasses2 = _interopRequireDefault(_sortPseudoClasses);

var _isMediaQuery = require('../utils/isMediaQuery');

var _isMediaQuery2 = _interopRequireDefault(_isMediaQuery);

var _isPseudo = require('../utils/isPseudo');

var _isPseudo2 = _interopRequireDefault(_isPseudo);

var _isDynamicArray = require('../utils/isDynamicArray');

var _isDynamicArray2 = _interopRequireDefault(_isDynamicArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extracts all possible dynamic styles out of a style object
 * To be able to render all other (static) styles directly to CSS
 * @param {Object} styles - pure style object which gets parsed
 */
function extractDynamicStyles(styles) {
  // early return stateful selectors
  if ((0, _isFunction2.default)(styles)) {
    return { _statefulSelector: styles };
  }

  return Object.keys(styles).reduce(function (dynamic, property) {
    var value = styles[property]; // eslint-disable-line
    if ((0, _isPlainObject2.default)(value)) {
      // only consider pseudo classes and media queries
      // that contain inner dynamic styles
      if ((0, _isPseudo2.default)(property) || (0, _isMediaQuery2.default)(property)) {
        var valueCount = Object.keys(value).length;

        var innerDynamic = extractDynamicStyles(value);

        // if the inner styles contain dynamic styles
        // extract them into the output object
        if (!(0, _isEmpty2.default)(innerDynamic)) {
          dynamic[property] = innerDynamic;
        }

        // Remove the property if all inner styles
        // are actually dynamic styles
        if (Object.keys(innerDynamic).length === valueCount) {
          delete styles[property];
        }
      } else {
        dynamic[property] = value;
        delete styles[property];
      }
    }

    // function are considered stateful styles and therefore
    // treated as dynamic styles
    if ((0, _isFunction2.default)(value) || (0, _isBoolean2.default)(value) || (0, _isArray2.default)(value) && (0, _isDynamicArray2.default)(value)) {
      dynamic[property] = value;
      delete styles[property];
    }

    return dynamic; // eslint-disable-line
  }, {});
}

/**
 * Renders special styles as pseudo classes and media queries
 * and adds them to the CSS StyleContainer
 * @param {string} selector - base selector used as className
 * @param {Object} styles - static styles containing special extensions
 * @param {string} pseudo - prior outer pseudo class
 * @param {string} media - prior outer media query
 */
function renderSpecialStyles(selector, styles) {
  var pseudo = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
  var media = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

  return Object.keys(styles).sort(_sortPseudoClasses2.default).reduce(function (extension, property) {
    var value = styles[property]; // eslint-disable-line

    if ((0, _isPlainObject2.default)(value)) {
      if ((0, _isPseudo2.default)(property)) {
        var innerStyles = renderSpecialStyles(selector, value, pseudo + property, media);
        // Adds a pseudo class to an existing selector
        _StyleContainer2.default.add('.' + selector + pseudo + property, innerStyles, media);
      }
      if ((0, _isMediaQuery2.default)(property)) {
        // Concatenate multiple media queries if a media query already exists
        var newMedia = (media !== '' ? media + 'and' : '') + property.replace('@media', '').trim();
        var _innerStyles = renderSpecialStyles(selector, value, pseudo, newMedia);
        // Adds the selector to the media group
        _StyleContainer2.default.add('.' + selector + pseudo, _innerStyles, newMedia);
      }
    } else {
      extension[property] = value;
    }
    return extension; // eslint-disable-line
  }, {});
}

/**
 * Renders static styles to the CSS StyleContainer
 * and directly scopes them to the Component
 * @param {Object} styles - static styles to be rendered
 * @param {string} scope - scope selector
 * @param {string} selector - base selector used as className
 */
function renderStaticStyles(styles, scope) {
  // Extracts dynamic parts remaining only static styles
  var dynamicStyles = extractDynamicStyles(styles);

  // Determines the base styles used to generate the className
  var baseStyles = Object.keys(styles).reduce(function (base, property) {
    var value = styles[property];
    if (!(0, _isPlainObject2.default)(value)) {
      base[property] = value;
      delete styles[property];
    }
    return base; // eslint-disable-line
  }, {});

  // Generate a unique className
  var className = scope ? scope + _StyleContainer2.default.generateClassName(baseStyles) : _StyleContainer2.default.requestClassName();

  // Add the className to the global style container if it has styles
  if (!(0, _isEmpty2.default)(baseStyles)) {
    _StyleContainer2.default.add('.' + className, baseStyles);
  }

  // Also add the dynamic styles if they exist
  if (!(0, _isEmpty2.default)(dynamicStyles) || (0, _isFunction2.default)(dynamicStyles)) {
    _StyleContainer2.default._addDynamic(className, dynamicStyles);
  }

  // Renders pseudo classes and media queries to the style container
  renderSpecialStyles(className, styles);

  return className;
}
},{"../api/StyleContainer":6,"../utils/isDynamicArray":23,"../utils/isMediaQuery":24,"../utils/isPseudo":25,"../utils/sortPseudoClasses":26,"lodash/isArray":178,"lodash/isBoolean":181,"lodash/isEmpty":183,"lodash/isFunction":184,"lodash/isPlainObject":190}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = resolveStyles;

var _assignStyles = require('assign-styles');

var _assignStyles2 = _interopRequireDefault(_assignStyles);

var _react = require('react');

var _reactLookCore = require('react-look-core');

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _extractCSS = require('../mixins/extractCSS');

var _extractCSS2 = _interopRequireDefault(_extractCSS);

var _StyleContainer = require('../api/StyleContainer');

var _StyleContainer2 = _interopRequireDefault(_StyleContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvePlugins = _reactLookCore.resolver.resolvePlugins;
var resolveChildren = _reactLookCore.resolver.resolveChildren;
var resolveProps = _reactLookCore.resolver.resolveProps;
var isLookEnhanced = _reactLookCore.resolver.isLookEnhanced;


/**
 * Resolves provided styles into style objects
 * Processes those using a predefined plugin lineup
 * Maps the final style objects to the element
 * @param {Object} Component - wrapping React Component providing styles and elements
 * @param {Object} element - previously rendered React element
 * @param {Object} config - configuration containing plugins and plugin-specific configs
 */
function resolveStyles(Component, element, config) {
  if (element && element.props) {
    var _ret = function () {
      // early return if element itself is a Look component
      // it will be resolved anyways
      if (isLookEnhanced(element)) {
        return {
          v: element
        };
      }

      var newProps = _extends({}, element.props);
      resolveProps(Component, newProps, config);
      resolveChildren(Component, newProps, config);

      // The react-dom package recieves all styles as classNames
      // They come prerendered by StyleSheet.create and reference all dynamic StyleSheet
      // Those will be iterated and additionally added if conditions are fulfilled
      if (newProps.className) {
        (function () {

          // static arguments that get passed to every plugin
          var staticPluginArguments = {
            resolve: resolvePlugins,
            StyleContainer: _StyleContainer2.default,
            Component: Component,
            newProps: newProps,
            element: element,
            config: config
          };

          newProps.className.split(' ').forEach(function (className) {
            var dynamicStyles = _StyleContainer2.default.dynamics.get(className);
            // Resolve plugins if plugins are provided via config
            if (config.plugins) {
              // Constructs the pluginInterface
              var pluginInterface = _extends({}, staticPluginArguments, {
                styles: (0, _assignStyles2.default)({}, dynamicStyles || {}),
                dynamicStylesNotNull: dynamicStyles != null
              });
              // Calling resolvePlugins with forceModePossible = true
              var newStyles = resolvePlugins(pluginInterface, true);

              // Only apply styles if there are some
              if (!(0, _isEmpty2.default)(newStyles)) {
                var prefixedNewStyles = config.prefixer.prefix(newStyles);
                var dynamicClassName = (0, _renderer2.default)(prefixedNewStyles, className + '-d-');
                (0, _extractCSS2.default)({ value: dynamicClassName, newProps: newProps });
                newProps._lookShouldUpdate = true;
              }
            }
          });
        })();
      }

      // Only actually clone if it is needed
      // If there are styles, children got resolved or props got resolved
      if (newProps.children !== element.props.children || newProps._lookShouldUpdate) {
        return {
          v: (0, _react.cloneElement)(element, newProps)
        };
      }
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  return element;
}
module.exports = exports['default'];
},{"../api/StyleContainer":6,"../mixins/extractCSS":11,"./renderer":8,"assign-styles":27,"lodash/isEmpty":183,"react":undefined,"react-look-core":205}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Presets = exports.Mixins = exports.Plugins = exports.StaticPrefixer = exports.DynamicPrefixer = exports._resolver = exports._StyleContainer = exports.Prefixer = exports.LookRoot = exports.StyleSheet = undefined;

var _reactLookCore = require('react-look-core');

var _fallbackValue = require('./plugins/fallbackValue');

var _fallbackValue2 = _interopRequireDefault(_fallbackValue);

var _linter = require('./plugins/linter');

var _linter2 = _interopRequireDefault(_linter);

var _friendlyClassName = require('./plugins/friendlyClassName');

var _friendlyClassName2 = _interopRequireDefault(_friendlyClassName);

var _substr = require('./mixins/substr');

var _substr2 = _interopRequireDefault(_substr);

var _extractCSS = require('./mixins/extractCSS');

var _extractCSS2 = _interopRequireDefault(_extractCSS);

var _platformQuery = require('./mixins/platformQuery');

var _platformQuery2 = _interopRequireDefault(_platformQuery);

var _reactDom = require('./presets/react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _DynamicPrefixer = require('./prefixer/DynamicPrefixer');

var _DynamicPrefixer2 = _interopRequireDefault(_DynamicPrefixer);

var _StaticPrefixer = require('./prefixer/StaticPrefixer');

var _StaticPrefixer2 = _interopRequireDefault(_StaticPrefixer);

var _Prefixer = require('./api/Prefixer');

var _Prefixer2 = _interopRequireDefault(_Prefixer);

var _StyleSheet = require('./api/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _LookRoot = require('./api/LookRoot');

var _LookRoot2 = _interopRequireDefault(_LookRoot);

var _StyleContainer2 = require('./api/StyleContainer');

var _StyleContainer3 = _interopRequireDefault(_StyleContainer2);

var _resolver2 = require('./core/resolver');

var _resolver3 = _interopRequireDefault(_resolver2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mixin = _reactLookCore.Plugins.mixin;
var statefulValue = _reactLookCore.Plugins.statefulValue;
var styleLogger = _reactLookCore.Plugins.styleLogger;
var statefulSelector = _reactLookCore.Plugins.statefulSelector;
var condition = _reactLookCore.Mixins.condition;
var contains = _reactLookCore.Mixins.contains;
var extend = _reactLookCore.Mixins.extend;
var equal = condition.equal;
var unEqual = condition.unEqual;
var greater = condition.greater;
var less = condition.less;
var greaterThan = condition.greaterThan;
var lessThan = condition.lessThan;

// Plugins


// Dev tools


// Mixins


// Presets


// Prefixer


// API


// Private API

// Resolving annotations
// If not passing arguments it just wraps the Component
// Otherwise it returns a decorator

exports.default = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args[0] instanceof Function) {
    return _reactLookCore.enhancer.apply(undefined, args); // eslint-disable-line
  }

  return function decorator(target) {
    return _reactLookCore.enhancer.apply(undefined, [target].concat(args)); // eslint-disable-line
  };
};

var Plugins = {
  mixin: mixin,
  fallbackValue: _fallbackValue2.default,
  statefulValue: statefulValue,
  statefulSelector: statefulSelector,
  styleLogger: styleLogger,
  linter: _linter2.default,
  friendlyClassName: _friendlyClassName2.default
};

var Mixins = {
  // Conditions
  greaterThan: greaterThan,
  lessThan: lessThan,
  unEqual: unEqual,
  greater: greater,
  less: less,
  equal: equal,

  // Other
  extend: extend,
  extractCSS: _extractCSS2.default,
  platformQuery: _platformQuery2.default,
  contains: contains,
  substr: _substr2.default
};

var Presets = {
  'react-dom': _reactDom2.default
};

exports.StyleSheet = _StyleSheet2.default;
exports.LookRoot = _LookRoot2.default;
exports.Prefixer = _Prefixer2.default;
exports.

// private export for testing only
_StyleContainer = _StyleContainer3.default;
exports._resolver = _resolver3.default;
exports.DynamicPrefixer = _DynamicPrefixer2.default;
exports.StaticPrefixer = _StaticPrefixer2.default;
exports.Plugins = Plugins;
exports.Mixins = Mixins;
exports.Presets = Presets;
},{"./api/LookRoot":4,"./api/Prefixer":5,"./api/StyleContainer":6,"./api/StyleSheet":7,"./core/resolver":9,"./mixins/extractCSS":11,"./mixins/platformQuery":12,"./mixins/substr":13,"./plugins/fallbackValue":14,"./plugins/friendlyClassName":15,"./plugins/linter":16,"./prefixer/DynamicPrefixer":17,"./prefixer/StaticPrefixer":18,"./presets/react-dom":19,"react-look-core":205}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Lets you extract css to classNames using the css key
// This is helpful if you have some legacy code using CSS classes

exports.default = function (_ref) {
  var className = _ref.value;
  var newProps = _ref.newProps;

  if (newProps.className) {
    newProps.className += ' ' + className;
  } else {
    newProps.className = className;
  }
  return true;
};

module.exports = exports['default'];
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Allows the use of platform queries supported by browser information
// provided by the inline-style-prefixer

exports.default = function (_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var mixinKey = _ref.mixinKey;
  var userAgent = _ref.config.userAgent;

  var browserInfo = new _inlineStylePrefixer2.default({ userAgent: userAgent })._browserInfo;
  var platforms = property.replace(mixinKey, '').trim().split(' ');

  var isPlatform = false;

  platforms.forEach(function (platform) {
    if (browserInfo[platform.trim()]) {
      isPlatform = true;
    }
  });

  return isPlatform ? value : false;
};

module.exports = exports['default'];
},{"inline-style-prefixer":61}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _reactLookCore = require('react-look-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var getPseudoExpression = _reactLookCore.Utils.getPseudoExpression;

// Evaluates if a element contains a given string

exports.default = function (_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var newProps = _ref.newProps;

  var children = newProps.children;

  if ((0, _isString2.default)(children) || (0, _isNumber2.default)(children)) {
    var _ret = function () {
      var newChildren = [];

      var matches = children.match(new RegExp(getPseudoExpression(property), 'g'));
      if (!matches) {
        return {
          v: false
        };
      }

      matches.forEach(function (match) {
        var _children$split = children.split(match);

        var _children$split2 = _toArray(_children$split);

        var left = _children$split2[0];

        var right = _children$split2.slice(1);

        if (left !== '') {
          newChildren.push(left);
        }

        newChildren.push((0, _react.createElement)('span', {
          style: value
        }, match));

        children = right.join(match);
      });

      newChildren.push(children);
      newProps.children = newChildren;
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  return false;
};

module.exports = exports['default'];
},{"lodash/isNumber":187,"lodash/isString":191,"react":undefined,"react-look-core":205}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = fallbackValue;

var _assignStyles = require('assign-styles');

var _assignStyles2 = _interopRequireDefault(_assignStyles);

var _camelToDashCase = require('../utils/camelToDashCase');

var _camelToDashCase2 = _interopRequireDefault(_camelToDashCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Resolves alternative values provided as an Array
 */
function fallbackValue(_ref) {
  var styles = _ref.styles;
  var resolve = _ref.resolve;

  var pluginInterface = _objectWithoutProperties(_ref, ['styles', 'resolve']);

  Object.keys(styles).forEach(function (property) {
    var value = styles[property];
    if ((0, _isArray2.default)(value)) {
      styles[property] = value.join(';' + (0, _camelToDashCase2.default)(property) + ':');
    } else if ((0, _isPlainObject2.default)(value)) {
      styles[property] = resolve(_extends({}, pluginInterface, {
        styles: (0, _assignStyles2.default)({}, value),
        resolve: resolve
      }));
    }
  });

  return styles;
}
module.exports = exports['default'];
},{"../utils/camelToDashCase":20,"assign-styles":27,"lodash/isArray":178,"lodash/isPlainObject":190}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = friendlyClassNames;

var _reactLookCore = require('react-look-core');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getChildType = _reactLookCore.Utils.getChildType;


var classNameTemplate = function classNameTemplate(className, Component, element) {
  return Component.constructor.displayName + '-' + getChildType(element) + '--' + className;
};

var classMapping = new Map();

function friendlyClassNames(_ref) {
  var StyleContainer = _ref.StyleContainer;
  var Component = _ref.Component;
  var element = _ref.element;
  var newProps = _ref.newProps;
  var styles = _ref.styles;
  var config = _ref.config;

  // Only transform if not already transformed and a className exists
  if (!newProps._hasFriendlyClassNames && newProps.className) {
    newProps.className = newProps.className.split(' ').reduce(function (className, cls) {
      cls = cls.trim();
      // If the className has already been resolved
      // just use the former new className
      if (classMapping.has(cls)) {
        className += className + className !== '' ? ' ' : '' + classMapping.get(cls);
      } else {
        (function () {
          var newClass = void 0;
          if (config && config.friendlyClassNameTemplate) {
            newClass = config.friendlyClassNameTemplate(cls, Component, element);
          } else {
            newClass = classNameTemplate(cls, Component, element);
          }
          var isLookClass = false;

          // immutable selectors to iterate without changes
          var selectors = [].concat(_toConsumableArray(StyleContainer.selectors));
          var mediaQueries = [].concat(_toConsumableArray(StyleContainer.mediaQueries));

          // Replace basic selector classNames
          selectors.forEach(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2);

            var selector = _ref3[0];
            var styles = _ref3[1];

            // only if the selectors starts with the className
            if (selector.indexOf('.' + cls) === 0) {
              var pseudo = selector.replace(new RegExp('.' + cls, 'g'), '');
              // Cache resolved classNames for later use
              classMapping.set(cls, newClass);
              // Push the new className and remove the old one
              StyleContainer.add('.' + newClass + pseudo, styles);
              StyleContainer.selectors.delete(selector);
              isLookClass = true;
            }
          });

          // Iterate media queries and replace selectors
          mediaQueries.forEach(function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2);

            var media = _ref5[0];
            var selectors = _ref5[1];

            var mediaSelectors = [].concat(_toConsumableArray(selectors));
            mediaSelectors.forEach(function (_ref6) {
              var _ref7 = _slicedToArray(_ref6, 2);

              var selector = _ref7[0];
              var styles = _ref7[1];

              if (selector.indexOf('.' + cls) === 0) {
                isLookClass = true;
                var pseudo = selector.replace(new RegExp('.' + cls, 'g'), '');
                classMapping.set(cls, newClass);
                // Also overwrite media query selectors
                StyleContainer.add('.' + newClass + pseudo, styles, media);
                StyleContainer.mediaQueries.get(media).delete('.' + cls + pseudo);
              }
            });
          });

          // Concats the new className or uses the old className
          // if it is not provided by Look
          className += (className !== '' ? ' ' : '') + (isLookClass ? newClass : cls);
        })();
      }
      return className; // eslint-disable-line
    }, '');
  }

  // Forces Look to clone the element
  newProps._lookShouldUpdate = true;
  // Sets a flag to be able to skip resolving next time
  newProps._hasFriendlyClassNames = true;

  return styles;
}
module.exports = exports['default'];
},{"react-look-core":205}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = linter;

var _inlineStyleLinter = require('inline-style-linter');

var _inlineStyleLinter2 = _interopRequireDefault(_inlineStyleLinter);

var _reactLookCore = require('react-look-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getChildType = _reactLookCore.Utils.getChildType;
function linter(_ref) {
  var styles = _ref.styles;
  var Component = _ref.Component;
  var element = _ref.element;
  var linter = _ref.config.linter;

  var warnings = new _inlineStyleLinter2.default(linter).lint(styles);

  warnings.forEach(function (warning) {
    if (!linter.mute) {
      if (linter && linter.onlyLogHint) {
        console.warn(Component.constructor.displayName + '<' + getChildType(element) + '>: ' + warning.hint); // eslint-disable-line
      } else {
          console.warn(Component.constructor.displayName + '<' + getChildType(element) + '>: ' + warning.hint, warning); // eslint-disable-line
        }
    }
  });

  return styles;
}
module.exports = exports['default'];
},{"inline-style-linter":30,"react-look-core":205}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Prefixer2 = require('../api/Prefixer');

var _Prefixer3 = _interopRequireDefault(_Prefixer2);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dynamic Prefixer which validate the userAgent to prefix styles
 * @param {string} userAgent - optional userAgent that gets used to gather information on prefixes
 */

var DynamicPrefixer = function (_Prefixer) {
  _inherits(DynamicPrefixer, _Prefixer);

  function DynamicPrefixer(config) {
    _classCallCheck(this, DynamicPrefixer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DynamicPrefixer).call(this));

    _this.config = config;
    _this._prefixer = new _inlineStylePrefixer2.default(config);
    return _this;
  }

  _createClass(DynamicPrefixer, [{
    key: 'prefix',
    value: function prefix(styles) {
      return this._prefixer.prefix(styles);
    }
  }, {
    key: 'getKeyframesPrefix',
    value: function getKeyframesPrefix() {
      var keyframesPrefix = [this._prefixer.cssPrefix];
      return this.config.keepUnprefixed ? keyframesPrefix.concat('') : keyframesPrefix;
    }
  }]);

  return DynamicPrefixer;
}(_Prefixer3.default);

exports.default = DynamicPrefixer;
module.exports = exports['default'];
},{"../api/Prefixer":5,"inline-style-prefixer":61}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Prefixer2 = require('../api/Prefixer');

var _Prefixer3 = _interopRequireDefault(_Prefixer2);

var _inlineStylePrefixAll = require('inline-style-prefix-all');

var _inlineStylePrefixAll2 = _interopRequireDefault(_inlineStylePrefixAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dynamic Prefixer which validate the userAgent to prefix styles
 * @param {string} userAgent - optional userAgent that gets used to gather information on prefixes
 */

var StaticPrefixer = function (_Prefixer) {
  _inherits(StaticPrefixer, _Prefixer);

  function StaticPrefixer() {
    _classCallCheck(this, StaticPrefixer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StaticPrefixer).call(this));
  }

  _createClass(StaticPrefixer, [{
    key: 'prefix',
    value: function prefix(styles) {
      return (0, _inlineStylePrefixAll2.default)(styles);
    }
  }, {
    key: 'getKeyframesPrefix',
    value: function getKeyframesPrefix() {
      return ['-webkit-', '-moz-', ''];
    }
  }]);

  return StaticPrefixer;
}(_Prefixer3.default);

exports.default = StaticPrefixer;
module.exports = exports['default'];
},{"../api/Prefixer":5,"inline-style-prefix-all":54}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactLookCore = require('react-look-core');

var _fallbackValue = require('../plugins/fallbackValue');

var _fallbackValue2 = _interopRequireDefault(_fallbackValue);

var _extractCSS = require('../mixins/extractCSS');

var _extractCSS2 = _interopRequireDefault(_extractCSS);

var _platformQuery = require('../mixins/platformQuery');

var _platformQuery2 = _interopRequireDefault(_platformQuery);

var _substr = require('../mixins/substr');

var _substr2 = _interopRequireDefault(_substr);

var _StaticPrefixer = require('../prefixer/StaticPrefixer');

var _StaticPrefixer2 = _interopRequireDefault(_StaticPrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mixin = _reactLookCore.Plugins.mixin;
var statefulValue = _reactLookCore.Plugins.statefulValue;
var statefulSelector = _reactLookCore.Plugins.statefulSelector;
var condition = _reactLookCore.Mixins.condition;
var contains = _reactLookCore.Mixins.contains;
var extend = _reactLookCore.Mixins.extend;
var equal = condition.equal;
var unEqual = condition.unEqual;
var greater = condition.greater;
var less = condition.less;
var greaterThan = condition.greaterThan;
var lessThan = condition.lessThan;
exports.default = {
  prefixer: new _StaticPrefixer2.default(),
  plugins: [statefulValue, statefulSelector, mixin, _fallbackValue2.default],
  mixins: {
    // Conditions
    // NOTE: Condition order matters
    '>=': greaterThan,
    '<=': lessThan,
    '!=': unEqual,
    '>': greater,
    '<': less,
    '=': equal,

    // Other
    extend: extend,
    contains: contains,
    substr: _substr2.default,

    // CSS extraction
    css: _extractCSS2.default,

    // Queries
    '@platform': _platformQuery2.default
  }
};
module.exports = exports['default'];
},{"../mixins/extractCSS":11,"../mixins/platformQuery":12,"../mixins/substr":13,"../plugins/fallbackValue":14,"../prefixer/StaticPrefixer":18,"react-look-core":205}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Converts a camel-case string to a dash-case string
 * @param {string} str - str that gets converted to dash-case
 */

exports.default = function (str) {
  return str.replace(/([a-z]|^)([A-Z])/g, function (match, p1, p2) {
    return p1 + '-' + p2.toLowerCase();
  }).replace('ms-', '-ms-');
};

module.exports = exports['default'];
},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateHashCode;
/**
 * Generates a hashcode from a string
 * Taken from http://stackoverflow.com/a/7616484
 * @param {string} str - str used to generate the unique hash code
 */
function generateHashCode(str) {
  var hash = 0;
  var iterator = void 0;
  var char = void 0;
  var length = str.length;

  if (length === 0) {
    return hash;
  }

  for (iterator = 0; iterator < length; ++iterator) {
    char = str.charCodeAt(iterator);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  return hash.toString(36);
}
module.exports = exports['default'];
},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFontFormat;
var formats = {
  '.woff': 'woff',
  '.eof': 'eof',
  '.ttf': 'truetype',
  '.svg': 'svg'
};

// Returns the font format for a specific font source
function getFontFormat(src) {
  return Object.keys(formats).reduce(function (format, extension) {
    if (src.indexOf(extension) > -1) {
      format = formats[extension];
    }
    return format; // eslint-disable-line
  }, undefined);
}
module.exports = exports['default'];
},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  return arr.reduce(function (isDynamic, item) {
    if (!(0, _isString2.default)(item) && !(0, _isNumber2.default)(item)) {
      isDynamic = true;
    }
    return isDynamic;
  }, false);
};

module.exports = exports['default'];
},{"lodash/isNumber":187,"lodash/isString":191}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (property) {
  return property.substr(0, 6) === '@media';
};

module.exports = exports['default'];
},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (property) {
  return property.charAt(0) === ':';
};

module.exports = exports['default'];
},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortPseudoClasses;
var precedence = {
  ':link': 4,
  ':visited': 3,
  ':hover': 2,
  ':focus': 1.5,
  ':active': 1
};

function sortPseudoClasses(left, right) {
  var precedenceLeft = precedence[left]; // eslint-disable-line
  var precedenceRight = precedence[right];
  // Only sort if both properties are listed
  // This prevents other pseudos from reordering
  if (precedenceLeft && precedenceRight) {
    return precedenceLeft < precedenceRight ? 1 : -1;
  }
  return 0;
}
module.exports = exports['default'];
},{}],27:[function(require,module,exports){
/**
 * Assigns two styles and optionally overwrites existing values
 * Built to assign inline-style objects and respects CSS's !important annotation
 * @param {Object} styles - style objects which get merged together
 * Note: The first style object will serve as base
 * Existing values will get overwritten by default
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = assignStyles;

function assignStyles() {
  var property = undefined;

  for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  var newStyles = styles.splice(1);
  var base = styles[0];

  newStyles.forEach(function (styleObj) {
    if (styleObj instanceof Object) {
      Object.keys(styleObj).forEach(function (property) {
        var value = styleObj[property];
        if (!(base.hasOwnProperty(property) && isImportant(base[property]))) {
          if (base[property] instanceof Object && value instanceof Object) {
            base[property] = assignStyles({}, base[property], value);
          } else {
            base[property] = value;
          }
        }
      });
    }
  });
  return base;
}

/**
 * Checks if a property value is an css important rule with !important
 * @param {string} property - property thats value gets checked 
 */
var isImportant = function isImportant(value) {
  return typeof value == 'string' && value.toLowerCase().indexOf('!important') > -1;
};
module.exports = exports['default'];
},{}],28:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isObject = require('./utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = require('./utils/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Linter = (function () {
  /**
   * Instantiante a new linter
   * @param {Object} config - Linter configurations e.g. plugins
   */

  function Linter(config) {
    _classCallCheck(this, Linter);

    // configuration with plugins must be provided
    if (!(0, _isObject2.default)(config) || !(0, _isArray2.default)(config.plugins)) {
      console.error('You must provide a configuration object which at least contains an array of plugins.');
      return false;
    }

    // cache plugins and configuration
    this.plugins = config.plugins;
    this.config = config;
  }

  /**
   * Lints your styles
   * @return {Object[]} returns an array of warnings
   * @param {Object} styles - Style object that gets checked
   * @param {Object?} element - element information
   */

  _createClass(Linter, [{
    key: 'lint',
    value: function lint(styles) {
      var _this = this;

      var element = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      // Throw if styles is not an object
      if (!(0, _isObject2.default)(styles)) {
        console.error('You must provide a valid style object.');
        return false;
      }

      var warnings = [];
      // iterate every registered plugin to generate warnings
      this.plugins.forEach(function (plugin) {
        return plugin(styles, element, warnings, _this.config);
      });

      return warnings;
    }
  }]);

  return Linter;
})();

exports.default = Linter;
module.exports = exports['default'];
},{"./utils/isArray":38,"./utils/isObject":39}],29:[function(require,module,exports){
'use strict';Object.defineProperty(exports,"__esModule",{value:true});var dashToCamelCase=function dashToCamelCase(str){return str.replace(/-([a-z])/g,function(match){return match[1].toUpperCase()}).replace(/^Ms/g,'ms')};exports.default={alignContent:{value:{initial:'stretch',keywords:['center','flex-end','flex-start','space-around','space-between','stretch']},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},alignSelf:{value:{initial:'auto',keywords:['baseline','center','flex-end','flex-start','stretch']},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},alignItems:{value:{initial:'stretch',keywords:['baseline','center','flex-end','flex-start','stretch']},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},alignmentBaseline:{value:{initial:'auto',keywords:['auto','after-edge','alphabetic','baseline','before-edge','central','hanging','ideographic','mathematical','middle','text-after-edge','text-before-edge','use-script']}},animation:{value:{initial:'none',longhands:['animationName','animationDuration','animationTimingFunction','animationDelay','animationIterationCount','animationDirection','animationFillMode','animationPlayState']},compatibility:{full:{and_chr:47,and_uc:9.9,android:4,chrome:4,edge:12,firefox:5,ie:10,ie_mob:10,ios_saf:3.2,opera:12,safari:4},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:4,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:11.6,safari:3.2}}},animationDelay:{value:{initial:0,time:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:4,chrome:4,edge:12,firefox:5,ie:10,ie_mob:10,ios_saf:3.2,opera:12,safari:4},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:4,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:11.6,safari:3.2}}},animationDirection:{value:{initial:'normal',keywords:['alternate','alternate-reverse','normal','reverse']},compatibility:{full:{and_chr:47,and_uc:9.9,android:4,chrome:4,edge:12,firefox:5,ie:10,ie_mob:10,ios_saf:3.2,opera:12,safari:4},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:4,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:11.6,safari:3.2}}},animationDuration:{value:{initial:0,time:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:4,chrome:4,edge:12,firefox:5,ie:10,ie_mob:10,ios_saf:3.2,opera:12,safari:4},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:4,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:11.6,safari:3.2}}},animationFillMode:{value:{initial:'none',keywords:['backwards','both','forwards','none']},compatibility:{full:{and_chr:47,and_uc:9.9,android:2.4,chrome:4,edge:12,firefox:5,ie:10,ie_mob:10,ios_saf:3.2,opera:12,safari:4},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:4,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:11.6,safari:3.2}}},animationIterationCount:{value:{initial:1,float:true,keywords:['infinite'],positive:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:4,chrome:4,edge:12,firefox:5,ie:10,ie_mob:10,ios_saf:3.2,opera:12,safari:4},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:4,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:11.6,safari:3.2}}},animationName:{value:{initial:'none',keywords:['none'],string:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:4,chrome:4,edge:12,firefox:5,ie:10,ie_mob:10,ios_saf:3.2,opera:12,safari:4},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:4,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:11.6,safari:3.2}}},animationPlayState:{value:{initial:'running',keywords:['paused','running']},compatibility:{full:{and_chr:47,and_uc:9.9,android:4,chrome:4,edge:12,firefox:5,ie:10,ie_mob:10,ios_saf:3.2,opera:12,safari:4},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:4,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:11.6,safari:3.2}}},animationTimingFunction:{value:{cubicBezier:true,initial:'ease',keywords:['ease','ease-in','ease-in-out','ease-out','linear','step-end','step-start']},compatibility:{full:{and_chr:47,and_uc:9.9,android:4,chrome:4,edge:12,firefox:5,ie:10,ie_mob:10,ios_saf:3.2,opera:12,safari:4},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:4,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:11.6,safari:3.2}}},appearance:{value:{initial:'none'},compatibility:{issues:{condition:function condition(value){return value==='auto'},hint:'does not support \'auto\'.'},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:11,ie_mob:10,ios_saf:0,op_mini:5,opera:12.1,safari:0}}}, // TODO: complete
backdropFilter:{compatibility:{full:{ios_saf:9,safari:9},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:14,firefox:46,ie:11,ie_mob:11,ios_saf:8.1,op_mini:5,opera:36,safari:8}}},backfaceVisibility:{value:{initial:'visible',keywords:['hidden','visible']},compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},background:{value:{initial:0},longhands:['backgroundAttachment','backgroundBlendMode','backgroundClip','backgroundColor','backgroundImage','backgroundOrigin','backgroundPosition','backgroundPositionX','backgroundPositionY','backgroundRepeat','backgroundRepeatX','backgroundRepeatY','backgroundSize']},backgroundAttachment:{value:{initial:'scroll',keywords:['fixed','local','scroll']},compatibility:{issues:[{condition:function condition(value){return value==='local'},browser:{firefox:{upto:24},opera:10.1,android:{from:4.1,to:4.3},ie:{upto:8},safari:{upto:3},and_uc:true},hint:'does not support \'local\'.'},{condition:function condition(value){return value==='fixed'},browser:{ios_saf:{upto:7.1},and_chr:true},hint:'does not support \'local\'.'},{browser:{op_mini:true},hint:'is not supported.'}]}},backgroundBlendMode:{value:{initial:'normal',keywords:['color','color-burn','color-dodge','darken','difference','exclusion','hard-light','hue','lighten','luminosity','multiply','normal','overlay','saturation','screen','soft-light']},compatibility:{issues:[{condition:function condition(value){return value.match(/hue|saturation|color|luminosity/)!==null},browser:{safari:{upto:9},ios_saf:{upto:9.2}},hint:'does not support \'hue\', \'saturation\', \'color\' and \'luminosity\'.'},{condition:function condition(value){return value.match(/[,]/)!==null},browser:{ios_saf:true},hint:'does not support multiple blend-modes.'}]}},backgroundClip:{value:{initial:'border-box',keywords:['border-box','content-box','padding-box']},compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:15,edge:12,firefox:4,ie:9,ie_mob:10,ios_saf:7,opera:10.5,safari:7},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3.5,ie:8,ie_mob:0,ios_saf:0,op_mini:0,opera:9.5,safari:0}}},backgroundColor:{value:{color:true,initial:'transparent'}},backgroundImage:{value:{initial:'none',keywords:['none'],url:true},compatibility:{ // shorthand background to check too
issues:{condition:function condition(value){return value.match(/[.]svg/)!==null},browser:{safari:{upto:4},ios_saf:{upto:4.1}},hint:'does not support \'backgroundPosition\' if the background is a svg image.'}}},backgroundOrigin:{value:{initial:'padding-box',keywords:['border-box','content-box','padding-box']},compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:15,edge:12,firefox:4,ie:9,ie_mob:10,ios_saf:7,opera:10.5,safari:7},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3.5,ie:8,ie_mob:0,ios_saf:0,op_mini:0,opera:9.5,safari:0}}},backgroundPosition:{value:{initial:'0 0'},longhands:['backgroundPositionX','backgroundPositionY']},backgroundPositionX:{value:{initial:0,keywords:['bottom','center','left','right','top']},compatibility:{issues:{browser:{ie:9},hint:'does not support \'calc()\'.'}}},backgroundPositionY:{value:{initial:0,keywords:['bottom','center','left','right','top']},compatibility:{issues:{browser:{ie:9},hint:'does not support \'calc()\'.'}}},backgroundRepeat:{value:{initial:'repeat',keywords:['no-repeat','repeat','repeat-x','repeat-y']},longhands:['backgroundRepeatX','backgroundRepeatY']},backgroundRepeatX:{value:{initial:'repeat',keywords:['no-repeat','repeat','repeat-x','repeat-y']}},backgroundRepeatY:{value:{initial:'repeat',keywords:['no-repeat','repeat','repeat-x','repeat-y']}},backgroundSize:{value:{initial:'auto auto',keywords:['auto','contain','cover'],length:true,percentage:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:15,edge:12,firefox:4,ie:9,ie_mob:10,ios_saf:7,opera:10.5,safari:7},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3.5,ie:8,ie_mob:0,ios_saf:0,op_mini:0,opera:9.5,safari:0},issues:[{condition:function condition(value){return value.match(/%/)!==null},browser:{android:{upto:4.3}},hint:'does not support percentage values.'},{browser:{op_mini:true},hint:'is not supported.'}]}},baselineShift:{value:{initial:'auto',keywords:['baseline','sub','super','auto'],length:true,percentage:true}},border:{value:{initial:0,keywords:['none']},longhands:['borderWidth','borderStyle','borderColor']},borderBottom:{value:{initial:0,keywords:['none']},longhands:['borderBottomWidth','borderBottomStyle','borderBottomColor']},borderBottomColor:{value:{color:true,initial:'inherit'}},borderBottomLeftRadius:{value:{initial:0,length:true,percentage:true}},borderBottomRightRadius:{value:{initial:0,length:true,percentage:true}},borderBottomStyle:{value:{initial:'none',keywords:['dashed','dotted','double','groove','hidden','inset','none','outset','ridge','solid']}},borderBottomWidth:{value:{initial:'medium',keywords:['medium','thick','thin'],length:true}},borderCollapse:{value:{initial:'separate',keywords:['collapse','seperate']}},borderColor:{value:{color:true,initial:'inherit'},longhands:['borderTopColor','borderRightColor','borderBottomColor','borderLeftColor']},borderImage:{value:{initial:'none'},longhands:['borderImageOutset','borderImageRepeat','borderImageSlice','borderImageSource','borderImageWidth'],compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:15,edge:12,firefox:15,ie:11,ie_mob:11,ios_saf:6,opera:15,safari:6},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3,ie:10,ie_mob:10,ios_saf:0,op_mini:0,opera:10,safari:0}}},borderImageOutset:{value:{initial:0,float:true,length:true,positive:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:15,edge:12,firefox:15,ie:11,ie_mob:11,ios_saf:6,opera:15,safari:6},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3,ie:10,ie_mob:10,ios_saf:0,op_mini:0,opera:10,safari:0}}},borderImageRepeat:{value:{initial:'stretch',keywords:['repeat','round','stretch']},compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:15,edge:12,firefox:15,ie:11,ie_mob:11,ios_saf:6,opera:15,safari:6},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3,ie:10,ie_mob:10,ios_saf:0,op_mini:0,opera:10,safari:0}}},borderImageSlice:{value:{initial:'100%',float:true,keywords:['fill'],percentage:true,positive:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:15,edge:12,firefox:15,ie:11,ie_mob:11,ios_saf:6,opera:15,safari:6},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3,ie:10,ie_mob:10,ios_saf:0,op_mini:0,opera:10,safari:0}}},borderImageSource:{value:{initial:'none',keywords:['none'],url:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:15,edge:12,firefox:15,ie:11,ie_mob:11,ios_saf:6,opera:15,safari:6},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3,ie:10,ie_mob:10,ios_saf:0,op_mini:0,opera:10,safari:0}}},borderImageWidth:{value:{initial:1,float:true,length:true,percentage:true,positive:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:15,edge:12,firefox:15,ie:11,ie_mob:11,ios_saf:6,opera:15,safari:6},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3,ie:10,ie_mob:10,ios_saf:0,op_mini:0,opera:10,safari:0}}},borderLeft:{value:{initial:0,keywords:['none']},longhands:['borderLeftWidth','borderLeftStyle','borderLeftColor']},borderLeftColor:{value:{color:true,initial:'inherit'}},borderLeftStyle:{value:{initial:'none',keywords:['dashed','dotted','double','groove','hidden','inset','none','outset','ridge','solid']}},borderLeftWidth:{value:{initial:'medium',keywords:['medium','thick','thin'],length:true}},borderRadius:{value:{initial:0},longhands:['borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius'],compatibility:{full:{and_chr:47,and_uc:9.9,android:2.1,chrome:4,edge:12,firefox:3,ie:9,ie_mob:10,ios_saf:3.2,opera:10.5,safari:3.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:8,ie_mob:0,ios_saf:0,op_mini:5,opera:10,safari:0}}},borderRight:{value:{initial:0,keywords:['none']},longhands:['borderRightWidth','borderRightStyle','borderRightColor']},borderRightColor:{value:{color:true,initial:'inherit'}},borderRightStyle:{value:{initial:'none',keywords:['dashed','dotted','double','groove','hidden','inset','none','outset','ridge','solid']}},borderRightWidth:{value:{initial:'medium',keywords:['medium','thick','thin'],length:true}},borderSpacing:{value:{initial:0,length:true}},borderStyle:{value:{initial:'none',keywords:['dashed','dotted','double','groove','hidden','inset','none','outset','ridge','solid']},longhands:['borderTopStyle','borderRightStyle','borderBottomStyle','borderLeftStyle']},borderTop:{value:{initial:0,keywords:['none']},longhands:['borderTopWidth','borderTopStyle','borderTopColor']},borderTopColor:{value:{color:true,initial:'inherit'}},borderTopLeftRadius:{value:{initial:0,length:true,percentage:true}},borderTopRightRadius:{value:{initial:0,length:true,percentage:true}},borderTopStyle:{value:{initial:'none',keywords:['dashed','dotted','double','groove','hidden','inset','none','outset','ridge','solid']}},borderTopWidth:{value:{initial:'medium',keywords:['medium','thick','thin'],length:true}},borderWidth:{value:{initial:'medium'},longhands:['borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth']},bottom:{value:{initial:'auto',keywords:['auto'],length:true,percentage:true}},boxDecorationBreak:{compatibility:{full:{firefox:32,opera:11},partial:{and_chr:0,and_uc:9.9,android:4.2,chrome:21,edge:14,firefox:31,ie:11,ie_mob:11,ios_saf:6,op_mini:0,opera:10.6,safari:6}}},boxShadow:{value:{initial:'none'},compatibility:{full:{and_chr:47,and_uc:9.9,android:4,chrome:4,edge:12,firefox:3.5,ie:9,ie_mob:10,ios_saf:4,opera:10.5,safari:5},issues:[{condition:function condition(value){return value.replace(/(rgb[a]?|hsl[a]?)\(.*\)/g,'').match(/[,]/)!==null},browser:{safari:{upto:4},ios_saf:{upto:3.2},android:{upto:3}},hint:'does not support multiple shadows.'},{condition:function condition(value){return value.match(/inset/)!==null},browser:{safari:{upto:4},ios_saf:{upto:3.2},android:{upto:3}},hint:'does not support \'inset\'.'},{condition:function condition(value){var colorClean=value.replace(/rgb[a]?\(.*\)/g,'');var shadows=colorClean.split(',');var invalid=false;shadows.forEach(function(shadow){var colorSplit=shadow.split(' ');if(colorSplit.length>=3){if(colorSplit[2]==='0px'){invalid=true}}});return invalid},browser:{safari:{upto:6},ios_saf:{upto:6},android:{upto:2.3}},hint:'does not \'0px\' as blur radius.'},{ // general
// investigate later
browser:{safari:{upto:4},ios_saf:{upto:3.2},android:{upto:3}},hint:'does not support a blur radius.'}],partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3,ie:8,ie_mob:0,ios_saf:0,op_mini:5,opera:10,safari:0}}},boxSizing:{value:{initial:'content-box',keywords:['border-box','content-box']},compatibility:{full:{and_chr:47,and_uc:9.9,android:2.1,chrome:4,edge:12,firefox:2,ie:8,ie_mob:10,ios_saf:3.2,op_mini:5,opera:9.5,safari:3.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:0,ie_mob:0,ios_saf:0,op_mini:0,opera:9,safari:0}, // general
issues:{browser:{safari:6.0},hint:'is not supported on elements with \'display:table\'.'}}},bufferedRendering:{value:{initial:'auto',keywords:['auto','dynamic','static']}},breakBefore:{compatibility:{full:{and_uc:9.9,ios_saf:7,safari:6.1,edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},breakAfter:{compatibility:{full:{and_uc:9.9,ios_saf:7,safari:6.1,edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},breakInside:{compatibility:{full:{and_uc:9.9,ios_saf:7,safari:6.1,edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},captionSide:{value:{initial:'top',keywords:['bottom','top']}},clear:{value:{initial:'none',keywords:['both','left','none','right']}},clip:{value:{initial:'auto',keywords:['auto']}},clipPath:{value:{initial:'none',keywords:['border-box','content-box','fill-box','margin-box','none','padding-box','stroke-box','view-box'],url:true},compatibility:{issues:{condition:function condition(value){return value.match(/^url\(/)===null},browser:{firefox:true},hint:'only supports \'url()\'.'},partial:{and_chr:0,and_uc:9.9,android:4.2,chrome:23,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:6,op_mini:5,opera:12.1,safari:6.1}}},clipRule:{value:{initial:'nonezero',keywords:['evenodd','nonezero']}},color:{value:{color:true,initial:'inherit'}},colorInterpolation:{value:{initial:'sRGB',keywords:['auto','linearRGB','sRGB']}},colorInterpolationFilters:{value:{initial:'linearRGB',keywords:['auto','linearRGB','sRGB']}},colorProfile:{value:{initial:'auto',keywords:['auto','sRGB'],string:true,url:true}},colorRendering:{value:{initial:'auto',keywords:['auto','optimizeQuality','optimizeSpeed']}},columnCount:{value:{initial:'auto',integer:true,keywords:['auto','normal'],positive:true,notNull:true},compatibility:{full:{edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},columnFill:{value:{initial:'balance',keywords:['auto','balance']},compatibility:{full:{edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},columnGap:{value:{initial:'normal',keywords:['normal'],length:true},compatibility:{full:{edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},columnRule:{value:{initial:'medium none currentColor'},longhands:['columnRuleWidth','columnRuleStyle','columnRuleColor'],compatibility:{full:{edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},columnRuleColor:{value:{color:true,initial:'currentColor'},compatibility:{full:{edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},columnRuleStyle:{value:{initial:'none',keywords:['dashed','dotted','double','groove','hidden','inset','none','outset','ridge','solid']},compatibility:{full:{edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},columnRuleWidth:{value:{initial:'none',keywords:['medium','thick','thin'],length:true},compatibility:{full:{edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},columnSpan:{value:{initial:1,keywords:[1,'all']},compatibility:{full:{edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},columnWidth:{value:{initial:'auto',keywords:['auto'],length:true},compatibility:{full:{edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},columns:{value:{initial:'auto auto',keywords:['auto']},longhands:['columnWidth','columnCount'],compatibility:{full:{edge:12,ie:10,ie_mob:10,op_mini:5,opera:11.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:11,safari:0}}},content:{value:{initial:'normal',keywords:['attr','close-quote','counter','no-close-quote','no-open-quote','none','normal','open-quote'],string:true,url:true}},counterIncrement:{value:{initial:'none',keywords:['none']}},counterReset:{value:{initial:'none',keywords:['none']}},cursor:{value:{initial:'auto',keywords:['alias','all-scroll','auto','cell','col-resize','context-menu','copy','crosshair','default','e-resize','ew-resize','grab','grabbing','help','move','n-resize','ne-resize','nesw-resize','no-drop','none','not-allowed','pointer','progress','row-resize','s-resize','se-resize','text','vertical-text','w-resize','wait','zoom-in','zoom-out'],url:true},compatibility:{issues:[{condition:function condition(value){return value.match(/alias|cell|copy|ew-resize|ns-resize|nesw-resize|nwse-resize|context-menu/)!==null},browser:{ie:{upto:8}},hint:'does not support \'alias\', \'cell\', \'copy\', \'ew-resize\', \'ns-resize\', \'nesw-resize\', \'nwse-resize\' and \'context-menu\'.'},{condition:function condition(value){return value.match(/url\(|none/)!==null},browser:{edge:true,opera:{upto:12.1}},hint:'does not support \'none\' and \'url()\'.'},{ // general
condition:function condition(value){return value.toLowerCase().match(/url\((.*[.]jpg|[.]png|[.]jpeg)\)/)!==null},hint:'does not support JPG and PNG on Macs.'},{ // general
condition:function condition(value){return value.match(/url\(/)!==null},browser:{ie:true},hint:'does only support the CUR format.'}]}},cx:{value:{initial:0,length:true}},cy:{value:{initial:0,length:true}},direction:{value:{initial:'ltr',keywords:['ltr','rtl']}},display:{value:{initial:'inline',keywords:['block','flex','inline','inline-block','inline-flex','inline-table','list-item','none','run-in','table','table-caption','table-cell','table-column','table-column-group','table-footer-group','table-header-group','table-row','table-row-group']},compatibility:{issues:{condition:function condition(value){return value==='inline-table'},browser:{firefox:{upto:2}},hint:'does not support \'inline-table\'.'}}},dominantBaseline:{value:{initial:'auto',keywords:['alphabetic','auto','central','hanging','ideographic','mathematical','middle','no-change','reset-size','text-after-edge','text-before-edge','use-script']}},emptyCells:{value:{initial:'show',keywords:['hide','show']}},enableBackground:{value:{initial:'accumuluate',keywords:['accumulate']}},fill:{value:{color:true,initial:'black'}},fillOpacity:{value:{initial:1,range:[0,1]}},fillRule:{value:{initial:'nonzero',keywords:['evenodd','nonzero']}},filter:{value:{initial:'none'},compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:18,firefox:35,ios_saf:6,opera:15,safari:6},partial:{and_chr:0,and_uc:0,android:4.2,chrome:17,edge:12,firefox:3.5,ie:11,ie_mob:11,ios_saf:5,op_mini:5,opera:12.1,safari:5.1},issues:[{condition:function condition(value){return value.match(/^url\(/)===null},browser:{firefox:{ // check that again
upto:33}},hint:'only supports \'url()\'.'},{condition:function condition(value){return value.match(/^url\(/)!==null},browser:{edge:{from:13,to:14}},hint:'does not support \'url()\'.'}]}},flex:{value:{initial:'0 1 auto',keywords:['auto']},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},flexBasis:{value:{initial:'auto',keywords:['auto','content','fill','fit-content','max-content','min-content'],length:true,percentage:true},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},flexDirection:{value:{initial:'row',keywords:['column','column-reverse','row','row-reverse']},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}}, // TODO: complete
flexFlow:{compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},flexGrow:{value:{float:true,initial:0,positive:true},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},flexShrink:{value:{float:true,initial:1,positive:true},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},flexWrap:{value:{initial:'nowrap',keywords:['nowrap','wrap','wrap-reverse']},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},float:{value:{initial:'none',keywords:['left','right','none']}},floodColor:{value:{color:true,initial:'black'}},floodOpacity:{value:{range:[0,1],initial:1}},flowInto:{compatibility:{full:{and_uc:9.9,ios_saf:7,safari:6.1},partial:{and_chr:47,and_uc:0,android:46,chrome:50,edge:0,firefox:46,ie:9,ie_mob:0,ios_saf:6,op_mini:5,opera:36,safari:6}}},flowFrom:{compatibility:{full:{and_uc:9.9,ios_saf:7,safari:6.1},partial:{and_chr:47,and_uc:0,android:46,chrome:50,edge:0,firefox:46,ie:9,ie_mob:0,ios_saf:6,op_mini:5,opera:36,safari:6}}},font:{value:{ // can also be used to specify systemfonts
// therefore is not only a shorthand property
initial:'normal'},longhands:['fontFamily','fontKerning','fontSize','fontStretch','fontStyle','fontVariant','fontWeight','lineHeight']}, // TODO: complete
fontKerning:{compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:29,firefox:34,ios_saf:8,opera:16,safari:7},partial:{and_chr:0,and_uc:0,android:4.2,chrome:28,edge:14,firefox:33,ie:11,ie_mob:11,ios_saf:7,op_mini:5,opera:15,safari:6.1}}},fontFamily:{value:{initial:'inherit',keywords:['cursive','fantasy','monospace','sans-serif','serif']}},fontFeatureSettings:{value:{initial:'normal'},compatibility:{full:{and_chr:47,and_uc:9.9,android:4.4,chrome:21,edge:12,firefox:15,ie:10,ios_saf:9.3,opera:15,safari:9.1},partial:{and_chr:0,and_uc:0,android:4.2,chrome:15,edge:0,firefox:3.6,ie:9,ie_mob:11,ios_saf:9,op_mini:5,opera:12.1,safari:9},issues:[{ // investigate on this one further to determine
// how exactly the older syntax looked like
browser:{firefox:{upto:14}},hint:'uses a slightly different syntax.'},{browser:{chrome:{upto:20}},hint:'does not support Macs.'}]}},fontSize:{value:{initial:'medium',keywords:['large','larger','medium','small','smaller','x-large','x-small','xx-large','xx-small'],length:true,percentage:true}},fontSmooth:{value:{initial:'auto'},compatibility:{issues:[{condition:function condition(value,styles){return !styles.WebkitFontSmoothing||styles.WebkitFontSmoothing.match(/^(none|antialiased|subpixel-antialiased)$/)===null},browser:{safari:true,chrome:true,opera:true},hint:'might not support \'fontSmooth\', use \'WebkitFontSmoothing\' with either \'none\', \'antialiased\' or \'subpixel-antialiased\'.'},{condition:function condition(value,styles){return !styles.MozOsxFontSmoothing||styles.MozOsxFontSmoothing.match(/^(auto|inherit|unset|grayscale)$/)===null},browser:{firefox:true},hint:'might not support \'fontSmooth\', use \'MozOsxFontSmoothing\' with either \'auto\', \'inherit\', \'unset\' or \'grayscale\'.'},{ // general
hint:'Only supported on Macs.'}]}},fontStretch:{value:{initial:'normal',keywords:['condensed','expanded','extra-condensed','extra-expanded','normal','semi-condensed','semi-expanded','ultra-condensed','ultra-expanded']}},fontStyle:{value:{initial:'normal',keywords:['italic','normal','oblique']}},fontSynthesis:{value:{initial:'weight style',keywords:['none','style','weight','weight style']}},fontVariant:{value:{initial:'normal',keywords:['normal','small-caps']},longhands:['fontVariantCaps','fontVariantNumeric','fontVariantAlternates','fontVariantLigatures','fontVariantEastAsian']},fontVariantCaps:{value:{initial:'normal',keywords:['normal','small-caps','all-small-caps','petite-caps','all-petite-caps','unicase','titling-caps']}},fontVariantNumeric:{value:{initial:'normal', // proper research on keywords
keywords:['normal']}},fontVariantAlternates:{value:{initial:'normal', // proper research on keywords
keywords:['normal']}},fontVariantLigatures:{value:{initial:'normal', // proper research on keywords
keywords:['normal']}},fontVariantEastAsian:{value:{initial:'normal', // proper research on keywords
keywords:['normal']}},fontVariantPosition:{value:{initial:'normal',keywords:['normal','sub','super']}},fontWeight:{value:{initial:'normal',keywords:[100,200,300,400,500,600,700,800,900,'bold','bolder','lighter','normal']}},glyphOrientationHorizontal:{value:{initial:'0deg',keywords:['0deg','90deg','180deg','270deg']}},glyphOrientationVertical:{value:{initial:'0deg',keywords:['auto','0deg','90deg','180deg','270deg']}},grid:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridArea:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridAutoColumns:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridAutoFlow:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridAutoRows:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridColumn:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridColumnStart:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridColumnEnd:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridColumnGap:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridGap:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridRow:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridRowEnd:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridRowStart:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridRowGap:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridTemplate:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridTemplateAreas:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridTemplateColumns:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},gridTemplateRows:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},hangingPunctuation:{value:{initial:'none',keywords:['allow-end','first','force-end','last','none']}},height:{value:{initial:'auto',keywords:['auto','available','fit-content','max-content','min-content'],length:true,percentage:true}},hyphens:{value:{initial:'none'},compatibility:{full:{edge:12,firefox:6,ie:10,ios_saf:4.2,safari:5.1},partial:{and_chr:47,and_uc:0,android:46,chrome:50,edge:0,firefox:5,ie:9,ie_mob:11,ios_saf:4,op_mini:5,opera:36,safari:5},issues:{condition:function condition(value){return value==='auto'},browser:{chrome:true,android:4.0},hint:'does not support \'auto\'.'}}},imageOrientation:{value:{initial:'0deg'},compatibility:{issues:{condition:function condition(value){return value.match(/[-][0-9]{1,3}deg/)!==null},browser:{firefox:true},hint:'does not support negative values.'}}},imageRendering:{value:{initial:'auto',keywords:['auto','crisp-edges','pixelated']}},isolation:{value:{initial:'auto',keywords:['auto','isolate']}},justifyContent:{value:{initial:'flex-start',keywords:['center','flex-end','flex-start','space-around','space-between']},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},justifyItems:{value:{initial:'auto',keywords:['auto','stretch']}},justifySelf:{value:{initial:'auto',keywords:['auto','stretch']}},kerning:{value:{initial:'auto',keywords:['auto','none','normal']}},left:{value:{initial:'auto',keywords:['auto'],length:true,percentage:true}},letterSpacing:{value:{initial:'normal',keywords:['normal'],length:true}},lightingColor:{value:{initial:'white',color:true}},lineHeight:{value:{initial:'normal',float:true,keywords:['normal'],length:true,percentage:true,positive:true},compatibility:{issues:{condition:function condition(value){return value.match(/calc\(/)!==null},browser:{firefox:true},hint:'does not support \'calc()\'.'}}},listStyleImage:{value:{initial:'none',keywords:['none'],url:true}},listStylePosition:{value:{initial:'outside',keywords:['inside','outside']}},listStyleType:{value:{initial:'disc',keywords:['arabic-indic','armenian','bengali','cambodian','circle','cjk-decimal','cjk-earthly-branch','cjk-heavenly-stem','cjk-ideographic','decimal','decimal-leading-zero','devanagari','disc','disclosure-closed','disclosure-open','ethiopic-numeric','gregorian','gujarati','gurmukhi','hebrew','hiragana','hiragana-iroha','japanese-formal','japanese-informal','kannada','katakana','katakana-iroha','khmer','koeran-hanja-informal','korean-hangul-formal','korean-hanja-formal','lao','lower-alpha','lower-armenian','lower-greek','lower-latin','lower-roman','malayalam','mongolian','myanmar','none','oriya','persian','simp-chinese-formal','simp-chinese-informal','square','tamil','telugu','thai','tibetan','trad-chinese-formal','trad-chinese-informal','upper-alpha','upper-armenian','upper-latin','upper-roman'],string:true}},listStyle:{value:{initial:'disc outside none',keywords:['none']},longhands:['listStyleType','listStylePosition','listStyleImage']},margin:{value:{initial:0},longhands:['marginTop','marginRight','marginBottom','marginLeft']},marginBottom:{value:{initial:0,keywords:['auto'],length:true,percentage:true}},marginLeft:{value:{initial:0,keywords:['auto'],length:true,percentage:true}},marginRight:{value:{initial:0,keywords:['auto'],length:true,percentage:true}},marginTop:{value:{initial:0,keywords:['auto'],length:true,percentage:true}},mask:{value:{initial:'none',keywords:['none'],url:true},longhands:['maskOrigin','maskClip','maskBorder'],compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskBorder:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskBorderMode:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskBorderOutset:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskBorderRepeat:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskBorderSlice:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskBorderSource:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskBorderWidth:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskClip:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskComposite:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskImage:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskMode:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskOrigin:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskPosition:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskRepeat:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskSize:{compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maskType:{value:{initial:'luminance',keywords:['alpha','luminance']},compatibility:{partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:14,firefox:3,ie:11,ie_mob:11,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},maxHeight:{value:{initial:'none',keywords:['fill-available','fit-content','max-content','min-content','none'],length:true,percentage:true},compatibility:{issues:{condition:function condition(value){return value==='inherit'},browser:{ie:7},hint:'does not support \'inherit\'.'}}},maxWidth:{value:{initial:'none',keywords:['fill-available','fit-content','max-content','min-content','none'],length:true,percentage:true},compatibility:{issues:[{condition:function condition(value){return value==='inherit'},browser:{ie:7},hint:'does not support \'inherit\'.'},{condition:function condition(value){return value==='inherit'},browser:{ie:{from:10,to:11}},hint:'does not support \'inherit\'.'}]}},minHeight:{value:{initial:0,keywords:['fill-available','fit-content','max-content','min-content','none'],length:true,percentage:true},compatibility:{issues:[{condition:function condition(value){return value==='inherit'},browser:{ie:7},hint:'does not support \'inherit\'.'},{ // general
// investigate later
browser:{firefox:true},hint:'does not support \'inherit\' on table elements.'},{condition:function condition(value,styles){return styles.display==='table'},browser:{firefox:true},hint:'does not support \'inherit\' combined with \'display:table\'.'}]}},minWidth:{value:{initial:0,keywords:['fill-available','fit-content','max-content','min-content','none'],length:true,percentage:true},compatibility:{issues:[{condition:function condition(value){return value==='inherit'},browser:{ie:7},hint:'does not support \'inherit\'.'},{condition:function condition(value){return value==='inherit'},browser:{ie:{from:10,to:11}},hint:'does not support \'inherit\'.'},{ // general
// investigate later
browser:{ios_saf:5.1},hint:'does not support \'inherit\' on table elements.'},{ // general
// investigate later
browser:{ie:true},hint:'is not support on input elements with type \'button\', \'submit\' and \'reset\'.'}]}},mixBlendMode:{value:{initial:'normal',keywords:['color','color-burn','color-dodge','darken','difference','exclusion','hard-light','hue','lighten','luminosity','multiply','normal','overlay','saturation','screen','soft-light']}},objectFit:{value:{initial:'fill',keywords:['contain','cover','fill','none','scale-down']},compatibility:{full:{and_chr:47,android:4.4,chrome:31,firefox:36,op_mini:5,opera:10.6},partial:{and_chr:0,and_uc:9.9,android:4.4,chrome:30,edge:14,firefox:35,ie:11,ie_mob:11,ios_saf:7,op_mini:0,opera:18,safari:7}}},objectPosition:{value:{initial:'50% 50%'},compatibility:{full:{and_chr:47,android:4.4,chrome:31,firefox:36,op_mini:5,opera:10.6},partial:{and_chr:0,and_uc:9.9,android:4.4,chrome:30,edge:14,firefox:35,ie:11,ie_mob:11,ios_saf:7,op_mini:0,opera:18,safari:7},issues:{browser:{safari:{upto:9},ios_saf:{upto:9.2}},hint:'is not supported.'}}},opacity:{value:{initial:'1',range:[0,1]}},order:{value:{initial:'0',integer:true,negative:true,positive:true},compatibility:{full:{and_chr:47,android:4.4,chrome:21,edge:12,firefox:28,ie_mob:11,ios_saf:7,op_mini:5,opera:12.1,safari:6.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:0,opera:12,safari:0}}},orphans:{value:{initial:0,integer:true,positive:true,notNull:true}},outline:{value:{initial:0},longhands:['outlineWidth','outlineStyle','outlineColor']},outlineColor:{value:{color:true,initial:'invert',keywords:['invert']}},outlineOffset:{value:{initial:0,length:true},compatibility:{issues:{browser:{ie:{upto:10}},hint:'is not supported.'}}},outlineStyle:{value:{initial:'none',keywords:['dashed','dotted','double','groove','hidden','inset','none','outset','ridge','solid']}},outlineWidth:{value:{initial:'medium',keywords:['medium','thick','thin'],length:true}},overflow:{value:{initial:'visible',keywords:['auto','hidden','scroll','visible']}},overflowWrap:{value:{initial:'normal',keywords:['break-word','normal']},compatibility:{issues:{condition:function condition(value,styles){return !styles.wordWrap},browser:{chrome:{upto:22},safari:{upto:6},opera:{upto:11.5},android:{upto:4.3},ios_saf:{upto:6.1},ie:true,firefox:true,op_mini:true,ie_mob:true,and_uc:true},hint:'might not be supported, use \'wordWrap\' as well.'}}},overflowX:{value:{initial:'visible',keywords:['auto','hidden','scroll','visible']}},overflowY:{value:{initial:'visible',keywords:['auto','hidden','scroll','visible']}},padding:{value:{initial:0,longhands:['paddingBottom','paddingLeft','paddingRight','paddingTop']}},paddingBottom:{value:{initial:0,length:true,percentage:true}},paddingLeft:{value:{initial:0,length:true,percentage:true}},paddingRight:{value:{initial:0,length:true,percentage:true}},paddingTop:{value:{initial:0,length:true,percentage:true}},pageBreakAfter:{value:{initial:'auto',keywords:['always','auto','avoid','left','right']},compatibility:{issues:{ // not for opera!
// TODO: complete browser requests
condition:function condition(value){return value==='avoid'},hint:'does not support \'avoid\'.'}}},pageBreakBefore:{value:{initial:'auto',keywords:['always','auto','avoid','left','right']},compatibility:{issues:{ // not for opera!
// TODO: complete browser requests
condition:function condition(value){return value==='avoid'},hint:'does not support \'avoid\'.'}}},pageBreakInside:{value:{initial:'auto',keywords:['auto','avoid']}},paintOrder:{value:{initial:'normal',keywords:['fill','markers','normal','stroke']}},perspective:{value:{initial:'none',keywords:['none'],length:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},perspectiveOrigin:{value:{initial:'50% 50%'},longhands:['perspectiveOriginX','perspectiveOriginY'],compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},perspectiveOriginX:{value:{initial:'50%',keywords:['center','left','right'],length:true,percentage:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},perspectiveOriginY:{value:{initial:'50%',keywords:['center','left','right'],length:true,percentage:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2}}},pointerEvents:{value:{initial:'auto',keywords:['all','auto','fill','none','painted','stroke','visible','visibleFill','visiblePainted','visibleStroke']}},position:{value:{initial:'static',keywords:['absolute','fixed','relative','static','sticky']},compatibility:{issues:{ // general
condition:function condition(value){return value==='sticky'},browser:{ios_saf:{upto:7}},hint:'does not support \'sticky\'.'}}},quotes:{value:{keywords:['none']}},r:{value:{initial:0,length:true}},regionFragment:{compatibility:{full:{and_uc:9.9,ios_saf:7,safari:6.1},partial:{and_chr:47,and_uc:0,android:46,chrome:50,edge:0,firefox:46,ie:9,ie_mob:0,ios_saf:6,op_mini:5,opera:36,safari:6}}},resize:{value:{initial:'none',keywords:['block','both','horizontal','inline','none','vertical']},compatibility:{full:{and_chr:47,android:46,chrome:4,firefox:4,opera:15,safari:4},partial:{and_chr:0,and_uc:9.9,android:4.4,chrome:0,edge:14,firefox:3.6,ie:11,ie_mob:11,ios_saf:9.3,op_mini:5,opera:12,safari:3.2},issues:{ // general
browser:{opera:{upto:12.1}},hint:'is only supported on \'<textarea>\'.'}}},rowGap:{compatibility:{partial:{and_chr:0,and_uc:9.9,android:4.1,chrome:24,edge:0,firefox:18,ie:8,ie_mob:0,ios_saf:5,op_mini:5,opera:27,safari:5.1}}},right:{value:{initial:'auto',keywords:['auto'],length:true,percentage:true}},rx:{value:{initial:0,length:true}},ry:{value:{initial:0,length:true}},scrollSnapCoordinate:{value:{initial:'none'},compatibility:{full:{firefox:39,ios_saf:9},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:0,firefox:38,ie:9,ie_mob:11,ios_saf:8.1,op_mini:5,opera:36,safari:8},issues:[{condition:function condition(value){return value==='none'},browser:{safari:9},hint:'does not support \'none\'.'},{condition:function condition(value){return value.match(/top|left|right|bottom/)!==null},browser:{safari:9},hint:'does not support length keywords \'top\', \'right\', \'left\' and \'bottom\'.'}]}},scrollSnapDestination:{value:{initial:'0px 0px'},compatibility:{full:{firefox:39,ios_saf:9},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:0,firefox:38,ie:9,ie_mob:11,ios_saf:8.1,op_mini:5,opera:36,safari:8},issues:{condition:function condition(value){return value.match(/top|left|right|bottom/)!==null},browser:{safari:9},hint:'does not support length keywords \'top\', \'right\', \'left\' and \'bottom\'.'}}}, // TODO: Complete
scrollSnapType:{compatibility:{full:{firefox:39,ios_saf:9},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:0,firefox:38,ie:9,ie_mob:11,ios_saf:8.1,op_mini:5,opera:36,safari:8}}},scrollSnapPointsX:{value:{initial:'none'},compatibility:{full:{firefox:39,ios_saf:9},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:0,firefox:38,ie:9,ie_mob:11,ios_saf:8.1,op_mini:5,opera:36,safari:8},issues:{condition:function condition(value){return value==='none'},browser:{safari:9},hint:'does not support \'none\'.'}}},scrollSnapPointsY:{value:{initial:'none'},compatibility:{full:{firefox:39,ios_saf:9},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:0,firefox:38,ie:9,ie_mob:11,ios_saf:8.1,op_mini:5,opera:36,safari:8},issues:{condition:function condition(value){return value==='none'},browser:{safari:9},hint:'does not support \'none\'.'}}},shapeImageThreshold:{compatibility:{full:{and_chr:47,android:46,chrome:37,ios_saf:8,opera:24,safari:7.1},partial:{and_chr:0,and_uc:9.9,android:4.4,chrome:36,edge:14,firefox:46,ie:11,ie_mob:11,ios_saf:7,op_mini:5,opera:23,safari:7}}},shapeImageMargin:{compatibility:{full:{and_chr:47,android:46,chrome:37,ios_saf:8,opera:24,safari:7.1},partial:{and_chr:0,and_uc:9.9,android:4.4,chrome:36,edge:14,firefox:46,ie:11,ie_mob:11,ios_saf:7,op_mini:5,opera:23,safari:7}}},shapeImageOutside:{compatibility:{full:{and_chr:47,android:46,chrome:37,ios_saf:8,opera:24,safari:7.1},partial:{and_chr:0,and_uc:9.9,android:4.4,chrome:36,edge:14,firefox:46,ie:11,ie_mob:11,ios_saf:7,op_mini:5,opera:23,safari:7}}},shapeRendering:{value:{initial:'auto',keywords:['auto','crispEdges','geometricPrecision','optimizeSpeed']}},speak:{value:{initial:'auto',keywords:['auto','none','normal']}},stopColor:{value:{color:true,initial:'black'}},stopOpacity:{value:{initial:1,range:[0,1]}},stroke:{value:{color:true,initial:'black'}},strokeDasharray:{value:{initial:'none'},compatibility:{issues:{condition:function condition(value){return value.match(/calc\(/)!==null},browser:{firefox:true},hint:'does not support \'calc()\'.'}}},strokeDashoffset:{value:{initial:1,length:true,percentage:true},compatibility:{issues:{condition:function condition(value){return value.match(/calc\(/)!==null},browser:{firefox:true},hint:'does not support \'calc()\'.'}}},strokeLinecap:{value:{initial:'butt',keywords:['butt','round','square']}},strokeLinejoin:{value:{initial:'miter',keywords:['bevel','miter','round']}},strokeOpacity:{value:{initial:1,range:[0,1]}},strokeWidth:{value:{initial:1,length:true,percentage:true},compatibility:{issues:{condition:function condition(value){return value.match(/calc\(/)!==null},browser:{firefox:true},hint:'does not support \'calc()\'.'}}},tabSize:{value:{initial:8,integer:true,length:true,positive:true},compatibility:{full:{and_chr:47,chrome:42,opera:29},partial:{and_chr:0,and_uc:9.9,android:4.2,chrome:20,edge:14,firefox:3.6,ie:11,ie_mob:11,ios_saf:6,op_mini:0,opera:10.5,safari:6},issues:{condition:function condition(value){return parseInt(value,10)!=value},browser:{chrome:{upto:41},opera:{upto:28},firefox:true,safari:true,op_mini:true,ios_saf:true,android:true},hint:'only supports integer values.'}}},tableLayout:{value:{initial:'auto',keywords:['auto','fixed']}},textAlign:{value:{initial:'inherit',keywords:['center','end','justify','justify-all','left','match-parent','right','start']}},textAlignLast:{value:{initial:'auto'},compatibility:{full:{and_chr:47,chrome:47,firefox:12,opera:34},partial:{and_chr:0,and_uc:9.9,android:46,chrome:46,edge:0,firefox:11,ie:0,ie_mob:0,ios_saf:9.3,op_mini:5,opera:36,safari:9.1}}},textAnchor:{value:{initial:'start',keywords:['end','middle','start']}},textDecoration:{value:{initial:'none'},longhands:['textDecorationColor','textDecorationStyle','textDecorationLine']},textDecorationColor:{value:{color:true,initial:'currentColor'},compatibility:{full:{firefox:6},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:14,firefox:5,ie:11,ie_mob:11,ios_saf:7,op_mini:5,opera:36,safari:7}}},textDecorationLine:{value:{initial:'none',keywords:['line-through','none','overline','underline']},compatibility:{full:{firefox:6},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:14,firefox:5,ie:11,ie_mob:11,ios_saf:7,op_mini:5,opera:36,safari:7}}},textDecorationStyle:{value:{initial:'solid'},compatibility:{full:{firefox:6},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:14,firefox:5,ie:11,ie_mob:11,ios_saf:7,op_mini:5,opera:36,safari:7}}},textDecorationSkip:{compatibility:{full:{firefox:6},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:14,firefox:5,ie:11,ie_mob:11,ios_saf:7,op_mini:5,opera:36,safari:7}}},textEmphasisPosition:{compatibility:{full:{ios_saf:7,safari:7.1},partial:{and_chr:0,and_uc:0,android:4.2,chrome:24,edge:14,firefox:46,ie:11,ie_mob:11,ios_saf:6,op_mini:5,opera:12.1,safari:6}}},textEmphasis:{compatibility:{full:{ios_saf:7,safari:7.1},partial:{and_chr:0,and_uc:0,android:4.2,chrome:24,edge:14,firefox:46,ie:11,ie_mob:11,ios_saf:6,op_mini:5,opera:12.1,safari:6}}},textEmphasisStyle:{compatibility:{full:{ios_saf:7,safari:7.1},partial:{and_chr:0,and_uc:0,android:4.2,chrome:24,edge:14,firefox:46,ie:11,ie_mob:11,ios_saf:6,op_mini:5,opera:12.1,safari:6}}},textEmphasisColor:{compatibility:{full:{ios_saf:7,safari:7.1},partial:{and_chr:0,and_uc:0,android:4.2,chrome:24,edge:14,firefox:46,ie:11,ie_mob:11,ios_saf:6,op_mini:5,opera:12.1,safari:6}}},textIndent:{value:{initial:0,length:true,percentage:true}},textOverflow:{value:{initial:'clip',keywords:['clip','ellipsis'],string:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:2.1,chrome:4,edge:12,firefox:7,ie:6,ie_mob:10,ios_saf:3.2,op_mini:5,opera:9,safari:3.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:5.5,ie_mob:0,ios_saf:0,op_mini:0,opera:0,safari:0},issues:[{ // general
browser:{ie:9},hint:'is not supported on \'<input>\' with type of \'text\'.'},{browser:{chrome:true,ie:true},hint:'is not supported on \'<select>\'.'}]}},textRendering:{value:{initial:'auto',keywords:['auto','geometricPrecision','optimizeLegibility','optimizeSpeed']}},textShadow:{value:{initial:'none'},compatibility:{issues:[{condition:function condition(value){return value.replace(/(rgb[a]?|hsl[a]?)\(.*\)/g,'').match(/[,]/)!==null},browser:{safari:{upto:3}},hint:'does not support multiple shadows.'},{ // to be improved for keyword matching
condition:function condition(value){return value.match(/[#]|rgb|hsl|[a-z]{3,}/)===null},browser:{safari:5.1},hint:'requires a color.'},{condition:function condition(value){var colorClean=value.replace(/rgb[a]?\(.*\)/g,'');var shadows=colorClean.split(',');var invalid=false;shadows.forEach(function(shadow){var colorSplit=shadow.split(' ');if(colorSplit.length>=3){if(colorSplit[2]==='0px'){invalid=true}}});return invalid},browser:{android:{upto:2.3}},hint:'does not \'0px\' as blur radius.'}]}},textSizeAdjust:{compatibility:{full:{and_uc:9.9,ie_mob:10,ios_saf:5},partial:{and_chr:47,and_uc:0,android:46,chrome:50,edge:14,firefox:46,ie:11,ie_mob:0,ios_saf:4.2,op_mini:5,opera:36,safari:9.1}}},textTransform:{value:{initial:'none',keywords:['capitalize','full-width','lowercase','none','uppercase']}},textUnderlinePosition:{value:{initial:'auto',keywords:['above','auto','auto-pos','below','left','right','under']}},top:{value:{initial:'auto',keywords:['auto'],length:true,percentage:true}},touchAction:{compatibility:{full:{and_chr:47,android:46,chrome:36,edge:12,ie:10,ie_mob:10,ios_saf:9.3,opera:23,safari:9.1},partial:{and_chr:0,and_uc:9.9,android:4.4,chrome:35,edge:0,firefox:46,ie:9,ie_mob:0,ios_saf:9,op_mini:5,opera:22,safari:9}}},transform:{value:{initial:'none'},compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ie:9,ie_mob:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2},issues:{condition:function condition(value){return value.match(/calc\(/)!==null},browser:{ie:true},hint:'does not support \'calc()\'.'}}},transformOrigin:{value:{initial:'50% 50% 0',keywords:['bottom','center','left','right','top'],length:true,percentage:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ie:9,ie_mob:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2},issues:{ // general
browser:{firefox:{upto:42}},hint:'is not supported.'}}},transformOriginX:{value:{initial:'50%',keywords:['center','left','right'],length:true,percentage:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ie:9,ie_mob:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2},issues:{ // general
browser:{firefox:{upto:42}},hint:'is not supported.'}}},transformOriginY:{value:{initial:'50%',keywords:['bottom','center','top'],length:true,percentage:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ie:9,ie_mob:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2},issues:{ // general
browser:{firefox:{upto:42}},hint:'is not supported.'}}},transformOriginZ:{value:{initial:0,length:true,percentage:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2},issues:{ // general
browser:{firefox:{upto:42}},hint:'is not supported.'}}},transformStyle:{value:{initial:'flat',keywords:['flat','preserve-3d']},compatibility:{full:{and_chr:47,and_uc:9.9,android:3,chrome:12,edge:12,firefox:10,ios_saf:3.2,opera:15,safari:4},partial:{and_chr:0,and_uc:0,android:2.3,chrome:11,edge:0,firefox:9,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:3.2},issues:{condition:function condition(value){return value==='preserve-3d'},browser:{ie:true},hint:'does not support \'preserve-3d\'.'}}},transition:{value:{initial:'none'},longhands:['transitionProperty','transitionDuration','transitionTimingFunction','transitionDelay'],compatibility:{full:{and_chr:47,and_uc:9.9,android:2.1,chrome:4,edge:12,firefox:4,ie:10,ie_mob:10,ios_saf:3.2,opera:10.5,safari:3.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3.6,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:10,safari:0},issues:[{condition:function condition(value){return value.match(/background-size/)!==null},browser:{ie:{upto:10}},hint:'does not support transitions on \'background-size\'.'},{condition:function condition(value){return value.match(/fill/)!==null},browser:{ie:11},hint:'does not support transitions on SVG \'fill\'.'}]}},transitionDelay:{value:{initial:'0s',time:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:2.1,chrome:4,edge:12,firefox:4,ie:10,ie_mob:10,ios_saf:3.2,opera:10.5,safari:3.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3.6,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:10,safari:0}}},transitionDuration:{value:{initial:'0s',time:true},compatibility:{full:{and_chr:47,and_uc:9.9,android:2.1,chrome:4,edge:12,firefox:4,ie:10,ie_mob:10,ios_saf:3.2,opera:10.5,safari:3.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3.6,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:10,safari:0}}},transitionProperty:{value:{initial:'none',keywords:['all','none']},compatibility:{full:{and_chr:47,and_uc:9.9,android:2.1,chrome:4,edge:12,firefox:4,ie:10,ie_mob:10,ios_saf:3.2,opera:10.5,safari:3.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3.6,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:10,safari:0},issues:[{condition:function condition(value,styles){var props=value.split(',');var invalid=false;props.forEach(function(prop){var camelCasedProp=dashToCamelCase(prop);if(styles[camelCasedProp]&&styles[camelCasedProp].toString().match(/calc\(/)!==null){invalid=true}});return invalid},browser:{ie:true},hint:'does not support transitions on properties with \'calc\'.'},{condition:function condition(value){return value.match(/background-size/)!==null},browser:{ie:{upto:10}},hint:'does not support transitions on \'background-size\'.'},{condition:function condition(value){return value.match(/fill/)!==null},browser:{ie:11},hint:'does not support transitions on SVG \'fill\'.'}]}},transitionTimingFunction:{value:{cubicBezier:true,initial:'ease',keywords:['ease','ease-in','ease-in-out','ease-out','linear','step-end','step-start']},compatibility:{full:{and_chr:47,and_uc:9.9,android:2.1,chrome:4,edge:12,firefox:4,ie:10,ie_mob:10,ios_saf:3.2,opera:10.5,safari:3.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:3.6,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:10,safari:0}}},unicodeBidi:{value:{initial:'normal',keywords:['bidi-override','embed','isolate','isolate-override','normal','plaintext']}}, // TODO: complete
userSelect:{compatibility:{full:{and_chr:47,and_uc:9.9,android:2.1,chrome:4,edge:12,firefox:2,ie:10,ie_mob:10,ios_saf:3.2,opera:15,safari:3.1},partial:{and_chr:0,and_uc:0,android:0,chrome:0,edge:0,firefox:0,ie:9,ie_mob:0,ios_saf:0,op_mini:5,opera:12.1,safari:0}}},verticalAlign:{value:{initial:'baseline',keywords:['baseline','bottom','middle','sub','super','text-bottom','text-top','top'],length:true,percentage:true}},visibility:{value:{initial:'visible',keywords:['collapse','hidden','visible']}},whiteSpace:{value:{initial:'normal',keywords:['normal','nowrap','pre','pre-line','pre-wrap']}},widows:{value:{initial:0,integer:true,positive:true,notNull:true}},width:{value:{initial:'auto',keywords:['auto','available','fit-content','max-content','min-content'],length:true,percentage:true}},wordBreak:{value:{initial:'normal',keywords:['break-all','keep-all','normal']},compatibility:{issues:{condition:function condition(value){return value==='keep-all'},browser:{chrome:{upto:43},safari:{upto:8},opera:{upto:30},ios_saf:{upto:8.4},android:{upto:4.4},and_uc:true},hint:'does not support \'keep-all\'.'}}},wordSpacing:{value:{initial:'normal',keywords:['normal'],length:true,percentage:true}},wordWrap:{value:{initial:'normal',keywords:['break-word','normal']}},wrapFlow:{compatibility:{partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:0,firefox:46,ie:9,ie_mob:0,ios_saf:9.3,op_mini:5,opera:36,safari:9.1},full:{edge:12,ie:10,ie_mob:10}}},wrapMargin:{compatibility:{partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:0,firefox:46,ie:9,ie_mob:0,ios_saf:9.3,op_mini:5,opera:36,safari:9.1},full:{edge:12,ie:10,ie_mob:10}}},wrapThrough:{compatibility:{full:{edge:12,ie:10,ie_mob:10},partial:{and_chr:47,and_uc:9.9,android:46,chrome:50,edge:0,firefox:46,ie:9,ie_mob:0,ios_saf:9.3,op_mini:5,opera:36,safari:9.1}}},writingMode:{value:{initial:'horizontal-tb',keywords:['horizontal-tb','lr','lr-tb','rb-rl','rl','sideways-lr','sideways-rl','tb','vertical-lr','vertical-rl']},compatibility:{issues:{condition:function condition(value){return value!=='ltr'||value!=='rtl'},browser:{ie:true},hint:'does only support \'ltr\' and \'rtl\'.'}}},x:{value:{initial:0,length:true}},y:{value:{initial:0,length:true}},zIndex:{value:{initial:'auto',integer:true,keywords:['auto'],negative:true,positive:true}},zoom:{value:{float:true,initial:'normal',keywords:['normal'],percentage:true,positive:true}}};module.exports=exports['default'];
},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Plugins = undefined;

var _Linter = require('./Linter');

var _Linter2 = _interopRequireDefault(_Linter);

var _shorthandLonghand = require('./plugins/shorthandLonghand');

var _shorthandLonghand2 = _interopRequireDefault(_shorthandLonghand);

var _noVendorPrefix = require('./plugins/noVendorPrefix');

var _noVendorPrefix2 = _interopRequireDefault(_noVendorPrefix);

var _noInitialValue = require('./plugins/noInitialValue');

var _noInitialValue2 = _interopRequireDefault(_noInitialValue);

var _preferNumber = require('./plugins/preferNumber');

var _preferNumber2 = _interopRequireDefault(_preferNumber);

var _requireUnit = require('./plugins/requireUnit');

var _requireUnit2 = _interopRequireDefault(_requireUnit);

var _compatibility = require('./plugins/compatibility');

var _compatibility2 = _interopRequireDefault(_compatibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Plugins = exports.Plugins = {
  noVendorPrefix: _noVendorPrefix2.default,
  shorthandLonghand: _shorthandLonghand2.default,
  noInitialValue: _noInitialValue2.default,
  preferNumber: _preferNumber2.default,
  requireUnit: _requireUnit2.default,
  compatibility: _compatibility2.default
};

exports.default = _Linter2.default;
},{"./Linter":28,"./plugins/compatibility":31,"./plugins/noInitialValue":32,"./plugins/noVendorPrefix":33,"./plugins/preferNumber":34,"./plugins/requireUnit":35,"./plugins/shorthandLonghand":36}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propertyMap = require('../data/propertyMap');

var _propertyMap2 = _interopRequireDefault(_propertyMap);

var _browserNames = require('../utils/browserNames');

var _browserNames2 = _interopRequireDefault(_browserNames);

var _targetBrowser = require('../utils/targetBrowser');

var _targetBrowser2 = _interopRequireDefault(_targetBrowser);

var _unprefixStyles = require('../utils/unprefixStyles');

var _unprefixStyles2 = _interopRequireDefault(_unprefixStyles);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE = 'COMPATIBILITY';

var getVersionString = function getVersionString(version) {
  var versionIdent = undefined;
  if (version.upto) {
    versionIdent = '<=' + version.upto;
  } else if (version.from) {
    versionIdent = version.from + '-' + version.to;
  } else if (version === true) {
    versionIdent = 'all';
  } else {
    versionIdent = version;
  }
  return versionIdent;
};

// Checks if there are browser compatibility issues
// Uses data collected from caniuse

exports.default = function (oldStyles, element, warnings, _ref) {
  var compatibility = _ref.compatibility;

  var styles = (0, _unprefixStyles2.default)(oldStyles);

  var target = _targetBrowser2.default;

  if (compatibility && compatibility.targetBrowser) {
    target = compatibility.targetBrowser;
  }

  // default support
  if (!compatibility || compatibility.default !== false) {
    Object.keys(styles).forEach(function (property) {
      var supportData = _propertyMap2.default[property] ? _propertyMap2.default[property].compatibility : false;

      if (supportData) {
        (function () {
          var browserVersions = supportData.full || {};
          // if partial support is used
          // partial support data gets considered as well
          if (compatibility.partial !== false && supportData.partial) {
            browserVersions = (0, _objectAssign2.default)({}, browserVersions, supportData.partial);
          }

          // Check if there is support data at all
          if (Object.keys(browserVersions).length >= 1) {
            (function () {
              var value = styles[property]; // eslint-disable-line
              // Iterate every browser
              Object.keys(target).forEach(function (name) {
                var version = browserVersions[name]; // eslint-disable-line

                // if version is true, every version is affected
                if (version === undefined || target[name] < version) {
                  warnings.push({
                    type: TYPE,
                    hint: '\'' + property + '\' is not ' + (compatibility.partial !== false ? '' : 'fully ') + 'supported on ' + _browserNames2.default[name] + ' up to version ' + version + '.',
                    property: property,
                    mode: compatibility.partial ? 'partial' : 'full',
                    browser: _browserNames2.default[name],
                    version: version,
                    value: value
                  });
                }
              });
            })();
          }
        })();
      }
    });
  }

  // support issues
  if (!compatibility || compatibility.issues !== false) {
    Object.keys(styles).forEach(function (property) {
      var data = _propertyMap2.default[property] ? _propertyMap2.default[property].compatibility : false;

      if (data && data.issues) {
        (function () {
          var issues = data.issues;
          if (issues instanceof Array !== true) {
            issues = [issues];
          }

          var value = styles[property]; // eslint-disable-line
          // Iterate every basic issue
          issues.forEach(function (issue) {
            var condition = issue.condition;
            var browser = issue.browser;
            var hint = issue.hint;
            // No condition automatically validates as true

            if (condition === undefined || condition(value.toString(), styles, element)) {
              // if no browsers data is provided
              // it automatically is a global issue
              if (!browser) {
                warnings.push({
                  type: TYPE,
                  hint: 'Every browser ' + hint,
                  property: property,
                  value: value
                });
                return true;
              }
              // Iterate every browser
              Object.keys(browser).forEach(function (name) {
                var version = browser[name]; // eslint-disable-line
                var maxVersion = version || version.to || version.upto;
                // if version is true, every version is affected
                if (target[name] && (maxVersion === true || target[browser] <= maxVersion)) {
                  warnings.push({
                    type: TYPE,
                    hint: '\'' + property + '\' on ' + _browserNames2.default[name] + ' (Version: \' + ' + getVersionString(version) + ') ' + hint, // eslint-disable-line
                    property: property,
                    browser: _browserNames2.default[name],
                    version: version === true ? 'all' : version,
                    value: value
                  });
                }
              });
            }
          });
        })();
      }
    });
  }
};

module.exports = exports['default'];
},{"../data/propertyMap":29,"../utils/browserNames":37,"../utils/targetBrowser":41,"../utils/unprefixStyles":43,"object-assign":45}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propertyMap = require('../data/propertyMap');

var _propertyMap2 = _interopRequireDefault(_propertyMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE = 'NO_INITIAL_VALUE';
var getHint = function getHint(property, value) {
  return 'Initial value \'' + property + ': ' + value + '\' does not need to be set explicitly.';
};

var initialMap = {};
Object.keys(_propertyMap2.default).forEach(function (property) {
  if (_propertyMap2.default[property].value && _propertyMap2.default[property].value.initial) {
    initialMap[property] = _propertyMap2.default[property].value.initial;
  }
});

// Checks if there are properties using initial property values
// Warns that those can be left over as they're set anyway

exports.default = function (styles, element, warnings) {
  Object.keys(styles).forEach(function (property) {
    var value = styles[property]; // eslint-disable-line

    if (initialMap[property] && initialMap[property] == value) {
      // eslint-disable-line
      warnings.push({
        type: TYPE,
        hint: getHint(property, value),
        property: property,
        value: value
      });
    }
  });
};

module.exports = exports['default'];
},{"../data/propertyMap":29}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPE = 'NO_VENDOR_PREFIX';
var getHint = function getHint(property, value, suggestion, isValueIssue) {
  if (isValueIssue) {
    return '\'' + property + ': ' + value + '\' does not need vendor prefixes. Use \'' + property + ': ' + suggestion + '\'.';
  }
  return '\'' + property + ': ' + value + '\' does not need vendor prefixes. Use \'' + suggestion + ': ' + value + '\'.';
};

var uncapitalizeString = function uncapitalizeString(str) {
  return str.substr(0, 1).toLowerCase() + str.substr(1, str.length - 1);
};

// Checks if any vendor prefixes have been set manually
// Adds those to the warnings list with the specific property/value

exports.default = function (styles, element, warnings) {
  var jsPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
  var cssPrefixes = ['-webkit-', '-moz-', '-o-', '-ms-'];

  Object.keys(styles).forEach(function (property) {
    var value = styles[property]; // eslint-disable-line

    jsPrefixes.forEach(function (prefix) {
      if (property.indexOf(prefix) === 0) {
        var suggestion = uncapitalizeString(property.replace(new RegExp(prefix, 'g'), ''));

        warnings.push({
          type: TYPE,
          hint: getHint(property, value, suggestion, false),
          property: property,
          suggestion: suggestion
        });
      }
    });

    // checks if any value includes prefixes
    cssPrefixes.forEach(function (prefix) {
      if (typeof value === 'string' && value.indexOf(prefix) > -1) {
        var suggestion = value.replace(new RegExp(prefix, 'g'), '');

        warnings.push({
          type: TYPE,
          hint: getHint(property, value, suggestion, true),
          property: property,
          value: value,
          suggestion: suggestion
        });
      }
    });
  });
};

module.exports = exports['default'];
},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPE = 'PREFER_NUMBER';
var getHint = function getHint(property, value, suggestion) {
  return 'Prefer numbers for \'' + property + ': ' + value + '\'. Use \'' + property + ': ' + suggestion + '\' instead.';
};

// Checks if number values are specified as a string
// Numbers are prefered in this case

exports.default = function (styles, element, warnings) {
  Object.keys(styles).forEach(function (property) {
    var value = styles[property]; // eslint-disable-line

    if (typeof value === 'string') {
      var number = value.trim().substr(0, value.length - 2);
      var unit = value.trim().substr(value.length - 2, 2);

      if (unit === 'px' && parseFloat(value).toString() === number || value === '0') {
        var suggestion = parseFloat(value);

        warnings.push({
          type: TYPE,
          hint: getHint(property, value, suggestion),
          property: property,
          value: value,
          suggestion: suggestion
        });
      }
    }
  });
};

module.exports = exports['default'];
},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUnitlessProperty = require('../utils/isUnitlessProperty');

var _isUnitlessProperty2 = _interopRequireDefault(_isUnitlessProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE = 'REQUIRE_UNIT';
var getHint = function getHint(property, value, suggestion) {
  return 'Numbers (' + value + ') are not allowed for \'' + property + '\'. Use \'' + suggestion + '\' instead.';
};

// Checks if number values are used
// Units are required

exports.default = function (styles, element, warnings) {
  Object.keys(styles).forEach(function (property) {
    var value = styles[property]; // eslint-disable-line

    if (!(0, _isUnitlessProperty2.default)(property) && typeof value === 'number') {
      var suggestion = value + 'px';

      warnings.push({
        type: TYPE,
        hint: getHint(property, value, suggestion),
        property: property,
        value: value,
        suggestion: suggestion
      });
    }
  });
};

module.exports = exports['default'];
},{"../utils/isUnitlessProperty":40}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propertyMap = require('../data/propertyMap');

var _propertyMap2 = _interopRequireDefault(_propertyMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE = 'SHORTHAND_LONGHAND';
var getHint = function getHint(shorthand, longhands) {
  return 'Do not mix longhands \'' + longhands.join(', ') + '\' with their shorthand \'' + shorthand + '\'.';
};

// Checks if any longhand and shorthand values are mixed together
// A lot was taken from Radium's check-props-plugin on 12/07/2015 and improved
// https://github.com/FormidableLabs/radium/blob/master/src/plugins/check-props-plugin.js

exports.default = function (styles, element, warnings) {
  var properties = Object.keys(styles);

  properties.forEach(function (shorthand) {
    // Check if property is a shorthand property
    if (_propertyMap2.default[shorthand] && _propertyMap2.default[shorthand].longhands) {
      (function () {
        var longhand = _propertyMap2.default[shorthand].longhands;
        var usedLonghands = [];

        // Check if any longhand property was used next to the shorthand
        properties.forEach(function (property) {
          if (longhand.indexOf(property) !== -1) {
            // add them to a list of used longhands
            usedLonghands.push(property);
          }
        });

        if (usedLonghands.length > 0) {
          warnings.push({
            type: TYPE,
            hint: getHint(shorthand, usedLonghands),
            shorthand: shorthand,
            longhands: usedLonghands
          });
        }
      })();
    }
  });
};

module.exports = exports['default'];
},{"../data/propertyMap":29}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  chrome: 'Chrome',
  android: 'Android',
  firefox: 'Firefox',
  ios_saf: 'iOS Safari',
  safari: 'Safari',
  ie: 'Internet Explorer',
  ie_mob: 'mobile Internet Explorer',
  edge: 'Edge',
  opera: 'Opera',
  op_mini: 'Mini',
  and_uc: 'Android UC Browser',
  and_chr: 'Android Chrome'
};
module.exports = exports['default'];
},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (arr) {
  return arr && Array.isArray(arr);
};

module.exports = exports['default'];
},{}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (obj) {
  return obj && obj instanceof Object === true && !Array.isArray(obj);
};

module.exports = exports['default'];
},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Taken directly from React core
// https://github.com/facebook/react/blob/master/src/renderers/dom/shared/CSSProperty.js
var unitlessProperties = {
  animationIterationCount: true,
  borderImageOutset: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
var getPrefixedKey = function getPrefixedKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.slice(1);
};

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(unitlessProperties).forEach(function (property) {
  return prefixes.forEach(function (prefix) {
    return unitlessProperties[getPrefixedKey(prefix, property)] = true;
  });
});

exports.default = function (property) {
  return unitlessProperties[property] ? true : false;
};

module.exports = exports['default'];
},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  chrome: 30,
  android: 4,
  firefox: 25,
  ios_saf: 6,
  safari: 6,
  ie: 9,
  ie_mob: 9,
  edge: 12,
  opera: 13,
  op_mini: 5,
  and_uc: 9,
  and_chr: 30
};
module.exports = exports['default'];
},{}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (property) {
  var unprefixed = property.replace(/^(ms|Webkit|Moz|O)/, '');
  return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1);
};

module.exports = exports['default'];
},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unprefixProperty = require('./unprefixProperty');

var _unprefixProperty2 = _interopRequireDefault(_unprefixProperty);

var _unprefixValue = require('./unprefixValue');

var _unprefixValue2 = _interopRequireDefault(_unprefixValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (styles) {
  var newStyles = {};

  Object.keys(styles).forEach(function (property) {
    newStyles[(0, _unprefixProperty2.default)(property)] = (0, _unprefixValue2.default)(styles[property]);
  });

  return newStyles;
};

module.exports = exports['default'];
},{"./unprefixProperty":42,"./unprefixValue":44}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return value.replace(/(-ms-|-webkit-|-moz-|-o-)/g, '');
};

module.exports = exports['default'];
},{}],45:[function(require,module,exports){
/* eslint-disable no-unused-vars */
'use strict';
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = calc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = require('../utils/joinPrefixedRules');

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

function calc(property, value) {
  if (typeof value === 'string' && value.indexOf('calc(') > -1) {
    return (0, _utilsJoinPrefixedRules2['default'])(property, value, function (prefix, value) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    });
  }
}

module.exports = exports['default'];
},{"../utils/joinPrefixedRules":59}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = cursor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = require('../utils/joinPrefixedRules');

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var values = {
  'zoom-in': true,
  'zoom-out': true,
  'grab': true,
  'grabbing': true
};

function cursor(property, value) {
  if (property === 'cursor' && values[value]) {
    return (0, _utilsJoinPrefixedRules2['default'])(property, value);
  }
}

module.exports = exports['default'];
},{"../utils/joinPrefixedRules":59}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = {
  'flex': true,
  'inline-flex': true
};

function flex(property, value) {
  if (property === 'display' && values[value]) {
    return {
      display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value].join(';' + (0, _utilsCamelToDashCase2['default'])(property) + ':')
    };
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":57}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxIE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

function flexboxIE(property, value) {
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}

module.exports = exports['default'];
},{}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxOld;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value) {
  if (property === 'flexDirection') {
    return {
      WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
      WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
    };
  }
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":57}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = gradient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = require('../utils/joinPrefixedRules');

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && value.match(values) !== null) {
    return (0, _utilsJoinPrefixedRules2['default'])(property, value);
  }
}

module.exports = exports['default'];
},{"../utils/joinPrefixedRules":59}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sizing;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = require('../utils/joinPrefixedRules');

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties[property] && values[value]) {
    return (0, _utilsJoinPrefixedRules2['default'])(property, value);
  }
}

module.exports = exports['default'];
},{"../utils/joinPrefixedRules":59}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = transition;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var _utilsCapitalizeString = require('../utils/capitalizeString');

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsUnprefixProperty = require('../utils/unprefixProperty');

var _utilsUnprefixProperty2 = _interopRequireDefault(_utilsUnprefixProperty);

var _prefixProps = require('../prefixProps');

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var properties = { transition: true, transitionProperty: true };

function transition(property, value) {
  // also check for already prefixed transitions
  var unprefixedProperty = (0, _utilsUnprefixProperty2['default'])(property);
  if (typeof value === 'string' && properties[unprefixedProperty]) {
    var _ref2;

    var _ret = (function () {
      // only split multi values, not cubic beziers
      var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

      // iterate each single value and check for transitioned properties
      // that need to be prefixed as well
      multipleValues.forEach(function (val, index) {
        multipleValues[index] = Object.keys(_prefixProps2['default']).reduce(function (out, prefix) {
          var dashCasePrefix = '-' + prefix.toLowerCase() + '-';

          Object.keys(_prefixProps2['default'][prefix]).forEach(function (prop) {
            var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(prop);
            if (val.indexOf(dashCaseProperty) > -1) {
              // join all prefixes and create a new value
              out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
            }
          });
          return out;
        }, val);
      });

      var outputValue = multipleValues.join(',');

      if (unprefixedProperty !== property) {
        return {
          v: _defineProperty({}, property, outputValue)
        };
      }

      return {
        v: (_ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _utilsCapitalizeString2['default'])(property), outputValue.split(',').filter(function (value) {
          return value.match(/-moz-|-ms-/) === null;
        }).join(',')), _defineProperty(_ref2, property, outputValue), _ref2)
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
}

module.exports = exports['default'];
},{"../prefixProps":55,"../utils/camelToDashCase":57,"../utils/capitalizeString":58,"../utils/unprefixProperty":60}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = prefixAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _prefixProps = require('./prefixProps');

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _utilsCapitalizeString = require('./utils/capitalizeString');

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsAssign = require('./utils/assign');

var _utilsAssign2 = _interopRequireDefault(_utilsAssign);

var _pluginsCalc = require('./plugins/calc');

var _pluginsCalc2 = _interopRequireDefault(_pluginsCalc);

var _pluginsCursor = require('./plugins/cursor');

var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

var _pluginsFlex = require('./plugins/flex');

var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

var _pluginsSizing = require('./plugins/sizing');

var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

var _pluginsGradient = require('./plugins/gradient');

var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

var _pluginsTransition = require('./plugins/transition');

var _pluginsTransition2 = _interopRequireDefault(_pluginsTransition);

// special flexbox specifications

var _pluginsFlexboxIE = require('./plugins/flexboxIE');

var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

var _pluginsFlexboxOld = require('./plugins/flexboxOld');

var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

var plugins = [_pluginsCalc2['default'], _pluginsCursor2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsTransition2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default'], _pluginsFlex2['default']];

/**
 * Returns a prefixed version of the style object using all vendor prefixes
 * @param {Object} styles - Style object that gets prefixed properties added
 * @returns {Object} - Style object with prefixed properties and values
 */

function prefixAll(styles) {
  return Object.keys(styles).reduce(function (prefixedStyles, property) {
    var value = styles[property];
    if (value instanceof Object) {
      // recurse through nested style objects
      prefixedStyles[property] = prefixAll(value);
    } else {
      Object.keys(_prefixProps2['default']).forEach(function (prefix) {
        var properties = _prefixProps2['default'][prefix];
        // add prefixes if needed
        if (properties[property]) {
          prefixedStyles[prefix + (0, _utilsCapitalizeString2['default'])(property)] = value;
        }
      });

      // resolve every special plugins
      plugins.forEach(function (plugin) {
        return (0, _utilsAssign2['default'])(prefixedStyles, plugin(property, value));
      });
    }

    return prefixedStyles;
  }, styles);
}

module.exports = exports['default'];
},{"./plugins/calc":46,"./plugins/cursor":47,"./plugins/flex":48,"./plugins/flexboxIE":49,"./plugins/flexboxOld":50,"./plugins/gradient":51,"./plugins/sizing":52,"./plugins/transition":53,"./prefixProps":55,"./utils/assign":56,"./utils/capitalizeString":58}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true, "borderImage": true, "borderImageOutset": true, "borderImageRepeat": true, "borderImageSlice": true, "borderImageSource": true, "borderImageWidth": true, "tabSize": true, "objectFit": true, "objectPosition": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
module.exports = exports["default"];
},{}],56:[function(require,module,exports){
// leight polyfill for Object.assign
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (base) {
  var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return Object.keys(extend).reduce(function (out, key) {
    base[key] = extend[key];
    return out;
  }, {});
};

module.exports = exports["default"];
},{}],57:[function(require,module,exports){
/**
 * Converts a camel-case string to a dash-case string
 * @param {string} str - str that gets converted to dash-case
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (str) {
  return str.replace(/([a-z]|^)([A-Z])/g, function (match, p1, p2) {
    return p1 + '-' + p2.toLowerCase();
  }).replace('ms-', '-ms-');
};

module.exports = exports['default'];
},{}],58:[function(require,module,exports){
// helper to capitalize strings
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = exports["default"];
},{}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _camelToDashCase = require('./camelToDashCase');

var _camelToDashCase2 = _interopRequireDefault(_camelToDashCase);

// returns a style object with a single concated prefixed value string

exports['default'] = function (property, value) {
  var replacer = arguments.length <= 2 || arguments[2] === undefined ? function (prefix, value) {
    return prefix + value;
  } : arguments[2];
  return (function () {
    return _defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function (prefix) {
      return replacer(prefix, value);
    }).join(';' + (0, _camelToDashCase2['default'])(property) + ':'));
  })();
};

module.exports = exports['default'];
},{"./camelToDashCase":57}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (property) {
  var unprefixed = property.replace(/^(ms|Webkit|Moz|O)/, '');
  return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1);
};

module.exports = exports['default'];
},{}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _inlineStylePrefixAll = require('inline-style-prefix-all');

var _inlineStylePrefixAll2 = _interopRequireDefault(_inlineStylePrefixAll);

var _utilsGetBrowserInformation = require('./utils/getBrowserInformation');

var _utilsGetBrowserInformation2 = _interopRequireDefault(_utilsGetBrowserInformation);

var _utilsGetPrefixedKeyframes = require('./utils/getPrefixedKeyframes');

var _utilsGetPrefixedKeyframes2 = _interopRequireDefault(_utilsGetPrefixedKeyframes);

var _utilsCapitalizeString = require('./utils/capitalizeString');

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsAssign = require('./utils/assign');

var _utilsAssign2 = _interopRequireDefault(_utilsAssign);

var _prefixProps = require('./prefixProps');

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _pluginsCalc = require('./plugins/calc');

var _pluginsCalc2 = _interopRequireDefault(_pluginsCalc);

var _pluginsCursor = require('./plugins/cursor');

var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

var _pluginsFlex = require('./plugins/flex');

var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

var _pluginsSizing = require('./plugins/sizing');

var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

var _pluginsGradient = require('./plugins/gradient');

var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

var _pluginsTransition = require('./plugins/transition');

var _pluginsTransition2 = _interopRequireDefault(_pluginsTransition);

// special flexbox specifications

var _pluginsFlexboxIE = require('./plugins/flexboxIE');

var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

var _pluginsFlexboxOld = require('./plugins/flexboxOld');

var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

var plugins = [_pluginsCalc2['default'], _pluginsCursor2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsTransition2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default'],
// this must be run AFTER the flexbox specs
_pluginsFlex2['default']];

var Prefixer = (function () {
  /**
   * Instantiante a new prefixer
   * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
   * @param {string} keepUnprefixed - keeps unprefixed properties and values
   */

  function Prefixer() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Prefixer);

    var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

    this._userAgent = options.userAgent || defaultUserAgent;
    this._keepUnprefixed = options.keepUnprefixed || false;

    this._browserInfo = (0, _utilsGetBrowserInformation2['default'])(this._userAgent);

    // Checks if the userAgent was resolved correctly
    if (this._browserInfo && this._browserInfo.prefix) {
      // set additional prefix information
      this.cssPrefix = this._browserInfo.prefix.css;
      this.jsPrefix = this._browserInfo.prefix.inline;
      this.prefixedKeyframes = (0, _utilsGetPrefixedKeyframes2['default'])(this._browserInfo);
    } else {
      this._usePrefixAllFallback = true;
      return false;
    }

    var data = this._browserInfo.browser && _prefixProps2['default'][this._browserInfo.browser];
    if (data) {
      this._requiresPrefix = Object.keys(data).filter(function (key) {
        return data[key] >= _this._browserInfo.version;
      }).reduce(function (result, name) {
        result[name] = true;
        return result;
      }, {});
      this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
    } else {
      this._usePrefixAllFallback = true;
    }
  }

  /**
   * Returns a prefixed version of the style object
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */

  _createClass(Prefixer, [{
    key: 'prefix',
    value: function prefix(styles) {
      var _this2 = this;

      // use prefixAll as fallback if userAgent can not be resolved
      if (this._usePrefixAllFallback) {
        return (0, _inlineStylePrefixAll2['default'])(styles);
      }

      // only add prefixes if needed
      if (!this._hasPropsRequiringPrefix) {
        return styles;
      }

      styles = (0, _utilsAssign2['default'])({}, styles);

      Object.keys(styles).forEach(function (property) {
        var value = styles[property];
        if (value instanceof Object) {
          // recurse through nested style objects
          styles[property] = _this2.prefix(value);
        } else {
          // add prefixes if needed
          if (_this2._requiresPrefix[property]) {
            styles[_this2.jsPrefix + (0, _utilsCapitalizeString2['default'])(property)] = value;
            if (!_this2._keepUnprefixed) {
              delete styles[property];
            }
          }

          // resolve plugins
          plugins.forEach(function (plugin) {
            // generates a new plugin interface with current data
            var resolvedStyles = plugin({
              property: property,
              value: value,
              styles: styles,
              browserInfo: _this2._browserInfo,
              prefix: {
                js: _this2.jsPrefix,
                css: _this2.cssPrefix,
                keyframes: _this2.prefixedKeyframes
              },
              keepUnprefixed: _this2._keepUnprefixed,
              requiresPrefix: _this2._requiresPrefix
            });
            (0, _utilsAssign2['default'])(styles, resolvedStyles);
          });
        }
      });

      return styles;
    }

    /**
     * Returns a prefixed version of the style object using all vendor prefixes
     * @param {Object} styles - Style object that gets prefixed properties added
     * @returns {Object} - Style object with prefixed properties and values
     */
  }], [{
    key: 'prefixAll',
    value: function prefixAll(styles) {
      return (0, _inlineStylePrefixAll2['default'])(styles);
    }
  }]);

  return Prefixer;
})();

exports['default'] = Prefixer;
module.exports = exports['default'];
},{"./plugins/calc":62,"./plugins/cursor":63,"./plugins/flex":64,"./plugins/flexboxIE":65,"./plugins/flexboxOld":66,"./plugins/gradient":67,"./plugins/sizing":68,"./plugins/transition":69,"./prefixProps":70,"./utils/assign":71,"./utils/capitalizeString":73,"./utils/getBrowserInformation":74,"./utils/getPrefixedKeyframes":75,"inline-style-prefix-all":54}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = calc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

function calc(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('calc(') > -1 && (browser === 'firefox' && version < 15 || browser === 'chrome' && version < 25 || browser === 'safari' && version < 6.1 || browser === 'ios_saf' && version < 7)) {
    return _defineProperty({}, property, value.replace(/calc\(/g, css + 'calc(') + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : ''));
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":72}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = cursor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = {
  'zoom-in': true,
  'zoom-out': true,
  'grab': true,
  'grabbing': true
};

function cursor(_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var _ref$browserInfo = _ref.browserInfo;
  var browser = _ref$browserInfo.browser;
  var version = _ref$browserInfo.version;
  var css = _ref.prefix.css;
  var keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'cursor' && values[value] && (browser === 'firefox' && version < 24 || browser === 'chrome' && version < 37 || browser === 'safari' && version < 9 || browser === 'opera' && version < 24)) {
    return {
      cursor: css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
    };
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":72}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = {
  'flex': true,
  'inline-flex': true
};

function flex(_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var _ref$browserInfo = _ref.browserInfo;
  var browser = _ref$browserInfo.browser;
  var version = _ref$browserInfo.version;
  var css = _ref.prefix.css;
  var keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'display' && values[value] && (browser === 'chrome' && version < 29 && version > 20 || (browser === 'safari' || browser === 'ios_saf') && version < 9 && version > 6 || browser === 'opera' && (version == 15 || version == 16))) {
    return {
      display: css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
    };
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":72}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxIE;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  flex: 'flexbox',
  'inline-flex': 'inline-flexbox'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

var properties = Object.keys(alternativeProps).reduce(function (result, prop) {
  result[prop] = true;
  return result;
}, {});

function flexboxIE(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var styles = _ref2.styles;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if ((properties[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browser === 'ie_mob' || browser === 'ie') && version == 10) {
    if (!keepUnprefixed) {
      delete styles[property];
    }
    if (property === 'display' && alternativeValues[value]) {
      return {
        display: css + alternativeValues[value] + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
      };
    }
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":72}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxOld;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];

var properties = Object.keys(alternativeProps).concat(otherProps).reduce(function (result, prop) {
  result[prop] = true;
  return result;
}, {});

function flexboxOld(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var styles = _ref2.styles;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if ((properties[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browser === 'firefox' && version < 22 || browser === 'chrome' && version < 21 || (browser === 'safari' || browser === 'ios_saf') && version <= 6.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
    if (!keepUnprefixed) {
      delete styles[property];
    }
    if (property === 'flexDirection') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      };
    }
    if (property === 'display' && alternativeValues[value]) {
      return {
        display: css + alternativeValues[value] + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
      };
    }
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":72}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = gradient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if (typeof value === 'string' && value.match(values) !== null && (browser === 'firefox' && version < 16 || browser === 'chrome' && version < 26 || (browser === 'safari' || browser === 'ios_saf') && version < 7 || (browser === 'opera' || browser === 'op_mini') && version < 12.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
    return _defineProperty({}, property, css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : ''));
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":72}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sizing;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  // This might change in the future
  // Keep an eye on it
  if (properties[property] && values[value]) {
    return _defineProperty({}, property, css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : ''));
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":72}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = transition;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var _utilsCapitalizeString = require('../utils/capitalizeString');

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsUnprefixProperty = require('../utils/unprefixProperty');

var _utilsUnprefixProperty2 = _interopRequireDefault(_utilsUnprefixProperty);

var properties = {
  'transition': true,
  'transitionProperty': true
};

function transition(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var css = _ref2.prefix.css;
  var requiresPrefix = _ref2.requiresPrefix;
  var keepUnprefixed = _ref2.keepUnprefixed;

  // also check for already prefixed transitions
  var unprefixedProperty = (0, _utilsUnprefixProperty2['default'])(property);
  if (typeof value === 'string' && properties[unprefixedProperty]) {
    var _ret = (function () {
      var requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
        return (0, _utilsCamelToDashCase2['default'])(prop);
      });

      // only split multi values, not cubic beziers
      var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

      requiresPrefixDashCased.forEach(function (property) {
        multipleValues.forEach(function (val, index) {
          if (val.indexOf(property) > -1) {
            multipleValues[index] = val.replace(property, css + property) + (keepUnprefixed ? ',' + val : '');
          }
        });
      });

      return {
        v: _defineProperty({}, property, multipleValues.join(','))
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":72,"../utils/capitalizeString":73,"../utils/unprefixProperty":76}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = { "chrome": { "transform": 35, "transformOrigin": 35, "transformOriginX": 35, "transformOriginY": 35, "backfaceVisibility": 35, "perspective": 35, "perspectiveOrigin": 35, "transformStyle": 35, "transformOriginZ": 35, "animation": 42, "animationDelay": 42, "animationDirection": 42, "animationFillMode": 42, "animationDuration": 42, "animationIterationCount": 42, "animationName": 42, "animationPlayState": 42, "animationTimingFunction": 42, "appearance": 52, "userSelect": 52, "fontKerning": 32, "textEmphasisPosition": 52, "textEmphasis": 52, "textEmphasisStyle": 52, "textEmphasisColor": 52, "boxDecorationBreak": 52, "clipPath": 52, "maskImage": 52, "maskMode": 52, "maskRepeat": 52, "maskPosition": 52, "maskClip": 52, "maskOrigin": 52, "maskSize": 52, "maskComposite": 52, "mask": 52, "maskBorderSource": 52, "maskBorderMode": 52, "maskBorderSlice": 52, "maskBorderWidth": 52, "maskBorderOutset": 52, "maskBorderRepeat": 52, "maskBorder": 52, "maskType": 52, "textDecorationStyle": 52, "textDecorationSkip": 52, "textDecorationLine": 52, "textDecorationColor": 52, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 52, "breakBefore": 52, "breakInside": 52, "columnCount": 52, "columnFill": 52, "columnGap": 52, "columnRule": 52, "columnRuleColor": 52, "columnRuleStyle": 52, "columnRuleWidth": 52, "columns": 52, "columnSpan": 52, "columnWidth": 52 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 9.1, "userSelect": 9.1, "backdropFilter": 9.1, "fontKerning": 9.1, "scrollSnapType": 9.1, "scrollSnapPointsX": 9.1, "scrollSnapPointsY": 9.1, "scrollSnapDestination": 9.1, "scrollSnapCoordinate": 9.1, "textEmphasisPosition": 7, "textEmphasis": 7, "textEmphasisStyle": 7, "textEmphasisColor": 7, "boxDecorationBreak": 9.1, "clipPath": 9.1, "maskImage": 9.1, "maskMode": 9.1, "maskRepeat": 9.1, "maskPosition": 9.1, "maskClip": 9.1, "maskOrigin": 9.1, "maskSize": 9.1, "maskComposite": 9.1, "mask": 9.1, "maskBorderSource": 9.1, "maskBorderMode": 9.1, "maskBorderSlice": 9.1, "maskBorderWidth": 9.1, "maskBorderOutset": 9.1, "maskBorderRepeat": 9.1, "maskBorder": 9.1, "maskType": 9.1, "textDecorationStyle": 9.1, "textDecorationSkip": 9.1, "textDecorationLine": 9.1, "textDecorationColor": 9.1, "shapeImageThreshold": 9.1, "shapeImageMargin": 9.1, "shapeImageOutside": 9.1, "filter": 9, "hyphens": 9.1, "flowInto": 9.1, "flowFrom": 9.1, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 9.1, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 47, "userSelect": 47, "boxSizing": 28, "textAlignLast": 47, "textDecorationStyle": 35, "textDecorationSkip": 35, "textDecorationLine": 35, "textDecorationColor": 35, "tabSize": 47, "hyphens": 42, "fontFeatureSettings": 33, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 37, "userSelect": 37, "fontKerning": 19, "textEmphasisPosition": 37, "textEmphasis": 37, "textEmphasisStyle": 37, "textEmphasisColor": 37, "boxDecorationBreak": 37, "clipPath": 37, "maskImage": 37, "maskMode": 37, "maskRepeat": 37, "maskPosition": 37, "maskClip": 37, "maskOrigin": 37, "maskSize": 37, "maskComposite": 37, "mask": 37, "maskBorderSource": 37, "maskBorderMode": 37, "maskBorderSlice": 37, "maskBorderWidth": 37, "maskBorderOutset": 37, "maskBorderRepeat": 37, "maskBorder": 37, "maskType": 37, "filter": 37, "fontFeatureSettings": 37, "breakAfter": 37, "breakBefore": 37, "breakInside": 37, "columnCount": 37, "columnFill": 37, "columnGap": 37, "columnRule": 37, "columnRuleColor": 37, "columnRuleStyle": 37, "columnRuleWidth": 37, "columns": 37, "columnSpan": 37, "columnWidth": 37 }, "ie": { "gridRowStart": 11, "gridAutoColumns": 11, "gridRowGap": 11, "breakInside": 11, "transform": 9, "breakAfter": 11, "gridRowEnd": 11, "transformOrigin": 9, "gridColumnEnd": 11, "userSelect": 11, "transformOriginY": 9, "flexDirection": 10, "wrapThrough": 11, "flowFrom": 11, "gridColumnStart": 11, "regionFragment": 11, "flowInto": 11, "scrollSnapType": 11, "flexWrap": 10, "gridAutoFlow": 11, "wrapFlow": 11, "wrapMargin": 11, "gridTemplateAreas": 11, "gridTemplateRows": 11, "flexFlow": 10, "gridAutoRows": 11, "grid": 11, "gridRow": 11, "touchAction": 10, "gridColumnGap": 11, "gridGap": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapPointsX": 11, "flex": 10, "transformOriginX": 9, "gridTemplateColumns": 11, "gridArea": 11, "gridTemplate": 11, "breakBefore": 11, "hyphens": 11, "scrollSnapCoordinate": 11, "gridColumn": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 14, "wrapFlow": 14, "wrapThrough": 14, "wrapMargin": 14, "scrollSnapType": 14, "scrollSnapPointsX": 14, "scrollSnapPointsY": 14, "scrollSnapDestination": 14, "scrollSnapCoordinate": 14, "hyphens": 14, "flowInto": 14, "flowFrom": 14, "breakBefore": 14, "breakAfter": 14, "breakInside": 14, "regionFragment": 14, "gridTemplateColumns": 14, "gridTemplateRows": 14, "gridTemplateAreas": 14, "gridTemplate": 14, "gridAutoColumns": 14, "gridAutoRows": 14, "gridAutoFlow": 14, "grid": 14, "gridRowStart": 14, "gridColumnStart": 14, "gridRowEnd": 14, "gridRow": 14, "gridColumn": 14, "gridColumnEnd": 14, "gridColumnGap": 14, "gridRowGap": 14, "gridArea": 14, "gridGap": 14 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 9.3, "userSelect": 9.3, "backdropFilter": 9.3, "fontKerning": 9.3, "scrollSnapType": 9.3, "scrollSnapPointsX": 9.3, "scrollSnapPointsY": 9.3, "scrollSnapDestination": 9.3, "scrollSnapCoordinate": 9.3, "boxDecorationBreak": 9.3, "clipPath": 9.3, "maskImage": 9.3, "maskMode": 9.3, "maskRepeat": 9.3, "maskPosition": 9.3, "maskClip": 9.3, "maskOrigin": 9.3, "maskSize": 9.3, "maskComposite": 9.3, "mask": 9.3, "maskBorderSource": 9.3, "maskBorderMode": 9.3, "maskBorderSlice": 9.3, "maskBorderWidth": 9.3, "maskBorderOutset": 9.3, "maskBorderRepeat": 9.3, "maskBorder": 9.3, "maskType": 9.3, "textSizeAdjust": 9.3, "textDecorationStyle": 9.3, "textDecorationSkip": 9.3, "textDecorationLine": 9.3, "textDecorationColor": 9.3, "shapeImageThreshold": 9.3, "shapeImageMargin": 9.3, "shapeImageOutside": 9.3, "filter": 9, "hyphens": 9.3, "flowInto": 9.3, "flowFrom": 9.3, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 9.3, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "borderImage": 4.2, "borderImageOutset": 4.2, "borderImageRepeat": 4.2, "borderImageSlice": 4.2, "borderImageSource": 4.2, "borderImageWidth": 4.2, "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 47, "userSelect": 47, "fontKerning": 4.4, "textEmphasisPosition": 47, "textEmphasis": 47, "textEmphasisStyle": 47, "textEmphasisColor": 47, "boxDecorationBreak": 47, "clipPath": 47, "maskImage": 47, "maskMode": 47, "maskRepeat": 47, "maskPosition": 47, "maskClip": 47, "maskOrigin": 47, "maskSize": 47, "maskComposite": 47, "mask": 47, "maskBorderSource": 47, "maskBorderMode": 47, "maskBorderSlice": 47, "maskBorderWidth": 47, "maskBorderOutset": 47, "maskBorderRepeat": 47, "maskBorder": 47, "maskType": 47, "filter": 47, "fontFeatureSettings": 47, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "and_chr": { "appearance": 47, "userSelect": 47, "textEmphasisPosition": 47, "textEmphasis": 47, "textEmphasisStyle": 47, "textEmphasisColor": 47, "boxDecorationBreak": 47, "clipPath": 47, "maskImage": 47, "maskMode": 47, "maskRepeat": 47, "maskPosition": 47, "maskClip": 47, "maskOrigin": 47, "maskSize": 47, "maskComposite": 47, "mask": 47, "maskBorderSource": 47, "maskBorderMode": 47, "maskBorderSlice": 47, "maskBorderWidth": 47, "maskBorderOutset": 47, "maskBorderRepeat": 47, "maskBorder": 47, "maskType": 47, "textDecorationStyle": 47, "textDecorationSkip": 47, "textDecorationLine": 47, "textDecorationColor": 47, "filter": 47, "fontFeatureSettings": 47, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "and_uc": { "flex": 9.9, "flexBasis": 9.9, "flexDirection": 9.9, "flexGrow": 9.9, "flexFlow": 9.9, "flexShrink": 9.9, "flexWrap": 9.9, "alignContent": 9.9, "alignItems": 9.9, "alignSelf": 9.9, "justifyContent": 9.9, "order": 9.9, "transition": 9.9, "transitionDelay": 9.9, "transitionDuration": 9.9, "transitionProperty": 9.9, "transitionTimingFunction": 9.9, "transform": 9.9, "transformOrigin": 9.9, "transformOriginX": 9.9, "transformOriginY": 9.9, "backfaceVisibility": 9.9, "perspective": 9.9, "perspectiveOrigin": 9.9, "transformStyle": 9.9, "transformOriginZ": 9.9, "animation": 9.9, "animationDelay": 9.9, "animationDirection": 9.9, "animationFillMode": 9.9, "animationDuration": 9.9, "animationIterationCount": 9.9, "animationName": 9.9, "animationPlayState": 9.9, "animationTimingFunction": 9.9, "appearance": 9.9, "userSelect": 9.9, "fontKerning": 9.9, "textEmphasisPosition": 9.9, "textEmphasis": 9.9, "textEmphasisStyle": 9.9, "textEmphasisColor": 9.9, "maskImage": 9.9, "maskMode": 9.9, "maskRepeat": 9.9, "maskPosition": 9.9, "maskClip": 9.9, "maskOrigin": 9.9, "maskSize": 9.9, "maskComposite": 9.9, "mask": 9.9, "maskBorderSource": 9.9, "maskBorderMode": 9.9, "maskBorderSlice": 9.9, "maskBorderWidth": 9.9, "maskBorderOutset": 9.9, "maskBorderRepeat": 9.9, "maskBorder": 9.9, "maskType": 9.9, "textSizeAdjust": 9.9, "filter": 9.9, "hyphens": 9.9, "flowInto": 9.9, "flowFrom": 9.9, "breakBefore": 9.9, "breakAfter": 9.9, "breakInside": 9.9, "regionFragment": 9.9, "fontFeatureSettings": 9.9, "columnCount": 9.9, "columnFill": 9.9, "columnGap": 9.9, "columnRule": 9.9, "columnRuleColor": 9.9, "columnRuleStyle": 9.9, "columnRuleWidth": 9.9, "columns": 9.9, "columnSpan": 9.9, "columnWidth": 9.9 }, "op_mini": { "borderImage": 5, "borderImageOutset": 5, "borderImageRepeat": 5, "borderImageSlice": 5, "borderImageSource": 5, "borderImageWidth": 5, "tabSize": 5, "objectFit": 5, "objectPosition": 5 } };
module.exports = exports["default"];
},{}],71:[function(require,module,exports){
// leight polyfill for Object.assign
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (base) {
  var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  Object.keys(extend).forEach(function (key) {
    return base[key] = extend[key];
  });
  return base;
};

module.exports = exports["default"];
},{}],72:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],73:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"dup":58}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

var vendorPrefixes = {
  Webkit: ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen'],
  Moz: ['firefox', 'seamonkey', 'sailfish'],
  ms: ['msie', 'msedge']
};

var browsers = {
  chrome: [['chrome']],
  safari: [['safari']],
  firefox: [['firefox']],
  ie: [['msie']],
  edge: [['msedge']],
  opera: [['opera']],
  ios_saf: [['ios', 'mobile'], ['ios', 'tablet']],
  ie_mob: [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
  op_mini: [['opera', 'mobile'], ['opera', 'tablet']],
  and_uc: [['android', 'mobile'], ['android', 'tablet']],
  android: [['android', 'mobile'], ['android', 'tablet']]
};

/**
 * Uses bowser to get default browser information such as version and name
 * Evaluates bowser info and adds vendorPrefix information
 * @param {string} userAgent - userAgent that gets evaluated
 */

exports['default'] = function (userAgent) {
  if (!userAgent) {
    return false;
  }

  var info = _bowser2['default']._detect(userAgent);

  Object.keys(vendorPrefixes).forEach(function (prefix) {
    vendorPrefixes[prefix].forEach(function (browser) {
      if (info[browser]) {
        info.prefix = {
          inline: prefix,
          css: '-' + prefix.toLowerCase() + '-'
        };
      }
    });
  });

  var name = '';
  Object.keys(browsers).forEach(function (browser) {
    browsers[browser].forEach(function (condition) {
      var match = 0;
      condition.forEach(function (single) {
        if (info[single]) {
          match += 1;
        }
      });
      if (condition.length === match) {
        name = browser;
      }
    });
  });

  info.browser = name;
  // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
  info.version = info.version ? parseFloat(info.version) : parseInt(parseFloat(info.osversion), 10);

  // seperate native android chrome
  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
  if (info.browser === 'android' && info.chrome && info.version > 37) {
    info.browser = 'and_chr';
  }
  info.version = parseFloat(info.version);
  info.osversion = parseFloat(info.osversion);
  // For android < 4.4 we want to check the osversion
  // not the chrome version, see issue #26
  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
  if (info.browser === 'android' && info.osversion < 5) {
    info.version = info.osversion;
  }

  return info;
};

module.exports = exports['default'];
},{"bowser":77}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (_ref) {
  var browser = _ref.browser;
  var version = _ref.version;
  var prefix = _ref.prefix;

  var prefixedKeyframes = 'keyframes';

  if (browser === 'chrome' && version < 43 || (browser === 'safari' || browser === 'ios_saf') && version < 9 || browser === 'opera' && version < 30 || browser === 'android' && version <= 4.4 || browser === 'and_uc') {
    prefixedKeyframes = prefix.css + prefixedKeyframes;
  }
  return prefixedKeyframes;
};

module.exports = exports['default'];
},{}],76:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"dup":60}],77:[function(require,module,exports){
/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2015
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , chromeBook = /CrOS/.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , result

    if (/opera|opr/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/windows phone/i.test(ua)) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeBook) {
      result = {
        name: 'Chrome'
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (/sailfish/i.test(ua)) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (/silk/i.test(ua)) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
      , version: versionIdentifier
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/(web|hpw)os/i.test(ua)) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/tizen/i.test(ua)) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/safari/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      result.name = result.name || "Webkit"
      result.webkit = t
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
      result.tablet = t
    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],78:[function(require,module,exports){
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toCSS = toCSS;
exports.toObject = toObject;
exports.nestPseudoClasses = nestPseudoClasses;
exports.importantify = importantify;

var _camelToDashCase = require('./utils/camelToDashCase');

var _camelToDashCase2 = _interopRequireDefault(_camelToDashCase);

var _dashToCamelCase = require('./utils/dashToCamelCase');

var _dashToCamelCase2 = _interopRequireDefault(_dashToCamelCase);

var _isNumber = require('./utils/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/**
* Creates a valid CSS string out of an object of styles
* @param {Object} styles - an object with CSS styles
* @param {string} unit - unit that gets applied to number values
*/
function toCSS(styles) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var unit = options.unit || 'px';
  var ruleSeparator = options.ruleSeparator || '';
  var selectorSeparator = options.selectorSeparator || '';
  var indent = options.indent || '';

  return Object.keys(styles).reduce(function (rules, property) {
    var value = styles[property];
    // resolve multi values passed as an array
    if (value instanceof Array) {
      value = value.join(';' + property + ':' + ruleSeparator + indent);
    }
    if (value instanceof Object) {
      // prerender nested style objects
      rules += (0, _camelToDashCase2.default)(property) + '{' + selectorSeparator + toCSS(value, options) + selectorSeparator + '}' + selectorSeparator; // eslint-disable-line
    } else {
        // add an semicolon at the end of each rule (if not the last one)
        if (rules !== '') {
          rules += ';' + ruleSeparator;
        }
        // automatically adds units to CSS properties that are not unitless
        // but are provided as a plain number
        if ((0, _isNumber2.default)(property, value)) {
          value = value + unit;
        }

        rules += indent + (0, _camelToDashCase2.default)(property) + ':' + value;
      }
    return rules;
  }, '');
}

/**
 * Generates a object with CSS key-value pairs out of a CSS string
 * @param {string} CSS - CSS string that gets objectified
 */
function toObject(CSS) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var replacer = options.replacer || { '.': '' };

  // this checks if the string is made of selectors
  var replacePrefixes = Object.keys(replacer);
  var replacerRegExp = replacePrefixes.map(function (prefix) {
    return '[' + prefix + ']';
  }).join('|');
  var selectors = CSS.match(new RegExp('(' + replacerRegExp + ')?[a-z0-9-_:\(\) ]*{[^}]*}', 'g'));

  // Resolve nested CSS selector strings
  if (selectors && selectors.length > 0) {
    return selectors.reduce(function (rules, rule) {
      // seperate selector (className) and its styles
      // replace selector prefixes according the replacer settings
      var selector = rule.match(/[^{]*/)[0];
      var styles = rule.replace(selector, '');

      var className = replacePrefixes.reduce(function (transformedClassName, prefix) {
        if (transformedClassName.indexOf(prefix) === 0) {
          transformedClassName = transformedClassName.replace(prefix, replacer[prefix]);
        }
        return transformedClassName;
      }, selector.trim());

      // recursive objectify on pure styles string (without wrapping brackets)
      rules[className] = toObject(styles.replace(new RegExp('{|}', 'g'), ''));
      return rules;
    }, {});
  }

  // splitting the rules to single statements
  return CSS.split(';').reduce(function (rules, rule) {
    var _rule$split = rule.split(':');

    var _rule$split2 = _slicedToArray(_rule$split, 2);

    var property = _rule$split2[0];
    var value = _rule$split2[1];

    // trimming both to remove padding whitespace

    value = value.trim();

    if (value) {
      // convert number strings to real numbers if possible
      // Improves usability and developer experience
      var numberValue = parseFloat(value);
      if (numberValue == value || numberValue == value.replace('px', '')) {
        // eslint-disable-line
        value = numberValue;
      }

      // dash-casing the property
      property = (0, _dashToCamelCase2.default)(property.trim());

      // mutiple values / fallback values get added to an array
      // while the order stays the exact same order
      if (rules.hasOwnProperty(property)) {
        value = [rules[property]].concat(value);
      }
      rules[property] = value;
    }
    return rules;
  }, {});
}

var setDotProp = function setDotProp(obj, path, value) {
  var props = path.split('.');
  var majorPseudo = props.pop();

  var newObj = props.reduce(function (output, property) {
    // add selector if not already existing
    if (!output[property]) {
      output[property] = {};
    }

    return output[property];
  }, obj);

  newObj[majorPseudo] = value;
};

/**
 * Nests pseudo selectors into their reference selector
 * @param {Object} styles - an object with styles
 */
function nestPseudoClasses(styles) {
  Object.keys(styles).forEach(function (selector) {
    if (selector.indexOf(':') > -1) {
      var _selector$split = selector.split(':');

      var _selector$split2 = _toArray(_selector$split);

      var sel = _selector$split2[0];

      var pseudo = _selector$split2.slice(1);
      // add selector if not already existing

      if (!styles[sel]) {
        styles[sel] = {};
      }

      setDotProp(styles[sel], ':' + pseudo.join('.:'), styles[selector]);

      // add pseudo to selector object
      delete styles[selector];
    }
  });

  return styles;
}

/**
 * Adds an !important flag to every value
 * @param {Object} styles - an object with styles
 */
function importantify(styles) {
  Object.keys(styles).forEach(function (property) {
    var value = styles[property];
    // add !important flag to achieve higher priority than inline styles
    if (value.toString().indexOf('!important') === -1) {
      styles[property] = value + '!important';
    }
  });

  return styles;
}
},{"./utils/camelToDashCase":79,"./utils/dashToCamelCase":80,"./utils/isNumber":81}],79:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Converts a dash-case string to a camel-case string
 * @param {string} str - str that gets converted to camel-case
 */

exports.default = function (str) {
  return str.replace(/-([a-z])/g, function (match) {
    return match[1].toUpperCase();
  }).replace(/^Ms/g, 'ms');
};

module.exports = exports['default'];
},{}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUnitlessProperty = require('./isUnitlessProperty');

var _isUnitlessProperty2 = _interopRequireDefault(_isUnitlessProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (property, value) {
  return !(0, _isUnitlessProperty2.default)(property) && !isNaN(parseFloat(value)) && isFinite(value) && value !== 0;
};

module.exports = exports['default'];
},{"./isUnitlessProperty":82}],82:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],83:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

},{"./_getNative":136,"./_root":163}],84:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @returns {Object} Returns the new hash object.
 */
function Hash() {}

// Avoid inheriting from `Object.prototype` when possible.
Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

module.exports = Hash;

},{"./_nativeCreate":162}],85:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":136,"./_root":163}],86:[function(require,module,exports){
var mapClear = require('./_mapClear'),
    mapDelete = require('./_mapDelete'),
    mapGet = require('./_mapGet'),
    mapHas = require('./_mapHas'),
    mapSet = require('./_mapSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function MapCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapClear;
MapCache.prototype['delete'] = mapDelete;
MapCache.prototype.get = mapGet;
MapCache.prototype.has = mapHas;
MapCache.prototype.set = mapSet;

module.exports = MapCache;

},{"./_mapClear":156,"./_mapDelete":157,"./_mapGet":158,"./_mapHas":159,"./_mapSet":160}],87:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

},{"./_getNative":136,"./_root":163}],88:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Reflect = root.Reflect;

module.exports = Reflect;

},{"./_root":163}],89:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":136,"./_root":163}],90:[function(require,module,exports){
var stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function Stack(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_stackClear":165,"./_stackDelete":166,"./_stackGet":167,"./_stackHas":168,"./_stackSet":169}],91:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":163}],92:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":163}],93:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":136,"./_root":163}],94:[function(require,module,exports){
/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `Map#set` because it doesn't return the map instance in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

module.exports = addMapEntry;

},{}],95:[function(require,module,exports){
/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  set.add(value);
  return set;
}

module.exports = addSetEntry;

},{}],96:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  var length = args.length;
  switch (length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],97:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],98:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],99:[function(require,module,exports){
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;

},{}],100:[function(require,module,exports){
var eq = require('./eq');

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (typeof key == 'number' && value === undefined && !(key in object))) {
    object[key] = value;
  }
}

module.exports = assignMergeValue;

},{"./eq":174}],101:[function(require,module,exports){
var eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

module.exports = assignValue;

},{"./eq":174}],102:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the associative array.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function assocDelete(array, key) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = array.length - 1;
  if (index == lastIndex) {
    array.pop();
  } else {
    splice.call(array, index, 1);
  }
  return true;
}

module.exports = assocDelete;

},{"./_assocIndexOf":105}],103:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the associative array value for `key`.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function assocGet(array, key) {
  var index = assocIndexOf(array, key);
  return index < 0 ? undefined : array[index][1];
}

module.exports = assocGet;

},{"./_assocIndexOf":105}],104:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if an associative array value for `key` exists.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function assocHas(array, key) {
  return assocIndexOf(array, key) > -1;
}

module.exports = assocHas;

},{"./_assocIndexOf":105}],105:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":174}],106:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the associative array `key` to `value`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function assocSet(array, key, value) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    array.push([key, value]);
  } else {
    array[index][1] = value;
  }
}

module.exports = assocSet;

},{"./_assocIndexOf":105}],107:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keys = require('./keys');

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;

},{"./_copyObject":131,"./keys":194}],108:[function(require,module,exports){
var Stack = require('./_Stack'),
    arrayEach = require('./_arrayEach'),
    assignValue = require('./_assignValue'),
    baseAssign = require('./_baseAssign'),
    cloneBuffer = require('./_cloneBuffer'),
    copyArray = require('./_copyArray'),
    copySymbols = require('./_copySymbols'),
    getAllKeys = require('./_getAllKeys'),
    getTag = require('./_getTag'),
    initCloneArray = require('./_initCloneArray'),
    initCloneByTag = require('./_initCloneByTag'),
    initCloneObject = require('./_initCloneObject'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isHostObject = require('./_isHostObject'),
    isObject = require('./isObject'),
    keys = require('./keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  // Recursively populate clone (susceptible to call stack limits).
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;

},{"./_Stack":90,"./_arrayEach":97,"./_assignValue":101,"./_baseAssign":107,"./_cloneBuffer":123,"./_copyArray":130,"./_copySymbols":132,"./_getAllKeys":134,"./_getTag":139,"./_initCloneArray":145,"./_initCloneByTag":146,"./_initCloneObject":147,"./_isHostObject":149,"./isArray":178,"./isBuffer":182,"./isObject":188,"./keys":194}],109:[function(require,module,exports){
var isObject = require('./isObject');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

module.exports = baseCreate;

},{"./isObject":188}],110:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isFlattenable = require('./_isFlattenable');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"./_arrayPush":98,"./_isFlattenable":148}],111:[function(require,module,exports){
var castPath = require('./_castPath'),
    isKey = require('./_isKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_castPath":120,"./_isKey":152}],112:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isArray = require('./isArray');

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object)
    ? result
    : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

},{"./_arrayPush":98,"./isArray":178}],113:[function(require,module,exports){
var getPrototype = require('./_getPrototype');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return hasOwnProperty.call(object, key) ||
    (typeof object == 'object' && key in object && getPrototype(object) === null);
}

module.exports = baseHas;

},{"./_getPrototype":137}],114:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = Object.keys;

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  return nativeKeys(Object(object));
}

module.exports = baseKeys;

},{}],115:[function(require,module,exports){
var Reflect = require('./_Reflect'),
    iteratorToArray = require('./_iteratorToArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var enumerate = Reflect ? Reflect.enumerate : undefined,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * The base implementation of `_.keysIn` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  object = object == null ? object : Object(object);

  var result = [];
  for (var key in object) {
    result.push(key);
  }
  return result;
}

// Fallback for IE < 9 with es6-shim.
if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
  baseKeysIn = function(object) {
    return iteratorToArray(enumerate(object));
  };
}

module.exports = baseKeysIn;

},{"./_Reflect":88,"./_iteratorToArray":155}],116:[function(require,module,exports){
var Stack = require('./_Stack'),
    arrayEach = require('./_arrayEach'),
    assignMergeValue = require('./_assignMergeValue'),
    baseMergeDeep = require('./_baseMergeDeep'),
    isArray = require('./isArray'),
    isObject = require('./isObject'),
    isTypedArray = require('./isTypedArray'),
    keysIn = require('./keysIn');

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  if (!(isArray(source) || isTypedArray(source))) {
    var props = keysIn(source);
  }
  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  });
}

module.exports = baseMerge;

},{"./_Stack":90,"./_arrayEach":97,"./_assignMergeValue":100,"./_baseMergeDeep":117,"./isArray":178,"./isObject":188,"./isTypedArray":193,"./keysIn":195}],117:[function(require,module,exports){
var assignMergeValue = require('./_assignMergeValue'),
    baseClone = require('./_baseClone'),
    copyArray = require('./_copyArray'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLikeObject = require('./isArrayLikeObject'),
    isFunction = require('./isFunction'),
    isObject = require('./isObject'),
    isPlainObject = require('./isPlainObject'),
    isTypedArray = require('./isTypedArray'),
    toPlainObject = require('./toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    newValue = srcValue;
    if (isArray(srcValue) || isTypedArray(srcValue)) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
      else {
        newValue = objValue;
      }
    }
    else {
      isCommon = false;
    }
  }
  stack.set(srcValue, newValue);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
  }
  stack['delete'](srcValue);
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;

},{"./_assignMergeValue":100,"./_baseClone":108,"./_copyArray":130,"./isArguments":177,"./isArray":178,"./isArrayLikeObject":180,"./isFunction":184,"./isObject":188,"./isPlainObject":190,"./isTypedArray":193,"./toPlainObject":201}],118:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],119:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],120:[function(require,module,exports){
var isArray = require('./isArray'),
    stringToPath = require('./_stringToPath');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

module.exports = castPath;

},{"./_stringToPath":170,"./isArray":178}],121:[function(require,module,exports){
/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = checkGlobal;

},{}],122:[function(require,module,exports){
var Uint8Array = require('./_Uint8Array');

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

},{"./_Uint8Array":92}],123:[function(require,module,exports){
/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

},{}],124:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;

},{"./_cloneArrayBuffer":122}],125:[function(require,module,exports){
var addMapEntry = require('./_addMapEntry'),
    arrayReduce = require('./_arrayReduce'),
    mapToArray = require('./_mapToArray');

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

module.exports = cloneMap;

},{"./_addMapEntry":94,"./_arrayReduce":99,"./_mapToArray":161}],126:[function(require,module,exports){
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;

},{}],127:[function(require,module,exports){
var addSetEntry = require('./_addSetEntry'),
    arrayReduce = require('./_arrayReduce'),
    setToArray = require('./_setToArray');

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

module.exports = cloneSet;

},{"./_addSetEntry":95,"./_arrayReduce":99,"./_setToArray":164}],128:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;

},{"./_Symbol":91}],129:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

},{"./_cloneArrayBuffer":122}],130:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

},{}],131:[function(require,module,exports){
var assignValue = require('./_assignValue');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : source[key];

    assignValue(object, key, newValue);
  }
  return object;
}

module.exports = copyObject;

},{"./_assignValue":101}],132:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    getSymbols = require('./_getSymbols');

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;

},{"./_copyObject":131,"./_getSymbols":138}],133:[function(require,module,exports){
var isIterateeCall = require('./_isIterateeCall'),
    rest = require('./rest');

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return rest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = typeof customizer == 'function'
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"./_isIterateeCall":151,"./rest":198}],134:[function(require,module,exports){
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbols = require('./_getSymbols'),
    keys = require('./keys');

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

},{"./_baseGetAllKeys":112,"./_getSymbols":138,"./keys":194}],135:[function(require,module,exports){
var baseProperty = require('./_baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a
 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
 * Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./_baseProperty":118}],136:[function(require,module,exports){
var isNative = require('./isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./isNative":186}],137:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetPrototype = Object.getPrototypeOf;

/**
 * Gets the `[[Prototype]]` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {null|Object} Returns the `[[Prototype]]`.
 */
function getPrototype(value) {
  return nativeGetPrototype(Object(value));
}

module.exports = getPrototype;

},{}],138:[function(require,module,exports){
/** Built-in value references. */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
function getSymbols(object) {
  // Coerce `object` to an object to avoid non-object errors in V8.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=3443 for more details.
  return getOwnPropertySymbols(Object(object));
}

// Fallback for IE < 11.
if (!getOwnPropertySymbols) {
  getSymbols = function() {
    return [];
  };
}

module.exports = getSymbols;

},{}],139:[function(require,module,exports){
var DataView = require('./_DataView'),
    Map = require('./_Map'),
    Promise = require('./_Promise'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap'),
    toSource = require('./_toSource');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  return objectToString.call(value);
}

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_DataView":83,"./_Map":85,"./_Promise":87,"./_Set":89,"./_WeakMap":93,"./_toSource":171}],140:[function(require,module,exports){
var hashHas = require('./_hashHas');

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(hash, key) {
  return hashHas(hash, key) && delete hash[key];
}

module.exports = hashDelete;

},{"./_hashHas":142}],141:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(hash, key) {
  if (nativeCreate) {
    var result = hash[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":162}],142:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(hash, key) {
  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
}

module.exports = hashHas;

},{"./_nativeCreate":162}],143:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function hashSet(hash, key, value) {
  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
}

module.exports = hashSet;

},{"./_nativeCreate":162}],144:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isLength = require('./isLength'),
    isString = require('./isString');

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

module.exports = indexKeys;

},{"./_baseTimes":119,"./isArguments":177,"./isArray":178,"./isLength":185,"./isString":191}],145:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],146:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer'),
    cloneDataView = require('./_cloneDataView'),
    cloneMap = require('./_cloneMap'),
    cloneRegExp = require('./_cloneRegExp'),
    cloneSet = require('./_cloneSet'),
    cloneSymbol = require('./_cloneSymbol'),
    cloneTypedArray = require('./_cloneTypedArray');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;

},{"./_cloneArrayBuffer":122,"./_cloneDataView":124,"./_cloneMap":125,"./_cloneRegExp":126,"./_cloneSet":127,"./_cloneSymbol":128,"./_cloneTypedArray":129}],147:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    getPrototype = require('./_getPrototype'),
    isPrototype = require('./_isPrototype');

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;

},{"./_baseCreate":109,"./_getPrototype":137,"./_isPrototype":154}],148:[function(require,module,exports){
var isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLikeObject = require('./isArrayLikeObject');

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArrayLikeObject(value) && (isArray(value) || isArguments(value));
}

module.exports = isFlattenable;

},{"./isArguments":177,"./isArray":178,"./isArrayLikeObject":180}],149:[function(require,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

module.exports = isHostObject;

},{}],150:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],151:[function(require,module,exports){
var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

},{"./_isIndex":150,"./eq":174,"./isArrayLike":179,"./isObject":188}],152:[function(require,module,exports){
var isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if (type == 'number' || type == 'symbol') {
    return true;
  }
  return !isArray(value) &&
    (isSymbol(value) || reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object)));
}

module.exports = isKey;

},{"./isArray":178,"./isSymbol":192}],153:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'number' || type == 'boolean' ||
    (type == 'string' && value != '__proto__') || value == null;
}

module.exports = isKeyable;

},{}],154:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],155:[function(require,module,exports){
/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

module.exports = iteratorToArray;

},{}],156:[function(require,module,exports){
var Hash = require('./_Hash'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': Map ? new Map : [],
    'string': new Hash
  };
}

module.exports = mapClear;

},{"./_Hash":84,"./_Map":85}],157:[function(require,module,exports){
var Map = require('./_Map'),
    assocDelete = require('./_assocDelete'),
    hashDelete = require('./_hashDelete'),
    isKeyable = require('./_isKeyable');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapDelete(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
}

module.exports = mapDelete;

},{"./_Map":85,"./_assocDelete":102,"./_hashDelete":140,"./_isKeyable":153}],158:[function(require,module,exports){
var Map = require('./_Map'),
    assocGet = require('./_assocGet'),
    hashGet = require('./_hashGet'),
    isKeyable = require('./_isKeyable');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapGet(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.get(key) : assocGet(data.map, key);
}

module.exports = mapGet;

},{"./_Map":85,"./_assocGet":103,"./_hashGet":141,"./_isKeyable":153}],159:[function(require,module,exports){
var Map = require('./_Map'),
    assocHas = require('./_assocHas'),
    hashHas = require('./_hashHas'),
    isKeyable = require('./_isKeyable');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapHas(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.has(key) : assocHas(data.map, key);
}

module.exports = mapHas;

},{"./_Map":85,"./_assocHas":104,"./_hashHas":142,"./_isKeyable":153}],160:[function(require,module,exports){
var Map = require('./_Map'),
    assocSet = require('./_assocSet'),
    hashSet = require('./_hashSet'),
    isKeyable = require('./_isKeyable');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapSet(key, value) {
  var data = this.__data__;
  if (isKeyable(key)) {
    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
  } else if (Map) {
    data.map.set(key, value);
  } else {
    assocSet(data.map, key, value);
  }
  return this;
}

module.exports = mapSet;

},{"./_Map":85,"./_assocSet":106,"./_hashSet":143,"./_isKeyable":153}],161:[function(require,module,exports){
/**
 * Converts `map` to an array.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the converted array.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

},{}],162:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":136}],163:[function(require,module,exports){
(function (global){
var checkGlobal = require('./_checkGlobal');

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal ||
  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
    freeSelf || thisGlobal || Function('return this')();

module.exports = root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./_checkGlobal":121}],164:[function(require,module,exports){
/**
 * Converts `set` to an array.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the converted array.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],165:[function(require,module,exports){
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = { 'array': [], 'map': null };
}

module.exports = stackClear;

},{}],166:[function(require,module,exports){
var assocDelete = require('./_assocDelete');

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocDelete(array, key) : data.map['delete'](key);
}

module.exports = stackDelete;

},{"./_assocDelete":102}],167:[function(require,module,exports){
var assocGet = require('./_assocGet');

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocGet(array, key) : data.map.get(key);
}

module.exports = stackGet;

},{"./_assocGet":103}],168:[function(require,module,exports){
var assocHas = require('./_assocHas');

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocHas(array, key) : data.map.has(key);
}

module.exports = stackHas;

},{"./_assocHas":104}],169:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    assocSet = require('./_assocSet');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__,
      array = data.array;

  if (array) {
    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
      assocSet(array, key, value);
    } else {
      data.array = null;
      data.map = new MapCache(array);
    }
  }
  var map = data.map;
  if (map) {
    map.set(key, value);
  }
  return this;
}

module.exports = stackSet;

},{"./_MapCache":86,"./_assocSet":106}],170:[function(require,module,exports){
var memoize = require('./memoize'),
    toString = require('./toString');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  var result = [];
  toString(string).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;

},{"./memoize":196,"./toString":202}],171:[function(require,module,exports){
/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],172:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    copyObject = require('./_copyObject'),
    createAssigner = require('./_createAssigner'),
    isArrayLike = require('./isArrayLike'),
    isPrototype = require('./_isPrototype'),
    keys = require('./keys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Foo() {
 *   this.c = 3;
 * }
 *
 * function Bar() {
 *   this.e = 5;
 * }
 *
 * Foo.prototype.d = 4;
 * Bar.prototype.f = 6;
 *
 * _.assign({ 'a': 1 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3, 'e': 5 }
 */
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

module.exports = assign;

},{"./_assignValue":101,"./_copyObject":131,"./_createAssigner":133,"./_isPrototype":154,"./isArrayLike":179,"./keys":194}],173:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],174:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],175:[function(require,module,exports){
var baseFlatten = require('./_baseFlatten');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Recursively flattens `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 */
function flattenDeep(array) {
  var length = array ? array.length : 0;
  return length ? baseFlatten(array, INFINITY) : [];
}

module.exports = flattenDeep;

},{"./_baseFlatten":110}],176:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is used in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":111}],177:[function(require,module,exports){
var isArrayLikeObject = require('./isArrayLikeObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

module.exports = isArguments;

},{"./isArrayLikeObject":180}],178:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],179:[function(require,module,exports){
var getLength = require('./_getLength'),
    isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./_getLength":135,"./isFunction":184,"./isLength":185}],180:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":179,"./isObjectLike":189}],181:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && objectToString.call(value) == boolTag);
}

module.exports = isBoolean;

},{"./isObjectLike":189}],182:[function(require,module,exports){
var constant = require('./constant'),
    root = require('./_root');

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = (freeModule && freeModule.exports === freeExports)
  ? freeExports
  : undefined;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = !Buffer ? constant(false) : function(value) {
  return value instanceof Buffer;
};

module.exports = isBuffer;

},{"./_root":163,"./constant":173}],183:[function(require,module,exports){
var getTag = require('./_getTag'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLike = require('./isArrayLike'),
    isBuffer = require('./isBuffer'),
    isFunction = require('./isFunction'),
    isObjectLike = require('./isObjectLike'),
    isString = require('./isString'),
    keys = require('./keys');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (isArrayLike(value) &&
      (isArray(value) || isString(value) || isFunction(value.splice) ||
        isArguments(value) || isBuffer(value))) {
    return !value.length;
  }
  if (isObjectLike(value)) {
    var tag = getTag(value);
    if (tag == mapTag || tag == setTag) {
      return !value.size;
    }
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return !(nonEnumShadows && keys(value).length);
}

module.exports = isEmpty;

},{"./_getTag":139,"./isArguments":177,"./isArray":178,"./isArrayLike":179,"./isBuffer":182,"./isFunction":184,"./isObjectLike":189,"./isString":191,"./keys":194}],184:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

module.exports = isFunction;

},{"./isObject":188}],185:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length,
 *  else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],186:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isHostObject = require('./_isHostObject'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (!isObject(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = isNative;

},{"./_isHostObject":149,"./_toSource":171,"./isFunction":184,"./isObject":188}],187:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && objectToString.call(value) == numberTag);
}

module.exports = isNumber;

},{"./isObjectLike":189}],188:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],189:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],190:[function(require,module,exports){
var getPrototype = require('./_getPrototype'),
    isHostObject = require('./_isHostObject'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object,
 *  else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;

},{"./_getPrototype":137,"./_isHostObject":149,"./isObjectLike":189}],191:[function(require,module,exports){
var isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;

},{"./isArray":178,"./isObjectLike":189}],192:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;

},{"./isObjectLike":189}],193:[function(require,module,exports){
var isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

module.exports = isTypedArray;

},{"./isLength":185,"./isObjectLike":189}],194:[function(require,module,exports){
var baseHas = require('./_baseHas'),
    baseKeys = require('./_baseKeys'),
    indexKeys = require('./_indexKeys'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isPrototype = require('./_isPrototype');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"./_baseHas":113,"./_baseKeys":114,"./_indexKeys":144,"./_isIndex":150,"./_isPrototype":154,"./isArrayLike":179}],195:[function(require,module,exports){
var baseKeysIn = require('./_baseKeysIn'),
    indexKeys = require('./_indexKeys'),
    isIndex = require('./_isIndex'),
    isPrototype = require('./_isPrototype');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  var index = -1,
      isProto = isPrototype(object),
      props = baseKeysIn(object),
      propsLength = props.length,
      indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  while (++index < propsLength) {
    var key = props[index];
    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"./_baseKeysIn":115,"./_indexKeys":144,"./_isIndex":150,"./_isPrototype":154}],196:[function(require,module,exports){
var MapCache = require('./_MapCache');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoizing function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

module.exports = memoize;

},{"./_MapCache":86}],197:[function(require,module,exports){
var baseMerge = require('./_baseMerge'),
    createAssigner = require('./_createAssigner');

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively.Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;

},{"./_baseMerge":116,"./_createAssigner":133}],198:[function(require,module,exports){
var apply = require('./_apply'),
    toInteger = require('./toInteger');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as
 * an array.
 *
 * **Note:** This method is based on the
 * [rest parameter](https://mdn.io/rest_parameters).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.rest(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, array);
      case 1: return func.call(this, args[0], array);
      case 2: return func.call(this, args[0], args[1], array);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

module.exports = rest;

},{"./_apply":96,"./toInteger":199}],199:[function(require,module,exports){
var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This function is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3');
 * // => 3
 */
function toInteger(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  var remainder = value % 1;
  return value === value ? (remainder ? value - remainder : value) : 0;
}

module.exports = toInteger;

},{"./toNumber":200}],200:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3);
 * // => 3
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3');
 * // => 3
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = isFunction(value.valueOf) ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isFunction":184,"./isObject":188,"./isSymbol":192}],201:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keysIn = require('./keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;

},{"./_copyObject":131,"./keysIn":195}],202:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toString;

},{"./_Symbol":91,"./isSymbol":192}],203:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _copyProperties = require('../utils/copyProperties');

var _copyProperties2 = _interopRequireDefault(_copyProperties);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contextType = { _lookConfig: _react.PropTypes.object };
/**
 * Wrapper that maps your styles to a React Component
 * @param {Object} CustomComponent - a valid React Component that gets styles applied
 * @param {Object} config - additional processors that modify the styles
 */

exports.default = function (CustomComponent) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  // Enhancing stateless functional Components
  // Depending on availability of setState
  if (!CustomComponent.prototype.setState) {
    var LookStateless = function LookStateless(props, context) {
      var renderedElement = CustomComponent(props, context);
      var contextConfig = context._lookConfig || null;
      var elementConfig = renderedElement.props.lookConfig || null;
      // Compose all possible ways to configure Look
      var composedConfig = (0, _merge2.default)({}, contextConfig, config, elementConfig);
      // Mocking the Component to use the same consistent interface
      // for all plugins, mixins and to improve developer experience
      var Component = { props: props, context: context };
      // Passing the displayName to improve developer experience
      Component.constructor = {
        displayName: CustomComponent.name || 'Component'
      };
      return context._lookConfig._resolveStyles(Component, renderedElement, composedConfig);
    };
    // Passing contextTypes to be able to reference context
    LookStateless.contextTypes = (0, _merge2.default)({}, CustomComponent.contextTypes, contextType);
    LookStateless.childContextTypes = (0, _merge2.default)({}, CustomComponent.childContextTypes, contextType);

    // Flag as Look-enhanced Component
    LookStateless._isLookEnhanced = true;
    return LookStateless;
  }

  // Enhancing ES2015 classes
  // This will let you use state and do some render optimizations

  var LookComponent = function (_CustomComponent) {
    _inherits(LookComponent, _CustomComponent);

    function LookComponent() {
      _classCallCheck(this, LookComponent);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(LookComponent).apply(this, arguments));
    }

    // Inherit the original displayName for proper use later on


    _createClass(LookComponent, [{
      key: 'render',
      value: function render() {
        var renderedElement = _get(Object.getPrototypeOf(LookComponent.prototype), 'render', this).call(this); // eslint-disable-line
        var contextConfig = this.context._lookConfig || null;
        var elementConfig = renderedElement.props.lookConfig || null;
        // Compose all possible ways to configure Look
        var composedConfig = (0, _merge2.default)({}, contextConfig, config, elementConfig);
        return this.context._lookConfig._resolveStyles(this, renderedElement, composedConfig);
      }
    }]);

    return LookComponent;
  }(CustomComponent);

  // copy props in order to get hmr working correctly


  LookComponent.displayName = CustomComponent.displayName || CustomComponent.name || 'Component';
  LookComponent.childContextTypes = _extends({}, CustomComponent.childContextTypes, contextType);
  LookComponent.contextTypes = _extends({}, CustomComponent.contextTypes, contextType);
  LookComponent._isLookEnhanced = true;
  if (process.env.NODE_ENV !== 'production') {
    (0, _copyProperties2.default)(CustomComponent.prototype, LookComponent.prototype);
  }

  return LookComponent;
};

module.exports = exports['default'];
}).call(this,require('_process'))

},{"../utils/copyProperties":213,"_process":3,"lodash/merge":197,"react":undefined}],204:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flattenDeep = require('lodash/flattenDeep');

var _flattenDeep2 = _interopRequireDefault(_flattenDeep);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.resolvePlugins = resolvePlugins;
exports.isLookEnhanced = isLookEnhanced;
exports.resolveChildren = resolveChildren;
exports.resolveProps = resolveProps;

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resolves all plugins provided by the configuration
 * @param {Object} pluginInterface - interface containing all configurations to resolve
 */
function resolvePlugins(pluginInterface) {
  var forceModePossible = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  var styles = pluginInterface.styles;
  var config = pluginInterface.config;

  // Triggers plugin resolving
  // Uses the exact plugin lineup defined within Config

  config.plugins.forEach(function (plugin) {
    // If the plugin is a function it gets called when there are dynamic styles to resolve
    if (forceModePossible !== true || plugin instanceof Function) {
      if (pluginInterface.dynamicStylesNotNull === true || forceModePossible !== true) {
        styles = plugin(_extends({}, pluginInterface, {
          styles: styles
        }));
      }
    } else {
      // The plugin could also be an object containing `mode` and `plugin`
      // Force mode calls the plugin every time when this function is called
      if (plugin.mode === 'force') {
        styles = plugin.plugin(_extends({}, pluginInterface, {
          styles: styles
        }));
        return;
      }
      // Default/fallback mode: Same as if the plugin would be a function
      if (pluginInterface.dynamicStylesNotNull) {
        styles = plugin.plugin(_extends({}, pluginInterface, {
          styles: styles
        }));
      }
    }
  });

  return styles;
}

/**
 * Checks if a given element is a look-enhanced Component itself
 * @param {Object} element - React element to be validated
 */
function isLookEnhanced(element) {
  return element._isLookEnhanced || element.type && element.type._isLookEnhanced ? true : false;
}

/**
 * Resolves provided styles for an elements children
 * @param {Object} Component - wrapping React Component providing looks and elements
 * @param {Array|string|number} children - children that get resolved
 * @param {Object} config - configuration containing plugins and plugin-specific configs
 */
function resolveChildren(Component, newProps, config) {
  if (newProps.children) {
    var children = newProps.children;
    // directly return primitive children

    if ((0, _isString2.default)(children) || (0, _isNumber2.default)(children)) {
      return;
    }

    if (children.type) {
      newProps.children = config._resolveStyles(Component, children, config);
    }

    // if there are more than one child, iterate over them
    if ((0, _isArray2.default)(children)) {
      // flattening children prevents deeper nested children
      var flatChildren = (0, _flattenDeep2.default)(children);

      // recursively resolve styles for child elements if it is a valid React Component
      newProps.children = _react.Children.map(flatChildren, function (child) {
        if ((0, _react.isValidElement)(child)) {
          return config._resolveStyles(Component, child, config);
        }
        return child; // eslint-disable-line
      });
    }
  }
}

/**
* Resolves Components passed as a property
* @param {Object} Component - wrapping React Component providing looks and elements
* @param {Object} newProps - element's properties to iterate
* @param {Object} config - configuration containing plugins and plugin-specific configs
*/
function resolveProps(Component, newProps, config) {
  Object.keys(newProps).forEach(function (property) {
    if (property === 'children') {
      return;
    }

    // Resolving styles for elements passed by props
    // Skip children as they've been resolved already
    var propElement = newProps[property];
    if ((0, _react.isValidElement)(propElement)) {
      newProps[property] = config._resolveStyles(Component, propElement, config);
      newProps._lookShouldUpdate = true;
    }
  });
}
},{"lodash/flattenDeep":175,"lodash/isArray":178,"lodash/isNumber":187,"lodash/isString":191,"react":undefined}],205:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enhancer = require('./core/enhancer');

var _enhancer2 = _interopRequireDefault(_enhancer);

var _resolver = require('./core/resolver');

var resolver = _interopRequireWildcard(_resolver);

var _condition = require('./mixins/condition');

var _condition2 = _interopRequireDefault(_condition);

var _contains = require('./mixins/contains');

var _contains2 = _interopRequireDefault(_contains);

var _extend = require('./mixins/extend');

var _extend2 = _interopRequireDefault(_extend);

var _mixin = require('./plugins/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _statefulValue = require('./plugins/statefulValue');

var _statefulValue2 = _interopRequireDefault(_statefulValue);

var _statefulSelector = require('./plugins/statefulSelector');

var _statefulSelector2 = _interopRequireDefault(_statefulSelector);

var _styleLogger = require('./plugins/styleLogger');

var _styleLogger2 = _interopRequireDefault(_styleLogger);

var _copyProperties = require('./utils/copyProperties');

var _copyProperties2 = _interopRequireDefault(_copyProperties);

var _getChildType = require('./utils/getChildType');

var _getChildType2 = _interopRequireDefault(_getChildType);

var _getPseudoExpression = require('./utils/getPseudoExpression');

var _getPseudoExpression2 = _interopRequireDefault(_getPseudoExpression);

var _sortObject = require('./utils/sortObject');

var _sortObject2 = _interopRequireDefault(_sortObject);

var _splitCondition = require('./utils/splitCondition');

var _splitCondition2 = _interopRequireDefault(_splitCondition);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mixins = {
  condition: _condition2.default,
  contains: _contains2.default,
  extend: _extend2.default
};

var Plugins = {
  mixin: _mixin2.default,
  statefulValue: _statefulValue2.default,
  statefulSelector: _statefulSelector2.default,
  styleLogger: _styleLogger2.default
};

var Utils = {
  copyProperties: _copyProperties2.default,
  getChildType: _getChildType2.default,
  sortObject: _sortObject2.default,
  splitCondition: _splitCondition2.default,
  getPseudoExpression: _getPseudoExpression2.default
};

exports.default = {
  enhancer: _enhancer2.default,
  resolver: resolver,

  Mixins: Mixins,
  Plugins: Plugins,
  Utils: Utils
};
module.exports = exports['default'];
},{"./core/enhancer":203,"./core/resolver":204,"./mixins/condition":206,"./mixins/contains":207,"./mixins/extend":208,"./plugins/mixin":209,"./plugins/statefulSelector":210,"./plugins/statefulValue":211,"./plugins/styleLogger":212,"./utils/copyProperties":213,"./utils/getChildType":214,"./utils/getPseudoExpression":215,"./utils/sortObject":216,"./utils/splitCondition":217}],206:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _splitCondition = require('../utils/splitCondition');

var _splitCondition2 = _interopRequireDefault(_splitCondition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Condition mixins are shortcuts to check if a prop/state fulfills a given expression
 * Therefore it uses Component which gets provided as part of arguments to validate props/state
 */
exports.default = {
  greaterThan: function greaterThan(_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var mixinKey = _ref.mixinKey;
    var Component = _ref.Component;

    var condition = (0, _splitCondition2.default)(property, mixinKey, Component);
    return condition && condition.left >= condition.right ? value : false;
  },
  lessThan: function lessThan(_ref2) {
    var property = _ref2.property;
    var value = _ref2.value;
    var mixinKey = _ref2.mixinKey;
    var Component = _ref2.Component;

    var condition = (0, _splitCondition2.default)(property, mixinKey, Component);
    return condition && condition.left <= condition.right ? value : false;
  },
  unEqual: function unEqual(_ref3) {
    var property = _ref3.property;
    var value = _ref3.value;
    var mixinKey = _ref3.mixinKey;
    var Component = _ref3.Component;

    var condition = (0, _splitCondition2.default)(property, mixinKey, Component);
    return condition && condition.left != condition.right ? value : false; // eslint-disable-line eqeqeq
  },
  greater: function greater(_ref4) {
    var property = _ref4.property;
    var value = _ref4.value;
    var mixinKey = _ref4.mixinKey;
    var Component = _ref4.Component;

    var condition = (0, _splitCondition2.default)(property, mixinKey, Component);
    return condition && condition.left > condition.right ? value : false;
  },
  less: function less(_ref5) {
    var property = _ref5.property;
    var value = _ref5.value;
    var mixinKey = _ref5.mixinKey;
    var Component = _ref5.Component;

    var condition = (0, _splitCondition2.default)(property, mixinKey, Component);
    return condition && condition.left < condition.right ? value : false;
  },
  equal: function equal(_ref6) {
    var property = _ref6.property;
    var value = _ref6.value;
    var mixinKey = _ref6.mixinKey;
    var Component = _ref6.Component;

    var condition = (0, _splitCondition2.default)(property, mixinKey, Component);
    return condition && condition.left == condition.right ? value : false; // eslint-disable-line eqeqeq
  }
};
module.exports = exports['default'];
},{"../utils/splitCondition":217}],207:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _getPseudoExpression = require('../utils/getPseudoExpression');

var _getPseudoExpression2 = _interopRequireDefault(_getPseudoExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Evaluates if a element contains a given string

exports.default = function (_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var children = _ref.newProps.children;

  var expression = (0, _getPseudoExpression2.default)(property);

  if ((0, _isString2.default)(children) && children.indexOf(expression) > -1) {
    return value;
  }
  return false;
};

module.exports = exports['default'];
},{"../utils/getPseudoExpression":215,"lodash/isString":191}],208:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assignStyles = require('assign-styles');

var _assignStyles2 = _interopRequireDefault(_assignStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Merge multiple style objects by merging those
 * @param {Object|Array} styles - A set of style objects or a single style object
 */
var mergeStyles = function mergeStyles(styles) {
  if (Array.isArray(styles)) {
    return _assignStyles2.default.apply(undefined, [{}].concat(_toConsumableArray(styles)));
  }
  return (0, _assignStyles2.default)({}, styles);
};

/**
 * Extends a given style object
 * @param {Object} options - mixin options/input
 * options can be either a style object or include a condition as well as styles
 */

exports.default = function (_ref) {
  var options = _ref.value;

  if (options.hasOwnProperty('condition')) {
    if (options.condition && options.styles) {
      return mergeStyles(options.styles);
    }
  } else {
    return mergeStyles(options.styles ? options.styles : options);
  }
};

module.exports = exports['default'];
},{"assign-styles":27}],209:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = mixin;

var _assignStyles = require('assign-styles');

var _assignStyles2 = _interopRequireDefault(_assignStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/*
 * Resolves mixins
 */
function mixin(_ref) {
  var styles = _ref.styles;
  var resolve = _ref.resolve;
  var config = _ref.config;

  var pluginInterface = _objectWithoutProperties(_ref, ['styles', 'resolve', 'config']);

  var mixins = config.mixins;

  // if no custom keys are specified at all
  if ((0, _isEmpty2.default)(mixins)) {
    return styles;
  }

  var newStyles = (0, _assignStyles2.default)({}, styles);

  Object.keys(newStyles).forEach(function (property) {
    var value = newStyles[property]; // eslint-disable-line

    var newValue = void 0;

    // testing every mixin on the current property
    Object.keys(mixins).forEach(function (mixinKey) {
      if (property.indexOf(mixinKey) > -1) {
        var mixinInterface = _extends({}, pluginInterface, {
          property: property,
          value: value,
          mixinKey: mixinKey,
          config: config
        });
        newValue = mixins[mixinKey](mixinInterface);
      }
    });

    // only assign if there are new styles
    if (newValue !== undefined) {
      if (newValue instanceof Object) {
        newStyles = (0, _assignStyles2.default)(newStyles, resolve(_extends({}, pluginInterface, {
          styles: newValue,
          resolve: resolve,
          config: config
        })));
      }

      delete newStyles[property];
    }
  });

  return newStyles;
}
module.exports = exports['default'];
},{"assign-styles":27,"lodash/isEmpty":183}],210:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = statefulSelector;

var _assignStyles = require('assign-styles');

var _assignStyles2 = _interopRequireDefault(_assignStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Resolves selectors that are functions
 * Calling them with props, state, context as parameter
 */
function statefulSelector(_ref) {
  var styles = _ref.styles;
  var Component = _ref.Component;
  var resolve = _ref.resolve;

  var pluginInterface = _objectWithoutProperties(_ref, ['styles', 'Component', 'resolve']);

  Object.keys(styles).forEach(function (property) {
    var value = styles[property];
    if (property === '_statefulSelector') {
      // if stateful value already resolved just use that
      var newStyles = (0, _isFunction2.default)(value) ? value(Component.props, Component.state, Component.context) : value;
      styles = resolve(_extends({}, pluginInterface, {
        styles: newStyles,
        Component: Component,
        resolve: resolve
      }));
    } else if ((0, _isPlainObject2.default)(value)) {
      styles[property] = resolve(_extends({}, pluginInterface, {
        styles: (0, _assignStyles2.default)({}, value),
        Component: Component,
        resolve: resolve
      }));
    }
  });

  return styles;
}
module.exports = exports['default'];
},{"assign-styles":27,"lodash/isFunction":184,"lodash/isPlainObject":190}],211:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = statefulValue;

var _assignStyles = require('assign-styles');

var _assignStyles2 = _interopRequireDefault(_assignStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Resolves values that are functions
 * Calling them with props, state, context as parameter
 */
function statefulValue(_ref) {
  var styles = _ref.styles;
  var Component = _ref.Component;
  var resolve = _ref.resolve;

  var pluginInterface = _objectWithoutProperties(_ref, ['styles', 'Component', 'resolve']);

  Object.keys(styles).forEach(function (property) {
    var value = styles[property];
    if ((0, _isFunction2.default)(value)) {
      styles[property] = value(Component.props, Component.state, Component.context);
    } else if ((0, _isPlainObject2.default)(value)) {
      styles[property] = resolve(_extends({}, pluginInterface, {
        styles: (0, _assignStyles2.default)({}, value),
        Component: Component,
        resolve: resolve
      }));
    }
  });

  return styles;
}
module.exports = exports['default'];
},{"assign-styles":27,"lodash/isFunction":184,"lodash/isPlainObject":190}],212:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _getChildType = require('../utils/getChildType');

var _getChildType2 = _interopRequireDefault(_getChildType);

var _inlineStyleTransformer = require('inline-style-transformer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Logs styles according to different settings
 */

exports.default = function (_ref) {
  var styles = _ref.styles;
  var Component = _ref.Component;
  var element = _ref.element;
  var newProps = _ref.newProps;
  var styleLogger = _ref.config.styleLogger;

  if (styleLogger) {
    (function () {
      // Logger information
      var ref = element.ref;
      var key = element.key;


      var childType = (0, _getChildType2.default)(element);

      var keyInfo = key !== null ? 'key=' + key : '';
      var refInfo = ref !== null ? 'ref=' + ref : '';

      var elementReference = keyInfo + (keyInfo !== '' && refInfo !== '' ? ';' : '') + refInfo;
      var elementInfo = childType + (elementReference !== '' ? '[' + elementReference + ']' : '');

      var loggerPrefix = Component.constructor.displayName + ':' + elementInfo + '';
      var logStyles = styleLogger.toString === true ? (0, _inlineStyleTransformer.toCSS)(styles) : styles;

      var log = function log() {
        if (styleLogger.noEmpty && (0, _isEmpty2.default)(logStyles)) {
          return;
        }
        console.log(loggerPrefix, logStyles); // eslint-disable-line
      };

      // logs styles if a given event got triggered
      if (styleLogger.onEvent && !newProps._styleLoggerActive) {
        // Allowing multiple events
        if (!Array.isArray(styleLogger.onEvent)) {
          styleLogger.onEvent = [styleLogger.onEvent];
        }
        // Iterate every event and add event listeners
        styleLogger.onEvent.forEach(function (event) {
          var existingEvent = newProps[event];
          newProps[event] = function (e) {
            if (existingEvent) {
              existingEvent();
            }
            newProps._styleLoggerEvent(e);
          };
        });

        newProps._styleLoggerActive = true;
      }

      newProps._styleLoggerEvent = function (e) {
        log();
        if (styleLogger.onlyTopMost) {
          if (e) {
            e.stopPropagation();
          }
        }
      };

      newProps._lookShouldUpdate = true;

      // logs styles everytime the element gets rendered
      if (styleLogger.onRender) {
        log();
      }
    })();
  }

  return styles;
};

module.exports = exports['default'];
},{"../utils/getChildType":214,"inline-style-transformer":78,"lodash/isEmpty":183}],213:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = copyProperties;
// Taken from Radium's core directly
// https://github.com/FormidableLabs/radium/blob/master/src/enhancer.js#L8
// This ensures hot reloading working fine, see issue
// https://github.com/FormidableLabs/radium/pull/255
var KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES = ['arguments', 'callee', 'caller', 'length', 'name', 'prototype', 'type'];

function copyProperties(source, target) {
  Object.getOwnPropertyNames(source).forEach(function (key) {
    if (KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES.indexOf(key) < 0 && !target.hasOwnProperty(key)) {
      var descriptor = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, descriptor);
    }
  });
}
module.exports = exports['default'];
},{}],214:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

exports.default = getChildType;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a childs type
 * If child is an ES6 class it returns the displayName
 * @param {Object} child - child which type gets identified
 */
function getChildType(child) {
  if ((0, _isFunction2.default)(child.type)) {
    return child.type.hasOwnProperty('name') ? child.type.name : child.type;
  }
  return child.type;
}
module.exports = exports['default'];
},{"lodash/isFunction":184}],215:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Extracts only the mathematical expression out an pseudo-class string
 * @param {string} pseudo - pseudo-class selector that includes a mathmactical expression
 */

exports.default = function (pseudo) {
  if (pseudo.indexOf('(') > -1) {
    var split = pseudo.replace(/ /g, '').split('(');
    return split[1].substr(0, split[1].length - 1);
  }
  return false;
};

module.exports = exports['default'];
},{}],216:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortObject;
/**
 * Sorts objects in order to always get the same hash code
 * @param {Object} obj - Object that gets sorted
 */
function sortObject(obj) {
  return Object.keys(obj).sort().reduce(function (output, property) {
    output[property] = obj[property]; // eslint-disable-line
    return output; // eslint-disable-line
  }, {});
}
module.exports = exports['default'];
},{}],217:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Splits an expression at a given operator and returns both values converted to compare them with ease
 * @param {string} key - key that gets evaluated, in this case the expression
 * @param {operator} operator - operator which splits property and value
 * @param {Object} Component - outer React Component holding props and state to match
 */

exports.default = function (key, operator, Component) {
  if (key.indexOf(operator) === -1) {
    return false;
  }

  var matchValues = (0, _assign2.default)({}, Component.props, Component.state);

  var _key$split = key.split(operator);

  var _key$split2 = _slicedToArray(_key$split, 2);

  var property = _key$split2[0];
  var value = _key$split2[1];

  var _property$split = property.split('.');

  var _property$split2 = _slicedToArray(_property$split, 1);

  var baseProp = _property$split2[0];


  if (matchValues.hasOwnProperty(baseProp)) {
    var match = (0, _get2.default)(matchValues, property);

    match = match === undefined ? 'undefined' : match;

    if (!(!isNaN(parseFloat(match)) && isFinite(match))) {
      match = (match + '').toString();
    }

    return { left: match, right: value };
  }

  return false;
};

module.exports = exports['default'];
},{"lodash/assign":172,"lodash/get":176}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvc29oYWFtL2RldmVsL3JlYWN0LWltYWdlcy1mb3JrL2V4YW1wbGVzL3NyYy9hcHAuanMiLCIvaG9tZS9zb2hhYW0vZGV2ZWwvcmVhY3QtaW1hZ2VzLWZvcmsvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvR2FsbGVyeS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL2FwaS9Mb29rUm9vdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi9hcGkvUHJlZml4ZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvYXBpL1N0eWxlQ29udGFpbmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL2FwaS9TdHlsZVNoZWV0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL2NvcmUvcmVuZGVyZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvY29yZS9yZXNvbHZlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi9taXhpbnMvZXh0cmFjdENTUy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi9taXhpbnMvcGxhdGZvcm1RdWVyeS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi9taXhpbnMvc3Vic3RyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3BsdWdpbnMvZmFsbGJhY2tWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi9wbHVnaW5zL2ZyaWVuZGx5Q2xhc3NOYW1lLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3BsdWdpbnMvbGludGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3ByZWZpeGVyL0R5bmFtaWNQcmVmaXhlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi9wcmVmaXhlci9TdGF0aWNQcmVmaXhlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi9wcmVzZXRzL3JlYWN0LWRvbS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi91dGlscy9jYW1lbFRvRGFzaENhc2UuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvdXRpbHMvZ2VuZXJhdGVIYXNoQ29kZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi91dGlscy9nZXRGb250Rm9ybWF0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3V0aWxzL2lzRHluYW1pY0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3V0aWxzL2lzTWVkaWFRdWVyeS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi91dGlscy9pc1BzZXVkby5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi91dGlscy9zb3J0UHNldWRvQ2xhc3Nlcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9hc3NpZ24tc3R5bGVzL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi9MaW50ZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLWxpbnRlci9saWIvZGF0YS9wcm9wZXJ0eU1hcC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi9wbHVnaW5zL2NvbXBhdGliaWxpdHkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLWxpbnRlci9saWIvcGx1Z2lucy9ub0luaXRpYWxWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi9wbHVnaW5zL25vVmVuZG9yUHJlZml4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL3BsdWdpbnMvcHJlZmVyTnVtYmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL3BsdWdpbnMvcmVxdWlyZVVuaXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLWxpbnRlci9saWIvcGx1Z2lucy9zaG9ydGhhbmRMb25naGFuZC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi91dGlscy9icm93c2VyTmFtZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLWxpbnRlci9saWIvdXRpbHMvaXNBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi91dGlscy9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi91dGlscy9pc1VuaXRsZXNzUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLWxpbnRlci9saWIvdXRpbHMvdGFyZ2V0QnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi91dGlscy91bnByZWZpeFByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL3V0aWxzL3VucHJlZml4U3R5bGVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL3V0aWxzL3VucHJlZml4VmFsdWUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLWxpbnRlci9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4LWFsbC9saWIvcGx1Z2lucy9jYWxjLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi9wbHVnaW5zL2N1cnNvci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4LWFsbC9saWIvcGx1Z2lucy9mbGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi9wbHVnaW5zL2ZsZXhib3hJRS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4LWFsbC9saWIvcGx1Z2lucy9mbGV4Ym94T2xkLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi9wbHVnaW5zL2dyYWRpZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi9wbHVnaW5zL3NpemluZy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4LWFsbC9saWIvcGx1Z2lucy90cmFuc2l0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi9wcmVmaXhBbGwuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeC1hbGwvbGliL3ByZWZpeFByb3BzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi91dGlscy9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeC1hbGwvbGliL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4LWFsbC9saWIvdXRpbHMvY2FwaXRhbGl6ZVN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4LWFsbC9saWIvdXRpbHMvam9pblByZWZpeGVkUnVsZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeC1hbGwvbGliL3V0aWxzL3VucHJlZml4UHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9QcmVmaXhlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3BsdWdpbnMvY2FsYy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3BsdWdpbnMvY3Vyc29yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvcGx1Z2lucy9mbGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvcGx1Z2lucy9mbGV4Ym94SUUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9wbHVnaW5zL2ZsZXhib3hPbGQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9wbHVnaW5zL2dyYWRpZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvcGx1Z2lucy9zaXppbmcuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9wbHVnaW5zL3RyYW5zaXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9wcmVmaXhQcm9wcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3V0aWxzL2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3V0aWxzL2dldEJyb3dzZXJJbmZvcm1hdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3V0aWxzL2dldFByZWZpeGVkS2V5ZnJhbWVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9ub2RlX21vZHVsZXMvYm93c2VyL2Jvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtdHJhbnNmb3JtZXIvbGliL1RyYW5zZm9ybWVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS10cmFuc2Zvcm1lci9saWIvdXRpbHMvZGFzaFRvQ2FtZWxDYXNlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS10cmFuc2Zvcm1lci9saWIvdXRpbHMvaXNOdW1iZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19EYXRhVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0hhc2guanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19NYXAuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19NYXBDYWNoZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19SZWZsZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fU2V0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3RhY2suanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19VaW50OEFycmF5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fV2Vha01hcC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FkZE1hcEVudHJ5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYWRkU2V0RW50cnkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19hcHBseS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5RWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5UHVzaC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5UmVkdWNlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNzaWduTWVyZ2VWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Fzc2lnblZhbHVlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNzb2NEZWxldGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY0dldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Fzc29jSGFzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNzb2NJbmRleE9mLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNzb2NTZXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlQXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUNsb25lLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VGbGF0dGVuLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRBbGxLZXlzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUhhcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUtleXNJbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VNZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VNZXJnZURlZXAuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVGltZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19jYXN0UGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NoZWNrR2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVBcnJheUJ1ZmZlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nsb25lQnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVEYXRhVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nsb25lTWFwLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVSZWdFeHAuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19jbG9uZVNldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nsb25lU3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVUeXBlZEFycmF5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY29weUFycmF5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY29weU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcHlTeW1ib2xzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlQXNzaWduZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRBbGxLZXlzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UHJvdG90eXBlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0U3ltYm9scy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFRhZy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hEZWxldGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoR2V0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaEhhcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hTZXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19pbmRleEtleXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19pbml0Q2xvbmVBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2luaXRDbG9uZUJ5VGFnLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faW5pdENsb25lT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNGbGF0dGVuYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzSG9zdE9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzSW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0l0ZXJhdGVlQ2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzS2V5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNLZXlhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNQcm90b3R5cGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19pdGVyYXRvclRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDbGVhci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcERlbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcEdldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcEhhcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcFNldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcFRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVDcmVhdGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0VG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrQ2xlYXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19zdGFja0RlbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrR2V0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RhY2tIYXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19zdGFja1NldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0cmluZ1RvUGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3RvU291cmNlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2NvbnN0YW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9lcS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvZmxhdHRlbkRlZXAuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2dldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5TGlrZU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNCb29sZWFuLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0J1ZmZlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNFbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNMZW5ndGguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2lzTmF0aXZlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc051bWJlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTdHJpbmcuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1R5cGVkQXJyYXkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2tleXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2tleXNJbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvbWVtb2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvbWVyZ2UuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL3Jlc3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL3RvSW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL3RvUGxhaW5PYmplY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL3RvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL3JlYWN0LWxvb2stY29yZS9saWIvY29yZS9lbmhhbmNlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL2NvcmUvcmVzb2x2ZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvcmVhY3QtbG9vay1jb3JlL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL21peGlucy9jb25kaXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvcmVhY3QtbG9vay1jb3JlL2xpYi9taXhpbnMvY29udGFpbnMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvcmVhY3QtbG9vay1jb3JlL2xpYi9taXhpbnMvZXh0ZW5kLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL3JlYWN0LWxvb2stY29yZS9saWIvcGx1Z2lucy9taXhpbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL3BsdWdpbnMvc3RhdGVmdWxTZWxlY3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL3BsdWdpbnMvc3RhdGVmdWxWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL3BsdWdpbnMvc3R5bGVMb2dnZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvcmVhY3QtbG9vay1jb3JlL2xpYi91dGlscy9jb3B5UHJvcGVydGllcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL3V0aWxzL2dldENoaWxkVHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL3V0aWxzL2dldFBzZXVkb0V4cHJlc3Npb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvcmVhY3QtbG9vay1jb3JlL2xpYi91dGlscy9zb3J0T2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL3JlYWN0LWxvb2stY29yZS9saWIvdXRpbHMvc3BsaXRDb25kaXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O3FCQ0FrQixPQUFPOzs7O3dCQUNGLFdBQVc7Ozs7eUJBRUEsWUFBWTs7aUNBQzFCLHNCQUFzQjs7OztBQUUxQyxJQUFNLE1BQU0sR0FBRyxtQkFBUSxXQUFXLENBQUMsQ0FBQzs7QUFFcEMsU0FBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7QUFDbkMsUUFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEQ7O0FBRUQsSUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xJLElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO1FBQUs7QUFDekMsS0FBRyxvQkFBa0IsR0FBRyxTQUFNO0FBQzlCLFdBQVMsMEJBQXdCLEdBQUcsU0FBTTtBQUMxQyxRQUFNLEVBQUUsb0JBQ1UsR0FBRyxtQ0FDSixHQUFHLGtDQUNILEdBQUcsa0NBQ0gsR0FBRyxlQUNuQjtBQUNELFNBQU8sRUFBRSxxQkFBcUIsQ0FBQyxHQUFHLENBQUM7RUFDbkM7Q0FBQyxDQUFDLENBQUM7QUFDSixJQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxFQUFJO0FBQzNDLFFBQU8sMENBQUssR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEFBQUMsRUFBQyxHQUFHLHFCQUFtQixHQUFHLFNBQU8sR0FBRyxDQUFDO0NBQ2xFLENBQUMsQ0FBQzs7QUFFSCxzQkFDQzs7R0FBVSxNQUFNLEVBQUUsTUFBTSxBQUFDO0NBQ3hCOzs7RUFDQzs7S0FBRyxLQUFLLEVBQUUsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLEFBQUM7O0dBQStCOzs7O0lBQWU7O0dBQUM7Ozs7SUFBZ0I7O0dBQUM7Ozs7SUFBYzs7R0FBb0Q7RUFDakssbUVBQVMsTUFBTSxFQUFFLFNBQVMsQUFBQyxHQUFHO0VBQzlCOzs7O0dBQXNCOztNQUFHLElBQUksRUFBQywyQkFBMkIsRUFBQyxNQUFNLEVBQUMsUUFBUTs7SUFBa0I7R0FBSTtFQUMvRjs7S0FBSyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEFBQUM7R0FBRSxjQUFjO0dBQU87RUFDbEQ7Q0FDSSxFQUNYLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQ2xDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDdEMwQyxPQUFPOzs7OytCQUM5QixtQkFBbUI7Ozs7SUFFbEMsT0FBTztXQUFQLE9BQU87O0FBQ0QsVUFETixPQUFPLEdBQ0U7d0JBRFQsT0FBTzs7QUFFWCw2QkFGSSxPQUFPLDZDQUVIOztBQUVSLE1BQUksQ0FBQyxLQUFLLEdBQUc7QUFDWixpQkFBYyxFQUFFLEtBQUs7QUFDckIsZUFBWSxFQUFFLENBQUM7R0FDZixDQUFDOztBQUVGLE1BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQsTUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxNQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELE1BQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDakQ7O2NBYkksT0FBTzs7U0FjQyxzQkFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQzNCLFFBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QixPQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsZ0JBQVksRUFBRSxLQUFLO0FBQ25CLGtCQUFjLEVBQUUsSUFBSTtJQUNwQixDQUFDLENBQUM7R0FDSDs7O1NBQ2EseUJBQUc7QUFDaEIsT0FBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLGdCQUFZLEVBQUUsQ0FBQztBQUNmLGtCQUFjLEVBQUUsS0FBSztJQUNyQixDQUFDLENBQUM7R0FDSDs7O1NBQ1ksd0JBQUc7QUFDZixPQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsZ0JBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztHQUNIOzs7U0FDUSxvQkFBRztBQUNYLE9BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixnQkFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUM7SUFDekMsQ0FBQyxDQUFDO0dBQ0g7OztTQUNhLHlCQUFHOzs7QUFDaEIsT0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU87QUFDL0IsT0FBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUNqRCxXQUNDOztPQUFHLEdBQUcsRUFBRSxDQUFDLEFBQUMsRUFBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQUFBQyxFQUFDLE9BQU8sRUFBRSxVQUFDLEtBQUs7Y0FBSyxNQUFLLFlBQVksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO09BQUEsQUFBQyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxBQUFDO0tBQ2xHLDBDQUFLLEdBQUcsRUFBRSxHQUFHLENBQUMsU0FBUyxBQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEFBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEFBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEFBQUMsR0FBRztLQUNuSCxDQUNIO0lBQ0YsQ0FBQyxDQUFDOztBQUVILFVBQ0M7O01BQUssS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEFBQUM7SUFDekIsT0FBTztJQUNILENBQ0w7R0FDRjs7O1NBQ00sa0JBQUc7QUFDVCxVQUNDOztNQUFLLFNBQVMsRUFBQyxTQUFTO0lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJOzs7S0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87S0FBTTtJQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSTs7O0tBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0tBQUs7SUFDdkQsSUFBSSxDQUFDLGFBQWEsRUFBRTtJQUNyQjtBQUNDLGlCQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEFBQUM7QUFDdEMsV0FBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxBQUFDO0FBQzFCLFdBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQUFBQztBQUNsQyxnQkFBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEFBQUM7QUFDL0IsZ0JBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxBQUFDO0FBQzNCLFlBQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxBQUFDO0FBQzVCLFVBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQztNQUN2QjtJQUNHLENBQ0w7R0FDRjs7O1FBdEVJLE9BQU87OztBQXVFWixDQUFDOztBQUVGLE9BQU8sQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBQ2hDLE9BQU8sQ0FBQyxTQUFTLEdBQUc7QUFDbkIsT0FBTSxFQUFFLGlCQUFVLEtBQUs7QUFDdkIsUUFBTyxFQUFFLGlCQUFVLE1BQU07QUFDekIsV0FBVSxFQUFFLGlCQUFVLE1BQU07QUFDNUIsTUFBSyxFQUFFLGlCQUFVLElBQUk7Q0FDckIsQ0FBQzs7QUFFRixJQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7O0FBRTFCLElBQU0sTUFBTSxHQUFHO0FBQ2QsUUFBTyxFQUFFO0FBQ1IsWUFBVSxFQUFFLENBQUMsQ0FBQztBQUNkLGFBQVcsRUFBRSxDQUFDLENBQUM7QUFDZixVQUFRLEVBQUUsUUFBUTtFQUNsQjtBQUNELFVBQVMsRUFBRTtBQUNWLGdCQUFjLEVBQUUsT0FBTztBQUN2QixjQUFZLEVBQUUsQ0FBQztBQUNmLE9BQUssRUFBRSxNQUFNO0FBQ2IsUUFBTSxFQUFFLGNBQWM7QUFDdEIsUUFBTSxFQUFFLENBQUM7QUFDVCxVQUFRLEVBQUUsUUFBUTtBQUNsQixPQUFLLEVBQUUsY0FBYztFQUNyQjtBQUNELGVBQWMsRUFBRTtBQUNmLFNBQU8sRUFBRSxPQUFPO0FBQ2hCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsVUFBUSxFQUFFLE1BQU07RUFTaEI7Q0FDRCxDQUFDOzs7Ozs7Ozs7O3FCQUVhLE9BQU87Ozs7QUNwSHRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25TQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG4vLyBpbXBvcnQgTGlnaHRib3ggZnJvbSAncmVhY3QtaW1hZ2VzLWxvb2snO1xuaW1wb3J0IHsgUHJlc2V0cywgTG9va1Jvb3QgfSBmcm9tICdyZWFjdC1sb29rJztcbmltcG9ydCBHYWxsZXJ5IGZyb20gJy4vY29tcG9uZW50cy9HYWxsZXJ5JztcblxuY29uc3QgY29uZmlnID0gUHJlc2V0c1sncmVhY3QtZG9tJ107XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHIpIHtcblx0cmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cblxuY29uc3QgSU1BR0VfTkFNRVMgPSBbJ2NhdCcsICdjYXRzJywgJ2NoYW1lbGVvbicsICdkb2cnLCAnZHVja3MnLCAnZ29hdCcsICdvc3RyaWNoJywgJ3BpZ2VvbicsICdwaWdzJywgJ3NlYWd1bGxzJywgJ3dhc3AnLCAneWF3biddO1xuY29uc3QgSU1BR0VfTUFQID0gSU1BR0VfTkFNRVMubWFwKGltZyA9PiAoe1xuXHRzcmM6IGAuL2ltYWdlcy84MDAtJHtpbWd9LmpwZ2AsXG5cdHRodW1ibmFpbDogYC4vaW1hZ2VzL3RodW1ibmFpbC0ke2ltZ30uanBnYCxcblx0c3Jjc2V0OiBbXG5cdFx0YC4vaW1hZ2VzLzEwMjQtJHtpbWd9LmpwZyAxMDI0d2AsXG5cdFx0YC4vaW1hZ2VzLzgwMC0ke2ltZ30uanBnIDgwMHdgLFxuXHRcdGAuL2ltYWdlcy81MDAtJHtpbWd9LmpwZyA1MDB3YCxcblx0XHRgLi9pbWFnZXMvMzIwLSR7aW1nfS5qcGcgMzIwd2AsXG5cdF0sXG5cdGNhcHRpb246IGNhcGl0YWxpemVGaXJzdExldHRlcihpbWcpXG59KSk7XG5jb25zdCBJTUFHRVNfUFJFTE9BRCA9IElNQUdFX01BUC5tYXAoaW1nID0+IHtcblx0cmV0dXJuIDxpbWcga2V5PXtpbWcuY2FwdGlvbn0gc3JjPXtgLi9pbWFnZXMvMTAyNC0ke2ltZ30uanBnYH0gLz47XG59KTtcblxucmVuZGVyIChcblx0PExvb2tSb290IGNvbmZpZz17Y29uZmlnfT5cblx0XHQ8ZGl2PlxuXHRcdFx0PHAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiA0MCB9fT5Vc2UgeW91ciBrZXlib2FyZCB0byBuYXZpZ2F0ZSA8a2JkPmxlZnQ8L2tiZD4gPGtiZD5yaWdodDwva2JkPiA8a2JkPmVzYzwva2JkPiAmbWRhc2g7IEFsc28sIHRyeSByZXNpemluZyB5b3VyIGJyb3dzZXIgd2luZG93LjwvcD5cblx0XHRcdDxHYWxsZXJ5IGltYWdlcz17SU1BR0VfTUFQfSAvPlxuXHRcdFx0PHA+SW1hZ2VzIGNvdXJ0ZXN5IG9mIDxhIGhyZWY9XCJodHRwOi8vZ3JhdGlzb2dyYXBoeS5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+R3JhdGlzb2dyYXBoeTwvYT48L3A+XG5cdFx0XHQ8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fT57SU1BR0VTX1BSRUxPQUR9PC9kaXY+XG5cdFx0PC9kaXY+XG5cdDwvTG9va1Jvb3Q+LFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpXG4pO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcy1sb29rJztcblxuY2xhc3MgR2FsbGVyeSBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0bGlnaHRib3hJc09wZW46IGZhbHNlLFxuXHRcdFx0Y3VycmVudEltYWdlOiAwLFxuXHRcdH07XG5cblx0XHR0aGlzLmNsb3NlTGlnaHRib3ggPSB0aGlzLmNsb3NlTGlnaHRib3guYmluZCh0aGlzKTtcblx0XHR0aGlzLmdvdG9OZXh0ID0gdGhpcy5nb3RvTmV4dC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZ290b1ByZXZpb3VzID0gdGhpcy5nb3RvUHJldmlvdXMuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9wZW5MaWdodGJveCA9IHRoaXMub3BlbkxpZ2h0Ym94LmJpbmQodGhpcyk7XG5cdH1cblx0b3BlbkxpZ2h0Ym94IChpbmRleCwgZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiBpbmRleCxcblx0XHRcdGxpZ2h0Ym94SXNPcGVuOiB0cnVlLFxuXHRcdH0pO1xuXHR9XG5cdGNsb3NlTGlnaHRib3ggKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiAwLFxuXHRcdFx0bGlnaHRib3hJc09wZW46IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cdGdvdG9QcmV2aW91cyAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlIC0gMSxcblx0XHR9KTtcblx0fVxuXHRnb3RvTmV4dCAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlICsgMSxcblx0XHR9KTtcblx0fVxuXHRyZW5kZXJHYWxsZXJ5ICgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaW1hZ2VzKSByZXR1cm47XG5cdFx0Y29uc3QgZ2FsbGVyeSA9IHRoaXMucHJvcHMuaW1hZ2VzLm1hcCgob2JqLCBpKSA9PiB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8YSBrZXk9e2l9IGhyZWY9e29iai5zcmN9IG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy5vcGVuTGlnaHRib3goaSwgZXZlbnQpfSBzdHlsZT17c3R5bGVzLnRodW1ibmFpbH0+XG5cdFx0XHRcdFx0PGltZyBzcmM9e29iai50aHVtYm5haWx9IHN0eWxlPXtzdHlsZXMudGh1bWJuYWlsSW1hZ2V9IHdpZHRoPXtzdHlsZXMudGh1bWJuYWlsLnNpemV9IGhlaWdodD17c3R5bGVzLnRodW1ibmFpbC5zaXplfSAvPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgc3R5bGU9e3N0eWxlcy5nYWxsZXJ5fT5cblx0XHRcdFx0e2dhbGxlcnl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5oZWFkaW5nICYmIDxoMj57dGhpcy5wcm9wcy5oZWFkaW5nfTwvaDI+fVxuXHRcdFx0XHR7dGhpcy5wcm9wcy5zdWJoZWFkaW5nICYmIDxwPnt0aGlzLnByb3BzLnN1YmhlYWRpbmd9PC9wPn1cblx0XHRcdFx0e3RoaXMucmVuZGVyR2FsbGVyeSgpfVxuXHRcdFx0XHQ8TGlnaHRib3hcblx0XHRcdFx0XHRjdXJyZW50SW1hZ2U9e3RoaXMuc3RhdGUuY3VycmVudEltYWdlfVxuXHRcdFx0XHRcdGltYWdlcz17dGhpcy5wcm9wcy5pbWFnZXN9XG5cdFx0XHRcdFx0aXNPcGVuPXt0aGlzLnN0YXRlLmxpZ2h0Ym94SXNPcGVufVxuXHRcdFx0XHRcdG9uQ2xpY2tQcmV2PXt0aGlzLmdvdG9QcmV2aW91c31cblx0XHRcdFx0XHRvbkNsaWNrTmV4dD17dGhpcy5nb3RvTmV4dH1cblx0XHRcdFx0XHRvbkNsb3NlPXt0aGlzLmNsb3NlTGlnaHRib3h9XG5cdFx0XHRcdFx0dGhlbWU9e3RoaXMucHJvcHMudGhlbWV9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59O1xuXG5HYWxsZXJ5LmRpc3BsYXlOYW1lID0gJ0dhbGxlcnknO1xuR2FsbGVyeS5wcm9wVHlwZXMgPSB7XG5cdGltYWdlczogUHJvcFR5cGVzLmFycmF5LFxuXHRoZWFkaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRzdWJoZWFkaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRzZXBpYTogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5jb25zdCBUSFVNQk5BSUxfU0laRSA9IDcyO1xuXG5jb25zdCBzdHlsZXMgPSB7XG5cdGdhbGxlcnk6IHtcblx0XHRtYXJnaW5MZWZ0OiAtNSxcblx0XHRtYXJnaW5SaWdodDogLTUsXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxuXHR9LFxuXHR0aHVtYm5haWw6IHtcblx0XHRiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcblx0XHRib3JkZXJSYWRpdXM6IDMsXG5cdFx0ZmxvYXQ6ICdsZWZ0Jyxcblx0XHRoZWlnaHQ6IFRIVU1CTkFJTF9TSVpFLFxuXHRcdG1hcmdpbjogNSxcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXG5cdFx0d2lkdGg6IFRIVU1CTkFJTF9TSVpFLFxuXHR9LFxuXHR0aHVtYm5haWxJbWFnZToge1xuXHRcdGRpc3BsYXk6ICdibG9jaycsXG5cdFx0aGVpZ2h0OiAnYXV0bycsXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcblx0XHQvLyBoZWlnaHQ6IFRIVU1CTkFJTF9TSVpFLFxuXHRcdC8vIGxlZnQ6ICc1MCUnLFxuXHRcdC8vIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdC8vXG5cdFx0Ly8gV2Via2l0VHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXG5cdFx0Ly8gTW96VHJhbnNmb3JtOiAgICAndHJhbnNsYXRlWCgtNTAlKScsXG5cdFx0Ly8gbXNUcmFuc2Zvcm06ICAgICAndHJhbnNsYXRlWCgtNTAlKScsXG5cdFx0Ly8gdHJhbnNmb3JtOiAgICAgICAndHJhbnNsYXRlWCgtNTAlKScsXG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYWxsZXJ5O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvbWVyZ2UnKTtcblxudmFyIF9tZXJnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXJnZSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX1ByZWZpeGVyID0gcmVxdWlyZSgnLi9QcmVmaXhlcicpO1xuXG52YXIgX1ByZWZpeGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1ByZWZpeGVyKTtcblxudmFyIF9TdHlsZUNvbnRhaW5lciA9IHJlcXVpcmUoJy4vU3R5bGVDb250YWluZXInKTtcblxudmFyIF9TdHlsZUNvbnRhaW5lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdHlsZUNvbnRhaW5lcik7XG5cbnZhciBfcmVzb2x2ZXIgPSByZXF1aXJlKCcuLi9jb3JlL3Jlc29sdmVyJyk7XG5cbnZhciBfcmVzb2x2ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVzb2x2ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBjb250ZXh0VHlwZSA9IHsgX2xvb2tDb25maWc6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0IH07XG4vKipcbiAqIFJvb3Qgd3JhcHBlciB0aGF0IHdyYXBzIHlvdXIgd2hvbGUgYXBwbGljYXRpb25cbiAqIEl0IHJlbmRlcnMgdGhlIGdsb2JhbCBDU1Mgc3R5bGVzIGFuZCBwYXNzZXMgdGhlIGNvbmZpZyBkb3duXG4gKi9cblxudmFyIExvb2tSb290ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKExvb2tSb290LCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMb29rUm9vdChwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMb29rUm9vdCk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTG9va1Jvb3QpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuXG4gICAgX3RoaXMuY29uZmlnID0gKDAsIF9tZXJnZTIuZGVmYXVsdCkoe30sIHByb3BzLmNvbmZpZywge1xuICAgICAgX3Jlc29sdmVTdHlsZXM6IF9yZXNvbHZlcjIuZGVmYXVsdFxuICAgIH0pO1xuXG4gICAgdmFyIHByZWZpeGVyID0gX3RoaXMuY29uZmlnLnByZWZpeGVyO1xuXG4gICAgaWYgKCFwcmVmaXhlciB8fCAhcHJlZml4ZXIuX2lzTG9va1ByZWZpeGVyKSB7XG4gICAgICBfdGhpcy5jb25maWcucHJlZml4ZXIgPSBuZXcgX1ByZWZpeGVyMi5kZWZhdWx0KCk7XG4gICAgfVxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhMb29rUm9vdCwgW3tcbiAgICBrZXk6ICdnZXRDaGlsZENvbnRleHQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICByZXR1cm4geyBfbG9va0NvbmZpZzogdGhpcy5jb25maWcgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdmFyIF9jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgIHZhciBzdHlsZUVsZW1lbnRJZCA9IF9jb25maWcuc3R5bGVFbGVtZW50SWQ7XG4gICAgICB2YXIgcHJlZml4ZXIgPSBfY29uZmlnLnByZWZpeGVyO1xuXG4gICAgICBuZXcgU3R5bGVDb21wb25lbnQoc3R5bGVFbGVtZW50SWQsIHByZWZpeGVyKS5yZW5kZXIoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTG9va1Jvb3Q7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG4vKipcbiAqIFN0eWxlQ29tcG9uZW50IGlzIHVzZWQgdG8gcmVuZGVyIHN0YXRpYyBDU1MgbWFya3VwXG4gKiBpbnRvIGEgPHN0eWxlPiBlbGVtZW50IHNvIENTUyBzdHlsZXMgYXJlIHJlbmRlcmVkIGNvcnJlY3RseVxuICogaXQgbGlzdGVucyBmb3IgY2hhbmdlcyBvZiB0aGUgZ2xvYmFsIHN0eWxlIGNvbnRhaW5lclxuICovXG5cblxuTG9va1Jvb3QuY2hpbGRDb250ZXh0VHlwZXMgPSBjb250ZXh0VHlwZTtcbkxvb2tSb290LmNvbnRleHRUeXBlcyA9IGNvbnRleHRUeXBlO1xuZXhwb3J0cy5kZWZhdWx0ID0gTG9va1Jvb3Q7XG5cbnZhciBTdHlsZUNvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3R5bGVDb21wb25lbnQoc3R5bGVFbGVtZW50SWQsIHByZWZpeGVyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0eWxlQ29tcG9uZW50KTtcblxuICAgIHRoaXMuc3R5bGVzID0gX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LnJlbmRlclN0YXRpY1N0eWxlcyhwcmVmaXhlcik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB0aGlzLnVwZGF0ZVN0eWxlcyA9IHRoaXMudXBkYXRlU3R5bGVzLmJpbmQodGhpcywgcHJlZml4ZXIpO1xuXG4gICAgdGhpcy5fY2hhbmdlTGlzdGVuZXIgPSBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQuc3Vic2NyaWJlKHRoaXMudXBkYXRlU3R5bGVzKTtcbiAgICB0aGlzLmVsID0gdGhpcy5jcmVhdGVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50SWQpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFN0eWxlQ29tcG9uZW50LCBbe1xuICAgIGtleTogJ2NyZWF0ZVN0eWxlRWxlbWVudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnRJZCkge1xuICAgICAgLy8gaWYgYSBjdXN0b20gc3R5bGUgZWxlbWVudCBpcyBwcm92aWRlZFxuICAgICAgLy8gd2UgY2FuIHVzZSB0aGF0IG9uZSBpbnN0ZWFkIG9mIGNyZWF0aW5nIG91ciBvd25cbiAgICAgIGlmIChzdHlsZUVsZW1lbnRJZCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3R5bGVFbGVtZW50SWQpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGUuaWQgPSAnX3JlYWN0LWxvb2stc3R5bGVzaGVldCc7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblxuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVN0eWxlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVN0eWxlcyhwcmVmaXhlcikge1xuICAgICAgdmFyIG5ld1N0eWxlcyA9IF9TdHlsZUNvbnRhaW5lcjIuZGVmYXVsdC5yZW5kZXJTdGF0aWNTdHlsZXMocHJlZml4ZXIpO1xuICAgICAgLy8gb25seSByZW5kZXIgaWYgc29tZXRoaW5nIGNoYW5nZWRcbiAgICAgIGlmICh0aGlzLnN0eWxlcyAhPT0gbmV3U3R5bGVzKSB7XG4gICAgICAgIHRoaXMuc3R5bGVzID0gbmV3U3R5bGVzO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHRoaXMuZWwuaW5uZXJUZXh0ID0gdGhpcy5zdHlsZXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFN0eWxlQ29tcG9uZW50O1xufSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBQcmVmaXhlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUHJlZml4ZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFByZWZpeGVyKTtcblxuICAgIHRoaXMuX2lzTG9va1ByZWZpeGVyID0gdHJ1ZTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQcmVmaXhlciwgW3tcbiAgICBrZXk6ICdwcmVmaXgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVmaXgoc3R5bGVzKSB7XG4gICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldEtleWZyYW1lc1ByZWZpeCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEtleWZyYW1lc1ByZWZpeCgpIHtcbiAgICAgIHJldHVybiBbJyddO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQcmVmaXhlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUHJlZml4ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvbWVyZ2UnKTtcblxudmFyIF9tZXJnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXJnZSk7XG5cbnZhciBfaXNFbXB0eSA9IHJlcXVpcmUoJ2xvZGFzaC9pc0VtcHR5Jyk7XG5cbnZhciBfaXNFbXB0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0VtcHR5KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9pbmxpbmVTdHlsZVRyYW5zZm9ybWVyID0gcmVxdWlyZSgnaW5saW5lLXN0eWxlLXRyYW5zZm9ybWVyJyk7XG5cbnZhciBfcmVhY3RMb29rQ29yZSA9IHJlcXVpcmUoJ3JlYWN0LWxvb2stY29yZScpO1xuXG52YXIgX1ByZWZpeGVyID0gcmVxdWlyZSgnLi9QcmVmaXhlcicpO1xuXG52YXIgX1ByZWZpeGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1ByZWZpeGVyKTtcblxudmFyIF9nZW5lcmF0ZUhhc2hDb2RlID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2VuZXJhdGVIYXNoQ29kZScpO1xuXG52YXIgX2dlbmVyYXRlSGFzaENvZGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2VuZXJhdGVIYXNoQ29kZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBzb3J0T2JqZWN0ID0gX3JlYWN0TG9va0NvcmUuVXRpbHMuc29ydE9iamVjdDtcblxuXG4vKipcbiAqIEEgU3R5bGVDb250YWluZXIgY29sbGVjdHMgY2xhc3NOYW1lIG1hcHBpbmdzXG4gKiB0aGF0IGNhbiBiZSByZW5kZXJlZCBpbnRvIGEgc3RhdGljIENTUyBzdHJpbmdcbiAqL1xuXG52YXIgU3R5bGVDb250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0eWxlQ29udGFpbmVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdHlsZUNvbnRhaW5lcik7XG5cbiAgICB0aGlzLnNlbGVjdG9ycyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLm1lZGlhUXVlcmllcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmtleWZyYW1lcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmZvbnRzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZHluYW1pY3MgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5zdGF0aWNzID0gbmV3IFNldCgpO1xuXG4gICAgdGhpcy5fY2xhc3NOYW1lID0gMDtcbiAgICB0aGlzLl9kZWZhdWx0Q2xhc3NQcmVmaXggPSAnYyc7XG4gICAgdGhpcy5fbGlzdGVuZXIgPSBuZXcgU2V0KCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBzZWxlY3RvciB3aXRoIHN0eWxlc1xuICAgKiBpdCBpcyBhbHNvIHVzZWQgdG8gYWRkIG1lZGlhIHF1ZXJpZXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gc2VsZWN0b3IgdG8gcmVmZXJlbmNlIHRoZSBzdHlsZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIHN0eWxlcyB0aGF0IGdldCBhZGRlZFxuICAgKiBAcGFyYW0ge3N0cmluZz99IG1lZGlhIC0gbWVkaWEgcXVlcnkgc3RyaW5nXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFN0eWxlQ29udGFpbmVyLCBbe1xuICAgIGtleTogJ2FkZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChzZWxlY3Rvciwgc3R5bGVzLCBtZWRpYSkge1xuICAgICAgaWYgKG1lZGlhICYmIG1lZGlhICE9PSAnJykge1xuICAgICAgICB0aGlzLl9hZGRNZWRpYVF1ZXJ5KHNlbGVjdG9yLCBzdHlsZXMsIG1lZGlhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2FkZEFuZEVtaXQodGhpcy5zZWxlY3RvcnMsIHNlbGVjdG9yLCBzdHlsZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcga2V5ZnJhbWUgYW5pbWF0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFuaW1hdGlvbiAtIG5hbWVkIHVzZWQgdG8gcmVmZXJlbmNlIHRoZSBhbmltYXRpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZnJhbWVzIC0gYW5pbWF0aW9uIGZyYW1lcyB0aGF0IGdldCBhZGRlZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdhZGRLZXlmcmFtZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRLZXlmcmFtZXMoYW5pbWF0aW9uLCBmcmFtZXMpIHtcbiAgICAgIHRoaXMuX2FkZEFuZEVtaXQodGhpcy5rZXlmcmFtZXMsIGFuaW1hdGlvbiwgZnJhbWVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbmV3IGdsb2JhbCBmb250RmFjZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBmb250IC0gaW5mb3JtYXRpb24gb24gdGhlIGZvbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnYWRkRm9udCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEZvbnQoZm9udCkge1xuICAgICAgdmFyIGZvbnRGYWNlID0gJ0Bmb250LWZhY2UgeycgKyAoMCwgX2lubGluZVN0eWxlVHJhbnNmb3JtZXIudG9DU1MpKGZvbnQpICsgJ30nO1xuICAgICAgdGhpcy5fYWRkQW5kRW1pdCh0aGlzLmZvbnRzLCBmb250RmFjZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHN0YXRpYyBjc3Mgc3RyaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlcyAtIGFzIGNzcyBzdHJpbmdcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnYWRkU3RhdGljJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkU3RhdGljKHN0eWxlcykge1xuICAgICAgdGhpcy5fYWRkQW5kRW1pdCh0aGlzLnN0YXRpY3MsIHN0eWxlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIHNpbmdsZSBzdHJpbmcgY29udGFpbmluZyB0aGUgd2hvbGUgQ1NTIHN0eWxlc1xuICAgICAqIEBwYXJhbSB7UHJlZml4ZXJ9IHByZWZpeGVyIC0gdmFsaWQgTG9vayBQcmVmaXhlciB0byBwcmVmaXggc3R5bGVzXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlclN0YXRpY1N0eWxlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclN0YXRpY1N0eWxlcygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBwcmVmaXhlciA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IG5ldyBfUHJlZml4ZXIyLmRlZmF1bHQoKSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgdmFyIGNzcyA9ICcnO1xuXG4gICAgICB0aGlzLmZvbnRzLmZvckVhY2goZnVuY3Rpb24gKGZvbnQpIHtcbiAgICAgICAgcmV0dXJuIGNzcyArPSBmb250O1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN0YXRpY3MuZm9yRWFjaChmdW5jdGlvbiAoc3RhdGljU3R5bGVzKSB7XG4gICAgICAgIHJldHVybiBjc3MgKz0gc3RhdGljU3R5bGVzO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNlbGVjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChzdHlsZXMsIHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBjc3MgKz0gc2VsZWN0b3IgKyBfdGhpcy5fcmVuZGVyQ1NTKHByZWZpeGVyLCBzdHlsZXMpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1lZGlhUXVlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3RvcnMsIHF1ZXJ5KSB7XG4gICAgICAgIGNzcyArPSAnQG1lZGlhJyArIHF1ZXJ5ICsgJ3snO1xuICAgICAgICBzZWxlY3RvcnMuZm9yRWFjaChmdW5jdGlvbiAoc3R5bGVzLCBzZWxlY3Rvcikge1xuICAgICAgICAgIHJldHVybiBjc3MgKz0gc2VsZWN0b3IgKyBfdGhpcy5fcmVuZGVyQ1NTKHByZWZpeGVyLCBzdHlsZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgY3NzICs9ICd9JztcbiAgICAgIH0pO1xuICAgICAgdGhpcy5rZXlmcmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoZnJhbWVzLCBuYW1lKSB7XG4gICAgICAgIGNzcyArPSBwcmVmaXhlci5nZXRLZXlmcmFtZXNQcmVmaXgoKS5yZWR1Y2UoZnVuY3Rpb24gKGtleWZyYW1lcywgcHJlZml4KSB7XG4gICAgICAgICAga2V5ZnJhbWVzICs9ICdAJyArIHByZWZpeCArICdrZXlmcmFtZXMgJyArIG5hbWUgKyBfdGhpcy5fcmVuZGVyQ1NTKHByZWZpeGVyLCBmcmFtZXMpO1xuICAgICAgICAgIHJldHVybiBrZXlmcmFtZXM7XG4gICAgICAgIH0sICcnKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY3NzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBoYXNoIGNvZGUgZm9yIGEgZ2l2ZW4gc3R5bGUgb2JqZWN0XG4gICAgICogaWYgdGhlIHN0eWxlIHByb3BlcnRpZXMgYXJlIHRoZSBzYW1lLCB0aGUgc2FtZSBoYXNoIHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgKiBubyBtYXR0ZXIgaG93IHRoZXkncmUgc29ydGVkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIHN0eWxlIG9iamVjdCB3aGljaCB3aWxsIGdldCBzb3J0ZWQgYW5kIGhhc2hlZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZW5lcmF0ZUNsYXNzTmFtZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdlbmVyYXRlQ2xhc3NOYW1lKHN0eWxlcykge1xuICAgICAgcmV0dXJuICgwLCBfZ2VuZXJhdGVIYXNoQ29kZTIuZGVmYXVsdCkoSlNPTi5zdHJpbmdpZnkoc29ydE9iamVjdChzdHlsZXMpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHZhbGlkIHVudXNlZCBjbGFzc05hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZz99IHByZWZpeCAtIHByZWZpeCBhcHBlbmRlZCBiZWZvcmUgdGhlIGNsYXNzTmFtZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZXF1ZXN0Q2xhc3NOYW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVxdWVzdENsYXNzTmFtZSgpIHtcbiAgICAgIHZhciBwcmVmaXggPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0Q2xhc3NQcmVmaXggOiBhcmd1bWVudHNbMF07XG5cbiAgICAgIHJldHVybiBwcmVmaXggKyAodGhpcy5fY2xhc3NOYW1lKyspLnRvU3RyaW5nKDM2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGNoYW5nZSBsaXN0ZW5lclxuICAgICAqIFJldHVybnMgYW4gaW5zdGFuY2Ugd2l0aCBhbiB1bnN1YnNjcmliZSBtZXRob2RcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIGV2ZW50IGxpc3RlbmVyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3N1YnNjcmliZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuX2xpc3RlbmVyLmFkZChsaXN0ZW5lcik7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMyLl9saXN0ZW5lci5kZWxldGUobGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoYW5nZSBlbWl0dGVyIGV4ZWN1dGVzIGV2ZXJ5IHNpbmdsZSBjaGFuZ2UgbGlzdGVuZXJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2VtaXRDaGFuZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZW1pdENoYW5nZSgpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVyLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcigpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIHRoYXQgQWRkcyBkeW5hbWljIHN0eWxlcyB0byBiZSBhY2Nlc3NlZCBsYXRlciBnbG9iYWxseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgLSBjbGFzc05hbWUgcmVmZXJlbmNlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIHN0eWxlcyB0aGF0IGdldCBhZGRlZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfYWRkRHluYW1pYycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGREeW5hbWljKGNsYXNzTmFtZSwgc3R5bGVzKSB7XG4gICAgICBpZiAoISgwLCBfaXNFbXB0eTIuZGVmYXVsdCkoc3R5bGVzKSkge1xuICAgICAgICB0aGlzLl9hZGRBbmRFbWl0KHRoaXMuZHluYW1pY3MsIGNsYXNzTmFtZSwgc3R5bGVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgdGhhdCBhZGRzIG1lZGlhIHF1ZXJpZXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBzZWxlY3RvciB0byByZWZlcmVuY2UgdGhlIHN0eWxlc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBzdHlsZXMgdGhhdCBnZXQgYWRkZWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZz99IG1lZGlhIC0gbWVkaWEgcXVlcnkgc3RyaW5nXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19hZGRNZWRpYVF1ZXJ5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2FkZE1lZGlhUXVlcnkoc2VsZWN0b3IsIHN0eWxlcywgbWVkaWEpIHtcbiAgICAgIC8vIEFkZCB0aGUgbWVkaWEgaWYgbm90IGV4aXN0aW5nIHlldFxuICAgICAgaWYgKCF0aGlzLm1lZGlhUXVlcmllcy5oYXMobWVkaWEpKSB7XG4gICAgICAgIHRoaXMubWVkaWFRdWVyaWVzLnNldChtZWRpYSwgbmV3IE1hcCgpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1lZGlhUXVlcnkgPSB0aGlzLm1lZGlhUXVlcmllcy5nZXQobWVkaWEpO1xuICAgICAgdGhpcy5fYWRkQW5kRW1pdChtZWRpYVF1ZXJ5LCBzZWxlY3Rvciwgc3R5bGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBYnN0cmFjdCBoZWxwZXIgdG8gYWRkIG5ldyBzdHlsZXMgdG8gYSBNYXAvU2V0XG4gICAgICogQHBhcmFtIHtNYXB8U2V0fSBncm91cCAtIGdyb3VwIHRoYXQgc3R5bGVzIGdldCBhZGRlZCB0b1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIENTUyBzZWxlY3RvciB0aGF0cyB1c2VkIGFzIHJlZmVyZW5jZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBzdHlsZXMgdGhhdCBnZXQgYWRkZWRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2FkZEFuZEVtaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfYWRkQW5kRW1pdChncm91cCwgc2VsZWN0b3IsIHN0eWxlcykge1xuICAgICAgaWYgKCFncm91cC5oYXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIGlmIChzdHlsZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGdyb3VwLnNldChzZWxlY3Rvciwgc3R5bGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBncm91cC5hZGQoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VtaXRDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfcmVuZGVyQ1NTJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3JlbmRlckNTUyhwcmVmaXhlciwgc3R5bGVzKSB7XG4gICAgICByZXR1cm4gJ3snICsgKDAsIF9pbmxpbmVTdHlsZVRyYW5zZm9ybWVyLnRvQ1NTKShwcmVmaXhlci5wcmVmaXgoKDAsIF9tZXJnZTIuZGVmYXVsdCkoe30sIHN0eWxlcykpKSArICd9JztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3R5bGVDb250YWluZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBTdHlsZUNvbnRhaW5lcigpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzRnVuY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2gvaXNGdW5jdGlvbicpO1xuXG52YXIgX2lzRnVuY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNGdW5jdGlvbik7XG5cbnZhciBfaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9pc1BsYWluT2JqZWN0Jyk7XG5cbnZhciBfaXNQbGFpbk9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1BsYWluT2JqZWN0KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfU3R5bGVDb250YWluZXIgPSByZXF1aXJlKCcuL1N0eWxlQ29udGFpbmVyJyk7XG5cbnZhciBfU3R5bGVDb250YWluZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3R5bGVDb250YWluZXIpO1xuXG52YXIgX3JlbmRlcmVyID0gcmVxdWlyZSgnLi4vY29yZS9yZW5kZXJlcicpO1xuXG52YXIgX3JlbmRlcmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlbmRlcmVyKTtcblxudmFyIF9nZXRGb250Rm9ybWF0ID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2V0Rm9udEZvcm1hdCcpO1xuXG52YXIgX2dldEZvbnRGb3JtYXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0Rm9udEZvcm1hdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBrZXlmcmFtZSA9IDA7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHN0eWxlU2hlZXQgd2l0aCBhbiBzY29wZUlkIGFwcGxpZWQgdG8gZXZlcnkgc2VsZWN0b3JcbiAgICogVGhlIHNjb3BlSWQgcmVmZXJzIHRvIHRoZSBDb21wb25lbnQgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgcmVzb2x2aW5nIHRob3NlIHN0eWxlc1xuICAgKiBAcGFyYW0ge3N0eWxlc30gc3R5bGVzIC0gU3R5bGUgc2VsZWN0b3Igb3IgT2JqZWN0IHdpdGggc2VsZWN0b3JzXG4gICAqL1xuXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKHN0eWxlcykge1xuICAgIC8vIGZsYXQgc3R5bGUgb2JqZWN0IHdpdGhvdXQgc2VsZWN0b3JzXG4gICAgdmFyIGZpcnN0S2V5ID0gc3R5bGVzW09iamVjdC5rZXlzKHN0eWxlcylbMF1dO1xuICAgIGlmICghKDAsIF9pc1BsYWluT2JqZWN0Mi5kZWZhdWx0KShmaXJzdEtleSkgJiYgISgwLCBfaXNGdW5jdGlvbjIuZGVmYXVsdCkoZmlyc3RLZXkpKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZW5kZXJlcjIuZGVmYXVsdCkoc3R5bGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGVzKS5yZWR1Y2UoZnVuY3Rpb24gKGNsYXNzZXMsIHNlbGVjdG9yKSB7XG4gICAgICBjbGFzc2VzW3NlbGVjdG9yXSA9ICgwLCBfcmVuZGVyZXIyLmRlZmF1bHQpKHN0eWxlc1tzZWxlY3Rvcl0pO1xuICAgICAgcmV0dXJuIGNsYXNzZXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9LCB7fSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogQ29tYmluZXMgc3R5bGVzIHRvIGEgc2luZ2xlIGNsYXNzTmFtZSBzdHJpbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IC4uLnN0eWxlcyAtIHN0eWxlcyB0aGF0IGdldCBjb21iaW5lZFxuICAgKi9cbiAgY29tYmluZVN0eWxlczogZnVuY3Rpb24gY29tYmluZVN0eWxlcygpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgc3R5bGVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBzdHlsZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlcy5qb2luKCcgJyk7XG4gIH0sXG5cblxuICAvKipcbiAgICogQSBnbG9iYWwgU3R5bGVTaGVldCB0aGF0IGRpcmVjdGx5IGFwcGxpZXMgdG8geW91ciBET01cbiAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIGEgc2V0IG9mIHN0eWxlIG9iamVjdHNcbiAgICogQHBhcmFtIHtzdHJpbmc/fSBzY29wZSAtIGFkZGl0aW9uYWwgc2NvcGluZyBzZWxlY3RvclxuICAgKi9cbiAgYWRkQ1NTOiBmdW5jdGlvbiBhZGRDU1Moc3R5bGVzLCBzY29wZSkge1xuICAgIGlmICh0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LmFkZFN0YXRpYyhzdHlsZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2NvcGVTZWxlY3RvciA9IHNjb3BlICE9PSB1bmRlZmluZWQgJiYgc2NvcGUudHJpbSgpICE9PSAnJyA/IHNjb3BlICsgJyAnIDogJyc7XG4gICAgICAgIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICByZXR1cm4gX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LmFkZChzY29wZVNlbGVjdG9yICsgc2VsZWN0b3IsIHN0eWxlc1tzZWxlY3Rvcl0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pKCk7XG4gICAgfVxuICB9LFxuICB0b0NTUzogZnVuY3Rpb24gdG9DU1Moc3R5bGVzLCBzY29wZSkge1xuICAgIGNvbnNvbGUud2FybignYFN0eWxlU2hlZXQudG9DU1NgIGlzIGRlcHJlY2F0ZWQhIFBsZWFzZSB1c2UgYFN0eWxlU2hlZXQuYWRkQ1NTYCBpbnN0ZWFkIScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgdGhpcy5hZGRDU1Moc3R5bGVzLCBzY29wZSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogUmVuZGVycyBhbGwgc3RhdGljIHN0eWxlcyBpbnRvIGEgc2luZ2xlIENTUyBzdHJpbmdcbiAgICogQHBhcmFtIHtzdHJpbmc/fSB1c2VyQWdlbnQgLSB1c2VyQWdlbnQgdXNlZCB0byBwcmVmaXggc3R5bGVzXG4gICAqL1xuICByZW5kZXJUb1N0cmluZzogZnVuY3Rpb24gcmVuZGVyVG9TdHJpbmcodXNlckFnZW50KSB7XG4gICAgcmV0dXJuIF9TdHlsZUNvbnRhaW5lcjIuZGVmYXVsdC5yZW5kZXJTdGF0aWNTdHlsZXModXNlckFnZW50KTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBBZGRzIGtleWZyYW1lIGFuaW1hdGlvbnMgdG8gdGhlIGdsb2JhbCBTdHlsZVNoZWV0IGFuZCByZXR1cm5zIHRoZSBhbmltYXRpb24gbmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZnJhbWVzIC0ga2V5ZnJhbWVzIHRoYXQgZ2V0IGluc2VydGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nP30gbmFtZSAtIGN1c3RvbSBhbmltYXRpb24gbmFtZVxuICAgKi9cbiAga2V5ZnJhbWVzOiBmdW5jdGlvbiBrZXlmcmFtZXMoZnJhbWVzLCBuYW1lKSB7XG4gICAgdmFyIGFuaW1hdGlvbk5hbWUgPSBuYW1lID8gbmFtZSA6ICdrJyArIGtleWZyYW1lKys7XG5cbiAgICBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQuYWRkS2V5ZnJhbWVzKGFuaW1hdGlvbk5hbWUsIGZyYW1lcyk7XG4gICAgcmV0dXJuIGFuaW1hdGlvbk5hbWU7XG4gIH0sXG5cblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBmb250IGZhbWlseSB0byB0aGUgZ2xvYmFsIFN0eWxlU2hlZXQgZm9yIGdsb2JhbCB1c2FnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm9udEZhbWlseSAtIGZvbnQtZmFtaWx5IGZvciBnbG9iYWwgdXNhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGZpbGVzIC0gc291cmNlIGZpbGVzIHJlZmVyaW5nIHRvIHRoZSBmb250IGZpbGVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIC0gYWRkaXRpb25hbCBmb250IHByb3BlcnRpZXMgaW5jbHVkaW5nIGZvbnRXZWlnaHQsIGZvbnRTdHJldGNoLCBmb250U3R5bGUsIHVuaWNvZGVSYW5nZVxuICAgKi9cbiAgZm9udDogZnVuY3Rpb24gZm9udChmb250RmFtaWx5LCBmaWxlcywgcHJvcGVydGllcykge1xuICAgIGlmIChmaWxlcykge1xuICAgICAgdmFyIF9yZXQyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBHZW5lcmF0ZXMgYSBzdHlsZSBvYmplY3QgaW5jbHVkaW5nIGFsbCBmb250IGluZm9ybWF0aW9uXG4gICAgICAgIHZhciBmb250ID0ge1xuICAgICAgICAgIGZvbnRGYW1pbHk6ICdcXCcnICsgZm9udEZhbWlseSArICdcXCcnLFxuICAgICAgICAgIHNyYzogZmlsZXMubWFwKGZ1bmN0aW9uIChzcmMpIHtcbiAgICAgICAgICAgIHJldHVybiAndXJsKFxcJycgKyBzcmMgKyAnXFwnKSBmb3JtYXQoXFwnJyArICgwLCBfZ2V0Rm9udEZvcm1hdDIuZGVmYXVsdCkoc3JjKSArICdcXCcpJztcbiAgICAgICAgICB9KS5qb2luKCcsJylcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBGaWx0ZXIgdGhlIHByb3BlcnRpZXMgdG8gb25seSBpbmNsdWRlIHZhbGlkIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGZvbnRQcm9wZXJ0aWVzID0gWydmb250V2VpZ2h0JywgJ2ZvbnRTdHJldGNoJywgJ2ZvbnRTdHlsZScsICd1bmljb2RlUmFuZ2UnXTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZpbHRlcihmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgICByZXR1cm4gZm9udFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA+IC0xO1xuICAgICAgICAgICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoZm9udFByb3ApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvbnRbZm9udFByb3BdID0gcHJvcGVydGllc1tmb250UHJvcF07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LmFkZEZvbnQoZm9udCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdjogZm9udEZhbWlseVxuICAgICAgICB9O1xuICAgICAgfSgpO1xuXG4gICAgICBpZiAoKHR5cGVvZiBfcmV0MiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoX3JldDIpKSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIF9yZXQyLnY7XG4gICAgfVxuICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2gvaXNBcnJheScpO1xuXG52YXIgX2lzQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBcnJheSk7XG5cbnZhciBfaXNCb29sZWFuID0gcmVxdWlyZSgnbG9kYXNoL2lzQm9vbGVhbicpO1xuXG52YXIgX2lzQm9vbGVhbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0Jvb2xlYW4pO1xuXG52YXIgX2lzRW1wdHkgPSByZXF1aXJlKCdsb2Rhc2gvaXNFbXB0eScpO1xuXG52YXIgX2lzRW1wdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNFbXB0eSk7XG5cbnZhciBfaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9pc1BsYWluT2JqZWN0Jyk7XG5cbnZhciBfaXNQbGFpbk9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1BsYWluT2JqZWN0KTtcblxudmFyIF9pc0Z1bmN0aW9uID0gcmVxdWlyZSgnbG9kYXNoL2lzRnVuY3Rpb24nKTtcblxudmFyIF9pc0Z1bmN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzRnVuY3Rpb24pO1xuXG5leHBvcnRzLmV4dHJhY3REeW5hbWljU3R5bGVzID0gZXh0cmFjdER5bmFtaWNTdHlsZXM7XG5leHBvcnRzLnJlbmRlclNwZWNpYWxTdHlsZXMgPSByZW5kZXJTcGVjaWFsU3R5bGVzO1xuZXhwb3J0cy5kZWZhdWx0ID0gcmVuZGVyU3RhdGljU3R5bGVzO1xuXG52YXIgX1N0eWxlQ29udGFpbmVyID0gcmVxdWlyZSgnLi4vYXBpL1N0eWxlQ29udGFpbmVyJyk7XG5cbnZhciBfU3R5bGVDb250YWluZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3R5bGVDb250YWluZXIpO1xuXG52YXIgX3NvcnRQc2V1ZG9DbGFzc2VzID0gcmVxdWlyZSgnLi4vdXRpbHMvc29ydFBzZXVkb0NsYXNzZXMnKTtcblxudmFyIF9zb3J0UHNldWRvQ2xhc3NlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zb3J0UHNldWRvQ2xhc3Nlcyk7XG5cbnZhciBfaXNNZWRpYVF1ZXJ5ID0gcmVxdWlyZSgnLi4vdXRpbHMvaXNNZWRpYVF1ZXJ5Jyk7XG5cbnZhciBfaXNNZWRpYVF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzTWVkaWFRdWVyeSk7XG5cbnZhciBfaXNQc2V1ZG8gPSByZXF1aXJlKCcuLi91dGlscy9pc1BzZXVkbycpO1xuXG52YXIgX2lzUHNldWRvMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUHNldWRvKTtcblxudmFyIF9pc0R5bmFtaWNBcnJheSA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzRHluYW1pY0FycmF5Jyk7XG5cbnZhciBfaXNEeW5hbWljQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNEeW5hbWljQXJyYXkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEV4dHJhY3RzIGFsbCBwb3NzaWJsZSBkeW5hbWljIHN0eWxlcyBvdXQgb2YgYSBzdHlsZSBvYmplY3RcbiAqIFRvIGJlIGFibGUgdG8gcmVuZGVyIGFsbCBvdGhlciAoc3RhdGljKSBzdHlsZXMgZGlyZWN0bHkgdG8gQ1NTXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIC0gcHVyZSBzdHlsZSBvYmplY3Qgd2hpY2ggZ2V0cyBwYXJzZWRcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdER5bmFtaWNTdHlsZXMoc3R5bGVzKSB7XG4gIC8vIGVhcmx5IHJldHVybiBzdGF0ZWZ1bCBzZWxlY3RvcnNcbiAgaWYgKCgwLCBfaXNGdW5jdGlvbjIuZGVmYXVsdCkoc3R5bGVzKSkge1xuICAgIHJldHVybiB7IF9zdGF0ZWZ1bFNlbGVjdG9yOiBzdHlsZXMgfTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZXMpLnJlZHVjZShmdW5jdGlvbiAoZHluYW1pYywgcHJvcGVydHkpIHtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgaWYgKCgwLCBfaXNQbGFpbk9iamVjdDIuZGVmYXVsdCkodmFsdWUpKSB7XG4gICAgICAvLyBvbmx5IGNvbnNpZGVyIHBzZXVkbyBjbGFzc2VzIGFuZCBtZWRpYSBxdWVyaWVzXG4gICAgICAvLyB0aGF0IGNvbnRhaW4gaW5uZXIgZHluYW1pYyBzdHlsZXNcbiAgICAgIGlmICgoMCwgX2lzUHNldWRvMi5kZWZhdWx0KShwcm9wZXJ0eSkgfHwgKDAsIF9pc01lZGlhUXVlcnkyLmRlZmF1bHQpKHByb3BlcnR5KSkge1xuICAgICAgICB2YXIgdmFsdWVDb3VudCA9IE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGg7XG5cbiAgICAgICAgdmFyIGlubmVyRHluYW1pYyA9IGV4dHJhY3REeW5hbWljU3R5bGVzKHZhbHVlKTtcblxuICAgICAgICAvLyBpZiB0aGUgaW5uZXIgc3R5bGVzIGNvbnRhaW4gZHluYW1pYyBzdHlsZXNcbiAgICAgICAgLy8gZXh0cmFjdCB0aGVtIGludG8gdGhlIG91dHB1dCBvYmplY3RcbiAgICAgICAgaWYgKCEoMCwgX2lzRW1wdHkyLmRlZmF1bHQpKGlubmVyRHluYW1pYykpIHtcbiAgICAgICAgICBkeW5hbWljW3Byb3BlcnR5XSA9IGlubmVyRHluYW1pYztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgcHJvcGVydHkgaWYgYWxsIGlubmVyIHN0eWxlc1xuICAgICAgICAvLyBhcmUgYWN0dWFsbHkgZHluYW1pYyBzdHlsZXNcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGlubmVyRHluYW1pYykubGVuZ3RoID09PSB2YWx1ZUNvdW50KSB7XG4gICAgICAgICAgZGVsZXRlIHN0eWxlc1twcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGR5bmFtaWNbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNbcHJvcGVydHldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZ1bmN0aW9uIGFyZSBjb25zaWRlcmVkIHN0YXRlZnVsIHN0eWxlcyBhbmQgdGhlcmVmb3JlXG4gICAgLy8gdHJlYXRlZCBhcyBkeW5hbWljIHN0eWxlc1xuICAgIGlmICgoMCwgX2lzRnVuY3Rpb24yLmRlZmF1bHQpKHZhbHVlKSB8fCAoMCwgX2lzQm9vbGVhbjIuZGVmYXVsdCkodmFsdWUpIHx8ICgwLCBfaXNBcnJheTIuZGVmYXVsdCkodmFsdWUpICYmICgwLCBfaXNEeW5hbWljQXJyYXkyLmRlZmF1bHQpKHZhbHVlKSkge1xuICAgICAgZHluYW1pY1twcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBzdHlsZXNbcHJvcGVydHldO1xuICAgIH1cblxuICAgIHJldHVybiBkeW5hbWljOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0sIHt9KTtcbn1cblxuLyoqXG4gKiBSZW5kZXJzIHNwZWNpYWwgc3R5bGVzIGFzIHBzZXVkbyBjbGFzc2VzIGFuZCBtZWRpYSBxdWVyaWVzXG4gKiBhbmQgYWRkcyB0aGVtIHRvIHRoZSBDU1MgU3R5bGVDb250YWluZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIGJhc2Ugc2VsZWN0b3IgdXNlZCBhcyBjbGFzc05hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBzdGF0aWMgc3R5bGVzIGNvbnRhaW5pbmcgc3BlY2lhbCBleHRlbnNpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gcHNldWRvIC0gcHJpb3Igb3V0ZXIgcHNldWRvIGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWEgLSBwcmlvciBvdXRlciBtZWRpYSBxdWVyeVxuICovXG5mdW5jdGlvbiByZW5kZXJTcGVjaWFsU3R5bGVzKHNlbGVjdG9yLCBzdHlsZXMpIHtcbiAgdmFyIHBzZXVkbyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/ICcnIDogYXJndW1lbnRzWzJdO1xuICB2YXIgbWVkaWEgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDMgfHwgYXJndW1lbnRzWzNdID09PSB1bmRlZmluZWQgPyAnJyA6IGFyZ3VtZW50c1szXTtcblxuICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGVzKS5zb3J0KF9zb3J0UHNldWRvQ2xhc3NlczIuZGVmYXVsdCkucmVkdWNlKGZ1bmN0aW9uIChleHRlbnNpb24sIHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgaWYgKCgwLCBfaXNQbGFpbk9iamVjdDIuZGVmYXVsdCkodmFsdWUpKSB7XG4gICAgICBpZiAoKDAsIF9pc1BzZXVkbzIuZGVmYXVsdCkocHJvcGVydHkpKSB7XG4gICAgICAgIHZhciBpbm5lclN0eWxlcyA9IHJlbmRlclNwZWNpYWxTdHlsZXMoc2VsZWN0b3IsIHZhbHVlLCBwc2V1ZG8gKyBwcm9wZXJ0eSwgbWVkaWEpO1xuICAgICAgICAvLyBBZGRzIGEgcHNldWRvIGNsYXNzIHRvIGFuIGV4aXN0aW5nIHNlbGVjdG9yXG4gICAgICAgIF9TdHlsZUNvbnRhaW5lcjIuZGVmYXVsdC5hZGQoJy4nICsgc2VsZWN0b3IgKyBwc2V1ZG8gKyBwcm9wZXJ0eSwgaW5uZXJTdHlsZXMsIG1lZGlhKTtcbiAgICAgIH1cbiAgICAgIGlmICgoMCwgX2lzTWVkaWFRdWVyeTIuZGVmYXVsdCkocHJvcGVydHkpKSB7XG4gICAgICAgIC8vIENvbmNhdGVuYXRlIG11bHRpcGxlIG1lZGlhIHF1ZXJpZXMgaWYgYSBtZWRpYSBxdWVyeSBhbHJlYWR5IGV4aXN0c1xuICAgICAgICB2YXIgbmV3TWVkaWEgPSAobWVkaWEgIT09ICcnID8gbWVkaWEgKyAnYW5kJyA6ICcnKSArIHByb3BlcnR5LnJlcGxhY2UoJ0BtZWRpYScsICcnKS50cmltKCk7XG4gICAgICAgIHZhciBfaW5uZXJTdHlsZXMgPSByZW5kZXJTcGVjaWFsU3R5bGVzKHNlbGVjdG9yLCB2YWx1ZSwgcHNldWRvLCBuZXdNZWRpYSk7XG4gICAgICAgIC8vIEFkZHMgdGhlIHNlbGVjdG9yIHRvIHRoZSBtZWRpYSBncm91cFxuICAgICAgICBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQuYWRkKCcuJyArIHNlbGVjdG9yICsgcHNldWRvLCBfaW5uZXJTdHlsZXMsIG5ld01lZGlhKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZXh0ZW5zaW9uW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gZXh0ZW5zaW9uOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0sIHt9KTtcbn1cblxuLyoqXG4gKiBSZW5kZXJzIHN0YXRpYyBzdHlsZXMgdG8gdGhlIENTUyBTdHlsZUNvbnRhaW5lclxuICogYW5kIGRpcmVjdGx5IHNjb3BlcyB0aGVtIHRvIHRoZSBDb21wb25lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBzdGF0aWMgc3R5bGVzIHRvIGJlIHJlbmRlcmVkXG4gKiBAcGFyYW0ge3N0cmluZ30gc2NvcGUgLSBzY29wZSBzZWxlY3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gYmFzZSBzZWxlY3RvciB1c2VkIGFzIGNsYXNzTmFtZVxuICovXG5mdW5jdGlvbiByZW5kZXJTdGF0aWNTdHlsZXMoc3R5bGVzLCBzY29wZSkge1xuICAvLyBFeHRyYWN0cyBkeW5hbWljIHBhcnRzIHJlbWFpbmluZyBvbmx5IHN0YXRpYyBzdHlsZXNcbiAgdmFyIGR5bmFtaWNTdHlsZXMgPSBleHRyYWN0RHluYW1pY1N0eWxlcyhzdHlsZXMpO1xuXG4gIC8vIERldGVybWluZXMgdGhlIGJhc2Ugc3R5bGVzIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIGNsYXNzTmFtZVxuICB2YXIgYmFzZVN0eWxlcyA9IE9iamVjdC5rZXlzKHN0eWxlcykucmVkdWNlKGZ1bmN0aW9uIChiYXNlLCBwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgaWYgKCEoMCwgX2lzUGxhaW5PYmplY3QyLmRlZmF1bHQpKHZhbHVlKSkge1xuICAgICAgYmFzZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBzdHlsZXNbcHJvcGVydHldO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9LCB7fSk7XG5cbiAgLy8gR2VuZXJhdGUgYSB1bmlxdWUgY2xhc3NOYW1lXG4gIHZhciBjbGFzc05hbWUgPSBzY29wZSA/IHNjb3BlICsgX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LmdlbmVyYXRlQ2xhc3NOYW1lKGJhc2VTdHlsZXMpIDogX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LnJlcXVlc3RDbGFzc05hbWUoKTtcblxuICAvLyBBZGQgdGhlIGNsYXNzTmFtZSB0byB0aGUgZ2xvYmFsIHN0eWxlIGNvbnRhaW5lciBpZiBpdCBoYXMgc3R5bGVzXG4gIGlmICghKDAsIF9pc0VtcHR5Mi5kZWZhdWx0KShiYXNlU3R5bGVzKSkge1xuICAgIF9TdHlsZUNvbnRhaW5lcjIuZGVmYXVsdC5hZGQoJy4nICsgY2xhc3NOYW1lLCBiYXNlU3R5bGVzKTtcbiAgfVxuXG4gIC8vIEFsc28gYWRkIHRoZSBkeW5hbWljIHN0eWxlcyBpZiB0aGV5IGV4aXN0XG4gIGlmICghKDAsIF9pc0VtcHR5Mi5kZWZhdWx0KShkeW5hbWljU3R5bGVzKSB8fCAoMCwgX2lzRnVuY3Rpb24yLmRlZmF1bHQpKGR5bmFtaWNTdHlsZXMpKSB7XG4gICAgX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0Ll9hZGREeW5hbWljKGNsYXNzTmFtZSwgZHluYW1pY1N0eWxlcyk7XG4gIH1cblxuICAvLyBSZW5kZXJzIHBzZXVkbyBjbGFzc2VzIGFuZCBtZWRpYSBxdWVyaWVzIHRvIHRoZSBzdHlsZSBjb250YWluZXJcbiAgcmVuZGVyU3BlY2lhbFN0eWxlcyhjbGFzc05hbWUsIHN0eWxlcyk7XG5cbiAgcmV0dXJuIGNsYXNzTmFtZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNFbXB0eSA9IHJlcXVpcmUoJ2xvZGFzaC9pc0VtcHR5Jyk7XG5cbnZhciBfaXNFbXB0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0VtcHR5KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHJlc29sdmVTdHlsZXM7XG5cbnZhciBfYXNzaWduU3R5bGVzID0gcmVxdWlyZSgnYXNzaWduLXN0eWxlcycpO1xuXG52YXIgX2Fzc2lnblN0eWxlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ25TdHlsZXMpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdExvb2tDb3JlID0gcmVxdWlyZSgncmVhY3QtbG9vay1jb3JlJyk7XG5cbnZhciBfcmVuZGVyZXIgPSByZXF1aXJlKCcuL3JlbmRlcmVyJyk7XG5cbnZhciBfcmVuZGVyZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVuZGVyZXIpO1xuXG52YXIgX2V4dHJhY3RDU1MgPSByZXF1aXJlKCcuLi9taXhpbnMvZXh0cmFjdENTUycpO1xuXG52YXIgX2V4dHJhY3RDU1MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0cmFjdENTUyk7XG5cbnZhciBfU3R5bGVDb250YWluZXIgPSByZXF1aXJlKCcuLi9hcGkvU3R5bGVDb250YWluZXInKTtcblxudmFyIF9TdHlsZUNvbnRhaW5lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdHlsZUNvbnRhaW5lcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciByZXNvbHZlUGx1Z2lucyA9IF9yZWFjdExvb2tDb3JlLnJlc29sdmVyLnJlc29sdmVQbHVnaW5zO1xudmFyIHJlc29sdmVDaGlsZHJlbiA9IF9yZWFjdExvb2tDb3JlLnJlc29sdmVyLnJlc29sdmVDaGlsZHJlbjtcbnZhciByZXNvbHZlUHJvcHMgPSBfcmVhY3RMb29rQ29yZS5yZXNvbHZlci5yZXNvbHZlUHJvcHM7XG52YXIgaXNMb29rRW5oYW5jZWQgPSBfcmVhY3RMb29rQ29yZS5yZXNvbHZlci5pc0xvb2tFbmhhbmNlZDtcblxuXG4vKipcclxuICogUmVzb2x2ZXMgcHJvdmlkZWQgc3R5bGVzIGludG8gc3R5bGUgb2JqZWN0c1xyXG4gKiBQcm9jZXNzZXMgdGhvc2UgdXNpbmcgYSBwcmVkZWZpbmVkIHBsdWdpbiBsaW5ldXBcclxuICogTWFwcyB0aGUgZmluYWwgc3R5bGUgb2JqZWN0cyB0byB0aGUgZWxlbWVudFxyXG4gKiBAcGFyYW0ge09iamVjdH0gQ29tcG9uZW50IC0gd3JhcHBpbmcgUmVhY3QgQ29tcG9uZW50IHByb3ZpZGluZyBzdHlsZXMgYW5kIGVsZW1lbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0gcHJldmlvdXNseSByZW5kZXJlZCBSZWFjdCBlbGVtZW50XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBjb25maWd1cmF0aW9uIGNvbnRhaW5pbmcgcGx1Z2lucyBhbmQgcGx1Z2luLXNwZWNpZmljIGNvbmZpZ3NcclxuICovXG5mdW5jdGlvbiByZXNvbHZlU3R5bGVzKENvbXBvbmVudCwgZWxlbWVudCwgY29uZmlnKSB7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQucHJvcHMpIHtcbiAgICB2YXIgX3JldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVhcmx5IHJldHVybiBpZiBlbGVtZW50IGl0c2VsZiBpcyBhIExvb2sgY29tcG9uZW50XG4gICAgICAvLyBpdCB3aWxsIGJlIHJlc29sdmVkIGFueXdheXNcbiAgICAgIGlmIChpc0xvb2tFbmhhbmNlZChlbGVtZW50KSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHY6IGVsZW1lbnRcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgdmFyIG5ld1Byb3BzID0gX2V4dGVuZHMoe30sIGVsZW1lbnQucHJvcHMpO1xuICAgICAgcmVzb2x2ZVByb3BzKENvbXBvbmVudCwgbmV3UHJvcHMsIGNvbmZpZyk7XG4gICAgICByZXNvbHZlQ2hpbGRyZW4oQ29tcG9uZW50LCBuZXdQcm9wcywgY29uZmlnKTtcblxuICAgICAgLy8gVGhlIHJlYWN0LWRvbSBwYWNrYWdlIHJlY2lldmVzIGFsbCBzdHlsZXMgYXMgY2xhc3NOYW1lc1xuICAgICAgLy8gVGhleSBjb21lIHByZXJlbmRlcmVkIGJ5IFN0eWxlU2hlZXQuY3JlYXRlIGFuZCByZWZlcmVuY2UgYWxsIGR5bmFtaWMgU3R5bGVTaGVldFxuICAgICAgLy8gVGhvc2Ugd2lsbCBiZSBpdGVyYXRlZCBhbmQgYWRkaXRpb25hbGx5IGFkZGVkIGlmIGNvbmRpdGlvbnMgYXJlIGZ1bGZpbGxlZFxuICAgICAgaWYgKG5ld1Byb3BzLmNsYXNzTmFtZSkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgLy8gc3RhdGljIGFyZ3VtZW50cyB0aGF0IGdldCBwYXNzZWQgdG8gZXZlcnkgcGx1Z2luXG4gICAgICAgICAgdmFyIHN0YXRpY1BsdWdpbkFyZ3VtZW50cyA9IHtcbiAgICAgICAgICAgIHJlc29sdmU6IHJlc29sdmVQbHVnaW5zLFxuICAgICAgICAgICAgU3R5bGVDb250YWluZXI6IF9TdHlsZUNvbnRhaW5lcjIuZGVmYXVsdCxcbiAgICAgICAgICAgIENvbXBvbmVudDogQ29tcG9uZW50LFxuICAgICAgICAgICAgbmV3UHJvcHM6IG5ld1Byb3BzLFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIG5ld1Byb3BzLmNsYXNzTmFtZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdmFyIGR5bmFtaWNTdHlsZXMgPSBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQuZHluYW1pY3MuZ2V0KGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAvLyBSZXNvbHZlIHBsdWdpbnMgaWYgcGx1Z2lucyBhcmUgcHJvdmlkZWQgdmlhIGNvbmZpZ1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5wbHVnaW5zKSB7XG4gICAgICAgICAgICAgIC8vIENvbnN0cnVjdHMgdGhlIHBsdWdpbkludGVyZmFjZVxuICAgICAgICAgICAgICB2YXIgcGx1Z2luSW50ZXJmYWNlID0gX2V4dGVuZHMoe30sIHN0YXRpY1BsdWdpbkFyZ3VtZW50cywge1xuICAgICAgICAgICAgICAgIHN0eWxlczogKDAsIF9hc3NpZ25TdHlsZXMyLmRlZmF1bHQpKHt9LCBkeW5hbWljU3R5bGVzIHx8IHt9KSxcbiAgICAgICAgICAgICAgICBkeW5hbWljU3R5bGVzTm90TnVsbDogZHluYW1pY1N0eWxlcyAhPSBudWxsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAvLyBDYWxsaW5nIHJlc29sdmVQbHVnaW5zIHdpdGggZm9yY2VNb2RlUG9zc2libGUgPSB0cnVlXG4gICAgICAgICAgICAgIHZhciBuZXdTdHlsZXMgPSByZXNvbHZlUGx1Z2lucyhwbHVnaW5JbnRlcmZhY2UsIHRydWUpO1xuXG4gICAgICAgICAgICAgIC8vIE9ubHkgYXBwbHkgc3R5bGVzIGlmIHRoZXJlIGFyZSBzb21lXG4gICAgICAgICAgICAgIGlmICghKDAsIF9pc0VtcHR5Mi5kZWZhdWx0KShuZXdTdHlsZXMpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZWZpeGVkTmV3U3R5bGVzID0gY29uZmlnLnByZWZpeGVyLnByZWZpeChuZXdTdHlsZXMpO1xuICAgICAgICAgICAgICAgIHZhciBkeW5hbWljQ2xhc3NOYW1lID0gKDAsIF9yZW5kZXJlcjIuZGVmYXVsdCkocHJlZml4ZWROZXdTdHlsZXMsIGNsYXNzTmFtZSArICctZC0nKTtcbiAgICAgICAgICAgICAgICAoMCwgX2V4dHJhY3RDU1MyLmRlZmF1bHQpKHsgdmFsdWU6IGR5bmFtaWNDbGFzc05hbWUsIG5ld1Byb3BzOiBuZXdQcm9wcyB9KTtcbiAgICAgICAgICAgICAgICBuZXdQcm9wcy5fbG9va1Nob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgLy8gT25seSBhY3R1YWxseSBjbG9uZSBpZiBpdCBpcyBuZWVkZWRcbiAgICAgIC8vIElmIHRoZXJlIGFyZSBzdHlsZXMsIGNoaWxkcmVuIGdvdCByZXNvbHZlZCBvciBwcm9wcyBnb3QgcmVzb2x2ZWRcbiAgICAgIGlmIChuZXdQcm9wcy5jaGlsZHJlbiAhPT0gZWxlbWVudC5wcm9wcy5jaGlsZHJlbiB8fCBuZXdQcm9wcy5fbG9va1Nob3VsZFVwZGF0ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHY6ICgwLCBfcmVhY3QuY2xvbmVFbGVtZW50KShlbGVtZW50LCBuZXdQcm9wcylcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KCk7XG5cbiAgICBpZiAoKHR5cGVvZiBfcmV0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihfcmV0KSkgPT09IFwib2JqZWN0XCIpIHJldHVybiBfcmV0LnY7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUHJlc2V0cyA9IGV4cG9ydHMuTWl4aW5zID0gZXhwb3J0cy5QbHVnaW5zID0gZXhwb3J0cy5TdGF0aWNQcmVmaXhlciA9IGV4cG9ydHMuRHluYW1pY1ByZWZpeGVyID0gZXhwb3J0cy5fcmVzb2x2ZXIgPSBleHBvcnRzLl9TdHlsZUNvbnRhaW5lciA9IGV4cG9ydHMuUHJlZml4ZXIgPSBleHBvcnRzLkxvb2tSb290ID0gZXhwb3J0cy5TdHlsZVNoZWV0ID0gdW5kZWZpbmVkO1xuXG52YXIgX3JlYWN0TG9va0NvcmUgPSByZXF1aXJlKCdyZWFjdC1sb29rLWNvcmUnKTtcblxudmFyIF9mYWxsYmFja1ZhbHVlID0gcmVxdWlyZSgnLi9wbHVnaW5zL2ZhbGxiYWNrVmFsdWUnKTtcblxudmFyIF9mYWxsYmFja1ZhbHVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZhbGxiYWNrVmFsdWUpO1xuXG52YXIgX2xpbnRlciA9IHJlcXVpcmUoJy4vcGx1Z2lucy9saW50ZXInKTtcblxudmFyIF9saW50ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGludGVyKTtcblxudmFyIF9mcmllbmRseUNsYXNzTmFtZSA9IHJlcXVpcmUoJy4vcGx1Z2lucy9mcmllbmRseUNsYXNzTmFtZScpO1xuXG52YXIgX2ZyaWVuZGx5Q2xhc3NOYW1lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZyaWVuZGx5Q2xhc3NOYW1lKTtcblxudmFyIF9zdWJzdHIgPSByZXF1aXJlKCcuL21peGlucy9zdWJzdHInKTtcblxudmFyIF9zdWJzdHIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3Vic3RyKTtcblxudmFyIF9leHRyYWN0Q1NTID0gcmVxdWlyZSgnLi9taXhpbnMvZXh0cmFjdENTUycpO1xuXG52YXIgX2V4dHJhY3RDU1MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0cmFjdENTUyk7XG5cbnZhciBfcGxhdGZvcm1RdWVyeSA9IHJlcXVpcmUoJy4vbWl4aW5zL3BsYXRmb3JtUXVlcnknKTtcblxudmFyIF9wbGF0Zm9ybVF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsYXRmb3JtUXVlcnkpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgnLi9wcmVzZXRzL3JlYWN0LWRvbScpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxudmFyIF9EeW5hbWljUHJlZml4ZXIgPSByZXF1aXJlKCcuL3ByZWZpeGVyL0R5bmFtaWNQcmVmaXhlcicpO1xuXG52YXIgX0R5bmFtaWNQcmVmaXhlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EeW5hbWljUHJlZml4ZXIpO1xuXG52YXIgX1N0YXRpY1ByZWZpeGVyID0gcmVxdWlyZSgnLi9wcmVmaXhlci9TdGF0aWNQcmVmaXhlcicpO1xuXG52YXIgX1N0YXRpY1ByZWZpeGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0YXRpY1ByZWZpeGVyKTtcblxudmFyIF9QcmVmaXhlciA9IHJlcXVpcmUoJy4vYXBpL1ByZWZpeGVyJyk7XG5cbnZhciBfUHJlZml4ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJlZml4ZXIpO1xuXG52YXIgX1N0eWxlU2hlZXQgPSByZXF1aXJlKCcuL2FwaS9TdHlsZVNoZWV0Jyk7XG5cbnZhciBfU3R5bGVTaGVldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdHlsZVNoZWV0KTtcblxudmFyIF9Mb29rUm9vdCA9IHJlcXVpcmUoJy4vYXBpL0xvb2tSb290Jyk7XG5cbnZhciBfTG9va1Jvb3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTG9va1Jvb3QpO1xuXG52YXIgX1N0eWxlQ29udGFpbmVyMiA9IHJlcXVpcmUoJy4vYXBpL1N0eWxlQ29udGFpbmVyJyk7XG5cbnZhciBfU3R5bGVDb250YWluZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3R5bGVDb250YWluZXIyKTtcblxudmFyIF9yZXNvbHZlcjIgPSByZXF1aXJlKCcuL2NvcmUvcmVzb2x2ZXInKTtcblxudmFyIF9yZXNvbHZlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZXNvbHZlcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbWl4aW4gPSBfcmVhY3RMb29rQ29yZS5QbHVnaW5zLm1peGluO1xudmFyIHN0YXRlZnVsVmFsdWUgPSBfcmVhY3RMb29rQ29yZS5QbHVnaW5zLnN0YXRlZnVsVmFsdWU7XG52YXIgc3R5bGVMb2dnZXIgPSBfcmVhY3RMb29rQ29yZS5QbHVnaW5zLnN0eWxlTG9nZ2VyO1xudmFyIHN0YXRlZnVsU2VsZWN0b3IgPSBfcmVhY3RMb29rQ29yZS5QbHVnaW5zLnN0YXRlZnVsU2VsZWN0b3I7XG52YXIgY29uZGl0aW9uID0gX3JlYWN0TG9va0NvcmUuTWl4aW5zLmNvbmRpdGlvbjtcbnZhciBjb250YWlucyA9IF9yZWFjdExvb2tDb3JlLk1peGlucy5jb250YWlucztcbnZhciBleHRlbmQgPSBfcmVhY3RMb29rQ29yZS5NaXhpbnMuZXh0ZW5kO1xudmFyIGVxdWFsID0gY29uZGl0aW9uLmVxdWFsO1xudmFyIHVuRXF1YWwgPSBjb25kaXRpb24udW5FcXVhbDtcbnZhciBncmVhdGVyID0gY29uZGl0aW9uLmdyZWF0ZXI7XG52YXIgbGVzcyA9IGNvbmRpdGlvbi5sZXNzO1xudmFyIGdyZWF0ZXJUaGFuID0gY29uZGl0aW9uLmdyZWF0ZXJUaGFuO1xudmFyIGxlc3NUaGFuID0gY29uZGl0aW9uLmxlc3NUaGFuO1xuXG4vLyBQbHVnaW5zXG5cblxuLy8gRGV2IHRvb2xzXG5cblxuLy8gTWl4aW5zXG5cblxuLy8gUHJlc2V0c1xuXG5cbi8vIFByZWZpeGVyXG5cblxuLy8gQVBJXG5cblxuLy8gUHJpdmF0ZSBBUElcblxuLy8gUmVzb2x2aW5nIGFubm90YXRpb25zXG4vLyBJZiBub3QgcGFzc2luZyBhcmd1bWVudHMgaXQganVzdCB3cmFwcyB0aGUgQ29tcG9uZW50XG4vLyBPdGhlcndpc2UgaXQgcmV0dXJucyBhIGRlY29yYXRvclxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChhcmdzWzBdIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gX3JlYWN0TG9va0NvcmUuZW5oYW5jZXIuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQpIHtcbiAgICByZXR1cm4gX3JlYWN0TG9va0NvcmUuZW5oYW5jZXIuYXBwbHkodW5kZWZpbmVkLCBbdGFyZ2V0XS5jb25jYXQoYXJncykpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH07XG59O1xuXG52YXIgUGx1Z2lucyA9IHtcbiAgbWl4aW46IG1peGluLFxuICBmYWxsYmFja1ZhbHVlOiBfZmFsbGJhY2tWYWx1ZTIuZGVmYXVsdCxcbiAgc3RhdGVmdWxWYWx1ZTogc3RhdGVmdWxWYWx1ZSxcbiAgc3RhdGVmdWxTZWxlY3Rvcjogc3RhdGVmdWxTZWxlY3RvcixcbiAgc3R5bGVMb2dnZXI6IHN0eWxlTG9nZ2VyLFxuICBsaW50ZXI6IF9saW50ZXIyLmRlZmF1bHQsXG4gIGZyaWVuZGx5Q2xhc3NOYW1lOiBfZnJpZW5kbHlDbGFzc05hbWUyLmRlZmF1bHRcbn07XG5cbnZhciBNaXhpbnMgPSB7XG4gIC8vIENvbmRpdGlvbnNcbiAgZ3JlYXRlclRoYW46IGdyZWF0ZXJUaGFuLFxuICBsZXNzVGhhbjogbGVzc1RoYW4sXG4gIHVuRXF1YWw6IHVuRXF1YWwsXG4gIGdyZWF0ZXI6IGdyZWF0ZXIsXG4gIGxlc3M6IGxlc3MsXG4gIGVxdWFsOiBlcXVhbCxcblxuICAvLyBPdGhlclxuICBleHRlbmQ6IGV4dGVuZCxcbiAgZXh0cmFjdENTUzogX2V4dHJhY3RDU1MyLmRlZmF1bHQsXG4gIHBsYXRmb3JtUXVlcnk6IF9wbGF0Zm9ybVF1ZXJ5Mi5kZWZhdWx0LFxuICBjb250YWluczogY29udGFpbnMsXG4gIHN1YnN0cjogX3N1YnN0cjIuZGVmYXVsdFxufTtcblxudmFyIFByZXNldHMgPSB7XG4gICdyZWFjdC1kb20nOiBfcmVhY3REb20yLmRlZmF1bHRcbn07XG5cbmV4cG9ydHMuU3R5bGVTaGVldCA9IF9TdHlsZVNoZWV0Mi5kZWZhdWx0O1xuZXhwb3J0cy5Mb29rUm9vdCA9IF9Mb29rUm9vdDIuZGVmYXVsdDtcbmV4cG9ydHMuUHJlZml4ZXIgPSBfUHJlZml4ZXIyLmRlZmF1bHQ7XG5leHBvcnRzLlxuXG4vLyBwcml2YXRlIGV4cG9ydCBmb3IgdGVzdGluZyBvbmx5XG5fU3R5bGVDb250YWluZXIgPSBfU3R5bGVDb250YWluZXIzLmRlZmF1bHQ7XG5leHBvcnRzLl9yZXNvbHZlciA9IF9yZXNvbHZlcjMuZGVmYXVsdDtcbmV4cG9ydHMuRHluYW1pY1ByZWZpeGVyID0gX0R5bmFtaWNQcmVmaXhlcjIuZGVmYXVsdDtcbmV4cG9ydHMuU3RhdGljUHJlZml4ZXIgPSBfU3RhdGljUHJlZml4ZXIyLmRlZmF1bHQ7XG5leHBvcnRzLlBsdWdpbnMgPSBQbHVnaW5zO1xuZXhwb3J0cy5NaXhpbnMgPSBNaXhpbnM7XG5leHBvcnRzLlByZXNldHMgPSBQcmVzZXRzOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8vIExldHMgeW91IGV4dHJhY3QgY3NzIHRvIGNsYXNzTmFtZXMgdXNpbmcgdGhlIGNzcyBrZXlcbi8vIFRoaXMgaXMgaGVscGZ1bCBpZiB5b3UgaGF2ZSBzb21lIGxlZ2FjeSBjb2RlIHVzaW5nIENTUyBjbGFzc2VzXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBjbGFzc05hbWUgPSBfcmVmLnZhbHVlO1xuICB2YXIgbmV3UHJvcHMgPSBfcmVmLm5ld1Byb3BzO1xuXG4gIGlmIChuZXdQcm9wcy5jbGFzc05hbWUpIHtcbiAgICBuZXdQcm9wcy5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9IGVsc2Uge1xuICAgIG5ld1Byb3BzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pbmxpbmVTdHlsZVByZWZpeGVyID0gcmVxdWlyZSgnaW5saW5lLXN0eWxlLXByZWZpeGVyJyk7XG5cbnZhciBfaW5saW5lU3R5bGVQcmVmaXhlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmxpbmVTdHlsZVByZWZpeGVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gQWxsb3dzIHRoZSB1c2Ugb2YgcGxhdGZvcm0gcXVlcmllcyBzdXBwb3J0ZWQgYnkgYnJvd3NlciBpbmZvcm1hdGlvblxuLy8gcHJvdmlkZWQgYnkgdGhlIGlubGluZS1zdHlsZS1wcmVmaXhlclxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgcHJvcGVydHkgPSBfcmVmLnByb3BlcnR5O1xuICB2YXIgdmFsdWUgPSBfcmVmLnZhbHVlO1xuICB2YXIgbWl4aW5LZXkgPSBfcmVmLm1peGluS2V5O1xuICB2YXIgdXNlckFnZW50ID0gX3JlZi5jb25maWcudXNlckFnZW50O1xuXG4gIHZhciBicm93c2VySW5mbyA9IG5ldyBfaW5saW5lU3R5bGVQcmVmaXhlcjIuZGVmYXVsdCh7IHVzZXJBZ2VudDogdXNlckFnZW50IH0pLl9icm93c2VySW5mbztcbiAgdmFyIHBsYXRmb3JtcyA9IHByb3BlcnR5LnJlcGxhY2UobWl4aW5LZXksICcnKS50cmltKCkuc3BsaXQoJyAnKTtcblxuICB2YXIgaXNQbGF0Zm9ybSA9IGZhbHNlO1xuXG4gIHBsYXRmb3Jtcy5mb3JFYWNoKGZ1bmN0aW9uIChwbGF0Zm9ybSkge1xuICAgIGlmIChicm93c2VySW5mb1twbGF0Zm9ybS50cmltKCldKSB7XG4gICAgICBpc1BsYXRmb3JtID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpc1BsYXRmb3JtID8gdmFsdWUgOiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc051bWJlciA9IHJlcXVpcmUoJ2xvZGFzaC9pc051bWJlcicpO1xuXG52YXIgX2lzTnVtYmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzTnVtYmVyKTtcblxudmFyIF9pc1N0cmluZyA9IHJlcXVpcmUoJ2xvZGFzaC9pc1N0cmluZycpO1xuXG52YXIgX2lzU3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzU3RyaW5nKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0TG9va0NvcmUgPSByZXF1aXJlKCdyZWFjdC1sb29rLWNvcmUnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX3RvQXJyYXkoYXJyKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGFycikgPyBhcnIgOiBBcnJheS5mcm9tKGFycik7IH1cblxudmFyIGdldFBzZXVkb0V4cHJlc3Npb24gPSBfcmVhY3RMb29rQ29yZS5VdGlscy5nZXRQc2V1ZG9FeHByZXNzaW9uO1xuXG4vLyBFdmFsdWF0ZXMgaWYgYSBlbGVtZW50IGNvbnRhaW5zIGEgZ2l2ZW4gc3RyaW5nXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBwcm9wZXJ0eSA9IF9yZWYucHJvcGVydHk7XG4gIHZhciB2YWx1ZSA9IF9yZWYudmFsdWU7XG4gIHZhciBuZXdQcm9wcyA9IF9yZWYubmV3UHJvcHM7XG5cbiAgdmFyIGNoaWxkcmVuID0gbmV3UHJvcHMuY2hpbGRyZW47XG5cbiAgaWYgKCgwLCBfaXNTdHJpbmcyLmRlZmF1bHQpKGNoaWxkcmVuKSB8fCAoMCwgX2lzTnVtYmVyMi5kZWZhdWx0KShjaGlsZHJlbikpIHtcbiAgICB2YXIgX3JldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBuZXdDaGlsZHJlbiA9IFtdO1xuXG4gICAgICB2YXIgbWF0Y2hlcyA9IGNoaWxkcmVuLm1hdGNoKG5ldyBSZWdFeHAoZ2V0UHNldWRvRXhwcmVzc2lvbihwcm9wZXJ0eSksICdnJykpO1xuICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdjogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgbWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICB2YXIgX2NoaWxkcmVuJHNwbGl0ID0gY2hpbGRyZW4uc3BsaXQobWF0Y2gpO1xuXG4gICAgICAgIHZhciBfY2hpbGRyZW4kc3BsaXQyID0gX3RvQXJyYXkoX2NoaWxkcmVuJHNwbGl0KTtcblxuICAgICAgICB2YXIgbGVmdCA9IF9jaGlsZHJlbiRzcGxpdDJbMF07XG5cbiAgICAgICAgdmFyIHJpZ2h0ID0gX2NoaWxkcmVuJHNwbGl0Mi5zbGljZSgxKTtcblxuICAgICAgICBpZiAobGVmdCAhPT0gJycpIHtcbiAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKGxlZnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaCgoMCwgX3JlYWN0LmNyZWF0ZUVsZW1lbnQpKCdzcGFuJywge1xuICAgICAgICAgIHN0eWxlOiB2YWx1ZVxuICAgICAgICB9LCBtYXRjaCkpO1xuXG4gICAgICAgIGNoaWxkcmVuID0gcmlnaHQuam9pbihtYXRjaCk7XG4gICAgICB9KTtcblxuICAgICAgbmV3Q2hpbGRyZW4ucHVzaChjaGlsZHJlbik7XG4gICAgICBuZXdQcm9wcy5jaGlsZHJlbiA9IG5ld0NoaWxkcmVuO1xuICAgIH0oKTtcblxuICAgIGlmICgodHlwZW9mIF9yZXQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKF9yZXQpKSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIF9yZXQudjtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoL2lzUGxhaW5PYmplY3QnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUGxhaW5PYmplY3QpO1xuXG52YXIgX2lzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2gvaXNBcnJheScpO1xuXG52YXIgX2lzQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBcnJheSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZhbGxiYWNrVmFsdWU7XG5cbnZhciBfYXNzaWduU3R5bGVzID0gcmVxdWlyZSgnYXNzaWduLXN0eWxlcycpO1xuXG52YXIgX2Fzc2lnblN0eWxlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ25TdHlsZXMpO1xuXG52YXIgX2NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX2NhbWVsVG9EYXNoQ2FzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jYW1lbFRvRGFzaENhc2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbi8qKlxyXG4gKiBSZXNvbHZlcyBhbHRlcm5hdGl2ZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYW4gQXJyYXlcclxuICovXG5mdW5jdGlvbiBmYWxsYmFja1ZhbHVlKF9yZWYpIHtcbiAgdmFyIHN0eWxlcyA9IF9yZWYuc3R5bGVzO1xuICB2YXIgcmVzb2x2ZSA9IF9yZWYucmVzb2x2ZTtcblxuICB2YXIgcGx1Z2luSW50ZXJmYWNlID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnc3R5bGVzJywgJ3Jlc29sdmUnXSk7XG5cbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgaWYgKCgwLCBfaXNBcnJheTIuZGVmYXVsdCkodmFsdWUpKSB7XG4gICAgICBzdHlsZXNbcHJvcGVydHldID0gdmFsdWUuam9pbignOycgKyAoMCwgX2NhbWVsVG9EYXNoQ2FzZTIuZGVmYXVsdCkocHJvcGVydHkpICsgJzonKTtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNQbGFpbk9iamVjdDIuZGVmYXVsdCkodmFsdWUpKSB7XG4gICAgICBzdHlsZXNbcHJvcGVydHldID0gcmVzb2x2ZShfZXh0ZW5kcyh7fSwgcGx1Z2luSW50ZXJmYWNlLCB7XG4gICAgICAgIHN0eWxlczogKDAsIF9hc3NpZ25TdHlsZXMyLmRlZmF1bHQpKHt9LCB2YWx1ZSksXG4gICAgICAgIHJlc29sdmU6IHJlc29sdmVcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzdHlsZXM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnJpZW5kbHlDbGFzc05hbWVzO1xuXG52YXIgX3JlYWN0TG9va0NvcmUgPSByZXF1aXJlKCdyZWFjdC1sb29rLWNvcmUnKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbnZhciBnZXRDaGlsZFR5cGUgPSBfcmVhY3RMb29rQ29yZS5VdGlscy5nZXRDaGlsZFR5cGU7XG5cblxudmFyIGNsYXNzTmFtZVRlbXBsYXRlID0gZnVuY3Rpb24gY2xhc3NOYW1lVGVtcGxhdGUoY2xhc3NOYW1lLCBDb21wb25lbnQsIGVsZW1lbnQpIHtcbiAgcmV0dXJuIENvbXBvbmVudC5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSArICctJyArIGdldENoaWxkVHlwZShlbGVtZW50KSArICctLScgKyBjbGFzc05hbWU7XG59O1xuXG52YXIgY2xhc3NNYXBwaW5nID0gbmV3IE1hcCgpO1xuXG5mdW5jdGlvbiBmcmllbmRseUNsYXNzTmFtZXMoX3JlZikge1xuICB2YXIgU3R5bGVDb250YWluZXIgPSBfcmVmLlN0eWxlQ29udGFpbmVyO1xuICB2YXIgQ29tcG9uZW50ID0gX3JlZi5Db21wb25lbnQ7XG4gIHZhciBlbGVtZW50ID0gX3JlZi5lbGVtZW50O1xuICB2YXIgbmV3UHJvcHMgPSBfcmVmLm5ld1Byb3BzO1xuICB2YXIgc3R5bGVzID0gX3JlZi5zdHlsZXM7XG4gIHZhciBjb25maWcgPSBfcmVmLmNvbmZpZztcblxuICAvLyBPbmx5IHRyYW5zZm9ybSBpZiBub3QgYWxyZWFkeSB0cmFuc2Zvcm1lZCBhbmQgYSBjbGFzc05hbWUgZXhpc3RzXG4gIGlmICghbmV3UHJvcHMuX2hhc0ZyaWVuZGx5Q2xhc3NOYW1lcyAmJiBuZXdQcm9wcy5jbGFzc05hbWUpIHtcbiAgICBuZXdQcm9wcy5jbGFzc05hbWUgPSBuZXdQcm9wcy5jbGFzc05hbWUuc3BsaXQoJyAnKS5yZWR1Y2UoZnVuY3Rpb24gKGNsYXNzTmFtZSwgY2xzKSB7XG4gICAgICBjbHMgPSBjbHMudHJpbSgpO1xuICAgICAgLy8gSWYgdGhlIGNsYXNzTmFtZSBoYXMgYWxyZWFkeSBiZWVuIHJlc29sdmVkXG4gICAgICAvLyBqdXN0IHVzZSB0aGUgZm9ybWVyIG5ldyBjbGFzc05hbWVcbiAgICAgIGlmIChjbGFzc01hcHBpbmcuaGFzKGNscykpIHtcbiAgICAgICAgY2xhc3NOYW1lICs9IGNsYXNzTmFtZSArIGNsYXNzTmFtZSAhPT0gJycgPyAnICcgOiAnJyArIGNsYXNzTWFwcGluZy5nZXQoY2xzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIG5ld0NsYXNzID0gdm9pZCAwO1xuICAgICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLmZyaWVuZGx5Q2xhc3NOYW1lVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIG5ld0NsYXNzID0gY29uZmlnLmZyaWVuZGx5Q2xhc3NOYW1lVGVtcGxhdGUoY2xzLCBDb21wb25lbnQsIGVsZW1lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdDbGFzcyA9IGNsYXNzTmFtZVRlbXBsYXRlKGNscywgQ29tcG9uZW50LCBlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGlzTG9va0NsYXNzID0gZmFsc2U7XG5cbiAgICAgICAgICAvLyBpbW11dGFibGUgc2VsZWN0b3JzIHRvIGl0ZXJhdGUgd2l0aG91dCBjaGFuZ2VzXG4gICAgICAgICAgdmFyIHNlbGVjdG9ycyA9IFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoU3R5bGVDb250YWluZXIuc2VsZWN0b3JzKSk7XG4gICAgICAgICAgdmFyIG1lZGlhUXVlcmllcyA9IFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoU3R5bGVDb250YWluZXIubWVkaWFRdWVyaWVzKSk7XG5cbiAgICAgICAgICAvLyBSZXBsYWNlIGJhc2ljIHNlbGVjdG9yIGNsYXNzTmFtZXNcbiAgICAgICAgICBzZWxlY3RvcnMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgICAgICAgIHZhciBfcmVmMyA9IF9zbGljZWRUb0FycmF5KF9yZWYyLCAyKTtcblxuICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gX3JlZjNbMF07XG4gICAgICAgICAgICB2YXIgc3R5bGVzID0gX3JlZjNbMV07XG5cbiAgICAgICAgICAgIC8vIG9ubHkgaWYgdGhlIHNlbGVjdG9ycyBzdGFydHMgd2l0aCB0aGUgY2xhc3NOYW1lXG4gICAgICAgICAgICBpZiAoc2VsZWN0b3IuaW5kZXhPZignLicgKyBjbHMpID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhciBwc2V1ZG8gPSBzZWxlY3Rvci5yZXBsYWNlKG5ldyBSZWdFeHAoJy4nICsgY2xzLCAnZycpLCAnJyk7XG4gICAgICAgICAgICAgIC8vIENhY2hlIHJlc29sdmVkIGNsYXNzTmFtZXMgZm9yIGxhdGVyIHVzZVxuICAgICAgICAgICAgICBjbGFzc01hcHBpbmcuc2V0KGNscywgbmV3Q2xhc3MpO1xuICAgICAgICAgICAgICAvLyBQdXNoIHRoZSBuZXcgY2xhc3NOYW1lIGFuZCByZW1vdmUgdGhlIG9sZCBvbmVcbiAgICAgICAgICAgICAgU3R5bGVDb250YWluZXIuYWRkKCcuJyArIG5ld0NsYXNzICsgcHNldWRvLCBzdHlsZXMpO1xuICAgICAgICAgICAgICBTdHlsZUNvbnRhaW5lci5zZWxlY3RvcnMuZGVsZXRlKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgaXNMb29rQ2xhc3MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gSXRlcmF0ZSBtZWRpYSBxdWVyaWVzIGFuZCByZXBsYWNlIHNlbGVjdG9yc1xuICAgICAgICAgIG1lZGlhUXVlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmNCkge1xuICAgICAgICAgICAgdmFyIF9yZWY1ID0gX3NsaWNlZFRvQXJyYXkoX3JlZjQsIDIpO1xuXG4gICAgICAgICAgICB2YXIgbWVkaWEgPSBfcmVmNVswXTtcbiAgICAgICAgICAgIHZhciBzZWxlY3RvcnMgPSBfcmVmNVsxXTtcblxuICAgICAgICAgICAgdmFyIG1lZGlhU2VsZWN0b3JzID0gW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShzZWxlY3RvcnMpKTtcbiAgICAgICAgICAgIG1lZGlhU2VsZWN0b3JzLmZvckVhY2goZnVuY3Rpb24gKF9yZWY2KSB7XG4gICAgICAgICAgICAgIHZhciBfcmVmNyA9IF9zbGljZWRUb0FycmF5KF9yZWY2LCAyKTtcblxuICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBfcmVmN1swXTtcbiAgICAgICAgICAgICAgdmFyIHN0eWxlcyA9IF9yZWY3WzFdO1xuXG4gICAgICAgICAgICAgIGlmIChzZWxlY3Rvci5pbmRleE9mKCcuJyArIGNscykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpc0xvb2tDbGFzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHBzZXVkbyA9IHNlbGVjdG9yLnJlcGxhY2UobmV3IFJlZ0V4cCgnLicgKyBjbHMsICdnJyksICcnKTtcbiAgICAgICAgICAgICAgICBjbGFzc01hcHBpbmcuc2V0KGNscywgbmV3Q2xhc3MpO1xuICAgICAgICAgICAgICAgIC8vIEFsc28gb3ZlcndyaXRlIG1lZGlhIHF1ZXJ5IHNlbGVjdG9yc1xuICAgICAgICAgICAgICAgIFN0eWxlQ29udGFpbmVyLmFkZCgnLicgKyBuZXdDbGFzcyArIHBzZXVkbywgc3R5bGVzLCBtZWRpYSk7XG4gICAgICAgICAgICAgICAgU3R5bGVDb250YWluZXIubWVkaWFRdWVyaWVzLmdldChtZWRpYSkuZGVsZXRlKCcuJyArIGNscyArIHBzZXVkbyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gQ29uY2F0cyB0aGUgbmV3IGNsYXNzTmFtZSBvciB1c2VzIHRoZSBvbGQgY2xhc3NOYW1lXG4gICAgICAgICAgLy8gaWYgaXQgaXMgbm90IHByb3ZpZGVkIGJ5IExvb2tcbiAgICAgICAgICBjbGFzc05hbWUgKz0gKGNsYXNzTmFtZSAhPT0gJycgPyAnICcgOiAnJykgKyAoaXNMb29rQ2xhc3MgPyBuZXdDbGFzcyA6IGNscyk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2xhc3NOYW1lOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSwgJycpO1xuICB9XG5cbiAgLy8gRm9yY2VzIExvb2sgdG8gY2xvbmUgdGhlIGVsZW1lbnRcbiAgbmV3UHJvcHMuX2xvb2tTaG91bGRVcGRhdGUgPSB0cnVlO1xuICAvLyBTZXRzIGEgZmxhZyB0byBiZSBhYmxlIHRvIHNraXAgcmVzb2x2aW5nIG5leHQgdGltZVxuICBuZXdQcm9wcy5faGFzRnJpZW5kbHlDbGFzc05hbWVzID0gdHJ1ZTtcblxuICByZXR1cm4gc3R5bGVzO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbGludGVyO1xuXG52YXIgX2lubGluZVN0eWxlTGludGVyID0gcmVxdWlyZSgnaW5saW5lLXN0eWxlLWxpbnRlcicpO1xuXG52YXIgX2lubGluZVN0eWxlTGludGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lubGluZVN0eWxlTGludGVyKTtcblxudmFyIF9yZWFjdExvb2tDb3JlID0gcmVxdWlyZSgncmVhY3QtbG9vay1jb3JlJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBnZXRDaGlsZFR5cGUgPSBfcmVhY3RMb29rQ29yZS5VdGlscy5nZXRDaGlsZFR5cGU7XG5mdW5jdGlvbiBsaW50ZXIoX3JlZikge1xuICB2YXIgc3R5bGVzID0gX3JlZi5zdHlsZXM7XG4gIHZhciBDb21wb25lbnQgPSBfcmVmLkNvbXBvbmVudDtcbiAgdmFyIGVsZW1lbnQgPSBfcmVmLmVsZW1lbnQ7XG4gIHZhciBsaW50ZXIgPSBfcmVmLmNvbmZpZy5saW50ZXI7XG5cbiAgdmFyIHdhcm5pbmdzID0gbmV3IF9pbmxpbmVTdHlsZUxpbnRlcjIuZGVmYXVsdChsaW50ZXIpLmxpbnQoc3R5bGVzKTtcblxuICB3YXJuaW5ncy5mb3JFYWNoKGZ1bmN0aW9uICh3YXJuaW5nKSB7XG4gICAgaWYgKCFsaW50ZXIubXV0ZSkge1xuICAgICAgaWYgKGxpbnRlciAmJiBsaW50ZXIub25seUxvZ0hpbnQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKENvbXBvbmVudC5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSArICc8JyArIGdldENoaWxkVHlwZShlbGVtZW50KSArICc+OiAnICsgd2FybmluZy5oaW50KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oQ29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lICsgJzwnICsgZ2V0Q2hpbGRUeXBlKGVsZW1lbnQpICsgJz46ICcgKyB3YXJuaW5nLmhpbnQsIHdhcm5pbmcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzdHlsZXM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfUHJlZml4ZXIyID0gcmVxdWlyZSgnLi4vYXBpL1ByZWZpeGVyJyk7XG5cbnZhciBfUHJlZml4ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJlZml4ZXIyKTtcblxudmFyIF9pbmxpbmVTdHlsZVByZWZpeGVyID0gcmVxdWlyZSgnaW5saW5lLXN0eWxlLXByZWZpeGVyJyk7XG5cbnZhciBfaW5saW5lU3R5bGVQcmVmaXhlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmxpbmVTdHlsZVByZWZpeGVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIER5bmFtaWMgUHJlZml4ZXIgd2hpY2ggdmFsaWRhdGUgdGhlIHVzZXJBZ2VudCB0byBwcmVmaXggc3R5bGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gdXNlckFnZW50IC0gb3B0aW9uYWwgdXNlckFnZW50IHRoYXQgZ2V0cyB1c2VkIHRvIGdhdGhlciBpbmZvcm1hdGlvbiBvbiBwcmVmaXhlc1xuICovXG5cbnZhciBEeW5hbWljUHJlZml4ZXIgPSBmdW5jdGlvbiAoX1ByZWZpeGVyKSB7XG4gIF9pbmhlcml0cyhEeW5hbWljUHJlZml4ZXIsIF9QcmVmaXhlcik7XG5cbiAgZnVuY3Rpb24gRHluYW1pY1ByZWZpeGVyKGNvbmZpZykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEeW5hbWljUHJlZml4ZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKER5bmFtaWNQcmVmaXhlcikuY2FsbCh0aGlzKSk7XG5cbiAgICBfdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgX3RoaXMuX3ByZWZpeGVyID0gbmV3IF9pbmxpbmVTdHlsZVByZWZpeGVyMi5kZWZhdWx0KGNvbmZpZyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKER5bmFtaWNQcmVmaXhlciwgW3tcbiAgICBrZXk6ICdwcmVmaXgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVmaXgoc3R5bGVzKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJlZml4ZXIucHJlZml4KHN0eWxlcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0S2V5ZnJhbWVzUHJlZml4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0S2V5ZnJhbWVzUHJlZml4KCkge1xuICAgICAgdmFyIGtleWZyYW1lc1ByZWZpeCA9IFt0aGlzLl9wcmVmaXhlci5jc3NQcmVmaXhdO1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmtlZXBVbnByZWZpeGVkID8ga2V5ZnJhbWVzUHJlZml4LmNvbmNhdCgnJykgOiBrZXlmcmFtZXNQcmVmaXg7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIER5bmFtaWNQcmVmaXhlcjtcbn0oX1ByZWZpeGVyMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRHluYW1pY1ByZWZpeGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX1ByZWZpeGVyMiA9IHJlcXVpcmUoJy4uL2FwaS9QcmVmaXhlcicpO1xuXG52YXIgX1ByZWZpeGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1ByZWZpeGVyMik7XG5cbnZhciBfaW5saW5lU3R5bGVQcmVmaXhBbGwgPSByZXF1aXJlKCdpbmxpbmUtc3R5bGUtcHJlZml4LWFsbCcpO1xuXG52YXIgX2lubGluZVN0eWxlUHJlZml4QWxsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lubGluZVN0eWxlUHJlZml4QWxsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIER5bmFtaWMgUHJlZml4ZXIgd2hpY2ggdmFsaWRhdGUgdGhlIHVzZXJBZ2VudCB0byBwcmVmaXggc3R5bGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gdXNlckFnZW50IC0gb3B0aW9uYWwgdXNlckFnZW50IHRoYXQgZ2V0cyB1c2VkIHRvIGdhdGhlciBpbmZvcm1hdGlvbiBvbiBwcmVmaXhlc1xuICovXG5cbnZhciBTdGF0aWNQcmVmaXhlciA9IGZ1bmN0aW9uIChfUHJlZml4ZXIpIHtcbiAgX2luaGVyaXRzKFN0YXRpY1ByZWZpeGVyLCBfUHJlZml4ZXIpO1xuXG4gIGZ1bmN0aW9uIFN0YXRpY1ByZWZpeGVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdGF0aWNQcmVmaXhlcik7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN0YXRpY1ByZWZpeGVyKS5jYWxsKHRoaXMpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTdGF0aWNQcmVmaXhlciwgW3tcbiAgICBrZXk6ICdwcmVmaXgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVmaXgoc3R5bGVzKSB7XG4gICAgICByZXR1cm4gKDAsIF9pbmxpbmVTdHlsZVByZWZpeEFsbDIuZGVmYXVsdCkoc3R5bGVzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRLZXlmcmFtZXNQcmVmaXgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRLZXlmcmFtZXNQcmVmaXgoKSB7XG4gICAgICByZXR1cm4gWyctd2Via2l0LScsICctbW96LScsICcnXTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3RhdGljUHJlZml4ZXI7XG59KF9QcmVmaXhlcjMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN0YXRpY1ByZWZpeGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0TG9va0NvcmUgPSByZXF1aXJlKCdyZWFjdC1sb29rLWNvcmUnKTtcblxudmFyIF9mYWxsYmFja1ZhbHVlID0gcmVxdWlyZSgnLi4vcGx1Z2lucy9mYWxsYmFja1ZhbHVlJyk7XG5cbnZhciBfZmFsbGJhY2tWYWx1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mYWxsYmFja1ZhbHVlKTtcblxudmFyIF9leHRyYWN0Q1NTID0gcmVxdWlyZSgnLi4vbWl4aW5zL2V4dHJhY3RDU1MnKTtcblxudmFyIF9leHRyYWN0Q1NTMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4dHJhY3RDU1MpO1xuXG52YXIgX3BsYXRmb3JtUXVlcnkgPSByZXF1aXJlKCcuLi9taXhpbnMvcGxhdGZvcm1RdWVyeScpO1xuXG52YXIgX3BsYXRmb3JtUXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGxhdGZvcm1RdWVyeSk7XG5cbnZhciBfc3Vic3RyID0gcmVxdWlyZSgnLi4vbWl4aW5zL3N1YnN0cicpO1xuXG52YXIgX3N1YnN0cjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdWJzdHIpO1xuXG52YXIgX1N0YXRpY1ByZWZpeGVyID0gcmVxdWlyZSgnLi4vcHJlZml4ZXIvU3RhdGljUHJlZml4ZXInKTtcblxudmFyIF9TdGF0aWNQcmVmaXhlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdGF0aWNQcmVmaXhlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBtaXhpbiA9IF9yZWFjdExvb2tDb3JlLlBsdWdpbnMubWl4aW47XG52YXIgc3RhdGVmdWxWYWx1ZSA9IF9yZWFjdExvb2tDb3JlLlBsdWdpbnMuc3RhdGVmdWxWYWx1ZTtcbnZhciBzdGF0ZWZ1bFNlbGVjdG9yID0gX3JlYWN0TG9va0NvcmUuUGx1Z2lucy5zdGF0ZWZ1bFNlbGVjdG9yO1xudmFyIGNvbmRpdGlvbiA9IF9yZWFjdExvb2tDb3JlLk1peGlucy5jb25kaXRpb247XG52YXIgY29udGFpbnMgPSBfcmVhY3RMb29rQ29yZS5NaXhpbnMuY29udGFpbnM7XG52YXIgZXh0ZW5kID0gX3JlYWN0TG9va0NvcmUuTWl4aW5zLmV4dGVuZDtcbnZhciBlcXVhbCA9IGNvbmRpdGlvbi5lcXVhbDtcbnZhciB1bkVxdWFsID0gY29uZGl0aW9uLnVuRXF1YWw7XG52YXIgZ3JlYXRlciA9IGNvbmRpdGlvbi5ncmVhdGVyO1xudmFyIGxlc3MgPSBjb25kaXRpb24ubGVzcztcbnZhciBncmVhdGVyVGhhbiA9IGNvbmRpdGlvbi5ncmVhdGVyVGhhbjtcbnZhciBsZXNzVGhhbiA9IGNvbmRpdGlvbi5sZXNzVGhhbjtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgcHJlZml4ZXI6IG5ldyBfU3RhdGljUHJlZml4ZXIyLmRlZmF1bHQoKSxcbiAgcGx1Z2luczogW3N0YXRlZnVsVmFsdWUsIHN0YXRlZnVsU2VsZWN0b3IsIG1peGluLCBfZmFsbGJhY2tWYWx1ZTIuZGVmYXVsdF0sXG4gIG1peGluczoge1xuICAgIC8vIENvbmRpdGlvbnNcbiAgICAvLyBOT1RFOiBDb25kaXRpb24gb3JkZXIgbWF0dGVyc1xuICAgICc+PSc6IGdyZWF0ZXJUaGFuLFxuICAgICc8PSc6IGxlc3NUaGFuLFxuICAgICchPSc6IHVuRXF1YWwsXG4gICAgJz4nOiBncmVhdGVyLFxuICAgICc8JzogbGVzcyxcbiAgICAnPSc6IGVxdWFsLFxuXG4gICAgLy8gT3RoZXJcbiAgICBleHRlbmQ6IGV4dGVuZCxcbiAgICBjb250YWluczogY29udGFpbnMsXG4gICAgc3Vic3RyOiBfc3Vic3RyMi5kZWZhdWx0LFxuXG4gICAgLy8gQ1NTIGV4dHJhY3Rpb25cbiAgICBjc3M6IF9leHRyYWN0Q1NTMi5kZWZhdWx0LFxuXG4gICAgLy8gUXVlcmllc1xuICAgICdAcGxhdGZvcm0nOiBfcGxhdGZvcm1RdWVyeTIuZGVmYXVsdFxuICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBDb252ZXJ0cyBhIGNhbWVsLWNhc2Ugc3RyaW5nIHRvIGEgZGFzaC1jYXNlIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIHN0ciB0aGF0IGdldHMgY29udmVydGVkIHRvIGRhc2gtY2FzZVxuICovXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oW2Etel18XikoW0EtWl0pL2csIGZ1bmN0aW9uIChtYXRjaCwgcDEsIHAyKSB7XG4gICAgcmV0dXJuIHAxICsgJy0nICsgcDIudG9Mb3dlckNhc2UoKTtcbiAgfSkucmVwbGFjZSgnbXMtJywgJy1tcy0nKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2VuZXJhdGVIYXNoQ29kZTtcbi8qKlxuICogR2VuZXJhdGVzIGEgaGFzaGNvZGUgZnJvbSBhIHN0cmluZ1xuICogVGFrZW4gZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NjE2NDg0XG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gc3RyIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIHVuaXF1ZSBoYXNoIGNvZGVcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVIYXNoQ29kZShzdHIpIHtcbiAgdmFyIGhhc2ggPSAwO1xuICB2YXIgaXRlcmF0b3IgPSB2b2lkIDA7XG4gIHZhciBjaGFyID0gdm9pZCAwO1xuICB2YXIgbGVuZ3RoID0gc3RyLmxlbmd0aDtcblxuICBpZiAobGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGhhc2g7XG4gIH1cblxuICBmb3IgKGl0ZXJhdG9yID0gMDsgaXRlcmF0b3IgPCBsZW5ndGg7ICsraXRlcmF0b3IpIHtcbiAgICBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaXRlcmF0b3IpO1xuICAgIGhhc2ggPSAoaGFzaCA8PCA1KSAtIGhhc2ggKyBjaGFyO1xuICAgIGhhc2ggfD0gMDtcbiAgfVxuXG4gIHJldHVybiBoYXNoLnRvU3RyaW5nKDM2KTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldEZvbnRGb3JtYXQ7XG52YXIgZm9ybWF0cyA9IHtcbiAgJy53b2ZmJzogJ3dvZmYnLFxuICAnLmVvZic6ICdlb2YnLFxuICAnLnR0Zic6ICd0cnVldHlwZScsXG4gICcuc3ZnJzogJ3N2Zydcbn07XG5cbi8vIFJldHVybnMgdGhlIGZvbnQgZm9ybWF0IGZvciBhIHNwZWNpZmljIGZvbnQgc291cmNlXG5mdW5jdGlvbiBnZXRGb250Rm9ybWF0KHNyYykge1xuICByZXR1cm4gT2JqZWN0LmtleXMoZm9ybWF0cykucmVkdWNlKGZ1bmN0aW9uIChmb3JtYXQsIGV4dGVuc2lvbikge1xuICAgIGlmIChzcmMuaW5kZXhPZihleHRlbnNpb24pID4gLTEpIHtcbiAgICAgIGZvcm1hdCA9IGZvcm1hdHNbZXh0ZW5zaW9uXTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9LCB1bmRlZmluZWQpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzTnVtYmVyID0gcmVxdWlyZSgnbG9kYXNoL2lzTnVtYmVyJyk7XG5cbnZhciBfaXNOdW1iZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNOdW1iZXIpO1xuXG52YXIgX2lzU3RyaW5nID0gcmVxdWlyZSgnbG9kYXNoL2lzU3RyaW5nJyk7XG5cbnZhciBfaXNTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNTdHJpbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uIChpc0R5bmFtaWMsIGl0ZW0pIHtcbiAgICBpZiAoISgwLCBfaXNTdHJpbmcyLmRlZmF1bHQpKGl0ZW0pICYmICEoMCwgX2lzTnVtYmVyMi5kZWZhdWx0KShpdGVtKSkge1xuICAgICAgaXNEeW5hbWljID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRHluYW1pYztcbiAgfSwgZmFsc2UpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgcmV0dXJuIHByb3BlcnR5LnN1YnN0cigwLCA2KSA9PT0gJ0BtZWRpYSc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICByZXR1cm4gcHJvcGVydHkuY2hhckF0KDApID09PSAnOic7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzb3J0UHNldWRvQ2xhc3NlcztcbnZhciBwcmVjZWRlbmNlID0ge1xuICAnOmxpbmsnOiA0LFxuICAnOnZpc2l0ZWQnOiAzLFxuICAnOmhvdmVyJzogMixcbiAgJzpmb2N1cyc6IDEuNSxcbiAgJzphY3RpdmUnOiAxXG59O1xuXG5mdW5jdGlvbiBzb3J0UHNldWRvQ2xhc3NlcyhsZWZ0LCByaWdodCkge1xuICB2YXIgcHJlY2VkZW5jZUxlZnQgPSBwcmVjZWRlbmNlW2xlZnRdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIHZhciBwcmVjZWRlbmNlUmlnaHQgPSBwcmVjZWRlbmNlW3JpZ2h0XTtcbiAgLy8gT25seSBzb3J0IGlmIGJvdGggcHJvcGVydGllcyBhcmUgbGlzdGVkXG4gIC8vIFRoaXMgcHJldmVudHMgb3RoZXIgcHNldWRvcyBmcm9tIHJlb3JkZXJpbmdcbiAgaWYgKHByZWNlZGVuY2VMZWZ0ICYmIHByZWNlZGVuY2VSaWdodCkge1xuICAgIHJldHVybiBwcmVjZWRlbmNlTGVmdCA8IHByZWNlZGVuY2VSaWdodCA/IDEgOiAtMTtcbiAgfVxuICByZXR1cm4gMDtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIi8qKlxuICogQXNzaWducyB0d28gc3R5bGVzIGFuZCBvcHRpb25hbGx5IG92ZXJ3cml0ZXMgZXhpc3RpbmcgdmFsdWVzXG4gKiBCdWlsdCB0byBhc3NpZ24gaW5saW5lLXN0eWxlIG9iamVjdHMgYW5kIHJlc3BlY3RzIENTUydzICFpbXBvcnRhbnQgYW5ub3RhdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIHN0eWxlIG9iamVjdHMgd2hpY2ggZ2V0IG1lcmdlZCB0b2dldGhlclxuICogTm90ZTogVGhlIGZpcnN0IHN0eWxlIG9iamVjdCB3aWxsIHNlcnZlIGFzIGJhc2VcbiAqIEV4aXN0aW5nIHZhbHVlcyB3aWxsIGdldCBvdmVyd3JpdHRlbiBieSBkZWZhdWx0XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBhc3NpZ25TdHlsZXM7XG5cbmZ1bmN0aW9uIGFzc2lnblN0eWxlcygpIHtcbiAgdmFyIHByb3BlcnR5ID0gdW5kZWZpbmVkO1xuXG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBzdHlsZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBzdHlsZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgbmV3U3R5bGVzID0gc3R5bGVzLnNwbGljZSgxKTtcbiAgdmFyIGJhc2UgPSBzdHlsZXNbMF07XG5cbiAgbmV3U3R5bGVzLmZvckVhY2goZnVuY3Rpb24gKHN0eWxlT2JqKSB7XG4gICAgaWYgKHN0eWxlT2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBPYmplY3Qua2V5cyhzdHlsZU9iaikuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVPYmpbcHJvcGVydHldO1xuICAgICAgICBpZiAoIShiYXNlLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiBpc0ltcG9ydGFudChiYXNlW3Byb3BlcnR5XSkpKSB7XG4gICAgICAgICAgaWYgKGJhc2VbcHJvcGVydHldIGluc3RhbmNlb2YgT2JqZWN0ICYmIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBiYXNlW3Byb3BlcnR5XSA9IGFzc2lnblN0eWxlcyh7fSwgYmFzZVtwcm9wZXJ0eV0sIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmFzZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBiYXNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHByb3BlcnR5IHZhbHVlIGlzIGFuIGNzcyBpbXBvcnRhbnQgcnVsZSB3aXRoICFpbXBvcnRhbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSAtIHByb3BlcnR5IHRoYXRzIHZhbHVlIGdldHMgY2hlY2tlZCBcbiAqL1xudmFyIGlzSW1wb3J0YW50ID0gZnVuY3Rpb24gaXNJbXBvcnRhbnQodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJyFpbXBvcnRhbnQnKSA+IC0xO1xufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzT2JqZWN0ID0gcmVxdWlyZSgnLi91dGlscy9pc09iamVjdCcpO1xuXG52YXIgX2lzT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzT2JqZWN0KTtcblxudmFyIF9pc0FycmF5ID0gcmVxdWlyZSgnLi91dGlscy9pc0FycmF5Jyk7XG5cbnZhciBfaXNBcnJheTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FycmF5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIExpbnRlciA9IChmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBJbnN0YW50aWFudGUgYSBuZXcgbGludGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBMaW50ZXIgY29uZmlndXJhdGlvbnMgZS5nLiBwbHVnaW5zXG4gICAqL1xuXG4gIGZ1bmN0aW9uIExpbnRlcihjb25maWcpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGludGVyKTtcblxuICAgIC8vIGNvbmZpZ3VyYXRpb24gd2l0aCBwbHVnaW5zIG11c3QgYmUgcHJvdmlkZWRcbiAgICBpZiAoISgwLCBfaXNPYmplY3QyLmRlZmF1bHQpKGNvbmZpZykgfHwgISgwLCBfaXNBcnJheTIuZGVmYXVsdCkoY29uZmlnLnBsdWdpbnMpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdZb3UgbXVzdCBwcm92aWRlIGEgY29uZmlndXJhdGlvbiBvYmplY3Qgd2hpY2ggYXQgbGVhc3QgY29udGFpbnMgYW4gYXJyYXkgb2YgcGx1Z2lucy4nKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBjYWNoZSBwbHVnaW5zIGFuZCBjb25maWd1cmF0aW9uXG4gICAgdGhpcy5wbHVnaW5zID0gY29uZmlnLnBsdWdpbnM7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogTGludHMgeW91ciBzdHlsZXNcbiAgICogQHJldHVybiB7T2JqZWN0W119IHJldHVybnMgYW4gYXJyYXkgb2Ygd2FybmluZ3NcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIFN0eWxlIG9iamVjdCB0aGF0IGdldHMgY2hlY2tlZFxuICAgKiBAcGFyYW0ge09iamVjdD99IGVsZW1lbnQgLSBlbGVtZW50IGluZm9ybWF0aW9uXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhMaW50ZXIsIFt7XG4gICAga2V5OiAnbGludCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxpbnQoc3R5bGVzKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgZWxlbWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgICAvLyBUaHJvdyBpZiBzdHlsZXMgaXMgbm90IGFuIG9iamVjdFxuICAgICAgaWYgKCEoMCwgX2lzT2JqZWN0Mi5kZWZhdWx0KShzdHlsZXMpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgYSB2YWxpZCBzdHlsZSBvYmplY3QuJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHdhcm5pbmdzID0gW107XG4gICAgICAvLyBpdGVyYXRlIGV2ZXJ5IHJlZ2lzdGVyZWQgcGx1Z2luIHRvIGdlbmVyYXRlIHdhcm5pbmdzXG4gICAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW4oc3R5bGVzLCBlbGVtZW50LCB3YXJuaW5ncywgX3RoaXMuY29uZmlnKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gd2FybmluZ3M7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIExpbnRlcjtcbn0pKCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IExpbnRlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO3ZhciBkYXNoVG9DYW1lbENhc2U9ZnVuY3Rpb24gZGFzaFRvQ2FtZWxDYXNlKHN0cil7cmV0dXJuIHN0ci5yZXBsYWNlKC8tKFthLXpdKS9nLGZ1bmN0aW9uKG1hdGNoKXtyZXR1cm4gbWF0Y2hbMV0udG9VcHBlckNhc2UoKX0pLnJlcGxhY2UoL15Ncy9nLCdtcycpfTtleHBvcnRzLmRlZmF1bHQ9e2FsaWduQ29udGVudDp7dmFsdWU6e2luaXRpYWw6J3N0cmV0Y2gnLGtleXdvcmRzOlsnY2VudGVyJywnZmxleC1lbmQnLCdmbGV4LXN0YXJ0Jywnc3BhY2UtYXJvdW5kJywnc3BhY2UtYmV0d2VlbicsJ3N0cmV0Y2gnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQuNCxjaHJvbWU6MjEsZWRnZToxMixmaXJlZm94OjI4LGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjYuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMixzYWZhcmk6MH19fSxhbGlnblNlbGY6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2Jhc2VsaW5lJywnY2VudGVyJywnZmxleC1lbmQnLCdmbGV4LXN0YXJ0Jywnc3RyZXRjaCddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LGFsaWduSXRlbXM6e3ZhbHVlOntpbml0aWFsOidzdHJldGNoJyxrZXl3b3JkczpbJ2Jhc2VsaW5lJywnY2VudGVyJywnZmxleC1lbmQnLCdmbGV4LXN0YXJ0Jywnc3RyZXRjaCddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LGFsaWdubWVudEJhc2VsaW5lOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnYWZ0ZXItZWRnZScsJ2FscGhhYmV0aWMnLCdiYXNlbGluZScsJ2JlZm9yZS1lZGdlJywnY2VudHJhbCcsJ2hhbmdpbmcnLCdpZGVvZ3JhcGhpYycsJ21hdGhlbWF0aWNhbCcsJ21pZGRsZScsJ3RleHQtYWZ0ZXItZWRnZScsJ3RleHQtYmVmb3JlLWVkZ2UnLCd1c2Utc2NyaXB0J119fSxhbmltYXRpb246e3ZhbHVlOntpbml0aWFsOidub25lJyxsb25naGFuZHM6WydhbmltYXRpb25OYW1lJywnYW5pbWF0aW9uRHVyYXRpb24nLCdhbmltYXRpb25UaW1pbmdGdW5jdGlvbicsJ2FuaW1hdGlvbkRlbGF5JywnYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQnLCdhbmltYXRpb25EaXJlY3Rpb24nLCdhbmltYXRpb25GaWxsTW9kZScsJ2FuaW1hdGlvblBsYXlTdGF0ZSddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo1LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMixzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDo0LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMS42LHNhZmFyaTozLjJ9fX0sYW5pbWF0aW9uRGVsYXk6e3ZhbHVlOntpbml0aWFsOjAsdGltZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo1LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMixzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDo0LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMS42LHNhZmFyaTozLjJ9fX0sYW5pbWF0aW9uRGlyZWN0aW9uOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ2FsdGVybmF0ZScsJ2FsdGVybmF0ZS1yZXZlcnNlJywnbm9ybWFsJywncmV2ZXJzZSddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo1LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMixzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDo0LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMS42LHNhZmFyaTozLjJ9fX0sYW5pbWF0aW9uRHVyYXRpb246e3ZhbHVlOntpbml0aWFsOjAsdGltZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo1LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMixzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDo0LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMS42LHNhZmFyaTozLjJ9fX0sYW5pbWF0aW9uRmlsbE1vZGU6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2JhY2t3YXJkcycsJ2JvdGgnLCdmb3J3YXJkcycsJ25vbmUnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6Mi40LGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo1LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMixzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDo0LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMS42LHNhZmFyaTozLjJ9fX0sYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6e3ZhbHVlOntpbml0aWFsOjEsZmxvYXQ6dHJ1ZSxrZXl3b3JkczpbJ2luZmluaXRlJ10scG9zaXRpdmU6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NCxjaHJvbWU6NCxlZGdlOjEyLGZpcmVmb3g6NSxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTIsc2FmYXJpOjR9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6NCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTEuNixzYWZhcmk6My4yfX19LGFuaW1hdGlvbk5hbWU6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ25vbmUnXSxzdHJpbmc6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NCxjaHJvbWU6NCxlZGdlOjEyLGZpcmVmb3g6NSxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTIsc2FmYXJpOjR9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6NCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTEuNixzYWZhcmk6My4yfX19LGFuaW1hdGlvblBsYXlTdGF0ZTp7dmFsdWU6e2luaXRpYWw6J3J1bm5pbmcnLGtleXdvcmRzOlsncGF1c2VkJywncnVubmluZyddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo1LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMixzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDo0LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMS42LHNhZmFyaTozLjJ9fX0sYW5pbWF0aW9uVGltaW5nRnVuY3Rpb246e3ZhbHVlOntjdWJpY0Jlemllcjp0cnVlLGluaXRpYWw6J2Vhc2UnLGtleXdvcmRzOlsnZWFzZScsJ2Vhc2UtaW4nLCdlYXNlLWluLW91dCcsJ2Vhc2Utb3V0JywnbGluZWFyJywnc3RlcC1lbmQnLCdzdGVwLXN0YXJ0J119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjUsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEyLHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjQsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjExLjYsc2FmYXJpOjMuMn19fSxhcHBlYXJhbmNlOnt2YWx1ZTp7aW5pdGlhbDonbm9uZSd9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J2F1dG8nfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2F1dG9cXCcuJ30scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjExLGllX21vYjoxMCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjB9fX0sIC8vIFRPRE86IGNvbXBsZXRlXG5iYWNrZHJvcEZpbHRlcjp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7aW9zX3NhZjo5LHNhZmFyaTo5fSxwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZToxNCxmaXJlZm94OjQ2LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjguMSxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjh9fX0sYmFja2ZhY2VWaXNpYmlsaXR5Ont2YWx1ZTp7aW5pdGlhbDondmlzaWJsZScsa2V5d29yZHM6WydoaWRkZW4nLCd2aXNpYmxlJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjMsY2hyb21lOjEyLGVkZ2U6MTIsZmlyZWZveDoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6Mi4zLGNocm9tZToxMSxlZGdlOjAsZmlyZWZveDo5LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sYmFja2dyb3VuZDp7dmFsdWU6e2luaXRpYWw6MH0sbG9uZ2hhbmRzOlsnYmFja2dyb3VuZEF0dGFjaG1lbnQnLCdiYWNrZ3JvdW5kQmxlbmRNb2RlJywnYmFja2dyb3VuZENsaXAnLCdiYWNrZ3JvdW5kQ29sb3InLCdiYWNrZ3JvdW5kSW1hZ2UnLCdiYWNrZ3JvdW5kT3JpZ2luJywnYmFja2dyb3VuZFBvc2l0aW9uJywnYmFja2dyb3VuZFBvc2l0aW9uWCcsJ2JhY2tncm91bmRQb3NpdGlvblknLCdiYWNrZ3JvdW5kUmVwZWF0JywnYmFja2dyb3VuZFJlcGVhdFgnLCdiYWNrZ3JvdW5kUmVwZWF0WScsJ2JhY2tncm91bmRTaXplJ119LGJhY2tncm91bmRBdHRhY2htZW50Ont2YWx1ZTp7aW5pdGlhbDonc2Nyb2xsJyxrZXl3b3JkczpbJ2ZpeGVkJywnbG9jYWwnLCdzY3JvbGwnXX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOlt7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J2xvY2FsJ30sYnJvd3Nlcjp7ZmlyZWZveDp7dXB0bzoyNH0sb3BlcmE6MTAuMSxhbmRyb2lkOntmcm9tOjQuMSx0bzo0LjN9LGllOnt1cHRvOjh9LHNhZmFyaTp7dXB0bzozfSxhbmRfdWM6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdsb2NhbFxcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J2ZpeGVkJ30sYnJvd3Nlcjp7aW9zX3NhZjp7dXB0bzo3LjF9LGFuZF9jaHI6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdsb2NhbFxcJy4nfSx7YnJvd3Nlcjp7b3BfbWluaTp0cnVlfSxoaW50OidpcyBub3Qgc3VwcG9ydGVkLid9XX19LGJhY2tncm91bmRCbGVuZE1vZGU6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnY29sb3InLCdjb2xvci1idXJuJywnY29sb3ItZG9kZ2UnLCdkYXJrZW4nLCdkaWZmZXJlbmNlJywnZXhjbHVzaW9uJywnaGFyZC1saWdodCcsJ2h1ZScsJ2xpZ2h0ZW4nLCdsdW1pbm9zaXR5JywnbXVsdGlwbHknLCdub3JtYWwnLCdvdmVybGF5Jywnc2F0dXJhdGlvbicsJ3NjcmVlbicsJ3NvZnQtbGlnaHQnXX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOlt7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9odWV8c2F0dXJhdGlvbnxjb2xvcnxsdW1pbm9zaXR5LykhPT1udWxsfSxicm93c2VyOntzYWZhcmk6e3VwdG86OX0saW9zX3NhZjp7dXB0bzo5LjJ9fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2h1ZVxcJywgXFwnc2F0dXJhdGlvblxcJywgXFwnY29sb3JcXCcgYW5kIFxcJ2x1bWlub3NpdHlcXCcuJ30se2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvWyxdLykhPT1udWxsfSxicm93c2VyOntpb3Nfc2FmOnRydWV9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgbXVsdGlwbGUgYmxlbmQtbW9kZXMuJ31dfX0sYmFja2dyb3VuZENsaXA6e3ZhbHVlOntpbml0aWFsOidib3JkZXItYm94JyxrZXl3b3JkczpbJ2JvcmRlci1ib3gnLCdjb250ZW50LWJveCcsJ3BhZGRpbmctYm94J119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MTUsZWRnZToxMixmaXJlZm94OjQsaWU6OSxpZV9tb2I6MTAsaW9zX3NhZjo3LG9wZXJhOjEwLjUsc2FmYXJpOjd9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6My41LGllOjgsaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYTo5LjUsc2FmYXJpOjB9fX0sYmFja2dyb3VuZENvbG9yOnt2YWx1ZTp7Y29sb3I6dHJ1ZSxpbml0aWFsOid0cmFuc3BhcmVudCd9fSxiYWNrZ3JvdW5kSW1hZ2U6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ25vbmUnXSx1cmw6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7IC8vIHNob3J0aGFuZCBiYWNrZ3JvdW5kIHRvIGNoZWNrIHRvb1xuaXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL1suXXN2Zy8pIT09bnVsbH0sYnJvd3Nlcjp7c2FmYXJpOnt1cHRvOjR9LGlvc19zYWY6e3VwdG86NC4xfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdiYWNrZ3JvdW5kUG9zaXRpb25cXCcgaWYgdGhlIGJhY2tncm91bmQgaXMgYSBzdmcgaW1hZ2UuJ319fSxiYWNrZ3JvdW5kT3JpZ2luOnt2YWx1ZTp7aW5pdGlhbDoncGFkZGluZy1ib3gnLGtleXdvcmRzOlsnYm9yZGVyLWJveCcsJ2NvbnRlbnQtYm94JywncGFkZGluZy1ib3gnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZToxNSxlZGdlOjEyLGZpcmVmb3g6NCxpZTo5LGllX21vYjoxMCxpb3Nfc2FmOjcsb3BlcmE6MTAuNSxzYWZhcmk6N30scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDozLjUsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjkuNSxzYWZhcmk6MH19fSxiYWNrZ3JvdW5kUG9zaXRpb246e3ZhbHVlOntpbml0aWFsOicwIDAnfSxsb25naGFuZHM6WydiYWNrZ3JvdW5kUG9zaXRpb25YJywnYmFja2dyb3VuZFBvc2l0aW9uWSddfSxiYWNrZ3JvdW5kUG9zaXRpb25YOnt2YWx1ZTp7aW5pdGlhbDowLGtleXdvcmRzOlsnYm90dG9tJywnY2VudGVyJywnbGVmdCcsJ3JpZ2h0JywndG9wJ119LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7YnJvd3Nlcjp7aWU6OX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdjYWxjKClcXCcuJ319fSxiYWNrZ3JvdW5kUG9zaXRpb25ZOnt2YWx1ZTp7aW5pdGlhbDowLGtleXdvcmRzOlsnYm90dG9tJywnY2VudGVyJywnbGVmdCcsJ3JpZ2h0JywndG9wJ119LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7YnJvd3Nlcjp7aWU6OX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdjYWxjKClcXCcuJ319fSxiYWNrZ3JvdW5kUmVwZWF0Ont2YWx1ZTp7aW5pdGlhbDoncmVwZWF0JyxrZXl3b3JkczpbJ25vLXJlcGVhdCcsJ3JlcGVhdCcsJ3JlcGVhdC14JywncmVwZWF0LXknXX0sbG9uZ2hhbmRzOlsnYmFja2dyb3VuZFJlcGVhdFgnLCdiYWNrZ3JvdW5kUmVwZWF0WSddfSxiYWNrZ3JvdW5kUmVwZWF0WDp7dmFsdWU6e2luaXRpYWw6J3JlcGVhdCcsa2V5d29yZHM6Wyduby1yZXBlYXQnLCdyZXBlYXQnLCdyZXBlYXQteCcsJ3JlcGVhdC15J119fSxiYWNrZ3JvdW5kUmVwZWF0WTp7dmFsdWU6e2luaXRpYWw6J3JlcGVhdCcsa2V5d29yZHM6Wyduby1yZXBlYXQnLCdyZXBlYXQnLCdyZXBlYXQteCcsJ3JlcGVhdC15J119fSxiYWNrZ3JvdW5kU2l6ZTp7dmFsdWU6e2luaXRpYWw6J2F1dG8gYXV0bycsa2V5d29yZHM6WydhdXRvJywnY29udGFpbicsJ2NvdmVyJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjE1LGVkZ2U6MTIsZmlyZWZveDo0LGllOjksaWVfbW9iOjEwLGlvc19zYWY6NyxvcGVyYToxMC41LHNhZmFyaTo3fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMuNSxpZTo4LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6OS41LHNhZmFyaTowfSxpc3N1ZXM6W3tjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goLyUvKSE9PW51bGx9LGJyb3dzZXI6e2FuZHJvaWQ6e3VwdG86NC4zfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBwZXJjZW50YWdlIHZhbHVlcy4nfSx7YnJvd3Nlcjp7b3BfbWluaTp0cnVlfSxoaW50OidpcyBub3Qgc3VwcG9ydGVkLid9XX19LGJhc2VsaW5lU2hpZnQ6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2Jhc2VsaW5lJywnc3ViJywnc3VwZXInLCdhdXRvJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sYm9yZGVyOnt2YWx1ZTp7aW5pdGlhbDowLGtleXdvcmRzOlsnbm9uZSddfSxsb25naGFuZHM6Wydib3JkZXJXaWR0aCcsJ2JvcmRlclN0eWxlJywnYm9yZGVyQ29sb3InXX0sYm9yZGVyQm90dG9tOnt2YWx1ZTp7aW5pdGlhbDowLGtleXdvcmRzOlsnbm9uZSddfSxsb25naGFuZHM6Wydib3JkZXJCb3R0b21XaWR0aCcsJ2JvcmRlckJvdHRvbVN0eWxlJywnYm9yZGVyQm90dG9tQ29sb3InXX0sYm9yZGVyQm90dG9tQ29sb3I6e3ZhbHVlOntjb2xvcjp0cnVlLGluaXRpYWw6J2luaGVyaXQnfX0sYm9yZGVyQm90dG9tTGVmdFJhZGl1czp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxib3JkZXJCb3R0b21SaWdodFJhZGl1czp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxib3JkZXJCb3R0b21TdHlsZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnZGFzaGVkJywnZG90dGVkJywnZG91YmxlJywnZ3Jvb3ZlJywnaGlkZGVuJywnaW5zZXQnLCdub25lJywnb3V0c2V0JywncmlkZ2UnLCdzb2xpZCddfX0sYm9yZGVyQm90dG9tV2lkdGg6e3ZhbHVlOntpbml0aWFsOidtZWRpdW0nLGtleXdvcmRzOlsnbWVkaXVtJywndGhpY2snLCd0aGluJ10sbGVuZ3RoOnRydWV9fSxib3JkZXJDb2xsYXBzZTp7dmFsdWU6e2luaXRpYWw6J3NlcGFyYXRlJyxrZXl3b3JkczpbJ2NvbGxhcHNlJywnc2VwZXJhdGUnXX19LGJvcmRlckNvbG9yOnt2YWx1ZTp7Y29sb3I6dHJ1ZSxpbml0aWFsOidpbmhlcml0J30sbG9uZ2hhbmRzOlsnYm9yZGVyVG9wQ29sb3InLCdib3JkZXJSaWdodENvbG9yJywnYm9yZGVyQm90dG9tQ29sb3InLCdib3JkZXJMZWZ0Q29sb3InXX0sYm9yZGVySW1hZ2U6e3ZhbHVlOntpbml0aWFsOidub25lJ30sbG9uZ2hhbmRzOlsnYm9yZGVySW1hZ2VPdXRzZXQnLCdib3JkZXJJbWFnZVJlcGVhdCcsJ2JvcmRlckltYWdlU2xpY2UnLCdib3JkZXJJbWFnZVNvdXJjZScsJ2JvcmRlckltYWdlV2lkdGgnXSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjE1LGVkZ2U6MTIsZmlyZWZveDoxNSxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo2LG9wZXJhOjE1LHNhZmFyaTo2fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTAsc2FmYXJpOjB9fX0sYm9yZGVySW1hZ2VPdXRzZXQ6e3ZhbHVlOntpbml0aWFsOjAsZmxvYXQ6dHJ1ZSxsZW5ndGg6dHJ1ZSxwb3NpdGl2ZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjE1LGVkZ2U6MTIsZmlyZWZveDoxNSxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo2LG9wZXJhOjE1LHNhZmFyaTo2fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTAsc2FmYXJpOjB9fX0sYm9yZGVySW1hZ2VSZXBlYXQ6e3ZhbHVlOntpbml0aWFsOidzdHJldGNoJyxrZXl3b3JkczpbJ3JlcGVhdCcsJ3JvdW5kJywnc3RyZXRjaCddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjE1LGVkZ2U6MTIsZmlyZWZveDoxNSxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo2LG9wZXJhOjE1LHNhZmFyaTo2fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTAsc2FmYXJpOjB9fX0sYm9yZGVySW1hZ2VTbGljZTp7dmFsdWU6e2luaXRpYWw6JzEwMCUnLGZsb2F0OnRydWUsa2V5d29yZHM6WydmaWxsJ10scGVyY2VudGFnZTp0cnVlLHBvc2l0aXZlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MTUsZWRnZToxMixmaXJlZm94OjE1LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BlcmE6MTUsc2FmYXJpOjZ9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MyxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMCxzYWZhcmk6MH19fSxib3JkZXJJbWFnZVNvdXJjZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnbm9uZSddLHVybDp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjE1LGVkZ2U6MTIsZmlyZWZveDoxNSxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo2LG9wZXJhOjE1LHNhZmFyaTo2fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTAsc2FmYXJpOjB9fX0sYm9yZGVySW1hZ2VXaWR0aDp7dmFsdWU6e2luaXRpYWw6MSxmbG9hdDp0cnVlLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZSxwb3NpdGl2ZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjE1LGVkZ2U6MTIsZmlyZWZveDoxNSxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo2LG9wZXJhOjE1LHNhZmFyaTo2fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTAsc2FmYXJpOjB9fX0sYm9yZGVyTGVmdDp7dmFsdWU6e2luaXRpYWw6MCxrZXl3b3JkczpbJ25vbmUnXX0sbG9uZ2hhbmRzOlsnYm9yZGVyTGVmdFdpZHRoJywnYm9yZGVyTGVmdFN0eWxlJywnYm9yZGVyTGVmdENvbG9yJ119LGJvcmRlckxlZnRDb2xvcjp7dmFsdWU6e2NvbG9yOnRydWUsaW5pdGlhbDonaW5oZXJpdCd9fSxib3JkZXJMZWZ0U3R5bGU6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2Rhc2hlZCcsJ2RvdHRlZCcsJ2RvdWJsZScsJ2dyb292ZScsJ2hpZGRlbicsJ2luc2V0Jywnbm9uZScsJ291dHNldCcsJ3JpZGdlJywnc29saWQnXX19LGJvcmRlckxlZnRXaWR0aDp7dmFsdWU6e2luaXRpYWw6J21lZGl1bScsa2V5d29yZHM6WydtZWRpdW0nLCd0aGljaycsJ3RoaW4nXSxsZW5ndGg6dHJ1ZX19LGJvcmRlclJhZGl1czp7dmFsdWU6e2luaXRpYWw6MH0sbG9uZ2hhbmRzOlsnYm9yZGVyVG9wTGVmdFJhZGl1cycsJ2JvcmRlclRvcFJpZ2h0UmFkaXVzJywnYm9yZGVyQm90dG9tUmlnaHRSYWRpdXMnLCdib3JkZXJCb3R0b21MZWZ0UmFkaXVzJ10sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6Mi4xLGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDozLGllOjksaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEwLjUsc2FmYXJpOjMuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjgsaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMCxzYWZhcmk6MH19fSxib3JkZXJSaWdodDp7dmFsdWU6e2luaXRpYWw6MCxrZXl3b3JkczpbJ25vbmUnXX0sbG9uZ2hhbmRzOlsnYm9yZGVyUmlnaHRXaWR0aCcsJ2JvcmRlclJpZ2h0U3R5bGUnLCdib3JkZXJSaWdodENvbG9yJ119LGJvcmRlclJpZ2h0Q29sb3I6e3ZhbHVlOntjb2xvcjp0cnVlLGluaXRpYWw6J2luaGVyaXQnfX0sYm9yZGVyUmlnaHRTdHlsZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnZGFzaGVkJywnZG90dGVkJywnZG91YmxlJywnZ3Jvb3ZlJywnaGlkZGVuJywnaW5zZXQnLCdub25lJywnb3V0c2V0JywncmlkZ2UnLCdzb2xpZCddfX0sYm9yZGVyUmlnaHRXaWR0aDp7dmFsdWU6e2luaXRpYWw6J21lZGl1bScsa2V5d29yZHM6WydtZWRpdW0nLCd0aGljaycsJ3RoaW4nXSxsZW5ndGg6dHJ1ZX19LGJvcmRlclNwYWNpbmc6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWV9fSxib3JkZXJTdHlsZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnZGFzaGVkJywnZG90dGVkJywnZG91YmxlJywnZ3Jvb3ZlJywnaGlkZGVuJywnaW5zZXQnLCdub25lJywnb3V0c2V0JywncmlkZ2UnLCdzb2xpZCddfSxsb25naGFuZHM6Wydib3JkZXJUb3BTdHlsZScsJ2JvcmRlclJpZ2h0U3R5bGUnLCdib3JkZXJCb3R0b21TdHlsZScsJ2JvcmRlckxlZnRTdHlsZSddfSxib3JkZXJUb3A6e3ZhbHVlOntpbml0aWFsOjAsa2V5d29yZHM6Wydub25lJ119LGxvbmdoYW5kczpbJ2JvcmRlclRvcFdpZHRoJywnYm9yZGVyVG9wU3R5bGUnLCdib3JkZXJUb3BDb2xvciddfSxib3JkZXJUb3BDb2xvcjp7dmFsdWU6e2NvbG9yOnRydWUsaW5pdGlhbDonaW5oZXJpdCd9fSxib3JkZXJUb3BMZWZ0UmFkaXVzOnt2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LGJvcmRlclRvcFJpZ2h0UmFkaXVzOnt2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LGJvcmRlclRvcFN0eWxlOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydkYXNoZWQnLCdkb3R0ZWQnLCdkb3VibGUnLCdncm9vdmUnLCdoaWRkZW4nLCdpbnNldCcsJ25vbmUnLCdvdXRzZXQnLCdyaWRnZScsJ3NvbGlkJ119fSxib3JkZXJUb3BXaWR0aDp7dmFsdWU6e2luaXRpYWw6J21lZGl1bScsa2V5d29yZHM6WydtZWRpdW0nLCd0aGljaycsJ3RoaW4nXSxsZW5ndGg6dHJ1ZX19LGJvcmRlcldpZHRoOnt2YWx1ZTp7aW5pdGlhbDonbWVkaXVtJ30sbG9uZ2hhbmRzOlsnYm9yZGVyVG9wV2lkdGgnLCdib3JkZXJSaWdodFdpZHRoJywnYm9yZGVyQm90dG9tV2lkdGgnLCdib3JkZXJMZWZ0V2lkdGgnXX0sYm90dG9tOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sYm94RGVjb3JhdGlvbkJyZWFrOntjb21wYXRpYmlsaXR5OntmdWxsOntmaXJlZm94OjMyLG9wZXJhOjExfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMixjaHJvbWU6MjEsZWRnZToxNCxmaXJlZm94OjMxLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BfbWluaTowLG9wZXJhOjEwLjYsc2FmYXJpOjZ9fX0sYm94U2hhZG93Ont2YWx1ZTp7aW5pdGlhbDonbm9uZSd9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjMuNSxpZTo5LGllX21vYjoxMCxpb3Nfc2FmOjQsb3BlcmE6MTAuNSxzYWZhcmk6NX0saXNzdWVzOlt7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLnJlcGxhY2UoLyhyZ2JbYV0/fGhzbFthXT8pXFwoLipcXCkvZywnJykubWF0Y2goL1ssXS8pIT09bnVsbH0sYnJvd3Nlcjp7c2FmYXJpOnt1cHRvOjR9LGlvc19zYWY6e3VwdG86My4yfSxhbmRyb2lkOnt1cHRvOjN9fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIHNoYWRvd3MuJ30se2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvaW5zZXQvKSE9PW51bGx9LGJyb3dzZXI6e3NhZmFyaTp7dXB0bzo0fSxpb3Nfc2FmOnt1cHRvOjMuMn0sYW5kcm9pZDp7dXB0bzozfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdpbnNldFxcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7dmFyIGNvbG9yQ2xlYW49dmFsdWUucmVwbGFjZSgvcmdiW2FdP1xcKC4qXFwpL2csJycpO3ZhciBzaGFkb3dzPWNvbG9yQ2xlYW4uc3BsaXQoJywnKTt2YXIgaW52YWxpZD1mYWxzZTtzaGFkb3dzLmZvckVhY2goZnVuY3Rpb24oc2hhZG93KXt2YXIgY29sb3JTcGxpdD1zaGFkb3cuc3BsaXQoJyAnKTtpZihjb2xvclNwbGl0Lmxlbmd0aD49Myl7aWYoY29sb3JTcGxpdFsyXT09PScwcHgnKXtpbnZhbGlkPXRydWV9fX0pO3JldHVybiBpbnZhbGlkfSxicm93c2VyOntzYWZhcmk6e3VwdG86Nn0saW9zX3NhZjp7dXB0bzo2fSxhbmRyb2lkOnt1cHRvOjIuM319LGhpbnQ6J2RvZXMgbm90IFxcJzBweFxcJyBhcyBibHVyIHJhZGl1cy4nfSx7IC8vIGdlbmVyYWxcbi8vIGludmVzdGlnYXRlIGxhdGVyXG5icm93c2VyOntzYWZhcmk6e3VwdG86NH0saW9zX3NhZjp7dXB0bzozLjJ9LGFuZHJvaWQ6e3VwdG86M319LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgYSBibHVyIHJhZGl1cy4nfV0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDozLGllOjgsaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMCxzYWZhcmk6MH19fSxib3hTaXppbmc6e3ZhbHVlOntpbml0aWFsOidjb250ZW50LWJveCcsa2V5d29yZHM6Wydib3JkZXItYm94JywnY29udGVudC1ib3gnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6Mi4xLGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDoyLGllOjgsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wX21pbmk6NSxvcGVyYTo5LjUsc2FmYXJpOjMuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjAsaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYTo5LHNhZmFyaTowfSwgLy8gZ2VuZXJhbFxuaXNzdWVzOnticm93c2VyOntzYWZhcmk6Ni4wfSxoaW50OidpcyBub3Qgc3VwcG9ydGVkIG9uIGVsZW1lbnRzIHdpdGggXFwnZGlzcGxheTp0YWJsZVxcJy4nfX19LGJ1ZmZlcmVkUmVuZGVyaW5nOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnZHluYW1pYycsJ3N0YXRpYyddfX0sYnJlYWtCZWZvcmU6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF91Yzo5LjksaW9zX3NhZjo3LHNhZmFyaTo2LjEsZWRnZToxMixpZToxMCxpZV9tb2I6MTAsb3BfbWluaTo1LG9wZXJhOjExLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTEsc2FmYXJpOjB9fX0sYnJlYWtBZnRlcjp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX3VjOjkuOSxpb3Nfc2FmOjcsc2FmYXJpOjYuMSxlZGdlOjEyLGllOjEwLGllX21vYjoxMCxvcF9taW5pOjUsb3BlcmE6MTEuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMSxzYWZhcmk6MH19fSxicmVha0luc2lkZTp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX3VjOjkuOSxpb3Nfc2FmOjcsc2FmYXJpOjYuMSxlZGdlOjEyLGllOjEwLGllX21vYjoxMCxvcF9taW5pOjUsb3BlcmE6MTEuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMSxzYWZhcmk6MH19fSxjYXB0aW9uU2lkZTp7dmFsdWU6e2luaXRpYWw6J3RvcCcsa2V5d29yZHM6Wydib3R0b20nLCd0b3AnXX19LGNsZWFyOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6Wydib3RoJywnbGVmdCcsJ25vbmUnLCdyaWdodCddfX0sY2xpcDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0byddfX0sY2xpcFBhdGg6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2JvcmRlci1ib3gnLCdjb250ZW50LWJveCcsJ2ZpbGwtYm94JywnbWFyZ2luLWJveCcsJ25vbmUnLCdwYWRkaW5nLWJveCcsJ3N0cm9rZS1ib3gnLCd2aWV3LWJveCddLHVybDp0cnVlfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvXnVybFxcKC8pPT09bnVsbH0sYnJvd3Nlcjp7ZmlyZWZveDp0cnVlfSxoaW50Oidvbmx5IHN1cHBvcnRzIFxcJ3VybCgpXFwnLid9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4yLGNocm9tZToyMyxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo2LG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTo2LjF9fX0sY2xpcFJ1bGU6e3ZhbHVlOntpbml0aWFsOidub25lemVybycsa2V5d29yZHM6WydldmVub2RkJywnbm9uZXplcm8nXX19LGNvbG9yOnt2YWx1ZTp7Y29sb3I6dHJ1ZSxpbml0aWFsOidpbmhlcml0J319LGNvbG9ySW50ZXJwb2xhdGlvbjp7dmFsdWU6e2luaXRpYWw6J3NSR0InLGtleXdvcmRzOlsnYXV0bycsJ2xpbmVhclJHQicsJ3NSR0InXX19LGNvbG9ySW50ZXJwb2xhdGlvbkZpbHRlcnM6e3ZhbHVlOntpbml0aWFsOidsaW5lYXJSR0InLGtleXdvcmRzOlsnYXV0bycsJ2xpbmVhclJHQicsJ3NSR0InXX19LGNvbG9yUHJvZmlsZTp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0bycsJ3NSR0InXSxzdHJpbmc6dHJ1ZSx1cmw6dHJ1ZX19LGNvbG9yUmVuZGVyaW5nOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnb3B0aW1pemVRdWFsaXR5Jywnb3B0aW1pemVTcGVlZCddfX0sY29sdW1uQ291bnQ6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxpbnRlZ2VyOnRydWUsa2V5d29yZHM6WydhdXRvJywnbm9ybWFsJ10scG9zaXRpdmU6dHJ1ZSxub3ROdWxsOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2VkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLG9wX21pbmk6NSxvcGVyYToxMS4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjExLHNhZmFyaTowfX19LGNvbHVtbkZpbGw6e3ZhbHVlOntpbml0aWFsOidiYWxhbmNlJyxrZXl3b3JkczpbJ2F1dG8nLCdiYWxhbmNlJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2VkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLG9wX21pbmk6NSxvcGVyYToxMS4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjExLHNhZmFyaTowfX19LGNvbHVtbkdhcDp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6Wydub3JtYWwnXSxsZW5ndGg6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZWRnZToxMixpZToxMCxpZV9tb2I6MTAsb3BfbWluaTo1LG9wZXJhOjExLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTEsc2FmYXJpOjB9fX0sY29sdW1uUnVsZTp7dmFsdWU6e2luaXRpYWw6J21lZGl1bSBub25lIGN1cnJlbnRDb2xvcid9LGxvbmdoYW5kczpbJ2NvbHVtblJ1bGVXaWR0aCcsJ2NvbHVtblJ1bGVTdHlsZScsJ2NvbHVtblJ1bGVDb2xvciddLGNvbXBhdGliaWxpdHk6e2Z1bGw6e2VkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLG9wX21pbmk6NSxvcGVyYToxMS4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjExLHNhZmFyaTowfX19LGNvbHVtblJ1bGVDb2xvcjp7dmFsdWU6e2NvbG9yOnRydWUsaW5pdGlhbDonY3VycmVudENvbG9yJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZWRnZToxMixpZToxMCxpZV9tb2I6MTAsb3BfbWluaTo1LG9wZXJhOjExLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTEsc2FmYXJpOjB9fX0sY29sdW1uUnVsZVN0eWxlOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydkYXNoZWQnLCdkb3R0ZWQnLCdkb3VibGUnLCdncm9vdmUnLCdoaWRkZW4nLCdpbnNldCcsJ25vbmUnLCdvdXRzZXQnLCdyaWRnZScsJ3NvbGlkJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2VkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLG9wX21pbmk6NSxvcGVyYToxMS4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjExLHNhZmFyaTowfX19LGNvbHVtblJ1bGVXaWR0aDp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnbWVkaXVtJywndGhpY2snLCd0aGluJ10sbGVuZ3RoOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2VkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLG9wX21pbmk6NSxvcGVyYToxMS4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjExLHNhZmFyaTowfX19LGNvbHVtblNwYW46e3ZhbHVlOntpbml0aWFsOjEsa2V5d29yZHM6WzEsJ2FsbCddfSxjb21wYXRpYmlsaXR5OntmdWxsOntlZGdlOjEyLGllOjEwLGllX21vYjoxMCxvcF9taW5pOjUsb3BlcmE6MTEuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMSxzYWZhcmk6MH19fSxjb2x1bW5XaWR0aDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0byddLGxlbmd0aDp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOntlZGdlOjEyLGllOjEwLGllX21vYjoxMCxvcF9taW5pOjUsb3BlcmE6MTEuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMSxzYWZhcmk6MH19fSxjb2x1bW5zOnt2YWx1ZTp7aW5pdGlhbDonYXV0byBhdXRvJyxrZXl3b3JkczpbJ2F1dG8nXX0sbG9uZ2hhbmRzOlsnY29sdW1uV2lkdGgnLCdjb2x1bW5Db3VudCddLGNvbXBhdGliaWxpdHk6e2Z1bGw6e2VkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLG9wX21pbmk6NSxvcGVyYToxMS4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjExLHNhZmFyaTowfX19LGNvbnRlbnQ6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnYXR0cicsJ2Nsb3NlLXF1b3RlJywnY291bnRlcicsJ25vLWNsb3NlLXF1b3RlJywnbm8tb3Blbi1xdW90ZScsJ25vbmUnLCdub3JtYWwnLCdvcGVuLXF1b3RlJ10sc3RyaW5nOnRydWUsdXJsOnRydWV9fSxjb3VudGVySW5jcmVtZW50Ont2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6Wydub25lJ119fSxjb3VudGVyUmVzZXQ6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ25vbmUnXX19LGN1cnNvcjp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYWxpYXMnLCdhbGwtc2Nyb2xsJywnYXV0bycsJ2NlbGwnLCdjb2wtcmVzaXplJywnY29udGV4dC1tZW51JywnY29weScsJ2Nyb3NzaGFpcicsJ2RlZmF1bHQnLCdlLXJlc2l6ZScsJ2V3LXJlc2l6ZScsJ2dyYWInLCdncmFiYmluZycsJ2hlbHAnLCdtb3ZlJywnbi1yZXNpemUnLCduZS1yZXNpemUnLCduZXN3LXJlc2l6ZScsJ25vLWRyb3AnLCdub25lJywnbm90LWFsbG93ZWQnLCdwb2ludGVyJywncHJvZ3Jlc3MnLCdyb3ctcmVzaXplJywncy1yZXNpemUnLCdzZS1yZXNpemUnLCd0ZXh0JywndmVydGljYWwtdGV4dCcsJ3ctcmVzaXplJywnd2FpdCcsJ3pvb20taW4nLCd6b29tLW91dCddLHVybDp0cnVlfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6W3tjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL2FsaWFzfGNlbGx8Y29weXxldy1yZXNpemV8bnMtcmVzaXplfG5lc3ctcmVzaXplfG53c2UtcmVzaXplfGNvbnRleHQtbWVudS8pIT09bnVsbH0sYnJvd3Nlcjp7aWU6e3VwdG86OH19LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnYWxpYXNcXCcsIFxcJ2NlbGxcXCcsIFxcJ2NvcHlcXCcsIFxcJ2V3LXJlc2l6ZVxcJywgXFwnbnMtcmVzaXplXFwnLCBcXCduZXN3LXJlc2l6ZVxcJywgXFwnbndzZS1yZXNpemVcXCcgYW5kIFxcJ2NvbnRleHQtbWVudVxcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC91cmxcXCh8bm9uZS8pIT09bnVsbH0sYnJvd3Nlcjp7ZWRnZTp0cnVlLG9wZXJhOnt1cHRvOjEyLjF9fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ25vbmVcXCcgYW5kIFxcJ3VybCgpXFwnLid9LHsgLy8gZ2VuZXJhbFxuY29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLnRvTG93ZXJDYXNlKCkubWF0Y2goL3VybFxcKCguKlsuXWpwZ3xbLl1wbmd8Wy5danBlZylcXCkvKSE9PW51bGx9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgSlBHIGFuZCBQTkcgb24gTWFjcy4nfSx7IC8vIGdlbmVyYWxcbmNvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvdXJsXFwoLykhPT1udWxsfSxicm93c2VyOntpZTp0cnVlfSxoaW50Oidkb2VzIG9ubHkgc3VwcG9ydCB0aGUgQ1VSIGZvcm1hdC4nfV19fSxjeDp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZX19LGN5Ont2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlfX0sZGlyZWN0aW9uOnt2YWx1ZTp7aW5pdGlhbDonbHRyJyxrZXl3b3JkczpbJ2x0cicsJ3J0bCddfX0sZGlzcGxheTp7dmFsdWU6e2luaXRpYWw6J2lubGluZScsa2V5d29yZHM6WydibG9jaycsJ2ZsZXgnLCdpbmxpbmUnLCdpbmxpbmUtYmxvY2snLCdpbmxpbmUtZmxleCcsJ2lubGluZS10YWJsZScsJ2xpc3QtaXRlbScsJ25vbmUnLCdydW4taW4nLCd0YWJsZScsJ3RhYmxlLWNhcHRpb24nLCd0YWJsZS1jZWxsJywndGFibGUtY29sdW1uJywndGFibGUtY29sdW1uLWdyb3VwJywndGFibGUtZm9vdGVyLWdyb3VwJywndGFibGUtaGVhZGVyLWdyb3VwJywndGFibGUtcm93JywndGFibGUtcm93LWdyb3VwJ119LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J2lubGluZS10YWJsZSd9LGJyb3dzZXI6e2ZpcmVmb3g6e3VwdG86Mn19LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnaW5saW5lLXRhYmxlXFwnLid9fX0sZG9taW5hbnRCYXNlbGluZTp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYWxwaGFiZXRpYycsJ2F1dG8nLCdjZW50cmFsJywnaGFuZ2luZycsJ2lkZW9ncmFwaGljJywnbWF0aGVtYXRpY2FsJywnbWlkZGxlJywnbm8tY2hhbmdlJywncmVzZXQtc2l6ZScsJ3RleHQtYWZ0ZXItZWRnZScsJ3RleHQtYmVmb3JlLWVkZ2UnLCd1c2Utc2NyaXB0J119fSxlbXB0eUNlbGxzOnt2YWx1ZTp7aW5pdGlhbDonc2hvdycsa2V5d29yZHM6WydoaWRlJywnc2hvdyddfX0sZW5hYmxlQmFja2dyb3VuZDp7dmFsdWU6e2luaXRpYWw6J2FjY3VtdWx1YXRlJyxrZXl3b3JkczpbJ2FjY3VtdWxhdGUnXX19LGZpbGw6e3ZhbHVlOntjb2xvcjp0cnVlLGluaXRpYWw6J2JsYWNrJ319LGZpbGxPcGFjaXR5Ont2YWx1ZTp7aW5pdGlhbDoxLHJhbmdlOlswLDFdfX0sZmlsbFJ1bGU6e3ZhbHVlOntpbml0aWFsOidub256ZXJvJyxrZXl3b3JkczpbJ2V2ZW5vZGQnLCdub256ZXJvJ119fSxmaWx0ZXI6e3ZhbHVlOntpbml0aWFsOidub25lJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZToxOCxmaXJlZm94OjM1LGlvc19zYWY6NixvcGVyYToxNSxzYWZhcmk6Nn0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6NC4yLGNocm9tZToxNyxlZGdlOjEyLGZpcmVmb3g6My41LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjUuMX0saXNzdWVzOlt7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9edXJsXFwoLyk9PT1udWxsfSxicm93c2VyOntmaXJlZm94OnsgLy8gY2hlY2sgdGhhdCBhZ2FpblxudXB0bzozM319LGhpbnQ6J29ubHkgc3VwcG9ydHMgXFwndXJsKClcXCcuJ30se2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvXnVybFxcKC8pIT09bnVsbH0sYnJvd3Nlcjp7ZWRnZTp7ZnJvbToxMyx0bzoxNH19LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwndXJsKClcXCcuJ31dfX0sZmxleDp7dmFsdWU6e2luaXRpYWw6JzAgMSBhdXRvJyxrZXl3b3JkczpbJ2F1dG8nXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQuNCxjaHJvbWU6MjEsZWRnZToxMixmaXJlZm94OjI4LGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjYuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMixzYWZhcmk6MH19fSxmbGV4QmFzaXM6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdjb250ZW50JywnZmlsbCcsJ2ZpdC1jb250ZW50JywnbWF4LWNvbnRlbnQnLCdtaW4tY29udGVudCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQuNCxjaHJvbWU6MjEsZWRnZToxMixmaXJlZm94OjI4LGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjYuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMixzYWZhcmk6MH19fSxmbGV4RGlyZWN0aW9uOnt2YWx1ZTp7aW5pdGlhbDoncm93JyxrZXl3b3JkczpbJ2NvbHVtbicsJ2NvbHVtbi1yZXZlcnNlJywncm93Jywncm93LXJldmVyc2UnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQuNCxjaHJvbWU6MjEsZWRnZToxMixmaXJlZm94OjI4LGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjYuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMixzYWZhcmk6MH19fSwgLy8gVE9ETzogY29tcGxldGVcbmZsZXhGbG93Ontjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LGZsZXhHcm93Ont2YWx1ZTp7ZmxvYXQ6dHJ1ZSxpbml0aWFsOjAscG9zaXRpdmU6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQuNCxjaHJvbWU6MjEsZWRnZToxMixmaXJlZm94OjI4LGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjYuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMixzYWZhcmk6MH19fSxmbGV4U2hyaW5rOnt2YWx1ZTp7ZmxvYXQ6dHJ1ZSxpbml0aWFsOjEscG9zaXRpdmU6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQuNCxjaHJvbWU6MjEsZWRnZToxMixmaXJlZm94OjI4LGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjYuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMixzYWZhcmk6MH19fSxmbGV4V3JhcDp7dmFsdWU6e2luaXRpYWw6J25vd3JhcCcsa2V5d29yZHM6Wydub3dyYXAnLCd3cmFwJywnd3JhcC1yZXZlcnNlJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kcm9pZDo0LjQsY2hyb21lOjIxLGVkZ2U6MTIsZmlyZWZveDoyOCxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTo2LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTIsc2FmYXJpOjB9fX0sZmxvYXQ6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2xlZnQnLCdyaWdodCcsJ25vbmUnXX19LGZsb29kQ29sb3I6e3ZhbHVlOntjb2xvcjp0cnVlLGluaXRpYWw6J2JsYWNrJ319LGZsb29kT3BhY2l0eTp7dmFsdWU6e3JhbmdlOlswLDFdLGluaXRpYWw6MX19LGZsb3dJbnRvOntjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfdWM6OS45LGlvc19zYWY6NyxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91YzowLGFuZHJvaWQ6NDYsY2hyb21lOjUwLGVkZ2U6MCxmaXJlZm94OjQ2LGllOjksaWVfbW9iOjAsaW9zX3NhZjo2LG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6Nn19fSxmbG93RnJvbTp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX3VjOjkuOSxpb3Nfc2FmOjcsc2FmYXJpOjYuMX0scGFydGlhbDp7YW5kX2Nocjo0NyxhbmRfdWM6MCxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjAsZmlyZWZveDo0NixpZTo5LGllX21vYjowLGlvc19zYWY6NixvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjZ9fX0sZm9udDp7dmFsdWU6eyAvLyBjYW4gYWxzbyBiZSB1c2VkIHRvIHNwZWNpZnkgc3lzdGVtZm9udHNcbi8vIHRoZXJlZm9yZSBpcyBub3Qgb25seSBhIHNob3J0aGFuZCBwcm9wZXJ0eVxuaW5pdGlhbDonbm9ybWFsJ30sbG9uZ2hhbmRzOlsnZm9udEZhbWlseScsJ2ZvbnRLZXJuaW5nJywnZm9udFNpemUnLCdmb250U3RyZXRjaCcsJ2ZvbnRTdHlsZScsJ2ZvbnRWYXJpYW50JywnZm9udFdlaWdodCcsJ2xpbmVIZWlnaHQnXX0sIC8vIFRPRE86IGNvbXBsZXRlXG5mb250S2VybmluZzp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZToyOSxmaXJlZm94OjM0LGlvc19zYWY6OCxvcGVyYToxNixzYWZhcmk6N30scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6NC4yLGNocm9tZToyOCxlZGdlOjE0LGZpcmVmb3g6MzMsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTUsc2FmYXJpOjYuMX19fSxmb250RmFtaWx5Ont2YWx1ZTp7aW5pdGlhbDonaW5oZXJpdCcsa2V5d29yZHM6WydjdXJzaXZlJywnZmFudGFzeScsJ21vbm9zcGFjZScsJ3NhbnMtc2VyaWYnLCdzZXJpZiddfX0sZm9udEZlYXR1cmVTZXR0aW5nczp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCd9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MjEsZWRnZToxMixmaXJlZm94OjE1LGllOjEwLGlvc19zYWY6OS4zLG9wZXJhOjE1LHNhZmFyaTo5LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjQuMixjaHJvbWU6MTUsZWRnZTowLGZpcmVmb3g6My42LGllOjksaWVfbW9iOjExLGlvc19zYWY6OSxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6OX0saXNzdWVzOlt7IC8vIGludmVzdGlnYXRlIG9uIHRoaXMgb25lIGZ1cnRoZXIgdG8gZGV0ZXJtaW5lXG4vLyBob3cgZXhhY3RseSB0aGUgb2xkZXIgc3ludGF4IGxvb2tlZCBsaWtlXG5icm93c2VyOntmaXJlZm94Ont1cHRvOjE0fX0saGludDondXNlcyBhIHNsaWdodGx5IGRpZmZlcmVudCBzeW50YXguJ30se2Jyb3dzZXI6e2Nocm9tZTp7dXB0bzoyMH19LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgTWFjcy4nfV19fSxmb250U2l6ZTp7dmFsdWU6e2luaXRpYWw6J21lZGl1bScsa2V5d29yZHM6WydsYXJnZScsJ2xhcmdlcicsJ21lZGl1bScsJ3NtYWxsJywnc21hbGxlcicsJ3gtbGFyZ2UnLCd4LXNtYWxsJywneHgtbGFyZ2UnLCd4eC1zbWFsbCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LGZvbnRTbW9vdGg6e3ZhbHVlOntpbml0aWFsOidhdXRvJ30sY29tcGF0aWJpbGl0eTp7aXNzdWVzOlt7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSxzdHlsZXMpe3JldHVybiAhc3R5bGVzLldlYmtpdEZvbnRTbW9vdGhpbmd8fHN0eWxlcy5XZWJraXRGb250U21vb3RoaW5nLm1hdGNoKC9eKG5vbmV8YW50aWFsaWFzZWR8c3VicGl4ZWwtYW50aWFsaWFzZWQpJC8pPT09bnVsbH0sYnJvd3Nlcjp7c2FmYXJpOnRydWUsY2hyb21lOnRydWUsb3BlcmE6dHJ1ZX0saGludDonbWlnaHQgbm90IHN1cHBvcnQgXFwnZm9udFNtb290aFxcJywgdXNlIFxcJ1dlYmtpdEZvbnRTbW9vdGhpbmdcXCcgd2l0aCBlaXRoZXIgXFwnbm9uZVxcJywgXFwnYW50aWFsaWFzZWRcXCcgb3IgXFwnc3VicGl4ZWwtYW50aWFsaWFzZWRcXCcuJ30se2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUsc3R5bGVzKXtyZXR1cm4gIXN0eWxlcy5Nb3pPc3hGb250U21vb3RoaW5nfHxzdHlsZXMuTW96T3N4Rm9udFNtb290aGluZy5tYXRjaCgvXihhdXRvfGluaGVyaXR8dW5zZXR8Z3JheXNjYWxlKSQvKT09PW51bGx9LGJyb3dzZXI6e2ZpcmVmb3g6dHJ1ZX0saGludDonbWlnaHQgbm90IHN1cHBvcnQgXFwnZm9udFNtb290aFxcJywgdXNlIFxcJ01vek9zeEZvbnRTbW9vdGhpbmdcXCcgd2l0aCBlaXRoZXIgXFwnYXV0b1xcJywgXFwnaW5oZXJpdFxcJywgXFwndW5zZXRcXCcgb3IgXFwnZ3JheXNjYWxlXFwnLid9LHsgLy8gZ2VuZXJhbFxuaGludDonT25seSBzdXBwb3J0ZWQgb24gTWFjcy4nfV19fSxmb250U3RyZXRjaDp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6Wydjb25kZW5zZWQnLCdleHBhbmRlZCcsJ2V4dHJhLWNvbmRlbnNlZCcsJ2V4dHJhLWV4cGFuZGVkJywnbm9ybWFsJywnc2VtaS1jb25kZW5zZWQnLCdzZW1pLWV4cGFuZGVkJywndWx0cmEtY29uZGVuc2VkJywndWx0cmEtZXhwYW5kZWQnXX19LGZvbnRTdHlsZTp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6WydpdGFsaWMnLCdub3JtYWwnLCdvYmxpcXVlJ119fSxmb250U3ludGhlc2lzOnt2YWx1ZTp7aW5pdGlhbDond2VpZ2h0IHN0eWxlJyxrZXl3b3JkczpbJ25vbmUnLCdzdHlsZScsJ3dlaWdodCcsJ3dlaWdodCBzdHlsZSddfX0sZm9udFZhcmlhbnQ6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnbm9ybWFsJywnc21hbGwtY2FwcyddfSxsb25naGFuZHM6Wydmb250VmFyaWFudENhcHMnLCdmb250VmFyaWFudE51bWVyaWMnLCdmb250VmFyaWFudEFsdGVybmF0ZXMnLCdmb250VmFyaWFudExpZ2F0dXJlcycsJ2ZvbnRWYXJpYW50RWFzdEFzaWFuJ119LGZvbnRWYXJpYW50Q2Fwczp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6Wydub3JtYWwnLCdzbWFsbC1jYXBzJywnYWxsLXNtYWxsLWNhcHMnLCdwZXRpdGUtY2FwcycsJ2FsbC1wZXRpdGUtY2FwcycsJ3VuaWNhc2UnLCd0aXRsaW5nLWNhcHMnXX19LGZvbnRWYXJpYW50TnVtZXJpYzp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsIC8vIHByb3BlciByZXNlYXJjaCBvbiBrZXl3b3Jkc1xua2V5d29yZHM6Wydub3JtYWwnXX19LGZvbnRWYXJpYW50QWx0ZXJuYXRlczp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsIC8vIHByb3BlciByZXNlYXJjaCBvbiBrZXl3b3Jkc1xua2V5d29yZHM6Wydub3JtYWwnXX19LGZvbnRWYXJpYW50TGlnYXR1cmVzOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJywgLy8gcHJvcGVyIHJlc2VhcmNoIG9uIGtleXdvcmRzXG5rZXl3b3JkczpbJ25vcm1hbCddfX0sZm9udFZhcmlhbnRFYXN0QXNpYW46e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLCAvLyBwcm9wZXIgcmVzZWFyY2ggb24ga2V5d29yZHNcbmtleXdvcmRzOlsnbm9ybWFsJ119fSxmb250VmFyaWFudFBvc2l0aW9uOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ25vcm1hbCcsJ3N1YicsJ3N1cGVyJ119fSxmb250V2VpZ2h0Ont2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbMTAwLDIwMCwzMDAsNDAwLDUwMCw2MDAsNzAwLDgwMCw5MDAsJ2JvbGQnLCdib2xkZXInLCdsaWdodGVyJywnbm9ybWFsJ119fSxnbHlwaE9yaWVudGF0aW9uSG9yaXpvbnRhbDp7dmFsdWU6e2luaXRpYWw6JzBkZWcnLGtleXdvcmRzOlsnMGRlZycsJzkwZGVnJywnMTgwZGVnJywnMjcwZGVnJ119fSxnbHlwaE9yaWVudGF0aW9uVmVydGljYWw6e3ZhbHVlOntpbml0aWFsOicwZGVnJyxrZXl3b3JkczpbJ2F1dG8nLCcwZGVnJywnOTBkZWcnLCcxODBkZWcnLCcyNzBkZWcnXX19LGdyaWQ6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxncmlkQXJlYTp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRBdXRvQ29sdW1uczp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRBdXRvRmxvdzp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRBdXRvUm93czp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRDb2x1bW46e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxncmlkQ29sdW1uU3RhcnQ6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxncmlkQ29sdW1uRW5kOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0sZ3JpZENvbHVtbkdhcDp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRHYXA6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxncmlkUm93Ontjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0sZ3JpZFJvd0VuZDp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRSb3dTdGFydDp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRSb3dHYXA6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxncmlkVGVtcGxhdGU6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxncmlkVGVtcGxhdGVBcmVhczp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRUZW1wbGF0ZUNvbHVtbnM6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxncmlkVGVtcGxhdGVSb3dzOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0saGFuZ2luZ1B1bmN0dWF0aW9uOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydhbGxvdy1lbmQnLCdmaXJzdCcsJ2ZvcmNlLWVuZCcsJ2xhc3QnLCdub25lJ119fSxoZWlnaHQ6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdhdmFpbGFibGUnLCdmaXQtY29udGVudCcsJ21heC1jb250ZW50JywnbWluLWNvbnRlbnQnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxoeXBoZW5zOnt2YWx1ZTp7aW5pdGlhbDonbm9uZSd9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2VkZ2U6MTIsZmlyZWZveDo2LGllOjEwLGlvc19zYWY6NC4yLHNhZmFyaTo1LjF9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjAsYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZTowLGZpcmVmb3g6NSxpZTo5LGllX21vYjoxMSxpb3Nfc2FmOjQsb3BfbWluaTo1LG9wZXJhOjM2LHNhZmFyaTo1fSxpc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZT09PSdhdXRvJ30sYnJvd3Nlcjp7Y2hyb21lOnRydWUsYW5kcm9pZDo0LjB9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnYXV0b1xcJy4nfX19LGltYWdlT3JpZW50YXRpb246e3ZhbHVlOntpbml0aWFsOicwZGVnJ30sY29tcGF0aWJpbGl0eTp7aXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL1stXVswLTldezEsM31kZWcvKSE9PW51bGx9LGJyb3dzZXI6e2ZpcmVmb3g6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBuZWdhdGl2ZSB2YWx1ZXMuJ319fSxpbWFnZVJlbmRlcmluZzp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0bycsJ2NyaXNwLWVkZ2VzJywncGl4ZWxhdGVkJ119fSxpc29sYXRpb246e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdpc29sYXRlJ119fSxqdXN0aWZ5Q29udGVudDp7dmFsdWU6e2luaXRpYWw6J2ZsZXgtc3RhcnQnLGtleXdvcmRzOlsnY2VudGVyJywnZmxleC1lbmQnLCdmbGV4LXN0YXJ0Jywnc3BhY2UtYXJvdW5kJywnc3BhY2UtYmV0d2VlbiddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LGp1c3RpZnlJdGVtczp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0bycsJ3N0cmV0Y2gnXX19LGp1c3RpZnlTZWxmOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnc3RyZXRjaCddfX0sa2VybmluZzp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0bycsJ25vbmUnLCdub3JtYWwnXX19LGxlZnQ6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxsZXR0ZXJTcGFjaW5nOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ25vcm1hbCddLGxlbmd0aDp0cnVlfX0sbGlnaHRpbmdDb2xvcjp7dmFsdWU6e2luaXRpYWw6J3doaXRlJyxjb2xvcjp0cnVlfX0sbGluZUhlaWdodDp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsZmxvYXQ6dHJ1ZSxrZXl3b3JkczpbJ25vcm1hbCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZSxwb3NpdGl2ZTp0cnVlfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvY2FsY1xcKC8pIT09bnVsbH0sYnJvd3Nlcjp7ZmlyZWZveDp0cnVlfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2NhbGMoKVxcJy4nfX19LGxpc3RTdHlsZUltYWdlOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6Wydub25lJ10sdXJsOnRydWV9fSxsaXN0U3R5bGVQb3NpdGlvbjp7dmFsdWU6e2luaXRpYWw6J291dHNpZGUnLGtleXdvcmRzOlsnaW5zaWRlJywnb3V0c2lkZSddfX0sbGlzdFN0eWxlVHlwZTp7dmFsdWU6e2luaXRpYWw6J2Rpc2MnLGtleXdvcmRzOlsnYXJhYmljLWluZGljJywnYXJtZW5pYW4nLCdiZW5nYWxpJywnY2FtYm9kaWFuJywnY2lyY2xlJywnY2prLWRlY2ltYWwnLCdjamstZWFydGhseS1icmFuY2gnLCdjamstaGVhdmVubHktc3RlbScsJ2Nqay1pZGVvZ3JhcGhpYycsJ2RlY2ltYWwnLCdkZWNpbWFsLWxlYWRpbmctemVybycsJ2RldmFuYWdhcmknLCdkaXNjJywnZGlzY2xvc3VyZS1jbG9zZWQnLCdkaXNjbG9zdXJlLW9wZW4nLCdldGhpb3BpYy1udW1lcmljJywnZ3JlZ29yaWFuJywnZ3VqYXJhdGknLCdndXJtdWtoaScsJ2hlYnJldycsJ2hpcmFnYW5hJywnaGlyYWdhbmEtaXJvaGEnLCdqYXBhbmVzZS1mb3JtYWwnLCdqYXBhbmVzZS1pbmZvcm1hbCcsJ2thbm5hZGEnLCdrYXRha2FuYScsJ2thdGFrYW5hLWlyb2hhJywna2htZXInLCdrb2VyYW4taGFuamEtaW5mb3JtYWwnLCdrb3JlYW4taGFuZ3VsLWZvcm1hbCcsJ2tvcmVhbi1oYW5qYS1mb3JtYWwnLCdsYW8nLCdsb3dlci1hbHBoYScsJ2xvd2VyLWFybWVuaWFuJywnbG93ZXItZ3JlZWsnLCdsb3dlci1sYXRpbicsJ2xvd2VyLXJvbWFuJywnbWFsYXlhbGFtJywnbW9uZ29saWFuJywnbXlhbm1hcicsJ25vbmUnLCdvcml5YScsJ3BlcnNpYW4nLCdzaW1wLWNoaW5lc2UtZm9ybWFsJywnc2ltcC1jaGluZXNlLWluZm9ybWFsJywnc3F1YXJlJywndGFtaWwnLCd0ZWx1Z3UnLCd0aGFpJywndGliZXRhbicsJ3RyYWQtY2hpbmVzZS1mb3JtYWwnLCd0cmFkLWNoaW5lc2UtaW5mb3JtYWwnLCd1cHBlci1hbHBoYScsJ3VwcGVyLWFybWVuaWFuJywndXBwZXItbGF0aW4nLCd1cHBlci1yb21hbiddLHN0cmluZzp0cnVlfX0sbGlzdFN0eWxlOnt2YWx1ZTp7aW5pdGlhbDonZGlzYyBvdXRzaWRlIG5vbmUnLGtleXdvcmRzOlsnbm9uZSddfSxsb25naGFuZHM6WydsaXN0U3R5bGVUeXBlJywnbGlzdFN0eWxlUG9zaXRpb24nLCdsaXN0U3R5bGVJbWFnZSddfSxtYXJnaW46e3ZhbHVlOntpbml0aWFsOjB9LGxvbmdoYW5kczpbJ21hcmdpblRvcCcsJ21hcmdpblJpZ2h0JywnbWFyZ2luQm90dG9tJywnbWFyZ2luTGVmdCddfSxtYXJnaW5Cb3R0b206e3ZhbHVlOntpbml0aWFsOjAsa2V5d29yZHM6WydhdXRvJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sbWFyZ2luTGVmdDp7dmFsdWU6e2luaXRpYWw6MCxrZXl3b3JkczpbJ2F1dG8nXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxtYXJnaW5SaWdodDp7dmFsdWU6e2luaXRpYWw6MCxrZXl3b3JkczpbJ2F1dG8nXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxtYXJnaW5Ub3A6e3ZhbHVlOntpbml0aWFsOjAsa2V5d29yZHM6WydhdXRvJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sbWFzazp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnbm9uZSddLHVybDp0cnVlfSxsb25naGFuZHM6WydtYXNrT3JpZ2luJywnbWFza0NsaXAnLCdtYXNrQm9yZGVyJ10sY29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza0JvcmRlcjp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza0JvcmRlck1vZGU6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZToxNCxmaXJlZm94OjMsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6My4yfX19LG1hc2tCb3JkZXJPdXRzZXQ6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZToxNCxmaXJlZm94OjMsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6My4yfX19LG1hc2tCb3JkZXJSZXBlYXQ6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZToxNCxmaXJlZm94OjMsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6My4yfX19LG1hc2tCb3JkZXJTbGljZTp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza0JvcmRlclNvdXJjZTp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza0JvcmRlcldpZHRoOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrQ2xpcDp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza0NvbXBvc2l0ZTp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza0ltYWdlOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrTW9kZTp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza09yaWdpbjp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza1Bvc2l0aW9uOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrUmVwZWF0Ontjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrU2l6ZTp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza1R5cGU6e3ZhbHVlOntpbml0aWFsOidsdW1pbmFuY2UnLGtleXdvcmRzOlsnYWxwaGEnLCdsdW1pbmFuY2UnXX0sY29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWF4SGVpZ2h0Ont2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydmaWxsLWF2YWlsYWJsZScsJ2ZpdC1jb250ZW50JywnbWF4LWNvbnRlbnQnLCdtaW4tY29udGVudCcsJ25vbmUnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J2luaGVyaXQnfSxicm93c2VyOntpZTo3fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2luaGVyaXRcXCcuJ319fSxtYXhXaWR0aDp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnZmlsbC1hdmFpbGFibGUnLCdmaXQtY29udGVudCcsJ21heC1jb250ZW50JywnbWluLWNvbnRlbnQnLCdub25lJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6W3tjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0naW5oZXJpdCd9LGJyb3dzZXI6e2llOjd9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnaW5oZXJpdFxcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J2luaGVyaXQnfSxicm93c2VyOntpZTp7ZnJvbToxMCx0bzoxMX19LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnaW5oZXJpdFxcJy4nfV19fSxtaW5IZWlnaHQ6e3ZhbHVlOntpbml0aWFsOjAsa2V5d29yZHM6WydmaWxsLWF2YWlsYWJsZScsJ2ZpdC1jb250ZW50JywnbWF4LWNvbnRlbnQnLCdtaW4tY29udGVudCcsJ25vbmUnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczpbe2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZT09PSdpbmhlcml0J30sYnJvd3Nlcjp7aWU6N30saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdpbmhlcml0XFwnLid9LHsgLy8gZ2VuZXJhbFxuLy8gaW52ZXN0aWdhdGUgbGF0ZXJcbmJyb3dzZXI6e2ZpcmVmb3g6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdpbmhlcml0XFwnIG9uIHRhYmxlIGVsZW1lbnRzLid9LHtjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlLHN0eWxlcyl7cmV0dXJuIHN0eWxlcy5kaXNwbGF5PT09J3RhYmxlJ30sYnJvd3Nlcjp7ZmlyZWZveDp0cnVlfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2luaGVyaXRcXCcgY29tYmluZWQgd2l0aCBcXCdkaXNwbGF5OnRhYmxlXFwnLid9XX19LG1pbldpZHRoOnt2YWx1ZTp7aW5pdGlhbDowLGtleXdvcmRzOlsnZmlsbC1hdmFpbGFibGUnLCdmaXQtY29udGVudCcsJ21heC1jb250ZW50JywnbWluLWNvbnRlbnQnLCdub25lJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6W3tjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0naW5oZXJpdCd9LGJyb3dzZXI6e2llOjd9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnaW5oZXJpdFxcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J2luaGVyaXQnfSxicm93c2VyOntpZTp7ZnJvbToxMCx0bzoxMX19LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnaW5oZXJpdFxcJy4nfSx7IC8vIGdlbmVyYWxcbi8vIGludmVzdGlnYXRlIGxhdGVyXG5icm93c2VyOntpb3Nfc2FmOjUuMX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdpbmhlcml0XFwnIG9uIHRhYmxlIGVsZW1lbnRzLid9LHsgLy8gZ2VuZXJhbFxuLy8gaW52ZXN0aWdhdGUgbGF0ZXJcbmJyb3dzZXI6e2llOnRydWV9LGhpbnQ6J2lzIG5vdCBzdXBwb3J0IG9uIGlucHV0IGVsZW1lbnRzIHdpdGggdHlwZSBcXCdidXR0b25cXCcsIFxcJ3N1Ym1pdFxcJyBhbmQgXFwncmVzZXRcXCcuJ31dfX0sbWl4QmxlbmRNb2RlOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ2NvbG9yJywnY29sb3ItYnVybicsJ2NvbG9yLWRvZGdlJywnZGFya2VuJywnZGlmZmVyZW5jZScsJ2V4Y2x1c2lvbicsJ2hhcmQtbGlnaHQnLCdodWUnLCdsaWdodGVuJywnbHVtaW5vc2l0eScsJ211bHRpcGx5Jywnbm9ybWFsJywnb3ZlcmxheScsJ3NhdHVyYXRpb24nLCdzY3JlZW4nLCdzb2Z0LWxpZ2h0J119fSxvYmplY3RGaXQ6e3ZhbHVlOntpbml0aWFsOidmaWxsJyxrZXl3b3JkczpbJ2NvbnRhaW4nLCdjb3ZlcicsJ2ZpbGwnLCdub25lJywnc2NhbGUtZG93biddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZTozMSxmaXJlZm94OjM2LG9wX21pbmk6NSxvcGVyYToxMC42fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MzAsZWRnZToxNCxmaXJlZm94OjM1LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTowLG9wZXJhOjE4LHNhZmFyaTo3fX19LG9iamVjdFBvc2l0aW9uOnt2YWx1ZTp7aW5pdGlhbDonNTAlIDUwJSd9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kcm9pZDo0LjQsY2hyb21lOjMxLGZpcmVmb3g6MzYsb3BfbWluaTo1LG9wZXJhOjEwLjZ9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZTozMCxlZGdlOjE0LGZpcmVmb3g6MzUsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjAsb3BlcmE6MTgsc2FmYXJpOjd9LGlzc3Vlczp7YnJvd3Nlcjp7c2FmYXJpOnt1cHRvOjl9LGlvc19zYWY6e3VwdG86OS4yfX0saGludDonaXMgbm90IHN1cHBvcnRlZC4nfX19LG9wYWNpdHk6e3ZhbHVlOntpbml0aWFsOicxJyxyYW5nZTpbMCwxXX19LG9yZGVyOnt2YWx1ZTp7aW5pdGlhbDonMCcsaW50ZWdlcjp0cnVlLG5lZ2F0aXZlOnRydWUscG9zaXRpdmU6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQuNCxjaHJvbWU6MjEsZWRnZToxMixmaXJlZm94OjI4LGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjYuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMixzYWZhcmk6MH19fSxvcnBoYW5zOnt2YWx1ZTp7aW5pdGlhbDowLGludGVnZXI6dHJ1ZSxwb3NpdGl2ZTp0cnVlLG5vdE51bGw6dHJ1ZX19LG91dGxpbmU6e3ZhbHVlOntpbml0aWFsOjB9LGxvbmdoYW5kczpbJ291dGxpbmVXaWR0aCcsJ291dGxpbmVTdHlsZScsJ291dGxpbmVDb2xvciddfSxvdXRsaW5lQ29sb3I6e3ZhbHVlOntjb2xvcjp0cnVlLGluaXRpYWw6J2ludmVydCcsa2V5d29yZHM6WydpbnZlcnQnXX19LG91dGxpbmVPZmZzZXQ6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWV9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7YnJvd3Nlcjp7aWU6e3VwdG86MTB9fSxoaW50OidpcyBub3Qgc3VwcG9ydGVkLid9fX0sb3V0bGluZVN0eWxlOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydkYXNoZWQnLCdkb3R0ZWQnLCdkb3VibGUnLCdncm9vdmUnLCdoaWRkZW4nLCdpbnNldCcsJ25vbmUnLCdvdXRzZXQnLCdyaWRnZScsJ3NvbGlkJ119fSxvdXRsaW5lV2lkdGg6e3ZhbHVlOntpbml0aWFsOidtZWRpdW0nLGtleXdvcmRzOlsnbWVkaXVtJywndGhpY2snLCd0aGluJ10sbGVuZ3RoOnRydWV9fSxvdmVyZmxvdzp7dmFsdWU6e2luaXRpYWw6J3Zpc2libGUnLGtleXdvcmRzOlsnYXV0bycsJ2hpZGRlbicsJ3Njcm9sbCcsJ3Zpc2libGUnXX19LG92ZXJmbG93V3JhcDp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6WydicmVhay13b3JkJywnbm9ybWFsJ119LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSxzdHlsZXMpe3JldHVybiAhc3R5bGVzLndvcmRXcmFwfSxicm93c2VyOntjaHJvbWU6e3VwdG86MjJ9LHNhZmFyaTp7dXB0bzo2fSxvcGVyYTp7dXB0bzoxMS41fSxhbmRyb2lkOnt1cHRvOjQuM30saW9zX3NhZjp7dXB0bzo2LjF9LGllOnRydWUsZmlyZWZveDp0cnVlLG9wX21pbmk6dHJ1ZSxpZV9tb2I6dHJ1ZSxhbmRfdWM6dHJ1ZX0saGludDonbWlnaHQgbm90IGJlIHN1cHBvcnRlZCwgdXNlIFxcJ3dvcmRXcmFwXFwnIGFzIHdlbGwuJ319fSxvdmVyZmxvd1g6e3ZhbHVlOntpbml0aWFsOid2aXNpYmxlJyxrZXl3b3JkczpbJ2F1dG8nLCdoaWRkZW4nLCdzY3JvbGwnLCd2aXNpYmxlJ119fSxvdmVyZmxvd1k6e3ZhbHVlOntpbml0aWFsOid2aXNpYmxlJyxrZXl3b3JkczpbJ2F1dG8nLCdoaWRkZW4nLCdzY3JvbGwnLCd2aXNpYmxlJ119fSxwYWRkaW5nOnt2YWx1ZTp7aW5pdGlhbDowLGxvbmdoYW5kczpbJ3BhZGRpbmdCb3R0b20nLCdwYWRkaW5nTGVmdCcsJ3BhZGRpbmdSaWdodCcsJ3BhZGRpbmdUb3AnXX19LHBhZGRpbmdCb3R0b206e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0scGFkZGluZ0xlZnQ6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0scGFkZGluZ1JpZ2h0Ont2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LHBhZGRpbmdUb3A6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0scGFnZUJyZWFrQWZ0ZXI6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2Fsd2F5cycsJ2F1dG8nLCdhdm9pZCcsJ2xlZnQnLCdyaWdodCddfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6eyAvLyBub3QgZm9yIG9wZXJhIVxuLy8gVE9ETzogY29tcGxldGUgYnJvd3NlciByZXF1ZXN0c1xuY29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J2F2b2lkJ30saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdhdm9pZFxcJy4nfX19LHBhZ2VCcmVha0JlZm9yZTp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYWx3YXlzJywnYXV0bycsJ2F2b2lkJywnbGVmdCcsJ3JpZ2h0J119LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7IC8vIG5vdCBmb3Igb3BlcmEhXG4vLyBUT0RPOiBjb21wbGV0ZSBicm93c2VyIHJlcXVlc3RzXG5jb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0nYXZvaWQnfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2F2b2lkXFwnLid9fX0scGFnZUJyZWFrSW5zaWRlOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnYXZvaWQnXX19LHBhaW50T3JkZXI6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnZmlsbCcsJ21hcmtlcnMnLCdub3JtYWwnLCdzdHJva2UnXX19LHBlcnNwZWN0aXZlOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6Wydub25lJ10sbGVuZ3RoOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjMsY2hyb21lOjEyLGVkZ2U6MTIsZmlyZWZveDoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6Mi4zLGNocm9tZToxMSxlZGdlOjAsZmlyZWZveDo5LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0scGVyc3BlY3RpdmVPcmlnaW46e3ZhbHVlOntpbml0aWFsOic1MCUgNTAlJ30sbG9uZ2hhbmRzOlsncGVyc3BlY3RpdmVPcmlnaW5YJywncGVyc3BlY3RpdmVPcmlnaW5ZJ10sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6MyxjaHJvbWU6MTIsZWRnZToxMixmaXJlZm94OjEwLGlvc19zYWY6My4yLG9wZXJhOjE1LHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDoyLjMsY2hyb21lOjExLGVkZ2U6MCxmaXJlZm94OjksaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxwZXJzcGVjdGl2ZU9yaWdpblg6e3ZhbHVlOntpbml0aWFsOic1MCUnLGtleXdvcmRzOlsnY2VudGVyJywnbGVmdCcsJ3JpZ2h0J10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDozLGNocm9tZToxMixlZGdlOjEyLGZpcmVmb3g6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTUsc2FmYXJpOjR9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjIuMyxjaHJvbWU6MTEsZWRnZTowLGZpcmVmb3g6OSxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6My4yfX19LHBlcnNwZWN0aXZlT3JpZ2luWTp7dmFsdWU6e2luaXRpYWw6JzUwJScsa2V5d29yZHM6WydjZW50ZXInLCdsZWZ0JywncmlnaHQnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjMsY2hyb21lOjEyLGVkZ2U6MTIsZmlyZWZveDoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6Mi4zLGNocm9tZToxMSxlZGdlOjAsZmlyZWZveDo5LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0scG9pbnRlckV2ZW50czp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYWxsJywnYXV0bycsJ2ZpbGwnLCdub25lJywncGFpbnRlZCcsJ3N0cm9rZScsJ3Zpc2libGUnLCd2aXNpYmxlRmlsbCcsJ3Zpc2libGVQYWludGVkJywndmlzaWJsZVN0cm9rZSddfX0scG9zaXRpb246e3ZhbHVlOntpbml0aWFsOidzdGF0aWMnLGtleXdvcmRzOlsnYWJzb2x1dGUnLCdmaXhlZCcsJ3JlbGF0aXZlJywnc3RhdGljJywnc3RpY2t5J119LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7IC8vIGdlbmVyYWxcbmNvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZT09PSdzdGlja3knfSxicm93c2VyOntpb3Nfc2FmOnt1cHRvOjd9fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ3N0aWNreVxcJy4nfX19LHF1b3Rlczp7dmFsdWU6e2tleXdvcmRzOlsnbm9uZSddfX0scjp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZX19LHJlZ2lvbkZyYWdtZW50Ontjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfdWM6OS45LGlvc19zYWY6NyxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91YzowLGFuZHJvaWQ6NDYsY2hyb21lOjUwLGVkZ2U6MCxmaXJlZm94OjQ2LGllOjksaWVfbW9iOjAsaW9zX3NhZjo2LG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6Nn19fSxyZXNpemU6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2Jsb2NrJywnYm90aCcsJ2hvcml6b250YWwnLCdpbmxpbmUnLCdub25lJywndmVydGljYWwnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQ2LGNocm9tZTo0LGZpcmVmb3g6NCxvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjAsZWRnZToxNCxmaXJlZm94OjMuNixpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo5LjMsb3BfbWluaTo1LG9wZXJhOjEyLHNhZmFyaTozLjJ9LGlzc3Vlczp7IC8vIGdlbmVyYWxcbmJyb3dzZXI6e29wZXJhOnt1cHRvOjEyLjF9fSxoaW50OidpcyBvbmx5IHN1cHBvcnRlZCBvbiBcXCc8dGV4dGFyZWE+XFwnLid9fX0scm93R2FwOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0scmlnaHQ6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxyeDp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZX19LHJ5Ont2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlfX0sc2Nyb2xsU25hcENvb3JkaW5hdGU6e3ZhbHVlOntpbml0aWFsOidub25lJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZmlyZWZveDozOSxpb3Nfc2FmOjl9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjAsZmlyZWZveDozOCxpZTo5LGllX21vYjoxMSxpb3Nfc2FmOjguMSxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjh9LGlzc3Vlczpbe2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZT09PSdub25lJ30sYnJvd3Nlcjp7c2FmYXJpOjl9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnbm9uZVxcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC90b3B8bGVmdHxyaWdodHxib3R0b20vKSE9PW51bGx9LGJyb3dzZXI6e3NhZmFyaTo5fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IGxlbmd0aCBrZXl3b3JkcyBcXCd0b3BcXCcsIFxcJ3JpZ2h0XFwnLCBcXCdsZWZ0XFwnIGFuZCBcXCdib3R0b21cXCcuJ31dfX0sc2Nyb2xsU25hcERlc3RpbmF0aW9uOnt2YWx1ZTp7aW5pdGlhbDonMHB4IDBweCd9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2ZpcmVmb3g6MzksaW9zX3NhZjo5fSxwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZTowLGZpcmVmb3g6MzgsaWU6OSxpZV9tb2I6MTEsaW9zX3NhZjo4LjEsb3BfbWluaTo1LG9wZXJhOjM2LHNhZmFyaTo4fSxpc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvdG9wfGxlZnR8cmlnaHR8Ym90dG9tLykhPT1udWxsfSxicm93c2VyOntzYWZhcmk6OX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBsZW5ndGgga2V5d29yZHMgXFwndG9wXFwnLCBcXCdyaWdodFxcJywgXFwnbGVmdFxcJyBhbmQgXFwnYm90dG9tXFwnLid9fX0sIC8vIFRPRE86IENvbXBsZXRlXG5zY3JvbGxTbmFwVHlwZTp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7ZmlyZWZveDozOSxpb3Nfc2FmOjl9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjAsZmlyZWZveDozOCxpZTo5LGllX21vYjoxMSxpb3Nfc2FmOjguMSxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjh9fX0sc2Nyb2xsU25hcFBvaW50c1g6e3ZhbHVlOntpbml0aWFsOidub25lJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZmlyZWZveDozOSxpb3Nfc2FmOjl9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjAsZmlyZWZveDozOCxpZTo5LGllX21vYjoxMSxpb3Nfc2FmOjguMSxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjh9LGlzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J25vbmUnfSxicm93c2VyOntzYWZhcmk6OX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdub25lXFwnLid9fX0sc2Nyb2xsU25hcFBvaW50c1k6e3ZhbHVlOntpbml0aWFsOidub25lJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZmlyZWZveDozOSxpb3Nfc2FmOjl9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjAsZmlyZWZveDozOCxpZTo5LGllX21vYjoxMSxpb3Nfc2FmOjguMSxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjh9LGlzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J25vbmUnfSxicm93c2VyOntzYWZhcmk6OX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdub25lXFwnLid9fX0sc2hhcGVJbWFnZVRocmVzaG9sZDp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQ2LGNocm9tZTozNyxpb3Nfc2FmOjgsb3BlcmE6MjQsc2FmYXJpOjcuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjM2LGVkZ2U6MTQsZmlyZWZveDo0NixpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYToyMyxzYWZhcmk6N319fSxzaGFwZUltYWdlTWFyZ2luOntjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NDYsY2hyb21lOjM3LGlvc19zYWY6OCxvcGVyYToyNCxzYWZhcmk6Ny4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MzYsZWRnZToxNCxmaXJlZm94OjQ2LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjIzLHNhZmFyaTo3fX19LHNoYXBlSW1hZ2VPdXRzaWRlOntjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NDYsY2hyb21lOjM3LGlvc19zYWY6OCxvcGVyYToyNCxzYWZhcmk6Ny4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MzYsZWRnZToxNCxmaXJlZm94OjQ2LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjIzLHNhZmFyaTo3fX19LHNoYXBlUmVuZGVyaW5nOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnY3Jpc3BFZGdlcycsJ2dlb21ldHJpY1ByZWNpc2lvbicsJ29wdGltaXplU3BlZWQnXX19LHNwZWFrOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnbm9uZScsJ25vcm1hbCddfX0sc3RvcENvbG9yOnt2YWx1ZTp7Y29sb3I6dHJ1ZSxpbml0aWFsOidibGFjayd9fSxzdG9wT3BhY2l0eTp7dmFsdWU6e2luaXRpYWw6MSxyYW5nZTpbMCwxXX19LHN0cm9rZTp7dmFsdWU6e2NvbG9yOnRydWUsaW5pdGlhbDonYmxhY2snfX0sc3Ryb2tlRGFzaGFycmF5Ont2YWx1ZTp7aW5pdGlhbDonbm9uZSd9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9jYWxjXFwoLykhPT1udWxsfSxicm93c2VyOntmaXJlZm94OnRydWV9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnY2FsYygpXFwnLid9fX0sc3Ryb2tlRGFzaG9mZnNldDp7dmFsdWU6e2luaXRpYWw6MSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9jYWxjXFwoLykhPT1udWxsfSxicm93c2VyOntmaXJlZm94OnRydWV9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnY2FsYygpXFwnLid9fX0sc3Ryb2tlTGluZWNhcDp7dmFsdWU6e2luaXRpYWw6J2J1dHQnLGtleXdvcmRzOlsnYnV0dCcsJ3JvdW5kJywnc3F1YXJlJ119fSxzdHJva2VMaW5lam9pbjp7dmFsdWU6e2luaXRpYWw6J21pdGVyJyxrZXl3b3JkczpbJ2JldmVsJywnbWl0ZXInLCdyb3VuZCddfX0sc3Ryb2tlT3BhY2l0eTp7dmFsdWU6e2luaXRpYWw6MSxyYW5nZTpbMCwxXX19LHN0cm9rZVdpZHRoOnt2YWx1ZTp7aW5pdGlhbDoxLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL2NhbGNcXCgvKSE9PW51bGx9LGJyb3dzZXI6e2ZpcmVmb3g6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdjYWxjKClcXCcuJ319fSx0YWJTaXplOnt2YWx1ZTp7aW5pdGlhbDo4LGludGVnZXI6dHJ1ZSxsZW5ndGg6dHJ1ZSxwb3NpdGl2ZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGNocm9tZTo0MixvcGVyYToyOX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjIsY2hyb21lOjIwLGVkZ2U6MTQsZmlyZWZveDozLjYsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NixvcF9taW5pOjAsb3BlcmE6MTAuNSxzYWZhcmk6Nn0saXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gcGFyc2VJbnQodmFsdWUsMTApIT12YWx1ZX0sYnJvd3Nlcjp7Y2hyb21lOnt1cHRvOjQxfSxvcGVyYTp7dXB0bzoyOH0sZmlyZWZveDp0cnVlLHNhZmFyaTp0cnVlLG9wX21pbmk6dHJ1ZSxpb3Nfc2FmOnRydWUsYW5kcm9pZDp0cnVlfSxoaW50Oidvbmx5IHN1cHBvcnRzIGludGVnZXIgdmFsdWVzLid9fX0sdGFibGVMYXlvdXQ6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdmaXhlZCddfX0sdGV4dEFsaWduOnt2YWx1ZTp7aW5pdGlhbDonaW5oZXJpdCcsa2V5d29yZHM6WydjZW50ZXInLCdlbmQnLCdqdXN0aWZ5JywnanVzdGlmeS1hbGwnLCdsZWZ0JywnbWF0Y2gtcGFyZW50JywncmlnaHQnLCdzdGFydCddfX0sdGV4dEFsaWduTGFzdDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGNocm9tZTo0NyxmaXJlZm94OjEyLG9wZXJhOjM0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo0NixlZGdlOjAsZmlyZWZveDoxMSxpZTowLGllX21vYjowLGlvc19zYWY6OS4zLG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6OS4xfX19LHRleHRBbmNob3I6e3ZhbHVlOntpbml0aWFsOidzdGFydCcsa2V5d29yZHM6WydlbmQnLCdtaWRkbGUnLCdzdGFydCddfX0sdGV4dERlY29yYXRpb246e3ZhbHVlOntpbml0aWFsOidub25lJ30sbG9uZ2hhbmRzOlsndGV4dERlY29yYXRpb25Db2xvcicsJ3RleHREZWNvcmF0aW9uU3R5bGUnLCd0ZXh0RGVjb3JhdGlvbkxpbmUnXX0sdGV4dERlY29yYXRpb25Db2xvcjp7dmFsdWU6e2NvbG9yOnRydWUsaW5pdGlhbDonY3VycmVudENvbG9yJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZmlyZWZveDo2fSxwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZToxNCxmaXJlZm94OjUsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjd9fX0sdGV4dERlY29yYXRpb25MaW5lOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydsaW5lLXRocm91Z2gnLCdub25lJywnb3ZlcmxpbmUnLCd1bmRlcmxpbmUnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZmlyZWZveDo2fSxwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZToxNCxmaXJlZm94OjUsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjd9fX0sdGV4dERlY29yYXRpb25TdHlsZTp7dmFsdWU6e2luaXRpYWw6J3NvbGlkJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZmlyZWZveDo2fSxwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZToxNCxmaXJlZm94OjUsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjd9fX0sdGV4dERlY29yYXRpb25Ta2lwOntjb21wYXRpYmlsaXR5OntmdWxsOntmaXJlZm94OjZ9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjE0LGZpcmVmb3g6NSxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6N319fSx0ZXh0RW1waGFzaXNQb3NpdGlvbjp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7aW9zX3NhZjo3LHNhZmFyaTo3LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjQuMixjaHJvbWU6MjQsZWRnZToxNCxmaXJlZm94OjQ2LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjZ9fX0sdGV4dEVtcGhhc2lzOntjb21wYXRpYmlsaXR5OntmdWxsOntpb3Nfc2FmOjcsc2FmYXJpOjcuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6NC4yLGNocm9tZToyNCxlZGdlOjE0LGZpcmVmb3g6NDYsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NixvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Nn19fSx0ZXh0RW1waGFzaXNTdHlsZTp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7aW9zX3NhZjo3LHNhZmFyaTo3LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjQuMixjaHJvbWU6MjQsZWRnZToxNCxmaXJlZm94OjQ2LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjZ9fX0sdGV4dEVtcGhhc2lzQ29sb3I6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2lvc19zYWY6NyxzYWZhcmk6Ny4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDo0LjIsY2hyb21lOjI0LGVkZ2U6MTQsZmlyZWZveDo0NixpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo2LG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTo2fX19LHRleHRJbmRlbnQ6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sdGV4dE92ZXJmbG93Ont2YWx1ZTp7aW5pdGlhbDonY2xpcCcsa2V5d29yZHM6WydjbGlwJywnZWxsaXBzaXMnXSxzdHJpbmc6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6Mi4xLGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo3LGllOjYsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wX21pbmk6NSxvcGVyYTo5LHNhZmFyaTozLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo1LjUsaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYTowLHNhZmFyaTowfSxpc3N1ZXM6W3sgLy8gZ2VuZXJhbFxuYnJvd3Nlcjp7aWU6OX0saGludDonaXMgbm90IHN1cHBvcnRlZCBvbiBcXCc8aW5wdXQ+XFwnIHdpdGggdHlwZSBvZiBcXCd0ZXh0XFwnLid9LHticm93c2VyOntjaHJvbWU6dHJ1ZSxpZTp0cnVlfSxoaW50OidpcyBub3Qgc3VwcG9ydGVkIG9uIFxcJzxzZWxlY3Q+XFwnLid9XX19LHRleHRSZW5kZXJpbmc6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdnZW9tZXRyaWNQcmVjaXNpb24nLCdvcHRpbWl6ZUxlZ2liaWxpdHknLCdvcHRpbWl6ZVNwZWVkJ119fSx0ZXh0U2hhZG93Ont2YWx1ZTp7aW5pdGlhbDonbm9uZSd9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczpbe2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5yZXBsYWNlKC8ocmdiW2FdP3xoc2xbYV0/KVxcKC4qXFwpL2csJycpLm1hdGNoKC9bLF0vKSE9PW51bGx9LGJyb3dzZXI6e3NhZmFyaTp7dXB0bzozfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBzaGFkb3dzLid9LHsgLy8gdG8gYmUgaW1wcm92ZWQgZm9yIGtleXdvcmQgbWF0Y2hpbmdcbmNvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvWyNdfHJnYnxoc2x8W2Etel17Myx9Lyk9PT1udWxsfSxicm93c2VyOntzYWZhcmk6NS4xfSxoaW50OidyZXF1aXJlcyBhIGNvbG9yLid9LHtjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXt2YXIgY29sb3JDbGVhbj12YWx1ZS5yZXBsYWNlKC9yZ2JbYV0/XFwoLipcXCkvZywnJyk7dmFyIHNoYWRvd3M9Y29sb3JDbGVhbi5zcGxpdCgnLCcpO3ZhciBpbnZhbGlkPWZhbHNlO3NoYWRvd3MuZm9yRWFjaChmdW5jdGlvbihzaGFkb3cpe3ZhciBjb2xvclNwbGl0PXNoYWRvdy5zcGxpdCgnICcpO2lmKGNvbG9yU3BsaXQubGVuZ3RoPj0zKXtpZihjb2xvclNwbGl0WzJdPT09JzBweCcpe2ludmFsaWQ9dHJ1ZX19fSk7cmV0dXJuIGludmFsaWR9LGJyb3dzZXI6e2FuZHJvaWQ6e3VwdG86Mi4zfX0saGludDonZG9lcyBub3QgXFwnMHB4XFwnIGFzIGJsdXIgcmFkaXVzLid9XX19LHRleHRTaXplQWRqdXN0Ontjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfdWM6OS45LGllX21vYjoxMCxpb3Nfc2FmOjV9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjAsYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZToxNCxmaXJlZm94OjQ2LGllOjExLGllX21vYjowLGlvc19zYWY6NC4yLG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6OS4xfX19LHRleHRUcmFuc2Zvcm06e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2NhcGl0YWxpemUnLCdmdWxsLXdpZHRoJywnbG93ZXJjYXNlJywnbm9uZScsJ3VwcGVyY2FzZSddfX0sdGV4dFVuZGVybGluZVBvc2l0aW9uOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhYm92ZScsJ2F1dG8nLCdhdXRvLXBvcycsJ2JlbG93JywnbGVmdCcsJ3JpZ2h0JywndW5kZXInXX19LHRvcDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0byddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LHRvdWNoQWN0aW9uOntjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NDYsY2hyb21lOjM2LGVkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6OS4zLG9wZXJhOjIzLHNhZmFyaTo5LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZTozNSxlZGdlOjAsZmlyZWZveDo0NixpZTo5LGllX21vYjowLGlvc19zYWY6OSxvcF9taW5pOjUsb3BlcmE6MjIsc2FmYXJpOjl9fX0sdHJhbnNmb3JtOnt2YWx1ZTp7aW5pdGlhbDonbm9uZSd9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjMsY2hyb21lOjEyLGVkZ2U6MTIsZmlyZWZveDoxMCxpZTo5LGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6Mi4zLGNocm9tZToxMSxlZGdlOjAsZmlyZWZveDo5LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9LGlzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9jYWxjXFwoLykhPT1udWxsfSxicm93c2VyOntpZTp0cnVlfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2NhbGMoKVxcJy4nfX19LHRyYW5zZm9ybU9yaWdpbjp7dmFsdWU6e2luaXRpYWw6JzUwJSA1MCUgMCcsa2V5d29yZHM6Wydib3R0b20nLCdjZW50ZXInLCdsZWZ0JywncmlnaHQnLCd0b3AnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjMsY2hyb21lOjEyLGVkZ2U6MTIsZmlyZWZveDoxMCxpZTo5LGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6Mi4zLGNocm9tZToxMSxlZGdlOjAsZmlyZWZveDo5LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9LGlzc3Vlczp7IC8vIGdlbmVyYWxcbmJyb3dzZXI6e2ZpcmVmb3g6e3VwdG86NDJ9fSxoaW50OidpcyBub3Qgc3VwcG9ydGVkLid9fX0sdHJhbnNmb3JtT3JpZ2luWDp7dmFsdWU6e2luaXRpYWw6JzUwJScsa2V5d29yZHM6WydjZW50ZXInLCdsZWZ0JywncmlnaHQnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjMsY2hyb21lOjEyLGVkZ2U6MTIsZmlyZWZveDoxMCxpZTo5LGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6Mi4zLGNocm9tZToxMSxlZGdlOjAsZmlyZWZveDo5LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9LGlzc3Vlczp7IC8vIGdlbmVyYWxcbmJyb3dzZXI6e2ZpcmVmb3g6e3VwdG86NDJ9fSxoaW50OidpcyBub3Qgc3VwcG9ydGVkLid9fX0sdHJhbnNmb3JtT3JpZ2luWTp7dmFsdWU6e2luaXRpYWw6JzUwJScsa2V5d29yZHM6Wydib3R0b20nLCdjZW50ZXInLCd0b3AnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjMsY2hyb21lOjEyLGVkZ2U6MTIsZmlyZWZveDoxMCxpZTo5LGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6Mi4zLGNocm9tZToxMSxlZGdlOjAsZmlyZWZveDo5LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9LGlzc3Vlczp7IC8vIGdlbmVyYWxcbmJyb3dzZXI6e2ZpcmVmb3g6e3VwdG86NDJ9fSxoaW50OidpcyBub3Qgc3VwcG9ydGVkLid9fX0sdHJhbnNmb3JtT3JpZ2luWjp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjMsY2hyb21lOjEyLGVkZ2U6MTIsZmlyZWZveDoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6Mi4zLGNocm9tZToxMSxlZGdlOjAsZmlyZWZveDo5LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9LGlzc3Vlczp7IC8vIGdlbmVyYWxcbmJyb3dzZXI6e2ZpcmVmb3g6e3VwdG86NDJ9fSxoaW50OidpcyBub3Qgc3VwcG9ydGVkLid9fX0sdHJhbnNmb3JtU3R5bGU6e3ZhbHVlOntpbml0aWFsOidmbGF0JyxrZXl3b3JkczpbJ2ZsYXQnLCdwcmVzZXJ2ZS0zZCddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDozLGNocm9tZToxMixlZGdlOjEyLGZpcmVmb3g6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTUsc2FmYXJpOjR9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjIuMyxjaHJvbWU6MTEsZWRnZTowLGZpcmVmb3g6OSxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6My4yfSxpc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZT09PSdwcmVzZXJ2ZS0zZCd9LGJyb3dzZXI6e2llOnRydWV9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwncHJlc2VydmUtM2RcXCcuJ319fSx0cmFuc2l0aW9uOnt2YWx1ZTp7aW5pdGlhbDonbm9uZSd9LGxvbmdoYW5kczpbJ3RyYW5zaXRpb25Qcm9wZXJ0eScsJ3RyYW5zaXRpb25EdXJhdGlvbicsJ3RyYW5zaXRpb25UaW1pbmdGdW5jdGlvbicsJ3RyYW5zaXRpb25EZWxheSddLGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjIuMSxjaHJvbWU6NCxlZGdlOjEyLGZpcmVmb3g6NCxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTAuNSxzYWZhcmk6My4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMuNixpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTAsc2FmYXJpOjB9LGlzc3Vlczpbe2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvYmFja2dyb3VuZC1zaXplLykhPT1udWxsfSxicm93c2VyOntpZTp7dXB0bzoxMH19LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgdHJhbnNpdGlvbnMgb24gXFwnYmFja2dyb3VuZC1zaXplXFwnLid9LHtjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL2ZpbGwvKSE9PW51bGx9LGJyb3dzZXI6e2llOjExfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IHRyYW5zaXRpb25zIG9uIFNWRyBcXCdmaWxsXFwnLid9XX19LHRyYW5zaXRpb25EZWxheTp7dmFsdWU6e2luaXRpYWw6JzBzJyx0aW1lOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjIuMSxjaHJvbWU6NCxlZGdlOjEyLGZpcmVmb3g6NCxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTAuNSxzYWZhcmk6My4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMuNixpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTAsc2FmYXJpOjB9fX0sdHJhbnNpdGlvbkR1cmF0aW9uOnt2YWx1ZTp7aW5pdGlhbDonMHMnLHRpbWU6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6Mi4xLGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo0LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMC41LHNhZmFyaTozLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6My42LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMCxzYWZhcmk6MH19fSx0cmFuc2l0aW9uUHJvcGVydHk6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2FsbCcsJ25vbmUnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6Mi4xLGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo0LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMC41LHNhZmFyaTozLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6My42LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMCxzYWZhcmk6MH0saXNzdWVzOlt7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSxzdHlsZXMpe3ZhciBwcm9wcz12YWx1ZS5zcGxpdCgnLCcpO3ZhciBpbnZhbGlkPWZhbHNlO3Byb3BzLmZvckVhY2goZnVuY3Rpb24ocHJvcCl7dmFyIGNhbWVsQ2FzZWRQcm9wPWRhc2hUb0NhbWVsQ2FzZShwcm9wKTtpZihzdHlsZXNbY2FtZWxDYXNlZFByb3BdJiZzdHlsZXNbY2FtZWxDYXNlZFByb3BdLnRvU3RyaW5nKCkubWF0Y2goL2NhbGNcXCgvKSE9PW51bGwpe2ludmFsaWQ9dHJ1ZX19KTtyZXR1cm4gaW52YWxpZH0sYnJvd3Nlcjp7aWU6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCB0cmFuc2l0aW9ucyBvbiBwcm9wZXJ0aWVzIHdpdGggXFwnY2FsY1xcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9iYWNrZ3JvdW5kLXNpemUvKSE9PW51bGx9LGJyb3dzZXI6e2llOnt1cHRvOjEwfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCB0cmFuc2l0aW9ucyBvbiBcXCdiYWNrZ3JvdW5kLXNpemVcXCcuJ30se2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvZmlsbC8pIT09bnVsbH0sYnJvd3Nlcjp7aWU6MTF9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgdHJhbnNpdGlvbnMgb24gU1ZHIFxcJ2ZpbGxcXCcuJ31dfX0sdHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uOnt2YWx1ZTp7Y3ViaWNCZXppZXI6dHJ1ZSxpbml0aWFsOidlYXNlJyxrZXl3b3JkczpbJ2Vhc2UnLCdlYXNlLWluJywnZWFzZS1pbi1vdXQnLCdlYXNlLW91dCcsJ2xpbmVhcicsJ3N0ZXAtZW5kJywnc3RlcC1zdGFydCddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDoyLjEsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjQsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEwLjUsc2FmYXJpOjMuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDozLjYsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEwLHNhZmFyaTowfX19LHVuaWNvZGVCaWRpOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ2JpZGktb3ZlcnJpZGUnLCdlbWJlZCcsJ2lzb2xhdGUnLCdpc29sYXRlLW92ZXJyaWRlJywnbm9ybWFsJywncGxhaW50ZXh0J119fSwgLy8gVE9ETzogY29tcGxldGVcbnVzZXJTZWxlY3Q6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjIuMSxjaHJvbWU6NCxlZGdlOjEyLGZpcmVmb3g6MixpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTUsc2FmYXJpOjMuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTowfX19LHZlcnRpY2FsQWxpZ246e3ZhbHVlOntpbml0aWFsOidiYXNlbGluZScsa2V5d29yZHM6WydiYXNlbGluZScsJ2JvdHRvbScsJ21pZGRsZScsJ3N1YicsJ3N1cGVyJywndGV4dC1ib3R0b20nLCd0ZXh0LXRvcCcsJ3RvcCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LHZpc2liaWxpdHk6e3ZhbHVlOntpbml0aWFsOid2aXNpYmxlJyxrZXl3b3JkczpbJ2NvbGxhcHNlJywnaGlkZGVuJywndmlzaWJsZSddfX0sd2hpdGVTcGFjZTp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6Wydub3JtYWwnLCdub3dyYXAnLCdwcmUnLCdwcmUtbGluZScsJ3ByZS13cmFwJ119fSx3aWRvd3M6e3ZhbHVlOntpbml0aWFsOjAsaW50ZWdlcjp0cnVlLHBvc2l0aXZlOnRydWUsbm90TnVsbDp0cnVlfX0sd2lkdGg6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdhdmFpbGFibGUnLCdmaXQtY29udGVudCcsJ21heC1jb250ZW50JywnbWluLWNvbnRlbnQnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSx3b3JkQnJlYWs6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnYnJlYWstYWxsJywna2VlcC1hbGwnLCdub3JtYWwnXX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0na2VlcC1hbGwnfSxicm93c2VyOntjaHJvbWU6e3VwdG86NDN9LHNhZmFyaTp7dXB0bzo4fSxvcGVyYTp7dXB0bzozMH0saW9zX3NhZjp7dXB0bzo4LjR9LGFuZHJvaWQ6e3VwdG86NC40fSxhbmRfdWM6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdrZWVwLWFsbFxcJy4nfX19LHdvcmRTcGFjaW5nOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ25vcm1hbCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LHdvcmRXcmFwOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ2JyZWFrLXdvcmQnLCdub3JtYWwnXX19LHdyYXBGbG93Ontjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZTowLGZpcmVmb3g6NDYsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjkuMyxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjkuMX0sZnVsbDp7ZWRnZToxMixpZToxMCxpZV9tb2I6MTB9fX0sd3JhcE1hcmdpbjp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NDYsY2hyb21lOjUwLGVkZ2U6MCxmaXJlZm94OjQ2LGllOjksaWVfbW9iOjAsaW9zX3NhZjo5LjMsb3BfbWluaTo1LG9wZXJhOjM2LHNhZmFyaTo5LjF9LGZ1bGw6e2VkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwfX19LHdyYXBUaHJvdWdoOntjb21wYXRpYmlsaXR5OntmdWxsOntlZGdlOjEyLGllOjEwLGllX21vYjoxMH0scGFydGlhbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NDYsY2hyb21lOjUwLGVkZ2U6MCxmaXJlZm94OjQ2LGllOjksaWVfbW9iOjAsaW9zX3NhZjo5LjMsb3BfbWluaTo1LG9wZXJhOjM2LHNhZmFyaTo5LjF9fX0sd3JpdGluZ01vZGU6e3ZhbHVlOntpbml0aWFsOidob3Jpem9udGFsLXRiJyxrZXl3b3JkczpbJ2hvcml6b250YWwtdGInLCdscicsJ2xyLXRiJywncmItcmwnLCdybCcsJ3NpZGV3YXlzLWxyJywnc2lkZXdheXMtcmwnLCd0YicsJ3ZlcnRpY2FsLWxyJywndmVydGljYWwtcmwnXX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUhPT0nbHRyJ3x8dmFsdWUhPT0ncnRsJ30sYnJvd3Nlcjp7aWU6dHJ1ZX0saGludDonZG9lcyBvbmx5IHN1cHBvcnQgXFwnbHRyXFwnIGFuZCBcXCdydGxcXCcuJ319fSx4Ont2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlfX0seTp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZX19LHpJbmRleDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGludGVnZXI6dHJ1ZSxrZXl3b3JkczpbJ2F1dG8nXSxuZWdhdGl2ZTp0cnVlLHBvc2l0aXZlOnRydWV9fSx6b29tOnt2YWx1ZTp7ZmxvYXQ6dHJ1ZSxpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnbm9ybWFsJ10scGVyY2VudGFnZTp0cnVlLHBvc2l0aXZlOnRydWV9fX07bW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuUGx1Z2lucyA9IHVuZGVmaW5lZDtcblxudmFyIF9MaW50ZXIgPSByZXF1aXJlKCcuL0xpbnRlcicpO1xuXG52YXIgX0xpbnRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9MaW50ZXIpO1xuXG52YXIgX3Nob3J0aGFuZExvbmdoYW5kID0gcmVxdWlyZSgnLi9wbHVnaW5zL3Nob3J0aGFuZExvbmdoYW5kJyk7XG5cbnZhciBfc2hvcnRoYW5kTG9uZ2hhbmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2hvcnRoYW5kTG9uZ2hhbmQpO1xuXG52YXIgX25vVmVuZG9yUHJlZml4ID0gcmVxdWlyZSgnLi9wbHVnaW5zL25vVmVuZG9yUHJlZml4Jyk7XG5cbnZhciBfbm9WZW5kb3JQcmVmaXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbm9WZW5kb3JQcmVmaXgpO1xuXG52YXIgX25vSW5pdGlhbFZhbHVlID0gcmVxdWlyZSgnLi9wbHVnaW5zL25vSW5pdGlhbFZhbHVlJyk7XG5cbnZhciBfbm9Jbml0aWFsVmFsdWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbm9Jbml0aWFsVmFsdWUpO1xuXG52YXIgX3ByZWZlck51bWJlciA9IHJlcXVpcmUoJy4vcGx1Z2lucy9wcmVmZXJOdW1iZXInKTtcblxudmFyIF9wcmVmZXJOdW1iZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJlZmVyTnVtYmVyKTtcblxudmFyIF9yZXF1aXJlVW5pdCA9IHJlcXVpcmUoJy4vcGx1Z2lucy9yZXF1aXJlVW5pdCcpO1xuXG52YXIgX3JlcXVpcmVVbml0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlcXVpcmVVbml0KTtcblxudmFyIF9jb21wYXRpYmlsaXR5ID0gcmVxdWlyZSgnLi9wbHVnaW5zL2NvbXBhdGliaWxpdHknKTtcblxudmFyIF9jb21wYXRpYmlsaXR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbXBhdGliaWxpdHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgUGx1Z2lucyA9IGV4cG9ydHMuUGx1Z2lucyA9IHtcbiAgbm9WZW5kb3JQcmVmaXg6IF9ub1ZlbmRvclByZWZpeDIuZGVmYXVsdCxcbiAgc2hvcnRoYW5kTG9uZ2hhbmQ6IF9zaG9ydGhhbmRMb25naGFuZDIuZGVmYXVsdCxcbiAgbm9Jbml0aWFsVmFsdWU6IF9ub0luaXRpYWxWYWx1ZTIuZGVmYXVsdCxcbiAgcHJlZmVyTnVtYmVyOiBfcHJlZmVyTnVtYmVyMi5kZWZhdWx0LFxuICByZXF1aXJlVW5pdDogX3JlcXVpcmVVbml0Mi5kZWZhdWx0LFxuICBjb21wYXRpYmlsaXR5OiBfY29tcGF0aWJpbGl0eTIuZGVmYXVsdFxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX0xpbnRlcjIuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcHJvcGVydHlNYXAgPSByZXF1aXJlKCcuLi9kYXRhL3Byb3BlcnR5TWFwJyk7XG5cbnZhciBfcHJvcGVydHlNYXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcGVydHlNYXApO1xuXG52YXIgX2Jyb3dzZXJOYW1lcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2Jyb3dzZXJOYW1lcycpO1xuXG52YXIgX2Jyb3dzZXJOYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9icm93c2VyTmFtZXMpO1xuXG52YXIgX3RhcmdldEJyb3dzZXIgPSByZXF1aXJlKCcuLi91dGlscy90YXJnZXRCcm93c2VyJyk7XG5cbnZhciBfdGFyZ2V0QnJvd3NlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90YXJnZXRCcm93c2VyKTtcblxudmFyIF91bnByZWZpeFN0eWxlcyA9IHJlcXVpcmUoJy4uL3V0aWxzL3VucHJlZml4U3R5bGVzJyk7XG5cbnZhciBfdW5wcmVmaXhTdHlsZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdW5wcmVmaXhTdHlsZXMpO1xuXG52YXIgX29iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIF9vYmplY3RBc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb2JqZWN0QXNzaWduKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFRZUEUgPSAnQ09NUEFUSUJJTElUWSc7XG5cbnZhciBnZXRWZXJzaW9uU3RyaW5nID0gZnVuY3Rpb24gZ2V0VmVyc2lvblN0cmluZyh2ZXJzaW9uKSB7XG4gIHZhciB2ZXJzaW9uSWRlbnQgPSB1bmRlZmluZWQ7XG4gIGlmICh2ZXJzaW9uLnVwdG8pIHtcbiAgICB2ZXJzaW9uSWRlbnQgPSAnPD0nICsgdmVyc2lvbi51cHRvO1xuICB9IGVsc2UgaWYgKHZlcnNpb24uZnJvbSkge1xuICAgIHZlcnNpb25JZGVudCA9IHZlcnNpb24uZnJvbSArICctJyArIHZlcnNpb24udG87XG4gIH0gZWxzZSBpZiAodmVyc2lvbiA9PT0gdHJ1ZSkge1xuICAgIHZlcnNpb25JZGVudCA9ICdhbGwnO1xuICB9IGVsc2Uge1xuICAgIHZlcnNpb25JZGVudCA9IHZlcnNpb247XG4gIH1cbiAgcmV0dXJuIHZlcnNpb25JZGVudDtcbn07XG5cbi8vIENoZWNrcyBpZiB0aGVyZSBhcmUgYnJvd3NlciBjb21wYXRpYmlsaXR5IGlzc3Vlc1xuLy8gVXNlcyBkYXRhIGNvbGxlY3RlZCBmcm9tIGNhbml1c2VcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9sZFN0eWxlcywgZWxlbWVudCwgd2FybmluZ3MsIF9yZWYpIHtcbiAgdmFyIGNvbXBhdGliaWxpdHkgPSBfcmVmLmNvbXBhdGliaWxpdHk7XG5cbiAgdmFyIHN0eWxlcyA9ICgwLCBfdW5wcmVmaXhTdHlsZXMyLmRlZmF1bHQpKG9sZFN0eWxlcyk7XG5cbiAgdmFyIHRhcmdldCA9IF90YXJnZXRCcm93c2VyMi5kZWZhdWx0O1xuXG4gIGlmIChjb21wYXRpYmlsaXR5ICYmIGNvbXBhdGliaWxpdHkudGFyZ2V0QnJvd3Nlcikge1xuICAgIHRhcmdldCA9IGNvbXBhdGliaWxpdHkudGFyZ2V0QnJvd3NlcjtcbiAgfVxuXG4gIC8vIGRlZmF1bHQgc3VwcG9ydFxuICBpZiAoIWNvbXBhdGliaWxpdHkgfHwgY29tcGF0aWJpbGl0eS5kZWZhdWx0ICE9PSBmYWxzZSkge1xuICAgIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgIHZhciBzdXBwb3J0RGF0YSA9IF9wcm9wZXJ0eU1hcDIuZGVmYXVsdFtwcm9wZXJ0eV0gPyBfcHJvcGVydHlNYXAyLmRlZmF1bHRbcHJvcGVydHldLmNvbXBhdGliaWxpdHkgOiBmYWxzZTtcblxuICAgICAgaWYgKHN1cHBvcnREYXRhKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGJyb3dzZXJWZXJzaW9ucyA9IHN1cHBvcnREYXRhLmZ1bGwgfHwge307XG4gICAgICAgICAgLy8gaWYgcGFydGlhbCBzdXBwb3J0IGlzIHVzZWRcbiAgICAgICAgICAvLyBwYXJ0aWFsIHN1cHBvcnQgZGF0YSBnZXRzIGNvbnNpZGVyZWQgYXMgd2VsbFxuICAgICAgICAgIGlmIChjb21wYXRpYmlsaXR5LnBhcnRpYWwgIT09IGZhbHNlICYmIHN1cHBvcnREYXRhLnBhcnRpYWwpIHtcbiAgICAgICAgICAgIGJyb3dzZXJWZXJzaW9ucyA9ICgwLCBfb2JqZWN0QXNzaWduMi5kZWZhdWx0KSh7fSwgYnJvd3NlclZlcnNpb25zLCBzdXBwb3J0RGF0YS5wYXJ0aWFsKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBzdXBwb3J0IGRhdGEgYXQgYWxsXG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGJyb3dzZXJWZXJzaW9ucykubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgLy8gSXRlcmF0ZSBldmVyeSBicm93c2VyXG4gICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRhcmdldCkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uID0gYnJvd3NlclZlcnNpb25zW25hbWVdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgICAgICAgICAgICAvLyBpZiB2ZXJzaW9uIGlzIHRydWUsIGV2ZXJ5IHZlcnNpb24gaXMgYWZmZWN0ZWRcbiAgICAgICAgICAgICAgICBpZiAodmVyc2lvbiA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldFtuYW1lXSA8IHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgIHdhcm5pbmdzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBUWVBFLFxuICAgICAgICAgICAgICAgICAgICBoaW50OiAnXFwnJyArIHByb3BlcnR5ICsgJ1xcJyBpcyBub3QgJyArIChjb21wYXRpYmlsaXR5LnBhcnRpYWwgIT09IGZhbHNlID8gJycgOiAnZnVsbHkgJykgKyAnc3VwcG9ydGVkIG9uICcgKyBfYnJvd3Nlck5hbWVzMi5kZWZhdWx0W25hbWVdICsgJyB1cCB0byB2ZXJzaW9uICcgKyB2ZXJzaW9uICsgJy4nLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IGNvbXBhdGliaWxpdHkucGFydGlhbCA/ICdwYXJ0aWFsJyA6ICdmdWxsJyxcbiAgICAgICAgICAgICAgICAgICAgYnJvd3NlcjogX2Jyb3dzZXJOYW1lczIuZGVmYXVsdFtuYW1lXSxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBzdXBwb3J0IGlzc3Vlc1xuICBpZiAoIWNvbXBhdGliaWxpdHkgfHwgY29tcGF0aWJpbGl0eS5pc3N1ZXMgIT09IGZhbHNlKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgdmFyIGRhdGEgPSBfcHJvcGVydHlNYXAyLmRlZmF1bHRbcHJvcGVydHldID8gX3Byb3BlcnR5TWFwMi5kZWZhdWx0W3Byb3BlcnR5XS5jb21wYXRpYmlsaXR5IDogZmFsc2U7XG5cbiAgICAgIGlmIChkYXRhICYmIGRhdGEuaXNzdWVzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGlzc3VlcyA9IGRhdGEuaXNzdWVzO1xuICAgICAgICAgIGlmIChpc3N1ZXMgaW5zdGFuY2VvZiBBcnJheSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgaXNzdWVzID0gW2lzc3Vlc107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgIC8vIEl0ZXJhdGUgZXZlcnkgYmFzaWMgaXNzdWVcbiAgICAgICAgICBpc3N1ZXMuZm9yRWFjaChmdW5jdGlvbiAoaXNzdWUpIHtcbiAgICAgICAgICAgIHZhciBjb25kaXRpb24gPSBpc3N1ZS5jb25kaXRpb247XG4gICAgICAgICAgICB2YXIgYnJvd3NlciA9IGlzc3VlLmJyb3dzZXI7XG4gICAgICAgICAgICB2YXIgaGludCA9IGlzc3VlLmhpbnQ7XG4gICAgICAgICAgICAvLyBObyBjb25kaXRpb24gYXV0b21hdGljYWxseSB2YWxpZGF0ZXMgYXMgdHJ1ZVxuXG4gICAgICAgICAgICBpZiAoY29uZGl0aW9uID09PSB1bmRlZmluZWQgfHwgY29uZGl0aW9uKHZhbHVlLnRvU3RyaW5nKCksIHN0eWxlcywgZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgLy8gaWYgbm8gYnJvd3NlcnMgZGF0YSBpcyBwcm92aWRlZFxuICAgICAgICAgICAgICAvLyBpdCBhdXRvbWF0aWNhbGx5IGlzIGEgZ2xvYmFsIGlzc3VlXG4gICAgICAgICAgICAgIGlmICghYnJvd3Nlcikge1xuICAgICAgICAgICAgICAgIHdhcm5pbmdzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgdHlwZTogVFlQRSxcbiAgICAgICAgICAgICAgICAgIGhpbnQ6ICdFdmVyeSBicm93c2VyICcgKyBoaW50LFxuICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gSXRlcmF0ZSBldmVyeSBicm93c2VyXG4gICAgICAgICAgICAgIE9iamVjdC5rZXlzKGJyb3dzZXIpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmVyc2lvbiA9IGJyb3dzZXJbbmFtZV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgICB2YXIgbWF4VmVyc2lvbiA9IHZlcnNpb24gfHwgdmVyc2lvbi50byB8fCB2ZXJzaW9uLnVwdG87XG4gICAgICAgICAgICAgICAgLy8gaWYgdmVyc2lvbiBpcyB0cnVlLCBldmVyeSB2ZXJzaW9uIGlzIGFmZmVjdGVkXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldFtuYW1lXSAmJiAobWF4VmVyc2lvbiA9PT0gdHJ1ZSB8fCB0YXJnZXRbYnJvd3Nlcl0gPD0gbWF4VmVyc2lvbikpIHtcbiAgICAgICAgICAgICAgICAgIHdhcm5pbmdzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBUWVBFLFxuICAgICAgICAgICAgICAgICAgICBoaW50OiAnXFwnJyArIHByb3BlcnR5ICsgJ1xcJyBvbiAnICsgX2Jyb3dzZXJOYW1lczIuZGVmYXVsdFtuYW1lXSArICcgKFZlcnNpb246IFxcJyArICcgKyBnZXRWZXJzaW9uU3RyaW5nKHZlcnNpb24pICsgJykgJyArIGhpbnQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICBicm93c2VyOiBfYnJvd3Nlck5hbWVzMi5kZWZhdWx0W25hbWVdLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uID09PSB0cnVlID8gJ2FsbCcgOiB2ZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9wcm9wZXJ0eU1hcCA9IHJlcXVpcmUoJy4uL2RhdGEvcHJvcGVydHlNYXAnKTtcblxudmFyIF9wcm9wZXJ0eU1hcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9wZXJ0eU1hcCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBUWVBFID0gJ05PX0lOSVRJQUxfVkFMVUUnO1xudmFyIGdldEhpbnQgPSBmdW5jdGlvbiBnZXRIaW50KHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gJ0luaXRpYWwgdmFsdWUgXFwnJyArIHByb3BlcnR5ICsgJzogJyArIHZhbHVlICsgJ1xcJyBkb2VzIG5vdCBuZWVkIHRvIGJlIHNldCBleHBsaWNpdGx5Lic7XG59O1xuXG52YXIgaW5pdGlhbE1hcCA9IHt9O1xuT2JqZWN0LmtleXMoX3Byb3BlcnR5TWFwMi5kZWZhdWx0KS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICBpZiAoX3Byb3BlcnR5TWFwMi5kZWZhdWx0W3Byb3BlcnR5XS52YWx1ZSAmJiBfcHJvcGVydHlNYXAyLmRlZmF1bHRbcHJvcGVydHldLnZhbHVlLmluaXRpYWwpIHtcbiAgICBpbml0aWFsTWFwW3Byb3BlcnR5XSA9IF9wcm9wZXJ0eU1hcDIuZGVmYXVsdFtwcm9wZXJ0eV0udmFsdWUuaW5pdGlhbDtcbiAgfVxufSk7XG5cbi8vIENoZWNrcyBpZiB0aGVyZSBhcmUgcHJvcGVydGllcyB1c2luZyBpbml0aWFsIHByb3BlcnR5IHZhbHVlc1xuLy8gV2FybnMgdGhhdCB0aG9zZSBjYW4gYmUgbGVmdCBvdmVyIGFzIHRoZXkncmUgc2V0IGFueXdheVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3R5bGVzLCBlbGVtZW50LCB3YXJuaW5ncykge1xuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgaWYgKGluaXRpYWxNYXBbcHJvcGVydHldICYmIGluaXRpYWxNYXBbcHJvcGVydHldID09IHZhbHVlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB3YXJuaW5ncy5wdXNoKHtcbiAgICAgICAgdHlwZTogVFlQRSxcbiAgICAgICAgaGludDogZ2V0SGludChwcm9wZXJ0eSwgdmFsdWUpLFxuICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBUWVBFID0gJ05PX1ZFTkRPUl9QUkVGSVgnO1xudmFyIGdldEhpbnQgPSBmdW5jdGlvbiBnZXRIaW50KHByb3BlcnR5LCB2YWx1ZSwgc3VnZ2VzdGlvbiwgaXNWYWx1ZUlzc3VlKSB7XG4gIGlmIChpc1ZhbHVlSXNzdWUpIHtcbiAgICByZXR1cm4gJ1xcJycgKyBwcm9wZXJ0eSArICc6ICcgKyB2YWx1ZSArICdcXCcgZG9lcyBub3QgbmVlZCB2ZW5kb3IgcHJlZml4ZXMuIFVzZSBcXCcnICsgcHJvcGVydHkgKyAnOiAnICsgc3VnZ2VzdGlvbiArICdcXCcuJztcbiAgfVxuICByZXR1cm4gJ1xcJycgKyBwcm9wZXJ0eSArICc6ICcgKyB2YWx1ZSArICdcXCcgZG9lcyBub3QgbmVlZCB2ZW5kb3IgcHJlZml4ZXMuIFVzZSBcXCcnICsgc3VnZ2VzdGlvbiArICc6ICcgKyB2YWx1ZSArICdcXCcuJztcbn07XG5cbnZhciB1bmNhcGl0YWxpemVTdHJpbmcgPSBmdW5jdGlvbiB1bmNhcGl0YWxpemVTdHJpbmcoc3RyKSB7XG4gIHJldHVybiBzdHIuc3Vic3RyKDAsIDEpLnRvTG93ZXJDYXNlKCkgKyBzdHIuc3Vic3RyKDEsIHN0ci5sZW5ndGggLSAxKTtcbn07XG5cbi8vIENoZWNrcyBpZiBhbnkgdmVuZG9yIHByZWZpeGVzIGhhdmUgYmVlbiBzZXQgbWFudWFsbHlcbi8vIEFkZHMgdGhvc2UgdG8gdGhlIHdhcm5pbmdzIGxpc3Qgd2l0aCB0aGUgc3BlY2lmaWMgcHJvcGVydHkvdmFsdWVcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN0eWxlcywgZWxlbWVudCwgd2FybmluZ3MpIHtcbiAgdmFyIGpzUHJlZml4ZXMgPSBbJ1dlYmtpdCcsICdNb3onLCAnTycsICdtcyddO1xuICB2YXIgY3NzUHJlZml4ZXMgPSBbJy13ZWJraXQtJywgJy1tb3otJywgJy1vLScsICctbXMtJ107XG5cbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGpzUHJlZml4ZXMuZm9yRWFjaChmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICBpZiAocHJvcGVydHkuaW5kZXhPZihwcmVmaXgpID09PSAwKSB7XG4gICAgICAgIHZhciBzdWdnZXN0aW9uID0gdW5jYXBpdGFsaXplU3RyaW5nKHByb3BlcnR5LnJlcGxhY2UobmV3IFJlZ0V4cChwcmVmaXgsICdnJyksICcnKSk7XG5cbiAgICAgICAgd2FybmluZ3MucHVzaCh7XG4gICAgICAgICAgdHlwZTogVFlQRSxcbiAgICAgICAgICBoaW50OiBnZXRIaW50KHByb3BlcnR5LCB2YWx1ZSwgc3VnZ2VzdGlvbiwgZmFsc2UpLFxuICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICBzdWdnZXN0aW9uOiBzdWdnZXN0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gY2hlY2tzIGlmIGFueSB2YWx1ZSBpbmNsdWRlcyBwcmVmaXhlc1xuICAgIGNzc1ByZWZpeGVzLmZvckVhY2goZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuaW5kZXhPZihwcmVmaXgpID4gLTEpIHtcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb24gPSB2YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAocHJlZml4LCAnZycpLCAnJyk7XG5cbiAgICAgICAgd2FybmluZ3MucHVzaCh7XG4gICAgICAgICAgdHlwZTogVFlQRSxcbiAgICAgICAgICBoaW50OiBnZXRIaW50KHByb3BlcnR5LCB2YWx1ZSwgc3VnZ2VzdGlvbiwgdHJ1ZSksXG4gICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICBzdWdnZXN0aW9uOiBzdWdnZXN0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBUWVBFID0gJ1BSRUZFUl9OVU1CRVInO1xudmFyIGdldEhpbnQgPSBmdW5jdGlvbiBnZXRIaW50KHByb3BlcnR5LCB2YWx1ZSwgc3VnZ2VzdGlvbikge1xuICByZXR1cm4gJ1ByZWZlciBudW1iZXJzIGZvciBcXCcnICsgcHJvcGVydHkgKyAnOiAnICsgdmFsdWUgKyAnXFwnLiBVc2UgXFwnJyArIHByb3BlcnR5ICsgJzogJyArIHN1Z2dlc3Rpb24gKyAnXFwnIGluc3RlYWQuJztcbn07XG5cbi8vIENoZWNrcyBpZiBudW1iZXIgdmFsdWVzIGFyZSBzcGVjaWZpZWQgYXMgYSBzdHJpbmdcbi8vIE51bWJlcnMgYXJlIHByZWZlcmVkIGluIHRoaXMgY2FzZVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3R5bGVzLCBlbGVtZW50LCB3YXJuaW5ncykge1xuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBudW1iZXIgPSB2YWx1ZS50cmltKCkuc3Vic3RyKDAsIHZhbHVlLmxlbmd0aCAtIDIpO1xuICAgICAgdmFyIHVuaXQgPSB2YWx1ZS50cmltKCkuc3Vic3RyKHZhbHVlLmxlbmd0aCAtIDIsIDIpO1xuXG4gICAgICBpZiAodW5pdCA9PT0gJ3B4JyAmJiBwYXJzZUZsb2F0KHZhbHVlKS50b1N0cmluZygpID09PSBudW1iZXIgfHwgdmFsdWUgPT09ICcwJykge1xuICAgICAgICB2YXIgc3VnZ2VzdGlvbiA9IHBhcnNlRmxvYXQodmFsdWUpO1xuXG4gICAgICAgIHdhcm5pbmdzLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFRZUEUsXG4gICAgICAgICAgaGludDogZ2V0SGludChwcm9wZXJ0eSwgdmFsdWUsIHN1Z2dlc3Rpb24pLFxuICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgc3VnZ2VzdGlvbjogc3VnZ2VzdGlvblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzVW5pdGxlc3NQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzVW5pdGxlc3NQcm9wZXJ0eScpO1xuXG52YXIgX2lzVW5pdGxlc3NQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1VuaXRsZXNzUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVFlQRSA9ICdSRVFVSVJFX1VOSVQnO1xudmFyIGdldEhpbnQgPSBmdW5jdGlvbiBnZXRIaW50KHByb3BlcnR5LCB2YWx1ZSwgc3VnZ2VzdGlvbikge1xuICByZXR1cm4gJ051bWJlcnMgKCcgKyB2YWx1ZSArICcpIGFyZSBub3QgYWxsb3dlZCBmb3IgXFwnJyArIHByb3BlcnR5ICsgJ1xcJy4gVXNlIFxcJycgKyBzdWdnZXN0aW9uICsgJ1xcJyBpbnN0ZWFkLic7XG59O1xuXG4vLyBDaGVja3MgaWYgbnVtYmVyIHZhbHVlcyBhcmUgdXNlZFxuLy8gVW5pdHMgYXJlIHJlcXVpcmVkXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdHlsZXMsIGVsZW1lbnQsIHdhcm5pbmdzKSB7XG4gIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBpZiAoISgwLCBfaXNVbml0bGVzc1Byb3BlcnR5Mi5kZWZhdWx0KShwcm9wZXJ0eSkgJiYgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgdmFyIHN1Z2dlc3Rpb24gPSB2YWx1ZSArICdweCc7XG5cbiAgICAgIHdhcm5pbmdzLnB1c2goe1xuICAgICAgICB0eXBlOiBUWVBFLFxuICAgICAgICBoaW50OiBnZXRIaW50KHByb3BlcnR5LCB2YWx1ZSwgc3VnZ2VzdGlvbiksXG4gICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBzdWdnZXN0aW9uOiBzdWdnZXN0aW9uXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3Byb3BlcnR5TWFwID0gcmVxdWlyZSgnLi4vZGF0YS9wcm9wZXJ0eU1hcCcpO1xuXG52YXIgX3Byb3BlcnR5TWFwMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BlcnR5TWFwKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFRZUEUgPSAnU0hPUlRIQU5EX0xPTkdIQU5EJztcbnZhciBnZXRIaW50ID0gZnVuY3Rpb24gZ2V0SGludChzaG9ydGhhbmQsIGxvbmdoYW5kcykge1xuICByZXR1cm4gJ0RvIG5vdCBtaXggbG9uZ2hhbmRzIFxcJycgKyBsb25naGFuZHMuam9pbignLCAnKSArICdcXCcgd2l0aCB0aGVpciBzaG9ydGhhbmQgXFwnJyArIHNob3J0aGFuZCArICdcXCcuJztcbn07XG5cbi8vIENoZWNrcyBpZiBhbnkgbG9uZ2hhbmQgYW5kIHNob3J0aGFuZCB2YWx1ZXMgYXJlIG1peGVkIHRvZ2V0aGVyXG4vLyBBIGxvdCB3YXMgdGFrZW4gZnJvbSBSYWRpdW0ncyBjaGVjay1wcm9wcy1wbHVnaW4gb24gMTIvMDcvMjAxNSBhbmQgaW1wcm92ZWRcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Gb3JtaWRhYmxlTGFicy9yYWRpdW0vYmxvYi9tYXN0ZXIvc3JjL3BsdWdpbnMvY2hlY2stcHJvcHMtcGx1Z2luLmpzXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdHlsZXMsIGVsZW1lbnQsIHdhcm5pbmdzKSB7XG4gIHZhciBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc3R5bGVzKTtcblxuICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKHNob3J0aGFuZCkge1xuICAgIC8vIENoZWNrIGlmIHByb3BlcnR5IGlzIGEgc2hvcnRoYW5kIHByb3BlcnR5XG4gICAgaWYgKF9wcm9wZXJ0eU1hcDIuZGVmYXVsdFtzaG9ydGhhbmRdICYmIF9wcm9wZXJ0eU1hcDIuZGVmYXVsdFtzaG9ydGhhbmRdLmxvbmdoYW5kcykge1xuICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxvbmdoYW5kID0gX3Byb3BlcnR5TWFwMi5kZWZhdWx0W3Nob3J0aGFuZF0ubG9uZ2hhbmRzO1xuICAgICAgICB2YXIgdXNlZExvbmdoYW5kcyA9IFtdO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGFueSBsb25naGFuZCBwcm9wZXJ0eSB3YXMgdXNlZCBuZXh0IHRvIHRoZSBzaG9ydGhhbmRcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgIGlmIChsb25naGFuZC5pbmRleE9mKHByb3BlcnR5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIC8vIGFkZCB0aGVtIHRvIGEgbGlzdCBvZiB1c2VkIGxvbmdoYW5kc1xuICAgICAgICAgICAgdXNlZExvbmdoYW5kcy5wdXNoKHByb3BlcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh1c2VkTG9uZ2hhbmRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB3YXJuaW5ncy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFRZUEUsXG4gICAgICAgICAgICBoaW50OiBnZXRIaW50KHNob3J0aGFuZCwgdXNlZExvbmdoYW5kcyksXG4gICAgICAgICAgICBzaG9ydGhhbmQ6IHNob3J0aGFuZCxcbiAgICAgICAgICAgIGxvbmdoYW5kczogdXNlZExvbmdoYW5kc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGNocm9tZTogJ0Nocm9tZScsXG4gIGFuZHJvaWQ6ICdBbmRyb2lkJyxcbiAgZmlyZWZveDogJ0ZpcmVmb3gnLFxuICBpb3Nfc2FmOiAnaU9TIFNhZmFyaScsXG4gIHNhZmFyaTogJ1NhZmFyaScsXG4gIGllOiAnSW50ZXJuZXQgRXhwbG9yZXInLFxuICBpZV9tb2I6ICdtb2JpbGUgSW50ZXJuZXQgRXhwbG9yZXInLFxuICBlZGdlOiAnRWRnZScsXG4gIG9wZXJhOiAnT3BlcmEnLFxuICBvcF9taW5pOiAnTWluaScsXG4gIGFuZF91YzogJ0FuZHJvaWQgVUMgQnJvd3NlcicsXG4gIGFuZF9jaHI6ICdBbmRyb2lkIENocm9tZSdcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gYXJyICYmIEFycmF5LmlzQXJyYXkoYXJyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqIGluc3RhbmNlb2YgT2JqZWN0ID09PSB0cnVlICYmICFBcnJheS5pc0FycmF5KG9iaik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vLyBUYWtlbiBkaXJlY3RseSBmcm9tIFJlYWN0IGNvcmVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL21hc3Rlci9zcmMvcmVuZGVyZXJzL2RvbS9zaGFyZWQvQ1NTUHJvcGVydHkuanNcbnZhciB1bml0bGVzc1Byb3BlcnRpZXMgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiB0cnVlLFxuICBib3JkZXJJbWFnZU91dHNldDogdHJ1ZSxcbiAgYm94RmxleDogdHJ1ZSxcbiAgYm94RmxleEdyb3VwOiB0cnVlLFxuICBib3hPcmRpbmFsR3JvdXA6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBmbGV4OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFBvc2l0aXZlOiB0cnVlLFxuICBmbGV4U2hyaW5rOiB0cnVlLFxuICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gIGZsZXhPcmRlcjogdHJ1ZSxcbiAgZ3JpZFJvdzogdHJ1ZSxcbiAgZ3JpZENvbHVtbjogdHJ1ZSxcbiAgZm9udFdlaWdodDogdHJ1ZSxcbiAgbGluZUNsYW1wOiB0cnVlLFxuICBsaW5lSGVpZ2h0OiB0cnVlLFxuICBvcGFjaXR5OiB0cnVlLFxuICBvcmRlcjogdHJ1ZSxcbiAgb3JwaGFuczogdHJ1ZSxcbiAgdGFiU2l6ZTogdHJ1ZSxcbiAgd2lkb3dzOiB0cnVlLFxuICB6SW5kZXg6IHRydWUsXG4gIHpvb206IHRydWUsXG5cbiAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgc3RvcE9wYWNpdHk6IHRydWUsXG4gIHN0cm9rZURhc2hvZmZzZXQ6IHRydWUsXG4gIHN0cm9rZU9wYWNpdHk6IHRydWUsXG4gIHN0cm9rZVdpZHRoOiB0cnVlXG59O1xuXG52YXIgcHJlZml4ZXMgPSBbJ1dlYmtpdCcsICdtcycsICdNb3onLCAnTyddO1xudmFyIGdldFByZWZpeGVkS2V5ID0gZnVuY3Rpb24gZ2V0UHJlZml4ZWRLZXkocHJlZml4LCBrZXkpIHtcbiAgcmV0dXJuIHByZWZpeCArIGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKTtcbn07XG5cbi8vIFVzaW5nIE9iamVjdC5rZXlzIGhlcmUsIG9yIGVsc2UgdGhlIHZhbmlsbGEgZm9yLWluIGxvb3AgbWFrZXMgSUU4IGdvIGludG8gYW5cbi8vIGluZmluaXRlIGxvb3AsIGJlY2F1c2UgaXQgaXRlcmF0ZXMgb3ZlciB0aGUgbmV3bHkgYWRkZWQgcHJvcHMgdG9vLlxuT2JqZWN0LmtleXModW5pdGxlc3NQcm9wZXJ0aWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICByZXR1cm4gcHJlZml4ZXMuZm9yRWFjaChmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgcmV0dXJuIHVuaXRsZXNzUHJvcGVydGllc1tnZXRQcmVmaXhlZEtleShwcmVmaXgsIHByb3BlcnR5KV0gPSB0cnVlO1xuICB9KTtcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgcmV0dXJuIHVuaXRsZXNzUHJvcGVydGllc1twcm9wZXJ0eV0gPyB0cnVlIDogZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgY2hyb21lOiAzMCxcbiAgYW5kcm9pZDogNCxcbiAgZmlyZWZveDogMjUsXG4gIGlvc19zYWY6IDYsXG4gIHNhZmFyaTogNixcbiAgaWU6IDksXG4gIGllX21vYjogOSxcbiAgZWRnZTogMTIsXG4gIG9wZXJhOiAxMyxcbiAgb3BfbWluaTogNSxcbiAgYW5kX3VjOiA5LFxuICBhbmRfY2hyOiAzMFxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gIHZhciB1bnByZWZpeGVkID0gcHJvcGVydHkucmVwbGFjZSgvXihtc3xXZWJraXR8TW96fE8pLywgJycpO1xuICByZXR1cm4gdW5wcmVmaXhlZC5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHVucHJlZml4ZWQuc2xpY2UoMSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdW5wcmVmaXhQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vdW5wcmVmaXhQcm9wZXJ0eScpO1xuXG52YXIgX3VucHJlZml4UHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdW5wcmVmaXhQcm9wZXJ0eSk7XG5cbnZhciBfdW5wcmVmaXhWYWx1ZSA9IHJlcXVpcmUoJy4vdW5wcmVmaXhWYWx1ZScpO1xuXG52YXIgX3VucHJlZml4VmFsdWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdW5wcmVmaXhWYWx1ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdHlsZXMpIHtcbiAgdmFyIG5ld1N0eWxlcyA9IHt9O1xuXG4gIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICBuZXdTdHlsZXNbKDAsIF91bnByZWZpeFByb3BlcnR5Mi5kZWZhdWx0KShwcm9wZXJ0eSldID0gKDAsIF91bnByZWZpeFZhbHVlMi5kZWZhdWx0KShzdHlsZXNbcHJvcGVydHldKTtcbiAgfSk7XG5cbiAgcmV0dXJuIG5ld1N0eWxlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8oLW1zLXwtd2Via2l0LXwtbW96LXwtby0pL2csICcnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4ndXNlIHN0cmljdCc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gY2FsYztcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMgPSByZXF1aXJlKCcuLi91dGlscy9qb2luUHJlZml4ZWRSdWxlcycpO1xuXG52YXIgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNKb2luUHJlZml4ZWRSdWxlcyk7XG5cbmZ1bmN0aW9uIGNhbGMocHJvcGVydHksIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmluZGV4T2YoJ2NhbGMoJykgPiAtMSkge1xuICAgIHJldHVybiAoMCwgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMyWydkZWZhdWx0J10pKHByb3BlcnR5LCB2YWx1ZSwgZnVuY3Rpb24gKHByZWZpeCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9jYWxjXFwoL2csIHByZWZpeCArICdjYWxjKCcpO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBjdXJzb3I7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF91dGlsc0pvaW5QcmVmaXhlZFJ1bGVzID0gcmVxdWlyZSgnLi4vdXRpbHMvam9pblByZWZpeGVkUnVsZXMnKTtcblxudmFyIF91dGlsc0pvaW5QcmVmaXhlZFJ1bGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzSm9pblByZWZpeGVkUnVsZXMpO1xuXG52YXIgdmFsdWVzID0ge1xuICAnem9vbS1pbic6IHRydWUsXG4gICd6b29tLW91dCc6IHRydWUsXG4gICdncmFiJzogdHJ1ZSxcbiAgJ2dyYWJiaW5nJzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gY3Vyc29yKHByb3BlcnR5LCB2YWx1ZSkge1xuICBpZiAocHJvcGVydHkgPT09ICdjdXJzb3InICYmIHZhbHVlc1t2YWx1ZV0pIHtcbiAgICByZXR1cm4gKDAsIF91dGlsc0pvaW5QcmVmaXhlZFJ1bGVzMlsnZGVmYXVsdCddKShwcm9wZXJ0eSwgdmFsdWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBmbGV4O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UgPSByZXF1aXJlKCcuLi91dGlscy9jYW1lbFRvRGFzaENhc2UnKTtcblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0NhbWVsVG9EYXNoQ2FzZSk7XG5cbnZhciB2YWx1ZXMgPSB7XG4gICdmbGV4JzogdHJ1ZSxcbiAgJ2lubGluZS1mbGV4JzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZmxleChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgaWYgKHByb3BlcnR5ID09PSAnZGlzcGxheScgJiYgdmFsdWVzW3ZhbHVlXSkge1xuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiBbJy13ZWJraXQtYm94JywgJy1tb3otYm94JywgJy1tcy0nICsgdmFsdWUgKyAnYm94JywgJy13ZWJraXQtJyArIHZhbHVlLCB2YWx1ZV0uam9pbignOycgKyAoMCwgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMlsnZGVmYXVsdCddKShwcm9wZXJ0eSkgKyAnOicpXG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gZmxleGJveElFO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgYWx0ZXJuYXRpdmVWYWx1ZXMgPSB7XG4gICdzcGFjZS1hcm91bmQnOiAnZGlzdHJpYnV0ZScsXG4gICdzcGFjZS1iZXR3ZWVuJzogJ2p1c3RpZnknLFxuICAnZmxleC1zdGFydCc6ICdzdGFydCcsXG4gICdmbGV4LWVuZCc6ICdlbmQnXG59O1xudmFyIGFsdGVybmF0aXZlUHJvcHMgPSB7XG4gIGFsaWduQ29udGVudDogJ21zRmxleExpbmVQYWNrJyxcbiAgYWxpZ25TZWxmOiAnbXNGbGV4SXRlbUFsaWduJyxcbiAgYWxpZ25JdGVtczogJ21zRmxleEFsaWduJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdtc0ZsZXhQYWNrJyxcbiAgb3JkZXI6ICdtc0ZsZXhPcmRlcicsXG4gIGZsZXhHcm93OiAnbXNGbGV4UG9zaXRpdmUnLFxuICBmbGV4U2hyaW5rOiAnbXNGbGV4TmVnYXRpdmUnLFxuICBmbGV4QmFzaXM6ICdtc1ByZWZlcnJlZFNpemUnXG59O1xuXG5mdW5jdGlvbiBmbGV4Ym94SUUocHJvcGVydHksIHZhbHVlKSB7XG4gIGlmIChhbHRlcm5hdGl2ZVByb3BzW3Byb3BlcnR5XSkge1xuICAgIHJldHVybiBfZGVmaW5lUHJvcGVydHkoe30sIGFsdGVybmF0aXZlUHJvcHNbcHJvcGVydHldLCBhbHRlcm5hdGl2ZVZhbHVlc1t2YWx1ZV0gfHwgdmFsdWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBmbGV4Ym94T2xkO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UgPSByZXF1aXJlKCcuLi91dGlscy9jYW1lbFRvRGFzaENhc2UnKTtcblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0NhbWVsVG9EYXNoQ2FzZSk7XG5cbnZhciBhbHRlcm5hdGl2ZVZhbHVlcyA9IHtcbiAgJ3NwYWNlLWFyb3VuZCc6ICdqdXN0aWZ5JyxcbiAgJ3NwYWNlLWJldHdlZW4nOiAnanVzdGlmeScsXG4gICdmbGV4LXN0YXJ0JzogJ3N0YXJ0JyxcbiAgJ2ZsZXgtZW5kJzogJ2VuZCcsXG4gICd3cmFwLXJldmVyc2UnOiAnbXVsdGlwbGUnLFxuICB3cmFwOiAnbXVsdGlwbGUnXG59O1xuXG52YXIgYWx0ZXJuYXRpdmVQcm9wcyA9IHtcbiAgYWxpZ25JdGVtczogJ1dlYmtpdEJveEFsaWduJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdXZWJraXRCb3hQYWNrJyxcbiAgZmxleFdyYXA6ICdXZWJraXRCb3hMaW5lcydcbn07XG5cbmZ1bmN0aW9uIGZsZXhib3hPbGQocHJvcGVydHksIHZhbHVlKSB7XG4gIGlmIChwcm9wZXJ0eSA9PT0gJ2ZsZXhEaXJlY3Rpb24nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFdlYmtpdEJveE9yaWVudDogdmFsdWUuaW5kZXhPZignY29sdW1uJykgPiAtMSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcsXG4gICAgICBXZWJraXRCb3hEaXJlY3Rpb246IHZhbHVlLmluZGV4T2YoJ3JldmVyc2UnKSA+IC0xID8gJ3JldmVyc2UnIDogJ25vcm1hbCdcbiAgICB9O1xuICB9XG4gIGlmIChhbHRlcm5hdGl2ZVByb3BzW3Byb3BlcnR5XSkge1xuICAgIHJldHVybiBfZGVmaW5lUHJvcGVydHkoe30sIGFsdGVybmF0aXZlUHJvcHNbcHJvcGVydHldLCBhbHRlcm5hdGl2ZVZhbHVlc1t2YWx1ZV0gfHwgdmFsdWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBncmFkaWVudDtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMgPSByZXF1aXJlKCcuLi91dGlscy9qb2luUHJlZml4ZWRSdWxlcycpO1xuXG52YXIgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNKb2luUHJlZml4ZWRSdWxlcyk7XG5cbnZhciB2YWx1ZXMgPSAvbGluZWFyLWdyYWRpZW50fHJhZGlhbC1ncmFkaWVudHxyZXBlYXRpbmctbGluZWFyLWdyYWRpZW50fHJlcGVhdGluZy1yYWRpYWwtZ3JhZGllbnQvO1xuXG5mdW5jdGlvbiBncmFkaWVudChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubWF0Y2godmFsdWVzKSAhPT0gbnVsbCkge1xuICAgIHJldHVybiAoMCwgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMyWydkZWZhdWx0J10pKHByb3BlcnR5LCB2YWx1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHNpemluZztcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMgPSByZXF1aXJlKCcuLi91dGlscy9qb2luUHJlZml4ZWRSdWxlcycpO1xuXG52YXIgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNKb2luUHJlZml4ZWRSdWxlcyk7XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICBtYXhIZWlnaHQ6IHRydWUsXG4gIG1heFdpZHRoOiB0cnVlLFxuICB3aWR0aDogdHJ1ZSxcbiAgaGVpZ2h0OiB0cnVlLFxuICBjb2x1bW5XaWR0aDogdHJ1ZSxcbiAgbWluV2lkdGg6IHRydWUsXG4gIG1pbkhlaWdodDogdHJ1ZVxufTtcbnZhciB2YWx1ZXMgPSB7XG4gICdtaW4tY29udGVudCc6IHRydWUsXG4gICdtYXgtY29udGVudCc6IHRydWUsXG4gICdmaWxsLWF2YWlsYWJsZSc6IHRydWUsXG4gICdmaXQtY29udGVudCc6IHRydWUsXG4gICdjb250YWluLWZsb2F0cyc6IHRydWVcbn07XG5cbmZ1bmN0aW9uIHNpemluZyhwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgaWYgKHByb3BlcnRpZXNbcHJvcGVydHldICYmIHZhbHVlc1t2YWx1ZV0pIHtcbiAgICByZXR1cm4gKDAsIF91dGlsc0pvaW5QcmVmaXhlZFJ1bGVzMlsnZGVmYXVsdCddKShwcm9wZXJ0eSwgdmFsdWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSB0cmFuc2l0aW9uO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UgPSByZXF1aXJlKCcuLi91dGlscy9jYW1lbFRvRGFzaENhc2UnKTtcblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0NhbWVsVG9EYXNoQ2FzZSk7XG5cbnZhciBfdXRpbHNDYXBpdGFsaXplU3RyaW5nID0gcmVxdWlyZSgnLi4vdXRpbHMvY2FwaXRhbGl6ZVN0cmluZycpO1xuXG52YXIgX3V0aWxzQ2FwaXRhbGl6ZVN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0NhcGl0YWxpemVTdHJpbmcpO1xuXG52YXIgX3V0aWxzVW5wcmVmaXhQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL3V0aWxzL3VucHJlZml4UHJvcGVydHknKTtcblxudmFyIF91dGlsc1VucHJlZml4UHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNVbnByZWZpeFByb3BlcnR5KTtcblxudmFyIF9wcmVmaXhQcm9wcyA9IHJlcXVpcmUoJy4uL3ByZWZpeFByb3BzJyk7XG5cbnZhciBfcHJlZml4UHJvcHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJlZml4UHJvcHMpO1xuXG52YXIgcHJvcGVydGllcyA9IHsgdHJhbnNpdGlvbjogdHJ1ZSwgdHJhbnNpdGlvblByb3BlcnR5OiB0cnVlIH07XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb24ocHJvcGVydHksIHZhbHVlKSB7XG4gIC8vIGFsc28gY2hlY2sgZm9yIGFscmVhZHkgcHJlZml4ZWQgdHJhbnNpdGlvbnNcbiAgdmFyIHVucHJlZml4ZWRQcm9wZXJ0eSA9ICgwLCBfdXRpbHNVbnByZWZpeFByb3BlcnR5MlsnZGVmYXVsdCddKShwcm9wZXJ0eSk7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHByb3BlcnRpZXNbdW5wcmVmaXhlZFByb3BlcnR5XSkge1xuICAgIHZhciBfcmVmMjtcblxuICAgIHZhciBfcmV0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIG9ubHkgc3BsaXQgbXVsdGkgdmFsdWVzLCBub3QgY3ViaWMgYmV6aWVyc1xuICAgICAgdmFyIG11bHRpcGxlVmFsdWVzID0gdmFsdWUuc3BsaXQoLywoPyFbXigpXSooPzpcXChbXigpXSpcXCkpP1xcKSkvZyk7XG5cbiAgICAgIC8vIGl0ZXJhdGUgZWFjaCBzaW5nbGUgdmFsdWUgYW5kIGNoZWNrIGZvciB0cmFuc2l0aW9uZWQgcHJvcGVydGllc1xuICAgICAgLy8gdGhhdCBuZWVkIHRvIGJlIHByZWZpeGVkIGFzIHdlbGxcbiAgICAgIG11bHRpcGxlVmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKHZhbCwgaW5kZXgpIHtcbiAgICAgICAgbXVsdGlwbGVWYWx1ZXNbaW5kZXhdID0gT2JqZWN0LmtleXMoX3ByZWZpeFByb3BzMlsnZGVmYXVsdCddKS5yZWR1Y2UoZnVuY3Rpb24gKG91dCwgcHJlZml4KSB7XG4gICAgICAgICAgdmFyIGRhc2hDYXNlUHJlZml4ID0gJy0nICsgcHJlZml4LnRvTG93ZXJDYXNlKCkgKyAnLSc7XG5cbiAgICAgICAgICBPYmplY3Qua2V5cyhfcHJlZml4UHJvcHMyWydkZWZhdWx0J11bcHJlZml4XSkuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgdmFyIGRhc2hDYXNlUHJvcGVydHkgPSAoMCwgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMlsnZGVmYXVsdCddKShwcm9wKTtcbiAgICAgICAgICAgIGlmICh2YWwuaW5kZXhPZihkYXNoQ2FzZVByb3BlcnR5KSA+IC0xKSB7XG4gICAgICAgICAgICAgIC8vIGpvaW4gYWxsIHByZWZpeGVzIGFuZCBjcmVhdGUgYSBuZXcgdmFsdWVcbiAgICAgICAgICAgICAgb3V0ID0gdmFsLnJlcGxhY2UoZGFzaENhc2VQcm9wZXJ0eSwgZGFzaENhc2VQcmVmaXggKyBkYXNoQ2FzZVByb3BlcnR5KSArICcsJyArIG91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9LCB2YWwpO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBvdXRwdXRWYWx1ZSA9IG11bHRpcGxlVmFsdWVzLmpvaW4oJywnKTtcblxuICAgICAgaWYgKHVucHJlZml4ZWRQcm9wZXJ0eSAhPT0gcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2OiBfZGVmaW5lUHJvcGVydHkoe30sIHByb3BlcnR5LCBvdXRwdXRWYWx1ZSlcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdjogKF9yZWYyID0ge30sIF9kZWZpbmVQcm9wZXJ0eShfcmVmMiwgJ1dlYmtpdCcgKyAoMCwgX3V0aWxzQ2FwaXRhbGl6ZVN0cmluZzJbJ2RlZmF1bHQnXSkocHJvcGVydHkpLCBvdXRwdXRWYWx1ZS5zcGxpdCgnLCcpLmZpbHRlcihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUubWF0Y2goLy1tb3otfC1tcy0vKSA9PT0gbnVsbDtcbiAgICAgICAgfSkuam9pbignLCcpKSwgX2RlZmluZVByb3BlcnR5KF9yZWYyLCBwcm9wZXJ0eSwgb3V0cHV0VmFsdWUpLCBfcmVmMilcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGlmICh0eXBlb2YgX3JldCA9PT0gJ29iamVjdCcpIHJldHVybiBfcmV0LnY7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHByZWZpeEFsbDtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3ByZWZpeFByb3BzID0gcmVxdWlyZSgnLi9wcmVmaXhQcm9wcycpO1xuXG52YXIgX3ByZWZpeFByb3BzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ByZWZpeFByb3BzKTtcblxudmFyIF91dGlsc0NhcGl0YWxpemVTdHJpbmcgPSByZXF1aXJlKCcuL3V0aWxzL2NhcGl0YWxpemVTdHJpbmcnKTtcblxudmFyIF91dGlsc0NhcGl0YWxpemVTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNDYXBpdGFsaXplU3RyaW5nKTtcblxudmFyIF91dGlsc0Fzc2lnbiA9IHJlcXVpcmUoJy4vdXRpbHMvYXNzaWduJyk7XG5cbnZhciBfdXRpbHNBc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNBc3NpZ24pO1xuXG52YXIgX3BsdWdpbnNDYWxjID0gcmVxdWlyZSgnLi9wbHVnaW5zL2NhbGMnKTtcblxudmFyIF9wbHVnaW5zQ2FsYzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zQ2FsYyk7XG5cbnZhciBfcGx1Z2luc0N1cnNvciA9IHJlcXVpcmUoJy4vcGx1Z2lucy9jdXJzb3InKTtcblxudmFyIF9wbHVnaW5zQ3Vyc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsdWdpbnNDdXJzb3IpO1xuXG52YXIgX3BsdWdpbnNGbGV4ID0gcmVxdWlyZSgnLi9wbHVnaW5zL2ZsZXgnKTtcblxudmFyIF9wbHVnaW5zRmxleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zRmxleCk7XG5cbnZhciBfcGx1Z2luc1NpemluZyA9IHJlcXVpcmUoJy4vcGx1Z2lucy9zaXppbmcnKTtcblxudmFyIF9wbHVnaW5zU2l6aW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsdWdpbnNTaXppbmcpO1xuXG52YXIgX3BsdWdpbnNHcmFkaWVudCA9IHJlcXVpcmUoJy4vcGx1Z2lucy9ncmFkaWVudCcpO1xuXG52YXIgX3BsdWdpbnNHcmFkaWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zR3JhZGllbnQpO1xuXG52YXIgX3BsdWdpbnNUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9wbHVnaW5zL3RyYW5zaXRpb24nKTtcblxudmFyIF9wbHVnaW5zVHJhbnNpdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zVHJhbnNpdGlvbik7XG5cbi8vIHNwZWNpYWwgZmxleGJveCBzcGVjaWZpY2F0aW9uc1xuXG52YXIgX3BsdWdpbnNGbGV4Ym94SUUgPSByZXF1aXJlKCcuL3BsdWdpbnMvZmxleGJveElFJyk7XG5cbnZhciBfcGx1Z2luc0ZsZXhib3hJRTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zRmxleGJveElFKTtcblxudmFyIF9wbHVnaW5zRmxleGJveE9sZCA9IHJlcXVpcmUoJy4vcGx1Z2lucy9mbGV4Ym94T2xkJyk7XG5cbnZhciBfcGx1Z2luc0ZsZXhib3hPbGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGx1Z2luc0ZsZXhib3hPbGQpO1xuXG52YXIgcGx1Z2lucyA9IFtfcGx1Z2luc0NhbGMyWydkZWZhdWx0J10sIF9wbHVnaW5zQ3Vyc29yMlsnZGVmYXVsdCddLCBfcGx1Z2luc1NpemluZzJbJ2RlZmF1bHQnXSwgX3BsdWdpbnNHcmFkaWVudDJbJ2RlZmF1bHQnXSwgX3BsdWdpbnNUcmFuc2l0aW9uMlsnZGVmYXVsdCddLCBfcGx1Z2luc0ZsZXhib3hJRTJbJ2RlZmF1bHQnXSwgX3BsdWdpbnNGbGV4Ym94T2xkMlsnZGVmYXVsdCddLCBfcGx1Z2luc0ZsZXgyWydkZWZhdWx0J11dO1xuXG4vKipcbiAqIFJldHVybnMgYSBwcmVmaXhlZCB2ZXJzaW9uIG9mIHRoZSBzdHlsZSBvYmplY3QgdXNpbmcgYWxsIHZlbmRvciBwcmVmaXhlc1xuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIFN0eWxlIG9iamVjdCB0aGF0IGdldHMgcHJlZml4ZWQgcHJvcGVydGllcyBhZGRlZFxuICogQHJldHVybnMge09iamVjdH0gLSBTdHlsZSBvYmplY3Qgd2l0aCBwcmVmaXhlZCBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXNcbiAqL1xuXG5mdW5jdGlvbiBwcmVmaXhBbGwoc3R5bGVzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZXMpLnJlZHVjZShmdW5jdGlvbiAocHJlZml4ZWRTdHlsZXMsIHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIC8vIHJlY3Vyc2UgdGhyb3VnaCBuZXN0ZWQgc3R5bGUgb2JqZWN0c1xuICAgICAgcHJlZml4ZWRTdHlsZXNbcHJvcGVydHldID0gcHJlZml4QWxsKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmtleXMoX3ByZWZpeFByb3BzMlsnZGVmYXVsdCddKS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBfcHJlZml4UHJvcHMyWydkZWZhdWx0J11bcHJlZml4XTtcbiAgICAgICAgLy8gYWRkIHByZWZpeGVzIGlmIG5lZWRlZFxuICAgICAgICBpZiAocHJvcGVydGllc1twcm9wZXJ0eV0pIHtcbiAgICAgICAgICBwcmVmaXhlZFN0eWxlc1twcmVmaXggKyAoMCwgX3V0aWxzQ2FwaXRhbGl6ZVN0cmluZzJbJ2RlZmF1bHQnXSkocHJvcGVydHkpXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gcmVzb2x2ZSBldmVyeSBzcGVjaWFsIHBsdWdpbnNcbiAgICAgIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiAoMCwgX3V0aWxzQXNzaWduMlsnZGVmYXVsdCddKShwcmVmaXhlZFN0eWxlcywgcGx1Z2luKHByb3BlcnR5LCB2YWx1ZSkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZWZpeGVkU3R5bGVzO1xuICB9LCBzdHlsZXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0geyBcIldlYmtpdFwiOiB7IFwidHJhbnNmb3JtXCI6IHRydWUsIFwidHJhbnNmb3JtT3JpZ2luXCI6IHRydWUsIFwidHJhbnNmb3JtT3JpZ2luWFwiOiB0cnVlLCBcInRyYW5zZm9ybU9yaWdpbllcIjogdHJ1ZSwgXCJiYWNrZmFjZVZpc2liaWxpdHlcIjogdHJ1ZSwgXCJwZXJzcGVjdGl2ZVwiOiB0cnVlLCBcInBlcnNwZWN0aXZlT3JpZ2luXCI6IHRydWUsIFwidHJhbnNmb3JtU3R5bGVcIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5aXCI6IHRydWUsIFwiYW5pbWF0aW9uXCI6IHRydWUsIFwiYW5pbWF0aW9uRGVsYXlcIjogdHJ1ZSwgXCJhbmltYXRpb25EaXJlY3Rpb25cIjogdHJ1ZSwgXCJhbmltYXRpb25GaWxsTW9kZVwiOiB0cnVlLCBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IHRydWUsIFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogdHJ1ZSwgXCJhbmltYXRpb25OYW1lXCI6IHRydWUsIFwiYW5pbWF0aW9uUGxheVN0YXRlXCI6IHRydWUsIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogdHJ1ZSwgXCJhcHBlYXJhbmNlXCI6IHRydWUsIFwidXNlclNlbGVjdFwiOiB0cnVlLCBcImZvbnRLZXJuaW5nXCI6IHRydWUsIFwidGV4dEVtcGhhc2lzUG9zaXRpb25cIjogdHJ1ZSwgXCJ0ZXh0RW1waGFzaXNcIjogdHJ1ZSwgXCJ0ZXh0RW1waGFzaXNTdHlsZVwiOiB0cnVlLCBcInRleHRFbXBoYXNpc0NvbG9yXCI6IHRydWUsIFwiYm94RGVjb3JhdGlvbkJyZWFrXCI6IHRydWUsIFwiY2xpcFBhdGhcIjogdHJ1ZSwgXCJtYXNrSW1hZ2VcIjogdHJ1ZSwgXCJtYXNrTW9kZVwiOiB0cnVlLCBcIm1hc2tSZXBlYXRcIjogdHJ1ZSwgXCJtYXNrUG9zaXRpb25cIjogdHJ1ZSwgXCJtYXNrQ2xpcFwiOiB0cnVlLCBcIm1hc2tPcmlnaW5cIjogdHJ1ZSwgXCJtYXNrU2l6ZVwiOiB0cnVlLCBcIm1hc2tDb21wb3NpdGVcIjogdHJ1ZSwgXCJtYXNrXCI6IHRydWUsIFwibWFza0JvcmRlclNvdXJjZVwiOiB0cnVlLCBcIm1hc2tCb3JkZXJNb2RlXCI6IHRydWUsIFwibWFza0JvcmRlclNsaWNlXCI6IHRydWUsIFwibWFza0JvcmRlcldpZHRoXCI6IHRydWUsIFwibWFza0JvcmRlck91dHNldFwiOiB0cnVlLCBcIm1hc2tCb3JkZXJSZXBlYXRcIjogdHJ1ZSwgXCJtYXNrQm9yZGVyXCI6IHRydWUsIFwibWFza1R5cGVcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvblN0eWxlXCI6IHRydWUsIFwidGV4dERlY29yYXRpb25Ta2lwXCI6IHRydWUsIFwidGV4dERlY29yYXRpb25MaW5lXCI6IHRydWUsIFwidGV4dERlY29yYXRpb25Db2xvclwiOiB0cnVlLCBcImZpbHRlclwiOiB0cnVlLCBcImZvbnRGZWF0dXJlU2V0dGluZ3NcIjogdHJ1ZSwgXCJicmVha0FmdGVyXCI6IHRydWUsIFwiYnJlYWtCZWZvcmVcIjogdHJ1ZSwgXCJicmVha0luc2lkZVwiOiB0cnVlLCBcImNvbHVtbkNvdW50XCI6IHRydWUsIFwiY29sdW1uRmlsbFwiOiB0cnVlLCBcImNvbHVtbkdhcFwiOiB0cnVlLCBcImNvbHVtblJ1bGVcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlQ29sb3JcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlU3R5bGVcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlV2lkdGhcIjogdHJ1ZSwgXCJjb2x1bW5zXCI6IHRydWUsIFwiY29sdW1uU3BhblwiOiB0cnVlLCBcImNvbHVtbldpZHRoXCI6IHRydWUsIFwiZmxleFwiOiB0cnVlLCBcImZsZXhCYXNpc1wiOiB0cnVlLCBcImZsZXhEaXJlY3Rpb25cIjogdHJ1ZSwgXCJmbGV4R3Jvd1wiOiB0cnVlLCBcImZsZXhGbG93XCI6IHRydWUsIFwiZmxleFNocmlua1wiOiB0cnVlLCBcImZsZXhXcmFwXCI6IHRydWUsIFwiYWxpZ25Db250ZW50XCI6IHRydWUsIFwiYWxpZ25JdGVtc1wiOiB0cnVlLCBcImFsaWduU2VsZlwiOiB0cnVlLCBcImp1c3RpZnlDb250ZW50XCI6IHRydWUsIFwib3JkZXJcIjogdHJ1ZSwgXCJ0cmFuc2l0aW9uXCI6IHRydWUsIFwidHJhbnNpdGlvbkRlbGF5XCI6IHRydWUsIFwidHJhbnNpdGlvbkR1cmF0aW9uXCI6IHRydWUsIFwidHJhbnNpdGlvblByb3BlcnR5XCI6IHRydWUsIFwidHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uXCI6IHRydWUsIFwiYmFja2Ryb3BGaWx0ZXJcIjogdHJ1ZSwgXCJzY3JvbGxTbmFwVHlwZVwiOiB0cnVlLCBcInNjcm9sbFNuYXBQb2ludHNYXCI6IHRydWUsIFwic2Nyb2xsU25hcFBvaW50c1lcIjogdHJ1ZSwgXCJzY3JvbGxTbmFwRGVzdGluYXRpb25cIjogdHJ1ZSwgXCJzY3JvbGxTbmFwQ29vcmRpbmF0ZVwiOiB0cnVlLCBcInNoYXBlSW1hZ2VUaHJlc2hvbGRcIjogdHJ1ZSwgXCJzaGFwZUltYWdlTWFyZ2luXCI6IHRydWUsIFwic2hhcGVJbWFnZU91dHNpZGVcIjogdHJ1ZSwgXCJoeXBoZW5zXCI6IHRydWUsIFwiZmxvd0ludG9cIjogdHJ1ZSwgXCJmbG93RnJvbVwiOiB0cnVlLCBcInJlZ2lvbkZyYWdtZW50XCI6IHRydWUsIFwidGV4dFNpemVBZGp1c3RcIjogdHJ1ZSwgXCJib3JkZXJJbWFnZVwiOiB0cnVlLCBcImJvcmRlckltYWdlT3V0c2V0XCI6IHRydWUsIFwiYm9yZGVySW1hZ2VSZXBlYXRcIjogdHJ1ZSwgXCJib3JkZXJJbWFnZVNsaWNlXCI6IHRydWUsIFwiYm9yZGVySW1hZ2VTb3VyY2VcIjogdHJ1ZSwgXCJib3JkZXJJbWFnZVdpZHRoXCI6IHRydWUsIFwidGFiU2l6ZVwiOiB0cnVlLCBcIm9iamVjdEZpdFwiOiB0cnVlLCBcIm9iamVjdFBvc2l0aW9uXCI6IHRydWUgfSwgXCJNb3pcIjogeyBcImFwcGVhcmFuY2VcIjogdHJ1ZSwgXCJ1c2VyU2VsZWN0XCI6IHRydWUsIFwiYm94U2l6aW5nXCI6IHRydWUsIFwidGV4dEFsaWduTGFzdFwiOiB0cnVlLCBcInRleHREZWNvcmF0aW9uU3R5bGVcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvblNraXBcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvbkxpbmVcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvbkNvbG9yXCI6IHRydWUsIFwidGFiU2l6ZVwiOiB0cnVlLCBcImh5cGhlbnNcIjogdHJ1ZSwgXCJmb250RmVhdHVyZVNldHRpbmdzXCI6IHRydWUsIFwiYnJlYWtBZnRlclwiOiB0cnVlLCBcImJyZWFrQmVmb3JlXCI6IHRydWUsIFwiYnJlYWtJbnNpZGVcIjogdHJ1ZSwgXCJjb2x1bW5Db3VudFwiOiB0cnVlLCBcImNvbHVtbkZpbGxcIjogdHJ1ZSwgXCJjb2x1bW5HYXBcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlXCI6IHRydWUsIFwiY29sdW1uUnVsZUNvbG9yXCI6IHRydWUsIFwiY29sdW1uUnVsZVN0eWxlXCI6IHRydWUsIFwiY29sdW1uUnVsZVdpZHRoXCI6IHRydWUsIFwiY29sdW1uc1wiOiB0cnVlLCBcImNvbHVtblNwYW5cIjogdHJ1ZSwgXCJjb2x1bW5XaWR0aFwiOiB0cnVlIH0sIFwibXNcIjogeyBcImZsZXhcIjogdHJ1ZSwgXCJmbGV4QmFzaXNcIjogZmFsc2UsIFwiZmxleERpcmVjdGlvblwiOiB0cnVlLCBcImZsZXhHcm93XCI6IGZhbHNlLCBcImZsZXhGbG93XCI6IHRydWUsIFwiZmxleFNocmlua1wiOiBmYWxzZSwgXCJmbGV4V3JhcFwiOiB0cnVlLCBcImFsaWduQ29udGVudFwiOiBmYWxzZSwgXCJhbGlnbkl0ZW1zXCI6IGZhbHNlLCBcImFsaWduU2VsZlwiOiBmYWxzZSwgXCJqdXN0aWZ5Q29udGVudFwiOiBmYWxzZSwgXCJvcmRlclwiOiBmYWxzZSwgXCJ0cmFuc2Zvcm1cIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5cIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5YXCI6IHRydWUsIFwidHJhbnNmb3JtT3JpZ2luWVwiOiB0cnVlLCBcInVzZXJTZWxlY3RcIjogdHJ1ZSwgXCJ3cmFwRmxvd1wiOiB0cnVlLCBcIndyYXBUaHJvdWdoXCI6IHRydWUsIFwid3JhcE1hcmdpblwiOiB0cnVlLCBcInNjcm9sbFNuYXBUeXBlXCI6IHRydWUsIFwic2Nyb2xsU25hcFBvaW50c1hcIjogdHJ1ZSwgXCJzY3JvbGxTbmFwUG9pbnRzWVwiOiB0cnVlLCBcInNjcm9sbFNuYXBEZXN0aW5hdGlvblwiOiB0cnVlLCBcInNjcm9sbFNuYXBDb29yZGluYXRlXCI6IHRydWUsIFwidG91Y2hBY3Rpb25cIjogdHJ1ZSwgXCJoeXBoZW5zXCI6IHRydWUsIFwiZmxvd0ludG9cIjogdHJ1ZSwgXCJmbG93RnJvbVwiOiB0cnVlLCBcImJyZWFrQmVmb3JlXCI6IHRydWUsIFwiYnJlYWtBZnRlclwiOiB0cnVlLCBcImJyZWFrSW5zaWRlXCI6IHRydWUsIFwicmVnaW9uRnJhZ21lbnRcIjogdHJ1ZSwgXCJncmlkVGVtcGxhdGVDb2x1bW5zXCI6IHRydWUsIFwiZ3JpZFRlbXBsYXRlUm93c1wiOiB0cnVlLCBcImdyaWRUZW1wbGF0ZUFyZWFzXCI6IHRydWUsIFwiZ3JpZFRlbXBsYXRlXCI6IHRydWUsIFwiZ3JpZEF1dG9Db2x1bW5zXCI6IHRydWUsIFwiZ3JpZEF1dG9Sb3dzXCI6IHRydWUsIFwiZ3JpZEF1dG9GbG93XCI6IHRydWUsIFwiZ3JpZFwiOiB0cnVlLCBcImdyaWRSb3dTdGFydFwiOiB0cnVlLCBcImdyaWRDb2x1bW5TdGFydFwiOiB0cnVlLCBcImdyaWRSb3dFbmRcIjogdHJ1ZSwgXCJncmlkUm93XCI6IHRydWUsIFwiZ3JpZENvbHVtblwiOiB0cnVlLCBcImdyaWRDb2x1bW5FbmRcIjogdHJ1ZSwgXCJncmlkQ29sdW1uR2FwXCI6IHRydWUsIFwiZ3JpZFJvd0dhcFwiOiB0cnVlLCBcImdyaWRBcmVhXCI6IHRydWUsIFwiZ3JpZEdhcFwiOiB0cnVlLCBcInRleHRTaXplQWRqdXN0XCI6IHRydWUgfSB9O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIvLyBsZWlnaHQgcG9seWZpbGwgZm9yIE9iamVjdC5hc3NpZ25cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChiYXNlKSB7XG4gIHZhciBleHRlbmQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGV4dGVuZCkucmVkdWNlKGZ1bmN0aW9uIChvdXQsIGtleSkge1xuICAgIGJhc2Vba2V5XSA9IGV4dGVuZFtrZXldO1xuICAgIHJldHVybiBvdXQ7XG4gIH0sIHt9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiLyoqXG4gKiBDb252ZXJ0cyBhIGNhbWVsLWNhc2Ugc3RyaW5nIHRvIGEgZGFzaC1jYXNlIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIHN0ciB0aGF0IGdldHMgY29udmVydGVkIHRvIGRhc2gtY2FzZVxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdfF4pKFtBLVpdKS9nLCBmdW5jdGlvbiAobWF0Y2gsIHAxLCBwMikge1xuICAgIHJldHVybiBwMSArICctJyArIHAyLnRvTG93ZXJDYXNlKCk7XG4gIH0pLnJlcGxhY2UoJ21zLScsICctbXMtJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIvLyBoZWxwZXIgdG8gY2FwaXRhbGl6ZSBzdHJpbmdzXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIF9jYW1lbFRvRGFzaENhc2UgPSByZXF1aXJlKCcuL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX2NhbWVsVG9EYXNoQ2FzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jYW1lbFRvRGFzaENhc2UpO1xuXG4vLyByZXR1cm5zIGEgc3R5bGUgb2JqZWN0IHdpdGggYSBzaW5nbGUgY29uY2F0ZWQgcHJlZml4ZWQgdmFsdWUgc3RyaW5nXG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgdmFyIHJlcGxhY2VyID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gZnVuY3Rpb24gKHByZWZpeCwgdmFsdWUpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgdmFsdWU7XG4gIH0gOiBhcmd1bWVudHNbMl07XG4gIHJldHVybiAoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfZGVmaW5lUHJvcGVydHkoe30sIHByb3BlcnR5LCBbJy13ZWJraXQtJywgJy1tb3otJywgJyddLm1hcChmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICByZXR1cm4gcmVwbGFjZXIocHJlZml4LCB2YWx1ZSk7XG4gICAgfSkuam9pbignOycgKyAoMCwgX2NhbWVsVG9EYXNoQ2FzZTJbJ2RlZmF1bHQnXSkocHJvcGVydHkpICsgJzonKSk7XG4gIH0pKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgdmFyIHVucHJlZml4ZWQgPSBwcm9wZXJ0eS5yZXBsYWNlKC9eKG1zfFdlYmtpdHxNb3p8TykvLCAnJyk7XG4gIHJldHVybiB1bnByZWZpeGVkLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgdW5wcmVmaXhlZC5zbGljZSgxKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBfaW5saW5lU3R5bGVQcmVmaXhBbGwgPSByZXF1aXJlKCdpbmxpbmUtc3R5bGUtcHJlZml4LWFsbCcpO1xuXG52YXIgX2lubGluZVN0eWxlUHJlZml4QWxsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lubGluZVN0eWxlUHJlZml4QWxsKTtcblxudmFyIF91dGlsc0dldEJyb3dzZXJJbmZvcm1hdGlvbiA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0QnJvd3NlckluZm9ybWF0aW9uJyk7XG5cbnZhciBfdXRpbHNHZXRCcm93c2VySW5mb3JtYXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNHZXRCcm93c2VySW5mb3JtYXRpb24pO1xuXG52YXIgX3V0aWxzR2V0UHJlZml4ZWRLZXlmcmFtZXMgPSByZXF1aXJlKCcuL3V0aWxzL2dldFByZWZpeGVkS2V5ZnJhbWVzJyk7XG5cbnZhciBfdXRpbHNHZXRQcmVmaXhlZEtleWZyYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0dldFByZWZpeGVkS2V5ZnJhbWVzKTtcblxudmFyIF91dGlsc0NhcGl0YWxpemVTdHJpbmcgPSByZXF1aXJlKCcuL3V0aWxzL2NhcGl0YWxpemVTdHJpbmcnKTtcblxudmFyIF91dGlsc0NhcGl0YWxpemVTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNDYXBpdGFsaXplU3RyaW5nKTtcblxudmFyIF91dGlsc0Fzc2lnbiA9IHJlcXVpcmUoJy4vdXRpbHMvYXNzaWduJyk7XG5cbnZhciBfdXRpbHNBc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNBc3NpZ24pO1xuXG52YXIgX3ByZWZpeFByb3BzID0gcmVxdWlyZSgnLi9wcmVmaXhQcm9wcycpO1xuXG52YXIgX3ByZWZpeFByb3BzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ByZWZpeFByb3BzKTtcblxudmFyIF9wbHVnaW5zQ2FsYyA9IHJlcXVpcmUoJy4vcGx1Z2lucy9jYWxjJyk7XG5cbnZhciBfcGx1Z2luc0NhbGMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGx1Z2luc0NhbGMpO1xuXG52YXIgX3BsdWdpbnNDdXJzb3IgPSByZXF1aXJlKCcuL3BsdWdpbnMvY3Vyc29yJyk7XG5cbnZhciBfcGx1Z2luc0N1cnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zQ3Vyc29yKTtcblxudmFyIF9wbHVnaW5zRmxleCA9IHJlcXVpcmUoJy4vcGx1Z2lucy9mbGV4Jyk7XG5cbnZhciBfcGx1Z2luc0ZsZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGx1Z2luc0ZsZXgpO1xuXG52YXIgX3BsdWdpbnNTaXppbmcgPSByZXF1aXJlKCcuL3BsdWdpbnMvc2l6aW5nJyk7XG5cbnZhciBfcGx1Z2luc1NpemluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zU2l6aW5nKTtcblxudmFyIF9wbHVnaW5zR3JhZGllbnQgPSByZXF1aXJlKCcuL3BsdWdpbnMvZ3JhZGllbnQnKTtcblxudmFyIF9wbHVnaW5zR3JhZGllbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGx1Z2luc0dyYWRpZW50KTtcblxudmFyIF9wbHVnaW5zVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vcGx1Z2lucy90cmFuc2l0aW9uJyk7XG5cbnZhciBfcGx1Z2luc1RyYW5zaXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGx1Z2luc1RyYW5zaXRpb24pO1xuXG4vLyBzcGVjaWFsIGZsZXhib3ggc3BlY2lmaWNhdGlvbnNcblxudmFyIF9wbHVnaW5zRmxleGJveElFID0gcmVxdWlyZSgnLi9wbHVnaW5zL2ZsZXhib3hJRScpO1xuXG52YXIgX3BsdWdpbnNGbGV4Ym94SUUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGx1Z2luc0ZsZXhib3hJRSk7XG5cbnZhciBfcGx1Z2luc0ZsZXhib3hPbGQgPSByZXF1aXJlKCcuL3BsdWdpbnMvZmxleGJveE9sZCcpO1xuXG52YXIgX3BsdWdpbnNGbGV4Ym94T2xkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsdWdpbnNGbGV4Ym94T2xkKTtcblxudmFyIHBsdWdpbnMgPSBbX3BsdWdpbnNDYWxjMlsnZGVmYXVsdCddLCBfcGx1Z2luc0N1cnNvcjJbJ2RlZmF1bHQnXSwgX3BsdWdpbnNTaXppbmcyWydkZWZhdWx0J10sIF9wbHVnaW5zR3JhZGllbnQyWydkZWZhdWx0J10sIF9wbHVnaW5zVHJhbnNpdGlvbjJbJ2RlZmF1bHQnXSwgX3BsdWdpbnNGbGV4Ym94SUUyWydkZWZhdWx0J10sIF9wbHVnaW5zRmxleGJveE9sZDJbJ2RlZmF1bHQnXSxcbi8vIHRoaXMgbXVzdCBiZSBydW4gQUZURVIgdGhlIGZsZXhib3ggc3BlY3Ncbl9wbHVnaW5zRmxleDJbJ2RlZmF1bHQnXV07XG5cbnZhciBQcmVmaXhlciA9IChmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBJbnN0YW50aWFudGUgYSBuZXcgcHJlZml4ZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJBZ2VudCAtIHVzZXJBZ2VudCB0byBnYXRoZXIgcHJlZml4IGluZm9ybWF0aW9uIGFjY29yZGluZyB0byBjYW5pdXNlLmNvbVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2VlcFVucHJlZml4ZWQgLSBrZWVwcyB1bnByZWZpeGVkIHByb3BlcnRpZXMgYW5kIHZhbHVlc1xuICAgKi9cblxuICBmdW5jdGlvbiBQcmVmaXhlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcmVmaXhlcik7XG5cbiAgICB2YXIgZGVmYXVsdFVzZXJBZ2VudCA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnID8gbmF2aWdhdG9yLnVzZXJBZ2VudCA6IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuX3VzZXJBZ2VudCA9IG9wdGlvbnMudXNlckFnZW50IHx8IGRlZmF1bHRVc2VyQWdlbnQ7XG4gICAgdGhpcy5fa2VlcFVucHJlZml4ZWQgPSBvcHRpb25zLmtlZXBVbnByZWZpeGVkIHx8IGZhbHNlO1xuXG4gICAgdGhpcy5fYnJvd3NlckluZm8gPSAoMCwgX3V0aWxzR2V0QnJvd3NlckluZm9ybWF0aW9uMlsnZGVmYXVsdCddKSh0aGlzLl91c2VyQWdlbnQpO1xuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSB1c2VyQWdlbnQgd2FzIHJlc29sdmVkIGNvcnJlY3RseVxuICAgIGlmICh0aGlzLl9icm93c2VySW5mbyAmJiB0aGlzLl9icm93c2VySW5mby5wcmVmaXgpIHtcbiAgICAgIC8vIHNldCBhZGRpdGlvbmFsIHByZWZpeCBpbmZvcm1hdGlvblxuICAgICAgdGhpcy5jc3NQcmVmaXggPSB0aGlzLl9icm93c2VySW5mby5wcmVmaXguY3NzO1xuICAgICAgdGhpcy5qc1ByZWZpeCA9IHRoaXMuX2Jyb3dzZXJJbmZvLnByZWZpeC5pbmxpbmU7XG4gICAgICB0aGlzLnByZWZpeGVkS2V5ZnJhbWVzID0gKDAsIF91dGlsc0dldFByZWZpeGVkS2V5ZnJhbWVzMlsnZGVmYXVsdCddKSh0aGlzLl9icm93c2VySW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3VzZVByZWZpeEFsbEZhbGxiYWNrID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgZGF0YSA9IHRoaXMuX2Jyb3dzZXJJbmZvLmJyb3dzZXIgJiYgX3ByZWZpeFByb3BzMlsnZGVmYXVsdCddW3RoaXMuX2Jyb3dzZXJJbmZvLmJyb3dzZXJdO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLl9yZXF1aXJlc1ByZWZpeCA9IE9iamVjdC5rZXlzKGRhdGEpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBkYXRhW2tleV0gPj0gX3RoaXMuX2Jyb3dzZXJJbmZvLnZlcnNpb247XG4gICAgICB9KS5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgbmFtZSkge1xuICAgICAgICByZXN1bHRbbmFtZV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSwge30pO1xuICAgICAgdGhpcy5faGFzUHJvcHNSZXF1aXJpbmdQcmVmaXggPSBPYmplY3Qua2V5cyh0aGlzLl9yZXF1aXJlc1ByZWZpeCkubGVuZ3RoID4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdXNlUHJlZml4QWxsRmFsbGJhY2sgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcHJlZml4ZWQgdmVyc2lvbiBvZiB0aGUgc3R5bGUgb2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBTdHlsZSBvYmplY3QgdGhhdCBnZXRzIHByZWZpeGVkIHByb3BlcnRpZXMgYWRkZWRcbiAgICogQHJldHVybnMge09iamVjdH0gLSBTdHlsZSBvYmplY3Qgd2l0aCBwcmVmaXhlZCBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXNcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKFByZWZpeGVyLCBbe1xuICAgIGtleTogJ3ByZWZpeCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZWZpeChzdHlsZXMpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAvLyB1c2UgcHJlZml4QWxsIGFzIGZhbGxiYWNrIGlmIHVzZXJBZ2VudCBjYW4gbm90IGJlIHJlc29sdmVkXG4gICAgICBpZiAodGhpcy5fdXNlUHJlZml4QWxsRmFsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuICgwLCBfaW5saW5lU3R5bGVQcmVmaXhBbGwyWydkZWZhdWx0J10pKHN0eWxlcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIG9ubHkgYWRkIHByZWZpeGVzIGlmIG5lZWRlZFxuICAgICAgaWYgKCF0aGlzLl9oYXNQcm9wc1JlcXVpcmluZ1ByZWZpeCkge1xuICAgICAgICByZXR1cm4gc3R5bGVzO1xuICAgICAgfVxuXG4gICAgICBzdHlsZXMgPSAoMCwgX3V0aWxzQXNzaWduMlsnZGVmYXVsdCddKSh7fSwgc3R5bGVzKTtcblxuICAgICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAvLyByZWN1cnNlIHRocm91Z2ggbmVzdGVkIHN0eWxlIG9iamVjdHNcbiAgICAgICAgICBzdHlsZXNbcHJvcGVydHldID0gX3RoaXMyLnByZWZpeCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYWRkIHByZWZpeGVzIGlmIG5lZWRlZFxuICAgICAgICAgIGlmIChfdGhpczIuX3JlcXVpcmVzUHJlZml4W3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgc3R5bGVzW190aGlzMi5qc1ByZWZpeCArICgwLCBfdXRpbHNDYXBpdGFsaXplU3RyaW5nMlsnZGVmYXVsdCddKShwcm9wZXJ0eSldID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAoIV90aGlzMi5fa2VlcFVucHJlZml4ZWQpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHN0eWxlc1twcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmVzb2x2ZSBwbHVnaW5zXG4gICAgICAgICAgcGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlcyBhIG5ldyBwbHVnaW4gaW50ZXJmYWNlIHdpdGggY3VycmVudCBkYXRhXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZWRTdHlsZXMgPSBwbHVnaW4oe1xuICAgICAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgc3R5bGVzOiBzdHlsZXMsXG4gICAgICAgICAgICAgIGJyb3dzZXJJbmZvOiBfdGhpczIuX2Jyb3dzZXJJbmZvLFxuICAgICAgICAgICAgICBwcmVmaXg6IHtcbiAgICAgICAgICAgICAgICBqczogX3RoaXMyLmpzUHJlZml4LFxuICAgICAgICAgICAgICAgIGNzczogX3RoaXMyLmNzc1ByZWZpeCxcbiAgICAgICAgICAgICAgICBrZXlmcmFtZXM6IF90aGlzMi5wcmVmaXhlZEtleWZyYW1lc1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBrZWVwVW5wcmVmaXhlZDogX3RoaXMyLl9rZWVwVW5wcmVmaXhlZCxcbiAgICAgICAgICAgICAgcmVxdWlyZXNQcmVmaXg6IF90aGlzMi5fcmVxdWlyZXNQcmVmaXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgKDAsIF91dGlsc0Fzc2lnbjJbJ2RlZmF1bHQnXSkoc3R5bGVzLCByZXNvbHZlZFN0eWxlcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcmVmaXhlZCB2ZXJzaW9uIG9mIHRoZSBzdHlsZSBvYmplY3QgdXNpbmcgYWxsIHZlbmRvciBwcmVmaXhlc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBTdHlsZSBvYmplY3QgdGhhdCBnZXRzIHByZWZpeGVkIHByb3BlcnRpZXMgYWRkZWRcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIFN0eWxlIG9iamVjdCB3aXRoIHByZWZpeGVkIHByb3BlcnRpZXMgYW5kIHZhbHVlc1xuICAgICAqL1xuICB9XSwgW3tcbiAgICBrZXk6ICdwcmVmaXhBbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVmaXhBbGwoc3R5bGVzKSB7XG4gICAgICByZXR1cm4gKDAsIF9pbmxpbmVTdHlsZVByZWZpeEFsbDJbJ2RlZmF1bHQnXSkoc3R5bGVzKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUHJlZml4ZXI7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQcmVmaXhlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBjYWxjO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UgPSByZXF1aXJlKCcuLi91dGlscy9jYW1lbFRvRGFzaENhc2UnKTtcblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0NhbWVsVG9EYXNoQ2FzZSk7XG5cbmZ1bmN0aW9uIGNhbGMoX3JlZjIpIHtcbiAgdmFyIHByb3BlcnR5ID0gX3JlZjIucHJvcGVydHk7XG4gIHZhciB2YWx1ZSA9IF9yZWYyLnZhbHVlO1xuICB2YXIgX3JlZjIkYnJvd3NlckluZm8gPSBfcmVmMi5icm93c2VySW5mbztcbiAgdmFyIGJyb3dzZXIgPSBfcmVmMiRicm93c2VySW5mby5icm93c2VyO1xuICB2YXIgdmVyc2lvbiA9IF9yZWYyJGJyb3dzZXJJbmZvLnZlcnNpb247XG4gIHZhciBjc3MgPSBfcmVmMi5wcmVmaXguY3NzO1xuICB2YXIga2VlcFVucHJlZml4ZWQgPSBfcmVmMi5rZWVwVW5wcmVmaXhlZDtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmRleE9mKCdjYWxjKCcpID4gLTEgJiYgKGJyb3dzZXIgPT09ICdmaXJlZm94JyAmJiB2ZXJzaW9uIDwgMTUgfHwgYnJvd3NlciA9PT0gJ2Nocm9tZScgJiYgdmVyc2lvbiA8IDI1IHx8IGJyb3dzZXIgPT09ICdzYWZhcmknICYmIHZlcnNpb24gPCA2LjEgfHwgYnJvd3NlciA9PT0gJ2lvc19zYWYnICYmIHZlcnNpb24gPCA3KSkge1xuICAgIHJldHVybiBfZGVmaW5lUHJvcGVydHkoe30sIHByb3BlcnR5LCB2YWx1ZS5yZXBsYWNlKC9jYWxjXFwoL2csIGNzcyArICdjYWxjKCcpICsgKGtlZXBVbnByZWZpeGVkID8gJzsnICsgKDAsIF91dGlsc0NhbWVsVG9EYXNoQ2FzZTJbJ2RlZmF1bHQnXSkocHJvcGVydHkpICsgJzonICsgdmFsdWUgOiAnJykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBjdXJzb3I7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIHZhbHVlcyA9IHtcbiAgJ3pvb20taW4nOiB0cnVlLFxuICAnem9vbS1vdXQnOiB0cnVlLFxuICAnZ3JhYic6IHRydWUsXG4gICdncmFiYmluZyc6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGN1cnNvcihfcmVmKSB7XG4gIHZhciBwcm9wZXJ0eSA9IF9yZWYucHJvcGVydHk7XG4gIHZhciB2YWx1ZSA9IF9yZWYudmFsdWU7XG4gIHZhciBfcmVmJGJyb3dzZXJJbmZvID0gX3JlZi5icm93c2VySW5mbztcbiAgdmFyIGJyb3dzZXIgPSBfcmVmJGJyb3dzZXJJbmZvLmJyb3dzZXI7XG4gIHZhciB2ZXJzaW9uID0gX3JlZiRicm93c2VySW5mby52ZXJzaW9uO1xuICB2YXIgY3NzID0gX3JlZi5wcmVmaXguY3NzO1xuICB2YXIga2VlcFVucHJlZml4ZWQgPSBfcmVmLmtlZXBVbnByZWZpeGVkO1xuXG4gIGlmIChwcm9wZXJ0eSA9PT0gJ2N1cnNvcicgJiYgdmFsdWVzW3ZhbHVlXSAmJiAoYnJvd3NlciA9PT0gJ2ZpcmVmb3gnICYmIHZlcnNpb24gPCAyNCB8fCBicm93c2VyID09PSAnY2hyb21lJyAmJiB2ZXJzaW9uIDwgMzcgfHwgYnJvd3NlciA9PT0gJ3NhZmFyaScgJiYgdmVyc2lvbiA8IDkgfHwgYnJvd3NlciA9PT0gJ29wZXJhJyAmJiB2ZXJzaW9uIDwgMjQpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnNvcjogY3NzICsgdmFsdWUgKyAoa2VlcFVucHJlZml4ZWQgPyAnOycgKyAoMCwgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMlsnZGVmYXVsdCddKShwcm9wZXJ0eSkgKyAnOicgKyB2YWx1ZSA6ICcnKVxuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZsZXg7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIHZhbHVlcyA9IHtcbiAgJ2ZsZXgnOiB0cnVlLFxuICAnaW5saW5lLWZsZXgnOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBmbGV4KF9yZWYpIHtcbiAgdmFyIHByb3BlcnR5ID0gX3JlZi5wcm9wZXJ0eTtcbiAgdmFyIHZhbHVlID0gX3JlZi52YWx1ZTtcbiAgdmFyIF9yZWYkYnJvd3NlckluZm8gPSBfcmVmLmJyb3dzZXJJbmZvO1xuICB2YXIgYnJvd3NlciA9IF9yZWYkYnJvd3NlckluZm8uYnJvd3NlcjtcbiAgdmFyIHZlcnNpb24gPSBfcmVmJGJyb3dzZXJJbmZvLnZlcnNpb247XG4gIHZhciBjc3MgPSBfcmVmLnByZWZpeC5jc3M7XG4gIHZhciBrZWVwVW5wcmVmaXhlZCA9IF9yZWYua2VlcFVucHJlZml4ZWQ7XG5cbiAgaWYgKHByb3BlcnR5ID09PSAnZGlzcGxheScgJiYgdmFsdWVzW3ZhbHVlXSAmJiAoYnJvd3NlciA9PT0gJ2Nocm9tZScgJiYgdmVyc2lvbiA8IDI5ICYmIHZlcnNpb24gPiAyMCB8fCAoYnJvd3NlciA9PT0gJ3NhZmFyaScgfHwgYnJvd3NlciA9PT0gJ2lvc19zYWYnKSAmJiB2ZXJzaW9uIDwgOSAmJiB2ZXJzaW9uID4gNiB8fCBicm93c2VyID09PSAnb3BlcmEnICYmICh2ZXJzaW9uID09IDE1IHx8IHZlcnNpb24gPT0gMTYpKSkge1xuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiBjc3MgKyB2YWx1ZSArIChrZWVwVW5wcmVmaXhlZCA/ICc7JyArICgwLCBfdXRpbHNDYW1lbFRvRGFzaENhc2UyWydkZWZhdWx0J10pKHByb3BlcnR5KSArICc6JyArIHZhbHVlIDogJycpXG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gZmxleGJveElFO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UgPSByZXF1aXJlKCcuLi91dGlscy9jYW1lbFRvRGFzaENhc2UnKTtcblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0NhbWVsVG9EYXNoQ2FzZSk7XG5cbnZhciBhbHRlcm5hdGl2ZVZhbHVlcyA9IHtcbiAgJ3NwYWNlLWFyb3VuZCc6ICdkaXN0cmlidXRlJyxcbiAgJ3NwYWNlLWJldHdlZW4nOiAnanVzdGlmeScsXG4gICdmbGV4LXN0YXJ0JzogJ3N0YXJ0JyxcbiAgJ2ZsZXgtZW5kJzogJ2VuZCcsXG4gIGZsZXg6ICdmbGV4Ym94JyxcbiAgJ2lubGluZS1mbGV4JzogJ2lubGluZS1mbGV4Ym94J1xufTtcbnZhciBhbHRlcm5hdGl2ZVByb3BzID0ge1xuICBhbGlnbkNvbnRlbnQ6ICdtc0ZsZXhMaW5lUGFjaycsXG4gIGFsaWduU2VsZjogJ21zRmxleEl0ZW1BbGlnbicsXG4gIGFsaWduSXRlbXM6ICdtc0ZsZXhBbGlnbicsXG4gIGp1c3RpZnlDb250ZW50OiAnbXNGbGV4UGFjaycsXG4gIG9yZGVyOiAnbXNGbGV4T3JkZXInLFxuICBmbGV4R3JvdzogJ21zRmxleFBvc2l0aXZlJyxcbiAgZmxleFNocmluazogJ21zRmxleE5lZ2F0aXZlJyxcbiAgZmxleEJhc2lzOiAnbXNQcmVmZXJyZWRTaXplJ1xufTtcblxudmFyIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhhbHRlcm5hdGl2ZVByb3BzKS5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgcHJvcCkge1xuICByZXN1bHRbcHJvcF0gPSB0cnVlO1xuICByZXR1cm4gcmVzdWx0O1xufSwge30pO1xuXG5mdW5jdGlvbiBmbGV4Ym94SUUoX3JlZjIpIHtcbiAgdmFyIHByb3BlcnR5ID0gX3JlZjIucHJvcGVydHk7XG4gIHZhciB2YWx1ZSA9IF9yZWYyLnZhbHVlO1xuICB2YXIgc3R5bGVzID0gX3JlZjIuc3R5bGVzO1xuICB2YXIgX3JlZjIkYnJvd3NlckluZm8gPSBfcmVmMi5icm93c2VySW5mbztcbiAgdmFyIGJyb3dzZXIgPSBfcmVmMiRicm93c2VySW5mby5icm93c2VyO1xuICB2YXIgdmVyc2lvbiA9IF9yZWYyJGJyb3dzZXJJbmZvLnZlcnNpb247XG4gIHZhciBjc3MgPSBfcmVmMi5wcmVmaXguY3NzO1xuICB2YXIga2VlcFVucHJlZml4ZWQgPSBfcmVmMi5rZWVwVW5wcmVmaXhlZDtcblxuICBpZiAoKHByb3BlcnRpZXNbcHJvcGVydHldIHx8IHByb3BlcnR5ID09PSAnZGlzcGxheScgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmRleE9mKCdmbGV4JykgPiAtMSkgJiYgKGJyb3dzZXIgPT09ICdpZV9tb2InIHx8IGJyb3dzZXIgPT09ICdpZScpICYmIHZlcnNpb24gPT0gMTApIHtcbiAgICBpZiAoIWtlZXBVbnByZWZpeGVkKSB7XG4gICAgICBkZWxldGUgc3R5bGVzW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgaWYgKHByb3BlcnR5ID09PSAnZGlzcGxheScgJiYgYWx0ZXJuYXRpdmVWYWx1ZXNbdmFsdWVdKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXNwbGF5OiBjc3MgKyBhbHRlcm5hdGl2ZVZhbHVlc1t2YWx1ZV0gKyAoa2VlcFVucHJlZml4ZWQgPyAnOycgKyAoMCwgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMlsnZGVmYXVsdCddKShwcm9wZXJ0eSkgKyAnOicgKyB2YWx1ZSA6ICcnKVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGFsdGVybmF0aXZlUHJvcHNbcHJvcGVydHldKSB7XG4gICAgICByZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LCBhbHRlcm5hdGl2ZVByb3BzW3Byb3BlcnR5XSwgYWx0ZXJuYXRpdmVWYWx1ZXNbdmFsdWVdIHx8IHZhbHVlKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZsZXhib3hPbGQ7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIGFsdGVybmF0aXZlVmFsdWVzID0ge1xuICAnc3BhY2UtYXJvdW5kJzogJ2p1c3RpZnknLFxuICAnc3BhY2UtYmV0d2Vlbic6ICdqdXN0aWZ5JyxcbiAgJ2ZsZXgtc3RhcnQnOiAnc3RhcnQnLFxuICAnZmxleC1lbmQnOiAnZW5kJyxcbiAgJ3dyYXAtcmV2ZXJzZSc6ICdtdWx0aXBsZScsXG4gIHdyYXA6ICdtdWx0aXBsZScsXG4gIGZsZXg6ICdib3gnLFxuICAnaW5saW5lLWZsZXgnOiAnaW5saW5lLWJveCdcbn07XG5cbnZhciBhbHRlcm5hdGl2ZVByb3BzID0ge1xuICBhbGlnbkl0ZW1zOiAnV2Via2l0Qm94QWxpZ24nLFxuICBqdXN0aWZ5Q29udGVudDogJ1dlYmtpdEJveFBhY2snLFxuICBmbGV4V3JhcDogJ1dlYmtpdEJveExpbmVzJ1xufTtcblxudmFyIG90aGVyUHJvcHMgPSBbJ2FsaWduQ29udGVudCcsICdhbGlnblNlbGYnLCAnb3JkZXInLCAnZmxleEdyb3cnLCAnZmxleFNocmluaycsICdmbGV4QmFzaXMnLCAnZmxleERpcmVjdGlvbiddO1xuXG52YXIgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGFsdGVybmF0aXZlUHJvcHMpLmNvbmNhdChvdGhlclByb3BzKS5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgcHJvcCkge1xuICByZXN1bHRbcHJvcF0gPSB0cnVlO1xuICByZXR1cm4gcmVzdWx0O1xufSwge30pO1xuXG5mdW5jdGlvbiBmbGV4Ym94T2xkKF9yZWYyKSB7XG4gIHZhciBwcm9wZXJ0eSA9IF9yZWYyLnByb3BlcnR5O1xuICB2YXIgdmFsdWUgPSBfcmVmMi52YWx1ZTtcbiAgdmFyIHN0eWxlcyA9IF9yZWYyLnN0eWxlcztcbiAgdmFyIF9yZWYyJGJyb3dzZXJJbmZvID0gX3JlZjIuYnJvd3NlckluZm87XG4gIHZhciBicm93c2VyID0gX3JlZjIkYnJvd3NlckluZm8uYnJvd3NlcjtcbiAgdmFyIHZlcnNpb24gPSBfcmVmMiRicm93c2VySW5mby52ZXJzaW9uO1xuICB2YXIgY3NzID0gX3JlZjIucHJlZml4LmNzcztcbiAgdmFyIGtlZXBVbnByZWZpeGVkID0gX3JlZjIua2VlcFVucHJlZml4ZWQ7XG5cbiAgaWYgKChwcm9wZXJ0aWVzW3Byb3BlcnR5XSB8fCBwcm9wZXJ0eSA9PT0gJ2Rpc3BsYXknICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuaW5kZXhPZignZmxleCcpID4gLTEpICYmIChicm93c2VyID09PSAnZmlyZWZveCcgJiYgdmVyc2lvbiA8IDIyIHx8IGJyb3dzZXIgPT09ICdjaHJvbWUnICYmIHZlcnNpb24gPCAyMSB8fCAoYnJvd3NlciA9PT0gJ3NhZmFyaScgfHwgYnJvd3NlciA9PT0gJ2lvc19zYWYnKSAmJiB2ZXJzaW9uIDw9IDYuMSB8fCBicm93c2VyID09PSAnYW5kcm9pZCcgJiYgdmVyc2lvbiA8IDQuNCB8fCBicm93c2VyID09PSAnYW5kX3VjJykpIHtcbiAgICBpZiAoIWtlZXBVbnByZWZpeGVkKSB7XG4gICAgICBkZWxldGUgc3R5bGVzW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgaWYgKHByb3BlcnR5ID09PSAnZmxleERpcmVjdGlvbicpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFdlYmtpdEJveE9yaWVudDogdmFsdWUuaW5kZXhPZignY29sdW1uJykgPiAtMSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgIFdlYmtpdEJveERpcmVjdGlvbjogdmFsdWUuaW5kZXhPZigncmV2ZXJzZScpID4gLTEgPyAncmV2ZXJzZScgOiAnbm9ybWFsJ1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHByb3BlcnR5ID09PSAnZGlzcGxheScgJiYgYWx0ZXJuYXRpdmVWYWx1ZXNbdmFsdWVdKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXNwbGF5OiBjc3MgKyBhbHRlcm5hdGl2ZVZhbHVlc1t2YWx1ZV0gKyAoa2VlcFVucHJlZml4ZWQgPyAnOycgKyAoMCwgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMlsnZGVmYXVsdCddKShwcm9wZXJ0eSkgKyAnOicgKyB2YWx1ZSA6ICcnKVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGFsdGVybmF0aXZlUHJvcHNbcHJvcGVydHldKSB7XG4gICAgICByZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LCBhbHRlcm5hdGl2ZVByb3BzW3Byb3BlcnR5XSwgYWx0ZXJuYXRpdmVWYWx1ZXNbdmFsdWVdIHx8IHZhbHVlKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGdyYWRpZW50O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UgPSByZXF1aXJlKCcuLi91dGlscy9jYW1lbFRvRGFzaENhc2UnKTtcblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0NhbWVsVG9EYXNoQ2FzZSk7XG5cbnZhciB2YWx1ZXMgPSAvbGluZWFyLWdyYWRpZW50fHJhZGlhbC1ncmFkaWVudHxyZXBlYXRpbmctbGluZWFyLWdyYWRpZW50fHJlcGVhdGluZy1yYWRpYWwtZ3JhZGllbnQvO1xuXG5mdW5jdGlvbiBncmFkaWVudChfcmVmMikge1xuICB2YXIgcHJvcGVydHkgPSBfcmVmMi5wcm9wZXJ0eTtcbiAgdmFyIHZhbHVlID0gX3JlZjIudmFsdWU7XG4gIHZhciBfcmVmMiRicm93c2VySW5mbyA9IF9yZWYyLmJyb3dzZXJJbmZvO1xuICB2YXIgYnJvd3NlciA9IF9yZWYyJGJyb3dzZXJJbmZvLmJyb3dzZXI7XG4gIHZhciB2ZXJzaW9uID0gX3JlZjIkYnJvd3NlckluZm8udmVyc2lvbjtcbiAgdmFyIGNzcyA9IF9yZWYyLnByZWZpeC5jc3M7XG4gIHZhciBrZWVwVW5wcmVmaXhlZCA9IF9yZWYyLmtlZXBVbnByZWZpeGVkO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLm1hdGNoKHZhbHVlcykgIT09IG51bGwgJiYgKGJyb3dzZXIgPT09ICdmaXJlZm94JyAmJiB2ZXJzaW9uIDwgMTYgfHwgYnJvd3NlciA9PT0gJ2Nocm9tZScgJiYgdmVyc2lvbiA8IDI2IHx8IChicm93c2VyID09PSAnc2FmYXJpJyB8fCBicm93c2VyID09PSAnaW9zX3NhZicpICYmIHZlcnNpb24gPCA3IHx8IChicm93c2VyID09PSAnb3BlcmEnIHx8IGJyb3dzZXIgPT09ICdvcF9taW5pJykgJiYgdmVyc2lvbiA8IDEyLjEgfHwgYnJvd3NlciA9PT0gJ2FuZHJvaWQnICYmIHZlcnNpb24gPCA0LjQgfHwgYnJvd3NlciA9PT0gJ2FuZF91YycpKSB7XG4gICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwgcHJvcGVydHksIGNzcyArIHZhbHVlICsgKGtlZXBVbnByZWZpeGVkID8gJzsnICsgKDAsIF91dGlsc0NhbWVsVG9EYXNoQ2FzZTJbJ2RlZmF1bHQnXSkocHJvcGVydHkpICsgJzonICsgdmFsdWUgOiAnJykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBzaXppbmc7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIHByb3BlcnRpZXMgPSB7XG4gIG1heEhlaWdodDogdHJ1ZSxcbiAgbWF4V2lkdGg6IHRydWUsXG4gIHdpZHRoOiB0cnVlLFxuICBoZWlnaHQ6IHRydWUsXG4gIGNvbHVtbldpZHRoOiB0cnVlLFxuICBtaW5XaWR0aDogdHJ1ZSxcbiAgbWluSGVpZ2h0OiB0cnVlXG59O1xudmFyIHZhbHVlcyA9IHtcbiAgJ21pbi1jb250ZW50JzogdHJ1ZSxcbiAgJ21heC1jb250ZW50JzogdHJ1ZSxcbiAgJ2ZpbGwtYXZhaWxhYmxlJzogdHJ1ZSxcbiAgJ2ZpdC1jb250ZW50JzogdHJ1ZSxcbiAgJ2NvbnRhaW4tZmxvYXRzJzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gc2l6aW5nKF9yZWYyKSB7XG4gIHZhciBwcm9wZXJ0eSA9IF9yZWYyLnByb3BlcnR5O1xuICB2YXIgdmFsdWUgPSBfcmVmMi52YWx1ZTtcbiAgdmFyIGNzcyA9IF9yZWYyLnByZWZpeC5jc3M7XG4gIHZhciBrZWVwVW5wcmVmaXhlZCA9IF9yZWYyLmtlZXBVbnByZWZpeGVkO1xuXG4gIC8vIFRoaXMgbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmVcbiAgLy8gS2VlcCBhbiBleWUgb24gaXRcbiAgaWYgKHByb3BlcnRpZXNbcHJvcGVydHldICYmIHZhbHVlc1t2YWx1ZV0pIHtcbiAgICByZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LCBwcm9wZXJ0eSwgY3NzICsgdmFsdWUgKyAoa2VlcFVucHJlZml4ZWQgPyAnOycgKyAoMCwgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMlsnZGVmYXVsdCddKShwcm9wZXJ0eSkgKyAnOicgKyB2YWx1ZSA6ICcnKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHRyYW5zaXRpb247XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIF91dGlsc0NhcGl0YWxpemVTdHJpbmcgPSByZXF1aXJlKCcuLi91dGlscy9jYXBpdGFsaXplU3RyaW5nJyk7XG5cbnZhciBfdXRpbHNDYXBpdGFsaXplU3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FwaXRhbGl6ZVN0cmluZyk7XG5cbnZhciBfdXRpbHNVbnByZWZpeFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvdW5wcmVmaXhQcm9wZXJ0eScpO1xuXG52YXIgX3V0aWxzVW5wcmVmaXhQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc1VucHJlZml4UHJvcGVydHkpO1xuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgJ3RyYW5zaXRpb24nOiB0cnVlLFxuICAndHJhbnNpdGlvblByb3BlcnR5JzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gdHJhbnNpdGlvbihfcmVmMikge1xuICB2YXIgcHJvcGVydHkgPSBfcmVmMi5wcm9wZXJ0eTtcbiAgdmFyIHZhbHVlID0gX3JlZjIudmFsdWU7XG4gIHZhciBjc3MgPSBfcmVmMi5wcmVmaXguY3NzO1xuICB2YXIgcmVxdWlyZXNQcmVmaXggPSBfcmVmMi5yZXF1aXJlc1ByZWZpeDtcbiAgdmFyIGtlZXBVbnByZWZpeGVkID0gX3JlZjIua2VlcFVucHJlZml4ZWQ7XG5cbiAgLy8gYWxzbyBjaGVjayBmb3IgYWxyZWFkeSBwcmVmaXhlZCB0cmFuc2l0aW9uc1xuICB2YXIgdW5wcmVmaXhlZFByb3BlcnR5ID0gKDAsIF91dGlsc1VucHJlZml4UHJvcGVydHkyWydkZWZhdWx0J10pKHByb3BlcnR5KTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgcHJvcGVydGllc1t1bnByZWZpeGVkUHJvcGVydHldKSB7XG4gICAgdmFyIF9yZXQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlcXVpcmVzUHJlZml4RGFzaENhc2VkID0gT2JqZWN0LmtleXMocmVxdWlyZXNQcmVmaXgpLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICByZXR1cm4gKDAsIF91dGlsc0NhbWVsVG9EYXNoQ2FzZTJbJ2RlZmF1bHQnXSkocHJvcCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gb25seSBzcGxpdCBtdWx0aSB2YWx1ZXMsIG5vdCBjdWJpYyBiZXppZXJzXG4gICAgICB2YXIgbXVsdGlwbGVWYWx1ZXMgPSB2YWx1ZS5zcGxpdCgvLCg/IVteKCldKig/OlxcKFteKCldKlxcKSk/XFwpKS9nKTtcblxuICAgICAgcmVxdWlyZXNQcmVmaXhEYXNoQ2FzZWQuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgbXVsdGlwbGVWYWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBpbmRleCkge1xuICAgICAgICAgIGlmICh2YWwuaW5kZXhPZihwcm9wZXJ0eSkgPiAtMSkge1xuICAgICAgICAgICAgbXVsdGlwbGVWYWx1ZXNbaW5kZXhdID0gdmFsLnJlcGxhY2UocHJvcGVydHksIGNzcyArIHByb3BlcnR5KSArIChrZWVwVW5wcmVmaXhlZCA/ICcsJyArIHZhbCA6ICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHY6IF9kZWZpbmVQcm9wZXJ0eSh7fSwgcHJvcGVydHksIG11bHRpcGxlVmFsdWVzLmpvaW4oJywnKSlcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGlmICh0eXBlb2YgX3JldCA9PT0gJ29iamVjdCcpIHJldHVybiBfcmV0LnY7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHsgXCJjaHJvbWVcIjogeyBcInRyYW5zZm9ybVwiOiAzNSwgXCJ0cmFuc2Zvcm1PcmlnaW5cIjogMzUsIFwidHJhbnNmb3JtT3JpZ2luWFwiOiAzNSwgXCJ0cmFuc2Zvcm1PcmlnaW5ZXCI6IDM1LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiOiAzNSwgXCJwZXJzcGVjdGl2ZVwiOiAzNSwgXCJwZXJzcGVjdGl2ZU9yaWdpblwiOiAzNSwgXCJ0cmFuc2Zvcm1TdHlsZVwiOiAzNSwgXCJ0cmFuc2Zvcm1PcmlnaW5aXCI6IDM1LCBcImFuaW1hdGlvblwiOiA0MiwgXCJhbmltYXRpb25EZWxheVwiOiA0MiwgXCJhbmltYXRpb25EaXJlY3Rpb25cIjogNDIsIFwiYW5pbWF0aW9uRmlsbE1vZGVcIjogNDIsIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogNDIsIFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogNDIsIFwiYW5pbWF0aW9uTmFtZVwiOiA0MiwgXCJhbmltYXRpb25QbGF5U3RhdGVcIjogNDIsIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogNDIsIFwiYXBwZWFyYW5jZVwiOiA1MiwgXCJ1c2VyU2VsZWN0XCI6IDUyLCBcImZvbnRLZXJuaW5nXCI6IDMyLCBcInRleHRFbXBoYXNpc1Bvc2l0aW9uXCI6IDUyLCBcInRleHRFbXBoYXNpc1wiOiA1MiwgXCJ0ZXh0RW1waGFzaXNTdHlsZVwiOiA1MiwgXCJ0ZXh0RW1waGFzaXNDb2xvclwiOiA1MiwgXCJib3hEZWNvcmF0aW9uQnJlYWtcIjogNTIsIFwiY2xpcFBhdGhcIjogNTIsIFwibWFza0ltYWdlXCI6IDUyLCBcIm1hc2tNb2RlXCI6IDUyLCBcIm1hc2tSZXBlYXRcIjogNTIsIFwibWFza1Bvc2l0aW9uXCI6IDUyLCBcIm1hc2tDbGlwXCI6IDUyLCBcIm1hc2tPcmlnaW5cIjogNTIsIFwibWFza1NpemVcIjogNTIsIFwibWFza0NvbXBvc2l0ZVwiOiA1MiwgXCJtYXNrXCI6IDUyLCBcIm1hc2tCb3JkZXJTb3VyY2VcIjogNTIsIFwibWFza0JvcmRlck1vZGVcIjogNTIsIFwibWFza0JvcmRlclNsaWNlXCI6IDUyLCBcIm1hc2tCb3JkZXJXaWR0aFwiOiA1MiwgXCJtYXNrQm9yZGVyT3V0c2V0XCI6IDUyLCBcIm1hc2tCb3JkZXJSZXBlYXRcIjogNTIsIFwibWFza0JvcmRlclwiOiA1MiwgXCJtYXNrVHlwZVwiOiA1MiwgXCJ0ZXh0RGVjb3JhdGlvblN0eWxlXCI6IDUyLCBcInRleHREZWNvcmF0aW9uU2tpcFwiOiA1MiwgXCJ0ZXh0RGVjb3JhdGlvbkxpbmVcIjogNTIsIFwidGV4dERlY29yYXRpb25Db2xvclwiOiA1MiwgXCJmaWx0ZXJcIjogNTIsIFwiZm9udEZlYXR1cmVTZXR0aW5nc1wiOiA0NywgXCJicmVha0FmdGVyXCI6IDUyLCBcImJyZWFrQmVmb3JlXCI6IDUyLCBcImJyZWFrSW5zaWRlXCI6IDUyLCBcImNvbHVtbkNvdW50XCI6IDUyLCBcImNvbHVtbkZpbGxcIjogNTIsIFwiY29sdW1uR2FwXCI6IDUyLCBcImNvbHVtblJ1bGVcIjogNTIsIFwiY29sdW1uUnVsZUNvbG9yXCI6IDUyLCBcImNvbHVtblJ1bGVTdHlsZVwiOiA1MiwgXCJjb2x1bW5SdWxlV2lkdGhcIjogNTIsIFwiY29sdW1uc1wiOiA1MiwgXCJjb2x1bW5TcGFuXCI6IDUyLCBcImNvbHVtbldpZHRoXCI6IDUyIH0sIFwic2FmYXJpXCI6IHsgXCJmbGV4XCI6IDgsIFwiZmxleEJhc2lzXCI6IDgsIFwiZmxleERpcmVjdGlvblwiOiA4LCBcImZsZXhHcm93XCI6IDgsIFwiZmxleEZsb3dcIjogOCwgXCJmbGV4U2hyaW5rXCI6IDgsIFwiZmxleFdyYXBcIjogOCwgXCJhbGlnbkNvbnRlbnRcIjogOCwgXCJhbGlnbkl0ZW1zXCI6IDgsIFwiYWxpZ25TZWxmXCI6IDgsIFwianVzdGlmeUNvbnRlbnRcIjogOCwgXCJvcmRlclwiOiA4LCBcInRyYW5zaXRpb25cIjogNiwgXCJ0cmFuc2l0aW9uRGVsYXlcIjogNiwgXCJ0cmFuc2l0aW9uRHVyYXRpb25cIjogNiwgXCJ0cmFuc2l0aW9uUHJvcGVydHlcIjogNiwgXCJ0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25cIjogNiwgXCJ0cmFuc2Zvcm1cIjogOCwgXCJ0cmFuc2Zvcm1PcmlnaW5cIjogOCwgXCJ0cmFuc2Zvcm1PcmlnaW5YXCI6IDgsIFwidHJhbnNmb3JtT3JpZ2luWVwiOiA4LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiOiA4LCBcInBlcnNwZWN0aXZlXCI6IDgsIFwicGVyc3BlY3RpdmVPcmlnaW5cIjogOCwgXCJ0cmFuc2Zvcm1TdHlsZVwiOiA4LCBcInRyYW5zZm9ybU9yaWdpblpcIjogOCwgXCJhbmltYXRpb25cIjogOCwgXCJhbmltYXRpb25EZWxheVwiOiA4LCBcImFuaW1hdGlvbkRpcmVjdGlvblwiOiA4LCBcImFuaW1hdGlvbkZpbGxNb2RlXCI6IDgsIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogOCwgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiA4LCBcImFuaW1hdGlvbk5hbWVcIjogOCwgXCJhbmltYXRpb25QbGF5U3RhdGVcIjogOCwgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiA4LCBcImFwcGVhcmFuY2VcIjogOS4xLCBcInVzZXJTZWxlY3RcIjogOS4xLCBcImJhY2tkcm9wRmlsdGVyXCI6IDkuMSwgXCJmb250S2VybmluZ1wiOiA5LjEsIFwic2Nyb2xsU25hcFR5cGVcIjogOS4xLCBcInNjcm9sbFNuYXBQb2ludHNYXCI6IDkuMSwgXCJzY3JvbGxTbmFwUG9pbnRzWVwiOiA5LjEsIFwic2Nyb2xsU25hcERlc3RpbmF0aW9uXCI6IDkuMSwgXCJzY3JvbGxTbmFwQ29vcmRpbmF0ZVwiOiA5LjEsIFwidGV4dEVtcGhhc2lzUG9zaXRpb25cIjogNywgXCJ0ZXh0RW1waGFzaXNcIjogNywgXCJ0ZXh0RW1waGFzaXNTdHlsZVwiOiA3LCBcInRleHRFbXBoYXNpc0NvbG9yXCI6IDcsIFwiYm94RGVjb3JhdGlvbkJyZWFrXCI6IDkuMSwgXCJjbGlwUGF0aFwiOiA5LjEsIFwibWFza0ltYWdlXCI6IDkuMSwgXCJtYXNrTW9kZVwiOiA5LjEsIFwibWFza1JlcGVhdFwiOiA5LjEsIFwibWFza1Bvc2l0aW9uXCI6IDkuMSwgXCJtYXNrQ2xpcFwiOiA5LjEsIFwibWFza09yaWdpblwiOiA5LjEsIFwibWFza1NpemVcIjogOS4xLCBcIm1hc2tDb21wb3NpdGVcIjogOS4xLCBcIm1hc2tcIjogOS4xLCBcIm1hc2tCb3JkZXJTb3VyY2VcIjogOS4xLCBcIm1hc2tCb3JkZXJNb2RlXCI6IDkuMSwgXCJtYXNrQm9yZGVyU2xpY2VcIjogOS4xLCBcIm1hc2tCb3JkZXJXaWR0aFwiOiA5LjEsIFwibWFza0JvcmRlck91dHNldFwiOiA5LjEsIFwibWFza0JvcmRlclJlcGVhdFwiOiA5LjEsIFwibWFza0JvcmRlclwiOiA5LjEsIFwibWFza1R5cGVcIjogOS4xLCBcInRleHREZWNvcmF0aW9uU3R5bGVcIjogOS4xLCBcInRleHREZWNvcmF0aW9uU2tpcFwiOiA5LjEsIFwidGV4dERlY29yYXRpb25MaW5lXCI6IDkuMSwgXCJ0ZXh0RGVjb3JhdGlvbkNvbG9yXCI6IDkuMSwgXCJzaGFwZUltYWdlVGhyZXNob2xkXCI6IDkuMSwgXCJzaGFwZUltYWdlTWFyZ2luXCI6IDkuMSwgXCJzaGFwZUltYWdlT3V0c2lkZVwiOiA5LjEsIFwiZmlsdGVyXCI6IDksIFwiaHlwaGVuc1wiOiA5LjEsIFwiZmxvd0ludG9cIjogOS4xLCBcImZsb3dGcm9tXCI6IDkuMSwgXCJicmVha0JlZm9yZVwiOiA4LCBcImJyZWFrQWZ0ZXJcIjogOCwgXCJicmVha0luc2lkZVwiOiA4LCBcInJlZ2lvbkZyYWdtZW50XCI6IDkuMSwgXCJjb2x1bW5Db3VudFwiOiA4LCBcImNvbHVtbkZpbGxcIjogOCwgXCJjb2x1bW5HYXBcIjogOCwgXCJjb2x1bW5SdWxlXCI6IDgsIFwiY29sdW1uUnVsZUNvbG9yXCI6IDgsIFwiY29sdW1uUnVsZVN0eWxlXCI6IDgsIFwiY29sdW1uUnVsZVdpZHRoXCI6IDgsIFwiY29sdW1uc1wiOiA4LCBcImNvbHVtblNwYW5cIjogOCwgXCJjb2x1bW5XaWR0aFwiOiA4IH0sIFwiZmlyZWZveFwiOiB7IFwiYXBwZWFyYW5jZVwiOiA0NywgXCJ1c2VyU2VsZWN0XCI6IDQ3LCBcImJveFNpemluZ1wiOiAyOCwgXCJ0ZXh0QWxpZ25MYXN0XCI6IDQ3LCBcInRleHREZWNvcmF0aW9uU3R5bGVcIjogMzUsIFwidGV4dERlY29yYXRpb25Ta2lwXCI6IDM1LCBcInRleHREZWNvcmF0aW9uTGluZVwiOiAzNSwgXCJ0ZXh0RGVjb3JhdGlvbkNvbG9yXCI6IDM1LCBcInRhYlNpemVcIjogNDcsIFwiaHlwaGVuc1wiOiA0MiwgXCJmb250RmVhdHVyZVNldHRpbmdzXCI6IDMzLCBcImJyZWFrQWZ0ZXJcIjogNDcsIFwiYnJlYWtCZWZvcmVcIjogNDcsIFwiYnJlYWtJbnNpZGVcIjogNDcsIFwiY29sdW1uQ291bnRcIjogNDcsIFwiY29sdW1uRmlsbFwiOiA0NywgXCJjb2x1bW5HYXBcIjogNDcsIFwiY29sdW1uUnVsZVwiOiA0NywgXCJjb2x1bW5SdWxlQ29sb3JcIjogNDcsIFwiY29sdW1uUnVsZVN0eWxlXCI6IDQ3LCBcImNvbHVtblJ1bGVXaWR0aFwiOiA0NywgXCJjb2x1bW5zXCI6IDQ3LCBcImNvbHVtblNwYW5cIjogNDcsIFwiY29sdW1uV2lkdGhcIjogNDcgfSwgXCJvcGVyYVwiOiB7IFwiZmxleFwiOiAxNiwgXCJmbGV4QmFzaXNcIjogMTYsIFwiZmxleERpcmVjdGlvblwiOiAxNiwgXCJmbGV4R3Jvd1wiOiAxNiwgXCJmbGV4Rmxvd1wiOiAxNiwgXCJmbGV4U2hyaW5rXCI6IDE2LCBcImZsZXhXcmFwXCI6IDE2LCBcImFsaWduQ29udGVudFwiOiAxNiwgXCJhbGlnbkl0ZW1zXCI6IDE2LCBcImFsaWduU2VsZlwiOiAxNiwgXCJqdXN0aWZ5Q29udGVudFwiOiAxNiwgXCJvcmRlclwiOiAxNiwgXCJ0cmFuc2Zvcm1cIjogMjIsIFwidHJhbnNmb3JtT3JpZ2luXCI6IDIyLCBcInRyYW5zZm9ybU9yaWdpblhcIjogMjIsIFwidHJhbnNmb3JtT3JpZ2luWVwiOiAyMiwgXCJiYWNrZmFjZVZpc2liaWxpdHlcIjogMjIsIFwicGVyc3BlY3RpdmVcIjogMjIsIFwicGVyc3BlY3RpdmVPcmlnaW5cIjogMjIsIFwidHJhbnNmb3JtU3R5bGVcIjogMjIsIFwidHJhbnNmb3JtT3JpZ2luWlwiOiAyMiwgXCJhbmltYXRpb25cIjogMjksIFwiYW5pbWF0aW9uRGVsYXlcIjogMjksIFwiYW5pbWF0aW9uRGlyZWN0aW9uXCI6IDI5LCBcImFuaW1hdGlvbkZpbGxNb2RlXCI6IDI5LCBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IDI5LCBcImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50XCI6IDI5LCBcImFuaW1hdGlvbk5hbWVcIjogMjksIFwiYW5pbWF0aW9uUGxheVN0YXRlXCI6IDI5LCBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IDI5LCBcImFwcGVhcmFuY2VcIjogMzcsIFwidXNlclNlbGVjdFwiOiAzNywgXCJmb250S2VybmluZ1wiOiAxOSwgXCJ0ZXh0RW1waGFzaXNQb3NpdGlvblwiOiAzNywgXCJ0ZXh0RW1waGFzaXNcIjogMzcsIFwidGV4dEVtcGhhc2lzU3R5bGVcIjogMzcsIFwidGV4dEVtcGhhc2lzQ29sb3JcIjogMzcsIFwiYm94RGVjb3JhdGlvbkJyZWFrXCI6IDM3LCBcImNsaXBQYXRoXCI6IDM3LCBcIm1hc2tJbWFnZVwiOiAzNywgXCJtYXNrTW9kZVwiOiAzNywgXCJtYXNrUmVwZWF0XCI6IDM3LCBcIm1hc2tQb3NpdGlvblwiOiAzNywgXCJtYXNrQ2xpcFwiOiAzNywgXCJtYXNrT3JpZ2luXCI6IDM3LCBcIm1hc2tTaXplXCI6IDM3LCBcIm1hc2tDb21wb3NpdGVcIjogMzcsIFwibWFza1wiOiAzNywgXCJtYXNrQm9yZGVyU291cmNlXCI6IDM3LCBcIm1hc2tCb3JkZXJNb2RlXCI6IDM3LCBcIm1hc2tCb3JkZXJTbGljZVwiOiAzNywgXCJtYXNrQm9yZGVyV2lkdGhcIjogMzcsIFwibWFza0JvcmRlck91dHNldFwiOiAzNywgXCJtYXNrQm9yZGVyUmVwZWF0XCI6IDM3LCBcIm1hc2tCb3JkZXJcIjogMzcsIFwibWFza1R5cGVcIjogMzcsIFwiZmlsdGVyXCI6IDM3LCBcImZvbnRGZWF0dXJlU2V0dGluZ3NcIjogMzcsIFwiYnJlYWtBZnRlclwiOiAzNywgXCJicmVha0JlZm9yZVwiOiAzNywgXCJicmVha0luc2lkZVwiOiAzNywgXCJjb2x1bW5Db3VudFwiOiAzNywgXCJjb2x1bW5GaWxsXCI6IDM3LCBcImNvbHVtbkdhcFwiOiAzNywgXCJjb2x1bW5SdWxlXCI6IDM3LCBcImNvbHVtblJ1bGVDb2xvclwiOiAzNywgXCJjb2x1bW5SdWxlU3R5bGVcIjogMzcsIFwiY29sdW1uUnVsZVdpZHRoXCI6IDM3LCBcImNvbHVtbnNcIjogMzcsIFwiY29sdW1uU3BhblwiOiAzNywgXCJjb2x1bW5XaWR0aFwiOiAzNyB9LCBcImllXCI6IHsgXCJncmlkUm93U3RhcnRcIjogMTEsIFwiZ3JpZEF1dG9Db2x1bW5zXCI6IDExLCBcImdyaWRSb3dHYXBcIjogMTEsIFwiYnJlYWtJbnNpZGVcIjogMTEsIFwidHJhbnNmb3JtXCI6IDksIFwiYnJlYWtBZnRlclwiOiAxMSwgXCJncmlkUm93RW5kXCI6IDExLCBcInRyYW5zZm9ybU9yaWdpblwiOiA5LCBcImdyaWRDb2x1bW5FbmRcIjogMTEsIFwidXNlclNlbGVjdFwiOiAxMSwgXCJ0cmFuc2Zvcm1PcmlnaW5ZXCI6IDksIFwiZmxleERpcmVjdGlvblwiOiAxMCwgXCJ3cmFwVGhyb3VnaFwiOiAxMSwgXCJmbG93RnJvbVwiOiAxMSwgXCJncmlkQ29sdW1uU3RhcnRcIjogMTEsIFwicmVnaW9uRnJhZ21lbnRcIjogMTEsIFwiZmxvd0ludG9cIjogMTEsIFwic2Nyb2xsU25hcFR5cGVcIjogMTEsIFwiZmxleFdyYXBcIjogMTAsIFwiZ3JpZEF1dG9GbG93XCI6IDExLCBcIndyYXBGbG93XCI6IDExLCBcIndyYXBNYXJnaW5cIjogMTEsIFwiZ3JpZFRlbXBsYXRlQXJlYXNcIjogMTEsIFwiZ3JpZFRlbXBsYXRlUm93c1wiOiAxMSwgXCJmbGV4Rmxvd1wiOiAxMCwgXCJncmlkQXV0b1Jvd3NcIjogMTEsIFwiZ3JpZFwiOiAxMSwgXCJncmlkUm93XCI6IDExLCBcInRvdWNoQWN0aW9uXCI6IDEwLCBcImdyaWRDb2x1bW5HYXBcIjogMTEsIFwiZ3JpZEdhcFwiOiAxMSwgXCJzY3JvbGxTbmFwUG9pbnRzWVwiOiAxMSwgXCJzY3JvbGxTbmFwRGVzdGluYXRpb25cIjogMTEsIFwic2Nyb2xsU25hcFBvaW50c1hcIjogMTEsIFwiZmxleFwiOiAxMCwgXCJ0cmFuc2Zvcm1PcmlnaW5YXCI6IDksIFwiZ3JpZFRlbXBsYXRlQ29sdW1uc1wiOiAxMSwgXCJncmlkQXJlYVwiOiAxMSwgXCJncmlkVGVtcGxhdGVcIjogMTEsIFwiYnJlYWtCZWZvcmVcIjogMTEsIFwiaHlwaGVuc1wiOiAxMSwgXCJzY3JvbGxTbmFwQ29vcmRpbmF0ZVwiOiAxMSwgXCJncmlkQ29sdW1uXCI6IDExLCBcInRleHRTaXplQWRqdXN0XCI6IDExIH0sIFwiZWRnZVwiOiB7IFwidXNlclNlbGVjdFwiOiAxNCwgXCJ3cmFwRmxvd1wiOiAxNCwgXCJ3cmFwVGhyb3VnaFwiOiAxNCwgXCJ3cmFwTWFyZ2luXCI6IDE0LCBcInNjcm9sbFNuYXBUeXBlXCI6IDE0LCBcInNjcm9sbFNuYXBQb2ludHNYXCI6IDE0LCBcInNjcm9sbFNuYXBQb2ludHNZXCI6IDE0LCBcInNjcm9sbFNuYXBEZXN0aW5hdGlvblwiOiAxNCwgXCJzY3JvbGxTbmFwQ29vcmRpbmF0ZVwiOiAxNCwgXCJoeXBoZW5zXCI6IDE0LCBcImZsb3dJbnRvXCI6IDE0LCBcImZsb3dGcm9tXCI6IDE0LCBcImJyZWFrQmVmb3JlXCI6IDE0LCBcImJyZWFrQWZ0ZXJcIjogMTQsIFwiYnJlYWtJbnNpZGVcIjogMTQsIFwicmVnaW9uRnJhZ21lbnRcIjogMTQsIFwiZ3JpZFRlbXBsYXRlQ29sdW1uc1wiOiAxNCwgXCJncmlkVGVtcGxhdGVSb3dzXCI6IDE0LCBcImdyaWRUZW1wbGF0ZUFyZWFzXCI6IDE0LCBcImdyaWRUZW1wbGF0ZVwiOiAxNCwgXCJncmlkQXV0b0NvbHVtbnNcIjogMTQsIFwiZ3JpZEF1dG9Sb3dzXCI6IDE0LCBcImdyaWRBdXRvRmxvd1wiOiAxNCwgXCJncmlkXCI6IDE0LCBcImdyaWRSb3dTdGFydFwiOiAxNCwgXCJncmlkQ29sdW1uU3RhcnRcIjogMTQsIFwiZ3JpZFJvd0VuZFwiOiAxNCwgXCJncmlkUm93XCI6IDE0LCBcImdyaWRDb2x1bW5cIjogMTQsIFwiZ3JpZENvbHVtbkVuZFwiOiAxNCwgXCJncmlkQ29sdW1uR2FwXCI6IDE0LCBcImdyaWRSb3dHYXBcIjogMTQsIFwiZ3JpZEFyZWFcIjogMTQsIFwiZ3JpZEdhcFwiOiAxNCB9LCBcImlvc19zYWZcIjogeyBcImZsZXhcIjogOC4xLCBcImZsZXhCYXNpc1wiOiA4LjEsIFwiZmxleERpcmVjdGlvblwiOiA4LjEsIFwiZmxleEdyb3dcIjogOC4xLCBcImZsZXhGbG93XCI6IDguMSwgXCJmbGV4U2hyaW5rXCI6IDguMSwgXCJmbGV4V3JhcFwiOiA4LjEsIFwiYWxpZ25Db250ZW50XCI6IDguMSwgXCJhbGlnbkl0ZW1zXCI6IDguMSwgXCJhbGlnblNlbGZcIjogOC4xLCBcImp1c3RpZnlDb250ZW50XCI6IDguMSwgXCJvcmRlclwiOiA4LjEsIFwidHJhbnNpdGlvblwiOiA2LCBcInRyYW5zaXRpb25EZWxheVwiOiA2LCBcInRyYW5zaXRpb25EdXJhdGlvblwiOiA2LCBcInRyYW5zaXRpb25Qcm9wZXJ0eVwiOiA2LCBcInRyYW5zaXRpb25UaW1pbmdGdW5jdGlvblwiOiA2LCBcInRyYW5zZm9ybVwiOiA4LjEsIFwidHJhbnNmb3JtT3JpZ2luXCI6IDguMSwgXCJ0cmFuc2Zvcm1PcmlnaW5YXCI6IDguMSwgXCJ0cmFuc2Zvcm1PcmlnaW5ZXCI6IDguMSwgXCJiYWNrZmFjZVZpc2liaWxpdHlcIjogOC4xLCBcInBlcnNwZWN0aXZlXCI6IDguMSwgXCJwZXJzcGVjdGl2ZU9yaWdpblwiOiA4LjEsIFwidHJhbnNmb3JtU3R5bGVcIjogOC4xLCBcInRyYW5zZm9ybU9yaWdpblpcIjogOC4xLCBcImFuaW1hdGlvblwiOiA4LjEsIFwiYW5pbWF0aW9uRGVsYXlcIjogOC4xLCBcImFuaW1hdGlvbkRpcmVjdGlvblwiOiA4LjEsIFwiYW5pbWF0aW9uRmlsbE1vZGVcIjogOC4xLCBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IDguMSwgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiA4LjEsIFwiYW5pbWF0aW9uTmFtZVwiOiA4LjEsIFwiYW5pbWF0aW9uUGxheVN0YXRlXCI6IDguMSwgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiA4LjEsIFwiYXBwZWFyYW5jZVwiOiA5LjMsIFwidXNlclNlbGVjdFwiOiA5LjMsIFwiYmFja2Ryb3BGaWx0ZXJcIjogOS4zLCBcImZvbnRLZXJuaW5nXCI6IDkuMywgXCJzY3JvbGxTbmFwVHlwZVwiOiA5LjMsIFwic2Nyb2xsU25hcFBvaW50c1hcIjogOS4zLCBcInNjcm9sbFNuYXBQb2ludHNZXCI6IDkuMywgXCJzY3JvbGxTbmFwRGVzdGluYXRpb25cIjogOS4zLCBcInNjcm9sbFNuYXBDb29yZGluYXRlXCI6IDkuMywgXCJib3hEZWNvcmF0aW9uQnJlYWtcIjogOS4zLCBcImNsaXBQYXRoXCI6IDkuMywgXCJtYXNrSW1hZ2VcIjogOS4zLCBcIm1hc2tNb2RlXCI6IDkuMywgXCJtYXNrUmVwZWF0XCI6IDkuMywgXCJtYXNrUG9zaXRpb25cIjogOS4zLCBcIm1hc2tDbGlwXCI6IDkuMywgXCJtYXNrT3JpZ2luXCI6IDkuMywgXCJtYXNrU2l6ZVwiOiA5LjMsIFwibWFza0NvbXBvc2l0ZVwiOiA5LjMsIFwibWFza1wiOiA5LjMsIFwibWFza0JvcmRlclNvdXJjZVwiOiA5LjMsIFwibWFza0JvcmRlck1vZGVcIjogOS4zLCBcIm1hc2tCb3JkZXJTbGljZVwiOiA5LjMsIFwibWFza0JvcmRlcldpZHRoXCI6IDkuMywgXCJtYXNrQm9yZGVyT3V0c2V0XCI6IDkuMywgXCJtYXNrQm9yZGVyUmVwZWF0XCI6IDkuMywgXCJtYXNrQm9yZGVyXCI6IDkuMywgXCJtYXNrVHlwZVwiOiA5LjMsIFwidGV4dFNpemVBZGp1c3RcIjogOS4zLCBcInRleHREZWNvcmF0aW9uU3R5bGVcIjogOS4zLCBcInRleHREZWNvcmF0aW9uU2tpcFwiOiA5LjMsIFwidGV4dERlY29yYXRpb25MaW5lXCI6IDkuMywgXCJ0ZXh0RGVjb3JhdGlvbkNvbG9yXCI6IDkuMywgXCJzaGFwZUltYWdlVGhyZXNob2xkXCI6IDkuMywgXCJzaGFwZUltYWdlTWFyZ2luXCI6IDkuMywgXCJzaGFwZUltYWdlT3V0c2lkZVwiOiA5LjMsIFwiZmlsdGVyXCI6IDksIFwiaHlwaGVuc1wiOiA5LjMsIFwiZmxvd0ludG9cIjogOS4zLCBcImZsb3dGcm9tXCI6IDkuMywgXCJicmVha0JlZm9yZVwiOiA4LjEsIFwiYnJlYWtBZnRlclwiOiA4LjEsIFwiYnJlYWtJbnNpZGVcIjogOC4xLCBcInJlZ2lvbkZyYWdtZW50XCI6IDkuMywgXCJjb2x1bW5Db3VudFwiOiA4LjEsIFwiY29sdW1uRmlsbFwiOiA4LjEsIFwiY29sdW1uR2FwXCI6IDguMSwgXCJjb2x1bW5SdWxlXCI6IDguMSwgXCJjb2x1bW5SdWxlQ29sb3JcIjogOC4xLCBcImNvbHVtblJ1bGVTdHlsZVwiOiA4LjEsIFwiY29sdW1uUnVsZVdpZHRoXCI6IDguMSwgXCJjb2x1bW5zXCI6IDguMSwgXCJjb2x1bW5TcGFuXCI6IDguMSwgXCJjb2x1bW5XaWR0aFwiOiA4LjEgfSwgXCJhbmRyb2lkXCI6IHsgXCJib3JkZXJJbWFnZVwiOiA0LjIsIFwiYm9yZGVySW1hZ2VPdXRzZXRcIjogNC4yLCBcImJvcmRlckltYWdlUmVwZWF0XCI6IDQuMiwgXCJib3JkZXJJbWFnZVNsaWNlXCI6IDQuMiwgXCJib3JkZXJJbWFnZVNvdXJjZVwiOiA0LjIsIFwiYm9yZGVySW1hZ2VXaWR0aFwiOiA0LjIsIFwiZmxleFwiOiA0LjIsIFwiZmxleEJhc2lzXCI6IDQuMiwgXCJmbGV4RGlyZWN0aW9uXCI6IDQuMiwgXCJmbGV4R3Jvd1wiOiA0LjIsIFwiZmxleEZsb3dcIjogNC4yLCBcImZsZXhTaHJpbmtcIjogNC4yLCBcImZsZXhXcmFwXCI6IDQuMiwgXCJhbGlnbkNvbnRlbnRcIjogNC4yLCBcImFsaWduSXRlbXNcIjogNC4yLCBcImFsaWduU2VsZlwiOiA0LjIsIFwianVzdGlmeUNvbnRlbnRcIjogNC4yLCBcIm9yZGVyXCI6IDQuMiwgXCJ0cmFuc2l0aW9uXCI6IDQuMiwgXCJ0cmFuc2l0aW9uRGVsYXlcIjogNC4yLCBcInRyYW5zaXRpb25EdXJhdGlvblwiOiA0LjIsIFwidHJhbnNpdGlvblByb3BlcnR5XCI6IDQuMiwgXCJ0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25cIjogNC4yLCBcInRyYW5zZm9ybVwiOiA0LjQsIFwidHJhbnNmb3JtT3JpZ2luXCI6IDQuNCwgXCJ0cmFuc2Zvcm1PcmlnaW5YXCI6IDQuNCwgXCJ0cmFuc2Zvcm1PcmlnaW5ZXCI6IDQuNCwgXCJiYWNrZmFjZVZpc2liaWxpdHlcIjogNC40LCBcInBlcnNwZWN0aXZlXCI6IDQuNCwgXCJwZXJzcGVjdGl2ZU9yaWdpblwiOiA0LjQsIFwidHJhbnNmb3JtU3R5bGVcIjogNC40LCBcInRyYW5zZm9ybU9yaWdpblpcIjogNC40LCBcImFuaW1hdGlvblwiOiA0LjQsIFwiYW5pbWF0aW9uRGVsYXlcIjogNC40LCBcImFuaW1hdGlvbkRpcmVjdGlvblwiOiA0LjQsIFwiYW5pbWF0aW9uRmlsbE1vZGVcIjogNC40LCBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IDQuNCwgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiA0LjQsIFwiYW5pbWF0aW9uTmFtZVwiOiA0LjQsIFwiYW5pbWF0aW9uUGxheVN0YXRlXCI6IDQuNCwgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiA0LjQsIFwiYXBwZWFyYW5jZVwiOiA0NywgXCJ1c2VyU2VsZWN0XCI6IDQ3LCBcImZvbnRLZXJuaW5nXCI6IDQuNCwgXCJ0ZXh0RW1waGFzaXNQb3NpdGlvblwiOiA0NywgXCJ0ZXh0RW1waGFzaXNcIjogNDcsIFwidGV4dEVtcGhhc2lzU3R5bGVcIjogNDcsIFwidGV4dEVtcGhhc2lzQ29sb3JcIjogNDcsIFwiYm94RGVjb3JhdGlvbkJyZWFrXCI6IDQ3LCBcImNsaXBQYXRoXCI6IDQ3LCBcIm1hc2tJbWFnZVwiOiA0NywgXCJtYXNrTW9kZVwiOiA0NywgXCJtYXNrUmVwZWF0XCI6IDQ3LCBcIm1hc2tQb3NpdGlvblwiOiA0NywgXCJtYXNrQ2xpcFwiOiA0NywgXCJtYXNrT3JpZ2luXCI6IDQ3LCBcIm1hc2tTaXplXCI6IDQ3LCBcIm1hc2tDb21wb3NpdGVcIjogNDcsIFwibWFza1wiOiA0NywgXCJtYXNrQm9yZGVyU291cmNlXCI6IDQ3LCBcIm1hc2tCb3JkZXJNb2RlXCI6IDQ3LCBcIm1hc2tCb3JkZXJTbGljZVwiOiA0NywgXCJtYXNrQm9yZGVyV2lkdGhcIjogNDcsIFwibWFza0JvcmRlck91dHNldFwiOiA0NywgXCJtYXNrQm9yZGVyUmVwZWF0XCI6IDQ3LCBcIm1hc2tCb3JkZXJcIjogNDcsIFwibWFza1R5cGVcIjogNDcsIFwiZmlsdGVyXCI6IDQ3LCBcImZvbnRGZWF0dXJlU2V0dGluZ3NcIjogNDcsIFwiYnJlYWtBZnRlclwiOiA0NywgXCJicmVha0JlZm9yZVwiOiA0NywgXCJicmVha0luc2lkZVwiOiA0NywgXCJjb2x1bW5Db3VudFwiOiA0NywgXCJjb2x1bW5GaWxsXCI6IDQ3LCBcImNvbHVtbkdhcFwiOiA0NywgXCJjb2x1bW5SdWxlXCI6IDQ3LCBcImNvbHVtblJ1bGVDb2xvclwiOiA0NywgXCJjb2x1bW5SdWxlU3R5bGVcIjogNDcsIFwiY29sdW1uUnVsZVdpZHRoXCI6IDQ3LCBcImNvbHVtbnNcIjogNDcsIFwiY29sdW1uU3BhblwiOiA0NywgXCJjb2x1bW5XaWR0aFwiOiA0NyB9LCBcImFuZF9jaHJcIjogeyBcImFwcGVhcmFuY2VcIjogNDcsIFwidXNlclNlbGVjdFwiOiA0NywgXCJ0ZXh0RW1waGFzaXNQb3NpdGlvblwiOiA0NywgXCJ0ZXh0RW1waGFzaXNcIjogNDcsIFwidGV4dEVtcGhhc2lzU3R5bGVcIjogNDcsIFwidGV4dEVtcGhhc2lzQ29sb3JcIjogNDcsIFwiYm94RGVjb3JhdGlvbkJyZWFrXCI6IDQ3LCBcImNsaXBQYXRoXCI6IDQ3LCBcIm1hc2tJbWFnZVwiOiA0NywgXCJtYXNrTW9kZVwiOiA0NywgXCJtYXNrUmVwZWF0XCI6IDQ3LCBcIm1hc2tQb3NpdGlvblwiOiA0NywgXCJtYXNrQ2xpcFwiOiA0NywgXCJtYXNrT3JpZ2luXCI6IDQ3LCBcIm1hc2tTaXplXCI6IDQ3LCBcIm1hc2tDb21wb3NpdGVcIjogNDcsIFwibWFza1wiOiA0NywgXCJtYXNrQm9yZGVyU291cmNlXCI6IDQ3LCBcIm1hc2tCb3JkZXJNb2RlXCI6IDQ3LCBcIm1hc2tCb3JkZXJTbGljZVwiOiA0NywgXCJtYXNrQm9yZGVyV2lkdGhcIjogNDcsIFwibWFza0JvcmRlck91dHNldFwiOiA0NywgXCJtYXNrQm9yZGVyUmVwZWF0XCI6IDQ3LCBcIm1hc2tCb3JkZXJcIjogNDcsIFwibWFza1R5cGVcIjogNDcsIFwidGV4dERlY29yYXRpb25TdHlsZVwiOiA0NywgXCJ0ZXh0RGVjb3JhdGlvblNraXBcIjogNDcsIFwidGV4dERlY29yYXRpb25MaW5lXCI6IDQ3LCBcInRleHREZWNvcmF0aW9uQ29sb3JcIjogNDcsIFwiZmlsdGVyXCI6IDQ3LCBcImZvbnRGZWF0dXJlU2V0dGluZ3NcIjogNDcsIFwiYnJlYWtBZnRlclwiOiA0NywgXCJicmVha0JlZm9yZVwiOiA0NywgXCJicmVha0luc2lkZVwiOiA0NywgXCJjb2x1bW5Db3VudFwiOiA0NywgXCJjb2x1bW5GaWxsXCI6IDQ3LCBcImNvbHVtbkdhcFwiOiA0NywgXCJjb2x1bW5SdWxlXCI6IDQ3LCBcImNvbHVtblJ1bGVDb2xvclwiOiA0NywgXCJjb2x1bW5SdWxlU3R5bGVcIjogNDcsIFwiY29sdW1uUnVsZVdpZHRoXCI6IDQ3LCBcImNvbHVtbnNcIjogNDcsIFwiY29sdW1uU3BhblwiOiA0NywgXCJjb2x1bW5XaWR0aFwiOiA0NyB9LCBcImFuZF91Y1wiOiB7IFwiZmxleFwiOiA5LjksIFwiZmxleEJhc2lzXCI6IDkuOSwgXCJmbGV4RGlyZWN0aW9uXCI6IDkuOSwgXCJmbGV4R3Jvd1wiOiA5LjksIFwiZmxleEZsb3dcIjogOS45LCBcImZsZXhTaHJpbmtcIjogOS45LCBcImZsZXhXcmFwXCI6IDkuOSwgXCJhbGlnbkNvbnRlbnRcIjogOS45LCBcImFsaWduSXRlbXNcIjogOS45LCBcImFsaWduU2VsZlwiOiA5LjksIFwianVzdGlmeUNvbnRlbnRcIjogOS45LCBcIm9yZGVyXCI6IDkuOSwgXCJ0cmFuc2l0aW9uXCI6IDkuOSwgXCJ0cmFuc2l0aW9uRGVsYXlcIjogOS45LCBcInRyYW5zaXRpb25EdXJhdGlvblwiOiA5LjksIFwidHJhbnNpdGlvblByb3BlcnR5XCI6IDkuOSwgXCJ0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25cIjogOS45LCBcInRyYW5zZm9ybVwiOiA5LjksIFwidHJhbnNmb3JtT3JpZ2luXCI6IDkuOSwgXCJ0cmFuc2Zvcm1PcmlnaW5YXCI6IDkuOSwgXCJ0cmFuc2Zvcm1PcmlnaW5ZXCI6IDkuOSwgXCJiYWNrZmFjZVZpc2liaWxpdHlcIjogOS45LCBcInBlcnNwZWN0aXZlXCI6IDkuOSwgXCJwZXJzcGVjdGl2ZU9yaWdpblwiOiA5LjksIFwidHJhbnNmb3JtU3R5bGVcIjogOS45LCBcInRyYW5zZm9ybU9yaWdpblpcIjogOS45LCBcImFuaW1hdGlvblwiOiA5LjksIFwiYW5pbWF0aW9uRGVsYXlcIjogOS45LCBcImFuaW1hdGlvbkRpcmVjdGlvblwiOiA5LjksIFwiYW5pbWF0aW9uRmlsbE1vZGVcIjogOS45LCBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IDkuOSwgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiA5LjksIFwiYW5pbWF0aW9uTmFtZVwiOiA5LjksIFwiYW5pbWF0aW9uUGxheVN0YXRlXCI6IDkuOSwgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiA5LjksIFwiYXBwZWFyYW5jZVwiOiA5LjksIFwidXNlclNlbGVjdFwiOiA5LjksIFwiZm9udEtlcm5pbmdcIjogOS45LCBcInRleHRFbXBoYXNpc1Bvc2l0aW9uXCI6IDkuOSwgXCJ0ZXh0RW1waGFzaXNcIjogOS45LCBcInRleHRFbXBoYXNpc1N0eWxlXCI6IDkuOSwgXCJ0ZXh0RW1waGFzaXNDb2xvclwiOiA5LjksIFwibWFza0ltYWdlXCI6IDkuOSwgXCJtYXNrTW9kZVwiOiA5LjksIFwibWFza1JlcGVhdFwiOiA5LjksIFwibWFza1Bvc2l0aW9uXCI6IDkuOSwgXCJtYXNrQ2xpcFwiOiA5LjksIFwibWFza09yaWdpblwiOiA5LjksIFwibWFza1NpemVcIjogOS45LCBcIm1hc2tDb21wb3NpdGVcIjogOS45LCBcIm1hc2tcIjogOS45LCBcIm1hc2tCb3JkZXJTb3VyY2VcIjogOS45LCBcIm1hc2tCb3JkZXJNb2RlXCI6IDkuOSwgXCJtYXNrQm9yZGVyU2xpY2VcIjogOS45LCBcIm1hc2tCb3JkZXJXaWR0aFwiOiA5LjksIFwibWFza0JvcmRlck91dHNldFwiOiA5LjksIFwibWFza0JvcmRlclJlcGVhdFwiOiA5LjksIFwibWFza0JvcmRlclwiOiA5LjksIFwibWFza1R5cGVcIjogOS45LCBcInRleHRTaXplQWRqdXN0XCI6IDkuOSwgXCJmaWx0ZXJcIjogOS45LCBcImh5cGhlbnNcIjogOS45LCBcImZsb3dJbnRvXCI6IDkuOSwgXCJmbG93RnJvbVwiOiA5LjksIFwiYnJlYWtCZWZvcmVcIjogOS45LCBcImJyZWFrQWZ0ZXJcIjogOS45LCBcImJyZWFrSW5zaWRlXCI6IDkuOSwgXCJyZWdpb25GcmFnbWVudFwiOiA5LjksIFwiZm9udEZlYXR1cmVTZXR0aW5nc1wiOiA5LjksIFwiY29sdW1uQ291bnRcIjogOS45LCBcImNvbHVtbkZpbGxcIjogOS45LCBcImNvbHVtbkdhcFwiOiA5LjksIFwiY29sdW1uUnVsZVwiOiA5LjksIFwiY29sdW1uUnVsZUNvbG9yXCI6IDkuOSwgXCJjb2x1bW5SdWxlU3R5bGVcIjogOS45LCBcImNvbHVtblJ1bGVXaWR0aFwiOiA5LjksIFwiY29sdW1uc1wiOiA5LjksIFwiY29sdW1uU3BhblwiOiA5LjksIFwiY29sdW1uV2lkdGhcIjogOS45IH0sIFwib3BfbWluaVwiOiB7IFwiYm9yZGVySW1hZ2VcIjogNSwgXCJib3JkZXJJbWFnZU91dHNldFwiOiA1LCBcImJvcmRlckltYWdlUmVwZWF0XCI6IDUsIFwiYm9yZGVySW1hZ2VTbGljZVwiOiA1LCBcImJvcmRlckltYWdlU291cmNlXCI6IDUsIFwiYm9yZGVySW1hZ2VXaWR0aFwiOiA1LCBcInRhYlNpemVcIjogNSwgXCJvYmplY3RGaXRcIjogNSwgXCJvYmplY3RQb3NpdGlvblwiOiA1IH0gfTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiLy8gbGVpZ2h0IHBvbHlmaWxsIGZvciBPYmplY3QuYXNzaWduXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAoYmFzZSkge1xuICB2YXIgZXh0ZW5kID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgT2JqZWN0LmtleXMoZXh0ZW5kKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gYmFzZVtrZXldID0gZXh0ZW5kW2tleV07XG4gIH0pO1xuICByZXR1cm4gYmFzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2Jvd3NlciA9IHJlcXVpcmUoJ2Jvd3NlcicpO1xuXG52YXIgX2Jvd3NlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ib3dzZXIpO1xuXG52YXIgdmVuZG9yUHJlZml4ZXMgPSB7XG4gIFdlYmtpdDogWydjaHJvbWUnLCAnc2FmYXJpJywgJ2lvcycsICdhbmRyb2lkJywgJ3BoYW50b20nLCAnb3BlcmEnLCAnd2Vib3MnLCAnYmxhY2tiZXJyeScsICdiYWRhJywgJ3RpemVuJ10sXG4gIE1vejogWydmaXJlZm94JywgJ3NlYW1vbmtleScsICdzYWlsZmlzaCddLFxuICBtczogWydtc2llJywgJ21zZWRnZSddXG59O1xuXG52YXIgYnJvd3NlcnMgPSB7XG4gIGNocm9tZTogW1snY2hyb21lJ11dLFxuICBzYWZhcmk6IFtbJ3NhZmFyaSddXSxcbiAgZmlyZWZveDogW1snZmlyZWZveCddXSxcbiAgaWU6IFtbJ21zaWUnXV0sXG4gIGVkZ2U6IFtbJ21zZWRnZSddXSxcbiAgb3BlcmE6IFtbJ29wZXJhJ11dLFxuICBpb3Nfc2FmOiBbWydpb3MnLCAnbW9iaWxlJ10sIFsnaW9zJywgJ3RhYmxldCddXSxcbiAgaWVfbW9iOiBbWyd3aW5kb3dzcGhvbmUnLCAnbW9iaWxlJywgJ21zaWUnXSwgWyd3aW5kb3dzcGhvbmUnLCAndGFibGV0JywgJ21zaWUnXSwgWyd3aW5kb3dzcGhvbmUnLCAnbW9iaWxlJywgJ21zZWRnZSddLCBbJ3dpbmRvd3NwaG9uZScsICd0YWJsZXQnLCAnbXNlZGdlJ11dLFxuICBvcF9taW5pOiBbWydvcGVyYScsICdtb2JpbGUnXSwgWydvcGVyYScsICd0YWJsZXQnXV0sXG4gIGFuZF91YzogW1snYW5kcm9pZCcsICdtb2JpbGUnXSwgWydhbmRyb2lkJywgJ3RhYmxldCddXSxcbiAgYW5kcm9pZDogW1snYW5kcm9pZCcsICdtb2JpbGUnXSwgWydhbmRyb2lkJywgJ3RhYmxldCddXVxufTtcblxuLyoqXG4gKiBVc2VzIGJvd3NlciB0byBnZXQgZGVmYXVsdCBicm93c2VyIGluZm9ybWF0aW9uIHN1Y2ggYXMgdmVyc2lvbiBhbmQgbmFtZVxuICogRXZhbHVhdGVzIGJvd3NlciBpbmZvIGFuZCBhZGRzIHZlbmRvclByZWZpeCBpbmZvcm1hdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IHVzZXJBZ2VudCAtIHVzZXJBZ2VudCB0aGF0IGdldHMgZXZhbHVhdGVkXG4gKi9cblxuZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKHVzZXJBZ2VudCkge1xuICBpZiAoIXVzZXJBZ2VudCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBpbmZvID0gX2Jvd3NlcjJbJ2RlZmF1bHQnXS5fZGV0ZWN0KHVzZXJBZ2VudCk7XG5cbiAgT2JqZWN0LmtleXModmVuZG9yUHJlZml4ZXMpLmZvckVhY2goZnVuY3Rpb24gKHByZWZpeCkge1xuICAgIHZlbmRvclByZWZpeGVzW3ByZWZpeF0uZm9yRWFjaChmdW5jdGlvbiAoYnJvd3Nlcikge1xuICAgICAgaWYgKGluZm9bYnJvd3Nlcl0pIHtcbiAgICAgICAgaW5mby5wcmVmaXggPSB7XG4gICAgICAgICAgaW5saW5lOiBwcmVmaXgsXG4gICAgICAgICAgY3NzOiAnLScgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSArICctJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICB2YXIgbmFtZSA9ICcnO1xuICBPYmplY3Qua2V5cyhicm93c2VycykuZm9yRWFjaChmdW5jdGlvbiAoYnJvd3Nlcikge1xuICAgIGJyb3dzZXJzW2Jyb3dzZXJdLmZvckVhY2goZnVuY3Rpb24gKGNvbmRpdGlvbikge1xuICAgICAgdmFyIG1hdGNoID0gMDtcbiAgICAgIGNvbmRpdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChzaW5nbGUpIHtcbiAgICAgICAgaWYgKGluZm9bc2luZ2xlXSkge1xuICAgICAgICAgIG1hdGNoICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGNvbmRpdGlvbi5sZW5ndGggPT09IG1hdGNoKSB7XG4gICAgICAgIG5hbWUgPSBicm93c2VyO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICBpbmZvLmJyb3dzZXIgPSBuYW1lO1xuICAvLyBGb3IgY29yZG92YSBJT1MgOCB0aGUgdmVyc2lvbiBpcyBtaXNzaW5nLCBzZXQgdHJ1bmNhdGVkIG9zdmVyc2lvbiB0byBwcmV2ZW50IE5hTlxuICBpbmZvLnZlcnNpb24gPSBpbmZvLnZlcnNpb24gPyBwYXJzZUZsb2F0KGluZm8udmVyc2lvbikgOiBwYXJzZUludChwYXJzZUZsb2F0KGluZm8ub3N2ZXJzaW9uKSwgMTApO1xuXG4gIC8vIHNlcGVyYXRlIG5hdGl2ZSBhbmRyb2lkIGNocm9tZVxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vcm9mcmlzY2htYW5uL2lubGluZS1zdHlsZS1wcmVmaXhlci9pc3N1ZXMvNDVcbiAgaWYgKGluZm8uYnJvd3NlciA9PT0gJ2FuZHJvaWQnICYmIGluZm8uY2hyb21lICYmIGluZm8udmVyc2lvbiA+IDM3KSB7XG4gICAgaW5mby5icm93c2VyID0gJ2FuZF9jaHInO1xuICB9XG4gIGluZm8udmVyc2lvbiA9IHBhcnNlRmxvYXQoaW5mby52ZXJzaW9uKTtcbiAgaW5mby5vc3ZlcnNpb24gPSBwYXJzZUZsb2F0KGluZm8ub3N2ZXJzaW9uKTtcbiAgLy8gRm9yIGFuZHJvaWQgPCA0LjQgd2Ugd2FudCB0byBjaGVjayB0aGUgb3N2ZXJzaW9uXG4gIC8vIG5vdCB0aGUgY2hyb21lIHZlcnNpb24sIHNlZSBpc3N1ZSAjMjZcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3JvZnJpc2NobWFubi9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvaXNzdWVzLzI2XG4gIGlmIChpbmZvLmJyb3dzZXIgPT09ICdhbmRyb2lkJyAmJiBpbmZvLm9zdmVyc2lvbiA8IDUpIHtcbiAgICBpbmZvLnZlcnNpb24gPSBpbmZvLm9zdmVyc2lvbjtcbiAgfVxuXG4gIHJldHVybiBpbmZvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIGJyb3dzZXIgPSBfcmVmLmJyb3dzZXI7XG4gIHZhciB2ZXJzaW9uID0gX3JlZi52ZXJzaW9uO1xuICB2YXIgcHJlZml4ID0gX3JlZi5wcmVmaXg7XG5cbiAgdmFyIHByZWZpeGVkS2V5ZnJhbWVzID0gJ2tleWZyYW1lcyc7XG5cbiAgaWYgKGJyb3dzZXIgPT09ICdjaHJvbWUnICYmIHZlcnNpb24gPCA0MyB8fCAoYnJvd3NlciA9PT0gJ3NhZmFyaScgfHwgYnJvd3NlciA9PT0gJ2lvc19zYWYnKSAmJiB2ZXJzaW9uIDwgOSB8fCBicm93c2VyID09PSAnb3BlcmEnICYmIHZlcnNpb24gPCAzMCB8fCBicm93c2VyID09PSAnYW5kcm9pZCcgJiYgdmVyc2lvbiA8PSA0LjQgfHwgYnJvd3NlciA9PT0gJ2FuZF91YycpIHtcbiAgICBwcmVmaXhlZEtleWZyYW1lcyA9IHByZWZpeC5jc3MgKyBwcmVmaXhlZEtleWZyYW1lcztcbiAgfVxuICByZXR1cm4gcHJlZml4ZWRLZXlmcmFtZXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIvKiFcbiAgKiBCb3dzZXIgLSBhIGJyb3dzZXIgZGV0ZWN0b3JcbiAgKiBodHRwczovL2dpdGh1Yi5jb20vZGVkL2Jvd3NlclxuICAqIE1JVCBMaWNlbnNlIHwgKGMpIER1c3RpbiBEaWF6IDIwMTVcbiAgKi9cblxuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxufSgnYm93c2VyJywgZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICAqIFNlZSB1c2VyYWdlbnRzLmpzIGZvciBleGFtcGxlcyBvZiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgKi9cblxuICB2YXIgdCA9IHRydWVcblxuICBmdW5jdGlvbiBkZXRlY3QodWEpIHtcblxuICAgIGZ1bmN0aW9uIGdldEZpcnN0TWF0Y2gocmVnZXgpIHtcbiAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKHJlZ2V4KTtcbiAgICAgIHJldHVybiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaFsxXSkgfHwgJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2Vjb25kTWF0Y2gocmVnZXgpIHtcbiAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKHJlZ2V4KTtcbiAgICAgIHJldHVybiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaFsyXSkgfHwgJyc7XG4gICAgfVxuXG4gICAgdmFyIGlvc2RldmljZSA9IGdldEZpcnN0TWF0Y2goLyhpcG9kfGlwaG9uZXxpcGFkKS9pKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIGxpa2VBbmRyb2lkID0gL2xpa2UgYW5kcm9pZC9pLnRlc3QodWEpXG4gICAgICAsIGFuZHJvaWQgPSAhbGlrZUFuZHJvaWQgJiYgL2FuZHJvaWQvaS50ZXN0KHVhKVxuICAgICAgLCBjaHJvbWVCb29rID0gL0NyT1MvLnRlc3QodWEpXG4gICAgICAsIGVkZ2VWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvZWRnZVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgICwgdmVyc2lvbklkZW50aWZpZXIgPSBnZXRGaXJzdE1hdGNoKC92ZXJzaW9uXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgLCB0YWJsZXQgPSAvdGFibGV0L2kudGVzdCh1YSlcbiAgICAgICwgbW9iaWxlID0gIXRhYmxldCAmJiAvW14tXW1vYmkvaS50ZXN0KHVhKVxuICAgICAgLCByZXN1bHRcblxuICAgIGlmICgvb3BlcmF8b3ByL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ09wZXJhJ1xuICAgICAgLCBvcGVyYTogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC8oPzpvcGVyYXxvcHIpW1xcc1xcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC95YWJyb3dzZXIvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnWWFuZGV4IEJyb3dzZXInXG4gICAgICAsIHlhbmRleGJyb3dzZXI6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvKD86eWFicm93c2VyKVtcXHNcXC9dKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvd2luZG93cyBwaG9uZS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdXaW5kb3dzIFBob25lJ1xuICAgICAgLCB3aW5kb3dzcGhvbmU6IHRcbiAgICAgIH1cbiAgICAgIGlmIChlZGdlVmVyc2lvbikge1xuICAgICAgICByZXN1bHQubXNlZGdlID0gdFxuICAgICAgICByZXN1bHQudmVyc2lvbiA9IGVkZ2VWZXJzaW9uXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0Lm1zaWUgPSB0XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvaWVtb2JpbGVcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9tc2llfHRyaWRlbnQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgICAsIG1zaWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86bXNpZSB8cnY6KShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNocm9tZUJvb2spIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0Nocm9tZSdcbiAgICAgICwgY2hyb21lQm9vazogdFxuICAgICAgLCBjaHJvbWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86Y2hyb21lfGNyaW9zfGNybW8pXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL2Nocm9tZS4rPyBlZGdlL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ01pY3Jvc29mdCBFZGdlJ1xuICAgICAgLCBtc2VkZ2U6IHRcbiAgICAgICwgdmVyc2lvbjogZWRnZVZlcnNpb25cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2Nocm9tZXxjcmlvc3xjcm1vL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0Nocm9tZSdcbiAgICAgICwgY2hyb21lOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OmNocm9tZXxjcmlvc3xjcm1vKVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWUgOiBpb3NkZXZpY2UgPT0gJ2lwaG9uZScgPyAnaVBob25lJyA6IGlvc2RldmljZSA9PSAnaXBhZCcgPyAnaVBhZCcgOiAnaVBvZCdcbiAgICAgIH1cbiAgICAgIC8vIFdURjogdmVyc2lvbiBpcyBub3QgcGFydCBvZiB1c2VyIGFnZW50IGluIHdlYiBhcHBzXG4gICAgICBpZiAodmVyc2lvbklkZW50aWZpZXIpIHtcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2FpbGZpc2gvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FpbGZpc2gnXG4gICAgICAsIHNhaWxmaXNoOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3NhaWxmaXNoXFxzP2Jyb3dzZXJcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zZWFtb25rZXlcXC8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2VhTW9ua2V5J1xuICAgICAgLCBzZWFtb25rZXk6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvc2VhbW9ua2V5XFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvZmlyZWZveHxpY2V3ZWFzZWwvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnRmlyZWZveCdcbiAgICAgICwgZmlyZWZveDogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpmaXJlZm94fGljZXdlYXNlbClbIFxcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgICBpZiAoL1xcKChtb2JpbGV8dGFibGV0KTtbXlxcKV0qcnY6W1xcZFxcLl0rXFwpL2kudGVzdCh1YSkpIHtcbiAgICAgICAgcmVzdWx0LmZpcmVmb3hvcyA9IHRcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3NpbGsvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0gIHtcbiAgICAgICAgbmFtZTogJ0FtYXpvbiBTaWxrJ1xuICAgICAgLCBzaWxrOiB0XG4gICAgICAsIHZlcnNpb24gOiBnZXRGaXJzdE1hdGNoKC9zaWxrXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdBbmRyb2lkJ1xuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvcGhhbnRvbS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdQaGFudG9tSlMnXG4gICAgICAsIHBoYW50b206IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvcGhhbnRvbWpzXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvYmxhY2tiZXJyeXxcXGJiYlxcZCsvaS50ZXN0KHVhKSB8fCAvcmltXFxzdGFibGV0L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0JsYWNrQmVycnknXG4gICAgICAsIGJsYWNrYmVycnk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvYmxhY2tiZXJyeVtcXGRdK1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoLyh3ZWJ8aHB3KW9zL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1dlYk9TJ1xuICAgICAgLCB3ZWJvczogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC93KD86ZWIpP29zYnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH07XG4gICAgICAvdG91Y2hwYWRcXC8vaS50ZXN0KHVhKSAmJiAocmVzdWx0LnRvdWNocGFkID0gdClcbiAgICB9XG4gICAgZWxzZSBpZiAoL2JhZGEvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQmFkYSdcbiAgICAgICwgYmFkYTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9kb2xmaW5cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmICgvdGl6ZW4vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnVGl6ZW4nXG4gICAgICAsIHRpemVuOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OnRpemVuXFxzPyk/YnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSkgfHwgdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zYWZhcmkvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FmYXJpJ1xuICAgICAgLCBzYWZhcmk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6IGdldEZpcnN0TWF0Y2goL14oLiopXFwvKC4qKSAvKSxcbiAgICAgICAgdmVyc2lvbjogZ2V0U2Vjb25kTWF0Y2goL14oLiopXFwvKC4qKSAvKVxuICAgICB9O1xuICAgfVxuXG4gICAgLy8gc2V0IHdlYmtpdCBvciBnZWNrbyBmbGFnIGZvciBicm93c2VycyBiYXNlZCBvbiB0aGVzZSBlbmdpbmVzXG4gICAgaWYgKCFyZXN1bHQubXNlZGdlICYmIC8oYXBwbGUpP3dlYmtpdC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQubmFtZSA9IHJlc3VsdC5uYW1lIHx8IFwiV2Via2l0XCJcbiAgICAgIHJlc3VsdC53ZWJraXQgPSB0XG4gICAgICBpZiAoIXJlc3VsdC52ZXJzaW9uICYmIHZlcnNpb25JZGVudGlmaWVyKSB7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFyZXN1bHQub3BlcmEgJiYgL2dlY2tvXFwvL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUgfHwgXCJHZWNrb1wiXG4gICAgICByZXN1bHQuZ2Vja28gPSB0XG4gICAgICByZXN1bHQudmVyc2lvbiA9IHJlc3VsdC52ZXJzaW9uIHx8IGdldEZpcnN0TWF0Y2goL2dlY2tvXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgIH1cblxuICAgIC8vIHNldCBPUyBmbGFncyBmb3IgcGxhdGZvcm1zIHRoYXQgaGF2ZSBtdWx0aXBsZSBicm93c2Vyc1xuICAgIGlmICghcmVzdWx0Lm1zZWRnZSAmJiAoYW5kcm9pZCB8fCByZXN1bHQuc2lsaykpIHtcbiAgICAgIHJlc3VsdC5hbmRyb2lkID0gdFxuICAgIH0gZWxzZSBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICByZXN1bHRbaW9zZGV2aWNlXSA9IHRcbiAgICAgIHJlc3VsdC5pb3MgPSB0XG4gICAgfVxuXG4gICAgLy8gT1MgdmVyc2lvbiBleHRyYWN0aW9uXG4gICAgdmFyIG9zVmVyc2lvbiA9ICcnO1xuICAgIGlmIChyZXN1bHQud2luZG93c3Bob25lKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC93aW5kb3dzIHBob25lICg/Om9zKT9cXHM/KFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKGlvc2RldmljZSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvb3MgKFxcZCsoW19cXHNdXFxkKykqKSBsaWtlIG1hYyBvcyB4L2kpO1xuICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uLnJlcGxhY2UoL1tfXFxzXS9nLCAnLicpO1xuICAgIH0gZWxzZSBpZiAoYW5kcm9pZCkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvYW5kcm9pZFsgXFwvLV0oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LndlYm9zKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC8oPzp3ZWJ8aHB3KW9zXFwvKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5ibGFja2JlcnJ5KSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9yaW1cXHN0YWJsZXRcXHNvc1xccyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQuYmFkYSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvYmFkYVxcLyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQudGl6ZW4pIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL3RpemVuW1xcL1xcc10oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH1cbiAgICBpZiAob3NWZXJzaW9uKSB7XG4gICAgICByZXN1bHQub3N2ZXJzaW9uID0gb3NWZXJzaW9uO1xuICAgIH1cblxuICAgIC8vIGRldmljZSB0eXBlIGV4dHJhY3Rpb25cbiAgICB2YXIgb3NNYWpvclZlcnNpb24gPSBvc1ZlcnNpb24uc3BsaXQoJy4nKVswXTtcbiAgICBpZiAodGFibGV0IHx8IGlvc2RldmljZSA9PSAnaXBhZCcgfHwgKGFuZHJvaWQgJiYgKG9zTWFqb3JWZXJzaW9uID09IDMgfHwgKG9zTWFqb3JWZXJzaW9uID09IDQgJiYgIW1vYmlsZSkpKSB8fCByZXN1bHQuc2lsaykge1xuICAgICAgcmVzdWx0LnRhYmxldCA9IHRcbiAgICB9IGVsc2UgaWYgKG1vYmlsZSB8fCBpb3NkZXZpY2UgPT0gJ2lwaG9uZScgfHwgaW9zZGV2aWNlID09ICdpcG9kJyB8fCBhbmRyb2lkIHx8IHJlc3VsdC5ibGFja2JlcnJ5IHx8IHJlc3VsdC53ZWJvcyB8fCByZXN1bHQuYmFkYSkge1xuICAgICAgcmVzdWx0Lm1vYmlsZSA9IHRcbiAgICB9XG5cbiAgICAvLyBHcmFkZWQgQnJvd3NlciBTdXBwb3J0XG4gICAgLy8gaHR0cDovL2RldmVsb3Blci55YWhvby5jb20veXVpL2FydGljbGVzL2dic1xuICAgIGlmIChyZXN1bHQubXNlZGdlIHx8XG4gICAgICAgIChyZXN1bHQubXNpZSAmJiByZXN1bHQudmVyc2lvbiA+PSAxMCkgfHxcbiAgICAgICAgKHJlc3VsdC55YW5kZXhicm93c2VyICYmIHJlc3VsdC52ZXJzaW9uID49IDE1KSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA+PSAyMCkgfHxcbiAgICAgICAgKHJlc3VsdC5maXJlZm94ICYmIHJlc3VsdC52ZXJzaW9uID49IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uID49IDYpIHx8XG4gICAgICAgIChyZXN1bHQub3BlcmEgJiYgcmVzdWx0LnZlcnNpb24gPj0gMTAuMCkgfHxcbiAgICAgICAgKHJlc3VsdC5pb3MgJiYgcmVzdWx0Lm9zdmVyc2lvbiAmJiByZXN1bHQub3N2ZXJzaW9uLnNwbGl0KFwiLlwiKVswXSA+PSA2KSB8fFxuICAgICAgICAocmVzdWx0LmJsYWNrYmVycnkgJiYgcmVzdWx0LnZlcnNpb24gPj0gMTAuMSlcbiAgICAgICAgKSB7XG4gICAgICByZXN1bHQuYSA9IHQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKChyZXN1bHQubXNpZSAmJiByZXN1bHQudmVyc2lvbiA8IDEwKSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA8IDIwKSB8fFxuICAgICAgICAocmVzdWx0LmZpcmVmb3ggJiYgcmVzdWx0LnZlcnNpb24gPCAyMC4wKSB8fFxuICAgICAgICAocmVzdWx0LnNhZmFyaSAmJiByZXN1bHQudmVyc2lvbiA8IDYpIHx8XG4gICAgICAgIChyZXN1bHQub3BlcmEgJiYgcmVzdWx0LnZlcnNpb24gPCAxMC4wKSB8fFxuICAgICAgICAocmVzdWx0LmlvcyAmJiByZXN1bHQub3N2ZXJzaW9uICYmIHJlc3VsdC5vc3ZlcnNpb24uc3BsaXQoXCIuXCIpWzBdIDwgNilcbiAgICAgICAgKSB7XG4gICAgICByZXN1bHQuYyA9IHRcbiAgICB9IGVsc2UgcmVzdWx0LnggPSB0XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICB2YXIgYm93c2VyID0gZGV0ZWN0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnID8gbmF2aWdhdG9yLnVzZXJBZ2VudCA6ICcnKVxuXG4gIGJvd3Nlci50ZXN0ID0gZnVuY3Rpb24gKGJyb3dzZXJMaXN0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBicm93c2VyTGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGJyb3dzZXJJdGVtID0gYnJvd3Nlckxpc3RbaV07XG4gICAgICBpZiAodHlwZW9mIGJyb3dzZXJJdGVtPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChicm93c2VySXRlbSBpbiBib3dzZXIpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKlxuICAgKiBTZXQgb3VyIGRldGVjdCBtZXRob2QgdG8gdGhlIG1haW4gYm93c2VyIG9iamVjdCBzbyB3ZSBjYW5cbiAgICogcmV1c2UgaXQgdG8gdGVzdCBvdGhlciB1c2VyIGFnZW50cy5cbiAgICogVGhpcyBpcyBuZWVkZWQgdG8gaW1wbGVtZW50IGZ1dHVyZSB0ZXN0cy5cbiAgICovXG4gIGJvd3Nlci5fZGV0ZWN0ID0gZGV0ZWN0O1xuXG4gIHJldHVybiBib3dzZXJcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudG9DU1MgPSB0b0NTUztcbmV4cG9ydHMudG9PYmplY3QgPSB0b09iamVjdDtcbmV4cG9ydHMubmVzdFBzZXVkb0NsYXNzZXMgPSBuZXN0UHNldWRvQ2xhc3NlcztcbmV4cG9ydHMuaW1wb3J0YW50aWZ5ID0gaW1wb3J0YW50aWZ5O1xuXG52YXIgX2NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4vdXRpbHMvY2FtZWxUb0Rhc2hDYXNlJyk7XG5cbnZhciBfY2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NhbWVsVG9EYXNoQ2FzZSk7XG5cbnZhciBfZGFzaFRvQ2FtZWxDYXNlID0gcmVxdWlyZSgnLi91dGlscy9kYXNoVG9DYW1lbENhc2UnKTtcblxudmFyIF9kYXNoVG9DYW1lbENhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGFzaFRvQ2FtZWxDYXNlKTtcblxudmFyIF9pc051bWJlciA9IHJlcXVpcmUoJy4vdXRpbHMvaXNOdW1iZXInKTtcblxudmFyIF9pc051bWJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc051bWJlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90b0FycmF5KGFycikgeyByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpID8gYXJyIDogQXJyYXkuZnJvbShhcnIpOyB9XG5cbi8qKlxuKiBDcmVhdGVzIGEgdmFsaWQgQ1NTIHN0cmluZyBvdXQgb2YgYW4gb2JqZWN0IG9mIHN0eWxlc1xuKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIC0gYW4gb2JqZWN0IHdpdGggQ1NTIHN0eWxlc1xuKiBAcGFyYW0ge3N0cmluZ30gdW5pdCAtIHVuaXQgdGhhdCBnZXRzIGFwcGxpZWQgdG8gbnVtYmVyIHZhbHVlc1xuKi9cbmZ1bmN0aW9uIHRvQ1NTKHN0eWxlcykge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gIHZhciB1bml0ID0gb3B0aW9ucy51bml0IHx8ICdweCc7XG4gIHZhciBydWxlU2VwYXJhdG9yID0gb3B0aW9ucy5ydWxlU2VwYXJhdG9yIHx8ICcnO1xuICB2YXIgc2VsZWN0b3JTZXBhcmF0b3IgPSBvcHRpb25zLnNlbGVjdG9yU2VwYXJhdG9yIHx8ICcnO1xuICB2YXIgaW5kZW50ID0gb3B0aW9ucy5pbmRlbnQgfHwgJyc7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHN0eWxlcykucmVkdWNlKGZ1bmN0aW9uIChydWxlcywgcHJvcGVydHkpIHtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldO1xuICAgIC8vIHJlc29sdmUgbXVsdGkgdmFsdWVzIHBhc3NlZCBhcyBhbiBhcnJheVxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJzsnICsgcHJvcGVydHkgKyAnOicgKyBydWxlU2VwYXJhdG9yICsgaW5kZW50KTtcbiAgICB9XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAvLyBwcmVyZW5kZXIgbmVzdGVkIHN0eWxlIG9iamVjdHNcbiAgICAgIHJ1bGVzICs9ICgwLCBfY2FtZWxUb0Rhc2hDYXNlMi5kZWZhdWx0KShwcm9wZXJ0eSkgKyAneycgKyBzZWxlY3RvclNlcGFyYXRvciArIHRvQ1NTKHZhbHVlLCBvcHRpb25zKSArIHNlbGVjdG9yU2VwYXJhdG9yICsgJ30nICsgc2VsZWN0b3JTZXBhcmF0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhZGQgYW4gc2VtaWNvbG9uIGF0IHRoZSBlbmQgb2YgZWFjaCBydWxlIChpZiBub3QgdGhlIGxhc3Qgb25lKVxuICAgICAgICBpZiAocnVsZXMgIT09ICcnKSB7XG4gICAgICAgICAgcnVsZXMgKz0gJzsnICsgcnVsZVNlcGFyYXRvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGFkZHMgdW5pdHMgdG8gQ1NTIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHVuaXRsZXNzXG4gICAgICAgIC8vIGJ1dCBhcmUgcHJvdmlkZWQgYXMgYSBwbGFpbiBudW1iZXJcbiAgICAgICAgaWYgKCgwLCBfaXNOdW1iZXIyLmRlZmF1bHQpKHByb3BlcnR5LCB2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgdW5pdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bGVzICs9IGluZGVudCArICgwLCBfY2FtZWxUb0Rhc2hDYXNlMi5kZWZhdWx0KShwcm9wZXJ0eSkgKyAnOicgKyB2YWx1ZTtcbiAgICAgIH1cbiAgICByZXR1cm4gcnVsZXM7XG4gIH0sICcnKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBvYmplY3Qgd2l0aCBDU1Mga2V5LXZhbHVlIHBhaXJzIG91dCBvZiBhIENTUyBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBDU1MgLSBDU1Mgc3RyaW5nIHRoYXQgZ2V0cyBvYmplY3RpZmllZFxuICovXG5mdW5jdGlvbiB0b09iamVjdChDU1MpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICB2YXIgcmVwbGFjZXIgPSBvcHRpb25zLnJlcGxhY2VyIHx8IHsgJy4nOiAnJyB9O1xuXG4gIC8vIHRoaXMgY2hlY2tzIGlmIHRoZSBzdHJpbmcgaXMgbWFkZSBvZiBzZWxlY3RvcnNcbiAgdmFyIHJlcGxhY2VQcmVmaXhlcyA9IE9iamVjdC5rZXlzKHJlcGxhY2VyKTtcbiAgdmFyIHJlcGxhY2VyUmVnRXhwID0gcmVwbGFjZVByZWZpeGVzLm1hcChmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgcmV0dXJuICdbJyArIHByZWZpeCArICddJztcbiAgfSkuam9pbignfCcpO1xuICB2YXIgc2VsZWN0b3JzID0gQ1NTLm1hdGNoKG5ldyBSZWdFeHAoJygnICsgcmVwbGFjZXJSZWdFeHAgKyAnKT9bYS16MC05LV86XFwoXFwpIF0qe1tefV0qfScsICdnJykpO1xuXG4gIC8vIFJlc29sdmUgbmVzdGVkIENTUyBzZWxlY3RvciBzdHJpbmdzXG4gIGlmIChzZWxlY3RvcnMgJiYgc2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gc2VsZWN0b3JzLnJlZHVjZShmdW5jdGlvbiAocnVsZXMsIHJ1bGUpIHtcbiAgICAgIC8vIHNlcGVyYXRlIHNlbGVjdG9yIChjbGFzc05hbWUpIGFuZCBpdHMgc3R5bGVzXG4gICAgICAvLyByZXBsYWNlIHNlbGVjdG9yIHByZWZpeGVzIGFjY29yZGluZyB0aGUgcmVwbGFjZXIgc2V0dGluZ3NcbiAgICAgIHZhciBzZWxlY3RvciA9IHJ1bGUubWF0Y2goL1tee10qLylbMF07XG4gICAgICB2YXIgc3R5bGVzID0gcnVsZS5yZXBsYWNlKHNlbGVjdG9yLCAnJyk7XG5cbiAgICAgIHZhciBjbGFzc05hbWUgPSByZXBsYWNlUHJlZml4ZXMucmVkdWNlKGZ1bmN0aW9uICh0cmFuc2Zvcm1lZENsYXNzTmFtZSwgcHJlZml4KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1lZENsYXNzTmFtZS5pbmRleE9mKHByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICB0cmFuc2Zvcm1lZENsYXNzTmFtZSA9IHRyYW5zZm9ybWVkQ2xhc3NOYW1lLnJlcGxhY2UocHJlZml4LCByZXBsYWNlcltwcmVmaXhdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWRDbGFzc05hbWU7XG4gICAgICB9LCBzZWxlY3Rvci50cmltKCkpO1xuXG4gICAgICAvLyByZWN1cnNpdmUgb2JqZWN0aWZ5IG9uIHB1cmUgc3R5bGVzIHN0cmluZyAod2l0aG91dCB3cmFwcGluZyBicmFja2V0cylcbiAgICAgIHJ1bGVzW2NsYXNzTmFtZV0gPSB0b09iamVjdChzdHlsZXMucmVwbGFjZShuZXcgUmVnRXhwKCd7fH0nLCAnZycpLCAnJykpO1xuICAgICAgcmV0dXJuIHJ1bGVzO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIC8vIHNwbGl0dGluZyB0aGUgcnVsZXMgdG8gc2luZ2xlIHN0YXRlbWVudHNcbiAgcmV0dXJuIENTUy5zcGxpdCgnOycpLnJlZHVjZShmdW5jdGlvbiAocnVsZXMsIHJ1bGUpIHtcbiAgICB2YXIgX3J1bGUkc3BsaXQgPSBydWxlLnNwbGl0KCc6Jyk7XG5cbiAgICB2YXIgX3J1bGUkc3BsaXQyID0gX3NsaWNlZFRvQXJyYXkoX3J1bGUkc3BsaXQsIDIpO1xuXG4gICAgdmFyIHByb3BlcnR5ID0gX3J1bGUkc3BsaXQyWzBdO1xuICAgIHZhciB2YWx1ZSA9IF9ydWxlJHNwbGl0MlsxXTtcblxuICAgIC8vIHRyaW1taW5nIGJvdGggdG8gcmVtb3ZlIHBhZGRpbmcgd2hpdGVzcGFjZVxuXG4gICAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIC8vIGNvbnZlcnQgbnVtYmVyIHN0cmluZ3MgdG8gcmVhbCBudW1iZXJzIGlmIHBvc3NpYmxlXG4gICAgICAvLyBJbXByb3ZlcyB1c2FiaWxpdHkgYW5kIGRldmVsb3BlciBleHBlcmllbmNlXG4gICAgICB2YXIgbnVtYmVyVmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgIGlmIChudW1iZXJWYWx1ZSA9PSB2YWx1ZSB8fCBudW1iZXJWYWx1ZSA9PSB2YWx1ZS5yZXBsYWNlKCdweCcsICcnKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIHZhbHVlID0gbnVtYmVyVmFsdWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGRhc2gtY2FzaW5nIHRoZSBwcm9wZXJ0eVxuICAgICAgcHJvcGVydHkgPSAoMCwgX2Rhc2hUb0NhbWVsQ2FzZTIuZGVmYXVsdCkocHJvcGVydHkudHJpbSgpKTtcblxuICAgICAgLy8gbXV0aXBsZSB2YWx1ZXMgLyBmYWxsYmFjayB2YWx1ZXMgZ2V0IGFkZGVkIHRvIGFuIGFycmF5XG4gICAgICAvLyB3aGlsZSB0aGUgb3JkZXIgc3RheXMgdGhlIGV4YWN0IHNhbWUgb3JkZXJcbiAgICAgIGlmIChydWxlcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgdmFsdWUgPSBbcnVsZXNbcHJvcGVydHldXS5jb25jYXQodmFsdWUpO1xuICAgICAgfVxuICAgICAgcnVsZXNbcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBydWxlcztcbiAgfSwge30pO1xufVxuXG52YXIgc2V0RG90UHJvcCA9IGZ1bmN0aW9uIHNldERvdFByb3Aob2JqLCBwYXRoLCB2YWx1ZSkge1xuICB2YXIgcHJvcHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gIHZhciBtYWpvclBzZXVkbyA9IHByb3BzLnBvcCgpO1xuXG4gIHZhciBuZXdPYmogPSBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKG91dHB1dCwgcHJvcGVydHkpIHtcbiAgICAvLyBhZGQgc2VsZWN0b3IgaWYgbm90IGFscmVhZHkgZXhpc3RpbmdcbiAgICBpZiAoIW91dHB1dFtwcm9wZXJ0eV0pIHtcbiAgICAgIG91dHB1dFtwcm9wZXJ0eV0gPSB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0W3Byb3BlcnR5XTtcbiAgfSwgb2JqKTtcblxuICBuZXdPYmpbbWFqb3JQc2V1ZG9dID0gdmFsdWU7XG59O1xuXG4vKipcbiAqIE5lc3RzIHBzZXVkbyBzZWxlY3RvcnMgaW50byB0aGVpciByZWZlcmVuY2Ugc2VsZWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBhbiBvYmplY3Qgd2l0aCBzdHlsZXNcbiAqL1xuZnVuY3Rpb24gbmVzdFBzZXVkb0NsYXNzZXMoc3R5bGVzKSB7XG4gIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICBpZiAoc2VsZWN0b3IuaW5kZXhPZignOicpID4gLTEpIHtcbiAgICAgIHZhciBfc2VsZWN0b3Ikc3BsaXQgPSBzZWxlY3Rvci5zcGxpdCgnOicpO1xuXG4gICAgICB2YXIgX3NlbGVjdG9yJHNwbGl0MiA9IF90b0FycmF5KF9zZWxlY3RvciRzcGxpdCk7XG5cbiAgICAgIHZhciBzZWwgPSBfc2VsZWN0b3Ikc3BsaXQyWzBdO1xuXG4gICAgICB2YXIgcHNldWRvID0gX3NlbGVjdG9yJHNwbGl0Mi5zbGljZSgxKTtcbiAgICAgIC8vIGFkZCBzZWxlY3RvciBpZiBub3QgYWxyZWFkeSBleGlzdGluZ1xuXG4gICAgICBpZiAoIXN0eWxlc1tzZWxdKSB7XG4gICAgICAgIHN0eWxlc1tzZWxdID0ge307XG4gICAgICB9XG5cbiAgICAgIHNldERvdFByb3Aoc3R5bGVzW3NlbF0sICc6JyArIHBzZXVkby5qb2luKCcuOicpLCBzdHlsZXNbc2VsZWN0b3JdKTtcblxuICAgICAgLy8gYWRkIHBzZXVkbyB0byBzZWxlY3RvciBvYmplY3RcbiAgICAgIGRlbGV0ZSBzdHlsZXNbc2VsZWN0b3JdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN0eWxlcztcbn1cblxuLyoqXG4gKiBBZGRzIGFuICFpbXBvcnRhbnQgZmxhZyB0byBldmVyeSB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIGFuIG9iamVjdCB3aXRoIHN0eWxlc1xuICovXG5mdW5jdGlvbiBpbXBvcnRhbnRpZnkoc3R5bGVzKSB7XG4gIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldO1xuICAgIC8vIGFkZCAhaW1wb3J0YW50IGZsYWcgdG8gYWNoaWV2ZSBoaWdoZXIgcHJpb3JpdHkgdGhhbiBpbmxpbmUgc3R5bGVzXG4gICAgaWYgKHZhbHVlLnRvU3RyaW5nKCkuaW5kZXhPZignIWltcG9ydGFudCcpID09PSAtMSkge1xuICAgICAgc3R5bGVzW3Byb3BlcnR5XSA9IHZhbHVlICsgJyFpbXBvcnRhbnQnO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN0eWxlcztcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIENvbnZlcnRzIGEgZGFzaC1jYXNlIHN0cmluZyB0byBhIGNhbWVsLWNhc2Ugc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gc3RyIHRoYXQgZ2V0cyBjb252ZXJ0ZWQgdG8gY2FtZWwtY2FzZVxuICovXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gbWF0Y2hbMV0udG9VcHBlckNhc2UoKTtcbiAgfSkucmVwbGFjZSgvXk1zL2csICdtcycpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzVW5pdGxlc3NQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vaXNVbml0bGVzc1Byb3BlcnR5Jyk7XG5cbnZhciBfaXNVbml0bGVzc1Byb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVW5pdGxlc3NQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuICEoMCwgX2lzVW5pdGxlc3NQcm9wZXJ0eTIuZGVmYXVsdCkocHJvcGVydHkpICYmICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpICYmIHZhbHVlICE9PSAwO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVmlldztcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IGhhc2ggb2JqZWN0LlxuICovXG5mdW5jdGlvbiBIYXNoKCkge31cblxuLy8gQXZvaWQgaW5oZXJpdGluZyBmcm9tIGBPYmplY3QucHJvdG90eXBlYCB3aGVuIHBvc3NpYmxlLlxuSGFzaC5wcm90b3R5cGUgPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiBvYmplY3RQcm90bztcblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcDtcbiIsInZhciBtYXBDbGVhciA9IHJlcXVpcmUoJy4vX21hcENsZWFyJyksXG4gICAgbWFwRGVsZXRlID0gcmVxdWlyZSgnLi9fbWFwRGVsZXRlJyksXG4gICAgbWFwR2V0ID0gcmVxdWlyZSgnLi9fbWFwR2V0JyksXG4gICAgbWFwSGFzID0gcmVxdWlyZSgnLi9fbWFwSGFzJyksXG4gICAgbWFwU2V0ID0gcmVxdWlyZSgnLi9fbWFwU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSB2YWx1ZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcERlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcFNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXBDYWNoZTtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgUmVmbGVjdCA9IHJvb3QuUmVmbGVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWZsZWN0O1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldDtcbiIsInZhciBzdGFja0NsZWFyID0gcmVxdWlyZSgnLi9fc3RhY2tDbGVhcicpLFxuICAgIHN0YWNrRGVsZXRlID0gcmVxdWlyZSgnLi9fc3RhY2tEZWxldGUnKSxcbiAgICBzdGFja0dldCA9IHJlcXVpcmUoJy4vX3N0YWNrR2V0JyksXG4gICAgc3RhY2tIYXMgPSByZXF1aXJlKCcuL19zdGFja0hhcycpLFxuICAgIHN0YWNrU2V0ID0gcmVxdWlyZSgnLi9fc3RhY2tTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gdmFsdWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YWNrO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVpbnQ4QXJyYXk7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWFrTWFwO1xuIiwiLyoqXG4gKiBBZGRzIHRoZSBrZXktdmFsdWUgYHBhaXJgIHRvIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gcGFpciBUaGUga2V5LXZhbHVlIHBhaXIgdG8gYWRkLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgbWFwYC5cbiAqL1xuZnVuY3Rpb24gYWRkTWFwRW50cnkobWFwLCBwYWlyKSB7XG4gIC8vIERvbid0IHJldHVybiBgTWFwI3NldGAgYmVjYXVzZSBpdCBkb2Vzbid0IHJldHVybiB0aGUgbWFwIGluc3RhbmNlIGluIElFIDExLlxuICBtYXAuc2V0KHBhaXJbMF0sIHBhaXJbMV0pO1xuICByZXR1cm4gbWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZE1hcEVudHJ5O1xuIiwiLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gYHNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBtb2RpZnkuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhZGQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBzZXRgLlxuICovXG5mdW5jdGlvbiBhZGRTZXRFbnRyeShzZXQsIHZhbHVlKSB7XG4gIHNldC5hZGQodmFsdWUpO1xuICByZXR1cm4gc2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZFNldEVudHJ5O1xuIiwiLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICB2YXIgbGVuZ3RoID0gYXJncy5sZW5ndGg7XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcGx5O1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlFYWNoO1xuIiwiLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5UHVzaDtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnJlZHVjZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5UmVkdWNlO1xuIiwidmFyIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXNzaWduVmFsdWVgIGV4Y2VwdCB0aGF0IGl0IGRvZXNuJ3QgYXNzaWduXG4gKiBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICFlcShvYmplY3Rba2V5XSwgdmFsdWUpKSB8fFxuICAgICAgKHR5cGVvZiBrZXkgPT0gJ251bWJlcicgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ25NZXJnZVZhbHVlO1xuIiwidmFyIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduVmFsdWU7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgYXNzb2NpYXRpdmUgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NEZWxldGUoYXJyYXksIGtleSkge1xuICB2YXIgaW5kZXggPSBhc3NvY0luZGV4T2YoYXJyYXksIGtleSk7XG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGFycmF5Lmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBhcnJheS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChhcnJheSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jRGVsZXRlO1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIEdldHMgdGhlIGFzc29jaWF0aXZlIGFycmF5IHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFzc29jR2V0KGFycmF5LCBrZXkpIHtcbiAgdmFyIGluZGV4ID0gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpO1xuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogYXJyYXlbaW5kZXhdWzFdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jR2V0O1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhbiBhc3NvY2lhdGl2ZSBhcnJheSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NIYXMoYXJyYXksIGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpID4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzb2NIYXM7XG4iLCJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NvY0luZGV4T2Y7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgYXNzb2NpYXRpdmUgYXJyYXkgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICovXG5mdW5jdGlvbiBhc3NvY1NldChhcnJheSwga2V5LCB2YWx1ZSkge1xuICB2YXIgaW5kZXggPSBhc3NvY0luZGV4T2YoYXJyYXksIGtleSk7XG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBhcnJheS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgYXJyYXlbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NvY1NldDtcbiIsInZhciBjb3B5T2JqZWN0ID0gcmVxdWlyZSgnLi9fY29weU9iamVjdCcpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlc1xuICogb3IgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBjb3B5T2JqZWN0KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ247XG4iLCJ2YXIgU3RhY2sgPSByZXF1aXJlKCcuL19TdGFjaycpLFxuICAgIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vX2FycmF5RWFjaCcpLFxuICAgIGFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduVmFsdWUnKSxcbiAgICBiYXNlQXNzaWduID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnbicpLFxuICAgIGNsb25lQnVmZmVyID0gcmVxdWlyZSgnLi9fY2xvbmVCdWZmZXInKSxcbiAgICBjb3B5QXJyYXkgPSByZXF1aXJlKCcuL19jb3B5QXJyYXknKSxcbiAgICBjb3B5U3ltYm9scyA9IHJlcXVpcmUoJy4vX2NvcHlTeW1ib2xzJyksXG4gICAgZ2V0QWxsS2V5cyA9IHJlcXVpcmUoJy4vX2dldEFsbEtleXMnKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpbml0Q2xvbmVBcnJheSA9IHJlcXVpcmUoJy4vX2luaXRDbG9uZUFycmF5JyksXG4gICAgaW5pdENsb25lQnlUYWcgPSByZXF1aXJlKCcuL19pbml0Q2xvbmVCeVRhZycpLFxuICAgIGluaXRDbG9uZU9iamVjdCA9IHJlcXVpcmUoJy4vX2luaXRDbG9uZU9iamVjdCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc0hvc3RPYmplY3QgPSByZXF1aXJlKCcuL19pc0hvc3RPYmplY3QnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgc3VwcG9ydGVkIGJ5IGBfLmNsb25lYC4gKi9cbnZhciBjbG9uZWFibGVUYWdzID0ge307XG5jbG9uZWFibGVUYWdzW2FyZ3NUYWddID0gY2xvbmVhYmxlVGFnc1thcnJheVRhZ10gPVxuY2xvbmVhYmxlVGFnc1thcnJheUJ1ZmZlclRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGFWaWV3VGFnXSA9XG5jbG9uZWFibGVUYWdzW2Jvb2xUYWddID0gY2xvbmVhYmxlVGFnc1tkYXRlVGFnXSA9XG5jbG9uZWFibGVUYWdzW2Zsb2F0MzJUYWddID0gY2xvbmVhYmxlVGFnc1tmbG9hdDY0VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDhUYWddID0gY2xvbmVhYmxlVGFnc1tpbnQxNlRhZ10gPVxuY2xvbmVhYmxlVGFnc1tpbnQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW21hcFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tudW1iZXJUYWddID0gY2xvbmVhYmxlVGFnc1tvYmplY3RUYWddID1cbmNsb25lYWJsZVRhZ3NbcmVnZXhwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc2V0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3N0cmluZ1RhZ10gPSBjbG9uZWFibGVUYWdzW3N5bWJvbFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50MTZUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbmNsb25lYWJsZVRhZ3NbZXJyb3JUYWddID0gY2xvbmVhYmxlVGFnc1tmdW5jVGFnXSA9XG5jbG9uZWFibGVUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2xvbmVgIGFuZCBgXy5jbG9uZURlZXBgIHdoaWNoIHRyYWNrc1xuICogdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRnVsbF0gU3BlY2lmeSBhIGNsb25lIGluY2x1ZGluZyBzeW1ib2xzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XSBUaGUga2V5IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIHBhcmVudCBvYmplY3Qgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgdGhlaXIgY2xvbmUgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGNsb25lZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUNsb25lKHZhbHVlLCBpc0RlZXAsIGlzRnVsbCwgY3VzdG9taXplciwga2V5LCBvYmplY3QsIHN0YWNrKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChjdXN0b21pemVyKSB7XG4gICAgcmVzdWx0ID0gb2JqZWN0ID8gY3VzdG9taXplcih2YWx1ZSwga2V5LCBvYmplY3QsIHN0YWNrKSA6IGN1c3RvbWl6ZXIodmFsdWUpO1xuICB9XG4gIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSk7XG4gIGlmIChpc0Fycikge1xuICAgIHJlc3VsdCA9IGluaXRDbG9uZUFycmF5KHZhbHVlKTtcbiAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgcmV0dXJuIGNvcHlBcnJheSh2YWx1ZSwgcmVzdWx0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhZyA9IGdldFRhZyh2YWx1ZSksXG4gICAgICAgIGlzRnVuYyA9IHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG5cbiAgICBpZiAoaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY2xvbmVCdWZmZXIodmFsdWUsIGlzRGVlcCk7XG4gICAgfVxuICAgIGlmICh0YWcgPT0gb2JqZWN0VGFnIHx8IHRhZyA9PSBhcmdzVGFnIHx8IChpc0Z1bmMgJiYgIW9iamVjdCkpIHtcbiAgICAgIGlmIChpc0hvc3RPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lT2JqZWN0KGlzRnVuYyA/IHt9IDogdmFsdWUpO1xuICAgICAgaWYgKCFpc0RlZXApIHtcbiAgICAgICAgcmV0dXJuIGNvcHlTeW1ib2xzKHZhbHVlLCBiYXNlQXNzaWduKHJlc3VsdCwgdmFsdWUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFjbG9uZWFibGVUYWdzW3RhZ10pIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA/IHZhbHVlIDoge307XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBpbml0Q2xvbmVCeVRhZyh2YWx1ZSwgdGFnLCBiYXNlQ2xvbmUsIGlzRGVlcCk7XG4gICAgfVxuICB9XG4gIC8vIENoZWNrIGZvciBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCByZXR1cm4gaXRzIGNvcnJlc3BvbmRpbmcgY2xvbmUuXG4gIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KHZhbHVlKTtcbiAgaWYgKHN0YWNrZWQpIHtcbiAgICByZXR1cm4gc3RhY2tlZDtcbiAgfVxuICBzdGFjay5zZXQodmFsdWUsIHJlc3VsdCk7XG5cbiAgaWYgKCFpc0Fycikge1xuICAgIHZhciBwcm9wcyA9IGlzRnVsbCA/IGdldEFsbEtleXModmFsdWUpIDoga2V5cyh2YWx1ZSk7XG4gIH1cbiAgLy8gUmVjdXJzaXZlbHkgcG9wdWxhdGUgY2xvbmUgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHZhbHVlLCBmdW5jdGlvbihzdWJWYWx1ZSwga2V5KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBrZXkgPSBzdWJWYWx1ZTtcbiAgICAgIHN1YlZhbHVlID0gdmFsdWVba2V5XTtcbiAgICB9XG4gICAgYXNzaWduVmFsdWUocmVzdWx0LCBrZXksIGJhc2VDbG9uZShzdWJWYWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDbG9uZTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvdHlwZSBUaGUgb2JqZWN0IHRvIGluaGVyaXQgZnJvbS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDcmVhdGUocHJvdG8pIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHByb3RvKSA/IG9iamVjdENyZWF0ZShwcm90bykgOiB7fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ3JlYXRlO1xuIiwidmFyIGFycmF5UHVzaCA9IHJlcXVpcmUoJy4vX2FycmF5UHVzaCcpLFxuICAgIGlzRmxhdHRlbmFibGUgPSByZXF1aXJlKCcuL19pc0ZsYXR0ZW5hYmxlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmxhdHRlbmAgd2l0aCBzdXBwb3J0IGZvciByZXN0cmljdGluZyBmbGF0dGVuaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmxhdHRlbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBUaGUgbWF4aW11bSByZWN1cnNpb24gZGVwdGguXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtwcmVkaWNhdGU9aXNGbGF0dGVuYWJsZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzU3RyaWN0XSBSZXN0cmljdCB0byB2YWx1ZXMgdGhhdCBwYXNzIGBwcmVkaWNhdGVgIGNoZWNrcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHQ9W11dIFRoZSBpbml0aWFsIHJlc3VsdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZUZsYXR0ZW4oYXJyYXksIGRlcHRoLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgcHJlZGljYXRlIHx8IChwcmVkaWNhdGUgPSBpc0ZsYXR0ZW5hYmxlKTtcbiAgcmVzdWx0IHx8IChyZXN1bHQgPSBbXSk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKGRlcHRoID4gMCAmJiBwcmVkaWNhdGUodmFsdWUpKSB7XG4gICAgICBpZiAoZGVwdGggPiAxKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIGJhc2VGbGF0dGVuKHZhbHVlLCBkZXB0aCAtIDEsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheVB1c2gocmVzdWx0LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaXNTdHJpY3QpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGbGF0dGVuO1xuIiwidmFyIGNhc3RQYXRoID0gcmVxdWlyZSgnLi9fY2FzdFBhdGgnKSxcbiAgICBpc0tleSA9IHJlcXVpcmUoJy4vX2lzS2V5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gIHZhciBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbcGF0aFtpbmRleCsrXV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXQ7XG4iLCJ2YXIgYXJyYXlQdXNoID0gcmVxdWlyZSgnLi9fYXJyYXlQdXNoJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpXG4gICAgPyByZXN1bHRcbiAgICA6IGFycmF5UHVzaChyZXN1bHQsIHN5bWJvbHNGdW5jKG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRBbGxLZXlzO1xuIiwidmFyIGdldFByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2dldFByb3RvdHlwZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc2Agd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VIYXMob2JqZWN0LCBrZXkpIHtcbiAgLy8gQXZvaWQgYSBidWcgaW4gSUUgMTAtMTEgd2hlcmUgb2JqZWN0cyB3aXRoIGEgW1tQcm90b3R5cGVdXSBvZiBgbnVsbGAsXG4gIC8vIHRoYXQgYXJlIGNvbXBvc2VkIGVudGlyZWx5IG9mIGluZGV4IHByb3BlcnRpZXMsIHJldHVybiBgZmFsc2VgIGZvclxuICAvLyBgaGFzT3duUHJvcGVydHlgIGNoZWNrcyBvZiB0aGVtLlxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgfHxcbiAgICAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJiBrZXkgaW4gb2JqZWN0ICYmIGdldFByb3RvdHlwZShvYmplY3QpID09PSBudWxsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSGFzO1xuIiwiLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHNraXAgdGhlIGNvbnN0cnVjdG9yXG4gKiBwcm9wZXJ0eSBvZiBwcm90b3R5cGVzIG9yIHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICByZXR1cm4gbmF0aXZlS2V5cyhPYmplY3Qob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUtleXM7XG4iLCJ2YXIgUmVmbGVjdCA9IHJlcXVpcmUoJy4vX1JlZmxlY3QnKSxcbiAgICBpdGVyYXRvclRvQXJyYXkgPSByZXF1aXJlKCcuL19pdGVyYXRvclRvQXJyYXknKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZW51bWVyYXRlID0gUmVmbGVjdCA/IFJlZmxlY3QuZW51bWVyYXRlIDogdW5kZWZpbmVkLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHNraXAgdGhlIGNvbnN0cnVjdG9yXG4gKiBwcm9wZXJ0eSBvZiBwcm90b3R5cGVzIG9yIHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIG9iamVjdCA9IG9iamVjdCA9PSBudWxsID8gb2JqZWN0IDogT2JqZWN0KG9iamVjdCk7XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBGYWxsYmFjayBmb3IgSUUgPCA5IHdpdGggZXM2LXNoaW0uXG5pZiAoZW51bWVyYXRlICYmICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgJ3ZhbHVlT2YnOiAxIH0sICd2YWx1ZU9mJykpIHtcbiAgYmFzZUtleXNJbiA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBpdGVyYXRvclRvQXJyYXkoZW51bWVyYXRlKG9iamVjdCkpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VLZXlzSW47XG4iLCJ2YXIgU3RhY2sgPSByZXF1aXJlKCcuL19TdGFjaycpLFxuICAgIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vX2FycmF5RWFjaCcpLFxuICAgIGFzc2lnbk1lcmdlVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25NZXJnZVZhbHVlJyksXG4gICAgYmFzZU1lcmdlRGVlcCA9IHJlcXVpcmUoJy4vX2Jhc2VNZXJnZURlZXAnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuL2tleXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAob2JqZWN0ID09PSBzb3VyY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCEoaXNBcnJheShzb3VyY2UpIHx8IGlzVHlwZWRBcnJheShzb3VyY2UpKSkge1xuICAgIHZhciBwcm9wcyA9IGtleXNJbihzb3VyY2UpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCBzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHNyY1ZhbHVlO1xuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHNyY1ZhbHVlKSkge1xuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZTtcbiIsInZhciBhc3NpZ25NZXJnZVZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduTWVyZ2VWYWx1ZScpLFxuICAgIGJhc2VDbG9uZSA9IHJlcXVpcmUoJy4vX2Jhc2VDbG9uZScpLFxuICAgIGNvcHlBcnJheSA9IHJlcXVpcmUoJy4vX2NvcHlBcnJheScpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZU9iamVjdCA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2VPYmplY3QnKSxcbiAgICBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4vaXNQbGFpbk9iamVjdCcpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vaXNUeXBlZEFycmF5JyksXG4gICAgdG9QbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4vdG9QbGFpbk9iamVjdCcpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIG1lcmdlRnVuYywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldLFxuICAgICAgc3RhY2tlZCA9IHN0YWNrLmdldChzcmNWYWx1ZSk7XG5cbiAgaWYgKHN0YWNrZWQpIHtcbiAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBzdGFja2VkKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICA6IHVuZGVmaW5lZDtcblxuICB2YXIgaXNDb21tb24gPSBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpIHtcbiAgICAgIGlmIChpc0FycmF5KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNBcnJheUxpa2VPYmplY3Qob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gY29weUFycmF5KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGJhc2VDbG9uZShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJndW1lbnRzKG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRvUGxhaW5PYmplY3Qob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWlzT2JqZWN0KG9ialZhbHVlKSB8fCAoc3JjSW5kZXggJiYgaXNGdW5jdGlvbihvYmpWYWx1ZSkpKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrLnNldChzcmNWYWx1ZSwgbmV3VmFsdWUpO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIG1lcmdlRnVuYyhuZXdWYWx1ZSwgc3JjVmFsdWUsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjayk7XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKHNyY1ZhbHVlKTtcbiAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZURlZXA7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQcm9wZXJ0eTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRpbWVzO1xuIiwidmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBzdHJpbmdUb1BhdGggPSByZXF1aXJlKCcuL19zdHJpbmdUb1BhdGgnKTtcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBzdHJpbmdUb1BhdGgodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhc3RQYXRoO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGdsb2JhbCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge251bGx8T2JqZWN0fSBSZXR1cm5zIGB2YWx1ZWAgaWYgaXQncyBhIGdsb2JhbCBvYmplY3QsIGVsc2UgYG51bGxgLlxuICovXG5mdW5jdGlvbiBjaGVja0dsb2JhbCh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHZhbHVlLk9iamVjdCA9PT0gT2JqZWN0KSA/IHZhbHVlIDogbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja0dsb2JhbDtcbiIsInZhciBVaW50OEFycmF5ID0gcmVxdWlyZSgnLi9fVWludDhBcnJheScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgYXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgYXJyYXlCdWZmZXIuY29uc3RydWN0b3IoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuc2V0KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVBcnJheUJ1ZmZlcjtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IG5ldyBidWZmZXIuY29uc3RydWN0b3IoYnVmZmVyLmxlbmd0aCk7XG4gIGJ1ZmZlci5jb3B5KHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVCdWZmZXI7XG4iLCJ2YXIgY2xvbmVBcnJheUJ1ZmZlciA9IHJlcXVpcmUoJy4vX2Nsb25lQXJyYXlCdWZmZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGRhdGFWaWV3YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFWaWV3IFRoZSBkYXRhIHZpZXcgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIGRhdGEgdmlldy5cbiAqL1xuZnVuY3Rpb24gY2xvbmVEYXRhVmlldyhkYXRhVmlldywgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKGRhdGFWaWV3LmJ1ZmZlcikgOiBkYXRhVmlldy5idWZmZXI7XG4gIHJldHVybiBuZXcgZGF0YVZpZXcuY29uc3RydWN0b3IoYnVmZmVyLCBkYXRhVmlldy5ieXRlT2Zmc2V0LCBkYXRhVmlldy5ieXRlTGVuZ3RoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZURhdGFWaWV3O1xuIiwidmFyIGFkZE1hcEVudHJ5ID0gcmVxdWlyZSgnLi9fYWRkTWFwRW50cnknKSxcbiAgICBhcnJheVJlZHVjZSA9IHJlcXVpcmUoJy4vX2FycmF5UmVkdWNlJyksXG4gICAgbWFwVG9BcnJheSA9IHJlcXVpcmUoJy4vX21hcFRvQXJyYXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBtYXAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lTWFwKG1hcCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKG1hcFRvQXJyYXkobWFwKSwgdHJ1ZSkgOiBtYXBUb0FycmF5KG1hcCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkTWFwRW50cnksIG5ldyBtYXAuY29uc3RydWN0b3IpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lTWFwO1xuIiwiLyoqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgZmxhZ3MgZnJvbSB0aGVpciBjb2VyY2VkIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVGbGFncyA9IC9cXHcqJC87XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGByZWdleHBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVnZXhwIFRoZSByZWdleHAgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgcmVnZXhwLlxuICovXG5mdW5jdGlvbiBjbG9uZVJlZ0V4cChyZWdleHApIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyByZWdleHAuY29uc3RydWN0b3IocmVnZXhwLnNvdXJjZSwgcmVGbGFncy5leGVjKHJlZ2V4cCkpO1xuICByZXN1bHQubGFzdEluZGV4ID0gcmVnZXhwLmxhc3RJbmRleDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZVJlZ0V4cDtcbiIsInZhciBhZGRTZXRFbnRyeSA9IHJlcXVpcmUoJy4vX2FkZFNldEVudHJ5JyksXG4gICAgYXJyYXlSZWR1Y2UgPSByZXF1aXJlKCcuL19hcnJheVJlZHVjZScpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBzZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc2V0LlxuICovXG5mdW5jdGlvbiBjbG9uZVNldChzZXQsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhzZXRUb0FycmF5KHNldCksIHRydWUpIDogc2V0VG9BcnJheShzZXQpO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZFNldEVudHJ5LCBuZXcgc2V0LmNvbnN0cnVjdG9yKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZVNldDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIHRoZSBgc3ltYm9sYCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzeW1ib2wgVGhlIHN5bWJvbCBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc3ltYm9sIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTeW1ib2woc3ltYm9sKSB7XG4gIHJldHVybiBzeW1ib2xWYWx1ZU9mID8gT2JqZWN0KHN5bWJvbFZhbHVlT2YuY2FsbChzeW1ib2wpKSA6IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lU3ltYm9sO1xuIiwidmFyIGNsb25lQXJyYXlCdWZmZXIgPSByZXF1aXJlKCcuL19jbG9uZUFycmF5QnVmZmVyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGB0eXBlZEFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVkQXJyYXkgVGhlIHR5cGVkIGFycmF5IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB0eXBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHR5cGVkQXJyYXksIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcih0eXBlZEFycmF5LmJ1ZmZlcikgOiB0eXBlZEFycmF5LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyB0eXBlZEFycmF5LmNvbnN0cnVjdG9yKGJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5Lmxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVUeXBlZEFycmF5O1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weUFycmF5O1xuIiwidmFyIGFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduVmFsdWUnKTtcblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb3BpZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weU9iamVjdChzb3VyY2UsIHByb3BzLCBvYmplY3QsIGN1c3RvbWl6ZXIpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSlcbiAgICAgIDogc291cmNlW2tleV07XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weU9iamVjdDtcbiIsInZhciBjb3B5T2JqZWN0ID0gcmVxdWlyZSgnLi9fY29weU9iamVjdCcpLFxuICAgIGdldFN5bWJvbHMgPSByZXF1aXJlKCcuL19nZXRTeW1ib2xzJyk7XG5cbi8qKlxuICogQ29waWVzIG93biBzeW1ib2wgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weVN5bWJvbHMoc291cmNlLCBvYmplY3QpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3Qoc291cmNlLCBnZXRTeW1ib2xzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVN5bWJvbHM7XG4iLCJ2YXIgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL19pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIHJlc3QgPSByZXF1aXJlKCcuL3Jlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5hc3NpZ25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gcmVzdChmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZDtcblxuICAgIGN1c3RvbWl6ZXIgPSB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQXNzaWduZXI7XG4iLCJ2YXIgYmFzZUdldEFsbEtleXMgPSByZXF1aXJlKCcuL19iYXNlR2V0QWxsS2V5cycpLFxuICAgIGdldFN5bWJvbHMgPSByZXF1aXJlKCcuL19nZXRTeW1ib2xzJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXMsIGdldFN5bWJvbHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEFsbEtleXM7XG4iLCJ2YXIgYmFzZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fYmFzZVByb3BlcnR5Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGFcbiAqIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKSB0aGF0IGFmZmVjdHNcbiAqIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldExlbmd0aDtcbiIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4vaXNOYXRpdmUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICByZXR1cm4gaXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuIiwiLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUdldFByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuLyoqXG4gKiBHZXRzIHRoZSBgW1tQcm90b3R5cGVdXWAgb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7bnVsbHxPYmplY3R9IFJldHVybnMgdGhlIGBbW1Byb3RvdHlwZV1dYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UHJvdG90eXBlKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVHZXRQcm90b3R5cGUoT2JqZWN0KHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UHJvdG90eXBlO1xuIiwiLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2wgcHJvcGVydGllcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRTeW1ib2xzKG9iamVjdCkge1xuICAvLyBDb2VyY2UgYG9iamVjdGAgdG8gYW4gb2JqZWN0IHRvIGF2b2lkIG5vbi1vYmplY3QgZXJyb3JzIGluIFY4LlxuICAvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzQ0MyBmb3IgbW9yZSBkZXRhaWxzLlxuICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzKE9iamVjdChvYmplY3QpKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIElFIDwgMTEuXG5pZiAoIWdldE93blByb3BlcnR5U3ltYm9scykge1xuICBnZXRTeW1ib2xzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFN5bWJvbHM7XG4iLCJ2YXIgRGF0YVZpZXcgPSByZXF1aXJlKCcuL19EYXRhVmlldycpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIFByb21pc2UgPSByZXF1aXJlKCcuL19Qcm9taXNlJyksXG4gICAgU2V0ID0gcmVxdWlyZSgnLi9fU2V0JyksXG4gICAgV2Vha01hcCA9IHJlcXVpcmUoJy4vX1dlYWtNYXAnKSxcbiAgICB0b1NvdXJjZSA9IHJlcXVpcmUoJy4vX3RvU291cmNlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExLFxuLy8gZm9yIGRhdGEgdmlld3MgaW4gRWRnZSwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUYWc7XG4iLCJ2YXIgaGFzaEhhcyA9IHJlcXVpcmUoJy4vX2hhc2hIYXMnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoaGFzaCwga2V5KSB7XG4gIHJldHVybiBoYXNoSGFzKGhhc2gsIGtleSkgJiYgZGVsZXRlIGhhc2hba2V5XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoRGVsZXRlO1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoaGFzaCwga2V5KSB7XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gaGFzaFtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGhhc2gsIGtleSkgPyBoYXNoW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEdldDtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoaGFzaCwga2V5KSB7XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBoYXNoW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoaGFzaCwga2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoSGFzO1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChoYXNoLCBrZXksIHZhbHVlKSB7XG4gIGhhc2hba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hTZXQ7XG4iLCJ2YXIgYmFzZVRpbWVzID0gcmVxdWlyZSgnLi9fYmFzZVRpbWVzJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzU3RyaW5nID0gcmVxdWlyZSgnLi9pc1N0cmluZycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgaW5kZXgga2V5cyBmb3IgYG9iamVjdGAgdmFsdWVzIG9mIGFycmF5cyxcbiAqIGBhcmd1bWVudHNgIG9iamVjdHMsIGFuZCBzdHJpbmdzLCBvdGhlcndpc2UgYG51bGxgIGlzIHJldHVybmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl8bnVsbH0gUmV0dXJucyBpbmRleCBrZXlzLCBlbHNlIGBudWxsYC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhLZXlzKG9iamVjdCkge1xuICB2YXIgbGVuZ3RoID0gb2JqZWN0ID8gb2JqZWN0Lmxlbmd0aCA6IHVuZGVmaW5lZDtcbiAgaWYgKGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNTdHJpbmcob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKSkge1xuICAgIHJldHVybiBiYXNlVGltZXMobGVuZ3RoLCBTdHJpbmcpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluZGV4S2V5cztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBhcnJheS5jb25zdHJ1Y3RvcihsZW5ndGgpO1xuXG4gIC8vIEFkZCBwcm9wZXJ0aWVzIGFzc2lnbmVkIGJ5IGBSZWdFeHAjZXhlY2AuXG4gIGlmIChsZW5ndGggJiYgdHlwZW9mIGFycmF5WzBdID09ICdzdHJpbmcnICYmIGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksICdpbmRleCcpKSB7XG4gICAgcmVzdWx0LmluZGV4ID0gYXJyYXkuaW5kZXg7XG4gICAgcmVzdWx0LmlucHV0ID0gYXJyYXkuaW5wdXQ7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbml0Q2xvbmVBcnJheTtcbiIsInZhciBjbG9uZUFycmF5QnVmZmVyID0gcmVxdWlyZSgnLi9fY2xvbmVBcnJheUJ1ZmZlcicpLFxuICAgIGNsb25lRGF0YVZpZXcgPSByZXF1aXJlKCcuL19jbG9uZURhdGFWaWV3JyksXG4gICAgY2xvbmVNYXAgPSByZXF1aXJlKCcuL19jbG9uZU1hcCcpLFxuICAgIGNsb25lUmVnRXhwID0gcmVxdWlyZSgnLi9fY2xvbmVSZWdFeHAnKSxcbiAgICBjbG9uZVNldCA9IHJlcXVpcmUoJy4vX2Nsb25lU2V0JyksXG4gICAgY2xvbmVTeW1ib2wgPSByZXF1aXJlKCcuL19jbG9uZVN5bWJvbCcpLFxuICAgIGNsb25lVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vX2Nsb25lVHlwZWRBcnJheScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUgYmFzZWQgb24gaXRzIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjbG9uaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQnlUYWcob2JqZWN0LCB0YWcsIGNsb25lRnVuYywgaXNEZWVwKSB7XG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVBcnJheUJ1ZmZlcihvYmplY3QpO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIHJldHVybiBuZXcgQ3Rvcigrb2JqZWN0KTtcblxuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICByZXR1cm4gY2xvbmVEYXRhVmlldyhvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIGZsb2F0MzJUYWc6IGNhc2UgZmxvYXQ2NFRhZzpcbiAgICBjYXNlIGludDhUYWc6IGNhc2UgaW50MTZUYWc6IGNhc2UgaW50MzJUYWc6XG4gICAgY2FzZSB1aW50OFRhZzogY2FzZSB1aW50OENsYW1wZWRUYWc6IGNhc2UgdWludDE2VGFnOiBjYXNlIHVpbnQzMlRhZzpcbiAgICAgIHJldHVybiBjbG9uZVR5cGVkQXJyYXkob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICByZXR1cm4gY2xvbmVNYXAob2JqZWN0LCBpc0RlZXAsIGNsb25lRnVuYyk7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIHJldHVybiBuZXcgQ3RvcihvYmplY3QpO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgICByZXR1cm4gY2xvbmVSZWdFeHAob2JqZWN0KTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgcmV0dXJuIGNsb25lU2V0KG9iamVjdCwgaXNEZWVwLCBjbG9uZUZ1bmMpO1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTeW1ib2wob2JqZWN0KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXRDbG9uZUJ5VGFnO1xuIiwidmFyIGJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL19iYXNlQ3JlYXRlJyksXG4gICAgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lT2JqZWN0O1xuIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZU9iamVjdCA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2VPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGZsYXR0ZW5hYmxlIGBhcmd1bWVudHNgIG9iamVjdCBvciBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmbGF0dGVuYWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0ZsYXR0ZW5hYmxlKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGbGF0dGVuYWJsZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNIb3N0T2JqZWN0O1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgPyArdmFsdWUgOiAtMTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuIiwidmFyIGVxID0gcmVxdWlyZSgnLi9lcScpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0l0ZXJhdGVlQ2FsbDtcbiIsInZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUlzRGVlcFByb3AgPSAvXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLFxuICAgIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuICFpc0FycmF5KHZhbHVlKSAmJlxuICAgIChpc1N5bWJvbCh2YWx1ZSkgfHwgcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0tleTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgKHR5cGUgPT0gJ3N0cmluZycgJiYgdmFsdWUgIT0gJ19fcHJvdG9fXycpIHx8IHZhbHVlID09IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXlhYmxlO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUHJvdG90eXBlO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgaXRlcmF0b3JgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlcmF0b3IgVGhlIGl0ZXJhdG9yIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gaXRlcmF0b3JUb0FycmF5KGl0ZXJhdG9yKSB7XG4gIHZhciBkYXRhLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCEoZGF0YSA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgIHJlc3VsdC5wdXNoKGRhdGEudmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXRlcmF0b3JUb0FycmF5O1xuIiwidmFyIEhhc2ggPSByZXF1aXJlKCcuL19IYXNoJyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IE1hcCA/IG5ldyBNYXAgOiBbXSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDbGVhcjtcbiIsInZhciBNYXAgPSByZXF1aXJlKCcuL19NYXAnKSxcbiAgICBhc3NvY0RlbGV0ZSA9IHJlcXVpcmUoJy4vX2Fzc29jRGVsZXRlJyksXG4gICAgaGFzaERlbGV0ZSA9IHJlcXVpcmUoJy4vX2hhc2hEZWxldGUnKSxcbiAgICBpc0tleWFibGUgPSByZXF1aXJlKCcuL19pc0tleWFibGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcERlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoaXNLZXlhYmxlKGtleSkpIHtcbiAgICByZXR1cm4gaGFzaERlbGV0ZSh0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gZGF0YS5zdHJpbmcgOiBkYXRhLmhhc2gsIGtleSk7XG4gIH1cbiAgcmV0dXJuIE1hcCA/IGRhdGEubWFwWydkZWxldGUnXShrZXkpIDogYXNzb2NEZWxldGUoZGF0YS5tYXAsIGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwRGVsZXRlO1xuIiwidmFyIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIGFzc29jR2V0ID0gcmVxdWlyZSgnLi9fYXNzb2NHZXQnKSxcbiAgICBoYXNoR2V0ID0gcmVxdWlyZSgnLi9faGFzaEdldCcpLFxuICAgIGlzS2V5YWJsZSA9IHJlcXVpcmUoJy4vX2lzS2V5YWJsZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChpc0tleWFibGUoa2V5KSkge1xuICAgIHJldHVybiBoYXNoR2V0KHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBkYXRhLnN0cmluZyA6IGRhdGEuaGFzaCwga2V5KTtcbiAgfVxuICByZXR1cm4gTWFwID8gZGF0YS5tYXAuZ2V0KGtleSkgOiBhc3NvY0dldChkYXRhLm1hcCwga2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBHZXQ7XG4iLCJ2YXIgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgYXNzb2NIYXMgPSByZXF1aXJlKCcuL19hc3NvY0hhcycpLFxuICAgIGhhc2hIYXMgPSByZXF1aXJlKCcuL19oYXNoSGFzJyksXG4gICAgaXNLZXlhYmxlID0gcmVxdWlyZSgnLi9faXNLZXlhYmxlJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChpc0tleWFibGUoa2V5KSkge1xuICAgIHJldHVybiBoYXNoSGFzKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBkYXRhLnN0cmluZyA6IGRhdGEuaGFzaCwga2V5KTtcbiAgfVxuICByZXR1cm4gTWFwID8gZGF0YS5tYXAuaGFzKGtleSkgOiBhc3NvY0hhcyhkYXRhLm1hcCwga2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBIYXM7XG4iLCJ2YXIgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgYXNzb2NTZXQgPSByZXF1aXJlKCcuL19hc3NvY1NldCcpLFxuICAgIGhhc2hTZXQgPSByZXF1aXJlKCcuL19oYXNoU2V0JyksXG4gICAgaXNLZXlhYmxlID0gcmVxdWlyZSgnLi9faXNLZXlhYmxlJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoaXNLZXlhYmxlKGtleSkpIHtcbiAgICBoYXNoU2V0KHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBkYXRhLnN0cmluZyA6IGRhdGEuaGFzaCwga2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoTWFwKSB7XG4gICAgZGF0YS5tYXAuc2V0KGtleSwgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGFzc29jU2V0KGRhdGEubWFwLCBrZXksIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBTZXQ7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBUb0FycmF5O1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdGl2ZUNyZWF0ZTtcbiIsInZhciBjaGVja0dsb2JhbCA9IHJlcXVpcmUoJy4vX2NoZWNrR2xvYmFsJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVybWluZSBpZiB2YWx1ZXMgYXJlIG9mIHRoZSBsYW5ndWFnZSB0eXBlIGBPYmplY3RgLiAqL1xudmFyIG9iamVjdFR5cGVzID0ge1xuICAnZnVuY3Rpb24nOiB0cnVlLFxuICAnb2JqZWN0JzogdHJ1ZVxufTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IChvYmplY3RUeXBlc1t0eXBlb2YgZXhwb3J0c10gJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSlcbiAgPyBleHBvcnRzXG4gIDogdW5kZWZpbmVkO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IChvYmplY3RUeXBlc1t0eXBlb2YgbW9kdWxlXSAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSlcbiAgPyBtb2R1bGVcbiAgOiB1bmRlZmluZWQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IGNoZWNrR2xvYmFsKGZyZWVFeHBvcnRzICYmIGZyZWVNb2R1bGUgJiYgdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gY2hlY2tHbG9iYWwob2JqZWN0VHlwZXNbdHlwZW9mIHNlbGZdICYmIHNlbGYpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHdpbmRvd2AuICovXG52YXIgZnJlZVdpbmRvdyA9IGNoZWNrR2xvYmFsKG9iamVjdFR5cGVzW3R5cGVvZiB3aW5kb3ddICYmIHdpbmRvdyk7XG5cbi8qKiBEZXRlY3QgYHRoaXNgIGFzIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHRoaXNHbG9iYWwgPSBjaGVja0dsb2JhbChvYmplY3RUeXBlc1t0eXBlb2YgdGhpc10gJiYgdGhpcyk7XG5cbi8qKlxuICogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC5cbiAqXG4gKiBUaGUgYHRoaXNgIHZhbHVlIGlzIHVzZWQgaWYgaXQncyB0aGUgZ2xvYmFsIG9iamVjdCB0byBhdm9pZCBHcmVhc2Vtb25rZXknc1xuICogcmVzdHJpY3RlZCBgd2luZG93YCBvYmplY3QsIG90aGVyd2lzZSB0aGUgYHdpbmRvd2Agb2JqZWN0IGlzIHVzZWQuXG4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fFxuICAoKGZyZWVXaW5kb3cgIT09ICh0aGlzR2xvYmFsICYmIHRoaXNHbG9iYWwud2luZG93KSkgJiYgZnJlZVdpbmRvdykgfHxcbiAgICBmcmVlU2VsZiB8fCB0aGlzR2xvYmFsIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsIi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvQXJyYXk7XG4iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7ICdhcnJheSc6IFtdLCAnbWFwJzogbnVsbCB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrQ2xlYXI7XG4iLCJ2YXIgYXNzb2NEZWxldGUgPSByZXF1aXJlKCcuL19hc3NvY0RlbGV0ZScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgYXJyYXkgPSBkYXRhLmFycmF5O1xuXG4gIHJldHVybiBhcnJheSA/IGFzc29jRGVsZXRlKGFycmF5LCBrZXkpIDogZGF0YS5tYXBbJ2RlbGV0ZSddKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tEZWxldGU7XG4iLCJ2YXIgYXNzb2NHZXQgPSByZXF1aXJlKCcuL19hc3NvY0dldCcpO1xuXG4vKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgYXJyYXkgPSBkYXRhLmFycmF5O1xuXG4gIHJldHVybiBhcnJheSA/IGFzc29jR2V0KGFycmF5LCBrZXkpIDogZGF0YS5tYXAuZ2V0KGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tHZXQ7XG4iLCJ2YXIgYXNzb2NIYXMgPSByZXF1aXJlKCcuL19hc3NvY0hhcycpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGFycmF5ID0gZGF0YS5hcnJheTtcblxuICByZXR1cm4gYXJyYXkgPyBhc3NvY0hhcyhhcnJheSwga2V5KSA6IGRhdGEubWFwLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrSGFzO1xuIiwidmFyIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKSxcbiAgICBhc3NvY1NldCA9IHJlcXVpcmUoJy4vX2Fzc29jU2V0Jyk7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgYXJyYXkgPSBkYXRhLmFycmF5O1xuXG4gIGlmIChhcnJheSkge1xuICAgIGlmIChhcnJheS5sZW5ndGggPCAoTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBhc3NvY1NldChhcnJheSwga2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEuYXJyYXkgPSBudWxsO1xuICAgICAgZGF0YS5tYXAgPSBuZXcgTWFwQ2FjaGUoYXJyYXkpO1xuICAgIH1cbiAgfVxuICB2YXIgbWFwID0gZGF0YS5tYXA7XG4gIGlmIChtYXApIHtcbiAgICBtYXAuc2V0KGtleSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrU2V0O1xuIiwidmFyIG1lbW9pemUgPSByZXF1aXJlKCcuL21lbW9pemUnKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG52YXIgc3RyaW5nVG9QYXRoID0gbWVtb2l6ZShmdW5jdGlvbihzdHJpbmcpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB0b1N0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgIHJlc3VsdC5wdXNoKHF1b3RlID8gc3RyaW5nLnJlcGxhY2UocmVFc2NhcGVDaGFyLCAnJDEnKSA6IChudW1iZXIgfHwgbWF0Y2gpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdUb1BhdGg7XG4iLCIvKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG4iLCJ2YXIgYXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25WYWx1ZScpLFxuICAgIGNvcHlPYmplY3QgPSByZXF1aXJlKCcuL19jb3B5T2JqZWN0JyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuL19jcmVhdGVBc3NpZ25lcicpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzUHJvdG90eXBlID0gcmVxdWlyZSgnLi9faXNQcm90b3R5cGUnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKiBEZXRlY3QgaWYgcHJvcGVydGllcyBzaGFkb3dpbmcgdGhvc2Ugb24gYE9iamVjdC5wcm90b3R5cGVgIGFyZSBub24tZW51bWVyYWJsZS4gKi9cbnZhciBub25FbnVtU2hhZG93cyA9ICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgJ3ZhbHVlT2YnOiAxIH0sICd2YWx1ZU9mJyk7XG5cbi8qKlxuICogQXNzaWducyBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0cyB0byB0aGVcbiAqIGRlc3RpbmF0aW9uIG9iamVjdC4gU291cmNlIG9iamVjdHMgYXJlIGFwcGxpZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxuICogU3Vic2VxdWVudCBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgIGFuZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYE9iamVjdC5hc3NpZ25gXShodHRwczovL21kbi5pby9PYmplY3QvYXNzaWduKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMTAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYyA9IDM7XG4gKiB9XG4gKlxuICogZnVuY3Rpb24gQmFyKCkge1xuICogICB0aGlzLmUgPSA1O1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuZCA9IDQ7XG4gKiBCYXIucHJvdG90eXBlLmYgPSA2O1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28sIG5ldyBCYXIpO1xuICogLy8gPT4geyAnYSc6IDEsICdjJzogMywgJ2UnOiA1IH1cbiAqL1xudmFyIGFzc2lnbiA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlKSB7XG4gIGlmIChub25FbnVtU2hhZG93cyB8fCBpc1Byb3RvdHlwZShzb3VyY2UpIHx8IGlzQXJyYXlMaWtlKHNvdXJjZSkpIHtcbiAgICBjb3B5T2JqZWN0KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpO1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgc291cmNlW2tleV0pO1xuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqIHZhciBnZXR0ZXIgPSBfLmNvbnN0YW50KG9iamVjdCk7XG4gKlxuICogZ2V0dGVyKCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25zdGFudDtcbiIsIi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiB2YXIgb3RoZXIgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcTtcbiIsInZhciBiYXNlRmxhdHRlbiA9IHJlcXVpcmUoJy4vX2Jhc2VGbGF0dGVuJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgZmxhdHRlbnMgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmZsYXR0ZW5EZWVwKFsxLCBbMiwgWzMsIFs0XV0sIDVdXSk7XG4gKiAvLyA9PiBbMSwgMiwgMywgNCwgNV1cbiAqL1xuZnVuY3Rpb24gZmxhdHRlbkRlZXAoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuIGxlbmd0aCA/IGJhc2VGbGF0dGVuKGFycmF5LCBJTkZJTklUWSkgOiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmbGF0dGVuRGVlcDtcbiIsInZhciBiYXNlR2V0ID0gcmVxdWlyZSgnLi9fYmFzZUdldCcpO1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCwgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHVzZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFt7ICdiJzogeyAnYyc6IDMgfSB9XSB9O1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2FbMF0uYi5jJyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCAnYS5iLmMnLCAnZGVmYXVsdCcpO1xuICogLy8gPT4gJ2RlZmF1bHQnXG4gKi9cbmZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXQ7XG4iLCJ2YXIgaXNBcnJheUxpa2VPYmplY3QgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgaW5jb3JyZWN0bHkgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQHR5cGUge0Z1bmN0aW9ufVxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCJ2YXIgZ2V0TGVuZ3RoID0gcmVxdWlyZSgnLi9fZ2V0TGVuZ3RoJyksXG4gICAgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2U7XG4iLCJ2YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlT2JqZWN0O1xuIiwidmFyIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYm9vbGVhbiBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Jvb2xlYW4oZmFsc2UpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCb29sZWFuKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBib29sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Jvb2xlYW47XG4iLCJ2YXIgY29uc3RhbnQgPSByZXF1aXJlKCcuL2NvbnN0YW50JyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZXJtaW5lIGlmIHZhbHVlcyBhcmUgb2YgdGhlIGxhbmd1YWdlIHR5cGUgYE9iamVjdGAuICovXG52YXIgb2JqZWN0VHlwZXMgPSB7XG4gICdmdW5jdGlvbic6IHRydWUsXG4gICdvYmplY3QnOiB0cnVlXG59O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gKG9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlKVxuICA/IGV4cG9ydHNcbiAgOiB1bmRlZmluZWQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gKG9iamVjdFR5cGVzW3R5cGVvZiBtb2R1bGVdICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlKVxuICA/IG1vZHVsZVxuICA6IHVuZGVmaW5lZDtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gKGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cylcbiAgPyBmcmVlRXhwb3J0c1xuICA6IHVuZGVmaW5lZDtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSAhQnVmZmVyID8gY29uc3RhbnQoZmFsc2UpIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQnVmZmVyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0J1ZmZlcjtcbiIsInZhciBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyksXG4gICAgaXNTdHJpbmcgPSByZXF1aXJlKCcuL2lzU3RyaW5nJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKiBEZXRlY3QgaWYgcHJvcGVydGllcyBzaGFkb3dpbmcgdGhvc2Ugb24gYE9iamVjdC5wcm90b3R5cGVgIGFyZSBub24tZW51bWVyYWJsZS4gKi9cbnZhciBub25FbnVtU2hhZG93cyA9ICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgJ3ZhbHVlT2YnOiAxIH0sICd2YWx1ZU9mJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gZW1wdHkgb2JqZWN0LCBjb2xsZWN0aW9uLCBtYXAsIG9yIHNldC5cbiAqXG4gKiBPYmplY3RzIGFyZSBjb25zaWRlcmVkIGVtcHR5IGlmIHRoZXkgaGF2ZSBubyBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWRcbiAqIHByb3BlcnRpZXMuXG4gKlxuICogQXJyYXktbGlrZSB2YWx1ZXMgc3VjaCBhcyBgYXJndW1lbnRzYCBvYmplY3RzLCBhcnJheXMsIGJ1ZmZlcnMsIHN0cmluZ3MsIG9yXG4gKiBqUXVlcnktbGlrZSBjb2xsZWN0aW9ucyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgYSBgbGVuZ3RoYCBvZiBgMGAuXG4gKiBTaW1pbGFybHksIG1hcHMgYW5kIHNldHMgYXJlIGNvbnNpZGVyZWQgZW1wdHkgaWYgdGhleSBoYXZlIGEgYHNpemVgIG9mIGAwYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBlbXB0eSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRW1wdHkobnVsbCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0VtcHR5KHRydWUpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFbXB0eSgxKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRW1wdHkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0VtcHR5KHsgJ2EnOiAxIH0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmXG4gICAgICAoaXNBcnJheSh2YWx1ZSkgfHwgaXNTdHJpbmcodmFsdWUpIHx8IGlzRnVuY3Rpb24odmFsdWUuc3BsaWNlKSB8fFxuICAgICAgICBpc0FyZ3VtZW50cyh2YWx1ZSkgfHwgaXNCdWZmZXIodmFsdWUpKSkge1xuICAgIHJldHVybiAhdmFsdWUubGVuZ3RoO1xuICB9XG4gIGlmIChpc09iamVjdExpa2UodmFsdWUpKSB7XG4gICAgdmFyIHRhZyA9IGdldFRhZyh2YWx1ZSk7XG4gICAgaWYgKHRhZyA9PSBtYXBUYWcgfHwgdGFnID09IHNldFRhZykge1xuICAgICAgcmV0dXJuICF2YWx1ZS5zaXplO1xuICAgIH1cbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gIShub25FbnVtU2hhZG93cyAmJiBrZXlzKHZhbHVlKS5sZW5ndGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRW1wdHk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCB3ZWFrIG1hcCBjb25zdHJ1Y3RvcnMsXG4gIC8vIGFuZCBQaGFudG9tSlMgMS45IHdoaWNoIHJldHVybnMgJ2Z1bmN0aW9uJyBmb3IgYE5vZGVMaXN0YCBpbnN0YW5jZXMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNIb3N0T2JqZWN0ID0gcmVxdWlyZSgnLi9faXNIb3N0T2JqZWN0JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc05hdGl2ZTtcbiIsInZhciBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgTnVtYmVyYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqICoqTm90ZToqKiBUbyBleGNsdWRlIGBJbmZpbml0eWAsIGAtSW5maW5pdHlgLCBhbmQgYE5hTmAsIHdoaWNoIGFyZVxuICogY2xhc3NpZmllZCBhcyBudW1iZXJzLCB1c2UgdGhlIGBfLmlzRmluaXRlYCBtZXRob2QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTnVtYmVyKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc051bWJlcignMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IG51bWJlclRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOdW1iZXI7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBnZXRQcm90b3R5cGUgPSByZXF1aXJlKCcuL19nZXRQcm90b3R5cGUnKSxcbiAgICBpc0hvc3RPYmplY3QgPSByZXF1aXJlKCcuL19pc0hvc3RPYmplY3QnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHxcbiAgICAgIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpICE9IG9iamVjdFRhZyB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTdHJpbmdgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3RyaW5nKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3RyaW5nKDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fFxuICAgICghaXNBcnJheSh2YWx1ZSkgJiYgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzdHJpbmdUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3RyaW5nO1xuIiwidmFyIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwidmFyIGJhc2VIYXMgPSByZXF1aXJlKCcuL19iYXNlSGFzJyksXG4gICAgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGluZGV4S2V5cyA9IHJlcXVpcmUoJy4vX2luZGV4S2V5cycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KTtcbiAgaWYgKCEoaXNQcm90byB8fCBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBiYXNlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciBpbmRleGVzID0gaW5kZXhLZXlzKG9iamVjdCksXG4gICAgICBza2lwSW5kZXhlcyA9ICEhaW5kZXhlcyxcbiAgICAgIHJlc3VsdCA9IGluZGV4ZXMgfHwgW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoYmFzZUhhcyhvYmplY3QsIGtleSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkgJiZcbiAgICAgICAgIShpc1Byb3RvICYmIGtleSA9PSAnY29uc3RydWN0b3InKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwidmFyIGJhc2VLZXlzSW4gPSByZXF1aXJlKCcuL19iYXNlS2V5c0luJyksXG4gICAgaW5kZXhLZXlzID0gcmVxdWlyZSgnLi9faW5kZXhLZXlzJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICBwcm9wcyA9IGJhc2VLZXlzSW4ob2JqZWN0KSxcbiAgICAgIHByb3BzTGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgaW5kZXhlcyA9IGluZGV4S2V5cyhvYmplY3QpLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWluZGV4ZXMsXG4gICAgICByZXN1bHQgPSBpbmRleGVzIHx8IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IHByb3BzTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzSW47XG4iLCJ2YXIgTWFwQ2FjaGUgPSByZXF1aXJlKCcuL19NYXBDYWNoZScpO1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgbWFwIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoZSBjYWNoZSBpcyBleHBvc2VkIGFzIHRoZSBgY2FjaGVgIHByb3BlcnR5IG9uIHRoZSBtZW1vaXplZFxuICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICogW2BNYXBgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1wcm9wZXJ0aWVzLW9mLXRoZS1tYXAtcHJvdG90eXBlLW9iamVjdClcbiAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6aW5nIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gQXNzaWduIGNhY2hlIHRvIGBfLm1lbW9pemVgLlxubWVtb2l6ZS5DYWNoZSA9IE1hcENhY2hlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbW9pemU7XG4iLCJ2YXIgYmFzZU1lcmdlID0gcmVxdWlyZSgnLi9fYmFzZU1lcmdlJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuL19jcmVhdGVBc3NpZ25lcicpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYXNzaWduYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBtZXJnZXMgb3duIGFuZFxuICogaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdHMgaW50byB0aGVcbiAqIGRlc3RpbmF0aW9uIG9iamVjdC4gU291cmNlIHByb3BlcnRpZXMgdGhhdCByZXNvbHZlIHRvIGB1bmRlZmluZWRgIGFyZVxuICogc2tpcHBlZCBpZiBhIGRlc3RpbmF0aW9uIHZhbHVlIGV4aXN0cy4gQXJyYXkgYW5kIHBsYWluIG9iamVjdCBwcm9wZXJ0aWVzXG4gKiBhcmUgbWVyZ2VkIHJlY3Vyc2l2ZWx5Lk90aGVyIG9iamVjdHMgYW5kIHZhbHVlIHR5cGVzIGFyZSBvdmVycmlkZGVuIGJ5XG4gKiBhc3NpZ25tZW50LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuIFN1YnNlcXVlbnRcbiAqIHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjUuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICd1c2VyJzogJ2ZyZWQnIH1dXG4gKiB9O1xuICpcbiAqIHZhciBhZ2VzID0ge1xuICogICAnZGF0YSc6IFt7ICdhZ2UnOiAzNiB9LCB7ICdhZ2UnOiA0MCB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKHVzZXJzLCBhZ2VzKTtcbiAqIC8vID0+IHsgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH1dIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7XG4iLCJ2YXIgYXBwbHkgPSByZXF1aXJlKCcuL19hcHBseScpLFxuICAgIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyk7XG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMgZnJvbSBgc3RhcnRgIGFuZCBiZXlvbmQgcHJvdmlkZWQgYXNcbiAqIGFuIGFycmF5LlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvbiB0aGVcbiAqIFtyZXN0IHBhcmFtZXRlcl0oaHR0cHM6Ly9tZG4uaW8vcmVzdF9wYXJhbWV0ZXJzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHNheSA9IF8ucmVzdChmdW5jdGlvbih3aGF0LCBuYW1lcykge1xuICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gKiAgICAgKF8uc2l6ZShuYW1lcykgPiAxID8gJywgJiAnIDogJycpICsgXy5sYXN0KG5hbWVzKTtcbiAqIH0pO1xuICpcbiAqIHNheSgnaGVsbG8nLCAnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcycpO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQsIGJhcm5leSwgJiBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiByZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHRvSW50ZWdlcihzdGFydCksIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIHN3aXRjaCAoc3RhcnQpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcnJheSk7XG4gICAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJnc1swXSwgYXJyYXkpO1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFycmF5KTtcbiAgICB9XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgaW5kZXggPSAtMTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSBhcnJheTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXN0O1xuIiwidmFyIHRvTnVtYmVyID0gcmVxdWlyZSgnLi90b051bWJlcicpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgIE1BWF9JTlRFR0VSID0gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDg7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9JbnRlZ2VyYF0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvaW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgaW50ZWdlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0ludGVnZXIoMyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy50b0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiAwXG4gKlxuICogXy50b0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvSW50ZWdlcignMycpO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogMDtcbiAgfVxuICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHZhbHVlID09PSBJTkZJTklUWSB8fCB2YWx1ZSA9PT0gLUlORklOSVRZKSB7XG4gICAgdmFyIHNpZ24gPSAodmFsdWUgPCAwID8gLTEgOiAxKTtcbiAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICB9XG4gIHZhciByZW1haW5kZXIgPSB2YWx1ZSAlIDE7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyAocmVtYWluZGVyID8gdmFsdWUgLSByZW1haW5kZXIgOiB2YWx1ZSkgOiAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvSW50ZWdlcjtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMnKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gaXNGdW5jdGlvbih2YWx1ZS52YWx1ZU9mKSA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9OdW1iZXI7XG4iLCJ2YXIgY29weU9iamVjdCA9IHJlcXVpcmUoJy4vX2NvcHlPYmplY3QnKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuL2tleXNJbicpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9QbGFpbk9iamVjdDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9TdHJpbmc7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvbWVyZ2UnKTtcblxudmFyIF9tZXJnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXJnZSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxudmFyIF9jb3B5UHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2NvcHlQcm9wZXJ0aWVzJyk7XG5cbnZhciBfY29weVByb3BlcnRpZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29weVByb3BlcnRpZXMpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgY29udGV4dFR5cGUgPSB7IF9sb29rQ29uZmlnOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdCB9O1xuLyoqXG4gKiBXcmFwcGVyIHRoYXQgbWFwcyB5b3VyIHN0eWxlcyB0byBhIFJlYWN0IENvbXBvbmVudFxuICogQHBhcmFtIHtPYmplY3R9IEN1c3RvbUNvbXBvbmVudCAtIGEgdmFsaWQgUmVhY3QgQ29tcG9uZW50IHRoYXQgZ2V0cyBzdHlsZXMgYXBwbGllZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIGFkZGl0aW9uYWwgcHJvY2Vzc29ycyB0aGF0IG1vZGlmeSB0aGUgc3R5bGVzXG4gKi9cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKEN1c3RvbUNvbXBvbmVudCkge1xuICB2YXIgY29uZmlnID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgLy8gRW5oYW5jaW5nIHN0YXRlbGVzcyBmdW5jdGlvbmFsIENvbXBvbmVudHNcbiAgLy8gRGVwZW5kaW5nIG9uIGF2YWlsYWJpbGl0eSBvZiBzZXRTdGF0ZVxuICBpZiAoIUN1c3RvbUNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUpIHtcbiAgICB2YXIgTG9va1N0YXRlbGVzcyA9IGZ1bmN0aW9uIExvb2tTdGF0ZWxlc3MocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgIHZhciByZW5kZXJlZEVsZW1lbnQgPSBDdXN0b21Db21wb25lbnQocHJvcHMsIGNvbnRleHQpO1xuICAgICAgdmFyIGNvbnRleHRDb25maWcgPSBjb250ZXh0Ll9sb29rQ29uZmlnIHx8IG51bGw7XG4gICAgICB2YXIgZWxlbWVudENvbmZpZyA9IHJlbmRlcmVkRWxlbWVudC5wcm9wcy5sb29rQ29uZmlnIHx8IG51bGw7XG4gICAgICAvLyBDb21wb3NlIGFsbCBwb3NzaWJsZSB3YXlzIHRvIGNvbmZpZ3VyZSBMb29rXG4gICAgICB2YXIgY29tcG9zZWRDb25maWcgPSAoMCwgX21lcmdlMi5kZWZhdWx0KSh7fSwgY29udGV4dENvbmZpZywgY29uZmlnLCBlbGVtZW50Q29uZmlnKTtcbiAgICAgIC8vIE1vY2tpbmcgdGhlIENvbXBvbmVudCB0byB1c2UgdGhlIHNhbWUgY29uc2lzdGVudCBpbnRlcmZhY2VcbiAgICAgIC8vIGZvciBhbGwgcGx1Z2lucywgbWl4aW5zIGFuZCB0byBpbXByb3ZlIGRldmVsb3BlciBleHBlcmllbmNlXG4gICAgICB2YXIgQ29tcG9uZW50ID0geyBwcm9wczogcHJvcHMsIGNvbnRleHQ6IGNvbnRleHQgfTtcbiAgICAgIC8vIFBhc3NpbmcgdGhlIGRpc3BsYXlOYW1lIHRvIGltcHJvdmUgZGV2ZWxvcGVyIGV4cGVyaWVuY2VcbiAgICAgIENvbXBvbmVudC5jb25zdHJ1Y3RvciA9IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IEN1c3RvbUNvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnXG4gICAgICB9O1xuICAgICAgcmV0dXJuIGNvbnRleHQuX2xvb2tDb25maWcuX3Jlc29sdmVTdHlsZXMoQ29tcG9uZW50LCByZW5kZXJlZEVsZW1lbnQsIGNvbXBvc2VkQ29uZmlnKTtcbiAgICB9O1xuICAgIC8vIFBhc3NpbmcgY29udGV4dFR5cGVzIHRvIGJlIGFibGUgdG8gcmVmZXJlbmNlIGNvbnRleHRcbiAgICBMb29rU3RhdGVsZXNzLmNvbnRleHRUeXBlcyA9ICgwLCBfbWVyZ2UyLmRlZmF1bHQpKHt9LCBDdXN0b21Db21wb25lbnQuY29udGV4dFR5cGVzLCBjb250ZXh0VHlwZSk7XG4gICAgTG9va1N0YXRlbGVzcy5jaGlsZENvbnRleHRUeXBlcyA9ICgwLCBfbWVyZ2UyLmRlZmF1bHQpKHt9LCBDdXN0b21Db21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXMsIGNvbnRleHRUeXBlKTtcblxuICAgIC8vIEZsYWcgYXMgTG9vay1lbmhhbmNlZCBDb21wb25lbnRcbiAgICBMb29rU3RhdGVsZXNzLl9pc0xvb2tFbmhhbmNlZCA9IHRydWU7XG4gICAgcmV0dXJuIExvb2tTdGF0ZWxlc3M7XG4gIH1cblxuICAvLyBFbmhhbmNpbmcgRVMyMDE1IGNsYXNzZXNcbiAgLy8gVGhpcyB3aWxsIGxldCB5b3UgdXNlIHN0YXRlIGFuZCBkbyBzb21lIHJlbmRlciBvcHRpbWl6YXRpb25zXG5cbiAgdmFyIExvb2tDb21wb25lbnQgPSBmdW5jdGlvbiAoX0N1c3RvbUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhMb29rQ29tcG9uZW50LCBfQ3VzdG9tQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIExvb2tDb21wb25lbnQoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTG9va0NvbXBvbmVudCk7XG5cbiAgICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTG9va0NvbXBvbmVudCkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfVxuXG4gICAgLy8gSW5oZXJpdCB0aGUgb3JpZ2luYWwgZGlzcGxheU5hbWUgZm9yIHByb3BlciB1c2UgbGF0ZXIgb25cblxuXG4gICAgX2NyZWF0ZUNsYXNzKExvb2tDb21wb25lbnQsIFt7XG4gICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVkRWxlbWVudCA9IF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKExvb2tDb21wb25lbnQucHJvdG90eXBlKSwgJ3JlbmRlcicsIHRoaXMpLmNhbGwodGhpcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgdmFyIGNvbnRleHRDb25maWcgPSB0aGlzLmNvbnRleHQuX2xvb2tDb25maWcgfHwgbnVsbDtcbiAgICAgICAgdmFyIGVsZW1lbnRDb25maWcgPSByZW5kZXJlZEVsZW1lbnQucHJvcHMubG9va0NvbmZpZyB8fCBudWxsO1xuICAgICAgICAvLyBDb21wb3NlIGFsbCBwb3NzaWJsZSB3YXlzIHRvIGNvbmZpZ3VyZSBMb29rXG4gICAgICAgIHZhciBjb21wb3NlZENvbmZpZyA9ICgwLCBfbWVyZ2UyLmRlZmF1bHQpKHt9LCBjb250ZXh0Q29uZmlnLCBjb25maWcsIGVsZW1lbnRDb25maWcpO1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0Ll9sb29rQ29uZmlnLl9yZXNvbHZlU3R5bGVzKHRoaXMsIHJlbmRlcmVkRWxlbWVudCwgY29tcG9zZWRDb25maWcpO1xuICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBMb29rQ29tcG9uZW50O1xuICB9KEN1c3RvbUNvbXBvbmVudCk7XG5cbiAgLy8gY29weSBwcm9wcyBpbiBvcmRlciB0byBnZXQgaG1yIHdvcmtpbmcgY29ycmVjdGx5XG5cblxuICBMb29rQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gQ3VzdG9tQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IEN1c3RvbUNvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnO1xuICBMb29rQ29tcG9uZW50LmNoaWxkQ29udGV4dFR5cGVzID0gX2V4dGVuZHMoe30sIEN1c3RvbUNvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcywgY29udGV4dFR5cGUpO1xuICBMb29rQ29tcG9uZW50LmNvbnRleHRUeXBlcyA9IF9leHRlbmRzKHt9LCBDdXN0b21Db21wb25lbnQuY29udGV4dFR5cGVzLCBjb250ZXh0VHlwZSk7XG4gIExvb2tDb21wb25lbnQuX2lzTG9va0VuaGFuY2VkID0gdHJ1ZTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAoMCwgX2NvcHlQcm9wZXJ0aWVzMi5kZWZhdWx0KShDdXN0b21Db21wb25lbnQucHJvdG90eXBlLCBMb29rQ29tcG9uZW50LnByb3RvdHlwZSk7XG4gIH1cblxuICByZXR1cm4gTG9va0NvbXBvbmVudDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9mbGF0dGVuRGVlcCA9IHJlcXVpcmUoJ2xvZGFzaC9mbGF0dGVuRGVlcCcpO1xuXG52YXIgX2ZsYXR0ZW5EZWVwMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsYXR0ZW5EZWVwKTtcblxudmFyIF9pc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoL2lzQXJyYXknKTtcblxudmFyIF9pc0FycmF5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQXJyYXkpO1xuXG52YXIgX2lzTnVtYmVyID0gcmVxdWlyZSgnbG9kYXNoL2lzTnVtYmVyJyk7XG5cbnZhciBfaXNOdW1iZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNOdW1iZXIpO1xuXG52YXIgX2lzU3RyaW5nID0gcmVxdWlyZSgnbG9kYXNoL2lzU3RyaW5nJyk7XG5cbnZhciBfaXNTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNTdHJpbmcpO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzLnJlc29sdmVQbHVnaW5zID0gcmVzb2x2ZVBsdWdpbnM7XG5leHBvcnRzLmlzTG9va0VuaGFuY2VkID0gaXNMb29rRW5oYW5jZWQ7XG5leHBvcnRzLnJlc29sdmVDaGlsZHJlbiA9IHJlc29sdmVDaGlsZHJlbjtcbmV4cG9ydHMucmVzb2x2ZVByb3BzID0gcmVzb2x2ZVByb3BzO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBSZXNvbHZlcyBhbGwgcGx1Z2lucyBwcm92aWRlZCBieSB0aGUgY29uZmlndXJhdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbkludGVyZmFjZSAtIGludGVyZmFjZSBjb250YWluaW5nIGFsbCBjb25maWd1cmF0aW9ucyB0byByZXNvbHZlXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVQbHVnaW5zKHBsdWdpbkludGVyZmFjZSkge1xuICB2YXIgZm9yY2VNb2RlUG9zc2libGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IGFyZ3VtZW50c1sxXTtcbiAgdmFyIHN0eWxlcyA9IHBsdWdpbkludGVyZmFjZS5zdHlsZXM7XG4gIHZhciBjb25maWcgPSBwbHVnaW5JbnRlcmZhY2UuY29uZmlnO1xuXG4gIC8vIFRyaWdnZXJzIHBsdWdpbiByZXNvbHZpbmdcbiAgLy8gVXNlcyB0aGUgZXhhY3QgcGx1Z2luIGxpbmV1cCBkZWZpbmVkIHdpdGhpbiBDb25maWdcblxuICBjb25maWcucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAvLyBJZiB0aGUgcGx1Z2luIGlzIGEgZnVuY3Rpb24gaXQgZ2V0cyBjYWxsZWQgd2hlbiB0aGVyZSBhcmUgZHluYW1pYyBzdHlsZXMgdG8gcmVzb2x2ZVxuICAgIGlmIChmb3JjZU1vZGVQb3NzaWJsZSAhPT0gdHJ1ZSB8fCBwbHVnaW4gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgaWYgKHBsdWdpbkludGVyZmFjZS5keW5hbWljU3R5bGVzTm90TnVsbCA9PT0gdHJ1ZSB8fCBmb3JjZU1vZGVQb3NzaWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBzdHlsZXMgPSBwbHVnaW4oX2V4dGVuZHMoe30sIHBsdWdpbkludGVyZmFjZSwge1xuICAgICAgICAgIHN0eWxlczogc3R5bGVzXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlIHBsdWdpbiBjb3VsZCBhbHNvIGJlIGFuIG9iamVjdCBjb250YWluaW5nIGBtb2RlYCBhbmQgYHBsdWdpbmBcbiAgICAgIC8vIEZvcmNlIG1vZGUgY2FsbHMgdGhlIHBsdWdpbiBldmVyeSB0aW1lIHdoZW4gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWRcbiAgICAgIGlmIChwbHVnaW4ubW9kZSA9PT0gJ2ZvcmNlJykge1xuICAgICAgICBzdHlsZXMgPSBwbHVnaW4ucGx1Z2luKF9leHRlbmRzKHt9LCBwbHVnaW5JbnRlcmZhY2UsIHtcbiAgICAgICAgICBzdHlsZXM6IHN0eWxlc1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIERlZmF1bHQvZmFsbGJhY2sgbW9kZTogU2FtZSBhcyBpZiB0aGUgcGx1Z2luIHdvdWxkIGJlIGEgZnVuY3Rpb25cbiAgICAgIGlmIChwbHVnaW5JbnRlcmZhY2UuZHluYW1pY1N0eWxlc05vdE51bGwpIHtcbiAgICAgICAgc3R5bGVzID0gcGx1Z2luLnBsdWdpbihfZXh0ZW5kcyh7fSwgcGx1Z2luSW50ZXJmYWNlLCB7XG4gICAgICAgICAgc3R5bGVzOiBzdHlsZXNcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN0eWxlcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBnaXZlbiBlbGVtZW50IGlzIGEgbG9vay1lbmhhbmNlZCBDb21wb25lbnQgaXRzZWxmXG4gKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIFJlYWN0IGVsZW1lbnQgdG8gYmUgdmFsaWRhdGVkXG4gKi9cbmZ1bmN0aW9uIGlzTG9va0VuaGFuY2VkKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQuX2lzTG9va0VuaGFuY2VkIHx8IGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuX2lzTG9va0VuaGFuY2VkID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIFJlc29sdmVzIHByb3ZpZGVkIHN0eWxlcyBmb3IgYW4gZWxlbWVudHMgY2hpbGRyZW5cbiAqIEBwYXJhbSB7T2JqZWN0fSBDb21wb25lbnQgLSB3cmFwcGluZyBSZWFjdCBDb21wb25lbnQgcHJvdmlkaW5nIGxvb2tzIGFuZCBlbGVtZW50c1xuICogQHBhcmFtIHtBcnJheXxzdHJpbmd8bnVtYmVyfSBjaGlsZHJlbiAtIGNoaWxkcmVuIHRoYXQgZ2V0IHJlc29sdmVkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gY29uZmlndXJhdGlvbiBjb250YWluaW5nIHBsdWdpbnMgYW5kIHBsdWdpbi1zcGVjaWZpYyBjb25maWdzXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVDaGlsZHJlbihDb21wb25lbnQsIG5ld1Byb3BzLCBjb25maWcpIHtcbiAgaWYgKG5ld1Byb3BzLmNoaWxkcmVuKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gbmV3UHJvcHMuY2hpbGRyZW47XG4gICAgLy8gZGlyZWN0bHkgcmV0dXJuIHByaW1pdGl2ZSBjaGlsZHJlblxuXG4gICAgaWYgKCgwLCBfaXNTdHJpbmcyLmRlZmF1bHQpKGNoaWxkcmVuKSB8fCAoMCwgX2lzTnVtYmVyMi5kZWZhdWx0KShjaGlsZHJlbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGRyZW4udHlwZSkge1xuICAgICAgbmV3UHJvcHMuY2hpbGRyZW4gPSBjb25maWcuX3Jlc29sdmVTdHlsZXMoQ29tcG9uZW50LCBjaGlsZHJlbiwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGVyZSBhcmUgbW9yZSB0aGFuIG9uZSBjaGlsZCwgaXRlcmF0ZSBvdmVyIHRoZW1cbiAgICBpZiAoKDAsIF9pc0FycmF5Mi5kZWZhdWx0KShjaGlsZHJlbikpIHtcbiAgICAgIC8vIGZsYXR0ZW5pbmcgY2hpbGRyZW4gcHJldmVudHMgZGVlcGVyIG5lc3RlZCBjaGlsZHJlblxuICAgICAgdmFyIGZsYXRDaGlsZHJlbiA9ICgwLCBfZmxhdHRlbkRlZXAyLmRlZmF1bHQpKGNoaWxkcmVuKTtcblxuICAgICAgLy8gcmVjdXJzaXZlbHkgcmVzb2x2ZSBzdHlsZXMgZm9yIGNoaWxkIGVsZW1lbnRzIGlmIGl0IGlzIGEgdmFsaWQgUmVhY3QgQ29tcG9uZW50XG4gICAgICBuZXdQcm9wcy5jaGlsZHJlbiA9IF9yZWFjdC5DaGlsZHJlbi5tYXAoZmxhdENoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgaWYgKCgwLCBfcmVhY3QuaXNWYWxpZEVsZW1lbnQpKGNoaWxkKSkge1xuICAgICAgICAgIHJldHVybiBjb25maWcuX3Jlc29sdmVTdHlsZXMoQ29tcG9uZW50LCBjaGlsZCwgY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiogUmVzb2x2ZXMgQ29tcG9uZW50cyBwYXNzZWQgYXMgYSBwcm9wZXJ0eVxuKiBAcGFyYW0ge09iamVjdH0gQ29tcG9uZW50IC0gd3JhcHBpbmcgUmVhY3QgQ29tcG9uZW50IHByb3ZpZGluZyBsb29rcyBhbmQgZWxlbWVudHNcbiogQHBhcmFtIHtPYmplY3R9IG5ld1Byb3BzIC0gZWxlbWVudCdzIHByb3BlcnRpZXMgdG8gaXRlcmF0ZVxuKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gY29uZmlndXJhdGlvbiBjb250YWluaW5nIHBsdWdpbnMgYW5kIHBsdWdpbi1zcGVjaWZpYyBjb25maWdzXG4qL1xuZnVuY3Rpb24gcmVzb2x2ZVByb3BzKENvbXBvbmVudCwgbmV3UHJvcHMsIGNvbmZpZykge1xuICBPYmplY3Qua2V5cyhuZXdQcm9wcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICBpZiAocHJvcGVydHkgPT09ICdjaGlsZHJlbicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBSZXNvbHZpbmcgc3R5bGVzIGZvciBlbGVtZW50cyBwYXNzZWQgYnkgcHJvcHNcbiAgICAvLyBTa2lwIGNoaWxkcmVuIGFzIHRoZXkndmUgYmVlbiByZXNvbHZlZCBhbHJlYWR5XG4gICAgdmFyIHByb3BFbGVtZW50ID0gbmV3UHJvcHNbcHJvcGVydHldO1xuICAgIGlmICgoMCwgX3JlYWN0LmlzVmFsaWRFbGVtZW50KShwcm9wRWxlbWVudCkpIHtcbiAgICAgIG5ld1Byb3BzW3Byb3BlcnR5XSA9IGNvbmZpZy5fcmVzb2x2ZVN0eWxlcyhDb21wb25lbnQsIHByb3BFbGVtZW50LCBjb25maWcpO1xuICAgICAgbmV3UHJvcHMuX2xvb2tTaG91bGRVcGRhdGUgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2VuaGFuY2VyID0gcmVxdWlyZSgnLi9jb3JlL2VuaGFuY2VyJyk7XG5cbnZhciBfZW5oYW5jZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW5oYW5jZXIpO1xuXG52YXIgX3Jlc29sdmVyID0gcmVxdWlyZSgnLi9jb3JlL3Jlc29sdmVyJyk7XG5cbnZhciByZXNvbHZlciA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9yZXNvbHZlcik7XG5cbnZhciBfY29uZGl0aW9uID0gcmVxdWlyZSgnLi9taXhpbnMvY29uZGl0aW9uJyk7XG5cbnZhciBfY29uZGl0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmRpdGlvbik7XG5cbnZhciBfY29udGFpbnMgPSByZXF1aXJlKCcuL21peGlucy9jb250YWlucycpO1xuXG52YXIgX2NvbnRhaW5zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnRhaW5zKTtcblxudmFyIF9leHRlbmQgPSByZXF1aXJlKCcuL21peGlucy9leHRlbmQnKTtcblxudmFyIF9leHRlbmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0ZW5kKTtcblxudmFyIF9taXhpbiA9IHJlcXVpcmUoJy4vcGx1Z2lucy9taXhpbicpO1xuXG52YXIgX21peGluMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKTtcblxudmFyIF9zdGF0ZWZ1bFZhbHVlID0gcmVxdWlyZSgnLi9wbHVnaW5zL3N0YXRlZnVsVmFsdWUnKTtcblxudmFyIF9zdGF0ZWZ1bFZhbHVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0YXRlZnVsVmFsdWUpO1xuXG52YXIgX3N0YXRlZnVsU2VsZWN0b3IgPSByZXF1aXJlKCcuL3BsdWdpbnMvc3RhdGVmdWxTZWxlY3RvcicpO1xuXG52YXIgX3N0YXRlZnVsU2VsZWN0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RhdGVmdWxTZWxlY3Rvcik7XG5cbnZhciBfc3R5bGVMb2dnZXIgPSByZXF1aXJlKCcuL3BsdWdpbnMvc3R5bGVMb2dnZXInKTtcblxudmFyIF9zdHlsZUxvZ2dlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZUxvZ2dlcik7XG5cbnZhciBfY29weVByb3BlcnRpZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NvcHlQcm9wZXJ0aWVzJyk7XG5cbnZhciBfY29weVByb3BlcnRpZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29weVByb3BlcnRpZXMpO1xuXG52YXIgX2dldENoaWxkVHlwZSA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0Q2hpbGRUeXBlJyk7XG5cbnZhciBfZ2V0Q2hpbGRUeXBlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldENoaWxkVHlwZSk7XG5cbnZhciBfZ2V0UHNldWRvRXhwcmVzc2lvbiA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0UHNldWRvRXhwcmVzc2lvbicpO1xuXG52YXIgX2dldFBzZXVkb0V4cHJlc3Npb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0UHNldWRvRXhwcmVzc2lvbik7XG5cbnZhciBfc29ydE9iamVjdCA9IHJlcXVpcmUoJy4vdXRpbHMvc29ydE9iamVjdCcpO1xuXG52YXIgX3NvcnRPYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc29ydE9iamVjdCk7XG5cbnZhciBfc3BsaXRDb25kaXRpb24gPSByZXF1aXJlKCcuL3V0aWxzL3NwbGl0Q29uZGl0aW9uJyk7XG5cbnZhciBfc3BsaXRDb25kaXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3BsaXRDb25kaXRpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgTWl4aW5zID0ge1xuICBjb25kaXRpb246IF9jb25kaXRpb24yLmRlZmF1bHQsXG4gIGNvbnRhaW5zOiBfY29udGFpbnMyLmRlZmF1bHQsXG4gIGV4dGVuZDogX2V4dGVuZDIuZGVmYXVsdFxufTtcblxudmFyIFBsdWdpbnMgPSB7XG4gIG1peGluOiBfbWl4aW4yLmRlZmF1bHQsXG4gIHN0YXRlZnVsVmFsdWU6IF9zdGF0ZWZ1bFZhbHVlMi5kZWZhdWx0LFxuICBzdGF0ZWZ1bFNlbGVjdG9yOiBfc3RhdGVmdWxTZWxlY3RvcjIuZGVmYXVsdCxcbiAgc3R5bGVMb2dnZXI6IF9zdHlsZUxvZ2dlcjIuZGVmYXVsdFxufTtcblxudmFyIFV0aWxzID0ge1xuICBjb3B5UHJvcGVydGllczogX2NvcHlQcm9wZXJ0aWVzMi5kZWZhdWx0LFxuICBnZXRDaGlsZFR5cGU6IF9nZXRDaGlsZFR5cGUyLmRlZmF1bHQsXG4gIHNvcnRPYmplY3Q6IF9zb3J0T2JqZWN0Mi5kZWZhdWx0LFxuICBzcGxpdENvbmRpdGlvbjogX3NwbGl0Q29uZGl0aW9uMi5kZWZhdWx0LFxuICBnZXRQc2V1ZG9FeHByZXNzaW9uOiBfZ2V0UHNldWRvRXhwcmVzc2lvbjIuZGVmYXVsdFxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBlbmhhbmNlcjogX2VuaGFuY2VyMi5kZWZhdWx0LFxuICByZXNvbHZlcjogcmVzb2x2ZXIsXG5cbiAgTWl4aW5zOiBNaXhpbnMsXG4gIFBsdWdpbnM6IFBsdWdpbnMsXG4gIFV0aWxzOiBVdGlsc1xufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zcGxpdENvbmRpdGlvbiA9IHJlcXVpcmUoJy4uL3V0aWxzL3NwbGl0Q29uZGl0aW9uJyk7XG5cbnZhciBfc3BsaXRDb25kaXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3BsaXRDb25kaXRpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcclxuICogQ29uZGl0aW9uIG1peGlucyBhcmUgc2hvcnRjdXRzIHRvIGNoZWNrIGlmIGEgcHJvcC9zdGF0ZSBmdWxmaWxscyBhIGdpdmVuIGV4cHJlc3Npb25cclxuICogVGhlcmVmb3JlIGl0IHVzZXMgQ29tcG9uZW50IHdoaWNoIGdldHMgcHJvdmlkZWQgYXMgcGFydCBvZiBhcmd1bWVudHMgdG8gdmFsaWRhdGUgcHJvcHMvc3RhdGVcclxuICovXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGdyZWF0ZXJUaGFuOiBmdW5jdGlvbiBncmVhdGVyVGhhbihfcmVmKSB7XG4gICAgdmFyIHByb3BlcnR5ID0gX3JlZi5wcm9wZXJ0eTtcbiAgICB2YXIgdmFsdWUgPSBfcmVmLnZhbHVlO1xuICAgIHZhciBtaXhpbktleSA9IF9yZWYubWl4aW5LZXk7XG4gICAgdmFyIENvbXBvbmVudCA9IF9yZWYuQ29tcG9uZW50O1xuXG4gICAgdmFyIGNvbmRpdGlvbiA9ICgwLCBfc3BsaXRDb25kaXRpb24yLmRlZmF1bHQpKHByb3BlcnR5LCBtaXhpbktleSwgQ29tcG9uZW50KTtcbiAgICByZXR1cm4gY29uZGl0aW9uICYmIGNvbmRpdGlvbi5sZWZ0ID49IGNvbmRpdGlvbi5yaWdodCA/IHZhbHVlIDogZmFsc2U7XG4gIH0sXG4gIGxlc3NUaGFuOiBmdW5jdGlvbiBsZXNzVGhhbihfcmVmMikge1xuICAgIHZhciBwcm9wZXJ0eSA9IF9yZWYyLnByb3BlcnR5O1xuICAgIHZhciB2YWx1ZSA9IF9yZWYyLnZhbHVlO1xuICAgIHZhciBtaXhpbktleSA9IF9yZWYyLm1peGluS2V5O1xuICAgIHZhciBDb21wb25lbnQgPSBfcmVmMi5Db21wb25lbnQ7XG5cbiAgICB2YXIgY29uZGl0aW9uID0gKDAsIF9zcGxpdENvbmRpdGlvbjIuZGVmYXVsdCkocHJvcGVydHksIG1peGluS2V5LCBDb21wb25lbnQpO1xuICAgIHJldHVybiBjb25kaXRpb24gJiYgY29uZGl0aW9uLmxlZnQgPD0gY29uZGl0aW9uLnJpZ2h0ID8gdmFsdWUgOiBmYWxzZTtcbiAgfSxcbiAgdW5FcXVhbDogZnVuY3Rpb24gdW5FcXVhbChfcmVmMykge1xuICAgIHZhciBwcm9wZXJ0eSA9IF9yZWYzLnByb3BlcnR5O1xuICAgIHZhciB2YWx1ZSA9IF9yZWYzLnZhbHVlO1xuICAgIHZhciBtaXhpbktleSA9IF9yZWYzLm1peGluS2V5O1xuICAgIHZhciBDb21wb25lbnQgPSBfcmVmMy5Db21wb25lbnQ7XG5cbiAgICB2YXIgY29uZGl0aW9uID0gKDAsIF9zcGxpdENvbmRpdGlvbjIuZGVmYXVsdCkocHJvcGVydHksIG1peGluS2V5LCBDb21wb25lbnQpO1xuICAgIHJldHVybiBjb25kaXRpb24gJiYgY29uZGl0aW9uLmxlZnQgIT0gY29uZGl0aW9uLnJpZ2h0ID8gdmFsdWUgOiBmYWxzZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgfSxcbiAgZ3JlYXRlcjogZnVuY3Rpb24gZ3JlYXRlcihfcmVmNCkge1xuICAgIHZhciBwcm9wZXJ0eSA9IF9yZWY0LnByb3BlcnR5O1xuICAgIHZhciB2YWx1ZSA9IF9yZWY0LnZhbHVlO1xuICAgIHZhciBtaXhpbktleSA9IF9yZWY0Lm1peGluS2V5O1xuICAgIHZhciBDb21wb25lbnQgPSBfcmVmNC5Db21wb25lbnQ7XG5cbiAgICB2YXIgY29uZGl0aW9uID0gKDAsIF9zcGxpdENvbmRpdGlvbjIuZGVmYXVsdCkocHJvcGVydHksIG1peGluS2V5LCBDb21wb25lbnQpO1xuICAgIHJldHVybiBjb25kaXRpb24gJiYgY29uZGl0aW9uLmxlZnQgPiBjb25kaXRpb24ucmlnaHQgPyB2YWx1ZSA6IGZhbHNlO1xuICB9LFxuICBsZXNzOiBmdW5jdGlvbiBsZXNzKF9yZWY1KSB7XG4gICAgdmFyIHByb3BlcnR5ID0gX3JlZjUucHJvcGVydHk7XG4gICAgdmFyIHZhbHVlID0gX3JlZjUudmFsdWU7XG4gICAgdmFyIG1peGluS2V5ID0gX3JlZjUubWl4aW5LZXk7XG4gICAgdmFyIENvbXBvbmVudCA9IF9yZWY1LkNvbXBvbmVudDtcblxuICAgIHZhciBjb25kaXRpb24gPSAoMCwgX3NwbGl0Q29uZGl0aW9uMi5kZWZhdWx0KShwcm9wZXJ0eSwgbWl4aW5LZXksIENvbXBvbmVudCk7XG4gICAgcmV0dXJuIGNvbmRpdGlvbiAmJiBjb25kaXRpb24ubGVmdCA8IGNvbmRpdGlvbi5yaWdodCA/IHZhbHVlIDogZmFsc2U7XG4gIH0sXG4gIGVxdWFsOiBmdW5jdGlvbiBlcXVhbChfcmVmNikge1xuICAgIHZhciBwcm9wZXJ0eSA9IF9yZWY2LnByb3BlcnR5O1xuICAgIHZhciB2YWx1ZSA9IF9yZWY2LnZhbHVlO1xuICAgIHZhciBtaXhpbktleSA9IF9yZWY2Lm1peGluS2V5O1xuICAgIHZhciBDb21wb25lbnQgPSBfcmVmNi5Db21wb25lbnQ7XG5cbiAgICB2YXIgY29uZGl0aW9uID0gKDAsIF9zcGxpdENvbmRpdGlvbjIuZGVmYXVsdCkocHJvcGVydHksIG1peGluS2V5LCBDb21wb25lbnQpO1xuICAgIHJldHVybiBjb25kaXRpb24gJiYgY29uZGl0aW9uLmxlZnQgPT0gY29uZGl0aW9uLnJpZ2h0ID8gdmFsdWUgOiBmYWxzZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1N0cmluZyA9IHJlcXVpcmUoJ2xvZGFzaC9pc1N0cmluZycpO1xuXG52YXIgX2lzU3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzU3RyaW5nKTtcblxudmFyIF9nZXRQc2V1ZG9FeHByZXNzaW9uID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2V0UHNldWRvRXhwcmVzc2lvbicpO1xuXG52YXIgX2dldFBzZXVkb0V4cHJlc3Npb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0UHNldWRvRXhwcmVzc2lvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIEV2YWx1YXRlcyBpZiBhIGVsZW1lbnQgY29udGFpbnMgYSBnaXZlbiBzdHJpbmdcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIHByb3BlcnR5ID0gX3JlZi5wcm9wZXJ0eTtcbiAgdmFyIHZhbHVlID0gX3JlZi52YWx1ZTtcbiAgdmFyIGNoaWxkcmVuID0gX3JlZi5uZXdQcm9wcy5jaGlsZHJlbjtcblxuICB2YXIgZXhwcmVzc2lvbiA9ICgwLCBfZ2V0UHNldWRvRXhwcmVzc2lvbjIuZGVmYXVsdCkocHJvcGVydHkpO1xuXG4gIGlmICgoMCwgX2lzU3RyaW5nMi5kZWZhdWx0KShjaGlsZHJlbikgJiYgY2hpbGRyZW4uaW5kZXhPZihleHByZXNzaW9uKSA+IC0xKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9hc3NpZ25TdHlsZXMgPSByZXF1aXJlKCdhc3NpZ24tc3R5bGVzJyk7XG5cbnZhciBfYXNzaWduU3R5bGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnblN0eWxlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4vKipcclxuICogTWVyZ2UgbXVsdGlwbGUgc3R5bGUgb2JqZWN0cyBieSBtZXJnaW5nIHRob3NlXHJcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBzdHlsZXMgLSBBIHNldCBvZiBzdHlsZSBvYmplY3RzIG9yIGEgc2luZ2xlIHN0eWxlIG9iamVjdFxyXG4gKi9cbnZhciBtZXJnZVN0eWxlcyA9IGZ1bmN0aW9uIG1lcmdlU3R5bGVzKHN0eWxlcykge1xuICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG4gICAgcmV0dXJuIF9hc3NpZ25TdHlsZXMyLmRlZmF1bHQuYXBwbHkodW5kZWZpbmVkLCBbe31dLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoc3R5bGVzKSkpO1xuICB9XG4gIHJldHVybiAoMCwgX2Fzc2lnblN0eWxlczIuZGVmYXVsdCkoe30sIHN0eWxlcyk7XG59O1xuXG4vKipcclxuICogRXh0ZW5kcyBhIGdpdmVuIHN0eWxlIG9iamVjdFxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG1peGluIG9wdGlvbnMvaW5wdXRcclxuICogb3B0aW9ucyBjYW4gYmUgZWl0aGVyIGEgc3R5bGUgb2JqZWN0IG9yIGluY2x1ZGUgYSBjb25kaXRpb24gYXMgd2VsbCBhcyBzdHlsZXNcclxuICovXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBvcHRpb25zID0gX3JlZi52YWx1ZTtcblxuICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnY29uZGl0aW9uJykpIHtcbiAgICBpZiAob3B0aW9ucy5jb25kaXRpb24gJiYgb3B0aW9ucy5zdHlsZXMpIHtcbiAgICAgIHJldHVybiBtZXJnZVN0eWxlcyhvcHRpb25zLnN0eWxlcyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBtZXJnZVN0eWxlcyhvcHRpb25zLnN0eWxlcyA/IG9wdGlvbnMuc3R5bGVzIDogb3B0aW9ucyk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc0VtcHR5ID0gcmVxdWlyZSgnbG9kYXNoL2lzRW1wdHknKTtcblxudmFyIF9pc0VtcHR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzRW1wdHkpO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBtaXhpbjtcblxudmFyIF9hc3NpZ25TdHlsZXMgPSByZXF1aXJlKCdhc3NpZ24tc3R5bGVzJyk7XG5cbnZhciBfYXNzaWduU3R5bGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnblN0eWxlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuLypcclxuICogUmVzb2x2ZXMgbWl4aW5zXHJcbiAqL1xuZnVuY3Rpb24gbWl4aW4oX3JlZikge1xuICB2YXIgc3R5bGVzID0gX3JlZi5zdHlsZXM7XG4gIHZhciByZXNvbHZlID0gX3JlZi5yZXNvbHZlO1xuICB2YXIgY29uZmlnID0gX3JlZi5jb25maWc7XG5cbiAgdmFyIHBsdWdpbkludGVyZmFjZSA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ3N0eWxlcycsICdyZXNvbHZlJywgJ2NvbmZpZyddKTtcblxuICB2YXIgbWl4aW5zID0gY29uZmlnLm1peGlucztcblxuICAvLyBpZiBubyBjdXN0b20ga2V5cyBhcmUgc3BlY2lmaWVkIGF0IGFsbFxuICBpZiAoKDAsIF9pc0VtcHR5Mi5kZWZhdWx0KShtaXhpbnMpKSB7XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxuXG4gIHZhciBuZXdTdHlsZXMgPSAoMCwgX2Fzc2lnblN0eWxlczIuZGVmYXVsdCkoe30sIHN0eWxlcyk7XG5cbiAgT2JqZWN0LmtleXMobmV3U3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IG5ld1N0eWxlc1twcm9wZXJ0eV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIHZhciBuZXdWYWx1ZSA9IHZvaWQgMDtcblxuICAgIC8vIHRlc3RpbmcgZXZlcnkgbWl4aW4gb24gdGhlIGN1cnJlbnQgcHJvcGVydHlcbiAgICBPYmplY3Qua2V5cyhtaXhpbnMpLmZvckVhY2goZnVuY3Rpb24gKG1peGluS2V5KSB7XG4gICAgICBpZiAocHJvcGVydHkuaW5kZXhPZihtaXhpbktleSkgPiAtMSkge1xuICAgICAgICB2YXIgbWl4aW5JbnRlcmZhY2UgPSBfZXh0ZW5kcyh7fSwgcGx1Z2luSW50ZXJmYWNlLCB7XG4gICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICBtaXhpbktleTogbWl4aW5LZXksXG4gICAgICAgICAgY29uZmlnOiBjb25maWdcbiAgICAgICAgfSk7XG4gICAgICAgIG5ld1ZhbHVlID0gbWl4aW5zW21peGluS2V5XShtaXhpbkludGVyZmFjZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBvbmx5IGFzc2lnbiBpZiB0aGVyZSBhcmUgbmV3IHN0eWxlc1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgbmV3U3R5bGVzID0gKDAsIF9hc3NpZ25TdHlsZXMyLmRlZmF1bHQpKG5ld1N0eWxlcywgcmVzb2x2ZShfZXh0ZW5kcyh7fSwgcGx1Z2luSW50ZXJmYWNlLCB7XG4gICAgICAgICAgc3R5bGVzOiBuZXdWYWx1ZSxcbiAgICAgICAgICByZXNvbHZlOiByZXNvbHZlLFxuICAgICAgICAgIGNvbmZpZzogY29uZmlnXG4gICAgICAgIH0pKSk7XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSBuZXdTdHlsZXNbcHJvcGVydHldO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG5ld1N0eWxlcztcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoL2lzUGxhaW5PYmplY3QnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUGxhaW5PYmplY3QpO1xuXG52YXIgX2lzRnVuY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2gvaXNGdW5jdGlvbicpO1xuXG52YXIgX2lzRnVuY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNGdW5jdGlvbik7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHN0YXRlZnVsU2VsZWN0b3I7XG5cbnZhciBfYXNzaWduU3R5bGVzID0gcmVxdWlyZSgnYXNzaWduLXN0eWxlcycpO1xuXG52YXIgX2Fzc2lnblN0eWxlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ25TdHlsZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbi8qKlxuICogUmVzb2x2ZXMgc2VsZWN0b3JzIHRoYXQgYXJlIGZ1bmN0aW9uc1xuICogQ2FsbGluZyB0aGVtIHdpdGggcHJvcHMsIHN0YXRlLCBjb250ZXh0IGFzIHBhcmFtZXRlclxuICovXG5mdW5jdGlvbiBzdGF0ZWZ1bFNlbGVjdG9yKF9yZWYpIHtcbiAgdmFyIHN0eWxlcyA9IF9yZWYuc3R5bGVzO1xuICB2YXIgQ29tcG9uZW50ID0gX3JlZi5Db21wb25lbnQ7XG4gIHZhciByZXNvbHZlID0gX3JlZi5yZXNvbHZlO1xuXG4gIHZhciBwbHVnaW5JbnRlcmZhY2UgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydzdHlsZXMnLCAnQ29tcG9uZW50JywgJ3Jlc29sdmUnXSk7XG5cbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgaWYgKHByb3BlcnR5ID09PSAnX3N0YXRlZnVsU2VsZWN0b3InKSB7XG4gICAgICAvLyBpZiBzdGF0ZWZ1bCB2YWx1ZSBhbHJlYWR5IHJlc29sdmVkIGp1c3QgdXNlIHRoYXRcbiAgICAgIHZhciBuZXdTdHlsZXMgPSAoMCwgX2lzRnVuY3Rpb24yLmRlZmF1bHQpKHZhbHVlKSA/IHZhbHVlKENvbXBvbmVudC5wcm9wcywgQ29tcG9uZW50LnN0YXRlLCBDb21wb25lbnQuY29udGV4dCkgOiB2YWx1ZTtcbiAgICAgIHN0eWxlcyA9IHJlc29sdmUoX2V4dGVuZHMoe30sIHBsdWdpbkludGVyZmFjZSwge1xuICAgICAgICBzdHlsZXM6IG5ld1N0eWxlcyxcbiAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IHJlc29sdmVcbiAgICAgIH0pKTtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNQbGFpbk9iamVjdDIuZGVmYXVsdCkodmFsdWUpKSB7XG4gICAgICBzdHlsZXNbcHJvcGVydHldID0gcmVzb2x2ZShfZXh0ZW5kcyh7fSwgcGx1Z2luSW50ZXJmYWNlLCB7XG4gICAgICAgIHN0eWxlczogKDAsIF9hc3NpZ25TdHlsZXMyLmRlZmF1bHQpKHt9LCB2YWx1ZSksXG4gICAgICAgIENvbXBvbmVudDogQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiByZXNvbHZlXG4gICAgICB9KSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc3R5bGVzO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzUGxhaW5PYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvaXNQbGFpbk9iamVjdCcpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cbnZhciBfaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC9pc0Z1bmN0aW9uJyk7XG5cbnZhciBfaXNGdW5jdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0Z1bmN0aW9uKTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gc3RhdGVmdWxWYWx1ZTtcblxudmFyIF9hc3NpZ25TdHlsZXMgPSByZXF1aXJlKCdhc3NpZ24tc3R5bGVzJyk7XG5cbnZhciBfYXNzaWduU3R5bGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnblN0eWxlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuLyoqXHJcbiAqIFJlc29sdmVzIHZhbHVlcyB0aGF0IGFyZSBmdW5jdGlvbnNcclxuICogQ2FsbGluZyB0aGVtIHdpdGggcHJvcHMsIHN0YXRlLCBjb250ZXh0IGFzIHBhcmFtZXRlclxyXG4gKi9cbmZ1bmN0aW9uIHN0YXRlZnVsVmFsdWUoX3JlZikge1xuICB2YXIgc3R5bGVzID0gX3JlZi5zdHlsZXM7XG4gIHZhciBDb21wb25lbnQgPSBfcmVmLkNvbXBvbmVudDtcbiAgdmFyIHJlc29sdmUgPSBfcmVmLnJlc29sdmU7XG5cbiAgdmFyIHBsdWdpbkludGVyZmFjZSA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ3N0eWxlcycsICdDb21wb25lbnQnLCAncmVzb2x2ZSddKTtcblxuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTtcbiAgICBpZiAoKDAsIF9pc0Z1bmN0aW9uMi5kZWZhdWx0KSh2YWx1ZSkpIHtcbiAgICAgIHN0eWxlc1twcm9wZXJ0eV0gPSB2YWx1ZShDb21wb25lbnQucHJvcHMsIENvbXBvbmVudC5zdGF0ZSwgQ29tcG9uZW50LmNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc1BsYWluT2JqZWN0Mi5kZWZhdWx0KSh2YWx1ZSkpIHtcbiAgICAgIHN0eWxlc1twcm9wZXJ0eV0gPSByZXNvbHZlKF9leHRlbmRzKHt9LCBwbHVnaW5JbnRlcmZhY2UsIHtcbiAgICAgICAgc3R5bGVzOiAoMCwgX2Fzc2lnblN0eWxlczIuZGVmYXVsdCkoe30sIHZhbHVlKSxcbiAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IHJlc29sdmVcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzdHlsZXM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNFbXB0eSA9IHJlcXVpcmUoJ2xvZGFzaC9pc0VtcHR5Jyk7XG5cbnZhciBfaXNFbXB0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0VtcHR5KTtcblxudmFyIF9nZXRDaGlsZFR5cGUgPSByZXF1aXJlKCcuLi91dGlscy9nZXRDaGlsZFR5cGUnKTtcblxudmFyIF9nZXRDaGlsZFR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0Q2hpbGRUeXBlKTtcblxudmFyIF9pbmxpbmVTdHlsZVRyYW5zZm9ybWVyID0gcmVxdWlyZSgnaW5saW5lLXN0eWxlLXRyYW5zZm9ybWVyJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogTG9ncyBzdHlsZXMgYWNjb3JkaW5nIHRvIGRpZmZlcmVudCBzZXR0aW5nc1xuICovXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBzdHlsZXMgPSBfcmVmLnN0eWxlcztcbiAgdmFyIENvbXBvbmVudCA9IF9yZWYuQ29tcG9uZW50O1xuICB2YXIgZWxlbWVudCA9IF9yZWYuZWxlbWVudDtcbiAgdmFyIG5ld1Byb3BzID0gX3JlZi5uZXdQcm9wcztcbiAgdmFyIHN0eWxlTG9nZ2VyID0gX3JlZi5jb25maWcuc3R5bGVMb2dnZXI7XG5cbiAgaWYgKHN0eWxlTG9nZ2VyKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIExvZ2dlciBpbmZvcm1hdGlvblxuICAgICAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICAgICAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuXG5cbiAgICAgIHZhciBjaGlsZFR5cGUgPSAoMCwgX2dldENoaWxkVHlwZTIuZGVmYXVsdCkoZWxlbWVudCk7XG5cbiAgICAgIHZhciBrZXlJbmZvID0ga2V5ICE9PSBudWxsID8gJ2tleT0nICsga2V5IDogJyc7XG4gICAgICB2YXIgcmVmSW5mbyA9IHJlZiAhPT0gbnVsbCA/ICdyZWY9JyArIHJlZiA6ICcnO1xuXG4gICAgICB2YXIgZWxlbWVudFJlZmVyZW5jZSA9IGtleUluZm8gKyAoa2V5SW5mbyAhPT0gJycgJiYgcmVmSW5mbyAhPT0gJycgPyAnOycgOiAnJykgKyByZWZJbmZvO1xuICAgICAgdmFyIGVsZW1lbnRJbmZvID0gY2hpbGRUeXBlICsgKGVsZW1lbnRSZWZlcmVuY2UgIT09ICcnID8gJ1snICsgZWxlbWVudFJlZmVyZW5jZSArICddJyA6ICcnKTtcblxuICAgICAgdmFyIGxvZ2dlclByZWZpeCA9IENvbXBvbmVudC5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSArICc6JyArIGVsZW1lbnRJbmZvICsgJyc7XG4gICAgICB2YXIgbG9nU3R5bGVzID0gc3R5bGVMb2dnZXIudG9TdHJpbmcgPT09IHRydWUgPyAoMCwgX2lubGluZVN0eWxlVHJhbnNmb3JtZXIudG9DU1MpKHN0eWxlcykgOiBzdHlsZXM7XG5cbiAgICAgIHZhciBsb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gICAgICAgIGlmIChzdHlsZUxvZ2dlci5ub0VtcHR5ICYmICgwLCBfaXNFbXB0eTIuZGVmYXVsdCkobG9nU3R5bGVzKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhsb2dnZXJQcmVmaXgsIGxvZ1N0eWxlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH07XG5cbiAgICAgIC8vIGxvZ3Mgc3R5bGVzIGlmIGEgZ2l2ZW4gZXZlbnQgZ290IHRyaWdnZXJlZFxuICAgICAgaWYgKHN0eWxlTG9nZ2VyLm9uRXZlbnQgJiYgIW5ld1Byb3BzLl9zdHlsZUxvZ2dlckFjdGl2ZSkge1xuICAgICAgICAvLyBBbGxvd2luZyBtdWx0aXBsZSBldmVudHNcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHN0eWxlTG9nZ2VyLm9uRXZlbnQpKSB7XG4gICAgICAgICAgc3R5bGVMb2dnZXIub25FdmVudCA9IFtzdHlsZUxvZ2dlci5vbkV2ZW50XTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJdGVyYXRlIGV2ZXJ5IGV2ZW50IGFuZCBhZGQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHN0eWxlTG9nZ2VyLm9uRXZlbnQuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB2YXIgZXhpc3RpbmdFdmVudCA9IG5ld1Byb3BzW2V2ZW50XTtcbiAgICAgICAgICBuZXdQcm9wc1tldmVudF0gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRXZlbnQpIHtcbiAgICAgICAgICAgICAgZXhpc3RpbmdFdmVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3UHJvcHMuX3N0eWxlTG9nZ2VyRXZlbnQoZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3UHJvcHMuX3N0eWxlTG9nZ2VyQWN0aXZlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgbmV3UHJvcHMuX3N0eWxlTG9nZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBsb2coKTtcbiAgICAgICAgaWYgKHN0eWxlTG9nZ2VyLm9ubHlUb3BNb3N0KSB7XG4gICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBuZXdQcm9wcy5fbG9va1Nob3VsZFVwZGF0ZSA9IHRydWU7XG5cbiAgICAgIC8vIGxvZ3Mgc3R5bGVzIGV2ZXJ5dGltZSB0aGUgZWxlbWVudCBnZXRzIHJlbmRlcmVkXG4gICAgICBpZiAoc3R5bGVMb2dnZXIub25SZW5kZXIpIHtcbiAgICAgICAgbG9nKCk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjb3B5UHJvcGVydGllcztcbi8vIFRha2VuIGZyb20gUmFkaXVtJ3MgY29yZSBkaXJlY3RseVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0Zvcm1pZGFibGVMYWJzL3JhZGl1bS9ibG9iL21hc3Rlci9zcmMvZW5oYW5jZXIuanMjTDhcbi8vIFRoaXMgZW5zdXJlcyBob3QgcmVsb2FkaW5nIHdvcmtpbmcgZmluZSwgc2VlIGlzc3VlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vRm9ybWlkYWJsZUxhYnMvcmFkaXVtL3B1bGwvMjU1XG52YXIgS0VZU19UT19JR05PUkVfV0hFTl9DT1BZSU5HX1BST1BFUlRJRVMgPSBbJ2FyZ3VtZW50cycsICdjYWxsZWUnLCAnY2FsbGVyJywgJ2xlbmd0aCcsICduYW1lJywgJ3Byb3RvdHlwZScsICd0eXBlJ107XG5cbmZ1bmN0aW9uIGNvcHlQcm9wZXJ0aWVzKHNvdXJjZSwgdGFyZ2V0KSB7XG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKEtFWVNfVE9fSUdOT1JFX1dIRU5fQ09QWUlOR19QUk9QRVJUSUVTLmluZGV4T2Yoa2V5KSA8IDAgJiYgIXRhcmdldC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH0pO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzRnVuY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2gvaXNGdW5jdGlvbicpO1xuXG52YXIgX2lzRnVuY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNGdW5jdGlvbik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGdldENoaWxkVHlwZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY2hpbGRzIHR5cGVcbiAqIElmIGNoaWxkIGlzIGFuIEVTNiBjbGFzcyBpdCByZXR1cm5zIHRoZSBkaXNwbGF5TmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGNoaWxkIC0gY2hpbGQgd2hpY2ggdHlwZSBnZXRzIGlkZW50aWZpZWRcbiAqL1xuZnVuY3Rpb24gZ2V0Q2hpbGRUeXBlKGNoaWxkKSB7XG4gIGlmICgoMCwgX2lzRnVuY3Rpb24yLmRlZmF1bHQpKGNoaWxkLnR5cGUpKSB7XG4gICAgcmV0dXJuIGNoaWxkLnR5cGUuaGFzT3duUHJvcGVydHkoJ25hbWUnKSA/IGNoaWxkLnR5cGUubmFtZSA6IGNoaWxkLnR5cGU7XG4gIH1cbiAgcmV0dXJuIGNoaWxkLnR5cGU7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIEV4dHJhY3RzIG9ubHkgdGhlIG1hdGhlbWF0aWNhbCBleHByZXNzaW9uIG91dCBhbiBwc2V1ZG8tY2xhc3Mgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gcHNldWRvIC0gcHNldWRvLWNsYXNzIHNlbGVjdG9yIHRoYXQgaW5jbHVkZXMgYSBtYXRobWFjdGljYWwgZXhwcmVzc2lvblxuICovXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChwc2V1ZG8pIHtcbiAgaWYgKHBzZXVkby5pbmRleE9mKCcoJykgPiAtMSkge1xuICAgIHZhciBzcGxpdCA9IHBzZXVkby5yZXBsYWNlKC8gL2csICcnKS5zcGxpdCgnKCcpO1xuICAgIHJldHVybiBzcGxpdFsxXS5zdWJzdHIoMCwgc3BsaXRbMV0ubGVuZ3RoIC0gMSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzb3J0T2JqZWN0O1xuLyoqXG4gKiBTb3J0cyBvYmplY3RzIGluIG9yZGVyIHRvIGFsd2F5cyBnZXQgdGhlIHNhbWUgaGFzaCBjb2RlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gT2JqZWN0IHRoYXQgZ2V0cyBzb3J0ZWRcbiAqL1xuZnVuY3Rpb24gc29ydE9iamVjdChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuc29ydCgpLnJlZHVjZShmdW5jdGlvbiAob3V0cHV0LCBwcm9wZXJ0eSkge1xuICAgIG91dHB1dFtwcm9wZXJ0eV0gPSBvYmpbcHJvcGVydHldOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIG91dHB1dDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9LCB7fSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gcmVxdWlyZSgnbG9kYXNoL2dldCcpO1xuXG52YXIgX2dldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXQpO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC9hc3NpZ24nKTtcblxudmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIFNwbGl0cyBhbiBleHByZXNzaW9uIGF0IGEgZ2l2ZW4gb3BlcmF0b3IgYW5kIHJldHVybnMgYm90aCB2YWx1ZXMgY29udmVydGVkIHRvIGNvbXBhcmUgdGhlbSB3aXRoIGVhc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBrZXkgdGhhdCBnZXRzIGV2YWx1YXRlZCwgaW4gdGhpcyBjYXNlIHRoZSBleHByZXNzaW9uXG4gKiBAcGFyYW0ge29wZXJhdG9yfSBvcGVyYXRvciAtIG9wZXJhdG9yIHdoaWNoIHNwbGl0cyBwcm9wZXJ0eSBhbmQgdmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBDb21wb25lbnQgLSBvdXRlciBSZWFjdCBDb21wb25lbnQgaG9sZGluZyBwcm9wcyBhbmQgc3RhdGUgdG8gbWF0Y2hcbiAqL1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoa2V5LCBvcGVyYXRvciwgQ29tcG9uZW50KSB7XG4gIGlmIChrZXkuaW5kZXhPZihvcGVyYXRvcikgPT09IC0xKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIG1hdGNoVmFsdWVzID0gKDAsIF9hc3NpZ24yLmRlZmF1bHQpKHt9LCBDb21wb25lbnQucHJvcHMsIENvbXBvbmVudC5zdGF0ZSk7XG5cbiAgdmFyIF9rZXkkc3BsaXQgPSBrZXkuc3BsaXQob3BlcmF0b3IpO1xuXG4gIHZhciBfa2V5JHNwbGl0MiA9IF9zbGljZWRUb0FycmF5KF9rZXkkc3BsaXQsIDIpO1xuXG4gIHZhciBwcm9wZXJ0eSA9IF9rZXkkc3BsaXQyWzBdO1xuICB2YXIgdmFsdWUgPSBfa2V5JHNwbGl0MlsxXTtcblxuICB2YXIgX3Byb3BlcnR5JHNwbGl0ID0gcHJvcGVydHkuc3BsaXQoJy4nKTtcblxuICB2YXIgX3Byb3BlcnR5JHNwbGl0MiA9IF9zbGljZWRUb0FycmF5KF9wcm9wZXJ0eSRzcGxpdCwgMSk7XG5cbiAgdmFyIGJhc2VQcm9wID0gX3Byb3BlcnR5JHNwbGl0MlswXTtcblxuXG4gIGlmIChtYXRjaFZhbHVlcy5oYXNPd25Qcm9wZXJ0eShiYXNlUHJvcCkpIHtcbiAgICB2YXIgbWF0Y2ggPSAoMCwgX2dldDIuZGVmYXVsdCkobWF0Y2hWYWx1ZXMsIHByb3BlcnR5KTtcblxuICAgIG1hdGNoID0gbWF0Y2ggPT09IHVuZGVmaW5lZCA/ICd1bmRlZmluZWQnIDogbWF0Y2g7XG5cbiAgICBpZiAoISghaXNOYU4ocGFyc2VGbG9hdChtYXRjaCkpICYmIGlzRmluaXRlKG1hdGNoKSkpIHtcbiAgICAgIG1hdGNoID0gKG1hdGNoICsgJycpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbGVmdDogbWF0Y2gsIHJpZ2h0OiB2YWx1ZSB9O1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107Il19

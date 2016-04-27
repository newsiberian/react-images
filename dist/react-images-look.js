(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Lightbox = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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
},{"../core/resolver":7,"./Prefixer":3,"./StyleContainer":4,"lodash/merge":195,"react":undefined}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"../utils/generateHashCode":19,"./Prefixer":3,"inline-style-transformer":76,"lodash/isEmpty":181,"lodash/merge":195,"react-look-core":203}],5:[function(require,module,exports){
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
},{"../core/renderer":6,"../utils/getFontFormat":20,"./StyleContainer":4,"lodash/isFunction":182,"lodash/isPlainObject":188}],6:[function(require,module,exports){
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
},{"../api/StyleContainer":4,"../utils/isDynamicArray":21,"../utils/isMediaQuery":22,"../utils/isPseudo":23,"../utils/sortPseudoClasses":24,"lodash/isArray":176,"lodash/isBoolean":179,"lodash/isEmpty":181,"lodash/isFunction":182,"lodash/isPlainObject":188}],7:[function(require,module,exports){
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
},{"../api/StyleContainer":4,"../mixins/extractCSS":9,"./renderer":6,"assign-styles":25,"lodash/isEmpty":181,"react":undefined,"react-look-core":203}],8:[function(require,module,exports){
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
},{"./api/LookRoot":2,"./api/Prefixer":3,"./api/StyleContainer":4,"./api/StyleSheet":5,"./core/resolver":7,"./mixins/extractCSS":9,"./mixins/platformQuery":10,"./mixins/substr":11,"./plugins/fallbackValue":12,"./plugins/friendlyClassName":13,"./plugins/linter":14,"./prefixer/DynamicPrefixer":15,"./prefixer/StaticPrefixer":16,"./presets/react-dom":17,"react-look-core":203}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{"inline-style-prefixer":59}],11:[function(require,module,exports){
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
},{"lodash/isNumber":185,"lodash/isString":189,"react":undefined,"react-look-core":203}],12:[function(require,module,exports){
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
},{"../utils/camelToDashCase":18,"assign-styles":25,"lodash/isArray":176,"lodash/isPlainObject":188}],13:[function(require,module,exports){
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
},{"react-look-core":203}],14:[function(require,module,exports){
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
},{"inline-style-linter":28,"react-look-core":203}],15:[function(require,module,exports){
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
},{"../api/Prefixer":3,"inline-style-prefixer":59}],16:[function(require,module,exports){
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
},{"../api/Prefixer":3,"inline-style-prefix-all":52}],17:[function(require,module,exports){
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
},{"../mixins/extractCSS":9,"../mixins/platformQuery":10,"../mixins/substr":11,"../plugins/fallbackValue":12,"../prefixer/StaticPrefixer":16,"react-look-core":203}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{"lodash/isNumber":185,"lodash/isString":189}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (property) {
  return property.substr(0, 6) === '@media';
};

module.exports = exports['default'];
},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (property) {
  return property.charAt(0) === ':';
};

module.exports = exports['default'];
},{}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{"./utils/isArray":36,"./utils/isObject":37}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){
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
},{"./Linter":26,"./plugins/compatibility":29,"./plugins/noInitialValue":30,"./plugins/noVendorPrefix":31,"./plugins/preferNumber":32,"./plugins/requireUnit":33,"./plugins/shorthandLonghand":34}],29:[function(require,module,exports){
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
},{"../data/propertyMap":27,"../utils/browserNames":35,"../utils/targetBrowser":39,"../utils/unprefixStyles":41,"object-assign":43}],30:[function(require,module,exports){
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
},{"../data/propertyMap":27}],31:[function(require,module,exports){
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
},{}],32:[function(require,module,exports){
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
},{}],33:[function(require,module,exports){
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
},{"../utils/isUnitlessProperty":38}],34:[function(require,module,exports){
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
},{"../data/propertyMap":27}],35:[function(require,module,exports){
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
},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (arr) {
  return arr && Array.isArray(arr);
};

module.exports = exports['default'];
},{}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (obj) {
  return obj && obj instanceof Object === true && !Array.isArray(obj);
};

module.exports = exports['default'];
},{}],38:[function(require,module,exports){
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
},{}],39:[function(require,module,exports){
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
},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (property) {
  var unprefixed = property.replace(/^(ms|Webkit|Moz|O)/, '');
  return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1);
};

module.exports = exports['default'];
},{}],41:[function(require,module,exports){
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
},{"./unprefixProperty":40,"./unprefixValue":42}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return value.replace(/(-ms-|-webkit-|-moz-|-o-)/g, '');
};

module.exports = exports['default'];
},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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
},{"../utils/joinPrefixedRules":57}],45:[function(require,module,exports){
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
},{"../utils/joinPrefixedRules":57}],46:[function(require,module,exports){
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
},{"../utils/camelToDashCase":55}],47:[function(require,module,exports){
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
},{}],48:[function(require,module,exports){
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
},{"../utils/camelToDashCase":55}],49:[function(require,module,exports){
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
},{"../utils/joinPrefixedRules":57}],50:[function(require,module,exports){
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
},{"../utils/joinPrefixedRules":57}],51:[function(require,module,exports){
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
},{"../prefixProps":53,"../utils/camelToDashCase":55,"../utils/capitalizeString":56,"../utils/unprefixProperty":58}],52:[function(require,module,exports){
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
},{"./plugins/calc":44,"./plugins/cursor":45,"./plugins/flex":46,"./plugins/flexboxIE":47,"./plugins/flexboxOld":48,"./plugins/gradient":49,"./plugins/sizing":50,"./plugins/transition":51,"./prefixProps":53,"./utils/assign":54,"./utils/capitalizeString":56}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true, "borderImage": true, "borderImageOutset": true, "borderImageRepeat": true, "borderImageSlice": true, "borderImageSource": true, "borderImageWidth": true, "tabSize": true, "objectFit": true, "objectPosition": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
module.exports = exports["default"];
},{}],54:[function(require,module,exports){
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
},{}],55:[function(require,module,exports){
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
},{}],56:[function(require,module,exports){
// helper to capitalize strings
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = exports["default"];
},{}],57:[function(require,module,exports){
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
},{"./camelToDashCase":55}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (property) {
  var unprefixed = property.replace(/^(ms|Webkit|Moz|O)/, '');
  return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1);
};

module.exports = exports['default'];
},{}],59:[function(require,module,exports){
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
},{"./plugins/calc":60,"./plugins/cursor":61,"./plugins/flex":62,"./plugins/flexboxIE":63,"./plugins/flexboxOld":64,"./plugins/gradient":65,"./plugins/sizing":66,"./plugins/transition":67,"./prefixProps":68,"./utils/assign":69,"./utils/capitalizeString":71,"./utils/getBrowserInformation":72,"./utils/getPrefixedKeyframes":73,"inline-style-prefix-all":52}],60:[function(require,module,exports){
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
},{"../utils/camelToDashCase":70}],61:[function(require,module,exports){
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
},{"../utils/camelToDashCase":70}],62:[function(require,module,exports){
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
},{"../utils/camelToDashCase":70}],63:[function(require,module,exports){
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
},{"../utils/camelToDashCase":70}],64:[function(require,module,exports){
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
},{"../utils/camelToDashCase":70}],65:[function(require,module,exports){
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
},{"../utils/camelToDashCase":70}],66:[function(require,module,exports){
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
},{"../utils/camelToDashCase":70}],67:[function(require,module,exports){
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
},{"../utils/camelToDashCase":70,"../utils/capitalizeString":71,"../utils/unprefixProperty":74}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = { "chrome": { "transform": 35, "transformOrigin": 35, "transformOriginX": 35, "transformOriginY": 35, "backfaceVisibility": 35, "perspective": 35, "perspectiveOrigin": 35, "transformStyle": 35, "transformOriginZ": 35, "animation": 42, "animationDelay": 42, "animationDirection": 42, "animationFillMode": 42, "animationDuration": 42, "animationIterationCount": 42, "animationName": 42, "animationPlayState": 42, "animationTimingFunction": 42, "appearance": 52, "userSelect": 52, "fontKerning": 32, "textEmphasisPosition": 52, "textEmphasis": 52, "textEmphasisStyle": 52, "textEmphasisColor": 52, "boxDecorationBreak": 52, "clipPath": 52, "maskImage": 52, "maskMode": 52, "maskRepeat": 52, "maskPosition": 52, "maskClip": 52, "maskOrigin": 52, "maskSize": 52, "maskComposite": 52, "mask": 52, "maskBorderSource": 52, "maskBorderMode": 52, "maskBorderSlice": 52, "maskBorderWidth": 52, "maskBorderOutset": 52, "maskBorderRepeat": 52, "maskBorder": 52, "maskType": 52, "textDecorationStyle": 52, "textDecorationSkip": 52, "textDecorationLine": 52, "textDecorationColor": 52, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 52, "breakBefore": 52, "breakInside": 52, "columnCount": 52, "columnFill": 52, "columnGap": 52, "columnRule": 52, "columnRuleColor": 52, "columnRuleStyle": 52, "columnRuleWidth": 52, "columns": 52, "columnSpan": 52, "columnWidth": 52 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 9.1, "userSelect": 9.1, "backdropFilter": 9.1, "fontKerning": 9.1, "scrollSnapType": 9.1, "scrollSnapPointsX": 9.1, "scrollSnapPointsY": 9.1, "scrollSnapDestination": 9.1, "scrollSnapCoordinate": 9.1, "textEmphasisPosition": 7, "textEmphasis": 7, "textEmphasisStyle": 7, "textEmphasisColor": 7, "boxDecorationBreak": 9.1, "clipPath": 9.1, "maskImage": 9.1, "maskMode": 9.1, "maskRepeat": 9.1, "maskPosition": 9.1, "maskClip": 9.1, "maskOrigin": 9.1, "maskSize": 9.1, "maskComposite": 9.1, "mask": 9.1, "maskBorderSource": 9.1, "maskBorderMode": 9.1, "maskBorderSlice": 9.1, "maskBorderWidth": 9.1, "maskBorderOutset": 9.1, "maskBorderRepeat": 9.1, "maskBorder": 9.1, "maskType": 9.1, "textDecorationStyle": 9.1, "textDecorationSkip": 9.1, "textDecorationLine": 9.1, "textDecorationColor": 9.1, "shapeImageThreshold": 9.1, "shapeImageMargin": 9.1, "shapeImageOutside": 9.1, "filter": 9, "hyphens": 9.1, "flowInto": 9.1, "flowFrom": 9.1, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 9.1, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 47, "userSelect": 47, "boxSizing": 28, "textAlignLast": 47, "textDecorationStyle": 35, "textDecorationSkip": 35, "textDecorationLine": 35, "textDecorationColor": 35, "tabSize": 47, "hyphens": 42, "fontFeatureSettings": 33, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 37, "userSelect": 37, "fontKerning": 19, "textEmphasisPosition": 37, "textEmphasis": 37, "textEmphasisStyle": 37, "textEmphasisColor": 37, "boxDecorationBreak": 37, "clipPath": 37, "maskImage": 37, "maskMode": 37, "maskRepeat": 37, "maskPosition": 37, "maskClip": 37, "maskOrigin": 37, "maskSize": 37, "maskComposite": 37, "mask": 37, "maskBorderSource": 37, "maskBorderMode": 37, "maskBorderSlice": 37, "maskBorderWidth": 37, "maskBorderOutset": 37, "maskBorderRepeat": 37, "maskBorder": 37, "maskType": 37, "filter": 37, "fontFeatureSettings": 37, "breakAfter": 37, "breakBefore": 37, "breakInside": 37, "columnCount": 37, "columnFill": 37, "columnGap": 37, "columnRule": 37, "columnRuleColor": 37, "columnRuleStyle": 37, "columnRuleWidth": 37, "columns": 37, "columnSpan": 37, "columnWidth": 37 }, "ie": { "gridRowStart": 11, "gridAutoColumns": 11, "gridRowGap": 11, "breakInside": 11, "transform": 9, "breakAfter": 11, "gridRowEnd": 11, "transformOrigin": 9, "gridColumnEnd": 11, "userSelect": 11, "transformOriginY": 9, "flexDirection": 10, "wrapThrough": 11, "flowFrom": 11, "gridColumnStart": 11, "regionFragment": 11, "flowInto": 11, "scrollSnapType": 11, "flexWrap": 10, "gridAutoFlow": 11, "wrapFlow": 11, "wrapMargin": 11, "gridTemplateAreas": 11, "gridTemplateRows": 11, "flexFlow": 10, "gridAutoRows": 11, "grid": 11, "gridRow": 11, "touchAction": 10, "gridColumnGap": 11, "gridGap": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapPointsX": 11, "flex": 10, "transformOriginX": 9, "gridTemplateColumns": 11, "gridArea": 11, "gridTemplate": 11, "breakBefore": 11, "hyphens": 11, "scrollSnapCoordinate": 11, "gridColumn": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 14, "wrapFlow": 14, "wrapThrough": 14, "wrapMargin": 14, "scrollSnapType": 14, "scrollSnapPointsX": 14, "scrollSnapPointsY": 14, "scrollSnapDestination": 14, "scrollSnapCoordinate": 14, "hyphens": 14, "flowInto": 14, "flowFrom": 14, "breakBefore": 14, "breakAfter": 14, "breakInside": 14, "regionFragment": 14, "gridTemplateColumns": 14, "gridTemplateRows": 14, "gridTemplateAreas": 14, "gridTemplate": 14, "gridAutoColumns": 14, "gridAutoRows": 14, "gridAutoFlow": 14, "grid": 14, "gridRowStart": 14, "gridColumnStart": 14, "gridRowEnd": 14, "gridRow": 14, "gridColumn": 14, "gridColumnEnd": 14, "gridColumnGap": 14, "gridRowGap": 14, "gridArea": 14, "gridGap": 14 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 9.3, "userSelect": 9.3, "backdropFilter": 9.3, "fontKerning": 9.3, "scrollSnapType": 9.3, "scrollSnapPointsX": 9.3, "scrollSnapPointsY": 9.3, "scrollSnapDestination": 9.3, "scrollSnapCoordinate": 9.3, "boxDecorationBreak": 9.3, "clipPath": 9.3, "maskImage": 9.3, "maskMode": 9.3, "maskRepeat": 9.3, "maskPosition": 9.3, "maskClip": 9.3, "maskOrigin": 9.3, "maskSize": 9.3, "maskComposite": 9.3, "mask": 9.3, "maskBorderSource": 9.3, "maskBorderMode": 9.3, "maskBorderSlice": 9.3, "maskBorderWidth": 9.3, "maskBorderOutset": 9.3, "maskBorderRepeat": 9.3, "maskBorder": 9.3, "maskType": 9.3, "textSizeAdjust": 9.3, "textDecorationStyle": 9.3, "textDecorationSkip": 9.3, "textDecorationLine": 9.3, "textDecorationColor": 9.3, "shapeImageThreshold": 9.3, "shapeImageMargin": 9.3, "shapeImageOutside": 9.3, "filter": 9, "hyphens": 9.3, "flowInto": 9.3, "flowFrom": 9.3, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 9.3, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "borderImage": 4.2, "borderImageOutset": 4.2, "borderImageRepeat": 4.2, "borderImageSlice": 4.2, "borderImageSource": 4.2, "borderImageWidth": 4.2, "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 47, "userSelect": 47, "fontKerning": 4.4, "textEmphasisPosition": 47, "textEmphasis": 47, "textEmphasisStyle": 47, "textEmphasisColor": 47, "boxDecorationBreak": 47, "clipPath": 47, "maskImage": 47, "maskMode": 47, "maskRepeat": 47, "maskPosition": 47, "maskClip": 47, "maskOrigin": 47, "maskSize": 47, "maskComposite": 47, "mask": 47, "maskBorderSource": 47, "maskBorderMode": 47, "maskBorderSlice": 47, "maskBorderWidth": 47, "maskBorderOutset": 47, "maskBorderRepeat": 47, "maskBorder": 47, "maskType": 47, "filter": 47, "fontFeatureSettings": 47, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "and_chr": { "appearance": 47, "userSelect": 47, "textEmphasisPosition": 47, "textEmphasis": 47, "textEmphasisStyle": 47, "textEmphasisColor": 47, "boxDecorationBreak": 47, "clipPath": 47, "maskImage": 47, "maskMode": 47, "maskRepeat": 47, "maskPosition": 47, "maskClip": 47, "maskOrigin": 47, "maskSize": 47, "maskComposite": 47, "mask": 47, "maskBorderSource": 47, "maskBorderMode": 47, "maskBorderSlice": 47, "maskBorderWidth": 47, "maskBorderOutset": 47, "maskBorderRepeat": 47, "maskBorder": 47, "maskType": 47, "textDecorationStyle": 47, "textDecorationSkip": 47, "textDecorationLine": 47, "textDecorationColor": 47, "filter": 47, "fontFeatureSettings": 47, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "and_uc": { "flex": 9.9, "flexBasis": 9.9, "flexDirection": 9.9, "flexGrow": 9.9, "flexFlow": 9.9, "flexShrink": 9.9, "flexWrap": 9.9, "alignContent": 9.9, "alignItems": 9.9, "alignSelf": 9.9, "justifyContent": 9.9, "order": 9.9, "transition": 9.9, "transitionDelay": 9.9, "transitionDuration": 9.9, "transitionProperty": 9.9, "transitionTimingFunction": 9.9, "transform": 9.9, "transformOrigin": 9.9, "transformOriginX": 9.9, "transformOriginY": 9.9, "backfaceVisibility": 9.9, "perspective": 9.9, "perspectiveOrigin": 9.9, "transformStyle": 9.9, "transformOriginZ": 9.9, "animation": 9.9, "animationDelay": 9.9, "animationDirection": 9.9, "animationFillMode": 9.9, "animationDuration": 9.9, "animationIterationCount": 9.9, "animationName": 9.9, "animationPlayState": 9.9, "animationTimingFunction": 9.9, "appearance": 9.9, "userSelect": 9.9, "fontKerning": 9.9, "textEmphasisPosition": 9.9, "textEmphasis": 9.9, "textEmphasisStyle": 9.9, "textEmphasisColor": 9.9, "maskImage": 9.9, "maskMode": 9.9, "maskRepeat": 9.9, "maskPosition": 9.9, "maskClip": 9.9, "maskOrigin": 9.9, "maskSize": 9.9, "maskComposite": 9.9, "mask": 9.9, "maskBorderSource": 9.9, "maskBorderMode": 9.9, "maskBorderSlice": 9.9, "maskBorderWidth": 9.9, "maskBorderOutset": 9.9, "maskBorderRepeat": 9.9, "maskBorder": 9.9, "maskType": 9.9, "textSizeAdjust": 9.9, "filter": 9.9, "hyphens": 9.9, "flowInto": 9.9, "flowFrom": 9.9, "breakBefore": 9.9, "breakAfter": 9.9, "breakInside": 9.9, "regionFragment": 9.9, "fontFeatureSettings": 9.9, "columnCount": 9.9, "columnFill": 9.9, "columnGap": 9.9, "columnRule": 9.9, "columnRuleColor": 9.9, "columnRuleStyle": 9.9, "columnRuleWidth": 9.9, "columns": 9.9, "columnSpan": 9.9, "columnWidth": 9.9 }, "op_mini": { "borderImage": 5, "borderImageOutset": 5, "borderImageRepeat": 5, "borderImageSlice": 5, "borderImageSource": 5, "borderImageWidth": 5, "tabSize": 5, "objectFit": 5, "objectPosition": 5 } };
module.exports = exports["default"];
},{}],69:[function(require,module,exports){
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
},{}],70:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"dup":55}],71:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],72:[function(require,module,exports){
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
},{"bowser":75}],73:[function(require,module,exports){
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
},{}],74:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"dup":58}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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
},{"./utils/camelToDashCase":77,"./utils/dashToCamelCase":78,"./utils/isNumber":79}],77:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],78:[function(require,module,exports){
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
},{}],79:[function(require,module,exports){
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
},{"./isUnitlessProperty":80}],80:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"dup":38}],81:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

},{"./_getNative":134,"./_root":161}],82:[function(require,module,exports){
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

},{"./_nativeCreate":160}],83:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":134,"./_root":161}],84:[function(require,module,exports){
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

},{"./_mapClear":154,"./_mapDelete":155,"./_mapGet":156,"./_mapHas":157,"./_mapSet":158}],85:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

},{"./_getNative":134,"./_root":161}],86:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Reflect = root.Reflect;

module.exports = Reflect;

},{"./_root":161}],87:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":134,"./_root":161}],88:[function(require,module,exports){
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

},{"./_stackClear":163,"./_stackDelete":164,"./_stackGet":165,"./_stackHas":166,"./_stackSet":167}],89:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":161}],90:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":161}],91:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":134,"./_root":161}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{"./eq":172}],99:[function(require,module,exports){
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

},{"./eq":172}],100:[function(require,module,exports){
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

},{"./_assocIndexOf":103}],101:[function(require,module,exports){
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

},{"./_assocIndexOf":103}],102:[function(require,module,exports){
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

},{"./_assocIndexOf":103}],103:[function(require,module,exports){
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

},{"./eq":172}],104:[function(require,module,exports){
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

},{"./_assocIndexOf":103}],105:[function(require,module,exports){
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

},{"./_copyObject":129,"./keys":192}],106:[function(require,module,exports){
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

},{"./_Stack":88,"./_arrayEach":95,"./_assignValue":99,"./_baseAssign":105,"./_cloneBuffer":121,"./_copyArray":128,"./_copySymbols":130,"./_getAllKeys":132,"./_getTag":137,"./_initCloneArray":143,"./_initCloneByTag":144,"./_initCloneObject":145,"./_isHostObject":147,"./isArray":176,"./isBuffer":180,"./isObject":186,"./keys":192}],107:[function(require,module,exports){
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

},{"./isObject":186}],108:[function(require,module,exports){
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

},{"./_arrayPush":96,"./_isFlattenable":146}],109:[function(require,module,exports){
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

},{"./_castPath":118,"./_isKey":150}],110:[function(require,module,exports){
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

},{"./_arrayPush":96,"./isArray":176}],111:[function(require,module,exports){
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

},{"./_getPrototype":135}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{"./_Reflect":86,"./_iteratorToArray":153}],114:[function(require,module,exports){
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

},{"./_Stack":88,"./_arrayEach":95,"./_assignMergeValue":98,"./_baseMergeDeep":115,"./isArray":176,"./isObject":186,"./isTypedArray":191,"./keysIn":193}],115:[function(require,module,exports){
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

},{"./_assignMergeValue":98,"./_baseClone":106,"./_copyArray":128,"./isArguments":175,"./isArray":176,"./isArrayLikeObject":178,"./isFunction":182,"./isObject":186,"./isPlainObject":188,"./isTypedArray":191,"./toPlainObject":199}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{"./_stringToPath":168,"./isArray":176}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{"./_Uint8Array":90}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{"./_cloneArrayBuffer":120}],123:[function(require,module,exports){
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

},{"./_addMapEntry":92,"./_arrayReduce":97,"./_mapToArray":159}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{"./_addSetEntry":93,"./_arrayReduce":97,"./_setToArray":162}],126:[function(require,module,exports){
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

},{"./_Symbol":89}],127:[function(require,module,exports){
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

},{"./_cloneArrayBuffer":120}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{"./_assignValue":99}],130:[function(require,module,exports){
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

},{"./_copyObject":129,"./_getSymbols":136}],131:[function(require,module,exports){
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

},{"./_isIterateeCall":149,"./rest":196}],132:[function(require,module,exports){
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

},{"./_baseGetAllKeys":110,"./_getSymbols":136,"./keys":192}],133:[function(require,module,exports){
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

},{"./_baseProperty":116}],134:[function(require,module,exports){
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

},{"./isNative":184}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{"./_DataView":81,"./_Map":83,"./_Promise":85,"./_Set":87,"./_WeakMap":91,"./_toSource":169}],138:[function(require,module,exports){
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

},{"./_hashHas":140}],139:[function(require,module,exports){
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

},{"./_nativeCreate":160}],140:[function(require,module,exports){
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

},{"./_nativeCreate":160}],141:[function(require,module,exports){
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

},{"./_nativeCreate":160}],142:[function(require,module,exports){
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

},{"./_baseTimes":117,"./isArguments":175,"./isArray":176,"./isLength":183,"./isString":189}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{"./_cloneArrayBuffer":120,"./_cloneDataView":122,"./_cloneMap":123,"./_cloneRegExp":124,"./_cloneSet":125,"./_cloneSymbol":126,"./_cloneTypedArray":127}],145:[function(require,module,exports){
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

},{"./_baseCreate":107,"./_getPrototype":135,"./_isPrototype":152}],146:[function(require,module,exports){
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

},{"./isArguments":175,"./isArray":176,"./isArrayLikeObject":178}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
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

},{"./_isIndex":148,"./eq":172,"./isArrayLike":177,"./isObject":186}],150:[function(require,module,exports){
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

},{"./isArray":176,"./isSymbol":190}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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

},{"./_Hash":82,"./_Map":83}],155:[function(require,module,exports){
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

},{"./_Map":83,"./_assocDelete":100,"./_hashDelete":138,"./_isKeyable":151}],156:[function(require,module,exports){
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

},{"./_Map":83,"./_assocGet":101,"./_hashGet":139,"./_isKeyable":151}],157:[function(require,module,exports){
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

},{"./_Map":83,"./_assocHas":102,"./_hashHas":140,"./_isKeyable":151}],158:[function(require,module,exports){
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

},{"./_Map":83,"./_assocSet":104,"./_hashSet":141,"./_isKeyable":151}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":134}],161:[function(require,module,exports){
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
},{"./_checkGlobal":119}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{"./_assocDelete":100}],165:[function(require,module,exports){
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

},{"./_assocGet":101}],166:[function(require,module,exports){
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

},{"./_assocHas":102}],167:[function(require,module,exports){
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

},{"./_MapCache":84,"./_assocSet":104}],168:[function(require,module,exports){
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

},{"./memoize":194,"./toString":200}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{"./_assignValue":99,"./_copyObject":129,"./_createAssigner":131,"./_isPrototype":152,"./isArrayLike":177,"./keys":192}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{"./_baseFlatten":108}],174:[function(require,module,exports){
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

},{"./_baseGet":109}],175:[function(require,module,exports){
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

},{"./isArrayLikeObject":178}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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

},{"./_getLength":133,"./isFunction":182,"./isLength":183}],178:[function(require,module,exports){
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

},{"./isArrayLike":177,"./isObjectLike":187}],179:[function(require,module,exports){
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

},{"./isObjectLike":187}],180:[function(require,module,exports){
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

},{"./_root":161,"./constant":171}],181:[function(require,module,exports){
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

},{"./_getTag":137,"./isArguments":175,"./isArray":176,"./isArrayLike":177,"./isBuffer":180,"./isFunction":182,"./isObjectLike":187,"./isString":189,"./keys":192}],182:[function(require,module,exports){
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

},{"./isObject":186}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
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

},{"./_isHostObject":147,"./_toSource":169,"./isFunction":182,"./isObject":186}],185:[function(require,module,exports){
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

},{"./isObjectLike":187}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{"./_getPrototype":135,"./_isHostObject":147,"./isObjectLike":187}],189:[function(require,module,exports){
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

},{"./isArray":176,"./isObjectLike":187}],190:[function(require,module,exports){
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

},{"./isObjectLike":187}],191:[function(require,module,exports){
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

},{"./isLength":183,"./isObjectLike":187}],192:[function(require,module,exports){
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

},{"./_baseHas":111,"./_baseKeys":112,"./_indexKeys":142,"./_isIndex":148,"./_isPrototype":152,"./isArrayLike":177}],193:[function(require,module,exports){
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

},{"./_baseKeysIn":113,"./_indexKeys":142,"./_isIndex":148,"./_isPrototype":152}],194:[function(require,module,exports){
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

},{"./_MapCache":84}],195:[function(require,module,exports){
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

},{"./_baseMerge":114,"./_createAssigner":131}],196:[function(require,module,exports){
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

},{"./_apply":94,"./toInteger":197}],197:[function(require,module,exports){
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

},{"./toNumber":198}],198:[function(require,module,exports){
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

},{"./isFunction":182,"./isObject":186,"./isSymbol":190}],199:[function(require,module,exports){
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

},{"./_copyObject":129,"./keysIn":193}],200:[function(require,module,exports){
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

},{"./_Symbol":89,"./isSymbol":190}],201:[function(require,module,exports){
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
},{"../utils/copyProperties":211,"_process":1,"lodash/merge":195,"react":undefined}],202:[function(require,module,exports){
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
},{"lodash/flattenDeep":173,"lodash/isArray":176,"lodash/isNumber":185,"lodash/isString":189,"react":undefined}],203:[function(require,module,exports){
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
},{"./core/enhancer":201,"./core/resolver":202,"./mixins/condition":204,"./mixins/contains":205,"./mixins/extend":206,"./plugins/mixin":207,"./plugins/statefulSelector":208,"./plugins/statefulValue":209,"./plugins/styleLogger":210,"./utils/copyProperties":211,"./utils/getChildType":212,"./utils/getPseudoExpression":213,"./utils/sortObject":214,"./utils/splitCondition":215}],204:[function(require,module,exports){
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
},{"../utils/splitCondition":215}],205:[function(require,module,exports){
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
},{"../utils/getPseudoExpression":213,"lodash/isString":189}],206:[function(require,module,exports){
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
},{"assign-styles":25}],207:[function(require,module,exports){
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
},{"assign-styles":25,"lodash/isEmpty":181}],208:[function(require,module,exports){
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
},{"assign-styles":25,"lodash/isFunction":182,"lodash/isPlainObject":188}],209:[function(require,module,exports){
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
},{"assign-styles":25,"lodash/isFunction":182,"lodash/isPlainObject":188}],210:[function(require,module,exports){
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
},{"../utils/getChildType":212,"inline-style-transformer":76,"lodash/isEmpty":181}],211:[function(require,module,exports){
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
},{}],212:[function(require,module,exports){
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
},{"lodash/isFunction":182}],213:[function(require,module,exports){
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
},{}],214:[function(require,module,exports){
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
},{}],215:[function(require,module,exports){
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
},{"lodash/assign":170,"lodash/get":174}],216:[function(require,module,exports){
(function (global){
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

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactLook = require('react-look');

var _reactLook2 = _interopRequireDefault(_reactLook);

var Fade = (function (_Component) {
	_inherits(Fade, _Component);

	function Fade() {
		_classCallCheck(this, Fade);

		_get(Object.getPrototypeOf(Fade.prototype), 'constructor', this).call(this);
		this._showElement = this._showElement.bind(this);
		this._hideElement = this._hideElement.bind(this);
	}

	_createClass(Fade, [{
		key: 'componentWillAppear',
		value: function componentWillAppear(callback) {
			setTimeout(callback, 1); // need at least one tick to fire transition
		}
	}, {
		key: 'componentDidAppear',
		value: function componentDidAppear() {
			this._showElement();
		}
	}, {
		key: 'componentWillEnter',
		value: function componentWillEnter(callback) {
			setTimeout(callback, 1);
		}
	}, {
		key: 'componentDidEnter',
		value: function componentDidEnter() {
			this._showElement();
		}
	}, {
		key: 'componentWillLeave',
		value: function componentWillLeave(callback) {
			this._hideElement();
			setTimeout(callback, this.props.duration);
		}
	}, {
		key: 'componentDidLeave',
		value: function componentDidLeave() {}
	}, {
		key: '_showElement',
		value: function _showElement() {
			var el = this.refs.element;
			el.style.opacity = 1;
		}
	}, {
		key: '_hideElement',
		value: function _hideElement() {
			var el = this.refs.element;
			el.style.opacity = 0;
		}
	}, {
		key: 'render',
		value: function render() {
			var props = _extends({}, this.props);
			var style = {
				opacity: 0,
				WebkitTransition: 'opacity ' + this.props.duration + 'ms ease-out',
				msTransition: 'opacity ' + this.props.duration + 'ms ease-out',
				transition: 'opacity ' + this.props.duration + 'ms ease-out'
			};
			props.style = _extends(style, this.props.style);
			return _react2['default'].createElement(this.props.component, props, this.props.children);
		}
	}]);

	return Fade;
})(_react.Component);

Fade.propTypes = {
	children: _react.PropTypes.any,
	component: _react.PropTypes.any,
	duration: _react.PropTypes.number,
	style: _react.PropTypes.object
};

Fade.defaultProps = {
	component: 'div',
	duration: 200,
	ref: 'element'
};

exports['default'] = (0, _reactLook2['default'])(Fade);
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-look":8}],217:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var Icon = function Icon(props) {
	return _react2['default'].createElement('span', _extends({
		dangerouslySetInnerHTML: { __html: _icons2['default'][props.type] }
	}, props));
};

Icon.propTypes = {
	type: _react.PropTypes.oneOf(Object.keys(_icons2['default']))
};

exports['default'] = Icon;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./icons":223}],218:[function(require,module,exports){
(function (global){
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

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Fade":216,"./Icon":217,"./Portal":219,"./styles/default":224,"./utils":225,"react-look":8,"react-swipeable":undefined}],219:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _reactDom = require('react-dom');

var Portal = (function (_Component) {
	_inherits(Portal, _Component);

	function Portal() {
		_classCallCheck(this, Portal);

		_get(Object.getPrototypeOf(Portal.prototype), 'constructor', this).call(this);
		this.portalElement = null;
	}

	_createClass(Portal, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var p = document.createElement('div');
			document.body.appendChild(p);
			this.portalElement = p;
			this.componentDidUpdate();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			(0, _reactDom.render)(_react2['default'].createElement(
				_reactAddonsTransitionGroup2['default'],
				_extends({}, this.props, { component: 'div' }),
				this.props.children
			), this.portalElement);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.body.removeChild(this.portalElement);
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return Portal;
})(_react.Component);

exports['default'] = Portal;

Portal.propTypes = {
	children: _react.PropTypes.any
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-addons-transition-group":undefined,"react-dom":undefined}],220:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"/>' + '</svg>';

},{}],221:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"/>' + '</svg>';

},{}],222:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' + '<path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>' + '</svg>';

},{}],223:[function(require,module,exports){
'use strict';

module.exports = {
	arrowLeft: require('./arrowLeft'),
	arrowRight: require('./arrowRight'),
	close: require('./close')
};

},{"./arrowLeft":220,"./arrowRight":221,"./close":222}],224:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _reactLook = require('react-look');

var CLOSE_SIZE = 20;
var ARROW_HEIGHT = 120;
var GAP_BOTTOM = 50;
var GAP_TOP = 40;

var styles = _reactLook.StyleSheet.create({
	// SCENE
	container: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		boxSizing: 'border-box',
		height: '100%',
		left: 0,
		padding: '0 10px',
		position: 'fixed',
		textAlign: 'center',
		top: 0,
		width: '100%',
		zIndex: 1001
	},
	content: {
		display: 'inline-block',
		margin: '0 auto',
		maxWidth: '100%',
		position: 'relative',
		verticalAlign: 'middle'
	},
	contentHeightShim: {
		display: 'inline-block',
		height: '100%',
		lineHeight: 0,
		verticalAlign: 'middle'
	},

	// IMAGES
	image: {
		boxSizing: 'border-box',
		display: 'block',
		lineHeight: 0,
		maxWidth: '100%',
		margin: '0 auto',
		paddingBottom: 50,
		paddingTop: 40,
		height: 'auto',
		width: 'auto',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none'

	},
	figure: {
		backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDhweCcgaGVpZ2h0PSc0OHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9InVpbC1kZWZhdWx0Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjZmZmZmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMHMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nI2ZmZmZmZicgdHJhbnNmb3JtPSdyb3RhdGUoMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjA4MzMzMzMzMzMzMzMzMzMzcycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjZmZmZmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMTY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNmZmZmZmYnIHRyYW5zZm9ybT0ncm90YXRlKDkwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC4yNXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nI2ZmZmZmZicgdHJhbnNmb3JtPSdyb3RhdGUoMTIwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC4zMzMzMzMzMzMzMzMzMzMzcycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjZmZmZmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjQxNjY2NjY2NjY2NjY2NjdzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNmZmZmZmYnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuNXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nI2ZmZmZmZicgdHJhbnNmb3JtPSdyb3RhdGUoMjEwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC41ODMzMzMzMzMzMzMzMzM0cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjZmZmZmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNmZmZmZmYnIHRyYW5zZm9ybT0ncm90YXRlKDI3MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuNzVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNmZmZmZmYnIHRyYW5zZm9ybT0ncm90YXRlKDMwMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuODMzMzMzMzMzMzMzMzMzNHMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nI2ZmZmZmZicgdHJhbnNmb3JtPSdyb3RhdGUoMzMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC45MTY2NjY2NjY2NjY2NjY2cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PC9zdmc+)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		lineHeight: 1,
		minHeight: 200,
		minWidth: 300,
		margin: 0,
		textAlign: 'center'
	},
	figureShadow: {
		bottom: GAP_BOTTOM,
		boxShadow: '0 0 8px -2px rgba(0,0,0,.6)',
		display: 'block',
		height: 'auto',
		left: 0,
		position: 'absolute',
		right: 0,
		top: GAP_TOP,
		width: 'auto',
		zIndex: -1
	},
	footer: {
		color: 'white',
		lineHeight: 1.3,
		height: GAP_BOTTOM,
		marginTop: -GAP_BOTTOM,
		paddingTop: 5,
		position: 'absolute',
		textAlign: 'left',
		top: '100%',
		left: 0,
		width: '100%',
		cursor: 'auto'
	},
	footerCount: {
		float: 'right',
		fontSize: '.85em',
		opacity: 0.75
	},
	footerCaption: {
		paddingRight: 80
	},

	// BUTTONS
	arrow: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		marginTop: ARROW_HEIGHT / -2,
		maxWidth: 80,
		padding: 20,
		position: 'absolute',
		top: '50%',
		height: ARROW_HEIGHT,
		width: '16%',
		zIndex: 1001,

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect: 'none',
		MozUserSelect: 'none',
		msUserSelect: 'none',
		userSelect: 'none'
	},
	arrowNext: {
		right: 0
	},
	arrowPrev: {
		left: 0
	},
	closeBar: {
		height: GAP_TOP,
		left: 0,
		position: 'absolute',
		textAlign: 'right',
		top: 0,
		width: '100%'
	},
	closeButton: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		height: CLOSE_SIZE + 20,
		outline: 'none',
		padding: 10,
		position: 'relative',
		right: -10,
		top: 0,
		width: CLOSE_SIZE + 20
	}
});

exports['default'] = styles;
module.exports = exports['default'];

},{"react-look":8}],225:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports['default'] = {
	canUseDOM: canUseDOM
};
module.exports = exports['default'];

},{}]},{},[218])(218)
});
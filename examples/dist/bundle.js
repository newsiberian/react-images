require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

// import look from 'react-look';

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

exports['default'] = Fade;
module.exports = exports['default'];

},{"react":undefined}],217:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

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

},{"./icons":222,"react":undefined}],218:[function(require,module,exports){
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

var _react = require('react');

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

},{"react":undefined,"react-addons-transition-group":undefined,"react-dom":undefined}],219:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"/>' + '</svg>';

},{}],220:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"/>' + '</svg>';

},{}],221:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' + '<path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>' + '</svg>';

},{}],222:[function(require,module,exports){
'use strict';

module.exports = {
	arrowLeft: require('./arrowLeft'),
	arrowRight: require('./arrowRight'),
	close: require('./close')
};

},{"./arrowLeft":219,"./arrowRight":220,"./close":221}],223:[function(require,module,exports){
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

},{"react-look":8}],224:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports['default'] = {
	canUseDOM: canUseDOM
};
module.exports = exports['default'];

},{}],"react-images-look":[function(require,module,exports){
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

},{"./Fade":216,"./Icon":217,"./Portal":218,"./styles/default":223,"./utils":224,"react":undefined,"react-look":8,"react-swipeable":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWNvbXBvbmVudC1ndWxwLXRhc2tzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvYXBpL0xvb2tSb290LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL2FwaS9QcmVmaXhlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi9hcGkvU3R5bGVDb250YWluZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvYXBpL1N0eWxlU2hlZXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvY29yZS9yZW5kZXJlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi9jb3JlL3Jlc29sdmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL21peGlucy9leHRyYWN0Q1NTLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL21peGlucy9wbGF0Zm9ybVF1ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL21peGlucy9zdWJzdHIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvcGx1Z2lucy9mYWxsYmFja1ZhbHVlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3BsdWdpbnMvZnJpZW5kbHlDbGFzc05hbWUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvcGx1Z2lucy9saW50ZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvcHJlZml4ZXIvRHluYW1pY1ByZWZpeGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3ByZWZpeGVyL1N0YXRpY1ByZWZpeGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3ByZXNldHMvcmVhY3QtZG9tLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL2xpYi91dGlscy9nZW5lcmF0ZUhhc2hDb2RlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3V0aWxzL2dldEZvbnRGb3JtYXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvdXRpbHMvaXNEeW5hbWljQXJyYXkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9saWIvdXRpbHMvaXNNZWRpYVF1ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3V0aWxzL2lzUHNldWRvLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbGliL3V0aWxzL3NvcnRQc2V1ZG9DbGFzc2VzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2Fzc2lnbi1zdHlsZXMvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL0xpbnRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi9kYXRhL3Byb3BlcnR5TWFwLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL3BsdWdpbnMvY29tcGF0aWJpbGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi9wbHVnaW5zL25vSW5pdGlhbFZhbHVlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL3BsdWdpbnMvbm9WZW5kb3JQcmVmaXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLWxpbnRlci9saWIvcGx1Z2lucy9wcmVmZXJOdW1iZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLWxpbnRlci9saWIvcGx1Z2lucy9yZXF1aXJlVW5pdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi9wbHVnaW5zL3Nob3J0aGFuZExvbmdoYW5kLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL3V0aWxzL2Jyb3dzZXJOYW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi91dGlscy9pc0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL3V0aWxzL2lzT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL3V0aWxzL2lzVW5pdGxlc3NQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL2xpYi91dGlscy90YXJnZXRCcm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1saW50ZXIvbGliL3V0aWxzL3VucHJlZml4UHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLWxpbnRlci9saWIvdXRpbHMvdW5wcmVmaXhTdHlsZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLWxpbnRlci9saWIvdXRpbHMvdW5wcmVmaXhWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtbGludGVyL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi9wbHVnaW5zL2NhbGMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeC1hbGwvbGliL3BsdWdpbnMvY3Vyc29yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi9wbHVnaW5zL2ZsZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeC1hbGwvbGliL3BsdWdpbnMvZmxleGJveElFLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi9wbHVnaW5zL2ZsZXhib3hPbGQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeC1hbGwvbGliL3BsdWdpbnMvZ3JhZGllbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeC1hbGwvbGliL3BsdWdpbnMvc2l6aW5nLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi9wbHVnaW5zL3RyYW5zaXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeC1hbGwvbGliL3ByZWZpeEFsbC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4LWFsbC9saWIvcHJlZml4UHJvcHMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeC1hbGwvbGliL3V0aWxzL2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4LWFsbC9saWIvdXRpbHMvY2FtZWxUb0Rhc2hDYXNlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi91dGlscy9jYXBpdGFsaXplU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXgtYWxsL2xpYi91dGlscy9qb2luUHJlZml4ZWRSdWxlcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4LWFsbC9saWIvdXRpbHMvdW5wcmVmaXhQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL1ByZWZpeGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvcGx1Z2lucy9jYWxjLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvcGx1Z2lucy9jdXJzb3IuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9wbHVnaW5zL2ZsZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9wbHVnaW5zL2ZsZXhib3hJRS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3BsdWdpbnMvZmxleGJveE9sZC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3BsdWdpbnMvZ3JhZGllbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9wbHVnaW5zL3NpemluZy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3BsdWdpbnMvdHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3ByZWZpeFByb3BzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvdXRpbHMvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvdXRpbHMvZ2V0QnJvd3NlckluZm9ybWF0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvdXRpbHMvZ2V0UHJlZml4ZWRLZXlmcmFtZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL25vZGVfbW9kdWxlcy9ib3dzZXIvYm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS10cmFuc2Zvcm1lci9saWIvVHJhbnNmb3JtZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXRyYW5zZm9ybWVyL2xpYi91dGlscy9kYXNoVG9DYW1lbENhc2UuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXRyYW5zZm9ybWVyL2xpYi91dGlscy9pc051bWJlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0RhdGFWaWV3LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fSGFzaC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX01hcC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX01hcENhY2hlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fUHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1JlZmxlY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19TZXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19TdGFjay5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1VpbnQ4QXJyYXkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19XZWFrTWFwLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYWRkTWFwRW50cnkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19hZGRTZXRFbnRyeS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FwcGx5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlFYWNoLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlQdXNoLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlSZWR1Y2UuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19hc3NpZ25NZXJnZVZhbHVlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNzaWduVmFsdWUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY0RlbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Fzc29jR2V0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNzb2NIYXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY0luZGV4T2YuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY1NldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VBc3NpZ24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlQ2xvbmUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlQ3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUZsYXR0ZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldEFsbEtleXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSGFzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUtleXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlS2V5c0luLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZU1lcmdlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZU1lcmdlRGVlcC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VUaW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nhc3RQYXRoLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2hlY2tHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19jbG9uZUFycmF5QnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVCdWZmZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19jbG9uZURhdGFWaWV3LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVNYXAuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19jbG9uZVJlZ0V4cC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nsb25lU2V0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVTeW1ib2wuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19jbG9uZVR5cGVkQXJyYXkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3B5QXJyYXkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3B5T2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fY29weVN5bWJvbHMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19jcmVhdGVBc3NpZ25lci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldEFsbEtleXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRMZW5ndGguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXROYXRpdmUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRQcm90b3R5cGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRTeW1ib2xzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaERlbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hHZXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoSGFzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaFNldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2luZGV4S2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2luaXRDbG9uZUFycmF5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faW5pdENsb25lQnlUYWcuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19pbml0Q2xvbmVPYmplY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0ZsYXR0ZW5hYmxlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNIb3N0T2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzSXRlcmF0ZWVDYWxsLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNLZXkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0tleWFibGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19pc1Byb3RvdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2l0ZXJhdG9yVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENsZWFyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwRGVsZXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwR2V0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwSGFzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwU2V0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX25hdGl2ZUNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RhY2tDbGVhci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrRGVsZXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RhY2tHZXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL19zdGFja0hhcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrU2V0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9QYXRoLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvY29uc3RhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2VxLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9mbGF0dGVuRGVlcC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvZ2V0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FyZ3VtZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheUxpa2UuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0Jvb2xlYW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0Z1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0xlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNOYXRpdmUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2lzTnVtYmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTeW1ib2wuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvbG9kYXNoL2lzVHlwZWRBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gva2V5c0luLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9tZW1vaXplLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC9tZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvcmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9JbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL2xvZGFzaC90b051bWJlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9QbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9TdHJpbmcuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvcmVhY3QtbG9vay1jb3JlL2xpYi9jb3JlL2VuaGFuY2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL3JlYWN0LWxvb2stY29yZS9saWIvY29yZS9yZXNvbHZlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL3JlYWN0LWxvb2stY29yZS9saWIvbWl4aW5zL2NvbmRpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL21peGlucy9jb250YWlucy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL21peGlucy9leHRlbmQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvcmVhY3QtbG9vay1jb3JlL2xpYi9wbHVnaW5zL21peGluLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL3JlYWN0LWxvb2stY29yZS9saWIvcGx1Z2lucy9zdGF0ZWZ1bFNlbGVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL3JlYWN0LWxvb2stY29yZS9saWIvcGx1Z2lucy9zdGF0ZWZ1bFZhbHVlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL3JlYWN0LWxvb2stY29yZS9saWIvcGx1Z2lucy9zdHlsZUxvZ2dlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL3V0aWxzL2NvcHlQcm9wZXJ0aWVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL3JlYWN0LWxvb2stY29yZS9saWIvdXRpbHMvZ2V0Q2hpbGRUeXBlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWxvb2svbm9kZV9tb2R1bGVzL3JlYWN0LWxvb2stY29yZS9saWIvdXRpbHMvZ2V0UHNldWRvRXhwcmVzc2lvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1sb29rL25vZGVfbW9kdWxlcy9yZWFjdC1sb29rLWNvcmUvbGliL3V0aWxzL3NvcnRPYmplY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtbG9vay9ub2RlX21vZHVsZXMvcmVhY3QtbG9vay1jb3JlL2xpYi91dGlscy9zcGxpdENvbmRpdGlvbi5qcyIsIi9ob21lL3NvaGFhbS9kZXZlbC9yZWFjdC1pbWFnZXMtZm9yay9zcmMvRmFkZS5qcyIsIi9ob21lL3NvaGFhbS9kZXZlbC9yZWFjdC1pbWFnZXMtZm9yay9zcmMvSWNvbi5qcyIsIi9ob21lL3NvaGFhbS9kZXZlbC9yZWFjdC1pbWFnZXMtZm9yay9zcmMvUG9ydGFsLmpzIiwiL2hvbWUvc29oYWFtL2RldmVsL3JlYWN0LWltYWdlcy1mb3JrL3NyYy9pY29ucy9hcnJvd0xlZnQuanMiLCIvaG9tZS9zb2hhYW0vZGV2ZWwvcmVhY3QtaW1hZ2VzLWZvcmsvc3JjL2ljb25zL2Fycm93UmlnaHQuanMiLCIvaG9tZS9zb2hhYW0vZGV2ZWwvcmVhY3QtaW1hZ2VzLWZvcmsvc3JjL2ljb25zL2Nsb3NlLmpzIiwiL2hvbWUvc29oYWFtL2RldmVsL3JlYWN0LWltYWdlcy1mb3JrL3NyYy9pY29ucy9pbmRleC5qcyIsIi9ob21lL3NvaGFhbS9kZXZlbC9yZWFjdC1pbWFnZXMtZm9yay9zcmMvc3R5bGVzL2RlZmF1bHQuanMiLCIvaG9tZS9zb2hhYW0vZGV2ZWwvcmVhY3QtaW1hZ2VzLWZvcmsvc3JjL3V0aWxzLmpzIiwiL2hvbWUvc29oYWFtL2RldmVsL3JlYWN0LWltYWdlcy1mb3JrL3NyYy9MaWdodGJveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25TQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQzdENEMsT0FBTzs7Ozs7O0lBRzdDLElBQUk7V0FBSixJQUFJOztBQUNHLFVBRFAsSUFBSSxHQUNNO3dCQURWLElBQUk7O0FBRVIsNkJBRkksSUFBSSw2Q0FFQTtBQUNSLE1BQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakQsTUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNqRDs7Y0FMSSxJQUFJOztTQU9XLDZCQUFDLFFBQVEsRUFBRTtBQUM5QixhQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQ3hCOzs7U0FFa0IsOEJBQUc7QUFDckIsT0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0dBQ3BCOzs7U0FFa0IsNEJBQUMsUUFBUSxFQUFFO0FBQzdCLGFBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7R0FDeEI7OztTQUVpQiw2QkFBRztBQUNwQixPQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7R0FDcEI7OztTQUVrQiw0QkFBQyxRQUFRLEVBQUU7QUFDN0IsT0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3BCLGFBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUMxQzs7O1NBRWlCLDZCQUFHLEVBQ3BCOzs7U0FFWSx3QkFBRztBQUNmLE9BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzdCLEtBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztHQUNyQjs7O1NBRVksd0JBQUc7QUFDZixPQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM3QixLQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7R0FDckI7OztTQUVNLGtCQUFHO0FBQ1QsT0FBTSxLQUFLLEdBQUcsU0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVDLE9BQU0sS0FBSyxHQUFHO0FBQ2IsV0FBTyxFQUFFLENBQUM7QUFDVixvQkFBZ0IsZUFBYSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsZ0JBQWE7QUFDN0QsZ0JBQVksZUFBYSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsZ0JBQWE7QUFDekQsY0FBVSxlQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxnQkFBYTtJQUN2RCxDQUFDO0FBQ0YsUUFBSyxDQUFDLEtBQUssR0FBRyxTQUFjLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JELFVBQU8sbUJBQU0sYUFBYSxDQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDcEIsS0FBSyxFQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNuQixDQUFDO0dBQ0Y7OztRQXZESSxJQUFJOzs7QUEwRFYsSUFBSSxDQUFDLFNBQVMsR0FBRztBQUNoQixTQUFRLEVBQUUsaUJBQVUsR0FBRztBQUN2QixVQUFTLEVBQUUsaUJBQVUsR0FBRztBQUN4QixTQUFRLEVBQUUsaUJBQVUsTUFBTTtBQUMxQixNQUFLLEVBQUUsaUJBQVUsTUFBTTtDQUN2QixDQUFDOztBQUVGLElBQUksQ0FBQyxZQUFZLEdBQUc7QUFDbkIsVUFBUyxFQUFFLEtBQUs7QUFDaEIsU0FBUSxFQUFFLEdBQUc7QUFDYixJQUFHLEVBQUUsU0FBUztDQUNkLENBQUM7O3FCQUVhLElBQUk7Ozs7Ozs7Ozs7Ozs7O3FCQzFFeUIsT0FBTzs7OztxQkFDakMsU0FBUzs7OztBQUUzQixJQUFNLElBQUksR0FBRyxTQUFQLElBQUksQ0FBSSxLQUFLO1FBQ2xCO0FBQ0MseUJBQXVCLEVBQUUsRUFBRSxNQUFNLEVBQUUsbUJBQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEFBQUM7SUFDbkQsS0FBSyxFQUNSO0NBQ0YsQ0FBQzs7QUFFRixJQUFJLENBQUMsU0FBUyxHQUFHO0FBQ2hCLEtBQUksRUFBRSxpQkFBVSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksb0JBQU8sQ0FBQztDQUN6QyxDQUFDOztxQkFFYSxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ2R5QixPQUFPOzs7OzBDQUM1QiwrQkFBK0I7Ozs7d0JBQy9CLFdBQVc7O0lBRWIsTUFBTTtXQUFOLE1BQU07O0FBQ2QsVUFEUSxNQUFNLEdBQ1g7d0JBREssTUFBTTs7QUFFekIsNkJBRm1CLE1BQU0sNkNBRWpCO0FBQ1IsTUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7RUFDMUI7O2NBSm1CLE1BQU07O1NBS1IsNkJBQUc7QUFDcEIsT0FBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxXQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixPQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztBQUN2QixPQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztHQUMxQjs7O1NBRWtCLDhCQUFHO0FBQ3JCLHlCQUNDOztpQkFBZ0IsSUFBSSxDQUFDLEtBQUssSUFBRSxTQUFTLEVBQUMsS0FBSztJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtJQUFjLEVBQzdFLElBQUksQ0FBQyxhQUFhLENBQ25CLENBQUM7R0FDRjs7O1NBRW9CLGdDQUFHO0FBQ3ZCLFdBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztHQUM5Qzs7O1NBRU0sa0JBQUc7QUFDVCxVQUFPLElBQUksQ0FBQztHQUNaOzs7UUF6Qm1CLE1BQU07OztxQkFBTixNQUFNOztBQTRCM0IsTUFBTSxDQUFDLFNBQVMsR0FBRztBQUNsQixTQUFRLEVBQUUsaUJBQVUsR0FBRztDQUN2QixDQUFDOzs7Ozs7QUNsQ0YsTUFBTSxDQUFDLE9BQU8sR0FDYixzTUFBc00sR0FDbk0sc1FBQXNRLEdBQ3ZRLFFBQVEsQUFDVixDQUFDOzs7OztBQ0pGLE1BQU0sQ0FBQyxPQUFPLEdBQ2Isc01BQXNNLEdBQ25NLHFRQUFxUSxHQUN0USxRQUFRLEFBQ1YsQ0FBQzs7Ozs7QUNKRixNQUFNLENBQUMsT0FBTyxHQUNiLGlQQUFpUCxHQUM5Tyx3ZUFBd2UsR0FDemUsUUFBUSxBQUNWLENBQUM7Ozs7O0FDSkYsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNoQixVQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUNqQyxXQUFVLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQztBQUNuQyxNQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQztDQUN6QixDQUFDOzs7Ozs7Ozs7eUJDSnlCLFlBQVk7O0FBRXZDLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFNLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDekIsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFbkIsSUFBTSxNQUFNLEdBQUcsc0JBQVcsTUFBTSxDQUFDOztBQUVoQyxVQUFTLEVBQUU7QUFDVixpQkFBZSxFQUFFLGlCQUFpQjtBQUNsQyxXQUFTLEVBQUUsWUFBWTtBQUN2QixRQUFNLEVBQUUsTUFBTTtBQUNkLE1BQUksRUFBRSxDQUFDO0FBQ1AsU0FBTyxFQUFFLFFBQVE7QUFDakIsVUFBUSxFQUFFLE9BQU87QUFDakIsV0FBUyxFQUFFLFFBQVE7QUFDbkIsS0FBRyxFQUFFLENBQUM7QUFDTixPQUFLLEVBQUUsTUFBTTtBQUNiLFFBQU0sRUFBRSxJQUFJO0VBQ1o7QUFDRCxRQUFPLEVBQUU7QUFDUixTQUFPLEVBQUUsY0FBYztBQUN2QixRQUFNLEVBQUUsUUFBUTtBQUNoQixVQUFRLEVBQUUsTUFBTTtBQUNoQixVQUFRLEVBQUUsVUFBVTtBQUNwQixlQUFhLEVBQUUsUUFBUTtFQUN2QjtBQUNELGtCQUFpQixFQUFFO0FBQ2xCLFNBQU8sRUFBRSxjQUFjO0FBQ3ZCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsWUFBVSxFQUFFLENBQUM7QUFDYixlQUFhLEVBQUUsUUFBUTtFQUN2Qjs7O0FBR0QsTUFBSyxFQUFFO0FBQ04sV0FBUyxFQUFFLFlBQVk7QUFDdkIsU0FBTyxFQUFFLE9BQU87QUFDaEIsWUFBVSxFQUFFLENBQUM7QUFDYixVQUFRLEVBQUUsTUFBTTtBQUNoQixRQUFNLEVBQUUsUUFBUTtBQUNoQixlQUFhLEVBQUUsRUFBRTtBQUNqQixZQUFVLEVBQUUsRUFBRTtBQUNkLFFBQU0sRUFBRSxNQUFNO0FBQ2QsT0FBSyxFQUFFLE1BQU07OztBQUdiLG9CQUFrQixFQUFFLE1BQU07QUFDMUIsWUFBVSxFQUFFLE1BQU07O0VBRWxCO0FBQ0QsT0FBTSxFQUFFO0FBQ1AsaUJBQWUsRUFBRSxpaElBQWloSTtBQUNsaUksa0JBQWdCLEVBQUUsV0FBVztBQUM3QixvQkFBa0IsRUFBRSxlQUFlO0FBQ25DLFlBQVUsRUFBRSxDQUFDO0FBQ2IsV0FBUyxFQUFFLEdBQUc7QUFDZCxVQUFRLEVBQUUsR0FBRztBQUNiLFFBQU0sRUFBRSxDQUFDO0FBQ1QsV0FBUyxFQUFFLFFBQVE7RUFDbkI7QUFDRCxhQUFZLEVBQUU7QUFDYixRQUFNLEVBQUUsVUFBVTtBQUNsQixXQUFTLEVBQUUsNkJBQTZCO0FBQ3hDLFNBQU8sRUFBRSxPQUFPO0FBQ2hCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsTUFBSSxFQUFFLENBQUM7QUFDUCxVQUFRLEVBQUUsVUFBVTtBQUNwQixPQUFLLEVBQUUsQ0FBQztBQUNSLEtBQUcsRUFBRSxPQUFPO0FBQ1osT0FBSyxFQUFFLE1BQU07QUFDYixRQUFNLEVBQUUsQ0FBQyxDQUFDO0VBQ1Y7QUFDRCxPQUFNLEVBQUU7QUFDUCxPQUFLLEVBQUUsT0FBTztBQUNkLFlBQVUsRUFBRSxHQUFHO0FBQ2YsUUFBTSxFQUFFLFVBQVU7QUFDbEIsV0FBUyxFQUFFLENBQUMsVUFBVTtBQUN0QixZQUFVLEVBQUUsQ0FBQztBQUNiLFVBQVEsRUFBRSxVQUFVO0FBQ3BCLFdBQVMsRUFBRSxNQUFNO0FBQ2pCLEtBQUcsRUFBRSxNQUFNO0FBQ1gsTUFBSSxFQUFFLENBQUM7QUFDUCxPQUFLLEVBQUUsTUFBTTtBQUNiLFFBQU0sRUFBRSxNQUFNO0VBQ2Q7QUFDRCxZQUFXLEVBQUU7QUFDWixPQUFLLEVBQUUsT0FBTztBQUNkLFVBQVEsRUFBRSxPQUFPO0FBQ2pCLFNBQU8sRUFBRSxJQUFJO0VBQ2I7QUFDRCxjQUFhLEVBQUU7QUFDZCxjQUFZLEVBQUUsRUFBRTtFQUNoQjs7O0FBR0QsTUFBSyxFQUFFO0FBQ04sWUFBVSxFQUFFLE1BQU07QUFDbEIsUUFBTSxFQUFFLE1BQU07QUFDZCxRQUFNLEVBQUUsU0FBUztBQUNqQixTQUFPLEVBQUUsTUFBTTtBQUNmLFdBQVMsRUFBRSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLFVBQVEsRUFBRSxFQUFFO0FBQ1osU0FBTyxFQUFFLEVBQUU7QUFDWCxVQUFRLEVBQUUsVUFBVTtBQUNwQixLQUFHLEVBQUUsS0FBSztBQUNWLFFBQU0sRUFBRSxZQUFZO0FBQ3BCLE9BQUssRUFBRSxLQUFLO0FBQ1osUUFBTSxFQUFFLElBQUk7OztBQUdaLG9CQUFrQixFQUFFLE1BQU07QUFDMUIsa0JBQWdCLEVBQUUsTUFBTTtBQUN4QixlQUFhLEVBQUUsTUFBTTtBQUNyQixjQUFZLEVBQUUsTUFBTTtBQUNwQixZQUFVLEVBQUUsTUFBTTtFQUNsQjtBQUNELFVBQVMsRUFBRTtBQUNWLE9BQUssRUFBRSxDQUFDO0VBQ1I7QUFDRCxVQUFTLEVBQUU7QUFDVixNQUFJLEVBQUUsQ0FBQztFQUNQO0FBQ0QsU0FBUSxFQUFFO0FBQ1QsUUFBTSxFQUFFLE9BQU87QUFDZixNQUFJLEVBQUUsQ0FBQztBQUNQLFVBQVEsRUFBRSxVQUFVO0FBQ3BCLFdBQVMsRUFBRSxPQUFPO0FBQ2xCLEtBQUcsRUFBRSxDQUFDO0FBQ04sT0FBSyxFQUFFLE1BQU07RUFDYjtBQUNELFlBQVcsRUFBRTtBQUNaLFlBQVUsRUFBRSxNQUFNO0FBQ2xCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsUUFBTSxFQUFFLFNBQVM7QUFDakIsUUFBTSxFQUFFLFVBQVUsR0FBRyxFQUFFO0FBQ3ZCLFNBQU8sRUFBRSxNQUFNO0FBQ2YsU0FBTyxFQUFFLEVBQUU7QUFDWCxVQUFRLEVBQUUsVUFBVTtBQUNwQixPQUFLLEVBQUUsQ0FBQyxFQUFFO0FBQ1YsS0FBRyxFQUFFLENBQUM7QUFDTixPQUFLLEVBQUUsVUFBVSxHQUFHLEVBQUU7RUFDdEI7Q0FDRCxDQUFDLENBQUM7O3FCQUVZLE1BQU07Ozs7Ozs7OztBQ2xKckIsSUFBTSxTQUFTLEdBQUcsQ0FBQyxFQUNsQixPQUFPLE1BQU0sS0FBSyxXQUFXLElBQzFCLE1BQU0sQ0FBQyxRQUFRLElBQ2YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUEsQUFDaEMsQ0FBQzs7cUJBRWE7QUFDZCxVQUFTLEVBQVQsU0FBUztDQUNUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ1IyQyxPQUFPOzs7Ozs7Ozs7Ozs4QkFPN0IsaUJBQWlCOzs7Ozs7Ozs7Ozt5QkFTTixZQUFZOzs7O3FCQUUzQixTQUFTOzs7O29CQUNWLFFBQVE7Ozs7b0JBQ1IsUUFBUTs7OztzQkFDTixVQUFVOzs7OzZCQUVWLGtCQUFrQjs7OztBQUVyQyxJQUFNLENBQUMsR0FBRyxzQkFBVyxhQUFhLENBQUM7O0lBRTdCLFFBQVE7V0FBUixRQUFROztjQUFSLFFBQVE7O1NBQ0EsZUFBQyxXQUFXLEVBQUU7QUFDMUIsT0FBTSxTQUFTLEdBQUcsU0FBYyxFQUFFLDZCQUFTLENBQUM7QUFDNUMsUUFBSyxJQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUU7QUFDNUIsUUFBSSxHQUFHLElBQUksV0FBVyxFQUFFO0FBQ3ZCLGNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFjLEVBQUUsRUFBRSwyQkFBTyxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNsRTtJQUNEO0FBQ0QsVUFBTyxTQUFTLENBQUM7R0FDakI7OztBQUVVLFVBWE4sUUFBUSxHQVdDO3dCQVhULFFBQVE7O0FBWVosNkJBWkksUUFBUSw2Q0FZSjs7QUFFUixNQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLE1BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsTUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxNQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6RCxNQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvRCxNQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVqRCxNQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztFQUNoQjs7Y0F0QkksUUFBUTs7U0F3QlksbUNBQUMsU0FBUyxFQUFFO0FBQ3BDLE9BQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsbUJBQW1CLEVBQUU7QUFDdEQsUUFBSSxtQkFBTSxTQUFTLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNsRixRQUFJLG1CQUFNLFNBQVMsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxRSxRQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDcEIsTUFBTTtBQUNOLFFBQUksbUJBQU0sU0FBUyxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDckYsUUFBSSxtQkFBTSxTQUFTLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0U7O0FBRUQsT0FBSSxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ3JCLFFBQUksbUJBQU0sU0FBUyxFQUFFO0FBQ3BCLGFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDeEM7SUFDRCxNQUFNO0FBQ04sUUFBSSxtQkFBTSxTQUFTLEVBQUU7QUFDcEIsYUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUNwQztJQUNEO0dBQ0Q7OztTQUVJLGVBQUMsQ0FBQyxFQUFFO0FBQ1IsT0FBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyx3QkFBd0IsRUFBRSxPQUFPOztBQUVyRCxPQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7QUFDekQsUUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQjtHQUNEOzs7U0FFTyxrQkFBQyxLQUFLLEVBQUU7QUFDZixPQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEFBQUMsRUFBRSxPQUFPO0FBQ3ZFLE9BQUksS0FBSyxFQUFFO0FBQ1YsU0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLFNBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN4QjtBQUNELE9BQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7R0FDekI7OztTQUVPLGtCQUFDLEtBQUssRUFBRTtBQUNmLE9BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFLE9BQU87QUFDMUMsT0FBSSxLQUFLLEVBQUU7QUFDVixTQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsU0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3hCO0FBQ0QsT0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztHQUN6Qjs7O1NBRWUsMEJBQUMsQ0FBQyxFQUFFO0FBQ25CLE9BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLE9BQU87O0FBRTdDLE9BQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDakI7OztTQUVjLHlCQUFDLENBQUMsRUFBRSxLQUFLLEVBQUU7O0dBRXpCOzs7U0FFa0IsNkJBQUMsS0FBSyxFQUFFO0FBQzFCLE9BQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7QUFDekIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixXQUFPLElBQUksQ0FBQztJQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtBQUNoQyxRQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JCLFdBQU8sSUFBSSxDQUFDO0lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO0FBQ2hDLFFBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDckIsV0FBTyxJQUFJLENBQUM7SUFDWjtBQUNELFVBQU8sS0FBSyxDQUFDO0dBQ2I7OztTQUVXLHdCQUFHO0FBQ2QsT0FBSSxDQUFDLG1CQUFNLFNBQVMsRUFBRSxPQUFPO0FBQzdCLE9BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixnQkFBWSxFQUFFLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQztJQUNyQyxDQUFDLENBQUM7R0FDSDs7O1NBRWMsMkJBQUc7QUFDakIsT0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxBQUFDLEVBQUUsT0FBTyxJQUFJLENBQUM7O0FBRTVFLFVBQ0M7O01BQVEsS0FBSyxFQUFDLHdCQUF3QjtBQUNyQyxTQUFJLEVBQUMsUUFBUTtBQUNiLGNBQVMsRUFBRSxDQUFDLENBQUMsMkJBQU8sS0FBSyxFQUFFLDJCQUFPLFNBQVMsQ0FBQyxBQUFDO0FBQzdDLFlBQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxBQUFDO0FBQ3ZCLGVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxBQUFDOztJQUUxQixzREFBTSxJQUFJLEVBQUMsWUFBWSxHQUFHO0lBQ2xCLENBQ1I7R0FDRjs7O1NBRWMsMkJBQUc7QUFDakIsT0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUM7OztBQUcvQyxVQUNDOztNQUFRLEtBQUssRUFBQywyQkFBMkI7QUFDeEMsU0FBSSxFQUFDLFFBQVE7QUFDYixjQUFTLEVBQUUsQ0FBQyxDQUFDLDJCQUFPLEtBQUssRUFBRSwyQkFBTyxTQUFTLENBQUMsQUFBQztBQUM3QyxZQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQUFBQztBQUN2QixlQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQUFBQzs7SUFFMUIsc0RBQU0sSUFBSSxFQUFDLFdBQVcsR0FBRztJQUNqQixDQUNSO0dBQ0Y7OztTQUVnQiw2QkFBRztBQUNuQixPQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsT0FBTyxJQUFJLENBQUM7OztBQUc3QyxVQUNDOztNQUFLLFNBQVMsRUFBRSwyQkFBTyxRQUFRLEFBQUM7SUFDL0I7O09BQVEsS0FBSyxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUUsMkJBQU8sV0FBVyxBQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxBQUFDO0tBQ3RGLHNEQUFNLElBQUksRUFBQyxPQUFPLEdBQUc7S0FDYjtJQUNKLENBQ0w7R0FDRjs7O1NBRVksd0JBQUc7QUFDZixPQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUM7OztBQUdwQyxVQUNDOztNQUFNLEVBQUUsRUFBQyx3QkFBd0I7QUFDaEMsUUFBRyxFQUFDLFFBQVE7QUFDWixhQUFRLEVBQUUsR0FBRyxBQUFDO0FBQ2QsY0FBUyxFQUFFLDJCQUFPLFNBQVMsQUFBQztBQUM1QixZQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQUFBQztBQUNwQixlQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQUFBQzs7SUFFdkIsMkNBQU0sU0FBUyxFQUFFLDJCQUFPLGlCQUFpQixBQUFDLEdBQUc7SUFDN0M7O09BQUssU0FBUyxFQUFFLDJCQUFPLE9BQU8sQUFBQztLQUM3QixJQUFJLENBQUMsaUJBQWlCLEVBQUU7S0FDeEIsSUFBSSxDQUFDLFlBQVksRUFBRTtLQUNmO0lBQ0wsSUFBSSxDQUFDLGVBQWUsRUFBRTtJQUN0QixJQUFJLENBQUMsZUFBZSxFQUFFO0lBQ2pCLENBQ047R0FDRjs7O1NBQ1ksc0JBQUMsT0FBTyxFQUFFO2dCQUMyQixJQUFJLENBQUMsS0FBSztPQUFuRCxZQUFZLFVBQVosWUFBWTtPQUFFLE1BQU0sVUFBTixNQUFNO09BQUUsY0FBYyxVQUFkLGNBQWM7Ozs7QUFHNUMsT0FBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLElBQUksQ0FBQzs7QUFFN0MsT0FBTSxVQUFVLEdBQUcsY0FBYyxHQUM5Qjs7TUFBSyxTQUFTLEVBQUUsMkJBQU8sV0FBVyxBQUFDO0lBQUUsWUFBWSxHQUFHLENBQUM7O0lBQU0sTUFBTSxDQUFDLE1BQU07SUFBTyxHQUMvRSxJQUFJLENBQUM7QUFDUixPQUFNLFVBQVUsR0FBRyxPQUFPLEdBQ3ZCOztNQUFZLFNBQVMsRUFBRSwyQkFBTyxhQUFhLEFBQUM7SUFBRSxPQUFPO0lBQWMsR0FDbkUsSUFBSSxDQUFDOztBQUVSLFVBQ0M7O01BQUssU0FBUyxFQUFFLDJCQUFPLE1BQU0sQUFBQztJQUM1QixVQUFVO0lBQ1YsVUFBVTtJQUNOLENBQ0w7R0FDRjs7O1NBQ1csd0JBQUc7OztpQkFDbUIsSUFBSSxDQUFDLEtBQUs7T0FBbkMsTUFBTSxXQUFOLE1BQU07T0FBRSxZQUFZLFdBQVosWUFBWTs7O09BRXBCLFlBQVksR0FBSyxJQUFJLENBQUMsS0FBSyxDQUEzQixZQUFZOztBQUVwQixPQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLElBQUksQ0FBQzs7QUFFM0MsT0FBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUVuQyxPQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsT0FBSSxLQUFLLFlBQUEsQ0FBQzs7QUFFVixPQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDakIsVUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDN0IsU0FBSyxHQUFHLE9BQU8sQ0FBQztJQUNoQjs7QUFFRCxVQUNDOztNQUFRLEdBQUcsYUFBVyxZQUFZLEFBQUc7QUFDcEMsY0FBUyxFQUFFLDJCQUFPLE1BQU0sQUFBQztBQUN6QixVQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQUFBQzs7SUFFdEM7O09BQVcsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLEFBQUMsRUFBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQUFBQztLQUNwRSwwQ0FBSyxTQUFTLEVBQUUsMkJBQU8sS0FBSyxBQUFDO0FBQzVCLGFBQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUM7QUFDL0IsWUFBTSxFQUFFLFVBQUEsQ0FBQztjQUFJLE1BQUssZUFBZSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUM7T0FBQSxBQUFDO0FBQ25ELFdBQUssRUFBRSxLQUFLLEFBQUM7QUFDYixTQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsQUFBQztBQUNmLFlBQU0sRUFBRSxNQUFNLEFBQUM7QUFDZixXQUFLLEVBQUU7QUFDTixhQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLEdBQUcsTUFBTTtBQUM1RCxnQkFBUyxFQUFFLFlBQVk7T0FDdkIsQUFBQztPQUNEO0tBQ1M7SUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDeEMsQ0FDUjtHQUNGOzs7U0FDSyxrQkFBRztBQUNSLFVBQ0M7OztJQUNFLElBQUksQ0FBQyxZQUFZLEVBQUU7SUFDWixDQUNSO0dBQ0Y7OztRQXpPSSxRQUFROzs7QUE0T2QsUUFBUSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7O0FBRWxDLFFBQVEsQ0FBQyxTQUFTLEdBQUc7QUFDcEIsb0JBQW1CLEVBQUUsaUJBQVUsSUFBSTtBQUNuQyxhQUFZLEVBQUUsaUJBQVUsTUFBTTtBQUM5QixvQkFBbUIsRUFBRSxpQkFBVSxJQUFJO0FBQ25DLE9BQU0sRUFBRSxpQkFBVSxPQUFPLENBQ3hCLGlCQUFVLEtBQUssQ0FBQztBQUNmLEtBQUcsRUFBRSxpQkFBVSxNQUFNLENBQUMsVUFBVTtBQUNoQyxRQUFNLEVBQUUsaUJBQVUsS0FBSztBQUN2QixTQUFPLEVBQUUsaUJBQVUsTUFBTTtFQUN6QixDQUFDLENBQ0YsQ0FBQyxVQUFVO0FBQ1osT0FBTSxFQUFFLGlCQUFVLElBQUk7QUFDdEIsWUFBVyxFQUFFLGlCQUFVLElBQUksQ0FBQyxVQUFVO0FBQ3RDLFlBQVcsRUFBRSxpQkFBVSxJQUFJLENBQUMsVUFBVTtBQUN0QyxxQkFBb0IsRUFBRSxpQkFBVSxJQUFJO0FBQ3BDLFFBQU8sRUFBRSxpQkFBVSxJQUFJLENBQUMsVUFBVTtBQUNsQyxNQUFLLEVBQUUsaUJBQVUsTUFBTTtBQUN2QixnQkFBZSxFQUFFLGlCQUFVLElBQUk7QUFDL0IsZUFBYyxFQUFFLGlCQUFVLElBQUk7QUFDOUIsTUFBSyxFQUFFLGlCQUFVLE1BQU07Q0FDdkIsQ0FBQzs7QUFFRixRQUFRLENBQUMsWUFBWSxHQUFHO0FBQ3ZCLG9CQUFtQixFQUFFLElBQUk7QUFDekIsYUFBWSxFQUFFLENBQUM7QUFDZixxQkFBb0IsRUFBRSxJQUFJO0FBQzFCLGdCQUFlLEVBQUUsSUFBSTtBQUNyQixlQUFjLEVBQUUsSUFBSTtBQUNwQixNQUFLLEVBQUUsR0FBRztDQUNWLENBQUM7O3FCQUVhLDRCQUFLLFFBQVEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9tZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC9tZXJnZScpO1xuXG52YXIgX21lcmdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lcmdlKTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfUHJlZml4ZXIgPSByZXF1aXJlKCcuL1ByZWZpeGVyJyk7XG5cbnZhciBfUHJlZml4ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJlZml4ZXIpO1xuXG52YXIgX1N0eWxlQ29udGFpbmVyID0gcmVxdWlyZSgnLi9TdHlsZUNvbnRhaW5lcicpO1xuXG52YXIgX1N0eWxlQ29udGFpbmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0eWxlQ29udGFpbmVyKTtcblxudmFyIF9yZXNvbHZlciA9IHJlcXVpcmUoJy4uL2NvcmUvcmVzb2x2ZXInKTtcblxudmFyIF9yZXNvbHZlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZXNvbHZlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIGNvbnRleHRUeXBlID0geyBfbG9va0NvbmZpZzogX3JlYWN0LlByb3BUeXBlcy5vYmplY3QgfTtcbi8qKlxuICogUm9vdCB3cmFwcGVyIHRoYXQgd3JhcHMgeW91ciB3aG9sZSBhcHBsaWNhdGlvblxuICogSXQgcmVuZGVycyB0aGUgZ2xvYmFsIENTUyBzdHlsZXMgYW5kIHBhc3NlcyB0aGUgY29uZmlnIGRvd25cbiAqL1xuXG52YXIgTG9va1Jvb3QgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoTG9va1Jvb3QsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIExvb2tSb290KHByb3BzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExvb2tSb290KTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihMb29rUm9vdCkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG5cbiAgICBfdGhpcy5jb25maWcgPSAoMCwgX21lcmdlMi5kZWZhdWx0KSh7fSwgcHJvcHMuY29uZmlnLCB7XG4gICAgICBfcmVzb2x2ZVN0eWxlczogX3Jlc29sdmVyMi5kZWZhdWx0XG4gICAgfSk7XG5cbiAgICB2YXIgcHJlZml4ZXIgPSBfdGhpcy5jb25maWcucHJlZml4ZXI7XG5cbiAgICBpZiAoIXByZWZpeGVyIHx8ICFwcmVmaXhlci5faXNMb29rUHJlZml4ZXIpIHtcbiAgICAgIF90aGlzLmNvbmZpZy5wcmVmaXhlciA9IG5ldyBfUHJlZml4ZXIyLmRlZmF1bHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKExvb2tSb290LCBbe1xuICAgIGtleTogJ2dldENoaWxkQ29udGV4dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgIHJldHVybiB7IF9sb29rQ29uZmlnOiB0aGlzLmNvbmZpZyB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgX2NvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgdmFyIHN0eWxlRWxlbWVudElkID0gX2NvbmZpZy5zdHlsZUVsZW1lbnRJZDtcbiAgICAgIHZhciBwcmVmaXhlciA9IF9jb25maWcucHJlZml4ZXI7XG5cbiAgICAgIG5ldyBTdHlsZUNvbXBvbmVudChzdHlsZUVsZW1lbnRJZCwgcHJlZml4ZXIpLnJlbmRlcigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBMb29rUm9vdDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbi8qKlxuICogU3R5bGVDb21wb25lbnQgaXMgdXNlZCB0byByZW5kZXIgc3RhdGljIENTUyBtYXJrdXBcbiAqIGludG8gYSA8c3R5bGU+IGVsZW1lbnQgc28gQ1NTIHN0eWxlcyBhcmUgcmVuZGVyZWQgY29ycmVjdGx5XG4gKiBpdCBsaXN0ZW5zIGZvciBjaGFuZ2VzIG9mIHRoZSBnbG9iYWwgc3R5bGUgY29udGFpbmVyXG4gKi9cblxuXG5Mb29rUm9vdC5jaGlsZENvbnRleHRUeXBlcyA9IGNvbnRleHRUeXBlO1xuTG9va1Jvb3QuY29udGV4dFR5cGVzID0gY29udGV4dFR5cGU7XG5leHBvcnRzLmRlZmF1bHQgPSBMb29rUm9vdDtcblxudmFyIFN0eWxlQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdHlsZUNvbXBvbmVudChzdHlsZUVsZW1lbnRJZCwgcHJlZml4ZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3R5bGVDb21wb25lbnQpO1xuXG4gICAgdGhpcy5zdHlsZXMgPSBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQucmVuZGVyU3RhdGljU3R5bGVzKHByZWZpeGVyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHRoaXMudXBkYXRlU3R5bGVzID0gdGhpcy51cGRhdGVTdHlsZXMuYmluZCh0aGlzLCBwcmVmaXhlcik7XG5cbiAgICB0aGlzLl9jaGFuZ2VMaXN0ZW5lciA9IF9TdHlsZUNvbnRhaW5lcjIuZGVmYXVsdC5zdWJzY3JpYmUodGhpcy51cGRhdGVTdHlsZXMpO1xuICAgIHRoaXMuZWwgPSB0aGlzLmNyZWF0ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnRJZCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU3R5bGVDb21wb25lbnQsIFt7XG4gICAga2V5OiAnY3JlYXRlU3R5bGVFbGVtZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudElkKSB7XG4gICAgICAvLyBpZiBhIGN1c3RvbSBzdHlsZSBlbGVtZW50IGlzIHByb3ZpZGVkXG4gICAgICAvLyB3ZSBjYW4gdXNlIHRoYXQgb25lIGluc3RlYWQgb2YgY3JlYXRpbmcgb3VyIG93blxuICAgICAgaWYgKHN0eWxlRWxlbWVudElkKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHlsZUVsZW1lbnRJZCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZS5pZCA9ICdfcmVhY3QtbG9vay1zdHlsZXNoZWV0JztcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXG4gICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlU3R5bGVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlU3R5bGVzKHByZWZpeGVyKSB7XG4gICAgICB2YXIgbmV3U3R5bGVzID0gX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LnJlbmRlclN0YXRpY1N0eWxlcyhwcmVmaXhlcik7XG4gICAgICAvLyBvbmx5IHJlbmRlciBpZiBzb21ldGhpbmcgY2hhbmdlZFxuICAgICAgaWYgKHRoaXMuc3R5bGVzICE9PSBuZXdTdHlsZXMpIHtcbiAgICAgICAgdGhpcy5zdHlsZXMgPSBuZXdTdHlsZXM7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdGhpcy5lbC5pbm5lclRleHQgPSB0aGlzLnN0eWxlcztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3R5bGVDb21wb25lbnQ7XG59KCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFByZWZpeGVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQcmVmaXhlcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHJlZml4ZXIpO1xuXG4gICAgdGhpcy5faXNMb29rUHJlZml4ZXIgPSB0cnVlO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFByZWZpeGVyLCBbe1xuICAgIGtleTogJ3ByZWZpeCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZWZpeChzdHlsZXMpIHtcbiAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0S2V5ZnJhbWVzUHJlZml4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0S2V5ZnJhbWVzUHJlZml4KCkge1xuICAgICAgcmV0dXJuIFsnJ107XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFByZWZpeGVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBQcmVmaXhlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9tZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC9tZXJnZScpO1xuXG52YXIgX21lcmdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lcmdlKTtcblxudmFyIF9pc0VtcHR5ID0gcmVxdWlyZSgnbG9kYXNoL2lzRW1wdHknKTtcblxudmFyIF9pc0VtcHR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzRW1wdHkpO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2lubGluZVN0eWxlVHJhbnNmb3JtZXIgPSByZXF1aXJlKCdpbmxpbmUtc3R5bGUtdHJhbnNmb3JtZXInKTtcblxudmFyIF9yZWFjdExvb2tDb3JlID0gcmVxdWlyZSgncmVhY3QtbG9vay1jb3JlJyk7XG5cbnZhciBfUHJlZml4ZXIgPSByZXF1aXJlKCcuL1ByZWZpeGVyJyk7XG5cbnZhciBfUHJlZml4ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJlZml4ZXIpO1xuXG52YXIgX2dlbmVyYXRlSGFzaENvZGUgPSByZXF1aXJlKCcuLi91dGlscy9nZW5lcmF0ZUhhc2hDb2RlJyk7XG5cbnZhciBfZ2VuZXJhdGVIYXNoQ29kZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZW5lcmF0ZUhhc2hDb2RlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHNvcnRPYmplY3QgPSBfcmVhY3RMb29rQ29yZS5VdGlscy5zb3J0T2JqZWN0O1xuXG5cbi8qKlxuICogQSBTdHlsZUNvbnRhaW5lciBjb2xsZWN0cyBjbGFzc05hbWUgbWFwcGluZ3NcbiAqIHRoYXQgY2FuIGJlIHJlbmRlcmVkIGludG8gYSBzdGF0aWMgQ1NTIHN0cmluZ1xuICovXG5cbnZhciBTdHlsZUNvbnRhaW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3R5bGVDb250YWluZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0eWxlQ29udGFpbmVyKTtcblxuICAgIHRoaXMuc2VsZWN0b3JzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMubWVkaWFRdWVyaWVzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMua2V5ZnJhbWVzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZm9udHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5keW5hbWljcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnN0YXRpY3MgPSBuZXcgU2V0KCk7XG5cbiAgICB0aGlzLl9jbGFzc05hbWUgPSAwO1xuICAgIHRoaXMuX2RlZmF1bHRDbGFzc1ByZWZpeCA9ICdjJztcbiAgICB0aGlzLl9saXN0ZW5lciA9IG5ldyBTZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IHNlbGVjdG9yIHdpdGggc3R5bGVzXG4gICAqIGl0IGlzIGFsc28gdXNlZCB0byBhZGQgbWVkaWEgcXVlcmllc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBzZWxlY3RvciB0byByZWZlcmVuY2UgdGhlIHN0eWxlc1xuICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIC0gc3R5bGVzIHRoYXQgZ2V0IGFkZGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nP30gbWVkaWEgLSBtZWRpYSBxdWVyeSBzdHJpbmdcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoU3R5bGVDb250YWluZXIsIFt7XG4gICAga2V5OiAnYWRkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkKHNlbGVjdG9yLCBzdHlsZXMsIG1lZGlhKSB7XG4gICAgICBpZiAobWVkaWEgJiYgbWVkaWEgIT09ICcnKSB7XG4gICAgICAgIHRoaXMuX2FkZE1lZGlhUXVlcnkoc2VsZWN0b3IsIHN0eWxlcywgbWVkaWEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYWRkQW5kRW1pdCh0aGlzLnNlbGVjdG9ycywgc2VsZWN0b3IsIHN0eWxlcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyBrZXlmcmFtZSBhbmltYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYW5pbWF0aW9uIC0gbmFtZWQgdXNlZCB0byByZWZlcmVuY2UgdGhlIGFuaW1hdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBmcmFtZXMgLSBhbmltYXRpb24gZnJhbWVzIHRoYXQgZ2V0IGFkZGVkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2FkZEtleWZyYW1lcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEtleWZyYW1lcyhhbmltYXRpb24sIGZyYW1lcykge1xuICAgICAgdGhpcy5fYWRkQW5kRW1pdCh0aGlzLmtleWZyYW1lcywgYW5pbWF0aW9uLCBmcmFtZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgZ2xvYmFsIGZvbnRGYWNlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGZvbnQgLSBpbmZvcm1hdGlvbiBvbiB0aGUgZm9udFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdhZGRGb250JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkRm9udChmb250KSB7XG4gICAgICB2YXIgZm9udEZhY2UgPSAnQGZvbnQtZmFjZSB7JyArICgwLCBfaW5saW5lU3R5bGVUcmFuc2Zvcm1lci50b0NTUykoZm9udCkgKyAnfSc7XG4gICAgICB0aGlzLl9hZGRBbmRFbWl0KHRoaXMuZm9udHMsIGZvbnRGYWNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgc3RhdGljIGNzcyBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3R5bGVzIC0gYXMgY3NzIHN0cmluZ1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdhZGRTdGF0aWMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRTdGF0aWMoc3R5bGVzKSB7XG4gICAgICB0aGlzLl9hZGRBbmRFbWl0KHRoaXMuc3RhdGljcywgc3R5bGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgc2luZ2xlIHN0cmluZyBjb250YWluaW5nIHRoZSB3aG9sZSBDU1Mgc3R5bGVzXG4gICAgICogQHBhcmFtIHtQcmVmaXhlcn0gcHJlZml4ZXIgLSB2YWxpZCBMb29rIFByZWZpeGVyIHRvIHByZWZpeCBzdHlsZXNcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyU3RhdGljU3R5bGVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyU3RhdGljU3R5bGVzKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIHByZWZpeGVyID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gbmV3IF9QcmVmaXhlcjIuZGVmYXVsdCgpIDogYXJndW1lbnRzWzBdO1xuXG4gICAgICB2YXIgY3NzID0gJyc7XG5cbiAgICAgIHRoaXMuZm9udHMuZm9yRWFjaChmdW5jdGlvbiAoZm9udCkge1xuICAgICAgICByZXR1cm4gY3NzICs9IGZvbnQ7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3RhdGljcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGF0aWNTdHlsZXMpIHtcbiAgICAgICAgcmV0dXJuIGNzcyArPSBzdGF0aWNTdHlsZXM7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2VsZWN0b3JzLmZvckVhY2goZnVuY3Rpb24gKHN0eWxlcywgc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGNzcyArPSBzZWxlY3RvciArIF90aGlzLl9yZW5kZXJDU1MocHJlZml4ZXIsIHN0eWxlcyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMubWVkaWFRdWVyaWVzLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdG9ycywgcXVlcnkpIHtcbiAgICAgICAgY3NzICs9ICdAbWVkaWEnICsgcXVlcnkgKyAneyc7XG4gICAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChzdHlsZXMsIHNlbGVjdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIGNzcyArPSBzZWxlY3RvciArIF90aGlzLl9yZW5kZXJDU1MocHJlZml4ZXIsIHN0eWxlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjc3MgKz0gJ30nO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmtleWZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChmcmFtZXMsIG5hbWUpIHtcbiAgICAgICAgY3NzICs9IHByZWZpeGVyLmdldEtleWZyYW1lc1ByZWZpeCgpLnJlZHVjZShmdW5jdGlvbiAoa2V5ZnJhbWVzLCBwcmVmaXgpIHtcbiAgICAgICAgICBrZXlmcmFtZXMgKz0gJ0AnICsgcHJlZml4ICsgJ2tleWZyYW1lcyAnICsgbmFtZSArIF90aGlzLl9yZW5kZXJDU1MocHJlZml4ZXIsIGZyYW1lcyk7XG4gICAgICAgICAgcmV0dXJuIGtleWZyYW1lcztcbiAgICAgICAgfSwgJycpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjc3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgdW5pcXVlIGhhc2ggY29kZSBmb3IgYSBnaXZlbiBzdHlsZSBvYmplY3RcbiAgICAgKiBpZiB0aGUgc3R5bGUgcHJvcGVydGllcyBhcmUgdGhlIHNhbWUsIHRoZSBzYW1lIGhhc2ggd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIG5vIG1hdHRlciBob3cgdGhleSdyZSBzb3J0ZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIC0gc3R5bGUgb2JqZWN0IHdoaWNoIHdpbGwgZ2V0IHNvcnRlZCBhbmQgaGFzaGVkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dlbmVyYXRlQ2xhc3NOYW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2VuZXJhdGVDbGFzc05hbWUoc3R5bGVzKSB7XG4gICAgICByZXR1cm4gKDAsIF9nZW5lcmF0ZUhhc2hDb2RlMi5kZWZhdWx0KShKU09OLnN0cmluZ2lmeShzb3J0T2JqZWN0KHN0eWxlcykpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgdmFsaWQgdW51c2VkIGNsYXNzTmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nP30gcHJlZml4IC0gcHJlZml4IGFwcGVuZGVkIGJlZm9yZSB0aGUgY2xhc3NOYW1lXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlcXVlc3RDbGFzc05hbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXF1ZXN0Q2xhc3NOYW1lKCkge1xuICAgICAgdmFyIHByZWZpeCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHRDbGFzc1ByZWZpeCA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgcmV0dXJuIHByZWZpeCArICh0aGlzLl9jbGFzc05hbWUrKykudG9TdHJpbmcoMzYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gY2hhbmdlIGxpc3RlbmVyXG4gICAgICogUmV0dXJucyBhbiBpbnN0YW5jZSB3aXRoIGFuIHVuc3Vic2NyaWJlIG1ldGhvZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gZXZlbnQgbGlzdGVuZXJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc3Vic2NyaWJlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdGhpcy5fbGlzdGVuZXIuYWRkKGxpc3RlbmVyKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczIuX2xpc3RlbmVyLmRlbGV0ZShsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIGVtaXR0ZXIgZXhlY3V0ZXMgZXZlcnkgc2luZ2xlIGNoYW5nZSBsaXN0ZW5lclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfZW1pdENoYW5nZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9lbWl0Q2hhbmdlKCkge1xuICAgICAgdGhpcy5fbGlzdGVuZXIuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgdGhhdCBBZGRzIGR5bmFtaWMgc3R5bGVzIHRvIGJlIGFjY2Vzc2VkIGxhdGVyIGdsb2JhbGx5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAtIGNsYXNzTmFtZSByZWZlcmVuY2VcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIC0gc3R5bGVzIHRoYXQgZ2V0IGFkZGVkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19hZGREeW5hbWljJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2FkZER5bmFtaWMoY2xhc3NOYW1lLCBzdHlsZXMpIHtcbiAgICAgIGlmICghKDAsIF9pc0VtcHR5Mi5kZWZhdWx0KShzdHlsZXMpKSB7XG4gICAgICAgIHRoaXMuX2FkZEFuZEVtaXQodGhpcy5keW5hbWljcywgY2xhc3NOYW1lLCBzdHlsZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciB0aGF0IGFkZHMgbWVkaWEgcXVlcmllc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIHNlbGVjdG9yIHRvIHJlZmVyZW5jZSB0aGUgc3R5bGVzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIHN0eWxlcyB0aGF0IGdldCBhZGRlZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nP30gbWVkaWEgLSBtZWRpYSBxdWVyeSBzdHJpbmdcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2FkZE1lZGlhUXVlcnknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfYWRkTWVkaWFRdWVyeShzZWxlY3Rvciwgc3R5bGVzLCBtZWRpYSkge1xuICAgICAgLy8gQWRkIHRoZSBtZWRpYSBpZiBub3QgZXhpc3RpbmcgeWV0XG4gICAgICBpZiAoIXRoaXMubWVkaWFRdWVyaWVzLmhhcyhtZWRpYSkpIHtcbiAgICAgICAgdGhpcy5tZWRpYVF1ZXJpZXMuc2V0KG1lZGlhLCBuZXcgTWFwKCkpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWVkaWFRdWVyeSA9IHRoaXMubWVkaWFRdWVyaWVzLmdldChtZWRpYSk7XG4gICAgICB0aGlzLl9hZGRBbmRFbWl0KG1lZGlhUXVlcnksIHNlbGVjdG9yLCBzdHlsZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFic3RyYWN0IGhlbHBlciB0byBhZGQgbmV3IHN0eWxlcyB0byBhIE1hcC9TZXRcbiAgICAgKiBAcGFyYW0ge01hcHxTZXR9IGdyb3VwIC0gZ3JvdXAgdGhhdCBzdHlsZXMgZ2V0IGFkZGVkIHRvXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gQ1NTIHNlbGVjdG9yIHRoYXRzIHVzZWQgYXMgcmVmZXJlbmNlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIHN0eWxlcyB0aGF0IGdldCBhZGRlZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfYWRkQW5kRW1pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGRBbmRFbWl0KGdyb3VwLCBzZWxlY3Rvciwgc3R5bGVzKSB7XG4gICAgICBpZiAoIWdyb3VwLmhhcyhzZWxlY3RvcikpIHtcbiAgICAgICAgaWYgKHN0eWxlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZ3JvdXAuc2V0KHNlbGVjdG9yLCBzdHlsZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyb3VwLmFkZChzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZW1pdENoYW5nZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19yZW5kZXJDU1MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVuZGVyQ1NTKHByZWZpeGVyLCBzdHlsZXMpIHtcbiAgICAgIHJldHVybiAneycgKyAoMCwgX2lubGluZVN0eWxlVHJhbnNmb3JtZXIudG9DU1MpKHByZWZpeGVyLnByZWZpeCgoMCwgX21lcmdlMi5kZWZhdWx0KSh7fSwgc3R5bGVzKSkpICsgJ30nO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTdHlsZUNvbnRhaW5lcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IFN0eWxlQ29udGFpbmVyKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC9pc0Z1bmN0aW9uJyk7XG5cbnZhciBfaXNGdW5jdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0Z1bmN0aW9uKTtcblxudmFyIF9pc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoL2lzUGxhaW5PYmplY3QnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUGxhaW5PYmplY3QpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9TdHlsZUNvbnRhaW5lciA9IHJlcXVpcmUoJy4vU3R5bGVDb250YWluZXInKTtcblxudmFyIF9TdHlsZUNvbnRhaW5lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdHlsZUNvbnRhaW5lcik7XG5cbnZhciBfcmVuZGVyZXIgPSByZXF1aXJlKCcuLi9jb3JlL3JlbmRlcmVyJyk7XG5cbnZhciBfcmVuZGVyZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVuZGVyZXIpO1xuXG52YXIgX2dldEZvbnRGb3JtYXQgPSByZXF1aXJlKCcuLi91dGlscy9nZXRGb250Rm9ybWF0Jyk7XG5cbnZhciBfZ2V0Rm9udEZvcm1hdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRGb250Rm9ybWF0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGtleWZyYW1lID0gMDtcblxuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICAvKipcbiAgICogR2VuZXJhdGVzIGEgc3R5bGVTaGVldCB3aXRoIGFuIHNjb3BlSWQgYXBwbGllZCB0byBldmVyeSBzZWxlY3RvclxuICAgKiBUaGUgc2NvcGVJZCByZWZlcnMgdG8gdGhlIENvbXBvbmVudCB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciByZXNvbHZpbmcgdGhvc2Ugc3R5bGVzXG4gICAqIEBwYXJhbSB7c3R5bGVzfSBzdHlsZXMgLSBTdHlsZSBzZWxlY3RvciBvciBPYmplY3Qgd2l0aCBzZWxlY3RvcnNcbiAgICovXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoc3R5bGVzKSB7XG4gICAgLy8gZmxhdCBzdHlsZSBvYmplY3Qgd2l0aG91dCBzZWxlY3RvcnNcbiAgICB2YXIgZmlyc3RLZXkgPSBzdHlsZXNbT2JqZWN0LmtleXMoc3R5bGVzKVswXV07XG4gICAgaWYgKCEoMCwgX2lzUGxhaW5PYmplY3QyLmRlZmF1bHQpKGZpcnN0S2V5KSAmJiAhKDAsIF9pc0Z1bmN0aW9uMi5kZWZhdWx0KShmaXJzdEtleSkpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlbmRlcmVyMi5kZWZhdWx0KShzdHlsZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZXMpLnJlZHVjZShmdW5jdGlvbiAoY2xhc3Nlcywgc2VsZWN0b3IpIHtcbiAgICAgIGNsYXNzZXNbc2VsZWN0b3JdID0gKDAsIF9yZW5kZXJlcjIuZGVmYXVsdCkoc3R5bGVzW3NlbGVjdG9yXSk7XG4gICAgICByZXR1cm4gY2xhc3NlczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0sIHt9KTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyBzdHlsZXMgdG8gYSBzaW5nbGUgY2xhc3NOYW1lIHN0cmluZ1xuICAgKiBAcGFyYW0ge09iamVjdH0gLi4uc3R5bGVzIC0gc3R5bGVzIHRoYXQgZ2V0IGNvbWJpbmVkXG4gICAqL1xuICBjb21iaW5lU3R5bGVzOiBmdW5jdGlvbiBjb21iaW5lU3R5bGVzKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBzdHlsZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIHN0eWxlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVzLmpvaW4oJyAnKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBBIGdsb2JhbCBTdHlsZVNoZWV0IHRoYXQgZGlyZWN0bHkgYXBwbGllcyB0byB5b3VyIERPTVxuICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIC0gYSBzZXQgb2Ygc3R5bGUgb2JqZWN0c1xuICAgKiBAcGFyYW0ge3N0cmluZz99IHNjb3BlIC0gYWRkaXRpb25hbCBzY29waW5nIHNlbGVjdG9yXG4gICAqL1xuICBhZGRDU1M6IGZ1bmN0aW9uIGFkZENTUyhzdHlsZXMsIHNjb3BlKSB7XG4gICAgaWYgKHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQuYWRkU3RhdGljKHN0eWxlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzY29wZVNlbGVjdG9yID0gc2NvcGUgIT09IHVuZGVmaW5lZCAmJiBzY29wZS50cmltKCkgIT09ICcnID8gc2NvcGUgKyAnICcgOiAnJztcbiAgICAgICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgIHJldHVybiBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQuYWRkKHNjb3BlU2VsZWN0b3IgKyBzZWxlY3Rvciwgc3R5bGVzW3NlbGVjdG9yXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkoKTtcbiAgICB9XG4gIH0sXG4gIHRvQ1NTOiBmdW5jdGlvbiB0b0NTUyhzdHlsZXMsIHNjb3BlKSB7XG4gICAgY29uc29sZS53YXJuKCdgU3R5bGVTaGVldC50b0NTU2AgaXMgZGVwcmVjYXRlZCEgUGxlYXNlIHVzZSBgU3R5bGVTaGVldC5hZGRDU1NgIGluc3RlYWQhJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB0aGlzLmFkZENTUyhzdHlsZXMsIHNjb3BlKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBSZW5kZXJzIGFsbCBzdGF0aWMgc3R5bGVzIGludG8gYSBzaW5nbGUgQ1NTIHN0cmluZ1xuICAgKiBAcGFyYW0ge3N0cmluZz99IHVzZXJBZ2VudCAtIHVzZXJBZ2VudCB1c2VkIHRvIHByZWZpeCBzdHlsZXNcbiAgICovXG4gIHJlbmRlclRvU3RyaW5nOiBmdW5jdGlvbiByZW5kZXJUb1N0cmluZyh1c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LnJlbmRlclN0YXRpY1N0eWxlcyh1c2VyQWdlbnQpO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEFkZHMga2V5ZnJhbWUgYW5pbWF0aW9ucyB0byB0aGUgZ2xvYmFsIFN0eWxlU2hlZXQgYW5kIHJldHVybnMgdGhlIGFuaW1hdGlvbiBuYW1lXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmcmFtZXMgLSBrZXlmcmFtZXMgdGhhdCBnZXQgaW5zZXJ0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmc/fSBuYW1lIC0gY3VzdG9tIGFuaW1hdGlvbiBuYW1lXG4gICAqL1xuICBrZXlmcmFtZXM6IGZ1bmN0aW9uIGtleWZyYW1lcyhmcmFtZXMsIG5hbWUpIHtcbiAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IG5hbWUgPyBuYW1lIDogJ2snICsga2V5ZnJhbWUrKztcblxuICAgIF9TdHlsZUNvbnRhaW5lcjIuZGVmYXVsdC5hZGRLZXlmcmFtZXMoYW5pbWF0aW9uTmFtZSwgZnJhbWVzKTtcbiAgICByZXR1cm4gYW5pbWF0aW9uTmFtZTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IGZvbnQgZmFtaWx5IHRvIHRoZSBnbG9iYWwgU3R5bGVTaGVldCBmb3IgZ2xvYmFsIHVzYWdlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmb250RmFtaWx5IC0gZm9udC1mYW1pbHkgZm9yIGdsb2JhbCB1c2FnZVxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0gZmlsZXMgLSBzb3VyY2UgZmlsZXMgcmVmZXJpbmcgdG8gdGhlIGZvbnQgZmlsZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgLSBhZGRpdGlvbmFsIGZvbnQgcHJvcGVydGllcyBpbmNsdWRpbmcgZm9udFdlaWdodCwgZm9udFN0cmV0Y2gsIGZvbnRTdHlsZSwgdW5pY29kZVJhbmdlXG4gICAqL1xuICBmb250OiBmdW5jdGlvbiBmb250KGZvbnRGYW1pbHksIGZpbGVzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGZpbGVzKSB7XG4gICAgICB2YXIgX3JldDIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIEdlbmVyYXRlcyBhIHN0eWxlIG9iamVjdCBpbmNsdWRpbmcgYWxsIGZvbnQgaW5mb3JtYXRpb25cbiAgICAgICAgdmFyIGZvbnQgPSB7XG4gICAgICAgICAgZm9udEZhbWlseTogJ1xcJycgKyBmb250RmFtaWx5ICsgJ1xcJycsXG4gICAgICAgICAgc3JjOiBmaWxlcy5tYXAoZnVuY3Rpb24gKHNyYykge1xuICAgICAgICAgICAgcmV0dXJuICd1cmwoXFwnJyArIHNyYyArICdcXCcpIGZvcm1hdChcXCcnICsgKDAsIF9nZXRGb250Rm9ybWF0Mi5kZWZhdWx0KShzcmMpICsgJ1xcJyknO1xuICAgICAgICAgIH0pLmpvaW4oJywnKVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEZpbHRlciB0aGUgcHJvcGVydGllcyB0byBvbmx5IGluY2x1ZGUgdmFsaWQgcHJvcGVydGllc1xuICAgICAgICBpZiAocHJvcGVydGllcykge1xuICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZm9udFByb3BlcnRpZXMgPSBbJ2ZvbnRXZWlnaHQnLCAnZm9udFN0cmV0Y2gnLCAnZm9udFN0eWxlJywgJ3VuaWNvZGVSYW5nZSddO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMocHJvcGVydGllcykuZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmb250UHJvcGVydGllcy5pbmRleE9mKHByb3ApID4gLTE7XG4gICAgICAgICAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChmb250UHJvcCkge1xuICAgICAgICAgICAgICByZXR1cm4gZm9udFtmb250UHJvcF0gPSBwcm9wZXJ0aWVzW2ZvbnRQcm9wXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cblxuICAgICAgICBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQuYWRkRm9udChmb250KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2OiBmb250RmFtaWx5XG4gICAgICAgIH07XG4gICAgICB9KCk7XG5cbiAgICAgIGlmICgodHlwZW9mIF9yZXQyID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihfcmV0MikpID09PSBcIm9iamVjdFwiKSByZXR1cm4gX3JldDIudjtcbiAgICB9XG4gIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC9pc0FycmF5Jyk7XG5cbnZhciBfaXNBcnJheTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FycmF5KTtcblxudmFyIF9pc0Jvb2xlYW4gPSByZXF1aXJlKCdsb2Rhc2gvaXNCb29sZWFuJyk7XG5cbnZhciBfaXNCb29sZWFuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQm9vbGVhbik7XG5cbnZhciBfaXNFbXB0eSA9IHJlcXVpcmUoJ2xvZGFzaC9pc0VtcHR5Jyk7XG5cbnZhciBfaXNFbXB0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0VtcHR5KTtcblxudmFyIF9pc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoL2lzUGxhaW5PYmplY3QnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUGxhaW5PYmplY3QpO1xuXG52YXIgX2lzRnVuY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2gvaXNGdW5jdGlvbicpO1xuXG52YXIgX2lzRnVuY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNGdW5jdGlvbik7XG5cbmV4cG9ydHMuZXh0cmFjdER5bmFtaWNTdHlsZXMgPSBleHRyYWN0RHluYW1pY1N0eWxlcztcbmV4cG9ydHMucmVuZGVyU3BlY2lhbFN0eWxlcyA9IHJlbmRlclNwZWNpYWxTdHlsZXM7XG5leHBvcnRzLmRlZmF1bHQgPSByZW5kZXJTdGF0aWNTdHlsZXM7XG5cbnZhciBfU3R5bGVDb250YWluZXIgPSByZXF1aXJlKCcuLi9hcGkvU3R5bGVDb250YWluZXInKTtcblxudmFyIF9TdHlsZUNvbnRhaW5lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdHlsZUNvbnRhaW5lcik7XG5cbnZhciBfc29ydFBzZXVkb0NsYXNzZXMgPSByZXF1aXJlKCcuLi91dGlscy9zb3J0UHNldWRvQ2xhc3NlcycpO1xuXG52YXIgX3NvcnRQc2V1ZG9DbGFzc2VzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NvcnRQc2V1ZG9DbGFzc2VzKTtcblxudmFyIF9pc01lZGlhUXVlcnkgPSByZXF1aXJlKCcuLi91dGlscy9pc01lZGlhUXVlcnknKTtcblxudmFyIF9pc01lZGlhUXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNNZWRpYVF1ZXJ5KTtcblxudmFyIF9pc1BzZXVkbyA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzUHNldWRvJyk7XG5cbnZhciBfaXNQc2V1ZG8yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQc2V1ZG8pO1xuXG52YXIgX2lzRHluYW1pY0FycmF5ID0gcmVxdWlyZSgnLi4vdXRpbHMvaXNEeW5hbWljQXJyYXknKTtcblxudmFyIF9pc0R5bmFtaWNBcnJheTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0R5bmFtaWNBcnJheSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogRXh0cmFjdHMgYWxsIHBvc3NpYmxlIGR5bmFtaWMgc3R5bGVzIG91dCBvZiBhIHN0eWxlIG9iamVjdFxuICogVG8gYmUgYWJsZSB0byByZW5kZXIgYWxsIG90aGVyIChzdGF0aWMpIHN0eWxlcyBkaXJlY3RseSB0byBDU1NcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBwdXJlIHN0eWxlIG9iamVjdCB3aGljaCBnZXRzIHBhcnNlZFxuICovXG5mdW5jdGlvbiBleHRyYWN0RHluYW1pY1N0eWxlcyhzdHlsZXMpIHtcbiAgLy8gZWFybHkgcmV0dXJuIHN0YXRlZnVsIHNlbGVjdG9yc1xuICBpZiAoKDAsIF9pc0Z1bmN0aW9uMi5kZWZhdWx0KShzdHlsZXMpKSB7XG4gICAgcmV0dXJuIHsgX3N0YXRlZnVsU2VsZWN0b3I6IHN0eWxlcyB9O1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHN0eWxlcykucmVkdWNlKGZ1bmN0aW9uIChkeW5hbWljLCBwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBpZiAoKDAsIF9pc1BsYWluT2JqZWN0Mi5kZWZhdWx0KSh2YWx1ZSkpIHtcbiAgICAgIC8vIG9ubHkgY29uc2lkZXIgcHNldWRvIGNsYXNzZXMgYW5kIG1lZGlhIHF1ZXJpZXNcbiAgICAgIC8vIHRoYXQgY29udGFpbiBpbm5lciBkeW5hbWljIHN0eWxlc1xuICAgICAgaWYgKCgwLCBfaXNQc2V1ZG8yLmRlZmF1bHQpKHByb3BlcnR5KSB8fCAoMCwgX2lzTWVkaWFRdWVyeTIuZGVmYXVsdCkocHJvcGVydHkpKSB7XG4gICAgICAgIHZhciB2YWx1ZUNvdW50ID0gT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aDtcblxuICAgICAgICB2YXIgaW5uZXJEeW5hbWljID0gZXh0cmFjdER5bmFtaWNTdHlsZXModmFsdWUpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBpbm5lciBzdHlsZXMgY29udGFpbiBkeW5hbWljIHN0eWxlc1xuICAgICAgICAvLyBleHRyYWN0IHRoZW0gaW50byB0aGUgb3V0cHV0IG9iamVjdFxuICAgICAgICBpZiAoISgwLCBfaXNFbXB0eTIuZGVmYXVsdCkoaW5uZXJEeW5hbWljKSkge1xuICAgICAgICAgIGR5bmFtaWNbcHJvcGVydHldID0gaW5uZXJEeW5hbWljO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBwcm9wZXJ0eSBpZiBhbGwgaW5uZXIgc3R5bGVzXG4gICAgICAgIC8vIGFyZSBhY3R1YWxseSBkeW5hbWljIHN0eWxlc1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoaW5uZXJEeW5hbWljKS5sZW5ndGggPT09IHZhbHVlQ291bnQpIHtcbiAgICAgICAgICBkZWxldGUgc3R5bGVzW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHluYW1pY1twcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgZGVsZXRlIHN0eWxlc1twcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZnVuY3Rpb24gYXJlIGNvbnNpZGVyZWQgc3RhdGVmdWwgc3R5bGVzIGFuZCB0aGVyZWZvcmVcbiAgICAvLyB0cmVhdGVkIGFzIGR5bmFtaWMgc3R5bGVzXG4gICAgaWYgKCgwLCBfaXNGdW5jdGlvbjIuZGVmYXVsdCkodmFsdWUpIHx8ICgwLCBfaXNCb29sZWFuMi5kZWZhdWx0KSh2YWx1ZSkgfHwgKDAsIF9pc0FycmF5Mi5kZWZhdWx0KSh2YWx1ZSkgJiYgKDAsIF9pc0R5bmFtaWNBcnJheTIuZGVmYXVsdCkodmFsdWUpKSB7XG4gICAgICBkeW5hbWljW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIHN0eWxlc1twcm9wZXJ0eV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGR5bmFtaWM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfSwge30pO1xufVxuXG4vKipcbiAqIFJlbmRlcnMgc3BlY2lhbCBzdHlsZXMgYXMgcHNldWRvIGNsYXNzZXMgYW5kIG1lZGlhIHF1ZXJpZXNcbiAqIGFuZCBhZGRzIHRoZW0gdG8gdGhlIENTUyBTdHlsZUNvbnRhaW5lclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gYmFzZSBzZWxlY3RvciB1c2VkIGFzIGNsYXNzTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIHN0YXRpYyBzdHlsZXMgY29udGFpbmluZyBzcGVjaWFsIGV4dGVuc2lvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBwc2V1ZG8gLSBwcmlvciBvdXRlciBwc2V1ZG8gY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYSAtIHByaW9yIG91dGVyIG1lZGlhIHF1ZXJ5XG4gKi9cbmZ1bmN0aW9uIHJlbmRlclNwZWNpYWxTdHlsZXMoc2VsZWN0b3IsIHN0eWxlcykge1xuICB2YXIgcHNldWRvID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gJycgOiBhcmd1bWVudHNbMl07XG4gIHZhciBtZWRpYSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/ICcnIDogYXJndW1lbnRzWzNdO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZXMpLnNvcnQoX3NvcnRQc2V1ZG9DbGFzc2VzMi5kZWZhdWx0KS5yZWR1Y2UoZnVuY3Rpb24gKGV4dGVuc2lvbiwgcHJvcGVydHkpIHtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBpZiAoKDAsIF9pc1BsYWluT2JqZWN0Mi5kZWZhdWx0KSh2YWx1ZSkpIHtcbiAgICAgIGlmICgoMCwgX2lzUHNldWRvMi5kZWZhdWx0KShwcm9wZXJ0eSkpIHtcbiAgICAgICAgdmFyIGlubmVyU3R5bGVzID0gcmVuZGVyU3BlY2lhbFN0eWxlcyhzZWxlY3RvciwgdmFsdWUsIHBzZXVkbyArIHByb3BlcnR5LCBtZWRpYSk7XG4gICAgICAgIC8vIEFkZHMgYSBwc2V1ZG8gY2xhc3MgdG8gYW4gZXhpc3Rpbmcgc2VsZWN0b3JcbiAgICAgICAgX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LmFkZCgnLicgKyBzZWxlY3RvciArIHBzZXVkbyArIHByb3BlcnR5LCBpbm5lclN0eWxlcywgbWVkaWEpO1xuICAgICAgfVxuICAgICAgaWYgKCgwLCBfaXNNZWRpYVF1ZXJ5Mi5kZWZhdWx0KShwcm9wZXJ0eSkpIHtcbiAgICAgICAgLy8gQ29uY2F0ZW5hdGUgbXVsdGlwbGUgbWVkaWEgcXVlcmllcyBpZiBhIG1lZGlhIHF1ZXJ5IGFscmVhZHkgZXhpc3RzXG4gICAgICAgIHZhciBuZXdNZWRpYSA9IChtZWRpYSAhPT0gJycgPyBtZWRpYSArICdhbmQnIDogJycpICsgcHJvcGVydHkucmVwbGFjZSgnQG1lZGlhJywgJycpLnRyaW0oKTtcbiAgICAgICAgdmFyIF9pbm5lclN0eWxlcyA9IHJlbmRlclNwZWNpYWxTdHlsZXMoc2VsZWN0b3IsIHZhbHVlLCBwc2V1ZG8sIG5ld01lZGlhKTtcbiAgICAgICAgLy8gQWRkcyB0aGUgc2VsZWN0b3IgdG8gdGhlIG1lZGlhIGdyb3VwXG4gICAgICAgIF9TdHlsZUNvbnRhaW5lcjIuZGVmYXVsdC5hZGQoJy4nICsgc2VsZWN0b3IgKyBwc2V1ZG8sIF9pbm5lclN0eWxlcywgbmV3TWVkaWEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBleHRlbnNpb25bcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBleHRlbnNpb247IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfSwge30pO1xufVxuXG4vKipcbiAqIFJlbmRlcnMgc3RhdGljIHN0eWxlcyB0byB0aGUgQ1NTIFN0eWxlQ29udGFpbmVyXG4gKiBhbmQgZGlyZWN0bHkgc2NvcGVzIHRoZW0gdG8gdGhlIENvbXBvbmVudFxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIHN0YXRpYyBzdHlsZXMgdG8gYmUgcmVuZGVyZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzY29wZSAtIHNjb3BlIHNlbGVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBiYXNlIHNlbGVjdG9yIHVzZWQgYXMgY2xhc3NOYW1lXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclN0YXRpY1N0eWxlcyhzdHlsZXMsIHNjb3BlKSB7XG4gIC8vIEV4dHJhY3RzIGR5bmFtaWMgcGFydHMgcmVtYWluaW5nIG9ubHkgc3RhdGljIHN0eWxlc1xuICB2YXIgZHluYW1pY1N0eWxlcyA9IGV4dHJhY3REeW5hbWljU3R5bGVzKHN0eWxlcyk7XG5cbiAgLy8gRGV0ZXJtaW5lcyB0aGUgYmFzZSBzdHlsZXMgdXNlZCB0byBnZW5lcmF0ZSB0aGUgY2xhc3NOYW1lXG4gIHZhciBiYXNlU3R5bGVzID0gT2JqZWN0LmtleXMoc3R5bGVzKS5yZWR1Y2UoZnVuY3Rpb24gKGJhc2UsIHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTtcbiAgICBpZiAoISgwLCBfaXNQbGFpbk9iamVjdDIuZGVmYXVsdCkodmFsdWUpKSB7XG4gICAgICBiYXNlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIHN0eWxlc1twcm9wZXJ0eV07XG4gICAgfVxuICAgIHJldHVybiBiYXNlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0sIHt9KTtcblxuICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBjbGFzc05hbWVcbiAgdmFyIGNsYXNzTmFtZSA9IHNjb3BlID8gc2NvcGUgKyBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQuZ2VuZXJhdGVDbGFzc05hbWUoYmFzZVN0eWxlcykgOiBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQucmVxdWVzdENsYXNzTmFtZSgpO1xuXG4gIC8vIEFkZCB0aGUgY2xhc3NOYW1lIHRvIHRoZSBnbG9iYWwgc3R5bGUgY29udGFpbmVyIGlmIGl0IGhhcyBzdHlsZXNcbiAgaWYgKCEoMCwgX2lzRW1wdHkyLmRlZmF1bHQpKGJhc2VTdHlsZXMpKSB7XG4gICAgX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LmFkZCgnLicgKyBjbGFzc05hbWUsIGJhc2VTdHlsZXMpO1xuICB9XG5cbiAgLy8gQWxzbyBhZGQgdGhlIGR5bmFtaWMgc3R5bGVzIGlmIHRoZXkgZXhpc3RcbiAgaWYgKCEoMCwgX2lzRW1wdHkyLmRlZmF1bHQpKGR5bmFtaWNTdHlsZXMpIHx8ICgwLCBfaXNGdW5jdGlvbjIuZGVmYXVsdCkoZHluYW1pY1N0eWxlcykpIHtcbiAgICBfU3R5bGVDb250YWluZXIyLmRlZmF1bHQuX2FkZER5bmFtaWMoY2xhc3NOYW1lLCBkeW5hbWljU3R5bGVzKTtcbiAgfVxuXG4gIC8vIFJlbmRlcnMgcHNldWRvIGNsYXNzZXMgYW5kIG1lZGlhIHF1ZXJpZXMgdG8gdGhlIHN0eWxlIGNvbnRhaW5lclxuICByZW5kZXJTcGVjaWFsU3R5bGVzKGNsYXNzTmFtZSwgc3R5bGVzKTtcblxuICByZXR1cm4gY2xhc3NOYW1lO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc0VtcHR5ID0gcmVxdWlyZSgnbG9kYXNoL2lzRW1wdHknKTtcblxudmFyIF9pc0VtcHR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzRW1wdHkpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcmVzb2x2ZVN0eWxlcztcblxudmFyIF9hc3NpZ25TdHlsZXMgPSByZXF1aXJlKCdhc3NpZ24tc3R5bGVzJyk7XG5cbnZhciBfYXNzaWduU3R5bGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnblN0eWxlcyk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0TG9va0NvcmUgPSByZXF1aXJlKCdyZWFjdC1sb29rLWNvcmUnKTtcblxudmFyIF9yZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyZXInKTtcblxudmFyIF9yZW5kZXJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZW5kZXJlcik7XG5cbnZhciBfZXh0cmFjdENTUyA9IHJlcXVpcmUoJy4uL21peGlucy9leHRyYWN0Q1NTJyk7XG5cbnZhciBfZXh0cmFjdENTUzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHRyYWN0Q1NTKTtcblxudmFyIF9TdHlsZUNvbnRhaW5lciA9IHJlcXVpcmUoJy4uL2FwaS9TdHlsZUNvbnRhaW5lcicpO1xuXG52YXIgX1N0eWxlQ29udGFpbmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0eWxlQ29udGFpbmVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHJlc29sdmVQbHVnaW5zID0gX3JlYWN0TG9va0NvcmUucmVzb2x2ZXIucmVzb2x2ZVBsdWdpbnM7XG52YXIgcmVzb2x2ZUNoaWxkcmVuID0gX3JlYWN0TG9va0NvcmUucmVzb2x2ZXIucmVzb2x2ZUNoaWxkcmVuO1xudmFyIHJlc29sdmVQcm9wcyA9IF9yZWFjdExvb2tDb3JlLnJlc29sdmVyLnJlc29sdmVQcm9wcztcbnZhciBpc0xvb2tFbmhhbmNlZCA9IF9yZWFjdExvb2tDb3JlLnJlc29sdmVyLmlzTG9va0VuaGFuY2VkO1xuXG5cbi8qKlxyXG4gKiBSZXNvbHZlcyBwcm92aWRlZCBzdHlsZXMgaW50byBzdHlsZSBvYmplY3RzXHJcbiAqIFByb2Nlc3NlcyB0aG9zZSB1c2luZyBhIHByZWRlZmluZWQgcGx1Z2luIGxpbmV1cFxyXG4gKiBNYXBzIHRoZSBmaW5hbCBzdHlsZSBvYmplY3RzIHRvIHRoZSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBDb21wb25lbnQgLSB3cmFwcGluZyBSZWFjdCBDb21wb25lbnQgcHJvdmlkaW5nIHN0eWxlcyBhbmQgZWxlbWVudHNcclxuICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBwcmV2aW91c2x5IHJlbmRlcmVkIFJlYWN0IGVsZW1lbnRcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIGNvbmZpZ3VyYXRpb24gY29udGFpbmluZyBwbHVnaW5zIGFuZCBwbHVnaW4tc3BlY2lmaWMgY29uZmlnc1xyXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVTdHlsZXMoQ29tcG9uZW50LCBlbGVtZW50LCBjb25maWcpIHtcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5wcm9wcykge1xuICAgIHZhciBfcmV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZWFybHkgcmV0dXJuIGlmIGVsZW1lbnQgaXRzZWxmIGlzIGEgTG9vayBjb21wb25lbnRcbiAgICAgIC8vIGl0IHdpbGwgYmUgcmVzb2x2ZWQgYW55d2F5c1xuICAgICAgaWYgKGlzTG9va0VuaGFuY2VkKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdjogZWxlbWVudFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB2YXIgbmV3UHJvcHMgPSBfZXh0ZW5kcyh7fSwgZWxlbWVudC5wcm9wcyk7XG4gICAgICByZXNvbHZlUHJvcHMoQ29tcG9uZW50LCBuZXdQcm9wcywgY29uZmlnKTtcbiAgICAgIHJlc29sdmVDaGlsZHJlbihDb21wb25lbnQsIG5ld1Byb3BzLCBjb25maWcpO1xuXG4gICAgICAvLyBUaGUgcmVhY3QtZG9tIHBhY2thZ2UgcmVjaWV2ZXMgYWxsIHN0eWxlcyBhcyBjbGFzc05hbWVzXG4gICAgICAvLyBUaGV5IGNvbWUgcHJlcmVuZGVyZWQgYnkgU3R5bGVTaGVldC5jcmVhdGUgYW5kIHJlZmVyZW5jZSBhbGwgZHluYW1pYyBTdHlsZVNoZWV0XG4gICAgICAvLyBUaG9zZSB3aWxsIGJlIGl0ZXJhdGVkIGFuZCBhZGRpdGlvbmFsbHkgYWRkZWQgaWYgY29uZGl0aW9ucyBhcmUgZnVsZmlsbGVkXG4gICAgICBpZiAobmV3UHJvcHMuY2xhc3NOYW1lKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAvLyBzdGF0aWMgYXJndW1lbnRzIHRoYXQgZ2V0IHBhc3NlZCB0byBldmVyeSBwbHVnaW5cbiAgICAgICAgICB2YXIgc3RhdGljUGx1Z2luQXJndW1lbnRzID0ge1xuICAgICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZVBsdWdpbnMsXG4gICAgICAgICAgICBTdHlsZUNvbnRhaW5lcjogX1N0eWxlQ29udGFpbmVyMi5kZWZhdWx0LFxuICAgICAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnQsXG4gICAgICAgICAgICBuZXdQcm9wczogbmV3UHJvcHMsXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWdcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgbmV3UHJvcHMuY2xhc3NOYW1lLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB2YXIgZHluYW1pY1N0eWxlcyA9IF9TdHlsZUNvbnRhaW5lcjIuZGVmYXVsdC5keW5hbWljcy5nZXQoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIC8vIFJlc29sdmUgcGx1Z2lucyBpZiBwbHVnaW5zIGFyZSBwcm92aWRlZCB2aWEgY29uZmlnXG4gICAgICAgICAgICBpZiAoY29uZmlnLnBsdWdpbnMpIHtcbiAgICAgICAgICAgICAgLy8gQ29uc3RydWN0cyB0aGUgcGx1Z2luSW50ZXJmYWNlXG4gICAgICAgICAgICAgIHZhciBwbHVnaW5JbnRlcmZhY2UgPSBfZXh0ZW5kcyh7fSwgc3RhdGljUGx1Z2luQXJndW1lbnRzLCB7XG4gICAgICAgICAgICAgICAgc3R5bGVzOiAoMCwgX2Fzc2lnblN0eWxlczIuZGVmYXVsdCkoe30sIGR5bmFtaWNTdHlsZXMgfHwge30pLFxuICAgICAgICAgICAgICAgIGR5bmFtaWNTdHlsZXNOb3ROdWxsOiBkeW5hbWljU3R5bGVzICE9IG51bGxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIC8vIENhbGxpbmcgcmVzb2x2ZVBsdWdpbnMgd2l0aCBmb3JjZU1vZGVQb3NzaWJsZSA9IHRydWVcbiAgICAgICAgICAgICAgdmFyIG5ld1N0eWxlcyA9IHJlc29sdmVQbHVnaW5zKHBsdWdpbkludGVyZmFjZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgLy8gT25seSBhcHBseSBzdHlsZXMgaWYgdGhlcmUgYXJlIHNvbWVcbiAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzRW1wdHkyLmRlZmF1bHQpKG5ld1N0eWxlcykpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJlZml4ZWROZXdTdHlsZXMgPSBjb25maWcucHJlZml4ZXIucHJlZml4KG5ld1N0eWxlcyk7XG4gICAgICAgICAgICAgICAgdmFyIGR5bmFtaWNDbGFzc05hbWUgPSAoMCwgX3JlbmRlcmVyMi5kZWZhdWx0KShwcmVmaXhlZE5ld1N0eWxlcywgY2xhc3NOYW1lICsgJy1kLScpO1xuICAgICAgICAgICAgICAgICgwLCBfZXh0cmFjdENTUzIuZGVmYXVsdCkoeyB2YWx1ZTogZHluYW1pY0NsYXNzTmFtZSwgbmV3UHJvcHM6IG5ld1Byb3BzIH0pO1xuICAgICAgICAgICAgICAgIG5ld1Byb3BzLl9sb29rU2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBPbmx5IGFjdHVhbGx5IGNsb25lIGlmIGl0IGlzIG5lZWRlZFxuICAgICAgLy8gSWYgdGhlcmUgYXJlIHN0eWxlcywgY2hpbGRyZW4gZ290IHJlc29sdmVkIG9yIHByb3BzIGdvdCByZXNvbHZlZFxuICAgICAgaWYgKG5ld1Byb3BzLmNoaWxkcmVuICE9PSBlbGVtZW50LnByb3BzLmNoaWxkcmVuIHx8IG5ld1Byb3BzLl9sb29rU2hvdWxkVXBkYXRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdjogKDAsIF9yZWFjdC5jbG9uZUVsZW1lbnQpKGVsZW1lbnQsIG5ld1Byb3BzKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0oKTtcblxuICAgIGlmICgodHlwZW9mIF9yZXQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKF9yZXQpKSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIF9yZXQudjtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5QcmVzZXRzID0gZXhwb3J0cy5NaXhpbnMgPSBleHBvcnRzLlBsdWdpbnMgPSBleHBvcnRzLlN0YXRpY1ByZWZpeGVyID0gZXhwb3J0cy5EeW5hbWljUHJlZml4ZXIgPSBleHBvcnRzLl9yZXNvbHZlciA9IGV4cG9ydHMuX1N0eWxlQ29udGFpbmVyID0gZXhwb3J0cy5QcmVmaXhlciA9IGV4cG9ydHMuTG9va1Jvb3QgPSBleHBvcnRzLlN0eWxlU2hlZXQgPSB1bmRlZmluZWQ7XG5cbnZhciBfcmVhY3RMb29rQ29yZSA9IHJlcXVpcmUoJ3JlYWN0LWxvb2stY29yZScpO1xuXG52YXIgX2ZhbGxiYWNrVmFsdWUgPSByZXF1aXJlKCcuL3BsdWdpbnMvZmFsbGJhY2tWYWx1ZScpO1xuXG52YXIgX2ZhbGxiYWNrVmFsdWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmFsbGJhY2tWYWx1ZSk7XG5cbnZhciBfbGludGVyID0gcmVxdWlyZSgnLi9wbHVnaW5zL2xpbnRlcicpO1xuXG52YXIgX2xpbnRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saW50ZXIpO1xuXG52YXIgX2ZyaWVuZGx5Q2xhc3NOYW1lID0gcmVxdWlyZSgnLi9wbHVnaW5zL2ZyaWVuZGx5Q2xhc3NOYW1lJyk7XG5cbnZhciBfZnJpZW5kbHlDbGFzc05hbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJpZW5kbHlDbGFzc05hbWUpO1xuXG52YXIgX3N1YnN0ciA9IHJlcXVpcmUoJy4vbWl4aW5zL3N1YnN0cicpO1xuXG52YXIgX3N1YnN0cjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdWJzdHIpO1xuXG52YXIgX2V4dHJhY3RDU1MgPSByZXF1aXJlKCcuL21peGlucy9leHRyYWN0Q1NTJyk7XG5cbnZhciBfZXh0cmFjdENTUzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHRyYWN0Q1NTKTtcblxudmFyIF9wbGF0Zm9ybVF1ZXJ5ID0gcmVxdWlyZSgnLi9taXhpbnMvcGxhdGZvcm1RdWVyeScpO1xuXG52YXIgX3BsYXRmb3JtUXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGxhdGZvcm1RdWVyeSk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCcuL3ByZXNldHMvcmVhY3QtZG9tJyk7XG5cbnZhciBfcmVhY3REb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3REb20pO1xuXG52YXIgX0R5bmFtaWNQcmVmaXhlciA9IHJlcXVpcmUoJy4vcHJlZml4ZXIvRHluYW1pY1ByZWZpeGVyJyk7XG5cbnZhciBfRHluYW1pY1ByZWZpeGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0R5bmFtaWNQcmVmaXhlcik7XG5cbnZhciBfU3RhdGljUHJlZml4ZXIgPSByZXF1aXJlKCcuL3ByZWZpeGVyL1N0YXRpY1ByZWZpeGVyJyk7XG5cbnZhciBfU3RhdGljUHJlZml4ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3RhdGljUHJlZml4ZXIpO1xuXG52YXIgX1ByZWZpeGVyID0gcmVxdWlyZSgnLi9hcGkvUHJlZml4ZXInKTtcblxudmFyIF9QcmVmaXhlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QcmVmaXhlcik7XG5cbnZhciBfU3R5bGVTaGVldCA9IHJlcXVpcmUoJy4vYXBpL1N0eWxlU2hlZXQnKTtcblxudmFyIF9TdHlsZVNoZWV0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0eWxlU2hlZXQpO1xuXG52YXIgX0xvb2tSb290ID0gcmVxdWlyZSgnLi9hcGkvTG9va1Jvb3QnKTtcblxudmFyIF9Mb29rUm9vdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Mb29rUm9vdCk7XG5cbnZhciBfU3R5bGVDb250YWluZXIyID0gcmVxdWlyZSgnLi9hcGkvU3R5bGVDb250YWluZXInKTtcblxudmFyIF9TdHlsZUNvbnRhaW5lcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdHlsZUNvbnRhaW5lcjIpO1xuXG52YXIgX3Jlc29sdmVyMiA9IHJlcXVpcmUoJy4vY29yZS9yZXNvbHZlcicpO1xuXG52YXIgX3Jlc29sdmVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Jlc29sdmVyMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBtaXhpbiA9IF9yZWFjdExvb2tDb3JlLlBsdWdpbnMubWl4aW47XG52YXIgc3RhdGVmdWxWYWx1ZSA9IF9yZWFjdExvb2tDb3JlLlBsdWdpbnMuc3RhdGVmdWxWYWx1ZTtcbnZhciBzdHlsZUxvZ2dlciA9IF9yZWFjdExvb2tDb3JlLlBsdWdpbnMuc3R5bGVMb2dnZXI7XG52YXIgc3RhdGVmdWxTZWxlY3RvciA9IF9yZWFjdExvb2tDb3JlLlBsdWdpbnMuc3RhdGVmdWxTZWxlY3RvcjtcbnZhciBjb25kaXRpb24gPSBfcmVhY3RMb29rQ29yZS5NaXhpbnMuY29uZGl0aW9uO1xudmFyIGNvbnRhaW5zID0gX3JlYWN0TG9va0NvcmUuTWl4aW5zLmNvbnRhaW5zO1xudmFyIGV4dGVuZCA9IF9yZWFjdExvb2tDb3JlLk1peGlucy5leHRlbmQ7XG52YXIgZXF1YWwgPSBjb25kaXRpb24uZXF1YWw7XG52YXIgdW5FcXVhbCA9IGNvbmRpdGlvbi51bkVxdWFsO1xudmFyIGdyZWF0ZXIgPSBjb25kaXRpb24uZ3JlYXRlcjtcbnZhciBsZXNzID0gY29uZGl0aW9uLmxlc3M7XG52YXIgZ3JlYXRlclRoYW4gPSBjb25kaXRpb24uZ3JlYXRlclRoYW47XG52YXIgbGVzc1RoYW4gPSBjb25kaXRpb24ubGVzc1RoYW47XG5cbi8vIFBsdWdpbnNcblxuXG4vLyBEZXYgdG9vbHNcblxuXG4vLyBNaXhpbnNcblxuXG4vLyBQcmVzZXRzXG5cblxuLy8gUHJlZml4ZXJcblxuXG4vLyBBUElcblxuXG4vLyBQcml2YXRlIEFQSVxuXG4vLyBSZXNvbHZpbmcgYW5ub3RhdGlvbnNcbi8vIElmIG5vdCBwYXNzaW5nIGFyZ3VtZW50cyBpdCBqdXN0IHdyYXBzIHRoZSBDb21wb25lbnRcbi8vIE90aGVyd2lzZSBpdCByZXR1cm5zIGEgZGVjb3JhdG9yXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGFyZ3NbMF0gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBfcmVhY3RMb29rQ29yZS5lbmhhbmNlci5hcHBseSh1bmRlZmluZWQsIGFyZ3MpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yKHRhcmdldCkge1xuICAgIHJldHVybiBfcmVhY3RMb29rQ29yZS5lbmhhbmNlci5hcHBseSh1bmRlZmluZWQsIFt0YXJnZXRdLmNvbmNhdChhcmdzKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfTtcbn07XG5cbnZhciBQbHVnaW5zID0ge1xuICBtaXhpbjogbWl4aW4sXG4gIGZhbGxiYWNrVmFsdWU6IF9mYWxsYmFja1ZhbHVlMi5kZWZhdWx0LFxuICBzdGF0ZWZ1bFZhbHVlOiBzdGF0ZWZ1bFZhbHVlLFxuICBzdGF0ZWZ1bFNlbGVjdG9yOiBzdGF0ZWZ1bFNlbGVjdG9yLFxuICBzdHlsZUxvZ2dlcjogc3R5bGVMb2dnZXIsXG4gIGxpbnRlcjogX2xpbnRlcjIuZGVmYXVsdCxcbiAgZnJpZW5kbHlDbGFzc05hbWU6IF9mcmllbmRseUNsYXNzTmFtZTIuZGVmYXVsdFxufTtcblxudmFyIE1peGlucyA9IHtcbiAgLy8gQ29uZGl0aW9uc1xuICBncmVhdGVyVGhhbjogZ3JlYXRlclRoYW4sXG4gIGxlc3NUaGFuOiBsZXNzVGhhbixcbiAgdW5FcXVhbDogdW5FcXVhbCxcbiAgZ3JlYXRlcjogZ3JlYXRlcixcbiAgbGVzczogbGVzcyxcbiAgZXF1YWw6IGVxdWFsLFxuXG4gIC8vIE90aGVyXG4gIGV4dGVuZDogZXh0ZW5kLFxuICBleHRyYWN0Q1NTOiBfZXh0cmFjdENTUzIuZGVmYXVsdCxcbiAgcGxhdGZvcm1RdWVyeTogX3BsYXRmb3JtUXVlcnkyLmRlZmF1bHQsXG4gIGNvbnRhaW5zOiBjb250YWlucyxcbiAgc3Vic3RyOiBfc3Vic3RyMi5kZWZhdWx0XG59O1xuXG52YXIgUHJlc2V0cyA9IHtcbiAgJ3JlYWN0LWRvbSc6IF9yZWFjdERvbTIuZGVmYXVsdFxufTtcblxuZXhwb3J0cy5TdHlsZVNoZWV0ID0gX1N0eWxlU2hlZXQyLmRlZmF1bHQ7XG5leHBvcnRzLkxvb2tSb290ID0gX0xvb2tSb290Mi5kZWZhdWx0O1xuZXhwb3J0cy5QcmVmaXhlciA9IF9QcmVmaXhlcjIuZGVmYXVsdDtcbmV4cG9ydHMuXG5cbi8vIHByaXZhdGUgZXhwb3J0IGZvciB0ZXN0aW5nIG9ubHlcbl9TdHlsZUNvbnRhaW5lciA9IF9TdHlsZUNvbnRhaW5lcjMuZGVmYXVsdDtcbmV4cG9ydHMuX3Jlc29sdmVyID0gX3Jlc29sdmVyMy5kZWZhdWx0O1xuZXhwb3J0cy5EeW5hbWljUHJlZml4ZXIgPSBfRHluYW1pY1ByZWZpeGVyMi5kZWZhdWx0O1xuZXhwb3J0cy5TdGF0aWNQcmVmaXhlciA9IF9TdGF0aWNQcmVmaXhlcjIuZGVmYXVsdDtcbmV4cG9ydHMuUGx1Z2lucyA9IFBsdWdpbnM7XG5leHBvcnRzLk1peGlucyA9IE1peGlucztcbmV4cG9ydHMuUHJlc2V0cyA9IFByZXNldHM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuLy8gTGV0cyB5b3UgZXh0cmFjdCBjc3MgdG8gY2xhc3NOYW1lcyB1c2luZyB0aGUgY3NzIGtleVxuLy8gVGhpcyBpcyBoZWxwZnVsIGlmIHlvdSBoYXZlIHNvbWUgbGVnYWN5IGNvZGUgdXNpbmcgQ1NTIGNsYXNzZXNcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIGNsYXNzTmFtZSA9IF9yZWYudmFsdWU7XG4gIHZhciBuZXdQcm9wcyA9IF9yZWYubmV3UHJvcHM7XG5cbiAgaWYgKG5ld1Byb3BzLmNsYXNzTmFtZSkge1xuICAgIG5ld1Byb3BzLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gIH0gZWxzZSB7XG4gICAgbmV3UHJvcHMuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lubGluZVN0eWxlUHJlZml4ZXIgPSByZXF1aXJlKCdpbmxpbmUtc3R5bGUtcHJlZml4ZXInKTtcblxudmFyIF9pbmxpbmVTdHlsZVByZWZpeGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lubGluZVN0eWxlUHJlZml4ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vLyBBbGxvd3MgdGhlIHVzZSBvZiBwbGF0Zm9ybSBxdWVyaWVzIHN1cHBvcnRlZCBieSBicm93c2VyIGluZm9ybWF0aW9uXG4vLyBwcm92aWRlZCBieSB0aGUgaW5saW5lLXN0eWxlLXByZWZpeGVyXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBwcm9wZXJ0eSA9IF9yZWYucHJvcGVydHk7XG4gIHZhciB2YWx1ZSA9IF9yZWYudmFsdWU7XG4gIHZhciBtaXhpbktleSA9IF9yZWYubWl4aW5LZXk7XG4gIHZhciB1c2VyQWdlbnQgPSBfcmVmLmNvbmZpZy51c2VyQWdlbnQ7XG5cbiAgdmFyIGJyb3dzZXJJbmZvID0gbmV3IF9pbmxpbmVTdHlsZVByZWZpeGVyMi5kZWZhdWx0KHsgdXNlckFnZW50OiB1c2VyQWdlbnQgfSkuX2Jyb3dzZXJJbmZvO1xuICB2YXIgcGxhdGZvcm1zID0gcHJvcGVydHkucmVwbGFjZShtaXhpbktleSwgJycpLnRyaW0oKS5zcGxpdCgnICcpO1xuXG4gIHZhciBpc1BsYXRmb3JtID0gZmFsc2U7XG5cbiAgcGxhdGZvcm1zLmZvckVhY2goZnVuY3Rpb24gKHBsYXRmb3JtKSB7XG4gICAgaWYgKGJyb3dzZXJJbmZvW3BsYXRmb3JtLnRyaW0oKV0pIHtcbiAgICAgIGlzUGxhdGZvcm0gPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGlzUGxhdGZvcm0gPyB2YWx1ZSA6IGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzTnVtYmVyID0gcmVxdWlyZSgnbG9kYXNoL2lzTnVtYmVyJyk7XG5cbnZhciBfaXNOdW1iZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNOdW1iZXIpO1xuXG52YXIgX2lzU3RyaW5nID0gcmVxdWlyZSgnbG9kYXNoL2lzU3RyaW5nJyk7XG5cbnZhciBfaXNTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNTdHJpbmcpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3RMb29rQ29yZSA9IHJlcXVpcmUoJ3JlYWN0LWxvb2stY29yZScpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfdG9BcnJheShhcnIpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKSA/IGFyciA6IEFycmF5LmZyb20oYXJyKTsgfVxuXG52YXIgZ2V0UHNldWRvRXhwcmVzc2lvbiA9IF9yZWFjdExvb2tDb3JlLlV0aWxzLmdldFBzZXVkb0V4cHJlc3Npb247XG5cbi8vIEV2YWx1YXRlcyBpZiBhIGVsZW1lbnQgY29udGFpbnMgYSBnaXZlbiBzdHJpbmdcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIHByb3BlcnR5ID0gX3JlZi5wcm9wZXJ0eTtcbiAgdmFyIHZhbHVlID0gX3JlZi52YWx1ZTtcbiAgdmFyIG5ld1Byb3BzID0gX3JlZi5uZXdQcm9wcztcblxuICB2YXIgY2hpbGRyZW4gPSBuZXdQcm9wcy5jaGlsZHJlbjtcblxuICBpZiAoKDAsIF9pc1N0cmluZzIuZGVmYXVsdCkoY2hpbGRyZW4pIHx8ICgwLCBfaXNOdW1iZXIyLmRlZmF1bHQpKGNoaWxkcmVuKSkge1xuICAgIHZhciBfcmV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG5ld0NoaWxkcmVuID0gW107XG5cbiAgICAgIHZhciBtYXRjaGVzID0gY2hpbGRyZW4ubWF0Y2gobmV3IFJlZ0V4cChnZXRQc2V1ZG9FeHByZXNzaW9uKHByb3BlcnR5KSwgJ2cnKSk7XG4gICAgICBpZiAoIW1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2OiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBtYXRjaGVzLmZvckVhY2goZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHZhciBfY2hpbGRyZW4kc3BsaXQgPSBjaGlsZHJlbi5zcGxpdChtYXRjaCk7XG5cbiAgICAgICAgdmFyIF9jaGlsZHJlbiRzcGxpdDIgPSBfdG9BcnJheShfY2hpbGRyZW4kc3BsaXQpO1xuXG4gICAgICAgIHZhciBsZWZ0ID0gX2NoaWxkcmVuJHNwbGl0MlswXTtcblxuICAgICAgICB2YXIgcmlnaHQgPSBfY2hpbGRyZW4kc3BsaXQyLnNsaWNlKDEpO1xuXG4gICAgICAgIGlmIChsZWZ0ICE9PSAnJykge1xuICAgICAgICAgIG5ld0NoaWxkcmVuLnB1c2gobGVmdCk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKCgwLCBfcmVhY3QuY3JlYXRlRWxlbWVudCkoJ3NwYW4nLCB7XG4gICAgICAgICAgc3R5bGU6IHZhbHVlXG4gICAgICAgIH0sIG1hdGNoKSk7XG5cbiAgICAgICAgY2hpbGRyZW4gPSByaWdodC5qb2luKG1hdGNoKTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXdDaGlsZHJlbi5wdXNoKGNoaWxkcmVuKTtcbiAgICAgIG5ld1Byb3BzLmNoaWxkcmVuID0gbmV3Q2hpbGRyZW47XG4gICAgfSgpO1xuXG4gICAgaWYgKCh0eXBlb2YgX3JldCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoX3JldCkpID09PSBcIm9iamVjdFwiKSByZXR1cm4gX3JldC52O1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzUGxhaW5PYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvaXNQbGFpbk9iamVjdCcpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cbnZhciBfaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC9pc0FycmF5Jyk7XG5cbnZhciBfaXNBcnJheTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FycmF5KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZmFsbGJhY2tWYWx1ZTtcblxudmFyIF9hc3NpZ25TdHlsZXMgPSByZXF1aXJlKCdhc3NpZ24tc3R5bGVzJyk7XG5cbnZhciBfYXNzaWduU3R5bGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnblN0eWxlcyk7XG5cbnZhciBfY2FtZWxUb0Rhc2hDYXNlID0gcmVxdWlyZSgnLi4vdXRpbHMvY2FtZWxUb0Rhc2hDYXNlJyk7XG5cbnZhciBfY2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NhbWVsVG9EYXNoQ2FzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuLyoqXHJcbiAqIFJlc29sdmVzIGFsdGVybmF0aXZlIHZhbHVlcyBwcm92aWRlZCBhcyBhbiBBcnJheVxyXG4gKi9cbmZ1bmN0aW9uIGZhbGxiYWNrVmFsdWUoX3JlZikge1xuICB2YXIgc3R5bGVzID0gX3JlZi5zdHlsZXM7XG4gIHZhciByZXNvbHZlID0gX3JlZi5yZXNvbHZlO1xuXG4gIHZhciBwbHVnaW5JbnRlcmZhY2UgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydzdHlsZXMnLCAncmVzb2x2ZSddKTtcblxuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTtcbiAgICBpZiAoKDAsIF9pc0FycmF5Mi5kZWZhdWx0KSh2YWx1ZSkpIHtcbiAgICAgIHN0eWxlc1twcm9wZXJ0eV0gPSB2YWx1ZS5qb2luKCc7JyArICgwLCBfY2FtZWxUb0Rhc2hDYXNlMi5kZWZhdWx0KShwcm9wZXJ0eSkgKyAnOicpO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc1BsYWluT2JqZWN0Mi5kZWZhdWx0KSh2YWx1ZSkpIHtcbiAgICAgIHN0eWxlc1twcm9wZXJ0eV0gPSByZXNvbHZlKF9leHRlbmRzKHt9LCBwbHVnaW5JbnRlcmZhY2UsIHtcbiAgICAgICAgc3R5bGVzOiAoMCwgX2Fzc2lnblN0eWxlczIuZGVmYXVsdCkoe30sIHZhbHVlKSxcbiAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZVxuICAgICAgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN0eWxlcztcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmcmllbmRseUNsYXNzTmFtZXM7XG5cbnZhciBfcmVhY3RMb29rQ29yZSA9IHJlcXVpcmUoJ3JlYWN0LWxvb2stY29yZScpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxudmFyIGdldENoaWxkVHlwZSA9IF9yZWFjdExvb2tDb3JlLlV0aWxzLmdldENoaWxkVHlwZTtcblxuXG52YXIgY2xhc3NOYW1lVGVtcGxhdGUgPSBmdW5jdGlvbiBjbGFzc05hbWVUZW1wbGF0ZShjbGFzc05hbWUsIENvbXBvbmVudCwgZWxlbWVudCkge1xuICByZXR1cm4gQ29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lICsgJy0nICsgZ2V0Q2hpbGRUeXBlKGVsZW1lbnQpICsgJy0tJyArIGNsYXNzTmFtZTtcbn07XG5cbnZhciBjbGFzc01hcHBpbmcgPSBuZXcgTWFwKCk7XG5cbmZ1bmN0aW9uIGZyaWVuZGx5Q2xhc3NOYW1lcyhfcmVmKSB7XG4gIHZhciBTdHlsZUNvbnRhaW5lciA9IF9yZWYuU3R5bGVDb250YWluZXI7XG4gIHZhciBDb21wb25lbnQgPSBfcmVmLkNvbXBvbmVudDtcbiAgdmFyIGVsZW1lbnQgPSBfcmVmLmVsZW1lbnQ7XG4gIHZhciBuZXdQcm9wcyA9IF9yZWYubmV3UHJvcHM7XG4gIHZhciBzdHlsZXMgPSBfcmVmLnN0eWxlcztcbiAgdmFyIGNvbmZpZyA9IF9yZWYuY29uZmlnO1xuXG4gIC8vIE9ubHkgdHJhbnNmb3JtIGlmIG5vdCBhbHJlYWR5IHRyYW5zZm9ybWVkIGFuZCBhIGNsYXNzTmFtZSBleGlzdHNcbiAgaWYgKCFuZXdQcm9wcy5faGFzRnJpZW5kbHlDbGFzc05hbWVzICYmIG5ld1Byb3BzLmNsYXNzTmFtZSkge1xuICAgIG5ld1Byb3BzLmNsYXNzTmFtZSA9IG5ld1Byb3BzLmNsYXNzTmFtZS5zcGxpdCgnICcpLnJlZHVjZShmdW5jdGlvbiAoY2xhc3NOYW1lLCBjbHMpIHtcbiAgICAgIGNscyA9IGNscy50cmltKCk7XG4gICAgICAvLyBJZiB0aGUgY2xhc3NOYW1lIGhhcyBhbHJlYWR5IGJlZW4gcmVzb2x2ZWRcbiAgICAgIC8vIGp1c3QgdXNlIHRoZSBmb3JtZXIgbmV3IGNsYXNzTmFtZVxuICAgICAgaWYgKGNsYXNzTWFwcGluZy5oYXMoY2xzKSkge1xuICAgICAgICBjbGFzc05hbWUgKz0gY2xhc3NOYW1lICsgY2xhc3NOYW1lICE9PSAnJyA/ICcgJyA6ICcnICsgY2xhc3NNYXBwaW5nLmdldChjbHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgbmV3Q2xhc3MgPSB2b2lkIDA7XG4gICAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuZnJpZW5kbHlDbGFzc05hbWVUZW1wbGF0ZSkge1xuICAgICAgICAgICAgbmV3Q2xhc3MgPSBjb25maWcuZnJpZW5kbHlDbGFzc05hbWVUZW1wbGF0ZShjbHMsIENvbXBvbmVudCwgZWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0NsYXNzID0gY2xhc3NOYW1lVGVtcGxhdGUoY2xzLCBDb21wb25lbnQsIGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgaXNMb29rQ2xhc3MgPSBmYWxzZTtcblxuICAgICAgICAgIC8vIGltbXV0YWJsZSBzZWxlY3RvcnMgdG8gaXRlcmF0ZSB3aXRob3V0IGNoYW5nZXNcbiAgICAgICAgICB2YXIgc2VsZWN0b3JzID0gW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShTdHlsZUNvbnRhaW5lci5zZWxlY3RvcnMpKTtcbiAgICAgICAgICB2YXIgbWVkaWFRdWVyaWVzID0gW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShTdHlsZUNvbnRhaW5lci5tZWRpYVF1ZXJpZXMpKTtcblxuICAgICAgICAgIC8vIFJlcGxhY2UgYmFzaWMgc2VsZWN0b3IgY2xhc3NOYW1lc1xuICAgICAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgICAgICAgdmFyIF9yZWYzID0gX3NsaWNlZFRvQXJyYXkoX3JlZjIsIDIpO1xuXG4gICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBfcmVmM1swXTtcbiAgICAgICAgICAgIHZhciBzdHlsZXMgPSBfcmVmM1sxXTtcblxuICAgICAgICAgICAgLy8gb25seSBpZiB0aGUgc2VsZWN0b3JzIHN0YXJ0cyB3aXRoIHRoZSBjbGFzc05hbWVcbiAgICAgICAgICAgIGlmIChzZWxlY3Rvci5pbmRleE9mKCcuJyArIGNscykgPT09IDApIHtcbiAgICAgICAgICAgICAgdmFyIHBzZXVkbyA9IHNlbGVjdG9yLnJlcGxhY2UobmV3IFJlZ0V4cCgnLicgKyBjbHMsICdnJyksICcnKTtcbiAgICAgICAgICAgICAgLy8gQ2FjaGUgcmVzb2x2ZWQgY2xhc3NOYW1lcyBmb3IgbGF0ZXIgdXNlXG4gICAgICAgICAgICAgIGNsYXNzTWFwcGluZy5zZXQoY2xzLCBuZXdDbGFzcyk7XG4gICAgICAgICAgICAgIC8vIFB1c2ggdGhlIG5ldyBjbGFzc05hbWUgYW5kIHJlbW92ZSB0aGUgb2xkIG9uZVxuICAgICAgICAgICAgICBTdHlsZUNvbnRhaW5lci5hZGQoJy4nICsgbmV3Q2xhc3MgKyBwc2V1ZG8sIHN0eWxlcyk7XG4gICAgICAgICAgICAgIFN0eWxlQ29udGFpbmVyLnNlbGVjdG9ycy5kZWxldGUoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICBpc0xvb2tDbGFzcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBJdGVyYXRlIG1lZGlhIHF1ZXJpZXMgYW5kIHJlcGxhY2Ugc2VsZWN0b3JzXG4gICAgICAgICAgbWVkaWFRdWVyaWVzLmZvckVhY2goZnVuY3Rpb24gKF9yZWY0KSB7XG4gICAgICAgICAgICB2YXIgX3JlZjUgPSBfc2xpY2VkVG9BcnJheShfcmVmNCwgMik7XG5cbiAgICAgICAgICAgIHZhciBtZWRpYSA9IF9yZWY1WzBdO1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9ycyA9IF9yZWY1WzFdO1xuXG4gICAgICAgICAgICB2YXIgbWVkaWFTZWxlY3RvcnMgPSBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHNlbGVjdG9ycykpO1xuICAgICAgICAgICAgbWVkaWFTZWxlY3RvcnMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjYpIHtcbiAgICAgICAgICAgICAgdmFyIF9yZWY3ID0gX3NsaWNlZFRvQXJyYXkoX3JlZjYsIDIpO1xuXG4gICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IF9yZWY3WzBdO1xuICAgICAgICAgICAgICB2YXIgc3R5bGVzID0gX3JlZjdbMV07XG5cbiAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yLmluZGV4T2YoJy4nICsgY2xzKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlzTG9va0NsYXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcHNldWRvID0gc2VsZWN0b3IucmVwbGFjZShuZXcgUmVnRXhwKCcuJyArIGNscywgJ2cnKSwgJycpO1xuICAgICAgICAgICAgICAgIGNsYXNzTWFwcGluZy5zZXQoY2xzLCBuZXdDbGFzcyk7XG4gICAgICAgICAgICAgICAgLy8gQWxzbyBvdmVyd3JpdGUgbWVkaWEgcXVlcnkgc2VsZWN0b3JzXG4gICAgICAgICAgICAgICAgU3R5bGVDb250YWluZXIuYWRkKCcuJyArIG5ld0NsYXNzICsgcHNldWRvLCBzdHlsZXMsIG1lZGlhKTtcbiAgICAgICAgICAgICAgICBTdHlsZUNvbnRhaW5lci5tZWRpYVF1ZXJpZXMuZ2V0KG1lZGlhKS5kZWxldGUoJy4nICsgY2xzICsgcHNldWRvKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBDb25jYXRzIHRoZSBuZXcgY2xhc3NOYW1lIG9yIHVzZXMgdGhlIG9sZCBjbGFzc05hbWVcbiAgICAgICAgICAvLyBpZiBpdCBpcyBub3QgcHJvdmlkZWQgYnkgTG9va1xuICAgICAgICAgIGNsYXNzTmFtZSArPSAoY2xhc3NOYW1lICE9PSAnJyA/ICcgJyA6ICcnKSArIChpc0xvb2tDbGFzcyA/IG5ld0NsYXNzIDogY2xzKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjbGFzc05hbWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9LCAnJyk7XG4gIH1cblxuICAvLyBGb3JjZXMgTG9vayB0byBjbG9uZSB0aGUgZWxlbWVudFxuICBuZXdQcm9wcy5fbG9va1Nob3VsZFVwZGF0ZSA9IHRydWU7XG4gIC8vIFNldHMgYSBmbGFnIHRvIGJlIGFibGUgdG8gc2tpcCByZXNvbHZpbmcgbmV4dCB0aW1lXG4gIG5ld1Byb3BzLl9oYXNGcmllbmRseUNsYXNzTmFtZXMgPSB0cnVlO1xuXG4gIHJldHVybiBzdHlsZXM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsaW50ZXI7XG5cbnZhciBfaW5saW5lU3R5bGVMaW50ZXIgPSByZXF1aXJlKCdpbmxpbmUtc3R5bGUtbGludGVyJyk7XG5cbnZhciBfaW5saW5lU3R5bGVMaW50ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5saW5lU3R5bGVMaW50ZXIpO1xuXG52YXIgX3JlYWN0TG9va0NvcmUgPSByZXF1aXJlKCdyZWFjdC1sb29rLWNvcmUnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGdldENoaWxkVHlwZSA9IF9yZWFjdExvb2tDb3JlLlV0aWxzLmdldENoaWxkVHlwZTtcbmZ1bmN0aW9uIGxpbnRlcihfcmVmKSB7XG4gIHZhciBzdHlsZXMgPSBfcmVmLnN0eWxlcztcbiAgdmFyIENvbXBvbmVudCA9IF9yZWYuQ29tcG9uZW50O1xuICB2YXIgZWxlbWVudCA9IF9yZWYuZWxlbWVudDtcbiAgdmFyIGxpbnRlciA9IF9yZWYuY29uZmlnLmxpbnRlcjtcblxuICB2YXIgd2FybmluZ3MgPSBuZXcgX2lubGluZVN0eWxlTGludGVyMi5kZWZhdWx0KGxpbnRlcikubGludChzdHlsZXMpO1xuXG4gIHdhcm5pbmdzLmZvckVhY2goZnVuY3Rpb24gKHdhcm5pbmcpIHtcbiAgICBpZiAoIWxpbnRlci5tdXRlKSB7XG4gICAgICBpZiAobGludGVyICYmIGxpbnRlci5vbmx5TG9nSGludCkge1xuICAgICAgICBjb25zb2xlLndhcm4oQ29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lICsgJzwnICsgZ2V0Q2hpbGRUeXBlKGVsZW1lbnQpICsgJz46ICcgKyB3YXJuaW5nLmhpbnQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybihDb21wb25lbnQuY29uc3RydWN0b3IuZGlzcGxheU5hbWUgKyAnPCcgKyBnZXRDaGlsZFR5cGUoZWxlbWVudCkgKyAnPjogJyArIHdhcm5pbmcuaGludCwgd2FybmluZyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN0eWxlcztcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9QcmVmaXhlcjIgPSByZXF1aXJlKCcuLi9hcGkvUHJlZml4ZXInKTtcblxudmFyIF9QcmVmaXhlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QcmVmaXhlcjIpO1xuXG52YXIgX2lubGluZVN0eWxlUHJlZml4ZXIgPSByZXF1aXJlKCdpbmxpbmUtc3R5bGUtcHJlZml4ZXInKTtcblxudmFyIF9pbmxpbmVTdHlsZVByZWZpeGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lubGluZVN0eWxlUHJlZml4ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogRHluYW1pYyBQcmVmaXhlciB3aGljaCB2YWxpZGF0ZSB0aGUgdXNlckFnZW50IHRvIHByZWZpeCBzdHlsZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyQWdlbnQgLSBvcHRpb25hbCB1c2VyQWdlbnQgdGhhdCBnZXRzIHVzZWQgdG8gZ2F0aGVyIGluZm9ybWF0aW9uIG9uIHByZWZpeGVzXG4gKi9cblxudmFyIER5bmFtaWNQcmVmaXhlciA9IGZ1bmN0aW9uIChfUHJlZml4ZXIpIHtcbiAgX2luaGVyaXRzKER5bmFtaWNQcmVmaXhlciwgX1ByZWZpeGVyKTtcblxuICBmdW5jdGlvbiBEeW5hbWljUHJlZml4ZXIoY29uZmlnKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIER5bmFtaWNQcmVmaXhlcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHluYW1pY1ByZWZpeGVyKS5jYWxsKHRoaXMpKTtcblxuICAgIF90aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICBfdGhpcy5fcHJlZml4ZXIgPSBuZXcgX2lubGluZVN0eWxlUHJlZml4ZXIyLmRlZmF1bHQoY29uZmlnKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRHluYW1pY1ByZWZpeGVyLCBbe1xuICAgIGtleTogJ3ByZWZpeCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZWZpeChzdHlsZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wcmVmaXhlci5wcmVmaXgoc3R5bGVzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRLZXlmcmFtZXNQcmVmaXgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRLZXlmcmFtZXNQcmVmaXgoKSB7XG4gICAgICB2YXIga2V5ZnJhbWVzUHJlZml4ID0gW3RoaXMuX3ByZWZpeGVyLmNzc1ByZWZpeF07XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcua2VlcFVucHJlZml4ZWQgPyBrZXlmcmFtZXNQcmVmaXguY29uY2F0KCcnKSA6IGtleWZyYW1lc1ByZWZpeDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRHluYW1pY1ByZWZpeGVyO1xufShfUHJlZml4ZXIzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEeW5hbWljUHJlZml4ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfUHJlZml4ZXIyID0gcmVxdWlyZSgnLi4vYXBpL1ByZWZpeGVyJyk7XG5cbnZhciBfUHJlZml4ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJlZml4ZXIyKTtcblxudmFyIF9pbmxpbmVTdHlsZVByZWZpeEFsbCA9IHJlcXVpcmUoJ2lubGluZS1zdHlsZS1wcmVmaXgtYWxsJyk7XG5cbnZhciBfaW5saW5lU3R5bGVQcmVmaXhBbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5saW5lU3R5bGVQcmVmaXhBbGwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogRHluYW1pYyBQcmVmaXhlciB3aGljaCB2YWxpZGF0ZSB0aGUgdXNlckFnZW50IHRvIHByZWZpeCBzdHlsZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyQWdlbnQgLSBvcHRpb25hbCB1c2VyQWdlbnQgdGhhdCBnZXRzIHVzZWQgdG8gZ2F0aGVyIGluZm9ybWF0aW9uIG9uIHByZWZpeGVzXG4gKi9cblxudmFyIFN0YXRpY1ByZWZpeGVyID0gZnVuY3Rpb24gKF9QcmVmaXhlcikge1xuICBfaW5oZXJpdHMoU3RhdGljUHJlZml4ZXIsIF9QcmVmaXhlcik7XG5cbiAgZnVuY3Rpb24gU3RhdGljUHJlZml4ZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0YXRpY1ByZWZpeGVyKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RhdGljUHJlZml4ZXIpLmNhbGwodGhpcykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFN0YXRpY1ByZWZpeGVyLCBbe1xuICAgIGtleTogJ3ByZWZpeCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZWZpeChzdHlsZXMpIHtcbiAgICAgIHJldHVybiAoMCwgX2lubGluZVN0eWxlUHJlZml4QWxsMi5kZWZhdWx0KShzdHlsZXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldEtleWZyYW1lc1ByZWZpeCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEtleWZyYW1lc1ByZWZpeCgpIHtcbiAgICAgIHJldHVybiBbJy13ZWJraXQtJywgJy1tb3otJywgJyddO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTdGF0aWNQcmVmaXhlcjtcbn0oX1ByZWZpeGVyMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3RhdGljUHJlZml4ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3RMb29rQ29yZSA9IHJlcXVpcmUoJ3JlYWN0LWxvb2stY29yZScpO1xuXG52YXIgX2ZhbGxiYWNrVmFsdWUgPSByZXF1aXJlKCcuLi9wbHVnaW5zL2ZhbGxiYWNrVmFsdWUnKTtcblxudmFyIF9mYWxsYmFja1ZhbHVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZhbGxiYWNrVmFsdWUpO1xuXG52YXIgX2V4dHJhY3RDU1MgPSByZXF1aXJlKCcuLi9taXhpbnMvZXh0cmFjdENTUycpO1xuXG52YXIgX2V4dHJhY3RDU1MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0cmFjdENTUyk7XG5cbnZhciBfcGxhdGZvcm1RdWVyeSA9IHJlcXVpcmUoJy4uL21peGlucy9wbGF0Zm9ybVF1ZXJ5Jyk7XG5cbnZhciBfcGxhdGZvcm1RdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbGF0Zm9ybVF1ZXJ5KTtcblxudmFyIF9zdWJzdHIgPSByZXF1aXJlKCcuLi9taXhpbnMvc3Vic3RyJyk7XG5cbnZhciBfc3Vic3RyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N1YnN0cik7XG5cbnZhciBfU3RhdGljUHJlZml4ZXIgPSByZXF1aXJlKCcuLi9wcmVmaXhlci9TdGF0aWNQcmVmaXhlcicpO1xuXG52YXIgX1N0YXRpY1ByZWZpeGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0YXRpY1ByZWZpeGVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG1peGluID0gX3JlYWN0TG9va0NvcmUuUGx1Z2lucy5taXhpbjtcbnZhciBzdGF0ZWZ1bFZhbHVlID0gX3JlYWN0TG9va0NvcmUuUGx1Z2lucy5zdGF0ZWZ1bFZhbHVlO1xudmFyIHN0YXRlZnVsU2VsZWN0b3IgPSBfcmVhY3RMb29rQ29yZS5QbHVnaW5zLnN0YXRlZnVsU2VsZWN0b3I7XG52YXIgY29uZGl0aW9uID0gX3JlYWN0TG9va0NvcmUuTWl4aW5zLmNvbmRpdGlvbjtcbnZhciBjb250YWlucyA9IF9yZWFjdExvb2tDb3JlLk1peGlucy5jb250YWlucztcbnZhciBleHRlbmQgPSBfcmVhY3RMb29rQ29yZS5NaXhpbnMuZXh0ZW5kO1xudmFyIGVxdWFsID0gY29uZGl0aW9uLmVxdWFsO1xudmFyIHVuRXF1YWwgPSBjb25kaXRpb24udW5FcXVhbDtcbnZhciBncmVhdGVyID0gY29uZGl0aW9uLmdyZWF0ZXI7XG52YXIgbGVzcyA9IGNvbmRpdGlvbi5sZXNzO1xudmFyIGdyZWF0ZXJUaGFuID0gY29uZGl0aW9uLmdyZWF0ZXJUaGFuO1xudmFyIGxlc3NUaGFuID0gY29uZGl0aW9uLmxlc3NUaGFuO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBwcmVmaXhlcjogbmV3IF9TdGF0aWNQcmVmaXhlcjIuZGVmYXVsdCgpLFxuICBwbHVnaW5zOiBbc3RhdGVmdWxWYWx1ZSwgc3RhdGVmdWxTZWxlY3RvciwgbWl4aW4sIF9mYWxsYmFja1ZhbHVlMi5kZWZhdWx0XSxcbiAgbWl4aW5zOiB7XG4gICAgLy8gQ29uZGl0aW9uc1xuICAgIC8vIE5PVEU6IENvbmRpdGlvbiBvcmRlciBtYXR0ZXJzXG4gICAgJz49JzogZ3JlYXRlclRoYW4sXG4gICAgJzw9JzogbGVzc1RoYW4sXG4gICAgJyE9JzogdW5FcXVhbCxcbiAgICAnPic6IGdyZWF0ZXIsXG4gICAgJzwnOiBsZXNzLFxuICAgICc9JzogZXF1YWwsXG5cbiAgICAvLyBPdGhlclxuICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgIGNvbnRhaW5zOiBjb250YWlucyxcbiAgICBzdWJzdHI6IF9zdWJzdHIyLmRlZmF1bHQsXG5cbiAgICAvLyBDU1MgZXh0cmFjdGlvblxuICAgIGNzczogX2V4dHJhY3RDU1MyLmRlZmF1bHQsXG5cbiAgICAvLyBRdWVyaWVzXG4gICAgJ0BwbGF0Zm9ybSc6IF9wbGF0Zm9ybVF1ZXJ5Mi5kZWZhdWx0XG4gIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIENvbnZlcnRzIGEgY2FtZWwtY2FzZSBzdHJpbmcgdG8gYSBkYXNoLWNhc2Ugc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gc3RyIHRoYXQgZ2V0cyBjb252ZXJ0ZWQgdG8gZGFzaC1jYXNlXG4gKi9cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbYS16XXxeKShbQS1aXSkvZywgZnVuY3Rpb24gKG1hdGNoLCBwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEgKyAnLScgKyBwMi50b0xvd2VyQ2FzZSgpO1xuICB9KS5yZXBsYWNlKCdtcy0nLCAnLW1zLScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBnZW5lcmF0ZUhhc2hDb2RlO1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSBoYXNoY29kZSBmcm9tIGEgc3RyaW5nXG4gKiBUYWtlbiBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc2MTY0ODRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBzdHIgdXNlZCB0byBnZW5lcmF0ZSB0aGUgdW5pcXVlIGhhc2ggY29kZVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUhhc2hDb2RlKHN0cikge1xuICB2YXIgaGFzaCA9IDA7XG4gIHZhciBpdGVyYXRvciA9IHZvaWQgMDtcbiAgdmFyIGNoYXIgPSB2b2lkIDA7XG4gIHZhciBsZW5ndGggPSBzdHIubGVuZ3RoO1xuXG4gIGlmIChsZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gaGFzaDtcbiAgfVxuXG4gIGZvciAoaXRlcmF0b3IgPSAwOyBpdGVyYXRvciA8IGxlbmd0aDsgKytpdGVyYXRvcikge1xuICAgIGNoYXIgPSBzdHIuY2hhckNvZGVBdChpdGVyYXRvcik7XG4gICAgaGFzaCA9IChoYXNoIDw8IDUpIC0gaGFzaCArIGNoYXI7XG4gICAgaGFzaCB8PSAwO1xuICB9XG5cbiAgcmV0dXJuIGhhc2gudG9TdHJpbmcoMzYpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0Rm9udEZvcm1hdDtcbnZhciBmb3JtYXRzID0ge1xuICAnLndvZmYnOiAnd29mZicsXG4gICcuZW9mJzogJ2VvZicsXG4gICcudHRmJzogJ3RydWV0eXBlJyxcbiAgJy5zdmcnOiAnc3ZnJ1xufTtcblxuLy8gUmV0dXJucyB0aGUgZm9udCBmb3JtYXQgZm9yIGEgc3BlY2lmaWMgZm9udCBzb3VyY2VcbmZ1bmN0aW9uIGdldEZvbnRGb3JtYXQoc3JjKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhmb3JtYXRzKS5yZWR1Y2UoZnVuY3Rpb24gKGZvcm1hdCwgZXh0ZW5zaW9uKSB7XG4gICAgaWYgKHNyYy5pbmRleE9mKGV4dGVuc2lvbikgPiAtMSkge1xuICAgICAgZm9ybWF0ID0gZm9ybWF0c1tleHRlbnNpb25dO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0sIHVuZGVmaW5lZCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNOdW1iZXIgPSByZXF1aXJlKCdsb2Rhc2gvaXNOdW1iZXInKTtcblxudmFyIF9pc051bWJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc051bWJlcik7XG5cbnZhciBfaXNTdHJpbmcgPSByZXF1aXJlKCdsb2Rhc2gvaXNTdHJpbmcnKTtcblxudmFyIF9pc1N0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1N0cmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24gKGlzRHluYW1pYywgaXRlbSkge1xuICAgIGlmICghKDAsIF9pc1N0cmluZzIuZGVmYXVsdCkoaXRlbSkgJiYgISgwLCBfaXNOdW1iZXIyLmRlZmF1bHQpKGl0ZW0pKSB7XG4gICAgICBpc0R5bmFtaWMgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXNEeW5hbWljO1xuICB9LCBmYWxzZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICByZXR1cm4gcHJvcGVydHkuc3Vic3RyKDAsIDYpID09PSAnQG1lZGlhJztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gIHJldHVybiBwcm9wZXJ0eS5jaGFyQXQoMCkgPT09ICc6Jztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNvcnRQc2V1ZG9DbGFzc2VzO1xudmFyIHByZWNlZGVuY2UgPSB7XG4gICc6bGluayc6IDQsXG4gICc6dmlzaXRlZCc6IDMsXG4gICc6aG92ZXInOiAyLFxuICAnOmZvY3VzJzogMS41LFxuICAnOmFjdGl2ZSc6IDFcbn07XG5cbmZ1bmN0aW9uIHNvcnRQc2V1ZG9DbGFzc2VzKGxlZnQsIHJpZ2h0KSB7XG4gIHZhciBwcmVjZWRlbmNlTGVmdCA9IHByZWNlZGVuY2VbbGVmdF07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgdmFyIHByZWNlZGVuY2VSaWdodCA9IHByZWNlZGVuY2VbcmlnaHRdO1xuICAvLyBPbmx5IHNvcnQgaWYgYm90aCBwcm9wZXJ0aWVzIGFyZSBsaXN0ZWRcbiAgLy8gVGhpcyBwcmV2ZW50cyBvdGhlciBwc2V1ZG9zIGZyb20gcmVvcmRlcmluZ1xuICBpZiAocHJlY2VkZW5jZUxlZnQgJiYgcHJlY2VkZW5jZVJpZ2h0KSB7XG4gICAgcmV0dXJuIHByZWNlZGVuY2VMZWZ0IDwgcHJlY2VkZW5jZVJpZ2h0ID8gMSA6IC0xO1xuICB9XG4gIHJldHVybiAwO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiLyoqXG4gKiBBc3NpZ25zIHR3byBzdHlsZXMgYW5kIG9wdGlvbmFsbHkgb3ZlcndyaXRlcyBleGlzdGluZyB2YWx1ZXNcbiAqIEJ1aWx0IHRvIGFzc2lnbiBpbmxpbmUtc3R5bGUgb2JqZWN0cyBhbmQgcmVzcGVjdHMgQ1NTJ3MgIWltcG9ydGFudCBhbm5vdGF0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIC0gc3R5bGUgb2JqZWN0cyB3aGljaCBnZXQgbWVyZ2VkIHRvZ2V0aGVyXG4gKiBOb3RlOiBUaGUgZmlyc3Qgc3R5bGUgb2JqZWN0IHdpbGwgc2VydmUgYXMgYmFzZVxuICogRXhpc3RpbmcgdmFsdWVzIHdpbGwgZ2V0IG92ZXJ3cml0dGVuIGJ5IGRlZmF1bHRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGFzc2lnblN0eWxlcztcblxuZnVuY3Rpb24gYXNzaWduU3R5bGVzKCkge1xuICB2YXIgcHJvcGVydHkgPSB1bmRlZmluZWQ7XG5cbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHN0eWxlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHN0eWxlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHZhciBuZXdTdHlsZXMgPSBzdHlsZXMuc3BsaWNlKDEpO1xuICB2YXIgYmFzZSA9IHN0eWxlc1swXTtcblxuICBuZXdTdHlsZXMuZm9yRWFjaChmdW5jdGlvbiAoc3R5bGVPYmopIHtcbiAgICBpZiAoc3R5bGVPYmogaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIE9iamVjdC5rZXlzKHN0eWxlT2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZU9ialtwcm9wZXJ0eV07XG4gICAgICAgIGlmICghKGJhc2UuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIGlzSW1wb3J0YW50KGJhc2VbcHJvcGVydHldKSkpIHtcbiAgICAgICAgICBpZiAoYmFzZVtwcm9wZXJ0eV0gaW5zdGFuY2VvZiBPYmplY3QgJiYgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIGJhc2VbcHJvcGVydHldID0gYXNzaWduU3R5bGVzKHt9LCBiYXNlW3Byb3BlcnR5XSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYXNlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGJhc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgcHJvcGVydHkgdmFsdWUgaXMgYW4gY3NzIGltcG9ydGFudCBydWxlIHdpdGggIWltcG9ydGFudFxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IC0gcHJvcGVydHkgdGhhdHMgdmFsdWUgZ2V0cyBjaGVja2VkIFxuICovXG52YXIgaXNJbXBvcnRhbnQgPSBmdW5jdGlvbiBpc0ltcG9ydGFudCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignIWltcG9ydGFudCcpID4gLTE7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNPYmplY3QgPSByZXF1aXJlKCcuL3V0aWxzL2lzT2JqZWN0Jyk7XG5cbnZhciBfaXNPYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNPYmplY3QpO1xuXG52YXIgX2lzQXJyYXkgPSByZXF1aXJlKCcuL3V0aWxzL2lzQXJyYXknKTtcblxudmFyIF9pc0FycmF5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQXJyYXkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgTGludGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEluc3RhbnRpYW50ZSBhIG5ldyBsaW50ZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIExpbnRlciBjb25maWd1cmF0aW9ucyBlLmcuIHBsdWdpbnNcbiAgICovXG5cbiAgZnVuY3Rpb24gTGludGVyKGNvbmZpZykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMaW50ZXIpO1xuXG4gICAgLy8gY29uZmlndXJhdGlvbiB3aXRoIHBsdWdpbnMgbXVzdCBiZSBwcm92aWRlZFxuICAgIGlmICghKDAsIF9pc09iamVjdDIuZGVmYXVsdCkoY29uZmlnKSB8fCAhKDAsIF9pc0FycmF5Mi5kZWZhdWx0KShjb25maWcucGx1Z2lucykpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgYSBjb25maWd1cmF0aW9uIG9iamVjdCB3aGljaCBhdCBsZWFzdCBjb250YWlucyBhbiBhcnJheSBvZiBwbHVnaW5zLicpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGNhY2hlIHBsdWdpbnMgYW5kIGNvbmZpZ3VyYXRpb25cbiAgICB0aGlzLnBsdWdpbnMgPSBjb25maWcucGx1Z2lucztcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW50cyB5b3VyIHN0eWxlc1xuICAgKiBAcmV0dXJuIHtPYmplY3RbXX0gcmV0dXJucyBhbiBhcnJheSBvZiB3YXJuaW5nc1xuICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIC0gU3R5bGUgb2JqZWN0IHRoYXQgZ2V0cyBjaGVja2VkXG4gICAqIEBwYXJhbSB7T2JqZWN0P30gZWxlbWVudCAtIGVsZW1lbnQgaW5mb3JtYXRpb25cbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKExpbnRlciwgW3tcbiAgICBrZXk6ICdsaW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGludChzdHlsZXMpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBlbGVtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIC8vIFRocm93IGlmIHN0eWxlcyBpcyBub3QgYW4gb2JqZWN0XG4gICAgICBpZiAoISgwLCBfaXNPYmplY3QyLmRlZmF1bHQpKHN0eWxlcykpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignWW91IG11c3QgcHJvdmlkZSBhIHZhbGlkIHN0eWxlIG9iamVjdC4nKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgd2FybmluZ3MgPSBbXTtcbiAgICAgIC8vIGl0ZXJhdGUgZXZlcnkgcmVnaXN0ZXJlZCBwbHVnaW4gdG8gZ2VuZXJhdGUgd2FybmluZ3NcbiAgICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpbihzdHlsZXMsIGVsZW1lbnQsIHdhcm5pbmdzLCBfdGhpcy5jb25maWcpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB3YXJuaW5ncztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTGludGVyO1xufSkoKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTGludGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7dmFyIGRhc2hUb0NhbWVsQ2FzZT1mdW5jdGlvbiBkYXNoVG9DYW1lbENhc2Uoc3RyKXtyZXR1cm4gc3RyLnJlcGxhY2UoLy0oW2Etel0pL2csZnVuY3Rpb24obWF0Y2gpe3JldHVybiBtYXRjaFsxXS50b1VwcGVyQ2FzZSgpfSkucmVwbGFjZSgvXk1zL2csJ21zJyl9O2V4cG9ydHMuZGVmYXVsdD17YWxpZ25Db250ZW50Ont2YWx1ZTp7aW5pdGlhbDonc3RyZXRjaCcsa2V5d29yZHM6WydjZW50ZXInLCdmbGV4LWVuZCcsJ2ZsZXgtc3RhcnQnLCdzcGFjZS1hcm91bmQnLCdzcGFjZS1iZXR3ZWVuJywnc3RyZXRjaCddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LGFsaWduU2VsZjp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYmFzZWxpbmUnLCdjZW50ZXInLCdmbGV4LWVuZCcsJ2ZsZXgtc3RhcnQnLCdzdHJldGNoJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kcm9pZDo0LjQsY2hyb21lOjIxLGVkZ2U6MTIsZmlyZWZveDoyOCxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTo2LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTIsc2FmYXJpOjB9fX0sYWxpZ25JdGVtczp7dmFsdWU6e2luaXRpYWw6J3N0cmV0Y2gnLGtleXdvcmRzOlsnYmFzZWxpbmUnLCdjZW50ZXInLCdmbGV4LWVuZCcsJ2ZsZXgtc3RhcnQnLCdzdHJldGNoJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kcm9pZDo0LjQsY2hyb21lOjIxLGVkZ2U6MTIsZmlyZWZveDoyOCxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTo2LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTIsc2FmYXJpOjB9fX0sYWxpZ25tZW50QmFzZWxpbmU6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdhZnRlci1lZGdlJywnYWxwaGFiZXRpYycsJ2Jhc2VsaW5lJywnYmVmb3JlLWVkZ2UnLCdjZW50cmFsJywnaGFuZ2luZycsJ2lkZW9ncmFwaGljJywnbWF0aGVtYXRpY2FsJywnbWlkZGxlJywndGV4dC1hZnRlci1lZGdlJywndGV4dC1iZWZvcmUtZWRnZScsJ3VzZS1zY3JpcHQnXX19LGFuaW1hdGlvbjp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGxvbmdoYW5kczpbJ2FuaW1hdGlvbk5hbWUnLCdhbmltYXRpb25EdXJhdGlvbicsJ2FuaW1hdGlvblRpbWluZ0Z1bmN0aW9uJywnYW5pbWF0aW9uRGVsYXknLCdhbmltYXRpb25JdGVyYXRpb25Db3VudCcsJ2FuaW1hdGlvbkRpcmVjdGlvbicsJ2FuaW1hdGlvbkZpbGxNb2RlJywnYW5pbWF0aW9uUGxheVN0YXRlJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjUsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEyLHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjQsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjExLjYsc2FmYXJpOjMuMn19fSxhbmltYXRpb25EZWxheTp7dmFsdWU6e2luaXRpYWw6MCx0aW1lOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjUsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEyLHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjQsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjExLjYsc2FmYXJpOjMuMn19fSxhbmltYXRpb25EaXJlY3Rpb246e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnYWx0ZXJuYXRlJywnYWx0ZXJuYXRlLXJldmVyc2UnLCdub3JtYWwnLCdyZXZlcnNlJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjUsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEyLHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjQsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjExLjYsc2FmYXJpOjMuMn19fSxhbmltYXRpb25EdXJhdGlvbjp7dmFsdWU6e2luaXRpYWw6MCx0aW1lOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjUsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEyLHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjQsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjExLjYsc2FmYXJpOjMuMn19fSxhbmltYXRpb25GaWxsTW9kZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnYmFja3dhcmRzJywnYm90aCcsJ2ZvcndhcmRzJywnbm9uZSddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDoyLjQsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjUsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEyLHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjQsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjExLjYsc2FmYXJpOjMuMn19fSxhbmltYXRpb25JdGVyYXRpb25Db3VudDp7dmFsdWU6e2luaXRpYWw6MSxmbG9hdDp0cnVlLGtleXdvcmRzOlsnaW5maW5pdGUnXSxwb3NpdGl2ZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo1LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMixzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDo0LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMS42LHNhZmFyaTozLjJ9fX0sYW5pbWF0aW9uTmFtZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnbm9uZSddLHN0cmluZzp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo1LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMixzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDo0LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMS42LHNhZmFyaTozLjJ9fX0sYW5pbWF0aW9uUGxheVN0YXRlOnt2YWx1ZTp7aW5pdGlhbDoncnVubmluZycsa2V5d29yZHM6WydwYXVzZWQnLCdydW5uaW5nJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjUsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEyLHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjQsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjExLjYsc2FmYXJpOjMuMn19fSxhbmltYXRpb25UaW1pbmdGdW5jdGlvbjp7dmFsdWU6e2N1YmljQmV6aWVyOnRydWUsaW5pdGlhbDonZWFzZScsa2V5d29yZHM6WydlYXNlJywnZWFzZS1pbicsJ2Vhc2UtaW4tb3V0JywnZWFzZS1vdXQnLCdsaW5lYXInLCdzdGVwLWVuZCcsJ3N0ZXAtc3RhcnQnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NCxjaHJvbWU6NCxlZGdlOjEyLGZpcmVmb3g6NSxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTIsc2FmYXJpOjR9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6NCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTEuNixzYWZhcmk6My4yfX19LGFwcGVhcmFuY2U6e3ZhbHVlOntpbml0aWFsOidub25lJ30sY29tcGF0aWJpbGl0eTp7aXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0nYXV0byd9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnYXV0b1xcJy4nfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6MTEsaWVfbW9iOjEwLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6MH19fSwgLy8gVE9ETzogY29tcGxldGVcbmJhY2tkcm9wRmlsdGVyOntjb21wYXRpYmlsaXR5OntmdWxsOntpb3Nfc2FmOjksc2FmYXJpOjl9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjE0LGZpcmVmb3g6NDYsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6OC4xLG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6OH19fSxiYWNrZmFjZVZpc2liaWxpdHk6e3ZhbHVlOntpbml0aWFsOid2aXNpYmxlJyxrZXl3b3JkczpbJ2hpZGRlbicsJ3Zpc2libGUnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6MyxjaHJvbWU6MTIsZWRnZToxMixmaXJlZm94OjEwLGlvc19zYWY6My4yLG9wZXJhOjE1LHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDoyLjMsY2hyb21lOjExLGVkZ2U6MCxmaXJlZm94OjksaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxiYWNrZ3JvdW5kOnt2YWx1ZTp7aW5pdGlhbDowfSxsb25naGFuZHM6WydiYWNrZ3JvdW5kQXR0YWNobWVudCcsJ2JhY2tncm91bmRCbGVuZE1vZGUnLCdiYWNrZ3JvdW5kQ2xpcCcsJ2JhY2tncm91bmRDb2xvcicsJ2JhY2tncm91bmRJbWFnZScsJ2JhY2tncm91bmRPcmlnaW4nLCdiYWNrZ3JvdW5kUG9zaXRpb24nLCdiYWNrZ3JvdW5kUG9zaXRpb25YJywnYmFja2dyb3VuZFBvc2l0aW9uWScsJ2JhY2tncm91bmRSZXBlYXQnLCdiYWNrZ3JvdW5kUmVwZWF0WCcsJ2JhY2tncm91bmRSZXBlYXRZJywnYmFja2dyb3VuZFNpemUnXX0sYmFja2dyb3VuZEF0dGFjaG1lbnQ6e3ZhbHVlOntpbml0aWFsOidzY3JvbGwnLGtleXdvcmRzOlsnZml4ZWQnLCdsb2NhbCcsJ3Njcm9sbCddfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6W3tjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0nbG9jYWwnfSxicm93c2VyOntmaXJlZm94Ont1cHRvOjI0fSxvcGVyYToxMC4xLGFuZHJvaWQ6e2Zyb206NC4xLHRvOjQuM30saWU6e3VwdG86OH0sc2FmYXJpOnt1cHRvOjN9LGFuZF91Yzp0cnVlfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2xvY2FsXFwnLid9LHtjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0nZml4ZWQnfSxicm93c2VyOntpb3Nfc2FmOnt1cHRvOjcuMX0sYW5kX2Nocjp0cnVlfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2xvY2FsXFwnLid9LHticm93c2VyOntvcF9taW5pOnRydWV9LGhpbnQ6J2lzIG5vdCBzdXBwb3J0ZWQuJ31dfX0sYmFja2dyb3VuZEJsZW5kTW9kZTp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6Wydjb2xvcicsJ2NvbG9yLWJ1cm4nLCdjb2xvci1kb2RnZScsJ2RhcmtlbicsJ2RpZmZlcmVuY2UnLCdleGNsdXNpb24nLCdoYXJkLWxpZ2h0JywnaHVlJywnbGlnaHRlbicsJ2x1bWlub3NpdHknLCdtdWx0aXBseScsJ25vcm1hbCcsJ292ZXJsYXknLCdzYXR1cmF0aW9uJywnc2NyZWVuJywnc29mdC1saWdodCddfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6W3tjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL2h1ZXxzYXR1cmF0aW9ufGNvbG9yfGx1bWlub3NpdHkvKSE9PW51bGx9LGJyb3dzZXI6e3NhZmFyaTp7dXB0bzo5fSxpb3Nfc2FmOnt1cHRvOjkuMn19LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnaHVlXFwnLCBcXCdzYXR1cmF0aW9uXFwnLCBcXCdjb2xvclxcJyBhbmQgXFwnbHVtaW5vc2l0eVxcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9bLF0vKSE9PW51bGx9LGJyb3dzZXI6e2lvc19zYWY6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBibGVuZC1tb2Rlcy4nfV19fSxiYWNrZ3JvdW5kQ2xpcDp7dmFsdWU6e2luaXRpYWw6J2JvcmRlci1ib3gnLGtleXdvcmRzOlsnYm9yZGVyLWJveCcsJ2NvbnRlbnQtYm94JywncGFkZGluZy1ib3gnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZToxNSxlZGdlOjEyLGZpcmVmb3g6NCxpZTo5LGllX21vYjoxMCxpb3Nfc2FmOjcsb3BlcmE6MTAuNSxzYWZhcmk6N30scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDozLjUsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjkuNSxzYWZhcmk6MH19fSxiYWNrZ3JvdW5kQ29sb3I6e3ZhbHVlOntjb2xvcjp0cnVlLGluaXRpYWw6J3RyYW5zcGFyZW50J319LGJhY2tncm91bmRJbWFnZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnbm9uZSddLHVybDp0cnVlfSxjb21wYXRpYmlsaXR5OnsgLy8gc2hvcnRoYW5kIGJhY2tncm91bmQgdG8gY2hlY2sgdG9vXG5pc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvWy5dc3ZnLykhPT1udWxsfSxicm93c2VyOntzYWZhcmk6e3VwdG86NH0saW9zX3NhZjp7dXB0bzo0LjF9fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2JhY2tncm91bmRQb3NpdGlvblxcJyBpZiB0aGUgYmFja2dyb3VuZCBpcyBhIHN2ZyBpbWFnZS4nfX19LGJhY2tncm91bmRPcmlnaW46e3ZhbHVlOntpbml0aWFsOidwYWRkaW5nLWJveCcsa2V5d29yZHM6Wydib3JkZXItYm94JywnY29udGVudC1ib3gnLCdwYWRkaW5nLWJveCddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjE1LGVkZ2U6MTIsZmlyZWZveDo0LGllOjksaWVfbW9iOjEwLGlvc19zYWY6NyxvcGVyYToxMC41LHNhZmFyaTo3fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMuNSxpZTo4LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6OS41LHNhZmFyaTowfX19LGJhY2tncm91bmRQb3NpdGlvbjp7dmFsdWU6e2luaXRpYWw6JzAgMCd9LGxvbmdoYW5kczpbJ2JhY2tncm91bmRQb3NpdGlvblgnLCdiYWNrZ3JvdW5kUG9zaXRpb25ZJ119LGJhY2tncm91bmRQb3NpdGlvblg6e3ZhbHVlOntpbml0aWFsOjAsa2V5d29yZHM6Wydib3R0b20nLCdjZW50ZXInLCdsZWZ0JywncmlnaHQnLCd0b3AnXX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOnticm93c2VyOntpZTo5fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2NhbGMoKVxcJy4nfX19LGJhY2tncm91bmRQb3NpdGlvblk6e3ZhbHVlOntpbml0aWFsOjAsa2V5d29yZHM6Wydib3R0b20nLCdjZW50ZXInLCdsZWZ0JywncmlnaHQnLCd0b3AnXX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOnticm93c2VyOntpZTo5fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2NhbGMoKVxcJy4nfX19LGJhY2tncm91bmRSZXBlYXQ6e3ZhbHVlOntpbml0aWFsOidyZXBlYXQnLGtleXdvcmRzOlsnbm8tcmVwZWF0JywncmVwZWF0JywncmVwZWF0LXgnLCdyZXBlYXQteSddfSxsb25naGFuZHM6WydiYWNrZ3JvdW5kUmVwZWF0WCcsJ2JhY2tncm91bmRSZXBlYXRZJ119LGJhY2tncm91bmRSZXBlYXRYOnt2YWx1ZTp7aW5pdGlhbDoncmVwZWF0JyxrZXl3b3JkczpbJ25vLXJlcGVhdCcsJ3JlcGVhdCcsJ3JlcGVhdC14JywncmVwZWF0LXknXX19LGJhY2tncm91bmRSZXBlYXRZOnt2YWx1ZTp7aW5pdGlhbDoncmVwZWF0JyxrZXl3b3JkczpbJ25vLXJlcGVhdCcsJ3JlcGVhdCcsJ3JlcGVhdC14JywncmVwZWF0LXknXX19LGJhY2tncm91bmRTaXplOnt2YWx1ZTp7aW5pdGlhbDonYXV0byBhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdjb250YWluJywnY292ZXInXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MTUsZWRnZToxMixmaXJlZm94OjQsaWU6OSxpZV9tb2I6MTAsaW9zX3NhZjo3LG9wZXJhOjEwLjUsc2FmYXJpOjd9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6My41LGllOjgsaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYTo5LjUsc2FmYXJpOjB9LGlzc3Vlczpbe2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvJS8pIT09bnVsbH0sYnJvd3Nlcjp7YW5kcm9pZDp7dXB0bzo0LjN9fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IHBlcmNlbnRhZ2UgdmFsdWVzLid9LHticm93c2VyOntvcF9taW5pOnRydWV9LGhpbnQ6J2lzIG5vdCBzdXBwb3J0ZWQuJ31dfX0sYmFzZWxpbmVTaGlmdDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYmFzZWxpbmUnLCdzdWInLCdzdXBlcicsJ2F1dG8nXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxib3JkZXI6e3ZhbHVlOntpbml0aWFsOjAsa2V5d29yZHM6Wydub25lJ119LGxvbmdoYW5kczpbJ2JvcmRlcldpZHRoJywnYm9yZGVyU3R5bGUnLCdib3JkZXJDb2xvciddfSxib3JkZXJCb3R0b206e3ZhbHVlOntpbml0aWFsOjAsa2V5d29yZHM6Wydub25lJ119LGxvbmdoYW5kczpbJ2JvcmRlckJvdHRvbVdpZHRoJywnYm9yZGVyQm90dG9tU3R5bGUnLCdib3JkZXJCb3R0b21Db2xvciddfSxib3JkZXJCb3R0b21Db2xvcjp7dmFsdWU6e2NvbG9yOnRydWUsaW5pdGlhbDonaW5oZXJpdCd9fSxib3JkZXJCb3R0b21MZWZ0UmFkaXVzOnt2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOnt2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LGJvcmRlckJvdHRvbVN0eWxlOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydkYXNoZWQnLCdkb3R0ZWQnLCdkb3VibGUnLCdncm9vdmUnLCdoaWRkZW4nLCdpbnNldCcsJ25vbmUnLCdvdXRzZXQnLCdyaWRnZScsJ3NvbGlkJ119fSxib3JkZXJCb3R0b21XaWR0aDp7dmFsdWU6e2luaXRpYWw6J21lZGl1bScsa2V5d29yZHM6WydtZWRpdW0nLCd0aGljaycsJ3RoaW4nXSxsZW5ndGg6dHJ1ZX19LGJvcmRlckNvbGxhcHNlOnt2YWx1ZTp7aW5pdGlhbDonc2VwYXJhdGUnLGtleXdvcmRzOlsnY29sbGFwc2UnLCdzZXBlcmF0ZSddfX0sYm9yZGVyQ29sb3I6e3ZhbHVlOntjb2xvcjp0cnVlLGluaXRpYWw6J2luaGVyaXQnfSxsb25naGFuZHM6Wydib3JkZXJUb3BDb2xvcicsJ2JvcmRlclJpZ2h0Q29sb3InLCdib3JkZXJCb3R0b21Db2xvcicsJ2JvcmRlckxlZnRDb2xvciddfSxib3JkZXJJbWFnZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnfSxsb25naGFuZHM6Wydib3JkZXJJbWFnZU91dHNldCcsJ2JvcmRlckltYWdlUmVwZWF0JywnYm9yZGVySW1hZ2VTbGljZScsJ2JvcmRlckltYWdlU291cmNlJywnYm9yZGVySW1hZ2VXaWR0aCddLGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MTUsZWRnZToxMixmaXJlZm94OjE1LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BlcmE6MTUsc2FmYXJpOjZ9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MyxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMCxzYWZhcmk6MH19fSxib3JkZXJJbWFnZU91dHNldDp7dmFsdWU6e2luaXRpYWw6MCxmbG9hdDp0cnVlLGxlbmd0aDp0cnVlLHBvc2l0aXZlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MTUsZWRnZToxMixmaXJlZm94OjE1LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BlcmE6MTUsc2FmYXJpOjZ9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MyxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMCxzYWZhcmk6MH19fSxib3JkZXJJbWFnZVJlcGVhdDp7dmFsdWU6e2luaXRpYWw6J3N0cmV0Y2gnLGtleXdvcmRzOlsncmVwZWF0Jywncm91bmQnLCdzdHJldGNoJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MTUsZWRnZToxMixmaXJlZm94OjE1LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BlcmE6MTUsc2FmYXJpOjZ9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MyxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMCxzYWZhcmk6MH19fSxib3JkZXJJbWFnZVNsaWNlOnt2YWx1ZTp7aW5pdGlhbDonMTAwJScsZmxvYXQ6dHJ1ZSxrZXl3b3JkczpbJ2ZpbGwnXSxwZXJjZW50YWdlOnRydWUscG9zaXRpdmU6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZToxNSxlZGdlOjEyLGZpcmVmb3g6MTUsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NixvcGVyYToxNSxzYWZhcmk6Nn0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDozLGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEwLHNhZmFyaTowfX19LGJvcmRlckltYWdlU291cmNlOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6Wydub25lJ10sdXJsOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MTUsZWRnZToxMixmaXJlZm94OjE1LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BlcmE6MTUsc2FmYXJpOjZ9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MyxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMCxzYWZhcmk6MH19fSxib3JkZXJJbWFnZVdpZHRoOnt2YWx1ZTp7aW5pdGlhbDoxLGZsb2F0OnRydWUsbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlLHBvc2l0aXZlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MTUsZWRnZToxMixmaXJlZm94OjE1LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BlcmE6MTUsc2FmYXJpOjZ9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MyxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMCxzYWZhcmk6MH19fSxib3JkZXJMZWZ0Ont2YWx1ZTp7aW5pdGlhbDowLGtleXdvcmRzOlsnbm9uZSddfSxsb25naGFuZHM6Wydib3JkZXJMZWZ0V2lkdGgnLCdib3JkZXJMZWZ0U3R5bGUnLCdib3JkZXJMZWZ0Q29sb3InXX0sYm9yZGVyTGVmdENvbG9yOnt2YWx1ZTp7Y29sb3I6dHJ1ZSxpbml0aWFsOidpbmhlcml0J319LGJvcmRlckxlZnRTdHlsZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnZGFzaGVkJywnZG90dGVkJywnZG91YmxlJywnZ3Jvb3ZlJywnaGlkZGVuJywnaW5zZXQnLCdub25lJywnb3V0c2V0JywncmlkZ2UnLCdzb2xpZCddfX0sYm9yZGVyTGVmdFdpZHRoOnt2YWx1ZTp7aW5pdGlhbDonbWVkaXVtJyxrZXl3b3JkczpbJ21lZGl1bScsJ3RoaWNrJywndGhpbiddLGxlbmd0aDp0cnVlfX0sYm9yZGVyUmFkaXVzOnt2YWx1ZTp7aW5pdGlhbDowfSxsb25naGFuZHM6Wydib3JkZXJUb3BMZWZ0UmFkaXVzJywnYm9yZGVyVG9wUmlnaHRSYWRpdXMnLCdib3JkZXJCb3R0b21SaWdodFJhZGl1cycsJ2JvcmRlckJvdHRvbUxlZnRSYWRpdXMnXSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDoyLjEsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjMsaWU6OSxpZV9tb2I6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTAuNSxzYWZhcmk6My4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEwLHNhZmFyaTowfX19LGJvcmRlclJpZ2h0Ont2YWx1ZTp7aW5pdGlhbDowLGtleXdvcmRzOlsnbm9uZSddfSxsb25naGFuZHM6Wydib3JkZXJSaWdodFdpZHRoJywnYm9yZGVyUmlnaHRTdHlsZScsJ2JvcmRlclJpZ2h0Q29sb3InXX0sYm9yZGVyUmlnaHRDb2xvcjp7dmFsdWU6e2NvbG9yOnRydWUsaW5pdGlhbDonaW5oZXJpdCd9fSxib3JkZXJSaWdodFN0eWxlOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydkYXNoZWQnLCdkb3R0ZWQnLCdkb3VibGUnLCdncm9vdmUnLCdoaWRkZW4nLCdpbnNldCcsJ25vbmUnLCdvdXRzZXQnLCdyaWRnZScsJ3NvbGlkJ119fSxib3JkZXJSaWdodFdpZHRoOnt2YWx1ZTp7aW5pdGlhbDonbWVkaXVtJyxrZXl3b3JkczpbJ21lZGl1bScsJ3RoaWNrJywndGhpbiddLGxlbmd0aDp0cnVlfX0sYm9yZGVyU3BhY2luZzp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZX19LGJvcmRlclN0eWxlOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydkYXNoZWQnLCdkb3R0ZWQnLCdkb3VibGUnLCdncm9vdmUnLCdoaWRkZW4nLCdpbnNldCcsJ25vbmUnLCdvdXRzZXQnLCdyaWRnZScsJ3NvbGlkJ119LGxvbmdoYW5kczpbJ2JvcmRlclRvcFN0eWxlJywnYm9yZGVyUmlnaHRTdHlsZScsJ2JvcmRlckJvdHRvbVN0eWxlJywnYm9yZGVyTGVmdFN0eWxlJ119LGJvcmRlclRvcDp7dmFsdWU6e2luaXRpYWw6MCxrZXl3b3JkczpbJ25vbmUnXX0sbG9uZ2hhbmRzOlsnYm9yZGVyVG9wV2lkdGgnLCdib3JkZXJUb3BTdHlsZScsJ2JvcmRlclRvcENvbG9yJ119LGJvcmRlclRvcENvbG9yOnt2YWx1ZTp7Y29sb3I6dHJ1ZSxpbml0aWFsOidpbmhlcml0J319LGJvcmRlclRvcExlZnRSYWRpdXM6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sYm9yZGVyVG9wUmlnaHRSYWRpdXM6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sYm9yZGVyVG9wU3R5bGU6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2Rhc2hlZCcsJ2RvdHRlZCcsJ2RvdWJsZScsJ2dyb292ZScsJ2hpZGRlbicsJ2luc2V0Jywnbm9uZScsJ291dHNldCcsJ3JpZGdlJywnc29saWQnXX19LGJvcmRlclRvcFdpZHRoOnt2YWx1ZTp7aW5pdGlhbDonbWVkaXVtJyxrZXl3b3JkczpbJ21lZGl1bScsJ3RoaWNrJywndGhpbiddLGxlbmd0aDp0cnVlfX0sYm9yZGVyV2lkdGg6e3ZhbHVlOntpbml0aWFsOidtZWRpdW0nfSxsb25naGFuZHM6Wydib3JkZXJUb3BXaWR0aCcsJ2JvcmRlclJpZ2h0V2lkdGgnLCdib3JkZXJCb3R0b21XaWR0aCcsJ2JvcmRlckxlZnRXaWR0aCddfSxib3R0b206e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxib3hEZWNvcmF0aW9uQnJlYWs6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2ZpcmVmb3g6MzIsb3BlcmE6MTF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4yLGNocm9tZToyMSxlZGdlOjE0LGZpcmVmb3g6MzEsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NixvcF9taW5pOjAsb3BlcmE6MTAuNixzYWZhcmk6Nn19fSxib3hTaGFkb3c6e3ZhbHVlOntpbml0aWFsOidub25lJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NCxjaHJvbWU6NCxlZGdlOjEyLGZpcmVmb3g6My41LGllOjksaWVfbW9iOjEwLGlvc19zYWY6NCxvcGVyYToxMC41LHNhZmFyaTo1fSxpc3N1ZXM6W3tjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUucmVwbGFjZSgvKHJnYlthXT98aHNsW2FdPylcXCguKlxcKS9nLCcnKS5tYXRjaCgvWyxdLykhPT1udWxsfSxicm93c2VyOntzYWZhcmk6e3VwdG86NH0saW9zX3NhZjp7dXB0bzozLjJ9LGFuZHJvaWQ6e3VwdG86M319LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgbXVsdGlwbGUgc2hhZG93cy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9pbnNldC8pIT09bnVsbH0sYnJvd3Nlcjp7c2FmYXJpOnt1cHRvOjR9LGlvc19zYWY6e3VwdG86My4yfSxhbmRyb2lkOnt1cHRvOjN9fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2luc2V0XFwnLid9LHtjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXt2YXIgY29sb3JDbGVhbj12YWx1ZS5yZXBsYWNlKC9yZ2JbYV0/XFwoLipcXCkvZywnJyk7dmFyIHNoYWRvd3M9Y29sb3JDbGVhbi5zcGxpdCgnLCcpO3ZhciBpbnZhbGlkPWZhbHNlO3NoYWRvd3MuZm9yRWFjaChmdW5jdGlvbihzaGFkb3cpe3ZhciBjb2xvclNwbGl0PXNoYWRvdy5zcGxpdCgnICcpO2lmKGNvbG9yU3BsaXQubGVuZ3RoPj0zKXtpZihjb2xvclNwbGl0WzJdPT09JzBweCcpe2ludmFsaWQ9dHJ1ZX19fSk7cmV0dXJuIGludmFsaWR9LGJyb3dzZXI6e3NhZmFyaTp7dXB0bzo2fSxpb3Nfc2FmOnt1cHRvOjZ9LGFuZHJvaWQ6e3VwdG86Mi4zfX0saGludDonZG9lcyBub3QgXFwnMHB4XFwnIGFzIGJsdXIgcmFkaXVzLid9LHsgLy8gZ2VuZXJhbFxuLy8gaW52ZXN0aWdhdGUgbGF0ZXJcbmJyb3dzZXI6e3NhZmFyaTp7dXB0bzo0fSxpb3Nfc2FmOnt1cHRvOjMuMn0sYW5kcm9pZDp7dXB0bzozfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBhIGJsdXIgcmFkaXVzLid9XSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEwLHNhZmFyaTowfX19LGJveFNpemluZzp7dmFsdWU6e2luaXRpYWw6J2NvbnRlbnQtYm94JyxrZXl3b3JkczpbJ2JvcmRlci1ib3gnLCdjb250ZW50LWJveCddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDoyLjEsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjIsaWU6OCxpZV9tb2I6MTAsaW9zX3NhZjozLjIsb3BfbWluaTo1LG9wZXJhOjkuNSxzYWZhcmk6My4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6MCxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjksc2FmYXJpOjB9LCAvLyBnZW5lcmFsXG5pc3N1ZXM6e2Jyb3dzZXI6e3NhZmFyaTo2LjB9LGhpbnQ6J2lzIG5vdCBzdXBwb3J0ZWQgb24gZWxlbWVudHMgd2l0aCBcXCdkaXNwbGF5OnRhYmxlXFwnLid9fX0sYnVmZmVyZWRSZW5kZXJpbmc6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdkeW5hbWljJywnc3RhdGljJ119fSxicmVha0JlZm9yZTp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX3VjOjkuOSxpb3Nfc2FmOjcsc2FmYXJpOjYuMSxlZGdlOjEyLGllOjEwLGllX21vYjoxMCxvcF9taW5pOjUsb3BlcmE6MTEuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMSxzYWZhcmk6MH19fSxicmVha0FmdGVyOntjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfdWM6OS45LGlvc19zYWY6NyxzYWZhcmk6Ni4xLGVkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLG9wX21pbmk6NSxvcGVyYToxMS4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjExLHNhZmFyaTowfX19LGJyZWFrSW5zaWRlOntjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfdWM6OS45LGlvc19zYWY6NyxzYWZhcmk6Ni4xLGVkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLG9wX21pbmk6NSxvcGVyYToxMS4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjExLHNhZmFyaTowfX19LGNhcHRpb25TaWRlOnt2YWx1ZTp7aW5pdGlhbDondG9wJyxrZXl3b3JkczpbJ2JvdHRvbScsJ3RvcCddfX0sY2xlYXI6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2JvdGgnLCdsZWZ0Jywnbm9uZScsJ3JpZ2h0J119fSxjbGlwOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJ119fSxjbGlwUGF0aDp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnYm9yZGVyLWJveCcsJ2NvbnRlbnQtYm94JywnZmlsbC1ib3gnLCdtYXJnaW4tYm94Jywnbm9uZScsJ3BhZGRpbmctYm94Jywnc3Ryb2tlLWJveCcsJ3ZpZXctYm94J10sdXJsOnRydWV9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9edXJsXFwoLyk9PT1udWxsfSxicm93c2VyOntmaXJlZm94OnRydWV9LGhpbnQ6J29ubHkgc3VwcG9ydHMgXFwndXJsKClcXCcuJ30scGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjIsY2hyb21lOjIzLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjYuMX19fSxjbGlwUnVsZTp7dmFsdWU6e2luaXRpYWw6J25vbmV6ZXJvJyxrZXl3b3JkczpbJ2V2ZW5vZGQnLCdub25lemVybyddfX0sY29sb3I6e3ZhbHVlOntjb2xvcjp0cnVlLGluaXRpYWw6J2luaGVyaXQnfX0sY29sb3JJbnRlcnBvbGF0aW9uOnt2YWx1ZTp7aW5pdGlhbDonc1JHQicsa2V5d29yZHM6WydhdXRvJywnbGluZWFyUkdCJywnc1JHQiddfX0sY29sb3JJbnRlcnBvbGF0aW9uRmlsdGVyczp7dmFsdWU6e2luaXRpYWw6J2xpbmVhclJHQicsa2V5d29yZHM6WydhdXRvJywnbGluZWFyUkdCJywnc1JHQiddfX0sY29sb3JQcm9maWxlOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnc1JHQiddLHN0cmluZzp0cnVlLHVybDp0cnVlfX0sY29sb3JSZW5kZXJpbmc6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdvcHRpbWl6ZVF1YWxpdHknLCdvcHRpbWl6ZVNwZWVkJ119fSxjb2x1bW5Db3VudDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGludGVnZXI6dHJ1ZSxrZXl3b3JkczpbJ2F1dG8nLCdub3JtYWwnXSxwb3NpdGl2ZTp0cnVlLG5vdE51bGw6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZWRnZToxMixpZToxMCxpZV9tb2I6MTAsb3BfbWluaTo1LG9wZXJhOjExLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTEsc2FmYXJpOjB9fX0sY29sdW1uRmlsbDp7dmFsdWU6e2luaXRpYWw6J2JhbGFuY2UnLGtleXdvcmRzOlsnYXV0bycsJ2JhbGFuY2UnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZWRnZToxMixpZToxMCxpZV9tb2I6MTAsb3BfbWluaTo1LG9wZXJhOjExLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTEsc2FmYXJpOjB9fX0sY29sdW1uR2FwOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ25vcm1hbCddLGxlbmd0aDp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOntlZGdlOjEyLGllOjEwLGllX21vYjoxMCxvcF9taW5pOjUsb3BlcmE6MTEuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMSxzYWZhcmk6MH19fSxjb2x1bW5SdWxlOnt2YWx1ZTp7aW5pdGlhbDonbWVkaXVtIG5vbmUgY3VycmVudENvbG9yJ30sbG9uZ2hhbmRzOlsnY29sdW1uUnVsZVdpZHRoJywnY29sdW1uUnVsZVN0eWxlJywnY29sdW1uUnVsZUNvbG9yJ10sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZWRnZToxMixpZToxMCxpZV9tb2I6MTAsb3BfbWluaTo1LG9wZXJhOjExLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTEsc2FmYXJpOjB9fX0sY29sdW1uUnVsZUNvbG9yOnt2YWx1ZTp7Y29sb3I6dHJ1ZSxpbml0aWFsOidjdXJyZW50Q29sb3InfSxjb21wYXRpYmlsaXR5OntmdWxsOntlZGdlOjEyLGllOjEwLGllX21vYjoxMCxvcF9taW5pOjUsb3BlcmE6MTEuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMSxzYWZhcmk6MH19fSxjb2x1bW5SdWxlU3R5bGU6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2Rhc2hlZCcsJ2RvdHRlZCcsJ2RvdWJsZScsJ2dyb292ZScsJ2hpZGRlbicsJ2luc2V0Jywnbm9uZScsJ291dHNldCcsJ3JpZGdlJywnc29saWQnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZWRnZToxMixpZToxMCxpZV9tb2I6MTAsb3BfbWluaTo1LG9wZXJhOjExLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTEsc2FmYXJpOjB9fX0sY29sdW1uUnVsZVdpZHRoOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydtZWRpdW0nLCd0aGljaycsJ3RoaW4nXSxsZW5ndGg6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZWRnZToxMixpZToxMCxpZV9tb2I6MTAsb3BfbWluaTo1LG9wZXJhOjExLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTEsc2FmYXJpOjB9fX0sY29sdW1uU3Bhbjp7dmFsdWU6e2luaXRpYWw6MSxrZXl3b3JkczpbMSwnYWxsJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2VkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLG9wX21pbmk6NSxvcGVyYToxMS4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjExLHNhZmFyaTowfX19LGNvbHVtbldpZHRoOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJ10sbGVuZ3RoOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2VkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwLG9wX21pbmk6NSxvcGVyYToxMS4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjExLHNhZmFyaTowfX19LGNvbHVtbnM6e3ZhbHVlOntpbml0aWFsOidhdXRvIGF1dG8nLGtleXdvcmRzOlsnYXV0byddfSxsb25naGFuZHM6Wydjb2x1bW5XaWR0aCcsJ2NvbHVtbkNvdW50J10sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZWRnZToxMixpZToxMCxpZV9tb2I6MTAsb3BfbWluaTo1LG9wZXJhOjExLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTEsc2FmYXJpOjB9fX0sY29udGVudDp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6WydhdHRyJywnY2xvc2UtcXVvdGUnLCdjb3VudGVyJywnbm8tY2xvc2UtcXVvdGUnLCduby1vcGVuLXF1b3RlJywnbm9uZScsJ25vcm1hbCcsJ29wZW4tcXVvdGUnXSxzdHJpbmc6dHJ1ZSx1cmw6dHJ1ZX19LGNvdW50ZXJJbmNyZW1lbnQ6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ25vbmUnXX19LGNvdW50ZXJSZXNldDp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnbm9uZSddfX0sY3Vyc29yOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhbGlhcycsJ2FsbC1zY3JvbGwnLCdhdXRvJywnY2VsbCcsJ2NvbC1yZXNpemUnLCdjb250ZXh0LW1lbnUnLCdjb3B5JywnY3Jvc3NoYWlyJywnZGVmYXVsdCcsJ2UtcmVzaXplJywnZXctcmVzaXplJywnZ3JhYicsJ2dyYWJiaW5nJywnaGVscCcsJ21vdmUnLCduLXJlc2l6ZScsJ25lLXJlc2l6ZScsJ25lc3ctcmVzaXplJywnbm8tZHJvcCcsJ25vbmUnLCdub3QtYWxsb3dlZCcsJ3BvaW50ZXInLCdwcm9ncmVzcycsJ3Jvdy1yZXNpemUnLCdzLXJlc2l6ZScsJ3NlLXJlc2l6ZScsJ3RleHQnLCd2ZXJ0aWNhbC10ZXh0Jywndy1yZXNpemUnLCd3YWl0Jywnem9vbS1pbicsJ3pvb20tb3V0J10sdXJsOnRydWV9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczpbe2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvYWxpYXN8Y2VsbHxjb3B5fGV3LXJlc2l6ZXxucy1yZXNpemV8bmVzdy1yZXNpemV8bndzZS1yZXNpemV8Y29udGV4dC1tZW51LykhPT1udWxsfSxicm93c2VyOntpZTp7dXB0bzo4fX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdhbGlhc1xcJywgXFwnY2VsbFxcJywgXFwnY29weVxcJywgXFwnZXctcmVzaXplXFwnLCBcXCducy1yZXNpemVcXCcsIFxcJ25lc3ctcmVzaXplXFwnLCBcXCdud3NlLXJlc2l6ZVxcJyBhbmQgXFwnY29udGV4dC1tZW51XFwnLid9LHtjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL3VybFxcKHxub25lLykhPT1udWxsfSxicm93c2VyOntlZGdlOnRydWUsb3BlcmE6e3VwdG86MTIuMX19LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnbm9uZVxcJyBhbmQgXFwndXJsKClcXCcuJ30seyAvLyBnZW5lcmFsXG5jb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUudG9Mb3dlckNhc2UoKS5tYXRjaCgvdXJsXFwoKC4qWy5danBnfFsuXXBuZ3xbLl1qcGVnKVxcKS8pIT09bnVsbH0saGludDonZG9lcyBub3Qgc3VwcG9ydCBKUEcgYW5kIFBORyBvbiBNYWNzLid9LHsgLy8gZ2VuZXJhbFxuY29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC91cmxcXCgvKSE9PW51bGx9LGJyb3dzZXI6e2llOnRydWV9LGhpbnQ6J2RvZXMgb25seSBzdXBwb3J0IHRoZSBDVVIgZm9ybWF0Lid9XX19LGN4Ont2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlfX0sY3k6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWV9fSxkaXJlY3Rpb246e3ZhbHVlOntpbml0aWFsOidsdHInLGtleXdvcmRzOlsnbHRyJywncnRsJ119fSxkaXNwbGF5Ont2YWx1ZTp7aW5pdGlhbDonaW5saW5lJyxrZXl3b3JkczpbJ2Jsb2NrJywnZmxleCcsJ2lubGluZScsJ2lubGluZS1ibG9jaycsJ2lubGluZS1mbGV4JywnaW5saW5lLXRhYmxlJywnbGlzdC1pdGVtJywnbm9uZScsJ3J1bi1pbicsJ3RhYmxlJywndGFibGUtY2FwdGlvbicsJ3RhYmxlLWNlbGwnLCd0YWJsZS1jb2x1bW4nLCd0YWJsZS1jb2x1bW4tZ3JvdXAnLCd0YWJsZS1mb290ZXItZ3JvdXAnLCd0YWJsZS1oZWFkZXItZ3JvdXAnLCd0YWJsZS1yb3cnLCd0YWJsZS1yb3ctZ3JvdXAnXX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0naW5saW5lLXRhYmxlJ30sYnJvd3Nlcjp7ZmlyZWZveDp7dXB0bzoyfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdpbmxpbmUtdGFibGVcXCcuJ319fSxkb21pbmFudEJhc2VsaW5lOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhbHBoYWJldGljJywnYXV0bycsJ2NlbnRyYWwnLCdoYW5naW5nJywnaWRlb2dyYXBoaWMnLCdtYXRoZW1hdGljYWwnLCdtaWRkbGUnLCduby1jaGFuZ2UnLCdyZXNldC1zaXplJywndGV4dC1hZnRlci1lZGdlJywndGV4dC1iZWZvcmUtZWRnZScsJ3VzZS1zY3JpcHQnXX19LGVtcHR5Q2VsbHM6e3ZhbHVlOntpbml0aWFsOidzaG93JyxrZXl3b3JkczpbJ2hpZGUnLCdzaG93J119fSxlbmFibGVCYWNrZ3JvdW5kOnt2YWx1ZTp7aW5pdGlhbDonYWNjdW11bHVhdGUnLGtleXdvcmRzOlsnYWNjdW11bGF0ZSddfX0sZmlsbDp7dmFsdWU6e2NvbG9yOnRydWUsaW5pdGlhbDonYmxhY2snfX0sZmlsbE9wYWNpdHk6e3ZhbHVlOntpbml0aWFsOjEscmFuZ2U6WzAsMV19fSxmaWxsUnVsZTp7dmFsdWU6e2luaXRpYWw6J25vbnplcm8nLGtleXdvcmRzOlsnZXZlbm9kZCcsJ25vbnplcm8nXX19LGZpbHRlcjp7dmFsdWU6e2luaXRpYWw6J25vbmUnfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjE4LGZpcmVmb3g6MzUsaW9zX3NhZjo2LG9wZXJhOjE1LHNhZmFyaTo2fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDo0LjIsY2hyb21lOjE3LGVkZ2U6MTIsZmlyZWZveDozLjUsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6NS4xfSxpc3N1ZXM6W3tjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL151cmxcXCgvKT09PW51bGx9LGJyb3dzZXI6e2ZpcmVmb3g6eyAvLyBjaGVjayB0aGF0IGFnYWluXG51cHRvOjMzfX0saGludDonb25seSBzdXBwb3J0cyBcXCd1cmwoKVxcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9edXJsXFwoLykhPT1udWxsfSxicm93c2VyOntlZGdlOntmcm9tOjEzLHRvOjE0fX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCd1cmwoKVxcJy4nfV19fSxmbGV4Ont2YWx1ZTp7aW5pdGlhbDonMCAxIGF1dG8nLGtleXdvcmRzOlsnYXV0byddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LGZsZXhCYXNpczp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0bycsJ2NvbnRlbnQnLCdmaWxsJywnZml0LWNvbnRlbnQnLCdtYXgtY29udGVudCcsJ21pbi1jb250ZW50J10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LGZsZXhEaXJlY3Rpb246e3ZhbHVlOntpbml0aWFsOidyb3cnLGtleXdvcmRzOlsnY29sdW1uJywnY29sdW1uLXJldmVyc2UnLCdyb3cnLCdyb3ctcmV2ZXJzZSddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LCAvLyBUT0RPOiBjb21wbGV0ZVxuZmxleEZsb3c6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kcm9pZDo0LjQsY2hyb21lOjIxLGVkZ2U6MTIsZmlyZWZveDoyOCxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTo2LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTIsc2FmYXJpOjB9fX0sZmxleEdyb3c6e3ZhbHVlOntmbG9hdDp0cnVlLGluaXRpYWw6MCxwb3NpdGl2ZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LGZsZXhTaHJpbms6e3ZhbHVlOntmbG9hdDp0cnVlLGluaXRpYWw6MSxwb3NpdGl2ZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LGZsZXhXcmFwOnt2YWx1ZTp7aW5pdGlhbDonbm93cmFwJyxrZXl3b3JkczpbJ25vd3JhcCcsJ3dyYXAnLCd3cmFwLXJldmVyc2UnXX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQuNCxjaHJvbWU6MjEsZWRnZToxMixmaXJlZm94OjI4LGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjYuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6MCxvcGVyYToxMixzYWZhcmk6MH19fSxmbG9hdDp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnbGVmdCcsJ3JpZ2h0Jywnbm9uZSddfX0sZmxvb2RDb2xvcjp7dmFsdWU6e2NvbG9yOnRydWUsaW5pdGlhbDonYmxhY2snfX0sZmxvb2RPcGFjaXR5Ont2YWx1ZTp7cmFuZ2U6WzAsMV0saW5pdGlhbDoxfX0sZmxvd0ludG86e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF91Yzo5LjksaW9zX3NhZjo3LHNhZmFyaTo2LjF9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjAsYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZTowLGZpcmVmb3g6NDYsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjYsb3BfbWluaTo1LG9wZXJhOjM2LHNhZmFyaTo2fX19LGZsb3dGcm9tOntjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfdWM6OS45LGlvc19zYWY6NyxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91YzowLGFuZHJvaWQ6NDYsY2hyb21lOjUwLGVkZ2U6MCxmaXJlZm94OjQ2LGllOjksaWVfbW9iOjAsaW9zX3NhZjo2LG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6Nn19fSxmb250Ont2YWx1ZTp7IC8vIGNhbiBhbHNvIGJlIHVzZWQgdG8gc3BlY2lmeSBzeXN0ZW1mb250c1xuLy8gdGhlcmVmb3JlIGlzIG5vdCBvbmx5IGEgc2hvcnRoYW5kIHByb3BlcnR5XG5pbml0aWFsOidub3JtYWwnfSxsb25naGFuZHM6Wydmb250RmFtaWx5JywnZm9udEtlcm5pbmcnLCdmb250U2l6ZScsJ2ZvbnRTdHJldGNoJywnZm9udFN0eWxlJywnZm9udFZhcmlhbnQnLCdmb250V2VpZ2h0JywnbGluZUhlaWdodCddfSwgLy8gVE9ETzogY29tcGxldGVcbmZvbnRLZXJuaW5nOntjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjI5LGZpcmVmb3g6MzQsaW9zX3NhZjo4LG9wZXJhOjE2LHNhZmFyaTo3fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDo0LjIsY2hyb21lOjI4LGVkZ2U6MTQsZmlyZWZveDozMyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYToxNSxzYWZhcmk6Ni4xfX19LGZvbnRGYW1pbHk6e3ZhbHVlOntpbml0aWFsOidpbmhlcml0JyxrZXl3b3JkczpbJ2N1cnNpdmUnLCdmYW50YXN5JywnbW9ub3NwYWNlJywnc2Fucy1zZXJpZicsJ3NlcmlmJ119fSxmb250RmVhdHVyZVNldHRpbmdzOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MTUsaWU6MTAsaW9zX3NhZjo5LjMsb3BlcmE6MTUsc2FmYXJpOjkuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6NC4yLGNocm9tZToxNSxlZGdlOjAsZmlyZWZveDozLjYsaWU6OSxpZV9tb2I6MTEsaW9zX3NhZjo5LG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTo5fSxpc3N1ZXM6W3sgLy8gaW52ZXN0aWdhdGUgb24gdGhpcyBvbmUgZnVydGhlciB0byBkZXRlcm1pbmVcbi8vIGhvdyBleGFjdGx5IHRoZSBvbGRlciBzeW50YXggbG9va2VkIGxpa2VcbmJyb3dzZXI6e2ZpcmVmb3g6e3VwdG86MTR9fSxoaW50Oid1c2VzIGEgc2xpZ2h0bHkgZGlmZmVyZW50IHN5bnRheC4nfSx7YnJvd3Nlcjp7Y2hyb21lOnt1cHRvOjIwfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBNYWNzLid9XX19LGZvbnRTaXplOnt2YWx1ZTp7aW5pdGlhbDonbWVkaXVtJyxrZXl3b3JkczpbJ2xhcmdlJywnbGFyZ2VyJywnbWVkaXVtJywnc21hbGwnLCdzbWFsbGVyJywneC1sYXJnZScsJ3gtc21hbGwnLCd4eC1sYXJnZScsJ3h4LXNtYWxsJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sZm9udFNtb290aDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6W3tjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlLHN0eWxlcyl7cmV0dXJuICFzdHlsZXMuV2Via2l0Rm9udFNtb290aGluZ3x8c3R5bGVzLldlYmtpdEZvbnRTbW9vdGhpbmcubWF0Y2goL14obm9uZXxhbnRpYWxpYXNlZHxzdWJwaXhlbC1hbnRpYWxpYXNlZCkkLyk9PT1udWxsfSxicm93c2VyOntzYWZhcmk6dHJ1ZSxjaHJvbWU6dHJ1ZSxvcGVyYTp0cnVlfSxoaW50OidtaWdodCBub3Qgc3VwcG9ydCBcXCdmb250U21vb3RoXFwnLCB1c2UgXFwnV2Via2l0Rm9udFNtb290aGluZ1xcJyB3aXRoIGVpdGhlciBcXCdub25lXFwnLCBcXCdhbnRpYWxpYXNlZFxcJyBvciBcXCdzdWJwaXhlbC1hbnRpYWxpYXNlZFxcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSxzdHlsZXMpe3JldHVybiAhc3R5bGVzLk1vek9zeEZvbnRTbW9vdGhpbmd8fHN0eWxlcy5Nb3pPc3hGb250U21vb3RoaW5nLm1hdGNoKC9eKGF1dG98aW5oZXJpdHx1bnNldHxncmF5c2NhbGUpJC8pPT09bnVsbH0sYnJvd3Nlcjp7ZmlyZWZveDp0cnVlfSxoaW50OidtaWdodCBub3Qgc3VwcG9ydCBcXCdmb250U21vb3RoXFwnLCB1c2UgXFwnTW96T3N4Rm9udFNtb290aGluZ1xcJyB3aXRoIGVpdGhlciBcXCdhdXRvXFwnLCBcXCdpbmhlcml0XFwnLCBcXCd1bnNldFxcJyBvciBcXCdncmF5c2NhbGVcXCcuJ30seyAvLyBnZW5lcmFsXG5oaW50OidPbmx5IHN1cHBvcnRlZCBvbiBNYWNzLid9XX19LGZvbnRTdHJldGNoOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ2NvbmRlbnNlZCcsJ2V4cGFuZGVkJywnZXh0cmEtY29uZGVuc2VkJywnZXh0cmEtZXhwYW5kZWQnLCdub3JtYWwnLCdzZW1pLWNvbmRlbnNlZCcsJ3NlbWktZXhwYW5kZWQnLCd1bHRyYS1jb25kZW5zZWQnLCd1bHRyYS1leHBhbmRlZCddfX0sZm9udFN0eWxlOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ2l0YWxpYycsJ25vcm1hbCcsJ29ibGlxdWUnXX19LGZvbnRTeW50aGVzaXM6e3ZhbHVlOntpbml0aWFsOid3ZWlnaHQgc3R5bGUnLGtleXdvcmRzOlsnbm9uZScsJ3N0eWxlJywnd2VpZ2h0Jywnd2VpZ2h0IHN0eWxlJ119fSxmb250VmFyaWFudDp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6Wydub3JtYWwnLCdzbWFsbC1jYXBzJ119LGxvbmdoYW5kczpbJ2ZvbnRWYXJpYW50Q2FwcycsJ2ZvbnRWYXJpYW50TnVtZXJpYycsJ2ZvbnRWYXJpYW50QWx0ZXJuYXRlcycsJ2ZvbnRWYXJpYW50TGlnYXR1cmVzJywnZm9udFZhcmlhbnRFYXN0QXNpYW4nXX0sZm9udFZhcmlhbnRDYXBzOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ25vcm1hbCcsJ3NtYWxsLWNhcHMnLCdhbGwtc21hbGwtY2FwcycsJ3BldGl0ZS1jYXBzJywnYWxsLXBldGl0ZS1jYXBzJywndW5pY2FzZScsJ3RpdGxpbmctY2FwcyddfX0sZm9udFZhcmlhbnROdW1lcmljOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJywgLy8gcHJvcGVyIHJlc2VhcmNoIG9uIGtleXdvcmRzXG5rZXl3b3JkczpbJ25vcm1hbCddfX0sZm9udFZhcmlhbnRBbHRlcm5hdGVzOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJywgLy8gcHJvcGVyIHJlc2VhcmNoIG9uIGtleXdvcmRzXG5rZXl3b3JkczpbJ25vcm1hbCddfX0sZm9udFZhcmlhbnRMaWdhdHVyZXM6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLCAvLyBwcm9wZXIgcmVzZWFyY2ggb24ga2V5d29yZHNcbmtleXdvcmRzOlsnbm9ybWFsJ119fSxmb250VmFyaWFudEVhc3RBc2lhbjp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsIC8vIHByb3BlciByZXNlYXJjaCBvbiBrZXl3b3Jkc1xua2V5d29yZHM6Wydub3JtYWwnXX19LGZvbnRWYXJpYW50UG9zaXRpb246e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnbm9ybWFsJywnc3ViJywnc3VwZXInXX19LGZvbnRXZWlnaHQ6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsxMDAsMjAwLDMwMCw0MDAsNTAwLDYwMCw3MDAsODAwLDkwMCwnYm9sZCcsJ2JvbGRlcicsJ2xpZ2h0ZXInLCdub3JtYWwnXX19LGdseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsOnt2YWx1ZTp7aW5pdGlhbDonMGRlZycsa2V5d29yZHM6WycwZGVnJywnOTBkZWcnLCcxODBkZWcnLCcyNzBkZWcnXX19LGdseXBoT3JpZW50YXRpb25WZXJ0aWNhbDp7dmFsdWU6e2luaXRpYWw6JzBkZWcnLGtleXdvcmRzOlsnYXV0bycsJzBkZWcnLCc5MGRlZycsJzE4MGRlZycsJzI3MGRlZyddfX0sZ3JpZDp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRBcmVhOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0sZ3JpZEF1dG9Db2x1bW5zOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0sZ3JpZEF1dG9GbG93Ontjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0sZ3JpZEF1dG9Sb3dzOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0sZ3JpZENvbHVtbjp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRDb2x1bW5TdGFydDp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRDb2x1bW5FbmQ6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxncmlkQ29sdW1uR2FwOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0sZ3JpZEdhcDp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRSb3c6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxncmlkUm93RW5kOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0sZ3JpZFJvd1N0YXJ0Ontjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0sZ3JpZFJvd0dhcDp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRUZW1wbGF0ZTp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRUZW1wbGF0ZUFyZWFzOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMSxjaHJvbWU6MjQsZWRnZTowLGZpcmVmb3g6MTgsaWU6OCxpZV9tb2I6MCxpb3Nfc2FmOjUsb3BfbWluaTo1LG9wZXJhOjI3LHNhZmFyaTo1LjF9fX0sZ3JpZFRlbXBsYXRlQ29sdW1uczp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjEsY2hyb21lOjI0LGVkZ2U6MCxmaXJlZm94OjE4LGllOjgsaWVfbW9iOjAsaW9zX3NhZjo1LG9wX21pbmk6NSxvcGVyYToyNyxzYWZhcmk6NS4xfX19LGdyaWRUZW1wbGF0ZVJvd3M6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxoYW5naW5nUHVuY3R1YXRpb246e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2FsbG93LWVuZCcsJ2ZpcnN0JywnZm9yY2UtZW5kJywnbGFzdCcsJ25vbmUnXX19LGhlaWdodDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0bycsJ2F2YWlsYWJsZScsJ2ZpdC1jb250ZW50JywnbWF4LWNvbnRlbnQnLCdtaW4tY29udGVudCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LGh5cGhlbnM6e3ZhbHVlOntpbml0aWFsOidub25lJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZWRnZToxMixmaXJlZm94OjYsaWU6MTAsaW9zX3NhZjo0LjIsc2FmYXJpOjUuMX0scGFydGlhbDp7YW5kX2Nocjo0NyxhbmRfdWM6MCxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjAsZmlyZWZveDo1LGllOjksaWVfbW9iOjExLGlvc19zYWY6NCxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjV9LGlzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J2F1dG8nfSxicm93c2VyOntjaHJvbWU6dHJ1ZSxhbmRyb2lkOjQuMH0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdhdXRvXFwnLid9fX0saW1hZ2VPcmllbnRhdGlvbjp7dmFsdWU6e2luaXRpYWw6JzBkZWcnfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvWy1dWzAtOV17MSwzfWRlZy8pIT09bnVsbH0sYnJvd3Nlcjp7ZmlyZWZveDp0cnVlfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IG5lZ2F0aXZlIHZhbHVlcy4nfX19LGltYWdlUmVuZGVyaW5nOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnY3Jpc3AtZWRnZXMnLCdwaXhlbGF0ZWQnXX19LGlzb2xhdGlvbjp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0bycsJ2lzb2xhdGUnXX19LGp1c3RpZnlDb250ZW50Ont2YWx1ZTp7aW5pdGlhbDonZmxleC1zdGFydCcsa2V5d29yZHM6WydjZW50ZXInLCdmbGV4LWVuZCcsJ2ZsZXgtc3RhcnQnLCdzcGFjZS1hcm91bmQnLCdzcGFjZS1iZXR3ZWVuJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kcm9pZDo0LjQsY2hyb21lOjIxLGVkZ2U6MTIsZmlyZWZveDoyOCxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTo2LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6MCxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjAsb3BlcmE6MTIsc2FmYXJpOjB9fX0sanVzdGlmeUl0ZW1zOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnc3RyZXRjaCddfX0sanVzdGlmeVNlbGY6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdzdHJldGNoJ119fSxrZXJuaW5nOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJywnbm9uZScsJ25vcm1hbCddfX0sbGVmdDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0byddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LGxldHRlclNwYWNpbmc6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnbm9ybWFsJ10sbGVuZ3RoOnRydWV9fSxsaWdodGluZ0NvbG9yOnt2YWx1ZTp7aW5pdGlhbDond2hpdGUnLGNvbG9yOnRydWV9fSxsaW5lSGVpZ2h0Ont2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxmbG9hdDp0cnVlLGtleXdvcmRzOlsnbm9ybWFsJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlLHBvc2l0aXZlOnRydWV9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9jYWxjXFwoLykhPT1udWxsfSxicm93c2VyOntmaXJlZm94OnRydWV9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnY2FsYygpXFwnLid9fX0sbGlzdFN0eWxlSW1hZ2U6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ25vbmUnXSx1cmw6dHJ1ZX19LGxpc3RTdHlsZVBvc2l0aW9uOnt2YWx1ZTp7aW5pdGlhbDonb3V0c2lkZScsa2V5d29yZHM6WydpbnNpZGUnLCdvdXRzaWRlJ119fSxsaXN0U3R5bGVUeXBlOnt2YWx1ZTp7aW5pdGlhbDonZGlzYycsa2V5d29yZHM6WydhcmFiaWMtaW5kaWMnLCdhcm1lbmlhbicsJ2JlbmdhbGknLCdjYW1ib2RpYW4nLCdjaXJjbGUnLCdjamstZGVjaW1hbCcsJ2Nqay1lYXJ0aGx5LWJyYW5jaCcsJ2Nqay1oZWF2ZW5seS1zdGVtJywnY2prLWlkZW9ncmFwaGljJywnZGVjaW1hbCcsJ2RlY2ltYWwtbGVhZGluZy16ZXJvJywnZGV2YW5hZ2FyaScsJ2Rpc2MnLCdkaXNjbG9zdXJlLWNsb3NlZCcsJ2Rpc2Nsb3N1cmUtb3BlbicsJ2V0aGlvcGljLW51bWVyaWMnLCdncmVnb3JpYW4nLCdndWphcmF0aScsJ2d1cm11a2hpJywnaGVicmV3JywnaGlyYWdhbmEnLCdoaXJhZ2FuYS1pcm9oYScsJ2phcGFuZXNlLWZvcm1hbCcsJ2phcGFuZXNlLWluZm9ybWFsJywna2FubmFkYScsJ2thdGFrYW5hJywna2F0YWthbmEtaXJvaGEnLCdraG1lcicsJ2tvZXJhbi1oYW5qYS1pbmZvcm1hbCcsJ2tvcmVhbi1oYW5ndWwtZm9ybWFsJywna29yZWFuLWhhbmphLWZvcm1hbCcsJ2xhbycsJ2xvd2VyLWFscGhhJywnbG93ZXItYXJtZW5pYW4nLCdsb3dlci1ncmVlaycsJ2xvd2VyLWxhdGluJywnbG93ZXItcm9tYW4nLCdtYWxheWFsYW0nLCdtb25nb2xpYW4nLCdteWFubWFyJywnbm9uZScsJ29yaXlhJywncGVyc2lhbicsJ3NpbXAtY2hpbmVzZS1mb3JtYWwnLCdzaW1wLWNoaW5lc2UtaW5mb3JtYWwnLCdzcXVhcmUnLCd0YW1pbCcsJ3RlbHVndScsJ3RoYWknLCd0aWJldGFuJywndHJhZC1jaGluZXNlLWZvcm1hbCcsJ3RyYWQtY2hpbmVzZS1pbmZvcm1hbCcsJ3VwcGVyLWFscGhhJywndXBwZXItYXJtZW5pYW4nLCd1cHBlci1sYXRpbicsJ3VwcGVyLXJvbWFuJ10sc3RyaW5nOnRydWV9fSxsaXN0U3R5bGU6e3ZhbHVlOntpbml0aWFsOidkaXNjIG91dHNpZGUgbm9uZScsa2V5d29yZHM6Wydub25lJ119LGxvbmdoYW5kczpbJ2xpc3RTdHlsZVR5cGUnLCdsaXN0U3R5bGVQb3NpdGlvbicsJ2xpc3RTdHlsZUltYWdlJ119LG1hcmdpbjp7dmFsdWU6e2luaXRpYWw6MH0sbG9uZ2hhbmRzOlsnbWFyZ2luVG9wJywnbWFyZ2luUmlnaHQnLCdtYXJnaW5Cb3R0b20nLCdtYXJnaW5MZWZ0J119LG1hcmdpbkJvdHRvbTp7dmFsdWU6e2luaXRpYWw6MCxrZXl3b3JkczpbJ2F1dG8nXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxtYXJnaW5MZWZ0Ont2YWx1ZTp7aW5pdGlhbDowLGtleXdvcmRzOlsnYXV0byddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LG1hcmdpblJpZ2h0Ont2YWx1ZTp7aW5pdGlhbDowLGtleXdvcmRzOlsnYXV0byddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LG1hcmdpblRvcDp7dmFsdWU6e2luaXRpYWw6MCxrZXl3b3JkczpbJ2F1dG8nXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxtYXNrOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6Wydub25lJ10sdXJsOnRydWV9LGxvbmdoYW5kczpbJ21hc2tPcmlnaW4nLCdtYXNrQ2xpcCcsJ21hc2tCb3JkZXInXSxjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrQm9yZGVyOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrQm9yZGVyTW9kZTp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza0JvcmRlck91dHNldDp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza0JvcmRlclJlcGVhdDp7Y29tcGF0aWJpbGl0eTp7cGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6MyxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0sbWFza0JvcmRlclNsaWNlOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrQm9yZGVyU291cmNlOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrQm9yZGVyV2lkdGg6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZToxNCxmaXJlZm94OjMsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6My4yfX19LG1hc2tDbGlwOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrQ29tcG9zaXRlOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrSW1hZ2U6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZToxNCxmaXJlZm94OjMsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6My4yfX19LG1hc2tNb2RlOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrT3JpZ2luOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrUG9zaXRpb246e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZToxNCxmaXJlZm94OjMsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6My4yfX19LG1hc2tSZXBlYXQ6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZToxNCxmaXJlZm94OjMsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6My4yfX19LG1hc2tTaXplOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXNrVHlwZTp7dmFsdWU6e2luaXRpYWw6J2x1bWluYW5jZScsa2V5d29yZHM6WydhbHBoYScsJ2x1bWluYW5jZSddfSxjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MTQsZmlyZWZveDozLGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxtYXhIZWlnaHQ6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2ZpbGwtYXZhaWxhYmxlJywnZml0LWNvbnRlbnQnLCdtYXgtY29udGVudCcsJ21pbi1jb250ZW50Jywnbm9uZSddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0naW5oZXJpdCd9LGJyb3dzZXI6e2llOjd9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnaW5oZXJpdFxcJy4nfX19LG1heFdpZHRoOnt2YWx1ZTp7aW5pdGlhbDonbm9uZScsa2V5d29yZHM6WydmaWxsLWF2YWlsYWJsZScsJ2ZpdC1jb250ZW50JywnbWF4LWNvbnRlbnQnLCdtaW4tY29udGVudCcsJ25vbmUnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczpbe2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZT09PSdpbmhlcml0J30sYnJvd3Nlcjp7aWU6N30saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdpbmhlcml0XFwnLid9LHtjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0naW5oZXJpdCd9LGJyb3dzZXI6e2llOntmcm9tOjEwLHRvOjExfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdpbmhlcml0XFwnLid9XX19LG1pbkhlaWdodDp7dmFsdWU6e2luaXRpYWw6MCxrZXl3b3JkczpbJ2ZpbGwtYXZhaWxhYmxlJywnZml0LWNvbnRlbnQnLCdtYXgtY29udGVudCcsJ21pbi1jb250ZW50Jywnbm9uZSddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOlt7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J2luaGVyaXQnfSxicm93c2VyOntpZTo3fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2luaGVyaXRcXCcuJ30seyAvLyBnZW5lcmFsXG4vLyBpbnZlc3RpZ2F0ZSBsYXRlclxuYnJvd3Nlcjp7ZmlyZWZveDp0cnVlfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2luaGVyaXRcXCcgb24gdGFibGUgZWxlbWVudHMuJ30se2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUsc3R5bGVzKXtyZXR1cm4gc3R5bGVzLmRpc3BsYXk9PT0ndGFibGUnfSxicm93c2VyOntmaXJlZm94OnRydWV9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnaW5oZXJpdFxcJyBjb21iaW5lZCB3aXRoIFxcJ2Rpc3BsYXk6dGFibGVcXCcuJ31dfX0sbWluV2lkdGg6e3ZhbHVlOntpbml0aWFsOjAsa2V5d29yZHM6WydmaWxsLWF2YWlsYWJsZScsJ2ZpdC1jb250ZW50JywnbWF4LWNvbnRlbnQnLCdtaW4tY29udGVudCcsJ25vbmUnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2lzc3Vlczpbe2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZT09PSdpbmhlcml0J30sYnJvd3Nlcjp7aWU6N30saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdpbmhlcml0XFwnLid9LHtjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0naW5oZXJpdCd9LGJyb3dzZXI6e2llOntmcm9tOjEwLHRvOjExfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdpbmhlcml0XFwnLid9LHsgLy8gZ2VuZXJhbFxuLy8gaW52ZXN0aWdhdGUgbGF0ZXJcbmJyb3dzZXI6e2lvc19zYWY6NS4xfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2luaGVyaXRcXCcgb24gdGFibGUgZWxlbWVudHMuJ30seyAvLyBnZW5lcmFsXG4vLyBpbnZlc3RpZ2F0ZSBsYXRlclxuYnJvd3Nlcjp7aWU6dHJ1ZX0saGludDonaXMgbm90IHN1cHBvcnQgb24gaW5wdXQgZWxlbWVudHMgd2l0aCB0eXBlIFxcJ2J1dHRvblxcJywgXFwnc3VibWl0XFwnIGFuZCBcXCdyZXNldFxcJy4nfV19fSxtaXhCbGVuZE1vZGU6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnY29sb3InLCdjb2xvci1idXJuJywnY29sb3ItZG9kZ2UnLCdkYXJrZW4nLCdkaWZmZXJlbmNlJywnZXhjbHVzaW9uJywnaGFyZC1saWdodCcsJ2h1ZScsJ2xpZ2h0ZW4nLCdsdW1pbm9zaXR5JywnbXVsdGlwbHknLCdub3JtYWwnLCdvdmVybGF5Jywnc2F0dXJhdGlvbicsJ3NjcmVlbicsJ3NvZnQtbGlnaHQnXX19LG9iamVjdEZpdDp7dmFsdWU6e2luaXRpYWw6J2ZpbGwnLGtleXdvcmRzOlsnY29udGFpbicsJ2NvdmVyJywnZmlsbCcsJ25vbmUnLCdzY2FsZS1kb3duJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kcm9pZDo0LjQsY2hyb21lOjMxLGZpcmVmb3g6MzYsb3BfbWluaTo1LG9wZXJhOjEwLjZ9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZTozMCxlZGdlOjE0LGZpcmVmb3g6MzUsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjAsb3BlcmE6MTgsc2FmYXJpOjd9fX0sb2JqZWN0UG9zaXRpb246e3ZhbHVlOntpbml0aWFsOic1MCUgNTAlJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRyb2lkOjQuNCxjaHJvbWU6MzEsZmlyZWZveDozNixvcF9taW5pOjUsb3BlcmE6MTAuNn0scGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjMwLGVkZ2U6MTQsZmlyZWZveDozNSxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6MCxvcGVyYToxOCxzYWZhcmk6N30saXNzdWVzOnticm93c2VyOntzYWZhcmk6e3VwdG86OX0saW9zX3NhZjp7dXB0bzo5LjJ9fSxoaW50OidpcyBub3Qgc3VwcG9ydGVkLid9fX0sb3BhY2l0eTp7dmFsdWU6e2luaXRpYWw6JzEnLHJhbmdlOlswLDFdfX0sb3JkZXI6e3ZhbHVlOntpbml0aWFsOicwJyxpbnRlZ2VyOnRydWUsbmVnYXRpdmU6dHJ1ZSxwb3NpdGl2ZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NC40LGNocm9tZToyMSxlZGdlOjEyLGZpcmVmb3g6MjgsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Ni4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjEyLHNhZmFyaTowfX19LG9ycGhhbnM6e3ZhbHVlOntpbml0aWFsOjAsaW50ZWdlcjp0cnVlLHBvc2l0aXZlOnRydWUsbm90TnVsbDp0cnVlfX0sb3V0bGluZTp7dmFsdWU6e2luaXRpYWw6MH0sbG9uZ2hhbmRzOlsnb3V0bGluZVdpZHRoJywnb3V0bGluZVN0eWxlJywnb3V0bGluZUNvbG9yJ119LG91dGxpbmVDb2xvcjp7dmFsdWU6e2NvbG9yOnRydWUsaW5pdGlhbDonaW52ZXJ0JyxrZXl3b3JkczpbJ2ludmVydCddfX0sb3V0bGluZU9mZnNldDp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOnticm93c2VyOntpZTp7dXB0bzoxMH19LGhpbnQ6J2lzIG5vdCBzdXBwb3J0ZWQuJ319fSxvdXRsaW5lU3R5bGU6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2Rhc2hlZCcsJ2RvdHRlZCcsJ2RvdWJsZScsJ2dyb292ZScsJ2hpZGRlbicsJ2luc2V0Jywnbm9uZScsJ291dHNldCcsJ3JpZGdlJywnc29saWQnXX19LG91dGxpbmVXaWR0aDp7dmFsdWU6e2luaXRpYWw6J21lZGl1bScsa2V5d29yZHM6WydtZWRpdW0nLCd0aGljaycsJ3RoaW4nXSxsZW5ndGg6dHJ1ZX19LG92ZXJmbG93Ont2YWx1ZTp7aW5pdGlhbDondmlzaWJsZScsa2V5d29yZHM6WydhdXRvJywnaGlkZGVuJywnc2Nyb2xsJywndmlzaWJsZSddfX0sb3ZlcmZsb3dXcmFwOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ2JyZWFrLXdvcmQnLCdub3JtYWwnXX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlLHN0eWxlcyl7cmV0dXJuICFzdHlsZXMud29yZFdyYXB9LGJyb3dzZXI6e2Nocm9tZTp7dXB0bzoyMn0sc2FmYXJpOnt1cHRvOjZ9LG9wZXJhOnt1cHRvOjExLjV9LGFuZHJvaWQ6e3VwdG86NC4zfSxpb3Nfc2FmOnt1cHRvOjYuMX0saWU6dHJ1ZSxmaXJlZm94OnRydWUsb3BfbWluaTp0cnVlLGllX21vYjp0cnVlLGFuZF91Yzp0cnVlfSxoaW50OidtaWdodCBub3QgYmUgc3VwcG9ydGVkLCB1c2UgXFwnd29yZFdyYXBcXCcgYXMgd2VsbC4nfX19LG92ZXJmbG93WDp7dmFsdWU6e2luaXRpYWw6J3Zpc2libGUnLGtleXdvcmRzOlsnYXV0bycsJ2hpZGRlbicsJ3Njcm9sbCcsJ3Zpc2libGUnXX19LG92ZXJmbG93WTp7dmFsdWU6e2luaXRpYWw6J3Zpc2libGUnLGtleXdvcmRzOlsnYXV0bycsJ2hpZGRlbicsJ3Njcm9sbCcsJ3Zpc2libGUnXX19LHBhZGRpbmc6e3ZhbHVlOntpbml0aWFsOjAsbG9uZ2hhbmRzOlsncGFkZGluZ0JvdHRvbScsJ3BhZGRpbmdMZWZ0JywncGFkZGluZ1JpZ2h0JywncGFkZGluZ1RvcCddfX0scGFkZGluZ0JvdHRvbTp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxwYWRkaW5nTGVmdDp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxwYWRkaW5nUmlnaHQ6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0scGFkZGluZ1RvcDp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSxwYWdlQnJlYWtBZnRlcjp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYWx3YXlzJywnYXV0bycsJ2F2b2lkJywnbGVmdCcsJ3JpZ2h0J119LGNvbXBhdGliaWxpdHk6e2lzc3Vlczp7IC8vIG5vdCBmb3Igb3BlcmEhXG4vLyBUT0RPOiBjb21wbGV0ZSBicm93c2VyIHJlcXVlc3RzXG5jb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0nYXZvaWQnfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2F2b2lkXFwnLid9fX0scGFnZUJyZWFrQmVmb3JlOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhbHdheXMnLCdhdXRvJywnYXZvaWQnLCdsZWZ0JywncmlnaHQnXX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOnsgLy8gbm90IGZvciBvcGVyYSFcbi8vIFRPRE86IGNvbXBsZXRlIGJyb3dzZXIgcmVxdWVzdHNcbmNvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZT09PSdhdm9pZCd9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnYXZvaWRcXCcuJ319fSxwYWdlQnJlYWtJbnNpZGU6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdhdm9pZCddfX0scGFpbnRPcmRlcjp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6WydmaWxsJywnbWFya2VycycsJ25vcm1hbCcsJ3N0cm9rZSddfX0scGVyc3BlY3RpdmU6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ25vbmUnXSxsZW5ndGg6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6MyxjaHJvbWU6MTIsZWRnZToxMixmaXJlZm94OjEwLGlvc19zYWY6My4yLG9wZXJhOjE1LHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDoyLjMsY2hyb21lOjExLGVkZ2U6MCxmaXJlZm94OjksaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxwZXJzcGVjdGl2ZU9yaWdpbjp7dmFsdWU6e2luaXRpYWw6JzUwJSA1MCUnfSxsb25naGFuZHM6WydwZXJzcGVjdGl2ZU9yaWdpblgnLCdwZXJzcGVjdGl2ZU9yaWdpblknXSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDozLGNocm9tZToxMixlZGdlOjEyLGZpcmVmb3g6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTUsc2FmYXJpOjR9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjIuMyxjaHJvbWU6MTEsZWRnZTowLGZpcmVmb3g6OSxpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6My4yfX19LHBlcnNwZWN0aXZlT3JpZ2luWDp7dmFsdWU6e2luaXRpYWw6JzUwJScsa2V5d29yZHM6WydjZW50ZXInLCdsZWZ0JywncmlnaHQnXSxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjMsY2hyb21lOjEyLGVkZ2U6MTIsZmlyZWZveDoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6Mi4zLGNocm9tZToxMSxlZGdlOjAsZmlyZWZveDo5LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9fX0scGVyc3BlY3RpdmVPcmlnaW5ZOnt2YWx1ZTp7aW5pdGlhbDonNTAlJyxrZXl3b3JkczpbJ2NlbnRlcicsJ2xlZnQnLCdyaWdodCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6MyxjaHJvbWU6MTIsZWRnZToxMixmaXJlZm94OjEwLGlvc19zYWY6My4yLG9wZXJhOjE1LHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDoyLjMsY2hyb21lOjExLGVkZ2U6MCxmaXJlZm94OjksaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn19fSxwb2ludGVyRXZlbnRzOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhbGwnLCdhdXRvJywnZmlsbCcsJ25vbmUnLCdwYWludGVkJywnc3Ryb2tlJywndmlzaWJsZScsJ3Zpc2libGVGaWxsJywndmlzaWJsZVBhaW50ZWQnLCd2aXNpYmxlU3Ryb2tlJ119fSxwb3NpdGlvbjp7dmFsdWU6e2luaXRpYWw6J3N0YXRpYycsa2V5d29yZHM6WydhYnNvbHV0ZScsJ2ZpeGVkJywncmVsYXRpdmUnLCdzdGF0aWMnLCdzdGlja3knXX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOnsgLy8gZ2VuZXJhbFxuY29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J3N0aWNreSd9LGJyb3dzZXI6e2lvc19zYWY6e3VwdG86N319LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnc3RpY2t5XFwnLid9fX0scXVvdGVzOnt2YWx1ZTp7a2V5d29yZHM6Wydub25lJ119fSxyOnt2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlfX0scmVnaW9uRnJhZ21lbnQ6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF91Yzo5LjksaW9zX3NhZjo3LHNhZmFyaTo2LjF9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjAsYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZTowLGZpcmVmb3g6NDYsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjYsb3BfbWluaTo1LG9wZXJhOjM2LHNhZmFyaTo2fX19LHJlc2l6ZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnYmxvY2snLCdib3RoJywnaG9yaXpvbnRhbCcsJ2lubGluZScsJ25vbmUnLCd2ZXJ0aWNhbCddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NDYsY2hyb21lOjQsZmlyZWZveDo0LG9wZXJhOjE1LHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MCxlZGdlOjE0LGZpcmVmb3g6My42LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjkuMyxvcF9taW5pOjUsb3BlcmE6MTIsc2FmYXJpOjMuMn0saXNzdWVzOnsgLy8gZ2VuZXJhbFxuYnJvd3Nlcjp7b3BlcmE6e3VwdG86MTIuMX19LGhpbnQ6J2lzIG9ubHkgc3VwcG9ydGVkIG9uIFxcJzx0ZXh0YXJlYT5cXCcuJ319fSxyb3dHYXA6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC4xLGNocm9tZToyNCxlZGdlOjAsZmlyZWZveDoxOCxpZTo4LGllX21vYjowLGlvc19zYWY6NSxvcF9taW5pOjUsb3BlcmE6Mjcsc2FmYXJpOjUuMX19fSxyaWdodDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0byddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LHJ4Ont2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlfX0scnk6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWV9fSxzY3JvbGxTbmFwQ29vcmRpbmF0ZTp7dmFsdWU6e2luaXRpYWw6J25vbmUnfSxjb21wYXRpYmlsaXR5OntmdWxsOntmaXJlZm94OjM5LGlvc19zYWY6OX0scGFydGlhbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NDYsY2hyb21lOjUwLGVkZ2U6MCxmaXJlZm94OjM4LGllOjksaWVfbW9iOjExLGlvc19zYWY6OC4xLG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6OH0saXNzdWVzOlt7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J25vbmUnfSxicm93c2VyOntzYWZhcmk6OX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdub25lXFwnLid9LHtjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL3RvcHxsZWZ0fHJpZ2h0fGJvdHRvbS8pIT09bnVsbH0sYnJvd3Nlcjp7c2FmYXJpOjl9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgbGVuZ3RoIGtleXdvcmRzIFxcJ3RvcFxcJywgXFwncmlnaHRcXCcsIFxcJ2xlZnRcXCcgYW5kIFxcJ2JvdHRvbVxcJy4nfV19fSxzY3JvbGxTbmFwRGVzdGluYXRpb246e3ZhbHVlOntpbml0aWFsOicwcHggMHB4J30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7ZmlyZWZveDozOSxpb3Nfc2FmOjl9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjAsZmlyZWZveDozOCxpZTo5LGllX21vYjoxMSxpb3Nfc2FmOjguMSxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjh9LGlzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC90b3B8bGVmdHxyaWdodHxib3R0b20vKSE9PW51bGx9LGJyb3dzZXI6e3NhZmFyaTo5fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IGxlbmd0aCBrZXl3b3JkcyBcXCd0b3BcXCcsIFxcJ3JpZ2h0XFwnLCBcXCdsZWZ0XFwnIGFuZCBcXCdib3R0b21cXCcuJ319fSwgLy8gVE9ETzogQ29tcGxldGVcbnNjcm9sbFNuYXBUeXBlOntjb21wYXRpYmlsaXR5OntmdWxsOntmaXJlZm94OjM5LGlvc19zYWY6OX0scGFydGlhbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NDYsY2hyb21lOjUwLGVkZ2U6MCxmaXJlZm94OjM4LGllOjksaWVfbW9iOjExLGlvc19zYWY6OC4xLG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6OH19fSxzY3JvbGxTbmFwUG9pbnRzWDp7dmFsdWU6e2luaXRpYWw6J25vbmUnfSxjb21wYXRpYmlsaXR5OntmdWxsOntmaXJlZm94OjM5LGlvc19zYWY6OX0scGFydGlhbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NDYsY2hyb21lOjUwLGVkZ2U6MCxmaXJlZm94OjM4LGllOjksaWVfbW9iOjExLGlvc19zYWY6OC4xLG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6OH0saXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0nbm9uZSd9LGJyb3dzZXI6e3NhZmFyaTo5fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ25vbmVcXCcuJ319fSxzY3JvbGxTbmFwUG9pbnRzWTp7dmFsdWU6e2luaXRpYWw6J25vbmUnfSxjb21wYXRpYmlsaXR5OntmdWxsOntmaXJlZm94OjM5LGlvc19zYWY6OX0scGFydGlhbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NDYsY2hyb21lOjUwLGVkZ2U6MCxmaXJlZm94OjM4LGllOjksaWVfbW9iOjExLGlvc19zYWY6OC4xLG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6OH0saXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWU9PT0nbm9uZSd9LGJyb3dzZXI6e3NhZmFyaTo5fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ25vbmVcXCcuJ319fSxzaGFwZUltYWdlVGhyZXNob2xkOntjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZHJvaWQ6NDYsY2hyb21lOjM3LGlvc19zYWY6OCxvcGVyYToyNCxzYWZhcmk6Ny4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuNCxjaHJvbWU6MzYsZWRnZToxNCxmaXJlZm94OjQ2LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjIzLHNhZmFyaTo3fX19LHNoYXBlSW1hZ2VNYXJnaW46e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kcm9pZDo0NixjaHJvbWU6MzcsaW9zX3NhZjo4LG9wZXJhOjI0LHNhZmFyaTo3LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZTozNixlZGdlOjE0LGZpcmVmb3g6NDYsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MjMsc2FmYXJpOjd9fX0sc2hhcGVJbWFnZU91dHNpZGU6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kcm9pZDo0NixjaHJvbWU6MzcsaW9zX3NhZjo4LG9wZXJhOjI0LHNhZmFyaTo3LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NC40LGNocm9tZTozNixlZGdlOjE0LGZpcmVmb3g6NDYsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NyxvcF9taW5pOjUsb3BlcmE6MjMsc2FmYXJpOjd9fX0sc2hhcGVSZW5kZXJpbmc6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdjcmlzcEVkZ2VzJywnZ2VvbWV0cmljUHJlY2lzaW9uJywnb3B0aW1pemVTcGVlZCddfX0sc3BlYWs6e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2F1dG8nLCdub25lJywnbm9ybWFsJ119fSxzdG9wQ29sb3I6e3ZhbHVlOntjb2xvcjp0cnVlLGluaXRpYWw6J2JsYWNrJ319LHN0b3BPcGFjaXR5Ont2YWx1ZTp7aW5pdGlhbDoxLHJhbmdlOlswLDFdfX0sc3Ryb2tlOnt2YWx1ZTp7Y29sb3I6dHJ1ZSxpbml0aWFsOidibGFjayd9fSxzdHJva2VEYXNoYXJyYXk6e3ZhbHVlOntpbml0aWFsOidub25lJ30sY29tcGF0aWJpbGl0eTp7aXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL2NhbGNcXCgvKSE9PW51bGx9LGJyb3dzZXI6e2ZpcmVmb3g6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdjYWxjKClcXCcuJ319fSxzdHJva2VEYXNob2Zmc2V0Ont2YWx1ZTp7aW5pdGlhbDoxLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7aXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL2NhbGNcXCgvKSE9PW51bGx9LGJyb3dzZXI6e2ZpcmVmb3g6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdjYWxjKClcXCcuJ319fSxzdHJva2VMaW5lY2FwOnt2YWx1ZTp7aW5pdGlhbDonYnV0dCcsa2V5d29yZHM6WydidXR0Jywncm91bmQnLCdzcXVhcmUnXX19LHN0cm9rZUxpbmVqb2luOnt2YWx1ZTp7aW5pdGlhbDonbWl0ZXInLGtleXdvcmRzOlsnYmV2ZWwnLCdtaXRlcicsJ3JvdW5kJ119fSxzdHJva2VPcGFjaXR5Ont2YWx1ZTp7aW5pdGlhbDoxLHJhbmdlOlswLDFdfX0sc3Ryb2tlV2lkdGg6e3ZhbHVlOntpbml0aWFsOjEsbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvY2FsY1xcKC8pIT09bnVsbH0sYnJvd3Nlcjp7ZmlyZWZveDp0cnVlfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2NhbGMoKVxcJy4nfX19LHRhYlNpemU6e3ZhbHVlOntpbml0aWFsOjgsaW50ZWdlcjp0cnVlLGxlbmd0aDp0cnVlLHBvc2l0aXZlOnRydWV9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsY2hyb21lOjQyLG9wZXJhOjI5fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjkuOSxhbmRyb2lkOjQuMixjaHJvbWU6MjAsZWRnZToxNCxmaXJlZm94OjMuNixpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo2LG9wX21pbmk6MCxvcGVyYToxMC41LHNhZmFyaTo2fSxpc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiBwYXJzZUludCh2YWx1ZSwxMCkhPXZhbHVlfSxicm93c2VyOntjaHJvbWU6e3VwdG86NDF9LG9wZXJhOnt1cHRvOjI4fSxmaXJlZm94OnRydWUsc2FmYXJpOnRydWUsb3BfbWluaTp0cnVlLGlvc19zYWY6dHJ1ZSxhbmRyb2lkOnRydWV9LGhpbnQ6J29ubHkgc3VwcG9ydHMgaW50ZWdlciB2YWx1ZXMuJ319fSx0YWJsZUxheW91dDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0bycsJ2ZpeGVkJ119fSx0ZXh0QWxpZ246e3ZhbHVlOntpbml0aWFsOidpbmhlcml0JyxrZXl3b3JkczpbJ2NlbnRlcicsJ2VuZCcsJ2p1c3RpZnknLCdqdXN0aWZ5LWFsbCcsJ2xlZnQnLCdtYXRjaC1wYXJlbnQnLCdyaWdodCcsJ3N0YXJ0J119fSx0ZXh0QWxpZ25MYXN0Ont2YWx1ZTp7aW5pdGlhbDonYXV0byd9LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsY2hyb21lOjQ3LGZpcmVmb3g6MTIsb3BlcmE6MzR9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6OS45LGFuZHJvaWQ6NDYsY2hyb21lOjQ2LGVkZ2U6MCxmaXJlZm94OjExLGllOjAsaWVfbW9iOjAsaW9zX3NhZjo5LjMsb3BfbWluaTo1LG9wZXJhOjM2LHNhZmFyaTo5LjF9fX0sdGV4dEFuY2hvcjp7dmFsdWU6e2luaXRpYWw6J3N0YXJ0JyxrZXl3b3JkczpbJ2VuZCcsJ21pZGRsZScsJ3N0YXJ0J119fSx0ZXh0RGVjb3JhdGlvbjp7dmFsdWU6e2luaXRpYWw6J25vbmUnfSxsb25naGFuZHM6Wyd0ZXh0RGVjb3JhdGlvbkNvbG9yJywndGV4dERlY29yYXRpb25TdHlsZScsJ3RleHREZWNvcmF0aW9uTGluZSddfSx0ZXh0RGVjb3JhdGlvbkNvbG9yOnt2YWx1ZTp7Y29sb3I6dHJ1ZSxpbml0aWFsOidjdXJyZW50Q29sb3InfSxjb21wYXRpYmlsaXR5OntmdWxsOntmaXJlZm94OjZ9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjE0LGZpcmVmb3g6NSxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6N319fSx0ZXh0RGVjb3JhdGlvbkxpbmU6e3ZhbHVlOntpbml0aWFsOidub25lJyxrZXl3b3JkczpbJ2xpbmUtdGhyb3VnaCcsJ25vbmUnLCdvdmVybGluZScsJ3VuZGVybGluZSddfSxjb21wYXRpYmlsaXR5OntmdWxsOntmaXJlZm94OjZ9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjE0LGZpcmVmb3g6NSxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6N319fSx0ZXh0RGVjb3JhdGlvblN0eWxlOnt2YWx1ZTp7aW5pdGlhbDonc29saWQnfSxjb21wYXRpYmlsaXR5OntmdWxsOntmaXJlZm94OjZ9LHBhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjE0LGZpcmVmb3g6NSxpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo3LG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6N319fSx0ZXh0RGVjb3JhdGlvblNraXA6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2ZpcmVmb3g6Nn0scGFydGlhbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6NDYsY2hyb21lOjUwLGVkZ2U6MTQsZmlyZWZveDo1LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjcsb3BfbWluaTo1LG9wZXJhOjM2LHNhZmFyaTo3fX19LHRleHRFbXBoYXNpc1Bvc2l0aW9uOntjb21wYXRpYmlsaXR5OntmdWxsOntpb3Nfc2FmOjcsc2FmYXJpOjcuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6NC4yLGNocm9tZToyNCxlZGdlOjE0LGZpcmVmb3g6NDYsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NixvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Nn19fSx0ZXh0RW1waGFzaXM6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2lvc19zYWY6NyxzYWZhcmk6Ny4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDo0LjIsY2hyb21lOjI0LGVkZ2U6MTQsZmlyZWZveDo0NixpZToxMSxpZV9tb2I6MTEsaW9zX3NhZjo2LG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTo2fX19LHRleHRFbXBoYXNpc1N0eWxlOntjb21wYXRpYmlsaXR5OntmdWxsOntpb3Nfc2FmOjcsc2FmYXJpOjcuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6NC4yLGNocm9tZToyNCxlZGdlOjE0LGZpcmVmb3g6NDYsaWU6MTEsaWVfbW9iOjExLGlvc19zYWY6NixvcF9taW5pOjUsb3BlcmE6MTIuMSxzYWZhcmk6Nn19fSx0ZXh0RW1waGFzaXNDb2xvcjp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7aW9zX3NhZjo3LHNhZmFyaTo3LjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjQuMixjaHJvbWU6MjQsZWRnZToxNCxmaXJlZm94OjQ2LGllOjExLGllX21vYjoxMSxpb3Nfc2FmOjYsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjZ9fX0sdGV4dEluZGVudDp7dmFsdWU6e2luaXRpYWw6MCxsZW5ndGg6dHJ1ZSxwZXJjZW50YWdlOnRydWV9fSx0ZXh0T3ZlcmZsb3c6e3ZhbHVlOntpbml0aWFsOidjbGlwJyxrZXl3b3JkczpbJ2NsaXAnLCdlbGxpcHNpcyddLHN0cmluZzp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDoyLjEsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjcsaWU6NixpZV9tb2I6MTAsaW9zX3NhZjozLjIsb3BfbWluaTo1LG9wZXJhOjksc2FmYXJpOjMuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDowLGllOjUuNSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTowLG9wZXJhOjAsc2FmYXJpOjB9LGlzc3VlczpbeyAvLyBnZW5lcmFsXG5icm93c2VyOntpZTo5fSxoaW50OidpcyBub3Qgc3VwcG9ydGVkIG9uIFxcJzxpbnB1dD5cXCcgd2l0aCB0eXBlIG9mIFxcJ3RleHRcXCcuJ30se2Jyb3dzZXI6e2Nocm9tZTp0cnVlLGllOnRydWV9LGhpbnQ6J2lzIG5vdCBzdXBwb3J0ZWQgb24gXFwnPHNlbGVjdD5cXCcuJ31dfX0sdGV4dFJlbmRlcmluZzp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0bycsJ2dlb21ldHJpY1ByZWNpc2lvbicsJ29wdGltaXplTGVnaWJpbGl0eScsJ29wdGltaXplU3BlZWQnXX19LHRleHRTaGFkb3c6e3ZhbHVlOntpbml0aWFsOidub25lJ30sY29tcGF0aWJpbGl0eTp7aXNzdWVzOlt7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLnJlcGxhY2UoLyhyZ2JbYV0/fGhzbFthXT8pXFwoLipcXCkvZywnJykubWF0Y2goL1ssXS8pIT09bnVsbH0sYnJvd3Nlcjp7c2FmYXJpOnt1cHRvOjN9fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIHNoYWRvd3MuJ30seyAvLyB0byBiZSBpbXByb3ZlZCBmb3Iga2V5d29yZCBtYXRjaGluZ1xuY29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9bI118cmdifGhzbHxbYS16XXszLH0vKT09PW51bGx9LGJyb3dzZXI6e3NhZmFyaTo1LjF9LGhpbnQ6J3JlcXVpcmVzIGEgY29sb3IuJ30se2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3ZhciBjb2xvckNsZWFuPXZhbHVlLnJlcGxhY2UoL3JnYlthXT9cXCguKlxcKS9nLCcnKTt2YXIgc2hhZG93cz1jb2xvckNsZWFuLnNwbGl0KCcsJyk7dmFyIGludmFsaWQ9ZmFsc2U7c2hhZG93cy5mb3JFYWNoKGZ1bmN0aW9uKHNoYWRvdyl7dmFyIGNvbG9yU3BsaXQ9c2hhZG93LnNwbGl0KCcgJyk7aWYoY29sb3JTcGxpdC5sZW5ndGg+PTMpe2lmKGNvbG9yU3BsaXRbMl09PT0nMHB4Jyl7aW52YWxpZD10cnVlfX19KTtyZXR1cm4gaW52YWxpZH0sYnJvd3Nlcjp7YW5kcm9pZDp7dXB0bzoyLjN9fSxoaW50Oidkb2VzIG5vdCBcXCcwcHhcXCcgYXMgYmx1ciByYWRpdXMuJ31dfX0sdGV4dFNpemVBZGp1c3Q6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF91Yzo5LjksaWVfbW9iOjEwLGlvc19zYWY6NX0scGFydGlhbDp7YW5kX2Nocjo0NyxhbmRfdWM6MCxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjE0LGZpcmVmb3g6NDYsaWU6MTEsaWVfbW9iOjAsaW9zX3NhZjo0LjIsb3BfbWluaTo1LG9wZXJhOjM2LHNhZmFyaTo5LjF9fX0sdGV4dFRyYW5zZm9ybTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnY2FwaXRhbGl6ZScsJ2Z1bGwtd2lkdGgnLCdsb3dlcmNhc2UnLCdub25lJywndXBwZXJjYXNlJ119fSx0ZXh0VW5kZXJsaW5lUG9zaXRpb246e3ZhbHVlOntpbml0aWFsOidhdXRvJyxrZXl3b3JkczpbJ2Fib3ZlJywnYXV0bycsJ2F1dG8tcG9zJywnYmVsb3cnLCdsZWZ0JywncmlnaHQnLCd1bmRlciddfX0sdG9wOnt2YWx1ZTp7aW5pdGlhbDonYXV0bycsa2V5d29yZHM6WydhdXRvJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sdG91Y2hBY3Rpb246e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kcm9pZDo0NixjaHJvbWU6MzYsZWRnZToxMixpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjo5LjMsb3BlcmE6MjMsc2FmYXJpOjkuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91Yzo5LjksYW5kcm9pZDo0LjQsY2hyb21lOjM1LGVkZ2U6MCxmaXJlZm94OjQ2LGllOjksaWVfbW9iOjAsaW9zX3NhZjo5LG9wX21pbmk6NSxvcGVyYToyMixzYWZhcmk6OX19fSx0cmFuc2Zvcm06e3ZhbHVlOntpbml0aWFsOidub25lJ30sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6MyxjaHJvbWU6MTIsZWRnZToxMixmaXJlZm94OjEwLGllOjksaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjE1LHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDoyLjMsY2hyb21lOjExLGVkZ2U6MCxmaXJlZm94OjksaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn0saXNzdWVzOntjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL2NhbGNcXCgvKSE9PW51bGx9LGJyb3dzZXI6e2llOnRydWV9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgXFwnY2FsYygpXFwnLid9fX0sdHJhbnNmb3JtT3JpZ2luOnt2YWx1ZTp7aW5pdGlhbDonNTAlIDUwJSAwJyxrZXl3b3JkczpbJ2JvdHRvbScsJ2NlbnRlcicsJ2xlZnQnLCdyaWdodCcsJ3RvcCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6MyxjaHJvbWU6MTIsZWRnZToxMixmaXJlZm94OjEwLGllOjksaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjE1LHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDoyLjMsY2hyb21lOjExLGVkZ2U6MCxmaXJlZm94OjksaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn0saXNzdWVzOnsgLy8gZ2VuZXJhbFxuYnJvd3Nlcjp7ZmlyZWZveDp7dXB0bzo0Mn19LGhpbnQ6J2lzIG5vdCBzdXBwb3J0ZWQuJ319fSx0cmFuc2Zvcm1PcmlnaW5YOnt2YWx1ZTp7aW5pdGlhbDonNTAlJyxrZXl3b3JkczpbJ2NlbnRlcicsJ2xlZnQnLCdyaWdodCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6MyxjaHJvbWU6MTIsZWRnZToxMixmaXJlZm94OjEwLGllOjksaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjE1LHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDoyLjMsY2hyb21lOjExLGVkZ2U6MCxmaXJlZm94OjksaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn0saXNzdWVzOnsgLy8gZ2VuZXJhbFxuYnJvd3Nlcjp7ZmlyZWZveDp7dXB0bzo0Mn19LGhpbnQ6J2lzIG5vdCBzdXBwb3J0ZWQuJ319fSx0cmFuc2Zvcm1PcmlnaW5ZOnt2YWx1ZTp7aW5pdGlhbDonNTAlJyxrZXl3b3JkczpbJ2JvdHRvbScsJ2NlbnRlcicsJ3RvcCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6MyxjaHJvbWU6MTIsZWRnZToxMixmaXJlZm94OjEwLGllOjksaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjE1LHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDoyLjMsY2hyb21lOjExLGVkZ2U6MCxmaXJlZm94OjksaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn0saXNzdWVzOnsgLy8gZ2VuZXJhbFxuYnJvd3Nlcjp7ZmlyZWZveDp7dXB0bzo0Mn19LGhpbnQ6J2lzIG5vdCBzdXBwb3J0ZWQuJ319fSx0cmFuc2Zvcm1PcmlnaW5aOnt2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6MyxjaHJvbWU6MTIsZWRnZToxMixmaXJlZm94OjEwLGlvc19zYWY6My4yLG9wZXJhOjE1LHNhZmFyaTo0fSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDoyLjMsY2hyb21lOjExLGVkZ2U6MCxmaXJlZm94OjksaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjMuMn0saXNzdWVzOnsgLy8gZ2VuZXJhbFxuYnJvd3Nlcjp7ZmlyZWZveDp7dXB0bzo0Mn19LGhpbnQ6J2lzIG5vdCBzdXBwb3J0ZWQuJ319fSx0cmFuc2Zvcm1TdHlsZTp7dmFsdWU6e2luaXRpYWw6J2ZsYXQnLGtleXdvcmRzOlsnZmxhdCcsJ3ByZXNlcnZlLTNkJ119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjMsY2hyb21lOjEyLGVkZ2U6MTIsZmlyZWZveDoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6NH0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6Mi4zLGNocm9tZToxMSxlZGdlOjAsZmlyZWZveDo5LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMi4xLHNhZmFyaTozLjJ9LGlzc3Vlczp7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPT09J3ByZXNlcnZlLTNkJ30sYnJvd3Nlcjp7aWU6dHJ1ZX0saGludDonZG9lcyBub3Qgc3VwcG9ydCBcXCdwcmVzZXJ2ZS0zZFxcJy4nfX19LHRyYW5zaXRpb246e3ZhbHVlOntpbml0aWFsOidub25lJ30sbG9uZ2hhbmRzOlsndHJhbnNpdGlvblByb3BlcnR5JywndHJhbnNpdGlvbkR1cmF0aW9uJywndHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uJywndHJhbnNpdGlvbkRlbGF5J10sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6Mi4xLGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo0LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMC41LHNhZmFyaTozLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6My42LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMCxzYWZhcmk6MH0saXNzdWVzOlt7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9iYWNrZ3JvdW5kLXNpemUvKSE9PW51bGx9LGJyb3dzZXI6e2llOnt1cHRvOjEwfX0saGludDonZG9lcyBub3Qgc3VwcG9ydCB0cmFuc2l0aW9ucyBvbiBcXCdiYWNrZ3JvdW5kLXNpemVcXCcuJ30se2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZS5tYXRjaCgvZmlsbC8pIT09bnVsbH0sYnJvd3Nlcjp7aWU6MTF9LGhpbnQ6J2RvZXMgbm90IHN1cHBvcnQgdHJhbnNpdGlvbnMgb24gU1ZHIFxcJ2ZpbGxcXCcuJ31dfX0sdHJhbnNpdGlvbkRlbGF5Ont2YWx1ZTp7aW5pdGlhbDonMHMnLHRpbWU6dHJ1ZX0sY29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6Mi4xLGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDo0LGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxMC41LHNhZmFyaTozLjF9LHBhcnRpYWw6e2FuZF9jaHI6MCxhbmRfdWM6MCxhbmRyb2lkOjAsY2hyb21lOjAsZWRnZTowLGZpcmVmb3g6My42LGllOjksaWVfbW9iOjAsaW9zX3NhZjowLG9wX21pbmk6NSxvcGVyYToxMCxzYWZhcmk6MH19fSx0cmFuc2l0aW9uRHVyYXRpb246e3ZhbHVlOntpbml0aWFsOicwcycsdGltZTp0cnVlfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDoyLjEsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjQsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEwLjUsc2FmYXJpOjMuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDozLjYsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEwLHNhZmFyaTowfX19LHRyYW5zaXRpb25Qcm9wZXJ0eTp7dmFsdWU6e2luaXRpYWw6J25vbmUnLGtleXdvcmRzOlsnYWxsJywnbm9uZSddfSxjb21wYXRpYmlsaXR5OntmdWxsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDoyLjEsY2hyb21lOjQsZWRnZToxMixmaXJlZm94OjQsaWU6MTAsaWVfbW9iOjEwLGlvc19zYWY6My4yLG9wZXJhOjEwLjUsc2FmYXJpOjMuMX0scGFydGlhbDp7YW5kX2NocjowLGFuZF91YzowLGFuZHJvaWQ6MCxjaHJvbWU6MCxlZGdlOjAsZmlyZWZveDozLjYsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEwLHNhZmFyaTowfSxpc3N1ZXM6W3tjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlLHN0eWxlcyl7dmFyIHByb3BzPXZhbHVlLnNwbGl0KCcsJyk7dmFyIGludmFsaWQ9ZmFsc2U7cHJvcHMuZm9yRWFjaChmdW5jdGlvbihwcm9wKXt2YXIgY2FtZWxDYXNlZFByb3A9ZGFzaFRvQ2FtZWxDYXNlKHByb3ApO2lmKHN0eWxlc1tjYW1lbENhc2VkUHJvcF0mJnN0eWxlc1tjYW1lbENhc2VkUHJvcF0udG9TdHJpbmcoKS5tYXRjaCgvY2FsY1xcKC8pIT09bnVsbCl7aW52YWxpZD10cnVlfX0pO3JldHVybiBpbnZhbGlkfSxicm93c2VyOntpZTp0cnVlfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IHRyYW5zaXRpb25zIG9uIHByb3BlcnRpZXMgd2l0aCBcXCdjYWxjXFwnLid9LHtjb25kaXRpb246ZnVuY3Rpb24gY29uZGl0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWUubWF0Y2goL2JhY2tncm91bmQtc2l6ZS8pIT09bnVsbH0sYnJvd3Nlcjp7aWU6e3VwdG86MTB9fSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IHRyYW5zaXRpb25zIG9uIFxcJ2JhY2tncm91bmQtc2l6ZVxcJy4nfSx7Y29uZGl0aW9uOmZ1bmN0aW9uIGNvbmRpdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlLm1hdGNoKC9maWxsLykhPT1udWxsfSxicm93c2VyOntpZToxMX0saGludDonZG9lcyBub3Qgc3VwcG9ydCB0cmFuc2l0aW9ucyBvbiBTVkcgXFwnZmlsbFxcJy4nfV19fSx0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb246e3ZhbHVlOntjdWJpY0Jlemllcjp0cnVlLGluaXRpYWw6J2Vhc2UnLGtleXdvcmRzOlsnZWFzZScsJ2Vhc2UtaW4nLCdlYXNlLWluLW91dCcsJ2Vhc2Utb3V0JywnbGluZWFyJywnc3RlcC1lbmQnLCdzdGVwLXN0YXJ0J119LGNvbXBhdGliaWxpdHk6e2Z1bGw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjIuMSxjaHJvbWU6NCxlZGdlOjEyLGZpcmVmb3g6NCxpZToxMCxpZV9tb2I6MTAsaW9zX3NhZjozLjIsb3BlcmE6MTAuNSxzYWZhcmk6My4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjMuNixpZTo5LGllX21vYjowLGlvc19zYWY6MCxvcF9taW5pOjUsb3BlcmE6MTAsc2FmYXJpOjB9fX0sdW5pY29kZUJpZGk6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnYmlkaS1vdmVycmlkZScsJ2VtYmVkJywnaXNvbGF0ZScsJ2lzb2xhdGUtb3ZlcnJpZGUnLCdub3JtYWwnLCdwbGFpbnRleHQnXX19LCAvLyBUT0RPOiBjb21wbGV0ZVxudXNlclNlbGVjdDp7Y29tcGF0aWJpbGl0eTp7ZnVsbDp7YW5kX2Nocjo0NyxhbmRfdWM6OS45LGFuZHJvaWQ6Mi4xLGNocm9tZTo0LGVkZ2U6MTIsZmlyZWZveDoyLGllOjEwLGllX21vYjoxMCxpb3Nfc2FmOjMuMixvcGVyYToxNSxzYWZhcmk6My4xfSxwYXJ0aWFsOnthbmRfY2hyOjAsYW5kX3VjOjAsYW5kcm9pZDowLGNocm9tZTowLGVkZ2U6MCxmaXJlZm94OjAsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjAsb3BfbWluaTo1LG9wZXJhOjEyLjEsc2FmYXJpOjB9fX0sdmVydGljYWxBbGlnbjp7dmFsdWU6e2luaXRpYWw6J2Jhc2VsaW5lJyxrZXl3b3JkczpbJ2Jhc2VsaW5lJywnYm90dG9tJywnbWlkZGxlJywnc3ViJywnc3VwZXInLCd0ZXh0LWJvdHRvbScsJ3RleHQtdG9wJywndG9wJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sdmlzaWJpbGl0eTp7dmFsdWU6e2luaXRpYWw6J3Zpc2libGUnLGtleXdvcmRzOlsnY29sbGFwc2UnLCdoaWRkZW4nLCd2aXNpYmxlJ119fSx3aGl0ZVNwYWNlOnt2YWx1ZTp7aW5pdGlhbDonbm9ybWFsJyxrZXl3b3JkczpbJ25vcm1hbCcsJ25vd3JhcCcsJ3ByZScsJ3ByZS1saW5lJywncHJlLXdyYXAnXX19LHdpZG93czp7dmFsdWU6e2luaXRpYWw6MCxpbnRlZ2VyOnRydWUscG9zaXRpdmU6dHJ1ZSxub3ROdWxsOnRydWV9fSx3aWR0aDp7dmFsdWU6e2luaXRpYWw6J2F1dG8nLGtleXdvcmRzOlsnYXV0bycsJ2F2YWlsYWJsZScsJ2ZpdC1jb250ZW50JywnbWF4LWNvbnRlbnQnLCdtaW4tY29udGVudCddLGxlbmd0aDp0cnVlLHBlcmNlbnRhZ2U6dHJ1ZX19LHdvcmRCcmVhazp7dmFsdWU6e2luaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6WydicmVhay1hbGwnLCdrZWVwLWFsbCcsJ25vcm1hbCddfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZT09PSdrZWVwLWFsbCd9LGJyb3dzZXI6e2Nocm9tZTp7dXB0bzo0M30sc2FmYXJpOnt1cHRvOjh9LG9wZXJhOnt1cHRvOjMwfSxpb3Nfc2FmOnt1cHRvOjguNH0sYW5kcm9pZDp7dXB0bzo0LjR9LGFuZF91Yzp0cnVlfSxoaW50Oidkb2VzIG5vdCBzdXBwb3J0IFxcJ2tlZXAtYWxsXFwnLid9fX0sd29yZFNwYWNpbmc6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnbm9ybWFsJ10sbGVuZ3RoOnRydWUscGVyY2VudGFnZTp0cnVlfX0sd29yZFdyYXA6e3ZhbHVlOntpbml0aWFsOidub3JtYWwnLGtleXdvcmRzOlsnYnJlYWstd29yZCcsJ25vcm1hbCddfX0sd3JhcEZsb3c6e2NvbXBhdGliaWxpdHk6e3BhcnRpYWw6e2FuZF9jaHI6NDcsYW5kX3VjOjkuOSxhbmRyb2lkOjQ2LGNocm9tZTo1MCxlZGdlOjAsZmlyZWZveDo0NixpZTo5LGllX21vYjowLGlvc19zYWY6OS4zLG9wX21pbmk6NSxvcGVyYTozNixzYWZhcmk6OS4xfSxmdWxsOntlZGdlOjEyLGllOjEwLGllX21vYjoxMH19fSx3cmFwTWFyZ2luOntjb21wYXRpYmlsaXR5OntwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZTowLGZpcmVmb3g6NDYsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjkuMyxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjkuMX0sZnVsbDp7ZWRnZToxMixpZToxMCxpZV9tb2I6MTB9fX0sd3JhcFRocm91Z2g6e2NvbXBhdGliaWxpdHk6e2Z1bGw6e2VkZ2U6MTIsaWU6MTAsaWVfbW9iOjEwfSxwYXJ0aWFsOnthbmRfY2hyOjQ3LGFuZF91Yzo5LjksYW5kcm9pZDo0NixjaHJvbWU6NTAsZWRnZTowLGZpcmVmb3g6NDYsaWU6OSxpZV9tb2I6MCxpb3Nfc2FmOjkuMyxvcF9taW5pOjUsb3BlcmE6MzYsc2FmYXJpOjkuMX19fSx3cml0aW5nTW9kZTp7dmFsdWU6e2luaXRpYWw6J2hvcml6b250YWwtdGInLGtleXdvcmRzOlsnaG9yaXpvbnRhbC10YicsJ2xyJywnbHItdGInLCdyYi1ybCcsJ3JsJywnc2lkZXdheXMtbHInLCdzaWRld2F5cy1ybCcsJ3RiJywndmVydGljYWwtbHInLCd2ZXJ0aWNhbC1ybCddfSxjb21wYXRpYmlsaXR5Ontpc3N1ZXM6e2NvbmRpdGlvbjpmdW5jdGlvbiBjb25kaXRpb24odmFsdWUpe3JldHVybiB2YWx1ZSE9PSdsdHInfHx2YWx1ZSE9PSdydGwnfSxicm93c2VyOntpZTp0cnVlfSxoaW50Oidkb2VzIG9ubHkgc3VwcG9ydCBcXCdsdHJcXCcgYW5kIFxcJ3J0bFxcJy4nfX19LHg6e3ZhbHVlOntpbml0aWFsOjAsbGVuZ3RoOnRydWV9fSx5Ont2YWx1ZTp7aW5pdGlhbDowLGxlbmd0aDp0cnVlfX0sekluZGV4Ont2YWx1ZTp7aW5pdGlhbDonYXV0bycsaW50ZWdlcjp0cnVlLGtleXdvcmRzOlsnYXV0byddLG5lZ2F0aXZlOnRydWUscG9zaXRpdmU6dHJ1ZX19LHpvb206e3ZhbHVlOntmbG9hdDp0cnVlLGluaXRpYWw6J25vcm1hbCcsa2V5d29yZHM6Wydub3JtYWwnXSxwZXJjZW50YWdlOnRydWUscG9zaXRpdmU6dHJ1ZX19fTttb2R1bGUuZXhwb3J0cz1leHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5QbHVnaW5zID0gdW5kZWZpbmVkO1xuXG52YXIgX0xpbnRlciA9IHJlcXVpcmUoJy4vTGludGVyJyk7XG5cbnZhciBfTGludGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0xpbnRlcik7XG5cbnZhciBfc2hvcnRoYW5kTG9uZ2hhbmQgPSByZXF1aXJlKCcuL3BsdWdpbnMvc2hvcnRoYW5kTG9uZ2hhbmQnKTtcblxudmFyIF9zaG9ydGhhbmRMb25naGFuZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaG9ydGhhbmRMb25naGFuZCk7XG5cbnZhciBfbm9WZW5kb3JQcmVmaXggPSByZXF1aXJlKCcuL3BsdWdpbnMvbm9WZW5kb3JQcmVmaXgnKTtcblxudmFyIF9ub1ZlbmRvclByZWZpeDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ub1ZlbmRvclByZWZpeCk7XG5cbnZhciBfbm9Jbml0aWFsVmFsdWUgPSByZXF1aXJlKCcuL3BsdWdpbnMvbm9Jbml0aWFsVmFsdWUnKTtcblxudmFyIF9ub0luaXRpYWxWYWx1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ub0luaXRpYWxWYWx1ZSk7XG5cbnZhciBfcHJlZmVyTnVtYmVyID0gcmVxdWlyZSgnLi9wbHVnaW5zL3ByZWZlck51bWJlcicpO1xuXG52YXIgX3ByZWZlck51bWJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcmVmZXJOdW1iZXIpO1xuXG52YXIgX3JlcXVpcmVVbml0ID0gcmVxdWlyZSgnLi9wbHVnaW5zL3JlcXVpcmVVbml0Jyk7XG5cbnZhciBfcmVxdWlyZVVuaXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVxdWlyZVVuaXQpO1xuXG52YXIgX2NvbXBhdGliaWxpdHkgPSByZXF1aXJlKCcuL3BsdWdpbnMvY29tcGF0aWJpbGl0eScpO1xuXG52YXIgX2NvbXBhdGliaWxpdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcGF0aWJpbGl0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBQbHVnaW5zID0gZXhwb3J0cy5QbHVnaW5zID0ge1xuICBub1ZlbmRvclByZWZpeDogX25vVmVuZG9yUHJlZml4Mi5kZWZhdWx0LFxuICBzaG9ydGhhbmRMb25naGFuZDogX3Nob3J0aGFuZExvbmdoYW5kMi5kZWZhdWx0LFxuICBub0luaXRpYWxWYWx1ZTogX25vSW5pdGlhbFZhbHVlMi5kZWZhdWx0LFxuICBwcmVmZXJOdW1iZXI6IF9wcmVmZXJOdW1iZXIyLmRlZmF1bHQsXG4gIHJlcXVpcmVVbml0OiBfcmVxdWlyZVVuaXQyLmRlZmF1bHQsXG4gIGNvbXBhdGliaWxpdHk6IF9jb21wYXRpYmlsaXR5Mi5kZWZhdWx0XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfTGludGVyMi5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9wcm9wZXJ0eU1hcCA9IHJlcXVpcmUoJy4uL2RhdGEvcHJvcGVydHlNYXAnKTtcblxudmFyIF9wcm9wZXJ0eU1hcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9wZXJ0eU1hcCk7XG5cbnZhciBfYnJvd3Nlck5hbWVzID0gcmVxdWlyZSgnLi4vdXRpbHMvYnJvd3Nlck5hbWVzJyk7XG5cbnZhciBfYnJvd3Nlck5hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Jyb3dzZXJOYW1lcyk7XG5cbnZhciBfdGFyZ2V0QnJvd3NlciA9IHJlcXVpcmUoJy4uL3V0aWxzL3RhcmdldEJyb3dzZXInKTtcblxudmFyIF90YXJnZXRCcm93c2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RhcmdldEJyb3dzZXIpO1xuXG52YXIgX3VucHJlZml4U3R5bGVzID0gcmVxdWlyZSgnLi4vdXRpbHMvdW5wcmVmaXhTdHlsZXMnKTtcblxudmFyIF91bnByZWZpeFN0eWxlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91bnByZWZpeFN0eWxlcyk7XG5cbnZhciBfb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgX29iamVjdEFzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RBc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVFlQRSA9ICdDT01QQVRJQklMSVRZJztcblxudmFyIGdldFZlcnNpb25TdHJpbmcgPSBmdW5jdGlvbiBnZXRWZXJzaW9uU3RyaW5nKHZlcnNpb24pIHtcbiAgdmFyIHZlcnNpb25JZGVudCA9IHVuZGVmaW5lZDtcbiAgaWYgKHZlcnNpb24udXB0bykge1xuICAgIHZlcnNpb25JZGVudCA9ICc8PScgKyB2ZXJzaW9uLnVwdG87XG4gIH0gZWxzZSBpZiAodmVyc2lvbi5mcm9tKSB7XG4gICAgdmVyc2lvbklkZW50ID0gdmVyc2lvbi5mcm9tICsgJy0nICsgdmVyc2lvbi50bztcbiAgfSBlbHNlIGlmICh2ZXJzaW9uID09PSB0cnVlKSB7XG4gICAgdmVyc2lvbklkZW50ID0gJ2FsbCc7XG4gIH0gZWxzZSB7XG4gICAgdmVyc2lvbklkZW50ID0gdmVyc2lvbjtcbiAgfVxuICByZXR1cm4gdmVyc2lvbklkZW50O1xufTtcblxuLy8gQ2hlY2tzIGlmIHRoZXJlIGFyZSBicm93c2VyIGNvbXBhdGliaWxpdHkgaXNzdWVzXG4vLyBVc2VzIGRhdGEgY29sbGVjdGVkIGZyb20gY2FuaXVzZVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2xkU3R5bGVzLCBlbGVtZW50LCB3YXJuaW5ncywgX3JlZikge1xuICB2YXIgY29tcGF0aWJpbGl0eSA9IF9yZWYuY29tcGF0aWJpbGl0eTtcblxuICB2YXIgc3R5bGVzID0gKDAsIF91bnByZWZpeFN0eWxlczIuZGVmYXVsdCkob2xkU3R5bGVzKTtcblxuICB2YXIgdGFyZ2V0ID0gX3RhcmdldEJyb3dzZXIyLmRlZmF1bHQ7XG5cbiAgaWYgKGNvbXBhdGliaWxpdHkgJiYgY29tcGF0aWJpbGl0eS50YXJnZXRCcm93c2VyKSB7XG4gICAgdGFyZ2V0ID0gY29tcGF0aWJpbGl0eS50YXJnZXRCcm93c2VyO1xuICB9XG5cbiAgLy8gZGVmYXVsdCBzdXBwb3J0XG4gIGlmICghY29tcGF0aWJpbGl0eSB8fCBjb21wYXRpYmlsaXR5LmRlZmF1bHQgIT09IGZhbHNlKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgdmFyIHN1cHBvcnREYXRhID0gX3Byb3BlcnR5TWFwMi5kZWZhdWx0W3Byb3BlcnR5XSA/IF9wcm9wZXJ0eU1hcDIuZGVmYXVsdFtwcm9wZXJ0eV0uY29tcGF0aWJpbGl0eSA6IGZhbHNlO1xuXG4gICAgICBpZiAoc3VwcG9ydERhdGEpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgYnJvd3NlclZlcnNpb25zID0gc3VwcG9ydERhdGEuZnVsbCB8fCB7fTtcbiAgICAgICAgICAvLyBpZiBwYXJ0aWFsIHN1cHBvcnQgaXMgdXNlZFxuICAgICAgICAgIC8vIHBhcnRpYWwgc3VwcG9ydCBkYXRhIGdldHMgY29uc2lkZXJlZCBhcyB3ZWxsXG4gICAgICAgICAgaWYgKGNvbXBhdGliaWxpdHkucGFydGlhbCAhPT0gZmFsc2UgJiYgc3VwcG9ydERhdGEucGFydGlhbCkge1xuICAgICAgICAgICAgYnJvd3NlclZlcnNpb25zID0gKDAsIF9vYmplY3RBc3NpZ24yLmRlZmF1bHQpKHt9LCBicm93c2VyVmVyc2lvbnMsIHN1cHBvcnREYXRhLnBhcnRpYWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIHN1cHBvcnQgZGF0YSBhdCBhbGxcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoYnJvd3NlclZlcnNpb25zKS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAvLyBJdGVyYXRlIGV2ZXJ5IGJyb3dzZXJcbiAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb24gPSBicm93c2VyVmVyc2lvbnNbbmFtZV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgICAgICAgICAgIC8vIGlmIHZlcnNpb24gaXMgdHJ1ZSwgZXZlcnkgdmVyc2lvbiBpcyBhZmZlY3RlZFxuICAgICAgICAgICAgICAgIGlmICh2ZXJzaW9uID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0W25hbWVdIDwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgd2FybmluZ3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFRZUEUsXG4gICAgICAgICAgICAgICAgICAgIGhpbnQ6ICdcXCcnICsgcHJvcGVydHkgKyAnXFwnIGlzIG5vdCAnICsgKGNvbXBhdGliaWxpdHkucGFydGlhbCAhPT0gZmFsc2UgPyAnJyA6ICdmdWxseSAnKSArICdzdXBwb3J0ZWQgb24gJyArIF9icm93c2VyTmFtZXMyLmRlZmF1bHRbbmFtZV0gKyAnIHVwIHRvIHZlcnNpb24gJyArIHZlcnNpb24gKyAnLicsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogY29tcGF0aWJpbGl0eS5wYXJ0aWFsID8gJ3BhcnRpYWwnIDogJ2Z1bGwnLFxuICAgICAgICAgICAgICAgICAgICBicm93c2VyOiBfYnJvd3Nlck5hbWVzMi5kZWZhdWx0W25hbWVdLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIHN1cHBvcnQgaXNzdWVzXG4gIGlmICghY29tcGF0aWJpbGl0eSB8fCBjb21wYXRpYmlsaXR5Lmlzc3VlcyAhPT0gZmFsc2UpIHtcbiAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICB2YXIgZGF0YSA9IF9wcm9wZXJ0eU1hcDIuZGVmYXVsdFtwcm9wZXJ0eV0gPyBfcHJvcGVydHlNYXAyLmRlZmF1bHRbcHJvcGVydHldLmNvbXBhdGliaWxpdHkgOiBmYWxzZTtcblxuICAgICAgaWYgKGRhdGEgJiYgZGF0YS5pc3N1ZXMpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgaXNzdWVzID0gZGF0YS5pc3N1ZXM7XG4gICAgICAgICAgaWYgKGlzc3VlcyBpbnN0YW5jZW9mIEFycmF5ICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBpc3N1ZXMgPSBbaXNzdWVzXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgLy8gSXRlcmF0ZSBldmVyeSBiYXNpYyBpc3N1ZVxuICAgICAgICAgIGlzc3Vlcy5mb3JFYWNoKGZ1bmN0aW9uIChpc3N1ZSkge1xuICAgICAgICAgICAgdmFyIGNvbmRpdGlvbiA9IGlzc3VlLmNvbmRpdGlvbjtcbiAgICAgICAgICAgIHZhciBicm93c2VyID0gaXNzdWUuYnJvd3NlcjtcbiAgICAgICAgICAgIHZhciBoaW50ID0gaXNzdWUuaGludDtcbiAgICAgICAgICAgIC8vIE5vIGNvbmRpdGlvbiBhdXRvbWF0aWNhbGx5IHZhbGlkYXRlcyBhcyB0cnVlXG5cbiAgICAgICAgICAgIGlmIChjb25kaXRpb24gPT09IHVuZGVmaW5lZCB8fCBjb25kaXRpb24odmFsdWUudG9TdHJpbmcoKSwgc3R5bGVzLCBlbGVtZW50KSkge1xuICAgICAgICAgICAgICAvLyBpZiBubyBicm93c2VycyBkYXRhIGlzIHByb3ZpZGVkXG4gICAgICAgICAgICAgIC8vIGl0IGF1dG9tYXRpY2FsbHkgaXMgYSBnbG9iYWwgaXNzdWVcbiAgICAgICAgICAgICAgaWYgKCFicm93c2VyKSB7XG4gICAgICAgICAgICAgICAgd2FybmluZ3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBUWVBFLFxuICAgICAgICAgICAgICAgICAgaGludDogJ0V2ZXJ5IGJyb3dzZXIgJyArIGhpbnQsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBJdGVyYXRlIGV2ZXJ5IGJyb3dzZXJcbiAgICAgICAgICAgICAgT2JqZWN0LmtleXMoYnJvd3NlcikuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uID0gYnJvd3NlcltuYW1lXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgIHZhciBtYXhWZXJzaW9uID0gdmVyc2lvbiB8fCB2ZXJzaW9uLnRvIHx8IHZlcnNpb24udXB0bztcbiAgICAgICAgICAgICAgICAvLyBpZiB2ZXJzaW9uIGlzIHRydWUsIGV2ZXJ5IHZlcnNpb24gaXMgYWZmZWN0ZWRcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0W25hbWVdICYmIChtYXhWZXJzaW9uID09PSB0cnVlIHx8IHRhcmdldFticm93c2VyXSA8PSBtYXhWZXJzaW9uKSkge1xuICAgICAgICAgICAgICAgICAgd2FybmluZ3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFRZUEUsXG4gICAgICAgICAgICAgICAgICAgIGhpbnQ6ICdcXCcnICsgcHJvcGVydHkgKyAnXFwnIG9uICcgKyBfYnJvd3Nlck5hbWVzMi5kZWZhdWx0W25hbWVdICsgJyAoVmVyc2lvbjogXFwnICsgJyArIGdldFZlcnNpb25TdHJpbmcodmVyc2lvbikgKyAnKSAnICsgaGludCwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXI6IF9icm93c2VyTmFtZXMyLmRlZmF1bHRbbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb24gPT09IHRydWUgPyAnYWxsJyA6IHZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3Byb3BlcnR5TWFwID0gcmVxdWlyZSgnLi4vZGF0YS9wcm9wZXJ0eU1hcCcpO1xuXG52YXIgX3Byb3BlcnR5TWFwMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BlcnR5TWFwKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFRZUEUgPSAnTk9fSU5JVElBTF9WQUxVRSc7XG52YXIgZ2V0SGludCA9IGZ1bmN0aW9uIGdldEhpbnQocHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiAnSW5pdGlhbCB2YWx1ZSBcXCcnICsgcHJvcGVydHkgKyAnOiAnICsgdmFsdWUgKyAnXFwnIGRvZXMgbm90IG5lZWQgdG8gYmUgc2V0IGV4cGxpY2l0bHkuJztcbn07XG5cbnZhciBpbml0aWFsTWFwID0ge307XG5PYmplY3Qua2V5cyhfcHJvcGVydHlNYXAyLmRlZmF1bHQpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gIGlmIChfcHJvcGVydHlNYXAyLmRlZmF1bHRbcHJvcGVydHldLnZhbHVlICYmIF9wcm9wZXJ0eU1hcDIuZGVmYXVsdFtwcm9wZXJ0eV0udmFsdWUuaW5pdGlhbCkge1xuICAgIGluaXRpYWxNYXBbcHJvcGVydHldID0gX3Byb3BlcnR5TWFwMi5kZWZhdWx0W3Byb3BlcnR5XS52YWx1ZS5pbml0aWFsO1xuICB9XG59KTtcblxuLy8gQ2hlY2tzIGlmIHRoZXJlIGFyZSBwcm9wZXJ0aWVzIHVzaW5nIGluaXRpYWwgcHJvcGVydHkgdmFsdWVzXG4vLyBXYXJucyB0aGF0IHRob3NlIGNhbiBiZSBsZWZ0IG92ZXIgYXMgdGhleSdyZSBzZXQgYW55d2F5XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdHlsZXMsIGVsZW1lbnQsIHdhcm5pbmdzKSB7XG4gIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBpZiAoaW5pdGlhbE1hcFtwcm9wZXJ0eV0gJiYgaW5pdGlhbE1hcFtwcm9wZXJ0eV0gPT0gdmFsdWUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIHdhcm5pbmdzLnB1c2goe1xuICAgICAgICB0eXBlOiBUWVBFLFxuICAgICAgICBoaW50OiBnZXRIaW50KHByb3BlcnR5LCB2YWx1ZSksXG4gICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIFRZUEUgPSAnTk9fVkVORE9SX1BSRUZJWCc7XG52YXIgZ2V0SGludCA9IGZ1bmN0aW9uIGdldEhpbnQocHJvcGVydHksIHZhbHVlLCBzdWdnZXN0aW9uLCBpc1ZhbHVlSXNzdWUpIHtcbiAgaWYgKGlzVmFsdWVJc3N1ZSkge1xuICAgIHJldHVybiAnXFwnJyArIHByb3BlcnR5ICsgJzogJyArIHZhbHVlICsgJ1xcJyBkb2VzIG5vdCBuZWVkIHZlbmRvciBwcmVmaXhlcy4gVXNlIFxcJycgKyBwcm9wZXJ0eSArICc6ICcgKyBzdWdnZXN0aW9uICsgJ1xcJy4nO1xuICB9XG4gIHJldHVybiAnXFwnJyArIHByb3BlcnR5ICsgJzogJyArIHZhbHVlICsgJ1xcJyBkb2VzIG5vdCBuZWVkIHZlbmRvciBwcmVmaXhlcy4gVXNlIFxcJycgKyBzdWdnZXN0aW9uICsgJzogJyArIHZhbHVlICsgJ1xcJy4nO1xufTtcblxudmFyIHVuY2FwaXRhbGl6ZVN0cmluZyA9IGZ1bmN0aW9uIHVuY2FwaXRhbGl6ZVN0cmluZyhzdHIpIHtcbiAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgMSkudG9Mb3dlckNhc2UoKSArIHN0ci5zdWJzdHIoMSwgc3RyLmxlbmd0aCAtIDEpO1xufTtcblxuLy8gQ2hlY2tzIGlmIGFueSB2ZW5kb3IgcHJlZml4ZXMgaGF2ZSBiZWVuIHNldCBtYW51YWxseVxuLy8gQWRkcyB0aG9zZSB0byB0aGUgd2FybmluZ3MgbGlzdCB3aXRoIHRoZSBzcGVjaWZpYyBwcm9wZXJ0eS92YWx1ZVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3R5bGVzLCBlbGVtZW50LCB3YXJuaW5ncykge1xuICB2YXIganNQcmVmaXhlcyA9IFsnV2Via2l0JywgJ01veicsICdPJywgJ21zJ107XG4gIHZhciBjc3NQcmVmaXhlcyA9IFsnLXdlYmtpdC0nLCAnLW1vei0nLCAnLW8tJywgJy1tcy0nXTtcblxuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAganNQcmVmaXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICAgIGlmIChwcm9wZXJ0eS5pbmRleE9mKHByZWZpeCkgPT09IDApIHtcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb24gPSB1bmNhcGl0YWxpemVTdHJpbmcocHJvcGVydHkucmVwbGFjZShuZXcgUmVnRXhwKHByZWZpeCwgJ2cnKSwgJycpKTtcblxuICAgICAgICB3YXJuaW5ncy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBUWVBFLFxuICAgICAgICAgIGhpbnQ6IGdldEhpbnQocHJvcGVydHksIHZhbHVlLCBzdWdnZXN0aW9uLCBmYWxzZSksXG4gICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgIHN1Z2dlc3Rpb246IHN1Z2dlc3Rpb25cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBjaGVja3MgaWYgYW55IHZhbHVlIGluY2x1ZGVzIHByZWZpeGVzXG4gICAgY3NzUHJlZml4ZXMuZm9yRWFjaChmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmRleE9mKHByZWZpeCkgPiAtMSkge1xuICAgICAgICB2YXIgc3VnZ2VzdGlvbiA9IHZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChwcmVmaXgsICdnJyksICcnKTtcblxuICAgICAgICB3YXJuaW5ncy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBUWVBFLFxuICAgICAgICAgIGhpbnQ6IGdldEhpbnQocHJvcGVydHksIHZhbHVlLCBzdWdnZXN0aW9uLCB0cnVlKSxcbiAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIHN1Z2dlc3Rpb246IHN1Z2dlc3Rpb25cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIFRZUEUgPSAnUFJFRkVSX05VTUJFUic7XG52YXIgZ2V0SGludCA9IGZ1bmN0aW9uIGdldEhpbnQocHJvcGVydHksIHZhbHVlLCBzdWdnZXN0aW9uKSB7XG4gIHJldHVybiAnUHJlZmVyIG51bWJlcnMgZm9yIFxcJycgKyBwcm9wZXJ0eSArICc6ICcgKyB2YWx1ZSArICdcXCcuIFVzZSBcXCcnICsgcHJvcGVydHkgKyAnOiAnICsgc3VnZ2VzdGlvbiArICdcXCcgaW5zdGVhZC4nO1xufTtcblxuLy8gQ2hlY2tzIGlmIG51bWJlciB2YWx1ZXMgYXJlIHNwZWNpZmllZCBhcyBhIHN0cmluZ1xuLy8gTnVtYmVycyBhcmUgcHJlZmVyZWQgaW4gdGhpcyBjYXNlXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdHlsZXMsIGVsZW1lbnQsIHdhcm5pbmdzKSB7XG4gIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIG51bWJlciA9IHZhbHVlLnRyaW0oKS5zdWJzdHIoMCwgdmFsdWUubGVuZ3RoIC0gMik7XG4gICAgICB2YXIgdW5pdCA9IHZhbHVlLnRyaW0oKS5zdWJzdHIodmFsdWUubGVuZ3RoIC0gMiwgMik7XG5cbiAgICAgIGlmICh1bml0ID09PSAncHgnICYmIHBhcnNlRmxvYXQodmFsdWUpLnRvU3RyaW5nKCkgPT09IG51bWJlciB8fCB2YWx1ZSA9PT0gJzAnKSB7XG4gICAgICAgIHZhciBzdWdnZXN0aW9uID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG5cbiAgICAgICAgd2FybmluZ3MucHVzaCh7XG4gICAgICAgICAgdHlwZTogVFlQRSxcbiAgICAgICAgICBoaW50OiBnZXRIaW50KHByb3BlcnR5LCB2YWx1ZSwgc3VnZ2VzdGlvbiksXG4gICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICBzdWdnZXN0aW9uOiBzdWdnZXN0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNVbml0bGVzc1Byb3BlcnR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvaXNVbml0bGVzc1Byb3BlcnR5Jyk7XG5cbnZhciBfaXNVbml0bGVzc1Byb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVW5pdGxlc3NQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBUWVBFID0gJ1JFUVVJUkVfVU5JVCc7XG52YXIgZ2V0SGludCA9IGZ1bmN0aW9uIGdldEhpbnQocHJvcGVydHksIHZhbHVlLCBzdWdnZXN0aW9uKSB7XG4gIHJldHVybiAnTnVtYmVycyAoJyArIHZhbHVlICsgJykgYXJlIG5vdCBhbGxvd2VkIGZvciBcXCcnICsgcHJvcGVydHkgKyAnXFwnLiBVc2UgXFwnJyArIHN1Z2dlc3Rpb24gKyAnXFwnIGluc3RlYWQuJztcbn07XG5cbi8vIENoZWNrcyBpZiBudW1iZXIgdmFsdWVzIGFyZSB1c2VkXG4vLyBVbml0cyBhcmUgcmVxdWlyZWRcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN0eWxlcywgZWxlbWVudCwgd2FybmluZ3MpIHtcbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGlmICghKDAsIF9pc1VuaXRsZXNzUHJvcGVydHkyLmRlZmF1bHQpKHByb3BlcnR5KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICB2YXIgc3VnZ2VzdGlvbiA9IHZhbHVlICsgJ3B4JztcblxuICAgICAgd2FybmluZ3MucHVzaCh7XG4gICAgICAgIHR5cGU6IFRZUEUsXG4gICAgICAgIGhpbnQ6IGdldEhpbnQocHJvcGVydHksIHZhbHVlLCBzdWdnZXN0aW9uKSxcbiAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIHN1Z2dlc3Rpb246IHN1Z2dlc3Rpb25cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcHJvcGVydHlNYXAgPSByZXF1aXJlKCcuLi9kYXRhL3Byb3BlcnR5TWFwJyk7XG5cbnZhciBfcHJvcGVydHlNYXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcGVydHlNYXApO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVFlQRSA9ICdTSE9SVEhBTkRfTE9OR0hBTkQnO1xudmFyIGdldEhpbnQgPSBmdW5jdGlvbiBnZXRIaW50KHNob3J0aGFuZCwgbG9uZ2hhbmRzKSB7XG4gIHJldHVybiAnRG8gbm90IG1peCBsb25naGFuZHMgXFwnJyArIGxvbmdoYW5kcy5qb2luKCcsICcpICsgJ1xcJyB3aXRoIHRoZWlyIHNob3J0aGFuZCBcXCcnICsgc2hvcnRoYW5kICsgJ1xcJy4nO1xufTtcblxuLy8gQ2hlY2tzIGlmIGFueSBsb25naGFuZCBhbmQgc2hvcnRoYW5kIHZhbHVlcyBhcmUgbWl4ZWQgdG9nZXRoZXJcbi8vIEEgbG90IHdhcyB0YWtlbiBmcm9tIFJhZGl1bSdzIGNoZWNrLXByb3BzLXBsdWdpbiBvbiAxMi8wNy8yMDE1IGFuZCBpbXByb3ZlZFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0Zvcm1pZGFibGVMYWJzL3JhZGl1bS9ibG9iL21hc3Rlci9zcmMvcGx1Z2lucy9jaGVjay1wcm9wcy1wbHVnaW4uanNcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN0eWxlcywgZWxlbWVudCwgd2FybmluZ3MpIHtcbiAgdmFyIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMpO1xuXG4gIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAoc2hvcnRoYW5kKSB7XG4gICAgLy8gQ2hlY2sgaWYgcHJvcGVydHkgaXMgYSBzaG9ydGhhbmQgcHJvcGVydHlcbiAgICBpZiAoX3Byb3BlcnR5TWFwMi5kZWZhdWx0W3Nob3J0aGFuZF0gJiYgX3Byb3BlcnR5TWFwMi5kZWZhdWx0W3Nob3J0aGFuZF0ubG9uZ2hhbmRzKSB7XG4gICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbG9uZ2hhbmQgPSBfcHJvcGVydHlNYXAyLmRlZmF1bHRbc2hvcnRoYW5kXS5sb25naGFuZHM7XG4gICAgICAgIHZhciB1c2VkTG9uZ2hhbmRzID0gW107XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgYW55IGxvbmdoYW5kIHByb3BlcnR5IHdhcyB1c2VkIG5leHQgdG8gdGhlIHNob3J0aGFuZFxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgaWYgKGxvbmdoYW5kLmluZGV4T2YocHJvcGVydHkpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gYWRkIHRoZW0gdG8gYSBsaXN0IG9mIHVzZWQgbG9uZ2hhbmRzXG4gICAgICAgICAgICB1c2VkTG9uZ2hhbmRzLnB1c2gocHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHVzZWRMb25naGFuZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHdhcm5pbmdzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogVFlQRSxcbiAgICAgICAgICAgIGhpbnQ6IGdldEhpbnQoc2hvcnRoYW5kLCB1c2VkTG9uZ2hhbmRzKSxcbiAgICAgICAgICAgIHNob3J0aGFuZDogc2hvcnRoYW5kLFxuICAgICAgICAgICAgbG9uZ2hhbmRzOiB1c2VkTG9uZ2hhbmRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgY2hyb21lOiAnQ2hyb21lJyxcbiAgYW5kcm9pZDogJ0FuZHJvaWQnLFxuICBmaXJlZm94OiAnRmlyZWZveCcsXG4gIGlvc19zYWY6ICdpT1MgU2FmYXJpJyxcbiAgc2FmYXJpOiAnU2FmYXJpJyxcbiAgaWU6ICdJbnRlcm5ldCBFeHBsb3JlcicsXG4gIGllX21vYjogJ21vYmlsZSBJbnRlcm5ldCBFeHBsb3JlcicsXG4gIGVkZ2U6ICdFZGdlJyxcbiAgb3BlcmE6ICdPcGVyYScsXG4gIG9wX21pbmk6ICdNaW5pJyxcbiAgYW5kX3VjOiAnQW5kcm9pZCBVQyBCcm93c2VyJyxcbiAgYW5kX2NocjogJ0FuZHJvaWQgQ2hyb21lJ1xufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiBhcnIgJiYgQXJyYXkuaXNBcnJheShhcnIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYmplY3QgPT09IHRydWUgJiYgIUFycmF5LmlzQXJyYXkob2JqKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8vIFRha2VuIGRpcmVjdGx5IGZyb20gUmVhY3QgY29yZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvbWFzdGVyL3NyYy9yZW5kZXJlcnMvZG9tL3NoYXJlZC9DU1NQcm9wZXJ0eS5qc1xudmFyIHVuaXRsZXNzUHJvcGVydGllcyA9IHtcbiAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IHRydWUsXG4gIGJvcmRlckltYWdlT3V0c2V0OiB0cnVlLFxuICBib3hGbGV4OiB0cnVlLFxuICBib3hGbGV4R3JvdXA6IHRydWUsXG4gIGJveE9yZGluYWxHcm91cDogdHJ1ZSxcbiAgY29sdW1uQ291bnQ6IHRydWUsXG4gIGZsZXg6IHRydWUsXG4gIGZsZXhHcm93OiB0cnVlLFxuICBmbGV4UG9zaXRpdmU6IHRydWUsXG4gIGZsZXhTaHJpbms6IHRydWUsXG4gIGZsZXhOZWdhdGl2ZTogdHJ1ZSxcbiAgZmxleE9yZGVyOiB0cnVlLFxuICBncmlkUm93OiB0cnVlLFxuICBncmlkQ29sdW1uOiB0cnVlLFxuICBmb250V2VpZ2h0OiB0cnVlLFxuICBsaW5lQ2xhbXA6IHRydWUsXG4gIGxpbmVIZWlnaHQ6IHRydWUsXG4gIG9wYWNpdHk6IHRydWUsXG4gIG9yZGVyOiB0cnVlLFxuICBvcnBoYW5zOiB0cnVlLFxuICB0YWJTaXplOiB0cnVlLFxuICB3aWRvd3M6IHRydWUsXG4gIHpJbmRleDogdHJ1ZSxcbiAgem9vbTogdHJ1ZSxcblxuICAvLyBTVkctcmVsYXRlZCBwcm9wZXJ0aWVzXG4gIGZpbGxPcGFjaXR5OiB0cnVlLFxuICBzdG9wT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlRGFzaG9mZnNldDogdHJ1ZSxcbiAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlV2lkdGg6IHRydWVcbn07XG5cbnZhciBwcmVmaXhlcyA9IFsnV2Via2l0JywgJ21zJywgJ01veicsICdPJ107XG52YXIgZ2V0UHJlZml4ZWRLZXkgPSBmdW5jdGlvbiBnZXRQcmVmaXhlZEtleShwcmVmaXgsIGtleSkge1xuICByZXR1cm4gcHJlZml4ICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpO1xufTtcblxuLy8gVXNpbmcgT2JqZWN0LmtleXMgaGVyZSwgb3IgZWxzZSB0aGUgdmFuaWxsYSBmb3ItaW4gbG9vcCBtYWtlcyBJRTggZ28gaW50byBhblxuLy8gaW5maW5pdGUgbG9vcCwgYmVjYXVzZSBpdCBpdGVyYXRlcyBvdmVyIHRoZSBuZXdseSBhZGRlZCBwcm9wcyB0b28uXG5PYmplY3Qua2V5cyh1bml0bGVzc1Byb3BlcnRpZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gIHJldHVybiBwcmVmaXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICByZXR1cm4gdW5pdGxlc3NQcm9wZXJ0aWVzW2dldFByZWZpeGVkS2V5KHByZWZpeCwgcHJvcGVydHkpXSA9IHRydWU7XG4gIH0pO1xufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICByZXR1cm4gdW5pdGxlc3NQcm9wZXJ0aWVzW3Byb3BlcnR5XSA/IHRydWUgOiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBjaHJvbWU6IDMwLFxuICBhbmRyb2lkOiA0LFxuICBmaXJlZm94OiAyNSxcbiAgaW9zX3NhZjogNixcbiAgc2FmYXJpOiA2LFxuICBpZTogOSxcbiAgaWVfbW9iOiA5LFxuICBlZGdlOiAxMixcbiAgb3BlcmE6IDEzLFxuICBvcF9taW5pOiA1LFxuICBhbmRfdWM6IDksXG4gIGFuZF9jaHI6IDMwXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgdmFyIHVucHJlZml4ZWQgPSBwcm9wZXJ0eS5yZXBsYWNlKC9eKG1zfFdlYmtpdHxNb3p8TykvLCAnJyk7XG4gIHJldHVybiB1bnByZWZpeGVkLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgdW5wcmVmaXhlZC5zbGljZSgxKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91bnByZWZpeFByb3BlcnR5ID0gcmVxdWlyZSgnLi91bnByZWZpeFByb3BlcnR5Jyk7XG5cbnZhciBfdW5wcmVmaXhQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91bnByZWZpeFByb3BlcnR5KTtcblxudmFyIF91bnByZWZpeFZhbHVlID0gcmVxdWlyZSgnLi91bnByZWZpeFZhbHVlJyk7XG5cbnZhciBfdW5wcmVmaXhWYWx1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91bnByZWZpeFZhbHVlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN0eWxlcykge1xuICB2YXIgbmV3U3R5bGVzID0ge307XG5cbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIG5ld1N0eWxlc1soMCwgX3VucHJlZml4UHJvcGVydHkyLmRlZmF1bHQpKHByb3BlcnR5KV0gPSAoMCwgX3VucHJlZml4VmFsdWUyLmRlZmF1bHQpKHN0eWxlc1twcm9wZXJ0eV0pO1xuICB9KTtcblxuICByZXR1cm4gbmV3U3R5bGVzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLygtbXMtfC13ZWJraXQtfC1tb3otfC1vLSkvZywgJycpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbid1c2Ugc3RyaWN0JztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBjYWxjO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfdXRpbHNKb2luUHJlZml4ZWRSdWxlcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2pvaW5QcmVmaXhlZFJ1bGVzJyk7XG5cbnZhciBfdXRpbHNKb2luUHJlZml4ZWRSdWxlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0pvaW5QcmVmaXhlZFJ1bGVzKTtcblxuZnVuY3Rpb24gY2FsYyhwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuaW5kZXhPZignY2FsYygnKSA+IC0xKSB7XG4gICAgcmV0dXJuICgwLCBfdXRpbHNKb2luUHJlZml4ZWRSdWxlczJbJ2RlZmF1bHQnXSkocHJvcGVydHksIHZhbHVlLCBmdW5jdGlvbiAocHJlZml4LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL2NhbGNcXCgvZywgcHJlZml4ICsgJ2NhbGMoJyk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGN1cnNvcjtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMgPSByZXF1aXJlKCcuLi91dGlscy9qb2luUHJlZml4ZWRSdWxlcycpO1xuXG52YXIgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNKb2luUHJlZml4ZWRSdWxlcyk7XG5cbnZhciB2YWx1ZXMgPSB7XG4gICd6b29tLWluJzogdHJ1ZSxcbiAgJ3pvb20tb3V0JzogdHJ1ZSxcbiAgJ2dyYWInOiB0cnVlLFxuICAnZ3JhYmJpbmcnOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBjdXJzb3IocHJvcGVydHksIHZhbHVlKSB7XG4gIGlmIChwcm9wZXJ0eSA9PT0gJ2N1cnNvcicgJiYgdmFsdWVzW3ZhbHVlXSkge1xuICAgIHJldHVybiAoMCwgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMyWydkZWZhdWx0J10pKHByb3BlcnR5LCB2YWx1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZsZXg7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIHZhbHVlcyA9IHtcbiAgJ2ZsZXgnOiB0cnVlLFxuICAnaW5saW5lLWZsZXgnOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBmbGV4KHByb3BlcnR5LCB2YWx1ZSkge1xuICBpZiAocHJvcGVydHkgPT09ICdkaXNwbGF5JyAmJiB2YWx1ZXNbdmFsdWVdKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc3BsYXk6IFsnLXdlYmtpdC1ib3gnLCAnLW1vei1ib3gnLCAnLW1zLScgKyB2YWx1ZSArICdib3gnLCAnLXdlYmtpdC0nICsgdmFsdWUsIHZhbHVlXS5qb2luKCc7JyArICgwLCBfdXRpbHNDYW1lbFRvRGFzaENhc2UyWydkZWZhdWx0J10pKHByb3BlcnR5KSArICc6JylcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBmbGV4Ym94SUU7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBhbHRlcm5hdGl2ZVZhbHVlcyA9IHtcbiAgJ3NwYWNlLWFyb3VuZCc6ICdkaXN0cmlidXRlJyxcbiAgJ3NwYWNlLWJldHdlZW4nOiAnanVzdGlmeScsXG4gICdmbGV4LXN0YXJ0JzogJ3N0YXJ0JyxcbiAgJ2ZsZXgtZW5kJzogJ2VuZCdcbn07XG52YXIgYWx0ZXJuYXRpdmVQcm9wcyA9IHtcbiAgYWxpZ25Db250ZW50OiAnbXNGbGV4TGluZVBhY2snLFxuICBhbGlnblNlbGY6ICdtc0ZsZXhJdGVtQWxpZ24nLFxuICBhbGlnbkl0ZW1zOiAnbXNGbGV4QWxpZ24nLFxuICBqdXN0aWZ5Q29udGVudDogJ21zRmxleFBhY2snLFxuICBvcmRlcjogJ21zRmxleE9yZGVyJyxcbiAgZmxleEdyb3c6ICdtc0ZsZXhQb3NpdGl2ZScsXG4gIGZsZXhTaHJpbms6ICdtc0ZsZXhOZWdhdGl2ZScsXG4gIGZsZXhCYXNpczogJ21zUHJlZmVycmVkU2l6ZSdcbn07XG5cbmZ1bmN0aW9uIGZsZXhib3hJRShwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgaWYgKGFsdGVybmF0aXZlUHJvcHNbcHJvcGVydHldKSB7XG4gICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwgYWx0ZXJuYXRpdmVQcm9wc1twcm9wZXJ0eV0sIGFsdGVybmF0aXZlVmFsdWVzW3ZhbHVlXSB8fCB2YWx1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZsZXhib3hPbGQ7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIGFsdGVybmF0aXZlVmFsdWVzID0ge1xuICAnc3BhY2UtYXJvdW5kJzogJ2p1c3RpZnknLFxuICAnc3BhY2UtYmV0d2Vlbic6ICdqdXN0aWZ5JyxcbiAgJ2ZsZXgtc3RhcnQnOiAnc3RhcnQnLFxuICAnZmxleC1lbmQnOiAnZW5kJyxcbiAgJ3dyYXAtcmV2ZXJzZSc6ICdtdWx0aXBsZScsXG4gIHdyYXA6ICdtdWx0aXBsZSdcbn07XG5cbnZhciBhbHRlcm5hdGl2ZVByb3BzID0ge1xuICBhbGlnbkl0ZW1zOiAnV2Via2l0Qm94QWxpZ24nLFxuICBqdXN0aWZ5Q29udGVudDogJ1dlYmtpdEJveFBhY2snLFxuICBmbGV4V3JhcDogJ1dlYmtpdEJveExpbmVzJ1xufTtcblxuZnVuY3Rpb24gZmxleGJveE9sZChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgaWYgKHByb3BlcnR5ID09PSAnZmxleERpcmVjdGlvbicpIHtcbiAgICByZXR1cm4ge1xuICAgICAgV2Via2l0Qm94T3JpZW50OiB2YWx1ZS5pbmRleE9mKCdjb2x1bW4nKSA+IC0xID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyxcbiAgICAgIFdlYmtpdEJveERpcmVjdGlvbjogdmFsdWUuaW5kZXhPZigncmV2ZXJzZScpID4gLTEgPyAncmV2ZXJzZScgOiAnbm9ybWFsJ1xuICAgIH07XG4gIH1cbiAgaWYgKGFsdGVybmF0aXZlUHJvcHNbcHJvcGVydHldKSB7XG4gICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwgYWx0ZXJuYXRpdmVQcm9wc1twcm9wZXJ0eV0sIGFsdGVybmF0aXZlVmFsdWVzW3ZhbHVlXSB8fCB2YWx1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGdyYWRpZW50O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfdXRpbHNKb2luUHJlZml4ZWRSdWxlcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2pvaW5QcmVmaXhlZFJ1bGVzJyk7XG5cbnZhciBfdXRpbHNKb2luUHJlZml4ZWRSdWxlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0pvaW5QcmVmaXhlZFJ1bGVzKTtcblxudmFyIHZhbHVlcyA9IC9saW5lYXItZ3JhZGllbnR8cmFkaWFsLWdyYWRpZW50fHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnR8cmVwZWF0aW5nLXJhZGlhbC1ncmFkaWVudC87XG5cbmZ1bmN0aW9uIGdyYWRpZW50KHByb3BlcnR5LCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5tYXRjaCh2YWx1ZXMpICE9PSBudWxsKSB7XG4gICAgcmV0dXJuICgwLCBfdXRpbHNKb2luUHJlZml4ZWRSdWxlczJbJ2RlZmF1bHQnXSkocHJvcGVydHksIHZhbHVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gc2l6aW5nO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfdXRpbHNKb2luUHJlZml4ZWRSdWxlcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2pvaW5QcmVmaXhlZFJ1bGVzJyk7XG5cbnZhciBfdXRpbHNKb2luUHJlZml4ZWRSdWxlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0pvaW5QcmVmaXhlZFJ1bGVzKTtcblxudmFyIHByb3BlcnRpZXMgPSB7XG4gIG1heEhlaWdodDogdHJ1ZSxcbiAgbWF4V2lkdGg6IHRydWUsXG4gIHdpZHRoOiB0cnVlLFxuICBoZWlnaHQ6IHRydWUsXG4gIGNvbHVtbldpZHRoOiB0cnVlLFxuICBtaW5XaWR0aDogdHJ1ZSxcbiAgbWluSGVpZ2h0OiB0cnVlXG59O1xudmFyIHZhbHVlcyA9IHtcbiAgJ21pbi1jb250ZW50JzogdHJ1ZSxcbiAgJ21heC1jb250ZW50JzogdHJ1ZSxcbiAgJ2ZpbGwtYXZhaWxhYmxlJzogdHJ1ZSxcbiAgJ2ZpdC1jb250ZW50JzogdHJ1ZSxcbiAgJ2NvbnRhaW4tZmxvYXRzJzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gc2l6aW5nKHByb3BlcnR5LCB2YWx1ZSkge1xuICBpZiAocHJvcGVydGllc1twcm9wZXJ0eV0gJiYgdmFsdWVzW3ZhbHVlXSkge1xuICAgIHJldHVybiAoMCwgX3V0aWxzSm9pblByZWZpeGVkUnVsZXMyWydkZWZhdWx0J10pKHByb3BlcnR5LCB2YWx1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHRyYW5zaXRpb247XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIF91dGlsc0NhcGl0YWxpemVTdHJpbmcgPSByZXF1aXJlKCcuLi91dGlscy9jYXBpdGFsaXplU3RyaW5nJyk7XG5cbnZhciBfdXRpbHNDYXBpdGFsaXplU3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FwaXRhbGl6ZVN0cmluZyk7XG5cbnZhciBfdXRpbHNVbnByZWZpeFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvdW5wcmVmaXhQcm9wZXJ0eScpO1xuXG52YXIgX3V0aWxzVW5wcmVmaXhQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc1VucHJlZml4UHJvcGVydHkpO1xuXG52YXIgX3ByZWZpeFByb3BzID0gcmVxdWlyZSgnLi4vcHJlZml4UHJvcHMnKTtcblxudmFyIF9wcmVmaXhQcm9wczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcmVmaXhQcm9wcyk7XG5cbnZhciBwcm9wZXJ0aWVzID0geyB0cmFuc2l0aW9uOiB0cnVlLCB0cmFuc2l0aW9uUHJvcGVydHk6IHRydWUgfTtcblxuZnVuY3Rpb24gdHJhbnNpdGlvbihwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgLy8gYWxzbyBjaGVjayBmb3IgYWxyZWFkeSBwcmVmaXhlZCB0cmFuc2l0aW9uc1xuICB2YXIgdW5wcmVmaXhlZFByb3BlcnR5ID0gKDAsIF91dGlsc1VucHJlZml4UHJvcGVydHkyWydkZWZhdWx0J10pKHByb3BlcnR5KTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgcHJvcGVydGllc1t1bnByZWZpeGVkUHJvcGVydHldKSB7XG4gICAgdmFyIF9yZWYyO1xuXG4gICAgdmFyIF9yZXQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgLy8gb25seSBzcGxpdCBtdWx0aSB2YWx1ZXMsIG5vdCBjdWJpYyBiZXppZXJzXG4gICAgICB2YXIgbXVsdGlwbGVWYWx1ZXMgPSB2YWx1ZS5zcGxpdCgvLCg/IVteKCldKig/OlxcKFteKCldKlxcKSk/XFwpKS9nKTtcblxuICAgICAgLy8gaXRlcmF0ZSBlYWNoIHNpbmdsZSB2YWx1ZSBhbmQgY2hlY2sgZm9yIHRyYW5zaXRpb25lZCBwcm9wZXJ0aWVzXG4gICAgICAvLyB0aGF0IG5lZWQgdG8gYmUgcHJlZml4ZWQgYXMgd2VsbFxuICAgICAgbXVsdGlwbGVWYWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBpbmRleCkge1xuICAgICAgICBtdWx0aXBsZVZhbHVlc1tpbmRleF0gPSBPYmplY3Qua2V5cyhfcHJlZml4UHJvcHMyWydkZWZhdWx0J10pLnJlZHVjZShmdW5jdGlvbiAob3V0LCBwcmVmaXgpIHtcbiAgICAgICAgICB2YXIgZGFzaENhc2VQcmVmaXggPSAnLScgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSArICctJztcblxuICAgICAgICAgIE9iamVjdC5rZXlzKF9wcmVmaXhQcm9wczJbJ2RlZmF1bHQnXVtwcmVmaXhdKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICB2YXIgZGFzaENhc2VQcm9wZXJ0eSA9ICgwLCBfdXRpbHNDYW1lbFRvRGFzaENhc2UyWydkZWZhdWx0J10pKHByb3ApO1xuICAgICAgICAgICAgaWYgKHZhbC5pbmRleE9mKGRhc2hDYXNlUHJvcGVydHkpID4gLTEpIHtcbiAgICAgICAgICAgICAgLy8gam9pbiBhbGwgcHJlZml4ZXMgYW5kIGNyZWF0ZSBhIG5ldyB2YWx1ZVxuICAgICAgICAgICAgICBvdXQgPSB2YWwucmVwbGFjZShkYXNoQ2FzZVByb3BlcnR5LCBkYXNoQ2FzZVByZWZpeCArIGRhc2hDYXNlUHJvcGVydHkpICsgJywnICsgb3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0sIHZhbCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyIG91dHB1dFZhbHVlID0gbXVsdGlwbGVWYWx1ZXMuam9pbignLCcpO1xuXG4gICAgICBpZiAodW5wcmVmaXhlZFByb3BlcnR5ICE9PSBwcm9wZXJ0eSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHY6IF9kZWZpbmVQcm9wZXJ0eSh7fSwgcHJvcGVydHksIG91dHB1dFZhbHVlKVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB2OiAoX3JlZjIgPSB7fSwgX2RlZmluZVByb3BlcnR5KF9yZWYyLCAnV2Via2l0JyArICgwLCBfdXRpbHNDYXBpdGFsaXplU3RyaW5nMlsnZGVmYXVsdCddKShwcm9wZXJ0eSksIG91dHB1dFZhbHVlLnNwbGl0KCcsJykuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZS5tYXRjaCgvLW1vei18LW1zLS8pID09PSBudWxsO1xuICAgICAgICB9KS5qb2luKCcsJykpLCBfZGVmaW5lUHJvcGVydHkoX3JlZjIsIHByb3BlcnR5LCBvdXRwdXRWYWx1ZSksIF9yZWYyKVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgaWYgKHR5cGVvZiBfcmV0ID09PSAnb2JqZWN0JykgcmV0dXJuIF9yZXQudjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gcHJlZml4QWxsO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfcHJlZml4UHJvcHMgPSByZXF1aXJlKCcuL3ByZWZpeFByb3BzJyk7XG5cbnZhciBfcHJlZml4UHJvcHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJlZml4UHJvcHMpO1xuXG52YXIgX3V0aWxzQ2FwaXRhbGl6ZVN0cmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvY2FwaXRhbGl6ZVN0cmluZycpO1xuXG52YXIgX3V0aWxzQ2FwaXRhbGl6ZVN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0NhcGl0YWxpemVTdHJpbmcpO1xuXG52YXIgX3V0aWxzQXNzaWduID0gcmVxdWlyZSgnLi91dGlscy9hc3NpZ24nKTtcblxudmFyIF91dGlsc0Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0Fzc2lnbik7XG5cbnZhciBfcGx1Z2luc0NhbGMgPSByZXF1aXJlKCcuL3BsdWdpbnMvY2FsYycpO1xuXG52YXIgX3BsdWdpbnNDYWxjMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsdWdpbnNDYWxjKTtcblxudmFyIF9wbHVnaW5zQ3Vyc29yID0gcmVxdWlyZSgnLi9wbHVnaW5zL2N1cnNvcicpO1xuXG52YXIgX3BsdWdpbnNDdXJzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGx1Z2luc0N1cnNvcik7XG5cbnZhciBfcGx1Z2luc0ZsZXggPSByZXF1aXJlKCcuL3BsdWdpbnMvZmxleCcpO1xuXG52YXIgX3BsdWdpbnNGbGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsdWdpbnNGbGV4KTtcblxudmFyIF9wbHVnaW5zU2l6aW5nID0gcmVxdWlyZSgnLi9wbHVnaW5zL3NpemluZycpO1xuXG52YXIgX3BsdWdpbnNTaXppbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGx1Z2luc1NpemluZyk7XG5cbnZhciBfcGx1Z2luc0dyYWRpZW50ID0gcmVxdWlyZSgnLi9wbHVnaW5zL2dyYWRpZW50Jyk7XG5cbnZhciBfcGx1Z2luc0dyYWRpZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsdWdpbnNHcmFkaWVudCk7XG5cbnZhciBfcGx1Z2luc1RyYW5zaXRpb24gPSByZXF1aXJlKCcuL3BsdWdpbnMvdHJhbnNpdGlvbicpO1xuXG52YXIgX3BsdWdpbnNUcmFuc2l0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsdWdpbnNUcmFuc2l0aW9uKTtcblxuLy8gc3BlY2lhbCBmbGV4Ym94IHNwZWNpZmljYXRpb25zXG5cbnZhciBfcGx1Z2luc0ZsZXhib3hJRSA9IHJlcXVpcmUoJy4vcGx1Z2lucy9mbGV4Ym94SUUnKTtcblxudmFyIF9wbHVnaW5zRmxleGJveElFMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsdWdpbnNGbGV4Ym94SUUpO1xuXG52YXIgX3BsdWdpbnNGbGV4Ym94T2xkID0gcmVxdWlyZSgnLi9wbHVnaW5zL2ZsZXhib3hPbGQnKTtcblxudmFyIF9wbHVnaW5zRmxleGJveE9sZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zRmxleGJveE9sZCk7XG5cbnZhciBwbHVnaW5zID0gW19wbHVnaW5zQ2FsYzJbJ2RlZmF1bHQnXSwgX3BsdWdpbnNDdXJzb3IyWydkZWZhdWx0J10sIF9wbHVnaW5zU2l6aW5nMlsnZGVmYXVsdCddLCBfcGx1Z2luc0dyYWRpZW50MlsnZGVmYXVsdCddLCBfcGx1Z2luc1RyYW5zaXRpb24yWydkZWZhdWx0J10sIF9wbHVnaW5zRmxleGJveElFMlsnZGVmYXVsdCddLCBfcGx1Z2luc0ZsZXhib3hPbGQyWydkZWZhdWx0J10sIF9wbHVnaW5zRmxleDJbJ2RlZmF1bHQnXV07XG5cbi8qKlxuICogUmV0dXJucyBhIHByZWZpeGVkIHZlcnNpb24gb2YgdGhlIHN0eWxlIG9iamVjdCB1c2luZyBhbGwgdmVuZG9yIHByZWZpeGVzXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIC0gU3R5bGUgb2JqZWN0IHRoYXQgZ2V0cyBwcmVmaXhlZCBwcm9wZXJ0aWVzIGFkZGVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAtIFN0eWxlIG9iamVjdCB3aXRoIHByZWZpeGVkIHByb3BlcnRpZXMgYW5kIHZhbHVlc1xuICovXG5cbmZ1bmN0aW9uIHByZWZpeEFsbChzdHlsZXMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHN0eWxlcykucmVkdWNlKGZ1bmN0aW9uIChwcmVmaXhlZFN0eWxlcywgcHJvcGVydHkpIHtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgLy8gcmVjdXJzZSB0aHJvdWdoIG5lc3RlZCBzdHlsZSBvYmplY3RzXG4gICAgICBwcmVmaXhlZFN0eWxlc1twcm9wZXJ0eV0gPSBwcmVmaXhBbGwodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3Qua2V5cyhfcHJlZml4UHJvcHMyWydkZWZhdWx0J10pLmZvckVhY2goZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgICB2YXIgcHJvcGVydGllcyA9IF9wcmVmaXhQcm9wczJbJ2RlZmF1bHQnXVtwcmVmaXhdO1xuICAgICAgICAvLyBhZGQgcHJlZml4ZXMgaWYgbmVlZGVkXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzW3Byb3BlcnR5XSkge1xuICAgICAgICAgIHByZWZpeGVkU3R5bGVzW3ByZWZpeCArICgwLCBfdXRpbHNDYXBpdGFsaXplU3RyaW5nMlsnZGVmYXVsdCddKShwcm9wZXJ0eSldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyByZXNvbHZlIGV2ZXJ5IHNwZWNpYWwgcGx1Z2luc1xuICAgICAgcGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuICgwLCBfdXRpbHNBc3NpZ24yWydkZWZhdWx0J10pKHByZWZpeGVkU3R5bGVzLCBwbHVnaW4ocHJvcGVydHksIHZhbHVlKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJlZml4ZWRTdHlsZXM7XG4gIH0sIHN0eWxlcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7IFwiV2Via2l0XCI6IHsgXCJ0cmFuc2Zvcm1cIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5cIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5YXCI6IHRydWUsIFwidHJhbnNmb3JtT3JpZ2luWVwiOiB0cnVlLCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiOiB0cnVlLCBcInBlcnNwZWN0aXZlXCI6IHRydWUsIFwicGVyc3BlY3RpdmVPcmlnaW5cIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1TdHlsZVwiOiB0cnVlLCBcInRyYW5zZm9ybU9yaWdpblpcIjogdHJ1ZSwgXCJhbmltYXRpb25cIjogdHJ1ZSwgXCJhbmltYXRpb25EZWxheVwiOiB0cnVlLCBcImFuaW1hdGlvbkRpcmVjdGlvblwiOiB0cnVlLCBcImFuaW1hdGlvbkZpbGxNb2RlXCI6IHRydWUsIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogdHJ1ZSwgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiB0cnVlLCBcImFuaW1hdGlvbk5hbWVcIjogdHJ1ZSwgXCJhbmltYXRpb25QbGF5U3RhdGVcIjogdHJ1ZSwgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiB0cnVlLCBcImFwcGVhcmFuY2VcIjogdHJ1ZSwgXCJ1c2VyU2VsZWN0XCI6IHRydWUsIFwiZm9udEtlcm5pbmdcIjogdHJ1ZSwgXCJ0ZXh0RW1waGFzaXNQb3NpdGlvblwiOiB0cnVlLCBcInRleHRFbXBoYXNpc1wiOiB0cnVlLCBcInRleHRFbXBoYXNpc1N0eWxlXCI6IHRydWUsIFwidGV4dEVtcGhhc2lzQ29sb3JcIjogdHJ1ZSwgXCJib3hEZWNvcmF0aW9uQnJlYWtcIjogdHJ1ZSwgXCJjbGlwUGF0aFwiOiB0cnVlLCBcIm1hc2tJbWFnZVwiOiB0cnVlLCBcIm1hc2tNb2RlXCI6IHRydWUsIFwibWFza1JlcGVhdFwiOiB0cnVlLCBcIm1hc2tQb3NpdGlvblwiOiB0cnVlLCBcIm1hc2tDbGlwXCI6IHRydWUsIFwibWFza09yaWdpblwiOiB0cnVlLCBcIm1hc2tTaXplXCI6IHRydWUsIFwibWFza0NvbXBvc2l0ZVwiOiB0cnVlLCBcIm1hc2tcIjogdHJ1ZSwgXCJtYXNrQm9yZGVyU291cmNlXCI6IHRydWUsIFwibWFza0JvcmRlck1vZGVcIjogdHJ1ZSwgXCJtYXNrQm9yZGVyU2xpY2VcIjogdHJ1ZSwgXCJtYXNrQm9yZGVyV2lkdGhcIjogdHJ1ZSwgXCJtYXNrQm9yZGVyT3V0c2V0XCI6IHRydWUsIFwibWFza0JvcmRlclJlcGVhdFwiOiB0cnVlLCBcIm1hc2tCb3JkZXJcIjogdHJ1ZSwgXCJtYXNrVHlwZVwiOiB0cnVlLCBcInRleHREZWNvcmF0aW9uU3R5bGVcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvblNraXBcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvbkxpbmVcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvbkNvbG9yXCI6IHRydWUsIFwiZmlsdGVyXCI6IHRydWUsIFwiZm9udEZlYXR1cmVTZXR0aW5nc1wiOiB0cnVlLCBcImJyZWFrQWZ0ZXJcIjogdHJ1ZSwgXCJicmVha0JlZm9yZVwiOiB0cnVlLCBcImJyZWFrSW5zaWRlXCI6IHRydWUsIFwiY29sdW1uQ291bnRcIjogdHJ1ZSwgXCJjb2x1bW5GaWxsXCI6IHRydWUsIFwiY29sdW1uR2FwXCI6IHRydWUsIFwiY29sdW1uUnVsZVwiOiB0cnVlLCBcImNvbHVtblJ1bGVDb2xvclwiOiB0cnVlLCBcImNvbHVtblJ1bGVTdHlsZVwiOiB0cnVlLCBcImNvbHVtblJ1bGVXaWR0aFwiOiB0cnVlLCBcImNvbHVtbnNcIjogdHJ1ZSwgXCJjb2x1bW5TcGFuXCI6IHRydWUsIFwiY29sdW1uV2lkdGhcIjogdHJ1ZSwgXCJmbGV4XCI6IHRydWUsIFwiZmxleEJhc2lzXCI6IHRydWUsIFwiZmxleERpcmVjdGlvblwiOiB0cnVlLCBcImZsZXhHcm93XCI6IHRydWUsIFwiZmxleEZsb3dcIjogdHJ1ZSwgXCJmbGV4U2hyaW5rXCI6IHRydWUsIFwiZmxleFdyYXBcIjogdHJ1ZSwgXCJhbGlnbkNvbnRlbnRcIjogdHJ1ZSwgXCJhbGlnbkl0ZW1zXCI6IHRydWUsIFwiYWxpZ25TZWxmXCI6IHRydWUsIFwianVzdGlmeUNvbnRlbnRcIjogdHJ1ZSwgXCJvcmRlclwiOiB0cnVlLCBcInRyYW5zaXRpb25cIjogdHJ1ZSwgXCJ0cmFuc2l0aW9uRGVsYXlcIjogdHJ1ZSwgXCJ0cmFuc2l0aW9uRHVyYXRpb25cIjogdHJ1ZSwgXCJ0cmFuc2l0aW9uUHJvcGVydHlcIjogdHJ1ZSwgXCJ0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25cIjogdHJ1ZSwgXCJiYWNrZHJvcEZpbHRlclwiOiB0cnVlLCBcInNjcm9sbFNuYXBUeXBlXCI6IHRydWUsIFwic2Nyb2xsU25hcFBvaW50c1hcIjogdHJ1ZSwgXCJzY3JvbGxTbmFwUG9pbnRzWVwiOiB0cnVlLCBcInNjcm9sbFNuYXBEZXN0aW5hdGlvblwiOiB0cnVlLCBcInNjcm9sbFNuYXBDb29yZGluYXRlXCI6IHRydWUsIFwic2hhcGVJbWFnZVRocmVzaG9sZFwiOiB0cnVlLCBcInNoYXBlSW1hZ2VNYXJnaW5cIjogdHJ1ZSwgXCJzaGFwZUltYWdlT3V0c2lkZVwiOiB0cnVlLCBcImh5cGhlbnNcIjogdHJ1ZSwgXCJmbG93SW50b1wiOiB0cnVlLCBcImZsb3dGcm9tXCI6IHRydWUsIFwicmVnaW9uRnJhZ21lbnRcIjogdHJ1ZSwgXCJ0ZXh0U2l6ZUFkanVzdFwiOiB0cnVlLCBcImJvcmRlckltYWdlXCI6IHRydWUsIFwiYm9yZGVySW1hZ2VPdXRzZXRcIjogdHJ1ZSwgXCJib3JkZXJJbWFnZVJlcGVhdFwiOiB0cnVlLCBcImJvcmRlckltYWdlU2xpY2VcIjogdHJ1ZSwgXCJib3JkZXJJbWFnZVNvdXJjZVwiOiB0cnVlLCBcImJvcmRlckltYWdlV2lkdGhcIjogdHJ1ZSwgXCJ0YWJTaXplXCI6IHRydWUsIFwib2JqZWN0Rml0XCI6IHRydWUsIFwib2JqZWN0UG9zaXRpb25cIjogdHJ1ZSB9LCBcIk1velwiOiB7IFwiYXBwZWFyYW5jZVwiOiB0cnVlLCBcInVzZXJTZWxlY3RcIjogdHJ1ZSwgXCJib3hTaXppbmdcIjogdHJ1ZSwgXCJ0ZXh0QWxpZ25MYXN0XCI6IHRydWUsIFwidGV4dERlY29yYXRpb25TdHlsZVwiOiB0cnVlLCBcInRleHREZWNvcmF0aW9uU2tpcFwiOiB0cnVlLCBcInRleHREZWNvcmF0aW9uTGluZVwiOiB0cnVlLCBcInRleHREZWNvcmF0aW9uQ29sb3JcIjogdHJ1ZSwgXCJ0YWJTaXplXCI6IHRydWUsIFwiaHlwaGVuc1wiOiB0cnVlLCBcImZvbnRGZWF0dXJlU2V0dGluZ3NcIjogdHJ1ZSwgXCJicmVha0FmdGVyXCI6IHRydWUsIFwiYnJlYWtCZWZvcmVcIjogdHJ1ZSwgXCJicmVha0luc2lkZVwiOiB0cnVlLCBcImNvbHVtbkNvdW50XCI6IHRydWUsIFwiY29sdW1uRmlsbFwiOiB0cnVlLCBcImNvbHVtbkdhcFwiOiB0cnVlLCBcImNvbHVtblJ1bGVcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlQ29sb3JcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlU3R5bGVcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlV2lkdGhcIjogdHJ1ZSwgXCJjb2x1bW5zXCI6IHRydWUsIFwiY29sdW1uU3BhblwiOiB0cnVlLCBcImNvbHVtbldpZHRoXCI6IHRydWUgfSwgXCJtc1wiOiB7IFwiZmxleFwiOiB0cnVlLCBcImZsZXhCYXNpc1wiOiBmYWxzZSwgXCJmbGV4RGlyZWN0aW9uXCI6IHRydWUsIFwiZmxleEdyb3dcIjogZmFsc2UsIFwiZmxleEZsb3dcIjogdHJ1ZSwgXCJmbGV4U2hyaW5rXCI6IGZhbHNlLCBcImZsZXhXcmFwXCI6IHRydWUsIFwiYWxpZ25Db250ZW50XCI6IGZhbHNlLCBcImFsaWduSXRlbXNcIjogZmFsc2UsIFwiYWxpZ25TZWxmXCI6IGZhbHNlLCBcImp1c3RpZnlDb250ZW50XCI6IGZhbHNlLCBcIm9yZGVyXCI6IGZhbHNlLCBcInRyYW5zZm9ybVwiOiB0cnVlLCBcInRyYW5zZm9ybU9yaWdpblwiOiB0cnVlLCBcInRyYW5zZm9ybU9yaWdpblhcIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5ZXCI6IHRydWUsIFwidXNlclNlbGVjdFwiOiB0cnVlLCBcIndyYXBGbG93XCI6IHRydWUsIFwid3JhcFRocm91Z2hcIjogdHJ1ZSwgXCJ3cmFwTWFyZ2luXCI6IHRydWUsIFwic2Nyb2xsU25hcFR5cGVcIjogdHJ1ZSwgXCJzY3JvbGxTbmFwUG9pbnRzWFwiOiB0cnVlLCBcInNjcm9sbFNuYXBQb2ludHNZXCI6IHRydWUsIFwic2Nyb2xsU25hcERlc3RpbmF0aW9uXCI6IHRydWUsIFwic2Nyb2xsU25hcENvb3JkaW5hdGVcIjogdHJ1ZSwgXCJ0b3VjaEFjdGlvblwiOiB0cnVlLCBcImh5cGhlbnNcIjogdHJ1ZSwgXCJmbG93SW50b1wiOiB0cnVlLCBcImZsb3dGcm9tXCI6IHRydWUsIFwiYnJlYWtCZWZvcmVcIjogdHJ1ZSwgXCJicmVha0FmdGVyXCI6IHRydWUsIFwiYnJlYWtJbnNpZGVcIjogdHJ1ZSwgXCJyZWdpb25GcmFnbWVudFwiOiB0cnVlLCBcImdyaWRUZW1wbGF0ZUNvbHVtbnNcIjogdHJ1ZSwgXCJncmlkVGVtcGxhdGVSb3dzXCI6IHRydWUsIFwiZ3JpZFRlbXBsYXRlQXJlYXNcIjogdHJ1ZSwgXCJncmlkVGVtcGxhdGVcIjogdHJ1ZSwgXCJncmlkQXV0b0NvbHVtbnNcIjogdHJ1ZSwgXCJncmlkQXV0b1Jvd3NcIjogdHJ1ZSwgXCJncmlkQXV0b0Zsb3dcIjogdHJ1ZSwgXCJncmlkXCI6IHRydWUsIFwiZ3JpZFJvd1N0YXJ0XCI6IHRydWUsIFwiZ3JpZENvbHVtblN0YXJ0XCI6IHRydWUsIFwiZ3JpZFJvd0VuZFwiOiB0cnVlLCBcImdyaWRSb3dcIjogdHJ1ZSwgXCJncmlkQ29sdW1uXCI6IHRydWUsIFwiZ3JpZENvbHVtbkVuZFwiOiB0cnVlLCBcImdyaWRDb2x1bW5HYXBcIjogdHJ1ZSwgXCJncmlkUm93R2FwXCI6IHRydWUsIFwiZ3JpZEFyZWFcIjogdHJ1ZSwgXCJncmlkR2FwXCI6IHRydWUsIFwidGV4dFNpemVBZGp1c3RcIjogdHJ1ZSB9IH07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIi8vIGxlaWdodCBwb2x5ZmlsbCBmb3IgT2JqZWN0LmFzc2lnblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKGJhc2UpIHtcbiAgdmFyIGV4dGVuZCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuICByZXR1cm4gT2JqZWN0LmtleXMoZXh0ZW5kKS5yZWR1Y2UoZnVuY3Rpb24gKG91dCwga2V5KSB7XG4gICAgYmFzZVtrZXldID0gZXh0ZW5kW2tleV07XG4gICAgcmV0dXJuIG91dDtcbiAgfSwge30pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIvKipcbiAqIENvbnZlcnRzIGEgY2FtZWwtY2FzZSBzdHJpbmcgdG8gYSBkYXNoLWNhc2Ugc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gc3RyIHRoYXQgZ2V0cyBjb252ZXJ0ZWQgdG8gZGFzaC1jYXNlXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oW2Etel18XikoW0EtWl0pL2csIGZ1bmN0aW9uIChtYXRjaCwgcDEsIHAyKSB7XG4gICAgcmV0dXJuIHAxICsgJy0nICsgcDIudG9Mb3dlckNhc2UoKTtcbiAgfSkucmVwbGFjZSgnbXMtJywgJy1tcy0nKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIi8vIGhlbHBlciB0byBjYXBpdGFsaXplIHN0cmluZ3NcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgX2NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4vY2FtZWxUb0Rhc2hDYXNlJyk7XG5cbnZhciBfY2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NhbWVsVG9EYXNoQ2FzZSk7XG5cbi8vIHJldHVybnMgYSBzdHlsZSBvYmplY3Qgd2l0aCBhIHNpbmdsZSBjb25jYXRlZCBwcmVmaXhlZCB2YWx1ZSBzdHJpbmdcblxuZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSkge1xuICB2YXIgcmVwbGFjZXIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBmdW5jdGlvbiAocHJlZml4LCB2YWx1ZSkge1xuICAgIHJldHVybiBwcmVmaXggKyB2YWx1ZTtcbiAgfSA6IGFyZ3VtZW50c1syXTtcbiAgcmV0dXJuIChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwgcHJvcGVydHksIFsnLXdlYmtpdC0nLCAnLW1vei0nLCAnJ10ubWFwKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICAgIHJldHVybiByZXBsYWNlcihwcmVmaXgsIHZhbHVlKTtcbiAgICB9KS5qb2luKCc7JyArICgwLCBfY2FtZWxUb0Rhc2hDYXNlMlsnZGVmYXVsdCddKShwcm9wZXJ0eSkgKyAnOicpKTtcbiAgfSkoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICB2YXIgdW5wcmVmaXhlZCA9IHByb3BlcnR5LnJlcGxhY2UoL14obXN8V2Via2l0fE1venxPKS8sICcnKTtcbiAgcmV0dXJuIHVucHJlZml4ZWQuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyB1bnByZWZpeGVkLnNsaWNlKDEpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9pbmxpbmVTdHlsZVByZWZpeEFsbCA9IHJlcXVpcmUoJ2lubGluZS1zdHlsZS1wcmVmaXgtYWxsJyk7XG5cbnZhciBfaW5saW5lU3R5bGVQcmVmaXhBbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5saW5lU3R5bGVQcmVmaXhBbGwpO1xuXG52YXIgX3V0aWxzR2V0QnJvd3NlckluZm9ybWF0aW9uID0gcmVxdWlyZSgnLi91dGlscy9nZXRCcm93c2VySW5mb3JtYXRpb24nKTtcblxudmFyIF91dGlsc0dldEJyb3dzZXJJbmZvcm1hdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0dldEJyb3dzZXJJbmZvcm1hdGlvbik7XG5cbnZhciBfdXRpbHNHZXRQcmVmaXhlZEtleWZyYW1lcyA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0UHJlZml4ZWRLZXlmcmFtZXMnKTtcblxudmFyIF91dGlsc0dldFByZWZpeGVkS2V5ZnJhbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzR2V0UHJlZml4ZWRLZXlmcmFtZXMpO1xuXG52YXIgX3V0aWxzQ2FwaXRhbGl6ZVN0cmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvY2FwaXRhbGl6ZVN0cmluZycpO1xuXG52YXIgX3V0aWxzQ2FwaXRhbGl6ZVN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0NhcGl0YWxpemVTdHJpbmcpO1xuXG52YXIgX3V0aWxzQXNzaWduID0gcmVxdWlyZSgnLi91dGlscy9hc3NpZ24nKTtcblxudmFyIF91dGlsc0Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0Fzc2lnbik7XG5cbnZhciBfcHJlZml4UHJvcHMgPSByZXF1aXJlKCcuL3ByZWZpeFByb3BzJyk7XG5cbnZhciBfcHJlZml4UHJvcHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJlZml4UHJvcHMpO1xuXG52YXIgX3BsdWdpbnNDYWxjID0gcmVxdWlyZSgnLi9wbHVnaW5zL2NhbGMnKTtcblxudmFyIF9wbHVnaW5zQ2FsYzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zQ2FsYyk7XG5cbnZhciBfcGx1Z2luc0N1cnNvciA9IHJlcXVpcmUoJy4vcGx1Z2lucy9jdXJzb3InKTtcblxudmFyIF9wbHVnaW5zQ3Vyc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsdWdpbnNDdXJzb3IpO1xuXG52YXIgX3BsdWdpbnNGbGV4ID0gcmVxdWlyZSgnLi9wbHVnaW5zL2ZsZXgnKTtcblxudmFyIF9wbHVnaW5zRmxleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zRmxleCk7XG5cbnZhciBfcGx1Z2luc1NpemluZyA9IHJlcXVpcmUoJy4vcGx1Z2lucy9zaXppbmcnKTtcblxudmFyIF9wbHVnaW5zU2l6aW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsdWdpbnNTaXppbmcpO1xuXG52YXIgX3BsdWdpbnNHcmFkaWVudCA9IHJlcXVpcmUoJy4vcGx1Z2lucy9ncmFkaWVudCcpO1xuXG52YXIgX3BsdWdpbnNHcmFkaWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zR3JhZGllbnQpO1xuXG52YXIgX3BsdWdpbnNUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9wbHVnaW5zL3RyYW5zaXRpb24nKTtcblxudmFyIF9wbHVnaW5zVHJhbnNpdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zVHJhbnNpdGlvbik7XG5cbi8vIHNwZWNpYWwgZmxleGJveCBzcGVjaWZpY2F0aW9uc1xuXG52YXIgX3BsdWdpbnNGbGV4Ym94SUUgPSByZXF1aXJlKCcuL3BsdWdpbnMvZmxleGJveElFJyk7XG5cbnZhciBfcGx1Z2luc0ZsZXhib3hJRTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbHVnaW5zRmxleGJveElFKTtcblxudmFyIF9wbHVnaW5zRmxleGJveE9sZCA9IHJlcXVpcmUoJy4vcGx1Z2lucy9mbGV4Ym94T2xkJyk7XG5cbnZhciBfcGx1Z2luc0ZsZXhib3hPbGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGx1Z2luc0ZsZXhib3hPbGQpO1xuXG52YXIgcGx1Z2lucyA9IFtfcGx1Z2luc0NhbGMyWydkZWZhdWx0J10sIF9wbHVnaW5zQ3Vyc29yMlsnZGVmYXVsdCddLCBfcGx1Z2luc1NpemluZzJbJ2RlZmF1bHQnXSwgX3BsdWdpbnNHcmFkaWVudDJbJ2RlZmF1bHQnXSwgX3BsdWdpbnNUcmFuc2l0aW9uMlsnZGVmYXVsdCddLCBfcGx1Z2luc0ZsZXhib3hJRTJbJ2RlZmF1bHQnXSwgX3BsdWdpbnNGbGV4Ym94T2xkMlsnZGVmYXVsdCddLFxuLy8gdGhpcyBtdXN0IGJlIHJ1biBBRlRFUiB0aGUgZmxleGJveCBzcGVjc1xuX3BsdWdpbnNGbGV4MlsnZGVmYXVsdCddXTtcblxudmFyIFByZWZpeGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEluc3RhbnRpYW50ZSBhIG5ldyBwcmVmaXhlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlckFnZW50IC0gdXNlckFnZW50IHRvIGdhdGhlciBwcmVmaXggaW5mb3JtYXRpb24gYWNjb3JkaW5nIHRvIGNhbml1c2UuY29tXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZWVwVW5wcmVmaXhlZCAtIGtlZXBzIHVucHJlZml4ZWQgcHJvcGVydGllcyBhbmQgdmFsdWVzXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFByZWZpeGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFByZWZpeGVyKTtcblxuICAgIHZhciBkZWZhdWx0VXNlckFnZW50ID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5fdXNlckFnZW50ID0gb3B0aW9ucy51c2VyQWdlbnQgfHwgZGVmYXVsdFVzZXJBZ2VudDtcbiAgICB0aGlzLl9rZWVwVW5wcmVmaXhlZCA9IG9wdGlvbnMua2VlcFVucHJlZml4ZWQgfHwgZmFsc2U7XG5cbiAgICB0aGlzLl9icm93c2VySW5mbyA9ICgwLCBfdXRpbHNHZXRCcm93c2VySW5mb3JtYXRpb24yWydkZWZhdWx0J10pKHRoaXMuX3VzZXJBZ2VudCk7XG5cbiAgICAvLyBDaGVja3MgaWYgdGhlIHVzZXJBZ2VudCB3YXMgcmVzb2x2ZWQgY29ycmVjdGx5XG4gICAgaWYgKHRoaXMuX2Jyb3dzZXJJbmZvICYmIHRoaXMuX2Jyb3dzZXJJbmZvLnByZWZpeCkge1xuICAgICAgLy8gc2V0IGFkZGl0aW9uYWwgcHJlZml4IGluZm9ybWF0aW9uXG4gICAgICB0aGlzLmNzc1ByZWZpeCA9IHRoaXMuX2Jyb3dzZXJJbmZvLnByZWZpeC5jc3M7XG4gICAgICB0aGlzLmpzUHJlZml4ID0gdGhpcy5fYnJvd3NlckluZm8ucHJlZml4LmlubGluZTtcbiAgICAgIHRoaXMucHJlZml4ZWRLZXlmcmFtZXMgPSAoMCwgX3V0aWxzR2V0UHJlZml4ZWRLZXlmcmFtZXMyWydkZWZhdWx0J10pKHRoaXMuX2Jyb3dzZXJJbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdXNlUHJlZml4QWxsRmFsbGJhY2sgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBkYXRhID0gdGhpcy5fYnJvd3NlckluZm8uYnJvd3NlciAmJiBfcHJlZml4UHJvcHMyWydkZWZhdWx0J11bdGhpcy5fYnJvd3NlckluZm8uYnJvd3Nlcl07XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuX3JlcXVpcmVzUHJlZml4ID0gT2JqZWN0LmtleXMoZGF0YSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XSA+PSBfdGhpcy5fYnJvd3NlckluZm8udmVyc2lvbjtcbiAgICAgIH0pLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBuYW1lKSB7XG4gICAgICAgIHJlc3VsdFtuYW1lXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCB7fSk7XG4gICAgICB0aGlzLl9oYXNQcm9wc1JlcXVpcmluZ1ByZWZpeCA9IE9iamVjdC5rZXlzKHRoaXMuX3JlcXVpcmVzUHJlZml4KS5sZW5ndGggPiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl91c2VQcmVmaXhBbGxGYWxsYmFjayA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcmVmaXhlZCB2ZXJzaW9uIG9mIHRoZSBzdHlsZSBvYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIFN0eWxlIG9iamVjdCB0aGF0IGdldHMgcHJlZml4ZWQgcHJvcGVydGllcyBhZGRlZFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIFN0eWxlIG9iamVjdCB3aXRoIHByZWZpeGVkIHByb3BlcnRpZXMgYW5kIHZhbHVlc1xuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoUHJlZml4ZXIsIFt7XG4gICAga2V5OiAncHJlZml4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJlZml4KHN0eWxlcykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIC8vIHVzZSBwcmVmaXhBbGwgYXMgZmFsbGJhY2sgaWYgdXNlckFnZW50IGNhbiBub3QgYmUgcmVzb2x2ZWRcbiAgICAgIGlmICh0aGlzLl91c2VQcmVmaXhBbGxGYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gKDAsIF9pbmxpbmVTdHlsZVByZWZpeEFsbDJbJ2RlZmF1bHQnXSkoc3R5bGVzKTtcbiAgICAgIH1cblxuICAgICAgLy8gb25seSBhZGQgcHJlZml4ZXMgaWYgbmVlZGVkXG4gICAgICBpZiAoIXRoaXMuX2hhc1Byb3BzUmVxdWlyaW5nUHJlZml4KSB7XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgICB9XG5cbiAgICAgIHN0eWxlcyA9ICgwLCBfdXRpbHNBc3NpZ24yWydkZWZhdWx0J10pKHt9LCBzdHlsZXMpO1xuXG4gICAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgIC8vIHJlY3Vyc2UgdGhyb3VnaCBuZXN0ZWQgc3R5bGUgb2JqZWN0c1xuICAgICAgICAgIHN0eWxlc1twcm9wZXJ0eV0gPSBfdGhpczIucHJlZml4KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhZGQgcHJlZml4ZXMgaWYgbmVlZGVkXG4gICAgICAgICAgaWYgKF90aGlzMi5fcmVxdWlyZXNQcmVmaXhbcHJvcGVydHldKSB7XG4gICAgICAgICAgICBzdHlsZXNbX3RoaXMyLmpzUHJlZml4ICsgKDAsIF91dGlsc0NhcGl0YWxpemVTdHJpbmcyWydkZWZhdWx0J10pKHByb3BlcnR5KV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmICghX3RoaXMyLl9rZWVwVW5wcmVmaXhlZCkge1xuICAgICAgICAgICAgICBkZWxldGUgc3R5bGVzW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZXNvbHZlIHBsdWdpbnNcbiAgICAgICAgICBwbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICAgICAgLy8gZ2VuZXJhdGVzIGEgbmV3IHBsdWdpbiBpbnRlcmZhY2Ugd2l0aCBjdXJyZW50IGRhdGFcbiAgICAgICAgICAgIHZhciByZXNvbHZlZFN0eWxlcyA9IHBsdWdpbih7XG4gICAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICBzdHlsZXM6IHN0eWxlcyxcbiAgICAgICAgICAgICAgYnJvd3NlckluZm86IF90aGlzMi5fYnJvd3NlckluZm8sXG4gICAgICAgICAgICAgIHByZWZpeDoge1xuICAgICAgICAgICAgICAgIGpzOiBfdGhpczIuanNQcmVmaXgsXG4gICAgICAgICAgICAgICAgY3NzOiBfdGhpczIuY3NzUHJlZml4LFxuICAgICAgICAgICAgICAgIGtleWZyYW1lczogX3RoaXMyLnByZWZpeGVkS2V5ZnJhbWVzXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGtlZXBVbnByZWZpeGVkOiBfdGhpczIuX2tlZXBVbnByZWZpeGVkLFxuICAgICAgICAgICAgICByZXF1aXJlc1ByZWZpeDogX3RoaXMyLl9yZXF1aXJlc1ByZWZpeFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAoMCwgX3V0aWxzQXNzaWduMlsnZGVmYXVsdCddKShzdHlsZXMsIHJlc29sdmVkU3R5bGVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByZWZpeGVkIHZlcnNpb24gb2YgdGhlIHN0eWxlIG9iamVjdCB1c2luZyBhbGwgdmVuZG9yIHByZWZpeGVzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIFN0eWxlIG9iamVjdCB0aGF0IGdldHMgcHJlZml4ZWQgcHJvcGVydGllcyBhZGRlZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IC0gU3R5bGUgb2JqZWN0IHdpdGggcHJlZml4ZWQgcHJvcGVydGllcyBhbmQgdmFsdWVzXG4gICAgICovXG4gIH1dLCBbe1xuICAgIGtleTogJ3ByZWZpeEFsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZWZpeEFsbChzdHlsZXMpIHtcbiAgICAgIHJldHVybiAoMCwgX2lubGluZVN0eWxlUHJlZml4QWxsMlsnZGVmYXVsdCddKShzdHlsZXMpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQcmVmaXhlcjtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFByZWZpeGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNhbGM7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxuZnVuY3Rpb24gY2FsYyhfcmVmMikge1xuICB2YXIgcHJvcGVydHkgPSBfcmVmMi5wcm9wZXJ0eTtcbiAgdmFyIHZhbHVlID0gX3JlZjIudmFsdWU7XG4gIHZhciBfcmVmMiRicm93c2VySW5mbyA9IF9yZWYyLmJyb3dzZXJJbmZvO1xuICB2YXIgYnJvd3NlciA9IF9yZWYyJGJyb3dzZXJJbmZvLmJyb3dzZXI7XG4gIHZhciB2ZXJzaW9uID0gX3JlZjIkYnJvd3NlckluZm8udmVyc2lvbjtcbiAgdmFyIGNzcyA9IF9yZWYyLnByZWZpeC5jc3M7XG4gIHZhciBrZWVwVW5wcmVmaXhlZCA9IF9yZWYyLmtlZXBVbnByZWZpeGVkO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmluZGV4T2YoJ2NhbGMoJykgPiAtMSAmJiAoYnJvd3NlciA9PT0gJ2ZpcmVmb3gnICYmIHZlcnNpb24gPCAxNSB8fCBicm93c2VyID09PSAnY2hyb21lJyAmJiB2ZXJzaW9uIDwgMjUgfHwgYnJvd3NlciA9PT0gJ3NhZmFyaScgJiYgdmVyc2lvbiA8IDYuMSB8fCBicm93c2VyID09PSAnaW9zX3NhZicgJiYgdmVyc2lvbiA8IDcpKSB7XG4gICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwgcHJvcGVydHksIHZhbHVlLnJlcGxhY2UoL2NhbGNcXCgvZywgY3NzICsgJ2NhbGMoJykgKyAoa2VlcFVucHJlZml4ZWQgPyAnOycgKyAoMCwgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMlsnZGVmYXVsdCddKShwcm9wZXJ0eSkgKyAnOicgKyB2YWx1ZSA6ICcnKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGN1cnNvcjtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlID0gcmVxdWlyZSgnLi4vdXRpbHMvY2FtZWxUb0Rhc2hDYXNlJyk7XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNDYW1lbFRvRGFzaENhc2UpO1xuXG52YXIgdmFsdWVzID0ge1xuICAnem9vbS1pbic6IHRydWUsXG4gICd6b29tLW91dCc6IHRydWUsXG4gICdncmFiJzogdHJ1ZSxcbiAgJ2dyYWJiaW5nJzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gY3Vyc29yKF9yZWYpIHtcbiAgdmFyIHByb3BlcnR5ID0gX3JlZi5wcm9wZXJ0eTtcbiAgdmFyIHZhbHVlID0gX3JlZi52YWx1ZTtcbiAgdmFyIF9yZWYkYnJvd3NlckluZm8gPSBfcmVmLmJyb3dzZXJJbmZvO1xuICB2YXIgYnJvd3NlciA9IF9yZWYkYnJvd3NlckluZm8uYnJvd3NlcjtcbiAgdmFyIHZlcnNpb24gPSBfcmVmJGJyb3dzZXJJbmZvLnZlcnNpb247XG4gIHZhciBjc3MgPSBfcmVmLnByZWZpeC5jc3M7XG4gIHZhciBrZWVwVW5wcmVmaXhlZCA9IF9yZWYua2VlcFVucHJlZml4ZWQ7XG5cbiAgaWYgKHByb3BlcnR5ID09PSAnY3Vyc29yJyAmJiB2YWx1ZXNbdmFsdWVdICYmIChicm93c2VyID09PSAnZmlyZWZveCcgJiYgdmVyc2lvbiA8IDI0IHx8IGJyb3dzZXIgPT09ICdjaHJvbWUnICYmIHZlcnNpb24gPCAzNyB8fCBicm93c2VyID09PSAnc2FmYXJpJyAmJiB2ZXJzaW9uIDwgOSB8fCBicm93c2VyID09PSAnb3BlcmEnICYmIHZlcnNpb24gPCAyNCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3Vyc29yOiBjc3MgKyB2YWx1ZSArIChrZWVwVW5wcmVmaXhlZCA/ICc7JyArICgwLCBfdXRpbHNDYW1lbFRvRGFzaENhc2UyWydkZWZhdWx0J10pKHByb3BlcnR5KSArICc6JyArIHZhbHVlIDogJycpXG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gZmxleDtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlID0gcmVxdWlyZSgnLi4vdXRpbHMvY2FtZWxUb0Rhc2hDYXNlJyk7XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNDYW1lbFRvRGFzaENhc2UpO1xuXG52YXIgdmFsdWVzID0ge1xuICAnZmxleCc6IHRydWUsXG4gICdpbmxpbmUtZmxleCc6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGZsZXgoX3JlZikge1xuICB2YXIgcHJvcGVydHkgPSBfcmVmLnByb3BlcnR5O1xuICB2YXIgdmFsdWUgPSBfcmVmLnZhbHVlO1xuICB2YXIgX3JlZiRicm93c2VySW5mbyA9IF9yZWYuYnJvd3NlckluZm87XG4gIHZhciBicm93c2VyID0gX3JlZiRicm93c2VySW5mby5icm93c2VyO1xuICB2YXIgdmVyc2lvbiA9IF9yZWYkYnJvd3NlckluZm8udmVyc2lvbjtcbiAgdmFyIGNzcyA9IF9yZWYucHJlZml4LmNzcztcbiAgdmFyIGtlZXBVbnByZWZpeGVkID0gX3JlZi5rZWVwVW5wcmVmaXhlZDtcblxuICBpZiAocHJvcGVydHkgPT09ICdkaXNwbGF5JyAmJiB2YWx1ZXNbdmFsdWVdICYmIChicm93c2VyID09PSAnY2hyb21lJyAmJiB2ZXJzaW9uIDwgMjkgJiYgdmVyc2lvbiA+IDIwIHx8IChicm93c2VyID09PSAnc2FmYXJpJyB8fCBicm93c2VyID09PSAnaW9zX3NhZicpICYmIHZlcnNpb24gPCA5ICYmIHZlcnNpb24gPiA2IHx8IGJyb3dzZXIgPT09ICdvcGVyYScgJiYgKHZlcnNpb24gPT0gMTUgfHwgdmVyc2lvbiA9PSAxNikpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc3BsYXk6IGNzcyArIHZhbHVlICsgKGtlZXBVbnByZWZpeGVkID8gJzsnICsgKDAsIF91dGlsc0NhbWVsVG9EYXNoQ2FzZTJbJ2RlZmF1bHQnXSkocHJvcGVydHkpICsgJzonICsgdmFsdWUgOiAnJylcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBmbGV4Ym94SUU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIGFsdGVybmF0aXZlVmFsdWVzID0ge1xuICAnc3BhY2UtYXJvdW5kJzogJ2Rpc3RyaWJ1dGUnLFxuICAnc3BhY2UtYmV0d2Vlbic6ICdqdXN0aWZ5JyxcbiAgJ2ZsZXgtc3RhcnQnOiAnc3RhcnQnLFxuICAnZmxleC1lbmQnOiAnZW5kJyxcbiAgZmxleDogJ2ZsZXhib3gnLFxuICAnaW5saW5lLWZsZXgnOiAnaW5saW5lLWZsZXhib3gnXG59O1xudmFyIGFsdGVybmF0aXZlUHJvcHMgPSB7XG4gIGFsaWduQ29udGVudDogJ21zRmxleExpbmVQYWNrJyxcbiAgYWxpZ25TZWxmOiAnbXNGbGV4SXRlbUFsaWduJyxcbiAgYWxpZ25JdGVtczogJ21zRmxleEFsaWduJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdtc0ZsZXhQYWNrJyxcbiAgb3JkZXI6ICdtc0ZsZXhPcmRlcicsXG4gIGZsZXhHcm93OiAnbXNGbGV4UG9zaXRpdmUnLFxuICBmbGV4U2hyaW5rOiAnbXNGbGV4TmVnYXRpdmUnLFxuICBmbGV4QmFzaXM6ICdtc1ByZWZlcnJlZFNpemUnXG59O1xuXG52YXIgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGFsdGVybmF0aXZlUHJvcHMpLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBwcm9wKSB7XG4gIHJlc3VsdFtwcm9wXSA9IHRydWU7XG4gIHJldHVybiByZXN1bHQ7XG59LCB7fSk7XG5cbmZ1bmN0aW9uIGZsZXhib3hJRShfcmVmMikge1xuICB2YXIgcHJvcGVydHkgPSBfcmVmMi5wcm9wZXJ0eTtcbiAgdmFyIHZhbHVlID0gX3JlZjIudmFsdWU7XG4gIHZhciBzdHlsZXMgPSBfcmVmMi5zdHlsZXM7XG4gIHZhciBfcmVmMiRicm93c2VySW5mbyA9IF9yZWYyLmJyb3dzZXJJbmZvO1xuICB2YXIgYnJvd3NlciA9IF9yZWYyJGJyb3dzZXJJbmZvLmJyb3dzZXI7XG4gIHZhciB2ZXJzaW9uID0gX3JlZjIkYnJvd3NlckluZm8udmVyc2lvbjtcbiAgdmFyIGNzcyA9IF9yZWYyLnByZWZpeC5jc3M7XG4gIHZhciBrZWVwVW5wcmVmaXhlZCA9IF9yZWYyLmtlZXBVbnByZWZpeGVkO1xuXG4gIGlmICgocHJvcGVydGllc1twcm9wZXJ0eV0gfHwgcHJvcGVydHkgPT09ICdkaXNwbGF5JyAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmluZGV4T2YoJ2ZsZXgnKSA+IC0xKSAmJiAoYnJvd3NlciA9PT0gJ2llX21vYicgfHwgYnJvd3NlciA9PT0gJ2llJykgJiYgdmVyc2lvbiA9PSAxMCkge1xuICAgIGlmICgha2VlcFVucHJlZml4ZWQpIHtcbiAgICAgIGRlbGV0ZSBzdHlsZXNbcHJvcGVydHldO1xuICAgIH1cbiAgICBpZiAocHJvcGVydHkgPT09ICdkaXNwbGF5JyAmJiBhbHRlcm5hdGl2ZVZhbHVlc1t2YWx1ZV0pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpc3BsYXk6IGNzcyArIGFsdGVybmF0aXZlVmFsdWVzW3ZhbHVlXSArIChrZWVwVW5wcmVmaXhlZCA/ICc7JyArICgwLCBfdXRpbHNDYW1lbFRvRGFzaENhc2UyWydkZWZhdWx0J10pKHByb3BlcnR5KSArICc6JyArIHZhbHVlIDogJycpXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoYWx0ZXJuYXRpdmVQcm9wc1twcm9wZXJ0eV0pIHtcbiAgICAgIHJldHVybiBfZGVmaW5lUHJvcGVydHkoe30sIGFsdGVybmF0aXZlUHJvcHNbcHJvcGVydHldLCBhbHRlcm5hdGl2ZVZhbHVlc1t2YWx1ZV0gfHwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gZmxleGJveE9sZDtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlID0gcmVxdWlyZSgnLi4vdXRpbHMvY2FtZWxUb0Rhc2hDYXNlJyk7XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNDYW1lbFRvRGFzaENhc2UpO1xuXG52YXIgYWx0ZXJuYXRpdmVWYWx1ZXMgPSB7XG4gICdzcGFjZS1hcm91bmQnOiAnanVzdGlmeScsXG4gICdzcGFjZS1iZXR3ZWVuJzogJ2p1c3RpZnknLFxuICAnZmxleC1zdGFydCc6ICdzdGFydCcsXG4gICdmbGV4LWVuZCc6ICdlbmQnLFxuICAnd3JhcC1yZXZlcnNlJzogJ211bHRpcGxlJyxcbiAgd3JhcDogJ211bHRpcGxlJyxcbiAgZmxleDogJ2JveCcsXG4gICdpbmxpbmUtZmxleCc6ICdpbmxpbmUtYm94J1xufTtcblxudmFyIGFsdGVybmF0aXZlUHJvcHMgPSB7XG4gIGFsaWduSXRlbXM6ICdXZWJraXRCb3hBbGlnbicsXG4gIGp1c3RpZnlDb250ZW50OiAnV2Via2l0Qm94UGFjaycsXG4gIGZsZXhXcmFwOiAnV2Via2l0Qm94TGluZXMnXG59O1xuXG52YXIgb3RoZXJQcm9wcyA9IFsnYWxpZ25Db250ZW50JywgJ2FsaWduU2VsZicsICdvcmRlcicsICdmbGV4R3JvdycsICdmbGV4U2hyaW5rJywgJ2ZsZXhCYXNpcycsICdmbGV4RGlyZWN0aW9uJ107XG5cbnZhciBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoYWx0ZXJuYXRpdmVQcm9wcykuY29uY2F0KG90aGVyUHJvcHMpLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBwcm9wKSB7XG4gIHJlc3VsdFtwcm9wXSA9IHRydWU7XG4gIHJldHVybiByZXN1bHQ7XG59LCB7fSk7XG5cbmZ1bmN0aW9uIGZsZXhib3hPbGQoX3JlZjIpIHtcbiAgdmFyIHByb3BlcnR5ID0gX3JlZjIucHJvcGVydHk7XG4gIHZhciB2YWx1ZSA9IF9yZWYyLnZhbHVlO1xuICB2YXIgc3R5bGVzID0gX3JlZjIuc3R5bGVzO1xuICB2YXIgX3JlZjIkYnJvd3NlckluZm8gPSBfcmVmMi5icm93c2VySW5mbztcbiAgdmFyIGJyb3dzZXIgPSBfcmVmMiRicm93c2VySW5mby5icm93c2VyO1xuICB2YXIgdmVyc2lvbiA9IF9yZWYyJGJyb3dzZXJJbmZvLnZlcnNpb247XG4gIHZhciBjc3MgPSBfcmVmMi5wcmVmaXguY3NzO1xuICB2YXIga2VlcFVucHJlZml4ZWQgPSBfcmVmMi5rZWVwVW5wcmVmaXhlZDtcblxuICBpZiAoKHByb3BlcnRpZXNbcHJvcGVydHldIHx8IHByb3BlcnR5ID09PSAnZGlzcGxheScgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmRleE9mKCdmbGV4JykgPiAtMSkgJiYgKGJyb3dzZXIgPT09ICdmaXJlZm94JyAmJiB2ZXJzaW9uIDwgMjIgfHwgYnJvd3NlciA9PT0gJ2Nocm9tZScgJiYgdmVyc2lvbiA8IDIxIHx8IChicm93c2VyID09PSAnc2FmYXJpJyB8fCBicm93c2VyID09PSAnaW9zX3NhZicpICYmIHZlcnNpb24gPD0gNi4xIHx8IGJyb3dzZXIgPT09ICdhbmRyb2lkJyAmJiB2ZXJzaW9uIDwgNC40IHx8IGJyb3dzZXIgPT09ICdhbmRfdWMnKSkge1xuICAgIGlmICgha2VlcFVucHJlZml4ZWQpIHtcbiAgICAgIGRlbGV0ZSBzdHlsZXNbcHJvcGVydHldO1xuICAgIH1cbiAgICBpZiAocHJvcGVydHkgPT09ICdmbGV4RGlyZWN0aW9uJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgV2Via2l0Qm94T3JpZW50OiB2YWx1ZS5pbmRleE9mKCdjb2x1bW4nKSA+IC0xID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyxcbiAgICAgICAgV2Via2l0Qm94RGlyZWN0aW9uOiB2YWx1ZS5pbmRleE9mKCdyZXZlcnNlJykgPiAtMSA/ICdyZXZlcnNlJyA6ICdub3JtYWwnXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAocHJvcGVydHkgPT09ICdkaXNwbGF5JyAmJiBhbHRlcm5hdGl2ZVZhbHVlc1t2YWx1ZV0pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpc3BsYXk6IGNzcyArIGFsdGVybmF0aXZlVmFsdWVzW3ZhbHVlXSArIChrZWVwVW5wcmVmaXhlZCA/ICc7JyArICgwLCBfdXRpbHNDYW1lbFRvRGFzaENhc2UyWydkZWZhdWx0J10pKHByb3BlcnR5KSArICc6JyArIHZhbHVlIDogJycpXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoYWx0ZXJuYXRpdmVQcm9wc1twcm9wZXJ0eV0pIHtcbiAgICAgIHJldHVybiBfZGVmaW5lUHJvcGVydHkoe30sIGFsdGVybmF0aXZlUHJvcHNbcHJvcGVydHldLCBhbHRlcm5hdGl2ZVZhbHVlc1t2YWx1ZV0gfHwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gZ3JhZGllbnQ7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIF91dGlsc0NhbWVsVG9EYXNoQ2FzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhbWVsVG9EYXNoQ2FzZScpO1xuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIHZhbHVlcyA9IC9saW5lYXItZ3JhZGllbnR8cmFkaWFsLWdyYWRpZW50fHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnR8cmVwZWF0aW5nLXJhZGlhbC1ncmFkaWVudC87XG5cbmZ1bmN0aW9uIGdyYWRpZW50KF9yZWYyKSB7XG4gIHZhciBwcm9wZXJ0eSA9IF9yZWYyLnByb3BlcnR5O1xuICB2YXIgdmFsdWUgPSBfcmVmMi52YWx1ZTtcbiAgdmFyIF9yZWYyJGJyb3dzZXJJbmZvID0gX3JlZjIuYnJvd3NlckluZm87XG4gIHZhciBicm93c2VyID0gX3JlZjIkYnJvd3NlckluZm8uYnJvd3NlcjtcbiAgdmFyIHZlcnNpb24gPSBfcmVmMiRicm93c2VySW5mby52ZXJzaW9uO1xuICB2YXIgY3NzID0gX3JlZjIucHJlZml4LmNzcztcbiAgdmFyIGtlZXBVbnByZWZpeGVkID0gX3JlZjIua2VlcFVucHJlZml4ZWQ7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubWF0Y2godmFsdWVzKSAhPT0gbnVsbCAmJiAoYnJvd3NlciA9PT0gJ2ZpcmVmb3gnICYmIHZlcnNpb24gPCAxNiB8fCBicm93c2VyID09PSAnY2hyb21lJyAmJiB2ZXJzaW9uIDwgMjYgfHwgKGJyb3dzZXIgPT09ICdzYWZhcmknIHx8IGJyb3dzZXIgPT09ICdpb3Nfc2FmJykgJiYgdmVyc2lvbiA8IDcgfHwgKGJyb3dzZXIgPT09ICdvcGVyYScgfHwgYnJvd3NlciA9PT0gJ29wX21pbmknKSAmJiB2ZXJzaW9uIDwgMTIuMSB8fCBicm93c2VyID09PSAnYW5kcm9pZCcgJiYgdmVyc2lvbiA8IDQuNCB8fCBicm93c2VyID09PSAnYW5kX3VjJykpIHtcbiAgICByZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LCBwcm9wZXJ0eSwgY3NzICsgdmFsdWUgKyAoa2VlcFVucHJlZml4ZWQgPyAnOycgKyAoMCwgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMlsnZGVmYXVsdCddKShwcm9wZXJ0eSkgKyAnOicgKyB2YWx1ZSA6ICcnKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHNpemluZztcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlID0gcmVxdWlyZSgnLi4vdXRpbHMvY2FtZWxUb0Rhc2hDYXNlJyk7XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNDYW1lbFRvRGFzaENhc2UpO1xuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgbWF4SGVpZ2h0OiB0cnVlLFxuICBtYXhXaWR0aDogdHJ1ZSxcbiAgd2lkdGg6IHRydWUsXG4gIGhlaWdodDogdHJ1ZSxcbiAgY29sdW1uV2lkdGg6IHRydWUsXG4gIG1pbldpZHRoOiB0cnVlLFxuICBtaW5IZWlnaHQ6IHRydWVcbn07XG52YXIgdmFsdWVzID0ge1xuICAnbWluLWNvbnRlbnQnOiB0cnVlLFxuICAnbWF4LWNvbnRlbnQnOiB0cnVlLFxuICAnZmlsbC1hdmFpbGFibGUnOiB0cnVlLFxuICAnZml0LWNvbnRlbnQnOiB0cnVlLFxuICAnY29udGFpbi1mbG9hdHMnOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBzaXppbmcoX3JlZjIpIHtcbiAgdmFyIHByb3BlcnR5ID0gX3JlZjIucHJvcGVydHk7XG4gIHZhciB2YWx1ZSA9IF9yZWYyLnZhbHVlO1xuICB2YXIgY3NzID0gX3JlZjIucHJlZml4LmNzcztcbiAgdmFyIGtlZXBVbnByZWZpeGVkID0gX3JlZjIua2VlcFVucHJlZml4ZWQ7XG5cbiAgLy8gVGhpcyBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZVxuICAvLyBLZWVwIGFuIGV5ZSBvbiBpdFxuICBpZiAocHJvcGVydGllc1twcm9wZXJ0eV0gJiYgdmFsdWVzW3ZhbHVlXSkge1xuICAgIHJldHVybiBfZGVmaW5lUHJvcGVydHkoe30sIHByb3BlcnR5LCBjc3MgKyB2YWx1ZSArIChrZWVwVW5wcmVmaXhlZCA/ICc7JyArICgwLCBfdXRpbHNDYW1lbFRvRGFzaENhc2UyWydkZWZhdWx0J10pKHByb3BlcnR5KSArICc6JyArIHZhbHVlIDogJycpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gdHJhbnNpdGlvbjtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlID0gcmVxdWlyZSgnLi4vdXRpbHMvY2FtZWxUb0Rhc2hDYXNlJyk7XG5cbnZhciBfdXRpbHNDYW1lbFRvRGFzaENhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNDYW1lbFRvRGFzaENhc2UpO1xuXG52YXIgX3V0aWxzQ2FwaXRhbGl6ZVN0cmluZyA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhcGl0YWxpemVTdHJpbmcnKTtcblxudmFyIF91dGlsc0NhcGl0YWxpemVTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNDYXBpdGFsaXplU3RyaW5nKTtcblxudmFyIF91dGlsc1VucHJlZml4UHJvcGVydHkgPSByZXF1aXJlKCcuLi91dGlscy91bnByZWZpeFByb3BlcnR5Jyk7XG5cbnZhciBfdXRpbHNVbnByZWZpeFByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzVW5wcmVmaXhQcm9wZXJ0eSk7XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAndHJhbnNpdGlvbic6IHRydWUsXG4gICd0cmFuc2l0aW9uUHJvcGVydHknOiB0cnVlXG59O1xuXG5mdW5jdGlvbiB0cmFuc2l0aW9uKF9yZWYyKSB7XG4gIHZhciBwcm9wZXJ0eSA9IF9yZWYyLnByb3BlcnR5O1xuICB2YXIgdmFsdWUgPSBfcmVmMi52YWx1ZTtcbiAgdmFyIGNzcyA9IF9yZWYyLnByZWZpeC5jc3M7XG4gIHZhciByZXF1aXJlc1ByZWZpeCA9IF9yZWYyLnJlcXVpcmVzUHJlZml4O1xuICB2YXIga2VlcFVucHJlZml4ZWQgPSBfcmVmMi5rZWVwVW5wcmVmaXhlZDtcblxuICAvLyBhbHNvIGNoZWNrIGZvciBhbHJlYWR5IHByZWZpeGVkIHRyYW5zaXRpb25zXG4gIHZhciB1bnByZWZpeGVkUHJvcGVydHkgPSAoMCwgX3V0aWxzVW5wcmVmaXhQcm9wZXJ0eTJbJ2RlZmF1bHQnXSkocHJvcGVydHkpO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiBwcm9wZXJ0aWVzW3VucHJlZml4ZWRQcm9wZXJ0eV0pIHtcbiAgICB2YXIgX3JldCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVxdWlyZXNQcmVmaXhEYXNoQ2FzZWQgPSBPYmplY3Qua2V5cyhyZXF1aXJlc1ByZWZpeCkubWFwKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIHJldHVybiAoMCwgX3V0aWxzQ2FtZWxUb0Rhc2hDYXNlMlsnZGVmYXVsdCddKShwcm9wKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBvbmx5IHNwbGl0IG11bHRpIHZhbHVlcywgbm90IGN1YmljIGJlemllcnNcbiAgICAgIHZhciBtdWx0aXBsZVZhbHVlcyA9IHZhbHVlLnNwbGl0KC8sKD8hW14oKV0qKD86XFwoW14oKV0qXFwpKT9cXCkpL2cpO1xuXG4gICAgICByZXF1aXJlc1ByZWZpeERhc2hDYXNlZC5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICBtdWx0aXBsZVZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGluZGV4KSB7XG4gICAgICAgICAgaWYgKHZhbC5pbmRleE9mKHByb3BlcnR5KSA+IC0xKSB7XG4gICAgICAgICAgICBtdWx0aXBsZVZhbHVlc1tpbmRleF0gPSB2YWwucmVwbGFjZShwcm9wZXJ0eSwgY3NzICsgcHJvcGVydHkpICsgKGtlZXBVbnByZWZpeGVkID8gJywnICsgdmFsIDogJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdjogX2RlZmluZVByb3BlcnR5KHt9LCBwcm9wZXJ0eSwgbXVsdGlwbGVWYWx1ZXMuam9pbignLCcpKVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgaWYgKHR5cGVvZiBfcmV0ID09PSAnb2JqZWN0JykgcmV0dXJuIF9yZXQudjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0geyBcImNocm9tZVwiOiB7IFwidHJhbnNmb3JtXCI6IDM1LCBcInRyYW5zZm9ybU9yaWdpblwiOiAzNSwgXCJ0cmFuc2Zvcm1PcmlnaW5YXCI6IDM1LCBcInRyYW5zZm9ybU9yaWdpbllcIjogMzUsIFwiYmFja2ZhY2VWaXNpYmlsaXR5XCI6IDM1LCBcInBlcnNwZWN0aXZlXCI6IDM1LCBcInBlcnNwZWN0aXZlT3JpZ2luXCI6IDM1LCBcInRyYW5zZm9ybVN0eWxlXCI6IDM1LCBcInRyYW5zZm9ybU9yaWdpblpcIjogMzUsIFwiYW5pbWF0aW9uXCI6IDQyLCBcImFuaW1hdGlvbkRlbGF5XCI6IDQyLCBcImFuaW1hdGlvbkRpcmVjdGlvblwiOiA0MiwgXCJhbmltYXRpb25GaWxsTW9kZVwiOiA0MiwgXCJhbmltYXRpb25EdXJhdGlvblwiOiA0MiwgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiA0MiwgXCJhbmltYXRpb25OYW1lXCI6IDQyLCBcImFuaW1hdGlvblBsYXlTdGF0ZVwiOiA0MiwgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiA0MiwgXCJhcHBlYXJhbmNlXCI6IDUyLCBcInVzZXJTZWxlY3RcIjogNTIsIFwiZm9udEtlcm5pbmdcIjogMzIsIFwidGV4dEVtcGhhc2lzUG9zaXRpb25cIjogNTIsIFwidGV4dEVtcGhhc2lzXCI6IDUyLCBcInRleHRFbXBoYXNpc1N0eWxlXCI6IDUyLCBcInRleHRFbXBoYXNpc0NvbG9yXCI6IDUyLCBcImJveERlY29yYXRpb25CcmVha1wiOiA1MiwgXCJjbGlwUGF0aFwiOiA1MiwgXCJtYXNrSW1hZ2VcIjogNTIsIFwibWFza01vZGVcIjogNTIsIFwibWFza1JlcGVhdFwiOiA1MiwgXCJtYXNrUG9zaXRpb25cIjogNTIsIFwibWFza0NsaXBcIjogNTIsIFwibWFza09yaWdpblwiOiA1MiwgXCJtYXNrU2l6ZVwiOiA1MiwgXCJtYXNrQ29tcG9zaXRlXCI6IDUyLCBcIm1hc2tcIjogNTIsIFwibWFza0JvcmRlclNvdXJjZVwiOiA1MiwgXCJtYXNrQm9yZGVyTW9kZVwiOiA1MiwgXCJtYXNrQm9yZGVyU2xpY2VcIjogNTIsIFwibWFza0JvcmRlcldpZHRoXCI6IDUyLCBcIm1hc2tCb3JkZXJPdXRzZXRcIjogNTIsIFwibWFza0JvcmRlclJlcGVhdFwiOiA1MiwgXCJtYXNrQm9yZGVyXCI6IDUyLCBcIm1hc2tUeXBlXCI6IDUyLCBcInRleHREZWNvcmF0aW9uU3R5bGVcIjogNTIsIFwidGV4dERlY29yYXRpb25Ta2lwXCI6IDUyLCBcInRleHREZWNvcmF0aW9uTGluZVwiOiA1MiwgXCJ0ZXh0RGVjb3JhdGlvbkNvbG9yXCI6IDUyLCBcImZpbHRlclwiOiA1MiwgXCJmb250RmVhdHVyZVNldHRpbmdzXCI6IDQ3LCBcImJyZWFrQWZ0ZXJcIjogNTIsIFwiYnJlYWtCZWZvcmVcIjogNTIsIFwiYnJlYWtJbnNpZGVcIjogNTIsIFwiY29sdW1uQ291bnRcIjogNTIsIFwiY29sdW1uRmlsbFwiOiA1MiwgXCJjb2x1bW5HYXBcIjogNTIsIFwiY29sdW1uUnVsZVwiOiA1MiwgXCJjb2x1bW5SdWxlQ29sb3JcIjogNTIsIFwiY29sdW1uUnVsZVN0eWxlXCI6IDUyLCBcImNvbHVtblJ1bGVXaWR0aFwiOiA1MiwgXCJjb2x1bW5zXCI6IDUyLCBcImNvbHVtblNwYW5cIjogNTIsIFwiY29sdW1uV2lkdGhcIjogNTIgfSwgXCJzYWZhcmlcIjogeyBcImZsZXhcIjogOCwgXCJmbGV4QmFzaXNcIjogOCwgXCJmbGV4RGlyZWN0aW9uXCI6IDgsIFwiZmxleEdyb3dcIjogOCwgXCJmbGV4Rmxvd1wiOiA4LCBcImZsZXhTaHJpbmtcIjogOCwgXCJmbGV4V3JhcFwiOiA4LCBcImFsaWduQ29udGVudFwiOiA4LCBcImFsaWduSXRlbXNcIjogOCwgXCJhbGlnblNlbGZcIjogOCwgXCJqdXN0aWZ5Q29udGVudFwiOiA4LCBcIm9yZGVyXCI6IDgsIFwidHJhbnNpdGlvblwiOiA2LCBcInRyYW5zaXRpb25EZWxheVwiOiA2LCBcInRyYW5zaXRpb25EdXJhdGlvblwiOiA2LCBcInRyYW5zaXRpb25Qcm9wZXJ0eVwiOiA2LCBcInRyYW5zaXRpb25UaW1pbmdGdW5jdGlvblwiOiA2LCBcInRyYW5zZm9ybVwiOiA4LCBcInRyYW5zZm9ybU9yaWdpblwiOiA4LCBcInRyYW5zZm9ybU9yaWdpblhcIjogOCwgXCJ0cmFuc2Zvcm1PcmlnaW5ZXCI6IDgsIFwiYmFja2ZhY2VWaXNpYmlsaXR5XCI6IDgsIFwicGVyc3BlY3RpdmVcIjogOCwgXCJwZXJzcGVjdGl2ZU9yaWdpblwiOiA4LCBcInRyYW5zZm9ybVN0eWxlXCI6IDgsIFwidHJhbnNmb3JtT3JpZ2luWlwiOiA4LCBcImFuaW1hdGlvblwiOiA4LCBcImFuaW1hdGlvbkRlbGF5XCI6IDgsIFwiYW5pbWF0aW9uRGlyZWN0aW9uXCI6IDgsIFwiYW5pbWF0aW9uRmlsbE1vZGVcIjogOCwgXCJhbmltYXRpb25EdXJhdGlvblwiOiA4LCBcImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50XCI6IDgsIFwiYW5pbWF0aW9uTmFtZVwiOiA4LCBcImFuaW1hdGlvblBsYXlTdGF0ZVwiOiA4LCBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IDgsIFwiYXBwZWFyYW5jZVwiOiA5LjEsIFwidXNlclNlbGVjdFwiOiA5LjEsIFwiYmFja2Ryb3BGaWx0ZXJcIjogOS4xLCBcImZvbnRLZXJuaW5nXCI6IDkuMSwgXCJzY3JvbGxTbmFwVHlwZVwiOiA5LjEsIFwic2Nyb2xsU25hcFBvaW50c1hcIjogOS4xLCBcInNjcm9sbFNuYXBQb2ludHNZXCI6IDkuMSwgXCJzY3JvbGxTbmFwRGVzdGluYXRpb25cIjogOS4xLCBcInNjcm9sbFNuYXBDb29yZGluYXRlXCI6IDkuMSwgXCJ0ZXh0RW1waGFzaXNQb3NpdGlvblwiOiA3LCBcInRleHRFbXBoYXNpc1wiOiA3LCBcInRleHRFbXBoYXNpc1N0eWxlXCI6IDcsIFwidGV4dEVtcGhhc2lzQ29sb3JcIjogNywgXCJib3hEZWNvcmF0aW9uQnJlYWtcIjogOS4xLCBcImNsaXBQYXRoXCI6IDkuMSwgXCJtYXNrSW1hZ2VcIjogOS4xLCBcIm1hc2tNb2RlXCI6IDkuMSwgXCJtYXNrUmVwZWF0XCI6IDkuMSwgXCJtYXNrUG9zaXRpb25cIjogOS4xLCBcIm1hc2tDbGlwXCI6IDkuMSwgXCJtYXNrT3JpZ2luXCI6IDkuMSwgXCJtYXNrU2l6ZVwiOiA5LjEsIFwibWFza0NvbXBvc2l0ZVwiOiA5LjEsIFwibWFza1wiOiA5LjEsIFwibWFza0JvcmRlclNvdXJjZVwiOiA5LjEsIFwibWFza0JvcmRlck1vZGVcIjogOS4xLCBcIm1hc2tCb3JkZXJTbGljZVwiOiA5LjEsIFwibWFza0JvcmRlcldpZHRoXCI6IDkuMSwgXCJtYXNrQm9yZGVyT3V0c2V0XCI6IDkuMSwgXCJtYXNrQm9yZGVyUmVwZWF0XCI6IDkuMSwgXCJtYXNrQm9yZGVyXCI6IDkuMSwgXCJtYXNrVHlwZVwiOiA5LjEsIFwidGV4dERlY29yYXRpb25TdHlsZVwiOiA5LjEsIFwidGV4dERlY29yYXRpb25Ta2lwXCI6IDkuMSwgXCJ0ZXh0RGVjb3JhdGlvbkxpbmVcIjogOS4xLCBcInRleHREZWNvcmF0aW9uQ29sb3JcIjogOS4xLCBcInNoYXBlSW1hZ2VUaHJlc2hvbGRcIjogOS4xLCBcInNoYXBlSW1hZ2VNYXJnaW5cIjogOS4xLCBcInNoYXBlSW1hZ2VPdXRzaWRlXCI6IDkuMSwgXCJmaWx0ZXJcIjogOSwgXCJoeXBoZW5zXCI6IDkuMSwgXCJmbG93SW50b1wiOiA5LjEsIFwiZmxvd0Zyb21cIjogOS4xLCBcImJyZWFrQmVmb3JlXCI6IDgsIFwiYnJlYWtBZnRlclwiOiA4LCBcImJyZWFrSW5zaWRlXCI6IDgsIFwicmVnaW9uRnJhZ21lbnRcIjogOS4xLCBcImNvbHVtbkNvdW50XCI6IDgsIFwiY29sdW1uRmlsbFwiOiA4LCBcImNvbHVtbkdhcFwiOiA4LCBcImNvbHVtblJ1bGVcIjogOCwgXCJjb2x1bW5SdWxlQ29sb3JcIjogOCwgXCJjb2x1bW5SdWxlU3R5bGVcIjogOCwgXCJjb2x1bW5SdWxlV2lkdGhcIjogOCwgXCJjb2x1bW5zXCI6IDgsIFwiY29sdW1uU3BhblwiOiA4LCBcImNvbHVtbldpZHRoXCI6IDggfSwgXCJmaXJlZm94XCI6IHsgXCJhcHBlYXJhbmNlXCI6IDQ3LCBcInVzZXJTZWxlY3RcIjogNDcsIFwiYm94U2l6aW5nXCI6IDI4LCBcInRleHRBbGlnbkxhc3RcIjogNDcsIFwidGV4dERlY29yYXRpb25TdHlsZVwiOiAzNSwgXCJ0ZXh0RGVjb3JhdGlvblNraXBcIjogMzUsIFwidGV4dERlY29yYXRpb25MaW5lXCI6IDM1LCBcInRleHREZWNvcmF0aW9uQ29sb3JcIjogMzUsIFwidGFiU2l6ZVwiOiA0NywgXCJoeXBoZW5zXCI6IDQyLCBcImZvbnRGZWF0dXJlU2V0dGluZ3NcIjogMzMsIFwiYnJlYWtBZnRlclwiOiA0NywgXCJicmVha0JlZm9yZVwiOiA0NywgXCJicmVha0luc2lkZVwiOiA0NywgXCJjb2x1bW5Db3VudFwiOiA0NywgXCJjb2x1bW5GaWxsXCI6IDQ3LCBcImNvbHVtbkdhcFwiOiA0NywgXCJjb2x1bW5SdWxlXCI6IDQ3LCBcImNvbHVtblJ1bGVDb2xvclwiOiA0NywgXCJjb2x1bW5SdWxlU3R5bGVcIjogNDcsIFwiY29sdW1uUnVsZVdpZHRoXCI6IDQ3LCBcImNvbHVtbnNcIjogNDcsIFwiY29sdW1uU3BhblwiOiA0NywgXCJjb2x1bW5XaWR0aFwiOiA0NyB9LCBcIm9wZXJhXCI6IHsgXCJmbGV4XCI6IDE2LCBcImZsZXhCYXNpc1wiOiAxNiwgXCJmbGV4RGlyZWN0aW9uXCI6IDE2LCBcImZsZXhHcm93XCI6IDE2LCBcImZsZXhGbG93XCI6IDE2LCBcImZsZXhTaHJpbmtcIjogMTYsIFwiZmxleFdyYXBcIjogMTYsIFwiYWxpZ25Db250ZW50XCI6IDE2LCBcImFsaWduSXRlbXNcIjogMTYsIFwiYWxpZ25TZWxmXCI6IDE2LCBcImp1c3RpZnlDb250ZW50XCI6IDE2LCBcIm9yZGVyXCI6IDE2LCBcInRyYW5zZm9ybVwiOiAyMiwgXCJ0cmFuc2Zvcm1PcmlnaW5cIjogMjIsIFwidHJhbnNmb3JtT3JpZ2luWFwiOiAyMiwgXCJ0cmFuc2Zvcm1PcmlnaW5ZXCI6IDIyLCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiOiAyMiwgXCJwZXJzcGVjdGl2ZVwiOiAyMiwgXCJwZXJzcGVjdGl2ZU9yaWdpblwiOiAyMiwgXCJ0cmFuc2Zvcm1TdHlsZVwiOiAyMiwgXCJ0cmFuc2Zvcm1PcmlnaW5aXCI6IDIyLCBcImFuaW1hdGlvblwiOiAyOSwgXCJhbmltYXRpb25EZWxheVwiOiAyOSwgXCJhbmltYXRpb25EaXJlY3Rpb25cIjogMjksIFwiYW5pbWF0aW9uRmlsbE1vZGVcIjogMjksIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogMjksIFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogMjksIFwiYW5pbWF0aW9uTmFtZVwiOiAyOSwgXCJhbmltYXRpb25QbGF5U3RhdGVcIjogMjksIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogMjksIFwiYXBwZWFyYW5jZVwiOiAzNywgXCJ1c2VyU2VsZWN0XCI6IDM3LCBcImZvbnRLZXJuaW5nXCI6IDE5LCBcInRleHRFbXBoYXNpc1Bvc2l0aW9uXCI6IDM3LCBcInRleHRFbXBoYXNpc1wiOiAzNywgXCJ0ZXh0RW1waGFzaXNTdHlsZVwiOiAzNywgXCJ0ZXh0RW1waGFzaXNDb2xvclwiOiAzNywgXCJib3hEZWNvcmF0aW9uQnJlYWtcIjogMzcsIFwiY2xpcFBhdGhcIjogMzcsIFwibWFza0ltYWdlXCI6IDM3LCBcIm1hc2tNb2RlXCI6IDM3LCBcIm1hc2tSZXBlYXRcIjogMzcsIFwibWFza1Bvc2l0aW9uXCI6IDM3LCBcIm1hc2tDbGlwXCI6IDM3LCBcIm1hc2tPcmlnaW5cIjogMzcsIFwibWFza1NpemVcIjogMzcsIFwibWFza0NvbXBvc2l0ZVwiOiAzNywgXCJtYXNrXCI6IDM3LCBcIm1hc2tCb3JkZXJTb3VyY2VcIjogMzcsIFwibWFza0JvcmRlck1vZGVcIjogMzcsIFwibWFza0JvcmRlclNsaWNlXCI6IDM3LCBcIm1hc2tCb3JkZXJXaWR0aFwiOiAzNywgXCJtYXNrQm9yZGVyT3V0c2V0XCI6IDM3LCBcIm1hc2tCb3JkZXJSZXBlYXRcIjogMzcsIFwibWFza0JvcmRlclwiOiAzNywgXCJtYXNrVHlwZVwiOiAzNywgXCJmaWx0ZXJcIjogMzcsIFwiZm9udEZlYXR1cmVTZXR0aW5nc1wiOiAzNywgXCJicmVha0FmdGVyXCI6IDM3LCBcImJyZWFrQmVmb3JlXCI6IDM3LCBcImJyZWFrSW5zaWRlXCI6IDM3LCBcImNvbHVtbkNvdW50XCI6IDM3LCBcImNvbHVtbkZpbGxcIjogMzcsIFwiY29sdW1uR2FwXCI6IDM3LCBcImNvbHVtblJ1bGVcIjogMzcsIFwiY29sdW1uUnVsZUNvbG9yXCI6IDM3LCBcImNvbHVtblJ1bGVTdHlsZVwiOiAzNywgXCJjb2x1bW5SdWxlV2lkdGhcIjogMzcsIFwiY29sdW1uc1wiOiAzNywgXCJjb2x1bW5TcGFuXCI6IDM3LCBcImNvbHVtbldpZHRoXCI6IDM3IH0sIFwiaWVcIjogeyBcImdyaWRSb3dTdGFydFwiOiAxMSwgXCJncmlkQXV0b0NvbHVtbnNcIjogMTEsIFwiZ3JpZFJvd0dhcFwiOiAxMSwgXCJicmVha0luc2lkZVwiOiAxMSwgXCJ0cmFuc2Zvcm1cIjogOSwgXCJicmVha0FmdGVyXCI6IDExLCBcImdyaWRSb3dFbmRcIjogMTEsIFwidHJhbnNmb3JtT3JpZ2luXCI6IDksIFwiZ3JpZENvbHVtbkVuZFwiOiAxMSwgXCJ1c2VyU2VsZWN0XCI6IDExLCBcInRyYW5zZm9ybU9yaWdpbllcIjogOSwgXCJmbGV4RGlyZWN0aW9uXCI6IDEwLCBcIndyYXBUaHJvdWdoXCI6IDExLCBcImZsb3dGcm9tXCI6IDExLCBcImdyaWRDb2x1bW5TdGFydFwiOiAxMSwgXCJyZWdpb25GcmFnbWVudFwiOiAxMSwgXCJmbG93SW50b1wiOiAxMSwgXCJzY3JvbGxTbmFwVHlwZVwiOiAxMSwgXCJmbGV4V3JhcFwiOiAxMCwgXCJncmlkQXV0b0Zsb3dcIjogMTEsIFwid3JhcEZsb3dcIjogMTEsIFwid3JhcE1hcmdpblwiOiAxMSwgXCJncmlkVGVtcGxhdGVBcmVhc1wiOiAxMSwgXCJncmlkVGVtcGxhdGVSb3dzXCI6IDExLCBcImZsZXhGbG93XCI6IDEwLCBcImdyaWRBdXRvUm93c1wiOiAxMSwgXCJncmlkXCI6IDExLCBcImdyaWRSb3dcIjogMTEsIFwidG91Y2hBY3Rpb25cIjogMTAsIFwiZ3JpZENvbHVtbkdhcFwiOiAxMSwgXCJncmlkR2FwXCI6IDExLCBcInNjcm9sbFNuYXBQb2ludHNZXCI6IDExLCBcInNjcm9sbFNuYXBEZXN0aW5hdGlvblwiOiAxMSwgXCJzY3JvbGxTbmFwUG9pbnRzWFwiOiAxMSwgXCJmbGV4XCI6IDEwLCBcInRyYW5zZm9ybU9yaWdpblhcIjogOSwgXCJncmlkVGVtcGxhdGVDb2x1bW5zXCI6IDExLCBcImdyaWRBcmVhXCI6IDExLCBcImdyaWRUZW1wbGF0ZVwiOiAxMSwgXCJicmVha0JlZm9yZVwiOiAxMSwgXCJoeXBoZW5zXCI6IDExLCBcInNjcm9sbFNuYXBDb29yZGluYXRlXCI6IDExLCBcImdyaWRDb2x1bW5cIjogMTEsIFwidGV4dFNpemVBZGp1c3RcIjogMTEgfSwgXCJlZGdlXCI6IHsgXCJ1c2VyU2VsZWN0XCI6IDE0LCBcIndyYXBGbG93XCI6IDE0LCBcIndyYXBUaHJvdWdoXCI6IDE0LCBcIndyYXBNYXJnaW5cIjogMTQsIFwic2Nyb2xsU25hcFR5cGVcIjogMTQsIFwic2Nyb2xsU25hcFBvaW50c1hcIjogMTQsIFwic2Nyb2xsU25hcFBvaW50c1lcIjogMTQsIFwic2Nyb2xsU25hcERlc3RpbmF0aW9uXCI6IDE0LCBcInNjcm9sbFNuYXBDb29yZGluYXRlXCI6IDE0LCBcImh5cGhlbnNcIjogMTQsIFwiZmxvd0ludG9cIjogMTQsIFwiZmxvd0Zyb21cIjogMTQsIFwiYnJlYWtCZWZvcmVcIjogMTQsIFwiYnJlYWtBZnRlclwiOiAxNCwgXCJicmVha0luc2lkZVwiOiAxNCwgXCJyZWdpb25GcmFnbWVudFwiOiAxNCwgXCJncmlkVGVtcGxhdGVDb2x1bW5zXCI6IDE0LCBcImdyaWRUZW1wbGF0ZVJvd3NcIjogMTQsIFwiZ3JpZFRlbXBsYXRlQXJlYXNcIjogMTQsIFwiZ3JpZFRlbXBsYXRlXCI6IDE0LCBcImdyaWRBdXRvQ29sdW1uc1wiOiAxNCwgXCJncmlkQXV0b1Jvd3NcIjogMTQsIFwiZ3JpZEF1dG9GbG93XCI6IDE0LCBcImdyaWRcIjogMTQsIFwiZ3JpZFJvd1N0YXJ0XCI6IDE0LCBcImdyaWRDb2x1bW5TdGFydFwiOiAxNCwgXCJncmlkUm93RW5kXCI6IDE0LCBcImdyaWRSb3dcIjogMTQsIFwiZ3JpZENvbHVtblwiOiAxNCwgXCJncmlkQ29sdW1uRW5kXCI6IDE0LCBcImdyaWRDb2x1bW5HYXBcIjogMTQsIFwiZ3JpZFJvd0dhcFwiOiAxNCwgXCJncmlkQXJlYVwiOiAxNCwgXCJncmlkR2FwXCI6IDE0IH0sIFwiaW9zX3NhZlwiOiB7IFwiZmxleFwiOiA4LjEsIFwiZmxleEJhc2lzXCI6IDguMSwgXCJmbGV4RGlyZWN0aW9uXCI6IDguMSwgXCJmbGV4R3Jvd1wiOiA4LjEsIFwiZmxleEZsb3dcIjogOC4xLCBcImZsZXhTaHJpbmtcIjogOC4xLCBcImZsZXhXcmFwXCI6IDguMSwgXCJhbGlnbkNvbnRlbnRcIjogOC4xLCBcImFsaWduSXRlbXNcIjogOC4xLCBcImFsaWduU2VsZlwiOiA4LjEsIFwianVzdGlmeUNvbnRlbnRcIjogOC4xLCBcIm9yZGVyXCI6IDguMSwgXCJ0cmFuc2l0aW9uXCI6IDYsIFwidHJhbnNpdGlvbkRlbGF5XCI6IDYsIFwidHJhbnNpdGlvbkR1cmF0aW9uXCI6IDYsIFwidHJhbnNpdGlvblByb3BlcnR5XCI6IDYsIFwidHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uXCI6IDYsIFwidHJhbnNmb3JtXCI6IDguMSwgXCJ0cmFuc2Zvcm1PcmlnaW5cIjogOC4xLCBcInRyYW5zZm9ybU9yaWdpblhcIjogOC4xLCBcInRyYW5zZm9ybU9yaWdpbllcIjogOC4xLCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiOiA4LjEsIFwicGVyc3BlY3RpdmVcIjogOC4xLCBcInBlcnNwZWN0aXZlT3JpZ2luXCI6IDguMSwgXCJ0cmFuc2Zvcm1TdHlsZVwiOiA4LjEsIFwidHJhbnNmb3JtT3JpZ2luWlwiOiA4LjEsIFwiYW5pbWF0aW9uXCI6IDguMSwgXCJhbmltYXRpb25EZWxheVwiOiA4LjEsIFwiYW5pbWF0aW9uRGlyZWN0aW9uXCI6IDguMSwgXCJhbmltYXRpb25GaWxsTW9kZVwiOiA4LjEsIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogOC4xLCBcImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50XCI6IDguMSwgXCJhbmltYXRpb25OYW1lXCI6IDguMSwgXCJhbmltYXRpb25QbGF5U3RhdGVcIjogOC4xLCBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IDguMSwgXCJhcHBlYXJhbmNlXCI6IDkuMywgXCJ1c2VyU2VsZWN0XCI6IDkuMywgXCJiYWNrZHJvcEZpbHRlclwiOiA5LjMsIFwiZm9udEtlcm5pbmdcIjogOS4zLCBcInNjcm9sbFNuYXBUeXBlXCI6IDkuMywgXCJzY3JvbGxTbmFwUG9pbnRzWFwiOiA5LjMsIFwic2Nyb2xsU25hcFBvaW50c1lcIjogOS4zLCBcInNjcm9sbFNuYXBEZXN0aW5hdGlvblwiOiA5LjMsIFwic2Nyb2xsU25hcENvb3JkaW5hdGVcIjogOS4zLCBcImJveERlY29yYXRpb25CcmVha1wiOiA5LjMsIFwiY2xpcFBhdGhcIjogOS4zLCBcIm1hc2tJbWFnZVwiOiA5LjMsIFwibWFza01vZGVcIjogOS4zLCBcIm1hc2tSZXBlYXRcIjogOS4zLCBcIm1hc2tQb3NpdGlvblwiOiA5LjMsIFwibWFza0NsaXBcIjogOS4zLCBcIm1hc2tPcmlnaW5cIjogOS4zLCBcIm1hc2tTaXplXCI6IDkuMywgXCJtYXNrQ29tcG9zaXRlXCI6IDkuMywgXCJtYXNrXCI6IDkuMywgXCJtYXNrQm9yZGVyU291cmNlXCI6IDkuMywgXCJtYXNrQm9yZGVyTW9kZVwiOiA5LjMsIFwibWFza0JvcmRlclNsaWNlXCI6IDkuMywgXCJtYXNrQm9yZGVyV2lkdGhcIjogOS4zLCBcIm1hc2tCb3JkZXJPdXRzZXRcIjogOS4zLCBcIm1hc2tCb3JkZXJSZXBlYXRcIjogOS4zLCBcIm1hc2tCb3JkZXJcIjogOS4zLCBcIm1hc2tUeXBlXCI6IDkuMywgXCJ0ZXh0U2l6ZUFkanVzdFwiOiA5LjMsIFwidGV4dERlY29yYXRpb25TdHlsZVwiOiA5LjMsIFwidGV4dERlY29yYXRpb25Ta2lwXCI6IDkuMywgXCJ0ZXh0RGVjb3JhdGlvbkxpbmVcIjogOS4zLCBcInRleHREZWNvcmF0aW9uQ29sb3JcIjogOS4zLCBcInNoYXBlSW1hZ2VUaHJlc2hvbGRcIjogOS4zLCBcInNoYXBlSW1hZ2VNYXJnaW5cIjogOS4zLCBcInNoYXBlSW1hZ2VPdXRzaWRlXCI6IDkuMywgXCJmaWx0ZXJcIjogOSwgXCJoeXBoZW5zXCI6IDkuMywgXCJmbG93SW50b1wiOiA5LjMsIFwiZmxvd0Zyb21cIjogOS4zLCBcImJyZWFrQmVmb3JlXCI6IDguMSwgXCJicmVha0FmdGVyXCI6IDguMSwgXCJicmVha0luc2lkZVwiOiA4LjEsIFwicmVnaW9uRnJhZ21lbnRcIjogOS4zLCBcImNvbHVtbkNvdW50XCI6IDguMSwgXCJjb2x1bW5GaWxsXCI6IDguMSwgXCJjb2x1bW5HYXBcIjogOC4xLCBcImNvbHVtblJ1bGVcIjogOC4xLCBcImNvbHVtblJ1bGVDb2xvclwiOiA4LjEsIFwiY29sdW1uUnVsZVN0eWxlXCI6IDguMSwgXCJjb2x1bW5SdWxlV2lkdGhcIjogOC4xLCBcImNvbHVtbnNcIjogOC4xLCBcImNvbHVtblNwYW5cIjogOC4xLCBcImNvbHVtbldpZHRoXCI6IDguMSB9LCBcImFuZHJvaWRcIjogeyBcImJvcmRlckltYWdlXCI6IDQuMiwgXCJib3JkZXJJbWFnZU91dHNldFwiOiA0LjIsIFwiYm9yZGVySW1hZ2VSZXBlYXRcIjogNC4yLCBcImJvcmRlckltYWdlU2xpY2VcIjogNC4yLCBcImJvcmRlckltYWdlU291cmNlXCI6IDQuMiwgXCJib3JkZXJJbWFnZVdpZHRoXCI6IDQuMiwgXCJmbGV4XCI6IDQuMiwgXCJmbGV4QmFzaXNcIjogNC4yLCBcImZsZXhEaXJlY3Rpb25cIjogNC4yLCBcImZsZXhHcm93XCI6IDQuMiwgXCJmbGV4Rmxvd1wiOiA0LjIsIFwiZmxleFNocmlua1wiOiA0LjIsIFwiZmxleFdyYXBcIjogNC4yLCBcImFsaWduQ29udGVudFwiOiA0LjIsIFwiYWxpZ25JdGVtc1wiOiA0LjIsIFwiYWxpZ25TZWxmXCI6IDQuMiwgXCJqdXN0aWZ5Q29udGVudFwiOiA0LjIsIFwib3JkZXJcIjogNC4yLCBcInRyYW5zaXRpb25cIjogNC4yLCBcInRyYW5zaXRpb25EZWxheVwiOiA0LjIsIFwidHJhbnNpdGlvbkR1cmF0aW9uXCI6IDQuMiwgXCJ0cmFuc2l0aW9uUHJvcGVydHlcIjogNC4yLCBcInRyYW5zaXRpb25UaW1pbmdGdW5jdGlvblwiOiA0LjIsIFwidHJhbnNmb3JtXCI6IDQuNCwgXCJ0cmFuc2Zvcm1PcmlnaW5cIjogNC40LCBcInRyYW5zZm9ybU9yaWdpblhcIjogNC40LCBcInRyYW5zZm9ybU9yaWdpbllcIjogNC40LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiOiA0LjQsIFwicGVyc3BlY3RpdmVcIjogNC40LCBcInBlcnNwZWN0aXZlT3JpZ2luXCI6IDQuNCwgXCJ0cmFuc2Zvcm1TdHlsZVwiOiA0LjQsIFwidHJhbnNmb3JtT3JpZ2luWlwiOiA0LjQsIFwiYW5pbWF0aW9uXCI6IDQuNCwgXCJhbmltYXRpb25EZWxheVwiOiA0LjQsIFwiYW5pbWF0aW9uRGlyZWN0aW9uXCI6IDQuNCwgXCJhbmltYXRpb25GaWxsTW9kZVwiOiA0LjQsIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogNC40LCBcImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50XCI6IDQuNCwgXCJhbmltYXRpb25OYW1lXCI6IDQuNCwgXCJhbmltYXRpb25QbGF5U3RhdGVcIjogNC40LCBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IDQuNCwgXCJhcHBlYXJhbmNlXCI6IDQ3LCBcInVzZXJTZWxlY3RcIjogNDcsIFwiZm9udEtlcm5pbmdcIjogNC40LCBcInRleHRFbXBoYXNpc1Bvc2l0aW9uXCI6IDQ3LCBcInRleHRFbXBoYXNpc1wiOiA0NywgXCJ0ZXh0RW1waGFzaXNTdHlsZVwiOiA0NywgXCJ0ZXh0RW1waGFzaXNDb2xvclwiOiA0NywgXCJib3hEZWNvcmF0aW9uQnJlYWtcIjogNDcsIFwiY2xpcFBhdGhcIjogNDcsIFwibWFza0ltYWdlXCI6IDQ3LCBcIm1hc2tNb2RlXCI6IDQ3LCBcIm1hc2tSZXBlYXRcIjogNDcsIFwibWFza1Bvc2l0aW9uXCI6IDQ3LCBcIm1hc2tDbGlwXCI6IDQ3LCBcIm1hc2tPcmlnaW5cIjogNDcsIFwibWFza1NpemVcIjogNDcsIFwibWFza0NvbXBvc2l0ZVwiOiA0NywgXCJtYXNrXCI6IDQ3LCBcIm1hc2tCb3JkZXJTb3VyY2VcIjogNDcsIFwibWFza0JvcmRlck1vZGVcIjogNDcsIFwibWFza0JvcmRlclNsaWNlXCI6IDQ3LCBcIm1hc2tCb3JkZXJXaWR0aFwiOiA0NywgXCJtYXNrQm9yZGVyT3V0c2V0XCI6IDQ3LCBcIm1hc2tCb3JkZXJSZXBlYXRcIjogNDcsIFwibWFza0JvcmRlclwiOiA0NywgXCJtYXNrVHlwZVwiOiA0NywgXCJmaWx0ZXJcIjogNDcsIFwiZm9udEZlYXR1cmVTZXR0aW5nc1wiOiA0NywgXCJicmVha0FmdGVyXCI6IDQ3LCBcImJyZWFrQmVmb3JlXCI6IDQ3LCBcImJyZWFrSW5zaWRlXCI6IDQ3LCBcImNvbHVtbkNvdW50XCI6IDQ3LCBcImNvbHVtbkZpbGxcIjogNDcsIFwiY29sdW1uR2FwXCI6IDQ3LCBcImNvbHVtblJ1bGVcIjogNDcsIFwiY29sdW1uUnVsZUNvbG9yXCI6IDQ3LCBcImNvbHVtblJ1bGVTdHlsZVwiOiA0NywgXCJjb2x1bW5SdWxlV2lkdGhcIjogNDcsIFwiY29sdW1uc1wiOiA0NywgXCJjb2x1bW5TcGFuXCI6IDQ3LCBcImNvbHVtbldpZHRoXCI6IDQ3IH0sIFwiYW5kX2NoclwiOiB7IFwiYXBwZWFyYW5jZVwiOiA0NywgXCJ1c2VyU2VsZWN0XCI6IDQ3LCBcInRleHRFbXBoYXNpc1Bvc2l0aW9uXCI6IDQ3LCBcInRleHRFbXBoYXNpc1wiOiA0NywgXCJ0ZXh0RW1waGFzaXNTdHlsZVwiOiA0NywgXCJ0ZXh0RW1waGFzaXNDb2xvclwiOiA0NywgXCJib3hEZWNvcmF0aW9uQnJlYWtcIjogNDcsIFwiY2xpcFBhdGhcIjogNDcsIFwibWFza0ltYWdlXCI6IDQ3LCBcIm1hc2tNb2RlXCI6IDQ3LCBcIm1hc2tSZXBlYXRcIjogNDcsIFwibWFza1Bvc2l0aW9uXCI6IDQ3LCBcIm1hc2tDbGlwXCI6IDQ3LCBcIm1hc2tPcmlnaW5cIjogNDcsIFwibWFza1NpemVcIjogNDcsIFwibWFza0NvbXBvc2l0ZVwiOiA0NywgXCJtYXNrXCI6IDQ3LCBcIm1hc2tCb3JkZXJTb3VyY2VcIjogNDcsIFwibWFza0JvcmRlck1vZGVcIjogNDcsIFwibWFza0JvcmRlclNsaWNlXCI6IDQ3LCBcIm1hc2tCb3JkZXJXaWR0aFwiOiA0NywgXCJtYXNrQm9yZGVyT3V0c2V0XCI6IDQ3LCBcIm1hc2tCb3JkZXJSZXBlYXRcIjogNDcsIFwibWFza0JvcmRlclwiOiA0NywgXCJtYXNrVHlwZVwiOiA0NywgXCJ0ZXh0RGVjb3JhdGlvblN0eWxlXCI6IDQ3LCBcInRleHREZWNvcmF0aW9uU2tpcFwiOiA0NywgXCJ0ZXh0RGVjb3JhdGlvbkxpbmVcIjogNDcsIFwidGV4dERlY29yYXRpb25Db2xvclwiOiA0NywgXCJmaWx0ZXJcIjogNDcsIFwiZm9udEZlYXR1cmVTZXR0aW5nc1wiOiA0NywgXCJicmVha0FmdGVyXCI6IDQ3LCBcImJyZWFrQmVmb3JlXCI6IDQ3LCBcImJyZWFrSW5zaWRlXCI6IDQ3LCBcImNvbHVtbkNvdW50XCI6IDQ3LCBcImNvbHVtbkZpbGxcIjogNDcsIFwiY29sdW1uR2FwXCI6IDQ3LCBcImNvbHVtblJ1bGVcIjogNDcsIFwiY29sdW1uUnVsZUNvbG9yXCI6IDQ3LCBcImNvbHVtblJ1bGVTdHlsZVwiOiA0NywgXCJjb2x1bW5SdWxlV2lkdGhcIjogNDcsIFwiY29sdW1uc1wiOiA0NywgXCJjb2x1bW5TcGFuXCI6IDQ3LCBcImNvbHVtbldpZHRoXCI6IDQ3IH0sIFwiYW5kX3VjXCI6IHsgXCJmbGV4XCI6IDkuOSwgXCJmbGV4QmFzaXNcIjogOS45LCBcImZsZXhEaXJlY3Rpb25cIjogOS45LCBcImZsZXhHcm93XCI6IDkuOSwgXCJmbGV4Rmxvd1wiOiA5LjksIFwiZmxleFNocmlua1wiOiA5LjksIFwiZmxleFdyYXBcIjogOS45LCBcImFsaWduQ29udGVudFwiOiA5LjksIFwiYWxpZ25JdGVtc1wiOiA5LjksIFwiYWxpZ25TZWxmXCI6IDkuOSwgXCJqdXN0aWZ5Q29udGVudFwiOiA5LjksIFwib3JkZXJcIjogOS45LCBcInRyYW5zaXRpb25cIjogOS45LCBcInRyYW5zaXRpb25EZWxheVwiOiA5LjksIFwidHJhbnNpdGlvbkR1cmF0aW9uXCI6IDkuOSwgXCJ0cmFuc2l0aW9uUHJvcGVydHlcIjogOS45LCBcInRyYW5zaXRpb25UaW1pbmdGdW5jdGlvblwiOiA5LjksIFwidHJhbnNmb3JtXCI6IDkuOSwgXCJ0cmFuc2Zvcm1PcmlnaW5cIjogOS45LCBcInRyYW5zZm9ybU9yaWdpblhcIjogOS45LCBcInRyYW5zZm9ybU9yaWdpbllcIjogOS45LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiOiA5LjksIFwicGVyc3BlY3RpdmVcIjogOS45LCBcInBlcnNwZWN0aXZlT3JpZ2luXCI6IDkuOSwgXCJ0cmFuc2Zvcm1TdHlsZVwiOiA5LjksIFwidHJhbnNmb3JtT3JpZ2luWlwiOiA5LjksIFwiYW5pbWF0aW9uXCI6IDkuOSwgXCJhbmltYXRpb25EZWxheVwiOiA5LjksIFwiYW5pbWF0aW9uRGlyZWN0aW9uXCI6IDkuOSwgXCJhbmltYXRpb25GaWxsTW9kZVwiOiA5LjksIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogOS45LCBcImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50XCI6IDkuOSwgXCJhbmltYXRpb25OYW1lXCI6IDkuOSwgXCJhbmltYXRpb25QbGF5U3RhdGVcIjogOS45LCBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IDkuOSwgXCJhcHBlYXJhbmNlXCI6IDkuOSwgXCJ1c2VyU2VsZWN0XCI6IDkuOSwgXCJmb250S2VybmluZ1wiOiA5LjksIFwidGV4dEVtcGhhc2lzUG9zaXRpb25cIjogOS45LCBcInRleHRFbXBoYXNpc1wiOiA5LjksIFwidGV4dEVtcGhhc2lzU3R5bGVcIjogOS45LCBcInRleHRFbXBoYXNpc0NvbG9yXCI6IDkuOSwgXCJtYXNrSW1hZ2VcIjogOS45LCBcIm1hc2tNb2RlXCI6IDkuOSwgXCJtYXNrUmVwZWF0XCI6IDkuOSwgXCJtYXNrUG9zaXRpb25cIjogOS45LCBcIm1hc2tDbGlwXCI6IDkuOSwgXCJtYXNrT3JpZ2luXCI6IDkuOSwgXCJtYXNrU2l6ZVwiOiA5LjksIFwibWFza0NvbXBvc2l0ZVwiOiA5LjksIFwibWFza1wiOiA5LjksIFwibWFza0JvcmRlclNvdXJjZVwiOiA5LjksIFwibWFza0JvcmRlck1vZGVcIjogOS45LCBcIm1hc2tCb3JkZXJTbGljZVwiOiA5LjksIFwibWFza0JvcmRlcldpZHRoXCI6IDkuOSwgXCJtYXNrQm9yZGVyT3V0c2V0XCI6IDkuOSwgXCJtYXNrQm9yZGVyUmVwZWF0XCI6IDkuOSwgXCJtYXNrQm9yZGVyXCI6IDkuOSwgXCJtYXNrVHlwZVwiOiA5LjksIFwidGV4dFNpemVBZGp1c3RcIjogOS45LCBcImZpbHRlclwiOiA5LjksIFwiaHlwaGVuc1wiOiA5LjksIFwiZmxvd0ludG9cIjogOS45LCBcImZsb3dGcm9tXCI6IDkuOSwgXCJicmVha0JlZm9yZVwiOiA5LjksIFwiYnJlYWtBZnRlclwiOiA5LjksIFwiYnJlYWtJbnNpZGVcIjogOS45LCBcInJlZ2lvbkZyYWdtZW50XCI6IDkuOSwgXCJmb250RmVhdHVyZVNldHRpbmdzXCI6IDkuOSwgXCJjb2x1bW5Db3VudFwiOiA5LjksIFwiY29sdW1uRmlsbFwiOiA5LjksIFwiY29sdW1uR2FwXCI6IDkuOSwgXCJjb2x1bW5SdWxlXCI6IDkuOSwgXCJjb2x1bW5SdWxlQ29sb3JcIjogOS45LCBcImNvbHVtblJ1bGVTdHlsZVwiOiA5LjksIFwiY29sdW1uUnVsZVdpZHRoXCI6IDkuOSwgXCJjb2x1bW5zXCI6IDkuOSwgXCJjb2x1bW5TcGFuXCI6IDkuOSwgXCJjb2x1bW5XaWR0aFwiOiA5LjkgfSwgXCJvcF9taW5pXCI6IHsgXCJib3JkZXJJbWFnZVwiOiA1LCBcImJvcmRlckltYWdlT3V0c2V0XCI6IDUsIFwiYm9yZGVySW1hZ2VSZXBlYXRcIjogNSwgXCJib3JkZXJJbWFnZVNsaWNlXCI6IDUsIFwiYm9yZGVySW1hZ2VTb3VyY2VcIjogNSwgXCJib3JkZXJJbWFnZVdpZHRoXCI6IDUsIFwidGFiU2l6ZVwiOiA1LCBcIm9iamVjdEZpdFwiOiA1LCBcIm9iamVjdFBvc2l0aW9uXCI6IDUgfSB9O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIvLyBsZWlnaHQgcG9seWZpbGwgZm9yIE9iamVjdC5hc3NpZ25cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChiYXNlKSB7XG4gIHZhciBleHRlbmQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICBPYmplY3Qua2V5cyhleHRlbmQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBiYXNlW2tleV0gPSBleHRlbmRba2V5XTtcbiAgfSk7XG4gIHJldHVybiBiYXNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfYm93c2VyID0gcmVxdWlyZSgnYm93c2VyJyk7XG5cbnZhciBfYm93c2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Jvd3Nlcik7XG5cbnZhciB2ZW5kb3JQcmVmaXhlcyA9IHtcbiAgV2Via2l0OiBbJ2Nocm9tZScsICdzYWZhcmknLCAnaW9zJywgJ2FuZHJvaWQnLCAncGhhbnRvbScsICdvcGVyYScsICd3ZWJvcycsICdibGFja2JlcnJ5JywgJ2JhZGEnLCAndGl6ZW4nXSxcbiAgTW96OiBbJ2ZpcmVmb3gnLCAnc2VhbW9ua2V5JywgJ3NhaWxmaXNoJ10sXG4gIG1zOiBbJ21zaWUnLCAnbXNlZGdlJ11cbn07XG5cbnZhciBicm93c2VycyA9IHtcbiAgY2hyb21lOiBbWydjaHJvbWUnXV0sXG4gIHNhZmFyaTogW1snc2FmYXJpJ11dLFxuICBmaXJlZm94OiBbWydmaXJlZm94J11dLFxuICBpZTogW1snbXNpZSddXSxcbiAgZWRnZTogW1snbXNlZGdlJ11dLFxuICBvcGVyYTogW1snb3BlcmEnXV0sXG4gIGlvc19zYWY6IFtbJ2lvcycsICdtb2JpbGUnXSwgWydpb3MnLCAndGFibGV0J11dLFxuICBpZV9tb2I6IFtbJ3dpbmRvd3NwaG9uZScsICdtb2JpbGUnLCAnbXNpZSddLCBbJ3dpbmRvd3NwaG9uZScsICd0YWJsZXQnLCAnbXNpZSddLCBbJ3dpbmRvd3NwaG9uZScsICdtb2JpbGUnLCAnbXNlZGdlJ10sIFsnd2luZG93c3Bob25lJywgJ3RhYmxldCcsICdtc2VkZ2UnXV0sXG4gIG9wX21pbmk6IFtbJ29wZXJhJywgJ21vYmlsZSddLCBbJ29wZXJhJywgJ3RhYmxldCddXSxcbiAgYW5kX3VjOiBbWydhbmRyb2lkJywgJ21vYmlsZSddLCBbJ2FuZHJvaWQnLCAndGFibGV0J11dLFxuICBhbmRyb2lkOiBbWydhbmRyb2lkJywgJ21vYmlsZSddLCBbJ2FuZHJvaWQnLCAndGFibGV0J11dXG59O1xuXG4vKipcbiAqIFVzZXMgYm93c2VyIHRvIGdldCBkZWZhdWx0IGJyb3dzZXIgaW5mb3JtYXRpb24gc3VjaCBhcyB2ZXJzaW9uIGFuZCBuYW1lXG4gKiBFdmFsdWF0ZXMgYm93c2VyIGluZm8gYW5kIGFkZHMgdmVuZG9yUHJlZml4IGluZm9ybWF0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gdXNlckFnZW50IC0gdXNlckFnZW50IHRoYXQgZ2V0cyBldmFsdWF0ZWRcbiAqL1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAodXNlckFnZW50KSB7XG4gIGlmICghdXNlckFnZW50KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGluZm8gPSBfYm93c2VyMlsnZGVmYXVsdCddLl9kZXRlY3QodXNlckFnZW50KTtcblxuICBPYmplY3Qua2V5cyh2ZW5kb3JQcmVmaXhlcykuZm9yRWFjaChmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgdmVuZG9yUHJlZml4ZXNbcHJlZml4XS5mb3JFYWNoKGZ1bmN0aW9uIChicm93c2VyKSB7XG4gICAgICBpZiAoaW5mb1ticm93c2VyXSkge1xuICAgICAgICBpbmZvLnByZWZpeCA9IHtcbiAgICAgICAgICBpbmxpbmU6IHByZWZpeCxcbiAgICAgICAgICBjc3M6ICctJyArIHByZWZpeC50b0xvd2VyQ2FzZSgpICsgJy0nXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHZhciBuYW1lID0gJyc7XG4gIE9iamVjdC5rZXlzKGJyb3dzZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChicm93c2VyKSB7XG4gICAgYnJvd3NlcnNbYnJvd3Nlcl0uZm9yRWFjaChmdW5jdGlvbiAoY29uZGl0aW9uKSB7XG4gICAgICB2YXIgbWF0Y2ggPSAwO1xuICAgICAgY29uZGl0aW9uLmZvckVhY2goZnVuY3Rpb24gKHNpbmdsZSkge1xuICAgICAgICBpZiAoaW5mb1tzaW5nbGVdKSB7XG4gICAgICAgICAgbWF0Y2ggKz0gMTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoY29uZGl0aW9uLmxlbmd0aCA9PT0gbWF0Y2gpIHtcbiAgICAgICAgbmFtZSA9IGJyb3dzZXI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIGluZm8uYnJvd3NlciA9IG5hbWU7XG4gIC8vIEZvciBjb3Jkb3ZhIElPUyA4IHRoZSB2ZXJzaW9uIGlzIG1pc3NpbmcsIHNldCB0cnVuY2F0ZWQgb3N2ZXJzaW9uIHRvIHByZXZlbnQgTmFOXG4gIGluZm8udmVyc2lvbiA9IGluZm8udmVyc2lvbiA/IHBhcnNlRmxvYXQoaW5mby52ZXJzaW9uKSA6IHBhcnNlSW50KHBhcnNlRmxvYXQoaW5mby5vc3ZlcnNpb24pLCAxMCk7XG5cbiAgLy8gc2VwZXJhdGUgbmF0aXZlIGFuZHJvaWQgY2hyb21lXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2ZyaXNjaG1hbm4vaW5saW5lLXN0eWxlLXByZWZpeGVyL2lzc3Vlcy80NVxuICBpZiAoaW5mby5icm93c2VyID09PSAnYW5kcm9pZCcgJiYgaW5mby5jaHJvbWUgJiYgaW5mby52ZXJzaW9uID4gMzcpIHtcbiAgICBpbmZvLmJyb3dzZXIgPSAnYW5kX2Nocic7XG4gIH1cbiAgaW5mby52ZXJzaW9uID0gcGFyc2VGbG9hdChpbmZvLnZlcnNpb24pO1xuICBpbmZvLm9zdmVyc2lvbiA9IHBhcnNlRmxvYXQoaW5mby5vc3ZlcnNpb24pO1xuICAvLyBGb3IgYW5kcm9pZCA8IDQuNCB3ZSB3YW50IHRvIGNoZWNrIHRoZSBvc3ZlcnNpb25cbiAgLy8gbm90IHRoZSBjaHJvbWUgdmVyc2lvbiwgc2VlIGlzc3VlICMyNlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vcm9mcmlzY2htYW5uL2lubGluZS1zdHlsZS1wcmVmaXhlci9pc3N1ZXMvMjZcbiAgaWYgKGluZm8uYnJvd3NlciA9PT0gJ2FuZHJvaWQnICYmIGluZm8ub3N2ZXJzaW9uIDwgNSkge1xuICAgIGluZm8udmVyc2lvbiA9IGluZm8ub3N2ZXJzaW9uO1xuICB9XG5cbiAgcmV0dXJuIGluZm87XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgYnJvd3NlciA9IF9yZWYuYnJvd3NlcjtcbiAgdmFyIHZlcnNpb24gPSBfcmVmLnZlcnNpb247XG4gIHZhciBwcmVmaXggPSBfcmVmLnByZWZpeDtcblxuICB2YXIgcHJlZml4ZWRLZXlmcmFtZXMgPSAna2V5ZnJhbWVzJztcblxuICBpZiAoYnJvd3NlciA9PT0gJ2Nocm9tZScgJiYgdmVyc2lvbiA8IDQzIHx8IChicm93c2VyID09PSAnc2FmYXJpJyB8fCBicm93c2VyID09PSAnaW9zX3NhZicpICYmIHZlcnNpb24gPCA5IHx8IGJyb3dzZXIgPT09ICdvcGVyYScgJiYgdmVyc2lvbiA8IDMwIHx8IGJyb3dzZXIgPT09ICdhbmRyb2lkJyAmJiB2ZXJzaW9uIDw9IDQuNCB8fCBicm93c2VyID09PSAnYW5kX3VjJykge1xuICAgIHByZWZpeGVkS2V5ZnJhbWVzID0gcHJlZml4LmNzcyArIHByZWZpeGVkS2V5ZnJhbWVzO1xuICB9XG4gIHJldHVybiBwcmVmaXhlZEtleWZyYW1lcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIi8qIVxuICAqIEJvd3NlciAtIGEgYnJvd3NlciBkZXRlY3RvclxuICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvYm93c2VyXG4gICogTUlUIExpY2Vuc2UgfCAoYykgRHVzdGluIERpYXogMjAxNVxuICAqL1xuXG4hZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSB0aGlzW25hbWVdID0gZGVmaW5pdGlvbigpXG59KCdib3dzZXInLCBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgICogU2VlIHVzZXJhZ2VudHMuanMgZm9yIGV4YW1wbGVzIG9mIG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAqL1xuXG4gIHZhciB0ID0gdHJ1ZVxuXG4gIGZ1bmN0aW9uIGRldGVjdCh1YSkge1xuXG4gICAgZnVuY3Rpb24gZ2V0Rmlyc3RNYXRjaChyZWdleCkge1xuICAgICAgdmFyIG1hdGNoID0gdWEubWF0Y2gocmVnZXgpO1xuICAgICAgcmV0dXJuIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoWzFdKSB8fCAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZWNvbmRNYXRjaChyZWdleCkge1xuICAgICAgdmFyIG1hdGNoID0gdWEubWF0Y2gocmVnZXgpO1xuICAgICAgcmV0dXJuIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoWzJdKSB8fCAnJztcbiAgICB9XG5cbiAgICB2YXIgaW9zZGV2aWNlID0gZ2V0Rmlyc3RNYXRjaCgvKGlwb2R8aXBob25lfGlwYWQpL2kpLnRvTG93ZXJDYXNlKClcbiAgICAgICwgbGlrZUFuZHJvaWQgPSAvbGlrZSBhbmRyb2lkL2kudGVzdCh1YSlcbiAgICAgICwgYW5kcm9pZCA9ICFsaWtlQW5kcm9pZCAmJiAvYW5kcm9pZC9pLnRlc3QodWEpXG4gICAgICAsIGNocm9tZUJvb2sgPSAvQ3JPUy8udGVzdCh1YSlcbiAgICAgICwgZWRnZVZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9lZGdlXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgLCB2ZXJzaW9uSWRlbnRpZmllciA9IGdldEZpcnN0TWF0Y2goL3ZlcnNpb25cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICAsIHRhYmxldCA9IC90YWJsZXQvaS50ZXN0KHVhKVxuICAgICAgLCBtb2JpbGUgPSAhdGFibGV0ICYmIC9bXi1dbW9iaS9pLnRlc3QodWEpXG4gICAgICAsIHJlc3VsdFxuXG4gICAgaWYgKC9vcGVyYXxvcHIvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnT3BlcmEnXG4gICAgICAsIG9wZXJhOiB0XG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyIHx8IGdldEZpcnN0TWF0Y2goLyg/Om9wZXJhfG9wcilbXFxzXFwvXShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3lhYnJvd3Nlci9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdZYW5kZXggQnJvd3NlcidcbiAgICAgICwgeWFuZGV4YnJvd3NlcjogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC8oPzp5YWJyb3dzZXIpW1xcc1xcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC93aW5kb3dzIHBob25lL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1dpbmRvd3MgUGhvbmUnXG4gICAgICAsIHdpbmRvd3NwaG9uZTogdFxuICAgICAgfVxuICAgICAgaWYgKGVkZ2VWZXJzaW9uKSB7XG4gICAgICAgIHJlc3VsdC5tc2VkZ2UgPSB0XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZWRnZVZlcnNpb25cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXN1bHQubXNpZSA9IHRcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9pZW1vYmlsZVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL21zaWV8dHJpZGVudC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdJbnRlcm5ldCBFeHBsb3JlcidcbiAgICAgICwgbXNpZTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzptc2llIHxydjopKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2hyb21lQm9vaykge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQ2hyb21lJ1xuICAgICAgLCBjaHJvbWVCb29rOiB0XG4gICAgICAsIGNocm9tZTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpjaHJvbWV8Y3Jpb3N8Y3JtbylcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgvY2hyb21lLis/IGVkZ2UvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnTWljcm9zb2Z0IEVkZ2UnXG4gICAgICAsIG1zZWRnZTogdFxuICAgICAgLCB2ZXJzaW9uOiBlZGdlVmVyc2lvblxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvY2hyb21lfGNyaW9zfGNybW8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQ2hyb21lJ1xuICAgICAgLCBjaHJvbWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86Y2hyb21lfGNyaW9zfGNybW8pXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpb3NkZXZpY2UpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZSA6IGlvc2RldmljZSA9PSAnaXBob25lJyA/ICdpUGhvbmUnIDogaW9zZGV2aWNlID09ICdpcGFkJyA/ICdpUGFkJyA6ICdpUG9kJ1xuICAgICAgfVxuICAgICAgLy8gV1RGOiB2ZXJzaW9uIGlzIG5vdCBwYXJ0IG9mIHVzZXIgYWdlbnQgaW4gd2ViIGFwcHNcbiAgICAgIGlmICh2ZXJzaW9uSWRlbnRpZmllcikge1xuICAgICAgICByZXN1bHQudmVyc2lvbiA9IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zYWlsZmlzaC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdTYWlsZmlzaCdcbiAgICAgICwgc2FpbGZpc2g6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvc2FpbGZpc2hcXHM/YnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3NlYW1vbmtleVxcLy9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdTZWFNb25rZXknXG4gICAgICAsIHNlYW1vbmtleTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9zZWFtb25rZXlcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9maXJlZm94fGljZXdlYXNlbC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdGaXJlZm94J1xuICAgICAgLCBmaXJlZm94OiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OmZpcmVmb3h8aWNld2Vhc2VsKVsgXFwvXShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICAgIGlmICgvXFwoKG1vYmlsZXx0YWJsZXQpO1teXFwpXSpydjpbXFxkXFwuXStcXCkvaS50ZXN0KHVhKSkge1xuICAgICAgICByZXN1bHQuZmlyZWZveG9zID0gdFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2lsay9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSAge1xuICAgICAgICBuYW1lOiAnQW1hem9uIFNpbGsnXG4gICAgICAsIHNpbGs6IHRcbiAgICAgICwgdmVyc2lvbiA6IGdldEZpcnN0TWF0Y2goL3NpbGtcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGFuZHJvaWQpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0FuZHJvaWQnXG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9waGFudG9tL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1BoYW50b21KUydcbiAgICAgICwgcGhhbnRvbTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9waGFudG9tanNcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9ibGFja2JlcnJ5fFxcYmJiXFxkKy9pLnRlc3QodWEpIHx8IC9yaW1cXHN0YWJsZXQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQmxhY2tCZXJyeSdcbiAgICAgICwgYmxhY2tiZXJyeTogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC9ibGFja2JlcnJ5W1xcZF0rXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvKHdlYnxocHcpb3MvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnV2ViT1MnXG4gICAgICAsIHdlYm9zOiB0XG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyIHx8IGdldEZpcnN0TWF0Y2goL3coPzplYik/b3Nicm93c2VyXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfTtcbiAgICAgIC90b3VjaHBhZFxcLy9pLnRlc3QodWEpICYmIChyZXN1bHQudG91Y2hwYWQgPSB0KVxuICAgIH1cbiAgICBlbHNlIGlmICgvYmFkYS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdCYWRhJ1xuICAgICAgLCBiYWRhOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL2RvbGZpblxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKC90aXplbi9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdUaXplbidcbiAgICAgICwgdGl6ZW46IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86dGl6ZW5cXHM/KT9icm93c2VyXFwvKFxcZCsoXFwuXFxkKyk/KS9pKSB8fCB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoL3NhZmFyaS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdTYWZhcmknXG4gICAgICAsIHNhZmFyaTogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogZ2V0Rmlyc3RNYXRjaCgvXiguKilcXC8oLiopIC8pLFxuICAgICAgICB2ZXJzaW9uOiBnZXRTZWNvbmRNYXRjaCgvXiguKilcXC8oLiopIC8pXG4gICAgIH07XG4gICB9XG5cbiAgICAvLyBzZXQgd2Via2l0IG9yIGdlY2tvIGZsYWcgZm9yIGJyb3dzZXJzIGJhc2VkIG9uIHRoZXNlIGVuZ2luZXNcbiAgICBpZiAoIXJlc3VsdC5tc2VkZ2UgJiYgLyhhcHBsZSk/d2Via2l0L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUgfHwgXCJXZWJraXRcIlxuICAgICAgcmVzdWx0LndlYmtpdCA9IHRcbiAgICAgIGlmICghcmVzdWx0LnZlcnNpb24gJiYgdmVyc2lvbklkZW50aWZpZXIpIHtcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXJlc3VsdC5vcGVyYSAmJiAvZ2Vja29cXC8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0Lm5hbWUgPSByZXN1bHQubmFtZSB8fCBcIkdlY2tvXCJcbiAgICAgIHJlc3VsdC5nZWNrbyA9IHRcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gcmVzdWx0LnZlcnNpb24gfHwgZ2V0Rmlyc3RNYXRjaCgvZ2Vja29cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgfVxuXG4gICAgLy8gc2V0IE9TIGZsYWdzIGZvciBwbGF0Zm9ybXMgdGhhdCBoYXZlIG11bHRpcGxlIGJyb3dzZXJzXG4gICAgaWYgKCFyZXN1bHQubXNlZGdlICYmIChhbmRyb2lkIHx8IHJlc3VsdC5zaWxrKSkge1xuICAgICAgcmVzdWx0LmFuZHJvaWQgPSB0XG4gICAgfSBlbHNlIGlmIChpb3NkZXZpY2UpIHtcbiAgICAgIHJlc3VsdFtpb3NkZXZpY2VdID0gdFxuICAgICAgcmVzdWx0LmlvcyA9IHRcbiAgICB9XG5cbiAgICAvLyBPUyB2ZXJzaW9uIGV4dHJhY3Rpb25cbiAgICB2YXIgb3NWZXJzaW9uID0gJyc7XG4gICAgaWYgKHJlc3VsdC53aW5kb3dzcGhvbmUpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL3dpbmRvd3MgcGhvbmUgKD86b3MpP1xccz8oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9vcyAoXFxkKyhbX1xcc11cXGQrKSopIGxpa2UgbWFjIG9zIHgvaSk7XG4gICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24ucmVwbGFjZSgvW19cXHNdL2csICcuJyk7XG4gICAgfSBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9hbmRyb2lkWyBcXC8tXShcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQud2Vib3MpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goLyg/OndlYnxocHcpb3NcXC8oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LmJsYWNrYmVycnkpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL3JpbVxcc3RhYmxldFxcc29zXFxzKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5iYWRhKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9iYWRhXFwvKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC50aXplbikge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvdGl6ZW5bXFwvXFxzXShcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfVxuICAgIGlmIChvc1ZlcnNpb24pIHtcbiAgICAgIHJlc3VsdC5vc3ZlcnNpb24gPSBvc1ZlcnNpb247XG4gICAgfVxuXG4gICAgLy8gZGV2aWNlIHR5cGUgZXh0cmFjdGlvblxuICAgIHZhciBvc01ham9yVmVyc2lvbiA9IG9zVmVyc2lvbi5zcGxpdCgnLicpWzBdO1xuICAgIGlmICh0YWJsZXQgfHwgaW9zZGV2aWNlID09ICdpcGFkJyB8fCAoYW5kcm9pZCAmJiAob3NNYWpvclZlcnNpb24gPT0gMyB8fCAob3NNYWpvclZlcnNpb24gPT0gNCAmJiAhbW9iaWxlKSkpIHx8IHJlc3VsdC5zaWxrKSB7XG4gICAgICByZXN1bHQudGFibGV0ID0gdFxuICAgIH0gZWxzZSBpZiAobW9iaWxlIHx8IGlvc2RldmljZSA9PSAnaXBob25lJyB8fCBpb3NkZXZpY2UgPT0gJ2lwb2QnIHx8IGFuZHJvaWQgfHwgcmVzdWx0LmJsYWNrYmVycnkgfHwgcmVzdWx0LndlYm9zIHx8IHJlc3VsdC5iYWRhKSB7XG4gICAgICByZXN1bHQubW9iaWxlID0gdFxuICAgIH1cblxuICAgIC8vIEdyYWRlZCBCcm93c2VyIFN1cHBvcnRcbiAgICAvLyBodHRwOi8vZGV2ZWxvcGVyLnlhaG9vLmNvbS95dWkvYXJ0aWNsZXMvZ2JzXG4gICAgaWYgKHJlc3VsdC5tc2VkZ2UgfHxcbiAgICAgICAgKHJlc3VsdC5tc2llICYmIHJlc3VsdC52ZXJzaW9uID49IDEwKSB8fFxuICAgICAgICAocmVzdWx0LnlhbmRleGJyb3dzZXIgJiYgcmVzdWx0LnZlcnNpb24gPj0gMTUpIHx8XG4gICAgICAgIChyZXN1bHQuY2hyb21lICYmIHJlc3VsdC52ZXJzaW9uID49IDIwKSB8fFxuICAgICAgICAocmVzdWx0LmZpcmVmb3ggJiYgcmVzdWx0LnZlcnNpb24gPj0gMjAuMCkgfHxcbiAgICAgICAgKHJlc3VsdC5zYWZhcmkgJiYgcmVzdWx0LnZlcnNpb24gPj0gNikgfHxcbiAgICAgICAgKHJlc3VsdC5vcGVyYSAmJiByZXN1bHQudmVyc2lvbiA+PSAxMC4wKSB8fFxuICAgICAgICAocmVzdWx0LmlvcyAmJiByZXN1bHQub3N2ZXJzaW9uICYmIHJlc3VsdC5vc3ZlcnNpb24uc3BsaXQoXCIuXCIpWzBdID49IDYpIHx8XG4gICAgICAgIChyZXN1bHQuYmxhY2tiZXJyeSAmJiByZXN1bHQudmVyc2lvbiA+PSAxMC4xKVxuICAgICAgICApIHtcbiAgICAgIHJlc3VsdC5hID0gdDtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHJlc3VsdC5tc2llICYmIHJlc3VsdC52ZXJzaW9uIDwgMTApIHx8XG4gICAgICAgIChyZXN1bHQuY2hyb21lICYmIHJlc3VsdC52ZXJzaW9uIDwgMjApIHx8XG4gICAgICAgIChyZXN1bHQuZmlyZWZveCAmJiByZXN1bHQudmVyc2lvbiA8IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uIDwgNikgfHxcbiAgICAgICAgKHJlc3VsdC5vcGVyYSAmJiByZXN1bHQudmVyc2lvbiA8IDEwLjApIHx8XG4gICAgICAgIChyZXN1bHQuaW9zICYmIHJlc3VsdC5vc3ZlcnNpb24gJiYgcmVzdWx0Lm9zdmVyc2lvbi5zcGxpdChcIi5cIilbMF0gPCA2KVxuICAgICAgICApIHtcbiAgICAgIHJlc3VsdC5jID0gdFxuICAgIH0gZWxzZSByZXN1bHQueCA9IHRcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHZhciBib3dzZXIgPSBkZXRlY3QodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogJycpXG5cbiAgYm93c2VyLnRlc3QgPSBmdW5jdGlvbiAoYnJvd3Nlckxpc3QpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJyb3dzZXJMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgYnJvd3Nlckl0ZW0gPSBicm93c2VyTGlzdFtpXTtcbiAgICAgIGlmICh0eXBlb2YgYnJvd3Nlckl0ZW09PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKGJyb3dzZXJJdGVtIGluIGJvd3Nlcikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qXG4gICAqIFNldCBvdXIgZGV0ZWN0IG1ldGhvZCB0byB0aGUgbWFpbiBib3dzZXIgb2JqZWN0IHNvIHdlIGNhblxuICAgKiByZXVzZSBpdCB0byB0ZXN0IG90aGVyIHVzZXIgYWdlbnRzLlxuICAgKiBUaGlzIGlzIG5lZWRlZCB0byBpbXBsZW1lbnQgZnV0dXJlIHRlc3RzLlxuICAgKi9cbiAgYm93c2VyLl9kZXRlY3QgPSBkZXRlY3Q7XG5cbiAgcmV0dXJuIGJvd3NlclxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy50b0NTUyA9IHRvQ1NTO1xuZXhwb3J0cy50b09iamVjdCA9IHRvT2JqZWN0O1xuZXhwb3J0cy5uZXN0UHNldWRvQ2xhc3NlcyA9IG5lc3RQc2V1ZG9DbGFzc2VzO1xuZXhwb3J0cy5pbXBvcnRhbnRpZnkgPSBpbXBvcnRhbnRpZnk7XG5cbnZhciBfY2FtZWxUb0Rhc2hDYXNlID0gcmVxdWlyZSgnLi91dGlscy9jYW1lbFRvRGFzaENhc2UnKTtcblxudmFyIF9jYW1lbFRvRGFzaENhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2FtZWxUb0Rhc2hDYXNlKTtcblxudmFyIF9kYXNoVG9DYW1lbENhc2UgPSByZXF1aXJlKCcuL3V0aWxzL2Rhc2hUb0NhbWVsQ2FzZScpO1xuXG52YXIgX2Rhc2hUb0NhbWVsQ2FzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYXNoVG9DYW1lbENhc2UpO1xuXG52YXIgX2lzTnVtYmVyID0gcmVxdWlyZSgnLi91dGlscy9pc051bWJlcicpO1xuXG52YXIgX2lzTnVtYmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzTnVtYmVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX3RvQXJyYXkoYXJyKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGFycikgPyBhcnIgOiBBcnJheS5mcm9tKGFycik7IH1cblxuLyoqXG4qIENyZWF0ZXMgYSB2YWxpZCBDU1Mgc3RyaW5nIG91dCBvZiBhbiBvYmplY3Qgb2Ygc3R5bGVzXG4qIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBhbiBvYmplY3Qgd2l0aCBDU1Mgc3R5bGVzXG4qIEBwYXJhbSB7c3RyaW5nfSB1bml0IC0gdW5pdCB0aGF0IGdldHMgYXBwbGllZCB0byBudW1iZXIgdmFsdWVzXG4qL1xuZnVuY3Rpb24gdG9DU1Moc3R5bGVzKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgdmFyIHVuaXQgPSBvcHRpb25zLnVuaXQgfHwgJ3B4JztcbiAgdmFyIHJ1bGVTZXBhcmF0b3IgPSBvcHRpb25zLnJ1bGVTZXBhcmF0b3IgfHwgJyc7XG4gIHZhciBzZWxlY3RvclNlcGFyYXRvciA9IG9wdGlvbnMuc2VsZWN0b3JTZXBhcmF0b3IgfHwgJyc7XG4gIHZhciBpbmRlbnQgPSBvcHRpb25zLmluZGVudCB8fCAnJztcblxuICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGVzKS5yZWR1Y2UoZnVuY3Rpb24gKHJ1bGVzLCBwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgLy8gcmVzb2x2ZSBtdWx0aSB2YWx1ZXMgcGFzc2VkIGFzIGFuIGFycmF5XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUuam9pbignOycgKyBwcm9wZXJ0eSArICc6JyArIHJ1bGVTZXBhcmF0b3IgKyBpbmRlbnQpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIC8vIHByZXJlbmRlciBuZXN0ZWQgc3R5bGUgb2JqZWN0c1xuICAgICAgcnVsZXMgKz0gKDAsIF9jYW1lbFRvRGFzaENhc2UyLmRlZmF1bHQpKHByb3BlcnR5KSArICd7JyArIHNlbGVjdG9yU2VwYXJhdG9yICsgdG9DU1ModmFsdWUsIG9wdGlvbnMpICsgc2VsZWN0b3JTZXBhcmF0b3IgKyAnfScgKyBzZWxlY3RvclNlcGFyYXRvcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFkZCBhbiBzZW1pY29sb24gYXQgdGhlIGVuZCBvZiBlYWNoIHJ1bGUgKGlmIG5vdCB0aGUgbGFzdCBvbmUpXG4gICAgICAgIGlmIChydWxlcyAhPT0gJycpIHtcbiAgICAgICAgICBydWxlcyArPSAnOycgKyBydWxlU2VwYXJhdG9yO1xuICAgICAgICB9XG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgYWRkcyB1bml0cyB0byBDU1MgcHJvcGVydGllcyB0aGF0IGFyZSBub3QgdW5pdGxlc3NcbiAgICAgICAgLy8gYnV0IGFyZSBwcm92aWRlZCBhcyBhIHBsYWluIG51bWJlclxuICAgICAgICBpZiAoKDAsIF9pc051bWJlcjIuZGVmYXVsdCkocHJvcGVydHksIHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyB1bml0O1xuICAgICAgICB9XG5cbiAgICAgICAgcnVsZXMgKz0gaW5kZW50ICsgKDAsIF9jYW1lbFRvRGFzaENhc2UyLmRlZmF1bHQpKHByb3BlcnR5KSArICc6JyArIHZhbHVlO1xuICAgICAgfVxuICAgIHJldHVybiBydWxlcztcbiAgfSwgJycpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIG9iamVjdCB3aXRoIENTUyBrZXktdmFsdWUgcGFpcnMgb3V0IG9mIGEgQ1NTIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IENTUyAtIENTUyBzdHJpbmcgdGhhdCBnZXRzIG9iamVjdGlmaWVkXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0KENTUykge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gIHZhciByZXBsYWNlciA9IG9wdGlvbnMucmVwbGFjZXIgfHwgeyAnLic6ICcnIH07XG5cbiAgLy8gdGhpcyBjaGVja3MgaWYgdGhlIHN0cmluZyBpcyBtYWRlIG9mIHNlbGVjdG9yc1xuICB2YXIgcmVwbGFjZVByZWZpeGVzID0gT2JqZWN0LmtleXMocmVwbGFjZXIpO1xuICB2YXIgcmVwbGFjZXJSZWdFeHAgPSByZXBsYWNlUHJlZml4ZXMubWFwKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICByZXR1cm4gJ1snICsgcHJlZml4ICsgJ10nO1xuICB9KS5qb2luKCd8Jyk7XG4gIHZhciBzZWxlY3RvcnMgPSBDU1MubWF0Y2gobmV3IFJlZ0V4cCgnKCcgKyByZXBsYWNlclJlZ0V4cCArICcpP1thLXowLTktXzpcXChcXCkgXSp7W159XSp9JywgJ2cnKSk7XG5cbiAgLy8gUmVzb2x2ZSBuZXN0ZWQgQ1NTIHNlbGVjdG9yIHN0cmluZ3NcbiAgaWYgKHNlbGVjdG9ycyAmJiBzZWxlY3RvcnMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBzZWxlY3RvcnMucmVkdWNlKGZ1bmN0aW9uIChydWxlcywgcnVsZSkge1xuICAgICAgLy8gc2VwZXJhdGUgc2VsZWN0b3IgKGNsYXNzTmFtZSkgYW5kIGl0cyBzdHlsZXNcbiAgICAgIC8vIHJlcGxhY2Ugc2VsZWN0b3IgcHJlZml4ZXMgYWNjb3JkaW5nIHRoZSByZXBsYWNlciBzZXR0aW5nc1xuICAgICAgdmFyIHNlbGVjdG9yID0gcnVsZS5tYXRjaCgvW157XSovKVswXTtcbiAgICAgIHZhciBzdHlsZXMgPSBydWxlLnJlcGxhY2Uoc2VsZWN0b3IsICcnKTtcblxuICAgICAgdmFyIGNsYXNzTmFtZSA9IHJlcGxhY2VQcmVmaXhlcy5yZWR1Y2UoZnVuY3Rpb24gKHRyYW5zZm9ybWVkQ2xhc3NOYW1lLCBwcmVmaXgpIHtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkQ2xhc3NOYW1lLmluZGV4T2YocHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgIHRyYW5zZm9ybWVkQ2xhc3NOYW1lID0gdHJhbnNmb3JtZWRDbGFzc05hbWUucmVwbGFjZShwcmVmaXgsIHJlcGxhY2VyW3ByZWZpeF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZENsYXNzTmFtZTtcbiAgICAgIH0sIHNlbGVjdG9yLnRyaW0oKSk7XG5cbiAgICAgIC8vIHJlY3Vyc2l2ZSBvYmplY3RpZnkgb24gcHVyZSBzdHlsZXMgc3RyaW5nICh3aXRob3V0IHdyYXBwaW5nIGJyYWNrZXRzKVxuICAgICAgcnVsZXNbY2xhc3NOYW1lXSA9IHRvT2JqZWN0KHN0eWxlcy5yZXBsYWNlKG5ldyBSZWdFeHAoJ3t8fScsICdnJyksICcnKSk7XG4gICAgICByZXR1cm4gcnVsZXM7XG4gICAgfSwge30pO1xuICB9XG5cbiAgLy8gc3BsaXR0aW5nIHRoZSBydWxlcyB0byBzaW5nbGUgc3RhdGVtZW50c1xuICByZXR1cm4gQ1NTLnNwbGl0KCc7JykucmVkdWNlKGZ1bmN0aW9uIChydWxlcywgcnVsZSkge1xuICAgIHZhciBfcnVsZSRzcGxpdCA9IHJ1bGUuc3BsaXQoJzonKTtcblxuICAgIHZhciBfcnVsZSRzcGxpdDIgPSBfc2xpY2VkVG9BcnJheShfcnVsZSRzcGxpdCwgMik7XG5cbiAgICB2YXIgcHJvcGVydHkgPSBfcnVsZSRzcGxpdDJbMF07XG4gICAgdmFyIHZhbHVlID0gX3J1bGUkc3BsaXQyWzFdO1xuXG4gICAgLy8gdHJpbW1pbmcgYm90aCB0byByZW1vdmUgcGFkZGluZyB3aGl0ZXNwYWNlXG5cbiAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgLy8gY29udmVydCBudW1iZXIgc3RyaW5ncyB0byByZWFsIG51bWJlcnMgaWYgcG9zc2libGVcbiAgICAgIC8vIEltcHJvdmVzIHVzYWJpbGl0eSBhbmQgZGV2ZWxvcGVyIGV4cGVyaWVuY2VcbiAgICAgIHZhciBudW1iZXJWYWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgaWYgKG51bWJlclZhbHVlID09IHZhbHVlIHx8IG51bWJlclZhbHVlID09IHZhbHVlLnJlcGxhY2UoJ3B4JywgJycpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgdmFsdWUgPSBudW1iZXJWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gZGFzaC1jYXNpbmcgdGhlIHByb3BlcnR5XG4gICAgICBwcm9wZXJ0eSA9ICgwLCBfZGFzaFRvQ2FtZWxDYXNlMi5kZWZhdWx0KShwcm9wZXJ0eS50cmltKCkpO1xuXG4gICAgICAvLyBtdXRpcGxlIHZhbHVlcyAvIGZhbGxiYWNrIHZhbHVlcyBnZXQgYWRkZWQgdG8gYW4gYXJyYXlcbiAgICAgIC8vIHdoaWxlIHRoZSBvcmRlciBzdGF5cyB0aGUgZXhhY3Qgc2FtZSBvcmRlclxuICAgICAgaWYgKHJ1bGVzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICB2YWx1ZSA9IFtydWxlc1twcm9wZXJ0eV1dLmNvbmNhdCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBydWxlc1twcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJ1bGVzO1xuICB9LCB7fSk7XG59XG5cbnZhciBzZXREb3RQcm9wID0gZnVuY3Rpb24gc2V0RG90UHJvcChvYmosIHBhdGgsIHZhbHVlKSB7XG4gIHZhciBwcm9wcyA9IHBhdGguc3BsaXQoJy4nKTtcbiAgdmFyIG1ham9yUHNldWRvID0gcHJvcHMucG9wKCk7XG5cbiAgdmFyIG5ld09iaiA9IHByb3BzLnJlZHVjZShmdW5jdGlvbiAob3V0cHV0LCBwcm9wZXJ0eSkge1xuICAgIC8vIGFkZCBzZWxlY3RvciBpZiBub3QgYWxyZWFkeSBleGlzdGluZ1xuICAgIGlmICghb3V0cHV0W3Byb3BlcnR5XSkge1xuICAgICAgb3V0cHV0W3Byb3BlcnR5XSA9IHt9O1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRbcHJvcGVydHldO1xuICB9LCBvYmopO1xuXG4gIG5ld09ialttYWpvclBzZXVkb10gPSB2YWx1ZTtcbn07XG5cbi8qKlxuICogTmVzdHMgcHNldWRvIHNlbGVjdG9ycyBpbnRvIHRoZWlyIHJlZmVyZW5jZSBzZWxlY3RvclxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIGFuIG9iamVjdCB3aXRoIHN0eWxlc1xuICovXG5mdW5jdGlvbiBuZXN0UHNldWRvQ2xhc3NlcyhzdHlsZXMpIHtcbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIGlmIChzZWxlY3Rvci5pbmRleE9mKCc6JykgPiAtMSkge1xuICAgICAgdmFyIF9zZWxlY3RvciRzcGxpdCA9IHNlbGVjdG9yLnNwbGl0KCc6Jyk7XG5cbiAgICAgIHZhciBfc2VsZWN0b3Ikc3BsaXQyID0gX3RvQXJyYXkoX3NlbGVjdG9yJHNwbGl0KTtcblxuICAgICAgdmFyIHNlbCA9IF9zZWxlY3RvciRzcGxpdDJbMF07XG5cbiAgICAgIHZhciBwc2V1ZG8gPSBfc2VsZWN0b3Ikc3BsaXQyLnNsaWNlKDEpO1xuICAgICAgLy8gYWRkIHNlbGVjdG9yIGlmIG5vdCBhbHJlYWR5IGV4aXN0aW5nXG5cbiAgICAgIGlmICghc3R5bGVzW3NlbF0pIHtcbiAgICAgICAgc3R5bGVzW3NlbF0gPSB7fTtcbiAgICAgIH1cblxuICAgICAgc2V0RG90UHJvcChzdHlsZXNbc2VsXSwgJzonICsgcHNldWRvLmpvaW4oJy46JyksIHN0eWxlc1tzZWxlY3Rvcl0pO1xuXG4gICAgICAvLyBhZGQgcHNldWRvIHRvIHNlbGVjdG9yIG9iamVjdFxuICAgICAgZGVsZXRlIHN0eWxlc1tzZWxlY3Rvcl07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc3R5bGVzO1xufVxuXG4vKipcbiAqIEFkZHMgYW4gIWltcG9ydGFudCBmbGFnIHRvIGV2ZXJ5IHZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIC0gYW4gb2JqZWN0IHdpdGggc3R5bGVzXG4gKi9cbmZ1bmN0aW9uIGltcG9ydGFudGlmeShzdHlsZXMpIHtcbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgLy8gYWRkICFpbXBvcnRhbnQgZmxhZyB0byBhY2hpZXZlIGhpZ2hlciBwcmlvcml0eSB0aGFuIGlubGluZSBzdHlsZXNcbiAgICBpZiAodmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKCchaW1wb3J0YW50JykgPT09IC0xKSB7XG4gICAgICBzdHlsZXNbcHJvcGVydHldID0gdmFsdWUgKyAnIWltcG9ydGFudCc7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc3R5bGVzO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8qKlxuICogQ29udmVydHMgYSBkYXNoLWNhc2Ugc3RyaW5nIHRvIGEgY2FtZWwtY2FzZSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBzdHIgdGhhdCBnZXRzIGNvbnZlcnRlZCB0byBjYW1lbC1jYXNlXG4gKi9cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBtYXRjaFsxXS50b1VwcGVyQ2FzZSgpO1xuICB9KS5yZXBsYWNlKC9eTXMvZywgJ21zJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNVbml0bGVzc1Byb3BlcnR5ID0gcmVxdWlyZSgnLi9pc1VuaXRsZXNzUHJvcGVydHknKTtcblxudmFyIF9pc1VuaXRsZXNzUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNVbml0bGVzc1Byb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gISgwLCBfaXNVbml0bGVzc1Byb3BlcnR5Mi5kZWZhdWx0KShwcm9wZXJ0eSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgdmFsdWUgIT09IDA7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFWaWV3O1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgaGFzaCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIEhhc2goKSB7fVxuXG4vLyBBdm9pZCBpbmhlcml0aW5nIGZyb20gYE9iamVjdC5wcm90b3R5cGVgIHdoZW4gcG9zc2libGUuXG5IYXNoLnByb3RvdHlwZSA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IG9iamVjdFByb3RvO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhhc2g7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIiwidmFyIG1hcENsZWFyID0gcmVxdWlyZSgnLi9fbWFwQ2xlYXInKSxcbiAgICBtYXBEZWxldGUgPSByZXF1aXJlKCcuL19tYXBEZWxldGUnKSxcbiAgICBtYXBHZXQgPSByZXF1aXJlKCcuL19tYXBHZXQnKSxcbiAgICBtYXBIYXMgPSByZXF1aXJlKCcuL19tYXBIYXMnKSxcbiAgICBtYXBTZXQgPSByZXF1aXJlKCcuL19tYXBTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IHZhbHVlc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcEdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcENhY2hlO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBSZWZsZWN0ID0gcm9vdC5SZWZsZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZmxlY3Q7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0O1xuIiwidmFyIHN0YWNrQ2xlYXIgPSByZXF1aXJlKCcuL19zdGFja0NsZWFyJyksXG4gICAgc3RhY2tEZWxldGUgPSByZXF1aXJlKCcuL19zdGFja0RlbGV0ZScpLFxuICAgIHN0YWNrR2V0ID0gcmVxdWlyZSgnLi9fc3RhY2tHZXQnKSxcbiAgICBzdGFja0hhcyA9IHJlcXVpcmUoJy4vX3N0YWNrSGFzJyksXG4gICAgc3RhY2tTZXQgPSByZXF1aXJlKCcuL19zdGFja1NldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSB2YWx1ZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhY2s7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gVWludDhBcnJheTtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXA7XG4iLCIvKipcbiAqIEFkZHMgdGhlIGtleS12YWx1ZSBgcGFpcmAgdG8gYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyIFRoZSBrZXktdmFsdWUgcGFpciB0byBhZGQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBtYXBgLlxuICovXG5mdW5jdGlvbiBhZGRNYXBFbnRyeShtYXAsIHBhaXIpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBNYXAjc2V0YCBiZWNhdXNlIGl0IGRvZXNuJ3QgcmV0dXJuIHRoZSBtYXAgaW5zdGFuY2UgaW4gSUUgMTEuXG4gIG1hcC5zZXQocGFpclswXSwgcGFpclsxXSk7XG4gIHJldHVybiBtYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkTWFwRW50cnk7XG4iLCIvKipcbiAqIEFkZHMgYHZhbHVlYCB0byBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYHNldGAuXG4gKi9cbmZ1bmN0aW9uIGFkZFNldEVudHJ5KHNldCwgdmFsdWUpIHtcbiAgc2V0LmFkZCh2YWx1ZSk7XG4gIHJldHVybiBzZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkU2V0RW50cnk7XG4iLCIvKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHZhciBsZW5ndGggPSBhcmdzLmxlbmd0aDtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwbHk7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUVhY2g7XG4iLCIvKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlQdXNoO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucmVkdWNlYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5pdEFjY3VtXSBTcGVjaWZ5IHVzaW5nIHRoZSBmaXJzdCBlbGVtZW50IG9mIGBhcnJheWAgYXNcbiAqICB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlSZWR1Y2UoYXJyYXksIGl0ZXJhdGVlLCBhY2N1bXVsYXRvciwgaW5pdEFjY3VtKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChpbml0QWNjdW0gJiYgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBhcnJheVsrK2luZGV4XTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlSZWR1Y2U7XG4iLCJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhc3NpZ25WYWx1ZWAgZXhjZXB0IHRoYXQgaXQgZG9lc24ndCBhc3NpZ25cbiAqIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgIWVxKG9iamVjdFtrZXldLCB2YWx1ZSkpIHx8XG4gICAgICAodHlwZW9mIGtleSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbk1lcmdlVmFsdWU7XG4iLCJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ25WYWx1ZTtcbiIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBhc3NvY2lhdGl2ZSBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhc3NvY0RlbGV0ZShhcnJheSwga2V5KSB7XG4gIHZhciBpbmRleCA9IGFzc29jSW5kZXhPZihhcnJheSwga2V5KTtcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gYXJyYXkubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGFycmF5LnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGFycmF5LCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzb2NEZWxldGU7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgYXNzb2NpYXRpdmUgYXJyYXkgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYXNzb2NHZXQoYXJyYXksIGtleSkge1xuICB2YXIgaW5kZXggPSBhc3NvY0luZGV4T2YoYXJyYXksIGtleSk7XG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBhcnJheVtpbmRleF1bMV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzb2NHZXQ7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGFuIGFzc29jaWF0aXZlIGFycmF5IHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhc3NvY0hhcyhhcnJheSwga2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NvY0hhcztcbiIsInZhciBlcSA9IHJlcXVpcmUoJy4vZXEnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jSW5kZXhPZjtcbiIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBhc3NvY2lhdGl2ZSBhcnJheSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKi9cbmZ1bmN0aW9uIGFzc29jU2V0KGFycmF5LCBrZXksIHZhbHVlKSB7XG4gIHZhciBpbmRleCA9IGFzc29jSW5kZXhPZihhcnJheSwga2V5KTtcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGFycmF5LnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBhcnJheVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jU2V0O1xuIiwidmFyIGNvcHlPYmplY3QgPSByZXF1aXJlKCcuL19jb3B5T2JqZWN0JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmFzc2lnbmAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzXG4gKiBvciBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnbihvYmplY3QsIHNvdXJjZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnbjtcbiIsInZhciBTdGFjayA9IHJlcXVpcmUoJy4vX1N0YWNrJyksXG4gICAgYXJyYXlFYWNoID0gcmVxdWlyZSgnLi9fYXJyYXlFYWNoJyksXG4gICAgYXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25WYWx1ZScpLFxuICAgIGJhc2VBc3NpZ24gPSByZXF1aXJlKCcuL19iYXNlQXNzaWduJyksXG4gICAgY2xvbmVCdWZmZXIgPSByZXF1aXJlKCcuL19jbG9uZUJ1ZmZlcicpLFxuICAgIGNvcHlBcnJheSA9IHJlcXVpcmUoJy4vX2NvcHlBcnJheScpLFxuICAgIGNvcHlTeW1ib2xzID0gcmVxdWlyZSgnLi9fY29weVN5bWJvbHMnKSxcbiAgICBnZXRBbGxLZXlzID0gcmVxdWlyZSgnLi9fZ2V0QWxsS2V5cycpLFxuICAgIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGluaXRDbG9uZUFycmF5ID0gcmVxdWlyZSgnLi9faW5pdENsb25lQXJyYXknKSxcbiAgICBpbml0Q2xvbmVCeVRhZyA9IHJlcXVpcmUoJy4vX2luaXRDbG9uZUJ5VGFnJyksXG4gICAgaW5pdENsb25lT2JqZWN0ID0gcmVxdWlyZSgnLi9faW5pdENsb25lT2JqZWN0JyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnLi9pc0J1ZmZlcicpLFxuICAgIGlzSG9zdE9iamVjdCA9IHJlcXVpcmUoJy4vX2lzSG9zdE9iamVjdCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBzdXBwb3J0ZWQgYnkgYF8uY2xvbmVgLiAqL1xudmFyIGNsb25lYWJsZVRhZ3MgPSB7fTtcbmNsb25lYWJsZVRhZ3NbYXJnc1RhZ10gPSBjbG9uZWFibGVUYWdzW2FycmF5VGFnXSA9XG5jbG9uZWFibGVUYWdzW2FycmF5QnVmZmVyVGFnXSA9IGNsb25lYWJsZVRhZ3NbZGF0YVZpZXdUYWddID1cbmNsb25lYWJsZVRhZ3NbYm9vbFRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGVUYWddID1cbmNsb25lYWJsZVRhZ3NbZmxvYXQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW2Zsb2F0NjRUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW2ludDE2VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDMyVGFnXSA9IGNsb25lYWJsZVRhZ3NbbWFwVGFnXSA9XG5jbG9uZWFibGVUYWdzW251bWJlclRhZ10gPSBjbG9uZWFibGVUYWdzW29iamVjdFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tyZWdleHBUYWddID0gY2xvbmVhYmxlVGFnc1tzZXRUYWddID1cbmNsb25lYWJsZVRhZ3Nbc3RyaW5nVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc3ltYm9sVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQxNlRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xuY2xvbmVhYmxlVGFnc1tlcnJvclRhZ10gPSBjbG9uZWFibGVUYWdzW2Z1bmNUYWddID1cbmNsb25lYWJsZVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jbG9uZWAgYW5kIGBfLmNsb25lRGVlcGAgd2hpY2ggdHJhY2tzXG4gKiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNGdWxsXSBTcGVjaWZ5IGEgY2xvbmUgaW5jbHVkaW5nIHN5bWJvbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjbG9uaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXldIFRoZSBrZXkgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgcGFyZW50IG9iamVjdCBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGFuZCB0aGVpciBjbG9uZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgY2xvbmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlQ2xvbmUodmFsdWUsIGlzRGVlcCwgaXNGdWxsLCBjdXN0b21pemVyLCBrZXksIG9iamVjdCwgc3RhY2spIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICByZXN1bHQgPSBvYmplY3QgPyBjdXN0b21pemVyKHZhbHVlLCBrZXksIG9iamVjdCwgc3RhY2spIDogY3VzdG9taXplcih2YWx1ZSk7XG4gIH1cbiAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKTtcbiAgaWYgKGlzQXJyKSB7XG4gICAgcmVzdWx0ID0gaW5pdENsb25lQXJyYXkodmFsdWUpO1xuICAgIGlmICghaXNEZWVwKSB7XG4gICAgICByZXR1cm4gY29weUFycmF5KHZhbHVlLCByZXN1bHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFnID0gZ2V0VGFnKHZhbHVlKSxcbiAgICAgICAgaXNGdW5jID0gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcblxuICAgIGlmIChpc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjbG9uZUJ1ZmZlcih2YWx1ZSwgaXNEZWVwKTtcbiAgICB9XG4gICAgaWYgKHRhZyA9PSBvYmplY3RUYWcgfHwgdGFnID09IGFyZ3NUYWcgfHwgKGlzRnVuYyAmJiAhb2JqZWN0KSkge1xuICAgICAgaWYgKGlzSG9zdE9iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA/IHZhbHVlIDoge307XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBpbml0Q2xvbmVPYmplY3QoaXNGdW5jID8ge30gOiB2YWx1ZSk7XG4gICAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgICByZXR1cm4gY29weVN5bWJvbHModmFsdWUsIGJhc2VBc3NpZ24ocmVzdWx0LCB2YWx1ZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWNsb25lYWJsZVRhZ3NbdGFnXSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZUJ5VGFnKHZhbHVlLCB0YWcsIGJhc2VDbG9uZSwgaXNEZWVwKTtcbiAgICB9XG4gIH1cbiAgLy8gQ2hlY2sgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMgYW5kIHJldHVybiBpdHMgY29ycmVzcG9uZGluZyBjbG9uZS5cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQodmFsdWUpO1xuICBpZiAoc3RhY2tlZCkge1xuICAgIHJldHVybiBzdGFja2VkO1xuICB9XG4gIHN0YWNrLnNldCh2YWx1ZSwgcmVzdWx0KTtcblxuICBpZiAoIWlzQXJyKSB7XG4gICAgdmFyIHByb3BzID0gaXNGdWxsID8gZ2V0QWxsS2V5cyh2YWx1ZSkgOiBrZXlzKHZhbHVlKTtcbiAgfVxuICAvLyBSZWN1cnNpdmVseSBwb3B1bGF0ZSBjbG9uZSAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICBhcnJheUVhY2gocHJvcHMgfHwgdmFsdWUsIGZ1bmN0aW9uKHN1YlZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHN1YlZhbHVlO1xuICAgICAgc3ViVmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgIH1cbiAgICBhc3NpZ25WYWx1ZShyZXN1bHQsIGtleSwgYmFzZUNsb25lKHN1YlZhbHVlLCBpc0RlZXAsIGlzRnVsbCwgY3VzdG9taXplciwga2V5LCB2YWx1ZSwgc3RhY2spKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNsb25lO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNyZWF0ZShwcm90bykge1xuICByZXR1cm4gaXNPYmplY3QocHJvdG8pID8gb2JqZWN0Q3JlYXRlKHByb3RvKSA6IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDcmVhdGU7XG4iLCJ2YXIgYXJyYXlQdXNoID0gcmVxdWlyZSgnLi9fYXJyYXlQdXNoJyksXG4gICAgaXNGbGF0dGVuYWJsZSA9IHJlcXVpcmUoJy4vX2lzRmxhdHRlbmFibGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mbGF0dGVuYCB3aXRoIHN1cHBvcnQgZm9yIHJlc3RyaWN0aW5nIGZsYXR0ZW5pbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZWRpY2F0ZT1pc0ZsYXR0ZW5hYmxlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTdHJpY3RdIFJlc3RyaWN0IHRvIHZhbHVlcyB0aGF0IHBhc3MgYHByZWRpY2F0ZWAgY2hlY2tzLlxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdD1bXV0gVGhlIGluaXRpYWwgcmVzdWx0IHZhbHVlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmxhdHRlbihhcnJheSwgZGVwdGgsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBwcmVkaWNhdGUgfHwgKHByZWRpY2F0ZSA9IGlzRmxhdHRlbmFibGUpO1xuICByZXN1bHQgfHwgKHJlc3VsdCA9IFtdKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAoZGVwdGggPiAwICYmIHByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICAgIGlmIChkZXB0aCA+IDEpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgYmFzZUZsYXR0ZW4odmFsdWUsIGRlcHRoIC0gMSwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5UHVzaChyZXN1bHQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1N0cmljdCkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZsYXR0ZW47XG4iLCJ2YXIgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpLFxuICAgIGlzS2V5ID0gcmVxdWlyZSgnLi9faXNLZXknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5nZXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFtwYXRoW2luZGV4KytdXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldDtcbiIsInZhciBhcnJheVB1c2ggPSByZXF1aXJlKCcuL19hcnJheVB1c2gnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldEFsbEtleXNgIGFuZCBgZ2V0QWxsS2V5c0luYCB3aGljaCB1c2VzXG4gKiBga2V5c0Z1bmNgIGFuZCBgc3ltYm9sc0Z1bmNgIHRvIGdldCB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzeW1ib2xzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzRnVuYywgc3ltYm9sc0Z1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXNGdW5jKG9iamVjdCk7XG4gIHJldHVybiBpc0FycmF5KG9iamVjdClcbiAgICA/IHJlc3VsdFxuICAgIDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldEFsbEtleXM7XG4iLCJ2YXIgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaGFzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUhhcyhvYmplY3QsIGtleSkge1xuICAvLyBBdm9pZCBhIGJ1ZyBpbiBJRSAxMC0xMSB3aGVyZSBvYmplY3RzIHdpdGggYSBbW1Byb3RvdHlwZV1dIG9mIGBudWxsYCxcbiAgLy8gdGhhdCBhcmUgY29tcG9zZWQgZW50aXJlbHkgb2YgaW5kZXggcHJvcGVydGllcywgcmV0dXJuIGBmYWxzZWAgZm9yXG4gIC8vIGBoYXNPd25Qcm9wZXJ0eWAgY2hlY2tzIG9mIHRoZW0uXG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSB8fFxuICAgICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmIGtleSBpbiBvYmplY3QgJiYgZ2V0UHJvdG90eXBlKG9iamVjdCkgPT09IG51bGwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VIYXM7XG4iLCIvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IE9iamVjdC5rZXlzO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3Qgc2tpcCB0aGUgY29uc3RydWN0b3JcbiAqIHByb3BlcnR5IG9mIHByb3RvdHlwZXMgb3IgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIHJldHVybiBuYXRpdmVLZXlzKE9iamVjdChvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlS2V5cztcbiIsInZhciBSZWZsZWN0ID0gcmVxdWlyZSgnLi9fUmVmbGVjdCcpLFxuICAgIGl0ZXJhdG9yVG9BcnJheSA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9yVG9BcnJheScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBlbnVtZXJhdGUgPSBSZWZsZWN0ID8gUmVmbGVjdC5lbnVtZXJhdGUgOiB1bmRlZmluZWQsXG4gICAgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3Qgc2tpcCB0aGUgY29uc3RydWN0b3JcbiAqIHByb3BlcnR5IG9mIHByb3RvdHlwZXMgb3IgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgb2JqZWN0ID0gb2JqZWN0ID09IG51bGwgPyBvYmplY3QgOiBPYmplY3Qob2JqZWN0KTtcblxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBJRSA8IDkgd2l0aCBlczYtc2hpbS5cbmlmIChlbnVtZXJhdGUgJiYgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAndmFsdWVPZic6IDEgfSwgJ3ZhbHVlT2YnKSkge1xuICBiYXNlS2V5c0luID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIGl0ZXJhdG9yVG9BcnJheShlbnVtZXJhdGUob2JqZWN0KSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUtleXNJbjtcbiIsInZhciBTdGFjayA9IHJlcXVpcmUoJy4vX1N0YWNrJyksXG4gICAgYXJyYXlFYWNoID0gcmVxdWlyZSgnLi9fYXJyYXlFYWNoJyksXG4gICAgYXNzaWduTWVyZ2VWYWx1ZSA9IHJlcXVpcmUoJy4vX2Fzc2lnbk1lcmdlVmFsdWUnKSxcbiAgICBiYXNlTWVyZ2VEZWVwID0gcmVxdWlyZSgnLi9fYmFzZU1lcmdlRGVlcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4va2V5c0luJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmIChvYmplY3QgPT09IHNvdXJjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIShpc0FycmF5KHNvdXJjZSkgfHwgaXNUeXBlZEFycmF5KHNvdXJjZSkpKSB7XG4gICAgdmFyIHByb3BzID0ga2V5c0luKHNvdXJjZSk7XG4gIH1cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3JjVmFsdWU7XG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlO1xuIiwidmFyIGFzc2lnbk1lcmdlVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25NZXJnZVZhbHVlJyksXG4gICAgYmFzZUNsb25lID0gcmVxdWlyZSgnLi9fYmFzZUNsb25lJyksXG4gICAgY29weUFycmF5ID0gcmVxdWlyZSgnLi9fY29weUFycmF5JyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQXJyYXlMaWtlT2JqZWN0ID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZU9iamVjdCcpLFxuICAgIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi9pc1BsYWluT2JqZWN0JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKSxcbiAgICB0b1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi90b1BsYWluT2JqZWN0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFjaykge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV0sXG4gICAgICBzdGFja2VkID0gc3RhY2suZ2V0KHNyY1ZhbHVlKTtcblxuICBpZiAoc3RhY2tlZCkge1xuICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHN0YWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHZhciBpc0NvbW1vbiA9IG5ld1ZhbHVlID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IChzcmNJbmRleCAmJiBpc0Z1bmN0aW9uKG9ialZhbHVlKSkpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBiYXNlQ2xvbmUoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgc3RhY2suc2V0KHNyY1ZhbHVlLCBuZXdWYWx1ZSk7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgbWVyZ2VGdW5jKG5ld1ZhbHVlLCBzcmNWYWx1ZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgfVxuICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlRGVlcDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVGltZXM7XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIHN0cmluZ1RvUGF0aCA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvUGF0aCcpO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBjYXN0UGF0aCh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IHN0cmluZ1RvUGF0aCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FzdFBhdGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZ2xvYmFsIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7bnVsbHxPYmplY3R9IFJldHVybnMgYHZhbHVlYCBpZiBpdCdzIGEgZ2xvYmFsIG9iamVjdCwgZWxzZSBgbnVsbGAuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrR2xvYmFsKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdmFsdWUuT2JqZWN0ID09PSBPYmplY3QpID8gdmFsdWUgOiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrR2xvYmFsO1xuIiwidmFyIFVpbnQ4QXJyYXkgPSByZXF1aXJlKCcuL19VaW50OEFycmF5Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZUFycmF5QnVmZmVyO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgIGBidWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIFRoZSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge0J1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVCdWZmZXIoYnVmZmVyLCBpc0RlZXApIHtcbiAgaWYgKGlzRGVlcCkge1xuICAgIHJldHVybiBidWZmZXIuc2xpY2UoKTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gbmV3IGJ1ZmZlci5jb25zdHJ1Y3RvcihidWZmZXIubGVuZ3RoKTtcbiAgYnVmZmVyLmNvcHkocmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZUJ1ZmZlcjtcbiIsInZhciBjbG9uZUFycmF5QnVmZmVyID0gcmVxdWlyZSgnLi9fY2xvbmVBcnJheUJ1ZmZlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgZGF0YVZpZXdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVZpZXcgVGhlIGRhdGEgdmlldyB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgZGF0YSB2aWV3LlxuICovXG5mdW5jdGlvbiBjbG9uZURhdGFWaWV3KGRhdGFWaWV3LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIoZGF0YVZpZXcuYnVmZmVyKSA6IGRhdGFWaWV3LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyBkYXRhVmlldy5jb25zdHJ1Y3RvcihidWZmZXIsIGRhdGFWaWV3LmJ5dGVPZmZzZXQsIGRhdGFWaWV3LmJ5dGVMZW5ndGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lRGF0YVZpZXc7XG4iLCJ2YXIgYWRkTWFwRW50cnkgPSByZXF1aXJlKCcuL19hZGRNYXBFbnRyeScpLFxuICAgIGFycmF5UmVkdWNlID0gcmVxdWlyZSgnLi9fYXJyYXlSZWR1Y2UnKSxcbiAgICBtYXBUb0FycmF5ID0gcmVxdWlyZSgnLi9fbWFwVG9BcnJheScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIG1hcC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVNYXAobWFwLCBpc0RlZXAsIGNsb25lRnVuYykge1xuICB2YXIgYXJyYXkgPSBpc0RlZXAgPyBjbG9uZUZ1bmMobWFwVG9BcnJheShtYXApLCB0cnVlKSA6IG1hcFRvQXJyYXkobWFwKTtcbiAgcmV0dXJuIGFycmF5UmVkdWNlKGFycmF5LCBhZGRNYXBFbnRyeSwgbmV3IG1hcC5jb25zdHJ1Y3Rvcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVNYXA7XG4iLCIvKiogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBmbGFncyBmcm9tIHRoZWlyIGNvZXJjZWQgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUZsYWdzID0gL1xcdyokLztcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHJlZ2V4cGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdleHAgVGhlIHJlZ2V4cCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCByZWdleHAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lUmVnRXhwKHJlZ2V4cCkge1xuICB2YXIgcmVzdWx0ID0gbmV3IHJlZ2V4cC5jb25zdHJ1Y3RvcihyZWdleHAuc291cmNlLCByZUZsYWdzLmV4ZWMocmVnZXhwKSk7XG4gIHJlc3VsdC5sYXN0SW5kZXggPSByZWdleHAubGFzdEluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lUmVnRXhwO1xuIiwidmFyIGFkZFNldEVudHJ5ID0gcmVxdWlyZSgnLi9fYWRkU2V0RW50cnknKSxcbiAgICBhcnJheVJlZHVjZSA9IHJlcXVpcmUoJy4vX2FycmF5UmVkdWNlJyksXG4gICAgc2V0VG9BcnJheSA9IHJlcXVpcmUoJy4vX3NldFRvQXJyYXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzZXQuXG4gKi9cbmZ1bmN0aW9uIGNsb25lU2V0KHNldCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKHNldFRvQXJyYXkoc2V0KSwgdHJ1ZSkgOiBzZXRUb0FycmF5KHNldCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkU2V0RW50cnksIG5ldyBzZXQuY29uc3RydWN0b3IpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lU2V0O1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIGBzeW1ib2xgIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHN5bWJvbCBUaGUgc3ltYm9sIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzeW1ib2wgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjbG9uZVN5bWJvbChzeW1ib2wpIHtcbiAgcmV0dXJuIHN5bWJvbFZhbHVlT2YgPyBPYmplY3Qoc3ltYm9sVmFsdWVPZi5jYWxsKHN5bWJvbCkpIDoge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVTeW1ib2w7XG4iLCJ2YXIgY2xvbmVBcnJheUJ1ZmZlciA9IHJlcXVpcmUoJy4vX2Nsb25lQXJyYXlCdWZmZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHR5cGVkQXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZWRBcnJheSBUaGUgdHlwZWQgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHR5cGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZVR5cGVkQXJyYXkodHlwZWRBcnJheSwgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKHR5cGVkQXJyYXkuYnVmZmVyKSA6IHR5cGVkQXJyYXkuYnVmZmVyO1xuICByZXR1cm4gbmV3IHR5cGVkQXJyYXkuY29uc3RydWN0b3IoYnVmZmVyLCB0eXBlZEFycmF5LmJ5dGVPZmZzZXQsIHR5cGVkQXJyYXkubGVuZ3RoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZVR5cGVkQXJyYXk7XG4iLCIvKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5QXJyYXk7XG4iLCJ2YXIgYXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25WYWx1ZScpO1xuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiBzb3VyY2Vba2V5XTtcblxuICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5T2JqZWN0O1xuIiwidmFyIGNvcHlPYmplY3QgPSByZXF1aXJlKCcuL19jb3B5T2JqZWN0JyksXG4gICAgZ2V0U3ltYm9scyA9IHJlcXVpcmUoJy4vX2dldFN5bWJvbHMnKTtcblxuLyoqXG4gKiBDb3BpZXMgb3duIHN5bWJvbCBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHN5bWJvbHMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5U3ltYm9scyhzb3VyY2UsIG9iamVjdCkge1xuICByZXR1cm4gY29weU9iamVjdChzb3VyY2UsIGdldFN5bWJvbHMoc291cmNlKSwgb2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5U3ltYm9scztcbiIsInZhciBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4vX2lzSXRlcmF0ZWVDYWxsJyksXG4gICAgcmVzdCA9IHJlcXVpcmUoJy4vcmVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmFzc2lnbmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiByZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbidcbiAgICAgID8gKGxlbmd0aC0tLCBjdXN0b21pemVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgaW5kZXgsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBc3NpZ25lcjtcbiIsInZhciBiYXNlR2V0QWxsS2V5cyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRBbGxLZXlzJyksXG4gICAgZ2V0U3ltYm9scyA9IHJlcXVpcmUoJy4vX2dldFN5bWJvbHMnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5cywgZ2V0U3ltYm9scyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QWxsS2V5cztcbiIsInZhciBiYXNlUHJvcGVydHkgPSByZXF1aXJlKCcuL19iYXNlUHJvcGVydHknKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYVxuICogW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpIHRoYXQgYWZmZWN0c1xuICogU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TGVuZ3RoO1xuIiwidmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnLi9pc05hdGl2ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCIvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0UHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG4vKipcbiAqIEdldHMgdGhlIGBbW1Byb3RvdHlwZV1dYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyB0aGUgYFtbUHJvdG90eXBlXV1gLlxuICovXG5mdW5jdGlvbiBnZXRQcm90b3R5cGUodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZUdldFByb3RvdHlwZShPYmplY3QodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRQcm90b3R5cGU7XG4iLCIvKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN5bWJvbCBwcm9wZXJ0aWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldFN5bWJvbHMob2JqZWN0KSB7XG4gIC8vIENvZXJjZSBgb2JqZWN0YCB0byBhbiBvYmplY3QgdG8gYXZvaWQgbm9uLW9iamVjdCBlcnJvcnMgaW4gVjguXG4gIC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zNDQzIGZvciBtb3JlIGRldGFpbHMuXG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoT2JqZWN0KG9iamVjdCkpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgSUUgPCAxMS5cbmlmICghZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIGdldFN5bWJvbHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gW107XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U3ltYm9scztcbiIsInZhciBEYXRhVmlldyA9IHJlcXVpcmUoJy4vX0RhdGFWaWV3JyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJy4vX1Byb21pc2UnKSxcbiAgICBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBXZWFrTWFwID0gcmVxdWlyZSgnLi9fV2Vha01hcCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0VGFnKHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEsXG4vLyBmb3IgZGF0YSB2aWV3cyBpbiBFZGdlLCBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcy5cbmlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZykgfHxcbiAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWcpIHx8XG4gICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZykgfHxcbiAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gIGdldFRhZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpLFxuICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyA/IHZhbHVlLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLFxuICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFRhZztcbiIsInZhciBoYXNoSGFzID0gcmVxdWlyZSgnLi9faGFzaEhhcycpO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShoYXNoLCBrZXkpIHtcbiAgcmV0dXJuIGhhc2hIYXMoaGFzaCwga2V5KSAmJiBkZWxldGUgaGFzaFtrZXldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hEZWxldGU7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChoYXNoLCBrZXkpIHtcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBoYXNoW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaGFzaCwga2V5KSA/IGhhc2hba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoR2V0O1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhoYXNoLCBrZXkpIHtcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGhhc2hba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChoYXNoLCBrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hIYXM7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGhhc2gsIGtleSwgdmFsdWUpIHtcbiAgaGFzaFtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFNldDtcbiIsInZhciBiYXNlVGltZXMgPSByZXF1aXJlKCcuL19iYXNlVGltZXMnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNTdHJpbmcgPSByZXF1aXJlKCcuL2lzU3RyaW5nJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBpbmRleCBrZXlzIGZvciBgb2JqZWN0YCB2YWx1ZXMgb2YgYXJyYXlzLFxuICogYGFyZ3VtZW50c2Agb2JqZWN0cywgYW5kIHN0cmluZ3MsIG90aGVyd2lzZSBgbnVsbGAgaXMgcmV0dXJuZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheXxudWxsfSBSZXR1cm5zIGluZGV4IGtleXMsIGVsc2UgYG51bGxgLlxuICovXG5mdW5jdGlvbiBpbmRleEtleXMob2JqZWN0KSB7XG4gIHZhciBsZW5ndGggPSBvYmplY3QgPyBvYmplY3QubGVuZ3RoIDogdW5kZWZpbmVkO1xuICBpZiAoaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc1N0cmluZyhvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIGJhc2VUaW1lcyhsZW5ndGgsIFN0cmluZyk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5kZXhLZXlzO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBhcnJheSBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQXJyYXkoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFycmF5LmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgLy8gQWRkIHByb3BlcnRpZXMgYXNzaWduZWQgYnkgYFJlZ0V4cCNleGVjYC5cbiAgaWYgKGxlbmd0aCAmJiB0eXBlb2YgYXJyYXlbMF0gPT0gJ3N0cmluZycgJiYgaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgJ2luZGV4JykpIHtcbiAgICByZXN1bHQuaW5kZXggPSBhcnJheS5pbmRleDtcbiAgICByZXN1bHQuaW5wdXQgPSBhcnJheS5pbnB1dDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXRDbG9uZUFycmF5O1xuIiwidmFyIGNsb25lQXJyYXlCdWZmZXIgPSByZXF1aXJlKCcuL19jbG9uZUFycmF5QnVmZmVyJyksXG4gICAgY2xvbmVEYXRhVmlldyA9IHJlcXVpcmUoJy4vX2Nsb25lRGF0YVZpZXcnKSxcbiAgICBjbG9uZU1hcCA9IHJlcXVpcmUoJy4vX2Nsb25lTWFwJyksXG4gICAgY2xvbmVSZWdFeHAgPSByZXF1aXJlKCcuL19jbG9uZVJlZ0V4cCcpLFxuICAgIGNsb25lU2V0ID0gcmVxdWlyZSgnLi9fY2xvbmVTZXQnKSxcbiAgICBjbG9uZVN5bWJvbCA9IHJlcXVpcmUoJy4vX2Nsb25lU3ltYm9sJyksXG4gICAgY2xvbmVUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9fY2xvbmVUeXBlZEFycmF5Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZSBiYXNlZCBvbiBpdHMgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNsb25pbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVCeVRhZyhvYmplY3QsIHRhZywgY2xvbmVGdW5jLCBpc0RlZXApIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3I7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIHJldHVybiBjbG9uZUFycmF5QnVmZmVyKG9iamVjdCk7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKCtvYmplY3QpO1xuXG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIHJldHVybiBjbG9uZURhdGFWaWV3KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgZmxvYXQzMlRhZzogY2FzZSBmbG9hdDY0VGFnOlxuICAgIGNhc2UgaW50OFRhZzogY2FzZSBpbnQxNlRhZzogY2FzZSBpbnQzMlRhZzpcbiAgICBjYXNlIHVpbnQ4VGFnOiBjYXNlIHVpbnQ4Q2xhbXBlZFRhZzogY2FzZSB1aW50MTZUYWc6IGNhc2UgdWludDMyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lVHlwZWRBcnJheShvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHJldHVybiBjbG9uZU1hcChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKG9iamVjdCk7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVJlZ0V4cChvYmplY3QpO1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTZXQob2JqZWN0LCBpc0RlZXAsIGNsb25lRnVuYyk7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVN5bWJvbChvYmplY3QpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lQnlUYWc7XG4iLCJ2YXIgYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX2Jhc2VDcmVhdGUnKSxcbiAgICBnZXRQcm90b3R5cGUgPSByZXF1aXJlKCcuL19nZXRQcm90b3R5cGUnKSxcbiAgICBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lT2JqZWN0KG9iamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNQcm90b3R5cGUob2JqZWN0KSlcbiAgICA/IGJhc2VDcmVhdGUoZ2V0UHJvdG90eXBlKG9iamVjdCkpXG4gICAgOiB7fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbml0Q2xvbmVPYmplY3Q7XG4iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQXJyYXlMaWtlT2JqZWN0ID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZU9iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZmxhdHRlbmFibGUgYGFyZ3VtZW50c2Agb2JqZWN0IG9yIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZsYXR0ZW5hYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzRmxhdHRlbmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZsYXR0ZW5hYmxlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0hvc3RPYmplY3Q7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSA/ICt2YWx1ZSA6IC0xO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG4iLCJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuIiwidmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gIWlzQXJyYXkodmFsdWUpICYmXG4gICAgKGlzU3ltYm9sKHZhbHVlKSB8fCByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzS2V5O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHxcbiAgICAodHlwZSA9PSAnc3RyaW5nJyAmJiB2YWx1ZSAhPSAnX19wcm90b19fJykgfHwgdmFsdWUgPT0gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0tleWFibGU7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQcm90b3R5cGU7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBpdGVyYXRvcmAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVyYXRvciBUaGUgaXRlcmF0b3IgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBpdGVyYXRvclRvQXJyYXkoaXRlcmF0b3IpIHtcbiAgdmFyIGRhdGEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoIShkYXRhID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgcmVzdWx0LnB1c2goZGF0YS52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpdGVyYXRvclRvQXJyYXk7XG4iLCJ2YXIgSGFzaCA9IHJlcXVpcmUoJy4vX0hhc2gnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogTWFwID8gbmV3IE1hcCA6IFtdLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENsZWFyO1xuIiwidmFyIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIGFzc29jRGVsZXRlID0gcmVxdWlyZSgnLi9fYXNzb2NEZWxldGUnKSxcbiAgICBoYXNoRGVsZXRlID0gcmVxdWlyZSgnLi9faGFzaERlbGV0ZScpLFxuICAgIGlzS2V5YWJsZSA9IHJlcXVpcmUoJy4vX2lzS2V5YWJsZScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChpc0tleWFibGUoa2V5KSkge1xuICAgIHJldHVybiBoYXNoRGVsZXRlKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBkYXRhLnN0cmluZyA6IGRhdGEuaGFzaCwga2V5KTtcbiAgfVxuICByZXR1cm4gTWFwID8gZGF0YS5tYXBbJ2RlbGV0ZSddKGtleSkgOiBhc3NvY0RlbGV0ZShkYXRhLm1hcCwga2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBEZWxldGU7XG4iLCJ2YXIgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgYXNzb2NHZXQgPSByZXF1aXJlKCcuL19hc3NvY0dldCcpLFxuICAgIGhhc2hHZXQgPSByZXF1aXJlKCcuL19oYXNoR2V0JyksXG4gICAgaXNLZXlhYmxlID0gcmVxdWlyZSgnLi9faXNLZXlhYmxlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGlzS2V5YWJsZShrZXkpKSB7XG4gICAgcmV0dXJuIGhhc2hHZXQodHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/IGRhdGEuc3RyaW5nIDogZGF0YS5oYXNoLCBrZXkpO1xuICB9XG4gIHJldHVybiBNYXAgPyBkYXRhLm1hcC5nZXQoa2V5KSA6IGFzc29jR2V0KGRhdGEubWFwLCBrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcEdldDtcbiIsInZhciBNYXAgPSByZXF1aXJlKCcuL19NYXAnKSxcbiAgICBhc3NvY0hhcyA9IHJlcXVpcmUoJy4vX2Fzc29jSGFzJyksXG4gICAgaGFzaEhhcyA9IHJlcXVpcmUoJy4vX2hhc2hIYXMnKSxcbiAgICBpc0tleWFibGUgPSByZXF1aXJlKCcuL19pc0tleWFibGUnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGlzS2V5YWJsZShrZXkpKSB7XG4gICAgcmV0dXJuIGhhc2hIYXModHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/IGRhdGEuc3RyaW5nIDogZGF0YS5oYXNoLCBrZXkpO1xuICB9XG4gIHJldHVybiBNYXAgPyBkYXRhLm1hcC5oYXMoa2V5KSA6IGFzc29jSGFzKGRhdGEubWFwLCBrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcEhhcztcbiIsInZhciBNYXAgPSByZXF1aXJlKCcuL19NYXAnKSxcbiAgICBhc3NvY1NldCA9IHJlcXVpcmUoJy4vX2Fzc29jU2V0JyksXG4gICAgaGFzaFNldCA9IHJlcXVpcmUoJy4vX2hhc2hTZXQnKSxcbiAgICBpc0tleWFibGUgPSByZXF1aXJlKCcuL19pc0tleWFibGUnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChpc0tleWFibGUoa2V5KSkge1xuICAgIGhhc2hTZXQodHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/IGRhdGEuc3RyaW5nIDogZGF0YS5oYXNoLCBrZXksIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChNYXApIHtcbiAgICBkYXRhLm1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgYXNzb2NTZXQoZGF0YS5tYXAsIGtleSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcFNldDtcbiIsIi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcFRvQXJyYXk7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlQ3JlYXRlO1xuIiwidmFyIGNoZWNrR2xvYmFsID0gcmVxdWlyZSgnLi9fY2hlY2tHbG9iYWwnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZXJtaW5lIGlmIHZhbHVlcyBhcmUgb2YgdGhlIGxhbmd1YWdlIHR5cGUgYE9iamVjdGAuICovXG52YXIgb2JqZWN0VHlwZXMgPSB7XG4gICdmdW5jdGlvbic6IHRydWUsXG4gICdvYmplY3QnOiB0cnVlXG59O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gKG9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlKVxuICA/IGV4cG9ydHNcbiAgOiB1bmRlZmluZWQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gKG9iamVjdFR5cGVzW3R5cGVvZiBtb2R1bGVdICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlKVxuICA/IG1vZHVsZVxuICA6IHVuZGVmaW5lZDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gY2hlY2tHbG9iYWwoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSAmJiB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSBjaGVja0dsb2JhbChvYmplY3RUeXBlc1t0eXBlb2Ygc2VsZl0gJiYgc2VsZik7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgd2luZG93YC4gKi9cbnZhciBmcmVlV2luZG93ID0gY2hlY2tHbG9iYWwob2JqZWN0VHlwZXNbdHlwZW9mIHdpbmRvd10gJiYgd2luZG93KTtcblxuLyoqIERldGVjdCBgdGhpc2AgYXMgdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgdGhpc0dsb2JhbCA9IGNoZWNrR2xvYmFsKG9iamVjdFR5cGVzW3R5cGVvZiB0aGlzXSAmJiB0aGlzKTtcblxuLyoqXG4gKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LlxuICpcbiAqIFRoZSBgdGhpc2AgdmFsdWUgaXMgdXNlZCBpZiBpdCdzIHRoZSBnbG9iYWwgb2JqZWN0IHRvIGF2b2lkIEdyZWFzZW1vbmtleSdzXG4gKiByZXN0cmljdGVkIGB3aW5kb3dgIG9iamVjdCwgb3RoZXJ3aXNlIHRoZSBgd2luZG93YCBvYmplY3QgaXMgdXNlZC5cbiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8XG4gICgoZnJlZVdpbmRvdyAhPT0gKHRoaXNHbG9iYWwgJiYgdGhpc0dsb2JhbC53aW5kb3cpKSAmJiBmcmVlV2luZG93KSB8fFxuICAgIGZyZWVTZWxmIHx8IHRoaXNHbG9iYWwgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VG9BcnJheTtcbiIsIi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHsgJ2FycmF5JzogW10sICdtYXAnOiBudWxsIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tDbGVhcjtcbiIsInZhciBhc3NvY0RlbGV0ZSA9IHJlcXVpcmUoJy4vX2Fzc29jRGVsZXRlJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBhcnJheSA9IGRhdGEuYXJyYXk7XG5cbiAgcmV0dXJuIGFycmF5ID8gYXNzb2NEZWxldGUoYXJyYXksIGtleSkgOiBkYXRhLm1hcFsnZGVsZXRlJ10oa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0RlbGV0ZTtcbiIsInZhciBhc3NvY0dldCA9IHJlcXVpcmUoJy4vX2Fzc29jR2V0Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBhcnJheSA9IGRhdGEuYXJyYXk7XG5cbiAgcmV0dXJuIGFycmF5ID8gYXNzb2NHZXQoYXJyYXksIGtleSkgOiBkYXRhLm1hcC5nZXQoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0dldDtcbiIsInZhciBhc3NvY0hhcyA9IHJlcXVpcmUoJy4vX2Fzc29jSGFzJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgYXJyYXkgPSBkYXRhLmFycmF5O1xuXG4gIHJldHVybiBhcnJheSA/IGFzc29jSGFzKGFycmF5LCBrZXkpIDogZGF0YS5tYXAuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tIYXM7XG4iLCJ2YXIgTWFwQ2FjaGUgPSByZXF1aXJlKCcuL19NYXBDYWNoZScpLFxuICAgIGFzc29jU2V0ID0gcmVxdWlyZSgnLi9fYXNzb2NTZXQnKTtcblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBhcnJheSA9IGRhdGEuYXJyYXk7XG5cbiAgaWYgKGFycmF5KSB7XG4gICAgaWYgKGFycmF5Lmxlbmd0aCA8IChMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIGFzc29jU2V0KGFycmF5LCBrZXksIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5hcnJheSA9IG51bGw7XG4gICAgICBkYXRhLm1hcCA9IG5ldyBNYXBDYWNoZShhcnJheSk7XG4gICAgfVxuICB9XG4gIHZhciBtYXAgPSBkYXRhLm1hcDtcbiAgaWYgKG1hcCkge1xuICAgIG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tTZXQ7XG4iLCJ2YXIgbWVtb2l6ZSA9IHJlcXVpcmUoJy4vbWVtb2l6ZScpLFxuICAgIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplKGZ1bmN0aW9uKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHRvU3RyaW5nKHN0cmluZykucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ1RvUGF0aDtcbiIsIi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1NvdXJjZTtcbiIsInZhciBhc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Fzc2lnblZhbHVlJyksXG4gICAgY29weU9iamVjdCA9IHJlcXVpcmUoJy4vX2NvcHlPYmplY3QnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUFzc2lnbmVyJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqIERldGVjdCBpZiBwcm9wZXJ0aWVzIHNoYWRvd2luZyB0aG9zZSBvbiBgT2JqZWN0LnByb3RvdHlwZWAgYXJlIG5vbi1lbnVtZXJhYmxlLiAqL1xudmFyIG5vbkVudW1TaGFkb3dzID0gIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAndmFsdWVPZic6IDEgfSwgJ3ZhbHVlT2YnKTtcblxuLyoqXG4gKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIHRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gKiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAgYW5kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgT2JqZWN0LmFzc2lnbmBdKGh0dHBzOi8vbWRuLmlvL09iamVjdC9hc3NpZ24pLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5jID0gMztcbiAqIH1cbiAqXG4gKiBmdW5jdGlvbiBCYXIoKSB7XG4gKiAgIHRoaXMuZSA9IDU7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5kID0gNDtcbiAqIEJhci5wcm90b3R5cGUuZiA9IDY7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbywgbmV3IEJhcik7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2MnOiAzLCAnZSc6IDUgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgaWYgKG5vbkVudW1TaGFkb3dzIHx8IGlzUHJvdG90eXBlKHNvdXJjZSkgfHwgaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYHZhbHVlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogdmFyIGdldHRlciA9IF8uY29uc3RhbnQob2JqZWN0KTtcbiAqXG4gKiBnZXR0ZXIoKSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnN0YW50O1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqIHZhciBvdGhlciA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxO1xuIiwidmFyIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi9fYmFzZUZsYXR0ZW4nKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBSZWN1cnNpdmVseSBmbGF0dGVucyBgYXJyYXlgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZmxhdHRlbkRlZXAoWzEsIFsyLCBbMywgWzRdXSwgNV1dKTtcbiAqIC8vID0+IFsxLCAyLCAzLCA0LCA1XVxuICovXG5mdW5jdGlvbiBmbGF0dGVuRGVlcChhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICByZXR1cm4gbGVuZ3RoID8gYmFzZUZsYXR0ZW4oYXJyYXksIElORklOSVRZKSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW5EZWVwO1xuIiwidmFyIGJhc2VHZXQgPSByZXF1aXJlKCcuL19iYXNlR2V0Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLiBJZiB0aGUgcmVzb2x2ZWQgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgLCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjcuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGZvciBgdW5kZWZpbmVkYCByZXNvbHZlZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldDtcbiIsInZhciBpc0FycmF5TGlrZU9iamVjdCA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2VPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBpbmNvcnJlY3RseSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsInZhciBnZXRMZW5ndGggPSByZXF1aXJlKCcuL19nZXRMZW5ndGgnKSxcbiAgICBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcbiIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2VPYmplY3Q7XG4iLCJ2YXIgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBib29sZWFuIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQm9vbGVhbihmYWxzZSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Jvb2xlYW4obnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZSB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGJvb2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQm9vbGVhbjtcbiIsInZhciBjb25zdGFudCA9IHJlcXVpcmUoJy4vY29uc3RhbnQnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlcm1pbmUgaWYgdmFsdWVzIGFyZSBvZiB0aGUgbGFuZ3VhZ2UgdHlwZSBgT2JqZWN0YC4gKi9cbnZhciBvYmplY3RUeXBlcyA9IHtcbiAgJ2Z1bmN0aW9uJzogdHJ1ZSxcbiAgJ29iamVjdCc6IHRydWVcbn07XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSAob2JqZWN0VHlwZXNbdHlwZW9mIGV4cG9ydHNdICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUpXG4gID8gZXhwb3J0c1xuICA6IHVuZGVmaW5lZDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSAob2JqZWN0VHlwZXNbdHlwZW9mIG1vZHVsZV0gJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUpXG4gID8gbW9kdWxlXG4gIDogdW5kZWZpbmVkO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSAoZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzKVxuICA/IGZyZWVFeHBvcnRzXG4gIDogdW5kZWZpbmVkO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9ICFCdWZmZXIgPyBjb25zdGFudChmYWxzZSkgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBCdWZmZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQnVmZmVyO1xuIiwidmFyIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKSxcbiAgICBpc1N0cmluZyA9IHJlcXVpcmUoJy4vaXNTdHJpbmcnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqIERldGVjdCBpZiBwcm9wZXJ0aWVzIHNoYWRvd2luZyB0aG9zZSBvbiBgT2JqZWN0LnByb3RvdHlwZWAgYXJlIG5vbi1lbnVtZXJhYmxlLiAqL1xudmFyIG5vbkVudW1TaGFkb3dzID0gIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAndmFsdWVPZic6IDEgfSwgJ3ZhbHVlT2YnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhbiBlbXB0eSBvYmplY3QsIGNvbGxlY3Rpb24sIG1hcCwgb3Igc2V0LlxuICpcbiAqIE9iamVjdHMgYXJlIGNvbnNpZGVyZWQgZW1wdHkgaWYgdGhleSBoYXZlIG5vIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZFxuICogcHJvcGVydGllcy5cbiAqXG4gKiBBcnJheS1saWtlIHZhbHVlcyBzdWNoIGFzIGBhcmd1bWVudHNgIG9iamVjdHMsIGFycmF5cywgYnVmZmVycywgc3RyaW5ncywgb3JcbiAqIGpRdWVyeS1saWtlIGNvbGxlY3Rpb25zIGFyZSBjb25zaWRlcmVkIGVtcHR5IGlmIHRoZXkgaGF2ZSBhIGBsZW5ndGhgIG9mIGAwYC5cbiAqIFNpbWlsYXJseSwgbWFwcyBhbmQgc2V0cyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgYSBgc2l6ZWAgb2YgYDBgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGVtcHR5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNFbXB0eShudWxsKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRW1wdHkodHJ1ZSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0VtcHR5KDEpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFbXB0eShbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzRW1wdHkoeyAnYSc6IDEgfSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmIChpc0FycmF5TGlrZSh2YWx1ZSkgJiZcbiAgICAgIChpc0FycmF5KHZhbHVlKSB8fCBpc1N0cmluZyh2YWx1ZSkgfHwgaXNGdW5jdGlvbih2YWx1ZS5zcGxpY2UpIHx8XG4gICAgICAgIGlzQXJndW1lbnRzKHZhbHVlKSB8fCBpc0J1ZmZlcih2YWx1ZSkpKSB7XG4gICAgcmV0dXJuICF2YWx1ZS5sZW5ndGg7XG4gIH1cbiAgaWYgKGlzT2JqZWN0TGlrZSh2YWx1ZSkpIHtcbiAgICB2YXIgdGFnID0gZ2V0VGFnKHZhbHVlKTtcbiAgICBpZiAodGFnID09IG1hcFRhZyB8fCB0YWcgPT0gc2V0VGFnKSB7XG4gICAgICByZXR1cm4gIXZhbHVlLnNpemU7XG4gICAgfVxuICB9XG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiAhKG5vbkVudW1TaGFkb3dzICYmIGtleXModmFsdWUpLmxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFbXB0eTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIHdlYWsgbWFwIGNvbnN0cnVjdG9ycyxcbiAgLy8gYW5kIFBoYW50b21KUyAxLjkgd2hpY2ggcmV0dXJucyAnZnVuY3Rpb24nIGZvciBgTm9kZUxpc3RgIGluc3RhbmNlcy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc0hvc3RPYmplY3QgPSByZXF1aXJlKCcuL19pc0hvc3RPYmplY3QnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICB0b1NvdXJjZSA9IHJlcXVpcmUoJy4vX3RvU291cmNlJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwidmFyIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBOdW1iZXJgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogKipOb3RlOioqIFRvIGV4Y2x1ZGUgYEluZmluaXR5YCwgYC1JbmZpbml0eWAsIGFuZCBgTmFOYCwgd2hpY2ggYXJlXG4gKiBjbGFzc2lmaWVkIGFzIG51bWJlcnMsIHVzZSB0aGUgYF8uaXNGaW5pdGVgIG1ldGhvZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOdW1iZXIoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTnVtYmVyKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gbnVtYmVyVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc051bWJlcjtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGdldFByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2dldFByb3RvdHlwZScpLFxuICAgIGlzSG9zdE9iamVjdCA9IHJlcXVpcmUoJy4vX2lzSG9zdE9iamVjdCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fFxuICAgICAgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgIT0gb2JqZWN0VGFnIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmXG4gICAgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQbGFpbk9iamVjdDtcbiIsInZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN0cmluZ2AgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTdHJpbmcoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTdHJpbmcoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8XG4gICAgKCFpc0FycmF5KHZhbHVlKSAmJiBpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN0cmluZ1RhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTdHJpbmc7XG4iLCJ2YXIgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltYm9sO1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCJ2YXIgYmFzZUhhcyA9IHJlcXVpcmUoJy4vX2Jhc2VIYXMnKSxcbiAgICBiYXNlS2V5cyA9IHJlcXVpcmUoJy4vX2Jhc2VLZXlzJyksXG4gICAgaW5kZXhLZXlzID0gcmVxdWlyZSgnLi9faW5kZXhLZXlzJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpO1xuICBpZiAoIShpc1Byb3RvIHx8IGlzQXJyYXlMaWtlKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIGJhc2VLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIGluZGV4ZXMgPSBpbmRleEtleXMob2JqZWN0KSxcbiAgICAgIHNraXBJbmRleGVzID0gISFpbmRleGVzLFxuICAgICAgcmVzdWx0ID0gaW5kZXhlcyB8fCBbXSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChiYXNlSGFzKG9iamVjdCwga2V5KSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSAmJlxuICAgICAgICAhKGlzUHJvdG8gJiYga2V5ID09ICdjb25zdHJ1Y3RvcicpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCJ2YXIgYmFzZUtleXNJbiA9IHJlcXVpcmUoJy4vX2Jhc2VLZXlzSW4nKSxcbiAgICBpbmRleEtleXMgPSByZXF1aXJlKCcuL19pbmRleEtleXMnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzUHJvdG90eXBlID0gcmVxdWlyZSgnLi9faXNQcm90b3R5cGUnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHByb3BzID0gYmFzZUtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBpbmRleGVzID0gaW5kZXhLZXlzKG9iamVjdCksXG4gICAgICBza2lwSW5kZXhlcyA9ICEhaW5kZXhlcyxcbiAgICAgIHJlc3VsdCA9IGluZGV4ZXMgfHwgW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcbiIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyk7XG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXppbmcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gKlxuICogdmFyIHZhbHVlcyA9IF8ubWVtb2l6ZShfLnZhbHVlcyk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIHZhbHVlcyhvdGhlcik7XG4gKiAvLyA9PiBbMywgNF1cbiAqXG4gKiBvYmplY3QuYSA9IDI7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICogdmFsdWVzLmNhY2hlLnNldChvYmplY3QsIFsnYScsICdiJ10pO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKlxuICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBBc3NpZ24gY2FjaGUgdG8gYF8ubWVtb2l6ZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZTtcbiIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuL19iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25gIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gYW5kXG4gKiBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0cyBpbnRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2UgcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgYXJlXG4gKiBza2lwcGVkIGlmIGEgZGVzdGluYXRpb24gdmFsdWUgZXhpc3RzLiBBcnJheSBhbmQgcGxhaW4gb2JqZWN0IHByb3BlcnRpZXNcbiAqIGFyZSBtZXJnZWQgcmVjdXJzaXZlbHkuT3RoZXIgb2JqZWN0cyBhbmQgdmFsdWUgdHlwZXMgYXJlIG92ZXJyaWRkZW4gYnlcbiAqIGFzc2lnbm1lbnQuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC4gU3Vic2VxdWVudFxuICogc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IHtcbiAqICAgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ3VzZXInOiAnZnJlZCcgfV1cbiAqIH07XG4gKlxuICogdmFyIGFnZXMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ2FnZSc6IDM2IH0sIHsgJ2FnZSc6IDQwIH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2UodXNlcnMsIGFnZXMpO1xuICogLy8gPT4geyAnZGF0YSc6IFt7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfV0gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihmdW5jdGlvbihvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpIHtcbiAgYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcbiIsInZhciBhcHBseSA9IHJlcXVpcmUoJy4vX2FwcGx5JyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKTtcblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGVcbiAqIGNyZWF0ZWQgZnVuY3Rpb24gYW5kIGFyZ3VtZW50cyBmcm9tIGBzdGFydGAgYW5kIGJleW9uZCBwcm92aWRlZCBhc1xuICogYW4gYXJyYXkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uIHRoZVxuICogW3Jlc3QgcGFyYW1ldGVyXShodHRwczovL21kbi5pby9yZXN0X3BhcmFtZXRlcnMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgc2F5ID0gXy5yZXN0KGZ1bmN0aW9uKHdoYXQsIG5hbWVzKSB7XG4gKiAgIHJldHVybiB3aGF0ICsgJyAnICsgXy5pbml0aWFsKG5hbWVzKS5qb2luKCcsICcpICtcbiAqICAgICAoXy5zaXplKG5hbWVzKSA+IDEgPyAnLCAmICcgOiAnJykgKyBfLmxhc3QobmFtZXMpO1xuICogfSk7XG4gKlxuICogc2F5KCdoZWxsbycsICdmcmVkJywgJ2Jhcm5leScsICdwZWJibGVzJyk7XG4gKiAvLyA9PiAnaGVsbG8gZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnXG4gKi9cbmZ1bmN0aW9uIHJlc3QoZnVuYywgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogdG9JbnRlZ2VyKHN0YXJ0KSwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgc3dpdGNoIChzdGFydCkge1xuICAgICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFycmF5KTtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcnJheSk7XG4gICAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJnc1swXSwgYXJnc1sxXSwgYXJyYXkpO1xuICAgIH1cbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICBpbmRleCA9IC0xO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3Q7XG4iLCJ2YXIgdG9OdW1iZXIgPSByZXF1aXJlKCcuL3RvTnVtYmVyJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwODtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0ludGVnZXJgXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9pbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBpbnRlZ2VyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvSW50ZWdlcigzKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLnRvSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDBcbiAqXG4gKiBfLnRvSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICpcbiAqIF8udG9JbnRlZ2VyKCczJyk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiAwO1xuICB9XG4gIHZhbHVlID0gdG9OdW1iZXIodmFsdWUpO1xuICBpZiAodmFsdWUgPT09IElORklOSVRZIHx8IHZhbHVlID09PSAtSU5GSU5JVFkpIHtcbiAgICB2YXIgc2lnbiA9ICh2YWx1ZSA8IDAgPyAtMSA6IDEpO1xuICAgIHJldHVybiBzaWduICogTUFYX0lOVEVHRVI7XG4gIH1cbiAgdmFyIHJlbWFpbmRlciA9IHZhbHVlICUgMTtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IChyZW1haW5kZXIgPyB2YWx1ZSAtIHJlbWFpbmRlciA6IHZhbHVlKSA6IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9JbnRlZ2VyO1xuIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMpO1xuICogLy8gPT4gM1xuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMycpO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSBpc0Z1bmN0aW9uKHZhbHVlLnZhbHVlT2YpID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b051bWJlcjtcbiIsInZhciBjb3B5T2JqZWN0ID0gcmVxdWlyZSgnLi9fY29weU9iamVjdCcpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4va2V5c0luJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZ1xuICoga2V5ZWQgcHJvcGVydGllcyBvZiBgdmFsdWVgIHRvIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBwbGFpbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1BsYWluT2JqZWN0O1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1N0cmluZztcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9tZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC9tZXJnZScpO1xuXG52YXIgX21lcmdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lcmdlKTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpOyB9IH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9O1xuXG52YXIgX2NvcHlQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vdXRpbHMvY29weVByb3BlcnRpZXMnKTtcblxudmFyIF9jb3B5UHJvcGVydGllczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb3B5UHJvcGVydGllcyk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBjb250ZXh0VHlwZSA9IHsgX2xvb2tDb25maWc6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0IH07XG4vKipcbiAqIFdyYXBwZXIgdGhhdCBtYXBzIHlvdXIgc3R5bGVzIHRvIGEgUmVhY3QgQ29tcG9uZW50XG4gKiBAcGFyYW0ge09iamVjdH0gQ3VzdG9tQ29tcG9uZW50IC0gYSB2YWxpZCBSZWFjdCBDb21wb25lbnQgdGhhdCBnZXRzIHN0eWxlcyBhcHBsaWVkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gYWRkaXRpb25hbCBwcm9jZXNzb3JzIHRoYXQgbW9kaWZ5IHRoZSBzdHlsZXNcbiAqL1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ3VzdG9tQ29tcG9uZW50KSB7XG4gIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICAvLyBFbmhhbmNpbmcgc3RhdGVsZXNzIGZ1bmN0aW9uYWwgQ29tcG9uZW50c1xuICAvLyBEZXBlbmRpbmcgb24gYXZhaWxhYmlsaXR5IG9mIHNldFN0YXRlXG4gIGlmICghQ3VzdG9tQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSkge1xuICAgIHZhciBMb29rU3RhdGVsZXNzID0gZnVuY3Rpb24gTG9va1N0YXRlbGVzcyhwcm9wcywgY29udGV4dCkge1xuICAgICAgdmFyIHJlbmRlcmVkRWxlbWVudCA9IEN1c3RvbUNvbXBvbmVudChwcm9wcywgY29udGV4dCk7XG4gICAgICB2YXIgY29udGV4dENvbmZpZyA9IGNvbnRleHQuX2xvb2tDb25maWcgfHwgbnVsbDtcbiAgICAgIHZhciBlbGVtZW50Q29uZmlnID0gcmVuZGVyZWRFbGVtZW50LnByb3BzLmxvb2tDb25maWcgfHwgbnVsbDtcbiAgICAgIC8vIENvbXBvc2UgYWxsIHBvc3NpYmxlIHdheXMgdG8gY29uZmlndXJlIExvb2tcbiAgICAgIHZhciBjb21wb3NlZENvbmZpZyA9ICgwLCBfbWVyZ2UyLmRlZmF1bHQpKHt9LCBjb250ZXh0Q29uZmlnLCBjb25maWcsIGVsZW1lbnRDb25maWcpO1xuICAgICAgLy8gTW9ja2luZyB0aGUgQ29tcG9uZW50IHRvIHVzZSB0aGUgc2FtZSBjb25zaXN0ZW50IGludGVyZmFjZVxuICAgICAgLy8gZm9yIGFsbCBwbHVnaW5zLCBtaXhpbnMgYW5kIHRvIGltcHJvdmUgZGV2ZWxvcGVyIGV4cGVyaWVuY2VcbiAgICAgIHZhciBDb21wb25lbnQgPSB7IHByb3BzOiBwcm9wcywgY29udGV4dDogY29udGV4dCB9O1xuICAgICAgLy8gUGFzc2luZyB0aGUgZGlzcGxheU5hbWUgdG8gaW1wcm92ZSBkZXZlbG9wZXIgZXhwZXJpZW5jZVxuICAgICAgQ29tcG9uZW50LmNvbnN0cnVjdG9yID0ge1xuICAgICAgICBkaXNwbGF5TmFtZTogQ3VzdG9tQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCdcbiAgICAgIH07XG4gICAgICByZXR1cm4gY29udGV4dC5fbG9va0NvbmZpZy5fcmVzb2x2ZVN0eWxlcyhDb21wb25lbnQsIHJlbmRlcmVkRWxlbWVudCwgY29tcG9zZWRDb25maWcpO1xuICAgIH07XG4gICAgLy8gUGFzc2luZyBjb250ZXh0VHlwZXMgdG8gYmUgYWJsZSB0byByZWZlcmVuY2UgY29udGV4dFxuICAgIExvb2tTdGF0ZWxlc3MuY29udGV4dFR5cGVzID0gKDAsIF9tZXJnZTIuZGVmYXVsdCkoe30sIEN1c3RvbUNvbXBvbmVudC5jb250ZXh0VHlwZXMsIGNvbnRleHRUeXBlKTtcbiAgICBMb29rU3RhdGVsZXNzLmNoaWxkQ29udGV4dFR5cGVzID0gKDAsIF9tZXJnZTIuZGVmYXVsdCkoe30sIEN1c3RvbUNvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcywgY29udGV4dFR5cGUpO1xuXG4gICAgLy8gRmxhZyBhcyBMb29rLWVuaGFuY2VkIENvbXBvbmVudFxuICAgIExvb2tTdGF0ZWxlc3MuX2lzTG9va0VuaGFuY2VkID0gdHJ1ZTtcbiAgICByZXR1cm4gTG9va1N0YXRlbGVzcztcbiAgfVxuXG4gIC8vIEVuaGFuY2luZyBFUzIwMTUgY2xhc3Nlc1xuICAvLyBUaGlzIHdpbGwgbGV0IHlvdSB1c2Ugc3RhdGUgYW5kIGRvIHNvbWUgcmVuZGVyIG9wdGltaXphdGlvbnNcblxuICB2YXIgTG9va0NvbXBvbmVudCA9IGZ1bmN0aW9uIChfQ3VzdG9tQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKExvb2tDb21wb25lbnQsIF9DdXN0b21Db21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gTG9va0NvbXBvbmVudCgpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMb29rQ29tcG9uZW50KTtcblxuICAgICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihMb29rQ29tcG9uZW50KS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICAvLyBJbmhlcml0IHRoZSBvcmlnaW5hbCBkaXNwbGF5TmFtZSBmb3IgcHJvcGVyIHVzZSBsYXRlciBvblxuXG5cbiAgICBfY3JlYXRlQ2xhc3MoTG9va0NvbXBvbmVudCwgW3tcbiAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgcmVuZGVyZWRFbGVtZW50ID0gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoTG9va0NvbXBvbmVudC5wcm90b3R5cGUpLCAncmVuZGVyJywgdGhpcykuY2FsbCh0aGlzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICB2YXIgY29udGV4dENvbmZpZyA9IHRoaXMuY29udGV4dC5fbG9va0NvbmZpZyB8fCBudWxsO1xuICAgICAgICB2YXIgZWxlbWVudENvbmZpZyA9IHJlbmRlcmVkRWxlbWVudC5wcm9wcy5sb29rQ29uZmlnIHx8IG51bGw7XG4gICAgICAgIC8vIENvbXBvc2UgYWxsIHBvc3NpYmxlIHdheXMgdG8gY29uZmlndXJlIExvb2tcbiAgICAgICAgdmFyIGNvbXBvc2VkQ29uZmlnID0gKDAsIF9tZXJnZTIuZGVmYXVsdCkoe30sIGNvbnRleHRDb25maWcsIGNvbmZpZywgZWxlbWVudENvbmZpZyk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuX2xvb2tDb25maWcuX3Jlc29sdmVTdHlsZXModGhpcywgcmVuZGVyZWRFbGVtZW50LCBjb21wb3NlZENvbmZpZyk7XG4gICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIExvb2tDb21wb25lbnQ7XG4gIH0oQ3VzdG9tQ29tcG9uZW50KTtcblxuICAvLyBjb3B5IHByb3BzIGluIG9yZGVyIHRvIGdldCBobXIgd29ya2luZyBjb3JyZWN0bHlcblxuXG4gIExvb2tDb21wb25lbnQuZGlzcGxheU5hbWUgPSBDdXN0b21Db21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ3VzdG9tQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG4gIExvb2tDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXMgPSBfZXh0ZW5kcyh7fSwgQ3VzdG9tQ29tcG9uZW50LmNoaWxkQ29udGV4dFR5cGVzLCBjb250ZXh0VHlwZSk7XG4gIExvb2tDb21wb25lbnQuY29udGV4dFR5cGVzID0gX2V4dGVuZHMoe30sIEN1c3RvbUNvbXBvbmVudC5jb250ZXh0VHlwZXMsIGNvbnRleHRUeXBlKTtcbiAgTG9va0NvbXBvbmVudC5faXNMb29rRW5oYW5jZWQgPSB0cnVlO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICgwLCBfY29weVByb3BlcnRpZXMyLmRlZmF1bHQpKEN1c3RvbUNvbXBvbmVudC5wcm90b3R5cGUsIExvb2tDb21wb25lbnQucHJvdG90eXBlKTtcbiAgfVxuXG4gIHJldHVybiBMb29rQ29tcG9uZW50O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2ZsYXR0ZW5EZWVwID0gcmVxdWlyZSgnbG9kYXNoL2ZsYXR0ZW5EZWVwJyk7XG5cbnZhciBfZmxhdHRlbkRlZXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmxhdHRlbkRlZXApO1xuXG52YXIgX2lzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2gvaXNBcnJheScpO1xuXG52YXIgX2lzQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBcnJheSk7XG5cbnZhciBfaXNOdW1iZXIgPSByZXF1aXJlKCdsb2Rhc2gvaXNOdW1iZXInKTtcblxudmFyIF9pc051bWJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc051bWJlcik7XG5cbnZhciBfaXNTdHJpbmcgPSByZXF1aXJlKCdsb2Rhc2gvaXNTdHJpbmcnKTtcblxudmFyIF9pc1N0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1N0cmluZyk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMucmVzb2x2ZVBsdWdpbnMgPSByZXNvbHZlUGx1Z2lucztcbmV4cG9ydHMuaXNMb29rRW5oYW5jZWQgPSBpc0xvb2tFbmhhbmNlZDtcbmV4cG9ydHMucmVzb2x2ZUNoaWxkcmVuID0gcmVzb2x2ZUNoaWxkcmVuO1xuZXhwb3J0cy5yZXNvbHZlUHJvcHMgPSByZXNvbHZlUHJvcHM7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIFJlc29sdmVzIGFsbCBwbHVnaW5zIHByb3ZpZGVkIGJ5IHRoZSBjb25maWd1cmF0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luSW50ZXJmYWNlIC0gaW50ZXJmYWNlIGNvbnRhaW5pbmcgYWxsIGNvbmZpZ3VyYXRpb25zIHRvIHJlc29sdmVcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVBsdWdpbnMocGx1Z2luSW50ZXJmYWNlKSB7XG4gIHZhciBmb3JjZU1vZGVQb3NzaWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXJndW1lbnRzWzFdO1xuICB2YXIgc3R5bGVzID0gcGx1Z2luSW50ZXJmYWNlLnN0eWxlcztcbiAgdmFyIGNvbmZpZyA9IHBsdWdpbkludGVyZmFjZS5jb25maWc7XG5cbiAgLy8gVHJpZ2dlcnMgcGx1Z2luIHJlc29sdmluZ1xuICAvLyBVc2VzIHRoZSBleGFjdCBwbHVnaW4gbGluZXVwIGRlZmluZWQgd2l0aGluIENvbmZpZ1xuXG4gIGNvbmZpZy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xuICAgIC8vIElmIHRoZSBwbHVnaW4gaXMgYSBmdW5jdGlvbiBpdCBnZXRzIGNhbGxlZCB3aGVuIHRoZXJlIGFyZSBkeW5hbWljIHN0eWxlcyB0byByZXNvbHZlXG4gICAgaWYgKGZvcmNlTW9kZVBvc3NpYmxlICE9PSB0cnVlIHx8IHBsdWdpbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBpZiAocGx1Z2luSW50ZXJmYWNlLmR5bmFtaWNTdHlsZXNOb3ROdWxsID09PSB0cnVlIHx8IGZvcmNlTW9kZVBvc3NpYmxlICE9PSB0cnVlKSB7XG4gICAgICAgIHN0eWxlcyA9IHBsdWdpbihfZXh0ZW5kcyh7fSwgcGx1Z2luSW50ZXJmYWNlLCB7XG4gICAgICAgICAgc3R5bGVzOiBzdHlsZXNcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgcGx1Z2luIGNvdWxkIGFsc28gYmUgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYG1vZGVgIGFuZCBgcGx1Z2luYFxuICAgICAgLy8gRm9yY2UgbW9kZSBjYWxscyB0aGUgcGx1Z2luIGV2ZXJ5IHRpbWUgd2hlbiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZFxuICAgICAgaWYgKHBsdWdpbi5tb2RlID09PSAnZm9yY2UnKSB7XG4gICAgICAgIHN0eWxlcyA9IHBsdWdpbi5wbHVnaW4oX2V4dGVuZHMoe30sIHBsdWdpbkludGVyZmFjZSwge1xuICAgICAgICAgIHN0eWxlczogc3R5bGVzXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gRGVmYXVsdC9mYWxsYmFjayBtb2RlOiBTYW1lIGFzIGlmIHRoZSBwbHVnaW4gd291bGQgYmUgYSBmdW5jdGlvblxuICAgICAgaWYgKHBsdWdpbkludGVyZmFjZS5keW5hbWljU3R5bGVzTm90TnVsbCkge1xuICAgICAgICBzdHlsZXMgPSBwbHVnaW4ucGx1Z2luKF9leHRlbmRzKHt9LCBwbHVnaW5JbnRlcmZhY2UsIHtcbiAgICAgICAgICBzdHlsZXM6IHN0eWxlc1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc3R5bGVzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGdpdmVuIGVsZW1lbnQgaXMgYSBsb29rLWVuaGFuY2VkIENvbXBvbmVudCBpdHNlbGZcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0gUmVhY3QgZWxlbWVudCB0byBiZSB2YWxpZGF0ZWRcbiAqL1xuZnVuY3Rpb24gaXNMb29rRW5oYW5jZWQoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudC5faXNMb29rRW5oYW5jZWQgfHwgZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5faXNMb29rRW5oYW5jZWQgPyB0cnVlIDogZmFsc2U7XG59XG5cbi8qKlxuICogUmVzb2x2ZXMgcHJvdmlkZWQgc3R5bGVzIGZvciBhbiBlbGVtZW50cyBjaGlsZHJlblxuICogQHBhcmFtIHtPYmplY3R9IENvbXBvbmVudCAtIHdyYXBwaW5nIFJlYWN0IENvbXBvbmVudCBwcm92aWRpbmcgbG9va3MgYW5kIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ3xudW1iZXJ9IGNoaWxkcmVuIC0gY2hpbGRyZW4gdGhhdCBnZXQgcmVzb2x2ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBjb25maWd1cmF0aW9uIGNvbnRhaW5pbmcgcGx1Z2lucyBhbmQgcGx1Z2luLXNwZWNpZmljIGNvbmZpZ3NcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZUNoaWxkcmVuKENvbXBvbmVudCwgbmV3UHJvcHMsIGNvbmZpZykge1xuICBpZiAobmV3UHJvcHMuY2hpbGRyZW4pIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBuZXdQcm9wcy5jaGlsZHJlbjtcbiAgICAvLyBkaXJlY3RseSByZXR1cm4gcHJpbWl0aXZlIGNoaWxkcmVuXG5cbiAgICBpZiAoKDAsIF9pc1N0cmluZzIuZGVmYXVsdCkoY2hpbGRyZW4pIHx8ICgwLCBfaXNOdW1iZXIyLmRlZmF1bHQpKGNoaWxkcmVuKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGlsZHJlbi50eXBlKSB7XG4gICAgICBuZXdQcm9wcy5jaGlsZHJlbiA9IGNvbmZpZy5fcmVzb2x2ZVN0eWxlcyhDb21wb25lbnQsIGNoaWxkcmVuLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlIGFyZSBtb3JlIHRoYW4gb25lIGNoaWxkLCBpdGVyYXRlIG92ZXIgdGhlbVxuICAgIGlmICgoMCwgX2lzQXJyYXkyLmRlZmF1bHQpKGNoaWxkcmVuKSkge1xuICAgICAgLy8gZmxhdHRlbmluZyBjaGlsZHJlbiBwcmV2ZW50cyBkZWVwZXIgbmVzdGVkIGNoaWxkcmVuXG4gICAgICB2YXIgZmxhdENoaWxkcmVuID0gKDAsIF9mbGF0dGVuRGVlcDIuZGVmYXVsdCkoY2hpbGRyZW4pO1xuXG4gICAgICAvLyByZWN1cnNpdmVseSByZXNvbHZlIHN0eWxlcyBmb3IgY2hpbGQgZWxlbWVudHMgaWYgaXQgaXMgYSB2YWxpZCBSZWFjdCBDb21wb25lbnRcbiAgICAgIG5ld1Byb3BzLmNoaWxkcmVuID0gX3JlYWN0LkNoaWxkcmVuLm1hcChmbGF0Q2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICBpZiAoKDAsIF9yZWFjdC5pc1ZhbGlkRWxlbWVudCkoY2hpbGQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZy5fcmVzb2x2ZVN0eWxlcyhDb21wb25lbnQsIGNoaWxkLCBjb25maWcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGlsZDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuKiBSZXNvbHZlcyBDb21wb25lbnRzIHBhc3NlZCBhcyBhIHByb3BlcnR5XG4qIEBwYXJhbSB7T2JqZWN0fSBDb21wb25lbnQgLSB3cmFwcGluZyBSZWFjdCBDb21wb25lbnQgcHJvdmlkaW5nIGxvb2tzIGFuZCBlbGVtZW50c1xuKiBAcGFyYW0ge09iamVjdH0gbmV3UHJvcHMgLSBlbGVtZW50J3MgcHJvcGVydGllcyB0byBpdGVyYXRlXG4qIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBjb25maWd1cmF0aW9uIGNvbnRhaW5pbmcgcGx1Z2lucyBhbmQgcGx1Z2luLXNwZWNpZmljIGNvbmZpZ3NcbiovXG5mdW5jdGlvbiByZXNvbHZlUHJvcHMoQ29tcG9uZW50LCBuZXdQcm9wcywgY29uZmlnKSB7XG4gIE9iamVjdC5rZXlzKG5ld1Byb3BzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIGlmIChwcm9wZXJ0eSA9PT0gJ2NoaWxkcmVuJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFJlc29sdmluZyBzdHlsZXMgZm9yIGVsZW1lbnRzIHBhc3NlZCBieSBwcm9wc1xuICAgIC8vIFNraXAgY2hpbGRyZW4gYXMgdGhleSd2ZSBiZWVuIHJlc29sdmVkIGFscmVhZHlcbiAgICB2YXIgcHJvcEVsZW1lbnQgPSBuZXdQcm9wc1twcm9wZXJ0eV07XG4gICAgaWYgKCgwLCBfcmVhY3QuaXNWYWxpZEVsZW1lbnQpKHByb3BFbGVtZW50KSkge1xuICAgICAgbmV3UHJvcHNbcHJvcGVydHldID0gY29uZmlnLl9yZXNvbHZlU3R5bGVzKENvbXBvbmVudCwgcHJvcEVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICBuZXdQcm9wcy5fbG9va1Nob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgfVxuICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZW5oYW5jZXIgPSByZXF1aXJlKCcuL2NvcmUvZW5oYW5jZXInKTtcblxudmFyIF9lbmhhbmNlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9lbmhhbmNlcik7XG5cbnZhciBfcmVzb2x2ZXIgPSByZXF1aXJlKCcuL2NvcmUvcmVzb2x2ZXInKTtcblxudmFyIHJlc29sdmVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3Jlc29sdmVyKTtcblxudmFyIF9jb25kaXRpb24gPSByZXF1aXJlKCcuL21peGlucy9jb25kaXRpb24nKTtcblxudmFyIF9jb25kaXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZGl0aW9uKTtcblxudmFyIF9jb250YWlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL2NvbnRhaW5zJyk7XG5cbnZhciBfY29udGFpbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29udGFpbnMpO1xuXG52YXIgX2V4dGVuZCA9IHJlcXVpcmUoJy4vbWl4aW5zL2V4dGVuZCcpO1xuXG52YXIgX2V4dGVuZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHRlbmQpO1xuXG52YXIgX21peGluID0gcmVxdWlyZSgnLi9wbHVnaW5zL21peGluJyk7XG5cbnZhciBfbWl4aW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pO1xuXG52YXIgX3N0YXRlZnVsVmFsdWUgPSByZXF1aXJlKCcuL3BsdWdpbnMvc3RhdGVmdWxWYWx1ZScpO1xuXG52YXIgX3N0YXRlZnVsVmFsdWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RhdGVmdWxWYWx1ZSk7XG5cbnZhciBfc3RhdGVmdWxTZWxlY3RvciA9IHJlcXVpcmUoJy4vcGx1Z2lucy9zdGF0ZWZ1bFNlbGVjdG9yJyk7XG5cbnZhciBfc3RhdGVmdWxTZWxlY3RvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdGF0ZWZ1bFNlbGVjdG9yKTtcblxudmFyIF9zdHlsZUxvZ2dlciA9IHJlcXVpcmUoJy4vcGx1Z2lucy9zdHlsZUxvZ2dlcicpO1xuXG52YXIgX3N0eWxlTG9nZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlTG9nZ2VyKTtcblxudmFyIF9jb3B5UHJvcGVydGllcyA9IHJlcXVpcmUoJy4vdXRpbHMvY29weVByb3BlcnRpZXMnKTtcblxudmFyIF9jb3B5UHJvcGVydGllczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb3B5UHJvcGVydGllcyk7XG5cbnZhciBfZ2V0Q2hpbGRUeXBlID0gcmVxdWlyZSgnLi91dGlscy9nZXRDaGlsZFR5cGUnKTtcblxudmFyIF9nZXRDaGlsZFR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0Q2hpbGRUeXBlKTtcblxudmFyIF9nZXRQc2V1ZG9FeHByZXNzaW9uID0gcmVxdWlyZSgnLi91dGlscy9nZXRQc2V1ZG9FeHByZXNzaW9uJyk7XG5cbnZhciBfZ2V0UHNldWRvRXhwcmVzc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRQc2V1ZG9FeHByZXNzaW9uKTtcblxudmFyIF9zb3J0T2JqZWN0ID0gcmVxdWlyZSgnLi91dGlscy9zb3J0T2JqZWN0Jyk7XG5cbnZhciBfc29ydE9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zb3J0T2JqZWN0KTtcblxudmFyIF9zcGxpdENvbmRpdGlvbiA9IHJlcXVpcmUoJy4vdXRpbHMvc3BsaXRDb25kaXRpb24nKTtcblxudmFyIF9zcGxpdENvbmRpdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zcGxpdENvbmRpdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBNaXhpbnMgPSB7XG4gIGNvbmRpdGlvbjogX2NvbmRpdGlvbjIuZGVmYXVsdCxcbiAgY29udGFpbnM6IF9jb250YWluczIuZGVmYXVsdCxcbiAgZXh0ZW5kOiBfZXh0ZW5kMi5kZWZhdWx0XG59O1xuXG52YXIgUGx1Z2lucyA9IHtcbiAgbWl4aW46IF9taXhpbjIuZGVmYXVsdCxcbiAgc3RhdGVmdWxWYWx1ZTogX3N0YXRlZnVsVmFsdWUyLmRlZmF1bHQsXG4gIHN0YXRlZnVsU2VsZWN0b3I6IF9zdGF0ZWZ1bFNlbGVjdG9yMi5kZWZhdWx0LFxuICBzdHlsZUxvZ2dlcjogX3N0eWxlTG9nZ2VyMi5kZWZhdWx0XG59O1xuXG52YXIgVXRpbHMgPSB7XG4gIGNvcHlQcm9wZXJ0aWVzOiBfY29weVByb3BlcnRpZXMyLmRlZmF1bHQsXG4gIGdldENoaWxkVHlwZTogX2dldENoaWxkVHlwZTIuZGVmYXVsdCxcbiAgc29ydE9iamVjdDogX3NvcnRPYmplY3QyLmRlZmF1bHQsXG4gIHNwbGl0Q29uZGl0aW9uOiBfc3BsaXRDb25kaXRpb24yLmRlZmF1bHQsXG4gIGdldFBzZXVkb0V4cHJlc3Npb246IF9nZXRQc2V1ZG9FeHByZXNzaW9uMi5kZWZhdWx0XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGVuaGFuY2VyOiBfZW5oYW5jZXIyLmRlZmF1bHQsXG4gIHJlc29sdmVyOiByZXNvbHZlcixcblxuICBNaXhpbnM6IE1peGlucyxcbiAgUGx1Z2luczogUGx1Z2lucyxcbiAgVXRpbHM6IFV0aWxzXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NwbGl0Q29uZGl0aW9uID0gcmVxdWlyZSgnLi4vdXRpbHMvc3BsaXRDb25kaXRpb24nKTtcblxudmFyIF9zcGxpdENvbmRpdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zcGxpdENvbmRpdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxyXG4gKiBDb25kaXRpb24gbWl4aW5zIGFyZSBzaG9ydGN1dHMgdG8gY2hlY2sgaWYgYSBwcm9wL3N0YXRlIGZ1bGZpbGxzIGEgZ2l2ZW4gZXhwcmVzc2lvblxyXG4gKiBUaGVyZWZvcmUgaXQgdXNlcyBDb21wb25lbnQgd2hpY2ggZ2V0cyBwcm92aWRlZCBhcyBwYXJ0IG9mIGFyZ3VtZW50cyB0byB2YWxpZGF0ZSBwcm9wcy9zdGF0ZVxyXG4gKi9cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgZ3JlYXRlclRoYW46IGZ1bmN0aW9uIGdyZWF0ZXJUaGFuKF9yZWYpIHtcbiAgICB2YXIgcHJvcGVydHkgPSBfcmVmLnByb3BlcnR5O1xuICAgIHZhciB2YWx1ZSA9IF9yZWYudmFsdWU7XG4gICAgdmFyIG1peGluS2V5ID0gX3JlZi5taXhpbktleTtcbiAgICB2YXIgQ29tcG9uZW50ID0gX3JlZi5Db21wb25lbnQ7XG5cbiAgICB2YXIgY29uZGl0aW9uID0gKDAsIF9zcGxpdENvbmRpdGlvbjIuZGVmYXVsdCkocHJvcGVydHksIG1peGluS2V5LCBDb21wb25lbnQpO1xuICAgIHJldHVybiBjb25kaXRpb24gJiYgY29uZGl0aW9uLmxlZnQgPj0gY29uZGl0aW9uLnJpZ2h0ID8gdmFsdWUgOiBmYWxzZTtcbiAgfSxcbiAgbGVzc1RoYW46IGZ1bmN0aW9uIGxlc3NUaGFuKF9yZWYyKSB7XG4gICAgdmFyIHByb3BlcnR5ID0gX3JlZjIucHJvcGVydHk7XG4gICAgdmFyIHZhbHVlID0gX3JlZjIudmFsdWU7XG4gICAgdmFyIG1peGluS2V5ID0gX3JlZjIubWl4aW5LZXk7XG4gICAgdmFyIENvbXBvbmVudCA9IF9yZWYyLkNvbXBvbmVudDtcblxuICAgIHZhciBjb25kaXRpb24gPSAoMCwgX3NwbGl0Q29uZGl0aW9uMi5kZWZhdWx0KShwcm9wZXJ0eSwgbWl4aW5LZXksIENvbXBvbmVudCk7XG4gICAgcmV0dXJuIGNvbmRpdGlvbiAmJiBjb25kaXRpb24ubGVmdCA8PSBjb25kaXRpb24ucmlnaHQgPyB2YWx1ZSA6IGZhbHNlO1xuICB9LFxuICB1bkVxdWFsOiBmdW5jdGlvbiB1bkVxdWFsKF9yZWYzKSB7XG4gICAgdmFyIHByb3BlcnR5ID0gX3JlZjMucHJvcGVydHk7XG4gICAgdmFyIHZhbHVlID0gX3JlZjMudmFsdWU7XG4gICAgdmFyIG1peGluS2V5ID0gX3JlZjMubWl4aW5LZXk7XG4gICAgdmFyIENvbXBvbmVudCA9IF9yZWYzLkNvbXBvbmVudDtcblxuICAgIHZhciBjb25kaXRpb24gPSAoMCwgX3NwbGl0Q29uZGl0aW9uMi5kZWZhdWx0KShwcm9wZXJ0eSwgbWl4aW5LZXksIENvbXBvbmVudCk7XG4gICAgcmV0dXJuIGNvbmRpdGlvbiAmJiBjb25kaXRpb24ubGVmdCAhPSBjb25kaXRpb24ucmlnaHQgPyB2YWx1ZSA6IGZhbHNlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICB9LFxuICBncmVhdGVyOiBmdW5jdGlvbiBncmVhdGVyKF9yZWY0KSB7XG4gICAgdmFyIHByb3BlcnR5ID0gX3JlZjQucHJvcGVydHk7XG4gICAgdmFyIHZhbHVlID0gX3JlZjQudmFsdWU7XG4gICAgdmFyIG1peGluS2V5ID0gX3JlZjQubWl4aW5LZXk7XG4gICAgdmFyIENvbXBvbmVudCA9IF9yZWY0LkNvbXBvbmVudDtcblxuICAgIHZhciBjb25kaXRpb24gPSAoMCwgX3NwbGl0Q29uZGl0aW9uMi5kZWZhdWx0KShwcm9wZXJ0eSwgbWl4aW5LZXksIENvbXBvbmVudCk7XG4gICAgcmV0dXJuIGNvbmRpdGlvbiAmJiBjb25kaXRpb24ubGVmdCA+IGNvbmRpdGlvbi5yaWdodCA/IHZhbHVlIDogZmFsc2U7XG4gIH0sXG4gIGxlc3M6IGZ1bmN0aW9uIGxlc3MoX3JlZjUpIHtcbiAgICB2YXIgcHJvcGVydHkgPSBfcmVmNS5wcm9wZXJ0eTtcbiAgICB2YXIgdmFsdWUgPSBfcmVmNS52YWx1ZTtcbiAgICB2YXIgbWl4aW5LZXkgPSBfcmVmNS5taXhpbktleTtcbiAgICB2YXIgQ29tcG9uZW50ID0gX3JlZjUuQ29tcG9uZW50O1xuXG4gICAgdmFyIGNvbmRpdGlvbiA9ICgwLCBfc3BsaXRDb25kaXRpb24yLmRlZmF1bHQpKHByb3BlcnR5LCBtaXhpbktleSwgQ29tcG9uZW50KTtcbiAgICByZXR1cm4gY29uZGl0aW9uICYmIGNvbmRpdGlvbi5sZWZ0IDwgY29uZGl0aW9uLnJpZ2h0ID8gdmFsdWUgOiBmYWxzZTtcbiAgfSxcbiAgZXF1YWw6IGZ1bmN0aW9uIGVxdWFsKF9yZWY2KSB7XG4gICAgdmFyIHByb3BlcnR5ID0gX3JlZjYucHJvcGVydHk7XG4gICAgdmFyIHZhbHVlID0gX3JlZjYudmFsdWU7XG4gICAgdmFyIG1peGluS2V5ID0gX3JlZjYubWl4aW5LZXk7XG4gICAgdmFyIENvbXBvbmVudCA9IF9yZWY2LkNvbXBvbmVudDtcblxuICAgIHZhciBjb25kaXRpb24gPSAoMCwgX3NwbGl0Q29uZGl0aW9uMi5kZWZhdWx0KShwcm9wZXJ0eSwgbWl4aW5LZXksIENvbXBvbmVudCk7XG4gICAgcmV0dXJuIGNvbmRpdGlvbiAmJiBjb25kaXRpb24ubGVmdCA9PSBjb25kaXRpb24ucmlnaHQgPyB2YWx1ZSA6IGZhbHNlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzU3RyaW5nID0gcmVxdWlyZSgnbG9kYXNoL2lzU3RyaW5nJyk7XG5cbnZhciBfaXNTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNTdHJpbmcpO1xuXG52YXIgX2dldFBzZXVkb0V4cHJlc3Npb24gPSByZXF1aXJlKCcuLi91dGlscy9nZXRQc2V1ZG9FeHByZXNzaW9uJyk7XG5cbnZhciBfZ2V0UHNldWRvRXhwcmVzc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRQc2V1ZG9FeHByZXNzaW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gRXZhbHVhdGVzIGlmIGEgZWxlbWVudCBjb250YWlucyBhIGdpdmVuIHN0cmluZ1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgcHJvcGVydHkgPSBfcmVmLnByb3BlcnR5O1xuICB2YXIgdmFsdWUgPSBfcmVmLnZhbHVlO1xuICB2YXIgY2hpbGRyZW4gPSBfcmVmLm5ld1Byb3BzLmNoaWxkcmVuO1xuXG4gIHZhciBleHByZXNzaW9uID0gKDAsIF9nZXRQc2V1ZG9FeHByZXNzaW9uMi5kZWZhdWx0KShwcm9wZXJ0eSk7XG5cbiAgaWYgKCgwLCBfaXNTdHJpbmcyLmRlZmF1bHQpKGNoaWxkcmVuKSAmJiBjaGlsZHJlbi5pbmRleE9mKGV4cHJlc3Npb24pID4gLTEpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2Fzc2lnblN0eWxlcyA9IHJlcXVpcmUoJ2Fzc2lnbi1zdHlsZXMnKTtcblxudmFyIF9hc3NpZ25TdHlsZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduU3R5bGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbi8qKlxyXG4gKiBNZXJnZSBtdWx0aXBsZSBzdHlsZSBvYmplY3RzIGJ5IG1lcmdpbmcgdGhvc2VcclxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IHN0eWxlcyAtIEEgc2V0IG9mIHN0eWxlIG9iamVjdHMgb3IgYSBzaW5nbGUgc3R5bGUgb2JqZWN0XHJcbiAqL1xudmFyIG1lcmdlU3R5bGVzID0gZnVuY3Rpb24gbWVyZ2VTdHlsZXMoc3R5bGVzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHN0eWxlcykpIHtcbiAgICByZXR1cm4gX2Fzc2lnblN0eWxlczIuZGVmYXVsdC5hcHBseSh1bmRlZmluZWQsIFt7fV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShzdHlsZXMpKSk7XG4gIH1cbiAgcmV0dXJuICgwLCBfYXNzaWduU3R5bGVzMi5kZWZhdWx0KSh7fSwgc3R5bGVzKTtcbn07XG5cbi8qKlxyXG4gKiBFeHRlbmRzIGEgZ2l2ZW4gc3R5bGUgb2JqZWN0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gbWl4aW4gb3B0aW9ucy9pbnB1dFxyXG4gKiBvcHRpb25zIGNhbiBiZSBlaXRoZXIgYSBzdHlsZSBvYmplY3Qgb3IgaW5jbHVkZSBhIGNvbmRpdGlvbiBhcyB3ZWxsIGFzIHN0eWxlc1xyXG4gKi9cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIG9wdGlvbnMgPSBfcmVmLnZhbHVlO1xuXG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdjb25kaXRpb24nKSkge1xuICAgIGlmIChvcHRpb25zLmNvbmRpdGlvbiAmJiBvcHRpb25zLnN0eWxlcykge1xuICAgICAgcmV0dXJuIG1lcmdlU3R5bGVzKG9wdGlvbnMuc3R5bGVzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG1lcmdlU3R5bGVzKG9wdGlvbnMuc3R5bGVzID8gb3B0aW9ucy5zdHlsZXMgOiBvcHRpb25zKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzRW1wdHkgPSByZXF1aXJlKCdsb2Rhc2gvaXNFbXB0eScpO1xuXG52YXIgX2lzRW1wdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNFbXB0eSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IG1peGluO1xuXG52YXIgX2Fzc2lnblN0eWxlcyA9IHJlcXVpcmUoJ2Fzc2lnbi1zdHlsZXMnKTtcblxudmFyIF9hc3NpZ25TdHlsZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduU3R5bGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG4vKlxyXG4gKiBSZXNvbHZlcyBtaXhpbnNcclxuICovXG5mdW5jdGlvbiBtaXhpbihfcmVmKSB7XG4gIHZhciBzdHlsZXMgPSBfcmVmLnN0eWxlcztcbiAgdmFyIHJlc29sdmUgPSBfcmVmLnJlc29sdmU7XG4gIHZhciBjb25maWcgPSBfcmVmLmNvbmZpZztcblxuICB2YXIgcGx1Z2luSW50ZXJmYWNlID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnc3R5bGVzJywgJ3Jlc29sdmUnLCAnY29uZmlnJ10pO1xuXG4gIHZhciBtaXhpbnMgPSBjb25maWcubWl4aW5zO1xuXG4gIC8vIGlmIG5vIGN1c3RvbSBrZXlzIGFyZSBzcGVjaWZpZWQgYXQgYWxsXG4gIGlmICgoMCwgX2lzRW1wdHkyLmRlZmF1bHQpKG1peGlucykpIHtcbiAgICByZXR1cm4gc3R5bGVzO1xuICB9XG5cbiAgdmFyIG5ld1N0eWxlcyA9ICgwLCBfYXNzaWduU3R5bGVzMi5kZWZhdWx0KSh7fSwgc3R5bGVzKTtcblxuICBPYmplY3Qua2V5cyhuZXdTdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gbmV3U3R5bGVzW3Byb3BlcnR5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgdmFyIG5ld1ZhbHVlID0gdm9pZCAwO1xuXG4gICAgLy8gdGVzdGluZyBldmVyeSBtaXhpbiBvbiB0aGUgY3VycmVudCBwcm9wZXJ0eVxuICAgIE9iamVjdC5rZXlzKG1peGlucykuZm9yRWFjaChmdW5jdGlvbiAobWl4aW5LZXkpIHtcbiAgICAgIGlmIChwcm9wZXJ0eS5pbmRleE9mKG1peGluS2V5KSA+IC0xKSB7XG4gICAgICAgIHZhciBtaXhpbkludGVyZmFjZSA9IF9leHRlbmRzKHt9LCBwbHVnaW5JbnRlcmZhY2UsIHtcbiAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIG1peGluS2V5OiBtaXhpbktleSxcbiAgICAgICAgICBjb25maWc6IGNvbmZpZ1xuICAgICAgICB9KTtcbiAgICAgICAgbmV3VmFsdWUgPSBtaXhpbnNbbWl4aW5LZXldKG1peGluSW50ZXJmYWNlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIG9ubHkgYXNzaWduIGlmIHRoZXJlIGFyZSBuZXcgc3R5bGVzXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBuZXdTdHlsZXMgPSAoMCwgX2Fzc2lnblN0eWxlczIuZGVmYXVsdCkobmV3U3R5bGVzLCByZXNvbHZlKF9leHRlbmRzKHt9LCBwbHVnaW5JbnRlcmZhY2UsIHtcbiAgICAgICAgICBzdHlsZXM6IG5ld1ZhbHVlLFxuICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgICAgICAgY29uZmlnOiBjb25maWdcbiAgICAgICAgfSkpKTtcbiAgICAgIH1cblxuICAgICAgZGVsZXRlIG5ld1N0eWxlc1twcm9wZXJ0eV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbmV3U3R5bGVzO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzUGxhaW5PYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvaXNQbGFpbk9iamVjdCcpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cbnZhciBfaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC9pc0Z1bmN0aW9uJyk7XG5cbnZhciBfaXNGdW5jdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0Z1bmN0aW9uKTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gc3RhdGVmdWxTZWxlY3RvcjtcblxudmFyIF9hc3NpZ25TdHlsZXMgPSByZXF1aXJlKCdhc3NpZ24tc3R5bGVzJyk7XG5cbnZhciBfYXNzaWduU3R5bGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnblN0eWxlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuLyoqXG4gKiBSZXNvbHZlcyBzZWxlY3RvcnMgdGhhdCBhcmUgZnVuY3Rpb25zXG4gKiBDYWxsaW5nIHRoZW0gd2l0aCBwcm9wcywgc3RhdGUsIGNvbnRleHQgYXMgcGFyYW1ldGVyXG4gKi9cbmZ1bmN0aW9uIHN0YXRlZnVsU2VsZWN0b3IoX3JlZikge1xuICB2YXIgc3R5bGVzID0gX3JlZi5zdHlsZXM7XG4gIHZhciBDb21wb25lbnQgPSBfcmVmLkNvbXBvbmVudDtcbiAgdmFyIHJlc29sdmUgPSBfcmVmLnJlc29sdmU7XG5cbiAgdmFyIHBsdWdpbkludGVyZmFjZSA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ3N0eWxlcycsICdDb21wb25lbnQnLCAncmVzb2x2ZSddKTtcblxuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTtcbiAgICBpZiAocHJvcGVydHkgPT09ICdfc3RhdGVmdWxTZWxlY3RvcicpIHtcbiAgICAgIC8vIGlmIHN0YXRlZnVsIHZhbHVlIGFscmVhZHkgcmVzb2x2ZWQganVzdCB1c2UgdGhhdFxuICAgICAgdmFyIG5ld1N0eWxlcyA9ICgwLCBfaXNGdW5jdGlvbjIuZGVmYXVsdCkodmFsdWUpID8gdmFsdWUoQ29tcG9uZW50LnByb3BzLCBDb21wb25lbnQuc3RhdGUsIENvbXBvbmVudC5jb250ZXh0KSA6IHZhbHVlO1xuICAgICAgc3R5bGVzID0gcmVzb2x2ZShfZXh0ZW5kcyh7fSwgcGx1Z2luSW50ZXJmYWNlLCB7XG4gICAgICAgIHN0eWxlczogbmV3U3R5bGVzLFxuICAgICAgICBDb21wb25lbnQ6IENvbXBvbmVudCxcbiAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZVxuICAgICAgfSkpO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc1BsYWluT2JqZWN0Mi5kZWZhdWx0KSh2YWx1ZSkpIHtcbiAgICAgIHN0eWxlc1twcm9wZXJ0eV0gPSByZXNvbHZlKF9leHRlbmRzKHt9LCBwbHVnaW5JbnRlcmZhY2UsIHtcbiAgICAgICAgc3R5bGVzOiAoMCwgX2Fzc2lnblN0eWxlczIuZGVmYXVsdCkoe30sIHZhbHVlKSxcbiAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IHJlc29sdmVcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzdHlsZXM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9pc1BsYWluT2JqZWN0Jyk7XG5cbnZhciBfaXNQbGFpbk9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1BsYWluT2JqZWN0KTtcblxudmFyIF9pc0Z1bmN0aW9uID0gcmVxdWlyZSgnbG9kYXNoL2lzRnVuY3Rpb24nKTtcblxudmFyIF9pc0Z1bmN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzRnVuY3Rpb24pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBzdGF0ZWZ1bFZhbHVlO1xuXG52YXIgX2Fzc2lnblN0eWxlcyA9IHJlcXVpcmUoJ2Fzc2lnbi1zdHlsZXMnKTtcblxudmFyIF9hc3NpZ25TdHlsZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduU3R5bGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG4vKipcclxuICogUmVzb2x2ZXMgdmFsdWVzIHRoYXQgYXJlIGZ1bmN0aW9uc1xyXG4gKiBDYWxsaW5nIHRoZW0gd2l0aCBwcm9wcywgc3RhdGUsIGNvbnRleHQgYXMgcGFyYW1ldGVyXHJcbiAqL1xuZnVuY3Rpb24gc3RhdGVmdWxWYWx1ZShfcmVmKSB7XG4gIHZhciBzdHlsZXMgPSBfcmVmLnN0eWxlcztcbiAgdmFyIENvbXBvbmVudCA9IF9yZWYuQ29tcG9uZW50O1xuICB2YXIgcmVzb2x2ZSA9IF9yZWYucmVzb2x2ZTtcblxuICB2YXIgcGx1Z2luSW50ZXJmYWNlID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnc3R5bGVzJywgJ0NvbXBvbmVudCcsICdyZXNvbHZlJ10pO1xuXG4gIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZXNbcHJvcGVydHldO1xuICAgIGlmICgoMCwgX2lzRnVuY3Rpb24yLmRlZmF1bHQpKHZhbHVlKSkge1xuICAgICAgc3R5bGVzW3Byb3BlcnR5XSA9IHZhbHVlKENvbXBvbmVudC5wcm9wcywgQ29tcG9uZW50LnN0YXRlLCBDb21wb25lbnQuY29udGV4dCk7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzUGxhaW5PYmplY3QyLmRlZmF1bHQpKHZhbHVlKSkge1xuICAgICAgc3R5bGVzW3Byb3BlcnR5XSA9IHJlc29sdmUoX2V4dGVuZHMoe30sIHBsdWdpbkludGVyZmFjZSwge1xuICAgICAgICBzdHlsZXM6ICgwLCBfYXNzaWduU3R5bGVzMi5kZWZhdWx0KSh7fSwgdmFsdWUpLFxuICAgICAgICBDb21wb25lbnQ6IENvbXBvbmVudCxcbiAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZVxuICAgICAgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN0eWxlcztcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc0VtcHR5ID0gcmVxdWlyZSgnbG9kYXNoL2lzRW1wdHknKTtcblxudmFyIF9pc0VtcHR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzRW1wdHkpO1xuXG52YXIgX2dldENoaWxkVHlwZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2dldENoaWxkVHlwZScpO1xuXG52YXIgX2dldENoaWxkVHlwZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRDaGlsZFR5cGUpO1xuXG52YXIgX2lubGluZVN0eWxlVHJhbnNmb3JtZXIgPSByZXF1aXJlKCdpbmxpbmUtc3R5bGUtdHJhbnNmb3JtZXInKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBMb2dzIHN0eWxlcyBhY2NvcmRpbmcgdG8gZGlmZmVyZW50IHNldHRpbmdzXG4gKi9cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIHN0eWxlcyA9IF9yZWYuc3R5bGVzO1xuICB2YXIgQ29tcG9uZW50ID0gX3JlZi5Db21wb25lbnQ7XG4gIHZhciBlbGVtZW50ID0gX3JlZi5lbGVtZW50O1xuICB2YXIgbmV3UHJvcHMgPSBfcmVmLm5ld1Byb3BzO1xuICB2YXIgc3R5bGVMb2dnZXIgPSBfcmVmLmNvbmZpZy5zdHlsZUxvZ2dlcjtcblxuICBpZiAoc3R5bGVMb2dnZXIpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgLy8gTG9nZ2VyIGluZm9ybWF0aW9uXG4gICAgICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gICAgICB2YXIga2V5ID0gZWxlbWVudC5rZXk7XG5cblxuICAgICAgdmFyIGNoaWxkVHlwZSA9ICgwLCBfZ2V0Q2hpbGRUeXBlMi5kZWZhdWx0KShlbGVtZW50KTtcblxuICAgICAgdmFyIGtleUluZm8gPSBrZXkgIT09IG51bGwgPyAna2V5PScgKyBrZXkgOiAnJztcbiAgICAgIHZhciByZWZJbmZvID0gcmVmICE9PSBudWxsID8gJ3JlZj0nICsgcmVmIDogJyc7XG5cbiAgICAgIHZhciBlbGVtZW50UmVmZXJlbmNlID0ga2V5SW5mbyArIChrZXlJbmZvICE9PSAnJyAmJiByZWZJbmZvICE9PSAnJyA/ICc7JyA6ICcnKSArIHJlZkluZm87XG4gICAgICB2YXIgZWxlbWVudEluZm8gPSBjaGlsZFR5cGUgKyAoZWxlbWVudFJlZmVyZW5jZSAhPT0gJycgPyAnWycgKyBlbGVtZW50UmVmZXJlbmNlICsgJ10nIDogJycpO1xuXG4gICAgICB2YXIgbG9nZ2VyUHJlZml4ID0gQ29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lICsgJzonICsgZWxlbWVudEluZm8gKyAnJztcbiAgICAgIHZhciBsb2dTdHlsZXMgPSBzdHlsZUxvZ2dlci50b1N0cmluZyA9PT0gdHJ1ZSA/ICgwLCBfaW5saW5lU3R5bGVUcmFuc2Zvcm1lci50b0NTUykoc3R5bGVzKSA6IHN0eWxlcztcblxuICAgICAgdmFyIGxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgICAgaWYgKHN0eWxlTG9nZ2VyLm5vRW1wdHkgJiYgKDAsIF9pc0VtcHR5Mi5kZWZhdWx0KShsb2dTdHlsZXMpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGxvZ2dlclByZWZpeCwgbG9nU3R5bGVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfTtcblxuICAgICAgLy8gbG9ncyBzdHlsZXMgaWYgYSBnaXZlbiBldmVudCBnb3QgdHJpZ2dlcmVkXG4gICAgICBpZiAoc3R5bGVMb2dnZXIub25FdmVudCAmJiAhbmV3UHJvcHMuX3N0eWxlTG9nZ2VyQWN0aXZlKSB7XG4gICAgICAgIC8vIEFsbG93aW5nIG11bHRpcGxlIGV2ZW50c1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3R5bGVMb2dnZXIub25FdmVudCkpIHtcbiAgICAgICAgICBzdHlsZUxvZ2dlci5vbkV2ZW50ID0gW3N0eWxlTG9nZ2VyLm9uRXZlbnRdO1xuICAgICAgICB9XG4gICAgICAgIC8vIEl0ZXJhdGUgZXZlcnkgZXZlbnQgYW5kIGFkZCBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgc3R5bGVMb2dnZXIub25FdmVudC5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHZhciBleGlzdGluZ0V2ZW50ID0gbmV3UHJvcHNbZXZlbnRdO1xuICAgICAgICAgIG5ld1Byb3BzW2V2ZW50XSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFdmVudCkge1xuICAgICAgICAgICAgICBleGlzdGluZ0V2ZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdQcm9wcy5fc3R5bGVMb2dnZXJFdmVudChlKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBuZXdQcm9wcy5fc3R5bGVMb2dnZXJBY3RpdmUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBuZXdQcm9wcy5fc3R5bGVMb2dnZXJFdmVudCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGxvZygpO1xuICAgICAgICBpZiAoc3R5bGVMb2dnZXIub25seVRvcE1vc3QpIHtcbiAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIG5ld1Byb3BzLl9sb29rU2hvdWxkVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgLy8gbG9ncyBzdHlsZXMgZXZlcnl0aW1lIHRoZSBlbGVtZW50IGdldHMgcmVuZGVyZWRcbiAgICAgIGlmIChzdHlsZUxvZ2dlci5vblJlbmRlcikge1xuICAgICAgICBsb2coKTtcbiAgICAgIH1cbiAgICB9KSgpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNvcHlQcm9wZXJ0aWVzO1xuLy8gVGFrZW4gZnJvbSBSYWRpdW0ncyBjb3JlIGRpcmVjdGx5XG4vLyBodHRwczovL2dpdGh1Yi5jb20vRm9ybWlkYWJsZUxhYnMvcmFkaXVtL2Jsb2IvbWFzdGVyL3NyYy9lbmhhbmNlci5qcyNMOFxuLy8gVGhpcyBlbnN1cmVzIGhvdCByZWxvYWRpbmcgd29ya2luZyBmaW5lLCBzZWUgaXNzdWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Gb3JtaWRhYmxlTGFicy9yYWRpdW0vcHVsbC8yNTVcbnZhciBLRVlTX1RPX0lHTk9SRV9XSEVOX0NPUFlJTkdfUFJPUEVSVElFUyA9IFsnYXJndW1lbnRzJywgJ2NhbGxlZScsICdjYWxsZXInLCAnbGVuZ3RoJywgJ25hbWUnLCAncHJvdG90eXBlJywgJ3R5cGUnXTtcblxuZnVuY3Rpb24gY29weVByb3BlcnRpZXMoc291cmNlLCB0YXJnZXQpIHtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoS0VZU19UT19JR05PUkVfV0hFTl9DT1BZSU5HX1BST1BFUlRJRVMuaW5kZXhPZihrZXkpIDwgMCAmJiAhdGFyZ2V0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC9pc0Z1bmN0aW9uJyk7XG5cbnZhciBfaXNGdW5jdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0Z1bmN0aW9uKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0Q2hpbGRUeXBlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIFJldHVybnMgYSBjaGlsZHMgdHlwZVxuICogSWYgY2hpbGQgaXMgYW4gRVM2IGNsYXNzIGl0IHJldHVybnMgdGhlIGRpc3BsYXlOYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gY2hpbGQgLSBjaGlsZCB3aGljaCB0eXBlIGdldHMgaWRlbnRpZmllZFxuICovXG5mdW5jdGlvbiBnZXRDaGlsZFR5cGUoY2hpbGQpIHtcbiAgaWYgKCgwLCBfaXNGdW5jdGlvbjIuZGVmYXVsdCkoY2hpbGQudHlwZSkpIHtcbiAgICByZXR1cm4gY2hpbGQudHlwZS5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpID8gY2hpbGQudHlwZS5uYW1lIDogY2hpbGQudHlwZTtcbiAgfVxuICByZXR1cm4gY2hpbGQudHlwZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8qKlxuICogRXh0cmFjdHMgb25seSB0aGUgbWF0aGVtYXRpY2FsIGV4cHJlc3Npb24gb3V0IGFuIHBzZXVkby1jbGFzcyBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBwc2V1ZG8gLSBwc2V1ZG8tY2xhc3Mgc2VsZWN0b3IgdGhhdCBpbmNsdWRlcyBhIG1hdGhtYWN0aWNhbCBleHByZXNzaW9uXG4gKi9cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHBzZXVkbykge1xuICBpZiAocHNldWRvLmluZGV4T2YoJygnKSA+IC0xKSB7XG4gICAgdmFyIHNwbGl0ID0gcHNldWRvLnJlcGxhY2UoLyAvZywgJycpLnNwbGl0KCcoJyk7XG4gICAgcmV0dXJuIHNwbGl0WzFdLnN1YnN0cigwLCBzcGxpdFsxXS5sZW5ndGggLSAxKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNvcnRPYmplY3Q7XG4vKipcbiAqIFNvcnRzIG9iamVjdHMgaW4gb3JkZXIgdG8gYWx3YXlzIGdldCB0aGUgc2FtZSBoYXNoIGNvZGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBPYmplY3QgdGhhdCBnZXRzIHNvcnRlZFxuICovXG5mdW5jdGlvbiBzb3J0T2JqZWN0KG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5zb3J0KCkucmVkdWNlKGZ1bmN0aW9uIChvdXRwdXQsIHByb3BlcnR5KSB7XG4gICAgb3V0cHV0W3Byb3BlcnR5XSA9IG9ialtwcm9wZXJ0eV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICByZXR1cm4gb3V0cHV0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0sIHt9KTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSByZXF1aXJlKCdsb2Rhc2gvZ2V0Jyk7XG5cbnZhciBfZ2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldCk7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoL2Fzc2lnbicpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogU3BsaXRzIGFuIGV4cHJlc3Npb24gYXQgYSBnaXZlbiBvcGVyYXRvciBhbmQgcmV0dXJucyBib3RoIHZhbHVlcyBjb252ZXJ0ZWQgdG8gY29tcGFyZSB0aGVtIHdpdGggZWFzZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGtleSB0aGF0IGdldHMgZXZhbHVhdGVkLCBpbiB0aGlzIGNhc2UgdGhlIGV4cHJlc3Npb25cbiAqIEBwYXJhbSB7b3BlcmF0b3J9IG9wZXJhdG9yIC0gb3BlcmF0b3Igd2hpY2ggc3BsaXRzIHByb3BlcnR5IGFuZCB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IENvbXBvbmVudCAtIG91dGVyIFJlYWN0IENvbXBvbmVudCBob2xkaW5nIHByb3BzIGFuZCBzdGF0ZSB0byBtYXRjaFxuICovXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChrZXksIG9wZXJhdG9yLCBDb21wb25lbnQpIHtcbiAgaWYgKGtleS5pbmRleE9mKG9wZXJhdG9yKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgbWF0Y2hWYWx1ZXMgPSAoMCwgX2Fzc2lnbjIuZGVmYXVsdCkoe30sIENvbXBvbmVudC5wcm9wcywgQ29tcG9uZW50LnN0YXRlKTtcblxuICB2YXIgX2tleSRzcGxpdCA9IGtleS5zcGxpdChvcGVyYXRvcik7XG5cbiAgdmFyIF9rZXkkc3BsaXQyID0gX3NsaWNlZFRvQXJyYXkoX2tleSRzcGxpdCwgMik7XG5cbiAgdmFyIHByb3BlcnR5ID0gX2tleSRzcGxpdDJbMF07XG4gIHZhciB2YWx1ZSA9IF9rZXkkc3BsaXQyWzFdO1xuXG4gIHZhciBfcHJvcGVydHkkc3BsaXQgPSBwcm9wZXJ0eS5zcGxpdCgnLicpO1xuXG4gIHZhciBfcHJvcGVydHkkc3BsaXQyID0gX3NsaWNlZFRvQXJyYXkoX3Byb3BlcnR5JHNwbGl0LCAxKTtcblxuICB2YXIgYmFzZVByb3AgPSBfcHJvcGVydHkkc3BsaXQyWzBdO1xuXG5cbiAgaWYgKG1hdGNoVmFsdWVzLmhhc093blByb3BlcnR5KGJhc2VQcm9wKSkge1xuICAgIHZhciBtYXRjaCA9ICgwLCBfZ2V0Mi5kZWZhdWx0KShtYXRjaFZhbHVlcywgcHJvcGVydHkpO1xuXG4gICAgbWF0Y2ggPSBtYXRjaCA9PT0gdW5kZWZpbmVkID8gJ3VuZGVmaW5lZCcgOiBtYXRjaDtcblxuICAgIGlmICghKCFpc05hTihwYXJzZUZsb2F0KG1hdGNoKSkgJiYgaXNGaW5pdGUobWF0Y2gpKSkge1xuICAgICAgbWF0Y2ggPSAobWF0Y2ggKyAnJykudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBsZWZ0OiBtYXRjaCwgcmlnaHQ6IHZhbHVlIH07XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgbG9vayBmcm9tICdyZWFjdC1sb29rJztcblxuY2xhc3MgRmFkZSBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3Nob3dFbGVtZW50ID0gdGhpcy5fc2hvd0VsZW1lbnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLl9oaWRlRWxlbWVudCA9IHRoaXMuX2hpZGVFbGVtZW50LmJpbmQodGhpcyk7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsQXBwZWFyIChjYWxsYmFjaykge1xuXHRcdHNldFRpbWVvdXQoY2FsbGJhY2ssIDEpOyAvLyBuZWVkIGF0IGxlYXN0IG9uZSB0aWNrIHRvIGZpcmUgdHJhbnNpdGlvblxuXHR9XG5cblx0Y29tcG9uZW50RGlkQXBwZWFyICgpIHtcblx0XHR0aGlzLl9zaG93RWxlbWVudCgpO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbEVudGVyIChjYWxsYmFjaykge1xuXHRcdHNldFRpbWVvdXQoY2FsbGJhY2ssIDEpO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkRW50ZXIgKCkge1xuXHRcdHRoaXMuX3Nob3dFbGVtZW50KCk7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsTGVhdmUgKGNhbGxiYWNrKSB7XG5cdFx0dGhpcy5faGlkZUVsZW1lbnQoKTtcblx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aGlzLnByb3BzLmR1cmF0aW9uKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZExlYXZlICgpIHtcblx0fVxuXG5cdF9zaG93RWxlbWVudCAoKSB7XG5cdFx0Y29uc3QgZWwgPSB0aGlzLnJlZnMuZWxlbWVudDtcblx0XHRlbC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0fVxuXG5cdF9oaWRlRWxlbWVudCAoKSB7XG5cdFx0Y29uc3QgZWwgPSB0aGlzLnJlZnMuZWxlbWVudDtcblx0XHRlbC5zdHlsZS5vcGFjaXR5ID0gMDtcblx0fVxuXG5cdHJlbmRlciAoKSB7XG5cdFx0Y29uc3QgcHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzKTtcblx0XHRjb25zdCBzdHlsZSA9IHtcblx0XHRcdG9wYWNpdHk6IDAsXG5cdFx0XHRXZWJraXRUcmFuc2l0aW9uOiBgb3BhY2l0eSAke3RoaXMucHJvcHMuZHVyYXRpb259bXMgZWFzZS1vdXRgLFxuXHRcdFx0bXNUcmFuc2l0aW9uOiBgb3BhY2l0eSAke3RoaXMucHJvcHMuZHVyYXRpb259bXMgZWFzZS1vdXRgLFxuXHRcdFx0dHJhbnNpdGlvbjogYG9wYWNpdHkgJHt0aGlzLnByb3BzLmR1cmF0aW9ufW1zIGVhc2Utb3V0YCxcblx0XHR9O1xuXHRcdHByb3BzLnN0eWxlID0gT2JqZWN0LmFzc2lnbihzdHlsZSwgdGhpcy5wcm9wcy5zdHlsZSk7XG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHR0aGlzLnByb3BzLmNvbXBvbmVudCxcblx0XHRcdHByb3BzLFxuXHRcdFx0dGhpcy5wcm9wcy5jaGlsZHJlblxuXHRcdCk7XG5cdH1cbn1cblxuRmFkZS5wcm9wVHlwZXMgPSB7XG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5hbnksXG5cdGR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbkZhZGUuZGVmYXVsdFByb3BzID0ge1xuXHRjb21wb25lbnQ6ICdkaXYnLFxuXHRkdXJhdGlvbjogMjAwLFxuXHRyZWY6ICdlbGVtZW50Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZhZGU7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaWNvbnMgZnJvbSAnLi9pY29ucyc7XG5cbmNvbnN0IEljb24gPSAocHJvcHMpID0+IChcblx0PHNwYW5cblx0XHRkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGljb25zW3Byb3BzLnR5cGVdIH19XG5cdFx0ey4uLnByb3BzfVxuXHQvPlxuKTtcblxuSWNvbi5wcm9wVHlwZXMgPSB7XG5cdHR5cGU6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhpY29ucykpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgSWNvbjtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJ3JlYWN0LWFkZG9ucy10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcnRhbCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucG9ydGFsRWxlbWVudCA9IG51bGw7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApO1xuXHRcdHRoaXMucG9ydGFsRWxlbWVudCA9IHA7XG5cdFx0dGhpcy5jb21wb25lbnREaWRVcGRhdGUoKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XG5cdFx0cmVuZGVyKFxuXHRcdFx0PFRyYW5zaXRpb24gey4uLnRoaXMucHJvcHN9IGNvbXBvbmVudD1cImRpdlwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvVHJhbnNpdGlvbj4sXG5cdFx0XHRcdHRoaXMucG9ydGFsRWxlbWVudFxuXHRcdCk7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBvcnRhbEVsZW1lbnQpO1xuXHR9XG5cblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5Qb3J0YWwucHJvcFR5cGVzID0ge1xuXHRjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IChcblx0JzxzdmcgZmlsbD1cIndoaXRlXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPidcblx0XHQrICc8cGF0aCBkPVwiTTIxMy43LDI1NkwyMTMuNywyNTZMMjEzLjcsMjU2TDM4MC45LDgxLjljNC4yLTQuMyw0LjEtMTEuNC0wLjItMTUuOGwtMjkuOS0zMC42Yy00LjMtNC40LTExLjMtNC41LTE1LjUtMC4yTDEzMS4xLDI0Ny45IGMtMi4yLDIuMi0zLjIsNS4yLTMsOC4xYy0wLjEsMywwLjksNS45LDMsOC4xbDIwNC4yLDIxMi43YzQuMiw0LjMsMTEuMiw0LjIsMTUuNS0wLjJsMjkuOS0zMC42YzQuMy00LjQsNC40LTExLjUsMC4yLTE1LjggTDIxMy43LDI1NnpcIi8+J1xuXHQrICc8L3N2Zz4nXG4pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoXG5cdCc8c3ZnIGZpbGw9XCJ3aGl0ZVwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4nXG5cdFx0KyAnPHBhdGggZD1cIk0yOTguMywyNTZMMjk4LjMsMjU2TDI5OC4zLDI1NkwxMzEuMSw4MS45Yy00LjItNC4zLTQuMS0xMS40LDAuMi0xNS44bDI5LjktMzAuNmM0LjMtNC40LDExLjMtNC41LDE1LjUtMC4ybDIwNC4yLDIxMi43IGMyLjIsMi4yLDMuMiw1LjIsMyw4LjFjMC4xLDMtMC45LDUuOS0zLDguMUwxNzYuNyw0NzYuOGMtNC4yLDQuMy0xMS4yLDQuMi0xNS41LTAuMkwxMzEuMyw0NDZjLTQuMy00LjQtNC40LTExLjUtMC4yLTE1LjggTDI5OC4zLDI1NnpcIi8+J1xuXHQrICc8L3N2Zz4nXG4pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoXG5cdCc8c3ZnIGZpbGw9XCJ3aGl0ZVwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4nXG5cdFx0KyAnPHBhdGggZD1cIk00NDMuNiwzODcuMUwzMTIuNCwyNTUuNGwxMzEuNS0xMzBjNS40LTUuNCw1LjQtMTQuMiwwLTE5LjZsLTM3LjQtMzcuNmMtMi42LTIuNi02LjEtNC05LjgtNGMtMy43LDAtNy4yLDEuNS05LjgsNCBMMjU2LDE5Ny44TDEyNC45LDY4LjNjLTIuNi0yLjYtNi4xLTQtOS44LTRjLTMuNywwLTcuMiwxLjUtOS44LDRMNjgsMTA1LjljLTUuNCw1LjQtNS40LDE0LjIsMCwxOS42bDEzMS41LDEzMEw2OC40LDM4Ny4xIGMtMi42LDIuNi00LjEsNi4xLTQuMSw5LjhjMCwzLjcsMS40LDcuMiw0LjEsOS44bDM3LjQsMzcuNmMyLjcsMi43LDYuMiw0LjEsOS44LDQuMWMzLjUsMCw3LjEtMS4zLDkuOC00LjFMMjU2LDMxMy4xbDEzMC43LDEzMS4xIGMyLjcsMi43LDYuMiw0LjEsOS44LDQuMWMzLjUsMCw3LjEtMS4zLDkuOC00LjFsMzcuNC0zNy42YzIuNi0yLjYsNC4xLTYuMSw0LjEtOS44QzQ0Ny43LDM5My4yLDQ0Ni4yLDM4OS43LDQ0My42LDM4Ny4xelwiLz4nXG5cdCsgJzwvc3ZnPidcbik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0YXJyb3dMZWZ0OiByZXF1aXJlKCcuL2Fycm93TGVmdCcpLFxuXHRhcnJvd1JpZ2h0OiByZXF1aXJlKCcuL2Fycm93UmlnaHQnKSxcblx0Y2xvc2U6IHJlcXVpcmUoJy4vY2xvc2UnKSxcbn07XG4iLCJpbXBvcnQgeyBTdHlsZVNoZWV0IH0gZnJvbSAncmVhY3QtbG9vayc7XG5cbmNvbnN0IENMT1NFX1NJWkUgPSAyMDtcbmNvbnN0IEFSUk9XX0hFSUdIVCA9IDEyMDtcbmNvbnN0IEdBUF9CT1RUT00gPSA1MDtcbmNvbnN0IEdBUF9UT1AgPSA0MDtcblxuY29uc3Qgc3R5bGVzID0gU3R5bGVTaGVldC5jcmVhdGUoe1xuXHQvLyBTQ0VORVxuXHRjb250YWluZXI6IHtcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDAuOCknLFxuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuXHRcdGhlaWdodDogJzEwMCUnLFxuXHRcdGxlZnQ6IDAsXG5cdFx0cGFkZGluZzogJzAgMTBweCcsXG5cdFx0cG9zaXRpb246ICdmaXhlZCcsXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJyxcblx0XHR0b3A6IDAsXG5cdFx0d2lkdGg6ICcxMDAlJyxcblx0XHR6SW5kZXg6IDEwMDEsXG5cdH0sXG5cdGNvbnRlbnQ6IHtcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRtYXJnaW46ICcwIGF1dG8nLFxuXHRcdG1heFdpZHRoOiAnMTAwJScsXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXG5cdH0sXG5cdGNvbnRlbnRIZWlnaHRTaGltOiB7XG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG5cdFx0aGVpZ2h0OiAnMTAwJScsXG5cdFx0bGluZUhlaWdodDogMCxcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcblx0fSxcblxuXHQvLyBJTUFHRVNcblx0aW1hZ2U6IHtcblx0XHRib3hTaXppbmc6ICdib3JkZXItYm94Jyxcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxuXHRcdGxpbmVIZWlnaHQ6IDAsXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcblx0XHRtYXJnaW46ICcwIGF1dG8nLFxuXHRcdHBhZGRpbmdCb3R0b206IDUwLFxuXHRcdHBhZGRpbmdUb3A6IDQwLFxuXHRcdGhlaWdodDogJ2F1dG8nLFxuXHRcdHdpZHRoOiAnYXV0bycsXG5cblx0XHQvLyBkaXNhYmxlIHVzZXIgc2VsZWN0XG5cdFx0V2Via2l0VG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cdFx0dXNlclNlbGVjdDogJ25vbmUnLFxuXG5cdH0sXG5cdGZpZ3VyZToge1xuXHRcdGJhY2tncm91bmRJbWFnZTogJ3VybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMG5ORGh3ZUNjZ2FHVnBaMmgwUFNjME9IQjRKeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBeE1EQWdNVEF3SWlCd2NtVnpaWEoyWlVGemNHVmpkRkpoZEdsdlBTSjRUV2xrV1UxcFpDSWdZMnhoYzNNOUluVnBiQzFrWldaaGRXeDBJajQ4Y21WamRDQjRQU0l3SWlCNVBTSXdJaUIzYVdSMGFEMGlNVEF3SWlCb1pXbG5hSFE5SWpFd01DSWdabWxzYkQwaWJtOXVaU0lnWTJ4aGMzTTlJbUpySWo0OEwzSmxZM1ErUEhKbFkzUWdJSGc5SnpRMkxqVW5JSGs5SnpRd0p5QjNhV1IwYUQwbk55Y2dhR1ZwWjJoMFBTY3lNQ2NnY25nOUp6VW5JSEo1UFNjMUp5Qm1hV3hzUFNjalptWm1abVptSnlCMGNtRnVjMlp2Y20wOUozSnZkR0YwWlNnd0lEVXdJRFV3S1NCMGNtRnVjMnhoZEdVb01DQXRNekFwSno0Z0lEeGhibWx0WVhSbElHRjBkSEpwWW5WMFpVNWhiV1U5SjI5d1lXTnBkSGtuSUdaeWIyMDlKekVuSUhSdlBTY3dKeUJrZFhJOUp6RnpKeUJpWldkcGJqMG5NSE1uSUhKbGNHVmhkRU52ZFc1MFBTZHBibVJsWm1sdWFYUmxKeTgrUEM5eVpXTjBQanh5WldOMElDQjRQU2MwTmk0MUp5QjVQU2MwTUNjZ2QybGtkR2c5SnpjbklHaGxhV2RvZEQwbk1qQW5JSEo0UFNjMUp5QnllVDBuTlNjZ1ptbHNiRDBuSTJabVptWm1aaWNnZEhKaGJuTm1iM0p0UFNkeWIzUmhkR1VvTXpBZ05UQWdOVEFwSUhSeVlXNXpiR0YwWlNnd0lDMHpNQ2tuUGlBZ1BHRnVhVzFoZEdVZ1lYUjBjbWxpZFhSbFRtRnRaVDBuYjNCaFkybDBlU2NnWm5KdmJUMG5NU2NnZEc4OUp6QW5JR1IxY2owbk1YTW5JR0psWjJsdVBTY3dMakE0TXpNek16TXpNek16TXpNek16TXpjeWNnY21Wd1pXRjBRMjkxYm5ROUoybHVaR1ZtYVc1cGRHVW5MejQ4TDNKbFkzUStQSEpsWTNRZ0lIZzlKelEyTGpVbklIazlKelF3SnlCM2FXUjBhRDBuTnljZ2FHVnBaMmgwUFNjeU1DY2djbmc5SnpVbklISjVQU2MxSnlCbWFXeHNQU2NqWm1abVptWm1KeUIwY21GdWMyWnZjbTA5SjNKdmRHRjBaU2cyTUNBMU1DQTFNQ2tnZEhKaGJuTnNZWFJsS0RBZ0xUTXdLU2MrSUNBOFlXNXBiV0YwWlNCaGRIUnlhV0oxZEdWT1lXMWxQU2R2Y0dGamFYUjVKeUJtY205dFBTY3hKeUIwYnowbk1DY2daSFZ5UFNjeGN5Y2dZbVZuYVc0OUp6QXVNVFkyTmpZMk5qWTJOalkyTmpZMk5qWnpKeUJ5WlhCbFlYUkRiM1Z1ZEQwbmFXNWtaV1pwYm1sMFpTY3ZQand2Y21WamRENDhjbVZqZENBZ2VEMG5ORFl1TlNjZ2VUMG5OREFuSUhkcFpIUm9QU2MzSnlCb1pXbG5hSFE5SnpJd0p5QnllRDBuTlNjZ2NuazlKelVuSUdacGJHdzlKeU5tWm1abVptWW5JSFJ5WVc1elptOXliVDBuY205MFlYUmxLRGt3SURVd0lEVXdLU0IwY21GdWMyeGhkR1VvTUNBdE16QXBKejRnSUR4aGJtbHRZWFJsSUdGMGRISnBZblYwWlU1aGJXVTlKMjl3WVdOcGRIa25JR1p5YjIwOUp6RW5JSFJ2UFNjd0p5QmtkWEk5SnpGekp5QmlaV2RwYmowbk1DNHlOWE1uSUhKbGNHVmhkRU52ZFc1MFBTZHBibVJsWm1sdWFYUmxKeTgrUEM5eVpXTjBQanh5WldOMElDQjRQU2MwTmk0MUp5QjVQU2MwTUNjZ2QybGtkR2c5SnpjbklHaGxhV2RvZEQwbk1qQW5JSEo0UFNjMUp5QnllVDBuTlNjZ1ptbHNiRDBuSTJabVptWm1aaWNnZEhKaGJuTm1iM0p0UFNkeWIzUmhkR1VvTVRJd0lEVXdJRFV3S1NCMGNtRnVjMnhoZEdVb01DQXRNekFwSno0Z0lEeGhibWx0WVhSbElHRjBkSEpwWW5WMFpVNWhiV1U5SjI5d1lXTnBkSGtuSUdaeWIyMDlKekVuSUhSdlBTY3dKeUJrZFhJOUp6RnpKeUJpWldkcGJqMG5NQzR6TXpNek16TXpNek16TXpNek16TXpjeWNnY21Wd1pXRjBRMjkxYm5ROUoybHVaR1ZtYVc1cGRHVW5MejQ4TDNKbFkzUStQSEpsWTNRZ0lIZzlKelEyTGpVbklIazlKelF3SnlCM2FXUjBhRDBuTnljZ2FHVnBaMmgwUFNjeU1DY2djbmc5SnpVbklISjVQU2MxSnlCbWFXeHNQU2NqWm1abVptWm1KeUIwY21GdWMyWnZjbTA5SjNKdmRHRjBaU2d4TlRBZ05UQWdOVEFwSUhSeVlXNXpiR0YwWlNnd0lDMHpNQ2tuUGlBZ1BHRnVhVzFoZEdVZ1lYUjBjbWxpZFhSbFRtRnRaVDBuYjNCaFkybDBlU2NnWm5KdmJUMG5NU2NnZEc4OUp6QW5JR1IxY2owbk1YTW5JR0psWjJsdVBTY3dMalF4TmpZMk5qWTJOalkyTmpZMk5qZHpKeUJ5WlhCbFlYUkRiM1Z1ZEQwbmFXNWtaV1pwYm1sMFpTY3ZQand2Y21WamRENDhjbVZqZENBZ2VEMG5ORFl1TlNjZ2VUMG5OREFuSUhkcFpIUm9QU2MzSnlCb1pXbG5hSFE5SnpJd0p5QnllRDBuTlNjZ2NuazlKelVuSUdacGJHdzlKeU5tWm1abVptWW5JSFJ5WVc1elptOXliVDBuY205MFlYUmxLREU0TUNBMU1DQTFNQ2tnZEhKaGJuTnNZWFJsS0RBZ0xUTXdLU2MrSUNBOFlXNXBiV0YwWlNCaGRIUnlhV0oxZEdWT1lXMWxQU2R2Y0dGamFYUjVKeUJtY205dFBTY3hKeUIwYnowbk1DY2daSFZ5UFNjeGN5Y2dZbVZuYVc0OUp6QXVOWE1uSUhKbGNHVmhkRU52ZFc1MFBTZHBibVJsWm1sdWFYUmxKeTgrUEM5eVpXTjBQanh5WldOMElDQjRQU2MwTmk0MUp5QjVQU2MwTUNjZ2QybGtkR2c5SnpjbklHaGxhV2RvZEQwbk1qQW5JSEo0UFNjMUp5QnllVDBuTlNjZ1ptbHNiRDBuSTJabVptWm1aaWNnZEhKaGJuTm1iM0p0UFNkeWIzUmhkR1VvTWpFd0lEVXdJRFV3S1NCMGNtRnVjMnhoZEdVb01DQXRNekFwSno0Z0lEeGhibWx0WVhSbElHRjBkSEpwWW5WMFpVNWhiV1U5SjI5d1lXTnBkSGtuSUdaeWIyMDlKekVuSUhSdlBTY3dKeUJrZFhJOUp6RnpKeUJpWldkcGJqMG5NQzQxT0RNek16TXpNek16TXpNek16TTBjeWNnY21Wd1pXRjBRMjkxYm5ROUoybHVaR1ZtYVc1cGRHVW5MejQ4TDNKbFkzUStQSEpsWTNRZ0lIZzlKelEyTGpVbklIazlKelF3SnlCM2FXUjBhRDBuTnljZ2FHVnBaMmgwUFNjeU1DY2djbmc5SnpVbklISjVQU2MxSnlCbWFXeHNQU2NqWm1abVptWm1KeUIwY21GdWMyWnZjbTA5SjNKdmRHRjBaU2d5TkRBZ05UQWdOVEFwSUhSeVlXNXpiR0YwWlNnd0lDMHpNQ2tuUGlBZ1BHRnVhVzFoZEdVZ1lYUjBjbWxpZFhSbFRtRnRaVDBuYjNCaFkybDBlU2NnWm5KdmJUMG5NU2NnZEc4OUp6QW5JR1IxY2owbk1YTW5JR0psWjJsdVBTY3dMalkyTmpZMk5qWTJOalkyTmpZMk5qWnpKeUJ5WlhCbFlYUkRiM1Z1ZEQwbmFXNWtaV1pwYm1sMFpTY3ZQand2Y21WamRENDhjbVZqZENBZ2VEMG5ORFl1TlNjZ2VUMG5OREFuSUhkcFpIUm9QU2MzSnlCb1pXbG5hSFE5SnpJd0p5QnllRDBuTlNjZ2NuazlKelVuSUdacGJHdzlKeU5tWm1abVptWW5JSFJ5WVc1elptOXliVDBuY205MFlYUmxLREkzTUNBMU1DQTFNQ2tnZEhKaGJuTnNZWFJsS0RBZ0xUTXdLU2MrSUNBOFlXNXBiV0YwWlNCaGRIUnlhV0oxZEdWT1lXMWxQU2R2Y0dGamFYUjVKeUJtY205dFBTY3hKeUIwYnowbk1DY2daSFZ5UFNjeGN5Y2dZbVZuYVc0OUp6QXVOelZ6SnlCeVpYQmxZWFJEYjNWdWREMG5hVzVrWldacGJtbDBaU2N2UGp3dmNtVmpkRDQ4Y21WamRDQWdlRDBuTkRZdU5TY2dlVDBuTkRBbklIZHBaSFJvUFNjM0p5Qm9aV2xuYUhROUp6SXdKeUJ5ZUQwbk5TY2djbms5SnpVbklHWnBiR3c5SnlObVptWm1abVluSUhSeVlXNXpabTl5YlQwbmNtOTBZWFJsS0RNd01DQTFNQ0ExTUNrZ2RISmhibk5zWVhSbEtEQWdMVE13S1NjK0lDQThZVzVwYldGMFpTQmhkSFJ5YVdKMWRHVk9ZVzFsUFNkdmNHRmphWFI1SnlCbWNtOXRQU2N4SnlCMGJ6MG5NQ2NnWkhWeVBTY3hjeWNnWW1WbmFXNDlKekF1T0RNek16TXpNek16TXpNek16TXpOSE1uSUhKbGNHVmhkRU52ZFc1MFBTZHBibVJsWm1sdWFYUmxKeTgrUEM5eVpXTjBQanh5WldOMElDQjRQU2MwTmk0MUp5QjVQU2MwTUNjZ2QybGtkR2c5SnpjbklHaGxhV2RvZEQwbk1qQW5JSEo0UFNjMUp5QnllVDBuTlNjZ1ptbHNiRDBuSTJabVptWm1aaWNnZEhKaGJuTm1iM0p0UFNkeWIzUmhkR1VvTXpNd0lEVXdJRFV3S1NCMGNtRnVjMnhoZEdVb01DQXRNekFwSno0Z0lEeGhibWx0WVhSbElHRjBkSEpwWW5WMFpVNWhiV1U5SjI5d1lXTnBkSGtuSUdaeWIyMDlKekVuSUhSdlBTY3dKeUJrZFhJOUp6RnpKeUJpWldkcGJqMG5NQzQ1TVRZMk5qWTJOalkyTmpZMk5qWTJjeWNnY21Wd1pXRjBRMjkxYm5ROUoybHVaR1ZtYVc1cGRHVW5MejQ4TDNKbFkzUStQQzl6ZG1jKyknLFxuXHRcdGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnLFxuXHRcdGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlciBjZW50ZXInLFxuXHRcdGxpbmVIZWlnaHQ6IDEsXG5cdFx0bWluSGVpZ2h0OiAyMDAsXG5cdFx0bWluV2lkdGg6IDMwMCxcblx0XHRtYXJnaW46IDAsXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJyxcblx0fSxcblx0ZmlndXJlU2hhZG93OiB7XG5cdFx0Ym90dG9tOiBHQVBfQk9UVE9NLFxuXHRcdGJveFNoYWRvdzogJzAgMCA4cHggLTJweCByZ2JhKDAsMCwwLC42KScsXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcblx0XHRoZWlnaHQ6ICdhdXRvJyxcblx0XHRsZWZ0OiAwLFxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdHJpZ2h0OiAwLFxuXHRcdHRvcDogR0FQX1RPUCxcblx0XHR3aWR0aDogJ2F1dG8nLFxuXHRcdHpJbmRleDogLTEsXG5cdH0sXG5cdGZvb3Rlcjoge1xuXHRcdGNvbG9yOiAnd2hpdGUnLFxuXHRcdGxpbmVIZWlnaHQ6IDEuMyxcblx0XHRoZWlnaHQ6IEdBUF9CT1RUT00sXG5cdFx0bWFyZ2luVG9wOiAtR0FQX0JPVFRPTSxcblx0XHRwYWRkaW5nVG9wOiA1LFxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdHRleHRBbGlnbjogJ2xlZnQnLFxuXHRcdHRvcDogJzEwMCUnLFxuXHRcdGxlZnQ6IDAsXG5cdFx0d2lkdGg6ICcxMDAlJyxcblx0XHRjdXJzb3I6ICdhdXRvJyxcblx0fSxcblx0Zm9vdGVyQ291bnQ6IHtcblx0XHRmbG9hdDogJ3JpZ2h0Jyxcblx0XHRmb250U2l6ZTogJy44NWVtJyxcblx0XHRvcGFjaXR5OiAwLjc1LFxuXHR9LFxuXHRmb290ZXJDYXB0aW9uOiB7XG5cdFx0cGFkZGluZ1JpZ2h0OiA4MCxcblx0fSxcblxuXHQvLyBCVVRUT05TXG5cdGFycm93OiB7XG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxuXHRcdGJvcmRlcjogJ25vbmUnLFxuXHRcdGN1cnNvcjogJ3BvaW50ZXInLFxuXHRcdG91dGxpbmU6ICdub25lJyxcblx0XHRtYXJnaW5Ub3A6IEFSUk9XX0hFSUdIVCAvIC0yLFxuXHRcdG1heFdpZHRoOiA4MCxcblx0XHRwYWRkaW5nOiAyMCxcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHR0b3A6ICc1MCUnLFxuXHRcdGhlaWdodDogQVJST1dfSEVJR0hULFxuXHRcdHdpZHRoOiAnMTYlJyxcblx0XHR6SW5kZXg6IDEwMDEsXG5cblx0XHQvLyBkaXNhYmxlIHVzZXIgc2VsZWN0XG5cdFx0V2Via2l0VG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cdFx0V2Via2l0VXNlclNlbGVjdDogJ25vbmUnLFxuXHRcdE1velVzZXJTZWxlY3Q6ICdub25lJyxcblx0XHRtc1VzZXJTZWxlY3Q6ICdub25lJyxcblx0XHR1c2VyU2VsZWN0OiAnbm9uZScsXG5cdH0sXG5cdGFycm93TmV4dDoge1xuXHRcdHJpZ2h0OiAwLFxuXHR9LFxuXHRhcnJvd1ByZXY6IHtcblx0XHRsZWZ0OiAwLFxuXHR9LFxuXHRjbG9zZUJhcjoge1xuXHRcdGhlaWdodDogR0FQX1RPUCxcblx0XHRsZWZ0OiAwLFxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdHRleHRBbGlnbjogJ3JpZ2h0Jyxcblx0XHR0b3A6IDAsXG5cdFx0d2lkdGg6ICcxMDAlJyxcblx0fSxcblx0Y2xvc2VCdXR0b246IHtcblx0XHRiYWNrZ3JvdW5kOiAnbm9uZScsXG5cdFx0Ym9yZGVyOiAnbm9uZScsXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXG5cdFx0aGVpZ2h0OiBDTE9TRV9TSVpFICsgMjAsXG5cdFx0b3V0bGluZTogJ25vbmUnLFxuXHRcdHBhZGRpbmc6IDEwLFxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdHJpZ2h0OiAtMTAsXG5cdFx0dG9wOiAwLFxuXHRcdHdpZHRoOiBDTE9TRV9TSVpFICsgMjAsXG5cdH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVzO1xuIiwiY29uc3QgY2FuVXNlRE9NID0gISEoXG5cdHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG5cdCYmIHdpbmRvdy5kb2N1bWVudFxuXHQmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRjYW5Vc2VET00sXG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuLy8gaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnanNzJztcbi8vIGltcG9ydCByZWFjdEpzcyBmcm9tICdyZWFjdC1qc3MnO1xuLy8gaW1wb3J0IGNhbWVsQ2FzZSBmcm9tICdqc3MtY2FtZWwtY2FzZSc7XG4vLyBpbXBvcnQgcHggZnJvbSAnanNzLXB4Jztcbi8vIGltcG9ydCBuZXN0ZWQgZnJvbSAnanNzLW5lc3RlZCc7XG4vLyBpbXBvcnQgdmVuZG9yUHJlZml4ZXIgZnJvbSAnanNzLXZlbmRvci1wcmVmaXhlcic7XG5pbXBvcnQgU3dpcGVhYmxlIGZyb20gJ3JlYWN0LXN3aXBlYWJsZSc7XG5cbi8vIGV4cG9ydCBsZXQganNzID0gY3JlYXRlKCk7XG4vLyBleHBvcnQgbGV0IHVzZVNoZWV0ID0gcmVhY3RKc3MoanNzKTtcbi8vIGpzcy51c2UoY2FtZWxDYXNlKCkpO1xuLy8ganNzLnVzZShuZXN0ZWQoKSk7XG4vLyBqc3MudXNlKHB4KCkpO1xuLy8ganNzLnVzZSh2ZW5kb3JQcmVmaXhlcigpKTtcblxuaW1wb3J0IGxvb2ssIHsgU3R5bGVTaGVldCB9IGZyb20gJ3JlYWN0LWxvb2snO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL0ZhZGUnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uJztcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi9Qb3J0YWwnO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzL2RlZmF1bHQnO1xuXG5jb25zdCBjID0gU3R5bGVTaGVldC5jb21iaW5lU3R5bGVzO1xuXG5jbGFzcyBMaWdodGJveCBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyB0aGVtZSAodGhlbWVTdHlsZXMpIHtcblx0XHRjb25zdCBleHRTdHlsZXMgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMpO1xuXHRcdGZvciAoY29uc3Qga2V5IGluIGV4dFN0eWxlcykge1xuXHRcdFx0aWYgKGtleSBpbiB0aGVtZVN0eWxlcykge1xuXHRcdFx0XHRleHRTdHlsZXNba2V5XSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlc1trZXldLCB0aGVtZVN0eWxlc1trZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGV4dFN0eWxlcztcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLmNsb3NlID0gdGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZ290b05leHQgPSB0aGlzLmdvdG9OZXh0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5nb3RvUHJldiA9IHRoaXMuZ290b1ByZXYuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUltYWdlQ2xpY2sgPSB0aGlzLmhhbmRsZUltYWdlQ2xpY2suYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQgPSB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZVJlc2l6ZSA9IHRoaXMuaGFuZGxlUmVzaXplLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLnN0YXRlID0ge307XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuXHRcdGlmIChuZXh0UHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5lbmFibGVLZXlib2FyZElucHV0KSB7XG5cdFx0XHRpZiAodXRpbHMuY2FuVXNlRE9NKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG5cdFx0XHRpZiAodXRpbHMuY2FuVXNlRE9NKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuXHRcdFx0dGhpcy5oYW5kbGVSZXNpemUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHV0aWxzLmNhblVzZURPTSkgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdFx0aWYgKHV0aWxzLmNhblVzZURPTSkgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcblx0XHR9XG5cblx0XHRpZiAobmV4dFByb3BzLmlzT3Blbikge1xuXHRcdFx0aWYgKHV0aWxzLmNhblVzZURPTSkge1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh1dGlscy5jYW5Vc2VET00pIHtcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xvc2UoZSkge1xuXHRcdGlmIChlLnRhcmdldC5pZCAhPT0gJ3JlYWN0LWltYWdlcy1jb250YWluZXInKSByZXR1cm47XG5cblx0XHRpZiAodGhpcy5wcm9wcy5iYWNrZHJvcENsb3Nlc01vZGFsICYmIHRoaXMucHJvcHMub25DbG9zZSkge1xuXHRcdFx0dGhpcy5wcm9wcy5vbkNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0Z290b05leHQoZXZlbnQpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UgPT09ICh0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggLSAxKSkgcmV0dXJuO1xuXHRcdGlmIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uQ2xpY2tOZXh0KCk7XG5cdH1cblxuXHRnb3RvUHJldihldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmN1cnJlbnRJbWFnZSA9PT0gMCkgcmV0dXJuO1xuXHRcdGlmIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uQ2xpY2tQcmV2KCk7XG5cdH1cblxuXHRoYW5kbGVJbWFnZUNsaWNrKGUpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMub25DbGlja1Nob3dOZXh0SW1hZ2UpIHJldHVybjtcblxuXHRcdHRoaXMuZ290b05leHQoZSk7XG5cdH1cblxuXHRoYW5kbGVJbWFnZUxvYWQoZSwgaW5kZXgpIHtcblx0XHQvLyBjb25zb2xlLmxvZygnaW1hZ2UnLCBpbmRleCwgJ2xvYWRlZCcsIGUpO1xuXHR9XG5cblx0aGFuZGxlS2V5Ym9hcmRJbnB1dChldmVudCkge1xuXHRcdGlmIChldmVudC5rZXlDb2RlID09PSAzNykge1xuXHRcdFx0dGhpcy5nb3RvUHJldihldmVudCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5KSB7XG5cdFx0XHR0aGlzLmdvdG9OZXh0KGV2ZW50KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcblx0XHRcdHRoaXMucHJvcHMub25DbG9zZSgpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGhhbmRsZVJlc2l6ZSgpIHtcblx0XHRpZiAoIXV0aWxzLmNhblVzZURPTSkgcmV0dXJuO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0d2luZG93SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCxcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlckFycm93TmV4dCgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UgPT09ICh0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggLSAxKSkgcmV0dXJuIG51bGw7XG5cdFx0Ly8gY29uc3QgeyBjbGFzc2VzIH0gPSB0aGlzLnByb3BzLnNoZWV0O1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8YnV0dG9uIHRpdGxlPVwiTmV4dCAoUmlnaHQgYXJyb3cga2V5KVwiXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRjbGFzc05hbWU9e2Moc3R5bGVzLmFycm93LCBzdHlsZXMuYXJyb3dOZXh0KX1cblx0XHRcdFx0b25DbGljaz17dGhpcy5nb3RvTmV4dH1cblx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5nb3RvTmV4dH1cblx0XHRcdD5cblx0XHRcdFx0PEljb24gdHlwZT1cImFycm93UmlnaHRcIiAvPlxuXHRcdFx0PC9idXR0b24+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckFycm93UHJldigpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UgPT09IDApIHJldHVybiBudWxsO1xuXHRcdC8vIGNvbnN0IHsgY2xhc3NlcyB9ID0gdGhpcy5wcm9wcy5zaGVldDtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8YnV0dG9uIHRpdGxlPVwiUHJldmlvdXMgKExlZnQgYXJyb3cga2V5KVwiXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRjbGFzc05hbWU9e2Moc3R5bGVzLmFycm93LCBzdHlsZXMuYXJyb3dQcmV2KX1cblx0XHRcdFx0b25DbGljaz17dGhpcy5nb3RvUHJldn1cblx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5nb3RvUHJldn1cblx0XHRcdD5cblx0XHRcdFx0PEljb24gdHlwZT1cImFycm93TGVmdFwiIC8+XG5cdFx0XHQ8L2J1dHRvbj5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyQ2xvc2VCdXR0b24oKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLnNob3dDbG9zZUJ1dHRvbikgcmV0dXJuIG51bGw7XG5cdFx0Ly8gY29uc3QgeyBjbGFzc2VzIH0gPSB0aGlzLnByb3BzLnNoZWV0O1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2xvc2VCYXJ9PlxuXHRcdFx0XHQ8YnV0dG9uIHRpdGxlPVwiQ2xvc2UgKEVzYylcIiBjbGFzc05hbWU9e3N0eWxlcy5jbG9zZUJ1dHRvbn0gb25DbGljaz17dGhpcy5wcm9wcy5vbkNsb3NlfT5cblx0XHRcdFx0XHQ8SWNvbiB0eXBlPVwiY2xvc2VcIiAvPlxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJEaWFsb2cgKCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4pIHJldHVybiBudWxsO1xuXHRcdC8vIGNvbnN0IHsgY2xhc3NlcyB9ID0gdGhpcy5wcm9wcy5zaGVldDtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8RmFkZSBpZD1cInJlYWN0LWltYWdlcy1jb250YWluZXJcIlxuXHRcdFx0XHRrZXk9XCJkaWFsb2dcIlxuXHRcdFx0XHRkdXJhdGlvbj17MjUwfVxuXHRcdFx0XHRjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuY2xvc2V9XG5cdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuY2xvc2V9XG5cdFx0XHQ+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmNvbnRlbnRIZWlnaHRTaGltfSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRlbnR9PlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckNsb3NlQnV0dG9uKCl9XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVySW1hZ2VzKCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJBcnJvd1ByZXYoKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3dOZXh0KCl9XG5cdFx0XHQ8L0ZhZGU+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXJGb290ZXIgKGNhcHRpb24pIHtcblx0XHRjb25zdCB7IGN1cnJlbnRJbWFnZSwgaW1hZ2VzLCBzaG93SW1hZ2VDb3VudCB9ID0gdGhpcy5wcm9wcztcblx0XHQvLyBjb25zdCB7IGNsYXNzZXMgfSA9IHRoaXMucHJvcHMuc2hlZXQ7XG5cblx0XHRpZiAoIWNhcHRpb24gJiYgIXNob3dJbWFnZUNvdW50KSByZXR1cm4gbnVsbDtcblxuXHRcdGNvbnN0IGltYWdlQ291bnQgPSBzaG93SW1hZ2VDb3VudFxuXHRcdFx0PyA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvb3RlckNvdW50fT57Y3VycmVudEltYWdlICsgMX0gb2Yge2ltYWdlcy5sZW5ndGh9PC9kaXY+XG5cdFx0XHQ6IG51bGw7XG5cdFx0Y29uc3QgZmlnY2FwdGlvbiA9IGNhcHRpb25cblx0XHRcdD8gPGZpZ2NhcHRpb24gY2xhc3NOYW1lPXtzdHlsZXMuZm9vdGVyQ2FwdGlvbn0+e2NhcHRpb259PC9maWdjYXB0aW9uPlxuXHRcdFx0OiBudWxsO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZm9vdGVyfT5cblx0XHRcdFx0e2ltYWdlQ291bnR9XG5cdFx0XHRcdHtmaWdjYXB0aW9ufVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXJJbWFnZXMoKSB7XG5cdFx0Y29uc3QgeyBpbWFnZXMsIGN1cnJlbnRJbWFnZSB9ID0gdGhpcy5wcm9wcztcblx0XHQvLyBjb25zdCB7IGNsYXNzZXMgfSA9IHRoaXMucHJvcHMuc2hlZXQ7XG5cdFx0Y29uc3QgeyB3aW5kb3dIZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cblx0XHRpZiAoIWltYWdlcyB8fCAhaW1hZ2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cblx0XHRjb25zdCBpbWFnZSA9IGltYWdlc1tjdXJyZW50SW1hZ2VdO1xuXG5cdFx0bGV0IHNyY3NldDtcblx0XHRsZXQgc2l6ZXM7XG5cblx0XHRpZiAoaW1hZ2Uuc3Jjc2V0KSB7XG5cdFx0XHRzcmNzZXQgPSBpbWFnZS5zcmNzZXQuam9pbigpO1xuXHRcdFx0c2l6ZXMgPSAnMTAwdncnO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZmlndXJlIGtleT17YGltYWdlICR7Y3VycmVudEltYWdlfWB9XG5cdFx0XHRcdGNsYXNzTmFtZT17c3R5bGVzLmZpZ3VyZX1cblx0XHRcdFx0c3R5bGU9e3sgbWF4V2lkdGg6IHRoaXMucHJvcHMud2lkdGggfX1cblx0XHRcdD5cblx0XHRcdFx0PFN3aXBlYWJsZSBvblN3aXBlZExlZnQ9e3RoaXMuZ290b05leHR9IG9uU3dpcGVkUmlnaHQ9e3RoaXMuZ290b1ByZXZ9ID5cblx0XHRcdFx0XHQ8aW1nIGNsYXNzTmFtZT17c3R5bGVzLmltYWdlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5oYW5kbGVJbWFnZUNsaWNrfVxuXHRcdFx0XHRcdFx0b25Mb2FkPXtlID0+IHRoaXMuaGFuZGxlSW1hZ2VMb2FkKGUsIGN1cnJlbnRJbWFnZSl9XG5cdFx0XHRcdFx0XHRzaXplcz17c2l6ZXN9XG5cdFx0XHRcdFx0XHRzcmM9e2ltYWdlLnNyY31cblx0XHRcdFx0XHRcdHNyY1NldD17c3Jjc2V0fVxuXHRcdFx0XHRcdFx0c3R5bGU9e3tcblx0XHRcdFx0XHRcdFx0Y3Vyc29yOiB0aGlzLnByb3BzLm9uQ2xpY2tTaG93TmV4dEltYWdlID8gJ3BvaW50ZXInIDogJ2F1dG8nLFxuXHRcdFx0XHRcdFx0XHRtYXhIZWlnaHQ6IHdpbmRvd0hlaWdodCxcblx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9Td2lwZWFibGU+XG5cdFx0XHRcdHt0aGlzLnJlbmRlckZvb3RlcihpbWFnZXNbY3VycmVudEltYWdlXS5jYXB0aW9uKX1cblx0XHRcdDwvZmlndXJlPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8UG9ydGFsPlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJEaWFsb2coKX1cblx0XHRcdDwvUG9ydGFsPlxuXHRcdCk7XG5cdH1cbn1cblxuTGlnaHRib3guZGlzcGxheU5hbWUgPSAnTGlnaHRib3gnO1xuXG5MaWdodGJveC5wcm9wVHlwZXMgPSB7XG5cdGJhY2tkcm9wQ2xvc2VzTW9kYWw6IFByb3BUeXBlcy5ib29sLFxuXHRjdXJyZW50SW1hZ2U6IFByb3BUeXBlcy5udW1iZXIsXG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuXHRpbWFnZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuXHRcdFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHRzcmM6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdHNyY3NldDogUHJvcFR5cGVzLmFycmF5LFxuXHRcdFx0Y2FwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR9KVxuXHQpLmlzUmVxdWlyZWQsXG5cdGlzT3BlbjogUHJvcFR5cGVzLmJvb2wsXG5cdG9uQ2xpY2tOZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRvbkNsaWNrUHJldjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0b25DbGlja1Nob3dOZXh0SW1hZ2U6IFByb3BUeXBlcy5ib29sLFxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRzaGVldDogUHJvcFR5cGVzLm9iamVjdCxcblx0c2hvd0Nsb3NlQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcblx0c2hvd0ltYWdlQ291bnQ6IFByb3BUeXBlcy5ib29sLFxuXHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbn07XG5cbkxpZ2h0Ym94LmRlZmF1bHRQcm9wcyA9IHtcblx0ZW5hYmxlS2V5Ym9hcmRJbnB1dDogdHJ1ZSxcblx0Y3VycmVudEltYWdlOiAwLFxuXHRvbkNsaWNrU2hvd05leHRJbWFnZTogdHJ1ZSxcblx0c2hvd0Nsb3NlQnV0dG9uOiB0cnVlLFxuXHRzaG93SW1hZ2VDb3VudDogdHJ1ZSxcblx0d2lkdGg6IDkwMCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvb2soTGlnaHRib3gpO1xuIl19

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.a = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _index2 = __webpack_require__(2);

	var _index3 = _interopRequireDefault(_index2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_index3.default);

	var a = exports.a = 1;

	var getType = function getType(obj) {
	    if (obj == null) {
	        return obj + "";
	    }

	    return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" ? {
	        "[object Array]": "array",
	        "[object Boolean]": "boolean",
	        "[object Date]": "date",
	        "[object Error]": "error",
	        "[object Function]": "function",
	        "[object Number]": "number",
	        "[object Object]": "object",
	        "[object RegExp]": "regexp",
	        "[object String]": "string"
	    }[Object.prototype.toString.call(obj)] : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

	var srcCache, destCache;
	var indexOf = function indexOf(arr, tofind) {
	    var ret = -1;
	    arr.forEach(function (item, i) {
	        if (item === tofind) {
	            ret = i;
	        }
	    });

	    return ret;
	};
	var cloneObject = function cloneObject(src, entry) {
	    var dest,
	        type = getType(src);
	    entry && (srcCache = [], destCache = []);

	    if (type == "object" || type == "array") {
	        var idx = indexOf(srcCache, src);
	        if (idx != -1) {
	            return destCache[idx];
	        }
	        dest = { "array": [], "object": {} }[type];
	        srcCache.push(src), destCache.push(dest);
	        for (var i in src) {
	            dest[i] = cloneObject(src[i]);
	        }
	    } else {
	        // 基础类型
	        dest = src;
	    }

	    entry && (srcCache = null, destCache = null);
	    return dest;
	};

	/*
	var a = {a:1}, b = {b:1};
	a.b = b, b.a = a;

	var Parent = function(name) {
	    this.name = name;
	}
	var Child = function(name, age) {
	    Child.prototype.constructor(name);
	    this.age = age;
	}
	Child.prototype = new Parent("aa");

	var p = new Parent("ll");
	var c = new Child(13);
	*/

	function trim(str) {
	    return (/^\s*([^\s]*)\s*$/g.exec(str)[1]
	    );
	}

	function getPosition(element) {
	    var res = {
	        x: 0, y: 0
	    };

	    var elem = element;

	    while (elem) {
	        res.x += elem.offsetLeft;
	        res.y += elem.offsetTop;
	        elem = elem.offsetParent;
	    }

	    return res;
	}

	// jquery 选择器
	function tranverse(callback, elem) {
	    elem = elem || window.document.body, stack = [elem];
	    while (stack.length) {
	        var elem = stack.pop();
	        if (callback(elem)) {
	            break;
	        }
	        for (var i = 0, len = elem.childNodes.length; i < len; i++) {
	            stack.push(elem.childNodes[i]);
	        }
	    }
	}
	var $ = function $(selector) {
	    if (!selector) return null;
	    var selectors = selector.split(/\s+/);

	    var callbacks = {
	        ".": function _(selector, fromElem) {
	            var className = selector.slice(1);
	            if (fromElem.getElementsByClassName) {
	                return fromElem.getElementsByClassName(className)[0];
	            }

	            function contains(classList, className) {
	                for (var i = 0, len = classList.length; i < len; i++) {
	                    if (classList[i] == className) {
	                        return true;
	                    }
	                }
	                return false;
	            }

	            className && tranverse(function (elem) {
	                var classList = elem.className.split(/\s+/);
	                if (contains(classList, className)) {
	                    res = elem;
	                    return true;
	                }
	            }, fromElem);
	        },
	        "#": function _(selector, fromElem) {
	            var id = selector.slice(1);
	            return document.getElementById(id);
	        },
	        "[": function _(selector, fromElem) {
	            var attrs = /^\[([\w-]+)(=(\w+))?\]$/.exec(selector),
	                res,
	                attrValue,
	                attr;
	            attr = attrs && attrs[1];
	            attrValue = attrs[3];
	            debugger;

	            attr && tranverse(function (elem) {
	                if (elem.hasAttribute && elem.hasAttribute(attr)) {
	                    if (!attrValue || attrValue && elem.getAttribute(attr) == attrValue) {
	                        res = elem;
	                        return true;
	                    }
	                }
	            }, fromElem);

	            return res;
	        },
	        "tag": function tag(selector, fromElem) {
	            return fromElem.getElementsByTagName(selector)[0];
	        }
	    };

	    var resElem = document.body,
	        key;
	    while (selectors.length) {
	        selector = selectors.shift() || "";
	        key = selector[0];
	        resElem = (callbacks[key] || callbacks["tag"])(selector, resElem);
	    }

	    return resElem;
	};

	/* 轮播 */
	(function () {

	    var _inter = 2000,
	        _interAnimate = 500,
	        _width = 100,
	        _index = 0,
	        _size = 4,
	        _timer = undefined,
	        btnElem = $("#carouselBtn"),
	        elem = $("#carouselContainer ul");

	    btnElem.addEventListener("click", function (evt) {
	        var elem = evt.target,
	            index = +elem.innerText;

	        _util.stop();
	        _util.startAni();
	        _util.move(_index, index - 1);
	        _util.start();
	    });

	    var _util = {
	        init: function init() {
	            elem.style.transform = "translate(0, 0)";
	            this.start();
	        },
	        render: function render(tpl, obj) {
	            return tpl.replace(/\{\{(\w+)\}\}/g, function (_, key) {
	                return obj[key];
	            });
	        },
	        move: function move(from, to) {
	            elem.style.transform = _util.render("translate({{x}}px, 0)", {
	                x: -to * _width
	            });
	            _index = to;
	        },
	        startAni: function startAni() {
	            elem.style.transition = _util.render("transform {{inter}}s {{aniType}}", {
	                inter: _interAnimate / 1000,
	                aniType: "linear"
	            });
	        },
	        start: function start() {
	            _util.startAni();
	            var interFunc = function interFunc() {
	                var to = (_index + 1) % _size,
	                    from = _index;
	                _util.move(from, to);
	                _timer = setTimeout(interFunc, _inter);
	            };
	            _timer = setTimeout(interFunc, _inter);
	        },
	        stop: function stop() {
	            elem.style.transition = "";
	            clearTimeout(_timer);
	        }
	    };

	    window.carouse = _util;
	})();
	carouse.init();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./index.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".index__carouselContainer___2Z15i {\r\n    width: 100px; height: 100px; position: relative;\r\n    overflow: hidden;\r\n}\r\n.index__carouselContainer___2Z15i>ul {\r\n    margin: 0; padding: 0;\r\n    width: 400px; height: 100px; position: absolute;\r\n    font-size: 0px;\r\n}\r\n.index__carouse___Zdh2G {\r\n    font-size: 16px;\r\n    display: inline-block; width: 100px; height: 100px;\r\n}\r\n", ""]);

	// exports
	exports.locals = {
		"carouselContainer": "index__carouselContainer___2Z15i",
		"carouse": "index__carouse___Zdh2G"
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
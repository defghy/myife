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
/***/ function(module, exports) {

	var getType = function(obj) {
	    if(obj == null) {
	        return obj+ "";
	    }

	    return typeof obj === "object"? {
	        "[object Array]": "array",
	        "[object Boolean]": "boolean",
	        "[object Date]": "date",
	        "[object Error]": "error",
	        "[object Function]": "function",
	        "[object Number]": "number",
	        "[object Object]": "object",
	        "[object RegExp]": "regexp",
	        "[object String]": "string"
	    }[Object.prototype.toString.call(obj)]: typeof obj
	}

	var srcCache, destCache;
	var indexOf = function(arr, tofind) {
	    var ret = -1;
	    arr.forEach(function(item, i) {
	        if(item === tofind) {
	            ret = i;
	        }
	    });

	    return ret;
	};
	var cloneObject = function(src, entry) {
	    var dest,
	        type = getType(src);
	    entry && (srcCache = [], destCache = []);

	    if(type == "object" || type == "array") {
	        var idx = indexOf(srcCache, src);
	        if(idx != -1) {
	            return destCache[idx];
	        }
	        dest = {"array": [], "object": {}}[type];
	        srcCache.push(src), destCache.push(dest);
	        for(var i in src) {
	            dest[i] = cloneObject(src[i]);
	        }
	    } else {    // 基础类型
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
	    return /^\s*([^\s]*)\s*$/g.exec(str)[1];
	}

	function getPosition(element) {
	    var res = {
	        x: 0, y: 0
	    }

	    var elem = element;

	    while(elem) {
	        res.x += elem.offsetLeft;
	        res.y += elem.offsetTop;
	        elem = elem.offsetParent;
	    }

	    return res;
	}

	// jquery 选择器
	function tranverse(callback, elem) {
	    elem = elem || window.document.body,
	    stack = [elem];
	    while(stack.length) {
	        var elem = stack.pop();
	        if(callback(elem)) {
	            break;
	        }
	        for(var i=0, len=elem.childNodes.length; i<len; i++) {
	            stack.push(elem.childNodes[i]);
	        }
	    }
	}
	var $ = function(selector) {
	    if(!selector) return null;
	    var selectors = selector.split(/\s+/);

	    var callbacks = {
	        ".": function(selector, fromElem) {
	            var className = selector.slice(1);
	            if(fromElem.getElementsByClassName) {
	                return fromElem.getElementsByClassName(className)[0];
	            }

	            function contains(classList, className) {
	                for(var i=0, len=classList.length; i<len; i++) {
	                    if(classList[i] == className) {
	                        return true;
	                    }
	                }
	                return false;
	            }

	            className && tranverse(function(elem) {
	                var classList = elem.className.split(/\s+/);
	                if(contains(classList, className)) {
	                    res = elem;
	                    return true;
	                }
	            }, fromElem);
	        },
	        "#": function(selector, fromElem) {
	            var id = selector.slice(1);
	            return document.getElementById(id);
	        },
	        "[": function(selector, fromElem) {
	            var attrs = /^\[([\w-]+)(=(\w+))?\]$/.exec(selector),
	                res, attrValue, attr;
	            attr = attrs && attrs[1];
	            attrValue = attrs[3];
	            debugger;

	            attr && tranverse(function(elem) {
	                if(elem.hasAttribute && elem.hasAttribute(attr)) {
	                    if(!attrValue || (attrValue && elem.getAttribute(attr) == attrValue)) {
	                        res = elem;
	                        return true;
	                    }
	                }
	            }, fromElem);

	            return res;
	        },
	        "tag": function(selector, fromElem) {
	            return fromElem.getElementsByTagName(selector)[0];
	        }
	    };

	    var resElem = document.body, key;
	    while(selectors.length) {
	        selector = selectors.shift() || "";
	        key = selector[0];
	        resElem = (callbacks[key] || callbacks["tag"])(selector, resElem);
	    }

	    return resElem;
	};

	/* 轮播 */
	(function () {

	var _inter = 2000,
	    _interAnimate= 500,
	    _width= 100,
	    _index= 0,
	    _size= 4,
	    _timer= undefined,
	    btnElem = $("#carouselBtn"),
	    elem= $("#carouselContainer ul");

	btnElem.addEventListener("click", function(evt) {
	    var elem = evt.target,
	        index = +elem.innerText;

	    _util.stop();
	    _util.startAni();
	    _util.move(_index, index-1);
	    _util.start();
	});

	var _util = {
	    init: function() {
	        elem.style.transform = "translate(0, 0)";
	        this.start();
	    },
	    render: function(tpl, obj) {
	        return tpl.replace(/\{\{(\w+)\}\}/g, function(_, key) {
	            return obj[key];
	        });
	    },
	    move: function(from, to) {
	        elem.style.transform = _util.render("translate({{x}}px, 0)", {
	            x: -to * _width
	        });
	        _index = to;
	    },
	    startAni: function() {
	        elem.style.transition = _util.render("transform {{inter}}s {{aniType}}", {
	            inter: _interAnimate/1000,
	            aniType: "linear"
	        });
	    },
	    start: function() {
	        _util.startAni();
	        var interFunc = function() {
	            var to = (_index+1)%_size,
	                from = _index;
	            _util.move(from, to);
	            _timer = setTimeout(interFunc, _inter);
	        };
	        _timer = setTimeout(interFunc, _inter);
	    },
	    stop: function() {
	        elem.style.transition = "";
	        clearTimeout(_timer);
	    }
	}

	window.carouse = _util;

	})();
	carouse.init();


/***/ }
/******/ ]);
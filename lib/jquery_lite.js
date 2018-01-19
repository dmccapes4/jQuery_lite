/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(2);
window.$q = [];

window.$l = function(selector) {
  window.$l.extend = function(...args) {
    let extend = {};
    args.forEach((arg) => { Object.assign(extend, arg); });
    return extend;
  };

  window.$l.ajax = function(options) {
    let defaults = {
      success: () => { console.log("You're done JSON!"); },
      error: () => { console.log("Relax AJAX!"); },
      // url: "./request.html",
      url: "",
      method: "GET",
      data: {},
      contentType: "HTML",
      dataType: "json"
    };
    defaults = window.$l.extend(defaults, options);

    let xhr = new XMLHttpRequest();
    //
    xhr.onload = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      }
    };

    xhr.open(defaults["method"], defaults["url"], true);
    xhr.send(defaults["data"]);
  };

  if (typeof selector === "string") {
    let $nodeLists = document.querySelectorAll(selector);
    return $nodeLists;
  }

  if (selector instanceof HTMLElement) {
    let $DOMNodeCollection = new DOMNodeCollection(selector);
  }

  if (selector instanceof Function) {
    window.$q.push(selector);

    if( document.readyState === "complete") {
      selector();
    }
  }
};

let func = function() {
  console.log("not right away");
  window.$l('.hi');
  let dom = new DOMNodeCollection(window.$l('div'));
  dom.empty();
  dom.html("hello again.");
  dom.append("<p>hello again again</p>");
  dom.attr("class", "hithere");
  dom.addClass("hola");
  dom.removeClass("hithere");
  let listener = function() {
    // console.log("no one will listen to me anynore");
    // dom.off("click", listener);
    window.$l(function() {
      console.log("I'm a new function.");
    });
  };
  dom.on("click", listener);
};

let one = () => { console.log("one"); };
let two = () => { console.log("two"); };

window.$l(func);
window.$l(one);
window.$l(two);

document.addEventListener("DOMContentLoaded", function() {
  window.$q.forEach((foo) => foo());
});


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  html(str = "") {
    if (str === "") {
      return this.elements[0].innerHTML();
    }

    this.elements.forEach((element) => {
      element.innerHTML = str;
    });
  }

  empty() {
    this.elements.forEach((element) => {
      element.innerHTML = "";
    });
  }

  append(outerHTML) {
    this.elements.forEach((element) => {
      element.innerHTML += outerHTML;
    });
  }

  attr(name, value = null) {
    if (value === null) {
      return this.elements[0].getAttribute(name);
    }
    this.elements.forEach((element) => {
      element.setAttribute(name, value);
    });
  }

  addClass(value) {
    let currentClasses = this.attr("class");
    currentClasses += ` ${value}`;
    this.attr("class", currentClasses);
  }

  removeClass(value) {
    let classes = this.attr("class").split(" ");
    let newClasses = [];

    classes.forEach((cls) => {
      if (cls !== value) {
        newClasses.push(cls);
      }
    });

    this.attr("class", newClasses.join(' '));
  }

  children() {
    let childs = [];

    this.elements.forEach((element) => {
      childs.push(element.children);
    });

    return new DOMNodeCollection(childs);
  }

  parent() {
    let parents = [];

    this.elements.forEach((element) => {
      parents.push(element.parentElement);
    });

    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let found = [];

    this.elements.forEach((element) => {
      if(selector(element)) {
        found.push(element);
      }
    });

    return new DOMNodeCollection(found);
  }

  remove() {
    this.elements.forEach((element) => {
      element.innerHTML = "";
    });

    this.elements = [];
  }

  on(type, listener) {
    this.elements.forEach((element) => {
      element.addEventListener(type, listener);
    });
  }

  off(type, listener) {
    this.elements.forEach((element) => {
      element.removeEventListener(type, listener);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
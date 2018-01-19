const DOMNodeCollection = require('../lib/dom_node_collection');
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

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

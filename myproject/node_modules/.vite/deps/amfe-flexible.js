// node_modules/amfe-flexible/index.js
(function flexible(window2, document2) {
  var docEl = document2.documentElement;
  var dpr = window2.devicePixelRatio || 1;
  function setBodyFontSize() {
    if (document2.body) {
      document2.body.style.fontSize = 12 * dpr + "px";
    } else {
      document2.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();
  function setRemUnit() {
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + "px";
  }
  setRemUnit();
  window2.addEventListener("resize", setRemUnit);
  window2.addEventListener("pageshow", function(e) {
    if (e.persisted) {
      setRemUnit();
    }
  });
  if (dpr >= 2) {
    var fakeBody = document2.createElement("body");
    var testElement = document2.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
//# sourceMappingURL=amfe-flexible.js.map

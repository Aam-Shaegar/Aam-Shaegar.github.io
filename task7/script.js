/*jslint browser:true */
/*global document, window */

document.addEventListener("DOMContentLoaded", function () {
  var source = document.getElementById("source");
  var track = document.getElementById("track");
  var btnPrev = document.getElementById("btn-prev");
  var btnNext = document.getElementById("btn-next");
  var dotsContainer = document.getElementById("dots");

  var srcImgs = [];
  var temp = source.getElementsByTagName("img");
  var i;
  for (i = 0; i < temp.length; i += 1) {
    srcImgs.push({
      src: temp[i].getAttribute("src"),
      alt: temp[i].getAttribute("alt") || ""
    });
  }

  var total = srcImgs.length; 
  var slidesPerView = 3;     
  var clones = 0;            
  var index = 0;             
  var isAnimating = false;

  function updateSlidesPerView() {
    if (window.innerWidth < 768) {
      slidesPerView = 1;
    } else {
      slidesPerView = 3;
    }
  }

  function createSlide(src, alt) {
    var wrapper = document.createElement("div");
    wrapper.className = "slide";

    var box = document.createElement("div");
    box.className = "img-box";

    var img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", alt);

    box.appendChild(img);
    wrapper.appendChild(box);
    return wrapper;
  }

  function buildTrack() {
    while (track.firstChild) {
      track.removeChild(track.firstChild);
    }

    updateSlidesPerView();
    clones = slidesPerView;

    var j;

    for (j = total - clones; j < total; j += 1) {
      track.appendChild(createSlide(srcImgs[j].src, srcImgs[j].alt));
    }

    for (j = 0; j < total; j += 1) {
      track.appendChild(createSlide(srcImgs[j].src, srcImgs[j].alt));
    }

    for (j = 0; j < clones; j += 1) {
      track.appendChild(createSlide(srcImgs[j].src, srcImgs[j].alt));
    }

    index = clones;
    setTranslateImmediate();
    buildDots();
    updateActiveDot();
  }

  function setTranslateImmediate() {
    track.style.transition = "none";
    var percent = - (index * (100 / slidesPerView));
    track.style.transform = "translateX(" + percent + "%)";
    track.offsetHeight;
    track.style.transition = "";
  }

  function setTranslateAnimated() {
    var percent = - (index * (100 / slidesPerView));
    track.style.transform = "translateX(" + percent + "%)";
  }

  function buildDots() {
    while (dotsContainer.firstChild) {
      dotsContainer.removeChild(dotsContainer.firstChild);
    }
    var count = total;
    var k;
    for (k = 0; k < count; k += 1) {
      var d = document.createElement("div");
      d.className = "dot";
      (function (idx) {
        d.addEventListener("click", function () {
          index = clones + idx;
          setTranslateAnimated();
          updateActiveDot();
        });
      }(k));
      dotsContainer.appendChild(d);
    }
  }

  function updateActiveDot() {
    var dots = dotsContainer.children;
    if (!dots || dots.length === 0) { return; }
    var real = (index - clones) % total;
    if (real < 0) { real += total; }
    var m;
    for (m = 0; m < dots.length; m += 1) {
      dots[m].className = (m === real) ? "dot active" : "dot";
    }
  }

  function moveNext() {
    if (isAnimating) { return; }
    isAnimating = true;
    index += 1;
    setTranslateAnimated();
  }

  function movePrev() {
    if (isAnimating) { return; }
    isAnimating = true;
    index -= 1;
    setTranslateAnimated();
  }

  track.addEventListener("transitionend", function () {
    isAnimating = false;
    var realIndex = (index - clones) % total;
    if (realIndex < 0) { realIndex += total; }
    index = clones + realIndex;
    setTranslateImmediate();
    updateActiveDot();
  });

  btnNext.addEventListener("click", function () {
    moveNext();
  });
  btnPrev.addEventListener("click", function () {
    movePrev();
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    if (resizeTimer) { window.clearTimeout(resizeTimer); }
    resizeTimer = window.setTimeout(function () {
      var currentReal = (index - clones) % total;
      if (currentReal < 0) { currentReal += total; }
      buildTrack();
      index = clones + currentReal;
      setTranslateImmediate();
      updateActiveDot();
    }, 120);
  });

  updateSlidesPerView();
  buildTrack();

});

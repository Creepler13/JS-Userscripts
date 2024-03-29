// ==UserScript==
// @name WaybackMachine DeviantArt remove mature blur (kind of)
// @description Removes the blur on mature DeviantArt posts,previews and literature saved in the WaybackMachine.
// @version 1.5
// @author Creepler13
// @match https://web.archive.org/web/*/https://www.deviantart.com/*/art/*
// @match https://web.archive.org/web/*/https://www.deviantart.com/*
// @icon https://www.google.com/s2/favicons?sz=64&domain=archive.org
// ==/UserScript==

(() => {
  var __webpack_exports__ = {};
  function fixText() {
    if (!window.__INITIAL_STATE__)
      for (let script of document.querySelectorAll("script"))
        if (script.textContent.trim().startsWith("window.__BASEURL")) {
          eval(script.textContent);
          let id = window.location.href.split("-").pop(),
            deviation = window.__INITIAL_STATE__["@@entities"].deviation;
          if (((deviation = deviation[id]), "literature" != deviation.type))
            return;
          try {
            let e = JSON.parse(deviation.textContent.html.markup),
              t = Draft.convertFromRaw(e),
              i = Draft.EditorState.createWithContent(t),
              n = React.createElement(
                Draft.Editor,
                { editorState: i, readOnly: !0 },
                null
              );
            ReactDOM.render(n, document.querySelectorAll("section")[1]);
          } catch (e) {
            document.querySelectorAll("section")[1].innerHTML =
              deviation.textContent.html.markup;
          }
        }
  }
  function fixPreviewImage() {
    if (!window.__INITIAL_STATE__)
      for (let script of document.querySelectorAll("script"))
        if (script.textContent.trim().startsWith("window.__BASEURL")) {
          eval(script.textContent);
          let previews = document.querySelectorAll(
            'a[data-hook="deviation_link"] div'
          );
          for (let e of previews) {
            let t = e.parentElement.href.split("-").pop(),
              i = window.__INITIAL_STATE__["@@entities"].deviation[t];
            if (!i) continue;
            if (!i.isBlocked) continue;
            if ("image" != i.type) continue;
            let n = i.media;
            if (!n) continue;
            let o = document.createElement("img"),
              r =
                n.baseUri +
                n.types[6].c.replace("<prettyName>", n.prettyName) +
                "?token=" +
                n.token[0];
            o.src = r;
            let l = "";
            for (let e = n.types.lenght - 1; e > -1; e--) {
              let t = n.types[e];
              t.c &&
                ((r =
                  n.baseUri +
                  t.c.replace("<prettyName>", n.prettyName) +
                  "?token=" +
                  n.token[0]),
                (l = l + "," + r));
            }
            (o.onload = (t) => {
              let i = t.naturalHeight / t.naturalWidth;
              (o.style.height = e.style.height),
                (o.style.width =
                  (i < 1
                    ? parseInt(e.style.height.split("px")[0]) * i
                    : parseInt(e.style.height.split("px")[0]) / i) + "px"),
                (o.parentElement.style.width = o.style.width);
            }),
              (o.style["object-fit"] = "cover"),
              (o.srcset = l),
              e.append(o);
            let a = e.querySelector("span");
            a && a.remove();
            for (let t of e.parentElement.nextSibling.childNodes)
              0 == t.style.length && t.remove();
          }
        }
  }
  function fixImage() {
    let e = document.querySelector('div[style^="background-image"]');
    if (e) {
      e.className = e.className.split(" ")[0];
      for (let t of e.parentElement.parentElement.childNodes)
        if (t != e.parentElement) {
          t.remove();
          let e = " div::before {  display:none;} ",
            i = document.createElement("style");
          (i.innerText = e),
            (i.id = "removeAgeRestriction"),
            document.body.append(i);
        }
    }
  }
  !(function () {
    "use strict";
    setInterval((e) => {
      "art" ==
        window.location.href.split("/")[
          window.location.href.split("/").length - 2
        ] && (fixImage(), fixText()),
        fixPreviewImage();
    }, 100);
  })();
})();

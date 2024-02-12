(function () {
  "use strict";

  setInterval((e) => {
    if (
      window.location.href.split("/")[
        window.location.href.split("/").length - 2
      ] == "art"
    ) {
      fixImage();
      fixText();
    }
    fixPreviewImage();
  }, 100);
})();

function fixText() {
  if (!window.__INITIAL_STATE__)
    for (let script of document.querySelectorAll("script")) {
      if (script.textContent.trim().startsWith("window.__BASEURL")) {
        eval(script.textContent);

        let id = window.location.href.split("-").pop();

        let deviation = window.__INITIAL_STATE__["@@entities"].deviation;
        deviation = deviation[id];

        if (deviation.type != "literature") return;

        try {
          let json = JSON.parse(deviation.textContent.html.markup);
          let state = Draft.convertFromRaw(json);

          let editorState = Draft.EditorState.createWithContent(state);

          let elem = React.createElement(
            Draft.Editor,
            { editorState: editorState, readOnly: true },
            null
          );
          ReactDOM.render(elem, document.querySelectorAll("section")[1]);
        } catch (e) {
          document.querySelectorAll("section")[1].innerHTML =
            deviation.textContent.html.markup;
        }
      }
    }
}

function fixPreviewImage() {
  if (!window.__INITIAL_STATE__)
    for (let script of document.querySelectorAll("script")) {
      if (script.textContent.trim().startsWith("window.__BASEURL")) {
        eval(script.textContent);

        let previews = document.querySelectorAll(
          'a[data-hook="deviation_link"] div'
        );
        for (let preview of previews) {
          let id = preview.parentElement.href.split("-").pop();
          let deviation = window.__INITIAL_STATE__["@@entities"].deviation[id];
          if (!deviation) continue;

          if (!deviation.isBlocked) continue;
          if (deviation.type != "image") continue;
          let media = deviation.media;
          if (!media) continue;

          let img = document.createElement("img");

          let uri =
            media.baseUri +
            media.types[6].c.replace("<prettyName>", media.prettyName) +
            "?token=" +
            media.token[0];

          img.src = uri;
          let srcset = "";

          for (let i = media.types.lenght - 1; i > -1; i--) {
            let src = media.types[i];
            if (src.c) {
              uri =
                media.baseUri +
                src.c.replace("<prettyName>", media.prettyName) +
                "?token=" +
                media.token[0];
              srcset = srcset + "," + uri;
            }
          }

          img.onload = (e) => {
            let ratio = e.naturalHeight / e.naturalWidth;
            img.style.height = preview.style.height;
            img.style.width =
              (ratio < 1
                ? parseInt(preview.style.height.split("px")[0]) * ratio
                : parseInt(preview.style.height.split("px")[0]) / ratio) + "px";

            img.parentElement.style.width = img.style.width;
          };

          img.style["object-fit"] = "cover";
          img.srcset = srcset;

          preview.append(img);

          let blockIcon = preview.querySelector("span");
          if (blockIcon) blockIcon.remove();

          for (let child of preview.parentElement.nextSibling.childNodes)
            if (child.style.length == 0) child.remove();
        }
      }
    }
}

function fixImage() {
  let imageDiv = document.querySelector('div[style^="background-image"]');
  if (!imageDiv) return;
  imageDiv.className = imageDiv.className.split(" ")[0];
  for (let e of imageDiv.parentElement.parentElement.childNodes) {
    if (e != imageDiv.parentElement) {
      e.remove();
      let styles = " div::before {  display:none;} ";
      let styleSheet = document.createElement("style");
      styleSheet.innerText = styles;
      styleSheet.id = "removeAgeRestriction";
      document.body.append(styleSheet);
    }
  }
}

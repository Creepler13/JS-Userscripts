(function () {
  "use strict";

  setInterval((e) => {
    let iframe = document.getElementById("injected-iframe");
    if (iframe) iframe.style.visibility = "hidden";

    if (document.getElementById("removeAgeRestriction")) return;
    let styles = " body * {  visibility:visible;} ";
    let styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    styleSheet.id = "removeAgeRestriction";
    document.body.append(styleSheet);
  }, 100);
})();
